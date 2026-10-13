import {createOffice,type OfficeController} from './office-scene';
import {people,type Person} from './office-data';
type Staff={mood?:string;id:number;name:string;position:string;department:string;gender?:'male'|'female';appearance?:Person['appearance'];status:string;motionStatus:string;motionWalking?:boolean;motionAction?:string;motionFaceTo?:number|null;visualRoomId?:string;roomId?:string;x:number;y:number;visualX?:number;visualY?:number;deskId?:string;deskX?:number;deskY?:number;currentJob?:string;workload?:string[];hasAlert?:boolean};
type Suite={getStaff:()=>Staff[];selectPerson:(id:number)=>void;selectDepartment:(id:string)=>void;selectRoom:(id:string)=>void;stopFollow:()=>void;reset:()=>void;pause:(paused:boolean)=>void};
declare global{interface Window{OfficeSuite?:Suite;office3d?:OfficeController}}
const host=document.querySelector<HTMLDivElement>('#office3dHost')!;
const loading=document.querySelector<HTMLDivElement>('#office3dLoading')!;
const api=window.OfficeSuite;
const $=(id:string)=>document.getElementById(id)!;
const baseIds:Record<number,number>={1:0,2:1,3:3,4:6,5:4,6:7,7:2,8:5};
let controller:OfficeController|undefined,signature='',paused=matchMedia('(prefers-reduced-motion: reduce)').matches,frame=0,failed=false;
function status(e:Staff):Person['status']{const room=e.visualRoomId||e.roomId;return e.motionWalking?'walking':['pantry','prayer','toilet-a','toilet-b'].includes(room)?'break':room==='showroom'?'showroom':room==='store'?'desk':e.motionStatus==='On break'?'break':e.motionStatus==='In a meeting'?'showroom':'desk'}
function isSeated(e:Staff){return status(e)==='desk'&&Math.hypot((e.visualX??e.x)-(e.deskX??e.x),(e.visualY??e.y)-(e.deskY??e.y))<.5}
function position(e:Staff):[number,number]{return [(e.visualX??e.x)/2-5.75,(e.visualY??e.y)/2-17.5]}
function roster(staff:Staff[]):Person[]{return staff.map((e,i)=>{const base=people[baseIds[e.id]??i%people.length];return {...base,id:e.id,seatId:e.deskId,name:e.name,role:e.position,department:e.department,gender:e.gender||base.gender||'male',appearance:e.appearance,status:status(e),position:position(e),rotation:e.id===4?Math.PI/2:base.rotation,seated:isSeated(e),action:e.motionAction}})}
function build(staff:Staff[]){
 controller?.dispose();host.replaceChildren();
 controller=createOffice(host,{onPerson:id=>api?.selectPerson(id),onDepartment:id=>api?.selectDepartment(id),onRoom:id=>api?.selectRoom(id),onExplore:()=>api?.stopFollow(),onZoom:z=>{$('rotationReadout').textContent=`${Math.round(z*100)}%`}},{roster:roster(staff),externalMotion:true});
 controller.setView('isometric');controller.setPaused(paused);controller.setRotating(!paused);window.office3d=controller;window.dispatchEvent(new Event('ks:3d-ready'));
 for(const person of staff){const emoji=({happy:'😊',sad:'😔',angry:'😠',badmood:'😒',busy:'💻'} as Record<string,string>)[person.mood||''];if(emoji)controller.showBubble(person.id,emoji,0,'emoji')}
 const selectDepartment=controller.selectDepartment.bind(controller);controller.selectDepartment=id=>selectDepartment(id==='All'?'all':id);
 const reset=controller.reset.bind(controller);controller.reset=()=>{reset();controller?.setRotating(!paused)};
 document.documentElement.classList.add('studio3d-ready');$('officeSvg').setAttribute('aria-hidden','true');$('officeSvg').querySelectorAll('[tabindex]').forEach(el=>el.setAttribute('tabindex','-1'));loading.hidden=true;
}
function tick(){
 if(failed)return;
 if(!document.hidden&&api){
  const staff=api.getStaff();const next=JSON.stringify(staff.map(e=>[e.id,e.name,e.position,e.department,e.gender||'',e.appearance||null,e.deskId||'']));
  try{if(next!==signature){build(staff);signature=next}}
  catch(error){failed=true;console.error('Office 3D initialization failed',error);controller?.dispose();host.replaceChildren();document.documentElement.classList.remove('studio3d-ready');$('officeSvg').removeAttribute('aria-hidden');$('officeSvg').querySelectorAll('.employee').forEach(el=>el.setAttribute('tabindex','0'));window.office3d=undefined;loading.textContent='3D unavailable in this browser. The office map and tools are still available.';loading.hidden=false;return}
  controller?.updatePeople(staff.map(e=>{const partner=e.motionFaceTo!=null?staff.find(p=>p.id===e.motionFaceTo):null;const a=position(e),b=partner?position(partner):null;return {id:e.id,position:a,status:status(e),seated:isSeated(e),action:e.motionAction,rotation:b?Math.atan2(b[0]-a[0],b[1]-a[1]):e.id===4?Math.PI/2:people[baseIds[e.id]??0].rotation,note:e.currentJob||e.workload?.[0]||'',alert:e.hasAlert,mood:e.mood||''}}));
 }
 frame=requestAnimationFrame(tick);
}
if(api){
 api.pause(paused);
 $('rotationReadout').onclick=()=>api.reset();$('rotationReadout').title='Reset view';$('rotationReadout').setAttribute('aria-label','Reset view');
 $('opsMobileToggle').onclick=()=>{const open=$('todayPanel').classList.toggle('mobile-open');$('opsMobileToggle').setAttribute('aria-expanded',String(open));$('opsMobileToggle').textContent=open?'Close operations':'Operations'};
 document.addEventListener('visibilitychange',()=>controller?.setPaused(paused||document.hidden));
 const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');motionPreference.addEventListener('change',()=>{paused=motionPreference.matches;api.pause(paused);controller?.setPaused(paused||document.hidden);controller?.setRotating(!paused)});
 window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);controller?.dispose()},{once:true});
 tick();
}else{loading.textContent='The office could not initialize. Reload to try again.'}
