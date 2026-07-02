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
      title: "서론: 생성형 AI 광고와 소비자 신뢰 문제",
      owner: "최서린",
      status: "progress",
      done: false,
    },
    {
      id: "paper-lit",
      title: "선행연구: AI 광고 인식, 신뢰, 클릭/전환 행동",
      owner: "최서린",
      status: "todo",
      done: false,
    },
    {
      id: "paper-method",
      title: "연구방법: A/B 테스트 설계 및 행동지표 측정",
      owner: "지우진",
      status: "progress",
      done: false,
    },
    {
      id: "paper-stimuli",
      title: "실험자극물: Human/AI 광고 후보와 risk band",
      owner: "최은서",
      status: "todo",
      done: false,
    },
    {
      id: "paper-result",
      title: "결과: CTR·CVR·구매버튼 클릭 차이 분석",
      owner: "지우진",
      status: "todo",
      done: false,
    },
    {
      id: "paper-discussion",
      title: "논의: trust penalty와 ROI 임계점 보정",
      owner: "팀 공통",
      status: "todo",
      done: false,
    },
  ],
  experiments: [
    {
      id: "exp-1",
      title: "광고 자극물 조건",
      body: "동일 제품군에서 AI 제작 광고와 인간 제작 광고를 최대한 동일한 정보량과 레이아웃으로 비교한다.",
    },
    {
      id: "exp-2",
      title: "무작위 배정",
      body: "참여자를 A안과 B안에 무작위 배정해 노출 순서와 표본 편향을 줄인다.",
    },
    {
      id: "exp-3",
      title: "행동 로그",
      body: "광고 노출, 광고 클릭, 상세 페이지 진입, 구매버튼 클릭을 이벤트로 분리해 저장한다.",
    },
    {
      id: "exp-4",
      title: "설문 결합",
      body: "행동지표와 함께 신뢰도, AI스러움 인식, 구매의향을 5점 척도로 측정한다.",
    },
  ],
};

let state = readLocalState();
let cloudEnabled = false;
let saveTimer = null;
let calendarCursor = new Date(`${today.slice(0, 7)}-01T00:00:00`);

function readLocalState() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(sampleState);
  try {
    return { ...structuredClone(sampleState), ...JSON.parse(raw) };
  } catch {
    return structuredClone(sampleState);
  }
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
    state = { ...structuredClone(sampleState), ...data.payload };
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
    .querySelectorAll(
      'select[name="member"], select[name="owner"], #ownerFilter, #calendarOwnerFilter, #speakerSelect, #actionOwnerSelect',
    )
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

  return [...taskEvents, ...meetingEvents];
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
                  <span>${event.type === "meeting" ? "회의" : event.isStart ? `시작 · ${statusLabel(event.status)}` : event.isEnd ? `마감 · ${statusLabel(event.status)}` : `진행 · ${statusLabel(event.status)}`}</span>
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
  container.innerHTML = state.paperSections
    .map(
      (section) => `
        <article class="paper-item">
          <div class="paper-topline">
            <div>
              <span class="badge ${section.status}">${statusLabel(section.status)}</span>
              <h3>${escapeHtml(section.title)}</h3>
              <p class="meta-row">${escapeHtml(section.owner)}</p>
            </div>
            <input type="checkbox" data-paper-done="${escapeHtml(section.id)}" ${section.done ? "checked" : ""} aria-label="논문 섹션 완료" />
          </div>
        </article>
      `,
    )
    .join("");
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

  const meetingDateInput = document.querySelector('#meetingForm input[name="date"]');
  if (meetingDateInput && !meetingDateInput.value) meetingDateInput.value = today;

  document.getElementById("addAgendaBtn").addEventListener("click", () => {
    const input = document.getElementById("agendaInput");
    const agenda = input.value.trim();
    if (!agenda) return;

    appendMinutesLine(`AGENDA: ${agenda}`);
    input.value = "";
  });

  document.getElementById("addSpeakerBtn").addEventListener("click", () => {
    const customInput = document.getElementById("customSpeakerInput");
    const selectedName = document.getElementById("speakerSelect").value;
    const speaker = customInput.value.trim() || selectedName;
    if (!speaker) return;

    appendMinutesLine(`${speaker}: `, true);
    customInput.value = "";
  });

  document.getElementById("addActionBtn").addEventListener("click", () => {
    const actionInput = document.getElementById("actionTitleInput");
    const type = document.getElementById("actionTypeSelect").value || "TODO";
    const owner = document.getElementById("actionOwnerSelect").value || members[0];
    const startDate = document.getElementById("actionStartDate").value || today;
    const dueDate = document.getElementById("actionDueDate").value || startDate;
    const [normalizedStartDate, normalizedDueDate] = getTaskDateRange({ startDate, dueDate });
    const title = actionInput.value.trim();
    if (!title) return;

    appendMinutesLine(`${type}: @${owner} ${normalizedStartDate}~${normalizedDueDate} ${title}`);
    actionInput.value = "";
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

  document.getElementById("meetingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    const date = String(form.get("date") || today);
    const minutes = String(form.get("minutes") || "").trim();
    const extractedTasks = parseMeetingActions(minutes, title);

    state.meetings = [
      {
        id: createId("meeting"),
        date,
        title,
        minutes,
        actionsCount: extractedTasks.length,
        createdAt: today,
      },
      ...(state.meetings || []),
    ];
    state.tasks = [...extractedTasks, ...state.tasks];
    state.archives.unshift({
      id: createId("archive"),
      title,
      type: "회의록",
      link: DRIVE_FOLDER_URL,
      summary: `회의록에서 향후 업무 ${extractedTasks.length}개를 추출했습니다.`,
      createdAt: date,
    });

    event.currentTarget.reset();
    event.currentTarget.querySelector('input[name="date"]').value = today;
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
