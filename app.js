/* ==========================================================================
   APP.JS — rendering + local persistence. Reads STUDENT_CONFIG, LEVEL_COPY,
   LEVELS, SESSIONS, TOOLKIT_GROUPS, AFTER_SESSION_SIX from student-config.js
   and content.js (loaded before this file in index.html).

   Persistence: everything is saved to this browser's localStorage only —
   no account, no server, no database. See ONBOARDING.md / README.md.
   ========================================================================== */

(function () {
  "use strict";

  const LEVEL = (STUDENT_CONFIG.level && LEVELS[STUDENT_CONFIG.level]) ? STUDENT_CONFIG.level : "high";
  const SLUG = slugify(STUDENT_CONFIG.name || "student");
  const NS = "vt-ef-" + SLUG + "-";

  function slugify(s) {
    return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "student";
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  // Resolve {{phraseKey}} tokens against LEVEL_COPY for the current level.
  function t(str) {
    if (str == null) return "";
    return String(str).replace(/\{\{(\w+)\}\}/g, (m, key) => {
      if (LEVEL_COPY[key] && LEVEL_COPY[key][LEVEL] != null) return LEVEL_COPY[key][LEVEL];
      return m;
    });
  }

  function get(key, fallback) {
    try {
      const raw = localStorage.getItem(NS + key);
      if (raw == null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  function set(key, value) {
    try {
      localStorage.setItem(NS + key, JSON.stringify(value));
    } catch (e) {
      console.warn("VT-EF: could not save to localStorage", e);
    }
  }

  // ---------------------------------------------------------------------
  // Tabs
  // ---------------------------------------------------------------------
  const tabButtons = [...document.querySelectorAll("nav.tabs button")];
  const panels = [...document.querySelectorAll(".tab-panel")];

  function showTab(id) {
    panels.forEach((p) => p.classList.toggle("active", p.id === id));
    tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.tab === id));
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  tabButtons.forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
  document.querySelectorAll("[data-jump]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showTab(el.dataset.jump);
    })
  );

  // ---------------------------------------------------------------------
  // Session progress state
  // ---------------------------------------------------------------------
  function completedMap() {
    return get("completed", {});
  }
  function isComplete(sessionId) {
    return !!completedMap()[sessionId];
  }
  function currentSessionIndex() {
    const completed = completedMap();
    const idx = SESSIONS.findIndex((s) => !completed[s.id]);
    return idx === -1 ? SESSIONS.length - 1 : idx;
  }
  function activeIndex() {
    const stored = get("activeIndex", null);
    return stored != null ? Math.min(stored, SESSIONS.length - 1) : currentSessionIndex();
  }
  function setActiveIndex(i) {
    set("activeIndex", i);
  }

  function fieldKey(session, key) {
    return "field-" + session.id + "-" + key;
  }

  // ---------------------------------------------------------------------
  // HOME
  // ---------------------------------------------------------------------
  function renderHome() {
    const host = document.getElementById("home-content");
    const idx = activeIndex();
    const session = SESSIONS[idx];
    const doneCount = Object.values(completedMap()).filter(Boolean).length;
    const priorities = (STUDENT_CONFIG.priorities || []).map((p) => `<span class="tag">${esc(p)}</span>`).join(" ");
    const plannerBtn = STUDENT_CONFIG.plannerUrl
      ? `<a class="btn white" href="${esc(STUDENT_CONFIG.plannerUrl)}" target="_blank" rel="noopener">Open Planner</a>`
      : `<a class="btn white" data-jump="planner" href="#">Set up Planner</a>`;

    host.innerHTML = `
      <div class="hero">
        <span class="tag">${esc(LEVELS[LEVEL].label)} · ${esc(LEVELS[LEVEL].gradeHint)}</span>
        <h1>Welcome back, ${esc(STUDENT_CONFIG.name)}.</h1>
        <p>Grade ${esc(STUDENT_CONFIG.grade)} · Coached by ${esc(STUDENT_CONFIG.tutorName)}</p>
        <div class="actions">
          <a class="btn white" data-jump="current-session" href="#">Open Current Session</a>
          ${plannerBtn}
          <a class="btn soft" data-jump="toolkit" href="#">Open Toolkit</a>
        </div>
      </div>
      <div class="grid g3" style="margin-top:16px">
        <div class="card"><h3>Current priorities</h3><p>${priorities || '<span class="muted">Set priorities in student-config.js</span>'}</p></div>
        <div class="card"><h3>Current session</h3><p><b>Session ${session.number}: ${esc(session.title)}</b><br><span class="muted">${esc(session.tagline)}</span></p></div>
        <div class="card"><h3>Launch progress</h3><div class="progress"><div style="width:${Math.round((doneCount / SESSIONS.length) * 100)}%"></div></div><p class="muted" style="margin-top:8px">${doneCount} of ${SESSIONS.length} launch sessions complete</p></div>
      </div>
      <div class="step" style="margin-top:20px">
        <h2>Quick Toolkit links</h2>
        <div class="actions">
          ${["five-minute-start", "focus-reset", "next-action", "active-recall"].map((id) => `<button class="btn ghost" data-open-tool="${id}">${esc(findTool(id).title)}</button>`).join("")}
        </div>
      </div>
    `;
    host.querySelectorAll("[data-jump]").forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        showTab(el.dataset.jump);
      })
    );
    host.querySelectorAll("[data-open-tool]").forEach((el) =>
      el.addEventListener("click", () => {
        showTab("toolkit");
        setTimeout(() => {
          const target = document.getElementById("tool-" + el.dataset.openTool);
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 30);
      })
    );
  }

  function findTool(id) {
    for (const g of TOOLKIT_GROUPS) {
      const found = g.tools.find((tool) => tool.id === id);
      if (found) return found;
    }
    return { title: id };
  }

  // ---------------------------------------------------------------------
  // CURRENT SESSION
  // ---------------------------------------------------------------------
  function renderCurrentSession() {
    const host = document.getElementById("current-session-content");
    const idx = activeIndex();
    const session = SESSIONS[idx];
    const levelMeta = LEVELS[LEVEL];
    const extra = LEVEL === "middle" ? session.middleExtra : LEVEL === "launch" ? session.launchExtra : null;

    const stepsHtml = session.steps
      .map((step, i) => {
        const prompts = (step.prompts || [])
          .map((p) => {
            const text = t(p);
            const key = fieldKey(session, "step" + i + "-" + hash(text));
            const saved = esc(get(key, ""));
            return `<label>${esc(text)}</label><textarea data-save-key="${key}">${saved}</textarea>`;
          })
          .join("");
        return `
        <div class="step">
          <span class="time-badge">${step.minutes ? step.minutes + " min" : ""}</span>
          <h2>${esc(step.heading)}</h2>
          <p>${esc(t(step.body))}</p>
          <div class="prompt-list">${prompts}</div>
        </div>`;
      })
      .join("");

    const extraHtml = extra
      ? `<div class="callout purple"><b>${LEVEL === "middle" ? "Extra scaffolding" : "Stretch"}:</b> ${esc(extra)}</div>`
      : "";

    const tg = session.tutorGuide;
    const tutorGuideHtml = `
      <details class="tutor-guide">
        <summary>Tutor Guide</summary>
        <div class="tg-row"><div class="tg-label">Timing</div><p>${esc(tg.timing)}</p></div>
        <div class="tg-row"><div class="tg-label">Coaching goal</div><p>${esc(tg.coachingGoal)}</p></div>
        <div class="tg-row"><div class="tg-label">What success looks like</div><p>${esc(tg.successLooksLike)}</p></div>
        <div class="tg-row"><div class="tg-label">What to watch for</div><p>${esc(tg.watchFor)}</p></div>
        <div class="tg-row"><div class="tg-label">Optional extension</div><p>${esc(tg.extension)}</p></div>
        <div class="tg-row"><div class="tg-label">What to skip if mastery is already shown</div><p>${esc(tg.skipIf)}</p></div>
      </details>`;

    const isDone = isComplete(session.id);
    const nextSession = SESSIONS[idx + 1];

    host.innerHTML = `
      <div class="hero">
        <span class="tag">SESSION ${session.number} of ${SESSIONS.length}${isDone ? " · COMPLETE" : ""}</span>
        <h1>${esc(session.title)}</h1>
        <p>${esc(session.tagline)}</p>
      </div>
      <div class="callout" style="margin-top:16px"><b>Goal:</b> ${esc(session.goal)}</div>
      ${extraHtml}
      ${stepsHtml}
      ${tutorGuideHtml}
      <div class="step">
        <div class="actions">
          <button class="btn teal" id="markComplete">${isDone ? "Mark Not Complete" : "Mark Complete" + (nextSession ? " + Next" : "")}</button>
          ${idx > 0 ? '<button class="btn ghost" id="prevSession">← Previous Session</button>' : ""}
          ${nextSession ? '<button class="btn ghost" id="nextSessionBtn">Next Session →</button>' : ""}
        </div>
        ${!nextSession && isDone ? `<div class="callout warning" style="margin-top:14px">${esc(AFTER_SESSION_SIX)}</div>` : ""}
      </div>
    `;

    host.querySelectorAll("[data-save-key]").forEach((el) => {
      el.addEventListener("input", () => set(el.dataset.saveKey, el.value));
    });

    document.getElementById("markComplete").addEventListener("click", () => {
      const map = completedMap();
      map[session.id] = !map[session.id];
      set("completed", map);
      if (map[session.id] && nextSession) {
        setActiveIndex(idx + 1);
      }
      renderCurrentSession();
      renderRoadmap();
      renderHome();
    });
    const prevBtn = document.getElementById("prevSession");
    if (prevBtn) prevBtn.addEventListener("click", () => { setActiveIndex(idx - 1); renderCurrentSession(); });
    const nextBtn = document.getElementById("nextSessionBtn");
    if (nextBtn) nextBtn.addEventListener("click", () => { setActiveIndex(idx + 1); renderCurrentSession(); });
  }

  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
    return Math.abs(h).toString(36);
  }

  // ---------------------------------------------------------------------
  // ROADMAP
  // ---------------------------------------------------------------------
  function renderRoadmap() {
    const host = document.getElementById("roadmap-content");
    const idx = activeIndex();
    const rows = SESSIONS.map((s, i) => {
      const done = isComplete(s.id);
      const statusClass = done ? "complete" : i === idx ? "current" : "later";
      const statusLabel = done ? "Done" : i === idx ? "Current" : "Ready";
      return `
        <div class="session-row">
          <div><b>Session ${s.number}</b></div>
          <div><b>${esc(s.title)}</b><div class="muted">${esc(s.tagline)}</div></div>
          <div><span class="status ${statusClass}">${statusLabel}</span>
            <div class="actions"><button class="btn ghost" data-goto="${i}">Open</button></div>
          </div>
        </div>`;
    }).join("");
    const doneCount = Object.values(completedMap()).filter(Boolean).length;
    const allDone = doneCount === SESSIONS.length;

    host.innerHTML = `
      <h1>Roadmap</h1>
      <p class="lead">The six-session launch sequence. Each session defaults to 60 minutes with optional extension material.</p>
      <div class="progress" style="margin-bottom:6px"><div style="width:${Math.round((doneCount / SESSIONS.length) * 100)}%"></div></div>
      <p class="muted">${doneCount} of ${SESSIONS.length} complete</p>
      <div class="card" style="margin-top:14px">${rows}</div>
      ${allDone ? `<div class="callout warning" style="margin-top:16px"><b>What's next:</b> ${esc(AFTER_SESSION_SIX)}</div>` : ""}
    `;
    host.querySelectorAll("[data-goto]").forEach((el) =>
      el.addEventListener("click", () => {
        setActiveIndex(Number(el.dataset.goto));
        renderCurrentSession();
        showTab("current-session");
      })
    );
  }

  // ---------------------------------------------------------------------
  // TOOLKIT
  // ---------------------------------------------------------------------
  function renderToolkit() {
    const host = document.getElementById("toolkit-content");
    const groupsHtml = TOOLKIT_GROUPS.map((group) => {
      const toolsHtml = group.tools
        .map((tool) => {
          const steps = (tool.steps || []).map((s) => `<li>${esc(t(s))}</li>`).join("");
          const fieldsHtml = (tool.fields || [])
            .map((f) => {
              const key = "tool-" + tool.id + "-" + f.key;
              const saved = esc(get(key, ""));
              const label = esc(t(f.label));
              if (f.type === "text") {
                return `<label>${label}</label><input type="text" data-save-key="${key}" value="${saved}">`;
              }
              return `<label>${label}</label><textarea data-save-key="${key}">${saved}</textarea>`;
            })
            .join("");
          const timerHtml = tool.timerMinutes
            ? `<div class="timer-display" data-timer="${tool.id}">${String(tool.timerMinutes).padStart(2, "0")}:00</div>
               <div class="actions"><button class="btn blue" data-timer-start="${tool.id}" data-minutes="${tool.timerMinutes}">Start</button><button class="btn ghost" data-timer-reset="${tool.id}" data-minutes="${tool.timerMinutes}">Reset</button></div>`
            : "";
          const recallHtml = tool.interactive === "activeRecall" ? renderActiveRecallShell() : "";
          return `
            <div class="card tool-card" id="tool-${tool.id}">
              <h3>${esc(tool.title)}</h3>
              <p class="muted">${esc(tool.when)}</p>
              <ol>${steps}</ol>
              ${timerHtml}
              ${recallHtml}
              ${(fieldsHtml || tool.tip) ? `<div class="tool-workspace">${fieldsHtml}${tool.tip ? `<p class="save-note" style="margin-top:8px">${esc(tool.tip)}</p>` : ""}</div>` : ""}
            </div>`;
        })
        .join("");
      return `<div class="toolkit-group"><h2>${esc(group.group)}</h2><div class="grid g2">${toolsHtml}</div></div>`;
    }).join("");

    host.innerHTML = `
      <h1>Toolkit</h1>
      <p class="lead">Reusable executive-functioning tools. Use whichever one fits the problem in front of you — anytime, not just during a launch session.</p>
      ${groupsHtml}
    `;

    host.querySelectorAll("[data-save-key]").forEach((el) => {
      el.addEventListener("input", () => set(el.dataset.saveKey, el.value));
    });
    bindTimers(host);
    bindActiveRecall(host);
  }

  function bindTimers(host) {
    const intervals = {};
    host.querySelectorAll("[data-timer-start]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.timerStart;
        const minutes = Number(btn.dataset.minutes || 5);
        if (intervals[id]) return;
        let remaining = get("timer-remaining-" + id, minutes * 60);
        const display = host.querySelector(`[data-timer="${id}"]`);
        const render = () => {
          const m = String(Math.floor(remaining / 60)).padStart(2, "0");
          const s = String(remaining % 60).padStart(2, "0");
          if (display) display.textContent = `${m}:${s}`;
        };
        render();
        intervals[id] = setInterval(() => {
          remaining--;
          render();
          if (remaining <= 0) {
            clearInterval(intervals[id]);
            delete intervals[id];
            if (display) display.textContent = "Done!";
          }
        }, 1000);
      });
    });
    host.querySelectorAll("[data-timer-reset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.timerReset;
        const minutes = Number(btn.dataset.minutes || 5);
        if (intervals[id]) { clearInterval(intervals[id]); delete intervals[id]; }
        const display = host.querySelector(`[data-timer="${id}"]`);
        if (display) display.textContent = String(minutes).padStart(2, "0") + ":00";
      });
    });
  }

  // ---------------------------------------------------------------------
  // Active Recall — small generic retrieval widget (topic-agnostic).
  // ---------------------------------------------------------------------
  function renderActiveRecallShell() {
    return `
      <div class="recall-box">
        <label>Topic / material</label>
        <input type="text" data-save-key="tool-active-recall-topic" value="">
        <label>Write 2–4 retrieval questions (one per line)</label>
        <textarea data-recall-questions></textarea>
        <div class="actions">
          <button class="btn blue" data-recall-start>Start retrieval</button>
          <button class="btn ghost" data-recall-next>Next question</button>
        </div>
        <div class="recall-box" style="margin-top:10px">
          <p><b data-recall-question>Write your questions above, then start retrieval.</b></p>
          <label>Answer from memory</label>
          <textarea data-recall-answer></textarea>
          <div class="actions">
            <button class="btn ghost" data-recall-rate="got">✓ Got it</button>
            <button class="btn ghost" data-recall-rate="partial">~ Partial</button>
            <button class="btn ghost" data-recall-rate="missed">↺ Missed</button>
          </div>
        </div>
        <div style="margin-top:10px"><b>Repair list</b><div data-recall-repair class="muted">Nothing yet.</div></div>
      </div>`;
  }

  function bindActiveRecall(host) {
    const box = host.querySelector("[data-recall-questions]");
    if (!box) return;
    const key = "tool-active-recall-state";
    let state = get(key, { questions: "", pos: 0, repair: [] });
    box.value = state.questions || "";

    function questions() {
      return (box.value || "").split("\n").map((q) => q.trim()).filter(Boolean);
    }
    function persist() {
      state.questions = box.value;
      set(key, state);
    }
    function showQuestion() {
      const qs = questions();
      const el = host.querySelector("[data-recall-question]");
      if (!qs.length) { el.textContent = "Write your questions above, then start retrieval."; return; }
      state.pos = state.pos % qs.length;
      el.textContent = qs[state.pos];
      host.querySelector("[data-recall-answer]").value = "";
    }
    function renderRepair() {
      const el = host.querySelector("[data-recall-repair]");
      el.innerHTML = state.repair.length
        ? state.repair.map((q) => `<div>${esc(q)}</div>`).join("")
        : "Nothing yet.";
    }
    box.addEventListener("input", persist);
    host.querySelector("[data-recall-start]").addEventListener("click", () => { state.pos = 0; persist(); showQuestion(); });
    host.querySelector("[data-recall-next]").addEventListener("click", () => { state.pos++; showQuestion(); });
    host.querySelectorAll("[data-recall-rate]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qs = questions();
        if (!qs.length) return;
        const q = qs[state.pos];
        state.repair = state.repair.filter((x) => x !== q);
        if (btn.dataset.recallRate !== "got") state.repair.push(q);
        set(key, state);
        renderRepair();
        state.pos++;
        showQuestion();
      });
    });
    renderRepair();
  }

  // ---------------------------------------------------------------------
  // SESSION NOTES
  // ---------------------------------------------------------------------
  function renderNotes() {
    const host = document.getElementById("notes-content");
    const log = get("notes-log", []);
    const logHtml = log
      .slice()
      .reverse()
      .map(
        (entry) => `
        <div class="card" style="margin-bottom:10px">
          <p class="muted" style="margin-bottom:4px">${esc(entry.date)}</p>
          <p><b>What we worked on:</b> ${esc(entry.worked || "—")}</p>
          <p><b>What worked:</b> ${esc(entry.workedWell || "—")}</p>
          <p><b>What broke down:</b> ${esc(entry.brokeDown || "—")}</p>
          <p><b>Next thing to watch:</b> ${esc(entry.nextWatch || "—")}</p>
          <p><b>Next action:</b> ${esc(entry.nextAction || "—")}</p>
        </div>`
      )
      .join("");

    host.innerHTML = `
      <h1>Session Notes</h1>
      <p class="lead">Lightweight notes to carry useful evidence into the next session.</p>
      <div class="grid g2">
        <div class="card"><label>What we worked on</label><textarea id="n-worked"></textarea></div>
        <div class="card"><label>What worked</label><textarea id="n-workedWell"></textarea></div>
        <div class="card"><label>What broke down</label><textarea id="n-brokeDown"></textarea></div>
        <div class="card"><label>Next thing to watch</label><textarea id="n-nextWatch"></textarea></div>
      </div>
      <div class="card" style="margin-top:14px"><label>Next action</label><textarea id="n-nextAction"></textarea>
        <div class="actions"><button class="btn teal" id="saveNoteEntry">Save this session's notes</button></div>
      </div>
      <h2 style="margin-top:24px">Past notes</h2>
      ${logHtml || '<p class="muted">No saved notes yet.</p>'}
    `;

    document.getElementById("saveNoteEntry").addEventListener("click", () => {
      const entry = {
        date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
        worked: document.getElementById("n-worked").value,
        workedWell: document.getElementById("n-workedWell").value,
        brokeDown: document.getElementById("n-brokeDown").value,
        nextWatch: document.getElementById("n-nextWatch").value,
        nextAction: document.getElementById("n-nextAction").value
      };
      const current = get("notes-log", []);
      current.push(entry);
      set("notes-log", current);
      renderNotes();
    });
  }

  // ---------------------------------------------------------------------
  // PLANNER
  // ---------------------------------------------------------------------
  function renderPlanner() {
    const host = document.getElementById("planner-content");
    const hasUrl = !!STUDENT_CONFIG.plannerUrl;
    host.innerHTML = `
      <h1>Planner</h1>
      <p class="lead">The Google Sheets planner is the real command center — weekly schedule, assignment tracker, and review dates all live there. This site is where you learn and practice the process.</p>
      <div class="card">
        ${hasUrl
          ? `<a class="btn blue" href="${esc(STUDENT_CONFIG.plannerUrl)}" target="_blank" rel="noopener">Open the Google Sheets Planner ↗</a>`
          : `<div class="callout warning"><b>No planner linked yet.</b> Set <code>plannerUrl</code> in <code>student-config.js</code> once the Google Sheets planner exists. See <code>docs/GOOGLE-PLANNER-TEMPLATE.md</code> to build one from the template.</div>`}
      </div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><h3>Weekly Planner</h3><p class="muted">When will the work actually happen this week?</p></div>
        <div class="card"><h3>Assignment Tracker</h3><p class="muted">What exists, what's next, what needs another review?</p></div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------
  renderHome();
  renderCurrentSession();
  renderRoadmap();
  renderToolkit();
  renderNotes();
  renderPlanner();
})();
