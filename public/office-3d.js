(()=>{var ri={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},oi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},pc=0,ja=1,mc=2;var Qa=1,uo=2,wn=3,Fn=0,ke=1,ln=2,Bn=0,mi=1,tl=2,el=3,nl=4,gc=5,Kn=100,_c=101,xc=102,yc=103,vc=104,Mc=200,bc=201,Sc=202,Ec=203,Br=204,zr=205,Tc=206,wc=207,Ac=208,Rc=209,Cc=210,Pc=211,Ic=212,Dc=213,Lc=214,fo=0,po=1,mo=2,gi=3,go=4,_o=5,xo=6,yo=7,il=0,Uc=1,Nc=2,zn=0,Fc=1,Oc=2,Bc=3,vo=4,zc=5,kc=6,Hc=7;var sl=300,Ti=301,wi=302,Mo=303,bo=304,lr=306,kr=1e3,Jn=1001,Hr=1002,on=1003,Vc=1004;var cr=1005;var gn=1006,So=1007;var ai=1008;var yn=1009,rl=1010,ol=1011,cs=1012,Eo=1013,li=1014,An=1015,hs=1016,To=1017,wo=1018,us=1020,al=35902,ll=35899,cl=1021,hl=1022,cn=1023,Ji=1026,ds=1027,ul=1028,Ao=1029,dl=1030,Ro=1031;var Co=1033,hr=33776,ur=33777,dr=33778,fr=33779,Po=35840,Io=35841,Do=35842,Lo=35843,Uo=36196,No=37492,Fo=37496,Oo=37808,Bo=37809,zo=37810,ko=37811,Ho=37812,Vo=37813,Go=37814,Wo=37815,Xo=37816,qo=37817,Yo=37818,Zo=37819,$o=37820,Jo=37821,Ko=36492,jo=36494,Qo=36495,ta=36283,ea=36284,na=36285,ia=36286;var Cs=2300,Vr=2301,Or=2302,ka=2400,Ha=2401,Va=2402;var Gc=3200,Wc=3201;var fl=0,Xc=1,kn="",Be="srgb",_i="srgb-linear",Ps="linear",ce="srgb";var pi=7680;var Ga=519,qc=512,Yc=513,Zc=514,pl=515,$c=516,Jc=517,Kc=518,jc=519,Wa=35044;var ml="300 es",mn=2e3,Is=2001;var Mn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vl=1234567,Ts=Math.PI/180,Ki=180/Math.PI;function Ai(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[i&255]+Ie[i>>8&255]+Ie[i>>16&255]+Ie[i>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Kt(i,t,e){return Math.max(t,Math.min(e,i))}function gl(i,t){return(i%t+t)%t}function su(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function ru(i,t,e){return i!==t?(e-i)/(t-i):0}function ws(i,t,e){return(1-e)*i+e*t}function ou(i,t,e,n){return ws(i,t,1-Math.exp(-e*n))}function au(i,t=1){return t-Math.abs(gl(i,t*2)-t)}function lu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function cu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function hu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function uu(i,t){return i+Math.random()*(t-i)}function du(i){return i*(.5-Math.random())}function fu(i){i!==void 0&&(Vl=i);let t=Vl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function pu(i){return i*Ts}function mu(i){return i*Ki}function gu(i){return(i&i-1)===0&&i!==0}function _u(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function xu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yu(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*d,c*u,a*l);break;case"YZY":i.set(c*u,a*h,c*d,a*l);break;case"ZXZ":i.set(c*d,c*u,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Zi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Oe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Hn={DEG2RAD:Ts,RAD2DEG:Ki,generateUUID:Ai,clamp:Kt,euclideanModulo:gl,mapLinear:su,inverseLerp:ru,lerp:ws,damp:ou,pingpong:au,smoothstep:lu,smootherstep:cu,randInt:hu,randFloat:uu,randFloatSpread:du,seededRandom:fu,degToRad:pu,radToDeg:mu,isPowerOfTwo:gu,ceilPowerOfTwo:_u,floorPowerOfTwo:xu,setQuaternionFromProperEuler:yu,normalize:Oe,denormalize:Zi},rt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},an=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(d!==x||c!==u||l!==f||h!==g){let m=1-a,p=c*u+l*f+h*g+d*x,E=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let w=Math.sqrt(_),T=Math.atan2(w,p*E);m=Math.sin(m*T)/w,a=Math.sin(a*T)/w}let y=a*E;if(c=c*m+u*y,l=l*m+f*y,h=h*m+g*y,d=d*m+x*y,m===1-a){let w=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=w,l*=w,h*=w,d*=w}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-a*f,t[e+2]=l*g+h*f+a*u-c*d,t[e+3]=h*g-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),d=a(r/2),u=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Kt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=s+c*d+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ma.copy(this).projectOnVector(t),this.sub(ma)}reflect(t){return this.sub(ma.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ma=new D,Gl=new an,Zt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],E=s[1],_=s[4],y=s[7],w=s[2],T=s[5],C=s[8];return r[0]=o*x+a*E+c*w,r[3]=o*m+a*_+c*T,r[6]=o*p+a*y+c*C,r[1]=l*x+h*E+d*w,r[4]=l*m+h*_+d*T,r[7]=l*p+h*y+d*C,r[2]=u*x+f*E+g*w,r[5]=u*m+f*_+g*T,r[8]=u*p+f*y+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,u=a*c-h*r,f=l*r-o*c,g=e*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=u*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ga.makeScale(t,e)),this}rotate(t){return this.premultiply(ga.makeRotation(-t)),this}translate(t,e){return this.premultiply(ga.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ga=new Zt;function _l(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ds(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qc(){let i=Ds("canvas");return i.style.display="block",i}var Wl={};function ji(i){i in Wl||(Wl[i]=!0,console.warn(i))}function th(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Xl=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ql=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vu(){let i={enabled:!0,workingColorSpace:_i,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ce&&(s.r=Nn(s.r),s.g=Nn(s.g),s.b=Nn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ce&&(s.r=$i(s.r),s.g=$i(s.g),s.b=$i(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===kn?Ps:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ji("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ji("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[_i]:{primaries:t,whitePoint:n,transfer:Ps,toXYZ:Xl,fromXYZ:ql,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:t,whitePoint:n,transfer:ce,toXYZ:Xl,fromXYZ:ql,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}}),i}var se=vu();function Nn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $i(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Fi,Gr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Fi===void 0&&(Fi=Ds("canvas")),Fi.width=t.width,Fi.height=t.height;let s=Fi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Fi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ds("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Nn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Nn(e[n]/255)*255):e[n]=Nn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Mu=0,Qi=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=Ai(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(_a(s[o].image)):r.push(_a(s[o]))}else r=_a(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function _a(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var bu=0,xa=new D,Ke=class i extends Mn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Jn,s=Jn,r=gn,o=ai,a=cn,c=yn,l=i.DEFAULT_ANISOTROPY,h=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bu++}),this.uuid=Ai(),this.name="",this.source=new Qi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(xa).x}get height(){return this.source.getSize(xa).y}get depth(){return this.source.getSize(xa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case kr:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case Hr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case kr:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case Hr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=sl;Ke.DEFAULT_ANISOTROPY=1;var ve=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(l+1)/2,y=(f+1)/2,w=(p+1)/2,T=(h+u)/4,C=(d+x)/4,R=(g+m)/4;return _>y&&_>w?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=T/n,r=C/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=R/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=R/r),this.set(n,s,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(d-x)/E,this.z=(u-h)/E,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this.w=Kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this.w=Kt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wr=class extends Mn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new Ke(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:gn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Qi(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},bn=class extends Wr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ls=class extends Ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xr=class extends Ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var jn=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,dn):dn.fromBufferAttribute(r,o),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)),gr.applyMatrix4(t.matrixWorld),this.union(gr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vs),_r.subVectors(this.max,vs),Oi.subVectors(t.a,vs),Bi.subVectors(t.b,vs),zi.subVectors(t.c,vs),Gn.subVectors(Bi,Oi),Wn.subVectors(zi,Bi),hi.subVectors(Oi,zi);let e=[0,-Gn.z,Gn.y,0,-Wn.z,Wn.y,0,-hi.z,hi.y,Gn.z,0,-Gn.x,Wn.z,0,-Wn.x,hi.z,0,-hi.x,-Gn.y,Gn.x,0,-Wn.y,Wn.x,0,-hi.y,hi.x,0];return!ya(e,Oi,Bi,zi,_r)||(e=[1,0,0,0,1,0,0,0,1],!ya(e,Oi,Bi,zi,_r))?!1:(xr.crossVectors(Gn,Wn),e=[xr.x,xr.y,xr.z],ya(e,Oi,Bi,zi,_r))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Pn=[new D,new D,new D,new D,new D,new D,new D,new D],dn=new D,gr=new jn,Oi=new D,Bi=new D,zi=new D,Gn=new D,Wn=new D,hi=new D,vs=new D,_r=new D,xr=new D,ui=new D;function ya(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ui.fromArray(i,r);let a=s.x*Math.abs(ui.x)+s.y*Math.abs(ui.y)+s.z*Math.abs(ui.z),c=t.dot(ui),l=e.dot(ui),h=n.dot(ui);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Su=new jn,Ms=new D,va=new D,ts=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Su.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ms.subVectors(t,this.center);let e=Ms.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ms,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(va.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ms.copy(t.center).add(va)),this.expandByPoint(Ms.copy(t.center).sub(va))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},In=new D,Ma=new D,yr=new D,Xn=new D,ba=new D,vr=new D,Sa=new D,xi=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ma.copy(t).add(e).multiplyScalar(.5),yr.copy(e).sub(t).normalize(),Xn.copy(this.origin).sub(Ma);let r=t.distanceTo(e)*.5,o=-this.direction.dot(yr),a=Xn.dot(this.direction),c=-Xn.dot(yr),l=Xn.lengthSq(),h=Math.abs(1-o*o),d,u,f,g;if(h>0)if(d=o*c-a,u=o*a-c,g=r*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ma).addScaledVector(yr,u),f}intersectSphere(t,e){In.subVectors(t.center,this.origin);let n=In.dot(this.direction),s=In.dot(In)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,n,s,r){ba.subVectors(e,t),vr.subVectors(n,t),Sa.crossVectors(ba,vr);let o=this.direction.dot(Sa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Xn.subVectors(this.origin,t);let c=a*this.direction.dot(vr.crossVectors(Xn,vr));if(c<0)return null;let l=a*this.direction.dot(ba.cross(Xn));if(l<0||c+l>o)return null;let h=-a*Xn.dot(Sa);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ye=class i{constructor(t,e,n,s,r,o,a,c,l,h,d,u,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,d,u,f,g,x,m)}set(t,e,n,s,r,o,a,c,l,h,d,u,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ki.setFromMatrixColumn(t,0).length(),r=1/ki.setFromMatrixColumn(t,1).length(),o=1/ki.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,g=a*h,x=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-x*l,e[9]=-a*c,e[2]=x-u*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){let u=c*h,f=c*d,g=l*h,x=l*d;e[0]=u+x*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=x+u*a,e[10]=o*c}else if(t.order==="ZXY"){let u=c*h,f=c*d,g=l*h,x=l*d;e[0]=u-x*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=x-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let u=o*h,f=o*d,g=a*h,x=a*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+x,e[1]=c*d,e[5]=x*l+u,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let u=o*c,f=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=x-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-x*d}else if(t.order==="XZY"){let u=o*c,f=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+x,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Eu,t,Tu)}lookAt(t,e,n){let s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),qn.crossVectors(n,$e),qn.lengthSq()===0&&(Math.abs(n.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),qn.crossVectors(n,$e)),qn.normalize(),Mr.crossVectors($e,qn),s[0]=qn.x,s[4]=Mr.x,s[8]=$e.x,s[1]=qn.y,s[5]=Mr.y,s[9]=$e.y,s[2]=qn.z,s[6]=Mr.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],E=n[3],_=n[7],y=n[11],w=n[15],T=s[0],C=s[4],R=s[8],M=s[12],b=s[1],I=s[5],O=s[9],G=s[13],V=s[2],$=s[6],N=s[10],ot=s[14],W=s[3],pt=s[7],vt=s[11],wt=s[15];return r[0]=o*T+a*b+c*V+l*W,r[4]=o*C+a*I+c*$+l*pt,r[8]=o*R+a*O+c*N+l*vt,r[12]=o*M+a*G+c*ot+l*wt,r[1]=h*T+d*b+u*V+f*W,r[5]=h*C+d*I+u*$+f*pt,r[9]=h*R+d*O+u*N+f*vt,r[13]=h*M+d*G+u*ot+f*wt,r[2]=g*T+x*b+m*V+p*W,r[6]=g*C+x*I+m*$+p*pt,r[10]=g*R+x*O+m*N+p*vt,r[14]=g*M+x*G+m*ot+p*wt,r[3]=E*T+_*b+y*V+w*W,r[7]=E*C+_*I+y*$+w*pt,r[11]=E*R+_*O+y*N+w*vt,r[15]=E*M+_*G+y*ot+w*wt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*c*d-s*l*d-r*a*u+n*l*u+s*a*f-n*c*f)+x*(+e*c*f-e*l*u+r*o*u-s*o*f+s*l*h-r*c*h)+m*(+e*l*d-e*a*f-r*o*d+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*d+e*a*u+s*o*d-n*o*u+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],E=d*m*l-x*u*l+x*c*f-a*m*f-d*c*p+a*u*p,_=g*u*l-h*m*l-g*c*f+o*m*f+h*c*p-o*u*p,y=h*x*l-g*d*l+g*a*f-o*x*f-h*a*p+o*d*p,w=g*d*c-h*x*c-g*a*u+o*x*u+h*a*m-o*d*m,T=e*E+n*_+s*y+r*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/T;return t[0]=E*C,t[1]=(x*u*r-d*m*r-x*s*f+n*m*f+d*s*p-n*u*p)*C,t[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*p+n*c*p)*C,t[3]=(d*c*r-a*u*r-d*s*l+n*u*l+a*s*f-n*c*f)*C,t[4]=_*C,t[5]=(h*m*r-g*u*r+g*s*f-e*m*f-h*s*p+e*u*p)*C,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*C,t[7]=(o*u*r-h*c*r+h*s*l-e*u*l-o*s*f+e*c*f)*C,t[8]=y*C,t[9]=(g*d*r-h*x*r-g*n*f+e*x*f+h*n*p-e*d*p)*C,t[10]=(o*x*r-g*a*r+g*n*l-e*x*l-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*d*r-h*n*l+e*d*l+o*n*f-e*a*f)*C,t[12]=w*C,t[13]=(h*x*s-g*d*s+g*n*u-e*x*u-h*n*m+e*d*m)*C,t[14]=(g*a*s-o*x*s-g*n*c+e*x*c+o*n*m-e*a*m)*C,t[15]=(o*d*s-h*a*s+h*n*c-e*d*c-o*n*u+e*a*u)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,d=a+a,u=r*l,f=r*h,g=r*d,x=o*h,m=o*d,p=a*d,E=c*l,_=c*h,y=c*d,w=n.x,T=n.y,C=n.z;return s[0]=(1-(x+p))*w,s[1]=(f+y)*w,s[2]=(g-_)*w,s[3]=0,s[4]=(f-y)*T,s[5]=(1-(u+p))*T,s[6]=(m+E)*T,s[7]=0,s[8]=(g+_)*C,s[9]=(m-E)*C,s[10]=(1-(u+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ki.set(s[0],s[1],s[2]).length(),o=ki.set(s[4],s[5],s[6]).length(),a=ki.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],fn.copy(this);let l=1/r,h=1/o,d=1/a;return fn.elements[0]*=l,fn.elements[1]*=l,fn.elements[2]*=l,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=d,fn.elements[9]*=d,fn.elements[10]*=d,e.setFromRotationMatrix(fn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=mn,c=!1){let l=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),g,x;if(c)g=r/(o-r),x=o*r/(o-r);else if(a===mn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Is)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=mn,c=!1){let l=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s),g,x;if(c)g=1/(o-r),x=o/(o-r);else if(a===mn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===Is)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ki=new D,fn=new ye,Eu=new D(0,0,0),Tu=new D(1,1,1),qn=new D,Mr=new D,$e=new D,Yl=new ye,Zl=new an,_n=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Kt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zl.setFromEuler(this),this.setFromQuaternion(Zl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_n.DEFAULT_ORDER="XYZ";var es=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},wu=0,$l=new D,Hi=new an,Dn=new ye,br=new D,bs=new D,Au=new D,Ru=new an,Jl=new D(1,0,0),Kl=new D(0,1,0),jl=new D(0,0,1),Ql={type:"added"},Cu={type:"removed"},Vi={type:"childadded",child:null},Ea={type:"childremoved",child:null},Ue=class i extends Mn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new _n,n=new an,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ye},normalMatrix:{value:new Zt}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new es,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.premultiply(Hi),this}rotateX(t){return this.rotateOnAxis(Jl,t)}rotateY(t){return this.rotateOnAxis(Kl,t)}rotateZ(t){return this.rotateOnAxis(jl,t)}translateOnAxis(t,e){return $l.copy(t).applyQuaternion(this.quaternion),this.position.add($l.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Jl,t)}translateY(t){return this.translateOnAxis(Kl,t)}translateZ(t){return this.translateOnAxis(jl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?br.copy(t):br.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(bs,br,this.up):Dn.lookAt(br,bs,this.up),this.quaternion.setFromRotationMatrix(Dn),s&&(Dn.extractRotation(s.matrixWorld),Hi.setFromRotationMatrix(Dn),this.quaternion.premultiply(Hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ql),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Cu),Ea.child=t,this.dispatchEvent(Ea),Ea.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Dn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ql),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,t,Au),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,Ru,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ue.DEFAULT_UP=new D(0,1,0);Ue.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=new D,Ln=new D,Ta=new D,Un=new D,Gi=new D,Wi=new D,tc=new D,wa=new D,Aa=new D,Ra=new D,Ca=new ve,Pa=new ve,Ia=new ve,$n=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),pn.subVectors(t,e),s.cross(pn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){pn.subVectors(s,e),Ln.subVectors(n,e),Ta.subVectors(t,e);let o=pn.dot(pn),a=pn.dot(Ln),c=pn.dot(Ta),l=Ln.dot(Ln),h=Ln.dot(Ta),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(l*c-a*h)*u,g=(o*h-a*c)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Un.x),c.addScaledVector(o,Un.y),c.addScaledVector(a,Un.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Ca.setScalar(0),Pa.setScalar(0),Ia.setScalar(0),Ca.fromBufferAttribute(t,e),Pa.fromBufferAttribute(t,n),Ia.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ca,r.x),o.addScaledVector(Pa,r.y),o.addScaledVector(Ia,r.z),o}static isFrontFacing(t,e,n,s){return pn.subVectors(n,e),Ln.subVectors(t,e),pn.cross(Ln).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pn.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),pn.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Gi.subVectors(s,n),Wi.subVectors(r,n),wa.subVectors(t,n);let c=Gi.dot(wa),l=Wi.dot(wa);if(c<=0&&l<=0)return e.copy(n);Aa.subVectors(t,s);let h=Gi.dot(Aa),d=Wi.dot(Aa);if(h>=0&&d<=h)return e.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Gi,o);Ra.subVectors(t,r);let f=Gi.dot(Ra),g=Wi.dot(Ra);if(g>=0&&f<=g)return e.copy(r);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Wi,a);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return tc.subVectors(r,s),a=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(tc,a);let p=1/(m+x+u);return o=x*p,a=u*p,e.copy(n).addScaledVector(Gi,o).addScaledVector(Wi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},eh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},Sr={h:0,s:0,l:0};function Da(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Qt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=se.workingColorSpace){if(t=gl(t,1),e=Kt(e,0,1),n=Kt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Da(o,r,t+1/3),this.g=Da(o,r,t),this.b=Da(o,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=Be){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Be){let n=eh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Nn(t.r),this.g=Nn(t.g),this.b=Nn(t.b),this}copyLinearToSRGB(t){return this.r=$i(t.r),this.g=$i(t.g),this.b=$i(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Be){return se.workingToColorSpace(De.copy(this),t),Math.round(Kt(De.r*255,0,255))*65536+Math.round(Kt(De.g*255,0,255))*256+Math.round(Kt(De.b*255,0,255))}getHexString(t=Be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(De.copy(this),e);let n=De.r,s=De.g,r=De.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Be){se.workingToColorSpace(De.copy(this),t);let e=De.r,n=De.g,s=De.b;return t!==Be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Yn),this.setHSL(Yn.h+t,Yn.s+e,Yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Yn),t.getHSL(Sr);let n=ws(Yn.h,Sr.h,e),s=ws(Yn.s,Sr.s,e),r=ws(Yn.l,Sr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},De=new Qt;Qt.NAMES=eh;var Pu=0,On=class extends Mn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pu++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=mi,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Br,this.blendDst=zr,this.blendEquation=Kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ga,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==mi&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Br&&(n.blendSrc=this.blendSrc),this.blendDst!==zr&&(n.blendDst=this.blendDst),this.blendEquation!==Kn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ga&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Qn=class extends On{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Se=new D,Er=new rt,Iu=0,ze=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Iu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Wa,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Er.fromBufferAttribute(this,e),Er.applyMatrix3(t),this.setXY(e,Er.x,Er.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Zi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Oe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Zi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Zi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Zi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Zi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array),s=Oe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array),s=Oe(s,this.array),r=Oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Wa&&(t.usage=this.usage),t}};var Us=class extends ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ns=class extends ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var jt=class extends ze{constructor(t,e,n){super(new Float32Array(t),e,n)}},Du=0,sn=new ye,La=new Ue,Xi=new D,Je=new jn,Ss=new jn,Ce=new D,Ee=class i extends Mn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_l(t)?Ns:Us)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return La.lookAt(t),La.updateMatrix(),this.applyMatrix4(La.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new jt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ts);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Ss.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(Je.min,Ss.min),Je.expandByPoint(Ce),Ce.addVectors(Je.max,Ss.max),Je.expandByPoint(Ce)):(Je.expandByPoint(Ss.min),Je.expandByPoint(Ss.max))}Je.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ce.fromBufferAttribute(a,l),c&&(Xi.fromBufferAttribute(t,l),Ce.add(Xi)),s=Math.max(s,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ze(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<n.count;R++)a[R]=new D,c[R]=new D;let l=new D,h=new D,d=new D,u=new rt,f=new rt,g=new rt,x=new D,m=new D;function p(R,M,b){l.fromBufferAttribute(n,R),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,b),u.fromBufferAttribute(r,R),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,b),h.sub(l),d.sub(l),f.sub(u),g.sub(u);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(I),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),a[R].add(x),a[M].add(x),a[b].add(x),c[R].add(m),c[M].add(m),c[b].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let R=0,M=E.length;R<M;++R){let b=E[R],I=b.start,O=b.count;for(let G=I,V=I+O;G<V;G+=3)p(t.getX(G+0),t.getX(G+1),t.getX(G+2))}let _=new D,y=new D,w=new D,T=new D;function C(R){w.fromBufferAttribute(s,R),T.copy(w);let M=a[R];_.copy(M),_.sub(w.multiplyScalar(w.dot(M))).normalize(),y.crossVectors(T,M);let I=y.dot(c[R])<0?-1:1;o.setXYZW(R,_.x,_.y,_.z,I)}for(let R=0,M=E.length;R<M;++R){let b=E[R],I=b.start,O=b.count;for(let G=I,V=I+O;G<V;G+=3)C(t.getX(G+0)),C(t.getX(G+1)),C(t.getX(G+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new D,r=new D,o=new D,a=new D,c=new D,l=new D,h=new D,d=new D;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new ze(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){let u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ec=new ye,di=new xi,Tr=new ts,nc=new D,wr=new D,Ar=new D,Rr=new D,Ua=new D,Cr=new D,ic=new D,Pr=new D,be=class extends Ue{constructor(t=new Ee,e=new Qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Cr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],d=r[c];h!==0&&(Ua.fromBufferAttribute(d,t),o?Cr.addScaledVector(Ua,h):Cr.addScaledVector(Ua.sub(e),h))}e.add(Cr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(r),di.copy(t.ray).recast(t.near),!(Tr.containsPoint(di.origin)===!1&&(di.intersectSphere(Tr,nc)===null||di.origin.distanceToSquared(nc)>(t.far-t.near)**2))&&(ec.copy(r).invert(),di.copy(t.ray).applyMatrix4(ec),!(n.boundingBox!==null&&di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,di)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=E,w=_;y<w;y+=3){let T=a.getX(y),C=a.getX(y+1),R=a.getX(y+2);s=Ir(this,p,t,n,l,h,d,T,C,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let E=a.getX(m),_=a.getX(m+1),y=a.getX(m+2);s=Ir(this,o,t,n,l,h,d,E,_,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),_=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=E,w=_;y<w;y+=3){let T=y,C=y+1,R=y+2;s=Ir(this,p,t,n,l,h,d,T,C,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let E=m,_=m+1,y=m+2;s=Ir(this,o,t,n,l,h,d,E,_,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Lu(i,t,e,n,s,r,o,a){let c;if(t.side===ke?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Fn,a),c===null)return null;Pr.copy(a),Pr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Pr);return l<e.near||l>e.far?null:{distance:l,point:Pr.clone(),object:i}}function Ir(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,wr),i.getVertexPosition(c,Ar),i.getVertexPosition(l,Rr);let h=Lu(i,t,e,n,wr,Ar,Rr,ic);if(h){let d=new D;$n.getBarycoord(ic,wr,Ar,Rr,d),s&&(h.uv=$n.getInterpolatedAttribute(s,a,c,l,d,new rt)),r&&(h.uv1=$n.getInterpolatedAttribute(r,a,c,l,d,new rt)),o&&(h.normal=$n.getInterpolatedAttribute(o,a,c,l,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new D,materialIndex:0};$n.getNormal(wr,Ar,Rr,u.normal),h.face=u,h.barycoord=d}return h}var Sn=class i extends Ee{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new jt(l,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(d,2));function g(x,m,p,E,_,y,w,T,C,R,M){let b=y/C,I=w/R,O=y/2,G=w/2,V=T/2,$=C+1,N=R+1,ot=0,W=0,pt=new D;for(let vt=0;vt<N;vt++){let wt=vt*I-G;for(let Xt=0;Xt<$;Xt++){let $t=Xt*b-O;pt[x]=$t*E,pt[m]=wt*_,pt[p]=V,l.push(pt.x,pt.y,pt.z),pt[x]=0,pt[m]=0,pt[p]=T>0?1:-1,h.push(pt.x,pt.y,pt.z),d.push(Xt/C),d.push(1-vt/R),ot+=1}}for(let vt=0;vt<R;vt++)for(let wt=0;wt<C;wt++){let Xt=u+wt+$*vt,$t=u+wt+$*(vt+1),ie=u+(wt+1)+$*(vt+1),ee=u+(wt+1)+$*vt;c.push(Xt,$t,ee),c.push($t,ie,ee),W+=6}a.addGroup(f,W,M),f+=W,u+=ot}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ri(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ne(i){let t={};for(let e=0;e<i.length;e++){let n=Ri(i[e]);for(let s in n)t[s]=n[s]}return t}function Uu(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function xl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}var nh={clone:Ri,merge:Ne},Nu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xn=class extends On{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nu,this.fragmentShader=Fu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ri(t.uniforms),this.uniformsGroups=Uu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Fs=class extends Ue{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Zn=new D,sc=new rt,rc=new rt,Ge=class extends Fs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ki*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ts*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ki*2*Math.atan(Math.tan(Ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zn.x,Zn.y).multiplyScalar(-t/Zn.z),Zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zn.x,Zn.y).multiplyScalar(-t/Zn.z)}getViewSize(t,e){return this.getViewBounds(t,sc,rc),e.subVectors(rc,sc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ts*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},qi=-90,Yi=1,qr=class extends Ue{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ge(qi,Yi,t,e);s.layers=this.layers,this.add(s);let r=new Ge(qi,Yi,t,e);r.layers=this.layers,this.add(r);let o=new Ge(qi,Yi,t,e);o.layers=this.layers,this.add(o);let a=new Ge(qi,Yi,t,e);a.layers=this.layers,this.add(a);let c=new Ge(qi,Yi,t,e);c.layers=this.layers,this.add(c);let l=new Ge(qi,Yi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Is)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Os=class extends Ke{constructor(t=[],e=Ti,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Yr=class extends bn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Os(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Sn(5,5,5),r=new xn({name:"CubemapFromEquirect",uniforms:Ri(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:Bn});r.uniforms.tEquirect.value=e;let o=new be(s,r),a=e.minFilter;return e.minFilter===ai&&(e.minFilter=gn),new qr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Le=class extends Ue{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ou={type:"move"},ns=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Le,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Le,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Le,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ou)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Le;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var Bs=class extends Ue{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Na=new D,Bu=new D,zu=new Zt,rn=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Na.subVectors(n,e).cross(Bu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Na),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||zu.getNormalMatrix(t),s=this.coplanarPoint(Na).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},fi=new ts,ku=new rt(.5,.5),Dr=new D,is=class{constructor(t=new rn,e=new rn,n=new rn,s=new rn,r=new rn,o=new rn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=mn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],E=r[12],_=r[13],y=r[14],w=r[15];if(s[0].setComponents(l-o,f-h,p-g,w-E).normalize(),s[1].setComponents(l+o,f+h,p+g,w+E).normalize(),s[2].setComponents(l+a,f+d,p+x,w+_).normalize(),s[3].setComponents(l-a,f-d,p-x,w-_).normalize(),n)s[4].setComponents(c,u,m,y).normalize(),s[5].setComponents(l-c,f-u,p-m,w-y).normalize();else if(s[4].setComponents(l-c,f-u,p-m,w-y).normalize(),e===mn)s[5].setComponents(l+c,f+u,p+m,w+y).normalize();else if(e===Is)s[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){fi.center.set(0,0,0);let e=ku.distanceTo(t.center);return fi.radius=.7071067811865476+e,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Dr.x=s.normal.x>0?t.max.x:t.min.x,Dr.y=s.normal.y>0?t.max.y:t.min.y,Dr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var zs=class extends Ke{constructor(t,e,n=li,s,r,o,a=on,c=on,l,h=Ji,d=1){if(h!==Ji&&h!==ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Qi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ks=class extends Ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Hs=class i extends Ee{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],c=[],l=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,g=n*2+r,x=s+1,m=new D,p=new D;for(let E=0;E<=g;E++){let _=0,y=0,w=0,T=0;if(E<=n){let M=E/n,b=M*Math.PI/2;y=-h-t*Math.cos(b),w=t*Math.sin(b),T=-t*Math.cos(b),_=M*d}else if(E<=n+r){let M=(E-n)/r;y=-h+M*e,w=t,T=0,_=d+M*u}else{let M=(E-n-r)/n,b=M*Math.PI/2;y=h+t*Math.sin(b),w=t*Math.cos(b),T=t*Math.sin(b),_=d+u+M*d}let C=Math.max(0,Math.min(1,_/f)),R=0;E===0?R=.5/s:E===g&&(R=-.5/s);for(let M=0;M<=s;M++){let b=M/s,I=b*Math.PI*2,O=Math.sin(I),G=Math.cos(I);p.x=-w*G,p.y=y,p.z=w*O,a.push(p.x,p.y,p.z),m.set(-w*G,T,w*O),m.normalize(),c.push(m.x,m.y,m.z),l.push(b+R,C)}if(E>0){let M=(E-1)*x;for(let b=0;b<s;b++){let I=M+b,O=M+b+1,G=E*x+b,V=E*x+b+1;o.push(I,O,G),o.push(O,V,G)}}}this.setIndex(o),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},ti=class i extends Ee{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new D,h=new rt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=n+d/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new jt(o,3)),this.setAttribute("normal",new jt(a,3)),this.setAttribute("uv",new jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ei=class i extends Ee{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,x=[],m=n/2,p=0;E(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new jt(d,3)),this.setAttribute("normal",new jt(u,3)),this.setAttribute("uv",new jt(f,2));function E(){let y=new D,w=new D,T=0,C=(e-t)/n;for(let R=0;R<=r;R++){let M=[],b=R/r,I=b*(e-t)+t;for(let O=0;O<=s;O++){let G=O/s,V=G*c+a,$=Math.sin(V),N=Math.cos(V);w.x=I*$,w.y=-b*n+m,w.z=I*N,d.push(w.x,w.y,w.z),y.set($,C,N).normalize(),u.push(y.x,y.y,y.z),f.push(G,1-b),M.push(g++)}x.push(M)}for(let R=0;R<s;R++)for(let M=0;M<r;M++){let b=x[M][R],I=x[M+1][R],O=x[M+1][R+1],G=x[M][R+1];(t>0||M!==0)&&(h.push(b,I,G),T+=3),(e>0||M!==r-1)&&(h.push(I,O,G),T+=3)}l.addGroup(p,T,0),p+=T}function _(y){let w=g,T=new rt,C=new D,R=0,M=y===!0?t:e,b=y===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,m*b,0),u.push(0,b,0),f.push(.5,.5),g++;let I=g;for(let O=0;O<=s;O++){let V=O/s*c+a,$=Math.cos(V),N=Math.sin(V);C.x=M*N,C.y=m*b,C.z=M*$,d.push(C.x,C.y,C.z),u.push(0,b,0),T.x=$*.5+.5,T.y=N*.5*b+.5,f.push(T.x,T.y),g++}for(let O=0;O<s;O++){let G=w+O,V=I+O;y===!0?h.push(V,V+1,G):h.push(V+1,V,G),R+=3}l.addGroup(p,R,y===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var je=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(o-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new rt:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new D,s=[],r=[],o=[],a=new D,c=new ye;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new D)}r[0]=new D,o[0]=new D;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Kt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Kt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},ss=class extends je{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new rt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Zr=class extends ss{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function yl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,d){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,s(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Lr=new D,Fa=new yl,Oa=new yl,Ba=new yl,yi=class extends je{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Lr.subVectors(s[0],s[1]).add(s[0]),l=Lr);let d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Lr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Lr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Fa.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,g,x,m),Oa.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,g,x,m),Ba.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(Fa.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Oa.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Ba.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Fa.calc(c),Oa.calc(c),Ba.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function oc(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Hu(i,t){let e=1-i;return e*e*t}function Vu(i,t){return 2*(1-i)*i*t}function Gu(i,t){return i*i*t}function As(i,t,e,n){return Hu(i,t)+Vu(i,e)+Gu(i,n)}function Wu(i,t){let e=1-i;return e*e*e*t}function Xu(i,t){let e=1-i;return 3*e*e*i*t}function qu(i,t){return 3*(1-i)*i*i*t}function Yu(i,t){return i*i*i*t}function Rs(i,t,e,n,s){return Wu(i,t)+Xu(i,e)+qu(i,n)+Yu(i,s)}var Vs=class extends je{constructor(t=new rt,e=new rt,n=new rt,s=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new rt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Rs(t,s.x,r.x,o.x,a.x),Rs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},$r=class extends je{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Rs(t,s.x,r.x,o.x,a.x),Rs(t,s.y,r.y,o.y,a.y),Rs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Gs=class extends je{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Jr=class extends je{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ws=class extends je{constructor(t=new rt,e=new rt,n=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new rt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(As(t,s.x,r.x,o.x),As(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xs=class extends je{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(As(t,s.x,r.x,o.x),As(t,s.y,r.y,o.y),As(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},qs=class extends je{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(oc(a,c.x,l.x,h.x,d.x),oc(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new rt().fromArray(s))}return this}},Kr=Object.freeze({__proto__:null,ArcCurve:Zr,CatmullRomCurve3:yi,CubicBezierCurve:Vs,CubicBezierCurve3:$r,EllipseCurve:ss,LineCurve:Gs,LineCurve3:Jr,QuadraticBezierCurve:Ws,QuadraticBezierCurve3:Xs,SplineCurve:qs}),jr=class extends je{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Kr[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Kr[s.type]().fromJSON(s))}return this}},Ys=class extends jr{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Gs(this.currentPoint.clone(),new rt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Ws(this.currentPoint.clone(),new rt(t,e),new rt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Vs(this.currentPoint.clone(),new rt(t,e),new rt(n,s),new rt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new qs(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new ss(t,e,n,s,r,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ni=class extends Ys{constructor(t){super(t),this.uuid=Ai(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Ys().fromJSON(s))}return this}};function Zu(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=ih(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=Qu(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let h=-1/0,d=-1/0;for(let u=e;u<s;u+=e){let f=i[u],g=i[u+1];f<a&&(a=f),g<c&&(c=g),f>h&&(h=f),g>d&&(d=g)}l=Math.max(h-a,d-c),l=l!==0?32767/l:0}return Zs(r,o,e,a,c,l,0),o}function ih(i,t,e,n,s){let r;if(s===hd(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=ac(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=ac(o/n|0,i[o],i[o+1],r);return r&&rs(r,r.next)&&(Js(r),r=r.next),r}function vi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(rs(e,e.next)||xe(e.prev,e,e.next)===0)){if(Js(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Zs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&sd(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?Ju(i,n,s,r):$u(i)){t.push(c.i,i.i,l.i),Js(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Ku(vi(i),t),Zs(i,t,e,n,s,r,2)):o===2&&ju(i,t,e,n,s,r):Zs(vi(i),t,e,n,s,r,1);break}}}function $u(i){let t=i.prev,e=i,n=i.next;if(xe(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),d=Math.min(a,c,l),u=Math.max(s,r,o),f=Math.max(a,c,l),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&Es(s,a,r,c,o,l,g.x,g.y)&&xe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ju(i,t,e,n){let s=i.prev,r=i,o=i.next;if(xe(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,d=r.y,u=o.y,f=Math.min(a,c,l),g=Math.min(h,d,u),x=Math.max(a,c,l),m=Math.max(h,d,u),p=Xa(f,g,t,e,n),E=Xa(x,m,t,e,n),_=i.prevZ,y=i.nextZ;for(;_&&_.z>=p&&y&&y.z<=E;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Es(a,h,c,d,l,u,_.x,_.y)&&xe(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Es(a,h,c,d,l,u,y.x,y.y)&&xe(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Es(a,h,c,d,l,u,_.x,_.y)&&xe(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=E;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Es(a,h,c,d,l,u,y.x,y.y)&&xe(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Ku(i,t){let e=i;do{let n=e.prev,s=e.next.next;!rs(n,s)&&rh(n,e,e.next,s)&&$s(n,s)&&$s(s,n)&&(t.push(n.i,e.i,s.i),Js(e),Js(e.next),e=i=s),e=e.next}while(e!==i);return vi(e)}function ju(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ad(o,a)){let c=oh(o,a);o=vi(o,o.next),c=vi(c,c.next),Zs(o,t,e,n,s,r,0),Zs(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Qu(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=ih(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(od(l))}s.sort(td);for(let r=0;r<s.length;r++)e=ed(s[r],e);return e}function td(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function ed(i,t){let e=nd(i,t);if(!e)return t;let n=oh(e,i);return vi(n,n.next),vi(e,e.next)}function nd(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(rs(i,e))return e;do{if(rs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,o=e.x<e.next.x?e:e.next,d===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&sh(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let d=Math.abs(s-e.y)/(n-e.x);$s(e,i)&&(d<h||d===h&&(e.x>o.x||e.x===o.x&&id(o,e)))&&(o=e,h=d)}e=e.next}while(e!==a);return o}function id(i,t){return xe(i.prev,i,t.prev)<0&&xe(t.next,i,i.next)<0}function sd(i,t,e,n){let s=i;do s.z===0&&(s.z=Xa(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,rd(s)}function rd(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Xa(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function od(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function sh(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Es(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&sh(i,t,e,n,s,r,o,a)}function ad(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!ld(i,t)&&($s(i,t)&&$s(t,i)&&cd(i,t)&&(xe(i.prev,i,t.prev)||xe(i,t.prev,t))||rs(i,t)&&xe(i.prev,i,i.next)>0&&xe(t.prev,t,t.next)>0)}function xe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function rs(i,t){return i.x===t.x&&i.y===t.y}function rh(i,t,e,n){let s=Nr(xe(i,t,e)),r=Nr(xe(i,t,n)),o=Nr(xe(e,n,i)),a=Nr(xe(e,n,t));return!!(s!==r&&o!==a||s===0&&Ur(i,e,t)||r===0&&Ur(i,n,t)||o===0&&Ur(e,i,n)||a===0&&Ur(e,t,n))}function Ur(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Nr(i){return i>0?1:i<0?-1:0}function ld(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&rh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function $s(i,t){return xe(i.prev,i,i.next)<0?xe(i,t,i.next)>=0&&xe(i,i.prev,t)>=0:xe(i,t,i.prev)<0||xe(i,i.next,t)<0}function cd(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function oh(i,t){let e=qa(i.i,i.x,i.y),n=qa(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ac(i,t,e,n){let s=qa(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Js(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function qa(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function hd(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Ya=class{static triangulate(t,e,n=2){return Zu(t,e,n)}},vn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];lc(t),cc(n,t);let o=t.length;e.forEach(lc);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,cc(n,e[c]);let a=Ya.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function lc(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function cc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var os=class i extends Ee{constructor(t=new ni([new rt(.5,.5),new rt(-.5,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new jt(s,3)),this.setAttribute("uv",new jt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:ud,_,y=!1,w,T,C,R;p&&(_=p.getSpacedPoints(h),y=!0,u=!1,w=p.computeFrenetFrames(h,!1),T=new D,C=new D,R=new D),u||(m=0,f=0,g=0,x=0);let M=a.extractPoints(l),b=M.shape,I=M.holes;if(!vn.isClockWise(b)){b=b.reverse();for(let nt=0,et=I.length;nt<et;nt++){let Q=I[nt];vn.isClockWise(Q)&&(I[nt]=Q.reverse())}}function G(nt){let Q=10000000000000001e-36,tt=nt[0];for(let xt=1;xt<=nt.length;xt++){let at=xt%nt.length,dt=nt[at],Bt=dt.x-tt.x,Ot=dt.y-tt.y,A=Bt*Bt+Ot*Ot,v=Math.max(Math.abs(dt.x),Math.abs(dt.y),Math.abs(tt.x),Math.abs(tt.y)),F=Q*v*v;if(A<=F){nt.splice(at,1),xt--;continue}tt=dt}}G(b),I.forEach(G);let V=I.length,$=b;for(let nt=0;nt<V;nt++){let et=I[nt];b=b.concat(et)}function N(nt,et,Q){return et||console.error("THREE.ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(et,Q)}let ot=b.length;function W(nt,et,Q){let tt,xt,at,dt=nt.x-et.x,Bt=nt.y-et.y,Ot=Q.x-nt.x,A=Q.y-nt.y,v=dt*dt+Bt*Bt,F=dt*A-Bt*Ot;if(Math.abs(F)>Number.EPSILON){let Y=Math.sqrt(v),it=Math.sqrt(Ot*Ot+A*A),J=et.x-Bt/Y,Lt=et.y+dt/Y,mt=Q.x-A/it,It=Q.y+Ot/it,Dt=((mt-J)*A-(It-Lt)*Ot)/(dt*A-Bt*Ot);tt=J+dt*Dt-nt.x,xt=Lt+Bt*Dt-nt.y;let ct=tt*tt+xt*xt;if(ct<=2)return new rt(tt,xt);at=Math.sqrt(ct/2)}else{let Y=!1;dt>Number.EPSILON?Ot>Number.EPSILON&&(Y=!0):dt<-Number.EPSILON?Ot<-Number.EPSILON&&(Y=!0):Math.sign(Bt)===Math.sign(A)&&(Y=!0),Y?(tt=-Bt,xt=dt,at=Math.sqrt(v)):(tt=dt,xt=Bt,at=Math.sqrt(v/2))}return new rt(tt/at,xt/at)}let pt=[];for(let nt=0,et=$.length,Q=et-1,tt=nt+1;nt<et;nt++,Q++,tt++)Q===et&&(Q=0),tt===et&&(tt=0),pt[nt]=W($[nt],$[Q],$[tt]);let vt=[],wt,Xt=pt.concat();for(let nt=0,et=V;nt<et;nt++){let Q=I[nt];wt=[];for(let tt=0,xt=Q.length,at=xt-1,dt=tt+1;tt<xt;tt++,at++,dt++)at===xt&&(at=0),dt===xt&&(dt=0),wt[tt]=W(Q[tt],Q[at],Q[dt]);vt.push(wt),Xt=Xt.concat(wt)}let $t;if(m===0)$t=vn.triangulateShape($,I);else{let nt=[],et=[];for(let Q=0;Q<m;Q++){let tt=Q/m,xt=f*Math.cos(tt*Math.PI/2),at=g*Math.sin(tt*Math.PI/2)+x;for(let dt=0,Bt=$.length;dt<Bt;dt++){let Ot=N($[dt],pt[dt],at);_t(Ot.x,Ot.y,-xt),tt===0&&nt.push(Ot)}for(let dt=0,Bt=V;dt<Bt;dt++){let Ot=I[dt];wt=vt[dt];let A=[];for(let v=0,F=Ot.length;v<F;v++){let Y=N(Ot[v],wt[v],at);_t(Y.x,Y.y,-xt),tt===0&&A.push(Y)}tt===0&&et.push(A)}}$t=vn.triangulateShape(nt,et)}let ie=$t.length,ee=g+x;for(let nt=0;nt<ot;nt++){let et=u?N(b[nt],Xt[nt],ee):b[nt];y?(C.copy(w.normals[0]).multiplyScalar(et.x),T.copy(w.binormals[0]).multiplyScalar(et.y),R.copy(_[0]).add(C).add(T),_t(R.x,R.y,R.z)):_t(et.x,et.y,0)}for(let nt=1;nt<=h;nt++)for(let et=0;et<ot;et++){let Q=u?N(b[et],Xt[et],ee):b[et];y?(C.copy(w.normals[nt]).multiplyScalar(Q.x),T.copy(w.binormals[nt]).multiplyScalar(Q.y),R.copy(_[nt]).add(C).add(T),_t(R.x,R.y,R.z)):_t(Q.x,Q.y,d/h*nt)}for(let nt=m-1;nt>=0;nt--){let et=nt/m,Q=f*Math.cos(et*Math.PI/2),tt=g*Math.sin(et*Math.PI/2)+x;for(let xt=0,at=$.length;xt<at;xt++){let dt=N($[xt],pt[xt],tt);_t(dt.x,dt.y,d+Q)}for(let xt=0,at=I.length;xt<at;xt++){let dt=I[xt];wt=vt[xt];for(let Bt=0,Ot=dt.length;Bt<Ot;Bt++){let A=N(dt[Bt],wt[Bt],tt);y?_t(A.x,A.y+_[h-1].y,_[h-1].x+Q):_t(A.x,A.y,d+Q)}}}K(),H();function K(){let nt=s.length/3;if(u){let et=0,Q=ot*et;for(let tt=0;tt<ie;tt++){let xt=$t[tt];ut(xt[2]+Q,xt[1]+Q,xt[0]+Q)}et=h+m*2,Q=ot*et;for(let tt=0;tt<ie;tt++){let xt=$t[tt];ut(xt[0]+Q,xt[1]+Q,xt[2]+Q)}}else{for(let et=0;et<ie;et++){let Q=$t[et];ut(Q[2],Q[1],Q[0])}for(let et=0;et<ie;et++){let Q=$t[et];ut(Q[0]+ot*h,Q[1]+ot*h,Q[2]+ot*h)}}n.addGroup(nt,s.length/3-nt,0)}function H(){let nt=s.length/3,et=0;st($,et),et+=$.length;for(let Q=0,tt=I.length;Q<tt;Q++){let xt=I[Q];st(xt,et),et+=xt.length}n.addGroup(nt,s.length/3-nt,1)}function st(nt,et){let Q=nt.length;for(;--Q>=0;){let tt=Q,xt=Q-1;xt<0&&(xt=nt.length-1);for(let at=0,dt=h+m*2;at<dt;at++){let Bt=ot*at,Ot=ot*(at+1),A=et+tt+Bt,v=et+xt+Bt,F=et+xt+Ot,Y=et+tt+Ot;kt(A,v,F,Y)}}}function _t(nt,et,Q){c.push(nt),c.push(et),c.push(Q)}function ut(nt,et,Q){Jt(nt),Jt(et),Jt(Q);let tt=s.length/3,xt=E.generateTopUV(n,s,tt-3,tt-2,tt-1);P(xt[0]),P(xt[1]),P(xt[2])}function kt(nt,et,Q,tt){Jt(nt),Jt(et),Jt(tt),Jt(et),Jt(Q),Jt(tt);let xt=s.length/3,at=E.generateSideWallUV(n,s,xt-6,xt-3,xt-2,xt-1);P(at[0]),P(at[1]),P(at[3]),P(at[1]),P(at[2]),P(at[3])}function Jt(nt){s.push(c[nt*3+0]),s.push(c[nt*3+1]),s.push(c[nt*3+2])}function P(nt){r.push(nt.x),r.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return dd(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Kr[s.type]().fromJSON(s)),new i(n,t.options)}},ud={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new rt(r,o),new rt(a,c),new rt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],f=t[s*3+1],g=t[s*3+2],x=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new rt(o,1-c),new rt(l,1-d),new rt(u,1-g),new rt(x,1-p)]:[new rt(a,1-c),new rt(h,1-d),new rt(f,1-g),new rt(m,1-p)]}};function dd(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ks=class i extends Ee{constructor(t=[new rt(0,-.5),new rt(.5,0),new rt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Kt(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,d=new D,u=new rt,f=new D,g=new D,x=new D,m=0,p=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:m=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:m=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let E=0;E<=e;E++){let _=n+E*h*s,y=Math.sin(_),w=Math.cos(_);for(let T=0;T<=t.length-1;T++){d.x=t[T].x*y,d.y=t[T].y,d.z=t[T].x*w,o.push(d.x,d.y,d.z),u.x=E/e,u.y=T/(t.length-1),a.push(u.x,u.y);let C=c[3*T+0]*y,R=c[3*T+1],M=c[3*T+0]*w;l.push(C,R,M)}}for(let E=0;E<e;E++)for(let _=0;_<t.length-1;_++){let y=_+E*t.length,w=y,T=y+t.length,C=y+t.length+1,R=y+1;r.push(w,T,R),r.push(C,R,T)}this.setIndex(r),this.setAttribute("position",new jt(o,3)),this.setAttribute("uv",new jt(a,2)),this.setAttribute("normal",new jt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var Mi=class i extends Ee{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,d=t/a,u=e/c,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let E=p*u-o;for(let _=0;_<l;_++){let y=_*d-r;g.push(y,-E,0),x.push(0,0,1),m.push(_/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<a;E++){let _=E+l*p,y=E+l*(p+1),w=E+1+l*(p+1),T=E+1+l*p;f.push(_,y,T),f.push(y,w,T)}this.setIndex(f),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},js=class i extends Ee{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],d=t,u=(e-t)/s,f=new D,g=new rt;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let p=r+m/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<s;x++){let m=x*(n+1);for(let p=0;p<n;p++){let E=p+m,_=E,y=E+n+1,w=E+n+2,T=E+1;a.push(_,y,T),a.push(y,w,T)}}this.setIndex(a),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(l,3)),this.setAttribute("uv",new jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Qs=class i extends Ee{constructor(t=new ni([new rt(0,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new jt(s,3)),this.setAttribute("normal",new jt(r,3)),this.setAttribute("uv",new jt(o,2));function l(h){let d=s.length/3,u=h.extractPoints(e),f=u.shape,g=u.holes;vn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){let E=g[m];vn.isClockWise(E)===!0&&(g[m]=E.reverse())}let x=vn.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){let E=g[m];f=f.concat(E)}for(let m=0,p=f.length;m<p;m++){let E=f[m];s.push(E.x,E.y,0),r.push(0,0,1),o.push(E.x,E.y)}for(let m=0,p=x.length;m<p;m++){let E=x[m],_=E[0]+d,y=E[1]+d,w=E[2]+d;n.push(_,y,w),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return fd(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function fd(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var En=class i extends Ee{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],d=new D,u=new D,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let E=[],_=p/n,y=0;p===0&&o===0?y=.5/e:p===n&&c===Math.PI&&(y=-.5/e);for(let w=0;w<=e;w++){let T=w/e;d.x=-t*Math.cos(s+T*r)*Math.sin(o+_*a),d.y=t*Math.cos(o+_*a),d.z=t*Math.sin(s+T*r)*Math.sin(o+_*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(T+y,1-_),E.push(l++)}h.push(E)}for(let p=0;p<n;p++)for(let E=0;E<e;E++){let _=h[p][E+1],y=h[p][E],w=h[p+1][E],T=h[p+1][E+1];(p!==0||o>0)&&f.push(_,y,T),(p!==n-1||c<Math.PI)&&f.push(y,w,T)}this.setIndex(f),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Tn=class i extends Ee{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new D,d=new D,u=new D;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let x=g/s*r,m=f/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(x),d.y=(t+e*Math.cos(m))*Math.sin(x),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,E=(s+1)*f+g;o.push(x,m,E),o.push(m,p,E)}this.setIndex(o),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var tr=class i extends Ee{constructor(t=new Xs(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new D,c=new D,l=new rt,h=new D,d=[],u=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new jt(d,3)),this.setAttribute("normal",new jt(u,3)),this.setAttribute("uv",new jt(f,2));function x(){for(let _=0;_<e;_++)m(_);m(r===!1?e:0),E(),p()}function m(_){h=t.getPointAt(_/e,h);let y=o.normals[_],w=o.binormals[_];for(let T=0;T<=s;T++){let C=T/s*Math.PI*2,R=Math.sin(C),M=-Math.cos(C);c.x=M*y.x+R*w.x,c.y=M*y.y+R*w.y,c.z=M*y.z+R*w.z,c.normalize(),u.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,d.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=e;_++)for(let y=1;y<=s;y++){let w=(s+1)*(_-1)+(y-1),T=(s+1)*_+(y-1),C=(s+1)*_+y,R=(s+1)*(_-1)+y;g.push(w,T,R),g.push(T,C,R)}}function E(){for(let _=0;_<=e;_++)for(let y=0;y<=s;y++)l.x=_/e,l.y=y/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Kr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var er=class extends On{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Qt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};var bi=class extends On{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fl,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Qr=class extends On{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},to=class extends On{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Fr(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function pd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Si=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},eo=class extends Si{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ka,endingEnd:ka}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ha:r=t,a=2*e-n;break;case Va:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ha:o=t,c=2*n-e;break;case Va:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-u*m+2*u*x-u*g,E=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,_=(-1-f)*m+(1.5+f)*x+.5*g,y=f*m-f*x;for(let w=0;w!==a;++w)r[w]=p*o[h+w]+E*o[l+w]+_*o[c+w]+y*o[d+w];return r}},no=class extends Si{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*d+o[c+u]*h;return r}},io=class extends Si{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Qe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Fr(e,this.TimeBufferType),this.values=Fr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Fr(t.times,Array),values:Fr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new io(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new no(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new eo(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Cs:e=this.InterpolantFactoryMethodDiscrete;break;case Vr:e=this.InterpolantFactoryMethodLinear;break;case Or:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Cs;case this.InterpolantFactoryMethodLinear:return Vr;case this.InterpolantFactoryMethodSmooth:return Or}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&pd(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Or,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let d=a*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let x=e[d+g];if(x!==e[u+g]||x!==e[f+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Qe.prototype.ValueTypeName="";Qe.prototype.TimeBufferType=Float32Array;Qe.prototype.ValueBufferType=Float32Array;Qe.prototype.DefaultInterpolation=Vr;var ii=class extends Qe{constructor(t,e,n){super(t,e,n)}};ii.prototype.ValueTypeName="bool";ii.prototype.ValueBufferType=Array;ii.prototype.DefaultInterpolation=Cs;ii.prototype.InterpolantFactoryMethodLinear=void 0;ii.prototype.InterpolantFactoryMethodSmooth=void 0;var so=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};so.prototype.ValueTypeName="color";var ro=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};ro.prototype.ValueTypeName="number";var oo=class extends Si{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)an.slerpFlat(r,0,o,l-a,o,l,c);return r}},nr=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new oo(this.times,this.values,this.getValueSize(),t)}};nr.prototype.ValueTypeName="quaternion";nr.prototype.InterpolantFactoryMethodSmooth=void 0;var si=class extends Qe{constructor(t,e,n){super(t,e,n)}};si.prototype.ValueTypeName="string";si.prototype.ValueBufferType=Array;si.prototype.DefaultInterpolation=Cs;si.prototype.InterpolantFactoryMethodLinear=void 0;si.prototype.InterpolantFactoryMethodSmooth=void 0;var ao=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};ao.prototype.ValueTypeName="vector";var lo=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},ah=new lo,co=class{constructor(t){this.manager=t!==void 0?t:ah,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};co.DEFAULT_MATERIAL_NAME="__DEFAULT";var ir=class extends Ue{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},sr=class extends ir{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},za=new ye,hc=new D,uc=new D,Za=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new is,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;hc.setFromMatrixPosition(t.matrixWorld),e.position.copy(hc),uc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(uc),e.updateMatrixWorld(),za.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(za,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(za)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Ei=class extends Fs{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},$a=class extends Za{constructor(){super(new Ei(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},as=class extends ir{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.target=new Ue,this.shadow=new $a}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var ho=class extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},rr=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};var vl="\\[\\]\\.:\\/",md=new RegExp("["+vl+"]","g"),Ml="[^"+vl+"]",gd="[^"+vl.replace("\\.","")+"]",_d=/((?:WC+[\/:])*)/.source.replace("WC",Ml),xd=/(WCOD+)?/.source.replace("WCOD",gd),yd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ml),vd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ml),Md=new RegExp("^"+_d+xd+yd+vd+"$"),bd=["material","materials","bones","map"],Ja=class{constructor(t,e,n){let s=n||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},pe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(md,"")}static parseTrackName(t){let e=Md.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);bd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pe.Composite=Ja;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var b0=new Float32Array(1);var dc=new ye,or=class{constructor(t,e,n=0,s=1/0){this.ray=new xi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new es,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return dc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dc),this}intersectObject(t,e=!0,n=[]){return Ka(t,this,n,e),n.sort(fc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ka(t[s],this,n,e);return n.sort(fc),n}};function fc(i,t){return i.distance-t.distance}function Ka(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Ka(r[o],t,e,!0)}}var ls=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Kt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Kt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var ar=class extends Mn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function bl(i,t,e,n){let s=Sd(n);switch(e){case cl:return i*t;case ul:return i*t/s.components*s.byteLength;case Ao:return i*t/s.components*s.byteLength;case dl:return i*t*2/s.components*s.byteLength;case Ro:return i*t*2/s.components*s.byteLength;case hl:return i*t*3/s.components*s.byteLength;case cn:return i*t*4/s.components*s.byteLength;case Co:return i*t*4/s.components*s.byteLength;case hr:case ur:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case dr:case fr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Io:case Lo:return Math.max(i,16)*Math.max(t,8)/4;case Po:case Do:return Math.max(i,8)*Math.max(t,8)/2;case Uo:case No:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Bo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case zo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ko:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ho:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Vo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Go:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Wo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Xo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case qo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Yo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Zo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case $o:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Jo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ko:case jo:case Qo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ta:case ea:return Math.ceil(i/4)*Math.ceil(t/4)*8;case na:case ia:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Sd(i){switch(i){case yn:case rl:return{byteLength:1,components:1};case cs:case ol:case hs:return{byteLength:2,components:1};case To:case wo:return{byteLength:2,components:4};case li:case Eo:case An:return{byteLength:4,components:1};case al:case ll:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Ih(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Id(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let x=d[f];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Dd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ld=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ud=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Nd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Od=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,zd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Hd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ef=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,nf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,rf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,of=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,af=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cf="gl_FragColor = linearToOutputTexel( gl_FragColor );",hf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,uf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,df=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ff=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,pf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_f=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Mf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ef=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Tf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,wf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Af=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,If=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Df=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Lf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Uf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Nf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ff=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Of=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Vf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$f=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Kf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ep=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,np=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ip=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,op=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ap=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,lp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,mp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_p=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,vp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ep=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ap=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ip=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Np=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Op=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,kp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Hp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Yp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$p=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Kp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Qp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,em=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,im=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,om=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,am=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,hm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,um=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:Dd,alphahash_pars_fragment:Ld,alphamap_fragment:Ud,alphamap_pars_fragment:Nd,alphatest_fragment:Fd,alphatest_pars_fragment:Od,aomap_fragment:Bd,aomap_pars_fragment:zd,batching_pars_vertex:kd,batching_vertex:Hd,begin_vertex:Vd,beginnormal_vertex:Gd,bsdfs:Wd,iridescence_fragment:Xd,bumpmap_pars_fragment:qd,clipping_planes_fragment:Yd,clipping_planes_pars_fragment:Zd,clipping_planes_pars_vertex:$d,clipping_planes_vertex:Jd,color_fragment:Kd,color_pars_fragment:jd,color_pars_vertex:Qd,color_vertex:tf,common:ef,cube_uv_reflection_fragment:nf,defaultnormal_vertex:sf,displacementmap_pars_vertex:rf,displacementmap_vertex:of,emissivemap_fragment:af,emissivemap_pars_fragment:lf,colorspace_fragment:cf,colorspace_pars_fragment:hf,envmap_fragment:uf,envmap_common_pars_fragment:df,envmap_pars_fragment:ff,envmap_pars_vertex:pf,envmap_physical_pars_fragment:Tf,envmap_vertex:mf,fog_vertex:gf,fog_pars_vertex:_f,fog_fragment:xf,fog_pars_fragment:yf,gradientmap_pars_fragment:vf,lightmap_pars_fragment:Mf,lights_lambert_fragment:bf,lights_lambert_pars_fragment:Sf,lights_pars_begin:Ef,lights_toon_fragment:wf,lights_toon_pars_fragment:Af,lights_phong_fragment:Rf,lights_phong_pars_fragment:Cf,lights_physical_fragment:Pf,lights_physical_pars_fragment:If,lights_fragment_begin:Df,lights_fragment_maps:Lf,lights_fragment_end:Uf,logdepthbuf_fragment:Nf,logdepthbuf_pars_fragment:Ff,logdepthbuf_pars_vertex:Of,logdepthbuf_vertex:Bf,map_fragment:zf,map_pars_fragment:kf,map_particle_fragment:Hf,map_particle_pars_fragment:Vf,metalnessmap_fragment:Gf,metalnessmap_pars_fragment:Wf,morphinstance_vertex:Xf,morphcolor_vertex:qf,morphnormal_vertex:Yf,morphtarget_pars_vertex:Zf,morphtarget_vertex:$f,normal_fragment_begin:Jf,normal_fragment_maps:Kf,normal_pars_fragment:jf,normal_pars_vertex:Qf,normal_vertex:tp,normalmap_pars_fragment:ep,clearcoat_normal_fragment_begin:np,clearcoat_normal_fragment_maps:ip,clearcoat_pars_fragment:sp,iridescence_pars_fragment:rp,opaque_fragment:op,packing:ap,premultiplied_alpha_fragment:lp,project_vertex:cp,dithering_fragment:hp,dithering_pars_fragment:up,roughnessmap_fragment:dp,roughnessmap_pars_fragment:fp,shadowmap_pars_fragment:pp,shadowmap_pars_vertex:mp,shadowmap_vertex:gp,shadowmask_pars_fragment:_p,skinbase_vertex:xp,skinning_pars_vertex:yp,skinning_vertex:vp,skinnormal_vertex:Mp,specularmap_fragment:bp,specularmap_pars_fragment:Sp,tonemapping_fragment:Ep,tonemapping_pars_fragment:Tp,transmission_fragment:wp,transmission_pars_fragment:Ap,uv_pars_fragment:Rp,uv_pars_vertex:Cp,uv_vertex:Pp,worldpos_vertex:Ip,background_vert:Dp,background_frag:Lp,backgroundCube_vert:Up,backgroundCube_frag:Np,cube_vert:Fp,cube_frag:Op,depth_vert:Bp,depth_frag:zp,distanceRGBA_vert:kp,distanceRGBA_frag:Hp,equirect_vert:Vp,equirect_frag:Gp,linedashed_vert:Wp,linedashed_frag:Xp,meshbasic_vert:qp,meshbasic_frag:Yp,meshlambert_vert:Zp,meshlambert_frag:$p,meshmatcap_vert:Jp,meshmatcap_frag:Kp,meshnormal_vert:jp,meshnormal_frag:Qp,meshphong_vert:tm,meshphong_frag:em,meshphysical_vert:nm,meshphysical_frag:im,meshtoon_vert:sm,meshtoon_frag:rm,points_vert:om,points_frag:am,shadow_vert:lm,shadow_frag:cm,sprite_vert:hm,sprite_frag:um},St={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Rn={basic:{uniforms:Ne([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:Ne([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Qt(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:Ne([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:Ne([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:Ne([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new Qt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:Ne([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:Ne([St.points,St.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:Ne([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:Ne([St.common,St.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:Ne([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:Ne([St.sprite,St.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:Ne([St.common,St.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:Ne([St.lights,St.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};Rn.physical={uniforms:Ne([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var sa={r:0,b:0,g:0},Ci=new _n,dm=new ye;function fm(i,t,e,n,s,r,o){let a=new Qt(0),c=r===!0?0:1,l,h,d=null,u=0,f=null;function g(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?e:t).get(y)),y}function x(_){let y=!1,w=g(_);w===null?p(a,c):w&&w.isColor&&(p(w,1),y=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,y){let w=g(y);w&&(w.isCubeTexture||w.mapping===lr)?(h===void 0&&(h=new be(new Sn(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:Ri(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ci.copy(y.backgroundRotation),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(dm.makeRotationFromEuler(Ci)),h.material.toneMapped=se.getTransfer(w.colorSpace)!==ce,(d!==w||u!==w.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=w,u=w.version,f=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new be(new Mi(2,2),new xn({name:"BackgroundMaterial",uniforms:Ri(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=se.getTransfer(w.colorSpace)!==ce,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||u!==w.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=w,u=w.version,f=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function p(_,y){_.getRGB(sa,xl(i)),n.buffers.color.setClear(sa.r,sa.g,sa.b,y,o)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),c=y,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,p(a,c)},render:x,addToRenderList:m,dispose:E}}function pm(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(b,I,O,G,V){let $=!1,N=d(G,O,I);r!==N&&(r=N,l(r.object)),$=f(b,G,O,V),$&&g(b,G,O,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,y(b,I,O,G),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return i.createVertexArray()}function l(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function d(b,I,O){let G=O.wireframe===!0,V=n[b.id];V===void 0&&(V={},n[b.id]=V);let $=V[I.id];$===void 0&&($={},V[I.id]=$);let N=$[G];return N===void 0&&(N=u(c()),$[G]=N),N}function u(b){let I=[],O=[],G=[];for(let V=0;V<e;V++)I[V]=0,O[V]=0,G[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:G,object:b,attributes:{},index:null}}function f(b,I,O,G){let V=r.attributes,$=I.attributes,N=0,ot=O.getAttributes();for(let W in ot)if(ot[W].location>=0){let vt=V[W],wt=$[W];if(wt===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(wt=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(wt=b.instanceColor)),vt===void 0||vt.attribute!==wt||wt&&vt.data!==wt.data)return!0;N++}return r.attributesNum!==N||r.index!==G}function g(b,I,O,G){let V={},$=I.attributes,N=0,ot=O.getAttributes();for(let W in ot)if(ot[W].location>=0){let vt=$[W];vt===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(vt=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(vt=b.instanceColor));let wt={};wt.attribute=vt,vt&&vt.data&&(wt.data=vt.data),V[W]=wt,N++}r.attributes=V,r.attributesNum=N,r.index=G}function x(){let b=r.newAttributes;for(let I=0,O=b.length;I<O;I++)b[I]=0}function m(b){p(b,0)}function p(b,I){let O=r.newAttributes,G=r.enabledAttributes,V=r.attributeDivisors;O[b]=1,G[b]===0&&(i.enableVertexAttribArray(b),G[b]=1),V[b]!==I&&(i.vertexAttribDivisor(b,I),V[b]=I)}function E(){let b=r.newAttributes,I=r.enabledAttributes;for(let O=0,G=I.length;O<G;O++)I[O]!==b[O]&&(i.disableVertexAttribArray(O),I[O]=0)}function _(b,I,O,G,V,$,N){N===!0?i.vertexAttribIPointer(b,I,O,V,$):i.vertexAttribPointer(b,I,O,G,V,$)}function y(b,I,O,G){x();let V=G.attributes,$=O.getAttributes(),N=I.defaultAttributeValues;for(let ot in $){let W=$[ot];if(W.location>=0){let pt=V[ot];if(pt===void 0&&(ot==="instanceMatrix"&&b.instanceMatrix&&(pt=b.instanceMatrix),ot==="instanceColor"&&b.instanceColor&&(pt=b.instanceColor)),pt!==void 0){let vt=pt.normalized,wt=pt.itemSize,Xt=t.get(pt);if(Xt===void 0)continue;let $t=Xt.buffer,ie=Xt.type,ee=Xt.bytesPerElement,K=ie===i.INT||ie===i.UNSIGNED_INT||pt.gpuType===Eo;if(pt.isInterleavedBufferAttribute){let H=pt.data,st=H.stride,_t=pt.offset;if(H.isInstancedInterleavedBuffer){for(let ut=0;ut<W.locationSize;ut++)p(W.location+ut,H.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let ut=0;ut<W.locationSize;ut++)m(W.location+ut);i.bindBuffer(i.ARRAY_BUFFER,$t);for(let ut=0;ut<W.locationSize;ut++)_(W.location+ut,wt/W.locationSize,ie,vt,st*ee,(_t+wt/W.locationSize*ut)*ee,K)}else{if(pt.isInstancedBufferAttribute){for(let H=0;H<W.locationSize;H++)p(W.location+H,pt.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let H=0;H<W.locationSize;H++)m(W.location+H);i.bindBuffer(i.ARRAY_BUFFER,$t);for(let H=0;H<W.locationSize;H++)_(W.location+H,wt/W.locationSize,ie,vt,wt*ee,wt/W.locationSize*H*ee,K)}}else if(N!==void 0){let vt=N[ot];if(vt!==void 0)switch(vt.length){case 2:i.vertexAttrib2fv(W.location,vt);break;case 3:i.vertexAttrib3fv(W.location,vt);break;case 4:i.vertexAttrib4fv(W.location,vt);break;default:i.vertexAttrib1fv(W.location,vt)}}}}E()}function w(){R();for(let b in n){let I=n[b];for(let O in I){let G=I[O];for(let V in G)h(G[V].object),delete G[V];delete I[O]}delete n[b]}}function T(b){if(n[b.id]===void 0)return;let I=n[b.id];for(let O in I){let G=I[O];for(let V in G)h(G[V].object),delete G[V];delete I[O]}delete n[b.id]}function C(b){for(let I in n){let O=n[I];if(O[b.id]===void 0)continue;let G=O[b.id];for(let V in G)h(G[V].object),delete G[V];delete O[b.id]}}function R(){M(),o=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:M,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:E}}function mm(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function a(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function c(l,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*u[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function gm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==cn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let R=C===hs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==yn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==An&&!R)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:w,maxSamples:T}}function _m(i){let t=this,e=null,n=0,s=!1,r=!1,o=new rn,a=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let E=r?0:n,_=E*4,y=p.clippingState||null;c.value=y,y=h(g,u,_,f);for(let w=0;w!==_;++w)y[w]=e[w];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,E=u.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,y=f;_!==x;++_,y+=4)o.copy(d[_]).applyMatrix4(E,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function xm(i){let t=new WeakMap;function e(o,a){return a===Mo?o.mapping=Ti:a===bo&&(o.mapping=wi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Mo||a===bo)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Yr(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ps=4,lh=[.125,.215,.35,.446,.526,.582],Di=20,Sl=new Ei,ch=new Qt,El=null,Tl=0,wl=0,Al=!1,Ii=(1+Math.sqrt(5))/2,fs=1/Ii,hh=[new D(-Ii,fs,0),new D(Ii,fs,0),new D(-fs,0,Ii),new D(fs,0,Ii),new D(0,Ii,-fs),new D(0,Ii,fs),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],ym=new D,aa=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=ym}=r;El=this._renderer.getRenderTarget(),Tl=this._renderer.getActiveCubeFace(),wl=this._renderer.getActiveMipmapLevel(),Al=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(El,Tl,wl),this._renderer.xr.enabled=Al,t.scissorTest=!1,ra(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ti||t.mapping===wi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),El=this._renderer.getRenderTarget(),Tl=this._renderer.getActiveCubeFace(),wl=this._renderer.getActiveMipmapLevel(),Al=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:hs,format:cn,colorSpace:_i,depthBuffer:!1},s=uh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uh(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vm(r)),this._blurMaterial=Mm(r,t,e)}return s}_compileMaterial(t){let e=new be(this._lodPlanes[0],t);this._renderer.compile(e,Sl)}_sceneToCubeUV(t,e,n,s,r){let c=new Ge(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(ch),d.toneMapping=zn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let x=new Qn({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1}),m=new be(new Sn,x),p=!1,E=t.background;E?E.isColor&&(x.color.copy(E),t.background=null,p=!0):(x.color.copy(ch),p=!0);for(let _=0;_<6;_++){let y=_%3;y===0?(c.up.set(0,l[_],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[_],r.y,r.z)):y===1?(c.up.set(0,0,l[_]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[_],r.z)):(c.up.set(0,l[_],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[_]));let w=this._cubeSize;ra(s,y*w,_>2?w:0,w,w),d.setRenderTarget(s),p&&d.render(m,c),d.render(t,c)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=u,t.background=E}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ti||t.mapping===wi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dh());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new be(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;ra(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Sl)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=hh[(s-r-1)%hh.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new be(this._lodPlanes[s],l),u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Di-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Di;m>Di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Di}`);let p=[],E=0;for(let C=0;C<Di;++C){let R=C/x,M=Math.exp(-R*R/2);p.push(M),C===0?E+=M:C<m&&(E+=2*M)}for(let C=0;C<p.length;C++)p[C]=p[C]/E;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:_}=this;u.dTheta.value=g,u.mipInt.value=_-n;let y=this._sizeLods[s],w=3*y*(s>_-ps?s-_+ps:0),T=4*(this._cubeSize-y);ra(e,w,T,3*y,2*y),c.setRenderTarget(e),c.render(d,Sl)}};function vm(i){let t=[],e=[],n=[],s=i,r=i-ps+1+lh.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-ps?c=lh[o-i+ps-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,x=3,m=2,p=1,E=new Float32Array(x*g*f),_=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let T=0;T<f;T++){let C=T%3*2/3-1,R=T>2?0:-1,M=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];E.set(M,x*g*T),_.set(u,m*g*T);let b=[T,T,T,T,T,T];y.set(b,p*g*T)}let w=new Ee;w.setAttribute("position",new ze(E,x)),w.setAttribute("uv",new ze(_,m)),w.setAttribute("faceIndex",new ze(y,p)),t.push(w),s>ps&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function uh(i,t,e){let n=new bn(i,t,e);return n.texture.mapping=lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ra(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Mm(i,t,e){let n=new Float32Array(Di),s=new D(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function dh(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function fh(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Ol(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Mo||c===bo,h=c===Ti||c===wi;if(l||h){let d=t.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new aa(i)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new aa(i)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Sm(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ji("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Em(i,t,e,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(d){let u=d.attributes;for(let f in u)t.update(u[f],i.ARRAY_BUFFER)}function l(d){let u=[],f=d.index,g=d.attributes.position,x=0;if(f!==null){let E=f.array;x=f.version;for(let _=0,y=E.length;_<y;_+=3){let w=E[_+0],T=E[_+1],C=E[_+2];u.push(w,T,T,C,C,w)}}else if(g!==void 0){let E=g.array;x=g.version;for(let _=0,y=E.length/3-1;_<y;_+=3){let w=_+0,T=_+1,C=_+2;u.push(w,T,T,C,C,w)}}else return;let m=new(_l(u)?Ns:Us)(u,1);m.version=x;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function Tm(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function l(u,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,u*o,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,x,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E]*x[E];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function wm(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Am(i,t,e){let n=new WeakMap,s=new ve;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let M=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],_=0;f===!0&&(_=1),g===!0&&(_=2),x===!0&&(_=3);let y=a.attributes.position.count*_,w=1;y>t.maxTextureSize&&(w=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let T=new Float32Array(y*w*4*d),C=new Ls(T,y,w,d);C.type=An,C.needsUpdate=!0;let R=_*4;for(let b=0;b<d;b++){let I=m[b],O=p[b],G=E[b],V=y*w*4*b;for(let $=0;$<I.count;$++){let N=$*R;f===!0&&(s.fromBufferAttribute(I,$),T[V+N+0]=s.x,T[V+N+1]=s.y,T[V+N+2]=s.z,T[V+N+3]=0),g===!0&&(s.fromBufferAttribute(O,$),T[V+N+4]=s.x,T[V+N+5]=s.y,T[V+N+6]=s.z,T[V+N+7]=0),x===!0&&(s.fromBufferAttribute(G,$),T[V+N+8]=s.x,T[V+N+9]=s.y,T[V+N+10]=s.z,T[V+N+11]=G.itemSize===4?s.w:1)}}u={count:d,texture:C,size:new rt(y,w)},n.set(a,u),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Rm(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,d=t.get(c,h);if(s.get(d)!==l&&(t.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return d}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Dh=new Ke,ph=new zs(1,1),Lh=new Ls,Uh=new Xr,Nh=new Os,mh=[],gh=[],_h=new Float32Array(16),xh=new Float32Array(9),yh=new Float32Array(4);function gs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=mh[s];if(r===void 0&&(r=new Float32Array(s),mh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function we(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ae(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ca(i,t){let e=gh[t];e===void 0&&(e=new Int32Array(t),gh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Cm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Pm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2fv(this.addr,t),Ae(e,t)}}function Im(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;i.uniform3fv(this.addr,t),Ae(e,t)}}function Dm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4fv(this.addr,t),Ae(e,t)}}function Lm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(we(e,n))return;yh.set(n),i.uniformMatrix2fv(this.addr,!1,yh),Ae(e,n)}}function Um(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(we(e,n))return;xh.set(n),i.uniformMatrix3fv(this.addr,!1,xh),Ae(e,n)}}function Nm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(we(e,n))return;_h.set(n),i.uniformMatrix4fv(this.addr,!1,_h),Ae(e,n)}}function Fm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Om(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2iv(this.addr,t),Ae(e,t)}}function Bm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3iv(this.addr,t),Ae(e,t)}}function zm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4iv(this.addr,t),Ae(e,t)}}function km(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Hm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2uiv(this.addr,t),Ae(e,t)}}function Vm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3uiv(this.addr,t),Ae(e,t)}}function Gm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4uiv(this.addr,t),Ae(e,t)}}function Wm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ph.compareFunction=pl,r=ph):r=Dh,e.setTexture2D(t||r,s)}function Xm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Uh,s)}function qm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Nh,s)}function Ym(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Lh,s)}function Zm(i){switch(i){case 5126:return Cm;case 35664:return Pm;case 35665:return Im;case 35666:return Dm;case 35674:return Lm;case 35675:return Um;case 35676:return Nm;case 5124:case 35670:return Fm;case 35667:case 35671:return Om;case 35668:case 35672:return Bm;case 35669:case 35673:return zm;case 5125:return km;case 36294:return Hm;case 36295:return Vm;case 36296:return Gm;case 35678:case 36198:case 36298:case 36306:case 35682:return Wm;case 35679:case 36299:case 36307:return Xm;case 35680:case 36300:case 36308:case 36293:return qm;case 36289:case 36303:case 36311:case 36292:return Ym}}function $m(i,t){i.uniform1fv(this.addr,t)}function Jm(i,t){let e=gs(t,this.size,2);i.uniform2fv(this.addr,e)}function Km(i,t){let e=gs(t,this.size,3);i.uniform3fv(this.addr,e)}function jm(i,t){let e=gs(t,this.size,4);i.uniform4fv(this.addr,e)}function Qm(i,t){let e=gs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function tg(i,t){let e=gs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function eg(i,t){let e=gs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function ng(i,t){i.uniform1iv(this.addr,t)}function ig(i,t){i.uniform2iv(this.addr,t)}function sg(i,t){i.uniform3iv(this.addr,t)}function rg(i,t){i.uniform4iv(this.addr,t)}function og(i,t){i.uniform1uiv(this.addr,t)}function ag(i,t){i.uniform2uiv(this.addr,t)}function lg(i,t){i.uniform3uiv(this.addr,t)}function cg(i,t){i.uniform4uiv(this.addr,t)}function hg(i,t,e){let n=this.cache,s=t.length,r=ca(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Dh,r[o])}function ug(i,t,e){let n=this.cache,s=t.length,r=ca(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Uh,r[o])}function dg(i,t,e){let n=this.cache,s=t.length,r=ca(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Nh,r[o])}function fg(i,t,e){let n=this.cache,s=t.length,r=ca(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Lh,r[o])}function pg(i){switch(i){case 5126:return $m;case 35664:return Jm;case 35665:return Km;case 35666:return jm;case 35674:return Qm;case 35675:return tg;case 35676:return eg;case 5124:case 35670:return ng;case 35667:case 35671:return ig;case 35668:case 35672:return sg;case 35669:case 35673:return rg;case 5125:return og;case 36294:return ag;case 36295:return lg;case 36296:return cg;case 35678:case 36198:case 36298:case 36306:case 35682:return hg;case 35679:case 36299:case 36307:return ug;case 35680:case 36300:case 36308:case 36293:return dg;case 36289:case 36303:case 36311:case 36292:return fg}}var Cl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Zm(e.type)}},Pl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=pg(e.type)}},Il=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Rl=/(\w+)(\])?(\[|\.)?/g;function vh(i,t){i.seq.push(t),i.map[t.id]=t}function mg(i,t,e){let n=i.name,s=n.length;for(Rl.lastIndex=0;;){let r=Rl.exec(n),o=Rl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){vh(e,l===void 0?new Cl(a,i,t):new Pl(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Il(a),vh(e,d)),e=d}}}var ms=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);mg(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Mh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var gg=37297,_g=0;function xg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var bh=new Zt;function yg(i){se._getMatrix(bh,se.workingColorSpace,i);let t=`mat3( ${bh.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(i)){case Ps:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Sh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+xg(i.getShaderSource(t),a)}else return r}function vg(i,t){let e=yg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Mg(i,t){let e;switch(t){case Fc:e="Linear";break;case Oc:e="Reinhard";break;case Bc:e="Cineon";break;case vo:e="ACESFilmic";break;case kc:e="AgX";break;case Hc:e="Neutral";break;case zc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var oa=new D;function bg(){se.getLuminanceCoefficients(oa);let i=oa.x.toFixed(4),t=oa.y.toFixed(4),e=oa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pr).join(`
`)}function Eg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Tg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function pr(i){return i!==""}function Eh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Th(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var wg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dl(i){return i.replace(wg,Rg)}var Ag=new Map;function Rg(i,t){let e=te[t];if(e===void 0){let n=Ag.get(t);if(n!==void 0)e=te[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Dl(e)}var Cg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wh(i){return i.replace(Cg,Pg)}function Pg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ah(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Ig(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Qa?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===uo?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wn&&(t="SHADOWMAP_TYPE_VSM"),t}function Dg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ti:case wi:t="ENVMAP_TYPE_CUBE";break;case lr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Lg(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===wi&&(t="ENVMAP_MODE_REFRACTION"),t}function Ug(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case il:t="ENVMAP_BLENDING_MULTIPLY";break;case Uc:t="ENVMAP_BLENDING_MIX";break;case Nc:t="ENVMAP_BLENDING_ADD";break}return t}function Ng(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Fg(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Ig(e),l=Dg(e),h=Lg(e),d=Ug(e),u=Ng(e),f=Sg(e),g=Eg(r),x=s.createProgram(),m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(pr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(pr).join(`
`),p.length>0&&(p+=`
`)):(m=[Ah(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pr).join(`
`),p=[Ah(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?te.tonemapping_pars_fragment:"",e.toneMapping!==zn?Mg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,vg("linearToOutputTexel",e.outputColorSpace),bg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(pr).join(`
`)),o=Dl(o),o=Eh(o,e),o=Th(o,e),a=Dl(a),a=Eh(a,e),a=Th(a,e),o=wh(o),a=wh(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=E+m+o,y=E+p+a,w=Mh(s,s.VERTEX_SHADER,_),T=Mh(s,s.FRAGMENT_SHADER,y);s.attachShader(x,w),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(I){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(x)||"",G=s.getShaderInfoLog(w)||"",V=s.getShaderInfoLog(T)||"",$=O.trim(),N=G.trim(),ot=V.trim(),W=!0,pt=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,w,T);else{let vt=Sh(s,w,"vertex"),wt=Sh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+$+`
`+vt+`
`+wt)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(N===""||ot==="")&&(pt=!1);pt&&(I.diagnostics={runnable:W,programLog:$,vertexShader:{log:N,prefix:m},fragmentShader:{log:ot,prefix:p}})}s.deleteShader(w),s.deleteShader(T),R=new ms(s,x),M=Tg(s,x)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(x,gg)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=_g++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=T,this}var Og=0,Ll=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ul(t),e.set(t,n)),n}},Ul=class{constructor(t){this.id=Og++,this.code=t,this.usedTimes=0}};function Bg(i,t,e,n,s,r,o){let a=new es,c=new Ll,l=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,b,I,O,G){let V=O.fog,$=G.geometry,N=M.isMeshStandardMaterial?O.environment:null,ot=(M.isMeshStandardMaterial?e:t).get(M.envMap||N),W=ot&&ot.mapping===lr?ot.image.height:null,pt=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let vt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,wt=vt!==void 0?vt.length:0,Xt=0;$.morphAttributes.position!==void 0&&(Xt=1),$.morphAttributes.normal!==void 0&&(Xt=2),$.morphAttributes.color!==void 0&&(Xt=3);let $t,ie,ee,K;if(pt){let re=Rn[pt];$t=re.vertexShader,ie=re.fragmentShader}else $t=M.vertexShader,ie=M.fragmentShader,c.update(M),ee=c.getVertexShaderID(M),K=c.getFragmentShaderID(M);let H=i.getRenderTarget(),st=i.state.buffers.depth.getReversed(),_t=G.isInstancedMesh===!0,ut=G.isBatchedMesh===!0,kt=!!M.map,Jt=!!M.matcap,P=!!ot,nt=!!M.aoMap,et=!!M.lightMap,Q=!!M.bumpMap,tt=!!M.normalMap,xt=!!M.displacementMap,at=!!M.emissiveMap,dt=!!M.metalnessMap,Bt=!!M.roughnessMap,Ot=M.anisotropy>0,A=M.clearcoat>0,v=M.dispersion>0,F=M.iridescence>0,Y=M.sheen>0,it=M.transmission>0,J=Ot&&!!M.anisotropyMap,Lt=A&&!!M.clearcoatMap,mt=A&&!!M.clearcoatNormalMap,It=A&&!!M.clearcoatRoughnessMap,Dt=F&&!!M.iridescenceMap,ct=F&&!!M.iridescenceThicknessMap,Et=Y&&!!M.sheenColorMap,Ht=Y&&!!M.sheenRoughnessMap,Ut=!!M.specularMap,bt=!!M.specularColorMap,Yt=!!M.specularIntensityMap,U=it&&!!M.transmissionMap,lt=it&&!!M.thicknessMap,yt=!!M.gradientMap,At=!!M.alphaMap,ht=M.alphaTest>0,j=!!M.alphaHash,Ct=!!M.extensions,Vt=zn;M.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Vt=i.toneMapping);let le={shaderID:pt,shaderType:M.type,shaderName:M.name,vertexShader:$t,fragmentShader:ie,defines:M.defines,customVertexShaderID:ee,customFragmentShaderID:K,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:ut,batchingColor:ut&&G._colorsTexture!==null,instancing:_t,instancingColor:_t&&G.instanceColor!==null,instancingMorph:_t&&G.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:H===null?i.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:_i,alphaToCoverage:!!M.alphaToCoverage,map:kt,matcap:Jt,envMap:P,envMapMode:P&&ot.mapping,envMapCubeUVHeight:W,aoMap:nt,lightMap:et,bumpMap:Q,normalMap:tt,displacementMap:u&&xt,emissiveMap:at,normalMapObjectSpace:tt&&M.normalMapType===Xc,normalMapTangentSpace:tt&&M.normalMapType===fl,metalnessMap:dt,roughnessMap:Bt,anisotropy:Ot,anisotropyMap:J,clearcoat:A,clearcoatMap:Lt,clearcoatNormalMap:mt,clearcoatRoughnessMap:It,dispersion:v,iridescence:F,iridescenceMap:Dt,iridescenceThicknessMap:ct,sheen:Y,sheenColorMap:Et,sheenRoughnessMap:Ht,specularMap:Ut,specularColorMap:bt,specularIntensityMap:Yt,transmission:it,transmissionMap:U,thicknessMap:lt,gradientMap:yt,opaque:M.transparent===!1&&M.blending===mi&&M.alphaToCoverage===!1,alphaMap:At,alphaTest:ht,alphaHash:j,combine:M.combine,mapUv:kt&&x(M.map.channel),aoMapUv:nt&&x(M.aoMap.channel),lightMapUv:et&&x(M.lightMap.channel),bumpMapUv:Q&&x(M.bumpMap.channel),normalMapUv:tt&&x(M.normalMap.channel),displacementMapUv:xt&&x(M.displacementMap.channel),emissiveMapUv:at&&x(M.emissiveMap.channel),metalnessMapUv:dt&&x(M.metalnessMap.channel),roughnessMapUv:Bt&&x(M.roughnessMap.channel),anisotropyMapUv:J&&x(M.anisotropyMap.channel),clearcoatMapUv:Lt&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:mt&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:It&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&x(M.sheenRoughnessMap.channel),specularMapUv:Ut&&x(M.specularMap.channel),specularColorMapUv:bt&&x(M.specularColorMap.channel),specularIntensityMapUv:Yt&&x(M.specularIntensityMap.channel),transmissionMapUv:U&&x(M.transmissionMap.channel),thicknessMapUv:lt&&x(M.thicknessMap.channel),alphaMapUv:At&&x(M.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(tt||Ot),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!$.attributes.uv&&(kt||At),fog:!!V,useFog:M.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:st,skinning:G.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Xt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Vt,decodeVideoTexture:kt&&M.map.isVideoTexture===!0&&se.getTransfer(M.map.colorSpace)===ce,decodeVideoTextureEmissive:at&&M.emissiveMap.isVideoTexture===!0&&se.getTransfer(M.emissiveMap.colorSpace)===ce,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ln,flipSided:M.side===ke,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ct&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&M.extensions.multiDraw===!0||ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return le.vertexUv1s=l.has(1),le.vertexUv2s=l.has(2),le.vertexUv3s=l.has(3),l.clear(),le}function p(M){let b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(let I in M.defines)b.push(I),b.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(E(b,M),_(b,M),b.push(i.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function E(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function _(M,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){let b=g[M.type],I;if(b){let O=Rn[b];I=nh.clone(O.uniforms)}else I=M.uniforms;return I}function w(M,b){let I;for(let O=0,G=h.length;O<G;O++){let V=h[O];if(V.cacheKey===b){I=V,++I.usedTimes;break}}return I===void 0&&(I=new Fg(i,b,M,r),h.push(I)),I}function T(M){if(--M.usedTimes===0){let b=h.indexOf(M);h[b]=h[h.length-1],h.pop(),M.destroy()}}function C(M){c.remove(M)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:w,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:R}}function zg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function kg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Rh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ch(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,u,f,g,x,m){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=x,p.group=m),t++,p}function a(d,u,f,g,x,m){let p=o(d,u,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(d,u,f,g,x,m){let p=o(d,u,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(d,u){e.length>1&&e.sort(d||kg),n.length>1&&n.sort(u||Rh),s.length>1&&s.sort(u||Rh)}function h(){for(let d=t,u=i.length;d<u;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Hg(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Ch,i.set(n,[o])):s>=r.length?(o=new Ch,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Vg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Qt};break;case"SpotLight":e={position:new D,direction:new D,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function Gg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Wg=0;function Xg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function qg(i){let t=new Vg,e=Gg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);let s=new D,r=new ye,o=new ye;function a(l){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,E=0,_=0,y=0,w=0,T=0,C=0;l.sort(Xg);for(let M=0,b=l.length;M<b;M++){let I=l[M],O=I.color,G=I.intensity,V=I.distance,$=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=O.r*G,d+=O.g*G,u+=O.b*G;else if(I.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(I.sh.coefficients[N],G);C++}else if(I.isDirectionalLight){let N=t.get(I);if(N.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let ot=I.shadow,W=e.get(I);W.shadowIntensity=ot.intensity,W.shadowBias=ot.bias,W.shadowNormalBias=ot.normalBias,W.shadowRadius=ot.radius,W.shadowMapSize=ot.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=I.shadow.matrix,E++}n.directional[f]=N,f++}else if(I.isSpotLight){let N=t.get(I);N.position.setFromMatrixPosition(I.matrixWorld),N.color.copy(O).multiplyScalar(G),N.distance=V,N.coneCos=Math.cos(I.angle),N.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),N.decay=I.decay,n.spot[x]=N;let ot=I.shadow;if(I.map&&(n.spotLightMap[w]=I.map,w++,ot.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[x]=ot.matrix,I.castShadow){let W=e.get(I);W.shadowIntensity=ot.intensity,W.shadowBias=ot.bias,W.shadowNormalBias=ot.normalBias,W.shadowRadius=ot.radius,W.shadowMapSize=ot.mapSize,n.spotShadow[x]=W,n.spotShadowMap[x]=$,y++}x++}else if(I.isRectAreaLight){let N=t.get(I);N.color.copy(O).multiplyScalar(G),N.halfWidth.set(I.width*.5,0,0),N.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=N,m++}else if(I.isPointLight){let N=t.get(I);if(N.color.copy(I.color).multiplyScalar(I.intensity),N.distance=I.distance,N.decay=I.decay,I.castShadow){let ot=I.shadow,W=e.get(I);W.shadowIntensity=ot.intensity,W.shadowBias=ot.bias,W.shadowNormalBias=ot.normalBias,W.shadowRadius=ot.radius,W.shadowMapSize=ot.mapSize,W.shadowCameraNear=ot.camera.near,W.shadowCameraFar=ot.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=I.shadow.matrix,_++}n.point[g]=N,g++}else if(I.isHemisphereLight){let N=t.get(I);N.skyColor.copy(I.color).multiplyScalar(G),N.groundColor.copy(I.groundColor).multiplyScalar(G),n.hemi[p]=N,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=St.LTC_FLOAT_1,n.rectAreaLTC2=St.LTC_FLOAT_2):(n.rectAreaLTC1=St.LTC_HALF_1,n.rectAreaLTC2=St.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==x||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==E||R.numPointShadows!==_||R.numSpotShadows!==y||R.numSpotMaps!==w||R.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,R.directionalLength=f,R.pointLength=g,R.spotLength=x,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=E,R.numPointShadows=_,R.numSpotShadows=y,R.numSpotMaps=w,R.numLightProbes=C,n.version=Wg++)}function c(l,h){let d=0,u=0,f=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){let _=l[p];if(_.isDirectionalLight){let y=n.directional[d];y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(_.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(_.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){let y=n.point[u];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),u++}else if(_.isHemisphereLight){let y=n.hemi[x];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function Ph(i){let t=new qg(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Yg(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Ph(i),t.set(s,[a])):r>=o.length?(a=new Ph(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Zg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$g=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Jg(i,t,e){let n=new is,s=new rt,r=new rt,o=new ve,a=new Qr({depthPacking:Wc}),c=new to,l={},h=e.maxTextureSize,d={[Fn]:ke,[ke]:Fn,[ln]:ln},u=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:Zg,fragmentShader:$g}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ee;g.setAttribute("position",new ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new be(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qa;let p=this.type;this.render=function(T,C,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let M=i.getRenderTarget(),b=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Bn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let G=p!==wn&&this.type===wn,V=p===wn&&this.type!==wn;for(let $=0,N=T.length;$<N;$++){let ot=T[$],W=ot.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",ot,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let pt=W.getFrameExtents();if(s.multiply(pt),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/pt.x),s.x=r.x*pt.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/pt.y),s.y=r.y*pt.y,W.mapSize.y=r.y)),W.map===null||G===!0||V===!0){let wt=this.type!==wn?{minFilter:on,magFilter:on}:{};W.map!==null&&W.map.dispose(),W.map=new bn(s.x,s.y,wt),W.map.texture.name=ot.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();let vt=W.getViewportCount();for(let wt=0;wt<vt;wt++){let Xt=W.getViewport(wt);o.set(r.x*Xt.x,r.y*Xt.y,r.x*Xt.z,r.y*Xt.w),O.viewport(o),W.updateMatrices(ot,wt),n=W.getFrustum(),y(C,R,W.camera,ot,this.type)}W.isPointLightShadow!==!0&&this.type===wn&&E(W,R),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,b,I)};function E(T,C){let R=t.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new bn(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,R,u,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,R,f,x,null)}function _(T,C,R,M){let b=null,I=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)b=I;else if(b=R.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let O=b.uuid,G=C.uuid,V=l[O];V===void 0&&(V={},l[O]=V);let $=V[G];$===void 0&&($=b.clone(),V[G]=$,C.addEventListener("dispose",w)),b=$}if(b.visible=C.visible,b.wireframe=C.wireframe,M===wn?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:d[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,R.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let O=i.properties.get(b);O.light=R}return b}function y(T,C,R,M,b){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&b===wn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);let G=t.update(T),V=T.material;if(Array.isArray(V)){let $=G.groups;for(let N=0,ot=$.length;N<ot;N++){let W=$[N],pt=V[W.materialIndex];if(pt&&pt.visible){let vt=_(T,pt,M,b);T.onBeforeShadow(i,T,C,R,G,vt,W),i.renderBufferDirect(R,null,G,vt,T,W),T.onAfterShadow(i,T,C,R,G,vt,W)}}}else if(V.visible){let $=_(T,V,M,b);T.onBeforeShadow(i,T,C,R,G,$,null),i.renderBufferDirect(R,null,G,$,T,null),T.onAfterShadow(i,T,C,R,G,$,null)}}let O=T.children;for(let G=0,V=O.length;G<V;G++)y(O[G],C,R,M,b)}function w(T){T.target.removeEventListener("dispose",w);for(let R in l){let M=l[R],b=T.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}var Kg={[fo]:po,[mo]:xo,[go]:yo,[gi]:_o,[po]:fo,[xo]:mo,[yo]:go,[_o]:gi};function jg(i,t){function e(){let U=!1,lt=new ve,yt=null,At=new ve(0,0,0,0);return{setMask:function(ht){yt!==ht&&!U&&(i.colorMask(ht,ht,ht,ht),yt=ht)},setLocked:function(ht){U=ht},setClear:function(ht,j,Ct,Vt,le){le===!0&&(ht*=Vt,j*=Vt,Ct*=Vt),lt.set(ht,j,Ct,Vt),At.equals(lt)===!1&&(i.clearColor(ht,j,Ct,Vt),At.copy(lt))},reset:function(){U=!1,yt=null,At.set(-1,0,0,0)}}}function n(){let U=!1,lt=!1,yt=null,At=null,ht=null;return{setReversed:function(j){if(lt!==j){let Ct=t.get("EXT_clip_control");j?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT),lt=j;let Vt=ht;ht=null,this.setClear(Vt)}},getReversed:function(){return lt},setTest:function(j){j?H(i.DEPTH_TEST):st(i.DEPTH_TEST)},setMask:function(j){yt!==j&&!U&&(i.depthMask(j),yt=j)},setFunc:function(j){if(lt&&(j=Kg[j]),At!==j){switch(j){case fo:i.depthFunc(i.NEVER);break;case po:i.depthFunc(i.ALWAYS);break;case mo:i.depthFunc(i.LESS);break;case gi:i.depthFunc(i.LEQUAL);break;case go:i.depthFunc(i.EQUAL);break;case _o:i.depthFunc(i.GEQUAL);break;case xo:i.depthFunc(i.GREATER);break;case yo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}At=j}},setLocked:function(j){U=j},setClear:function(j){ht!==j&&(lt&&(j=1-j),i.clearDepth(j),ht=j)},reset:function(){U=!1,yt=null,At=null,ht=null,lt=!1}}}function s(){let U=!1,lt=null,yt=null,At=null,ht=null,j=null,Ct=null,Vt=null,le=null;return{setTest:function(re){U||(re?H(i.STENCIL_TEST):st(i.STENCIL_TEST))},setMask:function(re){lt!==re&&!U&&(i.stencilMask(re),lt=re)},setFunc:function(re,tn,qe){(yt!==re||At!==tn||ht!==qe)&&(i.stencilFunc(re,tn,qe),yt=re,At=tn,ht=qe)},setOp:function(re,tn,qe){(j!==re||Ct!==tn||Vt!==qe)&&(i.stencilOp(re,tn,qe),j=re,Ct=tn,Vt=qe)},setLocked:function(re){U=re},setClear:function(re){le!==re&&(i.clearStencil(re),le=re)},reset:function(){U=!1,lt=null,yt=null,At=null,ht=null,j=null,Ct=null,Vt=null,le=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},d={},u=new WeakMap,f=[],g=null,x=!1,m=null,p=null,E=null,_=null,y=null,w=null,T=null,C=new Qt(0,0,0),R=0,M=!1,b=null,I=null,O=null,G=null,V=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ot=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(ot=parseFloat(/^WebGL (\d)/.exec(W)[1]),N=ot>=1):W.indexOf("OpenGL ES")!==-1&&(ot=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),N=ot>=2);let pt=null,vt={},wt=i.getParameter(i.SCISSOR_BOX),Xt=i.getParameter(i.VIEWPORT),$t=new ve().fromArray(wt),ie=new ve().fromArray(Xt);function ee(U,lt,yt,At){let ht=new Uint8Array(4),j=i.createTexture();i.bindTexture(U,j),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ct=0;Ct<yt;Ct++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,At,0,i.RGBA,i.UNSIGNED_BYTE,ht):i.texImage2D(lt+Ct,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ht);return j}let K={};K[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),H(i.DEPTH_TEST),o.setFunc(gi),Q(!1),tt(ja),H(i.CULL_FACE),nt(Bn);function H(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function st(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function _t(U,lt){return d[U]!==lt?(i.bindFramebuffer(U,lt),d[U]=lt,U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=lt),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function ut(U,lt){let yt=f,At=!1;if(U){yt=u.get(lt),yt===void 0&&(yt=[],u.set(lt,yt));let ht=U.textures;if(yt.length!==ht.length||yt[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Ct=ht.length;j<Ct;j++)yt[j]=i.COLOR_ATTACHMENT0+j;yt.length=ht.length,At=!0}}else yt[0]!==i.BACK&&(yt[0]=i.BACK,At=!0);At&&i.drawBuffers(yt)}function kt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}let Jt={[Kn]:i.FUNC_ADD,[_c]:i.FUNC_SUBTRACT,[xc]:i.FUNC_REVERSE_SUBTRACT};Jt[yc]=i.MIN,Jt[vc]=i.MAX;let P={[Mc]:i.ZERO,[bc]:i.ONE,[Sc]:i.SRC_COLOR,[Br]:i.SRC_ALPHA,[Cc]:i.SRC_ALPHA_SATURATE,[Ac]:i.DST_COLOR,[Tc]:i.DST_ALPHA,[Ec]:i.ONE_MINUS_SRC_COLOR,[zr]:i.ONE_MINUS_SRC_ALPHA,[Rc]:i.ONE_MINUS_DST_COLOR,[wc]:i.ONE_MINUS_DST_ALPHA,[Pc]:i.CONSTANT_COLOR,[Ic]:i.ONE_MINUS_CONSTANT_COLOR,[Dc]:i.CONSTANT_ALPHA,[Lc]:i.ONE_MINUS_CONSTANT_ALPHA};function nt(U,lt,yt,At,ht,j,Ct,Vt,le,re){if(U===Bn){x===!0&&(st(i.BLEND),x=!1);return}if(x===!1&&(H(i.BLEND),x=!0),U!==gc){if(U!==m||re!==M){if((p!==Kn||y!==Kn)&&(i.blendEquation(i.FUNC_ADD),p=Kn,y=Kn),re)switch(U){case mi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tl:i.blendFunc(i.ONE,i.ONE);break;case el:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case mi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case el:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,_=null,w=null,T=null,C.set(0,0,0),R=0,m=U,M=re}return}ht=ht||lt,j=j||yt,Ct=Ct||At,(lt!==p||ht!==y)&&(i.blendEquationSeparate(Jt[lt],Jt[ht]),p=lt,y=ht),(yt!==E||At!==_||j!==w||Ct!==T)&&(i.blendFuncSeparate(P[yt],P[At],P[j],P[Ct]),E=yt,_=At,w=j,T=Ct),(Vt.equals(C)===!1||le!==R)&&(i.blendColor(Vt.r,Vt.g,Vt.b,le),C.copy(Vt),R=le),m=U,M=!1}function et(U,lt){U.side===ln?st(i.CULL_FACE):H(i.CULL_FACE);let yt=U.side===ke;lt&&(yt=!yt),Q(yt),U.blending===mi&&U.transparent===!1?nt(Bn):nt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let At=U.stencilWrite;a.setTest(At),At&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),at(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?H(i.SAMPLE_ALPHA_TO_COVERAGE):st(i.SAMPLE_ALPHA_TO_COVERAGE)}function Q(U){b!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),b=U)}function tt(U){U!==pc?(H(i.CULL_FACE),U!==I&&(U===ja?i.cullFace(i.BACK):U===mc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):st(i.CULL_FACE),I=U}function xt(U){U!==O&&(N&&i.lineWidth(U),O=U)}function at(U,lt,yt){U?(H(i.POLYGON_OFFSET_FILL),(G!==lt||V!==yt)&&(i.polygonOffset(lt,yt),G=lt,V=yt)):st(i.POLYGON_OFFSET_FILL)}function dt(U){U?H(i.SCISSOR_TEST):st(i.SCISSOR_TEST)}function Bt(U){U===void 0&&(U=i.TEXTURE0+$-1),pt!==U&&(i.activeTexture(U),pt=U)}function Ot(U,lt,yt){yt===void 0&&(pt===null?yt=i.TEXTURE0+$-1:yt=pt);let At=vt[yt];At===void 0&&(At={type:void 0,texture:void 0},vt[yt]=At),(At.type!==U||At.texture!==lt)&&(pt!==yt&&(i.activeTexture(yt),pt=yt),i.bindTexture(U,lt||K[U]),At.type=U,At.texture=lt)}function A(){let U=vt[pt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Lt(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function mt(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function It(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Dt(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ct(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(U){$t.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),$t.copy(U))}function Ht(U){ie.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),ie.copy(U))}function Ut(U,lt){let yt=l.get(lt);yt===void 0&&(yt=new WeakMap,l.set(lt,yt));let At=yt.get(U);At===void 0&&(At=i.getUniformBlockIndex(lt,U.name),yt.set(U,At))}function bt(U,lt){let At=l.get(lt).get(U);c.get(lt)!==At&&(i.uniformBlockBinding(lt,At,U.__bindingPointIndex),c.set(lt,At))}function Yt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},pt=null,vt={},d={},u=new WeakMap,f=[],g=null,x=!1,m=null,p=null,E=null,_=null,y=null,w=null,T=null,C=new Qt(0,0,0),R=0,M=!1,b=null,I=null,O=null,G=null,V=null,$t.set(0,0,i.canvas.width,i.canvas.height),ie.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:H,disable:st,bindFramebuffer:_t,drawBuffers:ut,useProgram:kt,setBlending:nt,setMaterial:et,setFlipSided:Q,setCullFace:tt,setLineWidth:xt,setPolygonOffset:at,setScissorTest:dt,activeTexture:Bt,bindTexture:Ot,unbindTexture:A,compressedTexImage2D:v,compressedTexImage3D:F,texImage2D:Dt,texImage3D:ct,updateUBOMapping:Ut,uniformBlockBinding:bt,texStorage2D:mt,texStorage3D:It,texSubImage2D:Y,texSubImage3D:it,compressedTexSubImage2D:J,compressedTexSubImage3D:Lt,scissor:Et,viewport:Ht,reset:Yt}}function Qg(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new rt,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,v){return f?new OffscreenCanvas(A,v):Ds("canvas")}function x(A,v,F){let Y=1,it=Ot(A);if((it.width>F||it.height>F)&&(Y=F/Math.max(it.width,it.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let J=Math.floor(Y*it.width),Lt=Math.floor(Y*it.height);d===void 0&&(d=g(J,Lt));let mt=v?g(J,Lt):d;return mt.width=J,mt.height=Lt,mt.getContext("2d").drawImage(A,0,0,J,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+J+"x"+Lt+")."),mt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(A,v,F,Y,it=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let J=v;if(v===i.RED&&(F===i.FLOAT&&(J=i.R32F),F===i.HALF_FLOAT&&(J=i.R16F),F===i.UNSIGNED_BYTE&&(J=i.R8)),v===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(J=i.R8UI),F===i.UNSIGNED_SHORT&&(J=i.R16UI),F===i.UNSIGNED_INT&&(J=i.R32UI),F===i.BYTE&&(J=i.R8I),F===i.SHORT&&(J=i.R16I),F===i.INT&&(J=i.R32I)),v===i.RG&&(F===i.FLOAT&&(J=i.RG32F),F===i.HALF_FLOAT&&(J=i.RG16F),F===i.UNSIGNED_BYTE&&(J=i.RG8)),v===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(J=i.RG8UI),F===i.UNSIGNED_SHORT&&(J=i.RG16UI),F===i.UNSIGNED_INT&&(J=i.RG32UI),F===i.BYTE&&(J=i.RG8I),F===i.SHORT&&(J=i.RG16I),F===i.INT&&(J=i.RG32I)),v===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(J=i.RGB8UI),F===i.UNSIGNED_SHORT&&(J=i.RGB16UI),F===i.UNSIGNED_INT&&(J=i.RGB32UI),F===i.BYTE&&(J=i.RGB8I),F===i.SHORT&&(J=i.RGB16I),F===i.INT&&(J=i.RGB32I)),v===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),F===i.UNSIGNED_INT&&(J=i.RGBA32UI),F===i.BYTE&&(J=i.RGBA8I),F===i.SHORT&&(J=i.RGBA16I),F===i.INT&&(J=i.RGBA32I)),v===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),v===i.RGBA){let Lt=it?Ps:se.getTransfer(Y);F===i.FLOAT&&(J=i.RGBA32F),F===i.HALF_FLOAT&&(J=i.RGBA16F),F===i.UNSIGNED_BYTE&&(J=Lt===ce?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function y(A,v){let F;return A?v===null||v===li||v===us?F=i.DEPTH24_STENCIL8:v===An?F=i.DEPTH32F_STENCIL8:v===cs&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===li||v===us?F=i.DEPTH_COMPONENT24:v===An?F=i.DEPTH_COMPONENT32F:v===cs&&(F=i.DEPTH_COMPONENT16),F}function w(A,v){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==on&&A.minFilter!==gn?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function T(A){let v=A.target;v.removeEventListener("dispose",T),R(v),v.isVideoTexture&&h.delete(v)}function C(A){let v=A.target;v.removeEventListener("dispose",C),b(v)}function R(A){let v=n.get(A);if(v.__webglInit===void 0)return;let F=A.source,Y=u.get(F);if(Y){let it=Y[v.__cacheKey];it.usedTimes--,it.usedTimes===0&&M(A),Object.keys(Y).length===0&&u.delete(F)}n.remove(A)}function M(A){let v=n.get(A);i.deleteTexture(v.__webglTexture);let F=A.source,Y=u.get(F);delete Y[v.__cacheKey],o.memory.textures--}function b(A){let v=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let it=0;it<v.__webglFramebuffer[Y].length;it++)i.deleteFramebuffer(v.__webglFramebuffer[Y][it]);else i.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[Y]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let F=A.textures;for(let Y=0,it=F.length;Y<it;Y++){let J=n.get(F[Y]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(F[Y])}n.remove(A)}let I=0;function O(){I=0}function G(){let A=I;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),I+=1,A}function V(A){let v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function $(A,v){let F=n.get(A);if(A.isVideoTexture&&dt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&F.__version!==A.version){let Y=A.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(F,A,v);return}}else A.isExternalTexture&&(F.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+v)}function N(A,v){let F=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){K(F,A,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+v)}function ot(A,v){let F=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){K(F,A,v);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+v)}function W(A,v){let F=n.get(A);if(A.version>0&&F.__version!==A.version){H(F,A,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+v)}let pt={[kr]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[Hr]:i.MIRRORED_REPEAT},vt={[on]:i.NEAREST,[Vc]:i.NEAREST_MIPMAP_NEAREST,[cr]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[So]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},wt={[qc]:i.NEVER,[jc]:i.ALWAYS,[Yc]:i.LESS,[pl]:i.LEQUAL,[Zc]:i.EQUAL,[Kc]:i.GEQUAL,[$c]:i.GREATER,[Jc]:i.NOTEQUAL};function Xt(A,v){if(v.type===An&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===gn||v.magFilter===So||v.magFilter===cr||v.magFilter===ai||v.minFilter===gn||v.minFilter===So||v.minFilter===cr||v.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,pt[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,pt[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,pt[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,vt[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,vt[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,wt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===on||v.minFilter!==cr&&v.minFilter!==ai||v.type===An&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function $t(A,v){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",T));let Y=v.source,it=u.get(Y);it===void 0&&(it={},u.set(Y,it));let J=V(v);if(J!==A.__cacheKey){it[J]===void 0&&(it[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),it[J].usedTimes++;let Lt=it[A.__cacheKey];Lt!==void 0&&(it[A.__cacheKey].usedTimes--,Lt.usedTimes===0&&M(v)),A.__cacheKey=J,A.__webglTexture=it[J].texture}return F}function ie(A,v,F){return Math.floor(Math.floor(A/F)/v)}function ee(A,v,F,Y){let J=A.updateRanges;if(J.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,F,Y,v.data);else{J.sort((ct,Et)=>ct.start-Et.start);let Lt=0;for(let ct=1;ct<J.length;ct++){let Et=J[Lt],Ht=J[ct],Ut=Et.start+Et.count,bt=ie(Ht.start,v.width,4),Yt=ie(Et.start,v.width,4);Ht.start<=Ut+1&&bt===Yt&&ie(Ht.start+Ht.count-1,v.width,4)===bt?Et.count=Math.max(Et.count,Ht.start+Ht.count-Et.start):(++Lt,J[Lt]=Ht)}J.length=Lt+1;let mt=i.getParameter(i.UNPACK_ROW_LENGTH),It=i.getParameter(i.UNPACK_SKIP_PIXELS),Dt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ct=0,Et=J.length;ct<Et;ct++){let Ht=J[ct],Ut=Math.floor(Ht.start/4),bt=Math.ceil(Ht.count/4),Yt=Ut%v.width,U=Math.floor(Ut/v.width),lt=bt,yt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Yt),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,Yt,U,lt,yt,F,Y,v.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,mt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,It),i.pixelStorei(i.UNPACK_SKIP_ROWS,Dt)}}function K(A,v,F){let Y=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=i.TEXTURE_3D);let it=$t(A,v),J=v.source;e.bindTexture(Y,A.__webglTexture,i.TEXTURE0+F);let Lt=n.get(J);if(J.version!==Lt.__version||it===!0){e.activeTexture(i.TEXTURE0+F);let mt=se.getPrimaries(se.workingColorSpace),It=v.colorSpace===kn?null:se.getPrimaries(v.colorSpace),Dt=v.colorSpace===kn||mt===It?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let ct=x(v.image,!1,s.maxTextureSize);ct=Bt(v,ct);let Et=r.convert(v.format,v.colorSpace),Ht=r.convert(v.type),Ut=_(v.internalFormat,Et,Ht,v.colorSpace,v.isVideoTexture);Xt(Y,v);let bt,Yt=v.mipmaps,U=v.isVideoTexture!==!0,lt=Lt.__version===void 0||it===!0,yt=J.dataReady,At=w(v,ct);if(v.isDepthTexture)Ut=y(v.format===ds,v.type),lt&&(U?e.texStorage2D(i.TEXTURE_2D,1,Ut,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,Ut,ct.width,ct.height,0,Et,Ht,null));else if(v.isDataTexture)if(Yt.length>0){U&&lt&&e.texStorage2D(i.TEXTURE_2D,At,Ut,Yt[0].width,Yt[0].height);for(let ht=0,j=Yt.length;ht<j;ht++)bt=Yt[ht],U?yt&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,bt.width,bt.height,Et,Ht,bt.data):e.texImage2D(i.TEXTURE_2D,ht,Ut,bt.width,bt.height,0,Et,Ht,bt.data);v.generateMipmaps=!1}else U?(lt&&e.texStorage2D(i.TEXTURE_2D,At,Ut,ct.width,ct.height),yt&&ee(v,ct,Et,Ht)):e.texImage2D(i.TEXTURE_2D,0,Ut,ct.width,ct.height,0,Et,Ht,ct.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){U&&lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Ut,Yt[0].width,Yt[0].height,ct.depth);for(let ht=0,j=Yt.length;ht<j;ht++)if(bt=Yt[ht],v.format!==cn)if(Et!==null)if(U){if(yt)if(v.layerUpdates.size>0){let Ct=bl(bt.width,bt.height,v.format,v.type);for(let Vt of v.layerUpdates){let le=bt.data.subarray(Vt*Ct/bt.data.BYTES_PER_ELEMENT,(Vt+1)*Ct/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,Vt,bt.width,bt.height,1,Et,le)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,0,bt.width,bt.height,ct.depth,Et,bt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ht,Ut,bt.width,bt.height,ct.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?yt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,0,bt.width,bt.height,ct.depth,Et,Ht,bt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ht,Ut,bt.width,bt.height,ct.depth,0,Et,Ht,bt.data)}else{U&&lt&&e.texStorage2D(i.TEXTURE_2D,At,Ut,Yt[0].width,Yt[0].height);for(let ht=0,j=Yt.length;ht<j;ht++)bt=Yt[ht],v.format!==cn?Et!==null?U?yt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ht,0,0,bt.width,bt.height,Et,bt.data):e.compressedTexImage2D(i.TEXTURE_2D,ht,Ut,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?yt&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,bt.width,bt.height,Et,Ht,bt.data):e.texImage2D(i.TEXTURE_2D,ht,Ut,bt.width,bt.height,0,Et,Ht,bt.data)}else if(v.isDataArrayTexture)if(U){if(lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Ut,ct.width,ct.height,ct.depth),yt)if(v.layerUpdates.size>0){let ht=bl(ct.width,ct.height,v.format,v.type);for(let j of v.layerUpdates){let Ct=ct.data.subarray(j*ht/ct.data.BYTES_PER_ELEMENT,(j+1)*ht/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,ct.width,ct.height,1,Et,Ht,Ct)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Et,Ht,ct.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ut,ct.width,ct.height,ct.depth,0,Et,Ht,ct.data);else if(v.isData3DTexture)U?(lt&&e.texStorage3D(i.TEXTURE_3D,At,Ut,ct.width,ct.height,ct.depth),yt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Et,Ht,ct.data)):e.texImage3D(i.TEXTURE_3D,0,Ut,ct.width,ct.height,ct.depth,0,Et,Ht,ct.data);else if(v.isFramebufferTexture){if(lt)if(U)e.texStorage2D(i.TEXTURE_2D,At,Ut,ct.width,ct.height);else{let ht=ct.width,j=ct.height;for(let Ct=0;Ct<At;Ct++)e.texImage2D(i.TEXTURE_2D,Ct,Ut,ht,j,0,Et,Ht,null),ht>>=1,j>>=1}}else if(Yt.length>0){if(U&&lt){let ht=Ot(Yt[0]);e.texStorage2D(i.TEXTURE_2D,At,Ut,ht.width,ht.height)}for(let ht=0,j=Yt.length;ht<j;ht++)bt=Yt[ht],U?yt&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,Et,Ht,bt):e.texImage2D(i.TEXTURE_2D,ht,Ut,Et,Ht,bt);v.generateMipmaps=!1}else if(U){if(lt){let ht=Ot(ct);e.texStorage2D(i.TEXTURE_2D,At,Ut,ht.width,ht.height)}yt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et,Ht,ct)}else e.texImage2D(i.TEXTURE_2D,0,Ut,Et,Ht,ct);m(v)&&p(Y),Lt.__version=J.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function H(A,v,F){if(v.image.length!==6)return;let Y=$t(A,v),it=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+F);let J=n.get(it);if(it.version!==J.__version||Y===!0){e.activeTexture(i.TEXTURE0+F);let Lt=se.getPrimaries(se.workingColorSpace),mt=v.colorSpace===kn?null:se.getPrimaries(v.colorSpace),It=v.colorSpace===kn||Lt===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let Dt=v.isCompressedTexture||v.image[0].isCompressedTexture,ct=v.image[0]&&v.image[0].isDataTexture,Et=[];for(let j=0;j<6;j++)!Dt&&!ct?Et[j]=x(v.image[j],!0,s.maxCubemapSize):Et[j]=ct?v.image[j].image:v.image[j],Et[j]=Bt(v,Et[j]);let Ht=Et[0],Ut=r.convert(v.format,v.colorSpace),bt=r.convert(v.type),Yt=_(v.internalFormat,Ut,bt,v.colorSpace),U=v.isVideoTexture!==!0,lt=J.__version===void 0||Y===!0,yt=it.dataReady,At=w(v,Ht);Xt(i.TEXTURE_CUBE_MAP,v);let ht;if(Dt){U&&lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,At,Yt,Ht.width,Ht.height);for(let j=0;j<6;j++){ht=Et[j].mipmaps;for(let Ct=0;Ct<ht.length;Ct++){let Vt=ht[Ct];v.format!==cn?Ut!==null?U?yt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,0,0,Vt.width,Vt.height,Ut,Vt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,Yt,Vt.width,Vt.height,0,Vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?yt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,0,0,Vt.width,Vt.height,Ut,bt,Vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,Yt,Vt.width,Vt.height,0,Ut,bt,Vt.data)}}}else{if(ht=v.mipmaps,U&&lt){ht.length>0&&At++;let j=Ot(Et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,At,Yt,j.width,j.height)}for(let j=0;j<6;j++)if(ct){U?yt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Et[j].width,Et[j].height,Ut,bt,Et[j].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Yt,Et[j].width,Et[j].height,0,Ut,bt,Et[j].data);for(let Ct=0;Ct<ht.length;Ct++){let le=ht[Ct].image[j].image;U?yt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,0,0,le.width,le.height,Ut,bt,le.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,Yt,le.width,le.height,0,Ut,bt,le.data)}}else{U?yt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ut,bt,Et[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Yt,Ut,bt,Et[j]);for(let Ct=0;Ct<ht.length;Ct++){let Vt=ht[Ct];U?yt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,0,0,Ut,bt,Vt.image[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,Yt,Ut,bt,Vt.image[j])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),J.__version=it.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function st(A,v,F,Y,it,J){let Lt=r.convert(F.format,F.colorSpace),mt=r.convert(F.type),It=_(F.internalFormat,Lt,mt,F.colorSpace),Dt=n.get(v),ct=n.get(F);if(ct.__renderTarget=v,!Dt.__hasExternalTextures){let Et=Math.max(1,v.width>>J),Ht=Math.max(1,v.height>>J);it===i.TEXTURE_3D||it===i.TEXTURE_2D_ARRAY?e.texImage3D(it,J,It,Et,Ht,v.depth,0,Lt,mt,null):e.texImage2D(it,J,It,Et,Ht,0,Lt,mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),at(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,it,ct.__webglTexture,0,xt(v)):(it===i.TEXTURE_2D||it>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,it,ct.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function _t(A,v,F){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer){let Y=v.depthTexture,it=Y&&Y.isDepthTexture?Y.type:null,J=y(v.stencilBuffer,it),Lt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=xt(v);at(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt,J,v.width,v.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt,J,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,J,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,A)}else{let Y=v.textures;for(let it=0;it<Y.length;it++){let J=Y[it],Lt=r.convert(J.format,J.colorSpace),mt=r.convert(J.type),It=_(J.internalFormat,Lt,mt,J.colorSpace),Dt=xt(v);F&&at(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,It,v.width,v.height):at(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Dt,It,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,It,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ut(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=n.get(v.depthTexture);Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),$(v.depthTexture,0);let it=Y.__webglTexture,J=xt(v);if(v.depthTexture.format===Ji)at(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0);else if(v.depthTexture.format===ds)at(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function kt(A){let v=n.get(A),F=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){let Y=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){let it=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",it)};Y.addEventListener("dispose",it),v.__depthDisposeCallback=it}v.__boundDepthTexture=Y}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let Y=A.texture.mipmaps;Y&&Y.length>0?ut(v.__webglFramebuffer[0],A):ut(v.__webglFramebuffer,A)}else if(F){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=i.createRenderbuffer(),_t(v.__webglDepthbuffer[Y],A,!1);else{let it=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,J)}}else{let Y=A.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),_t(v.__webglDepthbuffer,A,!1);else{let it=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,J)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Jt(A,v,F){let Y=n.get(A);v!==void 0&&st(Y.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&kt(A)}function P(A){let v=A.texture,F=n.get(A),Y=n.get(v);A.addEventListener("dispose",C);let it=A.textures,J=A.isWebGLCubeRenderTarget===!0,Lt=it.length>1;if(Lt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=v.version,o.memory.textures++),J){F.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[mt]=[];for(let It=0;It<v.mipmaps.length;It++)F.__webglFramebuffer[mt][It]=i.createFramebuffer()}else F.__webglFramebuffer[mt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let mt=0;mt<v.mipmaps.length;mt++)F.__webglFramebuffer[mt]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let mt=0,It=it.length;mt<It;mt++){let Dt=n.get(it[mt]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&at(A)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let mt=0;mt<it.length;mt++){let It=it[mt];F.__webglColorRenderbuffer[mt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[mt]);let Dt=r.convert(It.format,It.colorSpace),ct=r.convert(It.type),Et=_(It.internalFormat,Dt,ct,It.colorSpace,A.isXRRenderTarget===!0),Ht=xt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,Et,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,F.__webglColorRenderbuffer[mt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),_t(F.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Xt(i.TEXTURE_CUBE_MAP,v);for(let mt=0;mt<6;mt++)if(v.mipmaps&&v.mipmaps.length>0)for(let It=0;It<v.mipmaps.length;It++)st(F.__webglFramebuffer[mt][It],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,It);else st(F.__webglFramebuffer[mt],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(v)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let mt=0,It=it.length;mt<It;mt++){let Dt=it[mt],ct=n.get(Dt),Et=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Et=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Et,ct.__webglTexture),Xt(Et,Dt),st(F.__webglFramebuffer,A,Dt,i.COLOR_ATTACHMENT0+mt,Et,0),m(Dt)&&p(Et)}e.unbindTexture()}else{let mt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(mt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,Y.__webglTexture),Xt(mt,v),v.mipmaps&&v.mipmaps.length>0)for(let It=0;It<v.mipmaps.length;It++)st(F.__webglFramebuffer[It],A,v,i.COLOR_ATTACHMENT0,mt,It);else st(F.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,mt,0);m(v)&&p(mt),e.unbindTexture()}A.depthBuffer&&kt(A)}function nt(A){let v=A.textures;for(let F=0,Y=v.length;F<Y;F++){let it=v[F];if(m(it)){let J=E(A),Lt=n.get(it).__webglTexture;e.bindTexture(J,Lt),p(J),e.unbindTexture()}}}let et=[],Q=[];function tt(A){if(A.samples>0){if(at(A)===!1){let v=A.textures,F=A.width,Y=A.height,it=i.COLOR_BUFFER_BIT,J=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(A),mt=v.length>1;if(mt)for(let Dt=0;Dt<v.length;Dt++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);let It=A.texture.mipmaps;It&&It.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Dt=0;Dt<v.length;Dt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(it|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(it|=i.STENCIL_BUFFER_BIT)),mt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[Dt]);let ct=n.get(v[Dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ct,0)}i.blitFramebuffer(0,0,F,Y,0,0,F,Y,it,i.NEAREST),c===!0&&(et.length=0,Q.length=0,et.push(i.COLOR_ATTACHMENT0+Dt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(et.push(J),Q.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Q)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,et))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),mt)for(let Dt=0;Dt<v.length;Dt++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[Dt]);let ct=n.get(v[Dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.TEXTURE_2D,ct,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function xt(A){return Math.min(s.maxSamples,A.samples)}function at(A){let v=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function dt(A){let v=o.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function Bt(A,v){let F=A.colorSpace,Y=A.format,it=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==_i&&F!==kn&&(se.getTransfer(F)===ce?(Y!==cn||it!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function Ot(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=O,this.setTexture2D=$,this.setTexture2DArray=N,this.setTexture3D=ot,this.setTextureCube=W,this.rebindTextures=Jt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=kt,this.setupFrameBufferTexture=st,this.useMultisampledRTT=at}function t0(i,t){function e(n,s=kn){let r,o=se.getTransfer(s);if(n===yn)return i.UNSIGNED_BYTE;if(n===To)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===al)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ll)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===rl)return i.BYTE;if(n===ol)return i.SHORT;if(n===cs)return i.UNSIGNED_SHORT;if(n===Eo)return i.INT;if(n===li)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===hs)return i.HALF_FLOAT;if(n===cl)return i.ALPHA;if(n===hl)return i.RGB;if(n===cn)return i.RGBA;if(n===Ji)return i.DEPTH_COMPONENT;if(n===ds)return i.DEPTH_STENCIL;if(n===ul)return i.RED;if(n===Ao)return i.RED_INTEGER;if(n===dl)return i.RG;if(n===Ro)return i.RG_INTEGER;if(n===Co)return i.RGBA_INTEGER;if(n===hr||n===ur||n===dr||n===fr)if(o===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Po||n===Io||n===Do||n===Lo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Po)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Io)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Do)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Lo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Uo||n===No||n===Fo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Uo||n===No)return o===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Fo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Oo||n===Bo||n===zo||n===ko||n===Ho||n===Vo||n===Go||n===Wo||n===Xo||n===qo||n===Yo||n===Zo||n===$o||n===Jo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Bo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===zo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ko)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ho)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Vo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Go)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Yo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Zo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$o)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jo)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ko||n===jo||n===Qo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ko)return o===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===jo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ta||n===ea||n===na||n===ia)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ta)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ea)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===na)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ia)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===us?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var e0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,n0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Nl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ks(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new xn({vertexShader:e0,fragmentShader:n0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new be(new Mi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Fl=class extends Mn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new Nl,p={},E=e.getContextAttributes(),_=null,y=null,w=[],T=[],C=new rt,R=null,M=new Ge;M.viewport=new ve;let b=new Ge;b.viewport=new ve;let I=[M,b],O=new ho,G=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let H=w[K];return H===void 0&&(H=new ns,w[K]=H),H.getTargetRaySpace()},this.getControllerGrip=function(K){let H=w[K];return H===void 0&&(H=new ns,w[K]=H),H.getGripSpace()},this.getHand=function(K){let H=w[K];return H===void 0&&(H=new ns,w[K]=H),H.getHandSpace()};function $(K){let H=T.indexOf(K.inputSource);if(H===-1)return;let st=w[H];st!==void 0&&(st.update(K.inputSource,K.frame,l||o),st.dispatchEvent({type:K.type,data:K.inputSource}))}function N(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",N),s.removeEventListener("inputsourceschange",ot);for(let K=0;K<w.length;K++){let H=T[K];H!==null&&(T[K]=null,w[K].disconnect(H))}G=null,V=null,m.reset();for(let K in p)delete p[K];t.setRenderTarget(_),f=null,u=null,d=null,s=null,y=null,ee.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",N),s.addEventListener("inputsourceschange",ot),E.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let st=null,_t=null,ut=null;E.depth&&(ut=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=E.stencil?ds:Ji,_t=E.stencil?us:li);let kt={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(kt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new bn(u.textureWidth,u.textureHeight,{format:cn,type:yn,depthTexture:new zs(u.textureWidth,u.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let st={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new bn(f.framebufferWidth,f.framebufferHeight,{format:cn,type:yn,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ee.setContext(s),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ot(K){for(let H=0;H<K.removed.length;H++){let st=K.removed[H],_t=T.indexOf(st);_t>=0&&(T[_t]=null,w[_t].disconnect(st))}for(let H=0;H<K.added.length;H++){let st=K.added[H],_t=T.indexOf(st);if(_t===-1){for(let kt=0;kt<w.length;kt++)if(kt>=T.length){T.push(st),_t=kt;break}else if(T[kt]===null){T[kt]=st,_t=kt;break}if(_t===-1)break}let ut=w[_t];ut&&ut.connect(st)}}let W=new D,pt=new D;function vt(K,H,st){W.setFromMatrixPosition(H.matrixWorld),pt.setFromMatrixPosition(st.matrixWorld);let _t=W.distanceTo(pt),ut=H.projectionMatrix.elements,kt=st.projectionMatrix.elements,Jt=ut[14]/(ut[10]-1),P=ut[14]/(ut[10]+1),nt=(ut[9]+1)/ut[5],et=(ut[9]-1)/ut[5],Q=(ut[8]-1)/ut[0],tt=(kt[8]+1)/kt[0],xt=Jt*Q,at=Jt*tt,dt=_t/(-Q+tt),Bt=dt*-Q;if(H.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Bt),K.translateZ(dt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),ut[10]===-1)K.projectionMatrix.copy(H.projectionMatrix),K.projectionMatrixInverse.copy(H.projectionMatrixInverse);else{let Ot=Jt+dt,A=P+dt,v=xt-Bt,F=at+(_t-Bt),Y=nt*P/A*Ot,it=et*P/A*Ot;K.projectionMatrix.makePerspective(v,F,Y,it,Ot,A),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function wt(K,H){H===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(H.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let H=K.near,st=K.far;m.texture!==null&&(m.depthNear>0&&(H=m.depthNear),m.depthFar>0&&(st=m.depthFar)),O.near=b.near=M.near=H,O.far=b.far=M.far=st,(G!==O.near||V!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),G=O.near,V=O.far),O.layers.mask=K.layers.mask|6,M.layers.mask=O.layers.mask&3,b.layers.mask=O.layers.mask&5;let _t=K.parent,ut=O.cameras;wt(O,_t);for(let kt=0;kt<ut.length;kt++)wt(ut[kt],_t);ut.length===2?vt(O,M,b):O.projectionMatrix.copy(M.projectionMatrix),Xt(K,O,_t)};function Xt(K,H,st){st===null?K.matrix.copy(H.matrixWorld):(K.matrix.copy(st.matrixWorld),K.matrix.invert(),K.matrix.multiply(H.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(H.projectionMatrix),K.projectionMatrixInverse.copy(H.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Ki*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(K){return p[K]};let $t=null;function ie(K,H){if(h=H.getViewerPose(l||o),g=H,h!==null){let st=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let _t=!1;st.length!==O.cameras.length&&(O.cameras.length=0,_t=!0);for(let P=0;P<st.length;P++){let nt=st[P],et=null;if(f!==null)et=f.getViewport(nt);else{let tt=d.getViewSubImage(u,nt);et=tt.viewport,P===0&&(t.setRenderTargetTextures(y,tt.colorTexture,tt.depthStencilTexture),t.setRenderTarget(y))}let Q=I[P];Q===void 0&&(Q=new Ge,Q.layers.enable(P),Q.viewport=new ve,I[P]=Q),Q.matrix.fromArray(nt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(nt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(et.x,et.y,et.width,et.height),P===0&&(O.matrix.copy(Q.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),_t===!0&&O.cameras.push(Q)}let ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let P=d.getDepthInformation(st[0]);P&&P.isValid&&P.texture&&m.init(P,s.renderState)}if(ut&&ut.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let P=0;P<st.length;P++){let nt=st[P].camera;if(nt){let et=p[nt];et||(et=new ks,p[nt]=et);let Q=d.getCameraImage(nt);et.sourceTexture=Q}}}}for(let st=0;st<w.length;st++){let _t=T[st],ut=w[st];_t!==null&&ut!==void 0&&ut.update(_t,H,l||o)}$t&&$t(K,H),H.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:H}),g=null}let ee=new Ih;ee.setAnimationLoop(ie),this.setAnimationLoop=function(K){$t=K},this.dispose=function(){}}},Pi=new _n,i0=new ye;function s0(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,xl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,_,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,E,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ke&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ke&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let E=t.get(p),_=E.envMap,y=E.envMapRotation;_&&(m.envMap.value=_,Pi.copy(y),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),m.envMapRotation.value.setFromMatrix4(i0.makeRotationFromEuler(Pi)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,E,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ke&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function r0(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,_){let y=_.program;n.uniformBlockBinding(E,y)}function l(E,_){let y=s[E.id];y===void 0&&(g(E),y=h(E),s[E.id]=y,E.addEventListener("dispose",m));let w=_.program;n.updateUBOMapping(E,w);let T=t.render.frame;r[E.id]!==T&&(u(E),r[E.id]=T)}function h(E){let _=d();E.__bindingPointIndex=_;let y=i.createBuffer(),w=E.__size,T=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,w,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,y),y}function d(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){let _=s[E.id],y=E.uniforms,w=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let T=0,C=y.length;T<C;T++){let R=Array.isArray(y[T])?y[T]:[y[T]];for(let M=0,b=R.length;M<b;M++){let I=R[M];if(f(I,T,M,w)===!0){let O=I.__offset,G=Array.isArray(I.value)?I.value:[I.value],V=0;for(let $=0;$<G.length;$++){let N=G[$],ot=x(N);typeof N=="number"||typeof N=="boolean"?(I.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,O+V,I.__data)):N.isMatrix3?(I.__data[0]=N.elements[0],I.__data[1]=N.elements[1],I.__data[2]=N.elements[2],I.__data[3]=0,I.__data[4]=N.elements[3],I.__data[5]=N.elements[4],I.__data[6]=N.elements[5],I.__data[7]=0,I.__data[8]=N.elements[6],I.__data[9]=N.elements[7],I.__data[10]=N.elements[8],I.__data[11]=0):(N.toArray(I.__data,V),V+=ot.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,_,y,w){let T=E.value,C=_+"_"+y;if(w[C]===void 0)return typeof T=="number"||typeof T=="boolean"?w[C]=T:w[C]=T.clone(),!0;{let R=w[C];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return w[C]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(E){let _=E.uniforms,y=0,w=16;for(let C=0,R=_.length;C<R;C++){let M=Array.isArray(_[C])?_[C]:[_[C]];for(let b=0,I=M.length;b<I;b++){let O=M[b],G=Array.isArray(O.value)?O.value:[O.value];for(let V=0,$=G.length;V<$;V++){let N=G[V],ot=x(N),W=y%w,pt=W%ot.boundary,vt=W+pt;y+=pt,vt!==0&&w-vt<ot.storage&&(y+=w-vt),O.__data=new Float32Array(ot.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=ot.storage}}}let T=y%w;return T>0&&(y+=w-T),E.__size=y,E.__cache={},this}function x(E){let _={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(_.boundary=4,_.storage=4):E.isVector2?(_.boundary=8,_.storage=8):E.isVector3||E.isColor?(_.boundary=16,_.storage=12):E.isVector4?(_.boundary=16,_.storage=16):E.isMatrix3?(_.boundary=48,_.storage=48):E.isMatrix4?(_.boundary=64,_.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),_}function m(E){let _=E.target;_.removeEventListener("dispose",m);let y=o.indexOf(_.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(let E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var la=class{constructor(t={}){let{canvas:e=Qc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,E=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,w=!1;this._outputColorSpace=Be;let T=0,C=0,R=null,M=-1,b=null,I=new ve,O=new ve,G=null,V=new Qt(0),$=0,N=e.width,ot=e.height,W=1,pt=null,vt=null,wt=new ve(0,0,N,ot),Xt=new ve(0,0,N,ot),$t=!1,ie=new is,ee=!1,K=!1,H=new ye,st=new D,_t=new ve,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},kt=!1;function Jt(){return R===null?W:1}let P=n;function nt(S,z){return e.getContext(S,z)}try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",yt,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",ht,!1),P===null){let z="webgl2";if(P=nt(z,S),P===null)throw nt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let et,Q,tt,xt,at,dt,Bt,Ot,A,v,F,Y,it,J,Lt,mt,It,Dt,ct,Et,Ht,Ut,bt,Yt;function U(){et=new Sm(P),et.init(),Ut=new t0(P,et),Q=new gm(P,et,t,Ut),tt=new jg(P,et),Q.reversedDepthBuffer&&u&&tt.buffers.depth.setReversed(!0),xt=new wm(P),at=new zg,dt=new Qg(P,et,tt,at,Q,Ut,xt),Bt=new xm(y),Ot=new bm(y),A=new Id(P),bt=new pm(P,A),v=new Em(P,A,xt,bt),F=new Rm(P,v,A,xt),ct=new Am(P,Q,dt),mt=new _m(at),Y=new Bg(y,Bt,Ot,et,Q,bt,mt),it=new s0(y,at),J=new Hg,Lt=new Yg(et),Dt=new fm(y,Bt,Ot,tt,F,f,c),It=new Jg(y,F,Q),Yt=new r0(P,xt,Q,tt),Et=new mm(P,et,xt),Ht=new Tm(P,et,xt),xt.programs=Y.programs,y.capabilities=Q,y.extensions=et,y.properties=at,y.renderLists=J,y.shadowMap=It,y.state=tt,y.info=xt}U();let lt=new Fl(y,P);this.xr=lt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let S=et.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=et.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(N,ot,!1))},this.getSize=function(S){return S.set(N,ot)},this.setSize=function(S,z,X=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=S,ot=z,e.width=Math.floor(S*W),e.height=Math.floor(z*W),X===!0&&(e.style.width=S+"px",e.style.height=z+"px"),this.setViewport(0,0,S,z)},this.getDrawingBufferSize=function(S){return S.set(N*W,ot*W).floor()},this.setDrawingBufferSize=function(S,z,X){N=S,ot=z,W=X,e.width=Math.floor(S*X),e.height=Math.floor(z*X),this.setViewport(0,0,S,z)},this.getCurrentViewport=function(S){return S.copy(I)},this.getViewport=function(S){return S.copy(wt)},this.setViewport=function(S,z,X,q){S.isVector4?wt.set(S.x,S.y,S.z,S.w):wt.set(S,z,X,q),tt.viewport(I.copy(wt).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(Xt)},this.setScissor=function(S,z,X,q){S.isVector4?Xt.set(S.x,S.y,S.z,S.w):Xt.set(S,z,X,q),tt.scissor(O.copy(Xt).multiplyScalar(W).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(S){tt.setScissorTest($t=S)},this.setOpaqueSort=function(S){pt=S},this.setTransparentSort=function(S){vt=S},this.getClearColor=function(S){return S.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor(...arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha(...arguments)},this.clear=function(S=!0,z=!0,X=!0){let q=0;if(S){let k=!1;if(R!==null){let ft=R.texture.format;k=ft===Co||ft===Ro||ft===Ao}if(k){let ft=R.texture.type,Tt=ft===yn||ft===li||ft===cs||ft===us||ft===To||ft===wo,Nt=Dt.getClearColor(),Rt=Dt.getClearAlpha(),Wt=Nt.r,qt=Nt.g,zt=Nt.b;Tt?(g[0]=Wt,g[1]=qt,g[2]=zt,g[3]=Rt,P.clearBufferuiv(P.COLOR,0,g)):(x[0]=Wt,x[1]=qt,x[2]=zt,x[3]=Rt,P.clearBufferiv(P.COLOR,0,x))}else q|=P.COLOR_BUFFER_BIT}z&&(q|=P.DEPTH_BUFFER_BIT),X&&(q|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",yt,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),Dt.dispose(),J.dispose(),Lt.dispose(),at.dispose(),Bt.dispose(),Ot.dispose(),F.dispose(),bt.dispose(),Yt.dispose(),Y.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",qe),lt.removeEventListener("sessionend",L),B.stop()};function yt(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let S=xt.autoReset,z=It.enabled,X=It.autoUpdate,q=It.needsUpdate,k=It.type;U(),xt.autoReset=S,It.enabled=z,It.autoUpdate=X,It.needsUpdate=q,It.type=k}function ht(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function j(S){let z=S.target;z.removeEventListener("dispose",j),Ct(z)}function Ct(S){Vt(S),at.remove(S)}function Vt(S){let z=at.get(S).programs;z!==void 0&&(z.forEach(function(X){Y.releaseProgram(X)}),S.isShaderMaterial&&Y.releaseShaderCache(S))}this.renderBufferDirect=function(S,z,X,q,k,ft){z===null&&(z=ut);let Tt=k.isMesh&&k.matrixWorld.determinant()<0,Nt=Ui(S,z,X,q,k);tt.setMaterial(q,Tt);let Rt=X.index,Wt=1;if(q.wireframe===!0){if(Rt=v.getWireframeAttribute(X),Rt===void 0)return;Wt=2}let qt=X.drawRange,zt=X.attributes.position,ne=qt.start*Wt,he=(qt.start+qt.count)*Wt;ft!==null&&(ne=Math.max(ne,ft.start*Wt),he=Math.min(he,(ft.start+ft.count)*Wt)),Rt!==null?(ne=Math.max(ne,0),he=Math.min(he,Rt.count)):zt!=null&&(ne=Math.max(ne,0),he=Math.min(he,zt.count));let Me=he-ne;if(Me<0||Me===1/0)return;bt.setup(k,q,Nt,X,Rt);let fe,de=Et;if(Rt!==null&&(fe=A.get(Rt),de=Ht,de.setIndex(fe)),k.isMesh)q.wireframe===!0?(tt.setLineWidth(q.wireframeLinewidth*Jt()),de.setMode(P.LINES)):de.setMode(P.TRIANGLES);else if(k.isLine){let Gt=q.linewidth;Gt===void 0&&(Gt=1),tt.setLineWidth(Gt*Jt()),k.isLineSegments?de.setMode(P.LINES):k.isLineLoop?de.setMode(P.LINE_LOOP):de.setMode(P.LINE_STRIP)}else k.isPoints?de.setMode(P.POINTS):k.isSprite&&de.setMode(P.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ji("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),de.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))de.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Gt=k._multiDrawStarts,ge=k._multiDrawCounts,ae=k._multiDrawCount,Ye=Rt?A.get(Rt).bytesPerElement:1,Ni=at.get(q).currentProgram.getUniforms();for(let Ze=0;Ze<ae;Ze++)Ni.setValue(P,"_gl_DrawID",Ze),de.render(Gt[Ze]/Ye,ge[Ze])}else if(k.isInstancedMesh)de.renderInstances(ne,Me,k.count);else if(X.isInstancedBufferGeometry){let Gt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,ge=Math.min(X.instanceCount,Gt);de.renderInstances(ne,Me,ge)}else de.render(ne,Me)};function le(S,z,X){S.transparent===!0&&S.side===ln&&S.forceSinglePass===!1?(S.side=ke,S.needsUpdate=!0,oe(S,z,X),S.side=Fn,S.needsUpdate=!0,oe(S,z,X),S.side=ln):oe(S,z,X)}this.compile=function(S,z,X=null){X===null&&(X=S),p=Lt.get(X),p.init(z),_.push(p),X.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),S!==X&&S.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let q=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ft=k.material;if(ft)if(Array.isArray(ft))for(let Tt=0;Tt<ft.length;Tt++){let Nt=ft[Tt];le(Nt,X,k),q.add(Nt)}else le(ft,X,k),q.add(ft)}),p=_.pop(),q},this.compileAsync=function(S,z,X=null){let q=this.compile(S,z,X);return new Promise(k=>{function ft(){if(q.forEach(function(Tt){at.get(Tt).currentProgram.isReady()&&q.delete(Tt)}),q.size===0){k(S);return}setTimeout(ft,10)}et.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let re=null;function tn(S){re&&re(S)}function qe(){B.stop()}function L(){B.start()}let B=new Ih;B.setAnimationLoop(tn),typeof self<"u"&&B.setContext(self),this.setAnimationLoop=function(S){re=S,lt.setAnimationLoop(S),S===null?B.stop():B.start()},lt.addEventListener("sessionstart",qe),lt.addEventListener("sessionend",L),this.render=function(S,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(z),z=lt.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,z,R),p=Lt.get(S,_.length),p.init(z),_.push(p),H.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ie.setFromProjectionMatrix(H,mn,z.reversedDepth),K=this.localClippingEnabled,ee=mt.init(this.clippingPlanes,K),m=J.get(S,E.length),m.init(),E.push(m),lt.enabled===!0&&lt.isPresenting===!0){let ft=y.xr.getDepthSensingMesh();ft!==null&&Z(ft,z,-1/0,y.sortObjects)}Z(S,z,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(pt,vt),kt=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,kt&&Dt.addToRenderList(m,S),this.info.render.frame++,ee===!0&&mt.beginShadows();let X=p.state.shadowsArray;It.render(X,S,z),ee===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=m.opaque,k=m.transmissive;if(p.setupLights(),z.isArrayCamera){let ft=z.cameras;if(k.length>0)for(let Tt=0,Nt=ft.length;Tt<Nt;Tt++){let Rt=ft[Tt];Mt(q,k,S,Rt)}kt&&Dt.render(S);for(let Tt=0,Nt=ft.length;Tt<Nt;Tt++){let Rt=ft[Tt];gt(m,S,Rt,Rt.viewport)}}else k.length>0&&Mt(q,k,S,z),kt&&Dt.render(S),gt(m,S,z);R!==null&&C===0&&(dt.updateMultisampleRenderTarget(R),dt.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(y,S,z),bt.resetDefaultState(),M=-1,b=null,_.pop(),_.length>0?(p=_[_.length-1],ee===!0&&mt.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Z(S,z,X,q){if(S.visible===!1)return;if(S.layers.test(z.layers)){if(S.isGroup)X=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(z);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ie.intersectsSprite(S)){q&&_t.setFromMatrixPosition(S.matrixWorld).applyMatrix4(H);let Tt=F.update(S),Nt=S.material;Nt.visible&&m.push(S,Tt,Nt,X,_t.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ie.intersectsObject(S))){let Tt=F.update(S),Nt=S.material;if(q&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),_t.copy(S.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),_t.copy(Tt.boundingSphere.center)),_t.applyMatrix4(S.matrixWorld).applyMatrix4(H)),Array.isArray(Nt)){let Rt=Tt.groups;for(let Wt=0,qt=Rt.length;Wt<qt;Wt++){let zt=Rt[Wt],ne=Nt[zt.materialIndex];ne&&ne.visible&&m.push(S,Tt,ne,X,_t.z,zt)}}else Nt.visible&&m.push(S,Tt,Nt,X,_t.z,null)}}let ft=S.children;for(let Tt=0,Nt=ft.length;Tt<Nt;Tt++)Z(ft[Tt],z,X,q)}function gt(S,z,X,q){let k=S.opaque,ft=S.transmissive,Tt=S.transparent;p.setupLightsView(X),ee===!0&&mt.setGlobalState(y.clippingPlanes,X),q&&tt.viewport(I.copy(q)),k.length>0&&Ft(k,z,X),ft.length>0&&Ft(ft,z,X),Tt.length>0&&Ft(Tt,z,X),tt.buffers.depth.setTest(!0),tt.buffers.depth.setMask(!0),tt.buffers.color.setMask(!0),tt.setPolygonOffset(!1)}function Mt(S,z,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new bn(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?hs:yn,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));let ft=p.state.transmissionRenderTarget[q.id],Tt=q.viewport||I;ft.setSize(Tt.z*y.transmissionResolutionScale,Tt.w*y.transmissionResolutionScale);let Nt=y.getRenderTarget(),Rt=y.getActiveCubeFace(),Wt=y.getActiveMipmapLevel();y.setRenderTarget(ft),y.getClearColor(V),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),kt&&Dt.render(X);let qt=y.toneMapping;y.toneMapping=zn;let zt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),ee===!0&&mt.setGlobalState(y.clippingPlanes,q),Ft(S,X,q),dt.updateMultisampleRenderTarget(ft),dt.updateRenderTargetMipmap(ft),et.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let he=0,Me=z.length;he<Me;he++){let fe=z[he],de=fe.object,Gt=fe.geometry,ge=fe.material,ae=fe.group;if(ge.side===ln&&de.layers.test(q.layers)){let Ye=ge.side;ge.side=ke,ge.needsUpdate=!0,Pt(de,X,q,Gt,ge,ae),ge.side=Ye,ge.needsUpdate=!0,ne=!0}}ne===!0&&(dt.updateMultisampleRenderTarget(ft),dt.updateRenderTargetMipmap(ft))}y.setRenderTarget(Nt,Rt,Wt),y.setClearColor(V,$),zt!==void 0&&(q.viewport=zt),y.toneMapping=qt}function Ft(S,z,X){let q=z.isScene===!0?z.overrideMaterial:null;for(let k=0,ft=S.length;k<ft;k++){let Tt=S[k],Nt=Tt.object,Rt=Tt.geometry,Wt=Tt.group,qt=Tt.material;qt.allowOverride===!0&&q!==null&&(qt=q),Nt.layers.test(X.layers)&&Pt(Nt,z,X,Rt,qt,Wt)}}function Pt(S,z,X,q,k,ft){S.onBeforeRender(y,z,X,q,k,ft),S.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(y,z,X,q,S,ft),k.transparent===!0&&k.side===ln&&k.forceSinglePass===!1?(k.side=ke,k.needsUpdate=!0,y.renderBufferDirect(X,z,q,k,S,ft),k.side=Fn,k.needsUpdate=!0,y.renderBufferDirect(X,z,q,k,S,ft),k.side=ln):y.renderBufferDirect(X,z,q,k,S,ft),S.onAfterRender(y,z,X,q,k,ft)}function oe(S,z,X){z.isScene!==!0&&(z=ut);let q=at.get(S),k=p.state.lights,ft=p.state.shadowsArray,Tt=k.state.version,Nt=Y.getParameters(S,k.state,ft,z,X),Rt=Y.getProgramCacheKey(Nt),Wt=q.programs;q.environment=S.isMeshStandardMaterial?z.environment:null,q.fog=z.fog,q.envMap=(S.isMeshStandardMaterial?Ot:Bt).get(S.envMap||q.environment),q.envMapRotation=q.environment!==null&&S.envMap===null?z.environmentRotation:S.envMapRotation,Wt===void 0&&(S.addEventListener("dispose",j),Wt=new Map,q.programs=Wt);let qt=Wt.get(Rt);if(qt!==void 0){if(q.currentProgram===qt&&q.lightsStateVersion===Tt)return Pe(S,Nt),qt}else Nt.uniforms=Y.getUniforms(S),S.onBeforeCompile(Nt,y),qt=Y.acquireProgram(Nt,Rt),Wt.set(Rt,qt),q.uniforms=Nt.uniforms;let zt=q.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(zt.clippingPlanes=mt.uniform),Pe(S,Nt),q.needsLights=tu(S),q.lightsStateVersion=Tt,q.needsLights&&(zt.ambientLightColor.value=k.state.ambient,zt.lightProbe.value=k.state.probe,zt.directionalLights.value=k.state.directional,zt.directionalLightShadows.value=k.state.directionalShadow,zt.spotLights.value=k.state.spot,zt.spotLightShadows.value=k.state.spotShadow,zt.rectAreaLights.value=k.state.rectArea,zt.ltc_1.value=k.state.rectAreaLTC1,zt.ltc_2.value=k.state.rectAreaLTC2,zt.pointLights.value=k.state.point,zt.pointLightShadows.value=k.state.pointShadow,zt.hemisphereLights.value=k.state.hemi,zt.directionalShadowMap.value=k.state.directionalShadowMap,zt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,zt.spotShadowMap.value=k.state.spotShadowMap,zt.spotLightMatrix.value=k.state.spotLightMatrix,zt.spotLightMap.value=k.state.spotLightMap,zt.pointShadowMap.value=k.state.pointShadowMap,zt.pointShadowMatrix.value=k.state.pointShadowMatrix),q.currentProgram=qt,q.uniformsList=null,qt}function me(S){if(S.uniformsList===null){let z=S.currentProgram.getUniforms();S.uniformsList=ms.seqWithValue(z.seq,S.uniforms)}return S.uniformsList}function Pe(S,z){let X=at.get(S);X.outputColorSpace=z.outputColorSpace,X.batching=z.batching,X.batchingColor=z.batchingColor,X.instancing=z.instancing,X.instancingColor=z.instancingColor,X.instancingMorph=z.instancingMorph,X.skinning=z.skinning,X.morphTargets=z.morphTargets,X.morphNormals=z.morphNormals,X.morphColors=z.morphColors,X.morphTargetsCount=z.morphTargetsCount,X.numClippingPlanes=z.numClippingPlanes,X.numIntersection=z.numClipIntersection,X.vertexAlphas=z.vertexAlphas,X.vertexTangents=z.vertexTangents,X.toneMapping=z.toneMapping}function Ui(S,z,X,q,k){z.isScene!==!0&&(z=ut),dt.resetTextureUnits();let ft=z.fog,Tt=q.isMeshStandardMaterial?z.environment:null,Nt=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:_i,Rt=(q.isMeshStandardMaterial?Ot:Bt).get(q.envMap||Tt),Wt=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,qt=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),zt=!!X.morphAttributes.position,ne=!!X.morphAttributes.normal,he=!!X.morphAttributes.color,Me=zn;q.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Me=y.toneMapping);let fe=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,de=fe!==void 0?fe.length:0,Gt=at.get(q),ge=p.state.lights;if(ee===!0&&(K===!0||S!==b)){let Fe=S===b&&q.id===M;mt.setState(q,S,Fe)}let ae=!1;q.version===Gt.__version?(Gt.needsLights&&Gt.lightsStateVersion!==ge.state.version||Gt.outputColorSpace!==Nt||k.isBatchedMesh&&Gt.batching===!1||!k.isBatchedMesh&&Gt.batching===!0||k.isBatchedMesh&&Gt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Gt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Gt.instancing===!1||!k.isInstancedMesh&&Gt.instancing===!0||k.isSkinnedMesh&&Gt.skinning===!1||!k.isSkinnedMesh&&Gt.skinning===!0||k.isInstancedMesh&&Gt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Gt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Gt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Gt.instancingMorph===!1&&k.morphTexture!==null||Gt.envMap!==Rt||q.fog===!0&&Gt.fog!==ft||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==mt.numPlanes||Gt.numIntersection!==mt.numIntersection)||Gt.vertexAlphas!==Wt||Gt.vertexTangents!==qt||Gt.morphTargets!==zt||Gt.morphNormals!==ne||Gt.morphColors!==he||Gt.toneMapping!==Me||Gt.morphTargetsCount!==de)&&(ae=!0):(ae=!0,Gt.__version=q.version);let Ye=Gt.currentProgram;ae===!0&&(Ye=oe(q,z,k));let Ni=!1,Ze=!1,ys=!1,_e=Ye.getUniforms(),en=Gt.uniforms;if(tt.useProgram(Ye.program)&&(Ni=!0,Ze=!0,ys=!0),q.id!==M&&(M=q.id,Ze=!0),Ni||b!==S){tt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),_e.setValue(P,"projectionMatrix",S.projectionMatrix),_e.setValue(P,"viewMatrix",S.matrixWorldInverse);let Ve=_e.map.cameraPosition;Ve!==void 0&&Ve.setValue(P,st.setFromMatrixPosition(S.matrixWorld)),Q.logarithmicDepthBuffer&&_e.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&_e.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),b!==S&&(b=S,Ze=!0,ys=!0)}if(k.isSkinnedMesh){_e.setOptional(P,k,"bindMatrix"),_e.setOptional(P,k,"bindMatrixInverse");let Fe=k.skeleton;Fe&&(Fe.boneTexture===null&&Fe.computeBoneTexture(),_e.setValue(P,"boneTexture",Fe.boneTexture,dt))}k.isBatchedMesh&&(_e.setOptional(P,k,"batchingTexture"),_e.setValue(P,"batchingTexture",k._matricesTexture,dt),_e.setOptional(P,k,"batchingIdTexture"),_e.setValue(P,"batchingIdTexture",k._indirectTexture,dt),_e.setOptional(P,k,"batchingColorTexture"),k._colorsTexture!==null&&_e.setValue(P,"batchingColorTexture",k._colorsTexture,dt));let nn=X.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&ct.update(k,X,Ye),(Ze||Gt.receiveShadow!==k.receiveShadow)&&(Gt.receiveShadow=k.receiveShadow,_e.setValue(P,"receiveShadow",k.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(en.envMap.value=Rt,en.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&z.environment!==null&&(en.envMapIntensity.value=z.environmentIntensity),Ze&&(_e.setValue(P,"toneMappingExposure",y.toneMappingExposure),Gt.needsLights&&Qh(en,ys),ft&&q.fog===!0&&it.refreshFogUniforms(en,ft),it.refreshMaterialUniforms(en,q,W,ot,p.state.transmissionRenderTarget[S.id]),ms.upload(P,me(Gt),en,dt)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(ms.upload(P,me(Gt),en,dt),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&_e.setValue(P,"center",k.center),_e.setValue(P,"modelViewMatrix",k.modelViewMatrix),_e.setValue(P,"normalMatrix",k.normalMatrix),_e.setValue(P,"modelMatrix",k.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let Fe=q.uniformsGroups;for(let Ve=0,pa=Fe.length;Ve<pa;Ve++){let ci=Fe[Ve];Yt.update(ci,Ye),Yt.bind(ci,Ye)}}return Ye}function Qh(S,z){S.ambientLightColor.needsUpdate=z,S.lightProbe.needsUpdate=z,S.directionalLights.needsUpdate=z,S.directionalLightShadows.needsUpdate=z,S.pointLights.needsUpdate=z,S.pointLightShadows.needsUpdate=z,S.spotLights.needsUpdate=z,S.spotLightShadows.needsUpdate=z,S.rectAreaLights.needsUpdate=z,S.hemisphereLights.needsUpdate=z}function tu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,z,X){let q=at.get(S);q.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),at.get(S.texture).__webglTexture=z,at.get(S.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:X,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,z){let X=at.get(S);X.__webglFramebuffer=z,X.__useDefaultFramebuffer=z===void 0};let eu=P.createFramebuffer();this.setRenderTarget=function(S,z=0,X=0){R=S,T=z,C=X;let q=!0,k=null,ft=!1,Tt=!1;if(S){let Rt=at.get(S);if(Rt.__useDefaultFramebuffer!==void 0)tt.bindFramebuffer(P.FRAMEBUFFER,null),q=!1;else if(Rt.__webglFramebuffer===void 0)dt.setupRenderTarget(S);else if(Rt.__hasExternalTextures)dt.rebindTextures(S,at.get(S.texture).__webglTexture,at.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let zt=S.depthTexture;if(Rt.__boundDepthTexture!==zt){if(zt!==null&&at.has(zt)&&(S.width!==zt.image.width||S.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");dt.setupDepthRenderbuffer(S)}}let Wt=S.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(Tt=!0);let qt=at.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(qt[z])?k=qt[z][X]:k=qt[z],ft=!0):S.samples>0&&dt.useMultisampledRTT(S)===!1?k=at.get(S).__webglMultisampledFramebuffer:Array.isArray(qt)?k=qt[X]:k=qt,I.copy(S.viewport),O.copy(S.scissor),G=S.scissorTest}else I.copy(wt).multiplyScalar(W).floor(),O.copy(Xt).multiplyScalar(W).floor(),G=$t;if(X!==0&&(k=eu),tt.bindFramebuffer(P.FRAMEBUFFER,k)&&q&&tt.drawBuffers(S,k),tt.viewport(I),tt.scissor(O),tt.setScissorTest(G),ft){let Rt=at.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+z,Rt.__webglTexture,X)}else if(Tt){let Rt=z;for(let Wt=0;Wt<S.textures.length;Wt++){let qt=at.get(S.textures[Wt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Wt,qt.__webglTexture,X,Rt)}}else if(S!==null&&X!==0){let Rt=at.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Rt.__webglTexture,X)}M=-1},this.readRenderTargetPixels=function(S,z,X,q,k,ft,Tt,Nt=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=at.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt){tt.bindFramebuffer(P.FRAMEBUFFER,Rt);try{let Wt=S.textures[Nt],qt=Wt.format,zt=Wt.type;if(!Q.textureFormatReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Q.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=S.width-q&&X>=0&&X<=S.height-k&&(S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Nt),P.readPixels(z,X,q,k,Ut.convert(qt),Ut.convert(zt),ft))}finally{let Wt=R!==null?at.get(R).__webglFramebuffer:null;tt.bindFramebuffer(P.FRAMEBUFFER,Wt)}}},this.readRenderTargetPixelsAsync=async function(S,z,X,q,k,ft,Tt,Nt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=at.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt)if(z>=0&&z<=S.width-q&&X>=0&&X<=S.height-k){tt.bindFramebuffer(P.FRAMEBUFFER,Rt);let Wt=S.textures[Nt],qt=Wt.format,zt=Wt.type;if(!Q.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Q.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ne=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,ne),P.bufferData(P.PIXEL_PACK_BUFFER,ft.byteLength,P.STREAM_READ),S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Nt),P.readPixels(z,X,q,k,Ut.convert(qt),Ut.convert(zt),0);let he=R!==null?at.get(R).__webglFramebuffer:null;tt.bindFramebuffer(P.FRAMEBUFFER,he);let Me=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await th(P,Me,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,ne),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ft),P.deleteBuffer(ne),P.deleteSync(Me),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,z=null,X=0){let q=Math.pow(2,-X),k=Math.floor(S.image.width*q),ft=Math.floor(S.image.height*q),Tt=z!==null?z.x:0,Nt=z!==null?z.y:0;dt.setTexture2D(S,0),P.copyTexSubImage2D(P.TEXTURE_2D,X,0,0,Tt,Nt,k,ft),tt.unbindTexture()};let nu=P.createFramebuffer(),iu=P.createFramebuffer();this.copyTextureToTexture=function(S,z,X=null,q=null,k=0,ft=null){ft===null&&(k!==0?(ji("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ft=k,k=0):ft=0);let Tt,Nt,Rt,Wt,qt,zt,ne,he,Me,fe=S.isCompressedTexture?S.mipmaps[ft]:S.image;if(X!==null)Tt=X.max.x-X.min.x,Nt=X.max.y-X.min.y,Rt=X.isBox3?X.max.z-X.min.z:1,Wt=X.min.x,qt=X.min.y,zt=X.isBox3?X.min.z:0;else{let nn=Math.pow(2,-k);Tt=Math.floor(fe.width*nn),Nt=Math.floor(fe.height*nn),S.isDataArrayTexture?Rt=fe.depth:S.isData3DTexture?Rt=Math.floor(fe.depth*nn):Rt=1,Wt=0,qt=0,zt=0}q!==null?(ne=q.x,he=q.y,Me=q.z):(ne=0,he=0,Me=0);let de=Ut.convert(z.format),Gt=Ut.convert(z.type),ge;z.isData3DTexture?(dt.setTexture3D(z,0),ge=P.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(dt.setTexture2DArray(z,0),ge=P.TEXTURE_2D_ARRAY):(dt.setTexture2D(z,0),ge=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,z.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,z.unpackAlignment);let ae=P.getParameter(P.UNPACK_ROW_LENGTH),Ye=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ni=P.getParameter(P.UNPACK_SKIP_PIXELS),Ze=P.getParameter(P.UNPACK_SKIP_ROWS),ys=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,fe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,fe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Wt),P.pixelStorei(P.UNPACK_SKIP_ROWS,qt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,zt);let _e=S.isDataArrayTexture||S.isData3DTexture,en=z.isDataArrayTexture||z.isData3DTexture;if(S.isDepthTexture){let nn=at.get(S),Fe=at.get(z),Ve=at.get(nn.__renderTarget),pa=at.get(Fe.__renderTarget);tt.bindFramebuffer(P.READ_FRAMEBUFFER,Ve.__webglFramebuffer),tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,pa.__webglFramebuffer);for(let ci=0;ci<Rt;ci++)_e&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,at.get(S).__webglTexture,k,zt+ci),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,at.get(z).__webglTexture,ft,Me+ci)),P.blitFramebuffer(Wt,qt,Tt,Nt,ne,he,Tt,Nt,P.DEPTH_BUFFER_BIT,P.NEAREST);tt.bindFramebuffer(P.READ_FRAMEBUFFER,null),tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||at.has(S)){let nn=at.get(S),Fe=at.get(z);tt.bindFramebuffer(P.READ_FRAMEBUFFER,nu),tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,iu);for(let Ve=0;Ve<Rt;Ve++)_e?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,nn.__webglTexture,k,zt+Ve):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,nn.__webglTexture,k),en?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Fe.__webglTexture,ft,Me+Ve):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Fe.__webglTexture,ft),k!==0?P.blitFramebuffer(Wt,qt,Tt,Nt,ne,he,Tt,Nt,P.COLOR_BUFFER_BIT,P.NEAREST):en?P.copyTexSubImage3D(ge,ft,ne,he,Me+Ve,Wt,qt,Tt,Nt):P.copyTexSubImage2D(ge,ft,ne,he,Wt,qt,Tt,Nt);tt.bindFramebuffer(P.READ_FRAMEBUFFER,null),tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else en?S.isDataTexture||S.isData3DTexture?P.texSubImage3D(ge,ft,ne,he,Me,Tt,Nt,Rt,de,Gt,fe.data):z.isCompressedArrayTexture?P.compressedTexSubImage3D(ge,ft,ne,he,Me,Tt,Nt,Rt,de,fe.data):P.texSubImage3D(ge,ft,ne,he,Me,Tt,Nt,Rt,de,Gt,fe):S.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ft,ne,he,Tt,Nt,de,Gt,fe.data):S.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ft,ne,he,fe.width,fe.height,de,fe.data):P.texSubImage2D(P.TEXTURE_2D,ft,ne,he,Tt,Nt,de,Gt,fe);P.pixelStorei(P.UNPACK_ROW_LENGTH,ae),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ye),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ni),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ze),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ys),ft===0&&z.generateMipmaps&&P.generateMipmap(ge),tt.unbindTexture()},this.initRenderTarget=function(S){at.get(S).__webglFramebuffer===void 0&&dt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?dt.setTextureCube(S,0):S.isData3DTexture?dt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?dt.setTexture2DArray(S,0):dt.setTexture2D(S,0),tt.unbindTexture()},this.resetState=function(){T=0,C=0,R=null,tt.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}};var Oh={type:"change"},zl={type:"start"},zh={type:"end"},ha=new xi,Bh=new rn,o0=Math.cos(70*Hn.DEG2RAD),Re=new D,We=2*Math.PI,ue={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Bl=1e-6,ua=class extends ar{constructor(t,e=null){super(t,e),this.state=ue.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ri.ROTATE,MIDDLE:ri.DOLLY,RIGHT:ri.PAN},this.touches={ONE:oi.ROTATE,TWO:oi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new an,this._lastTargetPosition=new D,this._quat=new an().setFromUnitVectors(t.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ls,this._sphericalDelta=new ls,this._scale=1,this._panOffset=new D,this._rotateStart=new rt,this._rotateEnd=new rt,this._rotateDelta=new rt,this._panStart=new rt,this._panEnd=new rt,this._panDelta=new rt,this._dollyStart=new rt,this._dollyEnd=new rt,this._dollyDelta=new rt,this._dollyDirection=new D,this._mouse=new rt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=l0.bind(this),this._onPointerDown=a0.bind(this),this._onPointerUp=c0.bind(this),this._onContextMenu=g0.bind(this),this._onMouseWheel=d0.bind(this),this._onKeyDown=f0.bind(this),this._onTouchStart=p0.bind(this),this._onTouchMove=m0.bind(this),this._onMouseDown=h0.bind(this),this._onMouseMove=u0.bind(this),this._interceptControlDown=_0.bind(this),this._interceptControlUp=x0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Oh),this.update(),this.state=ue.NONE}update(t=null){let e=this.object.position;Re.copy(e).sub(this.target),Re.applyQuaternion(this._quat),this._spherical.setFromVector3(Re),this.autoRotate&&this.state===ue.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=We:n>Math.PI&&(n-=We),s<-Math.PI?s+=We:s>Math.PI&&(s-=We),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Re.setFromSpherical(this._spherical),Re.applyQuaternion(this._quatInverse),e.copy(this.target).add(Re),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Re.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new D(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new D(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Re.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ha.origin.copy(this.object.position),ha.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ha.direction))<o0?this.object.lookAt(this.target):(Bh.setFromNormalAndCoplanarPoint(this.object.up,this.target),ha.intersectPlane(Bh,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Bl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Bl||this._lastTargetPosition.distanceToSquared(this.target)>Bl?(this.dispatchEvent(Oh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?We/60*this.autoRotateSpeed*t:We/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Re.setFromMatrixColumn(e,0),Re.multiplyScalar(-t),this._panOffset.add(Re)}_panUp(t,e){this.screenSpacePanning===!0?Re.setFromMatrixColumn(e,1):(Re.setFromMatrixColumn(e,0),Re.crossVectors(this.object.up,Re)),Re.multiplyScalar(t),this._panOffset.add(Re)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Re.copy(s).sub(this.target);let r=Re.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new rt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function a0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function l0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function c0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(zh),this.state=ue.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function h0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ri.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ue.DOLLY;break;case ri.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ue.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ue.ROTATE}break;case ri.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ue.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ue.PAN}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(zl)}function u0(i){switch(this.state){case ue.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ue.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ue.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function d0(i){this.enabled===!1||this.enableZoom===!1||this.state!==ue.NONE||(i.preventDefault(),this.dispatchEvent(zl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(zh))}function f0(i){this.enabled!==!1&&this._handleKeyDown(i)}function p0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case oi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ue.TOUCH_ROTATE;break;case oi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ue.TOUCH_PAN;break;default:this.state=ue.NONE}break;case 2:switch(this.touches.TWO){case oi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ue.TOUCH_DOLLY_PAN;break;case oi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ue.TOUCH_DOLLY_ROTATE;break;default:this.state=ue.NONE}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(zl)}function m0(i){switch(this._trackPointer(i),this.state){case ue.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ue.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ue.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ue.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ue.NONE}}function g0(i){this.enabled!==!1&&i.preventDefault()}function _0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function x0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var mr=new D;function hn(i,t,e,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;mr.copy(t),mr[n]=0,mr.normalize();let l=.5*o/(o+a),h=1-mr.angleTo(i)/c;return Math.sign(mr[e])===1?h*l:a/(o+a)+l+l*(1-h)}var Li=class i extends Sn{constructor(t=1,e=1,n=1,s=2,r=.1){let o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let c=new D,l=new D,h=new D(t,e,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,g=d.length/6,x=new D,m=.5/o;for(let p=0,E=0;p<d.length;p+=3,E+=2)switch(c.fromArray(d,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),d[p+0]=h.x*Math.sign(c.x)+l.x*r,d[p+1]=h.y*Math.sign(c.y)+l.y*r,d[p+2]=h.z*Math.sign(c.z)+l.z*r,u[p+0]=l.x,u[p+1]=l.y,u[p+2]=l.z,Math.floor(p/g)){case 0:x.set(1,0,0),f[E+0]=hn(x,l,"z","y",r,n),f[E+1]=1-hn(x,l,"y","z",r,e);break;case 1:x.set(-1,0,0),f[E+0]=1-hn(x,l,"z","y",r,n),f[E+1]=1-hn(x,l,"y","z",r,e);break;case 2:x.set(0,1,0),f[E+0]=1-hn(x,l,"x","z",r,t),f[E+1]=hn(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),f[E+0]=1-hn(x,l,"x","z",r,t),f[E+1]=1-hn(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),f[E+0]=1-hn(x,l,"x","y",r,t),f[E+1]=1-hn(x,l,"y","x",r,e);break;case 5:x.set(0,0,-1),f[E+0]=hn(x,l,"x","y",r,t),f[E+1]=1-hn(x,l,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};function da(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Ee,l=0;for(let h=0;h<i.length;++h){let d=i[h],u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0,d=[];for(let u=0;u<i.length;++u){let f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}c.setIndex(d)}for(let h in r){let d=kh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(let h in o){let d=o[h][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][u]);let g=kh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function kh(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new ze(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let d=c/e;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<e;g++){let x=h.getComponent(u,g);a.setComponent(u+d,g,x)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}var _s=[{id:0,name:"Boss",department:"management",role:"Boss",gender:"male",status:"desk",location:"Private office",color:"#9c7054",tint:"#f1e6da",skin:"#c7946d",hair:"#38322f",position:[3.2,4.05],rotation:Math.PI,seated:!0},{id:1,name:"Cikda",department:"management",role:"Boss assistant",gender:"female",status:"desk",location:"Open workspace",color:"#8a738d",tint:"#efe5ef",skin:"#d9ab83",hair:"#4b3a33",position:[-.15,-14.85],rotation:Math.PI,seated:!0},{id:2,name:"Minn",department:"design",role:"Designer",gender:"female",status:"desk",location:"Open workspace",color:"#668b7a",tint:"#e4eee8",skin:"#e6bc97",hair:"#433731",position:[-1.5,-12.45],rotation:Math.PI/2,seated:!0},{id:3,name:"Afiq",department:"design",role:"Designer",gender:"male",status:"desk",location:"Open workspace",color:"#527583",tint:"#e1ebef",skin:"#cea27d",hair:"#292f32",position:[3.2,-12.45],rotation:-Math.PI/2,seated:!0},{id:4,name:"Nisa",department:"sales",role:"Sales and marketing",gender:"female",status:"showroom",location:"T-shirt showroom",color:"#b47467",tint:"#f4e5e0",skin:"#deb28c",hair:"#40332f",position:[3.75,-3.1],rotation:Math.PI/2,seated:!1},{id:5,name:"Athira",department:"sales",role:"Sales and marketing",gender:"female",status:"showroom",location:"T-shirt showroom",color:"#c19957",tint:"#f6ecd8",skin:"#deb38d",hair:"#493a35",position:[2.25,-1.15],rotation:0,seated:!1},{id:6,name:"Mirul",department:"sales",role:"Sales and marketing",gender:"male",status:"walking",location:"Workspace & showroom",color:"#647395",tint:"#e6eaf3",skin:"#b8825b",hair:"#343536",position:[-3.05,-7],rotation:0,seated:!1},{id:7,name:"Lisa",department:"admin",role:"Admin",gender:"female",status:"desk",location:"Open workspace",color:"#918661",tint:"#eeeadd",skin:"#edc5a5",hair:"#5d4435",position:[3.1,-14.85],rotation:Math.PI,seated:!0}],Hh=[{id:"workspace",name:"Open workspace",x:.8,z:-7,y:.35,focus:[.7,-11.3]},{id:"showroom",name:"T-shirt showroom",x:1,z:-.75,y:1.25,focus:[1,-2.25]},{id:"office",name:"Boss office",x:2.95,z:5,y:1,focus:[3,3.2]},{id:"pantry",name:"Pantry",x:-3.5,z:7,y:1.15,focus:[-3,4.8]},{id:"store",name:"Store",x:2.7,z:9.7,y:1,focus:[3,8]},{id:"surau",name:"Surau",x:2.3,z:16.7,y:.6,focus:[2.2,14.5]},{id:"toilets",name:"Toilets",x:-3.8,z:12.8,y:1.1,focus:[-3.8,12.5]}],Vh=[[-3.05,-7],[-3.05,-5.25],[-1.7,-5.25],[-1.7,-2.05],[-.85,-1.15],[-.85,6.6],[-2.55,7.7],[-.85,7.7],[-.85,-1.15],[-1.7,-2.05],[-1.7,-5.25],[-3.05,-5.25]];
/* Office Plus V86.6: revised user-supplied hijabi geometry and existing animation adapter (offline compiled asset). */
const __KS3D={Group:Le,MeshStandardMaterial:bi,DoubleSide:2,SphereGeometry:En,RoundedBoxGeometry:Li,
 TubeGeometry:tr,CatmullRomCurve3:yi,Vector3:D,Mesh:be,BufferGeometry:Ee,Float32BufferAttribute:jt,Color:new bi({color:"#ffffff"}).color.constructor};
function createHijabiCharacter(T, color = '#d9796d') {
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
  const api={root,body,head,chest,arms,legs,materials,setScarfColor(hex){fabric.color.set(hex);fold.color.set(hex).multiplyScalar(.82);}};
  return api;
}
function createHijabiCasualCharacter(T, color = '#d9796d') {
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
function attachClassicGlasses(model,enabled){
  const THREE=__KS3D;
  const parent=model.head.children.find(child=>child.name==='Head')||model.head;
  const frames=new THREE.Group();frames.name='Optional classic glasses';frames.visible=Boolean(enabled);parent.add(frames);
  const mat=new THREE.MeshStandardMaterial({color:'#344149',roughness:.5,metalness:0});
  const lens=new THREE.MeshStandardMaterial({color:'#c5e0e4',transparent:true,opacity:.075,depthWrite:false,roughness:.15,side:THREE.DoubleSide});
  for(const side of [-1,1]){
    const points=Array.from({length:33},(_,i)=>{const angle=i*Math.PI*2/32;return new THREE.Vector3(side*.248+Math.cos(angle)*.176,5.38+Math.sin(angle)*.126,.693)});
    const rim=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),48,.015,6,true),mat);frames.add(rim);
    const pane=new THREE.Mesh(new THREE.SphereGeometry(1,24,12),lens);pane.position.set(side*.248,5.38,.690);pane.scale.set(.169,.122,.008);frames.add(pane);
  }
  const bridge=new THREE.Mesh(new THREE.RoundedBoxGeometry(.154,.022,.025,2,.01),mat);bridge.position.set(0,5.394,.698);frames.add(bridge);
  frames.traverse(mesh=>{if(mesh.isMesh){mesh.castShadow=false;mesh.receiveShadow=false}});
  model.glasses=frames;
}


function createOfficeHijabiRig(person) {
  const appearance=person.appearance||{};
  const model=appearance.model==='semi-casual'
    ?createHijabiCasualCharacter(__KS3D)
    :createHijabiCharacter(__KS3D);
  // Apply only allow-listed colours; never use style data as code or resource URLs.
  const safeHex=value=>typeof value==='string'&&/^#[0-9a-fA-F]{6}$/.test(value)?value:null;
  const scarf=safeHex(appearance.scarfColor),shirt=safeHex(appearance.shirtColor),pants=safeHex(appearance.pantsColor);
  if(scarf)model.setScarfColor?.(scarf);
  if(shirt){
    if(model.setShirtColor)model.setShirtColor(shirt);
    else model.materials['Plain ivory long shirt']?.color.set(shirt);
  }
  if(pants){
    if(model.setPantsColor)model.setPantsColor(pants);
    else {model.materials['Charcoal twill']?.color.set(pants);model.materials['Knees']?.color.set(pants).multiplyScalar(1.08)}
  }
  if(model.setGlasses)model.setGlasses(appearance.glasses===true);
  else attachClassicGlasses(model,appearance.glasses===true);
  const root=model.root;
  root.name=`character:${person.name}`;
  root.userData.officeHijabi=true;
  root.userData.characterVersion=12;
  root.userData.characterModel=appearance.model==='semi-casual'?'semi-casual':'classic';
  root.userData.glasses=appearance.glasses===true;
  root.userData.gender='female';
  root.scale.setScalar(.42);
  const eyes=[];
  model.head.traverse(obj=>{if(obj.name==='Glossy oval eye')eyes.push(obj)});
  const limb=joint=>({joint,lower:new __KS3D.Group(),end:new __KS3D.Group()});
  const cup=new __KS3D.Group();cup.visible=false;
  return {emote:'',emoteStart:-100,root,body:model.body,chest:model.chest,head:model.head,eyes,
    left:limb(model.arms[0]),right:limb(model.arms[1]),leftLeg:limb(model.legs[0]),rightLeg:limb(model.legs[1]),
    cup,phase:person.id*.83,gait:person.id*.81,waveStart:-100,walk:0,sit:person.seated?1:0,
    initialized:false,lastPosition:new __KS3D.Vector3()};
}

const interp=(a,b,t)=>a+(b-a)*t;
const smoothstep=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u)};
function animateOfficeHijabi(r,p,time,dt,distance){
  const t=time+r.phase,walkTo=p.status==='walking'?1:0;
  const emoteActive=r.emote!==''&&time-r.emoteStart>=0&&time-r.emoteStart<3.6;
  const sitTo=p.seated&&p.status!=='walking'&&!emoteActive?1:0;
  if(!r.initialized){r.walk=walkTo;r.sit=sitTo;r.initialized=true}
  const k=1-Math.exp(-Math.min(.05,Math.max(0,dt))*9);
  r.walk=interp(r.walk,walkTo,k);r.sit=interp(r.sit,sitTo,k);
  r.gait+=Math.min(Math.max(distance,0),.3)*4.3;
  const stride=Math.sin(r.gait),opposite=Math.sin(r.gait+Math.PI),walk=r.walk,sit=r.sit;
  r.body.position.y=-.90*sit+Math.abs(stride)*.045*walk;
  r.body.rotation.y=0;
  r.body.rotation.z=Math.sin(t*.6)*.008*(1-walk)+stride*.022*walk;
  r.chest.rotation.z=Math.sin(r.gait+Math.PI)*.014*walk;
  r.chest.rotation.y=Math.sin(t*.4)*.006*(1-walk);
  r.head.rotation.x=Math.sin(t*.9)*.018-.02*sit;
  r.head.rotation.y=Math.sin(t*.55)*.10*(1-walk*.65);
  r.head.rotation.z=Math.sin(t*.4)*.018*(1-walk);
  r.eyes.forEach(eye=>{const bl=t%(3.45+(r.phase%2)*.3);eye.scale.y=1-.90*Math.max(0,1-Math.abs(bl-.15)/.10)});
  // The supplied whole-leg meshes now pivot at the hips, allowing chair sitting and walking.
  r.leftLeg.joint.rotation.x=interp(stride*.35*walk,-1.15,sit);
  r.rightLeg.joint.rotation.x=interp(opposite*.35*walk,-1.15,sit);
  const working=['typing','designing','admin','production'].includes(p.action||'');
  const typing=sit*(working?1:.20);
  for(const [arm,sign] of [[r.left,-1],[r.right,1]]){
    arm.joint.rotation.x=interp(-sign*stride*.32*walk, -.73+Math.sin(t*6+sign)*.025, typing);
    arm.joint.rotation.z=sign*.17;
  }
  if(p.action==='meeting'&&!walk){r.right.joint.rotation.x-=.22;r.head.rotation.y+=Math.sin(t*.8)*.065}
  if(p.action==='reading'&&!walk){r.head.rotation.x+=.07;r.left.joint.rotation.x-=.22}
  if(p.action==='production'&&!walk){r.right.joint.rotation.x-=.20}
  if(p.action==='chat'&&!walk){r.right.joint.rotation.x-=.25;r.head.rotation.y+=Math.sin(t*.7)*.07}
  // All workplace breaks remain cup-free; only the old male model has the coffee prop.
  r.cup.visible=false;
  const age=time-r.waveStart;
  const wave=age>=0&&age<1.7?smoothstep(0,.25,age)*(1-smoothstep(1.25,1.7,age))*(1-walk):0;
  if(wave){r.right.joint.rotation.z+=1.52*wave;r.right.joint.rotation.x-=.22*wave}
  const actionAge=time-r.emoteStart;
  const power=actionAge>=0&&actionAge<3.6?smoothstep(0,.35,actionAge)*(1-smoothstep(2.9,3.6,actionAge))*(1-walk):0;
  if(power){
    if(r.emote==='dance'){r.body.position.y+=Math.abs(Math.sin(actionAge*8))*.17*power;r.left.joint.rotation.z-=.9*power;r.right.joint.rotation.z+=.9*power}
    else if(r.emote==='celebrate'||r.emote==='stretch'){r.left.joint.rotation.z-=1.25*power;r.right.joint.rotation.z+=1.25*power}
    else if(r.emote==='wave')r.right.joint.rotation.z+=1.3*power;
  }
}

var y0={boss:{hair:"sweep",outfit:"blazer",glasses:!0,watch:!0},cikda:{hair:"tied",outfit:"cardigan",lanyard:!0,watch:!0},minn:{hair:"bob",outfit:"tee",headphones:!0},afiq:{hair:"sweep",outfit:"tee",glasses:!0,watch:!0},nisa:{hair:"tied",outfit:"polo",lanyard:!0},athira:{hair:"bob",outfit:"cardigan",watch:!0},mirul:{hair:"crop",outfit:"polo",watch:!0},amirul:{hair:"crop",outfit:"polo",watch:!0},lisa:{hair:"bob",outfit:"cardigan",glasses:!0,lanyard:!0}},Xe=(i,t)=>new Qt(i).multiplyScalar(t).getStyle(),He=Hn.lerp,xs=(i,t,e)=>Hn.smoothstep(e,i,t);function Gh(){let i=new Map,t=new Map,e=(_,y)=>(i.has(_)||i.set(_,y()),i.get(_)),n=(_,y=.72,w=0)=>{let T=`${_}/${y}/${w}`;return t.has(T)||t.set(T,new bi({color:_,roughness:y,metalness:w})),t.get(T)},s=e("uvball",()=>new En(1,24,18)),r=e("v57-body-ball",()=>new En(1,32,24)),o=e("softcube",()=>new Li(1,1,1,3,.22)),a=e("slab",()=>new Li(1,1,1,3,.12)),c=e("capsule",()=>new Hs(1,1,8,20));function l(_,y,w,T,C,R,M=1,b=1,I=1,O=.72,G=0){let V=new be(y,n(w,O,G));return V.position.set(T,C,R),V.scale.set(M,b,I),V.castShadow=!0,V.receiveShadow=!0,_.add(V),V}let h=(_,y,w,T,C,R,M,b)=>l(_,s,y,w,T,C,R,M,b),d=(_,y,w,T,C,R,M,b)=>l(_,r,y,w,T,C,R,M,b),u=(_,y,w,T,C,R,M,b)=>l(_,o,y,w,T,C,R,M,b),f=(_,y,w,T,C,R,M,b)=>l(_,a,y,w,T,C,R,M,b),g=(_,y,w,T,C,R,M,b=R)=>l(_,c,y,w,T,C,R,M/3,b);function x(_,y,w=0,T=0,C=0){let R=new Le;return R.name=y,R.position.set(w,T,C),_.add(R),R}function m(_,y,w,T,C,R,M,b=Math.PI*2){return l(_,e(`ring:${R}:${M}:${b}`,()=>new Tn(R,M,7,24,b)),y,w,T,C)}function p(_,y,w,T=.008){let C=new yi(w.map(R=>new D(...R)));return l(_,new tr(C,12,T,5,!1),y,0,0,0)}function E(_){for(let w of[..._.children])w instanceof Le&&E(w);let y=new Map;for(let w of _.children)if(w instanceof be){let T=w.material;y.has(T)||y.set(T,[]),y.get(T).push(w)}for(let[w,T]of y){if(T.length<2)continue;let C=T.map(b=>{b.updateMatrix();let I=b.geometry.clone();if(I.index){let O=I.toNonIndexed();I.dispose(),I=O}return I.applyMatrix4(b.matrix)}),R=da(C);if(C.forEach(b=>b.dispose()),!R)continue;T.forEach(b=>_.remove(b));let M=new be(R,w);M.castShadow=!0,M.receiveShadow=!0,_.add(M)}}return _=>{if(_.gender==="female")return createOfficeHijabiRig(_);let y=_.gender==="female",w=y0[_.name.trim().toLowerCase()]??{hair:y?"bob":"crop",outfit:/boss|manager/i.test(_.role)?"blazer":/designer/i.test(_.role)?"tee":"polo",watch:!0},T=_.appearance?.shirtColor||_.color,C=_.skin,R=_.hair,M="#faf6eb",b="#374448",I=_.appearance?.pantsColor||(w.outfit==="tee"?"#56666e":"#515a60"),O=new Le;O.name=`character:${_.name}`,O.userData.characterVersion=9,O.userData.gender=y?"female":"male",O.scale.setScalar(1.2);let G=x(O,"body"),V=x(G,"chest",0,1.12,0),$=e("v57-soft-torso",()=>{let H=[[0,-.28],[.13,-.28],[.193,-.264],[.235,-.213],[.261,-.09],[.265,.063],[.249,.2],[.218,.29],[.157,.347],[.095,.362],[0,.362]],_t=new yi(H.map(([ut,kt])=>new D(ut,kt,0))).getPoints(52).map(ut=>new rt(Math.max(0,ut.x),ut.y));return new Ks(_t,36)});if(l(V,$,T,0,0,0,1,1,.76),d(G,I,0,.854,0,.217,.132,.164),f(G,Xe(I,.8),0,.932,.018,.337,.023,.284),f(G,"#c6ac85",0,.941,.167,.046,.029,.014),g(V,y?"#c67b70":C,0,.41,0,.071,.181,.071),w.outfit==="blazer"||w.outfit==="cardigan"){f(V,M,0,.045,.186,.193,.43,.045);for(let H of[-1,1]){let st=f(V,Xe(T,.87),H*.115,.185,.205,.11,.264,.035);st.rotation.z=-H*.21}f(V,M,-.07,.1,.217,.046,.02,.01),h(V,"#e9cfad",.103,-.052,.224,.013,.013,.008)}else if(w.outfit==="polo"){for(let H of[-1,1]){let st=f(V,Xe(T,1.18),H*.066,.296,.105,.106,.115,.075);st.rotation.z=H*.29}f(V,Xe(T,.68),0,.23,.19,.026,.14,.012),h(V,M,0,.231,.204,.013,.014,.011)}else{let H=m(V,Xe(T,.75),0,.325,.015,.104,.017);H.rotation.x=Math.PI/2,f(V,M,-.113,.122,.204,.075,.048,.014),f(V,"#e8b984",-.118,.123,.214,.027,.026,.004)}if((w.outfit==="polo"||w.outfit==="cardigan")&&f(V,Xe(T,1.22),.145,-.177,.192,.046,.025,.018),w.lanyard){for(let H of[-1,1]){let st=f(V,"#d7baa1",H*.053,.127,.207,.015,.37,.012);st.rotation.z=-H*.18}f(V,M,0,-.115,.228,.12,.155,.017),f(V,"#afc2bc",0,-.068,.241,.084,.027,.008),f(V,"#d5d8ce",0,-.148,.241,.072,.015,.005)}let N=x(V,"head",0,.688,0),ot=e("v53-soft-oval",()=>{let H=new En(1,40,30),st=H.attributes.position;for(let _t=0;_t<st.count;_t++){let ut=st.getX(_t),kt=st.getY(_t),Jt=st.getZ(_t),P=Math.max(0,-kt);st.setXYZ(_t,ut*(1-.105*P*P),kt-.009*P,Jt*(1-.017*Math.max(0,kt)))}return H.computeVertexNormals(),H});l(N,ot,C,0,-.024,0,.291,.319,.257);if(!y)for(let H of[-1,1])h(N,C,H*.276,-.056,-.011,.061,.076,.051),h(N,Xe(C,.96),H*.324,-.057,.023,.013,.031,.021);let W=[];for(let H of[-1,1]){let st=x(N,H<0?"eye-left":"eye-right",H*.094,.007,.244);W.push(st),h(st,"#283338",0,0,.011,.02,.026,.013),h(st,"#fff9ef",-.005,.009,.023,.006,.007,.004);let _t=h(N,Xe(R,.98),H*.094,.097,.242,.053,.01,.01);_t.rotation.z=-H*.07,h(N,Xe(C,1.045),H*.174,-.081,.202,.043,.018,.009)}h(N,Xe(C,1.052),0,-.057,.252,.022,.026,.016),p(N,"#94665c",[[-.038,-.153,.243],[0,-.16,.248],[.038,-.153,.243]],.0052);if(y){
 const cloth="#c67b70",highlight=Xe(cloth,1.055),fold=Xe(cloth,.91);
 const scarfHead=x(N,"hijab-head");
 l(scarfHead,e("hijab-hood-v1",()=>new En(1,48,30,Math.PI/2+.78,Math.PI*2-1.56,0,Math.PI*.91)),cloth,0,-.016,-.034,.326,.355,.307,.91);
 d(scarfHead,cloth,0,-.208,-.204,.280,.179,.150);
 p(scarfHead,highlight,[[-.218,.180,.155],[-.16,.251,.178],[0,.307,.153],[.16,.251,.178],[.218,.180,.155]],.018);
 for(const side of [-1,1]){
  p(scarfHead,highlight,[[side*.218,.18,.155],[side*.242,.075,.157],[side*.253,-.048,.140],[side*.213,-.176,.149],[side*.135,-.260,.162],[side*.025,-.284,.163]],.023);
 }
 l(scarfHead,e("hijab-throat-v1",()=>new Ks([new rt(.148,-.268),new rt(.209,-.293),new rt(.251,-.340),new rt(.273,-.398),new rt(.269,-.452),new rt(.253,-.482)],48)),cloth,0,0,-.035,1,1,.80,.91);
 p(scarfHead,fold,[[-.205,-.306,.102],[-.120,-.350,.161],[0,-.375,.180],[.120,-.350,.161],[.205,-.306,.102]],.011);
 const scarfDrape=x(V,"hijab-drape");
 l(scarfDrape,e("hijab-shoulders-v1",()=>new Ks([new rt(.145,.427),new rt(.198,.392),new rt(.257,.327),new rt(.316,.246),new rt(.325,.174),new rt(.309,.118),new rt(.266,.103)],48)),cloth,0,0,-.057,1,1,.81,.91);
 l(scarfDrape,e("hijab-front-tail-v1",()=>new Ks([new rt(.030,.348),new rt(.086,.303),new rt(.114,.189),new rt(.116,.050),new rt(.080,-.057),new rt(.006,-.096)],40)),highlight,-.111,0,.230,1,1,.24,.92);
 p(scarfDrape,fold,[[-.225,.314,.239],[-.222,.234,.245],[-.214,.126,.252],[-.191,-.004,.242]],.009);
 p(scarfDrape,highlight,[[.004,.312,.239],[-.001,.213,.244],[.018,.101,.251],[.007,-.061,.243]],.006);
}else{let pt=e(`v53-hair-shell-${w.hair}`,()=>{let H=new En(1,40,18,0,Math.PI*2,0,Math.PI/2),st=H.attributes.position;for(let _t=0;_t<st.count;_t++){let ut=st.getX(_t),kt=st.getY(_t),Jt=st.getZ(_t),P=Math.atan2(Jt,ut),nt=Math.max(0,Math.sin(P)),et=w.hair==="sweep"?-.075*Math.max(0,ut)*nt:w.hair==="bob"?-.045*nt:0,Q=1.79-.7*Math.pow(nt,1.7)+et,tt=Math.acos(Hn.clamp(kt,0,1))*Q/(Math.PI/2);st.setXYZ(_t,.3*Math.sin(tt)*Math.cos(P),-.022+.333*Math.cos(tt),.267*Math.sin(tt)*Math.sin(P))}return H.computeVertexNormals(),H});if(l(N,pt,R,0,0,0),w.hair==="crop")h(N,R,-.133,.177,.164,.119,.065,.1),h(N,R,.067,.186,.178,.137,.064,.095),h(N,Xe(R,1.035),-.022,.214,.172,.093,.042,.069);else if(w.hair==="sweep"){let H=h(N,R,-.09,.205,.153,.189,.086,.127);H.rotation.z=-.19;let st=h(N,R,.104,.168,.184,.142,.064,.082);st.rotation.z=.25,h(N,Xe(R,1.055),-.15,.231,.125,.083,.039,.084)}else if(w.hair==="bob"){h(N,R,0,-.096,-.185,.273,.226,.117);for(let H of[-1,1]){let st=h(N,R,H*.254,-.099,-.014,.074,.182,.168);st.rotation.z=-H*.07}h(N,R,-.11,.174,.161,.132,.061,.09),h(N,R,.075,.178,.166,.131,.055,.083)}else{for(let H of[-1,1])h(N,R,H*.246,-.059,-.051,.064,.146,.116);h(N,R,.044,-.048,-.303,.134,.143,.105),h(N,Xe(R,1.05),.042,-.113,-.34,.077,.1,.066),h(N,R,-.107,.177,.158,.118,.056,.084),h(N,R,.074,.171,.172,.113,.053,.081),f(N,"#c8a981",.043,-.08,-.402,.106,.022,.015)}}if(_.appearance?.glasses??w.glasses){for(let H of[-1,1]){let st=m(N,"#46535a",H*.095,.011,.265,.064,.008);st.scale.y=.84,p(N,"#46535a",[[H*.156,.018,.26],[H*.241,.015,.164],[H*.289,-.022,.023]],.0065)}f(N,"#46535a",0,.013,.27,.042,.01,.01)}if(w.headphones){m(N,"#4b5d64",0,-.027,-.019,.35,.018,Math.PI);for(let H of[-1,1])h(N,"#53666e",H*.303,-.03,-.013,.053,.105,.087),h(N,"#d7c4a9",H*.344,-.031,.008,.012,.065,.052)}function vt(H){let st=x(V,H<0?"shoulder-left":"shoulder-right",H*.266,.218,0),_t=w.outfit==="blazer"||w.outfit==="cardigan";d(st,T,0,-.024,0,.112,.113,.108),g(st,T,0,-.14,0,.088,.282,.083),d(st,T,0,-.257,0,.079,.075,.079);let ut=x(st,"elbow",0,-.263,0),kt=_t?T:C;g(ut,kt,0,-.12,0,.073,.27,.067),d(ut,kt,0,-.215,0,.067,.065,.062),_t&&d(ut,Xe(T,.89),0,-.241,0,.073,.038,.07);let Jt=x(ut,"wrist",0,-.252,.006);return d(Jt,C,0,-.05,.012,.069,.082,.057),d(Jt,C,-H*.048,-.026,.029,.029,.043,.034),H===-1&&w.watch&&(d(ut,"#394c4c",0,-.22,.002,.076,.026,.072),f(ut,"#e7d6b7",0,-.216,.076,.05,.035,.012)),{joint:st,lower:ut,end:Jt}}let wt=vt(-1),Xt=vt(1);function $t(H){let st=x(G,H<0?"hip-left":"hip-right",H*.115,.814,0);d(st,I,0,-.045,0,.113,.111,.105),g(st,I,0,-.175,0,.107,.368,.1);let _t=x(st,"knee",0,-.362,0);d(_t,I,0,-.026,0,.099,.074,.093),g(_t,I,0,-.17,0,.092,.358,.087);let ut=x(_t,"ankle",0,-.378,.019),kt=w.outfit==="blazer"?"#465157":"#e9e9e0";if(u(ut,kt,0,-.019,.083,.195,.128,.324),d(ut,kt,0,-.024,.204,.097,.062,.091),f(ut,w.outfit==="blazer"?"#d4cbb9":"#b7c1bc",0,-.086,.087,.204,.025,.338),w.outfit!=="blazer")for(let Jt=0;Jt<2;Jt++)f(ut,"#bec8c6",0,.035,.092+Jt*.04,.088,.01,.014);return{joint:st,lower:_t,end:ut}}let ie=$t(-1),ee=$t(1),K=x(Xt.end,"coffee-cup",0,-.082,.072);return l(K,e("mini-mug",()=>new ei(.074,.061,.142,16)),M,0,0,0),l(K,e("mini-coffee",()=>new ti(.061,16)),"#795944",0,.073,0).rotation.x=-Math.PI/2,m(K,M,.074,.01,0,.038,.014),K.visible=!1,E(O),{emote:"",emoteStart:-100,root:O,body:G,chest:V,head:N,eyes:W,left:wt,right:Xt,leftLeg:ie,rightLeg:ee,cup:K,phase:_.id*.83,gait:_.id*.81,waveStart:-100,walk:0,sit:_.seated?1:0,initialized:!1,lastPosition:new D}}}function Wh(i,t,e,n,s){if(i.root.userData.officeHijabi)return animateOfficeHijabi(i,t,e,n,s);let r=e+i.phase,o=t.status==="walking"?1:0,a=i.emote!==""&&i.emote!=="wave"&&e-i.emoteStart>=0&&e-i.emoteStart<3.6,c=t.seated&&t.status!=="walking"&&!a?1:0;i.initialized||(i.walk=o,i.sit=c,i.initialized=!0);let l=1-Math.exp(-n*9);i.walk=He(i.walk,o,l),i.sit=He(i.sit,c,l),i.gait+=Math.min(s,.3)*4.3;let h=Math.sin(i.gait),d=Math.sin(i.gait+Math.PI),u=i.walk,f=i.sit;i.body.position.y=-.28*f+Math.abs(h)*.026*u,i.body.rotation.y=0,i.body.rotation.z=h*.019*u+Math.sin(r*.66)*.008*(1-u)*(1-f),i.chest.scale.y=1+Math.sin(r*1.9)*.009*(1-u),i.chest.rotation.x=.042*f+.03*u,i.chest.rotation.y=h*.028*u;let g=r%(3.45+i.phase%2*.3),x=1-.94*Math.max(0,1-Math.abs(g-.15)/.11);i.eyes.forEach(R=>R.scale.y=x),i.head.rotation.y=Math.sin(r*.59)*.11*(1-u*.7)+((t.action==="meeting"||t.action==="chat")?Math.sin(r*.7)*.075:0),i.head.rotation.x=-.04*f+Math.sin(r*.93)*.019,i.head.rotation.z=Math.sin(r*.4)*.02*(1-u);for(let[R,M]of[[i.leftLeg,h],[i.rightLeg,d]])R.joint.rotation.x=He(M*.47*u,-Math.PI/2,f),R.lower.rotation.x=He(Math.max(0,-M)*.74*u,Math.PI/2,f),R.end.rotation.x=He(-M*.1*u,0,f),R.lower.scale.y=1+.2*f,R.end.scale.y=1/(1+.2*f);let m=.8+.2*Math.sin(r*.43+Math.sin(r*.16))**2,p=f*(1-u)*m*(["typing","designing","admin","production"].includes(t.action||"typing")?1:.18);for(let[R,M]of[[i.left,-1],[i.right,1]])R.joint.rotation.x=He(-.08+M*h*.35*u,-.91+Math.sin(r*7.3+M)*.032,p),R.joint.rotation.z=M*.064,R.lower.rotation.x=He(-.16-Math.max(0,M*h)*.14*u,-.72+Math.sin(r*8.8+M*2)*.05,p),R.end.rotation.x=Math.sin(r*11+M)*.095*p,R.end.rotation.z=0;if(t.status==="showroom"&&!u&&!f){let R=.5+.5*Math.sin(r*.82);i.right.joint.rotation.x=He(i.right.joint.rotation.x,-.6,R),i.right.joint.rotation.z=He(i.right.joint.rotation.z,-.43,R),i.right.lower.rotation.x=He(i.right.lower.rotation.x,-.76,R)}let E=t.status==="break"&&t.action==="coffee"?1-u:0,_=E*xs(2.8,3.5,r%12)*(1-xs(5.2,6,r%12));i.cup.visible=E>.2,E&&(i.right.joint.rotation.x=He(i.right.joint.rotation.x,-.43-.4*_,E),i.right.lower.rotation.x=He(i.right.lower.rotation.x,-1.08-.83*_,E),i.head.rotation.x-=.065*_);if(t.action==="chat"&&!u){let v=(1-f)*(.35+.18*Math.sin(r*.9));i.right.joint.rotation.x=He(i.right.joint.rotation.x,-.55,v);i.right.joint.rotation.z=He(i.right.joint.rotation.z,.52,v);i.head.rotation.y+=Math.sin(r*.85)*.08}if(t.action==="calling"&&!u){let v=1-f*.2;i.right.joint.rotation.x=He(i.right.joint.rotation.x,-1.3,v);i.right.joint.rotation.z=He(i.right.joint.rotation.z,.68,v);i.right.lower.rotation.x=He(i.right.lower.rotation.x,-1.24,v);i.head.rotation.z-=.045*v}if(t.action==="reviewing"&&!u){i.head.rotation.x-=.07;i.left.joint.rotation.x=He(i.left.joint.rotation.x,-.52,.6)}if(t.action==="reading"&&!u){i.head.rotation.x+=.06;i.left.joint.rotation.x=He(i.left.joint.rotation.x,-.78,.45)}if(t.action==="stretching"&&!u){let v=.45+.45*Math.sin(r*.5);i.left.joint.rotation.z-=1.65*v;i.right.joint.rotation.z+=1.65*v;i.head.rotation.x-=.035*v}if(t.action==="designing"&&!u){i.head.rotation.z+=Math.sin(r*.38)*.027;i.left.end.rotation.x+=Math.sin(r*5.9)*.05*f}if(t.action==="admin"&&!u){i.head.rotation.x+=Math.sin(r*.33)*.022;i.right.end.rotation.x+=Math.cos(r*6)*.025*f}if(t.action==="production"&&!u){i.head.rotation.x+=.032;i.right.joint.rotation.x=He(i.right.joint.rotation.x,-.62,.32*(1-u));i.right.end.rotation.x+=Math.sin(r*1.1)*.12*(1-u)}if(t.action==="planning"&&!u){i.left.joint.rotation.x=He(i.left.joint.rotation.x,-.60,.5);i.left.lower.rotation.x=He(i.left.lower.rotation.x,-.82,.5);i.head.rotation.z+=Math.sin(r*.45)*.028}if(t.action==="meeting"&&!u){i.head.rotation.y+=Math.sin(r*.68)*.065;i.right.joint.rotation.z+=.16+.10*Math.sin(r*1.2);i.left.joint.rotation.x-=.18}if(t.action==="chat"&&!u){i.left.joint.rotation.z-=.12+.10*Math.sin(r*.68)}if(u>.05){i.body.rotation.z+=Math.sin(i.gait)*.017*u;i.chest.rotation.z=Math.sin(i.gait+Math.PI)*.024*u;i.head.rotation.z-=Math.sin(i.gait)*.014*u}let y=e-i.waveStart,w=y>=0&&y<1.7?xs(0,.25,y)*(1-xs(1.25,1.7,y))*(1-u)*(1-E):0;w&&(i.right.joint.rotation.x=He(i.right.joint.rotation.x,-.1,w),i.right.joint.rotation.z=He(i.right.joint.rotation.z,2.05,w),i.right.lower.rotation.x=He(i.right.lower.rotation.x,-.8,w),i.right.end.rotation.z=Math.sin(y*15)*.27*w,i.head.rotation.z-=.05*w);let T=e-i.emoteStart,C=T>=0&&T<3.6?xs(0,.35,T)*(1-xs(2.9,3.6,T))*(1-u):0;if(C)if(i.emote==="dance"){let R=T*8.4;i.body.position.y+=Math.abs(Math.sin(R))*.105*C,i.body.rotation.y=Math.sin(R*.52)*.23*C,i.body.rotation.z+=Math.sin(R)*.12*C,i.left.joint.rotation.z-=1.3*C,i.right.joint.rotation.z+=1.3*C,i.left.joint.rotation.x+=Math.sin(R)*.65*C,i.right.joint.rotation.x-=Math.sin(R)*.65*C,i.head.rotation.z+=Math.sin(R*.5)*.09*C}else i.emote==="celebrate"?(i.left.joint.rotation.z-=2.18*C,i.right.joint.rotation.z+=2.18*C,i.left.lower.rotation.x-=.45*C,i.right.lower.rotation.x-=.45*C,i.body.position.y+=Math.abs(Math.sin(T*8))*.07*C):i.emote==="stretch"?(i.left.joint.rotation.z-=2.21*C,i.right.joint.rotation.z+=2.21*C,i.head.rotation.x-=.08*C):i.emote==="wave"&&(i.right.joint.rotation.z+=1.95*C,i.right.end.rotation.z+=Math.sin(T*15)*.3*C);i.cup.rotation.x=-i.right.joint.rotation.x-i.right.lower.rotation.x-i.right.end.rotation.x-i.chest.rotation.x+.15*_,i.cup.rotation.z=-i.right.joint.rotation.z-i.right.end.rotation.z}function Xh(i,t,e={}){let n=e.roster??_s,s=new Bs;s.background=new Qt("#fafaf9");let r=new la({antialias:!0,alpha:!1,powerPreference:"high-performance"});r.setPixelRatio(Math.min(window.devicePixelRatio,1.75)),r.shadowMap.enabled=!0,r.shadowMap.type=uo,r.toneMapping=vo,r.toneMappingExposure=1.2,r.outputColorSpace=Be,i.appendChild(r.domElement),r.domElement.setAttribute("aria-hidden","true");let o=new Ei(-25,25,14,-14,.1,200);o.position.set(38,34,25),o.lookAt(0,0,0),o.zoom=1.14,o.updateProjectionMatrix();let a=new ua(o,r.domElement);a.target.set(0,0,0),a.enableDamping=!0,a.dampingFactor=.065,a.minPolarAngle=.008,a.maxPolarAngle=Math.PI*.45,a.minZoom=.65,a.maxZoom=5,a.enablePan=!0,a.screenSpacePanning=!0,a.rotateSpeed=.5,a.zoomSpeed=.7,a.autoRotateSpeed=.24;let c=matchMedia("(prefers-reduced-motion: reduce)"),l=new sr("#fffef8","#dedbd3",2.4);s.add(l);let h=new as("#fff7e9",3.1);h.position.set(-12,26,13),h.castShadow=!0,h.shadow.mapSize.set(2048,2048),h.shadow.camera.left=-28,h.shadow.camera.right=28,h.shadow.camera.top=28,h.shadow.camera.bottom=-28,h.shadow.camera.near=.1,h.shadow.camera.far=70,h.shadow.normalBias=.045,h.shadow.bias=-25e-5,h.shadow.radius=4,s.add(h);let d=new as("#edf3ff",1.3);d.position.set(15,12,-12),s.add(d);let u=new Le;s.add(u);const FLOOR_SPACE_SCALE=1.25;let accent=new as("#ffd9c2",.38);accent.position.set(-8,11,17),s.add(accent);let f=new Map,g=new Set,x=L=>(f.has(L)||f.set(L,new bi({color:L,roughness:.78,metalness:0})),f.get(L)),m=L=>(g.add(L),L),p=m(new Sn(1,1,1)),E=(L,B,Z,gt,Mt,Ft)=>{let Pt=new be(L,B);return Pt.position.set(gt,Mt,Ft),Pt.castShadow=!0,Pt.receiveShadow=!0,Z.add(Pt),Pt},_=(L,B,Z,gt,Mt,Ft,Pt,oe,me=!1)=>{let Pe=me?m(new Li(Mt,Ft,Pt,2,Math.min(.065,Mt/4,Ft/4,Pt/4))):p,Ui=E(Pe,x(oe),L,B,Z,gt);return me||Ui.scale.set(Mt,Ft,Pt),Ui},y=(L,B,Z,gt,Mt,Ft,Pt,oe)=>E(m(new ei(oe??Mt,Mt,Ft,20)),x(Pt),L,B,Z,gt),w=m(new En(1,20,14)),T=(L,B,Z,gt,Mt,Ft,Pt,oe)=>{let me=E(w,x(oe),L,B,Z,gt);return me.scale.set(Mt,Ft,Pt),me},C="#f6f5f1",R="#dec5a0",M="#4b5050",b="#afb3ad",I=[[-4,-17.5],[5.75,-17.5],[5.75,17.5],[-5.75,17.5],[-5.75,.3],[-4,.3],[-4,-2.25],[-2.5,-2.25],[-2.5,-4.65],[-4,-4.65]],O=new ni;I.forEach(([L,B],Z)=>Z?O.lineTo(L,-B):O.moveTo(L,-B)),O.closePath();let G=E(m(new os(O,{depth:.34,bevelEnabled:!0,bevelSize:.035,bevelThickness:.025,bevelSegments:2,steps:1})),x("#d7d7ce"),u,0,-.36,0);G.rotation.x=-Math.PI/2;let V=E(m(new Qs(O)),x("#f2f1eb"),u,0,.005,0);V.rotation.x=-Math.PI/2;let $=E(m(new Mi(180,180)),new er({color:"#697363",opacity:.13}),s,0,-.4,0);$.rotation.x=-Math.PI/2,$.castShadow=!1;function N(L,B,Z,gt,Mt=1.25){let Ft=Math.hypot(Z-L,gt-B),Pt=-Math.atan2(gt-B,Z-L),oe=_(u,(L+Z)/2,Mt/2,(B+gt)/2,Ft,Mt,.15,"#e2e3db");oe.rotation.y=Pt;let me=_(u,(L+Z)/2,Mt+.025,(B+gt)/2,Ft+.015,.05,.17,"#858b80");me.rotation.y=Pt;let Pe=_(u,(L+Z)/2,.065,(B+gt)/2,Ft,.13,.18,"#c9cec0");Pe.rotation.y=Pt}N(-4,-17.5,5.75,-17.5,2.65),N(-4,-17.5,-4,-4.65,1.4),N(-4,-4.65,-2.5,-4.65,.75),N(-2.5,-2.25,-4,-2.25,.75),N(-4,-2.25,-4,.3,1.1),N(-4,.3,-5.75,.3,1.1),N(-5.75,.3,-5.75,17.5,1.25),N(-5.75,17.5,5.75,17.5,.4),N(5.75,17.5,5.75,-17.5,.5);for(let L of[-2.55,.65,3.85])_(u,L,1.87,-17.39,2.9,1.23,.035,"#d4e1de"),_(u,L,1.24,-17.29,3,.065,.17,"#f7f7ed"),_(u,L,1.87,-17.34,.045,1.24,.06,"#f8f8f1");_(u,2.92,.023,3.2,5.5,.025,4.82,"#f5f0e4"),_(u,2.92,.023,8.3,5.5,.025,5.1,"#e9ece5"),_(u,-3.82,.023,4.65,3.7,.025,8.55,"#eee9df"),_(u,1.95,.023,14.3,7.4,.025,6.32,"#e6e9dc"),N(.1,.7,5.75,.7,1.1),N(.1,.7,.1,3.85,1.35),N(.1,5.25,.1,5.65,.9),N(.1,5.65,5.75,5.65,1.05),N(.1,5.65,.1,9.45,1.25),N(.1,10.75,.1,10.95,.65),N(-5.75,9,-1.9,9,.75),N(-5.75,.3,-1.9,.3,.9),N(-5.75,10.95,-5.45,10.95,.8),N(-4.2,10.95,-3.6,10.95,.8),N(-2.4,10.95,-1.65,10.95,.8),N(-.35,10.95,5.75,10.95,.6),N(-3.82,10.95,-3.82,14.25,1.3),N(-1.9,10.95,-1.9,14.7,.9),N(-1.9,16,-1.9,17.5,.7),N(-5.75,14.25,-1.9,14.25,1.05);function ot(L,B,Z=1){let gt=new Le;gt.position.set(L,0,B),gt.scale.setScalar(Z),u.add(gt),y(gt,0,.27,0,.26,.5,"#e5e4d9",.32),y(gt,0,.52,0,.26,.022,"#776c52"),y(gt,0,.82,0,.023,.62,"#839371");for(let Mt=0;Mt<9;Mt++){let Ft=Mt*2.4,Pt=T(gt,Math.sin(Ft)*.24,.88+Mt%3*.12,Math.cos(Ft)*.21,.13,.38,.09,["#718f5e","#8da674","#607e52"][Mt%3]);Pt.rotation.z=Math.cos(Ft)*.7,Pt.rotation.x=Math.sin(Ft)*.6}}[[-3.15,-16.4,1.2],[4.9,-6.6,1.05],[4.85,-.95,.8],[-2.5,1.15,.8],[4.95,11.8,.95]].forEach(([L,B,Z])=>ot(L,B,Z));function W(L,B,Z=Math.PI,gt=M){let Mt=new Le;Mt.position.set(L,0,B),Mt.rotation.y=Z,Mt.scale.setScalar(1.2),u.add(Mt),y(Mt,0,.28,0,.045,.5,"#8c948e"),_(Mt,0,.54,0,.6,.13,.56,gt,!0),_(Mt,0,.91,-.25,.58,.62,.1,gt,!0);for(let Ft of[0,Math.PI/2]){let Pt=_(Mt,0,.09,0,.72,.045,.06,"#727b76");Pt.rotation.y=Ft}for(let[Ft,Pt]of[[.3,0],[-.3,0],[0,.3],[0,-.3]])T(Mt,Ft,.07,Pt,.055,.06,.055,"#5b625e");for(let Ft of[-.32,.32])_(Mt,Ft,.66,0,.035,.27,.03,"#89918a"),_(Mt,Ft,.8,.02,.075,.04,.32,gt)}function pt(L,B,Z,gt="#bf9364"){y(u,L,B,Z,.09,.19,gt),y(u,L,B+.1,Z,.071,.008,"#625740");let Mt=E(m(new Tn(.064,.018,6,10)),x(gt),u,L+.095,B,Z);Mt.rotation.x=Math.PI/2}function vt(L,B,Z,gt="#b7cfca"){let Mt=new Le;Mt.position.set(L,1.2,B),Mt.rotation.y=Z,u.add(Mt),_(Mt,0,.03,0,.4,.035,.29,"#697370"),_(Mt,0,.25,-.03,.065,.43,.055,"#8c9790"),_(Mt,0,.57,-.04,.85,.56,.085,"#465451",!0),_(Mt,0,.57,.007,.77,.47,.012,"#e3ede7"),_(Mt,-.16,.59,.017,.34,.28,.01,gt);for(let Ft=0;Ft<3;Ft++)_(Mt,.21,.7-Ft*.12,.017,.24,.025,.01,"#aec2b1");_(Mt,0,.022,.46,.57,.035,.23,"#c9d1c5",!0),_(Mt,.48,.04,.45,.11,.055,.17,"#b7c2b0",!0)}_(u,.85,1.12,-10.7,2.85,.14,7.25,R,!0);for(let L of[-13.65,-10.7,-7.75])_(u,.85,.55,L,2.5,1.06,.12,"#e6e8dd");_(u,.85,1.35,-10.7,.06,.36,7,"#8c968e");for(let L of[-12.45,-10.2,-7.95])vt(.52,L,-Math.PI/2,"#b5c6d0"),vt(1.18,L,Math.PI/2,"#d9c8a4"),W(-1.5,L,Math.PI/2),W(3.2,L,-Math.PI/2);pt(-.15,1.31,-11.1),pt(1.92,1.31,-8.65,"#9dab80"),_(u,1.88,1.215,-10.8,.38,.04,.57,"#ede8d8"),_(u,1.1,1.12,-16.25,8,.14,1.25,R,!0);for(let L of[-2.35,4.55])_(u,L,.55,-16.25,.12,1.1,1.04,"#ddd7c7");vt(-.15,-16.3,0),vt(3.1,-16.3,0,"#dbccaa"),W(-.15,-14.85),W(3.1,-14.85),pt(.85,1.31,-16.15);let wt=new ni;[[-.12,.36],[-.27,.31],[-.49,.12],[-.35,-.035],[-.235,.05],[-.235,-.42],[.235,-.42],[.235,.05],[.35,-.035],[.49,.12],[.27,.31],[.12,.36],[.07,.27],[-.07,.27]].forEach(([L,B],Z)=>Z?wt.lineTo(L,B):wt.moveTo(L,B)),wt.closePath();let Xt=m(new os(wt,{depth:.025,bevelEnabled:!1}));function $t(L,B,Z,gt,Mt=!1){let Ft=E(Xt,x(gt),u,L,B,Z);return Mt&&(Ft.rotation.x=-Math.PI/2),Ft}for(let L of[-5.8,-1.85])y(u,5.02,1.02,L,.028,2.04,"#626e65"),_(u,5.02,.065,L,1.1,.08,.15,"#687468");let ie=y(u,5.02,2.04,-3.825,.032,3.95,"#7e8a80");ie.rotation.x=Math.PI/2;for(let L=0;L<17;L++){let B=-5.65+L*.222;$t(5.01,1.46,B,["#f5f2e8","#3d4544","#a2b2a3","#b98065","#697c88"][Math.floor(L/4)%5]);let Z=E(m(new Tn(.045,.01,4,12,Math.PI*1.5)),x("#b5b6a8"),u,5.01,2.02,B);_(u,5.01,1.87,B,.62,.024,.035,"#bdbaa9")}_(u,1.2,.92,-3.45,2.65,.16,1.7,R,!0);for(let L of[.08,2.32])for(let B of[-4.08,-2.82])_(u,L,.46,B,.065,.87,.065,"#bbbba9");$t(.58,1.015,-3.53,"#fbf7ec",!0),$t(1.75,1.015,-3.53,"#343c3f",!0);for(let L of[.49,1.68]){let B=E(m(new ti(.105,20)),x("#d39470"),u,L,1.048,-3.54);B.rotation.x=-Math.PI/2;let Z=E(m(new ti(.105,20)),x("#9bb0ad"),u,L+.1,1.049,-3.64);Z.rotation.x=-Math.PI/2}for(let L=0;L<4;L++)for(let B=0;B<3;B++)_(u,.35+L*.55,1.035+B*.032,-2.96,.43,.03,.28,["#f5eee0","#76889a","#b4826d","#758b70"][L],!0);_(u,3.27,1.03,.1,3.73,.15,1,R,!0),_(u,3.27,.51,.15,3.53,1.01,.77,"#dfd6bf"),_(u,3.67,1.18,.06,.95,.15,.8,"#4f5b5a",!0),_(u,3.67,1.275,.08,.78,.045,.69,"#f8f2e6");let ee=_(u,3.67,1.67,-.06,.94,.12,.77,"#687779",!0);ee.rotation.x=-.35,_(u,3.67,1.46,-.4,.11,.56,.1,"#485753"),_(u,3.67,1.87,.04,.65,.04,.045,"#374742"),_(u,3.67,1.75,.04,.045,.24,.045,"#374742"),_(u,2.05,1.19,.1,.42,.15,.31,"#5b6963",!0);for(let L=0;L<6;L++)_(u,4.57+L%3*.13,1.14,-.06+Math.floor(L/3)*.16,.105,.012,.13,["#d69c73","#719889","#6c8197","#eee5d6","#6d5b52","#c1bd79"][L]);_(u,2.95,1.12,2.85,3.15,.15,1.25,R,!0),_(u,4.15,1.12,3.55,.75,.15,1.7,R,!0);for(let L of[1.6,4.3])_(u,L,.53,2.85,.11,1.05,1.05,"#d5c6ac");_(u,4.18,.53,4.2,.6,1.05,.12,"#d5c6ac"),vt(3.2,2.82,0),W(3.2,4.05),pt(1.92,1.31,2.94),_(u,5.24,.6,3.2,.63,1.2,3.95,"#dfcbaa",!0);for(let L=0;L<5;L++)_(u,5.23,1.23,2.1+L*.37,.39,.08,.28,["#8f9d7f","#ded8c9","#d4b284"][L%3]);_(u,-5.15,.56,4.65,1.04,1.12,8.3,"#e2dfd1",!0),_(u,-5.15,1.15,4.65,1.15,.1,8.38,R);for(let L of[2.35,3.08]){let B=T(u,-5.15,1.2,L,.36,.075,.27,"#a2aaa2");y(u,-5.35,1.4,L+.15,.022,.44,"#919e95")}_(u,-5.14,1.35,6.9,1.1,2.7,1.25,"#c6ceca",!0),_(u,-4.565,1.49,6.9,.02,2.37,1.08,"#dde2dc"),_(u,-4.54,1.49,6.57,.04,.47,.035,"#9ba99e"),_(u,-4.54,1.91,6.9,.02,.022,1.1,"#adb8ad"),_(u,-5.08,1.5,5.25,.62,.62,.68,"#4c5b50",!0),_(u,-4.74,1.49,5.25,.035,.25,.39,"#adb4a1"),pt(-4.7,1.27,5.26,"#eeeadd"),pt(-5.05,1.3,4.2),_(u,-3.45,1,3.65,1.2,.11,1.65,R,!0);for(let L of[3.02,4.28])_(u,-3.45,.49,L,.85,.94,.06,"#b9bba6");W(-3.45,2.45,0,"#88967c"),W(-3.45,4.85,Math.PI,"#88967c");for(let L of[6.8,8.65,10.1]){for(let B of[4.65,5.42])_(u,B,1.05,L,.045,2.1,.06,"#839086");for(let B of[.2,.85,1.5,2.1])_(u,5.03,B,L,.95,.065,1.32,"#bdc6b6");for(let B=0;B<3;B++)_(u,5,.42+B*.65,L,.73,.36,1.04,["#d2b88e","#e7e2d4","#b7c2b0"][B],!0)}for(let L of[-4.86,-2.9]){_(u,L,.64,13.66,.64,1.25,.31,"#f8f7ee",!0),T(u,L,.48,13.1,.39,.4,.55,"#faf9f1");let B=E(m(new Tn(.29,.055,8,24)),x("#e3e8df"),u,L,.75,13.1);B.rotation.x=-Math.PI/2,B.scale.y=1.3,_(u,L+.58,.81,13.71,.43,.16,.41,"#eef0e6",!0),y(u,L+.58,.94,13.83,.018,.2,"#9caa9f")}_(u,1.9,.045,14.9,6.9,.028,4.2,"#cfd4bc");for(let L of[-.45,1.8,4.05]){_(u,L,.075,14.9,1.67,.02,3.45,"#748368"),_(u,L,.09,14.9,1.52,.015,3.28,"#cfbc89"),_(u,L,.103,14.9,1.4,.012,3.16,"#879172");for(let Z of[-.59,.59])_(u,L+Z,.118,14.95,.032,.008,2.85,"#d4c69c");_(u,L,.118,16.36,1.2,.008,.034,"#d4c69c");let B=E(m(new Tn(.58,.018,4,28,Math.PI)),x("#d5c7a1"),u,L,.12,13.66);B.rotation.x=-Math.PI/2}u.updateMatrixWorld(!0);let K=new Map;u.traverse(L=>{if(L instanceof be){let B=L.material,Z=L.geometry.clone();Z.index&&(Z=Z.toNonIndexed()),Z.applyMatrix4(L.matrixWorld),K.has(B)||K.set(B,[]),K.get(B).push(Z)}}),u.clear();for(let[L,B]of K){let Z=da(B);if(Z){m(Z);let gt=new be(Z,L);gt.castShadow=!L.transparent,gt.receiveShadow=!0,u.add(gt)}B.forEach(gt=>gt.dispose())}u.scale.set(FLOOR_SPACE_SCALE,1,FLOOR_SPACE_SCALE),u.updateMatrixWorld(!0);let H=[],st=[],_t=Gh();for(let L of n){let B=_t(L);B.root.position.set(L.position[0]*FLOOR_SPACE_SCALE,.08,L.position[1]*FLOOR_SPACE_SCALE),B.root.rotation.y=L.rotation,B.lastPosition.copy(B.root.position),s.add(B.root);let Z=E(m(new js(.42,.49,32)),new Qn({color:"#d89551",side:ln,transparent:!0,opacity:.85}),B.root,0,-.01,0);Z.rotation.x=-Math.PI/2,Z.visible=!1,Z.castShadow=!1;let gt=E(m(new ei(.66,.76,3.04,12)),new Qn({visible:!1}),B.root,0,1.33,0);L.gender==="female"&&(Z.scale.setScalar(1.2/B.root.scale.x),gt.scale.setScalar(1.2/B.root.scale.x)),gt.userData.personId=L.id,st.push(gt),H.push({...B,ring:Z,person:L,targetRotation:L.rotation,targetPosition:B.root.position.clone()})}let ut=document.createElement("div");ut.className="scene-label-layer",i.appendChild(ut);let kt=Hh.map(L=>{let B=document.createElement("button");return B.type="button",B.className="room-label",B.textContent=L.name,B.setAttribute("aria-label",`Focus ${L.name}`),B.onclick=()=>{t.onRoom?.(L.id),F=new D(L.focus[0]*FLOOR_SPACE_SCALE,0,L.focus[1]*FLOOR_SPACE_SCALE),Y=1.8,dt=null,nt=!1},ut.appendChild(B),{element:B,position:new D(L.x*FLOOR_SPACE_SCALE,L.y,L.z*FLOOR_SPACE_SCALE)}}),Jt=n.map(L=>{let B=document.createElement("button"),mood=document.createElement("span"),name=document.createElement("span");B.type="button",B.className="person-label",mood.className="ks-mood-mark",mood.setAttribute("aria-hidden","true"),name.className="ks-name-copy",name.textContent=L.name,B.append(mood,name),B.style.setProperty("--person-color",L.color),B.title=`${L.name} · ${L.role}`,B.setAttribute("aria-label",`${L.name}, ${L.role}`),B.onclick=()=>t.onPerson(L.id),ut.appendChild(B);return{element:B,id:L.id,moodElement:mood,nameElement:name,mood:""}}),P=!1,nt=!1,et=!1,Q=0,tt=0,xt=!1,at="all",dt=null,Bt=i.clientWidth,Ot=i.clientHeight,A=1,v="isometric",F=null,Y=1,it=1.14,J=new D,Lt=new D(0,.15,0);function mt(){return i.clientWidth<760?new D(7,52,59):new D(38,34,25)}o.position.copy(mt()),a.target.copy(Lt),o.lookAt(a.target);function It(){o.updateMatrixWorld();let L=0,B=0;for(let Mt of[-6*FLOOR_SPACE_SCALE,6*FLOOR_SPACE_SCALE])for(let Ft of[0,2.9])for(let Pt of[-18*FLOOR_SPACE_SCALE,18*FLOOR_SPACE_SCALE]){let oe=new D(Mt,Ft,Pt).applyMatrix4(o.matrixWorldInverse);L=Math.max(L,Math.abs(oe.x)),B=Math.max(B,Math.abs(oe.y))}let Z=Bt/Ot,gt=Math.max(B*2*1.15,L*2/Z*1.15);o.left=-gt*Z/2,o.right=gt*Z/2,o.top=gt/2,o.bottom=-gt/2,o.updateProjectionMatrix()}function Dt(){Bt=i.clientWidth,Ot=i.clientHeight,!(!Bt||!Ot)&&(r.setSize(Bt,Ot),It())}let ct=new ResizeObserver(Dt);ct.observe(i),Dt();let Et=new rt,Ht=new or,Ut={x:0,y:0},bt=L=>{Ut={x:L.clientX,y:L.clientY},F=null},Yt=L=>{if(Math.hypot(L.clientX-Ut.x,L.clientY-Ut.y)>6)return;let B=r.domElement.getBoundingClientRect();Et.set((L.clientX-B.left)/B.width*2-1,-(L.clientY-B.top)/B.height*2+1),Ht.setFromCamera(Et,o);let Z=Ht.intersectObjects(st,!1)[0];
if(Z){t.onPerson(Z.object.userData.personId);return}
// Accessible click/tap tolerance: choose the nearest rendered character only
// when the pointer is close to the projected body, never across empty floor.
let hitId=null,best=1;
for(let gt of H){let Mt=gt.root.position.clone();Mt.y+=gt.person.seated?1.55:1.78;Mt.project(o);
  if(Mt.z<-1||Mt.z>1)continue;
  const Pt=(Mt.x*.5+.5)*B.width+B.left,oe=(-Mt.y*.5+.5)*B.height+B.top;
  const dx=(L.clientX-Pt)/32,dy=(L.clientY-oe)/46,score=dx*dx+dy*dy;
  if(score<best){best=score;hitId=gt.person.id}
}
if(hitId!==null)t.onPerson(hitId)};
r.domElement.addEventListener("pointerdown",bt),r.domElement.addEventListener("pointerup",Yt);let U=()=>{F=null,et=!1,t.onExplore?.()};a.addEventListener("start",U);let lt=new Map;function setMood(L,B){let label=Jt.find(Z=>Z.id===L);if(!label)return;let mood=window.KSLabelLayout?.moodEmoji||{happy:"😊",sad:"😔",angry:"😠",badmood:"😒",busy:"💻"},entry=Object.entries(mood).find(Z=>Z[1]===B||Z[0]===B),emoji=entry?.[1]||"";if(label.mood===emoji)return;label.mood=emoji,label.moodElement.textContent=emoji,label.moodElement.hidden=!emoji,label.element.setAttribute("aria-label",`${label.nameElement.textContent}${emoji?", mood "+entry[0]:""}`)}function yt(L,B="emoji"){if(B==="emoji"){setMood(L,"");return}let Z=`${L}:${B}`;lt.get(Z)?.element.remove(),lt.delete(Z)}function At(L,B,Z=6800,gt="activity"){if(gt==="emoji"){setMood(L,B);return}if(gt==="follow"&&Z===0)Z=4800;if(gt==="workload")Z=Math.min(Z||6500,6500);let Mt=`${L}:${gt}`;if(lt.get(Mt)?.element.textContent===B&&Z===0)return;yt(L,gt);let Pt=document.createElement("div");if(Pt.className=`scene-bubble${gt==="emoji"?" scene-mood-bubble":""}`,Pt.dataset.employeeId=String(L),Pt.dataset.bubbleKind=gt,gt==="emoji"){let oe={"\u{1F60A}":"happy","\u{1F614}":"sad","\u{1F620}":"angry","\u{1F612}":"badmood","\u{1F4BB}":"busy"};Pt.dataset.mood=oe[B]||"happy",Pt.setAttribute("aria-label",`${n.find(Pe=>Pe.id===L)?.name||"Staff"}: ${Pt.dataset.mood}`);let me=document.createElement("span");if(me.className="animated-mood-icon",me.textContent=B,me.setAttribute("aria-hidden","true"),Pt.appendChild(me),B==="\u{1F4BB}"){let Pe=document.createElement("span");Pe.className="busy-dots",Pe.setAttribute("aria-hidden","true"),Pe.innerHTML="<i></i><i></i><i></i>",Pt.appendChild(Pe)}}else Pt.textContent=B.slice(0,220);ut.appendChild(Pt),lt.set(Mt,{id:L,kind:gt,element:Pt,until:Z?performance.now()+Z:1/0})}// Wheel zoom owns the same target used by the animation loop. Intercept
// before OrbitControls (capture phase), which otherwise changes o.zoom
// while the animation loop immediately pulls it back to the stale it value.
const sceneWheel=L=>{if(!L.cancelable)return;L.preventDefault();L.stopImmediatePropagation();
  const factor=L.deltaMode===1?16:L.deltaMode===2?160:1;
  const delta=Math.max(-260,Math.min(260,L.deltaY*factor));
  if(!Number.isFinite(delta)||delta===0)return;
  F=null;it=Hn.clamp(it*Math.exp(-delta*.00165),.65,5);
};
r.domElement.addEventListener("wheel",sceneWheel,{capture:!0,passive:!1});
let ht=new rr,j=new D,Ct=new D,Vt=Vh.map(([L,B])=>new D(L*FLOOR_SPACE_SCALE,.08,B*FLOOR_SPACE_SCALE)),le=Vt.map((L,B)=>L.distanceTo(Vt[(B+1)%Vt.length])),re=le.reduce((L,B)=>L+B,0),tn=L=>{v=L,et=!1,F=null,nt=!1,a.autoRotate=!1,a.enableRotate=L==="isometric",a.target.copy(Lt),o.position.copy(L==="plan"?new D(0,65,.01):mt()),o.zoom=1.14,it=1.14,o.lookAt(a.target),a.update(),It(),t.onZoom(1.14)};function qe(){if(xt)return;tt=requestAnimationFrame(qe);let L=Math.min(ht.getDelta(),.05);if(document.hidden||!Bt||!Ot)return;if(P||(Q+=L),a.dampingFactor=1-Math.exp(-4*L),a.autoRotate=nt&&!P&&!c.matches&&v==="isometric",et&&dt!==null){let Z=H.find(gt=>gt.person.id===dt);Z&&(F=Z.root.position.clone(),F.y=.6)}if(F){let Z=J.copy(F).sub(a.target).multiplyScalar(1-Math.exp(-5*L));a.target.add(Z),o.position.add(Z),it=Y,o.zoom+=(it-o.zoom)*(1-Math.exp(-6*L)),o.updateProjectionMatrix(),Z.length()<.002&&Math.abs(o.zoom-Y)<.002&&(F=null)}else Math.abs(o.zoom-it)>1e-4&&(o.zoom+=(it-o.zoom)*(1-Math.exp(-10*L)),o.updateProjectionMatrix());a.update(L);for(let Z of H){let gt=Q+Z.phase,Mt=Z.person;if(e.externalMotion&&!P&&(Z.root.position.distanceTo(Z.targetPosition)>4?Z.root.position.copy(Z.targetPosition):Z.root.position.lerp(Z.targetPosition,1-Math.exp(-18*L))),Mt.status==="walking"&&!e.externalMotion){let Pt=Q*.72%re,oe=0;for(;Pt>le[oe]&&oe<Vt.length-1;)Pt-=le[oe],oe++;let me=Vt[oe],Pe=Vt[(oe+1)%Vt.length],Ui=Pt/le[oe];Z.root.position.lerpVectors(me,Pe,Ui),Z.targetRotation=Math.atan2(Pe.x-me.x,Pe.z-me.z)}let Ft=Z.root.position.distanceTo(Z.lastPosition);if(Z.lastPosition.copy(Z.root.position),!P){let Pt=Z.targetRotation-Z.root.rotation.y;Z.root.rotation.y+=Math.atan2(Math.sin(Pt),Math.cos(Pt))*(1-Math.exp(-L*9))}Wh(Z,Mt,Q,P?0:L,P?0:Ft),Z.ring.visible=dt===Mt.id||at!=="all"&&at===Mt.department,Z.ring.visible&&(Z.ring.material.opacity=.65+Math.sin(gt*2)*.15)}/* V80: place all labels together in screen-space, names first and one bubble per person. */
const nameCandidates=[],roomCandidates=[],bubbleCandidates=[];
for(const Z of Jt){const gt=H.find(oe=>oe.person.id===Z.id);if(!gt)continue;
 Ct.copy(gt.root.position),Ct.y+=3.08-.38*gt.sit,j.copy(Ct).project(o);
 const px=(j.x*.5+.5)*Bt,py=(-j.y*.5+.5)*Ot;
 nameCandidates.push({id:Z.id,x:px,y:py,width:Z.element.offsetWidth||Math.min(160,30+Z.nameElement.textContent.length*8+(Z.mood?22:0)),height:Z.element.offsetHeight||27,focused:dt===Z.id,visible:j.z>=-1&&j.z<1&&px>-12&&px<Bt+12&&py>-12&&py<Ot+12});
 Z.element.classList.toggle("dimmed",at!=="all"&&gt.person.department!==at);Z.element.classList.toggle("focused",dt===Z.id);
}
for(let k=0;k<kt.length;k++){const Z=kt[k];j.copy(Z.position).project(o);const px=(j.x*.5+.5)*Bt,py=(-j.y*.5+.5)*Ot;roomCandidates.push({id:k,x:px,y:py,width:Z.element.offsetWidth||112,height:Z.element.offsetHeight||24,visible:j.z>=-1&&j.z<1&&px>10&&px<Bt-10&&py>38&&py<Ot-25});}
for(const [key,gt] of lt){const Mt=H.find(oe=>oe.person.id===gt.id);if(!Mt||performance.now()>gt.until){gt.element.remove(),lt.delete(key);continue}bubbleCandidates.push({key,id:gt.id,kind:gt.kind,width:gt.element.offsetWidth||Math.min(200,Math.max(125,36+gt.element.textContent.length*5)),height:gt.element.offsetHeight||46,started:gt.until,visible:true});}
const smart=window.KSLabelLayout?.layout({names:nameCandidates,rooms:roomCandidates,bubbles:bubbleCandidates,viewport:{width:Bt,height:Ot},zoom:o.zoom});
if(smart){for(const label of smart.names){const Z=Jt.find(t=>t.id===label.id);if(!Z)continue;Z.element.style.visibility=label.visible?"visible":"hidden";if(label.visible){Z.element.style.left=`${label.x}px`,Z.element.style.top=`${label.y}px`}}
 for(const label of smart.rooms){const Z=kt[label.id];if(!Z)continue;Z.element.style.visibility=label.visible?"visible":"hidden";if(label.visible){Z.element.style.left=`${label.x}px`,Z.element.style.top=`${label.y}px`}}
 for(const bubble of lt.values())bubble.element.style.visibility="hidden";
 for(const label of smart.bubbles){const bubble=lt.get(label.key);if(!bubble||!label.visible)continue;bubble.element.style.left=`${label.x}px`,bubble.element.style.top=`${label.y}px`,bubble.element.style.visibility="visible";}
}else{for(const Z of Jt)Z.element.style.visibility="hidden";for(const Z of kt)Z.element.style.visibility="hidden";for(const bubble of lt.values())bubble.element.style.visibility="hidden";}
Math.abs(o.zoom-A)>.006&&(A=o.zoom,t.onZoom(o.zoom)),window.OfficeLiving?.applyLighting?.(l,h,u,r,s),window.OfficeLiving?.screenGlow?.(f,Date.now()),r.render(s,o)}return qe(),{setQuality(L){let B={eco:[1,0],balanced:[1.35,1024],high:[1.75,2048]}[L]||[1.35,1024];r.setPixelRatio(Math.min(window.devicePixelRatio,B[0])),r.shadowMap.enabled=B[1]>0,B[1]&&h.shadow.mapSize.x!==B[1]&&(h.shadow.mapSize.set(B[1],B[1]),h.shadow.map?.dispose(),h.shadow.map=null),r.shadowMap.needsUpdate=!0,accent.intensity=L==="eco"?0:L==="high"?.55:.38,Dt()},playEmote(L,B){let Z=H.find(gt=>gt.person.id===(B??dt))||H[0];return!Z||P?null:(Z.emote=L,Z.emoteStart=Q,L==="wave"&&(Z.waveStart=Q),Z.person.id)},setPaused(L){P=L,i.classList.toggle("scene-paused",L),ht.getDelta()},setRotating(L){nt=L},setView:tn,zoomBy(L){F=null,it=Hn.clamp(it*L,.65,5)},reset(){dt=null,et=!1,tn("isometric")},selectDepartment(L){at=L,dt=null},focusPerson(L){let B=H.find(Z=>Z.person.id===L);B&&(dt=L,B.waveStart=Q,et=!!e.externalMotion,nt=!1,F=B.root.position.clone(),F.y=.6,Y=3.2)},focusRoom(L){let B=Hh.find(Z=>Z.id===L);if(!B)return;dt=null,et=!1,nt=!1,F=new D(B.focus[0]*FLOOR_SPACE_SCALE,0,B.focus[1]*FLOOR_SPACE_SCALE),Y=1.8},rotateBy(L){et=!1,nt=!1;let B=o.position.clone().sub(a.target);B.applyAxisAngle(new D(0,1,0),L),o.position.copy(a.target).add(B),a.update()},stopFollowing(){et=!1,dt=null,F=null;for(let[L,B]of lt)B.kind==="follow"&&(B.element.remove(),lt.delete(L))},updatePeople(L){for(let B of L){let Z=H.find(Pt=>Pt.person.id===B.id);if(!Z)continue;let gt=B.position[0]*FLOOR_SPACE_SCALE-Z.targetPosition.x,Mt=B.position[1]*FLOOR_SPACE_SCALE-Z.targetPosition.z;Math.hypot(gt,Mt)>.002&&B.status==="walking"?Z.targetRotation=Math.atan2(gt,Mt):B.rotation!==void 0&&(B.seated||B.action==="chat"||B.action==="meeting")&&(Z.targetRotation=B.rotation),Z.targetPosition.set(B.position[0]*FLOOR_SPACE_SCALE,.08,B.position[1]*FLOOR_SPACE_SCALE),Z.person.status=B.status,Z.person.seated=B.seated,Z.person.action=B.action;let Ft=Jt.find(Pt=>Pt.id===B.id);Ft&&(setMood(B.id,B.mood||""),Ft.element.classList.toggle("has-alert",!!B.alert),Ft.element.title=`${Z.person.name} \xB7 ${Z.person.role}${B.action?" \xB7 Simulated "+B.action:""}${B.note?" \xB7 "+B.note:""}`)}},showBubble:At,clearBubble:yt,dispose(){xt=!0,cancelAnimationFrame(tt),ct.disconnect(),a.removeEventListener("start",U),a.dispose(),r.domElement.removeEventListener("pointerdown",bt),r.domElement.removeEventListener("pointerup",Yt),r.domElement.removeEventListener("wheel",sceneWheel,!0);let L=new Set;s.traverse(B=>{B instanceof be&&(g.add(B.geometry),Array.isArray(B.material)?B.material.forEach(Z=>L.add(Z)):L.add(B.material))}),g.forEach(B=>B.dispose()),L.forEach(B=>B.dispose()),f.forEach(B=>B.dispose()),r.dispose(),r.domElement.remove(),ut.remove()}}}var kl=document.querySelector("#office3dHost"),fa=document.querySelector("#office3dLoading"),Cn=window.OfficeSuite,un=i=>document.getElementById(i),Zh={1:0,2:1,3:3,4:6,5:4,6:7,7:2,8:5},Te,qh="",Vn=matchMedia("(prefers-reduced-motion: reduce)").matches,$h=0,Yh=!1;function Hl(i){let t=i.visualRoomId||i.roomId;return i.motionWalking?"walking":["pantry","prayer","toilet-a","toilet-b"].includes(t)?"break":t==="showroom"?"showroom":t==="store"?"desk":i.motionStatus==="On break"?"break":i.motionStatus==="In a meeting"?"showroom":"desk"}function Jh(i){return Hl(i)==="desk"&&Math.hypot((i.visualX??i.x)-(i.deskX??i.x),(i.visualY??i.y)-(i.deskY??i.y))<.5}function Kh(i){return[(i.visualX??i.x)/2-5.75,(i.visualY??i.y)/2-17.5]}function v0(i){return i.map((t,e)=>{let n=_s[Zh[t.id]??e%_s.length];return{...n,id:t.id,name:t.name,role:t.position,department:t.department,gender:t.gender||n.gender||"male",appearance:t.appearance,status:Hl(t),position:Kh(t),rotation:t.id===4?Math.PI/2:n.rotation,seated:Jh(t),action:t.motionAction,mood:t.mood||""}})}function M0(i){Te?.dispose(),kl.replaceChildren(),Te=Xh(kl,{onPerson:n=>{window.KSOutsideClose?.markCharacterSelection?.();Cn?.selectPerson(n)},onDepartment:n=>Cn?.selectDepartment(n),onRoom:n=>Cn?.selectRoom(n),onExplore:()=>Cn?.stopFollow(),onZoom:n=>{un("rotationReadout").textContent=`${Math.round(n*100)}%`}},{roster:v0(i),externalMotion:!0}),Te.setView("isometric"),Te.setPaused(Vn),Te.setRotating(!Vn),window.office3d=Te;try{let n=localStorage.getItem("ks-3d-quality-v86");Te.setQuality(["eco","balanced","high"].includes(n)?n:"balanced")}catch{Te.setQuality("balanced")}window.dispatchEvent(new Event("ks:3d-ready"));for(let n of i){let s={happy:"\u{1F60A}",sad:"\u{1F614}",angry:"\u{1F620}",badmood:"\u{1F612}",busy:"\u{1F4BB}"}[n.mood||""];s&&Te.showBubble(n.id,s,0,"emoji")}let t=Te.selectDepartment.bind(Te);Te.selectDepartment=n=>t(n==="All"?"all":n);let e=Te.reset.bind(Te);Te.reset=()=>{e(),Te?.setRotating(!Vn)},document.documentElement.classList.add("studio3d-ready"),un("officeSvg").setAttribute("aria-hidden","true"),un("officeSvg").querySelectorAll("[tabindex]").forEach(n=>n.setAttribute("tabindex","-1")),fa.hidden=!0}function jh(){if(!Yh){if(!document.hidden&&Cn){let i=Cn.getStaff(),t=JSON.stringify(i.map(e=>[e.id,e.name,e.position,e.department,e.gender||"",e.appearance||null]));try{t!==qh&&(M0(i),qh=t)}catch(e){Yh=!0,console.error("Office 3D initialization failed",e),Te?.dispose(),kl.replaceChildren(),document.documentElement.classList.remove("studio3d-ready"),un("officeSvg").removeAttribute("aria-hidden"),un("officeSvg").querySelectorAll(".employee").forEach(n=>n.setAttribute("tabindex","0")),window.office3d=void 0,fa.textContent="3D unavailable in this browser. The office map and tools are still available.",fa.hidden=!1;return}Te?.updatePeople(i.map(e=>({id:e.id,position:Kh(e),status:Hl(e),seated:Jh(e),action:e.motionAction,rotation:e.motionFaceTo&&i.some(t=>t.id===e.motionFaceTo)?Math.atan2(Kh(i.find(t=>t.id===e.motionFaceTo))[0]-Kh(e)[0],Kh(i.find(t=>t.id===e.motionFaceTo))[1]-Kh(e)[1]):e.id===4?Math.PI/2:_s[Zh[e.id]??0].rotation,note:e.currentJob||e.workload?.[0]||"",alert:e.hasAlert,mood:e.mood||""})))}$h=requestAnimationFrame(jh)}}if(Cn){Cn.pause(Vn),un("rotationReadout").onclick=()=>Cn.reset(),un("rotationReadout").title="Reset view",un("rotationReadout").setAttribute("aria-label","Reset view"),un("opsMobileToggle").onclick=()=>{let t=un("todayPanel").classList.toggle("mobile-open");un("opsMobileToggle").setAttribute("aria-expanded",String(t)),un("opsMobileToggle").textContent=t?"Close operations":"Operations"},document.addEventListener("visibilitychange",()=>Te?.setPaused(Vn||document.hidden));let i=matchMedia("(prefers-reduced-motion: reduce)");i.addEventListener("change",()=>{Vn=i.matches,Cn.pause(Vn),Te?.setPaused(Vn||document.hidden),Te?.setRotating(!Vn)}),window.addEventListener("pagehide",()=>{cancelAnimationFrame($h),Te?.dispose()},{once:!0}),jh()}else fa.textContent="The office could not initialize. Reload to try again.";})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
