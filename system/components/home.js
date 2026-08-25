/* ============================================================
   DEMO COMPONENT: HOME / MARKETING ZONE, JS-шаблоны  gbppl-demo-home
   ------------------------------------------------------------
   Регистрирует шесть элементов главной — пиксельная копия
   https://www.gildedbox.com/ (DOM по секциям + probe снят 18.08,
   каркасные цели = harvest public-home 17.08, правила в home.css):

     <gb-home-hero>            видео-герой: титул + underline-CTA;
                               фоновое видео живого CDN, постер наш
     <gb-home-heading>         белая полоса с serif-заголовком
                               (Curated Gifts For:)
     <gb-brand-tabs>           PrimeVue-табы логотипов LogoFont +
                               панели-картинки 128/58; дети
                               <gb-brand-tab brand image alt>
     <gb-testimonials>         карусель цитат; дети
                               <gb-testimonial author>текст</...>
     <gb-banner-video>         чёрная лента The Unboxing; фоновое
                               видео живого CDN, постер наш
     <gb-banner-conversation>  финальный CTA на градиенте

   Все шесть — СТАМПЫ (паттерн gb-listing-card): элемент замещает
   себя живой секцией, чтобы div.page > section... и селекторы
   конфига demo-home.json совпадали с public-home.json. Живые
   имена классов сохранены в разметке как данные для замера;
   стилевые правила висят на хуках .gbhm* (home.css).
   Чего на живой главной НЕТ по факту (18.08): подзаголовка героя
   (absence-пробник hero-subtitle), хлебных крошек, продуктовых
   карточек. Видео двух секций (25.08) играет с живого CDN теми же
   атрибутами, что на сайте; закрыт прежний DEVIATION «постер вместо
   видео». Постеры остались НАШИ: живые CDN отдаёт 403.
   автопрокрутка карусели и таб-свайп не воспроизводятся (felt),
   кнопки/табы кликабельны. Шевроны карусели: DEVIATION, глиф
   Nucleo заменён инлайн-SVG в 1em-боксе (паттерн футера).
   Никаких fetch-инклюдов: работает с file:// и на GitHub Pages.
   ============================================================ */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function stamp(el, html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    var node = tpl.content.firstChild;
    el.replaceWith(node);
    return node;
  }

  /* Фоновое видео лайва: те же атрибуты, что на www.gildedbox.com
     (loop muted autoplay playsinline, preload metadata, источник
     <source type="video/mp4">, role/aria presentation-слоя).
     poster — НАШ локальный кадр: живые постеры CDN отдаёт 403,
     сами mp4 отдаются свободно (Access-Control-Allow-Origin: *).
     Класс .background-video — тот же хук, что носил постер-img,
     правила home.css не меняются. */
  function backgroundVideo(a) {
    return (
      '<video class="' + esc(a.cls) + ' background-video" ' +
        (a.priority ? 'fetchpriority="high" ' : '') +
        'loop muted autoplay playsinline preload="metadata" ' +
        'poster="' + esc(a.poster) + '" ' +
        'aria-label="' + esc(a.label) + '" aria-hidden="true" ' +
        'role="presentation" data-noaudio="true">' +
        '<source src="' + esc(a.video) + '" type="video/mp4">' +
      '</video>'
    );
  }

  /* Атрибут muted из разобранной строки Chrome читает, но autoplay
     после replaceWith просыпается не всегда. Ставим свойство руками
     и просим play(); отказ (политика браузера, отсутствие сети)
     молча оставляет постер — он и есть fallback. */
  function startVideo(root) {
    var v = root && root.querySelector('video.background-video');
    if (!v) return;
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  /* Underline-CTA лайва (hero + conversation), один шаблон. */
  function underlineCta(label, href) {
    return '<a href="' + esc(href || '#') + '" class="gbhm-underline btn white btn-underline">' + esc(label) + '</a>';
  }

  /* Источники живого сайта, снятые 25.08 (harvest/public-home-video/
     live-video-probe.json). Оба 2560x1440, отдаются CloudFront'ом
     публично: hero 4.56 MB, unboxing 13.46 MB. Переопределяются
     атрибутом video="" на элементе. */
  var HERO_VIDEO = 'https://cdn.gildedbox.com/uploader/2024/11/07/apple_airpods_3_gift_set_video_update_2_opt.1730987451.mp4';
  var BANNER_VIDEO = 'https://cdn.gildedbox.com/uploader/2024/10/23/2024-10-23_17_06_54.1729692762.mp4';

  /* ---------------- 1. HERO ---------------- */

  var HERO_TEMPLATE = function (a) {
    return (
      '<section class="gbhm gbhm-hero js-heroSection heroSection heroVideo bg-black white-text defaultStyle">' +
        backgroundVideo({
          cls: 'gbhm-heroVideo', priority: true,
          poster: a.poster, video: a.video, label: a.title
        }) +
        '<div class="gbhm-heroContent background-video-content">' +
          '<div class="container">' +
            '<div class="gbhm-heroRel relative h-full">' +
              '<div class="heroVideo__logo"></div>' +
              '<div class="gbhm-contentLine heroVideo__contentLine">' +
                '<div class="gbhm-heroText heroVideo__text">' +
                  '<div class="container">' +
                    '<div class="infoHolder">' +
                      '<h1 class="gbhm-heroTitle">' + esc(a.title) + '</h1>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="gbhm-heroAction heroVideo__action">' +
                  '<div class="container">' +
                    '<div class="gbhm-action action center">' + underlineCta(a.cta, a.href) + '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  };

  class GbHomeHero extends HTMLElement {
    connectedCallback() {
      startVideo(stamp(this, HERO_TEMPLATE({
        title: this.getAttribute('heading') || 'Impressive Gifts, Your Brand',
        cta: this.getAttribute('cta') || 'Discover Gifts',
        href: this.getAttribute('href') || '#',
        poster: this.getAttribute('poster') || 'assets/home/hero-poster.jpg',
        video: this.getAttribute('video') || HERO_VIDEO
      })));
    }
  }

  /* ---------------- 2. HEADING STRIP ---------------- */

  class GbHomeHeading extends HTMLElement {
    connectedCallback() {
      var h = this.getAttribute('heading') || '';
      stamp(this,
        '<section class="gbhm gbhm-heading text-surface-900 bg-white center defaultStyle">' +
          '<div class="container">' +
            '<div class="inner-section col">' +
              '<h2 class="gbhm-headingTitle">' + esc(h) + '</h2>' +
            '</div>' +
          '</div>' +
        '</section>');
    }
  }

  /* ---------------- 3. BRAND TABS ---------------- */

  var brandTab = function (b, i, active) {
    return (
      '<button type="button" role="tab" aria-selected="' + (active ? 'true' : 'false') + '" ' +
        'data-pc-name="tab" data-p-active="' + (active ? 'true' : 'false') + '" ' +
        'class="gbhm-tab" aria-label="icon-logo icon-logo-' + esc(b.brand) + '" data-tab-index="' + i + '">' +
        '<div class="gbhm-logo icon-logo icon-logo-' + esc(b.brand) + ' gbhm-logo--' + esc(b.brand) + '"></div>' +
      '</button>'
    );
  };

  var brandPanel = function (b, i, active) {
    return (
      '<div role="tabpanel" data-pc-name="tabpanel" data-p-active="' + (active ? 'true' : 'false') + '" class="gbhm-panel" data-panel-index="' + i + '">' +
        '<section class="defaultStyle">' +
          '<div class="container">' +
            '<div class="gbhm-panelRow">' +
              '<div class="gbhm-panelCol">' +
                '<div class="gbhm-aspect">' +
                  '<span class="gbhm-imgWrap" data-pc-name="image">' +
                    '<picture><img width="1650" height="710" alt="' + esc(b.alt) + '" loading="lazy" src="' + esc(b.image) + '"></picture>' +
                  '</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>' +
      '</div>'
    );
  };

  class GbBrandTabs extends HTMLElement {
    connectedCallback() {
      var brands = Array.prototype.slice.call(this.querySelectorAll('gb-brand-tab')).map(function (t) {
        return {
          brand: t.getAttribute('brand') || '',
          image: t.getAttribute('image') || '',
          alt: t.getAttribute('alt') || (t.getAttribute('brand') || '') + ' 0'
        };
      });
      var tabs = brands.map(function (b, i) { return brandTab(b, i, i === 0); }).join('');
      var panels = brands.map(function (b, i) { return brandPanel(b, i, i === 0); }).join('');
      var html =
        '<section class="gbhm gbhm-tabs tabsWithWidget pt-0 pb-0 defaultStyle">' +
          '<div class="container">' +
            '<div class="gbhm-tabsRoot" data-pc-name="tabs">' +
              '<div class="gbhm-tablist" data-pc-name="tablist">' +
                '<div class="gbhm-tablistContent" data-pc-section="content">' +
                  '<div class="gbhm-tablistInner" role="tablist" aria-orientation="horizontal" data-pc-section="tablist">' +
                    tabs +
                    '<span class="gbhm-activebar" role="presentation" aria-hidden="true" data-pc-section="activebar"></span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="gbhm-panels" role="presentation" data-pc-name="tabpanels">' + panels + '</div>' +
            '</div>' +
          '</div>' +
        '</section>';
      var tpl = document.createElement('template');
      tpl.innerHTML = html;
      var root = tpl.content.firstChild;
      this.replaceWith(root);

      var bar = root.querySelector('.gbhm-activebar');
      function placeBar() {
        var active = root.querySelector('.gbhm-tab[data-p-active="true"]');
        if (!active) return;
        /* Live PrimeVue кладёт целые offsetWidth/offsetLeft. */
        bar.style.width = active.offsetWidth + 'px';
        bar.style.left = active.offsetLeft + 'px';
      }
      root.addEventListener('click', function (e) {
        var tab = e.target.closest('.gbhm-tab');
        if (!tab) return;
        var idx = tab.getAttribute('data-tab-index');
        root.querySelectorAll('.gbhm-tab').forEach(function (t) {
          var on = t === tab;
          t.setAttribute('data-p-active', on ? 'true' : 'false');
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        root.querySelectorAll('.gbhm-panel').forEach(function (p) {
          p.setAttribute('data-p-active', p.getAttribute('data-panel-index') === idx ? 'true' : 'false');
        });
        placeBar();
      });
      window.addEventListener('resize', placeBar);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(placeBar);
      }
      placeBar();
    }
  }

  class GbBrandTab extends HTMLElement {}

  /* ---------------- 4. TESTIMONIALS ---------------- */

  /* Кавычки: инлайн-SVG лайва, 96x96, заливка zinc-200 #E4E4E7. */
  var QUOTE_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">' +
      '<path d="M40.0312 30L31.9688 46.0312H43.9688V70.0312H19.9688V46.0312L28.0312 30H40.0312ZM72 30L64.0312 46.0312H76.0312V70.0312H52.0312V46.0312L60 30H72Z" fill="#E4E4E7"></path>' +
    '</svg>';

  var CHEVRON_LEFT =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>';
  var CHEVRON_RIGHT =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9.5 6 6 6-6 6"/></svg>';

  var slideHtml = function (q, extra) {
    return (
      '<div class="gbhm-slide"' + (extra || '') + '>' +
        '<div class="gbhm-slidePad">' +
          '<div class="gbhm-quoteBox defaultStyle">' +
            '<div class="container">' +
              '<div class="gbhm-quoteStack">' +
                QUOTE_SVG +
                '<div class="gbhm-quote">' + q.text + '</div>' +
                '<div class="gbhm-author">' + esc(q.author) + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  };

  var navBtn = function (dir) {
    return (
      '<button type="button" class="gbhm-navBtn" aria-label="' + (dir < 0 ? 'Previous' : 'Next') + ' Page" ' +
        'data-pc-name="' + (dir < 0 ? 'pcprevbutton' : 'pcnextbutton') + '" data-dir="' + dir + '">' +
        '<span class="gbhm-navIcon icon icon-chevron-' + (dir < 0 ? 'left' : 'right') + '">' +
          (dir < 0 ? CHEVRON_LEFT : CHEVRON_RIGHT) +
        '</span>' +
      '</button>'
    );
  };

  class GbTestimonials extends HTMLElement {
    connectedCallback() {
      var quotes = Array.prototype.slice.call(this.querySelectorAll('gb-testimonial')).map(function (t) {
        return { text: t.innerHTML.trim(), author: t.getAttribute('author') || '' };
      });
      if (!quotes.length) return;
      /* Живой круговой ряд PrimeVue: клон последнего слайда в
         начале, все слайды, клон первого в конце; стартовое
         смещение -100% (первый настоящий слайд). */
      var slides = [slideHtml(quotes[quotes.length - 1], ' data-pc-section="itemclone" aria-hidden="true"')]
        .concat(quotes.map(function (q, i) {
          return slideHtml(q, ' data-pc-section="item" role="group" aria-label="' + i + '"');
        }))
        .concat([slideHtml(quotes[0], ' data-pc-section="itemclone" aria-hidden="true"')])
        .join('');
      var html =
        '<section class="gbhm gbhm-testi bg-white defaultStyle">' +
          '<div class="container">' +
            '<div class="gbhm-testiRel">' +
              '<div class="gbhm-carousel" role="region" data-pc-name="carousel">' +
                '<div class="gbhm-carouselRow" aria-live="polite" data-pc-section="content">' +
                  navBtn(-1) +
                  '<div class="gbhm-viewport" data-pc-section="viewport">' +
                    '<div class="gbhm-track" data-pc-section="itemlist">' + slides + '</div>' +
                  '</div>' +
                  navBtn(1) +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>';
      var tpl = document.createElement('template');
      tpl.innerHTML = html;
      var root = tpl.content.firstChild;
      this.replaceWith(root);

      /* Листание: живое поведение (translate по 100%, 500ms,
         по кругу через клоны). Автопрокрутку лайва не носим. */
      var track = root.querySelector('.gbhm-track');
      var n = quotes.length;
      var pos = 1;               /* 0 = клон хвоста, 1..n = слайды */
      var busy = false;
      function go(dir) {
        if (busy) return;
        busy = true;
        pos += dir;
        track.classList.add('is-animating');
        track.style.transform = 'translate3d(' + (-pos * 100) + '%, 0, 0)';
      }
      track.addEventListener('transitionend', function () {
        track.classList.remove('is-animating');
        if (pos === 0) pos = n;
        if (pos === n + 1) pos = 1;
        track.style.transform = 'translate3d(' + (-pos * 100) + '%, 0, 0)';
        busy = false;
      });
      root.addEventListener('click', function (e) {
        var btn = e.target.closest('.gbhm-navBtn');
        if (btn) go(parseInt(btn.getAttribute('data-dir'), 10));
      });
    }
  }

  class GbTestimonial extends HTMLElement {}

  /* ---------------- 5. VIDEO BANNER ---------------- */

  class GbBannerVideo extends HTMLElement {
    connectedCallback() {
      var h = this.getAttribute('heading') || '';
      var poster = this.getAttribute('poster') || '';
      startVideo(stamp(this,
        '<section class="gbhm gbhm-banner bannersVideo bg-black text-left defaultStyle">' +
          '<div class="gbhm-bannerVeil absolute"></div>' +
          backgroundVideo({
            cls: 'gbhm-bannerVideo', priority: false,
            poster: poster, video: this.getAttribute('video') || BANNER_VIDEO,
            label: h
          }) +
          '<div class="gbhm-bannerContent bannersVideo__content">' +
            '<div class="container">' +
              '<div class="infoHolder">' +
                '<h2 class="gbhm-bannerTitle">' + esc(h) + '</h2>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>'));
    }
  }

  /* ---------------- 6. CONVERSATION BANNER ---------------- */

  class GbBannerConversation extends HTMLElement {
    connectedCallback() {
      var pill = this.getAttribute('pill') || 'Impressive Gifts';
      var rest = this.getAttribute('rest') || 'Your Brand';
      var sub = this.getAttribute('subtitle') || '';
      var cta = this.getAttribute('cta') || 'Discover Gifts';
      stamp(this,
        '<section class="gbhm gbhm-conv bannersConversation bg-black defaultStyle">' +
          '<div class="gbhm-convContent bannersConversation__content">' +
            '<div class="container">' +
              '<div class="gbhm-convHolder infoHolder">' +
                '<div class="gbhm-convTitle"><span class="gbhm-convPill rounded">' + esc(pill) + '</span> ' + esc(rest) + '</div>' +
                '<div class="gbhm-convSub">' + esc(sub) + '</div>' +
                '<div class="gbhm-convAction gbhm-action action">' + underlineCta(cta, this.getAttribute('href') || '#') + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>');
    }
  }

  /* ---------------- 7. ADVANTAGES ---------------- */

  var advCol = function (c) {
    return (
      '<div class="gbhm-advCol">' +
        '<i class="gbhm-advIcon gbhm-advIcon--' + esc(c.icon) + ' icon icon-' + esc(c.live) + '"></i>' +
        '<div class="gbhm-advTitle">' + esc(c.title) + '</div>' +
        '<div class="gbhm-advText">' + esc(c.text) + '</div>' +
      '</div>'
    );
  };

  class GbAdvantages extends HTMLElement {
    connectedCallback() {
      var cols = Array.prototype.slice.call(this.querySelectorAll('gb-advantage')).map(function (a) {
        return {
          icon: a.getAttribute('icon') || 'present',
          live: a.getAttribute('live-icon') || a.getAttribute('icon') || '',
          title: a.getAttribute('heading') || '',
          text: a.textContent.trim()
        };
      });
      stamp(this,
        '<section class="gbhm gbhm-adv singleWithIconSimple defaultStyle">' +
          '<div class="container">' +
            '<div class="inner-section col">' +
              '<div class="gbhm-advRow">' + cols.map(advCol).join('') + '</div>' +
            '</div>' +
          '</div>' +
        '</section>');
    }
  }

  class GbAdvantage extends HTMLElement {}

  if (!customElements.get('gb-advantages')) customElements.define('gb-advantages', GbAdvantages);
  if (!customElements.get('gb-advantage')) customElements.define('gb-advantage', GbAdvantage);
  if (!customElements.get('gb-home-hero')) customElements.define('gb-home-hero', GbHomeHero);
  if (!customElements.get('gb-home-heading')) customElements.define('gb-home-heading', GbHomeHeading);
  if (!customElements.get('gb-brand-tabs')) customElements.define('gb-brand-tabs', GbBrandTabs);
  if (!customElements.get('gb-brand-tab')) customElements.define('gb-brand-tab', GbBrandTab);
  if (!customElements.get('gb-testimonials')) customElements.define('gb-testimonials', GbTestimonials);
  if (!customElements.get('gb-testimonial')) customElements.define('gb-testimonial', GbTestimonial);
  if (!customElements.get('gb-banner-video')) customElements.define('gb-banner-video', GbBannerVideo);
  if (!customElements.get('gb-banner-conversation')) customElements.define('gb-banner-conversation', GbBannerConversation);
})();
