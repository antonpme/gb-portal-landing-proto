/* ============================================================
   SYSTEM COMPONENT: STUDIO PANEL, JS-шаблон (gbppl-panel-1,
   Тон 2026-08-24)
   ------------------------------------------------------------
   Регистрирует <gb-studio-panel>: плавающий язычок у правого края,
   раскрывающийся в маленькую панель с дорогой домой. Провенанс,
   голос и слой описаны в studio-panel.css.

   Как подключать:

     <link rel="stylesheet" href="../system/components/studio-panel.css">
     <gb-studio-panel data-root="../"></gb-studio-panel>
     <script src="../system/components/studio-panel.js"></script>

     data-root   путь до корня студии ОТ СТРАНИЦЫ, с косой чертой на
                 конце. Та же манера, что data-home у studio.js: у
                 страниц разная глубина, и адреса собираются от этой
                 одной строки. Корень = "" для самого хаба, "../"
                 для live\*, "../../" для system\oro\*.

   Четыре двери = три точки входа хаба плюс сам хаб; слова взяты
   один в один из студийного бара (index.html: Live Prototype /
   Sandboxes / Design System), чтобы у одного и того же места не
   было двух имён.

   Свёрнута по умолчанию, как PROTO: страница-прототип открывается
   собой, а не нашей консолью. Состояние не запоминается — это
   оболочка, ей нечего помнить.
   ============================================================ */
(function () {
  'use strict';

  var DOORS = [
    ['index.html',                'Hub'],
    ['live/index.html',           'Live Prototype'],
    ['sandboxes.html',            'Sandboxes'],
    ['system/oro/index.html',     'Design System']
  ];

  var CHEVRON =
    '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5.5 3 9.5 7l-4 4"/></svg>';

  /* Активная дверь = страница, на которой стоишь. Адрес разрешает
     сам браузер (пустой <a> с href), поэтому сравнение честное и на
     file://, и на хостинге; каталожный путь приравнен к index.html
     той же папки. Слово «index.html» встречается в трёх дверях,
     сравнение полного пути их и различает. */
  function isHere(href) {
    var probe = document.createElement('a');
    probe.href = href;
    var norm = function (p) { return p.replace(/\/$/, '/index.html'); };
    return norm(probe.pathname) === norm(location.pathname);
  }

  var TEMPLATE = function (root) {
    var items = DOORS.map(function (d) {
      var active = isHere(root + d[0]) ? ' is-active' : '';
      return '<li><a class="gbsp-link' + active + '" href="' + root + d[0] + '"' +
             (active ? ' aria-current="page"' : '') + '>' + d[1] + '</a></li>';
    }).join('');
    return (
      '<div class="gbsp is-collapsed">' +
        '<button class="gbsp-tab" type="button" aria-expanded="false" aria-controls="gbsp-panel"' +
                ' aria-label="Open the Design Studio panel">' +
          CHEVRON +
          '<span class="gbsp-tab__word">Studio</span>' +
        '</button>' +
        '<nav class="gbsp-panel" id="gbsp-panel" aria-label="Design Studio">' +
          '<span class="gbsp-title">Design Studio</span>' +
          '<ul class="gbsp-list">' + items + '</ul>' +
        '</nav>' +
      '</div>'
    );
  };

  class GbStudioPanel extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      var root = this.getAttribute('data-root') || '';
      this.innerHTML = TEMPLATE(root);

      var shell = this.querySelector('.gbsp');
      var tab   = this.querySelector('.gbsp-tab');
      tab.addEventListener('click', function () {
        var collapsed = shell.classList.toggle('is-collapsed');
        tab.setAttribute('aria-expanded', String(!collapsed));
        tab.setAttribute('aria-label',
          collapsed ? 'Open the Design Studio panel' : 'Close the Design Studio panel');
      });
      /* Escape закрывает — тот же жест, что у меню хедера. */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !shell.classList.contains('is-collapsed')) {
          shell.classList.add('is-collapsed');
          tab.setAttribute('aria-expanded', 'false');
          tab.focus();
        }
      });
    }
  }
  if (!customElements.get('gb-studio-panel')) {
    customElements.define('gb-studio-panel', GbStudioPanel);
  }
})();
