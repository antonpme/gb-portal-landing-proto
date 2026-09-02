/* ============================================================
   SYSTEM COMPONENT: BOOKING FLOW, JS-шаблоны    gbppl-booking-1
   ------------------------------------------------------------
   Регистрирует <gb-booking-flow>: три шага записи на встречу.

     1. Details                  ЖИВАЯ лид-форма contact-us-219
     2. Pick a time              наш календарь + слоты 15 минут
     3. You’re booked            конфирмация с рисующейся галкой

   Шаблон инжектится, страницы не держат разметку руками; классы
   свои — .gbb-*, правила в booking.css. Никаких fetch-инклюдов:
   работает с file:// и на GitHub Pages.

   ДВА РЕЖИМА: ГОСТЬ И СВОЙ
   ------------------------------------------------------------
   Тон, 25.08: «Когда ты уже внутри портала, мы не показываем форму
   (шаг 1), а сразу показываем слот, потому что уже знаем, кто ты».
   Поэтому у флоу две длины, и выбирает её ХОСТ, а не флоу:

     <gb-booking-flow>                       гость: три шага, всё
                                             начинается с формы;
     <gb-booking-flow start="slot"           свой: два шага, форма
        guest-name="…" guest-email="…"       пропущена, календарь
        guest-company="…" guest-phone="…">   первый, а сводка шага
                                             3 берёт имя и почту из
                                             предзаполнения.

   Данные можно отдать и из кода — el.prefill({name, email, …}):
   та же запись, но для хоста, у которого профиль лежит в состоянии
   приложения, а не в атрибутах разметки. Индикатор в режиме своего
   рисует ДВЕ засечки, а не три с погашенной первой: шага, которого
   не будет, в дороге нет.

   Публичная live\book-a-meeting.html стоит в режиме гостя. Попап
   START портала носит режим своего с 25.08
   (gbppl-portal-booking-1).

   ЧТО ВЗЯТО И ОТКУДА
   ------------------------------------------------------------
   ПОЛЯ — организм авторизации целиком: <gb-field> из auth.js
   (auth.js обязан стоять рядом), классы .gba-* из auth.css.
   Собственных инпутов у этого файла нет. Единственное поле,
   собранное здесь руками, — телефон: ему нужны ДВЕ части в одной
   подчёркнутой строке (код страны и номер), и обе носят те же
   .gba-* классы, плюс .gbb-phone на строку. Плавающий лейбл у него
   тот же, что у <gb-field>, только сдвинутый вправо на живые 57px,
   чтобы не сесть на код страны.

   ШАГ 1 = ЖИВАЯ ФОРМА ЦЕЛИКОМ (gbppl-booking-4, 27.08). Тон:
   «Должно быть полностью как на live... Мы должны имитировать
   первый шаг точно так же, как на live. После первого шага (всё,
   что идёт через iframe HubSpot) можем делать так, как ты уже
   сделал». Раньше отсюда брались только ДАННЫЕ (поля, порядок,
   обязательности, ротация плейсхолдера), а облик был наш; теперь
   живыми пришли и облик, и слова: плавающие лейблы
   (label-style="floating", auth.js), лестница поля 13/14/16 при
   48/48/56, одна колонка с отступами 24/32/40, живые имена полей
   («Your Name», «Company Name», вопрос комментария целиком),
   кнопка --medium --block в своём ряду и живые тексты ошибок ДОСЛОВНО,
   включая строчную букву. Замер: harvest public-book-a-meeting
   (25.08) плюс прибор по состояниям rest/focus/filled/error на
   1280/1440/1920/390 (27.08).

   Шаги 2 и 3 остаются нашими: там, где живая страница уходит в
   чужой iframe HubSpot, начинается наш флоу.

   КАЛЕНДАРЬ И ГАЛКА — дверь Book a Meeting из попапа START
   (live\portal.html): круглая ячейка дня, синий выбранный день и
   слот (Тон-5: синий = состояние), рисующаяся галка конфирмации
   (gbppl-start-booked). Числа и хореография перенесены, см.
   booking.css. Что изменилось против попапа: месяц там был
   фиксированным August 2026 со списком открытых чисел, а стрелки
   стояли заглушками; здесь календарь живой и правила настоящие.

   ПРАВИЛА ВСТРЕЧИ (лайв, HubSpot Meetings за кнопкой CONTINUE):
   Пн-Пт, 09:00-17:00 America/Chicago, окно три недели вперёд,
   встреча 15 минут. Копия «15 minutes» — у портального прототипа
   стояло «Thirty minutes», это была заглушка, а не факт.

   МЕСТО ПОД API
   ------------------------------------------------------------
   Весь разговор с миром идёт через ОДИН объект adapter с тремя
   методами — submitLead / fetchSlots / book. Здесь он прототипный:
   промисы с задержкой, слоты сгенерированы по правилам выше. Когда
   появится настоящий календарь (Тон, 25.08: «будет работать через
   API, не iframe»), меняется только тело этих трёх методов —
   шаги, разметка и валидация их не видят.
   ============================================================ */

/* ============================================================
   gbppl-booking-3 — ОРГАНИЗМ УЧИТСЯ НАЧИНАТЬ СНАЧАЛА И УХОДИТЬ
   ТУДА, КУДА СКАЖЕТ ХОЗЯИН. 2026-08-25.

   Оба хвоста нашёл попап START портала — первый хост, который не
   является страницей. Страницу покидают навигацией, и организм
   этого хватало; окно закрывают и открывают снова, и хозяину
   приходилось выкручиваться руками. Что он делал (portal.html,
   gbppl-portal-booking-1) и что теперь делает организм:

     БЫЛО  хост ставил НОВЫЙ <gb-booking-flow> с теми же
           атрибутами на место отработавшего, потому что сбросить
           старый было нечем.
     СТАЛО el.restart(). Флоу возвращается на свой стартовый шаг
           (с учётом start="slot"), забывает выбранный день, слот
           и всё, что было напечатано в форме, и спрашивает у
           адаптера свежее окно слотов: за минуту в попапе время
           могло уйти вперёд. Что переживает сброс — то, что
           хозяин сообщил О ГОСТЕ: атрибуты guest-* и последний
           prefill(). Следом летит gbb:reset.

     БЫЛО  хост ловил клик по ссылке «Back to site» в делегате на
           диалоге, гасил его и закрывал окно. Копия имени класса
           организма в чужом файле и надпись, которая в попапе
           врала: из попапа никуда не уходят.
     СТАЛО атрибут exit-label (дефолт «Back to site») и
           ОТМЕНЯЕМОЕ событие gbb:exit. Хост слушает, зовёт
           preventDefault и закрывает окно; никто не гасил —
           организм уходит по site-href, как на своей странице.

   Полный публичный API организма после этой волны:
     атрибуты  start="slot", layout="compact", guest-name/email/
               company/phone, site-href, exit-label
     методы    el.prefill(data), el.restart()
     события   gbb:booked {slot, lead}, gbb:reset,
               gbb:exit {href} (cancelable)
     свойство  el.adapter (submitLead / fetchSlots / book)
   ============================================================ */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---------------- ИКОНКИ (инлайн-SVG) ---------------- */

  var ICON_ARROW =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4 12h15M13 6l6 6-6 6"/></svg>';

  var ICON_CARET =
    '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="m2.5 4.5 3.5 3.5 3.5-3.5"/></svg>';

  var ICON_PREV =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" ' +
      'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M7.5 2.5 4 6l3.5 3.5"/></svg>';

  var ICON_NEXT =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" ' +
      'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4.5 2.5 8 6l-3.5 3.5"/></svg>';

  /* Галка портала один в один: кольцо r=26 в боксе 56, тик из трёх
     точек. Рисование живёт в booking.css. */
  var ICON_CHECK =
    '<svg class="gbb-booked-check" viewBox="0 0 56 56" fill="none" stroke="currentColor" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle class="gbb-booked-ring" cx="28" cy="28" r="26" stroke-width="1.25" transform="rotate(-90 28 28)"/>' +
      '<path class="gbb-booked-tick" d="M17.5 28.5 24.5 35.5 38.5 20.5" stroke-width="1.75"/>' +
    '</svg>';

  /* ---------------- ДАННЫЕ ЛАЙВА ---------------- */

  /* Ротация плейсхолдера в textarea — живой паттерн страницы: семь
     строк снято подряд с одного оборота (Playwright, 25.08),
     восьмая — с харвест-скрина 13:13 того же дня. Интервал живой
     ротации на глаз ~4s; берём его. */
  var PLACEHOLDERS = [
    'Ex: I need 50 gifts for c-suite executives for a conference in two weeks',
    'Ex: We want to gift to every new client that we onboard',
    'Ex: We are looking to integrate gifting as a process into our sales pipeline',
    'Ex: I need to send 20 gifts per month to new hires when they come on board',
    'Ex: Gifting to clients at the time of delivery of their new aircraft',
    'Ex: I need 5 beautifully designed gifts per month sent to new high value prospects',
    'Ex: I want to gift on demand to every new listing that lists with us.',
    'Ex: I need closing gifts sent one at a time, directly to each buyer right after they close on their home'
  ];
  var PLACEHOLDER_MS = 4000;

  /* Минимальный список стран: США по умолчанию плюс восемь, куда
     GildedBox отправляет чаще всего. Флагов нет (растровые эмодзи и
     иконошрифты в систему не переносятся) — код и название. */
  var COUNTRIES = [
    { code: '+1',  name: 'United States' },
    { code: '+1',  name: 'Canada' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+353', name: 'Ireland' },
    { code: '+61', name: 'Australia' },
    { code: '+49', name: 'Germany' },
    { code: '+33', name: 'France' },
    { code: '+34', name: 'Spain' },
    { code: '+972', name: 'Israel' }
  ];

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ТЕКСТЫ ОШИБОК ЖИВОЙ ФОРМЫ, ДОСЛОВНО (прибор 27.08: пустой
     сабмит и сабмит с «nope» в e-mail, четыре ширины).

     Регистр НЕ выправляется, и это осознанно. Копи-правило системы
     (Тон-9: входящее приводится к нашим правилам) действует на
     тексты, которые мы ПИШЕМ. Здесь мы ничего не пишем: Live-
     страница воспроизводит опубликованную страницу клиента, и
     сообщение «this is a required field» со строчной буквы — часть
     того, что на ней стоит сегодня. Тон 27.08: «Раз мы имитируем
     live, должно быть как там». Правка регистра — отдельное решение
     по живой странице, не по нашей копии.

     РАЗОШЛОСЬ С gbppl-demo-polish-1 (та же дата, встречная волна), и
     запись остаётся, чтобы находка не потерялась. Она дала телефону
     и имени СВОИ сообщения («Phone number is required», «Full name
     is required»), потому что три пустых поля отвечали одной именной
     строкой и двумя безымянными. Наблюдение верное, но безымянная
     строка здесь — ровно то, что печатает живая форма обоим полям, и
     решение Тона 27.08 по шагу 1 сильнее нашей копи-нормы. Именные
     формулировки вернутся, если Тон решит выправлять саму живую
     страницу; на других формах системы (гостевая авторизация) свои
     живые тексты, и их эта волна не трогала. */
  var ERR_REQUIRED = 'this is a required field';    /* LIVE 27.08 */
  var ERR_EMAIL_EMPTY = 'Email is required';        /* LIVE 27.08 */
  var ERR_EMAIL_BAD = 'this must be a valid email'; /* LIVE 27.08 */

  /* ---------------- ПРАВИЛА ВСТРЕЧИ ---------------- */

  var HOST_TZ    = 'America/Chicago';
  var DAY_START  = 9 * 60;    /* 09:00 по Чикаго */
  var DAY_END    = 17 * 60;   /* 17:00, последний старт 16:45 */
  var SLOT_MIN   = 15;
  var WINDOW_DAYS = 21;       /* окно три недели */

  /* ---------------- ВРЕМЯ В ЧУЖОЙ ЗОНЕ ----------------
     Библиотек в системе нет, и не надо: Intl умеет всё, что нужно.
     Смещение зоны в конкретный миг = разница между «часами этой
     зоны, прочитанными как UTC» и самим мигом; обратный ход (стенные
     часы Чикаго -> момент времени) делается двумя приближениями,
     второе ловит переход на летнее время. */
  function zonedParts(tz, date) {
    var p = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).formatToParts(date).reduce(function (acc, part) {
      acc[part.type] = part.value; return acc;
    }, {});
    return {
      y: +p.year, m: +p.month, d: +p.day,
      h: +p.hour % 24, mi: +p.minute, s: +p.second
    };
  }
  function zoneOffsetMs(tz, date) {
    var p = zonedParts(tz, date);
    return Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi, p.s) - date.getTime();
  }
  function fromZoned(tz, y, m, d, h, mi) {
    var guess = Date.UTC(y, m - 1, d, h, mi);
    var off = zoneOffsetMs(tz, new Date(guess));
    off = zoneOffsetMs(tz, new Date(guess - off));
    return new Date(guess - off);
  }
  function fmt(date, tz, opts) {
    opts = Object.assign({ timeZone: tz }, opts);
    return new Intl.DateTimeFormat('en-US', opts).format(date);
  }
  function fmtTime(date, tz) { return fmt(date, tz, { hour: 'numeric', minute: '2-digit' }); }
  function fmtDateLong(date, tz) {
    return fmt(date, tz, { weekday: 'long', month: 'long', day: 'numeric' });
  }
  function tzAbbr(date, tz) {
    var parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' })
      .formatToParts(date);
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === 'timeZoneName') return parts[i].value;
    }
    return '';
  }
  function guestZone() {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || HOST_TZ; }
    catch (e) { return HOST_TZ; }
  }
  function zoneLabel(tz) { return String(tz).replace(/_/g, ' '); }
  /* Ключ дня 'YYYY-MM-DD' — им сходятся календарь и список слотов. */
  function dayKey(y, m, d) {
    return y + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
  }
  function dayKeyOf(date, tz) {
    var p = zonedParts(tz, date);
    return dayKey(p.y, p.m, p.d);
  }

  /* ---------------- ADAPTER: ЗДЕСЬ CALENDLY / HUBSPOT API --------
     Три метода, за которыми прячется весь внешний мир. Прототипная
     реализация: промисы с задержкой и слоты, сгенерированные по
     правилам встречи. Настоящая подстановка меняет ТОЛЬКО тела:

       submitLead(data)      POST лида в CRM, отдаёт {id}
       fetchSlots(range)     GET свободных слотов на окно, отдаёт
                             массив ISO-строк начала встречи
       book(slot, data)      POST брони, отдаёт {id, joinUrl}
  */
  var adapter = {
    delay: 420,

    submitLead: function (data) {
      var self = this;
      return new Promise(function (resolve) {
        setTimeout(function () {
          /* здесь Calendly/HubSpot API: POST /contacts */
          resolve({ id: 'lead-' + Date.now(), data: data });
        }, self.delay);
      });
    },

    /* range = {from: Date, to: Date}. Слоты считаются по стенным
       часам Чикаго, поэтому переход на летнее время внутри окна
       ничего не сдвигает: 9:00 остаётся 9:00. */
    fetchSlots: function (range) {
      var self = this;
      return new Promise(function (resolve) {
        setTimeout(function () {
          /* здесь Calendly/HubSpot API: GET /meetings/availability */
          var out = [];
          var start = zonedParts(HOST_TZ, range.from);
          var baseUTC = Date.UTC(start.y, start.m - 1, start.d);
          for (var i = 0; i < WINDOW_DAYS; i++) {
            var cur = new Date(baseUTC + i * 86400000);
            var wd = cur.getUTCDay();
            if (wd === 0 || wd === 6) continue;          /* выходные закрыты */
            var y = cur.getUTCFullYear(), m = cur.getUTCMonth() + 1, d = cur.getUTCDate();
            for (var min = DAY_START; min + SLOT_MIN <= DAY_END; min += SLOT_MIN) {
              var when = fromZoned(HOST_TZ, y, m, d, Math.floor(min / 60), min % 60);
              if (when.getTime() <= range.from.getTime()) continue;  /* прошлое закрыто */
              if (when.getTime() > range.to.getTime()) continue;
              out.push(when.toISOString());
            }
          }
          resolve(out);
        }, self.delay);
      });
    },

    book: function (slotISO, data) {
      var self = this;
      return new Promise(function (resolve) {
        setTimeout(function () {
          /* здесь Calendly/HubSpot API: POST /meetings */
          resolve({ id: 'mtg-' + Date.now(), slot: slotISO, data: data });
        }, self.delay);
      });
    }
  };

  /* ---------------- КНОПКА ФОРМЫ ----------------
     Организм .gb-btn (лестница L, полная ширина), плюс .gba-submit —
     отступ формы от поля до сабмита, которым владеет auth.css.
     gbppl-button-2, 26.08: раньше это была .gba-btn той же auth,
     те же цифры под старым именем. Потребитель носит классы и
     своих правил не заводит. */
  /* gbppl-booking-4: три необязательные оси. size — какая лестница
     организма. bare — снять .gba-submit: отступ от поля к кнопке
     принадлежит форме, а у живой лид-формы его нет, там кнопка стоит
     в своём ряду .gbb-leadcta. icon:false — у живой кнопки CONTINUE
     стрелки нет; у наших Confirm и Book она осталась.
     gbppl-booking-polish-1 (01.09): size у Continue вернулся на L,
     см. вызов ниже. Все три сабмита флоу снова на одной лестнице. */
  function btnHTML(label, opts) {
    opts = opts || {};
    var icon = opts.icon === false
      ? ''
      : '<span class="gb-btn__icon">' + ICON_ARROW + '</span>';
    return (
      '<button type="' + (opts.type || 'button') + '" aria-label="' + esc(label) + '"' +
        (opts.disabled ? ' disabled' : '') +
        (opts.id ? ' data-role="' + opts.id + '"' : '') +
        ' class="gb-btn gb-btn--' + (opts.size || 'large') +
          ' gb-btn--filled gb-btn--primary gb-btn--block' +
          (opts.bare ? '' : ' gba-submit') + '">' +
        icon +
        '<span class="gb-btn__label">' + esc(label) + '</span>' +
      '</button>'
    );
  }

  /* ---------------- ИНДИКАТОР ШАГА ---------------- */

  /* Дорога у гостя и у своего РАЗНОЙ длины (Тон, 25.08: «когда ты
     уже внутри портала, мы не показываем форму, а сразу показываем
     слот, потому что уже знаем, кто ты»), поэтому имён два набора,
     и индикатор рисует ровно тот, по которому идут. */
  var STEP_NAMES = ['Details', 'Pick a time', 'Confirmed'];
  var STEP_NAMES_KNOWN = ['Pick a time', 'Confirmed'];

  function stepsHTML(active, names) {
    var html = '';
    for (var i = 0; i < names.length; i++) {
      var state = i === active ? ' is-now' : (i < active ? ' is-done' : '');
      html +=
        '<span class="gbb-step' + state + '"' +
          (i === active ? ' aria-current="step"' : '') + '>' +
          '<span class="gbb-step-dot" aria-hidden="true">' + (i + 1) + '</span>' +
          '<span class="gb-eyebrow gbb-step-name">' + esc(names[i]) + '</span>' +
        '</span>';
      if (i < names.length - 1) html += '<span class="gbb-step-rail" aria-hidden="true"></span>';
    }
    return '<div class="gbb-steps" role="group" aria-label="Booking steps">' + html + '</div>';
  }

  /* ---------------- ШАГ 1: ЛИД-ФОРМА ---------------- */

  var STEP1_TEMPLATE = function (values) {
    var options = '';
    for (var i = 0; i < COUNTRIES.length; i++) {
      options +=
        '<button class="gbb-phone-option" type="button" role="option"' +
          ' aria-selected="' + (i === 0 ? 'true' : 'false') + '" data-country="' + i + '">' +
          '<span>' + esc(COUNTRIES[i].name) + '</span>' +
          '<span>' + esc(COUNTRIES[i].code) + '</span>' +
        '</button>';
    }
    /* Отступ между полями живой формы: mb-6 / md:mb-8 / xl:mb-10 =
       24 / 32 / 40. У auth.css это ровно .gba-field--flow, заводить
       второе имя незачем (LIVE 27.08). */
    var FLOW = ' wrap-mod="gba-field--flow" label-style="floating"';
    return (
      '<div class="gbb-panel">' +
        /* Заголовка у живой карточки НЕТ: она открывается сразу
           полем Email. Наш h2 «Tell us about yourself» снят вместе с
           правилом компакта, которое его прятало (gbppl-booking-4). */
        '<form novalidate class="gba-form gbb-lead" autocomplete="on" data-role="form">' +
          '<gb-field input-id="gbb_email" name="email" type="email" label="Email"' + FLOW +
            ' autocomplete="email"' +
            (values.email ? ' value="' + esc(values.email) + '"' : '') + '></gb-field>' +

          /* Телефон: живое поле — одна подчёркнутая строка, слева код
             страны, справа номер. Собрано разметкой, а не <gb-field>,
             потому что внутри строки живут два контрола; классы поля
             и плавающий лейбл те же самые, .gbb-phone держит строку.
             Плейсхолдер в один пробел — служебный, как у <gb-field>
             в floating: без него :placeholder-shown не работает и
             лейбл не поднимается (gbppl-field-floating-1). */
          '<div class="input-field col active staticLabel required gba-field' +
              ' gba-field--floating gba-field--flow gbb-phone-field" data-role="phone-field">' +
            '<div class="relative gba-inputwrap gbb-phone" data-role="phone">' +
              '<button class="gbb-phone-trigger" type="button" data-role="phone-trigger"' +
                ' aria-haspopup="listbox" aria-expanded="false" aria-label="Country calling code">' +
                '<span data-role="phone-code">' + esc(COUNTRIES[0].code) + '</span>' + ICON_CARET +
              '</button>' +
              '<input type="tel" name="phone" id="gbb_phone" autocomplete="tel"' +
                ' placeholder=" " class="valid browser-default gba-input"' +
                (values.phone ? ' value="' + esc(values.phone) + '"' : '') + '>' +
              '<label for="gbb_phone" class="active gba-label">Phone</label>' +
              '<div class="gbb-phone-menu" role="listbox" aria-label="Country" data-role="phone-menu" hidden>' +
                options +
              '</div>' +
            '</div>' +
          '</div>' +

          /* Имена полей — живые дословно: «Your Name», «Company Name»
             и вопрос комментария целиком (LIVE 27.08). Company без
             звёздочки: у живой обёртки нет класса required. */
          '<gb-field input-id="gbb_name" name="name" type="text" label="Your Name"' + FLOW +
            ' autocomplete="name"' +
            (values.name ? ' value="' + esc(values.name) + '"' : '') + '></gb-field>' +
          '<gb-field input-id="gbb_company" name="company" type="text" label="Company Name"' + FLOW +
            ' autocomplete="organization" optional' +
            (values.company ? ' value="' + esc(values.company) + '"' : '') + '></gb-field>' +
          '<gb-field input-id="gbb_brief" name="brief" type="textarea"' + FLOW +
            ' label="How can GildedBox help with gifting in your business?"' +
            ' placeholder="" autocomplete="off" optional' +
            (values.brief ? ' value="' + esc(values.brief) + '"' : '') + '></gb-field>' +
        '</form>' +
        /* Ряд кнопки: живой div.flex.items-center, кнопка flex-auto.

           ЛЕСТНИЦА L, И ЭТО СЛОВО ТОНА (gbppl-booking-polish-1,
           01.09, дословно): «Кнопка Continue: какая-то несистемная,
           слишком маленький текст. Должна быть большая обычная
           кнопка, высотой 64px (или сколько там у нас по системе).»
           Живая кнопка стояла на S (36 / 42 с 1280 / 48 с 2000,
           лейбл 11 / 12 с 2000) — замер 27.08, и до 01.09 её держал
           замок «Live имитирует лайв целиком». Сабмит формы в системе
           это L (48 / 56 с 1280 / 64 с 2000, лейбл 14 / 15 с 640 / 16
           с 2000) — та же лестница, что носит сабмит дровера входа
           (auth.js formButtonHTML). На экране Тона (~2026px) L даёт
           ровно 64, то самое число, которое он назвал. Отклонение от
           лайва осознанное и объявлено самим Тоном (Тон-17).
           Стрелки у живой кнопки нет, поэтому и у нашей её нет:
           этой оси фидбек не касался. */
        '<div class="gbb-leadcta">' +
          btnHTML('Continue', { id: 'continue', size: 'large', bare: true, icon: false }) +
        '</div>' +
      '</div>'
    );
  };

  /* ---------------- ШАГ 2: КАЛЕНДАРЬ И СЛОТЫ ---------------- */

  var STEP2_TEMPLATE = function (known) {
    return (
      '<div class="gbb-panel">' +
        '<header class="gbb-head">' +
          '<h2 class="gbb-title">Pick a time</h2>' +
          '<p class="gbb-sub">15 minutes with a gifting specialist, on Zoom.</p>' +
        '</header>' +
        '<div class="gbb-cal-head">' +
          '<span class="gbb-cal-month" data-role="month">&nbsp;</span>' +
          '<span class="gbb-cal-arrows">' +
            '<button class="gbb-cal-arrow" type="button" data-role="prev" aria-label="Previous month">' + ICON_PREV + '</button>' +
            '<button class="gbb-cal-arrow" type="button" data-role="next" aria-label="Next month">' + ICON_NEXT + '</button>' +
          '</span>' +
        '</div>' +
        '<div class="gbb-cal-grid" data-role="grid"></div>' +
        '<p class="gb-eyebrow gbb-slot-label" data-role="slot-label">Time, Central</p>' +
        '<div data-role="slots"></div>' +
        '<p class="gbb-tz" data-role="tz"></p>' +
        btnHTML('Confirm', { id: 'confirm', disabled: true }) +
        /* Дорога назад существует, только если сзади есть шаг:
           своему возвращаться некуда, форму он не заполнял. */
        (known ? '' :
          '<div class="gbb-exits">' +
            '<button class="gbb-quiet" type="button" data-role="back">Back to your details</button>' +
          '</div>') +
      '</div>'
    );
  };

  /* ---------------- ШАГ 3: КОНФИРМАЦИЯ ---------------- */

  /* Лейбл тихого выхода задаёт ХОЗЯИН (exit-label, gbppl-booking-3):
     на своей странице это «Back to site», в попапе портала «Back to
     portal», и врать про уход с сайта из окна больше не нужно. */
  var EXIT_LABEL = 'Back to site';

  var STEP3_TEMPLATE = function (view, siteHref, exitLabel) {
    return (
      '<div class="gbb-panel gbb-booked">' +
        ICON_CHECK +
        '<h2 class="gbb-booked-title">You’re booked</h2>' +
        '<p class="gbb-booked-when">' + esc(view.when) + '</p>' +
        '<div class="gbb-sum">' +
          '<div class="gbb-sum-row">' +
            '<span class="gb-eyebrow gbb-sum-key">When</span>' +
            '<span class="gbb-sum-val">' + esc(view.hostLine) +
              (view.guestLine ? '<span>' + esc(view.guestLine) + '</span>' : '') +
            '</span>' +
          '</div>' +
          '<div class="gbb-sum-row">' +
            '<span class="gb-eyebrow gbb-sum-key">Meeting</span>' +
            '<span class="gbb-sum-val">15 minutes · Zoom</span>' +
          '</div>' +
          '<div class="gbb-sum-row">' +
            '<span class="gb-eyebrow gbb-sum-key">With</span>' +
            '<span class="gbb-sum-val">' + esc(view.name) +
              '<span>' + esc(view.email) + '</span>' +
            '</span>' +
          '</div>' +
        '</div>' +
        '<div class="gbb-exits">' +
          /* Заглушка: настоящий .ics придёт вместе с API. */
          '<button class="gbb-quiet" type="button" data-role="ics">Add to calendar</button>' +
          '<span class="gbb-exit-dot" aria-hidden="true">·</span>' +
          '<a class="gbb-quiet" data-role="exit" href="' + esc(siteHref) + '">' +
            esc(exitLabel) + '</a>' +
        '</div>' +
        '<p class="gbb-note">Nothing is sent and nothing is scheduled yet.</p>' +
      '</div>'
    );
  };

  /* ---------------- ЭЛЕМЕНТ ---------------- */

  class GbBookingFlow extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      this.classList.add('gbb-flow');
      this.__lead = { email: '', phone: '', name: '', company: '', brief: '' };
      this.__country = 0;
      this.__submitted = false;      /* ошибки живут только после сабмита */
      this.__slots = null;           /* ISO-строки окна, кэш ответа adapter */
      this.__pickedDay = null;       /* 'YYYY-MM-DD' */
      this.__pickedSlot = null;      /* ISO */
      this.__guestTz = guestZone();

      /* РЕЖИМ СВОЕГО (start="slot"). Публичная страница ничего не
         знает о посетителе и начинает с формы; портал знает, и
         спрашивать имя у залогиненного — потеря шага. Имя, почта и
         компания приезжают атрибутами guest-* или методом
         prefill() (когда данные приходят из состояния приложения, а
         не из разметки). */
      this.__known = this.getAttribute('start') === 'slot';
      this.__names = this.__known ? STEP_NAMES_KNOWN : STEP_NAMES;
      this.__lead.name = this.getAttribute('guest-name') || '';
      this.__lead.email = this.getAttribute('guest-email') || '';
      this.__lead.company = this.getAttribute('guest-company') || '';
      this.__lead.phone = this.getAttribute('guest-phone') || '';
      /* Зерно: то, что хозяин знает О ГОСТЕ. Печатанное гостем в него
         не входит и сброс его не переживает (gbppl-booking-3). */
      this.__seed = Object.assign({}, this.__lead);

      if (this.__known) this.renderStep2(); else this.renderStep1();
    }

    /* Предзаполнение из кода: тот же смысл, что у guest-* атрибутов,
       но для хоста, у которого профиль лежит в состоянии, а не в
       HTML. Вызванный на шаге 1, перерисовывает его с данными. */
    prefill(data) {
      Object.assign(this.__lead, data || {});
      this.__seed = Object.assign({}, this.__seed, data || {});
      if (!this.__known && this.querySelector('#gbb_email')) this.renderStep1();
    }

    /* НАЧАТЬ СНАЧАЛА (gbppl-booking-3). Хост, который держит флоу в
       окне, а не на странице, не может увести гостя навигацией:
       окно закрывается и открывается снова, и второй заход обязан
       встретить чистый календарь, а не конфирмацию, прочитанную
       минуту назад. Раньше хозяину оставалось поставить новый
       элемент на место отработавшего; теперь он просит организм.
       Сбрасывается ВЫБОР и ввод; остаётся то, что хозяин сообщил о
       госте (guest-* и prefill). Кэш слотов гасится нарочно: за
       время, пока окно было закрыто, ближайшие слоты могли уйти в
       прошлое, и renderStep2 спрашивает окно заново.
       __painted сбрасывается вместе со всем: первая отрисовка
       после сброса не должна тащить страницу скроллом — на неё
       только что вернулись, как на первую. */
    restart() {
      if (!this.__rendered) return;   /* ещё не в документе, сбрасывать нечего */
      clearInterval(this.__phTimer);
      this.__lead = Object.assign({}, this.__seed);
      this.__country = 0;
      this.__submitted = false;
      this.__slots = null;
      this.__pickedDay = null;
      this.__pickedSlot = null;
      this.__painted = false;
      if (this.__known) this.renderStep2(); else this.renderStep1();
      this.dispatchEvent(new CustomEvent('gbb:reset', { bubbles: true }));
    }

    /* Адаптер вынесен наружу: страница или тест может подменить его
       целиком, ничего не зная про шаги. */
    get adapter() { return this.__adapter || adapter; }
    set adapter(a) { this.__adapter = a; }

    /* Шаг сменился — верх флоу возвращается под шапку. Без этого
       гость, нажавший Confirm внизу длинного списка слотов, видит
       не «You’re booked», а подвал карточки: следующий шаг короче
       предыдущего, и страница остаётся прокрученной туда, где
       больше ничего нет. Первая отрисовка не двигает страницу — на
       неё только что пришли. */
    paint(active, html) {
      this.innerHTML = stepsHTML(active, this.__names) + html;
      if (!this.__painted) { this.__painted = true; return; }
      var top = this.getBoundingClientRect().top;
      var bar = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-h'), 10) || 80;
      if (top > bar && top < window.innerHeight * 0.5) return;
      window.scrollTo({ top: window.scrollY + top - bar - 24, behavior: 'smooth' });
    }
    role(name) { return this.querySelector('[data-role="' + name + '"]'); }

    /* ============ ШАГ 1 ============ */

    renderStep1() {
      this.paint(0, STEP1_TEMPLATE(this.__lead));
      var self = this;

      /* Ротация плейсхолдера — живой паттерн страницы. Стартуем со
         случайной строки, как лайв, и идём по кругу. */
      var brief = this.querySelector('#gbb_brief');
      if (brief) {
        var i = Math.floor(Math.random() * PLACEHOLDERS.length);
        brief.setAttribute('placeholder', PLACEHOLDERS[i]);
        clearInterval(this.__phTimer);
        this.__phTimer = setInterval(function () {
          if (!document.body.contains(brief)) { clearInterval(self.__phTimer); return; }
          i = (i + 1) % PLACEHOLDERS.length;
          brief.setAttribute('placeholder', PLACEHOLDERS[i]);
        }, PLACEHOLDER_MS);

        /* Рост по содержимому (gbppl-booking-4). Живой textarea стоит
           с overflow-hidden и height, переписанной скриптом: замер
           27.08 показал height 86 / 91 с 1280 / 101 с 2000 на пустом
           поле — это его rows=3, а не min-h 80. Считаем так же:
           обнулить высоту, взять scrollHeight. Первый расчёт после
           отрисовки, дальше на каждый ввод. */
        var grow = function () {
          brief.style.height = 'auto';
          brief.style.height = brief.scrollHeight + 'px';
        };
        brief.addEventListener('input', grow);
        grow();
        this.__briefGrow = grow;
      }

      this.__wirePhoneMenu();

      /* Валидация по сабмиту; после первого сабмита поле чинится по
         вводу (живая форма стоит с validate-on-input). */
      var form = this.role('form');
      form.addEventListener('input', function () {
        if (self.__submitted) self.validateStep1(false);
      });
      form.addEventListener('submit', function (e) { e.preventDefault(); });

      this.role('continue').addEventListener('click', function () {
        self.__submitted = true;
        if (!self.validateStep1(true)) return;
        var btn = this;
        btn.disabled = true;
        self.readLead();
        self.adapter.submitLead(self.__lead).then(function () {
          clearInterval(self.__phTimer);
          self.renderStep2();
        });
      });
    }

    field(id) { return this.querySelector('gb-field[input-id="' + id + '"]'); }

    readLead() {
      var v = function (sel) {
        var el = this.querySelector(sel);
        return el ? el.value.trim() : '';
      }.bind(this);
      this.__lead = {
        email: v('#gbb_email'),
        phone: v('#gbb_phone'),
        country: COUNTRIES[this.__country].code,
        name: v('#gbb_name'),
        company: v('#gbb_company'),
        brief: v('#gbb_brief')
      };
    }

    /* Три обязательных поля лайва. focusFirst — ставить ли каретку в
       первое сломанное (по сабмиту да, по вводу нет). */
    validateStep1(focusFirst) {
      var ok = true, first = null;

      var email = this.field('gbb_email');
      var value = email.input.value.trim();
      if (!value) { email.setError(ERR_EMAIL_EMPTY); ok = false; first = first || email.input; }
      else if (!EMAIL_RE.test(value)) { email.setError(ERR_EMAIL_BAD); ok = false; first = first || email.input; }
      else email.clearError();

      var phoneWrap = this.role('phone-field');
      var phoneInput = this.querySelector('#gbb_phone');
      var phoneOld = phoneWrap.querySelector('.gba-error');
      if (phoneOld) phoneOld.remove();
      if (!phoneInput.value.trim()) {
        phoneInput.classList.add('invalid');
        this.role('phone').classList.add('invalid');
        var span = document.createElement('span');
        span.setAttribute('role', 'alert');
        span.className = 'gba-error';
        span.textContent = ERR_REQUIRED;
        phoneWrap.appendChild(span);
        ok = false; first = first || phoneInput;
      } else {
        phoneInput.classList.remove('invalid');
        this.role('phone').classList.remove('invalid');
      }

      var name = this.field('gbb_name');
      if (!name.input.value.trim()) { name.setError(ERR_REQUIRED); ok = false; first = first || name.input; }
      else name.clearError();

      if (!ok && focusFirst && first) first.focus();
      return ok;
    }

    __wirePhoneMenu() {
      var self = this;
      var trigger = this.role('phone-trigger');
      var menu = this.role('phone-menu');
      var codeOut = this.role('phone-code');

      function close() { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); }
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = menu.hidden;
        menu.hidden = !open;
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      menu.addEventListener('click', function (e) {
        var opt = e.target.closest ? e.target.closest('.gbb-phone-option') : null;
        if (!opt) return;
        self.__country = +opt.getAttribute('data-country');
        codeOut.textContent = COUNTRIES[self.__country].code;
        var all = menu.querySelectorAll('.gbb-phone-option');
        for (var i = 0; i < all.length; i++) {
          all[i].setAttribute('aria-selected', i === self.__country ? 'true' : 'false');
        }
        close();
        self.querySelector('#gbb_phone').focus();
      });
      /* Клик мимо и Escape закрывают список. Слушатели на документе
         вешаются ОДИН раз на весь срок элемента: шаг 1 можно открыть
         снова кнопкой Back, и без этого флага каждый заход добавлял
         бы ещё одну пару. Живой список ищется заново при каждом
         событии, поэтому пере-рендер шага их не ломает. */
      if (this.__docWired) return;
      this.__docWired = true;
      document.addEventListener('click', function (e) {
        var m = self.role('phone-menu'), row = self.role('phone');
        if (!m || m.hidden || !row) return;
        if (!row.contains(e.target)) {
          m.hidden = true;
          self.role('phone-trigger').setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', function (e) {
        var m = self.role('phone-menu');
        if (e.key !== 'Escape' || !m || m.hidden) return;
        m.hidden = true;
        self.role('phone-trigger').setAttribute('aria-expanded', 'false');
      });
    }

    /* ============ ШАГ 2 ============ */

    renderStep2() {
      this.paint(this.__known ? 0 : 1, STEP2_TEMPLATE(this.__known));
      var self = this;
      this.__pickedDay = null;
      this.__pickedSlot = null;

      var now = new Date();
      var today = zonedParts(HOST_TZ, now);
      this.__view = { y: today.y, m: today.m };
      this.__today = today;

      this.role('prev').addEventListener('click', function () { self.stepMonth(-1); });
      this.role('next').addEventListener('click', function () { self.stepMonth(1); });
      var back = this.role('back');
      if (back) back.addEventListener('click', function () { self.renderStep1(); });
      this.role('confirm').addEventListener('click', function () {
        if (this.disabled || !self.__pickedSlot) return;
        var btn = this;
        btn.disabled = true;
        self.adapter.book(self.__pickedSlot, self.__lead).then(function () {
          self.renderStep3(self.__pickedSlot);
        });
      });

      this.paintSlots(null);
      this.paintTz();

      /* Окно спрашивается у адаптера один раз: календарь и слоты
         рисуются из одного ответа, поэтому «какие дни открыты»
         нигде не считается второй раз. */
      var from = now;
      var to = new Date(now.getTime() + WINDOW_DAYS * 86400000);
      this.adapter.fetchSlots({ from: from, to: to }).then(function (list) {
        self.__slots = {};
        for (var i = 0; i < list.length; i++) {
          var iso = list[i];
          var key = dayKeyOf(new Date(iso), HOST_TZ);
          (self.__slots[key] = self.__slots[key] || []).push(iso);
        }
        self.paintMonth();
      });
    }

    monthOpen(y, m) {
      if (!this.__slots) return false;
      for (var key in this.__slots) {
        if (+key.slice(0, 4) === y && +key.slice(5, 7) === m) return true;
      }
      return false;
    }

    stepMonth(dir) {
      var m = this.__view.m + dir, y = this.__view.y;
      if (m < 1) { m = 12; y -= 1; }
      if (m > 12) { m = 1; y += 1; }
      this.__view = { y: y, m: m };
      this.paintMonth();
    }

    paintMonth() {
      var v = this.__view;
      var grid = this.role('grid');
      this.role('month').textContent =
        fmt(fromZoned(HOST_TZ, v.y, v.m, 1, 12, 0), HOST_TZ, { month: 'long', year: 'numeric' });

      var dows = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      var html = '';
      for (var i = 0; i < 7; i++) html += '<span class="gb-eyebrow gbb-dow">' + dows[i] + '</span>';
      var lead = new Date(Date.UTC(v.y, v.m - 1, 1)).getUTCDay();
      for (var b = 0; b < lead; b++) html += '<span></span>';
      var days = new Date(Date.UTC(v.y, v.m, 0)).getUTCDate();
      for (var n = 1; n <= days; n++) {
        var key = dayKey(v.y, v.m, n);
        var open = !!(this.__slots && this.__slots[key] && this.__slots[key].length);
        html +=
          '<button class="gbb-day' + (this.__pickedDay === key ? ' sel' : '') + '" type="button"' +
            ' data-day="' + key + '"' + (open ? '' : ' disabled') + '>' + n + '</button>';
      }
      grid.innerHTML = html;

      /* Стрелки живут по окну: за его край месяцев нет. */
      this.role('prev').disabled = !this.monthOpen(v.m === 1 ? v.y - 1 : v.y, v.m === 1 ? 12 : v.m - 1);
      this.role('next').disabled = !this.monthOpen(v.m === 12 ? v.y + 1 : v.y, v.m === 12 ? 1 : v.m + 1);

      var self = this;
      grid.onclick = function (e) {
        var cell = e.target.closest ? e.target.closest('.gbb-day') : null;
        if (!cell || cell.disabled) return;
        var all = grid.querySelectorAll('.gbb-day');
        for (var i = 0; i < all.length; i++) all[i].classList.remove('sel');
        cell.classList.add('sel');
        self.__pickedDay = cell.getAttribute('data-day');
        self.__pickedSlot = null;
        self.paintSlots(self.__pickedDay);
        self.paintTz();
        self.syncConfirm();
      };
    }

    paintSlots(key) {
      var box = this.role('slots');
      var list = key && this.__slots ? this.__slots[key] : null;
      if (!list || !list.length) {
        box.className = '';
        box.innerHTML = '<p class="gbb-slots-empty">Pick a day to see the open times.</p>';
        return;
      }
      var html = '';
      for (var i = 0; i < list.length; i++) {
        html += '<button class="gbb-slot" type="button" data-slot="' + list[i] + '">' +
          esc(fmtTime(new Date(list[i]), HOST_TZ)) + '</button>';
      }
      box.className = 'gbb-slots';
      box.innerHTML = html;

      var self = this;
      box.onclick = function (e) {
        var chip = e.target.closest ? e.target.closest('.gbb-slot') : null;
        if (!chip) return;
        var all = box.querySelectorAll('.gbb-slot');
        for (var i = 0; i < all.length; i++) all[i].classList.remove('sel');
        chip.classList.add('sel');
        self.__pickedSlot = chip.getAttribute('data-slot');
        self.paintTz();
        self.syncConfirm();
      };
    }

    /* Две зоны всегда на виду: Чикаго — часы встречи, вторая строка
       — часы гостя. Совпали зоны, второй строки нет. */
    paintTz() {
      var out = this.role('tz');
      var sameZone = this.__guestTz === HOST_TZ;
      if (!this.__pickedSlot) {
        out.innerHTML = 'Times are shown in Central time (Chicago).' +
          (sameZone ? '' : ' Your time zone is ' + esc(zoneLabel(this.__guestTz)) + '.');
        return;
      }
      var when = new Date(this.__pickedSlot);
      var host = fmtTime(when, HOST_TZ) + ' ' + tzAbbr(when, HOST_TZ);
      if (sameZone) {
        out.innerHTML = '<strong>' + esc(host) + '</strong> on ' + esc(fmtDateLong(when, HOST_TZ)) + '.';
        return;
      }
      out.innerHTML = '<strong>' + esc(host) + '</strong> on ' + esc(fmtDateLong(when, HOST_TZ)) +
        ', which is <strong>' + esc(fmtTime(when, this.__guestTz)) + '</strong> in ' +
        esc(zoneLabel(this.__guestTz)) + '.';
    }

    syncConfirm() {
      this.role('confirm').disabled = !(this.__pickedDay && this.__pickedSlot);
    }

    /* ============ ШАГ 3 ============ */

    renderStep3(iso) {
      var when = new Date(iso);
      var sameZone = this.__guestTz === HOST_TZ;
      var view = {
        when: fmtDateLong(when, HOST_TZ) + ' · ' + fmtTime(when, HOST_TZ),
        hostLine: fmtTime(when, HOST_TZ) + ' ' + tzAbbr(when, HOST_TZ) + ', Chicago',
        guestLine: sameZone ? '' : fmtTime(when, this.__guestTz) + ' in ' + zoneLabel(this.__guestTz),
        name: this.__lead.name || 'You',
        email: this.__lead.email
      };
      var href = this.getAttribute('site-href') || '#';
      this.paint(this.__known ? 1 : 2,
        STEP3_TEMPLATE(view, href, this.getAttribute('exit-label') || EXIT_LABEL));

      /* Заглушка «Add to calendar»: .ics соберётся вместе с API,
         сейчас ссылка честно ничего не делает. */
      var ics = this.role('ics');
      if (ics) ics.addEventListener('click', function () { /* здесь .ics из ответа book() */ });

      /* ВЫХОД ПОСЛЕДНЕГО ШАГА (gbppl-booking-3). На своей странице
         это ссылка и ничего больше: гость уходит по site-href. В
         чужом окне тот же жест значит «закрой окно», и хозяину
         нужно место, где это сказать, — отменяемое событие. Гасит
         дефолт: навигации нет, дальше распоряжается хозяин. Не
         гасит (или хозяина нет): ссылка ведёт себя как ссылка. */
      var self = this;
      var exit = this.role('exit');
      if (exit) exit.addEventListener('click', function (e) {
        var go = self.dispatchEvent(new CustomEvent('gbb:exit', {
          bubbles: true, cancelable: true, detail: { href: href }
        }));
        if (!go) e.preventDefault();
      });

      this.dispatchEvent(new CustomEvent('gbb:booked', {
        bubbles: true,
        detail: { slot: iso, lead: this.__lead }
      }));
    }
  }

  if (!customElements.get('gb-booking-flow')) {
    customElements.define('gb-booking-flow', GbBookingFlow);
  }
})();
