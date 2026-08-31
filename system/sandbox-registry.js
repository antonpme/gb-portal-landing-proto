/* ============================================================
   SANDBOX REGISTRY — один источник песочниц (gbppl-sandboxes-3,
   Тон 2026-08-25, копи-правка 2026-08-26; теги и дата последней
   активности gbppl-sandboxes-4, Тон 2026-08-28; имена по странице
   gbppl-sandbox-names-1 и день рождения варианта
   gbppl-sandbox-projects-1, Тон 2026-08-31)
   ------------------------------------------------------------
   КАК ЗАРЕГИСТРИРОВАТЬ НОВУЮ ПЕСОЧНИЦУ (три строки):
   1. Найди страницу по её id в PAGES (или заведи новую запись:
      label, live, variants: []).
   2. Добавь в variants объект: id, label, desc (одна строка),
      status, href (от корня студии, с query), ready, tags,
      created (день, когда ты его завёл), updated.
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

   ИМЕНА (gbppl-sandbox-names-1, Тон 2026-08-31, по скрину полки
   Sandboxes): «Самый большой хаос здесь. Я не пойму, какой прототип
   что означает. Что такое Light Pre-Footer? Что такое V2 Shared Pool?
   Прототипы должны называться по странице: Checkout Page, Home Page,
   Category Page, Sign-in / Sign-up Form, Book a Meeting Form. Я не
   понимаю, что нажимать и куда ведёт.»

   Отсюда два правила имени, и оба живут ЗДЕСЬ, потому что реестр —
   один источник:
   1. PAGES[id].label — имя СТРАНИЦЫ в словах Тона, и оно у страницы
      ОДНО на всю студию. Полка песочниц печатает его заголовком
      карточки, консоль повторяет его в таблице PLACES (studio-panel.js),
      карта — в узле дерева. Три места, одна строка; расходятся они
      только через чью-то правку, и правка начинается отсюда.
   2. variant.label — имя ВАРИАНТА простыми словами. Ни кодов версии
      («V1 ·», «V2 ·»), ни жаргона файлов («pre-footer», «pth»):
      карточку читают снаружи команды, и «Shared quantity pool»
      говорит то же, что говорил «V2 · Shared pool», не требуя знать,
      что такое V2. Внутренние ключи остались в id и в href, ссылки
      не двигались.

   ЧТО ЗДЕСЬ ЛЕЖИТ
   PAGES[id] = {
     label     имя страницы человеку (sentence case), словами Тона:
               «Category page», «Checkout page», «Book a meeting form»
     live      адрес живой версии ОТ КОРНЯ СТУДИИ (без query)
     variants  [] массив снимков решений, может быть пустым
   }
   variant = {
     id      стабильный ключ внутри страницы (внутренний: v1, v2, pth)
     label   имя варианта простыми словами («Shared quantity pool»)
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
             'navigation', 'hero', 'closing banner', 'flow',
             'shipping', 'personalization', 'copy', 'colour',
             'client feedback'. Тег 'pre-footer' переименован в
             'closing banner' (gbppl-sandbox-names-1): тег стоит
             чипом НА КАРТОЧКЕ и мишенью в фильтре, его читают те же
             глаза, что и имя, а «pre-footer» — имя места в вёрстке,
             не имя того, что человек видит.
             СТРАНИЦУ И СТАТУС В ТЕГИ НЕ ПИШЕМ: статус страница
             песочниц печатает бейджем сама, имя страницы — своим
             заголовком, и повтор превратил бы фильтр в шум.
     created 'YYYY-MM-DD', день, когда вариант ПОЯВИЛСЯ. Пишется
             один раз и больше не двигается никогда: это возраст
             прототипа, а не его пульс. Провенанс ниже.
     updated 'YYYY-MM-DD', день последнего изменения варианта.
             Провенанс первичных значений ниже.
   }

   ПОЧЕМУ У ВАРИАНТА ПОЯВИЛСЯ ВОЗРАСТ (gbppl-sandbox-projects-1,
   Тон 2026-08-31, по скрину полки): «Дат создания не видно (updated
   есть, created нет; дата должна быть вверху справа, где Proposal,
   только справа)». Одно поле `updated` отвечало на вопрос «что
   шевелилось последним» и молчало о том, «сколько это здесь стоит»,
   а на полке-менеджере проектов это два разных вопроса. Поле
   `created` отвечает на второй, и оно неподвижное: волна, которая
   правит вариант, двигает ТОЛЬКО `updated` (правило выше).

   ПРОВЕНАНС `created` (gbppl-sandbox-projects-1, снято 2026-08-31,
   записывается ОДИН РАЗ). Правило честное и воспроизводимое: первое
   появление СТРОКИ ВАРИАНТА в истории этого файла,
     git log --reverse --follow -S"id: '<id>'" -- system/sandbox-registry.js
   то есть коммит, в котором вариант впервые был объявлен. Не дата
   файла страницы: страница живёт своей жизнью и старше любого
   решения о ней.

     вариант                   коммит     день        что это было
     home/header-auth          d970cc9    2026-08-28  вход в хедере получил комнату
     catalog/prefooter-light   d01ce44    2026-08-26  светлые закрывающие ленты
     catalog/nav-mark          b51d455    2026-08-31  июльский бар, который смотрел Марк
     checkout/v1               aa2f748    2026-08-25  «а где Checkout версии 1?»
     checkout/v2               5acb6f0    2026-08-25  первый реестр студии
     portal/pth                5acb6f0    2026-08-25  первый реестр студии
     portal/hero-start         5acb6f0    2026-08-25  первый реестр студии
     booking/proposition       5acb6f0    2026-08-25  первый реестр студии

   Пять из восьми родились в один день вместе с самим реестром
   (5acb6f0, 25.08), и это честный ответ: до него песочницы жили
   строками в разметке, и дня рождения у них не было вовсе.

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
   имя).

   И ничья повторилась 31.08: gbppl-sandbox-names-1 переписала имя
   каждого варианта, то есть тронула копию каждого, и по правилу выше
   все восемь получили 2026-08-31. Полка в этот день пишет «updated
   today» везде и разводит ничью тем же вторым ключом. Это не сбой
   поля, а тот же вопрос Тону во второй раз: дата варианта — про его
   РЕШЕНИЕ или про любую правку его строки.

   Со следующей волны поле расходится. Вопрос Тону: не
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
      label: 'Home page',
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
          /* Тон 31.08 зовёт этот прототип «Sign-in / Sign-up Form».
             Одна форма делает и то и другое (тот же e-mail, тот же
             код), поэтому имя одно: вторая половина названия обещала
             бы второй экран, которого нет. */
          label: 'Sign in form',
          desc: 'Sign in from the account icon in the header, in a drawer. The person then becomes your initials, with the cart beside them.',
          status: 'proposal',
          href: 'live/index.html?hdr=auth',
          ready: true,
          tags: ['header', 'flow'],
          created: '2026-08-28',
          updated: '2026-08-31'
        }
      ]
    },

    catalog: {
      /* gbppl-panel-10: одно имя у одной страницы, и его печатают
         полка песочниц, консоль (PLACES в studio-panel.js) и карта.
         gbppl-sandbox-names-1: имя стало «Category page» — слово
         Тона о ней («страница категорий GIFTS», 31.08). Согласовано
         во всех трёх местах в этой же волне. */
      label: 'Category page',
      live: 'live/catalog/index.html',
      variants: [
        {
          /* Ton 26.08, after Julia and Russell on the live category page:
             «попробовать сделать инверсию этих компонентов (цветовую,
             светлыми)... сделать варианты с инверсией, чтобы они были
             светлые». The two modifiers live in home.css; the page reads
             ?prefooter= and names them. */
          id: 'prefooter-light',
          /* Было «Light pre-footer». Тон 31.08: «Что такое Light
             Pre-Footer?» — pre-footer это имя МЕСТА в вёрстке, а не
             того, что человек увидит; увидит он закрывающий баннер и
             ленту преимуществ. */
          label: 'Light closing banner',
          desc: 'The closing banner and the advantages in light ink, tighter, no gradient.',
          status: 'proposal',
          href: 'live/catalog/index.html?prefooter=light',
          ready: true,
          /* Джулия и Рассел на живой странице категорий, отсюда
             'client feedback'; правка цветовая и по высоте лент. */
          tags: ['closing banner', 'colour', 'client feedback'],
          created: '2026-08-26',
          updated: '2026-08-31'
        },
        {
          /* Ton 31.08: «должна быть версия-прототип страницы категорий
             GIFTS, где меню переделано как просил Марк; её нет ни на
             live, ни в прототипе, это проблема». Она была, но под нашей
             накладкой: бар бандла и есть тот, который Марк смотрел
             27.07, и три его пункта из четырёх в нём уже стоят (ни
             CUSTOMIZE, ни EXPLORE в хроме, Portal за человечком,
             консьерж плавающий). Ключ снимает подмену хрома целиком и
             показывает страницу такой, какой он её видел. Четвёртый
             пункт (категории вместо мега-меню Gifts) здесь НЕ
             построен: открыть не значит перерисовать, и перерисовку
             заказывает Тон. gbppl-catalog-mark-1. */
          id: 'nav-mark',
          label: 'The prototype’s own menu',
          desc: 'The July bar Mark reviewed: no Customize, no Explore, Portal behind the person glyph.',
          status: 'proposal',
          href: 'live/catalog/index.html?nav=mark',
          ready: true,
          tags: ['header', 'navigation', 'client feedback'],
          created: '2026-08-31',
          updated: '2026-08-31'
        }
      ]
    },

    checkout: {
      label: 'Checkout page',
      live: 'live/checkout.html',
      variants: [
        {
          /* Ton 25.08: «а где Checkout версии 1 в Sandbox?» — both
             versions are still candidates in front of the team, so
             V1 stands here as a room of its own, not only as Live. */
          id: 'v1',
          /* Было «V1 · Today’s flow». Тон 31.08: код версии не имя,
             его знают только внутри. Ключ v1 остался в id и в href. */
          label: 'Today’s flow',
          desc: "Today's checkout with the agreed quick fixes: one address or a different address per gift, the steps renamed, bulk personalize and edit selected.",
          status: 'in-progress',
          href: 'live/checkout.html?v=1',
          ready: true,
          /* Адрес на подарок = 'shipping', bulk personalize =
             'personalization', переименованные шаги = 'copy'. */
          tags: ['flow', 'shipping', 'personalization', 'copy'],
          created: '2026-08-25',
          updated: '2026-08-31'
        },
        {
          id: 'v2',
          /* Было «V2 · Shared pool». Тон 31.08: «Что такое V2 Shared
             Pool?» — теперь имя говорит, ЧТО общее: количество. */
          label: 'Shared quantity pool',
          desc: 'Gifts are not personalized by default. Quantity is a pool on the gift, and personalization is an add-on behind a choice of two doors.',
          status: 'in-progress',
          href: 'live/checkout.html?v=2',
          ready: true,
          tags: ['flow', 'personalization'],
          created: '2026-08-25',
          updated: '2026-08-31'
        }
      ]
    },

    portal: {
      label: 'Portal page',
      live: 'live/portal.html',
      variants: [
        {
          id: 'pth',
          /* Было «Portal header» рядом с ключом pth. Ключ остался в
             href, а имя теперь говорит, ЧЕЙ это хедер. */
          label: 'The portal’s own header',
          desc: "Instead of the website's bar: the GildedBox | Portal lock, and the utilities ordered out to the edge.",
          status: 'in-progress',
          href: 'live/portal.html?pth=1',
          ready: true,
          tags: ['header', 'navigation'],
          created: '2026-08-25',
          updated: '2026-08-31'
        },
        {
          id: 'hero-start',
          label: 'Start gifting hero',
          desc: 'The hero of the portal landing rebuilt around the Start Gifting entry, with the greeting kept out of its way.',
          status: 'in-progress',
          href: 'live/portal.html?hero=start',
          ready: true,
          tags: ['hero', 'flow'],
          created: '2026-08-25',
          updated: '2026-08-31'
        }
      ]
    },

    booking: {
      label: 'Book a meeting form',
      live: 'live/book-a-meeting.html',
      variants: [
        {
          /* ready:false — решение записано раньше кода: страница
             ещё не читает ?v=, и до того дня вариант виден, но не
             кликается. Так реестр говорит «в разработке» вместо
             того, чтобы вести в ссылку, которая молча откроет
             сегодняшнюю страницу. */
          id: 'proposition',
          label: 'Led by the proposition',
          desc: 'The meeting page led by the proposition: what the call is for, said before the calendar asks for a day.',
          status: 'in-progress',
          href: 'live/book-a-meeting.html?v=proposition',
          ready: false,
          tags: ['copy', 'flow'],
          created: '2026-08-25',
          updated: '2026-08-31'
        }
      ]
    },

    /* Страницы без живого двойника. У них live указывает на саму
       мерочную страницу: она и есть эталон, с которым сверяются. */
    auth: {
      /* Четыре записи ниже без вариантов: на полку они не выходят
         (rooms() пропускает пустые), но имя у страницы одно, и оно
         здесь совпадает с тем, что печатает консоль в PLACES —
         иначе первая же песочница на такой странице привезла бы на
         полку второе имя (gbppl-sandbox-names-1). */
      label: 'Sign in, measured',
      live: 'system/pages/auth.html',
      variants: []
    },

    pages: {
      label: 'Component pages',
      live: 'system/pages/index.html',
      variants: []
    },

    oro: {
      label: 'About Oro',
      live: 'system/oro/index.html',
      variants: []
    },

    hub: {
      label: 'Hub homepage',
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
        created: v.created || '',
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
