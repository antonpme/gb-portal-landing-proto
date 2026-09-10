/* ============================================================
   gbppl-cart-drawer-1 — THE CART OPENS AN OVERVIEW, NOT A PAGE
   ------------------------------------------------------------
   Ton, 10.09, agreeing the taxonomy: the cart glyph in the bar is a
   plate like any other plate on the dashboard, and a plate opens an
   overview before a process. So the bar's cart raises <gb-drawer>
   with what is in it and one door out to the checkout, instead of
   throwing the person straight into a page they have not agreed to
   yet. Same nature as a metric tile and an order row.

   WHAT THIS FILE IS, AND WHAT IT IS NOT. It is a SHARED PAGE
   SNIPPET, sitting in live/ beside the pages that use it, because
   two carriers now want the same behaviour and copying it into both
   would be the sort of drift this house keeps catching. It is NOT a
   system organism: promoting it to system/components is a decision
   about the canon and needs Ton's word (law 0a.4). It uses only
   organisms that already exist — <gb-drawer>, .gb-btn, .gb-badge,
   the page's own frame recipe — and invents no component.

   HOW A PAGE TURNS IT ON:
     <script src="cart-drawer.js"
             data-cart-button="#gbppdCart"      the plate in the bar
             data-checkout="checkout.html?v=5"  the door at the foot
             data-catalog="catalog/index.html"> the door when empty
   The dashboard turns it on unconditionally. live\portal.html turns
   it on behind ?cart=drawer, because that page's cart has navigated
   to the checkout since 26.08 and silently changing what a live
   prototype does is how a demo betrays the person showing it.

   THE EMPTY CART IS A STATE, NOT A BLANK SHELF: one quiet line and
   the way to the catalogue. The dashboard's «new account» switch
   empties it, so the badge and the drawer never disagree.
   ============================================================ */
(function () {
  'use strict';

  var self = document.currentScript;
  if (!self) return;

  var BTN      = self.getAttribute('data-cart-button') || '[data-gbppl-cart]';
  var CHECKOUT = self.getAttribute('data-checkout') || 'checkout.html?v=5';
  var CATALOG  = self.getAttribute('data-catalog') || 'catalog/index.html';
  var ROOT     = self.getAttribute('data-assets') || '../system/assets/products/';
  var KEY      = self.getAttribute('data-key');          /* optional query gate */

  if (KEY) {
    var on = false;
    try { on = new URLSearchParams(location.search).get(KEY.split('=')[0]) === KEY.split('=')[1]; } catch (e) {}
    if (!on) return;
  }

  /* THREE LINES, AND THE BADGE IN THE BAR SAYS THREE. The gifts are
     the catalogue's own, at the catalogue's own prices. */
  var ITEMS = [
    { img: '1112-main.webp', name: 'Famous Caymus Collection', qty: 1, price: 195 },
    { img: '1081-main.webp', name: 'Taste of Amalfi',          qty: 1, price: 200 },
    { img: '1094-main.webp', name: 'Beats Solo Buds',          qty: 1, price: 150 }
  ];

  /* THE LOOK TRAVELS WITH THE BEHAVIOUR. One owner, two carriers,
     nothing copied into a page: the snippet writes its own rules
     once, in the page's own idiom (the framed preview of the board,
     the working voice, the rungs). */
  var CSS = ".gbppc-line {\n  display: grid;\n  grid-template-columns: 56px minmax(0, 1fr) auto;\n  align-items: center;\n  gap: var(--space-16);\n  padding-block: var(--space-16);\n  border-top: 1px solid var(--zinc-200);\n}\n.gbppc-line:first-child { border-top: 0; }\n.gbppc-frame {\n  display: grid;\n  place-items: center;\n  width: 56px;\n  height: 56px;\n  padding: 4px;                       /* half the rung, the frame of the board one size down */\n  border: 1px solid var(--zinc-200);\n  border-radius: var(--radius);\n  background: var(--zinc-50);\n  overflow: hidden;\n}\n.gbppc-frame img { max-width: 100%; max-height: 100%; display: block; }\n.gbppc-name { display: block; font-size: 16px; font-weight: 600; line-height: 1.4; color: var(--zinc-900); }\n.gbppc-meta { display: block; margin-top: var(--space-8); font-size: 14px; line-height: 1.5; color: var(--zinc-500); }\n.gbppc-sum  { font-size: 16px; font-weight: 500; line-height: 1.4; color: var(--zinc-900); white-space: nowrap; }\n.gbppc-total {\n  display: flex;\n  justify-content: space-between;\n  gap: var(--space-16);\n  margin-top: var(--space-16);\n  padding-top: var(--space-16);\n  border-top: 1px solid var(--zinc-200);\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 1.4;\n  color: var(--zinc-900);\n}\n.gbppc-none { margin: 0; font-size: 16px; line-height: 1.7; color: var(--zinc-600); }\n.gbppc-none a { color: var(--blue-600); text-decoration: none; }\n.gbppc-none a:hover { text-decoration: underline; }";
  if (!document.getElementById('gbppc-style')) {
    var st = document.createElement('style');
    st.id = 'gbppc-style';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function money(n) { return '$' + n.toLocaleString('en-US'); }

  function body(empty) {
    if (empty) {
      return '<p class="gbppc-none">Your cart is empty. ' +
             '<a href="' + CATALOG + '">Explore gifts</a> and add the first one.</p>';
    }
    var total = 0;
    var html = '<div class="gbppc-list">';
    ITEMS.forEach(function (it) {
      total += it.qty * it.price;
      html += '<div class="gbppc-line">' +
              '<span class="gbppc-frame"><img src="' + ROOT + it.img + '" alt="" loading="lazy"></span>' +
              '<span class="gbppc-what"><span class="gbppc-name">' + it.name + '</span>' +
              '<span class="gbppc-meta">' + it.qty + ' &times; ' + money(it.price) + '</span></span>' +
              '<span class="gbppc-sum">' + money(it.qty * it.price) + '</span>' +
              '</div>';
    });
    html += '</div><div class="gbppc-total"><span>Total</span><span>' + money(total) + '</span></div>';
    return html;
  }

  function foot(empty) {
    if (empty) {
      return '<a class="gb-btn gb-btn--large gb-btn--outline gb-btn--secondary gb-btn--block" href="' + CATALOG + '">' +
             '<span class="gb-btn__label">Explore gifts</span></a>';
    }
    /* Filled primary, and it is the one place on this page where that
       is right: the checkout IS the thing you came to the cart for. */
    return '<a class="gb-btn gb-btn--large gb-btn--filled gb-btn--primary gb-btn--block" href="' + CHECKOUT + '">' +
           '<span class="gb-btn__label">Checkout</span></a>';
  }

  /* The page's own account state decides whether the cart has
     anything in it: the badge is hidden in the empty account, so the
     drawer reads the same fact rather than keeping a second one. */
  function isEmpty(btn) {
    var badge = btn.querySelector('.gbh-count');
    return !!(badge && badge.hidden);
  }

  /* EVERY CART IN THE BAR, AND BEFORE THE PAGE'S OWN HANDLER.
     live\portal.html carries two carts (the portal bar's, which only
     exists under ?pth=1, and the site header's) and its own listener
     has sent both to the checkout since 26.08. A listener added to
     the same button runs AFTER that one, so preventDefault arrives
     too late and the page is already leaving. The snippet therefore
     listens on the DOCUMENT IN THE CAPTURE PHASE: capture runs from
     the top down, before anything on the target, and it stops the
     click there. Nothing else on either page is touched. */
  function onClick(e) {
    var btn = e.target.closest ? e.target.closest(BTN) : null;
    if (!btn) return;
    var drawer = document.querySelector('gb-drawer');
    if (!drawer && window.customElements && customElements.get('gb-drawer')) {
      drawer = document.createElement('gb-drawer');
      document.body.appendChild(drawer);
    }
    if (!drawer || !drawer.open) return;   /* no organism, no promise: the page keeps whatever it did before */
    e.preventDefault();
    e.stopPropagation();
    var empty = isEmpty(btn);
    drawer.open({ title: 'Your cart', html: body(empty), foot: foot(empty) });
  }

  function wire() {
    document.addEventListener('click', onClick, true);
    [].forEach.call(document.querySelectorAll(BTN), function (b) { b.setAttribute('data-gbppc', '1'); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
}());
