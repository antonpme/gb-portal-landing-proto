/* ============================================================================
 * oro-header-bridge.js — the two glyphs that came with the bundle's header,
 * carried over into the system bar.
 * ----------------------------------------------------------------------------
 * gbppl-catalog-header-1 (2026-08-26)
 *
 * Ton, 2026-08-26: «когда мы заходим на Gifts, у нас версия Live висит с
 * хедером от версии Sandbox: ненастоящий хедер». The bar of the vendored v1
 * build is hidden (oro-ui-override.css) and <gb-site-header> stands in its
 * place. Two of the things it hid were not decoration:
 *
 *   ACCOUNT   .account-control  — the person glyph. Signed out it opens the
 *             build's account drawer (sign in, then either Open Portal or a
 *             toast that says where the portal now lives); signed in it wears
 *             the presence dot and opens a two line menu, Open Portal and
 *             Sign out.
 *   SEARCH    .icon-button[aria-label="Search gifts"] — opens the build's
 *             search overlay over the catalogue.
 *
 * Both are the ONLY doors to what they open. Grepped in the source
 * (design/ai-consierge/src/App.tsx, 2026-08-26): setAccountDrawerOpen(true)
 * is called from one place and setSearchOpen(true) from one place, and both
 * places are that header. Hide it and the prototype loses its sign in and its
 * search; the mobile nav it also carries has no account or search item.
 *
 * WHY THE NODES MOVE, AND NOT THE CLICKS. A bridge that forwarded a click
 * from our glyph to a hidden one would work signed OUT and break signed IN:
 * the account menu renders next to the button it hangs off, and that button
 * would still be inside a display:none header. So the two controls are moved
 * bodily into .gbh-actions -- real nodes, real React handlers, real menu,
 * real dot, nothing reimplemented.
 *
 * WHY THAT IS SAFE. React patches children in place; it only reaches for a
 * node's parent when the CHILD LIST of that parent changes. The list here is
 * fixed -- .header-actions renders its four children unconditionally on every
 * pass, and .account-control travels whole, so everything conditional inside
 * it (the dot, the menu) is inserted relative to nodes that came along. The
 * Header itself never unmounts.
 *
 * AND WHY THE CLICKS ARE HANDED OVER BY NAME. React 18 does not put a listener
 * on every button; it listens once on the root CONTAINER and works the handler
 * out from the path the event took. A control carried out of #root keeps its
 * look and loses its click -- measured on the first pass of this wave: the
 * account drawer did not open. Standing the bar inside #root instead was the
 * obvious answer and is not available either: createRoot() empties its
 * container on the first render, and the bar went with it (second measurement,
 * same afternoon). So the bar stays outside and this file walks the last step
 * by hand -- one delegated listener on .gbh-actions that reads the React props
 * React itself left on the node and calls the onClick it finds there. It is
 * delegated rather than bound so that the menu the account button opens, whose
 * own two buttons are just as far out of earshot, is carried by the same rule.
 *
 * THIS IS A BRIDGE, NOT A DESIGN. It exists because the fix belongs in the
 * build and the build is not being rebuilt this wave. When ai-consierge is
 * next built, the honest shape is a mode flag beside embedMode that renders
 * no header at all and lifts the account and search entry points out of it;
 * then this file and the two display:none rules next door come out together.
 *
 * WHAT IS NOT BRIDGED, and is a real loss, written down rather than papered
 * over: the build's burger. Below 900 our bar drops its nav and its buttons
 * and offers no menu in their place -- which is what live/index.html and
 * every other page of the studio already does, so the catalogue is now no
 * worse than its neighbours rather than better than them alone. The mobile
 * navigation is a system-wide gap and belongs to the header component.
 * ========================================================================== */
(function () {
  'use strict';

  var DEADLINE = 10000;   /* the bundle is a module script; give it room */

  function actions() { return document.querySelector('gb-site-header .gbh-actions'); }
  function bundleAccount() { return document.querySelector('#root .site-header .account-control'); }
  function bundleSearch() {
    return document.querySelector('#root .site-header .icon-button[aria-label="Search gifts"]');
  }

  /* React leaves the live props of a node on the node, under a key it salts
     per build. Read fresh on every click: the props object is replaced on
     every render, and a captured one goes stale the moment state moves. */
  function reactOnClick(node) {
    if (!node || node.nodeType !== 1) return null;
    for (var k in node) {
      if (k.lastIndexOf('__reactProps$', 0) === 0) {
        var props = node[k];
        if (props && typeof props.onClick === 'function') return props.onClick;
        return null;
      }
    }
    return null;
  }

  /* One listener for everything the bridge carries, now and later: walk up
     from whatever was pressed until a node the build owns turns up, and hand
     it its own handler. Our own buttons carry no React props, so the walk
     falls through them and the browser does what it always did. */
  function relay(slot) {
    if (slot.__gbhRelay) return;
    slot.__gbhRelay = true;
    slot.addEventListener('click', function (event) {
      var node = event.target;
      while (node && node !== slot) {
        var onClick = reactOnClick(node);
        if (onClick) { onClick(event); return; }
        node = node.parentNode;
      }
    });
  }

  function adopt(el) {
    /* Our ink and our hover, the bundle's behaviour. Both classes describe the
       same 44px circle; header.css loads after the build's css, so where the
       two disagree (glyph colour, hover wash) ours is the one that lands. */
    el.classList.add('gbh-icon-button');
  }

  function bridge() {
    var slot = actions();
    var account = bundleAccount();
    var search = bundleSearch();
    if (!slot || !account || !search) return false;

    /* Account goes before the cart: the two utilities of the site bar sit in
       the corner, and the person glyph reads first of the pair.

       gbppl-header-cart-1 (28.08): THERE MAY BE NO CART. Ton: «Корзина должна
       быть видна только авторизованным пользователям. Пока ты не авторизован,
       она не отображается», so <gb-site-header> puts the cart in and takes it
       out with sessionStorage 'gbppl-signed-in'. A guest bar has no cart node
       to aim at, and insertBefore(account, null) would APPEND — landing the
       person glyph after the search and flipping the pair. So the anchor falls
       back to our own search glyph, which is where the cart would have stood.
       Nothing here has to answer to the flag afterwards: the build carries no
       cart of its own (grepped, 28.08 — the only "cart" in index-*.js is prose
       inside the customizer), and when the header adds the cart back it aims
       at the search too, so the corner reads account -> cart -> search either
       way round. */
    var ourSearch = slot.querySelector('button.gbh-icon-button[aria-label="Search gifts"]');
    var cart = slot.querySelector('.gbh-icon-button[aria-label^="Cart"]');
    slot.insertBefore(account, cart || ourSearch);
    adopt(account.querySelector('.icon-button'));

    /* Search REPLACES ours. The component's search glyph is a dead button of
       the prototype (no handler, nowhere to go); the build's opens a working
       overlay over this very catalogue. One glyph, the live one. */
    if (ourSearch) slot.replaceChild(search, ourSearch);
    else slot.appendChild(search);
    adopt(search);

    relay(slot);
    document.documentElement.setAttribute('data-gbh-bridge', 'on');
    return true;
  }

  function start() {
    if (bridge()) return;
    var started = Date.now();
    var observer = new MutationObserver(function () {
      if (bridge() || Date.now() - started > DEADLINE) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
