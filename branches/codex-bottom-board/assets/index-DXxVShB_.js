var U0=Object.defineProperty;var O0=(n,e,t)=>e in n?U0(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var ne=(n,e,t)=>O0(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const B0="modulepreload",k0=function(n,e){return new URL(n,e).href},Lh={},H0=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){let a=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));r=a(t.map(u=>{if(u=k0(u,i),u in Lh)return;Lh[u]=!0;const h=u.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!i)for(let _=o.length-1;_>=0;_--){const m=o[_];if(m.href===u&&(!h||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${d}`))return;const p=document.createElement("link");if(p.rel=h?"stylesheet":B0,h||(p.as="script"),p.crossOrigin="",p.href=u,c&&p.setAttribute("nonce",c),document.head.appendChild(p),h)return new Promise((_,m)=>{p.addEventListener("load",_),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},Ze=864,bn=1920,Yt=700,sc={width:950,height:156},z0=.6,ir=Ze*z0,qo=ir*sc.height/sc.width,$o=18,ac=(Ze-ir)/2,Ap=.14,V0=ac+ir*Ap,G0=ir-2*ir*Ap,Dh=sc,W0=20,X0=150,Y0=185,K0=110,q0=Y0+K0/2;function $0(){const n=Ze-2*W0,e=Dh.width/Dh.height;let t=X0,i=t*e;i>n&&(i=n,t=i/e);const r=(Ze-i)/2,s=q0-t/2;return{x:r,y:s,width:i,height:t}}const Wn=150,oc=56,j0=10,Io=Yt-j0,Z0=3,J0=254,Q0=233,Or=74,la=Or*J0/Q0,e_=12,t_=20,n_=oc+t_,wp=100,Rp=-50,i_=Wn-wp-Rp,r_="#FBBC45",s_=26,a_=18,o_=34,l_=20,Fh={width:2155,height:563},Ip=Or,Cp=Ip*Fh.width/Fh.height,c_=50,u_=20,h_=Ze-c_-Cp-u_,Nh={width:447,height:429},d_=.8,f_=.06,p_=.91,m_=.645,Uh=-5,g_=-2;function __(){const n=Math.min(300,Ze-2*oc);return{x:Ze-oc-n,width:n}}const Pp=bn-Yt-Wn,ye=8,x_=Yt+Wn,Rs=Math.min(Ze,Pp),v_=(Ze-Rs)/2,S_=(Pp-Rs)/2,Z={x:v_,y:x_+S_,width:Rs,height:Rs,cellSize:Rs/ye},lc={x:(Ze-480)/2,y:1570,width:480,height:112},Oh={x:Ze-150,y:Yt,width:150,height:Wn},jo=72,M_=8,y_=8,Tu={x:Ze-M_-jo,y:y_,width:jo,height:jo};function T_(n){const e=Tu,t=e.x+e.width/2,i=e.y+e.height/2,r=e.width/2;return Math.hypot(n.x-t,n.y-i)<=r}function qa(n,e){return n.x>=e.x&&n.y>=e.y&&n.x<e.x+e.width&&n.y<e.y+e.height}function cc(n){const e=n.x-Z.x,t=n.y-Z.y;return e<0||t<0||e>=Z.width||t>=Z.height?null:{col:Math.floor(e/Z.cellSize),row:Math.floor(t/Z.cellSize)}}const uo=2654435769;class ho{constructor(e=uo){ne(this,"state");this.state=e>>>0,this.state===0&&(this.state=uo)}nextUint32(){let e=this.state;return e^=e<<13,e^=e>>>17,e^=e<<5,this.state=e>>>0,this.state}nextFloat(){return this.nextUint32()/4294967296}nextInt(e,t){if(!Number.isInteger(e)||!Number.isInteger(t))throw new Error("nextInt bounds must be integers.");if(t<=e)throw new Error("nextInt maxExclusive must be greater than minInclusive.");return e+Math.floor(this.nextFloat()*(t-e))}getState(){return this.state}}function Zo(){if(typeof crypto<"u"&&"getRandomValues"in crypto){const e=new Uint32Array(1);return crypto.getRandomValues(e),e[0]===0?uo:e[0]}const n=Math.floor(Math.random()*4294967295)>>>0;return n===0?uo:n}const Yr=["FIRE","ICE","LIGHTNING","EARTH"],E_=["ROCKET_H","ROCKET_V","TNT","LIGHTBALL"];function ui(n){return Yr.includes(n)}function Ci(n){return E_.includes(n)}function Co(n){return ui(n)||n==="LAND"}function Js(n="tile"){let e=0;return()=>`${n}-${e++}`}function ur(n,e="tile"){let t=I_(n,e);return()=>`${e}-${t++}`}function hr(n,e,t,i=Js(`${n.toLowerCase()}-${e}-${t}`),r="IDLE"){return{id:i(),type:n,col:e,row:t,state:r,spawnedAtMs:0}}function Eu(n={}){return Array.from({length:ye},(e,t)=>Array.from({length:ye},(i,r)=>{var s;return{tile:null,blocker:null,modifier:null,isVoid:((s=n.voidCells)==null?void 0:s.some(a=>a.col===r&&a.row===t))??!1,isPath:!1}}))}function dt(n){return n.map(e=>e.map(t=>({tile:t.tile==null?null:{...t.tile},blocker:t.blocker==null?null:R_(t.blocker),modifier:t.modifier,isVoid:t.isVoid,isPath:t.isPath})))}function b_(n,e={},t=Js("tile")){const i=Eu(e);return Lp(i,n,t),i}function Lp(n,e,t=Js("tile")){for(let i=0;i<ye;i+=1)for(let r=0;r<ye;r+=1){const s=n[i][r];if(s.isVoid||s.tile!=null)continue;const a=Yr.filter(c=>!Dp(n,{col:r,row:i},c)),o=a.length>0?a:Yr,l=o[e.nextInt(0,o.length)];s.tile=hr(l,r,i,t)}}function Dp(n,e,t){return wi(n,e,t,-1,0)+wi(n,e,t,1,0)+1>=3||wi(n,e,t,0,-1)+wi(n,e,t,0,1)+1>=3}function wi(n,e,t,i,r){let s=0,a=e.col+i,o=e.row+r;for(;Po({col:a,row:o});){const l=n[o][a].tile;if((l==null?void 0:l.type)!==t)break;s+=1,a+=i,o+=r}return s}function Po(n){return n.col>=0&&n.col<ye&&n.row>=0&&n.row<ye}function gt(n,e){return Po(e)?n[e.row][e.col]:null}function Lo(n,e,t){const i=gt(n,e),r=gt(n,t);if(i==null||r==null)throw new Error("Cannot swap cells outside board.");const s=i.tile,a=r.tile;i.tile=a==null?null:{...a,col:e.col,row:e.row},r.tile=s==null?null:{...s,col:t.col,row:t.row}}function Ji(n){const e=[];for(let t=0;t<ye;t+=1)for(let i=0;i<ye;i+=1)n[t][i].isVoid||e.push({col:i,row:t});return e}function A_(n){const e=[];for(let t=0;t<ye;t+=1)for(let i=0;i<ye;i+=1)n[t][i].isVoid&&e.push({col:i,row:t});return e}function w_(n,e){return n.col===e.col&&n.row===e.row}function nt(n){return`${n.col},${n.row}`}function yn(n){const e=new Set,t=[];for(const i of n){const r=nt(i);e.has(r)||(e.add(r),t.push(i))}return Di(t)}function Di(n){return[...n].sort((e,t)=>e.row-t.row||e.col-t.col)}function R_(n){return{type:n.type,hp:n.hp,position:{...n.position}}}function I_(n,e){var r;const t=`${e}-`;let i=-1;for(const s of n)for(const a of s){const o=(r=a.tile)==null?void 0:r.id;if(o==null||!o.startsWith(t))continue;const l=o.slice(t.length);/^\d+$/.test(l)&&(i=Math.max(i,Number(l)))}return i+1}function Vn(n){return{cells:Ji(n).map(e=>{const t=n[e.row][e.col],i=t.tile;return i==null?null:{tileId:i.id,tileType:i.type,coord:e,isPath:t.isPath}}).filter(e=>e!=null)}}function Do(n,e,t){return{kind:n.kind??"resolution",revisionId:n.revisionId,swappedCells:n.swappedCells??null,preSwapSnapshot:Vn(n.preSwapBoard),postSwapSnapshot:Vn(n.postSwapBoard),cascadeSteps:e,finalSnapshot:Vn(t)}}function C_(n,e){const t={cells:[]},i=Vn(n),r=N_(n)?F_(n,i.cells):i.cells.map(s=>({tileId:s.tileId,tileType:s.tileType,from:{col:s.coord.col,row:s.coord.row-ye},to:s.coord,isPath:s.isPath})).sort((s,a)=>s.to.col-a.to.col||a.to.row-s.to.row);return{kind:"levelIntro",revisionId:e,swappedCells:null,preSwapSnapshot:t,postSwapSnapshot:t,cascadeSteps:[{stepIndex:0,beforeClearSnapshot:t,beforeGravitySnapshot:t,afterGravitySnapshot:t,finalSnapshot:i,clearedTiles:[],fallingTiles:[],refillTiles:r}],finalSnapshot:i}}function Fp(n,e,t,i){const r=dt(n);Lo(r,e,t);const s=Vn(n);return{kind:"invalidSwap",revisionId:i,swappedCells:{from:e,to:t},preSwapSnapshot:s,postSwapSnapshot:Vn(r),cascadeSteps:[],finalSnapshot:s}}function Fo(n,e,t,i,r,s,a=new Map,o=[]){const l=Vn(e),c=Vn(t),u=Vn(i),h=Vn(r),d=L_(l),f=Bh(c),p=Bh(u),_=new Set(u.cells.map(y=>y.tileId)),m=yn(s).map(y=>d.get(nt(y))).filter(y=>y!=null).map(y=>({...y,clearDelayMs:a.get(nt(y.coord))})),g=[...p.values()].map(y=>{const w=f.get(y.tileId);return w==null||V_(w.coord,y.coord)?null:{tileId:y.tileId,tileType:y.tileType,from:w.coord,to:y.coord,isPath:y.isPath,movementKind:w.coord.col===y.coord.col?"fall":"slide"}}).filter(y=>y!=null),x=h.cells.filter(y=>!_.has(y.tileId)).sort((y,w)=>y.coord.col-w.coord.col||w.coord.row-y.coord.row),M=D_(x,o);return{stepIndex:n,beforeClearSnapshot:l,beforeGravitySnapshot:c,afterGravitySnapshot:u,finalSnapshot:h,clearedTiles:k_(m),fallingTiles:H_(g),refillTiles:z_(M)}}function P_(n,e){if(n!=null)return{...n,revisionId:e}}function L_(n){return new Map(n.cells.map(e=>[nt(e.coord),e]))}function Bh(n){return new Map(n.cells.map(e=>[e.tileId,e]))}function D_(n,e=[]){const t=new Map(e.map(r=>[r.tileId,r])),i=new Map;return n.map(r=>{const s=t.get(r.tileId);if(s!=null)return{...s,tileType:r.tileType,to:r.coord,isPath:r.isPath};const a=i.get(r.coord.col)??0;return i.set(r.coord.col,a+1),{tileId:r.tileId,tileType:r.tileType,from:{col:r.coord.col,row:-1-a},to:r.coord,isPath:r.isPath}})}function F_(n,e){const t=new Map;return[...e].sort((i,r)=>i.coord.col-r.coord.col||r.coord.row-i.coord.row).map(i=>{if(!U_(n,i.coord)){const s=t.get(i.coord.col)??0;return t.set(i.coord.col,s+1),{tileId:i.tileId,tileType:i.tileType,from:{col:i.coord.col,row:-1-s},to:i.coord,isPath:i.isPath,movementKind:"fall"}}const r=O_(n,i.coord);return{tileId:i.tileId,tileType:i.tileType,from:{col:r,row:B_(n,r,i.coord.row)},to:i.coord,isPath:i.isPath,movementKind:"slide"}})}function N_(n){return n.some(e=>e.some(t=>t.isVoid))}function U_(n,e){for(let t=0;t<e.row;t+=1)if(n[t][e.col].isVoid)return!0;return!1}function O_(n,e){const t=e.col-1,i=e.col+1,r=(e.row+e.col)%2===0?[t,i]:[i,t];for(const s of r)if(s>=0&&s<ye&&n.some(a=>!a[s].isVoid))return s;return Math.max(0,Math.min(ye-1,e.col===0?1:e.col-1))}function B_(n,e,t){for(let i=t-1;i>=0;i-=1)if(!n[i][e].isVoid)return i;for(let i=t;i<ye;i+=1)if(!n[i][e].isVoid)return i;return-1}function k_(n){return[...n].sort((e,t)=>e.coord.row-t.coord.row||e.coord.col-t.coord.col)}function H_(n){return[...n].sort((e,t)=>e.to.row-t.to.row||e.to.col-t.to.col)}function z_(n){return[...n].sort((e,t)=>e.to.row-t.to.row||e.to.col-t.to.col)}function V_(n,e){return n.col===e.col&&n.row===e.row}const G_=30,Qs=120,ys=140,uc=50,Np=180,Up=180,Op=90,$a=180,Bp=630,kp=135,bu=45,Hp=8/30*1e3,ai=220,fo=560,zp=250,W_=500,Au=zp+W_,X_=45,Jo=2,kh=12,Vp=200,Y_=440,K_=2500,Hh=2.75,ki=2.75,q_=2.75,Gp=16;function Wp(n){if(n.kind==="invalidSwap")return ys+uc+Np;const e=No(n),t=e.length===0?Qs:e[e.length-1].endMs;return Math.max(t,Z_(n,e))}function No(n){let e=n.kind==="levelIntro"?0:Qs;return n.cascadeSteps.map(t=>{const i=e,r=i+$_(n,t),s=Xp(t),a=Q_(t),o={step:t,popStartMs:i,fallStartMs:r,endMs:r+a,fallDelaysByTileId:s};return e=o.endMs,o})}function $_(n,e){if(n.kind==="levelIntro")return 0;const t=Math.max(0,...e.clearedTiles.map(i=>i.clearDelayMs??0));return Math.max(t+Up,j_(e))}function j_(n){return n.clearedTiles.reduce((e,t)=>{if(t.tileType!=="ROCKET_H"&&t.tileType!=="ROCKET_V")return e;const i=Z.x+t.coord.col*Z.cellSize+Z.cellSize/2,r=Z.y+t.coord.row*Z.cellSize+Z.cellSize/2,a=(t.tileType==="ROCKET_H"?Math.max(i-(Z.x-ai),Z.x+Z.width+ai-i):Math.max(r-(Z.y-ai),Z.y+Z.height+ai-r))/Z.cellSize*bu;return Math.max(e,(t.clearDelayMs??0)+a+Hp)},0)}function Z_(n,e){return n.kind==="levelIntro"?0:e.reduce((t,i)=>{const r=i.step.clearedTiles.reduce((s,a)=>J_(a.tileType)?Math.max(s,i.popStartMs+(a.clearDelayMs??0)+fo):s,0);return Math.max(t,r)},0)}function J_(n){return n==="FIRE"||n==="ICE"||n==="LIGHTNING"||n==="EARTH"}function Q_(n){const e=Xp(n),t=Yp(n).reduce((i,r)=>{const s=Math.max(1,Math.abs(r.to.row-r.from.row)),a=ex(s*Op+kp,$a,Bp);return Math.max(i,(e.get(r.tileId)??0)+a)},$a);return Math.max($a,t)}function Xp(n){const e=new Map;for(const i of Yp(n))e.set(i.to.col,[...e.get(i.to.col)??[],i]);const t=new Map;for(const i of e.values())[...i].sort((s,a)=>a.to.row-s.to.row||a.from.row-s.from.row||s.tileId.localeCompare(a.tileId)).forEach((s,a)=>{t.set(s.tileId,a*G_)});return t}function Yp(n){return[...n.fallingTiles,...n.refillTiles]}function ex(n,e,t){return Math.max(e,Math.min(t,n))}function rr(n,e={}){const t=[...tx(n),...nx(n)];if(t.length===0)return[];const i=t.map((l,c)=>c),r=l=>{let c=i[l];for(;c!==i[c];)c=i[c];return i[l]=c,c},s=(l,c)=>{const u=r(l),h=r(c);u!==h&&(i[h]=u)},a=new Map;t.forEach((l,c)=>{for(const u of l.coords){const h=nt(u),d=a.get(h)??[];d.push(c),a.set(h,d)}});for(const l of a.values())for(let c=1;c<l.length;c+=1){const u=l[0],h=l[c];t[u].tileType===t[h].tileType&&s(u,h)}const o=new Map;return t.forEach((l,c)=>{const u=r(c),h=o.get(u)??[];h.push(l),o.set(u,h)}),[...o.values()].map(l=>ix(l,e.preferredSpawnCell)).sort((l,c)=>l.spawnCell.row-c.spawnCell.row||l.spawnCell.col-c.spawnCell.col)}function tx(n){var t;const e=[];for(let i=0;i<ye;i+=1){let r=0;for(;r<ye;){const s=n[i][r].tile;if(s==null||!Co(s.type)){r+=1;continue}const a=r,o=s.type;for(;r<ye&&((t=n[i][r].tile)==null?void 0:t.type)===o;)r+=1;r-a>=3&&e.push({axis:"horizontal",tileType:o,coords:Array.from({length:r-a},(l,c)=>({col:a+c,row:i}))})}}return e}function nx(n){var t;const e=[];for(let i=0;i<ye;i+=1){let r=0;for(;r<ye;){const s=n[r][i].tile;if(s==null||!Co(s.type)){r+=1;continue}const a=r,o=s.type;for(;r<ye&&((t=n[r][i].tile)==null?void 0:t.type)===o;)r+=1;r-a>=3&&e.push({axis:"vertical",tileType:o,coords:Array.from({length:r-a},(l,c)=>({col:i,row:a+c}))})}}return e}function ix(n,e){const t=yn(n.flatMap(a=>a.coords)),i=[...new Set(n.map(a=>a.axis))].sort(),r=rx(n,t.length),s=sx(r);return{tiles:t,tileType:n[0].tileType,axes:i,shape:r,spawnPowerUp:s,spawnCell:ax(t,e)}}function rx(n,e){var r;if(new Set(n.map(s=>s.axis)).size>1&&e>=5)return"tnt";const i=Math.max(...n.map(s=>s.coords.length));return i>=5?"lightball":i===4?((r=n.find(s=>s.coords.length===4))==null?void 0:r.axis)==="vertical"?"rocketV":"rocketH":"basic"}function sx(n){switch(n){case"rocketH":return"ROCKET_H";case"rocketV":return"ROCKET_V";case"lightball":return"LIGHTBALL";case"tnt":return"TNT";case"basic":return null}}function ax(n,e){if(e!=null&&n.some(s=>s.col===e.col&&s.row===e.row))return{...e};const t=n.reduce((s,a)=>({col:s.col+a.col,row:s.row+a.row}),{col:0,row:0}),i=t.col/n.length,r=t.row/n.length;return Di(n).reduce((s,a)=>{const o=zh(s,i,r);return zh(a,i,r)<o?a:s})}function zh(n,e,t){return(n.col-e)**2+(n.row-t)**2}const ox=new Set(["LOCK","METAL_PLATE","BOX"]);function Us(n,e,t){const i=gt(n,e),r=gt(n,t);if(i==null||r==null)return{valid:!1,reason:"outOfBounds"};if(!Kp(e,t))return{valid:!1,reason:"notAdjacent"};if(i.isVoid||r.isVoid)return{valid:!1,reason:"voidCell"};if(i.tile==null||r.tile==null)return{valid:!1,reason:"emptyCell"};if(Vh(i)||Vh(r))return{valid:!1,reason:"blockedCell"};if(i.tile.type==="LIGHTBALL"||r.tile.type==="LIGHTBALL")return{valid:!0,reason:"valid"};if(Ci(i.tile.type)||Ci(r.tile.type))return{valid:!0,reason:"valid"};const s=wu(n,e,t);return rr(s,{preferredSpawnCell:t}).length>0?{valid:!0,reason:"valid"}:{valid:!1,reason:"noMatch"}}function wu(n,e,t){const i=dt(n);return Lo(i,e,t),i}function lx(n){const e=[];for(let t=0;t<ye;t+=1)for(let i=0;i<ye;i+=1){const r={col:i,row:t},s={col:i+1,row:t},a={col:i,row:t+1};i+1<ye&&Us(n,r,s).valid&&e.push({from:r,to:s}),t+1<ye&&Us(n,r,a).valid&&e.push({from:r,to:a})}return e}function cx(n){return lx(n).length}function Kp(n,e){return Math.abs(n.col-e.col)+Math.abs(n.row-e.row)===1}function Vh(n){return n.blocker!=null&&ox.has(n.blocker.type)}function ux(n){const e=[];for(let t=0;t<ye;t+=1)for(let i=0;i<ye;i+=1){const r={col:i,row:t},s={col:i+1,row:t},a={col:i,row:t+1};if(i+1<ye){const o=Gh(n,r,s);o!=null&&e.push(o)}if(t+1<ye){const o=Gh(n,r,a);o!=null&&e.push(o)}}return e}function Gh(n,e,t){if(!Kp(e,t))return null;const i=gt(n,e),r=gt(n,t);if(i==null||r==null||i.isVoid||r.isVoid||i.tile==null||r.tile==null||!ui(i.tile.type)||!ui(r.tile.type))return null;const s=wu(n,e,t),a=rr(s,{preferredSpawnCell:t}).filter(u=>u.tiles.some(h=>Ki(h,e)||Ki(h,t)));if(a.length===0)return null;const l=(a.find(u=>u.tiles.some(h=>Ki(h,t)))??a[0]).tiles.some(u=>Ki(u,t))?e:t,c=Ki(l,e)?t:e;return{from:e,to:t,movingCell:l,direction:{col:c.col-l.col,row:c.row-l.row},flashCells:yn(a.flatMap(u=>u.tiles.map(h=>hx(h,e,t))))}}function hx(n,e,t){return Ki(n,t)?{...e}:Ki(n,e)?{...t}:{...n}}function Ki(n,e){return n.col===e.col&&n.row===e.row}function dx(n){return n==="ROCKET_H"||n==="ROCKET_V"}function Kr(n){return dx(n)||n==="TNT"||n==="LIGHTBALL"}function qp(n,e){var t,i;return((i=(t=gt(n,e))==null?void 0:t.tile)==null?void 0:i.type)!=="LIGHTBALL"?null:$p(n,e)}function $p(n,e){var r,s;const t=new Set;for(const a of Sx(e)){const o=(s=(r=gt(n,a))==null?void 0:r.tile)==null?void 0:s.type;o!=null&&ui(o)&&t.add(o)}if(t.size===0)return null;const i=Mx(n);return Yr.filter(a=>t.has(a)).reduce((a,o)=>a==null||i[o]>i[a]?o:a,null)}function jp(n,e,t={}){var u,h,d,f;const i=(h=(u=gt(n,e))==null?void 0:u.tile)==null?void 0:h.type;if(i==null||!Ci(i))throw new Error("Cannot resolve a power-up chain from a cell that does not contain a power-up tile.");const r=dt(n),s=[{coord:e,powerUpType:i,activationDelayMs:0,lightballTargetType:t.lightballTargetType}],a=new Set([nt(e)]),o=new Set,l=[];for(;s.length>0;){s.sort(px);const p=s.shift(),_=nt(p.coord);if(a.delete(_),o.has(_))continue;o.add(_);const g=(p.powerUpType==="LIGHTBALL"?p.lightballTargetType??$p(r,p.coord):p.lightballTargetType)??void 0,x=fx(r,p.coord,p.powerUpType,{lightballTargetType:g}),M=new Set;for(const E of x.clearTimings){const C=nt(E.coord);if(C===_||o.has(C)||a.has(C))continue;const S=(f=(d=gt(r,E.coord))==null?void 0:d.tile)==null?void 0:f.type;S==null||!Ci(S)||(s.push({coord:E.coord,powerUpType:S,activationDelayMs:p.activationDelayMs+E.clearDelayMs}),a.add(C),M.add(C))}const y=x.clearTimings.filter(E=>!M.has(nt(E.coord))),w={...x,clearedCells:Di(y.map(E=>E.coord)),clearTimings:y,lightballTargetType:g};l.push({detonation:w,activationDelayMs:p.activationDelayMs});for(const E of w.clearedCells){const C=gt(r,E);C!=null&&(C.tile=null)}}const c=l.flatMap(p=>p.detonation.clearTimings.map(_=>({coord:_.coord,clearDelayMs:p.activationDelayMs+_.clearDelayMs})));return{detonations:l,clearedCells:yn(l.flatMap(p=>p.detonation.clearedCells)),clearTimings:c}}function fx(n,e,t,i={}){switch(t){case"ROCKET_H":return Wh(n,e,t);case"ROCKET_V":return Wh(n,e,t);case"TNT":return _x(n,e,t);case"LIGHTBALL":{const r=vx(n,e,i.lightballTargetType);return{powerUpType:t,origin:e,clearedCells:r,clearTimings:r.map(s=>({coord:s,clearDelayMs:s.col===e.col&&s.row===e.row?0:Au})),lightballTargetType:i.lightballTargetType}}}}function px(n,e){return n.activationDelayMs-e.activationDelayMs||n.coord.row-e.coord.row||n.coord.col-e.coord.col||n.powerUpType.localeCompare(e.powerUpType)}function mx(n,e){const t=xx(n,e);return[...t.filter(i=>i.col===e.col&&i.row===e.row),...t.filter(i=>i.col!==e.col||i.row!==e.row)].map(i=>({coord:i,clearDelayMs:i.col===e.col&&i.row===e.row?0:X_}))}function gx(n,e,t){const i=[{coord:e,clearDelayMs:0}],r=ye-1;for(let s=1;s<=r;s+=1){const a=t==="ROCKET_H"?[{col:e.col-s,row:e.row},{col:e.col+s,row:e.row}]:[{col:e.col,row:e.row-s},{col:e.col,row:e.row+s}];for(const o of a)Zp(n,o)&&i.push({coord:o,clearDelayMs:s*bu})}return i}function _x(n,e,t){const i=mx(n,e);return{powerUpType:t,origin:e,clearedCells:Di(i.map(r=>r.coord)),clearTimings:i}}function Wh(n,e,t){const i=gx(n,e,t);return{powerUpType:t,origin:e,clearedCells:Di(i.map(r=>r.coord)),clearTimings:i}}function xx(n,e){const t=[];for(let i=e.row-1;i<=e.row+1;i+=1)for(let r=e.col-1;r<=e.col+1;r+=1)t.push({col:r,row:i});return yx(n,t)}function vx(n,e,t){var r;const i=[e];if(t==null)return i;for(let s=0;s<ye;s+=1)for(let a=0;a<ye;a+=1){const o={col:a,row:s},l=gt(n,o);!(l!=null&&l.isVoid)&&((r=l==null?void 0:l.tile)==null?void 0:r.type)===t&&i.push(o)}return yn(i)}function Sx(n){return[{col:n.col+1,row:n.row},{col:n.col,row:n.row+1},{col:n.col-1,row:n.row},{col:n.col,row:n.row-1}].filter(Po)}function Mx(n){var t;const e={FIRE:0,ICE:0,LIGHTNING:0,EARTH:0};for(let i=0;i<ye;i+=1)for(let r=0;r<ye;r+=1){const s=(t=n[i][r].tile)==null?void 0:t.type;s!=null&&ui(s)&&(e[s]+=1)}return e}function yx(n,e){return Di(e.filter(t=>Zp(n,t)))}function Zp(n,e){return Po(e)?!n[e.row][e.col].isVoid:!1}const R={tiles:{fire:"tile.fire",ice:"tile.ice",lightning:"tile.lightning",earth:"tile.earth",land:"tile.land",path:"tile.path",empty:"tile.empty"},powerUps:{rocketH:"power.rocketH",rocketV:"power.rocketV",tnt:"power.tnt",lightball:"power.lightball",lightballStream:"power.lightballStream",orb:"power.orb"},backdrops:{forest:"backdrop.forest",crypt:"backdrop.crypt",crystalCave:"backdrop.crystalCave",castle:"backdrop.castle",bg2:"backdrop.bg2",bg3:"backdrop.bg3",bg4:"backdrop.bg4",bg5:"backdrop.bg5",bg6:"backdrop.bg6",bg7:"backdrop.bg7"},rigs:{mage:"rig.mage",prince:"rig.prince",kobold:"rig.kobold",tallKobold:"rig.tallKobold",boss:"rig.boss"},props:{princeCage:"prop.princeCage",goalFlag:"prop.goalFlag",abductorGlove:"prop.abductorGlove",abductorHook:"prop.abductorHook",abductorHand:"prop.abductorHand",abductorRope:"prop.abductorRope"},ui:{hudBanner:"ui.hudBanner",boardBackground:"ui.boardBackground",levelTitlePanel:"ui.levelTitlePanel",heartFill:"ui.heartFill",heartEmpty:"ui.heartEmpty",trialFillBarBg:"ui.trialFillBarBg",trialFillBarFill:"ui.trialFillBarFill",trialFillBarKoboldIcon:"ui.trialFillBarKoboldIcon",primaryButton:"ui.primaryButton",primaryButtonPressed:"ui.primaryButtonPressed",tutorialFinger:"ui.tutorialFinger"},materials:{mageTexture:"material.mageTexture",koboldTexture:"material.koboldTexture",bossTexture:"material.bossTexture"},spritesheets:{tntExplosion:"spritesheet.tntExplosion",rocketCloud:"spritesheet.rocketCloud",fireBurn:"spritesheet.fireBurn",earthImpact:"spritesheet.earthImpact"},sounds:{tileMatch:"sound.tileMatch",mergeMatch:"sound.mergeMatch",matchCoin:"sound.matchCoin",boardMove:"sound.boardMove",boardMoveBack:"sound.boardMoveBack",levelUp:"sound.levelUp",enemyWalkLoop:"sound.enemyWalkLoop",comboPitchStep:"sound.comboPitchStep",fireWhoosh:"sound.spell.fire.whoosh",iceWhoosh:"sound.spell.ice.whoosh",lightningWhoosh:"sound.spell.lightning.whoosh",earthWhoosh:"sound.spell.earth.whoosh",fireImpact:"sound.spell.fire.impact",iceImpact:"sound.spell.ice.impact",lightningImpact:"sound.spell.lightning.impact",earthImpact:"sound.spell.earth.impact",pathConvert:"sound.pathConvert",mageWalk:"sound.mageWalk",monsterDamage:"sound.monsterDamage",monsterDefeat:"sound.monsterDefeat",playerDamage:"sound.playerDamage",playerDefeat:"sound.playerDefeat",powerupCreate:"sound.powerupCreate",powerupBombActivate:"sound.powerup.bombActivate",powerupRocketActivate:"sound.powerup.rocketActivate",victorySting:"sound.victorySting",cageYankWhoosh:"sound.cageYankWhoosh",runEnd:"sound.runEnd",uiClick:"sound.uiClick",musicBackground:"sound.musicBackground",levelStart:"sound.levelStart"}},Tx=[R.backdrops.castle,R.backdrops.bg2,R.backdrops.bg3,R.backdrops.bg4,R.backdrops.bg5,R.backdrops.bg6,R.backdrops.bg7],Ex=3,bx=24;function Ax(n){const t=(Math.max(1,Math.floor(n))-1)%bx,i=Math.floor(t/Ex),r=i<=5?i:6;return Tx[r]}function wx(n){return n<=3?{moveBudget:20,candidatePathLandRatio:.5,offPathLandRatio:.2}:n<=7?{moveBudget:18,candidatePathLandRatio:.45,offPathLandRatio:.18}:n<=12?{moveBudget:16,candidatePathLandRatio:.4,offPathLandRatio:.16}:n<=18?{moveBudget:15,candidatePathLandRatio:.36,offPathLandRatio:.14}:{moveBudget:14,candidatePathLandRatio:.32,offPathLandRatio:.12}}function Jp(n){return n<=3?{basicKoboldCount:3,tallKoboldCount:0,miniBossCount:cs(n),waveCount:1,spawnIntervalMs:1200,waveGapMs:0,basicKoboldHp:72,tallKoboldHp:120,miniBossHp:192,walkSpeed:.25,baseDamage:12}:n<=7?{basicKoboldCount:5,tallKoboldCount:1,miniBossCount:cs(n),waveCount:1,spawnIntervalMs:1050,waveGapMs:0,basicKoboldHp:104,tallKoboldHp:130,miniBossHp:208,walkSpeed:.275,baseDamage:13}:n<=12?{basicKoboldCount:6,tallKoboldCount:2,miniBossCount:cs(n),waveCount:1,spawnIntervalMs:950,waveGapMs:0,basicKoboldHp:140,tallKoboldHp:168,miniBossHp:224,walkSpeed:.35,baseDamage:14}:n<=18?{basicKoboldCount:7,tallKoboldCount:3,miniBossCount:cs(n),waveCount:1,spawnIntervalMs:850,waveGapMs:0,basicKoboldHp:180,tallKoboldHp:210,miniBossHp:240,walkSpeed:.4,baseDamage:15}:{basicKoboldCount:8,tallKoboldCount:4,miniBossCount:cs(n),waveCount:2,spawnIntervalMs:750,waveGapMs:2200,basicKoboldHp:192,tallKoboldHp:224,miniBossHp:256,walkSpeed:.475,baseDamage:16}}function cs(n){return n>=20&&n%5===0?2:n===5||n===10||n===15?1:0}const Ts={col:0,row:0},hc={col:7,row:7},Ru={from:{col:3,row:1},to:{col:3,row:0}},Xh=[{col:1,row:0},{col:2,row:0},Ru.from];function Qo(n){const e=new ho(n.seed),t=wx(n.difficulty),i=Rx(e,Ts,hc);if(i.length-1>t.moveBudget)throw new Error("Generated Journey path exceeds move budget.");const r=Js("journey-tile"),s=Eu();s[Ts.row][Ts.col].isPath=!0;const a=Cx(s,e,r,i,t.candidatePathLandRatio,t.offPathLandRatio);return Lp(s,e,r),{type:"JOURNEY",difficulty:n.difficulty,seed:n.seed,initialBoard:s,journey:{moveBudget:t.moveBudget,startCell:Ts,goalCell:hc,landTilePositions:a,candidatePathSolution:i,firstHint:Ru}}}function Rx(n,e,t){const i=[e,{col:1,row:0},{col:2,row:0},{col:3,row:0}],r=Ix(n,i[i.length-1],t);return[...i,...r.slice(1)]}function Ix(n,e,t){const i=Dx(),r=new Map;for(const u of i)r.set(nt(u),1+n.nextFloat());const s=new Map,a=new Map,o=new Set(i.map(nt));for(const u of i)s.set(nt(u),Number.POSITIVE_INFINITY);for(s.set(nt(e),0);o.size>0;){const u=[...o].reduce((d,f)=>(s.get(f)??Number.POSITIVE_INFINITY)<(s.get(d)??Number.POSITIVE_INFINITY)?f:d);o.delete(u);const h=Kh(u);if(dc(h,t))break;for(const d of Lx(h)){const f=nt(d);if(!o.has(f))continue;const p=(s.get(u)??Number.POSITIVE_INFINITY)+(r.get(f)??1);p<(s.get(f)??Number.POSITIVE_INFINITY)&&(s.set(f,p),a.set(f,u))}}const l=[];let c=nt(t);for(;c!==nt(e);){l.push(Kh(c));const u=a.get(c);if(u==null)throw new Error("Unable to build Journey candidate path.");c=u}return l.push(e),l.reverse()}function Cx(n,e,t,i,r,s){const a=[],o=new Set([nt(Ts),nt(hc),nt(Ru.to)]);for(const f of Xh)el(n,f,t)&&a.push(f);const l=Yh(i.filter(f=>!o.has(nt(f))&&!a.some(p=>dc(p,f))),e),c=Math.ceil(l.length*r);for(const f of l){if(a.length>=Xh.length+c)break;el(n,f,t)&&a.push(f)}const u=new Set(i.map(nt)),h=Yh(Ji(n).filter(f=>!u.has(nt(f))&&!o.has(nt(f))&&!a.some(p=>dc(p,f))),e),d=Math.ceil(h.length*s);for(const f of h.slice(0,d))el(n,f,t)&&a.push(f);return Di(a)}function el(n,e,t){var r;const i=(r=n[e.row])==null?void 0:r[e.col];return i==null||i.isVoid||i.tile!=null||Px(n,e)?!1:(i.tile=hr("LAND",e.col,e.row,t),!0)}function Px(n,e){return wi(n,e,"LAND",-1,0)+wi(n,e,"LAND",1,0)+1>=3||wi(n,e,"LAND",0,-1)+wi(n,e,"LAND",0,1)+1>=3}function Lx(n){return[{col:n.col+1,row:n.row},{col:n.col,row:n.row+1},{col:n.col-1,row:n.row},{col:n.col,row:n.row-1}].filter(e=>e.col>=0&&e.col<ye&&e.row>=0&&e.row<ye)}function Dx(){return Array.from({length:ye*ye},(n,e)=>({col:e%ye,row:Math.floor(e/ye)}))}function Yh(n,e){const t=[...n];for(let i=t.length-1;i>0;i-=1){const r=e.nextInt(0,i+1);[t[i],t[r]]=[t[r],t[i]]}return t}function Kh(n){const[e,t]=n.split(",").map(Number);return{col:e,row:t}}function dc(n,e){return n.col===e.col&&n.row===e.row}function qh(n,e={}){const t=e.minValidMoves??3,i=e.maxAttempts??100;for(let r=0;r<i;r+=1){const s=Js(`tile-${r}`),a=b_(n,e,s);if(Fx(a,t))return a}throw new Error(`Unable to generate playable board after ${i} attempts.`)}function Fx(n,e=3){return rr(n).length===0&&cx(n)>=e}function Qp(n){return n<=1?0:n<=3?2:n<=6?4:n<=10?6:8}function Nx(n,e){const t=Qp(n);if(t<=0)return[];const i=em.filter(s=>s.length===t);return(i[e.nextInt(0,i.length)]??[]).map(s=>({...s}))}function Ux(n){const e=Qp(n);return em.filter(t=>t.length<=e).sort((t,i)=>i.length-t.length).map(t=>t.map(i=>({...i})))}const em=[[{col:2,row:3},{col:5,row:3}],[{col:1,row:4},{col:6,row:4}],[{col:3,row:2},{col:4,row:2}],[{col:1,row:3},{col:1,row:4},{col:6,row:3},{col:6,row:4}],[{col:2,row:2},{col:2,row:5},{col:5,row:2},{col:5,row:5}],[{col:3,row:3},{col:4,row:3},{col:3,row:4},{col:4,row:4}],[{col:1,row:2},{col:1,row:3},{col:1,row:4},{col:6,row:2},{col:6,row:3},{col:6,row:4}],[{col:2,row:2},{col:2,row:5},{col:3,row:3},{col:4,row:3},{col:5,row:2},{col:5,row:5}],[{col:1,row:2},{col:1,row:5},{col:2,row:3},{col:5,row:3},{col:6,row:2},{col:6,row:5}],[{col:1,row:2},{col:1,row:3},{col:2,row:2},{col:2,row:3},{col:5,row:2},{col:5,row:3},{col:6,row:2},{col:6,row:3}],[{col:1,row:3},{col:1,row:4},{col:2,row:4},{col:3,row:5},{col:4,row:5},{col:5,row:4},{col:6,row:3},{col:6,row:4}],[{col:2,row:1},{col:5,row:1},{col:1,row:3},{col:6,row:3},{col:1,row:4},{col:6,row:4},{col:2,row:6},{col:5,row:6}]],tm=-2.85,Ox=.55,nm=tm+Ox,im=-.85,Bx=1,kx=1.25,Iu=[{laneId:0,y:im,spawnX:4.65}];function Hx(n){const e=new ho(n.seed),t=Jp(n.difficulty),i=zx(e,n.difficulty),r=Wx(Vx(e,n.difficulty),t.baseDamage);return{type:"TRIAL",difficulty:n.difficulty,seed:n.seed,initialBoard:i,trial:{lanes:Iu,mageX:tm,contactX:nm,laneY:im,baseDamage:t.baseDamage,waveManifest:r}}}function zx(n,e){const t=Nx(e,n),i=Ux(e),r=qx([t,...i,[]]);for(const s of r)try{return qh(n,{voidCells:s,minValidMoves:3,maxAttempts:120})}catch{}return qh(n,{minValidMoves:3,maxAttempts:120})}function Vx(n,e){const t=Jp(e),i=[...Array.from({length:t.basicKoboldCount},()=>"kobold"),...Array.from({length:t.tallKoboldCount},()=>"tallKobold"),...Array.from({length:t.miniBossCount},()=>"miniBoss")],r=Kx(i,n),s=Math.max(1,t.waveCount),a=Math.ceil(r.length/s);return r.map((o,l)=>{const c=Math.floor(l/a),u=l%a;return{monsterId:`trial-${e}-${l}`,kind:o,laneId:Iu[0].laneId,spawnTimeMs:c*t.waveGapMs+u*t.spawnIntervalMs,maxHp:Xx(o,t),walkSpeed:t.walkSpeed*kx,scoreValue:Yx(o)}})}function Gx(n,e){if(n.length===0)return!0;const i=n.reduce((s,a)=>{const o=nm+rm(a.kind);return s+(Iu[0].spawnX-o)/a.walkSpeed},0)*Bx*e,r=n.reduce((s,a)=>s+a.maxHp,0);return i>=r}function rm(n){switch(n){case"kobold":return .44;case"tallKobold":return .5;case"miniBoss":return .67}}function Wx(n,e){let t=tl(n.map(i=>({...i})));for(let i=0;i<10;i+=1){if(t=tl(t),Gx(t,e))return t;t=t.map(r=>({...r,maxHp:Math.max(1,Math.floor(r.maxHp*.9))}))}return tl(t)}function tl(n){var t;const e=(t=n.find(i=>i.kind==="kobold"))==null?void 0:t.maxHp;return e==null?n.map(i=>({...i})):n.map(i=>i.kind==="miniBoss"?{...i,maxHp:e*4}:{...i})}function Xx(n,e){switch(n){case"kobold":return e.basicKoboldHp;case"tallKobold":return e.tallKoboldHp;case"miniBoss":return e.miniBossHp}}function Yx(n){switch(n){case"kobold":return 100;case"tallKobold":return 220;case"miniBoss":return 500}}function Kx(n,e){const t=[...n];for(let i=t.length-1;i>0;i-=1){const r=e.nextInt(0,i+1);[t[i],t[r]]=[t[r],t[i]]}return t}function qx(n){const e=new Set,t=[];for(const i of n){const r=$x(i);e.has(r)||(e.add(r),t.push(i.map(s=>({...s}))))}return t}function $x(n){return[...n].sort((e,t)=>e.row-t.row||e.col-t.col).map(e=>`${e.col},${e.row}`).join("|")}function jx(n){return n.forcedLevelType==="TRIAL"?Hx(n):(n.forcedLevelType==="JOURNEY"||n.levelNumber!==1,Qo(n))}function sm(n,e,t={}){const i=dt(n),r=[],s=[],a=t.maxIterations??50,o=t.nextTileId??ur(i,"cascade-tile");for(let l=0;l<a;l+=1){const c=rr(i,{preferredSpawnCell:l===0?t.preferredSpawnCell:void 0});if(c.length===0)return{board:i,steps:r,animationTrace:t.animation==null?void 0:Do(t.animation,s,i)};const u=dt(i),h=yn(c.flatMap(m=>m.tiles)),d=Zx(i,c,o),f=dt(i),p=Uo(i,e,o),_=dt(i);r.push({matches:c,clearedCells:h,spawnedPowerUps:d}),t.animation!=null&&s.push(Fo(l,u,f,p.afterGravityBoard,_,h,new Map,p.refillTiles))}throw new Error(`Cascade did not settle after ${a} iterations.`)}function Zx(n,e,t){const i=yn(e.flatMap(s=>s.tiles));for(const s of i)n[s.row][s.col].tile=null;const r=[];for(const s of e){if(s.spawnPowerUp==null)continue;const a=n[s.spawnCell.row][s.spawnCell.col];a.isVoid||(a.tile=hr(s.spawnPowerUp,s.spawnCell.col,s.spawnCell.row,t),r.push({type:s.spawnPowerUp,coord:s.spawnCell}))}return r}function Jx(n){for(let e=0;e<ye*ye;e+=1){const t=tv(n),i=nv(n);if(!t&&!i)return}}function Uo(n,e,t){Jx(n);const i=dt(n),r=[],s=new Map,a=av(n).sort((o,l)=>o.col-l.col||l.row-o.row);for(const o of a){const l=fc(n,o)?o.col:Qx(n,o),c=!fc(n,o),u=s.get(l)??0;c||s.set(l,u+1);const h=Yr.filter(p=>!Dp(n,o,p)),d=h.length>0?h:Yr,f=hr(d[e.nextInt(0,d.length)],o.col,o.row,t);n[o.row][o.col].tile=f,r.push({tileId:f.id,tileType:f.type,from:c?{col:l,row:sv(n,l,o.row)}:{col:l,row:-1-u},to:o,isPath:n[o.row][o.col].isPath,movementKind:l===o.col?"fall":"slide"})}return{afterGravityBoard:i,refillTiles:r}}function fc(n,e){for(let t=0;t<e.row;t+=1)if(n[t][e.col].isVoid)return!1;return!0}function Qx(n,e){const t=e.col-1,i=e.col+1,r=(e.row+e.col)%2===0?[t,i]:[i,t];for(const s of r)if(s>=0&&s<ye&&ev(n,s))return s;for(const s of r)if(s>=0&&s<ye)return s;return e.col}function ev(n,e){return n.some((t,i)=>!t[e].isVoid&&fc(n,{col:e,row:i}))}function tv(n){var t,i;let e=!1;for(let r=0;r<ye;r+=1){let s=ye-1;for(;s>=0;){if(n[s][r].isVoid){n[s][r].tile!=null&&(e=!0),n[s][r].tile=null,s-=1;continue}const a=s;for(;s>=0&&!n[s][r].isVoid;)s-=1;const o=s+1,l=[];for(let c=a;c>=o;c-=1){const u=n[c][r].tile;u!=null&&l.push(u)}for(let c=a;c>=o;c-=1){const u=n[c][r],h=((t=u.tile)==null?void 0:t.id)??null,d=l.shift()??null;u.tile=d==null?null:{...d,col:r,row:c},(((i=u.tile)==null?void 0:i.id)??null)!==h&&(e=!0)}}}return e}function nv(n){let e=!1;for(let t=ye-1;t>=1;t-=1)for(let i=0;i<ye;i+=1){const r=n[t][i];if(r.isVoid||r.tile!=null)continue;const s=iv(n,{col:i,row:t});if(s==null)continue;const a=n[s.row][s.col],o=a.tile;o!=null&&(r.tile={...o,col:i,row:t},a.tile=null,e=!0)}return e}function iv(n,e){if(!rv(n,e))return null;const t={col:e.col-1,row:e.row-1},i={col:e.col+1,row:e.row-1},r=(e.row+e.col)%2===0?[t,i]:[i,t];for(const s of r){if(s.col<0||s.col>=ye)continue;const a=n[s.row][s.col];if(!(a.isVoid||a.tile==null))return s}return null}function rv(n,e){for(let t=0;t<e.row;t+=1)if(n[t][e.col].isVoid)return!0;return!1}function sv(n,e,t){for(let i=t-1;i>=0;i-=1)if(!n[i][e].isVoid)return i;for(let i=t;i<ye;i+=1)if(!n[i][e].isVoid)return i;return-1}function av(n){const e=[];for(let t=0;t<ye;t+=1)for(let i=0;i<ye;i+=1){const r=n[t][i];!r.isVoid&&r.tile==null&&e.push({col:i,row:t})}return Di(e)}const am={matchCount:0,comboCount:0,powerUpsCreated:0,validSwapCount:0};function om(n){return 1+.1*n}function ov(n,e){return Math.round(1e3*om(n))+Math.max(0,e)*50}function lv(n,e,t){const i=t>0?e/t:0,r=Math.max(0,i-1)*100;return Math.round(1e3*om(n)+r)}function ca(n){return n.comboCount*100+n.powerUpsCreated*200}function Cu(n,e,t=1){return{matchCount:n,comboCount:Math.max(0,n-1),powerUpsCreated:e,validSwapCount:t}}function cv(n){return{movesRemaining:n.journey.moveBudget,mageCell:n.journey.startCell,hasPlayerMoved:!1,result:"playing"}}function uv(n,e,t,i,r,s){if(e.result!=="playing")return ja(n,e);const a=Us(n,i,r);if(!a.valid)return a.reason==="noMatch"?ja(n,e,Fp(n,i,r,0)):ja(n,e);const o=mv(n,i,r),l=dt(n);Lo(l,i,r);const c={revisionId:0,preSwapBoard:n,postSwapBoard:l,swappedCells:{from:i,to:r}},u=o==null?cm(l,s,{preferredSpawnCell:r,animation:c}):um(l,s,o.originAfterSwap,c,o.targetType);return lm(e,t,u,o==null?0:1)}function hv(n,e,t,i,r){const s=gv(n,i);if(e.result!=="playing"||s==null)return ja(n,e);const a=um(n,r,i,{revisionId:0,preSwapBoard:n,postSwapBoard:n,swappedCells:null},s.targetType);return lm(e,t,a,1)}function lm(n,e,t,i){const r=Math.max(0,n.movesRemaining-1),s=t.convertedPathCells.length>0?dv(t.board,n.mageCell,e.journey.goalCell):n.mageCell,a=xv(s,e.journey.goalCell,r);return{valid:!0,board:t.board,runtime:{movesRemaining:r,mageCell:s,hasPlayerMoved:!0,result:a},scoreDelta:t.clearedStandardCells.length*10,convertedPathCells:t.convertedPathCells,clearedStandardCells:t.clearedStandardCells,scoringStats:Cu(Math.max(i,t.matchCount),t.powerUpsCreated),animationTrace:t.animationTrace}}function cm(n,e,t={}){const i=dt(n),r=[],s=[];let a=0,o=0;const l=[],c=t.maxIterations??50,u=t.nextTileId??ur(i,"journey-cascade-tile");for(let h=0;h<c;h+=1){const d=rr(i,{preferredSpawnCell:h===0?t.preferredSpawnCell:void 0});if(d.length===0)return{board:i,convertedPathCells:yn(r),clearedStandardCells:yn(s),matchCount:a,powerUpsCreated:o,animationTrace:t.animation==null?void 0:Do(t.animation,l,i)};const f=dt(i),p=yn(d.flatMap(M=>M.tiles)),_=fv(i,d,u),m=dt(i);a+=d.length,o+=_.powerUpsCreated,r.push(..._.convertedPathCells),s.push(..._.clearedStandardCells);const g=Uo(i,e,u),x=dt(i);t.animation!=null&&l.push(Fo(h,f,m,g.afterGravityBoard,x,p,new Map,g.refillTiles))}throw new Error(`Journey board did not settle after ${c} iterations.`)}function um(n,e,t,i,r){var m;const s=dt(n),a=ur(s,"journey-powerup-cascade-tile"),o=jp(s,t,{lightballTargetType:r}),l=dt(s),c=[],u=[];for(const g of o.detonations){const x=pv(s,g.detonation);c.push(...x.convertedPathCells),u.push(...x.clearedStandardCells)}const h=dt(s),d=Uo(s,e,a),f=dt(s),p=Fo(0,l,h,d.afterGravityBoard,f,o.clearedCells,_v(o),d.refillTiles),_=cm(s,e,{nextTileId:a,animation:i});return{board:_.board,convertedPathCells:yn([...c,..._.convertedPathCells]),clearedStandardCells:yn([...u,..._.clearedStandardCells]),matchCount:1+_.matchCount,powerUpsCreated:_.powerUpsCreated,animationTrace:Do(i,[p,...((m=_.animationTrace)==null?void 0:m.cascadeSteps.map((g,x)=>({...g,stepIndex:x+1})))??[]],_.board)}}function dv(n,e,t){const i=vv(n,e),r=new Set(i.map(nt)),s=hm(e).filter(a=>r.has(nt(a)));return s.length===0?e:s.reduce((a,o)=>{const l=Zh(a,t),c=Zh(o,t);return c!==l?c<l?o:a:o.row<a.row||o.row===a.row&&o.col<a.col?o:a})}function $h(n,e,t){return e.hasPlayerMoved||e.result!=="playing"||t*1e3<K_?[]:[n.journey.firstHint.from,n.journey.firstHint.to]}function fv(n,e,t){const i=[],r=[];let s=0;for(const a of e){if(a.tileType==="LAND"){for(const o of a.tiles){const l=n[o.row][o.col];l.isPath=!0,l.tile=null,i.push(o)}continue}for(const o of a.tiles){const l=n[o.row][o.col];l.tile!=null&&ui(l.tile.type)&&r.push(o),l.tile=null}if(a.spawnPowerUp!=null){const o=n[a.spawnCell.row][a.spawnCell.col];o.isVoid||(o.tile=hr(a.spawnPowerUp,a.spawnCell.col,a.spawnCell.row,t),s+=1)}}return{convertedPathCells:i,clearedStandardCells:r,powerUpsCreated:s}}function pv(n,e){const t=[],i=[];for(const r of e.clearedCells){const s=gt(n,r);(s==null?void 0:s.tile)!=null&&(s.tile.type==="LAND"?(s.isPath=!0,t.push(r)):ui(s.tile.type)&&i.push(r),s.tile=null)}return{convertedPathCells:t,clearedStandardCells:i}}function mv(n,e,t){var s,a,o,l;const i=(a=(s=gt(n,e))==null?void 0:s.tile)==null?void 0:a.type,r=(l=(o=gt(n,t))==null?void 0:o.tile)==null?void 0:l.type;return Kr(i)?{originAfterSwap:t,targetType:jh(r)}:Kr(r)?{originAfterSwap:e,targetType:jh(i)}:null}function gv(n,e){var i,r;const t=(r=(i=gt(n,e))==null?void 0:i.tile)==null?void 0:r.type;if(!Kr(t))return null;if(t==="LIGHTBALL"){const s=qp(n,e);return s==null?null:{targetType:s}}return{}}function jh(n){return n!=null&&Co(n)?n:void 0}function _v(n){const e=new Map;for(const t of n.clearTimings){const i=nt(t.coord),r=e.get(i);(r==null||t.clearDelayMs<r)&&e.set(i,t.clearDelayMs)}return e}function ja(n,e,t){return{valid:!1,board:n,runtime:e,scoreDelta:0,convertedPathCells:[],clearedStandardCells:[],scoringStats:am,animationTrace:t}}function xv(n,e,t){return w_(n,e)?"won":t<=0?"lost":"playing"}function vv(n,e){var r,s;if(!((s=(r=n[e.row])==null?void 0:r[e.col])!=null&&s.isPath))return[];const t=new Set,i=[e];for(;i.length>0;){const a=i.shift(),o=nt(a);if(!t.has(o)){t.add(o);for(const l of hm(a))n[l.row][l.col].isPath&&!t.has(nt(l))&&i.push(l)}}return Ji(n).filter(a=>t.has(nt(a)))}function hm(n){return[{col:n.col+1,row:n.row},{col:n.col,row:n.row+1},{col:n.col-1,row:n.row},{col:n.col,row:n.row-1}].filter(e=>e.col>=0&&e.col<ye&&e.row>=0&&e.row<ye)}function Zh(n,e){return Math.abs(n.col-e.col)+Math.abs(n.row-e.row)}const Ut=1e-6,Os=.18,Sv=.4,Mv=.16,yv=-1.41,Tv=-1.49,Ev=-1.63,bv=-2.28,Av=1.74,wv=1.74,Rv=3.045,us=.5,po=1,Jh=.15,pc=1.5,Iv=.12,dm=.5,fm=4,Qh=dm*fm,Cv=12,Pv=4,ed=Pv/Cv,mc=["k.head-1","k.head-2","k.head-3"],gc=["k.club-1","k.club-2","k.club-3"];function td(n){return bm({elapsedMs:0,nextSpawnIndex:0,monsters:[],projectiles:[],pendingAttacks:[],defeatedMonsterIds:[],totalMonsters:n.trial.waveManifest.length,result:"playing",nextProjectileIndex:0,nextAttackIndex:0,nextBurnIndex:0,nextImpactVfxIndex:0},n)}function Lv(n,e,t){if(n.result!=="playing")return{runtime:Sc(n,t),scoreDelta:0,damageEvents:[]};const i=n.elapsedMs+Math.max(0,t)*1e3,r=Math.max(0,t),s=Sc(n,r),a=Gv(s,r),o=Lu(a.runtime,e),l=lS(o,r),c=cS(l,r),u=uS(c,r),h=nS(u,r),d=Wv(h,e,r),f={...d.runtime,elapsedMs:i,monsters:d.runtime.monsters.map(m=>m.hp>0&&(m.iceFreezeRemainingSec??0)<=0?{...m,x:m.x-m.walkSpeed*Dv(c.monsters.find(g=>g.monsterId===m.monsterId)??m,r)}:m)},p=bm(f,e),_=wm(p,e);return{runtime:{...p,result:_},scoreDelta:a.scoreDelta+d.scoreDelta,damageEvents:[...a.damageEvents,...d.damageEvents]}}function Dv(n,e){var i;if((n.iceFreezeRemainingSec??0)>Ut)return 0;const t=(i=n.iceFreezeDelayQueueSec)==null?void 0:i[0];return t!=null&&t<=e?Math.max(0,t):e}function Fv(n,e){return Sc(n,e)}function nd(n,e,t,i,r,s){if(e.result!=="playing")return Za(n,e);const a=Us(n,i,r);if(!a.valid)return a.reason==="noMatch"?Za(n,e,Fp(n,i,r,0)):Za(n,e);const o=Jv(n,i,r),l=dt(n),c=dt(n);Lo(c,i,r);const u=dt(c),h=ur(c,"trial-cascade-tile"),d=[];let f,p;if(o!=null){const x=Em(c,s,h,o.originAfterSwap,{revisionId:0,preSwapBoard:l,postSwapBoard:u,swappedCells:{from:i,to:r}},o.targetType),M=ym(x.animationTrace,0);d.push(...x.detonations.map((y,w)=>Tm(t,y,M,w===0?o.targetType:void 0))),f=x.cascadeResult,p=x.animationTrace}else f=sm(c,s,{preferredSpawnCell:r,nextTileId:h,animation:{revisionId:0,preSwapBoard:l,postSwapBoard:u,swappedCells:{from:i,to:r}}}),p=f.animationTrace;d.push(...Mm(t,f,p,o==null?0:1));const _=_m(e,t,d),m=f.steps.reduce((x,M)=>x+M.matches.length,0),g=f.steps.reduce((x,M)=>x+M.spawnedPowerUps.length,0);return{valid:!0,board:f.board,runtime:_.runtime,scoreDelta:_.scoreDelta,damageEvents:_.damageEvents,queuedAttackEvents:_.queuedAttackEvents,scoringStats:Cu(m,g),animationTrace:p}}function Nv(n,e,t,i,r){const s=Qv(n,i);if(e.result!=="playing"||s==null)return Za(n,e);const a=ur(n,"trial-powerup-cascade-tile"),o=Em(n,r,a,i,{revisionId:0,preSwapBoard:n,postSwapBoard:n,swappedCells:null},s.targetType),l=ym(o.animationTrace,0),c=[...o.detonations.map((f,p)=>Tm(t,f,l,p===0?s.targetType:void 0)),...Mm(t,o.cascadeResult,o.animationTrace,1)],u=_m(e,t,c),h=1+o.cascadeResult.steps.reduce((f,p)=>f+p.matches.length,0),d=o.cascadeResult.steps.reduce((f,p)=>f+p.spawnedPowerUps.length,0);return{valid:!0,board:o.cascadeResult.board,runtime:u.runtime,scoreDelta:u.scoreDelta,damageEvents:u.damageEvents,queuedAttackEvents:u.queuedAttackEvents,scoringStats:Cu(h,d),animationTrace:o.animationTrace}}function Uv(n,e){const t=Pu(n,e);return t.length===0?null:t[0]}function Pu(n,e){return n.monsters.filter(t=>t.hp>0).sort((t,i)=>{const r=Math.abs(t.x-e.trial.mageX),s=Math.abs(i.x-e.trial.mageX);return r-s||t.monsterId.localeCompare(i.monsterId)})}function Ov(n){switch(n.shape){case"basic":return n.tiles.length>=4?2:1;case"rocketH":case"rocketV":return 2;case"lightball":return 3;case"tnt":return 2.5}}function pm(n,e){return{x:e.x,y:_S(n,e.laneId),z:vS(e.kind)}}function mm(n){switch(n){case"kobold":return Tv;case"tallKobold":return Ev;case"miniBoss":return bv}}function Bv(n){switch(n){case"kobold":return Av;case"tallKobold":return wv;case"miniBoss":return Rv}}function is(n,e){const t=pm(n,e);return{...t,y:t.y+mm(e.kind)+Bv(e.kind)+(e.visualYOffset??0)}}function gm(n){return{x:n.trial.mageX,y:n.trial.laneY,z:.55}}function id(n){const e=gm(n);return{x:e.x+.55,y:e.y+.95,z:e.z+.05}}function _m(n,e,t){var s;let i={...n,monsters:n.monsters.map(a=>kv(a)),projectiles:n.projectiles.map(a=>({...a})),pendingAttacks:n.pendingAttacks.map(a=>xm(a)),impactVfx:(s=n.impactVfx)==null?void 0:s.map(a=>({...a,hitWorldPosition:{...a.hitWorldPosition}})),defeatedMonsterIds:[...n.defeatedMonsterIds]};const r=[];for(const a of t){if(a.schoolId==="lightning"){const o=Pu(i,e),l=[],c=[],u=`chain-${i.nextAttackIndex}`;let h=null,d;const f=[];for(const[p,_]of o.entries()){const m=i.monsters.find(P=>P.monsterId===_.monsterId);if(m==null)continue;const g=p*Iv,x=a.castActivationDelaySec+us+g,M=x+a.durationSec,y=i.nextAttackIndex+c.length,w=i.nextProjectileIndex+l.length,E=`trial-attack-${y}`,C=`trial-${w}`,S=od(w,e,a,m,{attackId:E,originKind:h==null?"mage":"world",from:h==null?id(e):is(e,h),castActivationDelaySec:a.castActivationDelaySec+g,activationDelaySec:x,chargeDurationSec:h==null?us:0}),A=rd(y,a,m,{attackId:E,projectileId:C,impactDelaySec:M,castActivationDelaySec:a.castActivationDelaySec+g,chainId:u,chainIndex:p,originAttackId:d,excludedMonsterIds:f});c.push(A),l.push(S),r.push({attackId:E,monsterId:m.monsterId,schoolId:a.schoolId,damage:a.damage,castActivationDelaySec:a.castActivationDelaySec+g}),h=_,d=E,f.push(m.monsterId)}c.length>0&&(i={...i,projectiles:[...i.projectiles,...l],pendingAttacks:[...i.pendingAttacks,...c],nextProjectileIndex:i.nextProjectileIndex+l.length,nextAttackIndex:i.nextAttackIndex+c.length});continue}for(let o=0;o<a.shotCount;o+=1){const l=Uv(i,e);if(l==null)continue;const c=a.castActivationDelaySec+us+a.durationSec,u=i.nextAttackIndex,h=`trial-attack-${u}`,d=i.nextProjectileIndex,f=o<a.visualShotCount?`trial-${d}`:void 0,p=o<a.visualShotCount?od(d,e,a,l,{attackId:h,originKind:"mage",from:id(e),castActivationDelaySec:a.castActivationDelaySec,activationDelaySec:a.castActivationDelaySec+us,chargeDurationSec:us}):null,_=rd(u,a,l,{attackId:h,projectileId:f,impactDelaySec:c,castActivationDelaySec:a.castActivationDelaySec});i={...i,projectiles:p==null?i.projectiles:[...i.projectiles,p],pendingAttacks:[...i.pendingAttacks,_],nextProjectileIndex:p==null?i.nextProjectileIndex:i.nextProjectileIndex+1,nextAttackIndex:i.nextAttackIndex+1},r.push({attackId:h,monsterId:l.monsterId,schoolId:a.schoolId,damage:a.damage,castActivationDelaySec:a.castActivationDelaySec})}}return{runtime:{...i,result:wm(i,e)},scoreDelta:0,damageEvents:[],queuedAttackEvents:r}}function kv(n){return{...n,hitShakeQueueSec:n.hitShakeQueueSec==null?void 0:[...n.hitShakeQueueSec],healthBarUpdateQueue:n.healthBarUpdateQueue==null?void 0:n.healthBarUpdateQueue.map(e=>({...e})),iceFreezeDelayQueueSec:n.iceFreezeDelayQueueSec==null?void 0:[...n.iceFreezeDelayQueueSec],fireBurnStacks:n.fireBurnStacks==null?void 0:n.fireBurnStacks.map(e=>Hv(e))}}function xm(n){return{...n,excludedMonsterIds:n.excludedMonsterIds==null?void 0:[...n.excludedMonsterIds]}}function Hv(n){return{...n,tickDelayQueueSec:[...n.tickDelayQueueSec]}}function rd(n,e,t,i){return{attackId:i.attackId??`trial-attack-${n}`,schoolId:e.schoolId,effectKind:e.effectKind,damage:e.damage,targetMonsterId:t.monsterId,impactDelaySec:Math.max(0,i.impactDelaySec),castActivationDelaySec:Math.max(0,i.castActivationDelaySec),projectileId:i.projectileId,chainId:i.chainId,chainIndex:i.chainIndex,originAttackId:i.originAttackId,excludedMonsterIds:i.excludedMonsterIds==null?void 0:[...i.excludedMonsterIds]}}function zv(n,e,t){return{burnId:`burn-${n}`,damage:e,activationDelaySec:Math.max(0,t),tickDelayQueueSec:Array.from({length:fm},(i,r)=>(r+1)*dm),visualRemainingSec:Qh,visualDurationSec:Qh}}function Vv(n,e,t,i){return{vfxId:`earth-impact-${n}`,schoolId:"earth",targetMonsterId:t.monsterId,hitWorldPosition:is(e,t),activationDelaySec:Math.max(0,i),remainingSec:ed,durationSec:ed}}function Gv(n,e){const t=Math.max(0,e);if(t<=0)return{runtime:n,scoreDelta:0,damageEvents:[]};let i=0;const r=[],s=n.monsters.map(a=>{const o=a.fireBurnStacks??[];if(o.length<=0||a.hp<=0)return a.hp<=0&&o.length>0?{...a,fireBurnStacks:void 0}:a;let l={...a};const c=[];for(const u of o){const h=u.activationDelaySec??0,d=Math.max(0,t-h),f=Math.max(0,h-t);if(f>Ut){c.push({...u,activationDelaySec:f});continue}const p=u.tickDelayQueueSec.map(x=>x-d).sort((x,M)=>x-M),_=p.filter(x=>x<=Ut).length,m=p.filter(x=>x>Ut),g=Math.max(0,u.visualRemainingSec-d);for(let x=0;x<_&&l.hp>0;x+=1){const M=Math.min(l.hp,u.damage),y=Math.max(0,l.hp-u.damage),w=y<=0;l={...l,hp:y,defeatDelaySec:w?0:l.defeatDelaySec,...rS(l,0),...aS(l,0,y)},i+=Math.round(M*2)+(w?l.scoreValue:0),r.push({monsterId:l.monsterId,schoolId:"fire",damage:M,defeated:w,impactDelaySec:0,castActivationDelaySec:0})}if(l.hp<=0)break;(m.length>0||g>Ut)&&c.push({...u,activationDelaySec:void 0,tickDelayQueueSec:m,visualRemainingSec:g})}return{...l,fireBurnStacks:l.hp>0&&c.length>0?c:void 0}});return{runtime:{...n,monsters:s},scoreDelta:i,damageEvents:r}}function Wv(n,e,t){const i=Math.max(0,t);if(n.pendingAttacks.length<=0)return{runtime:n,scoreDelta:0,damageEvents:[]};let r={...n,projectiles:n.projectiles.map(u=>({...u})),pendingAttacks:[]},s=[];const a=new Map;let o=0;const l=[],c=n.pendingAttacks.map(u=>({...xm(u),impactDelaySec:u.impactDelaySec-i})).sort(Xv);for(const u of c){r={...r,pendingAttacks:s};const h=qv(r,u,a);r=h.runtime;const d=h.attack;if(d.impactDelaySec>Ut){const m=_c(r,e,d);if(m==null){r=vc(r,d),s=[...r.pendingAttacks];continue}const g=m.monsterId===d.targetMonsterId?d:{...d,targetMonsterId:m.monsterId};m.monsterId!==d.targetMonsterId&&(r=xc(r,e,g,m)),s.push(g),r={...r,pendingAttacks:s};continue}const f=_c(r,e,d);if(f==null){r=vc(r,d),s=[...r.pendingAttacks];continue}const p=f.monsterId===d.targetMonsterId?d:{...d,targetMonsterId:f.monsterId};f.monsterId!==d.targetMonsterId&&(r=xc(r,e,p,f));const _=Yv(r,e,p,f);r=_.runtime,o+=_.scoreDelta,l.push(_.damageEvent),p.chainId!=null&&a.set(p.attackId,{monsterId:f.monsterId,position:is(e,f)}),r=Kv(r,e,p,f),_.damageEvent.defeated&&(r=Lu(r,e)),s=[...r.pendingAttacks]}return{runtime:{...r,pendingAttacks:s},scoreDelta:o,damageEvents:l}}function Xv(n,e){return n.impactDelaySec-e.impactDelaySec||sd(n)-sd(e)||n.attackId.localeCompare(e.attackId)}function sd(n){const e=/(\d+)$/.exec(n.attackId);return e==null?0:Number.parseInt(e[1],10)}function Yv(n,e,t,i){const r=Math.min(i.hp,t.damage),s=Math.max(0,i.hp-t.damage),a=s<=0,o=t.schoolId==="fire"&&!a?zv(n.nextBurnIndex,t.damage,0):null,l=t.schoolId==="earth"?Vv(n.nextImpactVfxIndex??0,e,i,0):null,c=n.monsters.map(u=>u.monsterId===i.monsterId?{...u,hp:s,defeatDelaySec:a?0:u.defeatDelaySec,defeatAnimationRemainingSec:a?po:u.defeatAnimationRemainingSec,defeatAnimationDurationSec:a?po:u.defeatAnimationDurationSec,defeatFadeRemainingSec:a?void 0:u.defeatFadeRemainingSec,defeatFadeDurationSec:a?void 0:u.defeatFadeDurationSec,...sS(),...zr(),...t.schoolId==="ice"&&!a?oS():{},...o==null?{fireBurnStacks:a?void 0:u.fireBurnStacks}:{fireBurnStacks:[...u.fireBurnStacks??[],o]}}:u);return{runtime:{...n,monsters:c,impactVfx:l==null?n.impactVfx:[...n.impactVfx??[],l],nextBurnIndex:o==null?n.nextBurnIndex:n.nextBurnIndex+1,nextImpactVfxIndex:l==null?n.nextImpactVfxIndex:(n.nextImpactVfxIndex??0)+1},scoreDelta:Math.round(r*2)+(a?i.scoreValue:0),damageEvent:{monsterId:i.monsterId,schoolId:t.schoolId,damage:r,defeated:a,impactDelaySec:0,castActivationDelaySec:0}}}function _c(n,e,t){const i=new Set(t.excludedMonsterIds??[]),r=n.monsters.find(s=>s.monsterId===t.targetMonsterId&&s.hp>0&&!i.has(s.monsterId));return r??Pu(n,e).find(s=>!i.has(s.monsterId))??null}function Lu(n,e){if(n.pendingAttacks.length<=0)return n;let t=n;const i=[];for(const r of n.pendingAttacks){const s=_c({monsters:t.monsters},e,r);if(s==null){t=vc(t,r);continue}const a=s.monsterId===r.targetMonsterId?r:{...r,targetMonsterId:s.monsterId};s.monsterId!==r.targetMonsterId&&(t=xc(t,e,a,s)),i.push(a)}return{...t,pendingAttacks:i}}function Kv(n,e,t,i){if(t.chainId==null)return n;const r=is(e,i);let s=n;const a=n.pendingAttacks.map(o=>{if(o.chainId!==t.chainId)return o;const l=vm(o.excludedMonsterIds??[],i.monsterId);return o.originAttackId===t.attackId&&(s=Sm(s,o,r)),{...o,excludedMonsterIds:l}});return Lu({...s,pendingAttacks:a},e)}function vm(n,e){return n.includes(e)?n:[...n,e]}function qv(n,e,t){if(e.originAttackId==null)return{runtime:n,attack:e};const i=t.get(e.originAttackId);if(i==null)return{runtime:n,attack:e};const r={...e,excludedMonsterIds:vm(e.excludedMonsterIds??[],i.monsterId)};return{runtime:Sm(n,r,i.position),attack:r}}function xc(n,e,t,i){if(t.projectileId==null)return n;const r=is(e,i);return{...n,projectiles:n.projectiles.map(s=>s.projectileId===t.projectileId?{...s,targetMonsterId:i.monsterId,to:r}:s)}}function Sm(n,e,t){return e.projectileId==null?n:{...n,projectiles:n.projectiles.map(i=>i.projectileId===e.projectileId?{...i,from:t,originKind:"world"}:i)}}function vc(n,e){return e.projectileId==null?n:{...n,projectiles:n.projectiles.filter(t=>t.projectileId!==e.projectileId)}}function Mm(n,e,t,i){const r=t==null?[]:No(t);return e.steps.flatMap((s,a)=>s.matches.filter(o=>ui(o.tileType)).map(o=>{var l;return{schoolId:Rm(o.tileType),effectKind:"match",damage:n.trial.baseDamage*(Ov(o)+a*.25),shotCount:1,visualShotCount:1,castActivationDelaySec:(((l=r[a+i])==null?void 0:l.popStartMs)??0)/1e3,durationSec:Vp/1e3}}))}function ym(n,e){var t;return n==null?0:(((t=No(n)[e])==null?void 0:t.popStartMs)??0)/1e3}function Tm(n,e,t,i){const r=e.detonation,s=i??r.lightballTargetType,a=r.powerUpType==="TNT";return{schoolId:s!=null&&ui(s)?Rm(s):"fire",effectKind:a?"bomb":"match",damage:n.trial.baseDamage*$v(r.powerUpType),shotCount:ad(r),visualShotCount:a?1:ad(r),castActivationDelaySec:t+e.activationDelayMs/1e3,durationSec:(a?Y_:Vp)/1e3}}function $v(n){switch(n){case"ROCKET_H":case"ROCKET_V":return 1.25;case"TNT":return 1.5;case"LIGHTBALL":return 1}}function ad(n){switch(n.powerUpType){case"ROCKET_H":case"ROCKET_V":return 3;case"TNT":return 5;case"LIGHTBALL":return Math.min(8,Math.max(1,Math.ceil(n.clearedCells.length/3)))}}function od(n,e,t,i,r){return{projectileId:`trial-${n}`,attackId:r.attackId,targetMonsterId:i.monsterId,schoolId:t.schoolId,effectKind:t.effectKind,originKind:r.originKind,from:r.from,to:is(e,i),castActivationDelaySec:r.castActivationDelaySec,activationDelaySec:r.activationDelaySec,chargeDurationSec:r.chargeDurationSec,remainingSec:t.durationSec,durationSec:t.durationSec}}function Em(n,e,t,i,r,s){var p;const a=dt(n),o=jp(a,i,{lightballTargetType:s}),l=dt(a);for(const _ of o.detonations)jv(a,_.detonation);const c=dt(a),u=Uo(a,e,t),h=dt(a),d=Fo(0,l,c,u.afterGravityBoard,h,o.clearedCells,Zv(o),u.refillTiles),f=sm(a,e,{preferredSpawnCell:i,nextTileId:t,animation:r});return{cascadeResult:f,detonations:o.detonations,animationTrace:Do(r,[d,...((p=f.animationTrace)==null?void 0:p.cascadeSteps.map((_,m)=>({..._,stepIndex:m+1})))??[]],f.board)}}function jv(n,e){for(const t of e.clearedCells){const i=gt(n,t);i!=null&&(i.tile=null)}}function Zv(n){const e=new Map;for(const t of n.clearTimings){const i=nt(t.coord),r=e.get(i);(r==null||t.clearDelayMs<r)&&e.set(i,t.clearDelayMs)}return e}function Jv(n,e,t){var s,a;const i=(s=gt(n,e))==null?void 0:s.tile,r=(a=gt(n,t))==null?void 0:a.tile;return i!=null&&Ci(i.type)?{originAfterSwap:t,powerUpType:i.type,targetType:ld(r==null?void 0:r.type)}:r!=null&&Ci(r.type)?{originAfterSwap:e,powerUpType:r.type,targetType:ld(i==null?void 0:i.type)}:null}function ld(n){return n!=null&&Co(n)?n:void 0}function Qv(n,e){var i,r;const t=(r=(i=gt(n,e))==null?void 0:i.tile)==null?void 0:r.type;if(!Kr(t))return null;if(t==="LIGHTBALL"){const s=qp(n,e);return s==null?null:{targetType:s}}return{}}function bm(n,e){const t=[...n.monsters];let i=n.nextSpawnIndex;return i<e.trial.waveManifest.length&&e.trial.waveManifest[i].spawnTimeMs<=n.elapsedMs&&tS(e,t,e.trial.waveManifest[i].laneId)&&(t.push(eS(e,e.trial.waveManifest[i],i)),i+=1),{...n,nextSpawnIndex:i,monsters:t}}function eS(n,e,t){return{monsterId:e.monsterId,kind:e.kind,laneId:e.laneId,hp:e.maxHp,maxHp:e.maxHp,x:Fu(n,e.laneId).spawnX,spawnTimeMs:e.spawnTimeMs,walkSpeed:e.walkSpeed,scoreValue:e.scoreValue,visualYOffset:Am(t),modelVariant:Du(n.seed,e.monsterId)}}function tS(n,e,t){const i=Fu(n,t),s=Math.max(.001,i.spawnX-n.trial.contactX)*Sv;return!e.some(a=>a.laneId!==t?!1:i.spawnX-a.x<s)}function Am(n){return n%2===0?Mv:yv}function Du(n,e){return{headNodeName:mc[cd(mc,`${n}:${e}:kobold-head`)],clubNodeName:gc[cd(gc,`${n}:${e}:kobold-club`)]}}function cd(n,e){return n.length===0?0:Math.min(n.length-1,Math.floor(xS(e)*n.length))}function Sc(n,e){const t=Math.max(0,e),i=(n.impactVfx??[]).map(r=>mS(r,t)).filter(r=>r.activationDelaySec>0||r.remainingSec>Ut);return{...n,projectiles:n.projectiles.map(r=>pS(r,t)).filter(r=>r.activationDelaySec>0||r.remainingSec>0),impactVfx:i.length>0?i:void 0}}function nS(n,e){const t=Math.max(0,e),i=[...n.defeatedMonsterIds],r=[];for(const s of n.monsters){const a=iS(s,t);if(a==null){i.includes(s.monsterId)||i.push(s.monsterId);continue}r.push(a)}return{...n,monsters:r,defeatedMonsterIds:i}}function iS(n,e){if(n.hp>0)return n;let t=e,i=n.defeatDelaySec??0,r=n.defeatAnimationRemainingSec;const s=n.defeatAnimationDurationSec??po;let a=n.defeatFadeRemainingSec;const o=n.defeatFadeDurationSec??Jh;if(i>Ut&&t>0){const l=Math.min(i,t);i-=l,t-=l}if(i>Ut)return{...n,...zr(),defeatDelaySec:i,defeatAnimationRemainingSec:r,defeatAnimationDurationSec:r==null?n.defeatAnimationDurationSec:s,defeatFadeRemainingSec:a,defeatFadeDurationSec:a==null?n.defeatFadeDurationSec:o};if(r==null&&(r=po),r>Ut&&t>0){const l=Math.min(r,t);r-=l,t-=l}return r>Ut?{...n,...zr(),defeatDelaySec:0,defeatAnimationRemainingSec:r,defeatAnimationDurationSec:s,defeatFadeRemainingSec:a,defeatFadeDurationSec:a==null?n.defeatFadeDurationSec:o}:(a==null&&(a=Jh),t>0&&(a-=t),a<=Ut?null:{...n,...zr(),defeatDelaySec:0,defeatAnimationRemainingSec:0,defeatAnimationDurationSec:s,defeatFadeRemainingSec:a,defeatFadeDurationSec:o})}function rS(n,e){const t=[...n.hitShakeQueueSec??[],Math.max(0,e)].sort((r,s)=>r-s),i=n.hitShakeRemainingSec??0;return{hitShakeDelaySec:t[0],hitShakeQueueSec:t,hitShakeRemainingSec:i>0?Os:i,hitShakeDurationSec:Os}}function sS(){return{hitShakeDelaySec:void 0,hitShakeQueueSec:void 0,hitShakeRemainingSec:Os,hitShakeDurationSec:Os}}function aS(n,e,t){if(t<=0)return zr();const i=n.healthBarHp??n.hp,r=[...n.healthBarUpdateQueue??[],{delaySec:Math.max(0,e),hp:t}].sort((s,a)=>s.delaySec-a.delaySec);return{healthBarHp:i,healthBarUpdateQueue:r}}function zr(){return{healthBarHp:void 0,healthBarUpdateQueue:void 0}}function oS(){return{iceFreezeDelayQueueSec:void 0,iceFreezeRemainingSec:pc,iceFreezeDurationSec:pc}}function lS(n,e){const t=Math.max(0,e);return{...n,monsters:n.monsters.map(i=>fS(i,t))}}function cS(n,e){const t=Math.max(0,e);return{...n,monsters:n.monsters.map(i=>dS(i,t))}}function uS(n,e){const t=Math.max(0,e);return{...n,monsters:n.monsters.map(i=>hS(i,t))}}function hS(n,e){const i=[...n.iceFreezeDelayQueueSec??[]].sort((c,u)=>c-u),r=[],s=n.iceFreezeDurationSec??pc;let a=n.iceFreezeRemainingSec??0,o=0;for(const c of i){if(c>e){r.push(c-e);continue}const u=Math.max(0,c-o);u>0&&(a=Math.max(0,a-u)),o=Math.max(o,c),a+=s}const l=Math.max(0,e-o);return l>0&&(a=Math.max(0,a-l)),a<=Ut&&r.length<=0?{...n,iceFreezeRemainingSec:void 0,iceFreezeDurationSec:void 0,iceFreezeDelayQueueSec:void 0}:{...n,iceFreezeRemainingSec:a>Ut?a:void 0,iceFreezeDurationSec:s,iceFreezeDelayQueueSec:r.length>0?r:void 0}}function dS(n,e){if(n.hp<=0)return n.healthBarHp==null&&n.healthBarUpdateQueue==null?n:{...n,...zr()};const t=n.healthBarUpdateQueue??[];if(t.length<=0)return n.healthBarHp!=null&&n.healthBarHp===n.hp?{...n,healthBarHp:void 0,healthBarUpdateQueue:void 0}:n;const i=t.map(o=>({...o,delaySec:o.delaySec-e})).sort((o,l)=>o.delaySec-l.delaySec),r=i.filter(o=>o.delaySec<=Ut),s=i.filter(o=>o.delaySec>Ut),a=r.length>0?r[r.length-1].hp:n.healthBarHp;return s.length<=0&&a===n.hp?{...n,healthBarHp:void 0,healthBarUpdateQueue:void 0}:{...n,healthBarHp:a,healthBarUpdateQueue:s.length>0?s:void 0}}function fS(n,e){const i=(n.hitShakeQueueSec??(n.hitShakeDelaySec!=null?[n.hitShakeDelaySec]:[])).map(u=>u-e).sort((u,h)=>u-h),r=i.filter(u=>u<=Ut).length,s=i.filter(u=>u>Ut);let a=s[0];const o=s.length>0?s:void 0;let l=n.hitShakeRemainingSec;const c=n.hitShakeDurationSec??Os;return r>0?l=c:l!=null&&l>0&&(l-=e,l<=Ut&&(l=void 0)),(l??0)<=Ut&&o==null?{...n,hitShakeDelaySec:void 0,hitShakeQueueSec:void 0,hitShakeRemainingSec:void 0,hitShakeDurationSec:void 0}:{...n,hitShakeDelaySec:a,hitShakeQueueSec:o,hitShakeRemainingSec:l,hitShakeDurationSec:c}}function pS(n,e){let t=e,i=n.activationDelaySec;const r=Math.max(0,n.castActivationDelaySec-e);let s=n.remainingSec;if(i>0){const a=Math.min(i,t);i-=a,t-=a}return i<=0&&t>0&&(s-=t),{...n,castActivationDelaySec:r,activationDelaySec:Math.max(0,i),remainingSec:s}}function mS(n,e){let t=e,i=n.activationDelaySec,r=n.remainingSec;if(i>0){const s=Math.min(i,t);i-=s,t-=s}return i<=0&&t>0&&(r-=t),{...n,activationDelaySec:Math.max(0,i),remainingSec:r}}function wm(n,e){return n.monsters.some(t=>t.hp>0&&gS(e,t))?"lost":n.nextSpawnIndex>=e.trial.waveManifest.length&&n.monsters.length===0&&n.defeatedMonsterIds.length>=e.trial.waveManifest.length?"won":"playing"}function gS(n,e){return e.x-rm(e.kind)<=n.trial.contactX}function Rm(n){switch(n){case"FIRE":return"fire";case"ICE":return"ice";case"LIGHTNING":return"lightning";case"EARTH":return"earth"}}function _S(n,e){return Fu(n,e).y}function Fu(n,e){const t=n.trial.lanes.find(i=>i.laneId===e);if(t==null)throw new Error(`Trial lane ${e} does not exist.`);return t}function xS(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967295}function vS(n){switch(n){case"kobold":return .35;case"tallKobold":return .45;case"miniBoss":return .55}}function Za(n,e,t){return{valid:!1,board:n,runtime:e,scoreDelta:0,damageEvents:[],queuedAttackEvents:[],scoringStats:am,animationTrace:t}}const SS=[{offset:{col:0,row:0},type:"LIGHTNING"},{offset:{col:1,row:0},type:"EARTH"},{offset:{col:2,row:0},type:"LIGHTNING"},{offset:{col:0,row:1},type:"ICE"},{offset:{col:1,row:1},type:"LIGHTNING"},{offset:{col:2,row:1},type:"EARTH"}],Mc=["FIRE","ICE","LIGHTNING","EARTH"];function MS(n){for(const e of hd()){const t=ud(n,e);if(t!=null)return t}for(let e=0;e<Mc.length;e+=1){const t=bS(n,e);for(const i of hd()){const r=ud(t,i);if(r!=null)return r}}throw new Error("Unable to create a valid Trial tutorial lightning board.")}function yS(n,e,t){return Es(e,n.allowedSwap.from)&&Es(t,n.allowedSwap.to)||Es(e,n.allowedSwap.to)&&Es(t,n.allowedSwap.from)}function ud(n,e){const t=dt(n),i=ur(t,"trial-tutorial-tile");for(const l of SS){const c={col:e.col+l.offset.col,row:e.row+l.offset.row};if(!TS(t,c,l.type,i))return null}const r={from:{col:e.col+1,row:e.row+1},to:{col:e.col+1,row:e.row}},s=[{col:e.col,row:e.row},{...r.from},{col:e.col+2,row:e.row}],a=[{...r.to},{...r.from}],o={board:t,allowedSwap:r,flashCells:a,matchCells:s,movingCell:{...r.from},direction:{col:r.to.col-r.from.col,row:r.to.row-r.from.row}};return ES(o)?o:null}function TS(n,e,t,i){const r=gt(n,e);return r==null||r.isVoid||r.blocker!=null?!1:(r.tile=r.tile==null?hr(t,e.col,e.row,i):{...r.tile,type:t,col:e.col,row:e.row},!0)}function ES(n){if(rr(n.board).length>0||!Us(n.board,n.allowedSwap.from,n.allowedSwap.to).valid)return!1;const e=wu(n.board,n.allowedSwap.from,n.allowedSwap.to),t=[{col:n.allowedSwap.to.col-1,row:n.allowedSwap.to.row},{...n.allowedSwap.to},{col:n.allowedSwap.to.col+1,row:n.allowedSwap.to.row}];return rr(e,{preferredSpawnCell:n.allowedSwap.to}).some(i=>i.tileType==="LIGHTNING"&&t.every(r=>i.tiles.some(s=>Es(s,r))))}function bS(n,e){const t=dt(n),i=ur(t,"trial-tutorial-fallback-tile");for(let r=0;r<ye;r+=1)for(let s=0;s<ye;s+=1){const a=t[r][s];if(a.isVoid)continue;const o=Mc[(s+r*2+e)%Mc.length];a.tile=a.tile==null?hr(o,s,r,i):{...a.tile,type:o,col:s,row:r}}return t}function hd(){const n=[];for(let e=1;e<ye-1;e+=1)for(let t=0;t<=ye-3;t+=1)n.push({col:t,row:e});return n.sort((e,t)=>{const i=Math.abs(e.col-2)+Math.abs(e.row-3),r=Math.abs(t.col-2)+Math.abs(t.row-3);return i-r||e.row-t.row||e.col-t.col})}function Es(n,e){return nt(n)===nt(e)}const mo=10,nl=["Brave","Mystic","Golden","Clever","Radiant","Stalwart","Arcane","Noble"],dd=["Magus","Warden","Sage","Spark","Voyager","Keeper","Knight","Seeker"];function AS(n,e){const t=Oo([...n,e]),i=t.findIndex(r=>r.id===e.id)+1;return{entries:t.slice(0,mo),qualifiedRank:i>0&&i<=mo?i:null}}function Oo(n){return[...n].sort((e,t)=>t.score-e.score||t.levelsCleared-e.levelsCleared||t.createdAtMs-e.createdAtMs)}function wS(n){var e;return((e=Oo(n)[0])==null?void 0:e.score)??0}function RS(n,e,t,i){return{id:`${i}-${t}-${n}`,name:IS(t+i),score:n,levelsCleared:e,createdAtMs:i}}function IS(n){const e=nl[Math.abs(n)%nl.length],t=dd[Math.abs(Math.floor(n/nl.length))%dd.length];return`${e} ${t}`}function CS(n){if(n==null||n.trim()==="")return[];try{const e=JSON.parse(n);return Array.isArray(e)?Oo(e.filter(LS)).slice(0,mo):[]}catch{return[]}}function PS(n){return JSON.stringify(Oo(n).slice(0,mo))}function LS(n){if(typeof n!="object"||n==null)return!1;const e=n;return typeof e.id=="string"&&typeof e.name=="string"&&typeof e.score=="number"&&Number.isFinite(e.score)&&typeof e.levelsCleared=="number"&&Number.isFinite(e.levelsCleared)&&typeof e.createdAtMs=="number"&&Number.isFinite(e.createdAtMs)}const Im=3,DS=1.2;function fd(n){return{seed:n,lives:Im,levelNumber:1,difficulty:1,score:0,levelsCleared:0}}function FS(n,e,t){return t??"TRIAL"}function NS(n,e){return BS(n,e,2654435769)||1}function US(n,e){return{...n,score:n.score+e,levelsCleared:n.levelsCleared+1,levelNumber:n.levelNumber+1,difficulty:n.difficulty+1}}function OS(n){return{...n,lives:Math.max(0,n.lives-1)}}function BS(n,e,t){let i=(n^t)>>>0;return i=Math.imul(i^e,2246822507)>>>0,i=Math.imul(i^i>>>13,3266489909)>>>0,(i^i>>>16)>>>0}const at={backdropForest:"stage.backdrop.forest",mage:"actor.mage",princeCage:"actor.princeCage",goalFlag:"prop.goalFlag",pathMarker:"prop.pathMarker",monsterPlaceholder:"actor.monster.placeholder",miniBoss:"actor.monster.miniBoss",projectilePlaceholder:"vfx.projectile.placeholder",fireBurn:"vfx.fireBurn",earthImpact:"vfx.earthImpact",healthBarTrack:"ui.healthBar.track",healthBarFill:"ui.healthBar.fill"},yc={x:3,y:3,z:3},kS={x:5.25,y:5.25,z:5.25},Cm=10.8,HS=Cm/Ze,pd=-1.47-50*HS,Tc=.45,Pm=.35,Hi=Tc+Pm,Ec=Cm+2,_i=.45,zS=Ec,md=.92,gd=.18,_d=.11,VS=.08,GS=3.72,Nu=2,WS=5.8,xd=3.3,XS=1.2425,YS=12,vd=2.4,KS=.625,qS=14,$S=.14,jS=.045,Sd=1e-6,ZS=.18,JS=3,QS=.1,eM=[-1.25,.1,1.45],tM=-.35,il=bn,rl=1.5,ua=.65,nM=192,iM=18,rM=24,sM=266,aM=20,Md=1,yd=288,oM=-15,lM=40,cM=4,uM=.01;class hM{constructor(e,t={}){ne(this,"events",[]);ne(this,"rng",new ho);ne(this,"elapsedSec",0);ne(this,"run",fd(Zo()));ne(this,"board",Eu());ne(this,"currentLevel",null);ne(this,"journeyRuntime",null);ne(this,"trialRuntime",null);ne(this,"phase","IDLE");ne(this,"muted",!1);ne(this,"bgmMuted",!1);ne(this,"transitionTimerSec",0);ne(this,"pendingLevelResult",null);ne(this,"pendingClearScore",0);ne(this,"levelMatchCount",0);ne(this,"levelValidSwapCount",0);ne(this,"finalScore",0);ne(this,"debugSeed");ne(this,"visualCues",[]);ne(this,"shakeTimerSec",0);ne(this,"shakeAmplitudePixels",0);ne(this,"latestBoardAnimationTrace",null);ne(this,"latestBoardAnimationEndsAtSec",0);ne(this,"animationClockSec",0);ne(this,"nextBoardAnimationRevision",1);ne(this,"matchHintTimerSec",0);ne(this,"trialPlayerDefeatSfxEmitted",!1);ne(this,"trialTutorial",null);ne(this,"tutorialPresentationMode","standard");ne(this,"tutorialZoomOutElapsedSec",0);ne(this,"floatingTutorialResolveElapsedSec",0);ne(this,"floatingTutorialDragStart",null);ne(this,"trialActorEntranceElapsedSec",Hi);ne(this,"trialMageExitElapsedSec",_i);this.options=t,this.debugSeed=e,this.reset(e)}update(e,t){const i=Math.max(0,e);this.animationClockSec+=i,this.updateBoardJuice(i);for(const r of t){if(r.type==="restart"){this.tryAgain();continue}if(r.type==="muteToggle"){this.emitUiClick(),this.muted=!this.muted;continue}if(r.type==="tap"){this.handleTap(r.x,r.y);continue}if(r.type==="dragStart"){this.handleDragStart(r.x,r.y);continue}if(r.type==="dragEnd"){this.handleDragEnd(r.x,r.y);continue}r.type==="swap"&&this.handleSwap(r.from,r.to)}if(this.updateTutorialPresentation(i),this.phase==="IDLE"){this.elapsedSec+=i,this.updateMatchHintTimer(i);const r=this.updateTrialActorEntrance(i);this.updateTrialStage(r)}(this.phase==="WIN"||this.phase==="LOSE")&&(this.updateTrialVisualTimers(i),this.updateTrialMageExit(i),this.transitionTimerSec+=i,this.transitionTimerSec>=DS&&this.hasLatestBoardAnimationFinished()&&this.isLevelResultExitAnimationComplete()&&this.advanceAfterLevelResult())}getBoardRenderState(){var t,i,r;const e=this.getTutorialPresentationState();return{logicalWidth:Ze,logicalHeight:bn,tutorialPresentation:e,boardCells:Ji(this.board).map(s=>{const a=this.board[s.row][s.col].tile;return a==null?null:{tileId:a.id,coord:s,assetId:Ed(a.type),tileType:a.type,isPath:this.board[s.row][s.col].isPath,alpha:1}}).filter(s=>s!=null),emptyCells:A_(this.board).map(s=>({coord:s,assetId:R.tiles.empty})),pathCells:Ji(this.board).filter(s=>this.board[s.row][s.col].isPath),mageCell:((t=this.journeyRuntime)==null?void 0:t.mageCell)??null,goalCell:((i=this.currentLevel)==null?void 0:i.type)==="JOURNEY"?this.currentLevel.journey.goalCell:null,hintedCells:((r=this.currentLevel)==null?void 0:r.type)==="JOURNEY"&&this.journeyRuntime!=null?$h(this.currentLevel,this.journeyRuntime,this.elapsedSec):[],selectedCell:null,queuedSwap:null,shakePixels:this.getShakePixels(),visualCues:this.getBoardVisualCueState(),animationTrace:this.latestBoardAnimationTrace,matchHint:this.getMatchHintVisualState(),tutorialLock:e.hideBoard?null:this.getTrialTutorialVisualState()}}getHeroWorldState(){var t,i;const e=this.getHeroWorldObjects();return{levelType:((t=this.currentLevel)==null?void 0:t.type)??"JOURNEY",backdropId:this.getHeroStageBackdropAssetId(),cinematicState:mM(this.phase),objects:e,activeProjectiles:((i=this.trialRuntime)==null?void 0:i.projectiles)??[],camera:{mode:"fixed",position:{x:0,y:0,z:12},target:{x:0,y:0,z:0},fovDeg:35}}}getHudState(){return{phase:this.phase,levelText:`Level ${this.run.levelNumber}`,lives:this.run.lives,scoreText:`${this.run.score}`,objectiveText:this.getObjectiveText(),trialMonsterFill:this.getTrialMonsterFill(),muted:this.muted,bgmMuted:this.bgmMuted,debugText:`Seed ${this.run.seed}`}}getScreenState(e=[],t=null){return{screen:kM(this.phase),phase:this.phase,finalScore:this.phase==="GAME_OVER"?this.finalScore:this.run.score,highScore:wS(e),leaderboardRows:e,highlightedRank:t,buttonRects:{tryAgain:lc,mute:Oh,bgm:Tu},muted:this.muted,transitionText:HM(this.phase)}}drainEvents(){const e=this.events;return this.events=[],e}reset(e=Zo()){if(this.rng=new ho(e),this.run=fd(e),this.options.debugStartLevel!=null&&this.options.debugStartLevel>1){const t=Math.floor(this.options.debugStartLevel);this.run={...this.run,levelNumber:t,difficulty:t,levelsCleared:t-1}}this.prepareCurrentLevel(),this.elapsedSec=0,this.transitionTimerSec=0,this.pendingLevelResult=null,this.pendingClearScore=0,this.finalScore=0,this.visualCues=[],this.shakeTimerSec=0,this.shakeAmplitudePixels=0,this.latestBoardAnimationTrace=null,this.latestBoardAnimationEndsAtSec=0,this.animationClockSec=0,this.nextBoardAnimationRevision=1,this.resetMatchHintTimer(),this.events=[],this.bgmMuted=!1,this.trialTutorial=null,this.tutorialPresentationMode="standard",this.tutorialZoomOutElapsedSec=0,this.floatingTutorialResolveElapsedSec=0,this.floatingTutorialDragStart=null,this.trialActorEntranceElapsedSec=Hi,this.trialMageExitElapsedSec=_i,this.startPreparedLevel()}getRunStateForDebug(){return{...this.run}}getRngStateForDebug(){return this.rng.getState()}getElapsedSecForDebug(){return this.elapsedSec}getBoardForDebug(){return this.board}getCurrentLevelForDebug(){return this.currentLevel}getJourneyRuntimeForDebug(){return this.journeyRuntime==null?null:{...this.journeyRuntime}}getTrialRuntimeForDebug(){return this.trialRuntime==null?null:{...this.trialRuntime,monsters:this.trialRuntime.monsters.map(e=>({...e})),projectiles:this.trialRuntime.projectiles.map(e=>({...e})),pendingAttacks:this.trialRuntime.pendingAttacks.map(e=>({...e,excludedMonsterIds:e.excludedMonsterIds==null?void 0:[...e.excludedMonsterIds]})),defeatedMonsterIds:[...this.trialRuntime.defeatedMonsterIds]}}getLevelStatsForDebug(){return{matchCount:this.levelMatchCount,validSwapCount:this.levelValidSwapCount}}getTrialTutorialStateForDebug(){return this.trialTutorial==null?null:{...this.trialTutorial,board:dt(this.trialTutorial.board),allowedSwap:{from:{...this.trialTutorial.allowedSwap.from},to:{...this.trialTutorial.allowedSwap.to}},flashCells:this.trialTutorial.flashCells.map(e=>({...e})),matchCells:this.trialTutorial.matchCells.map(e=>({...e})),movingCell:{...this.trialTutorial.movingCell},direction:{...this.trialTutorial.direction}}}getTrialEntranceStateForDebug(){return{active:this.isTrialActorEntranceActive(),elapsedSec:this.trialActorEntranceElapsedSec,enemyProgress:this.getTrialActorEntranceEnemyProgress(),mageProgress:this.getTrialActorEntranceMageProgress()}}getLatestBoardAnimationEndsAtSecForDebug(){return this.latestBoardAnimationEndsAtSec}getTrialWalkingMonsterIds(){var e;return this.phase!=="IDLE"?[]:((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"||this.trialRuntime==null?[]:this.isTrialActorEntranceActive()?[]:this.trialRuntime.result!=="playing"?[]:this.trialRuntime.monsters.filter(t=>this.isTrialMonsterActivelyWalking(t)).map(t=>t.monsterId)}isTrialMonsterActivelyWalking(e){return e.hp<=0||(e.defeatAnimationRemainingSec??0)>Sd||(e.iceFreezeRemainingSec??0)>Sd?!1:e.walkSpeed>0}prepareCurrentLevel(){const e=FS(this.run.seed,this.run.levelNumber,this.options.debugLevelType),t=this.run.levelNumber===1?this.run.seed:NS(this.run.seed,this.run.levelNumber);this.currentLevel=jx({levelNumber:this.run.levelNumber,difficulty:this.run.difficulty,seed:t,forcedLevelType:e}),this.board=dt(this.currentLevel.initialBoard),this.journeyRuntime=this.currentLevel.type==="JOURNEY"?cv(this.currentLevel):null,this.trialRuntime=this.currentLevel.type==="TRIAL"?td(this.currentLevel):null,this.elapsedSec=0,this.transitionTimerSec=0,this.pendingLevelResult=null,this.pendingClearScore=0,this.levelMatchCount=0,this.levelValidSwapCount=0,this.visualCues=[],this.shakeTimerSec=0,this.shakeAmplitudePixels=0,this.latestBoardAnimationTrace=null,this.latestBoardAnimationEndsAtSec=this.animationClockSec,this.resetMatchHintTimer(),this.trialPlayerDefeatSfxEmitted=!1,this.trialTutorial=null,this.tutorialPresentationMode="standard",this.tutorialZoomOutElapsedSec=0,this.floatingTutorialResolveElapsedSec=0,this.floatingTutorialDragStart=null,this.trialActorEntranceElapsedSec=Hi,this.trialMageExitElapsedSec=_i}startPreparedLevel(){var e,t;this.currentLevel==null&&this.prepareCurrentLevel(),this.phase="IDLE",this.elapsedSec=0,this.transitionTimerSec=0,this.resetMatchHintTimer(),this.startTrialTutorialIfNeeded(),this.startTrialActorEntranceIfNeeded(),this.captureBoardAnimationTrace(C_(this.board,0)),this.requestSound(R.sounds.levelStart,{category:"level",volume:.35}),this.events.push({type:"levelStarted",levelNumber:this.run.levelNumber,levelType:((e=this.currentLevel)==null?void 0:e.type)??"JOURNEY",seed:((t=this.currentLevel)==null?void 0:t.seed)??this.run.seed})}startTrialTutorialIfNeeded(){var t;if(!this.shouldStartTrialTutorial()||((t=this.currentLevel)==null?void 0:t.type)!=="TRIAL")return;const e=MS(this.board);this.board=e.board,this.trialRuntime=BM(this.currentLevel),this.trialTutorial={...e,phase:"active"},this.tutorialPresentationMode="tutorialFullHero",this.tutorialZoomOutElapsedSec=0,this.floatingTutorialResolveElapsedSec=0,this.floatingTutorialDragStart=null}shouldStartTrialTutorial(){var e;return this.options.skipTutorial!==!0&&this.options.debugLevelType==null&&this.options.debugStartLevel==null&&this.run.levelNumber===1&&((e=this.currentLevel)==null?void 0:e.type)==="TRIAL"}startTrialActorEntranceIfNeeded(){var e;this.trialActorEntranceElapsedSec=((e=this.currentLevel)==null?void 0:e.type)==="TRIAL"?0:Hi}updateTrialActorEntrance(e){const t=Math.max(0,e);if(!this.isTrialActorEntranceActive())return t;const i=Math.max(0,Hi-this.trialActorEntranceElapsedSec),r=Math.min(i,t);return this.trialActorEntranceElapsedSec=Math.min(Hi,this.trialActorEntranceElapsedSec+r),Math.max(0,t-r)}isTrialActorEntranceActive(){var e;return((e=this.currentLevel)==null?void 0:e.type)==="TRIAL"&&this.trialActorEntranceElapsedSec<Hi}getTrialActorEntranceEnemyProgress(){return eo(Qa(this.trialActorEntranceElapsedSec/Tc))}getTrialActorEntranceMageProgress(){return eo(Qa((this.trialActorEntranceElapsedSec-Tc)/Pm))}getTrialMonsterEntranceXOffset(){var e;return((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"?0:Ec*(1-this.getTrialActorEntranceEnemyProgress())}getTrialMageEntranceXOffset(){var e;return((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"?0:-Ec*(1-this.getTrialActorEntranceMageProgress())}updateTrialMageExit(e){this.isTrialMageExitActive()&&(this.trialMageExitElapsedSec=Math.min(_i,this.trialMageExitElapsedSec+Math.max(0,e)))}isTrialMageExitActive(){var e;return((e=this.currentLevel)==null?void 0:e.type)==="TRIAL"&&this.pendingLevelResult==="win"&&this.trialMageExitElapsedSec<_i}isLevelResultExitAnimationComplete(){var e;return((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"||this.pendingLevelResult!=="win"||this.trialMageExitElapsedSec>=_i}getTrialMageExitXOffset(){var e;return((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"||this.pendingLevelResult!=="win"?0:zS*this.getTrialMageExitProgress()}getTrialMageExitProgress(){return eo(Qa(this.trialMageExitElapsedSec/_i))}updateTrialStage(e){var a,o;if(((a=this.currentLevel)==null?void 0:a.type)!=="TRIAL"||this.trialRuntime==null)return;const t=this.trialRuntime.result,i=Lv(this.trialRuntime,this.currentLevel,e),r=i.runtime;this.trialRuntime=r;const s=((o=this.trialTutorial)==null?void 0:o.phase)??null;s==null&&i.scoreDelta>0&&(this.run={...this.run,score:this.run.score+i.scoreDelta},this.events.push({type:"scoreChanged",score:this.run.score}));for(const l of i.damageEvents)this.emitTrialMonsterHitSounds(l);if(s!=null){s==="resolving"&&r.result==="won"&&this.completeTrialTutorial();return}this.maybeEmitTrialPlayerDefeatSfx(t,r.result),r.result==="won"?this.beginLevelResult("win"):r.result==="lost"&&this.beginLevelResult("loss")}updateTrialVisualTimers(e){var t;((t=this.currentLevel)==null?void 0:t.type)!=="TRIAL"||this.trialRuntime==null||(this.trialRuntime=Fv(this.trialRuntime,e))}completeTrialTutorial(){var e;if(((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"){this.trialTutorial=null,this.tutorialPresentationMode="standard";return}this.trialRuntime=td(this.currentLevel),this.trialTutorial=null,this.elapsedSec=0,this.resetMatchHintTimer(),this.trialPlayerDefeatSfxEmitted=!1,this.startTrialActorEntranceIfNeeded(),this.startTutorialZoomOut()}isTrialTutorialInputLocked(){return this.trialTutorial!=null||this.isTrialActorEntranceActive()}handleTap(e,t){var s,a;const i={x:e,y:t};if(T_(i)){this.emitUiClick(),this.bgmMuted=!this.bgmMuted;return}if(this.phase==="GAME_OVER"&&qa(i,lc)){this.tryAgain(),this.emitUiClick();return}if(this.phase!=="IDLE"&&this.phase!=="WIN"&&this.phase!=="LOSE")return;const r=cc(i);if(r==null){if(qa(i,Oh)){this.emitUiClick(),this.muted=!this.muted;return}return}if(this.phase==="IDLE"&&!this.isTrialTutorialInputLocked()){if(this.resetMatchHintTimer(),((s=this.currentLevel)==null?void 0:s.type)==="TRIAL"){this.handleTrialPowerUpTap(r);return}((a=this.currentLevel)==null?void 0:a.type)==="JOURNEY"&&this.handleJourneyPowerUpTap(r)}}handleDragStart(e,t){if(!this.isFloatingTutorialInputEnabled()){this.floatingTutorialDragStart=null;return}const i=this.floatingTutorialTileRoleAtPoint({x:e,y:t});this.floatingTutorialDragStart=i==="earth"||i==="lowerLightning"?{x:e,y:t}:null}handleDragEnd(e,t){if(!this.isFloatingTutorialInputEnabled()||this.floatingTutorialDragStart==null){this.floatingTutorialDragStart=null;return}const i=this.floatingTutorialTileRoleAtPoint(this.floatingTutorialDragStart),r=this.floatingTutorialTileRoleAtPoint({x:e,y:t});this.floatingTutorialDragStart=null,fM(i,r)&&this.activateFloatingTutorialSwap()}activateFloatingTutorialSwap(){if(this.trialTutorial==null||this.trialTutorial.phase!=="active")return;const e=this.trialTutorial.allowedSwap;this.resetMatchHintTimer(),this.handleTrialTutorialSwap(e.from,e.to)}startTutorialZoomOut(){this.tutorialPresentationMode="tutorialZoomOut",this.tutorialZoomOutElapsedSec=0,this.floatingTutorialResolveElapsedSec=0,this.floatingTutorialDragStart=null}updateTutorialPresentation(e){var t;((t=this.trialTutorial)==null?void 0:t.phase)==="resolving"&&(this.floatingTutorialResolveElapsedSec+=e),this.tutorialPresentationMode==="tutorialZoomOut"&&(this.tutorialZoomOutElapsedSec+=e,this.tutorialZoomOutElapsedSec>=ua&&(this.tutorialPresentationMode="standard",this.tutorialZoomOutElapsedSec=ua))}tryAgain(){this.reset(this.debugSeed??Zo())}beginLevelResult(e){this.pendingLevelResult!=null||this.currentLevel==null||(this.resetMatchHintTimer(),this.pendingLevelResult=e,this.transitionTimerSec=0,this.phase=e==="win"?"WIN":"LOSE",this.pendingClearScore=e==="win"?this.getLevelClearScore():0,this.trialMageExitElapsedSec=e==="win"&&this.currentLevel.type==="TRIAL"?0:_i,this.events.push({type:"levelEnded",levelNumber:this.run.levelNumber,levelType:this.currentLevel.type,result:e}))}advanceAfterLevelResult(){if(this.pendingLevelResult!=null){if(this.pendingLevelResult==="win"){this.run=US(this.run,this.pendingClearScore),this.requestSound(R.sounds.levelUp,{category:"level",volume:.58}),this.pendingClearScore>0&&this.events.push({type:"scoreChanged",score:this.run.score}),this.prepareCurrentLevel(),this.startPreparedLevel();return}if(this.run=OS(this.run),this.run.lives<=0){this.finalScore=this.run.score,this.phase="GAME_OVER",this.pendingLevelResult=null,this.transitionTimerSec=0,this.requestSound(R.sounds.runEnd,{category:"run",volume:.58}),this.events.push({type:"runEnded",finalScore:this.run.score,levelsCleared:this.run.levelsCleared});return}this.prepareCurrentLevel(),this.startPreparedLevel()}}handleSwap(e,t){var o,l,c,u;if(this.phase!=="IDLE"||((o=this.currentLevel)==null?void 0:o.type)==="TRIAL"&&this.isTrialActorEntranceActive())return;if(this.trialTutorial!=null){if(this.tutorialPresentationMode==="tutorialFullHero"||this.trialTutorial.phase!=="active"||!yS(this.trialTutorial,e,t))return;this.resetMatchHintTimer(),this.handleTrialTutorialSwap(e,t);return}if(this.resetMatchHintTimer(),((l=this.currentLevel)==null?void 0:l.type)==="TRIAL"&&this.trialRuntime!=null){this.handleTrialSwap(e,t);return}if(((c=this.currentLevel)==null?void 0:c.type)!=="JOURNEY"||this.journeyRuntime==null)return;const i=this.peekJourneySwapPowerUpType(e,t),r=uv(this.board,this.journeyRuntime,this.currentLevel,e,t,this.rng);if(!r.valid){this.captureBoardAnimationTrace(r.animationTrace),((u=r.animationTrace)==null?void 0:u.kind)==="invalidSwap"&&this.requestSound(R.sounds.boardMoveBack,{category:"match",volume:.46});return}const s=this.journeyRuntime.mageCell;this.requestSound(R.sounds.boardMove,{category:"match",volume:.48}),this.board=r.board,this.journeyRuntime=r.runtime,this.levelMatchCount+=r.scoringStats.matchCount,this.levelValidSwapCount+=r.scoringStats.validSwapCount,this.captureBoardAnimationTrace(r.animationTrace),this.emitPowerUpActivationSound(i),this.emitMatchAudioAndJuice(r.scoringStats,t),this.emitJourneyAudioAndJuice(r,s,t);const a=r.scoreDelta+ca(r.scoringStats);a>0&&(this.run={...this.run,score:this.run.score+a},this.events.push({type:"scoreChanged",score:this.run.score})),r.runtime.result==="won"?this.beginLevelResult("win"):r.runtime.result==="lost"&&this.beginLevelResult("loss")}handleJourneyPowerUpTap(e){var a,o,l;if(this.phase!=="IDLE"||((a=this.currentLevel)==null?void 0:a.type)!=="JOURNEY"||this.journeyRuntime==null)return;const t=hv(this.board,this.journeyRuntime,this.currentLevel,e,this.rng);if(!t.valid)return;const i=(l=(o=gt(this.board,e))==null?void 0:o.tile)==null?void 0:l.type,r=this.journeyRuntime.mageCell;this.board=t.board,this.journeyRuntime=t.runtime,this.levelMatchCount+=t.scoringStats.matchCount,this.levelValidSwapCount+=t.scoringStats.validSwapCount,this.captureBoardAnimationTrace(t.animationTrace),this.emitPowerUpActivationSound(i),this.emitMatchAudioAndJuice(t.scoringStats,e),this.emitJourneyAudioAndJuice(t,r,e);const s=t.scoreDelta+ca(t.scoringStats);s>0&&(this.run={...this.run,score:this.run.score+s},this.events.push({type:"scoreChanged",score:this.run.score})),t.runtime.result==="won"?this.beginLevelResult("win"):t.runtime.result==="lost"&&this.beginLevelResult("loss")}handleTrialSwap(e,t){var o,l;if(((o=this.currentLevel)==null?void 0:o.type)!=="TRIAL"||this.trialRuntime==null)return;const i=this.trialRuntime.result,r=this.peekTrialSwapPowerUpType(e,t),s=nd(this.board,this.trialRuntime,this.currentLevel,e,t,this.rng);if(!s.valid){this.captureBoardAnimationTrace(s.animationTrace),((l=s.animationTrace)==null?void 0:l.kind)==="invalidSwap"&&this.requestSound(R.sounds.boardMoveBack,{category:"match",volume:.46});return}this.requestSound(R.sounds.boardMove,{category:"match",volume:.48}),this.board=s.board,this.trialRuntime=s.runtime,this.maybeEmitTrialPlayerDefeatSfx(i,s.runtime.result),this.levelMatchCount+=s.scoringStats.matchCount,this.levelValidSwapCount+=s.scoringStats.validSwapCount,this.captureBoardAnimationTrace(s.animationTrace),this.emitPowerUpActivationSound(r),this.emitMatchAudioAndJuice(s.scoringStats,t),this.emitTrialAudioAndJuice(s.queuedAttackEvents,t);const a=s.scoreDelta+ca(s.scoringStats);a>0&&(this.run={...this.run,score:this.run.score+a},this.events.push({type:"scoreChanged",score:this.run.score}));for(const c of s.damageEvents)this.emitTrialMonsterHitSounds(c);s.runtime.result==="won"?this.beginLevelResult("win"):s.runtime.result==="lost"&&this.beginLevelResult("loss")}handleTrialTutorialSwap(e,t){var r;if(((r=this.currentLevel)==null?void 0:r.type)!=="TRIAL"||this.trialRuntime==null||this.trialTutorial==null||this.trialTutorial.phase!=="active")return;const i=nd(this.board,this.trialRuntime,this.currentLevel,e,t,this.rng);if(i.valid){this.requestSound(R.sounds.boardMove,{category:"match",volume:.48}),this.board=i.board,this.trialRuntime=i.runtime,this.trialTutorial={...this.trialTutorial,phase:"resolving"},this.floatingTutorialResolveElapsedSec=0,this.captureBoardAnimationTrace(i.animationTrace),this.emitMatchAudioAndJuice(i.scoringStats,t),this.emitTrialAudioAndJuice(i.queuedAttackEvents,t);for(const s of i.damageEvents)this.emitTrialMonsterHitSounds(s)}}handleTrialPowerUpTap(e){var a,o,l;if(((a=this.currentLevel)==null?void 0:a.type)!=="TRIAL"||this.trialRuntime==null)return;const t=this.trialRuntime.result,i=Nv(this.board,this.trialRuntime,this.currentLevel,e,this.rng);if(!i.valid)return;const r=(l=(o=gt(this.board,e))==null?void 0:o.tile)==null?void 0:l.type;this.board=i.board,this.trialRuntime=i.runtime,this.maybeEmitTrialPlayerDefeatSfx(t,i.runtime.result),this.levelMatchCount+=i.scoringStats.matchCount,this.levelValidSwapCount+=i.scoringStats.validSwapCount,this.captureBoardAnimationTrace(i.animationTrace),this.emitPowerUpActivationSound(r),this.emitMatchAudioAndJuice(i.scoringStats,e),this.emitTrialAudioAndJuice(i.queuedAttackEvents,e);const s=i.scoreDelta+ca(i.scoringStats);s>0&&(this.run={...this.run,score:this.run.score+s},this.events.push({type:"scoreChanged",score:this.run.score}));for(const c of i.damageEvents)this.emitTrialMonsterHitSounds(c);i.runtime.result==="won"?this.beginLevelResult("win"):i.runtime.result==="lost"&&this.beginLevelResult("loss")}getLevelClearScore(){var e,t;return((e=this.currentLevel)==null?void 0:e.type)==="JOURNEY"&&this.journeyRuntime!=null?ov(this.run.difficulty,this.journeyRuntime.movesRemaining):((t=this.currentLevel)==null?void 0:t.type)==="TRIAL"?lv(this.run.difficulty,this.levelMatchCount,this.elapsedSec):0}captureBoardAnimationTrace(e){const t=P_(e,this.nextBoardAnimationRevision);t!=null&&(this.latestBoardAnimationTrace=t,this.latestBoardAnimationEndsAtSec=this.animationClockSec+Wp(t)/1e3,this.nextBoardAnimationRevision+=1)}hasLatestBoardAnimationFinished(){return this.animationClockSec>=this.latestBoardAnimationEndsAtSec}peekJourneySwapPowerUpType(e,t){var s,a,o,l;const i=(a=(s=gt(this.board,e))==null?void 0:s.tile)==null?void 0:a.type,r=(l=(o=gt(this.board,t))==null?void 0:o.tile)==null?void 0:l.type;return Kr(i)?i:Kr(r)?r:null}peekTrialSwapPowerUpType(e,t){var s,a;const i=(s=gt(this.board,e))==null?void 0:s.tile,r=(a=gt(this.board,t))==null?void 0:a.tile;return i!=null&&Ci(i.type)?i.type:r!=null&&Ci(r.type)?r.type:null}emitPowerUpActivationSound(e){e==="TNT"?this.requestSound(R.sounds.powerupBombActivate,{category:"match",volume:.52}):(e==="ROCKET_H"||e==="ROCKET_V")&&this.requestSound(R.sounds.powerupRocketActivate,{category:"match",volume:.52})}requestSound(e,t={}){const i={type:"soundRequested",soundId:e};t.intensity!=null&&(i.intensity=t.intensity),t.volume!=null&&(i.volume=t.volume),t.playbackRate!=null&&(i.playbackRate=t.playbackRate),t.category!=null&&(i.category=t.category),t.delaySec!=null&&(i.delaySec=t.delaySec),this.events.push(i)}emitUiClick(){this.requestSound(R.sounds.uiClick,{category:"ui",volume:.52})}emitMatchAudioAndJuice(e,t){e.matchCount<=0||(this.requestSound(R.sounds.mergeMatch,{category:"match",volume:.52}),this.requestSound(R.sounds.matchCoin,{category:"match",volume:.5}),e.powerUpsCreated>0&&this.addBoardCue("powerPulse",t,.45),this.addBoardCue("matchFlash",t,.3),this.triggerBoardShake(e.matchCount+e.powerUpsCreated))}emitJourneyAudioAndJuice(e,t,i){for(const r of e.clearedStandardCells.slice(0,8))this.addBoardCue("matchFlash",r,.28);if(e.convertedPathCells.length>0)for(const r of e.convertedPathCells.slice(0,12))this.addBoardCue("pathGlow",r,.55);bd(t,e.runtime.mageCell)||this.addBoardCue("pathGlow",e.runtime.mageCell,.42),e.convertedPathCells.length===0&&e.clearedStandardCells.length===0&&this.addBoardCue("matchFlash",i,.22)}emitTrialAudioAndJuice(e,t){for(const i of e.slice(0,8)){const r=pM(i.schoolId);this.requestSound(r.whoosh,{category:"spell",volume:.34,delaySec:i.castActivationDelaySec}),this.addBoardCue("damagePopup",t,.45,`-${Math.round(i.damage)}`)}}emitTrialMonsterHitSounds(e){e.damage<=0||(this.requestSound(R.sounds.monsterDamage,{category:"enemy",volume:1,delaySec:e.impactDelaySec}),e.defeated&&this.requestSound(R.sounds.monsterDefeat,{category:"enemy",volume:.62,delaySec:e.impactDelaySec}))}maybeEmitTrialPlayerDefeatSfx(e,t){var i;((i=this.currentLevel)==null?void 0:i.type)==="TRIAL"&&(e!=="playing"||t!=="lost"||this.trialPlayerDefeatSfxEmitted||(this.trialPlayerDefeatSfxEmitted=!0,this.requestSound(R.sounds.playerDamage,{category:"level",volume:.5}),this.requestSound(R.sounds.playerDefeat,{category:"level",volume:.58,delaySec:ZS})))}addBoardCue(e,t,i,r){this.visualCues.push({kind:e,coord:t,text:r,durationSec:i,remainingSec:i})}triggerBoardShake(e){this.shakeTimerSec=Math.max(this.shakeTimerSec,.16),this.shakeAmplitudePixels=Math.min(kh,Math.max(Jo,Jo+e*1.4))}updateBoardJuice(e){e<=0||(this.shakeTimerSec=Math.max(0,this.shakeTimerSec-e),this.shakeTimerSec<=0&&(this.shakeAmplitudePixels=0),this.visualCues=this.visualCues.map(t=>({...t,remainingSec:t.remainingSec-e})).filter(t=>t.remainingSec>0))}getShakePixels(){return this.shakeTimerSec<=0?0:Math.min(kh,Math.max(Jo,this.shakeAmplitudePixels))}getBoardVisualCueState(){return this.visualCues.map(e=>({kind:e.kind,coord:e.coord,text:e.text,value:Math.max(0,Math.min(1,e.remainingSec/e.durationSec))}))}getTutorialPresentationState(){const e=this.tutorialPresentationMode==="tutorialFullHero"&&!this.isFullHeroTutorialPresentationActive()?"standard":this.tutorialPresentationMode,t=e!=="standard",i=e!=="standard";return{mode:e,heroHeight:this.getActiveHeroHeight(e),sceneScale:this.getTutorialSceneScale(e),hideHud:t,hideBoard:i,floatingMatch:e==="tutorialFullHero"?this.getFloatingTutorialMatchVisualState():null}}getActiveHeroHeight(e=this.tutorialPresentationMode){if(e==="tutorialFullHero")return il;if(e!=="tutorialZoomOut")return Yt;const t=Math.max(0,Math.min(1,this.tutorialZoomOutElapsedSec/ua)),i=1-Math.pow(1-t,3);return il+(Yt-il)*i}getTutorialSceneScale(e=this.tutorialPresentationMode){if(e==="tutorialFullHero")return rl;if(e!=="tutorialZoomOut")return 1;const t=Math.max(0,Math.min(1,this.tutorialZoomOutElapsedSec/ua)),i=1-Math.pow(1-t,3);return rl+(1-rl)*i}isFullHeroTutorialPresentationActive(){return this.tutorialPresentationMode==="tutorialFullHero"&&this.trialTutorial!=null}isFloatingTutorialInputEnabled(){var e;return this.tutorialPresentationMode==="tutorialFullHero"&&((e=this.trialTutorial)==null?void 0:e.phase)==="active"&&!this.isTrialActorEntranceActive()}isFloatingTutorialOverlayVisible(){return this.tutorialPresentationMode!=="tutorialFullHero"||this.trialTutorial==null?!1:this.trialTutorial.phase==="active"?!0:this.floatingTutorialResolveElapsedSec<this.getFloatingTutorialMatchAnimationDurationSec()}getFloatingTutorialMatchAnimationDurationSec(){return(Qs+fo)/1e3}getFloatingTutorialMatchVisualState(){var x,M;if(!this.isFloatingTutorialOverlayVisible())return null;const e=nM,t=iM,i=e*3+t*2,r=e*2+t,s=(Ze-i)/2,a=bn-r-rM-sM,o=this.matchHintTimerSec%ki/ki,l=(Math.sin(o*Math.PI*2*5)+1)/2,c=.18+l*.32,u=Math.max(0,Math.sin(o*Math.PI*2*3))*Gp,h=((x=this.trialTutorial)==null?void 0:x.phase)==="resolving"?"resolving":"idle",d=h==="idle",f=(M=this.trialTutorial)==null?void 0:M.allowedSwap,p=(f==null?void 0:f.to)??{col:1,row:0},_=(f==null?void 0:f.from)??{col:1,row:1},m=(y,w,E,C,S,A="none")=>({tileId:`floating-tutorial-${y}`,role:y,tileType:w,assetId:Ed(w),sourceCoord:S,rect:{x:s+E*(e+t),y:a+C*(e+t)-(d&&A==="bounce"?u:0),width:e,height:e},alpha:1,flash:d&&A!=="none"?c:0,scale:d&&A==="pulse"?1+l*.08:1,zIndex:aM+C*3+E}),g=[m("topLeftLightning","LIGHTNING",0,0,{col:p.col-1,row:p.row}),m("earth","EARTH",1,0,p,"pulse"),m("topRightLightning","LIGHTNING",2,0,{col:p.col+1,row:p.row}),m("lowerLightning","LIGHTNING",1,1,_,"bounce")];return{phase:h,tiles:g,fingerHint:d?dM(g,this.matchHintTimerSec):null,allowedDrag:{fromRole:"lowerLightning",toRole:"earth"}}}floatingTutorialTileRoleAtPoint(e){var i;const t=this.getFloatingTutorialMatchVisualState();return t==null?null:((i=t.tiles.find(r=>qa(e,r.rect)))==null?void 0:i.role)??null}resetMatchHintTimer(){this.matchHintTimerSec=0}updateMatchHintTimer(e){this.matchHintTimerSec+=Math.max(0,e)}getMatchHintVisualState(){if(this.phase!=="IDLE"||this.trialTutorial!=null||this.matchHintTimerSec<Hh)return null;const e=ki+q_,t=this.matchHintTimerSec-Hh,i=Math.floor(t/e),r=t-i*e;if(r>=ki)return null;const s=ux(this.board);if(s.length===0)return null;const a=s[i%s.length];return{flashCells:a.flashCells,movingCell:a.movingCell,direction:a.direction,progress:Math.max(0,Math.min(1,r/ki))}}getTrialTutorialVisualState(){var i;if(this.phase!=="IDLE"||((i=this.trialTutorial)==null?void 0:i.phase)!=="active")return null;const e=this.trialTutorial,t=this.matchHintTimerSec%ki/ki;return{allowedSwap:{from:{...e.allowedSwap.from},to:{...e.allowedSwap.to}},flashCells:e.flashCells.map(r=>({...r})),movingCell:{...e.movingCell},direction:{...e.direction},progress:t,dimmedCells:Ji(this.board).filter(r=>![...e.flashCells,...e.matchCells].some(s=>bd(s,r)))}}getTrialMonsterFill(){var r;if(((r=this.currentLevel)==null?void 0:r.type)!=="TRIAL"||this.trialRuntime==null)return null;const e=this.trialRuntime.totalMonsters,t=this.trialRuntime.defeatedMonsterIds.length;return{remaining:Math.max(0,e-t),total:e}}getObjectiveText(){var t,i;return((t=this.currentLevel)==null?void 0:t.type)==="TRIAL"&&this.trialRuntime!=null?"":((i=this.currentLevel)==null?void 0:i.type)!=="JOURNEY"||this.journeyRuntime==null?"Journey":this.journeyRuntime.result==="won"?"Goal reached":this.journeyRuntime.result==="lost"?"Out of moves":$h(this.currentLevel,this.journeyRuntime,this.elapsedSec).length>0?`Moves ${this.journeyRuntime.movesRemaining} - hinted path swap`:`Moves ${this.journeyRuntime.movesRemaining}`}getHeroStageBackdropAssetId(){return Ax(this.run.levelNumber)}getHeroWorldObjects(){var t,i;const e=[xn("stage-backdrop",at.backdropForest,{position:{x:0,y:0,z:-.2},scale:{x:1,y:1,z:1},backdropTextureId:this.getHeroStageBackdropAssetId()})];if(((t=this.currentLevel)==null?void 0:t.type)==="TRIAL"&&this.trialRuntime!=null)return[...e,...this.getTrialHeroWorldObjects()];if(((i=this.currentLevel)==null?void 0:i.type)!=="JOURNEY"||this.journeyRuntime==null)return e;for(const r of Ji(this.board))this.board[r.row][r.col].isPath&&e.push(xn(`journey-path-${r.col}-${r.row}`,at.pathMarker,{position:ha(r,-.05),scale:{x:.35,y:.05,z:.35},renderOrder:1,replication:"localCosmetic"}));return e.push(xn("actor-mage",at.mage,{position:al(ha(this.journeyRuntime.mageCell,.35),pd),scale:yc,renderOrder:4,animationId:Ad(this.phase)}),xn("actor-prince-cage",at.princeCage,{position:ha(this.currentLevel.journey.goalCell,.55),scale:{x:.55,y:.75,z:.55},renderOrder:3,animationId:gM(this.phase)}),xn("prop-goal-flag",at.goalFlag,{position:ha(this.currentLevel.journey.goalCell,.15),scale:{x:.35,y:.55,z:.35},renderOrder:2,replication:"localCosmetic"})),e}getTrialHeroWorldObjects(){var s;if(((s=this.currentLevel)==null?void 0:s.type)!=="TRIAL"||this.trialRuntime==null)return[];const e=[xn("actor-mage",at.mage,{position:this.getTrialMageRenderPosition(),scale:yc,renderOrder:5,animationId:Ad(this.phase)}),xn("trial-fail-line",at.pathMarker,{position:{x:this.currentLevel.trial.contactX,y:this.currentLevel.trial.laneY,z:-.03},scale:{x:.06,y:1.25,z:.18},renderOrder:1,replication:"localCosmetic",tintHex:"#eb5757",opacity:.6})],t=new Map,i=xM(this.trialRuntime.monsters),r=!this.isTrialActorEntranceActive();for(const a of this.trialRuntime.monsters){const o=al(pm(this.currentLevel,a),mm(a.kind)+(a.visualYOffset??0)),l=RM(a),c=Ja(o,l.x+this.getTrialMonsterEntranceXOffset(),l.y);t.set(a.monsterId,c),e.push(xn(`trial-monster-${a.monsterId}`,OM(a.kind),{position:c,scale:_M(a.kind),renderOrder:vM(a,i),materialDepthTest:!1,animationId:SM(a,this.phase),opacity:MM(a),tintHex:EM(a,this.trialRuntime.elapsedMs/1e3),animationPaused:yM(a),animationTimeSec:TM(a),nodeVisibility:a.kind==="miniBoss"?void 0:zM(this.currentLevel.seed,a)}),...AM(a,c,this.trialRuntime.elapsedMs/1e3),...r?bM(a,c):[])}for(const a of this.trialRuntime.impactVfx??[])e.push(...wM(a,t));return e}getTrialMageRenderPosition(){var i;if(((i=this.currentLevel)==null?void 0:i.type)!=="TRIAL")return{x:0,y:0,z:0};const e=al(gm(this.currentLevel),pd),t=this.isFullHeroTutorialPresentationActive()?Ja(e,tM,0):e;return Ja(t,this.getTrialMageEntranceXOffset()+this.getTrialMageExitXOffset(),0)}}function dM(n,e){const t=n.find(l=>l.role==="lowerLightning"),i=n.find(l=>l.role==="earth");if(t==null||i==null)return null;const r=Td(t.rect),s=Td(i.rect),a=e%Md/Md,o=eo(a);return{assetId:R.ui.tutorialFinger,point:{x:r.x+(s.x-r.x)*o,y:r.y+(s.y-r.y)*o},width:yd,height:yd,rotationDegrees:oM,alpha:1,zIndex:lM}}function Td(n){return{x:n.x+n.width/2,y:n.y+n.height/2}}function fM(n,e){return n==="lowerLightning"&&e==="earth"||n==="earth"&&e==="lowerLightning"}function Ed(n){switch(n){case"FIRE":return R.tiles.fire;case"ICE":return R.tiles.ice;case"LIGHTNING":return R.tiles.lightning;case"EARTH":return R.tiles.earth;case"LAND":return R.tiles.land;case"ROCKET_H":return R.powerUps.rocketH;case"ROCKET_V":return R.powerUps.rocketV;case"TNT":return R.powerUps.tnt;case"LIGHTBALL":return R.powerUps.lightball}}function pM(n){switch(n){case"fire":return{whoosh:R.sounds.fireWhoosh};case"ice":return{whoosh:R.sounds.iceWhoosh};case"lightning":return{whoosh:R.sounds.lightningWhoosh};case"earth":return{whoosh:R.sounds.earthWhoosh}}}function bd(n,e){return n!=null&&n.col===e.col&&n.row===e.row}function mM(n){return n==="WIN"?"victory":n==="LOSE"?"fail":"none"}function Ad(n){return n==="WIN"?"victory":n==="LOSE"?"stunned":"idle"}function gM(n){return n==="WIN"?"yank":"cower"}function _M(n){return n==="miniBoss"?kS:yc}function xM(n){return new Map([...n].sort((e,t)=>e.x-t.x||e.spawnTimeMs-t.spawnTimeMs||e.monsterId.localeCompare(t.monsterId)).map((e,t)=>[e.monsterId,t]))}function vM(n,e){return cM+(e.get(n.monsterId)??0)*uM}function SM(n,e){return(n.defeatAnimationRemainingSec??0)>0||(n.defeatFadeRemainingSec??0)>0?"defeat":e==="LOSE"&&n.hp>0?"victory":"walk"}function MM(n){const e=n.defeatFadeRemainingSec??0,t=n.defeatFadeDurationSec??0;if(!(e<=0||t<=0))return Math.max(0,Math.min(1,e/t))}function yM(n){return n.hp>0&&((n.iceFreezeRemainingSec??0)>0||Lm(n))?!0:void 0}function TM(n){return n.hp>0&&Lm(n)?0:void 0}function Lm(n){return n.monsterId.startsWith("tutorial-kobold-")}function EM(n,e){if((n.iceFreezeRemainingSec??0)<=0)return;const t=.5+Math.sin(e*Math.PI*6)*.5;return PM("#38d5ff","#aaf5ff",t*.45)}function bM(n,e){if(n.hp<=0)return[];const t=CM(n);if(t<=0)return[];const i=FM(n.kind),r=NM(n.kind),s=UM(n.kind),a=e.y+DM(n.kind),o=e.z+VS,l=i*t,c=e.x-i/2+l/2;return[xn(`trial-monster-${n.monsterId}-health-track`,at.healthBarTrack,{position:{x:e.x,y:a,z:o},scale:{x:i,y:r,z:1},renderOrder:6,replication:"localCosmetic",opacity:.85}),xn(`trial-monster-${n.monsterId}-health-fill`,at.healthBarFill,{position:{x:c,y:a,z:o+.01},scale:{x:l,y:s,z:1},renderOrder:7,replication:"localCosmetic",tintHex:IM(t),opacity:.95})]}function AM(n,e,t){return!(n.fireBurnStacks??[]).some(r=>(r.activationDelaySec??0)<=0&&r.visualRemainingSec>0)||n.hp<=0?[]:[xn(`trial-monster-${n.monsterId}-fire-burn`,at.fireBurn,{position:{x:e.x,y:e.y+XS,z:e.z+.12},scale:{x:xd,y:xd,z:1},renderOrder:YS,replication:"localCosmetic",animationTimeSec:t})]}function wM(n,e){if(n.schoolId!=="earth"||n.activationDelaySec>0||n.remainingSec<=0)return[];const t=e.get(n.targetMonsterId),i=Math.max(0,n.durationSec-n.remainingSec);return[xn(`trial-${n.vfxId}`,at.earthImpact,{position:{x:(t==null?void 0:t.x)??n.hitWorldPosition.x,y:n.hitWorldPosition.y+KS,z:n.hitWorldPosition.z+.16},scale:{x:vd,y:vd,z:1},renderOrder:qS,replication:"localCosmetic",animationTimeSec:i})]}function RM(n){const e=n.hitShakeRemainingSec??0,t=n.hitShakeDurationSec??0;if(e<=0||t<=0)return{x:0,y:0};const i=1-Math.max(0,Math.min(1,e/t)),r=1-i;return{x:Math.sin(i*Math.PI*8)*$S*r,y:Math.sin(i*Math.PI*5)*jS*r}}function IM(n){const e=Math.max(0,Math.min(1,n));return e>.5?"#27ae60":e>=.25?"#f2c94c":"#eb5757"}function CM(n){if(n.maxHp<=0)return 0;const e=n.healthBarHp??n.hp;return Math.max(0,Math.min(1,e/n.maxHp))}function PM(n,e,t){const i=wd(n),r=wd(e),s=Math.max(0,Math.min(1,t));return LM({r:Math.round(i.r+(r.r-i.r)*s),g:Math.round(i.g+(r.g-i.g)*s),b:Math.round(i.b+(r.b-i.b)*s)})}function wd(n){const e=n.replace("#","");return{r:Number.parseInt(e.slice(0,2),16),g:Number.parseInt(e.slice(2,4),16),b:Number.parseInt(e.slice(4,6),16)}}function LM(n){return`#${sl(n.r)}${sl(n.g)}${sl(n.b)}`}function sl(n){return Math.max(0,Math.min(255,n)).toString(16).padStart(2,"0")}function DM(n){return n==="miniBoss"?WS:GS}function FM(n){return n==="miniBoss"?md*Nu:md}function NM(n){return n==="miniBoss"?gd*Nu:gd}function UM(n){return n==="miniBoss"?_d*Nu:_d}function OM(n){return n==="miniBoss"?at.miniBoss:at.monsterPlaceholder}function BM(n){var s;const e=n.trial.lanes[0],t=((s=n.trial.waveManifest.find(a=>a.kind==="kobold"))==null?void 0:s.maxHp)??Math.max(1,n.trial.baseDamage),i=Math.max(1,Math.floor(t*QS)),r=Array.from({length:JS},(a,o)=>({monsterId:`tutorial-kobold-${o}`,kind:"kobold",laneId:(e==null?void 0:e.laneId)??0,hp:i,maxHp:t,x:eM[o]??2+o*.8,spawnTimeMs:0,walkSpeed:0,scoreValue:0,visualYOffset:Am(o),modelVariant:Du(n.seed,`tutorial-kobold-${o}`),healthBarHp:i}));return{elapsedMs:0,nextSpawnIndex:n.trial.waveManifest.length,monsters:r,projectiles:[],pendingAttacks:[],defeatedMonsterIds:[],totalMonsters:r.length,result:"playing",nextProjectileIndex:0,nextAttackIndex:0,nextBurnIndex:0,nextImpactVfxIndex:0}}function kM(n){return n==="GAME_OVER"?"gameOver":"play"}function HM(n){return n==="WIN"?"Level Clear":n==="LOSE"?"Life Lost":null}function xn(n,e,t){return{objectId:n,templateId:e,backdropTextureId:t.backdropTextureId,transform:{position:t.position,rotation:{x:0,y:0,z:0,w:1},scale:t.scale},visible:!0,lifetime:"persistent",replication:t.replication??"sharedGameplay",renderLayer:"heroStage",renderOrder:t.renderOrder,materialDepthTest:t.materialDepthTest,tintHex:t.tintHex,opacity:t.opacity,animationId:t.animationId,animationTimeSec:t.animationTimeSec,animationPaused:t.animationPaused,nodeVisibility:t.nodeVisibility}}function zM(n,e){const t=e.modelVariant??Du(n,e.monsterId);return{visibleNodeNames:[t.headNodeName,t.clubNodeName],hiddenNodeNames:[...mc.filter(i=>i!==t.headNodeName),...gc.filter(i=>i!==t.clubNodeName)]}}function Ja(n,e,t){return{...n,x:n.x+e,y:n.y+t}}function al(n,e){return Ja(n,0,e)}function Qa(n){return Math.max(0,Math.min(1,n))}function eo(n){const e=Qa(n);return 1-Math.pow(1-e,3)}function ha(n,e){const t=n.col/(ye-1),i=n.row/(ye-1);return{x:-4.6+t*9.2,y:1.6-i*2.7,z:e}}const VM=Z.cellSize*.35;function Dm(n,e){const t=Math.min(e.width/Ze,e.height/bn),i=Ze*t,r=bn*t,s=e.left+(e.width-i)/2,a=e.top+(e.height-r)/2;return{x:(n.clientX-s)/t,y:(n.clientY-a)/t}}function GM(n){const t=new URLSearchParams(n).get("seed");if(t==null||t.trim()==="")return;const i=Number(t);if(!Number.isFinite(i))return;const r=Math.trunc(i)>>>0;return r===0?void 0:r}function WM(n){var i;const t=(i=new URLSearchParams(n).get("levelType"))==null?void 0:i.toUpperCase();return t==="TRIAL"||t==="JOURNEY"?t:void 0}function XM(n){const t=new URLSearchParams(n).get("level");if(t==null||t.trim()==="")return;const i=Number(t);if(!Number.isFinite(i))return;const r=Math.trunc(i);return r>=1?r:void 0}class YM{constructor(e){ne(this,"commands",[]);ne(this,"dragStartCell",null);ne(this,"dragStartPoint",null);ne(this,"activePointerId",null);ne(this,"dragConsumed",!1);ne(this,"onPointerDown",e=>{var i,r;const t=this.eventToLogicalPoint(e);this.commands.push({type:"dragStart",x:t.x,y:t.y}),this.dragStartPoint=t,this.dragStartCell=cc(t),this.activePointerId=e.pointerId,this.dragConsumed=!1,(r=(i=this.stageElement).setPointerCapture)==null||r.call(i,e.pointerId)});ne(this,"onPointerMove",e=>{if(this.activePointerId!==e.pointerId||this.dragConsumed)return;const t=this.getThresholdSwap(this.eventToLogicalPoint(e));t!=null&&(e.preventDefault(),this.commands.push({type:"swap",from:t.from,to:t.to}),this.dragConsumed=!0)});ne(this,"onPointerUp",e=>{if(this.activePointerId!==e.pointerId)return;const t=this.eventToLogicalPoint(e);this.commands.push({type:"dragEnd",x:t.x,y:t.y});const i=KM(this.dragStartPoint,t),r=cc(t);if(!this.dragConsumed){const s=this.getThresholdSwap(t);s!=null&&(this.commands.push({type:"swap",from:s.from,to:s.to}),this.dragConsumed=!0)}if(i&&!this.dragConsumed&&this.commands.push({type:"tap",x:t.x,y:t.y}),this.dragStartCell!=null&&r!=null&&!i&&!this.dragConsumed){const s=r.col-this.dragStartCell.col,a=r.row-this.dragStartCell.row;Math.abs(s)+Math.abs(a)===1&&this.commands.push({type:"swap",from:this.dragStartCell,to:r})}this.finishPointer(e.pointerId)});ne(this,"onPointerCancel",e=>{this.activePointerId===e.pointerId&&this.finishPointer(e.pointerId)});this.stageElement=e,this.stageElement.addEventListener("pointerdown",this.onPointerDown),this.stageElement.addEventListener("pointermove",this.onPointerMove),this.stageElement.addEventListener("pointerup",this.onPointerUp),this.stageElement.addEventListener("pointercancel",this.onPointerCancel)}drainCommands(){const e=this.commands;return this.commands=[],e}dispose(){this.stageElement.removeEventListener("pointerdown",this.onPointerDown),this.stageElement.removeEventListener("pointermove",this.onPointerMove),this.stageElement.removeEventListener("pointerup",this.onPointerUp),this.stageElement.removeEventListener("pointercancel",this.onPointerCancel)}eventToLogicalPoint(e){return Dm(e,this.stageElement.getBoundingClientRect())}getThresholdSwap(e){if(this.dragStartCell==null||this.dragStartPoint==null)return null;const t=e.x-this.dragStartPoint.x,i=e.y-this.dragStartPoint.y,r=Math.abs(t),s=Math.abs(i);if(Math.max(r,s)<VM)return null;const a=r>=s?{col:this.dragStartCell.col+Math.sign(t),row:this.dragStartCell.row}:{col:this.dragStartCell.col,row:this.dragStartCell.row+Math.sign(i)};return qM(a)?{from:this.dragStartCell,to:a}:null}finishPointer(e){var t,i;(i=(t=this.stageElement).releasePointerCapture)==null||i.call(t,e),this.dragStartCell=null,this.dragStartPoint=null,this.activePointerId=null,this.dragConsumed=!1}}function KM(n,e){return n==null?!0:Math.hypot(e.x-n.x,e.y-n.y)<16}function qM(n){return n.col>=0&&n.row>=0&&n.col<ye&&n.row<ye}function $M(n){return n("(hover: none) and (pointer: coarse)").matches}function jM(n){return n.isMobileFullscreenTarget&&!n.requestAttempted&&n.fullscreenElement==null&&n.canRequestFullscreen}const ol="/assets/audio",Fm="Assets/Audio";function Nm(n){return`${ol.endsWith("/")?ol:`${ol}/`}${encodeURIComponent(n)}`}const Uu={[R.sounds.tileMatch]:An(R.sounds.tileMatch,"tile-match","match","global",.52,st("triangle",420,90),"Primary first-cascade tile match click/pop."),[R.sounds.uiClick]:Dt(R.sounds.uiClick,"Click.ogg","ui","global",.52,st("triangle",660,45),"HUD and overlay button click; Click.ogg in public/assets/audio."),[R.sounds.levelStart]:Dt(R.sounds.levelStart,"Start.ogg","level","global",.35,st("triangle",520,120),"Level intro as tiles drop in; Start.ogg in public/assets/audio."),[R.sounds.mergeMatch]:Dt(R.sounds.mergeMatch,"Merge.ogg","match","global",.52,st("triangle",420,90),"Successful match merge; Merge.ogg in public/assets/audio."),[R.sounds.matchCoin]:Dt(R.sounds.matchCoin,"Coin.ogg","match","global",.5,st("triangle",880,70),"Score coin on match resolve with merge; Coin.ogg in public/assets/audio."),[R.sounds.boardMove]:Dt(R.sounds.boardMove,"Move.wav","match","global",.48,st("triangle",380,85),"Tile swap committed; Move.wav in public/assets/audio."),[R.sounds.boardMoveBack]:Dt(R.sounds.boardMoveBack,"MoveBack.wav","match","global",.46,st("triangle",320,90),"Invalid swap bounce-back; MoveBack.wav in public/assets/audio."),[R.sounds.levelUp]:Dt(R.sounds.levelUp,"LevelUp.wav","level","global",.58,st("triangle",720,200),"After clearing a level; LevelUp.wav in public/assets/audio."),[R.sounds.enemyWalkLoop]:Dt(R.sounds.enemyWalkLoop,"Walking.ogg","enemy","templateLocal",.34,st("triangle",260,90),"Trial enemy walk loop; Walking.ogg in public/assets/audio."),[R.sounds.comboPitchStep]:An(R.sounds.comboPitchStep,"combo-pitch-step","match","global",.48,st("triangle",560,85),"Cascade ladder step; browser playbackRate is used for rising pitch."),[R.sounds.fireWhoosh]:Dt(R.sounds.fireWhoosh,"Attack_Fire.ogg","spell","templateLocal",.42,st("sawtooth",330,120),"Fire spell launch; Attack_Fire.ogg in public/assets/audio."),[R.sounds.iceWhoosh]:Dt(R.sounds.iceWhoosh,"Attack_Freeze.ogg","spell","templateLocal",.38,st("sine",620,120),"Ice spell launch; Attack_Freeze.ogg in public/assets/audio."),[R.sounds.lightningWhoosh]:Dt(R.sounds.lightningWhoosh,"Attack_Lightning.ogg","spell","templateLocal",.38,st("square",740,75),"Lightning spell launch; Attack_Lightning.ogg in public/assets/audio."),[R.sounds.earthWhoosh]:Dt(R.sounds.earthWhoosh,"Attack_Earth.ogg","spell","templateLocal",.42,st("triangle",230,130),"Earth spell launch; Attack_Earth.ogg in public/assets/audio."),[R.sounds.fireImpact]:An(R.sounds.fireImpact,"spell-fire-impact","spell","templateLocal",.48,st("noise",260,110),"Fire spell impact burst at monster target."),[R.sounds.iceImpact]:An(R.sounds.iceImpact,"spell-ice-impact","spell","templateLocal",.44,st("sine",820,110),"Ice spell impact chime at monster target."),[R.sounds.lightningImpact]:An(R.sounds.lightningImpact,"spell-lightning-impact","spell","templateLocal",.46,st("square",980,80),"Lightning spell impact crack at monster target."),[R.sounds.earthImpact]:An(R.sounds.earthImpact,"spell-earth-impact","spell","templateLocal",.48,st("triangle",180,125),"Earth spell impact stomp at monster target."),[R.sounds.pathConvert]:An(R.sounds.pathConvert,"path-convert","match","global",.5,st("sine",520,160),"Journey LAND-to-path conversion shimmer."),[R.sounds.mageWalk]:An(R.sounds.mageWalk,"mage-walk","level","templateLocal",.34,st("triangle",260,90),"Mage one-step movement tick, local to mage template in MHS."),[R.sounds.monsterDamage]:Dt(R.sounds.monsterDamage,"Hit_Enemy.wav","enemy","templateLocal",.88,st("noise",180,95),"Monster hit; Hit_Enemy.wav in public/assets/audio."),[R.sounds.monsterDefeat]:Dt(R.sounds.monsterDefeat,"Die_Enemy.ogg","enemy","templateLocal",.54,st("noise",140,170),"Monster defeat; Die_Enemy.ogg in public/assets/audio."),[R.sounds.playerDamage]:Dt(R.sounds.playerDamage,"Hit_Player.wav","level","global",.46,st("noise",200,90),"Trial mage struck; Hit_Player.wav in public/assets/audio."),[R.sounds.playerDefeat]:Dt(R.sounds.playerDefeat,"Die_Player.ogg","level","global",.56,st("noise",160,220),"Trial mage defeated; Die_Player.ogg in public/assets/audio."),[R.sounds.powerupCreate]:An(R.sounds.powerupCreate,"powerup-create","match","global",.54,st("sawtooth",680,150),"Power-up creation sparkle."),[R.sounds.powerupBombActivate]:Dt(R.sounds.powerupBombActivate,"Activarion_Bomb.ogg","match","global",.52,st("sawtooth",180,200),"TNT tap or swap activation; Activarion_Bomb.ogg in public/assets/audio."),[R.sounds.powerupRocketActivate]:Dt(R.sounds.powerupRocketActivate,"Activation_Star.ogg","match","global",.52,st("triangle",880,140),"Rocket row/column tap or swap activation; Activation_Star.ogg in public/assets/audio."),[R.sounds.victorySting]:An(R.sounds.victorySting,"victory-sting","level","global",.62,st("triangle",720,260),"Level clear success sting."),[R.sounds.cageYankWhoosh]:An(R.sounds.cageYankWhoosh,"cage-yank-whoosh","level","global",.48,st("sawtooth",260,220),"Unseen abductor cage-yank whoosh during victory staging."),[R.sounds.runEnd]:Dt(R.sounds.runEnd,"Game_Over.wav","run","global",.58,st("sine",220,360),"Game Over sting; Game_Over.wav in public/assets/audio."),[R.sounds.musicBackground]:Dt(R.sounds.musicBackground,"Background.ogg","level","global",.22,st("sine",196,2e3),"Quiet looping session BGM; Background.ogg in public/assets/audio.")};function MD(n){return Uu[n]}function ZM(){return Object.values(Uu)}const JM=[R.sounds.uiClick,R.sounds.levelStart,R.sounds.mergeMatch,R.sounds.matchCoin,R.sounds.boardMove,R.sounds.boardMoveBack,R.sounds.levelUp,R.sounds.enemyWalkLoop,R.sounds.fireWhoosh,R.sounds.iceWhoosh,R.sounds.lightningWhoosh,R.sounds.earthWhoosh,R.sounds.monsterDamage,R.sounds.monsterDefeat,R.sounds.playerDamage,R.sounds.playerDefeat,R.sounds.powerupBombActivate,R.sounds.powerupRocketActivate,R.sounds.runEnd,R.sounds.musicBackground];function QM(){const n=new Set(JM);return ZM().filter(e=>n.has(e.id))}function Dt(n,e,t,i,r,s,a){return{id:n,browserUrl:Nm(e),futureMhsPath:`${Fm}/${e}`,defaultVolume:r,category:t,scope:i,fallback:s,notes:a}}function An(n,e,t,i,r,s,a){return{id:n,browserUrl:Nm(`${e}.mp3`),futureMhsPath:`${Fm}/${e}.mp3`,defaultVolume:r,category:t,scope:i,fallback:s,notes:a}}function st(n,e,t){return{waveform:n,frequencyHz:e,durationMs:t,attackMs:6,releaseMs:28}}const Bn="Runtime 256x256 transparent PNG, centered subject, 24-36px padding, readable at 100x100.",ll="Runtime 2160x1000 PNG/WebP legacy source art; cover-cropped for the 864x700 hero stage.",zi="Hero-stage cover backdrop. Drawn as a Three.js texture plane that fills the orthographic 864x700 stage and crops overflow.",ey="Transparent PNG source parts now; later exported as a 2048x2048 atlas plus skeletal JSON.",ty="Temporary browser hero-stage FBX model. Auto-normalized in Three.js to bottom-center pivot and 1.45 world-unit height. Loops animation frames 0-60.",ny="Temporary browser hero-stage texture recovered from the FBX .fbm export folder and applied to the mage mesh when the FBX material does not load a map.",iy="Temporary browser hero-stage FBX kobold enemy model. Auto-normalized in Three.js and uses embedded walk/defeat clips.",ry="Temporary browser hero-stage texture recovered from the kobold FBX .fbm export folder and applied to kobold meshes when the FBX material does not load a map.",sy="Temporary browser hero-stage FBX mini-boss model. Auto-normalized in Three.js and uses embedded walk/defeat clips.",ay="Temporary browser hero-stage texture recovered from the boss FBX .fbm export folder and applied to boss meshes when the FBX material does not load a map.",oy="Runtime 1080x150 source PNG for the fixed middle HUD band; drawn full-width behind HUD text.",ly="Runtime 1080x1080 source PNG for the board base; drawn behind board cells with flat-color fallback.",cy="Runtime ~950x156 PNG title ribbon; scaled to 60% logical width, centered near top for level label.",Rd="Runtime ~254x233 transparent PNG; HUD lives strip uses scaled instances.",uy="Runtime PNG frame for trial monster progress bar; scaled to heart row height.",hy="Runtime PNG fill art; drawn clipped right-to-left inside the frame inner track.",dy="Runtime ~447x429 transparent PNG; badge on bottom-right of trial enemy fill bar.",Id="Wide horizontal CTA; title Play / game-over Try Again. Transparent PNG with gold frame.",fy="Runtime transparent PNG pointer hand used as the floating tutorial drag hint.",py="Runtime 512x256 transparent PNG spritesheet. Two rows by four columns, eight 128x128 frames, played at 30 FPS for TNT detonations.",my="Runtime transparent PNG spritesheet. Two rows by four columns, eight 128x128 frames, bottom-center origin, played at 30 FPS for rocket blast waves.",gy="Runtime transparent static PNG, color-tinted for match energy streams flying from the board to the mage staff.",_y="Runtime transparent PNG strip, tiled and color-tinted for Lightball collection links.",Um={[R.tiles.fire]:mt(R.tiles.fire,"/assets/tiles/tile-fire.png","Assets/Textures/Tiles/tile-fire.png","prompt.tiles.standard",Bn),[R.tiles.ice]:mt(R.tiles.ice,"/assets/tiles/tile-ice.png","Assets/Textures/Tiles/tile-ice.png","prompt.tiles.standard",Bn),[R.tiles.lightning]:mt(R.tiles.lightning,"/assets/tiles/tile-lightning.png","Assets/Textures/Tiles/tile-lightning.png","prompt.tiles.standard",Bn),[R.tiles.earth]:mt(R.tiles.earth,"/assets/tiles/tile-earth.png","Assets/Textures/Tiles/tile-earth.png","prompt.tiles.standard",Bn),[R.tiles.land]:mt(R.tiles.land,"/assets/tiles/tile-land.png","Assets/Textures/Tiles/tile-land.png","prompt.tiles.journey",Bn),[R.tiles.path]:mt(R.tiles.path,"/assets/tiles/tile-path.png","Assets/Textures/Tiles/tile-path.png","prompt.tiles.journey",Bn),[R.tiles.empty]:mt(R.tiles.empty,"/assets/tiles/empty.png","Assets/Textures/Tiles/empty.png","prompt.tiles.standard","Runtime empty-cell marker for non-playable Trial void spaces. Drawn as board art only; not matchable or refillable."),[R.powerUps.rocketH]:mt(R.powerUps.rocketH,"/assets/powerups/power-rocket-h.png","Assets/Textures/PowerUps/power-rocket-h.png","prompt.powerups.standard",Bn),[R.powerUps.rocketV]:mt(R.powerUps.rocketV,"/assets/powerups/power-rocket-v.png","Assets/Textures/PowerUps/power-rocket-v.png","prompt.powerups.standard",Bn),[R.powerUps.tnt]:mt(R.powerUps.tnt,"/assets/powerups/power-tnt.png","Assets/Textures/PowerUps/power-tnt.png","prompt.powerups.standard",Bn),[R.powerUps.lightball]:mt(R.powerUps.lightball,"/assets/powerups/power-lightball.png","Assets/Textures/PowerUps/power-lightball.png","prompt.powerups.standard",Bn),[R.powerUps.lightballStream]:mt(R.powerUps.lightballStream,"/assets/powerups/lightning.png","Assets/Textures/PowerUps/lightning.png","prompt.powerups.standard",_y,"256x85"),[R.powerUps.orb]:mt(R.powerUps.orb,"/assets/powerups/orb.png","Assets/Textures/PowerUps/orb.png","prompt.powerups.standard",gy),[R.backdrops.forest]:mt(R.backdrops.forest,"/assets/backdrops/backdrop-forest.png","Assets/Textures/Backdrops/backdrop-forest.png","prompt.backdrops.hero",ll,"2160x1000"),[R.backdrops.crypt]:mt(R.backdrops.crypt,"/assets/backdrops/backdrop-crypt.png","Assets/Textures/Backdrops/backdrop-crypt.png","prompt.backdrops.hero",ll,"2160x1000"),[R.backdrops.crystalCave]:mt(R.backdrops.crystalCave,"/assets/backdrops/backdrop-crystal-cave.png","Assets/Textures/Backdrops/backdrop-crystal-cave.png","prompt.backdrops.hero",ll,"2160x1000"),[R.backdrops.castle]:mt(R.backdrops.castle,"/assets/backdrops/bg1.png","Assets/Textures/Backdrops/bg1.png","prompt.backdrops.hero",zi,"cover 864x700 hero stage"),[R.backdrops.bg2]:mt(R.backdrops.bg2,"/assets/backdrops/bg2.png","Assets/Textures/Backdrops/bg2.png","prompt.backdrops.hero",zi,"cover 864x700 hero stage"),[R.backdrops.bg3]:mt(R.backdrops.bg3,"/assets/backdrops/bg3.png","Assets/Textures/Backdrops/bg3.png","prompt.backdrops.hero",zi,"cover 864x700 hero stage"),[R.backdrops.bg4]:mt(R.backdrops.bg4,"/assets/backdrops/bg4.png","Assets/Textures/Backdrops/bg4.png","prompt.backdrops.hero",zi,"cover 864x700 hero stage"),[R.backdrops.bg5]:mt(R.backdrops.bg5,"/assets/backdrops/bg5.png","Assets/Textures/Backdrops/bg5.png","prompt.backdrops.hero",zi,"cover 864x700 hero stage"),[R.backdrops.bg6]:mt(R.backdrops.bg6,"/assets/backdrops/bg6.png","Assets/Textures/Backdrops/bg6.png","prompt.backdrops.hero",zi,"cover 864x700 hero stage"),[R.backdrops.bg7]:mt(R.backdrops.bg7,"/assets/backdrops/bg7.png","Assets/Textures/Backdrops/bg7.png","prompt.backdrops.hero",zi,"cover 864x700 hero stage"),[R.rigs.mage]:hs(R.rigs.mage,"/assets/rigs/knight2.fbx","Assets/Rigs/Mage/knight2.fbx","prompt.rig.mage","fbx","temporary FBX stand-in, auto-normalized to 1.45 world units",ty),[R.materials.mageTexture]:cl(R.materials.mageTexture,"/assets/rigs/knight2.fbm/knight_texture_final.png","Assets/Textures/Rigs/Mage/knight_texture_final.png","prompt.rig.mage",ny),[R.spritesheets.tntExplosion]:mt(R.spritesheets.tntExplosion,"/assets/spritesheets/explosion-sprite.png","Assets/Textures/Spritesheets/explosion-sprite.png","prompt.powerups.standard",py,"512x256, 8 frames at 128x128"),[R.spritesheets.rocketCloud]:mt(R.spritesheets.rocketCloud,"/assets/spritesheets/rocketCloud.png","Assets/Textures/Spritesheets/rocketCloud.png","prompt.powerups.standard",my,"512x256, 8 frames at 128x128"),[R.spritesheets.fireBurn]:mt(R.spritesheets.fireBurn,"/assets/spritesheets/fire-sheet.png","Assets/Textures/Spritesheets/fire-sheet.png","prompt.powerups.standard","Looping fire burn sprite for Trial monster feet, sampled as a normalized 4x2 grid.","1774x887, 8 frames in a 4x2 grid"),[R.spritesheets.earthImpact]:mt(R.spritesheets.earthImpact,"/assets/spritesheets/rock-sheet.png","Assets/Textures/Spritesheets/rock-sheet.png","prompt.powerups.standard","One-shot earth impact sprite for Trial monster hit positions, sampled as a normalized 2x2 grid.","1254x1254, 4 frames in a 2x2 grid"),[R.rigs.prince]:hs(R.rigs.prince,"/assets/rigs/prince/prince-parts-source.png","Assets/Rigs/Prince/prince-rig.json","prompt.rig.prince"),[R.rigs.kobold]:hs(R.rigs.kobold,"/assets/rigs/kobold.fbx","Assets/Rigs/Kobold/kobold.fbx","prompt.rig.kobolds","fbx","temporary FBX stand-in, auto-normalized to 1.16 world units",iy),[R.materials.koboldTexture]:cl(R.materials.koboldTexture,"/assets/rigs/kobold.fbm/kobold_texture.png","Assets/Textures/Rigs/Kobold/kobold_texture.png","prompt.rig.kobolds",ry),[R.rigs.boss]:hs(R.rigs.boss,"/assets/rigs/boss.fbx","Assets/Rigs/Boss/boss.fbx","prompt.rig.kobolds","fbx","temporary FBX stand-in, auto-normalized to 1.16 world units",sy),[R.materials.bossTexture]:cl(R.materials.bossTexture,"/assets/rigs/boss.fbm/kobold_boss_texture.png","Assets/Textures/Rigs/Boss/kobold_boss_texture.png","prompt.rig.kobolds",ay),[R.rigs.tallKobold]:hs(R.rigs.tallKobold,"/assets/rigs/tall-kobold/tall-kobold-parts-source.png","Assets/Rigs/TallKobold/tall-kobold-rig.json","prompt.rig.kobolds"),[R.props.princeCage]:mr(R.props.princeCage,"/assets/props/prop-prince-cage.png","Assets/Textures/Props/prop-prince-cage.png","prompt.rig.prince","Cage frame source until rig export is available."),[R.props.goalFlag]:mr(R.props.goalFlag,"/assets/props/prop-goal-flag.png","Assets/Textures/Props/prop-goal-flag.png","prompt.tiles.journey","Goal marker prop for Journey staging."),[R.props.abductorGlove]:mr(R.props.abductorGlove,"/assets/props/prop-abductor-glove.png","Assets/Textures/Props/prop-abductor-glove.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[R.props.abductorHook]:mr(R.props.abductorHook,"/assets/props/prop-abductor-hook.png","Assets/Textures/Props/prop-abductor-hook.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[R.props.abductorHand]:mr(R.props.abductorHand,"/assets/props/prop-abductor-hand.png","Assets/Textures/Props/prop-abductor-hand.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[R.props.abductorRope]:mr(R.props.abductorRope,"/assets/props/prop-abductor-rope.png","Assets/Textures/Props/prop-abductor-rope.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[R.ui.hudBanner]:wn(R.ui.hudBanner,"/assets/ui/ui-banner.png","Assets/Textures/UI/ui-banner.png",oy,"1080x150"),[R.ui.boardBackground]:wn(R.ui.boardBackground,"/assets/ui/board-background.png","Assets/Textures/UI/board-background.png",ly,"1080x1080"),[R.ui.levelTitlePanel]:wn(R.ui.levelTitlePanel,"/assets/ui/ui%20title.png","Assets/Textures/UI/ui-title.png",cy,"950x156"),[R.ui.heartFill]:wn(R.ui.heartFill,"/assets/ui/heart-fill.png","Assets/Textures/UI/heart-fill.png",Rd,"254x233"),[R.ui.heartEmpty]:wn(R.ui.heartEmpty,"/assets/ui/heart-empty.png","Assets/Textures/UI/heart-empty.png",Rd,"254x233"),[R.ui.trialFillBarBg]:wn(R.ui.trialFillBarBg,"/assets/ui/ui-fillbar-bg.png","Assets/Textures/UI/ui-fillbar-bg.png",uy,"2155x563"),[R.ui.trialFillBarFill]:wn(R.ui.trialFillBarFill,"/assets/ui/ui-fillbar-fill.png","Assets/Textures/UI/ui-fillbar-fill.png",hy,"1952x359"),[R.ui.trialFillBarKoboldIcon]:wn(R.ui.trialFillBarKoboldIcon,"/assets/ui/ui-icon-kobold.png","Assets/Textures/UI/ui-icon-kobold.png",dy,"447x429"),[R.ui.primaryButton]:wn(R.ui.primaryButton,"/assets/ui/ui-button.png","Assets/Textures/UI/ui-button.png",Id,"~1920x384"),[R.ui.primaryButtonPressed]:wn(R.ui.primaryButtonPressed,"/assets/ui/ui-button-pressed.png","Assets/Textures/UI/ui-button-pressed.png",Id,"~1920x384"),[R.ui.tutorialFinger]:wn(R.ui.tutorialFinger,"/assets/ui/finger.png","Assets/Textures/UI/finger.png",fy,"256x256"),...Object.fromEntries(Object.values(Uu).map(n=>[n.id,vy(n)]))};function bi(n){return Um[n]}function xy(){return Object.values(Um).filter(n=>n.kind==="texture"||n.kind==="ui")}function mt(n,e,t,i,r,s="256x256"){return{id:n,kind:"texture",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:s,unitScale:1,pivot:"center",collision:"none",artPromptId:i,notes:r}}function mr(n,e,t,i,r){return{id:n,kind:"texture",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:"max 1024px longest side",unitScale:1,pivot:"center",collision:"none",artPromptId:i,notes:r}}function hs(n,e,t,i,r="png",s="source parts max 1024px, final atlas 2048x2048",a=ey){return{id:n,kind:"rig",browserUrl:e,futureMhsPath:t,sourceFormat:r,runtimeSize:s,unitScale:1,forwardAxis:"+Z",upAxis:"+Y",pivot:"bottomCenter",collision:"capsule",artPromptId:i,notes:a}}function wn(n,e,t,i,r){return{id:n,kind:"ui",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:r,unitScale:1,pivot:"center",collision:"none",notes:i}}function cl(n,e,t,i,r){return{id:n,kind:"material",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:"runtime FBX diffuse texture",unitScale:1,pivot:"center",collision:"none",artPromptId:i,notes:r}}function vy(n){return{id:n.id,kind:"audio",browserUrl:n.browserUrl,futureMhsPath:n.futureMhsPath,sourceFormat:"mp3",runtimeSize:"browser WAV/MP3 asset; no generated fallback in BrowserAudioAdapter",unitScale:1,pivot:"center",collision:"none",notes:`${n.notes} MHS mapping: ${n.scope==="global"?"global SoundComponent":"template-local SoundComponent"}.`}}const Sy="./";function si(n,e=Sy,t=My()){if(by(n))return n;const i=n.replace(/^\/+/,"");return Ty(e)?t!=null?new URL(i,Ey(t)).toString():`./${i}`:`${yy(e)}${i}`}function My(){return typeof document>"u"?void 0:document.baseURI}function yy(n){return n.trim()===""?"/":n.endsWith("/")?n:`${n}/`}function Ty(n){const e=n.trim();return e===""||e==="./"||e==="."}function Ey(n){try{return new URL(".",n).toString()}catch{return n.endsWith("/")?n:`${n}/`}}function by(n){return/^[a-z][a-z\d+\-.]*:/i.test(n)||n.startsWith("//")}async function Ay(n=xy()){const e=await Promise.all(n.map(wy));return Object.fromEntries(e.filter(t=>t!=null))}function wy(n){return new Promise(e=>{const t=new Image;t.onload=()=>e([n.id,t]),t.onerror=()=>e(null),t.src=si(n.browserUrl)})}const Cd="magus-match.leaderboard.v1";class Ry{constructor(e=window.localStorage){this.storage=e}load(){return CS(this.storage.getItem(Cd))}save(e){this.storage.setItem(Cd,PS(e))}}const Iy=12,Pd=260,Cy=24,Py=62,Ly=12,Dy=2.25,Om=5,Fy=120,Ny=180,Uy=70,Oy=14,By=1,Bm=.045,ky=1+(Om-1)*Bm,Ld=2,Dd=220,Hy=86,zy=7,Vy=1,da=128,Fd=4,km=8,Gy=30,Hm=1e3/Gy,Wy=km*Hm,fa=405,pa=128,Nd=4,Xy=8,Yy=30,Ky=1e3/Yy,Ud=Z.cellSize*.6,Od=192,Bd=64,qy=.55;class $y{constructor(){ne(this,"activeAnimation",null);ne(this,"lastRevisionId",null)}present(e,t,i={}){const r=e.animationTrace??null;if(r!=null&&r.revisionId!==this.lastRevisionId){const a=this.activeAnimation==null||!jy(r)?null:this.sampleActiveAnimation(e,t,i);this.activeAnimation={trace:r,startSec:t,retargetStarts:a==null?new Map:AT(a)},this.lastRevisionId=r.revisionId}if(this.activeAnimation==null)return e;const s=this.sampleActiveAnimation(e,t,i);return this.isAnimationComplete(t)?(this.activeAnimation=null,e):s}sampleActiveAnimation(e,t,i){var _;if(this.activeAnimation==null)return e;const r=Math.max(0,(t-this.activeAnimation.startSec)*1e3),s=this.activeAnimation.trace,a=No(s),o=Zy(s,a,r,this.activeAnimation.retargetStarts),l=rT(s,a,r),c=Jy(s,a,r,i.matchEnergyTarget),u=sT(s,a,r),h=lT(s,a,r),d=aT(s,a,r),f=oT(s,a,r),p=Qy(((_=e.tutorialPresentation)==null?void 0:_.floatingMatch)??null,s,a,r,o,i.matchEnergyTarget);return{...e,tutorialPresentation:e.tutorialPresentation==null?void 0:{...e.tutorialPresentation,floatingMatch:p},boardCells:o,particles:l,matchEnergyStreams:c,burstRings:u,lightballStreams:h,tntExplosionSprites:d,rocketCloudSprites:f}}isAnimationComplete(e){if(this.activeAnimation==null)return!0;const t=Wp(this.activeAnimation.trace);return Math.max(0,(e-this.activeAnimation.startSec)*1e3)>=t}}function jy(n){return n.kind!=="levelIntro"}function Zy(n,e,t,i){if(n.kind==="invalidSwap")return vT(n,t,i);if(n.kind!=="levelIntro"&&(t<Qs||e.length===0))return Gm(n,t,i);const r=e.find(s=>t<s.endMs);return r==null?bT(n.finalSnapshot):t<r.fallStartMs?ST(r.step,t-r.popStartMs):yT(r.step,t-r.fallStartMs,r.endMs-r.fallStartMs,r.fallDelaysByTileId,i,n.kind==="levelIntro")}function Jy(n,e,t,i){return n.kind==="levelIntro"||n.kind==="invalidSwap"?[]:e.flatMap(r=>{const s=t-r.popStartMs;return s<0?[]:r.step.clearedTiles.flatMap(a=>Vm(a,s,i))})}function Qy(n,e,t,i,r,s){if(n==null||n.phase!=="resolving")return n;const a=tT(n);if(a==null)return n;const o=new Map(e.preSwapSnapshot.cells.map(h=>[jr(h.coord),h])),l=new Map(r.map(h=>[h.tileId,h])),c=eT(n,t,i),u=n.tiles.map(h=>{const d=o.get(jr(h.sourceCoord)),f=d==null?null:l.get(d.tileId);if(f==null)return c?{...h,alpha:0}:h;const p=Tn(f.coord),_=zm(f.renderX??p.renderX,f.renderY??p.renderY,a);return{...h,rect:{...h.rect,x:_.x,y:_.y},alpha:c?0:h.alpha*f.alpha,scale:h.scale*(f.scale??1)}});return{...n,tiles:u,matchEnergyStreams:iT(n,e,t,i,a,s)}}function eT(n,e,t){const i=new Set(n.tiles.map(r=>jr(r.sourceCoord)));return e.some(r=>r.step.clearedTiles.some(s=>i.has(jr(s.coord))&&t>=r.popStartMs+(s.clearDelayMs??0)))}function tT(n){if(n.tiles.length===0)return null;const e=Math.min(...n.tiles.map(a=>a.sourceCoord.col)),t=Math.min(...n.tiles.map(a=>a.sourceCoord.row)),i=n.tiles.find(a=>a.sourceCoord.col===e&&a.sourceCoord.row===t),r=n.tiles.find(a=>a.sourceCoord.col===e+1&&a.sourceCoord.row===t),s=n.tiles.find(a=>a.sourceCoord.col===e+1&&a.sourceCoord.row===t+1);return i==null||r==null||s==null?null:{boardBaseX:Z.x+e*Z.cellSize,boardBaseY:Z.y+t*Z.cellSize,floatingBaseX:i.rect.x,floatingBaseY:i.rect.y,floatingStepX:r.rect.x-i.rect.x,floatingStepY:s.rect.y-r.rect.y,floatingTileWidth:i.rect.width,floatingTileHeight:i.rect.height}}function zm(n,e,t){return{x:t.floatingBaseX+(n-t.boardBaseX)/Z.cellSize*t.floatingStepX,y:t.floatingBaseY+(e-t.boardBaseY)/Z.cellSize*t.floatingStepY}}function nT(n,e){const t=zm(Tn(n).renderX,Tn(n).renderY,e);return{x:t.x+e.floatingTileWidth/2,y:t.y+e.floatingTileHeight/2}}function iT(n,e,t,i,r,s){if(e.kind==="levelIntro"||e.kind==="invalidSwap")return[];const a=new Set(n.tiles.map(o=>jr(o.sourceCoord)));return t.flatMap(o=>{const l=i-o.popStartMs;return l<0?[]:o.step.clearedTiles.filter(c=>a.has(jr(c.coord))).flatMap(c=>Vm(c,l,s,nT(c.coord,r)))})}function rT(n,e,t){if(n.kind==="levelIntro")return[];const i=e.find(s=>t<s.fallStartMs);if(i==null)return[];const r=t-i.popStartMs;return r<0?[]:i.step.clearedTiles.flatMap(s=>hT(s,r))}function sT(n,e,t){if(n.kind==="levelIntro")return[];const i=e.find(s=>t<s.fallStartMs);if(i==null)return[];const r=t-i.popStartMs;return r<0?[]:i.step.clearedTiles.filter(s=>Ym(s.tileType)!=null).map(s=>dT(s,r)).filter(s=>s!=null)}function aT(n,e,t){if(n.kind==="levelIntro")return[];const i=e.find(s=>t<s.fallStartMs);if(i==null)return[];const r=t-i.popStartMs;return r<0?[]:i.step.clearedTiles.map(s=>fT(s,r)).filter(s=>s!=null)}function oT(n,e,t){if(n.kind==="levelIntro")return[];const i=e.find(s=>t<s.fallStartMs);if(i==null)return[];const r=t-i.popStartMs;return r<0?[]:i.step.clearedTiles.flatMap(s=>pT(s,r))}function lT(n,e,t){return n.kind==="levelIntro"||n.kind==="invalidSwap"?[]:e.flatMap(i=>{const r=t-i.popStartMs;return r<0?[]:cT(i.step,r)})}function cT(n,e){const t=n.clearedTiles.filter(i=>i.tileType==="LIGHTBALL");return t.length===0?[]:t.flatMap(i=>{const r=i.clearDelayMs??0;return n.clearedTiles.filter(s=>s.tileId!==i.tileId&&Ou(s.tileType)!=null&&(s.clearDelayMs??0)===r+Au).map(s=>uT(i,s,e-r)).filter(s=>s!=null)})}function uT(n,e,t){if(t<0||t>=Au)return null;const i=Ou(e.tileType);if(i==null)return null;const r=qr(n.coord),s=qr(e.coord),a=_T(r,s);if(a<=.001)return null;const o=rn(t/zp),l=a*o;return l<=.001?null:{streamId:`${n.tileId}-lightball-stream-${e.tileId}`,assetId:R.powerUps.lightballStream,startX:r.x,startY:r.y,length:l,thickness:Bd,angleDeg:xT(Math.atan2(s.y-r.y,s.x-r.x)),color:i,alpha:.96,textureOffsetX:t*qy%Od,tileWidth:Od,tileHeight:Bd,zIndex:19}}function Vm(n,e,t,i){const r=Ou(n.tileType);if(r==null)return[];const s=e-(n.clearDelayMs??0);if(s<0||s>fo)return[];const a=rn(s/fo),o=i??qr(n.coord),l=t??{x:Fy,y:Ny};return Array.from({length:Om},(c,u)=>{const h=rn(a*ky-u*Bm),d=IT(h),f=`${n.tileId}:energy:${u}`,p=qi(`${f}:side`)<.5?-1:1,_=Zt(18,Uy,qi(`${f}:arc`))*p,m=Zt(-14,14,qi(`${f}:x`))*Math.sin(h*Math.PI),g=Zt(-10,10,qi(`${f}:y`))*Math.sin(h*Math.PI*2),x=Zt(o.x,l.x,d)+_*Math.sin(h*Math.PI)+m,M=Zt(o.y,l.y,d)+g,y=Oy*(.82+qi(`${f}:size`)*.36),w=1-rn((h-.95)/.05),E=y*w;return{streamId:`${n.tileId}-energy-${u}`,assetId:R.powerUps.orb,x,y:M,radius:E,width:E*2*Ld,height:E*2*Ld,color:r,alpha:By,zIndex:23+u/100}}).filter(c=>c.alpha>0&&c.radius>0)}function hT(n,e){const t=Ym(n.tileType);if(t==null)return[];const i=e-(n.clearDelayMs??0);if(i<0||i>Pd)return[];const r=rn(i/Pd),s=Z.x+n.coord.col*Z.cellSize+Z.cellSize/2,a=Z.y+n.coord.row*Z.cellSize+Z.cellSize/2;return Array.from({length:Iy},(o,l)=>{const c=qi(`${n.tileId}:${l}:a`),u=qi(`${n.tileId}:${l}:b`),h=c*Math.PI*2,d=Zt(Cy,Py,u)*rs(r),f=Zt(Ly,Dy,r);return{particleId:`${n.tileId}-pop-${l}`,x:s+Math.cos(h)*d,y:a+Math.sin(h)*d,radius:f,color:t,alpha:1-r,zIndex:20}})}function dT(n,e){const t=e-(n.clearDelayMs??0);if(t<0||t>Dd)return null;const i=rn(t/Dd),r=rs(i);return{ringId:`${n.tileId}-burst-ring`,x:Z.x+n.coord.col*Z.cellSize+Z.cellSize/2,y:Z.y+n.coord.row*Z.cellSize+Z.cellSize/2,radius:Hy*r,lineWidth:Zt(zy,Vy,i),color:"rgba(255, 255, 255, 0.85)",alpha:.42*Math.pow(1-i,1.4),zIndex:15}}function fT(n,e){if(n.tileType!=="TNT")return null;const t=e-(n.clearDelayMs??0);if(t<0||t>=Wy)return null;const i=Math.min(km-1,Math.floor(t/Hm)),r=i%Fd,s=Math.floor(i/Fd),a=qr(n.coord);return{spriteId:`${n.tileId}-tnt-explosion`,assetId:R.spritesheets.tntExplosion,sourceX:r*da,sourceY:s*da,sourceWidth:da,sourceHeight:da,x:a.x-fa/2,y:a.y-fa/2,width:fa,height:fa,frameIndex:i,alpha:1,zIndex:28}}function pT(n,e){if(n.tileType!=="ROCKET_H"&&n.tileType!=="ROCKET_V")return[];const t=mT(n),i=n.tileType==="ROCKET_H",r=qr(n.coord),s=n.clearDelayMs??0;return t.flatMap(({directionSign:a,maxDistancePx:o})=>{const l=Math.max(1,Math.ceil(o/Ud)+1);return Array.from({length:l},(u,h)=>{const d=Math.min(o,h*Ud),f=s+d/Z.cellSize*bu,p=e-f;if(p<0||p>=Hp)return null;const _=Math.min(Xy-1,Math.floor(p/Ky)),m=_%Nd,g=Math.floor(_/Nd),x=r.x+(i?a*d:0),M=r.y+(i?0:a*d);return{spriteId:`${n.tileId}-rocket-cloud-${a}-${h}`,assetId:R.spritesheets.rocketCloud,sourceX:m*pa,sourceY:g*pa,sourceWidth:pa,sourceHeight:pa,x:x-ai/2,y:M-ai,width:ai,height:ai,originX:x,originY:M,angleDeg:gT(n.tileType,a),frameIndex:_,alpha:1,zIndex:27+h/100}}).filter(u=>u!=null)})}function mT(n){const e=qr(n.coord);return[-1,1].map(t=>{const i=n.tileType==="ROCKET_H"?t<0?e.x-Z.x:Z.x+Z.width-e.x:t<0?e.y-Z.y:Z.y+Z.height-e.y;return{directionSign:t,maxDistancePx:i+ai}})}function gT(n,e){return n==="ROCKET_V"?e>=0?0:180:e>=0?-90:90}function qr(n){return{x:Z.x+n.col*Z.cellSize+Z.cellSize/2,y:Z.y+n.row*Z.cellSize+Z.cellSize/2}}function _T(n,e){return Math.hypot(e.x-n.x,e.y-n.y)}function xT(n){return n*180/Math.PI}function Gm(n,e,t,i=Qs){const r=rn(e/i);return n.postSwapSnapshot.cells.map(s=>{const a=Tn(s.coord),o=t.get(s.tileId),l=n.preSwapSnapshot.cells.find(h=>h.tileId===s.tileId),c=o??(l==null?a:Tn(l.coord)),u=rs(r);return $r(s,{renderX:Zt(c.renderX,a.renderX,u),renderY:Zt(c.renderY,a.renderY,u),scale:Zt(c.scale,1,u),alpha:Zt(c.alpha,1,u),zIndex:5})})}function vT(n,e,t){if(e<ys)return Gm(n,e,t,ys);if(e<ys+uc)return n.postSwapSnapshot.cells.map(a=>$r(a,{...Tn(a.coord),scale:1,alpha:1,zIndex:5}));const i=e-ys-uc,r=rn(i/Np),s=rs(r);return n.finalSnapshot.cells.map(a=>{const o=Tn(a.coord),l=n.postSwapSnapshot.cells.find(u=>u.tileId===a.tileId),c=l==null?o:Tn(l.coord);return $r(a,{renderX:Zt(c.renderX,o.renderX,s),renderY:Zt(c.renderY,o.renderY,s),scale:1,alpha:1,zIndex:5})})}function ST(n,e){const t=new Map(n.clearedTiles.map(i=>[i.tileId,i]));return n.beforeClearSnapshot.cells.map(i=>$r(i,t.has(i.tileId)?MT(t.get(i.tileId),e):{zIndex:0}))}function MT(n,e){const t=rn((e-(n.clearDelayMs??0))/Up);return t<=0?{scale:1,alpha:1,zIndex:8}:{scale:1-rs(t),alpha:1-t,zIndex:8}}function yT(n,e,t,i,r,s){const a=new Set([...n.fallingTiles.map(l=>l.tileId),...n.refillTiles.map(l=>l.tileId)]),o=n.beforeGravitySnapshot.cells.filter(l=>!a.has(l.tileId)).map(l=>$r(l,{zIndex:0}));for(const l of n.fallingTiles)o.push(kd(l,e,t,i,r,6,s));for(const l of n.refillTiles)o.push(kd(l,e,t,i,r,7,s));return o}function kd(n,e,t,i,r,s,a){const o=Math.max(1,Math.abs(n.to.row-n.from.row)),l=i.get(n.tileId)??0,c=Wm(o*Op+kp,$a,Math.min(Bp,t)),u=rn((e-l)/c),h=wT(u),d=Tn(n.to),f="movementKind"in n&&n.movementKind==="slide",p=f?TT(n,r):ET(n,d,r),_=RT(u);return{tileId:n.tileId,coord:n.to,assetId:Xm(n.tileType),tileType:n.tileType,isPath:n.isPath,alpha:(a||n.from.row<0)&&u<=0?0:1,renderX:f?Zt(p.renderX,d.renderX,h):d.renderX,renderY:Zt(p.renderY,d.renderY,h),scale:_,zIndex:s,isGhost:!0}}function TT(n,e){return e.get(n.tileId)??Tn(n.from)}function ET(n,e,t){const i=Tn({col:n.to.col,row:n.from.row}),r=t.get(n.tileId);return r==null||Math.abs(r.renderX-e.renderX)>.5?{...i,renderX:e.renderX}:{...r,renderX:e.renderX}}function bT(n){return n.cells.map(e=>$r(e,{zIndex:0}))}function $r(n,e={}){return{tileId:n.tileId,coord:n.coord,assetId:Xm(n.tileType),tileType:n.tileType,isPath:n.isPath,alpha:e.alpha??1,renderX:e.renderX,renderY:e.renderY,scale:e.scale,zIndex:e.zIndex,isGhost:e.isGhost}}function AT(n){return new Map(n.boardCells.map(e=>{const t=Tn(e.coord);return[e.tileId,{renderX:e.renderX??t.renderX,renderY:e.renderY??t.renderY,scale:e.scale??1,alpha:e.alpha}]}))}function Tn(n){return{renderX:Z.x+n.col*Z.cellSize,renderY:Z.y+n.row*Z.cellSize,scale:1,alpha:1}}function wT(n){const e=rn(n),t=.82;if(e<t)return Math.pow(e/t,2.4)*.96;const i=(e-t)/(1-t),r=.96+(1-.96)*rs(i),s=Math.sin(i*Math.PI*2)*.015*(1-i);return rn(r+s)}function RT(n){const e=rn(n);if(e<.72)return 1;const t=(e-.72)/.28;return 1+Math.sin(t*Math.PI*2)*.045*(1-t)}function rs(n){return 1-Math.pow(1-rn(n),3)}function IT(n){return Math.pow(rn(n),3)}function Zt(n,e,t){return n+(e-n)*t}function rn(n){return Wm(n,0,1)}function Wm(n,e,t){return Math.max(e,Math.min(t,n))}function Xm(n){switch(n){case"FIRE":return R.tiles.fire;case"ICE":return R.tiles.ice;case"LIGHTNING":return R.tiles.lightning;case"EARTH":return R.tiles.earth;case"LAND":return R.tiles.land;case"ROCKET_H":return R.powerUps.rocketH;case"ROCKET_V":return R.powerUps.rocketV;case"TNT":return R.powerUps.tnt;case"LIGHTBALL":return R.powerUps.lightball}}function jr(n){return`${n.col},${n.row}`}function Ym(n){switch(n){case"FIRE":return"#eb5757";case"ICE":return"#38d5ff";case"LIGHTNING":return"#f2c94c";case"EARTH":return"#27ae60";case"LAND":case"ROCKET_H":case"ROCKET_V":case"TNT":case"LIGHTBALL":return null}}function Ou(n){switch(n){case"FIRE":return"#ff7000";case"ICE":return"#00d8ff";case"LIGHTNING":return"#fff000";case"EARTH":return"#00ff3f";case"LAND":case"ROCKET_H":case"ROCKET_V":case"TNT":case"LIGHTBALL":return null}}function qi(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967296}class CT{constructor(e,t,i,r){ne(this,"maskCanvas",null);ne(this,"maskCtx",null);ne(this,"tintedImageCache",new Map);ne(this,"imageFrameCache",new Map);this.ctx=e,this.images=t,this.width=i,this.height=r}setImages(e){this.images=e,this.tintedImageCache.clear(),this.imageFrameCache.clear()}clear(){this.ctx.clearRect(0,0,this.width,this.height)}pushTranslate(e,t){this.ctx.save(),this.ctx.translate(e,t)}pushScale(e,t,i=0,r=0){this.ctx.save(),this.ctx.translate(i,r),this.ctx.scale(e,t),this.ctx.translate(-i,-r)}pushRotate(e,t=0,i=0){this.ctx.save(),this.ctx.translate(t,i),this.ctx.rotate(e*Math.PI/180),this.ctx.translate(-t,-i)}pushAlpha(e){this.ctx.save(),this.ctx.globalAlpha*=Math.max(0,Math.min(1,e))}pushClipRect(e,t,i,r){this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(e,t,i,r),this.ctx.clip()}pop(){this.ctx.restore()}drawRect(e,t,i,r,s){this.ctx.fillStyle=e,this.ctx.fillRect(t,i,r,s)}drawEllipse(e,t,i,r,s){this.ctx.fillStyle=e,this.ctx.beginPath(),this.ctx.ellipse(t,i,r,s,0,0,Math.PI*2),this.ctx.fill()}drawRing(e,t,i,r,s,a){this.ctx.strokeStyle=e,this.ctx.lineWidth=a,this.ctx.beginPath(),this.ctx.ellipse(t,i,r,s,0,0,Math.PI*2),this.ctx.stroke()}hasImage(e){return this.images[e.id]!=null}drawImage(e,t,i,r,s){const a=this.images[e.id];a!=null&&this.ctx.drawImage(a,t,i,r,s)}drawTintedImage(e,t,i,r,s,a){const o=this.images[e.id];if(o==null||s<=0||a<=0)return;const l=this.getTintedImageCanvas(e,o,t);l!=null&&this.ctx.drawImage(l,i,r,s,a)}drawImageFrame(e,t,i,r,s,a,o,l,c){const u=this.images[e.id];if(u==null||r<=0||s<=0||l<=0||c<=0)return;const h=this.getImageFrameCanvas(e,u,t,i,r,s);if(h==null){this.ctx.drawImage(u,t,i,r,s,a,o,l,c);return}this.ctx.drawImage(h,a,o,l,c)}drawTintedImageFrame(e,t,i,r,s,a,o,l,c,u){const h=this.images[e.id];if(h==null||s<=0||a<=0||c<=0||u<=0)return;const d=Math.ceil(c),f=Math.ceil(u),p=this.getMaskContext(d,f);p!=null&&(p.clearRect(0,0,d,f),p.globalCompositeOperation="source-over",p.globalAlpha=1,p.drawImage(h,i,r,s,a,0,0,d,f),p.globalCompositeOperation="multiply",p.fillStyle=t,p.fillRect(0,0,d,f),p.globalCompositeOperation="destination-in",p.drawImage(h,i,r,s,a,0,0,d,f),p.globalCompositeOperation="source-over",p.globalAlpha=1,this.ctx.drawImage(p.canvas,0,0,d,f,o,l,c,u))}drawImageAlphaMaskFill(e,t,i,r,s,a,o){const l=this.images[e.id];if(l==null||s<=0||a<=0||o<=0)return;const c=this.getMaskContext(Math.ceil(s),Math.ceil(a));if(c==null)return;const u=Math.ceil(s),h=Math.ceil(a);c.clearRect(0,0,u,h),c.globalCompositeOperation="source-over",c.globalAlpha=1,c.drawImage(l,0,0,u,h),c.globalCompositeOperation="source-in",c.globalAlpha=Math.max(0,Math.min(1,o)),c.fillStyle=t,c.fillRect(0,0,u,h),c.globalAlpha=1,c.globalCompositeOperation="source-over",this.ctx.drawImage(c.canvas,0,0,u,h,i,r,s,a)}drawText(e,t,i,r,s,a){this.ctx.fillStyle=a.color,this.ctx.font=Hd(a,a.fontSize);const o=Math.min(a.fontSize,a.minFontSize??a.fontSize);let l=a.fontSize;for(;l>o&&this.ctx.measureText(e).width>r;)l-=1,this.ctx.font=Hd(a,l);this.ctx.textAlign=a.align??"left",this.ctx.textBaseline="middle";const c=a.align==="center"?t+r/2:a.align==="right"?t+r:t;this.ctx.fillText(e,c,i+s/2,r)}getMaskContext(e,t){if(this.maskCanvas==null){if(typeof document>"u")return null;this.maskCanvas=document.createElement("canvas"),this.maskCtx=this.maskCanvas.getContext("2d")}return this.maskCtx==null||this.maskCanvas==null?null:(this.maskCanvas.width<e&&(this.maskCanvas.width=e),this.maskCanvas.height<t&&(this.maskCanvas.height=t),this.maskCtx)}getTintedImageCanvas(e,t,i){const r=`${e.id}|${i}`,s=this.tintedImageCache.get(r);if(s!=null)return s;if(typeof document>"u")return null;const a=Math.max(1,t.naturalWidth||t.width),o=Math.max(1,t.naturalHeight||t.height),l=document.createElement("canvas");l.width=a,l.height=o;const c=l.getContext("2d");return c==null?null:(c.clearRect(0,0,a,o),c.globalCompositeOperation="source-over",c.globalAlpha=1,c.drawImage(t,0,0,a,o),c.globalCompositeOperation="multiply",c.fillStyle=i,c.fillRect(0,0,a,o),c.globalCompositeOperation="destination-in",c.drawImage(t,0,0,a,o),c.globalCompositeOperation="source-over",c.globalAlpha=1,this.tintedImageCache.set(r,l),l)}getImageFrameCanvas(e,t,i,r,s,a){const o=`${e.id}|${i}|${r}|${s}|${a}`,l=this.imageFrameCache.get(o);if(l!=null)return l;if(typeof document>"u")return null;const c=document.createElement("canvas");c.width=s,c.height=a;const u=c.getContext("2d");return u==null?null:(u.clearRect(0,0,s,a),u.drawImage(t,i,r,s,a,0,0,s,a),this.imageFrameCache.set(o,c),c)}}function Hd(n,e){return`${n.fontWeight??"normal"} ${e}px ${n.fontFamily??"Inter, Arial, sans-serif"}`}const Bu="#ffffff";function Km(n,e,t,i,r,s){n.clear();const a=e.tutorialPresentation;(a==null?void 0:a.hideHud)!==!0&&(DT(n),FT(n,t),OT(n,t,s)),(a==null?void 0:a.hideBoard)!==!0&&kT(n,e,i),WT(n,e),r!=null&&JT(n,r),(a==null?void 0:a.hideHud)!==!0&&BT(n,t)}function PT(n,e){var f;const t=new Set(n.hintedCells.map(gr)),i=n.tutorialLock??n.matchHint??null,r=new Set((i==null?void 0:i.flashCells.map(gr))??[]),s=new Set(((f=n.tutorialLock)==null?void 0:f.dimmedCells.map(gr))??[]),a=i==null?null:gr(i.movingCell),o=new Map;for(const p of n.visualCues){const _=gr(p.coord);o.set(_,[...o.get(_)??[],p])}const l=[],c=(Math.sin(e*Math.PI*3)+1)/2,u=i==null?0:(Math.sin(i.progress*Math.PI*2*5)+1)/2,h=i==null?0:.18+u*.32,d=i==null?{x:0,y:0}:LT(i.direction,i.progress);for(const p of n.boardCells){const _=p.coord,m=gr(_),g=t.has(m)||r.has(m),x=t.has(m),M=r.has(m),y=o.get(m)??[],w=y.reduce((N,W)=>W.kind==="damagePopup"?N:Math.max(N,W.value),0),E=y.some(N=>N.kind==="powerPulse")?1+y.reduce((N,W)=>Math.max(N,W.value),0)*.1:1,C=Z.x+_.col*Z.cellSize,S=Z.y+_.row*Z.cellSize,A=a===m,P=(p.renderX??C)+(A?d.x:0),I=(p.renderY??S)+(A?d.y:0);l.push({tileId:p.tileId,coord:_,x:P,y:I,width:Z.cellSize,height:Z.cellSize,centerX:P+Z.cellSize/2,centerY:I+Z.cellSize/2,assetId:p.assetId,tileType:p.tileType,fillColor:rE(p.tileType),glyph:sE(p.tileType),isPath:p.isPath,isHinted:g,isDimmed:s.has(m),hasMage:Vd(n.mageCell,_),hasGoal:Vd(n.goalCell,_),alpha:p.alpha,scale:p.scale??Math.max(x?1+c*.05:1,E),flash:Math.max(x?.35+c*.45:0,M?h:0,w*.5),zIndex:(p.zIndex??0)+(A?.5:0)})}return l}function LT(n,e){const t=Math.max(0,Math.min(1,e)),i=Math.max(0,Math.sin(t*Math.PI*2*3))*Gp;return{x:n.col*i,y:n.row*i}}function DT(n){const e={id:R.ui.hudBanner};n.hasImage(e)&&n.drawImage(e,0,Io,Ze,Wn),n.drawRect("#1f1830",0,Yt+Wn,Ze,bn-Yt-Wn)}function FT(n,e){const t={id:R.ui.levelTitlePanel};n.hasImage(t)?n.drawImage(t,ac,$o,ir,qo):n.drawRect("rgba(36, 24, 50, 0.92)",ac,$o,ir,qo),n.drawText(e.levelText,V0,$o,G0,qo,{fontSize:38,minFontSize:22,fontWeight:"bold",color:Bu,align:"center"})}function NT(n,e,t){const i={id:R.ui.heartFill},r={id:R.ui.heartEmpty},s=Io+(Wn-Or)/2;for(let a=0;a<Z0;a++){const o=n_+a*(la+e_),l=o+la/2,c=s+Or/2,u=t!=null&&t.slotIndex===a&&t.progress01<1,d=a<e.lives||u?i:r;if(n.hasImage(d))if(u&&t!=null){const f=t.progress01,p=Math.sin(f*Math.PI*2*5)*(1-f)*(1-f)*16;n.pushRotate(p,l,c),n.drawImage(d,o,s,la,Or),n.pop()}else n.drawImage(d,o,s,la,Or)}}function UT(n,e){const t={id:R.ui.trialFillBarBg},i={id:R.ui.trialFillBarFill},r={id:R.ui.trialFillBarKoboldIcon},s=h_,a=Cp,o=Ip,l=Io+(Wn-o)/2;n.hasImage(t)&&n.drawImage(t,s,l,a,o);const c=s+a*f_,u=a*p_,h=o*m_,d=l+(o-h)/2,f=e.total,p=Math.max(0,e.remaining),_=f>0?Math.min(1,p/f):0;if(_>0&&n.hasImage(i)){const m=c+Uh,g=d+g_,x=u*_,M=c+u-x+Uh;n.pushClipRect(M,g,x,h),n.drawImage(i,m,g,u,h),n.pop()}if(n.hasImage(r)){const m=o*d_,g=m*(Nh.width/Nh.height),x=s+a-g,M=l+o-m;n.drawImage(r,x,M,g,m)}}function zd(n,e,t){const i=wp,r=Rp,s=i_,a=e+i+r;n.drawText("Score",0,e,Ze,i,{fontSize:s_,minFontSize:a_,fontWeight:"bold",color:r_,align:"center"}),n.drawText(t,0,a,Ze,s,{fontSize:o_,minFontSize:l_,fontWeight:"normal",color:Bu,align:"center"})}function OT(n,e,t){const i=Io;if(NT(n,e,t),e.trialMonsterFill!=null){zd(n,i,e.scoreText),UT(n,e.trialMonsterFill);return}if(zd(n,i,e.scoreText),e.objectiveText.length>0){const r=__();n.drawText(e.objectiveText,r.x,i,r.width,Wn,{fontSize:28,minFontSize:18,fontWeight:"bold",color:Bu,align:"right"})}}function BT(n,e){const t=Tu,i=t.x+t.width/2,r=t.y+t.height/2,s=t.width/2;e.bgmMuted?(n.drawEllipse("#5a5468",i,r,s,s),n.drawEllipse("#2c2638",i,r,s-7,s-7),n.drawText("♪",t.x,t.y,t.width,t.height,{fontSize:36,fontWeight:"bold",color:"rgba(200, 192, 220, 0.42)",align:"center"})):(n.drawEllipse("#d4b96a",i,r,s,s),n.drawEllipse("#3d2658",i,r,s-8,s-8),n.drawText("♪",t.x,t.y,t.width,t.height,{fontSize:40,fontWeight:"bold",color:"#f5e9c9",align:"center"}))}function kT(n,e,t){const i=e.shakePixels;n.pushTranslate(i,0),HT(n);const r=PT(e,t).sort((s,a)=>s.zIndex-a.zIndex||s.coord.row-a.coord.row||s.coord.col-a.coord.col);n.pushClipRect(Z.x,Z.y,Z.width,Z.height);for(const s of e.emptyCells??[])zT(n,s.coord,s.assetId);for(const s of r)GT(n,s);KT(n,e),qT(n,e),$T(n,e),jT(n,e),XT(n,e),n.pop(),YT(n,e),VT(n),ZT(n,e),n.pop()}function HT(n){const e={id:R.ui.boardBackground};if(n.hasImage(e)){n.drawImage(e,Z.x,Z.y,Z.width,Z.height);return}n.drawRect("#302340",Z.x,Z.y,Z.width,Z.height)}function zT(n,e,t){const i=Z.x+e.col*Z.cellSize,r=Z.y+e.row*Z.cellSize,s={id:t};n.hasImage(s)&&n.drawImage(s,i,r,Z.cellSize,Z.cellSize)}function VT(n){n.drawRect("#c8a24b",Z.x-8,Z.y-8,Z.width+16,8),n.drawRect("#c8a24b",Z.x-8,Z.y+Z.height,Z.width+16,8),n.drawRect("#c8a24b",Z.x-8,Z.y,8,Z.height),n.drawRect("#c8a24b",Z.x+Z.width,Z.y,8,Z.height)}function GT(n,e){const i=e.width-16,r=e.height-16,s=i*e.scale,a=r*e.scale,o=e.centerX-s/2,l=e.centerY-a/2;if(e.alpha<=0)return;n.pushAlpha(e.alpha);const c={id:e.assetId};if(!n.hasImage(c)){n.pop();return}n.drawImage(c,o,l,s,a),e.isDimmed&&n.drawImageAlphaMaskFill(c,"#000000",o,l,s,a,.62),e.isPath&&n.drawRect("rgba(245, 233, 201, 0.55)",e.x+12,e.y+12,e.width-24,e.height-24),e.flash>0&&n.drawImageAlphaMaskFill(c,"#ffffff",o,l,s,a,e.flash),e.hasGoal&&n.drawText("G",e.x+e.width-44,e.y+10,34,34,{fontSize:28,fontWeight:"bold",color:"#241832",align:"center"}),e.hasMage&&(n.drawEllipse("#4b2e83",e.centerX,e.centerY,34,34),n.drawEllipse("#c8a24b",e.centerX,e.centerY,25,25),n.drawText("M",e.centerX-24,e.centerY-24,48,48,{fontSize:30,fontWeight:"bold",color:"#241832",align:"center"})),n.pop()}function WT(n,e){var s;const t=((s=e.tutorialPresentation)==null?void 0:s.floatingMatch)??null;if(t==null)return;const i=[...t.tiles].sort((a,o)=>a.zIndex-o.zIndex);for(const a of i){if(a.alpha<=0||a.scale<=0)continue;const o={id:a.assetId};if(!n.hasImage(o))continue;const l=8,c=(a.rect.width-l*2)*a.scale,u=(a.rect.height-l*2)*a.scale,h=a.rect.x+a.rect.width/2,d=a.rect.y+a.rect.height/2,f=h-c/2,p=d-u/2;n.pushAlpha(a.alpha),n.drawImage(o,f,p,c,u),a.flash>0&&n.drawImageAlphaMaskFill(o,"#ffffff",f,p,c,u,a.flash),n.pop()}const r=t.fingerHint;if(r!=null&&r.alpha>0&&r.width>0&&r.height>0){const a={id:r.assetId};n.hasImage(a)&&(n.pushAlpha(r.alpha),n.pushRotate(r.rotationDegrees,r.point.x,r.point.y),n.drawImage(a,r.point.x-r.width/2,r.point.y,r.width,r.height),n.pop(),n.pop())}qm(n,t.matchEnergyStreams??[])}function XT(n,e){const t=[...e.particles??[]].sort((i,r)=>i.zIndex-r.zIndex);for(const i of t)i.alpha<=0||i.radius<=0||(n.pushAlpha(i.alpha),n.drawEllipse(i.color,i.x,i.y,i.radius,i.radius),n.pop())}function YT(n,e){qm(n,e.matchEnergyStreams??[])}function qm(n,e){const t=[...e].sort((i,r)=>i.zIndex-r.zIndex);for(const i of t){if(i.alpha<=0||i.width<=0||i.height<=0)continue;const r={id:i.assetId};n.hasImage(r)&&(n.pushAlpha(i.alpha),n.drawTintedImage(r,i.color,i.x-i.width/2,i.y-i.height/2,i.width,i.height),n.pop())}}function KT(n,e){const t=[...e.lightballStreams??[]].sort((i,r)=>i.zIndex-r.zIndex);for(const i of t){if(i.alpha<=0||i.length<=0||i.thickness<=0||i.tileWidth<=0||i.tileHeight<=0)continue;const r={id:i.assetId};if(!n.hasImage(r))continue;n.pushAlpha(i.alpha),n.pushRotate(i.angleDeg,i.startX,i.startY),n.pushClipRect(i.startX,i.startY-i.thickness/2,i.length,i.thickness);const s=(i.textureOffsetX%i.tileWidth+i.tileWidth)%i.tileWidth;for(let a=i.startX-i.tileWidth+s;a<i.startX+i.length;a+=i.tileWidth)n.drawTintedImage(r,i.color,a,i.startY-i.tileHeight/2,i.tileWidth,i.tileHeight);n.pop(),n.pop(),n.pop()}}function qT(n,e){const t=[...e.tntExplosionSprites??[]].sort((i,r)=>i.zIndex-r.zIndex);for(const i of t){if(i.alpha<=0||i.width<=0||i.height<=0)continue;const r={id:i.assetId};n.hasImage(r)&&(n.pushAlpha(i.alpha),n.drawImageFrame(r,i.sourceX,i.sourceY,i.sourceWidth,i.sourceHeight,i.x,i.y,i.width,i.height),n.pop())}}function $T(n,e){const t=[...e.rocketCloudSprites??[]].sort((i,r)=>i.zIndex-r.zIndex);for(const i of t){if(i.alpha<=0||i.width<=0||i.height<=0)continue;const r={id:i.assetId};n.hasImage(r)&&(n.pushAlpha(i.alpha),n.pushRotate(i.angleDeg,i.originX,i.originY),n.drawImageFrame(r,i.sourceX,i.sourceY,i.sourceWidth,i.sourceHeight,i.x,i.y,i.width,i.height),n.pop(),n.pop())}}function jT(n,e){const t=[...e.burstRings??[]].sort((i,r)=>i.zIndex-r.zIndex);for(const i of t)i.alpha<=0||i.radius<=0||i.lineWidth<=0||(n.pushAlpha(i.alpha),n.drawRing(i.color,i.x,i.y,i.radius,i.radius,i.lineWidth),n.pop())}function ZT(n,e){for(const t of e.visualCues){if(t.kind!=="damagePopup"||t.text==null)continue;const i=Z.x+t.coord.col*Z.cellSize,r=Z.y+t.coord.row*Z.cellSize-(1-t.value)*42;n.drawText(t.text,i,r,Z.cellSize,42,{fontSize:30,fontWeight:"bold",color:`rgba(245, 233, 201, ${Math.max(0,t.value).toFixed(3)})`,align:"center"})}}function JT(n,e){if(e.screen==="gameOver"){eE(n,e);return}e.transitionText!=null&&tE(n,e.transitionText)}const QT=56;function Bs(n,e,t){const i=Math.min(n,Ze-2*QT);return{x:(Ze-i)/2,y:e,width:i,height:t}}function eE(n,e){n.drawRect("rgba(20, 14, 32, 0.86)",0,0,Ze,bn);const t=$0(),i={id:R.ui.levelTitlePanel};n.hasImage(i)?n.drawImage(i,t.x,t.y,t.width,t.height):n.drawRect("rgba(36, 24, 50, 0.92)",t.x,t.y,t.width,t.height),n.drawText("GAME OVER",t.x,t.y,t.width,t.height,{fontSize:72,fontWeight:"bold",color:"#f5e9c9",align:"center"});const r=Bs(800,320,70);n.drawText(`Final ${e.finalScore}`,r.x,r.y,r.width,r.height,{fontSize:42,fontWeight:"bold",color:"#c8a24b",align:"center"});const s=Bs(800,390,54);n.drawText(`High ${e.highScore}`,s.x,s.y,s.width,s.height,{fontSize:30,fontWeight:"bold",color:"#f5e9c9",align:"center"}),iE(n,e,520,10),nE(n,e.buttonRects.tryAgain,"TRY AGAIN",e.overlayPrimaryButtonPressed===!0)}function tE(n,e){n.drawRect("rgba(20, 14, 32, 0.55)",0,0,Ze,bn);const t=Bs(840,800,120);n.drawText(e,t.x,t.y,t.width,t.height,{fontSize:70,fontWeight:"bold",color:"#f5e9c9",align:"center"})}function nE(n,e,t,i){const r={id:i?R.ui.primaryButtonPressed:R.ui.primaryButton};n.hasImage(r)?n.drawImage(r,e.x,e.y,e.width,e.height):(n.drawRect("#c8a24b",e.x,e.y,e.width,e.height),n.drawRect("#4b2e83",e.x+8,e.y+8,e.width-16,e.height-16)),n.drawText(t,e.x,e.y,e.width,e.height,{fontSize:44,fontWeight:"bold",color:"#f5e9c9",align:"center"})}function iE(n,e,t,i){const r=Bs(840,t,56);n.drawText("HALL OF HEROES",r.x,r.y,r.width,r.height,{fontSize:34,fontWeight:"bold",color:"#f5e9c9",align:"center"});const s=e.leaderboardRows.slice(0,i);if(s.length===0){const a=Bs(700,t+74,44);n.drawText("No champions yet",a.x,a.y,a.width,a.height,{fontSize:26,fontWeight:"normal",color:"#c8a24b",align:"center"});return}s.forEach((a,o)=>{const l=t+72+o*52,c=e.highlightedRank===o+1;c&&n.drawRect("rgba(200, 162, 75, 0.35)",r.x,l-3,r.width,46);const u=220,h=25,d=r.x+r.width-h-u,f=r.x+h,p=d-f-20;n.drawText(`${o+1}. ${a.name}`,f,l,p,42,{fontSize:26,fontWeight:c?"bold":"normal",color:"#f5e9c9",align:"left"}),n.drawText(`${a.score}`,d,l,u,42,{fontSize:26,fontWeight:c?"bold":"normal",color:"#c8a24b",align:"right"})})}function rE(n){switch(n){case"FIRE":return"#eb5757";case"ICE":return"#2d9cdb";case"LIGHTNING":return"#f2c94c";case"EARTH":return"#27ae60";case"LAND":return"#8b6f47";case"ROCKET_H":case"ROCKET_V":case"TNT":case"LIGHTBALL":return"#c8a24b"}}function sE(n){switch(n){case"FIRE":return"F";case"ICE":return"I";case"LIGHTNING":return"L";case"EARTH":return"E";case"LAND":return"P";case"ROCKET_H":return"H";case"ROCKET_V":return"V";case"TNT":return"B";case"LIGHTBALL":return"O"}}function gr(n){return`${n.col},${n.row}`}function Vd(n,e){return n!=null&&n.col===e.col&&n.row===e.row}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ku="184",aE=0,Gd=1,oE=2,to=1,lE=2,bs=3,Pi=0,an=1,Jt=2,oi=0,Ii=1,Wd=2,Xd=3,Yd=4,cE=5,$i=100,uE=101,hE=102,dE=103,fE=104,pE=200,mE=201,gE=202,_E=203,bc=204,Ac=205,xE=206,vE=207,SE=208,ME=209,yE=210,TE=211,EE=212,bE=213,AE=214,wc=0,Rc=1,Ic=2,Zr=3,Cc=4,Pc=5,Lc=6,Dc=7,Bo=0,wE=1,RE=2,Xn=0,$m=1,jm=2,Zm=3,Jm=4,Qm=5,eg=6,tg=7,Kd="attached",IE="detached",ng=300,sr=301,Jr=302,no=303,ul=304,ko=306,ks=1e3,dn=1001,Fc=1002,Xt=1003,CE=1004,ma=1005,Qt=1006,hl=1007,Qi=1008,hn=1009,ig=1010,rg=1011,Hs=1012,Hu=1013,Kn=1014,Mn=1015,hi=1016,zu=1017,Vu=1018,zs=1020,sg=35902,ag=35899,og=1021,lg=1022,fn=1023,di=1026,er=1027,Gu=1028,Wu=1029,ar=1030,Xu=1031,Yu=1033,io=33776,ro=33777,so=33778,ao=33779,Nc=35840,Uc=35841,Oc=35842,Bc=35843,kc=36196,Hc=37492,zc=37496,Vc=37488,Gc=37489,go=37490,Wc=37491,Xc=37808,Yc=37809,Kc=37810,qc=37811,$c=37812,jc=37813,Zc=37814,Jc=37815,Qc=37816,eu=37817,tu=37818,nu=37819,iu=37820,ru=37821,su=36492,au=36494,ou=36495,lu=36283,cu=36284,_o=36285,uu=36286,xo=2200,cg=2201,PE=2202,vo=2300,hu=2301,dl=2302,qd=2303,Br=2400,kr=2401,So=2402,Ku=2500,ug=2501,LE=3200,Vs=0,DE=1,Ai="",et="srgb",Mo="srgb-linear",yo="linear",ot="srgb",_r=7680,$d=519,FE=512,NE=513,UE=514,qu=515,OE=516,BE=517,$u=518,kE=519,jd=35044,Zd="300 es",Gn=2e3,Gs=2001;function HE(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function hg(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Ws(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function zE(){const n=Ws("canvas");return n.style.display="block",n}const Jd={};function Qd(...n){const e="THREE."+n.shift();console.log(e,...n)}function dg(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function we(...n){n=dg(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Le(...n){n=dg(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function du(...n){const e=n.join(" ");e in Jd||(Jd[e]=!0,we(...n))}function VE(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const GE={[wc]:Rc,[Ic]:Lc,[Cc]:Dc,[Zr]:Pc,[Rc]:wc,[Lc]:Ic,[Dc]:Cc,[Pc]:Zr};class Fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const $t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ef=1234567;const Vr=Math.PI/180,Qr=180/Math.PI;function Ni(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($t[n&255]+$t[n>>8&255]+$t[n>>16&255]+$t[n>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[t&63|128]+$t[t>>8&255]+"-"+$t[t>>16&255]+$t[t>>24&255]+$t[i&255]+$t[i>>8&255]+$t[i>>16&255]+$t[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function ju(n,e){return(n%e+e)%e}function WE(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function XE(n,e,t){return n!==e?(t-n)/(e-n):0}function Is(n,e,t){return(1-t)*n+t*e}function YE(n,e,t,i){return Is(n,e,1-Math.exp(-t*i))}function KE(n,e=1){return e-Math.abs(ju(n,e*2)-e)}function qE(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function $E(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function jE(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ZE(n,e){return n+Math.random()*(e-n)}function JE(n){return n*(.5-Math.random())}function QE(n){n!==void 0&&(ef=n);let e=ef+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function eb(n){return n*Vr}function tb(n){return n*Qr}function nb(n){return(n&n-1)===0&&n!==0}function ib(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function rb(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function sb(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),u=a((e+i)/2),h=s((e-i)/2),d=a((e-i)/2),f=s((i-e)/2),p=a((i-e)/2);switch(r){case"XYX":n.set(o*u,l*h,l*d,o*c);break;case"YZY":n.set(l*d,o*u,l*h,o*c);break;case"ZXZ":n.set(l*h,l*d,o*u,o*c);break;case"XZX":n.set(o*u,l*p,l*f,o*c);break;case"YXY":n.set(l*f,o*u,l*p,o*c);break;case"ZYZ":n.set(l*p,l*f,o*u,o*c);break;default:we("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ur(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function en(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const nn={DEG2RAD:Vr,RAD2DEG:Qr,generateUUID:Ni,clamp:Ke,euclideanModulo:ju,mapLinear:WE,inverseLerp:XE,lerp:Is,damp:YE,pingpong:KE,smoothstep:qE,smootherstep:$E,randInt:jE,randFloat:ZE,randFloatSpread:JE,seededRandom:QE,degToRad:eb,radToDeg:tb,isPowerOfTwo:nb,ceilPowerOfTwo:ib,floorPowerOfTwo:rb,setQuaternionFromProperEuler:sb,normalize:en,denormalize:Ur},vh=class vh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};vh.prototype.isVector2=!0;let je=vh;class Nt{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3],d=s[a+0],f=s[a+1],p=s[a+2],_=s[a+3];if(h!==_||l!==d||c!==f||u!==p){let m=l*d+c*f+u*p+h*_;m<0&&(d=-d,f=-f,p=-p,_=-_,m=-m);let g=1-o;if(m<.9995){const x=Math.acos(m),M=Math.sin(x);g=Math.sin(g*x)/M,o=Math.sin(o*x)/M,l=l*g+d*o,c=c*g+f*o,u=u*g+p*o,h=h*g+_*o}else{l=l*g+d*o,c=c*g+f*o,u=u*g+p*o,h=h*g+_*o;const x=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=x,c*=x,u*=x,h*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[a],d=s[a+1],f=s[a+2],p=s[a+3];return e[t]=o*p+u*h+l*f-c*d,e[t+1]=l*p+u*d+c*h-o*f,e[t+2]=c*p+u*f+o*d-l*h,e[t+3]=u*p-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),h=o(s/2),d=l(i/2),f=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"YXZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"ZXY":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"ZYX":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"YZX":this._x=d*u*h+c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h-d*f*p;break;case"XZY":this._x=d*u*h-c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h+d*f*p;break;default:we("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Sh=class Sh{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+l*c+a*h-o*u,this.y=i+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return fl.copy(this).projectOnVector(e),this.sub(fl)}reflect(e){return this.sub(fl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Sh.prototype.isVector3=!0;let D=Sh;const fl=new D,tf=new Nt,Mh=class Mh{constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],p=i[8],_=r[0],m=r[3],g=r[6],x=r[1],M=r[4],y=r[7],w=r[2],E=r[5],C=r[8];return s[0]=a*_+o*x+l*w,s[3]=a*m+o*M+l*E,s[6]=a*g+o*y+l*C,s[1]=c*_+u*x+h*w,s[4]=c*m+u*M+h*E,s[7]=c*g+u*y+h*C,s[2]=d*_+f*x+p*w,s[5]=d*m+f*M+p*E,s[8]=d*g+f*y+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,p=t*h+i*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=h*_,e[1]=(r*c-u*i)*_,e[2]=(o*i-r*a)*_,e[3]=d*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(pl.makeScale(e,t)),this}rotate(e){return this.premultiply(pl.makeRotation(-e)),this}translate(e,t){return this.premultiply(pl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Mh.prototype.isMatrix3=!0;let Oe=Mh;const pl=new Oe,nf=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rf=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ab(){const n={enabled:!0,workingColorSpace:Mo,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ot&&(r.r=li(r.r),r.g=li(r.g),r.b=li(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(r.r=Gr(r.r),r.g=Gr(r.g),r.b=Gr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ai?yo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return du("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return du("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Mo]:{primaries:e,whitePoint:i,transfer:yo,toXYZ:nf,fromXYZ:rf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:et},outputColorSpaceConfig:{drawingBufferColorSpace:et}},[et]:{primaries:e,whitePoint:i,transfer:ot,toXYZ:nf,fromXYZ:rf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:et}}}),n}const Be=ab();function li(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Gr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let xr;class ob{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{xr===void 0&&(xr=Ws("canvas")),xr.width=e.width,xr.height=e.height;const r=xr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=xr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ws("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=li(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(li(t[i]/255)*255):t[i]=li(t[i]);return{data:t,width:e.width,height:e.height}}else return we("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let lb=0;class Zu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lb++}),this.uuid=Ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ml(r[a].image)):s.push(ml(r[a]))}else s=ml(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ml(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ob.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(we("Texture: Unable to serialize Texture."),{})}let cb=0;const gl=new D;class Ot extends Fi{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=dn,r=dn,s=Qt,a=Qi,o=fn,l=hn,c=Ot.DEFAULT_ANISOTROPY,u=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cb++}),this.uuid=Ni(),this.name="",this.source=new Zu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(gl).x}get height(){return this.source.getSize(gl).y}get depth(){return this.source.getSize(gl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){we(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){we(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ng)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ks:e.x=e.x-Math.floor(e.x);break;case dn:e.x=e.x<0?0:1;break;case Fc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ks:e.y=e.y-Math.floor(e.y);break;case dn:e.y=e.y<0?0:1;break;case Fc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=ng;Ot.DEFAULT_ANISOTROPY=1;const yh=class yh{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],p=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,y=(f+1)/2,w=(g+1)/2,E=(u+d)/4,C=(h+_)/4,S=(p+m)/4;return M>y&&M>w?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=E/i,s=C/i):y>w?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=E/r,s=S/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=C/s,r=S/s),this.set(i,r,s,t),this}let x=Math.sqrt((m-p)*(m-p)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(m-p)/x,this.y=(h-_)/x,this.z=(d-u)/x,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};yh.prototype.isVector4=!0;let it=yh;class ub extends Fi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Ot(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Zu(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yn extends ub{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class fg extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class hb extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ro=class Ro{constructor(e,t,i,r,s,a,o,l,c,u,h,d,f,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,h,d,f,p,_,m)}set(e,t,i,r,s,a,o,l,c,u,h,d,f,p,_,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=h,g[14]=d,g[3]=f,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ro().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,r=1/vr.setFromMatrixColumn(e,0).length(),s=1/vr.setFromMatrixColumn(e,1).length(),a=1/vr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,f=a*h,p=o*u,_=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,p=c*u,_=c*h;t[0]=d+_*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-p,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,p=c*u,_=c*h;t[0]=d-_*o,t[4]=-a*h,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,p=o*u,_=o*h;t[0]=l*u,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*u,t[4]=_-d*h,t[8]=p*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+p,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=a*u,t[9]=f*h-p,t[2]=p*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(db,e,fb)}lookAt(e,t,i){const r=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),xi.crossVectors(i,cn),xi.lengthSq()===0&&(Math.abs(i.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),xi.crossVectors(i,cn)),xi.normalize(),ga.crossVectors(cn,xi),r[0]=xi.x,r[4]=ga.x,r[8]=cn.x,r[1]=xi.y,r[5]=ga.y,r[9]=cn.y,r[2]=xi.z,r[6]=ga.z,r[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],p=i[2],_=i[6],m=i[10],g=i[14],x=i[3],M=i[7],y=i[11],w=i[15],E=r[0],C=r[4],S=r[8],A=r[12],P=r[1],I=r[5],N=r[9],W=r[13],X=r[2],O=r[6],k=r[10],V=r[14],Q=r[3],te=r[7],ue=r[11],Me=r[15];return s[0]=a*E+o*P+l*X+c*Q,s[4]=a*C+o*I+l*O+c*te,s[8]=a*S+o*N+l*k+c*ue,s[12]=a*A+o*W+l*V+c*Me,s[1]=u*E+h*P+d*X+f*Q,s[5]=u*C+h*I+d*O+f*te,s[9]=u*S+h*N+d*k+f*ue,s[13]=u*A+h*W+d*V+f*Me,s[2]=p*E+_*P+m*X+g*Q,s[6]=p*C+_*I+m*O+g*te,s[10]=p*S+_*N+m*k+g*ue,s[14]=p*A+_*W+m*V+g*Me,s[3]=x*E+M*P+y*X+w*Q,s[7]=x*C+M*I+y*O+w*te,s[11]=x*S+M*N+y*k+w*ue,s[15]=x*A+M*W+y*V+w*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],p=e[3],_=e[7],m=e[11],g=e[15],x=l*f-c*d,M=o*f-c*h,y=o*d-l*h,w=a*f-c*u,E=a*d-l*u,C=a*h-o*u;return t*(_*x-m*M+g*y)-i*(p*x-m*w+g*E)+r*(p*M-_*w+g*C)-s*(p*y-_*E+m*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],p=e[12],_=e[13],m=e[14],g=e[15],x=t*o-i*a,M=t*l-r*a,y=t*c-s*a,w=i*l-r*o,E=i*c-s*o,C=r*c-s*l,S=u*_-h*p,A=u*m-d*p,P=u*g-f*p,I=h*m-d*_,N=h*g-f*_,W=d*g-f*m,X=x*W-M*N+y*I+w*P-E*A+C*S;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/X;return e[0]=(o*W-l*N+c*I)*O,e[1]=(r*N-i*W-s*I)*O,e[2]=(_*C-m*E+g*w)*O,e[3]=(d*E-h*C-f*w)*O,e[4]=(l*P-a*W-c*A)*O,e[5]=(t*W-r*P+s*A)*O,e[6]=(m*y-p*C-g*M)*O,e[7]=(u*C-d*y+f*M)*O,e[8]=(a*N-o*P+c*S)*O,e[9]=(i*P-t*N-s*S)*O,e[10]=(p*E-_*y+g*x)*O,e[11]=(h*y-u*E-f*x)*O,e[12]=(o*A-a*I-l*S)*O,e[13]=(t*I-i*A+r*S)*O,e[14]=(_*M-p*w-m*x)*O,e[15]=(u*w-h*M+d*x)*O,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,p=s*h,_=a*u,m=a*h,g=o*h,x=l*c,M=l*u,y=l*h,w=i.x,E=i.y,C=i.z;return r[0]=(1-(_+g))*w,r[1]=(f+y)*w,r[2]=(p-M)*w,r[3]=0,r[4]=(f-y)*E,r[5]=(1-(d+g))*E,r[6]=(m+x)*E,r[7]=0,r[8]=(p+M)*C,r[9]=(m-x)*C,r[10]=(1-(d+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let a=vr.set(r[0],r[1],r[2]).length();const o=vr.set(r[4],r[5],r[6]).length(),l=vr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Rn.copy(this);const c=1/a,u=1/o,h=1/l;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=h,Rn.elements[9]*=h,Rn.elements[10]*=h,t.setFromRotationMatrix(Rn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=Gn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(i-r),d=(t+e)/(t-e),f=(i+r)/(i-r);let p,_;if(l)p=s/(a-s),_=a*s/(a-s);else if(o===Gn)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Gs)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Gn,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-r),d=-(t+e)/(t-e),f=-(i+r)/(i-r);let p,_;if(l)p=1/(a-s),_=a/(a-s);else if(o===Gn)p=-2/(a-s),_=-(a+s)/(a-s);else if(o===Gs)p=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Ro.prototype.isMatrix4=!0;let Ae=Ro;const vr=new D,Rn=new Ae,db=new D(0,0,0),fb=new D(1,1,1),xi=new D,ga=new D,cn=new D,sf=new Ae,af=new Nt;class Wt{constructor(e=0,t=0,i=0,r=Wt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:we("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return sf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return af.setFromEuler(this),this.setFromQuaternion(af,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wt.DEFAULT_ORDER="XYZ";class pg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let pb=0;const of=new D,Sr=new Nt,Jn=new Ae,_a=new D,ds=new D,mb=new D,gb=new Nt,lf=new D(1,0,0),cf=new D(0,1,0),uf=new D(0,0,1),hf={type:"added"},_b={type:"removed"},Mr={type:"childadded",child:null},_l={type:"childremoved",child:null};class St extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pb++}),this.uuid=Ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new D,t=new Wt,i=new Nt,r=new D(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ae},normalMatrix:{value:new Oe}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Sr.setFromAxisAngle(e,t),this.quaternion.multiply(Sr),this}rotateOnWorldAxis(e,t){return Sr.setFromAxisAngle(e,t),this.quaternion.premultiply(Sr),this}rotateX(e){return this.rotateOnAxis(lf,e)}rotateY(e){return this.rotateOnAxis(cf,e)}rotateZ(e){return this.rotateOnAxis(uf,e)}translateOnAxis(e,t){return of.copy(e).applyQuaternion(this.quaternion),this.position.add(of.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(lf,e)}translateY(e){return this.translateOnAxis(cf,e)}translateZ(e){return this.translateOnAxis(uf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?_a.copy(e):_a.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(ds,_a,this.up):Jn.lookAt(_a,ds,this.up),this.quaternion.setFromRotationMatrix(Jn),r&&(Jn.extractRotation(r.matrixWorld),Sr.setFromRotationMatrix(Jn),this.quaternion.premultiply(Sr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Le("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hf),Mr.child=e,this.dispatchEvent(Mr),Mr.child=null):Le("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_b),_l.child=e,this.dispatchEvent(_l),_l.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hf),Mr.child=e,this.dispatchEvent(Mr),Mr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,e,mb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,gb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}St.DEFAULT_UP=new D(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class pn extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xb={type:"move"};class xl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xb)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new pn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const mg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},xa={h:0,s:0,l:0};function vl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Fe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Be.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Be.workingColorSpace){return this.r=e,this.g=t,this.b=i,Be.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Be.workingColorSpace){if(e=ju(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=vl(a,s,e+1/3),this.g=vl(a,s,e),this.b=vl(a,s,e-1/3)}return Be.colorSpaceToWorking(this,r),this}setStyle(e,t=et){function i(s){s!==void 0&&parseFloat(s)<1&&we("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:we("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);we("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=et){const i=mg[e.toLowerCase()];return i!==void 0?this.setHex(i,t):we("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=li(e.r),this.g=li(e.g),this.b=li(e.b),this}copyLinearToSRGB(e){return this.r=Gr(e.r),this.g=Gr(e.g),this.b=Gr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=et){return Be.workingToColorSpace(jt.copy(this),e),Math.round(Ke(jt.r*255,0,255))*65536+Math.round(Ke(jt.g*255,0,255))*256+Math.round(Ke(jt.b*255,0,255))}getHexString(e=et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Be.workingColorSpace){Be.workingToColorSpace(jt.copy(this),t);const i=jt.r,r=jt.g,s=jt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Be.workingColorSpace){return Be.workingToColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=et){Be.workingToColorSpace(jt.copy(this),e);const t=jt.r,i=jt.g,r=jt.b;return e!==et?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(vi),this.setHSL(vi.h+e,vi.s+t,vi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(vi),e.getHSL(xa);const i=Is(vi.h,xa.h,t),r=Is(vi.s,xa.s,t),s=Is(vi.l,xa.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const jt=new Fe;Fe.NAMES=mg;class vb extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wt,this.environmentIntensity=1,this.environmentRotation=new Wt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const In=new D,Qn=new D,Sl=new D,ei=new D,yr=new D,Tr=new D,df=new D,Ml=new D,yl=new D,Tl=new D,El=new it,bl=new it,Al=new it;class vn{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),In.subVectors(e,t),r.cross(In);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){In.subVectors(r,t),Qn.subVectors(i,t),Sl.subVectors(e,t);const a=In.dot(In),o=In.dot(Qn),l=In.dot(Sl),c=Qn.dot(Qn),u=Qn.dot(Sl),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,p=(a*u-o*l)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ei.x),l.addScaledVector(a,ei.y),l.addScaledVector(o,ei.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return El.setScalar(0),bl.setScalar(0),Al.setScalar(0),El.fromBufferAttribute(e,t),bl.fromBufferAttribute(e,i),Al.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(El,s.x),a.addScaledVector(bl,s.y),a.addScaledVector(Al,s.z),a}static isFrontFacing(e,t,i,r){return In.subVectors(i,t),Qn.subVectors(e,t),In.cross(Qn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),In.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return vn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;yr.subVectors(r,i),Tr.subVectors(s,i),Ml.subVectors(e,i);const l=yr.dot(Ml),c=Tr.dot(Ml);if(l<=0&&c<=0)return t.copy(i);yl.subVectors(e,r);const u=yr.dot(yl),h=Tr.dot(yl);if(u>=0&&h<=u)return t.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(yr,a);Tl.subVectors(e,s);const f=yr.dot(Tl),p=Tr.dot(Tl);if(p>=0&&f<=p)return t.copy(s);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(Tr,o);const m=u*p-f*h;if(m<=0&&h-u>=0&&f-p>=0)return df.subVectors(s,r),o=(h-u)/(h-u+(f-p)),t.copy(r).addScaledVector(df,o);const g=1/(m+_+d);return a=_*g,o=d*g,t.copy(i).addScaledVector(yr,a).addScaledVector(Tr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class qn{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Cn):Cn.fromBufferAttribute(s,a),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),va.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),va.copy(i.boundingBox)),va.applyMatrix4(e.matrixWorld),this.union(va)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fs),Sa.subVectors(this.max,fs),Er.subVectors(e.a,fs),br.subVectors(e.b,fs),Ar.subVectors(e.c,fs),Si.subVectors(br,Er),Mi.subVectors(Ar,br),Vi.subVectors(Er,Ar);let t=[0,-Si.z,Si.y,0,-Mi.z,Mi.y,0,-Vi.z,Vi.y,Si.z,0,-Si.x,Mi.z,0,-Mi.x,Vi.z,0,-Vi.x,-Si.y,Si.x,0,-Mi.y,Mi.x,0,-Vi.y,Vi.x,0];return!wl(t,Er,br,Ar,Sa)||(t=[1,0,0,0,1,0,0,0,1],!wl(t,Er,br,Ar,Sa))?!1:(Ma.crossVectors(Si,Mi),t=[Ma.x,Ma.y,Ma.z],wl(t,Er,br,Ar,Sa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ti=[new D,new D,new D,new D,new D,new D,new D,new D],Cn=new D,va=new qn,Er=new D,br=new D,Ar=new D,Si=new D,Mi=new D,Vi=new D,fs=new D,Sa=new D,Ma=new D,Gi=new D;function wl(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Gi.fromArray(n,s);const o=r.x*Math.abs(Gi.x)+r.y*Math.abs(Gi.y)+r.z*Math.abs(Gi.z),l=e.dot(Gi),c=t.dot(Gi),u=i.dot(Gi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ft=new D,ya=new je;let Sb=0;class En extends Fi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sb++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=jd,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ya.fromBufferAttribute(this,t),ya.applyMatrix3(e),this.setXY(t,ya.x,ya.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ur(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=en(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ur(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ur(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ur(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ur(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array),r=en(r,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jd&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ju extends En{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class gg extends En{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Tt extends En{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Mb=new qn,ps=new D,Rl=new D;class Ui{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Mb.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ps.subVectors(e,this.center);const t=ps.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ps,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ps.copy(e.center).add(Rl)),this.expandByPoint(ps.copy(e.center).sub(Rl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let yb=0;const _n=new Ae,Il=new St,wr=new D,un=new qn,ms=new qn,Vt=new D;class Kt extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yb++}),this.uuid=Ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(HE(e)?gg:Ju)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Oe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,i){return _n.makeTranslation(e,t,i),this.applyMatrix4(_n),this}scale(e,t,i){return _n.makeScale(e,t,i),this.applyMatrix4(_n),this}lookAt(e){return Il.lookAt(e),Il.updateMatrix(),this.applyMatrix4(Il.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wr).negate(),this.translate(wr.x,wr.y,wr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Tt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&we("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];un.setFromBufferAttribute(s),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ms.setFromBufferAttribute(o),this.morphTargetsRelative?(Vt.addVectors(un.min,ms.min),un.expandByPoint(Vt),Vt.addVectors(un.max,ms.max),un.expandByPoint(Vt)):(un.expandByPoint(ms.min),un.expandByPoint(ms.max))}un.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Vt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Vt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Vt.fromBufferAttribute(o,c),l&&(wr.fromBufferAttribute(e,c),Vt.add(wr)),r=Math.max(r,i.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new En(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let S=0;S<i.count;S++)o[S]=new D,l[S]=new D;const c=new D,u=new D,h=new D,d=new je,f=new je,p=new je,_=new D,m=new D;function g(S,A,P){c.fromBufferAttribute(i,S),u.fromBufferAttribute(i,A),h.fromBufferAttribute(i,P),d.fromBufferAttribute(s,S),f.fromBufferAttribute(s,A),p.fromBufferAttribute(s,P),u.sub(c),h.sub(c),f.sub(d),p.sub(d);const I=1/(f.x*p.y-p.x*f.y);isFinite(I)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(h,-f.y).multiplyScalar(I),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(I),o[S].add(_),o[A].add(_),o[P].add(_),l[S].add(m),l[A].add(m),l[P].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let S=0,A=x.length;S<A;++S){const P=x[S],I=P.start,N=P.count;for(let W=I,X=I+N;W<X;W+=3)g(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const M=new D,y=new D,w=new D,E=new D;function C(S){w.fromBufferAttribute(r,S),E.copy(w);const A=o[S];M.copy(A),M.sub(w.multiplyScalar(w.dot(A))).normalize(),y.crossVectors(E,A);const I=y.dot(l[S])<0?-1:1;a.setXYZW(S,M.x,M.y,M.z,I)}for(let S=0,A=x.length;S<A;++S){const P=x[S],I=P.start,N=P.count;for(let W=I,X=I+N;W<X;W+=3)C(e.getX(W+0)),C(e.getX(W+1)),C(e.getX(W+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new En(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const r=new D,s=new D,a=new D,o=new D,l=new D,c=new D,u=new D,h=new D;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,p=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let g=0;g<u;g++)d[p++]=c[f++]}return new En(d,u,h)}if(this.index===null)return we("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Kt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Tb=0;class Oi extends Fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tb++}),this.uuid=Ni(),this.name="",this.type="Material",this.blending=Ii,this.side=Pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bc,this.blendDst=Ac,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=Zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$d,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_r,this.stencilZFail=_r,this.stencilZPass=_r,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){we(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){we(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(i.blending=this.blending),this.side!==Pi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==bc&&(i.blendSrc=this.blendSrc),this.blendDst!==Ac&&(i.blendDst=this.blendDst),this.blendEquation!==$i&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Zr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$d&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_r&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_r&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_r&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ni=new D,Cl=new D,Ta=new D,yi=new D,Pl=new D,Ea=new D,Ll=new D;class Qu{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Cl.copy(e).add(t).multiplyScalar(.5),Ta.copy(t).sub(e).normalize(),yi.copy(this.origin).sub(Cl);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ta),o=yi.dot(this.direction),l=-yi.dot(Ta),c=yi.lengthSq(),u=Math.abs(1-a*a);let h,d,f,p;if(u>0)if(h=a*l-o,d=a*o-l,p=s*u,h>=0)if(d>=-p)if(d<=p){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-p?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=p?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Cl).addScaledVector(Ta,d),f}intersectSphere(e,t){ni.subVectors(e.center,this.origin);const i=ni.dot(this.direction),r=ni.dot(ni)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,i,r,s){Pl.subVectors(t,e),Ea.subVectors(i,e),Ll.crossVectors(Pl,Ea);let a=this.direction.dot(Ll),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;yi.subVectors(this.origin,e);const l=o*this.direction.dot(Ea.crossVectors(yi,Ea));if(l<0)return null;const c=o*this.direction.dot(Pl.cross(yi));if(c<0||l+c>a)return null;const u=-o*yi.dot(Ll);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mn extends Oi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=Bo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ff=new Ae,Wi=new Qu,ba=new Ui,pf=new D,Aa=new D,wa=new D,Ra=new D,Dl=new D,Ia=new D,mf=new D,Ca=new D;class lt extends St{constructor(e=new Kt,t=new mn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ia.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Dl.fromBufferAttribute(h,e),a?Ia.addScaledVector(Dl,u):Ia.addScaledVector(Dl.sub(t),u))}t.add(Ia)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ba.copy(i.boundingSphere),ba.applyMatrix4(s),Wi.copy(e.ray).recast(e.near),!(ba.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(ba,pf)===null||Wi.origin.distanceToSquared(pf)>(e.far-e.near)**2))&&(ff.copy(s).invert(),Wi.copy(e.ray).applyMatrix4(ff),!(i.boundingBox!==null&&Wi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Wi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const m=d[p],g=a[m.materialIndex],x=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=x,w=M;y<w;y+=3){const E=o.getX(y),C=o.getX(y+1),S=o.getX(y+2);r=Pa(this,g,e,i,c,u,h,E,C,S),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){const x=o.getX(m),M=o.getX(m+1),y=o.getX(m+2);r=Pa(this,a,e,i,c,u,h,x,M,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const m=d[p],g=a[m.materialIndex],x=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=x,w=M;y<w;y+=3){const E=y,C=y+1,S=y+2;r=Pa(this,g,e,i,c,u,h,E,C,S),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){const x=m,M=m+1,y=m+2;r=Pa(this,a,e,i,c,u,h,x,M,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Eb(n,e,t,i,r,s,a,o){let l;if(e.side===an?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Pi,o),l===null)return null;Ca.copy(o),Ca.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ca);return c<t.near||c>t.far?null:{distance:c,point:Ca.clone(),object:n}}function Pa(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Aa),n.getVertexPosition(l,wa),n.getVertexPosition(c,Ra);const u=Eb(n,e,t,i,Aa,wa,Ra,mf);if(u){const h=new D;vn.getBarycoord(mf,Aa,wa,Ra,h),r&&(u.uv=vn.getInterpolatedAttribute(r,o,l,c,h,new je)),s&&(u.uv1=vn.getInterpolatedAttribute(s,o,l,c,h,new je)),a&&(u.normal=vn.getInterpolatedAttribute(a,o,l,c,h,new D),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new D,materialIndex:0};vn.getNormal(Aa,wa,Ra,d.normal),u.face=d,u.barycoord=h}return u}const gs=new it,gf=new it,_f=new it,bb=new it,xf=new Ae,La=new D,Fl=new Ui,vf=new Ae,Nl=new Qu;class Ab extends lt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Kd,this.bindMatrix=new Ae,this.bindMatrixInverse=new Ae,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new qn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,La),this.boundingBox.expandByPoint(La)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ui),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,La),this.boundingSphere.expandByPoint(La)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fl.copy(this.boundingSphere),Fl.applyMatrix4(r),e.ray.intersectsSphere(Fl)!==!1&&(vf.copy(r).invert(),Nl.copy(e.ray).applyMatrix4(vf),!(this.boundingBox!==null&&Nl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Nl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new it,t=this.geometry.attributes.skinWeight;for(let i=0,r=t.count;i<r;i++){e.fromBufferAttribute(t,i);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Kd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===IE?this.bindMatrixInverse.copy(this.bindMatrix).invert():we("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,r=this.geometry;gf.fromBufferAttribute(r.attributes.skinIndex,e),_f.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(gs.copy(t),t.set(0,0,0,0)):(gs.set(...t,1),t.set(0,0,0)),gs.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=_f.getComponent(s);if(a!==0){const o=gf.getComponent(s);xf.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(bb.copy(gs).applyMatrix4(xf),a)}}return t.isVector4&&(t.w=gs.w),t.applyMatrix4(this.bindMatrixInverse)}}class Xs extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ho extends Ot{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Xt,u=Xt,h,d){super(null,a,o,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Sf=new Ae,wb=new Ae;class eh{constructor(e=[],t=[]){this.uuid=Ni(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){we("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new Ae)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new Ae;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:wb;Sf.multiplyMatrices(o,t[s]),Sf.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new eh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new Ho(t,e,e,fn,Mn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){const s=e.bones[i];let a=t[s];a===void 0&&(we("Skeleton: No bone found with UUID:",s),a=new Xs),this.bones.push(a),this.boneInverses.push(new Ae().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const a=t[r];e.bones.push(a.uuid);const o=i[r];e.boneInverses.push(o.toArray())}return e}}class Mf extends En{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Rr=new Ae,yf=new Ae,Da=[],Tf=new qn,Rb=new Ae,_s=new lt,xs=new Ui;class _g extends lt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Mf(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Rb)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new qn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Rr),Tf.copy(e.boundingBox).applyMatrix4(Rr),this.boundingBox.union(Tf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ui),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Rr),xs.copy(e.boundingSphere).applyMatrix4(Rr),this.boundingSphere.union(xs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(_s.geometry=this.geometry,_s.material=this.material,_s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xs.copy(this.boundingSphere),xs.applyMatrix4(i),e.ray.intersectsSphere(xs)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Rr),yf.multiplyMatrices(i,Rr),_s.matrixWorld=yf,_s.raycast(e,Da);for(let a=0,o=Da.length;a<o;a++){const l=Da[a];l.instanceId=s,l.object=this,t.push(l)}Da.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Mf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Ho(new Float32Array(r*this.count),r,this.count,Gu,Mn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ul=new D,Ib=new D,Cb=new Oe;class Yi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ul.subVectors(i,t).cross(Ib.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Ul),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Cb.getNormalMatrix(e),r=this.coplanarPoint(Ul).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xi=new Ui,Pb=new je(.5,.5),Fa=new D;class th{constructor(e=new Yi,t=new Yi,i=new Yi,r=new Yi,s=new Yi,a=new Yi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Gn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],p=s[8],_=s[9],m=s[10],g=s[11],x=s[12],M=s[13],y=s[14],w=s[15];if(r[0].setComponents(c-a,f-u,g-p,w-x).normalize(),r[1].setComponents(c+a,f+u,g+p,w+x).normalize(),r[2].setComponents(c+o,f+h,g+_,w+M).normalize(),r[3].setComponents(c-o,f-h,g-_,w-M).normalize(),i)r[4].setComponents(l,d,m,y).normalize(),r[5].setComponents(c-l,f-d,g-m,w-y).normalize();else if(r[4].setComponents(c-l,f-d,g-m,w-y).normalize(),t===Gn)r[5].setComponents(c+l,f+d,g+m,w+y).normalize();else if(t===Gs)r[5].setComponents(l,d,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(e){Xi.center.set(0,0,0);const t=Pb.distanceTo(e.center);return Xi.radius=.7071067811865476+t,Xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Fa.x=r.normal.x>0?e.max.x:e.min.x,Fa.y=r.normal.y>0?e.max.y:e.min.y,Fa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Fa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class nh extends Oi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const To=new D,Eo=new D,Ef=new Ae,vs=new Qu,Na=new Ui,Ol=new D,bf=new D;class xg extends St{constructor(e=new Kt,t=new nh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)To.fromBufferAttribute(t,r-1),Eo.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=To.distanceTo(Eo);e.setAttribute("lineDistance",new Tt(i,1))}else we("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Na.copy(i.boundingSphere),Na.applyMatrix4(r),Na.radius+=s,e.ray.intersectsSphere(Na)===!1)return;Ef.copy(r).invert(),vs.copy(e.ray).applyMatrix4(Ef);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let _=f,m=p-1;_<m;_+=c){const g=u.getX(_),x=u.getX(_+1),M=Ua(this,e,vs,l,g,x,_);M&&t.push(M)}if(this.isLineLoop){const _=u.getX(p-1),m=u.getX(f),g=Ua(this,e,vs,l,_,m,p-1);g&&t.push(g)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=f,m=p-1;_<m;_+=c){const g=Ua(this,e,vs,l,_,_+1,_);g&&t.push(g)}if(this.isLineLoop){const _=Ua(this,e,vs,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ua(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(To.fromBufferAttribute(o,r),Eo.fromBufferAttribute(o,s),t.distanceSqToSegment(To,Eo,Ol,bf)>i)return;Ol.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Ol);if(!(c<e.near||c>e.far))return{distance:c,point:bf.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Af=new D,wf=new D;class vg extends xg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Af.fromBufferAttribute(t,r),wf.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Af.distanceTo(wf);e.setAttribute("lineDistance",new Tt(i,1))}else we("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Sg extends Ot{constructor(e=[],t=sr,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Mg extends Ot{constructor(e,t,i,r,s,a,o,l,c){super(e,t,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class es extends Ot{constructor(e,t,i=Kn,r,s,a,o=Xt,l=Xt,c,u=di,h=1){if(u!==di&&u!==er)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Lb extends es{constructor(e,t=Kn,i=sr,r,s,a=Xt,o=Xt,l,c=di){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class yg extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class fi extends Kt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;p("z","y","x",-1,-1,i,t,e,a,s,0),p("z","y","x",1,-1,i,t,-e,a,s,1),p("x","z","y",1,1,e,i,t,r,a,2),p("x","z","y",1,-1,e,i,-t,r,a,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Tt(c,3)),this.setAttribute("normal",new Tt(u,3)),this.setAttribute("uv",new Tt(h,2));function p(_,m,g,x,M,y,w,E,C,S,A){const P=y/C,I=w/S,N=y/2,W=w/2,X=E/2,O=C+1,k=S+1;let V=0,Q=0;const te=new D;for(let ue=0;ue<k;ue++){const Me=ue*I-W;for(let Te=0;Te<O;Te++){const Ge=Te*P-N;te[_]=Ge*x,te[m]=Me*M,te[g]=X,c.push(te.x,te.y,te.z),te[_]=0,te[m]=0,te[g]=E>0?1:-1,u.push(te.x,te.y,te.z),h.push(Te/C),h.push(1-ue/S),V+=1}}for(let ue=0;ue<S;ue++)for(let Me=0;Me<C;Me++){const Te=d+Me+O*ue,Ge=d+Me+O*(ue+1),rt=d+(Me+1)+O*(ue+1),De=d+(Me+1)+O*ue;l.push(Te,Ge,De),l.push(Ge,rt,De),Q+=6}o.addGroup(f,Q,A),f+=Q,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ss extends Kt{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],d=[],f=[];let p=0;const _=[],m=i/2;let g=0;x(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Tt(h,3)),this.setAttribute("normal",new Tt(d,3)),this.setAttribute("uv",new Tt(f,2));function x(){const y=new D,w=new D;let E=0;const C=(t-e)/i;for(let S=0;S<=s;S++){const A=[],P=S/s,I=P*(t-e)+e;for(let N=0;N<=r;N++){const W=N/r,X=W*l+o,O=Math.sin(X),k=Math.cos(X);w.x=I*O,w.y=-P*i+m,w.z=I*k,h.push(w.x,w.y,w.z),y.set(O,C,k).normalize(),d.push(y.x,y.y,y.z),f.push(W,1-P),A.push(p++)}_.push(A)}for(let S=0;S<r;S++)for(let A=0;A<s;A++){const P=_[A][S],I=_[A+1][S],N=_[A+1][S+1],W=_[A][S+1];(e>0||A!==0)&&(u.push(P,I,W),E+=3),(t>0||A!==s-1)&&(u.push(I,N,W),E+=3)}c.addGroup(g,E,0),g+=E}function M(y){const w=p,E=new je,C=new D;let S=0;const A=y===!0?e:t,P=y===!0?1:-1;for(let N=1;N<=r;N++)h.push(0,m*P,0),d.push(0,P,0),f.push(.5,.5),p++;const I=p;for(let N=0;N<=r;N++){const X=N/r*l+o,O=Math.cos(X),k=Math.sin(X);C.x=A*k,C.y=m*P,C.z=A*O,h.push(C.x,C.y,C.z),d.push(0,P,0),E.x=O*.5+.5,E.y=k*.5*P+.5,f.push(E.x,E.y),p++}for(let N=0;N<r;N++){const W=w+N,X=I+N;y===!0?u.push(X,X+1,W):u.push(X+1,X,W),S+=3}c.addGroup(g,S,y===!0?1:2),g+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ss(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Oa=new D,Ba=new D,Bl=new D,ka=new vn;class Db extends Kt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(Vr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:_,b:m,c:g}=ka;if(_.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),ka.getNormal(Bl),h[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,h[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,h[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let x=0;x<3;x++){const M=(x+1)%3,y=h[x],w=h[M],E=ka[u[x]],C=ka[u[M]],S=`${y}_${w}`,A=`${w}_${y}`;A in d&&d[A]?(Bl.dot(d[A].normal)<=s&&(f.push(E.x,E.y,E.z),f.push(C.x,C.y,C.z)),d[A]=null):S in d||(d[S]={index0:c[x],index1:c[M],normal:Bl.clone()})}}for(const p in d)if(d[p]){const{index0:_,index1:m}=d[p];Oa.fromBufferAttribute(o,_),Ba.fromBufferAttribute(o,m),f.push(Oa.x,Oa.y,Oa.z),f.push(Ba.x,Ba.y,Ba.z)}this.setAttribute("position",new Tt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Fb{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){we("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],d=i[r+1]-u,f=(a-u)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new je:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new D,r=[],s=[],a=[],o=new D,l=new Ae;for(let f=0;f<=e;f++){const p=f/e;r[f]=this.getTangentAt(p,new D)}s[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(Ke(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Ke(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],f*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function Nb(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=Tg(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=Hb(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let u=o,h=l;for(let d=t;d<r;d+=t){const f=n[d],p=n[d+1];f<o&&(o=f),p<l&&(l=p),f>u&&(u=f),p>h&&(h=p)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return Ys(s,a,t,o,l,c,0),a}function Tg(n,e,t,i,r){let s;if(r===Zb(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=Rf(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=Rf(a/i|0,n[a],n[a+1],s);return s&&ts(s,s.next)&&(qs(s),s=s.next),s}function or(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(ts(t,t.next)||bt(t.prev,t,t.next)===0)){if(qs(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Ys(n,e,t,i,r,s,a){if(!n)return;!a&&s&&Xb(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?Ob(n,i,r,s):Ub(n)){e.push(l.i,n.i,c.i),qs(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Bb(or(n),e),Ys(n,e,t,i,r,s,2)):a===2&&kb(n,e,t,i,r,s):Ys(or(n),e,t,i,r,s,1);break}}}function Ub(n){const e=n.prev,t=n,i=n.next;if(bt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(r,s,a),h=Math.min(o,l,c),d=Math.max(r,s,a),f=Math.max(o,l,c);let p=i.next;for(;p!==e;){if(p.x>=u&&p.x<=d&&p.y>=h&&p.y<=f&&As(r,o,s,l,a,c,p.x,p.y)&&bt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Ob(n,e,t,i){const r=n.prev,s=n,a=n.next;if(bt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,h=s.y,d=a.y,f=Math.min(o,l,c),p=Math.min(u,h,d),_=Math.max(o,l,c),m=Math.max(u,h,d),g=fu(f,p,e,t,i),x=fu(_,m,e,t,i);let M=n.prevZ,y=n.nextZ;for(;M&&M.z>=g&&y&&y.z<=x;){if(M.x>=f&&M.x<=_&&M.y>=p&&M.y<=m&&M!==r&&M!==a&&As(o,u,l,h,c,d,M.x,M.y)&&bt(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=f&&y.x<=_&&y.y>=p&&y.y<=m&&y!==r&&y!==a&&As(o,u,l,h,c,d,y.x,y.y)&&bt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=g;){if(M.x>=f&&M.x<=_&&M.y>=p&&M.y<=m&&M!==r&&M!==a&&As(o,u,l,h,c,d,M.x,M.y)&&bt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=m&&y!==r&&y!==a&&As(o,u,l,h,c,d,y.x,y.y)&&bt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Bb(n,e){let t=n;do{const i=t.prev,r=t.next.next;!ts(i,r)&&bg(i,t,t.next,r)&&Ks(i,r)&&Ks(r,i)&&(e.push(i.i,t.i,r.i),qs(t),qs(t.next),t=n=r),t=t.next}while(t!==n);return or(t)}function kb(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&qb(a,o)){let l=Ag(a,o);a=or(a,a.next),l=or(l,l.next),Ys(a,e,t,i,r,s,0),Ys(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function Hb(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=Tg(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Kb(c))}r.sort(zb);for(let s=0;s<r.length;s++)t=Vb(r[s],t);return t}function zb(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Vb(n,e){const t=Gb(n,e);if(!t)return e;const i=Ag(t,n);return or(i,i.next),or(t,t.next)}function Gb(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(ts(n,t))return t;do{if(ts(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Eg(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const h=Math.abs(r-t.y)/(i-t.x);Ks(t,n)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&Wb(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function Wb(n,e){return bt(n.prev,n,e.prev)<0&&bt(e.next,n,n.next)<0}function Xb(n,e,t,i){let r=n;do r.z===0&&(r.z=fu(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Yb(r)}function Yb(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function fu(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Kb(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Eg(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function As(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&Eg(n,e,t,i,r,s,a,o)}function qb(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!$b(n,e)&&(Ks(n,e)&&Ks(e,n)&&jb(n,e)&&(bt(n.prev,n,e.prev)||bt(n,e.prev,e))||ts(n,e)&&bt(n.prev,n,n.next)>0&&bt(e.prev,e,e.next)>0)}function bt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function ts(n,e){return n.x===e.x&&n.y===e.y}function bg(n,e,t,i){const r=za(bt(n,e,t)),s=za(bt(n,e,i)),a=za(bt(t,i,n)),o=za(bt(t,i,e));return!!(r!==s&&a!==o||r===0&&Ha(n,t,e)||s===0&&Ha(n,i,e)||a===0&&Ha(t,n,i)||o===0&&Ha(t,e,i))}function Ha(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function za(n){return n>0?1:n<0?-1:0}function $b(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&bg(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Ks(n,e){return bt(n.prev,n,n.next)<0?bt(n,e,n.next)>=0&&bt(n,n.prev,e)>=0:bt(n,e,n.prev)<0||bt(n,n.next,e)<0}function jb(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Ag(n,e){const t=pu(n.i,n.x,n.y),i=pu(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Rf(n,e,t,i){const r=pu(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function qs(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function pu(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Zb(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class Jb{static triangulate(e,t,i=2){return Nb(e,t,i)}}class ih{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return ih.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];If(e),Cf(i,e);let a=e.length;t.forEach(If);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Cf(i,t[l]);const o=Jb.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function If(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Cf(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Fn extends Kt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,h=e/o,d=t/l,f=[],p=[],_=[],m=[];for(let g=0;g<u;g++){const x=g*d-a;for(let M=0;M<c;M++){const y=M*h-s;p.push(y,-x,0),_.push(0,0,1),m.push(M/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let x=0;x<o;x++){const M=x+c*g,y=x+c*(g+1),w=x+1+c*(g+1),E=x+1+c*g;f.push(M,y,E),f.push(y,w,E)}this.setIndex(f),this.setAttribute("position",new Tt(p,3)),this.setAttribute("normal",new Tt(_,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fn(e.width,e.height,e.widthSegments,e.heightSegments)}}class zo extends Kt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new D,d=new D,f=[],p=[],_=[],m=[];for(let g=0;g<=i;g++){const x=[],M=g/i;let y=0;g===0&&a===0?y=.5/t:g===i&&l===Math.PI&&(y=-.5/t);for(let w=0;w<=t;w++){const E=w/t;h.x=-e*Math.cos(r+E*s)*Math.sin(a+M*o),h.y=e*Math.cos(a+M*o),h.z=e*Math.sin(r+E*s)*Math.sin(a+M*o),p.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(E+y,1-M),x.push(c++)}u.push(x)}for(let g=0;g<i;g++)for(let x=0;x<t;x++){const M=u[g][x+1],y=u[g][x],w=u[g+1][x],E=u[g+1][x+1];(g!==0||a>0)&&f.push(M,y,E),(g!==i-1||l<Math.PI)&&f.push(y,w,E)}this.setIndex(f),this.setAttribute("position",new Tt(p,3)),this.setAttribute("normal",new Tt(_,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function ns(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Pf(r))r.isRenderTargetTexture?(we("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Pf(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function tn(n){const e={};for(let t=0;t<n.length;t++){const i=ns(n[t]);for(const r in i)e[r]=i[r]}return e}function Pf(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Qb(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function wg(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Be.workingColorSpace}const eA={clone:ns,merge:tn};var tA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends Oi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tA,this.fragmentShader=nA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ns(e.uniforms),this.uniformsGroups=Qb(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class iA extends $n{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ea extends Oi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vs,this.normalScale=new je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Va extends Oi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Fe(16777215),this.specular=new Fe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vs,this.normalScale=new je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=Bo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class rA extends Oi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vs,this.normalScale=new je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=Bo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class sA extends Oi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=LE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class aA extends Oi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function tr(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Rg(n){function e(r,s){return n[r]-n[s]}const t=n.length,i=new Array(t);for(let r=0;r!==t;++r)i[r]=r;return i.sort(e),i}function mu(n,e,t){const i=n.length,r=new n.constructor(i);for(let s=0,a=0;a!==i;++s){const o=t[s]*e;for(let l=0;l!==e;++l)r[a++]=n[o+l]}return r}function rh(n,e,t,i){let r=1,s=n[0];for(;s!==void 0&&s[i]===void 0;)s=n[r++];if(s===void 0)return;let a=s[i];if(a!==void 0)if(Array.isArray(a))do a=s[i],a!==void 0&&(e.push(s.time),t.push(...a)),s=n[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[i],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=n[r++];while(s!==void 0);else do a=s[i],a!==void 0&&(e.push(s.time),t.push(a)),s=n[r++];while(s!==void 0)}function oA(n,e,t,i,r=30){const s=n.clone();s.name=e;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],u=c.getValueSize(),h=[],d=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*r;if(!(p<t||p>=i)){h.push(c.times[f]);for(let _=0;_<u;++_)d.push(c.values[f*u+_])}}h.length!==0&&(c.times=tr(h,c.times.constructor),c.values=tr(d,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function lA(n,e=0,t=n,i=30){i<=0&&(i=30);const r=t.tracks.length,s=e/i;for(let a=0;a<r;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=n.tracks.find(function(g){return g.name===o.name&&g.ValueTypeName===l});if(c===void 0)continue;let u=0;const h=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=h/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const p=o.times.length-1;let _;if(s<=o.times[0]){const g=u,x=h-u;_=o.values.slice(g,x)}else if(s>=o.times[p]){const g=p*h+u,x=g+h-u;_=o.values.slice(g,x)}else{const g=o.createInterpolant(),x=u,M=h-u;g.evaluate(s),_=g.resultBuffer.slice(x,M)}l==="quaternion"&&new Nt().fromArray(_).normalize().conjugate().toArray(_);const m=c.times.length;for(let g=0;g<m;++g){const x=g*f+d;if(l==="quaternion")Nt.multiplyQuaternionsFlat(c.values,x,_,0,c.values,x);else{const M=f-d*2;for(let y=0;y<M;++y)c.values[x+y]-=_[y]}}}return n.blendMode=ug,n}class cA{static convertArray(e,t){return tr(e,t)}static isTypedArray(e){return hg(e)}static getKeyframeOrder(e){return Rg(e)}static sortedArray(e,t,i){return mu(e,t,i)}static flattenJSON(e,t,i,r){rh(e,t,i,r)}static subclip(e,t,i,r,s=30){return oA(e,t,i,r,s)}static makeClipAdditive(e,t=0,i=e,r=30){return lA(e,t,i,r)}}class ta{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,r=t[i],s=t[i-1];e:{t:{let a;n:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=r,r=t[++i],e<r)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break t}a=i,i=0;break n}break e}for(;i<a;){const o=i+a>>>1;e<t[o]?a=o:i=o+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=i[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class uA extends ta{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Br,endingEnd:Br}}intervalChanged_(e,t,i){const r=this.parameterPositions;let s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case kr:s=e,o=2*t-i;break;case So:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case kr:a=e,l=2*i-t;break;case So:a=1,l=i+r[1]-r[0];break;default:a=e-1,l=t}const c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,i,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(i-t)/(r-t),_=p*p,m=_*p,g=-d*m+2*d*_-d*p,x=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*p+1,M=(-1-f)*m+(1.5+f)*_+.5*p,y=f*m-f*_;for(let w=0;w!==o;++w)s[w]=g*a[u+w]+x*a[c+w]+M*a[l+w]+y*a[h+w];return s}}class Ig extends ta{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(r-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}}class hA extends ta{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class dA extends ta{interpolate_(e,t,i,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,h=u.inTangents,d=u.outTangents;if(!h||!d){const _=(i-t)/(r-t),m=1-_;for(let g=0;g!==o;++g)s[g]=a[c+g]*m+a[l+g]*_;return s}const f=o*2,p=e-1;for(let _=0;_!==o;++_){const m=a[c+_],g=a[l+_],x=p*f+_*2,M=d[x],y=d[x+1],w=e*f+_*2,E=h[w],C=h[w+1];let S=(i-t)/(r-t),A,P,I,N,W;for(let X=0;X<8;X++){A=S*S,P=A*S,I=1-S,N=I*I,W=N*I;const k=W*t+3*N*S*M+3*I*A*E+P*r-i;if(Math.abs(k)<1e-10)break;const V=3*N*(M-t)+6*I*S*(E-M)+3*A*(r-E);if(Math.abs(V)<1e-10)break;S=S-k/V,S=Math.max(0,Math.min(1,S))}s[_]=W*m+3*N*S*y+3*I*A*C+P*g}return s}}class Nn{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=tr(t,this.TimeBufferType),this.values=tr(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:tr(e.times,Array),values:tr(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new hA(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ig(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new uA(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new dA(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case vo:t=this.InterpolantFactoryMethodDiscrete;break;case hu:t=this.InterpolantFactoryMethodLinear;break;case dl:t=this.InterpolantFactoryMethodSmooth;break;case qd:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return we("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vo;case this.InterpolantFactoryMethodLinear:return hu;case this.InterpolantFactoryMethodSmooth:return dl;case this.InterpolantFactoryMethodBezier:return qd}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){const i=this.times,r=i.length;let s=0,a=r-1;for(;s!==r&&i[s]<e;)++s;for(;a!==-1&&i[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Le("KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,r=this.values,s=i.length;s===0&&(Le("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){Le("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Le("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&hg(r))for(let o=0,l=r.length;o!==l;++o){const c=r[o];if(isNaN(c)){Le("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===dl,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{const h=o*i,d=h-i,f=h+i;for(let p=0;p!==i;++p){const _=t[h+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*i,d=a*i;for(let f=0;f!==i;++f)t[d+f]=t[h+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Nn.prototype.ValueTypeName="";Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=hu;class as extends Nn{constructor(e,t,i){super(e,t,i)}}as.prototype.ValueTypeName="bool";as.prototype.ValueBufferType=Array;as.prototype.DefaultInterpolation=vo;as.prototype.InterpolantFactoryMethodLinear=void 0;as.prototype.InterpolantFactoryMethodSmooth=void 0;class Cg extends Nn{constructor(e,t,i,r){super(e,t,i,r)}}Cg.prototype.ValueTypeName="color";class $s extends Nn{constructor(e,t,i,r){super(e,t,i,r)}}$s.prototype.ValueTypeName="number";class fA extends ta{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(r-t);let c=e*o;for(let u=c+o;c!==u;c+=4)Nt.slerpFlat(s,0,a,c-o,a,c,l);return s}}class na extends Nn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new fA(this.times,this.values,this.getValueSize(),e)}}na.prototype.ValueTypeName="quaternion";na.prototype.InterpolantFactoryMethodSmooth=void 0;class os extends Nn{constructor(e,t,i){super(e,t,i)}}os.prototype.ValueTypeName="string";os.prototype.ValueBufferType=Array;os.prototype.DefaultInterpolation=vo;os.prototype.InterpolantFactoryMethodLinear=void 0;os.prototype.InterpolantFactoryMethodSmooth=void 0;class js extends Nn{constructor(e,t,i,r){super(e,t,i,r)}}js.prototype.ValueTypeName="vector";class gu{constructor(e="",t=-1,i=[],r=Ku){this.name=e,this.tracks=i,this.duration=t,this.blendMode=r,this.uuid=Ni(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,r=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(mA(i[a]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=i.length;s!==a;++s)t.push(Nn.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,t,i,r){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=Rg(l);l=mu(l,1,u),c=mu(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new $s(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===t)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=r[h];d||(r[h]=d=[]),d.push(c)}}const a=[];for(const o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,i));return a}static parseAnimation(e,t){if(we("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Le("AnimationClip: No animation in JSONLoader data."),null;const i=function(h,d,f,p,_){if(f.length!==0){const m=[],g=[];rh(f,m,g,p),m.length!==0&&_.push(new h(d,m,g))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(const _ in f){const m=[],g=[];for(let x=0;x!==d[p].morphTargets.length;++x){const M=d[p];m.push(M.time),g.push(M.morphTarget===_?1:0)}r.push(new $s(".morphTargetInfluence["+_+"]",m,g))}l=f.length*a}else{const f=".bones["+t[h].name+"]";i(js,f+".position",d,"pos",r),i(na,f+".quaternion",d,"rot",r),i(js,f+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,r=e.length;i!==r;++i){const s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function pA(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return $s;case"vector":case"vector2":case"vector3":case"vector4":return js;case"color":return Cg;case"quaternion":return na;case"bool":case"boolean":return as;case"string":return os}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function mA(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=pA(n.type);if(n.times===void 0){const t=[],i=[];rh(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}const Cs={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Lf(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Lf(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Lf(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class gA{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],p=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const _A=new gA;class lr{constructor(e){this.manager=e!==void 0?e:_A,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}lr.DEFAULT_MATERIAL_NAME="__DEFAULT";const ii={};class xA extends Error{constructor(e,t){super(e),this.response=t}}class vA extends lr{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Cs.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(ii[e]!==void 0){ii[e].push({onLoad:t,onProgress:i,onError:r});return}ii[e]=[],ii[e].push({onLoad:t,onProgress:i,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&we("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=ii[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let _=0;const m=new ReadableStream({start(g){x();function x(){h.read().then(({done:M,value:y})=>{if(M)g.close();else{_+=y.byteLength;const w=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let E=0,C=u.length;E<C;E++){const S=u[E];S.onProgress&&S.onProgress(w)}g.enqueue(y),x()}},M=>{g.error(M)})}}});return new Response(m)}else throw new xA(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Cs.add(`file:${e}`,c);const u=ii[e];delete ii[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=ii[e];if(u===void 0)throw this.manager.itemError(e),c;delete ii[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ir=new WeakMap;class SA extends lr{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Cs.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=Ir.get(a);h===void 0&&(h=[],Ir.set(a,h)),h.push({onLoad:t,onError:r})}return a}const o=Ws("img");function l(){u(),t&&t(this);const h=Ir.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}Ir.delete(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),Cs.remove(`image:${e}`);const d=Ir.get(this)||[];for(let f=0;f<d.length;f++){const p=d[f];p.onError&&p.onError(h)}Ir.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Cs.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class Wr extends lr{constructor(e){super(e)}load(e,t,i,r){const s=new Ot,a=new SA(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class Vo extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const kl=new Ae,Df=new D,Ff=new D;class sh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new je(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new Ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new th,this._frameExtents=new je(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Df.setFromMatrixPosition(e.matrixWorld),t.position.copy(Df),Ff.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ff),t.updateMatrixWorld(),kl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Gs||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(kl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ga=new D,Wa=new Nt,kn=new D;class Pg extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=Gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ga,Wa,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ga,Wa,kn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ga,Wa,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ga,Wa,kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ti=new D,Nf=new je,Uf=new je;class sn extends Pg{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qr*2*Math.atan(Math.tan(Vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,Nf,Uf),t.subVectors(Uf,Nf)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class MA extends sh{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=Qr*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class yA extends Vo{constructor(e,t,i=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new MA}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class TA extends sh{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0}}class Of extends Vo{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new TA}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Go extends Pg{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class EA extends sh{constructor(){super(new Go(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lg extends Vo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new EA}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Dg extends Vo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class bA{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Cr=-90,Pr=1;class AA extends St{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new sn(Cr,Pr,e,t);r.layers=this.layers,this.add(r);const s=new sn(Cr,Pr,e,t);s.layers=this.layers,this.add(s);const a=new sn(Cr,Pr,e,t);a.layers=this.layers,this.add(a);const o=new sn(Cr,Pr,e,t);o.layers=this.layers,this.add(o);const l=new sn(Cr,Pr,e,t);l.layers=this.layers,this.add(l);const c=new sn(Cr,Pr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Gn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Gs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class wA extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class RA{constructor(e,t,i){this.binding=e,this.valueSize=i;let r,s,a;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:r=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const i=this.buffer,r=this.valueSize,s=e*r+r;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==r;++o)i[s+o]=i[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(i,s,0,o,r)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,i=this.valueSize,r=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,i=this.buffer,r=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(i,r,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(i,r,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){o.setValue(i,r);break}}saveOriginalState(){const e=this.binding,t=this.buffer,i=this.valueSize,r=i*this._origIndex;e.getValue(t,r);for(let s=i,a=r;s!==a;++s)t[s]=t[r+s%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,r,s){if(r>=.5)for(let a=0;a!==s;++a)e[t+a]=e[i+a]}_slerp(e,t,i,r){Nt.slerpFlat(e,t,e,t,e,i,r)}_slerpAdditive(e,t,i,r,s){const a=this._workIndex*s;Nt.multiplyQuaternionsFlat(e,a,e,t,e,i),Nt.slerpFlat(e,t,e,t,e,a,r)}_lerp(e,t,i,r,s){const a=1-r;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[i+o]*r}}_lerpAdditive(e,t,i,r,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[i+a]*r}}}const ah="\\[\\]\\.:\\/",IA=new RegExp("["+ah+"]","g"),oh="[^"+ah+"]",CA="[^"+ah.replace("\\.","")+"]",PA=/((?:WC+[\/:])*)/.source.replace("WC",oh),LA=/(WCOD+)?/.source.replace("WCOD",CA),DA=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",oh),FA=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",oh),NA=new RegExp("^"+PA+LA+DA+FA+"$"),UA=["material","materials","bones","map"];class OA{constructor(e,t,i){const r=i||Je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class Je{constructor(e,t,i){this.path=t,this.parsedPath=i||Je.parseTrackName(t),this.node=Je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new Je.Composite(e,t,i):new Je(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(IA,"")}static parseTrackName(e){const t=NA.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=i.nodeName.substring(r+1);UA.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=Je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){we("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Le("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Le("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Le("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Le("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Le("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[r];if(a===void 0){const c=t.nodeName;Le("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Je.Composite=OA;Je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Je.prototype.GetterByBindingType=[Je.prototype._getValue_direct,Je.prototype._getValue_array,Je.prototype._getValue_arrayElement,Je.prototype._getValue_toArray];Je.prototype.SetterByBindingTypeAndVersioning=[[Je.prototype._setValue_direct,Je.prototype._setValue_direct_setNeedsUpdate,Je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_array,Je.prototype._setValue_array_setNeedsUpdate,Je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_arrayElement,Je.prototype._setValue_arrayElement_setNeedsUpdate,Je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_fromArray,Je.prototype._setValue_fromArray_setNeedsUpdate,Je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class BA{constructor(e,t,i=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=r;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Br,endingEnd:Br};for(let c=0;c!==a;++c){const u=s[c].createInterpolant(null);o[c]=u,u.settings&&Object.assign(l,u.settings),u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=cg,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i=!1){if(e.fadeOut(t),this.fadeIn(t),i===!0){const r=this._clip.duration,s=e._clip.duration,a=s/r,o=r/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,i=!1){return e.crossFadeFrom(this,t,i)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){const r=this._mixer,s=r.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=r._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+i,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,r){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case ug:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case Ku:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulate(r,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const i=this._weightInterpolant;if(i!==null){const r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const i=this._timeScaleInterpolant;if(i!==null){const r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,i=this.loop;let r=this.time+e,s=this._loopCount;const a=i===PE;if(e===0)return s===-1?r:a&&(s&1)===1?t-r:r;if(i===xo){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),r>=t||r<0){const o=Math.floor(r/t);r-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=r;if(a&&(s&1)===1)return t-r}return r}_setEndings(e,t,i){const r=this._interpolantSettings;i?(r.endingStart=kr,r.endingEnd=kr):(e?r.endingStart=this.zeroSlopeAtStart?kr:Br:r.endingStart=So,t?r.endingEnd=this.zeroSlopeAtEnd?kr:Br:r.endingEnd=So)}_scheduleFading(e,t,i){const r=this._mixer,s=r.time;let a=this._weightInterpolant;a===null&&(a=r._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=i,this}}const kA=new Float32Array(1);class HA extends Fi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const i=e._localRoot||this._root,r=e._clip.tracks,s=r.length,a=e._propertyBindings,o=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==s;++h){const d=r[h],f=d.name;let p=u[f];if(p!==void 0)++p.referenceCount,a[h]=p;else{if(p=a[h],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const _=t&&t._propertyBindings[h].binding.parsedPath;p=new RA(Je.create(i,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[h]=p}o[h].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const i=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,i)}const t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){const s=t[i];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){const s=t[i];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){const r=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=r.length,r.push(e),a.actionByRoot[i]=e}_removeInactiveAction(e){const t=this._actions,i=t[t.length-1],r=e._cacheIndex;i._cacheIndex=r,t[r]=i,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const h=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){const s=t[i];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,i=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_takeBackAction(e){const t=this._actions,i=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_addInactiveBinding(e,t,i){const r=this._bindingsByRootAndName,s=this._bindings;let a=r[t];a===void 0&&(a={},r[t]=a),a[i]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,i=e.binding,r=i.rootNode.uuid,s=i.path,a=this._bindingsByRootAndName,o=a[r],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[r]}_lendBinding(e){const t=this._bindings,i=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_takeBackBinding(e){const t=this._bindings,i=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let i=e[t];return i===void 0&&(i=new Ig(new Float32Array(2),new Float32Array(2),1,kA),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){const t=this._controlInterpolants,i=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=i,t[i]=s}clipAction(e,t,i){const r=t||this._root,s=r.uuid;let a=typeof e=="string"?gu.findByName(r,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(i===void 0&&(a!==null?i=a.blendMode:i=Ku),l!==void 0){const h=l.actionByRoot[s];if(h!==void 0&&h.blendMode===i)return h;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const u=new BA(this,a,t,i);return this._bindAction(u,c),this._addInactiveAction(u,o,s),u}existingAction(e,t){const i=t||this._root,r=i.uuid,s=typeof e=="string"?gu.findByName(i,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[r]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;const t=this._actions,i=this._nActiveActions,r=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(r,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,i=e.uuid,r=this._actionsByClip,s=r[i];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete r[i]}}uncacheRoot(e){const t=e.uuid,i=this._actionsByClip;for(const a in i){const o=i[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}}const Th=class Th{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};Th.prototype.isMatrix2=!0;let Bf=Th;function kf(n,e,t,i){const r=zA(i);switch(t){case og:return n*e;case Gu:return n*e/r.components*r.byteLength;case Wu:return n*e/r.components*r.byteLength;case ar:return n*e*2/r.components*r.byteLength;case Xu:return n*e*2/r.components*r.byteLength;case lg:return n*e*3/r.components*r.byteLength;case fn:return n*e*4/r.components*r.byteLength;case Yu:return n*e*4/r.components*r.byteLength;case io:case ro:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case so:case ao:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Uc:case Bc:return Math.max(n,16)*Math.max(e,8)/4;case Nc:case Oc:return Math.max(n,8)*Math.max(e,8)/2;case kc:case Hc:case Vc:case Gc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case zc:case go:case Wc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Yc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Kc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case qc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case $c:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case jc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Zc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Jc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Qc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case eu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case tu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case nu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case iu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ru:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case su:case au:case ou:return Math.ceil(n/4)*Math.ceil(e/4)*16;case lu:case cu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case _o:case uu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zA(n){switch(n){case hn:case ig:return{byteLength:1,components:1};case Hs:case rg:case hi:return{byteLength:2,components:1};case zu:case Vu:return{byteLength:2,components:4};case Kn:case Hu:case Mn:return{byteLength:4,components:1};case sg:case ag:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ku}}));typeof window<"u"&&(window.__THREE__?we("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ku);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Fg(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function VA(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<h.length;f++){const p=h[d],_=h[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,p=h.length;f<p;f++){const _=h[f];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var GA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,WA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,XA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,YA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$A=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ZA=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,JA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,QA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ew=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tw=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,nw=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,iw=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rw=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,sw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,aw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ow=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lw=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,cw=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,uw=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,hw=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,dw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fw=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,pw=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,mw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_w=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vw="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sw=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,yw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Tw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ew=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Aw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ww=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Iw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Pw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dw=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Nw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Uw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ow=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kw=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zw=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Vw=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Gw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ww=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xw=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Yw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$w=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Qw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eR=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tR=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nR=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,iR=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rR=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sR=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,aR=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,oR=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,lR=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,cR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hR=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,dR=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,fR=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pR=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mR=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gR=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_R=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xR=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,vR=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,SR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,MR=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,TR=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ER=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bR=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,AR=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wR=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,RR=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,IR=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,CR=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,PR=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,LR=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,DR=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,FR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,NR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,UR=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,OR=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,BR=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,HR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,VR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const GR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,WR=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,YR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$R=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ZR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,JR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,QR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,eI=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tI=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nI=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iI=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rI=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sI=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aI=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oI=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,lI=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cI=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,uI=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,hI=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dI=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fI=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pI=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mI=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gI=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_I=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,xI=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vI=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SI=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,MI=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yI=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:GA,alphahash_pars_fragment:WA,alphamap_fragment:XA,alphamap_pars_fragment:YA,alphatest_fragment:KA,alphatest_pars_fragment:qA,aomap_fragment:$A,aomap_pars_fragment:jA,batching_pars_vertex:ZA,batching_vertex:JA,begin_vertex:QA,beginnormal_vertex:ew,bsdfs:tw,iridescence_fragment:nw,bumpmap_pars_fragment:iw,clipping_planes_fragment:rw,clipping_planes_pars_fragment:sw,clipping_planes_pars_vertex:aw,clipping_planes_vertex:ow,color_fragment:lw,color_pars_fragment:cw,color_pars_vertex:uw,color_vertex:hw,common:dw,cube_uv_reflection_fragment:fw,defaultnormal_vertex:pw,displacementmap_pars_vertex:mw,displacementmap_vertex:gw,emissivemap_fragment:_w,emissivemap_pars_fragment:xw,colorspace_fragment:vw,colorspace_pars_fragment:Sw,envmap_fragment:Mw,envmap_common_pars_fragment:yw,envmap_pars_fragment:Tw,envmap_pars_vertex:Ew,envmap_physical_pars_fragment:Nw,envmap_vertex:bw,fog_vertex:Aw,fog_pars_vertex:ww,fog_fragment:Rw,fog_pars_fragment:Iw,gradientmap_pars_fragment:Cw,lightmap_pars_fragment:Pw,lights_lambert_fragment:Lw,lights_lambert_pars_fragment:Dw,lights_pars_begin:Fw,lights_toon_fragment:Uw,lights_toon_pars_fragment:Ow,lights_phong_fragment:Bw,lights_phong_pars_fragment:kw,lights_physical_fragment:Hw,lights_physical_pars_fragment:zw,lights_fragment_begin:Vw,lights_fragment_maps:Gw,lights_fragment_end:Ww,lightprobes_pars_fragment:Xw,logdepthbuf_fragment:Yw,logdepthbuf_pars_fragment:Kw,logdepthbuf_pars_vertex:qw,logdepthbuf_vertex:$w,map_fragment:jw,map_pars_fragment:Zw,map_particle_fragment:Jw,map_particle_pars_fragment:Qw,metalnessmap_fragment:eR,metalnessmap_pars_fragment:tR,morphinstance_vertex:nR,morphcolor_vertex:iR,morphnormal_vertex:rR,morphtarget_pars_vertex:sR,morphtarget_vertex:aR,normal_fragment_begin:oR,normal_fragment_maps:lR,normal_pars_fragment:cR,normal_pars_vertex:uR,normal_vertex:hR,normalmap_pars_fragment:dR,clearcoat_normal_fragment_begin:fR,clearcoat_normal_fragment_maps:pR,clearcoat_pars_fragment:mR,iridescence_pars_fragment:gR,opaque_fragment:_R,packing:xR,premultiplied_alpha_fragment:vR,project_vertex:SR,dithering_fragment:MR,dithering_pars_fragment:yR,roughnessmap_fragment:TR,roughnessmap_pars_fragment:ER,shadowmap_pars_fragment:bR,shadowmap_pars_vertex:AR,shadowmap_vertex:wR,shadowmask_pars_fragment:RR,skinbase_vertex:IR,skinning_pars_vertex:CR,skinning_vertex:PR,skinnormal_vertex:LR,specularmap_fragment:DR,specularmap_pars_fragment:FR,tonemapping_fragment:NR,tonemapping_pars_fragment:UR,transmission_fragment:OR,transmission_pars_fragment:BR,uv_pars_fragment:kR,uv_pars_vertex:HR,uv_vertex:zR,worldpos_vertex:VR,background_vert:GR,background_frag:WR,backgroundCube_vert:XR,backgroundCube_frag:YR,cube_vert:KR,cube_frag:qR,depth_vert:$R,depth_frag:jR,distance_vert:ZR,distance_frag:JR,equirect_vert:QR,equirect_frag:eI,linedashed_vert:tI,linedashed_frag:nI,meshbasic_vert:iI,meshbasic_frag:rI,meshlambert_vert:sI,meshlambert_frag:aI,meshmatcap_vert:oI,meshmatcap_frag:lI,meshnormal_vert:cI,meshnormal_frag:uI,meshphong_vert:hI,meshphong_frag:dI,meshphysical_vert:fI,meshphysical_frag:pI,meshtoon_vert:mI,meshtoon_frag:gI,points_vert:_I,points_frag:xI,shadow_vert:vI,shadow_frag:SI,sprite_vert:MI,sprite_frag:yI},fe={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},zn={basic:{uniforms:tn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:tn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:tn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:tn([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:tn([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:tn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:tn([fe.points,fe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:tn([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:tn([fe.common,fe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:tn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:tn([fe.sprite,fe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:tn([fe.common,fe.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:tn([fe.lights,fe.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};zn.physical={uniforms:tn([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Xa={r:0,b:0,g:0},TI=new Ae,Ng=new Oe;Ng.set(-1,0,0,0,1,0,0,0,1);function EI(n,e,t,i,r,s){const a=new Fe(0);let o=r===!0?0:1,l,c,u=null,h=0,d=null;function f(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const y=x.backgroundBlurriness>0;M=e.get(M,y)}return M}function p(x){let M=!1;const y=f(x);y===null?m(a,o):y&&y.isColor&&(m(y,1),M=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(x,M){const y=f(M);y&&(y.isCubeTexture||y.mapping===ko)?(c===void 0&&(c=new lt(new fi(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:ns(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(TI.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Ng),c.material.toneMapped=Be.getTransfer(y.colorSpace)!==ot,(u!==y||h!==y.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,h=y.version,d=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new lt(new Fn(2,2),new $n({name:"BackgroundMaterial",uniforms:ns(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Be.getTransfer(y.colorSpace)!==ot,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||h!==y.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,h=y.version,d=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,M){x.getRGB(Xa,wg(n)),t.buffers.color.setClear(Xa.r,Xa.g,Xa.b,M,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,M=1){a.set(x),o=M,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(a,o)},render:p,addToRenderList:_,dispose:g}}function bI(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(I,N,W,X,O){let k=!1;const V=h(I,X,W,N);s!==V&&(s=V,c(s.object)),k=f(I,X,W,O),k&&p(I,X,W,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,y(I,N,W,X),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return n.createVertexArray()}function c(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function h(I,N,W,X){const O=X.wireframe===!0;let k=i[N.id];k===void 0&&(k={},i[N.id]=k);const V=I.isInstancedMesh===!0?I.id:0;let Q=k[V];Q===void 0&&(Q={},k[V]=Q);let te=Q[W.id];te===void 0&&(te={},Q[W.id]=te);let ue=te[O];return ue===void 0&&(ue=d(l()),te[O]=ue),ue}function d(I){const N=[],W=[],X=[];for(let O=0;O<t;O++)N[O]=0,W[O]=0,X[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:W,attributeDivisors:X,object:I,attributes:{},index:null}}function f(I,N,W,X){const O=s.attributes,k=N.attributes;let V=0;const Q=W.getAttributes();for(const te in Q)if(Q[te].location>=0){const Me=O[te];let Te=k[te];if(Te===void 0&&(te==="instanceMatrix"&&I.instanceMatrix&&(Te=I.instanceMatrix),te==="instanceColor"&&I.instanceColor&&(Te=I.instanceColor)),Me===void 0||Me.attribute!==Te||Te&&Me.data!==Te.data)return!0;V++}return s.attributesNum!==V||s.index!==X}function p(I,N,W,X){const O={},k=N.attributes;let V=0;const Q=W.getAttributes();for(const te in Q)if(Q[te].location>=0){let Me=k[te];Me===void 0&&(te==="instanceMatrix"&&I.instanceMatrix&&(Me=I.instanceMatrix),te==="instanceColor"&&I.instanceColor&&(Me=I.instanceColor));const Te={};Te.attribute=Me,Me&&Me.data&&(Te.data=Me.data),O[te]=Te,V++}s.attributes=O,s.attributesNum=V,s.index=X}function _(){const I=s.newAttributes;for(let N=0,W=I.length;N<W;N++)I[N]=0}function m(I){g(I,0)}function g(I,N){const W=s.newAttributes,X=s.enabledAttributes,O=s.attributeDivisors;W[I]=1,X[I]===0&&(n.enableVertexAttribArray(I),X[I]=1),O[I]!==N&&(n.vertexAttribDivisor(I,N),O[I]=N)}function x(){const I=s.newAttributes,N=s.enabledAttributes;for(let W=0,X=N.length;W<X;W++)N[W]!==I[W]&&(n.disableVertexAttribArray(W),N[W]=0)}function M(I,N,W,X,O,k,V){V===!0?n.vertexAttribIPointer(I,N,W,O,k):n.vertexAttribPointer(I,N,W,X,O,k)}function y(I,N,W,X){_();const O=X.attributes,k=W.getAttributes(),V=N.defaultAttributeValues;for(const Q in k){const te=k[Q];if(te.location>=0){let ue=O[Q];if(ue===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(ue=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(ue=I.instanceColor)),ue!==void 0){const Me=ue.normalized,Te=ue.itemSize,Ge=e.get(ue);if(Ge===void 0)continue;const rt=Ge.buffer,De=Ge.type,$=Ge.bytesPerElement,he=De===n.INT||De===n.UNSIGNED_INT||ue.gpuType===Hu;if(ue.isInterleavedBufferAttribute){const ie=ue.data,Ce=ie.stride,Ne=ue.offset;if(ie.isInstancedInterleavedBuffer){for(let Pe=0;Pe<te.locationSize;Pe++)g(te.location+Pe,ie.meshPerAttribute);I.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Pe=0;Pe<te.locationSize;Pe++)m(te.location+Pe);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let Pe=0;Pe<te.locationSize;Pe++)M(te.location+Pe,Te/te.locationSize,De,Me,Ce*$,(Ne+Te/te.locationSize*Pe)*$,he)}else{if(ue.isInstancedBufferAttribute){for(let ie=0;ie<te.locationSize;ie++)g(te.location+ie,ue.meshPerAttribute);I.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ie=0;ie<te.locationSize;ie++)m(te.location+ie);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let ie=0;ie<te.locationSize;ie++)M(te.location+ie,Te/te.locationSize,De,Me,Te*$,Te/te.locationSize*ie*$,he)}}else if(V!==void 0){const Me=V[Q];if(Me!==void 0)switch(Me.length){case 2:n.vertexAttrib2fv(te.location,Me);break;case 3:n.vertexAttrib3fv(te.location,Me);break;case 4:n.vertexAttrib4fv(te.location,Me);break;default:n.vertexAttrib1fv(te.location,Me)}}}}x()}function w(){A();for(const I in i){const N=i[I];for(const W in N){const X=N[W];for(const O in X){const k=X[O];for(const V in k)u(k[V].object),delete k[V];delete X[O]}}delete i[I]}}function E(I){if(i[I.id]===void 0)return;const N=i[I.id];for(const W in N){const X=N[W];for(const O in X){const k=X[O];for(const V in k)u(k[V].object),delete k[V];delete X[O]}}delete i[I.id]}function C(I){for(const N in i){const W=i[N];for(const X in W){const O=W[X];if(O[I.id]===void 0)continue;const k=O[I.id];for(const V in k)u(k[V].object),delete k[V];delete O[I.id]}}}function S(I){for(const N in i){const W=i[N],X=I.isInstancedMesh===!0?I.id:0,O=W[X];if(O!==void 0){for(const k in O){const V=O[k];for(const Q in V)u(V[Q].object),delete V[Q];delete O[k]}delete W[X],Object.keys(W).length===0&&delete i[N]}}}function A(){P(),a=!0,s!==r&&(s=r,c(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:S,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function AI(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function wI(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==fn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const S=C===hi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==hn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Mn&&!S)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(we("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&we("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:y,maxSamples:w,samples:E}}function RI(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Yi,o=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||i!==0||r;return r=d,i=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const p=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,g=n.get(h);if(!r||p===null||p.length===0||s&&!m)s?u(null):c();else{const x=s?0:i,M=x*4;let y=g.clippingState||null;l.value=y,y=u(p,d,M,f);for(let w=0;w!==M;++w)y[w]=t[w];g.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,p){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,p!==!0||m===null){const g=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<g)&&(m=new Float32Array(g));for(let M=0,y=f;M!==_;++M,y+=4)a.copy(h[M]).applyMatrix4(x,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const Ri=4,Hf=[.125,.215,.35,.446,.526,.582],ji=20,II=256,Ss=new Go,zf=new Fe;let Hl=null,zl=0,Vl=0,Gl=!1;const CI=new D;class Vf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=CI}=s;Hl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Vl=this._renderer.getActiveMipmapLevel(),Gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Hl,zl,Vl),this._renderer.xr.enabled=Gl,e.scissorTest=!1,Lr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===sr||e.mapping===Jr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Vl=this._renderer.getActiveMipmapLevel(),Gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:hi,format:fn,colorSpace:Mo,depthBuffer:!1},r=Gf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gf(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=PI(s)),this._blurMaterial=DI(s,e,t),this._ggxMaterial=LI(s,e,t)}return r}_compileMaterial(e){const t=new lt(new Kt,e);this._renderer.compile(t,Ss)}_sceneToCubeUV(e,t,i,r,s){const l=new sn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(zf),h.toneMapping=Xn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new lt(new fi,new mn({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let g=!1;const x=e.background;x?x.isColor&&(m.color.copy(x),e.background=null,g=!0):(m.color.copy(zf),g=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));const w=this._cubeSize;Lr(r,y*w,M>2?w:0,w,w),h.setRenderTarget(r),g&&h.render(_,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=x}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===sr||e.mapping===Jr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wf());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Lr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ss)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:p}=this,_=this._sizeLods[i],m=3*_*(i>p-Ri?i-p+Ri:0),g=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,Lr(s,m,g,3*_,2*_),r.setRenderTarget(s),r.render(o,Ss),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,Lr(e,m,g,3*_,2*_),r.setRenderTarget(e),r.render(o,Ss)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Le("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[r];h.material=c;const d=c.uniforms,f=this._sizeLods[i]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ji-1),_=s/p,m=isFinite(s)?1+Math.floor(u*_):ji;m>ji&&we(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ji}`);const g=[];let x=0;for(let C=0;C<ji;++C){const S=C/_,A=Math.exp(-S*S/2);g.push(A),C===0?x+=A:C<m&&(x+=2*A)}for(let C=0;C<g.length;C++)g[C]=g[C]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=p,d.mipInt.value=M-i;const y=this._sizeLods[r],w=3*y*(r>M-Ri?r-M+Ri:0),E=4*(this._cubeSize-y);Lr(t,w,E,3*y,2*y),l.setRenderTarget(t),l.render(h,Ss)}}function PI(n){const e=[],t=[],i=[];let r=n;const s=n-Ri+1+Hf.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-Ri?l=Hf[a-n+Ri-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,p=6,_=3,m=2,g=1,x=new Float32Array(_*p*f),M=new Float32Array(m*p*f),y=new Float32Array(g*p*f);for(let E=0;E<f;E++){const C=E%3*2/3-1,S=E>2?0:-1,A=[C,S,0,C+2/3,S,0,C+2/3,S+1,0,C,S,0,C+2/3,S+1,0,C,S+1,0];x.set(A,_*p*E),M.set(d,m*p*E);const P=[E,E,E,E,E,E];y.set(P,g*p*E)}const w=new Kt;w.setAttribute("position",new En(x,_)),w.setAttribute("uv",new En(M,m)),w.setAttribute("faceIndex",new En(y,g)),i.push(new lt(w,null)),r>Ri&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Gf(n,e,t){const i=new Yn(n,e,t);return i.texture.mapping=ko,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Lr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function LI(n,e,t){return new $n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:II,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Wo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function DI(n,e,t){const i=new Float32Array(ji),r=new D(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Wf(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Xf(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Wo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ug extends Yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Sg(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new fi(5,5,5),s=new $n({name:"CubemapFromEquirect",uniforms:ns(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:an,blending:oi});s.uniforms.tEquirect.value=t;const a=new lt(r,s),o=t.minFilter;return t.minFilter===Qi&&(t.minFilter=Qt),new AA(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function FI(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,f=!1){return d==null?null:f?a(d):s(d)}function s(d){if(d&&d.isTexture){const f=d.mapping;if(f===no||f===ul)if(e.has(d)){const p=e.get(d).texture;return o(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const _=new Ug(p.height);return _.fromEquirectangularTexture(n,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,p=f===no||f===ul,_=f===sr||f===Jr;if(p||_){let m=t.get(d);const g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return i===null&&(i=new Vf(n)),m=p?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const x=d.image;return p&&x&&x.height>0||_&&x&&l(x)?(i===null&&(i=new Vf(n)),m=p?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,f){return f===no?d.mapping=sr:f===ul&&(d.mapping=Jr),d}function l(d){let f=0;const p=6;for(let _=0;_<p;_++)d[_]!==void 0&&f++;return f===p}function c(d){const f=d.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function NI(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&du("WebGLRenderer: "+i+" extension not supported."),r}}}function UI(n,e,t,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete r[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,p=h.attributes.position;let _=0;if(p===void 0)return;if(f!==null){const x=f.array;_=f.version;for(let M=0,y=x.length;M<y;M+=3){const w=x[M+0],E=x[M+1],C=x[M+2];d.push(w,E,E,C,C,w)}}else{const x=p.array;_=p.version;for(let M=0,y=x.length/3-1;M<y;M+=3){const w=M+0,E=M+1,C=M+2;d.push(w,E,E,C,C,w)}}const m=new(p.count>=65535?gg:Ju)(d,1);m.version=_;const g=s.get(h);g&&e.remove(g),s.set(h,m)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function OI(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){n.drawElements(i,d,s,h*a),t.update(d,i,1)}function c(h,d,f){f!==0&&(n.drawElementsInstanced(i,d,s,h*a,f),t.update(d,i,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,f);let _=0;for(let m=0;m<f;m++)_+=d[m];t.update(_,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function BI(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Le("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function kI(n,e,t){const i=new WeakMap,r=new it;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==h){let A=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),p===!0&&(M=2),_===!0&&(M=3);let y=o.attributes.position.count*M,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const E=new Float32Array(y*w*4*h),C=new fg(E,y,w,h);C.type=Mn,C.needsUpdate=!0;const S=M*4;for(let P=0;P<h;P++){const I=m[P],N=g[P],W=x[P],X=y*w*4*P;for(let O=0;O<I.count;O++){const k=O*S;f===!0&&(r.fromBufferAttribute(I,O),E[X+k+0]=r.x,E[X+k+1]=r.y,E[X+k+2]=r.z,E[X+k+3]=0),p===!0&&(r.fromBufferAttribute(N,O),E[X+k+4]=r.x,E[X+k+5]=r.y,E[X+k+6]=r.z,E[X+k+7]=0),_===!0&&(r.fromBufferAttribute(W,O),E[X+k+8]=r.x,E[X+k+9]=r.y,E[X+k+10]=r.z,E[X+k+11]=W.itemSize===4?r.w:1)}}d={count:h,texture:C,size:new je(y,w)},i.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function HI(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const zI={[$m]:"LINEAR_TONE_MAPPING",[jm]:"REINHARD_TONE_MAPPING",[Zm]:"CINEON_TONE_MAPPING",[Jm]:"ACES_FILMIC_TONE_MAPPING",[eg]:"AGX_TONE_MAPPING",[tg]:"NEUTRAL_TONE_MAPPING",[Qm]:"CUSTOM_TONE_MAPPING"};function VI(n,e,t,i,r){const s=new Yn(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new es(e,t):void 0}),a=new Yn(e,t,{type:hi,depthBuffer:!1,stencilBuffer:!1}),o=new Kt;o.setAttribute("position",new Tt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Tt([0,2,0,0,2,0],2));const l=new iA({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new lt(o,l),u=new Go(-1,1,1,-1,0,1);let h=null,d=null,f=!1,p,_=null,m=[],g=!1;this.setSize=function(x,M){s.setSize(x,M),a.setSize(x,M);for(let y=0;y<m.length;y++){const w=m[y];w.setSize&&w.setSize(x,M)}},this.setEffects=function(x){m=x,g=m.length>0&&m[0].isRenderPass===!0;const M=s.width,y=s.height;for(let w=0;w<m.length;w++){const E=m[w];E.setSize&&E.setSize(M,y)}},this.begin=function(x,M){if(f||x.toneMapping===Xn&&m.length===0)return!1;if(_=M,M!==null){const y=M.width,w=M.height;(s.width!==y||s.height!==w)&&this.setSize(y,w)}return g===!1&&x.setRenderTarget(s),p=x.toneMapping,x.toneMapping=Xn,!0},this.hasRenderPass=function(){return g},this.end=function(x,M){x.toneMapping=p,f=!0;let y=s,w=a;for(let E=0;E<m.length;E++){const C=m[E];if(C.enabled!==!1&&(C.render(x,w,y,M),C.needsSwap!==!1)){const S=y;y=w,w=S}}if(h!==x.outputColorSpace||d!==x.toneMapping){h=x.outputColorSpace,d=x.toneMapping,l.defines={},Be.getTransfer(h)===ot&&(l.defines.SRGB_TRANSFER="");const E=zI[d];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(_),x.render(c,u),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const Og=new Ot,_u=new es(1,1),Bg=new fg,kg=new hb,Hg=new Sg,Yf=[],Kf=[],qf=new Float32Array(16),$f=new Float32Array(9),jf=new Float32Array(4);function ls(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Yf[r];if(s===void 0&&(s=new Float32Array(r),Yf[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Ht(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Xo(n,e){let t=Kf[e];t===void 0&&(t=new Int32Array(e),Kf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function GI(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function WI(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2fv(this.addr,e),zt(t,e)}}function XI(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;n.uniform3fv(this.addr,e),zt(t,e)}}function YI(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4fv(this.addr,e),zt(t,e)}}function KI(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Ht(t,i))return;jf.set(i),n.uniformMatrix2fv(this.addr,!1,jf),zt(t,i)}}function qI(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Ht(t,i))return;$f.set(i),n.uniformMatrix3fv(this.addr,!1,$f),zt(t,i)}}function $I(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ht(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Ht(t,i))return;qf.set(i),n.uniformMatrix4fv(this.addr,!1,qf),zt(t,i)}}function jI(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function ZI(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2iv(this.addr,e),zt(t,e)}}function JI(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;n.uniform3iv(this.addr,e),zt(t,e)}}function QI(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4iv(this.addr,e),zt(t,e)}}function e1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function t1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;n.uniform2uiv(this.addr,e),zt(t,e)}}function n1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;n.uniform3uiv(this.addr,e),zt(t,e)}}function i1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;n.uniform4uiv(this.addr,e),zt(t,e)}}function r1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(_u.compareFunction=t.isReversedDepthBuffer()?$u:qu,s=_u):s=Og,t.setTexture2D(e||s,r)}function s1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||kg,r)}function a1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Hg,r)}function o1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Bg,r)}function l1(n){switch(n){case 5126:return GI;case 35664:return WI;case 35665:return XI;case 35666:return YI;case 35674:return KI;case 35675:return qI;case 35676:return $I;case 5124:case 35670:return jI;case 35667:case 35671:return ZI;case 35668:case 35672:return JI;case 35669:case 35673:return QI;case 5125:return e1;case 36294:return t1;case 36295:return n1;case 36296:return i1;case 35678:case 36198:case 36298:case 36306:case 35682:return r1;case 35679:case 36299:case 36307:return s1;case 35680:case 36300:case 36308:case 36293:return a1;case 36289:case 36303:case 36311:case 36292:return o1}}function c1(n,e){n.uniform1fv(this.addr,e)}function u1(n,e){const t=ls(e,this.size,2);n.uniform2fv(this.addr,t)}function h1(n,e){const t=ls(e,this.size,3);n.uniform3fv(this.addr,t)}function d1(n,e){const t=ls(e,this.size,4);n.uniform4fv(this.addr,t)}function f1(n,e){const t=ls(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function p1(n,e){const t=ls(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function m1(n,e){const t=ls(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function g1(n,e){n.uniform1iv(this.addr,e)}function _1(n,e){n.uniform2iv(this.addr,e)}function x1(n,e){n.uniform3iv(this.addr,e)}function v1(n,e){n.uniform4iv(this.addr,e)}function S1(n,e){n.uniform1uiv(this.addr,e)}function M1(n,e){n.uniform2uiv(this.addr,e)}function y1(n,e){n.uniform3uiv(this.addr,e)}function T1(n,e){n.uniform4uiv(this.addr,e)}function E1(n,e,t){const i=this.cache,r=e.length,s=Xo(t,r);Ht(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=_u:a=Og;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function b1(n,e,t){const i=this.cache,r=e.length,s=Xo(t,r);Ht(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||kg,s[a])}function A1(n,e,t){const i=this.cache,r=e.length,s=Xo(t,r);Ht(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Hg,s[a])}function w1(n,e,t){const i=this.cache,r=e.length,s=Xo(t,r);Ht(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Bg,s[a])}function R1(n){switch(n){case 5126:return c1;case 35664:return u1;case 35665:return h1;case 35666:return d1;case 35674:return f1;case 35675:return p1;case 35676:return m1;case 5124:case 35670:return g1;case 35667:case 35671:return _1;case 35668:case 35672:return x1;case 35669:case 35673:return v1;case 5125:return S1;case 36294:return M1;case 36295:return y1;case 36296:return T1;case 35678:case 36198:case 36298:case 36306:case 35682:return E1;case 35679:case 36299:case 36307:return b1;case 35680:case 36300:case 36308:case 36293:return A1;case 36289:case 36303:case 36311:case 36292:return w1}}class I1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=l1(t.type)}}class C1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=R1(t.type)}}class P1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Wl=/(\w+)(\])?(\[|\.)?/g;function Zf(n,e){n.seq.push(e),n.map[e.id]=e}function L1(n,e,t){const i=n.name,r=i.length;for(Wl.lastIndex=0;;){const s=Wl.exec(i),a=Wl.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Zf(t,c===void 0?new I1(o,n,e):new C1(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new P1(o),Zf(t,h)),t=h}}}class oo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);L1(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Jf(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const D1=37297;let F1=0;function N1(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Qf=new Oe;function U1(n){Be._getMatrix(Qf,Be.workingColorSpace,n);const e=`mat3( ${Qf.elements.map(t=>t.toFixed(4))} )`;switch(Be.getTransfer(n)){case yo:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return we("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ep(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+N1(n.getShaderSource(e),o)}else return s}function O1(n,e){const t=U1(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const B1={[$m]:"Linear",[jm]:"Reinhard",[Zm]:"Cineon",[Jm]:"ACESFilmic",[eg]:"AgX",[tg]:"Neutral",[Qm]:"Custom"};function k1(n,e){const t=B1[e];return t===void 0?(we("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ya=new D;function H1(){Be.getLuminanceCoefficients(Ya);const n=Ya.x.toFixed(4),e=Ya.y.toFixed(4),t=Ya.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function z1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ws).join(`
`)}function V1(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function G1(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ws(n){return n!==""}function tp(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function np(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const W1=/^[ \t]*#include +<([\w\d./]+)>/gm;function xu(n){return n.replace(W1,Y1)}const X1=new Map;function Y1(n,e){let t=We[e];if(t===void 0){const i=X1.get(e);if(i!==void 0)t=We[i],we('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return xu(t)}const K1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ip(n){return n.replace(K1,q1)}function q1(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function rp(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const $1={[to]:"SHADOWMAP_TYPE_PCF",[bs]:"SHADOWMAP_TYPE_VSM"};function j1(n){return $1[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Z1={[sr]:"ENVMAP_TYPE_CUBE",[Jr]:"ENVMAP_TYPE_CUBE",[ko]:"ENVMAP_TYPE_CUBE_UV"};function J1(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Z1[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Q1={[Jr]:"ENVMAP_MODE_REFRACTION"};function eC(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Q1[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const tC={[Bo]:"ENVMAP_BLENDING_MULTIPLY",[wE]:"ENVMAP_BLENDING_MIX",[RE]:"ENVMAP_BLENDING_ADD"};function nC(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":tC[n.combine]||"ENVMAP_BLENDING_NONE"}function iC(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function rC(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=j1(t),c=J1(t),u=eC(t),h=nC(t),d=iC(t),f=z1(t),p=V1(s),_=r.createProgram();let m,g,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ws).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ws).join(`
`),g.length>0&&(g+=`
`)):(m=[rp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),g=[rp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?We.tonemapping_pars_fragment:"",t.toneMapping!==Xn?k1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,O1("linearToOutputTexel",t.outputColorSpace),H1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ws).join(`
`)),a=xu(a),a=tp(a,t),a=np(a,t),o=xu(o),o=tp(o,t),o=np(o,t),a=ip(a),o=ip(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Zd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const M=x+m+a,y=x+g+o,w=Jf(r,r.VERTEX_SHADER,M),E=Jf(r,r.FRAGMENT_SHADER,y);r.attachShader(_,w),r.attachShader(_,E),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(I){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(_)||"",W=r.getShaderInfoLog(w)||"",X=r.getShaderInfoLog(E)||"",O=N.trim(),k=W.trim(),V=X.trim();let Q=!0,te=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,w,E);else{const ue=ep(r,w,"vertex"),Me=ep(r,E,"fragment");Le("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+ue+`
`+Me)}else O!==""?we("WebGLProgram: Program Info Log:",O):(k===""||V==="")&&(te=!1);te&&(I.diagnostics={runnable:Q,programLog:O,vertexShader:{log:k,prefix:m},fragmentShader:{log:V,prefix:g}})}r.deleteShader(w),r.deleteShader(E),S=new oo(r,_),A=G1(r,_)}let S;this.getUniforms=function(){return S===void 0&&C(this),S};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(_,D1)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=F1++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=E,this}let sC=0;class aC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new oC(e),t.set(e,i)),i}}class oC{constructor(e){this.id=sC++,this.code=e,this.usedTimes=0}}function lC(n){return n===ar||n===go||n===_o}function cC(n,e,t,i,r,s){const a=new pg,o=new aC,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(S){return l.add(S),S===0?"uv":`uv${S}`}function _(S,A,P,I,N,W){const X=I.fog,O=N.geometry,k=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?I.environment:null,V=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,Q=e.get(S.envMap||k,V),te=Q&&Q.mapping===ko?Q.image.height:null,ue=f[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&we("WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const Me=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Te=Me!==void 0?Me.length:0;let Ge=0;O.morphAttributes.position!==void 0&&(Ge=1),O.morphAttributes.normal!==void 0&&(Ge=2),O.morphAttributes.color!==void 0&&(Ge=3);let rt,De,$,he;if(ue){const ke=zn[ue];rt=ke.vertexShader,De=ke.fragmentShader}else rt=S.vertexShader,De=S.fragmentShader,o.update(S),$=o.getVertexShaderID(S),he=o.getFragmentShaderID(S);const ie=n.getRenderTarget(),Ce=n.state.buffers.depth.getReversed(),Ne=N.isInstancedMesh===!0,Pe=N.isBatchedMesh===!0,_t=!!S.map,Xe=!!S.matcap,ct=!!Q,Mt=!!S.aoMap,qe=!!S.lightMap,Bt=!!S.bumpMap,Et=!!S.normalMap,on=!!S.displacementMap,F=!!S.emissiveMap,kt=!!S.metalnessMap,$e=!!S.roughnessMap,xt=S.anisotropy>0,de=S.clearcoat>0,At=S.dispersion>0,b=S.iridescence>0,v=S.sheen>0,B=S.transmission>0,q=xt&&!!S.anisotropyMap,ee=de&&!!S.clearcoatMap,re=de&&!!S.clearcoatNormalMap,ce=de&&!!S.clearcoatRoughnessMap,Y=b&&!!S.iridescenceMap,j=b&&!!S.iridescenceThicknessMap,ge=v&&!!S.sheenColorMap,ve=v&&!!S.sheenRoughnessMap,oe=!!S.specularMap,se=!!S.specularColorMap,Ue=!!S.specularIntensityMap,Ve=B&&!!S.transmissionMap,tt=B&&!!S.thicknessMap,L=!!S.gradientMap,ae=!!S.alphaMap,K=S.alphaTest>0,_e=!!S.alphaHash,le=!!S.extensions;let J=Xn;S.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(J=n.toneMapping);const be={shaderID:ue,shaderType:S.type,shaderName:S.name,vertexShader:rt,fragmentShader:De,defines:S.defines,customVertexShaderID:$,customFragmentShaderID:he,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Pe,batchingColor:Pe&&N._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&N.instanceColor!==null,instancingMorph:Ne&&N.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Be.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:_t,matcap:Xe,envMap:ct,envMapMode:ct&&Q.mapping,envMapCubeUVHeight:te,aoMap:Mt,lightMap:qe,bumpMap:Bt,normalMap:Et,displacementMap:on,emissiveMap:F,normalMapObjectSpace:Et&&S.normalMapType===DE,normalMapTangentSpace:Et&&S.normalMapType===Vs,packedNormalMap:Et&&S.normalMapType===Vs&&lC(S.normalMap.format),metalnessMap:kt,roughnessMap:$e,anisotropy:xt,anisotropyMap:q,clearcoat:de,clearcoatMap:ee,clearcoatNormalMap:re,clearcoatRoughnessMap:ce,dispersion:At,iridescence:b,iridescenceMap:Y,iridescenceThicknessMap:j,sheen:v,sheenColorMap:ge,sheenRoughnessMap:ve,specularMap:oe,specularColorMap:se,specularIntensityMap:Ue,transmission:B,transmissionMap:Ve,thicknessMap:tt,gradientMap:L,opaque:S.transparent===!1&&S.blending===Ii&&S.alphaToCoverage===!1,alphaMap:ae,alphaTest:K,alphaHash:_e,combine:S.combine,mapUv:_t&&p(S.map.channel),aoMapUv:Mt&&p(S.aoMap.channel),lightMapUv:qe&&p(S.lightMap.channel),bumpMapUv:Bt&&p(S.bumpMap.channel),normalMapUv:Et&&p(S.normalMap.channel),displacementMapUv:on&&p(S.displacementMap.channel),emissiveMapUv:F&&p(S.emissiveMap.channel),metalnessMapUv:kt&&p(S.metalnessMap.channel),roughnessMapUv:$e&&p(S.roughnessMap.channel),anisotropyMapUv:q&&p(S.anisotropyMap.channel),clearcoatMapUv:ee&&p(S.clearcoatMap.channel),clearcoatNormalMapUv:re&&p(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&p(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&p(S.iridescenceMap.channel),iridescenceThicknessMapUv:j&&p(S.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&p(S.sheenColorMap.channel),sheenRoughnessMapUv:ve&&p(S.sheenRoughnessMap.channel),specularMapUv:oe&&p(S.specularMap.channel),specularColorMapUv:se&&p(S.specularColorMap.channel),specularIntensityMapUv:Ue&&p(S.specularIntensityMap.channel),transmissionMapUv:Ve&&p(S.transmissionMap.channel),thicknessMapUv:tt&&p(S.thicknessMap.channel),alphaMapUv:ae&&p(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Et||xt),vertexNormals:!!O.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!O.attributes.uv&&(_t||ae),fog:!!X,useFog:S.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||O.attributes.normal===void 0&&Et===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ce,skinning:N.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Ge,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:J,decodeVideoTexture:_t&&S.map.isVideoTexture===!0&&Be.getTransfer(S.map.colorSpace)===ot,decodeVideoTextureEmissive:F&&S.emissiveMap.isVideoTexture===!0&&Be.getTransfer(S.emissiveMap.colorSpace)===ot,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Jt,flipSided:S.side===an,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:le&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&S.extensions.multiDraw===!0||Pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function m(S){const A=[];if(S.shaderID?A.push(S.shaderID):(A.push(S.customVertexShaderID),A.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)A.push(P),A.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(g(A,S),x(A,S),A.push(n.outputColorSpace)),A.push(S.customProgramCacheKey),A.join()}function g(S,A){S.push(A.precision),S.push(A.outputColorSpace),S.push(A.envMapMode),S.push(A.envMapCubeUVHeight),S.push(A.mapUv),S.push(A.alphaMapUv),S.push(A.lightMapUv),S.push(A.aoMapUv),S.push(A.bumpMapUv),S.push(A.normalMapUv),S.push(A.displacementMapUv),S.push(A.emissiveMapUv),S.push(A.metalnessMapUv),S.push(A.roughnessMapUv),S.push(A.anisotropyMapUv),S.push(A.clearcoatMapUv),S.push(A.clearcoatNormalMapUv),S.push(A.clearcoatRoughnessMapUv),S.push(A.iridescenceMapUv),S.push(A.iridescenceThicknessMapUv),S.push(A.sheenColorMapUv),S.push(A.sheenRoughnessMapUv),S.push(A.specularMapUv),S.push(A.specularColorMapUv),S.push(A.specularIntensityMapUv),S.push(A.transmissionMapUv),S.push(A.thicknessMapUv),S.push(A.combine),S.push(A.fogExp2),S.push(A.sizeAttenuation),S.push(A.morphTargetsCount),S.push(A.morphAttributeCount),S.push(A.numDirLights),S.push(A.numPointLights),S.push(A.numSpotLights),S.push(A.numSpotLightMaps),S.push(A.numHemiLights),S.push(A.numRectAreaLights),S.push(A.numDirLightShadows),S.push(A.numPointLightShadows),S.push(A.numSpotLightShadows),S.push(A.numSpotLightShadowsWithMaps),S.push(A.numLightProbes),S.push(A.shadowMapType),S.push(A.toneMapping),S.push(A.numClippingPlanes),S.push(A.numClipIntersection),S.push(A.depthPacking)}function x(S,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),S.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),S.push(a.mask)}function M(S){const A=f[S.type];let P;if(A){const I=zn[A];P=eA.clone(I.uniforms)}else P=S.uniforms;return P}function y(S,A){let P=u.get(A);return P!==void 0?++P.usedTimes:(P=new rC(n,A,S,r),c.push(P),u.set(A,P)),P}function w(S){if(--S.usedTimes===0){const A=c.indexOf(S);c[A]=c[c.length-1],c.pop(),u.delete(S.cacheKey),S.destroy()}}function E(S){o.remove(S)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:M,acquireProgram:y,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:C}}function uC(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function hC(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function sp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ap(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,_,m,g){let x=n[e];return x===void 0?(x={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:m,group:g},n[e]=x):(x.id=d.id,x.object=d,x.geometry=f,x.material=p,x.materialVariant=a(d),x.groupOrder=_,x.renderOrder=d.renderOrder,x.z=m,x.group=g),e++,x}function l(d,f,p,_,m,g){const x=o(d,f,p,_,m,g);p.transmission>0?i.push(x):p.transparent===!0?r.push(x):t.push(x)}function c(d,f,p,_,m,g){const x=o(d,f,p,_,m,g);p.transmission>0?i.unshift(x):p.transparent===!0?r.unshift(x):t.unshift(x)}function u(d,f){t.length>1&&t.sort(d||hC),i.length>1&&i.sort(f||sp),r.length>1&&r.sort(f||sp)}function h(){for(let d=e,f=n.length;d<f;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:u}}function dC(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new ap,n.set(i,[a])):r>=s.length?(a=new ap,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function fC(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Fe};break;case"SpotLight":t={position:new D,direction:new D,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function pC(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let mC=0;function gC(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function _C(n){const e=new fC,t=pC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);const r=new D,s=new Ae,a=new Ae;function o(c){let u=0,h=0,d=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let f=0,p=0,_=0,m=0,g=0,x=0,M=0,y=0,w=0,E=0,C=0;c.sort(gC);for(let A=0,P=c.length;A<P;A++){const I=c[A],N=I.color,W=I.intensity,X=I.distance;let O=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ar?O=I.shadow.map.texture:O=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=N.r*W,h+=N.g*W,d+=N.b*W;else if(I.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(I.sh.coefficients[k],W);C++}else if(I.isDirectionalLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const V=I.shadow,Q=t.get(I);Q.shadowIntensity=V.intensity,Q.shadowBias=V.bias,Q.shadowNormalBias=V.normalBias,Q.shadowRadius=V.radius,Q.shadowMapSize=V.mapSize,i.directionalShadow[f]=Q,i.directionalShadowMap[f]=O,i.directionalShadowMatrix[f]=I.shadow.matrix,x++}i.directional[f]=k,f++}else if(I.isSpotLight){const k=e.get(I);k.position.setFromMatrixPosition(I.matrixWorld),k.color.copy(N).multiplyScalar(W),k.distance=X,k.coneCos=Math.cos(I.angle),k.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),k.decay=I.decay,i.spot[_]=k;const V=I.shadow;if(I.map&&(i.spotLightMap[w]=I.map,w++,V.updateMatrices(I),I.castShadow&&E++),i.spotLightMatrix[_]=V.matrix,I.castShadow){const Q=t.get(I);Q.shadowIntensity=V.intensity,Q.shadowBias=V.bias,Q.shadowNormalBias=V.normalBias,Q.shadowRadius=V.radius,Q.shadowMapSize=V.mapSize,i.spotShadow[_]=Q,i.spotShadowMap[_]=O,y++}_++}else if(I.isRectAreaLight){const k=e.get(I);k.color.copy(N).multiplyScalar(W),k.halfWidth.set(I.width*.5,0,0),k.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=k,m++}else if(I.isPointLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),k.distance=I.distance,k.decay=I.decay,I.castShadow){const V=I.shadow,Q=t.get(I);Q.shadowIntensity=V.intensity,Q.shadowBias=V.bias,Q.shadowNormalBias=V.normalBias,Q.shadowRadius=V.radius,Q.shadowMapSize=V.mapSize,Q.shadowCameraNear=V.camera.near,Q.shadowCameraFar=V.camera.far,i.pointShadow[p]=Q,i.pointShadowMap[p]=O,i.pointShadowMatrix[p]=I.shadow.matrix,M++}i.point[p]=k,p++}else if(I.isHemisphereLight){const k=e.get(I);k.skyColor.copy(I.color).multiplyScalar(W),k.groundColor.copy(I.groundColor).multiplyScalar(W),i.hemi[g]=k,g++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;const S=i.hash;(S.directionalLength!==f||S.pointLength!==p||S.spotLength!==_||S.rectAreaLength!==m||S.hemiLength!==g||S.numDirectionalShadows!==x||S.numPointShadows!==M||S.numSpotShadows!==y||S.numSpotMaps!==w||S.numLightProbes!==C)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=p,i.hemi.length=g,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=y+w-E,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,S.directionalLength=f,S.pointLength=p,S.spotLength=_,S.rectAreaLength=m,S.hemiLength=g,S.numDirectionalShadows=x,S.numPointShadows=M,S.numSpotShadows=y,S.numSpotMaps=w,S.numLightProbes=C,i.version=mC++)}function l(c,u){let h=0,d=0,f=0,p=0,_=0;const m=u.matrixWorldInverse;for(let g=0,x=c.length;g<x;g++){const M=c[g];if(M.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),h++}else if(M.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const y=i.rectArea[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),a.identity(),s.copy(M.matrixWorld),s.premultiply(m),a.extractRotation(s),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(M.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function op(n){const e=new _C(n),t=[],i=[],r=[];function s(d){h.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function xC(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new op(n),e.set(r,[o])):s>=a.length?(o=new op(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const vC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,SC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,MC=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],yC=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],lp=new Ae,Ms=new D,Xl=new D;function TC(n,e,t){let i=new th;const r=new je,s=new je,a=new it,o=new sA,l=new aA,c={},u=t.maxTextureSize,h={[Pi]:an,[an]:Pi,[Jt]:Jt},d=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:vC,fragmentShader:SC}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new Kt;p.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new lt(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=to;let g=this.type;this.render=function(E,C,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===lE&&(we("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=to);const A=n.getRenderTarget(),P=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),N=n.state;N.setBlending(oi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const W=g!==this.type;W&&C.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(O=>O.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,O=E.length;X<O;X++){const k=E[X],V=k.shadow;if(V===void 0){we("WebGLShadowMap:",k,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const Q=V.getFrameExtents();r.multiply(Q),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,V.mapSize.y=s.y));const te=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=te,V.map===null||W===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===bs){if(k.isPointLight){we("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Yn(r.x,r.y,{format:ar,type:hi,minFilter:Qt,magFilter:Qt,generateMipmaps:!1}),V.map.texture.name=k.name+".shadowMap",V.map.depthTexture=new es(r.x,r.y,Mn),V.map.depthTexture.name=k.name+".shadowMapDepth",V.map.depthTexture.format=di,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xt,V.map.depthTexture.magFilter=Xt}else k.isPointLight?(V.map=new Ug(r.x),V.map.depthTexture=new Lb(r.x,Kn)):(V.map=new Yn(r.x,r.y),V.map.depthTexture=new es(r.x,r.y,Kn)),V.map.depthTexture.name=k.name+".shadowMap",V.map.depthTexture.format=di,this.type===to?(V.map.depthTexture.compareFunction=te?$u:qu,V.map.depthTexture.minFilter=Qt,V.map.depthTexture.magFilter=Qt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xt,V.map.depthTexture.magFilter=Xt);V.camera.updateProjectionMatrix()}const ue=V.map.isWebGLCubeRenderTarget?6:1;for(let Me=0;Me<ue;Me++){if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,Me),n.clear();else{Me===0&&(n.setRenderTarget(V.map),n.clear());const Te=V.getViewport(Me);a.set(s.x*Te.x,s.y*Te.y,s.x*Te.z,s.y*Te.w),N.viewport(a)}if(k.isPointLight){const Te=V.camera,Ge=V.matrix,rt=k.distance||Te.far;rt!==Te.far&&(Te.far=rt,Te.updateProjectionMatrix()),Ms.setFromMatrixPosition(k.matrixWorld),Te.position.copy(Ms),Xl.copy(Te.position),Xl.add(MC[Me]),Te.up.copy(yC[Me]),Te.lookAt(Xl),Te.updateMatrixWorld(),Ge.makeTranslation(-Ms.x,-Ms.y,-Ms.z),lp.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),V._frustum.setFromProjectionMatrix(lp,Te.coordinateSystem,Te.reversedDepth)}else V.updateMatrices(k);i=V.getFrustum(),y(C,S,V.camera,k,this.type)}V.isPointLightShadow!==!0&&this.type===bs&&x(V,S),V.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(A,P,I)};function x(E,C){const S=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Yn(r.x,r.y,{format:ar,type:hi})),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(C,null,S,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(C,null,S,f,_,null)}function M(E,C,S,A){let P=null;const I=S.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)P=I;else if(P=S.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=P.uuid,W=C.uuid;let X=c[N];X===void 0&&(X={},c[N]=X);let O=X[W];O===void 0&&(O=P.clone(),X[W]=O,C.addEventListener("dispose",w)),P=O}if(P.visible=C.visible,P.wireframe=C.wireframe,A===bs?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:h[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,S.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const N=n.properties.get(P);N.light=S}return P}function y(E,C,S,A,P){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===bs)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,E.matrixWorld);const W=e.update(E),X=E.material;if(Array.isArray(X)){const O=W.groups;for(let k=0,V=O.length;k<V;k++){const Q=O[k],te=X[Q.materialIndex];if(te&&te.visible){const ue=M(E,te,A,P);E.onBeforeShadow(n,E,C,S,W,ue,Q),n.renderBufferDirect(S,null,W,ue,E,Q),E.onAfterShadow(n,E,C,S,W,ue,Q)}}}else if(X.visible){const O=M(E,X,A,P);E.onBeforeShadow(n,E,C,S,W,O,null),n.renderBufferDirect(S,null,W,O,E,null),E.onAfterShadow(n,E,C,S,W,O,null)}}const N=E.children;for(let W=0,X=N.length;W<X;W++)y(N[W],C,S,A,P)}function w(E){E.target.removeEventListener("dispose",w);for(const S in c){const A=c[S],P=E.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function EC(n,e){function t(){let L=!1;const ae=new it;let K=null;const _e=new it(0,0,0,0);return{setMask:function(le){K!==le&&!L&&(n.colorMask(le,le,le,le),K=le)},setLocked:function(le){L=le},setClear:function(le,J,be,ke,Rt){Rt===!0&&(le*=ke,J*=ke,be*=ke),ae.set(le,J,be,ke),_e.equals(ae)===!1&&(n.clearColor(le,J,be,ke),_e.copy(ae))},reset:function(){L=!1,K=null,_e.set(-1,0,0,0)}}}function i(){let L=!1,ae=!1,K=null,_e=null,le=null;return{setReversed:function(J){if(ae!==J){const be=e.get("EXT_clip_control");J?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),ae=J;const ke=le;le=null,this.setClear(ke)}},getReversed:function(){return ae},setTest:function(J){J?ie(n.DEPTH_TEST):Ce(n.DEPTH_TEST)},setMask:function(J){K!==J&&!L&&(n.depthMask(J),K=J)},setFunc:function(J){if(ae&&(J=GE[J]),_e!==J){switch(J){case wc:n.depthFunc(n.NEVER);break;case Rc:n.depthFunc(n.ALWAYS);break;case Ic:n.depthFunc(n.LESS);break;case Zr:n.depthFunc(n.LEQUAL);break;case Cc:n.depthFunc(n.EQUAL);break;case Pc:n.depthFunc(n.GEQUAL);break;case Lc:n.depthFunc(n.GREATER);break;case Dc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=J}},setLocked:function(J){L=J},setClear:function(J){le!==J&&(le=J,ae&&(J=1-J),n.clearDepth(J))},reset:function(){L=!1,K=null,_e=null,le=null,ae=!1}}}function r(){let L=!1,ae=null,K=null,_e=null,le=null,J=null,be=null,ke=null,Rt=null;return{setTest:function(ut){L||(ut?ie(n.STENCIL_TEST):Ce(n.STENCIL_TEST))},setMask:function(ut){ae!==ut&&!L&&(n.stencilMask(ut),ae=ut)},setFunc:function(ut,Zn,Un){(K!==ut||_e!==Zn||le!==Un)&&(n.stencilFunc(ut,Zn,Un),K=ut,_e=Zn,le=Un)},setOp:function(ut,Zn,Un){(J!==ut||be!==Zn||ke!==Un)&&(n.stencilOp(ut,Zn,Un),J=ut,be=Zn,ke=Un)},setLocked:function(ut){L=ut},setClear:function(ut){Rt!==ut&&(n.clearStencil(ut),Rt=ut)},reset:function(){L=!1,ae=null,K=null,_e=null,le=null,J=null,be=null,ke=null,Rt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,p=[],_=null,m=!1,g=null,x=null,M=null,y=null,w=null,E=null,C=null,S=new Fe(0,0,0),A=0,P=!1,I=null,N=null,W=null,X=null,O=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Q=0;const te=n.getParameter(n.VERSION);te.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(te)[1]),V=Q>=1):te.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),V=Q>=2);let ue=null,Me={};const Te=n.getParameter(n.SCISSOR_BOX),Ge=n.getParameter(n.VIEWPORT),rt=new it().fromArray(Te),De=new it().fromArray(Ge);function $(L,ae,K,_e){const le=new Uint8Array(4),J=n.createTexture();n.bindTexture(L,J),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<K;be++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(ae,0,n.RGBA,1,1,_e,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(ae+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return J}const he={};he[n.TEXTURE_2D]=$(n.TEXTURE_2D,n.TEXTURE_2D,1),he[n.TEXTURE_CUBE_MAP]=$(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[n.TEXTURE_2D_ARRAY]=$(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),he[n.TEXTURE_3D]=$(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(n.DEPTH_TEST),a.setFunc(Zr),Bt(!1),Et(Gd),ie(n.CULL_FACE),Mt(oi);function ie(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function Ce(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Ne(L,ae){return d[L]!==ae?(n.bindFramebuffer(L,ae),d[L]=ae,L===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ae),L===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ae),!0):!1}function Pe(L,ae){let K=p,_e=!1;if(L){K=f.get(ae),K===void 0&&(K=[],f.set(ae,K));const le=L.textures;if(K.length!==le.length||K[0]!==n.COLOR_ATTACHMENT0){for(let J=0,be=le.length;J<be;J++)K[J]=n.COLOR_ATTACHMENT0+J;K.length=le.length,_e=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,_e=!0);_e&&n.drawBuffers(K)}function _t(L){return _!==L?(n.useProgram(L),_=L,!0):!1}const Xe={[$i]:n.FUNC_ADD,[uE]:n.FUNC_SUBTRACT,[hE]:n.FUNC_REVERSE_SUBTRACT};Xe[dE]=n.MIN,Xe[fE]=n.MAX;const ct={[pE]:n.ZERO,[mE]:n.ONE,[gE]:n.SRC_COLOR,[bc]:n.SRC_ALPHA,[yE]:n.SRC_ALPHA_SATURATE,[SE]:n.DST_COLOR,[xE]:n.DST_ALPHA,[_E]:n.ONE_MINUS_SRC_COLOR,[Ac]:n.ONE_MINUS_SRC_ALPHA,[ME]:n.ONE_MINUS_DST_COLOR,[vE]:n.ONE_MINUS_DST_ALPHA,[TE]:n.CONSTANT_COLOR,[EE]:n.ONE_MINUS_CONSTANT_COLOR,[bE]:n.CONSTANT_ALPHA,[AE]:n.ONE_MINUS_CONSTANT_ALPHA};function Mt(L,ae,K,_e,le,J,be,ke,Rt,ut){if(L===oi){m===!0&&(Ce(n.BLEND),m=!1);return}if(m===!1&&(ie(n.BLEND),m=!0),L!==cE){if(L!==g||ut!==P){if((x!==$i||w!==$i)&&(n.blendEquation(n.FUNC_ADD),x=$i,w=$i),ut)switch(L){case Ii:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Wd:n.blendFunc(n.ONE,n.ONE);break;case Xd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Yd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Le("WebGLState: Invalid blending: ",L);break}else switch(L){case Ii:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Wd:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Xd:Le("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yd:Le("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Le("WebGLState: Invalid blending: ",L);break}M=null,y=null,E=null,C=null,S.set(0,0,0),A=0,g=L,P=ut}return}le=le||ae,J=J||K,be=be||_e,(ae!==x||le!==w)&&(n.blendEquationSeparate(Xe[ae],Xe[le]),x=ae,w=le),(K!==M||_e!==y||J!==E||be!==C)&&(n.blendFuncSeparate(ct[K],ct[_e],ct[J],ct[be]),M=K,y=_e,E=J,C=be),(ke.equals(S)===!1||Rt!==A)&&(n.blendColor(ke.r,ke.g,ke.b,Rt),S.copy(ke),A=Rt),g=L,P=!1}function qe(L,ae){L.side===Jt?Ce(n.CULL_FACE):ie(n.CULL_FACE);let K=L.side===an;ae&&(K=!K),Bt(K),L.blending===Ii&&L.transparent===!1?Mt(oi):Mt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const _e=L.stencilWrite;o.setTest(_e),_e&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),F(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):Ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(L){I!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),I=L)}function Et(L){L!==aE?(ie(n.CULL_FACE),L!==N&&(L===Gd?n.cullFace(n.BACK):L===oE?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ce(n.CULL_FACE),N=L}function on(L){L!==W&&(V&&n.lineWidth(L),W=L)}function F(L,ae,K){L?(ie(n.POLYGON_OFFSET_FILL),(X!==ae||O!==K)&&(X=ae,O=K,a.getReversed()&&(ae=-ae),n.polygonOffset(ae,K))):Ce(n.POLYGON_OFFSET_FILL)}function kt(L){L?ie(n.SCISSOR_TEST):Ce(n.SCISSOR_TEST)}function $e(L){L===void 0&&(L=n.TEXTURE0+k-1),ue!==L&&(n.activeTexture(L),ue=L)}function xt(L,ae,K){K===void 0&&(ue===null?K=n.TEXTURE0+k-1:K=ue);let _e=Me[K];_e===void 0&&(_e={type:void 0,texture:void 0},Me[K]=_e),(_e.type!==L||_e.texture!==ae)&&(ue!==K&&(n.activeTexture(K),ue=K),n.bindTexture(L,ae||he[L]),_e.type=L,_e.texture=ae)}function de(){const L=Me[ue];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function At(){try{n.compressedTexImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function v(){try{n.texSubImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function B(){try{n.texSubImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function ee(){try{n.compressedTexSubImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function re(){try{n.texStorage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function ce(){try{n.texStorage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function Y(){try{n.texImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function j(){try{n.texImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function ge(L){return h[L]!==void 0?h[L]:n.getParameter(L)}function ve(L,ae){h[L]!==ae&&(n.pixelStorei(L,ae),h[L]=ae)}function oe(L){rt.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),rt.copy(L))}function se(L){De.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),De.copy(L))}function Ue(L,ae){let K=c.get(ae);K===void 0&&(K=new WeakMap,c.set(ae,K));let _e=K.get(L);_e===void 0&&(_e=n.getUniformBlockIndex(ae,L.name),K.set(L,_e))}function Ve(L,ae){const _e=c.get(ae).get(L);l.get(ae)!==_e&&(n.uniformBlockBinding(ae,_e,L.__bindingPointIndex),l.set(ae,_e))}function tt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},ue=null,Me={},d={},f=new WeakMap,p=[],_=null,m=!1,g=null,x=null,M=null,y=null,w=null,E=null,C=null,S=new Fe(0,0,0),A=0,P=!1,I=null,N=null,W=null,X=null,O=null,rt.set(0,0,n.canvas.width,n.canvas.height),De.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ie,disable:Ce,bindFramebuffer:Ne,drawBuffers:Pe,useProgram:_t,setBlending:Mt,setMaterial:qe,setFlipSided:Bt,setCullFace:Et,setLineWidth:on,setPolygonOffset:F,setScissorTest:kt,activeTexture:$e,bindTexture:xt,unbindTexture:de,compressedTexImage2D:At,compressedTexImage3D:b,texImage2D:Y,texImage3D:j,pixelStorei:ve,getParameter:ge,updateUBOMapping:Ue,uniformBlockBinding:Ve,texStorage2D:re,texStorage3D:ce,texSubImage2D:v,texSubImage3D:B,compressedTexSubImage2D:q,compressedTexSubImage3D:ee,scissor:oe,viewport:se,reset:tt}}function bC(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new je,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,v){return p?new OffscreenCanvas(b,v):Ws("canvas")}function m(b,v,B){let q=1;const ee=At(b);if((ee.width>B||ee.height>B)&&(q=B/Math.max(ee.width,ee.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const re=Math.floor(q*ee.width),ce=Math.floor(q*ee.height);d===void 0&&(d=_(re,ce));const Y=v?_(re,ce):d;return Y.width=re,Y.height=ce,Y.getContext("2d").drawImage(b,0,0,re,ce),we("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+re+"x"+ce+")."),Y}else return"data"in b&&we("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),b;return b}function g(b){return b.generateMipmaps}function x(b){n.generateMipmap(b)}function M(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(b,v,B,q,ee,re=!1){if(b!==null){if(n[b]!==void 0)return n[b];we("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ce;q&&(ce=e.get("EXT_texture_norm16"),ce||we("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=v;if(v===n.RED&&(B===n.FLOAT&&(Y=n.R32F),B===n.HALF_FLOAT&&(Y=n.R16F),B===n.UNSIGNED_BYTE&&(Y=n.R8),B===n.UNSIGNED_SHORT&&ce&&(Y=ce.R16_EXT),B===n.SHORT&&ce&&(Y=ce.R16_SNORM_EXT)),v===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.R8UI),B===n.UNSIGNED_SHORT&&(Y=n.R16UI),B===n.UNSIGNED_INT&&(Y=n.R32UI),B===n.BYTE&&(Y=n.R8I),B===n.SHORT&&(Y=n.R16I),B===n.INT&&(Y=n.R32I)),v===n.RG&&(B===n.FLOAT&&(Y=n.RG32F),B===n.HALF_FLOAT&&(Y=n.RG16F),B===n.UNSIGNED_BYTE&&(Y=n.RG8),B===n.UNSIGNED_SHORT&&ce&&(Y=ce.RG16_EXT),B===n.SHORT&&ce&&(Y=ce.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.RG8UI),B===n.UNSIGNED_SHORT&&(Y=n.RG16UI),B===n.UNSIGNED_INT&&(Y=n.RG32UI),B===n.BYTE&&(Y=n.RG8I),B===n.SHORT&&(Y=n.RG16I),B===n.INT&&(Y=n.RG32I)),v===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),B===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),B===n.UNSIGNED_INT&&(Y=n.RGB32UI),B===n.BYTE&&(Y=n.RGB8I),B===n.SHORT&&(Y=n.RGB16I),B===n.INT&&(Y=n.RGB32I)),v===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),B===n.UNSIGNED_INT&&(Y=n.RGBA32UI),B===n.BYTE&&(Y=n.RGBA8I),B===n.SHORT&&(Y=n.RGBA16I),B===n.INT&&(Y=n.RGBA32I)),v===n.RGB&&(B===n.UNSIGNED_SHORT&&ce&&(Y=ce.RGB16_EXT),B===n.SHORT&&ce&&(Y=ce.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),v===n.RGBA){const j=re?yo:Be.getTransfer(ee);B===n.FLOAT&&(Y=n.RGBA32F),B===n.HALF_FLOAT&&(Y=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Y=j===ot?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ce&&(Y=ce.RGBA16_EXT),B===n.SHORT&&ce&&(Y=ce.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function w(b,v){let B;return b?v===null||v===Kn||v===zs?B=n.DEPTH24_STENCIL8:v===Mn?B=n.DEPTH32F_STENCIL8:v===Hs&&(B=n.DEPTH24_STENCIL8,we("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Kn||v===zs?B=n.DEPTH_COMPONENT24:v===Mn?B=n.DEPTH_COMPONENT32F:v===Hs&&(B=n.DEPTH_COMPONENT16),B}function E(b,v){return g(b)===!0||b.isFramebufferTexture&&b.minFilter!==Xt&&b.minFilter!==Qt?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function C(b){const v=b.target;v.removeEventListener("dispose",C),A(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&h.delete(v)}function S(b){const v=b.target;v.removeEventListener("dispose",S),I(v)}function A(b){const v=i.get(b);if(v.__webglInit===void 0)return;const B=b.source,q=f.get(B);if(q){const ee=q[v.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&P(b),Object.keys(q).length===0&&f.delete(B)}i.remove(b)}function P(b){const v=i.get(b);n.deleteTexture(v.__webglTexture);const B=b.source,q=f.get(B);delete q[v.__cacheKey],a.memory.textures--}function I(b){const v=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let ee=0;ee<v.__webglFramebuffer[q].length;ee++)n.deleteFramebuffer(v.__webglFramebuffer[q][ee]);else n.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)n.deleteFramebuffer(v.__webglFramebuffer[q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=b.textures;for(let q=0,ee=B.length;q<ee;q++){const re=i.get(B[q]);re.__webglTexture&&(n.deleteTexture(re.__webglTexture),a.memory.textures--),i.remove(B[q])}i.remove(b)}let N=0;function W(){N=0}function X(){return N}function O(b){N=b}function k(){const b=N;return b>=r.maxTextures&&we("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),N+=1,b}function V(b){const v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function Q(b,v){const B=i.get(b);if(b.isVideoTexture&&xt(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&B.__version!==b.version){const q=b.image;if(q===null)we("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)we("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(B,b,v);return}}else b.isExternalTexture&&(B.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+v)}function te(b,v){const B=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version){Ce(B,b,v);return}else b.isExternalTexture&&(B.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+v)}function ue(b,v){const B=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version){Ce(B,b,v);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+v)}function Me(b,v){const B=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&B.__version!==b.version){Ne(B,b,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+v)}const Te={[ks]:n.REPEAT,[dn]:n.CLAMP_TO_EDGE,[Fc]:n.MIRRORED_REPEAT},Ge={[Xt]:n.NEAREST,[CE]:n.NEAREST_MIPMAP_NEAREST,[ma]:n.NEAREST_MIPMAP_LINEAR,[Qt]:n.LINEAR,[hl]:n.LINEAR_MIPMAP_NEAREST,[Qi]:n.LINEAR_MIPMAP_LINEAR},rt={[FE]:n.NEVER,[kE]:n.ALWAYS,[NE]:n.LESS,[qu]:n.LEQUAL,[UE]:n.EQUAL,[$u]:n.GEQUAL,[OE]:n.GREATER,[BE]:n.NOTEQUAL};function De(b,v){if(v.type===Mn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Qt||v.magFilter===hl||v.magFilter===ma||v.magFilter===Qi||v.minFilter===Qt||v.minFilter===hl||v.minFilter===ma||v.minFilter===Qi)&&we("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,Te[v.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,Te[v.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,Te[v.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,Ge[v.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,Ge[v.minFilter]),v.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,rt[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Xt||v.minFilter!==ma&&v.minFilter!==Qi||v.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function $(b,v){let B=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",C));const q=v.source;let ee=f.get(q);ee===void 0&&(ee={},f.set(q,ee));const re=V(v);if(re!==b.__cacheKey){ee[re]===void 0&&(ee[re]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),ee[re].usedTimes++;const ce=ee[b.__cacheKey];ce!==void 0&&(ee[b.__cacheKey].usedTimes--,ce.usedTimes===0&&P(v)),b.__cacheKey=re,b.__webglTexture=ee[re].texture}return B}function he(b,v,B){return Math.floor(Math.floor(b/B)/v)}function ie(b,v,B,q){const re=b.updateRanges;if(re.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,B,q,v.data);else{re.sort((ve,oe)=>ve.start-oe.start);let ce=0;for(let ve=1;ve<re.length;ve++){const oe=re[ce],se=re[ve],Ue=oe.start+oe.count,Ve=he(se.start,v.width,4),tt=he(oe.start,v.width,4);se.start<=Ue+1&&Ve===tt&&he(se.start+se.count-1,v.width,4)===Ve?oe.count=Math.max(oe.count,se.start+se.count-oe.start):(++ce,re[ce]=se)}re.length=ce+1;const Y=t.getParameter(n.UNPACK_ROW_LENGTH),j=t.getParameter(n.UNPACK_SKIP_PIXELS),ge=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let ve=0,oe=re.length;ve<oe;ve++){const se=re[ve],Ue=Math.floor(se.start/4),Ve=Math.ceil(se.count/4),tt=Ue%v.width,L=Math.floor(Ue/v.width),ae=Ve,K=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,tt),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,tt,L,ae,K,B,q,v.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Y),t.pixelStorei(n.UNPACK_SKIP_PIXELS,j),t.pixelStorei(n.UNPACK_SKIP_ROWS,ge)}}function Ce(b,v,B){let q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=n.TEXTURE_3D);const ee=$(b,v),re=v.source;t.bindTexture(q,b.__webglTexture,n.TEXTURE0+B);const ce=i.get(re);if(re.version!==ce.__version||ee===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const K=Be.getPrimaries(Be.workingColorSpace),_e=v.colorSpace===Ai?null:Be.getPrimaries(v.colorSpace),le=v.colorSpace===Ai||K===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,le)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let j=m(v.image,!1,r.maxTextureSize);j=de(v,j);const ge=s.convert(v.format,v.colorSpace),ve=s.convert(v.type);let oe=y(v.internalFormat,ge,ve,v.normalized,v.colorSpace,v.isVideoTexture);De(q,v);let se;const Ue=v.mipmaps,Ve=v.isVideoTexture!==!0,tt=ce.__version===void 0||ee===!0,L=re.dataReady,ae=E(v,j);if(v.isDepthTexture)oe=w(v.format===er,v.type),tt&&(Ve?t.texStorage2D(n.TEXTURE_2D,1,oe,j.width,j.height):t.texImage2D(n.TEXTURE_2D,0,oe,j.width,j.height,0,ge,ve,null));else if(v.isDataTexture)if(Ue.length>0){Ve&&tt&&t.texStorage2D(n.TEXTURE_2D,ae,oe,Ue[0].width,Ue[0].height);for(let K=0,_e=Ue.length;K<_e;K++)se=Ue[K],Ve?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,se.width,se.height,ge,ve,se.data):t.texImage2D(n.TEXTURE_2D,K,oe,se.width,se.height,0,ge,ve,se.data);v.generateMipmaps=!1}else Ve?(tt&&t.texStorage2D(n.TEXTURE_2D,ae,oe,j.width,j.height),L&&ie(v,j,ge,ve)):t.texImage2D(n.TEXTURE_2D,0,oe,j.width,j.height,0,ge,ve,j.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ve&&tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ae,oe,Ue[0].width,Ue[0].height,j.depth);for(let K=0,_e=Ue.length;K<_e;K++)if(se=Ue[K],v.format!==fn)if(ge!==null)if(Ve){if(L)if(v.layerUpdates.size>0){const le=kf(se.width,se.height,v.format,v.type);for(const J of v.layerUpdates){const be=se.data.subarray(J*le/se.data.BYTES_PER_ELEMENT,(J+1)*le/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,J,se.width,se.height,1,ge,be)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,se.width,se.height,j.depth,ge,se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,oe,se.width,se.height,j.depth,0,se.data,0,0);else we("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,se.width,se.height,j.depth,ge,ve,se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,oe,se.width,se.height,j.depth,0,ge,ve,se.data)}else{Ve&&tt&&t.texStorage2D(n.TEXTURE_2D,ae,oe,Ue[0].width,Ue[0].height);for(let K=0,_e=Ue.length;K<_e;K++)se=Ue[K],v.format!==fn?ge!==null?Ve?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,se.width,se.height,ge,se.data):t.compressedTexImage2D(n.TEXTURE_2D,K,oe,se.width,se.height,0,se.data):we("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,se.width,se.height,ge,ve,se.data):t.texImage2D(n.TEXTURE_2D,K,oe,se.width,se.height,0,ge,ve,se.data)}else if(v.isDataArrayTexture)if(Ve){if(tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ae,oe,j.width,j.height,j.depth),L)if(v.layerUpdates.size>0){const K=kf(j.width,j.height,v.format,v.type);for(const _e of v.layerUpdates){const le=j.data.subarray(_e*K/j.data.BYTES_PER_ELEMENT,(_e+1)*K/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_e,j.width,j.height,1,ge,ve,le)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ge,ve,j.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,oe,j.width,j.height,j.depth,0,ge,ve,j.data);else if(v.isData3DTexture)Ve?(tt&&t.texStorage3D(n.TEXTURE_3D,ae,oe,j.width,j.height,j.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ge,ve,j.data)):t.texImage3D(n.TEXTURE_3D,0,oe,j.width,j.height,j.depth,0,ge,ve,j.data);else if(v.isFramebufferTexture){if(tt)if(Ve)t.texStorage2D(n.TEXTURE_2D,ae,oe,j.width,j.height);else{let K=j.width,_e=j.height;for(let le=0;le<ae;le++)t.texImage2D(n.TEXTURE_2D,le,oe,K,_e,0,ge,ve,null),K>>=1,_e>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const K=n.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),j.parentNode!==K){K.appendChild(j),h.add(v),K.onpaint=ke=>{const Rt=ke.changedElements;for(const ut of h)Rt.includes(ut.image)&&(ut.needsUpdate=!0)},K.requestPaint();return}const _e=0,le=n.RGBA,J=n.RGBA,be=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,_e,le,J,be,j),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(Ve&&tt){const K=At(Ue[0]);t.texStorage2D(n.TEXTURE_2D,ae,oe,K.width,K.height)}for(let K=0,_e=Ue.length;K<_e;K++)se=Ue[K],Ve?L&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,ge,ve,se):t.texImage2D(n.TEXTURE_2D,K,oe,ge,ve,se);v.generateMipmaps=!1}else if(Ve){if(tt){const K=At(j);t.texStorage2D(n.TEXTURE_2D,ae,oe,K.width,K.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,ve,j)}else t.texImage2D(n.TEXTURE_2D,0,oe,ge,ve,j);g(v)&&x(q),ce.__version=re.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Ne(b,v,B){if(v.image.length!==6)return;const q=$(b,v),ee=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+B);const re=i.get(ee);if(ee.version!==re.__version||q===!0){t.activeTexture(n.TEXTURE0+B);const ce=Be.getPrimaries(Be.workingColorSpace),Y=v.colorSpace===Ai?null:Be.getPrimaries(v.colorSpace),j=v.colorSpace===Ai||ce===Y?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const ge=v.isCompressedTexture||v.image[0].isCompressedTexture,ve=v.image[0]&&v.image[0].isDataTexture,oe=[];for(let J=0;J<6;J++)!ge&&!ve?oe[J]=m(v.image[J],!0,r.maxCubemapSize):oe[J]=ve?v.image[J].image:v.image[J],oe[J]=de(v,oe[J]);const se=oe[0],Ue=s.convert(v.format,v.colorSpace),Ve=s.convert(v.type),tt=y(v.internalFormat,Ue,Ve,v.normalized,v.colorSpace),L=v.isVideoTexture!==!0,ae=re.__version===void 0||q===!0,K=ee.dataReady;let _e=E(v,se);De(n.TEXTURE_CUBE_MAP,v);let le;if(ge){L&&ae&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,tt,se.width,se.height);for(let J=0;J<6;J++){le=oe[J].mipmaps;for(let be=0;be<le.length;be++){const ke=le[be];v.format!==fn?Ue!==null?L?K&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,ke.width,ke.height,Ue,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,tt,ke.width,ke.height,0,ke.data):we("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,ke.width,ke.height,Ue,Ve,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,tt,ke.width,ke.height,0,Ue,Ve,ke.data)}}}else{if(le=v.mipmaps,L&&ae){le.length>0&&_e++;const J=At(oe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,tt,J.width,J.height)}for(let J=0;J<6;J++)if(ve){L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,oe[J].width,oe[J].height,Ue,Ve,oe[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,tt,oe[J].width,oe[J].height,0,Ue,Ve,oe[J].data);for(let be=0;be<le.length;be++){const Rt=le[be].image[J].image;L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,Rt.width,Rt.height,Ue,Ve,Rt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,tt,Rt.width,Rt.height,0,Ue,Ve,Rt.data)}}else{L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ue,Ve,oe[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,tt,Ue,Ve,oe[J]);for(let be=0;be<le.length;be++){const ke=le[be];L?K&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,Ue,Ve,ke.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,tt,Ue,Ve,ke.image[J])}}}g(v)&&x(n.TEXTURE_CUBE_MAP),re.__version=ee.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Pe(b,v,B,q,ee,re){const ce=s.convert(B.format,B.colorSpace),Y=s.convert(B.type),j=y(B.internalFormat,ce,Y,B.normalized,B.colorSpace),ge=i.get(v),ve=i.get(B);if(ve.__renderTarget=v,!ge.__hasExternalTextures){const oe=Math.max(1,v.width>>re),se=Math.max(1,v.height>>re);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,re,j,oe,se,v.depth,0,ce,Y,null):t.texImage2D(ee,re,j,oe,se,0,ce,Y,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),$e(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,ee,ve.__webglTexture,0,kt(v)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,ee,ve.__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function _t(b,v,B){if(n.bindRenderbuffer(n.RENDERBUFFER,b),v.depthBuffer){const q=v.depthTexture,ee=q&&q.isDepthTexture?q.type:null,re=w(v.stencilBuffer,ee),ce=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;$e(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,kt(v),re,v.width,v.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,kt(v),re,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,re,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,b)}else{const q=v.textures;for(let ee=0;ee<q.length;ee++){const re=q[ee],ce=s.convert(re.format,re.colorSpace),Y=s.convert(re.type),j=y(re.internalFormat,ce,Y,re.normalized,re.colorSpace);$e(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,kt(v),j,v.width,v.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,kt(v),j,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,j,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Xe(b,v,B){const q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=i.get(v.depthTexture);if(ee.__renderTarget=v,(!ee.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),q){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),ee.__webglTexture===void 0){ee.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),De(n.TEXTURE_CUBE_MAP,v.depthTexture);const ge=s.convert(v.depthTexture.format),ve=s.convert(v.depthTexture.type);let oe;v.depthTexture.format===di?oe=n.DEPTH_COMPONENT24:v.depthTexture.format===er&&(oe=n.DEPTH24_STENCIL8);for(let se=0;se<6;se++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,oe,v.width,v.height,0,ge,ve,null)}}else Q(v.depthTexture,0);const re=ee.__webglTexture,ce=kt(v),Y=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,j=v.depthTexture.format===er?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===di)$e(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,Y,re,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,j,Y,re,0);else if(v.depthTexture.format===er)$e(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,Y,re,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,j,Y,re,0);else throw new Error("Unknown depthTexture format")}function ct(b){const v=i.get(b),B=b.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==b.depthTexture){const q=b.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const ee=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",ee)};q.addEventListener("dispose",ee),v.__depthDisposeCallback=ee}v.__boundDepthTexture=q}if(b.depthTexture&&!v.__autoAllocateDepthBuffer)if(B)for(let q=0;q<6;q++)Xe(v.__webglFramebuffer[q],b,q);else{const q=b.texture.mipmaps;q&&q.length>0?Xe(v.__webglFramebuffer[0],b,0):Xe(v.__webglFramebuffer,b,0)}else if(B){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=n.createRenderbuffer(),_t(v.__webglDepthbuffer[q],b,!1);else{const ee=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=v.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,re)}}else{const q=b.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),_t(v.__webglDepthbuffer,b,!1);else{const ee=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,re)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Mt(b,v,B){const q=i.get(b);v!==void 0&&Pe(q.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&ct(b)}function qe(b){const v=b.texture,B=i.get(b),q=i.get(v);b.addEventListener("dispose",S);const ee=b.textures,re=b.isWebGLCubeRenderTarget===!0,ce=ee.length>1;if(ce||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=v.version,a.memory.textures++),re){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let j=0;j<v.mipmaps.length;j++)B.__webglFramebuffer[Y][j]=n.createFramebuffer()}else B.__webglFramebuffer[Y]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<v.mipmaps.length;Y++)B.__webglFramebuffer[Y]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ce)for(let Y=0,j=ee.length;Y<j;Y++){const ge=i.get(ee[Y]);ge.__webglTexture===void 0&&(ge.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&$e(b)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<ee.length;Y++){const j=ee[Y];B.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);const ge=s.convert(j.format,j.colorSpace),ve=s.convert(j.type),oe=y(j.internalFormat,ge,ve,j.normalized,j.colorSpace,b.isXRRenderTarget===!0),se=kt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,se,oe,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Y,n.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),_t(B.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),De(n.TEXTURE_CUBE_MAP,v);for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0)for(let j=0;j<v.mipmaps.length;j++)Pe(B.__webglFramebuffer[Y][j],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,j);else Pe(B.__webglFramebuffer[Y],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);g(v)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let Y=0,j=ee.length;Y<j;Y++){const ge=ee[Y],ve=i.get(ge);let oe=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(oe=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,ve.__webglTexture),De(oe,ge),Pe(B.__webglFramebuffer,b,ge,n.COLOR_ATTACHMENT0+Y,oe,0),g(ge)&&x(oe)}t.unbindTexture()}else{let Y=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Y=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Y,q.__webglTexture),De(Y,v),v.mipmaps&&v.mipmaps.length>0)for(let j=0;j<v.mipmaps.length;j++)Pe(B.__webglFramebuffer[j],b,v,n.COLOR_ATTACHMENT0,Y,j);else Pe(B.__webglFramebuffer,b,v,n.COLOR_ATTACHMENT0,Y,0);g(v)&&x(Y),t.unbindTexture()}b.depthBuffer&&ct(b)}function Bt(b){const v=b.textures;for(let B=0,q=v.length;B<q;B++){const ee=v[B];if(g(ee)){const re=M(b),ce=i.get(ee).__webglTexture;t.bindTexture(re,ce),x(re),t.unbindTexture()}}}const Et=[],on=[];function F(b){if(b.samples>0){if($e(b)===!1){const v=b.textures,B=b.width,q=b.height;let ee=n.COLOR_BUFFER_BIT;const re=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(b),Y=v.length>1;if(Y)for(let ge=0;ge<v.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const j=b.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let ge=0;ge<v.length;ge++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),Y){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[ge]);const ve=i.get(v[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ve,0)}n.blitFramebuffer(0,0,B,q,0,0,B,q,ee,n.NEAREST),l===!0&&(Et.length=0,on.length=0,Et.push(n.COLOR_ATTACHMENT0+ge),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Et.push(re),on.push(re),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,on)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Et))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Y)for(let ge=0;ge<v.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,ce.__webglColorRenderbuffer[ge]);const ve=i.get(v[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,ve,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const v=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function kt(b){return Math.min(r.maxSamples,b.samples)}function $e(b){const v=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function xt(b){const v=a.render.frame;u.get(b)!==v&&(u.set(b,v),b.update())}function de(b,v){const B=b.colorSpace,q=b.format,ee=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||B!==Mo&&B!==Ai&&(Be.getTransfer(B)===ot?(q!==fn||ee!==hn)&&we("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Le("WebGLTextures: Unsupported texture color space:",B)),v}function At(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=W,this.getTextureUnits=X,this.setTextureUnits=O,this.setTexture2D=Q,this.setTexture2DArray=te,this.setTexture3D=ue,this.setTextureCube=Me,this.rebindTextures=Mt,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=Bt,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=ct,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=$e,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function AC(n,e){function t(i,r=Ai){let s;const a=Be.getTransfer(r);if(i===hn)return n.UNSIGNED_BYTE;if(i===zu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Vu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===sg)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ag)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ig)return n.BYTE;if(i===rg)return n.SHORT;if(i===Hs)return n.UNSIGNED_SHORT;if(i===Hu)return n.INT;if(i===Kn)return n.UNSIGNED_INT;if(i===Mn)return n.FLOAT;if(i===hi)return n.HALF_FLOAT;if(i===og)return n.ALPHA;if(i===lg)return n.RGB;if(i===fn)return n.RGBA;if(i===di)return n.DEPTH_COMPONENT;if(i===er)return n.DEPTH_STENCIL;if(i===Gu)return n.RED;if(i===Wu)return n.RED_INTEGER;if(i===ar)return n.RG;if(i===Xu)return n.RG_INTEGER;if(i===Yu)return n.RGBA_INTEGER;if(i===io||i===ro||i===so||i===ao)if(a===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===io)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ro)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===so)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ao)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===io)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ro)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===so)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ao)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Nc||i===Uc||i===Oc||i===Bc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Nc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Uc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Oc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Bc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===kc||i===Hc||i===zc||i===Vc||i===Gc||i===go||i===Wc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===kc||i===Hc)return a===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===zc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Vc)return s.COMPRESSED_R11_EAC;if(i===Gc)return s.COMPRESSED_SIGNED_R11_EAC;if(i===go)return s.COMPRESSED_RG11_EAC;if(i===Wc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Xc||i===Yc||i===Kc||i===qc||i===$c||i===jc||i===Zc||i===Jc||i===Qc||i===eu||i===tu||i===nu||i===iu||i===ru)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Xc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Yc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Kc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===qc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===$c)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===jc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Zc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Jc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Qc)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===eu)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===tu)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===nu)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===iu)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ru)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===su||i===au||i===ou)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===su)return a===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===au)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ou)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===lu||i===cu||i===_o||i===uu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===lu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===cu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_o)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===uu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const wC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,RC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class IC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new yg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new $n({vertexShader:wC,fragmentShader:RC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new lt(new Fn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class CC extends Fi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,p=null;const _=typeof XRWebGLBinding<"u",m=new IC,g={},x=t.getContextAttributes();let M=null,y=null;const w=[],E=[],C=new je;let S=null;const A=new sn;A.viewport=new it;const P=new sn;P.viewport=new it;const I=[A,P],N=new wA;let W=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let he=w[$];return he===void 0&&(he=new xl,w[$]=he),he.getTargetRaySpace()},this.getControllerGrip=function($){let he=w[$];return he===void 0&&(he=new xl,w[$]=he),he.getGripSpace()},this.getHand=function($){let he=w[$];return he===void 0&&(he=new xl,w[$]=he),he.getHandSpace()};function O($){const he=E.indexOf($.inputSource);if(he===-1)return;const ie=w[he];ie!==void 0&&(ie.update($.inputSource,$.frame,c||a),ie.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",V);for(let $=0;$<w.length;$++){const he=E[$];he!==null&&(E[$]=null,w[$].disconnect(he))}W=null,X=null,m.reset();for(const $ in g)delete g[$];e.setRenderTarget(M),f=null,d=null,h=null,r=null,y=null,De.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&we("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&we("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",k),r.addEventListener("inputsourceschange",V),x.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Ce=null,Ne=null;x.depth&&(Ne=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=x.stencil?er:di,Ce=x.stencil?zs:Kn);const Pe={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Pe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Yn(d.textureWidth,d.textureHeight,{format:fn,type:hn,depthTexture:new es(d.textureWidth,d.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ie={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Yn(f.framebufferWidth,f.framebufferHeight,{format:fn,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),De.setContext(r),De.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V($){for(let he=0;he<$.removed.length;he++){const ie=$.removed[he],Ce=E.indexOf(ie);Ce>=0&&(E[Ce]=null,w[Ce].disconnect(ie))}for(let he=0;he<$.added.length;he++){const ie=$.added[he];let Ce=E.indexOf(ie);if(Ce===-1){for(let Pe=0;Pe<w.length;Pe++)if(Pe>=E.length){E.push(ie),Ce=Pe;break}else if(E[Pe]===null){E[Pe]=ie,Ce=Pe;break}if(Ce===-1)break}const Ne=w[Ce];Ne&&Ne.connect(ie)}}const Q=new D,te=new D;function ue($,he,ie){Q.setFromMatrixPosition(he.matrixWorld),te.setFromMatrixPosition(ie.matrixWorld);const Ce=Q.distanceTo(te),Ne=he.projectionMatrix.elements,Pe=ie.projectionMatrix.elements,_t=Ne[14]/(Ne[10]-1),Xe=Ne[14]/(Ne[10]+1),ct=(Ne[9]+1)/Ne[5],Mt=(Ne[9]-1)/Ne[5],qe=(Ne[8]-1)/Ne[0],Bt=(Pe[8]+1)/Pe[0],Et=_t*qe,on=_t*Bt,F=Ce/(-qe+Bt),kt=F*-qe;if(he.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(kt),$.translateZ(F),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ne[10]===-1)$.projectionMatrix.copy(he.projectionMatrix),$.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{const $e=_t+F,xt=Xe+F,de=Et-kt,At=on+(Ce-kt),b=ct*Xe/xt*$e,v=Mt*Xe/xt*$e;$.projectionMatrix.makePerspective(de,At,b,v,$e,xt),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Me($,he){he===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(he.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let he=$.near,ie=$.far;m.texture!==null&&(m.depthNear>0&&(he=m.depthNear),m.depthFar>0&&(ie=m.depthFar)),N.near=P.near=A.near=he,N.far=P.far=A.far=ie,(W!==N.near||X!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),W=N.near,X=N.far),N.layers.mask=$.layers.mask|6,A.layers.mask=N.layers.mask&-5,P.layers.mask=N.layers.mask&-3;const Ce=$.parent,Ne=N.cameras;Me(N,Ce);for(let Pe=0;Pe<Ne.length;Pe++)Me(Ne[Pe],Ce);Ne.length===2?ue(N,A,P):N.projectionMatrix.copy(A.projectionMatrix),Te($,N,Ce)};function Te($,he,ie){ie===null?$.matrix.copy(he.matrixWorld):($.matrix.copy(ie.matrixWorld),$.matrix.invert(),$.matrix.multiply(he.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(he.projectionMatrix),$.projectionMatrixInverse.copy(he.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Qr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function($){return g[$]};let Ge=null;function rt($,he){if(u=he.getViewerPose(c||a),p=he,u!==null){const ie=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ce=!1;ie.length!==N.cameras.length&&(N.cameras.length=0,Ce=!0);for(let Xe=0;Xe<ie.length;Xe++){const ct=ie[Xe];let Mt=null;if(f!==null)Mt=f.getViewport(ct);else{const Bt=h.getViewSubImage(d,ct);Mt=Bt.viewport,Xe===0&&(e.setRenderTargetTextures(y,Bt.colorTexture,Bt.depthStencilTexture),e.setRenderTarget(y))}let qe=I[Xe];qe===void 0&&(qe=new sn,qe.layers.enable(Xe),qe.viewport=new it,I[Xe]=qe),qe.matrix.fromArray(ct.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(ct.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(Mt.x,Mt.y,Mt.width,Mt.height),Xe===0&&(N.matrix.copy(qe.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ce===!0&&N.cameras.push(qe)}const Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){h=i.getBinding();const Xe=h.getDepthInformation(ie[0]);Xe&&Xe.isValid&&Xe.texture&&m.init(Xe,r.renderState)}if(Ne&&Ne.includes("camera-access")&&_){e.state.unbindTexture(),h=i.getBinding();for(let Xe=0;Xe<ie.length;Xe++){const ct=ie[Xe].camera;if(ct){let Mt=g[ct];Mt||(Mt=new yg,g[ct]=Mt);const qe=h.getCameraImage(ct);Mt.sourceTexture=qe}}}}for(let ie=0;ie<w.length;ie++){const Ce=E[ie],Ne=w[ie];Ce!==null&&Ne!==void 0&&Ne.update(Ce,he,c||a)}Ge&&Ge($,he),he.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:he}),p=null}const De=new Fg;De.setAnimationLoop(rt),this.setAnimationLoop=function($){Ge=$},this.dispose=function(){}}}const PC=new Ae,zg=new Oe;zg.set(-1,0,0,0,1,0,0,0,1);function LC(n,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,wg(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,x,M,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(m,g):g.isMeshLambertMaterial?(s(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(m,g),h(m,g)):g.isMeshPhongMaterial?(s(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,y)):g.isMeshMatcapMaterial?(s(m,g),p(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),_(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,x,M):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===an&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===an&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const x=e.get(g),M=x.envMap,y=x.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(PC.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(zg),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,x,M){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*x,m.scale.value=M*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function h(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,x){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===an&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){const x=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function DC(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const y=M.program;i.uniformBlockBinding(x,y)}function c(x,M){let y=r[x.id];y===void 0&&(p(x),y=u(x),r[x.id]=y,x.addEventListener("dispose",m));const w=M.program;i.updateUBOMapping(x,w);const E=e.render.frame;s[x.id]!==E&&(d(x),s[x.id]=E)}function u(x){const M=h();x.__bindingPointIndex=M;const y=n.createBuffer(),w=x.__size,E=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,w,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,y),y}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Le("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const M=r[x.id],y=x.uniforms,w=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let E=0,C=y.length;E<C;E++){const S=Array.isArray(y[E])?y[E]:[y[E]];for(let A=0,P=S.length;A<P;A++){const I=S[A];if(f(I,E,A,w)===!0){const N=I.__offset,W=Array.isArray(I.value)?I.value:[I.value];let X=0;for(let O=0;O<W.length;O++){const k=W[O],V=_(k);typeof k=="number"||typeof k=="boolean"?(I.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,N+X,I.__data)):k.isMatrix3?(I.__data[0]=k.elements[0],I.__data[1]=k.elements[1],I.__data[2]=k.elements[2],I.__data[3]=0,I.__data[4]=k.elements[3],I.__data[5]=k.elements[4],I.__data[6]=k.elements[5],I.__data[7]=0,I.__data[8]=k.elements[6],I.__data[9]=k.elements[7],I.__data[10]=k.elements[8],I.__data[11]=0):ArrayBuffer.isView(k)?I.__data.set(new k.constructor(k.buffer,k.byteOffset,I.__data.length)):(k.toArray(I.__data,X),X+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(x,M,y,w){const E=x.value,C=M+"_"+y;if(w[C]===void 0)return typeof E=="number"||typeof E=="boolean"?w[C]=E:ArrayBuffer.isView(E)?w[C]=E.slice():w[C]=E.clone(),!0;{const S=w[C];if(typeof E=="number"||typeof E=="boolean"){if(S!==E)return w[C]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(S.equals(E)===!1)return S.copy(E),!0}}return!1}function p(x){const M=x.uniforms;let y=0;const w=16;for(let C=0,S=M.length;C<S;C++){const A=Array.isArray(M[C])?M[C]:[M[C]];for(let P=0,I=A.length;P<I;P++){const N=A[P],W=Array.isArray(N.value)?N.value:[N.value];for(let X=0,O=W.length;X<O;X++){const k=W[X],V=_(k),Q=y%w,te=Q%V.boundary,ue=Q+te;y+=te,ue!==0&&w-ue<V.storage&&(y+=w-ue),N.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=V.storage}}}const E=y%w;return E>0&&(y+=w-E),x.__size=y,x.__cache={},this}function _(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?we("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(M.boundary=16,M.storage=x.byteLength):we("WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function g(){for(const x in r)n.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:g}}const FC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Hn=null;function NC(){return Hn===null&&(Hn=new Ho(FC,16,16,ar,hi),Hn.name="DFG_LUT",Hn.minFilter=Qt,Hn.magFilter=Qt,Hn.wrapS=dn,Hn.wrapT=dn,Hn.generateMipmaps=!1,Hn.needsUpdate=!0),Hn}class UC{constructor(e={}){const{canvas:t=zE(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=hn}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const _=f,m=new Set([Yu,Xu,Wu]),g=new Set([hn,Kn,Hs,zs,zu,Vu]),x=new Uint32Array(4),M=new Int32Array(4),y=new D;let w=null,E=null;const C=[],S=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let I=!1,N=null;this._outputColorSpace=et;let W=0,X=0,O=null,k=-1,V=null;const Q=new it,te=new it;let ue=null;const Me=new Fe(0);let Te=0,Ge=t.width,rt=t.height,De=1,$=null,he=null;const ie=new it(0,0,Ge,rt),Ce=new it(0,0,Ge,rt);let Ne=!1;const Pe=new th;let _t=!1,Xe=!1;const ct=new Ae,Mt=new D,qe=new it,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Et=!1;function on(){return O===null?De:1}let F=i;function kt(T,U){return t.getContext(T,U)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ku}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",ke,!1),F===null){const U="webgl2";if(F=kt(U,T),F===null)throw kt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw Le("WebGLRenderer: "+T.message),T}let $e,xt,de,At,b,v,B,q,ee,re,ce,Y,j,ge,ve,oe,se,Ue,Ve,tt,L,ae,K;function _e(){$e=new NI(F),$e.init(),L=new AC(F,$e),xt=new wI(F,$e,e,L),de=new EC(F,$e),xt.reversedDepthBuffer&&d&&de.buffers.depth.setReversed(!0),At=new BI(F),b=new uC,v=new bC(F,$e,de,b,xt,L,At),B=new FI(P),q=new VA(F),ae=new bI(F,q),ee=new UI(F,q,At,ae),re=new HI(F,ee,q,ae,At),Ue=new kI(F,xt,v),ve=new RI(b),ce=new cC(P,B,$e,xt,ae,ve),Y=new LC(P,b),j=new dC,ge=new xC($e),se=new EI(P,B,de,re,p,l),oe=new TC(P,re,xt),K=new DC(F,At,xt,de),Ve=new AI(F,$e,At),tt=new OI(F,$e,At),At.programs=ce.programs,P.capabilities=xt,P.extensions=$e,P.properties=b,P.renderLists=j,P.shadowMap=oe,P.state=de,P.info=At}_e(),_!==hn&&(A=new VI(_,t.width,t.height,r,s));const le=new CC(P,F);this.xr=le,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const T=$e.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=$e.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return De},this.setPixelRatio=function(T){T!==void 0&&(De=T,this.setSize(Ge,rt,!1))},this.getSize=function(T){return T.set(Ge,rt)},this.setSize=function(T,U,G=!0){if(le.isPresenting){we("WebGLRenderer: Can't change size while VR device is presenting.");return}Ge=T,rt=U,t.width=Math.floor(T*De),t.height=Math.floor(U*De),G===!0&&(t.style.width=T+"px",t.style.height=U+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(Ge*De,rt*De).floor()},this.setDrawingBufferSize=function(T,U,G){Ge=T,rt=U,De=G,t.width=Math.floor(T*G),t.height=Math.floor(U*G),this.setViewport(0,0,T,U)},this.setEffects=function(T){if(_===hn){Le("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let U=0;U<T.length;U++)if(T[U].isOutputPass===!0){we("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(Q)},this.getViewport=function(T){return T.copy(ie)},this.setViewport=function(T,U,G,H){T.isVector4?ie.set(T.x,T.y,T.z,T.w):ie.set(T,U,G,H),de.viewport(Q.copy(ie).multiplyScalar(De).round())},this.getScissor=function(T){return T.copy(Ce)},this.setScissor=function(T,U,G,H){T.isVector4?Ce.set(T.x,T.y,T.z,T.w):Ce.set(T,U,G,H),de.scissor(te.copy(Ce).multiplyScalar(De).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(T){de.setScissorTest(Ne=T)},this.setOpaqueSort=function(T){$=T},this.setTransparentSort=function(T){he=T},this.getClearColor=function(T){return T.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor(...arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha(...arguments)},this.clear=function(T=!0,U=!0,G=!0){let H=0;if(T){let z=!1;if(O!==null){const me=O.texture.format;z=m.has(me)}if(z){const me=O.texture.type,Se=g.has(me),pe=se.getClearColor(),Ee=se.getClearAlpha(),Re=pe.r,He=pe.g,Ye=pe.b;Se?(x[0]=Re,x[1]=He,x[2]=Ye,x[3]=Ee,F.clearBufferuiv(F.COLOR,0,x)):(M[0]=Re,M[1]=He,M[2]=Ye,M[3]=Ee,F.clearBufferiv(F.COLOR,0,M))}else H|=F.COLOR_BUFFER_BIT}U&&(H|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),N=T},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),se.dispose(),j.dispose(),ge.dispose(),b.dispose(),B.dispose(),re.dispose(),ae.dispose(),K.dispose(),ce.dispose(),le.dispose(),le.removeEventListener("sessionstart",Eh),le.removeEventListener("sessionend",bh),Bi.stop()};function J(T){T.preventDefault(),Qd("WebGLRenderer: Context Lost."),I=!0}function be(){Qd("WebGLRenderer: Context Restored."),I=!1;const T=At.autoReset,U=oe.enabled,G=oe.autoUpdate,H=oe.needsUpdate,z=oe.type;_e(),At.autoReset=T,oe.enabled=U,oe.autoUpdate=G,oe.needsUpdate=H,oe.type=z}function ke(T){Le("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Rt(T){const U=T.target;U.removeEventListener("dispose",Rt),ut(U)}function ut(T){Zn(T),b.remove(T)}function Zn(T){const U=b.get(T).programs;U!==void 0&&(U.forEach(function(G){ce.releaseProgram(G)}),T.isShaderMaterial&&ce.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,G,H,z,me){U===null&&(U=Bt);const Se=z.isMesh&&z.matrixWorld.determinant()<0,pe=C0(T,U,G,H,z);de.setMaterial(H,Se);let Ee=G.index,Re=1;if(H.wireframe===!0){if(Ee=ee.getWireframeAttribute(G),Ee===void 0)return;Re=2}const He=G.drawRange,Ye=G.attributes.position;let Ie=He.start*Re,ht=(He.start+He.count)*Re;me!==null&&(Ie=Math.max(Ie,me.start*Re),ht=Math.min(ht,(me.start+me.count)*Re)),Ee!==null?(Ie=Math.max(Ie,0),ht=Math.min(ht,Ee.count)):Ye!=null&&(Ie=Math.max(Ie,0),ht=Math.min(ht,Ye.count));const It=ht-Ie;if(It<0||It===1/0)return;ae.setup(z,H,pe,G,Ee);let wt,ft=Ve;if(Ee!==null&&(wt=q.get(Ee),ft=tt,ft.setIndex(wt)),z.isMesh)H.wireframe===!0?(de.setLineWidth(H.wireframeLinewidth*on()),ft.setMode(F.LINES)):ft.setMode(F.TRIANGLES);else if(z.isLine){let qt=H.linewidth;qt===void 0&&(qt=1),de.setLineWidth(qt*on()),z.isLineSegments?ft.setMode(F.LINES):z.isLineLoop?ft.setMode(F.LINE_LOOP):ft.setMode(F.LINE_STRIP)}else z.isPoints?ft.setMode(F.POINTS):z.isSprite&&ft.setMode(F.TRIANGLES);if(z.isBatchedMesh)if($e.get("WEBGL_multi_draw"))ft.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const qt=z._multiDrawStarts,xe=z._multiDrawCounts,ln=z._multiDrawCount,Qe=Ee?q.get(Ee).bytesPerElement:1,gn=b.get(H).currentProgram.getUniforms();for(let On=0;On<ln;On++)gn.setValue(F,"_gl_DrawID",On),ft.render(qt[On]/Qe,xe[On])}else if(z.isInstancedMesh)ft.renderInstances(Ie,It,z.count);else if(G.isInstancedBufferGeometry){const qt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,xe=Math.min(G.instanceCount,qt);ft.renderInstances(Ie,It,xe)}else ft.render(Ie,It)};function Un(T,U,G){T.transparent===!0&&T.side===Jt&&T.forceSinglePass===!1?(T.side=an,T.needsUpdate=!0,oa(T,U,G),T.side=Pi,T.needsUpdate=!0,oa(T,U,G),T.side=Jt):oa(T,U,G)}this.compile=function(T,U,G=null){G===null&&(G=T),E=ge.get(G),E.init(U),S.push(E),G.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(E.pushLight(z),z.castShadow&&E.pushShadow(z))}),T!==G&&T.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(E.pushLight(z),z.castShadow&&E.pushShadow(z))}),E.setupLights();const H=new Set;return T.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const me=z.material;if(me)if(Array.isArray(me))for(let Se=0;Se<me.length;Se++){const pe=me[Se];Un(pe,G,z),H.add(pe)}else Un(me,G,z),H.add(me)}),E=S.pop(),H},this.compileAsync=function(T,U,G=null){const H=this.compile(T,U,G);return new Promise(z=>{function me(){if(H.forEach(function(Se){b.get(Se).currentProgram.isReady()&&H.delete(Se)}),H.size===0){z(T);return}setTimeout(me,10)}$e.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Yo=null;function R0(T){Yo&&Yo(T)}function Eh(){Bi.stop()}function bh(){Bi.start()}const Bi=new Fg;Bi.setAnimationLoop(R0),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(T){Yo=T,le.setAnimationLoop(T),T===null?Bi.stop():Bi.start()},le.addEventListener("sessionstart",Eh),le.addEventListener("sessionend",bh),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){Le("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;N!==null&&N.renderStart(T,U);const G=le.enabled===!0&&le.isPresenting===!0,H=A!==null&&(O===null||G)&&A.begin(P,O);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(U),U=le.getCamera()),T.isScene===!0&&T.onBeforeRender(P,T,U,O),E=ge.get(T,S.length),E.init(U),E.state.textureUnits=v.getTextureUnits(),S.push(E),ct.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Pe.setFromProjectionMatrix(ct,Gn,U.reversedDepth),Xe=this.localClippingEnabled,_t=ve.init(this.clippingPlanes,Xe),w=j.get(T,C.length),w.init(),C.push(w),le.enabled===!0&&le.isPresenting===!0){const Se=P.xr.getDepthSensingMesh();Se!==null&&Ko(Se,U,-1/0,P.sortObjects)}Ko(T,U,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort($,he),Et=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Et&&se.addToRenderList(w,T),this.info.render.frame++,_t===!0&&ve.beginShadows();const z=E.state.shadowsArray;if(oe.render(z,T,U),_t===!0&&ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&A.hasRenderPass())===!1){const Se=w.opaque,pe=w.transmissive;if(E.setupLights(),U.isArrayCamera){const Ee=U.cameras;if(pe.length>0)for(let Re=0,He=Ee.length;Re<He;Re++){const Ye=Ee[Re];wh(Se,pe,T,Ye)}Et&&se.render(T);for(let Re=0,He=Ee.length;Re<He;Re++){const Ye=Ee[Re];Ah(w,T,Ye,Ye.viewport)}}else pe.length>0&&wh(Se,pe,T,U),Et&&se.render(T),Ah(w,T,U)}O!==null&&X===0&&(v.updateMultisampleRenderTarget(O),v.updateRenderTargetMipmap(O)),H&&A.end(P),T.isScene===!0&&T.onAfterRender(P,T,U),ae.resetDefaultState(),k=-1,V=null,S.pop(),S.length>0?(E=S[S.length-1],v.setTextureUnits(E.state.textureUnits),_t===!0&&ve.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,N!==null&&N.renderEnd()};function Ko(T,U,G,H){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Pe.intersectsSprite(T)){H&&qe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ct);const Se=re.update(T),pe=T.material;pe.visible&&w.push(T,Se,pe,G,qe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Pe.intersectsObject(T))){const Se=re.update(T),pe=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),qe.copy(T.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),qe.copy(Se.boundingSphere.center)),qe.applyMatrix4(T.matrixWorld).applyMatrix4(ct)),Array.isArray(pe)){const Ee=Se.groups;for(let Re=0,He=Ee.length;Re<He;Re++){const Ye=Ee[Re],Ie=pe[Ye.materialIndex];Ie&&Ie.visible&&w.push(T,Se,Ie,G,qe.z,Ye)}}else pe.visible&&w.push(T,Se,pe,G,qe.z,null)}}const me=T.children;for(let Se=0,pe=me.length;Se<pe;Se++)Ko(me[Se],U,G,H)}function Ah(T,U,G,H){const{opaque:z,transmissive:me,transparent:Se}=T;E.setupLightsView(G),_t===!0&&ve.setGlobalState(P.clippingPlanes,G),H&&de.viewport(Q.copy(H)),z.length>0&&aa(z,U,G),me.length>0&&aa(me,U,G),Se.length>0&&aa(Se,U,G),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function wh(T,U,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[H.id]===void 0){const Ie=$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[H.id]=new Yn(1,1,{generateMipmaps:!0,type:Ie?hi:hn,minFilter:Qi,samples:Math.max(4,xt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Be.workingColorSpace})}const me=E.state.transmissionRenderTarget[H.id],Se=H.viewport||Q;me.setSize(Se.z*P.transmissionResolutionScale,Se.w*P.transmissionResolutionScale);const pe=P.getRenderTarget(),Ee=P.getActiveCubeFace(),Re=P.getActiveMipmapLevel();P.setRenderTarget(me),P.getClearColor(Me),Te=P.getClearAlpha(),Te<1&&P.setClearColor(16777215,.5),P.clear(),Et&&se.render(G);const He=P.toneMapping;P.toneMapping=Xn;const Ye=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),E.setupLightsView(H),_t===!0&&ve.setGlobalState(P.clippingPlanes,H),aa(T,G,H),v.updateMultisampleRenderTarget(me),v.updateRenderTargetMipmap(me),$e.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ht=0,It=U.length;ht<It;ht++){const wt=U[ht],{object:ft,geometry:qt,material:xe,group:ln}=wt;if(xe.side===Jt&&ft.layers.test(H.layers)){const Qe=xe.side;xe.side=an,xe.needsUpdate=!0,Rh(ft,G,H,qt,xe,ln),xe.side=Qe,xe.needsUpdate=!0,Ie=!0}}Ie===!0&&(v.updateMultisampleRenderTarget(me),v.updateRenderTargetMipmap(me))}P.setRenderTarget(pe,Ee,Re),P.setClearColor(Me,Te),Ye!==void 0&&(H.viewport=Ye),P.toneMapping=He}function aa(T,U,G){const H=U.isScene===!0?U.overrideMaterial:null;for(let z=0,me=T.length;z<me;z++){const Se=T[z],{object:pe,geometry:Ee,group:Re}=Se;let He=Se.material;He.allowOverride===!0&&H!==null&&(He=H),pe.layers.test(G.layers)&&Rh(pe,U,G,Ee,He,Re)}}function Rh(T,U,G,H,z,me){T.onBeforeRender(P,U,G,H,z,me),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(P,U,G,H,T,me),z.transparent===!0&&z.side===Jt&&z.forceSinglePass===!1?(z.side=an,z.needsUpdate=!0,P.renderBufferDirect(G,U,H,z,T,me),z.side=Pi,z.needsUpdate=!0,P.renderBufferDirect(G,U,H,z,T,me),z.side=Jt):P.renderBufferDirect(G,U,H,z,T,me),T.onAfterRender(P,U,G,H,z,me)}function oa(T,U,G){U.isScene!==!0&&(U=Bt);const H=b.get(T),z=E.state.lights,me=E.state.shadowsArray,Se=z.state.version,pe=ce.getParameters(T,z.state,me,U,G,E.state.lightProbeGridArray),Ee=ce.getProgramCacheKey(pe);let Re=H.programs;H.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?U.environment:null,H.fog=U.fog;const He=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;H.envMap=B.get(T.envMap||H.environment,He),H.envMapRotation=H.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,Re===void 0&&(T.addEventListener("dispose",Rt),Re=new Map,H.programs=Re);let Ye=Re.get(Ee);if(Ye!==void 0){if(H.currentProgram===Ye&&H.lightsStateVersion===Se)return Ch(T,pe),Ye}else pe.uniforms=ce.getUniforms(T),N!==null&&T.isNodeMaterial&&N.build(T,G,pe),T.onBeforeCompile(pe,P),Ye=ce.acquireProgram(pe,Ee),Re.set(Ee,Ye),H.uniforms=pe.uniforms;const Ie=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ie.clippingPlanes=ve.uniform),Ch(T,pe),H.needsLights=L0(T),H.lightsStateVersion=Se,H.needsLights&&(Ie.ambientLightColor.value=z.state.ambient,Ie.lightProbe.value=z.state.probe,Ie.directionalLights.value=z.state.directional,Ie.directionalLightShadows.value=z.state.directionalShadow,Ie.spotLights.value=z.state.spot,Ie.spotLightShadows.value=z.state.spotShadow,Ie.rectAreaLights.value=z.state.rectArea,Ie.ltc_1.value=z.state.rectAreaLTC1,Ie.ltc_2.value=z.state.rectAreaLTC2,Ie.pointLights.value=z.state.point,Ie.pointLightShadows.value=z.state.pointShadow,Ie.hemisphereLights.value=z.state.hemi,Ie.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ie.spotLightMatrix.value=z.state.spotLightMatrix,Ie.spotLightMap.value=z.state.spotLightMap,Ie.pointShadowMatrix.value=z.state.pointShadowMatrix),H.lightProbeGrid=E.state.lightProbeGridArray.length>0,H.currentProgram=Ye,H.uniformsList=null,Ye}function Ih(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=oo.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function Ch(T,U){const G=b.get(T);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function I0(T,U){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;y.setFromMatrixPosition(U.matrixWorld);for(let G=0,H=T.length;G<H;G++){const z=T[G];if(z.texture!==null&&z.boundingBox.containsPoint(y))return z}return null}function C0(T,U,G,H,z){U.isScene!==!0&&(U=Bt),v.resetTextureUnits();const me=U.fog,Se=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?U.environment:null,pe=O===null?P.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Be.workingColorSpace,Ee=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Re=B.get(H.envMap||Se,Ee),He=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ye=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!G.morphAttributes.position,ht=!!G.morphAttributes.normal,It=!!G.morphAttributes.color;let wt=Xn;H.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(wt=P.toneMapping);const ft=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,qt=ft!==void 0?ft.length:0,xe=b.get(H),ln=E.state.lights;if(_t===!0&&(Xe===!0||T!==V)){const vt=T===V&&H.id===k;ve.setState(H,T,vt)}let Qe=!1;H.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==ln.state.version||xe.outputColorSpace!==pe||z.isBatchedMesh&&xe.batching===!1||!z.isBatchedMesh&&xe.batching===!0||z.isBatchedMesh&&xe.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&xe.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&xe.instancing===!1||!z.isInstancedMesh&&xe.instancing===!0||z.isSkinnedMesh&&xe.skinning===!1||!z.isSkinnedMesh&&xe.skinning===!0||z.isInstancedMesh&&xe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&xe.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&xe.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&xe.instancingMorph===!1&&z.morphTexture!==null||xe.envMap!==Re||H.fog===!0&&xe.fog!==me||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==ve.numPlanes||xe.numIntersection!==ve.numIntersection)||xe.vertexAlphas!==He||xe.vertexTangents!==Ye||xe.morphTargets!==Ie||xe.morphNormals!==ht||xe.morphColors!==It||xe.toneMapping!==wt||xe.morphTargetsCount!==qt||!!xe.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,xe.__version=H.version);let gn=xe.currentProgram;Qe===!0&&(gn=oa(H,U,z),N&&H.isNodeMaterial&&N.onUpdateProgram(H,gn,xe));let On=!1,pi=!1,fr=!1;const pt=gn.getUniforms(),Ct=xe.uniforms;if(de.useProgram(gn.program)&&(On=!0,pi=!0,fr=!0),H.id!==k&&(k=H.id,pi=!0),xe.needsLights){const vt=I0(E.state.lightProbeGridArray,z);xe.lightProbeGrid!==vt&&(xe.lightProbeGrid=vt,pi=!0)}if(On||V!==T){de.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),pt.setValue(F,"projectionMatrix",T.projectionMatrix),pt.setValue(F,"viewMatrix",T.matrixWorldInverse);const gi=pt.map.cameraPosition;gi!==void 0&&gi.setValue(F,Mt.setFromMatrixPosition(T.matrixWorld)),xt.logarithmicDepthBuffer&&pt.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&pt.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),V!==T&&(V=T,pi=!0,fr=!0)}if(xe.needsLights&&(ln.state.directionalShadowMap.length>0&&pt.setValue(F,"directionalShadowMap",ln.state.directionalShadowMap,v),ln.state.spotShadowMap.length>0&&pt.setValue(F,"spotShadowMap",ln.state.spotShadowMap,v),ln.state.pointShadowMap.length>0&&pt.setValue(F,"pointShadowMap",ln.state.pointShadowMap,v)),z.isSkinnedMesh){pt.setOptional(F,z,"bindMatrix"),pt.setOptional(F,z,"bindMatrixInverse");const vt=z.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),pt.setValue(F,"boneTexture",vt.boneTexture,v))}z.isBatchedMesh&&(pt.setOptional(F,z,"batchingTexture"),pt.setValue(F,"batchingTexture",z._matricesTexture,v),pt.setOptional(F,z,"batchingIdTexture"),pt.setValue(F,"batchingIdTexture",z._indirectTexture,v),pt.setOptional(F,z,"batchingColorTexture"),z._colorsTexture!==null&&pt.setValue(F,"batchingColorTexture",z._colorsTexture,v));const mi=G.morphAttributes;if((mi.position!==void 0||mi.normal!==void 0||mi.color!==void 0)&&Ue.update(z,G,gn),(pi||xe.receiveShadow!==z.receiveShadow)&&(xe.receiveShadow=z.receiveShadow,pt.setValue(F,"receiveShadow",z.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&U.environment!==null&&(Ct.envMapIntensity.value=U.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=NC()),pi){if(pt.setValue(F,"toneMappingExposure",P.toneMappingExposure),xe.needsLights&&P0(Ct,fr),me&&H.fog===!0&&Y.refreshFogUniforms(Ct,me),Y.refreshMaterialUniforms(Ct,H,De,rt,E.state.transmissionRenderTarget[T.id]),xe.needsLights&&xe.lightProbeGrid){const vt=xe.lightProbeGrid;Ct.probesSH.value=vt.texture,Ct.probesMin.value.copy(vt.boundingBox.min),Ct.probesMax.value.copy(vt.boundingBox.max),Ct.probesResolution.value.copy(vt.resolution)}oo.upload(F,Ih(xe),Ct,v)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(oo.upload(F,Ih(xe),Ct,v),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&pt.setValue(F,"center",z.center),pt.setValue(F,"modelViewMatrix",z.modelViewMatrix),pt.setValue(F,"normalMatrix",z.normalMatrix),pt.setValue(F,"modelMatrix",z.matrixWorld),H.uniformsGroups!==void 0){const vt=H.uniformsGroups;for(let gi=0,pr=vt.length;gi<pr;gi++){const Ph=vt[gi];K.update(Ph,gn),K.bind(Ph,gn)}}return gn}function P0(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function L0(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(T,U,G){const H=b.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),b.get(T.texture).__webglTexture=U,b.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:G,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,U){const G=b.get(T);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0};const D0=F.createFramebuffer();this.setRenderTarget=function(T,U=0,G=0){O=T,W=U,X=G;let H=null,z=!1,me=!1;if(T){const pe=b.get(T);if(pe.__useDefaultFramebuffer!==void 0){de.bindFramebuffer(F.FRAMEBUFFER,pe.__webglFramebuffer),Q.copy(T.viewport),te.copy(T.scissor),ue=T.scissorTest,de.viewport(Q),de.scissor(te),de.setScissorTest(ue),k=-1;return}else if(pe.__webglFramebuffer===void 0)v.setupRenderTarget(T);else if(pe.__hasExternalTextures)v.rebindTextures(T,b.get(T.texture).__webglTexture,b.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const He=T.depthTexture;if(pe.__boundDepthTexture!==He){if(He!==null&&b.has(He)&&(T.width!==He.image.width||T.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");v.setupDepthRenderbuffer(T)}}const Ee=T.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(me=!0);const Re=b.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Re[U])?H=Re[U][G]:H=Re[U],z=!0):T.samples>0&&v.useMultisampledRTT(T)===!1?H=b.get(T).__webglMultisampledFramebuffer:Array.isArray(Re)?H=Re[G]:H=Re,Q.copy(T.viewport),te.copy(T.scissor),ue=T.scissorTest}else Q.copy(ie).multiplyScalar(De).floor(),te.copy(Ce).multiplyScalar(De).floor(),ue=Ne;if(G!==0&&(H=D0),de.bindFramebuffer(F.FRAMEBUFFER,H)&&de.drawBuffers(T,H),de.viewport(Q),de.scissor(te),de.setScissorTest(ue),z){const pe=b.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,pe.__webglTexture,G)}else if(me){const pe=U;for(let Ee=0;Ee<T.textures.length;Ee++){const Re=b.get(T.textures[Ee]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ee,Re.__webglTexture,G,pe)}}else if(T!==null&&G!==0){const pe=b.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,pe.__webglTexture,G)}k=-1},this.readRenderTargetPixels=function(T,U,G,H,z,me,Se,pe=0){if(!(T&&T.isWebGLRenderTarget)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=b.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Se!==void 0&&(Ee=Ee[Se]),Ee){de.bindFramebuffer(F.FRAMEBUFFER,Ee);try{const Re=T.textures[pe],He=Re.format,Ye=Re.type;if(T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+pe),!xt.textureFormatReadable(He)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xt.textureTypeReadable(Ye)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-H&&G>=0&&G<=T.height-z&&F.readPixels(U,G,H,z,L.convert(He),L.convert(Ye),me)}finally{const Re=O!==null?b.get(O).__webglFramebuffer:null;de.bindFramebuffer(F.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(T,U,G,H,z,me,Se,pe=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=b.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Se!==void 0&&(Ee=Ee[Se]),Ee)if(U>=0&&U<=T.width-H&&G>=0&&G<=T.height-z){de.bindFramebuffer(F.FRAMEBUFFER,Ee);const Re=T.textures[pe],He=Re.format,Ye=Re.type;if(T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+pe),!xt.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xt.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ie),F.bufferData(F.PIXEL_PACK_BUFFER,me.byteLength,F.STREAM_READ),F.readPixels(U,G,H,z,L.convert(He),L.convert(Ye),0);const ht=O!==null?b.get(O).__webglFramebuffer:null;de.bindFramebuffer(F.FRAMEBUFFER,ht);const It=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await VE(F,It,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ie),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,me),F.deleteBuffer(Ie),F.deleteSync(It),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,U=null,G=0){const H=Math.pow(2,-G),z=Math.floor(T.image.width*H),me=Math.floor(T.image.height*H),Se=U!==null?U.x:0,pe=U!==null?U.y:0;v.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,G,0,0,Se,pe,z,me),de.unbindTexture()};const F0=F.createFramebuffer(),N0=F.createFramebuffer();this.copyTextureToTexture=function(T,U,G=null,H=null,z=0,me=0){let Se,pe,Ee,Re,He,Ye,Ie,ht,It;const wt=T.isCompressedTexture?T.mipmaps[me]:T.image;if(G!==null)Se=G.max.x-G.min.x,pe=G.max.y-G.min.y,Ee=G.isBox3?G.max.z-G.min.z:1,Re=G.min.x,He=G.min.y,Ye=G.isBox3?G.min.z:0;else{const Ct=Math.pow(2,-z);Se=Math.floor(wt.width*Ct),pe=Math.floor(wt.height*Ct),T.isDataArrayTexture?Ee=wt.depth:T.isData3DTexture?Ee=Math.floor(wt.depth*Ct):Ee=1,Re=0,He=0,Ye=0}H!==null?(Ie=H.x,ht=H.y,It=H.z):(Ie=0,ht=0,It=0);const ft=L.convert(U.format),qt=L.convert(U.type);let xe;U.isData3DTexture?(v.setTexture3D(U,0),xe=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(v.setTexture2DArray(U,0),xe=F.TEXTURE_2D_ARRAY):(v.setTexture2D(U,0),xe=F.TEXTURE_2D),de.activeTexture(F.TEXTURE0),de.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),de.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),de.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const ln=de.getParameter(F.UNPACK_ROW_LENGTH),Qe=de.getParameter(F.UNPACK_IMAGE_HEIGHT),gn=de.getParameter(F.UNPACK_SKIP_PIXELS),On=de.getParameter(F.UNPACK_SKIP_ROWS),pi=de.getParameter(F.UNPACK_SKIP_IMAGES);de.pixelStorei(F.UNPACK_ROW_LENGTH,wt.width),de.pixelStorei(F.UNPACK_IMAGE_HEIGHT,wt.height),de.pixelStorei(F.UNPACK_SKIP_PIXELS,Re),de.pixelStorei(F.UNPACK_SKIP_ROWS,He),de.pixelStorei(F.UNPACK_SKIP_IMAGES,Ye);const fr=T.isDataArrayTexture||T.isData3DTexture,pt=U.isDataArrayTexture||U.isData3DTexture;if(T.isDepthTexture){const Ct=b.get(T),mi=b.get(U),vt=b.get(Ct.__renderTarget),gi=b.get(mi.__renderTarget);de.bindFramebuffer(F.READ_FRAMEBUFFER,vt.__webglFramebuffer),de.bindFramebuffer(F.DRAW_FRAMEBUFFER,gi.__webglFramebuffer);for(let pr=0;pr<Ee;pr++)fr&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,b.get(T).__webglTexture,z,Ye+pr),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,b.get(U).__webglTexture,me,It+pr)),F.blitFramebuffer(Re,He,Se,pe,Ie,ht,Se,pe,F.DEPTH_BUFFER_BIT,F.NEAREST);de.bindFramebuffer(F.READ_FRAMEBUFFER,null),de.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(z!==0||T.isRenderTargetTexture||b.has(T)){const Ct=b.get(T),mi=b.get(U);de.bindFramebuffer(F.READ_FRAMEBUFFER,F0),de.bindFramebuffer(F.DRAW_FRAMEBUFFER,N0);for(let vt=0;vt<Ee;vt++)fr?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ct.__webglTexture,z,Ye+vt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ct.__webglTexture,z),pt?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,mi.__webglTexture,me,It+vt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,mi.__webglTexture,me),z!==0?F.blitFramebuffer(Re,He,Se,pe,Ie,ht,Se,pe,F.COLOR_BUFFER_BIT,F.NEAREST):pt?F.copyTexSubImage3D(xe,me,Ie,ht,It+vt,Re,He,Se,pe):F.copyTexSubImage2D(xe,me,Ie,ht,Re,He,Se,pe);de.bindFramebuffer(F.READ_FRAMEBUFFER,null),de.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else pt?T.isDataTexture||T.isData3DTexture?F.texSubImage3D(xe,me,Ie,ht,It,Se,pe,Ee,ft,qt,wt.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(xe,me,Ie,ht,It,Se,pe,Ee,ft,wt.data):F.texSubImage3D(xe,me,Ie,ht,It,Se,pe,Ee,ft,qt,wt):T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,me,Ie,ht,Se,pe,ft,qt,wt.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,me,Ie,ht,wt.width,wt.height,ft,wt.data):F.texSubImage2D(F.TEXTURE_2D,me,Ie,ht,Se,pe,ft,qt,wt);de.pixelStorei(F.UNPACK_ROW_LENGTH,ln),de.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Qe),de.pixelStorei(F.UNPACK_SKIP_PIXELS,gn),de.pixelStorei(F.UNPACK_SKIP_ROWS,On),de.pixelStorei(F.UNPACK_SKIP_IMAGES,pi),me===0&&U.generateMipmaps&&F.generateMipmap(xe),de.unbindTexture()},this.initRenderTarget=function(T){b.get(T).__webglFramebuffer===void 0&&v.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?v.setTextureCube(T,0):T.isData3DTexture?v.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?v.setTexture2DArray(T,0):v.setTexture2D(T,0),de.unbindTexture()},this.resetState=function(){W=0,X=0,O=null,de.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Be._getDrawingBufferColorSpace(e),t.unpackColorSpace=Be._getUnpackColorSpace()}}const Vg=10.8;function lh(n,e={}){const t=Number.isFinite(n)&&n>0?n:1,i=Number.isFinite(e.viewScale)&&e.viewScale!=null&&e.viewScale>0?e.viewScale:1,r=Vg/2,s=r/t,a=r*2/i,o=s*2/i;return e.anchor==="topLeft"?{left:-r,right:-r+a,top:s,bottom:s-o}:{left:-a/2,right:a/2,top:o/2,bottom:-o/2}}class OC{apply(e,t,i,r={}){const s=lh(i,r);e.left=s.left,e.right=s.right,e.top=s.top,e.bottom=s.bottom,e.position.set(t.position.x,t.position.y,t.position.z),t.target!=null&&e.lookAt(t.target.x,t.target.y,t.target.z),e.updateProjectionMatrix()}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var Sn=Uint8Array,Hr=Uint16Array,BC=Int32Array,Gg=new Sn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Wg=new Sn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),kC=new Sn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Xg=function(n,e){for(var t=new Hr(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var r=new BC(t[30]),i=1;i<30;++i)for(var s=t[i];s<t[i+1];++s)r[s]=s-t[i]<<5|i;return{b:t,r}},Yg=Xg(Gg,2),Kg=Yg.b,HC=Yg.r;Kg[28]=258,HC[258]=28;var zC=Xg(Wg,0),VC=zC.b,vu=new Hr(32768);for(var yt=0;yt<32768;++yt){var Ei=(yt&43690)>>1|(yt&21845)<<1;Ei=(Ei&52428)>>2|(Ei&13107)<<2,Ei=(Ei&61680)>>4|(Ei&3855)<<4,vu[yt]=((Ei&65280)>>8|(Ei&255)<<8)>>1}var Ps=(function(n,e,t){for(var i=n.length,r=0,s=new Hr(e);r<i;++r)n[r]&&++s[n[r]-1];var a=new Hr(e);for(r=1;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new Hr(1<<e);var l=15-e;for(r=0;r<i;++r)if(n[r])for(var c=r<<4|n[r],u=e-n[r],h=a[n[r]-1]++<<u,d=h|(1<<u)-1;h<=d;++h)o[vu[h]>>l]=c}else for(o=new Hr(i),r=0;r<i;++r)n[r]&&(o[r]=vu[a[n[r]-1]++]>>15-n[r]);return o}),ia=new Sn(288);for(var yt=0;yt<144;++yt)ia[yt]=8;for(var yt=144;yt<256;++yt)ia[yt]=9;for(var yt=256;yt<280;++yt)ia[yt]=7;for(var yt=280;yt<288;++yt)ia[yt]=8;var qg=new Sn(32);for(var yt=0;yt<32;++yt)qg[yt]=5;var GC=Ps(ia,9,1),WC=Ps(qg,5,1),Yl=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},Pn=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},Kl=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},XC=function(n){return(n+7)/8|0},YC=function(n,e,t){return(t==null||t>n.length)&&(t=n.length),new Sn(n.subarray(e,t))},KC=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ln=function(n,e,t){var i=new Error(e||KC[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,Ln),!t)throw i;return i},qC=function(n,e,t,i){var r=n.length,s=0;if(!r||e.f&&!e.l)return t||new Sn(0);var a=!t,o=a||e.i!=2,l=e.i;a&&(t=new Sn(r*3));var c=function(Pe){var _t=t.length;if(Pe>_t){var Xe=new Sn(Math.max(_t*2,Pe));Xe.set(t),t=Xe}},u=e.f||0,h=e.p||0,d=e.b||0,f=e.l,p=e.d,_=e.m,m=e.n,g=r*8;do{if(!f){u=Pn(n,h,1);var x=Pn(n,h+1,3);if(h+=3,x)if(x==1)f=GC,p=WC,_=9,m=5;else if(x==2){var E=Pn(n,h,31)+257,C=Pn(n,h+10,15)+4,S=E+Pn(n,h+5,31)+1;h+=14;for(var A=new Sn(S),P=new Sn(19),I=0;I<C;++I)P[kC[I]]=Pn(n,h+I*3,7);h+=C*3;for(var N=Yl(P),W=(1<<N)-1,X=Ps(P,N,1),I=0;I<S;){var O=X[Pn(n,h,W)];h+=O&15;var M=O>>4;if(M<16)A[I++]=M;else{var k=0,V=0;for(M==16?(V=3+Pn(n,h,3),h+=2,k=A[I-1]):M==17?(V=3+Pn(n,h,7),h+=3):M==18&&(V=11+Pn(n,h,127),h+=7);V--;)A[I++]=k}}var Q=A.subarray(0,E),te=A.subarray(E);_=Yl(Q),m=Yl(te),f=Ps(Q,_,1),p=Ps(te,m,1)}else Ln(1);else{var M=XC(h)+4,y=n[M-4]|n[M-3]<<8,w=M+y;if(w>r){l&&Ln(0);break}o&&c(d+y),t.set(n.subarray(M,w),d),e.b=d+=y,e.p=h=w*8,e.f=u;continue}if(h>g){l&&Ln(0);break}}o&&c(d+131072);for(var ue=(1<<_)-1,Me=(1<<m)-1,Te=h;;Te=h){var k=f[Kl(n,h)&ue],Ge=k>>4;if(h+=k&15,h>g){l&&Ln(0);break}if(k||Ln(2),Ge<256)t[d++]=Ge;else if(Ge==256){Te=h,f=null;break}else{var rt=Ge-254;if(Ge>264){var I=Ge-257,De=Gg[I];rt=Pn(n,h,(1<<De)-1)+Kg[I],h+=De}var $=p[Kl(n,h)&Me],he=$>>4;$||Ln(3),h+=$&15;var te=VC[he];if(he>3){var De=Wg[he];te+=Kl(n,h)&(1<<De)-1,h+=De}if(h>g){l&&Ln(0);break}o&&c(d+131072);var ie=d+rt;if(d<te){var Ce=s-te,Ne=Math.min(te,ie);for(Ce+d<0&&Ln(3);d<Ne;++d)t[d]=i[Ce+d]}for(;d<ie;++d)t[d]=t[d-te]}}e.l=f,e.p=Te,e.b=d,e.f=u,f&&(u=1,e.m=_,e.d=p,e.n=m)}while(!u);return d!=t.length&&a?YC(t,0,d):t.subarray(0,d)},$C=new Sn(0),jC=function(n,e){return((n[0]&15)!=8||n[0]>>4>7||(n[0]<<8|n[1])%31)&&Ln(6,"invalid zlib data"),(n[1]>>5&1)==1&&Ln(6,"invalid zlib data: "+(n[1]&32?"need":"unexpected")+" dictionary"),(n[1]>>3&4)+2};function ZC(n,e){return qC(n.subarray(jC(n),-4),{i:2},e,e)}var JC=typeof TextDecoder<"u"&&new TextDecoder,QC=0;try{JC.decode($C,{stream:!0}),QC=1}catch{}function $g(n,e,t){const i=t.length-n-1;if(e>=t[i])return i-1;if(e<=t[n])return n;let r=n,s=i,a=Math.floor((r+s)/2);for(;e<t[a]||e>=t[a+1];)e<t[a]?s=a:r=a,a=Math.floor((r+s)/2);return a}function eP(n,e,t,i){const r=[],s=[],a=[];r[0]=1;for(let o=1;o<=t;++o){s[o]=e-i[n+1-o],a[o]=i[n+o]-e;let l=0;for(let c=0;c<o;++c){const u=a[c+1],h=s[o-c],d=r[c]/(u+h);r[c]=l+u*d,l=h*d}r[o]=l}return r}function tP(n,e,t,i){const r=$g(n,i,e),s=eP(r,i,n,e),a=new it(0,0,0,0);for(let o=0;o<=n;++o){const l=t[r-n+o],c=s[o],u=l.w*c;a.x+=l.x*u,a.y+=l.y*u,a.z+=l.z*u,a.w+=l.w*c}return a}function nP(n,e,t,i,r){const s=[];for(let h=0;h<=t;++h)s[h]=0;const a=[];for(let h=0;h<=i;++h)a[h]=s.slice(0);const o=[];for(let h=0;h<=t;++h)o[h]=s.slice(0);o[0][0]=1;const l=s.slice(0),c=s.slice(0);for(let h=1;h<=t;++h){l[h]=e-r[n+1-h],c[h]=r[n+h]-e;let d=0;for(let f=0;f<h;++f){const p=c[f+1],_=l[h-f];o[h][f]=p+_;const m=o[f][h-1]/o[h][f];o[f][h]=d+p*m,d=_*m}o[h][h]=d}for(let h=0;h<=t;++h)a[0][h]=o[h][t];for(let h=0;h<=t;++h){let d=0,f=1;const p=[];for(let _=0;_<=t;++_)p[_]=s.slice(0);p[0][0]=1;for(let _=1;_<=i;++_){let m=0;const g=h-_,x=t-_;h>=_&&(p[f][0]=p[d][0]/o[x+1][g],m=p[f][0]*o[g][x]);const M=g>=-1?1:-g,y=h-1<=x?_-1:t-h;for(let E=M;E<=y;++E)p[f][E]=(p[d][E]-p[d][E-1])/o[x+1][g+E],m+=p[f][E]*o[g+E][x];h<=x&&(p[f][_]=-p[d][_-1]/o[x+1][h],m+=p[f][_]*o[h][x]),a[_][h]=m;const w=d;d=f,f=w}}let u=t;for(let h=1;h<=i;++h){for(let d=0;d<=t;++d)a[h][d]*=u;u*=t-h}return a}function iP(n,e,t,i,r){const s=r<n?r:n,a=[],o=$g(n,i,e),l=nP(o,i,n,s,e),c=[];for(let u=0;u<t.length;++u){const h=t[u].clone(),d=h.w;h.x*=d,h.y*=d,h.z*=d,c[u]=h}for(let u=0;u<=s;++u){const h=c[o-n].clone().multiplyScalar(l[u][0]);for(let d=1;d<=n;++d)h.add(c[o-n+d].clone().multiplyScalar(l[u][d]));a[u]=h}for(let u=s+1;u<=r+1;++u)a[u]=new it(0,0,0);return a}function rP(n,e){let t=1;for(let r=2;r<=n;++r)t*=r;let i=1;for(let r=2;r<=e;++r)i*=r;for(let r=2;r<=n-e;++r)i*=r;return t/i}function sP(n){const e=n.length,t=[],i=[];for(let s=0;s<e;++s){const a=n[s];t[s]=new D(a.x,a.y,a.z),i[s]=a.w}const r=[];for(let s=0;s<e;++s){const a=t[s].clone();for(let o=1;o<=s;++o)a.sub(r[s-o].clone().multiplyScalar(rP(s,o)*i[o]));r[s]=a.divideScalar(i[0])}return r}function aP(n,e,t,i,r){const s=iP(n,e,t,i,r);return sP(s)}class oP extends Fb{constructor(e,t,i,r,s){super();const a=t?t.length-1:0,o=i?i.length:0;this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=r||0,this.endKnot=s||a;for(let l=0;l<o;++l){const c=i[l];this.controlPoints[l]=new it(c.x,c.y,c.z,c.w)}}getPoint(e,t=new D){const i=t,r=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=tP(this.degree,this.knots,this.controlPoints,r);return s.w!==1&&s.divideScalar(s.w),i.set(s.x,s.y,s.z)}getTangent(e,t=new D){const i=t,r=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),s=aP(this.degree,this.knots,this.controlPoints,r,1);return i.copy(s[1]).normalize(),i}toJSON(){const e=super.toJSON();return e.degree=this.degree,e.knots=[...this.knots],e.controlPoints=this.controlPoints.map(t=>t.toArray()),e.startKnot=this.startKnot,e.endKnot=this.endKnot,e}fromJSON(e){return super.fromJSON(e),this.degree=e.degree,this.knots=[...e.knots],this.controlPoints=e.controlPoints.map(t=>new it(t[0],t[1],t[2],t[3])),this.startKnot=e.startKnot,this.endKnot=e.endKnot,this}}let ze,Pt,Gt;class ql extends lr{constructor(e){super(e)}load(e,t,i,r){const s=this,a=s.path===""?bA.extractUrlBase(e):s.path,o=new vA(this.manager);o.setPath(s.path),o.setResponseType("arraybuffer"),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(l){try{t(s.parse(l,a))}catch(c){r?r(c):console.error(c),s.manager.itemError(e)}},i,r)}parse(e,t){if(fP(e))ze=new dP().parse(e);else{const r=Jg(e);if(!pP(r))throw new Error("THREE.FBXLoader: Unknown format.");if(up(r)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+up(r));ze=new hP().parse(r)}const i=new Wr(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new lP(i,this.manager).parse(ze)}}class lP{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){Pt=this.parseConnections();const e=this.parseImages(),t=this.parseTextures(e),i=this.parseMaterials(t),r=this.parseDeformers(),s=new cP().parse(r);return this.parseScene(r,s,i),Gt}parseConnections(){const e=new Map;return"Connections"in ze&&ze.Connections.connections.forEach(function(i){const r=i[0],s=i[1],a=i[2];e.has(r)||e.set(r,{parents:[],children:[]});const o={ID:s,relationship:a};e.get(r).parents.push(o),e.has(s)||e.set(s,{parents:[],children:[]});const l={ID:r,relationship:a};e.get(s).children.push(l)}),e}parseImages(){const e={},t={};if("Video"in ze.Objects){const i=ze.Objects.Video;for(const r in i){const s=i[r],a=parseInt(r);if(e[a]=s.RelativeFilename||s.Filename,"Content"in s){const o=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,l=typeof s.Content=="string"&&s.Content!=="";if(o||l){const c=this.parseImage(i[r]);t[s.RelativeFilename||s.Filename]=c}}}}for(const i in e){const r=e[i];t[r]!==void 0?e[i]=t[r]:e[i]=e[i].split("\\").pop()}return e}parseImage(e){const t=e.Content,i=e.RelativeFilename||e.Filename,r=i.slice(i.lastIndexOf(".")+1).toLowerCase();let s;switch(r){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",i),s="image/tga";break;case"webp":s="image/webp";break;default:console.warn('FBXLoader: Image type "'+r+'" is not supported.');return}if(typeof t=="string")return"data:"+s+";base64,"+t;{const a=new Uint8Array(t);return window.URL.createObjectURL(new Blob([a],{type:s}))}}parseTextures(e){const t=new Map;if("Texture"in ze.Objects){const i=ze.Objects.Texture;for(const r in i){const s=this.parseTexture(i[r],e);t.set(parseInt(r),s)}}return t}parseTexture(e,t){const i=this.loadTexture(e,t);i.ID=e.id,i.name=e.attrName;const r=e.WrapModeU,s=e.WrapModeV,a=r!==void 0?r.value:0,o=s!==void 0?s.value:0;if(i.wrapS=a===0?ks:dn,i.wrapT=o===0?ks:dn,"Scaling"in e){const l=e.Scaling.value;i.repeat.x=l[0],i.repeat.y=l[1]}if("Translation"in e){const l=e.Translation.value;i.offset.x=l[0],i.offset.y=l[1]}return i}loadTexture(e,t){const i=e.FileName.split(".").pop().toLowerCase();let r=this.manager.getHandler(`.${i}`);r===null&&(r=this.textureLoader);const s=r.path;s||r.setPath(this.textureLoader.path);const a=Pt.get(e.id).children;let o;if(a!==void 0&&a.length>0&&t[a[0].ID]!==void 0&&(o=t[a[0].ID],(o.indexOf("blob:")===0||o.indexOf("data:")===0)&&r.setPath(void 0)),o===void 0)return console.warn("FBXLoader: Undefined filename, creating placeholder texture."),new Ot;const l=r.load(o);return r.setPath(s),l}parseMaterials(e){const t=new Map;if("Material"in ze.Objects){const i=ze.Objects.Material;for(const r in i){const s=this.parseMaterial(i[r],e);s!==null&&t.set(parseInt(r),s)}}return t}parseMaterial(e,t){const i=e.id,r=e.attrName;let s=e.ShadingModel;if(typeof s=="object"&&(s=s.value),!Pt.has(i))return null;const a=this.parseParameters(e,t,i);let o;switch(s.toLowerCase()){case"phong":o=new Va;break;case"lambert":o=new rA;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),o=new Va;break}return o.setValues(a),o.name=r,o}parseParameters(e,t,i){const r={};e.BumpFactor&&(r.bumpScale=e.BumpFactor.value),e.Diffuse?r.color=Be.colorSpaceToWorking(new Fe().fromArray(e.Diffuse.value),et):e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(r.color=Be.colorSpaceToWorking(new Fe().fromArray(e.DiffuseColor.value),et)),e.DisplacementFactor&&(r.displacementScale=e.DisplacementFactor.value),e.Emissive?r.emissive=Be.colorSpaceToWorking(new Fe().fromArray(e.Emissive.value),et):e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(r.emissive=Be.colorSpaceToWorking(new Fe().fromArray(e.EmissiveColor.value),et)),e.EmissiveFactor&&(r.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),r.opacity=1-(e.TransparencyFactor?parseFloat(e.TransparencyFactor.value):0),(r.opacity===1||r.opacity===0)&&(r.opacity=e.Opacity?parseFloat(e.Opacity.value):null,r.opacity===null&&(r.opacity=1)),r.opacity<1&&(r.transparent=!0),e.ReflectionFactor&&(r.reflectivity=e.ReflectionFactor.value),e.Shininess&&(r.shininess=e.Shininess.value),e.Specular?r.specular=Be.colorSpaceToWorking(new Fe().fromArray(e.Specular.value),et):e.SpecularColor&&e.SpecularColor.type==="Color"&&(r.specular=Be.colorSpaceToWorking(new Fe().fromArray(e.SpecularColor.value),et));const s=this;return Pt.get(i).children.forEach(function(a){const o=a.relationship;switch(o){case"Bump":r.bumpMap=s.getTexture(t,a.ID);break;case"Maya|TEX_ao_map":r.aoMap=s.getTexture(t,a.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":r.map=s.getTexture(t,a.ID),r.map!==void 0&&(r.map.colorSpace=et);break;case"DisplacementColor":r.displacementMap=s.getTexture(t,a.ID);break;case"EmissiveColor":r.emissiveMap=s.getTexture(t,a.ID),r.emissiveMap!==void 0&&(r.emissiveMap.colorSpace=et);break;case"NormalMap":case"Maya|TEX_normal_map":r.normalMap=s.getTexture(t,a.ID);break;case"ReflectionColor":r.envMap=s.getTexture(t,a.ID),r.envMap!==void 0&&(r.envMap.mapping=no,r.envMap.colorSpace=et);break;case"SpecularColor":r.specularMap=s.getTexture(t,a.ID),r.specularMap!==void 0&&(r.specularMap.colorSpace=et);break;case"TransparentColor":case"TransparencyFactor":r.alphaMap=s.getTexture(t,a.ID),r.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",o);break}}),r}getTexture(e,t){return"LayeredTexture"in ze.Objects&&t in ze.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=Pt.get(t).children[0].ID),e.get(t)}parseDeformers(){const e={},t={};if("Deformer"in ze.Objects){const i=ze.Objects.Deformer;for(const r in i){const s=i[r],a=Pt.get(parseInt(r));if(s.attrType==="Skin"){const o=this.parseSkeleton(a,i);o.ID=r,a.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),o.geometryID=a.parents[0].ID,e[r]=o}else if(s.attrType==="BlendShape"){const o={id:r};o.rawTargets=this.parseMorphTargets(a,i),o.id=r,a.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[r]=o}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){const i=[];return e.children.forEach(function(r){const s=t[r.ID];if(s.attrType!=="Cluster")return;const a={ID:r.ID,indices:[],weights:[],transformLink:new Ae().fromArray(s.TransformLink.a)};"Indexes"in s&&(a.indices=s.Indexes.a,a.weights=s.Weights.a),i.push(a)}),{rawBones:i,bones:[]}}parseMorphTargets(e,t){const i=[];for(let r=0;r<e.children.length;r++){const s=e.children[r],a=t[s.ID],o={name:a.attrName,initialWeight:a.DeformPercent,id:a.id,fullWeights:a.FullWeights.a};if(a.attrType!=="BlendShapeChannel")return;o.geoID=Pt.get(parseInt(s.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,i.push(o)}return i}parseScene(e,t,i){Gt=new pn;const r=this.parseModels(e.skeletons,t,i),s=ze.Objects.Model,a=this;r.forEach(function(h){const d=s[h.ID];a.setLookAtProperties(h,d),Pt.get(h.ID).parents.forEach(function(p){const _=r.get(p.ID);_!==void 0&&_.add(h)}),h.parent===null&&Gt.add(h)}),this.addGlobalSceneSettings(),Gt.traverse(function(h){if(h.userData.transformData){h.parent&&(h.userData.transformData.parentMatrix=h.parent.matrix,h.userData.transformData.parentMatrixWorld=h.parent.matrixWorld);const d=Zg(h.userData.transformData);h.applyMatrix4(d),h.updateWorldMatrix()}});const o=this.parsePoseNodes(),l=new Set;for(const h in e.skeletons)e.skeletons[h].rawBones.forEach(function(d,f){const p=e.skeletons[h].bones[f];p&&l.add(p.ID)});const c=new Ae;Gt.traverse(function(h){if(h.isBone&&h.ID!==void 0&&!l.has(h.ID)){const d=o[h.ID];d!==void 0&&(h.parent?(c.copy(h.parent.matrixWorld).invert(),c.multiply(d)):c.copy(d),c.decompose(h.position,h.quaternion,h.scale),h.updateMatrix(),h.matrixWorld.copy(d))}}),this.bindSkeleton(e.skeletons,t,r);const u=new uP().parse();Gt.children.length===1&&Gt.children[0].isGroup&&(Gt.children[0].animations=u,Gt=Gt.children[0]),Gt.animations=u,"GlobalSettings"in ze&&"UpAxis"in ze.GlobalSettings&&ze.GlobalSettings.UpAxis.value===2&&(console.warn("THREE.FBXLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted."),Gt.rotation.set(-Math.PI/2,0,0))}parseModels(e,t,i){const r=new Map,s=ze.Objects.Model;for(const a in s){const o=parseInt(a),l=s[a],c=Pt.get(o);let u=this.buildSkeleton(c,e,o,l.attrName);if(!u){switch(l.attrType){case"Camera":u=this.createCamera(c);break;case"Light":u=this.createLight(c);break;case"Mesh":u=this.createMesh(c,t,i);break;case"NurbsCurve":u=this.createCurve(c,t);break;case"LimbNode":case"Root":u=new Xs;break;case"Null":default:u=new pn;break}u.name=l.attrName?Je.sanitizeNodeName(l.attrName):"",u.userData.originalName=l.attrName,u.ID=o}this.getTransformData(u,l),r.set(o,u)}return r}buildSkeleton(e,t,i,r){let s=null;return e.parents.forEach(function(a){for(const o in t){const l=t[o];l.rawBones.forEach(function(c,u){if(c.ID===a.ID){const h=s;s=new Xs,s.matrixWorld.copy(c.transformLink),s.name=r?Je.sanitizeNodeName(r):"",s.userData.originalName=r,s.ID=i,l.bones[u]=s,h!==null&&s.add(h)}})}}),s}createCamera(e){let t,i;if(e.children.forEach(function(r){const s=ze.Objects.NodeAttribute[r.ID];s!==void 0&&(i=s)}),i===void 0)t=new St;else{let r=0;i.CameraProjectionType!==void 0&&i.CameraProjectionType.value===1&&(r=1);let s=1;i.NearPlane!==void 0&&(s=i.NearPlane.value/1e3);let a=1e3;i.FarPlane!==void 0&&(a=i.FarPlane.value/1e3);let o=window.innerWidth,l=window.innerHeight;i.AspectWidth!==void 0&&i.AspectHeight!==void 0&&(o=i.AspectWidth.value,l=i.AspectHeight.value);const c=o/l;let u=45;i.FieldOfView!==void 0&&(u=i.FieldOfView.value);const h=i.FocalLength?i.FocalLength.value:null;switch(r){case 0:t=new sn(u,c,s,a),h!==null&&t.setFocalLength(h);break;case 1:console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."),t=new St;break;default:console.warn("THREE.FBXLoader: Unknown camera type "+r+"."),t=new St;break}}return t}createLight(e){let t,i;if(e.children.forEach(function(r){const s=ze.Objects.NodeAttribute[r.ID];s!==void 0&&(i=s)}),i===void 0)t=new St;else{let r;i.LightType===void 0?r=0:r=i.LightType.value;let s=16777215;i.Color!==void 0&&(s=Be.colorSpaceToWorking(new Fe().fromArray(i.Color.value),et));let a=i.Intensity===void 0?1:i.Intensity.value/100;i.CastLightOnObject!==void 0&&i.CastLightOnObject.value===0&&(a=0);let o=0;i.FarAttenuationEnd!==void 0&&(i.EnableFarAttenuation!==void 0&&i.EnableFarAttenuation.value===0?o=0:o=i.FarAttenuationEnd.value);const l=1;switch(r){case 0:t=new Of(s,a,o,l);break;case 1:t=new Lg(s,a);break;case 2:let c=Math.PI/3,u=0;i.OuterAngle!==void 0?(c=nn.degToRad(i.OuterAngle.value),i.InnerAngle!==void 0&&(u=1-i.InnerAngle.value/i.OuterAngle.value,u=Math.max(0,u))):i.InnerAngle!==void 0&&(c=nn.degToRad(i.InnerAngle.value)),t=new yA(s,a,o,c,u,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+i.LightType.value+", defaulting to a PointLight."),t=new Of(s,a);break}i.CastShadows!==void 0&&i.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,i){let r,s=null,a=null;const o=[];if(e.children.forEach(function(l){t.has(l.ID)&&(s=t.get(l.ID)),i.has(l.ID)&&o.push(i.get(l.ID))}),o.length>1?a=o:o.length>0?a=o[0]:(a=new Va({name:lr.DEFAULT_MATERIAL_NAME,color:13421772}),o.push(a)),"color"in s.attributes&&o.forEach(function(l){l.vertexColors=!0}),s.groups.length>0){let l=!1;for(let c=0,u=s.groups.length;c<u;c++){const h=s.groups[c];(h.materialIndex<0||h.materialIndex>=o.length)&&(h.materialIndex=o.length,l=!0)}if(l){const c=new Va;o.push(c)}}return s.FBX_Deformer?(r=new Ab(s,a),r.normalizeSkinWeights()):r=new lt(s,a),r}createCurve(e,t){const i=e.children.reduce(function(s,a){return t.has(a.ID)&&(s=t.get(a.ID)),s},null),r=new nh({name:lr.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new xg(i,r)}getTransformData(e,t){const i={};"InheritType"in t&&(i.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?i.eulerOrder=Zs(t.RotationOrder.value):i.eulerOrder=Zs(0),"Lcl_Translation"in t&&(i.translation=t.Lcl_Translation.value),"PreRotation"in t&&(i.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(i.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(i.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(i.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(i.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(i.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(i.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(i.rotationPivot=t.RotationPivot.value),e.userData.transformData=i}setLookAtProperties(e,t){"LookAtProperty"in t&&Pt.get(e.ID).children.forEach(function(r){if(r.relationship==="LookAtProperty"){const s=ze.Objects.Model[r.ID];if("Lcl_Translation"in s){const a=s.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(a),Gt.add(e.target)):e.lookAt(new D().fromArray(a))}}})}bindSkeleton(e,t,i){for(const r in e){const s=e[r],a=[];for(let l=0,c=s.bones.length;l<c;l++){const u=new Ae;s.bones[l]&&s.rawBones[l]&&u.copy(s.rawBones[l].transformLink).invert(),a.push(u)}Pt.get(parseInt(s.ID)).parents.forEach(function(l){if(t.has(l.ID)){const c=l.ID;Pt.get(c).parents.forEach(function(h){if(i.has(h.ID)){const d=i.get(h.ID);d.updateMatrixWorld(!0),d.bind(new eh(s.bones,a),d.matrixWorld)}})}})}}parsePoseNodes(){const e={};if("Pose"in ze.Objects){const t=ze.Objects.Pose;for(const i in t)if(t[i].attrType==="BindPose"&&t[i].NbPoseNodes>0){const r=t[i].PoseNode;Array.isArray(r)?r.forEach(function(s){e[s.Node]=new Ae().fromArray(s.Matrix.a)}):e[r.Node]=new Ae().fromArray(r.Matrix.a)}}return e}addGlobalSceneSettings(){if("GlobalSettings"in ze){if("AmbientColor"in ze.GlobalSettings){const e=ze.GlobalSettings.AmbientColor.value,t=e[0],i=e[1],r=e[2];if(t!==0||i!==0||r!==0){const s=new Fe().setRGB(t,i,r,et);Gt.add(new Dg(s,1))}}"UnitScaleFactor"in ze.GlobalSettings&&(Gt.userData.unitScaleFactor=ze.GlobalSettings.UnitScaleFactor.value)}}}class cP{constructor(){this.negativeMaterialIndices=!1}parse(e){const t=new Map;if("Geometry"in ze.Objects){const i=ze.Objects.Geometry;for(const r in i){const s=Pt.get(parseInt(r)),a=this.parseGeometry(s,i[r],e);t.set(parseInt(r),a)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,i){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,i);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,i){const r=i.skeletons,s=[],a=e.parents.map(function(h){return ze.Objects.Model[h.ID]});if(a.length===0)return;const o=e.children.reduce(function(h,d){return r[d.ID]!==void 0&&(h=r[d.ID]),h},null);e.children.forEach(function(h){i.morphTargets[h.ID]!==void 0&&s.push(i.morphTargets[h.ID])});const l=a[0],c={};"RotationOrder"in l&&(c.eulerOrder=Zs(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);const u=Zg(c);return this.genGeometry(t,o,s,u)}genGeometry(e,t,i,r){const s=new Kt;e.attrName&&(s.name=e.attrName);const a=this.parseGeoNode(e,t),o=this.genBuffers(a),l=new Tt(o.vertex,3);if(l.applyMatrix4(r),s.setAttribute("position",l),o.colors.length>0&&s.setAttribute("color",new Tt(o.colors,3)),t&&(s.setAttribute("skinIndex",new Ju(o.weightsIndices,4)),s.setAttribute("skinWeight",new Tt(o.vertexWeights,4)),s.FBX_Deformer=t),o.normal.length>0){const c=new Oe().getNormalMatrix(r),u=new Tt(o.normal,3);u.applyNormalMatrix(c),s.setAttribute("normal",u)}if(o.uvs.forEach(function(c,u){const h=u===0?"uv":`uv${u}`;s.setAttribute(h,new Tt(o.uvs[u],2))}),a.material&&a.material.mappingType!=="AllSame"){let c=o.materialIndex[0],u=0;if(o.materialIndex.forEach(function(h,d){h!==c&&(s.addGroup(u,d-u,c),c=h,u=d)}),s.groups.length>0){const h=s.groups[s.groups.length-1],d=h.start+h.count;d!==o.materialIndex.length&&s.addGroup(d,o.materialIndex.length-d,c)}s.groups.length===0&&s.addGroup(0,o.materialIndex.length,o.materialIndex[0])}return this.addMorphTargets(s,e,i,r),s}parseGeoNode(e,t){const i={};if(i.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],i.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&e.LayerElementColor[0].Colors&&(i.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(i.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(i.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){i.uv=[];let r=0;for(;e.LayerElementUV[r];)e.LayerElementUV[r].UV&&i.uv.push(this.parseUVs(e.LayerElementUV[r])),r++}return i.weightTable={},t!==null&&(i.skeleton=t,t.rawBones.forEach(function(r,s){r.indices.forEach(function(a,o){i.weightTable[a]===void 0&&(i.weightTable[a]=[]),i.weightTable[a].push({id:s,weight:r.weights[o]})})})),i}genBuffers(e){const t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let i=0,r=0,s=!1,a=[],o=[],l=[],c=[],u=[],h=[];const d=this;return e.vertexIndices.forEach(function(f,p){let _,m=!1;f<0&&(f=f^-1,m=!0);let g=[],x=[];if(a.push(f*3,f*3+1,f*3+2),e.color){const M=Ka(p,i,f,e.color);l.push(M[0],M[1],M[2])}if(e.skeleton){if(e.weightTable[f]!==void 0&&e.weightTable[f].forEach(function(M){x.push(M.weight),g.push(M.id)}),x.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);const M=[0,0,0,0],y=[0,0,0,0];x.forEach(function(w,E){let C=w,S=g[E];y.forEach(function(A,P,I){if(C>A){I[P]=C,C=A;const N=M[P];M[P]=S,S=N}})}),g=M,x=y}for(;x.length<4;)x.push(0),g.push(0);for(let M=0;M<4;++M)u.push(x[M]),h.push(g[M])}if(e.normal){const M=Ka(p,i,f,e.normal);o.push(M[0],M[1],M[2])}e.material&&e.material.mappingType!=="AllSame"&&(_=Ka(p,i,f,e.material)[0],_<0&&(d.negativeMaterialIndices=!0,_=0)),e.uv&&e.uv.forEach(function(M,y){const w=Ka(p,i,f,M);c[y]===void 0&&(c[y]=[]),c[y].push(w[0]),c[y].push(w[1])}),r++,m&&(d.genFace(t,e,a,_,o,l,c,u,h,r),i++,r=0,a=[],o=[],l=[],c=[],u=[],h=[])}),t}getNormalNewell(e){const t=new D(0,0,0);for(let i=0;i<e.length;i++){const r=e[i],s=e[(i+1)%e.length];t.x+=(r.y-s.y)*(r.z+s.z),t.y+=(r.z-s.z)*(r.x+s.x),t.z+=(r.x-s.x)*(r.y+s.y)}return t.normalize(),t}getNormalTangentAndBitangent(e){const t=this.getNormalNewell(e),r=(Math.abs(t.z)>.5?new D(0,1,0):new D(0,0,1)).cross(t).normalize(),s=t.clone().cross(r).normalize();return{normal:t,tangent:r,bitangent:s}}flattenVertex(e,t,i){return new je(e.dot(t),e.dot(i))}genFace(e,t,i,r,s,a,o,l,c,u){let h;if(u>3){const d=[],f=t.baseVertexPositions||t.vertexPositions;for(let g=0;g<i.length;g+=3)d.push(new D(f[i[g]],f[i[g+1]],f[i[g+2]]));const{tangent:p,bitangent:_}=this.getNormalTangentAndBitangent(d),m=[];for(const g of d)m.push(this.flattenVertex(g,p,_));h=ih.triangulateShape(m,[])}else h=[[0,1,2]];for(const[d,f,p]of h)e.vertex.push(t.vertexPositions[i[d*3]]),e.vertex.push(t.vertexPositions[i[d*3+1]]),e.vertex.push(t.vertexPositions[i[d*3+2]]),e.vertex.push(t.vertexPositions[i[f*3]]),e.vertex.push(t.vertexPositions[i[f*3+1]]),e.vertex.push(t.vertexPositions[i[f*3+2]]),e.vertex.push(t.vertexPositions[i[p*3]]),e.vertex.push(t.vertexPositions[i[p*3+1]]),e.vertex.push(t.vertexPositions[i[p*3+2]]),t.skeleton&&(e.vertexWeights.push(l[d*4]),e.vertexWeights.push(l[d*4+1]),e.vertexWeights.push(l[d*4+2]),e.vertexWeights.push(l[d*4+3]),e.vertexWeights.push(l[f*4]),e.vertexWeights.push(l[f*4+1]),e.vertexWeights.push(l[f*4+2]),e.vertexWeights.push(l[f*4+3]),e.vertexWeights.push(l[p*4]),e.vertexWeights.push(l[p*4+1]),e.vertexWeights.push(l[p*4+2]),e.vertexWeights.push(l[p*4+3]),e.weightsIndices.push(c[d*4]),e.weightsIndices.push(c[d*4+1]),e.weightsIndices.push(c[d*4+2]),e.weightsIndices.push(c[d*4+3]),e.weightsIndices.push(c[f*4]),e.weightsIndices.push(c[f*4+1]),e.weightsIndices.push(c[f*4+2]),e.weightsIndices.push(c[f*4+3]),e.weightsIndices.push(c[p*4]),e.weightsIndices.push(c[p*4+1]),e.weightsIndices.push(c[p*4+2]),e.weightsIndices.push(c[p*4+3])),t.color&&(e.colors.push(a[d*3]),e.colors.push(a[d*3+1]),e.colors.push(a[d*3+2]),e.colors.push(a[f*3]),e.colors.push(a[f*3+1]),e.colors.push(a[f*3+2]),e.colors.push(a[p*3]),e.colors.push(a[p*3+1]),e.colors.push(a[p*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(r),e.materialIndex.push(r),e.materialIndex.push(r)),t.normal&&(e.normal.push(s[d*3]),e.normal.push(s[d*3+1]),e.normal.push(s[d*3+2]),e.normal.push(s[f*3]),e.normal.push(s[f*3+1]),e.normal.push(s[f*3+2]),e.normal.push(s[p*3]),e.normal.push(s[p*3+1]),e.normal.push(s[p*3+2])),t.uv&&t.uv.forEach(function(_,m){e.uvs[m]===void 0&&(e.uvs[m]=[]),e.uvs[m].push(o[m][d*2]),e.uvs[m].push(o[m][d*2+1]),e.uvs[m].push(o[m][f*2]),e.uvs[m].push(o[m][f*2+1]),e.uvs[m].push(o[m][p*2]),e.uvs[m].push(o[m][p*2+1])})}addMorphTargets(e,t,i,r){if(i.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];const s=r.clone().setPosition(0,0,0),a=this;i.forEach(function(o){o.rawTargets.forEach(function(l){const c=ze.Objects.Geometry[l.geoID];c!==void 0&&a.genMorphGeometry(e,t,c,s,l.name)})})}genMorphGeometry(e,t,i,r,s){const a=t.Vertices!==void 0?t.Vertices.a:[],o=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],l=i.Vertices!==void 0?i.Vertices.a:[],c=i.Indexes!==void 0?i.Indexes.a:[],u=e.attributes.position.count*3,h=new Float32Array(u);for(let _=0;_<c.length;_++){const m=c[_]*3;h[m]=l[_*3],h[m+1]=l[_*3+1],h[m+2]=l[_*3+2]}const d={vertexIndices:o,vertexPositions:h,baseVertexPositions:a},f=this.genBuffers(d),p=new Tt(f.vertex,3);p.name=s||i.attrName,p.applyMatrix4(r),e.morphAttributes.position.push(p)}parseNormals(e){const t=e.MappingInformationType,i=e.ReferenceInformationType,r=e.Normals.a;let s=[];return i==="IndexToDirect"&&("NormalIndex"in e?s=e.NormalIndex.a:"NormalsIndex"in e&&(s=e.NormalsIndex.a)),{dataSize:3,buffer:r,indices:s,mappingType:t,referenceType:i}}parseUVs(e){const t=e.MappingInformationType,i=e.ReferenceInformationType,r=e.UV.a;let s=[];return i==="IndexToDirect"&&(s=e.UVIndex.a),{dataSize:2,buffer:r,indices:s,mappingType:t,referenceType:i}}parseVertexColors(e){const t=e.MappingInformationType,i=e.ReferenceInformationType,r=e.Colors.a;let s=[];i==="IndexToDirect"&&(s=e.ColorIndex.a);for(let a=0,o=new Fe;a<r.length;a+=4)o.fromArray(r,a),Be.colorSpaceToWorking(o,et),o.toArray(r,a);return{dataSize:4,buffer:r,indices:s,mappingType:t,referenceType:i}}parseMaterialIndices(e){const t=e.MappingInformationType,i=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:i};const r=e.Materials.a,s=[];for(let a=0;a<r.length;++a)s.push(a);return{dataSize:1,buffer:r,indices:s,mappingType:t,referenceType:i}}parseNurbsGeometry(e){const t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new Kt;const i=t-1,r=e.KnotVector.a,s=[],a=e.Points.a;for(let h=0,d=a.length;h<d;h+=4)s.push(new it().fromArray(a,h));let o,l;if(e.Form==="Closed")s.push(s[0]);else if(e.Form==="Periodic"){o=i,l=r.length-1-o;for(let h=0;h<i;++h)s.push(s[h])}const u=new oP(i,r,s,o,l).getPoints(s.length*12);return new Kt().setFromPoints(u)}}class uP{parse(){const e=[],t=this.parseClips();if(t!==void 0)for(const i in t){const r=t[i],s=this.addClip(r);e.push(s)}return e}parseClips(){if(ze.Objects.AnimationCurve===void 0)return;const e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);const t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){const e=ze.Objects.AnimationCurveNode,t=new Map;for(const i in e){const r=e[i];if(r.attrName.match(/S|R|T|DeformPercent/)!==null){const s={id:r.id,attr:r.attrName,curves:{}};t.set(s.id,s)}}return t}parseAnimationCurves(e){const t=ze.Objects.AnimationCurve;for(const i in t){const r={id:t[i].id,times:t[i].KeyTime.a.map(mP),values:t[i].KeyValueFloat.a},s=Pt.get(r.id);if(s!==void 0){const a=s.parents[0].ID,o=s.parents[0].relationship;o.match(/X/)?e.get(a).curves.x=r:o.match(/Y/)?e.get(a).curves.y=r:o.match(/Z/)?e.get(a).curves.z=r:o.match(/DeformPercent/)&&e.has(a)&&(e.get(a).curves.morph=r)}}}parseAnimationLayers(e){const t=ze.Objects.AnimationLayer,i=new Map;for(const r in t){const s=[],a=Pt.get(parseInt(r));a!==void 0&&(a.children.forEach(function(l,c){if(e.has(l.ID)){const u=e.get(l.ID);if(u.curves.x!==void 0||u.curves.y!==void 0||u.curves.z!==void 0){if(s[c]===void 0){const h=Pt.get(l.ID).parents.filter(function(f){return f.relationship!==void 0});if(h.length===0)return;const d=h[0].ID;if(d!==void 0){const f=ze.Objects.Model[d.toString()];if(f===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}const p={modelName:f.attrName?Je.sanitizeNodeName(f.attrName):"",ID:f.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};Gt.traverse(function(_){_.ID===f.id&&(p.transform=_.matrix,_.userData.transformData&&(p.eulerOrder=_.userData.transformData.eulerOrder,_.userData.transformData.rotation&&(p.initialRotation=_.userData.transformData.rotation)))}),p.transform||(p.transform=new Ae),"PreRotation"in f&&(p.preRotation=f.PreRotation.value),"PostRotation"in f&&(p.postRotation=f.PostRotation.value),s[c]=p}}s[c]&&(s[c][u.attr]=u)}else if(u.curves.morph!==void 0){if(s[c]===void 0){const h=Pt.get(l.ID).parents.filter(function(x){return x.relationship!==void 0});if(h.length===0)return;const d=h[0].ID,f=Pt.get(d).parents[0].ID,p=Pt.get(f).parents[0].ID,_=Pt.get(p).parents[0].ID,m=ze.Objects.Model[_],g={modelName:m.attrName?Je.sanitizeNodeName(m.attrName):"",morphName:ze.Objects.Deformer[d].attrName};s[c]=g}s[c][u.attr]=u}}}),i.set(parseInt(r),s))}return i}parseAnimStacks(e){const t=ze.Objects.AnimationStack,i={};for(const r in t){const s=Pt.get(parseInt(r)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const a=e.get(s[0].ID);i[r]={name:t[r].attrName,layer:a}}return i}addClip(e){let t=[];const i=this;return e.layer.forEach(function(r){t=t.concat(i.generateTracks(r))}),new gu(e.name,-1,t)}generateTracks(e){const t=[];let i=new D,r=new D;if(e.transform&&e.transform.decompose(i,new Nt,r),i=i.toArray(),r=r.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.T.curves,i,"position");s!==void 0&&t.push(s)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){const s=this.generateRotationTrack(e.modelName,e.R.curves,e.preRotation,e.postRotation,e.eulerOrder,e.initialRotation);s!==void 0&&t.push(s)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.S.curves,r,"scale");s!==void 0&&t.push(s)}if(e.DeformPercent!==void 0){const s=this.generateMorphTrack(e);s!==void 0&&t.push(s)}return t}generateVectorTrack(e,t,i,r){const s=this.getTimesForAllAxes(t),a=this.getKeyframeTrackValues(s,t,i);return new js(e+"."+r,s,a)}generateRotationTrack(e,t,i,r,s,a){let o,l;if(t.x!==void 0||t.y!==void 0||t.z!==void 0){const f=this.getTimesForAllAxes(t);if(f.length>0){const p=a||[0,0,0],_=this.synchronizeCurve(t.x,f,p[0]),m=this.synchronizeCurve(t.y,f,p[1]),g=this.synchronizeCurve(t.z,f,p[2]),x=this.interpolateRotations(_,m,g,s);o=x[0],l=x[1]}}const c=Zs(0);i!==void 0&&(i=i.map(nn.degToRad),i.push(c),i=new Wt().fromArray(i),i=new Nt().setFromEuler(i)),r!==void 0&&(r=r.map(nn.degToRad),r.push(c),r=new Wt().fromArray(r),r=new Nt().setFromEuler(r).invert());const u=new Nt,h=new Wt,d=[];if(!(!l||!o)){for(let f=0;f<l.length;f+=3)h.set(l[f],l[f+1],l[f+2],s),u.setFromEuler(h),i!==void 0&&u.premultiply(i),r!==void 0&&u.multiply(r),f>2&&new Nt().fromArray(d,(f-3)/3*4).dot(u)<0&&u.set(-u.x,-u.y,-u.z,-u.w),u.toArray(d,f/3*4);return new na(e+".quaternion",o,d)}}generateMorphTrack(e){const t=e.DeformPercent.curves.morph,i=t.values.map(function(s){return s/100}),r=Gt.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new $s(e.modelName+".morphTargetInfluences["+r+"]",t.times,i)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(i,r){return i-r}),t.length>1){let i=1,r=t[0];for(let s=1;s<t.length;s++){const a=t[s];a!==r&&(t[i]=a,r=a,i++)}t=t.slice(0,i)}return t}getKeyframeTrackValues(e,t,i){const r=i,s=[];let a=-1,o=-1,l=-1;return e.forEach(function(c){if(t.x&&(a=t.x.times.indexOf(c)),t.y&&(o=t.y.times.indexOf(c)),t.z&&(l=t.z.times.indexOf(c)),a!==-1){const u=t.x.values[a];s.push(u),r[0]=u}else s.push(r[0]);if(o!==-1){const u=t.y.values[o];s.push(u),r[1]=u}else s.push(r[1]);if(l!==-1){const u=t.z.values[l];s.push(u),r[2]=u}else s.push(r[2])}),s}synchronizeCurve(e,t,i){if(e===void 0)return{times:t,values:t.map(()=>i)};if(e.times.length===t.length)return e;const r=[];for(let s=0;s<t.length;s++)r.push(this.sampleCurveValue(e,t[s],i));return{times:t,values:r}}sampleCurveValue(e,t,i){const r=e.times,s=e.values;if(t<=r[0])return s[0];if(t>=r[r.length-1])return s[s.length-1];for(let a=0;a<r.length-1;a++)if(t>=r[a]&&t<=r[a+1]){if(r[a]===t)return s[a];const o=(t-r[a])/(r[a+1]-r[a]);return s[a]*(1-o)+s[a+1]*o}return i}interpolateRotations(e,t,i,r){const s=[],a=[];s.push(e.times[0]),a.push(nn.degToRad(e.values[0])),a.push(nn.degToRad(t.values[0])),a.push(nn.degToRad(i.values[0]));for(let o=1;o<e.values.length;o++){const l=[e.values[o-1],t.values[o-1],i.values[o-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;const c=l.map(nn.degToRad),u=[e.values[o],t.values[o],i.values[o]];if(isNaN(u[0])||isNaN(u[1])||isNaN(u[2]))continue;const h=u.map(nn.degToRad),d=[u[0]-l[0],u[1]-l[1],u[2]-l[2]],f=[Math.abs(d[0]),Math.abs(d[1]),Math.abs(d[2])];if(f[0]>=180||f[1]>=180||f[2]>=180){const _=Math.max(...f)/180,m=new Wt(...c,r),g=new Wt(...h,r),x=new Nt().setFromEuler(m),M=new Nt().setFromEuler(g);x.dot(M)<0&&M.set(-M.x,-M.y,-M.z,-M.w);const y=e.times[o-1],w=e.times[o]-y,E=new Nt,C=new Wt;for(let S=0;S<1;S+=1/_)E.copy(x.clone().slerp(M.clone(),S)),s.push(y+S*w),C.setFromQuaternion(E,r),a.push(C.x),a.push(C.y),a.push(C.z)}else s.push(e.times[o]),a.push(nn.degToRad(e.values[o])),a.push(nn.degToRad(t.values[o])),a.push(nn.degToRad(i.values[o]))}return[s,a]}}class hP{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new jg,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const t=this,i=e.split(/[\r\n]+/);return i.forEach(function(r,s){const a=r.match(/^[\s\t]*;/),o=r.match(/^[\s\t]*$/);if(a||o)return;const l=r.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),c=r.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),u=r.match("^\\t{"+(t.currentIndent-1)+"}}");l?t.parseNodeBegin(r,l):c?t.parseNodeProperty(r,c,i[++s]):u?t.popStack():r.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(r)}),this.allNodes}parseNodeBegin(e,t){const i=t[1].trim().replace(/^"/,"").replace(/"$/,""),r=t[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:i},a=this.parseNodeAttr(r),o=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(i,s):i in o?(i==="PoseNode"?o.PoseNode.push(s):o[i].id!==void 0&&(o[i]={},o[i][o[i].id]=o[i]),a.id!==""&&(o[i][a.id]=s)):typeof a.id=="number"?(o[i]={},o[i][a.id]=s):i!=="Properties70"&&(i==="PoseNode"?o[i]=[s]:o[i]=s),typeof a.id=="number"&&(s.id=a.id),a.name!==""&&(s.attrName=a.name),a.type!==""&&(s.attrType=a.type),this.pushStack(s)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let i="",r="";return e.length>1&&(i=e[1].replace(/^(\w+)::/,""),r=e[2]),{id:t,name:i,type:r}}parseNodeProperty(e,t,i){let r=t[1].replace(/^"/,"").replace(/"$/,"").trim(),s=t[2].replace(/^"/,"").replace(/"$/,"").trim();r==="Content"&&s===","&&(s=i.replace(/"/g,"").replace(/,$/,"").trim());const a=this.getCurrentNode();if(a.name==="Properties70"){this.parseNodeSpecialProperty(e,r,s);return}if(r==="C"){const l=s.split(",").slice(1),c=parseInt(l[0]),u=parseInt(l[1]);let h=s.split(",").slice(3);h=h.map(function(d){return d.trim().replace(/^"/,"")}),r="connections",s=[c,u],_P(s,h),a[r]===void 0&&(a[r]=[])}r==="Node"&&(a.id=s),r in a&&Array.isArray(a[r])?a[r].push(s):r!=="a"?a[r]=s:a.a=s,this.setCurrentProp(a,r),r==="a"&&s.slice(-1)!==","&&(a.a=jl(s))}parseNodePropertyContinued(e){const t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=jl(t.a))}parseNodeSpecialProperty(e,t,i){const r=i.split('",').map(function(u){return u.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=r[0],a=r[1],o=r[2],l=r[3];let c=r[4];switch(a){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=jl(c);break}this.getPrevNode()[s]={type:a,type2:o,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),s)}}class dP{parse(e){const t=new cp(e);t.skip(23);const i=t.getUint32();if(i<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+i);const r=new jg;for(;!this.endOfContent(t);){const s=this.parseNode(t,i);s!==null&&r.add(s.name,s)}return r}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){const i={},r=t>=7500?e.getUint64():e.getUint32(),s=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();const a=e.getUint8(),o=e.getString(a);if(r===0)return null;const l=[];for(let d=0;d<s;d++)l.push(this.parseProperty(e));const c=l.length>0?l[0]:"",u=l.length>1?l[1]:"",h=l.length>2?l[2]:"";for(i.singleProperty=s===1&&e.getOffset()===r;r>e.getOffset();){const d=this.parseNode(e,t);d!==null&&this.parseSubNode(o,i,d)}return i.propertyList=l,typeof c=="number"&&(i.id=c),u!==""&&(i.attrName=u),h!==""&&(i.attrType=h),o!==""&&(i.name=o),i}parseSubNode(e,t,i){if(i.singleProperty===!0){const r=i.propertyList[0];Array.isArray(r)?(t[i.name]=i,i.a=r):t[i.name]=r}else if(e==="Connections"&&i.name==="C"){const r=[];i.propertyList.forEach(function(s,a){a!==0&&r.push(s)}),t.connections===void 0&&(t.connections=[]),t.connections.push(r)}else if(i.name==="Properties70")Object.keys(i).forEach(function(s){t[s]=i[s]});else if(e==="Properties70"&&i.name==="P"){let r=i.propertyList[0],s=i.propertyList[1];const a=i.propertyList[2],o=i.propertyList[3];let l;r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?l=[i.propertyList[4],i.propertyList[5],i.propertyList[6]]:l=i.propertyList[4],t[r]={type:s,type2:a,flag:o,value:l}}else t[i.name]===void 0?typeof i.id=="number"?(t[i.name]={},t[i.name][i.id]=i):t[i.name]=i:i.name==="PoseNode"?(Array.isArray(t[i.name])||(t[i.name]=[t[i.name]]),t[i.name].push(i)):t[i.name][i.id]===void 0&&(t[i.name][i.id]=i)}parseProperty(e){const t=e.getString(1);let i;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return i=e.getUint32(),e.getArrayBuffer(i);case"S":return i=e.getUint32(),e.getString(i);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const r=e.getUint32(),s=e.getUint32(),a=e.getUint32();if(s===0)switch(t){case"b":case"c":return e.getBooleanArray(r);case"d":return e.getFloat64Array(r);case"f":return e.getFloat32Array(r);case"i":return e.getInt32Array(r);case"l":return e.getInt64Array(r)}const o=ZC(new Uint8Array(e.getArrayBuffer(a))),l=new cp(o.buffer);switch(t){case"b":case"c":return l.getBooleanArray(r);case"d":return l.getFloat64Array(r);case"f":return l.getFloat32Array(r);case"i":return l.getInt32Array(r);case"l":return l.getInt64Array(r)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}}class cp{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){const t=[];for(let i=0;i<e;i++)t.push(this.getBoolean());return t}getUint8(){const e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){const e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){const e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){const t=[];for(let i=0;i<e;i++)t.push(this.getInt32());return t}getUint32(){const e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){const t=[];for(let i=0;i<e;i++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){const e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){const t=[];for(let i=0;i<e;i++)t.push(this.getFloat32());return t}getFloat64(){const e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){const t=[];for(let i=0;i<e;i++)t.push(this.getFloat64());return t}getArrayBuffer(e){const t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){const t=this.offset;let i=new Uint8Array(this.dv.buffer,t,e);this.skip(e);const r=i.indexOf(0);return r>=0&&(i=new Uint8Array(this.dv.buffer,t,r)),this._textDecoder.decode(i)}}class jg{add(e,t){this[e]=t}}function fP(n){const e="Kaydara FBX Binary  \0";return n.byteLength>=e.length&&e===Jg(n,0,e.length)}function pP(n){const e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let t=0;function i(r){const s=n[r-1];return n=n.slice(t+r),t++,s}for(let r=0;r<e.length;++r)if(i(1)===e[r])return!1;return!0}function up(n){const e=/FBXVersion: (\d+)/,t=n.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function mP(n){return n/46186158e3}const gP=[];function Ka(n,e,t,i){let r;switch(i.mappingType){case"ByPolygonVertex":r=n;break;case"ByPolygon":r=e;break;case"ByVertice":r=t;break;case"AllSame":r=i.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+i.mappingType)}i.referenceType==="IndexToDirect"&&(r=i.indices[r]);const s=r*i.dataSize,a=s+i.dataSize;return xP(gP,i.buffer,s,a)}const $l=new Wt,Dr=new D;function Zg(n){const e=new Ae,t=new Ae,i=new Ae,r=new Ae,s=new Ae,a=new Ae,o=new Ae,l=new Ae,c=new Ae,u=new Ae,h=new Ae,d=new Ae,f=n.inheritType?n.inheritType:0;n.translation&&e.setPosition(Dr.fromArray(n.translation));const p=Zs(0);if(n.preRotation){const I=n.preRotation.map(nn.degToRad);I.push(p),t.makeRotationFromEuler($l.fromArray(I))}if(n.rotation){const I=n.rotation.map(nn.degToRad);I.push(n.eulerOrder||p),i.makeRotationFromEuler($l.fromArray(I))}if(n.postRotation){const I=n.postRotation.map(nn.degToRad);I.push(p),r.makeRotationFromEuler($l.fromArray(I)),r.invert()}n.scale&&s.scale(Dr.fromArray(n.scale)),n.scalingOffset&&o.setPosition(Dr.fromArray(n.scalingOffset)),n.scalingPivot&&a.setPosition(Dr.fromArray(n.scalingPivot)),n.rotationOffset&&l.setPosition(Dr.fromArray(n.rotationOffset)),n.rotationPivot&&c.setPosition(Dr.fromArray(n.rotationPivot)),n.parentMatrixWorld&&(h.copy(n.parentMatrix),u.copy(n.parentMatrixWorld));const _=t.clone().multiply(i).multiply(r),m=new Ae;m.extractRotation(u);const g=new Ae;g.copyPosition(u);const x=g.clone().invert().multiply(u),M=m.clone().invert().multiply(x),y=s,w=new Ae;if(f===0)w.copy(m).multiply(_).multiply(M).multiply(y);else if(f===1)w.copy(m).multiply(M).multiply(_).multiply(y);else{const N=new Ae().scale(new D().setFromMatrixScale(h)).clone().invert(),W=M.clone().multiply(N);w.copy(m).multiply(_).multiply(W).multiply(y)}const E=c.clone().invert(),C=a.clone().invert();let S=e.clone().multiply(l).multiply(c).multiply(t).multiply(i).multiply(r).multiply(E).multiply(o).multiply(a).multiply(s).multiply(C);const A=new Ae().copyPosition(S),P=u.clone().multiply(A);return d.copyPosition(P),S=d.clone().multiply(w),S.premultiply(u.invert()),S}function Zs(n){n=n||0;const e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return n===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[n]}function jl(n){return n.split(",").map(function(t){return parseFloat(t)})}function Jg(n,e,t){return e===void 0&&(e=0),t===void 0&&(t=n.byteLength),new TextDecoder().decode(new Uint8Array(n,e,t))}function _P(n,e){for(let t=0,i=n.length,r=e.length;t<r;t++,i++)n[i]=e[t]}function xP(n,e,t,i){for(let r=t,s=0;r<i;r++,s++)n[s]=e[r];return n}function vP(n){const e=new Map,t=new Map,i=n.clone();return Qg(n,i,function(r,s){e.set(s,r),t.set(r,s)}),i.traverse(function(r){if(!r.isSkinnedMesh)return;const s=r,a=e.get(r),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),i}function Qg(n,e,t){t(n,e);for(let i=0;i<n.children.length;i++)Qg(n.children[i],e.children[i],t)}const SP=new D(0,1,0),MP=.01,yP="Armature|Idle",TP="Armature|Cast",EP="Kobold Walk",bP="Kobold Defeat";function Xr(n,e){const t=new pn,i=vP(n);OP(i),t.add(i);const s=new qn().setFromObject(i).getSize(new D),a=s.y>0?e/s.y:1;i.scale.multiplyScalar(a),i.updateWorldMatrix(!0,!0);const o=new qn().setFromObject(i),l=o.getCenter(new D);return i.position.x-=l.x,i.position.y-=o.min.y,i.position.z-=l.z,i.updateWorldMatrix(!0,!0),t}function Zl(n){let e=!1;return n.traverse(t=>{t instanceof lt&&t.geometry!=null&&(e=!0)}),e}function Jl(n){const e=new Map;if(n.traverse(i=>{i instanceof Xs&&e.set(i.name,i)}),e.size===0)return!1;let t=0;for(const i of e.values())for(const r of i.children)r instanceof Xs&&(t+=DP(i,r)?1:0);return t+=Fr(e.get("hips"),.05,"#4b2e83")?1:0,t+=Fr(e.get("chest"),.065,"#4b2e83")?1:0,t+=Fr(e.get("head"),.06,"#f5e9c9")?1:0,t+=Fr(e.get("hand_l"),.028,"#f5e9c9")?1:0,t+=Fr(e.get("hand_r"),.028,"#f5e9c9")?1:0,t+=Fr(e.get("staff_l"),.025,"#c8a24b")?1:0,t+=FP(e.get("shield"))?1:0,t>0}function AP(n,e,t){const i=n.find(s=>s.duration>0&&s.tracks.length>0);if(i==null)return null;const r=RP(i.duration,e,t);return cA.subclip(i,`mage-loop-frames-${e}-${t}`,e,t+1,r)}function wP(n,e,t){const i=bo(n,yP,"idle"),r=bo(n,TP,"cast"),s=[];if(i!=null)s.push(Ls(i,"idle"));else{const a=AP(n,e,t);a!=null&&s.push(Ls(a,"idle"))}return r!=null&&s.push(Ls(r,"cast")),s}function hp(n){const e=bo(n,EP,"kobold walk",["walk"]),t=bo(n,bP,"kobold defeat",["defeat"]),i=[];return e!=null&&i.push(Ls(e,"walk")),t!=null&&i.push(Ls(t,"defeat")),i}function RP(n,e,t){const i=Math.max(1,t-e);return n>0?i/n:24}function IP(n){return n.duration>0&&n.tracks.length>0}function bo(n,e,t,i=[]){const r=e.trim().toLowerCase(),s=t.trim().toLowerCase(),a=i.map(o=>o.trim().toLowerCase());return n.find(o=>{const l=o.name.trim().toLowerCase();return IP(o)&&(l===r||l.endsWith(`|${s}`)||l.endsWith(s)||a.some(c=>l===c||l.endsWith(`|${c}`)||l.endsWith(c)))})}function Ls(n,e){const t=n.clone();return t.name=e,t}function Ql(n){n.traverse(e=>{e instanceof lt&&ch(e.material)&&(e.material=new ea({color:"#4b2e83",roughness:.72,metalness:.05}))})}function ec(n){n.traverse(e=>{if(e instanceof lt){ch(e.material)&&(e.material=e0());for(const t of t0(e))t.side=Jt,t.transparent=!1,t.opacity=1,t.depthWrite=!0,t.needsUpdate=!0;e.visible=!0}})}function tc(n,e){n.traverse(t=>{if(!(t instanceof lt))return;const i=LP(t),r=ch(t.material)?[i?dp(e):e0()]:t0(t).map(s=>i?dp(e):PP(s));t.material=r.length===1?r[0]:r,t.visible=!0})}function nc(n){if(typeof document>"u")return n;const e=n.image,t=e.width??e.naturalWidth??e.videoWidth??0,i=e.height??e.naturalHeight??e.videoHeight??0;if(t<=0||i<=0)return n;const r=document.createElement("canvas");r.width=t,r.height=i;const s=r.getContext("2d");if(s==null)return n;s.drawImage(e,0,0,t,i);const a=s.getImageData(0,0,t,i),o=CP(a.data,t,i);a.data.set(o),s.putImageData(a,0,0);const l=new Mg(r);return l.colorSpace=et,l.flipY=n.flipY,l.wrapS=n.wrapS,l.wrapT=n.wrapT,l.minFilter=n.minFilter,l.magFilter=n.magFilter,l.generateMipmaps=n.generateMipmaps,l.needsUpdate=!0,l}function CP(n,e,t,i={}){const r=i.iterations??8,s=i.targetAlphaMax??16,a=i.sourceAlphaMin??24,o=new Uint8ClampedArray(n);let l=new Uint8Array(e*t);for(let c=0;c<e*t;c+=1)l[c]=n[c*4+3]>=a?1:0;for(let c=0;c<r;c+=1){const u=new Uint8ClampedArray(o),h=new Uint8Array(l);let d=!1;for(let f=0;f<t;f+=1)for(let p=0;p<e;p+=1){const _=f*e+p,m=_*4;if(l[_]!==0||n[m+3]>s)continue;let g=0,x=0,M=0,y=0;for(let w=-1;w<=1;w+=1)for(let E=-1;E<=1;E+=1){if(E===0&&w===0)continue;const C=p+E,S=f+w;if(C<0||C>=e||S<0||S>=t)continue;const A=S*e+C;if(l[A]===0)continue;const P=A*4;g+=o[P],x+=o[P+1],M+=o[P+2],y+=1}y>0&&(u[m]=Math.round(g/y),u[m+1]=Math.round(x/y),u[m+2]=Math.round(M/y),h[_]=1,d=!0)}if(o.set(u),l=h,!d)break}return o}function e0(){return new ea({color:"#8b6fcb",roughness:.66,metalness:.08,side:Jt,transparent:!1,opacity:1,depthWrite:!0})}function dp(n){return new mn({map:n,color:"#ffffff",side:Jt,transparent:!0,alphaTest:MP,opacity:1,depthWrite:!0})}function PP(n){return n.side=Jt,n.transparent=!1,n.opacity=1,n.depthWrite=!0,n.needsUpdate=!0,n}function LP(n){return n.geometry.getAttribute("uv")!=null}function t0(n){return Array.isArray(n.material)?n.material:[n.material]}function DP(n,e){const t=e.position.clone(),i=t.length();if(i<.015)return!1;const r=NP(n.name),s=new lt(new ss(r,r,i,8),UP(n.name));return s.name=`proxy-segment-${n.name}-${e.name}`,s.position.copy(t).multiplyScalar(.5),s.quaternion.setFromUnitVectors(SP,t.clone().normalize()),n.add(s),!0}function Fr(n,e,t){if(n==null)return!1;const i=new lt(new zo(e,12,8),Ds(t));return i.name=`proxy-sphere-${n.name}`,n.add(i),!0}function FP(n){if(n==null)return!1;const e=new lt(new fi(.09,.12,.018),Ds("#c8a24b"));return e.name=`proxy-shield-${n.name}`,e.position.y=.04,n.add(e),!0}function NP(n){return n.includes("staff")||n.includes("hair")||n.endsWith("_end")?.01:n.includes("chest")||n.includes("hips")||n.includes("neck")?.026:n.includes("pauldron")||n.includes("shield")?.02:.017}function UP(n){return n.includes("head")||n.includes("hand")||n.includes("neck")?Ds("#f5e9c9"):n.includes("staff")||n.includes("shield")||n.includes("pauldron")?Ds("#c8a24b"):Ds("#4b2e83")}function Ds(n){return new ea({color:n,roughness:.68,metalness:n==="#c8a24b"?.18:.04})}function OP(n){n.traverse(e=>{e instanceof lt&&(e.geometry=e.geometry.clone(),e.material=n0(e.material))})}function n0(n){if(Array.isArray(n))return n.map(i=>n0(i));const e=n.clone(),t=n.map;if(t instanceof Ot&&"map"in e){const i=t.clone();i.needsUpdate=!0,e.map=i}return e}function ch(n){return Array.isArray(n)?n.length===0:n==null}const i0=1.45,Ao=1.16,BP=0,kP=60,HP=-Math.PI/2,zP=-Math.PI/2,nr=10.8,Zi=nr/(Ze/Yt);class VP{constructor(){ne(this,"mageTemplate",null);ne(this,"pendingMageTemplate",null);ne(this,"mageTemplateVersion",0);ne(this,"mageLoadStarted",!1);ne(this,"mageTexture",null);ne(this,"mageTextureLoadStarted",!1);ne(this,"mageTextureDebugShown",!1);ne(this,"mageBoneOnlyWarningShown",!1);ne(this,"koboldTemplate",null);ne(this,"pendingKoboldTemplate",null);ne(this,"koboldTemplateVersion",0);ne(this,"koboldLoadStarted",!1);ne(this,"koboldTexture",null);ne(this,"koboldTextureLoadStarted",!1);ne(this,"koboldTextureDebugShown",!1);ne(this,"koboldBoneOnlyWarningShown",!1);ne(this,"bossTemplate",null);ne(this,"pendingBossTemplate",null);ne(this,"bossTemplateVersion",0);ne(this,"bossLoadStarted",!1);ne(this,"bossTexture",null);ne(this,"bossTextureLoadStarted",!1);ne(this,"bossTextureDebugShown",!1);ne(this,"bossBoneOnlyWarningShown",!1);this.startMageModelLoad(),this.startKoboldModelLoad(),this.startBossModelLoad()}create(e,t){switch(e){case at.backdropForest:return KP(t??R.backdrops.castle);case at.mage:return this.createMage();case at.princeCage:return ZP();case at.goalFlag:return JP();case at.pathMarker:return QP();case at.monsterPlaceholder:return this.createKobold();case at.miniBoss:return this.createBoss();case at.projectilePlaceholder:return eL();case at.fireBurn:return tL();case at.earthImpact:return nL();case at.healthBarTrack:return fp("#1f1830",.85);case at.healthBarFill:return fp("#27ae60",.95);default:return rL(e)}}getTemplateVersion(e,t){return e===at.backdropForest?qP(t??R.backdrops.castle):e===at.mage?this.mageTemplateVersion:e===at.monsterPlaceholder?this.koboldTemplateVersion:e===at.miniBoss?this.bossTemplateVersion:0}dispose(e){e.traverse(t=>{t instanceof lt&&(t.geometry.dispose(),Su(t.material)),t instanceof vg&&(t.geometry.dispose(),Su(t.material))})}disposeCachedResources(){this.mageTemplate!=null&&(this.dispose(this.mageTemplate),this.mageTemplate=null),this.pendingMageTemplate!=null&&(this.dispose(this.pendingMageTemplate),this.pendingMageTemplate=null),this.mageTexture=null,this.koboldTemplate!=null&&(this.dispose(this.koboldTemplate),this.koboldTemplate=null),this.pendingKoboldTemplate!=null&&(this.dispose(this.pendingKoboldTemplate),this.pendingKoboldTemplate=null),this.koboldTexture=null,this.bossTemplate!=null&&(this.dispose(this.bossTemplate),this.bossTemplate=null),this.pendingBossTemplate!=null&&(this.dispose(this.pendingBossTemplate),this.pendingBossTemplate=null),this.bossTexture=null}createMage(){return this.startMageModelLoad(),this.mageTemplate!=null?GP(this.mageTemplate):new pn}createKobold(){return this.startKoboldModelLoad(),this.koboldTemplate!=null?XP(this.koboldTemplate):new pn}createBoss(){return this.startBossModelLoad(),this.bossTemplate!=null?YP(this.bossTemplate):new pn}startMageModelLoad(){if(this.mageLoadStarted||typeof window>"u")return;const e=bi(R.rigs.mage);if((e==null?void 0:e.sourceFormat)!=="fbx")return;this.mageLoadStarted=!0;const t=new ql,i=si(e.browserUrl);t.load(i,r=>{const s=Zl(r);if(!s){const a=Jl(r);if(this.mageBoneOnlyWarningShown||(console.warn(a?`Mage FBX at ${i} has animation bones but no renderable meshes; using temporary bone proxy visuals.`:`Mage FBX at ${i} has no renderable meshes and no usable bones; keeping placeholder mage.`),this.mageBoneOnlyWarningShown=!0),!a)return}Ql(r),ec(r),this.pendingMageTemplate=Xr(r,i0),this.pendingMageTemplate.animations=wP(r.animations,BP,kP),s&&(this.publishMageTemplateIfTextureReady(),this.startMageTextureLoad())},void 0,r=>{console.warn(`Failed to load mage FBX from ${i}`,r)})}startMageTextureLoad(){if(this.mageTextureLoadStarted||typeof window>"u")return;const e=bi(R.materials.mageTexture);if(e==null)return;this.mageTextureLoadStarted=!0;const t=si(e.browserUrl);new Wr().load(t,i=>{i.colorSpace=et,this.mageTexture=nc(i),this.publishMageTemplateIfTextureReady()},void 0,i=>{console.warn(`Failed to load mage texture from ${t}`,i)})}publishMageTemplateIfTextureReady(){return this.pendingMageTemplate==null||this.mageTexture==null?!1:(tc(this.pendingMageTemplate,this.mageTexture),this.mageTextureDebugShown,this.mageTemplate!=null&&this.dispose(this.mageTemplate),this.mageTemplate=this.pendingMageTemplate,this.pendingMageTemplate=null,this.mageTemplateVersion+=1,!0)}startKoboldModelLoad(){if(this.koboldLoadStarted||typeof window>"u")return;const e=bi(R.rigs.kobold);if((e==null?void 0:e.sourceFormat)!=="fbx")return;this.koboldLoadStarted=!0;const t=new ql,i=si(e.browserUrl);t.load(i,r=>{const s=Zl(r);if(!s){const a=Jl(r);if(this.koboldBoneOnlyWarningShown||(console.warn(a?`Kobold FBX at ${i} has animation bones but no renderable meshes; using temporary bone proxy visuals.`:`Kobold FBX at ${i} has no renderable meshes and no usable bones; keeping placeholder kobold.`),this.koboldBoneOnlyWarningShown=!0),!a)return}Ql(r),ec(r),this.pendingKoboldTemplate=Xr(r,Ao),this.pendingKoboldTemplate.animations=hp(r.animations),s&&(this.publishKoboldTemplateIfTextureReady(),this.startKoboldTextureLoad())},void 0,r=>{console.warn(`Failed to load kobold FBX from ${i}`,r)})}startKoboldTextureLoad(){if(this.koboldTextureLoadStarted||typeof window>"u")return;const e=bi(R.materials.koboldTexture);if(e==null)return;this.koboldTextureLoadStarted=!0;const t=si(e.browserUrl);new Wr().load(t,i=>{i.colorSpace=et,this.koboldTexture=nc(i),this.publishKoboldTemplateIfTextureReady()},void 0,i=>{console.warn(`Failed to load kobold texture from ${t}`,i)})}publishKoboldTemplateIfTextureReady(){return this.pendingKoboldTemplate==null||this.koboldTexture==null?!1:(tc(this.pendingKoboldTemplate,this.koboldTexture),this.koboldTextureDebugShown,this.koboldTemplate!=null&&this.dispose(this.koboldTemplate),this.koboldTemplate=this.pendingKoboldTemplate,this.pendingKoboldTemplate=null,this.koboldTemplateVersion+=1,!0)}startBossModelLoad(){if(this.bossLoadStarted||typeof window>"u")return;const e=bi(R.rigs.boss);if((e==null?void 0:e.sourceFormat)!=="fbx")return;this.bossLoadStarted=!0;const t=new ql,i=si(e.browserUrl);t.load(i,r=>{const s=Zl(r);if(!s){const a=Jl(r);if(this.bossBoneOnlyWarningShown||(console.warn(a?`Boss FBX at ${i} has animation bones but no renderable meshes; using temporary bone proxy visuals.`:`Boss FBX at ${i} has no renderable meshes and no usable bones; keeping placeholder boss.`),this.bossBoneOnlyWarningShown=!0),!a)return}Ql(r),ec(r),this.pendingBossTemplate=Xr(r,Ao),this.pendingBossTemplate.animations=hp(r.animations),s&&(this.publishBossTemplateIfTextureReady(),this.startBossTextureLoad())},void 0,r=>{console.warn(`Failed to load boss FBX from ${i}`,r)})}startBossTextureLoad(){if(this.bossTextureLoadStarted||typeof window>"u")return;const e=bi(R.materials.bossTexture);if(e==null)return;this.bossTextureLoadStarted=!0;const t=si(e.browserUrl);new Wr().load(t,i=>{i.colorSpace=et,this.bossTexture=nc(i),this.publishBossTemplateIfTextureReady()},void 0,i=>{console.warn(`Failed to load boss texture from ${t}`,i)})}publishBossTemplateIfTextureReady(){return this.pendingBossTemplate==null||this.bossTexture==null?!1:(tc(this.pendingBossTemplate,this.bossTexture),this.bossTextureDebugShown,this.bossTemplate!=null&&this.dispose(this.bossTemplate),this.bossTemplate=this.pendingBossTemplate,this.pendingBossTemplate=null,this.bossTemplateVersion+=1,!0)}}function GP(n){const e=Xr(n,i0);return WP(e),e.animations=n.animations,e}function WP(n){const e=n.children[0]??n;e.rotation.y=HP}function XP(n){const e=Xr(n,Ao);return r0(e),e.animations=n.animations,e}function YP(n){const e=Xr(n,Ao);return r0(e),e.animations=n.animations,e}function r0(n){const e=n.children[0]??n;e.rotation.y=zP}function KP(n){const e=new pn,t=new Fn(1,1),i=new mn({color:"#2d2345",depthWrite:!1}),r=new lt(t,i);return r.name="castle-backdrop-plane",r.renderOrder=-100,s0(r,nr/Zi),e.add(r),jP(r,n),e}function qP(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function $P(n){const e=Number.isFinite(n)&&n>0?n:nr/Zi,t=nr/Zi;if(e>t)return{width:Zi*e,height:Zi,centerY:0};const i=nr/e;return{width:nr,height:i,centerY:Zi/2-i/2}}function s0(n,e){const t=$P(e);n.scale.set(t.width,t.height,1),n.position.y=t.centerY}function jP(n,e){if(typeof window>"u")return;const t=bi(e);if(t==null)return;const i=si(t.browserUrl);new Wr().load(i,r=>{r.colorSpace=et;const s=r.image,a=(s==null?void 0:s.width)!=null&&(s==null?void 0:s.height)!=null&&s.height>0?s.width/s.height:nr/Zi;s0(n,a),Su(n.material),n.material=new mn({map:r,depthWrite:!1})},void 0,r=>{console.warn(`Failed to load hero-stage backdrop texture (${e}) from ${i}`,r)})}function ZP(){const n=new pn,e=new fi(1,1.25,.7),t=new Db(e),i=new vg(t,new nh({color:"#c8a24b"}));return i.position.y=.45,n.add(i),n.add(cr(new zo(.22,16,10),"#f5e9c9",0,.5,0)),n.add(cr(new fi(.55,.45,.25),"#8b6fcb",0,.02,0)),n}function JP(){const n=new pn;n.add(cr(new ss(.035,.035,1,8),"#f5e9c9",0,.38,0));const e=cr(new Fn(.55,.36),"#c8a24b",.26,.74,.02);return n.add(e),n}function QP(){return cr(new ss(.45,.45,.05,24),"#f5e9c9",0,0,0)}function eL(){return cr(new ss(.05,.05,1,8),"#f2c94c",0,0,0,Math.PI/2)}function tL(){const n=new mn({map:o0(),color:"#ffffff",transparent:!0,opacity:.92,depthWrite:!1,depthTest:!1,side:Jt}),e=new lt(new Fn(1,1),n);return e.name="fire-burn-sprite",e.position.y=.5,e.renderOrder=12,iL(n),e}function nL(){const n=new mn({map:o0(),color:"#ffffff",transparent:!0,opacity:.94,depthWrite:!1,depthTest:!1,side:Jt}),e=new lt(new Fn(1,1),n);return e.name="earth-impact-sprite",e.renderOrder=14,a0(n,R.spritesheets.earthImpact,2,2,"earth impact"),e}function iL(n){a0(n,R.spritesheets.fireBurn,4,2,"fire burn")}function a0(n,e,t,i,r){if(typeof window>"u")return;const s=bi(e);if(s==null)return;const a=si(s.browserUrl);new Wr().load(a,o=>{var l;o.colorSpace=et,o.wrapS=dn,o.wrapT=dn,o.repeat.set(1/t,1/i),o.offset.set(0,1-1/i),(l=n.map)==null||l.dispose(),n.map=o,n.needsUpdate=!0},void 0,o=>{console.warn(`Failed to load ${r} spritesheet from ${a}`,o)})}function o0(){const n=new Ho(new Uint8Array([0,0,0,0]),1,1,fn);return n.colorSpace=et,n.needsUpdate=!0,n}function fp(n,e){const t=new mn({color:n,transparent:e<1,opacity:e,depthWrite:!1}),i=new lt(new Fn(1,1),t);return i.renderOrder=8,i}function rL(n){const e=sL(n);return cr(new fi(.7,.7,.7),e,0,.35,0)}function cr(n,e,t,i,r,s=0){const a=new ea({color:e,roughness:.7,metalness:.05}),o=new lt(n,a);return o.position.set(t,i,r),o.rotation.z=s,o}function Su(n){if(Array.isArray(n)){for(const e of n)pp(e);return}pp(n)}function pp(n){"map"in n&&n.map instanceof Ot&&n.map.dispose(),n.dispose()}function sL(n){let e=0;for(let t=0;t<n.length;t+=1)e=e*31+n.charCodeAt(t)>>>0;return`#${(e&16777215).toString(16).padStart(6,"0")}`}class aL{constructor(){ne(this,"objectById",new Map);ne(this,"templateById",new Map);ne(this,"templateVersionById",new Map)}get(e){return this.objectById.get(e)}set(e,t,i,r){this.objectById.set(e,r),this.templateById.set(e,t),this.templateVersionById.set(e,i)}getTemplateId(e){return this.templateById.get(e)}getTemplateVersion(e){return this.templateVersionById.get(e)}entries(){return this.objectById.entries()}delete(e){this.objectById.delete(e),this.templateById.delete(e),this.templateVersionById.delete(e)}clear(){this.objectById.clear(),this.templateById.clear(),this.templateVersionById.clear()}}const oL=15,lL=60,l0=18,cL=2.35,uL=.24,hL=Math.PI*5.2,dL=4,fL=2,pL=8,mL=12,gL=2,_L=2,xL=4,vL=12,mp=new WeakMap;class SL{constructor(e){ne(this,"scene",new vb);ne(this,"camera",wL(Ze/Yt));ne(this,"renderer");ne(this,"factory",new VP);ne(this,"objectCache",new aL);ne(this,"projectileCache",new Map);ne(this,"mageChargeCache",new Map);ne(this,"cameraController",new OC);ne(this,"animationControllers",new Map);ne(this,"castTriggeredProjectileIds",new Set);ne(this,"elapsedSec",0);ne(this,"cameraBoundsOptions",{});this.container=e,this.renderer=new UC({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(Ze,Yt,!1),this.renderer.domElement.className="hero-stage-canvas",this.container.appendChild(this.renderer.domElement),this.scene.background=new Fe("#20172f"),this.scene.add(new Dg("#ffffff",1.5));const t=new Lg("#fff4d6",1.2);t.position.set(3,4,5),this.scene.add(t)}render(e,t){this.elapsedSec+=Math.max(0,t),this.syncCamera(e),this.syncObjects(e.objects),this.syncProjectileCastTriggers(e.activeProjectiles),this.updateAnimationMixers(t),this.syncMageCharges(e.activeProjectiles),this.syncProjectiles(e.activeProjectiles),this.renderer.render(this.scene,this.camera)}resize(e,t,i=1,r="center"){this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(e,t,!1),this.cameraBoundsOptions={viewScale:i,anchor:r},RL(this.camera,e/t,this.cameraBoundsOptions),this.camera.updateProjectionMatrix()}getMageParticleSourceLogicalPosition(e=Ze,t=Yt){return VL(this.objectCache.get("actor-mage"),this.camera,e,t)}dispose(){for(const[,e]of this.objectCache.entries())this.scene.remove(e),this.factory.dispose(e);for(const[,e]of this.projectileCache.entries())this.scene.remove(e.mesh),e.lightningRay!=null&&this.scene.remove(e.lightningRay),vp(e);for(const[,e]of this.mageChargeCache.entries())this.scene.remove(e.mesh),Sp(e);this.animationControllers.clear(),this.castTriggeredProjectileIds.clear(),this.objectCache.clear(),this.projectileCache.clear(),this.mageChargeCache.clear(),this.factory.disposeCachedResources(),this.renderer.dispose(),this.renderer.domElement.remove()}syncCamera(e){this.cameraController.apply(this.camera,e.camera,IL(this.camera),this.cameraBoundsOptions)}syncProjectileCastTriggers(e){const t=new Set;for(const i of e)t.add(i.projectileId),!(i.originKind==="world"||!kL(i)||this.castTriggeredProjectileIds.has(i.projectileId))&&(this.triggerObjectCastAnimation("actor-mage"),this.castTriggeredProjectileIds.add(i.projectileId));for(const i of[...this.castTriggeredProjectileIds])t.has(i)||this.castTriggeredProjectileIds.delete(i)}syncProjectiles(e){const t=new Set,i=this.objectCache.get("actor-mage");for(const r of e){if(!HL(r))continue;const s=`projectile-${r.projectileId}`;t.add(s);const a=xp(r,i),o=this.getOrCreateProjectile(s,a);KL(o,a,this.elapsedSec)}for(const[r,s]of[...this.projectileCache.entries()])t.has(r)||(this.scene.remove(s.mesh),s.lightningRay!=null&&this.scene.remove(s.lightningRay),vp(s),this.projectileCache.delete(r))}syncMageCharges(e){const t=new Set,i=this.objectCache.get("actor-mage");for(const r of e){if(!GL(r))continue;const s=`mage-charge-${r.projectileId}`;t.add(s);const a=xp(r,i),o=this.getOrCreateMageCharge(s,a);eD(o,a)}for(const[r,s]of[...this.mageChargeCache.entries()])t.has(r)||(this.scene.remove(s.mesh),Sp(s),this.mageChargeCache.delete(r))}getOrCreateMageCharge(e,t){const i=this.mageChargeCache.get(e);if(i!=null)return i;const r=YL(t);return this.mageChargeCache.set(e,r),this.scene.add(r.mesh),r}getOrCreateProjectile(e,t){const i=this.projectileCache.get(e);if(i!=null)return i;const r=XL(t);return this.projectileCache.set(e,r),this.scene.add(r.mesh),r.lightningRay!=null&&this.scene.add(r.lightningRay),r}syncObjects(e){const t=new Set;for(const i of e){t.add(i.objectId);const r=this.getOrCreateObject(i);CL(r,i,this.elapsedSec),this.syncObjectAnimation(i.objectId,i.animationId,i.animationPaused,i.animationTimeSec)}for(const[i,r]of[...this.objectCache.entries()])t.has(i)||(this.scene.remove(r),this.animationControllers.delete(i),this.factory.dispose(r),this.objectCache.delete(i))}getOrCreateObject(e){const t=this.objectCache.get(e.objectId),i=this.factory.getTemplateVersion(e.templateId,e.backdropTextureId);if(t!=null&&this.objectCache.getTemplateId(e.objectId)===e.templateId&&this.objectCache.getTemplateVersion(e.objectId)===i)return t;t!=null&&(this.scene.remove(t),this.animationControllers.delete(e.objectId),this.factory.dispose(t),this.objectCache.delete(e.objectId));const r=this.factory.create(e.templateId,e.backdropTextureId);return this.objectCache.set(e.objectId,e.templateId,i,r),this.attachAnimationController(e.objectId,r),this.scene.add(r),r}attachAnimationController(e,t){const i=ML(t);i!=null&&this.animationControllers.set(e,i)}triggerObjectCastAnimation(e){const t=this.animationControllers.get(e);t!=null&&yL(t)}syncObjectAnimation(e,t,i,r){const s=this.animationControllers.get(e);if(s!=null){if(t==="defeat"){c0(s,"defeat");return}(t==="walk"||t==="idle")&&(uh(s,t),r!=null&&TL(s,r),hh(s,i===!0))}}updateAnimationMixers(e){const t=Math.max(0,e);for(const i of this.animationControllers.values())EL(i,t)}}function ML(n){const e=n.animations.find(p=>p.name==="idle"),t=n.animations.find(p=>p.name==="walk"),i=n.animations.find(p=>p.name==="cast"),r=n.animations.find(p=>p.name==="defeat"),s=e??t??n.animations.find(p=>p.name!=="cast"&&p.name!=="defeat")??n.animations[0];if(s==null&&i==null&&r==null)return null;const a=new HA(n),o=e??(t==null?s:void 0),l=o==null?void 0:gp(a,o),c=t==null?void 0:gp(a,t),u=i==null?void 0:a.clipAction(i);u!=null&&(u.setLoop(xo,1),u.clampWhenFinished=!1,u.setEffectiveWeight(0));const h=r==null?void 0:a.clipAction(r);h!=null&&(h.setLoop(xo,1),h.clampWhenFinished=!0,h.setEffectiveWeight(0));const d=t!=null&&e==null?"walk":"idle",f={mixer:a,idleAction:l,walkAction:c,castAction:u,defeatAction:h,castDurationSec:(i==null?void 0:i.duration)??0,castRemainingSec:0,defeatDurationSec:(r==null?void 0:r.duration)??0,defeatRemainingSec:0,activeLoopId:d,loopPaused:!1};return uh(f,d),f}function gp(n,e){const t=n.clipAction(e);return t.reset(),t.setLoop(cg,1/0),t.setEffectiveWeight(0),t.play(),t}function yL(n){c0(n,"cast")}function c0(n,e){var r,s;const t=e==="cast"?n.castAction:n.defeatAction,i=e==="cast"?n.castDurationSec:n.defeatDurationSec;t==null||i<=0||e==="defeat"&&n.activeOneShotId==="defeat"||((r=n.idleAction)==null||r.setEffectiveWeight(0),(s=n.walkAction)==null||s.setEffectiveWeight(0),hh(n,!1),t.reset(),t.setLoop(xo,1),t.clampWhenFinished=e==="defeat",t.enabled=!0,t.setEffectiveWeight(1),t.play(),n.activeOneShotId=e,e==="cast"?n.castRemainingSec=n.castDurationSec:n.defeatRemainingSec=n.defeatDurationSec)}function uh(n,e){var r,s;if(n.activeOneShotId==="defeat")return;const t=e==="walk"?n.walkAction:n.idleAction,i=t??n.idleAction??n.walkAction;i!=null&&(n.activeLoopId=t===n.walkAction?"walk":"idle",!(n.castRemainingSec>0||n.defeatRemainingSec>0)&&((r=n.idleAction)==null||r.setEffectiveWeight(i===n.idleAction?1:0),(s=n.walkAction)==null||s.setEffectiveWeight(i===n.walkAction?1:0),i.enabled=!0,i.play(),i.paused=n.loopPaused))}function hh(n,e){if(n.loopPaused=e,n.activeOneShotId==null){if(n.activeLoopId==="walk"){n.walkAction!=null&&(n.walkAction.paused=e);return}n.idleAction!=null&&(n.idleAction.paused=e)}}function TL(n,e){const t=Math.max(0,e);if(n.activeLoopId==="walk"){n.walkAction!=null&&(n.walkAction.time=t);return}n.idleAction!=null&&(n.idleAction.time=t)}function EL(n,e){const t=Math.max(0,e);n.mixer.update(t),n.defeatRemainingSec>0&&(n.defeatRemainingSec=Math.max(0,n.defeatRemainingSec-t),n.defeatRemainingSec<=0&&bL(n)),n.castRemainingSec>0&&(n.castRemainingSec=Math.max(0,n.castRemainingSec-t),n.castRemainingSec<=0&&AL(n))}function bL(n){var e,t;n.defeatAction==null||n.defeatDurationSec<=0||(n.activeOneShotId="defeat",n.defeatAction.enabled=!0,n.defeatAction.clampWhenFinished=!0,n.defeatAction.paused=!0,n.defeatAction.time=n.defeatDurationSec,n.defeatAction.setEffectiveWeight(1),(e=n.walkAction)==null||e.setEffectiveWeight(0),(t=n.idleAction)==null||t.setEffectiveWeight(0))}function AL(n){n.castAction!=null&&(n.castAction.stop(),n.castAction.setEffectiveWeight(0)),n.activeOneShotId=void 0,uh(n,n.activeLoopId??"idle"),hh(n,n.loopPaused)}function wL(n){const e=lh(n);return new Go(e.left,e.right,e.top,e.bottom,.1,100)}function RL(n,e,t={}){const i=lh(e,t);n.left=i.left,n.right=i.right,n.top=i.top,n.bottom=i.bottom}function IL(n){const e=n.right-n.left,t=n.top-n.bottom;return t>0?e/t:1}function CL(n,e,t){const i=e.transform;n.position.set(i.position.x,i.position.y,i.position.z),n.quaternion.set(i.rotation.x,i.rotation.y,i.rotation.z,i.rotation.w),n.scale.set(i.scale.x,i.scale.y,i.scale.z),n.visible=e.visible,PL(n,e.nodeVisibility),e.animationId==="victory"&&(n.position.y+=Math.sin(t*8)*.08),e.animationId==="stunned"&&(n.rotation.z=Math.sin(t*18)*.12),e.animationId==="yank"&&(n.position.y+=Math.min(1.6,t%1.4*1.8)),n.traverse(r=>{r instanceof lt&&(r.renderOrder=e.renderOrder??0,e.templateId===at.fireBurn&&NL(r.material,e.animationTimeSec??t),e.templateId===at.earthImpact&&UL(r.material,e.animationTimeSec??t),OL(r.material,e.tintHex,e.opacity,e.materialDepthTest))})}function PL(n,e){if(e!=null){for(const t of e.hiddenNodeNames??[])_p(n,t,!1);for(const t of e.visibleNodeNames??[])_p(n,t,!0)}}function _p(n,e,t){const i=new Set([e,Je.sanitizeNodeName(e)]);n.traverse(r=>{i.has(r.name)&&(r.visible=t)})}function LL(n){return Math.floor(Math.max(0,n)*mL)%pL}function DL(n){return Math.min(xL-1,Math.floor(Math.max(0,n)*vL))}function FL(n,e,t){const i=Math.max(1,Math.floor(e)),r=Math.max(1,Math.floor(t)),s=i*r,a=(Math.floor(n)%s+s)%s,o=a%i,l=Math.floor(a/i),c=1/i,u=1/r;return{repeatX:c,repeatY:u,offsetX:o*c,offsetY:1-u-l*u}}function NL(n,e){const t=LL(e);u0(n,t,dL,fL)}function UL(n,e){const t=DL(e);u0(n,t,gL,_L)}function u0(n,e,t,i){const r=Array.isArray(n)?n:[n],s=FL(e,t,i);for(const a of r)!(a instanceof mn)||a.map==null||(a.map.repeat.set(s.repeatX,s.repeatY),a.map.offset.set(s.offsetX,s.offsetY),a.map.needsUpdate=!0)}function OL(n,e,t,i){const r=Array.isArray(n)?n:[n];for(const s of r)if(s instanceof ea||s instanceof mn){const a=BL(s);e!=null?s.color.set(e):s.color.copy(a.color),t!=null?(s.opacity=t,s.transparent=t<1):(s.opacity=a.opacity,s.transparent=a.transparent),s.depthTest=i??a.depthTest}}function BL(n){const e=mp.get(n);if(e!=null)return e;const t={color:n.color.clone(),opacity:n.opacity,transparent:n.transparent,depthTest:n.depthTest};return mp.set(n,t),t}function dh(n){switch(n){case"fire":return"#ff8a1f";case"ice":return"#38d5ff";case"lightning":return"#f2c94c";case"earth":return"#27ae60"}}function fh(n){return{color:dh(n.schoolId),blending:(n.effectKind==="bomb",Ii),transparent:!0}}function h0(n){return fh(n)}function kL(n){return n.castActivationDelaySec<=0}function HL(n){return n.activationDelaySec<=0&&n.remainingSec>0}function xp(n,e){if(n.originKind==="world")return n;const t=d0(e);return t==null?n:{...n,from:t}}function d0(n){if(n==null)return null;const e=n.getObjectByName("particleSource");if(e==null)return null;n.updateWorldMatrix(!0,!0),e.updateWorldMatrix(!0,!1);const t=e.getWorldPosition(new D);return{x:t.x,y:t.y,z:t.z}}function zL(n,e,t,i){const r=new D(n.x,n.y,n.z).project(e);return!Number.isFinite(r.x)||!Number.isFinite(r.y)?null:{x:(r.x+1)/2*t,y:(1-r.y)/2*i}}function VL(n,e,t,i){const r=d0(n);return r==null?null:zL(r,e,t,i)}function GL(n){return n.castActivationDelaySec<=0&&n.activationDelaySec>0&&n.chargeDurationSec>0}function WL(n){return Li(1-n.activationDelaySec/Math.max(.001,n.chargeDurationSec))}function XL(n){const e=tD(n.effectKind),t=new Fn(1,1),i=g0(),r=fh(n),s=new mn({map:i,color:r.color,transparent:!0,opacity:1,blending:r.blending,depthWrite:!1,depthTest:!0}),a=new _g(t,s,e);return a.frustumCulled=!1,a.renderOrder=n.effectKind==="bomb"?32:30,{mesh:a,texture:i,dummy:new St,lightningRay:n.schoolId==="lightning"?qL(n):void 0}}function YL(n){const e=new Fn(1,1),t=g0(),i=h0(n),r=new mn({map:t,color:i.color,transparent:i.transparent,opacity:1,blending:i.blending,depthWrite:!1,depthTest:!0}),s=new _g(e,r,nD(n.effectKind));return s.frustumCulled=!1,s.renderOrder=31,{mesh:s,texture:t,dummy:new St}}function KL(n,e,t){const i=cD(e),r=uD(e),s=rD(e.effectKind,i),a=iD(e.effectKind),o=fh(e);for(let l=0;l<n.mesh.count;l+=1){const c=ci(`${e.projectileId}:along:${l}`),u=ci(`${e.projectileId}:angle:${l}`),h=ci(`${e.projectileId}:radius:${l}`),d=Li(i*sD(e.effectKind)-c*p0(e.effectKind)),f=ph(d),p=u*Math.PI*2,_=Math.sqrt(h)*Math.sin(d*Math.PI),m=s.horizontal*_,g=s.vertical*_,x=e.from.x+r.dx*f+r.perpX*Math.cos(p)*m,M=e.from.y+r.dy*f+r.perpY*Math.cos(p)*m+Math.sin(p)*g,y=e.from.z+r.dz*f+Math.sin(p)*s.depth*_,w=.75+h*.45;n.dummy.position.set(x,M,y),n.dummy.rotation.set(0,0,0),n.dummy.scale.set(a.x*w,a.y*w,1),n.dummy.updateMatrix(),n.mesh.setMatrixAt(l,n.dummy.matrix)}n.mesh.instanceMatrix.needsUpdate=!0,n.mesh.material.color.set(o.color),n.mesh.material.opacity=m0(e.effectKind,i),n.mesh.material.blending=o.blending,n.mesh.material.needsUpdate=!0,$L(n,e,i,t)}function qL(n){const e=new Kt,t=new mn(ZL(n)),i=new lt(e,t);return i.frustumCulled=!1,i.renderOrder=lL,f0(i,n,0),i}function $L(n,e,t,i){n.lightningRay!=null&&(f0(n.lightningRay,e,i),n.lightningRay.material.color.set(dh(e.schoolId)),n.lightningRay.material.opacity=m0(e.effectKind,t),n.lightningRay.material.needsUpdate=!0)}function f0(n,e,t){const i=QL(e,t);n.geometry.setAttribute("position",new En(i.positions,3)),n.geometry.setIndex(i.indices),n.geometry.computeVertexNormals(),n.geometry.computeBoundingSphere()}function jL(n=Ze){return Vg/n*oL}function ZL(n){return{color:dh(n.schoolId),transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,side:Jt}}function JL(n,e=0,t=l0){const i=Math.max(1,Math.floor(t)),r=n.to.x-n.from.x,s=n.to.y-n.from.y,a=n.to.z-n.from.z,o=Math.hypot(r,s),l=o>0?-s/o:1,c=o>0?r/o:0,u=[],h=ci(`${n.projectileId}:ray:phase`)*Math.PI*2;for(let d=0;d<=i;d+=1){const f=d/i,p=d===0||d===i,_=Math.sin(f*Math.PI),m=p?0:Math.sin(f*cL*Math.PI*2-e*hL+h)*uL*_,g=p?0:(ci(`${n.projectileId}:ray:lateral:${d}`)-.5)*.08*_,x=p?0:(ci(`${n.projectileId}:ray:depth:${d}`)-.5)*.04*_;u.push({x:n.from.x+r*f+l*(m+g),y:n.from.y+s*f+c*(m+g),z:n.from.z+a*f+x})}return u}function QL(n,e=0,t=jL(),i=l0){const r=JL(n,e,i),s=new Float32Array(r.length*2*3),a=[],o=t/2;return r.forEach((l,c)=>{const u=r[Math.max(0,c-1)],h=r[Math.min(r.length-1,c+1)],d=h.x-u.x,f=h.y-u.y,p=Math.hypot(d,f),_=p>0?-f/p:0,m=p>0?d/p:1,g=c*6,x=g+3;if(s[g]=l.x+_*o,s[g+1]=l.y+m*o,s[g+2]=l.z,s[x]=l.x-_*o,s[x+1]=l.y-m*o,s[x+2]=l.z,c<r.length-1){const M=c*2;a.push(M,M+1,M+2,M+1,M+3,M+2)}}),{centerline:r,positions:s,indices:a}}function eD(n,e){const t=WL(e),i=Math.sin(t*Math.PI),r=aD(e.effectKind,t),s=oD(e.effectKind,t);for(let o=0;o<n.mesh.count;o+=1){const l=ci(`${e.projectileId}:charge:angle:${o}`),c=ci(`${e.projectileId}:charge:radius:${o}`),u=ci(`${e.projectileId}:charge:z:${o}`),h=l*Math.PI*2+t*Math.PI*1.3,d=Math.sqrt(c)*r*(.35+i*.65),f=e.from.x+Math.cos(h)*d,p=e.from.y+Math.sin(h)*d*.82,_=e.from.z+(u-.5)*r*.42,m=.75+c*.65+i*.35;n.dummy.position.set(f,p,_),n.dummy.rotation.set(0,0,0),n.dummy.scale.set(s.x*m,s.y*m,1),n.dummy.updateMatrix(),n.mesh.setMatrixAt(o,n.dummy.matrix)}n.mesh.instanceMatrix.needsUpdate=!0;const a=h0(e);n.mesh.material.color.set(a.color),n.mesh.material.blending=a.blending,n.mesh.material.opacity=lD(e.effectKind,t),n.mesh.material.needsUpdate=!0}function vp(n){n.mesh.geometry.dispose(),n.mesh.material.dispose(),n.texture.dispose(),n.lightningRay!=null&&(n.lightningRay.geometry.dispose(),n.lightningRay.material.dispose())}function Sp(n){n.mesh.geometry.dispose(),n.mesh.material.dispose(),n.texture.dispose()}function tD(n){return n==="bomb"?220:96}function nD(n){return n==="bomb"?120:72}function iD(n){return n==="bomb"?{x:.6,y:.78}:{x:.27,y:.36}}function rD(n,e){const t=(n==="bomb"?.68:.2)*(.45+ph(e)*.55);return{horizontal:t,vertical:t*1.8,depth:t*.45}}function p0(n){return n==="bomb"?.52:.34}function sD(n){return 1+p0(n)}function m0(n,e){const t=Li(e/.16),i=Li((1-e)/(n==="bomb"?.32:.42));return(n==="bomb"?.78:.92)*Math.min(t,i)}function aD(n,e){return(n==="bomb"?.36:.22)*(.7+ph(e)*.65)}function oD(n,e){const t=n==="bomb"?.18:.12,i=Math.sin(e*Math.PI);return{x:t*(.85+i*.55),y:t*(.85+i*.55)}}function lD(n,e){const t=Li(e/.16),i=Li((1-e)/.2);return(n==="bomb"?.9:.78)*Math.min(t,i)}function g0(){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");if(t==null)throw new Error("Unable to create projectile particle texture context.");const i=64/2,r=t.createRadialGradient(i,i,0,i,i,i);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.36,"rgba(255, 255, 255, 0.82)"),r.addColorStop(.72,"rgba(255, 255, 255, 0.22)"),r.addColorStop(1,"rgba(255, 255, 255, 0)"),t.fillStyle=r,t.fillRect(0,0,64,64);const s=new Mg(e);return s.colorSpace=et,s.needsUpdate=!0,s}function cD(n){return Li(1-n.remainingSec/Math.max(.001,n.durationSec))}function uD(n){const e=n.to.x-n.from.x,t=n.to.y-n.from.y,i=n.to.z-n.from.z,r=Math.hypot(e,t),s=r>0?-t/r:1,a=r>0?e/r:0;return{dx:e,dy:t,dz:i,perpX:s,perpY:a}}function ci(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function ph(n){return 1-Math.pow(1-Li(n),3)}function Li(n){return Math.max(0,Math.min(1,n))}const dr=document.querySelector("#app");if(dr==null)throw new Error("Missing #app root element.");const Mp=GM(window.location.search),yp=WM(window.location.search),Tp=XM(window.location.search),Dn=new hM(Mp,{debugLevelType:yp,debugStartLevel:Tp,skipTutorial:Mp!=null||yp!=null||Tp!=null});dr.innerHTML=`
  <main class="game-shell" aria-label="Magus Match prototype shell">
    <section class="logical-stage">
      <canvas class="game-canvas" width="${Ze}" height="${bn}" aria-label="Magus Match board and HUD"></canvas>
      <div class="hero-stage" data-hero-stage aria-label="Magus Match hero stage"></div>
      <div class="debug-panel" data-debug></div>
    </section>
  </main>
`;const _0=dr.querySelector(".game-shell"),x0=dr.querySelector(".logical-stage");if(_0==null||x0==null)throw new Error("Failed to create game shell.");const jn=_0,hD=x0,dD=xh(dr,"[data-debug]"),fD=xh(dr,".game-canvas"),Mu=xh(dr,"[data-hero-stage]"),v0=fD.getContext("2d");if(v0==null)throw new Error("Unable to create 2D canvas context.");const mh=new CT(v0,{},Ze,bn),ra=new SL(Mu),S0=new $y;let Lt=null;const M0=new Ry;let Fs=M0.load(),wo=null,yu=!1,Ep=!1;const pD=new YM(jn);let lo=!1,ic=Yt,co=Yt,Ns=1;Ay().then(n=>{mh.setImages(n)});H0(async()=>{const{BrowserAudioAdapter:n}=await import("./BrowserAudioAdapter-DClo3tbY.js");return{BrowserAudioAdapter:n}},[],import.meta.url).then(({BrowserAudioAdapter:n})=>{Lt=new n}),jn.addEventListener("pointerdown",()=>{mD()});jn.addEventListener("pointerdown",gD,{passive:!0});function mD(){Lt!=null&&(Lt.resume(),!Ep&&(Ep=!0,Lt.preload(QM())))}function gh(n,e){if(!e){yu=!1;return}const t=Dm(n,jn.getBoundingClientRect());Dn.getScreenState(Fs,wo).phase==="GAME_OVER"&&qa(t,lc)&&(yu=!0)}jn.addEventListener("pointerdown",n=>gh(n,!0),{passive:!0});jn.addEventListener("pointerup",n=>gh(n,!1),{passive:!0});jn.addEventListener("pointercancel",n=>gh(n,!1),{passive:!0});function sa(n=ic,e=Ns,t=co){ic=n,Ns=e,co=t;const i=jn.getBoundingClientRect(),r=Math.min(i.width/Ze,i.height/bn);hD.style.transform=`scale(${r})`,Mu.style.height=`${ic}px`,Mu.style.setProperty("--hero-scene-scale",`${Ns}`),ra.resize(Ze,co)}function y0(n){return Yt}function T0(){const n=ra.getMageParticleSourceLogicalPosition(Ze,co);if(n!=null)return{x:n.x*Ns,y:n.y*Ns}}function gD(){jM({requestAttempted:lo,fullscreenElement:document.fullscreenElement,canRequestFullscreen:jn.requestFullscreen!=null,isMobileFullscreenTarget:$M(window.matchMedia.bind(window))})&&(lo=!0,jn.requestFullscreen().catch(()=>{lo=!1}))}function _D(){document.fullscreenElement==null&&(lo=!1),sa()}function E0(n=_h()){dD.textContent=`${n.phase} | ${n.debugText??""}`}let rc=0,bp=Im,Nr=null;const xD=.45;function b0(n){const e=rc===0?0:Math.min((n-rc)/1e3,.03333333333333333);rc=n,Dn.update(e,pD.drainCommands());const t=_h(),i=w0(),r=n/1e3,s=bp;t.lives<s&&(Nr={slotIndex:s-1,startedAtSec:r}),t.lives>s&&(Nr=null),bp=t.lives;let a;if(Nr!=null){const c=Math.min(1,(r-Nr.startedAtSec)/xD);a={slotIndex:Nr.slotIndex,progress01:c},c>=1&&(Nr=null)}vD(Dn.drainEvents()),Lt==null||Lt.setMuted(t.muted),Lt==null||Lt.setBackgroundMusicMuted(t.bgmMuted),Lt==null||Lt.syncTrialWalkLoops(Dn.getTrialWalkingMonsterIds()),E0(t);const o=Dn.getBoardRenderState(),l=o.tutorialPresentation;sa((l==null?void 0:l.heroHeight)??Yt,(l==null?void 0:l.sceneScale)??1,y0(l==null?void 0:l.mode)),ra.render(Dn.getHeroWorldState(),e),Km(mh,S0.present(o,n/1e3,{matchEnergyTarget:T0()}),t,n/1e3,i,a),requestAnimationFrame(b0)}sa();E0();const A0=Dn.getBoardRenderState(),ri=A0.tutorialPresentation;sa((ri==null?void 0:ri.heroHeight)??Yt,(ri==null?void 0:ri.sceneScale)??1,y0(ri==null?void 0:ri.mode));ra.render(Dn.getHeroWorldState(),0);Km(mh,S0.present(A0,0,{matchEnergyTarget:T0()}),_h(),0,w0());window.addEventListener("resize",()=>sa());document.addEventListener("fullscreenchange",_D);window.addEventListener("beforeunload",()=>{ra.dispose(),Lt==null||Lt.stopTrialWalkLoop(),Lt==null||Lt.stopBackgroundMusic()});requestAnimationFrame(b0);function vD(n){for(const e of n){if(e.type==="soundRequested"){Lt!=null&&Lt.play(e);continue}if(e.type==="levelStarted"){wo=null;continue}if(e.type==="runEnded"){const t=RS(e.finalScore,e.levelsCleared,Dn.getRunStateForDebug().seed,Date.now()),i=AS(Fs,t);Fs=i.entries,wo=i.qualifiedRank,M0.save(Fs)}}}function _h(){return Dn.getHudState()}function w0(){return{...Dn.getScreenState(Fs,wo),overlayPrimaryButtonPressed:yu}}function xh(n,e){const t=n.querySelector(e);if(t==null)throw new Error(`Missing required element: ${e}`);return t}export{R as A,ZM as a,MD as g,si as r};
