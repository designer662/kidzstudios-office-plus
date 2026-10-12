export type Status = 'desk' | 'showroom' | 'break' | 'walking';
export type Gender = 'male' | 'female';
export type Person = { id:number; name:string; department:string; role:string; gender:Gender; status:Status; location:string; color:string; tint:string; skin:string; hair:string; position:[number,number]; rotation:number; seated:boolean; action?:string };
export const statusLabels:Record<Status,string> = {desk:'At desks',showroom:'In showroom',break:'On a break',walking:'Walking'};
export const departments = [
 {id:'management',name:'Management',fullName:'Management',count:2},
 {id:'design',name:'Design',fullName:'Design team',count:2},
 {id:'sales',name:'Sales & marketing',fullName:'Sales & marketing',count:3},
 {id:'admin',name:'Admin',fullName:'Administration',count:1},
];
// The roster is supplied by the user. Activity and avatar appearances are illustrative.
export const people:Person[] = [
 {id:0,name:'Boss',department:'management',role:'Boss',gender:'male',status:'desk',location:'Private office',color:'#9c7054',tint:'#f1e6da',skin:'#c7946d',hair:'#38322f',position:[3.2,4.05],rotation:Math.PI,seated:true},
 {id:1,name:'Cikda',department:'management',role:'Boss assistant',gender:'female',status:'desk',location:'Open workspace',color:'#8a738d',tint:'#efe5ef',skin:'#d9ab83',hair:'#4b3a33',position:[-.15,-14.85],rotation:Math.PI,seated:true},
 {id:2,name:'Minn',department:'design',role:'Designer',gender:'female',status:'desk',location:'Open workspace',color:'#668b7a',tint:'#e4eee8',skin:'#e6bc97',hair:'#433731',position:[-1.5,-12.45],rotation:Math.PI/2,seated:true},
 {id:3,name:'Afiq',department:'design',role:'Designer',gender:'male',status:'desk',location:'Open workspace',color:'#527583',tint:'#e1ebef',skin:'#cea27d',hair:'#292f32',position:[3.2,-12.45],rotation:-Math.PI/2,seated:true},
 {id:4,name:'Nisa',department:'sales',role:'Sales and marketing',gender:'female',status:'showroom',location:'T-shirt showroom',color:'#b47467',tint:'#f4e5e0',skin:'#deb28c',hair:'#40332f',position:[3.75,-3.1],rotation:Math.PI/2,seated:false},
 {id:5,name:'Athira',department:'sales',role:'Sales and marketing',gender:'female',status:'showroom',location:'T-shirt showroom',color:'#c19957',tint:'#f6ecd8',skin:'#deb38d',hair:'#493a35',position:[2.25,-1.15],rotation:0,seated:false},
 {id:6,name:'Mirul',department:'sales',role:'Sales and marketing',gender:'male',status:'walking',location:'Workspace & showroom',color:'#647395',tint:'#e6eaf3',skin:'#b8825b',hair:'#343536',position:[-3.05,-7],rotation:0,seated:false},
 {id:7,name:'Lisa',department:'admin',role:'Admin',gender:'female',status:'desk',location:'Open workspace',color:'#918661',tint:'#eeeadd',skin:'#edc5a5',hair:'#5d4435',position:[3.1,-14.85],rotation:Math.PI,seated:true},
];
export const rooms = [
 {id:'workspace',name:'Open workspace',x:.8,z:-7.0,y:.35,focus:[.7,-11.3] as [number,number]},
 {id:'showroom',name:'T-shirt showroom',x:1,z:-.75,y:1.25,focus:[1,-2.25] as [number,number]},
 {id:'office',name:'Boss office',x:2.95,z:5.0,y:1.0,focus:[3,3.2] as [number,number]},
 {id:'pantry',name:'Pantry',x:-3.5,z:7,y:1.15,focus:[-3,4.8] as [number,number]},
 {id:'store',name:'Store',x:2.7,z:9.7,y:1.0,focus:[3,8] as [number,number]},
 {id:'surau',name:'Surau',x:2.3,z:16.7,y:.6,focus:[2.2,14.5] as [number,number]},
 {id:'toilets',name:'Toilets',x:-3.8,z:12.8,y:1.1,focus:[-3.8,12.5] as [number,number]},
];
export const walkingPath:[number,number][] = [[-3.05,-7],[-3.05,-5.25],[-1.7,-5.25],[-1.7,-2.05],[-.85,-1.15],[-.85,6.6],[-2.55,7.7],[-.85,7.7],[-.85,-1.15],[-1.7,-2.05],[-1.7,-5.25],[-3.05,-5.25]];
