// Release version is centralized here; GitHub Actions adds its monotonic run number.
// Updates release footers and local CSS/JS cache keys so browsers do not keep old 3D assets.
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const {release}=JSON.parse(readFileSync('office-release.json','utf8'));
if(!/^[1-9]\d*(?:\.\d+)?$/.test(String(release)))throw Error('Invalid release version');
const run=String(process.env.GITHUB_RUN_NUMBER||'').trim();
if(run&&!/^\d+$/.test(run))throw Error('Invalid GitHub Actions run number');
const assetTag=`${release}${run?'.'+run:''}`;
const label=`v${assetTag}`;
const pages=readdirSync('public').filter(name=>name.endsWith('.html'));
let updated=0;
for(const name of pages){
 const path=join('public',name);
 const html=readFileSync(path,'utf8');
 let count=0;
 let next=html.replace(/(<footer\b[^>]*class=["'][^"']*\bks-version-footer\b[^"']*["'][^>]*>)([\s\S]*?)(<\/footer>)/gi,(_whole,open,content,close)=>{
  count++;
  if(/class=["'][^"']*\bks-build-label\b/.test(content)){
   content=content.replace(/(<span\b[^>]*class=["'][^"']*\bks-build-label\b[^"']*["'][^>]*>)[\s\S]*?(<\/span>)/i,(_m,a,b)=>a+label+' · 3D'+b);
   return open+content+close;
  }
  return open+label+close;
 });
 if(count!==1)throw Error(`${name} has ${count} version footers; expected 1`);
 // Rewrite only literal local stylesheet/script file references in actual tags.
 // Do not touch external URLs, navigation links, inline application state, or APIs.
 next=next.replace(/<(?:script|link)\b[^>]*>/gi,tag=>tag.replace(/(\b(?:src|href)=["'])([^"']+)(["'])/gi,(all,prefix,url,close)=>{
   if(/^(?:https?:|\/\/|data:)/i.test(url))return all;
   const [pathname,query='']=url.split('?');
   if(!/\.(?:js|css)$/i.test(pathname))return all;
   const params=new URLSearchParams(query.replace(/&amp;/g,'&'));
   params.set('v',assetTag);
   return prefix+pathname+'?'+params.toString().replace(/&/g,'&amp;')+close;
 }));
 writeFileSync(path,next);
 updated++;
}
console.log(`Stamped ${updated} HTML footer versions: ${label}`);
