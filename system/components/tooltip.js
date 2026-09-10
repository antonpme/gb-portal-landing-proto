/* ============================================================
   gbppl-tooltip-1 — WHAT THE TOOLTIP KNOWS
   ------------------------------------------------------------
   The look is tooltip.css. This is the half a pseudo element could
   not do: measure the plate, decide which side of the carrier it
   fits on, flip it when it does not fit, hold it off the edge of
   the window, and take it away the moment the pointer leaves.

   THE API, and it is one attribute.

     data-gb-tip="End chat"          the word the plate says
     data-gb-tip-place="bottom"      top | right | bottom | left,
                                     the side ASKED FOR. Default
                                     bottom, which is where the
                                     first carrier puts it
     aria-label="End the chat"       NOT optional on a glyph, and
                                     not written by this file:
                                     see THE TWIN below

     window.GbTip { show(el), hide(), place(), plate() }

   ONE PLATE PER DOCUMENT, and the listeners are delegated to the
   document rather than hung on carriers. No scan, no observer, no
   enhance(): a glyph rendered by a template five minutes from now
   works the moment it is in the DOM, and a glyph taken away takes
   nothing with it. The toggle needs an observer because it has to
   rewrite the markup it finds; this has nothing to write.

   THE TWIN. Every carrier is expected to have an aria-label of its
   own, and this file does NOT add one. The two answer different
   people: the plate is for the eye that cannot read a glyph, the
   label is for the reader that never sees a plate. Copying the tip
   into an aria-label would look like care and would in fact be a
   guess — the label often has to be longer and phrased as an act
   («End the chat») where the plate is a name («End chat»). The
   plate itself carries aria-hidden, so nothing is announced twice.
   Nothing here warns about a missing label either: the console is
   a gate in this house, and a component that prints into it on a
   product page is a component that has broken the gate. It is
   documented on the showcase and it is checked by eye.

   ------------------------------------------------------------
   HOW IT IS AIMED, AND WHY WITH ARITHMETIC
   ------------------------------------------------------------
   THE HOUSE ALREADY MEASURES THIS WAY. .gbc-bubble, the hover
   reader over a comment pin, is placed by comments.js with
   getBoundingClientRect, a gap and an edge read off the island it
   stands in, and a flip when the top does not fit. This is the
   same construction, generalised to four sides. Two copies of one
   idea would be two ideas by next month.

   WHY NOT CSS ANCHOR POSITIONING. position-area with
   position-try-fallbacks: flip-block, flip-inline does exactly this
   in the stylesheet, and on the machine this was built on (Chrome
   152) it works. It is not taken, for one reason that outranks how
   pretty it is: this is a component of a design system whose
   consumer is the client's own Nuxt and PrimeVue site, and Firefox
   does not ship anchor positioning. A tooltip that silently stops
   flipping in one browser is worse than no flip at all, because
   nobody sees it fail on the machine they built it on. The whole
   of the flip is thirty lines of arithmetic; it is written once,
   here, and it is the same everywhere.

   THE TOP LAYER IS TAKEN, THOUGH. Where the browser has the
   popover API (Chrome 114, Safari 17, Firefox 125) the plate is
   shown with showPopover(), which puts it in the top layer: above
   every stacking context in the document, uncuttable by any
   overflow, with no z-index to argue about. Where it does not, the
   plate is an ordinary fixed element on z 90 and the argument is
   in tooltip.css. The attribute is only ever SET when the browser
   supports it: an unknown popover attribute is inert, and a plate
   the user agent does not hide is a plate standing in the corner
   of the page for good.

   THE RUNGS ARE READ, NOT TYPED (trap 21 of the skill). The gap
   between carrier and plate is --space-8 and the margin from the
   window edge is --space-16, and both are read off the CARRIER with
   getComputedStyle rather than written as 8 and 16. On the vendored
   catalog those two names belong to the bundle at :root and mean 32
   and 64; reading them where the carrier stands is what makes the
   arithmetic true on that page as well.
   ============================================================ */
(function () {
  'use strict';

  var ATTR  = 'data-gb-tip';
  var PLACE = 'data-gb-tip-place';
  var SIDES = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

  var plate = null;
  var host = null;        /* the carrier whose word is on the plate */
  var pending = null;     /* ...and the one the wait is being spent on */
  var waitTimer = 0;
  var fadeTimer = 0;
  var frame = 0;

  var canPopover = (function () {
    try { return typeof HTMLElement !== 'undefined' &&
                 typeof HTMLElement.prototype.showPopover === 'function'; }
    catch (e) { return false; }
  })();

  /* A pointer that cannot hover never arms any of this. Same guard
     comments.js puts on its own hover reader, same reason. */
  function canHover() {
    try { return window.matchMedia('(hover: hover)').matches; } catch (e) { return true; }
  }

  function rung(cs, name, fallback) {
    var v = parseFloat(cs.getPropertyValue(name));
    return isFinite(v) && v > 0 ? v : fallback;
  }

  /* The wait and the fade are read off the tokens, so the plate and
     the ladder cannot drift apart. The wait is --mo-medium spent as
     patience: argued in the header of tooltip.css, and standing in
     the queue on the Feedback page as a rung the house has not got. */
  function ms(cs, name, fallback) {
    var raw = String(cs.getPropertyValue(name) || '').trim();
    var v = parseFloat(raw);
    if (!isFinite(v)) return fallback;
    return /ms$/.test(raw) ? v : v * 1000;
  }

  function build() {
    if (plate) return plate;
    plate = document.createElement('span');
    plate.className = 'gb-tip gb-tip--float';
    /* The eye's copy, not the reader's: the carrier's own aria-label
       is the reader's, and one fact announced twice is two facts. */
    plate.setAttribute('aria-hidden', 'true');
    if (canPopover) plate.setAttribute('popover', 'manual');
    document.body.appendChild(plate);
    return plate;
  }

  function carrierOf(node) {
    if (!node || !node.closest) return null;
    var el = node.closest('[' + ATTR + ']');
    if (!el) return null;
    return String(el.getAttribute(ATTR) || '').trim() ? el : null;
  }

  /* ============================================================
     THE FLIP, AND THE CLAMP
     ------------------------------------------------------------
     Four steps, in this order, and none of them guesses:

       1  the plate is measured where it stands, at its natural
          width, with the word already in it;
       2  the side ASKED FOR is tested against the room that side
          has: does the whole plate, plus the gap, plus the margin
          from the window edge, fit;
       3  if it does not, the OPPOSITE side is tested. Only the
          opposite: a bottom that flips to the left would move the
          plate to a different part of the glyph and read as a
          different control. If neither fits, the asked-for side is
          kept and the clamp below does what it can, because a plate
          half off the window is still more use than one covering
          the thing it names;
       4  the cross axis is clamped into the window: a plate centred
          on a glyph in the corner is pushed back inside by exactly
          as much as it hangs out, and no further.

     The window is documentElement.clientWidth and clientHeight,
     which is the window WITHOUT its scrollbars — innerWidth counts
     the scrollbar and would let a plate sit under it.
     ============================================================ */
  function place() {
    if (!plate || !host || !host.isConnected) return;

    var cs = getComputedStyle(host);
    var gap  = rung(cs, '--space-8', 8);
    var edge = rung(cs, '--space-16', 16);

    var r = host.getBoundingClientRect();
    var W = document.documentElement.clientWidth;
    var H = document.documentElement.clientHeight;

    /* A carrier scrolled out of the window has nothing to name. */
    if (r.bottom < 0 || r.top > H || r.right < 0 || r.left > W) { hide(); return; }

    /* Measured, not assumed: the plate is in the document with its
       word already in it, so this is the size it will be drawn at. */
    var p = plate.getBoundingClientRect();

    var want = String(host.getAttribute(PLACE) || 'bottom').toLowerCase();
    if (!SIDES[want]) want = 'bottom';

    function fits(side) {
      if (side === 'top')    return r.top - gap - p.height >= edge;
      if (side === 'bottom') return r.bottom + gap + p.height <= H - edge;
      if (side === 'left')   return r.left - gap - p.width >= edge;
      return r.right + gap + p.width <= W - edge;
    }

    var side = want;
    var flipped = false;
    if (!fits(side) && fits(SIDES[side])) { side = SIDES[side]; flipped = true; }

    var left, top;
    if (side === 'top' || side === 'bottom') {
      left = r.left + r.width / 2 - p.width / 2;
      top = side === 'top' ? r.top - gap - p.height : r.bottom + gap;
      left = Math.min(Math.max(left, edge), Math.max(edge, W - p.width - edge));
    } else {
      top = r.top + r.height / 2 - p.height / 2;
      left = side === 'left' ? r.left - gap - p.width : r.right + gap;
      top = Math.min(Math.max(top, edge), Math.max(edge, H - p.height - edge));
    }

    plate.style.left = Math.round(left) + 'px';
    plate.style.top  = Math.round(top) + 'px';
    /* Said out loud on the element, because the showcase proves the
       flip by reading it back and so can anyone else. */
    plate.setAttribute('data-side', side);
    plate.setAttribute('data-asked', want);
    plate.setAttribute('data-flipped', flipped ? 'yes' : 'no');
  }

  function show(el) {
    if (!el) return;
    var word = String(el.getAttribute(ATTR) || '').trim();
    if (!word) return;

    host = el;
    pending = null;
    build();
    if (fadeTimer) { clearTimeout(fadeTimer); fadeTimer = 0; }
    plate.textContent = word;

    if (canPopover && !plate.matches(':popover-open')) {
      try { plate.showPopover(); } catch (e) {}
    }
    place();
    /* One frame between «displayed» and «opaque», or there is no
       transition to run: a fade from a display change is not a fade. */
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(function () {
      frame = 0;
      if (plate && host) plate.classList.add('is-in');
    });
  }

  /* IT LEAVES WITHOUT PATIENCE. The wait is on the way in only: a
     pointer crossing a row of glyphs must not light three plates,
     and a pointer that has left has already said what it meant. The
     160ms is the fade of the ink, not a delay before it starts. */
  function hide() {
    if (waitTimer) { clearTimeout(waitTimer); waitTimer = 0; }
    host = null;
    pending = null;
    if (!plate) return;
    plate.classList.remove('is-in');
    if (fadeTimer) clearTimeout(fadeTimer);
    var out = ms(getComputedStyle(plate), '--mo-micro', 160);
    fadeTimer = setTimeout(function () {
      fadeTimer = 0;
      if (!plate || plate.classList.contains('is-in')) return;
      if (canPopover && plate.matches(':popover-open')) {
        try { plate.hidePopover(); } catch (e) {}
      }
    }, out + 20);
  }

  /* THE WAIT IS SPENT ONCE PER CARRIER, not once per node the
     pointer crosses inside it. A glyph is a button with a span and
     an svg in it, and restarting the patience on every one of them
     is a tooltip that never appears while the hand is moving. */
  function want(el) {
    if (el === host || el === pending) return;
    hide();
    pending = el;
    var cs = getComputedStyle(el);
    waitTimer = setTimeout(function () {
      waitTimer = 0;
      show(el);
    }, ms(cs, '--mo-medium', 500));
  }

  /* ---------- the pointer ----------
     pointerover and pointerout rather than mouseenter: one listener
     on the document sees every carrier, including the ones that did
     not exist when the page loaded. The relatedTarget test is what
     keeps a move between a glyph and its own label from counting as
     a leave. */
  if (canHover()) {
    document.addEventListener('pointerover', function (e) {
      if (e.pointerType === 'touch') return;
      var el = carrierOf(e.target);
      if (el) want(el);
    }, true);

    /* A leave DURING the wait cancels the wait: the hand that has
       gone must not be caught by a plate half a second later. */
    document.addEventListener('pointerout', function (e) {
      var now = host || pending;
      if (!now) return;
      var to = e.relatedTarget;
      if (to && now.contains(to)) return;
      if (carrierOf(e.target) !== now) return;
      hide();
    }, true);
  }

  /* A press is an answer. The name of the control has been read, or
     it has not; either way the hand is now doing the thing the name
     described, and a plate hanging over it is in the way. */
  document.addEventListener('pointerdown', function () { hide(); }, true);

  /* ---------- the keyboard ----------
     :focus-visible only, so a click that moves focus into a glyph
     does not raise a plate the mouse never asked for. And no wait:
     the patience exists because a pointer CROSSES things, and a Tab
     press is an arrival rather than a crossing. That is the one
     deliberate difference from the concierge original, which spent
     the same 500 on focus.

     Escape closes it and DOES NOT stop the event. The Escape ladder
     of the house (Feedback, Keyboard and access) has four rungs and
     each one swallows the press so the rung below cannot fire; a
     tooltip is below all four — it holds nothing, it has nothing to
     lose, and a press that closes a plate must still reach the
     drawer behind it. */
  document.addEventListener('focusin', function (e) {
    var el = carrierOf(e.target);
    if (!el) { if (host) hide(); return; }
    var vis = true;
    try { vis = el.matches(':focus-visible'); } catch (err) { vis = true; }
    if (!vis) return;
    hide();
    show(el);
  }, true);

  document.addEventListener('focusout', function (e) {
    if (host && carrierOf(e.target) === host) hide();
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && host) hide();
  }, true);

  /* ---------- the window moves under it ----------
     Re-aimed rather than hidden: the plate belongs to a carrier, and
     a carrier that is still under the pointer after a scroll still
     wants its name said. place() takes it away itself if the carrier
     has left the window. Capture, because most of the scrolling in
     this house happens in a panel rather than on the document. */
  function reaim() {
    if (!host) return;
    if (frame) return;
    frame = requestAnimationFrame(function () { frame = 0; place(); });
  }
  window.addEventListener('scroll', reaim, true);
  window.addEventListener('resize', reaim);

  window.GbTip = {
    show: show,
    hide: hide,
    place: place,
    plate: function () { return plate; }
  };
})();
