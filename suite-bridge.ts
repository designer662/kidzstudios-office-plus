import {createOffice,type OfficeController} from './office-scene';
import {people,type Person} from './office-data';
type Staff={id:number;name:string;position:string;department:string;gender?:'male'|'female';status:string;motionStatus:string;motionWalking?:boolean;motionAction?:string;visualRoomId?:string;roomId?:string;x:number;y:number;visualX?:number;visualY?:number;deskX?:number;deskY?:number;currentJob?:string;workload?:string[];hasAlert?:boolean};
type Suite={getStaff:()=>Staff[];selectPerson:(id:number)=>void;selectDepartment:(id:string)=>void;selectRoom:(id:string)=>void;stopFollow:()=>void;reset:()=>void;pause:(paused:boolean)=>void};
declare global{interface Window{OfficeSuite?:Suite;office3d?:OfficeController}}
const host=document.querySelector<HTMLDivElement>('#office3dHost')!;
const loading=document.querySelector<HTMLDivElement>('#office3dLoading')!;
const api=window.OfficeSuite;
const $=(id:string)=>document.getElementById(id)!;
const baseIds:Record<number,number>={1:0,2:1,3:3,4:6,5:4,6:7,7:2,8:5};
let controller:OfficeController|undefined,signature='',view:'isometric'|'plan'='isometric',paused=matchMedia('(prefers-reduced-motion: reduce)').matches,rotating=false,frame=0,failed=false;
function status(e:Staff):Person['status']{return e.motionWalking?'walking':e.motionStatus==='On break'||(e.visualRoomId||e.roomId)==='pantry'?'break':e.motionStatus==='In a meeting'||(e.visualRoomId||e.roomId)==='showroom'?'showroom':'desk'}
function isSeated(e:Staff){return status(e)==='desk'&&Math.hypot((e.visualX??e.x)-(e.deskX??e.x),(e.visualY??e.y)-(e.deskY??e.y))<.5}
function position(e:Staff):[number,number]{return [(e.visualX??e.x)/2-5.75,(e.visualY??e.y)/2-17.5]}
function roster(staff:Staff[]):Person[]{return staff.map((e,i)=>{const base=people[baseIds[e.id]??i%people.length];return {...base,id:e.id,name:e.name,role:e.position,department:e.department,gender:e.gender||base.gender||'male',status:status(e),position:position(e),rotation:e.id===4?Math.PI/2:base.rotation,seated:isSeated(e),action:e.motionAction}})}
function refreshControls(){
 $('studio3d').classList.toggle('active',view==='isometric');$('studio3d').setAttribute('aria-pressed',String(view==='isometric'));
 $('studioPlan').classList.toggle('active',view==='plan');$('studioPlan').setAttribute('aria-pressed',String(view==='plan'));
 $('studioPause').textContent=paused?'Resume':'Pause';$('studioPause').setAttribute('aria-pressed',String(paused));$('studioPause').setAttribute('aria-label',paused?'Resume people animation':'Pause people animation');
 $('studioRotate').classList.toggle('active',rotating);$('studioRotate').setAttribute('aria-pressed',String(rotating));($('studioRotate') as HTMLButtonElement).disabled=view==='plan';
}
function build(staff:Staff[]){
 controller?.dispose();host.replaceChildren();
 controller=createOffice(host,{onPerson:id=>api?.selectPerson(id),onDepartment:id=>api?.selectDepartment(id),onRoom:id=>api?.selectRoom(id),onExplore:()=>api?.stopFollow(),onZoom:z=>{$('rotationReadout').textContent=`${Math.round(z*100)}%`}},{roster:roster(staff),externalMotion:true});
 controller.setView(view);controller.setPaused(paused);controller.setRotating(rotating);window.office3d=controller;
 const selectDepartment=controller.selectDepartment.bind(controller);controller.selectDepartment=id=>selectDepartment(id==='All'?'all':id);
 const reset=controller.reset.bind(controller);controller.reset=()=>{view='isometric';rotating=false;reset();refreshControls()};
 document.documentElement.classList.add('studio3d-ready');$('officeSvg').setAttribute('aria-hidden','true');$('officeSvg').querySelectorAll('[tabindex]').forEach(el=>el.setAttribute('tabindex','-1'));loading.hidden=true;
}
function tick(){
 if(failed)return;
 if(!document.hidden&&api){
  const staff=api.getStaff();const next=JSON.stringify(staff.map(e=>[e.id,e.name,e.position,e.department,e.gender||'']));
  try{if(next!==signature){build(staff);signature=next}}
  catch(error){failed=true;console.error('Office 3D initialization failed',error);controller?.dispose();host.replaceChildren();document.documentElement.classList.remove('studio3d-ready');$('officeSvg').removeAttribute('aria-hidden');$('officeSvg').querySelectorAll('.employee').forEach(el=>el.setAttribute('tabindex','0'));window.office3d=undefined;loading.textContent='3D unavailable in this browser. The office map and tools are still available.';loading.hidden=false;return}
  controller?.updatePeople(staff.map(e=>({id:e.id,position:position(e),status:status(e),seated:isSeated(e),action:e.motionAction,rotation:e.id===4?Math.PI/2:people[baseIds[e.id]??0].rotation,note:e.currentJob||e.workload?.[0]||'',alert:e.hasAlert})));
 }
 frame=requestAnimationFrame(tick);
}
if(api){
 api.pause(paused);refreshControls();
 $('studio3d').onclick=()=>{api.stopFollow();view='isometric';rotating=false;controller?.setView(view);refreshControls()};
 $('studioPlan').onclick=()=>{api.stopFollow();view='plan';rotating=false;controller?.setView(view);refreshControls()};
 $('studioPause').onclick=()=>{paused=!paused;api.pause(paused);controller?.setPaused(paused);refreshControls()};
 $('studioRotate').onclick=()=>{api.stopFollow();rotating=!rotating;controller?.setRotating(rotating);refreshControls()};
 document.querySelectorAll<HTMLButtonElement>('[data-scene-emote]').forEach(button=>button.addEventListener('click',()=>{const kind=button.dataset.sceneEmote as 'wave'|'dance'|'celebrate'|'stretch';const id=controller?.playEmote(kind);if(id!==null&&id!==undefined){document.querySelectorAll('[data-scene-emote]').forEach(b=>b.classList.remove('playing'));button.classList.add('playing');window.setTimeout(()=>button.classList.remove('playing'),3200)}}));
 $('rotationReadout').onclick=()=>api.reset();$('rotationReadout').title='Reset view';$('rotationReadout').setAttribute('aria-label','Reset view');
 $('opsMobileToggle').onclick=()=>{const open=$('todayPanel').classList.toggle('mobile-open');$('opsMobileToggle').setAttribute('aria-expanded',String(open));$('opsMobileToggle').textContent=open?'Close operations':'Operations'};
 document.addEventListener('visibilitychange',()=>controller?.setPaused(paused||document.hidden));
 window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);controller?.dispose()},{once:true});
 tick();
}else{loading.textContent='The office could not initialize. Reload to try again.'}
