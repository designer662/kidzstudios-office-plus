(() => {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  const app = $('#app');
  const svg = $('#officeSvg');
  const camera = $('#camera');
  const modelRotator = $('#modelRotator');
  const baseLayer = $('#officeBase');
  const roomsLayer = $('#roomsLayer');
  const furnitureLayer = $('#furnitureLayer');
  const wallsLayer = $('#wallsLayer');
  const labelsLayer = $('#labelsLayer');
  const employeesLayer = $('#employeesLayer');
  const bubblesLayer = $('#bubblesLayer');
  const tooltip = $('#tooltip');
  const profileCard = $('#profileCard');
  const contextCard = $('#contextCard');
  const deptNav = $('#deptNav');
  const activityList = $('#activityList');
  const todayPanel = $('#todayPanel');
  const livePanel = $('#livePanel');
  const expandLiveBtn = $('#expandLiveBtn');
  const collapseLiveBtn = $('#collapseLiveBtn');
  const hideLiveBtn = $('#hideLiveBtn');
  const liveReopenBtn = $('#liveReopenBtn');
  const livePanelHeader = $('#livePanelHeader');
  const rotateLeftBtn = $('#rotateLeft');
  const rotateRightBtn = $('#rotateRight');
  const rotationReadout = $('#rotationReadout');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const opsSource = $('#opsSource');
  const opsSourceDot = $('#opsSourceDot');
  const opsRefreshBtn = $('#opsRefresh');
  const jobLinkSettingsBtn = $('#jobLinkSettingsBtn');
  const jobLinkModal = $('#jobLinkModal');
  const jobLinkInput = $('#jobLinkInput');
  const jobLinkHelp = $('#jobLinkHelp');
  const jobLinkSave = $('#jobLinkSave');
  const jobLinkReset = $('#jobLinkReset');
  const jobLinkClose = $('#jobLinkClose');
  const workloadList = $('#workloadList');
  const workloadTotal = $('#workloadTotal');
  const followChip=$('#followChip'),followChipName=$('#followChipName'),followChipStop=$('#followChipStop');
  const recentJobs = $('#recentJobs');
  const jobsFilterLabel = $('#jobsFilterLabel');
  const opsNote = $('#opsNote');
  const opsLastSync = $('#opsLastSync');
  const opsSyncHealth = $('#opsSyncHealth');
  const opsTotalJobs = $('#opsTotalJobs');
  const opsActiveJobs = $('#opsActiveJobs');
  const opsCompletedToday = $('#opsCompletedToday');
  const opsDueToday = $('#opsDueToday');
  const opsPipelineBar = $('#opsPipelineBar');
  const opsDataAge = $('#opsDataAge');
  const opsReconcile = $('#opsReconcile');
  const opsUnmappedBtn = $('#opsUnmappedBtn');
  const opsDailySummary = $('#opsDailySummary');
  const opsAlerts = $('#opsAlerts');
  const opsStageHealth = $('#opsStageHealth');
  const opsStaffLoad = $('#opsStaffLoad');
  const opsMappingBtn = $('#opsMappingBtn');
  const stageMappingModal = $('#stageMappingModal');
  const stageMappingClose = $('#stageMappingClose');
  const stageMappingSave = $('#stageMappingSave');
  const stageMappingReset = $('#stageMappingReset');
  const stageOrdersInput = $('#stageOrdersInput');
  const stageArtworkInput = $('#stageArtworkInput');
  const stageProductionInput = $('#stageProductionInput');
  const stageCompletedInput = $('#stageCompletedInput');
  const stageMappingHelp = $('#stageMappingHelp');
  const liveLabel = $('#liveLabel');
  const staffDirectoryList = $('#staffDirectoryList');
  const addStaffBtn = $('#addStaffBtn');
  const staffEditorModal = $('#staffEditorModal');
  const staffEditorTitle = $('#staffEditorTitle');
  const staffEditorClose = $('#staffEditorClose');
  const staffNameInput = $('#staffNameInput');
  const staffRoleInput = $('#staffRoleInput');
  const staffDepartmentInput = $('#staffDepartmentInput');
  const staffEditorStatus = $('#staffEditorStatus');
  const staffSaveBtn = $('#staffSaveBtn');
  const staffRemoveBtn = $('#staffRemoveBtn');
  const driveLinkSettingsBtn = $('#driveLinkSettingsBtn');
  const driveLinkModal = $('#driveLinkModal');
  const driveLinkInput = $('#driveLinkInput');
  const driveLinkHelp = $('#driveLinkHelp');
  const driveLinkSave = $('#driveLinkSave');
  const driveLinkReset = $('#driveLinkReset');
  const driveLinkClose = $('#driveLinkClose');
  const googleDriveResource = $('#googleDriveResource');
  const opsExpandBtn = $('#opsExpandBtn');
  const officeChat = $('#officeChat');
  const chatLauncher = $('#chatLauncher');
  const chatCloseBtn = $('#chatCloseBtn');
  const chatClearBtn = $('#chatClearBtn');
  const chatMessages = $('#chatMessages');
  const chatSenderSelect = $('#chatSenderSelect');
  const chatInput = $('#chatInput');
  const chatSendBtn = $('#chatSendBtn');
  const chatUnread = $('#chatUnread');
  const notificationBtn = $('#notificationBtn');
  const notificationPanel = $('#notificationPanel');
  const notificationUnread = $('#notificationUnread');
  const notificationList = $('#notificationList');
  const notificationClearBtn = $('#notificationClearBtn');
  const notificationToast = $('#notificationToast');
  const workloadEditorModal = $('#workloadEditorModal');
  const workloadEditorTitle = $('#workloadEditorTitle');
  const workloadEditorClose = $('#workloadEditorClose');
  const workloadEditorAvatar = $('#workloadEditorAvatar');
  const workloadEditorName = $('#workloadEditorName');
  const workloadEditorRole = $('#workloadEditorRole');
  const workloadEditorInput = $('#workloadEditorInput');
  const workloadEditorStatus = $('#workloadEditorStatus');
  const workloadEditorSave = $('#workloadEditorSave');

  // Logical coordinates follow the reference plan in feet-like units.
  // Logical office geometry follows the supplied floor plan.
  const proj = { ox: 650, oy: 90, sx: 8.1, sy: 4.05 };

  const floorOutline = [
    { x: 5, y: 0 }, { x: 23, y: 0 }, { x: 23, y: 70 }, { x: 0, y: 70 },
    { x: 0, y: 36 }, { x: 5, y: 36 }, { x: 5, y: 0 }
  ];

  const stairOutline = [
    { x: 0, y: 1.3 }, { x: 5, y: 1.3 }, { x: 5, y: 8.2 }, { x: 0, y: 8.2 }
  ];

  const rooms = [
    { id: 'staff', name: 'Staff Spaces', dept: 'Creative Department', poly: [[5,0],[23,0],[23,24.4],[12.0,24.4],[12.0,24.0],[8.5,24.0],[8.5,24.4],[5,24.4]], tone:'#f8f7f4', kind:'staff' },
    { id: 'showroom', name: 'Show Room', dept: 'Sales and Marketing', poly: [[5,24.4],[23,24.4],[23,36],[11.6,36],[11.6,35.8],[8.5,35.8],[8.5,32.2],[5,32.2]], tone:'#f6f3ee', kind:'showroom' },
    { id: 'pantry', name: 'Pantry', dept: null, poly: [[0,36],[7.6,36],[7.6,56.1],[0,56.1]], tone:'#f1f4ef', kind:'pantry' },
    { id: 'boss', name: 'Boss Room', dept: 'Management', poly: [[11.6,36],[23,36],[23,47.9],[11.6,47.9]], tone:'#f5f0ea', kind:'office' },
    { id: 'store', name: 'Store', dept: 'Finance Department', poly: [[11.6,47.9],[23,47.9],[23,59.3],[11.6,59.3]], tone:'#f2f2ee', kind:'storage' },
    { id: 'toilet-a', name: 'Toilet', dept: null, poly: [[0,59.3],[3.8,59.3],[3.8,65.6],[0,65.6]], tone:'#eef1f2', kind:'restroom' },
    { id: 'toilet-b', name: 'Toilet', dept: null, poly: [[3.8,59.3],[7.6,59.3],[7.6,65.6],[3.8,65.6]], tone:'#eef1f2', kind:'restroom' },
    { id: 'entry', name: 'Entry', dept: null, poly: [[0,65.6],[7.6,65.6],[7.6,70],[0,70]], tone:'#f5f5f2', kind:'entry', hideLabel:true },
    { id: 'prayer', name: 'Prayer Room', dept: 'Management', poly: [[7.6,59.3],[23,59.3],[23,70],[7.6,70]], tone:'#f7f4ef', kind:'prayer' },
    { id: 'corridor', name: 'Corridor', dept: null, poly: [[7.6,36],[11.6,36],[11.6,59.3],[7.6,59.3]], tone:'#faf9f6', kind:'corridor', hideLabel:true },
    { id: 'stair', name: 'Stair', dept: null, poly: stairOutline.map(p=>[p.x,p.y]), tone:'#eeeae5', kind:'stair', hideLabel:true }
  ];
  const roomById = Object.fromEntries(rooms.map(r => [r.id, r]));

  const DEFAULT_EMPLOYEES = [
    { id:1,name:'Boss',department:'Management',position:'Boss',status:'At desk',homeRoom:'boss',roomId:'boss',x:13.7,y:40.3,deskId:'B01',deskLabel:'Boss Desk',deskX:13.7,deskY:40.3,currentJob:'',activity:'',lastActive:'',workload:[] },
    { id:2,name:'Cikda',department:'Management',position:'Boss Assistant',status:'At desk',homeRoom:'boss',roomId:'boss',x:22.1,y:43.95,deskId:'B02',deskLabel:'Boss Assistant Desk',deskX:22.1,deskY:43.95,currentJob:'',activity:'',lastActive:'',workload:[] },
    { id:3,name:'Afiq',department:'Creative Department',position:'Designer',status:'At desk',homeRoom:'staff',roomId:'staff',x:13.7,y:6.1,deskId:'D01',deskLabel:'Designer Desk 01',deskX:13.7,deskY:6.1,currentJob:'',activity:'',lastActive:'',workload:[] },
    { id:4,name:'Amirul',department:'Sales and Marketing',position:'Sales',status:'At desk',homeRoom:'staff',roomId:'staff',x:20.75,y:10.45,deskId:'S01',deskLabel:'Sales Desk 01',deskX:20.75,deskY:10.45,currentJob:'',activity:'',lastActive:'',workload:[] },
    { id:5,name:'Nisa',department:'Sales and Marketing',position:'Sales',status:'In a meeting',homeRoom:'staff',roomId:'showroom',x:17.3,y:29.3,deskId:'S02',deskLabel:'Sales Desk 02',deskX:13.7,deskY:14.8,currentJob:'',activity:'',lastActive:'',workload:[] },
    { id:6,name:'Lisa',department:'Production Management',position:'Admin',status:'At desk',homeRoom:'staff',roomId:'staff',x:13.7,y:10.45,deskId:'A01',deskLabel:'Admin Desk',deskX:13.7,deskY:10.45,currentJob:'',activity:'',lastActive:'',workload:[] },
    { id:7,name:'Minn',department:'Creative Department',position:'Designer',status:'At desk',homeRoom:'staff',roomId:'staff',x:20.75,y:6.1,deskId:'D02',deskLabel:'Designer Desk 02',deskX:20.75,deskY:6.1,currentJob:'',activity:'',lastActive:'',workload:[] },
    { id:8,name:'Athira',department:'Sales and Marketing',position:'Sales',status:'At desk',homeRoom:'staff',roomId:'staff',x:20.75,y:14.8,deskId:'S03',deskLabel:'Sales Desk 03',deskX:20.75,deskY:14.8,currentJob:'',activity:'',lastActive:'',workload:[] }
  ];

  let employees = DEFAULT_EMPLOYEES.map(e=>({...e,workload:[...(e.workload||[])]}));

  let employeeById = Object.fromEntries(employees.map(e=>[e.id,e]));
  const employeeNodes = new Map();
  const roomNodes = new Map();
  const roomLabelNodes = new Map();
  const staffDeskAssignments = [
    {deskId:'D01', employeeId:3, x:14.2, y:5.2, facing:'left'},
    {deskId:'D02', employeeId:7, x:17.4, y:5.2, facing:'right'},
    {deskId:'A01', employeeId:6, x:14.2, y:9.55, facing:'left'},
    {deskId:'S01', employeeId:4, x:17.4, y:9.55, facing:'right'},
    {deskId:'S02', employeeId:5, x:14.2, y:13.9, facing:'left'},
    {deskId:'S03', employeeId:8, x:17.4, y:13.9, facing:'right'}
  ];

  const deptOrder=['All','Creative Department','Sales and Marketing','Management','Production Management','Finance Department'];
  const deptRoom={'Creative Department':'staff','Sales and Marketing':'showroom','Management':'boss','Production Management':'staff','Finance Department':'store'};
  let deptCounts={};
  function rebuildEmployeeIndex(){
    employeeById=Object.fromEntries(employees.map(e=>[e.id,e]));
    deptOrder.forEach(d=>deptCounts[d]=d==='All'?employees.length:employees.filter(e=>e.department===d).length);
    renderChatSenders();
  }
  rebuildEmployeeIndex();
  let activityFeed=[];


  const DEFAULT_JOB_SHEET_URL='https://docs.google.com/spreadsheets/d/1ReoIszVRgyEzbnkq3MKM_Bn79Q1570PLQQvnRNEj3Eo/edit?gid=588550996#gid=588550996';
  const GLOBAL_CONFIG_SCOPE='config:global';
  const STAFF_DIRECTORY_SCOPE='office:staff';
  const DEFAULT_GOOGLE_DRIVE_URL='https://drive.google.com/drive/u/1/folders/1YRobFB1O2BKBFn9VEOYOwQE2VUlFXR8B';
  let googleDriveUrl=DEFAULT_GOOGLE_DRIVE_URL;
  let staffDirectoryVersion=0;
  let editingStaffId=null;
  let staffPollTimer=null;
  const CHAT_API='/api/chat';
  let chatPollTimer=null,chatInitialized=false,chatLastId=0,chatUnreadCount=0,chatOpen=false;
  const EVENTS_API='/api/events';
  const eventClientId=(globalThis.crypto?.randomUUID?.()||`office-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  let eventPollTimer=null,eventInitialized=false,lastEventId=0,notificationOpen=false,notificationUnreadCount=0,notificationToastTimer=null,editingWorkloadId=null,jobAutoTimer=null,jobSyncInFlight=false;
  let notifications=[];
  const workloadNoticeIds=new Set();
  let audioContext=null,audioArmed=false;
  let jobSheetUrl=DEFAULT_JOB_SHEET_URL;
  let jobDataSource='html';
  let jobSheetBase='https://docs.google.com/spreadsheets/d/1ReoIszVRgyEzbnkq3MKM_Bn79Q1570PLQQvnRNEj3Eo';
  let jobSheetGid='588550996';
  const LEGACY_DEMO_JOB_REFS=new Set(['KS-1044','KS-1045','KS-1046','KS-1047','KS-1048','KS-1049','KS-1050','KS-1051','KS-1052']);
  function isLegacyDemoJob(job){return LEGACY_DEMO_JOB_REFS.has(String(job?.ref||job?.jobsheetFiles||'').trim().toUpperCase())}
  const DEFAULT_STAGE_MAPPING={
    orders:['new order','order received','order','pending','quotation','quoted','confirmed','confirm','open','active'],
    artwork:['artwork','design','designing','mockup','proof','approval','revision','revise','customer approval','waiting approval'],
    production:['production','printing','print','press','heatpress','heat press','sew','sewing','embroidery','packing','finishing','ready','delivery','qc','quality check'],
    completed:['completed','complete','done','delivered','closed','finished']
  };
  let stageMapping=JSON.parse(JSON.stringify(DEFAULT_STAGE_MAPPING));
  let jobs=[],opsDataMode='empty',opsFilter='all',jobSharedVersion=0;
  let opsLastSyncAt=null,opsLastSyncSource='Waiting',clockTimer=null,lastOpsBriefHour='';

  function getOverviewCam(){
    // V13 reference framing: close architectural view while keeping the full plan readable.
    // Desktop framing is tuned to the supplied 1863 x 945 reference screenshot.
    if(innerWidth<650)return {scale:.92,tx:42,ty:34};
    if(innerWidth<920)return {scale:1.02,tx:55,ty:14};
    if(innerWidth<1280)return {scale:1.18,tx:20,ty:-8};
    if(innerWidth<1600)return {scale:1.42,tx:-18,ty:-34};
    return {scale:1.68,tx:-68,ty:-80};
  }
  let overviewCam=getOverviewCam();
  let activeDept='All',cam={...overviewCam},dragging=false,rotateDragging=false,dragMoved=false,suppressClickUntil=0,lastPointer=null,camAnim=null,viewMode='overview',followEmployeeId=null;
  let modelAngle=0,rotationAnim=null,activeRoomLabel=null,cameraFrame=null,followCameraFrame=null;
  let roamFrame=null,roamTimer=null,lastMotionStatsSecond=-1,workloadBubbleTimer=null;


  function el(name,attrs={}){const n=document.createElementNS(NS,name);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));return n}
  function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function iso(x,y,z=0){return{x:proj.ox+(x-y)*proj.sx,y:proj.oy+(x+y)*proj.sy-z}}
  function poly(ps){return ps.map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}
  function isoPoly(points,z=0){return points.map(([x,y])=>iso(x,y,z))}
  function initials(n){return n.split(/\s+/).map(v=>v[0]).slice(0,2).join('').toUpperCase()}
  function statusColor(s){return s==='At desk'?'#43a276':s==='In a meeting'?'#5687c6':s==='On break'?'#d99a38':'#ef7b45'}
  function bodyColor(d){return({'Management':'#727b84','Sales and Marketing':'#96796a','Creative Department':'#8e808c','Production Management':'#768d86','Finance Department':'#7d8977'})[d]||'#80888e'}
  function employeeClass(e){return e.status==='Walking'?'walking':e.status==='At desk'&&e.id%2===0?'busy':'idle'}
  function effectiveStatus(e){return e.motionWalking?'Walking':e.status}

  function hashString(value=''){
    const str=String(value);let h=2166136261;
    for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}
    return (h>>>0).toString(36);
  }
  function relativeEventTime(value){
    const t=new Date(value||Date.now()).getTime();if(!Number.isFinite(t))return'now';
    const sec=Math.max(0,Math.floor((Date.now()-t)/1000));if(sec<45)return'now';if(sec<3600)return`${Math.floor(sec/60)}m`;if(sec<86400)return`${Math.floor(sec/3600)}h`;return`${Math.floor(sec/86400)}d`;
  }
  function clockTime(value=Date.now()){
    const d=new Date(value);if(Number.isNaN(d.getTime()))return'--:--';
    return d.toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit',hour12:false});
  }
  function fullClockTime(value=Date.now()){
    const d=new Date(value);if(Number.isNaN(d.getTime()))return'--:--:--';
    return d.toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
  }
  function activityTypeLabel(type=''){
    const t=String(type||'').toLowerCase();
    if(t.includes('time_brief'))return'TIME';if(t.includes('sync'))return'SYSTEM';if(t.includes('workload'))return'WORKLOAD';if(t.includes('chat'))return'CHAT';if(t.includes('job'))return'JOB';
    if(t.includes('artwork')||t.includes('design')||t.includes('approval'))return'ARTWORK';
    if(t.includes('production'))return'PRODUCTION';if(t.includes('order'))return'ORDER';if(t.includes('staff'))return'STAFF';
    if(t.includes('presence')||t.includes('walk')||t.includes('desk')||t.includes('meeting')||t.includes('break'))return'PRESENCE';
    return'OFFICE';
  }
  function updateLiveClock(){if(liveLabel)liveLabel.textContent=`Live · ${clockTime()}`;renderFeed();renderNotifications();renderOpsSyncMeta()}
  function maybePushOpsTimeBrief(){const d=new Date(),key=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}`;if(d.getMinutes()>2||lastOpsBriefHour===key)return;lastOpsBriefHour=key;const active=jobs.filter(j=>!isCompletedJob(j)&&categoryForJob(j)!=='unmapped').length,due=jobs.filter(j=>!isCompletedJob(j)&&isSameLocalDay(j.due,d)).length,overdue=jobs.filter(isOverdueJob).length;pushActivity({title:`${clockTime()} · Office checkpoint`,text:`${active} active · ${due} due today · ${overdue} overdue`,avatar:'TM',type:'time_brief'})}
  function startOfficeClock(){updateLiveClock();maybePushOpsTimeBrief();if(clockTimer)clearInterval(clockTimer);clockTimer=setInterval(()=>{updateLiveClock();maybePushOpsTimeBrief()},30000)}
  function eventGlyph(type=''){
    if(type==='workload_updated')return'WL';if(type==='staff_added')return'＋';if(type==='staff_removed')return'−';if(type==='staff_updated')return'ST';if(type.startsWith('job_'))return'JM';if(type==='chat_message')return'CH';if(type.includes('drive'))return'DR';return'UP';
  }
  function renderNotifications(){
    if(!notificationList)return;
    if(!notifications.length){notificationList.innerHTML='<div class="notification-empty">No new updates yet.</div>';return}
    notificationList.innerHTML=notifications.slice(0,30).map(n=>`<div class="notification-item"><div class="notification-item-icon">${esc(eventGlyph(n.eventType))}</div><div class="notification-item-copy"><b>${esc(n.title||'Office update')}</b><span>${esc(n.message||'Updated')}${eventActorName(n)?` · by ${esc(eventActorName(n))}`:''}</span></div><time><b>${esc(clockTime(n.createdAt))}</b><small>${esc(relativeEventTime(n.createdAt))}</small></time></div>`).join('');
  }
  function setNotificationUnread(value){
    notificationUnreadCount=Math.max(0,Number(value)||0);if(!notificationUnread||!notificationBtn)return;
    notificationUnread.textContent=String(Math.min(99,notificationUnreadCount));notificationUnread.hidden=notificationUnreadCount===0;notificationBtn.classList.toggle('has-unread',notificationUnreadCount>0);
  }
  function setNotificationOpen(open){
    notificationOpen=Boolean(open);notificationPanel?.classList.toggle('open',notificationOpen);notificationPanel?.setAttribute('aria-hidden',String(!notificationOpen));notificationBtn?.setAttribute('aria-expanded',String(notificationOpen));if(notificationOpen)setNotificationUnread(0);
  }
  function showNotificationToast(event){
    if(!notificationToast)return;const actor=eventActorName(event);notificationToast.textContent=`${clockTime(event.createdAt)} · ${event.title||'Office update'} · ${event.message||'Updated'}${actor?` · by ${actor}`:''}`;notificationToast.classList.add('show');clearTimeout(notificationToastTimer);notificationToastTimer=setTimeout(()=>notificationToast.classList.remove('show'),3200);
  }
  function armNotificationAudio(){
    if(audioArmed)return;try{const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;audioContext=new Ctx();audioContext.resume?.();audioArmed=true}catch(_){}
  }
  function playNotificationBeep(){
    if(!audioContext||audioContext.state!=='running')return;
    try{const now=audioContext.currentTime,osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type='sine';osc.frequency.setValueAtTime(880,now);osc.frequency.exponentialRampToValueAtTime(660,now+.12);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.055,now+.015);gain.gain.exponentialRampToValueAtTime(.0001,now+.16);osc.connect(gain);gain.connect(audioContext.destination);osc.start(now);osc.stop(now+.18)}catch(_){}
  }
  function markWorkloadNotice(employeeId){
    const id=Number(employeeId);if(!Number.isFinite(id))return;workloadNoticeIds.add(id);employeeNodes.get(id)?.classList.add('workload-alert');
  }
  function clearWorkloadNotice(employeeId){
    const id=Number(employeeId);workloadNoticeIds.delete(id);employeeNodes.get(id)?.classList.remove('workload-alert');
  }
  async function refreshJobsFromSharedCache(){
    const cached=await readJobCache();if(!cached)return;jobs=cached.jobs;jobSharedVersion=Number(cached.version||jobSharedVersion);setOpsSource(jobDataSource==='html'?'live':'cached',jobDataSource==='html'?'Job Management':'Database',`Job Management update received · ${jobs.length} shared jobs synced.`,cached.savedAt);renderOps();
  }
  function addNotification(event,{initial=false,local=false}={}){
    notifications.unshift(event);if(notifications.length>40)notifications.length=40;renderNotifications();
    if(!initial&&!local){if(!notificationOpen)setNotificationUnread(notificationUnreadCount+1);showNotificationToast(event);playNotificationBeep();}
  }
  function currentTempActor(){const p=window.KSTempUser?.get?.();return p?{name:String(p.name||p.browserId||'This PC'),browserId:String(p.browserId||'')}:{name:'This PC',browserId:''}}
  function eventActorName(event){return String(event?.metadata?.actor?.name||'').trim()}
  function handleOfficeEvent(event,{initial=false,local=false}={}){
    if(!event||!event.id)return;const type=String(event.eventType||'office_update'),empId=Number(event.employeeId)||null,emp=empId?employeeById[empId]:null;
    const actorName=eventActorName(event),eventText=actorName?`${event.message||'Updated'} · by ${actorName}`:(event.message||'Updated');
    pushActivity({title:event.title||'Office update',text:eventText,avatar:eventGlyph(type),employeeId:empId,createdAt:event.createdAt||Date.now(),type,realtime:true});
    addNotification(event,{initial,local});
    if(type==='workload_updated'&&empId){if(!initial){markWorkloadNotice(empId);if(emp)showBubble(emp,event.message||workloadBubbleText(emp)||'Workload updated',{kind:'workload',duration:8200})}loadStaffDirectory({seedIfMissing:false});}
    else if(type==='staff_added'||type==='staff_removed'||type==='staff_updated'){loadStaffDirectory({seedIfMissing:false});}
    else if(type==='job_management_updated'){refreshJobsFromSharedCache();}
    else if(type==='job_stage_mapping_updated'){initSharedJobManagement();}
    else if(type==='chat_message'){if(!chatOpen)pullChat();}
  }
  async function postOfficeEvent({eventType,title,message='',employeeId=null,metadata={},dedupeKey=''},options={}){
    try{
      const actor=currentTempActor(),eventMetadata={...metadata,actor:metadata?.actor||actor};
      const res=await fetch(EVENTS_API,{method:'POST',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify({eventType,title,message,employeeId,metadata:eventMetadata,dedupeKey,sourceClient:eventClientId})});if(!res.ok)throw new Error(`HTTP ${res.status}`);const row=await res.json(),event=row.event;if(event){const id=Number(event.id)||0,isLocal=event.sourceClient===eventClientId;if(id>lastEventId||isLocal){lastEventId=Math.max(lastEventId,id);handleOfficeEvent(event,{local:isLocal,...options})}}return event;
    }catch(_){return null}
  }
  async function pullOfficeEvents({initial=false}={}){
    try{
      const res=await fetch(`${EVENTS_API}?after=${initial?0:lastEventId}&limit=${initial?24:60}`,{cache:'no-store',headers:{accept:'application/json'}});if(!res.ok)throw new Error(`HTTP ${res.status}`);const data=await res.json(),list=Array.isArray(data.events)?data.events:[];
      if(initial&&!eventInitialized){list.forEach(ev=>handleOfficeEvent(ev,{initial:true,local:ev.sourceClient===eventClientId}));}
      else list.filter(ev=>(Number(ev.id)||0)>lastEventId).forEach(ev=>handleOfficeEvent(ev,{initial:false,local:ev.sourceClient===eventClientId}));
      if(list.length)lastEventId=Math.max(lastEventId,...list.map(ev=>Number(ev.id)||0));eventInitialized=true;
    }catch(_){}
  }
  function startEventStream(){
    pullOfficeEvents({initial:true});if(eventPollTimer)clearInterval(eventPollTimer);eventPollTimer=setInterval(()=>{if(!document.hidden)pullOfficeEvents()},2000);
  }

  function normalizeKey(v=''){return String(v).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
  function parseJobManagementUrl(value){
    let url;
    try{url=new URL(String(value||'').trim())}catch(_){return{ok:false,error:'Enter a valid https:// link.'}}
    if(url.protocol!=='https:'&&url.protocol!=='http:')return{ok:false,error:'Link must start with https:// or http://.'};
    const clean=url.toString();
    const m=url.pathname.match(/^\/spreadsheets\/d\/([^/]+)/);
    let gid=url.searchParams.get('gid')||'';
    if(!gid&&url.hash){const hm=url.hash.match(/(?:^#|[?&])gid=(\d+)/);if(hm)gid=hm[1]}
    if(url.hostname==='docs.google.com'&&m){
      return{ok:true,url:clean,base:`https://docs.google.com/spreadsheets/d/${m[1]}`,gid:gid||'0',sheet:true};
    }
    return{ok:true,url:clean,base:null,gid:null,sheet:false};
  }
  function applyJobManagementUrl(value,{broadcast=true}={}){
    const parsed=parseJobManagementUrl(value);
    if(!parsed.ok)return parsed;
    jobSheetUrl=parsed.url;jobSheetBase=parsed.base;jobSheetGid=parsed.gid;
    document.querySelectorAll('a').forEach(a=>{
      const sharedJobLink=a.hasAttribute('data-shared-job-link')||a.id==='jobManagementResource'||a.classList.contains('ops-open-sheet');
      if(sharedJobLink){a.href=jobSheetUrl;a.target='_blank';a.rel='noopener noreferrer'}
    });
    if(jobLinkInput&&document.activeElement!==jobLinkInput)jobLinkInput.value=jobSheetUrl;
    if(broadcast)window.dispatchEvent(new CustomEvent('ks:job-management-url',{detail:{url:jobSheetUrl}}));
    return parsed;
  }
  async function readGlobalConfig(){
    try{const res=await fetch(`/api/state?scope=${encodeURIComponent(GLOBAL_CONFIG_SCOPE)}`,{cache:'no-store',headers:{accept:'application/json'}});if(!res.ok)return{};const row=await res.json();return row?.payload&&typeof row.payload==='object'?row.payload:{}}catch(_){return{}}
  }
  async function initSharedJobManagement(){
    const cfg=await readGlobalConfig();
    jobDataSource=cfg.jobDataSource||'html';
    applyJobManagementUrl(cfg.jobManagementUrl||DEFAULT_JOB_SHEET_URL);
    applyGoogleDriveUrl(cfg.googleDriveUrl||DEFAULT_GOOGLE_DRIVE_URL);
    stageMapping=normalizeStageMapping(cfg.jobStageMapping||DEFAULT_STAGE_MAPPING);renderOps();return cfg;
  }
  function openStageMappingEditor(){if(!stageMappingModal)return;stageOrdersInput.value=mappingText('orders');stageArtworkInput.value=mappingText('artwork');stageProductionInput.value=mappingText('production');stageCompletedInput.value=mappingText('completed');stageMappingHelp.className='job-link-help';stageMappingHelp.textContent='Shared mapping. Unknown Job Management statuses will be flagged as Unmapped instead of silently counted.';stageMappingModal.classList.add('open');stageMappingModal.setAttribute('aria-hidden','false');setTimeout(()=>stageOrdersInput?.focus(),40)}
  function closeStageMappingEditor(){stageMappingModal?.classList.remove('open');stageMappingModal?.setAttribute('aria-hidden','true')}
  async function saveStageMapping(){const next=normalizeStageMapping({orders:parseMappingText(stageOrdersInput.value),artwork:parseMappingText(stageArtworkInput.value),production:parseMappingText(stageProductionInput.value),completed:parseMappingText(stageCompletedInput.value)});if(!Object.values(next).every(v=>v.length)){stageMappingHelp.className='job-link-help error';stageMappingHelp.textContent='Each stage needs at least one status keyword.';return}stageMappingSave.disabled=true;stageMappingHelp.className='job-link-help';stageMappingHelp.textContent='Saving shared stage mapping…';try{const current=await readGlobalConfig(),payload={...current,jobStageMapping:next,jobStageMappingUpdatedAt:Date.now()};const res=await fetch('/api/state',{method:'PUT',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify({scope:GLOBAL_CONFIG_SCOPE,payload,clientId:'dashboard-stage-mapping'})});if(!res.ok)throw new Error(`Save failed (${res.status})`);stageMapping=next;renderOps();stageMappingHelp.className='job-link-help ok';stageMappingHelp.textContent='Saved. Office Pulse reclassified all Job Management rows.';await postOfficeEvent({eventType:'job_stage_mapping_updated',title:'Pipeline mapping updated',message:'Job Management status mapping was changed',dedupeKey:`stage-map:${hashString(JSON.stringify(next))}:${Date.now()}`});setTimeout(closeStageMappingEditor,650)}catch(err){stageMappingHelp.className='job-link-help error';stageMappingHelp.textContent=err.message||'Could not save mapping.'}finally{stageMappingSave.disabled=false}}
  async function saveJobManagementUrl(value){
    const parsed=parseJobManagementUrl(value);if(!parsed.ok)throw new Error(parsed.error);
    const current=await readGlobalConfig();
    const payload={...current,jobManagementUrl:parsed.url,jobManagementUpdatedAt:Date.now()};
    const res=await fetch('/api/state',{method:'PUT',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify({scope:GLOBAL_CONFIG_SCOPE,payload,clientId:'dashboard-link-editor'})});
    if(!res.ok)throw new Error(`Save failed (${res.status})`);
    applyJobManagementUrl(parsed.url);
    await postOfficeEvent({eventType:'job_link_updated',title:'Job Management link updated',message:'Shared Job Management link changed',metadata:{url:parsed.url},dedupeKey:`job-link:${hashString(parsed.url)}:${Date.now()}`});
    return parsed;
  }
  function openJobLinkEditor(){if(!jobLinkModal)return;jobLinkInput.value=jobSheetUrl;jobLinkHelp.className='job-link-help';jobLinkHelp.textContent='This Google Sheet link is shared as the import/reference source for Job Management HTML.';jobLinkModal.classList.add('open');jobLinkModal.setAttribute('aria-hidden','false');setTimeout(()=>jobLinkInput.focus(),40)}
  function closeJobLinkEditor(){if(!jobLinkModal)return;jobLinkModal.classList.remove('open');jobLinkModal.setAttribute('aria-hidden','true')}
  function parseHttpUrl(value,label='Link'){
    let url;try{url=new URL(String(value||'').trim())}catch(_){return{ok:false,error:`Enter a valid ${label.toLowerCase()} URL.`}}
    if(!['https:','http:'].includes(url.protocol))return{ok:false,error:`${label} must start with https:// or http://.`};
    return{ok:true,url:url.toString()};
  }
  function applyGoogleDriveUrl(value,{broadcast=true}={}){
    const parsed=parseHttpUrl(value,'Google Drive link');if(!parsed.ok)return parsed;googleDriveUrl=parsed.url;
    if(googleDriveResource){googleDriveResource.href=googleDriveUrl;googleDriveResource.target='_blank';googleDriveResource.rel='noopener noreferrer'}
    document.querySelectorAll('[data-shared-drive]').forEach(a=>{a.href=googleDriveUrl;a.target='_blank';a.rel='noopener noreferrer'});
    if(driveLinkInput&&document.activeElement!==driveLinkInput)driveLinkInput.value=googleDriveUrl;
    if(broadcast)window.dispatchEvent(new CustomEvent('ks:google-drive-url',{detail:{url:googleDriveUrl}}));
    return parsed;
  }
  async function saveGoogleDriveUrl(value){
    const parsed=parseHttpUrl(value,'Google Drive link');if(!parsed.ok)throw new Error(parsed.error);
    const current=await readGlobalConfig();const payload={...current,googleDriveUrl:parsed.url,googleDriveUpdatedAt:Date.now()};
    const res=await fetch('/api/state',{method:'PUT',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify({scope:GLOBAL_CONFIG_SCOPE,payload,clientId:'dashboard-drive-editor'})});
    if(!res.ok)throw new Error(`Save failed (${res.status})`);applyGoogleDriveUrl(parsed.url);await postOfficeEvent({eventType:'drive_link_updated',title:'Google Drive link updated',message:'Shared Google Drive folder link changed',metadata:{url:parsed.url},dedupeKey:`drive-link:${hashString(parsed.url)}:${Date.now()}`});return parsed;
  }
  function openDriveLinkEditor(){if(!driveLinkModal)return;driveLinkInput.value=googleDriveUrl;driveLinkHelp.className='job-link-help';driveLinkHelp.textContent='This link is shared through Netlify Database and will load for everyone.';driveLinkModal.classList.add('open');driveLinkModal.setAttribute('aria-hidden','false');setTimeout(()=>driveLinkInput.focus(),40)}
  function closeDriveLinkEditor(){if(!driveLinkModal)return;driveLinkModal.classList.remove('open');driveLinkModal.setAttribute('aria-hidden','true')}
  function parseLooseDate(v){
    if(!v)return null;
    if(v instanceof Date&&!isNaN(v))return v;
    const str=String(v).trim();
    const m=str.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
    if(m){let y=Number(m[3]);if(y<100)y+=2000;const d=new Date(y,Number(m[2])-1,Number(m[1]));return isNaN(d)?null:d}
    const d=new Date(str);return isNaN(d)?null:d;
  }
  function pickRecordValue(record,candidates){
    const keys=Object.keys(record),normCandidates=candidates.map(normalizeKey);
    for(const c of normCandidates){const exact=keys.find(k=>normalizeKey(k)===c);if(exact&&record[exact]!=null&&String(record[exact]).trim())return String(record[exact]).trim()}
    for(const c of normCandidates){const partial=keys.find(k=>{const nk=normalizeKey(k);return nk.length>2&&(nk.includes(c)||c.includes(nk))});if(partial&&record[partial]!=null&&String(record[partial]).trim())return String(record[partial]).trim()}
    return '';
  }
  const JOB_ALIASES={
    ref:['jobsheet/files','jobsheet files','jobsheet','files','job no','job number','job id','job','order no','order number','invoice no','invoice','ref','reference','quotation no'],
    customer:['customer','customer name','client','client name','company','company name','school','attention','attn','nama customer','nama pelanggan','nama client'],
    jobType:['job type','product','item','product type','order details','project','project name','job description','description'],
    printingType:['type of printing','printing type','print type','printing','print method','method'],
    status:['status','job status','progress','stage','production status','job progress'],
    pic:['pic','person in charge','assigned to','assigned','sales pic','salesperson','sales person','staff'],
    designer:['designer','designer pic','design pic','artwork pic'],
    supplier:['supplier','vendor','printing supplier','production supplier'],
    due:['due date','eta','deadline','target date','required date'],
    delivery:['delivery date','date delivery','delivery','deliver date'],
    completed:['actual complete date','actual completion date','complete date','completed date','date completed'],
    statusUpdated:['status updated','last updated','updated date','date updated','stage date','status date','progress date'],
    orderDate:['order in','order date','date order','created date','date created','created','date'],
    invoice:['invoice','invoice no','invoice number'],
    currentDepartment:['current department','department'],artworkStatus:['artwork status'],sales:['sales','sales pic','salesperson','sales person'],productionPic:['production pic','production'],priority:['priority'],paymentStatus:['payment status'],qcStatus:['qc status'],supplierStatus:['supplier status'],collection:['collection'],deliveryTime:['delivery time'],lastUpdate:['last update'],remark:['remark'],invoiceAmount:['invoice amount'],paid:['paid'],balance:['balance']
  };
  function recordField(record,key){return pickRecordValue(record,JOB_ALIASES[key]||[])}
  function isLikelyHeaderRow(values){
    const words=(values||[]).map(v=>normalizeKey(v)).filter(Boolean);if(words.length<3)return false;
    const aliases=Object.values(JOB_ALIASES).flat().map(normalizeKey);
    return words.filter(w=>aliases.some(a=>w===a||w.includes(a)||a.includes(w))).length>=3;
  }
  function normalizeJobDetails(record){
    const priority=['order in','invoice','customer','client','company','job type','printing type','status','supplier','pic','designer','due date','eta','delivery date','actual complete date'];
    const entries=Object.entries(record).filter(([,v])=>String(v??'').trim()).map(([label,value])=>({label:String(label).trim(),value:String(value).trim()}));
    const rank=item=>{const nk=normalizeKey(item.label);const idx=priority.findIndex(p=>nk===normalizeKey(p)||nk.includes(normalizeKey(p)));return idx<0?999:idx};
    return entries.sort((a,b)=>rank(a)-rank(b));
  }
  function tableToJobs(headers,rows){
    let hdr=[...(headers||[])];let data=[...(rows||[])];
    const generic=hdr.filter(h=>!String(h||'').trim()||/^column\s*\d+$/i.test(String(h))).length>=Math.max(2,Math.ceil(hdr.length*.5));
    if((generic||hdr.length<2)&&data.length){const at=data.slice(0,5).findIndex(isLikelyHeaderRow);if(at>=0){hdr=data[at].map((h,i)=>String(h||`Column ${i+1}`).trim()||`Column ${i+1}`);data=data.slice(at+1)}}
    const out=[];
    data.forEach((values,index)=>{
      const record={};hdr.forEach((h,i)=>{const label=String(h||`Column ${i+1}`).trim()||`Column ${i+1}`;record[label]=values[i]??''});
      const details=normalizeJobDetails(record);if(details.length<2)return;
      const ref=recordField(record,'ref')||String(values[0]??'').trim()||`JOB-${index+1}`;
      const customer=recordField(record,'customer');
      const jobType=recordField(record,'jobType');
      const printingType=recordField(record,'printingType');
      const title=[jobType,printingType].filter(Boolean).filter((v,i,a)=>a.indexOf(v)===i).join(' · ')||String(values[1]??'').trim()||'Job';
      const currentDepartment=recordField(record,'currentDepartment');const artworkStatus=recordField(record,'artworkStatus');
      const status=currentDepartment||recordField(record,'status')||artworkStatus||'Active';
      const sales=recordField(record,'sales')||recordField(record,'pic');const productionPic=recordField(record,'productionPic');const pic=sales;const designer=recordField(record,'designer');
      const supplier=recordField(record,'supplier');const deliveryTime=recordField(record,'deliveryTime')||recordField(record,'due')||recordField(record,'delivery');
      const due=deliveryTime;const deliveryDate='';const completedDate=recordField(record,'completed');
      const lastUpdate=recordField(record,'lastUpdate')||recordField(record,'statusUpdated');const statusUpdated=lastUpdate;const orderDate=recordField(record,'orderDate');const invoice=recordField(record,'invoice');
      const assignees=[sales,designer,productionPic].filter(Boolean);
      out.push({ref,customer,title,jobType,printingType,status,currentDepartment,artworkStatus,sales,productionPic,priority:recordField(record,'priority'),paymentStatus:recordField(record,'paymentStatus'),qcStatus:recordField(record,'qcStatus'),supplierStatus:recordField(record,'supplierStatus'),collection:recordField(record,'collection'),supplier,due,deliveryTime,deliveryDate,completedDate,lastUpdate,statusUpdated,orderDate,invoice,remark:recordField(record,'remark'),invoiceAmount:recordField(record,'invoiceAmount'),paid:recordField(record,'paid'),balance:recordField(record,'balance'),pic,designer,assignees,_index:index,_record:record,_details:details});
    });
    return out;
  }
  function gvizToJobs(response){
    const table=response&&response.table;if(!table||!Array.isArray(table.rows))return[];
    const headers=(table.cols||[]).map((c,i)=>c?.label||c?.id||`Column ${i+1}`);
    const rows=table.rows.map(r=>(r.c||[]).map(c=>c?.f??c?.v??''));
    return tableToJobs(headers,rows);
  }
  function normalizeStageMapping(value){
    const out={};
    for(const key of ['orders','artwork','production','completed']){
      const source=Array.isArray(value?.[key])?value[key]:DEFAULT_STAGE_MAPPING[key];
      out[key]=[...new Set(source.map(normalizeKey).filter(Boolean))].slice(0,80);
      if(!out[key].length)out[key]=[...DEFAULT_STAGE_MAPPING[key]];
    }
    return out;
  }
  function mappingText(key){return (stageMapping[key]||[]).join(', ')}
  function parseMappingText(value){return [...new Set(String(value||'').split(/[,\n]+/).map(normalizeKey).filter(Boolean))].slice(0,80)}
  function stageMatch(text=''){
    const hay=normalizeKey(text);if(!hay)return null;
    for(const stage of ['completed','artwork','production','orders']){
      const words=[...(stageMapping[stage]||[])].sort((a,b)=>b.length-a.length);
      const hit=words.find(word=>hay===word||hay.includes(word));
      if(hit)return{stage,keyword:hit};
    }
    return null;
  }
  function classifyJobStage(job){
    const dept=normalizeKey(job?.currentDepartment||'');
    if(dept){
      if(/closed|complete|completed|done/.test(dept))return{stage:'completed',keyword:dept,source:'current department'};
      if(/design|artwork/.test(dept))return{stage:'artwork',keyword:dept,source:'current department'};
      if(/production|print|packing|qc/.test(dept))return{stage:'production',keyword:dept,source:'current department'};
      if(/sales|order|admin/.test(dept))return{stage:'orders',keyword:dept,source:'current department'};
    }
    const status=normalizeKey(job?.status||job?.artworkStatus||'');
    const fallback=normalizeKey(`${job?.jobType||''} ${job?.printingType||''} ${job?.title||''}`);
    const statusHit=stageMatch(status);if(statusHit)return{...statusHit,source:'status'};
    const generic=!status||/^(in progress|processing|ongoing|wip|active)$/.test(status);
    if(generic){const fallbackHit=stageMatch(fallback);if(fallbackHit)return{...fallbackHit,source:'job'};}
    if(!dept&&!status)return{stage:'orders',keyword:'',source:'default'};
    return{stage:'unmapped',keyword:'',source:dept?'current department':status?'status':'job'};
  }
  function categoryForJob(job){return classifyJobStage(job).stage}
  function isWaitingApproval(job){const t=normalizeKey(`${job?.artworkStatus||''} ${job?.status||''}`);return /approval|waiting client|waiting customer|customer confirm/.test(t)}
  function jobAgeDays(job){const d=parseLooseDate(job?.statusUpdated)||parseLooseDate(job?.orderDate);if(!d)return null;return Math.max(0,(Date.now()-d.getTime())/86400000)}
  function avgAgeForStage(stage){const vals=jobs.filter(j=>categoryForJob(j)===stage&&!isCompletedJob(j)).map(jobAgeDays).filter(v=>Number.isFinite(v));return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null}
  function isStuckArtwork(job){const age=jobAgeDays(job);return categoryForJob(job)==='artwork'&&Number.isFinite(age)&&age>2}
  function isStuckProduction(job){const age=jobAgeDays(job);return categoryForJob(job)==='production'&&Number.isFinite(age)&&age>3}
  function isCompletedJob(job){return categoryForJob(job)==='completed'}
  function isOverdueJob(job){
    if(isCompletedJob(job))return false;
    const d=parseLooseDate(job.due);if(!d)return false;
    const due=new Date(d.getFullYear(),d.getMonth(),d.getDate(),23,59,59,999);
    return due.getTime()<Date.now();
  }
  function formatDue(v){
    const d=parseLooseDate(v);if(!d)return v||'No due date';
    return d.toLocaleDateString('en-MY',{day:'numeric',month:'short'});
  }
  function employeeForPic(pic=''){
    const p=String(pic).toLowerCase();if(!p)return null;
    return employees.find(e=>p.includes(e.name.toLowerCase())||e.name.toLowerCase().includes(p))||null;
  }
  function activeJobsForEmployee(emp){return jobs.filter(j=>!isCompletedJob(j)&&[j.pic,j.sales,j.designer,j.productionPic,...(j.assignees||[])].filter(Boolean).some(name=>employeeForPic(name)?.id===emp.id))}
  function isSameLocalDay(value,base=new Date()){
    const d=parseLooseDate(value);if(!d)return false;
    return d.getFullYear()===base.getFullYear()&&d.getMonth()===base.getMonth()&&d.getDate()===base.getDate();
  }
  function renderOpsSyncMeta(){
    const ageMs=opsLastSyncAt?Math.max(0,Date.now()-opsLastSyncAt):null,ageMin=ageMs==null?null:Math.floor(ageMs/60000);
    if(opsLastSync)opsLastSync.textContent=opsLastSyncAt?`Last sync ${fullClockTime(opsLastSyncAt)} · ${relativeEventTime(opsLastSyncAt)}`:'Waiting for Job Management';
    if(opsDataAge){opsDataAge.textContent=ageMin==null?'No live data':ageMin<1?'Data age now':`Data age ${ageMin}m`;opsDataAge.classList.toggle('stale',ageMin!=null&&ageMin>=5)}
    if(opsSyncHealth){const stale=ageMin!=null&&ageMin>=5,liveLabel=jobDataSource==='html'?'LIVE DATABASE':'LIVE SHEET',label=opsDataMode==='live'?(stale?'LIVE · STALE':liveLabel):opsDataMode==='cached'?'SERVER CACHE':'EMPTY';opsSyncHealth.textContent=label;opsSyncHealth.dataset.mode=stale?'stale':opsDataMode}
  }
  function setOpsSource(mode,label,note='',timestamp=null){
    opsDataMode=mode;opsLastSyncSource=label||mode;
    if(mode==='live')opsLastSyncAt=timestamp||Date.now();
    else if(mode==='cached')opsLastSyncAt=timestamp||opsLastSyncAt||Date.now();
    else if(mode==='empty')opsLastSyncAt=null;
    if(opsSource)opsSource.textContent=label;
    const parent=opsSource?.parentElement;if(parent){parent.classList.toggle('is-live',mode==='live');parent.classList.toggle('is-cached',mode==='cached')}
    if(opsNote&&note)opsNote.textContent=note;
    renderOpsSyncMeta();
  }
  function setOpsTab(tab){
    $$('.ops-tab').forEach(btn=>{const active=btn.dataset.opsTab===tab;btn.classList.toggle('active',active);btn.setAttribute('aria-selected',String(active))});
    $$('.ops-view').forEach(view=>view.classList.toggle('active',view.dataset.opsView===tab));
  }
  function syncEmployeeJobsFromOps(){
    employees.forEach(emp=>{const job=activeJobsForEmployee(emp)[0];emp.currentJob=job?`${job.ref} · ${job.title}`:'';emp.activity=''});
  }
  function matchesOpsFilter(job,filter){
    if(filter==='all')return true;if(filter==='active')return !isCompletedJob(job)&&categoryForJob(job)!=='unmapped';if(filter==='overdue')return isOverdueJob(job);if(filter==='dueToday')return !isCompletedJob(job)&&isSameLocalDay(job.due);if(filter==='completedToday')return isCompletedJob(job)&&isSameLocalDay(job.completedDate||job.deliveryDate);if(filter==='unmapped')return categoryForJob(job)==='unmapped';if(filter==='noPic')return !isCompletedJob(job)&&!String(job.pic||'').trim();if(filter==='noDesigner')return !isCompletedJob(job)&&!String(job.designer||'').trim();if(filter==='stuckArtwork')return isStuckArtwork(job);if(filter==='stuckProduction')return isStuckProduction(job);if(filter==='waitingApproval')return !isCompletedJob(job)&&isWaitingApproval(job);return categoryForJob(job)===filter;
  }
  function filterLabel(filter){return({all:'All',active:'Active',orders:'Orders',artwork:'Artwork',production:'Production',completed:'Completed',overdue:'Overdue',dueToday:'Due today',completedToday:'Completed today',unmapped:'Unmapped',noPic:'No PIC',noDesigner:'No Designer',stuckArtwork:'Artwork >2d',stuckProduction:'Production >3d',waitingApproval:'Waiting approval'})[filter]||filter}
  function filteredJobs(){let list=jobs.filter(j=>matchesOpsFilter(j,opsFilter));return list.sort((a,b)=>{const ad=parseLooseDate(a.orderDate)?.getTime()||0,bd=parseLooseDate(b.orderDate)?.getTime()||0;return bd-ad||((a._index??0)-(b._index??0))})}
  function employeeJobStats(emp){const list=activeJobsForEmployee(emp),artwork=list.filter(j=>categoryForJob(j)==='artwork').length,production=list.filter(j=>categoryForJob(j)==='production').length,overdue=list.filter(isOverdueJob).length,level=list.length>=5||overdue>=2?'Busy':list.length>=2?'Normal':'Light';return{list,active:list.length,artwork,production,overdue,level}}
  function renderOps(){
    if(!todayPanel)return;const counts={orders:0,artwork:0,production:0,completed:0,unmapped:0,overdue:0};jobs.forEach(job=>{const stage=categoryForJob(job);counts[stage]=(counts[stage]||0)+1;if(isOverdueJob(job))counts.overdue++});
    const now=new Date(),activeCount=counts.orders+counts.artwork+counts.production,completedToday=jobs.filter(j=>isCompletedJob(j)&&isSameLocalDay(j.completedDate||j.deliveryDate,now)).length,dueToday=jobs.filter(j=>!isCompletedJob(j)&&isSameLocalDay(j.due,now)).length,waitingApproval=jobs.filter(j=>!isCompletedJob(j)&&isWaitingApproval(j)).length,noPic=jobs.filter(j=>!isCompletedJob(j)&&!String(j.pic||'').trim()).length,noDesigner=jobs.filter(j=>!isCompletedJob(j)&&!String(j.designer||'').trim()).length,stuckArtwork=jobs.filter(isStuckArtwork).length,stuckProduction=jobs.filter(isStuckProduction).length;
    todayPanel.querySelectorAll('[data-ops-metric]').forEach(btn=>{const key=btn.dataset.opsMetric,node=btn.querySelector('.today-number');if(node)animateNum(node,counts[key]||0);btn.classList.toggle('active-filter',opsFilter===key)});todayPanel.querySelectorAll('[data-ops-quick]').forEach(btn=>{const key=btn.dataset.opsQuick,node=btn.querySelector('.today-number'),value=key==='active'?activeCount:key==='dueToday'?dueToday:key==='overdue'?counts.overdue:key==='completedToday'?completedToday:0;if(node)animateNum(node,value);btn.classList.toggle('active-filter',opsFilter===key)});
    if(opsTotalJobs)animateNum(opsTotalJobs,jobs.length);if(opsActiveJobs)animateNum(opsActiveJobs,activeCount);if(opsCompletedToday)animateNum(opsCompletedToday,completedToday);if(opsDueToday)animateNum(opsDueToday,dueToday);
    if(opsPipelineBar){const total=Math.max(1,counts.orders+counts.artwork+counts.production+counts.completed),parts=['orders','artwork','production','completed'];opsPipelineBar.innerHTML=parts.map(key=>`<i class="pipeline-${key}" style="width:${(counts[key]/total*100).toFixed(2)}%" title="${key}: ${counts[key]}"></i>`).join('');opsPipelineBar.setAttribute('aria-label',`Job Management classified tally: ${counts.orders} orders, ${counts.artwork} artwork, ${counts.production} production, ${counts.completed} completed, ${counts.unmapped} unmapped`)}
    const classified=jobs.length-counts.unmapped;if(opsReconcile){const sourceLabel=jobDataSource==='html'?'Job Management row':'Sheet row';opsReconcile.textContent=`${jobs.length} ${sourceLabel}${jobs.length===1?'':'s'} · ${classified} classified · ${counts.unmapped} unmapped`}if(opsUnmappedBtn){opsUnmappedBtn.hidden=counts.unmapped===0;opsUnmappedBtn.textContent=`Review ${counts.unmapped} unmapped`;opsUnmappedBtn.classList.toggle('warning',counts.unmapped>0)}
    if(opsDailySummary){const date=now.toLocaleDateString('en-MY',{day:'numeric',month:'short'});opsDailySummary.innerHTML=`<b>Today · ${esc(date)}</b><span>${activeCount} active · ${counts.artwork} artwork · ${counts.production} production · ${completedToday} completed today · ${counts.overdue} overdue</span>`}
    if(opsStageHealth){const fmt=v=>Number.isFinite(v)?`${v.toFixed(v>=10?0:1)}d`:'—';opsStageHealth.innerHTML=[['orders','Orders'],['artwork','Artwork'],['production','Production']].map(([key,label])=>`<div><span>${label}</span><b>${counts[key]}</b><small>avg job age ${fmt(avgAgeForStage(key))}</small></div>`).join('')+`<div><span>Waiting approval</span><b>${waitingApproval}</b><small>artwork/client hold</small></div>`}
    const alerts=[['dueToday','Due today',dueToday,'due'],['overdue','Overdue',counts.overdue,'danger'],['noPic','No PIC',noPic,'warn'],['noDesigner','No Designer',noDesigner,'warn'],['stuckArtwork','Artwork >2d',stuckArtwork,'warn'],['stuckProduction','Production >3d',stuckProduction,'warn'],['completedToday','Completed today',completedToday,'good'],['waitingApproval','Waiting approval',waitingApproval,'']];if(opsAlerts)opsAlerts.innerHTML=alerts.map(([key,label,value,tone])=>`<button class="ops-alert ${tone}" data-ops-alert-filter="${key}"><span>${esc(label)}</span><b>${value}</b></button>`).join('');
    if(opsStaffLoad){const stats=employees.map(emp=>({emp,...employeeJobStats(emp)})).sort((a,b)=>b.active-a.active||b.overdue-a.overdue).slice(0,4);opsStaffLoad.innerHTML=stats.map(s=>`<button data-pulse-staff="${s.emp.id}"><span class="ops-load-avatar">${initials(s.emp.name)}</span><span><b>${esc(s.emp.name)}</b><small>${s.active} active · ${s.artwork} artwork · ${s.production} production${s.overdue?` · ${s.overdue} overdue`:''}</small></span><em class="load-${s.level.toLowerCase()}">${s.level}</em></button>`).join('')}
    renderOpsSyncMeta();syncEmployeeJobsFromOps();const workloadOrder=[...employees].sort((a,b)=>a.id-b.id),totalActive=jobs.filter(j=>!isCompletedJob(j)&&categoryForJob(j)!=='unmapped').length;if(workloadTotal)workloadTotal.textContent=`${totalActive} active`;
    if(workloadList)workloadList.innerHTML=workloadOrder.map(emp=>{const st=employeeJobStats(emp),manual=workloadLines(emp.workload),manualHtml=manual.slice(0,3).map(line=>`<i>${esc(line)}</i>`).join('');return `<div class="workload-row workload-smart" data-workload-employee="${emp.id}" role="button" tabindex="0"><div class="workload-avatar">${initials(emp.name)}</div><div class="workload-copy"><b>${esc(emp.name)}</b><span>${esc(emp.position)} · ${st.active} active</span><div class="workload-mini"><i>${st.artwork} artwork</i><i>${st.production} production</i>${st.overdue?`<i class="danger">${st.overdue} overdue</i>`:''}</div>${manualHtml?`<div class="manual-workload">${manualHtml}</div>`:''}</div><div class="workload-level level-${st.level.toLowerCase()}">${st.level}</div></div>`}).join('');
    renderStaffDirectory();const list=filteredJobs().slice(0,8);if(jobsFilterLabel)jobsFilterLabel.textContent=filterLabel(opsFilter);if(recentJobs)recentJobs.innerHTML=list.length?list.map(job=>{const stage=categoryForJob(job),cat=isOverdueJob(job)?'overdue':stage,emp=employeeForPic(job.pic),age=jobAgeDays(job);return `<div class="job-row" data-job-index="${jobs.indexOf(job)}" role="button" tabindex="0"><div class="job-main"><div class="job-top"><span class="job-ref">${esc(job.ref)}</span><span class="job-title">${esc(job.title)}</span></div><div class="job-sub">Customer ${esc(job.customer||'Client')} · ${esc(emp?.name||job.pic||'Unassigned')} · ${esc(job.status||stage)}${job.daysLeft!==''&&job.daysLeft!=null&&Number.isFinite(Number(job.daysLeft))?` · ${Number(job.daysLeft)<0?`${Math.abs(Number(job.daysLeft))}d overdue`:Number(job.daysLeft)===0?'due today':`${Number(job.daysLeft)}d left`}`:''}${Number.isFinite(age)?` · ${age.toFixed(age>=10?0:1)}d old`:''}</div></div><span class="job-status ${cat}">${esc(stage==='unmapped'?'Unmapped':isOverdueJob(job)?'Overdue':job.status||stage)}</span></div>`}).join(''):`<div class="ops-note">No jobs match this filter.</div>`;
  }
  function showJobDetail(job){
    if(!job)return;
    profileCard.classList.remove('open');
    const emp=employeeForPic(job.pic);
    const details=Array.isArray(job._details)&&job._details.length?job._details:[
      {label:'Job',value:job.title||''},{label:'Customer',value:job.customer||''},{label:'Status',value:job.status||''},{label:'PIC',value:job.pic||''}
    ].filter(v=>String(v.value||'').trim());
    const detailHtml=details.map(item=>`<div class="detail-row"><span>${esc(item.label)}</span><span>${esc(item.value)}</span></div>`).join('');
    contextCard.innerHTML=`<div class="context-head"><div><div class="context-title">${esc(job.ref||'Job')}</div><div class="context-sub">Live Job Management record</div></div><button class="close-mini">×</button></div><div class="profile-details sheet-job-details">${detailHtml||'<div class="detail-row"><span>Job</span><span>No detail available</span></div>'}</div><div class="profile-job-actions">${emp?`<button class="profile-job-action" data-focus-job-employee="${emp.id}">Focus ${esc(emp.name)}</button>`:''}<a class="profile-job-action" href="${jobDataSource==='html'?'job-management.html':jobSheetUrl}" ${jobDataSource==='html'?'':'target="_blank" rel="noopener noreferrer"'}>Open Job ↗</a></div>`;
    contextCard.classList.add('open');
    contextCard.querySelector('.close-mini').onclick=()=>contextCard.classList.remove('open');
    const focus=contextCard.querySelector('[data-focus-job-employee]');if(focus)focus.onclick=()=>{openEmployee(emp);focusEmployee(emp)};
  }
  function jobsSignature(list){
    const compact=(list||[]).map(job=>({ref:job.ref||'',customer:job.customer||'',title:job.title||'',status:job.status||'',pic:job.pic||'',designer:job.designer||'',supplier:job.supplier||'',due:job.due||'',deliveryDate:job.deliveryDate||'',completedDate:job.completedDate||'',statusUpdated:job.statusUpdated||'',details:job._details||[]}));
    return hashString(JSON.stringify(compact));
  }
  async function saveJobCache(list,signature=jobsSignature(list)){
    try{
      await fetch('/api/state',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({scope:'dashboard:jobs',payload:{savedAt:Date.now(),signature,jobs:list.slice(0,250)},clientId:eventClientId})});
    }catch(_){}
  }
  function normalizeSharedHtmlJob(job,index=0){
    const j={...(job||{})};j.ref=j.ref||j.jobsheetFiles||j.invoice||`JOB-${index+1}`;j.customer=j.customer||'';j.jobType=j.jobType||j.item||'';j.printingType=j.printingType||j.typeOfPrinting||'';j.title=j.title||[j.jobType,j.printingType].filter(Boolean).join(' · ')||'Job';j.currentDepartment=j.currentDepartment||j.status||'';j.status=j.currentDepartment||j.status||j.artworkStatus||'Active';j.sales=j.sales||j.pic||'';j.pic=j.sales||j.pic||'';j.productionPic=j.productionPic||'';j.due=j.due||j.deliveryTime||'';j.deliveryTime=j.deliveryTime||j.due||'';j.completedDate=j.completedDate||j.actualComplete2||j.actualComplete1||'';j.statusUpdated=j.statusUpdated||j.lastUpdate||'';j.orderDate=j.orderDate||'';j.assignees=Array.isArray(j.assignees)?j.assignees:[j.sales,j.designer,j.productionPic].filter(Boolean);j._index=index;if(!Array.isArray(j._details)&&j._record&&typeof j._record==='object')j._details=Object.entries(j._record).filter(([,v])=>String(v??'').trim()).map(([label,value])=>({label,value:String(value)}));return j;
  }
  async function readJobCache(){
    try{
      const res=await fetch('/api/state?scope=dashboard%3Ajobs',{cache:'no-store'});
      if(!res.ok)return null;
      const row=await res.json(),parsed=row?.payload;
      if(!Array.isArray(parsed?.jobs))return null;
      return {...parsed,jobs:parsed.jobs.map(normalizeSharedHtmlJob).filter(job=>!isLegacyDemoJob(job)),version:Number(row?.version||0),updatedAt:row?.updatedAt||null};
    }catch(_){return null}
  }
  async function loadJobsFromSheet({background=false}={}){
    if(jobSyncInFlight)return jobs;jobSyncInFlight=true;
    if(!background&&opsRefreshBtn)opsRefreshBtn.classList.add('loading');
    if(jobDataSource==='html'){
      try{
        const shared=await readJobCache();
        if(shared){
          const changed=Number(shared.version||0)!==jobSharedVersion;jobSharedVersion=Number(shared.version||jobSharedVersion);opsLastSyncAt=shared.savedAt||opsLastSyncAt;
          if(changed||opsDataMode!=='live'){jobs=shared.jobs;setOpsSource('live','Job Management',`${jobs.length} shared jobs synced from the live database · ${fullClockTime()}.`,shared.savedAt);renderOps();}
          else renderOpsSyncMeta();
        }else{jobs=[];jobSharedVersion=0;setOpsSource('empty','No Data','No shared Job Management rows saved yet. Add or import a job to begin.');renderOps();}
        return jobs;
      }finally{jobSyncInFlight=false;if(!background)opsRefreshBtn?.classList.remove('loading')}
    }
    const shared=await readJobCache();
    const previousSignature=shared?.signature||jobsSignature(shared?.jobs||[]);
    if(shared){jobs=shared.jobs;const mins=Math.max(1,Math.round((Date.now()-shared.savedAt)/60000));setOpsSource('cached','Database',background?'Checking Job Management for updates…':`Shared database loaded · ${mins} min old. Refreshing Job Management…`,shared.savedAt);renderOps();}
    else if(!background)setOpsSource('empty','Syncing','Connecting to Job Management and shared database.');
    return new Promise((resolve,reject)=>{
      const callback=`__ksJobData_${Date.now()}_${Math.floor(Math.random()*1000)}`;let done=false,script=document.createElement('script'),timer=null;
      const finish=(err,data)=>{if(done)return;done=true;if(timer)clearTimeout(timer);try{delete window[callback]}catch(_){window[callback]=undefined}script.remove();err?reject(err):resolve(data)};
      window[callback]=response=>{try{const parsed=gvizToJobs(response);if(!parsed.length)throw new Error('No usable rows');finish(null,parsed)}catch(err){finish(err)}};
      const tqx=encodeURIComponent(`out:json;responseHandler:${callback}`);if(!jobSheetBase){finish(new Error('Saved Job Management link is not a Google Sheet'));return}script.src=`${jobSheetBase}/gviz/tq?gid=${jobSheetGid||'0'}&headers=1&tqx=${tqx}&_=${Date.now()}`;script.async=true;script.onerror=()=>finish(new Error('Sheet unavailable'));document.head.appendChild(script);
      timer=setTimeout(()=>finish(new Error('Sheet sync timed out')),5200);
    }).then(async list=>{
      const signature=jobsSignature(list),changed=Boolean(shared?.jobs?.length&&signature!==previousSignature);
      jobs=list;await saveJobCache(list,signature);setOpsSource('live','Job Mgmt',`${list.length} Job Management rows synced · pipeline tally updated ${fullClockTime()}.`);pushActivity({title:'Job Management synced',text:`${list.length} rows · Office Pulse tally refreshed`,avatar:'JM',type:'job_sync'});renderOps();renderFeed();
      if(changed){
        const oldMap=new Map((shared.jobs||[]).map(j=>[String(j.ref||''),jobsSignature([j])]));
        const changedRows=list.filter(j=>oldMap.get(String(j.ref||''))!==jobsSignature([j]));
        const sample=changedRows.slice(0,3).map(j=>j.ref||j.title).filter(Boolean).join(', ');
        await postOfficeEvent({eventType:'job_management_updated',title:'Job Management updated',message:sample?`${changedRows.length} job change${changedRows.length===1?'':'s'} · ${sample}`:`${list.length} jobs refreshed`,metadata:{count:list.length,changed:changedRows.length,signature},dedupeKey:`jobs:${signature}`});
      }
      return list;
    }).catch(async()=>{
      const cached=await readJobCache();if(cached){jobs=cached.jobs;const mins=Math.max(1,Math.round((Date.now()-cached.savedAt)/60000));setOpsSource('cached','Database',`Live Sheet was unavailable. Showing shared Netlify Database data from ${mins} min ago.`,cached.savedAt)}else{jobs=[];setOpsSource('empty','No Data','No Job Management data is available yet. Add or import a job to begin.')};renderOps();return jobs;
    }).finally(()=>{jobSyncInFlight=false;if(!background)opsRefreshBtn?.classList.remove('loading')});
  }
  function startJobAutoSync(){if(jobAutoTimer)clearInterval(jobAutoTimer);jobAutoTimer=setInterval(()=>{if(!document.hidden&&!staffEditorModal?.classList.contains('open')&&!workloadEditorModal?.classList.contains('open'))loadJobsFromSheet({background:true})},3500)}

  const DEPARTMENTS=['Creative Department','Sales and Marketing','Management','Production Management','Finance Department'];
  function normalizeDepartment(value,position=''){
    const d=String(value||'').trim(),role=String(position||'').toLowerCase();
    if(DEPARTMENTS.includes(d))return d;
    if(d==='Head'||d==='Dashboard')return 'Management';
    if(d==='Commerce')return 'Sales and Marketing';
    if(d==='Finance')return 'Finance Department';
    if(d==='Production')return /design|creative|artwork/.test(role)?'Creative Department':'Production Management';
    if(/sales|marketing/.test(role))return 'Sales and Marketing';
    if(/boss|manager|management|assistant/.test(role))return 'Management';
    if(/design|creative|artwork/.test(role))return 'Creative Department';
    if(/finance|account/.test(role))return 'Finance Department';
    return 'Production Management';
  }
  function workloadLines(value){
    const source=Array.isArray(value)?value:String(value||'').split(/\r?\n/);
    return source.map(v=>String(v||'').trim()).filter(Boolean).slice(0,30);
  }
  function staffRecord(emp){
    return {id:Number(emp.id),name:String(emp.name||'Staff').trim(),position:String(emp.position||'Staff').trim(),department:normalizeDepartment(emp.department,emp.position),workload:workloadLines(emp.workload||[])};
  }
  function dynamicStaffBase(id,index=0,department='Production Management'){
    const isHead=department==='Management',roomId=isHead?'boss':'staff';
    const col=index%4,row=Math.floor(index/4)%4;
    return {id:Number(id),name:'New Staff',department,position:'Staff',status:'At desk',homeRoom:roomId,roomId,x:isHead?15.2+col*1.5:8.0+col*3.2,y:isHead?39.2+row*1.4:18.0+row*1.6,deskId:'',deskLabel:'Flexible / mobile',currentJob:'',activity:'',lastActive:'',workload:[]};
  }
  function employeeFromStaffRecord(record,index,existing=null){
    const id=Number(record.id);const defaultBase=DEFAULT_EMPLOYEES.find(e=>e.id===id);const department=normalizeDepartment(record.department||defaultBase?.department||existing?.department,record.position||defaultBase?.position||existing?.position);
    const base=defaultBase?{...defaultBase}:dynamicStaffBase(id,index,department);
    const runtime=existing?{visualX:existing.visualX,visualY:existing.visualY,visualRoomId:existing.visualRoomId,roam:existing.roam,motionWalking:existing.motionWalking,moving:existing.moving}:{};
    return {...base,...runtime,id,name:String(record.name||base.name||'Staff').trim().slice(0,80)||'Staff',position:String(record.position||base.position||'Staff').trim().slice(0,80)||'Staff',department,workload:workloadLines(record.workload||[])};
  }
  function serializeStaffDirectory(){return employees.map(staffRecord)}
  function applyStaffDirectory(payload,version=0){
    if(!payload||!Array.isArray(payload.staff))return false;
    const old=Object.fromEntries(employees.map(e=>[e.id,e]));
    const next=payload.staff.map((record,index)=>employeeFromStaffRecord(record,index,old[Number(record.id)])).filter(e=>Number.isFinite(e.id));
    employees.splice(0,employees.length,...next);staffDirectoryVersion=Math.max(staffDirectoryVersion,Number(version||0));rebuildEmployeeIndex();
    clearEmployeeSelection();contextCard.classList.remove('open');drawRooms();drawEmployees();renderNav();renderOps();updateStats();renderFeed();
    return true;
  }
  async function saveStaffDirectory(records){
    const payload={staff:records.map((r,i)=>staffRecord(employeeFromStaffRecord(r,i,employeeById[Number(r.id)]))),updatedAt:Date.now()};
    const res=await fetch('/api/state',{method:'PUT',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify({scope:STAFF_DIRECTORY_SCOPE,payload,clientId:eventClientId})});
    if(!res.ok)throw new Error(`Save failed (${res.status})`);const row=await res.json();applyStaffDirectory(row.payload||payload,row.version||0);return row;
  }
  async function loadStaffDirectory({seedIfMissing=true}={}){
    try{
      const res=await fetch(`/api/state?scope=${encodeURIComponent(STAFF_DIRECTORY_SCOPE)}`,{cache:'no-store',headers:{accept:'application/json'}});
      if(res.status===404){if(seedIfMissing){await saveStaffDirectory(DEFAULT_EMPLOYEES.map(staffRecord));}return;}
      if(!res.ok)throw new Error(`HTTP ${res.status}`);const row=await res.json(),version=Number(row.version||0),payload=row.payload||{};
      const needsDepartmentMigration=Array.isArray(payload.staff)&&payload.staff.some(r=>normalizeDepartment(r.department,r.position)!==String(r.department||''));
      if(needsDepartmentMigration){await saveStaffDirectory(payload.staff);return}
      if(version>staffDirectoryVersion)applyStaffDirectory(payload,version);
    }catch(err){if(staffEditorStatus&&staffEditorModal?.classList.contains('open')){staffEditorStatus.className='staff-editor-status error';staffEditorStatus.textContent=location.protocol==='file:'?'Deploy to Netlify to save staff on the server.':'Shared staff database is temporarily unavailable.'}}
  }
  function renderStaffDirectory(){
    if(!staffDirectoryList)return;
    if(!employees.length){staffDirectoryList.innerHTML='<div class="ops-note">No staff yet. Click + Add staff.</div>';return;}
    staffDirectoryList.innerHTML=employees.map(emp=>{const lines=workloadLines(emp.workload),preview=lines.slice(0,2).map(line=>`<i>${esc(line)}</i>`).join('');return `<div class="staff-directory-row" data-edit-staff="${emp.id}" role="button" tabindex="0"><div class="staff-directory-avatar">${initials(emp.name)}</div><div class="staff-directory-copy"><b>${esc(emp.name)}</b><span>${esc(emp.position)} · ${esc(emp.department)}</span>${preview?`<div class="staff-workload-lines">${preview}</div>`:''}</div><span class="staff-directory-action">✎</span></div>`}).join('');
  }
  function openStaffEditor(emp=null){
    if(!staffEditorModal)return;editingStaffId=emp?Number(emp.id):null;staffEditorTitle.textContent=emp?'Edit Staff':'Add Staff';staffNameInput.value=emp?.name||'';staffRoleInput.value=emp?.position||'';staffDepartmentInput.value=normalizeDepartment(emp?.department,emp?.position);staffRemoveBtn.hidden=!emp;staffEditorStatus.className='staff-editor-status';staffEditorStatus.textContent='Staff details sync to everyone. Workload is updated separately from the Workload tab.';staffEditorModal.classList.add('open');staffEditorModal.setAttribute('aria-hidden','false');setTimeout(()=>staffNameInput.focus(),40);
  }
  function closeStaffEditor(){if(!staffEditorModal)return;staffEditorModal.classList.remove('open');staffEditorModal.setAttribute('aria-hidden','true');editingStaffId=null}
  async function saveStaffEditor(){
    const name=staffNameInput.value.trim(),position=staffRoleInput.value.trim(),department=staffDepartmentInput.value;if(!name){staffEditorStatus.className='staff-editor-status error';staffEditorStatus.textContent='Staff name is required.';staffNameInput.focus();return}if(!position){staffEditorStatus.className='staff-editor-status error';staffEditorStatus.textContent='Position / role is required.';staffRoleInput.focus();return}
    const records=serializeStaffDirectory(),existing=editingStaffId?employeeById[Number(editingStaffId)]:null,isNew=!existing;const record={id:editingStaffId||Math.max(0,...records.map(r=>Number(r.id)||0))+1,name,position,department,workload:workloadLines(existing?.workload||[])};const at=records.findIndex(r=>Number(r.id)===Number(editingStaffId));if(at>=0)records[at]=record;else records.push(record);
    staffSaveBtn.disabled=true;staffEditorStatus.className='staff-editor-status';staffEditorStatus.textContent='Saving to server…';try{await saveStaffDirectory(records);await postOfficeEvent({eventType:isNew?'staff_added':'staff_updated',title:isNew?`${name} · Staff added`:`${name} · Staff updated`,message:isNew?`${position} added to the shared office`:`Staff details updated · ${position}`,employeeId:record.id,metadata:{name,position,department},dedupeKey:`staff:${isNew?'add':'edit'}:${record.id}:${hashString(`${name}|${position}|${department}|${Date.now()}`)}`});staffEditorStatus.className='staff-editor-status ok';staffEditorStatus.textContent='Saved. Live Activity and everyone online will receive this update.';setTimeout(closeStaffEditor,520)}catch(err){staffEditorStatus.className='staff-editor-status error';staffEditorStatus.textContent=err.message||'Could not save staff.'}finally{staffSaveBtn.disabled=false}
  }
  async function removeStaffEditor(){
    const emp=employeeById[Number(editingStaffId)];if(!emp)return;if(!confirm(`Remove ${emp.name} from the shared staff directory?`))return;staffRemoveBtn.disabled=true;staffEditorStatus.className='staff-editor-status';staffEditorStatus.textContent='Removing from server…';try{const removed={id:emp.id,name:emp.name,position:emp.position};const records=serializeStaffDirectory().filter(r=>Number(r.id)!==Number(editingStaffId));await saveStaffDirectory(records);await postOfficeEvent({eventType:'staff_removed',title:`${removed.name} · Staff removed`,message:`${removed.position} removed from the shared office`,employeeId:removed.id,metadata:removed,dedupeKey:`staff:remove:${removed.id}:${Date.now()}`});closeStaffEditor()}catch(err){staffEditorStatus.className='staff-editor-status error';staffEditorStatus.textContent=err.message||'Could not remove staff.'}finally{staffRemoveBtn.disabled=false}
  }
  function openWorkloadEditor(emp){
    if(!workloadEditorModal||!emp)return;editingWorkloadId=Number(emp.id);workloadEditorTitle.textContent='Update Workload';workloadEditorAvatar.textContent=initials(emp.name);workloadEditorName.textContent=emp.name;workloadEditorRole.textContent=`${emp.position} · ${emp.department}`;workloadEditorInput.value=workloadLines(emp.workload).join('\n');workloadEditorStatus.className='staff-editor-status';workloadEditorStatus.textContent='Workload only. Add/remove staff remains in the Staff tab.';workloadEditorModal.classList.add('open');workloadEditorModal.setAttribute('aria-hidden','false');setTimeout(()=>workloadEditorInput.focus(),40);
  }
  function closeWorkloadEditor(){if(!workloadEditorModal)return;workloadEditorModal.classList.remove('open');workloadEditorModal.setAttribute('aria-hidden','true');editingWorkloadId=null}
  async function saveWorkloadOnly(){
    const emp=employeeById[Number(editingWorkloadId)];if(!emp)return;const next=workloadLines(workloadEditorInput.value),before=workloadLines(emp.workload);if(JSON.stringify(next)===JSON.stringify(before)){workloadEditorStatus.className='staff-editor-status ok';workloadEditorStatus.textContent='No workload changes to save.';setTimeout(closeWorkloadEditor,420);return}
    workloadEditorSave.disabled=true;workloadEditorStatus.className='staff-editor-status';workloadEditorStatus.textContent='Saving workload to server…';try{const records=serializeStaffDirectory(),at=records.findIndex(r=>Number(r.id)===emp.id);if(at<0)throw new Error('Staff not found');records[at]={...records[at],workload:next};await saveStaffDirectory(records);const summary=next.length?`${next[0]}${next.length>1?` +${next.length-1} more`:''}`:'Workload cleared';await postOfficeEvent({eventType:'workload_updated',title:`${emp.name} · Workload updated`,message:summary,employeeId:emp.id,metadata:{workload:next,count:next.length},dedupeKey:`workload:${emp.id}:${hashString(JSON.stringify(next))}:${Date.now()}`});workloadEditorStatus.className='staff-editor-status ok';workloadEditorStatus.textContent='Saved. Character notification, Live Activity and other browsers updated.';setTimeout(closeWorkloadEditor,650)}catch(err){workloadEditorStatus.className='staff-editor-status error';workloadEditorStatus.textContent=err.message||'Could not save workload.'}finally{workloadEditorSave.disabled=false}
  }
  function startStaffDirectorySync(){
    loadStaffDirectory({seedIfMissing:true});if(staffPollTimer)clearInterval(staffPollTimer);staffPollTimer=setInterval(()=>{if(!document.hidden&&!staffEditorModal?.classList.contains('open')&&!workloadEditorModal?.classList.contains('open'))loadStaffDirectory({seedIfMissing:false})},2500);
  }

  function polygonBounds(points){const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);return{x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}}

  function drawBase(){
    baseLayer.innerHTML='';
    const main=floorOutline.map(p=>iso(p.x,p.y));
    const stair=stairOutline.map(p=>iso(p.x,p.y));
    // Layered ambient shadow gives the whole office a more grounded 3D footprint.
    baseLayer.append(el('polygon',{points:poly(main.map(p=>({x:p.x+12,y:p.y+18}))),class:'floor-shadow floor-shadow-deep'}));
    baseLayer.append(el('polygon',{points:poly(main.map(p=>({x:p.x+5,y:p.y+8}))),class:'floor-shadow floor-shadow-soft'}));
    baseLayer.append(el('polygon',{points:poly(stair.map(p=>({x:p.x+9,y:p.y+14}))),class:'floor-shadow floor-shadow-soft'}));
    baseLayer.append(el('polygon',{points:poly(main),class:'floor-top-3d'}));
    baseLayer.append(el('polygon',{points:poly(stair),class:'stair-top-3d'}));
    const d=16;
    const sideFaces=[
      [main[1],main[2],'floor-slab-side floor-slab-side-a'],
      [main[2],main[3],'floor-slab-side floor-slab-side-b'],
      [main[3],main[4],'floor-slab-side floor-slab-side-b'],
      [stair[0],stair[3],'floor-slab-side floor-slab-side-a']
    ];
    sideFaces.forEach(([a,b,cls])=>baseLayer.append(el('polygon',{points:poly([a,b,{x:b.x,y:b.y+d},{x:a.x,y:a.y+d}]),class:cls})));
    // Crisp lower edge prevents the slab from reading as a flat drop-shadow.
    sideFaces.forEach(([a,b])=>baseLayer.append(el('line',{x1:a.x,y1:a.y+d,x2:b.x,y2:b.y+d,class:'floor-slab-edge'})));
  }

  function box(x,y,w,h,z=7,cls=''){
    const g=el('g',{class:`furniture ${cls}`});
    const t=[iso(x,y,z),iso(x+w,y,z),iso(x+w,y+h,z),iso(x,y+h,z)];
    const b=[iso(x,y),iso(x+w,y),iso(x+w,y+h),iso(x,y+h)];
    g.append(el('polygon',{points:poly(b.map(p=>({x:p.x+2.4,y:p.y+3.1}))),class:'furn-shadow'}));
    g.append(el('polygon',{points:poly([t[1],t[2],b[2],b[1]]),class:'furn-side furn-side-a'}));
    g.append(el('polygon',{points:poly([t[2],t[3],b[3],b[2]]),class:'furn-side furn-side-b'}));
    g.append(el('polygon',{points:poly(t),class:'furn-top'}));
    return g;
  }

  function addDesk(x,y,dept,s=.8){
    const g=box(x,y,2.3*s,1.3*s,8,'desk');g.dataset.dept=dept||'';
    const p=iso(x+1.15*s,y+.46*s,20);
    g.append(el('rect',{x:p.x-7*s,y:p.y-5*s,width:14*s,height:8*s,rx:1.3,class:'monitor-body'}));
    g.append(el('rect',{x:p.x-5.6*s,y:p.y-3.7*s,width:11.2*s,height:5.4*s,rx:1,class:'monitor-screen'}));
    const c=iso(x+1.05*s,y+1.75*s);
    g.append(el('ellipse',{cx:c.x,cy:c.y+2,rx:6*s,ry:2.8*s,class:'chair-seat'}));
    g.append(el('line',{x1:c.x,y1:c.y+2,x2:c.x,y2:c.y+8,class:'chair-leg'}));
    furnitureLayer.append(g);
  }


  function addPlanLabel(room){
    if(room.hideLabel)return;
    const b=polygonBounds(room.poly);const p=iso(b.x+b.w/2,b.y+b.h/2,8);
    const t=el('text',{x:p.x,y:p.y,class:'plan-label','data-room-label':room.id});t.textContent=room.name;
    roomLabelNodes.set(room.id,t);
    labelsLayer.append(t);
  }

  function addRoleScreenUI(group,cx,cy,role=''){
    const key=role.toLowerCase();
    const ui=el('g',{class:`role-screen-ui role-${key.replace(/[^a-z]+/g,'-')}`});
    if(key.includes('designer')){
      ui.append(el('rect',{x:cx-7.2,y:cy-2.6,width:2.1,height:5.1,rx:.45,class:'screen-ui-panel'}));
      ui.append(el('rect',{x:cx-4.3,y:cy-2.55,width:9.9,height:5.0,rx:.5,class:'screen-ui-canvas'}));
      ui.append(el('path',{d:`M${cx-3.2} ${cy+1.45} L${cx-.5} ${cy-1.15} L${cx+1.3} ${cy+.15} L${cx+4.25} ${cy-1.55}`,class:'screen-ui-accent-line'}));
      ui.append(el('circle',{cx:cx+3.9,cy:cy+1.25,r:.8,class:'screen-ui-accent'}));
    }else if(key.includes('sales')){
      ui.append(el('rect',{x:cx-7.1,y:cy-2.55,width:14.2,height:1.25,rx:.5,class:'screen-ui-header'}));
      [-.5,.8,2.1].forEach((dy,i)=>{ui.append(el('circle',{cx:cx-5.8,cy:cy+dy,r:.55,class:i===0?'screen-ui-accent':'screen-ui-dot'}));ui.append(el('line',{x1:cx-4.5,y1:cy+dy,x2:cx+5.5-(i*.7),y2:cy+dy,class:'screen-ui-line'}));});
    }else if(key.includes('admin')||key.includes('assistant')){
      ui.append(el('rect',{x:cx-4.8,y:cy-2.8,width:9.6,height:5.6,rx:.55,class:'screen-ui-doc'}));
      [-1.3,-.2,.9].forEach((dy,i)=>ui.append(el('line',{x1:cx-3.2,y1:cy+dy,x2:cx+3.4-(i*.8),y2:cy+dy,class:'screen-ui-line'})));
      ui.append(el('rect',{x:cx+1.8,y:cy-2.25,width:1.8,height:1.05,rx:.3,class:'screen-ui-accent'}));
    }else if(key.includes('boss')){
      [-4.7,-2.5,-.3].forEach((dx,i)=>ui.append(el('rect',{x:cx+dx,y:cy+1.8-(i+1)*1.2,width:1.35,height:(i+1)*1.2,rx:.28,class:'screen-ui-bar'})));
      ui.append(el('path',{d:`M${cx-.5} ${cy+1.4} L${cx+1.7} ${cy-.45} L${cx+3.0} ${cy+.15} L${cx+5.4} ${cy-2.0}`,class:'screen-ui-accent-line'}));
      ui.append(el('circle',{cx:cx+5.4,cy:cy-2.0,r:.6,class:'screen-ui-accent'}));
    }else{
      ui.append(el('line',{x1:cx-5.7,y1:cy-.7,x2:cx+4.7,y2:cy-.7,class:'screen-ui-line'}));
      ui.append(el('line',{x1:cx-5.7,y1:cy+.8,x2:cx+2.6,y2:cy+.8,class:'screen-ui-line'}));
    }
    group.append(ui);
  }

  function addDeskHit(x,y,w,h,employee=null,deskId=''){
    const z=8.8,pts=[iso(x,y,z),iso(x+w,y,z),iso(x+w,y+h,z),iso(x,y+h,z)];
    const hit=el('polygon',{points:poly(pts),class:'desk-hit','data-desk-id':deskId,'data-employee-id':employee?.id||''});
    hit.setAttribute('aria-label',employee?`${employee.name}, ${employee.position}, ${employee.currentJob||'No active job'}`:`${deskId || 'Desk'} available`);
    furnitureLayer.append(hit);
  }

  function addPremiumMonitor(monitorX,monitorY,z,employee=null,compact=false){
    const base=iso(monitorX,monitorY,z-10.2);
    const screen=iso(monitorX,monitorY,z);
    const width=compact?18.4:19.6,height=compact?8.7:9.3;
    const g=el('g',{class:'premium-monitor-rig minimalist-monitor-rig'});
    // Minimalist monitor: slim shell, narrow bezel, single stem and compact foot.
    g.append(el('rect',{x:screen.x-width/2+.75,y:screen.y-height/2+.65,width,height,rx:1.9,class:'premium-monitor-back minimalist-monitor-back'}));
    g.append(el('line',{x1:base.x,y1:base.y-.7,x2:screen.x,y2:screen.y+height/2-1.2,class:'modern-monitor-stand minimalist-monitor-stand'}));
    g.append(el('rect',{x:base.x-3.9,y:base.y+.55,width:7.8,height:1.55,rx:.8,class:'modern-monitor-base minimalist-monitor-base'}));
    g.append(el('rect',{x:screen.x-width/2,y:screen.y-height/2,width,height,rx:2.0,class:'modern-monitor premium-monitor minimalist-monitor'}));
    g.append(el('rect',{x:screen.x-width/2+.9,y:screen.y-height/2+.85,width:width-1.8,height:height-1.75,rx:1.2,class:'modern-screen premium-screen minimalist-screen'}));
    addRoleScreenUI(g,screen.x,screen.y,employee?.position||'');
    g.append(el('circle',{cx:screen.x+width/2-1.4,cy:screen.y+height/2-1.0,r:.38,class:'pc-led minimalist-monitor-led'}));
    furnitureLayer.append(g);
  }

  function addDeskAccessories(x,y,w,h,facing='left',employee=null,staff=false){
    const kbX=facing==='left'?x+w*.35:x+w*.65, kbY=y+h*.68;
    const kb=box(kbX-.44,kbY-.12,.88,.22,staff?5.34:5.54,staff?'keyboard staff-keyboard minimalist-keyboard':'keyboard minimalist-keyboard');
    furnitureLayer.append(kb);
    const mouse=iso(kbX+.58,kbY+.02,staff?5.42:5.62);
    furnitureLayer.append(el('ellipse',{cx:mouse.x,cy:mouse.y,rx:1.45,ry:.72,class:'mouse-pad minimalist-mouse'}));
  }

  function addPCWorkstation(x,y,w=2.25,h=1.8,facing='left',employee=null,deskId=''){
    const desk=box(x,y,w,h,4.7,'pc-workstation premium-workstation minimalist-workstation');
    desk.querySelector('.furn-top')?.classList.add('pc-desk-top','premium-desk-top','minimalist-desk-top');
    desk.querySelectorAll('.furn-side').forEach(n=>n.classList.add('premium-desk-side','minimalist-desk-side'));
    furnitureLayer.append(desk);
    // Slim open-frame desk, intentionally free of chairs and bulky pedestals.
    furnitureLayer.append(box(x+.18,y+.18,.13,h-.36,3.85,'premium-desk-leg minimalist-desk-leg'));
    furnitureLayer.append(box(x+w-.31,y+.18,.13,h-.36,3.85,'premium-desk-leg minimalist-desk-leg'));
    const brace=box(x+.34,y+h-.22,w-.68,.09,3.92,'premium-desk-rail minimalist-desk-brace');furnitureLayer.append(brace);

    const monitorX=facing==='left'?x+w*.66:x+w*.34;
    const monitorY=y+h*.40;
    addPremiumMonitor(monitorX,monitorY,17.4,employee,false);
    addDeskAccessories(x,y,w,h,facing,employee,false);
    addDeskHit(x,y,w,h,employee,deskId);
  }

  function addStaffBenchStation(x,y,w=2.9,h=1.7,facing='left',employee=null,deskId=''){
    const desk=box(x,y,w,h,4.6,'staff-station premium-workstation minimalist-workstation');
    desk.querySelector('.furn-top')?.classList.add('staff-station-top','premium-desk-top','minimalist-desk-top');
    desk.querySelectorAll('.furn-side').forEach(n=>n.classList.add('staff-station-side','premium-desk-side','minimalist-desk-side'));
    furnitureLayer.append(desk);

    const leg1=box(x+.19,y+.18,.12,h-.36,3.78,'staff-leg premium-desk-leg minimalist-desk-leg');
    const leg2=box(x+w-.31,y+.18,.12,h-.36,3.78,'staff-leg premium-desk-leg minimalist-desk-leg');
    furnitureLayer.append(leg1); furnitureLayer.append(leg2);
    const brace=box(x+.38,y+h-.21,w-.76,.08,3.84,'premium-desk-rail minimalist-desk-brace');furnitureLayer.append(brace);

    const screenX=facing==='left'?x+w*.68:x+w*.32;
    const screenY=y+h*.40;
    addPremiumMonitor(screenX,screenY,16.7,employee,true);
    addDeskAccessories(x,y,w,h,facing,employee,true);
    addDeskHit(x,y,w,h,employee,deskId);
  }

  function furnish(room){
    if(room.kind==='staff'){
      staffDeskAssignments.forEach(d=>addStaffBenchStation(d.x,d.y,2.9,1.7,d.facing,employeeById[d.employeeId],d.deskId));
    }
    if(room.kind==='showroom'){
      const bench=box(13.5,31.5,6.4,.55,5,'sofa');
      bench.querySelector('.furn-top')?.classList.add('sofa-top');
      bench.querySelectorAll('.furn-side').forEach(n=>n.classList.add('sofa-side'));
      furnitureLayer.append(bench);
      furnitureLayer.append(box(19.6,26.5,1.7,1.1,5,'display-plinth'));
      furnitureLayer.append(box(16.9,27.1,1.35,.9,4.5,'display-plinth'));
    }
    if(room.kind==='office'){
      addPCWorkstation(14.2,39.2,2.8,2.05,'left',employeeById[1],'B01');
      addPCWorkstation(19.2,43.0,2.45,1.7,'right',employeeById[2],'B02');
    }
    if(room.kind==='storage'){
      furnitureLayer.append(box(13.0,49.4,8.2,1.4,8,'cabinet'));
      furnitureLayer.append(box(13.0,54.0,7.0,1.2,8,'cabinet'));
    }
    if(room.kind==='pantry'){
      furnitureLayer.append(box(1.0,38.0,5.4,1.15,8,'counter'));
      furnitureLayer.append(box(2.0,44.5,3.0,1.5,6,'pantry-table'));
    }
    if(room.kind==='restroom'){
      const b=polygonBounds(room.poly);
      furnitureLayer.append(box(b.x+.6,b.y+1.1,b.w-1.2,1.1,6,'cabinet'));
    }
    if(room.kind==='prayer'){
      [9.2,13.1,17.0].forEach(x=>furnitureLayer.append(box(x,62.1,3.0,.45,2,'meeting-table')));
    }
    if(room.kind==='stair'){
      for(let i=0;i<5;i++){
        const a=iso(.35+i*.78,2.0+i*.75),b=iso(4.6,2.0+i*.75);
        wallsLayer.append(el('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:'stair-step-edge'}));
      }
    }
  }

  function addWall(x1,y1,x2,y2,cls='plan-wall'){
    const wallH=cls==='outer-wall'?17:13;
    const a=iso(x1,y1,0),b=iso(x2,y2,0),bt=iso(x2,y2,wallH),at=iso(x1,y1,wallH);
    const orientation=Math.abs(x2-x1)<.001?'wall-face-a':'wall-face-b';
    const faceClass=`wall-face-3d ${cls==='outer-wall'?'outer-wall-face':'inner-wall-face'} ${orientation}`;
    wallsLayer.append(el('polygon',{points:poly([a,b,bt,at]),class:faceClass}));
    wallsLayer.append(el('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:'wall-foot-edge'}));
    wallsLayer.append(el('line',{x1:at.x,y1:at.y,x2:bt.x,y2:bt.y,class:`${cls} wall-top-edge`}));
  }

  function addDoorArc(cx,cy,r,startDeg,endDeg,hingeX,hingeY,leafX,leafY){
    const pts=[];for(let i=0;i<=12;i++){const a=(startDeg+(endDeg-startDeg)*i/12)*Math.PI/180;pts.push(iso(cx+r*Math.cos(a),cy+r*Math.sin(a),2))}
    wallsLayer.append(el('polyline',{points:poly(pts),class:'door-arc'}));const h=iso(hingeX,hingeY,2),l=iso(leafX,leafY,2);wallsLayer.append(el('line',{x1:h.x,y1:h.y,x2:l.x,y2:l.y,class:'door-leaf'}));
  }

  function addDimension(){
    const y=-1.55;
    const a=iso(5,y), b=iso(23,y);
    wallsLayer.append(el('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:'dimension-line'}));
    [a,b].forEach(p=>wallsLayer.append(el('line',{x1:p.x,y1:p.y-5,x2:p.x,y2:p.y+5,class:'dimension-tick'})));
  }

  function drawWalls(){
    wallsLayer.innerHTML='';
    // Outer main structure
    addWall(5,0,23,0,'outer-wall');addWall(23,0,23,70,'outer-wall');addWall(23,70,0,70,'outer-wall');
    addWall(0,70,0,36,'outer-wall');addWall(0,36,5,36,'outer-wall');addWall(5,36,5,32.2,'outer-wall');
    addWall(5,32.2,8.5,32.2,'outer-wall');addWall(8.5,32.2,8.5,24.4,'outer-wall');addWall(8.5,24.4,5,24.4,'outer-wall');addWall(5,24.4,5,0,'outer-wall');
    // Stair projection
    addWall(0,1.3,5,1.3,'outer-wall');addWall(0,1.3,0,8.2,'outer-wall');addWall(0,8.2,5,8.2,'outer-wall');
    // Staff/showroom divider only on right, as in reference
    addWall(12.0,24.4,23,24.4,'outer-wall');
    // Pantry and right-hand rooms
    addWall(0,36,7.6,36,'outer-wall');addWall(7.6,36,7.6,53.6,'outer-wall');
    addWall(7.6,56.1,0,56.1,'outer-wall');
    addWall(11.6,36,23,36,'outer-wall');
    addWall(11.6,36,11.6,44.0,'outer-wall');addWall(11.6,46.6,11.6,47.9,'outer-wall');
    addWall(11.6,47.9,23,47.9,'outer-wall');
    addWall(11.6,47.9,11.6,56.0,'outer-wall');addWall(11.6,58.5,11.6,59.3,'outer-wall');
    addWall(11.6,59.3,23,59.3,'outer-wall');
    // Lower toilet/prayer zone
    addWall(0,59.3,2.8,59.3,'outer-wall');addWall(4.5,59.3,6.2,59.3,'outer-wall');addWall(7.6,59.3,23,59.3,'outer-wall');
    addWall(3.8,59.3,3.8,65.6,'outer-wall');addWall(7.6,59.3,7.6,66.2,'outer-wall');addWall(7.6,68.8,7.6,70,'outer-wall');
    addWall(0,65.6,7.6,65.6,'outer-wall');
    // Door swings matching reference orientation
    addDoorArc(8.5,29.6,3.3,180,270,8.5,29.6,5.2,29.6);
    addDoorArc(7.6,53.6,2.5,90,180,7.6,53.6,7.6,56.1);
    addDoorArc(11.6,44.0,2.6,0,90,11.6,44.0,14.2,44.0);
    addDoorArc(11.6,56.0,2.5,0,90,11.6,56.0,14.1,56.0);
    addDoorArc(2.8,59.3,1.7,0,90,2.8,59.3,2.8,61.0);
    addDoorArc(4.5,59.3,1.7,0,90,4.5,59.3,4.5,61.0);
    addDoorArc(7.6,66.2,2.6,0,90,7.6,66.2,10.2,66.2);
    // Stair curved edge cue
    const arc=[];for(let i=0;i<=18;i++){const a=(100+160*i/18)*Math.PI/180;arc.push(iso(4.2+3.1*Math.cos(a),4.6+3.1*Math.sin(a),2))}wallsLayer.append(el('polyline',{points:poly(arc),class:'door-arc stair-arc'}));
    addDimension();
  }

  function drawRooms(){
    roomsLayer.replaceChildren();furnitureLayer.replaceChildren();labelsLayer.replaceChildren();
    roomNodes.clear();roomLabelNodes.clear();
    const roomFrag=document.createDocumentFragment();
    rooms.forEach(room=>{
      const g=el('g',{class:'room',id:`room-${room.id}`,'data-room':room.id,'data-dept':room.dept||''});
      g.append(el('polygon',{points:poly(isoPoly(room.poly)),fill:room.tone,class:'room-floor'}));
      roomNodes.set(room.id,g);roomFrag.append(g);furnish(room);addPlanLabel(room);
    });
    roomsLayer.append(roomFrag);drawWalls();
  }

  function drawEmployees(){
    employeesLayer.replaceChildren();employeeNodes.clear();
    const frag=document.createDocumentFragment();
    employees.forEach(e=>{
      const p=iso(e.x,e.y),g=el('g',{class:`employee ${employeeClass(e)}${workloadNoticeIds.has(e.id)?' workload-alert':''}`,id:`emp-${e.id}`,'data-id':e.id,'data-dept':e.department,transform:`translate(${p.x} ${p.y})`,tabindex:'0'}),shell=el('g',{class:'avatar-shell'});
      shell.append(el('ellipse',{cx:0,cy:7,rx:6,ry:2.6,class:'employee-shadow'}));
      shell.append(el('circle',{cx:0,cy:-8,r:5.2,class:'head'}));
      shell.append(el('path',{d:'M-4.8 -9.2 Q0 -15 4.8 -9.2 L4.2 -11 Q0 -15 -4.2 -11 Z',class:'hair'}));
      shell.append(el('path',{d:'M-5 -1.5 Q0 -5.5 5 -1.5 L4.3 7 L-4.3 7 Z',fill:bodyColor(e.department)}));
      shell.append(el('circle',{cx:0,cy:-4,r:10,class:'accent-ring'}));
      shell.append(el('circle',{cx:6.5,cy:-12,r:2.3,class:'status-dot',fill:statusColor(e.status)}));
      const notice=el('g',{class:'workload-notice',transform:'translate(10 -23)'});
      notice.append(el('circle',{cx:0,cy:0,r:5.2,class:'workload-notice-bg'}));
      notice.append(el('path',{d:'M-2.8 1.4 H2.8 L2.1 .2 V-1.4 A2.1 2.1 0 0 0 -2.1 -1.4 V.2 Z M-1 2.4 Q0 3.2 1 2.4',class:'workload-notice-bell'}));
      g.append(notice);
      g.append(el('circle',{cx:0,cy:-3,r:15.2,class:'selection-ring'}));
      g.append(shell);
      const w=Math.max(27,e.name.length*5+12);g.append(el('rect',{x:-w/2,y:10.7,width:w,height:11.4,rx:5.7,class:'employee-name-bg'}));
      const t=el('text',{x:0,y:18.6,class:'employee-name'});t.textContent=e.name;g.append(t);
      // Direct character interaction. Prevent the SVG pan layer from stealing a tap/click.
      g.addEventListener('pointerdown',ev=>ev.stopPropagation());
      g.addEventListener('click',ev=>{ev.stopPropagation();followCharacter(e)});
      g.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();ev.stopPropagation();followCharacter(e)}});
      employeeNodes.set(e.id,g);frag.append(g);
    });
    employeesLayer.append(frag);
  }

  function renderNav(){if(!deptNav)return;deptNav.innerHTML=deptOrder.map(d=>`<button class="dept-tab${d==='All'?' active':''}" data-dept="${d}">${d}<span class="count">${deptCounts[d]}</span></button>`).join('')}
  function countStatuses(list){return list.reduce((a,e)=>{const status=effectiveStatus(e);a[status]=(a[status]||0)+1;return a},{})}
  function animateNum(node,to){const from=Number(node.textContent)||0;if(from===to)return;const start=performance.now(),dur=360;function step(now){const t=Math.max(0,Math.min(1,(now-start)/dur)),e=1-Math.pow(1-t,3);node.textContent=Math.round(from+(to-from)*e);if(t<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
  function updateStats(){const list=activeDept==='All'?employees:employees.filter(e=>e.department===activeDept),counts=countStatuses(list);$$('.stat-num').forEach(n=>animateNum(n,counts[n.dataset.stat]||0))}
  function activityFeedGlyph(type=''){const t=String(type||'').toLowerCase();if(t.includes('chat'))return'✦';if(t.includes('workload'))return'≡';if(t.includes('job_sync'))return'↻';if(t.includes('job'))return'▦';if(t.includes('artwork')||t.includes('design'))return'◇';if(t.includes('production'))return'▣';if(t.includes('order'))return'＋';if(t.includes('staff'))return'●';if(t.includes('presence'))return'↝';if(t.includes('time_brief'))return'◷';return'•'}
  function groupedActivityFeed(){const out=[];for(const a of activityFeed){const key=`${a.type||''}|${a.employeeId||''}|${a.title||''}|${a.text||''}`,prev=out.find(x=>x._key===key&&Math.abs((x.createdAt||0)-(a.createdAt||0))<10*60000);if(prev){prev.groupCount=(prev.groupCount||1)+1;prev.createdAt=Math.max(prev.createdAt||0,a.createdAt||0)}else out.push({...a,_key:key,groupCount:1})}return out}
  function renderFeed(){if(!activityList)return;const feed=groupedActivityFeed(),count=livePanel&&livePanel.classList.contains('expanded')?feed.length:5;if(!feed.length){activityList.innerHTML='<div class="ops-note clean-empty">No office activity yet.</div>';return}activityList.innerHTML=feed.slice(0,count).map(a=>{const at=a.createdAt||Date.now(),kind=activityTypeLabel(a.type||a.eventType||'office'),system=String(a.type||'').includes('sync');return `<div class="feed-item${a.employeeId?' feed-clickable':''}${a.realtime?' realtime':''}${system?' feed-system':''}" ${a.employeeId?`data-employee-id="${a.employeeId}" role="button" tabindex="0"`:''} title="${esc(new Date(at).toLocaleString('en-MY'))}"><div class="feed-avatar feed-glyph">${activityFeedGlyph(a.type)}</div><div class="feed-copy"><div class="feed-title-row"><b>${esc(a.title)}${a.groupCount>1?` <small>×${a.groupCount}</small>`:''}</b><em>${esc(kind)}</em></div><span>${esc(a.text)}</span></div><span class="feed-time"><b>${esc(clockTime(at))}</b><small>${esc(relativeEventTime(at))}</small></span></div>`}).join('')}
  function positionBubbleForEmployee(fo,emp){if(!fo||!emp)return;const p=iso(emp.visualX??emp.x,emp.visualY??emp.y);const w=Number(fo.getAttribute('width'))||190;fo.setAttribute('x',p.x-w/2);fo.setAttribute('y',p.y-96)}
  function showBubble(emp,text,{kind='activity',duration=6800}={}){if(!emp||!text)return null;const existing=bubblesLayer.querySelector(`.activity-bubble-wrap[data-employee-id="${emp.id}"][data-bubble-kind="${kind}"]`);if(existing)existing.remove();const fo=el('foreignObject',{x:0,y:0,width:210,height:86,class:`activity-bubble-wrap bubble-${kind}`,'data-employee-id':emp.id,'data-bubble-kind':kind}),div=document.createElement('div');div.setAttribute('xmlns','http://www.w3.org/1999/xhtml');div.className='activity-bubble';div.textContent=String(text).slice(0,220);fo.append(div);positionBubbleForEmployee(fo,emp);bubblesLayer.append(fo);if(duration>0)setTimeout(()=>fo.isConnected&&fo.remove(),duration);return fo}
  function updateEmployeeBubbles(emp){bubblesLayer.querySelectorAll(`.activity-bubble-wrap[data-employee-id="${emp.id}"]`).forEach(fo=>positionBubbleForEmployee(fo,emp))}
  function workloadBubbleText(emp){const lines=workloadLines(emp?.workload);if(lines.length)return `Workload: ${lines[0]}${lines.length>1?` +${lines.length-1} more`:''}`;const active=activeJobsForEmployee(emp||{})[0];if(active)return `Workload: ${active.ref||'Job'} · ${active.title||active.customer||'Active job'}`;return emp?.currentJob?`Workload: ${emp.currentJob}`:''}
  function scheduleRandomWorkloadBubble(){if(workloadBubbleTimer)clearTimeout(workloadBubbleTimer);const delay=13000+Math.random()*12000;workloadBubbleTimer=setTimeout(()=>{workloadBubbleTimer=null;if(!document.hidden){const candidates=employees.filter(emp=>workloadBubbleText(emp));if(candidates.length){const emp=candidates[Math.floor(Math.random()*candidates.length)];showBubble(emp,workloadBubbleText(emp),{kind:'workload',duration:7600})}}scheduleRandomWorkloadBubble()},delay)}
  function pushActivity(a,emp=null){activityFeed.unshift({...a,createdAt:a.createdAt||Date.now(),type:a.type||a.eventType||'office',employeeId:a.employeeId||emp?.id||null});if(activityFeed.length>18)activityFeed.length=18;renderFeed();if(emp)showBubble(emp,a.text||a.title)}

  function renderChatSenders(){
    if(!chatSenderSelect)return;
    let stored='';try{stored=localStorage.getItem('ksChatSenderId')||''}catch(_){}const previous=chatSenderSelect.value||stored||'';
    chatSenderSelect.innerHTML=`<option value="">Office</option>`+employees.map(emp=>`<option value="${emp.id}">${esc(emp.name)} · ${esc(emp.position)}</option>`).join('');
    if(previous===''||employeeById[Number(previous)])chatSenderSelect.value=previous;else chatSenderSelect.value='';
  }
  function chatTime(value){const d=new Date(value);if(Number.isNaN(d.getTime()))return'';return d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
  function renderChat(list,scroll=true){
    if(!chatMessages)return;
    if(!list.length){chatMessages.innerHTML='<div class="chat-empty">No messages yet. Start the office chat.</div>';return}
    chatMessages.innerHTML=list.map(m=>`<div class="chat-message"><div class="chat-avatar">${esc(initials(m.senderName||'Office'))}</div><div class="chat-copy"><div class="chat-meta"><b>${esc(m.senderName||'Office')}</b><time>${esc(chatTime(m.createdAt))}</time></div><div class="chat-bubble">${esc(m.message||'')}</div></div></div>`).join('');
    if(scroll)chatMessages.scrollTop=chatMessages.scrollHeight;
  }
  function setChatUnread(value){chatUnreadCount=Math.max(0,value);if(!chatUnread)return;chatUnread.textContent=String(Math.min(chatUnreadCount,99));chatUnread.hidden=chatUnreadCount===0}
  function setChatOpen(open){chatOpen=Boolean(open);officeChat?.classList.toggle('open',chatOpen);officeChat?.setAttribute('aria-hidden',String(!chatOpen));chatLauncher?.setAttribute('aria-expanded',String(chatOpen));if(chatOpen){setChatUnread(0);setTimeout(()=>{if(chatMessages)chatMessages.scrollTop=chatMessages.scrollHeight;chatInput?.focus()},40)}}
  async function pullChat({initial=false}={}){
    if(!chatMessages)return;
    try{
      const res=await fetch(`${CHAT_API}?limit=60`,{cache:'no-store',headers:{accept:'application/json'}});if(!res.ok)throw new Error(`HTTP ${res.status}`);const data=await res.json(),list=Array.isArray(data.messages)?data.messages:[];const newest=list.length?Math.max(...list.map(m=>Number(m.id)||0)):0;
      if(chatInitialized&&newest>chatLastId){const fresh=list.filter(m=>(Number(m.id)||0)>chatLastId);if(!chatOpen)setChatUnread(chatUnreadCount+fresh.length);fresh.slice(-3).forEach(m=>{const emp=employeeById[Number(m.senderId)];if(emp)showBubble(emp,m.message)});}
      chatLastId=Math.max(chatLastId,newest);chatInitialized=true;renderChat(list,!initial||chatOpen);
    }catch(err){if(initial)chatMessages.innerHTML=`<div class="chat-empty">${location.protocol==='file:'?'Deploy to Netlify to use shared chat.':'Office chat is temporarily offline.'}</div>`}
  }
  async function sendChat(){
    const message=String(chatInput?.value||'').trim();if(!message||!chatSendBtn)return;const senderId=Number(chatSenderSelect?.value)||null,emp=senderId?employeeById[senderId]:null,senderName=emp?.name||'Office';chatSendBtn.disabled=true;
    try{const res=await fetch(CHAT_API,{method:'POST',headers:{'content-type':'application/json',accept:'application/json'},body:JSON.stringify({senderId,senderName,message,sourceClient:eventClientId})});if(!res.ok)throw new Error(`HTTP ${res.status}`);chatInput.value='';if(emp)showBubble(emp,message,{kind:'chat',duration:8200});await pullChat();}
    catch(err){chatInput?.focus();}
    finally{chatSendBtn.disabled=false}
  }
  async function clearOfficeChat(){
    if(!chatClearBtn)return;
    if(!confirm('Clear all shared office chat messages?'))return;
    chatClearBtn.disabled=true;
    try{
      const res=await fetch(CHAT_API,{method:'DELETE',headers:{accept:'application/json'}});
      if(!res.ok)throw new Error(`HTTP ${res.status}`);
      chatLastId=0;chatInitialized=false;setChatUnread(0);renderChat([],false);
      await postOfficeEvent({eventType:'chat_cleared',title:'Office chat cleared',message:'Shared chat history was cleared',dedupeKey:`chat-clear:${Date.now()}`});
    }catch(_){alert('Could not clear chat. Please try again.')}finally{chatClearBtn.disabled=false}
  }
  function startChat(){renderChatSenders();pullChat({initial:true});if(chatPollTimer)clearInterval(chatPollTimer);chatPollTimer=setInterval(()=>{if(!document.hidden)pullChat()},3500)}

  function syncFollowChip(){const emp=followEmployeeId?employeeById[followEmployeeId]:null;if(!followChip)return;followChip.classList.toggle('show',Boolean(emp));followChip.setAttribute('aria-hidden',String(!emp));if(followChipName)followChipName.textContent=emp?.name||''}
  function collapseOpsPanel(){if(!todayPanel?.classList.contains('expanded'))return;todayPanel.classList.remove('expanded');if(opsExpandBtn){opsExpandBtn.textContent='⤢';opsExpandBtn.setAttribute('aria-expanded','false');opsExpandBtn.setAttribute('title','Expand Office Pulse')}}
  function clearFollowBubble(){bubblesLayer.querySelectorAll('.activity-bubble-wrap[data-bubble-kind="follow"]').forEach(n=>n.remove())}
  function clearEmployeeSelection(){stopCameraFollow();profileCard.classList.remove('open');$$('.employee').forEach(n=>n.classList.remove('active'))}
  function roomPeople(room){return employees.filter(e=>(e.visualRoomId||e.roomId)===room.id)}
  function openRoom(room){collapseOpsPanel();clearEmployeeSelection();const relevant=roomPeople(room),counts=countStatuses(relevant);contextCard.innerHTML=`<div class="context-head"><div><div class="context-title">${esc(room.name)}</div><div class="context-sub">${room.dept?esc(room.dept)+' area':'Shared office area'}</div></div><button class="close-mini">×</button></div><div class="context-grid"><div class="metric"><b>${relevant.length}</b><span>people</span></div><div class="metric"><b>${counts['At desk']||0}</b><span>at desks</span></div><div class="metric"><b>${counts['In a meeting']||0}</b><span>in meeting</span></div><div class="metric"><b>${(counts['Walking']||0)+(counts['On break']||0)}</b><span>moving / break</span></div></div>`;contextCard.classList.add('open');contextCard.querySelector('.close-mini').onclick=()=>contextCard.classList.remove('open')}
  function openEmployee(e){
    collapseOpsPanel();clearWorkloadNotice(e.id);
    contextCard.classList.remove('open');$$('.employee').forEach(n=>n.classList.toggle('active',Number(n.dataset.id)===e.id));
    const manual=workloadLines(e.workload),activeJobs=activeJobsForEmployee(e).slice(0,5),totalWorkload=manual.length+activeJobs.length;
    const manualHtml=manual.map(line=>`<div class="profile-workload-item"><span class="profile-workload-tag">TASK</span><span>${esc(line)}</span></div>`).join('');
    const jobsHtml=activeJobs.map(job=>`<div class="profile-workload-item job-item"><span class="profile-workload-tag job">JM</span><span><b>${esc(job.ref||'Job')}</b> · ${esc(job.customer||job.title||'Customer')} · ${esc(job.status||'Active')}</span></div>`).join('');
    const workloadHtml=(manualHtml+jobsHtml)||'<div class="profile-workload-empty">No workload assigned yet.</div>';
    profileCard.innerHTML=`<button class="close-mini" style="position:absolute;right:14px;top:14px">×</button><div class="profile-top"><div class="profile-avatar">${initials(e.name)}</div><div><div class="profile-name">${esc(e.name)}</div><div class="profile-role">${esc(e.position)}</div><div class="profile-badge"><i></i>${esc(effectiveStatus(e))}</div></div></div><div class="profile-details"><div class="detail-row"><span>Department</span><span>${esc(e.department)}</span></div><div class="detail-row"><span>Current location</span><span>${esc(roomById[e.visualRoomId||e.roomId]?.name||'Office')}</span></div><div class="detail-row profile-job-row"><span>Current job</span><span>${esc(e.currentJob||'No active job')}</span></div></div><div class="profile-workload"><div class="profile-workload-head"><span>Workload</span><span>${totalWorkload} item${totalWorkload===1?'':'s'}</span></div><div class="profile-workload-list">${workloadHtml}</div></div><div class="profile-job-actions"><button class="profile-job-action" data-edit-profile-workload="${e.id}">Update workload</button><button class="profile-job-action" data-edit-profile-staff="${e.id}">Edit staff</button></div>`;
    profileCard.classList.add('open');profileCard.querySelector('.close-mini').onclick=clearEmployeeSelection;const edit=profileCard.querySelector('[data-edit-profile-staff]');if(edit)edit.onclick=()=>openStaffEditor(e);const workloadEdit=profileCard.querySelector('[data-edit-profile-workload]');if(workloadEdit)workloadEdit.onclick=()=>openWorkloadEditor(e);
  }
  function characterFollowText(e){
    const manual=workloadLines(e?.workload),jobs=activeJobsForEmployee(e||{}).slice(0,2),parts=[];
    if(manual.length)parts.push(manual.slice(0,2).join(' · '));
    else if(jobs.length)parts.push(jobs.map(j=>`${j.ref||'Job'} ${j.title||j.customer||''}`.trim()).join(' · '));
    else if(e?.currentJob)parts.push(e.currentJob);
    return `${e?.name||'Staff'}${parts.length?' · '+parts.join(' · '):''}`;
  }
  function followCharacter(e){
    if(!e)return;
    collapseOpsPanel();clearWorkloadNotice(e.id);contextCard.classList.remove('open');tooltip.classList.remove('show');
    // Open the profile and start camera follow in the same interaction frame.
    openEmployee(e);
    focusEmployee(e);
    profileCard.classList.add('open');
    clearFollowBubble();showBubble(e,characterFollowText(e),{kind:'follow',duration:0});
  }
  function showTip(e,ev){tooltip.innerHTML=`<div class="tt-head"><b>${esc(e.name)}</b><em><i style="background:${statusColor(effectiveStatus(e))}"></i>${esc(effectiveStatus(e))}</em></div><span class="tt-role">${esc(e.position)} · ${esc(roomById[e.visualRoomId||e.roomId]?.name||'Office')}</span><div class="tt-job"><small>Working</small><strong>${esc(e.currentJob||'No active job')}</strong></div><span class="tt-desk">${esc(e.deskLabel||e.deskId||'No assigned desk')}</span>`;tooltip.classList.add('show');positionTip(ev)}
  function showDeskTip(emp,deskId,ev){tooltip.innerHTML=emp?`<div class="tt-head"><b>${esc(emp.name)}</b><em><i style="background:${statusColor(emp.status)}"></i>${esc(emp.status)}</em></div><span class="tt-role">${esc(emp.position)} · ${esc(emp.deskLabel||deskId)}</span><div class="tt-job"><small>Current job</small><strong>${esc(emp.currentJob||'No active job')}</strong></div>`:`<div class="tt-head"><b>${esc(deskId||'Workstation')}</b></div><span class="tt-role">Available workstation</span>`;tooltip.classList.add('show');positionTip(ev)}
  function positionTip(ev){let x=ev.clientX+14,y=ev.clientY+14,w=tooltip.offsetWidth,h=tooltip.offsetHeight;if(x+w>innerWidth-14)x=ev.clientX-w-14;if(y+h>innerHeight-14)y=ev.clientY-h-14;tooltip.style.left=x+'px';tooltip.style.top=y+'px'}

  function modelPivot(){return iso(12.2,35.0,0)}
  function applyModelRotation(){
    const p=modelPivot();
    modelRotator.setAttribute('transform',`rotate(${modelAngle.toFixed(2)} ${p.x.toFixed(2)} ${p.y.toFixed(2)})`);
    if(rotationReadout)rotationReadout.textContent=`${Math.round(modelAngle)}°`;
  }
  function animateModelRotation(target){
    target=Math.max(-45,Math.min(45,target));
    if(rotationAnim)cancelAnimationFrame(rotationAnim);
    const start=modelAngle,t0=performance.now(),dur=reduceMotion.matches?1:360;
    if(viewMode==='overview'){
      overviewCam=getOverviewCam();
      const shrink=1-Math.abs(target)/45*.075;
      animateCamera(overviewCam.scale*shrink,overviewCam.tx,overviewCam.ty,false);
    }
    function frame(now){
      const t=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-t,4);
      modelAngle=start+(target-start)*e;
      applyModelRotation();
      if(t<1)rotationAnim=requestAnimationFrame(frame);
      else{modelAngle=target;applyModelRotation();}
    }
    rotationAnim=requestAnimationFrame(frame);
  }
  function rotateModel(delta){stopCameraFollow();animateModelRotation(modelAngle+delta)}
  function resetScene(){stopCameraFollow();profileCard.classList.remove('open');contextCard.classList.remove('open');$$('.employee').forEach(n=>n.classList.remove('active','dim','search-hit'));viewMode='overview';overviewCam=getOverviewCam();animateCamera(overviewCam.scale,overviewCam.tx,overviewCam.ty,false);animateModelRotation(0)}

  function applyCamera(){camera.setAttribute('transform',`translate(${cam.tx.toFixed(2)} ${cam.ty.toFixed(2)}) scale(${cam.scale.toFixed(3)})`)}
  function scheduleCameraApply(){if(cameraFrame)return;cameraFrame=requestAnimationFrame(()=>{cameraFrame=null;applyCamera()})}
  function clampCamera(){cam.scale=Math.max(.76,Math.min(2.35,cam.scale));const following=viewMode==='follow'&&Boolean(followEmployeeId);cam.tx=following?Math.max(-1800,Math.min(1200,cam.tx)):Math.max(-860,Math.min(660,cam.tx));cam.ty=following?Math.max(-1000,Math.min(1100,cam.ty)):Math.max(-280,Math.min(420,cam.ty))}
  function svgPoint(x,y){const r=svg.getBoundingClientRect();return{x:(x-r.left)*1240/r.width,y:(y-r.top)*760/r.height}}
  function setScale(next,anchor={x:620,y:370}){stopCameraFollow();viewMode='custom';next=Math.max(.76,Math.min(2.25,next));const wx=(anchor.x-cam.tx)/cam.scale,wy=(anchor.y-cam.ty)/cam.scale;cam.tx=anchor.x-wx*next;cam.ty=anchor.y-wy*next;cam.scale=next;clampCamera();scheduleCameraApply()}
  function animateCamera(scale,tx,ty,markCustom=true){if(markCustom)viewMode='custom';if(camAnim)cancelAnimationFrame(camAnim);const s={...cam},t={scale,tx,ty},t0=performance.now(),dur=reduceMotion.matches?1:500;function f(now){const p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,4);cam.scale=s.scale+(t.scale-s.scale)*e;cam.tx=s.tx+(t.tx-s.tx)*e;cam.ty=s.ty+(t.ty-s.ty)*e;clampCamera();applyCamera();if(p<1)camAnim=requestAnimationFrame(f);else camAnim=null}camAnim=requestAnimationFrame(f)}
  function resetCamera(){stopCameraFollow();profileCard.classList.remove('open');$$('.employee').forEach(n=>n.classList.remove('active','dim','search-hit'));viewMode='overview';overviewCam=getOverviewCam();animateCamera(overviewCam.scale,overviewCam.tx,overviewCam.ty,false)}
  function roomCenter(room){const b=polygonBounds(room.poly);return iso(b.x+b.w/2,b.y+b.h/2)}
  function rotatePointAroundModel(p){if(!modelAngle)return p;const pivot=modelPivot(),a=modelAngle*Math.PI/180,c=Math.cos(a),sn=Math.sin(a),dx=p.x-pivot.x,dy=p.y-pivot.y;return{x:pivot.x+dx*c-dy*sn,y:pivot.y+dx*sn+dy*c}}
  function employeeCameraPoint(e){return rotatePointAroundModel(iso(e.visualX??e.x,e.visualY??e.y))}
  function employeeFollowScale(){return innerWidth<650?1.72:innerWidth<920?1.90:2.10}
  function employeeFollowCenter(){return{x:620,y:372}}
  function followCameraForEmployee(e,immediate=false){
    if(!e||followEmployeeId!==e.id)return;
    const p=employeeCameraPoint(e),targetScale=employeeFollowScale(),center=employeeFollowCenter();
    const targetTx=center.x-p.x*targetScale,targetTy=center.y-p.y*targetScale,k=immediate?1:(reduceMotion.matches?.5:.16);
    cam.scale+=(targetScale-cam.scale)*k;cam.tx+=(targetTx-cam.tx)*k;cam.ty+=(targetTy-cam.ty)*k;clampCamera();applyCamera();
  }
  function stopFollowCameraLoop(){if(followCameraFrame)cancelAnimationFrame(followCameraFrame);followCameraFrame=null}
  function startFollowCameraLoop(){
    stopFollowCameraLoop();
    const tick=()=>{
      followCameraFrame=null;
      if(viewMode!=='follow'||!followEmployeeId)return;
      const emp=employeeById[followEmployeeId];if(!emp){stopCameraFollow();return}
      followCameraForEmployee(emp,false);
      followCameraFrame=requestAnimationFrame(tick);
    };
    followCameraFrame=requestAnimationFrame(tick);
  }
  function stopCameraFollow(){stopFollowCameraLoop();followEmployeeId=null;syncFollowChip();clearFollowBubble();app.classList.remove('camera-follow-mode');if(viewMode==='follow')viewMode='custom'}
  function focusRoom(room){stopCameraFollow();viewMode='focus';const p=roomCenter(room);animateCamera(1.20,650-p.x*1.20,344-p.y*1.20,false)}
  function focusEmployee(e){
    if(!e)return;
    if(camAnim)cancelAnimationFrame(camAnim);camAnim=null;
    followEmployeeId=e.id;viewMode='follow';app.classList.add('camera-follow-mode');syncFollowChip();
    followCameraForEmployee(e,false);startFollowCameraLoop();
  }

  function setDept(d){activeDept=d;$$('.dept-tab').forEach(b=>b.classList.toggle('active',b.dataset.dept===d));$$('.employee').forEach(n=>{n.classList.toggle('dim',d!=='All'&&n.dataset.dept!==d);n.classList.remove('search-hit')});$$('.room').forEach(n=>{const r=roomById[n.dataset.room];n.classList.toggle('focused',d!=='All'&&r.dept===d);n.classList.toggle('dim',d!=='All'&&r.dept&&r.dept!==d)});updateStats();if(d==='All'){contextCard.classList.remove('open');resetCamera()}else{const r=roomById[deptRoom[d]];if(r){openRoom(r);focusRoom(r)}pushActivity({title:`${d} selected`,text:`${deptCounts[d]} staff`,avatar:initials(d)})}}

  function targetFor(e,status){if(status==='At desk'&&Number.isFinite(e.deskX)&&Number.isFinite(e.deskY))return{roomId:e.homeRoom,x:e.deskX,y:e.deskY};const id=status==='In a meeting'?'showroom':status==='On break'?'pantry':status==='Walking'?'showroom':e.homeRoom,r=roomById[id],b=polygonBounds(r.poly);return{roomId:id,x:b.x+1+Math.random()*Math.max(1,b.w-2),y:b.y+1+Math.random()*Math.max(1,b.h-2)}}
  function move(e,status){if(e.moving)return;e.moving=true;const n=employeeNodes.get(e.id),start={x:e.x,y:e.y},tar=targetFor(e,status),mid={x:(start.x+tar.x)/2+(Math.random()-.5)*2.6,y:(start.y+tar.y)/2+(Math.random()-.5)*2.0},t0=performance.now(),dur=4200+Math.random()*1600;n.classList.remove('idle','busy');n.classList.add('walking');function bez(t,a,b,c){const u=1-t;return u*u*a+2*u*t*b+t*t*c}function f(now){const p=Math.min(1,(now-t0)/dur),q=1-Math.pow(1-p,3);e.x=bez(q,start.x,mid.x,tar.x);e.y=bez(q,start.y,mid.y,tar.y);const pos=iso(e.x,e.y);n.setAttribute('transform',`translate(${pos.x} ${pos.y})`);updateEmployeeBubbles(e);if(p<1)requestAnimationFrame(f);else{e.roomId=tar.roomId;e.status=status;e.activity='';e.moving=false;n.classList.remove('walking');n.classList.add(employeeClass(e));n.querySelector('.status-dot').setAttribute('fill',statusColor(status));updateStats()}}requestAnimationFrame(f)}

  renderNav();drawBase();drawRooms();drawEmployees();startOfficeClock();renderFeed();updateStats();renderOps();startStaffDirectorySync();startChat();startEventStream();setTimeout(()=>initSharedJobManagement().then(()=>loadJobsFromSheet()).then(startJobAutoSync),180);
  // Cinematic page-open zoom: begin slightly closer, then settle into the reference overview.
  const introTarget={...overviewCam};
  const introScale=Math.min(1.88,introTarget.scale*1.14);
  cam={scale:introScale,tx:introTarget.tx-42,ty:introTarget.ty-26};
  applyCamera();applyModelRotation();
  document.documentElement.classList.add('office-intro-running');
  requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{
    viewMode='overview';
    animateCamera(introTarget.scale,introTarget.tx,introTarget.ty,false);
    setTimeout(()=>document.documentElement.classList.remove('office-intro-running'),620);
  },110)));

  if(deptNav)deptNav.onclick=e=>{const b=e.target.closest('.dept-tab');if(b)setDept(b.dataset.dept)};
  roomsLayer.onclick=e=>{if(dragging||rotateDragging||performance.now()<suppressClickUntil)return;const n=e.target.closest('.room');if(!n)return;e.stopPropagation();activeDept='All';$$('.room').forEach(x=>x.classList.remove('focused','dim'));resetScene();updateStats()};
  roomsLayer.onpointerover=e=>{const n=e.target.closest('.room');if(!n)return;if(activeRoomLabel)activeRoomLabel.classList.remove('label-active');activeRoomLabel=roomLabelNodes.get(n.dataset.room)||null;activeRoomLabel?.classList.add('label-active');};
  roomsLayer.onpointerout=e=>{const n=e.target.closest('.room');if(!n)return;const to=e.relatedTarget&&e.relatedTarget.closest?e.relatedTarget.closest('.room'):null;if(to===n)return;activeRoomLabel?.classList.remove('label-active');activeRoomLabel=null;};
  employeesLayer.onpointerover=e=>{const n=e.target.closest('.employee');if(!n)return;const emp=employeeById[Number(n.dataset.id)];if(emp)showTip(emp,e)};employeesLayer.onpointermove=e=>{if(tooltip.classList.contains('show'))positionTip(e)};employeesLayer.onpointerout=e=>{if(e.target.closest('.employee'))tooltip.classList.remove('show')};employeesLayer.onclick=e=>{e.stopPropagation();const n=e.target.closest('.employee');if(!n)return;const emp=employeeById[Number(n.dataset.id)];if(emp)followCharacter(emp)};
  furnitureLayer.onpointerover=e=>{const hit=e.target.closest('.desk-hit');if(!hit)return;const emp=employeeById[Number(hit.dataset.employeeId)]||null;showDeskTip(emp,hit.dataset.deskId,e)};
  furnitureLayer.onpointermove=e=>{if(e.target.closest('.desk-hit')&&tooltip.classList.contains('show'))positionTip(e)};
  furnitureLayer.onpointerout=e=>{if(e.target.closest('.desk-hit'))tooltip.classList.remove('show')};
  furnitureLayer.onclick=e=>{if(performance.now()<suppressClickUntil)return;const hit=e.target.closest('.desk-hit');if(!hit)return;e.stopPropagation();const emp=employeeById[Number(hit.dataset.employeeId)]||null;if(emp){openEmployee(emp);focusEmployee(emp)}else{pushActivity({title:`${hit.dataset.deskId||'Workstation'} · Available`,text:'No staff assigned',avatar:'DS'})}};
  activityList.onclick=e=>{const row=e.target.closest('[data-employee-id]');if(!row)return;const emp=employeeById[Number(row.dataset.employeeId)];if(emp){openEmployee(emp);focusEmployee(emp);showBubble(emp,emp.currentJob)}};
  activityList.onkeydown=e=>{if(e.key!=='Enter'&&e.key!==' ')return;const row=e.target.closest('[data-employee-id]');if(!row)return;e.preventDefault();const emp=employeeById[Number(row.dataset.employeeId)];if(emp){openEmployee(emp);focusEmployee(emp)}};
  if(opsExpandBtn)opsExpandBtn.onclick=e=>{e.stopPropagation();const expanding=!todayPanel.classList.contains('expanded');if(expanding){clearEmployeeSelection();contextCard.classList.remove('open')}const expanded=todayPanel.classList.toggle('expanded');opsExpandBtn.textContent=expanded?'⤡':'⤢';opsExpandBtn.setAttribute('aria-expanded',String(expanded));opsExpandBtn.setAttribute('title',expanded?'Collapse Office Pulse':'Expand Office Pulse')};
  if(chatLauncher)chatLauncher.onclick=()=>setChatOpen(!chatOpen);
  if(chatCloseBtn)chatCloseBtn.onclick=()=>setChatOpen(false);
  if(chatClearBtn)chatClearBtn.onclick=clearOfficeChat;
  if(chatSendBtn)chatSendBtn.onclick=sendChat;
  if(chatSenderSelect)chatSenderSelect.onchange=()=>{try{localStorage.setItem('ksChatSenderId',chatSenderSelect.value)}catch(_){}};
  if(chatInput)chatInput.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat()}};
  if(notificationBtn)notificationBtn.onclick=e=>{e.stopPropagation();setNotificationOpen(!notificationOpen)};
  if(notificationClearBtn)notificationClearBtn.onclick=e=>{e.stopPropagation();notifications=[];setNotificationUnread(0);renderNotifications()};
  if(notificationPanel)notificationPanel.onclick=e=>e.stopPropagation();
  if(location.hash==='#notifications')setTimeout(()=>setNotificationOpen(true),180);
  window.addEventListener('hashchange',()=>{if(location.hash==='#notifications')setNotificationOpen(true)});
  if(workloadEditorClose)workloadEditorClose.onclick=closeWorkloadEditor;
  if(workloadEditorModal)workloadEditorModal.onclick=e=>{if(e.target===workloadEditorModal)closeWorkloadEditor()};
  if(workloadEditorSave)workloadEditorSave.onclick=saveWorkloadOnly;
  if(todayPanel)todayPanel.onclick=e=>{
    const tab=e.target.closest('.ops-tab');if(tab){setOpsTab(tab.dataset.opsTab);return}
    const metric=e.target.closest('[data-ops-metric]');if(metric){opsFilter=metric.dataset.opsMetric;setOpsTab('jobs');renderOps();return}
    const quick=e.target.closest('[data-ops-quick]');if(quick){opsFilter=quick.dataset.opsQuick;setOpsTab('jobs');renderOps();return}
    const alert=e.target.closest('[data-ops-alert-filter]');if(alert){opsFilter=alert.dataset.opsAlertFilter;setOpsTab('jobs');renderOps();return}
    const unmapped=e.target.closest('#opsUnmappedBtn');if(unmapped){opsFilter='unmapped';setOpsTab('jobs');renderOps();return}
    const staffLoad=e.target.closest('[data-pulse-staff]');if(staffLoad){const emp=employeeById[Number(staffLoad.dataset.pulseStaff)];if(emp){openEmployee(emp);focusEmployee(emp)}return}
    const editStaff=e.target.closest('[data-edit-staff]');if(editStaff){const emp=employeeById[Number(editStaff.dataset.editStaff)];if(emp)openStaffEditor(emp);return}
    const workload=e.target.closest('[data-workload-employee]');if(workload){const emp=employeeById[Number(workload.dataset.workloadEmployee)];if(emp)openWorkloadEditor(emp);return}
    const jobRow=e.target.closest('[data-job-index]');if(jobRow){showJobDetail(jobs[Number(jobRow.dataset.jobIndex)]);return}
  };
  if(todayPanel)todayPanel.onkeydown=e=>{if(e.key!=='Enter'&&e.key!==' ')return;const target=e.target.closest('[data-edit-staff],[data-workload-employee],[data-job-index]');if(!target)return;e.preventDefault();target.click()};
  if(opsRefreshBtn)opsRefreshBtn.onclick=e=>{e.stopPropagation();loadJobsFromSheet()};
  if(followChipStop)followChipStop.onclick=e=>{e.stopPropagation();stopCameraFollow();$$('.employee').forEach(n=>n.classList.remove('active'))};
  if(jobLinkSettingsBtn)jobLinkSettingsBtn.onclick=e=>{e.stopPropagation();openJobLinkEditor()};
  if(addStaffBtn)addStaffBtn.onclick=e=>{e.stopPropagation();openStaffEditor(null)};
  if(staffEditorClose)staffEditorClose.onclick=closeStaffEditor;
  if(staffEditorModal)staffEditorModal.onclick=e=>{if(e.target===staffEditorModal)closeStaffEditor()};
  if(staffSaveBtn)staffSaveBtn.onclick=saveStaffEditor;
  if(staffRemoveBtn)staffRemoveBtn.onclick=removeStaffEditor;
  if(driveLinkSettingsBtn)driveLinkSettingsBtn.onclick=e=>{e.stopPropagation();openDriveLinkEditor()};
  if(driveLinkClose)driveLinkClose.onclick=closeDriveLinkEditor;
  if(driveLinkModal)driveLinkModal.onclick=e=>{if(e.target===driveLinkModal)closeDriveLinkEditor()};
  if(driveLinkReset)driveLinkReset.onclick=()=>{driveLinkInput.value=DEFAULT_GOOGLE_DRIVE_URL;driveLinkHelp.className='job-link-help';driveLinkHelp.textContent='Default Kidzstudios Google Drive folder loaded. Click Save shared link to apply it for everyone.'};
  if(opsMappingBtn)opsMappingBtn.onclick=e=>{e.stopPropagation();openStageMappingEditor()};
  if(stageMappingClose)stageMappingClose.onclick=closeStageMappingEditor;
  if(stageMappingModal)stageMappingModal.onclick=e=>{if(e.target===stageMappingModal)closeStageMappingEditor()};
  if(stageMappingSave)stageMappingSave.onclick=saveStageMapping;
  if(stageMappingReset)stageMappingReset.onclick=()=>{stageOrdersInput.value=DEFAULT_STAGE_MAPPING.orders.join(', ');stageArtworkInput.value=DEFAULT_STAGE_MAPPING.artwork.join(', ');stageProductionInput.value=DEFAULT_STAGE_MAPPING.production.join(', ');stageCompletedInput.value=DEFAULT_STAGE_MAPPING.completed.join(', ');stageMappingHelp.className='job-link-help';stageMappingHelp.textContent='Default mapping loaded. Save to share it with everyone.'};
  if(driveLinkSave)driveLinkSave.onclick=async()=>{const parsed=parseHttpUrl(driveLinkInput.value,'Google Drive link');if(!parsed.ok){driveLinkHelp.className='job-link-help error';driveLinkHelp.textContent=parsed.error;return}driveLinkSave.disabled=true;driveLinkHelp.className='job-link-help';driveLinkHelp.textContent='Saving to shared database…';try{await saveGoogleDriveUrl(driveLinkInput.value);driveLinkHelp.className='job-link-help ok';driveLinkHelp.textContent='Saved. Everyone will now open the same Google Drive folder.';setTimeout(closeDriveLinkEditor,520)}catch(err){driveLinkHelp.className='job-link-help error';driveLinkHelp.textContent=err.message||'Could not save link.'}finally{driveLinkSave.disabled=false}};
  if(jobLinkClose)jobLinkClose.onclick=closeJobLinkEditor;
  if(jobLinkModal)jobLinkModal.onclick=e=>{if(e.target===jobLinkModal)closeJobLinkEditor()};
  if(jobLinkReset)jobLinkReset.onclick=()=>{jobLinkInput.value=DEFAULT_JOB_SHEET_URL;jobLinkHelp.className='job-link-help';jobLinkHelp.textContent='Default Kidzstudios Job Management link loaded. Click Save shared link to apply it for everyone.'};
  if(jobLinkSave)jobLinkSave.onclick=async()=>{const parsed=parseJobManagementUrl(jobLinkInput.value);if(!parsed.ok){jobLinkHelp.className='job-link-help error';jobLinkHelp.textContent=parsed.error;return}jobLinkSave.disabled=true;jobLinkHelp.className='job-link-help';jobLinkHelp.textContent='Saving to shared database…';try{await saveJobManagementUrl(jobLinkInput.value);jobLinkHelp.className='job-link-help ok';jobLinkHelp.textContent=parsed.sheet?'Saved. Job Management HTML can now import from this Google Sheet.':'Saved. Everyone will open this link. Live job syncing needs a Google Sheet edit link.';setTimeout(()=>{closeJobLinkEditor();loadJobsFromSheet()},650)}catch(err){jobLinkHelp.className='job-link-help error';jobLinkHelp.textContent=err.message||'Could not save link.'}finally{jobLinkSave.disabled=false}};
  window.addEventListener('ks:job-management-url',e=>{if(e.detail?.url&&e.detail.url!==jobSheetUrl){applyJobManagementUrl(e.detail.url,{broadcast:false});loadJobsFromSheet()}});
  window.addEventListener('ks:google-drive-url',e=>{if(e.detail?.url&&e.detail.url!==googleDriveUrl)applyGoogleDriveUrl(e.detail.url,{broadcast:false})});
  $$('.side-tool-card').forEach(a=>a.onclick=e=>{e.preventDefault();pushActivity({title:'Tool shortcut selected',text:a.dataset.tool,avatar:'UI'});showBubble(employees.find(v=>v.name==='Afiq')||employees[0],a.dataset.tool)});
  $$('.tool-nav-btn').forEach(btn=>btn.addEventListener('click',()=>{$$('.tool-nav-btn').forEach(n=>n.classList.toggle('active',n===btn));}));
  function setLiveMode(mode){
    const hidden=mode==='hidden',collapsed=mode==='collapsed',expanded=mode==='expanded';
    livePanel.classList.toggle('hidden',hidden);
    livePanel.classList.toggle('collapsed',collapsed);
    livePanel.classList.toggle('expanded',expanded);
    liveReopenBtn.classList.toggle('show',hidden);
    expandLiveBtn.setAttribute('aria-expanded',String(expanded));
    expandLiveBtn.textContent=expanded?'⤡':'⤢';
    collapseLiveBtn.textContent=collapsed?'＋':'−';
    collapseLiveBtn.title=collapsed?'Open':'Collapse';
    renderFeed();
  }
  function toggleLiveExpanded(){
    if(livePanel.classList.contains('collapsed')){setLiveMode('normal');return;}
    setLiveMode(livePanel.classList.contains('expanded')?'normal':'expanded');
  }
  expandLiveBtn.onclick=e=>{e.stopPropagation();toggleLiveExpanded();};
  collapseLiveBtn.onclick=e=>{e.stopPropagation();setLiveMode(livePanel.classList.contains('collapsed')?'normal':'collapsed');};
  hideLiveBtn.onclick=e=>{e.stopPropagation();setLiveMode('hidden');};
  liveReopenBtn.onclick=()=>setLiveMode('normal');
  livePanelHeader.onclick=e=>{if(e.target.closest('button'))return;toggleLiveExpanded();};
  rotateLeftBtn.onclick=()=>rotateModel(-15);rotateRightBtn.onclick=()=>rotateModel(15);rotationReadout.onclick=()=>animateModelRotation(0);
  $('#zoomIn').onclick=()=>setScale(cam.scale*1.16);$('#zoomOut').onclick=()=>setScale(cam.scale/1.16);$('#resetView').onclick=resetScene;$('#fullscreenBtn').onclick=()=>document.fullscreenElement?document.exitFullscreen?.():app.requestFullscreen?.();
  document.onkeydown=e=>{if(!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){if(e.key.toLowerCase()==='q')rotateModel(-15);if(e.key.toLowerCase()==='e')rotateModel(15);if(e.key==='0')resetScene()}if(e.key==='Escape'){clearEmployeeSelection();contextCard.classList.remove('open');setChatOpen(false);setNotificationOpen(false);closeWorkloadEditor();if(todayPanel?.classList.contains('expanded')){todayPanel.classList.remove('expanded');if(opsExpandBtn){opsExpandBtn.textContent='⤢';opsExpandBtn.setAttribute('aria-expanded','false')}}}};
  document.addEventListener('click',e=>{if(notificationOpen&&!e.target.closest('.notification-wrap'))setNotificationOpen(false)});
  document.addEventListener('pointerdown',armNotificationAudio,{once:true,capture:true});
  document.addEventListener('keydown',armNotificationAudio,{once:true,capture:true});
  svg.onwheel=e=>{e.preventDefault();setScale(cam.scale*(e.deltaY>0?.92:1.085),svgPoint(e.clientX,e.clientY))};
  svg.onpointerdown=e=>{if(e.button!==0)return;const interactive=e.target.closest?.('.employee,.desk-hit');if(interactive)return;stopCameraFollow();dragging=!e.shiftKey;rotateDragging=e.shiftKey;dragMoved=false;lastPointer={x:e.clientX,y:e.clientY};svg.setPointerCapture(e.pointerId);svg.classList.add(rotateDragging?'rotating':'dragging')};
  svg.onpointermove=e=>{if(!dragging&&!rotateDragging)return;stopCameraFollow();const dx=e.clientX-lastPointer.x,dy=e.clientY-lastPointer.y;if(Math.abs(dx)+Math.abs(dy)>2)dragMoved=true;if(rotateDragging){viewMode='custom';modelAngle=Math.max(-45,Math.min(45,modelAngle+dx*.18));applyModelRotation()}else{const r=svg.getBoundingClientRect();viewMode='custom';cam.tx+=dx*1240/r.width;cam.ty+=dy*760/r.height;clampCamera();scheduleCameraApply()}lastPointer={x:e.clientX,y:e.clientY}};
  svg.onpointerup=e=>{if(dragMoved)suppressClickUntil=performance.now()+160;dragging=false;rotateDragging=false;svg.classList.remove('dragging','rotating');try{svg.releasePointerCapture(e.pointerId)}catch(_){}};
  svg.onpointercancel=()=>{dragging=false;rotateDragging=false;svg.classList.remove('dragging','rotating')};
  svg.onclick=e=>{if(dragging||rotateDragging||dragMoved||performance.now()<suppressClickUntil)return;if(e.target.closest?.('.employee,.desk-hit,.room'))return;resetScene();tooltip.classList.remove('show');};

  // Random visual roaming. This is deliberately local/ephemeral: shared Netlify
  // job and form data remain synchronized, while avatars wander independently for life.
  const roamZones={
    staff:{roomId:'staff',point:()=>({x:7.2+Math.random()*13.5,y:3.0+Math.random()*18.5})},
    showroom:{roomId:'showroom',point:()=>({x:12.8+Math.random()*8.2,y:26.2+Math.random()*7.6})},
    corridor:{roomId:'corridor',point:()=>({x:8.4+Math.random()*2.3,y:38.5+Math.random()*15.0})},
    pantry:{roomId:'pantry',point:()=>({x:1.4+Math.random()*4.7,y:38.5+Math.random()*14.2})},
    boss:{roomId:'boss',point:()=>({x:13.2+Math.random()*8.0,y:38.0+Math.random()*7.8})}
  };
  const zoneGate={
    staff:{x:10.6,y:25.1},showroom:{x:10.6,y:34.8},corridor:{x:9.8,y:40.0},
    pantry:{x:7.0,y:53.5},boss:{x:12.8,y:44.1}
  };
  const roamChoices={
    1:['boss','corridor','showroom','pantry'],2:['boss','corridor','showroom','pantry'],
    3:['staff','showroom','corridor','pantry'],4:['staff','showroom','corridor','pantry'],
    5:['showroom','staff','corridor','pantry'],6:['staff','showroom','corridor','pantry'],
    7:['staff','showroom','corridor','pantry'],8:['staff','showroom','corridor','pantry']
  };
  function zoneOfEmployee(e){return e.visualRoomId||e.roomId||e.homeRoom||'staff'}
  function randomDifferent(list,current){const pool=list.filter(v=>v!==current);return(pool.length?pool:list)[Math.floor(Math.random()*(pool.length||list.length))]}
  function pathBetweenZones(from,to,target){
    const pts=[];
    if(from===to)return[target];
    const push=p=>{if(p)pts.push({...p})};
    const leave=z=>{if(z==='boss'){push(zoneGate.boss);push(zoneGate.corridor)}else if(z==='pantry'){push(zoneGate.pantry);push(zoneGate.corridor)}else if(z==='staff'){push(zoneGate.staff)}else if(z==='showroom'){push(zoneGate.showroom)}};
    const enter=z=>{if(z==='boss'){push(zoneGate.corridor);push(zoneGate.boss)}else if(z==='pantry'){push(zoneGate.corridor);push(zoneGate.pantry)}else if(z==='staff'){push(zoneGate.showroom);push(zoneGate.staff)}else if(z==='showroom'){push(zoneGate.showroom)}else if(z==='corridor'){push(zoneGate.corridor)}};
    leave(from);
    if((from==='staff'&&to!=='showroom')||(to==='staff'&&from!=='showroom'))push(zoneGate.showroom);
    if((from==='showroom'&&['boss','pantry','corridor'].includes(to))||(to==='showroom'&&['boss','pantry','corridor'].includes(from)))push(zoneGate.corridor);
    enter(to);push(target);
    return pts.filter((p,i,a)=>i===0||Math.hypot(p.x-a[i-1].x,p.y-a[i-1].y)>.35);
  }
  function setMotionClass(e,node,walking){
    if(e.motionWalking===walking)return;
    e.motionWalking=walking;node.classList.toggle('walking',walking);
    node.classList.toggle('idle',!walking&&!(e.status==='At desk'&&e.id%2===0));
    node.classList.toggle('busy',!walking&&e.status==='At desk'&&e.id%2===0);
    const dot=node.querySelector('.status-dot');if(dot)dot.setAttribute('fill',statusColor(effectiveStatus(e)));
  }
  function beginRoam(e,now){
    const current=zoneOfEmployee(e),choices=roamChoices[e.id]||['staff','showroom','corridor'];
    const targetZone=Math.random()<.34&&choices.includes(current)?current:randomDifferent(choices,current);
    const target=roamZones[targetZone].point(),route=pathBetweenZones(current,targetZone,target);
    e.roam={phase:'walk',route,index:0,startAt:now,startX:e.visualX??e.x,startY:e.visualY??e.y,targetZone};
    prepareRoamSegment(e,now);
  }
  function prepareRoamSegment(e,now){
    const r=e.roam,pt=r.route[r.index];if(!pt){finishRoam(e,now);return}
    r.startX=e.visualX??e.x;r.startY=e.visualY??e.y;r.endX=pt.x;r.endY=pt.y;r.startAt=now;
    const dist=Math.hypot(r.endX-r.startX,r.endY-r.startY);r.duration=Math.max(720,Math.min(2600,dist*145));
  }
  function finishRoam(e,now){
    const node=employeeNodes.get(e.id);e.visualRoomId=e.roam?.targetZone||e.visualRoomId||e.roomId;
    e.roam={phase:'idle',nextAt:now+6200+Math.random()*13800};if(node)setMotionClass(e,node,false);
  }
  function activeWalkers(){return employees.reduce((n,e)=>n+(e.roam?.phase==='walk'?1:0),0)}
  function randomRoamFrame(now){
    roamFrame=null;if(document.hidden||reduceMotion.matches)return;
    let walkers=activeWalkers();
    for(const e of employees){
      const node=employeeNodes.get(e.id);if(!node)continue;
      if(!e.roam)e.roam={phase:'idle',nextAt:now+1200+e.id*700+Math.random()*4200};
      if(e.roam.phase==='idle'&&now>=e.roam.nextAt&&walkers<3){beginRoam(e,now);walkers++}
      if(e.roam.phase==='walk'){
        const r=e.roam,t=Math.min(1,(now-r.startAt)/r.duration),q=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
        const x=r.startX+(r.endX-r.startX)*q,y=r.startY+(r.endY-r.startY)*q;e.visualX=x;e.visualY=y;
        const p=iso(x,y);node.setAttribute('transform',`translate(${p.x} ${p.y})`);setMotionClass(e,node,true);updateEmployeeBubbles(e);
        if(t>=1){r.index++;if(r.index>=r.route.length)finishRoam(e,now);else prepareRoamSegment(e,now)}
      }
    }
    const second=Math.floor(now/1000);if(second!==lastMotionStatsSecond){lastMotionStatsSecond=second;updateStats()}
    if(activeWalkers()>0){roamFrame=requestAnimationFrame(randomRoamFrame)}else{const next=Math.min(...employees.map(e=>e.roam?.nextAt||now+1200));const wait=Math.max(120,Math.min(1800,next-now));roamTimer=setTimeout(()=>{roamTimer=null;roamFrame=requestAnimationFrame(randomRoamFrame)},wait)}
  }
  function startRandomRoam(){if(roamFrame)cancelAnimationFrame(roamFrame);if(roamTimer)clearTimeout(roamTimer);roamFrame=null;roamTimer=null;if(!document.hidden&&!reduceMotion.matches)roamFrame=requestAnimationFrame(randomRoamFrame)}
  function stopRandomRoam(){if(roamFrame)cancelAnimationFrame(roamFrame);if(roamTimer)clearTimeout(roamTimer);roamFrame=null;roamTimer=null}
  document.addEventListener('visibilitychange',()=>{app.classList.toggle('animations-paused',document.hidden);document.hidden?stopRandomRoam():startRandomRoam()});
  reduceMotion.addEventListener?.('change',()=>{reduceMotion.matches?stopRandomRoam():startRandomRoam()});
  let resizeTimer=null;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(viewMode==='overview'){overviewCam=getOverviewCam();cam={...overviewCam};applyCamera()}else if(viewMode==='follow'&&followEmployeeId&&employeeById[followEmployeeId])followCameraForEmployee(employeeById[followEmployeeId],true)},120)},{passive:true});
  startRandomRoam();scheduleRandomWorkloadBubble();
})();