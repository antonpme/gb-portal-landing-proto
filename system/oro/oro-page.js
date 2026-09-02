/* ============================================================
   gbppl-oro-engine-1 — THE COMPONENT PAGE, AS AN APPLICATION
   ------------------------------------------------------------
   Тон, 01.09: «Наведи порядок по текущим компонентам, чтобы они
   все были построены на одном шаблоне страницы. Нужно сделать это
   системным: шаблон страницы компонента для дизайн-системы. Сделай
   как мини-приложение, чтобы фактически менялась только начинка и
   не приходилось переписывать каждую страницу статично. Идти в
   сторону нормального лёгкого, простого и безопасного приложения,
   а не лепить статику.»
   And: «нам нужно, чтобы всё было по одному канону, и если мы
   потом будем его улучшать, он должен улучшаться по всей системе
   сразу. Подумай, как это делать, чтобы потом каждую страницу не
   переделывать.»

   WHAT WAS WRONG. Ten showcases carried the same page by hand: the
   same eleven stylesheet links, the same studio bar, the same rail,
   the same contents aside, the same reading column, the same
   drawer, the same console, the same seven script tags. Around 130
   lines of a 700 to 1200 line file said nothing about the component
   it was documenting. And because they were ten copies they had
   already drifted: five pages opened a section with an Eyebrow over
   a serif H2 inside a <section>, three opened it with a .gbdoc-sub
   over an .oro-h3 and no section element at all, two put the status
   flag on the H1 and two on a second heading below it, and the
   stylesheet order was different on almost every one of them. A
   reader who learned Button had to learn Select again.

   THE ANSWER IS NOT ONE PAGE WITH A QUERY. The law of links (skill
   0a.5, Ton 01.09: «команда полагается на то, что они будут
   доступны всегда») says every component keeps its own address for
   good: select.html is select.html. So the file stays, and what
   changes is what is IN it. A component page is now a DECLARATION
   plus two calls:

     <head>
       <script src="../components/studio.js" data-home="../../index.html"></script>
       <script src="oro-page.js"></script>
       <script>GbOro.head({ name: 'Button', css: ['booking'] });</script>
     </head>
     <body>
       <script src="oro.js"></script>
       <script src="oro-page.js"></script>          (already loaded, cached)
       <script>GbOro.page({ ...the whole document as data... });</script>
       ...the standard scripts, then the page's own measuring script
     </body>

   IMPROVING THE CANON IS NOW ONE EDIT. Move the status flag, change
   what a section head looks like, add a link to the standard set,
   reorder the playground card: it happens here and every showcase
   has it on the next reload. That is the whole of the second
   sentence Ton said.

   WHY THE GATE IS STILL WRITTEN OUT BY HAND. studio.js is the lock
   on the door. A parser inserted script blocks the parser; a script
   this file appended would not, and the body would paint for the
   length of a redirect. One line of gate per page is the price of
   the gate meaning something, and it is the only line of the shell
   a page still writes.

   SAFE, LIGHT, SIMPLE, in the terms of the order:
     · no build step, no dependency, no module: one classic script,
       the same stack as the rest of site/;
     · nothing is fetched, from this origin or any other. The page
       is its own data;
     · no eval, no new Function, no attribute string turned into
       code;
     · innerHTML is spent ONLY on literals that came out of the
       page's own declaration, which is to say out of the file the
       browser already parsed. Names, labels and every value that
       could be mistaken for markup go through esc(); the fields
       that ARE markup (a table's rows, a section's html block) are
       named html in the API so that a reader of a page can see
       which is which.

   WHAT THIS FILE DOES NOT OWN. The playground panel is
   GbOro.controls in oro.js and stays there: this file draws the
   CARD it stands in and hands the page a schema-shaped hole. The
   measurements are the page's own script, and they stay live — a
   number on an Oro page is read off a rendered specimen with
   getComputedStyle, never printed from a declaration, and nothing
   here changes that.
   ------------------------------------------------------------
   THE DECLARATION, in full.

   GbOro.head({
     name:   'Button',            the component. The tab reads
                                  «Button · Oro, GildedBox Design System»
     title:  'Icons',             optional, when the tab name is not the
                                  component name
     css:    ['inputnumber',      extra component stylesheets by basename,
              ['booking',         or a pair, and then the second half is the
               'why it is here']] reason, written into the document as a
                                  comment where the link stands
     style:  '.x { ... }'         page-local CSS. Antidotes only, each one
                                  argued in place (trap 3 of the skill)
   })

   GbOro.page({
     eyebrow: 'Base component',
     name:    'Button',
     status:  { label: 'Stable' } or { label: 'Declared', kind: 'declared' }
              or false, for a page whose subject has no one status
     lede:    'one sentence',
     readout: 'Window width right now: <b id="wnow">measuring</b>. ...'
              optional; the live line under the lede
     card:    { id: 'buttons', toc: 'Button' },
     sections: [ ...see below... ],
     sources: 'the Sources line of the foot, as html',
     probes:  '<button ...>'      optional, the off screen specimens the
                                  anatomy table measures
     probesId: 'probes'           optional, when the page fills the probe
                                  box from its own script instead
     drawer:  true                the properties drawer. Default true
   })

   A SECTION:
     { id: 'playground',          optional. No id, no entry in the contents
       toc: 'Playground',         optional. The name in the contents
       eyebrow: 'Playground',     the Eyebrow over the heading
       h2: 'Build a button and read it back',
       blocks: [ ... ] }

   A BLOCK is an object with exactly one of:
     { p: 'html' }                a paragraph of the document
     { note: 'html' }             the quieter aside under a specimen
     { readout: 'html' }          the live line, the one that holds a <b id>
     { table: { head: [..] | null,
                rows: '<tr>..</tr>' | [[cell, cell], ..],
                body: 'stBody' } } a tbody id, for a table a script fills
     { code: { id: 'codeBasics', text: '&lt;button ...' } }
                                  the text is already escaped, exactly as it
                                  stood between <pre><code> before
     { pg: { name: 'button',      the playground card. name is the data-pg
             inspect: 'button',   handle GbOro.controls is given
             hold: 'gbdoc-hold--block',   optional extra class on the hold
             ground: true } }     false leaves the stage without the switch
     { html: 'anything' }         the escape hatch, for the one block on a
                                  page that is genuinely its own: a
                                  workbench, a matrix, a shelf of live
                                  specimens. It is a literal of the page,
                                  like every other field here
   ============================================================ */
(function () {
  'use strict';

  var GbOro = window.GbOro = window.GbOro || {};

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }


  /* ============================================================
     1. THE HEAD
     ------------------------------------------------------------
     ONE ORDER OF STYLESHEETS FOR THE WHOLE SHOWCASE. Before this
     file no two pages agreed: toggle.css stood second on one page
     and eleventh on the next, auth.css moved around it, and the
     order was never a decision, only the order somebody happened
     to add a line in. The files are scoped to their own prefixes,
     so no order was wrong; but ten different orders is ten pages
     nobody can compare.

     The order below is the dependency order and reads as one:
     tokens, then the shell everything stands on, then the
     organisms a showcase spends whatever its subject is (button,
     icon, toggle and field are the four the playground rail itself
     is built out of), then the page's own extra organisms, then
     the four files of the documentation and the instrument, then
     the console, then the layout of the showcase.
     ============================================================ */
  var FONT_CSS = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,500;0,600&display=swap';

  /* The four the RAIL is made of stand here whether the subject
     uses them or not: GbOro.controls draws its toggles out of
     .gb-toggle and its Selects and text fields out of gb-field. */
  var CSS_HEAD = ['../assets/tokens.css', '../components/shell.css',
                  '../components/header.css', '../components/button.css',
                  '../components/icon.css', '../components/toggle.css',
                  '../components/auth.css'];
  var CSS_FOOT = ['../components/drawer.css', '../components/docs.css',
                  '../components/inspect.css', '../components/comments.css',
                  '../components/studio-panel.css', 'oro.css'];

  /* LAYOUT MEASURE, not a token: wide blocks, narrow prose. A
     matrix needs more room than a paragraph should ever have, so
     the column opens to 1180 and the READING elements keep their
     860. Every component page carried these two lines in a <style>
     of its own; they are the same two lines and they are the
     canon, so they are here. Pages of the other kind (About,
     Colors) never had them and keep the 860 column oro.css gives
     them: this runs only where GbOro.head is called. */
  var COLUMN = '.oro-col { max-width: 1180px; }\n' +
               '.oro-lede, .oro-p, .oro-note, .gbdoc-card__line { max-width: 860px; }';

  /* THE HEAD IS WRITTEN INTO THE DOCUMENT, NOT APPENDED TO IT, and
     the difference is the whole reason this function exists at all.
     A <link> the parser reads blocks the scripts that come after it:
     nothing runs until the stylesheet is in. A <link> a script
     appends does not, and a showcase measures its own specimens the
     moment its script runs — so an appended stylesheet gives a page
     that LOOKS right, because the CSS lands before the first paint,
     and prints numbers taken off unstyled elements. Caught by the
     gate of this wave: every colour in the state table came back as
     the browser's own button grey, and the icon box came back auto.

     document.write during parsing puts the tokens where the script
     tag stands, which is exactly the hand written head it replaces.
     It is only ever called while the document is still parsing; the
     guard says so out loud, because the same call after load would
     wipe the page. */
  function addHTML(html) {
    if (document.readyState === 'loading') { document.write(html); return; }
    console.warn('GbOro.head: called after parsing. The stylesheets are appended, ' +
                 'and a page that measures at load may read unstyled elements.');
    document.head.insertAdjacentHTML('beforeend', html);
  }

  GbOro.head = function (spec) {
    spec = spec || {};
    var title = (spec.title || spec.name || 'Oro') + ' · Oro, GildedBox Design System';
    var out = '<title>' + esc(title) + '</title>\n' +
              '<link rel="icon" href="data:," />\n' +
              '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
              '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
              '<link href="' + FONT_CSS + '" rel="stylesheet">\n';

    CSS_HEAD.forEach(function (href) {
      out += '<link rel="stylesheet" href="' + href + '">\n';
    });
    (spec.css || []).forEach(function (one) {
      var name = one, why = '';
      if (Object.prototype.toString.call(one) === '[object Array]') { name = one[0]; why = one[1]; }
      if (why) out += '<!-- ' + String(why).replace(/--+>/g, '') + ' -->\n';
      out += '<link rel="stylesheet" href="../components/' + esc(name) + '.css">\n';
    });
    CSS_FOOT.forEach(function (href) {
      out += '<link rel="stylesheet" href="' + href + '">\n';
    });

    out += '<style>\n' + COLUMN + (spec.style ? '\n\n' + spec.style : '') + '\n</style>';
    addHTML(out);
  };


  /* ============================================================
     2. THE SHELL
     ------------------------------------------------------------
     The studio bar, the rail, the contents aside, the reading
     column, the foot, the drawer and the console. Every one of
     them was copied into ten files; the addresses in them are
     constant because every consumer of this engine stands in
     system/oro/, which is also why the rail can be a plain
     index.html and the logo a plain ../assets/.
     ============================================================ */
  function studioBar() {
    return '<header class="gb-header gb-header--studio">\n' +
      '<div class="gb-container gbh-bar gbh-bar--studio">\n' +
      '<a class="gbh-lock" href="../../index.html" aria-label="GildedBox Design Studio, home">' +
      '<img class="gbh-lock__mark" src="../assets/gildedbox-logo.svg" alt="GildedBox" width="168" height="56">' +
      '<span class="gbh-lock__rule" aria-hidden="true"></span>' +
      '<span class="gbh-lock__word">Design Studio</span></a>\n' +
      '<nav class="gbh-nav" aria-label="Studio">' +
      '<a class="gbh-link" href="../../live/map.html">Live Prototype</a>' +
      '<a class="gbh-link" href="../../sandboxes.html">Sandboxes</a>' +
      '<a class="gbh-link is-active" href="index.html" aria-current="page">Design System</a></nav>\n' +
      '<div class="gbh-actions">' +
      '<button class="gb-btn gb-btn--medium gb-btn--outline gb-btn--secondary" type="button" data-studio-lock>' +
      '<span class="gb-btn__label" data-pc-section="label">Lock</span></button></div>\n' +
      '</div>\n</header>';
  }


  /* ============================================================
     3. THE BLOCKS OF A SECTION
     ------------------------------------------------------------
     Six shapes and one escape hatch. Every one of them is
     furniture the showcase already had, and the point of naming
     them is that the furniture is now described once: change what
     a table wrapper is, and every table in the system changes.
     ============================================================ */

  /* A table. rows may be the html of the rows, which is how a page
     that already had the table hands it over unchanged, or an array
     of arrays, which is how a new one is written. A cell of an
     array row is html too: half the cells in the house hold a
     <code> or a provenance flag. */
  function tableHTML(t) {
    var head = '';
    if (t.head && t.head.length) {
      head = '<thead><tr>' + t.head.map(function (h) {
        return '<th>' + h + '</th>';
      }).join('') + '</tr></thead>';
    }
    var rows = '';
    if (typeof t.rows === 'string') rows = t.rows;
    else if (t.rows) {
      rows = t.rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
      }).join('\n');
    }
    return '<div class="gbdoc-tablewrap">\n<table class="gbdoc-table">' + head +
           '<tbody' + (t.body ? ' id="' + esc(t.body) + '"' : '') + '>' + rows + '</tbody>' +
           '</table>\n</div>';
  }

  /* A code block with its Copy button. The text is already escaped
     — it is the same string that stood between <pre><code> and
     </code></pre> in the file this page grew out of — so it is
     written through, not escaped twice. */
  function codeHTML(c) {
    return '<div class="gbdoc-code">\n' +
      '<button class="gbdoc-copy" type="button" data-copy="#' + esc(c.id) + '">Copy</button>\n' +
      '<pre><code id="' + esc(c.id) + '">' + c.text + '</code></pre>\n' +
      '</div>';
  }

  /* THE PLAYGROUND CARD, and this one is the reason the engine
     earns its keep twice over. The block is .gbdoc-pg out of
     components/docs.css and the panel inside it is GbOro.controls
     out of oro.js; what stood in every showcase was twenty lines of
     markup wiring the two together, and twenty lines copied nine
     times is nine chances to leave out the ground host or to
     forget that the code fold starts hidden.

     The ids are fixed rather than generated: one playground per
     showcase is the rule (spec §1), every page already spelled them
     pgStage, pgHold and pgCode, and a fixed id is a thing a page's
     own script and the reader's URL bar can both reach. */
  function pgHTML(pg) {
    var hold = 'gbdoc-hold' + (pg.hold ? ' ' + pg.hold : '');
    /* gbppl-showcase-tools-1. THE CARD HAS TWO ZONES AND NO THIRD:
       the canvas and the rail. What used to stand between them is
       gone — the ground host in the corner of the scene, and the
       footer band with the Preview | Code switch in it — because
       every control of the card is a row of the rail now. The two
       quiet lines the card used to carry inside itself, the page's
       own foot and the one measured line, stand under it. */
    return '<div class="gbdoc-pg" data-pg="' + esc(pg.name) + '">\n' +
      '<div class="gbdoc-pg__body">\n' +
      '<div class="gbdoc-pg__view">\n' +
      '<div class="gbdoc-pg__scene" data-pg-scene id="pgStage"' +
      (pg.inspect ? ' data-inspect="' + esc(pg.inspect) + '"' : '') + '>\n' +
      '<div class="' + hold + '" id="pgHold" data-pg-hold></div>\n' +
      '</div>\n' +
      '<div class="gbdoc-pg__code" data-pg-codewrap hidden>\n' +
      '<div class="gbdoc-code">\n' +
      '<button class="gbdoc-copy" type="button" data-copy="#pgCode">Copy</button>\n' +
      '<pre><code id="pgCode" data-pg-code></code></pre>\n' +
      '</div>\n</div>\n</div>\n' +
      '<div class="gbdoc-pg__rail" data-pg-rail></div>\n' +
      '</div>\n</div>\n' +
      /* The one line under the card that the page's own script
         writes: which specimen is standing, and why a value is out.
         Icons has one; the pages whose readout is a table beside the
         card do not, and say so in their own words. */
      (pg.foot ? '<p class="gbdoc-foot" id="' + esc(pg.foot) + '"></p>\n' : '') +
      '<p class="gbdoc-pg__read" data-pg-read></p>';
  }

  function blockHTML(b) {
    if (b.p != null) return '<p class="oro-p">' + b.p + '</p>';
    if (b.note != null) return '<p class="oro-note">' + b.note + '</p>';
    if (b.readout != null) return '<p class="gbdoc-readout">' + b.readout + '</p>';
    if (b.table) return tableHTML(b.table);
    if (b.code) return codeHTML(b.code);
    if (b.pg) return pgHTML(b.pg);
    if (b.html != null) return b.html;
    console.warn('GbOro.page: a block with no shape the engine knows', b);
    return '';
  }

  /* ONE SECTION, ONE SHAPE, EVERYWHERE. An Eyebrow, a serif H2, the
     blocks, inside a <section> that carries the id the contents
     point at and the name they print. This is the drift the wave
     was called for: five showcases wrote it this way, three wrote a
     .gbdoc-sub over an .oro-h3 with no section at all, and the
     reader had to learn two documents. */
  function sectionHTML(s) {
    return '<section class="oro-section"' +
      (s.id ? ' id="' + esc(s.id) + '"' : '') +
      (s.toc ? ' data-toc="' + esc(s.toc) + '"' : '') + '>\n' +
      (s.eyebrow ? '<span class="gb-eyebrow">' + esc(s.eyebrow) + '</span>\n' : '') +
      (s.h2 ? '<h2 class="oro-h2">' + s.h2 + '</h2>\n' : '') +
      (s.blocks || []).map(blockHTML).join('\n') +
      '\n</section>';
  }


  /* ============================================================
     4. THE PAGE
     ------------------------------------------------------------
     One call, and the document exists. It runs at the top of the
     body, before the seven standard scripts, so that every one of
     them — the icon record, the field, the toggle, the drawer, the
     instrument, the comment layer, the console — finds the same
     finished document it used to find when the page was written out
     by hand.
     ============================================================ */
  GbOro.page = function (spec) {
    spec = spec || {};
    var st = spec.status;
    var flag = '';
    if (st) {
      flag = ' <span class="gbdoc-flag' +
        (st.kind ? ' gbdoc-flag--' + esc(st.kind) : '') +
        ' gbdoc-status">' + esc(st.label) + '</span>';
    }

    var head = '<header class="oro-head">\n' +
      (spec.eyebrow ? '<span class="gb-eyebrow">' + esc(spec.eyebrow) + '</span>\n' : '') +
      '<h1 class="oro-h1">' + esc(spec.name) + flag + '</h1>\n' +
      /* A lede may be two paragraphs. Input number spends the second
         one on why it is not called Stepper any more, which is a
         thing a reader arriving from the old name needs before
         anything else on the page. */
      [].concat(spec.lede || []).map(function (l) {
        return '<p class="oro-lede">' + l + '</p>\n';
      }).join('') +
      (spec.readout ? '<p class="gbdoc-readout">' + spec.readout + '</p>\n' : '') +
      '</header>';

    var card = spec.card || {};
    var body = '<section class="gbdoc-card"' +
      (card.id ? ' id="' + esc(card.id) + '"' : '') +
      (card.toc ? ' data-toc="' + esc(card.toc) + '"' : '') + '>\n' +
      (spec.sections || []).map(sectionHTML).join('\n\n') +
      '\n</section>';

    var html =
      studioBar() + '\n' +
      '<div class="oro">\n' +
      '<nav class="oro-rail" aria-label="Design system sections"><div data-oro-rail></div></nav>\n' +
      '<main class="oro-main">\n' +
      '<aside class="oro-toc" data-oro-toc hidden></aside>\n' +
      '<div class="oro-col">\n' +
      head + '\n' + body + '\n' +
      (spec.sources ? '<footer class="oro-foot">' + spec.sources + '</footer>\n' : '') +
      '</div>\n</main>\n</div>\n' +
      (spec.drawer === false ? '' : '<gb-drawer id="propsDrawer"></gb-drawer>\n') +
      (spec.probes || spec.probesId
        ? '<div class="gbdoc-probes" aria-hidden="true"' +
          (spec.probesId ? ' id="' + esc(spec.probesId) + '"' : '') + '>' +
          (spec.probes || '') + '</div>\n'
        : '') +
      '<gb-studio-panel data-root="../../" page="oro"></gb-studio-panel>';

    /* The shell is written where the call stands, which is the top
       of the body: insertAdjacentHTML on the body's start keeps the
       page's own script tags below it, in the order the page wrote
       them, and keeps the parser going straight into them. */
    document.body.insertAdjacentHTML('afterbegin', html);

    /* The menu of pages is oro.js's, and it is asked for outright
       rather than left to its own DOMContentLoaded net: the rail
       should be there on the first paint, not one task later. */
    if (GbOro.rail) GbOro.rail();

    /* The Copy buttons of every code block on the page, wired once
       by the engine instead of by nine page scripts. The contents
       aside is oro.js's own DOMContentLoaded reader and is left to
       it: it has to run after a page that draws sections of its own
       has drawn them. */
    document.addEventListener('DOMContentLoaded', function () {
      if (GbOro.watchCopy) GbOro.watchCopy();
    });
  };
})();
