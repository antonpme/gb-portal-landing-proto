/* gbppl-lp227-sandboxes-1 (2026-09-30).
   Ton via Ren: URL -> reading -> customizer, experts as an equal V2 door,
   six existing catalog gifts and the existing Favorites drawer as My Designs.
   Local generation is ASSUMED: original Clay tiles rotate, no paid/live requests. */
(function(){
'use strict';
var root=document.getElementById('cz-root'), db, pendingGift=null, choice='', quiet=false, drawer, ready;
var KEY='gb-start227-sandbox-designs', A='start-227-assets/img/cz-', P='../sandbox/lp227-proto/img/';
var firstGift={id:'candle-906',name:'Elemental No.3 Candle Flight',price:'$125',scene:A+'scene-design.jpg'};
var gifts=[
{id:'yeti-tumbler',name:'YETI 20oz Tumbler',price:'$90',scene:P+'gift-yeti-tumbler.webp'},
{id:'yeti-travel-mug',name:'YETI 20oz Travel Mug',price:'$100',scene:P+'gift-yeti-travel-mug.webp'},
{id:'stanley-quencher',name:'Stanley Quencher 40oz',price:'$125',scene:P+'gift-stanley-quencher.webp'},
{id:'ember-mug',name:'Ember 12oz Travel Mug',price:'$300',scene:P+'gift-ember-mug.webp'},
{id:'yeti-lowball',name:'YETI 10oz Lowball',price:'$70',scene:P+'gift-yeti-lowball.webp'},
{id:'stanley-cooler',name:'Stanley Everyday Can Cooler',price:'$65',scene:P+'gift-stanley-can-cooler.webp'}]; // lp227-proto GIFTS, exact existing cards/assets.
function active(){return GBFlow.state.v==='2'||GBFlow.state.v==='3';}
function esc(s){return GBEntry.esc(s);}
function save(){try{sessionStorage.setItem(KEY,JSON.stringify(db));}catch(e){}}
try{db=JSON.parse(sessionStorage.getItem(KEY)||'null');}catch(e){}
if(!db||!Array.isArray(db.designs))db={designs:[],current:'',counter:0};
function current(){return db.designs.find(function(d){return d.id===db.current;});}
function url(){return GBEntry.website()||'https://www.clay.com';}
function domain(v){return v.replace(/^[a-z]+:\/\//i,'').replace(/^www\./i,'').split(/[/?#]/)[0];}
function brandWord(v){var a=domain(v).toLowerCase().split('.').filter(Boolean),w=a.length>1?a[a.length-2]:a[0]||'example';return w.charAt(0).toUpperCase()+w.slice(1);}
function defaults(){return {name:'',boxLogo:1,boxMode:'Original',cardLogo:1,cardMode:'Monochrome',intro:'',message:'',signature:'',lid:'#000000',tray:'#FFD100'};}
function addSet(gift,amount,brandUrl){var order=1+(db.generation||0)%3,batch=db.counter+1;db.generation=(db.generation||0)+1;for(var i=0;i<amount;i++){var tile=1+(order+i-1)%3;var d={id:'design-'+(++db.counter),number:db.counter,gift:gift,brandUrl:brandUrl||url(),batch:batch,tile:tile,artwork:A+'design-'+tile+'.jpg',fields:defaults()};db.designs.push(d);if(i===0)db.current=d.id;}save();applyCurrent();}
function ensure(){if(!db.designs.length)addSet(firstGift,3);}
function applyCurrent(){var d=current();if(d&&window.GBCZ){Object.assign(GBCZ.model,d.fields);GBCZ.model.design=d.tile;GBCZ.model.url=d.brandUrl;}}
function capture(){if(!active()||!current()||!window.GBCZ)return;var d=current();Object.keys(defaults()).forEach(function(k){d.fields[k]=GBCZ.model[k];});save();}
function select(id){capture();if(!db.designs.some(function(d){return d.id===id;}))return;db.current=id;save();applyCurrent();GBFlow.go({s:'cz',cz:'design',dr:''});}
function css(href){return new Promise(function(resolve,reject){var n=document.createElement('link');n.rel='stylesheet';n.href=href;n.onload=resolve;n.onerror=reject;document.head.appendChild(n);});}
function script(src,attrs){return new Promise(function(resolve,reject){var n=document.createElement('script');n.src=src;Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);});n.onload=resolve;n.onerror=reject;document.body.appendChild(n);});}
// Existing system drawer and catalog overlay, loaded only after a sandbox is requested.
ready=Promise.all([css('../system/components/button.css'),css('../system/components/drawer.css'),script('../system/components/drawer.js'),script('catalog-overlay.js',{'data-open':'[data-sb-catalog-door]','data-src':'../sandbox/lp227-proto/index.html?land=diy&s=more&studio=embedded'})]).then(function(){
 drawer=document.createElement('gb-drawer');drawer.id='sb-my-designs';document.body.appendChild(drawer);
 drawer._panel.classList.add('sb-drawer-panel');drawer._scrim.classList.add('sb-drawer-scrim');
 drawer.addEventListener('gbd:close',function(){if(!quiet&&active()&&GBFlow.state.dr==='designs')GBFlow.set({dr:''});});
 window.GBSandbox.loaded=true;
});
function action(text,name,kind,extra){return '<button type="button" class="cz-button '+(kind||'cz-primary')+'" data-sb-action="'+name+'" '+(extra||'')+'><span>'+text+'</span></button>';}
function choiceHTML(){return '<div class="cz-scroll sb-choice"><h2>How would you like to design your gift?</h2><div class="lep-group" role="radiogroup" aria-label="Design your gift">'+[['self','Design it yourself','Customize this design in your brand.'],['experts','Designed for you','Work with our experts to design your gift.']].map(function(d){return '<label class="lep-card '+(choice===d[0]?'is-on':'')+'"><span class="lep-radio"><input class="lep-radio__input" type="radio" name="sb-path" data-sb-choice="'+d[0]+'" value="'+d[0]+'" '+(choice===d[0]?'checked':'')+'><span class="lep-radio__box"><span class="lep-radio__dot"></span></span></span><span class="lep-card__copy"><span class="lep-card__title">'+d[1]+'</span><span class="lep-card__desc">'+d[2]+'</span></span></label>';}).join('')+'</div></div><footer class="cz-footer">'+action('CONTINUE','choice','cz-primary',choice?'':'disabled')+'</footer>';}
var expert={email:'',name:'',phone:'',message:''};
function expertField(label,key,placeholder,type){return '<div class="sb-expert-field"><label for="sb-expert-'+key+'">'+label+' <span class="sb-required">*</span></label><input type="'+(type||'text')+'" id="sb-expert-'+key+'" data-sb-field="'+key+'" value="'+esc(expert[key])+'" placeholder="'+esc(placeholder)+'" required></div>';}
function expertsHTML(){return '<div class="cz-scroll sb-experts"><div class="sb-expert-header"><button type="button" class="sb-text-door" data-sb-action="self">Back to your design</button></div><h2>Work with our experts to design this gift</h2><form id="sb-expert-form">'+expertField('EMAIL','email','me@mycompany.com','email')+expertField('YOUR NAME','name','Your Name')+'<div class="sb-expert-field"><label for="sb-expert-phone">PHONE <span class="sb-required">*</span></label><div class="sb-phone"><button type="button" aria-label="Country code, United States" class="sb-country"><svg width="20" height="13" viewBox="0 0 20 13" aria-hidden="true"><rect width="20" height="13" fill="white"/><path d="M0 1h20M0 3h20M0 5h20M0 7h20M0 9h20M0 11h20" stroke="#b22234"/><rect width="9" height="7" fill="#3c3b6e"/></svg><span>▾</span></button><input type="tel" id="sb-expert-phone" data-sb-field="phone" value="'+esc(expert.phone)+'" placeholder="+1 (XXX) XXX-XXXX" required></div></div><div class="sb-expert-field"><label for="sb-expert-message" class="sb-message-label">How can GildedBox help with gifting in your business?</label><textarea id="sb-expert-message" data-sb-field="message" rows="3" placeholder="Ex: I need 50 gifts for c-suite executives for a conference in two weeks">'+esc(expert.message)+'</textarea></div></form></div><footer class="cz-footer"><button type="submit" form="sb-expert-form" class="cz-button cz-primary"><span>CONTINUE</span></button></footer>';}
function drawerHTML(){return '<p class="sb-designs-lede">Every gift you designed stays here. Open any of them again.</p><ul class="sb-designs-list">'+db.designs.map(function(d){return '<li class="sb-design-row '+(d.id===db.current?'is-current':'')+'"><img src="'+d.artwork+'" alt="'+esc(d.gift.name)+' design '+d.number+'"><div><p>'+esc(d.gift.name)+'</p><span>Design '+d.number+'</span>'+(d.id===db.current?'<strong>On the scene</strong>':'')+'<button type="button" class="gb-btn gb-btn--outline gb-btn--secondary gb-btn--medium" data-sb-design="'+d.id+'"><span class="gb-btn__label">'+(d.id===db.current?'Current design':'Open this design')+'</span></button></div></li>';}).join('')+'</ul>';}
function cleanup(){pendingGift=null;closeLayers();if(window.GBEntry)GBEntry.closeSignin();}
function closeLayers(){if(drawer&&drawer._open){quiet=true;drawer.close();quiet=false;}if(window.GbCatalogOverlay)GbCatalogOverlay.close();}
function layer(state){
 if(state.dr==='signin'&&state.cz==='card'){openGate();}else GBEntry.closeSignin();
 if(state.dr==='designs'){drawer.open({title:'My Designs',html:drawerHTML()});}else if(drawer&&drawer._open){quiet=true;drawer.close();quiet=false;}
 if(state.dr==='more'){GbCatalogOverlay.open();var frame=document.querySelector('.gbppd-cat__frame');document.querySelector('.gbppd-cat__panel').setAttribute('aria-label','6 more gifts for your brand');if(frame&&frame.contentWindow)frame.contentWindow.postMessage({type:'lp227-current',g:current().gift.id},location.origin);}else if(document.querySelector('.gbppd-cat.open'))GbCatalogOverlay.close();
}
function enhance(root,state){
 if(!active()||state.s!=='cz'){closeLayers();return;}
 ensure();applyCurrent();root.classList.add('sb-customizer');document.body.dataset.sbPlacement='scene';
 var body=root.querySelector('.cz-panel-body'),step=state.cz,d=current();
 if(step==='choice')body.innerHTML=choiceHTML();
 else if(step==='experts')body.innerHTML=expertsHTML();
 else if(step==='experts-done')body.innerHTML='<div class="cz-scroll sb-experts-done"><p>Thank you. A GildedBox designer will reach out to you shortly.</p>'+action('Back to your design','self','cz-secondary')+'</div>';
 else if(['design','box','card'].indexOf(step)>=0){
  if(step==='design')root.querySelector('.cz-title-row [data-step="url"]').disabled=true; // Sandbox URL is known and skipped; Live previous remains unchanged.
  var header=root.querySelector('.cz-header');header.querySelector('.cz-stepper').insertAdjacentHTML('afterend','<div class="sb-step-labels"><span class="'+(step==='design'?'is-current':'')+'">Design</span><span class="'+(step==='box'?'is-current':'')+'">Box</span><span class="'+(step==='card'?'is-current':'')+'">Card</span></div>');
  header.insertAdjacentHTML('beforeend','<div class="sb-design-head"><span>'+esc(brandWord(d.brandUrl))+' · Design '+d.number+'</span><button type="button" class="gb-btn gb-btn--ghost gb-btn--secondary gb-btn--small" data-sb-action="designs"><span class="gb-btn__label">My Designs</span><span class="sb-count">'+db.designs.length+'</span></button></div>');
  var help=root.querySelector('[data-action="help"]');if(help)help.outerHTML='<button type="button" class="sb-text-door" data-sb-action="experts">Prefer our experts to design it?</button>';
  if(step==='design')root.querySelectorAll('.cz-swatches>div').forEach(function(n){var i=n.querySelector('input');n.insertAdjacentHTML('beforeend','<span class="sb-color-hex">'+i.value.toUpperCase()+'</span>');});
  if(step==='design')root.querySelector('.cz-choose').insertAdjacentHTML('afterend','<button type="button" class="gb-btn gb-btn--ghost gb-btn--secondary gb-btn--small sb-more-door" data-sb-action="more">See 6 more gifts for your brand</button>');
  if(d.gift.id!==firstGift.id){root.querySelector('.cz-scene picture').innerHTML='<img src="'+d.gift.scene+'" alt="'+esc(d.gift.name)+'">';root.querySelector('.cz-title-row>span').textContent=step==='design'?'Your Design':step==='box'?'GildedBox 2-Piece Box Design':'Greeting Card Design';}
  root.querySelectorAll('[data-design]').forEach(function(n){n.hidden=!db.designs.some(function(a){return a.tile===Number(n.dataset.design)&&a.gift.id===d.gift.id&&a.brandUrl===d.brandUrl&&(!d.batch||a.batch===d.batch);});n.classList.toggle('is-selected',Number(n.dataset.design)===d.tile);n.setAttribute('aria-pressed',Number(n.dataset.design)===d.tile);});
 }
 // Sandbox-only clean raster ground: harvested instructions removed from copies, Live originals intact.
 if(d.gift.id===firstGift.id&&step!=='experts'){var scene=['box','card'].indexOf(step)>=0?step:step==='reading'||step==='url'?'url':'design';root.querySelector('.cz-scene picture').innerHTML='<img src="start-227-assets/img/sb-scene-'+scene+'.jpg" alt="'+esc(d.gift.name)+'">';}
 if(['reading','url','experts','experts-done'].indexOf(step)<0)root.querySelector('.cz-scene').insertAdjacentHTML('beforeend','<div class="sb-visualization-plate"><p class="sb-visualization-copy">This is a 3D visualization of your gift design</p><p class="gbds-hint"><span class="gbds-hint__bit"><span data-gb-icon="rotate" data-gb-icon-size="12"></span>Drag to turn</span><span class="gbds-hint__bit"><span data-gb-icon="mouse" data-gb-icon-size="12"></span>Scroll to zoom</span><span class="gbds-hint__bit"><span data-gb-icon="move" data-gb-icon-size="12"></span>Shift-drag to move</span></p></div>');
 if(['reading','url'].indexOf(step)<0){root.querySelector('.cz-scene').insertAdjacentHTML('beforeend','<div class="sb-scene-doors"><button type="button" class="gb-btn gb-btn--ghost gb-btn--secondary gb-btn--small" data-sb-action="designs"><span class="gb-btn__label">My Designs</span><span class="sb-count">'+db.designs.length+'</span></button><button type="button" class="gb-btn gb-btn--ghost gb-btn--secondary gb-btn--small" data-sb-action="more"><span class="gb-btn__label">More gifts</span></button></div><div class="sb-brand-plate"><button type="button" class="gb-btn gb-btn--ghost gb-btn--secondary gb-btn--small" data-sb-action="dna"><span class="gb-btn__label">Designed for '+esc(GBSandbox.websitePlate().toLowerCase())+'</span><i class="cz-icon" aria-hidden="true">&#60102;</i></button></div>');}
 if(state.dr==='dna'){root.querySelector('.cz-dna-footer>p').textContent='Your current designs will stay in My Designs.';}
 if(step==='experts'){root.querySelector('.cz-scene picture').innerHTML='<img src="'+(d.gift.id===firstGift.id?'start-227-assets/img/sb-scene-design.jpg':d.gift.scene)+'" alt="'+esc(d.gift.name)+'">';}
 if(state.dr==='dna'){var yes=root.querySelector('.cz-modal [data-action="dismiss"]:last-child');if(yes)yes.setAttribute('data-sb-action','regenerate');}
 requestAnimationFrame(function(){var plate=root.querySelector('.sb-visualization-plate'),brand=root.querySelector('.sb-brand-plate');if(plate&&brand)brand.style.bottom=(16+plate.offsetHeight+12)+'px';});
 layer(state);
}
function snapshot(){capture();var d=current();return{version:GBFlow.state.v,designId:d.id,giftId:d.gift.id,giftName:d.gift.name,brandUrl:d.brandUrl,artwork:d.artwork,box:{name:d.fields.name,logo:d.fields.boxLogo,mode:d.fields.boxMode,lid:d.fields.lid,tray:d.fields.tray},card:{intro:d.fields.intro,message:d.fields.message,signature:d.fields.signature,logo:d.fields.cardLogo,mode:d.fields.cardMode}};}
function checkout(){capture();GBFlow.go({dr:'signin'});}
function openGate(){var s=snapshot();function done(){try{sessionStorage.setItem('gb-start227-checkout',JSON.stringify(s));}catch(e){}GBEntry.closeSignin();location.href='checkout.html?design='+encodeURIComponent(s.designId);}
 GBEntry.openSignin({desc:'Sign in to save this design to your account and continue to checkout.',onDone:done,onClose:function(){GBEntry.closeSignin();if(GBFlow.state.dr==='signin')GBFlow.set({dr:''});}});
}
root.addEventListener('input',function(e){if(!active())return;if(e.target.dataset.sbField)expert[e.target.dataset.sbField]=e.target.value;else {var hex=e.target.closest('.cz-swatches>div');if(hex&&hex.querySelector('.sb-color-hex'))hex.querySelector('.sb-color-hex').textContent=e.target.value.toUpperCase();queueMicrotask(capture);}});
root.addEventListener('change',function(e){if(!active()||!e.target.dataset.sbChoice)return;choice=e.target.dataset.sbChoice;root.querySelectorAll('.sb-choice .lep-card').forEach(function(n){n.classList.toggle('is-on',n.contains(e.target));});root.querySelector('[data-sb-action="choice"]').disabled=false;});
root.addEventListener('submit',function(e){if(active()&&e.target.id==='sb-expert-form'){e.preventDefault();GBFlow.go({cz:'experts-done',dr:''});}});
root.addEventListener('click',function(e){
 if(!active())return;var b=e.target.closest('button');if(!b)return;
 var a=b.dataset.sbAction;
 if(b.dataset.design){e.stopImmediatePropagation();var tile=Number(b.dataset.design),d=current(),match=db.designs.slice().reverse().find(function(n){return n.gift.id===d.gift.id&&n.brandUrl===d.brandUrl&&n.tile===tile&&(!d.batch||n.batch===d.batch);});if(match)select(match.id);return;}
 if(b.dataset.action==='next'&&GBFlow.state.cz==='card'){e.stopImmediatePropagation();checkout();return;}
 if(b.dataset.action==='close'){e.stopImmediatePropagation();GBCZ.dismissModal();GBFlow.go({s:'landing',dr:''});return;}
 if(b.dataset.action==='dismiss'&&b.textContent.trim()==='YES, UPDATE'){e.stopImmediatePropagation();GBCZ.dismissModal();capture();addSet(current().gift,3,current().brandUrl);GBFlow.go({cz:'design',dr:''});return;}
 if(!a){if(b.dataset.action==='save-dna'){queueMicrotask(function(){var text=root.querySelector('.cz-modal>p');if(text)text.textContent='Your current designs will stay in My Designs.';});}queueMicrotask(capture);return;}e.stopImmediatePropagation();
 if(a==='choice')GBFlow.go({cz:choice==='experts'?'experts':'design',dr:''});
 if(a==='self')GBFlow.go({cz:'design',dr:''});
 if(a==='experts')GBFlow.go({cz:'experts',dr:''});
 if(a==='designs')GBFlow.go({dr:'designs'});
 if(a==='dna')GBFlow.go({dr:'dna'});
 if(a==='more')GBFlow.go({dr:'more'});
 if(a==='regenerate'){GBCZ.dismissModal();capture();addSet(current().gift,3,current().brandUrl);GBFlow.go({cz:'design',dr:''});}
},true);
document.addEventListener('click',function(e){if(!active())return;var b=e.target.closest('[data-sb-design]');if(b){quiet=true;drawer.close();quiet=false;select(b.dataset.sbDesign);}if(e.target.closest('[data-gbppd-cat-close]')&&GBFlow.state.dr==='more')GBFlow.set({dr:''});});
document.addEventListener('keydown',function(e){if(active()&&e.key==='Escape'&&GBFlow.state.dr==='more')GBFlow.set({dr:''});});
window.addEventListener('message',function(e){if(!active()||e.origin!==location.origin||!e.data)return;var frame=document.querySelector('.gbppd-cat__frame');if(!frame||e.source!==frame.contentWindow)return;
 if(e.data.type==='lp227-ready'){frame.contentWindow.postMessage({type:'lp227-current',g:current().gift.id},location.origin);}
 if(e.data.type==='gb-close-catalog'&&GBFlow.state.dr==='more')GBFlow.set({dr:''});
 if(e.data.type==='lp227-pick'){var g=gifts.find(function(n){return n.id===e.data.id;});if(!g)return;capture();pendingGift=g;GbCatalogOverlay.close();GBFlow.set({cz:'reading',dr:''});}
});
window.GBSandbox={loaded:false,ready:ready,prepare:function(){ensure();applyCurrent();},enhance:enhance,capture:capture,checkout:checkout,current:current,designs:function(){return db.designs;},shortReading:function(){return !!pendingGift;},websitePlate:function(){var w=GBFlow.state.cz==='reading'&&!pendingGift?url():current()?current().brandUrl:url();return domain(w).toUpperCase();},afterReading:function(){
 var short=!!pendingGift;if(short){addSet(pendingGift,1,current().brandUrl);pendingGift=null;}
 else if(!db.designs.length||current().brandUrl!==url())addSet(firstGift,3);
 applyCurrent();if(GBFlow.state.v==='3'&&!short)choice='';return GBFlow.state.v==='3'&&!short?'choice':'design';
},cleanup:cleanup,snapshot:snapshot,setPlacement:function(p){document.body.dataset.sbPlacement=p;}};
})();
