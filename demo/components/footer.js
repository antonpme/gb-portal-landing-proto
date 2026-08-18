/* ============================================================
   DEMO COMPONENT: FOOTER, JS-шаблон (ЗАГЛУШКА)
   ------------------------------------------------------------
   TODO(волна B): заменить заглушку полноценным футером, когда
   harvest снимет живой футер gildedbox.com на 7 ширинах
   (колонки, серифные титулы Noto Serif 400 22, легальная строка,
   Back to Top). Пока — чёрная полоса с логотипом и честной
   пометкой, чтобы страницы demo имели низ и контейнерная
   лестница была видна на тёмном грунте.
   Никаких fetch-инклюдов: работает с file:// и на GitHub Pages.
   ============================================================ */
(function () {
  'use strict';

  class GbSiteFooter extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      var logoSrc = this.getAttribute('logo-src') || 'assets/gildedbox-logo.svg';
      this.innerHTML =
        '<footer class="gb-footer-stub">' +
          '<div class="gb-container">' +
            '<img src="' + logoSrc + '" alt="GildedBox">' +
            /* TODO(волна B): живые замеры футера, см. шапку файла */
            '<span class="gb-footer-stub__note">Footer stub &mdash; ждёт замеров волны B (harvest, живой футер на 7 ширинах)</span>' +
          '</div>' +
        '</footer>';
    }
  }
  if (!customElements.get('gb-site-footer')) {
    customElements.define('gb-site-footer', GbSiteFooter);
  }
})();
