/* ============================================================
   SYSTEM COMPONENT: STUDIO PANEL, JS-шаблон (gbppl-panel-4,
   Тон 2026-08-24, секция Sandbox 2026-08-25, секция This page
   2026-08-26, Mode 2026-08-26, Device gbppl-panel-7 2026-08-27,
   вторая компоновка gbppl-panel-8 2026-08-27, Classic снят
   gbppl-panel-10 2026-08-27, гардероб и счёт gbppl-panel-11
   2026-08-28, счёт на ярлыке gbppl-panel-12 2026-08-28)
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

   ОДНА КОМПОНОВКА (gbppl-panel-10, 2026-08-27). Волна panel-8 собрала
   вторую компоновку рядом с первой на слово Тона «давай попробуем
   собрать твой вариант и сравнить»; сравнили, и Тон сказал: «никакого
   старого варианта, конечно, Proposed». Classic ушёл целиком — ветка
   шаблона, свои правила CSS, сегмент Layout внизу ящика, ключ ?panel и
   память sessionStorage gbppl-panel-layout. Старая ссылка с
   ?panel=v1|v2 открывается нормально: ключ просто никем не читается.

   Консоль — НАВИГАЦИЯ: титул, разделы студии с подсветкой текущего,
   версия этой страницы сегментом, инструменты (Mode и одна строка
   девайсов), одна строка состояния вместо абзацев под группами,
   Copy link. Всё, что раньше было «только в v2» — клавиши 1..6,
   стеснительный ярлык под чужим оверлеем, строка состояния, Copy link,
   верхняя полоса над кадром, — теперь просто поведение консоли.

   API НЕ ТРОНУТ. addGroup / addSegments / setActive / setNote / ранги
   работают ровно как прежде: inspect.js и реестр про компоновки не
   знали ничего и не узнают.

   ------------------------------------------------------------
   ТРЕТИЙ РЕЖИМ (gbppl-comments-b, 28.08)
   ------------------------------------------------------------
   Тон, 27.08, заказом на комментарии: «комментарий принадлежит
   объекту; видно, кто оставил; на комментарии можно отвечать».
   Спека: studio\docs\COMMENT-MODE-SPEC.md.

   Панель отдала под это три вещи и НИ ОДНОЙ строки поведения:

   1. ТРЕТЬЯ ПОЗИЦИЯ ТУМБЛЕРА. Выключенный сегмент «Comment · coming
      soon» (gbppl-panel-8) снят; вместо него ручка addSegments
      получила addOption, и живой сегмент дописывает его владелец —
      system\components\comments.js. Панель по-прежнему владеет видом
      и местом, поведение принадлежит владельцу режима, как у View и
      Inspect.
   2. addSection({ title, rank }) — своя полка ящика для того, что не
      является переключателем страницы. Ранги секций: Mode и Device
      10, Comments 20, This page 90; подвал последний всегда.
   3. ПРОВОД В КАДР. Тот же, что у режима прибора: событие gbc:mode
      наружу пересылается внутрь как postMessage {gbsp:'cmode'},
      изнутри наружу как {gbsp:'cmode-up'}, и обе стороны сравнивают
      значение перед тем, как что-то делать. Строка состояния
      печатает «Comment · <экран>», а при отказе сервиса — то, что
      владелец режима в этом же событии передал строкой.

   Плюс АТРИБУТ data-api на самом элементе: база адреса сервиса
   комментариев. Пусто (по умолчанию) значит same-origin, ровно как
   на VPS за Caddy. Задаётся только в проверочных прогонах, где сайт
   и сервис стоят на разных портах и проксировать некому. Панель
   значение не читает: она его ХРАНИТ, потому что она единственный
   элемент студии, который стоит на всех страницах с консолью.

   ------------------------------------------------------------
   ЯЩИК ОДЕВАЕТСЯ ПО РЕЖИМУ (gbppl-panel-11, 2026-08-28)
   ------------------------------------------------------------
   Тон, 28.08, дословно: «Не логично показывать секцию Comments on
   this page во View mode. Во View я хочу просто смотреть сайт,
   комментарии показывать не нужно, только когда я перехожу в режим
   комментариев. Логика панелей: режим комментариев: нужна только
   секция комментариев, панель выбора девайсов не нужна. Режимы View
   и Inspect: нужна панель девайсов, секцию комментариев не
   отображать. И когда есть комментарии, на иконке нужен бейдж с
   количеством новых (непрочитанных) комментариев, чтобы я сразу это
   видел».

   Отсюда три вещи, и все три у панели: панель владеет ВИДОМ и МЕСТОМ
   (gbppl-panel-6), владельцы режимов владеют поведением.

   1. ГАРДЕРОБ. Секция и группа сегментов объявляют, в каких режимах
      их видно: spec.when = 'comment' или 'view inspect'. Панель
      пишет это в data-when и гасит лишнее классом is-away по
      событиям gbi:mode и gbc:mode — без перерисовки ящика, с
      коротким --mo-small на возвращении. Кто ничего не объявил,
      стоит всегда: Mode, навигация, версия страницы, This page,
      подвал.
   2. БЕЙДЖ НА СЕГМЕНТЕ. Ручка addSegments получила setBadge(value,
      n): маленький счёт на позиции тумблера. Это ТОТ ЖЕ бейдж, что у
      корзины хедера (Count badge, токены --count-badge-*), а не
      третий; правила в studio-panel.css. Сколько там непрочитанного,
      панель не знает и знать не должна: число приносит владелец
      режима.
   3. КЛАВИШИ 1..6 МОЛЧАТ В COMMENT. Экран из режима комментариев не
      переключается (решение Тона выше), значит и ряд цифр не
      срабатывает. Полоса НАД КАДРОМ остаётся живой намеренно: она
      принадлежит сцене, а не ящику, и когда кадр уже стоит, она
      единственная дорога обратно в полное окно.

   ------------------------------------------------------------
   СЧЁТ ВЫШЕЛ НА ЯРЛЫК (gbppl-panel-12, 2026-08-28)
   ------------------------------------------------------------
   Тон в тот же день, увидев бейдж на сегменте: «думаю можно счёт и
   там» — на язычке STUDIO. Причина простая: закрытая консоль это
   обычное состояние прототипа, и бейдж, живущий внутри ящика,
   отвечает только тому, кто ящик уже открыл. Просьба «чтобы я сразу
   это видел» договаривается до конца именно здесь.

   Метод `panel.setTabBadge(n)` и кисть `paintTabBadge` ниже. Ничего
   нового в системе не рождается: тот же Count badge (--count-badge-*)
   тем же классом .gbsp-badge, число приносит тот же вызов
   comments.js, что красит сегмент. Панель добавляет ровно одно своё
   знание — открыт ли ящик, — и показывает счёт в одном месте за раз.
   Со счётом ярлык стоит в полную силу (тихость .55 гасила бы и
   бейдж), но стеснительным быть не перестаёт: под чужим модальным
   слоем он уходит вместе со счётом.

   РАЗБОР ТОНА (gbppl-panel-9, 2026-08-27). Три правки, с которых
   Proposed и стал тем, что осталось.

   1. «Первому блоку не хватает понятной подписи: не сразу ясно, где
      ты сейчас находишься... Назвать блок не Hub, а Hub Homepage.
      Показать вложенность: дать группе название, а Live Prototype и
      остальные элементы оформить как дочерние страницы.» Отсюда
      секция навигации: eyebrow «you are in», корневая строка Hub
      Homepage, под ней с отступом и линией вложенности трое детей, и
      под активным разделом мелкое имя ТЕКУЩЕЙ страницы. Список
      дверей отвечал «куда пойти» и молчал о том, где ты; теперь он
      отвечает на оба вопроса, а это и был вопрос Тона.
   2. «Сделать так, чтобы Live Prototype начинался не сразу с сайта, а
      с экрана выбора (как в Sandboxes).» Дверь Live Prototype ведёт
      на live\map.html — дерево страниц прототипа со статусами.
      live\index.html остался главной сайта и никуда не переехал: на
      него по-прежнему смотрят data-home и ссылки внутри прототипа.
   3. «Versions of this page: для Live нужно явно показывать, что это
      текущая версия»; «между Mode и Device нужен разделитель, такой
      же, как между Versions of this page и Mode»; «переключение
      устройств лучше сделать иконками, а не числовыми шкалами:
      размеры понятны не всем, а тем же копирайтерам тоже нужно
      удобно проверять, как текст смотрится на разных девайсах».
      Отсюда суффикс «· current» на активной версии (активной бывает
      и песочница, метка идёт за активным), линия между двумя
      группами сегментов, и шесть иконок вместо шести чисел — имя и
      размер живут в title, во всплывающей подписи под строкой и в
      полосе над кадром.
   ============================================================ */
(function () {
  'use strict';

  /* Copy link кладёт в адрес mode=inspect, значит адрес обязан
     работать (gbppl-panel-8). Прибор читает режим из sessionStorage и
     стартует после нас, поэтому ключ переписывается здесь, до его
     старта: inspect.js остаётся нетронутым и просто находит то, что
     ему положили. */
  (function () {
    try {
      var m = new URLSearchParams(location.search).get('mode');
      if (m === 'inspect' || m === 'view') sessionStorage.setItem('gbppl-inspect-mode', m);
      /* gbppl-comments-b: третье значение того же ключа. Comment и
         Inspect взаимоисключающи, поэтому адрес с mode=comment гасит
         прибор в том же движении, каким зажигает комментарии. */
      if (m === 'comment') {
        sessionStorage.setItem('gbppl-inspect-mode', 'view');
        sessionStorage.setItem('gbppl-comment-mode', '1');
      } else if (m === 'inspect' || m === 'view') {
        sessionStorage.setItem('gbppl-comment-mode', '0');
      }
    } catch (e) {}
  })();

  /* ============================================================
     КАРТА СТУДИИ (gbppl-panel-9)
     ------------------------------------------------------------
     Те же четыре места, но не плоским списком: хаб — корень, три
     раздела — его дети. Третье поле у ребёнка — КЛЮЧ РАЗДЕЛА, тот
     самый, что возвращает sectionHere: адрес двери и раздел, который
     она открывает, с этой волны разные вещи. Live Prototype ведёт на
     экран выбора live\map.html, а разделом остаётся всё, что лежит
     в live\ — включая саму главную сайта.
     ============================================================ */
  var NAV_ROOT = ['index.html', 'Hub Homepage'];
  var NAV_KIDS = [
    ['live/map.html',         'Live Prototype', 'live/index.html'],
    ['sandboxes.html',        'Sandboxes',      'sandboxes.html'],
    ['system/oro/index.html', 'Design System',  'system/oro/index.html']
  ];

  /* ИМЯ МЕСТА, ГДЕ СТОИШЬ (gbppl-panel-9). Тон: «не сразу ясно, где
     ты сейчас находишься». Раздел подсвечен, но раздел — это не
     страница, и на live\catalog\ подсветка Live Prototype говорит
     только половину.

     Таблица, а не заголовок документа: <title> у страниц собран по
     разным правилам («GildedBox · Home», но «Checkout · GildedBox»,
     а у каталога и вовсе «Gift Concierge Prototype»), и вытаскивать
     имя оттуда значило бы гадать. Таблица короткая, живёт рядом с
     дверями и правится там же, где заводится страница. Ключ — путь
     ОТ КОРНЯ СТУДИИ, как в реестре песочниц. */
  var PLACES = {
    'index.html':                 'Hub homepage',
    'sandboxes.html':             'Sandboxes',
    'live/map.html':              'Page map',
    /* ПЯТЬ СТРОК LIVE ЗВУЧАТ СЛОВАМИ РЕЕСТРА (gbppl-sandbox-names-1,
       Тон 31.08: «Прототипы должны называться по странице: Checkout
       Page, Home Page, Category Page... Я не понимаю, что нажимать и
       куда ведёт»). Полка песочниц печатает имя страницы заголовком
       карточки, и если консоль НА ТОЙ ЖЕ странице зовёт её иначе,
       человек считает их двумя местами. Источник имени —
       system\sandbox-registry.js, PAGES[id].label; здесь стоит его
       копия, потому что таблица длиннее реестра (страницы Oro и
       мерочные в нём не заведены) и потому что консоль обязана
       называть место даже там, где реестра рядом нет. */
    'live/index.html':            'Home page',
    'live/catalog/index.html':    'Category page',
    'live/checkout.html':         'Checkout page',
    'live/portal.html':           'Portal page',
    'live/book-a-meeting.html':   'Book a meeting form',
    'system/oro/index.html':      'About Oro',
    'system/oro/typography.html': 'Typography',
    'system/oro/colors.html':     'Colors',
    'system/oro/icons.html':      'Icons',
    /* gbppl-oro-pages-1: the Components section became an opening
       page plus a page per component (Ton-19), so the table grows a
       line per showcase. Icons and Drawer had already become pages
       and had been missed; they are here now. */
    'system/oro/components.html': 'Components',
    'system/oro/button.html':     'Button',
    'system/oro/badge.html':      'Count badge',
    'system/oro/eyebrow.html':    'Eyebrow',
    'system/oro/field.html':      'Field',
    'system/oro/drawer.html':     'Drawer',
    'system/pages/index.html':    'Component pages',
    'system/pages/auth.html':     'Sign in, measured',
    'system/pages/catalog.html':  'Gifts, measured',
    'system/pages/home.html':     'Home, measured'
  };

  var CHEVRON =
    '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5.5 3 9.5 7l-4 4"/></svg>';

  /* Подсвечивается не страница, а РАЗДЕЛ, в котором стоишь
     (gbppl-panel-8). Плоский список дверей синел только на самой себе,
     и на live/catalog или на typography не горела ни одна — он читался
     как «куда пойти» и молчал о том, где ты. Ящик-навигация обязан
     отвечать и на второй вопрос, поэтому путь страницы сравнивается с
     ПАПКОЙ двери: всё внутри live/ — это Live Prototype, всё внутри
     system/ — Design System (витрина и мерочные страницы живут в одном
     разделе студии). Корень считается от data-root, а не от глубины
     страницы: адрес разрешает браузер. */
  function rootPath(root) {
    var probe = document.createElement('a');
    probe.href = root || './';
    return probe.pathname.replace(/[^/]*$/, '');
  }

  /* Путь страницы ОТ КОРНЯ СТУДИИ. Папка приравнена к своему
     index.html, как в реестре: /live/catalog/ и
     /live/catalog/index.html — одно место (gbppl-panel-9). */
  function relHere(root) {
    var base = rootPath(root);
    var rel = location.pathname;
    rel = rel.indexOf(base) === 0 ? rel.slice(base.length) : rel;
    if (rel === '' || /\/$/.test(rel)) rel += 'index.html';
    return rel;
  }

  function sectionHere(root) {
    var rel = relHere(root);
    if (rel === 'index.html') return 'index.html';
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

  /* ============================================================
     СЕКЦИЯ НАВИГАЦИИ (gbppl-panel-9)
     ------------------------------------------------------------
     Тон: «Первому блоку не хватает понятной подписи: не сразу ясно,
     где ты сейчас находишься... Назвать блок не Hub, а Hub Homepage.
     Показать вложенность: дать группе название, а Live Prototype и
     остальные элементы оформить как дочерние страницы».

     Подпись группы — та же роль Eyebrow, что у всех остальных
     подписей ящика; слова «you are in» выбраны потому, что группа
     отвечает на вопрос о МЕСТЕ, а не о переходе, и это единственное
     место панели, которое говорит про здесь и сейчас.

     Вложенность рисуется отступом и линией, а не вторым кеглем:
     дети — те же .gbsp-link, что и корень, потому что это та же
     навигация (Тон-6, второго языка списку не заводим).

     Имя текущей страницы печатается ТОЛЬКО тогда, когда активная
     строка — не сама эта страница: на хабе, на карте, на полке
     песочниц и на About Oro строка и есть страница, и повторять её
     под собой значит сказать одно дважды.
     ============================================================ */
  function navSection(root) {
    var here = sectionHere(root);
    var rel  = relHere(root);
    var name = PLACES[rel] || '';

    function row(path, label, section, kid) {
      var on = here === section;
      /* Строка активна и ведёт не на саму страницу — значит имя
         страницы ещё не произнесено, и его говорит подпись. */
      var say = on && name && path !== rel ? name : '';
      return '<li>' +
        '<a class="gbsp-link' + (on ? ' is-active' : '') + '" href="' + root + path + '"' +
        (on ? ' aria-current="page"' : '') + '>' + label + '</a>' +
        (say ? '<span class="gbsp-here">' + esc(say) + '</span>' : '') +
      '</li>';
    }

    var kids = NAV_KIDS.map(function (k) {
      return row(k[0], k[1], k[2], true);
    }).join('');

    return (
      '<div class="gbsp-sec gbsp-sec--nav">' +
        '<span class="gbsp-eyebrow">you are in</span>' +
        '<ul class="gbsp-list">' +
          row(NAV_ROOT[0], NAV_ROOT[1], 'index.html', false) +
          '<li><ul class="gbsp-list gbsp-sub">' + kids + '</ul></li>' +
        '</ul>' +
      '</div>'
    );
  }

  /* ВЕРСИЯ ЭТОЙ СТРАНИЦЫ (gbppl-panel-8). Те же данные реестра, что
     носила прежняя секция Sandbox, но не списком, а сегментами: у
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

    /* МЕТКА ТЕКУЩЕЙ ВЕРСИИ (gbppl-panel-9). Тон: «блок хороший, но
       для Live нужно явно показывать, что это текущая версия».
       Подчёркивание Blue 400 говорило «выбрано» тем, кто уже знает
       язык сегментов; суффикс говорит это словом. Метка идёт за
       АКТИВНЫМ, а не за Live: текущей бывает и песочница, и тогда
       слово стоит у неё. Суффикс внутри ссылки, потому что он часть
       её имени, а не сосед по ряду. */
    function seg(label, href, current, ready, note) {
      if (!ready) {
        return '<span class="gbsp-seg is-off" title="' + esc(note) + '">' + esc(label) + '</span>';
      }
      return '<a class="gbsp-seg' + (current ? ' is-on' : '') + '" href="' + esc(href) + '"' +
             (current ? ' aria-current="page"' : '') + '>' + esc(label) +
             (current ? '<span class="gbsp-cur">· current</span>' : '') + '</a>';
    }
  }

  /* ПОДВАЛ (gbppl-panel-8): строка состояния и копия ссылки. Держится
     одним узлом, потому что все секции, которые страница дописывает
     позже (Mode, Device, This page), встают ПЕРЕД ним. Сегмент Layout
     стоял здесь же и ушёл с Classic (gbppl-panel-10). */
  function footHtml() {
    return (
      '<div class="gbsp-foot">' +
        '<p class="gbsp-status"></p>' +
        '<button class="gbsp-link gbsp-copy" type="button">Copy link to this view</button>' +
      '</div>'
    );
  }

  var TEMPLATE = function (root, pageId) {
    var body = navSection(root) +
               versionSection(pageId, root) +
               footHtml();
    return (
      '<div class="gbsp gbsp--v2 is-collapsed">' +
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
     хвостом, а хвост — подвал ящика. */
  function tail(host) {
    return host.querySelector('.gbsp-foot');
  }

  /* ПОРЯДОК ДОПИСАННЫХ СЕКЦИЙ ДЕРЖИТСЯ РАНГОМ (gbppl-comments-b).
     То же правило, по которому внутри секции стоят группы сегментов
     (gbppl-panel-7): кто объявляется раньше, зависит от порядка
     скриптов и от промисов, а порядок на экране обязан быть один на
     всех страницах. Ранги: Mode и Device 10, Comments 20, This page
     90 — сначала «чем смотрю», потом «что здесь сказано», потом «что
     покрутить». Подвал остаётся последним всегда. */
  function placeSection(host, sec, rank) {
    sec.setAttribute('data-rank', String(rank));
    var panel = host.querySelector('.gbsp-panel');
    var before = tail(host);
    var kin = panel.querySelectorAll('.gbsp-sec[data-rank]');
    for (var i = 0; i < kin.length; i++) {
      if ((+kin[i].getAttribute('data-rank') || 0) > rank) { before = kin[i]; break; }
    }
    panel.insertBefore(sec, before);
    return sec;
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
    /* gbppl-panel-8: не в самый конец, а перед хвостом — подвал ящика
       стоит последним всегда. gbppl-comments-b: место теперь считает
       общий рангоукладчик, число то же самое (последней из секций). */
    return placeSection(host, sec, 90);
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
    /* Инструменты стоят ПОСЛЕ навигации и версии страницы
       (gbppl-panel-8): сначала «где я и что смотрю», потом «чем
       смотрю». */
    return placeSection(host, sec, 10);
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
    /* gbppl-panel-11: в каких режимах группу видно. Не объявили —
       видно всегда, как было у всех групп до этой волны. */
    if (spec.when) wrap.setAttribute('data-when', spec.when);
    var title = spec.title || 'Mode';
    var shape = spec.row ? ' gbsp-segs--row' : '';
    /* Девайсы стоят одной строкой ИКОНОК (gbppl-panel-9), и тогда
       имя с числом живут в title и во всплывающей подписи под
       строкой: у кнопки без слова обязано быть слово где-то ещё.
       У режима слово своё, и глифа ему не нужно. */
    function segHtml(o, i) {
      return '<button class="gbsp-seg' + (o.icon ? ' gbsp-seg--icon' : '') +
             '" type="button" data-seg="' + i + '"' +
             (o.title ? ' title="' + esc(o.title) + '"' : '') +
             (o.icon && o.title ? ' aria-label="' + esc(o.title) + '"' : '') +
             ' aria-pressed="false">' + (o.icon || esc(o.label)) +
             '</button>';
    }
    var html = '<span class="gbsp-eyebrow">' + esc(title) + '</span>' +
               '<div class="gbsp-segs' + shape + '"' +
               ' role="group" aria-label="' + esc(title) + '">';
    options.forEach(function (o, i) { html += segHtml(o, i); });
    /* ТРЕТЬЯ ПОЗИЦИЯ MODE ОЖИЛА (gbppl-comments-b, 28.08). С panel-8
       здесь стоял выключенный сегмент «Comment» с подписью coming
       soon: тумблер честно показывал, на сколько положений он
       рассчитан, пока третьего режима не было. Теперь он есть, и
       ставит его не панель, а его владелец — system\components\
       comments.js через addOption ниже. Панель по-прежнему владеет
       ВИДОМ и МЕСТОМ (gbppl-panel-6): форма сегмента, его порядок в
       ряду и правило взаимоисключения остались здесь, а поведение
       ушло туда же, куда ушло поведение View и Inspect.

       Страница без comments.js получает тумблер из двух положений и
       не врёт про третье. */
    html += '</div>';
    /* ВСПЛЫВАЮЩАЯ ПОДПИСЬ ПОД СТРОКОЙ (gbppl-panel-9). Строка иконок
       молчалива, и молчание лечится не только тултипом системы:
       подпись под рядом называет то, на что смотрит курсор, а в
       покое — то, что включено. Появляется только у групп, которые
       её попросили; у Mode её нет и не должно быть. */
    if (spec.caption) html += '<p class="gbsp-cap"></p>';
    html += '<p class="gbsp-note"></p>';
    wrap.innerHTML = html;

    var row    = wrap.querySelector('.gbsp-segs');
    var segEls = wrap.querySelectorAll('[data-seg]');
    var noteEl = wrap.querySelector('.gbsp-note');
    var capEl  = wrap.querySelector('.gbsp-cap');
    var current = spec.value;

    /* В покое подпись ПУСТА, и это нарочно: что включено, уже сказано
       подчёркиванием сегмента и строкой состояния внизу ящика, а
       третий раз то же самое — шум. Тон просил имя и размер «на
       наведении», подпись отвечает ровно на наведение. Место под
       строку держится всегда (min-height в css), поэтому ряд под ней
       не прыгает. */
    function paintCap(o) {
      if (capEl) capEl.textContent = o ? (o.title || o.label) : '';
    }

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
      paintCap(null);
    }

    if (capEl) {
      /* Мышь и клавиатура спрашивают одно и то же, поэтому отвечает
         одна функция: наведение и фокус называют цель, уход и потеря
         фокуса возвращают подпись к включённому. */
      var over = function (e) {
        var b = e.target.closest ? e.target.closest('[data-seg]') : null;
        if (b) paintCap(options[+b.getAttribute('data-seg')]);
      };
      wrap.addEventListener('mouseover', over);
      wrap.addEventListener('focusin', over);
      wrap.addEventListener('mouseleave', function () { paintCap(null); });
      wrap.addEventListener('focusout', function () { paintCap(null); });
    }

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-seg]') : null;
      if (!btn || !wrap.contains(btn)) return;
      var o = options[+btn.getAttribute('data-seg')];
      if (!o || o.value === current) return;
      current = o.value;
      paint();
      /* Позиция, дописанная другим владельцем, несёт СВОЁ поведение
         (gbppl-comments-b): у тумблера Mode с этой волны два хозяина,
         и группа не решает за них. Нет своего — отвечает хозяин
         группы, как было. */
      if (typeof o.onChange === 'function') o.onChange(o.value, o);
      else if (typeof spec.onChange === 'function') spec.onChange(o.value, o);
    });

    var before = null, kin = sec.querySelectorAll('.gbsp-seggroup');
    for (var q = 0; q < kin.length; q++) {
      if ((+kin[q].getAttribute('data-rank') || 50) > rank) { before = kin[q]; break; }
    }
    sec.insertBefore(wrap, before);
    paint();
    dress();

    /* Номер позиции по значению: сегменты дописываются позже
       (addOption), и владелец режима знает своё value, а не индекс. */
    function indexOf(value) {
      for (var k = 0; k < options.length; k++) if (options[k].value === value) return k;
      return -1;
    }

    return {
      element: wrap,
      setActive: function (value) { current = value; paint(); },
      /* СЧЁТ НА ПОЗИЦИИ ТУМБЛЕРА (gbppl-panel-11). Тон: «когда есть
         комментарии, на иконке нужен бейдж с количеством новых
         (непрочитанных) комментариев, чтобы я сразу это видел».

         Бейдж не свой: это Count badge системы (--count-badge-*, тот
         же, что на корзине хедера), переложенный на тёмное в
         studio-panel.css. Панель ставит ЧИСЛО и ничего про него не
         знает: что считать новым — вопрос владельца режима.

         Ноль значит «бейджа нет»: пустой кружок сказал бы, что
         что-то есть, и был бы неправ. */
      setBadge: function (value, n) {
        var i = indexOf(value);
        if (i < 0) return this;
        var btn = wrap.querySelector('[data-seg="' + i + '"]');
        if (!btn) return this;
        var b = btn.querySelector('.gbsp-badge');
        n = Math.max(0, parseInt(n, 10) || 0);
        /* Счёт добавляет ряду 24px (16 бейджа и 8 отступа), а ящик их
           не отдаёт: замер 28.08 на 1280 — ряду Mode нужно 204.5 при
           199 доступных, и слово Comment ломалось на две строки.
           Ряд СО СЧЁТОМ встаёт на ступень 8 вместо 16 (188.5, с
           запасом); без счёта всё остаётся как было. */
        if (row) row.classList.toggle('has-badge', !!n);
        if (!n) {
          if (b) b.remove();
          /* Метка уходит вместе с числом; у сегмента-глифа своя
             (имя и размер экрана), её не трогаем. */
          if (!options[i].icon) btn.removeAttribute('aria-label');
          return this;
        }
        if (!b) {
          b = document.createElement('span');
          b.className = 'gbsp-badge';
          /* Число читается вслух вместе с именем сегмента, а не
             отдельной цифрой ниоткуда: aria-label на кнопке, сам
             бейдж для читалки молчит (так же, как .gbh-count). */
          b.setAttribute('aria-hidden', 'true');
          btn.appendChild(b);
        }
        b.textContent = n > 99 ? '99+' : String(n);
        /* Третий глиф просит ещё 6px, а их уже нет: «99+» упирается в
           край ряда РОВНО (замер 28.08: 199.13 при 199.11), и слово
           снова ломается. Тогда зазор ряда идёт на половину ступени —
           та же половина, что у ряда девайсов ниже, и по той же
           причине. Случай редкий, правило одно. */
        row.classList.toggle('badge-wide', b.textContent.length > 2);
        btn.setAttribute('aria-label', (options[i].label || value) + ', ' + n + ' unread');
        return this;
      },
      /* gbppl-comments-b. Один тумблер, три положения, два владельца
         поведения: View и Inspect объявляет inspect.js, Comment —
         comments.js, и объявляет он их в разное время (первый ждёт
         whenDefined, второй ждёт первого). Заводить второй ряд
         сегментов было бы вторым тумблером на один вопрос, поэтому
         позиция дописывается в существующий ряд. Возвращает ту же
         ручку: у группы один голос наружу. */
      addOption: function (o) {
        if (!o || !row) return this;
        options.push(o);
        row.insertAdjacentHTML('beforeend', segHtml(o, options.length - 1));
        segEls = wrap.querySelectorAll('[data-seg]');
        paint();
        return this;
      }
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

  /* ============================================================
     ШЕСТЬ ЭКРАНОВ КАРТИНКАМИ (gbppl-panel-9)
     ------------------------------------------------------------
     Тон: «переключение устройств лучше сделать иконками, а не
     числовыми шкалами/размерами. Размеры понятны не всем, а тем же
     копирайтерам тоже нужно удобно проверять, как текст смотрится
     на разных девайсах». Число остаётся, но уходит на второй план:
     в title, во всплывающую подпись под строкой и в полосу над
     кадром, где ему хватает места.

     В system\icons\ подходящих не нашлось: там есть laptop-check
     (ноутбук с галкой, это другой смысл) и phone (трубка со
     звуковыми дугами, «мы вам перезвоним», не мобильный экран).
     Поэтому шесть рисуются здесь, линейными, в манере набора:
     чистый штрих, без заливки, квадратные концы и острые углы.
     Сетка 20 вместо 22.8 у файлов набора — иконка стоит в строке
     12-кегля внутри ящика 232px, и 20 это тот же размер на глаз.
     Цвет не назначается: currentColor, поэтому выбранная синеет
     вместе с подчёркиванием сегмента (Тон-5).

     Различие XL и L — ЧЕСТНОЕ РАЗЛИЧИЕ РАЗМЕРА, а не двух разных
     предметов: один и тот же монитор шире и уже. Оба на подставке,
     ноутбук на своей широкой пяте, планшет и телефон вертикальные
     плашки, Full — окно браузера с полосой заголовка.
     ============================================================ */
  /* gbppl-icon-consumers-1 (28.08). THE SIX DRAWINGS LEFT THIS FILE.
     They live in the icon record now (system/components/icon.js,
     names below), redrawn on the set's grid of 24 at the house
     weight; the console asks for them by name and gets the .gb-icon
     box around them. What the console kept is the MAPPING from a
     preset to a screen, which is its own knowledge and nobody
     else's. A page carrying the console therefore links icon.css and
     runs icon.js BEFORE this file. If it does not, the row still
     works and simply shows no glyph: a missing picture must not take
     the switch down with it. */
  var DICONS = {
    'full': 'browser',
    '2258': 'monitor-wide',
    '1920': 'monitor',
    '1280': 'laptop',
    '768':  'tablet',
    '390':  'phone'
  };

  function deviceIcon(value, size) {
    var name = DICONS[value];
    if (!name || !window.GbIcons || !window.GbIcons.has(name)) return '';
    return window.GbIcons.html(name, size || 20);
  }

  /* Своя ширина и поворот (gbppl-panel-8). Пресеты отвечают
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
    if (/^\d{3,4}$/.test(v)) {
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
     СТРОКА СОСТОЯНИЯ (gbppl-panel-8)
     ------------------------------------------------------------
     Прежде под каждой группой стоял свой абзац подсказки, и на
     странице с инспектором их было сразу два: «The page behaves as it
     does for a visitor» и «The page fills the window, as a visitor
     sees it» — две трети высоты первой секции занимал текст, который
     говорит одно и то же дважды. Вместо них ОДНА строка внизу ящика:
     она отвечает не «что делает эта кнопка», а «что у меня сейчас
     включено», и это единственный вопрос, который читают каждый раз.
     Абзацы секции This page остаются: они говорят про сценарий
     страницы, чего строка состояния сказать не может.
     ============================================================ */
  var STATE = { mode: 'view', device: 'full', comment: false, commentsDown: '', commentsOpen: 0 };

  function statusLine() {
    /* gbppl-comments-b. Comment перебивает пару View / Inspect,
       потому что это тот же тумблер: одно положение зараз. А отказ
       сервиса перебивает всё — режим, в котором нечего сохранить, —
       не то состояние, о котором стоит рапортовать первым. */
    if (STATE.comment && STATE.commentsDown) return STATE.commentsDown;
    /* gbppl-panel-11. В Comment строка говорит про КОММЕНТАРИИ, а не
       про экран: экран из этого режима не переключается, и повторять
       его нечем. Число открытых приносит владелец режима тем же
       событием, каким объявляет сам режим. */
    if (STATE.comment) return 'Comment · ' + STATE.commentsOpen + ' open';
    var mode = STATE.mode === 'inspect' ? 'Inspect' : 'View';
    var d = STATE.device;
    if (d === 'full') return mode + ' · Full window';
    return mode + ' · ' + deviceLabel(d) + ' ' + d + ', page runs inside the frame';
  }

  function paintStatus() {
    var el = document.querySelector('.gbsp-status');
    if (el) el.textContent = statusLine();
  }

  /* ============================================================
     ГАРДЕРОБ ЯЩИКА (gbppl-panel-11)
     ------------------------------------------------------------
     Решение Тона 28.08 целиком в шапке файла. Коротко: у ящика
     теперь две одежды. View и Inspect — «как я смотрю страницу»,
     и там нужен экран; Comment — «что здесь сказано», и там нужен
     список, а экран не переключают вовсе.

     Полка объявляет свои режимы САМА, одной строкой spec.when, и
     панель только гасит лишнее: тогда правило живёт у того, кто
     полку поставил, а панель не заводит таблицы «кто в каком
     режиме», которая назавтра разойдётся с полками.

     Гаснет display'ем, а не opacity: полка, которой нет, не должна
     занимать высоту ящика. Возвращение короткое — та же ступень
     --mo-small, что у шагов и сдвигов; уход мгновенный, как у всякой
     двери (--mo-*-out короче входа, MOTION.md).
     ============================================================ */
  function modeWord() {
    return STATE.comment ? 'comment' : (STATE.mode === 'inspect' ? 'inspect' : 'view');
  }

  function dress() {
    var word = modeWord();
    var kin = document.querySelectorAll('gb-studio-panel [data-when]');
    for (var i = 0; i < kin.length; i++) {
      var want = (' ' + kin[i].getAttribute('data-when') + ' ').indexOf(' ' + word + ' ') > -1;
      var was = !kin[i].classList.contains('is-away');
      kin[i].classList.toggle('is-away', !want);
      /* Анимация ставится ЗАНОВО только на настоящем возвращении:
         повесить класс на уже стоящую полку значило бы моргать ею на
         каждом событии режима (а gbc:mode прилетает и при загрузке
         списка). */
      if (want && !was) {
        kin[i].classList.remove('is-arriving');
        void kin[i].offsetWidth;
        kin[i].classList.add('is-arriving');
      }
    }
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
      return u.href;
    } catch (e) {
      return location.href;
    }
  }

  /* Адрес ЭТОГО вида: страница, экран и режим (gbppl-panel-8).
     Ключ device ставится только когда он что-то значит, mode — только
     когда включён Inspect: ссылка не должна нести умолчаний, иначе
     нельзя отличить «я так выбрал» от «так вышло». */
  function viewUrl() {
    try {
      var u = new URL(location.href);
      if (STATE.device && STATE.device !== 'full') u.searchParams.set('device', STATE.device);
      else u.searchParams.delete('device');
      /* gbppl-comments-b: три положения тумблера, один ключ. Comment
         стоит первым, потому что он и на экране перебивает пару. */
      if (STATE.comment) u.searchParams.set('mode', 'comment');
      else if (currentMode() === 'inspect') u.searchParams.set('mode', 'inspect');
      else u.searchParams.delete('mode');
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
     ВЕРХНЯЯ ПОЛОСА СЦЕНЫ (gbppl-panel-8)
     ------------------------------------------------------------
     Пресеты живут и в ящике, но чтобы сменить там экран, надо открыть
     консоль, попасть в чип и закрыть консоль обратно. Как только
     страница ушла в кадр, экран становится главным предметом на
     столе, и место его переключателя — над кадром, а не в выдвижном
     ящике. Полоса стоит В ТЕХ ЖЕ 88px, что
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
    /* gbppl-panel-9: тот же глиф, что в ящике, и рядом с ним имя с
       размером — в полосе для них место есть, и здесь они говорят
       вслух то, что в ящике приходится наводить. */
    var presets = DEVICES.map(function (d, i) {
      var label = d.value === 'full' ? 'Full window' : d.label + ' ' + d.sub;
      return '<button class="gbsp-tb__seg" type="button" data-tb="' + d.value + '"' +
             ' aria-pressed="false">' + deviceIcon(d.value, 16) +
             '<span>' + esc(label) + '</span></button>';
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
    var stage = null, screen = null, handle = null, bar = null;

    handle = makeSegments(host, {
      title: 'Device',
      rank: 2,
      /* gbppl-panel-11, решение Тона 28.08: «режим комментариев:
         нужна только секция комментариев, панель выбора девайсов не
         нужна». Гаснет ТОЛЬКО переключатель: сцена, если она уже
         стоит, остаётся стоять, и полоса над кадром продолжает
         работать — иначе из кадра было бы некуда выйти. */
      when: 'view inspect',
      /* Одна строка ИКОНОК, имя и размер уходят в title и в подпись
         под строкой (gbppl-panel-9) — ряд читается как одна шкала от
         окна до телефона, а не как таблица чисел. */
      row: true,
      caption: true,
      value: current,
      options: DEVICES.map(function (d) {
        return {
          label: d.value === 'full' ? 'Full' : d.sub,
          icon: deviceIcon(d.value),
          value: d.value,
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
            '<iframe class="gbsp-screen" title="The page at the chosen device width"></iframe>' +
          '</div>';
        /* СЦЕНА СТОИТ ВНУТРИ <gb-studio-panel>, А НЕ В BODY
           (gbppl-studio-tokens-1, 27.08). Хозяин display: contents,
           поэтому раскладке всё равно, где лежит fixed-элемент, а
           каскаду не всё равно: на вендорном каталоге --space-8/16/24
           на :root принадлежат бандлу (32/64/96 против наших 8/16/24,
           ловушка 7б), и шкала возвращается нашим компонентам списком
           островов, в котором есть gb-studio-panel и нет body. Стоя в
           body, сцена читала чужие числа: поле сверху 68 вместо 44,
           зазор и поля верхней полосы 64 вместо 16 (замер 27.08 на
           live/catalog/?device=768). Внутри острова числа свои на
           любой странице. */
        (host || document.body).appendChild(stage);
        screen = stage.querySelector('.gbsp-screen');
        screen.addEventListener('load', function () {
          measure();
          relay();
          /* gbppl-comments-b: кадр приезжает позже подписки, и оба
             режима догоняют его здесь, одним движением. */
          relayComment(window.GbComments && window.GbComments.on());
        });
        screen.src = frameSrc();
        buildBar();
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
      if (stage) { stage.remove(); stage = null; screen = null; bar = null; }
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

    /* Тот же провод для третьего режима (gbppl-comments-b). Пересылка,
       а не решение: панель не знает, что такое комментарий, она знает
       только, что у кадра и у страницы один тумблер на двоих. */
    function relayComment(on) {
      if (!screen || !screen.contentWindow) return;
      try { screen.contentWindow.postMessage({ gbsp: 'cmode', on: !!on }, '*'); } catch (e) {}
    }
    document.addEventListener('gbc:mode', function (e) {
      relayComment(e.detail && e.detail.on);
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
      /* gbppl-comments-b, тот же довод и та же защита от петли:
         сравнение с живым состоянием владельца, не с хранилищем,
         которое кадр делит с вкладкой. */
      if (d.gbsp === 'cmode-up' && window.GbComments && window.GbComments.on() !== !!d.on) {
        window.GbComments.setMode(!!d.on);
      }
    });

    apply(current, false);
    return { apply: apply, value: function () { return current; } };
  }

  /* ============================================================
     КЛАВИШИ (gbppl-panel-8)
     ------------------------------------------------------------
     i уже переключал режим (inspect.js, gbppl-inspect-1), Esc уже
     закрывал дровер и консоль. К ним добавлен ряд 1..6 на экраны —
     те же шесть чипов, что в ящике, в том же порядке, 1 = Full. Ни
     одна не срабатывает, пока курсор в поле или зажат модификатор:
     клавиша-одиночка в тексте — это буква.

     Внутри кадра клавиши слышит копия консоли, и она передаёт их
     наружу тем же способом, каким наружу уходит режим.
     ============================================================ */
  function typingIn(t) {
    return !!(t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' ||
                    t.tagName === 'SELECT' || t.isContentEditable));
  }

  function wireKeys(device) {
    document.addEventListener('keydown', function (e) {
      if (typingIn(e.target) || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      /* gbppl-panel-11: в режиме комментариев экран не переключается
         ни сегментом, ни клавишей. Ряд цифр — тот же переключатель,
         только с клавиатуры, и молчать он обязан вместе с ним. */
      if (STATE.comment) return;
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
    /* gbppl-comments-b: третий режим ходит по тому же проводу. */
    document.addEventListener('gbc:mode', function (e) {
      var on = !!(e.detail && e.detail.on);
      try { window.parent.postMessage({ gbsp: 'cmode-up', on: on }, '*'); } catch (err) {}
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

    /* СВОЯ ПОЛКА ЯЩИКА (gbppl-comments-b). addGroup кладёт группу в
       секцию «This page», и это правильное место для переключателей
       страницы: сценарий чекаута, шапка портала. Список комментариев
       страницы — не переключатель, у него свой заголовок и своё место
       в порядке чтения ящика, поэтому владелец режима просит СЕКЦИЮ, а
       не группу. Панель по-прежнему решает, где она встанет: ранг тут,
       а не у просящего.

         var sec = panel.addSection({ title: 'Comments on this page',
                                      rank: 20 });
         sec.body.innerHTML = ...;      // мебель ящика, .gbsp-*

       Возвращает { element, body }: element — сама полка с подписью,
       body — пустой узел под содержимое, чтобы подпись нельзя было
       затереть, переписав внутренности. */
    /* ГДЕ МЫ СТОИМ, ОДНИМ ОТВЕТОМ (gbppl-comments-b). Путь страницы
       от корня студии консоль считает и так — им подсвечивается
       раздел и им берётся имя из PLACES. Комментарий адресуется тем
       же путём (спека §5, page), и второй ответ на тот же вопрос
       разошёлся бы с первым на первой же странице-папке:
       live/catalog/ и live/catalog/index.html — одно место. */
    place() {
      return relHere(this.getAttribute('data-root') || '');
    }

    addSection(spec) {
      if (!this.__rendered) this.connectedCallback();
      spec = spec || {};
      var sec = document.createElement('div');
      sec.className = 'gbsp-sec' + (spec.className ? ' ' + spec.className : '');
      sec.innerHTML = '<span class="gbsp-eyebrow">' + esc(spec.title || '') + '</span>' +
                      '<div class="gbsp-secbody"></div>';
      /* gbppl-panel-11: полка может жить не во всех режимах. Спросили
         — панель гасит её сама, по событиям режима; не спросили —
         стоит всегда, как стояла. */
      if (spec.when) sec.setAttribute('data-when', spec.when);
      placeSection(this, sec, typeof spec.rank === 'number' ? spec.rank : 50);
      dress();
      return { element: sec, body: sec.querySelector('.gbsp-secbody') };
    }

    /* СЧЁТ НА ЯРЛЫКЕ (gbppl-panel-12). Тон, 28.08: «думаю можно счёт
       и там».

       Второго счёта не заводим: число приносит тот же вызов, что
       красит сегмент (comments.js, paintBadge), и владелец режима у
       него один. Панель добавляет к числу единственное своё знание —
       ОТКРЫТ ЛИ ЯЩИК: пока он открыт, счёт стоит на позиции Comment,
       и повторять его на ярлыке значило бы сказать одно и то же
       дважды в двух сантиметрах друг от друга. Поэтому число здесь
       помнится, а рисуется по состоянию ящика: setOpen зовёт ту же
       кисть. */
    setTabBadge(n) {
      if (!this.__rendered) this.connectedCallback();
      this.__tabCount = Math.max(0, parseInt(n, 10) || 0);
      paintTabBadge(this);
      return this;
    }

    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      var root = this.getAttribute('data-root') || '';
      this.innerHTML = TEMPLATE(root, this.getAttribute('page'));

      var shell = this.querySelector('.gbsp');
      var tab   = this.querySelector('.gbsp-tab');
      var host  = this;

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
        /* Ящик помнится между страницами (gbppl-panel-8): за один
           проход по прототипу консоль открывают по десять раз, и
           каждый раз она встречает закрытой. Память вкладки, не
           навсегда: это состояние работы, а не настройка. */
        try { sessionStorage.setItem(OKEY, open ? '1' : '0'); } catch (e) {}
        /* gbppl-panel-12. Счёт на ярлыке принадлежит ЗАКРЫТОМУ ящику:
           открыли — он уходит на позицию Comment, закрыли — вернулся.
           Кисть одна и та же, и метку ярлыка она дописывает после
           базовой, поставленной строкой выше. */
        paintTabBadge(host);
      }

      tab.addEventListener('click', function () {
        setOpen(shell.classList.contains('is-collapsed'));
      });

      var saved = null;
      try { saved = sessionStorage.getItem(OKEY); } catch (e) {}
      if (saved === '1') setOpen(true);
      watchTab(shell);

      /* Escape закрывает — тот же жест, что у меню хедера. Очередь
         честная: сначала дровер пропертиз, потом ящик
         (gbppl-panel-8). */
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape' || shell.classList.contains('is-collapsed')) return;
        if (document.querySelector('.gbd-panel.is-open')) return;
        /* Один Esc — одно закрытие. Слушателей на этой клавише трое
           (дровер, консоль, прибор), все на document, и наш висит
           первым: без остановки цепочки один нажим и закрывал ящик, и
           выводил из Inspect (замер 27.08). */
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        setOpen(false);
        tab.focus();
      });

      wireFoot(this);
    }
  }

  /* ============================================================
     ЯРЛЫК: ТИШЕ И НЕ ПОПЕРЁК ДОРОГИ (gbppl-panel-8)
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

  /* ------------------------------------------------------------
     СЧЁТ НА ЯРЛЫКЕ (gbppl-panel-12, Тон 28.08: «думаю можно счёт и
     там»)
     ------------------------------------------------------------
     Ярлык — единственное, что видно у закрытой консоли, и в закрытом
     виде она стоит почти всё время. Бейдж сегмента отвечал только
     тому, кто уже открыл ящик; здесь он отвечает тому, кто мимо
     проходит.

     ТРИ ПРАВИЛА, И ВСЕ ТРИ ОТ МЕСТА:
     1. Только при закрытом ящике. Открытый ящик показывает счёт на
        позиции Comment, и два одинаковых числа рядом — не забота, а
        шум.
     2. Ноль снимает бейдж совсем, как и у сегмента: пустой кружок
        сказал бы, что что-то есть.
     3. В кадре девайса ярлыка нет вовсе (консоль там погашена),
        значит и красить нечего: наружный ярлык считает ту же
        страницу и говорит за обоих.

     Число сюда приносит владелец режима тем же вызовом, что красит
     сегмент. Панель не знает, что считать новым, и не заводит своего
     счёта. */
  function paintTabBadge(host) {
    var shell = host.querySelector('.gbsp');
    var tab   = shell && shell.querySelector('.gbsp-tab');
    if (!shell || !tab || shell.classList.contains('is-embedded')) return;

    var n    = host.__tabCount || 0;
    var show = n > 0 && shell.classList.contains('is-collapsed');
    var b    = tab.querySelector('.gbsp-badge');

    shell.classList.toggle('has-tab-badge', show);
    if (!show) {
      if (b) b.remove();
      return;
    }
    if (!b) {
      b = document.createElement('span');
      b.className = 'gbsp-badge gbsp-badge--tab';
      /* Число читается вслух меткой кнопки, а не отдельной цифрой
         ниоткуда — то же правило, что у бейджа сегмента и у
         .gbh-count корзины. */
      b.setAttribute('aria-hidden', 'true');
      tab.insertBefore(b, tab.firstChild);
    }
    b.textContent = n > 99 ? '99+' : String(n);
    tab.setAttribute('aria-label',
      'Open the Design Studio panel, ' + n + ' unread ' +
      (n === 1 ? 'comment' : 'comments'));
  }

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
     ПОДВАЛ: КОПИЯ ССЫЛКИ И СОСТОЯНИЕ (gbppl-panel-8)
     ------------------------------------------------------------
     Copy link отвечает на просьбу, которая до сих пор решалась
     диктовкой в чат: «покажи мне то же самое». Ссылка несёт страницу,
     экран и режим, то есть весь вид целиком, и её можно просто
     вставить.
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

    STATE.mode = currentMode();
    paintStatus();
    dress();
    document.addEventListener('gbi:mode', function (e) {
      STATE.mode = e.detail && e.detail.mode === 'inspect' ? 'inspect' : 'view';
      paintStatus();
      dress();
    });
    /* gbppl-comments-b. Третий режим и его беда приходят одним
       событием: включён ли Comment и есть ли кому отвечать. Строка
       состояния — единственное место консоли, которое произносит
       «Comments unavailable»: отказ сервиса это состояние вида, а не
       ошибка страницы, и в консоль браузера ему ходить незачем. */
    document.addEventListener('gbc:mode', function (e) {
      var d = e.detail || {};
      STATE.comment = !!d.on;
      STATE.commentsDown = d.down ? String(d.down) : '';
      /* gbppl-panel-11: сколько на странице открытых. Приходит тем же
         событием, потому что это то же самое состояние режима, и
         второго провода ради одного числа заводить незачем. */
      STATE.commentsOpen = Math.max(0, parseInt(d.open, 10) || 0);
      paintStatus();
      dress();
    });
  }
  if (!customElements.get('gb-studio-panel')) {
    customElements.define('gb-studio-panel', GbStudioPanel);
  }
})();
