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
   ============================================================ */
(function () {
  'use strict';

  var TEMPLATE = function (logoSrc) {
    return (
      '<header class="gb-header">' +
        '<div class="gb-container gbh-bar">' +
          '<a href="#" class="gbh-brand" aria-label="GildedBox home">' +
            '<img src="' + logoSrc + '" alt="GildedBox">' +
          '</a>' +
          '<nav class="gbh-nav" aria-label="Primary navigation">' +
            '<button class="gbh-link" type="button">Gifts</button>' +
            '<button class="gbh-link" type="button">Customize <span class="gbh-beta">Beta</span></button>' +
            '<button class="gbh-link" type="button">Portal</button>' +
            '<button class="gbh-link" type="button">Explore</button>' +
          '</nav>' +
          '<div class="gbh-actions">' +
            /* Text-only per live: без глифа календаря (diff measure
               2026-08-12); лейбл в своём span per живой анатомии. */
            '<a class="gbh-cta" href="#"><span data-pc-section="label">Book a Meeting</span></a>' +
            '<a class="gbh-cta gbh-cta--outline" href="#"><span data-pc-section="label">My Portal</span></a>' +
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
      this.innerHTML = TEMPLATE(logoSrc);
    }
  }
  if (!customElements.get('gb-site-header')) {
    customElements.define('gb-site-header', GbSiteHeader);
  }
})();
