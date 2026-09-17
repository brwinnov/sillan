# Route 179 — Saturday & Sunday timetable

**Source:** Sillan's own official "179 Timetable — Saturday & Sunday Services" poster, posted
to Facebook 2026-09-17. This is now the **confirmed, official** source, replacing the
provisional NTA GTFS data this project used from 2026-09-11 to 2026-09-17 (kept below,
clearly marked superseded, for reference).

Times are 24-hour. "Set down only" = drop-off only, no boarding. "Pick up only" = boarding
only, no alighting. **TBC** = the bus does call at this stop, but Sillan's poster doesn't
publish an individual time for it.

---

## Condensed view — used in the infographic

### To Dublin

| Stop | Sat (every Saturday) | Sun (every Sunday except Bank Holiday) |
|---|---|---|
| Cootehill | 9.00 | 17.30 |
| Shercock | 9.20 | 17.45 |
| Kingscourt | 9.35 | 18.00 |
| Nobber | 9.45 | 18.10 |
| Wilkinstown | 9.55 | 18.20 |
| Navan | 10.10 | 18.30 |
| Garlow Cross | 10.15 | 18.35 |
| Ross Cross | 10.20 | 18.40 |
| Dunshaughlin | 10.30 | 18.45 |

- **Saturday:** the poster doesn't detail the route past Dunshaughlin into Dublin.
- **Sunday:** continues past Dunshaughlin, dropping off at **O'Connell Street → Nassau
  Street → St Stephen's Green → UCD** — no times published for these. This means Sunday
  **does** serve UCD, contradicting the old NTA-sourced data's "neither day serves UCD" —
  the NTA data is superseded here.

### From Dublin

| Stop | Sat | Sun |
|---|---|---|
| Nassau Street *(pick up only)* | 18.00 | 20.30 |
| Hilton Garden, IFSC *(pick up only)* | 18.05 | 20.35 |
| Dunshaughlin | TBC | TBC |
| Ross Cross | TBC | TBC |
| Garlow Cross | TBC | TBC |
| Navan | TBC | TBC |
| Wilkinstown | TBC | TBC |
| Nobber | TBC | TBC |
| Kingscourt | TBC | TBC |
| Shercock | TBC | TBC |
| Cootehill *(set down only)* | TBC | TBC |

The poster only publishes the two Dublin departure times/points; it states the return calls
at "all stops to Cootehill" without giving individual times for them. The stop order above
assumes the reverse of the outbound route (matching the weekday table's pattern) — not itself
stated on the poster, but the only reasonable reading of "all stops."

## Bank Holidays — now resolved

Sillan's poster states directly: **"Bank holiday Sunday no service. Bank holiday Monday,
Sunday timetable."** This resolves the long-open question in `CONTEXT_MAP.md` — the NTA feed
had no Bank Holiday exceptions registered, and Sillan's FAQ page separately claimed "reduced
service" without specifics; this poster is the actual answer, more specific than either.

---

## Superseded: NTA GTFS provisional data (used 2026-09-11 to 2026-09-17)

Kept for reference only — **do not use for current times**, several figures differ materially
from the official poster above (different times throughout, and the return trip's Dublin
departure point/stop entirely changed from Cumberland Street N to Nassau Street/Hilton
Garden). Useful only as a rough guide to which named sub-stops and Dublin set-down points the
full route physically passes through, since the new official poster doesn't itemise those.

**Source:** National Transport Authority GTFS feed (Small Operators), version
`1CFFD1CF-FCF8-4BE8-8379-7269746D5553`, published 10 September 2026. Licence CC BY 4.0.
Extracted 2026-09-11 with `docs/source-data/extract-gtfs-179.py`.

### Saturday — 09:00 Cootehill → National Gallery (arr. 11:10, GTFS trip `5640_9`)

| Time | Stop | TFI stop no. | Note |
|---|---|---|---|
| 09:00 | Cootehill | 15094 | Pick up only |
| 09:20 | Shercock | 110111 |  |
| 09:35 | Kingscourt | 137861 |  |
| 09:45 | Nobber | 137881 |  |
| 09:55 | Wilkinstown | 137901 |  |
| 09:58 | Kilberry | 137911 |  |
| 10:00 | Proudstown | 15087 |  |
| 10:01 | St Oliver's School | 15088 |  |
| 10:10 | Navan R147 | 105581 |  |
| 10:11 | Ardboyne Hotel | 101801 |  |
| 10:12 | Kilcarn | 101811 |  |
| 10:15 | Garlow Cross | 101821 |  |
| 10:20 | Ross Cross | 101861 |  |
| 10:30 | Dunshaughlin | 15090 |  |
| 10:53 | Blanchardstown N3 | 104561 | Set down only |
| 10:55 | Connolly Hospital | 7297 | Set down only |
| 10:57 | Ashtown Roundabout | 1696 | Set down only |
| 10:58 | Rosecourt | 1804 | Set down only |
| 10:59 | Phibsborough Church | 80 | Set down only |
| 11:00 | Mater Hospital | 817 | Set down only |
| 11:05 | Parnell Square East | 265 | Set down only |
| 11:10 | National Gallery | 7585 | Set down only |

### Saturday — 18:00 Cumberland Street N → Cootehill (arr. 19:50, GTFS trip `5640_19`)

| Time | Stop | TFI stop no. | Note |
|---|---|---|---|
| 18:00 | Cumberland Street N | 13618 | Pick up only |
| 18:35 | Dunshaughlin | 133381 |  |
| 18:40 | Ross Cross | 101861 |  |
| 18:45 | Garlow Cross | 101361 |  |
| 18:47 | Kilcarn | 135711 |  |
| 18:48 | Ardboyne Hotel | 136961 |  |
| 18:50 | Flower Hill | 15091 |  |
| 18:51 | St Oliver's School | 15092 |  |
| 18:52 | Clonmagaddan | 15093 |  |
| 18:55 | Kilberry | 132191 |  |
| 19:05 | Wilkinstown | 132121 |  |
| 19:15 | Nobber | 131731 |  |
| 19:25 | Kingscourt | 131423 |  |
| 19:35 | Shercock | 107531 |  |
| 19:50 | Cootehill | 15094 | Set down only |

### Sunday — 18:20 Cootehill → Parnell Square East (arr. 20:25, GTFS trip `5640_11`)

| Time | Stop | TFI stop no. | Note |
|---|---|---|---|
| 18:20 | Cootehill | 15094 | Pick up only |
| 18:45 | Shercock | 110111 |  |
| 19:00 | Kingscourt | 137861 |  |
| 19:10 | Nobber | 137881 |  |
| 19:20 | Wilkinstown | 137901 |  |
| 19:23 | Kilberry | 137911 |  |
| 19:25 | Proudstown | 15087 |  |
| 19:26 | St Oliver's School | 15088 |  |
| 19:35 | Navan R147 | 105581 |  |
| 19:36 | Ardboyne Hotel | 101801 |  |
| 19:37 | Kilcarn | 101811 |  |
| 19:40 | Garlow Cross | 101821 |  |
| 19:45 | Ross Cross | 101861 |  |
| 19:50 | Dunshaughlin | 15090 |  |
| 20:13 | Blanchardstown N3 | 104561 | Set down only |
| 20:15 | Connolly Hospital | 7297 | Set down only |
| 20:17 | Ashtown Roundabout | 1696 | Set down only |
| 20:18 | Rosecourt | 1804 | Set down only |
| 20:19 | Phibsborough Church | 80 | Set down only |
| 20:20 | Mater Hospital | 817 | Set down only |
| 20:25 | Parnell Square East | 265 | Set down only |

### Sunday — 20:30 Cumberland Street N → Cootehill (arr. 22:20, GTFS trip `5640_22`)

| Time | Stop | TFI stop no. | Note |
|---|---|---|---|
| 20:30 | Cumberland Street N | 13618 | Pick up only |
| 21:05 | Dunshaughlin | 133381 |  |
| 21:10 | Ross Cross | 101861 |  |
| 21:15 | Garlow Cross | 101361 |  |
| 21:17 | Kilcarn | 135711 |  |
| 21:18 | Ardboyne Hotel | 136961 |  |
| 21:20 | Flower Hill | 15091 |  |
| 21:21 | St Oliver's School | 15092 |  |
| 21:22 | Clonmagaddan | 15093 |  |
| 21:25 | Kilberry | 132191 |  |
| 21:35 | Wilkinstown | 132121 |  |
| 21:45 | Nobber | 131731 |  |
| 21:55 | Kingscourt | 131423 |  |
| 22:05 | Shercock | 107531 |  |
| 22:20 | Cootehill | 15094 | Set down only |

## Note on the earlier "unconfirmed recollection" (superseded context)

The owner recalled (before any Sat/Sun data existed) a Sunday evening run of roughly
"Kingscourt 7pm, arrive Dublin ~8:30pm". The NTA data's Sunday To-Dublin trip had Kingscourt
at 19:00, arriving Parnell Square East at 20:25 — a close match, suggesting the recollection
was accurate. The official poster now has Sunday Kingscourt at **18:00** instead — about an
hour earlier than both the recollection and the NTA data. Worth knowing if the recollection
or the NTA data ever needs referencing again: neither matches the current official time.

## Tags used in `index.html` (implemented 2026-09-11)

Two run categories: **Sat only** (`sat`) and **Sun only** (`sun`) — column-header text label
only since 2026-09-16, no per-category colour or shape (see `CONTEXT_MAP.md`).
