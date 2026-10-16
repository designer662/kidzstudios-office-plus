// Browser acceptance test: isolated front-end with deterministic mocked read-only APIs.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {chromium} from '../source/node_modules/playwright/index.mjs';
const get=name=>readFileSync('public/'+name,'utf8');
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const clean=get('report.html').replace(/<script\b[^>]*src=["'][^"']+["'][^>]*><\/script>/gi,'').replace(/<link\b[^>]*>/gi,'');
 await page.setContent(clean);
 await page.addStyleTag({content:get('suite-header-v61.css')+'\n'+get('report.css')});
 await page.evaluate(()=>{
  const store=new Map();
  Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)}});
  window.KSNotificationSound={play:()=>{}};
  const jobs=[
    {jobsheetFiles:'KS-A',customer:'Alpha',designer:'AFIQ',item:'Jersey',priority:'urgent',orderDate:'2026-10-01',deliveryTime:'2026-10-04',currentDepartment:'DESIGN',invoiceAmount:'100',paid:'40',balance:'60'},
    {jobsheetFiles:'KS-B',customer:'Beta',item:'Banner',orderDate:'2026-10-05',currentDepartment:'COMPLETED',invoiceAmount:'250',paid:'250',balance:'0'},
    {jobsheetFiles:'KS-C',customer:'=INJECT',item:'Poster',orderDate:'2025-09-03',currentDepartment:'PRODUCTION',invoiceAmount:'70',paid:'0',balance:'70'}
  ];
  window.fetch=async url=>new Response(JSON.stringify(String(url).includes('events')?{events:[{id:3,title:'Saved',message:'Job data updated',eventType:'job_management_updated',createdAt:new Date().toISOString()}]}:{version:2,payload:{savedAt:Date.now(),jobs}}),{status:200,headers:{'Content-Type':'application/json'}});
 });
 for(const name of ['job-rules.js','office-workbook.js','report-data.js','suite-header.js','report.js'])await page.addScriptTag({content:get(name)});
 await page.waitForFunction(()=>document.querySelector('#kpiTotal')?.textContent==='3');
 assert.equal(await page.locator('#kpiInvoice').innerText(),'RM 420.00');
 assert.equal(await page.locator('.ks-home-pill').count(),1);
 assert.equal(await page.locator('.tool-nav-btn[href="report.html"]').count(),1);
 await page.locator('#reportYear').selectOption('2026');
 assert.equal(await page.locator('#kpiTotal').innerText(),'2');
 await page.locator('#reportSearch').fill('AFIQ');
 assert.equal(await page.locator('#kpiTotal').innerText(),'1');
 await page.locator('#reportSearch').fill('');
 await page.locator('#notificationBtn').click();
 assert.equal(await page.locator('#notificationList .notification-item').count(),1);
 await page.locator('#notificationClearBtn').click();
 assert.equal(await page.locator('#notificationList .notification-item').count(),0);
 await page.locator('#reportYear').selectOption('all');
 const promise=page.waitForEvent('download');await page.locator('#exportReport').click();
 const download=await promise;assert.match(download.suggestedFilename(),/kidzstudios-job-report/);
 const {readFileSync:read}=await import('node:fs');assert.match(read(await download.path(),'utf8'),/'=INJECT/);
 const excelEvent=page.waitForEvent('download');await page.locator('#exportReportExcel').click();
 const xlsx=await excelEvent;assert.match(xlsx.suggestedFilename(),/kidzstudios-job-report-.*\.xlsx$/);
 const workbook=readFileSync(await xlsx.path());assert.equal(workbook.readUInt32LE(0),0x04034b50,'Excel report must be a real XLSX ZIP workbook');
 assert.ok(workbook.length>1500,'Excel report must not be an empty placeholder');
 assert.match(await page.locator('#reportStatusText').innerText(),/XLSX download requested/);
 await page.setViewportSize({width:390,height:844});
 const dims=await page.evaluate(()=>({width:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 assert.ok(dims.width<=dims.client+1,`Mobile horizontal overflow: ${JSON.stringify(dims)}`);
 assert.deepEqual(errors,[]);
 console.log('PASS V86.51 Chromium: reports totals, filters, CSV download safety, shared notifications/clear, Home and Report pill, mobile layout, zero runtime errors.');
}finally{await browser?.close()}
