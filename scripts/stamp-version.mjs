// Release version is centralized here; GitHub Actions adds its monotonic run number.
// Modifies only footer text; dashboard sync status and page content stay intact.
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const {release}=JSON.parse(readFileSync('office-release.json','utf8'));
if(!Number.isInteger(release)||release<=0)throw Error('Invalid release version');
const run=String(process.env.GITHUB_RUN_NUMBER||'').trim();
if(run&&!/^\d+$/.test(run))throw Error('Invalid GitHub Actions run number');
const label=`v${release}${run?'.'+run:''}`;
const pages=readdirSync('public').filter(name=>name.endsWith('.html'));
let updated=0;
for(const name of pages){
 const path=join('public',name);
 const html=readFileSync(path,'utf8');
 let count=0;
 const next=html.replace(/(<footer\b[^>]*class=["'][^"']*\bks-version-footer\b[^"']*["'][^>]*>)([\s\S]*?)(<\/footer>)/gi,(_whole,open,content,close)=>{
  count++;
  if(/class=["'][^"']*\bks-build-label\b/.test(content)){
   content=content.replace(/(<span\b[^>]*class=["'][^"']*\bks-build-label\b[^"']*["'][^>]*>)[\s\S]*?(<\/span>)/i,(_m,a,b)=>a+label+' · 3D'+b);
   return open+content+close;
  }
  return open+label+close;
 });
 if(count!==1)throw Error(`${name} has ${count} version footers; expected 1`);
 writeFileSync(path,next);
 updated++;
}
console.log(`Stamped ${updated} HTML footer versions: ${label}`);
