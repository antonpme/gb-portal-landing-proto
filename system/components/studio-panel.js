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
    /* gbppl-panel-7: место группы в секции задаётся РАНГОМ, а не
       порядком вызова. Mode объявляет inspect.js асинхронно (через
       whenDefined), Device — сама панель в connectedCallback, то есть
       раньше; без ранга порядок на экране зависел бы от того, кто
       успел первым. Mode = 1, Device = 2, и так на каждой странице. */
    var rank = typeof spec.rank === 'number' ? spec.rank : 50;
    wrap.setAttribute('data-rank', String(rank));
    var html = '<span class="gbsp-eyebrow">' + esc(spec.title || 'Mode') + '</span>' +
               '<div class="gbsp-segs' + (spec.grid ? ' gbsp-segs--grid' : '') + '"' +
               ' role="group" aria-label="' + esc(spec.title || 'Mode') + '">';
    options.forEach(function (o, i) {
      /* Подпись сегмента бывает двухэтажной: слово человеку, число
         прибору («Tablet» и 768). Второй этаж необязателен — у
         режима его нет и не должно быть. */
      html += '<button class="gbsp-seg" type="button" data-seg="' + i + '"' +
              ' aria-pressed="false">' + esc(o.label) +
              (o.sub ? '<span class="gbsp-seg__sub">' + esc(o.sub) + '</span>' : '') +
              '</button>';
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

  function inFrame() {
    try { return window.top !== window.self; } catch (e) { return true; }
  }
  function embedded() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('studio'); } catch (e) {}
    return q === 'embedded' || inFrame();
  }
  function normDevice(v) {
    v = String(v == null ? 'full' : v);
    for (var i = 0; i < DEVICES.length; i++) if (DEVICES[i].value === v) return v;
    return 'full';
  }
  function deviceLabel(v) {
    for (var i = 0; i < DEVICES.length; i++) if (DEVICES[i].value === v) return DEVICES[i].label;
    return 'Full';
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
      return u.href;
    } catch (e) {
      return location.href;
    }
  }

  function mountDevice(host) {
    if (embedded()) return null;

    var current = readDevice();
    var stage = null, screen = null, cap = null, handle = null;

    handle = makeSegments(host, {
      title: 'Device',
      rank: 2,
      grid: true,
      value: current,
      options: DEVICES.map(function (d) {
        return {
          label: d.label, value: d.value, sub: d.sub,
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
      if (!screen || !cap) return;
      var w = screen.clientWidth, h = screen.clientHeight;
      try {
        if (screen.contentWindow && screen.contentWindow.innerWidth) {
          w = screen.contentWindow.innerWidth;
          h = screen.contentWindow.innerHeight;
        }
      } catch (e) { /* кадр ещё не приехал */ }
      cap.innerHTML = '<b>' + esc(deviceLabel(current)) + '</b>' +
        '<span>' + Math.round(w) + ' × ' + Math.round(h) + '</span>';
    }

    function build(width) {
      if (!stage) {
        stage = document.createElement('div');
        stage.className = 'gbsp-stage';
        stage.setAttribute('role', 'group');
        stage.setAttribute('aria-label', 'Device preview');
        stage.innerHTML =
          '<div class="gbsp-device">' +
            '<p class="gbsp-device__cap"></p>' +
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
      requestAnimationFrame(measure);
    }

    function teardown() {
      document.documentElement.classList.remove('gbsp-devicing');
      if (stage) { stage.remove(); stage = null; screen = null; cap = null; }
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

    apply(current, false);
    return { apply: apply, value: function () { return current; } };
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
