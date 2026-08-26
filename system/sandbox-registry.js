/* ============================================================
   SANDBOX REGISTRY — один источник песочниц (gbppl-sandboxes-3,
   Тон 2026-08-25, копи-правка 2026-08-26)
   ------------------------------------------------------------
   КАК ЗАРЕГИСТРИРОВАТЬ НОВУЮ ПЕСОЧНИЦУ (три строки):
   1. Найди страницу по её id в PAGES (или заведи новую запись:
      label, live, variants: []).
   2. Добавь в variants объект: id, label, desc (одна строка),
      status, href (от корня студии, с query), ready.
   3. Всё. Панель, PROTO-блок чекаута и sandboxes.html рисуются
      отсюда, руками ничего дописывать не нужно.
   ------------------------------------------------------------
   Тон, 25.08, дословно: «Мы показываем эту панель управления
   прототипом везде, даже на лайве. Лайв всегда остаётся лайвом,
   там переключать нечего, но мы можем показать, как эти страницы
   выглядят в Sandbox... Постоянство: открыть любую страницу и
   сразу увидеть, есть ли для неё что-то в разработке. Если
   вариантов несколько — показываем все.»

   Отсюда форма файла. Это НЕ список ссылок для одной страницы:
   это карта «страница → её варианты», и каждый потребитель берёт
   из неё свой срез. Тон-8 в чистом виде — данные живут в system,
   а live, хаб и витрина только носят их.

   ЧТО ЗДЕСЬ ЛЕЖИТ
   PAGES[id] = {
     label     имя страницы человеку (sentence case)
     live      адрес живой версии ОТ КОРНЯ СТУДИИ (без query)
     variants  [] массив снимков решений, может быть пустым
   }
   variant = {
     id      стабильный ключ внутри страницы
     label   имя варианта («V2 · Pool»)
     desc    одна строка: что этот вариант решает. ЧЕЛОВЕЧЕСКИМ
             языком, sentence case, без em dash и без внутренних
             ссылок на тикеты (gbppl-sandboxes-3, 26.08: карточки
             читают снаружи команды)
     status  'in-progress' | 'proposal' | 'approved'
     href    адрес ОТ КОРНЯ СТУДИИ, вместе с query
     ready   умеет ли страница этот параметр СЕГОДНЯ. false =
             решение принято, кода ещё нет: показывается серым с
             подписью статуса и без ссылки. Ставится true в тот
             день, когда страница начинает читать параметр.
   }

   ПУТИ. Все адреса от корня студии, как в data-root (ловушка 2
   скилла: у страниц разная глубина, поэтому page-relative дефолты
   запрещены). Потребитель передаёт свой root ('', '../',
   '../../'), и функции ниже собирают адрес сами.

   ПОДКЛЮЧЕНИЕ. Обычный скрипт, глобал window.GB_SANDBOXES, без
   модулей: страницы открываются с file://, где ES-модули ловят
   CORS. Ставить ПЕРЕД studio-panel.js.
   ============================================================ */
(function () {
  'use strict';

  var PAGES = {
    home: {
      label: 'Home',
      live: 'live/index.html',
      variants: []
    },

    catalog: {
      label: 'Catalog',
      live: 'live/catalog/index.html',
      variants: [
        {
          /* Ton 26.08, after Julia and Russell on the live category page:
             «попробовать сделать инверсию этих компонентов (цветовую,
             светлыми)... сделать варианты с инверсией, чтобы они были
             светлые». The two modifiers live in home.css; the page reads
             ?prefooter= and names them. */
          id: 'prefooter-light',
          label: 'Light pre-footer',
          desc: 'The closing banner and the advantages in light ink, tighter, no gradient.',
          status: 'proposal',
          href: 'live/catalog/index.html?prefooter=light',
          ready: true
        }
      ]
    },

    checkout: {
      label: 'Checkout',
      live: 'live/checkout.html',
      variants: [
        {
          /* Ton 25.08: «а где Checkout версии 1 в Sandbox?» — both
             versions are still candidates in front of the team, so
             V1 stands here as a room of its own, not only as Live. */
          id: 'v1',
          label: 'V1 · Quick fix',
          desc: "Today's checkout with the agreed quick fixes: one address or a different address per gift, the steps renamed, bulk personalize and edit selected.",
          status: 'in-progress',
          href: 'live/checkout.html?v=1',
          ready: true
        },
        {
          id: 'v2',
          label: 'V2 · Pool',
          desc: 'Gifts are not personalized by default. Quantity is a pool on the gift, and personalization is an add-on behind a choice of two doors.',
          status: 'in-progress',
          href: 'live/checkout.html?v=2',
          ready: true
        }
      ]
    },

    portal: {
      label: 'Portal',
      live: 'live/portal.html',
      variants: [
        {
          id: 'pth',
          label: 'Portal header',
          desc: "The portal's own bar instead of the website's: the GildedBox | Portal lock, and the utilities ordered out to the edge.",
          status: 'in-progress',
          href: 'live/portal.html?pth=1',
          ready: true
        },
        {
          id: 'hero-start',
          label: 'Start Gifting layouts',
          desc: 'The hero of the portal landing rebuilt around the Start Gifting entry, with the greeting kept out of its way.',
          status: 'in-progress',
          href: 'live/portal.html?hero=start',
          ready: true
        }
      ]
    },

    booking: {
      label: 'Book a meeting',
      live: 'live/book-a-meeting.html',
      variants: [
        {
          /* ready:false — решение записано раньше кода: страница
             ещё не читает ?v=, и до того дня вариант виден, но не
             кликается. Так реестр говорит «в разработке» вместо
             того, чтобы вести в ссылку, которая молча откроет
             сегодняшнюю страницу. */
          id: 'proposition',
          label: 'Proposition',
          desc: 'The meeting page led by the proposition: what the call is for, said before the calendar asks for a day.',
          status: 'in-progress',
          href: 'live/book-a-meeting.html?v=proposition',
          ready: false
        }
      ]
    },

    /* Страницы без живого двойника. У них live указывает на саму
       мерочную страницу: она и есть эталон, с которым сверяются. */
    auth: {
      label: 'Auth',
      live: 'system/pages/auth.html',
      variants: []
    },

    pages: {
      label: 'Component pages',
      live: 'system/pages/index.html',
      variants: []
    },

    oro: {
      label: 'Design system',
      live: 'system/oro/index.html',
      variants: []
    },

    hub: {
      label: 'Hub',
      live: 'index.html',
      variants: []
    }
  };

  /* ---- Адреса и опознание текущего места -------------------
     Разрешает адрес сам браузер (пустой <a href>), поэтому
     сравнение честно и на file://, и на хостинге. Путь папки
     приравнен к её index.html: /catalog/ и /catalog/index.html
     это одно место. */
  function resolve(href) {
    var probe = document.createElement('a');
    probe.href = href;
    return probe;
  }

  function samePath(href) {
    var p = resolve(href).pathname.replace(/\/$/, '/index.html');
    return p === location.pathname.replace(/\/$/, '/index.html');
  }

  /* Вариант считается ТЕКУЩИМ, если совпал путь И каждый параметр
     из его query стоит в адресе страницы с тем же значением.
     Подмножество, не равенство: чекаут носит ?v=2 рядом с чужими
     параметрами сценария, и вариант от этого не перестаёт быть
     собой. Пустой query у Live обрабатывается отдельно: Live
     активен тогда, когда путь тот же, а ни один вариант не сошёлся. */
  function matches(href) {
    if (!samePath(href)) return false;
    var want = new URLSearchParams(resolve(href).search);
    var have = new URLSearchParams(location.search);
    var ok = true;
    want.forEach(function (value, key) {
      if (have.get(key) !== value) ok = false;
    });
    return ok;
  }

  /* Срез для одной страницы: первая строка всегда Live, дальше
     варианты. root — путь до корня студии ОТ ПОТРЕБИТЕЛЯ. */
  function forPage(pageId, root) {
    var page = PAGES[pageId];
    if (!page) return null;
    root = root || '';

    var variants = page.variants.map(function (v) {
      return {
        id: v.id,
        label: v.label,
        desc: v.desc,
        status: v.status,
        ready: v.ready !== false,
        href: root + v.href,
        current: v.ready !== false && matches(root + v.href)
      };
    });

    var anyCurrent = variants.some(function (v) { return v.current; });

    return {
      id: pageId,
      label: page.label,
      live: {
        label: 'Live',
        href: root + page.live,
        current: samePath(root + page.live) && !anyCurrent
      },
      variants: variants
    };
  }

  /* Все комнаты подряд, страница за страницей, пустые опущены:
     это то, что рисует sandboxes.html и что считает хаб. */
  function rooms(root) {
    root = root || '';
    var out = [];
    Object.keys(PAGES).forEach(function (id) {
      var slice = forPage(id, root);
      if (slice && slice.variants.length) out.push(slice);
    });
    return out;
  }

  function count() {
    var n = 0;
    Object.keys(PAGES).forEach(function (id) { n += PAGES[id].variants.length; });
    return n;
  }

  window.GB_SANDBOXES = {
    pages: PAGES,
    forPage: forPage,
    rooms: rooms,
    count: count,
    matches: matches
  };
})();
