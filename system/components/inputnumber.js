/* ============================================================
   gbppl-inputnumber-1 — WHAT THE INPUT NUMBER KNOWS
   ------------------------------------------------------------
   It was called the stepper until 31.08. PrimeVue, the client's
   stack, keeps that word for a wizard of steps and calls this one
   InputNumber, so the two swapped back to the names their readers
   already use. The rename story is in the head of inputnumber.css;
   what is below is the same behaviour, renamed and not rewritten.

   The look is inputnumber.css. This is the one thing an input number does
   that a frame around two buttons cannot: it knows its floor and
   its ceiling, and it says so out loud — on the buttons, which go
   disabled, and to a screen reader, which is told the number.

   THE TWO MODES, AND WHY THE HOST ONE EXISTS.

     default        the component owns the value. A click steps
                    it, the input and change events fire the way
                    they do when a person types, so an x-model or
                    a listener upstream sees exactly what it would
                    have seen anyway, and `gbin:change` carries
                    the reading for anyone who wants it named.

     data-gb-inputnumber="host"
                    the HOST owns the value. The checkout is the
                    reason: its four input numbers do not increment a
                    number, they grow a pool, sync personalisation
                    rows and recount an order, and that logic is
                    Alpine's. Here the component keeps its hands
                    off the value entirely and does only the half
                    the host never had: bounds on the buttons and
                    aria on the frame.

   The default is the component driving, because a control that
   does nothing until it is wired is not a component. The opt out
   is a word rather than a guess, because an input number that guesses
   wrong counts twice, and counting twice is the one failure a
   quantity control must not have.

   WHEN IT RESYNCS. On its own clicks, on input and change, and —
   this is the checkout case — after ANY click on the page, on the
   next frame. A pool can grow because a row three sections away
   asked it to, and no event reaches the frame when it does. One
   rAF pass over a handful of frames is cheaper than an observer
   on every value in the document, and it is honest: the buttons
   are re-read from the DOM rather than remembered.

   ARIA, AND WHAT IS DELIBERATELY NOT ADDED. A frame is a group.
   An <input type="number"> is already a spinbutton to the
   accessibility tree, carries its own value, min and max, and
   answers the arrow keys itself, so nothing is layered on top of
   it: a hand-written aria-valuenow beside a native value is a
   second source of truth, and the instrument's rule («прибор не
   выдумывает») is the same rule here. An input number whose value is a
   <span> gets the whole spinbutton contract instead, because
   nothing else is going to give it one.
   ============================================================ */
(function () {
  'use strict';

  var FRAME = '.gb-inputnumber';

  function num(v, fallback) {
    var n = parseFloat(v);
    return isNaN(n) ? fallback : n;
  }

  /* The three parts. Written once, because every function below
     asks the same question of the DOM and an input number whose parts
     were found two different ways is two input numbers. */
  function parts(frame) {
    return {
      down: frame.querySelector('[data-step="-1"]'),
      up: frame.querySelector('[data-step="1"]'),
      value: frame.querySelector('.gb-inputnumber__value')
    };
  }

  function reading(frame, p) {
    var v = p.value;
    if (!v) return null;
    var isInput = v.tagName === 'INPUT';
    var raw = isInput ? v.value : v.textContent;
    return {
      isInput: isInput,
      now: num(raw, num(frame.getAttribute('data-min'), 0)),
      min: num(isInput ? v.getAttribute('min') : frame.getAttribute('data-min'), null),
      max: num(isInput ? v.getAttribute('max') : frame.getAttribute('data-max'), null),
      step: num(frame.getAttribute('data-step-by'), 1)
    };
  }

  /* Bounds and aria. Never the value: this runs in both modes. */
  function sync(frame) {
    var p = parts(frame);
    var r = reading(frame, p);
    if (!r) return;

    var off = frame.classList.contains('is-disabled') ||
              frame.getAttribute('aria-disabled') === 'true';
    var atFloor = r.min !== null && r.now <= r.min;
    var atCeil = r.max !== null && r.now >= r.max;

    if (p.down) p.down.disabled = off || atFloor;
    if (p.up) p.up.disabled = off || atCeil;

    if (!r.isInput) {
      p.value.setAttribute('aria-valuenow', String(r.now));
      if (r.min !== null) p.value.setAttribute('aria-valuemin', String(r.min));
      if (r.max !== null) p.value.setAttribute('aria-valuemax', String(r.max));
    }
  }

  function syncAll(root) {
    var scope = root || document;
    Array.prototype.forEach.call(scope.querySelectorAll(FRAME), sync);
  }

  /* The component's own step. Host mode never reaches this. */
  function step(frame, by) {
    var p = parts(frame);
    var r = reading(frame, p);
    if (!r) return;
    var next = r.now + by * r.step;
    if (r.min !== null && next < r.min) next = r.min;
    if (r.max !== null && next > r.max) next = r.max;
    if (next === r.now) return;

    if (r.isInput) {
      p.value.value = String(next);
      /* The two events a typed value would have fired, in the
         order a browser fires them. An x-model listening upstream
         cannot tell the difference, and that is the point. */
      p.value.dispatchEvent(new Event('input', { bubbles: true }));
      p.value.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      p.value.textContent = String(next);
    }
    sync(frame);
    frame.dispatchEvent(new CustomEvent('gbin:change', {
      bubbles: true,
      detail: { value: next, min: r.min, max: r.max }
    }));
  }

  /* ---------- the glyphs ----------
     An empty .gb-btn__icon is filled from the icon record, so a
     consumer names the control and not the drawing. Markup that
     carries its own SVG is left exactly as written: the checkout
     wrote four pairs by hand before the record existed, and a
     component does not overwrite what it was handed. */
  function glyphs(frame) {
    if (!window.GbIcons) return;
    var p = parts(frame);
    [[p.down, 'minus'], [p.up, 'plus']].forEach(function (pair) {
      if (!pair[0]) return;
      var box = pair[0].querySelector('.gb-btn__icon');
      if (!box || box.children.length || box.textContent.trim()) return;
      box.innerHTML = window.GbIcons.svg(pair[1]);
      box.setAttribute('aria-hidden', 'true');
    });
  }

  function enhance(frame) {
    if (frame.__gbin) return;
    frame.__gbin = true;

    var p = parts(frame);
    if (!p.value) return;

    glyphs(frame);

    if (!frame.getAttribute('role')) frame.setAttribute('role', 'group');

    /* A span value has no contract of its own, so it is given the
       whole one. An input already has it. */
    if (p.value.tagName !== 'INPUT') {
      if (!p.value.getAttribute('role')) p.value.setAttribute('role', 'spinbutton');
      if (!p.value.hasAttribute('tabindex')) p.value.setAttribute('tabindex', '0');
      p.value.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp') { e.preventDefault(); step(frame, 1); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); step(frame, -1); }
      });
    }

    if (frame.getAttribute('data-gb-inputnumber') !== 'host') {
      frame.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('[data-step]') : null;
        if (!btn || btn.disabled || !frame.contains(btn)) return;
        step(frame, num(btn.getAttribute('data-step'), 1));
      });
    }

    frame.addEventListener('input', function () { sync(frame); });
    frame.addEventListener('change', function () { sync(frame); });

    sync(frame);
  }

  function boot(root) {
    var scope = root || document;
    Array.prototype.forEach.call(scope.querySelectorAll(FRAME), enhance);
  }

  /* Rows arrive and leave while the page is open: a table renders
     its recipients, a drawer draws its body. The observer is what
     keeps an input number that was written by a template as complete as
     one that was in the HTML. */
  function watch() {
    if (!window.MutationObserver) return;
    new MutationObserver(function (records) {
      var fresh = false;
      records.forEach(function (rec) {
        Array.prototype.forEach.call(rec.addedNodes, function (node) {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches(FRAME)) { enhance(node); fresh = true; }
          if (node.querySelectorAll) {
            Array.prototype.forEach.call(node.querySelectorAll(FRAME), function (f) {
              enhance(f); fresh = true;
            });
          }
        });
      });
      if (fresh) syncAll();
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  /* The pool that grew because a row asked it to. See the header. */
  document.addEventListener('click', function () {
    requestAnimationFrame(function () { syncAll(); });
  }, true);

  window.GbInputNumber = { enhance: enhance, sync: sync, syncAll: syncAll, boot: boot };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { boot(); watch(); });
  } else {
    boot();
    watch();
  }
})();
