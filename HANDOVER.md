# Sillan — Handover for Claude Code

**Date:** Friday 11 September 2026
**From:** Claude (chat session) → **To:** Claude Code
**Owner:** Ackros (Barry) · GitHub `brwinnov`

Read this first. `CONTEXT_MAP.md` is the durable single source of truth; this file is the narrative of what happened and where to go next.

---

## 1. What this project is

A clean, accessible, single-file HTML infographic replacing Sillan Coaches' messy multi-image route 179 timetables (Cootehill / Kingscourt ⇄ Dublin / UCD commuter coach, Co. Cavan → Dublin).

Sillan publishes separate JPEG posters per day-type on their website and Facebook. This project turns those into one readable, colour-blind-safe, dark-mode-capable page with a tab per timetable variant.

**Deliverable:** `src/index.html` — self-contained, no build step, no dependencies beyond Google Fonts. Open it in a browser or host it as a static page.

---

## 2. What's been done (session log, condensed)

1. **Data extraction** — Two poster images (Mon–Thu and Friday-only) were transcribed and reconciled. Discovered that 6 of 8 "to Dublin" runs and 5 of 8 "from Dublin" runs are identical every weekday; the two posters only differ at the edges of the day. Documented in `docs/timetable-mon-fri.md`.

2. **Infographic built** — Departure-board aesthetic: dark chips with monospace times, run headers labelled "Run 1…8" (not clock times — that was confusing) with a day-type tag under each.

3. **Header extras** — WhatsApp service-announcements badge (lower-right), a **Default / UCD / DCU** view toggle (lower-left), and a **light/dark theme toggle** (top-right) that follows `prefers-color-scheme` on load.

4. **Full-week framing** — Sun→Sat strip showing which days run. Saturday & Sunday are a **placeholder** (TBC chips) because Sillan has published nothing for weekends. Bank Holiday note added.

5. **Accessibility pass** — Chip colours switched to the Okabe–Ito colour-blind-safe palette (yellow / sky blue / reddish purple) **and** each category has a distinct shape (rounded rect / pill / dashed outline) so colour is never the only signal. Legend shows the real chip shapes. Columns narrowed.

6. **UCD tab populated with real data** — Pulled from `https://sillan.ie/ucd/` via a live browser session. See caveat in §4.

7. **DCU tab** — Still a placeholder. No source found yet.

---

## 3. Repo layout

```
sillan/
├── README.md              Public-facing readme (what it is, how to open/host)
├── HANDOVER.md            ← you are here
├── CONTEXT_MAP.md         Single source of truth: data model, sources, decisions
├── CLAUDE.md              Claude Code operating instructions for this repo
├── TODO_AI.md             Backlog, prioritised
├── PATTERNS.md            Code conventions for index.html
├── PROJECT_SUMMARY.json   Machine-readable project metadata
├── .gitignore
├── src/
│   └── index.html         THE deliverable — single-file infographic
├── docs/
│   ├── timetable-mon-fri.md         Reconciled Mon–Fri data as Markdown tables
│   └── source-data/
│       ├── 179-mon-thu-poster.png   Original Sillan poster (uploaded by owner)
│       └── 179-friday-only-poster.png
├── ai-memory/             Per-session memory logs (timestamped .md)
├── audit-logs/            actions.log (NDJSON, append-only) + CHANGES_SUMMARY.md
└── config/                Reserved (empty)
```

---

## 4. Important caveats / things that will bite you

- **The UCD tab is a Freshers'-week schedule, not the final one.** `sillan.ie/ucd` is explicitly labelled *7–11 September 2026* and says *"Further services will be added on Monday 14th September 2026."* It has 6 runs to UCD (vs 8 on the Default tab) and 5 return runs (no 13:00, 19:00, 19:15). **Re-check the page on/after Mon 14 Sept and update.**

- **Facebook cannot be fetched by `web_fetch`** — returns `ROBOTS_DISALLOWED`. Sillan's official site (`sillan.ie`) *can* be fetched as HTML, but its **image files are behind a bot-protection captcha** (`/.well-known/sgcaptcha/`) — `curl` from a sandbox gets an HTML challenge page, not the JPEG. The only method that worked for image content was opening the page in the owner's connected Chrome via the Claude-in-Chrome extension and reading it visually.

- **Two conflicting Bank Holiday statements.** Owner asked for "Bank Holidays are the same as Sundays." Sillan's FAQ actually says *"reduced service on Bank Holiday Sundays **and Mondays**."* Current wording in the infographic follows the owner's request but was flagged. Worth resolving with real Bank Holiday timetable data if it ever appears.

- **Saturday/Sunday: genuinely nothing published.** `sillan.ie/bus-timetables` only has two images (Mon–Thu, Fri). `bustimes.org` has NTA GTFS data for the route but its date-picker is client-side JS, so a static fetch returns the same table regardless of `?date=` param. If you need weekend data, the NTA GTFS feed is the better source: https://www.transportforireland.ie/transitData/PT_Data.html (Small Operators).

- **`bustimes.org` shows a 15:20 Shercock departure** not on any Sillan poster. Unverified — may be stale GTFS or a service Sillan doesn't advertise. Don't add it without confirmation.

- **No browser storage in `index.html`.** Deliberate — the file is previewed inside Claude.ai where `localStorage` fails. Theme toggle therefore doesn't persist between visits. If the owner only ever opens it in their own browser, persistence is a 3-line change.

- **Ireland spelling throughout** — "colours", "customise". Owner preference, applies to code comments and UI text too.

---

## 5. Data model (how index.html is organised)

Everything lives in one file. Three `<div class="view">` blocks — `#view-default`, `#view-ucd`, `#view-dcu` — toggled by the segmented control in the header. Only one is visible at a time (`hidden` attribute).

Each timetable is a plain `<table class="board">`:
- Column headers = `Run N` + a `.run-tag` pill (`tag-all` / `tag-mt` / `tag-fr` / `tag-tbc`)
- Rows = stops, in route order
- Cells = `<span class="chip amber|teal|pink|dash">` or `<span class="m3">M3</span>`

⚠ The chip class names (`amber`, `teal`, `pink`) are **legacy** from the first colour scheme. They now map to yellow / sky-blue / reddish-purple via CSS vars. Renaming them to semantic names (`all` / `mt` / `fr`) is on the backlog but touches ~150 spans — a good first Claude Code task, ideally with a script.

`M3` = the bus takes the M3 motorway and does not call at that stop.

---

## 6. What remains (see TODO_AI.md for the full prioritised list)

**Must do**
- Set up the GitHub repo `brwinnov/sillan` and push this scaffold.
- Re-fetch `sillan.ie/ucd` after 14 Sept 2026 and update the UCD tab.
- Find or get DCU timetable data; populate the DCU tab.

**Should do**
- Rename chip classes to semantic names.
- Extract timetable data into a JSON structure and render tables from it (so updates are data edits, not HTML surgery). Keep the single-file constraint — inline the JSON.
- Visual regression check in a real browser (nothing in this project has been screenshotted at desktop width yet; the layout was built blind and verified only by tag-balance checks).

**Could do / future ideas**
- Static hosting (GitHub Pages or the owner's existing Vercel/Hetzner infra).
- Print stylesheet (A4 portrait poster).
- "Next departure" live widget using device time.
- Per-stop view (pick your stop → see just your times).
- Monitoring Sillan's Facebook page for service announcements / temporary timetable changes. `web_fetch` can't do it. Options: (a) owner runs a periodic Claude-in-Chrome check, (b) look for an RSS/mailing-list route, (c) a small scraper on the owner's own infra using a real browser (Playwright) — sillan.ie's captcha will also apply.
- Export to PNG/PDF for sharing on WhatsApp (the owner's channel of choice for this).

---

## 7. How the owner likes to work

- Direct, concise, numbered steps tailored to exact versions.
- Corrects errors without hesitation — do the same back.
- Ireland English spelling.
- Standard folder structure (`src / docs / ai-memory / audit-logs / config`), `CONTEXT_MAP.md` as SoT, `TODO_AI.md` as backlog, timestamped session logs in `ai-memory/`, NDJSON audit trail in `audit-logs/actions.log`.
- Uses Claude Code + VS Code in parallel; likes checklist-driven phases for anything multi-step.
