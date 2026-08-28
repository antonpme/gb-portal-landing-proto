/* ============================================================
   gbppl-oro-pages-1 / gbppl-oro-cleanup-1
   — WHAT EVERY ORO PAGE SHARES
   ------------------------------------------------------------
   TWO BLOCKS, ONE FILE. The rail (gbppl-oro-pages-1) and the five
   small scripts every showcase used to keep its own copy of
   (gbppl-oro-cleanup-1, window.GbOro, at the bottom). Both are
   here for the same reason and the argument is written out once,
   under each.
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
   and it belongs beside it.

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

  /* ---------- the contents follow the reader ----------
     The links are read ONCE, so a page that builds part of its own
     contents (typography.html draws a sub link per group) has to
     call this after it has drawn them, exactly as it did when the
     two lines lived on the page. The lit entry is the last section
     whose top has passed 140px, and the scroll is answered 90ms
     after it stops. Returns the reader, for a page that wants to
     re-light it on its own account. */
  function watchToc() {
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
    watchToc: watchToc
  };
})();
