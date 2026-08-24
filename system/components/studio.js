/* ============================================================
   STUDIO GATE — замок студийных страниц (gbppl-hub-9, 24.08)
   ------------------------------------------------------------
   Хаб разъехался на страницы, и у каждой появились две одинаковые
   обязанности: не открываться без сессионного флага гейта и уметь
   запереться обратно кнопкой LOCK. Две страницы с одинаковым
   скриптом внутри — тот же двойник, что и две копии CSS, поэтому
   он живёт здесь, а страницы его подключают.

   Форма гейта (проверка кода, sha256, хореография ухода) осталась
   в index.html: она там одна и в компонент не просится.

   Как подключать:
     <script src="system/components/studio.js"
             data-home="index.html"></script>

     data-home    куда возвращает LOCK и куда выбрасывает страницу
                  без флага; путь считается ОТ СТРАНИЦЫ (в
                  system\oro\ это ../../index.html).
     data-guard   "off" — не выбрасывать, только повесить LOCK.
                  Витрина Oro стоит так: это документация системы,
                  и запирать её от самих себя незачем.

   Кнопка запирания — любой элемент с [data-studio-lock].

   Скрипт стоит в <head> без defer НАМЕРЕННО: редирект должен
   случиться до того, как страница нарисуется, иначе чужой глаз
   успевает увидеть содержимое за замком.
   ============================================================ */
(function () {
  'use strict';

  /* Сессия, не локалстор: закрыл вкладку — дверь снова заперта
     (тот же ключ, что ставит гейт в index.html). */
  var FLAG = 'gbppl-hub-open';

  var self  = document.currentScript;
  var home  = (self && self.getAttribute('data-home')) || 'index.html';
  var guard = !(self && self.getAttribute('data-guard') === 'off');

  function held() {
    try { return sessionStorage.getItem(FLAG) === '1'; } catch (e) { return false; }
  }

  /* replace, не assign: страница за замком не должна оставаться в
     истории — иначе «назад» из гейта возвращает на неё.
     Перед выбросом страница оставляет гейту записку, КУДА шёл
     человек: расшаренная прямая ссылка должна после ввода кода
     открыть саму себя, а не хаб (Тон, 24.08: «я могу всегда шарить
     ссылку на конкретную страницу, правильно?»). Гейт читает и
     сжигает записку в openHub (index.html). */
  if (guard && !held()) {
    try { sessionStorage.setItem('gbppl-return', location.pathname + location.search + location.hash); } catch (e) {}
    location.replace(home);
    return;
  }

  function wire() {
    var locks = document.querySelectorAll('[data-studio-lock]');
    Array.prototype.forEach.call(locks, function (el) {
      el.addEventListener('click', function () {
        try { sessionStorage.removeItem(FLAG); } catch (e) {}
        location.replace(home);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
