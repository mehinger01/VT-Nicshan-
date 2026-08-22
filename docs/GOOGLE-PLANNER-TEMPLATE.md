# Google Sheets Planner — Build Spec

The planner is the **real** command center. The website teaches and practices
the process; the Google Sheet is where the actual schedule, assignments, and
review dates live. Do not try to rebuild this inside the site — see
`ONBOARDING.md` and the project's `PRIMARY GOAL` for why.

This document is the exact spec for building the planner from scratch in
about 10 minutes. It is written from the strongest patterns across the
source student planners (weekly schedule + assignment tracker + session log
+ plan-vs-reality), generalized and stripped of any student-specific data.

If a shared Google Sheets template ever exists that can be copied directly
(File → Make a copy) instead of built from this spec, prefer that — update
this doc to link it once it exists. Until then, build from the spec below.

## How to build it (once, ~10 minutes)

1. Create a new Google Sheet. Name it `[Student Name] — EF Planner`.
2. Create three tabs, named exactly: `Weekly Planner`, `Assignment Tracker`,
   `Session Log`.
3. Build each tab using the columns below (row 1 = headers, frozen).
4. Set sharing to "Anyone with the link can edit" (or narrower, per your
   preference) and copy the URL.
5. Paste that URL into `plannerUrl` in `student-config.js`.

---

## Tab 1: Weekly Planner

One row per day, seven days visible at a time. Simple and readable beats
a fancy hour-by-hour grid — the goal is visible workload, not a calendar app.

| Column | Type | Notes |
|---|---|---|
| Day | Date | e.g. `Mon 9/1` |
| Fixed Commitments | Text | Classes, practice, work, appointments |
| Planned Work Blocks | Text | e.g. "3:30–4:00 Chem reading, 7:00–7:40 Math set" — name the course and task, not just "study" |
| Buffer Time | Text | Deliberately protected open time |
| Notes | Text | Anything that changed the day's plan |

**Formatting tip:** conditional-format the row for "today" (`=A2=TODAY()`)
with a light highlight so the current day is easy to find at a glance.

---

## Tab 2: Assignment Tracker

The source of truth for everything that needs to get done. One row per
assignment, test, or project. This is the tab the Toolkit's "Assignment
Tracker" tool and the site's Current Session steps point back to.

| Column | Type | Notes |
|---|---|---|
| Course / Subject | Text | |
| Task / Assignment | Text | |
| Due Date | Date | |
| Days Until Due | Formula | `=IF(C2="","",C2-TODAY())` (assuming Due Date is column C) |
| Next Visible Action | Text | Not the assignment name — the actual next step |
| Estimated Work Blocks | Number | In 20–30 minute blocks |
| Scheduled Work Time | Text | When it's actually placed on the Weekly Planner |
| Status | Dropdown | Not Started / In Progress / Done / Blocked |
| Mastery / Confidence | Dropdown | Green / Yellow / Red (or 1–5) — only fill in where relevant (test/exam material) |
| Repair Needed | Checkbox | TRUE/FALSE — flag when a retrieval gap needs targeted repair |
| Next Review Date | Date | For anything on a spaced-review schedule |
| Notes | Text | |

**Dropdown setup:** Data → Data validation → list of items, for `Status`
(`Not Started, In Progress, Done, Blocked`) and `Mastery / Confidence`
(`Green, Yellow, Red`).

**Conditional formatting suggestions:**
- `Days Until Due` ≤ 1 → red background (urgent)
- `Status` = "Done" → strikethrough / grey
- `Mastery / Confidence` = "Red" → red text
- `Repair Needed` = TRUE → amber background

---

## Tab 3: Session Log (Plan vs. Reality)

One row per work block or tutoring session. This is what makes Plan vs.
Reality and time-estimation calibration possible over time.

| Column | Type | Notes |
|---|---|---|
| Date | Date | |
| Task Worked On | Text | Links back to a Task in Assignment Tracker if useful |
| Estimated Time | Number | Minutes |
| Actual Time | Number | Minutes |
| Variance | Formula | `=D2-C2` (Actual − Estimated, assuming those are columns C/D) |
| What Happened | Text | Brief — what got done, what got interrupted |
| Next Adjustment | Text | One thing to estimate or plan differently next time |

**Tip:** review the `Variance` column about once a week, not after every
single task — the pattern matters more than any single entry.

---

## Keeping it simple

- Three tabs is enough. Resist adding more unless a real, recurring need
  shows up — extra tabs are extra tutor maintenance.
- The site's Toolkit tools (Weekly Planning, Assignment Tracker, Spaced
  Review, Plan vs. Reality) all point back to this sheet rather than
  duplicating it — that duplication is exactly what this project is
  avoiding by design.
- If a shared reusable Google Sheets template file is created later, it can
  simply be copied per student instead of rebuilt from this spec each time.
  Note that update here once it exists.
