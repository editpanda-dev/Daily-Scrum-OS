const BOARD_ID = "default";

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
  if (!config) {
    sendJson(response, 501, {
      error: "Supabase is not configured",
      requiredEnv: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
    });
    return;
  }

  try {
    if (request.method === "GET") {
      const row = await readState(config);
      sendJson(response, 200, {
        payload: row?.payload || null,
        updatedAt: row?.updated_at || null,
      });
      return;
    }

    if (request.method === "POST") {
      const chunks = [];
      for await (const chunk of request) chunks.push(chunk);
      const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
      if (!body.payload || typeof body.payload !== "object") {
        sendJson(response, 400, { error: "payload object is required" });
        return;
      }

      const row = await writeState(config, body.payload);
      sendJson(response, 200, {
        payload: row?.payload || body.payload,
        updatedAt: row?.updated_at || new Date().toISOString(),
      });
      return;
    }

    response.setHeader("allow", "GET, POST");
    sendJson(response, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(response, 500, { error: error.message || "Unknown server error" });
  }
};
