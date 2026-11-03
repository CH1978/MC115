/* ================= 基礎 ================= */
const $ = id => document.getElementById(id);
const LS = { get(k){try{return localStorage.getItem(k)}catch{return null}},
             set(k,v){try{localStorage.setItem(k,v)}catch{}} };

/* ================= i18n ================= */
const I18N = {
 zh:{ title:'零式戰鬥機 · 三版本整合工坊',
  yLayers:'Y 樓層', parts:'部件', legend:'圖例',
  all:'全選', none:'清除', invert:'反選',
  iso3d:'3D 等角', modeAll:'全部', modeSingle:'單層', modeSlice:'±1 層',
  partMat:'部件材質', materials:'材料統計', total:'總計',
  fleet:'群飛編隊', fleetCount:'架數', fleetLayout:'排列', fleetGap:'間距',
  pinned:'釘選資訊', data:'資料',
  copyPy:'📋 複製 PY 腳本', reset:'↺ 重置此模型',
  clickToPin:'點格子釘選…', emptyLayer:'此層無方塊', layerTitle:'逐層 Y = ',
  toastCopy:'PY 腳本已複製！', toastCopyFail:'複製失敗',
  toastReset:'已重置',
  confirmReset:'確定要重置此模型？目前修改會消失。',
  mixed:'混合', unused:'未使用',
  modelFull:'完整版', modelSlim:'對稱瘦身版', modelSmall:'縮小版'},
 en:{ title:'A6M Zero · 3-Version Workshop',
  yLayers:'Y Layers', parts:'Parts', legend:'Legend',
  all:'All', none:'None', invert:'Invert',
  iso3d:'3D Iso', modeAll:'All', modeSingle:'Single', modeSlice:'±1',
  partMat:'Part Material', materials:'Materials', total:'Total',
  fleet:'Fleet Formation', fleetCount:'Count', fleetLayout:'Layout', fleetGap:'Gap',
  pinned:'Pinned', data:'Data',
  copyPy:'📋 Copy PY Script', reset:'↺ Reset Model',
  clickToPin:'Click a cell to pin…', emptyLayer:'Empty layer', layerTitle:'Layer Y = ',
  toastCopy:'PY script copied!', toastCopyFail:'Copy failed',
  toastReset:'Reset done',
  confirmReset:'Reset this model? Edits will be lost.',
  mixed:'Mixed', unused:'Unused',
  modelFull:'Full', modelSlim:'Slim', modelSmall:'Small'}
};
const LANG_KEY='zero3_lang'; let lang = LS.get(LANG_KEY) || 'zh';

/* ================= 方塊定義 ================= */
const B = {
 WHITE:      {hex:'#FFFFFF', mc:'white_concrete',            py:'WHITE_CONCRETE',            zh:'白色混凝土', en:'White Concrete'},
 ORANGE:     {hex:'#D87F33', mc:'orange_concrete',           py:'ORANGE_CONCRETE',           zh:'橘色混凝土', en:'Orange Concrete'},
 MAGENTA:    {hex:'#B24CD8', mc:'magenta_concrete',          py:'MAGENTA_CONCRETE',          zh:'洋紅混凝土', en:'Magenta Concrete'},
 LIGHT_BLUE: {hex:'#6699D8', mc:'light_blue_concrete',       py:'LIGHT_BLUE_CONCRETE',       zh:'淺藍混凝土', en:'Light Blue Concrete'},
 YELLOW:     {hex:'#E5E533', mc:'yellow_concrete',           py:'YELLOW_CONCRETE',           zh:'黃色混凝土', en:'Yellow Concrete'},
 LIME:       {hex:'#7FCC19', mc:'lime_concrete',             py:'LIME_CONCRETE',             zh:'淺綠混凝土', en:'Lime Concrete'},
 PINK:       {hex:'#F27FA5', mc:'pink_concrete',             py:'PINK_CONCRETE',             zh:'粉紅混凝土', en:'Pink Concrete'},
 GRAY:       {hex:'#4C4C4C', mc:'gray_concrete',             py:'GRAY_CONCRETE',             zh:'灰色混凝土', en:'Gray Concrete'},
 LIGHT_GRAY: {hex:'#999999', mc:'light_gray_concrete',       py:'LIGHT_GRAY_CONCRETE',       zh:'淺灰混凝土', en:'Light Gray Concrete'},
 CYAN:       {hex:'#4C7F99', mc:'cyan_concrete',             py:'CYAN_CONCRETE',             zh:'青色混凝土', en:'Cyan Concrete'},
 PURPLE:     {hex:'#7F3FB2', mc:'purple_concrete',           py:'PURPLE_CONCRETE',           zh:'紫色混凝土', en:'Purple Concrete'},
 BLUE:       {hex:'#334CB2', mc:'blue_concrete',             py:'BLUE_CONCRETE',             zh:'藍色混凝土', en:'Blue Concrete'},
 BROWN:      {hex:'#664C33', mc:'brown_concrete',            py:'BROWN_CONCRETE',            zh:'棕色混凝土', en:'Brown Concrete'},
 GREEN:      {hex:'#667F33', mc:'green_concrete',            py:'GREEN_CONCRETE',            zh:'綠色混凝土', en:'Green Concrete'},
 RED:        {hex:'#993333', mc:'red_concrete',              py:'RED_CONCRETE',              zh:'紅色混凝土', en:'Red Concrete'},
 BLACK:      {hex:'#191919', mc:'black_concrete',            py:'BLACK_CONCRETE',            zh:'黑色混凝土', en:'Black Concrete'},
 GLASS:      {hex:'#8ECBFF', mc:'light_blue_stained_glass',  py:'LIGHT_BLUE_STAINED_GLASS',  zh:'淺藍玻璃',   en:'Light Blue Glass'},
 IRON:       {hex:'#A8A8A8', mc:'iron_bars',                 py:'IRON_BARS',                 zh:'鐵欄杆',     en:'Iron Bars'},
 LIGHT:      {hex:'#C8F0E0', mc:'sea_lantern',               py:'SEA_LANTERN',               zh:'海燈籠',     en:'Sea Lantern'},
 STAIR:      {hex:'#4A3520', mc:'dark_oak_stairs',           py:'DARK_OAK_STAIRS',           zh:'深橡木階梯', en:'Dark Oak Stairs'},
 SLAB:       {hex:'#5A4530', mc:'dark_oak_slab',             py:'DARK_OAK_SLAB',             zh:'深橡木半磚', en:'Dark Oak Slab'}
};
const blockName = k => (B[k] ? (B[k][lang] || B[k].en) : '?');

/* ================= 部件 ================= */
const PART_NAMES = {
 prop:{zh:'螺旋槳',en:'Propeller'}, cowl:{zh:'長機鼻',en:'Long Nose'},
 radiatorNose:{zh:'機鼻散熱器',en:'Nose Radiator'}, fuselage:{zh:'機身',en:'Fuselage'},
 cockpit:{zh:'座艙',en:'Cockpit'}, wing:{zh:'主翼',en:'Main Wing'},
 radiatorWing:{zh:'機翼散熱器',en:'Wing Radiator'}, vtail:{zh:'垂直尾翼',en:'Vertical Tail'},
 htail:{zh:'水平尾翼',en:'Horizontal Tail'}, gear:{zh:'起落架',en:'Landing Gear'},
 roundel:{zh:'日之丸',en:'Hinomaru'}, antenna:{zh:'天線/著陸燈',en:'Antenna/Light'}
};
const PART_ORDER = Object.keys(PART_NAMES);
const partName = k => (PART_NAMES[k] ? PART_NAMES[k][lang] : k);

/* ================= 三個模型建構 ================= */
function makeCtx(){
 const L = new Map();
 const put = (part,t,x,y,z)=>{
   if(!L.has(y)) L.set(y,new Map());
   L.get(y).set(x+','+z,{t,part});
 };
 const fill = (part,t,x1,y1,z1,x2,y2,z2)=>{
   const ax=Math.min(x1,x2),bx=Math.max(x1,x2);
   const ay=Math.min(y1,y2),by=Math.max(y1,y2);
   const az=Math.min(z1,z2),bz=Math.max(z1,z2);
   for(let y=ay;y<=by;y++)for(let x=ax;x<=bx;x++)for(let z=az;z<=bz;z++) put(part,t,x,y,z);
 };
 return {L, put, fill};
}

function buildFull(){
 const {L,put,fill} = makeCtx();
 fill('fuselage','WHITE',-8,7,-2,16,10,2);
 fill('fuselage','LIGHT_GRAY',-8,6,-1,16,6,1);
 fill('fuselage','LIGHT_GRAY',-8,7,-3,16,9,-3);
 fill('fuselage','LIGHT_GRAY',-8,7,3,16,9,3);
 fill('cowl','WHITE',17,7,-2,20,10,2);
 fill('cowl','WHITE',21,8,-1,23,9,1);
 fill('cowl','YELLOW',18,7,-2,20,10,2);
 fill('cowl','YELLOW',21,8,-1,23,9,1);
 fill('wing','WHITE',4,7,-6,10,7,-2);
 fill('wing','WHITE',4,7,-10,9,7,-6);
 fill('wing','WHITE',5,7,-14,8,7,-10);
 fill('wing','WHITE',6,7,-16,7,7,-14);
 fill('wing','WHITE',4,7,2,10,7,6);
 fill('wing','WHITE',4,7,6,9,7,10);
 fill('wing','WHITE',5,7,10,8,7,14);
 fill('wing','WHITE',6,7,14,7,7,16);
 for(let x=4;x<=10;x+=2){ put('wing','STAIR',x,7,-17); put('wing','STAIR',x,7,17); }
 for(let x=5;x<=10;x+=2){ put('wing','STAIR',x,7,-2); put('wing','STAIR',x,7,2); }
 fill('vtail','WHITE',-8,11,0,-4,14,0);
 fill('vtail','WHITE',-8,14,-1,-4,15,1);
 put('vtail','WHITE',-6,16,0);
 put('vtail','STAIR',-4,11,0); put('vtail','STAIR',-4,12,0);
 fill('vtail','RED',-8,12,0,-8,14,0);
 fill('htail','WHITE',-8,11,-4,-4,11,-1);
 fill('htail','WHITE',-8,11,1,-4,11,4);
 put('htail','STAIR',-6,11,-4); put('htail','SLAB',-5,11,-4);
 put('htail','STAIR',-6,11,4);  put('htail','SLAB',-5,11,4);
 fill('cockpit','GLASS',0,11,-1,4,12,1);
 fill('cockpit','GLASS',1,13,0,3,13,0);
 put('cockpit','BLACK',0,11,-2); put('cockpit','BLACK',0,11,2);
 put('cockpit','BLACK',4,11,-2); put('cockpit','BLACK',4,11,2);
 put('cockpit','BLACK',2,14,0);
 fill('cockpit','BLACK',-1,11,-1,-1,12,1);
 fill('cockpit','BLACK',5,11,-1,5,12,1);
 put('prop','BLACK',24,8,0); put('prop','BLACK',24,9,0);
 put('prop','BLACK',25,5,0); put('prop','BLACK',25,6,0); put('prop','BLACK',25,7,0);
 put('prop','BLACK',25,10,0); put('prop','BLACK',25,11,0); put('prop','BLACK',25,12,0);
 put('prop','BLACK',25,8,-2); put('prop','BLACK',25,8,-1);
 put('prop','BLACK',25,8,1); put('prop','BLACK',25,8,2);
 put('prop','GRAY',25,8,0); put('prop','GRAY',25,9,0);
 put('prop','GRAY',26,8,0); put('prop','GRAY',26,9,0);
 fill('radiatorNose','BLACK',19,6,-1,21,6,1);
 put('radiatorNose','IRON',20,6,0);
 fill('radiatorWing','BLACK',6,6,-10,8,6,-8);
 put('radiatorWing','IRON',7,6,-9);
 fill('radiatorWing','BLACK',6,6,8,8,6,10);
 put('radiatorWing','IRON',7,6,9);
 fill('gear','GRAY',6,4,-6,6,5,-6); put('gear','BLACK',6,3,-6);
 fill('gear','GRAY',6,4,6,6,5,6);  put('gear','BLACK',6,3,6);
 put('gear','GRAY',-6,5,0); put('gear','GRAY',-6,4,0); put('gear','BLACK',-6,3,0);
 
 [[6,-11],[6,-10],[6,-12],[7,-11],[5,-11]].forEach(([x,z])=>put('roundel','RED',x,7,z));
 [[6,11],[6,12],[6,10],[7,11],[5,11]].forEach(([x,z])=>put('roundel','RED',x,7,z));
 [[-2,8,-3],[-2,9,-3],[-2,7,-3],[-1,8,-3],[-3,8,-3]].forEach(([x,y,z])=>put('roundel','RED',x,y,z));
 [[-2,8,3],[-2,9,3],[-2,7,3],[-1,8,3],[-3,8,3]].forEach(([x,y,z])=>put('roundel','RED',x,y,z));
 
 put('antenna','LIGHT',6,7,-16);
 put('antenna','IRON',-3,11,0); put('antenna','IRON',-3,12,0);
 put('antenna','IRON',-3,13,0); put('antenna','IRON',-7,11,0);
 return L;
}

function buildSlim(){
 const {L,put,fill} = makeCtx();
 fill('fuselage','WHITE',-4,4,0,4,5,0);
 fill('fuselage','LIGHT_GRAY',-4,3,0,4,3,0);
 fill('cowl','YELLOW',5,4,0,7,5,0);
 put('prop','BLACK',8,5,0);
 put('prop','GRAY',9,5,0);
 put('prop','BLACK',9,7,0); put('prop','BLACK',9,6,0);
 put('prop','BLACK',9,4,0); put('prop','BLACK',9,3,0);
 put('prop','BLACK',9,5,-2); put('prop','BLACK',9,5,-1);
 put('prop','BLACK',9,5,1);  put('prop','BLACK',9,5,2);
 fill('wing','WHITE',2,4,-1,3,4,-4);
 fill('wing','WHITE',2,4,1,3,4,4);
 fill('vtail','WHITE',-4,6,0,-4,7,0);
 put('vtail','RED',-4,6,0);
 put('htail','WHITE',-4,4,-1); put('htail','WHITE',-4,4,-2);
 put('htail','WHITE',-4,4,1);  put('htail','WHITE',-4,4,2);
 fill('cockpit','GLASS',0,6,0,1,6,0);
 put('cockpit','BLACK',-1,6,0);
 put('gear','BLACK',3,3,-2); put('gear','BLACK',3,3,2); put('gear','BLACK',-3,3,0);
 put('roundel','RED',3,4,-3); put('roundel','RED',3,4,3);
 return L;
}

function buildSmall(){
 const {L,put,fill} = makeCtx();
 fill('fuselage','WHITE',-4,5,-1,8,7,1);
 fill('fuselage','LIGHT_GRAY',-4,4,-1,8,4,1);
 fill('fuselage','LIGHT_GRAY',-4,5,-2,8,7,-2);
 fill('fuselage','LIGHT_GRAY',-4,5,2,8,7,2);
 fill('cowl','YELLOW',9,5,-1,10,7,1);
 fill('wing','WHITE',2,5,-2,5,5,-4);
 fill('wing','WHITE',3,5,-5,4,5,-6);
 fill('wing','WHITE',2,5,2,5,5,4);
 fill('wing','WHITE',3,5,5,4,5,6);
 fill('vtail','WHITE',-4,6,0,-2,8,0);
 put('vtail','WHITE',-3,9,0);
 fill('vtail','RED',-4,6,0,-4,8,0);
 fill('htail','WHITE',-4,5,-1,-2,5,-3);
 fill('htail','WHITE',-4,5,1,-2,5,3);
 fill('cockpit','GLASS',0,8,-1,2,8,1);
 put('cockpit','BLACK',-1,8,0);
 put('prop','BLACK',11,6,0);
 put('prop','BLACK',12,8,0); put('prop','BLACK',12,7,0);
 put('prop','BLACK',12,5,0); put('prop','BLACK',12,4,0);
 put('prop','BLACK',12,6,-1); put('prop','BLACK',12,6,1);
 put('prop','GRAY',12,6,0); put('prop','GRAY',13,6,0);
 put('gear','GRAY',3,4,-3); put('gear','BLACK',3,3,-3);
 put('gear','GRAY',3,4,3);  put('gear','BLACK',3,3,3);
 put('gear','GRAY',-3,4,0); put('gear','BLACK',-3,3,0);
 put('roundel','RED',3,5,-4); put('roundel','RED',3,5,4);
 put('roundel','RED',-1,6,-2); put('roundel','RED',-1,6,2);
 put('antenna','IRON',-2,9,0); put('antenna','IRON',-1,10,0); put('antenna','IRON',0,10,0);
 return L;
}

const MODELS = {
 slim:  { build: buildSlim,  initY: 5, defaultTitle: {zh:'零式戰鬥機 · 對稱瘦身版', en:'A6M Zero · Slim'} },
 small: { build: buildSmall, initY: 6, defaultTitle: {zh:'零式戰鬥機 · 縮小版', en:'A6M Zero · Small'} },
 full:  { build: buildFull,  initY: 7, defaultTitle: {zh:'零式戰鬥機 · 完整版', en:'A6M Zero · Full'} }
};

/* ================= 狀態 ================= */
const stateCache = {};
let currentModel = 'slim';
let S = null;

function createState(key){
 return {
   layers: MODELS[key].build(),
   hiddenParts: new Set(),
   currentY: MODELS[key].initY,
   selectedPart: null,
   pinned: null,
   hoveredPart: null
 };
}

function loadModel(key){
 currentModel = key;
 if(!stateCache[key]) stateCache[key] = createState(key);
 S = stateCache[key];
 document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.model === key));
 $('fleetPanel').style.display = (key === 'small' || key === 'slim') ? '' : 'none';
 updateBounds();
}

/* ================= 邊界 ================= */
let X_MIN=-10,X_MAX=28,Y_MIN=2,Y_MAX=18,Z_MIN=-20,Z_MAX=20;
const CELL=12, AXIS=22, GAP=1;

function updateBounds(){
 let xm=1e9,xM=-1e9,ym=1e9,yM=-1e9,zm=1e9,zM=-1e9;
 for(const [y,m] of S.layers){
   if(y<ym)ym=y; if(y>yM)yM=y;
   for(const k of m.keys()){
     const [x,z]=k.split(',').map(Number);
     if(x<xm)xm=x; if(x>xM)xM=x;
     if(z<zm)zm=z; if(z>zM)zM=z;
   }
 }
 if(!isFinite(xm)){ X_MIN=-10;X_MAX=28;Y_MIN=2;Y_MAX=18;Z_MIN=-20;Z_MAX=20; return; }
 X_MIN=xm-1; X_MAX=xM+1; Y_MIN=ym-1; Y_MAX=yM+1; Z_MIN=zm-1; Z_MAX=zM+1;
}

/* ================= 工具 ================= */
function partBlockCount(part){
 let n=0; for(const [,m] of S.layers) for(const [,d] of m) if(d.part===part) n++;
 return n;
}
function getPartLayers(part){
 const ys=[];
 for(const [y,m] of S.layers){
   for(const [,d] of m) if(d.part===part){ys.push(y);break;}
 }
 return ys.sort((a,b)=>a-b);
}
function partBlockSet(part){
 const set=new Set();
 for(const [,m] of S.layers) for(const [,d] of m) if(d.part===part) set.add(d.t);
 return set;
}
const isPartVisible = p => !S.hiddenParts.has(p);
const activeHighlightPart = () => S.hoveredPart || S.selectedPart;

/* ================= 逐層渲染 ================= */
const layerGrid=$('layerGrid'), layerCoord=$('layerCoord'),
      layerTitle=$('layerTitle'), layerMeta=$('layerMeta'),
      partlistEl=$('partlist'), ylistEl=$('ylist');

function renderLayer(){
 const y = S.currentY;
 const cols=X_MAX-X_MIN+1, rows=Z_MAX-Z_MIN+1;
 layerGrid.innerHTML='';
 layerGrid.style.gridTemplateColumns = `${AXIS}px repeat(${cols},${CELL}px)`;
 layerGrid.style.gridTemplateRows    = `${AXIS}px repeat(${rows},${CELL}px)`;
 layerGrid.style.gap = GAP+'px';
 for(let x=X_MIN;x<=X_MAX;x++){
   if((x-X_MIN)%3) continue;
   const a=document.createElement('div'); a.className='axis';
   a.style.gridColumn=x-X_MIN+2; a.style.gridRow=1; a.textContent=x; layerGrid.appendChild(a);
 }
 for(let z=Z_MIN;z<=Z_MAX;z++){
   if((z-Z_MIN)%3) continue;
   const a=document.createElement('div'); a.className='axis';
   a.style.gridColumn=1; a.style.gridRow=z-Z_MIN+2; a.textContent=z; layerGrid.appendChild(a);
 }
 const map = S.layers.get(y) || new Map();
 let vis=0;
 for(let z=Z_MIN;z<=Z_MAX;z++) for(let x=X_MIN;x<=X_MAX;x++){
   const raw = map.get(x+','+z);
   const d = document.createElement('div');
   d.className='cell';
   d.dataset.x=x; d.dataset.z=z;
   if(raw){
     d.style.background = (B[raw.t]||{hex:'#ff00ff'}).hex;
     d.dataset.part = raw.part;
     d.dataset.type = raw.t;
     d.title = `Y=${y} X=${x} Z=${z}\n${partName(raw.part)} · ${blockName(raw.t)}`;
     if(!isPartVisible(raw.part)) d.classList.add('dimmed');
     else if(S.selectedPart && raw.part!==S.selectedPart) d.classList.add('faded');
     if(isPartVisible(raw.part)) vis++;
   } else d.classList.add('empty');
   d.style.gridColumn=x-X_MIN+2; d.style.gridRow=z-Z_MIN+2;
   layerGrid.appendChild(d);
 }
 layerTitle.textContent = I18N[lang].layerTitle + y;
 layerMeta.textContent = `${vis} / ${map.size}`;
 applyHighlight(); applyPin(); render3D();
}

/* ================= 3D 等角 ================= */
let iso3dMode='all';
function shade(hex,f){
 const n=parseInt(hex.slice(1),16);
 let r=(n>>16)&255,g=(n>>8)&255,b=n&255;
 r=Math.min(255,Math.round(r*f));g=Math.min(255,Math.round(g*f));b=Math.min(255,Math.round(b*f));
 return `rgb(${r},${g},${b})`;
}
function render3D(){
 const cv=$('iso3d'); if(!cv) return;
 const panel=cv.closest('details'); if(panel && !panel.open) return;
 const dpr=window.devicePixelRatio||1;
 const rc=cv.getBoundingClientRect(), W=rc.width, H=rc.height;
 if(!W||!H) return;
 cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr);
 const ctx=cv.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,W,H);
 const cubes=[];
 for(const [y,m] of S.layers){
   if(iso3dMode==='single' && y!==S.currentY) continue;
   if(iso3dMode==='slice'  && Math.abs(y-S.currentY)>1) continue;
   for(const [k,d] of m){
     if(!isPartVisible(d.part)) continue;
     const [x,z]=k.split(',').map(Number);
     cubes.push({x,y,z,t:d.t,part:d.part});
   }
 }
 if(!cubes.length){
   ctx.fillStyle='#5c6875'; ctx.font='12px sans-serif'; ctx.textAlign='center';
   ctx.fillText(lang==='zh'?'沒有可顯示的方塊':'No visible blocks', W/2, H/2);
   return;
 }
 let mnX=1e9,mxX=-1e9,mnY=1e9,mxY=-1e9;
 for(const c of cubes) for(const dx of [0,1]) for(const dy of [0,1]) for(const dz of [0,1]){
   const px=(c.x+dx-c.z-dz)*0.866;
   const py=(c.x+dx+c.z+dz)*0.5-(c.y+dy);
   if(px<mnX)mnX=px; if(px>mxX)mxX=px;
   if(py<mnY)mnY=py; if(py>mxY)mxY=py;
 }
 const pad=8, Scl=Math.min((W-pad*2)/(mxX-mnX),(H-pad*2)/(mxY-mnY));
 const ox=pad+(W-pad*2-(mxX-mnX)*Scl)/2-mnX*Scl;
 const oy=pad+(H-pad*2-(mxY-mnY)*Scl)/2-mnY*Scl;
 cubes.sort((a,b)=>(a.x+a.y+a.z)-(b.x+b.y+b.z));
 const P=(px,py,pz)=>[ox+(px-pz)*0.866*Scl, oy+(px+pz)*0.5*Scl-py*Scl];
 const poly=(pts,fill)=>{ctx.fillStyle=fill;ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);
   for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.closePath();ctx.fill();};
 const hl = activeHighlightPart();
 for(const c of cubes){
   const {x,y,z,t,part}=c;
   const base=(B[t]||{hex:'#ff00ff'}).hex;
   const top   =[P(x,y+1,z),P(x+1,y+1,z),P(x+1,y+1,z+1),P(x,y+1,z+1)];
   const left  =[P(x,y,z+1),P(x,y+1,z+1),P(x+1,y+1,z+1),P(x+1,y,z+1)];
   const right =[P(x+1,y,z),P(x+1,y+1,z),P(x+1,y+1,z+1),P(x+1,y,z+1)];
   let tc=shade(base,1.15), lc=shade(base,0.55), rc=shade(base,0.82);
   if(hl && part!==hl){ tc=shade(base,0.35); lc=shade(base,0.20); rc=shade(base,0.28); }
   poly(top,tc); poly(left,lc); poly(right,rc);
   if(hl && part===hl){
     ctx.strokeStyle='#ffd166'; ctx.lineWidth=1.2;
     ctx.beginPath(); ctx.moveTo(top[0][0],top[0][1]);
     for(let i=1;i<top.length;i++) ctx.lineTo(top[i][0],top[i][1]);
     ctx.closePath(); ctx.stroke();
   }
   if(S.pinned && S.pinned.x===x && S.pinned.y===y && S.pinned.z===z){
     ctx.strokeStyle='#4a90e2'; ctx.lineWidth=1.6;
     ctx.beginPath(); ctx.moveTo(top[0][0],top[0][1]);
     for(let i=1;i<top.length;i++) ctx.lineTo(top[i][0],top[i][1]);
     ctx.closePath(); ctx.stroke();
   }
 }
}

/* ================= 高亮 / 釘選 / 十字 ================= */
function setCrosshair(x,z){
 document.querySelectorAll('.cross').forEach(el=>el.classList.remove('cross'));
 if(x!==undefined) layerGrid.querySelectorAll(`[data-x="${x}"]`).forEach(el=>el.classList.add('cross'));
 if(z!==undefined) layerGrid.querySelectorAll(`[data-z="${z}"]`).forEach(el=>el.classList.add('cross'));
}
function clearCrosshair(){ document.querySelectorAll('.cross').forEach(el=>el.classList.remove('cross')); }
function applyHighlight(){
 document.querySelectorAll('.hl').forEach(el=>el.classList.remove('hl'));
 const a = activeHighlightPart();
 if(a && isPartVisible(a)){
   layerGrid.querySelectorAll(`[data-part="${a}"]`).forEach(el=>el.classList.add('hl'));
 }
}
function applyPin(){
 document.querySelectorAll('.pinned').forEach(el=>el.classList.remove('pinned'));
 const pc=$('pinCard');
 if(!S.pinned){ pc.innerHTML='<span class="empty-msg">'+I18N[lang].clickToPin+'</span>'; return; }
 const p=S.pinned;
 layerGrid.querySelectorAll(`[data-x="${p.x}"][data-z="${p.z}"]`).forEach(el=>{
   if(el.style.gridRow === (p.z-Z_MIN+2)) el.classList.add('pinned');
 });
 const m=S.layers.get(p.y);
 const raw=m && m.get(p.x+','+p.z);
 if(raw){
   pc.innerHTML=`<div class="pin-coord">X=${p.x} Y=${p.y} Z=${p.z}</div>
     <div class="pin-name">${raw.t} · ${blockName(raw.t)}</div>
     <div class="pin-part">▸ ${partName(raw.part)}</div>`;
 } else {
   pc.innerHTML=`<div class="pin-coord">X=${p.x} Y=${p.y} Z=${p.z}</div>
     <div class="empty-msg">${I18N[lang].emptyLayer}</div>`;
 }
}

/* ================= 格子事件 ================= */
layerGrid.addEventListener('mouseover',e=>{
 const c=e.target.closest('.cell'); if(!c) return;
 const x=+c.dataset.x, z=+c.dataset.z;
 layerCoord.textContent=`X=${x} Z=${z}`;
 setCrosshair(x,z);
});
layerGrid.addEventListener('mouseleave',()=>{
 clearCrosshair(); layerCoord.textContent='';
});
layerGrid.addEventListener('click',e=>{
 const c=e.target.closest('.cell'); if(!c) return;
 const x=+c.dataset.x, z=+c.dataset.z, y=S.currentY;
 const m=S.layers.get(y);
 const cur=m && m.get(x+','+z);
 if(e.shiftKey){
   openBlockPicker(e.clientX, e.clientY, (code)=>{
     const mm=S.layers.get(y) || new Map();
     S.layers.set(y, mm);
     const part = cur ? cur.part : 'fuselage';
     mm.set(x+','+z,{t:code, part});
     renderAll();
   }, {x,y,z, allowDelete:true});
   return;
 }
 if(S.pinned && S.pinned.x===x && S.pinned.y===y && S.pinned.z===z) S.pinned=null;
 else S.pinned={x,y,z};
 applyPin(); render3D();
});

/* ================= Block Picker ================= */
let pickerCb = null, pickerCtx = null;
function openBlockPicker(cx, cy, cb, ctx){
 pickerCb = cb; pickerCtx = ctx || {};
 const pk = $('blockPicker');
 pk.querySelector('.pk-title').textContent =
   ctx && ctx.x!==undefined ? `換方塊  Y=${ctx.y} X=${ctx.x} Z=${ctx.z}` : (lang==='zh'?'選擇方塊':'Pick a block');
 const grid = $('pkGrid'); grid.innerHTML='';
 const codes = Object.keys(B);
 codes.forEach(code=>{
   const b = B[code];
   const btn = document.createElement('button');
   btn.className='pk-btn';
   btn.innerHTML = `<span class="sw" style="background:${b.hex}"></span>
     <span class="code">${code}</span>
     <span class="py">${b.mc}</span>`;
   btn.title = blockName(code)+' · '+b.mc;
   btn.onclick = ()=>{
     if(pickerCb) pickerCb(code);
     closePicker();
   };
   grid.appendChild(btn);
 });
 if(ctx && ctx.allowDelete){
   const del = document.createElement('button');
   del.className='pk-btn';
   del.style.gridColumn='span 5';
   del.style.background='#3a1a1a';
   del.style.color='#ff8888';
   del.textContent = lang==='zh'?'✕ 刪除此格':'✕ Delete this cell';
   del.onclick = ()=>{
     const m=S.layers.get(ctx.y);
     if(m){ m.delete(ctx.x+','+ctx.z); if(!m.size) S.layers.delete(ctx.y); }
     closePicker(); renderAll();
   };
   grid.appendChild(del);
 }
 pk.classList.add('show');
 const r = pk.getBoundingClientRect();
 pk.style.left = Math.min(window.innerWidth - r.width - 10, Math.max(10, cx||200)) + 'px';
 pk.style.top  = Math.min(window.innerHeight - r.height - 10, Math.max(10, (cy||200)+20)) + 'px';
}
function closePicker(){ $('blockPicker').classList.remove('show'); pickerCb=null; pickerCtx=null; }
document.addEventListener('click', e=>{
 if($('blockPicker').classList.contains('show') &&
    !e.target.closest('#blockPicker') && !e.target.closest('.cell')) closePicker();
});

/* ================= 部件列表 (最少放最前面) ================= */
function renderPartList(){
 partlistEl.innerHTML='';
 const sortedParts = [...PART_ORDER].sort((a,b) => partBlockCount(a) - partBlockCount(b));
 sortedParts.forEach(key=>{
   const n = partBlockCount(key);
   const ys = getPartLayers(key);
   const hidden = S.hiddenParts.has(key);
   const sel = S.selectedPart === key;
   const d = document.createElement('div');
   d.className='part-item';
   if(hidden) d.classList.add('hidden');
   if(sel) d.classList.add('selected');
   d.dataset.part = key;
   const set = partBlockSet(key);
   const dotColor = set.size ? B[[...set][0]].hex : '#555';
   d.innerHTML = `
     <span class="part-check"></span>
     <span class="part-dot" style="background:${dotColor}"></span>
     <span>${partName(key)}</span>
     <span class="part-count">${n}</span>`;
   const chk = d.querySelector('.part-check');
   chk.addEventListener('click', ev=>{ ev.stopPropagation(); togglePart(key); });
   d.addEventListener('click', ev=>{ if(ev.target===chk) return; selectPart(key); });
   d.addEventListener('mouseenter', ()=>{ if(hidden) return; S.hoveredPart=key; applyHighlight(); render3D(); });
   d.addEventListener('mouseleave', ()=>{ S.hoveredPart=null; applyHighlight(); render3D(); });
   partlistEl.appendChild(d);
 });
}
function togglePart(key){
 if(S.hiddenParts.has(key)) S.hiddenParts.delete(key);
 else S.hiddenParts.add(key);
 if(S.selectedPart===key && S.hiddenParts.has(key)) S.selectedPart=null;
 renderPartList(); renderLayer(); render3D();
}
function selectPart(key){
 if(key===null){ S.selectedPart=null; markPartLayers(null); renderPartList(); renderLayer(); return; }
 if(S.selectedPart===key){ S.selectedPart=null; markPartLayers(null); }
 else {
   S.selectedPart=key; S.hoveredPart=null;
   const ys=getPartLayers(key);
   if(ys.length && !ys.includes(S.currentY)){ S.currentY=ys[0]; updateYActive(S.currentY); }
   markPartLayers(key);
 }
 renderPartList(); renderLayer();
}
function markPartLayers(part){
 document.querySelectorAll('.ybtn').forEach(btn=>{
   if(!part){ btn.classList.remove('has-part'); return; }
   const y=+btn.dataset.y, m=S.layers.get(y);
   let has=false;
   if(m) for(const [,d] of m) if(d.part===part){has=true;break;}
   btn.classList.toggle('has-part',has);
 });
}
document.querySelector('.actions').addEventListener('click',e=>{
 const b=e.target.closest('.mini-btn'); if(!b) return; e.stopPropagation();
 const act=b.dataset.act;
 if(act==='all') S.hiddenParts.clear();
 else if(act==='none') PART_ORDER.forEach(k=>S.hiddenParts.add(k));
 else if(act==='invert'){
   const nh=new Set();
   PART_ORDER.forEach(k=>{ if(!S.hiddenParts.has(k)) nh.add(k); });
   S.hiddenParts.clear(); nh.forEach(k=>S.hiddenParts.add(k));
 }
 if(S.selectedPart && S.hiddenParts.has(S.selectedPart)) S.selectedPart=null;
 renderPartList(); renderLayer(); render3D();
});

/* ================= Y 樓層 ================= */
function updateYActive(y){
 document.querySelectorAll('.ybtn').forEach(b=>b.classList.toggle('active',+b.dataset.y===y));
}
function rebuildYButtons(){
 ylistEl.innerHTML='';
 const YS=[...S.layers.keys()].sort((a,b)=>a-b);
 YS.forEach(y=>{
   const n=S.layers.get(y).size;
   const b=document.createElement('button');
   b.className='ybtn'; b.dataset.y=y;
   b.innerHTML=`<span>Y = ${y}</span><span class="cnt">${n}</span>`;
   b.onclick=()=>{ S.currentY=y; updateYActive(y); renderLayer(); };
   ylistEl.appendChild(b);
 });
 return YS;
}

/* ================= 部件材質面板 ================= */
function renderPartMat(){
 const el=$('partMatList'); el.innerHTML='';
 PART_ORDER.forEach(part=>{
   const set = partBlockSet(part);
   const row = document.createElement('div');
   row.className='pm-row';
   let swColor = '#333', label = I18N[lang].unused, disabled = false;
   if(set.size===1){ const c=[...set][0]; swColor=B[c].hex; label=blockName(c); }
   else if(set.size>1){ swColor = B[[...set][0]].hex; label = I18N[lang].mixed + ` (${set.size})`; }
   else disabled = true;
   const btn = document.createElement('button');
   btn.className='pm-btn'; btn.disabled = disabled;
   btn.innerHTML = `<span class="sw" style="background:${swColor}"></span>
     <span class="lbl">${label}</span>`;
   btn.onclick = (ev)=>{
     ev.stopPropagation();
     if(disabled) return;
     openBlockPicker(ev.clientX, ev.clientY, (code)=>{
       for(const [,m] of S.layers) for(const [,d] of m) if(d.part===part) d.t = code;
       renderAll();
     });
   };
   row.innerHTML = `<span class="part-dot" style="background:${swColor}"></span>
     <span class="pm-name">${partName(part)}</span>`;
   row.appendChild(btn);
   el.appendChild(row);
 });
}

/* ================= 材料統計 ================= */
function renderMatList(){
 const el=$('matList'); el.innerHTML='';
 const counts={}; let total=0;
 for(const [,m] of S.layers) for(const [,d] of m){
   if(!isPartVisible(d.part)) continue;
   counts[d.t]=(counts[d.t]||0)+1; total++;
 }
 Object.keys(counts).sort((a,b)=>counts[b]-counts[a]).forEach(code=>{
   const b=B[code]; if(!b) return;
   const row=document.createElement('div'); row.className='mat-row';
   row.innerHTML = `<span class="sw" style="background:${b.hex}"></span>
     <span class="nm">${blockName(code)}</span>
     <span class="cnt">${counts[code]}</span>`;
   el.appendChild(row);
 });
 $('totalCount').textContent = total;
}

/* ================= 圖例 ================= */
function renderLegend(){
 const el=$('legend'); el.innerHTML='';
 Object.keys(B).forEach(code=>{
   const d=document.createElement('div'); d.className='lg';
   d.innerHTML=`<span class="sw" style="background:${B[code].hex}"></span><span>${blockName(code)}</span>`;
   el.appendChild(d);
 });
}

/* ================= 群飛 ================= */
function getFleetOffsets(){
 if(currentModel !== 'small' && currentModel !== 'slim') return [[0,0]];
 
 const count = Math.max(1, Math.min(16, parseInt($('fleetCount').value)||1));
 const layout = $('fleetLayout').value;
 const gap = parseInt($('fleetGap').value)||22;
 if(count===1) return [[0,0]];
 if(layout==='line'){
   const offs=[];
   for(let i=0;i<count;i++) offs.push([-i*gap, 0]);
   return offs;
 }
 if(layout==='grid'){
   const offs=[];
   const cols = 4;
   for(let i=0;i<count;i++){
     const c = i % cols, r = Math.floor(i/cols);
     offs.push([-r*(gap*0.9), (c - (cols-1)/2)*gap*0.75]);
   }
   return offs;
 }
 // V 字形
 const offs=[[0,0]];
 for(let i=1;i<count;i++){
   const side = (i % 2 === 1) ? 1 : -1;
   const step = Math.ceil(i/2);
   offs.push([-step*gap, side*step*gap]);
 }
 return offs;
}
['fleetCount','fleetLayout','fleetGap'].forEach(id=>{
 $(id).addEventListener('input', ()=>{ });
});

/* ================= 合併資料區段 ================= */
function mergeCells(cells){
 const byYTZ = new Map();
 for(const c of cells){
   const k = c.y+'|'+c.t+'|'+c.z;
   if(!byYTZ.has(k)) byYTZ.set(k, {y:c.y,z:c.z,t:c.t,xs:[]});
   byYTZ.get(k).xs.push(c.x);
 }
 const out=[];
 for(const v of byYTZ.values()){
   v.xs.sort((a,b)=>a-b);
   let s=v.xs[0], prev=v.xs[0];
   for(let i=1;i<v.xs.length;i++){
     if(v.xs[i]===prev+1) prev=v.xs[i];
     else { out.push({x1:s,x2:prev,y:v.y,z:v.z,t:v.t}); s=v.xs[i]; prev=v.xs[i]; }
   }
   out.push({x1:s,x2:prev,y:v.y,z:v.z,t:v.t});
 }
 out.sort((a,b)=> a.y-b.y || a.z-b.z || a.x1-b.x1);
 return out;
}

/* ================= Python 生成 ================= */
function generatePython(){
 const L=S.layers;
 const usedT = new Set();
 const byPart = new Map();
 for(const [y,m] of L){
   for(const [key,d] of m){
     const [x,z]=key.split(',').map(Number);
     usedT.add(d.t);
     if(!byPart.has(d.part)) byPart.set(d.part, []);
     byPart.get(d.part).push({x,y,z,t:d.t});
   }
 }
 const fleet = getFleetOffsets();
 const lines=[];
 lines.push('def build_zero():');
 lines.push('    player.say("執行零式戰鬥機建造腳本...")');
 lines.push('    p = player.position()');
 lines.push('');
 lines.push('    # ===== 材質定義 =====');
 [...usedT].sort().forEach(t=>{
   lines.push(`    ${B[t].py} = blocks.block_by_name("${B[t].mc}")`);
 });
 lines.push('');
 lines.push('    def _build(origin):');
 lines.push('        p = origin');
 PART_ORDER.forEach(part=>{
   const cells = byPart.get(part);
   if(!cells || !cells.length) return;
   lines.push('');
   lines.push('        # ── ' + partName(part) + ' ──');
   const merged = mergeCells(cells);
   for(const seg of merged){
     if(seg.x1===seg.x2){
       lines.push(`        blocks.place(${B[seg.t].py}, positions.add(p, pos(${seg.x1}, ${seg.y}, ${seg.z})))`);
     } else {
       lines.push(`        blocks.fill(${B[seg.t].py}, positions.add(p, pos(${seg.x1}, ${seg.y}, ${seg.z})), positions.add(p, pos(${seg.x2}, ${seg.y}, ${seg.z})), FillOperation.REPLACE)`);
     }
   }
 });
 lines.push('');
 
 if (fleet.length === 1) {
     lines.push('    _build(p)');
 } else {
     lines.push('    FLEET = ' + JSON.stringify(fleet));
     lines.push('    for offset in FLEET:');
     lines.push('        _build(positions.add(p, pos(offset[0], 0, offset[1])))');
 }
 
 lines.push('');
 lines.push('    player.say("零式戰鬥機建造完成！")');
 lines.push('');
 lines.push('player.on_chat("zero", build_zero)');
 return lines.join('\n');
}

/* ================= 複製按鈕 ================= */
$('copyPyBtn').addEventListener('click', async ()=>{
 const code = generatePython();
 try{
   await navigator.clipboard.writeText(code);
   toast(I18N[lang].toastCopy);
 }catch(e){
   const ta=document.createElement('textarea');
   ta.value=code; document.body.appendChild(ta); ta.select();
   try{ document.execCommand('copy'); toast(I18N[lang].toastCopy); }
   catch(err){ toast(I18N[lang].toastCopyFail, true); }
   ta.remove();
 }
});

/* ================= 重置 ================= */
$('resetBtn').addEventListener('click', ()=>{
 if(!confirm(I18N[lang].confirmReset)) return;
 stateCache[currentModel] = createState(currentModel);
 S = stateCache[currentModel];
 updateBounds(); rebuildYButtons(); updateYActive(S.currentY);
 renderAll();
 toast(I18N[lang].toastReset);
});

/* ================= 3D 模式 ================= */
$('modeRow').addEventListener('click', e=>{
 const b=e.target.closest('.mode-btn'); if(!b) return;
 document.querySelectorAll('.mode-btn').forEach(x=>x.classList.toggle('active',x===b));
 iso3dMode = b.dataset.mode; render3D();
});

/* ================= 鍵盤 ================= */
document.addEventListener('keydown', e=>{
 if(e.target.matches('input,textarea,select')) return;
 if(e.target.isContentEditable) return;
 if(e.key==='ArrowUp'||e.key==='ArrowDown'){
   e.preventDefault();
   const YS=[...S.layers.keys()].sort((a,b)=>a-b), i=YS.indexOf(S.currentY);
   if(i===-1) return;
   let ni = e.key==='ArrowUp' ? i+1 : i-1;
   ni = Math.max(0, Math.min(YS.length-1, ni));
   if(ni!==i){ S.currentY=YS[ni]; updateYActive(S.currentY); renderLayer(); }
   return;
 }
 if(e.key==='Escape'){
   if(S.pinned){ S.pinned=null; applyPin(); render3D(); e.preventDefault(); }
   if(S.selectedPart){ S.selectedPart=null; markPartLayers(null); renderPartList(); renderLayer(); e.preventDefault(); }
   closePicker(); return;
 }
 if(e.key==='Tab'){
   e.preventDefault();
   const ks = PART_ORDER.filter(k=>!S.hiddenParts.has(k));
   if(!ks.length) return;
   const i = S.selectedPart ? ks.indexOf(S.selectedPart) : -1;
   selectPart(ks[(i+1)%ks.length]);
   return;
 }
 if(e.key==='`'||e.key==='~'){
   e.preventDefault();
   const allH = PART_ORDER.every(k=>S.hiddenParts.has(k));
   if(allH) S.hiddenParts.clear();
   else { PART_ORDER.forEach(k=>S.hiddenParts.add(k)); S.selectedPart=null; markPartLayers(null); }
   renderPartList(); renderLayer(); render3D();
   toast(allH ? (lang==='zh'?'全部顯示':'Show all') : (lang==='zh'?'全部隱藏':'Hide all'));
 }
});

/* ================= Toast ================= */
function toast(msg, err){
 const t=$('toast'); t.textContent=msg;
 t.className='show'+(err?' error':'');
 clearTimeout(t._t);
 t._t = setTimeout(()=>t.className='', 2200);
}

/* ================= 語言 ================= */
function applyLang(newLang){
 lang = newLang; LS.set(LANG_KEY, lang);
 document.documentElement.lang = lang==='zh' ? 'zh-Hant' : 'en';
 document.querySelectorAll('[data-i18n]').forEach(el=>{
   const k = el.dataset.i18n;
   if(I18N[lang][k]!==undefined) el.textContent = I18N[lang][k];
 });
 $('langBtn').textContent = lang==='zh' ? '🌐 EN' : '🌐 中';
 const lay = $('fleetLayout');
 if(lay){
   lay.options[0].textContent = lang==='zh' ? 'V 字形' : 'V Shape';
   lay.options[1].textContent = lang==='zh' ? '4×4 網格' : '4×4 Grid';
   lay.options[2].textContent = lang==='zh' ? '單排橫列' : 'Single Line';
 }
 renderAll();
}
$('langBtn').addEventListener('click', ()=> applyLang(lang==='zh'?'en':'zh'));

/* ================= 渲染總入口 ================= */
function renderAll(){
 updateBounds();
 rebuildYButtons();
 updateYActive(S.currentY);
 renderPartList();
 renderPartMat();
 renderLegend();
 renderMatList();
 renderLayer();
 render3D();
}

/* ================= Tab 切換 ================= */
document.querySelectorAll('.tab').forEach(t=>{
 t.addEventListener('click', ()=>{
   loadModel(t.dataset.model);
   renderAll();
 });
});

/* ================= 折疊記憶 ================= */
document.querySelectorAll('details[data-key]').forEach(d=>{
 const key = 'zero3_fold_' + d.dataset.key;
 const s = LS.get(key);
 if(s==='closed') d.open=false;
 else if(s==='open') d.open=true;
 d.addEventListener('toggle', ()=>{
   LS.set(key, d.open?'open':'closed');
   if(d.dataset.key==='iso3d' && d.open) setTimeout(()=>render3D(),50);
 });
});

/* ================= 初始化 ================= */
try{
 loadModel('slim'); 
 applyLang(lang);
}catch(err){
 console.error(err);
}

let rz;
window.addEventListener('resize', ()=>{
 clearTimeout(rz);
 rz = setTimeout(()=>render3D(), 100);
});