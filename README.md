# Sillan — Route 179 timetable infographic

A clean, accessible, single-file replacement for Sillan Coaches' route 179 timetable posters (Cootehill / Kingscourt ⇄ Dublin / UCD).

**Open it:** `src/index.html` — works straight from disk in any modern browser. No build step, no install.

## Features
- One Mon–Fri table instead of separate Mon–Thu and Friday posters, with each run tagged by the days it operates
- Tabs for the Default route, UCD, and DCU timetables
- Colour-blind-safe palette (Okabe–Ito) with shape cues, so colour is never the only signal
- Light/dark mode, following your device setting by default
- Sun–Sat overview strip, Bank Holiday note, WhatsApp service-announcements group

## Status
| Timetable | State |
|---|---|
| Default (route 179, effective 7 Sept 2026) | Complete |
| UCD 2026/27 | Provisional — 7–11 Sept schedule; Sillan adds services from 14 Sept |
| DCU | Placeholder |
| Saturday / Sunday | Placeholder — nothing published |

## Project docs
- `HANDOVER.md` — what's been done, what's left, gotchas
- `CONTEXT_MAP.md` — data sources and decisions (single source of truth)
- `TODO_AI.md` — prioritised backlog
- `PATTERNS.md` — code conventions
- `CLAUDE.md` — instructions for Claude Code

## Pushing to GitHub (first time)
```bash
cd sillan
git init
git add .
git commit -m "Initial scaffold: route 179 infographic + handover docs"
git branch -M main
git remote add origin git@github.com:brwinnov/sillan.git
git push -u origin main
```
(Create the empty repo on GitHub first, without a README, or use `gh repo create brwinnov/sillan --private --source=. --push`.)

## Data sources
- Sillan Tours — https://sillan.ie (timetables, UCD page, FAQs)
- Original poster images in `docs/source-data/`

Not affiliated with Sillan Tours Ltd. Always confirm times with the operator before travelling.
