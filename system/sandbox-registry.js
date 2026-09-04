/* ============================================================
   SANDBOX REGISTRY — один источник песочниц (gbppl-sandboxes-3,
   Тон 2026-08-25, копи-правка 2026-08-26; теги и дата последней
   активности gbppl-sandboxes-4, Тон 2026-08-28; имена по странице
   gbppl-sandbox-names-1 и день рождения варианта
   gbppl-sandbox-projects-1, Тон 2026-08-31; ЭЛЕМЕНТЫ И ИХ ВАРИАНТЫ
   gbppl-proto-model-1, Тон 2026-09-01)
   ------------------------------------------------------------
   ДВА КАТАЛОГА В ОДНОМ ФАЙЛЕ (gbppl-proto-model-1). Постановка Тона
   01.09 (спека studio\docs\PROTOTYPE-MODEL-SPEC.md) развела то, что
   до сих пор лежало одной кучей:

     PAGES     ВЕРСИИ СТРАНИЦЫ: страница, собранная целиком иначе
               (Today's flow против Shared quantity pool). Носитель —
               ключ ?v= и ему подобные, выбор один на страницу.
     ELEMENTS  ЭЛЕМЕНТЫ И ИХ ВАРИАНТЫ: именованная ЧАСТЬ страницы,
               которую можно подменить, не заводя ради неё второй
               страницы. Тон: «хедер из Live или Suggested прямо на
               Live-странице, чтобы не создавать отдельный прототип
               ради хедера. Рассел берёт Live-главную, переключает
               хедер на Suggested, смотрит, аппрувит».

   Элементы бывают СКВОЗНЫЕ (scope 'site': хедер, ключ едет по
   внутренним ссылкам — withHdr в header.js) и ЛОКАЛЬНЫЕ (scope
   'page': ключ живёт на своей странице). Оба каталога читают консоль
   (секции Prototype и Demo), полка sandboxes.html и карта.
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
   2. variant.label — имя ВАРИАНТА простыми словами. Ни жаргона файлов
      («pre-footer», «pth»), ни кодов вместо имени: карточку читают
      снаружи команды, и «Shared quantity pool» говорит то же, что
      говорил «V2 · Shared pool», не требуя знать, что такое V2.
      Внутренние ключи остались в id и в href, ссылки не двигались.

      НОМЕР ВЕРСИИ ВЕРНУЛСЯ ПЕРЕД ИМЕНЕМ, НО НЕ ВМЕСТО НЕГО
      (gbppl-panel-version-1, Тон 2026-09-04, дословно: «называй
      версии через V, потом полное название»). Правка 31.08 сняла
      код ЦЕЛИКОМ, вместе с номером, и команда осталась без общего
      слова: сам Тон 03.09 говорит «Версия V2 — часть песочницы», и
      ни полка, ни консоль ответить ему тем же словом не могли.
      Теперь печатается «V2 · Shared quantity pool»: номер вперёд,
      полное имя следом, и претензия 31.08 («Что такое V2 Shared
      Pool?» — код БЕЗ имени) остаётся закрытой.

      НОМЕР НЕ ХРАНИТСЯ, ОН ВЫЧИСЛЯЕТСЯ ИЗ КЛЮЧА (verName ниже):
      «V2» — это ?v=2, и второго места, где это число можно
      разойтись с адресом, не заводится. Поле label остаётся именем
      человеку, как и было, а срез (forPage) отдаёт потребителям уже
      собранную строку — поэтому полка, консоль и карта получили
      новый формат, не изменившись ни строкой.

      ВЕРСИЯ БЕЗ НОМЕРА В МИРЕ НОМЕРА НЕ ПОЛУЧАЕТ. Правило
      механическое: id вида v<цифры> (то есть ключ ?v=1|2|3) даёт
      «V<цифры> · », всё остальное печатается как есть. У
      catalog/prefooter-light ключ ?prefooter=light, у
      booking/proposition ключ ?v=proposition — числа за ними нет
      нигде, и «V1» там было бы кодом, который не на что перевести:
      ровно тот дефект, от которого правило 31.08. Пронумерованы
      сегодня только версии чекаута, и это честный ответ, а не
      исключение по имени страницы.

      ВАРИАНТЫ ЭЛЕМЕНТОВ ПРАВИЛО НЕ ТРОГАЕТ (ELEMENTS ниже): у
      хедера и сайдбара версий нет, у них имена («Sign in form»,
      «Russell»), и Тон говорил про ВЕРСИИ СТРАНИЦ.

      `updated` НЕ ДВИНУТ ни у одного варианта, и по той же причине,
      по которой его не двигало переименование статуса выше:
      решение варианта не шевелилось, шевельнулось НАШЕ СЛОВО для
      него. Полка, сказавшая бы «updated today» про девять чужих
      прототипов, соврала бы ровно так, как этого правила боялись.

   ЧТО ЗДЕСЬ ЛЕЖИТ
   PAGES[id] = {
     label     имя страницы человеку (sentence case), словами Тона:
               «Category page», «Checkout page», «Book a meeting form»
     live      адрес живой версии ОТ КОРНЯ СТУДИИ (без query)
     variants  [] массив снимков решений, может быть пустым
   }
   variant = {
     id      стабильный ключ внутри страницы (внутренний: v1, v2, pth)
     label   имя варианта простыми словами («Shared quantity pool»).
             НОМЕР ВЕРСИИ СЮДА НЕ ПИШЕТСЯ: его добавляет verName по
             ключу (gbppl-panel-version-1), и потребитель получает
             «V2 · Shared quantity pool» уже из среза
     desc    одна строка: что этот вариант решает. ЧЕЛОВЕЧЕСКИМ
             языком, sentence case, без em dash и без внутренних
             ссылок на тикеты (gbppl-sandboxes-3, 26.08: карточки
             читают снаружи команды)
     status  'in-progress' | 'suggested' | 'approved'
             (gbppl-proto-model-1: слово 'proposal' снято ВЕЗДЕ.
             Тон говорит Suggested — «хедер из Live или Suggested
             (новая версия на рассмотрении)», — и полка, карта и
             консоль обязаны говорить одно слово. Ключ статуса и
             есть то слово, которое печатается человеку, поэтому
             переименован он сам, а не подпись поверх него.
             `updated` при этом НЕ ДВИНУТ ни у одного варианта:
             правило gbppl-sandboxes-4 говорит про правку варианта,
             а здесь двинулось наше СЛОВО для одного и того же
             состояния. Решение варианта не шевелилось, и полка,
             сказавшая бы «updated today» про восемь чужих
             прототипов, соврала бы ровно так, как этого правила
             боялись.)
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
      /* Пусто с 01.09 (gbppl-proto-model-1): «Sign in form» стояла
         здесь версией страницы, а на самом деле это ВАРИАНТ ХЕДЕРА —
         сквозного элемента, который живёт на любой странице с баром.
         Она переехала в ELEMENTS ниже и с полки никуда не делась:
         полка читает оба каталога. */
      variants: []
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
          status: 'suggested',
          href: 'live/catalog/index.html?prefooter=light',
          ready: true,
          /* Джулия и Рассел на живой странице категорий, отсюда
             'client feedback'; правка цветовая и по высоте лент. */
          tags: ['closing banner', 'colour', 'client feedback'],
          created: '2026-08-26',
          updated: '2026-08-31'
        }
        /* «The prototype’s own menu» (?nav=mark) стояла здесь второй
           строкой и уехала в ELEMENTS 01.09 (gbppl-proto-model-1): она
           подменяет НАВИГАЦИЮ страницы, а не собирает страницу заново,
           то есть это вариант локального элемента. На полке она
           осталась на месте. */
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
          /* Переписано 03.09 (gbppl-checkout-v2-rework-1) по фидбеку
             команды со встречи 02.09: «одна персонализация на всех»
             умерла (Юля: «такого не бывает»), пул с вычитанием тоже —
             количеством владеет только счётчик Gifts, одна строка =
             один подарок. Имя варианта Тон утвердил 31.08 и оно
             осталось: количество по-прежнему одно на все подарки
             набора. Вопрос Тону в отчёте волны. */
          /* gbppl-radio-1, 03.09, second touch of the same day: the
             address mode stopped being a toggle in the head of step
             one and became a radio select under the question, by
             Ton's word («или справа как было, или если ниже, то тем
             же радио селектом для консистентности»). Three groups of
             this version now wear system/components/radio.css. The
             desc grows one sentence, because the way a person answers
             the first question of the page is exactly the kind of
             difference from Live this line is for. */
          desc: 'Gifts are not personalized by default. One counter sets how many gifts there are, and personalization is a choice of two: none, or a row per gift. Both questions, and the choice between one address and many, are answered by the same control: a radio select.',
          status: 'in-progress',
          href: 'live/checkout.html?v=2',
          ready: true,
          tags: ['flow', 'personalization'],
          created: '2026-08-25',
          updated: '2026-09-03'
        },
        {
          id: 'v3',
          /* Имя по канону 31.08: код версии не имя. Что отличает эту
             комнату от Live и от двух соседних — страница задаёт по
             одному вопросу за раз, вместо того чтобы показать все
             сразу. Отсюда «One step at a time». Ключ v3 живёт только
             в id и в href. */
          label: 'One step at a time',
          /* Тон 03.09: «сделай третий прототип на основе второй, но с
             нашими доработками, я тебе доверяю». Две доработки, обе
             его словами: «выбор, выбор, выбор — перегружено» плюс
             «должна быть возможность вернуться назад» (аккордеон
             шагов), и «адрес доставки и фактический получатель могут
             абсолютно не совпадать с именем для персонализации на
             коробке: я могу получить гифт на себя, а на нём будет имя
             моей жены» (строка = коробка, две независимые стороны).

             Правка 03.09 (gbppl-checkout-recon-1) по фидбеку Тона на
             первый показ: «Не нравится Order Summary сбоку и маленькая
             картинка гифта. Я не просил это делать. Аккордеон в
             принципе нормально, но непонятно: он уже заполнен или ещё
             пустой.» Сводка вернулась вниз, картинка к размеру V2,
             состояния шага названы галочкой и синей кромкой. Разведка
             двенадцати публичных чекаутов, на которой это стоит:
             studio/docs/CHECKOUT-RECON.md. */
          desc: 'The page asks one question at a time: the step you are answering is open and underlined in blue, an answered step folds into one line with a tick, its answer and an Edit, and a step not yet reached stays quiet. The gift is shown at full size and the order summary sits at the foot beside payment. A row of the table is a gift box, not a person, so where a box goes and what is printed on it are two separate answers.',
          status: 'in-progress',
          href: 'live/checkout.html?v=3',
          ready: true,
          tags: ['flow', 'shipping', 'personalization'],
          created: '2026-09-03',
          updated: '2026-09-03'
        }
        /* ЧЕТВЁРТАЯ КОМНАТА СНЯТА С ПОЛКИ (gbppl-v4-retire-1, 03.09).
           Здесь стояла строка `v4` — «Delivery groups», заказ, собранный
           из партий (сколько коробок, куда, что напечатано). Заказчик
           похоронил направление в тот же день, дословно: «Нет такого
           понятия Delivery Group, никто не поймёт, тупиковое
           направление». Команда клиента читает полку и строку Version
           своими глазами, поэтому мёртвая ветка ушла с обеих
           поверхностей целиком: `ready:false` не подошёл — он не
           прячет, а гасит (вариант остаётся видимым, серым, со
           статусом), а показывать команде то, от чего она отказалась,
           и есть то, чего эта волна не хочет.
           Запись со всеми полями и провенансом стоит в истории файла,
           коммит 0dfdb6b: вернуть версию на полку = вернуть эту строку,
           ничего больше.
           ССЫЛКА НЕ СЛОМАНА (закон 0a.5). Ключ ?v=4 по-прежнему
           читается страницей и по-прежнему открывает чекаут: без своей
           строки в реестре он ведёт на дефолт страницы, ровно как
           заход без ключа вовсе. Разметка четвёртой версии из
           live\checkout.html не вырезана: снята витрина, не работа. */
      ]
    },

    portal: {
      label: 'Portal page',
      live: 'live/portal.html',
      /* Пусто с 01.09 (gbppl-proto-model-1). Обе строки, что стояли
         здесь, — «The portal’s own header» (?pth=1) и «Start gifting
         hero» (?hero=start) — подменяют по одной ЧАСТИ страницы, а не
         собирают страницу заново, и обе к тому же объявлялись второй
         раз руками в live\portal.html через addGroup. Теперь они
         варианты локальных элементов портала (ELEMENTS ниже),
         объявлены ОДИН раз, и консоль показывает их той же строкой
         выбора, что и всё остальное. */
      variants: []
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

  /* ============================================================
     ELEMENTS — ЭЛЕМЕНТЫ И ИХ ВАРИАНТЫ (gbppl-proto-model-1,
     постановка Тона 2026-09-01, спека
     studio\docs\PROTOTYPE-MODEL-SPEC.md)
     ------------------------------------------------------------
     Тон, дословно: «Страница остаётся страницей, варианты страницы —
     вариантами страницы, а элементы переключаются отдельно. Элементы
     бывают сквозные (хедер, влияет на всё) и локальные (принадлежат
     странице)... У Suggested-варианта где-то на втором/третьем уровне
     заметки: что поменялось, чем отличается от Live».

     Все пять элементов ниже СУЩЕСТВОВАЛИ и до этой волны — ключами в
     адресе (?hdr, ?nav, ?hero+?layout, ?pth+?lock) и рукописными
     addGroup в live\portal.html. Ни одного нового переключателя здесь
     не заведено: волна дала им общее описание и один дом.

     ЗАПИСЬ ЭЛЕМЕНТА
       id      внутренний ключ записи
       label   имя элемента ЧЕЛОВЕКУ: так его зовёт строка консоли
       scope   'site'  — сквозной, ключ едет по внутренним ссылкам
                         (withHdr в header.js);
               'page'  — локальный, живёт на своей странице
       page    id страницы в PAGES (только у локальных)
       probe   CSS-селектор носителя. Консоль показывает элемент
               ТОЛЬКО там, где носитель реально стоит: у сквозного
               хедера это gb-site-header, и на полке песочниц или на
               карте, где бара нет, строка не появится. Прибор не
               предлагает переключить то, чего на странице нет.
       home    id страницы, на которой вариант ПОКАЗЫВАЮТ: от него
               собирается адрес карточки на полке. У локального
               элемента это его собственная страница и поле не нужно.
       live    { note } — что значит Live ИМЕННО для этого элемента.
               Строки статуса у Live нет: он не вариант, он точка
               отсчёта.
       variants[]
         id       ЗНАЧЕНИЕ КЛЮЧА (?hdr=auth → id 'auth')
         label    имя варианта простыми словами
         also     {ключ: значение} второй оси, если вариант её
                  требует: ?hero=start у раскладок стартового блока,
                  ?pth=1 у портального бара. Live снимает и их.
         status   'suggested' | 'approved' (словарь Тона)
         note     ЧТО ИЗМЕНИЛОСЬ ПРОТИВ LIVE, человеческим языком,
                  1-3 предложения. Второй слой консоли печатает его
                  под именем варианта. Пишется по провенанс-комментам
                  файлов-носителей, не по памяти.
         created  день первого появления, НЕПОДВИЖНЫЙ
         updated  день последнего коммита-носителя. У ЭЛЕМЕНТА даты
                  считаются ПО КОММИТАМ, а не по правкам строки в
                  этом файле: у варианта элемента есть код, который
                  его делает, и честнее спросить его, чем реестр.
                  Отсюда и расхождение с полкой до 01.09: «Sign in
                  form» стояла с updated 31.08 (в тот день волна имён
                  переписала её строку), а сама форма последний раз
                  менялась 29.08, и теперь так и написано.
         refs     коммиты-носители, короткими хешами
         tags     те же теги, что у песочниц: полка фильтрует одним
                  рядом чипов оба каталога
         ready    умеет ли страница этот вариант сегодня (по умолчанию
                  да)

     ПРОВЕНАНС (снято 2026-09-01, `git log -S` по файлам-носителям;
     записывается один раз, дальше ведут волны):

       элемент · вариант        коммиты                    дни
       header · auth            1b8e6c0 e7dc772 7bf13e4    28.08
                                e6f47e6                    29.08
       catalog-nav · mark       11daa0a                    31.08
       portal-sidebar · russell 7c36c66 050a4af ce4b90f    12.08
       portal-sidebar · ton     7162cab 8615f82 3a09c59    12→17.08
       portal-sidebar · ren     ef1beea e10b225 e23bd22    17→19.08
       portal-start · grid      833bbc1 e6afff0            18.08
       portal-start · split     e6afff0                    18.08
       portal-start · band      e6afff0 34e8dfd            18.08
       portal-bar · divider     dd08ee5 6cc9124 8e7ade7    19→25.08
       portal-bar · stack       dd08ee5 6cc9124 8e7ade7    19→25.08
     ============================================================ */
  var ELEMENTS = [
    {
      id: 'header',
      label: 'Header',
      scope: 'site',
      key: 'hdr',
      probe: 'gb-site-header',
      /* ГДЕ ЕГО ПОКАЗЫВАТЬ. Тон 31.08: «прототип Sign In form должен
         открывать эту страницу сразу, а не просто главную», и
         причина, записанная тогда же: «там бар в твёрдой земле и
         иконка аккаунта на виду, а не спрятана за прозрачным героем».
         Дверь тогда поставили на live\book-a-meeting.html, а у той
         страницы БАРА НЕТ ВОВСЕ (замер 01.09: ни gb-site-header, ни
         header.js в файле), то есть ключ там не значит ничего.
         Страница, которая отвечает его причине, — категории: белый
         бар в твёрдой земле, человечек на виду, и это публичная
         страница сайта, а не касса. Вопрос Тону в отчёте волны. */
      home: 'catalog',
      live: { note: 'The bar the site ships today. There is no way into an account from it: Start Gifting signs you in and walks you to the portal.' },
      variants: [
        {
          id: 'auth',
          /* Тон 31.08 зовёт этот прототип «Sign-in / Sign-up Form».
             Одна форма делает и то и другое (тот же e-mail, тот же
             код), поэтому имя одно. */
          label: 'Sign in form',
          status: 'suggested',
          /* Записка по провенансу header.js (gbppl-header-auth-1/2,
             Ton-16 28.08: «Сейчас на лайве отвратительное решение:
             кнопка Start Gifting фактически даёт авторизацию и
             отправляет на портал»). */
          note: 'The person glyph in the bar opens a drawer with the sign in form, so signing in no longer means being walked to the portal by Start Gifting. Once you are through, the glyph becomes your initials and the cart appears beside it.',
          created: '2026-08-28',
          updated: '2026-08-29',
          refs: ['1b8e6c0', 'e7dc772', '7bf13e4', 'e6f47e6'],
          tags: ['header', 'flow']
        }
      ]
    },

    {
      id: 'catalog-nav',
      label: 'Navigation',
      scope: 'page',
      page: 'catalog',
      key: 'nav',
      live: { note: 'The site bar over the build: Gifts, Customize, Portal and Explore, with our hero and our closing bands.' },
      variants: [
        {
          id: 'mark',
          label: 'The prototype’s own menu',
          status: 'suggested',
          /* По провенансу live\catalog\index.html и
             oro-ui-override.css (gbppl-catalog-mark-1, 31.08). */
          note: 'The July prototype Mark reviewed, uncovered: our five organisms step out of the page, so the build wears its own bar again, with no Customize and no Explore and the Portal folded into the person glyph. Categories are still the secondary row: this key uncovers the menu, it does not redraw it.',
          created: '2026-08-31',
          updated: '2026-08-31',
          refs: ['11daa0a'],
          tags: ['header', 'navigation', 'client feedback']
        }
      ]
    },

    {
      id: 'portal-sidebar',
      label: 'Sidebar labels',
      scope: 'page',
      page: 'portal',
      key: 'nav',
      live: { note: 'The sidebar as the portal ships it today.' },
      variants: [
        {
          id: 'russell',
          label: 'Russell',
          status: 'suggested',
          note: "Russell's naming and his two sections: the account list keeps the live order, and My Teams moves up to open the admin one.",
          created: '2026-08-12',
          updated: '2026-08-12',
          refs: ['7c36c66', '050a4af', 'ce4b90f'],
          tags: ['navigation', 'copy']
        },
        {
          id: 'ton',
          label: 'Anton',
          status: 'suggested',
          note: 'The validated order: the gift lifecycle first (catalog, design, send, history), the account after it, with Log out last of the visible items.',
          created: '2026-08-12',
          updated: '2026-08-17',
          refs: ['7162cab', '8615f82', '3a09c59'],
          tags: ['navigation', 'copy']
        },
        {
          id: 'ren',
          label: 'Ren',
          status: 'suggested',
          note: "Anton's order in the editorial skin: the same items and the same sections, with the hairlines dissolved and the active item speaking in colour alone.",
          created: '2026-08-17',
          updated: '2026-08-19',
          refs: ['ef1beea', 'e10b225', 'e23bd22'],
          tags: ['navigation', 'colour']
        }
      ]
    },

    {
      id: 'portal-start',
      label: 'Start block',
      scope: 'page',
      page: 'portal',
      /* ДВЕ ОСИ ОДНОГО ЭЛЕМЕНТА. ?hero=start поднимает блок, ?layout=
         выбирает его раскладку, и вторая без первой не значит ничего.
         Носитель выбора — layout, hero едет с ним в also. Live
         (Classic) снимает оба. */
      key: 'layout',
      live: { note: 'The approved two button zone: Start with us beside Gift on your own.' },
      variants: [
        {
          id: 'grid',
          label: 'Grid',
          also: { hero: 'start' },
          status: 'suggested',
          note: 'The two buttons become one Start Gifting zone: four promises in four cells behind a hairline cross, with the greeting stepped back out of its way.',
          created: '2026-08-18',
          updated: '2026-08-18',
          refs: ['833bbc1', 'e6afff0'],
          tags: ['hero', 'flow']
        },
        {
          id: 'split',
          label: 'Split',
          also: { hero: 'start' },
          status: 'suggested',
          note: 'The same four promises in two halves, with the buttons standing beside the cells instead of under them.',
          created: '2026-08-18',
          updated: '2026-08-18',
          refs: ['e6afff0'],
          tags: ['hero', 'flow']
        },
        {
          id: 'band',
          label: 'Band',
          also: { hero: 'start' },
          status: 'suggested',
          /* Рассел выбрал ленту из трёх, которые ему показали
             (18.08, gbppl-start-panel) — это ЗАПИСАННЫЙ ВЫБОР, но не
             аппрув через наш круг, поэтому статус тот же. Перевод в
             approved — слово Тона. */
          note: 'The same four promises in one ribbon, the arrangement Russell picked of the three he was shown.',
          created: '2026-08-18',
          updated: '2026-08-18',
          refs: ['e6afff0', '34e8dfd'],
          tags: ['hero', 'flow', 'client feedback']
        }
      ]
    },

    {
      id: 'portal-bar',
      label: 'Header on this page',
      scope: 'page',
      page: 'portal',
      /* Носитель — lock (какой замок стоит), ?pth=1 едет с ним: без
         него бар не поднимается вовсе. */
      key: 'lock',
      live: { note: "The site header, as gildedbox.com renders it, with the portal borrowing the website's chrome." },
      variants: [
        {
          id: 'divider',
          label: 'Portal bar',
          also: { pth: '1' },
          status: 'suggested',
          note: "The portal stops borrowing the site bar and puts up its own: the GildedBox | Portal lock on one line, and the utilities ordered out to the edge.",
          created: '2026-08-19',
          updated: '2026-08-25',
          refs: ['dd08ee5', '6cc9124', '8e7ade7'],
          tags: ['header', 'navigation']
        },
        {
          id: 'stack',
          label: 'Portal bar, stacked',
          also: { pth: '1' },
          status: 'suggested',
          note: 'The same portal bar with the other lock: the section name stands under the wordmark instead of beside it.',
          created: '2026-08-19',
          updated: '2026-08-25',
          refs: ['dd08ee5', '6cc9124', '8e7ade7'],
          tags: ['header', 'navigation']
        }
      ]
    }
  ];

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

  /* ИМЯ ВЕРСИИ = НОМЕР ИЗ КЛЮЧА ПЛЮС ПОЛНОЕ ИМЯ
     (gbppl-panel-version-1, Тон 04.09: «называй версии через V, потом
     полное название»). Обоснование и границы правила — в шапке файла,
     блок ИМЕНА. Одна функция на всю студию: полка, консоль и карта
     читают срез, а не поле, и расходиться им негде. */
  function verName(v) {
    var n = /^v(\d+)$/.exec(String(v.id || ''));
    return n ? 'V' + n[1] + ' · ' + v.label : v.label;
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
        label: verName(v),
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

  /* ============================================================
     ЭЛЕМЕНТЫ: АДРЕС, ОПОЗНАНИЕ, СРЕЗ (gbppl-proto-model-1)
     ------------------------------------------------------------
     Что значит «выбрать вариант элемента», записано РОВНО ОДИН РАЗ,
     в elementSearch: снять все ключи элемента и поставить ключи
     выбранного варианта. Полка собирает адрес от чистой страницы
     носителя, консоль — от сегодняшнего адреса (иначе выбор хедера
     сбросил бы версию страницы и экран), и обе зовут одну функцию.
     ============================================================ */
  function elementKeys(el) {
    var keys = [el.key];
    (el.variants || []).forEach(function (v) {
      Object.keys(v.also || {}).forEach(function (k) {
        if (keys.indexOf(k) < 0) keys.push(k);
      });
    });
    return keys;
  }

  /* Принимает и запись элемента, и её срез (у среза список ключей уже
     посчитан): консоль держит в руках срез, полка — запись, а правило
     на обоих одно. */
  function elementSearch(search, el, v) {
    var q = new URLSearchParams(search || '');
    (el.keys || elementKeys(el)).forEach(function (k) { q.delete(k); });
    if (v) {
      q.set(el.key, v.id);
      var also = v.also || {};
      Object.keys(also).forEach(function (k) { q.set(k, also[k]); });
    }
    return q.toString();
  }

  /* Вариант стоит на экране, если его ключ И каждая его вторая ось
     совпали. Путь не проверяется: сквозной элемент на то и сквозной,
     что читается на любой странице, а локальный панель показывает
     только своей странице. */
  function variantOn(el, v) {
    var q = new URLSearchParams(location.search);
    if (q.get(el.key) !== String(v.id)) return false;
    var also = v.also || {};
    return Object.keys(also).every(function (k) { return q.get(k) === String(also[k]); });
  }

  /* measured = смотреть ли на сегодняшний адрес. Полка и карта
     перечисляют то, ЧТО ЕСТЬ в студии (measured false), консоль —
     то, что стоит ЗДЕСЬ И СЕЙЧАС (measured true). */
  function sliceElement(el, root, measured) {
    root = root || '';
    var home = el.page || el.home || '';
    var page = PAGES[home];
    var base = page ? page.live : '';

    var variants = (el.variants || []).map(function (v) {
      var q = elementSearch('', el, v);
      return {
        id: v.id,
        label: v.label,
        status: v.status || 'suggested',
        note: v.note || '',
        also: v.also ? JSON.parse(JSON.stringify(v.also)) : null,
        ready: v.ready !== false,
        tags: (v.tags || []).slice(),
        created: v.created || '',
        updated: v.updated || '',
        refs: (v.refs || []).slice(),
        href: root + base + (q ? '?' + q : ''),
        current: measured ? variantOn(el, v) : false
      };
    });

    var anyCurrent = variants.some(function (v) { return v.current; });

    return {
      id: el.id,
      label: el.label,
      scope: el.scope,
      /* Кому карточка принадлежит по словам полки: сквозной говорит
         это вслух, локальный называет свою страницу. */
      owner: el.scope === 'site' ? 'Site element' : (page ? page.label : ''),
      home: home,
      key: el.key,
      keys: elementKeys(el),
      live: {
        label: 'Live',
        note: (el.live && el.live.note) || '',
        href: root + base,
        current: measured && !anyCurrent
      },
      variants: variants
    };
  }

  /* Элементы ЭТОЙ страницы: локальные по своей странице, сквозные
     везде, и все — только там, где носитель реально стоит (probe).
     Прибор не предлагает переключить то, чего на странице нет. */
  function elementsHere(pageId, root) {
    return ELEMENTS.filter(function (el) {
      if (el.scope === 'page' && el.page !== pageId) return false;
      if (el.probe && !document.querySelector(el.probe)) return false;
      return true;
    }).map(function (el) { return sliceElement(el, root, true); });
  }

  /* Все элементы студии подряд: полка и карта. */
  function elements(root) {
    return ELEMENTS.map(function (el) { return sliceElement(el, root, false); });
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

  /* Сколько всего прототипов в студии: версии страниц ПЛЮС варианты
     элементов (gbppl-proto-model-1). Вариант хедера — такой же
     прототип, как версия чекаута, и считать его вторым сортом
     значило бы вернуть тот же разнобой, ради которого волна и
     сводила два списка в один. */
  function count() {
    var n = 0;
    Object.keys(PAGES).forEach(function (id) { n += PAGES[id].variants.length; });
    ELEMENTS.forEach(function (el) { n += (el.variants || []).length; });
    return n;
  }

  window.GB_SANDBOXES = {
    pages: PAGES,
    elementList: ELEMENTS,
    forPage: forPage,
    elements: elements,
    elementsHere: elementsHere,
    elementSearch: elementSearch,
    rooms: rooms,
    count: count,
    matches: matches
  };
})();
