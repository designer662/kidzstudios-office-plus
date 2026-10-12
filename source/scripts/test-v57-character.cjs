/** Test exact shipped V57 bundle, no external network or WebGL required. */
const fs=require('fs'),vm=require('vm'),path=require('path');
let code=fs.readFileSync(path.resolve(__dirname,'../office-3d.js'),'utf8');
const hook='var kl=document.querySelector("#office3dHost")';
if(!code.includes(hook))throw Error('Unexpected V57 output structure');
const test=`;globalThis.__v57Test=(()=>{
 const input=[
  {id:0,name:'Boss',gender:'male',role:'Boss',color:'#9c7054',skin:'#c7946d',hair:'#38322f',seated:true,status:'desk'},
  {id:1,name:'Cikda',gender:'female',role:'Assistant',color:'#8a738d',skin:'#d9ab83',hair:'#4b3a33',seated:true,status:'desk'},
  {id:2,name:'Minn',gender:'female',role:'Designer',color:'#668b7a',skin:'#e6bc97',hair:'#433731',seated:true,status:'desk'},
  {id:3,name:'Afiq',gender:'male',role:'Designer',color:'#527583',skin:'#cea27d',hair:'#292f32',seated:true,status:'desk'},
  {id:4,name:'Nisa',gender:'female',role:'Sales',color:'#b47467',skin:'#deb28c',hair:'#40332f',seated:false,status:'showroom'},
  {id:5,name:'Athira',gender:'female',role:'Sales',color:'#c19957',skin:'#deb38d',hair:'#493a35',seated:false,status:'showroom'},
  {id:6,name:'Mirul',gender:'male',role:'Sales',color:'#647395',skin:'#b8825b',hair:'#343536',seated:false,status:'walking'},
  {id:7,name:'Lisa',gender:'female',role:'Admin',color:'#918661',skin:'#edc5a5',hair:'#5d4435',seated:true,status:'desk'}
 ];
 let factory=Xh(),summary=[];
 for(const p of input){
  const rig=factory(p);
  if(rig.root.userData.characterVersion!==8)throw Error(p.name+': wrong rig version');
  if(rig.root.scale.x!==1.2||rig.root.userData.gender!==p.gender)throw Error(p.name+': V53 proportions or gender mapping not applied');
  if(rig.eyes.length!==2||!rig.head||!rig.leftLeg||!rig.rightLeg)throw Error(p.name+': missing rig part');
  for(const [behavior,status,seated,time] of [['desk','desk',true,0],['walk','walking',false,1],['wave','desk',false,2],['dance','desk',false,3]]){
   if(behavior==='wave'||behavior==='dance'){rig.emote=behavior;rig.emoteStart=time-.2;}
   qh(rig,{...p,status,seated},time,.016,.09);
   if(!Number.isFinite(rig.head.rotation.x)||!Number.isFinite(rig.body.position.y))throw Error(p.name+': invalid animation '+behavior);
  }
  const meshCount=(function count(group){let v=0;group.traverse(o=>{if(o.isMesh){v++;let pos=o.geometry.getAttribute('position');if(!pos||pos.count===0)throw Error('invalid geometry')}});return v})(rig.root);
  if(meshCount<12)throw Error(p.name+': unexpectedly empty model '+meshCount);
  summary.push({name:p.name,gender:p.gender,meshCount});
 }
 const dynamic=[{id:9,name:'New Male',position:'Designer',department:'Creative Department',gender:'male',x:10,y:10,deskX:10,deskY:10},{id:10,name:'New Female',position:'Designer',department:'Creative Department',gender:'female',x:10,y:10,deskX:10,deskY:10}];
 Jh={1:0,2:1,3:3,4:6,5:4,6:7,7:2,8:5};
 let roster=S0(dynamic);if(roster[0].gender!=='male'||roster[1].gender!=='female')throw Error('Staff gender not propagated through bundled bridge');
 if(gs.find(p=>p.name==='Cikda').gender!=='female')throw Error('Default female gender missing');
 return{staffTested:summary.length,dynamicRoster:roster.map(p=>p.gender),summary};
})();throw Error('test-stop');`;
code=code.replace(hook,test+hook);
const sandbox={console,performance:{now:()=>0},globalThis:null,AbortController,AbortSignal};sandbox.globalThis=sandbox;
try{vm.runInNewContext(code,sandbox,{timeout:40000})}catch(e){if(e.message!=='test-stop')throw e;}
if(sandbox.__v57Test?.staffTested!==8)throw Error('Smoke test incomplete');
console.log('PASS V57 offline 3D rig runtime');console.log(JSON.stringify(sandbox.__v57Test));
