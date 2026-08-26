/* ============================================================
   DEMO COMPONENT: GUEST AUTH ZONE, JS-шаблоны   gbppl-demo-auth
   ------------------------------------------------------------
   Регистрирует три элемента маршрута /guest/auth — пиксельная
   копия https://portal.gildedbox.com/guest/auth (DOM и состояния
   сняты Playwright 18.08, числа = harvest public-login 17.08,
   правила в auth.css):

     <gb-guest-header>  гостевой хедер портала: живая анатомия
                        header(h-80 плейсхолдер) > div.fixed
                        (#fcfdfd, с lg white/90 + blur 6px, тень
                        константная) > div.container. Отличается
                        от <gb-site-header>: CTA-пара Book a
                        Meeting + Start Gifting (вместо My Portal),
                        БЕЗ корзины, ниже lg бургер + знак + поиск.
                        Пункты нава и CTA носят аппрувнутые классы
                        .gbh-* (header.css подключать рядом).
     <gb-field>         underline-поле: лейбл 11/12 caps 600 +
                        инпут Inter 300 14/16/18, семья 48/56/64;
                        состояния: пустое / focus (гаснет только
                        плейсхолдер) / filled / error (бордер
                        red-500 + span[role=alert].text-red-600);
                        атрибут eye — глазок пароля.
     <gb-auth-flow>     колонка формы max-w 600 и ФЛОУ живого
                        гостя: signin (e-mail + Google) → сабмит
                        пустого/невалидного = ошибка «Please enter
                        a valid email address» → валидный e-mail =
                        шаг verify (конверт, serif-титул, radio-
                        карточки Use code / Use password, 6 ячеек
                        OTP или пароль+confirm, Continue disabled
                        до заполнения, Resend с таймером, Use a
                        different email → назад). Бэкенда нет:
                        код никуда не уходит, Continue инертен.

   Живые имена классов сохранены в разметке как данные для замера
   (селекторы конфига public-login.json совпадают один в один);
   стилевые правила висят на хуках .gbg-* / .gba-*. Ссылок в
   карточке на статичном шаге НЕТ, как на живом (absence-пробник
   auth-links): DOM шагов пересобирается целиком при переключении,
   скрытых <a> на старте не существует.
   Иконки (стрелка, конверт, глазок, бургер, поиск, G): инлайн-SVG
   в боксах живых глифов — иконошрифт лайва не переносится
   (правило футера/каталога). Никаких fetch-инклюдов: работает с
   file:// и на GitHub Pages.
   ============================================================ */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---------------- ИКОНКИ (инлайн-SVG, 1em-боксы) ---------------- */

  var ICON_ARROW =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4 12h15M13 6l6 6-6 6"/></svg>';

  var ICON_MAIL =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="2.5" y="4.5" width="19" height="15" rx="1.5"/>' +
      '<path d="m3 5.5 9 7 9-7"/></svg>';

  var ICON_EYE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/>' +
      '<circle cx="12" cy="12" r="2.8"/></svg>';

  var ICON_SEARCH =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>';

  /* Живой четырёхцветный G (paths сняты с виджета GSI 18.08). */
  var ICON_GOOGLE =
    '<svg viewBox="0 0 48 48" aria-hidden="true">' +
      '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
      '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
      '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
      '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>' +
    '</svg>';

  /* ---------------- GUEST HEADER ---------------- */

  var GUEST_HEADER_TEMPLATE = function (logoSrc) {
    return (
      '<header class="gbg-header">' +
        '<div class="fixed gbg-bar">' +
          '<div class="container gbg-inner">' +
            '<div class="gbg-lead">' +
              '<button class="gbg-burger" type="button" aria-label="Menu">' +
                '<span></span><span></span><span></span>' +
              '</button>' +
              '<a href="#" class="gbg-brand" aria-label="GildedBox home">' +
                '<img src="' + esc(logoSrc) + '" alt="GildedBox">' +
              '</a>' +
              '<nav class="gbg-nav" aria-label="Primary navigation">' +
                '<button class="gbh-link" type="button">Gifts</button>' +
                '<button class="gbh-link" type="button">Customize <span class="gbh-beta">Beta</span></button>' +
                '<button class="gbh-link" type="button">Portal</button>' +
                '<button class="gbh-link" type="button">Explore</button>' +
              '</nav>' +
            '</div>' +
            '<div class="gbg-actions">' +
              '<a class="gb-btn gb-btn--s gb-btn--filled gb-btn--primary" href="#"><span class="gb-btn__label" data-pc-section="label">Book a Meeting</span></a>' +
              '<a class="gb-btn gb-btn--s gb-btn--outline gb-btn--secondary" href="#"><span class="gb-btn__label" data-pc-section="label">Start Gifting</span></a>' +
              '<button class="gbh-icon-button" type="button" aria-label="Search gifts">' + ICON_SEARCH + '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  };

  class GbGuestHeader extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      var logoSrc = this.getAttribute('logo-src') || 'assets/gildedbox-logo.svg';
      this.innerHTML = GUEST_HEADER_TEMPLATE(logoSrc);
    }
  }
  if (!customElements.get('gb-guest-header')) {
    customElements.define('gb-guest-header', GbGuestHeader);
  }

  /* ---------------- <gb-field> ---------------- */

  /* Живая анатомия Materialize + PrimeVue: div.input-field(col
     staticLabel required) > label + div.relative > input. Ошибка =
     span[role=alert].text-red-600 ПОСЛЕ div.relative (классов
     helper-text/errorMessage у лайва нет — absence-пробник).

     ДВА РАСШИРЕНИЯ, gbppl-booking-1 (25.08). Лид-форма Book a
     Meeting — первая форма системы, где поля не все обязательные и
     не все однострочные, поэтому поле учится ровно двум вещам
     (Тон-6, шаг 2: адаптируем существующее, а не рисуем новое):

       optional      снимает класс required с обёртки, и золотая
                     звёздочка не печатается. До сих пор у гостевой
                     авторизации обязательными были все поля, и
                     класс стоял литералом; Company и «What are you
                     looking for?» на лайве без звёздочки.
       type=textarea вместо <input> печатает <textarea>, несущий
                     .gba-input + версию .gba-textarea (auth.css).
                     Атрибуты те же, плейсхолдер тот же, ошибка та
                     же — снаружи это по-прежнему <gb-field>. */
  function fieldHTML(opts) {
    var eye = opts.eye
      ? '<button class="gba-eye" type="button" aria-label="Show password" data-eye>' + ICON_EYE + '</button>'
      : '';
    var common =
      ' name="' + esc(opts.name) + '" id="' + esc(opts.id) + '"' +
      ' autocomplete="' + esc(opts.autocomplete || opts.name) + '"' +
      ' placeholder="' + esc(opts.placeholder) + '"';
    var control = opts.type === 'textarea'
      ? '<textarea' + common + ' rows="3" class="valid browser-default gba-input gba-textarea">' +
          esc(opts.value) + '</textarea>'
      : '<input type="' + esc(opts.type) + '"' + common +
          (opts.value ? ' value="' + esc(opts.value) + '"' : '') +
          ' class="valid browser-default gba-input">';
    return (
      '<div class="input-field col active s12 m12 l12 staticLabel ' +
          (opts.optional ? '' : 'required ') + 'gba-field ' + (opts.wrapMod || '') + '">' +
        '<label for="' + esc(opts.id) + '" class="active gba-label">' + esc(opts.label) + '</label>' +
        '<div class="relative gba-inputwrap">' +
          control +
          eye +
        '</div>' +
      '</div>'
    );
  }

  class GbField extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      this.innerHTML = fieldHTML({
        id: this.getAttribute('input-id') || 'form_field',
        name: this.getAttribute('name') || 'field',
        type: this.getAttribute('type') || 'text',
        label: this.getAttribute('label') || 'Field',
        placeholder: this.getAttribute('placeholder') || '',
        autocomplete: this.getAttribute('autocomplete') || '',
        value: this.getAttribute('value') || '',
        wrapMod: this.getAttribute('wrap-mod') || '',
        eye: this.hasAttribute('eye'),
        optional: this.hasAttribute('optional'),
      });
      var eyeBtn = this.querySelector('[data-eye]');
      if (eyeBtn) {
        var input = this.querySelector('input');
        eyeBtn.addEventListener('click', function () {
          input.type = input.type === 'password' ? 'text' : 'password';
        });
      }
    }
    /* Контрол поля, чем бы он ни был: у type=textarea это
       <textarea>, у всех остальных <input> (gbppl-booking-1). */
    get input() { return this.querySelector('input, textarea'); }
    setError(message) {
      this.clearError();
      this.input.classList.remove('valid');
      this.input.classList.add('invalid');
      this.input.setAttribute('aria-invalid', 'true');
      var span = document.createElement('span');
      span.setAttribute('role', 'alert');
      span.className = 'text-red-600 gba-error';
      span.textContent = message;
      this.querySelector('.gba-field').appendChild(span);
    }
    clearError() {
      this.input.classList.remove('invalid');
      this.input.classList.add('valid');
      this.input.removeAttribute('aria-invalid');
      var old = this.querySelector('.gba-error');
      if (old) old.remove();
    }
  }
  if (!customElements.get('gb-field')) {
    customElements.define('gb-field', GbField);
  }

  /* ---------------- САБМИТ ФОРМЫ ----------------
     gbppl-button-2, 26.08: кнопка = организм .gb-btn, лестница L,
     полная ширина (--block). Своих правил у auth.css больше нет,
     кроме отступа .gba-submit (расстояние от поля до сабмита).

     ЖИВЫЕ ИМЕНА ОСТАЮТСЯ В РАЗМЕТКЕ КАК ДАННЫЕ. bg-primary-600,
     rounded, uppercase, tracking-[1px], font-semibold, data-p,
     data-pc-name и data-pc-section — это анатомия живого PrimeVue,
     по которой мерят харвест-конфиги; ни одно из них ничего не
     красит и ни одно не удалено. */
  function formButtonHTML(label, opts) {
    opts = opts || {};
    return (
      '<button data-p="large" type="' + (opts.type || 'submit') + '" aria-label="' + esc(label) + '"' +
        (opts.disabled ? ' disabled' : '') +
        ' data-pc-name="button" class="gb-btn gb-btn--l gb-btn--filled gb-btn--primary gb-btn--block gba-submit' +
        ' bg-primary-600 rounded uppercase' + (opts.cls ? ' ' + opts.cls : '') + '">' +
        '<span class="gb-btn__icon icon icon-arrow-right" data-p="right large" data-pc-section="icon">' + ICON_ARROW + '</span>' +
        '<span class="gb-btn__label uppercase tracking-[1px] font-semibold" data-pc-section="label" data-p="large">' + esc(label) + '</span>' +
      '</button>'
    );
  }

  /* ---------------- <gb-auth-flow> ---------------- */

  /* Шаг 1, signin: заголовок + Google + or + e-mail форма.
     Анатомия живая: section > div > div.stack > [header,
     group > [div.block.w-full, div.gap-3, div.col > form + кнопка]].
     Пустые js-resetForm/js-startValidateForm — как на лайве. */
  var SIGNIN_TEMPLATE = function (email) {
    return (
      '<div><div class="gba-stack">' +
        '<header class="space-y-3 gba-header">' +
          '<h1 class="gba-h1">Sign in or create an account</h1>' +
          '<p class="gba-sub">Use Google, or enter your email and we’ll send a 6-digit verification code</p>' +
        '</header>' +
        '<div class="gba-group">' +
          '<div class="block w-full">' +
            '<button class="gba-google" type="button">' +
              ICON_GOOGLE +
              '<span class="gba-google-label">Sign in with Google</span>' +
            '</button>' +
          '</div>' +
          '<div class="gap-3 gba-divider">or</div>' +
          '<div class="col gba-col">' +
            '<form novalidate class="row formStyleSecond gba-form" autocomplete="on">' +
              '<button type="hidden" class="hidden">Submit</button>' +
              '<div class="js-resetForm"></div>' +
              '<div class="js-startValidateForm"></div>' +
              '<gb-field input-id="form_email" name="email" type="email" label="Email"' +
                ' placeholder="my@email.com" autocomplete="email"' +
                (email ? ' value="' + esc(email) + '"' : '') + '></gb-field>' +
            '</form>' +
            formButtonHTML('Start with email') +
          '</div>' +
        '</div>' +
      '</div></div>'
    );
  };

  /* Шаг 2, verify: конверт + serif-титул + radio-карточки метода +
     панель OTP или пароля + Continue + Resend/назад. Числа сняты
     на 1280, лестницы остальных ширин = живые классы (felt beyond
     1280: в harvest этого состояния нет). */
  var VERIFY_TEMPLATE = function (email, method, resendLeft) {
    var methodCard = function (key, title, sub, active) {
      return (
        '<button type="button" role="tab" aria-pressed="' + (active ? 'true' : 'false') + '"' +
          ' class="gba-method" data-method="' + key + '">' +
          '<span aria-hidden="true" class="gba-method-radio"><span></span></span>' +
          '<span class="gba-method-copy tracking-[1.5px]">' +
            '<span class="gba-method-title">' + esc(title) + '</span>' +
            '<span class="gba-method-sub">' + esc(sub) + '</span>' +
          '</span>' +
        '</button>'
      );
    };
    var otpCells = '';
    for (var i = 0; i < 6; i++) {
      otpCells += '<input type="text" inputmode="numeric" maxlength="1" aria-label="Digit ' + (i + 1) + '" data-otp="' + i + '">';
    }
    var codePanel =
      '<div class="gba-vzone" data-panel="code">' +
        '<div>' +
          '<label class="gba-vlabel">Verification Code</label>' +
          '<div class="gba-otp" data-pc-name="inputotp">' + otpCells + '</div>' +
          '<p class="gba-hint gba-hint--otp">Paste works too. The code verifies automatically when complete</p>' +
        '</div>' +
      '</div>';
    var passPanel =
      '<div class="gba-vzone col" data-panel="password">' +
        '<form novalidate class="row formStyleSecond gba-form" autocomplete="on">' +
          '<button type="hidden" class="hidden">Submit</button>' +
          '<gb-field input-id="form_password" name="password" type="password" label="Password"' +
            ' placeholder="Set your password" autocomplete="new-password" wrap-mod="gba-field--flow" eye></gb-field>' +
          '<gb-field input-id="form_confirm" name="confirm" type="password" label="Confirm Password"' +
            ' placeholder="Repeat your new password" autocomplete="new-password" wrap-mod="gba-field--last" eye></gb-field>' +
        '</form>' +
        '<p class="gba-hint gba-hint--pass">Enter the password for your account</p>' +
      '</div>';
    return (
      '<div><div class="gba-stack">' +
        '<header class="space-y-3 text-center gba-vheader">' +
          '<div class="gba-vicon-row"><div class="gba-vicon rounded-full">' + ICON_MAIL + '</div></div>' +
          '<h1 class="font-serif gba-vh1">Enter your verification code</h1>' +
          '<div class="gba-vsub space-y-3">' +
            '<p><span>We sent a 6-digit code to <strong>' + esc(email) + '</strong></span></p>' +
            '<p>Enter it below to continue</p>' +
          '</div>' +
        '</header>' +
        /* tablist и группа панелей — ПРЯМЫЕ дети стека: интервалы
           32/48/64 держит space-y стека, mb-5 у tablist на живом
           ИНЕРТЕН (замер 18.08: mb 0, зазор = 48 на 1280). */
        '<div role="tablist" class="gba-methods">' +
          methodCard('code', 'Use code', 'Recommended', method === 'code') +
          methodCard('password', 'Use password', 'Create one', method === 'password') +
        '</div>' +
        '<div class="gba-vstack">' +
          (method === 'code' ? codePanel : passPanel) +
          formButtonHTML('Continue', { type: 'button', disabled: true }) +
          '<div class="gba-vlinks">' +
            '<a href="#" data-resend' + (resendLeft > 0 ? ' aria-disabled="true"' : '') + '>' +
              (resendLeft > 0 ? 'Resend in ' + resendLeft + 's' : 'Resend code') + '</a>' +
            '<span class="gba-vdot">·</span>' +
            '<a href="#" data-back>Use a different email</a>' +
          '</div>' +
        '</div>' +
      '</div></div>'
    );
  };

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var RESEND_SECONDS = 30; /* live стартует ~с 30 (замечено 26s спустя
                              несколько секунд после сабмита); felt */

  class GbAuthFlow extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;
      this.__email = '';
      this.__method = 'code';
      this.__resendLeft = 0;
      this.__timer = null;
      this.renderSignin();
    }

    /* Секция пересобирается целиком на каждом шаге: на статичном
       signin-шаге в DOM нет ни ссылок, ни скрытых панелей — как на
       живом (Vue монтирует состояния так же). */
    renderSignin() {
      this.stopTimer();
      this.innerHTML = '<section class="gba-section">' + SIGNIN_TEMPLATE(this.__email) + '</section>';
      var self = this;
      var field = this.querySelector('gb-field');
      var submit = this.querySelector('button.bg-primary-600');
      var go = function (event) {
        event.preventDefault();
        var value = (field.input.value || '').trim();
        if (!EMAIL_RE.test(value)) {
          field.setError('Please enter a valid email address');
          return;
        }
        field.clearError();
        self.__email = value;
        self.__method = 'code';
        self.renderVerify();
      };
      submit.addEventListener('click', go);
      this.querySelector('form').addEventListener('submit', go);
      field.input.addEventListener('input', function () { field.clearError(); });
    }

    renderVerify() {
      this.innerHTML = '<section class="gba-section">' +
        VERIFY_TEMPLATE(this.__email, this.__method, this.__resendLeft || RESEND_SECONDS) + '</section>';
      var self = this;
      if (!this.__timer) this.startTimer(RESEND_SECONDS);

      this.querySelectorAll('.gba-method').forEach(function (card) {
        card.addEventListener('click', function () {
          var next = card.getAttribute('data-method');
          if (next !== self.__method) { self.__method = next; self.renderVerify(); }
        });
      });

      this.querySelector('[data-back]').addEventListener('click', function (event) {
        event.preventDefault();
        self.stopTimer();
        self.renderSignin();
      });
      var resend = this.querySelector('[data-resend]');
      resend.addEventListener('click', function (event) {
        event.preventDefault();
        if (resend.getAttribute('aria-disabled') !== 'true') self.startTimer(RESEND_SECONDS);
      });

      var cont = this.querySelector('button.bg-primary-600');
      if (this.__method === 'code') {
        var cells = Array.prototype.slice.call(this.querySelectorAll('[data-otp]'));
        var refresh = function () {
          var full = cells.every(function (c) { return /\d/.test(c.value); });
          cont.disabled = !full;
        };
        cells.forEach(function (cell, index) {
          cell.addEventListener('input', function () {
            cell.value = cell.value.replace(/\D/g, '').slice(0, 1);
            if (cell.value && index < 5) cells[index + 1].focus();
            refresh();
          });
          cell.addEventListener('keydown', function (event) {
            if (event.key === 'Backspace' && !cell.value && index > 0) cells[index - 1].focus();
          });
          cell.addEventListener('paste', function (event) {
            event.preventDefault();
            var digits = (event.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
            for (var i = 0; i < digits.length; i++) cells[i].value = digits[i];
            if (digits.length) cells[Math.min(digits.length, 5)].focus();
            refresh();
          });
        });
        cells[0].focus();
      } else {
        var fields = Array.prototype.slice.call(this.querySelectorAll('gb-field'));
        var refreshPass = function () {
          cont.disabled = !fields.every(function (f) { return (f.input.value || '').length > 0; });
        };
        fields.forEach(function (f) {
          /* gb-field рендерится в connectedCallback: инпут уже есть */
          f.input.addEventListener('input', refreshPass);
        });
      }
      /* Continue инертен: дальше живой гость не проходит без
         настоящего кода из письма, demo-лайв бэкенда не носит. */
      cont.addEventListener('click', function (event) { event.preventDefault(); });
    }

    startTimer(seconds) {
      this.stopTimer();
      this.__resendLeft = seconds;
      var self = this;
      var paint = function () {
        var link = self.querySelector('[data-resend]');
        if (!link) return;
        if (self.__resendLeft > 0) {
          link.setAttribute('aria-disabled', 'true');
          link.textContent = 'Resend in ' + self.__resendLeft + 's';
        } else {
          link.removeAttribute('aria-disabled');
          link.textContent = 'Resend code';
        }
      };
      paint();
      this.__timer = setInterval(function () {
        self.__resendLeft -= 1;
        paint();
        if (self.__resendLeft <= 0) self.stopTimer();
      }, 1000);
    }
    stopTimer() {
      if (this.__timer) { clearInterval(this.__timer); this.__timer = null; }
      this.__resendLeft = 0;
    }
  }
  if (!customElements.get('gb-auth-flow')) {
    customElements.define('gb-auth-flow', GbAuthFlow);
  }
})();
