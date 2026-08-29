/* ============================================================
   gbppl-drawer-1 / gbppl-drawer-unify-1 / gbppl-drawer-focus-1 /
   gbppl-demo-fixes-1 — <gb-drawer>
   ------------------------------------------------------------
   The element behind drawer.css. One instance per page is enough:
   it is a surface, and the page decides what goes on it.

     <gb-drawer id="props"></gb-drawer>

     var d = document.getElementById('props');
     d.open({
       title: 'Button',                          // serif, left, may wrap
       back:  function () { flow.back(); },      // optional: arrow instead of cross
       sub:   'filled primary, size L',          // optional, FIRST LINE OF THE BODY
       html:  '<table>...</table>',              // the body
       foot:  'system/components/button.css'     // optional
     });
     d.setBack(fn);      // grow or drop the back arrow while open
     d.setBack(null);
     d.setTitle('Gift personalization');
     d.close();

   Events: gbd:open and gbd:close, both bubbling, so a host can
   follow the drawer without owning it.

   THE HEAD, ONE FOR EVERY DRAWER (gbppl-drawer-unify-1, 28.08).
   Ton asked for one denominator across the house, measured on the
   v1 catalogue drawers; drawer.css carries the numbers and the
   reasoning. What the element does about it:

     · ONE SLOT ON THE LEFT. The cross by default; the back arrow
       INSTEAD of it as soon as the caller hands over a `back`.
       Never two glyphs side by side.
     · When the arrow is on the left, the cross moves to the right
       edge. That is the only head with two controls in it.
     · No eyebrow and no subtitle in the head. `sub` is still part
       of the API and still says the same sentence; it just opens
       the BODY now, where the thing it describes is.
     · No actions in the head at all. A Clear all belongs beside
       what it clears.
     · ESC ALWAYS CLOSES, even when there is a step behind. Esc is
       the way out of a surface, not a way back through it; the
       arrow is the way back, and it is a button because a person
       has to be able to see that the step exists.

   WHAT IT TAKES CARE OF, so no page has to:
     Esc closes it, a click on the scrim closes it, the close
     button closes it.
     Focus moves into the panel on open, STAYS THERE while it is
     open, and on close returns to the element that opened it — or,
     when there is no such element, leaves the panel altogether
     (giveFocusBack below).
     The page behind stops scrolling while it is open.
     Two opens in a row swap the content instead of stacking two
     panels.

   FOCUS IS SHUT IN (gbppl-drawer-focus-1, 28.08). Found by the
   drawer showcase: the panel said role="dialog" aria-modal="true"
   and then let Tab walk straight out of it, into a page that is
   frozen, scrimmed and unreadable. A promise made in an attribute
   and broken by the keyboard is worse than no promise. Now Tab off
   the last control lands on the first, Shift+Tab off the first
   lands on the last, and focus that got out some other way (out to
   the browser chrome and back, a script that moved it) is pulled
   in on the next Tab.

   The ring is read LIVE on every keystroke, never cached: the auth
   flow and the comment thread redraw the body under themselves,
   and a cached list would hold focus on buttons that stopped
   existing. Hidden slots of the head fall out of it by themselves,
   because a rectangle is what the filter asks for, not a class.

   NO `inert` ON THE NEIGHBOURS. Chrome carries it since 102 and it
   would work, but here it buys nothing that is not already bought:
   pointers are stopped by the scrim (z 80 / 81, over everything
   the studio owns), assistive technology by aria-modal, and the
   keyboard by the ring above. What it would add is an attribute
   written onto foreign body children, the vendored catalogue
   bundle among them, that stays there and kills the page if any
   close path is ever missed. A state that can get stuck is not a
   cheap state.

   THE FIRST BRICK OF DEV MODE (Ton, 25.08): the showcase opens
   this drawer on any specimen a developer clicks and fills it
   with the properties measured off that very element. The drawer
   itself knows nothing about that, which is the point.
   ============================================================ */
(function () {
  'use strict';

  var CLOSE_MS = 350; /* --mo-medium-out; kept in step with drawer.css */

  /* Stroke 1.5 and a 22px box: the glyph measured on the catalogue
     drawers, drawn on the same 24 grid the rest of our icons use. */
  var GLYPH_CLOSE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  var GLYPH_BACK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M15 5l-7 7 7 7"/></svg>';

  /* THE RING. The standard tabbable list; `[tabindex]` is in it for
     the roles a page invents, and the same line is why the filter
     below throws out anything below zero, the panel's own -1
     included. */
  var FOCUS_SEL = [
    'a[href]', 'area[href]', 'button', 'input', 'select', 'textarea',
    'summary', 'iframe', 'object', 'embed',
    'audio[controls]', 'video[controls]',
    '[contenteditable]:not([contenteditable="false"])',
    '[tabindex]'
  ].join(',');

  function tabbable(root) {
    var list = root.querySelectorAll(FOCUS_SEL);
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var n = list[i];
      if (n.disabled) continue;
      if (n.closest('fieldset[disabled], [inert]')) continue;
      if (n.getAttribute('aria-hidden') === 'true') continue;
      var ti = n.getAttribute('tabindex');
      if (ti !== null && !(Number(ti) >= 0)) continue;
      /* Visible, measured, not declared: `hidden`, display:none and
         a collapsed ancestor all come back as no rectangles at all,
         and visibility has to be asked for separately because it
         keeps the box and only stops painting it. */
      if (!n.getClientRects().length) continue;
      if (getComputedStyle(n).visibility === 'hidden') continue;
      out.push(n);
    }
    return out;
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* Every control in the head is the same button: the organism,
     ghost secondary, wearing the --icon shape. */
  function iconButton(glyph, label) {
    var b = el('button', 'gb-btn gb-btn--icon gb-btn--ghost gb-btn--secondary gbd-slot');
    b.type = 'button';
    b.setAttribute('aria-label', label);
    b.innerHTML = '<span class="gb-btn__icon" aria-hidden="true">' + glyph + '</span>';
    return b;
  }

  function build(host) {
    if (host._built) return;
    host._built = true;

    host._scrim = el('div', 'gbd-scrim');
    host._scrim.hidden = true;

    host._panel = el('aside', 'gbd-panel');
    host._panel.hidden = true;
    host._panel.setAttribute('role', 'dialog');
    host._panel.setAttribute('aria-modal', 'true');
    host._panel.setAttribute('tabindex', '-1');

    /* THREE SLOTS, ALWAYS IN THE DOM, AND THE HEAD DECIDES WHICH
       TWO ARE SHOWN. The left one is the back arrow or the cross,
       never both; the right one is the cross and appears only when
       the arrow has taken the left. Building all three once means
       setBack() is a `hidden` flag rather than a rebuild, so the
       arrow can grow mid-flow without the head flickering. */
    var head = el('div', 'gbd-head');
    host._back = iconButton(GLYPH_BACK, 'Back');
    host._closeLeft = iconButton(GLYPH_CLOSE, 'Close');
    host._closeRight = iconButton(GLYPH_CLOSE, 'Close');
    host._title = el('h2', 'gbd-title');

    head.appendChild(host._back);
    head.appendChild(host._closeLeft);
    head.appendChild(host._title);
    head.appendChild(host._closeRight);

    /* The body stays ONE container: consumers reach into
       `.gbd-panel .gbd-body` by hand (Comment redraws its form
       there), and a wrapper would have moved the ground under
       them. `sub` is therefore written into the body as its first
       paragraph rather than kept as a slot of its own. */
    host._body = el('div', 'gbd-body');
    host._foot = el('div', 'gbd-foot');

    host._panel.appendChild(head);
    host._panel.appendChild(host._body);
    host._panel.appendChild(host._foot);

    /* The panel and the scrim are fixed to the viewport, so they
       live on the body rather than inside whatever container the
       tag was written in: a transformed ancestor would otherwise
       become their containing block and the drawer would slide
       inside a card. */
    document.body.appendChild(host._scrim);
    document.body.appendChild(host._panel);

    host._scrim.addEventListener('click', function () { host.close(); });
    host._closeLeft.addEventListener('click', function () { host.close(); });
    host._closeRight.addEventListener('click', function () { host.close(); });
    host._back.addEventListener('click', function () {
      if (typeof host._onBack === 'function') host._onBack();
    });

    /* Esc closes, with a back step or without one. See the head
       block at the top of the file for why it is not a step back. */
    host._onKey = function (e) {
      if (!host._open) return;
      if (e.key === 'Escape') { e.preventDefault(); host.close(); return; }
      if (e.key !== 'Tab') return;

      var ring = tabbable(host._panel);
      var here = document.activeElement;

      /* An empty panel still has to hold the key: the panel itself
         is the only thing left to stand on. */
      if (!ring.length) {
        e.preventDefault();
        host._panel.focus({ preventScroll: true });
        return;
      }

      var first = ring[0];
      var last = ring[ring.length - 1];

      /* Out of the panel, or standing on the panel itself with
         Shift held: either way the browser is about to leave, so
         the step is made by hand instead. Forward off the panel
         needs no help, the first control is already next in the
         document. */
      if (!here || !host._panel.contains(here)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
        return;
      }
      if (e.shiftKey && (here === first || here === host._panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && here === last) {
        e.preventDefault();
        first.focus();
      }
    };
  }

  /* Which of the three head slots are on screen. Called on open and
     on every setBack, and it is the whole of the rule: arrow OR
     cross on the left, cross on the right only behind an arrow. */
  function dressHead(host) {
    var hasBack = typeof host._onBack === 'function';
    host._back.hidden = !hasBack;
    host._closeLeft.hidden = hasBack;
    host._closeRight.hidden = !hasBack;
  }

  function openDrawer(opts) {
    var host = this;
    build(host);
    opts = opts || {};

    clearTimeout(host._closeTimer);
    host._returnTo = document.activeElement;

    host._title.textContent = opts.title || '';
    host._onBack = typeof opts.back === 'function' ? opts.back : null;
    dressHead(host);

    host._body.innerHTML =
      (opts.sub ? '<p class="gbd-sub">' + opts.sub + '</p>' : '') + (opts.html || '');
    host._foot.innerHTML = opts.foot || '';
    host._panel.setAttribute('aria-label', (opts.title || 'Details') + (opts.sub ? ', ' + String(opts.sub).replace(/<[^>]*>/g, '') : ''));

    if (host._open) return; /* already on screen: the content just swapped */

    host._open = true;
    host._scrim.hidden = false;
    host._panel.hidden = false;
    host._scrim.classList.remove('is-out');
    host._panel.classList.remove('is-out');

    /* Measure-then-move: the panel has to be laid out at
       translateX(100%) before the class that moves it is added, or
       the browser has nothing to animate from. (MOTION.md: замеры
       под reflow, урок gbppl-motion-pass.) */
    void host._panel.offsetWidth;
    host._scrim.classList.add('is-open');
    host._panel.classList.add('is-open');

    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', host._onKey);
    host._panel.focus({ preventScroll: true });
    host.dispatchEvent(new CustomEvent('gbd:open', { bubbles: true }));
  }

  /* ============================================================
     LEAVING TAKES THE FOCUS WITH IT (gbppl-demo-fixes-1, 29.08)
     ------------------------------------------------------------
     Found by the show run: type into the comment thread, press
     Escape. The panel goes, and the caret stays in a textarea that
     is now hidden behind it — because the drawer had opened from a
     click on a heading, `document.activeElement` at that moment was
     <body>, and `body.focus()` is a no-op that leaves the focus
     exactly where it was. From there every next Escape reads as
     «this person is typing» to comments.js, and the only way out of
     Comment mode is the mouse.

     So the return is a decision, not one line: hand focus back only
     to an element that can actually take it and is still on the
     page, and otherwise TAKE IT OFF whatever is inside the panel.
     Focus never stays under a surface that is no longer there.

     `getClientRects().length` rather than a class or a style: an
     opener can be hidden by its own media step (the burger button
     above 1280), removed by a redraw, or replaced with a copy, and a
     rectangle is what all three have in common. <body> is asked
     about by name because it is the honest value of activeElement
     when nothing is focused, and it is never an opener.
     ============================================================ */
  function giveFocusBack(host) {
    var back = host._returnTo;
    var usable = back && typeof back.focus === 'function' &&
                 back !== document.body && back !== document.documentElement &&
                 back.isConnected && back.getClientRects().length > 0 &&
                 /* A second open swaps the content and remembers whatever
                    was focused at that moment — a row of the thread, a
                    control of the body. Returning INTO the panel is the
                    same trap from the other side. */
                 !(host._panel && host._panel.contains(back));
    if (usable) { back.focus({ preventScroll: true }); return; }
    var here = document.activeElement;
    if (here && here !== document.body && host._panel && host._panel.contains(here) && here.blur) {
      here.blur();
    }
  }

  function closeDrawer() {
    var host = this;
    if (!host._open) return;
    host._open = false;

    host._scrim.classList.add('is-out');
    host._panel.classList.add('is-out');
    host._scrim.classList.remove('is-open');
    host._panel.classList.remove('is-open');

    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', host._onKey);

    host._closeTimer = setTimeout(function () {
      host._scrim.hidden = true;
      host._panel.hidden = true;
      host._scrim.classList.remove('is-out');
      host._panel.classList.remove('is-out');
    }, CLOSE_MS);

    giveFocusBack(host);
    host.dispatchEvent(new CustomEvent('gbd:close', { bubbles: true }));
  }

  /* Registration in the shape the other organisms use. */
  class GbDrawer extends HTMLElement {
    connectedCallback() { build(this); }
    open(opts) { openDrawer.call(this, opts); }
    close() { closeDrawer.call(this); }

    /* A flow that grows a step behind it says so while the panel is
       already on screen (the sign in drawer does exactly that when
       the code step arrives). Pass null to take the arrow away. */
    setBack(fn) {
      build(this);
      this._onBack = typeof fn === 'function' ? fn : null;
      dressHead(this);
    }
    setTitle(text) {
      build(this);
      this._title.textContent = text || '';
      this._panel.setAttribute('aria-label', text || 'Details');
    }
  }
  if (!customElements.get('gb-drawer')) {
    customElements.define('gb-drawer', GbDrawer);
  }
})();
