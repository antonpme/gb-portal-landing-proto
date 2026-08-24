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
   ============================================================ */
(function () {
  'use strict';

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
          /* Четвёртая колонка — та же кнопочная семья шапки
             (.gbh-cta, лестница 36/42/48), инвертированная под
             тёмную панель: лайв берёт ровно те же classes. */
          '<div class="gbh-menu__actions">' +
            '<a class="gbh-cta gbh-cta--inverted" href="' + catalogHref + '" aria-label="All Gifts"><span data-pc-section="label">All Gifts</span></a>' +
            '<a class="gbh-cta gbh-cta--inverted" href="' + catalogHref + '" aria-label="Customize"><span data-pc-section="label">Customize</span></a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  };

  var TEMPLATE = function (logoSrc, catalogHref, portalHref) {
    return (
      '<header class="gb-header">' +
        '<div class="gb-container gbh-bar">' +
          '<a href="#" class="gbh-brand" aria-label="GildedBox home">' +
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
            '<a class="gbh-cta" href="#"><span data-pc-section="label">Book a Meeting</span></a>' +
            '<a class="gbh-cta gbh-cta--outline" href="' + portalHref + '"><span data-pc-section="label">My Portal</span></a>' +
            '<button class="gbh-icon-button" type="button" aria-label="Cart, 3 items">' +
              '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="17.5" cy="20" r="1.4"/><path d="M3 4h2.4l2.2 11.5a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.3L21 8H6.2"/></svg>' +
              '<span class="gbh-count" aria-hidden="true">3</span>' +
            '</button>' +
            '<button class="gbh-icon-button" type="button" aria-label="Search gifts">' +
              '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  };

  class GbSiteHeader extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      var logoSrc = this.getAttribute('logo-src') || 'assets/gildedbox-logo.svg';
      var catalogHref = this.getAttribute('catalog-href') || 'catalog/index.html';
      var portalHref = this.getAttribute('portal-href') || '#';
      this.innerHTML = TEMPLATE(logoSrc, catalogHref, portalHref);
      this.__wireMenu();
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
