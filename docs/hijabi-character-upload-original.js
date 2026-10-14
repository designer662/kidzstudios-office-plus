export function createHijabiCharacter(T, color = '#d9796d') {
  const root = new T.Group(); root.name = 'KidzStudios — Plain long shirt';
  const materials = {};
  function material(name,hex,roughness=.82) {
    const m = new T.MeshStandardMaterial({color:hex,roughness,metalness:0,side:T.DoubleSide});
    m.name=name; materials[name]=m; return m;
  }
  const fabric=material('Hijab fabric',color), fold=material('Fold undersides','#c96b60');
  const shirt=material('Plain ivory long shirt','#dcd3bf',.92);
  const skin=material('Warm skin','#f2bc94',.71), noseMat=material('Nose','#f1b890',.72);
  const trouser=material('Charcoal twill','#42474b'), kneeMat=material('Knees','#464b4e');
  const sole=material('Shoe soles','#eeede7',.81), shoe=material('White leather','#faf9f5',.67);
  const eye=material('Eyes','#252b2b',.23);
  const brow=material('Eyebrows','#363530'), mouth=material('Smile','#a85e50');
  const white=material('Eye highlights','#ffffff',.20);
  const sphere=new T.SphereGeometry(1,56,40);
  function group(parent,name,x=0,y=0,z=0){const g=new T.Group();g.name=name;g.position.set(x,y,z);parent.add(g);return g;}
  function mesh(parent,name,geo,mat,pos=[0,0,0],scale=[1,1,1]) {
    const m=new T.Mesh(geo,mat);m.name=name;m.position.set(...pos);m.scale.set(...scale);
    m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;
  }
  const orb=(p,n,m,pos,s)=>mesh(p,n,sphere,m,pos,s);
  function box(p,n,m,pos,s,r=.16) {return mesh(p,n,new T.RoundedBoxGeometry(1,1,1,5,r),m,pos,s);}
  function tube(p,n,m,points,r=.015){return mesh(p,n,new T.TubeGeometry(new T.CatmullRomCurve3(points.map(v=>new T.Vector3(...v))),64,r,10,false),m);}
  function surface(p,n,m,U,V,fn,reverse=false) {
    const vertices=[],indices=[],uv=[];
    for(let j=0;j<=V;j++)for(let i=0;i<=U;i++){vertices.push(...fn(i/U,j/V));uv.push(i/U,j/V);}
    for(let j=0;j<V;j++)for(let i=0;i<U;i++){const a=j*(U+1)+i,b=a+1,c=a+U+1,d=c+1;if(reverse)indices.push(a,c,b,b,c,d);else indices.push(a,b,c,b,d,c);}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();
    return mesh(p,n,g,m);
  }
  // Closed softly squared tailored volumes, with smoothly interpolated profiles.
  function volume(p,n,m,profile,exponent=2.4) {
    const c=new T.CatmullRomCurve3(profile.map(v=>new T.Vector3(v[0],v[1],v[2])));
    return surface(p,n,m,80,56,(u,v)=>{const q=c.getPoint(v),a=u*Math.PI*2;
      const sx=Math.sin(a),sz=Math.cos(a),pow=2/exponent;
      return [Math.sign(sx)*Math.pow(Math.abs(sx),pow)*Math.max(0,q.x),q.y,Math.sign(sz)*Math.pow(Math.abs(sz),pow)*Math.max(0,q.z)];});
  }
  const body=group(root,'Body');
  const chest=group(body,'Chest');
  // A single uninterrupted long shirt. Its generous depth is visible in profile.
  // Smoothly rounded chest, abdomen and hips retain a soft toy-like silhouette.
  volume(chest,'Plain long shirt',shirt,[[0,2.16,0],[.54,2.175,.49],[.745,2.235,.65],[.77,2.43,.682],[.77,2.79,.716],[.741,3.19,.70],[.717,3.60,.68],[.725,3.97,.65],[.721,4.19,.575],[.45,4.41,.385],[0,4.45,0]],2.7);
  orb(body,'Fuller trouser seat',trouser,[0,2.49,-.02],[.705,.36,.565]);
  const arms=[];
  for(const s of [-1,1]) {
    const arm=group(chest,s<0?'Left arm':'Right arm',s*.755,4.18,0);arm.rotation.z=s*.17;arms.push(arm);
    volume(arm,'Plain long sleeve',shirt,[[0,.045,0],[.16,.025,.215],[.248,-.12,.345],[.25,-.44,.352],[.233,-.87,.328],[.217,-1.21,.302],[.198,-1.55,.275],[.16,-1.63,.235],[0,-1.635,0]],2.45);
    orb(arm,'Wrist',skin,[0,-1.667,0],[.154,.083,.201]);
    const hand=group(arm,'Hand',0,-1.79,.022);
    orb(hand,'Rounded palm',skin,[s*.007,0,0],[.198,.242,.201]);
    const thumb=orb(hand,'Thumb',skin,[-s*.12,.035,.072],[.083,.129,.084]);thumb.rotation.z=-s*.26;
  }
  const legs=[];
  for(const s of [-1,1]) {
    const leg=group(body,s<0?'Left leg':'Right leg',s*.355,0,0);legs.push(leg);
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
  surface(head,'Smooth rounded face',skin,144,64,(u,v)=>{
    const e=aperture(u),r=Math.sin(v*Math.PI/2),bulge=Math.cos(v*Math.PI/2);
    return [e[0]*r,5.285+(e[1]-5.285)*r,e[2]-.012+(.617-e[2])*bulge];
  });
  for(const s of [-1,1]) {
    orb(head,'Glossy oval eye',eye,[s*.248,5.375,.550],[.069,.086,.048]);
    orb(head,'Eye catchlight',white,[s*.248-.016,5.405,.592],[.017,.020,.009]);
    orb(head,'Small eye reflection',white,[s*.248+.019,5.349,.59],[.006,.006,.004]);
    tube(head,'Arched eyebrow',brow,[[s*.154,5.570,.564],[s*.246,5.588,.553],[s*.343,5.564,.520]],.021);
  }
  orb(head,'Button nose',noseMat,[0,5.218,.586],[.074,.078,.079]);
  // A small smiling mouth, with its lower lip blended into the face.
  tube(head,'Smile',mouth,[[-.113,5.009,.592],[-.063,4.987,.603],[0,4.981,.610],[.063,4.987,.603],[.113,5.009,.592]],.014);
  const lip=material('Lower lip','#d79072');
  tube(head,'Lower lip',lip,[[-.078,4.981,.597],[0,4.963,.606],[.078,4.981,.597]],.012);
  function aperture(t){const a=t*Math.PI*2,c=Math.cos(a),s=Math.sin(a);return [s*.591*(1-.21*Math.max(c,0)),5.295+.63*c+.071*Math.pow(Math.max(c,0),6),.42-.28*s*s-.035*c];}
  // A continuous open-front cloth shell: the boundary is sculpted to the face.
  surface(head,'Sculpted hijab shell',fabric,144,76,(u,v)=>{
    const t=u*Math.PI*2,e=aperture(u),a=.98+v*(Math.PI-.98),blend=Math.pow(1-v,4);
    const side=Math.abs(Math.sin(t));
    const ridgeCenter=.19+.23*Math.pow((1-Math.cos(t))/2,.8);
    const folds=(.060*Math.exp(-Math.pow((v-ridgeCenter)/.09,2))-.020*Math.exp(-Math.pow((v-ridgeCenter-.10)/.05,2)))*side*Math.sin(v*Math.PI);
    return [.758*Math.sin(a)*Math.sin(t)+blend*(e[0]-.758*Math.sin(.98)*Math.sin(t))+Math.sin(t)*folds,
      5.39+.80*Math.sin(a)*Math.cos(t)+blend*(e[1]-5.39-.80*Math.sin(.98)*Math.cos(t)),
      .04+.77*Math.cos(a)+blend*(e[2]-.04-.77*Math.cos(.98))+folds*.7];
  });
  // Turned-under edge gives the opening thickness without a bulky rope border.
  surface(head,'Turned hijab face edge',fold,144,12,(u,v)=>{const e=aperture(u),a=u*Math.PI*2;return [e[0]-.014*Math.sin(a)*Math.sin(v*Math.PI),e[1]-.013*Math.cos(a)*Math.sin(v*Math.PI),e[2]-.034*v];});
  function scarfBand(name,mat,y,height,rx,rz,dip) {
    return surface(chest,name,mat,128,28,(u,v)=>{
      const a=u*Math.PI*2,c=Math.cos(a),front=Math.max(c,0);
      const bulge=.055*Math.sin(v*Math.PI),r=rx+.028*v+bulge;
      return [Math.sin(a)*r,y-v*height-dip*Math.pow(front,1.8)-.025*Math.sin(a)*Math.sin(v*Math.PI),c*(rz+bulge)+.018];
    },true);
  }
  scarfBand('Inner neck coverage',fold,4.91,.39,.535,.355,.10);
  scarfBand('Upper scarf wrap',fabric,4.83,.31,.608,.405,.12);
  scarfBand('Shoulder scarf drape',fabric,4.72,.29,.738,.610,.30);
  scarfBand('Lower scarf fold',fabric,4.55,.22,.77,.710,.29);
  const api={root,head,chest,arms,legs,materials,setScarfColor(hex){fabric.color.set(hex);fold.color.set(hex).multiplyScalar(.82);}};
  return api;
}