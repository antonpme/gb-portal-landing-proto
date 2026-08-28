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

   ------------------------------------------------------------
   КОД ДОСТУПА КАК ОБЩИЙ КЛЮЧ (gbppl-comments-b, 28.08)
   ------------------------------------------------------------
   Спека Comment mode, §3 и §7: «Доступ: тот же общий код, что и
   гейт; сервер проверяет его на каждой записи», заголовок
   X-GB-Code на каждом запросе.

   До этой волны кода в исходнике не было НИГДЕ, и это нарочно:
   index.html держит один sha256 и сравнивает с ним введённое
   («The code itself appears nowhere here»), а замок держит один
   штамп срока. Вписать код литералом в comments.js значило бы
   опубликовать его в репозитории и на зеркале Pages.

   Поэтому владельцем ключа становится ЭТОТ файл, а значение
   приходит с той единственной клавиатуры, где оно и так звучит:
   гейт, приняв код, отдаёт его сюда через remember(), и код живёт
   рядом со штампом, ровно столько же, и снимается тем же LOCK.
   Потребитель (comments.js) значения не дублирует, он его
   спрашивает.

     window.GB_STUDIO.code()          строка или ''
     window.GB_STUDIO.remember(code)  зовёт гейт после успеха
     window.GB_STUDIO.held()          жив ли штамп

   Цена, названная вслух: у браузера, где штамп поставлен ДО этой
   волны, кода рядом нет, и записи в сервис не пойдут, пока человек
   не запрётся и не введёт код ещё раз. Консоль говорит об этом
   строкой состояния, а не молчит.
   ============================================================ */
(function () {
  'use strict';

  /* localStorage со штампом срока (gbppl-gate-2): закрыл вкладку — дверь
     открыта ещё месяц. Тот же ключ и тот же срок ставит гейт в index.html. */
  var FLAG = 'gbppl-hub-open';
  /* gbppl-comments-b: код рядом со штампом, той же жизни. Имя ключа
     живёт здесь одно, у владельца замка. */
  var CODE = 'gbppl-hub-code';

  var self  = document.currentScript;
  var home  = (self && self.getAttribute('data-home')) || 'index.html';
  var guard = !(self && self.getAttribute('data-guard') === 'off');

  /* gbppl-gate-2 (Ton 26.08): «пароль везде одинаковый; человек должен
     оставаться залогиненным надолго и попадать на ту страницу, куда шёл».
     The key moved from sessionStorage to localStorage with a 30-day stamp:
     one code, one month, every page of the studio. */
  var TTL_MS = 30 * 24 * 60 * 60 * 1000;
  function held() {
    try {
      var raw = localStorage.getItem(FLAG);
      if (!raw) return false;
      var until = parseInt(raw, 10);
      if (!until || Date.now() > until) { localStorage.removeItem(FLAG); return false; }
      return true;
    } catch (e) { return false; }
  }

  /* gbppl-comments-b. Публикуется ДО возможного редиректа ниже: на
     странице за замком скрипт до конца не доходит, а до сюда доходит
     всегда, и потребителю не приходится гадать, есть ли объект. */
  window.GB_STUDIO = {
    held: held,
    code: function () {
      try { return held() ? (localStorage.getItem(CODE) || '') : ''; } catch (e) { return ''; }
    },
    remember: function (value) {
      try { localStorage.setItem(CODE, String(value)); } catch (e) {}
    }
  };

  /* replace, не assign: страница за замком не должна оставаться в
     истории — иначе «назад» из гейта возвращает на неё.
     Перед выбросом страница оставляет гейту записку, КУДА шёл
     человек: расшаренная прямая ссылка должна после ввода кода
     открыть саму себя, а не хаб (Тон, 24.08: «я могу всегда шарить
     ссылку на конкретную страницу, правильно?»). Гейт читает и
     сжигает записку в openHub (index.html). */
  if (guard && !held()) {
    try { localStorage.setItem('gbppl-return', location.pathname + location.search + location.hash); } catch (e) {}
    location.replace(home);
    return;
  }

  function wire() {
    var locks = document.querySelectorAll('[data-studio-lock]');
    Array.prototype.forEach.call(locks, function (el) {
      el.addEventListener('click', function () {
        /* Замок снимает и штамп, и код: ключ не должен пережить
           дверь, которую он открывал (gbppl-comments-b). */
        try { localStorage.removeItem(FLAG); localStorage.removeItem(CODE); } catch (e) {}
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
