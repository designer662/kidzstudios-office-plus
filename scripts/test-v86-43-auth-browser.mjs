// Real-browser regression: Supabase offline retry must reuse the login modal.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {chromium} from '../source/node_modules/playwright/index.mjs';
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox']});
 const page=await browser.newPage(),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.setContent('<!doctype html><html><head></head><body><main>Protected app</main></body></html>');
 await page.evaluate(()=>{
   window.KS_SUPABASE_CONFIG={url:'https://demo-project.supabase.co',publishableKey:'sb_publishable_test'};
   const authKey='ks-office-auth:https://demo-project.supabase.co';
   const store=new Map([[authKey,JSON.stringify({access_token:'mocktoken',refresh_token:'refresh',expires_at:Math.floor(Date.now()/1000)+3600})]]);
   Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)}});
   window.__memberChecks=0;
   window.fetch=async url=>{
     if(String(url).includes('/rpc/ks_is_office_member')){
       window.__memberChecks++;
       if(window.__memberChecks===1)throw Error('Offline simulation');
       return new Response(JSON.stringify(true),{status:200});
     }
     return new Response('{}',{status:404});
   };
 });
 await page.addScriptTag({content:readFileSync('public/supabase-bridge.js','utf8')});
 await page.locator('.ks-auth-retry').waitFor();
 assert.equal(await page.locator('#ks-auth-gate').count(),1);
 assert.equal(await page.locator('#ks-office-signout').count(),1);
 await page.locator('.ks-auth-retry').click();
 await page.waitForFunction(()=>document.documentElement.dataset.ksAuth==='ok');
 assert.equal(await page.locator('#ks-auth-gate').count(),1,'Retry must not create duplicate gates');
 assert.equal(await page.locator('#ks-office-signout').count(),1,'Retry must not create duplicate signout controls');
 assert.equal(await page.locator('#ks-auth-gate').evaluate(el=>el.hidden),true,'Gate must close after successful retry');
 assert.equal(await page.evaluate(()=>window.__memberChecks),2);
 assert.deepEqual(errors,[],'Browser must have zero uncaught exceptions');
 console.log('PASS V86.43 browser auth retry: offline, Retry, authenticated gate, one overlay, one signout, no runtime errors.');
}finally{await browser?.close()}
