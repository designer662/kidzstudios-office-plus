// V86.7: User semi-casual model with only Office Plus head/hip pivot and API adaptation.
export function createHijabiCasualCharacter(T, color = '#d9796d') {
  const root = new T.Group(); root.name = 'KidzStudios — Semi-casual';
  const materials = {};
  function material(name,hex,roughness=.82) {
    const m = new T.MeshStandardMaterial({color:hex,roughness,metalness:0,side:T.DoubleSide});
    m.name=name; materials[name]=m; return m;
  }
  const fabric=material('Hijab fabric',color), fold=material('Fold undersides','#c96b60');
  const shirt=material('Sage casual shirt','#80988b',.91);
  const shirtFold=material('Rolled cuffs and pocket','#93a699',.93);
  const shirtSeam=material('Shirt seams','#738c80',.94);
  const shirtButton=material('Ivory shirt buttons','#e5ddca',.70);
  const skin=material('Warm skin','#f2bc94',.71), noseMat=material('Nose','#f1b890',.72);
  const trouser=material('Charcoal twill','#42474b'), kneeMat=material('Knees','#464b4e');
  const sole=material('Shoe soles','#eeede7',.81), shoe=material('White leather','#faf9f5',.67);
  const eye=material('Eyes','#252b2b',.23);
  const brow=material('Eyebrows','#363530'), mouth=material('Smile','#a85e50');
  const white=material('Eye highlights','#ffffff',.20);
  const sphere=new T.SphereGeometry(1,32,24);
  const boxes=new Map(),tubes=new Map(),volumes=new Map();
  function group(parent,name,x=0,y=0,z=0){const g=new T.Group();g.name=name;g.position.set(x,y,z);parent.add(g);return g;}
  function mesh(parent,name,geo,mat,pos=[0,0,0],scale=[1,1,1]) {
    const m=new T.Mesh(geo,mat);m.name=name;m.position.set(...pos);m.scale.set(...scale);
    m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;
  }
  const orb=(p,n,m,pos,s)=>mesh(p,n,sphere,m,pos,s);
  function box(p,n,m,pos,s,r=.16) {if(!boxes.has(r))boxes.set(r,new T.RoundedBoxGeometry(1,1,1,3,r));return mesh(p,n,boxes.get(r),m,pos,s);}
  function tube(p,n,m,points,r=.015){const key=JSON.stringify([points,r]);if(!tubes.has(key))tubes.set(key,new T.TubeGeometry(new T.CatmullRomCurve3(points.map(v=>new T.Vector3(...v))),32,r,6,false));return mesh(p,n,tubes.get(key),m);}
  function surface(p,n,m,U,V,fn,reverse=false) {
    const vertices=[],indices=[],uv=[];
    for(let j=0;j<=V;j++)for(let i=0;i<=U;i++){vertices.push(...fn(i/U,j/V));uv.push(i/U,j/V);}
    for(let j=0;j<V;j++)for(let i=0;i<U;i++){const a=j*(U+1)+i,b=a+1,c=a+U+1,d=c+1;if(reverse)indices.push(a,c,b,b,c,d);else indices.push(a,b,c,b,d,c);}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();
    return mesh(p,n,g,m);
  }
  // Closed softly squared tailored volumes, with smoothly interpolated profiles.
  function volume(p,n,m,profile,exponent=2.4) {
    const key=JSON.stringify([profile,exponent]);
    if(volumes.has(key))return mesh(p,n,volumes.get(key),m);
    const c=new T.CatmullRomCurve3(profile.map(v=>new T.Vector3(v[0],v[1],v[2])));
    const rows=Array.from({length:33},(_,j)=>c.getPoint(j/32));
    const part=surface(p,n,m,48,32,(u,v)=>{const q=rows[Math.round(v*32)],a=u*Math.PI*2;
      const sx=Math.sin(a),sz=Math.cos(a),pow=2/exponent;
      return [Math.sign(sx)*Math.pow(Math.abs(sx),pow)*Math.max(0,q.x),q.y,Math.sign(sz)*Math.pow(Math.abs(sz),pow)*Math.max(0,q.z)];});
    volumes.set(key,part.geometry);return part;
  }
  const body=group(root,'Body');
  const chest=group(body,'Chest');
  // Relaxed button-up overshirt, with full depth and a softly rounded hem.
  const shirtProfile=[[0,2.40,0],[.53,2.415,.49],[.739,2.465,.65],[.766,2.64,.703],[.77,2.86,.716],[.741,3.19,.70],[.717,3.60,.68],[.725,3.97,.65],[.721,4.19,.575],[.45,4.41,.385],[0,4.45,0]];
  volume(chest,'Relaxed button-up shirt',shirt,shirtProfile,2.7);
  const shirtCurve=new T.CatmullRomCurve3(shirtProfile.map(p=>new T.Vector3(...p)));
  const shirtRows=Array.from({length:97},(_,i)=>shirtCurve.getPoint(i/96));
  function shirtFront(x,y){
    let p=shirtRows[1];
    for(let i=1;i<shirtRows.length;i++){const a=shirtRows[i-1],b=shirtRows[i];if(y>=a.y&&y<=b.y){const t=(y-a.y)/(b.y-a.y||1);p=new T.Vector3(a.x+(b.x-a.x)*t,y,a.z+(b.z-a.z)*t);break;}}
    return p.z*Math.pow(Math.max(0,1-Math.pow(Math.abs(x)/Math.max(.001,p.x),2.7)),1/2.7);
  }
  surface(chest,'Button placket',shirtFold,8,32,(u,v)=>{const x=(u*2-1)*.035,y=4.08-v*1.59;return [x,y,shirtFront(x,y)+.012];},true);
  for(const y of [3.96,3.65,3.34,3.03,2.72])orb(chest,'Ivory shirt button',shirtButton,[0,y,shirtFront(0,y)+.030],[.026,.026,.012]);
  surface(chest,'Casual chest pocket',shirtFold,24,16,(u,v)=>{
    const x=-.365+(u*2-1)*.155,y=3.895-v*.265;
    return [x,y,shirtFront(x,y)+.013+.015*Math.sin(u*Math.PI)*Math.sin(v*Math.PI)];
  },true);
  const pocketEdge=Array.from({length:7},(_,i)=>{const x=-.52+i*.31/6,y=3.895;return [x,y,shirtFront(x,y)+.023];});
  const pocketStitch=tube(chest,'Pocket top seam',shirtSeam,pocketEdge,.006);pocketStitch.castShadow=false;pocketStitch.receiveShadow=false;
  orb(body,'Fuller trouser seat',trouser,[0,2.49,-.02],[.705,.36,.565]);
  const arms=[];
  for(const s of [-1,1]) {
    const arm=group(chest,s<0?'Left arm':'Right arm',s*.755,4.18,0);arm.rotation.z=s*.17;arms.push(arm);
    volume(arm,'Relaxed shirt sleeve',shirt,[[0,.045,0],[.16,.025,.215],[.248,-.12,.345],[.25,-.44,.352],[.237,-.78,.33],[.215,-1.055,.303],[0,-1.095,0]],2.45);
    volume(arm,'Rolled sleeve cuff',shirtFold,[[0,-1.18,0],[.16,-1.178,.242],[.235,-1.143,.322],[.25,-1.065,.337],[.245,-.984,.331],[.212,-.968,.30],[0,-.965,0]],2.5);
    volume(arm,'Forearm',skin,[[0,-1.67,0],[.12,-1.666,.158],[.16,-1.63,.208],[.185,-1.40,.244],[.199,-1.16,.273],[.16,-1.125,.228],[0,-1.12,0]],2.5);
    orb(arm,'Wrist',skin,[0,-1.667,0],[.154,.083,.201]);
    const hand=group(arm,'Hand',0,-1.79,.022);
    orb(hand,'Rounded palm',skin,[s*.007,0,0],[.198,.242,.201]);
    const thumb=orb(hand,'Thumb',skin,[-s*.12,.035,.072],[.083,.129,.084]);thumb.rotation.z=-s*.26;
  }
  const legs=[];
  for(const s of [-1,1]) {
    const hip=group(body,s<0?'Left hip joint':'Right hip joint',s*.355,2.48,0);
    const leg=group(hip,s<0?'Left leg':'Right leg',0,-2.48,0);legs.push(hip);
    // Original segmented design with the fuller side depth retained.
    leg.scale.z=1.4;
    volume(leg,'Upper trouser leg',trouser,[[0,1.49,0],[.23,1.50,.255],[.318,1.64,.295],[.331,2.07,.313],[.323,2.39,.307],[.28,2.53,.285],[0,2.55,0]],2.9);
    orb(leg,'Soft articulated knee',kneeMat,[0,1.315,.012],[.323,.222,.309]);
    volume(leg,'Lower trouser leg',trouser,[[0,.43,0],[.21,.44,.225],[.303,.55,.288],[.308,.89,.29],[.30,1.16,.29],[.23,1.20,.24],[0,1.21,0]],3.0);
    tube(leg,'Outer trouser seam',kneeMat,[[s*.302,.61,-.018],[s*.312,.88,-.018],[s*.302,1.12,-.018]],.007);
    box(leg,'Rubber outsole',sole,[0,.095,.14],[.655,.16,.94],.24);
    box(leg,'Sole welt',shoe,[0,.171,.142],[.665,.092,.941],.28);
    box(leg,'Sneaker upper',shoe,[0,.287,.132],[.63,.295,.88],.40);
    orb(leg,'Rounded toe cap',shoe,[0,.266,.397],[.300,.152,.242]);
    box(leg,'Padded shoe tongue',shoe,[0,.403,.106],[.345,.102,.392],.36);
    for(let i=0;i<3;i++)tube(leg,'Cotton shoelace',sole,[[-.135,.424-i*.022,.04+i*.115],[0,.456-i*.024,.051+i*.115],[.135,.424-i*.022,.04+i*.115]],.024);
    tube(leg,'Toe cap stitching',sole,[[-.254,.265,.44],[-.211,.34,.50],[0,.372,.543],[.211,.34,.50],[.254,.265,.44]],.006);
  }
  const head=group(chest,'Head pivot',0,5.27,0);
  const headSurface=group(head,'Head',0,-5.27,0);
  const headSegments=96,faceCenter=5.30;
  function aperture(t){const a=t*Math.PI*2,c=Math.cos(a),s=Math.sin(a);return [s*.602*(1-.17*Math.max(c,0))*(1+.035*Math.max(-c,0)),faceCenter+.58*c+.075*Math.pow(Math.max(c,0),4),.405-.235*s*s-.025*c];}
  // Match the boundary sampling across face, fabric and turned edge.
  // Averaged seam/pole normals remove lighting cracks in the rounded head.
  function smoothHeadSeams(part,U,V){
    const p=part.geometry.attributes.position,n=part.geometry.attributes.normal;
    function average(ids){let x=0,y=0,z=0;for(const i of ids){x+=n.getX(i);y+=n.getY(i);z+=n.getZ(i);}const l=Math.hypot(x,y,z)||1;for(const i of ids)n.setXYZ(i,x/l,y/l,z/l);}
    for(let j=0;j<=V;j++)average([j*(U+1),j*(U+1)+U]);
    for(const row of [0,V]){const first=row*(U+1),ids=Array.from({length:U+1},(_,i)=>first+i);if(ids.every(i=>Math.hypot(p.getX(i)-p.getX(first),p.getY(i)-p.getY(first),p.getZ(i)-p.getZ(first))<1e-6))average(ids);}
    n.needsUpdate=true;return part;
  }
  function faceDepth(x,y){
    if(Math.hypot(x,y-faceCenter)<1e-8)return .611;
    const angle=Math.atan2(Math.abs(x),y-faceCenter);let lo=0,hi=Math.PI;
    for(let i=0;i<24;i++){const mid=(lo+hi)/2,e=aperture(mid/(2*Math.PI));if(Math.atan2(e[0],e[1]-faceCenter)<angle)lo=mid;else hi=mid;}
    const e=aperture((lo+hi)/(4*Math.PI)),r=Math.min(1,Math.hypot(x,y-faceCenter)/Math.hypot(e[0],e[1]-faceCenter));
    return e[2]-.024+(.635-e[2])*(1-r*r);
  }
  smoothHeadSeams(surface(headSurface,'Rounded cheeks and chin',skin,headSegments,40,(u,r)=>{
    const e=aperture(u);return [e[0]*r,faceCenter+(e[1]-faceCenter)*r,e[2]-.024+(.635-e[2])*(1-r*r)];
  }),headSegments,40);
  const onFace=(points,lift=.009)=>points.map(([x,y])=>[x,y,faceDepth(x,y)+lift]);
  function faceLine(name,mat,points,r,lift=.009){const part=tube(headSurface,name,mat,onFace(points,lift),r);part.castShadow=false;part.receiveShadow=false;return part;}
  for(const s of [-1,1]) {
    const x=s*.248,y=5.375,z=faceDepth(x,y)+.017;
    orb(headSurface,'Glossy oval eye',eye,[x,y,z],[.069,.086,.048]);
    orb(headSurface,'Eye catchlight',white,[x-.016,y+.030,z+.042],[.017,.020,.009]);
    orb(headSurface,'Small eye reflection',white,[x+.019,y-.026,z+.040],[.006,.006,.004]);
    faceLine('Arched eyebrow',brow,[[s*.155,5.564],[s*.208,5.579],[s*.270,5.577],[s*.333,5.558]],.019);
  }
  orb(headSurface,'Button nose',noseMat,[0,5.218,faceDepth(0,5.218)+.018],[.069,.074,.068]);
  // A small smiling mouth, with its lower lip blended into the face.
  faceLine('Smile',mouth,[[-.113,5.025],[-.063,5.007],[0,5.001],[.063,5.007],[.113,5.025]],.012);
  const lip=material('Lower lip','#d79072');
  faceLine('Lower lip',lip,[[-.077,4.998],[0,4.982],[.077,4.998]],.011,.008);
  // A continuous open-front cloth shell: the boundary is sculpted to the face.
  smoothHeadSeams(surface(headSurface,'Sculpted hijab shell',fabric,headSegments,48,(u,v)=>{
    const t=u*Math.PI*2,e=aperture(u),a=.98+v*(Math.PI-.98),blend=Math.pow(1-v,4);
    const side=Math.abs(Math.sin(t));
    const ridgeCenter=.19+.23*Math.pow((1-Math.cos(t))/2,.8);
    const folds=(.060*Math.exp(-Math.pow((v-ridgeCenter)/.09,2))-.020*Math.exp(-Math.pow((v-ridgeCenter-.10)/.05,2)))*side*Math.sin(v*Math.PI);
    return [.758*Math.sin(a)*Math.sin(t)+blend*(e[0]-.758*Math.sin(.98)*Math.sin(t))+Math.sin(t)*folds,
      5.39+.80*Math.sin(a)*Math.cos(t)+blend*(e[1]-5.39-.80*Math.sin(.98)*Math.cos(t)),
      .04+.77*Math.cos(a)+blend*(e[2]-.04-.77*Math.cos(.98))+folds*.7];
  }),headSegments,48);
  // Turned-under edge gives the opening thickness without a bulky rope border.
  smoothHeadSeams(surface(headSurface,'Soft folded face opening',fabric,headSegments,6,(u,v)=>{const e=aperture(u),a=u*Math.PI*2;return [e[0]-.025*Math.sin(a)*v,e[1]-.025*Math.cos(a)*v,e[2]+.010*Math.sin(v*Math.PI)-.004*v];}),headSegments,6);
  function scarfPoint(profile,u,v,inset=0) {
    const [y,height,rx,rz,dip]=profile,a=u*Math.PI*2,c=Math.cos(a),s=Math.sin(a),front=Math.max(c,0);
    const bulge=.055*Math.sin(v*Math.PI),r=rx+.028*v+bulge;
    return [s*(r-inset),y-v*height-dip*Math.pow(front,1.8)-.025*s*Math.sin(v*Math.PI),c*(rz+bulge-inset)+.018];
  }
  const scarfLayers=[
    {name:'Inner neck coverage',mat:fold,profile:[4.91,.39,.535,.355,.10]},
    {name:'Upper scarf wrap',mat:fabric,profile:[4.83,.31,.608,.405,.12]},
    {name:'Shoulder scarf drape',mat:fabric,profile:[4.72,.29,.738,.610,.30]},
    {name:'Lower scarf fold',mat:fabric,profile:[4.55,.22,.77,.710,.29]},
  ];
  // Continuous fabric between the overlapping folds closes the collar from
  // above and behind. Each end is tucked under a fold, away from its surface.
  for(let i=1;i<scarfLayers.length;i++){
    const upper=scarfLayers[i-1].profile,lower=scarfLayers[i].profile;
    smoothHeadSeams(surface(chest,'Continuous scarf fabric '+i,fabric,80,6,(u,v)=>{
      const a=scarfPoint(upper,u,.80,.014),b=scarfPoint(lower,u,.20,.014),angle=u*Math.PI*2,dip=.010*Math.sin(v*Math.PI);
      return [a[0]+(b[0]-a[0])*v-Math.sin(angle)*dip,
        a[1]+(b[1]-a[1])*v-.010*Math.sin(v*Math.PI),
        a[2]+(b[2]-a[2])*v-Math.cos(angle)*dip];
    },true),80,6);
  }
  for(const layer of scarfLayers)smoothHeadSeams(surface(chest,layer.name,layer.mat,80,16,(u,v)=>scarfPoint(layer.profile,u,v),true),80,16);
  // Optional glasses are constructed once, then shown/hidden without rebuilding.
  const glasses=group(headSurface,'Optional glasses');glasses.visible=false;
  const frameMat=material('Glasses frames','#344149',.48);
  const lensMat=material('Clear lenses','#c5e0e4',.15);
  Object.assign(lensMat,{transparent:true,opacity:.075,depthWrite:false});
  const glintMat=material('Lens reflections','#ffffff',.25);
  Object.assign(glintMat,{transparent:true,opacity:.32,depthWrite:false});
  const glassesZ=x=>.728-.16*Math.abs(x);
  for(const s of [-1,1]){
    const cx=s*.25,cy=5.382,w=.35,h=.25,c=.045;
    const outline=[[-w/2+c,h/2],[w/2-c,h/2],[w/2,h/2-c],[w/2,-h/2+c],[w/2-c,-h/2],[-w/2+c,-h/2],[-w/2,-h/2+c],[-w/2,h/2-c]];
    const curve=new T.CatmullRomCurve3(outline.map(([x,y])=>new T.Vector3(cx+x,cy+y,glassesZ(cx+x))),true);
    mesh(glasses,'Rounded glasses frame',new T.TubeGeometry(curve,48,.014,6,true),frameMat);
    smoothHeadSeams(surface(glasses,'Clear eyeglass lens',lensMat,48,6,(u,v)=>{const p=curve.getPoint(u),x=cx+(p.x-cx)*v,y=cy+(p.y-cy)*v;return [x,y,glassesZ(x)-.003];}),48,6);
    tube(glasses,'Glasses temple',frameMat,[[s*.425,5.407,glassesZ(.425)],[s*.5,5.416,.54],[s*.55,5.427,.35],[s*.577,5.43,.20]],.012);
    tube(glasses,'Lens corner reflection',glintMat,[[cx-.115,cy+.072,glassesZ(cx-.115)+.004],[cx-.082,cy+.086,glassesZ(cx-.082)+.004]],.003);
  }
  tube(glasses,'Glasses bridge',frameMat,[[-.079,5.414,glassesZ(.079)],[0,5.435,.727],[.079,5.414,glassesZ(.079)]],.013);
  glasses.traverse(part=>{if(part.isMesh){part.castShadow=false;part.receiveShadow=false;}});
  const api={root,body,head,chest,arms,legs,materials,glasses,
    setScarfColor(hex){fabric.color.set(hex);fold.color.set(hex).multiplyScalar(.82);},
    setShirtColor(hex){shirt.color.set(hex);shirtFold.color.set(hex).lerp(new T.Color('#ffffff'),.14);shirtSeam.color.set(hex).multiplyScalar(.88);},
    setPantsColor(hex){trouser.color.set(hex);kneeMat.color.set(hex).multiplyScalar(1.08);},
    setGlasses(enabled){glasses.visible=Boolean(enabled);},
  };
  return api;
}