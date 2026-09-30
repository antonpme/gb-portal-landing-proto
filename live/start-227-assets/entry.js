/* gbppl-lp227-live-1 (2026-09-30) · THE ENTRY HALF of live/start-227.html
   ------------------------------------------------------------------
   The live path from the landing 227 to the door of the customizer,
   one to one with the harvests of 25-30.09. No redesign: any
   difference from live is a bug. Screens (GBFlow.state.s):

     landing   www.gildedbox.com/page/start-227 (harvest public-start-227, 29.09)
     email     its sheet «Start Gifting Today» over the landing
               (harvest public-start-227-email, 30.09); &code=1 = the
               six digit step (ASSUMED, never captured: needs a real mail)
     catalog   catalog/customize-162?from=lp-227&website=...
               (harvest public-customize-162-lp227, 29.09)
     product   product/the-elemental-no-3-candle-906
               (harvest public-product-906, 28.09); &gate=1 = the
               sign in drawer opened by START DESIGNING

   Keys read here, not by flow.js: code=1 (email step 2), gate=1 (the
   sign in drawer on the product page). The website typed on the
   landing rides in sessionStorage (gbppl-lp227-live-website).

   Each screen registers GBEntry.screens.<s> = function (root, state)
   and fills root. The render loop at the foot of the file calls it
   when state.s changes. */
(function () {
  var KEY = 'gbppl-lp227-live-website';
  var GBEntry = window.GBEntry = {
    screens: {},
    current: '',
    /* the website typed on 227; try/catch: storage can throw (private window) */
    website: function (v) {
      try {
        if (v !== undefined) sessionStorage.setItem(KEY, v);
        return sessionStorage.getItem(KEY) || '';
      } catch (e) { return v || ''; }
    },
    /* live catalog hero: website=example.com -> «For Example».
       The word is the second level domain, first letter up. */
    brandWord: function () {
      var w = (GBEntry.website() || 'example.com').trim().toLowerCase();
      w = w.replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[\/?#]/)[0];
      var parts = w.split('.').filter(Boolean);
      var word = parts.length > 1 ? parts[parts.length - 2] : (parts[0] || 'example');
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    param: function (k) {
      try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; }
    },
    /* write an extra key (code, gate) without a history step */
    setParam: function (k, v, push) {
      var q = new URLSearchParams(location.search);
      if (v) q.set(k, v); else q.delete(k);
      var url = location.pathname + (q.toString() ? '?' + q.toString() : '') + location.hash;
      history[push ? 'pushState' : 'replaceState'](null, '', url);
    },
    esc: function (s) {
      return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
    }
  };

/* ==== LANDING (s=landing) ==== */
  /* THE LANDING 227, one to one with public-start-227 (29.09) and
     public-start-227-email/<w>.json (30.09, identical geometry).
     Live markup order and tailwind values kept; the demo is the live
     mp4 (cdn.gildedbox.com .../195727_fs_hz_720c_compressed, read off
     the live <video> 30.09), object-contain in a 16:9 stage below
     1024 and in the left column from 1024. The wordmark is the
     system asset (the live inline svg, 168x56 viewBox). */
  var LOGO = '../system/assets/gildedbox-logo.svg';
  /* Live glyphs are the Nucleo icon font (icon-arrow-right, icon-e-remove,
     the warning circle of .infoMsg). Drawn here from the Nucleo set
     (assets/nucleo-full 48-arrow-right / 48-circle-warning), stroke
     scaled to the weight of the live font glyph read off the shots. */
  GBEntry.NUC = {
    arrow: function (w) { return '<svg viewBox="0 0 48 48" width="' + w + '" height="' + w + '" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="square" aria-hidden="true"><path d="M5 24H42M28 38L42 24L28 10"/></svg>'; },
    warn: function (w) { return '<svg viewBox="0 0 48 48" width="' + w + '" height="' + w + '" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" aria-hidden="true"><path d="M24 45C35.6 45 45 35.6 45 24S35.6 3 24 3 3 12.4 3 24s9.4 21 21 21Z"/><path d="M24 12V29"/><circle cx="24" cy="35" r="1.6" fill="currentColor"/></svg>'; },
    remove: function (w) { return '<svg viewBox="0 0 48 48" width="' + w + '" height="' + w + '" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" aria-hidden="true"><path d="M11 11L37 37M37 11L11 37"/></svg>'; }
  };
  var ARROW = GBEntry.NUC.arrow(19);

  function landingHTML(url) {
    return (
      '<section class="lel js-heroSection" aria-label="Start 227">' +
        '<div class="lel-grid">' +
          '<div class="lel-stage">' +
            '<video class="lel-video" autoplay muted loop playsinline preload="auto"' +
              ' poster="start-227-assets/img/entry-lp-demo-poster.jpg">' +
              '<source src="start-227-assets/img/entry-lp-demo.mp4" type="video/mp4"></video>' +
            '<div class="lel-logo"><a href="?s=landing" aria-label="GildedBox"><img src="' + LOGO + '" width="168" height="56" alt="GildedBox"></a></div>' +
            '<p class="lel-pill"><span class="lel-pill__dot" aria-hidden="true"></span><span>A gift, designed for <span class="lel-pill__b">FourSeasons.com</span></span></p>' +
          '</div>' +
          '<div class="lel-panel">' +
            '<div class="lel-main">' +
              '<h1 class="lel-h1">See Your Brand as a Gift, Instantly.</h1>' +
              '<ol class="lel-steps">' +
                '<li><span class="lel-steps__n">1.</span><span>Enter your website URL</span></li>' +
                '<li><span class="lel-steps__n">2.</span><span>Choose a gift to design</span></li>' +
                '<li><span class="lel-steps__n">3.</span><span>Personalize to any recipient</span></li>' +
              '</ol>' +
              '<form class="lel-form" novalidate>' +
                '<div class="lel-field">' +
                  '<div class="lel-error" role="alert" hidden>' +
                    '<span class="lel-error__icon" aria-hidden="true">' + GBEntry.NUC.warn(20) + '</span>' +
                    '<div class="lel-error__text">Please enter your website URL</div>' +
                  '</div>' +
                  '<input class="lel-input" type="text" inputmode="url" autocomplete="url" placeholder="www.yourcompany.com" aria-label="Your website" value="' + GBEntry.esc(url) + '">' +
                '</div>' +
                '<div class="lel-ctarow"><button class="lel-cta" type="submit"><span class="lel-cta__label">Design my gift</span><span class="lel-cta__icon">' + ARROW + '</span></button></div>' +
              '</form>' +
              '<p class="lel-note">Designs are free and take about a minute.</p>' +
            '</div>' +
            '<div class="lel-trust">' +
              '<p class="lel-trust__cap">Trusted by teams at</p>' +
              '<div class="lel-trust__row">' +
                '<span class="lel-mark lel-mark--ms">Microsoft</span>' +
                '<span class="lel-mark lel-mark--tesla">Tesla</span>' +
                '<span class="lel-mark lel-mark--tiffany">Tiffany &amp; Co.</span>' +
                '<span class="lel-mark lel-mark--tr">Thomson Reuters</span>' +
                '<span class="lel-mark lel-mark--handle">Handle</span>' +
                '<span class="lel-mark lel-mark--compass">Compass</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function mountIcons(root) { if (window.GbIcons) window.GbIcons.mount(root); }

  /* The landing is also the ground of the email sheet (s=email): the
     live sheet slides over the landing, the demo keeps playing. */
  function renderLanding(root) {
    root.innerHTML = landingHTML(GBEntry.website());
    mountIcons(root);
    var form = root.querySelector('.lel-form');
    var input = root.querySelector('.lel-input');
    var err = root.querySelector('.lel-error');
    /* live 29.09: the URL is REQUIRED; an empty click shows the error
       ABOVE the field (public-start-227 *-after-click). Typing does not
       clear it on live? not captured: ASSUMED it stays until the next
       valid submit, like the live form validator. */
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = (input.value || '').trim();
      if (!v) { err.hidden = false; return; }
      err.hidden = true;
      GBEntry.website(v);
      /* Sandbox V1 / V2 (?v=2|3, Ton 30.09 15:39): no email sheet, no catalog,
         no product page; the URL goes straight to the brand reading of the
         customizer. Live (?v=1) keeps the email sheet. */
      if (GBFlow.state.v === '2' || GBFlow.state.v === '3') GBFlow.go({ s: 'cz', cz: 'reading' });
      else GBFlow.go({ s: 'email' });
    });
    var v = root.querySelector('.lel-video');
    if (v) { var p = v.play && v.play(); if (p && p.catch) p.catch(function () {}); }
  }

  GBEntry.screens.landing = function (root) {
    renderLanding(root);
    GBEntry.cookie();
  };
  GBEntry.renderLanding = renderLanding;

  /* THE LIVE COOKIE BAR, site wide on live, about 8 s after the page
     (public-start-227 README; geometry 1440-after-click.json and
     390-after-click.json of 29.09). Any of its three buttons closes it
     for the session (sessionStorage in try/catch). &cookie=1 shows it
     at once (for the shots). */
  var COOKIE_KEY = 'gbppl-lp227-live-cookie';
  var cookieTimer = null;
  function cookieGone() { try { return sessionStorage.getItem(COOKIE_KEY) === '1'; } catch (e) { return false; } }
  function cookieBar() {
    var bar = document.getElementById('lel-cookie');
    if (bar) return bar;
    bar = document.createElement('div');
    bar.id = 'lel-cookie';
    bar.className = 'lel-cookie';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie Settings');
    bar.hidden = true;
    bar.innerHTML =
      '<div class="gb-container lel-cookie__in">' +
        '<p class="lel-cookie__title">Cookie Settings</p>' +
        '<div class="lel-cookie__row">' +
          '<div class="lel-cookie__text">' +
            '<p>To provide you with a better experience, we use cookies to personalize content, deliver relevant ads, and analyze site usage to improve our services. We also use session replay software to understand how our site is used and to enhance customer support. By continuing to browse or clicking "Accept All," you agree to our use of cookies and session replay.</p>' +
            '<p class="lel-cookie__more">Learn more in our <a class="lel-cookie__a" href="https://www.gildedbox.com/page/privacy-44" target="_blank" rel="noopener">Privacy Policy</a> and <a class="lel-cookie__a" href="https://www.gildedbox.com/page/copyright-93" target="_blank" rel="noopener">Terms of Service</a></p>' +
          '</div>' +
          '<div class="lel-cookie__btns">' +
            '<button class="lel-cbtn lel-cbtn--fill" type="button"><span>Accept All</span></button>' +
            '<button class="lel-cbtn" type="button"><span>Customize</span></button>' +
            '<button class="lel-cbtn" type="button"><span>Reject All</span></button>' +
          '</div>' +
        '</div>' +
      '</div>';
    bar.addEventListener('click', function (e) {
      if (!e.target.closest('.lel-cbtn')) return;
      try { sessionStorage.setItem(COOKIE_KEY, '1'); } catch (x) {}
      bar.hidden = true;
    });
    document.body.appendChild(bar);
    return bar;
  }
  GBEntry.cookie = function () {
    if (cookieGone()) return;
    var bar = cookieBar();
    if (GBEntry.param('cookie') === '1') { bar.hidden = false; return; }
    if (cookieTimer) return;
    cookieTimer = setTimeout(function () {
      if (!cookieGone() && GBFlow.state.s !== 'cz') bar.hidden = false;
    }, 8000);   /* public-start-227 README: the bar appears after ~8 s */
  };
  document.addEventListener('gbflow:change', function (e) {
    var bar = document.getElementById('lel-cookie');
    if (bar && e.detail.s === 'cz') bar.hidden = true;
  });
/* ==== /LANDING ==== */

/* ==== EMAIL (s=email, &code=1) ==== */
  /* THE EMAIL SHEET of 227, «Start Gifting Today», one to one with
     public-start-227-email/<w>-after-click.json (30.09): a right sheet
     over the landing (600 at 1440, full screen at 390), scrim .6, the
     demo keeps playing behind. Work email only, NO Google (removed on
     live since the recon of 25.09). X returns to the landing with the
     URL kept in its field.
     &code=1 = the six digit step. ASSUMED as a whole: never captured
     (it needs a real work email). Built in the sheet's own live values
     (label, field, button) with the words of the live site's verify
     step (the one <gb-auth-flow> carries, harvested from live login). */
  var MAIL_KEY = 'gbppl-lp227-live-email';
  var SIGNED_KEY = 'gbppl-lp227-live-signed';
  function store(k, v) {
    try { if (v !== undefined) sessionStorage.setItem(k, v); return sessionStorage.getItem(k) || ''; }
    catch (e) { return v || ''; }
  }
  GBEntry.signed = function () { return store(SIGNED_KEY) === '1'; };

  /* ASSUMED: the live list of personal providers is server side and was
     never read; these are the common ones. */
  var PERSONAL = /@(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|msn|icloud|me|mac|aol|proton|protonmail|gmx|mail|yandex|zoho)\.[a-z.]+$/i;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function sheetHead() {
    return (
      '<div class="lee-head">' +
        '<div class="lee-head__row">' +
          '<div class="lee-head__side" aria-hidden="true"></div>' +
          '<div class="lee-head__title" id="lee-title">Start Gifting Today</div>' +
        '</div>' +
        '<button class="lee-x" type="button" aria-label="Close">' + GBEntry.NUC.remove(22) + '</button>' +
      '</div>'
    );
  }

  function emailBody(val) {
    return (
      '<section class="lee-sec">' +
        '<header class="lee-header">' +
          '<h1 class="lee-h1">Sign in with your work email</h1>' +
          '<p class="lee-p">Enter your work email and we\'ll send a 6-digit verification code. Personal email providers are not accepted.</p>' +
        '</header>' +
        '<div class="lee-block">' +
          '<form class="lee-form" novalidate>' +
            '<div class="lee-field">' +
              '<label class="lee-label" for="lee-email">Work email<span class="lee-req" aria-hidden="true">*</span></label>' +
              '<div class="lee-inwrap"><input class="lee-input" id="lee-email" type="email" autocomplete="email" placeholder="my@company.com" value="' + GBEntry.esc(val || '') + '"></div>' +
              '<span class="lee-err" role="alert" hidden></span>' +
            '</div>' +
          '</form>' +
          '<button class="lee-btn" type="button" data-lee-send><span class="lee-btn__label">Start with work email</span><span class="lee-btn__icon">' + GBEntry.NUC.arrow(20) + '</span></button>' +
        '</div>' +
      '</section>'
    );
  }

  function codeBody(mail) {
    var cells = '';
    for (var i = 0; i < 6; i++) cells += '<input class="lee-cell" type="text" inputmode="numeric" maxlength="1" aria-label="Digit ' + (i + 1) + '" data-cell="' + i + '">';
    return (
      '<section class="lee-sec" data-step="code">' +
        '<header class="lee-header">' +
          '<h1 class="lee-h1">Enter your verification code</h1>' +
          '<p class="lee-p">We sent a 6-digit code to <strong>' + GBEntry.esc(mail) + '</strong>. Enter it below to continue</p>' +
        '</header>' +
        '<div class="lee-block">' +
          '<div class="lee-field">' +
            '<label class="lee-label">Verification Code</label>' +
            '<div class="lee-cells">' + cells + '</div>' +
          '</div>' +
          '<button class="lee-btn" type="button" data-lee-code disabled><span class="lee-btn__label">Continue</span><span class="lee-btn__icon">' + GBEntry.NUC.arrow(20) + '</span></button>' +
          '<p class="lee-links"><a href="#" data-lee-resend aria-disabled="true">Resend in 30s</a><span class="lee-dot">·</span><a href="#" data-lee-back>Use a different email</a></p>' +
        '</div>' +
      '</section>'
    );
  }

  /* THE LIVE GENERAL SIGN IN (the gate): the same sheet shell (Ton's
     screenshot harvest/public-start-227-email/ton-home-signin-drawer-2540.png:
     600 sheet, Zinc 100, 78 head, serif «Start Gifting Today», Zinc 200
     close) with the live login content. Words and sizes of the content
     = the live login page as harvested pixel by pixel into auth.js /
     auth.css (public-login), which Ton's screenshot shows word for word. */
  var G_ICON =
    '<svg viewBox="0 0 48 48" aria-hidden="true">' +
      '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
      '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
      '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
      '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>' +
    '</svg>';
  function signinBody(val) {
    return (
      '<section class="lee-sec">' +
        '<header class="lee-header">' +
          '<h1 class="lee-h1">Sign in or create an account</h1>' +
          '<p class="lee-p">' + (signinDesc ? GBEntry.esc(signinDesc) : 'Use Google, or enter your email and we’ll send a 6-digit verification code') + '</p>' +
        '</header>' +
        '<div class="lee-block leg-group">' +
          '<button class="leg-google" type="button">' + G_ICON + '<span class="leg-google__label">Sign in with Google</span></button>' +
          '<div class="leg-or">or</div>' +
          '<div>' +
            '<form class="lee-form" novalidate>' +
              '<div class="lee-field">' +
                '<label class="lee-label" for="leg-email">Email<span class="lee-req" aria-hidden="true">*</span></label>' +
                '<div class="lee-inwrap"><input class="lee-input" id="leg-email" type="email" autocomplete="email" placeholder="my@email.com" value="' + GBEntry.esc(val || '') + '"></div>' +
                '<span class="lee-err" role="alert" hidden></span>' +
              '</div>' +
            '</form>' +
            '<button class="lee-btn" type="button" data-lee-send><span class="lee-btn__label">Start with email</span><span class="lee-btn__icon">' + GBEntry.NUC.arrow(20) + '</span></button>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }
  function wireSignin(sheet) {
    var body = sheet.querySelector('.lee-in');
    var input = body.querySelector('.lee-input');
    var err = body.querySelector('.lee-err');
    function toCode(mail) { sheet.__mail = mail; sheet.__code = true; paint(sheet); }
    function send(e) {
      if (e) e.preventDefault();
      var v = (input.value || '').trim();
      if (!EMAIL_RE.test(v)) { err.textContent = 'Please enter a valid email address'; err.hidden = false; input.classList.add('is-error'); return; } /* live login words (auth.js) */
      toCode(v);
    }
    input.addEventListener('input', function () { err.hidden = true; input.classList.remove('is-error'); });
    body.querySelector('.lee-form').addEventListener('submit', send);
    body.querySelector('[data-lee-send]').addEventListener('click', send);
    /* SIMULATION, as auth.js: no OAuth here; Google hands the flow an address */
    body.querySelector('.leg-google').addEventListener('click', function () { toCode('you@gmail.com'); });
  }

  var timer = null;
  function wireEmail(sheet) {
    var body = sheet.querySelector('.lee-in');
    var input = body.querySelector('.lee-input');
    var err = body.querySelector('.lee-err');
    function fail(msg) { err.textContent = msg; err.hidden = false; input.classList.add('is-error'); }
    function send(e) {
      if (e) e.preventDefault();
      var v = (input.value || '').trim();
      if (!EMAIL_RE.test(v)) return fail('Please enter a valid email address');   /* ASSUMED: the live site login words (auth.js) */
      if (PERSONAL.test(v)) return fail('Personal email providers are not accepted.'); /* ASSUMED: the rejection was never captured; the sheet's own sentence */
      store(MAIL_KEY, v);
      GBEntry.setParam('code', '1', true);
      paint(sheet);
    }
    input.addEventListener('input', function () { err.hidden = true; input.classList.remove('is-error'); });
    body.querySelector('.lee-form').addEventListener('submit', send);
    body.querySelector('[data-lee-send]').addEventListener('click', send);
  }

  function wireCode(sheet) {
    var body = sheet.querySelector('.lee-in');
    var cells = Array.prototype.slice.call(body.querySelectorAll('.lee-cell'));
    var cont = body.querySelector('[data-lee-code]');
    var resend = body.querySelector('[data-lee-resend]');
    function refresh() { cont.disabled = !cells.every(function (c) { return /\d/.test(c.value); }); }
    cells.forEach(function (cell, i) {
      cell.addEventListener('input', function () {
        cell.value = cell.value.replace(/\D/g, '').slice(0, 1);
        if (cell.value && i < 5) cells[i + 1].focus();
        refresh();
      });
      cell.addEventListener('keydown', function (e) { if (e.key === 'Backspace' && !cell.value && i > 0) cells[i - 1].focus(); });
      cell.addEventListener('paste', function (e) {
        e.preventDefault();
        var d = ((e.clipboardData && e.clipboardData.getData('text')) || '').replace(/\D/g, '').slice(0, 6);
        for (var k = 0; k < d.length; k++) cells[k].value = d[k];
        refresh();
      });
    });
    /* resend timer 30 s (auth.js RESEND_SECONDS, felt on live login) */
    var left = 30;
    clearInterval(timer);
    timer = setInterval(function () {
      left -= 1;
      if (left <= 0) { clearInterval(timer); resend.removeAttribute('aria-disabled'); resend.textContent = 'Resend code'; return; }
      resend.textContent = 'Resend in ' + left + 's';
    }, 1000);
    resend.addEventListener('click', function (e) { e.preventDefault(); });
    var gate = sheet.__opt && sheet.__opt.gate;
    body.querySelector('[data-lee-back]').addEventListener('click', function (e) {
      e.preventDefault(); clearInterval(timer);
      if (gate) sheet.__code = false; else GBEntry.setParam('code', '', true);
      paint(sheet);
    });
    /* any six digits pass: there is no mail and no backend */
    cont.addEventListener('click', function () {
      if (cont.disabled) return;
      clearInterval(timer);
      store(SIGNED_KEY, '1');
      if (gate) { sheet.__opt.onDone(); return; }
      GBEntry.setParam('code', '', false);
      GBFlow.go({ s: 'catalog' });
    });
    setTimeout(function () { if (cells[0]) cells[0].focus(); }, 60);
  }

  function paint(sheet) {
    var gate = sheet.__opt && sheet.__opt.gate;
    var code = gate ? !!sheet.__code : GBEntry.param('code') === '1';
    var mail = gate ? (sheet.__mail || '') : (store(MAIL_KEY) || 'you@company.com');
    var inner = sheet.querySelector('.lee-in');
    inner.innerHTML = code ? codeBody(mail) : (gate ? signinBody(sheet.__mail) : emailBody(store(MAIL_KEY)));
    if (code) wireCode(sheet); else if (gate) wireSignin(sheet); else wireEmail(sheet);
  }

  function openSheet(root, opt) {
    opt = opt || {};
    var id = opt.gate ? 'leg-sheet' : 'lee-sheet';
    var old = document.getElementById(id);
    if (old) old.remove();
    var sheet = document.createElement('div');
    sheet.id = id;
    sheet.__opt = opt;
    sheet.className = 'lee-mask';
    sheet.innerHTML =
      '<div class="lee-panel" role="dialog" aria-modal="true" aria-labelledby="lee-title">' +
        sheetHead() +
        '<div class="lee-body"><div class="lee-in"></div></div>' +
      '</div>';
    root.appendChild(sheet);
    paint(sheet);
    requestAnimationFrame(function () { sheet.classList.add('is-in'); });
    function close() {
      clearInterval(timer);
      if (opt.gate) { opt.onClose(); return; }
      GBEntry.setParam('code', '', false); GBFlow.go({ s: 'landing' });
    }
    /* ASSUMED: Esc closes (PrimeVue sidebar default, not captured) */
    sheet.__esc = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', sheet.__esc);
    sheet.querySelector('.lee-x').addEventListener('click', close);
    /* ASSUMED: the mask closes the sheet too (PrimeVue sidebar default, not captured) */
    sheet.addEventListener('click', function (e) { if (e.target === sheet) close(); });
    var inp = sheet.querySelector('.lee-input');
    if (inp && (opt.gate || !GBEntry.param('code'))) setTimeout(function () { inp.focus(); }, 320);
  }

  /* the gate of the product page: GBEntry.openSignin({ onDone, onClose }) */
  /* o.desc (sandboxes, 30.09): one line that replaces the live description,
     saying why sign-in comes before checkout. Live and the gate keep theirs. */
  var signinDesc = '';
  GBEntry.openSignin = function (o) {
    if (document.getElementById('leg-sheet')) return;
    signinDesc = (o && o.desc) || '';
    openSheet(document.body, { gate: true, onDone: o.onDone, onClose: o.onClose });
  };
  GBEntry.closeSignin = function () {
    var s = document.getElementById('leg-sheet');
    if (!s) return;
    clearInterval(timer);
    document.removeEventListener('keydown', s.__esc);
    s.remove();
  };

  GBEntry.screens.email = function (root) {
    GBEntry.renderLanding(root);
    openSheet(root);
    GBEntry.cookie();
  };
  /* back / forward between email and its code step */
  window.addEventListener('popstate', function () {
    var sheet = document.getElementById('lee-sheet');
    if (sheet && GBFlow.state.s === 'email') paint(sheet);
  });
/* ==== /EMAIL ==== */

/* ==== CATALOG (s=catalog) ==== */
  /* CATALOG · www.gildedbox.com/catalog/customize-162?from=lp-227&website=...
     Source: harvest/public-customize-162-lp227 (390 / 1440 dumps + shots,
     29.09). The page is the full site: black transparent header over a
     black hero, the brand word from the website in the title, the grid
     of the customize category in other companies' brands (37 items in
     the dump at both widths, the two strips included), then the closing
     bands and the dark footer.
     Card: plain CSS, NOT <gb-listing-card>: the system card is the card
     of /catalog/products (bg Zinc 50, padding 32, grey badge on Zinc 100),
     the customize card differs on all three (bg white, padding 18, badge
     white on Zinc 500). Header, closing bands and footer ARE the system
     organisms (<gb-site-header>, <gb-banner-conversation>, <gb-advantages>,
     <gb-site-footer>). Any card click opens the product page (the replica
     always opens 906). */
  (function () {
    /* verbatim from 1440.json / 390.json, in live order; 'w' = the strip
       layout live draws at 1440 (items 13 and 26); 'rev' = its image right */
    var CARDS = [
      ['3 Options', 'Venchi Chocoviar Collection', '$125 - $195', 'webp'],
      ['2 Options', 'Venchi Chocolate Cigar Lounge', '$125 - $195', 'webp'],
      ['3 Options', 'Venchi Cremino Collection', '$80 - $175', 'webp'],
      ['2 Options', 'Silver Oak Vinyards Cabernet', '$200 - $325', 'png'],
      ['3 Options', 'Famous Caymus Dark Chocolate Collection', '$165 - $225', 'webp'],
      ['3 Options', 'Famous Caymus Collection', '$130 - $195', 'webp'],
      ['3 Options', 'Stags\' Leap Wine Night and Day Collection', '$195 - $290', 'webp'],
      ['', 'Power Dock Trio Wireless Charger', '$100', 'webp'],
      ['', 'Elemental No.3 Candle Flight', '$125', 'webp'],
      ['', 'Unwind Collection', '$125', 'webp'],
      ['', 'Sugarfina Trio', '$45', 'webp'],
      ['', 'Ray-Ban Meta Wayfarer Smart Glasses', '$525', 'webp'],
      ['', 'Apple AirPods 5 Gift Set', '', 'webp', 'w'],
      ['', 'The Garda & Modena Collection', '$120', 'webp'],
      ['', 'Napa Valley Chocolate Library', '$95', 'webp'],
      ['', 'Onyx Coffee Lover Gift Set', '$95', 'webp'],
      ['', 'The Voyage No 6 Candle Collection', '$275', 'webp'],
      ['3 Options', 'Johnnie Walker Keep Walking Collection', '$175 - $570', 'webp'],
      ['', 'Opus No.2 Candle Duo', '$75', 'webp'],
      ['', 'Onyx Coffee Duo', '$65', 'webp'],
      ['', 'Off-Roading Gift Set', '$210', 'webp'],
      ['3 Options', 'Stags\' Leap Collection', '$120 - $220', 'webp'],
      ['', 'Fully Charged Gift Set', '$195', 'webp'],
      ['', 'Apple AirPods Pro 3 Gift Set', '$425', 'webp'],
      ['', 'Apple AirTag Luggage Tag Set', '$125', 'webp'],
      ['3 Options', 'Clase Azul Collection', '$350 - $575', 'webp', 'w', 'rev'],
      ['', 'Therabody Theragun Mini', '$275', 'webp'],
      ['', 'Tactical Essentials', '$110', 'webp'],
      ['', 'PowerFrame Mobile Charger (10K)', '$100', 'webp'],
      ['', 'JBL Vibe Earbuds', '$95', 'webp'],
      ['', 'Titleist Tee Time Collection', '$335', 'webp'],
      ['', 'Apple AirTag Double Luggage Tag Set', '$195', 'webp'],
      ['', 'Waterford Entertainment Set', '$295', 'webp'],
      ['', 'Home Office Gift Set', '$115', 'webp'],
      ['', 'YETI 20oz Tumbler', '$90', 'webp'],
      ['', 'YETI 20oz Travel Mug', '$100', 'webp'],
      ['', 'PowerCircle Wireless Charger', '$60', 'webp']
    ];
    var esc = GBEntry.esc;

    function card(c, i) {
      var n = i + 1;
      var img = 'start-227-assets/img/entry-cat-' + n + '.' + c[3];
      var badge = c[0] ? '<span class="lec-badge">' + esc(c[0]) + '</span>' : '';
      var price = c[2] ? '<div class="lec-price">' + esc(c[2]) + '</div>' : '';
      var std =
        '<div class="lec-pad">' +
          '<div class="lec-badgezone">' + badge + '</div>' +
          '<div class="lec-media"><img src="' + img + '" alt="' + esc(c[1]) + '" loading="lazy"></div>' +
          '<div class="lec-foot"><div class="lec-title">' + esc(c[1]) + '</div>' +
            '<div class="lec-pricerow">' + price + '</div></div>' +
        '</div>';
      var wide = c[4] ?
        '<div class="lec-wpad">' +
          '<div class="lec-badgezone">' + badge + '</div>' +
          '<div class="lec-wrow' + (c[5] ? ' lec-wrow--rev' : '') + '">' +
            '<div class="lec-wimg"><img src="' + img + '" alt="' + esc(c[1]) + '" loading="lazy"></div>' +
            '<div class="lec-wcopy"><div class="lec-title">' + esc(c[1]) + '</div>' +
              (c[2] ? '<div class="lec-price lec-price--w">' + esc(c[2]) + '</div>' : '') + '</div>' +
          '</div>' +
        '</div>' : '';
      return '<div class="lec-cell' + (c[4] ? ' lec-cell--wide' : '') + '">' +
        '<div class="lec-frame"><a class="lec-card" href="?s=product" data-lec-card="' + n + '">' +
          '<div class="lec-box">' + std + wide + '</div>' +
        '</a></div></div>';
    }

    GBEntry.screens.catalog = function (root) {
      var word = GBEntry.brandWord();
      root.innerHTML =
        '<div class="lec">' +
        '<gb-site-header variant="transparent-dark" over=".lec-hero" home-href="../index.html"' +
          ' logo-src="../system/assets/gildedbox-logo.svg" catalog-href="../live/catalog/index.html"' +
          ' portal-href="portal.html" meeting-href="book-a-meeting.html"></gb-site-header>' +
        '<main class="lec-main">' +
          '<section class="lec-hero"><div class="lec-hero__in">' +
            '<h1 class="lec-h1">For ' + esc(word) + '</h1>' +
            '<div class="lec-sub">Choose a gift below to create your branded design.</div>' +
          '</div></section>' +
          '<section class="lec-grid"><div class="lec-wrap"><div class="lec-row">' +
            CARDS.map(card).join('') +
          '</div></div></section>' +
          '<gb-banner-conversation pill="Iconic" rest="Corporate Gifting"' +
            ' subtitle="For The Select Few, Envied By Most, Coveted By All"' +
            ' cta="Discover Gifts" href="?s=catalog"></gb-banner-conversation>' +
          '<gb-advantages>' +
            '<gb-advantage icon="present" live-icon="present" heading="Custom Gift Box">Each gift starts with an individually designed gift box.</gb-advantage>' +
            '<gb-advantage icon="exchange" live-icon="gift-exchange" heading="Personalized Gifts">Personalization for every recipient means each gift is unique.</gb-advantage>' +
            '<gb-advantage icon="monitor" live-icon="pc-monitor" heading="Gifting Portal">Send gifts to individuals, run and manage gifting campaigns.</gb-advantage>' +
          '</gb-advantages>' +
        '</main>' +
        /* the breadcrumb band on top of the live footer (1440.json
           section.isDarkMode, 55 tall): not part of <gb-site-footer> */
        '<section class="lec-crumbs"><nav class="lec-crumbs__in" aria-label="Breadcrumb"><ol>' +
          '<li><a href="index.html"><span>Home</span></a></li>' +
          '<li class="lec-crumbs__sep" aria-hidden="true"><svg viewBox="0 0 14 14" width="10" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 3l4 4-4 4"/></svg></li>' +
          '<li><a href="catalog/index.html"><span>Catalog</span></a></li>' +
        '</ol></nav></section>' +
        '<gb-site-footer></gb-site-footer>' +
        '</div>';
      /* the live header copy (START GIFTING) is put back by the render loop, liveHeaderCopy() */
      root.querySelector('.lec-row').addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('[data-lec-card]');
        if (!a) return;
        e.preventDefault();
        window.GBFlow.go({ s: 'product' });
      });
    };
  })();
/* ==== /CATALOG ==== */

/* ==== PRODUCT + GATE (s=product, &gate=1) ==== */
  /* s=product · the live product page 906, one to one
     SRC: www.gildedbox.com/product/the-elemental-no-3-candle-906,
     harvest/public-product-906 (28.09: 390/768/1440 targets + shots,
     second-card-chosen = the Design it yourself state) and a guest dump
     of the same public page on 30.09 (390/1440, below the fold: Key
     Elements, the five questions, the closing band, the footer).
     Pictures are the live CDN files, downloaded to img/entry-p906-*.
     START DESIGNING goes to the customizer, step 0, when the 227 code
     step has signed the person in (GBEntry.signed()); otherwise it opens
     the sign in gate: the live site sign in sheet (GBEntry.openSignin,
     EMAIL region), the same shell as the 227 email sheet.
     &gate=1 = the gate is open. The gate never writes window.GbAuth: the
     header stays the guest bar of the harvests. */
  (function () {
    var IMG = 'start-227-assets/img/entry-p906-';
    var NAME = 'Elemental No.3 Candle Flight';               /* live h1, verbatim */

    /* the gallery pair: the designed picture and the standard one on
       top of it, crossfading (live: span.transition-opacity duration-[1.2s]) */
    function pair() {
      return '<div class="lep-pair">' +
        '<span class="lep-shot lep-shot--custom"><span class="lep-sq">' +
          '<img class="lep-img lep-img--contain" src="' + IMG + 'hero.webp" alt="' + NAME + '"></span></span>' +
        '<span class="lep-shot lep-shot--standard"><span class="lep-sq">' +
          '<img class="lep-img lep-img--contain" src="' + IMG + 'standard.webp" alt="' + NAME + '"></span></span>' +
      '</div>';
    }
    function more(n) {
      return '<span class="lep-shot lep-shot--more"><span class="lep-sq">' +
        '<img class="lep-img lep-img--cover" src="' + IMG + n + '.webp" alt="' + NAME + '" loading="lazy"></span></span>';
    }
    function card(id, value, title, desc, checked) {
      return '<div class="lep-card' + (checked ? ' is-on' : '') + '" data-value="' + value + '">' +
        '<div class="lep-radio">' +
          '<input class="lep-radio__input" type="radio" name="entry-variant" id="' + id + '" value="' + value + '"' + (checked ? ' checked' : '') + '>' +
          '<div class="lep-radio__box"><div class="lep-radio__dot"></div></div>' +
        '</div>' +
        '<div class="lep-card__copy">' +
          '<div class="lep-card__head"><label class="lep-card__title" for="' + id + '">' + title + '</label></div>' +
          '<div class="lep-card__desc">' + desc + '</div>' +
        '</div>' +
      '</div>';
    }
    /* Key Elements rows and the five questions, texts verbatim from the
       live page (typos included: «Even thought»). */
    var ELEMENTS = [
      ['Designed Gift Box', 'Rigid gift box designed to reflect your brand.'],
      ['Custom Card', 'Greeting card with your brand and message.'],
      ['Trio of Concrete Candles', 'Calming and refreshing scented candles wrapped in concrete containers']
    ];
    var FAQ = [
      ['Custom Designed Gift Box', 'Each gift starts with an individually designed gift box with your brand and message.'],
      ['Customization of Gift Items', 'Personalization and branding for every recipient means each gift can be unique.'],
      ['No Minimum', 'Even thought the gifts are bespoke and designs are unique to you, you are able to purchase each gift without a minimum commitment.'],
      ['Ship Directly to Recipients', 'Send gifts to individuals or to one location. You also have access to our gifting portal where you run and manage gifting campaigns.'],
      ['Fast Production Time', 'Approximately 15 business days from the time you place your order.']
    ];
    function element(e) {
      return '<div class="lep-el"><div class="lep-el__row" role="button" tabindex="0" aria-expanded="false">' +
        '<div class="lep-el__icon"><span data-gb-icon="plus" data-gb-icon-size="22"></span></div>' +
        '<div class="lep-el__copy"><div class="lep-el__title">' + e[0] + '</div><p class="lep-el__text">' + e[1] + '</p></div>' +
      '</div></div>';
    }
    function faq(e) {
      return '<div class="lep-q"><button class="lep-q__btn" type="button" aria-expanded="false">' +
        '<span class="lep-q__title">' + e[0] + '</span>' +
        '<span class="lep-q__icon"><span data-gb-icon="plus" data-gb-icon-size="24"></span></span>' +
      '</button><div class="lep-q__text" hidden>' + e[1] + '</div></div>';
    }

    function markup() {
      return '' +
        '<gb-site-header class="lep-header" home-href="../index.html"' +
        ' logo-src="../system/assets/gildedbox-logo.svg"' +
        ' catalog-href="../live/catalog/index.html" portal-href="portal.html"' +
        ' meeting-href="book-a-meeting.html"></gb-site-header>' +
        '<main class="lep" id="product">' +
          '<div class="lep-wrap"><div class="lep-container">' +
            '<div class="lep-gallery">' +
              '<div class="lep-heroslot">' + pair() + '</div>' +
              more('01') + more('02') + more('03') +
            '</div>' +
            '<div class="lep-info">' +
              '<div class="lep-mgallery">' + pair() + '</div>' +
              '<div class="lep-primary"><div class="lep-stack">' +
                '<h1 class="lep-title">' + NAME + '</h1>' +
                '<div class="lep-price">$125</div>' +
                '<div class="lep-options">' +
                  '<div class="lep-group" role="radiogroup" aria-label="' + NAME + '">' +
                    card('entry-variant-custom', 'custom', 'Designed for you', 'Work with our experts to design your gift.', true) +
                    card('entry-variant-standard', 'standard', 'Design it yourself', 'Start with your website URL.', false) +
                  '</div>' +
                  '<button class="lep-cta" type="button"><span class="lep-cta__label">Continue</span></button>' +
                '</div>' +
              '</div></div>' +
              '<div class="lep-more">' +
                '<section class="lep-features">' +
                  '<h2 class="lep-h2">Key Elements</h2>' +
                  '<div class="lep-features__body">' +
                    '<div class="lep-spec"><img src="' + IMG + 'spec.webp" alt="' + NAME + '" loading="lazy"></div>' +
                    '<div class="lep-els">' + ELEMENTS.map(element).join('') + '</div>' +
                  '</div>' +
                '</section>' +
                '<section class="lep-faq">' + FAQ.map(faq).join('') + '</section>' +
              '</div>' +
            '</div>' +
          '</div></div>' +
          /* the closing band: the system organism of the live band, same
             three columns and words as on this page (home.js) */
          '<gb-advantages>' +
            '<gb-advantage icon="present" live-icon="present" heading="Custom Gift Box">Each gift starts with an individually designed gift box.</gb-advantage>' +
            '<gb-advantage icon="exchange" live-icon="gift-exchange" heading="Personalized Gifts">Personalization for every recipient means each gift is unique.</gb-advantage>' +
            '<gb-advantage icon="monitor" live-icon="pc-monitor" heading="Gifting Portal">Send gifts to individuals, run and manage gifting campaigns.</gb-advantage>' +
          '</gb-advantages>' +
          '<gb-site-footer></gb-site-footer>' +
        '</main>';
    }

    /* ---- the sign in gate: the LIVE site sign in (Ren 30.09, Ton's
       screenshot ton-home-signin-drawer-2540.png), the same sheet shell
       as the 227 email sheet with the live login content (EMAIL region,
       GBEntry.openSignin). Any address or Google, then any six digits,
       walks into the customizer, step 0. ---- */
    function openGate() {
      if (!GBEntry.param('gate')) GBEntry.setParam('gate', '1');
      GBEntry.openSignin({
        onDone: function () { GBEntry.setParam('gate', ''); GBEntry.closeSignin(); window.GBFlow.go({ s: 'cz', cz: 'url' }); },
        onClose: function () { GBEntry.setParam('gate', ''); GBEntry.closeSignin(); }
      });
    }
    function closeGate() { GBEntry.closeSignin(); }

    function choose(root, value) {
      var main = root.querySelector('.lep');
      root.querySelectorAll('.lep-card').forEach(function (c) {
        var on = c.getAttribute('data-value') === value;
        c.classList.toggle('is-on', on);
        c.querySelector('input').checked = on;
      });
      main.setAttribute('data-variant', value);
      /* live: the label flips to START DESIGNING on the self serve card
         (second-card-chosen 1440.json: «Start Designing») */
      root.querySelector('.lep-cta__label').textContent = value === 'standard' ? 'Start Designing' : 'Continue';
    }

    function screen(root, st) {
      root.innerHTML = markup();
      var main = root.querySelector('.lep');
      main.setAttribute('data-variant', 'custom');
      if (window.GbIcons && window.GbIcons.mount) window.GbIcons.mount(root);

      root.querySelectorAll('.lep-card').forEach(function (c) {
        c.addEventListener('click', function () { choose(root, c.getAttribute('data-value')); });
      });
      root.querySelector('.lep-cta').addEventListener('click', function () {
        if (main.getAttribute('data-variant') !== 'standard') return;
        /* Ren 30.09: on the 227 path the person is already signed in by
           the email code, so START DESIGNING walks straight into the
           customizer. The gate stays a side state, for a guest who came
           without the 227 sheet (and for ?s=product&gate=1). */
        if (GBEntry.signed && GBEntry.signed()) window.GBFlow.go({ s: 'cz', cz: 'url' });
        else openGate();
        /* Designed for you + CONTINUE: live goes on to the request for
           a designer (not captured). ASSUMED: no step here. */
      });
      /* Key Elements rows and the questions open and close in place.
         ASSUMED: live motion and the icon of the open state were not captured. */
      root.querySelectorAll('.lep-el__row').forEach(function (r) {
        function t() {
          var open = r.getAttribute('aria-expanded') !== 'true';
          r.setAttribute('aria-expanded', String(open));
          r.parentNode.classList.toggle('is-open', open);
        }
        r.addEventListener('click', t);
        r.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } });
      });
      root.querySelectorAll('.lep-q__btn').forEach(function (b) {
        b.addEventListener('click', function () {
          var open = b.getAttribute('aria-expanded') !== 'true';
          b.setAttribute('aria-expanded', String(open));
          b.nextElementSibling.hidden = !open;
        });
      });
      if (GBEntry.param('gate') === '1') {
        choose(root, 'standard');
        /* the drawer element upgrades on the next tick of the parser */
        setTimeout(openGate, 0);
      }
    }
    screen.update = function (root, st) {
      if (GBEntry.param('gate') === '1') { choose(root, 'standard'); openGate(); }
      else closeGate();
    };
    GBEntry.screens.product = screen;

    /* leaving the page (back to the catalog, on to the customizer)
       takes the gate with it */
    document.addEventListener('gbflow:change', function (e) {
      if (e.detail && e.detail.s !== 'product') closeGate();
    });
  })();
/* ==== /PRODUCT ==== */

  /* THE RENDER LOOP. A screen renders when s changes; the same s with
     other keys (code, gate) is the screen's own business: it may set
     GBEntry.screens.<s>.update = function (root, state) to hear it. */
  function render(st) {
    var root = document.getElementById('entry-root');
    if (!root) return;
    var s = st && st.s;
    if (!window.GBFlow || window.GBFlow.ENTRY.indexOf(s) < 0) { GBEntry.current = ''; return; }
    var fn = GBEntry.screens[s];
    if (GBEntry.current === s && root.firstChild) {
      if (fn && fn.update) fn.update(root, st);
      return;
    }
    GBEntry.current = s;
    root.innerHTML = '';
    root.setAttribute('data-screen', s);
    if (typeof fn === 'function') fn(root, st);
    else root.innerHTML = '<p style="padding:24px">Screen ' + GBEntry.esc(s) + ' is being built.</p>';
    liveHeaderCopy(root);
    if (GBEntry.cookie) GBEntry.cookie();   /* the live consent bar is site wide */
  }

  /* LIVE COPY of the site header, on every entry screen that wears one:
     the live bar's outline button reads START GIFTING (public-customize-
     162-lp227 and public-product-906 1440.json, shots); the system bar
     says My Portal by a studio decision (header.js). This page is the
     live baseline, so the word is put back here, and only here. The gap
     before it (live 24, system 12) stays the header's: see the report. */
  function liveHeaderCopy(root) {
    Array.prototype.forEach.call(root.querySelectorAll('gb-site-header .gb-btn__label'), function (l) {
      if (/^\s*my portal\s*$/i.test(l.textContent)) l.textContent = 'Start Gifting';
    });
  }
  document.addEventListener('gbflow:change', function (e) { render(e.detail); });
})();
