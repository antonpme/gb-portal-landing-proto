/* ============================================================
   THE CONCIERGE EXPERIENCE, AS ONE THING
   live/concierge/concierge.js  ·  gbppl-concierge-unify-1
   ============================================================
   2026-09-09. Ton is showing Valerie that the help experience is
   ONE experience, the same on the website and inside the portal,
   so what was the controller of one page became a module that two
   pages consume. Nothing about the behaviour changed on the way
   out: the file it came from renders node for node as it did
   before the move, and that was the gate of the extraction.

   WHY live/concierge/ AND NOT system/components/: it is a PAGE
   FAMILY, not an organism. It becomes an organism on Ton's word
   and in a wave of its own, with the map line, the inventory line
   and the showcase that law 0a.2 asks for. Until then it sits
   beside its consumers, the way live/catalog/ keeps its own.

   HOW A PAGE CONSUMES IT
     <link rel="stylesheet" href="concierge/concierge.css">
     <script src="concierge/concierge.js"></script>
     GbConcierge.mount({ ...environment... });

   THE ENVIRONMENT IS THE ONLY THING THAT DIFFERS, and it is one
   object rather than two copies of a page:

     bellSlot     where the concierge bell joins the bar. The
                  website hands it the header organism's right
                  cluster; the portal hands it its own. null = the
                  page places the bell itself.
     bellBefore   the neighbour the bell stands in front of inside
                  that cluster, so the glyph order is deliberate.
     anchor       the element the conversation is inserted BEFORE.
                  Not document.body: trap 19 and trap 21 both say a
                  layer dropped at the end of a body can be handed a
                  foreign scale, and both pages have a studio panel
                  to stand in front of.
     advisorFloor FLOOR TWO, and this is Ton 09.09 13:51: the drawer
                  is the same everywhere, but the personal Gift
                  Advisor, a named human with a card and a message
                  box, EXISTS ONLY IN THE PORTAL and only for
                  someone signed in. Off the portal that floor does
                  not exist at all: not disabled, not a stub,
                  ABSENT. So it is a flag on the environment and the
                  drawer is built without it, rather than built and
                  then hidden.
     aiDoor       the AI door belongs where gifts are being chosen.
     siteHref     the address the booking flow returns to.
     panelRow     register the accent switch on the one console.

   THE PUBLIC SURFACE
     GbConcierge.mount(env)   once per page
     GbConcierge.open()       open the drawer on floor one. This is
                              how the portal's own START button
                              opens the same switchboard instead of
                              the popup it used to open.
     GbConcierge.mounted      boolean

   NO prefers-reduced-motion BRANCH ANYWHERE, and that is Ton-7 read
   strictly plus Ton 09.09: animation is off at the OS level on his
   machine and it has to play anyway.

   gbppl-concierge-check-1 (10.09, the acceptance run before the
   showing). Two things this file was getting wrong, both found with
   the instrument and neither visible at a desk with a 60Hz screen:
     whenBuilt capped the wait for the calendar in ANIMATION FRAMES,
       so on a fast display the cap fired before the organism had
       drawn and the level set off with an empty box;
     riseChat hid the plate without reading it, so an answer that
       arrived while the chat was down stayed marked unread and the
       next minimise quoted a line the guest had already seen.
   ============================================================ */
(function () {
  'use strict';

  /* The conversation's own markup. It is built here rather than
     written into both pages, because two copies of twenty-five lines
     is the drift this whole wave exists to remove. It is INSERTED AT
     THE PAGE'S ANCHOR and not appended to the body: see `anchor`.

     THE PILL STANDS FIRST, and that is the whole mechanism of the
     morph's last frame: the two plates carry the same z-index, so
     paint order is document order and the window is always ABOVE the
     plate. The window shrinks onto the plate and is taken away
     without anything showing through. */
  var MARKUP =
    '<div class="gbhc-pill" id="gbhcPill" hidden>' +
      '<button class="gbhc-pill__open" type="button" id="gbhcPillOpen" aria-label="Open the chat">' +
        '<span class="gbhc-dot gbhc-pill__dot" id="gbhcPillDot" aria-hidden="true"></span>' +
        '<span class="gbhc-pill__name" id="gbhcPillName">Live chat</span>' +
        '<span class="gbhc-pill__last"><span id="gbhcPillLast"></span></span>' +
      '</button>' +
      '<button class="gb-btn gb-btn--icon gb-btn--small gb-btn--ghost gb-btn--secondary gbhc-pill__end" type="button" id="gbhcPillEnd" data-gbhc-tip="End chat" aria-label="End the chat"></button>' +
    '</div>' +
    '<div class="gbhc-chat" id="gbhcChat" role="dialog" aria-label="Chat" hidden>' +
      /* THE HEAD IS THE DRAWER ORGANISM'S HEAD, in grammar and in
         order. Ton, 09.09: «не фанат этого хедера, выглядит как
         притянутая за уши архитектура», and the diagnosis is right —
         three bare glyphs of one weight in a row had navigation, a
         window state and a destruction leaning on each other with
         nothing to say which was which.

         .gbd-head reads: back FIRST, on the left; then the subject,
         which takes the room; then the cross, on the right. Every
         control is the button organism wearing --icon --ghost
         --secondary in a .gbd-slot, and the back glyph is the
         organism's own. This head says the same sentence with one
         word more, because a window has a state a drawer does not:
         BACK · who you are talking to · MINIMISE + CLOSE.

         THE TWO ON THE RIGHT ARE A PAIR AND ARE SPACED AS ONE. The
         head's own gap (16) separates ZONES; the pair holds together
         on 8, so the eye reads two things on the right and not two
         more items in a list of five. And the cross is outermost:
         the destructive one sits where nothing follows it. */
      '<div class="gbhc-chat__head">' +
        '<button class="gb-btn gb-btn--icon gb-btn--ghost gb-btn--secondary gbd-slot" type="button" id="gbhcBack" data-gbhc-tip="Back to options" aria-label="Back to the options"></button>' +
        '<h2 class="gbhc-chat__title">' +
          '<span class="gbhc-chat__name" id="gbhcName">Live chat</span>' +
          '<span class="gbhc-dot gbhc-chat__dot" id="gbhcPresence" aria-hidden="true"></span>' +
        '</h2>' +
        '<div class="gbhc-chat__slots">' +
          '<button class="gb-btn gb-btn--icon gb-btn--ghost gb-btn--secondary gbd-slot" type="button" id="gbhcMin" data-gbhc-tip="Minimize" aria-label="Minimize the chat"></button>' +
          '<button class="gb-btn gb-btn--icon gb-btn--ghost gb-btn--secondary gbd-slot" type="button" id="gbhcEnd" data-gbhc-tip="End chat" aria-label="End the chat"></button>' +
        '</div>' +
      '</div>' +
      '<div class="gbhc-log" id="gbhcLog" aria-live="polite"></div>' +
      /* THE CONFIRMATION IS A STRIP, NOT A MODAL. Ton: «на закрытие
         подтверждение всё-таки нужно». A dialog over a dialog is two
         surfaces asking one question, so the question stands where
         the answer will be lost: a quiet band over the composer,
         inside the window it is about. The pair is the checkout's
         own (Cancel then Remove, both --ghost, the destructive one
         --primary), on the small rung because this is furniture of a
         panel and not a page's closing act. */
      '<div class="gbhc-confirm" id="gbhcConfirm" hidden>' +
        '<p class="gbhc-confirm__q">End this chat?</p>' +
        '<div class="gbhc-confirm__acts">' +
          '<button class="gb-btn gb-btn--small gb-btn--ghost gb-btn--secondary" type="button" data-keep>' +
            '<span class="gb-btn__label" data-pc-section="label">Keep chatting</span></button>' +
          '<button class="gb-btn gb-btn--small gb-btn--ghost gb-btn--primary" type="button" data-endnow>' +
            '<span class="gb-btn__label" data-pc-section="label">End chat</span></button>' +
        '</div>' +
      '</div>' +
      '<form class="gbhc-composer" id="gbhcForm" autocomplete="off">' +
        '<div class="gbhc-chips" id="gbhcChips" aria-label="Suggested messages"></div>' +
        '<div class="gbhc-composer__field gba-scale-portal">' +
          '<div class="gba-inputwrap">' +
            '<input class="gba-input" id="gbhcInput" type="text" aria-label="Your message" placeholder="Message a gifting specialist...">' +
          '</div>' +
          '<button class="gbhc-send" id="gbhcSend" type="submit" aria-label="Send message" disabled></button>' +
        '</div>' +
        '<p class="gbhc-composer__hint" id="gbhcHint"></p>' +
      '</form>' +
    '</div>';

  var ENV = {
    bellSlot:     'gb-site-header .gbh-actions',
    bellBefore:   '[aria-label="Search gifts"]',
    anchor:       'gb-studio-panel',
    advisorFloor: false,
    aiDoor:       true,
    siteHref:     '',
    panelRow:     true,
    /* THE ENVIRONMENT SWITCH, so Valerie can click between the two
       and see that it is one experience. The module draws the row
       because the row is about the module; the ADDRESSES stay with
       the pages, because a module has no business knowing where its
       consumers live. { here: 'website'|'portal', website: href,
       portal: href }; absent = no row. */
    environments: null
  };

  var openDrawerFn = null;

  function mount(opts) {
    if (API.mounted) return;
    API.mounted = true;
    var env = {}, k, j;
    for (k in ENV) if (ENV.hasOwnProperty(k)) env[k] = ENV[k];
    if (opts) for (j in opts) if (opts.hasOwnProperty(j)) env[j] = opts[j];
    if (!env.siteHref) env.siteHref = location.pathname.split('/').pop();

    /* The switchboard's surface and the conversation, in that order,
       both in front of the anchor. The drawer organism moves its own
       panel to document.body when it opens, which is its business and
       not ours; the element itself stays where the page put it. */
    var anchor = env.anchor ? document.querySelector(env.anchor) : null;
    var frag = document.createDocumentFragment();
    /* THE DRAWER ELEMENT IS THE PAGE'S OWN LINE, and it is worth the
       one line. The organism appends its panel and its scrim to
       document.body the moment it upgrades, so an element created
       down here, after every script tag, would put those two nodes at
       the far end of the body instead of where they stand today.
       Nothing rendered would change — both are fixed, hidden and
       identical — but the extraction's gate is that NOTHING moves,
       and a page that declares its own <gb-drawer id="gbhcDrawer">
       keeps the organism upgrading at exactly the moment it always
       did. A page that forgets still works: one is made here. */
    if (!document.getElementById('gbhcDrawer')) {
      var d = document.createElement('gb-drawer');
      d.id = 'gbhcDrawer';
      frag.appendChild(d);
    }
    var holder = document.createElement('div');
    holder.innerHTML = MARKUP;
    while (holder.firstChild) frag.appendChild(holder.firstChild);
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(frag, anchor);
    else document.body.appendChild(frag);

    boot(env);
  }

  function boot(ENVIRONMENT) {
    var I = window.GbIcons;
    var drawer = document.getElementById('gbhcDrawer');

    /* ---- THE CLOCKS COME OUT OF THE TOKENS ---------------------
       Every wait in this controller is READ from --mo-*, so there is
       no second copy of a duration in JavaScript that can drift from
       the one in CSS. Change the rung in tokens.css and both the
       ride and the hand-off that follows it move together. */
    var ROOT_CS = getComputedStyle(document.documentElement);
    function ms(name) { return parseFloat(ROOT_CS.getPropertyValue(name)) || 0; }
    var MO = {
      micro:     ms('--mo-micro'),       /* 160 */
      smallOut:  ms('--mo-small-out'),   /* 90  */
      small:     ms('--mo-small'),       /* 280 */
      mediumOut: ms('--mo-medium-out'),  /* 350 — the drawer's exit */
      medium:    ms('--mo-medium')       /* 500 — the window's rise */
    };

    /* ---- THE ACCENT OF THE SESSION PLATE -----------------------
       Two variants, because Ton has not chosen. The address carries
       it (?accent=blue|gold) so a screenshot can be asked for by
       link, and the one console carries the same switch as a Demo
       row, which is the house rule for a page level toggle (Ton
       26.08, «один пульт»). Nothing else on the page reads the
       property: the accent is the plate's edge and only that. */
    var ACCENTS = ['blue', 'gold'];
    function readAccent() {
      var q = (new URLSearchParams(location.search)).get('accent');
      return ACCENTS.indexOf(q) > -1 ? q : 'blue';
    }
    function setAccent(v, writeUrl) {
      document.documentElement.setAttribute('data-gbhc-accent', v);
      if (!writeUrl) return;
      var u = new URL(location.href);
      u.searchParams.set('accent', v);
      history.replaceState(null, '', u.toString());
    }
    setAccent(readAccent(), false);
    /* Who the advisor is. One place, because the card, the message
       form and the live chat all speak of the same person. */
    var ADVISOR = {
      name: 'Brad Smaling',
      email: 'connect@gildedbox.com',
      phone: '(847) 801-0345 ext. 8118',
      tel: '+18478010345'
    };
    var DESK = { shown: '847.801.0345', tel: '+18478010345' };

    function glyph(name, size) { return I ? I.html(name, size) : ''; }

    /* ============================================================
       1. THE FORK OF THE BAR
       ------------------------------------------------------------
       Ton asked for a fork for this sandbox and for the canonical
       header to come out untouched. The fork is ADDITIVE: the bar is
       the one <gb-site-header> draws, and this block puts the
       concierge bell into its right cluster, in front of the search
       dot, so the glyph pair reads bell then search and the cart
       (which aims at the same dot) still lands between them.

       WHY NOT A COPY OF header.js. A second 1200 line template would
       be a second bar to keep in step with the first, and the first
       changes weekly. The observable result is what Ton is looking
       at, and it is the same result; if he wants the bell on Live for
       everyone, the button moves into TEMPLATE() in one line, which
       is a smaller change than deleting a fork.

       The element upgrades while header.js is being parsed, so the
       bar is already in the DOM here; whenDefined is belt and braces
       for a browser that defers the script.

       AND ONE OPERATION SERVES BOTH ENVIRONMENTS, which is the point
       of the module: the website hands it the header organism's right
       cluster, the portal hands it the cluster of its own bar, and
       neither bar is edited. Two selectors on the environment instead
       of two copies of a decorator.
       ============================================================ */
    function forkTheBar() {
      if (!ENVIRONMENT.bellSlot) return;
      var slot = document.querySelector(ENVIRONMENT.bellSlot);
      if (!slot || slot.querySelector('[data-gbhc-bell]')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gb-btn gb-btn--icon gb-btn--ghost gb-btn--secondary';
      btn.setAttribute('aria-label', 'Talk to us');
      btn.setAttribute('title', 'Talk to us');
      btn.setAttribute('aria-haspopup', 'dialog');
      btn.setAttribute('data-gbhc-bell', '');
      /* The slot of the organism carries the size (22 in a 44 circle);
         the drawing comes out of the record by name. */
      btn.innerHTML = '<span class="gb-btn__icon" aria-hidden="true">' +
        (I ? I.svg('service-bell') : '') + '</span>';
      btn.addEventListener('click', openHome);
      var before = ENVIRONMENT.bellBefore ? slot.querySelector(ENVIRONMENT.bellBefore) : null;
      slot.insertBefore(btn, before);   /* a null neighbour appends, which is what a bar without one wants */

      /* AND THE ORGANISM IS ASKED TO LOOK AGAIN. Ton, 09.09, off a
         screenshot of the home page: «иконка должна адаптироваться
         так же, как и соседние, например поиска». She was black over
         the video hero while the search dot beside her was white, and
         the cause was a clock and not a colour: header.js already
         re-classes every `.gbh-actions .gb-btn--icon` between
         --inverse and --secondary in its own apply(), the bell
         included — but apply() had run at upgrade time, BEFORE this
         decorator put the bell in, and it only runs again on scroll
         or resize. At the top of a page nobody has scrolled, the bell
         had never been looked at.

         So the bell does not paint itself and no rule of ours mirrors
         the organism's steps. One resize event, and the bar dresses
         the new glyph with the very code that dresses its own:
         transparent-dark, is-past-hero, the portal bar, the studio
         step and anything added later all come for free, and there is
         no second copy of the ink logic to drift. */
      window.dispatchEvent(new Event('resize'));
      alignBell(btn);
    }

    /* ---- THE OPTICAL GAP -------------------------------------
       Ton, 09.09, on the zoom: «кривые отступы: между звонком и
       кнопкой слева МЕНЬШЕ, чем между звонком и поиском». The
       declared rhythm was innocent — .gbh-actions is gap: 12 and
       every box gap measured 12, before the bell and after — and he
       was still right, because a box gap is not what an eye reads.
       A LABELLED BUTTON ENDS AT A DRAWN BORDER; A GLYPH BUTTON ENDS
       11px INSIDE ITS 44 BOX. So the same 12 renders as 23 of white
       on the button side and 34 between two glyphs, and the bell
       looks stuck to the button it is standing next to. This is the
       house rule «смотреть результат, не числа» (Ton 27.08) with
       the numbers agreeing for once: the rhythm was right and the
       picture was wrong.

       NO TOKEN, and it cannot be one: the correction is not a
       length that belongs to a scale, it is the DIFFERENCE between
       two neighbours' ink insets, and it changes with who the
       neighbours are. On the site bar at full width the left
       neighbour is the outlined My Portal and the correction is 11;
       on the portal bar the left neighbour is the cart, a bare
       glyph like the bell, and the correction is 0; below 1024 the
       labelled buttons leave the cluster and it is 0 again. So it
       is MEASURED at run time, on every resize, and never written
       down as a number anywhere.

       The rule is one sentence: the white you see on the left of
       the bell equals the white you see on its right. */
    function inkEdge(el, side) {
      /* Where a control visibly ENDS. A bare glyph ends at its
         drawing; anything with a border or a fill ends at its box. */
      var box = el.getBoundingClientRect();
      var cs = getComputedStyle(el);
      var drawn = cs.borderRightWidth !== '0px' || cs.borderLeftWidth !== '0px' ||
                  (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)');
      var svg = drawn ? null : el.querySelector('svg');
      var r = svg ? svg.getBoundingClientRect() : box;
      return side === 'right' ? r.right : r.left;
    }
    function visible(el) { return !!el && el.getClientRects().length > 0; }
    function alignBell(btn) {
      if (!btn || !btn.parentNode) return;
      btn.style.marginLeft = '';
      var kids = Array.prototype.filter.call(btn.parentNode.children, visible);
      var i = kids.indexOf(btn);
      var left = i > 0 ? kids[i - 1] : null;
      var right = i > -1 && i < kids.length - 1 ? kids[i + 1] : null;
      if (!left || !right) return;      /* nothing to be even with */
      var mine = btn.querySelector('svg');
      if (!mine) return;
      var seen = mine.getBoundingClientRect();
      var gapLeft  = seen.left - inkEdge(left, 'right');
      var gapRight = inkEdge(right, 'left') - seen.right;
      var add = Math.round(gapRight - gapLeft);
      if (add > 0) btn.style.marginLeft = add + 'px';
    }
    /* The cluster changes with the width (the labelled buttons leave
       it below 1024), so the correction is taken again whenever the
       bar might have changed shape, and once more when the fonts
       have landed — a button's width is type, and type arrives late
       (the same fix oro.js needed for its own measurements). */
    function realign() {
      var btn = document.querySelector('[data-gbhc-bell]');
      if (btn) alignBell(btn);
    }
    var alignTick = false;
    window.addEventListener('resize', function () {
      if (alignTick) return;
      alignTick = true;
      window.requestAnimationFrame(function () { alignTick = false; realign(); });
    }, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(realign);
    if (window.customElements && customElements.whenDefined &&
        /gb-site-header/.test(ENVIRONMENT.bellSlot || '')) {
      customElements.whenDefined('gb-site-header').then(forkTheBar);
    }
    forkTheBar();

    /* No page level door: the sticky bar's bell is THE way in
       (Ton, 09.09), so nothing on the canvas opens the drawer. */

    /* ============================================================
       2. THE DRAWER, FLOOR ONE AND FLOOR TWO
       ============================================================ */
    /* Ton, 09.09: Live chat leads, the meeting follows, the AI door is
       third and says AI out loud — a reader must never take it for a
       person. The AI door is also contextual: it only belongs where
       gifts are being chosen (portal gift pages, catalog), and is
       absent — not disabled — everywhere else. That is now a word on
       the environment, not a word in this file. */
    var AI_DOOR_HERE = ENVIRONMENT.aiDoor;
    var DOORS = [
      {
        /* THE ONE TINTED DISC, read off the reference. In the START
           popup only the live door is coloured (.gsp-door-icon--live):
           the other three keep the neutral disc, and gbppl-demo-polish-1
           took the paint off them on purpose. So one tint here too,
           and it is the same green the badge and the dot now carry. */
        id: 'live', icon: 'chat', tint: 'live',
        title: 'Live chat', badge: 'Online now',
        sub: 'Get help right now'
      },
      {
        id: 'meeting', icon: 'calendar',
        title: 'Book a meeting',
        sub: 'Pick a time that suits you'
      },
      {
        id: 'ai', icon: 'service-bell',
        title: 'AI Gift Concierge',
        sub: 'Instant answers from our AI assistant',
        hidden: !AI_DOOR_HERE
      },
      {
        id: 'call', icon: 'telephone',
        title: 'Call us',
        sub: 'Prefer to talk? ' + DESK.shown,
        href: 'tel:' + DESK.tel
      }
    ].filter(function (d) { return !d.hidden; });

    function doorHTML(d) {
      var tag = d.href ? 'a' : 'button';
      var attrs = d.href
        ? ' href="' + d.href + '"'
        : ' type="button"';
      return '<' + tag + ' class="gbhc-door" data-door="' + d.id + '"' + attrs + '>' +
        '<span class="gbhc-door__disc' + (d.tint ? ' gbhc-door__disc--' + d.tint : '') +
          '">' + glyph(d.icon, 22) + '</span>' +
        '<span class="gbhc-door__copy">' +
          '<span class="gbhc-door__title">' + d.title +
            (d.badge
              ? '<span class="gbhc-badge"><span class="gbhc-dot" aria-hidden="true"></span>' + d.badge + '</span>'
              : '') +
          '</span>' +
          '<span class="gbhc-door__sub">' + d.sub + '</span>' +
        '</span>' +
        '<span class="gbhc-door__go">' + glyph('chevron-right', 20) + '</span>' +
      '</' + tag + '>';
    }

    /* FLOOR TWO IS PORTAL ONLY. Ton, 09.09 13:51: the drawer is the
       same switchboard everywhere, but the personal Gift Advisor — a
       named human, his card, a message straight to him — belongs to
       the portal and to somebody signed in. Off the portal the floor
       DOES NOT EXIST: not disabled, not a stub, not an empty box with
       a promise in it. So the function returns nothing at all and the
       drawer is built one floor tall. */
    function floorTwoHTML() {
      if (!ENVIRONMENT.advisorFloor) return '';
      return '<div class="gbhc-floor2">' +
          /* The eyebrow is the live drawer's own line, word for word. */
          '<p class="gb-eyebrow">Want to connect now?</p>' +
          '<div class="gbhc-advisor" data-advisor>' +
            '<p class="gbhc-advisor__name">' + ADVISOR.name + '</p>' +
            '<div class="gbhc-advisor__rows">' +
              '<a class="gbhc-contact" href="mailto:' + ADVISOR.email + '">' +
                glyph('mail', 16) + ADVISOR.email + '</a>' +
              '<a class="gbhc-contact" href="tel:' + ADVISOR.tel + '">' +
                glyph('telephone', 16) + ADVISOR.phone + '</a>' +
            '</div>' +
            /* SCHEDULE A CALL is dead: the booking door upstairs is the
               same errand (concept, floor two). */
            '<button class="gb-btn gb-btn--medium gb-btn--outline gb-btn--secondary gb-btn--block gbhc-open" type="button" data-write>' +
              '<span class="gb-btn__label" data-pc-section="label">Send a message</span></button>' +
            '<div class="gbhc-grow"><div><div class="gbhc-note">' +
              '<div class="gba-inputwrap">' +
                '<textarea class="gba-input gba-textarea" id="gbhcNote" rows="2" ' +
                  'aria-label="Your message to ' + ADVISOR.name + '" ' +
                  'placeholder="Need help? Type your question here..."></textarea>' +
              '</div>' +
            /* Ton: the Send was the biggest thing in the card. It was
               already `medium`, which is the rung the house gives a
               confirm inside a drawer form (checkout carries fifteen of
               them at that size); what made it shout was --block. The
               checkout's own drawer confirms are NOT block — the four
               that are, are the page's single closing action — so the
               modifier goes and the button becomes the size of its
               word, standing at the end of the row it belongs to. */
              '<div class="gbhc-note__foot">' +
                '<button class="gb-btn gb-btn--medium gb-btn--filled gb-btn--primary gbhc-note__send" type="button" data-send>' +
                  '<span class="gb-btn__label" data-pc-section="label">Send</span></button>' +
              '</div>' +
            '</div></div></div>' +
          '</div>' +
        '</div>';
    }

    function homeHTML() {
      return '<div class="gbhc-body">' +
        '<div class="gbhc-doors">' + DOORS.map(doorHTML).join('') + '</div>' +
        floorTwoHTML() +
      '</div>';
    }

    function panel() { return document.querySelector('.gbd-panel'); }

    /* ============================================================
       THE LEVELS OF THE DRAWER          gbppl-concierge-levels-1
       ------------------------------------------------------------
       Ton, 09.09: «анимация вообще не работает: жму Book a Meeting —
       форма открывается сразу». It did open at once: drawer.open()
       swaps the body in one frame and the organism has no opinion
       about what happens inside it. So the module gives its own
       content a choreography, on its own containers, and the organism
       is not touched: open() is called ONCE, to bring the surface in;
       every level after that is a swap inside .gbd-body that this
       code owns.

       THE SPATIAL LOGIC IS THE DRAWER'S OWN. The panel lives on the
       right and travels from the right, so going DEEPER brings the
       new level in from the right and pushes the old one out to the
       left; coming BACK reverses both. Arriving is --mo-small on
       --mo-arrive, leaving is --mo-small-out on --mo-exit: the old
       level is gone before the new one has finished, which is the
       same overlap the relay uses.

       The title and the arrow change WITH the ride and not before it:
       setTitle and setBack are called at the same moment the level
       starts moving, so nothing in the head jumps ahead of the body.
       ============================================================ */
    function levels() { var p = panel(); return p ? p.querySelector('.gbhc-levels') : null; }

    /* THE RIDE TAKES A NODE, NOT A STRING, and that distinction is
       the whole of the calendar fix. A level that is built here and
       now starts empty and fills up while it travels; a level that
       was assembled off stage is ALREADY WHOLE and only has to be
       let out of the wings. Both roads end in this function, and it
       never rebuilds what it is given. */
    function goLevelWith(next, dir, title, back) {
      var box = levels();
      if (!box || !next) return;
      var old = null;
      Array.prototype.forEach.call(box.children, function (c) {
        if (c !== next && c.classList.contains('gbhc-level')) old = c;
      });
      /* THE START OF A RIDE IS NOT PART OF THE RIDE, and that is what
         went wrong the first time. The level standing in the wings is
         already at opacity 1; putting the start state on it with the
         clock running made the browser ANIMATE INTO the start — it
         read as a level fading out, then snapping back, and by the
         time anything looked it was home again (measured: the class
         said from-right while the computed opacity was 0.798 and
         falling). So the start state is applied with no clock at all,
         one frame is allowed to paint it, and the ride begins on the
         next. The same two-step the morph uses. */
      next.classList.add('gbhc-level--nomo',
        dir === 'back' ? 'gbhc-level--from-left' : 'gbhc-level--from-right');
      next.classList.remove('gbhc-offstage');
      window.requestAnimationFrame(function () {
        next.classList.remove('gbhc-level--nomo');
        window.requestAnimationFrame(function () {
          /* the head turns at the same instant the body starts moving */
          drawer.setTitle(title);
          drawer.setBack(back || null);
          next.classList.remove('gbhc-level--from-left', 'gbhc-level--from-right');
          if (old) {
            old.classList.add(dir === 'back' ? 'gbhc-level--to-right' : 'gbhc-level--to-left');
            window.setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, MO.small);
          }
        });
      });
    }

    function goLevel(dir, title, back, html, after) {
      var box = levels();
      if (!box) return;
      var next = document.createElement('div');
      next.className = 'gbhc-level gbhc-offstage';
      next.innerHTML = html;
      box.appendChild(next);
      if (after) after(next);
      goLevelWith(next, dir, title, back);
    }

    function openHome() {
      var p = panel();
      /* Already open on another level: this is a step back, not a door. */
      if (p && levels() && p.classList.contains('is-open')) {
        goLevel('back', 'Talk to us', null, homeHTML());
        return;
      }
      drawer.open({
        title: 'Talk to us',
        html: '<div class="gbhc-levels"><div class="gbhc-level">' + homeHTML() + '</div></div>'
      });
      drawer.setBack(null);
      wireHome();
    }

    /* THE PANEL OUTLIVES ITS CONTENT. drawer.js builds .gbd-panel once
       and puts it on document.body; every open() only swaps the body
       inside it. A listener added per open would therefore be added
       again on every trip Home -> Meeting -> Home, and the second trip
       would fire everything twice. So the delegate is fitted ONCE, to
       the panel, and it works for whatever markup is standing in it. */
    var homeWired = false;
    function wireHome() {
      var p = panel();
      if (!p || homeWired) return;
      homeWired = true;
      p.addEventListener('click', function (e) {
        var door = e.target.closest ? e.target.closest('.gbhc-door') : null;
        if (door) {
          var id = door.getAttribute('data-door');
          if (id === 'meeting') { e.preventDefault(); openMeeting(door); return; }
          if (id === 'live' || id === 'ai') { e.preventDefault(); relay(id, door); return; }
          return;   /* Call us is an <a href="tel:"> and stays one */
        }
        var write = e.target.closest ? e.target.closest('[data-write]') : null;
        if (write) {
          var card = p.querySelector('[data-advisor]');
          if (!card) return;          /* off the portal there is no floor two to write on */
          card.classList.add('is-writing');
          var note = p.querySelector('#gbhcNote');
          if (note) setTimeout(function () { note.focus(); }, 80);
          return;
        }
        var send = e.target.closest ? e.target.closest('[data-send]') : null;
        if (send) {
          /* Nothing leaves the browser: this is a prototype, and the
             one honest thing it can do is say so and close. */
          drawer.close();
        }
      });
    }

    /* ---- FLOOR TWO: THE BOOKING ORGANISM ----------------------
       Ton, 09.09: «выбор времени у нас расположен вертикально ПОД
       выбором даты». That is the organism's DEFAULT column, and it
       is the reason layout="compact" is deliberately absent: compact
       is the modifier that stands the slots BESIDE the calendar from
       520px of host. In this drawer the host is 472 at 1280 and the
       organism's own container query gives the 32 quarter hour chips
       their scrolling zone, so the panel does not grow to 1100.

       start="slot": two notches, «Pick a time» then «Confirmed», and
       the confirmation is the organism's own third screen at the same
       level, exactly as the concept asked. The back arrow of the head
       stays on both screens and goes home to the options.
       ------------------------------------------------------------ */
    /* THE CALENDAR IS BUILT BEFORE THE LEVEL MOVES. Ton, same
       sentence: «календарь появляется с задержкой». The booking
       organism upgrades and lays itself out on its own clock, so a
       level that carried it started travelling with an empty box and
       the calendar flashed in halfway. The cure is not a skeleton
       standing in for it: the level is assembled OFF STAGE — built,
       laid out, its grid measured, the fonts landed — and only a
       finished level is asked to move. Nothing is invented to look
       at while waiting, because nothing is waiting on screen. */
    /* AND THE CAP IS A CLOCK, NOT A COUNT OF FRAMES (gbppl-concierge-
       check-1, 10.09). The line above says «the cap is a second» and
       it meant it; sixty animation frames only ARE a second on a 60Hz
       screen. Measured on a 166Hz display: sixty frames run out at
       368ms, the booking organism's own adapter answers at 420 and the
       grid gets its height at 487 — so the cap fired first, the level
       set off with an empty box, and «календарь появляется с
       задержкой» came straight back on exactly the machines nobody
       tests on. The wait it is protecting against is measured in
       milliseconds of a person's patience, so it is written in them.
       Родня ловушки 27: the measuring machine's display is not the
       world's, and here it reached inside the product. */
    function now() { return window.performance ? performance.now() : Date.now(); }
    function whenBuilt(host, done) {
      var deadline = now() + 1000, fonts = !(document.fonts && document.fonts.ready);
      if (!fonts) document.fonts.ready.then(function () { fonts = true; });
      /* The poll starts NOW and the fonts are a condition inside it, not
         a gate in front of it: waiting for the font promise before even
         looking added a whole frame of nothing to every trip. The cap
         is a second, because a level that will not build is still a
         level the guest asked for and must be shown. */
      var look = function () {
        var grid = host.querySelector('.gbb-cal-grid');
        var ready = fonts && grid && grid.getBoundingClientRect().height > 0;
        if (ready || now() > deadline) { done(); return; }
        window.requestAnimationFrame(look);
      };
      look();
    }

    function bookingHTML() {
      return '<gb-booking-flow id="gbhcBooking" start="slot"' +
              ' guest-name="Anton Parkhomenko"' +
              ' guest-email="anton@gildedbox-demo.com"' +
              ' guest-company="GildedBox"' +
              ' site-href="' + ENVIRONMENT.siteHref + '"' +
              ' exit-label="Back to the options"></gb-booking-flow>';
    }

    function openMeeting(row) {
      var box = levels();
      if (!box) return;
      /* THE CLICK IS ANSWERED AT ONCE even though the level cannot be.
         Assembling the calendar off stage costs real milliseconds, and
         a row that does nothing while it happens is the same silence
         the relay was built to remove. So the row lights the moment it
         is hit, exactly as the doors into the chat do, and it stays lit
         until its level walks on. */
      if (row) row.classList.add('is-chosen');
      /* Off stage: in the panel, so it has a real width to lay out in,
         but not on the ride and not readable until it is whole. */
      var stage = document.createElement('div');
      stage.className = 'gbhc-level gbhc-offstage';
      stage.innerHTML = bookingHTML();
      box.appendChild(stage);
      wireBooking(stage);
      /* When the organism has laid its calendar out, THAT VERY NODE
         walks on. Building a second one here would hand the ride an
         empty box again and the flash would come straight back. */
      whenBuilt(stage, function () {
        if (row) row.classList.remove('is-chosen');
        goLevelWith(stage, 'forward', 'Book a meeting', openHome);
      });
    }

    function wireBooking(level) {
      var flow = level.querySelector('#gbhcBooking');
      if (!flow) return;
      /* The quiet exit of the last screen means «go back» inside a
         panel, not «leave the site»: the organism made that the
         host's business (gbb:exit is cancelable). */
      flow.addEventListener('gbb:exit', function (e) { e.preventDefault(); openHome(); });
    }

    /* ============================================================
       3. THE CONVERSATION
       ------------------------------------------------------------
       ONE WINDOW, TWO STARTS (the concept's strong unification): the
       AI concierge and the live chat are the same object with a
       different first message and a different name in the head.
       ============================================================ */
    /* THE LIVE START IS THE REFERENCE, WORD FOR WORD. Title, meta,
       both lines of the greeting card, all three chips, the
       placeholder and the quiet line are read off
       live/portal.html?layout=band&hero=start and not rewritten. The
       advisor's own name has not gone anywhere: it is on floor two of
       the drawer, where a named account manager belongs. The chat is
       «our team», which is what the reference calls it and what is
       true of a queue nobody has been assigned out of yet.

       THE AI START IS THE SAME SHAPE WITH THE OPPOSITE CONTENT. Ton's
       law stands over every line of it: a reader must never take this
       voice for a person, so the meta, the greeting and above all the
       quiet line say the opposite of the reference's. The chips
       cannot be carried across as words — an assistant is not asked
       about an existing order — so they are the same three ERRANDS in
       the AI's own language, and the third one is the way out to a
       human, which the AI must always offer. */
    var STARTS = {
      live: {
        icon: 'chat',
        name: 'Chat with our team',
        presence: true,
        /* THE PLATE SPEAKS SHORTER THAN THE HEAD. The inset is a third
           of a 380 plate and the status shares it with a name; the
           window's own head has the room for the long form and keeps
           it. Both of these were measured against the inset, not
           guessed: see the note on the inset proportion. */
        pillName: 'GildedBox',      /* «GildedBox team» was measured and it is cut at 360; the brand alone over «Online» says the same thing in the room the inset has */
        pill: 'Online',
        placeholder: 'Message a gifting specialist...',
        hint: 'You’re chatting with a real member of the GildedBox team.',
        say: ['Hi. You’re chatting with a GildedBox gifting specialist.\nHow can I help today?'],
        chips: ['I need help choosing gifts',
                'I have an existing order',
                'I’d like a custom proposal'],
        /* THE PERSON ARRIVES WHEN A PERSON ARRIVES (the Tiffany
           mechanic, concept line 55, Ton 09.09). The room opens
           unnamed, because at that moment nobody has picked the
           conversation up; the name lands in the head and on the
           plate at the exact turn a specialist joins, and the thread
           says so in its own quiet line. Nothing is promised before
           it is true. The AI start has no `join` at all, and that is
           the difference stated as data rather than as an if. */
        join: {
          line: 'Brad Smaling joined the chat.',
          name: 'Brad Smaling',
          pillName: 'Brad Smaling',
          pill: 'Online'
        },
        turns: [
          { say: 'Got it, I can help with that.' },
          /* Turn two asks, and the choices come WITH the question. */
          { say: 'What’s the occasion?',
            ask: ['A client thank you', 'An onboarding gift', 'A holiday send'] },
          { say: 'Understood. I am putting a shortlist together and will send it over in a moment.' }
        ]
      },
      ai: {
        icon: 'service-bell',
        /* Ton, 09.09: the window says AI as loudly as the door does —
           a reader must never take this voice for a person. */
        name: 'AI Gift Concierge',
        presence: false,
        pillName: 'AI Concierge',
        pill: 'AI assistant',
        placeholder: 'Ask the AI concierge...',
        hint: 'You’re chatting with an AI assistant, not a member of the GildedBox team.',
        say: ['Hi. You’re chatting with the GildedBox AI concierge, which is software and not a person.\nTell me who the gift is for and what the occasion is, and I will put a shortlist together.'],
        chips: ['Help me choose a gift',
                'What fits a set budget?',
                'Hand me to a real person'],
        /* No join, ever. Nobody is going to walk into this room, and
           the head must not one day say a name. */
        turns: [
          { say: 'Thank you. Let me narrow that down.' },
          { say: 'What’s the occasion?',
            ask: ['A client thank you', 'An onboarding gift', 'A holiday send'] },
          { say: 'Understood. I am pulling a shortlist together, and I can hand you to a live specialist at any point.' }
        ]
      }
    };

    var chat = document.getElementById('gbhcChat');
    var pill = document.getElementById('gbhcPill');
    var log = document.getElementById('gbhcLog');
    var input = document.getElementById('gbhcInput');
    var mode = null;
    var replyTimer = null;

    /* THE ORGANISM'S OWN ARROW, character for character (drawer.js
       GLYPH_BACK). The record has a chevron-left of its own and it is
       drawn on the same grid, but the arrow beside a drawer title and
       the arrow beside a chat title must be the SAME arrow, and the
       one the reader already knows is the drawer's. */
    document.getElementById('gbhcBack').innerHTML =
      '<span class="gb-btn__icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M15 5l-7 7 7 7"/></svg></span>';
    document.getElementById('gbhcMin').innerHTML =
      '<span class="gb-btn__icon" aria-hidden="true">' + (I ? I.svg('chevron-down') : '') + '</span>';
    document.getElementById('gbhcEnd').innerHTML =
      '<span class="gb-btn__icon" aria-hidden="true">' + (I ? I.svg('close') : '') + '</span>';
    document.getElementById('gbhcPillEnd').innerHTML =
      '<span class="gb-btn__icon" aria-hidden="true">' + (I ? I.svg('close') : '') + '</span>';
    var send = document.getElementById('gbhcSend');
    var chips = document.getElementById('gbhcChips');
    var hint = document.getElementById('gbhcHint');
    send.innerHTML = glyph('arrow-right', 20);

    var pillLast = document.getElementById('gbhcPillLast');

    /* The face of the speaker, the reference's own 24px glyph in its
       own 40px disc. Ours is drawn out of the icon record by name,
       and its colours are the disc this file already draws twice. */
    function faceHTML() {
      return '<span class="gbhc-msg__face" aria-hidden="true">' + glyph('chat', 24) + '</span>';
    }

    /* ConciergeChatBubble of the reference: the face rides only on the
       agent's side, and the text is split on newlines into one <p>
       each, so the greeting is one card of two paragraphs and not two
       cards. textContent per line, never innerHTML: a guest types
       here. */
    function say(side, text, ask) {
      var row = document.createElement('article');
      row.className = 'gbhc-msg gbhc-msg--' + side;
      if (side === 'them') row.innerHTML = faceHTML();
      var stack = document.createElement('div');
      stack.className = 'gbhc-msg__stack';
      var bubble = document.createElement('div');
      bubble.className = 'gbhc-msg__bubble';
      text.split('\n').forEach(function (line) {
        var p = document.createElement('p');
        p.textContent = line;
        bubble.appendChild(p);
      });
      stack.appendChild(bubble);
      /* The answer sheet, if the question came with one. It is part
         of the message and lives inside it, so it scrolls with the
         thread and dies with it. */
      if (ask && ask.length) {
        var sheet = document.createElement('div');
        sheet.className = 'gbhc-chips gbhc-msg__ask';
        sheet.setAttribute('data-ask', '');
        sheet.setAttribute('aria-label', 'Answers');
        ask.forEach(function (label) {
          var b = document.createElement('button');
          b.type = 'button';
          b.textContent = label;
          sheet.appendChild(b);
        });
        stack.appendChild(sheet);
      }
      row.appendChild(stack);
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
      /* THE PLATE SAYS SOMETHING ONLY WHEN THERE IS SOMETHING TO
         SAY. A permanent echo of the last line was noise by the
         house's own law, and a clipped echo of a greeting nobody had
         answered was worse. So the plate carries a line in ONE case:
         an answer arrived while the window was down. Then it widens
         under it, which is the signal; opening it again makes it
         short. Anything the guest said themselves is never echoed —
         they know what they wrote. */
      if (side === 'them' && chat.hidden && !pill.hidden) {
        pillLast.textContent = text.split('\n').join(' ');
        pill.classList.add('is-unread');
      }
    }

    /* ---- THE CHIPS --------------------------------------------
       In the reference they stand for the life of the conversation
       and are only disabled while the specialist is typing. HERE
       THEY LEAVE after the first thing the guest says, and that is a
       deliberate divergence with a measurement behind it: the
       reference's surface is a 748 panel with the composer pinned to
       its floor and room to spare, and this window, at 360 wide,
       spends three rows and 120px on three chips that have already
       done their job. They are an opening, not a menu. Reported to
       Ton as a divergence rather than taken quietly.
       While a reply is pending they are disabled, which IS the
       reference, and it is the same latch as the field. */
    function paintChips(list) {
      chips.innerHTML = '';
      (list || []).forEach(function (label) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = label;
        chips.appendChild(b);
      });
      chips.hidden = !(list || []).length;
    }

    /* The field is dead while the other side is typing, and so is
       every chip. Both halves of the latch are set here and cleared
       here, in one place, in both directions (trap 22). */
    var pending = false;
    var turn = 0;              /* which scripted answer is next */
    var joinTimer = null;
    function syncSend() {
      send.disabled = pending || !input.value.trim();
    }
    function setPending(on) {
      pending = on;
      input.disabled = on;
      var all = chips.querySelectorAll('button');
      for (var i = 0; i < all.length; i++) all[i].disabled = on;
      syncSend();
    }
    function typingRow() {
      var row = document.createElement('article');
      row.className = 'gbhc-msg gbhc-msg--them gbhc-msg--typing';
      row.setAttribute('role', 'status');
      row.setAttribute('aria-label', 'Typing');
      row.innerHTML = faceHTML() +
        '<div class="gbhc-msg__stack"><div class="gbhc-msg__bubble">' +
        '<span></span><span></span><span></span></div></div>';
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
      return row;
    }

    /* The room says a thing about itself. Not a voice, so not a
       bubble, and it never reaches the plate. */
    function note(text) {
      var p = document.createElement('p');
      p.className = 'gbhc-sys';
      p.setAttribute('role', 'status');
      p.textContent = text;
      log.appendChild(p);
      log.scrollTop = log.scrollHeight;
    }

    /* A question is answered once. Every answer sheet standing in the
       thread leaves the moment anything is said, whether it was
       tapped or typed: a list of answers under a question that has
       already been answered is a list that lies. */
    function closeAsks() {
      var open = log.querySelectorAll('[data-ask]');
      for (var i = 0; i < open.length; i++) {
        (function (sheet) {
          sheet.removeAttribute('data-ask');
          var all = sheet.querySelectorAll('button');
          for (var k = 0; k < all.length; k++) all[k].disabled = true;
          sheet.classList.add('is-out');
          setTimeout(function () { if (sheet.parentNode) sheet.parentNode.removeChild(sheet); }, MO.smallOut);
        })(open[i]);
      }
    }

    /* THE PERSON ARRIVES. The head and the plate are re-dressed at
       the one moment it becomes true, and never before. */
    var joined = false;
    function joinNow(join) {
      joined = true;
      note(join.line);
      /* THE NAME IS THE ANSWER. Until somebody picks the conversation
         up the head says «Chat with our team»; the moment one does, it
         says who. There is no line under it explaining that a person
         is a person. */
      document.getElementById('gbhcName').textContent = join.name;
      document.getElementById('gbhcPillName').textContent = join.pillName;
    }

    /* ============================================================
       THE TWO RIDES
       ------------------------------------------------------------
       riseChat  — the end of the relay: the window comes up out of
                   the corner while the drawer is still leaving.
       minimise / expand — the morph: one plate becomes the other by
                   changing its height onto the other's rectangle.
       Only one of them may be in the air at a time; `busy` is the
       latch, and every path clears it (trap 22's rule, applied to a
       ride rather than to a request).
       ============================================================ */
    var busy = false;
    var rideTimer = null;

    function dress(which) {
      var start = STARTS[which];
      if (mode === which) return start;
      mode = which;
      log.innerHTML = '';
      clearTimeout(replyTimer);
      document.getElementById('gbhcName').textContent = start.name;
      /* PRESENCE IS ONE DOT, AND ONLY WHERE PRESENCE IS A FACT. Ton,
         09.09: «в online now вместо a real person должно быть ИМЯ»,
         and after that the second line had nothing left to say. So
         the head carries the subject and a dot, and nothing else. The
         AI has no dot: nobody is there, the name already says AI, and
         a green light beside it would be the one lie in the room. */
      document.getElementById('gbhcPresence').hidden = !start.presence;
      document.getElementById('gbhcPillName').textContent = start.pillName;
      document.getElementById('gbhcPillDot').hidden = !start.presence;
      input.placeholder = start.placeholder;
      input.setAttribute('aria-label', start.placeholder.replace('...', ''));
      hint.textContent = start.hint;
      paintChips(start.chips);
      input.value = '';
      joined = false;
      turn = 0;
      setPending(false);
      start.say.forEach(function (line) { say('them', line); });
      /* THE SPECIALIST PICKS IT UP AT ONCE. Ton: «не хватает имени».
         The generic subject was honest but it was the whole of what
         the head ever said, because the join was waiting for the
         guest to speak first. It waits for nothing now: the greeting
         lands, the dots run, and within a beat somebody has the
         conversation and the head and the plate carry their name.
         «Chat with our team» is the moment before that, and it is
         supposed to be a moment.

         NO TOKEN: 1200ms of waiting is not a move, the same reason
         the scripted answer's 900 is not one. */
      if (start.join) {
        var wait = typingRow();
        clearTimeout(joinTimer);
        joinTimer = setTimeout(function () {
          if (wait.parentNode) wait.parentNode.removeChild(wait);
          if (mode === which && !joined) joinNow(start.join);
        }, 1200);
      }
      return start;
    }

    function riseChat(which) {
      dress(which);
      /* THE WINDOW IS THE READING OF THE PLATE, whichever road brought
         it up (gbppl-concierge-check-1, 10.09). expand() clears the
         unread mark because the plate was tapped; coming back through
         the bell and the Live chat door left it set, and the NEXT
         minimise showed a wide plate quoting a line the guest had
         already read. The plate's own rule is that it says something
         in one case only — an answer arrived while the window was
         down — and a stale echo breaks it. One place to clear it is
         wrong; both places are the window coming up. */
      pill.classList.remove('is-unread');
      pillLast.textContent = '';
      pill.hidden = true;
      chat.hidden = false;
      chat.classList.remove('is-in', 'is-morph', 'is-shut', 'is-nomo');
      chat.style.width = '';
      chat.style.height = '';
      void chat.offsetWidth;
      chat.classList.add('is-in');
      setTimeout(function () { input.focus(); }, MO.smallOut);
    }

    /* ---- THE RELAY, drawer -> window --------------------------
       Three beats, and the third begins before the second has
       finished, which is the whole point of it.

         1  the row says it was the one that was hit  (--mo-micro)
         2  the drawer leaves on its own exit         (--mo-medium-out)
         3  HALF WAY through beat 2, the window rises (--mo-medium)

       The half is not a new duration and is not on the scale: it is
       a POINT INSIDE a rung, read off --mo-medium-out at run time,
       and there is nothing on the motion scale that could name it
       without inventing a clock. NO TOKEN, and the reason it is
       half and not a rung is that a rung would either land before
       the drawer has moved (--mo-small-out) or after it has gone
       (--mo-small, 280 of 350) and the overlap Ton asked for would
       be a queue again.

       ONE SCRIM FOR THE WHOLE RELAY. The drawer's own backdrop is
       never closed and reopened here: drawer.close() is called once
       and the scrim fades on its 350 while the window is already on
       its way up. Nothing dims a second time, so there is nothing
       to blink. */
    function relay(id, row) {
      if (busy) return;
      busy = true;
      if (row) row.classList.add('is-chosen');
      setTimeout(function () {
        drawer.close();
        setTimeout(function () {
          if (row) row.classList.remove('is-chosen');
          riseChat(id);
          busy = false;
        }, MO.mediumOut / 2);
      }, MO.micro);
    }

    /* ---- THE MORPH, window -> pill ----------------------------
       The pill is unhidden FIRST and measured where it will stand,
       so the window is given a real destination rather than a
       number somebody typed. It waits there, behind the window,
       fully drawn, for the whole ride. */
    function box(el) { var r = el.getBoundingClientRect(); return { w: r.width, h: r.height }; }
    function setBox(el, b) { el.style.width = b.w + 'px'; el.style.height = b.h + 'px'; }
    function clearBox(el) { el.style.width = ''; el.style.height = ''; }

    function minimise() {
      if (busy) return;
      busy = true;
      chat.classList.remove('is-in');            /* the entrance animation must not own the frame */
      var from = box(chat);
      pill.hidden = false;
      var to = box(pill);                        /* a real destination, measured where it will stand */
      setBox(chat, from);
      chat.classList.add('is-morph');
      void chat.offsetHeight;                    /* the baseline of every transition on the frame */
      chat.classList.add('is-shut');             /* the content leaves on --mo-small-out */
      setBox(chat, to);                          /* the frame leaves on --mo-small, both axes */
      clearTimeout(rideTimer);
      rideTimer = setTimeout(function () {
        chat.hidden = true;
        chat.classList.remove('is-morph', 'is-shut');
        clearBox(chat);
        busy = false;
      }, MO.small);
    }

    /* ---- THE MORPH, pill -> window ----------------------------
       The same ride read backwards. The window is placed ON the
       pill's rectangle with the clocks off, so nothing is seen
       jumping there, and only then is it asked to grow. */
    function expand() {
      if (busy || !mode) return;
      busy = true;
      var from = box(pill);
      chat.hidden = false;
      chat.classList.add('is-nomo', 'is-morph', 'is-shut');
      clearBox(chat);
      var to = box(chat);                        /* the natural frame, already clipped by max-width and max-height */
      setBox(chat, from);
      void chat.offsetHeight;
      chat.classList.remove('is-nomo');
      void chat.offsetHeight;
      chat.classList.remove('is-shut');
      setBox(chat, to);
      clearTimeout(rideTimer);
      rideTimer = setTimeout(function () {
        chat.classList.remove('is-morph');
        clearBox(chat);
        pill.hidden = true;
        pill.classList.remove('is-unread');   /* it has been read */
        pillLast.textContent = '';
        busy = false;
        input.focus();
      }, MO.small);
    }

    /* THE CROSS ENDS THE SESSION, and the screen is clean: no window,
       no pill, nothing floating anywhere. Next time the door is used
       the conversation starts again from its greeting. */
    /* A conversation worth confirming is one the guest has spoken in.
       A window holding nothing but the greeting has nothing to lose,
       and asking about it would be a ceremony over an empty room. */
    function hasConversation() { return !!log.querySelector('.gbhc-msg--you'); }
    function askToEnd(on) {
      var bar = document.getElementById('gbhcConfirm');
      if (!bar) return;
      bar.hidden = !on;
      if (on) { var k = bar.querySelector('[data-keep]'); if (k) k.focus(); }
    }
    function confirmOpen() {
      var bar = document.getElementById('gbhcConfirm');
      return !!bar && !bar.hidden;
    }
    function tryEnd() {
      if (!hasConversation()) { endSession(); return; }
      askToEnd(true);
    }

    function endSession() {
      clearTimeout(joinTimer);
      askToEnd(false);
      clearTimeout(replyTimer);
      clearTimeout(rideTimer);
      busy = false;
      chat.hidden = true;
      chat.classList.remove('is-in', 'is-morph', 'is-shut', 'is-nomo');
      clearBox(chat);
      pill.hidden = true;
      pill.classList.remove('is-unread');
      mode = null;
      log.innerHTML = '';
      pillLast.textContent = '';
      input.value = '';
      joined = false;
      turn = 0;
      setPending(false);
    }

    /* ---- THE WAY BACK ------------------------------------------
       Ton, 09.09: «есть закрыть и свернуть, а вернуться назад нет —
       конфуз». The arrow does BOTH halves of what going back means
       here, and the order matters: the conversation is not ended and
       not thrown away, it MORPHS INTO THE PLATE exactly as the
       minimise does, and the switchboard opens over it. The thread is
       alive, the plate is on screen holding it, and the options are
       in front of you. Esc inside the window is the same gesture,
       because Esc has meant «up one level» in this house since the
       drawer's own ladder.

       The plate is what makes this honest. Without it, going back
       would look like the chat was closed. */
    function backToOptions() {
      if (!mode) return;
      minimise();
      openHome();
    }
    document.getElementById('gbhcBack').addEventListener('click', backToOptions);
    chat.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      /* With the question standing, Escape answers it and nothing
         else: the quiet way out of being asked is «keep chatting». */
      if (confirmOpen()) { e.stopPropagation(); askToEnd(false); input.focus(); return; }
      /* AND IT STOPS HERE. The drawer organism listens for Escape on
         the document and closes itself; without this the switchboard
         we are opening would be shut again by the same keystroke,
         inside the same tick. The gesture belongs to the window it
         was pressed in. */
      e.stopPropagation();
      backToOptions();
    });
    document.getElementById('gbhcMin').addEventListener('click', function () {
      askToEnd(false);
      minimise();
    });
    document.getElementById('gbhcEnd').addEventListener('click', tryEnd);
    /* THE PLATE'S CROSS ASKS IN THE WINDOW. Confirming something you
       cannot see is not confirming, so the cross on a minimised chat
       brings the window back up with the question already standing in
       it. An empty thread still closes without a word. */
    document.getElementById('gbhcPillEnd').addEventListener('click', function () {
      if (!hasConversation()) { endSession(); return; }
      expand();
      window.setTimeout(function () { askToEnd(true); }, MO.small);
    });
    document.getElementById('gbhcPillOpen').addEventListener('click', expand);
    chat.addEventListener('click', function (e) {
      if (!e.target.closest) return;
      if (e.target.closest('[data-keep]')) { askToEnd(false); input.focus(); return; }
      if (e.target.closest('[data-endnow]')) { endSession(); }
    });

    /* ---- ONE WAY IN AND OUT FOR EVERY MESSAGE -----------------
       The typed line and the tapped chip are the same errand and go
       through the same door, which is how the reference has it and
       is also the only way the latch can be trusted. */
    function send_(value) {
      var text = (value || '').trim();
      var start = STARTS[mode];
      if (!text || pending || !start) return;
      closeAsks();                 /* the question in the thread is answered, whichever way */
      say('you', text);
      input.value = '';
      /* The opening is over: the routing chips have done their job. */
      paintChips(null);
      setPending(true);
      var typing = typingRow();
      var step = start.turns[Math.min(turn, start.turns.length - 1)];
      turn++;
      clearTimeout(replyTimer);
      /* The scripted answer, so the thread reads as a thread. NO
         TOKEN: 900ms of waiting is not a move, and the motion scale
         holds the length of moves. The latch is dropped in the same
         place it was set, and there is no other path out of it. */
      replyTimer = setTimeout(function () {
        if (typing.parentNode) typing.parentNode.removeChild(typing);
        say('them', step.say, step.ask);
        setPending(false);
        if (!chat.hidden) input.focus();
      }, 900);
    }

    input.addEventListener('input', syncSend);
    document.getElementById('gbhcForm').addEventListener('submit', function (e) {
      e.preventDefault();
      send_(input.value);
    });
    chips.addEventListener('click', function (e) {
      var chip = e.target.closest ? e.target.closest('button') : null;
      if (!chip || chip.disabled) return;
      send_(chip.textContent);
    });
    /* The answer sheets live in the thread, and the thread is
       rewritten on every turn, so the listener sits on the log once
       and reads whatever is standing in it (the same reason the
       drawer's delegate is fitted to the panel and not to a body). */
    log.addEventListener('click', function (e) {
      var chip = e.target.closest ? e.target.closest('.gbhc-msg__ask button') : null;
      if (!chip || chip.disabled) return;
      send_(chip.textContent);
    });

    /* ---- THE ONE CONSOLE --------------------------------------
       The accent of the plate belongs to the plate, so the module
       declares its own row rather than asking each page to do it. A
       page that does not want the row says panelRow: false. */
    if (ENVIRONMENT.panelRow) {
      var spanel = document.querySelector('gb-studio-panel');
      if (spanel && typeof spanel.addGroup === 'function') {
        spanel.addGroup({
          type: 'choice',
          title: 'Accent of the session plate',
          value: readAccent(),
          options: [
            { label: 'Blue', value: 'blue',
              note: 'Blue 600, the house colour of state and action. Nothing new is spent.' },
            { label: 'Gold', value: 'gold',
              note: 'The gold of the Beta chip in the bar, #bea042. It is a token, and it is under the standing veto on gold in the interface.' }
          ],
          onChange: function (v) { setAccent(v, true); }
        });
      }
    }

    /* ---- ONE EXPERIENCE, TWO ENVIRONMENTS ---------------------
       Ton, 09.09, showing Valerie: the help experience is the same on
       the website and inside the portal. The row is the proof she can
       click: the same drawer, the same chat, the same plate, two very
       different pages under them. */
    var envs = ENVIRONMENT.environments;
    if (envs && envs.here) {
      var sp2 = document.querySelector('gb-studio-panel');
      if (sp2 && typeof sp2.addGroup === 'function') {
        sp2.addGroup({
          type: 'choice',
          title: 'Environment',
          value: envs.here,
          options: [
            { label: 'Website', value: 'website',
              note: 'The public site. The drawer has one floor: the personal Gift Advisor is not offered outside the portal.' },
            { label: 'Portal',  value: 'portal',
              note: 'Signed in. The same drawer, and under the options the named Gift Advisor, which exists only here.' }
          ],
          onChange: function (v) {
            var to = v === 'portal' ? envs.portal : envs.website;
            if (!to || v === envs.here) return;
            /* The accent travels: it is what Ton is choosing between,
               and a switch of environment that resets it would make
               the two look different for the wrong reason. */
            var u = new URL(to, location.href);
            u.searchParams.set('accent', readAccent());
            location.href = u.toString();
          }
        });
      }
    }

    openDrawerFn = openHome;
  }

  var API = {
    mounted: false,
    mount: mount,
    /* The portal's own blue START button opens THIS, in place of the
       popup it used to open. One switchboard, two environments. */
    open: function () { if (openDrawerFn) openDrawerFn(); }
  };
  window.GbConcierge = API;
})();
