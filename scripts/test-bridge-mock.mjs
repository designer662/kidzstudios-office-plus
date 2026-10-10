import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const config={url:'https://demo-project.supabase.co',publishableKey:'sb_publishable_mock'};
const storageKey='ks-office-auth:https://demo-project.supabase.co';
const storage=new Map([[storageKey,JSON.stringify({access_token:'mockjwt',refresh_token:'ref',expires_at:Math.floor(Date.now()/1000)+3600})]]);
const reqs=[];
async function mockFetch(url,opt={}){
  const u=new URL(typeof url==='string'?url:url.url,'https://my.github.io');
  reqs.push([u.pathname,opt.method||'GET']);
  let body,status=200;
  if(u.pathname.endsWith('/rpc/ks_is_office_member'))body=true;
  else if(u.pathname.endsWith('/ks_shared_state'))body=[{scope:'office:staff',payload:{staff:[{name:'Boss'}]},version:1,updated_at:'2026-10-09T04:00:00Z'}];
  else if(u.pathname.endsWith('/rpc/ks_save_shared_state')){
    const request=JSON.parse(opt.body);body={scope:request.p_scope,payload:request.p_payload,version:2,updated_at:'2026-10-09T04:01:00Z'};
  }
  else if(u.pathname.endsWith('/rpc/ks_post_chat')){
    const request=JSON.parse(opt.body);body={id:10,sender_id:request.p_sender_id,sender_name:request.p_sender_name,client_id:request.p_client_id,message:request.p_message,created_at:'2026-10-09T04:03:00Z'};
  }
  else if(u.pathname.endsWith('/ks_office_events'))body=[];
  else if(u.pathname.endsWith('/ks_office_chat'))body=[];
  else{body={error:'unknown path '+u.pathname};status=404;}
  return new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json'}});
}
function element(type){return {
  type,hidden:false,dataset:{},style:{},value:'',innerHTML:'',textContent:'',onclick:null,
  append(){},addEventListener(){},
  querySelector(selector){return element(selector);}
};}
let domReady,signout;
const doc={readyState:'loading',hidden:true,documentElement:{dataset:{}},getElementById:()=>null,head:{append(){}},body:{append(el){if(el.id==='ks-office-signout')signout=el;}},
  createElement:element,addEventListener(type,fn){if(type==='DOMContentLoaded')domReady=fn;},querySelector(sel){if(sel==='#ks-office-signout')return signout;if(sel.includes('header-tools'))return null;return element(sel);} };
const window={KS_SUPABASE_CONFIG:config,fetch:mockFetch,addEventListener(){},dispatchEvent(){}};
const ctx={window,document:doc,location:{href:'https://my.github.io/office/',origin:'https://my.github.io'},
  localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
  Response,URL,Date,Promise,JSON,Math,String,Number,Array,Object,RegExp,Error,Set,Map,Boolean,CustomEvent:class{},
  clearInterval,clearTimeout,setInterval,setTimeout};
vm.runInNewContext(readFileSync('public/supabase-bridge.js','utf8'),ctx,{filename:'supabase-bridge.js'});
domReady();
async function check(url,opt){const res=await window.fetch(url,opt);return [res.status,await res.json()];}
const [getStatus,getResult]=await check('/api/state?scope=office%3Astaff');
assert.equal(getStatus,200);assert.equal(getResult.payload.staff[0].name,'Boss');
const [saveStatus,saveResult]=await check('/api/state',{method:'PUT',body:JSON.stringify({scope:'office:staff',payload:{staff:[]}})});
assert.equal(saveStatus,200);assert.equal(saveResult.version,2);
const [chatStatus,chatResult]=await check('/api/chat',{method:'POST',body:JSON.stringify({senderId:2,senderName:'Afiq',message:'Hello',sourceClient:'PC-01'})});
assert.equal(chatStatus,201);assert.equal(chatResult.message.clientId,'PC-01');
const [eventsStatus,eventsResult]=await check('/api/events?limit=10');
assert.equal(eventsStatus,200);assert.equal(eventsResult.events.length,0);
assert.equal(window.OfficeSupabase.isConfigured,true);
assert.ok(reqs.some(([path])=>path.endsWith('/rpc/ks_is_office_member')));
console.log('PASS: saved authenticated session accepted by membership check');
console.log('PASS: state GET/PUT, chat POST and events GET route to Supabase REST');
assert.equal(doc.documentElement.dataset.ksAuth,'ok');
console.log('PASS: page content is revealed only after authentication');
console.log('PASS: API response shape and status codes are compatible with V57 UI');
