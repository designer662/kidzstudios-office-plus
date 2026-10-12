/* V86.3 compact office room navigation; reuses existing OfficeSuite and 3D APIs. */
(()=>{
 'use strict';
 const picker=document.getElementById('ksRoomJump');
 if(!picker)return;
 const map={workspace:'workspace',showroom:'showroom',store:'store',surau:'surau',toilets:'toilets',pantry:'pantry'};
 picker.addEventListener('change',()=>{
  const id=map[picker.value];
  if(!id)return;
  window.OfficeSuite?.selectRoom?.(id);
  window.office3d?.focusRoom?.(id);
  picker.value='';
 });
})();
