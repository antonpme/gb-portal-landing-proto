/* ============================================================
   gbppl-oro-icons-1 — THE ICON SET
   ------------------------------------------------------------
   A record of the glyphs this house draws, and nothing else. The
   icon itself is CSS (icon.css); this file exists because a set
   with no names is not a set, and because the showcase cannot list
   what nobody has written down.

   WHY A RECORD AND NOT A SPRITE. A sprite needs a fetch, a symbol
   id and a <use>, and it breaks the one thing our glyphs are good
   at: they are inline, so they are currentColor and they cost no
   request. So the set is a plain object of PATH BODIES on the 24
   grid, and every consumer keeps writing inline SVG. What changes
   is that the drawing has ONE home instead of nine.

   NOT ONE PATH BELOW IS NEW. Every d= is copied character for
   character out of the file that draws it today, named in `from`.
   Three chevrons are the single exception and they are copies too:
   the drawer's back arrow rotated, which is why they are marked
   `derived` rather than given a false address.

   WHAT IS DELIBERATELY NOT HERE:
     the four colour Google G (auth.js) — a brand mark, not an icon:
       it has its own palette and currentColor means nothing to it;
     the five device outlines (studio-panel.js) — drawn on a 20 grid
       for one row of one console, and they say «this console», not
       «this system»;
     the wordmark and the home strip's 96px ornament — artwork;
     system/icons/*.svg — Figma exports with #71717A baked into
       every stroke, carried by the portal as <img>. Pictures, not
       icons. Converting them is a wave of its own.

   THE FOUR WEIGHTS. `stroke` on each entry is what the CONSUMER
   draws today, not what the component gives: 1.2, 1.5, 1.8 and 2
   are all in use, nobody chose four, and .gb-icon renders every one
   of them at the house 1.5. The column is kept so the showcase can
   print the census and the migration list can be honest.

       window.GbIcons.html('close', 20)
       -> <span class="gb-icon gb-icon--20">...</span>

   Consumers are NOT converted in this wave (Ton: наброски first).
   ============================================================ */
(function () {
  'use strict';

  /* The grid every glyph is drawn on. One number, said once. */
  var GRID = 24;

  var SET = {
    'arrow-right': {
      body: '<path d="M4 12h15M13 6l6 6-6 6"/>',
      from: 'auth.js, booking.js: the forward glyph of every submit',
      stroke: 1.8
    },
    'cart': {
      body: '<circle cx="9" cy="20" r="1.4"/><circle cx="17.5" cy="20" r="1.4"/>' +
            '<path d="M3 4h2.4l2.2 11.5a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.3L21 8H6.2"/>',
      from: 'header.js: the basket, drawn for the signed in bar',
      stroke: 1.5
    },
    'chevron-down': {
      body: '<path d="M5 9l7 7 7-7"/>',
      from: 'derived: the drawer back arrow turned a quarter',
      stroke: 1.5
    },
    'chevron-left': {
      body: '<path d="M15 5l-7 7 7 7"/>',
      from: 'drawer.js: the step back in the drawer head',
      stroke: 1.5
    },
    'chevron-right': {
      body: '<path d="M9 5l7 7-7 7"/>',
      from: 'derived: the drawer back arrow mirrored',
      stroke: 1.5
    },
    'chevron-up': {
      body: '<path d="M5 15l7-7 7 7"/>',
      from: 'derived: the drawer back arrow turned a quarter',
      stroke: 1.5
    },
    'close': {
      body: '<path d="M6 6l12 12M18 6L6 18"/>',
      from: 'drawer.js: the cross every drawer in the house wears',
      stroke: 1.5
    },
    'eye': {
      body: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/>' +
            '<circle cx="12" cy="12" r="2.8"/>',
      from: 'auth.js: show the password',
      stroke: 1.5
    },
    'filters': {
      body: '<path d="M3.5 6.5h17M7 12h10M10.5 17.5h3"/>',
      from: 'catalog.js: the filters toggle',
      stroke: 1.5
    },
    'mail': {
      body: '<rect x="2.5" y="4.5" width="19" height="15" rx="1.5"/><path d="m3 5.5 9 7 9-7"/>',
      from: 'auth.js: the address step of the sign in flow',
      stroke: 1.2
    },
    'menu': {
      body: '<path d="M3 6h18M3 12h18M3 18h18"/>',
      from: 'header.js: the burger below 1280',
      stroke: 1.5
    },
    'search': {
      body: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      from: 'header.js, auth.js: the magnifier of the bar',
      stroke: 1.5
    },
    'user': {
      body: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
      from: 'header.js: the guest face that opens the sign in drawer',
      stroke: 1.5
    }
  };

  /* One opening tag for the whole set, so a glyph cannot arrive
     with its own stroke, its own cap or its own fill. Weight comes
     from .gb-icon, ink comes from the sentence around it. */
  function svg(name) {
    var it = SET[name];
    if (!it) return '';
    return '<svg viewBox="0 0 ' + GRID + ' ' + GRID + '" fill="none" stroke="currentColor" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + it.body + '</svg>';
  }

  /* The whole thing: box, size and drawing. A glyph that is only
     decoration is aria-hidden, which is the default, because a
     glyph that carries meaning is a different call and should be
     made on purpose by the consumer. */
  function html(name, size) {
    if (!SET[name]) return '';
    var cls = 'gb-icon' + (size ? ' gb-icon--' + size : '');
    return '<span class="' + cls + '" aria-hidden="true">' + svg(name) + '</span>';
  }

  /* Markup written by hand stays markup written by hand; this is
     for the pages that would rather name the glyph than paste it.
       <span data-gb-icon="close" data-gb-icon-size="20"></span> */
  function mount(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-gb-icon]');
    Array.prototype.forEach.call(nodes, function (node) {
      var name = node.getAttribute('data-gb-icon');
      if (!SET[name]) return;
      var size = node.getAttribute('data-gb-icon-size');
      node.className = 'gb-icon' + (size ? ' gb-icon--' + size : '');
      node.setAttribute('aria-hidden', 'true');
      node.innerHTML = svg(name);
    });
  }

  window.GbIcons = {
    grid: GRID,
    names: function () { return Object.keys(SET).sort(); },
    has: function (name) { return !!SET[name]; },
    entry: function (name) { return SET[name] || null; },
    svg: svg,
    html: html,
    mount: mount
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mount(); });
  } else {
    mount();
  }
})();
