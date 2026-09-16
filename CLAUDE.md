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
- **No `localStorage` / `sessionStorage`.** The file is previewed inside Claude.ai where these fail.
- **Ireland English spelling** in all UI text, comments, and docs: colours, customise, organise, centre.
- **Never invent timetable data.** Every time in the file traces to a source listed in `CONTEXT_MAP.md`. Placeholders use the `tag-tbc` / `chip dash` pattern with literal "TBC".
- **Colour is never the only signal.** Every run category is always identifiable by text (its column header spells out "Mon–Fri"/"Mon–Thu"/"Fri"/"Sat"/"Sun"). Colour+shape coding on the chips themselves is an **opt-in enhancement** via the "Colour-blind" toggle (off by default, 2026-09-16 — the default view matches Sillan's own black/white posters) — keep both the plain default style and the toggle-on colour+shape style working when adding categories.

## Conventions
- Folder structure: `src / docs / ai-memory / audit-logs / config`.
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
