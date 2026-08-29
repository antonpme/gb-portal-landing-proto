/* ============================================================
   gbppl-lab-f-2 — WHAT THE TOGGLE BUTTON KNOWS
   ------------------------------------------------------------
   The look is toggle.css. This is the half a row of buttons does
   not have: a group of items that hold ONE value between them,
   say which one out loud to the accessibility tree, and answer
   the arrow keys the way a radio group is expected to.

   THE TWO MODES, the same pair the stepper declares, and for the
   same reason.

     default        the component owns the value. A click moves
                    .is-on and aria-checked, and `gbtg:change`
                    carries the reading — { value, label, index }
                    — to anyone listening.

     data-gb-toggle="host"
                    the HOST owns the value. The checkout is the
                    reason: its address segment does not hold a
                    string, it opens and closes half a form, and
                    that logic is Alpine's, bound to the very same
                    click. Here the component keeps its hands off
                    .is-on entirely and does only the half the
                    page never had: the group contract, the roving
                    tab stop and the arrow keys.

   ARROW KEYS, AND WHY THEY ALSO PRESS. A radio group has ONE tab
   stop: Tab lands on the chosen item, the arrows move between the
   items AND choose as they go, Home and End jump to the ends.
   That is the pattern every screen reader user already knows, so
   the arrows here do not merely move focus — they click, which
   means the host's own handler runs and host mode gets keyboard
   support for free without this file knowing what the host does.

   WHAT IS DELIBERATELY NOT ADDED. No aria-checked is invented for
   markup that already carries aria-pressed: a segment written as
   two pressed buttons is a legal reading of the same control and
   a second attribute beside it would be a second source of truth.
   The group role is only set when the markup has none, for the
   same reason.
   ============================================================ */
(function () {
  'use strict';

  var GROUP = '.gb-toggle';
  var ITEM = '.gb-toggle__item';

  function items(group) {
    return Array.prototype.filter.call(
      group.querySelectorAll(ITEM),
      function (el) { return el.closest(GROUP) === group; }
    );
  }

  /* Pressed is whichever word the markup speaks. One reader, so a
     group written three ways is never read three ways. */
  function isOn(el) {
    return el.classList.contains('is-on') ||
           el.getAttribute('aria-checked') === 'true' ||
           el.getAttribute('aria-pressed') === 'true';
  }

  function usesPressed(el) {
    return el.hasAttribute('aria-pressed') && !el.hasAttribute('aria-checked');
  }

  function valueOf(el) {
    var v = el.getAttribute('data-value');
    return v === null ? el.textContent.trim() : v;
  }

  function isHost(group) {
    return group.getAttribute('data-gb-toggle') === 'host';
  }

  /* The tab stop follows the chosen item: one stop for the whole
     group, which is the difference between a radio group and a
     row of buttons.

     IN HOST MODE THIS TOUCHES NOTHING BUT THE TAB STOP. Whoever
     owns the value owns everything that says the value out loud,
     class and aria alike; a component writing aria-checked beside
     an x-bind writing aria-checked is the second source of truth
     the stepper's header warns about. And a group where nothing
     is pressed yet is left as it is rather than being given a
     first pressed item it never had. */
  function sync(group) {
    var list = items(group);
    if (!list.length) return;
    var host = isHost(group);
    var chosen = list.filter(isOn)[0] || (host ? null : list[0]);
    list.forEach(function (el) {
      if (!host) {
        el.classList.toggle('is-on', el === chosen);
        if (usesPressed(el)) el.setAttribute('aria-pressed', el === chosen ? 'true' : 'false');
        else el.setAttribute('aria-checked', el === chosen ? 'true' : 'false');
      }
      el.tabIndex = el === (chosen || list[0]) ? 0 : -1;
    });
  }

  /* Host mode never reaches this: the host moves its own class and
     this file re-reads the markup afterwards. */
  function choose(group, el) {
    var list = items(group);
    if (list.indexOf(el) < 0 || el.disabled) return;
    list.forEach(function (b) {
      var on = b === el;
      b.classList.toggle('is-on', on);
      if (usesPressed(b)) b.setAttribute('aria-pressed', on ? 'true' : 'false');
      else b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    group.dispatchEvent(new CustomEvent('gbtg:change', {
      bubbles: true,
      detail: { value: valueOf(el), label: el.textContent.trim(), index: list.indexOf(el) }
    }));
  }

  /* The arrows skip what cannot be pressed, and they wrap, which
     is what a radio group does everywhere else in a browser. */
  function move(group, from, by) {
    var list = items(group).filter(function (el) { return !el.disabled; });
    if (!list.length) return;
    var at = list.indexOf(from);
    var next = by === 'first' ? 0
             : by === 'last' ? list.length - 1
             : (at + by + list.length) % list.length;
    var el = list[next];
    if (!el) return;
    el.focus();
    /* It presses as it moves. See the header. */
    el.click();
  }

  function enhance(group) {
    if (group.__gbtg) return;
    group.__gbtg = true;

    if (!group.getAttribute('role')) group.setAttribute('role', 'radiogroup');
    items(group).forEach(function (el) {
      if (el.tagName === 'BUTTON' && !el.getAttribute('type')) el.setAttribute('type', 'button');
      if (!el.getAttribute('role') && !usesPressed(el)) el.setAttribute('role', 'radio');
    });

    if (group.getAttribute('data-gb-toggle') !== 'host') {
      group.addEventListener('click', function (e) {
        var el = e.target.closest ? e.target.closest(ITEM) : null;
        if (!el || !group.contains(el)) return;
        choose(group, el);
      });
    } else {
      /* The host moved the class on its own click; the group reads
         the markup back on the next frame and re-hangs the tab
         stop where the value now is. */
      group.addEventListener('click', function () {
        requestAnimationFrame(function () { sync(group); });
      });
    }

    group.addEventListener('keydown', function (e) {
      var el = e.target.closest ? e.target.closest(ITEM) : null;
      if (!el || !group.contains(el)) return;
      var k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); move(group, el, 1); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); move(group, el, -1); }
      else if (k === 'Home') { e.preventDefault(); move(group, el, 'first'); }
      else if (k === 'End') { e.preventDefault(); move(group, el, 'last'); }
    });

    sync(group);
  }

  function boot(root) {
    var scope = root || document;
    Array.prototype.forEach.call(scope.querySelectorAll(GROUP), enhance);
  }

  function syncAll(root) {
    var scope = root || document;
    Array.prototype.forEach.call(scope.querySelectorAll(GROUP), sync);
  }

  /* Groups arrive and leave while the page is open: a shipment
     card is rendered by an x-for, a rail is rebuilt by a bench.
     The observer keeps a segment written by a template as complete
     as one that was in the HTML. */
  function watch() {
    if (!window.MutationObserver) return;
    new MutationObserver(function (records) {
      records.forEach(function (rec) {
        Array.prototype.forEach.call(rec.addedNodes, function (node) {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches(GROUP)) enhance(node);
          if (node.querySelectorAll) {
            Array.prototype.forEach.call(node.querySelectorAll(GROUP), enhance);
          }
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  window.GbToggle = { enhance: enhance, choose: choose, sync: sync, syncAll: syncAll, boot: boot };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { boot(); watch(); });
  } else {
    boot();
    watch();
  }
})();
