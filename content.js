/* ==========================================================================
   CONTENT.JS — all session, toolkit, and level-differentiation content.

   This is the ONE place developmental-level differentiation lives. Instead
   of maintaining three separate copies of every page (middle/high/launch),
   session and toolkit text can reference a phrase key like {{nextAction}}
   and app.js swaps in the version that matches STUDENT_CONFIG.level.

   You should not need to edit this file to onboard a new student — only
   student-config.js. Edit this file only if you want to change the
   underlying curriculum or toolkit for every student who uses the template.
   ========================================================================== */

/* --------------------------------------------------------------------------
   LEVEL_COPY — reusable phrase variants keyed by level.
   Same concept, different developmental expression. Referenced in session
   and toolkit text as {{key}}; app.js resolves it against STUDENT_CONFIG.level.
   -------------------------------------------------------------------------- */
const LEVEL_COPY = {
  nextAction: {
    middle: "What is one thing you need to do next?",
    high: "What is the next visible action?",
    launch: "Define the next executable action and its done condition."
  },
  doneCondition: {
    middle: "How will you know you're all done?",
    high: "What is your done condition?",
    launch: "State the precise done condition before you begin."
  },
  priorityQ: {
    middle: "What is the most important thing to make better today?",
    high: "What matters most in this session?",
    launch: "What is the highest-leverage priority right now?"
  },
  checkIn: {
    middle: "How are things going right now — stuck, okay, or ready to go?",
    high: "What's the real state of things going into today?",
    launch: "What's the current state of this work, honestly?"
  },
  reflect: {
    middle: "What is one thing that worked today?",
    high: "What evidence says this is working — or needs a change?",
    launch: "What evidence supports continuing vs. adjusting the approach?"
  },
  commit: {
    middle: "What is one small thing you'll do before we meet again?",
    high: "What is one specific action before the next session?",
    launch: "What is the one commitment that matters most before next session?"
  },
  exampleLead: { middle: "For example:", high: "Example:", launch: "e.g." },
  confusion: {
    middle: "What is the confusing part? It's okay if you're not sure.",
    high: "What exactly is unclear?",
    launch: "Where precisely does understanding break down?"
  },
  encourage: {
    middle: "Nice — that's exactly the kind of move a strong system needs.",
    high: "Good. That's a clear, usable step.",
    launch: "Noted. Keep the standard high."
  },
  bigDone: {
    middle: "What does 'all finished' look like for the whole thing?",
    high: "What does done look like for the whole assignment?",
    launch: "Define the finished deliverable precisely."
  },
  triageAsk: {
    middle: "Do it, wait on it, ask about it, or accept what happens if it's late?",
    high: "Do, delay, ask, or accept the consequence?",
    launch: "Do, delegate/delay, escalate, or accept the tradeoff?"
  }
};

/* --------------------------------------------------------------------------
   LEVELS — metadata about each developmental level, used on Home/Roadmap
   and to decide how much optional scaffolding/extension content to show.
   -------------------------------------------------------------------------- */
const LEVELS = {
  middle: {
    label: "Middle School",
    gradeHint: "Grades 7–8",
    tone: "Visual, mission-based, shorter chunks, more explicit scaffolding.",
    showScaffoldExtra: true,
    showChallengeExtra: false
  },
  high: {
    label: "High School",
    gradeHint: "Grades 9–11",
    tone: "Clean academic coaching style with moderate scaffolding and increasing independence.",
    showScaffoldExtra: false,
    showChallengeExtra: false
  },
  launch: {
    label: "Launch",
    gradeHint: "Grade 12 through college",
    tone: "Professional, independent, concise, college-ready.",
    showScaffoldExtra: false,
    showChallengeExtra: true
  }
};

/* --------------------------------------------------------------------------
   SESSIONS — the canonical six-session launch sequence.
   Each session is a 60-minute default. "extension" items are optional
   material a tutor can add if a session runs long or needs a stretch.
   -------------------------------------------------------------------------- */
const SESSIONS = [
  {
    id: "s1",
    number: 1,
    slug: "build-your-system",
    title: "Build Your System",
    tagline: "One clear place to know what exists, what matters, and what happens next.",
    core: ["Capture system", "Calendar awareness", "Weekly planning", "Assignment tracking", "Priorities", "Defining next actions", "Setting up the Google Sheets planner"],
    goal: "Leave with one operating system for knowing what exists, what matters, what happens next, and when work will happen.",
    steps: [
      {
        heading: "1. What exists right now?",
        minutes: 10,
        body: "Before building anything, get an honest picture of the current workload. List every class or source of assignments, and be honest about where things currently get tracked — or don't.",
        prompts: [
          "List every class, subject, or responsibility that generates work.",
          "Where does each assignment currently get captured, if anywhere?",
          "{{checkIn}}"
        ]
      },
      {
        heading: "2. Choose one capture system",
        minutes: 10,
        body: "Decide on exactly one place where every assignment, test, and commitment gets captured the moment it appears. More than one place to check is the same as no system.",
        prompts: [
          "Where will every assignment go the moment you hear about it?",
          "What will you check before leaving school or starting homework each day?",
          "What would make this easy to use even on a distracted day?"
        ]
      },
      {
        heading: "3. Calendar awareness",
        minutes: 10,
        body: "Before scheduling any work, get the fixed commitments on the table — classes, practices, appointments, jobs — so the plan is built around real available time, not wishful time.",
        prompts: [
          "What is already fixed on your calendar this week?",
          "How much real, usable time is left for schoolwork on a typical day?"
        ]
      },
      {
        heading: "4. Weekly planning",
        minutes: 10,
        body: "Place this week's actual assignments and tests onto the calendar around the fixed commitments. This is a first draft, not a final answer — it will get compared to reality later.",
        prompts: [
          "What is due this week, and when will each thing actually get worked on?",
          "Where do you need buffer time in case something takes longer than expected?"
        ]
      },
      {
        heading: "5. Priorities and next actions",
        minutes: 10,
        body: "A long list of tasks isn't a plan. Pick what matters most, then define an action specific enough to start without re-deciding what to do.",
        prompts: [
          "{{priorityQ}}",
          "{{nextAction}}",
          "{{doneCondition}}"
        ]
      },
      {
        heading: "6. Set up the planner",
        minutes: 10,
        body: "Open the Google Sheets planner and walk through each tab together so it's a real tool by the end of the session, not a link that never gets used. See the Planner tab for the link.",
        prompts: [
          "Did the Weekly Planner tab get at least one real week entered?",
          "Did the Assignment Tracker get today's real assignments entered?"
        ]
      }
    ],
    middleExtra: "Use a visual cue — a color, an icon, or a sticky note — to mark “this needs to happen today.” Keep the whole system to one page if possible.",
    launchExtra: "Treat this like setting up a personal productivity system you'll actually maintain independently past this semester — not a one-time school assignment.",
    tutorGuide: {
      timing: "Runs long naturally the first time — 6 steps at ~10 min each. It's fine to spend the whole 60 minutes on steps 1–4 and finish the planner setup (steps 5–6) live together rather than rushing.",
      coachingGoal: "Build one real, current capture-and-planning system the student will actually use — not a demo of what a system could look like.",
      successLooksLike: "The student can say, in their own words, where an assignment goes the moment they hear about it, and the planner has at least one real week of real assignments in it by the end.",
      watchFor: "Watch for a student who already has 2–3 half-used systems (planner app + notebook + memory). The win here is consolidating to one, not adding a fourth.",
      extension: "If time allows, have the student add next week's known fixed commitments too, so Session 2 starts from a planner that's already a week ahead.",
      skipIf: "If the student already has a working, current capture system and planner habit, spend most of the session on priorities and next actions (steps 5–6) instead of rebuilding what already works."
    }
  },
  {
    id: "s2",
    number: 2,
    slug: "start-and-focus",
    title: "Start & Focus",
    tagline: "Turn a vague task into a five-minute start — then protect the block that follows.",
    core: ["Task initiation", "Five-minute start / tiny first action", "Clear done condition", "Realistic work blocks", "Distraction awareness", "Focus reset", "Notice → Name → Reset → Resume", "Plan vs. Reality"],
    goal: "Build the ability to start real work quickly, notice when focus breaks, and recover without losing the session.",
    steps: [
      {
        heading: "1. Name today's target work",
        minutes: 8,
        body: "Choose one real, current piece of work to use for this session — not a hypothetical example. Vague targets like “study” don't count.",
        prompts: [
          "What is the actual task, assignment, or subject for this block?",
          "{{doneCondition}}"
        ]
      },
      {
        heading: "2. Five-Minute Start",
        minutes: 8,
        body: "Most avoided tasks are avoided because starting feels bigger than it is. Define the smallest visible first action, then run a five-minute timer and do only that.",
        prompts: [
          "What is the smallest visible first action — something you could point to yourself doing?",
          "Start the 5-minute timer in the toolkit and just do that one action."
        ]
      },
      {
        heading: "3. Distraction awareness",
        minutes: 8,
        body: "Focus is easier to protect in advance than to defend once it's gone. Set up the environment before relying on willpower mid-task.",
        prompts: [
          "What is most likely to pull your attention during this block — phone, tabs, noise, people?",
          "What can you remove or turn off before starting?"
        ]
      },
      {
        heading: "4. Focus Reset: Notice → Name → Reset → Resume",
        minutes: 10,
        body: "Attention will drift — that's normal, not a failure. The skill is catching it quickly and returning, using a repeatable four-step reset instead of just “trying harder.”",
        prompts: [
          "Notice: what does it feel like right when your attention starts to drift?",
          "Name it: silently or out loud, name what's happening (“I'm distracted” / “I'm avoiding this”).",
          "Reset: take one deliberate action — a breath, a stretch, closing a tab.",
          "Resume: return to the exact next visible action, not the whole task."
        ]
      },
      {
        heading: "5. Run a real work block",
        minutes: 18,
        body: "Use the actual task from step 1. Practice the Focus Reset live if attention drifts — that's the point of doing this with support before doing it alone.",
        prompts: [
          "What did you actually get done in this block?",
          "Did you need a Focus Reset? What triggered it, and did it work?"
        ]
      },
      {
        heading: "6. Plan vs. Reality",
        minutes: 8,
        body: "Compare what you expected going in to what actually happened. This isn't about being wrong — it's about calibrating better estimates over time.",
        prompts: [
          "How long did you expect this to take, and how long did it actually take?",
          "What would you estimate differently next time?"
        ]
      }
    ],
    middleExtra: "Give the reset a name or character the student picks themselves (e.g. “Turtle Reset,” “Shake-Out Reset”) — a concrete, physical reset is easier for this age to actually use.",
    launchExtra: "Push toward naming the underlying cause of avoidance (boredom, ambiguity, difficulty, fear of a bad result) rather than only treating the symptom.",
    tutorGuide: {
      timing: "~8/8/8/10/18/8 minutes. Step 5 (the real work block) is the core of the session — protect that time even if earlier steps run a little short.",
      coachingGoal: "Give the student a repeatable way to start quickly and recover from distraction without spiraling into guilt or abandoning the task.",
      successLooksLike: "The student starts a real task within the five-minute window without extended stalling, and can describe (or demonstrate) at least one Focus Reset cycle.",
      watchFor: "Watch for perfectionism disguised as “not starting yet” — planning, organizing, or researching endlessly instead of doing the actual next action.",
      extension: "If focus holds well, extend the real work block and use the extra time productively on the same real assignment rather than introducing a new skill.",
      skipIf: "If the student already starts quickly and self-corrects distraction well, spend most of the time on Plan vs. Reality calibration instead, which tends to need more reps."
    }
  },
  {
    id: "s3",
    number: 3,
    slug: "learn-in-class",
    title: "Learn in Class",
    tagline: "Before, during, and after class — a repeatable cycle instead of one isolated lecture.",
    core: ["Before / during / after class", "Previewing", "Listening for structure", "Useful note-taking rather than transcription", "Capturing confusion/questions", "Quick post-class retrieval", "Identifying office-hours / teacher questions"],
    goal: "Build a repeatable class routine: arrive oriented, capture what matters (not everything), and lock it in before it fades.",
    steps: [
      {
        heading: "1. Before class: preview",
        minutes: 10,
        body: "A few minutes of preview gives the lecture somewhere to “land.” The goal isn't mastery — it's familiarity so class isn't the first exposure to the material.",
        prompts: [
          "Skim headings, slides, or the syllabus for 5–10 minutes. What do you expect this class to cover?",
          "Write one question you expect class to answer."
        ]
      },
      {
        heading: "2. During class: structure, not transcription",
        minutes: 15,
        body: "Notes should capture the structure of the lesson — main idea, emphasis, examples — not every word. Use quick symbols to mark importance and confusion without breaking the flow of listening.",
        prompts: [
          "What symbols will you use? (e.g. ★ important, ? unclear, → connection)",
          "{{confusion}}",
          "If you lose the thread: mark the spot, keep listening for the next example or transition, and reconnect — don't get stuck trying to rebuild the missing piece live."
        ]
      },
      {
        heading: "3. After class: quick retrieval",
        minutes: 15,
        body: "Within 10–15 minutes of class ending, summarize from memory before notes get cleaned up. This is what actually converts exposure into understanding.",
        prompts: [
          "Without looking at your notes, write 3–5 sentences summarizing what class was about.",
          "Now check your notes — what did you miss or get wrong?",
          "Clean up any marked confusion points, and add anything new to your assignment tracker."
        ]
      },
      {
        heading: "4. Build an office-hours question",
        minutes: 10,
        body: "Not every point of confusion needs to become a crisis later. Practice turning a real confusing point into a specific, askable question now, while it's still small.",
        prompts: [
          "Pick one thing that's still unclear from today (real or practiced).",
          "What do you already understand about it?",
          "Turn that into one specific question you could ask a teacher or professor."
        ]
      },
      {
        heading: "5. Reflect and commit",
        minutes: 10,
        body: "Close the loop on today's practice before moving on.",
        prompts: ["{{reflect}}", "{{commit}}"]
      }
    ],
    middleExtra: "Use the “End-of-Class 4” as a simpler version of steps 3–4: What did I learn? What do I need to do? What do I need (materials)? What am I wondering?",
    launchExtra: "Practice the after-class retrieval entirely without prompts — a blank page and a timer, then self-check against notes or slides.",
    tutorGuide: {
      timing: "~10/15/15/10/10 minutes. If only one real class is available to practice on, steps 2–3 can run together as a single live coaching pass.",
      coachingGoal: "Shift note-taking from transcription toward structure-and-signal, and make after-class retrieval an automatic habit rather than an occasional one.",
      successLooksLike: "The student can produce a short memory-based summary after a real (or practiced) class and identify at least one genuine point of confusion in specific, askable terms.",
      watchFor: "Watch for students who write down everything (over-capture, under-processing) or almost nothing (under-capture). Both need a different fix.",
      extension: "If a real class recording, slide deck, or set of notes is available, run the full before/during/after cycle live on real material instead of a rehearsal.",
      skipIf: "If note-taking structure is already strong, spend most of the time on the office-hours question builder and after-class retrieval speed instead."
    }
  },
  {
    id: "s4",
    number: 4,
    slug: "read-and-process",
    title: "Read & Process",
    tagline: "Map it before diving in. Reduce it instead of copying it. Check what actually stuck.",
    core: ["Before / during / after reading", "Map structure first", "Frame purpose/questions", "Reduce rather than copy", "Main idea / evidence / unknowns", "Comprehension check", "Reading large or challenging material"],
    goal: "Build a repeatable reading process that produces understanding, not just completed pages.",
    steps: [
      {
        heading: "1. Before reading: map and frame",
        minutes: 10,
        body: "Before reading a single full paragraph, scan the structure — headings, length, figures, bolded terms — and set a purpose for reading it.",
        prompts: [
          "Scan headings, length, and any figures or bolded terms. What is this reading mainly about?",
          "What question are you hoping this reading answers?"
        ]
      },
      {
        heading: "2. During reading: reduce, don't copy",
        minutes: 20,
        body: "Read in chunks (by section or a set number of paragraphs). After each chunk, reduce it to what matters instead of copying sentences — the compression is what builds understanding.",
        prompts: [
          "Main idea of this chunk, in your own words.",
          "One piece of evidence or example that supports it.",
          "One unknown — a word, idea, or connection that's still unclear."
        ]
      },
      {
        heading: "3. After reading: comprehension check",
        minutes: 15,
        body: "Close the material and check what's actually retrievable, not just recognizable. This is the step that reveals whether the reading actually worked.",
        prompts: [
          "Close the reading. What were the 2–3 main ideas, from memory?",
          "What can you not yet explain without looking back?",
          "Reopen only to repair that specific gap."
        ]
      },
      {
        heading: "4. Reading large or challenging material",
        minutes: 10,
        body: "Long or dense reading doesn't need a different process — it needs the same process applied in smaller chunks with a clear stopping point for each one.",
        prompts: [
          "Break the reading into chunks you can realistically process one at a time.",
          "What's a reasonable done condition for today's reading session — a number of pages, chunks, or minutes?"
        ]
      },
      {
        heading: "5. Reflect and commit",
        minutes: 5,
        body: "Close the loop on today's practice before moving on.",
        prompts: ["{{reflect}}", "{{commit}}"]
      }
    ],
    middleExtra: "Use the 4-Box format for each chunk: Topic, Key Ideas, Examples/Connections, Questions — a concrete grid is easier to fill in than an open prompt.",
    launchExtra: "Practice previewing and framing a purpose in under 3 minutes — the pace expected for college-level reading loads.",
    tutorGuide: {
      timing: "~10/20/15/10/5 minutes. Step 2 is the core of the session and should use a real, current reading whenever one is available.",
      coachingGoal: "Replace passive re-reading and highlighting with an active map → reduce → check cycle that transfers to any subject.",
      successLooksLike: "The student can produce a short, accurate, closed-book summary of a chunk they just read, and can name a specific unknown rather than a vague “I don't get it.”",
      watchFor: "Watch for highlighting or copying full sentences instead of reducing to main idea/evidence/unknown — this is the most common weak substitute to interrupt.",
      extension: "If time allows, apply the same process to a second, unrelated reading to prove the process transfers across subjects.",
      skipIf: "If reduction and comprehension checks are already strong, spend more time on pacing long/dense material (step 4) instead."
    }
  },
  {
    id: "s5",
    number: 5,
    slug: "remember-it",
    title: "Remember It",
    tagline: "Retrieval, not rereading. Repair the exact gap, then come back for it again.",
    core: ["Retrieval vs. familiarity", "Closed-note recall", "Brain dump", "Explain aloud", "Notes → questions", "Solve/reconstruct without a model", "Check", "Diagnose gaps", "Repair", "Retrieve again", "Spaced review", "Scheduling the next useful review"],
    goal: "Build the habit of testing memory instead of trusting familiarity, and scheduling brief, targeted review instead of cramming.",
    steps: [
      {
        heading: "1. Retrieval vs. familiarity",
        minutes: 8,
        body: "Recognizing material when you see it again is not the same as being able to produce it from memory. The question to ask is not “did I study it?” but “can I retrieve it?”",
        prompts: [
          "Pick real material from a current class or assignment.",
          "Honestly: do you currently recognize this, or can you actually produce it without looking?"
        ]
      },
      {
        heading: "2. Turn notes into questions",
        minutes: 10,
        body: "Notes are stored information. Retrieval prompts force your brain to produce it. Convert a few notes into questions that require an explanation, comparison, or solution — not a yes/no answer.",
        prompts: [
          "Write 3–5 questions from your notes that require explaining, comparing, or solving — not just recognizing."
        ]
      },
      {
        heading: "3. Closed-note retrieval",
        minutes: 12,
        body: "Close the notes. Produce what you know using whichever method fits the material: a brain dump, explaining it aloud, or reconstructing/solving it without a model.",
        prompts: [
          "Close your notes and answer your own questions from memory, out loud or in writing.",
          "For a process or problem type: try to reconstruct or solve it without looking at a worked example first."
        ]
      },
      {
        heading: "4. Check and diagnose",
        minutes: 10,
        body: "Reopen the material only after attempting retrieval. Name the exact gap instead of a vague “I didn't know that one.”",
        prompts: [
          "Check your answers against your notes or source. What was fully right, partial, or missed?",
          "For anything partial or missed: what specifically is the gap — a fact, a step, a connection?"
        ]
      },
      {
        heading: "5. Repair and retrieve again",
        minutes: 10,
        body: "Fix only the specific gap — not the whole topic — then retrieve it again without looking, to confirm the repair actually worked.",
        prompts: [
          "Repair the specific gap you named.",
          "Now retrieve that same piece again without looking. Did it hold?"
        ]
      },
      {
        heading: "6. Schedule the next review",
        minutes: 10,
        body: "Understanding fades without spaced review. Schedule brief future retrieval attempts — not full re-study sessions — in the planner now, while it's easy to remember to.",
        prompts: [
          "When is a realistic next check-in for this material — tomorrow? In 2–3 days? In a week?",
          "Add that review date to the planner right now."
        ]
      }
    ],
    middleExtra: "Use a simple 3-step version: Retrieve → Check → Repair, with a concrete score (“how many did you get?”) to make progress visible and motivating.",
    launchExtra: "Introduce interleaving — mixing multiple topics or problem types in one retrieval session instead of drilling one at a time — to build discrimination, not just recall.",
    tutorGuide: {
      timing: "~8/10/12/10/10/10 minutes. If time is short, steps 3–5 (the retrieve-check-repair loop) matter most and can absorb time from step 1 or 6.",
      coachingGoal: "Replace rereading/highlighting-as-studying with an active retrieval habit, and get one real spaced-review date onto the planner.",
      successLooksLike: "The student attempts real closed-note retrieval on real material, can name a specific gap rather than a vague one, and leaves with an actual review date scheduled.",
      watchFor: "Watch for peeking at notes before genuinely attempting retrieval, or rereading the whole source to “repair” instead of fixing just the missed piece.",
      extension: "If the student finishes early, add a second round mixing two different topics to practice choosing the right retrieval method, not just executing one.",
      skipIf: "If retrieval habits are already strong, spend most of the time on realistic spaced-review scheduling, which tends to be the part that quietly gets skipped."
    }
  },
  {
    id: "s6",
    number: 6,
    slug: "recover-and-run-independently",
    title: "Recover & Run Independently",
    tagline: "What to do when the plan breaks — and your own rules for running it from here.",
    core: ["What to do when behind", "Triage", "Communicate with teacher/professor", "Office hours", "Break down big assignments", "Exam preparation", "Missed work recovery", "Adapting when a plan breaks", "Personal operating rules", "Transition to ongoing coaching"],
    goal: "Build the ability to recover from a bad week without spiraling, and leave with the student's own rules for running the system independently.",
    steps: [
      {
        heading: "1. Assess honestly: where do things actually stand?",
        minutes: 8,
        body: "Recovery starts with an honest, non-judgmental accounting of what's real right now — not catastrophizing, not minimizing.",
        prompts: [
          "What's missing, late, or at risk right now?",
          "{{checkIn}}"
        ]
      },
      {
        heading: "2. Triage",
        minutes: 10,
        body: "When there's too much to do everything, sort it deliberately instead of freezing or defaulting to whatever feels loudest.",
        prompts: [
          "For each item: {{triageAsk}}",
          "What creates the biggest consequence if it's ignored? What can safely move?"
        ]
      },
      {
        heading: "3. Communicate with a teacher or professor",
        minutes: 10,
        body: "Reaching out early, with a specific ask, changes outcomes more than almost anything else — and it's a skill that can be practiced and scripted.",
        prompts: [
          "What's the specific situation, and what do you actually need — an extension, clarification, or help?",
          "Draft one or two sentences you could actually send or say.",
          "When are this person's office hours, and how would you use them?"
        ]
      },
      {
        heading: "4. Break down a big assignment",
        minutes: 10,
        body: "Large assignments stall because “done” is undefined and the first step is unclear. Work backward from the finished product to today's next action.",
        prompts: [
          "{{bigDone}}",
          "What are the milestones between now and done, in order?",
          "{{nextAction}}"
        ]
      },
      {
        heading: "5. Exam preparation",
        minutes: 10,
        body: "Build a short, realistic study plan working backward from the exam date, sorting material by how ready it already is.",
        prompts: [
          "What's actually on the exam, and how much time is realistically available before it?",
          "Sort the material: what's solid, what's shaky, and what's a real gap?",
          "Schedule short retrieval sessions for the shaky and gap material — not one long cram block."
        ]
      },
      {
        heading: "6. Build your personal operating rules",
        minutes: 12,
        body: "This is the capstone. Compress everything from the six sessions into the student's own rules — in their own words — for running the system independently from here forward.",
        prompts: [
          "When something gets assigned, what do you do?",
          "When focus breaks, what do you do?",
          "When you're behind or the plan breaks, what do you do?",
          "What are your rules going forward, in your own words?"
        ]
      }
    ],
    middleExtra: "Keep the operating rules to 3–4 short, memorable lines — almost like a personal motto — rather than a long list.",
    launchExtra: "Frame the operating rules as a one-page personal reference document the student keeps and updates independently after tutoring ends.",
    tutorGuide: {
      timing: "~8/10/10/10/10/12 minutes. Step 6 is the capstone and should not get cut short — trim earlier steps if the session runs long.",
      coachingGoal: "Build real recovery skills for a bad week, and hand real ownership of the system to the student before shifting into ongoing coaching mode.",
      successLooksLike: "The student produces their own operating rules in their own words (not the tutor's), and can describe a specific recovery plan for something currently behind or at risk.",
      watchFor: "Watch for the student reciting rules that sound right but aren't really theirs yet — press for their own language and real, current examples.",
      extension: "If time allows, role-play the teacher/professor communication script live before it's needed for real.",
      skipIf: "If a genuine current crisis exists (something due very soon, a real missed-work situation), let steps 2–4 absorb most of the time and treat step 6 as a shorter closing conversation rather than skipping it entirely."
    }
  }
];

/* --------------------------------------------------------------------------
   AFTER_SESSION_SIX — framing shown on the Roadmap once all six are done.
   -------------------------------------------------------------------------- */
const AFTER_SESSION_SIX = "The six-session launch sequence is complete. From here, sessions use the Toolkit and real, current schoolwork instead of a fixed lesson plan — this is ongoing coaching, not Session 7, 8, or 9 of a rigid curriculum.";

/* --------------------------------------------------------------------------
   TOOLKIT — reusable EF tools, grouped logically. Available any time,
   independent of the six-session sequence.
   fields: optional small workspace saved to localStorage automatically.
   timerMinutes: optional simple countdown for tools that use one.
   -------------------------------------------------------------------------- */
const TOOLKIT_GROUPS = [
  {
    group: "Plan & Organize",
    tools: [
      {
        id: "weekly-planning",
        title: "Weekly Planning",
        when: "Use at the start of each week, or any time the week feels unclear.",
        steps: [
          "List fixed commitments first (classes, practice, work, appointments).",
          "Add assignments and tests from the Assignment Tracker onto the days that make sense.",
          "Leave visible buffer time — don't schedule every hour."
        ],
        tip: "The Weekly Planner tab in the Google Sheets planner is the real tool for this — use this page as the process, not a replacement."
      },
      {
        id: "assignment-tracker",
        title: "Assignment Tracker",
        when: "Use the moment any assignment, test, or commitment appears.",
        steps: [
          "Enter it within 24 hours of hearing about it — course, task, due date.",
          "Add a next visible action, not just the assignment name.",
          "Update status as it moves: not started, in progress, done."
        ],
        tip: "Kept in the Google Sheets planner. See the Planner tab."
      },
      {
        id: "next-action",
        title: "Define the Next Action",
        when: "Use any time a task feels vague, stuck, or too big to start.",
        steps: [
          "{{nextAction}}",
          "{{doneCondition}}"
        ],
        fields: [{ key: "task", label: "Task", type: "text" }, { key: "action", label: "{{nextAction}}", type: "textarea" }, { key: "done", label: "{{doneCondition}}", type: "textarea" }]
      }
    ]
  },
  {
    group: "Start & Focus",
    tools: [
      {
        id: "five-minute-start",
        title: "Five-Minute Start",
        when: "Use when a task feels too big or unpleasant to begin.",
        steps: [
          "Choose the smallest visible first action.",
          "Start the timer and do only that action.",
          "Decide after: keep going, shrink the task, or reschedule it."
        ],
        timerMinutes: 5,
        fields: [{ key: "firstAction", label: "Smallest first action", type: "text" }, { key: "afterFive", label: "What happened after 5 minutes?", type: "textarea" }]
      },
      {
        id: "focus-reset",
        title: "Focus Reset",
        when: "Use the moment you notice your attention has drifted.",
        steps: [
          "Notice: what does drifting attention feel like right now?",
          "Name it, silently or out loud.",
          "Reset with one deliberate action — a breath, a stretch, closing a tab.",
          "Resume at the exact next visible action."
        ]
      },
      {
        id: "plan-vs-reality",
        title: "Plan vs. Reality",
        when: "Use after a work block to calibrate future estimates.",
        steps: [
          "Record what you expected before starting.",
          "Record what actually happened.",
          "Note one thing to estimate differently next time."
        ],
        fields: [{ key: "expected", label: "Expected", type: "text" }, { key: "actual", label: "Actual", type: "text" }, { key: "adjust", label: "What to adjust next time", type: "textarea" }]
      }
    ]
  },
  {
    group: "Class & Learning",
    tools: [
      {
        id: "before-during-after-class",
        title: "Before / During / After Class",
        when: "Use as a routine around every class, not just hard ones.",
        steps: [
          "Before: preview headings or slides for 5–10 minutes; write one expected question.",
          "During: capture structure and mark confusion with a symbol — don't get stuck rebuilding a missed piece live.",
          "After: within 10–15 minutes, summarize from memory, then check and clean up notes."
        ]
      },
      {
        id: "note-taking",
        title: "Note-Taking",
        when: "Use during any class, lecture, or video.",
        steps: [
          "Capture the main idea, emphasis, and examples — not a transcript.",
          "Use consistent symbols for importance and confusion.",
          "Leave space to add a question or connection after."
        ]
      }
    ]
  },
  {
    group: "Read & Remember",
    tools: [
      {
        id: "before-during-after-reading",
        title: "Before / During / After Reading",
        when: "Use for any assigned reading, especially long or dense material.",
        steps: [
          "Before: scan structure, set a purpose or question.",
          "During: reduce each chunk to main idea, evidence, and one unknown.",
          "After: close the reading and check what's actually retrievable."
        ]
      },
      {
        id: "active-recall",
        title: "Active Recall",
        when: "Use any time material needs to actually stick, not just feel familiar.",
        interactive: "activeRecall",
        steps: [
          "Write a few retrieval questions from your notes.",
          "Close your notes and answer from memory.",
          "Check, then rate each answer: got it, partial, or missed."
        ]
      },
      {
        id: "retrieval-repair",
        title: "Retrieval / Repair",
        when: "Use right after any retrieval attempt that revealed a gap.",
        steps: [
          "Name the exact gap — not the whole topic.",
          "Repair only that gap using notes, source, or help.",
          "Retrieve that same piece again without looking, to confirm it held."
        ]
      },
      {
        id: "spaced-review",
        title: "Spaced Review",
        when: "Use to schedule brief follow-up retrieval instead of one long cram session.",
        steps: [
          "Today: first retrieval and repair.",
          "Tomorrow (or 2–3 days later): quick retrieval on the same material.",
          "About a week later: mixed retrieval with other material."
        ],
        tip: "Add each review date directly to the planner — a plan that only lives in your head tends to disappear."
      }
    ]
  },
  {
    group: "When It's Hard",
    tools: [
      {
        id: "big-assignment-breakdown",
        title: "Big Assignment Breakdown",
        when: "Use for any multi-step assignment or project.",
        steps: [
          "{{bigDone}}",
          "List milestones in order, including anything that depends on something else first.",
          "{{nextAction}}"
        ]
      },
      {
        id: "recovery-triage",
        title: "Recovery / Triage",
        when: "Use when there's more to do than time to do it, or when you've fallen behind.",
        steps: [
          "List everything that's due, missing, or at risk.",
          "For each: {{triageAsk}}",
          "Communicate on anything you're delaying or asking about — don't just go quiet."
        ]
      },
      {
        id: "teacher-communication",
        title: "Teacher / Professor Communication",
        when: "Use any time you need an extension, clarification, or help — and use it early.",
        steps: [
          "Name the specific situation and what you need.",
          "Show what you've already tried or attempted.",
          "Ask directly, then write down the answer and next step."
        ],
        fields: [{ key: "situation", label: "Situation", type: "textarea" }, { key: "draft", label: "Draft message", type: "textarea" }]
      },
      {
        id: "office-hours",
        title: "Office Hours",
        when: "Use before a small confusion becomes a big problem — not only in a crisis.",
        steps: [
          "Bring the material and one or two specific questions.",
          "Show what you've already tried.",
          "Write down the answer and the next step before you leave."
        ]
      },
      {
        id: "exam-prep",
        title: "Exam Prep",
        when: "Use starting 5–7 days before any test or exam.",
        steps: [
          "List everything that could be on it.",
          "Sort by readiness: solid, shaky, or a real gap.",
          "Schedule short retrieval sessions for shaky and gap material, starting with the highest-value topics."
        ]
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { LEVEL_COPY, LEVELS, SESSIONS, TOOLKIT_GROUPS, AFTER_SESSION_SIX };
}
