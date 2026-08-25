/* ============================================================
   SYSTEM COMPONENT: STUDIO PANEL, JS-шаблон (gbppl-panel-2,
   Тон 2026-08-24, секция Sandbox 2026-08-25)
   ------------------------------------------------------------
   Регистрирует <gb-studio-panel>: плавающий язычок у правого края,
   раскрывающийся в маленькую панель с дорогой домой и списком
   песочниц ЭТОЙ страницы. Провенанс, голос и слой описаны в
   studio-panel.css.

   Как подключать:

     <link rel="stylesheet" href="../system/components/studio-panel.css">
     <gb-studio-panel data-root="../" page="home"></gb-studio-panel>
     <script src="../system/sandbox-registry.js"></script>
     <script src="../system/components/studio-panel.js"></script>

     data-root   путь до корня студии ОТ СТРАНИЦЫ, с косой чертой на
                 конце. Та же манера, что data-home у studio.js: у
                 страниц разная глубина, и адреса собираются от этой
                 одной строки. Корень = "" для самого хаба, "../"
                 для live\*, "../../" для system\oro\*.
     page        id страницы в system\sandbox-registry.js, задаётся
                 ЯВНО на каждом потребителе — то же правило путей,
                 что у data-root (ловушка 2 скилла). Без него секция
                 Sandbox не рисуется.

   СЕКЦИЯ SANDBOX (Тон, 25.08): «Мы показываем эту панель управления
   прототипом везде, даже на лайве. Лайв всегда остаётся лайвом, там
   переключать нечего, но мы можем показать, как эти страницы
   выглядят в Sandbox... Постоянство: открыть любую страницу и сразу
   увидеть, есть ли для неё что-то в разработке».
   Отсюда две вещи. Секция стоит ВСЕГДА, даже когда вариантов нет:
   пустота — тоже ответ, и она произносится вслух («None yet»), а не
   молчит. И первая строка списка всегда Live: переключать на лайве
   нечего, но он обязан быть виден как точка отсчёта, от которой
   варианты отходят.

   Данные берутся из system\sandbox-registry.js, подключённого перед
   этим файлом. Реестра на странице нет — панель остаётся собой и
   просто не рисует секцию: дорога домой не должна зависеть от карты
   песочниц.

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

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Статус реестра → подпись человеку. Дефис в ключе разворачивается
     в пробел, регистр остаётся нижним: это подпись состояния, не
     заголовок (правила копии, sentence case). */
  function statusWord(status) {
    return String(status || 'in progress').replace(/-/g, ' ');
  }

  /* СЕКЦИЯ SANDBOX. Один <li> на строку, тот же .gbsp-link, что у
     дверей выше: список песочниц — такая же навигация, и второго
     языка для неё заводить незачем (Тон-6). Текущее место синее
     (Тон-5: синий = состояние), недоступный вариант не ссылка вовсе
     — <span>, чтобы курсор не обещал перехода, которого нет. */
  function sandboxSection(pageId, root) {
    if (!pageId) return '';
    var reg = window.GB_SANDBOXES;
    if (!reg || typeof reg.forPage !== 'function') return '';
    var slice = reg.forPage(pageId, root);
    if (!slice) return '';

    var rows = [];

    rows.push(row(slice.live.label, slice.live.href, slice.live.current, true, ''));

    slice.variants.forEach(function (v) {
      rows.push(row(v.label, v.href, v.current, v.ready, v.ready ? '' : statusWord(v.status)));
    });

    if (!slice.variants.length) {
      rows.push('<li><span class="gbsp-none">None yet</span></li>');
    }

    return (
      '<div class="gbsp-sec">' +
        '<span class="gbsp-eyebrow">Sandbox · this page</span>' +
        '<ul class="gbsp-list">' + rows.join('') + '</ul>' +
      '</div>'
    );

    function row(label, href, current, ready, note) {
      var tail = note ? ' <span class="gbsp-state">' + esc(note) + '</span>' : '';
      if (!ready) {
        return '<li><span class="gbsp-link is-off">' + esc(label) + tail + '</span></li>';
      }
      return '<li><a class="gbsp-link' + (current ? ' is-active' : '') + '" href="' + esc(href) + '"' +
             (current ? ' aria-current="page"' : '') + '>' + esc(label) + '</a></li>';
    }
  }

  var TEMPLATE = function (root, pageId) {
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
          sandboxSection(pageId, root) +
        '</nav>' +
      '</div>'
    );
  };

  class GbStudioPanel extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      var root = this.getAttribute('data-root') || '';
      this.innerHTML = TEMPLATE(root, this.getAttribute('page'));

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
