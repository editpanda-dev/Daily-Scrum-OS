import JSZip from "jszip";

const STORAGE_KEY = "aim_research_team_os_v1";
const PASSCODE_KEY = "aim_research_team_os_passcode";
const API_ENDPOINT = "/api/state";
const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1FcPQHlpGc736etJQKGEEhqWpasH56tun?usp=drive_link";
const today = formatDateKey(new Date());
const DEFAULT_REVISION = "2026-07-05-hufstudy-roi-alignment";

const members = ["지우진", "최서린", "최은서", "팀 공통"];

const statuses = [
  ["todo", "할 일"],
  ["progress", "진행중"],
  ["review", "검토"],
  ["done", "완료"],
  ["blocked", "막힘"],
];

const sampleState = {
  defaultRevision: DEFAULT_REVISION,
  tasks: [
    {
      id: "task-professor-mail",
      title: "배교수님 컨택 메일 작성 및 발송",
      owner: "지우진",
      status: "todo",
      startDate: "2026-07-05",
      dueDate: "2026-07-07",
      source: "1차 회의 다음 과제",
      priority: "high",
    },
    {
      id: "task-human-dataset",
      title: "인간 광고 데이터셋 100개 수집",
      owner: "최서린",
      status: "todo",
      startDate: "2026-07-05",
      dueDate: "2026-07-16",
      source: "R&R: 인간 데이터셋",
      priority: "high",
    },
    {
      id: "task-product-dataset",
      title: "제품 광고 데이터셋 100개 수집",
      owner: "지우진",
      status: "todo",
      startDate: "2026-07-05",
      dueDate: "2026-07-16",
      source: "R&R: 제품 데이터셋",
      priority: "high",
    },
    {
      id: "task-character-dataset",
      title: "캐릭터 광고 데이터셋 100개 수집",
      owner: "최은서",
      status: "todo",
      startDate: "2026-07-05",
      dueDate: "2026-07-16",
      source: "R&R: 캐릭터 데이터셋",
      priority: "high",
    },
    {
      id: "task-cnn-study",
      title: "CNN 구조 탐색 및 팀별 학습 내용 정리",
      owner: "팀 공통",
      status: "progress",
      startDate: "2026-07-05",
      dueDate: "2026-07-16",
      source: "공통 과제",
      priority: "high",
    },
    {
      id: "task-os-finish",
      title: "Daily Scrum OS Notion ZIP 기반 운영 기능 완성",
      owner: "지우진",
      status: "review",
      startDate: today,
      dueDate: "2026-07-16",
      source: "R&R: OS 완성",
      priority: "high",
    },
    {
      id: "task-report-personal",
      title: "보고서 개인 파트 작성",
      owner: "팀 공통",
      status: "todo",
      startDate: "2026-07-05",
      dueDate: "2026-07-16",
      source: "공통 과제",
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
      date: "2026-07-02",
      title: "1차 회의: CNN 기반 AI-like probability와 ROI 연구 설계",
      minutes:
        "GOAL: CNN 기반 AI-like probability가 소비자 저항도, 클릭의향, 구매의도, ROI 판단에 미치는 영향 검증\nAGENDA: AI광고 퀄리티에 따른 ROI 변화\nDECISION: 기존 설문 중심 연구와 달리 클릭의향/구매의도 및 전환 반응을 함께 검증한다\nTODO: @최서린 2026-07-05~2026-07-16 인간 광고 데이터셋 100개 수집\nTODO: @지우진 2026-07-05~2026-07-16 제품 광고 데이터셋 100개 수집\nTODO: @최은서 2026-07-05~2026-07-16 캐릭터 광고 데이터셋 100개 수집",
      actionsCount: 4,
      createdAt: today,
    },
  ],
  calendarItems: [
    {
      id: "calendar-next-meeting",
      title: "다음 회의: 데이터셋 수집 및 CNN 진행 점검",
      owner: "팀 공통",
      startDate: "2026-07-07",
      dueDate: "2026-07-07",
      type: "회의",
      note: "화요일 21시. 인간/제품/캐릭터 데이터셋 수집 기준과 CNN 학습 현황을 점검한다.",
    },
    {
      id: "calendar-mid-deadline",
      title: "중간 목표: CNN 완성 및 설문 배포 전 단계",
      owner: "팀 공통",
      startDate: "2026-07-05",
      dueDate: "2026-07-16",
      type: "마감",
      note: "CNN 완성, 설문조사 최종 배포 전 단계, 논문 파트 작성까지 완료한다.",
    },
    {
      id: "calendar-survey-launch",
      title: "설문 배포 및 실험 세팅 완성",
      owner: "팀 공통",
      startDate: "2026-07-22",
      dueDate: "2026-07-22",
      type: "마감",
      note: "집단별 전환 반응 측정을 위한 설문/웹 실험 배포 목표일.",
    },
    {
      id: "calendar-final",
      title: "최종 산출물 마감",
      owner: "팀 공통",
      startDate: "2026-08-09",
      dueDate: "2026-08-09",
      type: "마감",
      note: "최종 논문 및 프로젝트 산출물 정리.",
    },
  ],
  teamAlignment: {
    currentGoal: "CNN 기반 AI-like probability와 광고 저항도가 ROI 판단에 미치는 영향 검증",
    theme: "AI광고 퀄리티에 따른 ROI 변화: AI처럼 보일 확률이 높을수록 소비자 저항도와 클릭/구매의도가 어떻게 달라지는지 검증",
    updatedAt: "2026-07-02",
    sourceFiles: 1,
    agendas: ["AI광고 퀄리티에 따른 ROI 변화", "CNN 기반 AI-like probability 산출", "광고 저항도와 클릭의향/구매의도 측정", "인간·캐릭터·제품 데이터셋 100개씩 수집"],
    decisions: [
      "논문의 차별성은 AI 광고 거부감을 단순 설문이 아니라 클릭의향, 구매의도, 전환 반응과 연결해 검증하는 것이다.",
      "CNN 기반 AI-like probability가 높을수록 광고 저항도가 높아지고, 클릭의향과 구매의도는 낮아지는지 검증한다.",
      "전환확률예측모델 자체보다 AI 인식, 저항도, 클릭/구매의도, ROI 판단 흐름을 중심으로 설계한다.",
    ],
    nextAgendas: ["배교수님 컨택 메일", "CNN 구조 탐색 및 학습 방식 정리", "인간/캐릭터/제품 데이터셋 수집 기준 확정", "위험도 3집단별 설문/웹 실험 설계"],
    accomplishments: [
      { member: "지우진", text: "데일리 워크시트와 논문 진행도/자료 정리함 기반 OS 제작" },
      { member: "최서린", text: "2주차 선행연구 분석 및 제출용 보고서 담당" },
      { member: "최은서", text: "2주차 선행연구 분석 및 Notion 회의록 정리 담당" },
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
      title: "1차 회의록: AI광고 퀄리티에 따른 ROI 변화",
      type: "주간보고서",
      link: DRIVE_FOLDER_URL,
      summary:
        "CNN 기반 AI-like probability, 광고 저항도, 클릭의향, 구매의도, ROI 판단 흐름으로 연구 주제를 구체화한 회의록.",
      createdAt: today,
    },
    {
      id: "archive-cnn-repo",
      title: "CNN_AIM GitHub Repository",
      type: "실험설계",
      link: "https://github.com/editpanda-dev/CNN_AIM",
      summary:
        "CNN 탐색, 데이터셋 다양화, 인간/캐릭터/제품 광고 이미지 학습을 위한 코드 저장소.",
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
      goal: "AI 광고 퀄리티와 AI처럼 보이는 정도가 소비자 반응 및 ROI 판단에 미치는 문제를 연구 배경으로 정리한다.",
      progress: "실제 구매 전환 클릭률/구매의도 기반 검증이라는 차별성 정리 중",
      next: "설문 중심 선행연구와 달리 행동 반응 및 ROI 판단으로 확장하는 연구 필요성 작성",
      notes: "논문의 차별성은 AI 광고 거부감 연구를 실제 클릭의향, 구매의도, 전환 반응, ROI 판단과 연결하는 데 있다.",
    },
    {
      id: "paper-lit",
      title: "2. 선행연구",
      owner: "최서린",
      status: "todo",
      done: false,
      goal: "AI 광고 인식, 광고 저항도, 클릭의향, 구매의도, 산업군 조절효과 관련 문헌을 정리한다.",
      progress: "서린/은서 2주차 선행연구 분석 페이지 기반으로 인사이트 정리 중",
      next: "H1~H5 가설과 연결되는 선행연구를 변수별로 배치",
      notes: "핵심 가설은 AI-like probability가 광고 저항도를 높이고, 저항도가 클릭의향과 구매의도를 낮춘다는 흐름이다.",
    },
    {
      id: "paper-method",
      title: "3. 연구방법",
      owner: "지우진",
      status: "progress",
      done: false,
      goal: "CNN 기반 AI-like probability와 위험도 3집단 실험 설계를 정의한다.",
      progress: "고위험/중위험/저위험 집단별 구글폼 또는 웹 실험 방식 논의 완료",
      next: "한 세트당 설문 문항 5개, 인간/캐릭터/제품 각 2개 구성 기준 구체화",
      notes: "시작 시 랜덤 3개 집단에 배정하고 클릭률, 구매전환률 또는 클릭의향/구매의도를 측정한다.",
    },
    {
      id: "paper-stimuli",
      title: "4. 실험자극물",
      owner: "최은서",
      status: "todo",
      done: false,
      goal: "인간/캐릭터/제품 광고 이미지 데이터셋을 각자 100개씩 수집하고 CNN 학습 기준을 정리한다.",
      progress: "R&R 확정: 서린 인간, 우진 제품, 은서 캐릭터 데이터셋",
      next: "지우진, 최서린, 최은서가 각자 광고 이미지 100장씩 조사",
      notes: "Gemini, GPT, Claude 등 다양한 생성 데이터셋을 모으되 내용과 형태를 유지한 변형도 고려한다.",
    },
    {
      id: "paper-result",
      title: "5. 결과",
      owner: "지우진",
      status: "todo",
      done: false,
      goal: "CNN 기반 AI-like probability, 광고 저항도, 클릭의향, 구매의도 간 관계를 분석한다.",
      progress: "실험 설계 확정 후 작성 예정",
      next: "위험도 3집단별 클릭의향/구매의도 차이를 비교할 분석표 설계",
      notes: "고위험군이 실제로 전환 반응 또는 구매의도가 낮아지는지 검증한다.",
    },
    {
      id: "paper-discussion",
      title: "6. 논의 및 결론",
      owner: "팀 공통",
      status: "todo",
      done: false,
      goal: "AI 인식 패널티와 ROI 판단을 연결해 실무적 시사점을 정리한다.",
      progress: "결과 도출 후 작성 예정",
      next: "AI-like probability가 높을 때 ROI 계산에서 어떤 패널티를 고려해야 하는지 논의",
      notes: "ROI를 완전히 빼지 않고, 전환확률예측모델 없이도 AI 인식-저항도-전환 반응-ROI 판단 흐름으로 설명한다.",
    },
  ],
  experiments: [
    {
      id: "exp-woojin",
      title: "지우진 · 제품 광고 데이터셋 100개",
      body: "제품 광고 후보를 수집하고, AI-like probability와 ROI 판단에 연결할 수 있는 산업군/CTA/전환 반응 기준을 기록한다.",
    },
    {
      id: "exp-seorin",
      title: "최서린 · 인간 광고 데이터셋 100개",
      body: "인간 모델 중심 광고 후보를 수집하고, AI 광고 인식 및 광고 저항도 관련 선행연구와 연결한다.",
    },
    {
      id: "exp-eunseo",
      title: "최은서 · 캐릭터 광고 데이터셋 100개",
      body: "캐릭터 광고 후보를 수집하고, Notion 회의록 정리와 함께 데이터셋 출처 및 통제 조건을 관리한다.",
    },
    {
      id: "exp-control",
      title: "위험도 3집단 설계",
      body: "CNN 출력값을 기준으로 고위험, 중위험, 저위험 집단을 나누고 각 집단별 클릭의향, 구매의도, ROI 판단 차이를 검증한다.",
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
  const shouldRefreshDefaults = nextState.defaultRevision !== DEFAULT_REVISION;
  const paperById = new Map(defaults.paperSections.map((section) => [section.id, section]));
  const previousPaperById = new Map((nextState.paperSections || []).map((section) => [section.id, section]));
  const paperSections = shouldRefreshDefaults
    ? defaults.paperSections.map((section) => {
        const previous = previousPaperById.get(section.id);
        return previous ? { ...section, status: previous.status || section.status, done: Boolean(previous.done) } : section;
      })
    : (nextState.paperSections || defaults.paperSections).map((section) => ({
        ...(paperById.get(section.id) || {}),
        ...section,
      }));

  const hasUpdatedExperimentPlan = (nextState.experiments || []).some((item) => item.id === "exp-woojin");
  const defaultTaskIds = new Set(defaults.tasks.map((task) => task.id));
  const customTasks = (nextState.tasks || []).filter((task) => !defaultTaskIds.has(task.id));
  const defaultCalendarIds = new Set(defaults.calendarItems.map((item) => item.id));
  const customCalendarItems = (nextState.calendarItems || []).filter((item) => !defaultCalendarIds.has(item.id));
  const defaultArchiveIds = new Set(defaults.archives.map((item) => item.id));
  const customArchives = (nextState.archives || []).filter((item) => !defaultArchiveIds.has(item.id));

  return {
    ...defaults,
    ...nextState,
    defaultRevision: DEFAULT_REVISION,
    tasks: shouldRefreshDefaults ? [...defaults.tasks, ...customTasks] : nextState.tasks || defaults.tasks,
    calendarItems: shouldRefreshDefaults ? [...defaults.calendarItems, ...customCalendarItems] : nextState.calendarItems || defaults.calendarItems,
    teamAlignment: shouldRefreshDefaults ? defaults.teamAlignment : nextState.teamAlignment || defaults.teamAlignment,
    archives: shouldRefreshDefaults ? [...defaults.archives, ...customArchives] : nextState.archives || defaults.archives,
    paperSections,
    experiments: shouldRefreshDefaults || !hasUpdatedExperimentPlan ? defaults.experiments : nextState.experiments,
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
