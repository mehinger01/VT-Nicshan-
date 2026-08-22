# Onboarding a New Student (Under 5 Minutes)

1. **Use this template.** On the `VT-EF-Student-Template` GitHub page, click
   **Use this template → Create a new repository**.
2. **Name it `VT-FirstName`** (e.g. `VT-Jordan`). Keep it public if you want
   GitHub Pages to work on the free tier without extra setup.
3. **Open `student-config.js`** in the new repo (edit directly on GitHub —
   no command line needed: click the file, click the pencil icon).
4. **Change these values:**
   - `name` — student's first name
   - `grade` — grade level
   - `level` — `"middle"` (7–8), `"high"` (9–11), or `"launch"` (12–college)
   - `priorities` — 2–4 short current coaching priorities
   - `interests` — optional, leave `[]` if unknown
   - `plannerUrl` — the student's Google Sheets planner link (see
     `docs/GOOGLE-PLANNER-TEMPLATE.md` if it doesn't exist yet — building one
     takes about 10 minutes and can happen in or after Session 1)
5. **Commit the change** (GitHub's in-browser editor commits directly to
   `main` — that's it, no separate build step).
6. **GitHub Pages is already configured** — the included workflow
   (`.github/workflows/pages.yml`) deploys automatically on every push to
   `main`. The first time, go to the new repo's **Settings → Pages** and
   confirm the source is set to **GitHub Actions** (usually only needs
   confirming once per repo, not per edit).
7. **Open the student's site** at
   `https://mehinger01.github.io/VT-FirstName/` (give the Action a minute or
   two to finish deploying after step 5 — check the **Actions** tab for a
   green checkmark).

That's it. No other files need to change for a standard student. The rest
of the site — Home, Current Session, Roadmap, Toolkit, Session Notes,
Planner — reads everything from `student-config.js` automatically.

## If you want to change the curriculum itself

That's a different, rarer task: edit `content.js` (session content and
toolkit) or `styles.css` (visual design). Changes there affect every
student who uses the template going forward, not just one student — edit
`VT-EF-Student-Template` directly (or fork it) rather than a student's repo,
unless the change is genuinely one-student-specific.

## Troubleshooting

- **Page shows old content after editing `student-config.js`.** Give the
  GitHub Actions deploy a minute, then hard-refresh (the browser may be
  caching the old file).
- **Pages tab shows nothing / 404.** Check **Settings → Pages** in the new
  repo — the source should say **GitHub Actions**, and the **Actions** tab
  should show a completed run.
- **Planner button says "Set up Planner."** `plannerUrl` is still empty in
  `student-config.js` — that's expected until a planner exists.
