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
  var KEEP_CONTENT = ['v', 'nav', 'hero', 'grid', 'layout', 'pth', 'lock', 'prefooter'];
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
        var KEEP = ['v', 'nav', 'hero', 'grid', 'layout', 'pth', 'lock', 'prefooter',
                    'device', 'studio'];   /* gbppl-panel-10: panel left with the second console layout */
        var have = new URLSearchParams(location.search), carry = new URLSearchParams();
        KEEP.forEach(function (k) { if (have.has(k)) carry.set(k, have.get(k)); });
        var q = carry.toString();
        if (q) homeHref += (homeHref.indexOf('?') >= 0 ? '&' : '?') + q;
      }
      this.innerHTML = TEMPLATE(logoSrc, catalogHref, portalHref, meetingHref, homeHref);
      this.__wireMenu();
      this.__wireCart();
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
      /* The search glyph closes the row on every page: ours, or the
         bundle's, which oro-header-bridge.js stands in its place under
         the same aria-label. Anchoring to it keeps the corner order
         account -> cart -> search whichever way round the two arrived,
         and insertBefore(node, null) simply appends if a page ever
         drops the search dot. */
      slot.insertBefore(cart, slot.querySelector('[aria-label="Search gifts"]'));
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
