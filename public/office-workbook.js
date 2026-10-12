/* Office Plus workbook bridge: self-contained XLSX read/write, no CDN and no server upload.
   ZIP method 0/8 read, method 0 write. Workbook values are never evaluated as formulas. */
(() => {
  'use strict';
  const enc=new TextEncoder(), dec=new TextDecoder();
  const E=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  const byName=(node,name)=>[...node.getElementsByTagName('*')].filter(n=>n.localName===name);
  const first=(node,name)=>byName(node,name)[0]||null;
  const xml=text=>{const doc=new DOMParser().parseFromString(text,'application/xml');if(doc.querySelector('parsererror'))throw Error('Invalid Excel workbook XML');return doc};
  const dateFields=new Set([10,11,12,20,26]);
  const moneyFields=new Set([21,22,23]);
  const dayFields=new Set([13,25]);
  const serialToDate=n=>{const dt=new Date(Math.round((Number(n)-25569)*86400000));return Number.isFinite(dt.getTime())?dt.toISOString().slice(0,10):''};
  const dateToSerial=s=>{const m=String(s||'').trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?(Date.UTC(+m[1],+m[2]-1,+m[3])/86400000+25569):null};
  const colNum=label=>{let n=0;for(const c of String(label).toUpperCase()){if(c<'A'||c>'Z')break;n=n*26+c.charCodeAt(0)-64}return n-1};
  const colLabel=i=>{let s='';for(i++;i>0;i=Math.floor((i-1)/26))s=String.fromCharCode(65+(i-1)%26)+s;return s};
  const crcTable=Uint32Array.from({length:256},(_,i)=>{let c=i;for(let j=0;j<8;j++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0});
  const crc32=b=>{let c=0xffffffff;for(const v of b)c=crcTable[(c^v)&255]^(c>>>8);return(c^0xffffffff)>>>0};
  const U16=(v,n,x)=>v.setUint16(n,x,true),U32=(v,n,x)=>v.setUint32(n,x,true);
  function zip(entries){
    const output=[],central=[];let offset=0;
    for(const [filename,content] of entries){
      const name=enc.encode(filename),raw=typeof content==='string'?enc.encode(content):content,crc=crc32(raw);
      const a=new Uint8Array(30+name.length),d=new DataView(a.buffer);
      U32(d,0,0x04034b50);U16(d,4,20);U16(d,6,0x800);U16(d,8,0);U32(d,14,crc);U32(d,18,raw.length);U32(d,22,raw.length);U16(d,26,name.length);a.set(name,30);
      output.push(a,raw);
      const b=new Uint8Array(46+name.length),v=new DataView(b.buffer);
      U32(v,0,0x02014b50);U16(v,4,20);U16(v,6,20);U16(v,8,0x800);U16(v,10,0);U32(v,16,crc);U32(v,20,raw.length);U32(v,24,raw.length);U16(v,28,name.length);U32(v,42,offset);b.set(name,46);central.push(b);
      offset+=a.length+raw.length;
    }
    const centralLength=central.reduce((s,a)=>s+a.length,0),end=new Uint8Array(22),dv=new DataView(end.buffer);
    U32(dv,0,0x06054b50);U16(dv,8,central.length);U16(dv,10,central.length);U32(dv,12,centralLength);U32(dv,16,offset);
    return new Blob([...output,...central,end],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  }
  function makeXlsx(headers,rows,{sheetName='Jobs'}={}){
    if(!headers.length)throw Error('Cannot export workbook without headers');
    const all=[headers,...rows];
    const cell=(val,r,c)=>{
      if(val===null||val===undefined||val==='')return '';
      const ref=`${colLabel(c)}${r}`;
      if(r>1&&dateFields.has(c)){
        const date=dateToSerial(val);
        if(date!==null)return `<c r="${ref}" s="2"><v>${date}</v></c>`;
      }
      if(r>1&&(moneyFields.has(c)||dayFields.has(c))&&String(val).trim()!==''&&Number.isFinite(Number(val))){
        return `<c r="${ref}" s="${moneyFields.has(c)?3:4}"><v>${Number(val)}</v></c>`;
      }
      const str=String(val).slice(0,32000);
      return `<c r="${ref}"${r===1?' s="1"':''} t="inlineStr"><is><t xml:space="preserve">${E(str)}</t></is></c>`;
    };
    const sheet=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:${colLabel(headers.length-1)}${all.length}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="17"/><cols>${headers.map((h,i)=>`<col min="${i+1}" max="${i+1}" width="${Math.min(34,Math.max(13,String(h).length+4))}" customWidth="1"/>`).join('')}</cols><sheetData>${all.map((vals,i)=>`<row r="${i+1}"${i===0?' ht="26" customHeight="1"':''}>${headers.map((_,j)=>cell(vals[j],i+1,j)).join('')}</row>`).join('')}</sheetData><autoFilter ref="A1:${colLabel(headers.length-1)}${all.length}"/></worksheet>`;
    const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="yyyy-mm-dd"/></numFmts><fonts count="2"><font><sz val="11"/><name val="Aptos"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF29343A"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="1" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="1" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs></styleSheet>`;
    const types=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`;
    const rels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;
    const wb=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${E(sheetName.slice(0,31))}" sheetId="1" r:id="rId1"/></sheets></workbook>`;
    const wrels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
    return zip([['[Content_Types].xml',types],['_rels/.rels',rels],['xl/workbook.xml',wb],['xl/_rels/workbook.xml.rels',wrels],['xl/styles.xml',styles],['xl/worksheets/sheet1.xml',sheet]]);
  }
  async function extractZip(blob){
    const bytes=new Uint8Array(await blob.arrayBuffer()),v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
    let eocd=-1;for(let i=bytes.length-22;i>=Math.max(0,bytes.length-66000);i--)if(v.getUint32(i,true)===0x06054b50){eocd=i;break}
    if(eocd<0)throw Error('Not a valid XLSX ZIP file');
    const count=v.getUint16(eocd+10,true),offset=v.getUint32(eocd+16,true),files=new Map();
    if(count>1000)throw Error('Workbook contains too many files');
    let pos=offset;
    for(let i=0;i<count;i++){
      if(pos+46>bytes.length||v.getUint32(pos,true)!==0x02014b50)throw Error('Invalid XLSX directory');
      const flags=v.getUint16(pos+8,true),method=v.getUint16(pos+10,true),size=v.getUint32(pos+20,true),n=v.getUint16(pos+28,true),extra=v.getUint16(pos+30,true),comment=v.getUint16(pos+32,true),local=v.getUint32(pos+42,true);
      if(flags&1)throw Error('Password-protected Excel files are not supported');
      if(size>20_000_000)throw Error('Worksheet exceeds safe size limit');
      const name=dec.decode(bytes.subarray(pos+46,pos+46+n));
      if(local+30>bytes.length||v.getUint32(local,true)!==0x04034b50)throw Error('Invalid XLSX entry');
      const start=local+30+v.getUint16(local+26,true)+v.getUint16(local+28,true);
      if(start+size>bytes.length)throw Error('Truncated workbook entry');
      files.set(name,{method,raw:bytes.slice(start,start+size)});
      pos+=46+n+extra+comment;
    }
    const get=async name=>{
      const entry=files.get(name);if(!entry)return null;
      if(entry.method===0)return dec.decode(entry.raw);
      if(entry.method!==8)throw Error('Unsupported Excel compression method');
      if(!('DecompressionStream' in window))throw Error('Your browser cannot decompress XLSX files; use the latest Chrome or Edge');
      const raw=await new Response(new Blob([entry.raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer();
      if(raw.byteLength>32_000_000)throw Error('Excel worksheet too large');
      return dec.decode(raw);
    };
    return{get,has:n=>files.has(n)};
  }
  const pathJoin=(base,target)=>{
    if(target.startsWith('/'))return target.slice(1);
    const segments=[...base.split('/').slice(0,-1),...target.split('/')],parts=[];
    for(const s of segments){if(s==='..')parts.pop();else if(s&&s!=='.')parts.push(s)}return parts.join('/');
  };
  async function readXlsx(file){
    if(file.size>12_000_000)throw Error('Choose an XLSX smaller than 12 MB');
    const archive=await extractZip(file),wbText=await archive.get('xl/workbook.xml');
    if(!wbText)throw Error('Excel workbook metadata missing');
    const wb=xml(wbText),relsText=await archive.get('xl/_rels/workbook.xml.rels'),relations=new Map();
    if(relsText)for(const r of byName(xml(relsText),'Relationship'))relations.set(r.getAttribute('Id'),r.getAttribute('Target'));
    const stringsText=await archive.get('xl/sharedStrings.xml'),strings=stringsText?byName(xml(stringsText),'si').map(si=>byName(si,'t').map(n=>n.textContent||'').join('')):[];
    const sheets=byName(wb,'sheet');
    if(!sheets.length)throw Error('Workbook has no worksheets');
    let firstValid=null;
    for(let sheetIndex=0;sheetIndex<Math.min(8,sheets.length);sheetIndex++){
      const sh=sheets[sheetIndex];const rid=sh.getAttribute('r:id')||sh.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships','id');
      const target=relations.get(rid)||`worksheets/sheet${sheetIndex+1}.xml`,name=pathJoin('xl/workbook.xml',target),sheetXml=await archive.get(name);
      if(!sheetXml)continue;
      const doc=xml(sheetXml),rows=[];
      for(const row of byName(doc,'row')){
        if(rows.length>10003)throw Error('Workbook has too many rows');
        const rowIndex=Number(row.getAttribute('r')||rows.length+1);
        if(rowIndex>15000)throw Error('Workbook row range is too large');
        while(rows.length<rowIndex-1)rows.push([]);
        const vals=[];
        for(const cell of [...row.children].filter(c=>c.localName==='c')){
          const ref=cell.getAttribute('r')||'',col=colNum(ref.match(/^[A-Z]+/i)?.[0]||'A');
          if(col<0||col>100)continue;
          const type=cell.getAttribute('t'),value=first(cell,'v')?.textContent||'',inline=first(cell,'is');
          let data=type==='s'?strings[Number(value)]??'':type==='inlineStr'?byName(inline||cell,'t').map(n=>n.textContent||'').join(''):value;
          if((type===null||type==='n')&&dateFields.has(col)&&/^\d{5}(?:\.\d+)?$/.test(data))data=serialToDate(data);
          vals[col]=data;
        }
        rows.push(vals);
      }
      const header=rows.findIndex(r=>r.map(x=>String(x||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()).includes('jobsheet files'));
      if(header>=0&&header<12){firstValid={headers:rows[header],rows:rows.slice(header+1),sheetName:sh.getAttribute('name')||'Sheet'};break}
      if(!firstValid&&rows.length)firstValid={headers:rows[0],rows:rows.slice(1),sheetName:sh.getAttribute('name')||'Sheet'};
    }
    if(!firstValid)throw Error('No readable worksheets found');
    return firstValid;
  }
  window.KSOfficeWorkbook=Object.freeze({makeXlsx,readXlsx});
})();
