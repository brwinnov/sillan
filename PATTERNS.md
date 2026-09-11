# PATTERNS.md — code conventions for `src/index.html`

## File structure (top to bottom)
1. `<head>` — Google Fonts link, single `<style>` block
2. `<div class="sheet">` — page wrapper, max-width 960px
3. `<header>` — red gradient band: route number, brand, route path, date badge, theme toggle (top-right), view toggle (lower-left), WhatsApp badge (lower-right)
4. `.legend` — global, outside the view blocks so it shows on every tab
5. `#view-default`, `#view-ucd`, `#view-dcu` — one `<div class="view">` each; only one un-`hidden` at a time
6. `<footer>`
7. Single `<script>` block — view toggle, then theme toggle

## CSS
- All colours via CSS custom properties on `:root`; dark mode overrides them on `body.dark`. Add new colours as variables, not literals.
- Fonts: `Space Grotesk` for display/headings/buttons, `IBM Plex Sans` for body, `IBM Plex Mono` for every time value.
- One mobile breakpoint at `600px`. Absolutely-positioned header widgets go `position:static` there and stack.
- Sections use `.section` (padding) → `.section-head h2` → `.section-sub` → `.board-wrap > table.board` → `.notes`.
- Keep selectors flat. Avoid element selectors that could collide with `.section`/`.note` spacing.

## Timetable tables
```html
<div class="board-wrap">
  <table class="board">
    <thead><tr>
      <th class="stop-col-head">Stop</th>
      <th class="run-head"><span class="run-time">Run 1</span><span class="run-tag tag-all">Mon–Fri</span></th>
      …
    </tr></thead>
    <tbody>
      <tr>
        <td class="stop-cell"><span class="dot"></span>Stop name</td>
        <td class="time-cell"><span class="chip amber">6.30</span></td>
        <td class="time-cell"><span class="m3">M3</span></td>
        <td class="time-cell"><span class="chip dash">–</span></td>
      </tr>
    </tbody>
  </table>
</div>
```
- Run headers are `Run N` — never a clock time (see decisions log).
- Time chips use `H.MM` with a dot (matches Sillan's posters). Notes use `HH:MM`.
- Chip class → category mapping is in `CONTEXT_MAP.md`. Header tag must agree with the chip colours in that column.
- Stops in geographic route order, top to bottom, in the direction of travel.

## Notes
- `.note` (amber) for informational; `.note.rose` for warnings/exceptions. First child is a `.mark` glyph: `i`, `!`, `+`, `–`.

## JS
- Vanilla, no dependencies, ES5-compatible style (no arrow functions/const) — keeps it working in any browser the owner's audience might use.
- Toggles use `hidden` attribute and ARIA (`aria-selected`, `aria-pressed`).
- No `localStorage`/`sessionStorage`.

## Text
- Ireland English spelling.
- Sentence case for headings. No all-caps except the `SILLAN COACHES` wordmark.
- En dashes for ranges (Mon–Fri, 7–11 Sept). Middle dots `·` only in the small footer/badge meta lines.
