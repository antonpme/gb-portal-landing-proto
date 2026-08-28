/* ============================================================
   SANDBOX REGISTRY — один источник песочниц (gbppl-sandboxes-3,
   Тон 2026-08-25, копи-правка 2026-08-26; теги и дата последней
   активности gbppl-sandboxes-4, Тон 2026-08-28)
   ------------------------------------------------------------
   КАК ЗАРЕГИСТРИРОВАТЬ НОВУЮ ПЕСОЧНИЦУ (три строки):
   1. Найди страницу по её id в PAGES (или заведи новую запись:
      label, live, variants: []).
   2. Добавь в variants объект: id, label, desc (одна строка),
      status, href (от корня студии, с query), ready, tags,
      updated.
   3. Всё. Панель, PROTO-блок чекаута и sandboxes.html рисуются
      отсюда, руками ничего дописывать не нужно.

   ПРАВИЛО ДЛЯ КАЖДОЙ СЛЕДУЮЩЕЙ ВОЛНЫ (gbppl-sandboxes-4): волна,
   которая ТРОГАЕТ вариант — его страницу, его параметр, его копию,
   его статус, — обновляет `updated` этого варианта В ТОМ ЖЕ
   КОММИТЕ. Дата, которую никто не двигает, врёт быстрее, чем
   отсутствующая: сортировка «last active» на странице песочниц
   читает ровно это поле, и ничего другого у неё нет.
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
     tags    [] области, которых вариант касается. Короткие строки
             в sentence case, ТОЛЬКО реальные по смыслу desc и по
             истории волн в шапке файла варианта: 'header',
             'navigation', 'hero', 'pre-footer', 'flow',
             'shipping', 'personalization', 'copy', 'colour',
             'client feedback'. СТРАНИЦУ И СТАТУС В ТЕГИ НЕ
             ПИШЕМ: и то и другое страница песочниц печатает
             бейджем сама, из PAGES[id].label и из status, и
             повтор превратил бы фильтр в шум.
     updated 'YYYY-MM-DD', день последнего изменения варианта.
             Провенанс первичных значений ниже.
   }

   ПРОВЕНАНС ПЕРВИЧНЫХ `updated` (gbppl-sandboxes-4, снято
   2026-08-28, записывается ОДИН РАЗ; дальше поле ведут волны).
   Правило: `git log -1 --format=%as` по файлу страницы варианта
   (href без query) И `git log -L <строка id>` по строке варианта
   в этом файле, берётся БОЛЕЕ ПОЗДНЯЯ из двух дат.

     вариант                файл страницы   строка здесь   взято
     catalog/prefooter-light   2026-08-27      2026-08-26   08-27
     checkout/v1               2026-08-27      2026-08-25   08-27
     checkout/v2               2026-08-27      2026-08-25   08-27
     portal/pth                2026-08-27      2026-08-25   08-27
     portal/hero-start         2026-08-27      2026-08-25   08-27
     booking/proposition       2026-08-27      2026-08-25   08-27

   Все шесть сошлись на 2026-08-27, и это честный ответ, а не сбой
   замера: 27.08 прошла волна по КАЖДОЙ живой странице (герой
   каталога, контейнер, чекаут на организме, лид-форма букинга,
   портал), и файл страницы у всех шести сдвинулся в один день.
   Поэтому в первый день «last active» — ничья, и сортировка
   разводит её вторым ключом (порядок страниц в реестре, потом
   имя). Со следующей волны поле расходится. Вопрос Тону: не
   правильнее ли считать датой варианта день, когда двигалось ЕГО
   собственное решение (строка в реестре: 25 и 26.08), а не день,
   когда кто-то трогал общий файл страницы.

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
      variants: [
        {
          /* Ton-16, 28.08: «Сейчас на лайве отвратительное решение:
             кнопка Start Gifting фактически даёт авторизацию и
             отправляет на портал... Это единственное, что мы точно не
             хотим повторять за текущим лайвом», и там же: «Попробуем
             так сделать на сэндбоксе и посмотрим, как оно будет
             выглядеть». Ключ читает <gb-site-header>, поэтому та же
             комната открывается и на каталоге (?hdr=auth едет по
             внутренним ссылкам); дверь ведёт на главную, потому что
             там бар прозрачный и обе его земли видно сразу. */
          id: 'header-auth',
          label: 'Sign in by the account icon',
          desc: 'One blue button and a row of glyphs. The person opens a sign in drawer, then becomes your initials with the cart beside them.',
          status: 'proposal',
          href: 'live/index.html?hdr=auth',
          ready: true,
          tags: ['header', 'flow'],
          updated: '2026-08-28'
        }
      ]
    },

    catalog: {
      /* gbppl-panel-10: «Gifts catalog», как в консоли (PLACES в
         studio-panel.js) и на карте страниц. Одно имя у одной
         страницы: имя отсюда печатают полка песочниц и карточка
         комнаты, и «Catalog» рядом с «Gifts catalog» читалось как
         две разные страницы. */
      label: 'Gifts catalog',
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
          ready: true,
          /* Джулия и Рассел на живой странице категорий, отсюда
             'client feedback'; правка цветовая и по высоте лент. */
          tags: ['pre-footer', 'colour', 'client feedback'],
          updated: '2026-08-27'
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
          label: 'V1 · Today’s flow',
          desc: "Today's checkout with the agreed quick fixes: one address or a different address per gift, the steps renamed, bulk personalize and edit selected.",
          status: 'in-progress',
          href: 'live/checkout.html?v=1',
          ready: true,
          /* Адрес на подарок = 'shipping', bulk personalize =
             'personalization', переименованные шаги = 'copy'. */
          tags: ['flow', 'shipping', 'personalization', 'copy'],
          updated: '2026-08-27'
        },
        {
          id: 'v2',
          label: 'V2 · Shared pool',
          desc: 'Gifts are not personalized by default. Quantity is a pool on the gift, and personalization is an add-on behind a choice of two doors.',
          status: 'in-progress',
          href: 'live/checkout.html?v=2',
          ready: true,
          tags: ['flow', 'personalization'],
          updated: '2026-08-27'
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
          ready: true,
          tags: ['header', 'navigation'],
          updated: '2026-08-27'
        },
        {
          id: 'hero-start',
          label: 'Start Gifting layouts',
          desc: 'The hero of the portal landing rebuilt around the Start Gifting entry, with the greeting kept out of its way.',
          status: 'in-progress',
          href: 'live/portal.html?hero=start',
          ready: true,
          tags: ['hero', 'flow'],
          updated: '2026-08-27'
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
          ready: false,
          tags: ['copy', 'flow'],
          updated: '2026-08-27'
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
        /* Копия массива, а не сам массив: срез отдают наружу, и
           потребитель, который отсортирует теги у себя, не должен
           переставлять их в реестре (gbppl-sandboxes-4). */
        tags: (v.tags || []).slice(),
        updated: v.updated || '',
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
