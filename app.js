const STORAGE_KEY = "aim_research_team_os_v1";
const PASSCODE_KEY = "aim_research_team_os_passcode";
const API_ENDPOINT = "/api/state";
const today = new Date().toISOString().slice(0, 10);

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
      dueDate: "2026-06-30",
      source: "1주차 다음 액션",
      priority: "high",
    },
    {
      id: "task-literature",
      title: "생성형 AI 광고 인식·소비자 신뢰 선행연구 3편 이상 요약",
      owner: "최서린",
      status: "todo",
      dueDate: "2026-06-30",
      source: "문헌조사",
      priority: "high",
    },
    {
      id: "task-stimuli",
      title: "Human/AI 광고 자극물 후보와 AI-like risk band 자료 수집",
      owner: "최은서",
      status: "todo",
      dueDate: "2026-06-30",
      source: "광고자극물",
      priority: "medium",
    },
    {
      id: "task-scrum-os",
      title: "데일리 스크럼 기반 업무 공유 및 자료 아카이빙 워크플로우 구축",
      owner: "지우진",
      status: "review",
      dueDate: today,
      source: "개인 목표",
      priority: "high",
    },
    {
      id: "task-weekly-report",
      title: "2주차 회의에서 문헌 요약 공유 후 연구문제별 참고문헌 목록 확정",
      owner: "팀 공통",
      status: "todo",
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
  validations: [
    {
      id: "validation-1",
      date: today,
      target: "친구/부모님 예비 반응",
      hypothesis: "AI 광고와 인간 광고를 구분하기 어려워하는 사용자가 많다",
      insight: "AI 여부보다 광고가 신뢰 가능한지, 구매하고 싶은지에 대한 반응을 먼저 확인해야 한다",
      nextAction: "A/B 테스트에서 클릭, 구매버튼 클릭, 신뢰도 설문을 함께 측정",
    },
  ],
  archives: [
    {
      id: "archive-week1",
      title: "1주차 AIM HUFStudy 주간학습보고서",
      type: "주간보고서",
      link: "/Users/woojin/Desktop/1주차_AIM_HUFStudy_주간학습보고서_사진첨부.pdf",
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

function getDaysLeft(date) {
  return Math.ceil((new Date(date).getTime() - new Date(today).getTime()) / 86400000);
}

function statusLabel(status) {
  return statuses.find(([key]) => key === status)?.[1] || status;
}

function render() {
  renderMemberOptions();
  renderMetrics();
  renderTimeline();
  renderValidations();
  renderTasks();
  renderScrums();
  renderPaper();
  renderExperiments();
  renderArchive();
}

function renderMemberOptions() {
  document.querySelectorAll('select[name="member"], select[name="owner"], #ownerFilter').forEach((select) => {
    const current = select.value;
    const leading = select.id === "ownerFilter" ? '<option value="all">전체 담당자</option>' : "";
    select.innerHTML =
      leading +
      members.map((member) => `<option value="${escapeHtml(member)}">${escapeHtml(member)}</option>`).join("");
    select.value = current || (select.id === "ownerFilter" ? "all" : members[0]);
  });

  const dueDateInput = document.querySelector('input[name="dueDate"]');
  if (dueDateInput && !dueDateInput.value) dueDateInput.value = today;

  document.querySelectorAll('input[name="dueDate"]').forEach((input) => {
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
  document.getElementById("validationCount").textContent = state.validations.length;
  document.getElementById("blockerCount").textContent = blockers;
  document.getElementById("activeTaskCount").textContent = activeTasks;
}

function renderTimeline() {
  const container = document.getElementById("timelineList");
  const tasks = [...state.tasks]
    .filter((task) => task.status !== "done")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 6);

  container.innerHTML = tasks
    .map((task) => {
      const days = getDaysLeft(task.dueDate);
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
            <span>${escapeHtml(task.dueDate)}</span>
          </div>
          <div class="progress-track"><div class="progress-bar" style="width:${width}%"></div></div>
          <p class="meta-row" style="margin:8px 0 0">${dueText}</p>
        </article>
      `;
    })
    .join("");
}

function renderValidations() {
  const container = document.getElementById("recentValidationList");
  container.innerHTML = state.validations
    .slice(0, 5)
    .map(
      (item) => `
        <article class="list-item">
          <span class="badge done">${escapeHtml(item.date)}</span>
          <h3>${escapeHtml(item.target)}</h3>
          <p><strong>가설:</strong> ${escapeHtml(item.hypothesis)}</p>
          <p><strong>인사이트:</strong> ${escapeHtml(item.insight)}</p>
          <p><strong>다음 액션:</strong> ${escapeHtml(item.nextAction)}</p>
        </article>
      `,
    )
    .join("");
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
                    <span>${escapeHtml(task.dueDate)}</span>
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
                ${item.link ? `<span>${escapeHtml(item.link)}</span>` : ""}
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

  document.getElementById("taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.tasks.unshift({
      id: createId("task"),
      title: String(form.get("title") || "").trim(),
      owner: String(form.get("owner") || members[0]),
      status: "todo",
      dueDate: String(form.get("dueDate") || today),
      source: String(form.get("source") || "직접 추가").trim() || "직접 추가",
      priority: String(form.get("priority") || "medium"),
    });
    event.currentTarget.reset();
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
      state.tasks.unshift({
        id: createId("task"),
        title: taskTitle,
        owner: member,
        status: blocker ? "blocked" : "todo",
        dueDate: String(form.get("dueDate") || today),
        source: "데일리 스크럼",
        priority: blocker ? "high" : "medium",
      });
    }

    if (validation) {
      state.validations.unshift({
        id: createId("validation"),
        date: today,
        target: `${member} 스크럼`,
        hypothesis: "오늘 기록된 고객 반응 또는 실험 메모를 다음 연구 액션으로 연결한다",
        insight: validation,
        nextAction: taskTitle || "다음 회의에서 후속 액션 확정",
      });
    }

    event.currentTarget.reset();
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
