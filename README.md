# VT-EF-Student-Template

A reusable executive-functioning (EF) coaching site template. Use GitHub's
**Use this template** button to spin up a new student site in a few
minutes — see **[ONBOARDING.md](ONBOARDING.md)** for the exact steps.

This is a static, vanilla HTML/CSS/JS site (no build step, no framework, no
database, no login). It deploys to GitHub Pages automatically via the
included GitHub Actions workflow.

## What this is

A consolidated, generalized EF coaching site built from the strongest
patterns across several individual student sites. One canonical template,
differentiated by developmental level (middle / high / launch), instead of
one bespoke site per student.

- A **six-session launch sequence** (Build Your System → Start & Focus →
  Learn in Class → Read & Process → Remember It → Recover & Run
  Independently), each a 60-minute default with optional extension material.
- An ongoing **Toolkit** of 17 reusable EF tools, grouped logically, usable
  any time — not just during the six launch sessions.
- **Tutor Guide** dropdowns on every session step (timing, coaching goal,
  what success looks like, what to watch for, extension, what to skip) —
  visible to the tutor, out of the way of the student experience.
- A **Roadmap** tab showing progress through the six sessions and a clear
  hand-off into ongoing coaching afterward.
- A **Session Notes** tab for lightweight, dated notes across sessions.
- A **Planner** tab linking to the student's real Google Sheets planner
  (weekly schedule + assignment tracker). This site does not duplicate a
  planner app — see `docs/GOOGLE-PLANNER-TEMPLATE.md`.
- Everything personalizes from **one file**, `student-config.js`.

## File structure

```
student-config.js     ← the ONE file to edit per student
content.js             ← session + toolkit content, and level differentiation
app.js                  ← rendering + localStorage persistence (no backend)
styles.css              ← single visual system, used at all three levels
index.html              ← page shell (Home / Current Session / Roadmap /
                           Toolkit / Session Notes / Planner)
docs/
  GOOGLE-PLANNER-TEMPLATE.md   ← spec for building a student's planner sheet
ONBOARDING.md           ← new-student setup, start to finish
.github/workflows/pages.yml   ← GitHub Pages auto-deploy on push to main
```

## How differentiation works

`student-config.js` sets `level` to `"middle"`, `"high"`, or `"launch"`.
`content.js` defines a small phrase dictionary (`LEVEL_COPY`) — things like
how "define the next action" is worded at each level — plus a couple of
optional per-session scaffolding/stretch blocks. `app.js` resolves those
phrases at render time. This keeps one canonical version of every session
and tool instead of three separate copies to maintain.

## Data & privacy

All student responses (session notes, reflections, toolkit workspace
fields) are saved only in that browser's `localStorage`, namespaced by the
student's name. Nothing is sent to a server. Clearing browser data clears
that history — there is no cloud backup by design (no database, per this
project's scope).

## Design decisions worth knowing

- **No database, no auth, no admin dashboard, no new planner app** — all
  explicitly out of scope for this template. The Google Sheets planner is
  the real planner.
- **A dedicated session-persistence library (VT-Session-Engine) was
  reviewed** and intentionally not adopted here — plain `localStorage`
  (the same approach used by the strongest source sites) is simpler and
  sufficiently reliable for a single-student static site. See the project
  history for details if this decision needs revisiting.
- **No React/Vite/npm build step.** Vanilla HTML/CSS/JS, matching the
  existing VT student sites' deploy approach (GitHub Pages, static files).

## For tutors: changing the curriculum vs. onboarding a student

Editing `student-config.js` in a student's own repo (created from this
template) only affects that student. Editing `content.js`, `styles.css`,
or `app.js` in this template repo changes the curriculum/toolkit/design for
every *future* student created from it — do that here deliberately, not in
a student's individual repo, unless the change is genuinely specific to
that one student.
