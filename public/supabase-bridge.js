/* Office Plus GitHub Pages + Supabase browser bridge.
 * Translates legacy /api/state, /api/chat, /api/events into authenticated PostgREST calls.
 * Keys in browser must be public (publishable/anon) ONLY. Authorization is enforced by RLS.
 */
(() => {
  'use strict';
  const config = window.KS_SUPABASE_CONFIG || {};
  const configured = /^https:\/\/[a-z0-9.-]+\.supabase\.co\/?$/i.test(String(config.url || ''))
    && !!config.publishableKey && !String(config.publishableKey).includes('REPLACE_');
  const base = String(config.url || '').replace(/\/$/, '');
  const publicKey = String(config.publishableKey || '');
  const nativeFetch = window.fetch.bind(window);
  const sessionKey = `ks-office-auth:${base}`;
  let session = null;
  let resolveReady;
  const ready = new Promise(resolve => { resolveReady = resolve; });
  let refreshing = null;
  let ws = null;
  let heartbeat = null;
  let reconnectTimer = null;
  let reconnectAttempts = 0;
  let msgRef = 0;
  let realtimeJoined = false;
  let signedInOnce = false;
  let loggedOut = false;

  if (!document.getElementById('ks-auth-guard-style')) {
    const guard=document.createElement('style');guard.id='ks-auth-guard-style';
    guard.textContent='html:not([data-ks-auth="ok"]) body>*:not(#ks-auth-gate){visibility:hidden!important}';
    document.head.append(guard);
  }
  const jsonResponse = (value, status = 200) => new Response(JSON.stringify(value), {
    status, headers: {'content-type':'application/json; charset=utf-8','cache-control':'no-store'}
  });
  const clean = (value, len) => String(value ?? '').replace(/\0/g,'').trim().slice(0,len);
  const params = url => new URL(url, location.href).searchParams;
  const parseJson = async response => {
    const text = await response.text();
    try { return text ? JSON.parse(text) : null; } catch { return {error:text.slice(0,300)}; }
  };
  const rpcError = (status, result) => jsonResponse({error:result?.message || result?.error_description || result?.error || 'Supabase request failed',code:result?.code},status);
  const savedSession = () => {
    try { return JSON.parse(localStorage.getItem(sessionKey) || 'null'); } catch { return null; }
  };
  function pushRealtimeToken() {
    if (ws && ws.readyState===WebSocket.OPEN && session?.access_token) {
      try { ws.send(JSON.stringify({topic:'realtime:ks-office-plus',event:'access_token',payload:{access_token:session.access_token},ref:String(++msgRef)})); } catch {}
    }
  }
  function setSession(next, {broadcast=true}={}) {
    session = next ? {...next, expires_at:next.expires_at || Math.floor(Date.now()/1000) + Number(next.expires_in || 3600)} : null;
    try {
      if (session) localStorage.setItem(sessionKey,JSON.stringify(session));
      else localStorage.removeItem(sessionKey);
    } catch {}
    if (session) pushRealtimeToken();
  }
  const networkError = error => Object.assign(new Error('Cannot reach Supabase. Check your internet connection and try again.'),{network:true,cause:error});
  async function authRequest(path,body) {
    let response;
    try {
      response = await nativeFetch(`${base}/auth/v1/${path}`,{
        method:'POST', headers:{apikey:publicKey,'content-type':'application/json'},body:JSON.stringify(body)
      });
    } catch (error) { throw networkError(error); }
    const value = await parseJson(response);
    if (!response.ok) throw new Error(value?.msg || value?.error_description || value?.message || 'Authentication failed');
    return value;
  }
  async function checkMembership(token) {
    let check;
    try {
      check = await nativeFetch(`${base}/rest/v1/rpc/ks_is_office_member`,{
        method:'POST', headers:{apikey:publicKey,authorization:`Bearer ${token}`,'content-type':'application/json'},body:'{}'
      });
    } catch (error) { throw networkError(error); }
    if (check.status >= 500) throw networkError(new Error('HTTP '+check.status));
    const allowed=await parseJson(check);
    if (!check.ok || allowed !== true) throw new Error('Your account is not approved for Office Plus. Ask an administrator to add you to ks_staff_members.');
  }
  async function refreshSession() {
    if (refreshing) return refreshing;
    refreshing = (async () => {
      if (!session?.refresh_token) throw new Error('Sign in required');
      try {
        const renewed = await authRequest('token?grant_type=refresh_token',{refresh_token:session.refresh_token});
        setSession(renewed);
        return session;
      } catch (error) {
        const other = savedSession();
        if (other?.access_token && other.refresh_token !== session.refresh_token) { setSession(other); return session; }
        if (error.network) throw error; // offline: keep the session and retry later
        setSession(null); displayGate(error.message || 'Please sign in again');
        throw error;
      }
    })().finally(() => { refreshing = null; });
    return refreshing;
  }
  async function authToken() {
    if (!configured) throw new Error('Supabase project is not configured');
    await ready;
    if (!session) throw new Error('Sign in required');
    if ((session.expires_at || 0) < Math.floor(Date.now()/1000) + 75) await refreshSession();
    return session.access_token;
  }
  async function rest(path,{method='GET',body,headers={}}={}) {
    let token;
    try { token = await authToken(); } catch(error) { return {status:401,data:{error:error.message}}; }
    const h = {'apikey':publicKey,'authorization':`Bearer ${token}`,...headers};
    if (body !== undefined) h['content-type'] = 'application/json';
    try {
      const response = await nativeFetch(`${base}/rest/v1/${path}`,{
        method, headers:h, body:body===undefined?undefined:JSON.stringify(body), cache:'no-store', keepalive: body!==undefined && JSON.stringify(body).length<60000
      });
      const data = await parseJson(response);
      if (response.status === 401) displayGate('Session expired. Please sign in again.');
      return {status:response.status,data};
    } catch(error) { return {status:503,data:{error:error.message || 'Supabase unreachable'}}; }
  }
  const query = value => encodeURIComponent(String(value));
  const normalizeChat = row => ({
    id:Number(row.id),senderId:row.sender_id == null?null:Number(row.sender_id),
    senderName:row.sender_name,clientId:row.client_id || null,message:row.message,createdAt:row.created_at
  });
  const normalizeEvent = row => ({
    id:Number(row.id),eventType:row.event_type,title:row.title,message:row.message || '',
    employeeId:row.employee_id==null?null:Number(row.employee_id),metadata:row.metadata || {},
    dedupeKey:row.dedupe_key || '',sourceClient:row.source_client || '',createdAt:row.created_at
  });
  const limit = (raw,fallback) => Math.max(1,Math.min(100,Number(raw)||fallback));
  async function stateApi(method,u,options) {
    if (method === 'GET') {
      const scope = clean(u.searchParams.get('scope'),120);
      if (!/^[a-z0-9:_()\-.]{1,120}$/i.test(scope)) return jsonResponse({error:'Invalid scope'},400);
      const {status,data} = await rest(`ks_shared_state?select=scope,payload,version,updated_at&scope=eq.${query(scope)}&limit=1`);
      if (status!==200) return rpcError(status,data);
      if (!data?.length) return jsonResponse({error:'Not found',scope},404);
      const row=data[0];
      return jsonResponse({scope:row.scope,payload:row.payload||{},version:Number(row.version),updatedAt:row.updated_at});
    }
    if (method==='PUT' || method==='POST') {
      let body;
      try {body=JSON.parse(options.body||'{}');} catch{return jsonResponse({error:'Invalid JSON'},400);}
      const scope=clean(body.scope,120),payload=body.payload;
      if (!/^[a-z0-9:_()\-.]{1,120}$/i.test(scope) || !payload || typeof payload!=='object' || Array.isArray(payload)) return jsonResponse({error:'Invalid scope/payload'},400);
      if (JSON.stringify(payload).length>450000) return jsonResponse({error:'Payload too large'},413);
      const {status,data}=await rest('rpc/ks_save_shared_state',{method:'POST',body:{p_scope:scope,p_payload:payload,p_client_id:clean(body.clientId||'web',120),p_expected_version:body.expectedVersion==null?null:Number(body.expectedVersion)}});
      if (status!==200) return rpcError(data?.code==='40001'?409:status,data);
      return jsonResponse({scope:data.scope,payload:data.payload||{},version:Number(data.version),updatedAt:data.updated_at});
    }
    return jsonResponse({error:'Method not allowed'},405);
  }
  async function chatApi(method,u,options) {
    if (method === 'GET') {
      const n=limit(u.searchParams.get('limit'),60);
      const cutoff=new Date(Date.now()-86400000).toISOString();
      const {status,data}=await rest(`ks_office_chat?select=id,sender_id,sender_name,client_id,message,created_at&created_at=gte.${query(cutoff)}&order=id.desc&limit=${n}`);
      if (status!==200) return rpcError(status,data);
      return jsonResponse({messages:[...(data||[])].reverse().map(normalizeChat)});
    }
    if (method==='POST') {
      let body;
      try {body=JSON.parse(options.body||'{}');} catch{return jsonResponse({error:'Invalid JSON'},400);}
      const message=clean(body.message,600);
      if (!message) return jsonResponse({error:'Message is required'},400);
      const senderId=Number(body.senderId);
      const {status,data}=await rest('rpc/ks_post_chat',{method:'POST',body:{
        p_sender_id:Number.isInteger(senderId)&&senderId>0?senderId:null,
        p_sender_name:clean(body.senderName||'Office',80),p_client_id:clean(body.sourceClient||'chat',120),p_message:message
      }});
      if (status!==200) return rpcError(status,data);
      return jsonResponse({message:normalizeChat(data)},201);
    }
    if (method==='DELETE') {
      const {status,data}=await rest('ks_office_chat?id=gt.0',{method:'DELETE',headers:{prefer:'return=representation'}});
      if (status!==200) return rpcError(status,data);
      return jsonResponse({cleared:true,deleted:Array.isArray(data)?data.length:0});
    }
    return jsonResponse({error:'Method not allowed'},405);
  }
  async function eventsApi(method,u,options) {
    if (method==='GET') {
      const after=Math.max(0,Math.floor(Number(u.searchParams.get('after'))||0));
      const n=limit(u.searchParams.get('limit'),50);
      const where=after>0?`&id=gt.${after}`:'';
      const order=after>0?'asc':'desc';
      const {status,data}=await rest(`ks_office_events?select=id,event_type,title,message,employee_id,metadata,dedupe_key,source_client,created_at${where}&order=id.${order}&limit=${n}`);
      if (status!==200) return rpcError(status,data);
      const values=(data||[]).map(normalizeEvent);
      return jsonResponse({events:after>0?values:values.reverse()});
    }
    if (method==='POST') {
      let body;
      try {body=JSON.parse(options.body||'{}');} catch{return jsonResponse({error:'Invalid JSON'},400);}
      const eventType=clean(body.eventType,80),title=clean(body.title,180),message=clean(body.message,500),dedupeKey=clean(body.dedupeKey,220)||null;
      if (!eventType || !title) return jsonResponse({error:'eventType and title are required'},400);
      const metadata=body.metadata && typeof body.metadata==='object' && !Array.isArray(body.metadata)?body.metadata:{};
      if (JSON.stringify(metadata).length>20000) return jsonResponse({error:'Metadata too large'},413);
      const employeeId=Number(body.employeeId);
      const value={event_type:eventType,title,message,employee_id:Number.isInteger(employeeId)&&employeeId>0?employeeId:null,metadata,dedupe_key:dedupeKey,source_client:clean(body.sourceClient,140)||null};
      const {status,data}=await rest('ks_office_events',{method:'POST',body:value,headers:{prefer:'return=representation'}});
      if (status===201) return jsonResponse({event:normalizeEvent(data[0])},201);
      if (status===409 && dedupeKey) {
        const old=await rest(`ks_office_events?select=*&dedupe_key=eq.${query(dedupeKey)}&limit=1`);
        if (old.status===200 && old.data?.length) return jsonResponse({event:normalizeEvent(old.data[0])},201);
      }
      return rpcError(status,data);
    }
    return jsonResponse({error:'Method not allowed'},405);
  }
  window.fetch = function(input,options={}) {
    const raw = typeof input === 'string'?input:input?.url;
    let u;
    try {u=new URL(raw,location.href);} catch {return nativeFetch(input,options);}
    if (!/^\/api\/(state|chat|events)$/.test(u.pathname) || u.origin !== location.origin) return nativeFetch(input,options);
    if (!configured) return Promise.resolve(jsonResponse({error:'Supabase is not configured. Set GitHub Actions repository variables.'},503));
    const method=String(options.method || ((typeof Request!=='undefined' && input instanceof Request)?input.method:'GET')).toUpperCase();
    if (u.pathname==='/api/state') return stateApi(method,u,options);
    if (u.pathname==='/api/chat') return chatApi(method,u,options);
    return eventsApi(method,u,options);
  };

  function closeRealtime() {
    realtimeJoined=false;clearInterval(heartbeat);clearTimeout(reconnectTimer);heartbeat=null;reconnectTimer=null;
    if (ws) {const old=ws;ws=null;old.onclose=null;try{old.close();}catch{}}
  }
  function connectRealtime() {
    closeRealtime();
    if (!session || document.hidden || !configured || loggedOut) return;
    const url=`${base.replace(/^http/,'ws')}/realtime/v1/websocket?apikey=${encodeURIComponent(publicKey)}&vsn=1.0.0`;
    const ref=()=>String(++msgRef);
    try { ws=new WebSocket(url); } catch {return;}
    const socket=ws;
    socket.onopen=()=>{
      const changes=['ks_shared_state','ks_office_chat','ks_office_events'].map(table=>({event:'*',schema:'public',table}));
      socket.send(JSON.stringify({topic:'realtime:ks-office-plus',event:'phx_join',payload:{config:{broadcast:{self:false},presence:{key:''},postgres_changes:changes,private:false},access_token:session.access_token},ref:ref()}));
      heartbeat=setInterval(()=>{if(socket.readyState===WebSocket.OPEN)socket.send(JSON.stringify({topic:'phoenix',event:'heartbeat',payload:{},ref:ref()}));},25000);
    };
    socket.onmessage=event=>{
      try {const message=JSON.parse(event.data);
        if (message.event==='phx_reply' && message.topic==='realtime:ks-office-plus') {
          realtimeJoined = message.payload?.status==='ok';
          if (realtimeJoined) reconnectAttempts = 0;
        }
        if (message.event==='postgres_changes') {
          const payload=message.payload||{};
          window.dispatchEvent(new CustomEvent('ks:supabase-change',{detail:{table:payload.data?.table || payload.table,payload}}));
        }
      } catch {}
    };
    socket.onclose=()=>{clearInterval(heartbeat);realtimeJoined=false;if(socket!==ws || loggedOut)return;reconnectAttempts++;reconnectTimer=setTimeout(connectRealtime,Math.min(30000,1500*(2**Math.min(reconnectAttempts,4))));};
    socket.onerror=()=>{};
  }

  let gate = null;
  function displayGate(message='') {
    if (!gate) return;
    gate.hidden=false;
    const status=gate.querySelector('#ks-auth-status');
    if (status) status.textContent=message;
  }
  function hideGate() {if(gate)gate.hidden=true;}
  function makeGate() {
    const style=document.createElement('style');
    style.textContent=`
      #ks-auth-gate{position:fixed;inset:0;z-index:2147483647;background:#f7f7f5;color:#263138;display:grid;place-items:center;font-family:system-ui,-apple-system,sans-serif;padding:20px}
      #ks-auth-gate[hidden]{display:none!important}
      .ks-auth-card{width:min(420px,100%);padding:32px;border:1px solid #e1e3dd;border-radius:20px;background:#fff;box-shadow:0 24px 75px #28372d19}
      .ks-auth-logo{letter-spacing:.08em;font-weight:900;font-size:17px}.ks-auth-logo b{color:#ed7841}
      .ks-auth-card h1{font-size:23px;line-height:1.25;margin:22px 0 9px}
      .ks-auth-card p{font-size:13px;line-height:1.65;color:#627078}
      .ks-auth-card label{display:grid;gap:7px;font-size:12px;font-weight:700;margin-top:15px}
      .ks-auth-card input{width:100%;box-sizing:border-box;min-height:44px;border:1px solid #cfd4d1;border-radius:10px;padding:11px 12px;font:inherit;background:#fff;color:#253036}
      .ks-auth-card button{width:100%;min-height:44px;margin-top:19px;background:#ed7841;color:white;border:0;border-radius:10px;font-weight:800;cursor:pointer}
      .ks-auth-card button:disabled{opacity:.6;cursor:wait}#ks-auth-status{font-size:12px;line-height:1.5;min-height:20px;margin-top:12px;color:#a34f35}
      #ks-office-signout{position:fixed;right:14px;bottom:12px;z-index:100000;display:none;border:1px solid #ddd;background:white;color:#333;border-radius:9px;padding:8px 12px;font-size:12px;min-height:36px;box-shadow:0 4px 20px #0001;cursor:pointer}
      #ks-office-signout.in-header{white-space:nowrap;position:static;box-shadow:none;height:42px;padding:0 12px;font-weight:700}
      .ks-auth-card input:focus-visible,.ks-auth-card button:focus-visible,#ks-office-signout:focus-visible{outline:3px solid #ed784155;outline-offset:2px}
      .ks-pw{position:relative;display:block}.ks-pw input{padding-right:64px}
      .ks-auth-card .ks-pw button{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:auto;min-height:32px;margin:0;padding:0 10px;background:transparent;color:#627078;border:0;font-size:12px;font-weight:700}
      .ks-auth-card .ks-auth-retry{background:#fff;color:#ed7841;border:1.5px solid #ed7841}
      #ks-auth-status:empty{display:none}
      @media(prefers-color-scheme:dark){#ks-auth-gate{background:#171a1c;color:#e8ecee}.ks-auth-card{background:#222729;border-color:#343b3e;box-shadow:none}.ks-auth-card p,.ks-pw button{color:#a9b3b8!important}.ks-auth-card input{background:#171a1c;border-color:#3d4549;color:#eef2f3}#ks-auth-status{color:#ffb59c}}
      #ks-office-signout[data-authenticated=true]{display:block}
    `;
    document.head.append(style);
    gate=document.createElement('div');gate.id='ks-auth-gate';gate.innerHTML=`<div class="ks-auth-card"><div class="ks-auth-logo"><b>KIDZ</b>STUDIOS · OFFICE PLUS</div><h1>Staff sign in</h1><p>Your office records are private. Sign in with a Supabase staff account approved by your administrator.</p><form id="ks-auth-form"><label>Email<input id="ks-auth-email" type="email" autocomplete="username" required></label><label>Password<span class="ks-pw"><input id="ks-auth-password" type="password" autocomplete="current-password" required><button type="button" id="ks-pw-toggle" aria-label="Show password" aria-pressed="false">Show</button></span></label><button id="ks-auth-submit" type="submit">Sign in</button></form><div id="ks-auth-status" role="alert" aria-live="assertive"></div></div>`;
    document.body.append(gate);
    const signout=document.createElement('button');signout.id='ks-office-signout';signout.type='button';signout.textContent='Sign out';signout.onclick=async()=>{
      loggedOut=true;const token=session?.access_token;setSession(null);closeRealtime();
      if(token)nativeFetch(`${base}/auth/v1/logout`,{method:'POST',headers:{apikey:publicKey,authorization:`Bearer ${token}`}}).catch(()=>{});
      location.reload();
    };
    const headerTools=document.querySelector('.ks-master-header .header-tools');
    if(headerTools){signout.classList.add('in-header');headerTools.append(signout);}else document.body.append(signout);
    const pw=gate.querySelector('#ks-auth-password'),tg=gate.querySelector('#ks-pw-toggle');
    if(tg)tg.addEventListener('click',()=>{const show=pw.type==='password';pw.type=show?'text':'password';tg.textContent=show?'Hide':'Show';tg.setAttribute('aria-pressed',String(show));tg.setAttribute('aria-label',show?'Hide password':'Show password');});
    gate.querySelector('#ks-auth-form').addEventListener('submit',async event=>{
      event.preventDefault();const button=gate.querySelector('#ks-auth-submit');button.disabled=true;button.textContent='Signing in…';
      displayGate('');
      try {
        const email=gate.querySelector('#ks-auth-email').value.trim();
        const password=gate.querySelector('#ks-auth-password').value;
        const result=await authRequest('token?grant_type=password',{email,password});
        await checkMembership(result.access_token);
        setSession(result);gate.querySelector('#ks-auth-password').value='';enterApp();
      } catch(error) {displayGate(error.message||'Could not sign in');}
      finally {button.disabled=false;button.textContent='Sign in';}
    });
  }
  async function init() {
    makeGate();
    if(!configured){displayGate('Setup needed: configure your Supabase URL and publishable key in GitHub repository variables, then redeploy.');gate.querySelector('#ks-auth-form').hidden=true;return;}
    displayGate('Checking your saved session...');
    setSession(savedSession());
    if(!session){displayGate('Sign in to continue.');focusEmail();return;}
    try {
      if((session.expires_at||0)<Math.floor(Date.now()/1000)+75) await refreshSession();
      await checkMembership(session.access_token);
      enterApp();
    } catch(error){
      if(error.network){ // offline or Supabase unreachable: keep the saved session, let the person retry
        displayGate(error.message);
        const retry=document.createElement('button');retry.type='button';retry.textContent='Retry';retry.className='ks-auth-retry';
        retry.onclick=()=>{retry.remove();init();};
        gate.querySelector('.ks-auth-card').append(retry);
        return;
      }
      setSession(null);displayGate(error.message||'Please sign in again');focusEmail();
    }
  }
  function focusEmail(){setTimeout(()=>gate?.querySelector('#ks-auth-email')?.focus(),30);}
  function enterApp(){
    signedInOnce=true;loggedOut=false;resolveReady();hideGate();
    document.documentElement.dataset.ksAuth='ok';
    const so=document.querySelector('#ks-office-signout');if(so)so.dataset.authenticated='true';
    connectRealtime();
  }
  // Another tab signed in/out or refreshed the token: stay in sync.
  window.addEventListener('storage',event=>{
    if(event.key!==sessionKey)return;
    const next=savedSession();
    if(next?.access_token){session=next;pushRealtimeToken();if(!signedInOnce&&configured){checkMembership(next.access_token).then(enterApp).catch(()=>{});}}
    else if(signedInOnce&&!loggedOut){loggedOut=true;closeRealtime();location.reload();}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)closeRealtime();else if(session)connectRealtime();});
  window.OfficeSupabase={isConfigured:configured,realtimeConnected:()=>realtimeJoined,signOut:()=>document.querySelector('#ks-office-signout')?.click(),onChange:handler=>window.addEventListener('ks:supabase-change',handler)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
