# SPEC - portal-landing-prototype

Computed styles snapshot, taken at local verification of the portal precision wave (headless Chromium 1920x1080, 2026-08-12). Source of target numbers: SYSTEM.md sections "Site chrome: header + footer" and "Portal chrome" (live, 2026-08-12). Verified values below are computed from the built page, not copied from the spec.

## Header (nav=live / nav=russell)

| Property | Target (live) | Computed | Status |
|---|---|---|---|
| Bar height | 80px | 80px | exact |
| Nav item font | Inter 500 16px, ls 0.5px, uppercase | 16px / 500 / 0.5px | exact |
| BOOK A MEETING height | 48px (2xl) | 48px | exact |
| BOOK A MEETING font | Inter 400 16px, ls -0.4px | 16px / 400 / -0.4px | exact (portal button theme, NOT Oro 600) |
| BOOK A MEETING fill | #27272a (zinc-800) | rgb(39,39,42) | exact |
| Beta chip fill | #bea042 (live gold) | rgb(190,160,66) | exact |
| Header bg (lg+) | rgba(255,255,255,0.9) + blur 6px | rgba(255,255,255,0.9) | exact |
| Header shadow | 0 4px 8px rgba(102,102,102,0.05), constant | matches | exact |

## Metapanel (nav=ton, has-gifts)

| Property | Target (live) | Computed | Status |
|---|---|---|---|
| Card padding / radius / shadow | 24px / 4px / none | 24px / 4px / none | exact |
| Title | Noto Serif 300 32px, ls -0.4px, zinc-600 text | 32px / 300 / rgb(82,82,91) / -0.4px | exact |
| GET HELP | h 40, Inter 400 14px uppercase, zinc-900 outlined | 40px, 14px / 400 / rgb(24,24,27) | exact |
| Crumbs | Inter 400 14px zinc-400, 24px to panel | 14px / rgb(161,161,170) / mb 24px | exact |

## Gift card

| Property | Target (live) | Computed | Status |
|---|---|---|---|
| Card fill | zinc-50 whole container | rgb(250,250,250) | exact |
| Card shadow | tailwind shadow-md | 0 4px 6px -1px + 0 2px 4px -2px rgba(0,0,0,.1) | exact |
| Price badge fill | zinc-200 | rgb(228,228,231) | exact |
| Name | Inter 500 20px zinc-700, centered, truncate | 20px / 500 / rgb(63,63,70) | exact |
| SEND THIS GIFT | h 48, zinc-800, Inter 400 16px uppercase ls -0.4px | 48px, matches | exact |

## Footer

| Property | Target (live) | Computed | Status |
|---|---|---|---|
| Ground | #000000 | rgb(0,0,0) | exact |
| Column titles | Noto Serif 400 22px | 22px Noto Serif | exact |
| Column links | Inter 300 14px | 14px / 300 | exact |
| Hairlines | #3d3d3d | token --footer-hairline | exact |

## Page grounds

| Property | Target (live) | Computed | Status |
|---|---|---|---|
| html (portal body role) | #fcfdfd | rgb(252,253,253) | exact |
| body (customer working area) | #f4f4f5 (zinc-100) | rgb(244,244,245) | exact |

Known deliberate deviations are marked DEVIATION in the CSS provenance comments of index.html (sticky vs fixed header, adapted cart badge anchor, simplified footer grid, felt hover values, felt crumb-strip values).
