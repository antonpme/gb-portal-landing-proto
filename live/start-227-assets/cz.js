/* gbppl-lp227-live-1 (2026-09-30): live customizer replica.
   Sources: studio/harvest/customizer-* dumps and shots. Clay is the captured mock.
   Only GBFlow owns addresses. Inputs and selections survive room changes in memory. */
(function () {
  'use strict';
  var root = document.getElementById('cz-root');
  var A = 'start-227-assets/img/cz-';
  var model = { url: innerWidth < 1024 ? '' : 'https://www.clay.com', manual: innerWidth < 1024, manualReady: false, design: 1, boxLogo: 1, cardLogo: 1, boxMode: 'Original', cardMode: 'Monochrome', lid: '#000000', tray: '#FFD100', industry: 'SaaS & Software', name: '', intro: '', message: '', signature: '' };
  var glyphs = { 'arrow-left': 0xea08, 'arrow-right': 0xea09, 'e-remove': 0xea41, pencil: 0xeac6, 'chevron-up': 0xeb4c, 'trash-2': 0xeb67, 'chevron-down': 0xebb8, 'dna-2': 0xed0d, 'data-upload': 0xeb2a };
  var timer, entryTimer, previous = '', inRoom = false, preparing = false, confirm = '';
  function icon(name) { return '<i class="cz-icon" aria-hidden="true">&#' + glyphs[name] + ';</i>'; }
  function esc(v) { return String(v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function btn(text, action, kind, arrow, extra) { return '<button type="button" class="cz-button ' + (kind || '') + '" data-action="' + action + '" ' + (extra || '') + '><span>' + text + '</span>' + (arrow ? icon(arrow) : '') + '</button>'; }
  function color(name, hex) { return '<input type="color" aria-label="' + name + ' color" data-field="' + name.toLowerCase() + '" value="' + hex + '">'; }
  function brandAssets(manual) {
    return '<div class="cz-brand-assets"><label class="cz-section-label">'+(manual?'<span class="cz-mobile-only">YOUR LOGO</span><span class="cz-desktop-only">YOUR BRAND ASSETS</span>':'YOUR BRAND ASSETS')+'</label><div class="cz-asset-grid">' + [1,2].map(function (n) { return '<div class="cz-asset"><div class="cz-asset-image">'+(manual?'<span class="cz-upload-placeholder">'+icon('data-upload')+'</span>':'')+'<img src="'+A+'logo-'+n+'.png" alt="Clay logo '+n+'"></div><div class="cz-asset-caption"><span class="cz-caption-spacer"></span><span>LOGO #'+n+(n===1?' (WORDMARK)':' (ICONIC LOGO)')+'</span><button type="button" aria-label="Remove logo '+n+'" data-action="remove-logo" data-logo="'+n+'">'+icon('trash-2')+'</button></div></div>'; }).join('')+'</div></div><div class="cz-brand-details"><section><label class="cz-section-label">YOUR DESIGN COLORS</label><div class="cz-color-pairs">'+['lid','tray'].map(function (k) { return '<div class="cz-color-pair">'+color(k,model[k])+'<input class="cz-hex" aria-label="'+k+' hex color" data-field="'+k+'" value="'+model[k]+'" maxlength="7"></div>'; }).join('')+'</div></section><section><label class="cz-section-label">BRAND INDUSTRY</label><div class="cz-industry"><span>'+esc(model.industry)+'</span><button type="button" aria-label="Edit brand industry" data-action="industry">'+icon('pencil')+'</button></div></section></div>';
  }
  function header(step) {
    var names=['Your Design','GildedBox 2-Piece Box Design','Greeting Card Design'], idx=['design','box','card'].indexOf(step);
    return '<header class="cz-header"><div class="cz-stepper">'+['design','box','card'].map(function (s,i) { return (i?'<span class="cz-connector '+(idx>=i?'is-past':'')+'"></span>':'')+'<button type="button" class="cz-dot '+(i===idx?'is-current':'')+' '+(i<idx?'is-past':'')+'" data-step="'+s+'" aria-label="'+(i===2?'Go to Greeting Card':'Go to GildedBox 2-Piece Box')+'" '+(i===idx?'aria-current="step"':'')+'></button>'; }).join('')+'</div><div class="cz-title-row"><button type="button" aria-label="Previous item" data-step="'+(idx>0?['design','box'][idx-1]:'url')+'">'+icon('arrow-left')+'</button><span>'+names[idx]+'</span><button type="button" aria-label="Next" data-step="'+(idx===0?'box':'card')+'" '+(idx===2?'disabled':'')+'>'+icon('arrow-right')+'</button></div></header>';
  }
  function design() {
    return '<section class="cz-design"><div class="cz-dna-door">'+btn('EDIT MY BRAND DNA','dna','cz-secondary cz-small','dna-2')+'</div><section class="cz-choose"><h2>Choose Your Design</h2><div class="cz-design-grid">'+[1,2,3].map(function(n){return '<button type="button" class="cz-design-tile '+(model.design===n?'is-selected':'')+'" aria-label="Select design '+n+'" aria-pressed="'+(model.design===n)+'" data-design="'+n+'"><img src="'+A+'design-'+n+'.jpg" alt="Clay design '+n+'"></button>';}).join('')+'<div class="cz-swatches"><div><span>Lid</span>'+color('Lid',model.lid)+'</div><div><span>Tray</span>'+color('Tray',model.tray)+'</div></div></div></section><div class="cz-info">Next, you\'ll fine-tune your logo — on the box and on each product.</div></section>';
  }
  function field(label,key,placeholder,max,textarea) { return '<div class="cz-field"><label for="cz-'+key+'">'+label+'</label>'+(textarea?'<textarea rows="3"':'<input type="text"')+' id="cz-'+key+'" data-field="'+key+'" placeholder="'+esc(placeholder)+'" '+(max?'maxlength="'+max+'"':'')+(textarea?'>'+esc(model[key])+'</textarea>':' value="'+esc(model[key])+'">')+'</div>'; }
  function items(step) {
    var card=step==='card', key=step+'Logo', mode=step+'Mode';
    return '<div class="cz-item-sections"><section><h2>Select a logo</h2><div class="cz-logo-grid">'+[1,2,0].map(function(n){return '<button type="button" class="cz-logo-tile '+(model[key]===n?'is-selected':'')+'" data-logo-choice="'+n+'" aria-pressed="'+(model[key]===n)+'"><div class="cz-logo-picture">'+(n?'<img src="'+A+'logo-'+n+'.png" alt="Clay logo '+n+'">':icon('e-remove'))+'</div><span> '+(n?'LOGO #'+n:'NO LOGO')+'</span></button>';}).join('')+'</div></section><section><h2>Logo mode</h2><div class="cz-segment">'+['Original','Monochrome'].map(function(m){return '<button type="button" data-mode="'+m+'" class="'+(model[mode]===m?'is-active':'')+'" aria-pressed="'+(model[mode]===m)+'">'+m+'</button>';}).join('')+'</div></section><section><h2>'+(card?'Greeting card text':'Personalization')+'</h2><div class="cz-form">'+(card?field('INTRO','intro','Dear Elise',50)+field('MESSAGE','message','Thank you for your trust and enthusiasm, we look forward to our continues partnership and many more reasons to celebrate!',500,true)+field('SIGNATURE','signature','Cedric and Co.',100):field('CUSTOM GIFT BOX','name','Name'))+'</div></section></div><div class="cz-info cz-item-info">You will be able to add other recipients in the cart</div>';
  }
  function url() {
    return '<div class="cz-url"><div class="cz-url-inner"><div class="cz-url-heading"><h1>Design this gift for your brand</h1><p>Enter your website URL to extract your brand DNA</p></div><input type="text" class="cz-url-input" aria-label="Website URL" placeholder="example.com" data-field="url" value="'+esc(model.url)+'"><button type="button" class="cz-no-website" data-action="manual" aria-expanded="'+model.manual+'">No Website?'+icon(model.manual?'chevron-up':'chevron-down')+'</button><div class="cz-manual" '+(model.manual?'':'hidden')+'>'+brandAssets(true)+'</div>'+btn('START','start','cz-primary cz-start','arrow-right',!model.url&&!model.manualReady?'disabled':'')+'</div></div>';
  }
  /* Frame markup is the vanilla lp227-proto port; captured Clay name/palette replaces Slack. */
  var frames=[['Analyzing your website…','website'],['Extracting your brand colors…','purple'],['Analyzing the palette…','blue'],['Capturing your brand vibe…','vibe'],['Crafting your design…','craft']];
  function reading(){return '<div class="cz-reading"><h1 id="cz-reading-title"></h1><div class="cz-reading-card" id="cz-reading-card"></div><div class="cz-reading-progress"><span id="cz-reading-bar"></span></div></div>';}
  function readingTick(t) {
    // Captured Extracting at 68.7% (~40s), Crafting at80% (~47s).
    // ASSUMED earlier boundaries: Analyzing0-20, Palette20-30, Vibe30-40.
    var idx=t<20?0:t<30?2:t<40?3:t<47?1:4, f=frames[idx], card=root.querySelector('#cz-reading-card');
    if(!card)return;
    root.querySelector('#cz-reading-title').textContent=f[0]; card.className='cz-reading-card is-'+f[1];
    card.innerHTML=f[1]==='website'?'<strong>CLAY.COM</strong>':f[1]==='purple'||f[1]==='blue'?'<i></i><i></i><i></i><i></i><strong>'+ (f[1]==='purple'?'#FAC904':'#F96065')+'</strong>':f[1]==='vibe'?'<div class="cz-reading-vibe"><span>FRIENDLY</span><span>APPROACHABLE</span><span>WARM</span></div>':'<div class="cz-reading-craft"><i></i><i></i><i></i><i></i></div>';
    root.querySelector('#cz-reading-bar').style.width=Math.min(100,t*100/59)+'%';
  }
  function dna(){return '<div class="cz-dna"><div class="cz-scroll cz-dna-scroll"><div class="cz-dna-spacer"></div><section class="cz-dna-content"><h2>YOUR BRAND DNA</h2>'+brandAssets()+'</section></div><footer class="cz-footer cz-dna-footer"><p>Updating your brand DNA will delete all your current designs.<br>The update may take 30-50 seconds</p><div>'+btn('SAVE &amp; GET NEW DESIGNS','save-dna','cz-primary','arrow-right')+btn('BACK TO GIFT DESIGN','back-dna','cz-secondary cz-back','arrow-left')+'</div></footer></div>';}
  function modal(){
    if(!confirm)return '';
    var closing=confirm==='close';
    return '<div class="cz-modal-scrim"><section class="cz-modal" role="dialog" aria-modal="true" aria-labelledby="cz-modal-title"><header><h2 id="cz-modal-title">'+(closing?'Close Designer':'Create new designs?')+'</h2><button type="button" aria-label="Close dialog" data-action="dismiss">'+icon('e-remove')+'</button></header>'+(closing?'<p>Are you sure you want to close? Your customization progress will be lost</p>':'<p>Updating your brand DNA will replace your current designs with new ones. This takes about 30-50 seconds.</p>')+'<footer>'+btn(closing?'CANCEL':'NO','dismiss','cz-secondary')+btn(closing?'CLOSE':'YES, UPDATE',closing?'close':'dismiss',closing?'cz-danger':'cz-primary')+'</footer></section></div>';
  }
  function measureScroll() {
    root.querySelectorAll('.cz-scroll').forEach(function(n){n.classList.remove('is-overflowing');n.classList.toggle('is-overflowing',n.scrollHeight>n.clientHeight+1);});
  }
  function render(state) {
    clearInterval(timer); clearTimeout(entryTimer);
    if(state.s!=='cz'){inRoom=false; previous=''; preparing=false; return;}
    var enter=!inRoom, step=state.cz, scene=step==='reading'?'url':step;
    root.innerHTML='<div class="cz-overlay '+(enter?'is-entering':'')+' '+(state.dr==='dna'?'has-dna':'')+'" data-step="'+step+'"><button type="button" class="cz-close" aria-label="Close Designer" data-action="close-dialog">'+icon('e-remove')+'</button><div class="cz-scene"><picture><source media="(max-width:1023px)" srcset="'+A+'scene-'+scene+'-mobile.jpg"><img src="'+A+'scene-'+scene+'.jpg" alt="3D visualization of your gift design"></picture></div><aside class="cz-panel"><div class="cz-grabber"><span></span></div><div class="cz-panel-body">'+(step==='url'?'<div class="cz-scroll">'+url()+'</div>':step==='reading'?reading():'<div class="cz-scroll">'+header(step)+(step==='design'?design():items(step))+'</div><footer class="cz-footer">'+btn('NEXT','next','cz-primary','arrow-right')+btn('HELP WITH MY DESIGN','help','cz-secondary')+'</footer>')+(state.dr==='dna'?dna():'')+'</div></aside>'+(preparing?'<div class="cz-preparing is-skeleton"><div class="cz-scene-skeleton"><span></span></div><div class="cz-panel-skeleton"><div><i></i><i></i><i></i><i></i><i></i></div></div></div>':'')+modal()+'</div>';
    /* yd enter-01/02/03: skeleton 3.5s, loader plate, then content fade 750ms. */
    if(preparing){
      entryTimer=setTimeout(function(){
        var overlay=root.querySelector('.cz-preparing');if(!overlay)return;
        overlay.classList.remove('is-skeleton');overlay.innerHTML='<div class="cz-unwrapping"><img src="'+A+'scene-unwrapping.jpg" alt="gilded box. UNWRAPPING YOUR GIFT… 100%"></div>';
        var content=root.querySelector('.cz-design');content.style.opacity='0';
        // ASSUMED: 100ms loader lead-in, unobserved by the source timing capture.
        entryTimer=setTimeout(function(){content.style.opacity='';content.classList.add('is-revealing');entryTimer=setTimeout(function(){preparing=false;overlay.remove();},750);},100);
      },new URLSearchParams(location.search).get('fast')==='1'?250:3500);
    }
    if(step==='reading'){var elapsed=0,fast=new URLSearchParams(location.search).get('fast')==='1';readingTick(0);timer=setInterval(function(){elapsed++;readingTick(elapsed);if(elapsed>=59){clearInterval(timer);preparing=true;GBFlow.go({cz:'design',dr:''});}},fast?100:1000);}
    inRoom=true;previous=step;
    requestAnimationFrame(measureScroll);document.fonts.ready.then(measureScroll);
    if(confirm){root.querySelector('.cz-modal button').focus();}
  }
  root.addEventListener('input',function(e){var key=e.target.dataset.field;if(!key)return;model[key]=e.target.value;if(key==='url'){var b=root.querySelector('[data-action="start"]');if(b)b.disabled=!model.url&&!model.manualReady;}if(key==='lid'||key==='tray'){model.manualReady=true;var start=root.querySelector('[data-action="start"]');if(start)start.disabled=false;root.querySelectorAll('[data-field="'+key+'"]').forEach(function(n){if(n!==e.target)n.value=model[key];});}});
  root.addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b||b.disabled)return;
    var step=GBFlow.state.cz;
    if(b.dataset.step){preparing=false;confirm='';GBFlow.go({cz:b.dataset.step,dr:''});return;}
    if(b.dataset.design){model.design=Number(b.dataset.design);root.querySelectorAll('[data-design]').forEach(function(n){n.classList.toggle('is-selected',n===b);n.setAttribute('aria-pressed',n===b);});return;}
    if(b.dataset.logoChoice!==undefined){model[step+'Logo']=Number(b.dataset.logoChoice);root.querySelectorAll('[data-logo-choice]').forEach(function(n){n.classList.toggle('is-selected',n===b);n.setAttribute('aria-pressed',n===b);});return;}
    if(b.dataset.mode){model[step+'Mode']=b.dataset.mode;root.querySelectorAll('[data-mode]').forEach(function(n){n.classList.toggle('is-active',n===b);n.setAttribute('aria-pressed',n===b);});return;}
    switch(b.dataset.action){
      case 'manual':model.manual=!model.manual;root.querySelector('.cz-manual').hidden=!model.manual;b.setAttribute('aria-expanded',model.manual);b.innerHTML='No Website?'+icon(model.manual?'chevron-up':'chevron-down');root.querySelector('[data-action="start"]').disabled=!model.url&&!model.manualReady;measureScroll();break;
      case 'start':GBFlow.go({cz:'reading',dr:''});break;
      case 'next':if(step==='card'){location.href='checkout.html';}else GBFlow.go({cz:step==='design'?'box':'card',dr:''});break;
      case 'dna':GBFlow.go({dr:'dna'});break;
      case 'back-dna':GBFlow.go({dr:''});break;
      case 'save-dna':confirm='dna';root.querySelector('.cz-overlay').insertAdjacentHTML('beforeend',modal());root.querySelector('.cz-modal button').focus();break;
      case 'close-dialog':confirm='close';root.querySelector('.cz-overlay').insertAdjacentHTML('beforeend',modal());root.querySelector('.cz-modal button').focus();break;
      case 'dismiss':confirm='';root.querySelector('.cz-modal-scrim')?.remove();root.querySelector('.cz-close').focus();break;
      case 'close':confirm='';GBFlow.go({s:'product',dr:''});break;
      // Live help action was not captured; Ren instructed an inert control.
      case 'help':break;
      // Captures contain these edit controls, no live deletion or request occurs here.
      case 'remove-logo':b.closest('.cz-asset').classList.toggle('is-removed');break;
      case 'industry':var span=b.previousElementSibling;span.contentEditable=span.contentEditable!=='true';if(span.isContentEditable){span.focus();span.addEventListener('blur',function(){model.industry=span.textContent;model.manualReady=true;var start=root.querySelector('[data-action="start"]');if(start)start.disabled=false;span.contentEditable=false;},{once:true});}break;
    }
  });
  document.addEventListener('keydown',function(e){if(confirm&&e.key==='Escape'){confirm='';root.querySelector('.cz-modal-scrim')?.remove();root.querySelector('.cz-close')?.focus();}if(confirm&&e.key==='Tab'){var buttons=root.querySelectorAll('.cz-modal button'),first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
  document.addEventListener('gbflow:change',function(e){render(e.detail);});
  window.addEventListener('resize',measureScroll);
  window.GBCZ={render:render,model:model};
})();

