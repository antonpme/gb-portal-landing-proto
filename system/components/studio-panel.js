/* ============================================================
   SYSTEM COMPONENT: STUDIO PANEL, JS-шаблон (gbppl-panel-4,
   Тон 2026-08-24, секция Sandbox 2026-08-25, секция This page
   2026-08-26)
   ------------------------------------------------------------
   ОДИН ПУЛЬТ. Тон 26.08, дословно: «обязательно свести язык к
   Studio, одной волной», и следом «нужно просто унифицировать всё
   под одну логику... везде всё приводится к этой единой логике».
   До этого дня прототипом управляли ДВА пульта: этот и PROTO
   (моноширинный, радиус 6, свои группы переключателей) на
   live\portal.html и live\checkout.html. Решение 12.08 «PROTO не
   должен читаться как дизайн» ЭТИМ СНЯТО: пульт один, говорит
   голосом студии, и страничные переключатели переехали в него —
   секция «This page» ниже. Второго языка у консоли больше нет.

   Регистрирует <gb-studio-panel>: плавающий язычок у правого края,
   раскрывающийся в маленькую панель с дорогой домой, списком
   песочниц ЭТОЙ страницы и её собственными переключателями.
   Провенанс, голос и слой описаны в studio-panel.css.

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

   СЕКЦИЯ «THIS PAGE» (gbppl-panel-4). Переключатели, которые
   принадлежат ОДНОЙ странице и никому больше: сценарий чекаута,
   шапка портала, раскладка стартового блока. Панель не знает о них
   ничего заранее — страница объявляет группы сама, через API:

     var panel = document.querySelector('gb-studio-panel');
     var g = panel.addGroup({
       title:   'Scenario',            // подпись группы
       note:    'Одна строка подсказки',   // необязательно
       value:   'portalEmpty',         // что выбрано сейчас
       options: [
         { label: 'Empty cart',  value: 'portalEmpty', note: '...' },
         { label: 'Loaded cart', value: 'portalLoaded' }
       ],
       onChange: function (value) { app.setScenario(value); },
       actions: [                      // необязательно: команды, не выбор
         { label: 'Reset the demo', onClick: function () { app.resetDemo(); } }
       ]
     });
     g.setActive('portalLoaded');   // отметить снаружи, без onChange
     g.setNote('The cart is empty.');

   Правила секции:
   · подписи ЧЕЛОВЕЧЕСКИЕ. Не v1/v2/pth/hero/ren — «Portal header»,
     «From the customizer», «Ren». Внутренние значения остаются
     внутренними: value уходит в onChange, на экран не попадает.
   · опции — тихие строки того же .gbsp-link, что двери и песочницы
     (Тон-6: второго языка для списка заводить незачем; docs.css,
     26.08: «контролы не кнопки, инструмент не должен выглядеть как
     предмет»). Выбранная синяя, Blue 400 на Zinc 950 (Тон-5).
   · подсказка — ОДНА строка под группой. Строка группы стоит всегда,
     строка опции показывается, когда опция выбрана.
   · порядок секций один на всех страницах: двери → Sandbox →
     This page.

   ПОРЯДОК ПОДКЛЮЧЕНИЯ. addGroup зовётся ПОСЛЕ studio-panel.js: до
   апгрейда элемента метода на нём ещё нет. Панель к этому моменту
   уже нарисована, группа просто дописывается в конец.

   СЕКЦИЯ MODE (gbppl-panel-6, заказ Тона 26.08: «переключать
   режимы View / Inspect... наводишь, и оверлей поверх показывает
   отступы»). Первая секция панели, ВЫШЕ дверей: двери отвечают
   «куда пойти», Sandbox «что тут есть», This page «что покрутить»,
   а Mode отвечает «как сейчас работает страница» — и это надо
   видеть раньше всего остального. Порядок секций теперь один на
   всех: Mode → двери → Sandbox → This page.

   Панель ВЛАДЕЕТ видом и местом тумблера, а не его поведением:
   что делают View и Inspect, знает system\components\inspect.js,
   он и объявляет группу:

     panel.addSegments({
       title: 'Mode',
       value: 'view',
       options: [{ label: 'View', value: 'view', note: '...' },
                 { label: 'Inspect', value: 'inspect', note: '...' }],
       onChange: function (v) { ... }
     });                       // -> { setActive(value), element }

   Страница без инспектора просто не зовёт addSegments, и секции у
   неё нет: панель не рисует переключателя, за которым ничего не
   стоит.

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

  /* ============================================================
     СЕКЦИЯ «THIS PAGE» (gbppl-panel-4)
     ------------------------------------------------------------
     Секции нет в шаблоне: она рождается по первому addGroup и не
     появляется вовсе там, где странице нечего переключать. Место
     у неё одно и то же на всех страницах — под Sandbox, последней,
     потому что двери и песочницы отвечают «куда пойти», а эта
     секция — «что здесь покрутить», и вопрос она задаёт уже про
     то место, где стоишь.
     ============================================================ */
  function pageSection(host) {
    var sec = host.querySelector('.gbsp-sec--page');
    if (sec) return sec;
    sec = document.createElement('div');
    sec.className = 'gbsp-sec gbsp-sec--page';
    sec.innerHTML = '<span class="gbsp-eyebrow">This page</span>';
    host.querySelector('.gbsp-panel').appendChild(sec);
    return sec;
  }

  /* Одна группа: подпись, строки выбора, строки-команды, подсказка.
     Возвращает ручку — страница держит её и отмечает выбранное
     снаружи, когда состояние сменилось не кликом по панели (адрес
     в строке браузера, Alpine, свой код). */
  function makeGroup(host, spec) {
    spec = spec || {};
    var options = spec.options || [];
    var actions = spec.actions || [];

    var group = document.createElement('div');
    group.className = 'gbsp-group';

    var html = '';
    if (spec.title) {
      html += '<span class="gbsp-group__title">' + esc(spec.title) + '</span>';
    }
    if (options.length || actions.length) {
      html += '<ul class="gbsp-list">';
      options.forEach(function (o, i) {
        html += '<li><button class="gbsp-link" type="button" data-opt="' + i + '"' +
                ' aria-pressed="false">' + esc(o.label) + '</button></li>';
      });
      actions.forEach(function (a, i) {
        html += '<li><button class="gbsp-link" type="button" data-act="' + i + '">' +
                esc(a.label) + '</button></li>';
      });
      html += '</ul>';
    }
    html += '<p class="gbsp-note"></p>';
    group.innerHTML = html;

    var optEls = group.querySelectorAll('[data-opt]');
    var noteEl = group.querySelector('.gbsp-note');
    var forced = null;   /* setNote перебивает подсказки опций */
    var current = spec.value;

    function paint() {
      var line = forced;
      for (var i = 0; i < optEls.length; i++) {
        var on = options[i].value === current;
        optEls[i].classList.toggle('is-active', on);
        optEls[i].setAttribute('aria-pressed', String(on));
        if (on && forced === null && options[i].note) line = options[i].note;
      }
      if (line === null || line === undefined) line = spec.note || '';
      noteEl.textContent = line;
      noteEl.hidden = !line;
    }

    group.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-opt],[data-act]') : null;
      if (!btn || !group.contains(btn)) return;
      var oi = btn.getAttribute('data-opt');
      if (oi !== null) {
        var opt = options[+oi];
        current = opt.value;
        forced = null;
        paint();
        if (typeof spec.onChange === 'function') spec.onChange(opt.value, opt);
        return;
      }
      var ai = btn.getAttribute('data-act');
      if (ai !== null && typeof actions[+ai].onClick === 'function') actions[+ai].onClick();
    });

    pageSection(host).appendChild(group);
    paint();

    return {
      element: group,
      setActive: function (value) { current = value; forced = null; paint(); },
      setNote: function (text) { forced = (text === null || text === undefined) ? null : String(text); paint(); }
    };
  }

  /* ============================================================
     СЕКЦИЯ MODE (gbppl-panel-6)
     ------------------------------------------------------------
     Единственное место панели, где выбор стоит СЕГМЕНТАМИ, а не
     строками списка. Причина простая и геометрическая: у режима
     ровно два значения, они взаимоисключающие и читаются как один
     переключатель; двумя строками списка это была бы навигация из
     двух пунктов, а не тумблер. Голос тот же, что у контролов
     витрины (.gbdoc-seg, docs.css: «контролы не кнопки»), только
     на тёмном: 14/500, выбранный Blue 400 с подчёркиванием.
     ============================================================ */
  function modeSection(host) {
    var sec = host.querySelector('.gbsp-sec--mode');
    if (sec) return sec;
    sec = document.createElement('div');
    sec.className = 'gbsp-sec gbsp-sec--mode';
    var panel = host.querySelector('.gbsp-panel');
    /* Первой секцией: сразу под титулом, над дверями. */
    panel.insertBefore(sec, panel.querySelector('.gbsp-list'));
    return sec;
  }

  function makeSegments(host, spec) {
    spec = spec || {};
    var options = spec.options || [];
    var sec = modeSection(host);

    var wrap = document.createElement('div');
    wrap.className = 'gbsp-seggroup';
    var html = '<span class="gbsp-eyebrow">' + esc(spec.title || 'Mode') + '</span>' +
               '<div class="gbsp-segs" role="group" aria-label="' + esc(spec.title || 'Mode') + '">';
    options.forEach(function (o, i) {
      html += '<button class="gbsp-seg" type="button" data-seg="' + i + '"' +
              ' aria-pressed="false">' + esc(o.label) + '</button>';
    });
    html += '</div><p class="gbsp-note"></p>';
    wrap.innerHTML = html;

    var segEls = wrap.querySelectorAll('[data-seg]');
    var noteEl = wrap.querySelector('.gbsp-note');
    var current = spec.value;

    function paint() {
      var line = spec.note || '';
      for (var i = 0; i < segEls.length; i++) {
        var on = options[i].value === current;
        segEls[i].classList.toggle('is-on', on);
        segEls[i].setAttribute('aria-pressed', String(on));
        if (on && options[i].note) line = options[i].note;
      }
      noteEl.textContent = line;
      noteEl.hidden = !line;
    }

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-seg]') : null;
      if (!btn || !wrap.contains(btn)) return;
      var o = options[+btn.getAttribute('data-seg')];
      if (!o || o.value === current) return;
      current = o.value;
      paint();
      if (typeof spec.onChange === 'function') spec.onChange(o.value, o);
    });

    sec.appendChild(wrap);
    paint();

    return {
      element: wrap,
      setActive: function (value) { current = value; paint(); }
    };
  }

  class GbStudioPanel extends HTMLElement {
    /* Публичный API страницы: см. шапку файла. */
    addGroup(spec) {
      if (!this.__rendered) this.connectedCallback();
      return makeGroup(this, spec);
    }

    /* Тумблер режима: сегменты первой секцией (gbppl-panel-6). */
    addSegments(spec) {
      if (!this.__rendered) this.connectedCallback();
      return makeSegments(this, spec);
    }

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
