/** Smoke-test the actual prebuilt Three.js runtime without a browser/WebGL. */
const fs=require('fs'),vm=require('vm'),path=require('path');
let source=fs.readFileSync(path.resolve(__dirname,'../office-3d.js'),'utf8');
const hook='function Yh(i,t,e={})';
if(source.indexOf(hook)<0)throw Error('Unexpected bundle: test hook missing');
const injected=String.raw`;globalThis.__headRigTest=(()=>{
 const examples=[
  {id:0,name:'Boss',role:'Boss',color:'#9c7054',skin:'#c7946d',hair:'#38322f',seated:true,status:'desk'},
  {id:1,name:'Cikda',role:'Boss assistant',color:'#8a738d',skin:'#d9ab83',hair:'#4b3a33',seated:true,status:'desk'},
  {id:2,name:'Minn',role:'Designer',color:'#668b7a',skin:'#e6bc97',hair:'#433731',seated:true,status:'desk'},
  {id:3,name:'Afiq',role:'Designer',color:'#527583',skin:'#cea27d',hair:'#292f32',seated:true,status:'desk'},
  {id:4,name:'Nisa',role:'Sales',color:'#b47467',skin:'#deb28c',hair:'#40332f',seated:false,status:'showroom'},
  {id:5,name:'Athira',role:'Sales',color:'#c19957',skin:'#deb38d',hair:'#493a35',seated:false,status:'showroom'},
  {id:6,name:'Mirul',role:'Sales',color:'#647395',skin:'#b8825b',hair:'#343536',seated:false,status:'walking'},
  {id:7,name:'Lisa',role:'Admin',color:'#918661',skin:'#edc5a5',hair:'#5d4435',seated:true,status:'desk'}
 ];
 const factory=Xh();let headMeshes=0,vertices=0;
 const summary=[];
 for(const p of examples){
  const rig=factory(p);
  if(rig.root.userData.characterVersion!==5)throw Error(p.name+': old character version');
  if(rig.eyes.length!==2||!rig.head||!rig.head.parent||!rig.leftLeg||!rig.rightLeg)throw Error(p.name+': missing animation joint');
  if(!rig.head.getObjectByName('eye-left')||!rig.head.getObjectByName('eye-right'))throw Error(p.name+': missing eyes');
  rig.head.updateWorldMatrix(true,true);
  let meshCount=0,bounds=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
  rig.head.traverse(node=>{if(!node.isMesh)return;meshCount++;headMeshes++;
   const position=node.geometry.getAttribute('position');
   if(!position||position.count<3)throw Error(p.name+': bad mesh geometry');
   for(let i=0;i<position.count;i++){
    const v=new P().fromBufferAttribute(position,i).applyMatrix4(node.matrixWorld);
    if(![v.x,v.y,v.z].every(Number.isFinite))throw Error(p.name+': invalid vertex');
    bounds[0]=Math.min(bounds[0],v.x);bounds[1]=Math.min(bounds[1],v.y);bounds[2]=Math.min(bounds[2],v.z);
    bounds[3]=Math.max(bounds[3],v.x);bounds[4]=Math.max(bounds[4],v.y);bounds[5]=Math.max(bounds[5],v.z);vertices++;
   }
  });
  const width=bounds[3]-bounds[0],height=bounds[4]-bounds[1];
  if(width<.4||width>.95||height<.4||height>.95)throw Error(p.name+': head out of proportion '+JSON.stringify([width,height]));
  for(const [label,status,seated,time] of [['desk','desk',true,0],['walk','walking',false,1.4],['wave','desk',false,2.4],['dance','desk',false,3.1]]){
   if(label==='wave'||label==='dance'){rig.emote=label;rig.emoteStart=time-.3;}
   qh(rig,{...p,status,seated},time,.016,.12);
   if(![rig.head.rotation.x,rig.head.rotation.y,rig.head.rotation.z].every(Number.isFinite))throw Error(p.name+': bad head animation in '+label);
  }
  summary.push({name:p.name,headMeshes:meshCount,width:+width.toFixed(3),height:+height.toFixed(3)});
 }
 return {staffTested:summary.length,headMeshes,vertices,summary};
})();throw Error('intentional-test-stop');`;
source=source.replace(hook,injected+hook);
const sandbox={console,AbortController,AbortSignal,globalThis:null,performance:{now:()=>0}};sandbox.globalThis=sandbox;
try{vm.runInNewContext(source,sandbox,{timeout:42000})}catch(e){if(e.message!=='intentional-test-stop')throw e;}
if(!sandbox.__headRigTest||sandbox.__headRigTest.staffTested!==8)throw Error('Rig smoke test not completed');
console.log('PASS head-model runtime test',JSON.stringify(sandbox.__headRigTest));
