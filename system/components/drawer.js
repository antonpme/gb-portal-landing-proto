/* ============================================================
   gbppl-drawer-1 — <gb-drawer>
   ------------------------------------------------------------
   The element behind drawer.css. One instance per page is enough:
   it is a surface, and the page decides what goes on it.

     <gb-drawer id="props"></gb-drawer>

     var d = document.getElementById('props');
     d.open({
       eyebrow: 'Component',        // small caps line, optional
       title:   'Button',           // serif title
       sub:     'filled primary, size L',   // optional
       html:    '<table>...</table>',       // the body
       foot:    'system/components/button.css'  // optional
     });
     d.close();

   Events: gbd:open and gbd:close, both bubbling, so a host can
   follow the drawer without owning it.

   WHAT IT TAKES CARE OF, so no page has to:
     Esc closes it, a click on the scrim closes it, the close
     button closes it.
     Focus moves into the panel on open and returns to the
     element that opened it on close.
     The page behind stops scrolling while it is open.
     Two opens in a row swap the content instead of stacking two
     panels.

   THE FIRST BRICK OF DEV MODE (Ton, 25.08): the showcase opens
   this drawer on any specimen a developer clicks and fills it
   with the properties measured off that very element. The drawer
   itself knows nothing about that, which is the point.
   ============================================================ */
(function () {
  'use strict';

  var CLOSE_MS = 350; /* --mo-medium-out; kept in step with drawer.css */

  var GLYPH_CLOSE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
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

    var head = el('div', 'gbd-head');
    host._titles = el('div', 'gbd-titles');
    host._eyebrow = el('span', 'gbd-eyebrow');
    host._title = el('h2', 'gbd-title');
    host._sub = el('p', 'gbd-sub');
    host._titles.appendChild(host._eyebrow);
    host._titles.appendChild(host._title);
    host._titles.appendChild(host._sub);

    host._close = el('button', 'gb-btn gb-btn--s gb-btn--ghost gb-btn--secondary gbd-close');
    host._close.type = 'button';
    host._close.setAttribute('aria-label', 'Close');
    host._close.innerHTML = '<span class="gb-btn__icon" aria-hidden="true">' + GLYPH_CLOSE + '</span>';

    head.appendChild(host._titles);
    head.appendChild(host._close);

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
    host._close.addEventListener('click', function () { host.close(); });

    host._onKey = function (e) {
      if (e.key === 'Escape' && host._open) { e.preventDefault(); host.close(); }
    };
  }

  function openDrawer(opts) {
    var host = this;
    build(host);
    opts = opts || {};

    clearTimeout(host._closeTimer);
    host._returnTo = document.activeElement;

    host._eyebrow.textContent = opts.eyebrow || '';
    host._eyebrow.hidden = !opts.eyebrow;
    host._title.textContent = opts.title || '';
    host._sub.innerHTML = opts.sub || '';
    host._sub.hidden = !opts.sub;
    host._body.innerHTML = opts.html || '';
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

    if (host._returnTo && host._returnTo.focus) host._returnTo.focus({ preventScroll: true });
    host.dispatchEvent(new CustomEvent('gbd:close', { bubbles: true }));
  }

  /* Registration in the shape the other organisms use. */
  class GbDrawer extends HTMLElement {
    connectedCallback() { build(this); }
    open(opts) { openDrawer.call(this, opts); }
    close() { closeDrawer.call(this); }
  }
  if (!customElements.get('gb-drawer')) {
    customElements.define('gb-drawer', GbDrawer);
  }
})();
