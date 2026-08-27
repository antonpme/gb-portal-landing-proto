/* ============================================================
   SYSTEM COMPONENT: STUDIO PANEL, JS-шаблон (gbppl-panel-4,
   Тон 2026-08-24, секция Sandbox 2026-08-25, секция This page
   2026-08-26, Mode 2026-08-26, Device gbppl-panel-7 2026-08-27,
   вторая компоновка gbppl-panel-8 2026-08-27)
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

   СЕКЦИЯ DEVICE (gbppl-panel-7, заказ команды через Тона 27.08:
   «переключение девайсов прямо внутри прототипа: большой десктоп,
   средний, маленький, планшет, мобильный»). Вторая группа в той же
   первой секции, под Mode: шесть сегментов Full · XL 2258 · L 1920
   · M 1280 · Tablet 768 · Mobile 390. В отличие от Mode её
   объявляет САМА панель — экран есть у любой страницы, и просить
   об этом каждого потребителя было бы двадцатью строками одного и
   того же. Устройство, флаги и состояние описаны у mountDevice
   ниже. Порядок групп в секции держится рангом, а не порядком
   вызова: Mode 1, Device 2.

   Свёрнута по умолчанию, как PROTO: страница-прототип открывается
   собой, а не нашей консолью. Состояние не запоминается — это
   оболочка, ей нечего помнить.

   ДВЕ КОМПОНОВКИ РЯДОМ (gbppl-panel-8, 2026-08-27). Тон спросил, что
   улучшить в управлении прототипом; предложение собрано ЦЕЛИКОМ и
   стоит рядом с нынешней консолью, а не вместо неё: «давай попробуем
   собрать твой вариант и сравнить». Отсюда два правила этого файла.

   · Classic (v1) — сегодняшняя консоль, байт в байт. Единственное
     добавление — сегмент Layout в самом низу, чтобы щёлкнуть на
     любой странице и увидеть второй вариант на том же месте.
   · Proposed (v2) — консоль как НАВИГАЦИЯ: титул, разделы студии с
     подсветкой текущего, версия этой страницы сегментом, инструменты
     (Mode и одна строка девайсов), одна строка состояния вместо
     абзацев под группами, Copy link, Layout.

   Переключение: ключ ?panel=v1|v2, память sessionStorage
   gbppl-panel-layout, дефолт Classic. Ключ едет в кадр устройства
   рядом с studio=embedded, поэтому копия внутри рамки той же
   компоновки, что снаружи, и сравнение честное.

   API НЕ ТРОНУТ. addGroup / addSegments / setActive / setNote / ранги
   работают одинаково в обеих компоновках: inspect.js и реестр про
   вторую компоновку не знают ничего. Меняется место секции в DOM и
   её одежда, а не договор.
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     КОМПОНОВКА (gbppl-panel-8)
     ------------------------------------------------------------
     Читается один раз, до первой отрисовки: от неё зависит порядок
     секций в шаблоне, а не только классы. Ключ в адресе побеждает
     память вкладки и сам в неё записывается — ссылка ?panel=v2,
     переданная в чате, оставляет вкладку в этом варианте и после
     перехода дверями.
     ============================================================ */
  var LKEY = 'gbppl-panel-layout';

  function readLayout() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('panel'); } catch (e) {}
    if (q === 'v1' || q === 'v2') {
      try { sessionStorage.setItem(LKEY, q); } catch (e) {}
      return q;
    }
    try {
      var s = sessionStorage.getItem(LKEY);
      if (s === 'v1' || s === 'v2') return s;
    } catch (e) {}
    return 'v1';
  }

  var LAYOUT = readLayout();
  var V2 = LAYOUT === 'v2';

  /* Copy link кладёт в адрес mode=inspect, значит адрес обязан
     работать (gbppl-panel-8). Прибор читает режим из sessionStorage и
     стартует после нас, поэтому ключ переписывается здесь, до его
     старта: inspect.js остаётся нетронутым и просто находит то, что
     ему положили. */
  (function () {
    try {
      var m = new URLSearchParams(location.search).get('mode');
      if (m === 'inspect' || m === 'view') sessionStorage.setItem('gbppl-inspect-mode', m);
    } catch (e) {}
  })();

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

  /* Proposed: подсвечивается не страница, а РАЗДЕЛ, в котором стоишь
     (gbppl-panel-8). В Classic дверь синеет только на самой себе, и
     на live/catalog или на typography ни одна дверь не горит — список
     читается как «куда пойти» и молчит о том, где ты. Ящик-навигация
     обязан отвечать и на второй вопрос, поэтому путь страницы
     сравнивается с ПАПКОЙ двери: всё внутри live/ — это Live
     Prototype, всё внутри system/ — Design System (витрина и мерочные
     страницы живут в одном разделе студии). Корень считается от
     data-root, а не от глубины страницы: адрес разрешает браузер. */
  function rootPath(root) {
    var probe = document.createElement('a');
    probe.href = root || './';
    return probe.pathname.replace(/[^/]*$/, '');
  }

  function sectionHere(root) {
    var base = rootPath(root);
    var rel = location.pathname;
    rel = rel.indexOf(base) === 0 ? rel.slice(base.length) : rel;
    if (rel === '' || rel === 'index.html') return 'index.html';
    if (rel.indexOf('live/') === 0) return 'live/index.html';
    if (rel === 'sandboxes.html') return 'sandboxes.html';
    if (rel.indexOf('system/') === 0) return 'system/oro/index.html';
    return '';
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

  /* ВЕРСИЯ ЭТОЙ СТРАНИЦЫ, Proposed (gbppl-panel-8). Те же данные
     реестра, что у секции Sandbox, но не списком, а сегментами: у
     страницы РОВНО ОДНА версия в силе, варианты взаимоисключающие, и
     это тумблер, а не навигация — тот же довод, по которому Mode стал
     сегментами (gbppl-panel-6). Реестр не тронут ни строкой: срез
     тот же, меняется одежда. Недоступный вариант остаётся не ссылкой:
     курсор ничего не обещает. */
  function versionSection(pageId, root) {
    if (!pageId) return '';
    var reg = window.GB_SANDBOXES;
    if (!reg || typeof reg.forPage !== 'function') return '';
    var slice = reg.forPage(pageId, root);
    if (!slice) return '';

    var segs = [seg(slice.live.label, slice.live.href, slice.live.current, true, '')];
    slice.variants.forEach(function (v) {
      segs.push(seg(v.label, v.href, v.current, v.ready, v.ready ? '' : statusWord(v.status)));
    });

    return (
      '<div class="gbsp-sec gbsp-sec--ver">' +
        '<span class="gbsp-eyebrow">Version of this page</span>' +
        '<div class="gbsp-segs gbsp-segs--wrap" role="group" aria-label="Version of this page">' +
          segs.join('') +
        '</div>' +
      '</div>'
    );

    function seg(label, href, current, ready, note) {
      if (!ready) {
        return '<span class="gbsp-seg is-off" title="' + esc(note) + '">' + esc(label) + '</span>';
      }
      return '<a class="gbsp-seg' + (current ? ' is-on' : '') + '" href="' + esc(href) + '"' +
             (current ? ' aria-current="page"' : '') + '>' + esc(label) + '</a>';
    }
  }

  /* ПОДВАЛ, Proposed (gbppl-panel-8): строка состояния, копия ссылки,
     выбор компоновки. Держится одним узлом, потому что все секции,
     которые страница дописывает позже (Mode, Device, This page),
     встают ПЕРЕД ним. */
  function footHtml() {
    return (
      '<div class="gbsp-foot">' +
        '<p class="gbsp-status"></p>' +
        copyHtml() +
        layoutHtml() +
      '</div>'
    );
  }

  function copyHtml() {
    return '<button class="gbsp-link gbsp-copy" type="button">Copy link to this view</button>';
  }

  /* Сегмент компоновки стоит в ОБЕИХ: сравнивают, щёлкая туда-сюда на
     одной и той же странице, и кнопка обязана быть под рукой в любом
     варианте (Тон: «давай попробуем собрать твой вариант и сравнить»).
     Это единственная правка разметки Classic за волну. */
  function layoutHtml() {
    return (
      '<div class="gbsp-sec gbsp-sec--layout">' +
        '<span class="gbsp-eyebrow">Layout</span>' +
        '<div class="gbsp-segs" role="group" aria-label="Layout">' +
          '<button class="gbsp-seg' + (V2 ? '' : ' is-on') + '" type="button" data-layout="v1">Classic</button>' +
          '<button class="gbsp-seg' + (V2 ? ' is-on' : '') + '" type="button" data-layout="v2">Proposed</button>' +
        '</div>' +
      '</div>'
    );
  }

  var TEMPLATE = function (root, pageId) {
    var here = V2 ? sectionHere(root) : null;
    var items = DOORS.map(function (d) {
      var active = (V2 ? here === d[0] : isHere(root + d[0])) ? ' is-active' : '';
      return '<li><a class="gbsp-link' + active + '" href="' + root + d[0] + '"' +
             (active ? ' aria-current="page"' : '') + '>' + d[1] + '</a></li>';
    }).join('');
    var body = V2
      ? '<ul class="gbsp-list">' + items + '</ul>' +
        versionSection(pageId, root) +
        footHtml()
      : '<ul class="gbsp-list">' + items + '</ul>' +
        sandboxSection(pageId, root) +
        layoutHtml();
    return (
      '<div class="gbsp is-collapsed' + (V2 ? ' gbsp--v2' : '') + '">' +
        '<button class="gbsp-tab" type="button" aria-expanded="false" aria-controls="gbsp-panel"' +
                ' aria-label="Open the Design Studio panel">' +
          CHEVRON +
          '<span class="gbsp-tab__word">Studio</span>' +
        '</button>' +
        '<nav class="gbsp-panel" id="gbsp-panel" aria-label="Design Studio">' +
          '<span class="gbsp-title">Design Studio</span>' +
          body +
        '</nav>' +
      '</div>'
    );
  };

  /* Все секции, которые дописываются после отрисовки, встают перед
     хвостом: в Classic хвост — сегмент Layout, в Proposed — весь
     подвал. Один вызов на обе компоновки. */
  function tail(host) {
    return host.querySelector('.gbsp-foot, .gbsp-sec--layout');
  }

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
    /* gbppl-panel-8: не в самый конец, а перед хвостом — сегмент
       Layout и подвал Proposed стоят последними всегда. */
    var panel = host.querySelector('.gbsp-panel');
    panel.insertBefore(sec, tail(host));
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
    /* Classic: первой секцией, сразу под титулом, над дверями.
       Proposed: инструменты стоят ПОСЛЕ навигации и версии страницы
       (gbppl-panel-8) — сначала «где я и что смотрю», потом «чем
       смотрю». */
    panel.insertBefore(sec, V2 ? tail(host) : panel.querySelector('.gbsp-list'));
    return sec;
  }

  function makeSegments(host, spec) {
    spec = spec || {};
    var options = spec.options || [];
    var sec = modeSection(host);

    var wrap = document.createElement('div');
    wrap.className = 'gbsp-seggroup';
    /* gbppl-panel-7: место группы в секции задаётся РАНГОМ, а не
       порядком вызова. Mode объявляет inspect.js асинхронно (через
       whenDefined), Device — сама панель в connectedCallback, то есть
       раньше; без ранга порядок на экране зависел бы от того, кто
       успел первым. Mode = 1, Device = 2, и так на каждой странице. */
    var rank = typeof spec.rank === 'number' ? spec.rank : 50;
    wrap.setAttribute('data-rank', String(rank));
    var title = spec.title || 'Mode';
    var shape = spec.grid ? ' gbsp-segs--grid' : (spec.row ? ' gbsp-segs--row' : '');
    var html = '<span class="gbsp-eyebrow">' + esc(title) + '</span>' +
               '<div class="gbsp-segs' + shape + '"' +
               ' role="group" aria-label="' + esc(title) + '">';
    options.forEach(function (o, i) {
      /* Подпись сегмента бывает двухэтажной: слово человеку, число
         прибору («Tablet» и 768). Второй этаж необязателен — у
         режима его нет и не должно быть. В Proposed девайсы стоят
         одной строкой чипов, полное имя уходит в title. */
      html += '<button class="gbsp-seg" type="button" data-seg="' + i + '"' +
              (o.title ? ' title="' + esc(o.title) + '"' : '') +
              ' aria-pressed="false">' + esc(o.label) +
              (o.sub ? '<span class="gbsp-seg__sub">' + esc(o.sub) + '</span>' : '') +
              '</button>';
    });
    /* МЕСТО ПОД COMMENT (gbppl-panel-8). Третий режим заказан, но не
       сделан, и Proposed говорит об этом вслух: выключенный сегмент
       рядом с двумя живыми честнее пустоты — тумблер сразу показывает,
       на сколько положений он рассчитан. Стоит только в Proposed и
       только у Mode: панель владеет ВИДОМ и МЕСТОМ тумблера
       (gbppl-panel-6), а значит и его будущей третьей позицией. */
    if (V2 && title === 'Mode') {
      html += '<span class="gbsp-seg is-off" title="coming soon">Comment</span>';
    }
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

    var before = null, kin = sec.querySelectorAll('.gbsp-seggroup');
    for (var q = 0; q < kin.length; q++) {
      if ((+kin[q].getAttribute('data-rank') || 50) > rank) { before = kin[q]; break; }
    }
    sec.insertBefore(wrap, before);
    paint();

    return {
      element: wrap,
      setActive: function (value) { current = value; paint(); }
    };
  }

  /* ============================================================
     СЕКЦИЯ DEVICE (gbppl-panel-7)
     ------------------------------------------------------------
     Заказ команды через Тона, 27.08, после второго показа: «Всем
     очень понравился Inspect, просят показывать больше данных и
     чётче. И переключение девайсов прямо внутри прототипа: большой
     десктоп, средний, маленький, планшет, мобильный».

     ПОЧЕМУ ЭТО ЖИВЁТ В ПАНЕЛИ И РЯДОМ С MODE. У прототипа один
     пульт (Тон 26.08), и вопрос «на каком экране я смотрю» — это
     тот же вопрос «как сейчас работает страница», что и режим
     View / Inspect. Поэтому Device не заводит своей секции, а
     встаёт второй строкой в ту же первую секцию, под Mode:
     216px панели не выдержали бы третьей полки, а смысл у двух
     групп один.

     ЧТО ПРОИСХОДИТ ПРИ ВЫБОРЕ. Full = обычная страница, никакого
     прибора. Любой другой пресет: страница накрывается СЦЕНОЙ
     (Zinc 950, язык панели), в центре сцены стоит <iframe> нужной
     ширины с той же самой страницей, высотой в окно минус поля,
     в тонкой рамке Zinc 700 радиусом --radius. Никаких «телефонов»
     с кнопкой Home: мы меряем раскладку, а не рисуем устройство.

     Панель остаётся СНАРУЖИ рамки и управляет ею: сцена лежит на
     z 58 — выше всей стопки прототипа и выше слоя Inspect (55),
     ниже консоли (60) и дровера (80). Поэтому в кадре видно ровно
     страницу, а пульт по-прежнему под рукой.

     ВНУТРИ РАМКИ ПАНЕЛИ НЕТ. Адрес кадра несёт ?studio=embedded, и
     страница с этим ключом прячет свою консоль (.gbsp is-embedded):
     разметка остаётся на месте, поэтому addSegments и addGroup
     работают и Inspect внутри кадра поднимается как обычно. Второй
     страж — сам факт вложенности (window.top !== window.self): по
     любой ссылке внутри кадра приедет страница уже без ключа, и
     она всё равно не покажет ни консоли, ни вложенной сцены.
     Рекурсия невозможна по построению, а не по договорённости.

     ГДЕ ОТКРЫВАЕТСЯ ДРОВЕР ПРОПЕРТИЗ: ВНУТРИ КАДРА. Решение
     осознанное. Дровер описывает то, что измерено в ЭТОМ
     документе, и всё, что он показывает — computed-стили, копию
     CSS, ссылку в Oro — он берёт у себя под ногами; вынести его
     наружу значит гонять готовый HTML через postMessage и потерять
     кнопку Copy вместе с провенансом. Ширина дровера min(520px,
     100%), поэтому и в кадре 390 он помещается целиком.

     НАРУЖУ ПЕРЕДАЁТСЯ ТОЛЬКО РЕЖИМ. inspect.js на внешней странице
     кричит событием gbi:mode, панель пересылает его в кадр через
     postMessage, inspect.js внутри кадра слушает message и
     переключается. Сам режим и без того переживает загрузку: он
     лежит в sessionStorage, а её кадр делит с вкладкой.

     СОСТОЯНИЕ. sessionStorage gbppl-device плюс ключ ?device= в
     адресе: ссылка ?device=768 открывает страницу сразу планшетом,
     а переход дверями панели держит выбранный экран без ключа в
     адресе. Ключ добавлен в KEEP header.js (Тон-12: контекст
     переживает переходы внутри контейнера).
     ============================================================ */
  var DKEY = 'gbppl-device';

  /* Ширины = наши мерочные пороги (раздел 5 скилла), плюс 2258 —
     кастомный 2xl клиента, на котором снимался лайв. Слово
     человеку, число под ним. */
  var DEVICES = [
    { value: 'full', label: 'Full',   sub: 'window' },
    { value: '2258', label: 'XL',     sub: '2258' },
    { value: '1920', label: 'L',      sub: '1920' },
    { value: '1280', label: 'M',      sub: '1280' },
    { value: '768',  label: 'Tablet', sub: '768' },
    { value: '390',  label: 'Mobile', sub: '390' }
  ];

  /* Proposed: своя ширина и поворот (gbppl-panel-8). Пресеты отвечают
     на вопрос «как это выглядит на наших порогах»; своя ширина — на
     вопрос «а на 1000?», который задаётся ровно тогда, когда ищут, где
     раскладка ломается. Границы 320..2560: ниже 320 не бывает
     телефона, выше 2560 наш верхний порог 2258 уже пройден с запасом.
     Поворот только у планшета и мобильного: у десктопных пресетов
     второй стороны нет, и рисовать её значило бы выдумать число. */
  var CUSTOM_MIN = 320, CUSTOM_MAX = 2560;
  var ROTATE = { '768': '1024', '1024': '768', '390': '844', '844': '390' };

  function inFrame() {
    try { return window.top !== window.self; } catch (e) { return true; }
  }
  function embedded() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('studio'); } catch (e) {}
    return q === 'embedded' || inFrame();
  }
  function isPreset(v) {
    for (var i = 0; i < DEVICES.length; i++) if (DEVICES[i].value === v) return true;
    return false;
  }
  function normDevice(v) {
    v = String(v == null ? 'full' : v);
    if (isPreset(v)) return v;
    /* Своя ширина живёт только в Proposed: Classic не должен менять
       поведения от волны, которая его не касается. */
    if (V2 && /^\d{3,4}$/.test(v)) {
      var n = +v;
      if (n >= CUSTOM_MIN && n <= CUSTOM_MAX) return String(n);
    }
    return 'full';
  }
  function deviceLabel(v) {
    for (var i = 0; i < DEVICES.length; i++) if (DEVICES[i].value === v) return DEVICES[i].label;
    return v === 'full' ? 'Full' : 'Custom';
  }

  /* ============================================================
     СТРОКА СОСТОЯНИЯ (gbppl-panel-8, только Proposed)
     ------------------------------------------------------------
     В Classic под каждой группой стоит свой абзац подсказки, и на
     странице с инспектором их сразу два: «The page behaves as it does
     for a visitor» и «The page fills the window, as a visitor sees
     it» — две трети высоты первой секции заняты текстом, который
     говорит одно и то же дважды. Proposed заменяет их ОДНОЙ строкой
     внизу ящика: она отвечает не «что делает эта кнопка», а «что у
     меня сейчас включено», и это единственный вопрос, который читают
     каждый раз. Абзацы секции This page остаются: они говорят про
     сценарий страницы, чего строка состояния сказать не может.
     ============================================================ */
  var STATE = { mode: 'view', device: 'full' };

  function statusLine() {
    var mode = STATE.mode === 'inspect' ? 'Inspect' : 'View';
    var d = STATE.device;
    if (d === 'full') return mode + ' · Full window';
    return mode + ' · ' + deviceLabel(d) + ' ' + d + ', page runs inside the frame';
  }

  function paintStatus() {
    var el = document.querySelector('.gbsp-status');
    if (el) el.textContent = statusLine();
  }

  function currentMode() {
    try { return sessionStorage.getItem('gbppl-inspect-mode') === 'inspect' ? 'inspect' : 'view'; }
    catch (e) { return 'view'; }
  }
  function readDevice() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('device'); } catch (e) {}
    if (q !== null) {
      var v = normDevice(q);
      try { sessionStorage.setItem(DKEY, v); } catch (e) {}
      return v;
    }
    try { return normDevice(sessionStorage.getItem(DKEY)); } catch (e) { return 'full'; }
  }

  /* Адрес кадра: та же страница, ключ device снят (иначе кадр стал
     бы строить кадр), ключ studio=embedded поставлен. */
  function frameSrc() {
    try {
      var u = new URL(location.href);
      u.searchParams.delete('device');
      u.searchParams.set('studio', 'embedded');
      /* gbppl-panel-8: компоновка едет в кадр рядом с флагом. Консоль
         внутри рамки не видна, но она живая — держит Mode для Inspect
         и слушает клавиши, — и обязана быть того же варианта, что
         снаружи, иначе сравнение сравнивало бы разное. */
      u.searchParams.set('panel', LAYOUT);
      return u.href;
    } catch (e) {
      return location.href;
    }
  }

  /* Адрес ЭТОГО вида: страница, экран, режим и компоновка (gbppl-panel-8).
     Ключ device ставится только когда он что-то значит, mode — только
     когда включён Inspect: ссылка не должна нести умолчаний, иначе
     нельзя отличить «я так выбрал» от «так вышло». */
  function viewUrl() {
    try {
      var u = new URL(location.href);
      if (STATE.device && STATE.device !== 'full') u.searchParams.set('device', STATE.device);
      else u.searchParams.delete('device');
      if (currentMode() === 'inspect') u.searchParams.set('mode', 'inspect');
      else u.searchParams.delete('mode');
      u.searchParams.set('panel', LAYOUT);
      u.searchParams.delete('studio');
      return u.href;
    } catch (e) {
      return location.href;
    }
  }

  /* Буфер обмена: современный путь, а на file:// и в старых окнах —
     скрытое поле и execCommand. Отказ тоже произносится вслух. */
  function copyText(text, done) {
    var ok = function () { done(true); }, no = function () { done(false); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, function () { legacy(); });
      return;
    }
    legacy();
    function legacy() {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        var good = document.execCommand('copy');
        ta.remove();
        good ? ok() : no();
      } catch (e) { no(); }
    }
  }

  /* ============================================================
     ВЕРХНЯЯ ПОЛОСА СЦЕНЫ (gbppl-panel-8, только Proposed)
     ------------------------------------------------------------
     В Classic пресеты живут в ящике: чтобы сменить экран, надо
     открыть консоль, попасть в ячейку сетки 3 × 2 и закрыть консоль
     обратно. Но как только страница ушла в кадр, экран становится
     главным предметом на столе, и место его переключателя — над
     кадром, а не в выдвижном ящике. Полоса стоит В ТЕХ ЖЕ 88px, что
     сцена и так отдавала подписи: 36 (нижняя ступень сетки высот
     кнопок) + поле --space-8 сверху, подпись кадра переезжает в
     правый край полосы и перестаёт занимать свою строку.

     Справа три вещи, которые ящик дать не может: ИЗМЕРЕННАЯ ширина
     кадра (contentWindow.innerWidth, не объявленное число), поле
     своей ширины и поворот. Поворот меняет ширину на вторую сторону
     пресета (768 ↔ 1024, 390 ↔ 844) и показывается только у планшета
     и мобильного: у десктопа второй стороны нет.
     ============================================================ */
  var ROT_ICON =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M2 8a6 6 0 0 1 10.2-4.2M14 8a6 6 0 0 1-10.2 4.2"/>' +
    '<path d="M12.5 1.5v2.5H10M3.5 14.5V12H6"/></svg>';

  function topbarHtml() {
    var presets = DEVICES.map(function (d, i) {
      var label = d.value === 'full' ? 'Full window' : d.label + ' ' + d.sub;
      return '<button class="gbsp-tb__seg" type="button" data-tb="' + d.value + '"' +
             ' aria-pressed="false">' + esc(label) + '</button>';
    }).join('');
    return (
      '<div class="gbsp-topbar">' +
        '<div class="gbsp-tb__presets" role="group" aria-label="Device">' + presets + '</div>' +
        '<div class="gbsp-tb__meas">' +
          '<span class="gbsp-tb__w"></span>' +
          '<input class="gbsp-tb__in" type="text" inputmode="numeric" maxlength="4"' +
                ' placeholder="Width" aria-label="Custom width in pixels">' +
          '<button class="gbsp-tb__rot" type="button" title="Rotate" aria-label="Rotate">' +
            ROT_ICON +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  function mountDevice(host) {
    if (embedded()) return null;

    var current = readDevice();
    var stage = null, screen = null, cap = null, handle = null, bar = null;

    handle = makeSegments(host, {
      title: 'Device',
      rank: 2,
      /* Classic: сетка 3 × 2 со словом и числом. Proposed: одна строка
         из шести чипов, слово уходит в title — ряд читается как одна
         шкала от окна до телефона, а не как таблица (gbppl-panel-8). */
      grid: !V2,
      row: V2,
      value: current,
      options: DEVICES.map(function (d) {
        return {
          label: V2 ? (d.value === 'full' ? 'Full' : d.sub) : d.label,
          value: d.value,
          sub: V2 ? null : d.sub,
          title: d.value === 'full' ? 'Full window' : d.label + ' ' + d.sub,
          note: d.value === 'full'
            ? 'The page fills the window, as a visitor sees it.'
            : d.label + ' frame: the page runs at ' + d.sub + 'px inside it. Inspect works in the frame.'
        };
      }),
      onChange: function (v) { apply(v, true); }
    });

    /* Подпись говорит то, что ВНУТРИ читает window.innerWidth, а не
       габарит рамки: прибор показывает окно страницы, а не коробку,
       в которую оно вставлено. Число снимается, а не объявляется. */
    function measure() {
      if (!screen) return;
      var w = screen.clientWidth, h = screen.clientHeight;
      try {
        if (screen.contentWindow && screen.contentWindow.innerWidth) {
          w = screen.contentWindow.innerWidth;
          h = screen.contentWindow.innerHeight;
        }
      } catch (e) { /* кадр ещё не приехал */ }
      if (cap) {
        cap.innerHTML = '<b>' + esc(deviceLabel(current)) + '</b>' +
          '<span>' + Math.round(w) + ' × ' + Math.round(h) + '</span>';
      }
      if (bar) {
        bar.querySelector('.gbsp-tb__w').textContent = Math.round(w) + ' × ' + Math.round(h);
      }
    }

    /* Полоса перекрашивается отдельно от замера: пресеты, поворот и
       поле своей ширины отвечают на выбор, а не на раскладку. */
    function paintBar() {
      if (!bar) return;
      var segs = bar.querySelectorAll('[data-tb]');
      for (var i = 0; i < segs.length; i++) {
        var on = segs[i].getAttribute('data-tb') === current;
        segs[i].classList.toggle('is-on', on);
        segs[i].setAttribute('aria-pressed', String(on));
      }
      var rot = bar.querySelector('.gbsp-tb__rot');
      rot.hidden = !ROTATE[current];
      var input = bar.querySelector('.gbsp-tb__in');
      if (document.activeElement !== input) input.value = isPreset(current) ? '' : current;
    }

    function buildBar() {
      var host = document.createElement('div');
      host.innerHTML = topbarHtml();
      bar = host.firstChild;
      stage.appendChild(bar);
      stage.classList.add('gbsp-stage--bar');

      bar.addEventListener('click', function (e) {
        var t = e.target.closest ? e.target.closest('[data-tb], .gbsp-tb__rot') : null;
        if (!t) return;
        if (t.classList.contains('gbsp-tb__rot')) {
          if (ROTATE[current]) apply(ROTATE[current], true);
          return;
        }
        apply(t.getAttribute('data-tb'), true);
      });

      var input = bar.querySelector('.gbsp-tb__in');
      input.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') { e.stopPropagation(); return; }
        e.preventDefault();
        var n = parseInt(input.value, 10);
        if (!(n >= CUSTOM_MIN && n <= CUSTOM_MAX)) { paintBar(); input.blur(); return; }
        apply(String(n), true);
        input.blur();
      });
      /* Клавиши экранов не должны срабатывать, пока в поле печатают
         число: 1..6 здесь — цифры, а не пресеты. */
      input.addEventListener('keypress', function (e) { e.stopPropagation(); });
      input.addEventListener('blur', paintBar);
    }

    function build(width) {
      if (!stage) {
        stage = document.createElement('div');
        stage.className = 'gbsp-stage';
        stage.setAttribute('role', 'group');
        stage.setAttribute('aria-label', 'Device preview');
        stage.innerHTML =
          '<div class="gbsp-device">' +
            (V2 ? '' : '<p class="gbsp-device__cap"></p>') +
            '<iframe class="gbsp-screen" title="The page at the chosen device width"></iframe>' +
          '</div>';
        document.body.appendChild(stage);
        screen = stage.querySelector('.gbsp-screen');
        cap = stage.querySelector('.gbsp-device__cap');
        screen.addEventListener('load', function () {
          measure();
          relay();
        });
        screen.src = frameSrc();
        if (V2) buildBar();
      }
      /* Смена пресета шириной, БЕЗ перезагрузки кадра: страница
         внутри слышит resize и отвечает своими медиазапросами —
         ровно то, ради чего переключатель и просили.

         +2 — это волосок рамки с двух сторон. Кадр считается по
         border-box, и без поправки Mobile 390 давал внутри окно 388:
         пресет обязан значить ровно ту ширину, которую внутри
         прочтёт window.innerWidth и медиазапрос, а рамка устройства
         стоит СНАРУЖИ измеряемого. Замер после правки: 390 в 390. */
      stage.querySelector('.gbsp-device').style.width = (width + 2) + 'px';
      document.documentElement.classList.add('gbsp-devicing');
      paintBar();
      requestAnimationFrame(measure);
    }

    function teardown() {
      document.documentElement.classList.remove('gbsp-devicing');
      if (stage) { stage.remove(); stage = null; screen = null; cap = null; bar = null; }
    }

    /* Ключ в адресной строке идёт следом за выбором, чтобы ссылку
       на «эту страницу планшетом» можно было просто скопировать.
       replaceState, не push: экран — это как смотрят, а не куда
       пришли, и кнопка «назад» не должна разбирать его по шагам. */
    function stamp(v) {
      try {
        var u = new URL(location.href);
        if (v === 'full') u.searchParams.delete('device');
        else u.searchParams.set('device', v);
        history.replaceState(null, '', u.pathname + (u.search || '') + u.hash);
      } catch (e) {}
    }

    function apply(v, fromClick) {
      current = normDevice(v);
      try { sessionStorage.setItem(DKEY, current); } catch (e) {}
      if (fromClick) stamp(current);
      if (current === 'full') teardown();
      else build(+current);
      if (handle) handle.setActive(current);
      STATE.device = current;
      paintStatus();
    }

    function relay(mode) {
      if (!screen || !screen.contentWindow) return;
      var m = mode;
      if (!m) { try { m = sessionStorage.getItem('gbppl-inspect-mode'); } catch (e) {} }
      try { screen.contentWindow.postMessage({ gbsp: 'mode', mode: m === 'inspect' ? 'inspect' : 'view' }, '*'); } catch (e) {}
    }

    /* Режим объявляет inspect.js, кадру его пересылает панель:
       прибор не знает про рамку, рамка не знает про прибор. */
    document.addEventListener('gbi:mode', function (e) {
      relay(e.detail && e.detail.mode);
    });
    window.addEventListener('resize', function () { if (stage) requestAnimationFrame(measure); });

    /* Обратный провод из кадра (gbppl-panel-8). Копия консоли внутри
       рамки не видна, но клавиши слышит она — фокус там, — поэтому
       она кричит наружу, а решает по-прежнему пульт снаружи: экран
       принадлежит сцене, и менять его изнутри кадра было бы попыткой
       страницы подвинуть стол, на котором она лежит. */
    window.addEventListener('message', function (e) {
      if (!screen || !screen.contentWindow || e.source !== screen.contentWindow) return;
      var d = e.data;
      if (!d || !d.gbsp) return;
      if (d.gbsp === 'device') apply(d.device, true);
      /* Сравнение с ЖИВЫМ режимом прибора, а не с sessionStorage:
         хранилище у кадра и у страницы одно на вкладку, и кадр уже
         успел его переписать — по нему выходило бы, что снаружи всё
         сделано, и сегмент Mode на пульте отставал бы (замер 27.08). */
      if (d.gbsp === 'mode-up' && window.GbInspect && window.GbInspect.mode() !== d.mode) {
        window.GbInspect.setMode(d.mode);
      }
    });

    apply(current, false);
    return { apply: apply, value: function () { return current; } };
  }

  /* ============================================================
     КЛАВИШИ (gbppl-panel-8, только Proposed)
     ------------------------------------------------------------
     i уже переключал режим (inspect.js, gbppl-inspect-1), Esc уже
     закрывал дровер и консоль. Proposed добавляет ряд 1..6 на
     экраны — те же шесть чипов, что в ящике, в том же порядке, 1 =
     Full. Ни одна не срабатывает, пока курсор в поле или зажат
     модификатор: клавиша-одиночка в тексте — это буква.

     Внутри кадра клавиши слышит копия консоли, и она передаёт их
     наружу тем же способом, каким наружу уходит режим.
     ============================================================ */
  function typingIn(t) {
    return !!(t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' ||
                    t.tagName === 'SELECT' || t.isContentEditable));
  }

  function wireKeys(device) {
    if (!V2) return;
    document.addEventListener('keydown', function (e) {
      if (typingIn(e.target) || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      var n = '123456'.indexOf(e.key);
      if (n < 0) return;
      e.preventDefault();
      var v = DEVICES[n].value;
      if (device) device.apply(v, true);
      else if (embedded()) {
        try { window.parent.postMessage({ gbsp: 'device', device: v }, '*'); } catch (err) {}
      }
    });
  }

  /* Внутри кадра: режим, переключённый клавишей i, уходит наружу,
     чтобы сегмент Mode на пульте не врал. Наружная консоль тем же
     проводом присылает режим внутрь (relay выше), и обе стороны
     сравнивают значение перед тем, как что-то делать — петли нет. */
  function wireEmbedded() {
    if (!embedded()) return;
    document.addEventListener('gbi:mode', function (e) {
      var m = e.detail && e.detail.mode === 'inspect' ? 'inspect' : 'view';
      try { window.parent.postMessage({ gbsp: 'mode-up', mode: m }, '*'); } catch (err) {}
    });
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

      /* gbppl-panel-7. В кадре пульта нет: он стоит снаружи и
         управляет кадром оттуда. Разметка остаётся на месте, гасится
         только вид, — иначе addSegments и addGroup потеряли бы дом, а
         вместе с ними Inspect внутри кадра. */
      if (embedded()) shell.classList.add('is-embedded');
      else this.__device = mountDevice(this);
      wireKeys(this.__device);
      wireEmbedded();

      function setOpen(open) {
        shell.classList.toggle('is-collapsed', !open);
        tab.setAttribute('aria-expanded', String(open));
        tab.setAttribute('aria-label',
          open ? 'Close the Design Studio panel' : 'Open the Design Studio panel');
        /* Proposed помнит ящик между страницами (gbppl-panel-8): за
           один проход по прототипу консоль открывают по десять раз, и
           каждый раз она встречает закрытой. Память вкладки, не
           навсегда: это состояние работы, а не настройка. */
        if (V2) { try { sessionStorage.setItem(OKEY, open ? '1' : '0'); } catch (e) {} }
      }

      tab.addEventListener('click', function () {
        setOpen(shell.classList.contains('is-collapsed'));
      });

      if (V2) {
        var saved = null;
        try { saved = sessionStorage.getItem(OKEY); } catch (e) {}
        if (saved === '1') setOpen(true);
        watchTab(shell);
      }

      /* Escape закрывает — тот же жест, что у меню хедера. В Proposed
         очередь честная: сначала дровер пропертиз, потом ящик
         (gbppl-panel-8). В Classic порядок прежний. */
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape' || shell.classList.contains('is-collapsed')) return;
        if (V2 && document.querySelector('.gbd-panel.is-open')) return;
        /* Один Esc — одно закрытие. Слушателей на этой клавише трое
           (дровер, консоль, прибор), все на document, и наш висит
           первым: без остановки цепочки один нажим и закрывал ящик, и
           выводил из Inspect (замер 27.08). В Classic очередь прежняя. */
        if (V2 && e.stopImmediatePropagation) e.stopImmediatePropagation();
        setOpen(false);
        tab.focus();
      });

      wireFoot(this);
    }
  }

  /* ============================================================
     ЯРЛЫК: ТИШЕ И НЕ ПОПЕРЁК ДОРОГИ (gbppl-panel-8, Proposed)
     ------------------------------------------------------------
     Прогон нашёл две настоящие помехи: на 360 язычок ложится на крест
     адресного дровера чекаута и на угол START-попапа портала. Оба
     раза консоль перекрывает кнопку ЧУЖОГО слоя, а пульт прототипа не
     имеет права мешать смотреть прототип.

     Проверка не по списку страниц, а по пикселям: консоль на миг
     отпускает указатель, и мы спрашиваем документ, что лежит под
     язычком. Оказался чужой ОВЕРЛЕЙ — язычок уходит совсем: гаснет и
     перестаёт ловить клики, пока слой не закроют. Не «отодвигается
     пониже»: замер 27.08 показал, что отодвигать некуда — дровер
     чекаута во всю высоту, а попап портала стоит по центру, и любая
     точка правого края накрывает чью-то кнопку (на 360 середина окна
     легла ровно на «Call us»). Модальный слой на то и модальный:
     пока он открыт, смотрят его, и пульт уступает так же, как ему
     уступает страница. Возвращается он сам, в тот же кадр, когда
     слой закрылся.

     ПОРОГ 40, А НЕ 30. Ниже 40 живёт постоянная мебель страницы:
     шапка 31, липкая полоса категорий 32, плавающие кнопки каталога
     30. Она не модальная и никуда не денется — гасить язычок из-за
     неё значило бы погасить его навсегда. С 40 начинаются настоящие
     слои: дроверы чекаута 40, .start-overlay портала 42, системный
     дровер 80. Своё не считается: сцена устройства (58) и сама
     консоль принадлежат прибору.

     Способ page-agnostic: он не знает ни про Alpine чекаута, ни про
     попап портала, и сработает на слое, которого ещё не написали.
     ============================================================ */
  var OKEY = 'gbppl-panel-open';

  function coveredBy(shell) {
    var tab = shell.querySelector('.gbsp-tab');
    if (!tab) return false;
    var r = tab.getBoundingClientRect();
    if (!r.width) return false;
    var prev = shell.style.pointerEvents;
    shell.style.pointerEvents = 'none';
    var el = document.elementFromPoint(Math.round(r.left + r.width / 2),
                                       Math.round(r.top + r.height / 2));
    shell.style.pointerEvents = prev;
    if (el && el.closest && el.closest('gb-studio-panel, .gbsp, .gbsp-stage')) return false;
    while (el && el !== document.documentElement) {
      var cs = getComputedStyle(el);
      if (cs.position === 'fixed' && (parseInt(cs.zIndex, 10) || 0) >= 40) return true;
      el = el.parentElement;
    }
    return false;
  }

  function watchTab(shell) {
    var queued = false, obs = null;
    var check = function () {
      queued = false;
      if (shell.classList.contains('is-collapsed')) {
        shell.classList.toggle('is-shy', coveredBy(shell));
      } else {
        shell.classList.remove('is-shy');
      }
      /* Проба сама себя увидела бы: она пишет style и class на узлы
         внутри body, а наблюдатель смотрит на body целиком — без
         этой строки один кадр рождал бы следующий бесконечно.
         Записи, накопленные за проверку, выбрасываются. */
      if (obs) obs.takeRecords();
    };
    var poke = function () { if (!queued) { queued = true; requestAnimationFrame(check); } };
    try {
      obs = new MutationObserver(poke);
      obs.observe(document.body, { attributes: true, childList: true, subtree: true });
    } catch (e) { /* очень старый движок: язычок просто останется на месте */ }
    window.addEventListener('resize', poke);
    document.addEventListener('click', poke, true);
    poke();
  }

  /* ============================================================
     ПОДВАЛ: КОПИЯ ССЫЛКИ, СОСТОЯНИЕ, КОМПОНОВКА (gbppl-panel-8)
     ------------------------------------------------------------
     Copy link отвечает на просьбу, которая до сих пор решалась
     диктовкой в чат: «покажи мне то же самое». Ссылка несёт страницу,
     экран, режим и компоновку, то есть весь вид целиком, и её можно
     просто вставить.
     ============================================================ */
  function wireFoot(host) {
    var copy = host.querySelector('.gbsp-copy');
    if (copy) {
      var word = copy.textContent, timer = null;
      copy.addEventListener('click', function () {
        copyText(viewUrl(), function (ok) {
          copy.textContent = ok ? 'Copied' : 'Could not copy';
          copy.classList.add('is-said');
          clearTimeout(timer);
          timer = setTimeout(function () {
            copy.textContent = word;
            copy.classList.remove('is-said');
          }, 1500);
        });
      });
    }

    var seg = host.querySelector('.gbsp-sec--layout');
    if (seg) {
      seg.addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('[data-layout]') : null;
        if (!b) return;
        var v = b.getAttribute('data-layout');
        if (v === LAYOUT) return;
        try { sessionStorage.setItem(LKEY, v); } catch (err) {}
        /* Перезагрузка честнее перерисовки: порядок секций в Proposed
           другой в самой разметке, и собирать его на лету значило бы
           держать две сборки одного ящика. Ключ в адресе — чтобы
           ссылку на вариант можно было передать. */
        try {
          var u = new URL(location.href);
          u.searchParams.set('panel', v);
          location.href = u.href;
        } catch (err) { location.reload(); }
      });
    }

    STATE.mode = currentMode();
    paintStatus();
    document.addEventListener('gbi:mode', function (e) {
      STATE.mode = e.detail && e.detail.mode === 'inspect' ? 'inspect' : 'view';
      paintStatus();
    });
  }
  if (!customElements.get('gb-studio-panel')) {
    customElements.define('gb-studio-panel', GbStudioPanel);
  }
})();
