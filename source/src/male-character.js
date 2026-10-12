// V86.8 user-supplied male semi-casual geometry. Office Plus adaptation: animated hip pivots.
export function createMaleCharacter(T, color = '#3b2a23') {
  const root = new T.Group(); root.name = 'KidzStudios — Male semi-casual';
  const materials = {};
  function material(name,hex,roughness=.82) {
    const m = new T.MeshStandardMaterial({color:hex,roughness,metalness:0,side:T.DoubleSide});
    m.name=name; materials[name]=m; return m;
  }
  const hair=material('Short hair',color,.86),earMat=material('Inner ears','#dda27e',.82);
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
  surface(chest,'Button placket',shirtFold,8,32,(u,v)=>{const x=(u*2-1)*.035,y=4.35-v*1.86;return [x,y,shirtFront(x,y)+.012];},true);
  for(const y of [4.22,3.96,3.65,3.34,3.03,2.72])orb(chest,'Ivory shirt button',shirtButton,[0,y,shirtFront(0,y)+.030],[.026,.026,.012]);
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
  const head=group(chest,'Head');
  function smoothHeadSeams(part,U,V){
    const p=part.geometry.attributes.position,n=part.geometry.attributes.normal;
    function average(ids){let x=0,y=0,z=0;for(const i of ids){x+=n.getX(i);y+=n.getY(i);z+=n.getZ(i);}const l=Math.hypot(x,y,z)||1;for(const i of ids)n.setXYZ(i,x/l,y/l,z/l);}
    for(let j=0;j<=V;j++)average([j*(U+1),j*(U+1)+U]);
    for(const row of [0,V]){const first=row*(U+1),ids=Array.from({length:U+1},(_,i)=>first+i);if(ids.every(i=>Math.hypot(p.getX(i)-p.getX(first),p.getY(i)-p.getY(first),p.getZ(i)-p.getZ(first))<1e-6))average(ids);}
    n.needsUpdate=true;return part;
  }
  orb(head,'Rounded male head',skin,[0,5.32,0],[.66,.735,.64]);
  orb(chest,'Neck',skin,[0,4.60,-.015],[.224,.35,.215]);
  for(const s of [-1,1]){
    orb(head,'Ear',skin,[s*.656,5.315,-.012],[.107,.154,.092]);
    orb(head,'Inner ear',earMat,[s*.689,5.32,.058],[.045,.082,.013]);
  }
  function faceDepth(x,y){return .64*Math.sqrt(Math.max(0,1-Math.pow(x/.66,2)-Math.pow((y-5.32)/.735,2)));}
  function faceLine(name,mat,points,r,lift=.01){const part=tube(head,name,mat,points.map(([x,y])=>[x,y,faceDepth(x,y)+lift]),r);part.castShadow=false;part.receiveShadow=false;return part;}
  for(const s of [-1,1]){
    const x=s*.248,y=5.375,z=faceDepth(x,y)+.016;
    orb(head,'Glossy oval eye',eye,[x,y,z],[.067,.084,.047]);
    orb(head,'Eye catchlight',white,[x-.016,y+.029,z+.042],[.017,.02,.009]);
    orb(head,'Small eye reflection',white,[x+.018,y-.025,z+.038],[.006,.006,.004]);
    faceLine('Arched eyebrow',brow,[[s*.153,5.575],[s*.21,5.59],[s*.278,5.586],[s*.344,5.565]],.024);
  }
  orb(head,'Button nose',noseMat,[0,5.21,faceDepth(0,5.21)+.023],[.076,.08,.072]);
  faceLine('Smile',mouth,[[-.12,5.017],[-.064,4.996],[0,4.990],[.064,4.996],[.12,5.017]],.013);
  const lip=material('Lower lip','#d79072');
  faceLine('Lower lip',lip,[[-.078,4.983],[0,4.97],[.078,4.983]],.011,.008);
  // Modern cuts: skin-blended close sides, an open forehead, and a sculpted top.
  const hairHighlight=material('Hair lock highlights',color,.90);
  const fadeMat=material('Tapered side fade','#ffffff',.96);fadeMat.vertexColors=true;
  hair.vertexColors=true;
  const hairStyles={};
  function fadeEnd(u){
    const c=Math.cos(u*Math.PI*2),base=1.75+.36*Math.pow(Math.max(-c,0),2);
    let front=Math.max(0,Math.min(1,(c-.30)/.45));front=front*front*(3-2*front);
    return base*(1-front)+.96*front;
  }
  const fadeHolder=new T.Group();
  const fadePart=smoothHeadSeams(surface(fadeHolder,'Close tapered sides',fadeMat,80,32,(u,v)=>{
    const a=u*Math.PI*2,t=v*fadeEnd(u);
    return [.672*Math.sin(t)*Math.sin(a),5.32+.747*Math.cos(t),.651*Math.sin(t)*Math.cos(a)];
  }),80,32);
  const fadeGeometry=fadePart.geometry;
  fadeGeometry.setAttribute('color',new T.Float32BufferAttribute(new Float32Array(fadeGeometry.attributes.position.count*3),3));
  const officeSides=fadeGeometry.clone();
  function colorFade(hex){
    const colors=fadeGeometry.attributes.color,p=fadeGeometry.attributes.position,hairTint=new T.Color(hex),skinTint=new T.Color('#f2bc94');
    for(let i=0;i<p.count;i++){
      let blend=Math.max(0,Math.min(1,(p.getY(i)-5.02)/.75));blend=blend*blend*(3-2*blend);
      const tint=skinTint.clone().lerp(hairTint,blend);colors.setXYZ(i,tint.r,tint.g,tint.b);
      const officeTint=skinTint.clone().lerp(hairTint,.34+.66*blend);
      officeSides.attributes.color.setXYZ(i,officeTint.r,officeTint.g,officeTint.b);
    }
    colors.needsUpdate=true;
    officeSides.attributes.color.needsUpdate=true;
  }
  colorFade(color);
  function topHair(style,profile){
    const g=group(head,'Modern hairstyle — '+style);hairStyles[style]=g;g.visible=false;
    mesh(g,style==='sidepart'?'Neat short office sides':'Close tapered sides',style==='sidepart'?officeSides:fadeGeometry,fadeMat);
    const [height,texture,lift]=profile;
    const part=smoothHeadSeams(surface(g,'Sculpted '+style+' top',hair,96,40,(u,v)=>{
      const a=u*Math.PI*2,c=Math.cos(a),s=Math.sin(a),front=Math.max(c,0);
      let end=1.57+.05*Math.max(-c,0)-.28*Math.pow(front,3);
      if(style==='quiff')end-=.14*Math.pow(front,2);
      if(style==='sidepart')end+=.12*s*front;
      const t=v*end,edge=Math.pow(Math.sin(t),1.7);
      const ridge=texture*(.78*Math.sin(9*a+5*t)+.22*Math.sin(15*a-3*t))*edge;
      const sweep=lift*front*Math.sin(t)*Math.exp(-Math.pow((t-.65)/.42,2));
      const lean=(style==='sidepart'?-.045:-.075)*Math.pow(1-v,1.5);
      const sideSweep=-.060*s*Math.sin(t)*(1-v);
      const backTaper=.065*Math.max(-c,0)*Math.pow(Math.sin(t),2);
      const x=(.592+ridge*.65)*Math.sin(t)*s+lean,z=(.552+ridge*.45)*Math.sin(t)*c-.014;
      const partGroove=style==='sidepart'?.022*Math.exp(-Math.pow((x-.17-.10*z)/.027,2))*Math.pow(1-v,.35):0;
      return [x,5.69+height*Math.cos(t)+ridge+sweep+sideSweep-backTaper-partGroove,z];
    }),96,40);
    const count=part.geometry.attributes.position.count,colors=new Float32Array(count*3);
    for(let j=0;j<=40;j++)for(let i=0;i<=96;i++){
      const a=i/96*Math.PI*2,t=j/40,shine=.86+.14*Math.pow(Math.cos(a*9+t*5),2),k=(j*97+i)*3;
      const pos=part.geometry.attributes.position,index=j*97+i;
      const partShade=style==='sidepart'?1-.23*Math.exp(-Math.pow((pos.getX(index)-.17-.10*pos.getZ(index))/.027,2)):1;
      colors[k]=colors[k+1]=colors[k+2]=shine*partShade;
    }
    part.geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));
    return g;
  }
  topHair('fade',[.47,.026,.23]);
  topHair('quiff',[.53,.023,.40]);
  topHair('sidepart',[.42,.008,.10]);
  // Fuller Korean curtain cut, with a soft off-centre part and curved fringe.
  const korean=group(head,'Thick Korean curtain hairstyle');hairStyles.korean=korean;
  const koreanPart=smoothHeadSeams(surface(korean,'Full Korean hair and parted fringe',hair,112,48,(u,v)=>{
    const a=u*Math.PI*2,c=Math.cos(a),s=Math.sin(a),front=Math.max(c,0);
    const fringe=1.18-.29*Math.exp(-Math.pow((s-.10)/.17,2))+.055*s;
    let frontBlend=Math.max(0,Math.min(1,(c-.22)/.55));frontBlend=frontBlend*frontBlend*(3-2*frontBlend);
    const end=(1.74+.22*Math.max(-c,0))*(1-frontBlend)+fringe*frontBlend;
    const t=v*end,sin=Math.sin(t);
    const wave=.014*Math.sin(10*a+4*t)*Math.pow(sin,1.8);
    const x=(.735+wave)*sin*s-.025*Math.pow(1-v,2),z=(.707+wave)*sin*c;
    const groove=.035*Math.exp(-Math.pow((x-.065-.10*z)/.032,2))*Math.pow(1-v,.45);
    const curtainLift=.065*front*sin*Math.exp(-Math.pow((t-.70)/.42,2));
    return [x,5.32+.915*Math.cos(t)+curtainLift+wave-groove,z];
  }),112,48);
  const koreanColors=new Float32Array(koreanPart.geometry.attributes.position.count*3);
  const koreanPositions=koreanPart.geometry.attributes.position;
  for(let i=0;i<koreanPositions.count;i++){
    const x=koreanPositions.getX(i),z=koreanPositions.getZ(i);
    const partShade=1-.22*Math.exp(-Math.pow((x-.065-.10*z)/.033,2));
    const sheen=.93+.07*Math.cos(x*22+z*7);
    koreanColors[i*3]=koreanColors[i*3+1]=koreanColors[i*3+2]=partShade*sheen;
  }
  koreanPart.geometry.setAttribute('color',new T.Float32BufferAttribute(koreanColors,3));
  korean.visible=false;
  const messy=group(head,'Tousled messy hairstyle');hairStyles.messy=messy;
  const messyPart=smoothHeadSeams(surface(messy,'Tousled crown and irregular fringe',hair,112,48,(u,v)=>{
    const a=u*Math.PI*2,c=Math.cos(a),s=Math.sin(a),front=Math.max(c,0);
    const fringe=1.17+.09*Math.sin(9*a+.4)+.035*Math.sin(17*a);
    let frontBlend=Math.max(0,Math.min(1,(c-.20)/.58));frontBlend=frontBlend*frontBlend*(3-2*frontBlend);
    const end=(1.68+.24*Math.max(-c,0))*(1-frontBlend)+fringe*frontBlend;
    const t=v*end,sin=Math.sin(t);
    const texture=(.030*Math.sin(9*a+4*t)+.015*Math.sin(17*a-5*t))*Math.pow(sin,1.25);
    const x=(.726+texture)*sin*s-.025*Math.pow(1-v,2),z=(.695+texture)*sin*c;
    const tuft=.105*Math.exp(-Math.pow((x+.22)/.16,2)-Math.pow((z-.04)/.22,2))
      +.085*Math.exp(-Math.pow((x-.18)/.17,2)-Math.pow((z+.18)/.19,2));
    return [x,5.32+.89*Math.cos(t)+texture+tuft+.07*front*sin*Math.exp(-Math.pow((t-.75)/.4,2)),z];
  }),112,48);
  const messyColors=new Float32Array(messyPart.geometry.attributes.position.count*3);
  for(let j=0;j<=48;j++)for(let i=0;i<=112;i++){
    const a=i/112*Math.PI*2,t=j/48,shade=.91+.09*Math.cos(9*a+4*t),k=(j*113+i)*3;
    messyColors[k]=messyColors[k+1]=messyColors[k+2]=shade;
  }
  messyPart.geometry.setAttribute('color',new T.Float32BufferAttribute(messyColors,3));
  surface(chest,'Standing shirt collar',shirtFold,48,8,(u,v)=>{
    const a=u*Math.PI*2,r=.237+.025*Math.sin(v*Math.PI);
    return [Math.sin(a)*r,4.42+.17*v,Math.cos(a)*(r*.95)-.015];
  });
  for(const s of [-1,1]){
    const points=[[s*.065,4.57,.237],[s*.34,4.435,.35],[s*.285,4.11,shirtFront(s*.285,4.11)+.033],[s*.075,4.285,shirtFront(s*.075,4.285)+.03]];
    const center=[s*.185,4.345,.445],pos=[...center,...points.flat()],indices=s>0?[0,1,2,0,2,3,0,3,4,0,4,1]:[0,2,1,0,3,2,0,4,3,0,1,4];
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setIndex(indices);g.computeVertexNormals();mesh(chest,'Soft shirt collar point',g,shirtFold);
  }

  // Optional glasses are constructed once, then shown/hidden without rebuilding.
  const glasses=group(head,'Optional glasses');glasses.visible=false;
  const frameMat=material('Glasses frames','#344149',.48);
  const lensMat=material('Clear lenses','#c5e0e4',.15);
  Object.assign(lensMat,{transparent:true,opacity:.075,depthWrite:false});
  const glintMat=material('Lens reflections','#ffffff',.25);
  Object.assign(glintMat,{transparent:true,opacity:.32,depthWrite:false});
  const glassesZ=x=>.740-.13*Math.abs(x);
  for(const s of [-1,1]){
    const cx=s*.25,cy=5.382,w=.35,h=.25,c=.045;
    const outline=[[-w/2+c,h/2],[w/2-c,h/2],[w/2,h/2-c],[w/2,-h/2+c],[w/2-c,-h/2],[-w/2+c,-h/2],[-w/2,-h/2+c],[-w/2,h/2-c]];
    const curve=new T.CatmullRomCurve3(outline.map(([x,y])=>new T.Vector3(cx+x,cy+y,glassesZ(cx+x))),true);
    mesh(glasses,'Rounded glasses frame',new T.TubeGeometry(curve,48,.014,6,true),frameMat);
    smoothHeadSeams(surface(glasses,'Clear eyeglass lens',lensMat,48,6,(u,v)=>{const p=curve.getPoint(u),x=cx+(p.x-cx)*v,y=cy+(p.y-cy)*v;return [x,y,glassesZ(x)-.003];}),48,6);
    tube(glasses,'Glasses temple',frameMat,[[s*.425,5.407,glassesZ(.425)],[s*.535,5.422,.465],[s*.657,5.43,.04],[s*.648,5.37,-.105]],.012);
    tube(glasses,'Lens corner reflection',glintMat,[[cx-.115,cy+.072,glassesZ(cx-.115)+.004],[cx-.082,cy+.086,glassesZ(cx-.082)+.004]],.003);
  }
  tube(glasses,'Glasses bridge',frameMat,[[-.079,5.414,glassesZ(.079)],[0,5.435,.740],[.079,5.414,glassesZ(.079)]],.013);
  glasses.traverse(part=>{if(part.isMesh){part.castShadow=false;part.receiveShadow=false;}});
  // Scale around the head centre so features, ears, hair and glasses keep their fit.
  // The neck and shirt stay attached beneath the larger chibi head.
  for(const part of head.children)part.position.y-=5.32;
  head.position.y=5.38;head.scale.set(1.18,1.14,1.14);
  const api={root,body,head,chest,arms,legs,materials,glasses,
    setHairColor(hex){hair.color.set(hex);hairHighlight.color.set(hex);colorFade(hex);},
    hairStyles,
    setHairStyle(name){if(hairStyles[name])for(const [key,g] of Object.entries(hairStyles))g.visible=key===name;},
    setShirtColor(hex){shirt.color.set(hex);shirtFold.color.set(hex).lerp(new T.Color('#ffffff'),.14);shirtSeam.color.set(hex).multiplyScalar(.88);},
    setPantsColor(hex){trouser.color.set(hex);kneeMat.color.set(hex).multiplyScalar(1.08);},
    setGlasses(enabled){glasses.visible=Boolean(enabled);},
  };
  return api;
}