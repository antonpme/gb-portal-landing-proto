/* ============================================================
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
