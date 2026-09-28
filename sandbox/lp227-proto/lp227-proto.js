/* ============================================================
   gbppl-lp227-glue-1 (28.09): the flow of the Start 227 prototype,
   one path glued from existing parts (see the head of index.html).
   (gbppl-lp227-proto-1, 25.09: the next landing, our own reading
   screen, the two designs and saved screens are gone.)

   One page, screens switched without a reload. The address carries
   the state, so the browser back button walks the flow:
     ?s=landing|reading|gift|more|order
     ?g=<design>       the design on the scene (fc = Fully Charged)
     ?mine=<id,id>     designs kept besides the first one
     ?r=craft          the short reading of a second pick
     ?dr=designs|personalize|meeting   the open drawer
     ?dr=more          diy: the six more, one level up (the overlay)
   Old keys of proto-1 keep reading (links never break):
     s=hero|two|saved -> gift, gift=<id> -> g, sheet=1 -> more.

   THE READING is CustomizerPrototype.tsx one to one: brandFrames
   (five titles, five kinds), a frame every 1150ms, the next step
   1300ms after the last, progress [6, 10, 22, 34, 44]% with the
   600ms width transition of .live-brand-progress span. The React
   state (brandFrame) is a timer here; nothing else differs.
   The second pick plays only the last frame, 1500ms (brief).

   gbppl-lp227-landing-variants-1 (28.09): ?land=choice|diy picks the
   landing after the reading (Ton: «предлагаем оба»). choice = the
   live product page 906 (two radio cards, START DESIGNING: «Design it
   yourself» to the personalize drawer, «Designed for you» to the
   meeting drawer); diy = the customizer's Your Design step (NEXT to
   personalize, HELP WITH MY DESIGN to the meeting, six more gifts in
   its own row, a pick replays the craft frame over it). Old keys
   keep reading; no land key = choice.

   gbppl-lp227-diy-more-overlay-1 (28.09). Ton: «Наша задача разгрузить
   правую панель... Мы открываем ещё один уровень оверлея, так же как
   открываем каталог на портале, только без категорий, без фильтров и
   всего 6 гифтов 3×2». The diy row is gone; the link .lpc-more
   [data-more-open] opens live/catalog-overlay.js (the portal's door),
   which frames THIS page at ?s=more&studio=embedded. In the frame the
   page is in LAYER MODE: only the screen «six more», no history of
   its own; a pick and a close travel to the parent by postMessage
   ({type:'lp227-pick', id} and the overlay's own 'gb-close-catalog'),
   the parent tells the frame which gift is on the scene
   ({type:'lp227-current', g}). The open layer is ?dr=more, pushed, so
   the back button closes it; a pick REPLACES that entry with the
   short reading, so back after a pick returns to the design before.
   ============================================================ */
(function () {
  'use strict';

  var BRAND = { name: 'Slack', teams: 'software' };

  /* SRC CustomizerPrototype.tsx brandFrames + BrandLoading */
  var FRAMES = [
    { title: 'Analyzing your website…', kind: 'website' },
    { title: 'Extracting your brand colors…', kind: 'purple' },
    { title: 'Analyzing the palette…', kind: 'blue' },
    { title: 'Capturing your brand vibe…', kind: 'vibe' },
    { title: 'Crafting your design…', kind: 'craft' }
  ];
  var WIDTHS = [6, 10, 22, 34, 44];
  var FRAME_MS = 1150, LAST_MS = 1300, CRAFT_MS = 1500;
  function frameInner(kind) {
    if (kind === 'website') return '<strong>SLACK.COM</strong>';
    if (kind === 'purple') return '<i></i><i></i><i></i><i></i><strong>#611F69</strong>';
    if (kind === 'blue') return '<i></i><i></i><i></i><i></i><strong>#36C5F0</strong>';
    if (kind === 'vibe') return '<div class="lbr-vibe"><span>FRIENDLY</span><span>APPROACHABLE</span><span>WARM</span></div>';
    return '<div class="lbr-craft"><i></i><i></i><i></i><i></i></div>';
  }

  /* The first design: the live Slack render of product 810. */
  var FIRST = { id: 'fc', name: 'Fully Charged Gift Set', price: '$195', img: 'img/slack-fully-charged.webp',
    why: 'Software teams choose this gift more than any other.' };
  /* Six more: live products, live prices, the live «standard» renders
     (the neutral GildedBox box, no client brand on them). */
  var GIFTS = [
    { id: 'yeti-tumbler',     name: 'YETI 20oz Tumbler',           price: '$90',  img: 'img/gift-yeti-tumbler.webp' },
    { id: 'yeti-travel-mug',  name: 'YETI 20oz Travel Mug',        price: '$100', img: 'img/gift-yeti-travel-mug.webp' },
    { id: 'stanley-quencher', name: 'Stanley Quencher 40oz',       price: '$125', img: 'img/gift-stanley-quencher.webp' },
    { id: 'ember-mug',        name: 'Ember 12oz Travel Mug',       price: '$300', img: 'img/gift-ember-mug.webp' },
    { id: 'yeti-lowball',     name: 'YETI 10oz Lowball',           price: '$70',  img: 'img/gift-yeti-lowball.webp' },
    { id: 'stanley-cooler',   name: 'Stanley Everyday Can Cooler', price: '$65',  img: 'img/gift-stanley-can-cooler.webp' }
  ];
  /* A picked gift on the scene. The only second render in the Slack
     brand we have is the tumbler frame, so every pick wears it
     (a prototype limit, said in the report). */
  function designOf(id) {
    if (!id || id === 'fc') return FIRST;
    for (var i = 0; i < GIFTS.length; i++) if (GIFTS[i].id === id) {
      var g = GIFTS[i];
      return { id: g.id, name: g.name, price: g.price, std: g.img, img: 'img/slack-tumbler-neutral.webp',
        why: 'One of the gifts software teams choose most, now in your brand.' };
    }
    return FIRST;
  }
  function known(id) { return id === 'fc' || GIFTS.some(function (g) { return g.id === id; }); }

  var body = document.body;
  /* Layer mode: this page framed by the catalog overlay of its parent. */
  var LAYER = window.self !== window.top && new URLSearchParams(location.search).get('studio') === 'embedded';
  function toParent(msg) { try { window.parent.postMessage(msg, location.origin); } catch (e) {} }
  var drawer = document.getElementById('lpp-drawer');
  var timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  /* ---------------- state and address ---------------- */
  var SCREENS = ['landing', 'reading', 'gift', 'more', 'order'];
  function readState() {
    var q = new URLSearchParams(location.search);
    var s = q.get('s') || 'landing';
    if (s === 'hero' || s === 'two' || s === 'saved') s = 'gift';     /* proto-1 keys */
    if (q.get('sheet') === '1') s = 'more';
    if (SCREENS.indexOf(s) < 0) s = 'landing';
    var g = q.get('g') || q.get('gift') || 'fc';
    if (!known(g)) g = 'fc';
    var mine = (q.get('mine') || '').split(',').filter(function (id) { return id && id !== 'fc' && known(id); });
    if (g !== 'fc' && mine.indexOf(g) < 0) mine.push(g);
    var dr = q.get('dr') || '';
    if (['designs', 'personalize', 'meeting', 'more'].indexOf(dr) < 0) dr = '';
    var land = q.get('land') === 'diy' ? 'diy' : 'choice';
    if (dr === 'more' && !(land === 'diy' && s === 'gift')) dr = '';   /* the layer lives over the diy step only */
    return { s: s, g: g, mine: mine, r: q.get('r') === 'craft' ? 'craft' : '', dr: dr, land: land };
  }
  var state = readState();

  function url(st) {
    var q = new URLSearchParams();
    if (st.land === 'diy') q.set('land', 'diy');
    if (st.s !== 'landing') q.set('s', st.s);
    if (st.g !== 'fc') q.set('g', st.g);
    if (st.mine.length) q.set('mine', st.mine.join(','));
    if (st.r) q.set('r', st.r);
    if (st.dr) q.set('dr', st.dr);
    var s = q.toString();
    return location.pathname + (s ? '?' + s : '');
  }

  function go(patch, opts) {
    state = Object.assign({}, state, { r: '', dr: '' }, patch);
    if (opts && opts.replace) history.replaceState(null, '', url(state));
    else history.pushState(null, '', url(state));
    render(true);
  }
  window.addEventListener('popstate', function () { state = readState(); render(true); });

  /* ---------------- rendering ---------------- */
  function render(scroll) {
    clearTimers();
    body.setAttribute('data-screen', state.s);
    body.setAttribute('data-land', state.land);
    /* The reading plays OVER the landing, so the landing stays. A
       second pick plays over where it was made: the grid (choice) or
       the customizer's own row (diy). */
    var under = state.s === 'reading' ? (state.r === 'craft' ? (state.land === 'diy' ? 'gift' : 'more') : 'landing') : state.s;
    document.querySelectorAll('[data-screen-id]').forEach(function (sec) {
      var land = sec.getAttribute('data-land');
      sec.hidden = sec.getAttribute('data-screen-id') !== under || (!!land && land !== state.land);
    });
    if (under === 'gift') fillGift();
    landLinks();
    document.getElementById('s-reading').hidden = state.s !== 'reading';

    if (state.s === 'reading') runReading();
    if (state.s === 'more') fillMore();
    if (state.s === 'order') fillOrder();

    if (state.dr === 'more') {
      if (drawer && drawer._open) { quiet = true; drawer.close(); quiet = false; }
      openLayer();
    } else {
      closeLayer();
      if (state.dr && (state.s === 'gift' || state.s === 'order')) openDrawer(state.dr, true);
      else if (drawer && drawer._open) { quiet = true; drawer.close(); quiet = false; }
    }
    cookieRefresh();

    if (scroll) window.scrollTo(0, 0);
    var t = state.s === 'reading' ? document.getElementById('lbr-title')
      : document.querySelector('[data-screen-id="' + state.s + '"]:not([hidden]) h1');
    document.title = (t && state.s !== 'landing' ? t.textContent.replace(/\s+/g, ' ').trim() + ' · ' : '') + 'Start 227 prototype · GildedBox Design Studio';
  }

  /* ---------------- 2. the brand reading ---------------- */
  function showFrame(i) {
    var f = FRAMES[i];
    document.getElementById('lbr-title').textContent = f.title;
    var card = document.getElementById('lbr-card');
    card.className = 'lbr-card is-' + f.kind;
    card.innerHTML = frameInner(f.kind);
    document.getElementById('lbr-bar').style.width = WIDTHS[i] + '%';
    if (state.s === 'reading') document.title = f.title + ' · Start 227 prototype · GildedBox Design Studio';
  }
  function runReading() {
    var bar = document.getElementById('lbr-bar');
    /* React paints frame 0 at its width on the first render: no
       transition from zero. Same here. */
    bar.style.transition = 'none';
    if (state.r === 'craft') {
      bar.style.width = WIDTHS[3] + '%';
      void bar.offsetWidth; bar.style.transition = '';
      showFrame(4);
      later(function () { go({ s: 'gift', g: state.g }, { replace: true }); }, CRAFT_MS);
      return;
    }
    showFrame(0);
    void bar.offsetWidth; bar.style.transition = '';
    for (var i = 1; i < FRAMES.length; i++) (function (n) { later(function () { showFrame(n); }, FRAME_MS * n); })(i);
    later(function () { go({ s: 'gift', g: 'fc' }, { replace: true }); }, FRAME_MS * (FRAMES.length - 1) + LAST_MS);
  }

  /* ---------------- 3. the customizer page ---------------- */
  function fillGift() {
    var d = designOf(state.g);
    ['lpc-img', 'lpd-img'].forEach(function (id) {
      var img = document.getElementById(id);
      img.src = d.img; img.alt = d.name + ' in the ' + BRAND.name + ' design';
      img.parentNode.classList.toggle('is-frame', d.id !== 'fc');
    });
    document.getElementById('lpc-title').textContent = d.name;
    document.getElementById('lpc-price').textContent = d.price;
    document.querySelectorAll('[data-count]').forEach(function (c) { c.textContent = String(1 + state.mine.length); });
  }

  /* The quiet switch of the prototype (not of the product): each link
     keeps the rest of the address and changes only the landing. */
  function landLinks() {
    document.querySelectorAll('[data-land-link]').forEach(function (a) {
      var l = a.getAttribute('data-land-link');
      a.setAttribute('href', url(Object.assign({}, state, { land: l, r: '', dr: '' })));
      if (l === state.land) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  /* ---------------- 4. six more: the catalog card ---------------- */
  var built = false;
  function fillMore() {
    if (!built) {
      built = true;
      var row = document.getElementById('lpm-row');
      GIFTS.forEach(function (g) {
        var c = document.createElement('gb-listing-card');
        c.setAttribute('product-id', g.id);
        c.setAttribute('href', '?s=more');
        c.setAttribute('title', g.name);
        c.setAttribute('price', g.price);
        c.setAttribute('img', g.img);
        c.setAttribute('alt', g.name + ', standard box');
        row.appendChild(c);                     /* the card stamps itself into the live cell */
      });
      chooseButtons(row);
    }
    markCurrent(state.g);
  }
  /* The gift on the scene wears is-current, as it did in the diy row. */
  function markCurrent(g) {
    document.querySelectorAll('#lpm-row [data-product-id]').forEach(function (c) {
      c.classList.toggle('is-current', c.getAttribute('data-product-id') === g);
    });
  }
  function chooseButtons(row) {
    row.querySelectorAll('.gbcCard-foot > div').forEach(function (foot) {
      var b = document.createElement('span');
      b.className = 'gb-btn gb-btn--outline gb-btn--secondary gb-btn--small gb-btn--block lpm-choose';
      b.innerHTML = '<span class="gb-btn__label">Choose this one</span>';
      foot.appendChild(b);
    });
  }
  function pick(id, opts) {
    if (state.mine.indexOf(id) >= 0) { go({ s: 'gift', g: id }, opts); return; }
    go({ s: 'reading', r: 'craft', g: id, mine: state.mine.concat([id]) }, opts);
  }

  /* ---------------- 4b. six more, one level up (diy) ----------------
     The overlay is live/catalog-overlay.js (window.GbCatalogOverlay):
     it opens itself on its door [data-more-open] and closes on its
     scrim, on Esc and on 'gb-close-catalog'. This block only keeps the
     address in step and talks to the frame. */
  var layerOpen = false;
  var LAYER_TITLE = '6 more gifts for your brand';
  function layerFrame() { return document.querySelector('.gbppd-cat__frame'); }
  function sendCurrent() {
    var f = layerFrame();
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'lp227-current', g: state.g }, location.origin);
  }
  function nameLayer() {
    var panel = document.querySelector('.gbppd-cat__panel');
    if (panel) panel.setAttribute('aria-label', LAYER_TITLE);   /* the snippet says «Explore Gifts» */
  }
  function openLayer() {
    if (LAYER || !window.GbCatalogOverlay) return;
    if (!layerOpen) { layerOpen = true; window.GbCatalogOverlay.open(); }
    nameLayer(); sendCurrent();
  }
  function closeLayer() {
    if (!layerOpen) return;
    layerOpen = false;
    if (window.GbCatalogOverlay) window.GbCatalogOverlay.close();
  }
  /* The door was clicked: the snippet already opened; write the address. */
  function layerDoor() {
    layerOpen = true;
    nameLayer(); sendCurrent();
    if (state.dr !== 'more') { state.dr = 'more'; history.pushState(null, '', url(state)); }
  }
  /* Closed from inside (scrim, Esc, the frame's back link). */
  function layerClosed() {
    if (!layerOpen) return;
    layerOpen = false;
    if (state.dr === 'more') { state.dr = ''; history.replaceState(null, '', url(state)); }
  }
  if (!LAYER) {
    window.addEventListener('message', function (e) {
      if (e.origin !== location.origin || !e.data) return;
      var f = layerFrame();
      if (!f || e.source !== f.contentWindow) return;
      if (e.data.type === 'gb-close-catalog') layerClosed();
      else if (e.data.type === 'lp227-ready') sendCurrent();
      else if (e.data.type === 'lp227-pick' && known(e.data.id)) {
        layerOpen = false;
        window.GbCatalogOverlay.close();
        state.dr = '';
        pick(e.data.id, { replace: true });     /* the pick takes the layer's place in history */
      }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') layerClosed(); });
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-gbppd-cat-close]')) layerClosed();
    });
  }

  /* ---------------- 5. your designs: the history drawer ---------------- */
  function designsHTML() {
    var list = [FIRST].concat(state.mine.map(designOf));
    return '<p class="sim-lede">Every gift you designed stays here. Open any of them again.</p>' +
      '<ul class="sim-list">' + list.map(function (d) {
        var cur = d.id === state.g;
        return '<li class="sim-card' + (cur ? ' is-current' : '') + '">' +
          '<img class="sim-card__img" src="' + d.img + '" alt="' + d.name + ' in the ' + BRAND.name + ' design">' +
          '<div><p class="sim-card__name">' + d.name + '</p><p class="sim-card__price">' + d.price + '</p>' +
          (cur ? '<span class="gb-eyebrow sim-card__now">On the scene</span>'
               : '<button class="gb-btn gb-btn--outline gb-btn--secondary gb-btn--medium" type="button" data-design="' + d.id + '">' +
                 '<span class="gb-btn__label">Open this design</span></button>') +
          '</div></li>';
      }).join('') + '</ul>';
  }

  /* ---------------- 6b. the meeting drawer ----------------
     <gb-booking-flow> of live/book-a-meeting.html in its drawer
     mode, layout="embedded", exactly as the concierge hub carries it
     (live/concierge/concierge.js bookingEl / setFoot): the organism
     draws its own head and fields, and hands the step's footer to
     the drawer on gbb:cta, so the action lives in .gbd-foot. The
     element is made by hand so the first handover is heard. */
  function mountMeeting() {
    var panel = document.querySelector('.gbd-panel');
    var slot = panel && panel.querySelector('[data-meeting-slot]');
    if (!slot) return;
    var el = document.createElement('gb-booking-flow');
    el.setAttribute('layout', 'embedded');
    el.setAttribute('site-href', url(Object.assign({}, state, { s: 'gift', dr: '' })));
    el.setAttribute('exit-label', 'Back to your designs');
    el.addEventListener('gbb:cta', function (e) {
      var f = panel.querySelector('.gbd-foot');
      if (!f) return;
      f.innerHTML = '';
      if (e.detail && e.detail.node) f.appendChild(e.detail.node);
    });
    slot.appendChild(el);
  }
  document.addEventListener('gbb:exit', function (e) { e.preventDefault(); drawer.close(); });

  /* ---------------- the one drawer ---------------- */
  var quiet = false;
  function openDrawer(kind, fromRender) {
    if (!drawer || !drawer.open) return;
    if (kind === 'designs') drawer.open({ title: 'Your designs', html: designsHTML() });
    else if (kind === 'personalize') openPersonalize();
    else if (kind === 'meeting') { drawer.open({ title: 'Book a meeting', html: '<div data-meeting-slot></div>' }); mountMeeting(); }
    if (!fromRender && state.dr !== kind) {
      var had = !!state.dr;
      state.dr = kind;
      if (had) history.replaceState(null, '', url(state)); else history.pushState(null, '', url(state));
    }
  }
  if (drawer) drawer.addEventListener('gbd:close', function () {
    if (quiet || !state.dr) return;
    state.dr = '';
    history.replaceState(null, '', url(state));
  });

  /* ---------------- 6a. the order stub ---------------- */
  function design() { return designOf(state.g); }
  function fillOrder() {
    var d = design();
    document.getElementById('order-name').textContent = d.name;
    document.getElementById('order-sub').textContent = 'Designed for ' + BRAND.name + ' · ' + d.price + ' each';
    var img = document.getElementById('order-img');
    img.src = d.img; img.alt = d.name + ' in the ' + BRAND.name + ' design';
    document.getElementById('order-back-label').textContent = 'Back to your designs';
  }

  /* ---------------- the personalize drawer ----------------
     The same two tab surface as design-share (and the live checkout
     it copies): GIFT ITEMS / GREETING CARD on .gb-tabs--fill, the
     item rows and the card fields, the tags note in the house alert.
     Static content; switching tabs only toggles [hidden]. */
  function esc(v) { return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function count(id, max) { return '<span class="gb-eyebrow pz-count"><span data-pz-count="' + id + '">0</span> / ' + max + ' chars</span>'; }
  function pzItem(n, name, where, id) {
    return '<div class="pz-row pz-item"><span class="gb-eyebrow">Personalize item ' + n + '</span>' +
      '<p class="pz-name">' + esc(name) + '</p><span class="gb-eyebrow pz-where">' + esc(where) + '</span>' +
      '<gb-field optional input-id="' + id + '" name="' + id + '" label="Your text" maxlength="300" placeholder="Your text"></gb-field>' +
      count(id, 300) + '</div>';
  }
  function openPersonalize() {
    var d = design();
    var html =
      '<p class="sim-lede">Name and message you want to see as an example on this gift.</p>' +
      '<div class="gb-tabs gb-tabs--fill" role="tablist" aria-label="What to personalize">' +
        '<button type="button" class="gb-tab" role="tab" id="pzTabItems" aria-controls="pzPaneItems" aria-selected="true" data-pz-tab="pzPaneItems"><span class="gb-tab__label">Gift items</span></button>' +
        '<button type="button" class="gb-tab" role="tab" id="pzTabCard" aria-controls="pzPaneCard" aria-selected="false" tabindex="-1" data-pz-tab="pzPaneCard"><span class="gb-tab__label">Greeting card</span></button>' +
      '</div>' +
      '<div class="pz-group" role="tabpanel" id="pzPaneItems" aria-labelledby="pzTabItems">' +
        pzItem(1, 'Custom Gift Box', 'Printed across the wrap', 'pzBox') +
        pzItem(2, d.name, 'Engraved on the item', 'pzItem') +
      '</div>' +
      '<div class="pz-group" role="tabpanel" id="pzPaneCard" aria-labelledby="pzTabCard" hidden>' +
        '<div class="pz-row"><gb-field optional input-id="pzIntro" name="intro" label="Card heading" maxlength="50" placeholder="Hello, or Dear team,"></gb-field>' + count('pzIntro', 50) + '</div>' +
        '<div class="pz-row"><gb-field optional input-id="pzMessage" name="message" type="textarea" label="Card message" maxlength="500" placeholder="Write your message..."></gb-field>' + count('pzMessage', 500) + '</div>' +
        '<div class="pz-row"><gb-field optional input-id="pzSign" name="signature" label="Your signature" maxlength="100" placeholder="Your name or company"></gb-field>' + count('pzSign', 100) + '</div>' +
        '<div class="gb-alert gb-alert--info" role="note"><span class="gb-alert__body">' +
          '<span class="gb-alert__icon" aria-hidden="true"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 10.8v5.6"/><path d="M12 7.6h.01"/></svg></span>' +
          '<span class="gb-alert__text">Use {{FirstName}} in your message and each recipient sees their own name.</span></span></div>' +
      '</div>';
    var foot = '<div class="pz-foot">' +
      '<button type="button" class="gb-btn gb-btn--medium gb-btn--ghost gb-btn--secondary" data-pz="reset"><span class="gb-btn__label">Reset</span></button>' +
      '<button type="button" class="gb-btn gb-btn--medium gb-btn--filled gb-btn--primary" data-pz="save"><span class="gb-btn__label">Save personalization</span></button></div>';
    drawer.open({ title: 'Personalize', html: html, foot: foot });
  }
  function pzTab(paneId) {
    document.querySelectorAll('[data-pz-tab]').forEach(function (b) {
      var on = b.getAttribute('data-pz-tab') === paneId;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.setAttribute('tabindex', on ? '0' : '-1');
      var pane = document.getElementById(b.getAttribute('data-pz-tab'));
      if (pane) pane.hidden = !on;
    });
  }
  document.addEventListener('input', function (e) {
    var t = e.target; if (!t || !t.id) return;
    var out = document.querySelector('[data-pz-count="' + t.id + '"]');
    if (out) out.textContent = String(t.value || '').length;
  });

  /* ---------------- the live cookie bar ---------------- */
  var COOKIE_KEY = 'lpp227-cookie';
  var COOKIE_DELAY = 6000;       /* LIVE: the bar arrives 5.5 to 6.1s after load (measured 25.09) */
  var cookieDue = false;
  function cookieGone() { try { return sessionStorage.getItem(COOKIE_KEY) === '1'; } catch (e) { return false; } }
  function cookieRefresh() {
    var live = document.querySelector('[data-cookie="live"]');
    live.hidden = !(cookieDue && !cookieGone() && state.s === 'landing');
  }
  setTimeout(function () { cookieDue = true; cookieRefresh(); }, COOKIE_DELAY);
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-cookie-close]')) {
      try { sessionStorage.setItem(COOKIE_KEY, '1'); } catch (err) {}
      cookieRefresh();
    }
  });

  /* ---------------- the live phone sheet ----------------
     LIVE: at rest the sheet sits 340px down; the grip pulls it up to
     its full height and lets it fall back. A tap on the grip toggles. */
  (function sheet() {
    var panel = document.querySelector('.lpl-panel');
    var grip = document.querySelector('.lpl-sheet__grip');
    if (!panel || !grip) return;
    var REST = 340, y = REST, start = null, moved = false;
    function set(v) { y = Math.max(0, Math.min(REST, v)); panel.style.setProperty('--lpl-sheet-y', y + 'px'); }
    grip.addEventListener('pointerdown', function (e) {
      start = { y: e.clientY, from: y }; moved = false;
      panel.classList.add('is-dragging'); grip.setPointerCapture(e.pointerId);
    });
    grip.addEventListener('pointermove', function (e) {
      if (!start) return;
      var d = e.clientY - start.y; if (Math.abs(d) > 4) moved = true;
      set(start.from + d);
    });
    grip.addEventListener('pointerup', function () {
      if (!start) return;
      panel.classList.remove('is-dragging');
      if (!moved) set(y > REST / 2 ? 0 : REST);
      else set(y > REST / 2 ? REST : 0);
      start = null;
    });
  })();


  /* ---------------- clicks and forms ---------------- */
  document.addEventListener('click', function (e) {
    if (LAYER) {                               /* the frame routes nothing itself */
      var lc = e.target.closest('#lpm-row [data-product-id]');
      if (lc) { e.preventDefault(); toParent({ type: 'lp227-pick', id: lc.getAttribute('data-product-id') }); return; }
      if (e.target.closest('a, [data-go]')) { e.preventDefault(); toParent({ type: 'gb-close-catalog' }); }
      return;
    }
    if (e.target.closest('[data-more-open]')) { e.preventDefault(); layerDoor(); return; }
    var card = e.target.closest('#lpm-row [data-product-id]');
    if (card) { e.preventDefault(); pick(card.getAttribute('data-product-id')); return; }
    var ll = e.target.closest('[data-land-link]');
    if (ll) { e.preventDefault(); go({ land: ll.getAttribute('data-land-link') }); return; }
    /* 906: START DESIGNING reads the chosen card, as the live does. */
    if (e.target.closest('[data-start]')) {
      var mine = document.getElementById('lpv-standard').checked;
      openDrawer(mine ? 'personalize' : 'meeting', false);
      return;
    }
    var tile = e.target.closest('[data-tile]');
    if (tile) {
      tile.parentNode.querySelectorAll('[data-tile]').forEach(function (t) {
        t.classList.toggle('is-on', t === tile); t.setAttribute('aria-checked', t === tile ? 'true' : 'false');
      });
      return;
    }
    var dz = e.target.closest('[data-design]');
    if (dz) { quiet = true; drawer.close(); quiet = false; go({ s: 'gift', g: dz.getAttribute('data-design') }); return; }
    var op = e.target.closest('[data-open]');
    if (op) { openDrawer(op.getAttribute('data-open'), false); return; }
    var tab = e.target.closest('[data-pz-tab]');
    if (tab) { pzTab(tab.getAttribute('data-pz-tab')); return; }
    var pz = e.target.closest('[data-pz]');
    if (pz) {
      if (pz.getAttribute('data-pz') === 'reset') {
        document.querySelectorAll('.gbd-panel .pz-group input, .gbd-panel .pz-group textarea').forEach(function (f) { f.value = ''; });
        document.querySelectorAll('[data-pz-count]').forEach(function (c) { c.textContent = '0'; });
      } else {
        quiet = true; drawer.close(); quiet = false;
        if (state.s !== 'order') go({ s: 'order' });
        else { state.dr = ''; history.replaceState(null, '', url(state)); }
      }
      return;
    }
    if (e.target.closest('[data-back]')) { e.preventDefault(); go({ s: 'gift', dr: 'designs' }); return; }
    var g = e.target.closest('[data-go]');
    if (g && g.tagName !== 'FORM') { e.preventDefault(); go({ s: g.getAttribute('data-go') }); }
  });

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.closest('gb-booking-flow')) return;          /* the booking organism owns its own form */
    e.preventDefault();
    if (f.hasAttribute('data-order')) {
      var box = f.querySelector('.order-alert');
      box.innerHTML = '<div class="gb-alert gb-alert--info"><span class="gb-alert__body">' +
        '<span class="gb-alert__icon" aria-hidden="true"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 17v-6.8"/><path d="M12 7.5h.01"/></svg></span>' +
        '<span class="gb-alert__text">Recipients and delivery come next.</span></span></div>';
      return;
    }
    if (f.getAttribute('data-go')) go({ s: f.getAttribute('data-go') });
  });

  if (LAYER) {
    /* Layer mode: the screen «six more» only, titled for the door that
       opened it, current gift from the parent, Esc closes from inside. */
    body.setAttribute('data-layer', 'more');
    var lt = document.getElementById('lpm-title');
    if (lt) lt.textContent = LAYER_TITLE;
    window.addEventListener('message', function (e) {
      if (e.origin === location.origin && e.data && e.data.type === 'lp227-current') markCurrent(e.data.g);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toParent({ type: 'gb-close-catalog' }); });
  }

  render(false);
  if (LAYER) toParent({ type: 'lp227-ready' });
})();
