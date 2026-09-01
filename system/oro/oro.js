/* ============================================================
   gbppl-oro-pages-1 / gbppl-oro-cleanup-1 / gbppl-oro-canon-1
   — WHAT EVERY ORO PAGE SHARES
   ------------------------------------------------------------
   FOUR BLOCKS, ONE FILE, and they are here for one reason: a
   thing every showcase does must be described once.
     1. THE RAIL (gbppl-oro-pages-1), the menu of pages.
     2. window.GbOro (gbppl-oro-cleanup-1), the five small scripts
        every showcase used to keep its own copy of.
     3. window.ORO_AXES (gbppl-oro-canon-1), the canon of axes:
        one name and one control per recurring axis, read before
        any arithmetic.
     4. GbOro.controls (gbppl-oro-canon-1), the playground panel
        renderer: a showcase hands over a schema and gets the
        panel, the rule, the conditional hiding, the More fold,
        the Reset, the ground on the stage and the Preview | Code
        band. Its markup and its grounds are .gbdoc-pg-* in
        system/components/docs.css.
   The argument for each is written out under it.
   ------------------------------------------------------------
   gbppl-oro-pages-1 — THE RAIL, IN ONE PLACE
   ------------------------------------------------------------
   Ton, 28.08 (Ton-19): «Сейчас это выглядит так, будто всё лежит
   на одной странице со скроллом, но это неправильно. Каждый
   компонент должен быть представлен отдельной страницей, должна
   быть нормальная навигация... Пользователь заходит в раздел
   Components, никакого промежуточного каталога нет; сразу
   открывается вводная страница, что такое компоненты; дальше
   отдельные страницы самих компонентов. Посмотри, как это
   сделано в Tailwind, PrimeVue.»

   WHY THE MENU LEFT THE MARKUP. Until this wave the rail was
   hand copied into six files. Six was already one edit too many
   and the copies had drifted: Icons was current on one page and
   plain on another, «Catalogue» pointed at a page that had been
   renamed in the reader's head to Overview. This wave takes the
   Components section from three links to a list that grows with
   every showcase, so the same markup would now be copied into
   ten files and into every file after that. A menu maintained in
   ten places is not a menu, it is ten menus that happen to agree
   today.

   So the rail is DATA plus one renderer, which is the pattern the
   studio already uses twice: studio-panel.js keeps its doors and
   its PLACES table in the script, header.js renders the site bar
   from attributes. Nothing new is invented here, and the one
   sentence a page has to write is the empty div the rail lands in.

   WHAT IS DATA AND WHAT IS NOT. NAV below is the whole menu: the
   order, the captions, the pages that exist and the ones that are
   only announced. The table of contents of a page is NOT here: it
   describes that one document, it changes when the document does,
   and it belongs beside it. Since gbppl-oro-toc-1 it is not
   anywhere at all as data: the second block of this file reads it
   off the document, and Ton took it out of this rail entirely
   («навигацию по странице не нужно смешивать с навигацией по
   страницам»).

   THE CURRENT PAGE IS READ, NOT DECLARED. aria-current comes from
   location, so a page cannot forget to mark itself and cannot
   mark the wrong entry. An entry that carries a hash never takes
   it: Icon button points into icons.html, and on icons.html the
   entry that is current is Icons.
   ============================================================ */
(function () {
  'use strict';

  /* The menu. Foundations first, because a component is spent out
     of them; then the opening page of Components and the pages
     themselves, alphabetical inside a level. Base and Composite
     are CAPTIONS, not destinations: Ton, same conversation, «не
     должно быть структуры вроде Components → Каталог → Что такое
     каталог → Base → Compose, это лишнее».

     A component appears here the day its page does. The registry
     on components.html carries all fifty four either way, so the
     rail stays a list of places you can actually go. */
  var NAV = [
    { href: 'index.html', label: 'About' },

    { group: 'Foundations' },
    { href: 'typography.html', label: 'Typography' },
    { href: 'colors.html', label: 'Colors' },
    { href: 'icons.html', label: 'Icons' },
    { soon: 'Tokens' },
    { soon: 'Motion' },

    { group: 'Components' },
    { href: 'components.html', label: 'Overview' },

    { group: 'Base', sub: true },
    { href: 'button.html', label: 'Button' },
    { href: 'badge.html', label: 'Count badge' },
    { href: 'eyebrow.html', label: 'Eyebrow' },
    { href: 'field.html', label: 'Field' },
    { href: 'icons.html#iconbutton', label: 'Icon button' },
    /* gbppl-inputnumber-1. It stood last as Stepper; the rail is
       alphabetical, so under its own name it stands here. */
    { href: 'inputnumber.html', label: 'Input number' },
    { href: 'select.html', label: 'Select' },
    /* gbppl-toggle-family-1. Last of the Base list under its own
       name, and the name is the house's: PrimeVue would call this
       control a SelectButton and keep ToggleButton for the single
       boolean one, which the page says out loud. Renaming it moves
       a class the checkout wears, so it waits on Ton. */
    { href: 'toggle.html', label: 'Toggle button' },

    { group: 'Composite', sub: true },
    { href: 'drawer.html', label: 'Drawer' }
  ];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* The file we are standing in. A directory address counts as its
     own index.html, the same equivalence the sandbox registry and
     the console's PLACES table make. */
  function here() {
    var last = location.pathname.split('/').pop();
    return last === '' ? 'index.html' : last;
  }

  function render(host) {
    var now = here();
    var out =
      '<a class="oro-lock" href="index.html">' +
        '<span class="oro-lock-name">Oro</span>' +
        '<span class="oro-lock-sub gb-eyebrow">Design system</span>' +
      '</a>' +
      '<div class="oro-nav">';

    for (var i = 0; i < NAV.length; i++) {
      var it = NAV[i];

      if (it.group) {
        out += '<span class="oro-navgroup' + (it.sub ? ' oro-navgroup--sub' : '') +
               '">' + esc(it.group) + '</span>';
        continue;
      }

      if (it.soon) {
        out += '<span class="oro-link oro-link--soon" aria-disabled="true">' +
               esc(it.soon) + ' <span class="oro-soon">Soon</span></span>';
        continue;
      }

      var isCurrent = it.href.indexOf('#') === -1 && it.href === now;
      out += '<a class="oro-link" href="' + esc(it.href) + '"' +
             (isCurrent ? ' aria-current="page"' : '') + '>' + esc(it.label) + '</a>';
    }

    out += '</div>';
    host.innerHTML = out;
    host.removeAttribute('data-oro-rail');
  }

  function boot() {
    var host = document.querySelector('[data-oro-rail]');
    if (host) render(host);
  }

  /* The script tag stands right after the rail, so the host is
     already parsed and the menu is there before the first paint.
     The listener is the safety net for a page that moves the tag. */
  if (document.querySelector('[data-oro-rail]')) boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();


/* ============================================================
   gbppl-oro-cleanup-1 — THE FIVE THINGS EVERY SHOWCASE DID ITSELF
   ------------------------------------------------------------
   Ton, 28.08 (Ton-14, section 6a of the skill): «система не только
   в компонентах, но и в паттернах, в отступах, в шрифтах,
   абсолютно во всём; строим систему, начиная с нашей собственной
   студии, она должна быть воплощением системности». The rail was
   the first thing the showcase stopped copying by hand. This is
   the second, and it is the same argument: eight pages carried
   the same five small scripts, byte for byte in the lucky cases
   and nearly so in the rest, and «nearly» is how a page ends up
   telling the reader something its neighbour does not.

   WHAT MOVED, AND WHY THESE FIVE. Every one of them is furniture
   of the showcase TEMPLATE, not of any one component: how a
   measured number is printed, how a readout is written, how a
   snippet reaches the clipboard, how the contents follow the
   reader, how the window says how wide it is. Nothing that
   describes a component came along: the playgrounds, the
   workbenches and the state tables stay on their own pages,
   because they are the page.

   THE DIVERGENCES THAT EXISTED, AND WHICH READING WON. The rule
   for the wave was button.html, the reference showcase.
     · drawer.html reported a successful copy even when the
       clipboard REFUSED it (`.then(done, done)`), and its
       textarea fallback was missing the readonly flag. Both gone:
       it now copies the way the other seven do.
     · icons.html had already factored a `copy(text, done)` out of
       the button handler for its second consumer, the glyph rows.
       That factoring is what this module is.
     · colors.html reads the boolean execCommand returns and says
       «Could not reach the clipboard» when it is false. THIS is
       the one place button.html did NOT win: it calls the copy
       done as soon as execCommand has not thrown, which reports
       a success the browser refused, and «прибор не выдумывает»
       (Ton, 27.08) settles that. copy() therefore resolves to
       true or false, and the seven pages that only light a label
       light it on true.
     · eyebrow.html and badge.html carried the copy wiring with no
       Copy button anywhere in their markup. They keep the call:
       one line, the same no-op, and the day either page grows a
       snippet it behaves like its siblings without remembering to.

   WHAT DID NOT CHANGE, AND WAS CHECKED BEFORE AND AFTER: the word
   Copied, the 1400ms it stands, the 140px line the contents
   measure a section against, the 90ms it waits after a scroll,
   and one decimal on every number.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- one decimal ----------
     The second one is the reader's display scaling talking, not
     the system: a 20px glyph comes back as 19.99 at 113 per cent. */
  function px(v) {
    var n = parseFloat(v);
    if (isNaN(n)) return v;
    return Math.round(n * 10) / 10 + 'px';
  }

  /* ---------- write a measured value into the page ---------- */
  function txt(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  /* ---------- the window says how wide it is ----------
     Every page prints the same sentence in one to three places,
     and every one of them means window.innerWidth. */
  function widthNow() {
    var w = window.innerWidth + 'px';
    for (var i = 0; i < arguments.length; i++) txt(arguments[i], w);
    return w;
  }

  /* ---------- the clipboard ----------
     Clipboard API where the browser allows it, a hidden textarea
     and execCommand where it does not: the showcase is opened over
     http and over file:// and has to work in both. Resolves to
     whether the text actually left: a caller that lights a label
     lights it on true, and colors.html says so out loud on false. */
  function legacyCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok !== false;
    } catch (err) { return false; }
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text)
        .then(function () { return true; },
              function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  /* ---------- the Copy button of a code block ----------
     `.gbdoc-copy[data-copy]` points at the element whose text is
     the snippet. The label says Copied for 1400ms and goes back. */
  function watchCopy(root) {
    var scope = root || document;
    Array.prototype.forEach.call(
      scope.querySelectorAll('.gbdoc-copy[data-copy]'),
      function (btn) {
        btn.addEventListener('click', function () {
          var target = document.querySelector(btn.getAttribute('data-copy'));
          if (!target) return;
          copy(target.textContent).then(function (ok) {
            if (!ok) return;
            btn.textContent = 'Copied';
            setTimeout(function () { btn.textContent = 'Copy'; }, 1400);
          });
        });
      }
    );
  }

  /* ============================================================
     gbppl-oro-toc-1 — THE CONTENTS OF THE PAGE, WRITTEN BY THE PAGE
     ------------------------------------------------------------
     Ton, 29.08: «Навигация On this page у нас в левом меню, что
     неправильно. Навигацию по странице не нужно смешивать с
     навигацией по страницам.» The block moved out of the rail and
     to the right of the document (oro.css, THE CONTENTS OF THIS
     PAGE); this is where its list comes from.

     IT IS READ OFF THE DOCUMENT, NOT WRITTEN BESIDE IT. Ten pages
     each kept their contents by hand, and two of them (About and
     Colors) had none at all while carrying four sections apiece. A
     hand list is a second copy of the page structure, and a second
     copy drifts: the same argument that took the rail into NAV
     above, one level down. Here it is stronger, because the list
     changes every time a section is added, and nobody adds a
     section thinking about a list in another part of the file.

     WHAT COUNTS AS A SECTION. An element inside the document that
     carries an id and is either a heading itself (h2, h3, the
     showcase's .gbdoc-sub and .oro-h2/.oro-h3, the type record's
     group name, the registry's group eyebrow) or a <section> that
     holds one. Anything else with an id — a readout span, a control
     box, a drawer host — is not a place, and is skipped.

     WHAT IT IS CALLED. The heading's own text, unless the section
     says otherwise with data-toc. The override earns its place on
     exactly the headings whose text is not a name: a card whose
     first heading is the word «Overview» is the Button card, and
     colors.html titles its sections in sentences («Zinc: the only
     grey in the brand»), which is a good heading and a bad entry.
     The attribute lives ON the section, so it cannot go missing
     when the section does.

     RANK IS NESTING, not a class: a section inside a section is one
     step in. Two steps is the floor, which is all the showcase has
     ever had.

     WHEN IT RUNS. watchToc() builds before it watches, so the eight
     pages that already called it at the end of their script keep the
     one call they had, and typography.html — which draws seven of
     its own sections at runtime — still gets a list that includes
     them, because its call already stood after it had drawn them.
     A page that calls nothing gets the list on DOMContentLoaded. */
  var HEAD = 'h2, h3, .oro-h2, .oro-h3, .gbdoc-sub, .gbdoc-type__gname, .gbdoc-reg__group';
  var tocBuilt = false;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* The name of a place. Status flags and copy buttons ride inside
     headings and are not part of the name. */
  function tocLabel(el) {
    var given = el.getAttribute('data-toc');
    if (given) return given;
    var head = el.matches(HEAD) ? el : el.querySelector(HEAD);
    if (!head) return '';
    var clone = head.cloneNode(true);
    Array.prototype.forEach.call(
      clone.querySelectorAll('.gbdoc-flag, .gbdoc-copybtn, .oro-soon'),
      function (n) { if (n.parentNode) n.parentNode.removeChild(n); }
    );
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function tocEntries() {
    var main = document.querySelector('.oro-main');
    if (!main) return [];
    var found = [];
    Array.prototype.forEach.call(main.querySelectorAll('[id]'), function (el) {
      if (el.closest('[data-oro-toc]')) return;
      var isHead = el.matches(HEAD);
      var isSection = el.tagName === 'SECTION' && el.querySelector(HEAD);
      if (!isHead && !isSection) return;
      var text = tocLabel(el);
      if (text) found.push({ el: el, id: el.id, text: text });
    });
    for (var i = 0; i < found.length; i++) {
      var lvl = 0;
      for (var j = 0; j < i; j++) {
        if (found[j].el !== found[i].el && found[j].el.contains(found[i].el)) lvl++;
      }
      found[i].level = lvl > 2 ? 2 : lvl;
    }
    return found;
  }

  /* One section is not a table of contents: the block stays out of
     the page rather than pointing at the only thing on it. */
  function buildToc() {
    tocBuilt = true;
    var host = document.querySelector('[data-oro-toc]');
    if (!host) return [];
    var list = tocEntries();
    if (list.length < 2) { host.innerHTML = ''; host.hidden = true; return []; }

    var out = '<span class="oro-toc-title gb-eyebrow">On this page</span>' +
              '<nav class="oro-toc-list" aria-label="On this page">';
    for (var i = 0; i < list.length; i++) {
      var mod = list[i].level === 1 ? ' oro-toc-link--sub'
              : list[i].level === 2 ? ' oro-toc-link--sub2' : '';
      out += '<a class="oro-toc-link' + mod + '" href="#' + esc(list[i].id) + '">' +
             esc(list[i].text) + '</a>';
    }
    host.innerHTML = out + '</nav>';
    host.hidden = false;
    return list;
  }

  /* ---------- the contents follow the reader ----------
     The links are read ONCE, after the list has been built, so a
     page that draws part of its own document (typography.html draws
     a section per group of the scale) has to call this after it has
     drawn it, exactly as it did when the two lines lived on the
     page. The lit entry is the last section whose top has passed
     140px, and the scroll is answered 90ms after it stops. Returns
     the reader, for a page that wants to re-light it on its own
     account. */
  function watchToc() {
    buildToc();
    var links = Array.prototype.slice.call(document.querySelectorAll('.oro-toc-link'));
    var marks = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    var spyTimer;

    function spy() {
      var best = 0;
      for (var i = 0; i < marks.length; i++) {
        if (marks[i] && marks[i].getBoundingClientRect().top <= 140) best = i;
      }
      links.forEach(function (a, i) { a.classList.toggle('is-here', i === best); });
    }

    spy();
    window.addEventListener('scroll', function () {
      clearTimeout(spyTimer);
      spyTimer = setTimeout(spy, 90);
    }, { passive: true });

    return spy;
  }

  window.GbOro = {
    px: px,
    txt: txt,
    widthNow: widthNow,
    copy: copy,
    watchCopy: watchCopy,
    buildToc: buildToc,
    watchToc: watchToc
  };

  /* The safety net, not the mechanism: a page that says nothing at
     all still gets its contents. A page that calls watchToc from
     its own script has already built them by the time this fires,
     because a classic script at the end of the body runs first. */
  function autoToc() { if (!tocBuilt) watchToc(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoToc);
  } else {
    autoToc();
  }
})();


/* ============================================================
   gbppl-oro-canon-1 — THE CANON OF AXES
   ------------------------------------------------------------
   Ton, 31.08 12:27: «да, и при этом мы должны учесть все
   компоненты; посмотреть, какие компоненты какие оси имеют, и
   стандартизировать look and feel осей.» And 13:17, on the whole
   answer: «окей, давай попробуем так».

   The rule of the spec (section 2) answers «what shape is this
   axis», and it answers it one axis at a time. That is enough to
   keep a single panel honest and not enough to keep TWO panels the
   same: Size could come out a toggle on the button and a Select on
   the input number on a day the words happened to be longer, and a
   reader who learned one showcase would have to learn the next.

   So the axes that recur across the system are named and settled
   HERE, once, and every showcase asks this object before it asks
   the rule. What is in the canon is decided; what is not still
   goes through nature, count and budget, and says so in the
   console so that the canon can grow on evidence rather than on
   memory.

   IT WAS WRITTEN ON THE BENCH AND IT LIVES HERE NOW. The object
   was declared in system/oro/lab/playground.html while the bench
   was its only consumer (gbppl-lab-f-5), with nothing of the bench
   in it. This wave moves it, byte for byte, to the file every
   showcase already loads, and the bench reads it from here: two
   copies of a canon are two canons.

   The census it is built on is the table in section 4 of
   studio\docs\PLAYGROUND-CONTROLS-SPEC.md, taken on 31.08 over
   the nine showcases, the six variants of the bench and every
   modifier in system/components. Nothing in it is imagined.
   ============================================================ */
window.ORO_AXES = {
  /* The order of the groups, one for every panel in the house. A
     component with no axis in a group simply skips it; nobody
     re-orders. Ground is last and stands on the scene, because it
     dresses the stage rather than the specimen (spec §1). */
  GROUP_ORDER: ['shape', 'state', 'content', 'ground'],

  /* What each group is called over the rail. Ground is in the
     order above and NOT here, because it is never a group of the
     rail: it is one control in the corner of the scene. */
  GROUP_LABELS: { shape: 'Shape', state: 'State', content: 'Content', ground: 'Ground' },

  /* Names that mean the same axis and must print the same word.
     A schema may also name its axis outright with canon: 'type'. */
  ALIASES: {
    color: 'colour', tone: 'colour', palette: 'colour',
    kind: 'type', style: 'type', emphasis: 'type', fill: 'type',
    appearance: 'look', face: 'look', labelstyle: 'look',
    theme: 'ground', background: 'ground', surface: 'ground',
    screen: 'device', well: 'density', backing: 'wash',
    iconposition: 'iconpos'
  },

  /* SIX WORDS THAT MEANT TWO THINGS EACH, and what each one is
     called from now on. Every entry here is a collision the census
     found standing in the house, not a preference: a reader who
     learns one showcase must not be taught a second dialect on the
     next one. Ton approved the table on 31.08 13:17; the showcases
     carry the new words from gbppl-oro-canon-1 on. */
  RENAMES: {
    'icons.html · Ground (Washed | Plain)': 'Wash. Ground is the stage, and this is the component\'s own backing.',
    'icons.html · Surface (Light | Dark)': 'Ground. One word for the stage, everywhere.',
    'field.html · Label (Required | Optional)': 'Required, and it is a boolean, so it is the switch.',
    'select.html · Label (Caps label | None)': 'Required as well: a label that is not there is a label not asked for.',
    'D · Label style (Underline | Floating)': 'Look. Same axis, same word, on every field.',
    'inputnumber.html · Well (Standard | Dense)': 'Density. The axis is the plainer word, not the anatomy part.',
    'icons.html · Size (40 | 44 live | 48 | 56)': 'Size in rungs, S / M / L / XL, with the pixel in the note. A label is a rung, never a measurement.',
    'select.html vs inputnumber.html · Value': 'Two axes, two names: Value is what is chosen, Position is where the number stands on its scale.'
  },

  AXES: {
    /* THE LADDER. Always a toggle: it is short, it is ordered, and
       it is the one axis a person compares rather than picks. Four
       rungs at most anywhere in the system (S / M / L / XL). */
    size:    { label: 'Size', group: 'shape', control: 'toggle',
               note: 'the height ladder, at most four rungs' },

    /* THE SHAPE OF THE THING. Toggle up to four; a component that
       grows a fifth type is telling you the axis is really two,
       and the answer is to SPLIT IT rather than to hide it in a
       menu. Until it is split, five or more is a Select like any
       other long set. */
    type:    { label: 'Type', group: 'shape', control: 'toggle', upTo: 4,
               note: 'five types is a signal to split the axis, not to grow the control' },
    variant: { label: 'Variant', group: 'shape', control: 'toggle', upTo: 4,
               note: 'the same axis as Type under a composite name; one word, one control' },

    /* THE FIVE FACES OF THE FIELD, AND WHY THEY ARE A SELECT.
       Look is not a short scale: underline, floating, phone, one
       time code and password are five DIFFERENT COMPONENTS wearing
       one control, their names are long, and they are picked once
       rather than compared. Ton, 31.08 13:17, approved «select по
       имени»: if a look is ever added or removed it stays a
       Select, and that is the point of naming it here. */
    look:    { label: 'Look', group: 'shape', control: 'select',
               note: 'looks are separate faces, not rungs; picked once, named at length' },

    /* NEVER A TOGGLE. States are five and six everywhere they are
       drawn, they are read down a list rather than compared side
       by side, and half of them are unavailable on any given
       specimen. */
    state:   { label: 'State', group: 'state', control: 'select',
               note: 'always a Select: the set is long and half of it is usually unavailable' },

    /* NEVER A TOGGLE EITHER, and this one is a measurement rather
       than a taste: PRIMARY, SECONDARY, INVERSE are the longest
       words any panel spends, they cost more than a share of any
       rail we draw, and the family grows with every ground the
       system learns. Ton photographed the wrapped version. */
    colour:  { label: 'Colour', group: 'shape', control: 'select',
               note: 'always a Select: the longest words in the house, and the set grows' },

    /* THE STAGE, NOT THE SPECIMEN. Two short values, a toggle, and
       it stands in the corner of the scene it changes rather than
       in the rail (spec §1). A hug, not a fill: it floats. */
    ground:  { label: 'Ground', group: 'ground', control: 'toggle', where: 'scene',
               note: 'Light | Dark, on the stage, hugging its two words' },

    /* THE COMPONENT'S OWN BACKING, which the icon button calls
       Ground today and which is not the stage at all: two short
       words, a toggle. Renamed rather than re-controlled. */
    wash:    { label: 'Wash', group: 'shape', control: 'toggle',
               note: 'the control\'s own backing, never the stage' },

    /* HOW TIGHT, not how big. Two or three rungs everywhere it is
       drawn, so a toggle; the input number calls it Well today. */
    density: { label: 'Density', group: 'shape', control: 'toggle', upTo: 4,
               note: 'standard or dense; the plain word, not the anatomy part' },

    /* WHERE THE GLYPH STANDS, three short words, always a toggle;
       and WHICH GLYPH, which is a Select wherever it appears: the
       icon set has 13 names today and grows, and the names are as
       long as words get in a rail. */
    iconpos: { label: 'Icon position', group: 'content', control: 'toggle',
               note: 'before, after or both' },
    glyph:   { label: 'Glyph', group: 'content', control: 'select',
               note: 'a list out of the icon set; it grows, and the names are long' },

    /* WHAT IS CHOSEN, and WHERE THE NUMBER STANDS: two axes that
       were one word on two showcases (spec §4.2). Both are long
       sentences rather than rungs, so both are Selects. */
    value:   { label: 'Value', group: 'content', control: 'select',
               note: 'what is chosen; the phrases are long' },
    position: { label: 'Position', group: 'state', control: 'select',
               note: 'where the number stands on its scale, not what is chosen' },

    /* THE VIEWING APPARATUS, not a property of any component: the
       console already spends these two and they are long lists of
       numbers. Named here so a showcase never draws them as rows
       of buttons. */
    device:  { label: 'Device', group: 'content', control: 'select',
               note: 'a list of presets, and it belongs to the console' },
    preset:  { label: 'Width preset', group: 'content', control: 'select',
               note: 'numbers in a list; the same answer as Device' }
  },

  /* Yes and no is a Switch and free text is a field WHATEVER the
     axis is called, so booleans and text are settled by their
     nature and never appear above. Icon, Required, Block width,
     Signed in: all one control, and today that control is on loan
     (see BOOL in the rule below). */
  BY_NATURE: { bool: 'switch', text: 'field', number: 'field' }
};


/* ============================================================
   gbppl-oro-canon-1 — GbOro.controls: ONE PANEL RENDERER FOR
   EVERY SHOWCASE
   ------------------------------------------------------------
   Spec section 5, and the mechanics are variant F of
   system/oro/lab/playground.html moved here whole after Ton chose
   it (31.08 13:17: «окей, давай попробуем так»). The bench keeps
   no copy: it calls this.

   A SHOWCASE DESCRIBES ITS COMPONENT WITH A SCHEMA, NOT WITH
   MARKUP. It hands over a list of axes and a function that draws
   the specimen out of a state object; the panel, the rule that
   picks each control, the conditional hiding, the More fold, the
   Reset, the ground on the stage and the Preview | Code band are
   all this file's.

     GbOro.controls({
       root,        the .gbdoc-pg card (see docs.css for the markup)
       axes,        [{ id, label, group, def, values | kind, ... }]
       sample,      fn(state, forCode) -> html of the specimen
       normalise,   fn(state)              optional, fix impossible pairs
       available,   fn(state, id, value)   optional, grey a value in place
       after,       fn(state, hold)        optional, run after it is mounted
       read,        fn(hold) -> html       optional, the one measured line
       block,       fn(state) -> boolean   optional, with blockClass
       blockClass,  the class the hold wears when block() is true
       ground       an axis object, or false for no ground switch
     })  ->  paint(recost)

   AN AXIS: { id, label, group: 'shape'|'state'|'content',
              def, values: [[value, label], ...],
              kind: 'bool' (with on/off) | 'text' | 'number',
              canon: 'type' to name its canonical axis outright,
              when: fn(state) -> boolean, advanced: true }

   THE RULE, IN ORDER, AND IT DECIDES BEFORE ANYTHING IS RENDERED
   (spec §2, Ton 31.08 12:07: «замер влезания это костыльное
   правило, фолбек-проверка; основное правило должно учитывать это
   как один из факторов»):

     1 NATURE  kind. Yes or no is the Switch (a native checkbox
               until Figma is opened); free text or a number is
               the field. Neither has a track to fit.
     2 CANON   window.ORO_AXES above. An axis the system has
               already settled wears the same control on every
               showcase and the arithmetic is not consulted.
     3 COUNT   five values or more, or long:true, is the Select:
               that is about how much a person holds at once, not
               about pixels.
     4 BUDGET  the track this axis WOULD draw is costed out of the
               strings in the schema and the constants below, and
               if the cost is over what the rail has to spend, the
               axis is a Select after all. This survives the canon
               as a VETO with a console.warn, because a wrapped
               label is the defect the whole rule exists to
               prevent and a canon that overrode physics would
               just draw it again.

   THE BUDGET IS A SHARE, NOT A SUM (Ton 31.08 12:23: «трек toggle
   в рельсе тянется на всю ширину, а дети не заполняют его»). The
   rail's tracks wear .gb-toggle--fill and the items split the
   track in equal shares, so the track is paid for by its LONGEST
   label taken n times:

     share = (room - 2*BORDER - 2*INSET - (n-1)*GAP) / n
     item  = widest label + 2 * ITEM_PAD_FILL
     toggle if item <= share, else Select

   Every number in BUDGET is the value the CSS spends and the
   comment names which declaration it is copied from, so a drift
   between the two is a thing a reader can find. The run-time
   probe exists to say out loud when they have drifted; it never
   overrides the table and it repairs nothing.
   ============================================================ */
(function () {
  'use strict';

  var CANON = window.ORO_AXES;

  /* ---- the rule as a table, so no branch of it is retyped ---- */
  var RULE = {
    BOOL: 'checkbox',   /* 1. true or false -> Switch. PLACEHOLDER: native checkbox. */
    TOGGLE_TO: 4,       /* 2. one of 2..4 short values -> .gb-toggle */
    SELECT_FROM: 5,     /* 3. five or more, or long:true -> .gba-select */
    TEXT: 'field',      /* 4. free text or number -> .gba-input */

    BUDGET: {
      /* .gb-toggle__item type — the button label ladder */
      LABEL_SIZE: 11,          /* --gb-btn-s-label */
      LABEL_SIZE_2XL: 12,      /* --gb-btn-s-label-2xl, from 2000 */
      LABEL_2XL_FROM: 2000,    /* the toggle.css media query */
      LABEL_WEIGHT: 600,       /* --gb-btn-label-weight */
      LABEL_TRACKING: 1,       /* --gb-btn-label-tracking, per character */
      LABEL_CAPS: true,        /* text-transform: uppercase */
      LABEL_FACE: '--font-sans',   /* read from the token, not retyped */
      /* .gb-toggle__item box. In a share the padding is the WRAP
         THRESHOLD and not the air, so it is --space-8, one rung
         under the hug's --space-16; the argument is written in
         toggle.css under the modifier that spends it. */
      ITEM_PAD_FILL: 8,        /* --space-8, each side, on a FILL track */
      /* .gb-toggle box */
      GAP: 4,                  /* --gbtg-inset, between two items */
      INSET: 4,                /* --gbtg-inset, each side of the row */
      BORDER: 1,               /* the 1px --zinc-300 hairline, each side */
      /* the room, at the width where the rail is a fixed rail */
      RAIL: 320,               /* --gbdoc-pg-rail = --space-64 * 5, docs.css */
      RAIL_PAD: 24,            /* --gbdoc-pg-pad, each side */
      RAIL_BORDER: 1,          /* the hairline between rail and scene */
      RAIL_FIXED_FROM: 1024    /* below this the rail spans the card */
    }
  };

  /* One boundary written from both sides is one boundary that can
     drift, so it is read from both sides once on load. */
  if (RULE.SELECT_FROM !== RULE.TOGGLE_TO + 1) {
    console.warn('GbOro.controls: TOGGLE_TO and SELECT_FROM leave a gap; the rule has a hole in it.');
  }

  /* The ground, when a showcase does not name its own. Two short
     values, and it stands on the scene rather than in the rail. */
  var GROUND = { id: 'ground', label: 'Ground', group: 'ground', def: 'light',
                 values: [['light', 'Light'], ['dark', 'Dark']] };

  var VIEWS = [['preview', 'Preview'], ['code', 'Code']];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------- the four controls of the rule ---------- */
  /* THE TOGGLE IS THE HOUSE'S OWN, .gb-toggle out of
     system/components/toggle.css, measured off the checkout. In the
     rail it wears --fill: the track spans the column AND the items
     split it in equal shares, so a row of controls has one left
     edge and one right edge like every other row. The one caller
     that passes a modifier is the scene's ground, which passes the
     empty string: a control floating over a stage hugs its two
     words. data-gb-toggle="host" because the state is the panel's;
     the component keeps the group contract, the single tab stop
     and the arrow keys, and paints nothing. */
  function toggleHTML(ax, named, mod) {
    return (named === false ? '' : '<span class="gbdoc-pg__name">' + esc(ax.label) + '</span>') +
      '<div class="' + ('gb-toggle ' + (mod == null ? 'gb-toggle--fill' : mod)).replace(/\s+$/, '') +
      '" role="radiogroup" data-gb-toggle="host"' +
      ' aria-label="' + esc(ax.label) + '">' +
      ax.values.map(function (v) {
        return '<button class="gb-toggle__item" type="button" role="radio" aria-checked="false"' +
               ' data-pgaxis="' + esc(ax.id) + '" data-val="' + esc(v[0]) + '">' + esc(v[1]) + '</button>';
      }).join('') + '</div>';
  }
  /* PLACEHOLDER UNTIL THE SWITCH IS MEASURED. The label carries the
     axis name and the box carries the answer, so nothing prints Yes
     or No at all. */
  function boolHTML(ax, rowId) {
    return '<label class="gbdoc-pg__bool" for="pgc-' + rowId + '">' +
      '<input type="checkbox" id="pgc-' + rowId + '" data-pgbool="' + esc(ax.id) + '">' +
      '<span>' + esc(ax.label) + '</span></label>';
  }
  function selectHTML(ax, rowId) {
    return '<gb-field input-id="pgc-' + rowId + '" name="pgc-' + rowId + '" type="select" optional' +
      ' label="' + esc(ax.label) + '" options="' +
      esc(ax.values.map(function (v) { return v[1]; }).join('|')) +
      '" data-pgfield="' + esc(ax.id) + '"></gb-field>';
  }
  function textHTML(ax, rowId) {
    return '<gb-field input-id="pgc-' + rowId + '" name="pgc-' + rowId + '" type="text" optional' +
      ' label="' + esc(ax.label) + '" data-pgfield="' + esc(ax.id) + '"></gb-field>';
  }
  var BUILD = {
    checkbox: boolHTML,   /* the placeholder the Switch replaces */
    switch: boolHTML,
    field: textHTML,
    select: selectHTML,
    toggle: function (ax) { return toggleHTML(ax); }
  };

  /* ---------- the budget, costed from strings ----------
     Canvas is the text engine asked for a width without a layout,
     which is the whole difference between costing a string and
     measuring a control. */
  var COST_CTX = null;
  var COST_SEEN = {};   /* string + font -> width. The strings are a schema, so they repeat. */

  function budgetFont() {
    var B = RULE.BUDGET;
    var size = window.innerWidth >= B.LABEL_2XL_FROM ? B.LABEL_SIZE_2XL : B.LABEL_SIZE;
    var face = getComputedStyle(document.documentElement)
                 .getPropertyValue(B.LABEL_FACE).trim() || 'sans-serif';
    return B.LABEL_WEIGHT + ' ' + size + 'px ' + face;
  }

  /* CSS letter-spacing puts the tracking after EVERY character, the
     last one included, and so does canvas letterSpacing where the
     browser has it. Where it does not, the same sum is added by
     hand, which is the definition rather than an approximation. */
  function costText(str, font) {
    var B = RULE.BUDGET;
    var key = font + '|' + str;
    if (COST_SEEN[key] != null) return COST_SEEN[key];
    if (!COST_CTX) COST_CTX = document.createElement('canvas').getContext('2d');
    var spaced = 'letterSpacing' in COST_CTX;
    COST_CTX.letterSpacing = spaced ? B.LABEL_TRACKING + 'px' : '0px';
    COST_CTX.font = font;
    var w = COST_CTX.measureText(str).width;
    if (!spaced) w += str.length * B.LABEL_TRACKING;
    COST_SEEN[key] = w;
    return w;
  }

  function shareOf(ax, room) {
    var B = RULE.BUDGET;
    var n = ax.values.length;
    return (room - 2 * B.BORDER - 2 * B.INSET - (n - 1) * B.GAP) / n;
  }

  function costItem(ax) {
    var B = RULE.BUDGET;
    var font = budgetFont();
    var widest = 0;
    ax.values.forEach(function (v) {
      var label = B.LABEL_CAPS ? String(v[1]).toUpperCase() : String(v[1]);
      var w = costText(label, font);
      if (w > widest) widest = w;
    });
    return widest + 2 * B.ITEM_PAD_FILL;
  }

  /* The room to spend it in. Constants where the rail is the fixed
     rail; below RAIL_FIXED_FROM the rail spans the card and no
     constant knows how wide a card is, so the CONTAINER — never a
     candidate — is read there. */
  function railRoom(rail) {
    var B = RULE.BUDGET;
    if (window.innerWidth >= B.RAIL_FIXED_FROM) {
      return B.RAIL - B.RAIL_BORDER - 2 * B.RAIL_PAD;
    }
    if (!rail) return B.RAIL - B.RAIL_BORDER - 2 * B.RAIL_PAD;
    var cs = getComputedStyle(rail);
    return rail.getBoundingClientRect().width
         - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth)
         - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  }

  /* THE CANON, ASKED SECOND. The key is the axis's own canon:
     property if it has one, otherwise its id, run through the
     aliases so that Kind, Style and Type are one axis, not three. */
  function canonFor(ax) {
    if (!CANON || !CANON.AXES) return null;
    var key = String(ax.canon || ax.id || '').toLowerCase();
    key = CANON.ALIASES[key] || key;
    return CANON.AXES[key] || null;
  }

  /* Said once per axis per load, and said as information rather
     than as a fault: an axis outside the canon is not a bug, it is
     a component-specific choice the rule still has to make. The
     list is the evidence the canon grows on. */
  var OFF_CANON = {};
  function noteOffCanon(ax) {
    if (OFF_CANON[ax.id]) return;
    OFF_CANON[ax.id] = true;
    console.info('GbOro.controls: axis ' + ax.id + ' is not in the canon; ' +
                 'nature, count and budget decide its control.');
  }

  function ruleFor(ax, room) {
    if (ax.kind === 'bool') return RULE.BOOL;                            /* 1 nature */
    if (ax.kind === 'text' || ax.kind === 'number') return RULE.TEXT;    /* 1 nature */
    var canon = canonFor(ax);
    if (canon) {                                                         /* 2 canon */
      if (canon.control !== 'toggle') return canon.control;
      if (canon.upTo && ax.values.length > canon.upTo) return 'select';
      if (room != null && costItem(ax) > shareOf(ax, room)) {
        console.warn('GbOro.controls: canonical toggle ' + ax.id + ' does not fit its share at this width (' +
                     Math.round(costItem(ax) * 10) / 10 + ' against ' +
                     Math.round(shareOf(ax, room) * 10) / 10 +
                     'px); drawn as a select. The rail or the labels have to change.');
        return 'select';
      }
      return 'toggle';
    }
    noteOffCanon(ax);
    if (ax.long || ax.values.length >= RULE.SELECT_FROM) return 'select';   /* 3 count */
    if (ax.values.length > RULE.TOGGLE_TO) return 'select';                 /* 3 count */
    if (room != null && costItem(ax) > shareOf(ax, room)) return 'select';  /* 4 budget */
    return 'toggle';
  }

  /* ---------- the smoke alarm ----------
     Every toggle the budget let through is re-rendered at its
     natural one-row width in the rail's own probe and compared with
     the same room the budget spent. It repairs nothing: if this
     prints, factor 4 has drifted from the CSS, and factor 4 is what
     gets fixed. A silent console is the gate. */
  function probeOf(rail) {
    var p = rail.__pgProbe;
    if (!p) {
      p = document.createElement('div');
      p.className = 'gbdoc-pg__probe';
      p.setAttribute('aria-hidden', 'true');   /* toggle.js leaves it alone */
      rail.__pgProbe = p;
    }
    if (p.parentNode !== rail) rail.appendChild(p);
    return p;
  }
  function auditRail(rail, rows, plan, room) {
    var p = null;
    rows.forEach(function (r) {
      if (plan[r.ax.id] !== 'toggle') return;
      if (!p) p = probeOf(rail);
      /* The item, not the track: in the rail the track is always
         exactly as wide as the room, so its width says nothing;
         what can still go wrong is one label too wide for one
         share. */
      p.innerHTML = '<div class="gb-toggle">' + r.ax.values.map(function (v) {
        return '<span class="gb-toggle__item">' + esc(v[1]) + '</span>';
      }).join('') + '</div>';
      var widest = 0;
      Array.prototype.forEach.call(p.firstChild.children, function (it) {
        var w = it.getBoundingClientRect().width;
        if (w > widest) widest = w;
      });
      var share = shareOf(r.ax, room);
      if (widest > share) {
        console.warn('GbOro.controls: axis ' + r.ax.id + ' exceeded its share at ' +
                     Math.round(widest * 10) / 10 + 'px against ' + Math.round(share * 10) / 10 +
                     'px; the schema should have sent it to a select.');
      }
    });
    if (p) p.innerHTML = '';
  }

  /* ---------- the rail ----------
     One pass builds the markup AND the list of rows the painter
     walks, so a row is never looked up by guessing. The ground is
     not here: it is drawn on the scene, and it keeps its default
     and its place in reset() all the same. */
  function groupsOf(spec) {
    if (spec.groups) return spec.groups;
    var L = (CANON && CANON.GROUP_LABELS) || {};
    return ((CANON && CANON.GROUP_ORDER) || ['shape', 'state', 'content'])
      .filter(function (g) { return g !== 'ground'; })
      .map(function (g) { return [g, L[g] || g]; });
  }

  function railHTML(spec, rows, plan) {
    var all = spec.axes;
    var html = '';
    function rowFor(a) {
      var n = rows.length + 1;
      rows.push({ n: n, ax: a });
      var kind = (plan && plan[a.id]) || ruleFor(a, null);
      return '<div class="gbdoc-pg__row" data-pgrow="' + n + '">' +
             (BUILD[kind] || BUILD.toggle)(a, n) + '</div>';
    }
    groupsOf(spec).forEach(function (g) {
      var plain = all.filter(function (a) { return a.group === g[0] && !a.advanced; });
      if (!plain.length) return;
      /* A group of one axis whose name is the group's own name would
         print STATE over STATE. The air is enough of a group. */
      var named = g[1] && !(plain.length === 1 && plain[0].label === g[1]);
      html += '<div class="gbdoc-pg__group">' +
              (named ? '<span class="gbdoc-pg__gname">' + esc(g[1]) + '</span>' : '') +
              plain.map(rowFor).join('') + '</div>';
    });
    var more = all.filter(function (a) { return a.advanced; });
    if (more.length) {
      html += '<details class="gbdoc-pg__more"><summary>More</summary>' +
              more.map(rowFor).join('') + '</details>';
    }
    html += '<div class="gbdoc-pg__foot">' +
            '<button class="gbdoc-pg__reset" type="button" data-pgreset>Reset</button></div>';
    return html;
  }

  /* ---------- one card ---------- */
  var PANELS = [];

  function controls(spec) {
    var root = spec.root;
    if (!root) return function () {};
    var axes = spec.axes || [];
    var ground = spec.ground === false ? null : (spec.ground || GROUND);
    var available = spec.available || function () { return true; };

    var rail = root.querySelector('[data-pg-rail]');
    var viewHost = root.querySelector('[data-pg-view]');
    var scene = root.querySelector('[data-pg-scene]');
    var view_ = root.querySelector('.gbdoc-pg__view');
    var codewrap = root.querySelector('[data-pg-codewrap]');
    var hold = root.querySelector('[data-pg-hold]');
    var read = root.querySelector('[data-pg-read]');
    var code = root.querySelector('[data-pg-code]');
    var groundHost = root.querySelector('[data-pg-ground]');
    var rows = [];
    var S = {};
    var view = 'preview';
    var plan = null;      /* axis id -> the name of the control drawn for it */
    var planRoom = -1;    /* the room the current plan was costed against */

    function reset() {
      axes.concat(ground ? [ground] : []).forEach(function (a) { S[a.id] = a.def; });
    }
    reset();

    /* THE PLAN, AND WHEN IT IS REDRAWN. Every axis is put through
       ruleFor with the room the rail has right now. The rail is
       rebuilt ONLY when some axis changes its answer: a Select
       redrawn under an open menu loses the menu, and a resize that
       does not move the rail must cost nothing but one read. The
       room is the cache key, because it is the only page fact any
       of the four factors depends on. */
    function replan(force) {
      var room = railRoom(rail);
      if (!force && Math.abs(room - planRoom) < 0.5) return false;
      var next = {};
      var moved = !plan;
      axes.forEach(function (a) {
        next[a.id] = ruleFor(a, room);
        if (plan && plan[a.id] !== next[a.id]) moved = true;
      });
      planRoom = room;
      if (!moved) return false;
      plan = next;
      rows.length = 0;
      rail.innerHTML = railHTML(spec, rows, plan);
      auditRail(rail, rows, plan, room);
      return true;
    }
    replan(true);
    if (groundHost && ground) groundHost.innerHTML = toggleHTML(ground, false, '');
    if (viewHost) {
      viewHost.innerHTML = VIEWS.map(function (v) {
        return '<button class="gb-toggle__item" type="button" role="radio" aria-checked="false"' +
               ' data-pgview="' + v[0] + '">' + v[1] + '</button>';
      }).join('');
    }

    function labelOf(ax, val) {
      var hit = (ax.values || []).filter(function (v) { return v[0] === val; })[0];
      return hit ? hit[1] : '';
    }
    function valueOf(ax, label) {
      var hit = (ax.values || []).filter(function (v) { return v[1] === label; })[0];
      return hit ? hit[0] : ax.def;
    }
    function axisOf(id) {
      var hit = rows.filter(function (r) { return r.ax.id === id; })[0];
      return hit ? hit.ax : null;
    }

    /* A ruler reads what is standing, not what is stored. While the
       markup is showing, the specimen is put back into the layout
       for the length of one measurement and taken out again in the
       same task, so nothing is painted in between and no number is
       ever taken off a hidden element. */
    function measured() {
      if (!read || !spec.read) return '';
      var folded = view === 'code';
      if (folded) { codewrap.hidden = true; scene.hidden = false; }
      var line = spec.read(hold);
      if (folded) { codewrap.hidden = false; scene.hidden = true; }
      return line;
    }

    function paint(recost) {
      /* The rule runs before the panel is synced, because at a new
         width the panel may not be the same panel. recost is true
         only when the strings have to be costed again although the
         rail has not moved: the web face arriving is the one case. */
      replan(recost === true);
      if (spec.normalise) spec.normalise(S);
      hold.innerHTML = spec.sample(S, false);
      if (window.GbIcons) window.GbIcons.mount(hold);
      if (spec.after) spec.after(S, hold);
      if (spec.blockClass) hold.classList.toggle(spec.blockClass, !!(spec.block && spec.block(S)));
      if (view_) view_.classList.toggle('is-dark', S.ground === 'dark');
      if (code) code.textContent = spec.sample(S, true);

      if (scene) scene.hidden = view === 'code';
      if (codewrap) codewrap.hidden = view !== 'code';

      rows.forEach(function (r) {
        var el = rail.querySelector('[data-pgrow="' + r.n + '"]');
        if (!el) return;
        el.hidden = !!(r.ax.when && !r.ax.when(S));
        var box = el.querySelector('[data-pgbool]');
        if (box) { box.checked = S[r.ax.id] === r.ax.on; return; }
        var f = el.querySelector('[data-pgfield] select, [data-pgfield] input');
        if (!f) return;
        if (f.tagName === 'SELECT') {
          f.value = labelOf(r.ax, S[r.ax.id]);
          Array.prototype.forEach.call(f.options, function (o) {
            o.disabled = !available(S, r.ax.id, valueOf(r.ax, o.value));
          });
        } else if (document.activeElement !== f) {
          f.value = S[r.ax.id] == null ? '' : S[r.ax.id];
        }
      });

      /* root, not rail: one of these toggles stands on the scene,
         and the painter walks every axis toggle of the card
         wherever it is drawn. */
      Array.prototype.forEach.call(root.querySelectorAll('.gb-toggle__item[data-pgaxis]'), function (c) {
        var id = c.getAttribute('data-pgaxis');
        var val = c.getAttribute('data-val');
        var on = S[id] === val;
        var ok = available(S, id, val);
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-checked', on ? 'true' : 'false');
        if (ok) c.removeAttribute('disabled'); else c.setAttribute('disabled', '');
      });
      if (viewHost) {
        Array.prototype.forEach.call(viewHost.querySelectorAll('[data-pgview]'), function (c) {
          var on = view === c.getAttribute('data-pgview');
          c.classList.toggle('is-on', on);
          c.setAttribute('aria-checked', on ? 'true' : 'false');
        });
      }

      if (read) read.innerHTML = measured();
    }

    root.addEventListener('click', function (e) {
      if (!e.target.closest) return;
      var chip = e.target.closest('.gb-toggle__item[data-pgaxis]');
      if (chip && !chip.hasAttribute('disabled')) {
        S[chip.getAttribute('data-pgaxis')] = chip.getAttribute('data-val');
        paint();
        return;
      }
      var v = e.target.closest('[data-pgview]');
      if (v) { view = v.getAttribute('data-pgview'); paint(); return; }
      if (e.target.closest('[data-pgreset]')) { reset(); paint(); }
    });
    root.addEventListener('change', function (e) {
      var box = e.target.closest ? e.target.closest('[data-pgbool]') : null;
      if (box) {
        var bid = box.getAttribute('data-pgbool');
        var bax = axisOf(bid);
        if (bax) { S[bid] = box.checked ? bax.on : bax.off; paint(); }
        return;
      }
      var host = e.target.closest ? e.target.closest('[data-pgfield]') : null;
      if (!host) return;
      var id = host.getAttribute('data-pgfield');
      var ax = axisOf(id);
      if (!ax) return;
      S[id] = e.target.tagName === 'SELECT' ? valueOf(ax, e.target.value) : e.target.value;
      paint();
    });
    root.addEventListener('input', function (e) {
      var host = e.target.closest ? e.target.closest('[data-pgfield]') : null;
      if (!host || e.target.tagName === 'SELECT') return;
      S[host.getAttribute('data-pgfield')] = e.target.value;
      paint();
    });

    paint();
    PANELS.push(paint);
    return paint;
  }

  /* Every panel on the page answers the same two page events, and
     they are wired once rather than by each consumer. */
  window.addEventListener('resize', function () {
    PANELS.forEach(function (p) { p(); });
  });

  /* THE FACE ARRIVES LATE. Inter is a web font, and a label costed
     in the fallback face is costed in the wrong face: the budget
     would be spent on somebody else's letters. So the cache of
     costed strings is emptied and every panel is asked the four
     questions again the moment the real face is ready. Almost
     always the answers are the same, and then nothing is rebuilt,
     because replan only rebuilds when an answer moves. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      COST_SEEN = {};
      PANELS.forEach(function (p) { p(true); });
    });
  }

  if (window.GbOro) {
    window.GbOro.controls = controls;
    window.GbOro.axisRule = ruleFor;   /* for a page that wants to say what it drew */
  }
})();
