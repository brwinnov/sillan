# CLAUDE.md — Sillan

Operating instructions for Claude Code in this repository.

## Start here
1. Read `HANDOVER.md` — narrative of everything done to date and what remains.
2. Read `CONTEXT_MAP.md` — single source of truth for data, sources, and decisions.
3. Check `TODO_AI.md` for the prioritised backlog before starting anything.
4. Read the latest file in `ai-memory/` for the most recent session's state.

## Project in one line
Single-file HTML infographic (`src/index.html`) presenting Sillan Coaches route 179 timetables in a clean, accessible, colour-blind-safe, dark-mode-capable format with tabs per timetable variant.

## Hard constraints
- **`src/index.html` stays a single self-contained file.** No build step, no bundler, no framework. Inline CSS and JS. Only external dependency is Google Fonts.
- **The site stays static-first.** Since 2026-09-16 there's exactly one exception: `worker/index.js`, scoped to `/api/*` only (`wrangler.jsonc`'s `assets.run_worker_first`) for the site-visit-stats endpoint — every other path is still served as a plain static file. Don't widen that scope or add more backend routes without discussing it first; this isn't meant to become a real backend app.
- **Secrets never go in a file.** Use `wrangler secret put` — not `wrangler.jsonc`, not a committed `.env`, not anywhere in git history. Non-secret config (IDs, not credentials) can go in `wrangler.jsonc`'s `vars`.
- **No automated commits/pushes to this repo.** A daily Cron Trigger writes to Workers KV (fine — that's not git), but nothing in this project should autonomously commit or push to GitHub. `docs/stats-log.md` is a manual, on-request export for exactly this reason — see `CONTEXT_MAP.md`'s decisions log, 2026-09-16, for the trade-off that was explicitly weighed and rejected.
- **No `localStorage` / `sessionStorage`.** The file is previewed inside Claude.ai where these fail.
- **Ireland English spelling** in all UI text, comments, and docs: colours, customise, organise, centre.
- **Never invent timetable data.** Every time in the file traces to a source listed in `CONTEXT_MAP.md`. Placeholders use the `tag-tbc` / `chip dash` pattern with literal "TBC".
- **Colour is never the only signal.** Every run category is always identifiable by text — its column header always spells out "Mon–Fri"/"Mon–Thu"/"Fri"/"Sat"/"Sun". Chips themselves are plain (no per-category colour or shape, 2026-09-16 — matches Sillan's own posters, which the owner supplied as the target look). There is no colour-coding toggle; keep new categories identifiable via their header text alone.

## Conventions
- Folder structure: `src / worker / docs / ai-memory / audit-logs / config`. `worker/` is the one exception to "static-first" above — see Hard constraints.
- After every session, append a timestamped log to `ai-memory/YYYY-MM-DD-HHMM-session.md`.
- Append actions to `audit-logs/actions.log` as one JSON object per line: `{"ts":"…","actor":"claude-code","action":"…","files":[…],"note":"…"}`.
- Code conventions for `index.html` are in `PATTERNS.md`.
- Update `CONTEXT_MAP.md` whenever a data source, decision, or constraint changes. Update `TODO_AI.md` as items complete.
- **Every deploy that changes `src/index.html` bumps the footer's `vNN` version link and adds an entry to `CHANGELOG.md`.** No build step stamps this automatically — it's a manual step, see `PATTERNS.md`.

## Working style (owner's preferences)
- Direct and concise. Numbered steps for anything procedural, with exact versions.
- Surface trade-offs rather than silently picking one.
- Don't assume — if a source is ambiguous, say so and ask.
- Correct mistakes plainly, no over-apologising.

## Principles
Don't assume. Don't hide confusion. Surface trade-offs. Goal-driven execution.
