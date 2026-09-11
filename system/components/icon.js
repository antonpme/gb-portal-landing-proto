/* ============================================================
   gbppl-oro-icons-1 — THE ICON SET
   ------------------------------------------------------------
   A record of the glyphs this house draws, and nothing else. The
   icon itself is CSS (icon.css); this file exists because a set
   with no names is not a set, and because the showcase cannot list
   what nobody has written down.

   WHY A RECORD AND NOT A SPRITE. A sprite needs a fetch, a symbol
   id and a <use>, and it breaks the one thing our glyphs are good
   at: they are inline, so they are currentColor and they cost no
   request. So the set is a plain object of PATH BODIES on the 24
   grid, and every consumer keeps writing inline SVG. What changes
   is that the drawing has ONE home instead of nine.

   NOT ONE PATH BELOW IS NEW. Every d= is copied character for
   character out of the file that draws it today, named in `from`.
   Three chevrons are the single exception and they are copies too:
   the drawer's back arrow rotated, which is why they are marked
   `derived` rather than given a false address.

   WHAT IS DELIBERATELY NOT HERE:
     the four colour Google G (auth.js) — a brand mark, not an icon:
       it has its own palette and currentColor means nothing to it;
     the five device outlines (studio-panel.js) — drawn on a 20 grid
       for one row of one console, and they say «this console», not
       «this system»;
     the wordmark and the home strip's 96px ornament — artwork;
     system/icons/*.svg — Figma exports with #71717A baked into
       every stroke, carried by the portal as <img>. Pictures, not
       icons. Converting them is a wave of its own.

   THE FOUR WEIGHTS. `stroke` on each entry is what the CONSUMER
   draws today, not what the component gives: 1.2, 1.5, 1.8 and 2
   are all in use, nobody chose four, and .gb-icon renders every one
   of them at the house 1.5. The column is kept so the showcase can
   print the census and the migration list can be honest.

       window.GbIcons.html('close', 20)
       -> <span class="gb-icon gb-icon--20">...</span>

   Consumers are NOT converted in this wave (Ton: наброски first).

   ------------------------------------------------------------
   THE FIRST CONSUMER, AND SIX MORE DRAWINGS
   (gbppl-icon-consumers-1, 28.08)
   ------------------------------------------------------------
   The console's device row is the first thing in the house to ask
   the record for a glyph instead of carrying its own. Its six
   screens moved in with it, redrawn from the grid of twenty they
   were born on. Thirteen entries became nineteen; nothing else
   about the file changed.

   A page that shows the console therefore needs icon.css and
   icon.js, and icon.js must run BEFORE studio-panel.js, because
   the console writes its segments in connectedCallback.

   ------------------------------------------------------------
   TWO MORE, AND THE SECOND CONSUMER
   (gbppl-oro-select-stepper-1, 29.08)
   ------------------------------------------------------------
   minus and plus arrive with the input number, copied out of the four
   pairs the checkout drew by hand, and inputnumber.js is the second
   thing in the house to ask the record instead of carrying its
   own: it fills an empty .gb-btn__icon from here. Nineteen
   entries became twenty one.

   ------------------------------------------------------------
   AND ONE MORE, WITH A DIFFERENT PROVENANCE
   (gbppl-oro-props-1, 29.08)
   ------------------------------------------------------------
   `info` is the twenty second, and it is the first entry that no
   file in the house was already drawing: the properties door of
   the showcase needed an «about this» mark and there was none.
   It was redrawn from system/icons/circle-info.svg, one of the
   Figma exports listed below as pictures, the way the six screens
   were redrawn from their grid of twenty. The rule the file lives
   by is unchanged — provenance is said out loud — and the folder
   of exports is still a wave of its own.

   ------------------------------------------------------------
   AND A TWENTY THIRD, TAKEN BACK FROM THE SHOWCASE
   (gbppl-inspect-select-1, 03.09)
   ------------------------------------------------------------
   `copy` is the mark on every value line of the Inspect drawer. Ton
   asked for «существующий глиф copy из системы (icon.js)» and it was
   not here: two showcase pages were each drawing their own by hand,
   at two different weights, which is the drift this record exists to
   end. Copied out of system/oro/icons.html, the one already at the
   house 1.5. inspect.js is its first consumer and the third thing in
   the house to ask the record instead of carrying its own.

   ------------------------------------------------------------
   AND SEVEN MORE, FOR THE CONSOLE'S NAVIGATION
   (gbppl-panel2-build-1, 03.09)
   ------------------------------------------------------------
   Console 2.0 навигируется по разделам студии РЯДОМ ИКОНОК, и
   рисунков для них в записи не было. Пять пришли из утверждённого
   мокапа посимвольно (`home`, `globe`, `flask`, `grid`, `link`), и
   провенанс у них честный: DECLARED, мокап консоли, утверждённый
   заказчиком 03.09 после трёх раундов правок. Ни лайв, ни Figma их
   не показывали, и выдумывать им адрес было бы враньём.

   Ещё две — `panel-left` и `panel-right` — не новые вовсе: это тот
   самый глиф кнопки дока, который studio-panel.js рисовал у себя
   инлайном и сам же назвал долгом («ГЛИФ РИСУЕТСЯ ЗДЕСЬ, А НЕ В
   ЗАПИСИ НАБОРА, и это долг, названный вслух», gbppl-panel-dock-1).
   Долг закрыт: пара переехала сюда, вертикаль подрезана по
   прямоугольнику окна (было M9 4v16 при рамке 4.5..19.5), и консоль
   спрашивает их по имени, как спрашивает шесть экранов.
   Двадцать три записи стали тридцатью.

   ------------------------------------------------------------
   AND THE TRAY, BOTH WAYS ROUND
   (gbppl-v5-import-polish-1, 07.09)
   ------------------------------------------------------------
   Ton, on the import panel of ?v=5: «используй системные
   компоненты (например, иконку "закрыть" и все такое)». The panel's
   own two glyphs are the TRAY WITH AN ARROW, down for Download
   template and up for the drop zone, and neither was in the record
   while the checkout drew the pair TEN times: at 1.8 in seven
   button slots, at 1.5 in the drop zone, at 1.8 in two 16px rows.
   Worse, the download arrow was written TWO different ways for the
   same shape — «M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3» in the
   volume plate and «M12 3v13.5m0 0l4.5-4.5M12 16.5L7.5 12» in the
   panel — which is the drift this record exists to end.

   So the pair moves in, copied character for character out of
   checkout.html (the first of the two download spellings, the one
   the plate carries), and the import panel of V5 is the first
   consumer: the drop zone asks for `upload` by name through
   data-gb-icon, and the button slot pastes the recorded drawing,
   the way inputnumber.js pastes minus and plus. Thirty one entries
   became thirty three. The nine older copies on that page are left
   standing: converting the drawings of V1 to V4 would move pages
   that are in front of the team, and it is a wave of its own — the
   same sentence gbppl-icon-consumers-1 wrote about their weights.

   ------------------------------------------------------------
   AND A STACK OF PLATES
   (gbppl-v5-step2-pack-1, 07.09)
   ------------------------------------------------------------
   `layers` is the thirty fourth, and the second entry ever that no
   file in the house was already drawing (`info` was the first). Ton
   renamed the checkout's «Bulk personalize» menu to Bulk actions and
   asked for a glyph that says so; the one it wore was a document, the
   mark of ONE page, over a menu that writes every row of a table. The
   argument for the stack over the other candidate is at the entry.

   MEASURED WHILE DOING IT, and said out loud because it bites the
   next reader: a recorded glyph pasted into a `.gb-btn__icon` slot
   has NO WEIGHT. `.gb-icon > svg` is what carries stroke-width
   1.5, and the button's slot only sets the box, so the plain output
   of svg() renders at the SVG default of 1 — probed on the four
   input numbers of the checkout, which come out at 1px today. A
   consumer outside a .gb-icon box therefore names the house weight
   on the tag it writes.

   ------------------------------------------------------------
   AND FOUR FOR THE CONCIERGE
   (gbppl-concierge-1, 09.09)
   ------------------------------------------------------------
   Ton, 09.09, on the single Help / Concierge experience: one way in
   from the bar of every page, «иконка-звоночек (клош консьержа) в
   хедере, ряд с аккаунтом и корзиной», by the Tiffany reference of
   08.09. The record had nothing for it, and nothing for the three
   doors the drawer opens either.

   THREE OF THE FOUR ARE NOT NEW DRAWINGS. `chat`, `calendar` and
   `telephone` are copied character for character out of
   live\portal.html, where the START popup's «Talk to a gifting
   expert» has been drawing them by hand since 19.08 — the same
   three doors, the same three glyphs, one file that owns them. Two
   things did not come with them, and both are the record's own
   rule: the dots of the speech bubble carried stroke-width="2" as
   an attribute on their path (the one case where a glyph escapes
   the house weight, said out loud at the head of `layers`), and the
   handset carried the popup's own caps. Inside .gb-icon all three
   come out at the house 1.5 with round caps, like every other entry.

   `telephone` and not `phone`: the name was taken on 28.08 by the
   console's 390 preset, which is a slab with a speaker line, and a
   set cannot hold one name for two objects.

   THE FOURTH IS THE BELL, AND IT HAS AN ADDRESS. `service-bell` is
   NOT invented and not redrawn by eye: it is
   assets\nucleo-full\48-service-bell.svg — Nucleo, the set the house
   already licenses and the one the home strip's advantage glyphs are
   drawn from — adapted the way the six console screens were adapted
   from their grid of twenty. Every coordinate halved off the 48 grid
   (the source group carries translate(0.5 0.5), so the halving is of
   the EFFECTIVE coordinate, not of the written one), recentred on
   x 12 and dropped a quarter pixel so the bell stands with three
   clear on top and three at the foot. The source's stroke 1, its
   butt caps and its mitre joins are left behind: the record gives
   one weight and one pair of ends to everything in it.
   Thirty four entries became thirty eight.

   THREE MORE OFF THE SAME SET (gbppl-portal-dashboard-1, 10.09):
   `bell`, `credit-card` and `heart`, for the first sketch of the
   portal dashboard. All three are Nucleo files in
   assets\nucleo-full, and all three are adapted by the arithmetic
   `service-bell` established above: halve the WRITTEN coordinate,
   which is (w + 0.5) / 2 recentred by the quarter pixel the group's
   translate puts in. Nothing is drawn by eye and nothing is
   invented. The bell in particular is NOT the concierge's bell and
   is not a redraw of it: see its own note at the entry.

   ------------------------------------------------------------
   AND THREE FOR THE SHARED DESIGN STAGE
   (gbppl-design-share-3, 11.09)
   ------------------------------------------------------------
   Ton, 11.09, on live\design-share.html: the two viewer utilities
   leave the podium and become glyphs in the corner of the scene,
   and the gesture hint moves inside the scene «с иконками». Three
   drawings the record did not have: a wand for «See it
   personalized», and a turn and a mouse for the two gestures.

   All three are Nucleo files out of assets\nucleo-full, adapted by
   the arithmetic `service-bell` established and `bell`,
   `credit-card`, `heart` and `sliders` have used since: halve the
   WRITTEN coordinate, which is (w + 0.5) / 2 recentred by the
   quarter pixel the source group's translate(0.5 0.5) puts in.
   Nothing is drawn by eye, nothing is composited out of two files,
   and no path is dropped: each entry is one whole source file. The
   sources' stroke 1, butt caps and mitre joins are left behind, as
   the record leaves them behind for everything.
   ============================================================ */
(function () {
  'use strict';

  /* The grid every glyph is drawn on. One number, said once. */
  var GRID = 24;

  var SET = {
    'arrow-right': {
      body: '<path d="M4 12h15M13 6l6 6-6 6"/>',
      from: 'auth.js, booking.js: the forward glyph of every submit',
      stroke: 1.8
    },
    /* ---- THE SIX SCREENS (gbppl-icon-consumers-1, 28.08) ----
       The console's device presets. They were drawn in
       studio-panel.js on a grid of TWENTY, because that was the size
       they had to come out at; the set is drawn on 24, and a second
       grid inside one set is the drift the record exists to end. So
       they were redrawn here at 24, every coordinate multiplied and
       landed on a half pixel, and they inherit the house weight and
       the house round caps instead of the 1.4 and the square caps
       they carried. Compared side by side with the originals at 20
       and at 16 before this was kept.

       XL and L are an HONEST DIFFERENCE OF SIZE, not two objects:
       the same monitor, wider and narrower, both on a stand. The
       laptop stands on its own broad foot, tablet and phone are
       upright slabs, and Full is a browser window with a title bar. */
    'browser': {
      body: '<rect x="2.5" y="4" width="19" height="16" rx="1.5"/><path d="M2.5 9h19"/>',
      from: 'studio-panel.js: the Full preset of the console',
      stroke: 1.5
    },
    'laptop': {
      body: '<rect x="5" y="4.5" width="14" height="11" rx="1.5"/><path d="M2.5 18.5h19"/>',
      from: 'studio-panel.js: the 1280 preset of the console',
      stroke: 1.5
    },
    'monitor': {
      body: '<rect x="4" y="4.5" width="16" height="12" rx="1.5"/><path d="M12 16.5v3M9 19.5h6"/>',
      from: 'studio-panel.js: the 1920 preset of the console',
      stroke: 1.5
    },
    'monitor-wide': {
      body: '<rect x="1.5" y="4" width="21" height="13" rx="1.5"/><path d="M12 17v3M8 20h8"/>',
      from: 'studio-panel.js: the 2258 preset of the console',
      stroke: 1.5
    },
    'phone': {
      body: '<rect x="8" y="2.5" width="8" height="19" rx="1.5"/><path d="M10.5 18.5h3"/>',
      from: 'studio-panel.js: the 390 preset of the console',
      stroke: 1.5
    },
    'tablet': {
      body: '<rect x="5.5" y="2.5" width="13" height="19" rx="1.5"/><path d="M10 18.5h4"/>',
      from: 'studio-panel.js: the 768 preset of the console',
      stroke: 1.5
    },
    /* THE OTHER BELL (gbppl-portal-dashboard-1, 10.09). The concierge
       took `service-bell`, the cloche on its tray, on 08.09; the
       portal's notification bell is a DIFFERENT OBJECT and gets its
       own name and its own address:
       assets\nucleo-full\48-bell.svg, the same Nucleo set, adapted by
       the same arithmetic as its neighbour (halve the written
       coordinate: the source group carries translate(0.5 0.5), so
       (w + 0.5) / 2 recentred by a quarter pixel is exactly w / 2).
       Two strokes: the dome on its shoulder line, and the clapper arc
       under it. The source's stroke 1, butt caps and mitre joins are
       left behind, as the record leaves them behind for everything.

       TWO BELLS IN ONE BAR IS AN OPEN QUESTION, and it is Ton's, not
       this file's: the concept (studio\docs\PORTAL-DASHBOARD-CONCEPT.md,
       question 1) asks whether notifications take the classic bell or
       the concierge moves to another glyph. The record can hold both
       drawings while the question is open; a bar that shows both at
       once is a decision, and it is not made here. */
    'bell': {
      body: '<path d="M21 18.5V17C21 17 18.5 15 18.5 10V8C18.5 4.41 15.59 1.5 12 1.5C8.41 1.5 5.5 4.41 5.5 8V10C5.5 15 3 17 3 17V18.5C9 19.83 15 19.83 21 18.5Z"/>' +
            '<path d="M9.53 19.43C9.5 19.61 9.5 19.8 9.5 20C9.5 21.38 10.62 22.5 12 22.5C13.38 22.5 14.5 21.38 14.5 20C14.5 19.8 14.47 19.61 14.43 19.43"/>',
      from: 'assets/nucleo-full/48-bell.svg (Nucleo, the house set): the notification bell of the portal bar',
      stroke: 1
    },
    /* ---- THE FOUR OF THE CONCIERGE (gbppl-concierge-1, 09.09) ----
       The three doors first, all three out of live\portal.html. */
    'calendar': {
      body: '<rect x="3.5" y="5.5" width="17" height="15" rx="1.5"/>' +
            '<path d="M7.5 3v5M16.5 3v5M3.5 10h17M8 14h3M8 17h6"/>',
      from: 'live/portal.html: the Book a meeting door of the START popup',
      stroke: 1.5
    },
    'cart': {
      body: '<circle cx="9" cy="20" r="1.4"/><circle cx="17.5" cy="20" r="1.4"/>' +
            '<path d="M3 4h2.4l2.2 11.5a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.3L21 8H6.2"/>',
      from: 'header.js: the basket, drawn for the signed in bar',
      stroke: 1.5
    },
    /* The bubble with the tail, and the three dots that say someone is
       there. The dots are written as three zero length segments with
       round caps, which is what draws a dot; the popup gave them their
       own stroke-width="2" and the record takes it off (head of file). */
    'chat': {
      body: '<path d="M5.5 18.5 3.8 21l.5-4A8.5 8.5 0 1 1 7 19.5"/>' +
            '<path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01"/>',
      from: 'live/portal.html: the Live chat door of the START popup',
      stroke: 2
    },
    'chevron-down': {
      body: '<path d="M5 9l7 7 7-7"/>',
      from: 'derived: the drawer back arrow turned a quarter',
      stroke: 1.5
    },
    'chevron-left': {
      body: '<path d="M15 5l-7 7 7 7"/>',
      from: 'drawer.js: the step back in the drawer head',
      stroke: 1.5
    },
    'chevron-right': {
      body: '<path d="M9 5l7 7-7 7"/>',
      from: 'derived: the drawer back arrow mirrored',
      stroke: 1.5
    },
    'chevron-up': {
      body: '<path d="M5 15l7-7 7 7"/>',
      from: 'derived: the drawer back arrow turned a quarter',
      stroke: 1.5
    },
    /* gbppl-checkout-recon-1, 03.09. Ton, on ?v=3: «Аккордеон в
       принципе нормально, но непонятно: он уже заполнен или ещё
       пустой.» A step that has been answered now wears a tick, and a
       tick is a glyph, so the record gets one instead of the checkout
       drawing an eleventh copy of it by hand. The path is the one
       already on that page — the «Filled» pills of the personalization
       table and the drawn check of the order confirmation. It is
       written there at 2.5, which is what `stroke` records; .gb-icon
       draws it at the house 1.5 like every other entry. */
    'check': {
      body: '<path d="M4.5 12.75l6 6 9-13.5"/>',
      from: 'checkout.html: the Filled pills of the personalization table',
      stroke: 2.5
    },
    'close': {
      body: '<path d="M6 6l12 12M18 6L6 18"/>',
      from: 'drawer.js: the cross every drawer in the house wears',
      stroke: 1.5
    },
    /* gbppl-inspect-select-1, 03.09. Ton, on the Inspect drawer:
       «На каждом значении должен быть copy on hover... Иконка =
       существующий глиф copy из системы (icon.js)». It was not in the
       record — it was drawn BY HAND TWICE, in system/oro/icons.html
       and again, a little differently, in system/oro/typography.html,
       which is the exact drift this file exists to end. Copied
       character for character from the icons showcase, the one of the
       two already at the house weight of 1.5. The other two copies are
       left standing: changing what typography.html draws is a look, not
       a behaviour, and it belongs to a cleanup wave with its own eyes
       on it. Said here so the next reader does not draw a fourth. */
    'copy': {
      body: '<rect x="9" y="9" width="12" height="12" rx="2"/>' +
            '<path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
      from: 'system/oro/icons.html: the copy button of a glyph row',
      stroke: 1.5
    },
    /* THE CARD (gbppl-portal-dashboard-1, 10.09). The house had no
       glyph for a payment method: the checkout says the word and the
       portal's Payment methods door had nothing to wear. Address:
       assets\nucleo-full\48-credit-card.svg, halved off the 48 grid
       the same way as `bell` above. Three strokes and a body: the
       magnetic band, the line under it, the short number group at the
       foot, and the rounded plate they sit on. */
    'credit-card': {
      body: '<path d="M1.5 7H22.5"/><path d="M1.5 10.5H22.5"/><path d="M5.5 16.5H8"/>' +
            '<path d="M4 20.5H20C21.38 20.5 22.5 19.38 22.5 18V6C22.5 4.62 21.38 3.5 20 3.5H4C2.62 3.5 1.5 4.62 1.5 6V18C1.5 19.38 2.62 20.5 4 20.5Z"/>',
      from: 'assets/nucleo-full/48-credit-card.svg (Nucleo, the house set): the Payment methods door of the portal dashboard',
      stroke: 1
    },
    /* gbppl-v5-import-polish-1, 07.09. The tray with the arrow, and
       the arrow is the whole difference between the two entries: down
       is «give me the blank file», up is «here is my filled one». Both
       bodies are the checkout's, and the two of them are one object
       drawn twice, so they are recorded as a pair rather than one now
       and its mirror later. */
    'download': {
      body: '<path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>',
      from: 'checkout.html: the Download template buttons of the import flow',
      stroke: 1.8
    },
    'eye': {
      body: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/>' +
            '<circle cx="12" cy="12" r="2.8"/>',
      from: 'auth.js: show the password',
      stroke: 1.5
    },
    'filters': {
      body: '<path d="M3.5 6.5h17M7 12h10M10.5 17.5h3"/>',
      from: 'catalog.js: the filters toggle',
      stroke: 1.5
    },
    /* SLIDERS (gbppl-portal-dashboard-8, 10.09). Ton off the
       dashboard's Customize button: the glyph there read as a FILTER,
       and it was one — `filters` is literally the catalogue's own
       funnel of three lines. This is the настройка motif instead:
       three tracks with a handle on each, which says «arrange what
       you see» and cannot be mistaken for narrowing a list.
       Nucleo 48-sliders-2.svg, halved to the 24 grid coordinate for
       coordinate (43->21.5, 38->19, 5->2.5, r 5.5->2.75): the drawing
       is the set's, the arithmetic is exact, nothing is redrawn by
       hand. First carrier: the Customize button of the dashboard. */
    'sliders': {
      body: '<path d="M21.5 12h-2.5M11 12H2.5M2.5 19.5H5M21.5 19.5H13M2.5 4.5H5M21.5 4.5H13"/>' +
            '<circle cx="16.25" cy="12" r="2.75"/>' +
            '<circle cx="7.75" cy="19.5" r="2.75"/>' +
            '<circle cx="7.75" cy="4.5" r="2.75"/>',
      from: 'assets/nucleo-full/48-sliders-2.svg -> the dashboard Customize button, 10.09',
      stroke: 1.5
    },
    /* ---- СЕМЬ ГЛИФОВ КОНСОЛИ 2.0 (gbppl-panel2-build-1, 03.09) ----
       Первые четыре — разделы студии: дом = Hub, глобус = Live
       Prototype (то, что опубликовано миру), колба = Sandbox (то, что
       ещё в опыте), сетка 2x2 = Design System (набор из частей).
       Пятый — цепочка Copy link. Все пять сняты с мокапа посимвольно и
       уже нарисованы на сетке 24 без своего веса и своих концов, как
       требует запись. Пара panel-* — переезд рисунка кнопки дока из
       studio-panel.js, долг которой там и назван. */
    'flask': {
      body: '<path d="M9.6 3.2v6.4L4.4 18a2 2 0 0 0 1.7 3h11.8a2 2 0 0 0 1.7-3l-5.2-8.4V3.2"/>' +
            '<path d="M8.2 3.2h7.6"/><path d="M7.3 14.6h9.4"/>',
      from: 'DECLARED: the Sandbox section of the console navigation (panel 2.0 mockup, Ton 03.09)',
      stroke: 1.5
    },
    'globe': {
      body: '<circle cx="12" cy="12" r="8.8"/><path d="M3.2 12h17.6"/>' +
            '<ellipse cx="12" cy="12" rx="4.2" ry="8.8"/>',
      from: 'DECLARED: the Live Prototype section of the console navigation (panel 2.0 mockup, Ton 03.09)',
      stroke: 1.5
    },
    'grid': {
      body: '<rect x="3.4" y="3.4" width="7.2" height="7.2" rx="1.6"/>' +
            '<rect x="13.4" y="3.4" width="7.2" height="7.2" rx="1.6"/>' +
            '<rect x="3.4" y="13.4" width="7.2" height="7.2" rx="1.6"/>' +
            '<rect x="13.4" y="13.4" width="7.2" height="7.2" rx="1.6"/>',
      from: 'DECLARED: the Design System section of the console navigation (panel 2.0 mockup, Ton 03.09)',
      stroke: 1.5
    },
    /* THE HEART (gbppl-portal-dashboard-1, 10.09). Favourites exist on
       the live category page inside the vendored v1 bundle, which
       draws its own; the house record had none, and the shelf of
       favourites on the portal dashboard is the first thing outside
       that bundle to ask for one. Address:
       assets\nucleo-full\48-heart.svg, halved off the 48 grid like
       `bell` and `credit-card`. One stroke, outline only: a filled
       heart is a STATE (saved) and states are the consumer's business,
       not the record's. */
    'heart': {
      body: '<path d="M12 22 15.35 19.55C16.54 18.69 20.53 15.56 22.09 11.59C23.27 8.56 21.83 5.13 18.87 3.92C16.34 2.89 13.51 3.82 12 6C10.49 3.82 7.66 2.89 5.13 3.92C2.17 5.13 0.73 8.56 1.91 11.59C3.47 15.56 7.46 18.69 8.65 19.55L12 22Z"/>',
      from: 'assets/nucleo-full/48-heart.svg (Nucleo, the house set): the saved mark of the favourites shelf',
      stroke: 1
    },
    'home': {
      body: '<path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.8 9.4V20h12.4V9.4"/>',
      from: 'DECLARED: the Hub section of the console navigation (panel 2.0 mockup, Ton 03.09)',
      stroke: 1.5
    },
    /* THE ONE GLYPH THIS SET DREW FOR ITSELF (gbppl-oro-props-1,
       29.08). Every other body here was copied out of the file that
       draws it; this one had no such file, because the door to the
       properties drawer is the first thing in the house to need an
       «about this» mark. It is not invented either: it is
       system/icons/circle-info.svg, the Figma export the portal
       carries as a picture, redrawn on the 24 grid exactly the way
       the six screens were redrawn from their grid of twenty. Two
       things about the export did not come with it — the 0.8 stroke
       and the #71717A baked into it, which are the two reasons that
       folder is pictures and not icons — and the serif hook on the
       stem was dropped because it does not survive 16px. Provenance
       said out loud, because that is the whole job of this file. */
    'info': {
      body: '<circle cx="12" cy="12" r="9.5"/><path d="M12 17v-6.8"/><path d="M12 7.5h.01"/>',
      from: 'system/icons/circle-info.svg, redrawn on the grid for the properties door of the showcase',
      stroke: 1.5
    },
    /* gbppl-v5-step2-pack-1, 07.09. Ton, on the checkout's bulk menu:
       «Иконка не просто страничка, а отражающая именно Bulk Actions.» The
       button carried a DOCUMENT — the glyph of one page — over a menu whose
       every line does one thing to EVERY gift in the table, which is the
       opposite of what a single sheet says. Nothing in the house drew a
       stack, and system/icons has no export of one either (checked, 27
       files), so this is the second entry after `info` that the record drew
       itself, and the provenance says so rather than inventing an address.
       WHY A STACK AND NOT A CHECKLIST, the other candidate: a checklist on
       this screen would echo the tick column of the very table beside it,
       where a tick already means «this row is selected» — one drawing, two
       meanings, one row apart. A stack of plates says «many at once» and
       says nothing else. Drawn on the 24 grid at the house weight, the top
       plate a diamond and two passes under it, so it reads at 16. */
    'layers': {
      body: '<path d="M12 3.2 21 8l-9 4.8L3 8l9-4.8Z"/>' +
            '<path d="m3.6 12.4 8.4 4.5 8.4-4.5"/>' +
            '<path d="m3.6 16.4 8.4 4.5 8.4-4.5"/>',
      from: 'DECLARED: Bulk actions on the checkout personalization table (Ton 07.09); no drawing in the house and none in system/icons',
      stroke: 1.5
    },
    'link': {
      body: '<path d="M10.4 13.6a4.6 4.6 0 0 0 6.5 0l2.7-2.7a4.6 4.6 0 0 0-6.5-6.5l-1.5 1.6"/>' +
            '<path d="M13.6 10.4a4.6 4.6 0 0 0-6.5 0l-2.7 2.7a4.6 4.6 0 0 0 6.5 6.5l1.5-1.6"/>',
      from: 'DECLARED: Copy link in the console foot (panel 2.0 mockup, Ton 03.09)',
      stroke: 1.5
    },
    'mail': {
      body: '<rect x="2.5" y="4.5" width="19" height="15" rx="1.5"/><path d="m3 5.5 9 7 9-7"/>',
      from: 'auth.js: the address step of the sign in flow',
      stroke: 1.2
    },
    'menu': {
      body: '<path d="M3 6h18M3 12h18M3 18h18"/>',
      from: 'header.js: the burger below 1280',
      stroke: 1.5
    },
    /* gbppl-oro-select-stepper-1: the two glyphs of the input number.
       Copied character for character out of the checkout, where
       four pairs of them were drawn by hand before this record
       existed. The checkout drew them at 2.5; inside .gb-icon they
       come out at the house 1.5, like every other entry here. */
    'minus': {
      body: '<path d="M19.5 12h-15"/>',
      from: 'checkout.html: the four quantity input numbers',
      stroke: 2.5
    },
    /* THE MOUSE (gbppl-design-share-3, 11.09). Half of «Scroll to
       zoom», the gesture hint that now stands inside the 3D scene.
       assets\nucleo-full\48-mouse-2.svg, halved: the shell, the seam
       between the two buttons, and the stem up to it. The set's other
       mouse (48-mouse.svg) draws the wheel as a capsule four units
       wide on the 24 grid, which at the 16px this hint renders at is
       a filled blob; two buttons and a seam survive the size, and the
       words beside the glyph say which gesture is meant. Whole file,
       nothing dropped. */
    'mouse': {
      body: '<path d="M12 1.5V11"/><path d="M3.49 11H20.43"/>' +
            '<path d="M3.5 10V14C3.5 18.6944 7.3056 22.5 12 22.5C16.6944 22.5 20.5 18.6944 20.5 14V10C20.5 5.3056 16.6944 1.5 12 1.5C7.3056 1.5 3.5 5.3056 3.5 10Z"/>',
      from: 'assets/nucleo-full/48-mouse-2.svg (Nucleo, the house set): «Scroll to zoom» on the shared design stage',
      stroke: 1
    },
    /* Кнопка дока консоли, обе стороны. Рисунок тот же, что жил
       инлайном в studio-panel.js: прямоугольник окна (тот же, что у
       пресета Full) и одна вертикаль, отрезающая полосу пульта. Имя
       говорит, С КАКОЙ стороны стоит полоса, а не куда поедет ящик:
       запись называет рисунок, решение о смысле принимает потребитель. */
    'panel-left': {
      body: '<rect x="3" y="4.5" width="18" height="15" rx="1.5"/><path d="M9 4.5v15"/>',
      from: 'studio-panel.js: the dock button, drawn inline until 03.09',
      stroke: 1.5
    },
    'panel-right': {
      body: '<rect x="3" y="4.5" width="18" height="15" rx="1.5"/><path d="M15 4.5v15"/>',
      from: 'studio-panel.js: the dock button, drawn inline until 03.09',
      stroke: 1.5
    },
    'plus': {
      body: '<path d="M12 4.5v15m7.5-7.5h-15"/>',
      from: 'checkout.html: the four quantity input numbers',
      stroke: 2.5
    },
    /* THE TURN (gbppl-design-share-3, 11.09). The other half of the
       gesture hint: «Drag to turn». A ring open at the top right with
       the arrow head closing it, which is the one motif a reader
       cannot mistake for anything but rotation.
       assets\nucleo-full\48-arrow-rotate-clockwise.svg, halved. Two
       paths, whole file. It is NOT `arrows-rotate-center`, the other
       candidate: two arrows and a hub is three objects at 16px. */
    'rotate': {
      body: '<path d="M22 12C22 17.5229 17.5229 22 12 22C6.4772 22 2 17.5229 2 12C2 6.4772 6.4772 2 12 2C16.1007 2 19.6248 4.4682 21.1679 8L21.0915 7.8294"/>' +
            '<path d="M21.5 2V8H15.5"/>',
      from: 'assets/nucleo-full/48-arrow-rotate-clockwise.svg (Nucleo, the house set): «Drag to turn» on the shared design stage',
      stroke: 1
    },
    'search': {
      body: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      from: 'header.js, auth.js: the magnifier of the bar',
      stroke: 1.5
    },
    /* THE CONCIERGE BELL. Nucleo 48-service-bell, halved off the 48
       grid and recentred; the provenance and the arithmetic are at the
       head of this file. Five strokes: the press button, its stem, the
       dome on its plinth, the inner curve of the dome, and the tray it
       stands on. */
    'service-bell': {
      body: '<path d="M9 4h6"/><path d="M12 4v3"/>' +
            '<path d="M12 7C6.2 7 1.5 11.63 1.5 17.35V18.5h21v-1.15C22.5 11.63 17.8 7 12 7Z"/>' +
            '<path d="M12 10.5c-2.85 0-5.3 1.64-6.4 4"/>' +
            '<path d="M1.5 21h21"/>',
      from: 'assets/nucleo-full/48-service-bell.svg (Nucleo, the house set): the concierge glyph of the bar, Ton 08.09',
      stroke: 1
    },
    /* The handset. `phone` was taken on 28.08 by the console's 390
       preset, and one name cannot mean two objects. */
    'telephone': {
      body: '<path d="M8.2 3.5 5.4 4.8c-1 .5-1.5 1.7-1.1 2.8 2.2 5.9 6.2 9.9 12.1 12.1 1.1.4 2.3-.1 2.8-1.1l1.3-2.8-4.8-2.1-1.2 2.1a12.6 12.6 0 0 1-6.3-6.3l2.1-1.2-2.1-4.8Z"/>',
      from: 'live/portal.html: the Call us door of the START popup',
      stroke: 1.5
    },
    /* The other half of the pair above. First consumer: the drop zone
       of the V5 import panel, which asks for it by name. */
    'upload': {
      body: '<path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>',
      from: 'checkout.html: the drop zone of the import panel and the Import from file buttons',
      stroke: 1.8
    },
    'user': {
      body: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
      from: 'header.js: the guest face that opens the sign in drawer',
      stroke: 1.5
    },
    /* THE WAND (gbppl-design-share-3, 11.09). «See it personalized»,
       the door that rewrites the words on the gift. Ton named the
       candidates — wand, sparkle, pen tool — and the wand is the one
       that says CHANGE THIS THING rather than «new» (sparkle, which
       reads as AI everywhere now) or «edit a document» (a pen).
       assets\nucleo-full\48-wand.svg, halved. Whole file: the body,
       the collar, and five sparks. The sparks are two units long in
       the source, so on the 24 grid they are one unit with the
       house's round caps — the very construction `chat` uses for the
       three dots of its bubble, and at 20px they read as sparks
       around the tip, which is what the drawing means. */
    'wand': {
      body: '<path d="M1.71 18.71L3.5 20.5L5.29 22.29L18.21 9.38L14.62 5.79L1.71 18.71Z"/>' +
            '<path d="M11 9.5L14.5 13"/>' +
            '<path d="M15.25 1V2"/><path d="M23 8.75H22"/>' +
            '<path d="M20.73 3.27L20.02 3.98"/><path d="M20.73 14.23L20.02 13.52"/>' +
            '<path d="M10.48 3.98L9.77 3.27"/>',
      from: 'assets/nucleo-full/48-wand.svg (Nucleo, the house set): «See it personalized» on the shared design stage',
      stroke: 1
    }
  };

  /* One opening tag for the whole set, so a glyph cannot arrive
     with its own stroke, its own cap or its own fill. Weight comes
     from .gb-icon, ink comes from the sentence around it. */
  function svg(name) {
    var it = SET[name];
    if (!it) return '';
    return '<svg viewBox="0 0 ' + GRID + ' ' + GRID + '" fill="none" stroke="currentColor" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + it.body + '</svg>';
  }

  /* The whole thing: box, size and drawing. A glyph that is only
     decoration is aria-hidden, which is the default, because a
     glyph that carries meaning is a different call and should be
     made on purpose by the consumer. */
  function html(name, size) {
    if (!SET[name]) return '';
    var cls = 'gb-icon' + (size ? ' gb-icon--' + size : '');
    return '<span class="' + cls + '" aria-hidden="true">' + svg(name) + '</span>';
  }

  /* Markup written by hand stays markup written by hand; this is
     for the pages that would rather name the glyph than paste it.
       <span data-gb-icon="close" data-gb-icon-size="20"></span> */
  function fill(node) {
    var name = node.getAttribute('data-gb-icon');
    if (!SET[name]) return;
    var size = node.getAttribute('data-gb-icon-size');
    node.className = 'gb-icon' + (size ? ' gb-icon--' + size : '');
    node.setAttribute('aria-hidden', 'true');
    node.innerHTML = svg(name);
  }

  function mount(root) {
    var scope = root || document;
    if (scope.matches && scope.matches('[data-gb-icon]')) fill(scope);
    Array.prototype.forEach.call(scope.querySelectorAll('[data-gb-icon]'), fill);
  }

  window.GbIcons = {
    grid: GRID,
    names: function () { return Object.keys(SET).sort(); },
    has: function (name) { return !!SET[name]; },
    entry: function (name) { return SET[name] || null; },
    svg: svg,
    html: html,
    mount: mount
  };

  /* gbppl-oro-select-stepper-1: A GLYPH CAN ARRIVE LATE.
     mount() sweeps the document once, and the content of a
     <template> is not in the document: the checkout keeps its four
     drawer bodies there and hands them to <gb-drawer> on open, so
     the chevron of the country select was written, swept past and
     never drawn. Measured, not guessed — the probe came back with
     a select that had no glyph beside it.

     So the record watches for arrivals, the way inputnumber.js watches
     for its frames. It mounts only nodes that ask, by the same
     attribute, and a node that has already been mounted is left
     alone: mount() rewrites innerHTML, and rewriting it twice on a
     glyph that is already right is work nobody asked for. */
  function watch() {
    if (!window.MutationObserver) return;
    new MutationObserver(function (records) {
      records.forEach(function (rec) {
        Array.prototype.forEach.call(rec.addedNodes, function (node) {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches('[data-gb-icon]') && !node.firstElementChild) fill(node);
          else if (node.querySelector && node.querySelector('[data-gb-icon]')) mount(node);
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mount(); watch(); });
  } else {
    mount();
    watch();
  }
})();
