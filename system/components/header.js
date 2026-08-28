/* ============================================================
   DEMO COMPONENT: SITE HEADER, JS-шаблон
   ------------------------------------------------------------
   Регистрирует <gb-site-header>: инжектит разметку хедера
   (перенос аппрувнутого блока прототипа site\index.html один в
   один; лейблы кнопок живут во внутреннем span с живой PrimeVue
   анатомией span[data-pc-section="label"], harvest public-home
   2026-08-17). Страницы не дублируют HTML руками.
   Никаких fetch-инклюдов: работает с file:// и на GitHub Pages.
   Путь к логотипу переопределяется атрибутом logo-src
   (по умолчанию assets/gildedbox-logo.svg от страницы demo\).
   Путь к странице категорий — атрибутом catalog-href (по умолчанию
   catalog/index.html, как видит её live\checkout.html); каждая
   страница-потребитель прописывает его явно, глубина у всех разная.
   Путь к порталу — атрибутом portal-href (по умолчанию "#": кнопка
   My Portal родилась мёртвой заглушкой прототипа и остаётся ею там,
   где портала рядом нет). gbppl-liveindex-1: у live\index.html
   портал есть, и кнопка обязана вести в него, поэтому адрес
   выведен наружу тем же способом, что logo-src и catalog-href.
   Путь к записи на встречу — атрибутом meeting-href, той же манеры
   и с тем же дефолтом "#" (gbppl-booking-1, 25.08): кнопка Book a
   Meeting стояла мёртвой с рождения прототипа, а теперь странице
   есть куда её послать — live\book-a-meeting.html.

   ------------------------------------------------------------
   ВАРИАНТ НАД ВИДЕО (variant="transparent-dark", Тон 24.08)
   ------------------------------------------------------------
   Тон, 24.08: «хедер динамически меняется при скролле с прозрачного
   на белый НЕ на всех страницах, а на определённых, где он лежит
   на видео».

   Поэтому вариант ОПТ-ИН, атрибутом, той же манеры, что logo-src и
   portal-href:

     <gb-site-header variant="transparent-dark" over=".js-heroSection" ...>

   Без атрибута variant этот код не выполняется вовсе, класса на
   баре нет, и планка байт-в-байт прежняя на всех остальных
   страницах.

   ТРИ СТУПЕНИ (Тон, 24.08, вторая подача: «как только ты начинаешь
   скроллить, он становится тёмным стеклом. Но когда ты касаешься им
   следующей секции, белой, тогда он становится белым стеклом»).
   Бар получает .gb-header--transparent, а скролл ведёт на нём два
   класса:

     .is-scrolled    scrollY >= 50. Живая константа, снятая
                     пошагово 24.08 (49 = прозрачный, 50 = тёмный,
                     обратно так же, гистерезиса у лайва нет).
     .is-past-hero   низ бара КОСНУЛСЯ низа секции, названной в
                     атрибуте over. Порог у лайва геометрический, а
                     не числовой: свип по трём высотам окна дал
                     перелом ровно на «высота героя минус высота
                     бара» (1081 -> 1003, 900 -> 821, 700 -> 621),
                     поэтому здесь не хардкодится ни один пиксель,
                     сравниваются два края.

     over   CSS-селектор секции, на которой лежит планка. Атрибута
            нет или селектор ничего не нашёл — третьей ступени
            просто нет, первые две работают. На главной это
            .js-heroSection — собственный хук живого сайта на секции
            героя, который наш gb-home-hero переносит в свою
            разметку один в один.

   Всё, что переключение красит, живёт в header.css.

   Слушатель passive и сжат до одного кадра (rAF-защёлка): жест
   скролла обязан оставаться гладким. Пересчёт висит и на resize:
   высота героя тянется за окном, а вместе с ней и порог. Состояние
   считается сразу при подключении — страницу можно открыть уже
   прокрученной (возврат по «назад», ссылка с якорем).

   ------------------------------------------------------------
   GIFTS: ССЫЛКА + ВЫПАДАЮЩЕЕ МЕНЮ (gbppl-gifts-menu, Тон 24.08)
   ------------------------------------------------------------
   Тон, 24.08: «клик на Gifts должен вести на страницу категорий»
   и «сабменю должно работать везде, где стоит актуальный хедер,
   и выглядеть один в один с лайвом».

   Снято прибором с https://www.gildedbox.com, 1920, 24.08
   (getComputedStyle + getBoundingClientRect; JSON снятия лежит в
   scratchpad hub\gifts\live-submenu-measure.json). Что читает лайв:

     ТРИГГЕР   не кнопка, а <a href="/catalog/products"> с
               aria-label="View All Gifts" внутри li.group. Клик
               уходит на каталог, меню НЕ перехватывает клик.
     ОТКРЫТИЕ  чистый hover (Tailwind lg:group-hover:block), без
               JS и без задержки. Клика-переключателя у лайва нет.
     ЗАКРЫТИЕ  уход курсора с li. Разрыв 18px между низом планки и
               верхом панели закрыт мостиком ::before внутри самой
               панели (top -30px, высота 30, прозрачный) — курсор
               не выпадает из li по дороге вниз.
     АНИМАЦИЯ  @keyframes showBlock 0.2s linear forwards:
               opacity 0->1 + translateY(-10px)->0.
     СТРУКТУРА три колонки списков + четвёртая колонка из двух
               контурных кнопок:
                 By Category  Audio & Books, Home & Office,
                              Gourmet, Travel & Leisure,
                              Wine & Spirits
                 By Recipient Clients, VIPs, Prospects
                 By Occasion  Events, Onboarding, Milestones,
                              Referrals
                 кнопки       All Gifts, Customize
     ARIA      у лайва её НЕТ вообще: меню целиком на :hover, ни
               aria-haspopup, ни aria-expanded, с клавиатуры не
               открывается. Мы добавляем своё (Тон-8: система не
               копирует чужие пробелы) — haspopup/expanded/controls,
               открытие по фокусу, закрытие по Escape и клику мимо.
               Поэтому открытие переехало с CSS :hover на состояние
               data-open: иначе Escape не смог бы закрыть панель,
               пока курсор ещё над пунктом.

   КУДА ВЕДУТ ПУНКТЫ. У лайва за каждым пунктом свой раздел
   (?filter=audio-books и т.д.). У нас страница категорий одна —
   vendored v1 live\catalog\index.html, и её бандл читает из query
   ровно три ключа: embed, customizer, motion (грепнуто по
   live\catalog\assets\index-*.js, 24.08). Предвыбора категории она
   не поддерживает. ОСОЗНАННОЕ УПРОЩЕНИЕ: все пункты и обе кнопки
   ведут на страницу категорий как есть. Когда у каталога появится
   ключ категории — здесь меняется одна строка ITEMS.

   ------------------------------------------------------------
   THE CART BELONGS TO A SIGNED IN VISITOR (gbppl-header-cart-1,
   2026-08-28)
   ------------------------------------------------------------
   Ton, 28.08, verbatim: «Корзина должна быть видна только
   авторизованным пользователям. Пока ты не авторизован, она не
   отображается.» And, in the same message, about the bar itself:
   «по поводу меню: я бы оставил бургер» — so the grid, the 1280
   collapse and the rhythm of the bar are NOT touched by this wave.
   The right pocket is simply shorter for a guest.

   HOW "SIGNED IN" IS DECIDED, AND WHERE IT IS WRITTEN. One place of
   truth for the whole prototype: sessionStorage 'gbppl-signed-in'
   === '1'. Session, not local, because a demo is one sitting and the
   next tab should open a guest again.

     SET     live/portal.html, on load. The portal has NO sign in
             form: it has never had a guest state, the sidebar draws
             a name and an email from the first paint, and the only
             account door it carries is the exit. So in this
             prototype ENTERING THE PORTAL IS THE SIGN IN, and the
             page says so out loud (one script at its foot, next to
             the cart-is-a-door one).
     CLEARED live/portal.html, the sidebar's last visible item, «Log
             out» — the live portal's own exit, kept under the live
             wording (Ton-3: the list is verbatim from live, and
             renaming it "Sign out" for our sake would be our word in
             the client's mouth). It drops the flag and walks out to
             the public home, because a portal you are signed out of
             is not a page to keep looking at.
     DEMO    ?signedin=1 / ?signedin=0 on ANY page carrying this
             file: sets or clears the flag and then removes itself
             with history.replaceState, so the address bar keeps the
             view and not the switch. ONE SHOT ON PURPOSE, and NOT in
             the KEEP list above: a state is not a container (Ton-12
             is about which room you are in, and being signed in is
             not a room). Written for the showing: a link can hand
             someone the signed in bar without a console.

   HOW A CHANGE TRAVELS. sessionStorage fires no 'storage' event in
   the tab that wrote it, so every writer goes through setSignedIn(),
   which dispatches window event 'gbppl-auth' after the write; each
   header listens for it and for 'storage'. The second one is not
   decoration: the studio's device scene runs the page in a
   same-origin iframe, an iframe SHARES the tab's session storage
   area, and 'storage' is exactly how a write on one side reaches the
   other.

   WHAT IS NOT TOUCHED. The account glyph (it arrives on the catalog
   from the bundle through oro-header-bridge.js and is the only door
   to signing in there) and the search dot: Ton spoke about the cart
   and only the cart.
   ============================================================ */
(function () {
  'use strict';

  /* ----------------------------------------------------------------
     SIGNED IN, THE ONE PLACE OF TRUTH (gbppl-header-cart-1, 28.08).
     See the head of this file for Ton's decision and for who writes.
     Published as window.GbAuth so the portal, which assembles its two
     bars from classes rather than from <gb-site-header>, reads and
     writes the same key instead of keeping a second copy of it.
     ---------------------------------------------------------------- */
  var AUTH_KEY = 'gbppl-signed-in';
  var AUTH_EVENT = 'gbppl-auth';

  /* Storage throws rather than returns null in a locked-down browser
     (Safari private mode, third-party frame): a guest is the honest
     answer to "cannot tell", and it is also the safe one. */
  function signedIn() {
    try { return sessionStorage.getItem(AUTH_KEY) === '1'; } catch (e) { return false; }
  }
  function setSignedIn(on) {
    try {
      if (on) sessionStorage.setItem(AUTH_KEY, '1');
      else sessionStorage.removeItem(AUTH_KEY);
    } catch (e) { /* nothing to do: the bar below just stays a guest */ }
    window.dispatchEvent(new Event(AUTH_EVENT));
  }

  window.GbAuth = {
    key: AUTH_KEY,
    event: AUTH_EVENT,
    signedIn: signedIn,
    setSignedIn: setSignedIn
  };

  /* The demo key, read once at load and then wiped from the address:
     ?signedin=1 turns the state on, anything else in that slot (0,
     no, off) turns it off. Runs before the first header connects, so
     the bar is drawn right the first time and never blinks. */
  (function readSignedInKey() {
    var have;
    try { have = new URLSearchParams(location.search); } catch (e) { return; }
    if (!have.has('signedin')) return;
    var want = have.get('signedin') === '1';
    have.delete('signedin');
    var rest = have.toString();
    try {
      history.replaceState(null, '',
        location.pathname + (rest ? '?' + rest : '') + location.hash);
    } catch (e) { /* file:// refuses replaceState; the key just stays visible */ }
    setSignedIn(want);
  })();

  /* Тексты и aria-лейблы — один в один с лайвом (24.08); href у всех
     один, страница категорий (см. шапку файла). */
  var GROUPS = [
    { title: 'By Category', items: [
      ['Audio &amp; Books', 'Audio & Books'],
      ['Home &amp; Office', 'Home & Office'],
      ['Gourmet', 'Gourmet'],
      ['Travel &amp; Leisure', 'Travel & Leisure'],
      ['Wine &amp; Spirits', 'Wine & Spirits']
    ] },
    { title: 'By Recipient', items: [
      ['Clients', 'Client Gifts'],
      ['VIPs', 'VIP Gifts'],
      ['Prospects', 'Prospect Gifts']
    ] },
    { title: 'By Occasion', items: [
      ['Events', 'Event Gifts'],
      ['Onboarding', 'Onboarding Gifts'],
      ['Milestones', 'Milestone Gifts'],
      ['Referrals', 'Referral Gifts']
    ] }
  ];

  var MENU = function (catalogHref) {
    var cols = GROUPS.map(function (g) {
      var lis = g.items.map(function (it) {
        return '<li><a class="gbh-menu__item" href="' + catalogHref +
               '" aria-label="' + it[1].replace(/&/g, '&amp;') + '">' + it[0] + '</a></li>';
      }).join('');
      return '<div class="gbh-menu__col">' +
               '<h3 class="gbh-menu__title">' + g.title + '</h3>' +
               '<ul class="gbh-menu__list">' + lis + '</ul>' +
             '</div>';
    }).join('');
    return (
      '<div class="gbh-menu" id="gbh-gifts-menu">' +
        '<div class="gbh-menu__cols">' +
          cols +
          /* Четвёртая колонка — тот же кнопочный организм, что и в
             правом кармане бара (лестница S, 36/42/48), в белой
             инверсии под тёмную панель: лайв берёт ровно те же
             classes. data-pc-section="label" остаётся живой
             анатомией и адресом харвест-конфигов. */
          '<div class="gbh-menu__actions">' +
            '<a class="gb-btn gb-btn--s gb-btn--outline gb-btn--inverse" href="' + catalogHref + '" aria-label="All Gifts"><span class="gb-btn__label" data-pc-section="label">All Gifts</span></a>' +
            '<a class="gb-btn gb-btn--s gb-btn--outline gb-btn--inverse" href="' + catalogHref + '" aria-label="Customize"><span class="gb-btn__label" data-pc-section="label">Customize</span></a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  };

  /* Cart glyph and badge, unchanged from the template it left
     (gbppl-header-cart-1): same 22px stroke drawing, same .gbh-count.
     data-gbh-cart is the handle this file and the catalog bridge use
     to find it, the way [data-gbh-outline] names the outline button:
     an address, not a name. */
  var CART = function () {
    return (
      '<button class="gbh-icon-button" type="button" aria-label="Cart, 3 items" data-gbh-cart>' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="17.5" cy="20" r="1.4"/><path d="M3 4h2.4l2.2 11.5a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.3L21 8H6.2"/></svg>' +
        '<span class="gbh-count" aria-hidden="true">3</span>' +
      '</button>'
    );
  };

  var TEMPLATE = function (logoSrc, catalogHref, portalHref, meetingHref, homeHref) {
    return (
      '<header class="gb-header">' +
        '<div class="gb-container gbh-bar">' +
          '<a href="' + homeHref + '" class="gbh-brand" aria-label="GildedBox home">' +
            '<img src="' + logoSrc + '" alt="GildedBox">' +
          '</a>' +
          '<nav class="gbh-nav" aria-label="Primary navigation">' +
            /* Gifts — живая ссылка на страницу категорий, несущая
               выпадающее меню. Остальные три пункта остаются
               мёртвыми кнопками прототипа, их эта волна не трогает. */
            '<div class="gbh-navitem gbh-navitem--menu" data-open="false">' +
              '<a class="gbh-link" href="' + catalogHref + '" aria-label="View All Gifts"' +
                 ' aria-haspopup="true" aria-expanded="false" aria-controls="gbh-gifts-menu">Gifts</a>' +
              MENU(catalogHref) +
            '</div>' +
            '<button class="gbh-link" type="button">Customize <span class="gbh-beta">Beta</span></button>' +
            '<button class="gbh-link" type="button">Portal</button>' +
            '<button class="gbh-link" type="button">Explore</button>' +
          '</nav>' +
          '<div class="gbh-actions">' +
            /* Text-only per live: без глифа календаря (diff measure
               2026-08-12); лейбл в своём span per живой анатомии. */
            '<a class="gb-btn gb-btn--s gb-btn--filled gb-btn--primary" href="' + meetingHref + '"><span class="gb-btn__label" data-pc-section="label">Book a Meeting</span></a>' +
            '<a class="gb-btn gb-btn--s gb-btn--outline gb-btn--secondary" href="' + portalHref + '" data-gbh-outline><span class="gb-btn__label" data-pc-section="label">My Portal</span></a>' +
            /* The cart is NOT in the template: it belongs to a signed
               in visitor and is put in (and taken out) by __applyCart
               below. Its markup lives in CART() so that the glyph and
               the badge are still written once. */
            '<button class="gbh-icon-button" type="button" aria-label="Search gifts">' +
              '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  };

  /* ============================================================
     SIGNING IN HAPPENS IN THE BAR (gbppl-header-auth-1, 2026-08-28)
     ------------------------------------------------------------
     Ton-16, verbatim: «Сейчас на лайве отвратительное решение: кнопка
     Start Gifting фактически даёт авторизацию и отправляет на портал.
     Мы не должны так делать... Это единственное, что мы точно не хотим
     повторять за текущим лайвом.» And the refinement of 28.08: «вход
     через ДРОВЕР, не через экран; текстовый Sign in рядом с кнопкой,
     ghost-кнопкой и иконками даёт разнобой». Then, the same day: «дровер
     закрывается сам, хедер меняется на глазах», «попробуем так сделать
     на сэндбоксе и посмотрим, как оно будет выглядеть».

     SO THIS IS A SANDBOX, AND IT IS OPT IN BY A KEY. ?hdr=auth on any
     page carrying <gb-site-header>. Without the key not one line below
     runs: no class on the bar, no burger, no drawer, and the geometry is
     the one measured before this wave, byte for byte. The key is content,
     not view (see KEEP above), so it rides along internal links.

     WHAT THE BAR HOLDS, and what it deliberately does not:

       GUEST      Book a meeting (the one blue button) · search ·
                  person glyph. NO My Portal button: Ton took it out of
                  the bar and put it in the account menu, because two
                  buttons where one is really a sign in «жрёт
                  горизонтальное место».
       SIGNED IN  Book a meeting · search · cart · initials. The person
                  glyph BECOMES the initials in place (one button, two
                  layers, a crossfade) and the cart arrives from behind
                  it pushing its neighbours along.

     THE THREE STEPS OF WIDTH (Ton, 28.08 12:58, the picture he approved):
       >= 1280    nav in the bar, as today.
       1024..1279 nav in a burger. Live collapses at 1024 and we collapse
                  at 1280 because our right pocket is wider (trap 17);
                  what changes here is only that the nav now has
                  somewhere to go instead of vanishing.
       <= 1023    burger, wordmark, and the corner. Book a meeting leaves
                  the bar and becomes the FIRST ROW of the burger menu.
                  «лайв на этих ширинах показывает две кнопки и корзину,
                  мы так не делаем».
     THE BURGER STANDS LEFT AT EVERY WIDTH IT IS VISIBLE. Ton named the
     side only for < 1024 («бургер слева, логотип»); one side for one
     control is the systemic answer, and it also means nothing jumps
     across the bar when the window crosses 1024.

     THE QUIET LINE. «на пару секунд появляется тихая строка». It hangs
     UNDER THE RIGHT CORNER, not centred under the bar: it is a sentence
     about the initials and the cart, both of which are in that corner,
     and a line across the whole bar would read as a page banner. It
     never takes part in layout (absolute), so nothing below the header
     moves while it is on screen.

     NOTHING IS SENT ANYWHERE. Continue writes the flag through
     GbAuth.setSignedIn(true), remembers the name and the initials in
     sessionStorage, and closes the drawer. No request, no account.
     ============================================================ */
  var NAME_KEY = 'gbppl-signed-in-name';

  /* Initials out of an email, the rule Ton gave: the local part, its first
     letter and the letter after a dot or a hyphen; no separator, the first
     two letters. One letter is an honest answer for a one letter name. */
  function initialsFor(local) {
    var s = String(local || '').replace(/[^A-Za-z0-9.\-_]/g, '');
    if (!s) return '?';
    var cut = s.search(/[.\-_]/);
    var second = cut >= 0 ? s.slice(cut + 1, cut + 2) : s.slice(1, 2);
    return (s.slice(0, 1) + (second || '')).toUpperCase();
  }
  function accountName() {
    try { return sessionStorage.getItem(NAME_KEY) || ''; } catch (e) { return ''; }
  }
  function setAccountName(local) {
    try {
      if (local) sessionStorage.setItem(NAME_KEY, local);
      else sessionStorage.removeItem(NAME_KEY);
    } catch (e) { /* the initials just fall back to the glyph below */ }
  }
  window.GbAuth.nameKey = NAME_KEY;
  window.GbAuth.name = accountName;
  window.GbAuth.setName = setAccountName;
  window.GbAuth.initialsFor = initialsFor;

  var GLYPH_PERSON =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>';

  var GLYPH_BURGER =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.5" stroke-linecap="round" aria-hidden="true">' +
    '<path d="M3 6h18M3 12h18M3 18h18"/></svg>';

  /* Account menu and burger menu are the SAME dropdown family as Gifts:
     .gbh-menu, its dark plate, its 200ms entrance and .gbh-menu__item rows.
     Ton-6 in one line — the header already owns a dropdown, and a second
     visual family in the same corner is the «разнобой» he objected to. */
  var ACCOUNT_MENU = function (portalHref) {
    return (
      '<div class="gbh-menu gbh-menu--account" id="gbh-account-menu" role="menu" aria-label="Account">' +
        '<a class="gbh-menu__item" role="menuitem" href="' + portalHref + '">My Portal</a>' +
        '<a class="gbh-menu__item" role="menuitem" href="' + portalHref +
          '" title="opens the portal">Orders</a>' +
        '<button class="gbh-menu__item gbh-menu__item--btn" role="menuitem" type="button" data-gbh-signout>Log out</button>' +
      '</div>'
    );
  };

  /* The account control is ONE button with two faces, not two buttons: the
     thing Ton described is a person «становится» a circle, and a swap of
     nodes would drop keyboard focus in the middle of the sentence. */
  var ACCOUNT = function (portalHref) {
    return (
      '<div class="gbh-account" data-gbh-account-wrap>' +
        '<button class="gbh-icon-button gbh-account__btn" type="button" data-gbh-account' +
          ' aria-label="Sign in" title="Sign in" aria-haspopup="dialog" aria-expanded="false">' +
          '<span class="gbh-account__glyph" aria-hidden="true">' + GLYPH_PERSON + '</span>' +
          '<span class="gbh-account__initials" aria-hidden="true"></span>' +
        '</button>' +
        ACCOUNT_MENU(portalHref) +
      '</div>'
    );
  };

  var BURGER = function (catalogHref, meetingHref) {
    var rows = [
      ['Gifts', catalogHref],
      ['Customize', catalogHref],
      ['Portal', null],
      ['Explore', null]
    ].map(function (r) {
      return r[1]
        ? '<a class="gbh-menu__item" role="menuitem" href="' + r[1] + '">' + r[0] + '</a>'
        : '<button class="gbh-menu__item gbh-menu__item--btn" role="menuitem" type="button">' + r[0] + '</button>';
    }).join('');
    return (
      '<div class="gbh-burger" data-gbh-burger-wrap>' +
        '<button class="gbh-icon-button gbh-burger__btn" type="button" data-gbh-burger' +
          ' aria-label="Menu" aria-haspopup="menu" aria-expanded="false" aria-controls="gbh-burger-menu">' +
          GLYPH_BURGER +
        '</button>' +
        '<div class="gbh-menu gbh-menu--burger" id="gbh-burger-menu" role="menu" aria-label="Menu">' +
          /* First row, and only below 1024, where the bar has let it go. */
          '<a class="gb-btn gb-btn--s gb-btn--filled gb-btn--primary gb-btn--block gbh-menu__cta" href="' + meetingHref + '">' +
            '<span class="gb-btn__label" data-pc-section="label">Book a Meeting</span></a>' +
          rows +
        '</div>' +
      '</div>'
    );
  };

  var TEMPLATE_AUTH = function (logoSrc, catalogHref, portalHref, meetingHref, homeHref) {
    return (
      '<header class="gb-header">' +
        '<div class="gb-container gbh-bar gbh-bar--auth">' +
          BURGER(catalogHref, meetingHref) +
          '<a href="' + homeHref + '" class="gbh-brand" aria-label="GildedBox home">' +
            '<img src="' + logoSrc + '" alt="GildedBox">' +
          '</a>' +
          '<nav class="gbh-nav" aria-label="Primary navigation">' +
            '<div class="gbh-navitem gbh-navitem--menu" data-open="false">' +
              '<a class="gbh-link" href="' + catalogHref + '" aria-label="View All Gifts"' +
                 ' aria-haspopup="true" aria-expanded="false" aria-controls="gbh-gifts-menu">Gifts</a>' +
              MENU(catalogHref) +
            '</div>' +
            '<button class="gbh-link" type="button">Customize <span class="gbh-beta">Beta</span></button>' +
            '<button class="gbh-link" type="button">Portal</button>' +
            '<button class="gbh-link" type="button">Explore</button>' +
          '</nav>' +
          '<div class="gbh-actions">' +
            '<a class="gb-btn gb-btn--s gb-btn--filled gb-btn--primary" href="' + meetingHref + '"><span class="gb-btn__label" data-pc-section="label">Book a Meeting</span></a>' +
            '<button class="gbh-icon-button" type="button" aria-label="Search gifts">' +
              '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>' +
            '</button>' +
            /* The cart is put in by __applyCart when the flag is on, and
               it aims at the account wrapper: guest -> nothing, signed in
               -> search · cart · initials, the order of Ton-16. */
            ACCOUNT(portalHref) +
            '<p class="gbh-flash" role="status" aria-live="polite" hidden></p>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  };

  /* ============================================================
     THE SIGN IN DRAWER CARRIES THE FLOW WE ALREADY HAVE
     gbppl-header-auth-2 (2026-08-28)
     ------------------------------------------------------------
     Ton, verbatim: «Ты полностью сломал форму авторизации, которая есть
     на лайве. У нас форма авторизации уже была в системе. Почему ты не
     переиспользовал ту, которая есть? Там кнопка авторизоваться с Google
     и все дела. У нас есть целый флоу регистрации и авторизации, просто
     используй его. Не выдумывай ничего нового.»

     He is right, and the mistake was in the brief of the wave before,
     not in the drawer. gbppl-header-auth-1 wrote a one field form of its
     own into this file — an e-mail input, its own validation, its own
     lead — while <gb-auth-flow> had been standing in auth.js since 18.08
     with the whole thing measured off portal.gildedbox.com/guest/auth:
     Sign in with Google, «or», the e-mail form, then the six digit code
     or a password with its confirmation, Resend with its timer, and the
     way back. Ton-6, question one: is there a component already. There
     was. So the body of this drawer is now that component and NOTHING
     else, and every line that duplicated it is gone: SIGNIN_BODY, the
     e-mail regexp, the error plumbing, the lead.

     THE HEAD OF THE DRAWER IS EYEBROW AND CROSS, NO TITLE. Inspect and
     Comment both open <gb-drawer> as eyebrow + title + sub, because
     there the subject has no heading of its own and the head is the only
     place it can be named. Here the flow carries its own <h1> («Sign in
     or create an account») and its own lead, both measured off the live
     page, and a second heading above them would be the same sentence
     twice. So the head keeps only what belongs to the SURFACE: the
     eyebrow that says which drawer this is, and the cross that closes
     it. drawer.js leaves an empty title and an empty sub out of the
     layout on their own (the <h2> collapses, the <p> is hidden), so
     nothing here overrides the organism. */
  var DRAWER_OUT = 350;   /* --mo-medium-out, drawer.js CLOSE_MS; см. __openSignin */

  /* THE KEY. Read on every render rather than cached, because the device
     scene of the console rebuilds the page inside an iframe with its own
     address. Anything but `auth` in the slot is not this variant. */
  function authVariant() {
    try { return new URLSearchParams(location.search).get('hdr') === 'auth'; }
    catch (e) { return false; }
  }
  function withHdr(href) {
    if (!href || href === '#') return href;
    if (/[?&]hdr=/.test(href)) return href;
    return href + (href.indexOf('?') >= 0 ? '&' : '?') + 'hdr=auth';
  }

  /* Дровер один на документ: это поверхность, а не экземпляр бара
     (страница может нести два хедера, как чекаут). */
  function signinDrawer() {
    var d = document.getElementById('gbh-signin-drawer');
    if (d) return d;
    if (!window.customElements || !customElements.get('gb-drawer')) return null;
    d = document.createElement('gb-drawer');
    d.id = 'gbh-signin-drawer';
    document.body.appendChild(d);
    return d;
  }

  /* ============================================================
     КЛЮЧИ КОНТЕКСТА, ОДИН СПИСОК (gbppl-comments-b, 28.08)
     ------------------------------------------------------------
     Список жил внутри connectedCallback, потому что читал его один
     лого. Теперь читателей двое: Comment mode собирает из него
     строку ВЕРСИИ страницы (спека §5), и вторая копия разошлась бы с
     этой на первом же новом ключе.

     Разведены две природы, которые до сих пор лежали вперемешку:

       content   ЧТО смотрят: сценарий чекаута, шапка портала,
                 раскладка, светлый прифутер. Меняет содержимое
                 страницы, поэтому и есть версия, к которой
                 привязывается комментарий.
       view      КАК смотрят: экран (device) и то, что страница едет
                 внутри кадра (studio). Содержимого не меняют, и
                 одна и та же строка на мобильном и на десктопе —
                 это одна и та же строка.

     Лого несёт ОБА (Тон-12: контейнер и экран переживают переход),
     комментарий — только первый.
     ============================================================ */
  /* gbppl-header-auth-1: `hdr` joins content, not view. Which bar the page
     wears IS what you are looking at, so it rides along the wordmark and the
     Gifts link like the checkout scenario and the portal head do. */
  var KEEP_CONTENT = ['v', 'nav', 'hero', 'grid', 'layout', 'pth', 'lock', 'prefooter', 'hdr'];
  var KEEP_VIEW    = ['device', 'studio'];   /* gbppl-panel-10: panel ушёл со второй компоновкой */
  window.GB_KEEP = {
    content: KEEP_CONTENT,
    view: KEEP_VIEW,
    all: KEEP_CONTENT.concat(KEEP_VIEW)
  };

  class GbSiteHeader extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      var logoSrc = this.getAttribute('logo-src') || 'assets/gildedbox-logo.svg';
      var catalogHref = this.getAttribute('catalog-href') || 'catalog/index.html';
      var portalHref = this.getAttribute('portal-href') || '#';
      var meetingHref = this.getAttribute('meeting-href') || '#';
      /* gbppl-header-home (Ton 26.08: «с каталога не могу на главную по лого»): the wordmark
         goes home; every consumer states its own path, like the other hrefs. */
      var homeHref = this.getAttribute('home-href') || '#';
      /* gbppl-header-home-2 (Ton 26.08): «лого работает внутри своего родительского
         контейнера: на лайве это лайв, в сэндбоксе тот сэндбокс, который активен».
         Home keeps the sandbox context: the query keys the registry treats as a
         room ride along on the wordmark, so leaving a sandbox page does not drop
         you onto bare Live. Keys mirror the portal set the catalog carries.
         gbppl-prefooter-light-1 (26.08): prefooter joins them, so the light
         pre-footer room of the catalog is not dropped by the wordmark.
         gbppl-panel-7 (27.08): device and studio join them. Тон-12 says the
         context of a container survives a move inside it, and which screen the
         reader is looking through is context: a link handed round as
         ?device=768 must still be a tablet after the wordmark. studio rides
         along for the same reason from the other side — a page opened inside
         the device frame stays inside it and does not grow a second console.
         The frame has a second guard that needs no key (nesting is refused
         outright, see studio-panel.js), so this is the honest URL rather than
         the mechanism. */
      if (homeHref !== '#') {
        /* gbppl-comments-b: список уехал наверх, к обоим читателям, и
           лого берёт его целиком — контекст и экран вместе. */
        var have = new URLSearchParams(location.search), carry = new URLSearchParams();
        window.GB_KEEP.all.forEach(function (k) { if (have.has(k)) carry.set(k, have.get(k)); });
        var q = carry.toString();
        if (q) homeHref += (homeHref.indexOf('?') >= 0 ? '&' : '?') + q;
      }
      /* gbppl-header-auth-1: the variant carries itself onto the pages this
         bar links to, otherwise one click on Gifts drops you back onto the
         bar you were comparing against (Тон-12, contexts survive a move
         inside the container). Only `hdr` travels here: the wordmark above
         still carries the whole KEEP, and widening these three links to the
         full set is a separate question, not a side effect of this wave. */
      if (authVariant()) {
        catalogHref = withHdr(catalogHref);
        portalHref = withHdr(portalHref);
        meetingHref = withHdr(meetingHref);
        this.innerHTML = TEMPLATE_AUTH(logoSrc, catalogHref, portalHref, meetingHref, homeHref);
        this.__wireMenu();
        this.__wireAuth(portalHref);
        this.__wireCart();
      } else {
        this.innerHTML = TEMPLATE(logoSrc, catalogHref, portalHref, meetingHref, homeHref);
        this.__wireMenu();
        this.__wireCart();
      }
      if (this.getAttribute('variant') === 'transparent-dark') this.__wireTransparent();
    }

    /* THE CART FOLLOWS THE STATE (gbppl-header-cart-1, Ton 28.08; the
       head of this file carries the decision). The node is put in and
       taken out rather than hidden with CSS: «не отображается» is a
       statement about the bar, and a display:none control still sits
       in the markup for anyone reading it. Flex gap counts real
       children, so the right pocket closes up on its own and the grid
       (168 / minmax(0,1fr) / auto, gap 32) is not touched — trap 17
       stands as it stands. */
    __wireCart() {
      var self = this;
      var apply = function () { self.__applyCart(); };
      apply();
      /* Same tab: sessionStorage fires nothing for its own writer, so
         setSignedIn() shouts. Other browsing context of the same tab
         (the studio's device iframe shares this session storage area):
         'storage' is the only thing that crosses. */
      window.addEventListener(AUTH_EVENT, apply);
      window.addEventListener('storage', function (e) {
        if (!e.key || e.key === AUTH_KEY) apply();
      });
    }

    __applyCart() {
      var slot = this.querySelector('.gbh-actions');
      if (!slot) return;
      var cart = slot.querySelector('[data-gbh-cart]');
      if (!signedIn()) {
        if (cart) cart.parentNode.removeChild(cart);
        return;
      }
      if (cart) return;
      var host = document.createElement('div');
      host.innerHTML = CART();
      cart = host.firstChild;
      /* gbppl-header-auth-1: in the auth bar the corner reads Book a
         meeting · search · cart · initials (Ton-16), so the cart aims at
         the account wrapper and the account glyph closes the row. In
         today's bar nothing moves: the anchor is still the search dot. */
      var anchor = this.__auth
        ? slot.querySelector('[data-gbh-account-wrap]')
        /* The search glyph closes the row on every page: ours, or the
           bundle's, which oro-header-bridge.js stands in its place under
           the same aria-label. Anchoring to it keeps the corner order
           account -> cart -> search whichever way round the two arrived,
           and insertBefore(node, null) simply appends if a page ever
           drops the search dot. */
        : slot.querySelector('[aria-label="Search gifts"]');
      slot.insertBefore(cart, anchor);
      /* The slide is only for the MOMENT of signing in, not for a page
         that opens already signed in: an animation on first paint would
         be the bar telling you something that did not just happen. */
      if (this.__authLive) cart.classList.add('is-arriving');
    }

    /* ============================================================
       THE AUTH BAR'S OWN BEHAVIOUR (gbppl-header-auth-1)
       ------------------------------------------------------------
       Three controls and one state. The person opens the sign in
       drawer; the initials open the account menu; the burger opens
       the nav. All three menus close on Escape, on a click outside
       and on each other, and every one of them hands focus back to
       the button that opened it.
       ============================================================ */
    __wireAuth(portalHref) {
      var self = this;
      this.__auth = true;
      this.__portalHref = portalHref;

      var wrap = this.querySelector('[data-gbh-account-wrap]');
      var btn = this.querySelector('[data-gbh-account]');
      var menu = this.querySelector('.gbh-menu--account');
      var burgerWrap = this.querySelector('[data-gbh-burger-wrap]');
      var burgerBtn = this.querySelector('[data-gbh-burger]');
      var burgerMenu = this.querySelector('.gbh-menu--burger');

      /* --------------------------------------------------------
         MENUS. data-open is the same handle the Gifts item uses;
         one word for one idea across the whole bar.
         -------------------------------------------------------- */
      var openMenu = function (on) {
        if (!menu) return;
        menu.setAttribute('data-open', on ? 'true' : 'false');
        btn.setAttribute('aria-expanded', on ? 'true' : 'false');
        if (on) openBurger(false);
      };
      var menuOpen = function () { return menu && menu.getAttribute('data-open') === 'true'; };

      var openBurger = function (on) {
        if (!burgerMenu) return;
        burgerMenu.setAttribute('data-open', on ? 'true' : 'false');
        burgerBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
        if (on && menu) { menu.setAttribute('data-open', 'false'); btn.setAttribute('aria-expanded', 'false'); }
      };
      var burgerOpen = function () { return burgerMenu && burgerMenu.getAttribute('data-open') === 'true'; };

      /* Arrow keys walk the rows, Home and End jump. The rows are
         links and buttons in DOM order, so the list is the list. */
      var rowsOf = function (panel) {
        return [].slice.call(panel.querySelectorAll('.gbh-menu__item'));
      };
      var walk = function (panel, from, step) {
        var rows = rowsOf(panel);
        if (!rows.length) return;
        var i = rows.indexOf(from);
        var next = i < 0 ? (step > 0 ? 0 : rows.length - 1) : (i + step + rows.length) % rows.length;
        rows[next].focus();
      };
      /* Слушаем ОБЁРТКУ, а не панель: стрелка нажимается ещё на
         кнопке, фокус в этот момент вне панели, и панель события не
         увидит (поймано прогоном клавиатуры 28.08). */
      var keys = function (wrap, panel, opener, close) {
        wrap.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') { e.stopPropagation(); close(); opener.focus(); return; }
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            /* Стрелка на закрытой кнопке — это «покажи список». */
            if (panel.getAttribute('data-open') !== 'true') opener.click();
            walk(panel, document.activeElement, e.key === 'ArrowDown' ? 1 : -1);
            return;
          }
          else if (e.key === 'Home') { e.preventDefault(); walk(panel, null, 1); }
          else if (e.key === 'End') { e.preventDefault(); walk(panel, null, -1); }
        });
      };

      if (menu) {
        keys(wrap, menu, btn, function () { openMenu(false); });
        menu.addEventListener('click', function (e) {
          if (e.target.closest('[data-gbh-signout]')) {
            e.preventDefault();
            openMenu(false);
            window.GbAuth.setName('');
            window.GbAuth.setSignedIn(false);
            btn.focus();
          }
        });
      }
      if (burgerMenu) keys(burgerWrap, burgerMenu, burgerBtn, function () { openBurger(false); });

      /* --------------------------------------------------------
         THE PERSON. Guest: the drawer. Signed in: the menu.
         One button, because it is one place in the bar.
         -------------------------------------------------------- */
      btn.addEventListener('click', function () {
        if (signedIn()) { openMenu(!menuOpen()); return; }
        /* Дровер накрывает бар целиком: открытая бургер-панель под ним
           не видна, но осталась бы открытой после закрытия. */
        openBurger(false);
        self.__openSignin();
      });
      if (burgerBtn) {
        burgerBtn.addEventListener('click', function () { openBurger(!burgerOpen()); });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (menuOpen()) { openMenu(false); btn.focus(); }
        if (burgerOpen()) { openBurger(false); burgerBtn.focus(); }
      });
      document.addEventListener('pointerdown', function (e) {
        if (menuOpen() && wrap && !wrap.contains(e.target) && !menu.contains(e.target)) openMenu(false);
        if (burgerOpen() && burgerWrap && !burgerWrap.contains(e.target)) openBurger(false);
      });

      this.__closeMenus = function () { openMenu(false); openBurger(false); };

      /* --------------------------------------------------------
         THE STATE. __applyCart already listens for the same two
         events; this one paints the face and says the line.
         -------------------------------------------------------- */
      var apply = function () { self.__applyFace(); };
      apply();
      /* Everything after the first paint is a CHANGE the reader is
         watching, and only a change is worth animating. */
      setTimeout(function () { self.__authLive = true; }, 0);
      window.addEventListener(AUTH_EVENT, function () { apply(); });
      window.addEventListener('storage', function (e) {
        if (!e.key || e.key === AUTH_KEY || e.key === NAME_KEY) apply();
      });
    }

    /* THE FACE. One button, two layers, opacity and scale: the person
       does not disappear and a circle appear in its place, it turns
       into it (Ton, 28.08: «человечек становится кругом с инициалами»).
       .is-known is on the button, so the crossfade is one class. */
    __applyFace() {
      var btn = this.querySelector('[data-gbh-account]');
      if (!btn) return;
      var on = signedIn();
      var was = btn.classList.contains('is-known');
      var ini = btn.querySelector('.gbh-account__initials');
      /* THE FLAG CAN ARRIVE WITHOUT A NAME: live/portal.html sets it on
         load, and so does the demo key ?signedin=1. An empty dark circle
         would be a worse answer than the glyph, so the face only turns
         when there are letters to turn into; the button is still an
         account button either way. */
      var letters = on ? initialsFor(accountName()) : '';
      if (!accountName()) letters = '';
      if (on) {
        var local = accountName();
        if (ini) ini.textContent = letters;
        btn.setAttribute('aria-label', 'Account' + (local ? ', ' + local : ''));
        btn.setAttribute('title', 'Account');
        btn.setAttribute('aria-haspopup', 'menu');
        btn.setAttribute('aria-controls', 'gbh-account-menu');
      } else {
        btn.setAttribute('aria-label', 'Sign in');
        btn.setAttribute('title', 'Sign in');
        btn.setAttribute('aria-haspopup', 'dialog');
        btn.removeAttribute('aria-controls');
        if (this.__closeMenus) this.__closeMenus();
      }
      btn.classList.toggle('is-known', on && !!letters);
      /* One frame later: the cart is put in by __applyCart, which listens
         to the same event a line further down the queue, and the line
         wants to read its badge. */
      if (was !== (on && !!letters) && this.__authLive) {
        var self = this;
        window.requestAnimationFrame(function () { self.__flash(on); });
      }
    }

    /* THE QUIET LINE. It says the one thing that is not obvious from
       looking: the portal now lives under the initials. If there are
       gifts in the cart it says that instead, because the cart is the
       louder of the two changes and the number is live off the badge.
       NO TOKEN: 2400ms of dwell. The motion scale holds the length of
       MOVES, not the length of a pause, and the system has no dwell
       step; «пара секунд» is Ton's own measure. */
    __flash(on) {
      var line = this.querySelector('.gbh-flash');
      if (!line) return;
      clearTimeout(this.__flashTimer);
      clearTimeout(this.__flashHide);
      if (!on) { line.hidden = true; line.classList.remove('is-in'); return; }
      var badge = this.querySelector('[data-gbh-cart] .gbh-count');
      var n = badge ? parseInt(badge.textContent, 10) : 0;
      line.textContent = n > 0
        ? 'Your ' + n + ' gifts are waiting in the cart'
        : 'You’re in. Your portal is under your initials.';
      line.hidden = false;
      void line.offsetWidth;
      line.classList.add('is-in');
      var self = this;
      this.__flashTimer = setTimeout(function () {
        line.classList.remove('is-in');
        self.__flashHide = setTimeout(function () { line.hidden = true; }, 350);  /* --mo-medium-out */
      }, 2400);
    }

    /* THE DRAWER. Surface from the system (<gb-drawer>), flow from the
       system (<gb-auth-flow>, auth.js), and nothing leaves the browser.
       See the block by DRAWER_OUT for why the head has no title. */
    __openSignin() {
      var d = signinDrawer();
      if (!d) return;
      d.open({
        eyebrow: 'Account',
        html: '<gb-auth-flow class="gbh-signin"></gb-auth-flow>'
      });
      /* The drawer's panel lives on document.body, not inside <gb-drawer>.
         The element upgrades while innerHTML is being set, so its first
         step is already in the DOM by the line below. */
      var flow = document.querySelector('.gbd-panel .gbh-signin');
      if (!flow) return;
      /* The flow does not take focus on its first step (the live page it
         copies does not either); in a drawer the caret belongs in the
         field the guest came here to fill. The verify step focuses its
         own first cell, so this runs once, on the way in. */
      var first = flow.querySelector('.gba-input');
      if (first) setTimeout(function () { first.focus(); }, 80);

      /* THE END OF THE FLOW, and only that. The component says gba:done
         when the six digits or the two passwords check out; what it means
         for the bar is ours to decide, and it is the same thing it meant
         in gbppl-header-auth-1.
         THE ORDER MATTERS. Ton: «дровер закрывается сам, хедер меняется
         НА ГЛАЗАХ с моушеном». At 1280 the panel is 520 wide and the
         right corner of the bar stands underneath it, so a flag written
         on the same tick plays the whole change behind the panel and the
         reader sees a bar that has already changed. The state is
         therefore written when the panel has left: DRAWER_OUT is
         drawer.js's own CLOSE_MS, --mo-medium-out. */
      flow.addEventListener('gba:done', function (e) {
        var email = (e.detail && e.detail.email) || '';
        d.close();
        setTimeout(function () {
          window.GbAuth.setName(email.split('@')[0]);
          window.GbAuth.setSignedIn(true);
        }, DRAWER_OUT);
      });
    }

    /* Планка над видео. Порог 50 — живая константа; порог белого
       стекла — геометрия героя (см. шапку). */
    __wireTransparent() {
      var bar = this.querySelector('.gb-header');
      if (!bar) return;
      bar.classList.add('gb-header--transparent');

      var THRESHOLD = 50;   /* LIVE 24.08 */
      var overSel = this.getAttribute('over');
      var ticking = false;
      /* Контурная кнопка бара. Над видео она белая, на белом стекле
         чёрная — и с gbppl-button-2 это не перекраска, а СМЕНА
         ЦВЕТОВОГО МОДИФИКАТОРА организма: --inverse наверху,
         --secondary внизу. Оба состояния объявлены в button.css по
         одному разу, вариант хедера больше не держит их копию.
         Пара всегда переключается целиком: два модификатора весят
         поровну, и оставленный лишний класс решал бы спор порядком
         строк в чужом файле. */
      var outline = bar.querySelector('[data-gbh-outline]');

      var apply = function () {
        ticking = false;
        bar.classList.toggle('is-scrolled', window.scrollY >= THRESHOLD);
        /* Секцию ищем каждый раз заново: кастом-элементы страницы
           апгрейдятся своим чередом, и на первом кадре её может
           ещё не быть. */
        var over = overSel ? document.querySelector(overSel) : null;
        var past = false;
        if (over) {
          /* Буквально «планка коснулась следующей секции»: нижний
             край бара догнал нижний край героя. Оба края в
             координатах окна, никакой скролл-арифметики. */
          past = over.getBoundingClientRect().bottom <= bar.getBoundingClientRect().bottom;
        }
        bar.classList.toggle('is-past-hero', past);
        if (outline) {
          outline.classList.toggle('gb-btn--inverse', !past);
          outline.classList.toggle('gb-btn--secondary', past);
        }
      };

      apply();
      var schedule = function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(apply);
      };
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
    }

    /* Поведение Gifts-меню. Лайв держит его на чистом :hover; мы
       ведём состояние из JS (data-open), чтобы Escape мог закрыть
       панель, не дожидаясь ухода курсора. Открытие по наведению
       остаётся мгновенным, как у лайва: ни задержки на вход, ни
       задержки на выход. */
    __wireMenu() {
      var item = this.querySelector('.gbh-navitem--menu');
      if (!item) return;
      var trigger = item.querySelector('.gbh-link');
      var self = this;

      var open = function (on) {
        item.setAttribute('data-open', on ? 'true' : 'false');
        trigger.setAttribute('aria-expanded', on ? 'true' : 'false');
      };
      var isOpen = function () { return item.getAttribute('data-open') === 'true'; };

      item.addEventListener('mouseenter', function () { open(true); });
      item.addEventListener('mouseleave', function () { open(false); });

      /* Клавиатура: фокус на любом элементе пункта держит панель
         открытой, уход фокуса наружу её закрывает. Клик по самому
         Gifts не перехватываем — он уходит на каталог, как у лайва. */
      item.addEventListener('focusin', function () { open(true); });
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) open(false);
      });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) {
          e.stopPropagation();
          open(false);
          trigger.focus();
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) open(false);
      });
      document.addEventListener('pointerdown', function (e) {
        if (isOpen() && !item.contains(e.target)) open(false);
      });
      self.__giftsMenu = item;
    }
  }
  if (!customElements.get('gb-site-header')) {
    customElements.define('gb-site-header', GbSiteHeader);
  }
})();
