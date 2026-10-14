/* KidzStudios Office Plus Character Studio — V86.8. Offline, dependency-free. */
(()=>{
 'use strict';
 const COLORS={
  scarf:['#d9796d','#9b7aa7','#627f92','#718f7a','#c69a61','#534c62','#dfb4ad','#ddd2c1'],
  shirt:['#80988b','#dcd3bf','#748ca6','#d5a78c','#a88dba','#dedfdd','#4b6e70','#bf9d69'],
  pants:['#42474b','#59646d','#71675f','#324d60','#7e776b','#43554e','#30343a','#909091'],
  hair:['#3b2a23','#25272a','#514039','#795644','#a27b57','#b8a085','#3d414a','#704b34']
 };
 const defaults={model:'classic',scarfColor:'#d9796d',shirtColor:'#dcd3bf',pantsColor:'#42474b',glasses:false};
 const maleShirts={boss:'#9c7054',afiq:'#527583',amirul:'#647395',mirul:'#647395'};
 const isHex=v=>typeof v==='string'&&/^#[\da-f]{6}$/i.test(v);
 function normalize(value,gender='female',name=''){
  const a=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
  const female=gender==='female',model=female?(a.model==='semi-casual'?'semi-casual':'classic'):'semi-casual';
  const baseShirt=female?(model==='semi-casual'?'#80988b':'#dcd3bf'):(maleShirts[String(name||'').toLowerCase()]||'#80988b');
  const nameHair={boss:'#38322f',afiq:'#292f32',amirul:'#343536',mirul:'#343536'};
  return {model,scarfColor:isHex(a.scarfColor)?a.scarfColor.toLowerCase():defaults.scarfColor,
    shirtColor:isHex(a.shirtColor)?a.shirtColor.toLowerCase():baseShirt,
    pantsColor:isHex(a.pantsColor)?a.pantsColor.toLowerCase():(female?'#42474b':'#515a60'),
    glasses:typeof a.glasses==='boolean'?a.glasses:(!female&&['boss','afiq'].includes(String(name||'').toLowerCase())),
    hairStyle:HAIR_STYLES.has(a.hairStyle)?a.hairStyle:'fade',
    hairColor:isHex(a.hairColor)?a.hairColor.toLowerCase():(nameHair[String(name||'').toLowerCase()]||'#3b2a23')};
 }
 const $=id=>document.getElementById(id);
 const fields={scarf:'ksCharScarfColor',shirt:'ksCharShirtColor',pants:'ksCharPantsColor',hair:'ksCharHairColor'};
 const HAIR_STYLES=new Set(['fade','quiff','sidepart','korean','messy']);
 let initialModel='classic';
 const getGender=()=> $('staffGenderInput')?.value==='female'?'female':'male';
 function fillPalette(section){const host=$('ksChar'+section.charAt(0).toUpperCase()+section.slice(1)+'Swatches');if(!host)return;
  host.replaceChildren();COLORS[section].forEach(color=>{const b=document.createElement('button');b.type='button';b.className='ks-char-swatch';b.dataset.color=color;b.title=color;b.setAttribute('aria-label',section+' '+color);b.style.backgroundColor=color;b.addEventListener('click',()=>{const input=$(fields[section]);input.value=color;input.dispatchEvent(new Event('input',{bubbles:true}))});host.append(b)})}
 function update(){const female=getGender()==='female',studio=$('staffCharacterStudio');if(!studio)return;
  studio.dataset.gender=female?'female':'male';$('ksCharModelRow').hidden=!female;$('ksCharScarfRow').hidden=!female;$('ksCharHairStyleRow').hidden=female;$('ksCharHairRow').hidden=female;
  const model=$('ksCharModel').value,glasses=$('ksCharGlasses').checked;
  $('ksCharModelLabel').textContent=female?(model==='semi-casual'?'Semi-casual hijab':'Classic hijab'):'Semi-casual male';
  $('ksCharPreview').style.setProperty('--ks-hijab', $('ksCharScarfColor').value);
  $('ksCharPreview').style.setProperty('--ks-shirt',$('ksCharShirtColor').value);
  $('ksCharPreview').style.setProperty('--ks-pants',$('ksCharPantsColor').value);
  $('ksCharPreview').style.setProperty('--ks-hair',$('ksCharHairColor').value);
  $('ksCharPreview').dataset.hair=$('ksCharHairStyle').value;
  $('ksCharPreview').classList.toggle('with-glasses',glasses);
  $('ksCharPreview').classList.toggle('is-casual',female&&model==='semi-casual');
  for(const type of Object.keys(fields)){$('ksChar'+type.charAt(0).toUpperCase()+type.slice(1)+'Swatches')?.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.color===$(fields[type]).value)))}
 }
 function init(){if(!$('staffCharacterStudio')||window.__ksCharacterCustomizerReady)return;window.__ksCharacterCustomizerReady=true;
  for(const section of Object.keys(fields))fillPalette(section);
  for(const id of Object.values(fields))$(id).addEventListener('input',update);
  $('ksCharGlasses').addEventListener('change',update);
  $('ksCharHairStyle').addEventListener('change',update);
  $('ksCharModel').addEventListener('change',()=>{
   const shirt=$('ksCharShirtColor');if((initialModel==='classic'&&shirt.value==='#dcd3bf')||(initialModel==='semi-casual'&&shirt.value==='#80988b'))shirt.value=$('ksCharModel').value==='semi-casual'?'#80988b':'#dcd3bf';
   initialModel=$('ksCharModel').value;update();
  });
  $('staffGenderInput')?.addEventListener('change',()=>{const gender=getGender();const current=read();load(current,gender,$('staffNameInput').value)});
  $('staffCharacterStudio').addEventListener('keydown',ev=>{if(ev.key==='Escape')ev.stopPropagation()});
 }
 function load(value,gender='female',name=''){
  init();const a=normalize(value,gender,name);
  $('ksCharModel').value=gender==='female'?a.model:'classic';initialModel=a.model;
  $('ksCharHairStyle').value=a.hairStyle;$('ksCharHairColor').value=a.hairColor;
  $('ksCharScarfColor').value=a.scarfColor;$('ksCharShirtColor').value=a.shirtColor;$('ksCharPantsColor').value=a.pantsColor;$('ksCharGlasses').checked=a.glasses;
  update();return a;
 }
 function read(){return normalize({model:$('ksCharModel')?.value,scarfColor:$('ksCharScarfColor')?.value,shirtColor:$('ksCharShirtColor')?.value,pantsColor:$('ksCharPantsColor')?.value,glasses:!!$('ksCharGlasses')?.checked,hairStyle:$('ksCharHairStyle')?.value,hairColor:$('ksCharHairColor')?.value},getGender(),$('staffNameInput')?.value)}
 window.KSCharacterStudio={normalize,load,read,update};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
