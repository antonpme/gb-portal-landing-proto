/* gbppl-lp227-live-1 (2026-09-30) · the router of live/start-227.html.
   One state, read from the address and written back to it, so every
   screen of the path has a link (links never break: unknown keys are
   ignored, missing keys fall back to the defaults below).

   GBFlow.state          { s, cz, dr, v }
   GBFlow.go(patch)      merge, pushState, announce
   GBFlow.set(patch)     merge, replaceState, announce (no history step)
   'gbflow:change'       on document, detail = state; each room renders
                         itself when state.s is one of its screens.

   ?v= survives every step: go() and set() merge into the state.
   Rooms: entry.js owns landing / email / catalog / product,
          cz.js owns cz (and calls GBCZItems.box / .card for two steps). */
(function () {
  var ENTRY = ['landing', 'email', 'catalog', 'product'];
  /* choice / experts / experts-done: Sandbox V2 (the two equal doors and the
     live expert form, 30.09); unknown to Live, which never routes there. */
  var CZ_STEPS = ['url', 'reading', 'design', 'box', 'card', 'choice', 'experts', 'experts-done'];
  var DEF = { s: 'landing', cz: 'design', dr: '', v: '1' };

  function read() {
    var q = new URLSearchParams(location.search);
    var st = {
      s: q.get('s') || DEF.s,
      cz: q.get('cz') || DEF.cz,
      dr: q.get('dr') || DEF.dr,
      v: q.get('v') || DEF.v
    };
    if (ENTRY.indexOf(st.s) < 0 && st.s !== 'cz') st.s = DEF.s;
    if (CZ_STEPS.indexOf(st.cz) < 0) st.cz = DEF.cz;
    return st;
  }

  function write(st, push) {
    var q = new URLSearchParams(location.search);
    ['s', 'cz', 'dr', 'v'].forEach(function (k) {
      if (st[k] && st[k] !== DEF[k]) q.set(k, st[k]); else q.delete(k);
    });
    if (st.s !== 'cz') { q.delete('cz'); q.delete('dr'); }
    var url = location.pathname + (q.toString() ? '?' + q.toString() : '') + location.hash;
    history[push ? 'pushState' : 'replaceState'](null, '', url);
  }

  function apply(st) {
    document.body.setAttribute('data-s', st.s);
    document.body.setAttribute('data-v', st.v);
    var inCz = st.s === 'cz';
    document.getElementById('entry-root').hidden = inCz;
    document.getElementById('cz-root').hidden = !inCz;
    document.dispatchEvent(new CustomEvent('gbflow:change', { detail: st }));
  }

  var GBFlow = {
    ENTRY: ENTRY,
    CZ_STEPS: CZ_STEPS,
    state: read(),
    go: function (patch) {
      GBFlow.state = Object.assign({}, GBFlow.state, patch || {});
      write(GBFlow.state, true);
      apply(GBFlow.state);
      window.scrollTo(0, 0);
    },
    set: function (patch) {
      GBFlow.state = Object.assign({}, GBFlow.state, patch || {});
      write(GBFlow.state, false);
      apply(GBFlow.state);
    }
  };
  window.GBFlow = GBFlow;

  window.addEventListener('popstate', function () {
    GBFlow.state = read();
    apply(GBFlow.state);
  });
  /* rooms load after this file; announce once everything is parsed */
  document.addEventListener('DOMContentLoaded', function () { apply(GBFlow.state); });
})();
