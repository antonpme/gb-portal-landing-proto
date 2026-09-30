/* gbppl-lp227-sandboxes-1 (2026-09-30).
   Ton via Ren: URL -> reading -> customizer, experts as an equal V2 door,
   six existing catalog gifts and the existing Favorites drawer as My Designs.
   Local generation is ASSUMED: original Clay tiles rotate, no paid/live requests. */
(function(){
'use strict';
var root=document.getElementById('cz-root'), db, pendingGift=null, choice='', quiet=false, drawer, helpDrawer, helpRoute='', ready;
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
function defaults(){return {name:'',boxLogo:1,boxMode:'Original',cardLogo:1,cardMode:'Monochrome',intro:'',message:'',signature:'',lid:'#000000',tray:'#FFD100',lidChanged:false,trayChanged:false};}
function addSet(gift,amount,brandUrl){var order=1+(db.generation||0)%3,batch=db.counter+1;db.generation=(db.generation||0)+1;for(var i=0;i<amount;i++){var tile=1+(order+i-1)%3;var d={id:'design-'+(++db.counter),number:db.counter,gift:gift,brandUrl:brandUrl||url(),batch:batch,tile:tile,artwork:gift.id===firstGift.id?'../assets/models/start227/art-'+tile+'-lid.webp':gift.scene,fields:defaults()};db.designs.push(d);if(i===0)db.current=d.id;}save();applyCurrent();}
function ensure(){if(!db.designs.length)addSet(firstGift,3);}
function applyCurrent(){var d=current();if(d&&window.GBCZ){d.fields=Object.assign(defaults(),d.fields);Object.assign(GBCZ.model,d.fields);GBCZ.model.design=d.tile;GBCZ.model.url=d.brandUrl;}}
function capture(){if(!active()||!current()||!window.GBCZ)return;var d=current();Object.keys(defaults()).forEach(function(k){d.fields[k]=GBCZ.model[k];});save();if(window.GBSandboxScene)GBSandboxScene.update(d);}
function select(id){capture();if(!db.designs.some(function(d){return d.id===id;}))return;db.current=id;save();applyCurrent();GBFlow.go({s:'cz',cz:'design',dr:''});}
function css(href){return new Promise(function(resolve,reject){var n=document.createElement('link');n.rel='stylesheet';n.href=href;n.onload=resolve;n.onerror=reject;document.head.appendChild(n);});}
function script(src,attrs){return new Promise(function(resolve,reject){var n=document.createElement('script');n.src=src;Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);});n.onload=resolve;n.onerror=reject;document.body.appendChild(n);});}
// Existing system drawer and catalog overlay, loaded only after a sandbox is requested.
ready=Promise.all([css('../system/components/button.css'),css('../system/components/drawer.css'),script('../system/components/drawer.js'),css('start-227-assets/sb-scene.css'),script('start-227-assets/sb-scene.js').then(function(){return GBSandboxScene.ready;}),css('../system/components/auth.css'),script('../system/components/auth.js'),css('../system/components/booking.css'),script('../system/components/booking.js'),script('catalog-overlay.js',{'data-open':'[data-sb-catalog-door]','data-src':'../sandbox/lp227-proto/index.html?land=diy&s=more&studio=embedded'})]).then(function(){
 drawer=document.createElement('gb-drawer');drawer.id='sb-my-designs';document.body.appendChild(drawer);
 drawer._panel.classList.add('sb-drawer-panel');drawer._scrim.classList.add('sb-drawer-scrim');
 drawer.addEventListener('gbd:close',function(){if(!quiet&&active()&&GBFlow.state.dr==='designs')GBFlow.set({dr:''});});
 helpDrawer=document.createElement('gb-drawer');helpDrawer.id='sb-get-help';document.body.appendChild(helpDrawer);helpDrawer._panel.classList.add('sb-drawer-panel','sb-help-panel');helpDrawer._scrim.classList.add('sb-drawer-scrim');helpDrawer.addEventListener('gbd:close',function(){if(!quiet&&active()&&['help','meeting'].indexOf(GBFlow.state.dr)>=0)GBFlow.set({dr:''});});
 db.designs.forEach(function(d){d.artwork=d.gift.id===firstGift.id?'../assets/models/start227/art-'+d.tile+'-lid.webp':d.gift.scene;});save();
 window.GBSandbox.loaded=true;
});
function action(text,name,kind,extra){return '<button type="button" class="cz-button '+(kind||'cz-primary')+'" data-sb-action="'+name+'" '+(extra||'')+'><span>'+text+'</span></button>';}
function choiceHTML(){return '<div class="cz-scroll sb-choice"><h2>How would you like to design your gift?</h2><div class="lep-group" role="radiogroup" aria-label="Design your gift">'+[['self','Design it yourself','Customize this design in your brand.'],['experts','Designed for you','Work with our experts to design your gift.']].map(function(d){return '<label class="lep-card '+(choice===d[0]?'is-on':'')+'"><span class="lep-radio"><input class="lep-radio__input" type="radio" name="sb-path" data-sb-choice="'+d[0]+'" value="'+d[0]+'" '+(choice===d[0]?'checked':'')+'><span class="lep-radio__box"><span class="lep-radio__dot"></span></span></span><span class="lep-card__copy"><span class="lep-card__title">'+d[1]+'</span><span class="lep-card__desc">'+d[2]+'</span></span></label>';}).join('')+'</div></div><footer class="cz-footer">'+action('CONTINUE','choice','cz-primary',choice?'':'disabled')+'</footer>';}
var expert={email:'',name:'',phone:'',message:''};
function expertField(label,key,placeholder,type){return '<div class="sb-expert-field"><label for="sb-expert-'+key+'">'+label+' <span class="sb-required">*</span></label><input type="'+(type||'text')+'" id="sb-expert-'+key+'" data-sb-field="'+key+'" value="'+esc(expert[key])+'" placeholder="'+esc(placeholder)+'" required></div>';}
function expertsHTML(){return '<div class="cz-scroll sb-experts"><div class="sb-expert-header"><button type="button" class="sb-text-door" data-sb-action="self">Back to your design</button></div><h2>Work with our experts to design this gift</h2><form id="sb-expert-form">'+expertField('EMAIL','email','me@mycompany.com','email')+expertField('YOUR NAME','name','Your Name')+'<div class="sb-expert-field"><label for="sb-expert-phone">PHONE <span class="sb-required">*</span></label><div class="sb-phone"><button type="button" aria-label="Country code, United States" class="sb-country"><svg width="20" height="13" viewBox="0 0 20 13" aria-hidden="true"><rect width="20" height="13" fill="white"/><path d="M0 1h20M0 3h20M0 5h20M0 7h20M0 9h20M0 11h20" stroke="#b22234"/><rect width="9" height="7" fill="#3c3b6e"/></svg><span>â–¾</span></button><input type="tel" id="sb-expert-phone" data-sb-field="phone" value="'+esc(expert.phone)+'" placeholder="+1 (XXX) XXX-XXXX" required></div></div><div class="sb-expert-field"><label for="sb-expert-message" class="sb-message-label">How can GildedBox help with gifting in your business?</label><textarea id="sb-expert-message" data-sb-field="message" rows="3" placeholder="Ex: I need 50 gifts for c-suite executives for a conference in two weeks">'+esc(expert.message)+'</textarea></div></form></div><footer class="cz-footer"><button type="submit" form="sb-expert-form" class="cz-button cz-primary"><span>CONTINUE</span></button></footer>';}
function drawerHTML(){return '<p class="sb-designs-lede">Every gift you designed stays here. Open any of them again.</p><ul class="sb-designs-list">'+db.designs.map(function(d){return '<li class="sb-design-row '+(d.id===db.current?'is-current':'')+'"><img src="'+d.artwork+'" alt="'+esc(d.gift.name)+' design '+d.number+'"><div><p>'+esc(d.gift.name)+'</p><span>Design '+d.number+'</span>'+(d.id===db.current?'<strong>On the scene</strong>':'')+'<button type="button" class="gb-btn gb-btn--outline gb-btn--secondary gb-btn--medium" data-sb-design="'+d.id+'"><span class="gb-btn__label">'+(d.id===db.current?'Current design':'Open this design')+'</span></button></div></li>';}).join('')+'</ul>';}
function cleanup(){pendingGift=null;if(window.GBSandboxScene)GBSandboxScene.unmount();closeLayers();if(window.GBEntry)GBEntry.closeSignin();}
function closeLayers(){helpRoute='';if(helpDrawer&&helpDrawer._open){quiet=true;helpDrawer.close();quiet=false;}if(drawer&&drawer._open){quiet=true;drawer.close();quiet=false;}if(window.GbCatalogOverlay)GbCatalogOverlay.close();}
// Concierge door anatomy reused by name; configurable local three-door host, not the full hub.
function helpHTML(){return '<div class="gbhc-doors">'+[['chat','chat','Live chat','Talk to our team.'],['meeting','calendar','Book a meeting','Choose a time that works for you.'],['experts','wand','Have our designers design it','Work with our experts on this gift.']].map(function(a){return '<button type="button" class="gbhc-door" data-sb-help="'+a[0]+'"><span class="gbhc-door__disc"><span data-gb-icon="'+a[1]+'" data-gb-icon-size="22"></span></span><span class="gbhc-door__copy"><span class="gbhc-door__title">'+a[2]+'</span><span class="gbhc-door__sub">'+a[3]+'</span></span><span class="gbhc-door__go" data-gb-icon="chevron-right" data-gb-icon-size="20"></span></button>';}).join('')+'</div>';}
function helpLayer(state){if(['help','meeting'].indexOf(state.dr)<0){if(helpDrawer&&helpDrawer._open){quiet=true;helpDrawer.close();quiet=false;}helpRoute='';return;}if(helpRoute===state.dr&&helpDrawer._open)return;helpRoute=state.dr;helpDrawer.open({title:state.dr==='help'?'Get help':'Book a meeting',html:state.dr==='help'?helpHTML():'<div class="sb-booking-host"></div>'});helpDrawer.setBack(state.dr==='meeting'?function(){GBFlow.go({dr:'help'});}:null,'Get help');if(state.dr==='meeting'){var booking=document.createElement('gb-booking-flow');booking.setAttribute('layout','embedded');booking.setAttribute('exit-label','Back to the options');booking.setAttribute('site-href','get-help.html');booking.addEventListener('gbb:cta',function(e){var foot=helpDrawer._panel.querySelector('.gbd-foot');foot.replaceChildren();if(e.detail.node)foot.appendChild(e.detail.node);});booking.addEventListener('gbb:exit',function(e){e.preventDefault();GBFlow.go({dr:'help'});});helpDrawer._panel.querySelector('.sb-booking-host').appendChild(booking);}}
document.addEventListener('click',function(e){if(!active())return;var b=e.target.closest('[data-sb-help]');if(!b)return;var action=b.dataset.sbHelp;if(action==='meeting')GBFlow.go({dr:'meeting'});if(action==='experts')GBFlow.go({cz:'experts',dr:''});});
function layer(state){helpLayer(state);
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
  root.querySelectorAll('.cz-title-row button').forEach(function(n){var forward=n.getAttribute('aria-label').toLowerCase().includes('next');n.innerHTML='<span data-gb-icon="'+'arrow-right'+'" data-gb-icon-size="18" '+(forward?'':'style="transform:rotate(180deg)"')+'></span>';});
  var header=root.querySelector('.cz-header');header.querySelector('.cz-stepper').insertAdjacentHTML('afterend','<div class="sb-step-labels"><span class="'+(step==='design'?'is-current':'')+'">Design</span><span class="'+(step==='box'?'is-current':'')+'">Box</span><span class="'+(step==='card'?'is-current':'')+'">Card</span></div>');
  root.querySelectorAll('.cz-info,.cz-dna-door').forEach(function(n){n.remove();});
  var footer=body.querySelector('.cz-footer');footer.querySelector('[data-action="help"]').remove();
  var next=footer.querySelector('[data-action="next"]');if(step==='card')next.querySelector('span').textContent='ADD TO CART';
  var footCopy=step==='design'?'Next: <strong>Box</strong>, place your logo and name the box.':step==='box'?'Next: <strong>Card</strong>, your logo and the card text.':esc(d.gift.name)+' · Design '+d.number+' · '+esc(d.gift.price);
  footer.insertAdjacentHTML('afterbegin','<p class="sb-next-copy">'+footCopy+'</p>');
  footer.insertAdjacentHTML('beforeend','<div class="sb-service"><span data-gb-icon="chat" data-gb-icon-size="20"></span><span class="sb-help-desktop">Questions, or want our designers to do it?</span><span class="sb-help-mobile">Need help?</span><button class="gb-btn gb-btn--ghost gb-btn--secondary gb-btn--small" type="button" data-sb-action="help"><span class="gb-btn__label">Get help</span></button></div>');
  if(step==='design'){
   root.querySelector('.cz-swatches').remove();
   root.querySelector('.cz-choose').insertAdjacentHTML('afterend','<section class="sb-colors"><h2>Colors</h2><div class="sb-color-row">'+['lid','tray'].map(function(k){return '<label class="sb-color-tile"><input type="color" aria-label="'+k+' color" data-field="'+k+'" value="'+d.fields[k]+'"><span class="sb-swatch" style="background:'+d.fields[k]+'"></span><span>'+k.toUpperCase()+'</span><span class="sb-color-hex">'+d.fields[k].toUpperCase()+'</span></label>';}).join('')+'<button type="button" class="cz-button cz-secondary cz-small sb-dna-door" data-sb-action="dna"><i class="cz-icon" aria-hidden="true">&#60685;</i><span>EDIT MY BRAND DNA</span></button></div></section>');
   root.querySelectorAll('[data-design] img').forEach(function(img){img.src=d.gift.id===firstGift.id?'../assets/models/start227/art-'+img.closest('[data-design]').dataset.design+'-lid.webp':d.gift.scene;img.alt='Public mock artwork '+img.closest('[data-design]').dataset.design;});
  }
  root.querySelectorAll('[data-design]').forEach(function(n){n.hidden=!db.designs.some(function(a){return a.tile===Number(n.dataset.design)&&a.gift.id===d.gift.id&&a.brandUrl===d.brandUrl&&(!d.batch||a.batch===d.batch);});n.classList.toggle('is-selected',Number(n.dataset.design)===d.tile);n.setAttribute('aria-pressed',Number(n.dataset.design)===d.tile);});
 }
 // v6: actual scoped model, including unbranded sandbox reading (Ton17:39).
 if(step!=='url'){
  var sceneHost=root.querySelector('.cz-scene');GBSandboxScene.mount(sceneHost,d,step==='reading');
  sceneHost.insertAdjacentHTML('beforeend','<div class="sb-visualization-plate"><p class="sb-visualization-copy">This is a 3D visualization of your gift design</p><p class="gbds-hint"><span class="gbds-hint__bit"><span data-gb-icon="rotate" data-gb-icon-size="12"></span>Drag to turn</span><span class="gbds-hint__bit"><span data-gb-icon="mouse" data-gb-icon-size="12"></span>Scroll to zoom</span><span class="gbds-hint__bit"><span data-gb-icon="move" data-gb-icon-size="12"></span>Shift-drag to move</span></p></div>');
  if(step!=='reading')sceneHost.insertAdjacentHTML('beforeend','<div class="sb-scene-doors"><button type="button" class="gb-btn gb-btn--ghost gb-btn--secondary gb-btn--small" data-sb-action="designs"><span class="gb-btn__label">My Designs</span><span class="sb-count">'+db.designs.length+'</span></button><button type="button" class="gb-btn gb-btn--ghost gb-btn--secondary gb-btn--small" data-sb-action="more"><span class="gb-btn__label">More gifts</span></button></div>');
 }
 if(state.dr==='dna'){root.querySelector('.cz-dna-footer>p').textContent='Your current designs will stay in My Designs.';}
 if(state.dr==='dna'){var yes=root.querySelector('.cz-modal [data-action="dismiss"]:last-child');if(yes)yes.setAttribute('data-sb-action','regenerate');}
 requestAnimationFrame(function(){var dots=root.querySelector('.cz-stepper'),labels=root.querySelector('.sb-step-labels');if(dots&&labels)labels.style.width=dots.offsetWidth+'px';});
 layer(state);
}
function snapshot(){capture();var d=current();return{version:GBFlow.state.v,designId:d.id,giftId:d.gift.id,giftName:d.gift.name,brandUrl:d.brandUrl,artwork:d.artwork,box:{name:d.fields.name,logo:d.fields.boxLogo,mode:d.fields.boxMode,lid:d.fields.lid,tray:d.fields.tray},card:{intro:d.fields.intro,message:d.fields.message,signature:d.fields.signature,logo:d.fields.cardLogo,mode:d.fields.cardMode}};}
function checkout(){capture();GBFlow.go({dr:'signin'});}
function openGate(){var s=snapshot();function done(){try{sessionStorage.setItem('gb-start227-checkout',JSON.stringify(s));}catch(e){}GBEntry.closeSignin();location.href='checkout.html?design='+encodeURIComponent(s.designId);}
 GBEntry.openSignin({desc:'Sign in to save this design to your account and continue to checkout.',onDone:done,onClose:function(){GBEntry.closeSignin();if(GBFlow.state.dr==='signin')GBFlow.set({dr:''});}});
}
root.addEventListener('input',function(e){if(!active())return;if(e.target.dataset.sbField)expert[e.target.dataset.sbField]=e.target.value;else {var hex=e.target.closest('.sb-color-tile');if(hex){hex.querySelector('.sb-color-hex').textContent=e.target.value.toUpperCase();hex.querySelector('.sb-swatch').style.background=e.target.value;var k=e.target.dataset.field;GBCZ.model[k+'Changed']=true;}queueMicrotask(capture);}});
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
 if(a==='help')GBFlow.go({dr:'help'});
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
