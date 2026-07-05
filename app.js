import JSZip from "jszip";

const STORAGE_KEY = "aim_research_team_os_v1";
const PASSCODE_KEY = "aim_research_team_os_passcode";
const API_ENDPOINT = "/api/state";
const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1FcPQHlpGc736etJQKGEEhqWpasH56tun?usp=drive_link";
const today = formatDateKey(new Date());

const members = ["지우진", "최서린", "최은서", "팀 공통"];

const statuses = [
  ["todo", "할 일"],
  ["progress", "진행중"],
  ["review", "검토"],
  ["done", "완료"],
  ["blocked", "막힘"],
];

const sampleState = {
  tasks: [
    {
      id: "task-ab-metrics",
      title: "A/B 테스트 설계 사례와 CTR·CVR·구매버튼 클릭 측정 방식 정리",
      owner: "지우진",
      status: "progress",
      startDate: "2026-06-28",
      dueDate: "2026-06-30",
      source: "1주차 다음 액션",
      priority: "high",
    },
    {
      id: "task-literature",
      title: "생성형 AI 광고 인식·소비자 신뢰 선행연구 3편 이상 요약",
      owner: "최서린",
      status: "todo",
      startDate: "2026-06-29",
      dueDate: "2026-06-30",
      source: "문헌조사",
      priority: "high",
    },
    {
      id: "task-stimuli",
      title: "Human/AI 광고 자극물 후보와 AI-like risk band 자료 수집",
      owner: "최은서",
      status: "todo",
      startDate: "2026-06-29",
      dueDate: "2026-06-30",
      source: "광고자극물",
      priority: "medium",
    },
    {
      id: "task-scrum-os",
      title: "데일리 스크럼 기반 업무 공유 및 자료 아카이빙 워크플로우 구축",
      owner: "지우진",
      status: "review",
      startDate: today,
      dueDate: today,
      source: "개인 목표",
      priority: "high",
    },
    {
      id: "task-weekly-report",
      title: "2주차 회의에서 문헌 요약 공유 후 연구문제별 참고문헌 목록 확정",
      owner: "팀 공통",
      status: "todo",
      startDate: "2026-06-30",
      dueDate: "2026-07-01",
      source: "주간보고서",
      priority: "medium",
    },
  ],
  scrums: [
    {
      id: "scrum-1",
      date: today,
      member: "지우진",
      yesterday: "1주차 보고서에서 데일리 스크럼 기반 업무 공유 프로세스 필요성을 정리함",
      today: "논문 작성용 팀 OS를 별도 앱으로 만들고 A/B 테스트 지표 정리 태스크를 등록",
      blocker: "고객용 AdTrace 앱과 내부 연구 OS를 명확히 분리해야 함",
      validation: "팀 운영 시스템은 고객 대상 서비스가 아니라 논문 작성과 연구 협업을 위한 내부 도구로 정의",
    },
  ],
  meetings: [
    {
      id: "meeting-1",
      date: today,
      title: "2주차 A/B 테스트 설계 준비 회의",
      minutes:
        "AGENDA: A/B 테스트 행동지표 확정\n지우진: 행동지표는 CTR, CVR, 구매버튼 클릭으로 쪼개서 본다\nDECISION: 행동지표는 CTR, CVR, 구매버튼 클릭으로 쪼개서 본다\nTODO: @지우진 2026-07-05~2026-07-10 구매버튼 클릭 이벤트 정의서 작성\nTODO: @최서린 2026-07-06~2026-07-08 소비자 신뢰 선행연구 3편 요약\nTODO: @최은서 2026-07-06 Human/AI 광고 자극물 후보 정리",
      actionsCount: 3,
      createdAt: today,
    },
  ],
  calendarItems: [
    {
      id: "calendar-next-meeting",
      title: "A/B 실험 자극물 수집 현황 점검",
      owner: "팀 공통",
      startDate: today,
      dueDate: today,
      type: "회의",
      note: "Notion 회의록 ZIP 업로드 후 각자 100장 조사 진행 상황을 확인한다.",
    },
  ],
  teamAlignment: {
    currentGoal: "A/B 테스트 설계 완성",
    theme: "AI-like score가 소비자 신뢰와 행동지표에 미치는 영향 검증",
    updatedAt: today,
    sourceFiles: 1,
    agendas: ["CTR/CVR 측정 방식 정리", "구매버튼 클릭 이벤트 정의", "소비자 신뢰 문항 설계"],
    decisions: ["구매버튼 클릭은 CTR, CVR과 분리된 핵심 행동지표로 측정한다."],
    nextAgendas: ["광고 자극물 통제 기준 확정", "설문 문항과 행동 로그 연결 방식 검토"],
    accomplishments: [
      { member: "지우진", text: "A/B 테스트 행동지표 정리 초안 작성" },
      { member: "최서린", text: "생성형 AI 광고 인식과 소비자 신뢰 선행연구 조사" },
      { member: "최은서", text: "Human/AI 광고 자극물 후보 수집" },
    ],
    normalizedMarkdown: "",
  },
  notionImports: [],
  validations: [
    {
      id: "validation-1",
      date: today,
      target: "A/B 테스트 지표 정리",
      hypothesis: "현재 상태: CTR·CVR·구매버튼 클릭 정의 초안 작성 중",
      insight: "광고 노출, 클릭, 상세 진입, CTA 클릭을 아주 작은 이벤트 단위로 쪼개야 함",
      nextAction: "지우진이 지표 정의표 작성 후 팀원 리뷰 요청",
    },
  ],
  archives: [
    {
      id: "archive-week1",
      title: "1주차 AIM HUFStudy 주간학습보고서",
      type: "주간보고서",
      link: DRIVE_FOLDER_URL,
      summary:
        "연구문제를 AI-like score가 소비자 신뢰, 행동 반응, ROI 판단에 미치는 영향 검증으로 재정의하고 역할을 분담한 1주차 산출물.",
      createdAt: today,
    },
    {
      id: "archive-ab-metrics",
      title: "A/B 테스트 지표 정리 초안",
      type: "실험설계",
      link: "",
      summary:
        "CTR은 광고 클릭/노출, CVR은 전환/클릭, 구매버튼 클릭은 상세 페이지 CTA 클릭 이벤트로 정의해 행동지표를 측정한다.",
      createdAt: today,
    },
  ],
  paperSections: [
    {
      id: "paper-intro",
      title: "1. 서론",
      owner: "최서린",
      status: "progress",
      done: false,
      goal: "생성형 AI 광고 확산과 소비자 신뢰 문제를 연구 배경으로 정리한다.",
      progress: "문제의식과 연구 필요성 초안 작성 중",
      next: "AI 광고 인식, 신뢰 하락, 행동 반응을 연결하는 연구문제 문장 다듬기",
      notes: "프로젝트 전체 방향과 ESG/디지털 취약계층 문제의식을 자연스럽게 연결한다.",
    },
    {
      id: "paper-lit",
      title: "2. 선행연구",
      owner: "최서린",
      status: "todo",
      done: false,
      goal: "AI 광고 인식, 소비자 신뢰, CTR/CVR 행동지표 관련 문헌을 정리한다.",
      progress: "관련 논문 후보 수집 단계",
      next: "핵심 선행연구 3편 이상 요약 후 변수 관계 표로 정리",
      notes: "AI-like 인식과 신뢰, 구매의향 사이의 연결 근거를 우선 확보한다.",
    },
    {
      id: "paper-method",
      title: "3. 연구방법",
      owner: "지우진",
      status: "progress",
      done: false,
      goal: "A/B 테스트 설계, 표본 구성, 행동지표 측정 방식을 명확히 정의한다.",
      progress: "CTR, CVR, 구매버튼 클릭 이벤트 정의 초안 작성",
      next: "실험 페이지에서 수집할 로그 단위를 아주 작은 이벤트로 쪼개기",
      notes: "행동지표는 노출, 광고 클릭, 상세 진입, CTA 클릭으로 분리한다.",
    },
    {
      id: "paper-stimuli",
      title: "4. 실험자극물",
      owner: "최은서",
      status: "todo",
      done: false,
      goal: "Human/AI 광고 이미지 후보와 AI-like risk band 기준을 정리한다.",
      progress: "조사 기준과 수집 출처 정리 필요",
      next: "지우진, 최서린, 최은서가 각자 광고 이미지 100장씩 조사",
      notes: "같은 상품군, 유사한 정보량, 비슷한 레이아웃 기준으로 후보를 수집한다.",
    },
    {
      id: "paper-result",
      title: "5. 결과",
      owner: "지우진",
      status: "todo",
      done: false,
      goal: "실험 결과를 CTR, CVR, 구매버튼 클릭 기준으로 비교 분석한다.",
      progress: "실험 설계 확정 후 작성 예정",
      next: "행동 로그 저장 형식과 분석 테이블 구조 확정",
      notes: "AI-like score 구간별 차이가 보이는지 확인한다.",
    },
    {
      id: "paper-discussion",
      title: "6. 논의 및 결론",
      owner: "팀 공통",
      status: "todo",
      done: false,
      goal: "trust penalty, ROI 판단, 실무적 시사점을 정리한다.",
      progress: "결과 도출 후 작성 예정",
      next: "연구 한계와 후속 연구 방향 후보 메모",
      notes: "AI 광고가 항상 유리하다는 주장이 아니라 신뢰 비용을 함께 고려하는 결론으로 잡는다.",
    },
  ],
  experiments: [
    {
      id: "exp-woojin",
      title: "지우진 · 광고 이미지 100장 조사",
      body: "A/B 테스트에 사용할 광고 후보를 수집하고, 클릭·전환 행동지표 측정 가능성을 함께 기록한다.",
    },
    {
      id: "exp-seorin",
      title: "최서린 · 광고 이미지 100장 조사",
      body: "소비자 신뢰와 AI 광고 인식 관점에서 자극물 후보를 검토하고 문헌 근거와 연결한다.",
    },
    {
      id: "exp-eunseo",
      title: "최은서 · 광고 이미지 100장 조사",
      body: "Human/AI 광고 후보와 AI-like risk band 기준에 맞춰 이미지 출처와 통제 조건을 정리한다.",
    },
    {
      id: "exp-control",
      title: "자극물 통제 기준",
      body: "상품군, 정보량, 레이아웃, CTA 위치가 지나치게 달라지지 않도록 수집 기준을 맞춘다. 세부 내용은 Notion 회의록 정리본을 기준으로 업데이트한다.",
    },
  ],
};

let state = readLocalState();
let cloudEnabled = false;
let saveTimer = null;
let calendarCursor = new Date(`${today.slice(0, 7)}-01T00:00:00`);
let selectedPaperSectionId = state.paperSections?.[0]?.id || sampleState.paperSections[0].id;

function readLocalState() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return normalizeState(structuredClone(sampleState));
  try {
    return normalizeState({ ...structuredClone(sampleState), ...JSON.parse(raw) });
  } catch {
    return normalizeState(structuredClone(sampleState));
  }
}

function normalizeState(nextState) {
  const defaults = structuredClone(sampleState);
  const paperById = new Map(defaults.paperSections.map((section) => [section.id, section]));
  const paperSections = (nextState.paperSections || defaults.paperSections).map((section) => ({
    ...(paperById.get(section.id) || {}),
    ...section,
  }));

  const hasUpdatedExperimentPlan = (nextState.experiments || []).some((item) => item.id === "exp-woojin");

  return {
    ...defaults,
    ...nextState,
    calendarItems: nextState.calendarItems || defaults.calendarItems,
    paperSections,
    experiments: hasUpdatedExperimentPlan ? nextState.experiments : defaults.experiments,
  };
}

function saveLocalState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function saveState() {
  saveLocalState();
  scheduleCloudSave();
}

function getPasscode() {
  return document.getElementById("passcodeInput")?.value || window.sessionStorage.getItem(PASSCODE_KEY) || "";
}

function setSyncStatus(message, stateName = "local") {
  const status = document.getElementById("syncStatus");
  const dot = document.getElementById("syncDot");
  if (status) status.textContent = message;
  if (dot) {
    dot.className = "sync-dot";
    if (stateName === "online") dot.classList.add("online");
    if (stateName === "saving") dot.classList.add("saving");
    if (stateName === "error") dot.classList.add("error");
  }
}

async function fetchCloudState() {
  const passcode = getPasscode();
  const response = await fetch(API_ENDPOINT, {
    headers: passcode ? { "x-team-passcode": passcode } : {},
  });

  if (response.status === 404 || response.status === 501) {
    cloudEnabled = false;
    setSyncStatus("로컬 모드", "local");
    return false;
  }

  if (response.status === 401) {
    cloudEnabled = false;
    setSyncStatus("패스코드 필요", "error");
    return false;
  }

  if (!response.ok) {
    cloudEnabled = false;
    setSyncStatus("DB 연결 실패", "error");
    return false;
  }

  const data = await response.json();
  if (data.payload) {
    state = normalizeState({ ...structuredClone(sampleState), ...data.payload });
    saveLocalState();
  }
  cloudEnabled = true;
  setSyncStatus("팀 DB 연결됨", "online");
  render();
  return true;
}

async function saveCloudState() {
  if (!cloudEnabled) return;
  const passcode = getPasscode();
  setSyncStatus("저장 중", "saving");

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(passcode ? { "x-team-passcode": passcode } : {}),
      },
      body: JSON.stringify({ payload: state }),
    });

    if (response.status === 401) {
      cloudEnabled = false;
      setSyncStatus("패스코드 오류", "error");
      return;
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    setSyncStatus("팀 DB 저장됨", "online");
  } catch {
    setSyncStatus("로컬 저장됨", "error");
  }
}

function scheduleCloudSave() {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(saveCloudState, 450);
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseDateKey(date) {
  const [year, month, day] = String(date || today)
    .split("-")
    .map(Number);
  return new Date(year, month - 1, day);
}

function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getDaysLeft(date) {
  return Math.ceil((parseDateKey(date).getTime() - parseDateKey(today).getTime()) / 86400000);
}

function getTaskDateRange(task) {
  const firstDate = task.startDate || task.dueDate || today;
  const lastDate = task.dueDate || task.startDate || today;
  return firstDate <= lastDate ? [firstDate, lastDate] : [lastDate, firstDate];
}

function getTaskStartDate(task) {
  return getTaskDateRange(task)[0];
}

function getTaskEndDate(task) {
  return getTaskDateRange(task)[1];
}

function getTaskRangeLabel(task) {
  const [startDate, endDate] = getTaskDateRange(task);
  return startDate === endDate ? endDate : `${startDate}~${endDate}`;
}

function getDateRange(startDate, endDate) {
  const dates = [];
  const cursor = parseDateKey(startDate);
  const end = parseDateKey(endDate);

  for (let index = 0; cursor <= end && index < 120; index += 1) {
    dates.push(formatDateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function statusLabel(status) {
  return statuses.find(([key]) => key === status)?.[1] || status;
}

function getMinutesTextarea() {
  return document.querySelector('#meetingForm textarea[name="minutes"]');
}

function appendMinutesLine(line, shouldKeepCursor = false) {
  const textarea = getMinutesTextarea();
  if (!textarea || !line) return;
  const prefix = textarea.value.trim() ? "\n" : "";
  textarea.value = `${textarea.value}${prefix}${line}`;
  textarea.focus();

  if (shouldKeepCursor) {
    textarea.selectionStart = textarea.value.length;
    textarea.selectionEnd = textarea.value.length;
  }
}

function render() {
  renderDriveLinks();
  renderMemberOptions();
  renderMetrics();
  renderAlignment();
  renderTimeline();
  renderFutureStack();
  renderCalendar();
  renderValidations();
  renderTasks();
  renderScrums();
  renderMeetings();
  renderPaper();
  renderExperiments();
  renderArchive();
}

function renderDriveLinks() {
  document.querySelectorAll("#driveHeaderLink, #driveArchiveLink").forEach((link) => {
    link.href = DRIVE_FOLDER_URL;
  });
}

function renderMemberOptions() {
  document
    .querySelectorAll('select[name="member"], select[name="owner"], #ownerFilter, #calendarOwnerFilter')
    .forEach((select) => {
      const current = select.value;
      const leading = select.id === "ownerFilter" || select.id === "calendarOwnerFilter" ? '<option value="all">전체 담당자</option>' : "";
      select.innerHTML =
        leading +
        members.map((member) => `<option value="${escapeHtml(member)}">${escapeHtml(member)}</option>`).join("");
      select.value = current || (select.id === "ownerFilter" || select.id === "calendarOwnerFilter" ? "all" : members[0]);
    });

  document.querySelectorAll('input[type="date"]').forEach((input) => {
    if (!input.value) input.value = today;
  });
}

function renderMetrics() {
  const doneSections = state.paperSections.filter((section) => section.done).length;
  const progress = state.paperSections.length
    ? Math.round((doneSections / state.paperSections.length) * 100)
    : 0;
  const activeTasks = state.tasks.filter((task) => task.status !== "done").length;
  const blockers = state.tasks.filter((task) => task.status === "blocked").length;

  document.getElementById("paperProgress").textContent = `${progress}%`;
  document.getElementById("validationCount").textContent = state.archives.length;
  document.getElementById("blockerCount").textContent = blockers;
  document.getElementById("activeTaskCount").textContent = activeTasks;
}

function addDays(date, days) {
  const nextDate = parseDateKey(date);
  nextDate.setDate(nextDate.getDate() + days);
  return formatDateKey(nextDate);
}

function normalizeOwner(owner) {
  if (!owner) return "팀 공통";
  return members.find((member) => member === owner) || "팀 공통";
}

function parseMeetingActions(minutes, meetingTitle) {
  return minutes
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^(TODO|BLOCKED)\s*:/i.test(line))
    .map((line) => {
      const isBlocked = /^BLOCKED\s*:/i.test(line);
      let body = line.replace(/^(TODO|BLOCKED)\s*:\s*/i, "").trim();
      const ownerMatch = body.match(/@([^\s]+)/);
      const rangeMatch = body.match(/\b(20\d{2}-\d{2}-\d{2})\s*(?:~|–|—|\s-\s|to|부터|에서)\s*(20\d{2}-\d{2}-\d{2})\b/i);
      const dateMatch = body.match(/\b20\d{2}-\d{2}-\d{2}\b/);
      const owner = normalizeOwner(ownerMatch?.[1]);
      const startDate = rangeMatch?.[1] || dateMatch?.[0] || today;
      const dueDate = rangeMatch?.[2] || dateMatch?.[0] || addDays(today, isBlocked ? 1 : 3);
      const [normalizedStartDate, normalizedDueDate] = getTaskDateRange({ startDate, dueDate });

      body = body
        .replace(/@([^\s]+)/, "")
        .replace(rangeMatch?.[0] || dateMatch?.[0] || "", "")
        .replace(/\s+/g, " ")
        .trim();

      return {
        id: createId("task"),
        title: body || "회의 후속 업무",
        owner,
        status: isBlocked ? "blocked" : "todo",
        startDate: normalizedStartDate,
        dueDate: normalizedDueDate,
        source: `회의록: ${meetingTitle}`,
        priority: isBlocked ? "high" : "medium",
      };
    });
}

function stripMarkdownLine(line) {
  return String(line || "")
    .replace(/^#{1,6}\s*/, "")
    .replace(/^[-*+]\s+/, "")
    .replace(/^\d+\.\s+/, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();
}

function compactLines(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map(stripMarkdownLine)
    .filter(Boolean);
}

function uniqueByText(items, limit = 8) {
  const seen = new Set();
  const result = [];

  items.forEach((item) => {
    const text = typeof item === "string" ? item : item?.text || item?.title;
    const key = String(text || "").replace(/\s+/g, " ").trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push(item);
  });

  return result.slice(0, limit);
}

function getDocumentDate(document) {
  const match = `${document.path} ${document.content}`.match(/\b20\d{2}[-.]\d{1,2}[-.]\d{1,2}\b/);
  if (!match) return today;
  return match[0].replace(/\./g, "-").split("-").map((part, index) => (index === 0 ? part : part.padStart(2, "0"))).join("-");
}

function extractPrefixedLines(lines, prefixes) {
  return lines
    .filter((line) => prefixes.some((prefix) => line.toUpperCase().startsWith(`${prefix}:`)))
    .map((line) => line.replace(/^[A-Z_]+\s*:\s*/i, "").trim());
}

function extractKeywordLines(lines, keywords, blockedPrefixes = []) {
  return lines
    .filter((line) => keywords.some((keyword) => line.includes(keyword)))
    .filter((line) => !blockedPrefixes.some((prefix) => line.toUpperCase().startsWith(`${prefix}:`)))
    .map((line) => line.replace(/^(목표|목적|안건|결정사항|다음 아젠다)\s*[:：-]?\s*/, "").trim());
}

function inferCurrentGoal(lines) {
  const explicit = lines.find((line) => /^(GOAL|목표|회의 목적|이번 주 목표|현재 목표)\s*[:：-]/i.test(line));
  if (explicit) return explicit.replace(/^(GOAL|목표|회의 목적|이번 주 목표|현재 목표)\s*[:：-]\s*/i, "").trim();

  const goalLike = lines.find((line) => /(완성|확정|검증|구축|정리|설계|작성).*(목표|목적|방향)/.test(line));
  if (goalLike) return goalLike;

  const agenda = extractPrefixedLines(lines, ["AGENDA"])[0] || extractKeywordLines(lines, ["안건"])[0];
  return agenda ? `${agenda} 얼라인` : "이번 주 팀 목표 정렬";
}

function inferTheme(lines, currentGoal) {
  const themeLine = lines.find((line) => /^(주제|프로젝트|연구문제|핵심 방향)\s*[:：-]/.test(line));
  if (themeLine) return themeLine.replace(/^(주제|프로젝트|연구문제|핵심 방향)\s*[:：-]\s*/, "").trim();
  return currentGoal || "회의록 기반 목표, 안건, R&R 정렬";
}

function extractAccomplishments(lines) {
  const doneKeywords = ["완료", "했다", "작성", "정리", "조사", "공유", "준비", "만들", "구현"];
  const results = [];

  lines.forEach((line) => {
    const speakerMatch = line.match(/^([^:\s]{2,8})\s*:\s*(.+)$/);
    if (!speakerMatch) return;
    const member = normalizeOwner(speakerMatch[1]);
    if (member === "팀 공통") return;
    const text = speakerMatch[2].trim();
    if (!doneKeywords.some((keyword) => text.includes(keyword))) return;
    if (/해야|할 것|예정|다음|TODO|BLOCKED/.test(text)) return;
    results.push({ member, text });
  });

  return uniqueByText(results, 9);
}

function extractNaturalActionItems(lines, sourceTitle) {
  const taskVerbs = ["작성", "정리", "조사", "확인", "검토", "준비", "공유", "수집", "만들", "구현", "업데이트", "분석"];
  const intentWords = ["해야", "하기로", "하겠습니다", "맡", "담당", "까지", "다음"];
  const tasks = [];

  lines.forEach((line) => {
    if (/^(TODO|BLOCKED)\s*:/i.test(line)) return;
    if (!taskVerbs.some((verb) => line.includes(verb))) return;
    if (!intentWords.some((word) => line.includes(word))) return;

    const speakerMatch = line.match(/^([^:\s]{2,8})\s*:\s*(.+)$/);
    const owner = normalizeOwner(speakerMatch?.[1]);
    const body = (speakerMatch?.[2] || line)
      .replace(/(제가|나는|저는|우선|일단|다음 주까지|이번 주까지|금요일까지|까지는|하겠습니다|해야 합니다|해야 할 것 같아요|하기로 했습니다|하기로 했다)/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!body || body.length < 6) return;

    const dateMatch = line.match(/\b20\d{2}-\d{2}-\d{2}\b/);
    const dueDate = dateMatch?.[0] || addDays(today, 3);

    tasks.push({
      id: createId("task"),
      title: body,
      owner,
      status: "todo",
      startDate: today,
      dueDate,
      source: `Notion ZIP: ${sourceTitle}`,
      priority: "medium",
    });
  });

  return uniqueByText(tasks, 12);
}

function buildNormalizedMarkdown(alignment, tasks, documents) {
  const accomplishments = alignment.accomplishments.length
    ? alignment.accomplishments
        .map((item) => `### ${item.member}\n- ${item.text}`)
        .join("\n\n")
    : "- 정리된 개인 성과가 없습니다.";

  return `# 회의록 정리본

## 1. 현재 팀 목표
- ${alignment.currentGoal}

## 2. 프로젝트 주제 / 방향
- ${alignment.theme}

## 3. 핵심 아젠다
${alignment.agendas.map((item) => `- ${item}`).join("\n") || "- 정리된 아젠다가 없습니다."}

## 4. 개인 성과 공유
${accomplishments}

## 5. 주요 결정사항
${alignment.decisions.map((item) => `- ${item}`).join("\n") || "- 정리된 결정사항이 없습니다."}

## 6. 다음 아젠다
${alignment.nextAgendas.map((item) => `- ${item}`).join("\n") || "- 정리된 다음 아젠다가 없습니다."}

## 7. R&R / 액션아이템
${tasks.map((task) => `- ${task.status === "blocked" ? "BLOCKED" : "TODO"}: @${task.owner} ${getTaskRangeLabel(task)} ${task.title}`).join("\n") || "- 정리된 액션아이템이 없습니다."}

## 8. 분석한 Notion 페이지
${documents.map((document) => `- ${document.path}`).join("\n")}
`;
}

function buildAlignmentFromDocuments(documents, importedTasks) {
  const lines = compactLines(documents.map((document) => document.content).join("\n"));
  const currentGoal = inferCurrentGoal(lines);
  const theme = inferTheme(lines, currentGoal);
  const agendas = uniqueByText([
    ...extractPrefixedLines(lines, ["AGENDA"]),
    ...extractKeywordLines(lines, ["안건"], ["TODO", "BLOCKED", "DECISION"]),
  ]);
  const decisions = uniqueByText([
    ...extractPrefixedLines(lines, ["DECISION"]),
    ...extractKeywordLines(lines, ["결정", "확정", "하기로 했다", "하기로 했"], ["TODO", "BLOCKED"]),
  ]);
  const nextAgendas = uniqueByText([
    ...extractPrefixedLines(lines, ["NEXT_AGENDA"]),
    ...extractKeywordLines(lines, ["다음 아젠다", "다음 회의", "다음에 논의"], ["TODO", "BLOCKED"]),
  ]);
  const accomplishments = extractAccomplishments(lines);

  const alignment = {
    currentGoal,
    theme,
    updatedAt: today,
    sourceFiles: documents.length,
    agendas,
    decisions,
    nextAgendas,
    accomplishments,
    normalizedMarkdown: "",
  };

  alignment.normalizedMarkdown = buildNormalizedMarkdown(alignment, importedTasks, documents);
  return alignment;
}

async function parseNotionZip(file) {
  const zip = await JSZip.loadAsync(file);
  const entries = Object.values(zip.files).filter(
    (entry) => !entry.dir && /\.(md|markdown|txt)$/i.test(entry.name) && !/__MACOSX\//.test(entry.name),
  );

  const documents = await Promise.all(
    entries.map(async (entry) => ({
      path: entry.name,
      title: entry.name.split("/").pop().replace(/\.(md|markdown|txt)$/i, ""),
      content: await entry.async("string"),
    })),
  );

  return documents
    .filter((document) => document.content.trim())
    .sort((a, b) => getDocumentDate(b).localeCompare(getDocumentDate(a)));
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function renderListItems(items, emptyText) {
  return items?.length ? items.map((item) => `<li>${escapeHtml(item)}</li>`).join("") : `<li>${escapeHtml(emptyText)}</li>`;
}

function renderAlignment() {
  const board = document.getElementById("alignmentBoard");
  const importList = document.getElementById("notionImportHistory");
  if (!board) return;

  const alignment = state.teamAlignment || sampleState.teamAlignment;
  const activeTasks = state.tasks.filter((task) => task.status !== "done");
  const unalignedTasks = activeTasks.filter((task) => {
    const text = `${task.title} ${task.source}`.toLowerCase();
    return !alignment.agendas?.some((agenda) => text.includes(String(agenda).slice(0, 8).toLowerCase()));
  });

  board.innerHTML = `
    <section class="alignment-hero">
      <span class="badge progress">현재 팀 목표</span>
      <h2>${escapeHtml(alignment.currentGoal || "팀 목표를 업로드한 회의록에서 추출합니다.")}</h2>
      <p>${escapeHtml(alignment.theme || "Notion ZIP을 업로드하면 주제, 안건, 결정사항, R&R을 이곳에 정리합니다.")}</p>
      <div class="meta-row">
        <span>${escapeHtml(alignment.updatedAt || today)}</span>
        <span>분석 파일 ${escapeHtml(alignment.sourceFiles || 0)}개</span>
        <span>진행 업무 ${activeTasks.length}개</span>
      </div>
    </section>
    <section class="alignment-grid">
      <article class="alignment-card">
        <h3>핵심 아젠다</h3>
        <ul>${renderListItems(alignment.agendas, "아젠다를 찾지 못했습니다.")}</ul>
      </article>
      <article class="alignment-card">
        <h3>최근 결정사항</h3>
        <ul>${renderListItems(alignment.decisions, "결정사항을 찾지 못했습니다.")}</ul>
      </article>
      <article class="alignment-card">
        <h3>다음 아젠다</h3>
        <ul>${renderListItems(alignment.nextAgendas, "다음 회의 안건을 찾지 못했습니다.")}</ul>
      </article>
      <article class="alignment-card">
        <h3>목표 연결 확인</h3>
        <p><strong>${unalignedTasks.length}</strong>개 업무는 현재 아젠다와 연결이 약합니다.</p>
        <p>${unalignedTasks.slice(0, 2).map((task) => escapeHtml(task.title)).join(" / ") || "현재는 모든 업무가 주요 흐름 안에 있습니다."}</p>
      </article>
    </section>
    <section class="alignment-card">
      <div class="paper-topline">
        <h3>개인 성과 공유</h3>
        <span class="badge">${alignment.accomplishments?.length || 0}개</span>
      </div>
      <div class="accomplishment-grid">
        ${
          alignment.accomplishments?.length
            ? alignment.accomplishments
                .map(
                  (item) => `
                    <div class="accomplishment-item">
                      <strong>${escapeHtml(item.member)}</strong>
                      <p>${escapeHtml(item.text)}</p>
                    </div>
                  `,
                )
                .join("")
            : '<div class="empty-state compact">성과 공유 문장을 찾지 못했습니다.</div>'
        }
      </div>
    </section>
  `;

  if (importList) {
    importList.innerHTML = (state.notionImports || []).length
      ? state.notionImports
          .slice(0, 5)
          .map(
            (item) => `
              <article class="list-item">
                <span class="badge progress">${escapeHtml(item.createdAt)} · ${escapeHtml(item.fileCount)}개 페이지</span>
                <h3>${escapeHtml(item.fileName)}</h3>
                <p>${escapeHtml(item.summary)}</p>
              </article>
            `,
          )
          .join("")
      : '<div class="empty-state compact">아직 업로드한 Notion ZIP이 없습니다.</div>';
  }
}

function renderTimeline() {
  const container = document.getElementById("timelineList");
  const tasks = [...state.tasks]
    .filter((task) => task.status !== "done")
    .sort((a, b) => getTaskEndDate(a).localeCompare(getTaskEndDate(b)))
    .slice(0, 6);

  container.innerHTML = tasks
    .map((task) => {
      const days = getDaysLeft(getTaskEndDate(task));
      const width = Math.max(12, Math.min(100, 100 - Math.max(days, 0) * 10));
      const dueText = days < 0 ? `${Math.abs(days)}일 지연` : days === 0 ? "오늘 마감" : `${days}일 남음`;
      return `
        <article class="timeline-item">
          <div class="paper-topline">
            <h3>${escapeHtml(task.title)}</h3>
            <span class="badge ${task.status}">${statusLabel(task.status)}</span>
          </div>
          <div class="meta-row">
            <span>${escapeHtml(task.owner)}</span>
            <span>${escapeHtml(task.source)}</span>
            <span>${escapeHtml(getTaskRangeLabel(task))}</span>
          </div>
          <div class="progress-track"><div class="progress-bar" style="width:${width}%"></div></div>
          <p class="meta-row" style="margin:8px 0 0">${dueText}</p>
        </article>
      `;
    })
    .join("");
}

function renderFutureStack() {
  const container = document.getElementById("futureStackList");
  const activeTasks = [...state.tasks]
    .filter((task) => task.status !== "done")
    .sort((a, b) => getTaskEndDate(a).localeCompare(getTaskEndDate(b)));

  const groups = [
    ["blocked", "막힌 업무", activeTasks.filter((task) => task.status === "blocked")],
    ["soon", "이번 주 업무", activeTasks.filter((task) => getDaysLeft(getTaskEndDate(task)) <= 7 && task.status !== "blocked")],
    ["later", "이후 업무", activeTasks.filter((task) => getDaysLeft(getTaskEndDate(task)) > 7 && task.status !== "blocked")],
  ];

  container.innerHTML = groups
    .map(
      ([key, title, tasks]) => `
        <section class="future-column ${key}">
          <div class="task-column-header">
            <span>${title}</span>
            <span class="badge todo">${tasks.length}</span>
          </div>
          ${
            tasks.length
              ? tasks
                  .slice(0, 8)
                  .map(
                    (task) => `
                      <article class="future-item">
                        <h3>${escapeHtml(task.title)}</h3>
                        <div class="meta-row">
                          <span>${escapeHtml(task.owner)}</span>
                          <span>${escapeHtml(getTaskRangeLabel(task))}</span>
                          <span>${escapeHtml(task.source)}</span>
                        </div>
                      </article>
                    `,
                  )
                  .join("")
              : '<div class="empty-state compact">쌓인 업무가 없습니다.</div>'
          }
        </section>
      `,
    )
    .join("");
}

function getCalendarEvents() {
  const ownerFilter = document.getElementById("calendarOwnerFilter")?.value || "all";
  const taskEvents = state.tasks
    .filter((task) => (task.startDate || task.dueDate) && task.status !== "done")
    .filter((task) => ownerFilter === "all" || task.owner === ownerFilter)
    .flatMap((task) => {
      const [startDate, endDate] = getTaskDateRange(task);
      return getDateRange(startDate, endDate).map((date) => ({
        date,
        title: task.title,
        owner: task.owner,
        type: task.status === "blocked" ? "blocked" : "task",
        status: task.status,
        rangeLabel: getTaskRangeLabel(task),
        isStart: date === startDate,
        isEnd: date === endDate,
      }));
    });

  const meetingEvents = (state.meetings || []).map((meeting) => ({
    date: meeting.date,
    title: meeting.title,
    owner: "팀 공통",
    type: "meeting",
    status: "meeting",
  }));

  const manualEvents = (state.calendarItems || [])
    .filter((item) => ownerFilter === "all" || item.owner === ownerFilter)
    .flatMap((item) => {
      const [startDate, endDate] = getTaskDateRange(item);
      return getDateRange(startDate, endDate).map((date) => ({
        date,
        title: item.title,
        owner: item.owner,
        type: "schedule",
        status: item.type || "일정",
        rangeLabel: getTaskRangeLabel(item),
        isStart: date === startDate,
        isEnd: date === endDate,
      }));
    });

  return [...taskEvents, ...manualEvents, ...meetingEvents];
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  const title = document.getElementById("calendarTitle");
  if (!grid || !title) return;

  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(year, month, 1 - firstDay.getDay());
  const monthLabel = `${year}년 ${String(month + 1).padStart(2, "0")}월`;
  const events = getCalendarEvents();

  title.textContent = monthLabel;
  const cells = [];

  for (let index = 0; index < 42; index += 1) {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + index);
    const dateKey = formatDateKey(cellDate);
    const dayEvents = events.filter((event) => event.date === dateKey);
    const isCurrentMonth = cellDate.getMonth() === month;
    const isToday = dateKey === today;

    cells.push(`
      <article class="calendar-cell ${isCurrentMonth ? "" : "muted"} ${isToday ? "today" : ""}">
        <div class="calendar-date">
          <span>${cellDate.getDate()}</span>
          ${isToday ? '<strong>오늘</strong>' : ""}
        </div>
        <div class="calendar-events">
          ${dayEvents
            .slice(0, 4)
            .map(
              (event) => `
                <div class="calendar-event ${event.type} ${event.isStart ? "range-start" : ""} ${event.isEnd ? "range-end" : ""}">
                  <span>${
                    event.type === "meeting"
                      ? "회의"
                      : event.type === "schedule"
                        ? `${event.isStart ? "시작" : event.isEnd ? "종료" : "진행"} · ${escapeHtml(event.status)}`
                        : event.isStart
                          ? `시작 · ${statusLabel(event.status)}`
                          : event.isEnd
                            ? `마감 · ${statusLabel(event.status)}`
                            : `진행 · ${statusLabel(event.status)}`
                  }</span>
                  <p>${escapeHtml(event.title)}</p>
                  <small>${escapeHtml(event.rangeLabel ? `${event.owner} · ${event.rangeLabel}` : event.owner)}</small>
                </div>
              `,
            )
            .join("")}
          ${dayEvents.length > 4 ? `<div class="calendar-more">+${dayEvents.length - 4}개 더 있음</div>` : ""}
        </div>
      </article>
    `);
  }

  grid.innerHTML = cells.join("");
}

function renderValidations() {
  const container = document.getElementById("recentValidationList");
  const workload = members
    .filter((member) => member !== "팀 공통")
    .map((member) => {
      const owned = state.tasks
        .filter((task) => task.owner === member && task.status !== "done")
        .sort((a, b) => getTaskEndDate(a).localeCompare(getTaskEndDate(b)));
      const current = owned.find((task) => task.status === "progress" || task.status === "review") || owned[0];
      const next = owned.find((task) => task.id !== current?.id && task.status === "todo");
      const blocked = owned.find((task) => task.status === "blocked");
      return `
        <article class="workload-card">
          <div class="paper-topline">
            <h3>${escapeHtml(member)}</h3>
            <span class="badge progress">${owned.length}개 보유</span>
          </div>
          <p><strong>현재:</strong> ${current ? escapeHtml(current.title) : "진행 중인 업무 없음"}</p>
          <p><strong>다음:</strong> ${next ? escapeHtml(next.title) : "예정 업무 없음"}</p>
          ${blocked ? `<p class="danger-text"><strong>막힘:</strong> ${escapeHtml(blocked.title)}</p>` : ""}
        </article>
      `;
    })
    .join("");

  const notes = state.validations
    .slice(0, 4)
    .map(
      (item) => `
        <article class="list-item">
          <span class="badge done">${escapeHtml(item.date)} · 업무 메모</span>
          <h3>${escapeHtml(item.target)}</h3>
          <p><strong>상태:</strong> ${escapeHtml(item.hypothesis)}</p>
          <p><strong>맥락:</strong> ${escapeHtml(item.insight)}</p>
          <p><strong>다음 액션:</strong> ${escapeHtml(item.nextAction)}</p>
        </article>
      `,
    )
    .join("");

  container.innerHTML = `
    <div class="workload-grid">${workload}</div>
    ${notes ? `<div class="section-divider">최근 업무 메모</div>${notes}` : ""}
  `;
}

function renderTasks() {
  const board = document.getElementById("taskBoard");
  const ownerFilter = document.getElementById("ownerFilter").value || "all";
  const tasks = ownerFilter === "all" ? state.tasks : state.tasks.filter((task) => task.owner === ownerFilter);

  board.innerHTML = statuses
    .map(([status, label]) => {
      const items = tasks.filter((task) => task.status === status);
      return `
        <section class="task-column">
          <div class="task-column-header">
            <span>${label}</span>
            <span class="badge todo">${items.length}</span>
          </div>
          ${items
            .map(
              (task) => `
                <article class="task-card">
                  <div class="paper-topline">
                    <h3>${escapeHtml(task.title)}</h3>
                    <span class="badge ${task.priority === "high" ? "blocked" : "todo"}">${escapeHtml(task.priority)}</span>
                  </div>
                  <div class="meta-row">
                    <span>${escapeHtml(task.owner)}</span>
                    <span>${escapeHtml(task.source)}</span>
                    <span>${escapeHtml(getTaskRangeLabel(task))}</span>
                  </div>
                  <select data-task-status="${escapeHtml(task.id)}" aria-label="태스크 상태 변경">
                    ${statuses
                      .map(
                        ([nextStatus, nextLabel]) =>
                          `<option value="${nextStatus}" ${task.status === nextStatus ? "selected" : ""}>${nextLabel}</option>`,
                      )
                      .join("")}
                  </select>
                </article>
              `,
            )
            .join("")}
        </section>
      `;
    })
    .join("");
}

function renderScrums() {
  const container = document.getElementById("scrumHistory");
  container.innerHTML = state.scrums
    .slice(0, 8)
    .map(
      (scrum) => `
        <article class="list-item">
          <span class="badge progress">${escapeHtml(scrum.member)} · ${escapeHtml(scrum.date)}</span>
          <h3>${escapeHtml(scrum.today)}</h3>
          <p><strong>어제:</strong> ${escapeHtml(scrum.yesterday)}</p>
          ${scrum.blocker ? `<p><strong>막힌 점:</strong> ${escapeHtml(scrum.blocker)}</p>` : ""}
          ${scrum.validation ? `<p><strong>검증:</strong> ${escapeHtml(scrum.validation)}</p>` : ""}
        </article>
      `,
    )
    .join("");
}

function renderMeetings() {
  const container = document.getElementById("meetingHistory");
  if (!container) return;

  container.innerHTML = (state.meetings || [])
    .slice(0, 8)
    .map(
      (meeting) => `
        <article class="list-item">
          <span class="badge progress">${escapeHtml(meeting.date)} · ${escapeHtml(meeting.actionsCount)}개 업무 추출</span>
          <h3>${escapeHtml(meeting.title)}</h3>
          <pre class="minutes-preview">${escapeHtml(meeting.minutes)}</pre>
        </article>
      `,
    )
    .join("");
}

function renderPaper() {
  const container = document.getElementById("paperList");
  const detail = document.getElementById("paperDetail");
  if (!container || !detail) return;

  const sections = state.paperSections || [];
  const selected = sections.find((section) => section.id === selectedPaperSectionId) || sections[0];
  if (selected && selected.id !== selectedPaperSectionId) selectedPaperSectionId = selected.id;

  container.innerHTML = sections
    .map((section) => {
      const relatedTasks = state.tasks.filter((task) => task.source.includes(section.title) || task.title.includes(section.title.replace(/^\d+\.\s*/, "")));
      return `
        <button class="paper-row ${section.id === selectedPaperSectionId ? "active" : ""}" type="button" data-paper-select="${escapeHtml(section.id)}">
          <span class="badge ${section.status}">${statusLabel(section.status)}</span>
          <strong>${escapeHtml(section.title)}</strong>
          <span>${escapeHtml(section.owner)} · 연결 업무 ${relatedTasks.length}개</span>
        </button>
      `;
    })
    .join("");

  if (!selected) {
    detail.innerHTML = '<div class="empty-state">논문 목차가 없습니다.</div>';
    return;
  }

  const sectionTasks = state.tasks
    .filter((task) => task.source.includes(selected.title) || task.title.includes(selected.title.replace(/^\d+\.\s*/, "")))
    .slice(0, 5);

  detail.innerHTML = `
    <div class="paper-detail-head">
      <div>
        <span class="badge ${selected.status}">${statusLabel(selected.status)}</span>
        <h3>${escapeHtml(selected.title)}</h3>
        <p>${escapeHtml(selected.owner)}</p>
      </div>
      <label class="done-toggle">
        <input type="checkbox" data-paper-done="${escapeHtml(selected.id)}" ${selected.done ? "checked" : ""} />
        완료
      </label>
    </div>
    <div class="paper-detail-grid">
      <section>
        <h4>작성 목표</h4>
        <p>${escapeHtml(selected.goal || "목표를 입력해주세요.")}</p>
      </section>
      <section>
        <h4>진행상황</h4>
        <p>${escapeHtml(selected.progress || "진행상황을 입력해주세요.")}</p>
      </section>
      <section>
        <h4>다음 액션</h4>
        <p>${escapeHtml(selected.next || "다음 액션을 정해주세요.")}</p>
      </section>
      <section>
        <h4>메모</h4>
        <p>${escapeHtml(selected.notes || "관련 메모가 없습니다.")}</p>
      </section>
    </div>
    <div class="paper-detail-actions">
      <label>
        상태
        <select data-paper-status="${escapeHtml(selected.id)}">
          ${statuses
            .map(([key, label]) => `<option value="${key}" ${selected.status === key ? "selected" : ""}>${label}</option>`)
            .join("")}
        </select>
      </label>
    </div>
    <section class="linked-task-list">
      <h4>연결된 업무</h4>
      ${
        sectionTasks.length
          ? sectionTasks.map((task) => `<p>${escapeHtml(task.owner)} · ${escapeHtml(getTaskRangeLabel(task))} · ${escapeHtml(task.title)}</p>`).join("")
          : '<p>아직 이 목차와 직접 연결된 업무가 없습니다.</p>'
      }
    </section>
  `;
}

function renderExperiments() {
  const container = document.getElementById("experimentGrid");
  container.innerHTML = state.experiments
    .map(
      (item) => `
        <article class="experiment-item">
          <span class="badge progress">실험 설계</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
        </article>
      `,
    )
    .join("");
}

function renderArchive() {
  const container = document.getElementById("archiveList");
  const keyword = document.getElementById("archiveSearch").value.trim().toLowerCase();
  const items = state.archives.filter((item) =>
    [item.title, item.type, item.summary, item.link].join(" ").toLowerCase().includes(keyword),
  );

  container.innerHTML = items.length
    ? items
        .map(
          (item) => `
            <article class="list-item">
              <span class="badge">${escapeHtml(item.type)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.summary)}</p>
              <div class="meta-row">
                <span>${escapeHtml(item.createdAt)}</span>
                ${item.link ? `<a href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">자료 열기</a>` : ""}
              </div>
            </article>
          `,
        )
        .join("")
    : '<div class="empty-state">검색 결과가 없습니다.</div>';
}

function bindEvents() {
  const savedPasscode = window.sessionStorage.getItem(PASSCODE_KEY);
  if (savedPasscode) document.getElementById("passcodeInput").value = savedPasscode;

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-button").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });

  document.getElementById("ownerFilter").addEventListener("change", renderTasks);
  document.getElementById("archiveSearch").addEventListener("input", renderArchive);
  document.getElementById("calendarOwnerFilter").addEventListener("change", renderCalendar);
  document.getElementById("calendarPrev").addEventListener("click", () => {
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1);
    renderCalendar();
  });
  document.getElementById("calendarNext").addEventListener("click", () => {
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1);
    renderCalendar();
  });
  document.getElementById("calendarToday").addEventListener("click", () => {
    calendarCursor = new Date(`${today.slice(0, 7)}-01T00:00:00`);
    renderCalendar();
  });

  document.getElementById("calendarEventForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const startDate = String(form.get("startDate") || form.get("dueDate") || today);
    const dueDate = String(form.get("dueDate") || startDate);
    const [normalizedStartDate, normalizedDueDate] = getTaskDateRange({ startDate, dueDate });

    state.calendarItems = [
      {
        id: createId("calendar"),
        title: String(form.get("title") || "").trim(),
        owner: String(form.get("owner") || "팀 공통"),
        type: String(form.get("type") || "일정"),
        startDate: normalizedStartDate,
        dueDate: normalizedDueDate,
        note: String(form.get("note") || "").trim(),
      },
      ...(state.calendarItems || []),
    ];

    event.currentTarget.reset();
    event.currentTarget.querySelector('input[name="startDate"]').value = today;
    event.currentTarget.querySelector('input[name="dueDate"]').value = today;
    saveState();
    render();
  });

  document.getElementById("notionImportBtn").addEventListener("click", async () => {
    const input = document.getElementById("notionZipInput");
    const status = document.getElementById("notionImportStatus");
    const file = input.files?.[0];
    if (!file) {
      status.textContent = "먼저 Notion에서 export한 ZIP 파일을 선택해주세요.";
      return;
    }

    status.textContent = "ZIP을 읽고 Markdown 페이지를 분석하는 중입니다.";

    try {
      const documents = await parseNotionZip(file);
      if (!documents.length) {
        status.textContent = "ZIP 안에서 Markdown 또는 TXT 파일을 찾지 못했습니다. Notion export 형식을 확인해주세요.";
        return;
      }

      const combinedMinutes = documents.map((document) => `# ${document.title}\n${document.content}`).join("\n\n");
      const explicitTasks = parseMeetingActions(combinedMinutes, file.name).map((task) => ({
        ...task,
        source: `Notion ZIP: ${file.name}`,
      }));
      const naturalTasks = extractNaturalActionItems(compactLines(combinedMinutes), file.name);
      const extractedTasks = uniqueByText([...explicitTasks, ...naturalTasks], 30);
      const alignment = buildAlignmentFromDocuments(documents, extractedTasks);
      const meetingDate = getDocumentDate(documents[0] || { path: file.name, content: "" });

      state.teamAlignment = alignment;
      state.notionImports = [
        {
          id: createId("notion"),
          fileName: file.name,
          fileCount: documents.length,
          taskCount: extractedTasks.length,
          summary: `${alignment.currentGoal} · 액션아이템 ${extractedTasks.length}개 추출`,
          createdAt: today,
        },
        ...(state.notionImports || []),
      ];
      state.tasks = [...extractedTasks, ...state.tasks];
      state.meetings = [
        {
          id: createId("meeting"),
          date: meetingDate,
          title: `Notion ZIP 정리: ${file.name}`,
          minutes: alignment.normalizedMarkdown,
          actionsCount: extractedTasks.length,
          createdAt: today,
        },
        ...(state.meetings || []),
      ];
      state.archives.unshift({
        id: createId("archive"),
        title: `회의록 정리본 - ${file.name}`,
        type: "회의록",
        link: "",
        summary: `${documents.length}개 Notion 페이지를 분석해 목표, 안건, 결정사항, R&R을 정리했습니다.`,
        createdAt: today,
      });

      input.value = "";
      status.textContent = `분석 완료: Markdown ${documents.length}개, 액션아이템 ${extractedTasks.length}개를 대시보드에 반영했습니다.`;
      saveState();
      render();
    } catch (error) {
      status.textContent = `ZIP 분석 실패: ${error.message || "알 수 없는 오류"}`;
    }
  });

  document.getElementById("copyMarkdownBtn").addEventListener("click", async () => {
    const markdown = state.teamAlignment?.normalizedMarkdown || "";
    const status = document.getElementById("notionImportStatus");
    if (!markdown) {
      status.textContent = "복사할 회의록 정리본이 없습니다. Notion ZIP을 먼저 분석해주세요.";
      return;
    }

    await navigator.clipboard.writeText(markdown);
    status.textContent = "회의록 정리본.md 내용을 클립보드에 복사했습니다.";
  });

  document.getElementById("downloadMarkdownBtn").addEventListener("click", () => {
    const markdown = state.teamAlignment?.normalizedMarkdown || "";
    const status = document.getElementById("notionImportStatus");
    if (!markdown) {
      status.textContent = "다운로드할 회의록 정리본이 없습니다. Notion ZIP을 먼저 분석해주세요.";
      return;
    }

    downloadTextFile(`meeting-summary-${today}.md`, markdown);
  });

  document.getElementById("taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const startDate = String(form.get("startDate") || form.get("dueDate") || today);
    const dueDate = String(form.get("dueDate") || startDate);
    const [normalizedStartDate, normalizedDueDate] = getTaskDateRange({ startDate, dueDate });
    state.tasks.unshift({
      id: createId("task"),
      title: String(form.get("title") || "").trim(),
      owner: String(form.get("owner") || members[0]),
      status: "todo",
      startDate: normalizedStartDate,
      dueDate: normalizedDueDate,
      source: String(form.get("source") || "직접 추가").trim() || "직접 추가",
      priority: String(form.get("priority") || "medium"),
    });
    event.currentTarget.reset();
    event.currentTarget.querySelector('input[name="startDate"]').value = today;
    event.currentTarget.querySelector('input[name="dueDate"]').value = today;
    saveState();
    render();
  });

  document.getElementById("validationForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.validations.unshift({
      id: createId("validation"),
      date: today,
      target: String(form.get("target") || "").trim(),
      hypothesis: String(form.get("hypothesis") || "").trim(),
      insight: String(form.get("insight") || "").trim(),
      nextAction: String(form.get("nextAction") || "").trim(),
    });
    event.currentTarget.reset();
    saveState();
    render();
  });

  document.addEventListener("change", (event) => {
    const statusTaskId = event.target.dataset?.taskStatus;
    if (statusTaskId) {
      state.tasks = state.tasks.map((task) =>
        task.id === statusTaskId ? { ...task, status: event.target.value } : task,
      );
      saveState();
      render();
    }

    const paperId = event.target.dataset?.paperDone;
    if (paperId) {
      state.paperSections = state.paperSections.map((section) =>
        section.id === paperId
          ? { ...section, done: event.target.checked, status: event.target.checked ? "done" : section.status }
          : section,
      );
      saveState();
      render();
    }

    const paperStatusId = event.target.dataset?.paperStatus;
    if (paperStatusId) {
      state.paperSections = state.paperSections.map((section) =>
        section.id === paperStatusId ? { ...section, status: event.target.value, done: event.target.value === "done" } : section,
      );
      saveState();
      render();
    }
  });

  document.addEventListener("click", (event) => {
    const paperSelectId = event.target.closest("[data-paper-select]")?.dataset?.paperSelect;
    if (!paperSelectId) return;
    selectedPaperSectionId = paperSelectId;
    renderPaper();
  });

  document.getElementById("scrumForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const taskTitle = String(form.get("taskTitle") || "").trim();
    const validation = String(form.get("validation") || "").trim();
    const blocker = String(form.get("blocker") || "").trim();
    const member = String(form.get("member") || members[0]);

    state.scrums.unshift({
      id: createId("scrum"),
      date: today,
      member,
      yesterday: String(form.get("yesterday") || "").trim(),
      today: String(form.get("today") || "").trim(),
      blocker,
      validation,
    });

    if (taskTitle) {
      const startDate = String(form.get("startDate") || form.get("dueDate") || today);
      const dueDate = String(form.get("dueDate") || startDate);
      const [normalizedStartDate, normalizedDueDate] = getTaskDateRange({ startDate, dueDate });
      state.tasks.unshift({
        id: createId("task"),
        title: taskTitle,
        owner: member,
        status: blocker ? "blocked" : "todo",
        startDate: normalizedStartDate,
        dueDate: normalizedDueDate,
        source: "데일리 스크럼",
        priority: blocker ? "high" : "medium",
      });
    }

    if (validation) {
      state.validations.unshift({
        id: createId("validation"),
        date: today,
        target: `${member} 스크럼`,
        hypothesis: "오늘 기록된 업무 또는 실험 메모를 다음 연구 액션으로 연결한다",
        insight: validation,
        nextAction: taskTitle || "다음 회의에서 후속 액션 확정",
      });
    }

    event.currentTarget.reset();
    event.currentTarget.querySelector('input[name="startDate"]').value = today;
    event.currentTarget.querySelector('input[name="dueDate"]').value = today;
    saveState();
    render();
  });

  document.getElementById("archiveForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.archives.unshift({
      id: createId("archive"),
      title: String(form.get("title") || "").trim(),
      type: String(form.get("type") || "자료"),
      link: String(form.get("link") || "").trim(),
      summary: String(form.get("summary") || "").trim(),
      createdAt: today,
    });
    event.currentTarget.reset();
    saveState();
    render();
  });

  document.getElementById("exportBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `aim-research-team-os-${today}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    state = structuredClone(sampleState);
    saveState();
    render();
  });

  document.getElementById("syncBtn").addEventListener("click", async () => {
    const passcode = document.getElementById("passcodeInput").value.trim();
    if (passcode) window.sessionStorage.setItem(PASSCODE_KEY, passcode);
    setSyncStatus("연결 중", "saving");
    const connected = await fetchCloudState();
    if (connected) await saveCloudState();
  });
}

bindEvents();
render();
fetchCloudState();
