/* ============================================================
   gbppl-inspect-1 — INSPECT MODE, THE CORE
   ------------------------------------------------------------
   Ton, 26.08, the order this file answers: «переключать режимы
   View / Inspect, наводить на любые секции, блоки, что угодно, и
   видеть их properties. Или как в Figma: наводишь, и оверлей
   поверх показывает отступы. Не overkill, но если можем лучше —
   сделать». The first piece of feedback from the team behind it:
   the front end lead wants properties in the prototypes
   themselves. This is a dev mode for designers and developers,
   and it is the third brick after <gb-drawer> (25.08) and the
   showcase inspector (26.08).

   WHERE IT CAME FROM. The measuring core, the token lookup and
   the drawer filling used to live in system\oro\inspect.js and
   only the showcase could reach them. They moved here unchanged.
   The showcase now loads this file and keeps nothing of its own:
   the three specimen kinds it declares (button, field, type) are
   below, next to the recognition table that names any element on
   any page.

   WHAT IT DOES, in the order a reader meets it.

   1. THE MODE. Two of them, View and Inspect, switched from the
      Mode section of <gb-studio-panel>, by the i key, or by Esc
      to leave. The choice is remembered in sessionStorage, per
      tab: a mode is a thing you are doing right now, not a
      preference, and it should not follow you into tomorrow.

   2. RECOGNITION. What is the thing under the pointer. The table
      reads the classes and tags of the system: .gb-btn and its
      modifiers become «Button · filled primary · S», .gba-input
      becomes Field, the header names its own parts, a line of
      text is matched against the type record and comes back as
      «H1 hero», and everything the system does not own is a Box
      with honest measurements. It never invents a name.

   2a. WHAT THE POINTER MEANS. A button is one object: point at
      its label and the answer is still Button. Hold Alt to drill
      through and take the exact element under the pointer.

   3. THE OVERLAY (inspect.css). A hairline round the box, a plate
      naming it and its size, padding filled from the inside,
      margin hatched from the outside, the gap between siblings
      where a flex or grid parent declares one. One layer over the
      page; the page's own DOM is never touched.

   4. THE DRAWER. A click opens <gb-drawer> with the properties
      measured off that element: geometry, type, paint, the
      component's own ladder where it has one, the classes, a CSS
      declaration to copy, the file that owns it and the way into
      the showcase card. Clicks are swallowed while inspecting, so
      a link is a thing to look at rather than a thing to follow.

   NOT ONE NUMBER IS TYPED. Every value is read back out of the
   rendered page with getComputedStyle at the current window
   width, and beside it stands the TOKEN that produced it, found
   by resolving the candidates for that property and keeping the
   one whose value matches what the browser drew. No match is
   printed as NO TOKEN rather than as invented provenance.

   HOW TO CONNECT IT. Four files, after studio-panel.js:

     <link rel="stylesheet" href="../system/components/drawer.css">
     <link rel="stylesheet" href="../system/components/docs.css">
     <link rel="stylesheet" href="../system/components/inspect.css">
     ...
     <script src="../system/type-scale.js"></script>
     <script src="../system/components/drawer.js"></script>
     <script src="../system/components/inspect.js"></script>

   docs.css is here because the drawer body is written in the
   documentation atoms (.gbdoc-table, .gbdoc-chip, .gbdoc-code):
   the properties of a component look the same in the prototype
   as they do on the showcase, which is the whole point of one
   system (Ton-10). Every selector in that file is prefixed, so it
   touches nothing on the page it lands on. The drawer element
   itself is created on first use if the page has none.

   ADDING A COMPONENT to the recognition table is one row in
   COMPONENTS. Adding a specimen kind to the showcase is one entry
   in KINDS. The core below knows about neither.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  var root = document.documentElement;

  /* One decimal, not two. A display running at 113 per cent hands
     back 19.99 for a 20px glyph and 0.884956 for a hairline; the
     second decimal is the reader's screen talking, not the
     system. */
  function px(v) {
    var n = parseFloat(v);
    if (isNaN(n)) return v;
    return Math.round(n * 10) / 10 + 'px';
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /* Colours arrive as rgb() off the element and as hex out of a
     token, so both are pushed through one shape before they are
     compared. */
  function norm(v) {
    v = String(v).trim().toLowerCase();
    var m = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
    if (m) {
      var h = m[1];
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      return 'rgb(' + parseInt(h.slice(0, 2), 16) + ', ' + parseInt(h.slice(2, 4), 16) + ', ' + parseInt(h.slice(4, 6), 16) + ')';
    }
    return v.replace(/\s+/g, ' ').replace(/rgba\((.+?),\s*1\)/, 'rgb($1)');
  }
  function tokenValue(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }
  /* The token whose resolved value is what the browser drew.
     Lengths are compared at whole pixels: a hairline declared as
     1px comes back as 0.88 on a display at 113 per cent, and a
     token that is right should not be reported missing because
     the reader's screen has a scaling factor. */
  function samePx(a, b) {
    var ma = /^(-?[\d.]+)px$/.exec(a), mb = /^(-?[\d.]+)px$/.exec(b);
    return !!(ma && mb) && Math.round(parseFloat(ma[1])) === Math.round(parseFloat(mb[1]));
  }
  function tokenFor(value, candidates) {
    if (!candidates) return null;
    var want = norm(value);
    for (var i = 0; i < candidates.length; i++) {
      var got = tokenValue(candidates[i]);
      if (!got) continue;
      got = norm(got);
      if (got === want || samePx(got, want)) return candidates[i];
    }
    return null;
  }
  /* A ladder rung can be spelt three ways: the base token, the
     1280 step and the 2000 step. All three are offered and the
     matching one wins, which is how the drawer stays right at
     every window width without knowing the breakpoints. */
  function rungs(base) { return [base, base + '-xl', base + '-2xl']; }

  function row(label, value, candidates, note) {
    var t = candidates ? tokenFor(value, candidates) : null;
    return {
      label: label,
      value: value,
      token: t,
      note: note || (candidates && !t ? 'no token' : '')
    };
  }

  /* gbppl-oro-typography-1. The same row, plus a token we already
     know for certain. Needed because two type properties cannot be
     resolved by comparing values: tracking is declared in em and
     rendered in px, and a colour token that points at another token
     comes back unresolved. Where the value CAN be compared the
     lookup still runs first, so a token that has drifted is caught
     rather than asserted. */
  function knownRow(label, value, candidates, known, note) {
    var r = row(label, value, candidates, note);
    if (!r.token && known) { r.token = known; r.note = ''; }
    return r;
  }

  /* Two columns, not three: the drawer is 520 wide and a third
     column of token names would put it on a horizontal scrollbar.
     The token goes under the value it produced, which is also
     where Figma's inspect panel puts it. */
  function table(rowsList) {
    var html = '<table class="gbdoc-table"><thead><tr><th>Property</th><th>Rendered, and the token behind it</th></tr></thead><tbody>';
    rowsList.forEach(function (r) {
      var under = r.token
        ? '<code class="gbdoc-tokenline">' + esc(r.token) + '</code>'
        : (r.note === 'no token'
            ? '<span class="gbdoc-tokenline gbdoc-tokenline--none">No token</span>'
            /* 'quiet' = there is nothing to say under this value, and
               saying «In the organism» about the display mode of a
               plain div would be a claim, not a caption. Used by the
               generic reading, never by a specimen kind. */
            : (r.note === 'quiet' ? ''
              : (r.note ? '<span class="gbdoc-tokenline gbdoc-tokenline--none">' + esc(r.note) + '</span>'
                        : '<span class="gbdoc-tokenline gbdoc-tokenline--none">In the organism</span>')));
      html += '<tr><td>' + esc(r.label) + '</td><td><span class="gbdoc-num">' + esc(r.value) + '</span>' + under + '</td></tr>';
    });
    return html + '</tbody></table>';
  }

  function chips(list) {
    if (!list.length) return '';
    return '<div class="gbdoc-chips">' + list.map(function (c) {
      return '<code class="gbdoc-chip">' + esc(c) + '</code>';
    }).join('') + '</div>';
  }

  function block(title, body) {
    return '<span class="gbdoc-cap">' + esc(title) + '</span>' + body;
  }

  function snippet(code) {
    return '<div class="gbdoc-code"><button class="gbdoc-copy" type="button">Copy</button><pre><code>' +
      esc(code) + '</code></pre></div>';
  }


  /* ---------- where the studio root is ----------
     Same trouble as data-root on the console: pages sit at three
     different depths. Here it is read off this script's own src
     rather than asked of the page, so no consumer has to declare
     it twice (ловушка 2 of the skill, answered once). */
  var ROOT = (function () {
    var s = document.currentScript;
    if (s && s.src) {
      var m = /^(.*\/)system\/components\/inspect\.js(?:[?#].*)?$/.exec(s.src);
      if (m) return m[1];
    }
    var p = document.querySelector('gb-studio-panel');
    return p ? (p.getAttribute('data-root') || '') : '';
  })();

  /* ---------- token candidates, by kind of property ---------- */
  var INKS = ['--zinc-950', '--zinc-900', '--zinc-800', '--zinc-700', '--zinc-600',
              '--zinc-500', '--zinc-400', '--zinc-300', '--zinc-200', '--zinc-100',
              '--zinc-50', '--white', '--black', '--blue-800', '--blue-700',
              '--blue-600', '--blue-400', '--blue-200', '--blue-50', '--red-600',
              '--red-500', '--gold-beta', '--live-body', '--live-offwhite',
              '--header-glass'];
  var SPACES = ['--space-8', '--space-16', '--space-24', '--space-32', '--space-48',
                '--space-64', '--form-block-gap', '--form-row-gap', '--form-col-gap',
                '--container-pad', '--container-pad-narrow', '--container-pad-wide'];
  var RADII = ['--radius', '--radius-pill', '--radius-circle'];
  var SHADOWS = ['--shadow-card', '--shadow-header', '--shadow-bar', '--shadow-panel'];
  var FAMS = ['--font-sans', '--font-serif'];

  /* ---------- who owns what ----------
     A prefix is a deed. Every class in the system carries the mark
     of the file that wrote it, so the drawer can always answer
     «where do I go to change this» without a lookup table of
     individual class names. Longer prefixes stand first: gbsp- is
     the console, not the studio, and gbdoc- is the documentation,
     not the drawer. */
  var OWNERS = [
    [/^gb-btn/, 'system/components/button.css'],
    [/^gbsp-/, 'system/components/studio-panel.css'],
    [/^gbdoc-/, 'system/components/docs.css'],
    [/^gbd-/, 'system/components/drawer.css'],
    [/^gbi-/, 'system/components/inspect.css'],
    [/^gba-/, 'system/components/auth.css'],
    [/^gbg-/, 'system/components/auth.css'],
    [/^gbh-/, 'system/components/header.css'],
    [/^gb-header/, 'system/components/header.css'],
    [/^gbhm-/, 'system/components/home.css'],
    [/^gbb-/, 'system/components/booking.css'],
    [/^gbc/, 'system/components/catalog.css'],
    [/^gbs-/, 'system/components/studio.css'],
    [/^gb-container$|^gb-eyebrow$|^gb-demo$/, 'system/components/shell.css'],
    [/^oro-/, 'system/oro/oro.css']
  ];
  var TAG_OWNERS = {
    'gb-site-header': 'system/components/header.css',
    'gb-site-footer': 'system/components/footer.css',
    'gb-studio-panel': 'system/components/studio-panel.css',
    'gb-drawer': 'system/components/drawer.css',
    'gb-field': 'system/components/auth.css',
    'gb-guest-header': 'system/components/auth.css',
    'gb-auth-flow': 'system/components/auth.css',
    'gb-booking-flow': 'system/components/booking.css',
    'gb-home-hero': 'system/components/home.css',
    'gb-brand-tabs': 'system/components/home.css',
    'gb-testimonials': 'system/components/home.css',
    'gb-banner-video': 'system/components/home.css',
    'gb-banner-conversation': 'system/components/home.css',
    'gb-advantages': 'system/components/home.css',
    'gb-catalog-hero': 'system/components/catalog.css',
    'gb-catalog-filters': 'system/components/catalog.css',
    'gb-catalog-grid': 'system/components/catalog.css',
    'gb-listing-card': 'system/components/catalog.css'
  };

  function classList(el) {
    var c = (el.className && el.className.baseVal !== undefined)
      ? el.className.baseVal : (el.className || '');
    return String(c).split(/\s+/).filter(Boolean);
  }

  function ownerOfSelf(el) {
    if (!el || el.nodeType !== 1) return null;
    var tag = el.tagName.toLowerCase();
    if (TAG_OWNERS[tag]) return TAG_OWNERS[tag];
    var cls = classList(el);
    for (var i = 0; i < OWNERS.length; i++) {
      for (var j = 0; j < cls.length; j++) {
        if (OWNERS[i][0].test(cls[j])) return OWNERS[i][1];
      }
    }
    return null;
  }

  /* An element with no mark of its own belongs to whoever wrote the
     nearest marked ancestor: a bare div inside gb-site-footer is
     the footer's, and saying so is more use than saying nothing.
     The inference is named out loud in the drawer foot. */
  function ownerOf(el) {
    var own = ownerOfSelf(el);
    if (own) return { file: own, own: true };
    var up = el.parentElement, steps = 0;
    while (up && steps < 8) {
      var f = ownerOfSelf(up);
      if (f) return { file: f, own: false };
      up = up.parentElement;
      steps++;
    }
    return { file: null, own: false };
  }

  /* ---------- names for the families ---------- */
  var FAMILY = [
    [/^gbsp-(.+)$/, 'Console'],
    [/^gbdoc-(.+)$/, 'Docs'],
    [/^gbd-(.+)$/, 'Drawer'],
    [/^gba-(.+)$/, 'Auth'],
    [/^gbg-(.+)$/, 'Guest header'],
    [/^gbh-(.+)$/, 'Header'],
    [/^gbhm-(.+)$/, 'Home'],
    [/^gbb-(.+)$/, 'Booking'],
    [/^gbc[A-Za-z]*-(.+)$/, 'Catalog'],
    [/^gbs-(.+)$/, 'Studio'],
    [/^oro-(.+)$/, 'Showcase']
  ];

  /* heroTitle -> hero title, cal-grid -> cal grid. The class is the
     developer's spelling; the plate speaks to a designer. */
  function words(s) {
    return s.replace(/__/g, ' ').replace(/-/g, ' ')
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
  }

  var SIZE_WORD = { s: 'S', m: 'M', l: 'L', xl: 'XL' };

  /* ---------- the recognition table ----------
     Read top to bottom, first match wins, so the small parts of a
     component stand above the component itself. Every row is one
     selector and the name a designer would say out loud. Adding a
     component to Inspect is one row here. */
  var COMPONENTS = [
    { sel: '.gb-btn__label', name: 'Button label', oro: 'typography.html#g-button' },
    { sel: '.gb-btn__icon', name: 'Button glyph', oro: 'components.html#icons' },
    { sel: '.gb-btn', name: 'Button', kind: 'button', oro: 'components.html#buttons',
      detail: function (el) {
        var d = KINDS.button.describe(el);
        return d.type + ' ' + d.colour + ' · ' + SIZE_WORD[d.size] +
               (d.state === 'rest' ? '' : ' · ' + d.state);
      } },

    { sel: '.gba-textarea', name: 'Field', kind: 'field', oro: 'components.html#fields',
      detail: function () { return 'multi line'; } },
    { sel: '.gba-input', name: 'Field', kind: 'field', oro: 'components.html#fields',
      detail: function (el) { return 'single line · ' + KINDS.field.describe(el).state; } },
    { sel: '.gba-label', name: 'Field label', oro: 'components.html#fields' },
    { sel: '.gba-inputwrap', name: 'Field box', oro: 'components.html#fields' },
    { sel: 'gb-field, .gba-field', name: 'Field', oro: 'components.html#fields' },
    { sel: '.gba-error', name: 'Field error' },
    { sel: '.gba-submit', name: 'Form submit' },
    { sel: '.gba-form', name: 'Form' },

    { sel: '.gb-eyebrow', name: 'Eyebrow', oro: 'components.html#eyebrow' },
    { sel: '.gbh-count', name: 'Count badge', oro: 'components.html#badge' },
    { sel: '.gbh-beta', name: 'Beta badge' },
    { sel: '.gbh-navitem, .gbh-link', name: 'Header nav link' },
    { sel: '.gbh-menu__title', name: 'Submenu column heading' },
    { sel: '.gbh-menu__item', name: 'Submenu link' },
    { sel: '.gbh-menu', name: 'Gifts submenu' },
    { sel: '.gbh-icon-button, .gbh-pbar__icon', name: 'Header icon button' },
    { sel: '.gbh-brand', name: 'Header brand' },
    { sel: '.gbh-lock', name: 'Studio lock' },
    { sel: '.gbh-nav', name: 'Header nav' },
    { sel: '.gbh-actions, .gbh-pbar__actions', name: 'Header actions' },
    { sel: '.gbh-pbar', name: 'Portal bar' },
    { sel: '.gbh-bar', name: 'Header bar' },
    { sel: 'gb-site-header, .gb-header', name: 'Site header',
      detail: function (el) {
        var c = String(el.className || '');
        return /--transparent/.test(c) ? 'transparent'
             : /--studio/.test(c) ? 'studio'
             : /--sticky/.test(c) ? 'sticky' : 'plain';
      } },
    { sel: 'gb-site-footer', name: 'Site footer' },

    { sel: '.gbb-day', name: 'Calendar day' },
    { sel: '.gbb-slot', name: 'Time slot' },
    { sel: '.gbb-cal-grid', name: 'Calendar grid' },
    { sel: '.gbb-step', name: 'Step marker' },
    { sel: '.gbb-steps', name: 'Step rail' },
    { sel: '.gbb-panel', name: 'Booking panel' },
    { sel: 'gb-booking-flow', name: 'Booking flow',
      detail: function (el) { return el.getAttribute('layout') || 'default layout'; } },

    { sel: 'gb-listing-card', name: 'Listing card' },
    { sel: 'gb-catalog-hero', name: 'Catalog hero' },
    { sel: 'gb-catalog-filters', name: 'Catalog filters' },
    { sel: 'gb-catalog-grid', name: 'Catalog grid' },

    { sel: 'gb-home-hero', name: 'Home hero' },
    { sel: 'gb-brand-tabs', name: 'Brand tabs' },
    { sel: 'gb-testimonials', name: 'Testimonials' },
    { sel: 'gb-banner-video', name: 'Video banner' },
    { sel: 'gb-banner-conversation', name: 'Conversation banner' },
    { sel: 'gb-advantages', name: 'Advantages' },

    { sel: '.gbs-door', name: 'Studio door' },
    { sel: '.gbs-stop', name: 'Door stop' },
    { sel: '.gbs-shelf', name: 'Sandbox shelf' },
    { sel: 'gb-studio-panel, .gbsp', name: 'Studio console' },
    { sel: 'gb-drawer, .gbd-panel', name: 'Drawer' },
    { sel: '.gbdoc-card', name: 'Showcase card' },

    { sel: '.gb-container', name: 'Container' }
  ];

  /* Structural tags, the last thing tried before Box. A section is
     a section: calling it a Box would be less true, not more
     humble. */
  var TAGS = {
    section: 'Section', header: 'Header', footer: 'Footer', nav: 'Nav',
    main: 'Main', aside: 'Aside', article: 'Article', form: 'Form',
    figure: 'Figure', figcaption: 'Caption', table: 'Table', thead: 'Table head',
    tbody: 'Table body', tr: 'Table row', td: 'Cell', th: 'Header cell',
    ul: 'List', ol: 'List', li: 'List item', img: 'Image', svg: 'Glyph',
    video: 'Video', picture: 'Picture', canvas: 'Canvas', iframe: 'Frame',
    button: 'Button element', a: 'Link', input: 'Input', textarea: 'Text area',
    select: 'Select', label: 'Label', hr: 'Rule', body: 'Page body'
  };

  /* ---------- is this line of text the element's own ----------
     A heading holds text and nothing else, so the instrument may
     speak about its type. A section holds paragraphs, and its own
     font size describes nothing anybody can see. */
  var INLINE = ['br', 'b', 'strong', 'i', 'em', 'u', 's', 'sup', 'sub',
                'small', 'span', 'a', 'code', 'mark', 'abbr', 'wbr', 'time'];
  function isTextLeaf(el) {
    var hasText = false;
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3) { if (n.nodeValue.trim()) hasText = true; }
      else if (n.nodeType === 1) {
        if (INLINE.indexOf(n.tagName.toLowerCase()) < 0) return false;
      }
    }
    return hasText;
  }

  function selectorOf(el) {
    var cls = classList(el);
    return el.tagName.toLowerCase() + (cls.length ? '.' + cls.slice(0, 4).join('.') : '');
  }

  /* ---------- WHAT IS THIS ----------
     Returns { name, detail, kind, oro, role, selector, owner }.
     name and detail are what the plate says; kind, when set, names
     the specimen kind whose rich table the drawer borrows. */
  function identify(el) {
    var out = { name: null, detail: '', kind: null, oro: null, role: null, roleHits: null };

    for (var i = 0; i < COMPONENTS.length; i++) {
      var c = COMPONENTS[i];
      if (el.matches && el.matches(c.sel)) {
        out.name = c.name;
        out.kind = c.kind || null;
        out.oro = c.oro || null;
        if (c.detail) { try { out.detail = c.detail(el) || ''; } catch (e) { out.detail = ''; } }
        break;
      }
    }

    /* A line of text is named by the record before it is named by
       its wrapper: «H1 hero» tells a designer more than «Home ·
       hero title», and the class is printed underneath anyway. */
    var TS = window.GB_TYPE_SCALE;
    if (!out.name && TS && isTextLeaf(el)) {
      var cs = getComputedStyle(el);
      var hits = TS.matchAll(cs, window.innerWidth);
      if (hits.length) {
        out.role = hits[0].role;
        out.roleHits = hits;
        out.name = hits[0].role.name;
        out.detail = ((TS.prov[hits[0].role.prov] || {}).word || '').toLowerCase();
        out.oro = 'typography.html#g-' + hits[0].role.g;
      } else {
        out.name = 'Text';
        out.detail = Math.round(parseFloat(cs.fontSize)) + ' at ' +
                     (parseInt(cs.fontWeight, 10) || 400) + ', no role recorded';
        out.oro = 'typography.html';
      }
    }

    if (!out.name) {
      var cls = classList(el);
      for (var f = 0; f < FAMILY.length && !out.name; f++) {
        for (var k = 0; k < cls.length; k++) {
          var m = FAMILY[f][0].exec(cls[k]);
          if (m) { out.name = FAMILY[f][1] + ' · ' + words(m[1]); break; }
        }
      }
    }

    if (!out.name) out.name = TAGS[el.tagName.toLowerCase()] || 'Box';

    out.selector = selectorOf(el);
    out.owner = ownerOf(el);
    return out;
  }

  /* ============================================================
     THE GENERIC READING
     ------------------------------------------------------------
     What any element can be asked. Three tables in the same order
     every time, because a reader who has learnt one element has
     learnt them all (the rule the showcase card lives by, скилл
     7a): the box it occupies, the type it sets, the paint it
     wears. A component with a ladder of its own adds its table
     after these; it does not replace them.
     ============================================================ */

  function sides(cs, prop) {
    return [cs[prop + 'Top'], cs[prop + 'Right'], cs[prop + 'Bottom'], cs[prop + 'Left']]
      .map(function (v) { return px(v); });
  }
  function shortSides(v) {
    if (v[0] === v[1] && v[1] === v[2] && v[2] === v[3]) return v[0];
    if (v[0] === v[2] && v[1] === v[3]) return v[0] + ' ' + v[1];
    return v.join(' ');
  }
  function round1(n) { return Math.round(n * 10) / 10; }

  /* A padding of 8 and 20 is the button's own ladder, not a rung of
     the space scale, and «No token» would read as a fault where
     there is none. The row says what was actually looked for. */
  function spaceRow(label, value) {
    var r = row(label, value, SPACES);
    if (!r.token) r.note = 'not on the space scale';
    return r;
  }

  function geometryBlock(el) {
    var cs = getComputedStyle(el);
    var r = el.getBoundingClientRect();
    var flex = /flex|grid/.test(cs.display);
    var rowsList = [
      row('Size', round1(r.width) + ' × ' + round1(r.height), null, 'the border box, as drawn'),
      row('Display', cs.display, null, 'quiet'),
      spaceRow('Padding', shortSides(sides(cs, 'padding'))),
      spaceRow('Margin', shortSides(sides(cs, 'margin')))
    ];
    if (flex) {
      rowsList.push(spaceRow('Gap',
        cs.rowGap === cs.columnGap ? px(cs.rowGap) : px(cs.rowGap) + ' ' + px(cs.columnGap)));
      if (/flex/.test(cs.display)) rowsList.push(row('Direction', cs.flexDirection, null, 'quiet'));
      rowsList.push(row('Alignment', cs.alignItems + ' · ' + cs.justifyContent, null, 'quiet'));
    }
    if (cs.position !== 'static') {
      rowsList.push(row('Position', cs.position, null,
        'z ' + (cs.zIndex === 'auto' ? 'auto' : cs.zIndex)));
    }
    return block('Box, measured on this element', table(rowsList));
  }

  function typeBlock(el, desc) {
    if (!isTextLeaf(el) && !desc.role) return '';
    var cs = getComputedStyle(el);
    var first = String(cs.fontFamily).split(',')[0].replace(/["']/g, '').trim();
    var rowsList = [
      row('Family', first, FAMS, ''),
      row('Size', px(cs.fontSize), null, 'a rung of the role, not a token'),
      row('Weight', cs.fontWeight, null, 'quiet'),
      row('Line height', cs.lineHeight === 'normal' ? 'normal' : px(cs.lineHeight), null, 'quiet'),
      row('Tracking', cs.letterSpacing === 'normal' ? 'normal' : px(cs.letterSpacing), null, 'quiet'),
      row('Case', cs.textTransform, null, 'quiet'),
      row('Ink', cs.color, INKS, 'quiet')
    ];
    var out = block('Type, measured on this element', table(rowsList));
    var TS = window.GB_TYPE_SCALE;
    if (desc.role && TS) {
      var names = (desc.roleHits || []).map(function (h) { return h.role.name; });
      out += block('Role in the record', chips([
        desc.role.name,
        (TS.prov[desc.role.prov] || {}).word || desc.role.prov,
        desc.role.cls || 'no class yet'
      ]) + '<p class="gbdoc-readout">Ladder: <b>' + esc(TS.ladderText(desc.role)) + '</b>.' +
        (names.length > 1
          ? ' The record holds ' + names.length + ' roles at this size and weight: ' +
            esc(names.join(', ')) + '.'
          : '') + '</p>');
    }
    return out;
  }

  function isClear(c) { return /rgba\(0,\s*0,\s*0,\s*0\)|^transparent$/.test(String(c).trim()); }

  function paintBlock(el) {
    var cs = getComputedStyle(el);
    var bw = parseFloat(cs.borderTopWidth) || 0;
    var rowsList = [
      row('Ground', cs.backgroundColor, isClear(cs.backgroundColor) ? null : INKS,
          isClear(cs.backgroundColor) ? 'nothing painted here' : ''),
      row('Hairline', bw ? px(cs.borderTopWidth) + ' ' + cs.borderTopColor : 'none',
          bw ? INKS : null, bw ? '' : 'no border on this element'),
      row('Radius', px(cs.borderTopLeftRadius), RADII, parseFloat(cs.borderTopLeftRadius) ? '' : 'square'),
      row('Shadow', cs.boxShadow === 'none' ? 'none' : cs.boxShadow,
          cs.boxShadow === 'none' ? null : SHADOWS, cs.boxShadow === 'none' ? 'flat' : ''),
      row('Opacity', cs.opacity, null, 'quiet'),
      row('Transition',
          (cs.transitionDuration === '0s' ? 'none'
            : cs.transitionProperty + ' ' + cs.transitionDuration + ' ' + cs.transitionTimingFunction),
          null, 'quiet')
    ];
    return block('Paint, measured on this element', table(rowsList));
  }

  /* ---------- the declaration a developer can carry away ----------
     A token where the lookup found one, with the rendered pixel in
     the comment beside it; the rendered value alone where it did
     not. Never a token that was not verified against what the
     browser drew. */
  function decl(prop, value, candidates) {
    var t = candidates ? tokenFor(value, candidates) : null;
    return t ? '  ' + prop + ': var(' + t + ');  /* ' + value + ' */'
             : '  ' + prop + ': ' + value + ';';
  }

  function cssBlock(el, desc) {
    var cs = getComputedStyle(el);
    var r = el.getBoundingClientRect();
    var bw = parseFloat(cs.borderTopWidth) || 0;
    var body = [
      decl('display', cs.display, null),
      decl('padding', shortSides(sides(cs, 'padding')), SPACES),
      decl('margin', shortSides(sides(cs, 'margin')), SPACES),
      decl('font-family', String(cs.fontFamily).split(',')[0].replace(/["']/g, '').trim(), FAMS),
      decl('font-size', px(cs.fontSize), null),
      decl('font-weight', cs.fontWeight, null),
      decl('line-height', cs.lineHeight === 'normal' ? 'normal' : px(cs.lineHeight), null),
      decl('color', cs.color, INKS)
    ];
    if (!isClear(cs.backgroundColor)) body.push(decl('background', cs.backgroundColor, INKS));
    if (bw) body.push(decl('border', px(cs.borderTopWidth) + ' ' + cs.borderTopStyle + ' ' + cs.borderTopColor, null));
    if (parseFloat(cs.borderTopLeftRadius)) body.push(decl('border-radius', px(cs.borderTopLeftRadius), RADII));
    if (cs.boxShadow !== 'none') body.push(decl('box-shadow', cs.boxShadow, SHADOWS));

    var head = '/* ' + desc.name + (desc.detail ? ' · ' + desc.detail : '') +
      ', measured at ' + window.innerWidth + 'px wide.\n' +
      '   Box as drawn: ' + Math.round(r.width) + ' × ' + Math.round(r.height) + '. */';
    return block('CSS, as measured', snippet(head + '\n' + desc.selector + ' {\n' + body.join('\n') + '\n}'));
  }

  function classesBlock(el) {
    var cls = classList(el);
    return cls.length ? block('Classes', chips(cls)) : '';
  }

  /* ---------- the drawer ----------
     One per page, created on first use where the page has none, so
     connecting Inspect is a script tag and not a markup edit. */
  function drawerHost() {
    var d = document.querySelector('gb-drawer');
    if (!d) {
      d = document.createElement('gb-drawer');
      document.body.appendChild(d);
    }
    return (d && typeof d.open === 'function') ? d : null;
  }

  function openFor(el) {
    var d = drawerHost();
    if (!d) return;
    var desc = identify(el);
    var body = geometryBlock(el);

    /* A component the showcase already knows how to read is read
       the same way here: one description of Button in the system,
       not two (Ton-6). */
    if (desc.kind && KINDS[desc.kind]) {
      body += KINDS[desc.kind].body(el, KINDS[desc.kind].describe(el));
    } else {
      body += typeBlock(el, desc);
      body += paintBlock(el);
    }
    body += classesBlock(el) + cssBlock(el, desc);

    var foot = desc.owner.file
      ? 'Owner: <code>' + esc(desc.owner.file) + '</code>' +
        (desc.owner.own ? '.' : ', reached through the nearest ancestor that carries a class of the system.')
      : 'Owner: nothing in the system claims this element, so it is the page speaking for itself.';
    if (desc.oro) {
      foot += ' &middot; <a class="gbi-oro" href="' + esc(ROOT + 'system/oro/' + desc.oro) + '">Open in Oro</a>';
    }

    d.open({
      eyebrow: 'Inspect',
      title: desc.name,
      sub: (desc.detail ? esc(desc.detail) + ' &middot; ' : '') +
           '<code>' + esc(desc.selector) + '</code> &middot; measured at ' +
           window.innerWidth + 'px wide',
      html: body,
      foot: foot
    });
  }
  /* ============================================================
     THE SHOWCASE KINDS
     ------------------------------------------------------------
     Three richer readings, for the three things the showcase puts
     on a plinth: a button, a field and a line of type. They arrived
     with the showcase inspector on 26.08 and moved here unchanged
     when Inspect mode needed the same tables on every page. A kind
     says how to find the specimen inside a clicked slot, what to
     call it, which rows to print and what markup to offer; the core
     above is component agnostic and stays that way. Inspect uses a
     kind wherever the recognition table names one, so Button reads
     the same in the prototype as it does on its card.
     ============================================================ */

  /* ---------- what each kind of specimen reports ---------- */
  var SIZE_NAME = { s: 'S', m: 'M', l: 'L', xl: 'XL' };

  var KINDS = {
    button: {
      eyebrow: 'Component',
      name: 'Button',
      owner: 'system/components/button.css',
      find: function (slot) { return slot.querySelector('.gb-btn'); },

      describe: function (el) {
        var m = /gb-btn--(s|m|l|xl)\b/.exec(el.className);
        var size = m ? m[1] : 'l';
        var type = /gb-btn--outline\b/.test(el.className) ? 'outline'
                 : /gb-btn--ghost\b/.test(el.className) ? 'ghost' : 'filled';
        var colour = /gb-btn--secondary\b/.test(el.className) ? 'secondary'
                   : /gb-btn--inverse\b/.test(el.className) ? 'inverse' : 'primary';
        var state = el.disabled || el.classList.contains('is-disabled') ? 'disabled'
                  : el.classList.contains('is-hover') ? 'hover'
                  : el.classList.contains('is-focus') ? 'focus'
                  : el.classList.contains('is-active') ? 'active' : 'rest';
        return { size: size, type: type, colour: colour, state: state };
      },

      title: function (el, d) {
        return d.type + ' ' + d.colour + ', size ' + SIZE_NAME[d.size] +
               (d.state === 'rest' ? '' : ', ' + d.state);
      },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var label = el.querySelector('.gb-btn__label');
        var icon = el.querySelector('.gb-btn__icon');
        var ls = label ? getComputedStyle(label) : null;
        var pre = 'gb-btn-' + d.size;
        var ink = d.type === 'filled' ? 'ink-on-' + d.colour : 'ink-' + d.colour;
        var inkStates = [
          '--gb-btn-' + ink,
          '--gb-btn-' + ink + '-hover',
          '--gb-btn-' + ink + '-active'
        ];
        var fillStates = [
          '--gb-btn-fill-' + d.colour,
          '--gb-btn-fill-' + d.colour + '-hover',
          '--gb-btn-fill-' + d.colour + '-active',
          '--gb-btn-wash-' + (d.colour === 'primary' ? 'accent' : d.colour === 'secondary' ? 'ink' : 'inverse') + '-hover',
          '--gb-btn-wash-' + (d.colour === 'primary' ? 'accent' : d.colour === 'secondary' ? 'ink' : 'inverse') + '-active'
        ];

        var rowsList = [
          row('Height', px(cs.minHeight), rungs('--' + pre + '-h')),
          row('Padding, vertical', px(cs.paddingTop), rungs('--' + pre + '-pad-y')),
          row('Padding, horizontal', px(cs.paddingLeft), rungs('--' + pre + '-pad-x')),
          row('Gap', px(cs.columnGap), rungs('--' + pre + '-gap')),
          row('Label size', ls ? px(ls.fontSize) : 'no label', ls ? rungs('--' + pre + '-label') : null),
          row('Label weight', ls ? ls.fontWeight : 'no label', ls ? ['--gb-btn-label-weight'] : null),
          row('Label tracking', ls ? ls.letterSpacing : 'no label', ls ? ['--gb-btn-label-tracking'] : null),
          row('Case', cs.textTransform, null, 'uppercase at every size'),
          row('Glyph box', icon ? px(getComputedStyle(icon).width) : 'no icon', icon ? rungs('--' + pre + '-icon') : null),
          row('Ground', cs.backgroundColor, fillStates, d.type === 'filled' ? '' : 'transparent at rest'),
          row('Ink', cs.color, inkStates),
          row('Hairline width', px(cs.borderTopWidth),
              parseFloat(cs.borderTopWidth) ? ['--gb-btn-border-width'] : null,
              parseFloat(cs.borderTopWidth) ? '' : 'none on this type'),
          row('Hairline colour', parseFloat(cs.borderTopWidth) ? cs.borderTopColor : 'none',
              parseFloat(cs.borderTopWidth) ? inkStates : null,
              parseFloat(cs.borderTopWidth) ? '' : 'none on this type'),
          row('Radius', px(cs.borderTopLeftRadius), ['--gb-btn-radius', '--radius']),
          row('Transition', cs.transitionDuration.split(',')[0].trim() + ' ' + cs.transitionTimingFunction.split(') ').join(') ').split(',').slice(0, 4).join(',').trim(),
              null, 'colour, background, border and opacity'),
          row('Opacity', cs.opacity, d.state === 'disabled' ? ['--gb-btn-disabled-opacity'] : null)
        ];

        var mods = el.className.split(/\s+/).filter(function (c) { return c.indexOf('gb-btn') === 0; });
        var demo = el.className.split(/\s+/).filter(function (c) { return /^is-/.test(c); });

        var code = '<button class="' + mods.join(' ') + '" type="button">\n' +
          (icon && icon === el.firstElementChild ? '  <span class="gb-btn__icon"><svg>...</svg></span>\n' : '') +
          (label ? '  <span class="gb-btn__label">' + label.textContent + '</span>\n' : '') +
          (icon && icon === el.lastElementChild ? '  <span class="gb-btn__icon"><svg>...</svg></span>\n' : '') +
          '</button>';

        return block('Properties, measured on this specimen', table(rowsList)) +
          block('Modifiers', chips(mods)) +
          (demo.length ? block('Demo only, never on a product page', chips(demo)) : '') +
          block('Markup', snippet(code));
      }
    },

    /* ---------- gbppl-oro-typography-1: a type role ----------
       The third kind, and the first one that is not a component.
       A specimen here is a line of text, and the seven things worth
       knowing about a line of text are its family, size, weight,
       line height, tracking, case and ink.

       Two shapes of specimen arrive. One WEARS A CLASS: an eyebrow,
       a button label, a badge. The instrument reads a stylesheet and
       names the token behind each value. The other has NO CLASS,
       because the system has not given that role one yet; the page
       draws it from the recorded ladder and the drawer says so out
       loud instead of offering markup nobody can copy.

       The role, its provenance and its ladder come from the page
       through window.GbTypeRoles, so the record lives in exactly
       one place. */
    type: {
      eyebrow: 'Type role',
      name: function (el, d) { return d.role ? d.role.name : 'Type role'; },
      owner: function (el, d) {
        if (!d.role || !d.role.cls) return 'studio/system/TYPE-SCALE.md, the recorded ladder';
        if (d.role.cls === '.gb-eyebrow') return 'system/components/shell.css, tokens --eyebrow-*';
        if (d.role.cls === '.gbh-count') return 'system/components/header.css, tokens --count-badge-*';
        return 'system/components/button.css, the label and type slots of tokens.css';
      },
      /* The clicked line wins over the first line in the slot: a
         specimen block holds six roles inside one slot. */
      find: function (slot, target) {
        var t = target && target.closest ? target.closest('[data-role], [data-spec]') : null;
        return t || slot.querySelector('[data-role], [data-spec]');
      },

      describe: function (el) {
        var api = window.GbTypeRoles || {};
        return { role: api.roleOf ? api.roleOf(el) : null, api: api };
      },

      title: function (el, d) {
        if (!d.role) return 'measured on this specimen';
        var p = (d.api.prov || {})[d.role.prov];
        return (p ? p.word.toLowerCase() : 'recorded') + ', ' +
               (d.role.cls ? d.role.cls : 'role without a class yet');
      },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var role = d.role;
        var first = String(cs.fontFamily).split(',')[0].replace(/["']/g, '').trim();
        var famToken = /noto serif/i.test(first) ? '--font-serif'
                     : /inter/i.test(first) ? '--font-sans' : null;
        var cls = role && role.cls ? role.cls : '';
        var btn = /gb-btn--(s|m|l|xl)/.exec(cls);
        var sizeTokens = null, weightTokens = null, trackKnown = null;

        if (cls === '.gb-eyebrow') {
          sizeTokens = ['--eyebrow-size'];
          weightTokens = ['--eyebrow-weight'];
          trackKnown = '--eyebrow-tracking';
        } else if (cls === '.gbh-count') {
          sizeTokens = ['--count-badge-font-size'];
          weightTokens = ['--count-badge-font-weight'];
        } else if (btn && /__label/.test(cls)) {
          var p = '--gb-btn-' + btn[1] + '-label';
          sizeTokens = [p, p + '-sm', p + '-md', p + '-xl', p + '-2xl'];
          weightTokens = ['--gb-btn-label-weight'];
          trackKnown = '--gb-btn-label-tracking';
        } else if (btn) {
          sizeTokens = rungs('--gb-btn-' + btn[1] + '-font-size');
          weightTokens = ['--gb-btn-' + btn[1] + '-font-weight'];
        }

        var inks = ['--zinc-950', '--zinc-900', '--zinc-800', '--zinc-700',
                    '--zinc-600', '--zinc-500', '--zinc-400', '--blue-600',
                    '--blue-700', '--white'];

        var rowsList = [
          knownRow('Family', first, null, famToken),
          row('Size', px(cs.fontSize), sizeTokens, sizeTokens ? '' : 'recorded, not tokenised'),
          row('Weight', cs.fontWeight, weightTokens, weightTokens ? '' : 'recorded, not tokenised'),
          row('Line height', cs.lineHeight === 'normal' ? 'normal' : px(cs.lineHeight), null,
              cs.lineHeight === 'normal' ? 'never recorded for this role' : 'recorded, not tokenised'),
          knownRow('Tracking', cs.letterSpacing === 'normal' ? 'normal' : px(cs.letterSpacing),
                   null, trackKnown, 'recorded, not tokenised'),
          row('Case', cs.textTransform, null, 'a property of the role'),
          row('Ink', cs.color, inks, 'inherited from the surface unless the role records one')
        ];

        var out = block('Properties, measured on this specimen', table(rowsList));

        if (role) {
          var pw = (d.api.prov || {})[role.prov];
          out += block('Role', chips([
            role.name,
            pw ? pw.word : role.prov,
            role.cls || 'no class yet'
          ]));
          if (d.api.ladderText) {
            out += block('Size ladder, as recorded', '<p class="gbdoc-readout"><b>' +
              esc(d.api.ladderText(role)) + '</b></p>');
          }
          if (role.note) {
            out += block('Note', '<p class="gbdoc-readout">' + esc(role.note) + '</p>');
          }
        }

        if (role && role.cls) {
          out += block('Markup', snippet(
            cls === '.gb-eyebrow' ? '<span class="gb-eyebrow">Section label</span>'
            : cls === '.gbh-count' ? '<span class="gbh-count">3</span>'
            : btn && /__label/.test(cls)
              ? '<button class="gb-btn gb-btn--' + btn[1] + '" type="button">\n' +
                '  <span class="gb-btn__label">Continue</span>\n</button>'
              : '<button class="gb-btn gb-btn--' + btn[1] + '" type="button">\n' +
                '  <span class="gb-btn__label">Continue</span>\n</button>'
          ));
        } else {
          out += block('Markup', '<p class="gbdoc-readout">There is none yet. This role has no class in the ' +
            'system, so the specimen above is drawn from the recorded ladder rather than from a stylesheet. ' +
            'A class for it is a decision, not a cleanup.</p>');
        }
        return out;
      }
    },

    field: {
      eyebrow: 'Component',
      name: 'Field',
      owner: 'system/components/auth.css',
      find: function (slot) { return slot.querySelector('.gba-input'); },

      describe: function (el) {
        var state = el.disabled ? 'disabled'
                  : el.classList.contains('invalid') ? 'error'
                  : el.classList.contains('is-hover') ? 'hover'
                  : el.classList.contains('is-focus') ? 'focus'
                  : el.value ? 'filled' : 'empty';
        return { state: state, area: el.tagName === 'TEXTAREA' };
      },

      title: function (el, d) { return (d.area ? 'multi line' : 'single line') + ', ' + d.state; },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var lab = el.id ? document.querySelector('label[for="' + el.id + '"]') : null;
        var lsty = lab ? getComputedStyle(lab) : null;
        var rowsList = [
          row('Height', px(d.area ? cs.height : cs.minHeight), ['--gba-input-h', '--gba-input-h-xl', '--gba-input-h-2xl']),
          row('Padding, horizontal', px(cs.paddingLeft), null),
          row('Type size', px(cs.fontSize), null),
          row('Type weight', cs.fontWeight, null),
          row('Underline', px(cs.borderBottomWidth) + ' ' + cs.borderBottomColor, ['--zinc-400', '--blue-600', '--red-500']),
          row('Label size', lsty ? px(lsty.fontSize) : 'no label', null),
          row('Label tracking', lsty ? lsty.letterSpacing : 'no label', null),
          row('Ink', cs.color, ['--zinc-900', '--zinc-700']),
          row('Radius', px(cs.borderTopLeftRadius), null, 'the field is an underline, not a box')
        ];
        var mods = el.className.split(/\s+/).filter(Boolean);
        var code = '<gb-field input-id="' + (el.id || 'email') + '" name="' + (el.name || 'email') + '"\n' +
          '          type="' + (d.area ? 'textarea' : (el.type || 'text')) + '" label="' + (lab ? lab.textContent : 'Label') + '"></gb-field>';
        return block('Properties, measured on this specimen', table(rowsList)) +
          block('Classes', chips(mods)) +
          block('Markup', snippet(code));
      }
    }
  };


  /* ============================================================
     THE SHOWCASE REGIONS (unchanged behaviour)
     ------------------------------------------------------------
     A region marked data-inspect="<kind>" hands its specimens to
     the kind above, in View mode as well as in Inspect: the
     showcase was clickable before this file existed and stays
     clickable, and a reader on system\oro\* does not have to turn
     a mode on to read a specimen.
     ============================================================ */
  function slotOf(target) {
    if (!target || !target.closest) return null;
    return target.closest('[data-inspect] .gbdoc-slot, [data-inspect] .gbdoc-cell, ' +
                          '[data-inspect] .gbdoc-hold, [data-inspect] .gbdoc-type__live');
  }

  function openShowcase(target) {
    if (!target || !target.closest) return false;
    if (target.closest('.gbd-panel')) return false;   /* inside the drawer itself */
    if (target.closest('[data-axis]')) return false;  /* a control chip, not a specimen */
    var slot = slotOf(target);
    if (!slot) return false;
    var region = slot.closest('[data-inspect]');
    var kind = KINDS[region.getAttribute('data-inspect')];
    if (!kind) return false;
    /* The clicked element is handed to find as well as the slot: a
       component slot holds one specimen, but a type specimen block
       holds six roles in one slot and the reader means the line
       under the pointer. Kinds that do not care ignore it. */
    var el = kind.find(slot, target);
    if (!el) return false;
    var d = drawerHost();
    if (!d) return false;

    var info = kind.describe(el);
    var name = typeof kind.name === 'function' ? kind.name(el, info) : kind.name;
    var owner = typeof kind.owner === 'function' ? kind.owner(el, info) : kind.owner;
    d.open({
      eyebrow: kind.eyebrow,
      title: name,
      sub: kind.title(el, info) + ' &middot; measured at ' + window.innerWidth + 'px wide',
      html: kind.body(el, info),
      foot: 'Owner: <code>' + owner + '</code>. Every number above was read off this specimen with ' +
            'getComputedStyle at the current window width.'
    });
    return true;
  }

  document.addEventListener('click', function (e) {
    if (MODE === 'inspect') return;   /* Inspect has its own handler, in capture */
    openShowcase(e.target);
  });

  /* Copy, inside the drawer and anywhere else a snippet is drawn. */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.gbdoc-copy') : null;
    if (!btn) return;
    var pre = btn.parentNode.querySelector('code');
    if (!pre) return;
    var done = function () {
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = 'Copy'; }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pre.textContent).then(done, done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = pre.textContent;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (err) { /* nothing else to try */ }
      document.body.removeChild(ta);
    }
  });

  /* ============================================================
     THE OVERLAY
     ------------------------------------------------------------
     One layer, absolute children, nothing written on the page. It
     is redrawn on a frame from the last known pointer target and
     again on scroll and resize, because a fixed layer over a
     scrolling page has to be told the page moved.
     ============================================================ */
  var layer = null, hovered = null, frame = 0;

  function makeLayer() {
    if (layer) return layer;
    layer = document.createElement('div');
    layer.className = 'gbi-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.hidden = true;
    document.body.appendChild(layer);
    return layer;
  }

  function piece(cls, l, t, w, h) {
    if (!(w > 0.5) || !(h > 0.5)) return null;
    var n = document.createElement('div');
    n.className = cls;
    n.style.left = l + 'px';
    n.style.top = t + 'px';
    n.style.width = w + 'px';
    n.style.height = h + 'px';
    layer.appendChild(n);
    return n;
  }

  /* A number is printed where the side is 4px or more: under that
     there is nothing to read and the digits would sit on top of
     each other. */
  function number(cls, value, x, y) {
    if (value < 4) return;
    var n = document.createElement('span');
    n.className = 'gbi-num ' + cls;
    n.textContent = Math.round(value * 10) / 10;
    n.style.left = x + 'px';
    n.style.top = y + 'px';
    layer.appendChild(n);
  }

  function num(v) { return parseFloat(v) || 0; }

  function paint(el) {
    makeLayer();
    layer.innerHTML = '';
    layer.hidden = false;

    var r = el.getBoundingClientRect();
    var cs = getComputedStyle(el);
    var mt = num(cs.marginTop), mr = num(cs.marginRight),
        mb = num(cs.marginBottom), ml = num(cs.marginLeft);
    var pt = num(cs.paddingTop), pr = num(cs.paddingRight),
        pb = num(cs.paddingBottom), pl = num(cs.paddingLeft);

    /* Margin first, outside and underneath. */
    if (mt > 0) piece('gbi-mar', r.left - Math.max(ml, 0), r.top - mt, r.width + Math.max(ml, 0) + Math.max(mr, 0), mt);
    if (mb > 0) piece('gbi-mar', r.left - Math.max(ml, 0), r.bottom, r.width + Math.max(ml, 0) + Math.max(mr, 0), mb);
    if (ml > 0) piece('gbi-mar', r.left - ml, r.top, ml, r.height);
    if (mr > 0) piece('gbi-mar', r.right, r.top, mr, r.height);

    /* Padding, inside. */
    if (pt > 0) piece('gbi-pad', r.left, r.top, r.width, pt);
    if (pb > 0) piece('gbi-pad', r.left, r.bottom - pb, r.width, pb);
    if (pl > 0) piece('gbi-pad', r.left, r.top + pt, pl, r.height - pt - pb);
    if (pr > 0) piece('gbi-pad', r.right - pr, r.top + pt, pr, r.height - pt - pb);

    /* The gap this element leaves to the sibling beside it, where
       the parent declares one. Inner space, so it speaks in the
       padding colour rather than in a third hue. */
    var parent = el.parentElement;
    if (parent) {
      var pcs = getComputedStyle(parent);
      if (/flex|grid/.test(pcs.display)) {
        var next = el.nextElementSibling;
        if (next) {
          var nr = next.getBoundingClientRect();
          if (nr.width && nr.height) {
            var hgap = nr.left - r.right;
            var vgap = nr.top - r.bottom;
            if (hgap > 0.5 && Math.abs(nr.top - r.top) < r.height) {
              piece('gbi-gap', r.right, Math.max(r.top, nr.top), hgap,
                    Math.min(r.bottom, nr.bottom) - Math.max(r.top, nr.top));
              number('gbi-num--pad', hgap, r.right + hgap / 2, r.top + r.height / 2);
            } else if (vgap > 0.5) {
              piece('gbi-gap', Math.max(r.left, nr.left), r.bottom,
                    Math.min(r.right, nr.right) - Math.max(r.left, nr.left), vgap);
              number('gbi-num--pad', vgap, r.left + r.width / 2, r.bottom + vgap / 2);
            }
          }
        }
      }
    }

    /* The box itself, over both fills. */
    piece('gbi-box', r.left, r.top, r.width, r.height);

    number('gbi-num--pad', pt, r.left + r.width / 2, r.top + pt / 2);
    number('gbi-num--pad', pb, r.left + r.width / 2, r.bottom - pb / 2);
    number('gbi-num--pad', pl, r.left + pl / 2, r.top + r.height / 2);
    number('gbi-num--pad', pr, r.right - pr / 2, r.top + r.height / 2);
    number('gbi-num--mar', mt, r.left + r.width / 2, r.top - mt / 2);
    number('gbi-num--mar', mb, r.left + r.width / 2, r.bottom + mb / 2);
    number('gbi-num--mar', ml, r.left - ml / 2, r.top + r.height / 2);
    number('gbi-num--mar', mr, r.right + mr / 2, r.top + r.height / 2);

    /* The plate: what it is, and how big. */
    var d = identify(el);
    var badge = document.createElement('div');
    badge.className = 'gbi-badge';
    badge.innerHTML = '<b>' + esc(d.name) + '</b>' +
      (d.detail ? '<i>' + esc(d.detail) + '</i>' : '') +
      '<em>' + round1(r.width) + ' × ' + round1(r.height) + '</em>';
    layer.appendChild(badge);

    /* Where the plate goes, in order of preference: above the box,
       which is where a reader looks for a label; failing that just
       inside its top edge, which is what a full page section gets;
       failing that under it. The window is measured without its
       scrollbars, or the plate lands half under one. */
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;
    var bw = badge.offsetWidth, bh = badge.offsetHeight;
    var top;
    if (r.top - bh - 4 >= 4) top = r.top - bh - 4;
    else if (r.height > bh + 8) top = Math.max(4, r.top + 4);
    else top = r.bottom + 4;
    top = Math.min(Math.max(top, 4), Math.max(4, vh - bh - 4));
    badge.style.left = Math.min(Math.max(r.left, 4), Math.max(4, vw - bw - 4)) + 'px';
    badge.style.top = top + 'px';
  }

  function clearOverlay() {
    if (layer) { layer.innerHTML = ''; layer.hidden = true; }
  }

  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(function () {
      frame = 0;
      if (MODE !== 'inspect' || !hovered || !hovered.isConnected) { clearOverlay(); return; }
      paint(hovered);
    });
  }

  /* ============================================================
     THE MODE
     ------------------------------------------------------------
     Remembered per tab, in sessionStorage: a mode is a thing you
     are doing right now, not a preference, and it should not
     follow the reader into tomorrow.
     ============================================================ */
  var KEY = 'gbppl-inspect-mode';
  var MODE = 'view';
  var handle = null;
  var drawerOpen = false;

  function isChrome(el) {
    if (!el || !el.closest) return true;
    return !!el.closest('gb-studio-panel, .gbsp, .gbd-panel, .gbd-scrim, .gbi-layer');
  }

  /* ---------- what the pointer means ----------
     The deepest element under the pointer is not always the thing
     the reader is pointing at. Hover a button and the pointer is
     over its label span; the answer «Button label, 110 × 13» is
     literally true and useless, because a button is read as ONE
     object and its label is a part of it, not a sibling of it.

     So a handful of components are SOLID: point anywhere inside
     one and you get the whole. Hold Alt to switch that off and
     take the exact element under the pointer, which is how a
     developer gets to the label, the glyph or the wrapper. */
  var SOLID = '.gb-btn, .gbh-count, .gbh-beta, .gbh-icon-button, .gbb-day, ' +
              '.gbb-slot, .gbs-chip, .gb-eyebrow, .gbh-navitem, .gbh-link';
  function resolveTarget(el, drill) {
    if (drill || !el || !el.closest) return el;
    return el.closest(SOLID) || el;
  }

  function setMode(next) {
    next = next === 'inspect' ? 'inspect' : 'view';
    MODE = next;
    try { sessionStorage.setItem(KEY, next); } catch (e) { /* private window */ }
    document.documentElement.classList.toggle('gbi-on', next === 'inspect');
    if (next !== 'inspect') { hovered = null; clearOverlay(); }
    if (handle) handle.setActive(next);
  }

  document.addEventListener('pointermove', function (e) {
    if (MODE !== 'inspect') return;
    var t = e.target;
    if (isChrome(t) || t === document.documentElement) { hovered = null; schedule(); return; }
    t = resolveTarget(t, e.altKey);
    if (t !== hovered) { hovered = t; schedule(); }
  }, { passive: true });

  document.addEventListener('pointerleave', function () {
    if (MODE !== 'inspect') return;
    hovered = null;
    schedule();
  });

  window.addEventListener('scroll', function () { if (MODE === 'inspect') schedule(); }, { passive: true });
  window.addEventListener('resize', function () { if (MODE === 'inspect') schedule(); });

  /* A click while inspecting is a question about the element, not
     a command to the page. Capture and stop, so nothing behind
     the pointer ever hears it: a link is something to look at. */
  document.addEventListener('click', function (e) {
    if (MODE !== 'inspect' || isChrome(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    if (!openShowcase(e.target)) openFor(resolveTarget(e.target, e.altKey));
  }, true);

  document.addEventListener('mousedown', function (e) {
    if (MODE !== 'inspect' || isChrome(e.target)) return;
    e.preventDefault();
  }, true);

  document.addEventListener('submit', function (e) {
    if (MODE !== 'inspect') return;
    e.preventDefault();
  }, true);

  document.addEventListener('gbd:open', function () { drawerOpen = true; });
  document.addEventListener('gbd:close', function () { drawerOpen = false; });

  /* i switches, Esc leaves. The Cyrillic ш is the same physical
     key and costs one comparison. */
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' ||
                       t.tagName === 'SELECT' || t.isContentEditable);
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'i' || e.key === 'I' || e.key === 'ш' || e.key === 'Ш') {
      e.preventDefault();
      setMode(MODE === 'inspect' ? 'view' : 'inspect');
      return;
    }
    if (e.key === 'Escape' && MODE === 'inspect') {
      /* The drawer takes the first Esc, and an open console takes
         it before either of us: three things listen for one key
         and each of them gives way to the one on top. */
      if (drawerOpen) return;
      if (document.querySelector('.gbsp:not(.is-collapsed)')) return;
      setMode('view');
    }
  });

  /* ---------- the switch in the console ----------
     The console owns the look and the place (gbppl-panel-6); this
     file owns what the switch does. addSegments is called after
     the element is defined, so script order on the page cannot
     lose the Mode section. */
  function mountSwitch() {
    var panel = document.querySelector('gb-studio-panel');
    if (!panel) return;
    var go = function () {
      if (typeof panel.addSegments !== 'function') return;
      handle = panel.addSegments({
        title: 'Mode',
        value: MODE,
        options: [
          { label: 'View', value: 'view',
            note: 'The page behaves as it does for a visitor.' },
          { label: 'Inspect', value: 'inspect',
            note: 'Hover for the box, click for properties. Keys: i switches, Alt drills in, Esc leaves.' }
        ],
        onChange: function (v) { setMode(v); }
      });
    };
    if (window.customElements && customElements.whenDefined) {
      customElements.whenDefined('gb-studio-panel').then(go);
    } else {
      go();
    }
  }

  function start() {
    var saved = null;
    try { saved = sessionStorage.getItem(KEY); } catch (e) { /* private window */ }
    mountSwitch();
    setMode(saved === 'inspect' ? 'inspect' : 'view');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  /* ---------- what the page may borrow ----------
     The showcase builds live tables of its own and they must name
     tokens the same way the drawer does, so the lookup is
     published rather than written twice. identify and openFor are
     published for the same reason: a page that wants to open the
     properties of something without waiting for a click can. */
  window.GbInspect = {
    tokenFor: tokenFor, tokenValue: tokenValue, px: px, norm: norm, rungs: rungs,
    identify: identify, openFor: openFor,
    setMode: setMode, mode: function () { return MODE; },
    register: function (name, spec) { KINDS[name] = spec; }
  };
})();
