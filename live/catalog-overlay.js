/* ============================================================
   gbppl-catalog-overlay-1 — THE CATALOGUE COMES TO THE PAGE
   ------------------------------------------------------------
   Ton, 10.09, twice: Explore gifts must open the catalogue ON THE
   DASHBOARD, the way it opens on My Gifts. Sending the person to
   live\portal.html was a page change dressed as a door.

   WHAT THIS IS. The Tiffany showcase of live\portal.html, ported as
   a shared page snippet: the same markup shape (overlay > backdrop +
   panel > iframe), the same vendored v1 catalogue at ?embed=1, and
   the same measured choreography, value for value, including the
   curve that was sampled frame by frame on 19.08 and must not drift:

     --tf-curve   cubic-bezier(.37,0,.18,1)   the journey
     --tf-travel  1200ms                       its length (T 19.08)
     --tf-dim     320ms                        the backdrop
     --tf-settle  140ms                        veil -> object
     --tf-reveal-at 480ms / --tf-reveal 880ms  the content's cue
     --tf-exit 640ms, lag 140ms, out 300ms     the retreat
     panel 95% pinned right, Zinc 50, radius on the front corners
     backdrop rgba(24,24,27,.4)  (NO TOKEN, the page's own pair)

   WHAT IT IS NOT: a second implementation. live\portal.html keeps
   its own copy for now, because that page's overlay is wired into
   its hero buttons, its priming and its variants, and rewiring a
   showcase-approved door under a deadline is how approved things
   break. The honest end of this story is one owner, and it is in
   the report as the next wave: portal.html adopts this file and
   deletes its block.

   HOW A PAGE TURNS IT ON:
     <script src="catalog-overlay.js"
             data-open="[data-gbppd-catalog]"   the doors
             data-src="catalog/index.html?embed=1"></script>
   Every door primes the frame on hover or focus, and the first open
   pays for the load exactly as the original does.
   ============================================================ */
(function () {
  'use strict';

  var self = document.currentScript;
  if (!self) return;

  var DOORS = self.getAttribute('data-open') || '[data-gbppd-catalog]';
  var SRC   = self.getAttribute('data-src') || 'catalog/index.html?embed=1';

  var TRAVEL = 1200, SETTLE_AT = 1200, REVEAL_AT = 480, EXIT = 640 + 140, GRACE = 60;

  var CSS =
  '.gbppd-cat{--tf-curve:cubic-bezier(.37,0,.18,1);--tf-exit-curve:cubic-bezier(.4,0,1,1);' +
  '--tf-dim:320ms;--tf-travel:1200ms;--tf-settle:140ms;--tf-reveal:880ms;--tf-out:300ms;' +
  '--tf-exit-lag:140ms;--tf-exit:640ms;--tf-dim-out-delay:300ms;' +
  'position:fixed;inset:0;z-index:59;display:none}' +   /* 59: over the page and the studio's inspect layer, under the console 60 and the drawer 80 */
  '.gbppd-cat.open,.gbppd-cat.closing{display:block}' +
  '.gbppd-cat.closing{pointer-events:none}' +
  '.gbppd-cat__scrim{position:absolute;inset:0;background:rgba(24,24,27,.4);opacity:0;' +
  'transition:opacity var(--tf-dim) ease-out}' +
  '.gbppd-cat.open .gbppd-cat__scrim{opacity:1}' +
  '.gbppd-cat.closing .gbppd-cat__scrim{transition:opacity var(--tf-dim) ease-out var(--tf-dim-out-delay)}' +
  '.gbppd-cat__panel{position:absolute;top:0;right:0;height:100%;width:95%;background:var(--zinc-50);' +
  'border-left:1px solid var(--zinc-200);border-radius:var(--radius) 0 0 var(--radius);' +
  'transform:translateX(100%);transition:transform var(--tf-travel) var(--tf-curve);' +
  'will-change:transform;display:flex;flex-direction:column;overflow:hidden}' +
  '.gbppd-cat.open .gbppd-cat__panel{transform:translateX(0)}' +
  '.gbppd-cat.closing .gbppd-cat__panel{transform:translateX(100%);' +
  'transition:transform var(--tf-exit) var(--tf-exit-curve) var(--tf-exit-lag)}' +
  '.gbppd-cat__frame{flex:1;width:100%;border:0;display:block;background:var(--zinc-50);' +
  'opacity:0;transform:scale(.994);transition:opacity var(--tf-reveal) ease-out,transform var(--tf-reveal) ease-out}' +
  '.gbppd-cat.revealed .gbppd-cat__frame{opacity:1;transform:none}' +
  '.gbppd-cat.closing .gbppd-cat__frame{opacity:0;transform:none;transition:opacity var(--tf-out) ease-in}' +
  'body.gbppd-cat-locked{overflow:hidden;padding-right:var(--gbppd-sbw,0px)}';

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.className = 'gbppd-cat';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<div class="gbppd-cat__scrim" data-gbppd-cat-close></div>' +
    '<div class="gbppd-cat__panel" role="dialog" aria-modal="true" aria-label="Explore Gifts">' +
    '<iframe class="gbppd-cat__frame" title="Gift catalog" data-src="' + SRC + '"></iframe></div>';

  var frame = overlay.querySelector('.gbppd-cat__frame');
  var loaded = false, openedAt = 0, tSettle, tReveal, tClose;

  function mount() {
    if (!overlay.parentNode) document.body.appendChild(overlay);
  }
  /* Reaching for the door is the asking: the frame is fetched on
     hover or focus, once, and the first open pays for nothing it can
     avoid (the original's primeCatalog). */
  function prime() {
    mount();
    if (!frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
  }
  frame.addEventListener('load', function () {
    loaded = true;
    if (overlay.classList.contains('open')) reveal();
  });
  function reveal() {
    clearTimeout(tReveal);
    var left = REVEAL_AT - (Date.now() - openedAt);
    tReveal = setTimeout(function () { overlay.classList.add('revealed'); }, Math.max(left, GRACE));
  }

  function open() {
    mount();
    var cold = !frame.getAttribute('src');
    document.documentElement.style.setProperty('--gbppd-sbw',
      (window.innerWidth - document.documentElement.clientWidth) + 'px');
    document.body.classList.add('gbppd-cat-locked');
    clearTimeout(tClose);
    overlay.classList.remove('closing');
    overlay.style.display = 'block';
    /* Two-phase enter: displayed in the hidden pose first, opened one
       reflow later, so the travel actually runs. */
    void overlay.offsetWidth;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    openedAt = Date.now();
    clearTimeout(tSettle);
    tSettle = setTimeout(function () { overlay.classList.add('settled'); }, SETTLE_AT);
    if (cold) requestAnimationFrame(prime);
    if (loaded) reveal();
  }

  function close() {
    if (!overlay.classList.contains('open')) return;
    clearTimeout(tSettle); clearTimeout(tReveal);
    overlay.classList.remove('open', 'settled', 'revealed');
    overlay.classList.add('closing');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gbppd-cat-locked');
    tClose = setTimeout(function () {
      overlay.classList.remove('closing');
      overlay.style.display = '';
    }, EXIT);
  }

  /* The close control lives INSIDE the framed catalogue (v1 embed
     mode) and reports back the way the original taught it to. */
  window.addEventListener('message', function (e) {
    if (e && e.data && e.data.type === 'gb-close-catalog') close();
  });
  document.addEventListener('click', function (e) {
    var door = e.target.closest ? e.target.closest(DOORS) : null;
    if (door) { e.preventDefault(); open(); return; }
    if (e.target.closest && e.target.closest('[data-gbppd-cat-close]')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  ['pointerenter', 'focus'].forEach(function (ev) {
    document.addEventListener(ev, function (e) {
      if (e.target.closest && e.target.closest(DOORS)) prime();
    }, true);
  });

  window.GbCatalogOverlay = { open: open, close: close, prime: prime };
}());
