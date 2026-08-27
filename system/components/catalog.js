/* ============================================================
   DEMO COMPONENT: CATALOG ZONE, JS-шаблоны     gbppl-demo-catalog
   ------------------------------------------------------------
   Регистрирует четыре элемента зоны каталога — пиксельная копия
   https://www.gildedbox.com/catalog/products (SSR-DOM снят 18.08,
   числа = harvest public-catalog 17.08, правила в catalog.css):

     <gb-catalog-hero>     белая лента 354/300/400 c serif-титулом
                           и подзаголовком (heading, subtitle, image,
                           alt); ПЕРЕСНЯТ С ЛАЙВА 27.08, см. ниже
     <gb-catalog-filters>  табы категорий + кнопка Filters +
                           складной пул чипов цены + мобильный бар
     <gb-catalog-grid>     обёртка md:container + viewGrid + ряд
                           (детей-карточек кладёт страница) +
                           Load More (единственная пагинация лайва)
     <gb-listing-card>     карточка листинга 436/528/720; СТАМП:
                           элемент замещает себя живым DOM ячейки
                           (div > div > div > a.viewGrid ...), чтобы
                           селекторы конфига demo-catalog.json
                           совпадали с public-catalog.json один в
                           один (div.viewGrid > div > div и т.д.)

   Живые имена классов сохранены в разметке как данные для
   замера; стилевые правила висят на хуках .gbc* (catalog.css).
   Чего на живом каталоге НЕТ по факту (17-18.08): сортировки,
   хлебных крошек, классической пагинации, формы поиска в зоне.
   Иконка bars-filter: DEVIATION, глиф иконошрифта лайва заменён
   инлайн-SVG в том же 1em-боксе (как стрелка футера).
   Никаких fetch-инклюдов: работает с file:// и на GitHub Pages.
   ============================================================ */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---------------- HERO ---------------- */

  /* gbppl-catalog-hero-1 (2026-08-27) — ЛЕНТА ПЕРЕСНЯТА С ЛАЙВА.
     Компонент отставал от источника на десять дней. Замер
     https://www.gildedbox.com/catalog/products 27.08 на семи
     ширинах (390/640/768/1024/1280/1440/1920/2000/2258) показал
     другую ленту, чем харвест 17.08:

       было (17.08)                  стало (27.08)
       чёрная земля #000             белая земля #ffffff
       белый титул                   титул #191919 (--catalog-ink)
       354 / 680 c md                354 / 300 c md / 400 c 2xl
       картинка справа               картинки НЕТ (v-if пустой)
       титул прижат вниз, pb 92      колонка по центру, pb 0
       колонка скрыта до md          колонка видна с нуля
       h1 36/48/52                   h1 36/48/50
       подзаголовка не было          подзаголовок .descr

     Живой класс-лист секции сохранён дословно, включая мёртвую
     ступень md:h-[680px]: её перебивает md:!h-[300px], и это
     след той самой правки на стороне клиента. Инлайн-стиль
     лайва (background-color:#ffffff) не воспроизводится: земля
     объявлена в catalog.css, как у всех наших лент.

     Подзаголовок переносится строкой РУКАМИ, как на лайве
     (<br> между «clients,» и «teams,»): в 388px колонке
     естественный перенос дал бы три строки вместо двух. Перевод
     строки внутри атрибута subtitle = <br>, каждая строка
     обрезается по краям, так что отступ разметки ничего не
     весит. Никакого HTML в атрибуте не проходит: esc() стоит
     до склейки. */

  function subtitleHTML(text) {
    return String(text).split('\n')
      .map(function (line) { return esc(line.trim()); })
      .filter(function (line) { return line !== ''; })
      .join('<br>');
  }

  var HERO_TEMPLATE = function (title, subtitle, image, alt) {
    /* Лайв рисует на месте картинки пустой v-if. Атрибут image
       остаётся у компонента (лента его умеет и носила до 27.08),
       но без него медиа-колонки в DOM нет, как сейчас на лайве. */
    var media = image
      ? '<div class="gbcH-media flex flex-1 grow justify-center items-center w-full h-full relative overflow-hidden">' +
          '<div class="gbcH-mediaBox w-full h-full overflow-hidden">' +
            '<picture><img alt="' + esc(alt) + '" class="object-contain lg:object-cover w-full h-full" src="' + esc(image) + '"></picture>' +
          '</div>' +
        '</div>'
      : '';
    var sub = subtitle
      ? '<div class="gbcH-sub descr text-zinc-900 font-sans text-base md:text-lg 2xl:text-[22px] !font-light leading-[170%] tracking-[2px] pt-4 sm:text-[18px] xl:text-[20px] w-fit sm:w-full m-auto font-light">' +
          subtitleHTML(subtitle) +
        '</div>'
      : '';
    return (
      '<section class="gbcH-hero js-heroSection relative h-[354px] md:h-[680px] defaultStyle md:!h-[300px] 2xl:!h-[400px]">' +
        '<div class="gbcH-container md:container h-full pt-[50px] lg:pt-0">' +
          '<div class="gbcH-inner flex flex-col-reverse lg:flex-row justify-between items-center h-full relative">' +
            '<div class="gbcH-titleCol flex items-center w-full h-auto lg:h-full lg:w-[25%] xl:w-[40%] text-center lg:text-left">' +
              '<div class="gbcH-titleBox">' +
                '<h1 class="gbcH-title text-[36px] xl:text-[48px] 2xl:text-[50px] font-normal font-serif tracking-wide leading-normal my-0 flex-1">' + esc(title) + '</h1>' +
                sub +
              '</div>' +
            '</div>' +
            media +
          '</div>' +
        '</div>' +
      '</section>'
    );
  };

  class GbCatalogHero extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      /* Атрибут heading, не title: глобальный title дал бы
         браузерный тултип поверх всей ленты. */
      var title = this.getAttribute('heading') || 'Gifts';
      var subtitle = this.getAttribute('subtitle') || '';
      var image = this.getAttribute('image') || '';
      var alt = this.getAttribute('alt') || title;
      this.innerHTML = HERO_TEMPLATE(title, subtitle, image, alt);
    }
  }

  /* ---------------- FILTERS ---------------- */

  /* Категории и чипы = живой каталог 18.08, первый таб активен. */
  var CATEGORIES = ['All', 'Audio & Books', 'Home & Office', 'Gourmet', 'Travel & Leisure', 'Wine & Spirits'];
  var PRICE_CHIPS = ['< $100', '$100 - $200', '$200 - $500', '$500 - $1000', '$1000+'];

  var TAB_ACTIVE_CLASS = 'gbcF-tab px-2 xl:px-4 2xl:px-6 text-second-600 border-second-600 mr-8 2xl:mr-12 my-1 lg:my-2 border-b-[1.5px] hover:border-surface-900 cursor-pointer leading-[250%]';
  var TAB_IDLE_CLASS = 'gbcF-tab px-2 xl:px-4 2xl:px-6 border-transparent mr-4 2xl:mr-6 my-1 lg:my-2 border-b-[1.5px] hover:border-surface-900 cursor-pointer leading-[250%]';

  /* bars-filter: инлайн-SVG в 1em-боксе живого глифа (24/28). */
  var BARS_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" aria-hidden="true">' +
      '<path d="M3.5 6.5h17M7 12h10M10.5 17.5h3"/>' +
    '</svg>';

  function toggleButton(panelClass) {
    return (
      '<button class="gbcF-toggle' + (panelClass ? ' ' + panelClass : '') + '" type="button" aria-label="Filters" aria-expanded="false" data-pc-name="button">' +
        '<span class="gbcF-toggleLabel">Filters</span>' +
        '<span class="gbcF-toggleIcon icon icon-bars-filter">' + BARS_ICON + '</span>' +
      '</button>'
    );
  }

  var FILTERS_TEMPLATE = function () {
    var tabs = CATEGORIES.map(function (c, i) {
      return '<li class="' + (i === 0 ? TAB_ACTIVE_CLASS : TAB_IDLE_CLASS) + '">' +
        '<span aria-label="' + esc(c) + '">' + esc(c) + '</span></li>';
    }).join('');
    var chips = PRICE_CHIPS.map(function (p) {
      return (
        '<button type="button" aria-pressed="false" class="gbcF-chip rounded-full" data-pc-name="pctogglebutton">' +
          '<span class="gbcF-chipContent" data-pc-section="content">' +
            '<span class="gbcF-chipLabel" data-pc-section="label">' + esc(p) + '</span>' +
          '</span>' +
        '</button>'
      );
    }).join('');
    return (
      '<section class="gbcF-section catalogFilters w-full max-w-full overflow-x-hidden bg-surface-100 pt-0 defaultStyle">' +
        '<div id="catalogFilters"></div>' +

        /* Мобильный бар (<md): serif Gifts + Filters, h 68. */
        '<div class="gbcF-mobile md:hidden w-full max-w-full overflow-x-hidden">' +
          '<div class="gbcF-mobileBar flex items-center justify-between py-4 px-4 bg-surface-100">' +
            '<span class="gbcF-mobileTitle font-serif font-semibold text-[18px]">Gifts</span>' +
            toggleButton('') +
          '</div>' +
        '</div>' +

        /* Десктопная зона (md+): табы + кнопка + пул чипов. */
        '<div class="container col hidden md:block">' +
          '<div class="gbcF-head pt-8 flex -mx-4">' +
            '<div class="gbcF-tabsCol flex-1 px-4 -mx-2">' +
              '<ul class="gbcF-tabs flex flex-wrap font-semibold text-surface-900 uppercase px-2">' + tabs + '</ul>' +
            '</div>' +
            '<div class="gbcF-btnCol flex-0 px-4 -mx-2">' +
              '<div class="gbcF-btnBox px-2">' + toggleButton('gbcF-toggle--panel bg-zinc-100') + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="gbcF-panel max-h-0 overflow-hidden">' +
            '<div class="gbcF-panelRow flex pt-4 md:pt-8">' +
              '<div class="gbcF-groupWrap flex items-center">' +
                '<span class="gbcF-priceLabel hidden xl:block">Filter by Price: </span>' +
                '<div class="gbcF-chipGroup flex items-center flex-wrap" role="group" data-pc-name="selectbutton">' + chips + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  };

  class GbCatalogFilters extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      this.innerHTML = FILTERS_TEMPLATE();

      var panel = this.querySelector('.gbcF-panel');
      this.addEventListener('click', function (e) {
        /* Кнопки Filters раскрывают пул чипов (живое поведение;
           высота открытого состояния felt, замер снят закрытым). */
        var toggle = e.target.closest('.gbcF-toggle');
        if (toggle) {
          var open = panel.classList.toggle('is-open');
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
          return;
        }
        /* Таб категории: единственный активный, классы = живые. */
        var tab = e.target.closest('.gbcF-tab');
        if (tab) {
          var items = tab.parentElement.children;
          for (var i = 0; i < items.length; i++) items[i].className = TAB_IDLE_CLASS;
          tab.className = TAB_ACTIVE_CLASS;
          return;
        }
        /* Чип цены: toggle aria-pressed (визуал selected на лайве
           не замерен, демо ограничивается нажатым состоянием). */
        var chip = e.target.closest('.gbcF-chip');
        if (chip) {
          var pressed = chip.getAttribute('aria-pressed') === 'true';
          chip.setAttribute('aria-pressed', pressed ? 'false' : 'true');
        }
      });
    }
  }

  /* ---------------- GRID + LOAD MORE ---------------- */

  var GRID_SKELETON =
    '<div class="gbcL-wrap bg-surface-100 pt-0 md:pt-8 defaultStyle md:container md:col">' +
      '<div class="gbcL-grid viewGrid min-h-[200px]">' +
        '<div class="gbcL-row mx-0 sm:-mx-2 flex flex-wrap"></div>' +
      '</div>' +
      '<div>' +
        '<div class="gbcL-moreInner w-full center pt-8">' +
          '<button class="gbcL-moreBtn" type="button" aria-label="Load More" data-pc-name="button">' +
            '<span class="gbcL-moreLabel" data-pc-section="label">Load More</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  class GbCatalogGrid extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      /* Дети (карточки) объявлены страницей внутри тега; скелет
         обёртки строится вокруг них, порядок сохраняется. */
      var kids = Array.prototype.slice.call(this.children);
      this.innerHTML = GRID_SKELETON;
      var row = this.querySelector('.gbcL-row');
      kids.forEach(function (k) { row.appendChild(k); });
    }
  }

  /* ---------------- LISTING CARD ---------------- */

  var CARD_TEMPLATE = function (a) {
    var badge = a.badge
      ? '<span class="gbcCard-badge absolute bg-surface-100 text-gray-700 text-xs md:text-sm font-semibold rounded top-0 left-0">' + esc(a.badge) + '</span>'
      : '';
    return (
      '<div' + (a.id ? ' data-product-id="' + esc(a.id) + '"' : '') + ' class="gbcL-cell px-0 sm:px-2 pb-4 w-full sm:w-1/2 lg:w-1/3">' +
        '<div class="gbcCard-center flex items-center justify-center w-full h-full">' +
          '<div class="gbcCard-frame relative w-full h-[436px] md:h-[528px] 2xl:h-[720px]">' +
            '<a class="gbcCard block w-full h-full relative group bg-surface-50 lg:hover:bg-white rounded viewGrid" href="' + esc(a.href) + '">' +
              '<div class="gbcCard-rel relative h-full">' +
                '<div class="gbcCard-box flex flex-col items-center justify-center h-full rounded overflow-hidden border-transparent">' +
                  '<div class="gbcCard-pad w-full flex-1 min-h-0 flex flex-col p-[32px]">' +
                    '<div class="gbcCard-badgeZone relative min-h-[28px] mb-2">' + badge + '</div>' +
                    '<div class="gbcCard-media relative w-full flex-1 min-h-0 overflow-hidden">' +
                      '<picture class="absolute inset-0 block w-full h-full">' +
                        '<img alt="' + esc(a.alt) + '" loading="lazy" class="gbcCard-img--main w-full h-full object-contain" src="' + esc(a.img) + '">' +
                      '</picture>' +
                      '<picture class="absolute inset-0 block w-full h-full">' +
                        '<img alt="' + esc(a.alt) + '" loading="lazy" class="gbcCard-img--hover w-full h-full object-contain opacity-0" src="' + esc(a.imgHover) + '">' +
                      '</picture>' +
                    '</div>' +
                    '<div class="gbcCard-foot w-full flex-shrink-0 z-10 rounded-bl rounded-br">' +
                      '<div>' +
                        '<div class="gbcCard-title font-serif text-[18px] xl:text-[20px] 2xl:text-[24px] leading-[130%] font-semibold text-center">' + esc(a.title) + '</div>' +
                        '<div class="gbcCard-priceRow flex items-center justify-between pt-3 2xl:pt-4 space-x-4">' +
                          '<div class="gbcCard-price text-[16px] xl:text-[18px] 2xl:text-[20px] font-light text-center w-full">' + esc(a.price) + '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  };

  class GbListingCard extends HTMLElement {
    connectedCallback() {
      /* СТАМП: элемент замещает себя живой ячейкой (см. шапку),
         чтобы div.viewGrid > div > div и a.viewGrid лайва
         находились демо-конфигом без адаптации селекторов. */
      var attrs = {
        id: this.getAttribute('product-id') || '',
        href: this.getAttribute('href') || '#',
        badge: this.getAttribute('badge') || '',
        title: this.getAttribute('title') || '',
        price: this.getAttribute('price') || '',
        img: this.getAttribute('img') || '',
        imgHover: this.getAttribute('img-hover') || this.getAttribute('img') || '',
        alt: this.getAttribute('alt') || this.getAttribute('title') || ''
      };
      var tpl = document.createElement('template');
      tpl.innerHTML = CARD_TEMPLATE(attrs);
      this.replaceWith(tpl.content.firstChild);
    }
  }

  if (!customElements.get('gb-catalog-hero')) customElements.define('gb-catalog-hero', GbCatalogHero);
  if (!customElements.get('gb-catalog-filters')) customElements.define('gb-catalog-filters', GbCatalogFilters);
  if (!customElements.get('gb-catalog-grid')) customElements.define('gb-catalog-grid', GbCatalogGrid);
  if (!customElements.get('gb-listing-card')) customElements.define('gb-listing-card', GbListingCard);
})();
