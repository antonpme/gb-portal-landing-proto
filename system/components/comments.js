/* ============================================================
   SYSTEM COMPONENT: COMMENT MODE (gbppl-comments-b, 2026-08-28)
   ------------------------------------------------------------
   Тон, 27.08, заказом: «комментарий принадлежит объекту (строке
   текста, элементу); видно, кто оставил; на комментарии можно
   отвечать, мини-диалог». Спека целиком:
   studio\docs\COMMENT-MODE-SPEC.md (v0.1, разделы 4-7).

   ЧТО ЭТО. Третий режим консоли, рядом с View и Inspect. Наведение
   называет элемент теми же словами, что Inspect; клик ставит на него
   булавку; булавка открывает тред в системном дровере; список тредов
   страницы стоит полкой в ящике консоли. Записи живут в сервисе
   gb-comments (волна A, тот же общий код гейта в заголовке
   X-GB-Code), а не в браузере: комментарий, который видит только его
   автор, это не комментарий.

   ЧЕГО ЗДЕСЬ НЕТ И ПОЧЕМУ. Ни одной строки распознавания: чем
   является элемент, какой файл им владеет и что писать на плашке,
   отвечает system\components\inspect.js, и отвечает ОДИН раз
   (Тон-6). Волна добавила ему шесть публичных методов (target,
   isChrome, outline, outlineOff, lede, onModeSwitch) вместо того,
   чтобы завести здесь вторую таблицу COMPONENTS, которая назавтра
   разойдётся с первой.

   Ни одной строки вида тумблера: сегмент Comment дописывается в
   существующий ряд Mode через panel.addSegments(...).addOption, и
   форма сегмента остаётся у панели (gbppl-panel-6). Ни одной строки
   дровера: тред пишется в тот же <gb-drawer>, что и пропертиз,
   потому что дровер — поверхность, и второй экземпляр значил бы две
   панели, стакающиеся друг на друга.

   ГДЕ ЖИВЁТ СЛОЙ БУЛАВОК. Внутри <gb-studio-panel>, а не в body —
   ловушка 19 скилла, дословно: «любой новый слой студии (сцена,
   будущие булавки и треды Comment, тосты) монтируется внутрь
   <gb-studio-panel> (у него display: contents) или другого острова
   со шкалой». На вендорном каталоге --space-* на :root принадлежат
   бандлу, и слой, подвешенный в body, читал бы чужие числа.

   ВОЛНА C (gbppl-comments-c, 28.08). Провод дотянут до шестнадцатой
   страницы — sandboxes.html, единственная с консолью, но без режима;
   копи-линт видимых строк: подпись булавок сокращена до «Show pins»
   (Тон просил коротко; сам переключатель снят в gbppl-panel-11, см.
   ниже), строка сироты сведена к двум фразам.

   ------------------------------------------------------------
   THE DRAWER GETS DRESSED (gbppl-comments-dress-1, 01.09)
   ------------------------------------------------------------
   Ton, on a screenshot of this very drawer: «Drawer с комментами
   выглядит каким-то немножечко кривым. Переключение модов, вот этот
   note | suggest text, выглядит тоже странным. Окно input-текста
   (free text), по-моему, тоже какое-то кривоватое вообще глобально в
   системе.»

   THREE THINGS MOVED, AND NOT ONE OF THEM IS A NEW DRAWING.

   1. ONE FIELD VOICE INSTEAD OF TWO. The form wore
      .gba-field--floating, the variant of the LIVE LEAD FORM, and
      that variant has two labels by construction: the single line
      one floats inside the box (11.2 / 300, no caps) and the
      multiline one stands above it (12 / 600, ls 1.44). Two voices
      in a form of two fields is the crookedness itself, and it
      cannot be fixed inside that variant without inventing a fifth
      face of the field. So the drawer wears THE DEFAULT FIELD, the
      one the login drawer and the checkout drawers already wear:
      Eyebrow label above, underline below, 14 / 16 / 18 in 48 / 56 /
      64. The argument the earlier wave used for the floating one —
      «it stands beside the live lead form» — was never true here: a
      thread drawer is studio furniture and never opens beside a
      booking form. Тон-14: студия живёт на системе строже
      прототипов.

      The floating variant also has nowhere to rise in this column.
      Its raised label sits at top -4, and in a lead form each field
      has 24 to 40 of margin above it; here the rhythm is 24 and the
      raised label came out 3.6px under the line of running text
      above it. Measured, not guessed (before / after in the report).

   2. NOTE | SUGGEST TEXT IS A TOGGLE NOW. It was .gbdoc-seg, the
      underlined segment of the documentation, and between two
      underlined fields it read as a link rather than a choice. Two
      short values is the toggle by the canon of axes (window.ORO_AXES
      in system/oro/oro.js: 2..4 short values -> .gb-toggle), and the
      house has had the component since 29.08. The size is S and the
      track HUGS its two words: --fill across 472 makes the black
      half the loudest thing in the drawer, and this control is not
      the business of the form, the Post button is.

      NO SECOND TAB STOP IS DEMANDED OF THE PAGE. The markup keeps
      aria-pressed, which toggle.js reads as a legal spelling of the
      same control, so the switch works on a page that carries only
      toggle.css and gains the arrow keys and the roving tab stop
      wherever toggle.js is loaded too.

   3. THE COLUMN. Everything in the drawer starts on one edge now:
      the sub, the lede, the labels, the text inside the fields, the
      button and the hint. See comments.css, THE ONE COLUMN — and the
      measurement of the system-wide version of the same defect,
      which is Ton's call and not this wave's.

   ------------------------------------------------------------
   AND THEN IT HAD TO BE HITTABLE (gbppl-comments-hitbox-1, 01.09)
   ------------------------------------------------------------
   Ton, live in front of the client, on the drawer he had just had
   dressed: «Тыкал по полям, но туда ничего не нажимается —
   практически невозможно попасть курсором в input. Что-то с инпутами
   явно не то. Особенно в этот text field: вообще не понимаю, куда
   там целиться.» And, in the same breath: «Не могу нормально навести
   курсор на кнопку Resolve. Навожу, а стрелочка часто остаётся
   обычной, не меняется на pointer.»

   Three faults, none of them in the organisms it borrows, all three
   measured with a grid of dispatched mouse events before a line was
   written (map before and after in the wave report):

   1. AN EIGHT PIXEL DEAD BAND under every label, this file's own
      margin showing through as the wrapper. It swallowed the click
      AND blurred the field, so aiming at the row cost you the field
      you already had. Fixed in comments.css, THE WHOLE ROW IS THE
      FIELD: the gap changes hands from margin to the label's padding
      and the browser's own «a label focuses its control» does the
      rest. 100% of the row hits now, at 390, 1280 and 1920.
   2. NO CARET AND NO POINTER. The Comment cursor rules handed
      `default` to every descendant of the drawer, so a text field
      pointed at itself with an arrow and a button's own label span
      did too. Fixed in comments.css, AND A CONTROL ANSWERS FOR ITS
      OWN INSIDES. button.css was measured and left alone: outside
      this mode the same label reads `pointer` on every page.
   3. THE FREE TEXT FIELD OPENED BIG. Ton: «чтобы она была
      растягиваемой, а не большой по дефолту. Это сразу сбивает,
      непонятно, куда ставить курсор». The empty drawer now stands on
      rows of ONE height — see areaBlock and the .gba-textarea--line
      axis at the owner.

   ------------------------------------------------------------
   ONE POST CLOSES, ONE HOVER READS (gbppl-comments-hover-1, 02.09)
   ------------------------------------------------------------
   Ton, 02.09: «1. Когда сабмитишь коммент, этот drawer с комментом
   должен закрываться, а он почему-то не закрывается. И я бы хотел,
   чтобы комменты было видно по hover: припинили коммент на canvas —
   навести курсор и увидеть, кто что писал, без клика. Как в Figma:
   появляется bubble с текстом коммента, и с большого расстояния, не
   нажимая на каждый, сразу видишь суть.»

   1. THE DRAWER CLOSES ON A NEW THREAD, AND ONLY ON A NEW THREAD.
      Why it did not: the first wave (2216fff) ended the POST with
      `load().then(... openThread(id))`, reusing the open path as a
      way to «show what you just made». It was never a decision —
      spec §4.2 says what Post does and nothing about what happens
      after it — and it read as a failure: the same panel, the same
      title, only the composer had turned into a reply box. Now the
      pin with its number is the receipt, and the page is back.
      A REPLY still leaves the thread open, the way Figma does: the
      composer empties, the conversation stays under the eye, and it
      has to, because the next reply is written while reading it.
      See submit().

   2. THE PIN ANSWERS BEFORE IT IS PRESSED. Hover shows a bubble with
      the head of the first message and its text, clamped to three
      lines; the click still opens the whole thread in the drawer.
      Nothing is asked of touch (0a.4). The whole of it — what it
      says, what it wears, where it flips — is in ПУЗЫРЬ НА ХОВЕРЕ
      below and in comments.css, THE BUBBLE ON HOVER.

   ------------------------------------------------------------
   ПОЛКА ТОЛЬКО В СВОЁМ РЕЖИМЕ, СЧЁТ ВСЕГДА (gbppl-panel-11, 28.08)
   ------------------------------------------------------------
   Тон, 28.08, дословно: «Не логично показывать секцию Comments on
   this page во View mode. Во View я хочу просто смотреть сайт,
   комментарии показывать не нужно, только когда я перехожу в режим
   комментариев... И когда есть комментарии, на иконке нужен бейдж с
   количеством новых (непрочитанных) комментариев, чтобы я сразу это
   видел».

   1. ПОЛКА ОБЪЯВЛЯЕТ РЕЖИМ. addSection получает when: 'comment', и
      дальше её гасит и зажигает панель (studio-panel.js, гардероб).
      Список при этом ЖИВЁТ и в View: он кормит бейдж, и его данные
      нужны раньше, чем полку откроют.
   2. ЧТО СЧИТАЕТСЯ НОВЫМ. Отметка «просмотрено» этой страницы лежит
      в localStorage (SEEN_KEY ниже) и ставится, пока человек в
      режиме Comment: при входе и на каждом обновлении списка. Новое
      — это комментарий или ОТВЕТ с created позже отметки. Отметки
      нет (первый заход в этом браузере) — новыми считаются все
      открытые треды: сказать «0» человеку, который эту страницу
      никогда не открывал, значило бы соврать.
      Отметка в localStorage, а не в sessionStorage, нарочно: «я это
      видел» переживает вкладку, в отличие от «я сейчас в режиме
      комментариев». Отметка своя у каждого браузера и никуда не
      уходит: сервис хранит комментарии, прочитанность — дело того,
      кто читает.
   3. БЕЙДЖ. Ставится ручкой сегмента (handle.setBadge) на позицию
      Comment и виден в View и Inspect. В самом Comment его нет: там
      открыт список, и счёт непрочитанного рядом со списком — это
      счёт того, на что человек прямо сейчас смотрит.
      С gbppl-panel-12 (Тон 28.08: «думаю можно счёт и там») тот же
      вызов кладёт число ВТОРЫМ адресом — панели, `setTabBadge(n)`,
      для ярлыка STUDIO. Счёт по-прежнему ОДИН: считаем здесь, а где
      его показать (ярлык при закрытом ящике, сегмент при открытом),
      решает панель.
   4. «SHOW PINS» СНЯТ. Переключатель показывал булавки в View и
      Inspect; жил он в этой полке, а полка теперь стоит только в
      Comment. Контрол, до которого можно дотянуться лишь оттуда, где
      он ничего не меняет, — ловушка, а не удобство; и булавки поверх
      страницы во View противоречат тому же решению Тона («во View я
      хочу просто смотреть сайт») ровно так же, как сама полка.
      Булавки стали свойством режима: есть режим — есть булавки.
   5. ОДНА ЗАГРУЗКА, НЕ ОПРОС. Список читается один раз при старте и
      потом на возврат фокуса в окно, но не чаще раза в минуту
      (REFRESH_MS): бейдж должен догонять чужие комментарии, а не
      стучать в сервис.

   КАК ПОДКЛЮЧАТЬ (на каждой странице с консолью, ПОСЛЕ inspect.js):

     <link rel="stylesheet" href="../system/components/comments.css">
     ...
     <script src="../system/components/inspect.js"></script>
     <script src="../system/components/comments.js"></script>

   Порядок несущий: этот файл спрашивает у GbInspect тумблер режима
   и распознавание, а у <gb-studio-panel> — полку ящика.

   АДРЕС СЕРВИСА. По умолчанию same-origin: на VPS Caddy отдаёт
   /api/* в контейнер gb-comments (спека §7), и базы у адреса нет.
   Атрибут data-api на <gb-studio-panel> меняет базу — он нужен
   только проверочным прогонам, где сайт стоит на python -m
   http.server, а сервис на другом порту, и проксировать некому.

   КОД ДОСТУПА. Не литерал и не копия: window.GB_STUDIO.code(),
   владелец — system\components\studio.js, значение приходит с
   клавиатуры гейта (см. шапку studio.js). Нет кода или сервис
   молчит — режим работает на чтение того, что уже загружено, форма
   гаснет, строка состояния консоли говорит «Comments unavailable»,
   и в консоль браузера при этом не летит ни одной ошибки: отказ
   сервиса это состояние вида, а не поломка страницы.

   ПРИВЯЗКА (спека §5). Комментарий принадлежит элементу, а не
   пикселю: sel — путь по DOM, kin — та же форма, что печатает
   Inspect (тег с классами), role — имя, которым Inspect его зовёт,
   text — первые 80 символов нормализованного текста, rect — точка
   клика В ДОЛЯХ элемента. Восстановление идёт по sel; не нашли —
   ищем среди kin тот, у кого совпал text; не нашли — запись
   остаётся в списке с пометкой «element moved» и без булавки на
   странице (спека §5, orphan).

   ВО ФРЕЙМЕ ДЕВАЙСА. Тот же провод, что у Inspect (gbppl-panel-7):
   снаружи режим объявляется событием gbc:mode, панель пересылает
   его внутрь postMessage'ом, копия этого файла в кадре слушает
   message. Изнутри наружу — тем же проводом обратно, и обе стороны
   сравнивают значение перед тем, как что-то делать: петли нет.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- ключи ----------
     Режим — состояние вкладки, как у Inspect: то, что человек делает
     сейчас, а не то, что он настроил навсегда. Имя автора — наоборот,
     localStorage: его вводят один раз в браузере (спека, шапка). */
  var MODE_KEY   = 'gbppl-comment-mode';
  var AUTHOR_KEY = 'gbppl-author';
  /* gbppl-panel-11: «я это видел» переживает вкладку, значит
     localStorage; ключ на страницу и версию, потому что и список
     такой же (page + version, см. load). */
  var SEEN_KEY   = 'gbppl-comments-seen:';
  var REFRESH_MS = 60000;  /* не чаще раза в минуту на возврат фокуса */

  var ON = false;          /* режим включён */
  var items = [];          /* треды этой страницы и этой версии */
  var lastLoad = 0;        /* когда список читали в последний раз */
  var filter = 'open';
  var down = '';           /* пусто или строка состояния об отказе */
  var openId = null;       /* тред, открытый в дровере */
  var pending = null;      /* новая булавка: { el, fx, fy } */
  var keepFocus = '';      /* половина тогла, которой вернуть фокус после пересборки */
  var hovered = null;
  var deepLink = null;     /* ?comment=ID, снятый при загрузке */
  var moving = false;      /* мы сами двигаем режим прибора */

  var handle = null;       /* ручка сегментов Mode */
  var shelf = null;        /* полка ящика */
  var layer = null;        /* слой булавок */

  /* ============================================================
     СЛУЖЕБНОЕ
     ============================================================ */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function panelEl() { return document.querySelector('gb-studio-panel'); }

  function ss(key, value) {
    try {
      if (value === undefined) return sessionStorage.getItem(key);
      sessionStorage.setItem(key, value);
    } catch (e) { /* приватное окно */ }
    return null;
  }

  function author(value) {
    try {
      if (value === undefined) return localStorage.getItem(AUTHOR_KEY) || '';
      localStorage.setItem(AUTHOR_KEY, value);
    } catch (e) {}
    return null;
  }

  /* ОТНОСИТЕЛЬНОЕ ВРЕМЯ. Часы в треде читают не для того, чтобы
     узнать дату: вопрос всегда «это свежее или вчерашнее». Точная
     отметка живёт в title строки. */
  function ago(iso) {
    var t = Date.parse(iso);
    if (!t) return '';
    var s = Math.max(0, (Date.now() - t) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s / 60) + ' min ago';
    if (s < 86400) return Math.floor(s / 3600) + ' h ago';
    return Math.floor(s / 86400) + ' d ago';
  }

  function firstLine(c) {
    var t = c.kind === 'suggest' && c.suggestion ? c.suggestion.after : c.body;
    t = String(t || '').replace(/\s+/g, ' ').trim();
    return t.length > 60 ? t.slice(0, 60) + '…' : t;
  }

  /* ============================================================
     АДРЕС ЗАПИСИ: page, version, device (спека §5)
     ============================================================ */

  /* Путь страницы ОТ КОРНЯ СТУДИИ, без студийных ключей. Считает его
     консоль: она и так держит эту таблицу для навигации, и второй
     ответ на тот же вопрос разошёлся бы с первым на первой же
     странице-папке (live/catalog/ против live/catalog/index.html). */
  function pageKey() {
    var p = panelEl();
    if (p && typeof p.place === 'function') return p.place();
    return location.pathname;
  }

  /* СТРОКА ВЕРСИИ. Ключи контекста берутся у их владельца — header.js
     публикует GB_KEEP, где разведены content (что смотрят: v, nav,
     hero, grid, layout, pth, lock, prefooter) и view (как смотрят:
     device, studio). Комментарий принадлежит СОДЕРЖИМОМУ, поэтому
     версию собирает только первый список: одна и та же строка на
     мобильном и на десктопе — это одна и та же строка. */
  function versionKey() {
    var keys = (window.GB_KEEP && window.GB_KEEP.content) || [];
    var have = new URLSearchParams(location.search);
    var out = [];
    keys.forEach(function (k) { if (have.has(k)) out.push(k + '=' + have.get(k)); });
    return out.join('&');
  }

  /* Экран, на котором это написали. Пресет консоли, а внутри кадра,
     когда пресета нет, — измеренная ширина окна кадра. */
  function framed() {
    try { return window.top !== window.self; } catch (e) { return true; }
  }

  function deviceKey() {
    var v = ss('gbppl-device') || 'full';
    if (v === 'full' && framed()) return String(window.innerWidth);
    return v;
  }

  /* СТРАНИЦА, КОТОРАЯ СЕЙЧАС НЕ СТРАНИЦА, А СТОЛ. При выбранном
     пресете консоль накрывает документ сценой, и то, на что смотрят,
     живёт в кадре, а не здесь (gbppl-panel-7). Тогда наш документ
     ничего не показывает и ни на что не отвечает адресом: элемента с
     булавкой в нём нет. */
  function staged() {
    return !framed() && (ss('gbppl-device') || 'full') !== 'full';
  }

  /* ============================================================
     ПРИВЯЗКА К ЭЛЕМЕНТУ (спека §5)
     ------------------------------------------------------------
     Inspect строит короткое имя (тег с классами) для плашки, и оно
     не адрес: на странице таких десятки. Адрес нужен свой, и он
     строится здесь, потому что это вопрос комментария, а не
     измерения. Путь идёт вверх до ближайшего id или до body, каждая
     ступень — тег, до трёх устойчивых классов и nth-of-type.
     Служебные классы состояния (is-*, has-*) и наши собственные в
     путь не попадают: они меняются от наведения, а адрес меняться
     не должен.
     ============================================================ */
  var SKIP_CLASS = /^(is-|has-|gbc-|gbi-|js-)/;

  function stableClasses(el) {
    var out = [];
    var raw = (el.getAttribute && el.getAttribute('class')) || '';
    String(raw).split(/\s+/).forEach(function (c) {
      if (!c || SKIP_CLASS.test(c)) return;
      if (!/^[A-Za-z_-][\w-]*$/.test(c)) return;   /* экзотику в селектор не пишем */
      out.push(c);
    });
    return out.slice(0, 3);
  }

  function step(el) {
    var s = el.tagName.toLowerCase();
    var cls = stableClasses(el);
    if (cls.length) s += '.' + cls.join('.');
    var i = 1, prev = el;
    while ((prev = prev.previousElementSibling)) {
      if (prev.tagName === el.tagName) i++;
    }
    return s + ':nth-of-type(' + i + ')';
  }

  function selOf(el) {
    var parts = [];
    while (el && el.nodeType === 1 && el !== document.body &&
           el !== document.documentElement) {
      if (el.id && /^[A-Za-z][\w-]*$/.test(el.id)) { parts.unshift('#' + el.id); break; }
      parts.unshift(step(el));
      el = el.parentElement;
    }
    return parts.join(' > ');
  }

  /* Та же форма, что печатает Inspect на плашке: тег с классами, без
     nth. Ею ищут элемент, когда путь больше не находит ничего. */
  function kinOf(el) {
    var cls = stableClasses(el);
    return el.tagName.toLowerCase() + (cls.length ? '.' + cls.join('.') : '');
  }

  function textOf(el, full) {
    var t = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
    return full ? t : t.slice(0, 80);
  }

  function anchorFor(el, fx, fy) {
    var d = window.GbInspect ? window.GbInspect.identify(el) : { name: '', owner: {} };
    return {
      sel: selOf(el),
      kin: kinOf(el),
      role: d.name || '',
      owner: (d.owner && d.owner.file) || '',
      text: textOf(el),
      rect: { x: Math.round(fx * 1000) / 1000, y: Math.round(fy * 1000) / 1000 }
    };
  }

  /* ВОССТАНОВЛЕНИЕ (спека §5): сначала путь, потом текст среди своей
     родни, потом ничего — и тогда это orphan, о котором список
     говорит вслух. */
  function resolve(anchor) {
    if (!anchor) return null;
    var el = null;
    if (anchor.sel) {
      try { el = document.querySelector(anchor.sel); } catch (e) { el = null; }
    }
    if (el && !isOurs(el)) return el;
    if (anchor.kin && anchor.text) {
      var kin = [];
      try { kin = document.querySelectorAll(anchor.kin); } catch (e) { kin = []; }
      for (var i = 0; i < kin.length; i++) {
        if (isOurs(kin[i])) continue;
        if (textOf(kin[i]) === anchor.text) return kin[i];
      }
    }
    return null;
  }

  /* Наша собственная мебель адресом комментария быть не может. */
  function isOurs(el) {
    return !!(el && el.closest && el.closest('gb-studio-panel, .gbsp, .gbsp-stage, .gbd-panel, .gbd-scrim, .gbi-layer, .gbc-layer'));
  }

  /* ============================================================
     СЕРВИС (спека §7)
     ------------------------------------------------------------
     Same-origin, JSON, код гейта в заголовке на каждом запросе.
     Единственная функция, которая ходит наружу, и единственное
     место, где рождается состояние «сервис молчит»: отказ ловится
     здесь и превращается в строку, а не в исключение.
     ============================================================ */
  function apiBase() {
    var p = panelEl();
    return (p && p.getAttribute('data-api')) || '';
  }

  function code() {
    return (window.GB_STUDIO && window.GB_STUDIO.code()) || '';
  }

  function call(method, path, body) {
    var key = code();
    if (!key) {
      return Promise.reject(new Error('no code'));
    }
    var opts = {
      method: method,
      headers: { 'X-GB-Code': key },
      cache: 'no-store'
    };
    if (body) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    return fetch(apiBase() + path, opts).then(function (res) {
      if (!res.ok) throw new Error('http ' + res.status);
      return res.status === 204 ? null : res.json();
    });
  }

  /* ДВЕ РАЗНЫЕ БЕДЫ, ДВЕ РАЗНЫЕ ПОДПИСИ (gbppl-comments-c, 28.08; Тон
     по скрину дровера: «Странно выглядит и работает наш компонент
     FreeText» — форма стояла живой над мёртвой кнопкой и молча
     принимала текст, которому некуда деться). Нет кода гейта или
     сервис его не принял — это дело поправимое человеком, и подпись
     говорит, что нажать. Сеть или сервис молчат — поправить нечего,
     и подпись говорит только это. Строка состояния консоли и счётчик
     полки остаются короткими: они рапортуют СОСТОЯНИЕ, а что делать
     говорят там, где делают, — под кнопкой. */
  var SAY = {
    code: 'Comments need the studio code. Press LOCK and sign in once.',
    net:  'Comments are offline right now.'
  };

  function why(err) {
    var m = (err && err.message) || '';
    return (m === 'no code' || /\b40[13]\b/.test(m)) ? 'code' : 'net';
  }

  function fell(err) {
    down = why(err);
    announce();
    paintShelf();
    paintPins();
    dress();
  }

  /* Сервис ответил — форма оживает сама, без перезагрузки, если она
     сейчас открыта и стоит запертой. Дёшево: перерисовать тот же
     дровер тем же вызовом, который его открыл. */
  function rose() {
    if (!down) return;
    down = '';
    announce();
    if (document.querySelector('.gbc-form.is-down')) reopenSame(null);
  }

  function load() {
    return call('GET', '/api/comments?page=' + encodeURIComponent(pageKey()) +
                       '&version=' + encodeURIComponent(versionKey()))
      .then(function (data) {
        items = (data && data.comments) || [];
        lastLoad = Date.now();
        rose();
        paintShelf();
        paintPins();
        /* gbppl-panel-11. Список, который сейчас показали, и есть
           «просмотрено»: отметка ставится в режиме Comment, при входе
           в него и на каждом обновлении. Сначала отметка, потом
           бейдж, иначе бейдж посчитал бы то, что человек уже видит. */
        if (ON) markSeen();
        paintBadge();
        /* Число открытых уехало в строку состояния консоли тем же
           событием, каким объявляется режим. */
        announce();
        if (deepLink) {
          var want = deepLink;
          deepLink = null;
          openThread(want, true);
        }
        return items;
      })
      .catch(fell);
  }

  /* ============================================================
     СЛОЙ БУЛАВОК
     ------------------------------------------------------------
     Ловушка 19: слой стоит ВНУТРИ <gb-studio-panel>. z 56 — над
     оверлеем прибора (55), под сценой девайсов (58), консолью (60)
     и дровером (80): булавку видно поверх страницы и она никогда не
     закрывает то, чем её выключают.
     ============================================================ */
  function makeLayer() {
    if (layer && layer.isConnected) return layer;
    layer = document.createElement('div');
    layer.className = 'gbc-layer';
    var host = panelEl() || document.body;
    host.appendChild(layer);
    layer.addEventListener('click', function (e) {
      var pin = e.target.closest ? e.target.closest('[data-pin]') : null;
      if (!pin) return;
      e.preventDefault();
      e.stopPropagation();
      hideBubble();
      openThread(pin.getAttribute('data-pin'), false);
    });

    /* ХОВЕР ЧИТАЕТ, КЛИК ОТКРЫВАЕТ (gbppl-comments-hover-1, 02.09).
       Слушатели стоят на СЛОЕ, а не на булавке: булавки рождаются
       заново на каждой перерисовке (paintPins), и подписка на каждую
       из них была бы подпиской на объект со сроком жизни в один
       кадр. Тач сюда не заходит ни разу: pointerType и запрос
       (hover: hover) отсекают палец, для которого «навести» не
       существует, и поведение на тач-устройстве остаётся прежним
       (закон 0a.4 — нового жеста не заводим). */
    layer.addEventListener('pointerover', function (e) {
      if (e.pointerType === 'touch' || !canHover()) return;
      var pin = e.target.closest ? e.target.closest('[data-pin]') : null;
      if (!pin) return;
      wantBubble(pin.getAttribute('data-pin'));
    });
    layer.addEventListener('pointerout', function (e) {
      var pin = e.target.closest ? e.target.closest('[data-pin]') : null;
      if (!pin) return;
      if (e.relatedTarget && pin.contains(e.relatedTarget)) return;
      hideBubble();
    });
    return layer;
  }

  /* БУЛАВКИ = СВОЙСТВО РЕЖИМА (gbppl-panel-11). Переключатель «Show
     pins», державший их в View и Inspect, снят вместе с решением
     Тона «во View я хочу просто смотреть сайт»: см. шапку, пункт 4. */
  function pinsVisible() { return ON; }

  function paintPins() {
    if (!pinsVisible() && !layer) return;
    makeLayer();
    /* Пузырь переживает перерисовку: layer.innerHTML его открепляет,
       и в конце функции он возвращается на место у своей булавки,
       уже с новыми координатами. Иначе прокрутка под неподвижным
       курсором гасила бы то, что человек в этот момент читает. */
    layer.innerHTML = '';
    layer.hidden = !pinsVisible();
    if (!pinsVisible()) { hideBubble(); return; }

    items.forEach(function (c, i) {
      var el = resolve(c.anchor);
      if (!el) return;                       /* orphan: живёт только в списке */
      var r = el.getBoundingClientRect();
      if (!r.width && !r.height) return;
      var fx = (c.anchor && c.anchor.rect && c.anchor.rect.x) || 0.5;
      var fy = (c.anchor && c.anchor.rect && c.anchor.rect.y) || 0.5;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'gbc-pin' + (c.status === 'open' ? '' : ' is-done') +
                    (c.id === openId ? ' is-open' : '');
      b.setAttribute('data-pin', c.id);
      b.setAttribute('aria-label', 'Comment ' + (i + 1) + ' by ' + (c.author || 'someone'));
      b.textContent = String(i + 1);
      b.style.left = (r.left + fx * r.width) + 'px';
      b.style.top  = (r.top + fy * r.height) + 'px';
      layer.appendChild(b);
    });

    /* Булавка, которую ещё не отправили: пунктирная и без числа, у
       неё пока нет ни номера, ни автора. */
    if (pending && pending.el && pending.el.isConnected) {
      var pr = pending.el.getBoundingClientRect();
      var np = document.createElement('span');
      np.className = 'gbc-pin gbc-pin--new';
      np.style.left = (pr.left + pending.fx * pr.width) + 'px';
      np.style.top  = (pr.top + pending.fy * pr.height) + 'px';
      layer.appendChild(np);
    }

    if (bubbleId) placeBubble(bubbleId);
  }

  /* ============================================================
     ПУЗЫРЬ НА ХОВЕРЕ (gbppl-comments-hover-1, 02.09)
     ------------------------------------------------------------
     Тон, 02.09, дословно: «я бы хотел, чтобы комменты было видно по
     hover: припинили коммент на canvas — навести курсор и увидеть,
     кто что писал, без клика. Как в Figma: появляется bubble с
     текстом коммента, и с большого расстояния, не нажимая на каждый,
     сразу видишь суть».

     ЧТО ОН ГОВОРИТ. Ровно шапку первого сообщения треда: кто, когда,
     сколько ответов, и текст, обрезанный тремя строками. Это те же
     четыре вещи, что печатает строка полки в консоли (paintShelf), и
     они собраны теми же функциями (author, ago, firstLine рядом) —
     второго правила «что показать в превью» в файле нет.

     ЧЕМ ОН ОДЕТ, И ПОЧЕМУ НЕ СВЕТЛОЙ КАРТОЧКОЙ. Тёмной плашкой, как
     .gbi-badge прибора: у ховер-читалки над чужой страницей уже есть
     облик в системе, и это он. Довод не «панель тёмная», а место в
     стопке: плашка висит НАД произвольным содержимым (белый каталог,
     чёрный герой главной, фотография в карточке), и Zinc 950 с
     --shadow-panel читается на всех трёх, а светлая карточка на
     светлой странице теряет край — ровно то, из-за чего консоль
     стала тёмной (gbppl-panel-3, Тон 26.08: «белый на белом не
     видно»). Светлая поверхность в этом режиме занята: она у дровера,
     который открывается по КЛИКУ. Разная громкость у чтения и у
     работы — это и есть разница между наведением и нажатием.

     ЧЕГО У НЕГО НЕТ. Ни хвостика, ни своей рамки, ни кнопок внутри:
     pointer-events нет вовсе, попасть в него нельзя и не нужно.
     Ответить, резолвить и читать ленту по-прежнему можно только в
     дровере.
     ============================================================ */
  var HOVER_MS  = 180;     /* NO TOKEN: длительностей ожидания в системе нет
                              (--mo-* это длительности ДВИЖЕНИЯ). 180 —
                              меньше, чем задержка узнавания у Figma-подобных
                              подсказок, и достаточно, чтобы проезд мыши по
                              трём булавкам не зажёг ни одной. Вопрос Тону,
                              если нужна ступень ожидания в шкале. */
  var bubbleId    = '';    /* тред, чей пузырь сейчас на экране */
  var bubbleEl    = null;
  var bubbleTimer = 0;

  function canHover() {
    try { return window.matchMedia('(hover: hover)').matches; } catch (e) { return true; }
  }

  function replyLine(c) {
    var n = (c.replies || []).length;
    return n ? (n === 1 ? '1 reply' : n + ' replies') : '';
  }

  /* Тот же выбор текста, что у строки полки (firstLine): у
     предложения копии суть в предложенной строке, а не в объяснении.
     Обрезает здесь не JS, а CSS: три строки клампом видят край слова,
     а не шестидесятый символ. */
  function previewText(c) {
    var t = c.kind === 'suggest' && c.suggestion ? c.suggestion.after : c.body;
    return String(t || '').replace(/\s+/g, ' ').trim();
  }

  function bubbleHTML(c) {
    var more = replyLine(c);
    var txt = previewText(c);
    return '<p class="gbc-bubble__by">' + esc(c.author || 'someone') +
        '<time title="' + esc(c.created) + '">' + esc(ago(c.created)) + '</time>' +
        (more ? '<span class="gbc-bubble__n">' + esc(more) + '</span>' : '') +
        (c.status === 'open' ? '' : '<span class="gbc-chip">' + esc(c.status) + '</span>') +
      '</p>' +
      (txt ? '<p class="gbc-bubble__body">' + esc(txt) + '</p>' : '');
  }

  function hideBubble() {
    if (bubbleTimer) { clearTimeout(bubbleTimer); bubbleTimer = 0; }
    bubbleId = '';
    if (bubbleEl && bubbleEl.parentNode) bubbleEl.parentNode.removeChild(bubbleEl);
    bubbleEl = null;
  }

  function wantBubble(id) {
    if (!id || id === bubbleId) return;
    hideBubble();
    bubbleTimer = setTimeout(function () {
      bubbleTimer = 0;
      placeBubble(id);
    }, HOVER_MS);
  }

  /* СТУПЕНИ ЧИТАЮТСЯ НА ОСТРОВЕ, А НЕ ПИШУТСЯ ЧИСЛАМИ (ловушка 21).
     Флип — это арифметика, значит зазор и поле нужны числом; но взять
     их надо там, где стоит слой, потому что на вендорном каталоге
     --space-* на :root принадлежат бандлу, а .gbc-layer в списке
     островов oro-ui-override.css и держит нашу шкалу. */
  function rung(cs, name, fallback) {
    var v = parseFloat(cs.getPropertyValue(name));
    return isFinite(v) && v > 0 ? v : fallback;
  }

  function placeBubble(id) {
    if (!layer || !/^[A-Za-z0-9_-]+$/.test(String(id))) { hideBubble(); return; }
    var c = byId(id);
    var pin = c ? layer.querySelector('.gbc-pin[data-pin="' + id + '"]') : null;
    if (!pin) { hideBubble(); return; }

    if (!bubbleEl || bubbleEl.getAttribute('data-for') !== id) {
      if (bubbleEl && bubbleEl.parentNode) bubbleEl.parentNode.removeChild(bubbleEl);
      bubbleEl = document.createElement('div');
      bubbleEl.className = 'gbc-bubble';
      bubbleEl.setAttribute('data-for', id);
      /* Читалка для указателя, не вторая копия треда для читалки
         экрана: тред целиком доступен по клику, и объявлять его
         дважды значило бы объявить его невпопад. */
      bubbleEl.setAttribute('aria-hidden', 'true');
    }
    bubbleEl.innerHTML = bubbleHTML(c);
    if (bubbleEl.parentNode !== layer) layer.appendChild(bubbleEl);
    bubbleId = id;

    var cs = getComputedStyle(layer);
    var gap  = rung(cs, '--space-8', 8);    /* булавка → пузырь */
    var edge = rung(cs, '--space-16', 16);  /* пузырь → кромка окна */
    var pr = pin.getBoundingClientRect();
    var br = bubbleEl.getBoundingClientRect();

    var left = pr.left + pr.width / 2 - br.width / 2;
    var maxLeft = Math.max(edge, window.innerWidth - br.width - edge);
    left = Math.min(Math.max(left, edge), maxLeft);

    /* НАД БУЛАВКОЙ, ПОКА ЕСТЬ КУДА. Сверху пузырь не закрывает то, на
       что человек смотрит: булавка стоит на элементе, а рука идёт к
       ней снизу. Не помещается над — переворачиваем под неё, не
       помещается и там — вжимаем в окно: у окна ниже пузыря выбора
       уже нет. */
    var top = pr.top - gap - br.height;
    if (top < edge) {
      var below = pr.bottom + gap;
      top = (below + br.height <= window.innerHeight - edge)
        ? below
        : Math.max(edge, window.innerHeight - edge - br.height);
    }

    bubbleEl.style.left = Math.round(left) + 'px';
    bubbleEl.style.top  = Math.round(top) + 'px';
    bubbleEl.classList.add('is-in');
  }

  /* ============================================================
     НЕПРОЧИТАННОЕ И БЕЙДЖ (gbppl-panel-11)
     ------------------------------------------------------------
     Тон: «когда есть комментарии, на иконке нужен бейдж с
     количеством новых (непрочитанных) комментариев, чтобы я сразу
     это видел». Разбор решения — в шапке файла, пункт 2.
     ============================================================ */
  function seenKey() {
    var v = versionKey();
    return SEEN_KEY + pageKey() + (v ? '?' + v : '');
  }

  function seenAt() {
    try { return Date.parse(localStorage.getItem(seenKey())) || 0; } catch (e) { return 0; }
  }

  function markSeen() {
    try { localStorage.setItem(seenKey(), new Date().toISOString()); } catch (e) {}
  }

  function newer(iso, since) {
    var t = Date.parse(iso);
    return !!t && t > since;
  }

  function openCount() {
    var n = 0;
    items.forEach(function (c) { if (c.status === 'open') n++; });
    return n;
  }

  /* Считаем ЗАПИСИ, а не треды: ответ в старом треде — такая же
     новость, как новый тред, и человек, увидевший «1», должен найти
     ровно одну вещь, которой не видел. */
  function unread() {
    var since = seenAt();
    if (!since) return openCount();
    var n = 0;
    items.forEach(function (c) {
      if (newer(c.created, since)) n++;
      (c.replies || []).forEach(function (r) { if (newer(r.created, since)) n++; });
    });
    return n;
  }

  /* В самом Comment бейджа нет: там открыт список, и счёт того, на
     что смотришь, — шум. Ноль тоже снимает бейдж (панель, setBadge).

     ДВА МЕСТА, ОДИН СЧЁТ (gbppl-panel-12, Тон 28.08: «думаю можно
     счёт и там»). Число считается здесь один раз и уходит обоими
     адресами: на позицию Comment внутри ящика и на ярлык STUDIO
     снаружи. Кто из них сейчас виден, решает панель по состоянию
     ящика — это её знание, не наше; второго подсчёта и второго
     источника правды не заводим. Ручка сегмента приезжает позже
     панели (она ждёт прибора), поэтому у каждого адреса своя
     проверка: молчащий сегмент не должен отнимать счёт у ярлыка. */
  function paintBadge() {
    var n = ON ? 0 : unread();
    if (handle && typeof handle.setBadge === 'function') handle.setBadge('comment', n);
    var p = panelEl();
    if (p && typeof p.setTabBadge === 'function') p.setTabBadge(n);
  }

  var pinFrame = 0;
  function repaintPins() {
    if (pinFrame) return;
    pinFrame = requestAnimationFrame(function () { pinFrame = 0; paintPins(); });
  }

  /* ============================================================
     ПОЛКА КОНСОЛИ: «Comments on this page»
     ------------------------------------------------------------
     Своя секция, а не группа в «This page»: список тредов — не
     переключатель страницы. Мебель вся своя, консольная: eyebrow у
     заголовка, сегменты фильтра, строки списка того же .gbsp-link,
     что двери и песочницы (Тон-14, пункт 2).
     ============================================================ */
  function mountShelf() {
    var p = panelEl();
    if (!p || typeof p.addSection !== 'function' || shelf) return;
    var sec = p.addSection({
      title: 'Comments on this page',
      rank: 20,                       /* сразу за инструментами (Mode, Device) */
      className: 'gbsp-sec--comments',
      /* gbppl-panel-11, решение Тона 28.08: «во View я хочу просто
         смотреть сайт, комментарии показывать не нужно, только когда
         я перехожу в режим комментариев». Полку гасит и зажигает
         панель; список под ней читается всё равно, потому что он
         кормит бейдж. */
      when: 'comment'
    });
    shelf = sec.body;
    shelf.innerHTML =
      '<p class="gbsp-note gbc-count"></p>' +
      '<div class="gbsp-segs gbsp-segs--row gbc-filter" role="group" aria-label="Filter">' +
        '<button class="gbsp-seg" type="button" data-f="open" aria-pressed="false">Open</button>' +
        '<button class="gbsp-seg" type="button" data-f="resolved" aria-pressed="false">Resolved</button>' +
        '<button class="gbsp-seg" type="button" data-f="mine" aria-pressed="false">Mine</button>' +
      '</div>' +
      '<ul class="gbsp-list gbc-list"></ul>';

    shelf.addEventListener('click', function (e) {
      var f = e.target.closest ? e.target.closest('[data-f]') : null;
      if (f) { filter = f.getAttribute('data-f'); paintShelf(); return; }
      var row = e.target.closest ? e.target.closest('[data-go]') : null;
      if (row) openThread(row.getAttribute('data-go'), true);
    });
    paintShelf();
  }

  function shown() {
    var me = author();
    return items.filter(function (c) {
      if (filter === 'open') return c.status === 'open';
      if (filter === 'resolved') return c.status !== 'open';
      return me && c.author === me;
    });
  }

  function paintShelf() {
    if (!shelf) return;
    /* Три статуса, две колонки счёта (спека §4.3): applied — это
       resolved, у которого есть хеш коммита, и в счётчике он стоит
       рядом только тогда, когда он есть; иначе строка врала бы про
       колонку, которой на этой странице нет. */
    var open = 0, done = 0, applied = 0;
    items.forEach(function (c) {
      if (c.status === 'open') open++;
      else if (c.status === 'applied') { done++; applied++; }
      else done++;
    });

    var count = shelf.querySelector('.gbc-count');
    count.textContent = down ? 'Comments unavailable'
      : (open + ' open · ' + done + ' resolved' + (applied ? ' · ' + applied + ' applied' : ''));

    var segs = shelf.querySelectorAll('[data-f]');
    for (var i = 0; i < segs.length; i++) {
      var on = segs[i].getAttribute('data-f') === filter;
      segs[i].classList.toggle('is-on', on);
      segs[i].setAttribute('aria-pressed', String(on));
    }

    var list = shelf.querySelector('.gbc-list');
    var rows = shown();
    if (!items.length) {
      list.innerHTML = '<li class="gbc-empty">No comments on this page yet.</li>';
    } else if (!rows.length) {
      list.innerHTML = '<li class="gbc-empty">Nothing under this filter.</li>';
    } else {
      list.innerHTML = rows.map(function (c) {
        var n = items.indexOf(c) + 1;
        var lost = !resolve(c.anchor);
        return '<li>' +
          '<button class="gbsp-link gbc-item" type="button" data-go="' + esc(c.id) + '">' +
            '<span class="gbc-item__head">' +
              '<span class="gbc-item__n">' + n + '</span>' +
              esc(c.author || 'someone') + ' · ' + esc(ago(c.created)) +
              (c.status === 'open' ? '' : '<span class="gbc-chip">' + esc(c.status) + '</span>') +
              (lost ? '<span class="gbc-chip gbc-chip--lost">element moved</span>' : '') +
            '</span>' +
            '<span class="gbc-item__line">' + esc(firstLine(c)) + '</span>' +
          '</button>' +
        '</li>';
      }).join('');
    }
  }

  /* ============================================================
     ТРЕД В ДРОВЕРЕ
     ------------------------------------------------------------
     Тот же <gb-drawer>, что у Inspect: дровер — поверхность, и
     второй экземпляр стакал бы две панели друг на друга. Первая
     строка тела — та же «Lives in <файл>», которую печатает
     измерение (GbInspect.lede), потому что вопрос «где это лежит»
     у замечания и у замера один.
     ============================================================ */
  function drawerHost() {
    var d = document.querySelector('gb-drawer');
    if (!d) {
      d = document.createElement('gb-drawer');
      document.body.appendChild(d);
    }
    return (d && typeof d.open === 'function') ? d : null;
  }

  function byId(id) {
    for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
    return null;
  }

  /* Подпись автора: имя спрашивается ОДИН раз в браузере, дальше
     сворачивается в строку «as <имя> · change» (спека §4.2). */
  /* ПОЛЯ ДРОВЕРА = ДЕФОЛТНОЕ ПОЛЕ СИСТЕМЫ (gbppl-comments-dress-1,
     01.09; полный разбор в шапке файла). Лейбл СТОИТ НАД контролом и
     говорит единственным капс-голосом системы (.gba-label на токенах
     Eyebrow, раздел 3 скилла), контрол подчёркнут, лестница 14/16/18
     при 48/56/64 — ровно то, что носят дровер входа и дроверы
     чекаута. Однострочник и многострочник получают ОДИН облик; до
     этой волны они носили .gba-field--floating и говорили двумя
     разными голосами в форме из двух полей.
     Плейсхолдера у имени нет: лейбл над полем уже сказал слово, и
     повторять его внутри строки значит написать его дважды. */
  function fieldBlock(id, label, control) {
    return '<div class="gba-field gbc-field">' +
      '<label class="gba-label" for="' + id + '">' + label + '</label>' +
      '<div class="gba-inputwrap">' + control + '</div>' +
    '</div>';
  }

  function authorBlock(dis) {
    var me = author();
    if (!me) {
      return fieldBlock('gbc-name', 'Your name',
        '<input class="gba-input" id="gbc-name" type="text" autocomplete="name"' + dis + '>');
    }
    return '<p class="gbc-as">as ' + esc(me) +
           ' <button class="gbc-link" type="button" data-act="rename"' + dis + '>change</button></p>';
  }

  /* МНОГОСТРОЧНИК ТОГО ЖЕ ОБЛИКА: .gba-textarea это версия того же
     .gba-input (auth.css), поэтому лейбл, подчёркивание, лестница и
     фокус приходят оттуда же, а разница ровно в трёх вещах, которые
     объявил владелец: пол 80, междустрочие 1.6 и вертикальные поля.
     Потолок, снятая ручка и рост по содержимому с 01.09 тоже у
     владельца (gbppl-field-autogrow-1): дровер был первым, кто их
     попросил, но свойством поля они стали для всех.
     ОТКРЫТО ТОНУ (не решено этой волной): он просил «поле с рамкой».
     Рамки у поля нет ни у нас, ни на лайве — .gba-input подчёркнут на
     каждой странице, которую мы мерили, — и боксировать многострочник
     значит либо завести пятый облик поля, либо переодеть шаг 1
     букинга, который Тон сам запер на живую форму «один в один».
     Вопрос на столе, замер в отчёте волны.

     И НАЧИНАЕТ ОН СО СТРОКИ (gbppl-comments-hitbox-1, 01.09). Тон, в
     тот же час, что и жалоба на попадание курсором: «чтобы она была
     растягиваемой, а не большой по дефолту. Это сразу сбивает,
     непонятно, куда ставить курсор». Пол 80 был живым числом лид-формы
     и остался полом ПОЛЯ; форме треда, где многострочник стоит в
     колонку с однострочником, владелец даёт ось .gba-textarea--line:
     пол опускается на ту же ступень лестницы контрола, на которой
     стоит поле имени (48 / 56 с 1280 / 64 с 2000). Пустой дровер
     становится тремя рядами одного роста, и целиться больше некуда
     мимо. Рост, потолок 192 и земля на потолке остаются у поля:
     набранная строка тут же поднимает высоту, стёртая опускает
     обратно. rows="1" тем же решением — браузеру без field-sizing
     атрибутом говорится то же, что остальным говорит CSS. */
  function areaBlock(id, label, placeholder, value, dis) {
    return fieldBlock(id, label,
      '<textarea class="gba-input gba-textarea gba-textarea--line" id="' + id + '" rows="1"' +
        (placeholder ? ' placeholder="' + placeholder + '"' : '') + dis + '>' +
        (value || '') + '</textarea>');
  }

  function msgBlock(c, i) {
    var suggestion = c.kind === 'suggest' && c.suggestion ?
      '<div class="gbc-diff">' +
        '<p class="gbc-diff__row"><span class="gbc-diff__k">was</span>' +
          '<span class="gbc-diff__v">' + esc(c.suggestion.before) + '</span></p>' +
        '<p class="gbc-diff__row"><span class="gbc-diff__k">now</span>' +
          '<span class="gbc-diff__v gbc-diff__v--new">' + esc(c.suggestion.after) + '</span></p>' +
      '</div>' : '';
    var body = String(c.body || '').trim();
    return '<article class="gbc-msg">' +
      '<p class="gbc-msg__by">' + esc(c.author || 'someone') +
        '<time title="' + esc(c.created) + '">' + esc(ago(c.created)) + '</time>' +
        (c.status === 'open' ? '' : '<span class="gbc-chip">' + esc(c.status) +
          (c.applied_ref ? ' ' + esc(c.applied_ref) : '') + '</span>') +
      '</p>' +
      suggestion +
      (body ? '<p class="gbc-msg__body">' + esc(body) + '</p>' : '') +
    '</article>';
  }

  function replyBlock(r) {
    return '<article class="gbc-msg gbc-msg--reply">' +
      '<p class="gbc-msg__by">' + esc(r.author || 'someone') +
        '<time title="' + esc(r.created) + '">' + esc(ago(r.created)) + '</time></p>' +
      '<p class="gbc-msg__body">' + esc(r.body) + '</p>' +
    '</article>';
  }

  /* Форма нового комментария. Два вида, один переключатель: note —
     замечание словами, suggest text — предложенная копия, и тогда
     рядом стоит то, что написано сейчас (спека §4.2). Переключатель —
     системный Toggle button (toggle.css), поле и кнопка — .gba-input и
     .gb-btn; ни одной своей формы. */
  /* ВЫБОР ВИДА = ТОГЛ (gbppl-comments-dress-1). Два коротких значения,
     и канон осей (window.ORO_AXES) на такой длине называет .gb-toggle.
     Регистр разметки невидим (капс рисует компонент), поэтому слова
     пишутся по правилам копии, sentence case.
     aria-pressed, не aria-checked: toggle.js читает обе записи, но
     первая работает и там, где подключён только toggle.css. */
  function kindsBlock(suggest, d) {
    function half(value, label, on) {
      return '<button class="gb-toggle__item' + (on ? ' is-on' : '') + '" type="button"' +
        ' data-kind="' + value + '" aria-pressed="' + on + '"' + d + '>' + label + '</button>';
    }
    return '<div class="gbc-kinds">' +
      '<div class="gb-toggle' + (down ? ' is-disabled' : '') + '" role="radiogroup"' +
        ' aria-label="Kind of comment">' +
        half('note', 'Note', !suggest) +
        half('suggest', 'Suggest text', suggest) +
      '</div>' +
    '</div>';
  }
  /* ЗАПЕРТО ЦЕЛИКОМ ИЛИ НЕ ЗАПЕРТО ВОВСЕ (gbppl-comments-c). Пока
     писать некуда, форма не принимает ни буквы: disabled стоит на
     полях, на сегментах note | suggest и на кнопке. Наполовину живая
     форма врёт дважды: принимает текст, которого не сохранит, и
     заставляет догадываться, почему кнопка серая. */
  function dis() { return down ? ' disabled' : ''; }

  function formBlock(el, kind) {
    var current = el ? textOf(el, true) : '';
    var suggest = kind === 'suggest';
    var d = dis();
    return '<form class="gbc-form' + (down ? ' is-down' : '') + '" data-form="new">' +
      authorBlock(d) +
      kindsBlock(suggest, d) +
      (suggest ?
        '<div class="gbc-diff gbc-diff--live">' +
          '<p class="gbc-diff__row"><span class="gbc-diff__k">was</span>' +
            '<span class="gbc-diff__v">' + esc(current) + '</span></p>' +
          '<p class="gbc-diff__row"><span class="gbc-diff__k">now</span>' +
            '<span class="gbc-diff__v gbc-diff__v--new" data-now>' + esc(current) + '</span></p>' +
        '</div>' +
        areaBlock('gbc-new', 'New text', '', esc(current), d) : '') +
      areaBlock('gbc-body', suggest ? 'Why' : 'Comment',
                suggest ? 'Optional' : 'What should change here', '', d) +
      '<div class="gbc-actions">' +
        '<button class="gb-btn gb-btn--medium gb-btn--filled gb-btn--primary" type="submit"' +
          d + '><span class="gb-btn__label">Post</span></button>' +
      '</div>' +
      /* Подсказка СТРОКОЙ ПОД РЯДОМ, а не рядом с кнопкой
         (gbppl-comments-dress-1): «Ctrl and Enter posts» умещалось
         сбоку, а строка отказа сервиса переносилась под кнопку сама,
         и одно и то же место говорило то справа, то снизу. Одно
         место для одной роли. */
      '<p class="gbc-hint">' + (down ? SAY[down] : 'Ctrl and Enter posts') + '</p>' +
    '</form>';
  }

  function threadBlock(c) {
    var replies = (c.replies || []).map(replyBlock).join('');
    var d = dis();
    return msgBlock(c) + replies +
      '<form class="gbc-form' + (down ? ' is-down' : '') + '" data-form="reply">' +
        authorBlock(d) +
        areaBlock('gbc-body', 'Reply', 'Answer in the thread', '', d) +
        '<div class="gbc-actions">' +
          '<button class="gb-btn gb-btn--medium gb-btn--filled gb-btn--primary" type="submit"' +
            d + '><span class="gb-btn__label">Post</span></button>' +
          '<button class="gb-btn gb-btn--medium gb-btn--outline gb-btn--secondary" type="button" data-act="status"' +
            d + '><span class="gb-btn__label">' +
            (c.status === 'open' ? 'Resolve' : 'Reopen') + '</span></button>' +
        '</div>' +
        (down ? '<p class="gbc-hint">' + SAY[down] + '</p>' : '') +
      '</form>';
  }

  /* Шапка дровера у треда и у замера одинаковая по строению: что это
     за элемент и где он живёт. С gbppl-drawer-unify-1 она одинакова
     и буквально: один слот, один заголовок, и разницы между режимами
     в шапке больше нет. */
  function openDrawerFor(el, html, sub) {
    var d = drawerHost();
    if (!d) return;
    var lede = (el && window.GbInspect && window.GbInspect.lede) ? window.GbInspect.lede(el) : '';
    var name = el && window.GbInspect ? window.GbInspect.identify(el).name : 'Element';
    /* gbppl-drawer-unify-1: no eyebrow in the head. The word
       «Comment» was saying which mode you are in, and the mode
       segment in the console says that already; the title is the
       thing the note is about, which is the only question the head
       has to answer. */
    d.open({
      title: name,
      sub: sub,
      html: lede + html
    });
    wireDrawer(el);
  }

  function openNew(el, fx, fy, kind) {
    pending = { el: el, fx: fx, fy: fy, kind: kind || 'note' };
    openId = null;
    paintPins();
    openDrawerFor(el, formBlock(el, pending.kind),
      '<code>' + esc(kinOf(el)) + '</code> · on ' + esc(deviceKey() === 'full' ? 'full window' : deviceKey()));
  }

  function openThread(id, scroll) {
    var c = byId(id);
    if (!c) return;
    pending = null;
    openId = id;
    var el = resolve(c.anchor);
    paintPins();
    if (scroll && el && el.scrollIntoView) {
      el.scrollIntoView({ block: 'center', inline: 'nearest' });
      repaintPins();
    }
    var sub = '<code>' + esc(c.anchor && c.anchor.kin ? c.anchor.kin : '') + '</code>' +
              (el ? '' : ' · element moved');
    if (el) {
      openDrawerFor(el, threadBlock(c), sub);
    } else {
      /* Элемент уехал: тред всё равно читается, только шапку пишет
         запись, а не страница — измерять больше нечего. */
      var d = drawerHost();
      if (!d) return;
      d.open({
        title: (c.anchor && c.anchor.role) || 'Element',
        sub: sub,
        html: '<p class="gbi-lede">This element is no longer on the page. ' +
              'The thread is kept.</p>' + threadBlock(c)
      });
      wireDrawer(null);
    }
  }

  function drawerBody() {
    return document.querySelector('.gbd-panel .gbd-body');
  }

  /* Форма уже нарисована, а сервис ответил (или замолчал) после неё.
     Перерисовываем ровно тогда, когда положение изменилось: иначе
     каждый ответ сервиса стирал бы то, что человек печатает. */
  function dress() {
    var f = document.querySelector('.gbc-form');
    if (!f) return;
    if (!!down === f.classList.contains('is-down')) return;
    /* Написанное переживает перерисовку. Форма запирается ровно тогда,
       когда сервис отвалился под уже набранным текстом, и стереть его
       было бы второй потерей после первой. */
    var keep = {};
    ['gbc-body', 'gbc-new', 'gbc-name'].forEach(function (id) {
      var el = f.querySelector('#' + id);
      if (el) keep[id] = el.value;
    });
    reopenSame(null);
    var b = drawerBody();
    if (!b) return;
    Object.keys(keep).forEach(function (id) {
      var el = b.querySelector('#' + id);
      if (el && !el.value) { el.value = keep[id]; grow(el); }
    });
  }

  /* РОСТ ПОЛЯ УЕХАЛ К ВЛАДЕЛЬЦУ (gbppl-field-autogrow-1, 01.09).
     Здесь стояла своя копия расчёта высоты по scrollHeight — вторая
     в доме после booking.js, — и вместе с потолком в comments.css она
     делала автороcт свойством ЭТОГО дровера, а не свойством поля.
     Теперь растёт само поле (auth.css: field-sizing: content, пол,
     потолок, земля на потолке; auth.js слушает ввод и приход новых
     узлов за всех). Дровер не зовёт ничего и не меряет ничего.
     Единственный след — строка ниже, в восстановлении черновика:
     значение туда кладут присваиванием, а не набором, и там, где
     браузер не умеет field-sizing, высоту пересчитать всё же надо.
     Владелец публикует для этого window.GbFields.grow. */
  function grow(t) {
    if (t && window.GbFields) window.GbFields.grow(t);
  }

  /* ---------- проводка формы в дровере ----------
     Дровер переписывает СОДЕРЖИМОЕ тела на каждом open, а сам узел
     тела переживает открытия. Поэтому слушатели вешаются на ФОРМУ,
     которая рождается заново каждый раз: на теле они копились бы, и
     третий open отправлял бы комментарий трижды. */
  function wireDrawer(el) {
    var body = drawerBody();
    if (!body) return;

    var nameEl = body.querySelector('#gbc-name');
    var bodyEl = body.querySelector('#gbc-body');
    var newEl  = body.querySelector('#gbc-new');
    var nowEl  = body.querySelector('[data-now]');
    var form   = body.querySelector('form[data-form]');

    /* Было и стало пишутся рядом, пока печатают (спека §4.2). */
    if (newEl && nowEl) {
      newEl.addEventListener('input', function () { nowEl.textContent = newEl.value; });
    }

    /* Ни начального замера, ни слушателя на ввод: и то и другое
       делает владелец поля (gbppl-field-autogrow-1). */

    if (!form) return;

    form.addEventListener('click', function (e) {
      var k = e.target.closest ? e.target.closest('[data-kind]') : null;
      if (k && pending) {
        /* Форма пересобирается целиком, значит нажатая половина тогла
           это уже другой узел. Возвращаем на неё фокус: со стрелок
           клавиатуры (toggle.js жмёт по мере движения) иначе фокус
           уезжал бы в поле имени на каждом переключении. */
        keepFocus = k.getAttribute('data-kind');
        openNew(pending.el, pending.fx, pending.fy, keepFocus);
        return;
      }
      var rn = e.target.closest ? e.target.closest('[data-act="rename"]') : null;
      if (rn) { author(''); reopenSame(el); return; }
      var st = e.target.closest ? e.target.closest('[data-act="status"]') : null;
      if (st) { flipStatus(); return; }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submit(form.getAttribute('data-form'), el);
    });

    /* Ctrl+Enter отправляет из любого поля треда (спека §4.2). Esc
       наверх не глушится: его ждёт дровер, и закрыть панель из поля
       надо уметь. */
    form.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        submit(form.getAttribute('data-form'), el);
      }
    });

    var focusOn = keepFocus
      ? body.querySelector('.gb-toggle__item[data-kind="' + keepFocus + '"]')
      : (nameEl || newEl || bodyEl);
    keepFocus = '';
    if (focusOn) focusOn.focus({ preventScroll: true });
  }

  function reopenSame(el) {
    if (pending) openNew(pending.el, pending.fx, pending.fy, pending.kind);
    else if (openId) openThread(openId, false);
  }

  function readAuthor(body) {
    var nameEl = body.querySelector('#gbc-name');
    if (nameEl) {
      var v = nameEl.value.trim();
      if (!v) { nameEl.focus(); return ''; }
      author(v);
      return v;
    }
    return author();
  }

  /* ОДИН НАЖИМ — ОДНА ЗАПИСЬ (найдено прогоном 28.08: два одинаковых
     треда на одном клике). Отправка асинхронна, и до ответа сервера
     форма стоит нетронутая, с текстом и живой кнопкой: второй нажим,
     повторный клик прибора или Ctrl+Enter следом дают вторую запись.
     Задвижка снимается там же, где кончается запрос, в обе стороны. */
  var busy = false;
  function hold(on) {
    busy = on;
    var b = drawerBody();
    var btn = b && b.querySelector('.gb-btn--primary');
    if (btn) btn.disabled = on;
  }

  function submit(which, el) {
    var body = drawerBody();
    if (!body || down || busy) return;
    var who = readAuthor(body);
    if (!who) return;

    var bodyEl = body.querySelector('#gbc-body');
    var text = bodyEl ? bodyEl.value.trim() : '';

    if (which === 'reply') {
      if (!text) { bodyEl.focus(); return; }
      hold(true);
      call('POST', '/api/comments/' + encodeURIComponent(openId) + '/replies',
           { author: who, body: text })
        .then(function () { return load(); })
        .then(function () { busy = false; openThread(openId, false); })
        .catch(function (err) { busy = false; fell(err); });
      return;
    }

    var mark = pending;
    if (!mark) return;
    var newEl = body.querySelector('#gbc-new');
    var kind = newEl ? 'suggest' : 'note';
    if (kind === 'note' && !text) { bodyEl.focus(); return; }

    var payload = {
      page: pageKey(), version: versionKey(), device: deviceKey(),
      anchor: anchorFor(mark.el, mark.fx, mark.fy),
      author: who, kind: kind, body: text,
      suggestion: kind === 'suggest'
        ? { before: textOf(mark.el, true), after: newEl.value.trim() }
        : null
    };
    hold(true);
    call('POST', '/api/comments', payload)
      .then(function () {
        /* ЗАКРЫВАЕТСЯ СОЗДАНИЕ, ОТВЕТ ОСТАЁТСЯ ОТКРЫТЫМ
           (gbppl-comments-hover-1, 02.09; Тон: «Когда сабмитишь
           коммент, этот drawer с комментом должен закрываться, а он
           почему-то не закрывается»). Тред открывался тут потому, что
           первая волна (2216fff) переиспользовала openThread как
           «показать сделанное»: решения Тона за этим не стояло, в
           спеке §4.2 после Post не сказано ничего, и результат читался
           как «ничего не произошло» — тот же дровер, только теперь с
           композером ответа. Замечание оставлено, и человек снова
           смотрит на страницу: булавка с номером и есть ответ.
           Отправка ОТВЕТА закрытием не кончается (выше, ветка reply):
           у Figma композер треда очищается, а сам тред стоит, потому
           что разговор продолжается — и потому, что ответ пишут, уже
           читая ленту, которую закрытие унесло бы из-под руки. */
        pending = null;
        openId = null;
        return load().then(function () {
          busy = false;
          var d = document.querySelector('gb-drawer');
          if (d && typeof d.close === 'function') d.close();
        });
      })
      .catch(function (err) { hold(false); fell(err); });
  }

  function flipStatus() {
    var c = byId(openId);
    if (!c || down || busy) return;
    busy = true;
    call('PATCH', '/api/comments/' + encodeURIComponent(c.id),
         { status: c.status === 'open' ? 'resolved' : 'open' })
      .then(function () { return load(); })
      .then(function () { busy = false; openThread(openId, false); })
      .catch(function (err) { busy = false; fell(err); });
  }

  /* ============================================================
     РЕЖИМ
     ============================================================ */
  function announce() {
    try {
      document.dispatchEvent(new CustomEvent('gbc:mode', {
        detail: {
          on: ON,
          down: ON && down ? 'Comments unavailable' : '',
          /* gbppl-panel-11: строка состояния консоли в этом режиме
             говорит «Comment · N open», и N приходит отсюда — считать
             его второй раз в панели значило бы держать там копию
             списка. */
          open: openCount()
        }
      }));
    } catch (e) {}
  }

  function setMode(next) {
    next = !!next;
    if (next === ON) { announce(); return; }
    ON = next;
    ss(MODE_KEY, ON ? '1' : '0');
    document.documentElement.classList.toggle('gbc-on', ON);

    if (ON && window.GbInspect && window.GbInspect.mode() === 'inspect') {
      /* Один тумблер, одно положение: включая Comment, гасим прибор.
         Флаг нужен, чтобы наш же gbi:mode не выключил нас обратно. */
      moving = true;
      window.GbInspect.setMode('view');
      moving = false;
    }
    if (!ON) {
      pending = null;
      hovered = null;
      if (window.GbInspect) window.GbInspect.outlineOff();
    }
    if (handle) handle.setActive(ON ? 'comment' : (window.GbInspect ? window.GbInspect.mode() : 'view'));
    paintPins();
    /* gbppl-panel-11. Вход в режим = «я это увидел»: список уже в
       руках, и полка открывается вместе с режимом. Пока сервис молчит,
       отметки нет: списка на экране тоже нет, и гасить бейдж значило
       бы объявить прочитанным то, чего человеку не показали. */
    if (ON && !down) markSeen();
    paintBadge();
    announce();
    if (ON) load();
  }

  /* Клик по View или Inspect — это клик ПРОЧЬ отсюда. Событие прибора
     единственное, что нужно услышать: он объявляет любую смену, даже
     на то же самое значение. */
  document.addEventListener('gbi:mode', function () {
    if (moving || !ON) return;
    setMode(false);
  });

  /* Другой конец провода, внутри кадра девайса: снаружи консоль
     посылает режим внутрь, страница переключается. Тот же разбор
     отправителя, что у прибора (gbppl-panel-7). */
  window.addEventListener('message', function (e) {
    if (e.source !== window.parent || e.source === window) return;
    var d = e.data;
    if (!d || d.gbsp !== 'cmode') return;
    if (!!d.on !== ON) setMode(!!d.on);
  });

  /* ============================================================
     УКАЗАТЕЛЬ И КЛАВИШИ
     ============================================================ */
  document.addEventListener('pointermove', function (e) {
    if (!ON) return;
    var t = e.target;
    if (!window.GbInspect) return;
    if (window.GbInspect.isChrome(t) || t === document.documentElement) {
      hovered = null;
      window.GbInspect.outlineOff();
      return;
    }
    t = window.GbInspect.target(t, e.altKey);
    if (t === hovered) return;
    hovered = t;
    window.GbInspect.outline(t);
  }, { passive: true });

  document.addEventListener('pointerleave', function () {
    if (!ON || !window.GbInspect) return;
    hovered = null;
    window.GbInspect.outlineOff();
  });

  /* Клик в режиме Comment — это выбор объекта, а не команда странице:
     ссылка никуда не идёт, форма никуда не отправляется. Ровно то же
     правило и по той же причине, что в Inspect. */
  document.addEventListener('click', function (e) {
    if (!ON) return;
    if (!window.GbInspect || window.GbInspect.isChrome(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    var el = window.GbInspect.target(e.target, e.altKey);
    if (!el || el === document.documentElement || el === document.body) return;
    var r = el.getBoundingClientRect();
    var fx = r.width ? (e.clientX - r.left) / r.width : 0.5;
    var fy = r.height ? (e.clientY - r.top) / r.height : 0.5;
    openNew(el, Math.min(Math.max(fx, 0), 1), Math.min(Math.max(fy, 0), 1), 'note');
  }, true);

  document.addEventListener('mousedown', function (e) {
    if (!ON || !window.GbInspect || window.GbInspect.isChrome(e.target)) return;
    e.preventDefault();
  }, true);

  document.addEventListener('submit', function (e) {
    if (!ON || !window.GbInspect || window.GbInspect.isChrome(e.target)) return;
    e.preventDefault();
  }, true);

  /* c переключает, Esc выходит. Кириллическая с — та же физическая
     клавиша, и стоит одно сравнение (то же решение, что у i в
     inspect.js). Очередь Esc честная: дровер, потом консоль, потом
     мы. */
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' ||
                       t.tagName === 'SELECT' || t.isContentEditable);
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'c' || e.key === 'C' || e.key === 'с' || e.key === 'С') {
      e.preventDefault();
      setMode(!ON);
      return;
    }
    if (e.key === 'Escape' && ON) {
      if (document.querySelector('.gbd-panel.is-open')) return;
      if (document.querySelector('.gbsp:not(.is-collapsed)')) return;
      setMode(false);
    }
  });

  document.addEventListener('gbd:close', function () {
    if (!pending && !openId) return;
    pending = null;
    openId = null;
    paintPins();
  });

  window.addEventListener('scroll', repaintPins, { passive: true });
  window.addEventListener('resize', repaintPins);

  /* ============================================================
     СТАРТ
     ============================================================ */

  /* DEEP LINK (спека §4.3). Ключ одноразовый: он не описывает вид
     страницы, он описывает ПЕРЕХОД, и оставлять его в адресе значило
     бы заново открывать тред на каждом обновлении. В KEEP header.js
     он не входит по той же причине. Экран и версия приезжают своими
     ключами, и сцену к этому моменту уже поставила консоль.

     КТО ОТВЕЧАЕТ, КОГДА СТОИТ КАДР. Ссылка с экраном (?comment=ID&
     device=390) открывается страницей, которая тут же накрывает себя
     сценой, и элемент с булавкой оказывается НЕ В НЕЙ, а в кадре.
     Консоль строит адрес кадра раньше, чем мы снимаем ключ, поэтому
     ключ уезжает внутрь сам и внутренняя копия открывает тред у себя,
     где он и должен быть — там же, где Inspect открывает свой дровер
     (gbppl-panel-7). Снаружи мы ключ снимаем и молчим: иначе на один
     переход открылись бы два дровера, и наружный показал бы orphan,
     потому что элемента в этом документе нет. Проверено прогоном
     28.08: до этой строки открывались оба. */
  function takeDeepLink() {
    try {
      var u = new URL(location.href);
      var id = u.searchParams.get('comment');
      if (!id) return null;
      u.searchParams.delete('comment');
      history.replaceState(null, '', u.pathname + (u.search || '') + u.hash);
      return staged() ? null : id;
    } catch (e) { return null; }
  }

  function mountSwitch() {
    if (!window.GbInspect || !window.GbInspect.onModeSwitch) return;
    window.GbInspect.onModeSwitch(function (h) {
      handle = h;
      handle.addOption({
        label: 'Comment',
        value: 'comment',
        note: 'Point at anything and click to leave a note. Keys: c switches, Esc leaves.',
        /* Своё поведение при своей позиции: у ряда Mode два хозяина, и
           inspect.js не знает, что делать со значением comment. */
        onChange: function () { setMode(true); }
      });
      if (ON) handle.setActive('comment');
      /* Сегмент приезжает позже первой загрузки списка (он ждёт
         прибора), поэтому счёт ставится здесь ещё раз: раньше его
         некуда было ставить. */
      paintBadge();
    });
  }

  /* ВОЗВРАТ ФОКУСА, НЕ ОПРОС (gbppl-panel-11). Бейдж обязан догонять
     чужие комментарии, но сервис не обязан слушать таймер: список
     перечитывается, когда к окну вернулись, и не чаще раза в минуту.
     В режиме Comment перечитывать нечего лишний раз — там список и
     так обновляется каждым действием. */
  function wireRefresh() {
    window.addEventListener('focus', function () {
      if (down === 'code') return;
      if (Date.now() - lastLoad < REFRESH_MS) return;
      load();
    });
  }

  function start() {
    deepLink = takeDeepLink();
    mountSwitch();
    mountShelf();

    wireRefresh();

    var wanted = deepLink ? true : ss(MODE_KEY) === '1';
    if (wanted) setMode(true);
    else {
      /* Даже в View список страницы читается, хотя полки не видно
         (gbppl-panel-11): из него берётся счёт непрочитанного на
         сегменте Comment, и человек видит, что здесь что-то сказано,
         не входя в режим. Ровно один запрос на загрузку страницы. */
      announce();
      load();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  /* ---------- что может одолжить страница ----------
     on() и setMode() нужны консоли, чтобы держать в согласии режим
     снаружи кадра и внутри него (studio-panel.js, провод cmode);
     reload() — волне C и карте, когда счётчики надо пересобрать. */
  window.GbComments = {
    on: function () { return ON; },
    setMode: setMode,
    reload: load
  };
})();
