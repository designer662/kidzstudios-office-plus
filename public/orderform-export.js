/* Office Plus V82: reliable PNG export for both Job Sheets.
   Primary: html2canvas (if loaded). Fallback: native SVG foreignObject rasterization.
   No server upload, no external capture dependency required for the fallback. */
(() => {
  'use strict';
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // Browser-native fallback: paint computed DOM geometry straight onto Canvas.
  // Avoids SVG foreignObject, which taints Canvas in Chromium and blocks PNG saves.
  const visible = style => style.display!=='none' && style.visibility!=='hidden' && Number(style.opacity||1)>0;
  const fontSize = style => Number.parseFloat(style.fontSize)||14;
  const cssColor = (value) => value && value!=='transparent' && value!=='rgba(0, 0, 0, 0)' && value!=='#00000000';
  function rectPath(ctx,rect,radius) {
    const r=Math.max(0,Math.min(radius||0,rect.width/2,rect.height/2));
    ctx.beginPath();
    if(r&&typeof ctx.roundRect==='function')ctx.roundRect(rect.left,rect.top,rect.width,rect.height,r);
    else ctx.rect(rect.left,rect.top,rect.width,rect.height);
  }
  function drawDecor(ctx,element,style) {
    const rect=element.getBoundingClientRect();
    if(!rect.width||!rect.height)return;
    const background=style.backgroundColor;
    const radius=Number.parseFloat(style.borderTopLeftRadius)||0;
    if(cssColor(background)){
      ctx.fillStyle=background;
      rectPath(ctx,rect,radius);ctx.fill();
    }
    for (const [side,start,end] of [
      ['Top','left','right'],['Bottom','left','right'],['Left','top','bottom'],['Right','top','bottom']
    ]) {
      const width=Number.parseFloat(style[`border${side}Width`]);
      const color=style[`border${side}Color`];
      const kind=style[`border${side}Style`];
      if(!(width>0)||kind==='none'||!cssColor(color))continue;
      ctx.strokeStyle=color;ctx.lineWidth=width;
      ctx.beginPath();
      if(side==='Top'){ctx.moveTo(rect.left,rect.top+width/2);ctx.lineTo(rect.right,rect.top+width/2)}
      else if(side==='Bottom'){ctx.moveTo(rect.left,rect.bottom-width/2);ctx.lineTo(rect.right,rect.bottom-width/2)}
      else if(side==='Left'){ctx.moveTo(rect.left+width/2,rect.top);ctx.lineTo(rect.left+width/2,rect.bottom)}
      else {ctx.moveTo(rect.right-width/2,rect.top);ctx.lineTo(rect.right-width/2,rect.bottom)}
      ctx.stroke();
    }
  }
  function textStyle(ctx,style){
    const size=fontSize(style);
    ctx.font=`${style.fontStyle||'normal'} ${style.fontWeight||'400'} ${size}px ${style.fontFamily||'Arial'}`;
    ctx.fillStyle=cssColor(style.color)?style.color:'#222';
    ctx.textAlign='left';ctx.textBaseline='alphabetic';
  }
  function lineBaseline(rect,size){return rect.top+Math.max(size*.84,(rect.height-size)/2+size*.86)}
  function drawTextNode(ctx,node,style){
    const text=node.nodeValue||'';
    if(!text.trim())return;
    textStyle(ctx,style);
    const range=document.createRange();
    const token=/\S+/gu;
    for(const match of text.matchAll(token)){
      let rendered=match[0];
      if(style.textTransform==='uppercase')rendered=rendered.toUpperCase();
      if(style.textTransform==='lowercase')rendered=rendered.toLowerCase();
      range.setStart(node,match.index);range.setEnd(node,match.index+match[0].length);
      const rects=range.getClientRects();
      if(!rects.length)continue;
      let r=rects[0];
      // split text fragments at wrap boundaries when the browser reports multiple rects.
      ctx.fillText(rendered,r.left,lineBaseline(r,fontSize(style)));
    }
    range.detach?.();
  }
  function drawField(ctx,element,style){
    if(element.type==='hidden'||element.type==='file')return;
    const rect=element.getBoundingClientRect();
    if(!rect.width||!rect.height)return;
    if(element.type==='checkbox'||element.type==='radio'){
      textStyle(ctx,style);
      const glyph=element.checked?'☑':'☐';
      ctx.fillText(glyph,rect.left,lineBaseline(rect,fontSize(style)));
      return;
    }
    const text=element.value||'';
    if(!text)return;
    textStyle(ctx,style);
    const left=rect.left+(Number.parseFloat(style.paddingLeft)||0)+(Number.parseFloat(style.borderLeftWidth)||0);
    const right=rect.right-(Number.parseFloat(style.paddingRight)||0);
    const measured=ctx.measureText(text).width;
    const align=style.textAlign;
    const x=align==='center'?rect.left+(rect.width-measured)/2:align==='right'?right-measured:left;
    ctx.save();ctx.beginPath();ctx.rect(rect.left,rect.top,rect.width,rect.height);ctx.clip();
    ctx.fillText(text,x,lineBaseline(rect,fontSize(style)));ctx.restore();
  }
  function drawImage(ctx,img){
    if(!img.complete||!img.naturalWidth||!img.naturalHeight)return;
    const rect=img.getBoundingClientRect();
    if(!rect.width||!rect.height)return;
    const style=getComputedStyle(img),fit=style.objectFit;
    let sw=img.naturalWidth,sh=img.naturalHeight;
    let dw=rect.width,dh=rect.height,dx=rect.left,dy=rect.top;
    if(fit==='contain'||fit==='cover'||fit==='scale-down'){
      const factor=(fit==='cover'?Math.max:Math.min)(dw/sw,dh/sh);
      const w=sw*factor,h=sh*factor;
      dx=rect.left+(dw-w)/2;dy=rect.top+(dh-h)/2;dw=w;dh=h;
    }
    ctx.save();ctx.beginPath();ctx.rect(rect.left,rect.top,rect.width,rect.height);ctx.clip();
    try{ctx.drawImage(img,dx,dy,dw,dh);}catch(_){}
    ctx.restore();
  }
  async function nativeCapture(sheet,scale){
    // Wait for uploaded mockup/logo images to settle before rendering.
    const images=[...sheet.querySelectorAll('img')];
    await Promise.all(images.map(image=>{
      if(image.complete)return Promise.resolve();
      return Promise.race([
        new Promise(resolve=>{image.addEventListener('load',resolve,{once:true});image.addEventListener('error',resolve,{once:true});}),sleep(2500)
      ]);
    }));
    const bounds=sheet.getBoundingClientRect();
    const width=Math.ceil(Math.max(sheet.offsetWidth,sheet.scrollWidth,bounds.width));
    const height=Math.ceil(Math.max(sheet.offsetHeight,sheet.scrollHeight,bounds.height));
    if(!width||!height)throw new Error('Job Sheet has no visible content.');
    const canvas=document.createElement('canvas');
    canvas.width=Math.ceil(width*scale);canvas.height=Math.ceil(height*scale);
    const ctx=canvas.getContext('2d');
    if(!ctx)throw new Error('Canvas PNG export is unavailable in this browser.');
    ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.setTransform(scale,0,0,scale,-bounds.left*scale,-bounds.top*scale);
    function paint(node){
      if(node.nodeType===Node.TEXT_NODE){
        const parent=node.parentElement;
        if(parent)drawTextNode(ctx,node,getComputedStyle(parent));
        return;
      }
      if(node.nodeType!==Node.ELEMENT_NODE)return;
      const element=node;
      const style=getComputedStyle(element);
      if(!visible(style))return;
      ctx.save();
      if(style.opacity&&Number(style.opacity)<1)ctx.globalAlpha*=Number(style.opacity);
      drawDecor(ctx,element,style);
      if(element instanceof HTMLImageElement){drawImage(ctx,element);ctx.restore();return;}
      if(element instanceof HTMLInputElement||element instanceof HTMLTextAreaElement){drawField(ctx,element,style);ctx.restore();return;}
      if(element instanceof HTMLCanvasElement){try{ctx.drawImage(element,element.getBoundingClientRect().left,element.getBoundingClientRect().top);}catch(_){};ctx.restore();return;}
      for(const child of element.childNodes)paint(child);
      ctx.restore();
    }
    paint(sheet);
    ctx.setTransform(1,0,0,1,0,0);
    // Fail clearly if an externally hosted image taints the canvas.
    canvas.toDataURL('image/png');
    return canvas;
  }
  async function capture(sheet, options={}) {
    if (!sheet) throw new Error('Job Sheet was not found.');
    const scale=Math.min(3,Math.max(1,Number(options.scale)||2));
    if (document.fonts?.ready) await Promise.race([document.fonts.ready,sleep(2000)]);
    if (typeof window.html2canvas === 'function') {
      try {
        return await window.html2canvas(sheet,{
          scale,useCORS:true,allowTaint:false,backgroundColor:'#fff',logging:false,
          width:sheet.offsetWidth,height:sheet.offsetHeight,
          windowWidth:sheet.offsetWidth,windowHeight:sheet.offsetHeight,
          imageTimeout:10000,
          onclone:doc=>{doc.querySelector('#jobSheetForm')?.classList.add('export-mode');}
        });
      } catch(error) { console.warn('html2canvas export failed; using native PNG renderer:',error); }
    }
    return nativeCapture(sheet,scale);
  }
  async function download(canvas, filename) {
    if (!canvas) throw new Error('Preview the Job Sheet before downloading.');
    const safeName=String(filename||'JobSheet.png').replace(/[\\/:*?"<>|]/g,'_').slice(0,120);
    const blob=await new Promise((resolve,reject)=>{
      try{canvas.toBlob(result=>result?resolve(result):reject(new Error('PNG encoding failed.')),'image/png');}
      catch(error){reject(error);}
    });
    const url=URL.createObjectURL(blob);
    try {
      const a=document.createElement('a');a.href=url;a.download=safeName.endsWith('.png')?safeName:`${safeName}.png`;
      a.style.display='none';document.body.appendChild(a);a.click();a.remove();
    } finally {setTimeout(()=>URL.revokeObjectURL(url),30000);}
    return blob.size;
  }
  window.KSOrderformExporter={capture,download,nativeCapture};
})();
