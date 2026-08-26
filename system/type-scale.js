/* ============================================================
   gbppl-inspect-1 — THE TYPE RECORD, ONE COPY
   ------------------------------------------------------------
   The 47 roles of the type scale, transcribed row for row out of
   studio\system\TYPE-SCALE.md, which was itself read off the
   running product with an instrument.

   WHY THE RECORD LEFT THE SHOWCASE. Until 26.08 this array lived
   inside system\oro\typography.html and only that page could read
   it. The Inspect mode names the type role under the pointer on
   ANY page of the prototype, and a second copy of 47 rows would
   have been two records the day one of them was corrected
   (Ton-8: one source). So the record moved out to a file both
   read, the way system\sandbox-registry.js is one record for the
   panel, the shelf page and the hub.

   Connect it BEFORE anything that reads it:

     <script src="../system/type-scale.js"></script>

   THE SHAPE.
     roles: [{ g, id, name, fam, prov, cls?, kind?, size?, note?,
               sample, rungs: [{ w, s, f, lh, ls, tt }] }]
       w  the window width the rung starts at
       s  size in px, f weight, lh line height as recorded,
       ls tracking, tt case
       The rung in force is the last one whose w is at or below
       the window.
     groups: the seven display groups, largest first. A READING
       AID, not a taxonomy.
     prov: the four provenances a number can carry.
     rungFor(role, width), ladderText(role), byId
     match(cs, width): the reading the Inspect mode needs, and the
       only thing this file gained on the way out of the showcase.
       Given a computed style it names the role that line is
       standing in, or null when the record has nothing at that
       size and weight. It never guesses: an unnamed line is
       reported as unnamed, the same way the drawer says NO TOKEN
       out loud rather than inventing provenance.
     matchAll(cs, width): every role the record holds at that
       reading, best first. The scale has real overlaps (four
       roles sit at 14 regular in the text face) and the drawer
       prints them all rather than pretending the first is the
       only one.
   ============================================================ */
(function () {
  'use strict';

  /* Samples are neutral on purpose: the page is about the shape of
     the type, and a line lifted off a product screen would drag its
     own context in with it (Ton-11). No pangram either: the
     research is unanimous that a pangram belongs on a family
     specimen and never in a ladder of roles. */
  var S_TITLE = 'Handled with care';
  var S_BODY = 'A line of copy set at this rung, long enough to turn and show the measure.';
  var S_LABEL = 'Section label';

  /* ---------- the seven groups, largest first ---------- */
  var GROUPS = [
    { id: 'display', name: 'Display', line: 'The serif where a page is being titled. One display level per screen, and the level under it is never another serif.' },
    { id: 'headline', name: 'Headline', line: 'The serif where a block, a column or a card is being titled rather than a whole page.' },
    { id: 'title', name: 'Title', line: 'Headings the product sets in the text family: cards, accordions, choices, and the one section heading it sets in the light sans.' },
    { id: 'body', name: 'Body', line: 'The reading roles. Content sits at 16, secondary content at 14 or 15, and nothing in content goes under 14.' },
    { id: 'label', name: 'Label', line: 'Captions, chips, numerals and navigation: short strings that name a thing rather than being read.' },
    { id: 'button', name: 'Button', line: 'The type a button carries. The outer element sets a size the label span then overrides, so both are recorded.' },
    { id: 'badge', name: 'Badge', line: 'The one mark allowed under the floor, because a badge is counted rather than read.' }
  ];

  /* ---------- the two families ---------- */
  var FACES = [
    { id: 'serif', name: 'Noto Serif', fam: 'serif', token: '--font-serif',
      role: 'The title voice. Page titles, section titles and the numerals that behave as titles. Nothing else in the product wears it.',
      big: 'Handled with care',
      weights: [{ w: 300, n: 'Light' }, { w: 400, n: 'Regular' }, { w: 500, n: 'Medium' }, { w: 600, n: 'Semibold' }],
      stack: 'Noto Serif, Georgia, serif' },
    { id: 'sans', name: 'Inter', fam: 'sans', token: '--font-sans',
      role: 'Everything else the product says: body, leads, captions, labels, fields, tables and buttons.',
      big: 'Everything else it says',
      weights: [{ w: 300, n: 'Light' }, { w: 400, n: 'Regular' }, { w: 500, n: 'Medium' }, { w: 600, n: 'Semibold' }, { w: 700, n: 'Bold' }],
      stack: 'Inter, system stack' }
  ];
  var FACE_SIZES = [12, 14, 16, 20, 24, 32, 48, 64];
  var ALPHA = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789 & $ % ( ) , . : ; / +'];

  var ROLES = [
    /* ---------- display: the serif titling a page ---------- */
    { g: 'display', id: 'h1-hero', name: 'H1 hero', fam: 'serif', prov: 'verified', sample: S_TITLE,
      rungs: [{ w: 0, s: 36, f: 400, lh: '54px', ls: '0.9px', tt: 'none' },
              { w: 1280, s: 48, f: 400, lh: '72px', ls: '1.2px', tt: 'none' },
              { w: 2000, s: 52, f: 400, lh: '78px', ls: '1.3px', tt: 'none' }] },
    { g: 'display', id: 'h2-section', name: 'H2 section', fam: 'serif', prov: 'figma', sample: S_TITLE,
      note: 'Tracking recorded as 0.5 per cent, line height not exported',
      rungs: [{ w: 0, s: 40, f: 400, lh: 'normal', ls: '0.005em', tt: 'none' }] },
    { g: 'display', id: 'h1-page', name: 'H1 page title', fam: 'serif', prov: 'verified', sample: S_TITLE,
      rungs: [{ w: 0, s: 28, f: 300, lh: '35px', ls: '-0.4px', tt: 'none' },
              { w: 1280, s: 36, f: 300, lh: '45px', ls: '-0.4px', tt: 'none' },
              { w: 2000, s: 40, f: 300, lh: '50px', ls: '-0.4px', tt: 'none' }] },
    { g: 'display', id: 'h3-block', name: 'H3 block', fam: 'serif', prov: 'figma', sample: S_TITLE,
      rungs: [{ w: 0, s: 32, f: 400, lh: 'normal', ls: '1px', tt: 'none' }] },

    /* ---------- headline: the serif titling a block ---------- */
    { g: 'headline', id: 'h1-panel', name: 'H1 panel title', fam: 'serif', prov: 'recorded', sample: S_TITLE,
      rungs: [{ w: 0, s: 18, f: 300, lh: 'normal', ls: '-0.4px', tt: 'none' },
              { w: 768, s: 26, f: 300, lh: 'normal', ls: '-0.4px', tt: 'none' },
              { w: 1280, s: 32, f: 300, lh: '40px', ls: '-0.4px', tt: 'none' }] },
    { g: 'headline', id: 'feature-title', name: 'Feature title', fam: 'serif', prov: 'verified', sample: S_TITLE,
      rungs: [{ w: 0, s: 16, f: 500, lh: '24px', ls: '1px', tt: 'none' },
              { w: 768, s: 18, f: 500, lh: '27px', ls: '1px', tt: 'none' },
              { w: 1280, s: 22, f: 500, lh: '33px', ls: '1px', tt: 'none' },
              { w: 2000, s: 32, f: 500, lh: '48px', ls: '1px', tt: 'none' }] },
    { g: 'headline', id: 'h4-600', name: 'H4 semibold', fam: 'serif', prov: 'figma', sample: S_TITLE,
      rungs: [{ w: 0, s: 22, f: 600, lh: 'normal', ls: '1px', tt: 'none' }] },
    { g: 'headline', id: 'h4-400', name: 'H4 regular', fam: 'serif', prov: 'figma', sample: S_TITLE,
      rungs: [{ w: 0, s: 22, f: 400, lh: 'normal', ls: '1px', tt: 'none' }] },
    { g: 'headline', id: 'column-heading', name: 'Column heading', fam: 'serif', prov: 'verified', sample: S_TITLE,
      rungs: [{ w: 0, s: 18, f: 400, lh: '26.1px', ls: '0.2px', tt: 'none' },
              { w: 768, s: 22, f: 400, lh: '31.9px', ls: '0.2px', tt: 'none' }] },

    /* ---------- title: headings in the text family ---------- */
    { g: 'title', id: 'section-heading-light', name: 'Section heading, light sans', fam: 'sans', prov: 'verified', sample: S_TITLE,
      note: 'A heading that is not a serif. Recorded because the product does it, and it is the one recorded conflict with the title rule',
      rungs: [{ w: 0, s: 18, f: 300, lh: '22.5px', ls: 'normal', tt: 'none' },
              { w: 1280, s: 20, f: 300, lh: '25px', ls: 'normal', tt: 'none' },
              { w: 2000, s: 24, f: 300, lh: '30px', ls: 'normal', tt: 'none' }] },
    { g: 'title', id: 'card-title', name: 'Card title', fam: 'sans', prov: 'recorded', sample: 'A gift for the team',
      rungs: [{ w: 0, s: 18, f: 500, lh: '27px', ls: 'normal', tt: 'none' },
              { w: 1280, s: 20, f: 500, lh: '30px', ls: 'normal', tt: 'none' }] },
    { g: 'title', id: 'choice-label', name: 'Choice card label', fam: 'sans', prov: 'verified', sample: 'Standard',
      rungs: [{ w: 0, s: 14, f: 700, lh: '21px', ls: '1.5px', tt: 'none' },
              { w: 1280, s: 16, f: 700, lh: '24px', ls: '1.5px', tt: 'none' },
              { w: 2000, s: 18, f: 700, lh: '27px', ls: '1.5px', tt: 'none' }] },
    { g: 'title', id: 'accordion-heading', name: 'Accordion heading', fam: 'sans', prov: 'verified', sample: S_TITLE,
      rungs: [{ w: 0, s: 13, f: 600, lh: '19.5px', ls: '0.2px', tt: 'none' },
              { w: 1280, s: 16, f: 600, lh: '24px', ls: '0.2px', tt: 'none' }] },

    /* ---------- body: the reading roles ---------- */
    { g: 'body', id: 'lead-400', name: 'Lead regular', fam: 'sans', prov: 'figma', sample: S_BODY,
      rungs: [{ w: 0, s: 22, f: 400, lh: 'normal', ls: '2px', tt: 'none' }] },
    { g: 'body', id: 'lead-300', name: 'Lead light', fam: 'sans', prov: 'figma', sample: S_BODY,
      rungs: [{ w: 0, s: 22, f: 300, lh: 'normal', ls: '2px', tt: 'none' }] },
    { g: 'body', id: 'body-base', name: 'Body base', fam: 'sans', prov: 'verified', sample: S_BODY,
      note: 'The design file gives 0.3px of tracking here and the instrument reads none. The instrument wins',
      rungs: [{ w: 0, s: 16, f: 400, lh: '24px', ls: 'normal', tt: 'none' }] },
    { g: 'body', id: 'body-600', name: 'Body semibold', fam: 'sans', prov: 'figma', sample: S_BODY,
      rungs: [{ w: 0, s: 16, f: 600, lh: 'normal', ls: '0.3px', tt: 'none' }] },
    { g: 'body', id: 'body-300', name: 'Body light', fam: 'sans', prov: 'figma', sample: S_BODY,
      rungs: [{ w: 0, s: 16, f: 300, lh: 'normal', ls: '0.3px', tt: 'none' }] },
    { g: 'body', id: 'feature-body', name: 'Feature body', fam: 'sans', prov: 'verified', sample: S_BODY,
      rungs: [{ w: 0, s: 16, f: 400, lh: '24px', ls: 'normal', tt: 'none' }] },
    { g: 'body', id: 'small-600', name: 'Small semibold', fam: 'sans', prov: 'figma', sample: S_BODY,
      rungs: [{ w: 0, s: 14, f: 600, lh: 'normal', ls: '0.5px', tt: 'none' }] },
    { g: 'body', id: 'small-400', name: 'Small regular', fam: 'sans', prov: 'figma', sample: S_BODY,
      rungs: [{ w: 0, s: 14, f: 400, lh: 'normal', ls: '0.5px', tt: 'none' }] },
    { g: 'body', id: 'small-300', name: 'Small light', fam: 'sans', prov: 'figma', sample: S_BODY,
      rungs: [{ w: 0, s: 14, f: 300, lh: 'normal', ls: '0.5px', tt: 'none' }] },
    { g: 'body', id: 'link-small', name: 'Link, small', fam: 'sans', prov: 'verified', sample: 'A link in a list of links',
      rungs: [{ w: 0, s: 14, f: 300, lh: '19.88px', ls: '0.2px', tt: 'none' }] },
    { g: 'body', id: 'breadcrumb', name: 'Breadcrumb', fam: 'sans', prov: 'recorded', sample: 'Home / Gifts',
      rungs: [{ w: 0, s: 14, f: 400, lh: '14px', ls: '0.2px', tt: 'none' }] },
    { g: 'body', id: 'menu-link', name: 'Menu link', fam: 'sans', prov: 'recorded', sample: 'All gifts',
      note: 'Line height and tracking were not taken in that pass',
      rungs: [{ w: 0, s: 14, f: 400, lh: 'normal', ls: 'normal', tt: 'none' }] },
    { g: 'body', id: 'footnote-600', name: 'Footnote semibold', fam: 'sans', prov: 'figma', sample: S_BODY,
      rungs: [{ w: 0, s: 12, f: 600, lh: 'normal', ls: '0.5px', tt: 'none' }] },
    { g: 'body', id: 'footnote-400', name: 'Footnote regular', fam: 'sans', prov: 'figma', sample: S_BODY,
      rungs: [{ w: 0, s: 12, f: 400, lh: 'normal', ls: '0.5px', tt: 'none' }] },
    { g: 'body', id: 'footnote-300', name: 'Footnote light', fam: 'sans', prov: 'figma', sample: S_BODY,
      rungs: [{ w: 0, s: 12, f: 300, lh: 'normal', ls: '0.5px', tt: 'none' }] },
    { g: 'body', id: 'legal-line', name: 'Legal line', fam: 'sans', prov: 'verified', sample: 'All rights reserved',
      note: 'Under the floor, and recorded rather than recommended',
      rungs: [{ w: 0, s: 11, f: 400, lh: '24px', ls: 'normal', tt: 'none' }] },

    /* ---------- label ---------- */
    { g: 'label', id: 'price', name: 'Price', fam: 'sans', prov: 'verified', sample: '$1,250',
      rungs: [{ w: 0, s: 14, f: 300, lh: '21px', ls: '2px', tt: 'none' },
              { w: 1280, s: 18, f: 300, lh: '27px', ls: '2px', tt: 'none' },
              { w: 2000, s: 20, f: 300, lh: '30px', ls: '2px', tt: 'none' }] },
    { g: 'label', id: 'nav-item', name: 'Navigation item', fam: 'sans', prov: 'verified', sample: 'Explore',
      rungs: [{ w: 0, s: 14, f: 500, lh: '21px', ls: '0.5px', tt: 'uppercase' },
              { w: 1280, s: 16, f: 500, lh: '24px', ls: '0.5px', tt: 'uppercase' }] },
    { g: 'label', id: 'price-badge', name: 'Price badge', fam: 'sans', prov: 'recorded', sample: '$120',
      rungs: [{ w: 0, s: 12, f: 400, lh: '18px', ls: '0.5px', tt: 'none' },
              { w: 1280, s: 14, f: 400, lh: '21px', ls: '0.5px', tt: 'none' }] },
    { g: 'label', id: 'eyebrow', name: 'Eyebrow', fam: 'sans', prov: 'declared', kind: 'eyebrow',
      cls: '.gb-eyebrow', sample: S_LABEL,
      note: 'Role 44, named on 19 August. The only small caps caption in the system, and the only role in this group with a class',
      rungs: [{ w: 0, s: 12, f: 600, lh: 'normal', ls: '0.12em', tt: 'uppercase' }] },
    { g: 'label', id: 'menu-column-heading', name: 'Menu column heading', fam: 'sans', prov: 'recorded', sample: S_LABEL,
      note: 'Tracking recorded as wider, in pixels never taken. Rendered here at the eyebrow tracking',
      rungs: [{ w: 0, s: 12, f: 600, lh: 'normal', ls: '0.12em', tt: 'uppercase' }] },
    { g: 'label', id: 'chip', name: 'Chip', fam: 'sans', prov: 'recorded', sample: 'New',
      rungs: [{ w: 0, s: 12, f: 500, lh: 'normal', ls: '0.5px', tt: 'none' }] },

    /* ---------- button ---------- */
    { g: 'button', id: 'btn-outer-xl', name: 'Button outer, semibold', fam: 'sans', prov: 'verified',
      kind: 'btnouter', size: 'xl', cls: '.gb-btn--xl', sample: 'Continue',
      note: 'The same slot on the committing ladder, and the reason the outer element cannot be called one role',
      rungs: [{ w: 0, s: 20, f: 600, lh: 'normal', ls: '-0.5px', tt: 'uppercase' },
              { w: 1280, s: 24, f: 600, lh: 'normal', ls: '-0.6px', tt: 'uppercase' }] },
    { g: 'button', id: 'underline-cta', name: 'Underline CTA', fam: 'sans', prov: 'verified', sample: 'Discover more',
      rungs: [{ w: 0, s: 18, f: 400, lh: '18px', ls: '1px', tt: 'uppercase' },
              { w: 1280, s: 20, f: 400, lh: '20px', ls: '1px', tt: 'uppercase' }] },
    { g: 'button', id: 'btn-outer-s', name: 'Button outer, regular', fam: 'sans', prov: 'verified',
      kind: 'btnouter', size: 's', cls: '.gb-btn--s', sample: 'Continue',
      note: 'The type of the button element itself, which the label span then overrides. Measured on the button, not the label',
      rungs: [{ w: 0, s: 14, f: 400, lh: 'normal', ls: '-0.35px', tt: 'uppercase' },
              { w: 1280, s: 16, f: 400, lh: 'normal', ls: '-0.4px', tt: 'uppercase' }] },
    { g: 'button', id: 'btn-label-xl', name: 'Button label XL', fam: 'sans', prov: 'verified',
      kind: 'btnlabel', size: 'xl', cls: '.gb-btn--xl .gb-btn__label', sample: 'Continue',
      rungs: [{ w: 0, s: 14, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' },
              { w: 768, s: 15, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' },
              { w: 2000, s: 16, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' }] },
    { g: 'button', id: 'btn-label-l', name: 'Button label L', fam: 'sans', prov: 'verified',
      kind: 'btnlabel', size: 'l', cls: '.gb-btn--l .gb-btn__label', sample: 'Continue',
      rungs: [{ w: 0, s: 14, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' },
              { w: 640, s: 15, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' },
              { w: 2000, s: 16, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' }] },
    { g: 'button', id: 'btn-figma-l', name: 'Button style, large', fam: 'sans', prov: 'figma', sample: 'Continue',
      rungs: [{ w: 0, s: 16, f: 600, lh: 'normal', ls: '1.5px', tt: 'uppercase' }] },
    { g: 'button', id: 'btn-label-m', name: 'Button label M', fam: 'sans', prov: 'declared',
      kind: 'btnlabel', size: 'm', cls: '.gb-btn--m .gb-btn__label', sample: 'Continue',
      note: 'The interpolated rung. Every number is a live number borrowed from the ladder above or below it',
      rungs: [{ w: 0, s: 12, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' },
              { w: 1280, s: 14, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' },
              { w: 2000, s: 15, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' }] },
    { g: 'button', id: 'btn-figma-m', name: 'Button style, medium', fam: 'sans', prov: 'figma', sample: 'Continue',
      rungs: [{ w: 0, s: 14, f: 600, lh: 'normal', ls: '1.3px', tt: 'uppercase' }] },
    { g: 'button', id: 'outlined-label', name: 'Outlined button label', fam: 'sans', prov: 'recorded', sample: 'Get help',
      rungs: [{ w: 0, s: 12, f: 400, lh: 'normal', ls: '-0.35px', tt: 'uppercase' },
              { w: 1280, s: 14, f: 400, lh: 'normal', ls: '-0.35px', tt: 'uppercase' }] },
    { g: 'button', id: 'btn-label-s', name: 'Button label S', fam: 'sans', prov: 'verified',
      kind: 'btnlabel', size: 's', cls: '.gb-btn--s .gb-btn__label', sample: 'Continue',
      rungs: [{ w: 0, s: 11, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' },
              { w: 2000, s: 12, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' }] },
    { g: 'button', id: 'btn-figma-s', name: 'Button style, small', fam: 'sans', prov: 'figma', sample: 'Continue',
      rungs: [{ w: 0, s: 12, f: 600, lh: 'normal', ls: '1px', tt: 'uppercase' }] },

    /* ---------- badge ---------- */
    { g: 'badge', id: 'count-badge', name: 'Count badge', fam: 'sans', prov: 'verified',
      kind: 'badge', cls: '.gbh-count', sample: '3',
      rungs: [{ w: 0, s: 10, f: 400, lh: 'normal', ls: 'normal', tt: 'none' }] }
  ];

  var PROV = {
    verified: { word: 'Verified live', cls: 'gbdoc-flag' },
    recorded: { word: 'Recorded live', cls: 'gbdoc-flag gbdoc-flag--soft' },
    declared: { word: 'Declared', cls: 'gbdoc-flag gbdoc-flag--declared' },
    figma: { word: 'Figma only', cls: 'gbdoc-flag gbdoc-flag--none' }
  };

  var byId = {};
  ROLES.forEach(function (r) { byId[r.id] = r; });

  function rungFor(role, w) {
    var out = role.rungs[0];
    for (var i = 0; i < role.rungs.length; i++) {
      if (w >= role.rungs[i].w) out = role.rungs[i];
    }
    return out;
  }

  function ladderText(role) {
    return role.rungs.map(function (r, i) {
      return i === 0 ? String(r.s) : r.s + ' from ' + r.w;
    }).join(' · ');
  }

  /* ---------- naming the line under the pointer ----------
     The reading runs the other way round from the showcase: there
     the role is known and the specimen is drawn from it, here the
     rendered line is known and the role has to be recognised.

     Three things decide it, and all three are read off the
     element: the family (the system has exactly two), the size in
     whole pixels, and the weight. Case breaks a tie, because two
     roles do share a family, a size and a weight and differ only
     in being set in capitals.

     WHOLE PIXELS on purpose. A display at 113 per cent hands back
     35.99 for a 36px title, and a role that is right must not go
     unnamed because of the reader's screen (the same rule the
     token lookup lives by, ловушка ORO-SKILL 6).

     Only the rung IN FORCE at this width is compared, so a 48px
     serif title is H1 hero at 1280 and not at 390: at 390 the
     record says H1 hero is 36, and an unnamed 48 is the honest
     answer.

     Roles whose provenance is figma are ranked below the rest:
     where a live measurement and a Figma export claim the same
     size and weight, the thing on the screen came from the live
     one. */
  var PROV_RANK = { verified: 4, recorded: 3, declared: 3, figma: 0 };

  function matchAll(cs, width) {
    var w = width || window.innerWidth;
    var first = String(cs.fontFamily).split(',')[0].replace(/["']/g, '').trim();
    var fam = /noto serif|georgia/i.test(first) ? 'serif' : 'sans';
    var size = Math.round(parseFloat(cs.fontSize));
    var weight = String(parseInt(cs.fontWeight, 10) || 400);
    var tt = cs.textTransform === 'none' ? 'none' : cs.textTransform;
    if (!size) return [];

    var hits = [];
    ROLES.forEach(function (role) {
      if (role.fam !== fam) return;
      var rung = rungFor(role, w);
      if (Math.round(rung.s) !== size) return;
      if (String(rung.f) !== weight) return;
      /* Case is not a tie breaker, it is a gate: a line set in
         lower case is not the role recorded in capitals. */
      if (rung.tt !== tt) return;
      var score = (PROV_RANK[role.prov] || 0) + (role.cls ? 2 : 0);
      hits.push({ role: role, rung: rung, score: score });
    });
    hits.sort(function (a, b) { return b.score - a.score; });
    return hits;
  }

  function match(cs, width) {
    var hits = matchAll(cs, width);
    return hits.length ? hits[0].role : null;
  }

  window.GB_TYPE_SCALE = {
    groups: GROUPS,
    roles: ROLES,
    prov: PROV,
    byId: byId,
    rungFor: rungFor,
    ladderText: ladderText,
    match: match,
    matchAll: matchAll
  };
})();
