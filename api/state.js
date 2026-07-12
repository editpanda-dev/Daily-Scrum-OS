const BOARD_ID = "default";
const BLOB_STATE_PATH = `team-os/${BOARD_ID}-state.json`;

function sendJson(response, status, body) {
  response.statusCode = status;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.end(JSON.stringify(body));
}

function checkPasscode(request) {
  const configuredPasscode = process.env.TEAM_OS_PASSCODE;
  if (!configuredPasscode) return true;
  return request.headers["x-team-passcode"] === configuredPasscode;
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

function hasBlobConfig() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_OIDC_TOKEN);
}

async function readJsonStream(stream) {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(Buffer.from(value));
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function readBlobState() {
  const { get } = await import("@vercel/blob");
  const result = await get(BLOB_STATE_PATH, { access: "private", useCache: false });
  if (!result || result.statusCode === 304 || !result.stream) return null;
  return readJsonStream(result.stream);
}

async function writeBlobState(payload) {
  const { put } = await import("@vercel/blob");
  const updatedAt = new Date().toISOString();
  const body = JSON.stringify({ payload, updatedAt });

  await put(BLOB_STATE_PATH, body, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
  });

  return { payload, updated_at: updatedAt };
}

async function parseRequestBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") return JSON.parse(request.body || "{}");

  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

async function readState(config) {
  const response = await fetch(
    `${config.url}/rest/v1/team_os_state?id=eq.${BOARD_ID}&select=payload,updated_at&limit=1`,
    {
      headers: {
        apikey: config.key,
        authorization: `Bearer ${config.key}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase read failed: ${response.status}`);
  }

  const rows = await response.json();
  return rows[0] || null;
}

async function writeState(config, payload) {
  const response = await fetch(`${config.url}/rest/v1/team_os_state?on_conflict=id`, {
    method: "POST",
    headers: {
      apikey: config.key,
      authorization: `Bearer ${config.key}`,
      "content-type": "application/json",
      prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify([
      {
        id: BOARD_ID,
        payload,
        updated_at: new Date().toISOString(),
      },
    ]),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase write failed: ${response.status} ${text}`);
  }

  const rows = await response.json();
  return rows[0] || null;
}

module.exports = async function handler(request, response) {
  if (!checkPasscode(request)) {
    sendJson(response, 401, { error: "Invalid team passcode" });
    return;
  }

  const config = getSupabaseConfig();
  const useBlob = hasBlobConfig();
  if (!config && !useBlob) {
    sendJson(response, 501, {
      error: "Server storage is not configured",
      requiredEnv: ["BLOB_READ_WRITE_TOKEN", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
    });
    return;
  }

  try {
    if (request.method === "GET") {
      const row = useBlob ? await readBlobState() : await readState(config);
      sendJson(response, 200, {
        payload: row?.payload || null,
        updatedAt: row?.updated_at || row?.updatedAt || null,
        storage: useBlob ? "vercel-blob" : "supabase",
      });
      return;
    }

    if (request.method === "POST") {
      const body = await parseRequestBody(request);
      if (!body.payload || typeof body.payload !== "object") {
        sendJson(response, 400, { error: "payload object is required" });
        return;
      }

      const row = useBlob ? await writeBlobState(body.payload) : await writeState(config, body.payload);
      sendJson(response, 200, {
        payload: row?.payload || body.payload,
        updatedAt: row?.updated_at || new Date().toISOString(),
        storage: useBlob ? "vercel-blob" : "supabase",
      });
      return;
    }

    response.setHeader("allow", "GET, POST");
    sendJson(response, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(response, 500, { error: error.message || "Unknown server error" });
  }
};
