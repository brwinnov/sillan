# Changelog

Every deploy to the live site bumps the version number shown in the page footer.
Newest first. Full detail for any entry is in the linked commit.

## v22 — 2026-09-15
Add a version number + this changelog, linked from the footer.

## v21 — 2026-09-15
[Fix column order bug in Default tab's To Dublin table](https://github.com/brwinnov/sillan/commit/5289cb8) — a data audit against the live site and Facebook found columns 5/6 and 7/8 were out of chronological order for every stop (values were correct, just mis-ordered). Fixed and verified against the real poster.

## v20 — 2026-09-15
[Update UCD timetable from owner-supplied refreshed poster image](https://github.com/brwinnov/sillan/commit/867fd88) — added the 7th "To UCD" run (09:15 Navan-starting, Mon–Thu only) and fixed a gap where "Depart UCD" was missing its 13:00 run. UCD tab moved from Provisional to Complete.

## v19 — 2026-09-15
[Add service announcements bar](https://github.com/brwinnov/sillan/commit/76aa1c5) — collapsible strip at the top of the page with Facebook's official Page Plugin (lazy-loaded on first open), a fallback link, and the WhatsApp join button.

## v18 — 2026-09-11
[Remove blank UCD row from Sat/Sun tables](https://github.com/brwinnov/sillan/commit/84a5e30) — neither weekend trip serves UCD, so the row was always a dash in both columns.

## v17 — 2026-09-11
[Add real Saturday/Sunday timetable from NTA GTFS data](https://github.com/brwinnov/sillan/commit/162b14d) — replaced the single TBC placeholder row with real (provisional) data, plus new Sat/Sun run categories (orange/vermillion, double-border/dotted shapes).

## v16 — 2026-09-11
[Add extra route-detail TFI stops to Navan's modal](https://github.com/brwinnov/sillan/commit/9f38392) — grouped "To Dublin"/"From Dublin" sub-stop lists for the several landmarks the route covers around Navan.

## v15 — 2026-09-11
[Remove 'nearby' hedge from Garlow Cross](https://github.com/brwinnov/sillan/commit/2b81467) — it's an official Route 179 stop, not an approximation.

## v14 — 2026-09-11
[Add Garlow Cross TFI stop 101821](https://github.com/brwinnov/sillan/commit/cca1da5).

## v13 — 2026-09-11
[Correct Shercock TFI stop number to 110111](https://github.com/brwinnov/sillan/commit/5608a8e).

## v12 — 2026-09-11
[Mention nearby TFI stop in Cootehill's description text](https://github.com/brwinnov/sillan/commit/b16a8e5).

## v11 — 2026-09-11
[Add stop-location accuracy disclaimer to About modal](https://github.com/brwinnov/sillan/commit/ce4018a).

## v10 — 2026-09-11
[Add Navan, Garlow Cross, and Ross Cross stop locations](https://github.com/brwinnov/sillan/commit/2087196).

## v9 — 2026-09-11
[Stop showing Plus Codes in stop modals; add Cootehill/Shercock TFI stops](https://github.com/brwinnov/sillan/commit/971da1e) — Plus Codes are reference-only, never shown on the page.

## v8 — 2026-09-11
[Add tap-to-open stop location modals with Maps and TFI live links](https://github.com/brwinnov/sillan/commit/1c8a6d3).

## v7 — 2026-09-11
[Tighten horizontal padding around timetable chips](https://github.com/brwinnov/sillan/commit/6d2ad5d).

## v6 — 2026-09-11
[Add Privacy footer link/modal; scope down AdSense plan to what's needed now](https://github.com/brwinnov/sillan/commit/c78759c) — no cookies exist yet, so no consent banner needed yet either.

## v5 — 2026-09-11
[Disable the week-strip day-pill row](https://github.com/brwinnov/sillan/commit/b29a8fb) — owner request; it was never interactive despite looking like buttons.

## v4 — 2026-09-11
[Add help/info modal and Sunday recollection caveat note](https://github.com/brwinnov/sillan/commit/cdf6645).

## v3 — 2026-09-11
[Extract timetable data to JSON, rename chip classes, add mobile scroll hint](https://github.com/brwinnov/sillan/commit/896b362) — timetables moved from hand-written `<table>` markup to a data-driven `TIMETABLES` object + `renderBoard()`.

## v2 — 2026-09-11
[Add first real-browser visual QA pass with screenshots](https://github.com/brwinnov/sillan/commit/4f9a2ba).

## v1 — 2026-09-11
[Deploy to Cloudflare Workers](https://github.com/brwinnov/sillan/commit/018e02d) at sillan.brwinnov.app, from the [initial commit](https://github.com/brwinnov/sillan/commit/b40c4f8).
