/* ============================================================
   gbppl-oro-components-3 — THE INSPECTOR, first brick of DEV MODE
   ------------------------------------------------------------
   Ton, 26.08: «Properties компонента показывать в дровере по клику
   на компонент. Всё должно быть потом интерактивным.» And on
   25.08, the order this serves: a dev mode for front end people,
   so nobody has to read a stylesheet to learn what a component
   measures.

   WHAT IT DOES. Any region of a showcase page marked
   data-inspect="<kind>" becomes clickable: a click on a specimen
   inside it opens <gb-drawer> filled with the properties MEASURED
   OFF THAT ELEMENT with getComputedStyle, the modifiers it is
   wearing, the markup to copy, and the file that owns it.

   NOT ONE NUMBER IS TYPED. Every value in the drawer is read back
   out of the rendered page at the current window width, the same
   rule the anatomy tables on the showcase already live by. Beside
   each value the inspector prints the TOKEN that produced it,
   found by resolving the candidate tokens for that property and
   keeping the one whose value matches what the browser rendered.
   If none matches, the row says NO TOKEN out loud rather than
   inventing provenance.

   ADDING A COMPONENT to the inspector is one entry in KINDS:
   how to find the specimen inside a clicked slot, what to call
   it, which rows to print, and what markup to offer. The core
   below is component-agnostic.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  var root = document.documentElement;

  /* One decimal, not two. A display running at 113 per cent hands
     back 19.99 for a 20px glyph and 0.884956 for a hairline; the
     second decimal is the reader's screen talking, not the
     system. */
  function px(v) {
    var n = parseFloat(v);
    if (isNaN(n)) return v;
    return Math.round(n * 10) / 10 + 'px';
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /* Colours arrive as rgb() off the element and as hex out of a
     token, so both are pushed through one shape before they are
     compared. */
  function norm(v) {
    v = String(v).trim().toLowerCase();
    var m = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
    if (m) {
      var h = m[1];
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      return 'rgb(' + parseInt(h.slice(0, 2), 16) + ', ' + parseInt(h.slice(2, 4), 16) + ', ' + parseInt(h.slice(4, 6), 16) + ')';
    }
    return v.replace(/\s+/g, ' ').replace(/rgba\((.+?),\s*1\)/, 'rgb($1)');
  }
  function tokenValue(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }
  /* The token whose resolved value is what the browser drew.
     Lengths are compared at whole pixels: a hairline declared as
     1px comes back as 0.88 on a display at 113 per cent, and a
     token that is right should not be reported missing because
     the reader's screen has a scaling factor. */
  function samePx(a, b) {
    var ma = /^(-?[\d.]+)px$/.exec(a), mb = /^(-?[\d.]+)px$/.exec(b);
    return !!(ma && mb) && Math.round(parseFloat(ma[1])) === Math.round(parseFloat(mb[1]));
  }
  function tokenFor(value, candidates) {
    if (!candidates) return null;
    var want = norm(value);
    for (var i = 0; i < candidates.length; i++) {
      var got = tokenValue(candidates[i]);
      if (!got) continue;
      got = norm(got);
      if (got === want || samePx(got, want)) return candidates[i];
    }
    return null;
  }
  /* A ladder rung can be spelt three ways: the base token, the
     1280 step and the 2000 step. All three are offered and the
     matching one wins, which is how the drawer stays right at
     every window width without knowing the breakpoints. */
  function rungs(base) { return [base, base + '-xl', base + '-2xl']; }

  function row(label, value, candidates, note) {
    var t = candidates ? tokenFor(value, candidates) : null;
    return {
      label: label,
      value: value,
      token: t,
      note: note || (candidates && !t ? 'no token' : '')
    };
  }

  /* Two columns, not three: the drawer is 520 wide and a third
     column of token names would put it on a horizontal scrollbar.
     The token goes under the value it produced, which is also
     where Figma's inspect panel puts it. */
  function table(rowsList) {
    var html = '<table class="gbdoc-table"><thead><tr><th>Property</th><th>Rendered, and the token behind it</th></tr></thead><tbody>';
    rowsList.forEach(function (r) {
      var under = r.token
        ? '<code class="gbdoc-tokenline">' + esc(r.token) + '</code>'
        : (r.note === 'no token'
            ? '<span class="gbdoc-tokenline gbdoc-tokenline--none">No token</span>'
            : (r.note ? '<span class="gbdoc-tokenline gbdoc-tokenline--none">' + esc(r.note) + '</span>'
                      : '<span class="gbdoc-tokenline gbdoc-tokenline--none">In the organism</span>'));
      html += '<tr><td>' + esc(r.label) + '</td><td><span class="gbdoc-num">' + esc(r.value) + '</span>' + under + '</td></tr>';
    });
    return html + '</tbody></table>';
  }

  function chips(list) {
    if (!list.length) return '';
    return '<div class="gbdoc-chips">' + list.map(function (c) {
      return '<code class="gbdoc-chip">' + esc(c) + '</code>';
    }).join('') + '</div>';
  }

  function block(title, body) {
    return '<span class="gbdoc-cap">' + esc(title) + '</span>' + body;
  }

  function snippet(code) {
    return '<div class="gbdoc-code"><button class="gbdoc-copy" type="button">Copy</button><pre><code>' +
      esc(code) + '</code></pre></div>';
  }

  /* ---------- what each kind of specimen reports ---------- */
  var SIZE_NAME = { s: 'S', m: 'M', l: 'L', xl: 'XL' };

  var KINDS = {
    button: {
      eyebrow: 'Component',
      name: 'Button',
      owner: 'system/components/button.css',
      find: function (slot) { return slot.querySelector('.gb-btn'); },

      describe: function (el) {
        var m = /gb-btn--(s|m|l|xl)\b/.exec(el.className);
        var size = m ? m[1] : 'l';
        var type = /gb-btn--outline\b/.test(el.className) ? 'outline'
                 : /gb-btn--ghost\b/.test(el.className) ? 'ghost' : 'filled';
        var colour = /gb-btn--secondary\b/.test(el.className) ? 'secondary'
                   : /gb-btn--inverse\b/.test(el.className) ? 'inverse' : 'primary';
        var state = el.disabled || el.classList.contains('is-disabled') ? 'disabled'
                  : el.classList.contains('is-hover') ? 'hover'
                  : el.classList.contains('is-focus') ? 'focus'
                  : el.classList.contains('is-active') ? 'active' : 'rest';
        return { size: size, type: type, colour: colour, state: state };
      },

      title: function (el, d) {
        return d.type + ' ' + d.colour + ', size ' + SIZE_NAME[d.size] +
               (d.state === 'rest' ? '' : ', ' + d.state);
      },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var label = el.querySelector('.gb-btn__label');
        var icon = el.querySelector('.gb-btn__icon');
        var ls = label ? getComputedStyle(label) : null;
        var pre = 'gb-btn-' + d.size;
        var ink = d.type === 'filled' ? 'ink-on-' + d.colour : 'ink-' + d.colour;
        var inkStates = [
          '--gb-btn-' + ink,
          '--gb-btn-' + ink + '-hover',
          '--gb-btn-' + ink + '-active'
        ];
        var fillStates = [
          '--gb-btn-fill-' + d.colour,
          '--gb-btn-fill-' + d.colour + '-hover',
          '--gb-btn-fill-' + d.colour + '-active',
          '--gb-btn-wash-' + (d.colour === 'primary' ? 'accent' : d.colour === 'secondary' ? 'ink' : 'inverse') + '-hover',
          '--gb-btn-wash-' + (d.colour === 'primary' ? 'accent' : d.colour === 'secondary' ? 'ink' : 'inverse') + '-active'
        ];

        var rowsList = [
          row('Height', px(cs.minHeight), rungs('--' + pre + '-h')),
          row('Padding, vertical', px(cs.paddingTop), rungs('--' + pre + '-pad-y')),
          row('Padding, horizontal', px(cs.paddingLeft), rungs('--' + pre + '-pad-x')),
          row('Gap', px(cs.columnGap), rungs('--' + pre + '-gap')),
          row('Label size', ls ? px(ls.fontSize) : 'no label', ls ? rungs('--' + pre + '-label') : null),
          row('Label weight', ls ? ls.fontWeight : 'no label', ls ? ['--gb-btn-label-weight'] : null),
          row('Label tracking', ls ? ls.letterSpacing : 'no label', ls ? ['--gb-btn-label-tracking'] : null),
          row('Case', cs.textTransform, null, 'uppercase at every size'),
          row('Glyph box', icon ? px(getComputedStyle(icon).width) : 'no icon', icon ? rungs('--' + pre + '-icon') : null),
          row('Ground', cs.backgroundColor, fillStates, d.type === 'filled' ? '' : 'transparent at rest'),
          row('Ink', cs.color, inkStates),
          row('Hairline width', px(cs.borderTopWidth),
              parseFloat(cs.borderTopWidth) ? ['--gb-btn-border-width'] : null,
              parseFloat(cs.borderTopWidth) ? '' : 'none on this type'),
          row('Hairline colour', parseFloat(cs.borderTopWidth) ? cs.borderTopColor : 'none',
              parseFloat(cs.borderTopWidth) ? inkStates : null,
              parseFloat(cs.borderTopWidth) ? '' : 'none on this type'),
          row('Radius', px(cs.borderTopLeftRadius), ['--gb-btn-radius', '--radius']),
          row('Transition', cs.transitionDuration.split(',')[0].trim() + ' ' + cs.transitionTimingFunction.split(') ').join(') ').split(',').slice(0, 4).join(',').trim(),
              null, 'colour, background, border and opacity'),
          row('Opacity', cs.opacity, d.state === 'disabled' ? ['--gb-btn-disabled-opacity'] : null)
        ];

        var mods = el.className.split(/\s+/).filter(function (c) { return c.indexOf('gb-btn') === 0; });
        var demo = el.className.split(/\s+/).filter(function (c) { return /^is-/.test(c); });

        var code = '<button class="' + mods.join(' ') + '" type="button">\n' +
          (icon && icon === el.firstElementChild ? '  <span class="gb-btn__icon"><svg>...</svg></span>\n' : '') +
          (label ? '  <span class="gb-btn__label">' + label.textContent + '</span>\n' : '') +
          (icon && icon === el.lastElementChild ? '  <span class="gb-btn__icon"><svg>...</svg></span>\n' : '') +
          '</button>';

        return block('Properties, measured on this specimen', table(rowsList)) +
          block('Modifiers', chips(mods)) +
          (demo.length ? block('Demo only, never on a product page', chips(demo)) : '') +
          block('Markup', snippet(code));
      }
    },

    field: {
      eyebrow: 'Component',
      name: 'Field',
      owner: 'system/components/auth.css',
      find: function (slot) { return slot.querySelector('.gba-input'); },

      describe: function (el) {
        var state = el.disabled ? 'disabled'
                  : el.classList.contains('invalid') ? 'error'
                  : el.classList.contains('is-hover') ? 'hover'
                  : el.classList.contains('is-focus') ? 'focus'
                  : el.value ? 'filled' : 'empty';
        return { state: state, area: el.tagName === 'TEXTAREA' };
      },

      title: function (el, d) { return (d.area ? 'multi line' : 'single line') + ', ' + d.state; },

      body: function (el, d) {
        var cs = getComputedStyle(el);
        var lab = el.id ? document.querySelector('label[for="' + el.id + '"]') : null;
        var lsty = lab ? getComputedStyle(lab) : null;
        var rowsList = [
          row('Height', px(d.area ? cs.height : cs.minHeight), ['--gba-input-h', '--gba-input-h-xl', '--gba-input-h-2xl']),
          row('Padding, horizontal', px(cs.paddingLeft), null),
          row('Type size', px(cs.fontSize), null),
          row('Type weight', cs.fontWeight, null),
          row('Underline', px(cs.borderBottomWidth) + ' ' + cs.borderBottomColor, ['--zinc-400', '--blue-600', '--red-500']),
          row('Label size', lsty ? px(lsty.fontSize) : 'no label', null),
          row('Label tracking', lsty ? lsty.letterSpacing : 'no label', null),
          row('Ink', cs.color, ['--zinc-900', '--zinc-700']),
          row('Radius', px(cs.borderTopLeftRadius), null, 'the field is an underline, not a box')
        ];
        var mods = el.className.split(/\s+/).filter(Boolean);
        var code = '<gb-field input-id="' + (el.id || 'email') + '" name="' + (el.name || 'email') + '"\n' +
          '          type="' + (d.area ? 'textarea' : (el.type || 'text')) + '" label="' + (lab ? lab.textContent : 'Label') + '"></gb-field>';
        return block('Properties, measured on this specimen', table(rowsList)) +
          block('Classes', chips(mods)) +
          block('Markup', snippet(code));
      }
    }
  };

  /* ---------- what the page may borrow ----------
     The showcase builds one live table of its own (the state
     table of the workbench) and it must name tokens the same way
     the drawer does, so the lookup is published rather than
     written twice. */
  window.GbInspect = { tokenFor: tokenFor, tokenValue: tokenValue, px: px, norm: norm, rungs: rungs };

  /* ---------- wiring ---------- */
  var drawer = document.querySelector('gb-drawer');
  if (!drawer) return;

  function slotOf(target) {
    return target.closest('[data-inspect] .gbdoc-slot, [data-inspect] .gbdoc-cell, [data-inspect] .gbdoc-hold');
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    if (e.target.closest('.gbd-panel')) return;      /* inside the drawer itself */
    if (e.target.closest('[data-axis]')) return;     /* a control chip, not a specimen */
    var slot = slotOf(e.target);
    if (!slot) return;
    var region = slot.closest('[data-inspect]');
    var kind = KINDS[region.getAttribute('data-inspect')];
    if (!kind) return;
    var el = kind.find(slot);
    if (!el) return;

    e.preventDefault();
    var d = kind.describe(el);
    drawer.open({
      eyebrow: kind.eyebrow,
      title: kind.name,
      sub: kind.title(el, d) + ' &middot; measured at ' + window.innerWidth + 'px wide',
      html: kind.body(el, d),
      foot: 'Owner: <code>' + kind.owner + '</code>. Every number above was read off this specimen with ' +
            'getComputedStyle at the current window width.'
    });
  });

  /* Copy inside the drawer. */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.gbdoc-copy') : null;
    if (!btn) return;
    var pre = btn.parentNode.querySelector('code');
    if (!pre) return;
    var done = function () {
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = 'Copy'; }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pre.textContent).then(done, done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = pre.textContent;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (err) { /* nothing else to try */ }
      document.body.removeChild(ta);
    }
  });
})();
