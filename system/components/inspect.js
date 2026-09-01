/* ============================================================
   gbppl-inspect-1 / gbppl-oro-icons-1 / gbppl-oro-drawer-1 /
   gbppl-inspect-scale-1 / gbppl-oro-props-1
   — INSPECT MODE, THE CORE
   ------------------------------------------------------------
   gbppl-oro-props-1 (29.08) TOOK THE CLICK BACK OFF THE SPECIMEN.
   Ton, 12:34, with a screenshot: he could not click a field, and a
   Select would not open, because the properties drawer opened
   instead. In View mode the showcase specimen is now a live
   component and nothing else, and the drawer has its own door: an
   icon button in the corner of the specimen's box, hung by this
   file on every slot of every data-inspect region, invisible until
   the pointer or the keyboard is on that box. Inspect mode is
   untouched — there the click is still the question, because there
   nothing on the page is meant to answer it. See THE SHOWCASE
   REGIONS, AND THE DOOR TO THE PROPERTIES below.

   gbppl-inspect-scale-1 (29.08) moved ONE line: the instrument
   reads token values off a hidden probe inside <gb-studio-panel>
   instead of off document.documentElement. Found on the run of the
   show route: on the vendored catalog the instrument was naming
   the BUILD's tokens, because the build spells --space-8/16/24 as
   32 / 64 / 96 on :root and our scale is restored only on a list
   of islands. See WHERE THE SCALE IS READ below. Nothing else in
   this file moved, and every page without a foreign bundle reads
   exactly as it did before, word for word.

   gbppl-oro-icons-1 (28.08) added two rows to the recognition
   table and two kinds beside them, Icon button and Icon, plus one
   owner prefix. Nothing else in this file moved.

   gbppl-oro-cleanup-1 (28.08) let a kind name the two lines around
   its drawer body. `sub` and `foot` were printed here for every
   kind and both said «measured at this width with getComputedStyle»,
   which is a lie on the registry cards of components.html, whose
   words are read off the census. A kind that does not mention them
   keeps them word for word. See THE SHOWCASE KINDS below.

   gbppl-oro-drawer-1 (28.08) added ONE kind, Drawer head, for the
   specimen on system\oro\drawer.html, and widened one guard by a
   single `:not()` so that a drawn panel counts as a specimen while
   the real one still does not. The recognition table was
   deliberately left alone, so the drawer standing on fourteen other
   pages reads exactly as it did before (verified byte for byte on
   live/index.html).
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

   ------------------------------------------------------------
   gbppl-inspect-2 (27.08). The order, from the team through Ton
   after the second showing: «Всем очень понравился Inspect, просят
   показывать больше данных и чётче». Six things came of it, and
   none of them changed the law that the instrument never invents.

   · THE PLATE IS TWO LINES. Name on the first and heavier, size and
     modifiers on the second. The answer is now the first word.
   · DISTANCES TO THE NEIGHBOURS. Hold Alt, or open the drawer on an
     element, and each side grows a hairline to the nearest sibling
     that really overlaps it, with the number in a plate. Dashed
     where there is no sibling and the run goes to the parent's
     content edge. Blue 600, never red: red means an error here.
   · WHERE IT LIVES CAME TO THE TOP. Owner file and «Open in Oro»
     are the first line of the drawer body, above the tables; the
     foot keeps the provenance of the numbers.
   · PADDING NAMES ITS RUNGS. «24 = --space-24 · 8 off the scale»
     instead of one flat «not on the space scale» for a shorthand
     that holds two different lengths.
   · CONTRAST. Ink against the composited ground, graded AA / AAA at
     the WCAG threshold for the size and weight actually rendered,
     with the ground's owner named where it is not the element's own.
   · STATE, RIGHT NOW. What the browser answers to matches() beside
     what the markup declares. Where the two disagree, that is the
     finding.

   The console's device frame (gbppl-panel-7) needs one wire from
   here: setMode announces itself with a gbi:mode event, the console
   forwards it into the frame, and the copy of this file inside the
   frame hears it as a message. Nothing else crosses.

   ------------------------------------------------------------
   WHAT COMMENT MODE BORROWS (gbppl-comments-b, 28.08)
   ------------------------------------------------------------
   The third position of the Mode toggle belongs to
   system\components\comments.js, and it points at elements for a
   living: a comment belongs to an element, so it asks the same
   questions this file already answers — which element the pointer
   means, what to call it, which file owns it. Nothing was copied
   over there. Six methods went onto window.GbInspect instead
   (target, isChrome, outline, outlineOff, lede, onModeSwitch, see
   the foot of this file), plate() came out of paint() so both modes
   draw the same label, and setMode was taught to ignore a value that
   is not its own. Recognition, ownership and the plate stay here,
   with one definition each.
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
  /* gbppl-inspect-scale-1. WHERE THE SCALE IS READ.
     The instrument used to ask document.documentElement what a token
     is worth, and on live/catalog/index.html that is the wrong mouth.
     The vendored bundle declares --space-8/16/24 on :root as a 4px
     step INDEX (32 / 64 / 96) under the same three names our scale
     spends in pixels (ловушка 7б), and live/catalog/oro-ui-override.css
     hands those three back to the build on :root while restoring ours
     on a LIST OF ISLANDS — gb-studio-panel among them (ловушки 19 и
     21). The page really does hold two scales at once, so reading off
     the html element made the instrument quote the build's: the
     header Book a meeting printed «Padding 8px 20px · 8 off the
     scale», a gift card's 24px gap was named --container-pad and the
     grid's 16px gap --container-pad-narrow — the lookup fell past a
     --space-24 answering 96px and landed on the next token that
     happened to measure 24.

     It now reads from a hidden probe inside <gb-studio-panel>, the
     studio's own island, where our scale is in force on every page.
     Custom properties are inherited and are computed by substitution
     alone, so display:none costs the probe nothing and no length is
     resolved against its font or its box: the pages without a foreign
     bundle answer exactly what they answered before, word for word.
     No panel on the page (a bare specimen, a frame) and it falls back
     to the html element, which is right wherever there is no
     collision. */
  var probe = null;
  function scaleHost() {
    if (probe && probe.isConnected) return probe;
    probe = null;
    var panel = document.querySelector('gb-studio-panel');
    if (!panel) return root;
    /* The panel writes its own innerHTML once, in connectedCallback,
       so the probe is re-hung whenever it has been swept away. */
    probe = document.createElement('span');
    probe.className = 'gbi-probe';
    probe.setAttribute('aria-hidden', 'true');
    probe.hidden = true;
    probe.style.display = 'none';
    panel.appendChild(probe);
    return probe;
  }
  function tokenValue(name) {
    return getComputedStyle(scaleHost()).getPropertyValue(name).trim();
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
    [/^gb-toggle/, 'system/components/toggle.css'],
    /* gbppl-inputnumber-1. The frame had no deed of its own and read
       its owner off an ancestor; the rename is the moment to write
       the купчая down, one prefix like every other row. */
    [/^gb-inputnumber/, 'system/components/inputnumber.css'],
    [/^gb-icon/, 'system/components/icon.css'],
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
    { sel: '.gb-btn__icon', name: 'Button glyph', oro: 'icons.html#icon' },
    /* gbppl-oro-icons-1. The round one stands ABOVE the labelled
       one: a circle with no label is a different reading, and the
       rule of this table is that the smaller, more specific thing
       comes first. */
    { sel: '.gb-btn--icon', name: 'Icon button', kind: 'iconbutton', oro: 'icons.html#iconbutton',
      detail: function (el) {
        var d = KINDS.iconbutton.describe(el);
        return d.role + ' · ' + d.wash + ' · ' + d.type + ' ' + d.colour;
      } },
    { sel: '.gb-icon', name: 'Icon', kind: 'icon', oro: 'icons.html#icon',
      detail: function (el) {
        var m = /gb-icon--(\d+)\b/.exec(String(el.className));
        return m ? m[1] + 'px' : 'default rung';
      } },
    { sel: '.gb-btn', name: 'Button', kind: 'button', oro: 'button.html#buttons',
      detail: function (el) {
        var d = KINDS.button.describe(el);
        return d.type + ' ' + d.colour + ' · ' + SIZE_WORD[d.size] +
               (d.state === 'rest' ? '' : ' · ' + d.state);
      } },

    /* gbppl-lab-f-2. The item first, the group second, the rule of
       this table: a person pointing at ONE ADDRESS is pointing at a
       half of a control, and the half is what is under the cursor.
       The group carries the reading, so the item's row is a name and
       nothing else. */
    /* gbppl-toggle-family-1: the control has a page of its own now, so
       both rows point at it instead of at the shelf it stood on. */
    { sel: '.gb-toggle__item', name: 'Toggle item', oro: 'toggle.html#anatomy' },
    { sel: '.gb-toggle', name: 'Toggle button', kind: 'toggle', oro: 'toggle.html#toggle',
      detail: function (el) {
        var d = KINDS.toggle.describe(el);
        return d.count + ' values · ' + (d.chosen || 'nothing chosen') +
               (d.host ? ' · host driven' : '');
      } },

    /* gbppl-oro-select-stepper-1. The input number stands above the field
       rows because its well IS an input, and above nothing else: a
       frame is not a button and does not collide with the rows over
       it. The two glyph buttons inside it keep reading as icon
       buttons, which is what they are. */
    { sel: '.gb-inputnumber__value', name: 'Input number value', oro: 'inputnumber.html#anatomy' },
    { sel: '.gb-inputnumber', name: 'Input number', kind: 'inputnumber', oro: 'inputnumber.html#inputnumber',
      detail: function (el) {
        var d = KINDS.inputnumber.describe(el);
        return d.size + ' · ' + d.well + (d.host ? ' · host driven' : '') +
               (d.state === 'rest' ? '' : ' · ' + d.state);
      } },

    /* gbppl-oro-field-2. The four other looks of the field, above the
       plain one because the rule of this table is that the smaller,
       more specific thing comes first. The phone row is also a
       .gba-inputwrap and the floating wrapper is also a .gba-field, so
       both have to stand over the general rows or they would never be
       reached. */
    { sel: '.gba-otp input', name: 'One time code cell', oro: 'field.html#otp' },
    { sel: '.gba-otp', name: 'One time code', oro: 'field.html#otp' },
    { sel: '.gba-vlabel', name: 'One time code label', oro: 'field.html#label' },
    { sel: '.gba-eye', name: 'Password reveal', oro: 'field.html#password' },
    { sel: '.gbb-phone-option', name: 'Country option', oro: 'field.html#phone' },
    { sel: '.gbb-phone-menu', name: 'Country list', oro: 'field.html#phone' },
    { sel: '.gbb-phone-trigger', name: 'Country code', oro: 'field.html#phone' },
    { sel: '.gbb-phone', name: 'Phone field', oro: 'field.html#phone' },
    { sel: '.gba-field--floating', name: 'Field, floating label', oro: 'field.html#floating' },

    /* gbppl-oro-select-stepper-1: the fourth look. The control is a
       <select> wearing .gba-input, so it has to be named before the
       plain field row or it would answer «Field» forever. */
    { sel: 'select.gba-input', name: 'Select', kind: 'select', oro: 'select.html#select',
      detail: function (el) { return KINDS.select.describe(el).state; } },
    { sel: '.gba-select', name: 'Select', kind: 'select', oro: 'select.html#select' },

    { sel: '.gba-textarea', name: 'Field', kind: 'field', oro: 'field.html#fields',
      detail: function () { return 'multi line'; } },
    { sel: '.gba-input', name: 'Field', kind: 'field', oro: 'field.html#fields',
      detail: function (el) { return 'single line · ' + KINDS.field.describe(el).state; } },
    { sel: '.gba-label', name: 'Field label', oro: 'field.html#fields' },
    { sel: '.gba-inputwrap', name: 'Field box', oro: 'field.html#fields' },
    { sel: 'gb-field, .gba-field', name: 'Field', oro: 'field.html#fields' },
    { sel: '.gba-error', name: 'Field error' },
    { sel: '.gba-submit', name: 'Form submit' },
    { sel: '.gba-form', name: 'Form' },

    { sel: '.gb-eyebrow', name: 'Eyebrow', oro: 'eyebrow.html#eyebrow' },
    { sel: '.gbh-count', name: 'Count badge', oro: 'badge.html#badge' },
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

    /* gbppl-sandbox-md-1: the rail of projects on the shelf. Above
       .gbs-door on purpose, by the rule of this table (the smaller
       part stands above the whole), even though the two do not nest
       today: the day a rail item lands inside a card, the answer is
       already right. */
    { sel: '.gbs-plink', name: 'Project rail item' },
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
  /* gbppl-inspect-2. A shorthand of 24px 16px is two rungs, not one
     missing token, and «not on the space scale» said nothing about
     either. The note now names the rung SIDE BY SIDE with the number
     that produced it — 24 = --space-24 — and says plainly which of
     them is off the scale. Zero is not reported: nobody is looking
     for the token behind nothing. */
  function scaleNote(shorthand) {
    var seen = [], bits = [];
    String(shorthand).split(/\s+/).forEach(function (v) {
      if (seen.indexOf(v) >= 0) return;
      seen.push(v);
      if (!parseFloat(v)) return;
      var t = tokenFor(v, SPACES);
      bits.push(v.replace('px', '') + (t ? ' = ' + t : ' off the scale'));
    });
    return bits.length ? bits.join(' · ') : 'none';
  }

  function spaceRow(label, value) {
    var r = row(label, value, SPACES);
    if (!r.token) r.note = scaleNote(value);
    return r;
  }

  /* ---------- gbppl-inspect-2: CONTRAST ----------
     The team asked for more data; the number a designer and a
     developer both have to answer for is this one. The ink is read
     off the element, the ground is composited down the ancestors
     until something opaque is found (a half-transparent scrim over a
     dark band is not the colour anybody sees), and the grade is the
     WCAG threshold for the size and weight actually rendered: large
     text is judged at 3 and 4.5, everything else at 4.5 and 7. Where
     the element paints no ground of its own the row says whose
     ground was used, because that is a fact about the page and not
     about this element. */
  function rgbParts(c) {
    var m = /rgba?\(([^)]+)\)/.exec(String(c));
    if (!m) return null;
    var p = m[1].split(',').map(function (s) { return parseFloat(s); });
    if (isNaN(p[0])) return null;
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 && !isNaN(p[3]) ? p[3] : 1 };
  }
  function over(fg, bg) {
    var a = fg.a;
    return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 };
  }
  function lum(c) {
    var f = function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  }
  function groundOf(el) {
    var stack = [], n = el;
    while (n && n.nodeType === 1) {
      var c = rgbParts(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) { stack.push({ c: c, el: n }); if (c.a >= 1) break; }
      n = n.parentElement;
    }
    var base = { r: 255, g: 255, b: 255, a: 1 };
    for (var i = stack.length - 1; i >= 0; i--) base = over(stack[i].c, base);
    return { colour: base, from: stack.length ? stack[0].el : null, own: !!stack.length && stack[0].el === el };
  }
  function contrastRows(el) {
    var cs = getComputedStyle(el);
    var ink = rgbParts(cs.color);
    if (!ink) return [];
    var g = groundOf(el);
    var solid = ink.a < 1 ? over(ink, g.colour) : ink;
    var l1 = lum(solid), l2 = lum(g.colour);
    var ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    var size = parseFloat(cs.fontSize) || 16;
    var weight = parseInt(cs.fontWeight, 10) || 400;
    var big = size >= 24 || (size >= 18.66 && weight >= 700);
    var grade = ratio >= (big ? 4.5 : 7) ? 'AAA' : ratio >= (big ? 3 : 4.5) ? 'AA' : 'below AA';
    var where = g.own ? 'its own ground'
              : g.from ? 'the ground of ' + identify(g.from).name
              : 'the page itself, nothing painted in between';
    return [row('Contrast', (Math.round(ratio * 100) / 100) + ':1 · ' + grade, null,
                'against ' + where + (big ? ', judged as large text' : ''))];
  }

  /* ---------- gbppl-inspect-2: STATE, RIGHT NOW ----------
     Two rows, and they answer two different questions. LIVE is what
     the browser says with matches(), so hover really means hover and
     disabled really means the control is refusing input. DECLARED is
     what the markup claims: the demo classes of the showcase, the
     aria that carries the state to a screen reader, the boolean
     attributes. Where they disagree, that IS the finding. */
  var PSEUDO = [':hover', ':focus', ':focus-visible', ':focus-within', ':active',
                ':disabled', ':checked', ':indeterminate', ':invalid',
                ':placeholder-shown', ':open'];
  var STATE_ATTRS = ['aria-pressed', 'aria-current', 'aria-expanded', 'aria-selected',
                     'aria-disabled', 'aria-invalid', 'disabled', 'checked', 'open'];
  function stateBlock(el) {
    var live = [];
    PSEUDO.forEach(function (p) {
      try { if (el.matches(p)) live.push(p.slice(1)); } catch (e) { /* engine does not know this one */ }
    });
    var marked = classList(el).filter(function (c) { return /^is-/.test(c); });
    STATE_ATTRS.forEach(function (a) {
      if (el.hasAttribute && el.hasAttribute(a)) {
        var v = el.getAttribute(a);
        marked.push(v ? a + '="' + v + '"' : a);
      }
    });
    return block('State, right now', table([
      row('Live', live.length ? live.join(' · ') : 'rest', null,
          'asked of the browser with matches(), not guessed from classes'),
      row('Declared', marked.length ? marked.join(' · ') : 'nothing in the markup', null, 'quiet')
    ]));
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
    /* Contrast belongs to paint, and only where there is text to
       judge: the ratio of a wrapper that draws no glyphs is a number
       about nothing (gbppl-inspect-2). */
    if (isTextLeaf(el)) rowsList = rowsList.concat(contrastRows(el));
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

  /* gbppl-inspect-2. WHERE IT LIVES MOVED TO THE TOP. It used to
     stand in the foot, four screens of tables below the name, and the
     first question a developer asks about a thing on a page is which
     file to open. Now the drawer reads: big name, then the file that
     owns it and the way into its card, then the measurements. The
     foot keeps what it was always for — how the numbers were got. */
  function ledeBlock(desc) {
    var where = desc.owner.file
      ? 'Lives in <code>' + esc(desc.owner.file) + '</code>' +
        (desc.owner.own ? '.' : ', reached through the nearest ancestor that carries a class of the system.')
      : 'Nothing in the system claims this element, so it is the page speaking for itself.';
    var oro = desc.oro
      ? ' <a class="gbi-oro" href="' + esc(ROOT + 'system/oro/' + desc.oro) + '">Open in Oro</a>'
      : '';
    return '<p class="gbi-lede">' + where + oro + '</p>';
  }

  function openFor(el) {
    var d = drawerHost();
    if (!d) return;
    var desc = identify(el);
    /* The element the drawer is open on keeps its distances drawn
       without a held key: it is the one being worked on. */
    selected = el;
    var body = ledeBlock(desc) + geometryBlock(el);

    /* A component the showcase already knows how to read is read
       the same way here: one description of Button in the system,
       not two (Ton-6). Its own table already names ground and ink, so
       only the contrast is added beside it rather than a second Paint. */
    if (desc.kind && KINDS[desc.kind]) {
      body += KINDS[desc.kind].body(el, KINDS[desc.kind].describe(el));
      var cr = contrastRows(el);
      if (cr.length) body += block('Contrast, ink against its ground', table(cr));
    } else {
      body += typeBlock(el, desc);
      body += paintBlock(el);
    }
    body += stateBlock(el) + classesBlock(el) + cssBlock(el, desc);

    var foot = 'Every number above was read off this element with getComputedStyle at ' +
               window.innerWidth + 'px wide, and the token beside it is the one whose ' +
               'resolved value matches what the browser drew.';

    /* gbppl-drawer-unify-1: the head is one slot and one title now,
       so the «Inspect» eyebrow is gone. What the element IS still
       opens the reading — it just does it in the first line of the
       body, where `sub` moved. */
    d.open({
      title: desc.name,
      sub: (desc.detail ? esc(desc.detail) + ' &middot; ' : '') +
           '<code>' + esc(desc.selector) + '</code> &middot; measured at ' +
           window.innerWidth + 'px wide',
      html: body,
      foot: foot
    });
    schedule();   /* the distances of the chosen element, straight away */
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

     THE FIELDS A KIND MAY CARRY:

       find(slot, target)   the specimen inside the clicked slot
       describe(el)         whatever the other fields want to read
       name, owner          a string, or a function (el, info)
       title(el, info)      the standard subtitle, before the width
       body(el, info)       the rows
       inViewMode: false    a region that only answers in Inspect
       sub, foot            gbppl-oro-cleanup-1: the two lines around
                            the body. A string, a function
                            (el, width, info), or null for a line
                            that is not printed at all. Left out,
                            both stay the sentences openShowcase has
                            always written.
     ============================================================ */

  /* ---------- what each kind of specimen reports ---------- */
  var SIZE_NAME = { s: 'S', m: 'M', l: 'L', xl: 'XL' };

  var KINDS = {
    button: {
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

    /* ---------- gbppl-oro-icons-1: the icon button ----------
       The round control. It reads as a Button everywhere else in
       this file and it would read as one here too, but the four
       things a reader wants out of a circle — how wide it is, how
       big the glyph inside it is, what the ratio between them is
       and whether the target clears the accessible minimum — are
       not rows the labelled button has. So it gets a kind rather
       than four conditional rows in the one above. */
    iconbutton: {
      name: 'Icon button',
      owner: 'system/components/button.css',
      find: function (slot) { return slot.querySelector('.gb-btn--icon'); },

      describe: function (el) {
        var c = String(el.className);
        var m = /gb-btn--(s|m|l)\b/.exec(c);
        return {
          size: m ? m[1] : 'live',
          type: /gb-btn--outline\b/.test(c) ? 'outline' : /gb-btn--ghost\b/.test(c) ? 'ghost' : 'filled',
          colour: /gb-btn--secondary\b/.test(c) ? 'secondary' : /gb-btn--inverse\b/.test(c) ? 'inverse' : 'primary',
          wash: /gb-btn--plain\b/.test(c) ? 'plain' : 'washed',
          role: /gb-btn--static\b/.test(c) ? 'static' : 'interactive',
          state: el.disabled || el.classList.contains('is-disabled') ? 'disabled'
               : el.classList.contains('is-hover') ? 'hover'
               : el.classList.contains('is-focus') ? 'focus'
               : el.classList.contains('is-active') ? 'active' : 'rest'
        };
      },

      title: function (el, d) {
        return d.role + ' ' + d.wash + ', ' + d.type + ' ' + d.colour + ', ' +
               (d.size === 'live' ? 'the live circle' : 'size ' + SIZE_NAME[d.size]) +
               (d.state === 'rest' ? '' : ', ' + d.state);
      },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var icon = el.querySelector('.gb-btn__icon');
        var box = parseFloat(cs.width) || 0;
        var glyph = icon ? (parseFloat(getComputedStyle(icon).width) || 0) : 0;
        var circleTok = d.size === 'live' ? ['--gb-btn-icon-size', '--icon-button-size']
                      : d.size === 's' ? ['--gb-btn-m-h']
                      : d.size === 'm' ? ['--gb-btn-l-h'] : ['--gb-btn-xl-h'];
        var glyphTok = d.size === 'live' ? ['--gb-btn-icon-glyph']
                     : d.size === 's' ? ['--gb-btn-l-icon-xl']
                     : d.size === 'm' ? ['--gb-btn-l-icon-2xl'] : ['--gb-btn-xl-icon-2xl'];
        var fam = d.colour === 'primary' ? 'accent' : d.colour === 'secondary' ? 'ink' : 'inverse';
        var fillStates = [
          '--gb-btn-fill-' + d.colour,
          '--gb-btn-fill-' + d.colour + '-hover',
          '--gb-btn-wash-icon-hover',
          '--gb-btn-wash-' + fam + '-hover'
        ];
        var inkStates = d.type === 'filled'
          ? ['--gb-btn-ink-on-' + d.colour]
          : ['--gb-btn-ink-' + d.colour, '--gb-btn-ink-' + d.colour + '-hover'];

        var rowsList = [
          row('Circle', px(cs.width), circleTok,
              d.size === 'live' ? 'live, and off the height grid on purpose' : ''),
          row('Glyph box', icon ? px(glyph) : 'no glyph', icon ? glyphTok : null),
          row('Glyph against circle', glyph && box ? Math.round((glyph / box) * 100) + ' per cent' : 'no glyph',
              null, 'the live ratio is half'),
          /* A circle is 50 PER CENT, not 50 pixels: pushing a
             percentage through px() would print a number that is
             not on the screen. */
          row('Radius', /%\s*$/.test(cs.borderTopLeftRadius) ? cs.borderTopLeftRadius : px(cs.borderTopLeftRadius),
              ['--gb-btn-icon-radius', '--radius-circle']),
          row('Ground', cs.backgroundColor, fillStates,
              d.type === 'filled' ? '' : 'transparent at rest'),
          row('Ink', cs.color, inkStates),
          /* The wash cannot be compared: at rest it is not on the
             element, and it is named rather than measured. */
          knownRow('Wash on hover', d.wash === 'plain' ? 'none, in any state' : 'ink at 5 per cent',
              null, d.wash === 'plain' ? null : '--gb-btn-wash-icon-hover',
              d.wash === 'plain' ? 'the modifier takes the ground away' : ''),
          row('Answers the pointer', d.role === 'interactive' ? 'yes' : 'no, it is decoration',
              null, d.role === 'interactive' ? 'it is a control' : 'pointer events are off'),
          row('Target', Math.round(box) + ' by ' + Math.round(parseFloat(cs.height) || 0), null,
              Math.round(box) >= 44 ? 'clears the 44 minimum' : 'under 44: it needs room around it'),
          row('Accessible name',
              el.getAttribute('aria-label') ||
                (el.getAttribute('aria-hidden') === 'true' ? 'hidden from the reader' : 'none'),
              null, d.role === 'interactive'
                ? 'an interactive glyph needs one'
                : 'a decorative glyph must not have one')
        ];

        var mods = String(el.className).split(/\s+/).filter(function (c) { return c.indexOf('gb-btn') === 0; });
        var demo = String(el.className).split(/\s+/).filter(function (c) { return /^is-/.test(c); });
        var tag = d.role === 'interactive' ? 'button' : 'span';
        var attr = d.role === 'interactive'
          ? ' type="button" aria-label="' + (el.getAttribute('aria-label') || 'Name it') + '"'
          : ' aria-hidden="true"';
        var code = '<' + tag + ' class="' + mods.join(' ') + '"' + attr + '>\n' +
          '  <span class="gb-btn__icon"><svg>...</svg></span>\n' +
          '</' + tag + '>';

        return block('Properties, measured on this specimen', table(rowsList)) +
          block('Modifiers', chips(mods)) +
          (demo.length ? block('Demo only, never on a product page', chips(demo)) : '') +
          block('Markup', snippet(code));
      }
    },

    /* ---------- gbppl-oro-icons-1: a bare glyph ----------
       Not a control, and the drawer is shaped by that: «what
       happens on hover» is not a row here, because nothing does. */
    icon: {
      name: 'Icon',
      owner: 'system/components/icon.css',
      find: function (slot) { return slot.querySelector('.gb-icon'); },

      describe: function (el) {
        var m = /gb-icon--(\d+)\b/.exec(String(el.className));
        return { size: m ? m[1] : 'default', named: el.getAttribute('data-icon-name') || '' };
      },

      title: function (el, d) {
        return (d.named ? d.named + ', ' : '') +
               (d.size === 'default' ? 'the default rung' : d.size + 'px');
      },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var svgEl = el.querySelector('svg');
        var tok = d.size === '16' ? ['--gb-btn-l-icon']
                : d.size === '22' ? ['--gb-btn-icon-glyph']
                : d.size === '24' ? ['--gb-btn-l-icon-2xl']
                : ['--gb-btn-l-icon-xl'];
        var grid = svgEl ? (svgEl.getAttribute('viewBox') || 'no viewBox') : 'no drawing';
        var drawn = svgEl ? parseFloat(getComputedStyle(svgEl).strokeWidth) : 0;
        var boxw = parseFloat(cs.width) || 0;
        var vb = /0 0 (\d+(?:\.\d+)?) /.exec(grid);
        var onScreen = (drawn && boxw && vb)
          ? Math.round((drawn * boxw / parseFloat(vb[1])) * 100) / 100 + 'px'
          : 'no drawing';

        var rowsList = [
          row('Box', px(cs.width) + ' by ' + px(cs.height), tok,
              'borrowed from the button until the icon scale is its own'),
          row('Drawing grid', grid, null, 'one grid for the whole set'),
          row('Stroke, as drawn', drawn ? drawn + ' on the grid' : 'no drawing', null,
              'the house weight, set by the component'),
          row('Stroke, on screen', onScreen, null,
              'one drawing in a smaller box puts a thinner line on the glass'),
          row('Ink', cs.color, null, 'currentColor: the ink of whatever it stands in'),
          row('Answers the pointer', 'no', null, 'an icon is not a control'),
          row('Name for the reader', el.getAttribute('aria-hidden') === 'true'
              ? 'hidden, it is decoration'
              : (el.getAttribute('aria-label') || 'none, and it is not hidden either'),
              null, 'a glyph is decoration unless it is said otherwise')
        ];

        var code = '<span class="' + String(el.className).split(/\s+/).filter(function (c) {
            return c.indexOf('gb-icon') === 0;
          }).join(' ') + '" aria-hidden="true">\n' +
          '  <svg viewBox="0 0 24 24">...</svg>\n' +
          '</span>';

        return block('Properties, measured on this specimen', table(rowsList)) +
          block('Modifiers', chips(String(el.className).split(/\s+/).filter(function (c) {
            return c.indexOf('gb-icon') === 0;
          }))) +
          block('Markup', snippet(code));
      }
    },

    /* ---------- gbppl-oro-drawer-1: the drawer head ----------
       A drawer is a surface, and a surface cannot be put on a
       plinth: the panel the reader opens is fixed to the right edge
       of the window and covers the page it would be a specimen of.
       What CAN stand in the page is its HEAD, which is also the
       part Ton-18 settled and the part every drawer in the house
       now shares, so that is what a specimen of a drawer is here:
       the slot, the title beside it, and the edge the cross moves
       to when a step back takes the left.

       This kind is registered but not named in COMPONENTS on
       purpose. The recognition table already says «Drawer» for
       gb-drawer and .gbd-panel, and giving that row a kind would
       change what Inspect prints on fourteen pages that did not ask
       for it. The card asks, through data-inspect. */
    drawer: {
      name: 'Drawer head',
      owner: 'system/components/drawer.css',
      find: function (slot) { return slot.querySelector('.gbd-head'); },

      describe: function (el) {
        var slots = el.querySelectorAll('.gbd-slot');
        var shown = [];
        Array.prototype.forEach.call(slots, function (s) {
          if (!s.hidden) shown.push(s.getAttribute('aria-label') || 'unnamed');
        });
        var title = el.querySelector('.gbd-title');
        return {
          shown: shown,
          back: shown.indexOf('Back') >= 0,
          lines: title
            ? Math.round(title.getBoundingClientRect().height /
                         (parseFloat(getComputedStyle(title).lineHeight) || 1))
            : 0
        };
      },

      title: function (el, d) {
        return (d.back ? 'a step back on the left, the cross at the right edge'
                       : 'the cross on the left, and nothing else') +
               (d.lines > 1 ? ', title over ' + d.lines + ' lines' : '');
      },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var titleEl = el.querySelector('.gbd-title');
        var ts = titleEl ? getComputedStyle(titleEl) : null;
        var first = el.querySelector('.gbd-slot:not([hidden])');
        var fs = first ? getComputedStyle(first) : null;
        var glyph = first ? first.querySelector('.gb-btn__icon') : null;
        var panel = el.closest('.gbd-panel');

        var rowsList = [
          row('Head height', px(el.getBoundingClientRect().height), null,
              d.lines > 1
                ? 'the circle plus equal air, grown by a title of ' + d.lines + ' lines'
                : 'the circle plus equal air: 44 and 18 either side'),
          row('Head measure', cs.getPropertyValue('--gbd-head-h').trim() || 'not declared here', null,
              'LIVE, the v1 catalogue drawers. No token: the system has no head scale'),
          row('Padding, vertical', px(cs.paddingTop), null,
              'derived: half of the head measure less the circle'),
          row('Padding, horizontal', px(cs.paddingLeft), ['--space-24', '--space-16']),
          row('Gap, slot to title', px(cs.columnGap), ['--space-16']),
          row('Slot circle', fs ? px(fs.width) : 'no slot', fs ? ['--gb-btn-icon-size', '--icon-button-size'] : null),
          row('Slot glyph', glyph ? px(getComputedStyle(glyph).width) : 'no glyph',
              glyph ? ['--gb-btn-icon-glyph'] : null),
          row('Controls in the head', String(d.shown.length) + ' · ' + (d.shown.join(', ') || 'none'), null,
              d.back ? 'the only head that carries two' : 'one slot, and no actions'),
          row('Title size', ts ? px(ts.fontSize) : 'no title', null, '24, and 20 below 640'),
          row('Title weight', ts ? ts.fontWeight : 'no title', null, 'quiet'),
          /* Two values that cannot be compared to a token: the family
             token carries a fallback stack the element resolves away,
             and the hairline is two properties said in one line. */
          knownRow('Title family', ts ? ts.fontFamily.split(',')[0].replace(/"/g, '') : 'no title',
                   null, '--font-serif'),
          row('Title line height', ts ? px(ts.lineHeight) : 'no title', null, 'quiet'),
          row('Title alignment', ts ? ts.textAlign : 'no title', null,
              'left, after the slot: Ton-18, 28 August'),
          knownRow('Hairline under', px(cs.borderBottomWidth) + ' ' + cs.borderBottomColor,
                   null, '--zinc-200'),
          row('Panel around it', panel ? px(getComputedStyle(panel).width) : 'this specimen stands in the page',
              null, panel ? 'min(520px, 100%)' : 'the head is the same in and out of the panel')
        ];

        var code =
          '<gb-drawer id="d"></gb-drawer>\n\n' +
          'document.getElementById(\'d\').open({\n' +
          '  title: ' + JSON.stringify(titleEl ? titleEl.textContent : '') + ',\n' +
          (d.back ? '  back:  function () { flow.back(); },\n' : '') +
          '  html:  \'<p>...</p>\'\n' +
          '});';

        return block('Properties, measured on this specimen', table(rowsList)) +
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
      name: 'Field',
      owner: 'system/components/auth.css',
      /* gbppl-oro-field-2. The showcase of the field stands the six
         cells of the code on the same shelf, and a cell carries no
         .gba-input: it is drawn by .gba-otp input in the same file.
         Second look, same kind. */
      find: function (slot) { return slot.querySelector('.gba-input') || slot.querySelector('.gba-otp input'); },

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
          /* gbppl-oro-field-2. The three names looked up here did not
             exist, so a field height always came back «No token».
             The control family is --form-ctl-h in tokens.css, the
             same rungs the L button spends. */
          row('Height', px(d.area ? cs.height : cs.minHeight), ['--form-ctl-h', '--form-ctl-h-xl', '--form-ctl-h-2xl']),
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
    },

    /* ---------- gbppl-oro-select-stepper-1: the select ----------
       A select reads as a field everywhere except in three rows: how
       much room the chevron takes, what the chevron is doing, and how
       many options stand behind it. Those three are why it is a kind
       and not four conditional rows inside the field above. */
    select: {
      name: 'Select',
      owner: 'system/components/auth.css',
      find: function (slot) { return slot.querySelector('select.gba-input'); },

      describe: function (el) {
        var wrap = el.closest('.gba-select');
        return {
          state: el.disabled ? 'disabled'
               : el.classList.contains('invalid') ? 'error'
               : el.classList.contains('is-hover') ? 'hover'
               : el.classList.contains('is-focus') ? 'focus'
               : el.selectedIndex > 0 ? 'picked' : 'nothing picked',
          options: el.options.length,
          chevron: wrap ? wrap.querySelector('.gb-icon') : null
        };
      },

      title: function (el, d) {
        return d.state + ', ' + d.options + ' option' + (d.options === 1 ? '' : 's');
      },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var lab = el.id ? document.querySelector('label[for="' + el.id + '"]') : null;
        var ch = d.chevron ? getComputedStyle(d.chevron) : null;
        var rowsList = [
          row('Height', px(cs.minHeight), ['--form-ctl-h', '--form-ctl-h-xl', '--form-ctl-h-2xl']),
          row('Padding, left', px(cs.paddingLeft), null),
          row('Padding, right', px(cs.paddingRight), null, 'inset plus glyph plus one space step'),
          row('Type size', px(cs.fontSize), null),
          row('Type weight', cs.fontWeight, null),
          row('Underline', px(cs.borderBottomWidth) + ' ' + cs.borderBottomColor,
              ['--zinc-400', '--blue-600', '--red-500']),
          row('Ink', cs.color, ['--zinc-800']),
          row('Chevron box', ch ? px(ch.width) : 'no glyph',
              ch ? ['--gb-btn-l-icon-xl'] : null),
          row('Chevron ink', ch ? ch.color : 'no glyph',
              ch ? ['--zinc-500', '--blue-600', '--zinc-300'] : null),
          row('Native arrow', cs.appearance, null, 'appearance none: the browser draws nothing here'),
          row('Label size', lab ? px(getComputedStyle(lab).fontSize) : 'no label', null),
          row('The list', 'drawn by the operating system', null, 'not ours, and not measurable')
        ];
        var mods = el.className.split(/\s+/).filter(Boolean);
        var opts = [];
        for (var i = 0; i < Math.min(el.options.length, 3); i++) opts.push(el.options[i].text);
        var code = '<div class="gba-inputwrap gba-select">\n' +
          '  <select class="' + el.className + '">\n' +
          opts.map(function (o) { return '    <option>' + o + '</option>'; }).join('\n') +
          (el.options.length > 3 ? '\n    ...' : '') + '\n' +
          '  </select>\n' +
          '  <span data-gb-icon="chevron-down" data-gb-icon-size="20"></span>\n' +
          '</div>';
        return block('Properties, measured on this specimen', table(rowsList)) +
          block('Classes', chips(mods)) +
          block('Markup', snippet(code));
      }
    },

    /* ---------- gbppl-lab-f-2: the toggle button ----------
       One control, two or more halves, and the reading a person
       wants off it is which half is filled, how many there are, and
       who owns the answer — because on the checkout the answer is
       Alpine and a reader who does not know that will wonder why the
       component is not switching. */
    toggle: {
      name: 'Toggle button',
      owner: 'system/components/toggle.css',
      find: function (slot) { return slot.querySelector('.gb-toggle'); },

      describe: function (el) {
        var list = Array.prototype.slice.call(el.querySelectorAll('.gb-toggle__item'));
        var on = list.filter(function (b) {
          return b.classList.contains('is-on') ||
                 b.getAttribute('aria-checked') === 'true' ||
                 b.getAttribute('aria-pressed') === 'true';
        })[0];
        var off = list.filter(function (b) { return b !== on && !b.disabled; })[0];
        return {
          count: list.length,
          chosen: on ? on.textContent.trim() : null,
          host: el.getAttribute('data-gb-toggle') === 'host',
          block: /gb-toggle--block/.test(String(el.className)),
          disabled: list.filter(function (b) { return b.disabled; }).length,
          list: list, on: on, off: off
        };
      },

      title: function (el, d) {
        return d.count + ' values, ' + (d.chosen ? '«' + d.chosen + '» chosen' : 'nothing chosen');
      },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var os = d.on ? getComputedStyle(d.on) : null;
        var fs = d.off ? getComputedStyle(d.off) : null;
        var box = d.on ? d.on.getBoundingClientRect() : null;
        var rowsList = [
          row('Track height', px(cs.height), null,
              'the item plus the inset twice; no height is set'),
          row('Track inset', px(cs.paddingTop), null, 'NO TOKEN: half a step of the space scale'),
          row('Gap', px(cs.columnGap), null, 'the inset again, so the black card sits square'),
          row('Track ground', cs.backgroundColor, ['--white']),
          row('Track line', px(cs.borderTopWidth) + ' ' + cs.borderTopColor, ['--zinc-300']),
          row('Radius', px(cs.borderTopLeftRadius), ['--radius']),
          row('Item', box ? Math.round(box.width) + ' by ' + Math.round(box.height) : 'none',
              null, 'padding ' + (os ? px(os.paddingTop) + ' / ' + px(os.paddingLeft) : '')),
          row('Label', os ? px(os.fontSize) + ' / ' + os.fontWeight + ' / ' + os.letterSpacing : 'none',
              ['--gb-btn-s-label', '--gb-btn-label-weight', '--gb-btn-label-tracking'],
              'the button label ladder, uppercase'),
          row('Pressed', os ? os.backgroundColor + ' on ' + os.color : 'none',
              ['--zinc-900', '--white']),
          /* gbppl-toggle-family-1: the hover moved off Zinc 50 on 01.09
             and the note went with it, and the pad is now read as the
             uneven pair it is, so a reader who measures the two numbers
             is not left wondering which of them is wrong. */
          row('At rest', fs ? fs.color : 'none', ['--zinc-700'],
              'ground transparent; hover washes --gb-btn-wash-ink-hover and inks Zinc 900'),
          row('Pad, top and bottom', os ? px(os.paddingTop) + ' / ' + px(os.paddingBottom) : 'none',
              null, 'one device pixel of optical lift: caps have no descender to fill the space under the baseline'),
          row('Who owns the value', d.host ? 'the host page' : 'the component', null,
              d.host ? 'data-gb-toggle="host": group, tab stop and arrow keys only'
                     : 'clicks move the value and fire gbtg:change'),
          row('Unavailable values', String(d.disabled), null,
              'a value the system cannot hold fades and stops answering')
        ];
        var mods = el.className.split(/\s+/).filter(function (c2) { return c2.indexOf('gb-toggle') === 0; });
        var NL = String.fromCharCode(10);
        var first = d.list[0];
        var code = '<div class="' + el.className + '" role="radiogroup"' +
          (d.host ? ' data-gb-toggle="host"' : '') + ' aria-label="…">' + NL +
          (first ? '  <button class="gb-toggle__item' + (d.on === first ? ' is-on' : '') +
            '" type="button" role="radio"' + NL +
            '          aria-checked="' + (d.on === first ? 'true' : 'false') + '">' +
            first.textContent.trim() + '</button>' + NL : '') +
          '  …' + NL + '</div>';
        return block('Properties, measured on this specimen', table(rowsList)) +
          block('Modifiers', chips(mods)) +
          block('Markup', snippet(code));
      }
    },

    /* ---------- gbppl-oro-select-stepper-1: the input number ----------
       Three elements, one control. The reading a person wants off it
       is the frame against its parts: whether the well is the
       standard one or the dense one, whether the value is at a bound,
       and who owns the number, because on the checkout the answer is
       Alpine and a reader who does not know that will wonder why the
       component is not counting. */
    inputnumber: {
      name: 'Input number',
      owner: 'system/components/inputnumber.css',
      find: function (slot) { return slot.querySelector('.gb-inputnumber'); },

      describe: function (el) {
        var c = String(el.className);
        var v = el.querySelector('.gb-inputnumber__value');
        var down = el.querySelector('[data-step="-1"]');
        var up = el.querySelector('[data-step="1"]');
        var off = /is-disabled/.test(c) || el.getAttribute('aria-disabled') === 'true';
        return {
          size: /gb-inputnumber--m\b/.test(c) ? 'M' : 'S',
          well: /gb-inputnumber--dense\b/.test(c) ? 'dense' : 'standard',
          host: el.getAttribute('data-gb-inputnumber') === 'host',
          value: v ? (v.tagName === 'INPUT' ? v.value : v.textContent.trim()) : null,
          min: v && v.getAttribute ? (v.getAttribute('min') || el.getAttribute('data-min')) : null,
          max: v && v.getAttribute ? (v.getAttribute('max') || el.getAttribute('data-max')) : null,
          state: off ? 'disabled'
               : down && down.disabled ? 'at the floor'
               : up && up.disabled ? 'at the ceiling'
               : /is-hover/.test(c) ? 'hover'
               : /is-focus/.test(c) ? 'focus' : 'rest',
          v: v, down: down
        };
      },

      title: function (el, d) {
        return 'size ' + d.size + ', ' + d.well + ' well, ' +
               (d.state === 'rest' ? 'value ' + d.value : d.state);
      },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var vs = d.v ? getComputedStyle(d.v) : null;
        var btn = d.down ? d.down.getBoundingClientRect() : null;
        var glyph = d.down ? d.down.querySelector('.gb-icon, svg') : null;
        var rowsList = [
          row('Frame height', px(cs.height), null, 'the button rung plus two hairlines'),
          row('Button', btn ? Math.round(btn.width) + ' by ' + Math.round(btn.height) : 'none',
              ['--gb-btn-m-h', '--gb-btn-l-h']),
          row('Glyph box', glyph ? px(getComputedStyle(glyph).width) : 'none',
              glyph ? ['--gb-btn-l-icon-xl'] : null),
          row('Well width', vs ? px(vs.width) : 'none', null,
              d.well === 'dense' ? 'the button rung' : 'the button rung plus one space step'),
          row('Number', vs ? px(vs.fontSize) + ' / ' + vs.fontWeight : 'none', null,
              'the field ladder'),
          row('Hairline', px(cs.borderTopWidth) + ' ' + cs.borderTopColor,
              ['--zinc-300', '--blue-600', '--zinc-200']),
          row('Seam', vs ? px(vs.borderLeftWidth) + ' ' + vs.borderLeftColor : 'none',
              ['--zinc-200']),
          row('Radius', px(cs.borderTopLeftRadius), ['--radius']),
          row('Value', d.value, null,
              (d.min ? 'floor ' + d.min : 'no floor') +
              (d.max ? ', ceiling ' + d.max : ', no ceiling')),
          row('Who owns the number', d.host ? 'the host page' : 'the component', null,
              d.host ? 'data-gb-inputnumber="host": bounds and aria only' : 'clicks step the value')
        ];
        var mods = el.className.split(/\s+/).filter(function (c2) { return c2.indexOf('gb-inputnumber') === 0; });
        var code = '<div class="' + mods.join(' ') + '"' +
          (d.host ? ' data-gb-inputnumber="host"' : '') + ' aria-label="Quantity">\n' +
          '  <button class="gb-btn gb-btn--icon gb-btn--' + d.size.toLowerCase() +
            ' gb-btn--ghost gb-btn--secondary gb-btn--plain" data-step="-1"\n' +
          '          aria-label="Decrease quantity"><span class="gb-btn__icon"></span></button>\n' +
          '  <input class="gb-inputnumber__value" type="number" min="' + (d.min || 1) +
            '" value="' + d.value + '">\n' +
          '  <button class="gb-btn gb-btn--icon gb-btn--' + d.size.toLowerCase() +
            ' gb-btn--ghost gb-btn--secondary gb-btn--plain" data-step="1"\n' +
          '          aria-label="Increase quantity"><span class="gb-btn__icon"></span></button>\n' +
          '</div>';
        return block('Properties, measured on this specimen', table(rowsList)) +
          block('Modifiers', chips(mods)) +
          block('Markup', snippet(code));
      }
    }
  };


  /* ============================================================
     THE SHOWCASE REGIONS, AND THE DOOR TO THE PROPERTIES
     ------------------------------------------------------------
     A region marked data-inspect="<kind>" hands its specimens to
     the kind above. In INSPECT mode a click on the specimen opens
     that reading, exactly as it always has, because in Inspect
     every click is a question and nothing on the page is meant to
     answer the pointer itself.

     IN VIEW MODE IT NO LONGER DOES, and that is the whole of
     gbppl-oro-props-1. Ton, 29.08, 12:34, with a screenshot:
     «Мне очень не нравится, как работает Properties. Я не могу
     кликнуть на field, чтобы увидеть, как оно ведёт себя при
     клике; Select не открывается, потому что вместо этого
     открывается Properties. Оно должно показываться иначе, не
     перекрывая действия компонентов: иначе не смогу кликнуть ни
     на Switch, ни на Checkbox, ни на Radio, ни на Select.»

     He is right, and the mistake is as old as the showcase: the
     specimen was clickable before this file existed and the click
     was the only way in. But a specimen is a LIVE COMPONENT —
     that is the whole reason it stands on a plinth instead of
     being drawn as a picture — and an instrument that eats its
     click has taken away the one thing the reader came to try. So
     in View mode the specimen answers the pointer the way it does
     in the product, and the properties drawer gets its own door.

     THE DOOR. One quiet icon button in the corner of the
     specimen's box, invisible until the pointer is on that box or
     the keyboard is inside it, mounted BY THIS FILE for every slot
     of every region. Mounted here and not written on the pages,
     because a door on nine showcases written nine times is nine
     doors: one of them ends up in the wrong corner, and the next
     showcase opens without one. The pages carry data-inspect and
     nothing else, exactly as they did before.

     WHERE THE DOOR STANDS. On the slot, unless the slot stands
     alone on a stage: a playground centres one specimen on a large
     ground, and the corner of THAT is a corner nobody is aiming
     at. Where a slot holds many parts and a single door would have
     to guess which one the reader means — the type ladder puts six
     roles in one block — every part gets its own door and there is
     nothing left to guess.

     WHAT IT IS MADE OF. `.gb-btn--icon --s --ghost --secondary
     --plain` from button.css with a glyph from the icon record: no
     new component and no local paint (Тон-6). The glyph is `info`,
     which the record did not hold, because nothing in the house had
     ever needed to say «about this»; it was redrawn there from
     system/icons/circle-info.svg with its provenance written down.
     A chevron was tried first and stood in the corner meaning
     «next»: an affordance that has to be guessed is the defect this
     wave is fixing, not a saving. The door also says «Properties»
     in its label and in its tooltip.
     ============================================================ */
  var SLOT_SEL = '.gbdoc-slot, .gbdoc-cell, .gbdoc-hold, .gbdoc-type__live';

  function slotOf(target) {
    if (!target || !target.closest) return null;
    var slot = target.closest('[data-inspect] .gbdoc-slot, [data-inspect] .gbdoc-cell, ' +
                              '[data-inspect] .gbdoc-hold, [data-inspect] .gbdoc-type__live');
    if (slot) return slot;
    /* A region with no slots in it is its own slot. The playground
       bench (system\oro\lab) stands one specimen on a bare stage,
       and asking it to grow furniture it does not need, only so a
       door has somewhere to hang, would be the tail wagging the
       dog. */
    var region = target.closest('[data-inspect]');
    return region && !region.querySelector(SLOT_SEL) ? region : null;
  }

  /* The reading itself, once the slot is known. Both doors lead
     here: the click in Inspect mode and the button in View. */
  function openSlot(slot, target) {
    var region = slot.matches('[data-inspect]') ? slot : slot.closest('[data-inspect]');
    if (!region) return false;
    var kind = KINDS[region.getAttribute('data-inspect')];
    if (!kind) return false;
    /* gbppl-oro-pages-1. Тон, 28.08: «Показывать плавающую кнопку
       Properties, которая открывает Drawer, на карточках компонентов
       нужно только внутри самих компонентов. В превью и вообще
       где-либо ещё её быть не должно.» A kind whose region is not a
       shelf of specimens but a catalogue of cards says so once, and
       then a click in View mode belongs to the card: the link under
       it goes to the component's page. Such a region is given no
       door either (see mountDoors). In Inspect mode the region
       answers as everything else does, because in Inspect mode the
       question is always «what is this», and the entry is the
       answer. */
    if (MODE !== 'inspect' && kind.inViewMode === false) return false;
    /* The clicked element is handed to find as well as the slot: a
       component slot holds one specimen, but a type specimen block
       holds six roles in one slot and the reader means the line
       under the pointer. Kinds that do not care ignore it. */
    var el = kind.find(slot, target);
    if (!el) return false;
    /* A door is not a specimen. Two kinds look for `.gb-btn` and
       `.gb-btn--icon` and the door is both; it is appended after
       the specimen, so document order already answers this, and
       this line answers it for a slot that has nothing else in
       it. */
    if (el.classList && el.classList.contains('gbdoc-props')) return false;
    var d = drawerHost();
    if (!d) return false;

    var info = kind.describe(el);
    var name = typeof kind.name === 'function' ? kind.name(el, info) : kind.name;
    var owner = typeof kind.owner === 'function' ? kind.owner(el, info) : kind.owner;

    /* gbppl-oro-cleanup-1 (28.08). The two lines around the body used
       to be printed here for every kind, and both of them claimed the
       same thing: measured, at this width, with getComputedStyle. True
       of a specimen on a plinth. Not true of a card in the registry,
       whose words are read off the census and never measured at all,
       and the instrument does not get to say a number came from
       somewhere it did not (Ton, 27.08, «прибор не выдумывает»).

       So a kind may now name its own two lines. `sub` and `foot` are
       each a string, a function (el, width, info) returning one, or
       null for a line that is not printed. A kind that says nothing
       keeps exactly the two sentences it had, which is why Button,
       Field, Icon, Icon button and Drawer head read word for word as
       they did before this wave. */
    var line = function (key, standard) {
      if (!(key in kind)) return standard;
      var v = kind[key];
      return typeof v === 'function' ? v(el, window.innerWidth, info) : v;
    };

    d.open({
      title: name,
      sub: line('sub', kind.title(el, info) + ' &middot; measured at ' + window.innerWidth + 'px wide'),
      html: kind.body(el, info),
      foot: line('foot',
        'Owner: <code>' + owner + '</code>. Every number above was read off this specimen with ' +
        'getComputedStyle at the current window width.')
    });
    return true;
  }

  function openShowcase(target) {
    if (!target || !target.closest) return false;
    /* Inside the drawer itself: a reader clicking a row of the
       properties table is reading, not pointing at a specimen.
       gbppl-oro-drawer-1 carved out the one exception: the drawer
       card draws a panel IN the page (`.gbdoc-panel`, docs.css) as
       its own specimen, and that one is exactly what a click means. */
    if (target.closest('.gbd-panel:not(.gbdoc-panel)')) return false;
    if (target.closest('[data-axis]')) return false;  /* a control chip, not a specimen */
    var slot = slotOf(target);
    if (!slot) return false;
    return openSlot(slot, target);
  }

  /* ---------- the door, and only the door ----------
     In View mode this is the ONE click that opens the properties
     drawer on a showcase. Everything else on the page belongs to
     the page: a button presses, a field takes focus, a select
     opens its menu, an input number counts. */
  document.addEventListener('click', function (e) {
    if (MODE === 'inspect') return;   /* Inspect has its own handler, in capture */
    var door = e.target.closest ? e.target.closest('.gbdoc-props') : null;
    if (!door || !door.gbSlot || !door.gbSlot.isConnected) return;
    e.preventDefault();
    e.stopPropagation();
    openSlot(door.gbSlot, door.gbPart || door.gbSlot);
  });

  /* ---------- hanging the doors ----------
     Idempotent, and run again whenever a region redraws itself: a
     playground rewrites its hold on every change of an axis, and a
     door that is not put back is a door that worked once. */
  var DOOR_CLS = 'gb-btn gb-btn--icon gb-btn--s gb-btn--ghost gb-btn--secondary gb-btn--plain gbdoc-props';

  function addDoor(box, slot, part) {
    if (!box || box.querySelector(':scope > .gbdoc-props')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = DOOR_CLS;
    b.setAttribute('aria-label', 'Properties');
    b.setAttribute('title', 'Properties');
    b.innerHTML = '<span class="gb-btn__icon" aria-hidden="true">' +
                  window.GbIcons.svg('info') + '</span>';
    b.gbSlot = slot;
    b.gbPart = part || null;
    box.appendChild(b);
    inkFor(b, box);
  }

  /* The stage, when it holds this one specimen and nothing else;
     the slot otherwise. */
  function boxFor(region, slot) {
    var stage = slot.closest('.gbdoc-stage');
    if (stage && region.contains(stage) && stage.querySelectorAll(SLOT_SEL).length === 1) return stage;
    return slot;
  }

  function mountDoors() {
    /* The glyph comes from the record (icon.js). A showcase that has
       not been given the record gets no door rather than a broken
       one, and nothing is said out loud: that is a page waiting to
       be wired, not a fault at the reader's end. */
    if (!window.GbIcons || !window.GbIcons.has('info')) return;
    Array.prototype.forEach.call(document.querySelectorAll('[data-inspect]'), function (region) {
      var kind = KINDS[region.getAttribute('data-inspect')];
      if (!kind || kind.inViewMode === false) return;
      /* A DOOR IS HUNG ONLY WHERE THERE IS SOMETHING BEHIND IT. The
         kind is asked first, and where it finds no specimen there is
         no button: select.html stands a plain typed field beside its
         select to compare them, and the select kind has nothing to
         say about an input. A door that opens on nothing is worse
         than no door, because a button is a promise. A slot whose
         specimen has not been drawn yet gets its door on the next
         pass, which the observer below is for. */
      var hangable = function (slot, part) {
        return !!kind.find(slot, part || slot);
      };
      var slots = region.querySelectorAll(SLOT_SEL);
      if (!slots.length) {
        if (hangable(region, null)) addDoor(region, region, null);
        return;
      }
      Array.prototype.forEach.call(slots, function (slot) {
        var parts = kind.parts ? slot.querySelectorAll(kind.parts) : [];
        if (parts.length > 1) {
          Array.prototype.forEach.call(parts, function (p) {
            if (hangable(slot, p)) addDoor(p, slot, p);
          });
          return;
        }
        if (hangable(slot, null)) addDoor(boxFor(region, slot), slot, null);
      });
    });
  }

  /* WHICH INK, MEASURED RATHER THAN ASSUMED. A stage takes a dark
     ground on a switch, and the switch belongs to the page. So the
     door reads the ground it is standing on with the same composite
     the contrast row uses and wears the colour family that belongs
     there. No page's class is named here, which is why a dark
     ground invented tomorrow needs no line in this file. */
  function inkFor(btn, box) {
    var dark = lum(groundOf(box).colour) < 0.25;
    btn.classList.toggle('gb-btn--inverse', dark);
    btn.classList.toggle('gb-btn--secondary', !dark);
  }

  /* The ink is settled the moment before the door is seen: the
     pointer arriving on the box, or the keyboard arriving in it. */
  function inkOnApproach(e) {
    var t = e.target;
    if (!t || !t.closest || !t.closest('[data-inspect]')) return;
    var n = t;
    while (n && n.nodeType === 1) {
      var b = n.querySelector(':scope > .gbdoc-props');
      if (b) { inkFor(b, n); return; }
      if (n.hasAttribute('data-inspect')) return;
      n = n.parentElement;
    }
  }
  document.addEventListener('pointerover', inkOnApproach, { passive: true });
  document.addEventListener('focusin', inkOnApproach);

  /* A region that redraws itself gets its doors back on the next
     frame. Our own buttons are ignored, or hanging one would ask
     for another. */
  var doorsQueued = false;
  function queueDoors() {
    if (doorsQueued) return;
    doorsQueued = true;
    requestAnimationFrame(function () { doorsQueued = false; mountDoors(); });
  }
  function watchRegions() {
    if (!window.MutationObserver) return;
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        var m = list[i];
        if (!m.target.closest || !m.target.closest('[data-inspect]')) continue;
        var ours = m.addedNodes.length > 0;
        Array.prototype.forEach.call(m.addedNodes, function (n) {
          if (!(n.classList && n.classList.contains('gbdoc-props'))) ours = false;
        });
        if (ours) continue;
        queueDoors();
        return;
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

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
  /* gbppl-inspect-2. selected = the element whose drawer is open; it
     keeps its distances drawn without a held key, because that is the
     one the reader is working on. altHeld is tracked rather than read
     off the event, so pressing Alt without moving the pointer redraws
     — the same key both drills into the exact element and turns the
     distances on, and both must answer the moment it goes down.
     lastRaw is the untouched pointer target, kept so that resolution
     can be done again when Alt changes. */
  var selected = null, altHeld = false, lastRaw = null;

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

  /* ---------- gbppl-inspect-2: DISTANCES TO THE NEIGHBOURS ----------
     The Figma gesture, in one colour. Hold Alt, or open the drawer on
     an element, and every side of the box grows a thin Blue 600 line
     to the nearest thing beside it with the number in a small plate
     at the middle of the run. No red: red in this system means an
     error, and a measurement is not one.

     WHAT COUNTS AS A NEIGHBOUR. A sibling that actually overlaps on
     the other axis. A number to something standing in a different row
     measures nothing anybody can see, so it is not offered. Where no
     sibling stands in that direction the line runs to the parent's
     CONTENT edge and is drawn dashed: the two answers are different
     questions and must never read as one. */
  function contentBox(el) {
    var r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    return {
      top: r.top + num(cs.borderTopWidth) + num(cs.paddingTop),
      right: r.right - num(cs.borderRightWidth) - num(cs.paddingRight),
      bottom: r.bottom - num(cs.borderBottomWidth) - num(cs.paddingBottom),
      left: r.left + num(cs.borderLeftWidth) + num(cs.paddingLeft)
    };
  }

  function distances(el, r) {
    var parent = el.parentElement;
    if (!parent || parent === document.documentElement) return;

    var best = { top: null, right: null, bottom: null, left: null };
    function keep(side, d) {
      if (d < -0.5) return;
      d = Math.max(d, 0);
      if (best[side] === null || d < best[side].d) best[side] = { d: d, kin: true };
    }
    for (var n = parent.firstElementChild; n; n = n.nextElementSibling) {
      if (n === el) continue;
      var k = n.getBoundingClientRect();
      if (!k.width || !k.height) continue;
      var oh = Math.min(r.right, k.right) - Math.max(r.left, k.left);
      var ov = Math.min(r.bottom, k.bottom) - Math.max(r.top, k.top);
      if (oh > 0.5) {
        if (k.bottom <= r.top + 0.5) keep('top', r.top - k.bottom);
        if (k.top >= r.bottom - 0.5) keep('bottom', k.top - r.bottom);
      }
      if (ov > 0.5) {
        if (k.right <= r.left + 0.5) keep('left', r.left - k.right);
        if (k.left >= r.right - 0.5) keep('right', k.left - r.right);
      }
    }

    var box = contentBox(parent);
    if (best.top === null) best.top = { d: r.top - box.top, kin: false };
    if (best.bottom === null) best.bottom = { d: box.bottom - r.bottom, kin: false };
    if (best.left === null) best.left = { d: r.left - box.left, kin: false };
    if (best.right === null) best.right = { d: box.right - r.right, kin: false };

    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    run('top', best.top, cx, r.top - best.top.d, 1, best.top.d, cx, r.top - best.top.d / 2);
    run('bottom', best.bottom, cx, r.bottom, 1, best.bottom.d, cx, r.bottom + best.bottom.d / 2);
    run('left', best.left, r.left - best.left.d, cy, best.left.d, 1, r.left - best.left.d / 2, cy);
    run('right', best.right, r.right, cy, best.right.d, 1, r.right + best.right.d / 2, cy);

    function run(side, info, l, t, w, h, nx, ny) {
      if (!info || !(info.d > 0.5)) return;
      /* Orientation is spelt out because the dashes have to run ALONG
         the line: a dash pattern painted across a one-pixel bar comes
         out solid, and a solid line here means «to a sibling». */
      piece('gbi-dist gbi-dist--' + (w === 1 ? 'v' : 'h') +
            (info.kin ? '' : ' gbi-dist--edge'), l, t, w, h);
      var p = document.createElement('span');
      p.className = 'gbi-dist__num';
      p.textContent = Math.round(info.d * 10) / 10;
      p.style.left = nx + 'px';
      p.style.top = ny + 'px';
      layer.appendChild(p);
    }
  }

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

    /* The distances, drawn over the fills and under the plate. Held
       Alt asks for them; the element whose drawer is open keeps them
       without a key, because that is the one being worked on. */
    if (altHeld || (selected && el === selected)) distances(el, r);

    plate(el, r);
  }

  /* ---------- the plate, on its own ----------
     Lifted out of paint with gbppl-comments-b, unchanged in what it
     draws. Comment mode names the element under the pointer exactly
     the way Inspect names it, and the way to keep one answer in the
     system is to have one function that gives it, not a second copy
     that drifts (Тон-6). */
  function plate(el, r) {
    /* TWO lines since gbppl-inspect-2 (the team, through Ton, 27.08:
       «просят показывать больше данных и чётче»). The name of the
       thing on the first line and heavier, because that is what is
       being answered; the size and the modifiers below it, quieter.
       One line held all three and the eye had to hunt for the name in
       the middle of a sentence. */
    var d = identify(el);
    var badge = document.createElement('div');
    badge.className = 'gbi-badge';
    badge.innerHTML = '<b>' + esc(d.name) + '</b>' +
      '<span class="gbi-badge__meta"><em>' + round1(r.width) + ' × ' + round1(r.height) + '</em>' +
      (d.detail ? '<i>' + esc(d.detail) + '</i>' : '') + '</span>';
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

  /* ---------- the outline, for a mode that is not measuring ----------
     gbppl-comments-b. Comment mode points at the same things Inspect
     points at and asks a different question: not «how big is this»
     but «which one of these am I talking about». So it borrows the
     recognition and the hairline and leaves the rulers behind — no
     padding fill, no margin hatching, no distances, because none of
     them is part of the question and all of them would sit under the
     pin the reader is about to drop.

     Same layer, same class, same plate. Inspect's own repaint is
     gated on MODE === 'inspect' and cannot fight this one. */
  function outline(el) {
    if (!el || !el.isConnected) { clearOverlay(); return; }
    makeLayer();
    layer.innerHTML = '';
    layer.hidden = false;
    var r = el.getBoundingClientRect();
    piece('gbi-box', r.left, r.top, r.width, r.height);
    plate(el, r);
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

  /* gbppl-comments-b. The Mode toggle is ONE toggle with three
     positions, and its third belongs to comments.js. That file has no
     way to wait for a handle that is created inside a whenDefined
     promise here, so the handle is handed out instead of guessed at:
     ask, and you are called when it exists, or straight away if it
     already does. */
  var switchWaiters = [];
  function onModeSwitch(fn) {
    if (typeof fn !== 'function') return;
    if (handle) fn(handle);
    else switchWaiters.push(fn);
  }

  /* The console, the drawer, the instrument's own layer — and, since
     gbppl-panel-7, the device stage: the dark field a framed page
     floats on belongs to the console, not to the page, and pointing
     at it must not measure it. */
  function isChrome(el) {
    if (!el || !el.closest) return true;
    return !!el.closest('gb-studio-panel, .gbsp, .gbsp-stage, .gbd-panel, .gbd-scrim, .gbi-layer');
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
  var SOLID = '.gb-btn, .gb-icon, .gb-toggle, .gbh-count, .gbh-beta, .gbh-icon-button, .gbb-day, ' +
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
    if (next !== 'inspect') { hovered = null; selected = null; clearOverlay(); }
    if (handle) handle.setActive(next);
    /* gbppl-inspect-2. The instrument says out loud what it just did
       and does not care who is listening. The console picks this up
       and forwards it into the device frame (gbppl-panel-7); a page
       with no frame has nobody subscribed and nothing happens. */
    try {
      document.dispatchEvent(new CustomEvent('gbi:mode', { detail: { mode: next } }));
    } catch (e) { /* very old engine, nothing to forward to anyway */ }
  }

  /* The other end of that wire, inside the frame: the console
     outside posts the mode in, and this page switches. Same origin,
     one message shape, and the sender is the frame's own parent —
     nothing else is listened to. */
  window.addEventListener('message', function (e) {
    if (e.source !== window.parent || e.source === window) return;
    var d = e.data;
    if (!d || d.gbsp !== 'mode') return;
    if ((d.mode === 'inspect' ? 'inspect' : 'view') !== MODE) setMode(d.mode);
  });

  document.addEventListener('pointermove', function (e) {
    if (MODE !== 'inspect') return;
    var t = e.target;
    /* The held key is read off the pointer as well as off the
       keyboard: inside a device frame the keydown belongs to the
       document that has focus, and the pointer is the only witness
       that Alt is down (gbppl-inspect-2). A flip repaints even when
       the pointer has not left the element. */
    var altNow = !!e.altKey, altFlip = altNow !== altHeld;
    altHeld = altNow;
    if (isChrome(t) || t === document.documentElement) { hovered = null; lastRaw = null; schedule(); return; }
    lastRaw = t;
    t = resolveTarget(t, altHeld);
    if (t !== hovered || altFlip) { hovered = t; schedule(); }
  }, { passive: true });

  document.addEventListener('pointerleave', function () {
    if (MODE !== 'inspect') return;
    hovered = null;
    lastRaw = null;
    schedule();
  });

  /* Alt is a state, not an event: hold it and the picture must
     change under a pointer that is standing still. */
  function altChanged(down) {
    if (MODE !== 'inspect' || altHeld === down) return;
    altHeld = down;
    if (lastRaw && lastRaw.isConnected) hovered = resolveTarget(lastRaw, altHeld);
    schedule();
  }
  window.addEventListener('keydown', function (e) { if (e.key === 'Alt') altChanged(true); });
  window.addEventListener('keyup', function (e) { if (e.key === 'Alt') altChanged(false); });
  window.addEventListener('blur', function () { altChanged(false); });

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
  document.addEventListener('gbd:close', function () {
    drawerOpen = false;
    selected = null;   /* the chosen element lets go of its distances */
    schedule();
  });

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
        /* Rank, not call order: Device is declared by the console
           itself in connectedCallback and this call waits on
           whenDefined, so without it Mode would land second on every
           page (gbppl-panel-7). */
        rank: 1,
        value: MODE,
        options: [
          { label: 'View', value: 'view',
            note: 'The page behaves as it does for a visitor.' },
          { label: 'Inspect', value: 'inspect',
            note: 'Hover for the box, click for properties. Keys: i switches, Alt drills in and measures the gaps, Esc leaves.' }
        ],
        /* gbppl-comments-b: the toggle now has a third position, and
           it is not ours. A click on View or Inspect is a click AWAY
           from Comment, so the value is passed on as it came and the
           other owner reads it off the same event we already send. */
        onChange: function (v) { if (v === 'view' || v === 'inspect') setMode(v); }
      });
      /* Whoever asked for the toggle gets it the moment it exists. */
      var waiting = switchWaiters;
      switchWaiters = [];
      waiting.forEach(function (fn) { fn(handle); });
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
    /* gbppl-oro-props-1. The doors are hung after the page's own
       scripts have built their shelves, and re-hung whenever one of
       them rebuilds. A page with no data-inspect region gets none of
       this and pays for none of it. */
    mountDoors();
    watchRegions();
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
     properties of something without waiting for a click can.

     SIX MORE WITH gbppl-comments-b, and every one of them exists so
     that Comment mode does not grow a second answer to a question
     this file already answers (Тон-6). A comment belongs to an
     ELEMENT, and which element the pointer means, what to call it,
     which file owns it and what not to point at are the instrument's
     questions, asked in a different mode:

       target(el, drill)  the SOLID resolution: a button is one thing,
                          not a label inside a box
       isChrome(el)       the console, the drawer, the stage and this
                          layer are not the page
       outline(el)        the hairline and the plate, without rulers
       outlineOff()       and take it away
       lede(el)           the «Lives in <file>» line of the drawer, so
                          a thread opens with the same first line a
                          measurement does
       onModeSwitch(fn)   the Mode toggle, when it exists */
  window.GbInspect = {
    tokenFor: tokenFor, tokenValue: tokenValue, px: px, norm: norm, rungs: rungs,
    identify: identify, openFor: openFor,
    setMode: setMode, mode: function () { return MODE; },
    register: function (name, spec) { KINDS[name] = spec; },
    target: resolveTarget, isChrome: isChrome,
    outline: outline, outlineOff: clearOverlay,
    lede: function (el) { return ledeBlock(identify(el)); },
    onModeSwitch: onModeSwitch
  };
})();
