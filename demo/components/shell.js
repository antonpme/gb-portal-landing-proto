/* ============================================================
   DEMO COMPONENT: SHELL / CONTAINER, JS-шаблон
   ------------------------------------------------------------
   Регистрирует <gb-container>: блочная обёртка, несущая класс
   .gb-container (лестница клэмпов в shell.css). Страницы demo
   не дублируют разметку руками: кладут контент внутрь тега.
   Никаких fetch-инклюдов: работает с file:// и на GitHub Pages.
   ============================================================ */
(function () {
  'use strict';

  class GbContainer extends HTMLElement {
    connectedCallback() {
      this.classList.add('gb-container');
    }
  }
  if (!customElements.get('gb-container')) {
    customElements.define('gb-container', GbContainer);
  }

  /* Метка каркаса на html/body: грунт и базовая типографика demo
     включаются классом, чтобы стили не протекали в чужие страницы,
     если компонентные CSS однажды подключат рядом с прототипом. */
  document.documentElement.classList.add('gb-demo');
  if (document.body) {
    document.body.classList.add('gb-demo');
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('gb-demo');
    });
  }
})();
