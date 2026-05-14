var x0=Object.defineProperty;var v0=(i,e,t)=>e in i?x0(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Y=(i,e,t)=>v0(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const ke=864,Sn=1920,Dt=700,kl={width:950,height:156},S0=.6,Qi=ke*S0,Io=Qi*kl.height/kl.width,Co=18,Hl=(ke-Qi)/2,dp=.14,M0=Hl+Qi*dp,T0=Qi-2*Qi*dp,hh=kl,y0=20,E0=150,b0=185,A0=110,w0=b0+A0/2;function R0(){const i=ke-2*y0,e=hh.width/hh.height;let t=E0,n=t*e;n>i&&(n=i,t=n/e);const r=(ke-n)/2,s=w0-t/2;return{x:r,y:s,width:n,height:t}}const Mn=150,Vl=56,I0=10,Br=Dt-I0,C0=3,L0=254,P0=233,Ki=74,na=Ki*L0/P0,D0=12,F0=20,U0=Vl+F0,fp=100,pp=-50,N0=Mn-fp-pp,mp="#FBBC45",O0=26,B0=18,gp=44,_p=24,dh={width:2155,height:563},k0=Ki,H0=k0*dh.width/dh.height,xp=50,V0=20,z0=ke-xp-H0-V0,fh={width:447,height:429},G0=.06,W0=.91,X0=.645,nu=Ki,vp=nu*fh.width/fh.height,Y0=100,Sp=z0+Y0,K0=Br+(Mn-nu)/2,q0=2,Mp=Sp+vp+q0,Tp=24,$0=8,yp=Mp+Tp+$0,j0=ke-xp-yp,ph=gp,mh=_p;function Z0(){const i=Math.min(300,ke-2*Vl);return{x:ke-Vl-i,width:i}}const Ep=Sn-Dt-Mn,Ce=8,J0=Dt+Mn,Ms=Math.min(ke,Ep),Q0=(ke-Ms)/2,e_=(Ep-Ms)/2,J={x:Q0,y:J0+e_,width:Ms,height:Ms,cellSize:Ms/Ce},zl={x:(ke-480)/2,y:1570,width:480,height:112},gh={x:ke-150,y:Dt,width:150,height:Mn},Lo=72,t_=8,n_=8,iu={x:ke-t_-Lo,y:n_,width:Lo,height:Lo};function i_(i){const e=iu,t=e.x+e.width/2,n=e.y+e.height/2,r=e.width/2;return Math.hypot(i.x-t,i.y-n)<=r}function ka(i,e){return i.x>=e.x&&i.y>=e.y&&i.x<e.x+e.width&&i.y<e.y+e.height}function Gl(i){const e=i.x-J.x,t=i.y-J.y;return e<0||t<0||e>=J.width||t>=J.height?null:{col:Math.floor(e/J.cellSize),row:Math.floor(t/J.cellSize)}}const ja=2654435769;class Wl{constructor(e=ja){Y(this,"state");this.state=e>>>0,this.state===0&&(this.state=ja)}nextUint32(){let e=this.state;return e^=e<<13,e^=e>>>17,e^=e<<5,this.state=e>>>0,this.state}nextFloat(){return this.nextUint32()/4294967296}nextInt(e,t){if(!Number.isInteger(e)||!Number.isInteger(t))throw new Error("nextInt bounds must be integers.");if(t<=e)throw new Error("nextInt maxExclusive must be greater than minInclusive.");return e+Math.floor(this.nextFloat()*(t-e))}getState(){return this.state}}function Po(){if(typeof crypto<"u"&&"getRandomValues"in crypto){const e=new Uint32Array(1);return crypto.getRandomValues(e),e[0]===0?ja:e[0]}const i=Math.floor(Math.random()*4294967295)>>>0;return i===0?ja:i}const kr=["FIRE","ICE","LIGHTNING","EARTH"],r_=["ROCKET_H","ROCKET_V","TNT","LIGHTBALL"];function ii(i){return kr.includes(i)}function bi(i){return r_.includes(i)}function ru(i){return ii(i)}function po(i="tile"){let e=0;return()=>`${i}-${e++}`}function Xs(i,e="tile"){let t=c_(i,e);return()=>`${e}-${t++}`}function Ys(i,e,t,n=po(`${i.toLowerCase()}-${e}-${t}`),r="IDLE"){return{id:n(),type:i,col:e,row:t,state:r,spawnedAtMs:0}}function bp(i={}){return Array.from({length:Ce},(e,t)=>Array.from({length:Ce},(n,r)=>{var s;return{tile:null,blocker:null,modifier:null,isVoid:((s=i.voidCells)==null?void 0:s.some(a=>a.col===r&&a.row===t))??!1}}))}function kt(i){return i.map(e=>e.map(t=>({tile:t.tile==null?null:{...t.tile},blocker:t.blocker==null?null:l_(t.blocker),modifier:t.modifier,isVoid:t.isVoid})))}function s_(i,e={},t=po("tile")){const n=bp(e);return a_(n,i,t),n}function a_(i,e,t=po("tile")){for(let n=0;n<Ce;n+=1)for(let r=0;r<Ce;r+=1){const s=i[n][r];if(s.isVoid||s.tile!=null)continue;const a=kr.filter(c=>!Ap(i,{col:r,row:n},c)),o=a.length>0?a:kr,l=o[e.nextInt(0,o.length)];s.tile=Ys(l,r,n,t)}}function Ap(i,e,t){return ia(i,e,t,-1,0)+ia(i,e,t,1,0)+1>=3||ia(i,e,t,0,-1)+ia(i,e,t,0,1)+1>=3}function ia(i,e,t,n,r){let s=0,a=e.col+n,o=e.row+r;for(;mo({col:a,row:o});){const l=i[o][a].tile;if((l==null?void 0:l.type)!==t)break;s+=1,a+=n,o+=r}return s}function mo(i){return i.col>=0&&i.col<Ce&&i.row>=0&&i.row<Ce}function bt(i,e){return mo(e)?i[e.row][e.col]:null}function su(i,e,t){const n=bt(i,e),r=bt(i,t);if(n==null||r==null)throw new Error("Cannot swap cells outside board.");const s=n.tile,a=r.tile;n.tile=a==null?null:{...a,col:e.col,row:e.row},r.tile=s==null?null:{...s,col:t.col,row:t.row}}function Xl(i){const e=[];for(let t=0;t<Ce;t+=1)for(let n=0;n<Ce;n+=1)i[t][n].isVoid||e.push({col:n,row:t});return e}function o_(i){const e=[];for(let t=0;t<Ce;t+=1)for(let n=0;n<Ce;n+=1)i[t][n].isVoid&&e.push({col:n,row:t});return e}function xn(i){return`${i.col},${i.row}`}function rr(i){const e=new Set,t=[];for(const n of i){const r=xn(n);e.has(r)||(e.add(r),t.push(n))}return sr(t)}function sr(i){return[...i].sort((e,t)=>e.row-t.row||e.col-t.col)}function l_(i){return{type:i.type,hp:i.hp,position:{...i.position}}}function c_(i,e){var r;const t=`${e}-`;let n=-1;for(const s of i)for(const a of s){const o=(r=a.tile)==null?void 0:r.id;if(o==null||!o.startsWith(t))continue;const l=o.slice(t.length);/^\d+$/.test(l)&&(n=Math.max(n,Number(l)))}return n+1}function On(i){return{cells:Xl(i).map(e=>{const n=i[e.row][e.col].tile;return n==null?null:{tileId:n.id,tileType:n.type,coord:e}}).filter(e=>e!=null)}}function wp(i,e,t){return{kind:i.kind??"resolution",revisionId:i.revisionId,swappedCells:i.swappedCells??null,preSwapSnapshot:On(i.preSwapBoard),postSwapSnapshot:On(i.postSwapBoard),cascadeSteps:e,finalSnapshot:On(t)}}function u_(i,e){const t={cells:[]},n=On(i),r=g_(i)?m_(i,n.cells):n.cells.map(s=>({tileId:s.tileId,tileType:s.tileType,from:{col:s.coord.col,row:s.coord.row-Ce},to:s.coord})).sort((s,a)=>s.to.col-a.to.col||a.to.row-s.to.row);return{kind:"levelIntro",revisionId:e,swappedCells:null,preSwapSnapshot:t,postSwapSnapshot:t,cascadeSteps:[{stepIndex:0,beforeClearSnapshot:t,beforeGravitySnapshot:t,afterGravitySnapshot:t,finalSnapshot:n,clearedTiles:[],fallingTiles:[],refillTiles:r}],finalSnapshot:n}}function h_(i,e,t,n){const r=kt(i);su(r,e,t);const s=On(i);return{kind:"invalidSwap",revisionId:n,swappedCells:{from:e,to:t},preSwapSnapshot:s,postSwapSnapshot:On(r),cascadeSteps:[],finalSnapshot:s}}function Rp(i,e,t,n,r,s,a=new Map,o=[]){const l=On(e),c=On(t),u=On(n),h=On(r),d=f_(l),f=_h(c),p=_h(u),_=new Set(u.cells.map(T=>T.tileId)),g=rr(s).map(T=>d.get(xn(T))).filter(T=>T!=null).map(T=>({...T,clearDelayMs:a.get(xn(T.coord))})),m=[...p.values()].map(T=>{const w=f.get(T.tileId);return w==null||y_(w.coord,T.coord)?null:{tileId:T.tileId,tileType:T.tileType,from:w.coord,to:T.coord,movementKind:w.coord.col===T.coord.col?"fall":"slide"}}).filter(T=>T!=null),S=h.cells.filter(T=>!_.has(T.tileId)).sort((T,w)=>T.coord.col-w.coord.col||w.coord.row-T.coord.row),M=p_(S,o);return{stepIndex:i,beforeClearSnapshot:l,beforeGravitySnapshot:c,afterGravitySnapshot:u,finalSnapshot:h,clearedTiles:S_(g),fallingTiles:M_(m),refillTiles:T_(M)}}function d_(i,e){if(i!=null)return{...i,revisionId:e}}function f_(i){return new Map(i.cells.map(e=>[xn(e.coord),e]))}function _h(i){return new Map(i.cells.map(e=>[e.tileId,e]))}function p_(i,e=[]){const t=new Map(e.map(r=>[r.tileId,r])),n=new Map;return i.map(r=>{const s=t.get(r.tileId);if(s!=null)return{...s,tileType:r.tileType,to:r.coord};const a=n.get(r.coord.col)??0;return n.set(r.coord.col,a+1),{tileId:r.tileId,tileType:r.tileType,from:{col:r.coord.col,row:-1-a},to:r.coord}})}function m_(i,e){const t=new Map;return[...e].sort((n,r)=>n.coord.col-r.coord.col||r.coord.row-n.coord.row).map(n=>{if(!__(i,n.coord)){const s=t.get(n.coord.col)??0;return t.set(n.coord.col,s+1),{tileId:n.tileId,tileType:n.tileType,from:{col:n.coord.col,row:-1-s},to:n.coord,movementKind:"fall"}}const r=x_(i,n.coord);return{tileId:n.tileId,tileType:n.tileType,from:{col:r,row:v_(i,r,n.coord.row)},to:n.coord,movementKind:"slide"}})}function g_(i){return i.some(e=>e.some(t=>t.isVoid))}function __(i,e){for(let t=0;t<e.row;t+=1)if(i[t][e.col].isVoid)return!0;return!1}function x_(i,e){const t=e.col-1,n=e.col+1,r=(e.row+e.col)%2===0?[t,n]:[n,t];for(const s of r)if(s>=0&&s<Ce&&i.some(a=>!a[s].isVoid))return s;return Math.max(0,Math.min(Ce-1,e.col===0?1:e.col-1))}function v_(i,e,t){for(let n=t-1;n>=0;n-=1)if(!i[n][e].isVoid)return n;for(let n=t;n<Ce;n+=1)if(!i[n][e].isVoid)return n;return-1}function S_(i){return[...i].sort((e,t)=>e.coord.row-t.coord.row||e.coord.col-t.coord.col)}function M_(i){return[...i].sort((e,t)=>e.to.row-t.to.row||e.to.col-t.to.col)}function T_(i){return[...i].sort((e,t)=>e.to.row-t.to.row||e.to.col-t.to.col)}function y_(i,e){return i.col===e.col&&i.row===e.row}const E_=30,Ks=120,gs=140,Yl=50,Ip=180,Cp=180,au=90,Ts=180,ou=630,lu=135,cu=45,Lp=8/30*1e3,Qn=220,Is=560,Pp=250,b_=500,Cs=Pp+b_,A_=45,Do=2,xh=12,Dp=200,w_=440,vh=2.75,Di=2.75,R_=2.75,Fp=16;function Up(i){if(i.kind==="invalidSwap")return gs+Yl+Ip;const e=go(i),t=e.length===0?Ks:e[e.length-1].endMs;return Math.max(t,L_(i,e))}function go(i){let e=i.kind==="levelIntro"?0:Ks;return i.cascadeSteps.map(t=>{const n=e,r=n+I_(i,t),s=Np(t),a=D_(t),o={step:t,popStartMs:n,fallStartMs:r,endMs:r+a,fallDelaysByTileId:s};return e=o.endMs,o})}function I_(i,e){if(i.kind==="levelIntro")return 0;const t=Math.max(0,...e.clearedTiles.map(n=>n.clearDelayMs??0));return Math.max(t+Cp,C_(e))}function C_(i){return i.clearedTiles.reduce((e,t)=>{if(t.tileType!=="ROCKET_H"&&t.tileType!=="ROCKET_V")return e;const n=J.x+t.coord.col*J.cellSize+J.cellSize/2,r=J.y+t.coord.row*J.cellSize+J.cellSize/2,a=(t.tileType==="ROCKET_H"?Math.max(n-(J.x-Qn),J.x+J.width+Qn-n):Math.max(r-(J.y-Qn),J.y+J.height+Qn-r))/J.cellSize*cu;return Math.max(e,(t.clearDelayMs??0)+a+Lp)},0)}function L_(i,e){return i.kind==="levelIntro"?0:e.reduce((t,n)=>{const r=n.step.clearedTiles.reduce((s,a)=>P_(a.tileType)?Math.max(s,n.popStartMs+(a.clearDelayMs??0)+Is):s,0);return Math.max(t,r)},0)}function P_(i){return i==="FIRE"||i==="ICE"||i==="LIGHTNING"||i==="EARTH"}function D_(i){const e=Np(i),t=Op(i).reduce((n,r)=>{const s=Math.max(1,Math.abs(r.to.row-r.from.row)),a=F_(s*au+lu,Ts,ou);return Math.max(n,(e.get(r.tileId)??0)+a)},Ts);return Math.max(Ts,t)}function Np(i){const e=new Map;for(const n of Op(i))e.set(n.to.col,[...e.get(n.to.col)??[],n]);const t=new Map;for(const n of e.values())[...n].sort((s,a)=>a.to.row-s.to.row||a.from.row-s.from.row||s.tileId.localeCompare(a.tileId)).forEach((s,a)=>{t.set(s.tileId,a*E_)});return t}function Op(i){return[...i.fallingTiles,...i.refillTiles]}function F_(i,e,t){return Math.max(e,Math.min(t,i))}function Hr(i,e={}){const t=[...U_(i),...N_(i)];if(t.length===0)return[];const n=t.map((l,c)=>c),r=l=>{let c=n[l];for(;c!==n[c];)c=n[c];return n[l]=c,c},s=(l,c)=>{const u=r(l),h=r(c);u!==h&&(n[h]=u)},a=new Map;t.forEach((l,c)=>{for(const u of l.coords){const h=xn(u),d=a.get(h)??[];d.push(c),a.set(h,d)}});for(const l of a.values())for(let c=1;c<l.length;c+=1){const u=l[0],h=l[c];t[u].tileType===t[h].tileType&&s(u,h)}const o=new Map;return t.forEach((l,c)=>{const u=r(c),h=o.get(u)??[];h.push(l),o.set(u,h)}),[...o.values()].map(l=>O_(l,e.preferredSpawnCell)).sort((l,c)=>l.spawnCell.row-c.spawnCell.row||l.spawnCell.col-c.spawnCell.col)}function U_(i){var t;const e=[];for(let n=0;n<Ce;n+=1){let r=0;for(;r<Ce;){const s=i[n][r].tile;if(s==null||!ru(s.type)){r+=1;continue}const a=r,o=s.type;for(;r<Ce&&((t=i[n][r].tile)==null?void 0:t.type)===o;)r+=1;r-a>=3&&e.push({axis:"horizontal",tileType:o,coords:Array.from({length:r-a},(l,c)=>({col:a+c,row:n}))})}}return e}function N_(i){var t;const e=[];for(let n=0;n<Ce;n+=1){let r=0;for(;r<Ce;){const s=i[r][n].tile;if(s==null||!ru(s.type)){r+=1;continue}const a=r,o=s.type;for(;r<Ce&&((t=i[r][n].tile)==null?void 0:t.type)===o;)r+=1;r-a>=3&&e.push({axis:"vertical",tileType:o,coords:Array.from({length:r-a},(l,c)=>({col:n,row:a+c}))})}}return e}function O_(i,e){const t=rr(i.flatMap(a=>a.coords)),n=[...new Set(i.map(a=>a.axis))].sort(),r=B_(i,t.length),s=k_(r);return{tiles:t,tileType:i[0].tileType,axes:n,shape:r,spawnPowerUp:s,spawnCell:H_(t,e)}}function B_(i,e){var r;if(new Set(i.map(s=>s.axis)).size>1&&e>=5)return"tnt";const n=Math.max(...i.map(s=>s.coords.length));return n>=5?"lightball":n===4?((r=i.find(s=>s.coords.length===4))==null?void 0:r.axis)==="vertical"?"rocketV":"rocketH":"basic"}function k_(i){switch(i){case"rocketH":return"ROCKET_H";case"rocketV":return"ROCKET_V";case"lightball":return"LIGHTBALL";case"tnt":return"TNT";case"basic":return null}}function H_(i,e){if(e!=null&&i.some(s=>s.col===e.col&&s.row===e.row))return{...e};const t=i.reduce((s,a)=>({col:s.col+a.col,row:s.row+a.row}),{col:0,row:0}),n=t.col/i.length,r=t.row/i.length;return sr(i).reduce((s,a)=>{const o=Sh(s,n,r);return Sh(a,n,r)<o?a:s})}function Sh(i,e,t){return(i.col-e)**2+(i.row-t)**2}const V_=new Set(["LOCK","METAL_PLATE","BOX"]);function Za(i,e,t){const n=bt(i,e),r=bt(i,t);if(n==null||r==null)return{valid:!1,reason:"outOfBounds"};if(!Bp(e,t))return{valid:!1,reason:"notAdjacent"};if(n.isVoid||r.isVoid)return{valid:!1,reason:"voidCell"};if(n.tile==null||r.tile==null)return{valid:!1,reason:"emptyCell"};if(Mh(n)||Mh(r))return{valid:!1,reason:"blockedCell"};if(n.tile.type==="LIGHTBALL"||r.tile.type==="LIGHTBALL")return{valid:!0,reason:"valid"};if(bi(n.tile.type)||bi(r.tile.type))return{valid:!0,reason:"valid"};const s=uu(i,e,t);return Hr(s,{preferredSpawnCell:t}).length>0?{valid:!0,reason:"valid"}:{valid:!1,reason:"noMatch"}}function uu(i,e,t){const n=kt(i);return su(n,e,t),n}function z_(i){const e=[];for(let t=0;t<Ce;t+=1)for(let n=0;n<Ce;n+=1){const r={col:n,row:t},s={col:n+1,row:t},a={col:n,row:t+1};n+1<Ce&&Za(i,r,s).valid&&e.push({from:r,to:s}),t+1<Ce&&Za(i,r,a).valid&&e.push({from:r,to:a})}return e}function G_(i){return z_(i).length}function Bp(i,e){return Math.abs(i.col-e.col)+Math.abs(i.row-e.row)===1}function Mh(i){return i.blocker!=null&&V_.has(i.blocker.type)}function W_(i){const e=[];for(let t=0;t<Ce;t+=1)for(let n=0;n<Ce;n+=1){const r={col:n,row:t},s={col:n+1,row:t},a={col:n,row:t+1};if(n+1<Ce){const o=Th(i,r,s);o!=null&&e.push(o)}if(t+1<Ce){const o=Th(i,r,a);o!=null&&e.push(o)}}return e}function Th(i,e,t){if(!Bp(e,t))return null;const n=bt(i,e),r=bt(i,t);if(n==null||r==null||n.isVoid||r.isVoid||n.tile==null||r.tile==null||!ii(n.tile.type)||!ii(r.tile.type))return null;const s=uu(i,e,t),a=Hr(s,{preferredSpawnCell:t}).filter(u=>u.tiles.some(h=>Vi(h,e)||Vi(h,t)));if(a.length===0)return null;const l=(a.find(u=>u.tiles.some(h=>Vi(h,t)))??a[0]).tiles.some(u=>Vi(u,t))?e:t,c=Vi(l,e)?t:e;return{from:e,to:t,movingCell:l,direction:{col:c.col-l.col,row:c.row-l.row},flashCells:rr(a.flatMap(u=>u.tiles.map(h=>X_(h,e,t))))}}function X_(i,e,t){return Vi(i,t)?{...e}:Vi(i,e)?{...t}:{...i}}function Vi(i,e){return i.col===e.col&&i.row===e.row}function Y_(i){return i==="ROCKET_H"||i==="ROCKET_V"}function K_(i){return Y_(i)||i==="TNT"||i==="LIGHTBALL"}function kp(i,e){var t,n;return((n=(t=bt(i,e))==null?void 0:t.tile)==null?void 0:n.type)!=="LIGHTBALL"?null:Hp(i,e)}function Hp(i,e){var r,s;const t=new Set;for(const a of nx(e)){const o=(s=(r=bt(i,a))==null?void 0:r.tile)==null?void 0:s.type;o!=null&&ii(o)&&t.add(o)}if(t.size===0)return null;const n=ix(i);return kr.filter(a=>t.has(a)).reduce((a,o)=>a==null||n[o]>n[a]?o:a,null)}function q_(i,e,t={}){var u,h,d,f;const n=(h=(u=bt(i,e))==null?void 0:u.tile)==null?void 0:h.type;if(n==null||!bi(n))throw new Error("Cannot resolve a power-up chain from a cell that does not contain a power-up tile.");const r=kt(i),s=[{coord:e,powerUpType:n,activationDelayMs:0,lightballTargetType:t.lightballTargetType}],a=new Set([xn(e)]),o=new Set,l=[];for(;s.length>0;){s.sort(j_);const p=s.shift(),_=xn(p.coord);if(a.delete(_),o.has(_))continue;o.add(_);const m=(p.powerUpType==="LIGHTBALL"?p.lightballTargetType??Hp(r,p.coord):p.lightballTargetType)??void 0,S=$_(r,p.coord,p.powerUpType,{lightballTargetType:m}),M=new Set;for(const E of S.clearTimings){const C=xn(E.coord);if(C===_||o.has(C)||a.has(C))continue;const v=(f=(d=bt(r,E.coord))==null?void 0:d.tile)==null?void 0:f.type;v==null||!bi(v)||(s.push({coord:E.coord,powerUpType:v,activationDelayMs:p.activationDelayMs+E.clearDelayMs}),a.add(C),M.add(C))}const T=S.clearTimings.filter(E=>!M.has(xn(E.coord))),w={...S,clearedCells:sr(T.map(E=>E.coord)),clearTimings:T,lightballTargetType:m};l.push({detonation:w,activationDelayMs:p.activationDelayMs});for(const E of w.clearedCells){const C=bt(r,E);C!=null&&(C.tile=null)}}const c=l.flatMap(p=>p.detonation.clearTimings.map(_=>({coord:_.coord,clearDelayMs:p.activationDelayMs+_.clearDelayMs})));return{detonations:l,clearedCells:rr(l.flatMap(p=>p.detonation.clearedCells)),clearTimings:c}}function $_(i,e,t,n={}){switch(t){case"ROCKET_H":return yh(i,e,t);case"ROCKET_V":return yh(i,e,t);case"TNT":return Q_(i,e,t);case"LIGHTBALL":{const r=tx(i,e,n.lightballTargetType);return{powerUpType:t,origin:e,clearedCells:r,clearTimings:r.map(s=>({coord:s,clearDelayMs:s.col===e.col&&s.row===e.row?0:Cs})),lightballTargetType:n.lightballTargetType}}}}function j_(i,e){return i.activationDelayMs-e.activationDelayMs||i.coord.row-e.coord.row||i.coord.col-e.coord.col||i.powerUpType.localeCompare(e.powerUpType)}function Z_(i,e){const t=ex(i,e);return[...t.filter(n=>n.col===e.col&&n.row===e.row),...t.filter(n=>n.col!==e.col||n.row!==e.row)].map(n=>({coord:n,clearDelayMs:n.col===e.col&&n.row===e.row?0:A_}))}function J_(i,e,t){const n=[{coord:e,clearDelayMs:0}],r=Ce-1;for(let s=1;s<=r;s+=1){const a=t==="ROCKET_H"?[{col:e.col-s,row:e.row},{col:e.col+s,row:e.row}]:[{col:e.col,row:e.row-s},{col:e.col,row:e.row+s}];for(const o of a)Vp(i,o)&&n.push({coord:o,clearDelayMs:s*cu})}return n}function Q_(i,e,t){const n=Z_(i,e);return{powerUpType:t,origin:e,clearedCells:sr(n.map(r=>r.coord)),clearTimings:n}}function yh(i,e,t){const n=J_(i,e,t);return{powerUpType:t,origin:e,clearedCells:sr(n.map(r=>r.coord)),clearTimings:n}}function ex(i,e){const t=[];for(let n=e.row-1;n<=e.row+1;n+=1)for(let r=e.col-1;r<=e.col+1;r+=1)t.push({col:r,row:n});return rx(i,t)}function tx(i,e,t){var r;const n=[e];if(t==null)return n;for(let s=0;s<Ce;s+=1)for(let a=0;a<Ce;a+=1){const o={col:a,row:s},l=bt(i,o);!(l!=null&&l.isVoid)&&((r=l==null?void 0:l.tile)==null?void 0:r.type)===t&&n.push(o)}return rr(n)}function nx(i){return[{col:i.col+1,row:i.row},{col:i.col,row:i.row+1},{col:i.col-1,row:i.row},{col:i.col,row:i.row-1}].filter(mo)}function ix(i){var t;const e={FIRE:0,ICE:0,LIGHTNING:0,EARTH:0};for(let n=0;n<Ce;n+=1)for(let r=0;r<Ce;r+=1){const s=(t=i[n][r].tile)==null?void 0:t.type;s!=null&&ii(s)&&(e[s]+=1)}return e}function rx(i,e){return sr(e.filter(t=>Vp(i,t)))}function Vp(i,e){return mo(e)?!i[e.row][e.col].isVoid:!1}const R={tiles:{fire:"tile.fire",ice:"tile.ice",lightning:"tile.lightning",earth:"tile.earth",empty:"tile.empty"},powerUps:{rocketH:"power.rocketH",rocketV:"power.rocketV",tnt:"power.tnt",lightball:"power.lightball",lightballStream:"power.lightballStream",orb:"power.orb"},backdrops:{forest:"backdrop.forest",crypt:"backdrop.crypt",crystalCave:"backdrop.crystalCave",castle:"backdrop.castle",bg2:"backdrop.bg2",bg3:"backdrop.bg3",bg4:"backdrop.bg4",bg5:"backdrop.bg5",bg6:"backdrop.bg6",bg7:"backdrop.bg7"},rigs:{mage:"rig.mage",kobold:"rig.kobold",tallKobold:"rig.tallKobold",boss:"rig.boss"},ui:{hudBanner:"ui.hudBanner",boardBackground:"ui.boardBackground",levelTitlePanel:"ui.levelTitlePanel",heartFill:"ui.heartFill",heartEmpty:"ui.heartEmpty",trialFillBarBg:"ui.trialFillBarBg",trialFillBarFill:"ui.trialFillBarFill",trialFillBarKoboldIcon:"ui.trialFillBarKoboldIcon",primaryButton:"ui.primaryButton",primaryButtonPressed:"ui.primaryButtonPressed",tutorialFinger:"ui.tutorialFinger",activateEarth:"ui.activateEarth",activateFire:"ui.activateFire",activateIce:"ui.activateIce",activateLightning:"ui.activateLightning",levelCleared:"ui.levelCleared",floorCleared:"ui.floorCleared",lifeLost:"ui.lifeLost",gameOver:"ui.gameOver"},materials:{mageTexture:"material.mageTexture",koboldTexture:"material.koboldTexture",bossTexture:"material.bossTexture"},spritesheets:{tntExplosion:"spritesheet.tntExplosion",rocketCloud:"spritesheet.rocketCloud",fireBurn:"spritesheet.fireBurn",earthImpact:"spritesheet.earthImpact"},sounds:{tileMatch:"sound.tileMatch",mergeMatch:"sound.mergeMatch",matchCoin:"sound.matchCoin",boardMove:"sound.boardMove",boardMoveBack:"sound.boardMoveBack",levelUp:"sound.levelUp",enemyWalkLoop:"sound.enemyWalkLoop",comboPitchStep:"sound.comboPitchStep",fireWhoosh:"sound.spell.fire.whoosh",iceWhoosh:"sound.spell.ice.whoosh",lightningWhoosh:"sound.spell.lightning.whoosh",earthWhoosh:"sound.spell.earth.whoosh",fireImpact:"sound.spell.fire.impact",iceImpact:"sound.spell.ice.impact",lightningImpact:"sound.spell.lightning.impact",earthImpact:"sound.spell.earth.impact",monsterDamage:"sound.monsterDamage",monsterDefeat:"sound.monsterDefeat",playerDamage:"sound.playerDamage",playerDefeat:"sound.playerDefeat",powerupCreate:"sound.powerupCreate",powerupBombActivate:"sound.powerup.bombActivate",powerupRocketActivate:"sound.powerup.rocketActivate",runEnd:"sound.runEnd",uiClick:"sound.uiClick",musicBackground:"sound.musicBackground",levelStart:"sound.levelStart"}},sx=[R.backdrops.castle,R.backdrops.bg2,R.backdrops.bg3,R.backdrops.bg4,R.backdrops.bg5,R.backdrops.bg6,R.backdrops.bg7],ax=3,ox=24;function Kl(i){const t=(Math.max(1,Math.floor(i))-1)%ox,n=Math.floor(t/ax),r=n<=5?n:6;return sx[r]}function Eh(i,e={}){const t=e.minValidMoves??3,n=e.maxAttempts??100;for(let r=0;r<n;r+=1){const s=po(`tile-${r}`),a=s_(i,e,s);if(lx(a,t))return a}throw new Error(`Unable to generate playable board after ${n} attempts.`)}function lx(i,e=3){return Hr(i).length===0&&G_(i)>=e}function zp(i){return i<=3?{basicKoboldCount:3,tallKoboldCount:0,miniBossCount:ns(i),waveCount:1,spawnIntervalMs:1200,waveGapMs:0,basicKoboldHp:72,tallKoboldHp:120,miniBossHp:192,walkSpeed:.25,baseDamage:12}:i<=7?{basicKoboldCount:5,tallKoboldCount:1,miniBossCount:ns(i),waveCount:1,spawnIntervalMs:1050,waveGapMs:0,basicKoboldHp:104,tallKoboldHp:130,miniBossHp:208,walkSpeed:.275,baseDamage:13}:i<=12?{basicKoboldCount:6,tallKoboldCount:2,miniBossCount:ns(i),waveCount:1,spawnIntervalMs:950,waveGapMs:0,basicKoboldHp:140,tallKoboldHp:168,miniBossHp:224,walkSpeed:.35,baseDamage:14}:i<=18?{basicKoboldCount:7,tallKoboldCount:3,miniBossCount:ns(i),waveCount:1,spawnIntervalMs:850,waveGapMs:0,basicKoboldHp:180,tallKoboldHp:210,miniBossHp:240,walkSpeed:.4,baseDamage:15}:{basicKoboldCount:8,tallKoboldCount:4,miniBossCount:ns(i),waveCount:1,spawnIntervalMs:750,waveGapMs:0,basicKoboldHp:192,tallKoboldHp:224,miniBossHp:256,walkSpeed:.475,baseDamage:16}}function ns(i){return i>=20&&i%5===0?2:i===5||i===10||i===15?1:0}function Gp(i){return i<=1?0:i<=3?2:i<=6?4:i<=10?6:8}function cx(i,e){const t=Gp(i);if(t<=0)return[];const n=Wp.filter(s=>s.length===t);return(n[e.nextInt(0,n.length)]??[]).map(s=>({...s}))}function ux(i){const e=Gp(i);return Wp.filter(t=>t.length<=e).sort((t,n)=>n.length-t.length).map(t=>t.map(n=>({...n})))}const Wp=[[{col:2,row:3},{col:5,row:3}],[{col:1,row:4},{col:6,row:4}],[{col:3,row:2},{col:4,row:2}],[{col:1,row:3},{col:1,row:4},{col:6,row:3},{col:6,row:4}],[{col:2,row:2},{col:2,row:5},{col:5,row:2},{col:5,row:5}],[{col:3,row:3},{col:4,row:3},{col:3,row:4},{col:4,row:4}],[{col:1,row:2},{col:1,row:3},{col:1,row:4},{col:6,row:2},{col:6,row:3},{col:6,row:4}],[{col:2,row:2},{col:2,row:5},{col:3,row:3},{col:4,row:3},{col:5,row:2},{col:5,row:5}],[{col:1,row:2},{col:1,row:5},{col:2,row:3},{col:5,row:3},{col:6,row:2},{col:6,row:5}],[{col:1,row:2},{col:1,row:3},{col:2,row:2},{col:2,row:3},{col:5,row:2},{col:5,row:3},{col:6,row:2},{col:6,row:3}],[{col:1,row:3},{col:1,row:4},{col:2,row:4},{col:3,row:5},{col:4,row:5},{col:5,row:4},{col:6,row:3},{col:6,row:4}],[{col:2,row:1},{col:5,row:1},{col:1,row:3},{col:6,row:3},{col:1,row:4},{col:6,row:4},{col:2,row:6},{col:5,row:6}]],Xp=-2.85,hx=.55,Yp=Xp+hx,Kp=-.85,dx=1,fx=1.25,hu=[{laneId:0,y:Kp,spawnX:4.65}];function px(i){const e=new Wl(i.seed),t=zp(i.difficulty),n=mx(e,i.difficulty),r=xx(gx(e,i.difficulty),t.baseDamage);return{type:"TRIAL",difficulty:i.difficulty,seed:i.seed,initialBoard:n,trial:{lanes:hu,mageX:Xp,contactX:Yp,laneY:Kp,baseDamage:t.baseDamage,waveManifest:r}}}function mx(i,e){const t=cx(e,i),n=ux(e),r=Tx([t,...n,[]]);for(const s of r)try{return Eh(i,{voidCells:s,minValidMoves:3,maxAttempts:120})}catch{}return Eh(i,{minValidMoves:3,maxAttempts:120})}function gx(i,e){const t=zp(e),n=[...Array.from({length:t.basicKoboldCount},()=>"kobold"),...Array.from({length:t.tallKoboldCount},()=>"tallKobold"),...Array.from({length:t.miniBossCount},()=>"miniBoss")],r=Mx(n,i),s=Math.max(1,t.waveCount),a=Math.ceil(r.length/s);return r.map((o,l)=>{const c=Math.floor(l/a),u=l%a;return{monsterId:`trial-${e}-${l}`,kind:o,laneId:hu[0].laneId,spawnTimeMs:c*t.waveGapMs+u*t.spawnIntervalMs,maxHp:vx(o,t),walkSpeed:t.walkSpeed*fx,scoreValue:Sx(o)}})}function _x(i,e){if(i.length===0)return!0;const n=i.reduce((s,a)=>{const o=Yp+qp(a.kind);return s+(hu[0].spawnX-o)/a.walkSpeed},0)*dx*e,r=i.reduce((s,a)=>s+a.maxHp,0);return n>=r}function qp(i){switch(i){case"kobold":return .44;case"tallKobold":return .5;case"miniBoss":return .67}}function xx(i,e){let t=Fo(i.map(n=>({...n})));for(let n=0;n<10;n+=1){if(t=Fo(t),_x(t,e))return t;t=t.map(r=>({...r,maxHp:Math.max(1,Math.floor(r.maxHp*.9))}))}return Fo(t)}function Fo(i){var t;const e=(t=i.find(n=>n.kind==="kobold"))==null?void 0:t.maxHp;return e==null?i.map(n=>({...n})):i.map(n=>n.kind==="miniBoss"?{...n,maxHp:e*4}:{...n})}function vx(i,e){switch(i){case"kobold":return e.basicKoboldHp;case"tallKobold":return e.tallKoboldHp;case"miniBoss":return e.miniBossHp}}function Sx(i){switch(i){case"kobold":return 100;case"tallKobold":return 220;case"miniBoss":return 500}}function Mx(i,e){const t=[...i];for(let n=t.length-1;n>0;n-=1){const r=e.nextInt(0,n+1);[t[n],t[r]]=[t[r],t[n]]}return t}function Tx(i){const e=new Set,t=[];for(const n of i){const r=yx(n);e.has(r)||(e.add(r),t.push(n.map(s=>({...s}))))}return t}function yx(i){return[...i].sort((e,t)=>e.row-t.row||e.col-t.col).map(e=>`${e.col},${e.row}`).join("|")}function Ex(i){return px(i)}function $p(i,e,t={}){const n=kt(i),r=[],s=[],a=t.maxIterations??50,o=t.nextTileId??Xs(n,"cascade-tile");for(let l=0;l<a;l+=1){const c=Hr(n,{preferredSpawnCell:l===0?t.preferredSpawnCell:void 0});if(c.length===0)return{board:n,steps:r,animationTrace:t.animation==null?void 0:wp(t.animation,s,n)};const u=kt(n),h=rr(c.flatMap(g=>g.tiles)),d=bx(n,c,o),f=kt(n),p=jp(n,e,o),_=kt(n);r.push({matches:c,clearedCells:h,spawnedPowerUps:d}),t.animation!=null&&s.push(Rp(l,u,f,p.afterGravityBoard,_,h,new Map,p.refillTiles))}throw new Error(`Cascade did not settle after ${a} iterations.`)}function bx(i,e,t){const n=rr(e.flatMap(s=>s.tiles));for(const s of n)i[s.row][s.col].tile=null;const r=[];for(const s of e){if(s.spawnPowerUp==null)continue;const a=i[s.spawnCell.row][s.spawnCell.col];a.isVoid||(a.tile=Ys(s.spawnPowerUp,s.spawnCell.col,s.spawnCell.row,t),r.push({type:s.spawnPowerUp,coord:s.spawnCell}))}return r}function Ax(i){for(let e=0;e<Ce*Ce;e+=1){const t=Ix(i),n=Cx(i);if(!t&&!n)return}}function jp(i,e,t){Ax(i);const n=kt(i),r=[],s=new Map,a=Fx(i).sort((o,l)=>o.col-l.col||l.row-o.row);for(const o of a){const l=ql(i,o)?o.col:wx(i,o),c=!ql(i,o),u=s.get(l)??0;c||s.set(l,u+1);const h=kr.filter(p=>!Ap(i,o,p)),d=h.length>0?h:kr,f=Ys(d[e.nextInt(0,d.length)],o.col,o.row,t);i[o.row][o.col].tile=f,r.push({tileId:f.id,tileType:f.type,from:c?{col:l,row:Dx(i,l,o.row)}:{col:l,row:-1-u},to:o,movementKind:l===o.col?"fall":"slide"})}return{afterGravityBoard:n,refillTiles:r}}function ql(i,e){for(let t=0;t<e.row;t+=1)if(i[t][e.col].isVoid)return!1;return!0}function wx(i,e){const t=e.col-1,n=e.col+1,r=(e.row+e.col)%2===0?[t,n]:[n,t];for(const s of r)if(s>=0&&s<Ce&&Rx(i,s))return s;for(const s of r)if(s>=0&&s<Ce)return s;return e.col}function Rx(i,e){return i.some((t,n)=>!t[e].isVoid&&ql(i,{col:e,row:n}))}function Ix(i){var t,n;let e=!1;for(let r=0;r<Ce;r+=1){let s=Ce-1;for(;s>=0;){if(i[s][r].isVoid){i[s][r].tile!=null&&(e=!0),i[s][r].tile=null,s-=1;continue}const a=s;for(;s>=0&&!i[s][r].isVoid;)s-=1;const o=s+1,l=[];for(let c=a;c>=o;c-=1){const u=i[c][r].tile;u!=null&&l.push(u)}for(let c=a;c>=o;c-=1){const u=i[c][r],h=((t=u.tile)==null?void 0:t.id)??null,d=l.shift()??null;u.tile=d==null?null:{...d,col:r,row:c},(((n=u.tile)==null?void 0:n.id)??null)!==h&&(e=!0)}}}return e}function Cx(i){let e=!1;for(let t=Ce-1;t>=1;t-=1)for(let n=0;n<Ce;n+=1){const r=i[t][n];if(r.isVoid||r.tile!=null)continue;const s=Lx(i,{col:n,row:t});if(s==null)continue;const a=i[s.row][s.col],o=a.tile;o!=null&&(r.tile={...o,col:n,row:t},a.tile=null,e=!0)}return e}function Lx(i,e){if(!Px(i,e))return null;const t={col:e.col-1,row:e.row-1},n={col:e.col+1,row:e.row-1},r=(e.row+e.col)%2===0?[t,n]:[n,t];for(const s of r){if(s.col<0||s.col>=Ce)continue;const a=i[s.row][s.col];if(!(a.isVoid||a.tile==null))return s}return null}function Px(i,e){for(let t=0;t<e.row;t+=1)if(i[t][e.col].isVoid)return!0;return!1}function Dx(i,e,t){for(let n=t-1;n>=0;n-=1)if(!i[n][e].isVoid)return n;for(let n=t;n<Ce;n+=1)if(!i[n][e].isVoid)return n;return-1}function Fx(i){const e=[];for(let t=0;t<Ce;t+=1)for(let n=0;n<Ce;n+=1){const r=i[t][n];!r.isVoid&&r.tile==null&&e.push({col:n,row:t})}return sr(e)}const Ux={matchCount:0,comboCount:0,powerUpsCreated:0,validSwapCount:0};function Nx(i){return 1+.1*i}function Ox(i,e,t){const n=t>0?e/t:0,r=Math.max(0,n-1)*100;return Math.round(1e3*Nx(i)+r)}function bh(i){return i.comboCount*100+i.powerUpsCreated*200}function Zp(i,e,t=1){return{matchCount:i,comboCount:Math.max(0,i-1),powerUpsCreated:e,validSwapCount:t}}const Ft=1e-6,Ls=.18,Bx=.4,kx=.16,Hx=-1.41,Vx=-1.49,zx=-1.63,Gx=-2.28,Wx=1.74,Xx=1.74,Yx=3.045,is=.5,Ja=1,Ah=.15,$l=1.5,Kx=.12,Jp=.5,Qp=4,wh=Jp*Qp,qx=12,$x=4,Rh=$x/qx,jl=["k.head-1","k.head-2","k.head-3"],Zl=["k.club-1","k.club-2","k.club-3"];function Ih(i){return hm({elapsedMs:0,nextSpawnIndex:0,monsters:[],projectiles:[],pendingAttacks:[],defeatedMonsterIds:[],totalMonsters:i.trial.waveManifest.length,result:"playing",nextProjectileIndex:0,nextAttackIndex:0,nextBurnIndex:0,nextImpactVfxIndex:0},i)}function jx(i,e,t,n={}){if(i.result!=="playing")return{runtime:tc(i,t),scoreDelta:0,damageEvents:[]};const r=i.elapsedMs+Math.max(0,t)*1e3,s=Math.max(0,t),a=Math.max(0,n.monsterWalkSpeedMultiplier??1),o=tc(i,s),l=ov(o,s),c=fu(l.runtime,e),u=Av(c,s),h=wv(u,s),d=Rv(h,s),f=Sv(d,s),p=lv(f,e,s),_={...p.runtime,elapsedMs:r,monsters:p.runtime.monsters.map(S=>S.hp>0&&(S.iceFreezeRemainingSec??0)<=0?{...S,x:S.x-S.walkSpeed*Zx(h.monsters.find(M=>M.monsterId===S.monsterId)??S,s)*a}:S)},g=hm(_,e),m=fm(g,e);return{runtime:{...g,result:m},scoreDelta:l.scoreDelta+p.scoreDelta,damageEvents:[...l.damageEvents,...p.damageEvents]}}function Zx(i,e){var n;if((i.iceFreezeRemainingSec??0)>Ft)return 0;const t=(n=i.iceFreezeDelayQueueSec)==null?void 0:n[0];return t!=null&&t<=e?Math.max(0,t):e}function Jx(i,e){return tc(i,e)}function Ch(i,e,t,n,r,s){if(e.result!=="playing")return Ha(i,e);const a=Za(i,n,r);if(!a.valid)return a.reason==="noMatch"?Ha(i,e,h_(i,n,r,0)):Ha(i,e);const o=gv(i,n,r),l=kt(i),c=kt(i);su(c,n,r);const u=kt(c),h=Xs(c,"trial-cascade-tile"),d=[];let f=0,p,_;if(o!=null){const M=um(c,s,h,o.originAfterSwap,{revisionId:0,preSwapBoard:l,postSwapBoard:u,swappedCells:{from:n,to:r}},o.targetType);f=M.detonations.length;const T=lm(M.animationTrace,0);d.push(...M.detonations.map((w,E)=>cm(t,w,T,E===0?o.targetType:void 0))),p=M.cascadeResult,_=M.animationTrace}else p=$p(c,s,{preferredSpawnCell:r,nextTileId:h,animation:{revisionId:0,preSwapBoard:l,postSwapBoard:u,swappedCells:{from:n,to:r}}}),_=p.animationTrace;d.push(...om(t,p,_,o==null?0:1));const g=im(e,t,d),m=p.steps.reduce((M,T)=>M+T.matches.length,0),S=p.steps.reduce((M,T)=>M+T.spawnedPowerUps.length,0);return{valid:!0,board:p.board,runtime:g.runtime,scoreDelta:g.scoreDelta,damageEvents:g.damageEvents,queuedAttackEvents:g.queuedAttackEvents,scoringStats:Zp(m,S),powerUpsUsed:f,animationTrace:_}}function Qx(i,e,t,n,r){const s=_v(i,n);if(e.result!=="playing"||s==null)return Ha(i,e);const a=Xs(i,"trial-powerup-cascade-tile"),o=um(i,r,a,n,{revisionId:0,preSwapBoard:i,postSwapBoard:i,swappedCells:null},s.targetType),l=lm(o.animationTrace,0),c=[...o.detonations.map((f,p)=>cm(t,f,l,p===0?s.targetType:void 0)),...om(t,o.cascadeResult,o.animationTrace,1)],u=im(e,t,c),h=1+o.cascadeResult.steps.reduce((f,p)=>f+p.matches.length,0),d=o.cascadeResult.steps.reduce((f,p)=>f+p.spawnedPowerUps.length,0);return{valid:!0,board:o.cascadeResult.board,runtime:u.runtime,scoreDelta:u.scoreDelta,damageEvents:u.damageEvents,queuedAttackEvents:u.queuedAttackEvents,scoringStats:Zp(h,d),powerUpsUsed:o.detonations.length,animationTrace:o.animationTrace}}function ev(i,e){const t=du(i,e);return t.length===0?null:t[0]}function du(i,e){return i.monsters.filter(t=>t.hp>0).sort((t,n)=>{const r=Math.abs(t.x-e.trial.mageX),s=Math.abs(n.x-e.trial.mageX);return r-s||t.monsterId.localeCompare(n.monsterId)})}function tv(i){switch(i.shape){case"basic":return i.tiles.length>=4?2:1;case"rocketH":case"rocketV":return 2;case"lightball":return 3;case"tnt":return 2.5}}function em(i,e){return{x:e.x,y:Uv(i,e.laneId),z:Ov(e.kind)}}function tm(i){switch(i){case"kobold":return Vx;case"tallKobold":return zx;case"miniBoss":return Gx}}function nv(i){switch(i){case"kobold":return Wx;case"tallKobold":return Xx;case"miniBoss":return Yx}}function Jr(i,e){const t=em(i,e);return{...t,y:t.y+tm(e.kind)+nv(e.kind)+(e.visualYOffset??0)}}function nm(i){return{x:i.trial.mageX,y:i.trial.laneY,z:.55}}function Lh(i){const e=nm(i);return{x:e.x+.55,y:e.y+.95,z:e.z+.05}}function im(i,e,t){var s;let n={...i,monsters:i.monsters.map(a=>iv(a)),projectiles:i.projectiles.map(a=>({...a})),pendingAttacks:i.pendingAttacks.map(a=>rm(a)),impactVfx:(s=i.impactVfx)==null?void 0:s.map(a=>({...a,hitWorldPosition:{...a.hitWorldPosition}})),defeatedMonsterIds:[...i.defeatedMonsterIds]};const r=[];for(const a of t){if(a.schoolId==="lightning"){const o=du(n,e),l=[],c=[],u=`chain-${n.nextAttackIndex}`;let h=null,d;const f=[];for(const[p,_]of o.entries()){const g=n.monsters.find(L=>L.monsterId===_.monsterId);if(g==null)continue;const m=p*Kx,S=a.castActivationDelaySec+is+m,M=S+a.durationSec,T=n.nextAttackIndex+c.length,w=n.nextProjectileIndex+l.length,E=`trial-attack-${T}`,C=`trial-${w}`,v=Uh(w,e,a,g,{attackId:E,originKind:h==null?"mage":"world",from:h==null?Lh(e):Jr(e,h),castActivationDelaySec:a.castActivationDelaySec+m,activationDelaySec:S,chargeDurationSec:h==null?is:0}),A=Ph(T,a,g,{attackId:E,projectileId:C,impactDelaySec:M,castActivationDelaySec:a.castActivationDelaySec+m,chainId:u,chainIndex:p,originAttackId:d,excludedMonsterIds:f});c.push(A),l.push(v),r.push({attackId:E,monsterId:g.monsterId,schoolId:a.schoolId,damage:a.damage,castActivationDelaySec:a.castActivationDelaySec+m}),h=_,d=E,f.push(g.monsterId)}c.length>0&&(n={...n,projectiles:[...n.projectiles,...l],pendingAttacks:[...n.pendingAttacks,...c],nextProjectileIndex:n.nextProjectileIndex+l.length,nextAttackIndex:n.nextAttackIndex+c.length});continue}for(let o=0;o<a.shotCount;o+=1){const l=ev(n,e);if(l==null)continue;const c=a.castActivationDelaySec+is+a.durationSec,u=n.nextAttackIndex,h=`trial-attack-${u}`,d=n.nextProjectileIndex,f=o<a.visualShotCount?`trial-${d}`:void 0,p=o<a.visualShotCount?Uh(d,e,a,l,{attackId:h,originKind:"mage",from:Lh(e),castActivationDelaySec:a.castActivationDelaySec,activationDelaySec:a.castActivationDelaySec+is,chargeDurationSec:is}):null,_=Ph(u,a,l,{attackId:h,projectileId:f,impactDelaySec:c,castActivationDelaySec:a.castActivationDelaySec});n={...n,projectiles:p==null?n.projectiles:[...n.projectiles,p],pendingAttacks:[...n.pendingAttacks,_],nextProjectileIndex:p==null?n.nextProjectileIndex:n.nextProjectileIndex+1,nextAttackIndex:n.nextAttackIndex+1},r.push({attackId:h,monsterId:l.monsterId,schoolId:a.schoolId,damage:a.damage,castActivationDelaySec:a.castActivationDelaySec})}}return{runtime:{...n,result:fm(n,e)},scoreDelta:0,damageEvents:[],queuedAttackEvents:r}}function iv(i){return{...i,hitShakeQueueSec:i.hitShakeQueueSec==null?void 0:[...i.hitShakeQueueSec],healthBarUpdateQueue:i.healthBarUpdateQueue==null?void 0:i.healthBarUpdateQueue.map(e=>({...e})),iceFreezeDelayQueueSec:i.iceFreezeDelayQueueSec==null?void 0:[...i.iceFreezeDelayQueueSec],fireBurnStacks:i.fireBurnStacks==null?void 0:i.fireBurnStacks.map(e=>rv(e))}}function rm(i){return{...i,excludedMonsterIds:i.excludedMonsterIds==null?void 0:[...i.excludedMonsterIds]}}function rv(i){return{...i,tickDelayQueueSec:[...i.tickDelayQueueSec]}}function Ph(i,e,t,n){return{attackId:n.attackId??`trial-attack-${i}`,schoolId:e.schoolId,effectKind:e.effectKind,damage:e.damage,targetMonsterId:t.monsterId,impactDelaySec:Math.max(0,n.impactDelaySec),castActivationDelaySec:Math.max(0,n.castActivationDelaySec),projectileId:n.projectileId,chainId:n.chainId,chainIndex:n.chainIndex,originAttackId:n.originAttackId,excludedMonsterIds:n.excludedMonsterIds==null?void 0:[...n.excludedMonsterIds]}}function sv(i,e,t){return{burnId:`burn-${i}`,damage:e,activationDelaySec:Math.max(0,t),tickDelayQueueSec:Array.from({length:Qp},(n,r)=>(r+1)*Jp),visualRemainingSec:wh,visualDurationSec:wh}}function av(i,e,t,n){return{vfxId:`earth-impact-${i}`,schoolId:"earth",targetMonsterId:t.monsterId,hitWorldPosition:Jr(e,t),activationDelaySec:Math.max(0,n),remainingSec:Rh,durationSec:Rh}}function ov(i,e){const t=Math.max(0,e);if(t<=0)return{runtime:i,scoreDelta:0,damageEvents:[]};let n=0;const r=[],s=i.monsters.map(a=>{const o=a.fireBurnStacks??[];if(o.length<=0||a.hp<=0)return a.hp<=0&&o.length>0?{...a,fireBurnStacks:void 0}:a;let l={...a};const c=[];for(const u of o){const h=u.activationDelaySec??0,d=Math.max(0,t-h),f=Math.max(0,h-t);if(f>Ft){c.push({...u,activationDelaySec:f});continue}const p=u.tickDelayQueueSec.map(S=>S-d).sort((S,M)=>S-M),_=p.filter(S=>S<=Ft).length,g=p.filter(S=>S>Ft),m=Math.max(0,u.visualRemainingSec-d);for(let S=0;S<_&&l.hp>0;S+=1){const M=Math.min(l.hp,u.damage),T=Math.max(0,l.hp-u.damage),w=T<=0;l={...l,hp:T,defeatDelaySec:w?0:l.defeatDelaySec,...Tv(l,0),...Ev(l,0,T)},n+=Math.round(M*2)+(w?l.scoreValue:0),r.push({monsterId:l.monsterId,schoolId:"fire",damage:M,defeated:w,impactDelaySec:0,castActivationDelaySec:0})}if(l.hp<=0)break;(g.length>0||m>Ft)&&c.push({...u,activationDelaySec:void 0,tickDelayQueueSec:g,visualRemainingSec:m})}return{...l,fireBurnStacks:l.hp>0&&c.length>0?c:void 0}});return{runtime:{...i,monsters:s},scoreDelta:n,damageEvents:r}}function lv(i,e,t){const n=Math.max(0,t);if(i.pendingAttacks.length<=0)return{runtime:i,scoreDelta:0,damageEvents:[]};let r={...i,projectiles:i.projectiles.map(u=>({...u})),pendingAttacks:[]},s=[];const a=new Map;let o=0;const l=[],c=i.pendingAttacks.map(u=>({...rm(u),impactDelaySec:u.impactDelaySec-n})).sort(cv);for(const u of c){r={...r,pendingAttacks:s};const h=dv(r,u,a);r=h.runtime;const d=h.attack;if(d.impactDelaySec>Ft){const g=Jl(r,e,d);if(g==null){r=ec(r,d),s=[...r.pendingAttacks];continue}const m=g.monsterId===d.targetMonsterId?d:{...d,targetMonsterId:g.monsterId};g.monsterId!==d.targetMonsterId&&(r=Ql(r,e,m,g)),s.push(m),r={...r,pendingAttacks:s};continue}const f=Jl(r,e,d);if(f==null){r=ec(r,d),s=[...r.pendingAttacks];continue}const p=f.monsterId===d.targetMonsterId?d:{...d,targetMonsterId:f.monsterId};f.monsterId!==d.targetMonsterId&&(r=Ql(r,e,p,f));const _=uv(r,e,p,f);r=_.runtime,o+=_.scoreDelta,l.push(_.damageEvent),p.chainId!=null&&a.set(p.attackId,{monsterId:f.monsterId,position:Jr(e,f)}),r=hv(r,e,p,f),_.damageEvent.defeated&&(r=fu(r,e)),s=[...r.pendingAttacks]}return{runtime:{...r,pendingAttacks:s},scoreDelta:o,damageEvents:l}}function cv(i,e){return i.impactDelaySec-e.impactDelaySec||Dh(i)-Dh(e)||i.attackId.localeCompare(e.attackId)}function Dh(i){const e=/(\d+)$/.exec(i.attackId);return e==null?0:Number.parseInt(e[1],10)}function uv(i,e,t,n){const r=Math.min(n.hp,t.damage),s=Math.max(0,n.hp-t.damage),a=s<=0,o=t.schoolId==="fire"&&!a?sv(i.nextBurnIndex,t.damage,0):null,l=t.schoolId==="earth"?av(i.nextImpactVfxIndex??0,e,n,0):null,c=i.monsters.map(u=>u.monsterId===n.monsterId?{...u,hp:s,defeatDelaySec:a?0:u.defeatDelaySec,defeatAnimationRemainingSec:a?Ja:u.defeatAnimationRemainingSec,defeatAnimationDurationSec:a?Ja:u.defeatAnimationDurationSec,defeatFadeRemainingSec:a?void 0:u.defeatFadeRemainingSec,defeatFadeDurationSec:a?void 0:u.defeatFadeDurationSec,...yv(),...Ur(),...t.schoolId==="ice"&&!a?bv():{},...o==null?{fireBurnStacks:a?void 0:u.fireBurnStacks}:{fireBurnStacks:[...u.fireBurnStacks??[],o]}}:u);return{runtime:{...i,monsters:c,impactVfx:l==null?i.impactVfx:[...i.impactVfx??[],l],nextBurnIndex:o==null?i.nextBurnIndex:i.nextBurnIndex+1,nextImpactVfxIndex:l==null?i.nextImpactVfxIndex:(i.nextImpactVfxIndex??0)+1},scoreDelta:Math.round(r*2)+(a?n.scoreValue:0),damageEvent:{monsterId:n.monsterId,schoolId:t.schoolId,damage:r,defeated:a,impactDelaySec:0,castActivationDelaySec:0}}}function Jl(i,e,t){const n=new Set(t.excludedMonsterIds??[]),r=i.monsters.find(s=>s.monsterId===t.targetMonsterId&&s.hp>0&&!n.has(s.monsterId));return r??du(i,e).find(s=>!n.has(s.monsterId))??null}function fu(i,e){if(i.pendingAttacks.length<=0)return i;let t=i;const n=[];for(const r of i.pendingAttacks){const s=Jl({monsters:t.monsters},e,r);if(s==null){t=ec(t,r);continue}const a=s.monsterId===r.targetMonsterId?r:{...r,targetMonsterId:s.monsterId};s.monsterId!==r.targetMonsterId&&(t=Ql(t,e,a,s)),n.push(a)}return{...t,pendingAttacks:n}}function hv(i,e,t,n){if(t.chainId==null)return i;const r=Jr(e,n);let s=i;const a=i.pendingAttacks.map(o=>{if(o.chainId!==t.chainId)return o;const l=sm(o.excludedMonsterIds??[],n.monsterId);return o.originAttackId===t.attackId&&(s=am(s,o,r)),{...o,excludedMonsterIds:l}});return fu({...s,pendingAttacks:a},e)}function sm(i,e){return i.includes(e)?i:[...i,e]}function dv(i,e,t){if(e.originAttackId==null)return{runtime:i,attack:e};const n=t.get(e.originAttackId);if(n==null)return{runtime:i,attack:e};const r={...e,excludedMonsterIds:sm(e.excludedMonsterIds??[],n.monsterId)};return{runtime:am(i,r,n.position),attack:r}}function Ql(i,e,t,n){if(t.projectileId==null)return i;const r=Jr(e,n);return{...i,projectiles:i.projectiles.map(s=>s.projectileId===t.projectileId?{...s,targetMonsterId:n.monsterId,to:r}:s)}}function am(i,e,t){return e.projectileId==null?i:{...i,projectiles:i.projectiles.map(n=>n.projectileId===e.projectileId?{...n,from:t,originKind:"world"}:n)}}function ec(i,e){return e.projectileId==null?i:{...i,projectiles:i.projectiles.filter(t=>t.projectileId!==e.projectileId)}}function om(i,e,t,n){const r=t==null?[]:go(t);return e.steps.flatMap((s,a)=>s.matches.filter(o=>ii(o.tileType)).map(o=>{var l;return{schoolId:pm(o.tileType),effectKind:"match",damage:i.trial.baseDamage*(tv(o)+a*.25),shotCount:1,visualShotCount:1,castActivationDelaySec:(((l=r[a+n])==null?void 0:l.popStartMs)??0)/1e3,durationSec:Dp/1e3}}))}function lm(i,e){var t;return i==null?0:(((t=go(i)[e])==null?void 0:t.popStartMs)??0)/1e3}function cm(i,e,t,n){const r=e.detonation,s=n??r.lightballTargetType,a=r.powerUpType==="TNT";return{schoolId:s!=null&&ii(s)?pm(s):"fire",effectKind:a?"bomb":"match",damage:i.trial.baseDamage*fv(r.powerUpType),shotCount:Fh(r),visualShotCount:a?1:Fh(r),castActivationDelaySec:t+e.activationDelayMs/1e3,durationSec:(a?w_:Dp)/1e3}}function fv(i){switch(i){case"ROCKET_H":case"ROCKET_V":return 1.25;case"TNT":return 1.5;case"LIGHTBALL":return 1}}function Fh(i){switch(i.powerUpType){case"ROCKET_H":case"ROCKET_V":return 3;case"TNT":return 5;case"LIGHTBALL":return Math.min(8,Math.max(1,Math.ceil(i.clearedCells.length/3)))}}function Uh(i,e,t,n,r){return{projectileId:`trial-${i}`,attackId:r.attackId,targetMonsterId:n.monsterId,schoolId:t.schoolId,effectKind:t.effectKind,originKind:r.originKind,from:r.from,to:Jr(e,n),castActivationDelaySec:r.castActivationDelaySec,activationDelaySec:r.activationDelaySec,chargeDurationSec:r.chargeDurationSec,remainingSec:t.durationSec,durationSec:t.durationSec}}function um(i,e,t,n,r,s){var p;const a=kt(i),o=q_(a,n,{lightballTargetType:s}),l=kt(a);for(const _ of o.detonations)pv(a,_.detonation);const c=kt(a),u=jp(a,e,t),h=kt(a),d=Rp(0,l,c,u.afterGravityBoard,h,o.clearedCells,mv(o),u.refillTiles),f=$p(a,e,{preferredSpawnCell:n,nextTileId:t,animation:r});return{cascadeResult:f,detonations:o.detonations,animationTrace:wp(r,[d,...((p=f.animationTrace)==null?void 0:p.cascadeSteps.map((_,g)=>({..._,stepIndex:g+1})))??[]],f.board)}}function pv(i,e){for(const t of e.clearedCells){const n=bt(i,t);n!=null&&(n.tile=null)}}function mv(i){const e=new Map;for(const t of i.clearTimings){const n=xn(t.coord),r=e.get(n);(r==null||t.clearDelayMs<r)&&e.set(n,t.clearDelayMs)}return e}function gv(i,e,t){var s,a;const n=(s=bt(i,e))==null?void 0:s.tile,r=(a=bt(i,t))==null?void 0:a.tile;return n!=null&&bi(n.type)?{originAfterSwap:t,powerUpType:n.type,targetType:Nh(r==null?void 0:r.type)}:r!=null&&bi(r.type)?{originAfterSwap:e,powerUpType:r.type,targetType:Nh(n==null?void 0:n.type)}:null}function Nh(i){return i!=null&&ru(i)?i:void 0}function _v(i,e){var n,r;const t=(r=(n=bt(i,e))==null?void 0:n.tile)==null?void 0:r.type;if(!K_(t))return null;if(t==="LIGHTBALL"){const s=kp(i,e);return s==null?null:{targetType:s}}return{}}function hm(i,e){const t=[...i.monsters];let n=i.nextSpawnIndex;return n<e.trial.waveManifest.length&&e.trial.waveManifest[n].spawnTimeMs<=i.elapsedMs&&vv(e,t,e.trial.waveManifest[n].laneId)&&(t.push(xv(e,e.trial.waveManifest[n],n)),n+=1),{...i,nextSpawnIndex:n,monsters:t}}function xv(i,e,t){return{monsterId:e.monsterId,kind:e.kind,laneId:e.laneId,hp:e.maxHp,maxHp:e.maxHp,x:mu(i,e.laneId).spawnX,spawnTimeMs:e.spawnTimeMs,walkSpeed:e.walkSpeed,scoreValue:e.scoreValue,visualYOffset:dm(t),modelVariant:pu(i.seed,e.monsterId)}}function vv(i,e,t){const n=mu(i,t),s=Math.max(.001,n.spawnX-i.trial.contactX)*Bx;return!e.some(a=>a.laneId!==t?!1:n.spawnX-a.x<s)}function dm(i){return i%2===0?kx:Hx}function pu(i,e){return{headNodeName:jl[Oh(jl,`${i}:${e}:kobold-head`)],clubNodeName:Zl[Oh(Zl,`${i}:${e}:kobold-club`)]}}function Oh(i,e){return i.length===0?0:Math.min(i.length-1,Math.floor(Nv(e)*i.length))}function tc(i,e){const t=Math.max(0,e),n=(i.impactVfx??[]).map(r=>Dv(r,t)).filter(r=>r.activationDelaySec>0||r.remainingSec>Ft);return{...i,projectiles:i.projectiles.map(r=>Pv(r,t)).filter(r=>r.activationDelaySec>0||r.remainingSec>0),impactVfx:n.length>0?n:void 0}}function Sv(i,e){const t=Math.max(0,e),n=[...i.defeatedMonsterIds],r=[];for(const s of i.monsters){const a=Mv(s,t);if(a==null){n.includes(s.monsterId)||n.push(s.monsterId);continue}r.push(a)}return{...i,monsters:r,defeatedMonsterIds:n}}function Mv(i,e){if(i.hp>0)return i;let t=e,n=i.defeatDelaySec??0,r=i.defeatAnimationRemainingSec;const s=i.defeatAnimationDurationSec??Ja;let a=i.defeatFadeRemainingSec;const o=i.defeatFadeDurationSec??Ah;if(n>Ft&&t>0){const l=Math.min(n,t);n-=l,t-=l}if(n>Ft)return{...i,...Ur(),defeatDelaySec:n,defeatAnimationRemainingSec:r,defeatAnimationDurationSec:r==null?i.defeatAnimationDurationSec:s,defeatFadeRemainingSec:a,defeatFadeDurationSec:a==null?i.defeatFadeDurationSec:o};if(r==null&&(r=Ja),r>Ft&&t>0){const l=Math.min(r,t);r-=l,t-=l}return r>Ft?{...i,...Ur(),defeatDelaySec:0,defeatAnimationRemainingSec:r,defeatAnimationDurationSec:s,defeatFadeRemainingSec:a,defeatFadeDurationSec:a==null?i.defeatFadeDurationSec:o}:(a==null&&(a=Ah),t>0&&(a-=t),a<=Ft?null:{...i,...Ur(),defeatDelaySec:0,defeatAnimationRemainingSec:0,defeatAnimationDurationSec:s,defeatFadeRemainingSec:a,defeatFadeDurationSec:o})}function Tv(i,e){const t=[...i.hitShakeQueueSec??[],Math.max(0,e)].sort((r,s)=>r-s),n=i.hitShakeRemainingSec??0;return{hitShakeDelaySec:t[0],hitShakeQueueSec:t,hitShakeRemainingSec:n>0?Ls:n,hitShakeDurationSec:Ls}}function yv(){return{hitShakeDelaySec:void 0,hitShakeQueueSec:void 0,hitShakeRemainingSec:Ls,hitShakeDurationSec:Ls}}function Ev(i,e,t){if(t<=0)return Ur();const n=i.healthBarHp??i.hp,r=[...i.healthBarUpdateQueue??[],{delaySec:Math.max(0,e),hp:t}].sort((s,a)=>s.delaySec-a.delaySec);return{healthBarHp:n,healthBarUpdateQueue:r}}function Ur(){return{healthBarHp:void 0,healthBarUpdateQueue:void 0}}function bv(){return{iceFreezeDelayQueueSec:void 0,iceFreezeRemainingSec:$l,iceFreezeDurationSec:$l}}function Av(i,e){const t=Math.max(0,e);return{...i,monsters:i.monsters.map(n=>Lv(n,t))}}function wv(i,e){const t=Math.max(0,e);return{...i,monsters:i.monsters.map(n=>Cv(n,t))}}function Rv(i,e){const t=Math.max(0,e);return{...i,monsters:i.monsters.map(n=>Iv(n,t))}}function Iv(i,e){const n=[...i.iceFreezeDelayQueueSec??[]].sort((c,u)=>c-u),r=[],s=i.iceFreezeDurationSec??$l;let a=i.iceFreezeRemainingSec??0,o=0;for(const c of n){if(c>e){r.push(c-e);continue}const u=Math.max(0,c-o);u>0&&(a=Math.max(0,a-u)),o=Math.max(o,c),a+=s}const l=Math.max(0,e-o);return l>0&&(a=Math.max(0,a-l)),a<=Ft&&r.length<=0?{...i,iceFreezeRemainingSec:void 0,iceFreezeDurationSec:void 0,iceFreezeDelayQueueSec:void 0}:{...i,iceFreezeRemainingSec:a>Ft?a:void 0,iceFreezeDurationSec:s,iceFreezeDelayQueueSec:r.length>0?r:void 0}}function Cv(i,e){if(i.hp<=0)return i.healthBarHp==null&&i.healthBarUpdateQueue==null?i:{...i,...Ur()};const t=i.healthBarUpdateQueue??[];if(t.length<=0)return i.healthBarHp!=null&&i.healthBarHp===i.hp?{...i,healthBarHp:void 0,healthBarUpdateQueue:void 0}:i;const n=t.map(o=>({...o,delaySec:o.delaySec-e})).sort((o,l)=>o.delaySec-l.delaySec),r=n.filter(o=>o.delaySec<=Ft),s=n.filter(o=>o.delaySec>Ft),a=r.length>0?r[r.length-1].hp:i.healthBarHp;return s.length<=0&&a===i.hp?{...i,healthBarHp:void 0,healthBarUpdateQueue:void 0}:{...i,healthBarHp:a,healthBarUpdateQueue:s.length>0?s:void 0}}function Lv(i,e){const n=(i.hitShakeQueueSec??(i.hitShakeDelaySec!=null?[i.hitShakeDelaySec]:[])).map(u=>u-e).sort((u,h)=>u-h),r=n.filter(u=>u<=Ft).length,s=n.filter(u=>u>Ft);let a=s[0];const o=s.length>0?s:void 0;let l=i.hitShakeRemainingSec;const c=i.hitShakeDurationSec??Ls;return r>0?l=c:l!=null&&l>0&&(l-=e,l<=Ft&&(l=void 0)),(l??0)<=Ft&&o==null?{...i,hitShakeDelaySec:void 0,hitShakeQueueSec:void 0,hitShakeRemainingSec:void 0,hitShakeDurationSec:void 0}:{...i,hitShakeDelaySec:a,hitShakeQueueSec:o,hitShakeRemainingSec:l,hitShakeDurationSec:c}}function Pv(i,e){let t=e,n=i.activationDelaySec;const r=Math.max(0,i.castActivationDelaySec-e);let s=i.remainingSec;if(n>0){const a=Math.min(n,t);n-=a,t-=a}return n<=0&&t>0&&(s-=t),{...i,castActivationDelaySec:r,activationDelaySec:Math.max(0,n),remainingSec:s}}function Dv(i,e){let t=e,n=i.activationDelaySec,r=i.remainingSec;if(n>0){const s=Math.min(n,t);n-=s,t-=s}return n<=0&&t>0&&(r-=t),{...i,activationDelaySec:Math.max(0,n),remainingSec:r}}function fm(i,e){return i.monsters.some(t=>t.hp>0&&Fv(e,t))?"lost":i.nextSpawnIndex>=e.trial.waveManifest.length&&i.monsters.length===0&&i.defeatedMonsterIds.length>=e.trial.waveManifest.length?"won":"playing"}function Fv(i,e){return e.x-qp(e.kind)<=i.trial.contactX}function pm(i){switch(i){case"FIRE":return"fire";case"ICE":return"ice";case"LIGHTNING":return"lightning";case"EARTH":return"earth"}}function Uv(i,e){return mu(i,e).y}function mu(i,e){const t=i.trial.lanes.find(n=>n.laneId===e);if(t==null)throw new Error(`Trial lane ${e} does not exist.`);return t}function Nv(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967295}function Ov(i){switch(i){case"kobold":return .35;case"tallKobold":return .45;case"miniBoss":return .55}}function Ha(i,e,t){return{valid:!1,board:i,runtime:e,scoreDelta:0,damageEvents:[],queuedAttackEvents:[],scoringStats:Ux,powerUpsUsed:0,animationTrace:t}}const Bv=[{offset:{col:0,row:0},type:"LIGHTNING"},{offset:{col:1,row:0},type:"FIRE"},{offset:{col:2,row:0},type:"LIGHTNING"},{offset:{col:0,row:1},type:"ICE"},{offset:{col:1,row:1},type:"LIGHTNING"},{offset:{col:2,row:1},type:"EARTH"}],nc=["FIRE","ICE","LIGHTNING","EARTH"];function kv(i){for(const e of kh()){const t=Bh(i,e);if(t!=null)return t}for(let e=0;e<nc.length;e+=1){const t=Gv(i,e);for(const n of kh()){const r=Bh(t,n);if(r!=null)return r}}throw new Error("Unable to create a valid Trial tutorial lightning board.")}function Hv(i,e,t){return _s(e,i.allowedSwap.from)&&_s(t,i.allowedSwap.to)||_s(e,i.allowedSwap.to)&&_s(t,i.allowedSwap.from)}function Bh(i,e){const t=kt(i),n=Xs(t,"trial-tutorial-tile");for(const l of Bv){const c={col:e.col+l.offset.col,row:e.row+l.offset.row};if(!Vv(t,c,l.type,n))return null}const r={from:{col:e.col+1,row:e.row+1},to:{col:e.col+1,row:e.row}},s=[{col:e.col,row:e.row},{...r.from},{col:e.col+2,row:e.row}],a=[{...r.to},{...r.from}],o={board:t,allowedSwap:r,flashCells:a,matchCells:s,movingCell:{...r.from},direction:{col:r.to.col-r.from.col,row:r.to.row-r.from.row}};return zv(o)?o:null}function Vv(i,e,t,n){const r=bt(i,e);return r==null||r.isVoid||r.blocker!=null?!1:(r.tile=r.tile==null?Ys(t,e.col,e.row,n):{...r.tile,type:t,col:e.col,row:e.row},!0)}function zv(i){if(Hr(i.board).length>0||!Za(i.board,i.allowedSwap.from,i.allowedSwap.to).valid)return!1;const e=uu(i.board,i.allowedSwap.from,i.allowedSwap.to),t=[{col:i.allowedSwap.to.col-1,row:i.allowedSwap.to.row},{...i.allowedSwap.to},{col:i.allowedSwap.to.col+1,row:i.allowedSwap.to.row}];return Hr(e,{preferredSpawnCell:i.allowedSwap.to}).some(n=>n.tileType==="LIGHTNING"&&t.every(r=>n.tiles.some(s=>_s(s,r))))}function Gv(i,e){const t=kt(i),n=Xs(t,"trial-tutorial-fallback-tile");for(let r=0;r<Ce;r+=1)for(let s=0;s<Ce;s+=1){const a=t[r][s];if(a.isVoid)continue;const o=nc[(s+r*2+e)%nc.length];a.tile=a.tile==null?Ys(o,s,r,n):{...a.tile,type:o,col:s,row:r}}return t}function kh(){const i=[];for(let e=1;e<Ce-1;e+=1)for(let t=0;t<=Ce-3;t+=1)i.push({col:t,row:e});return i.sort((e,t)=>{const n=Math.abs(e.col-2)+Math.abs(e.row-3),r=Math.abs(t.col-2)+Math.abs(t.row-3);return n-r||e.row-t.row||e.col-t.col})}function _s(i,e){return xn(i)===xn(e)}const Qa=10,Uo=["Brave","Mystic","Golden","Clever","Radiant","Stalwart","Arcane","Noble"],Hh=["Magus","Warden","Sage","Spark","Voyager","Keeper","Knight","Seeker"];function Wv(i,e){const t=_o([...i,e]),n=t.findIndex(r=>r.id===e.id)+1;return{entries:t.slice(0,Qa),qualifiedRank:n>0&&n<=Qa?n:null}}function _o(i){return[...i].sort((e,t)=>t.score-e.score||t.levelsCleared-e.levelsCleared||t.createdAtMs-e.createdAtMs)}function Xv(i){var e;return((e=_o(i)[0])==null?void 0:e.score)??0}function Yv(i,e,t,n){return{id:`${n}-${t}-${i}`,name:Kv(t+n),score:i,levelsCleared:e,createdAtMs:n}}function Kv(i){const e=Uo[Math.abs(i)%Uo.length],t=Hh[Math.abs(Math.floor(i/Uo.length))%Hh.length];return`${e} ${t}`}function qv(i){if(i==null||i.trim()==="")return[];try{const e=JSON.parse(i);return Array.isArray(e)?_o(e.filter(jv)).slice(0,Qa):[]}catch{return[]}}function $v(i){return JSON.stringify(_o(i).slice(0,Qa))}function jv(i){if(typeof i!="object"||i==null)return!1;const e=i;return typeof e.id=="string"&&typeof e.name=="string"&&typeof e.score=="number"&&Number.isFinite(e.score)&&typeof e.levelsCleared=="number"&&Number.isFinite(e.levelsCleared)&&typeof e.createdAtMs=="number"&&Number.isFinite(e.createdAtMs)}const mm=3,Zv=1.2;function Vh(i){return{seed:i,lives:mm,levelNumber:1,difficulty:1,score:0,levelsCleared:0}}function Jv(i,e){return tS(i,e,2654435769)||1}function Qv(i,e){return{...i,score:i.score+e,levelsCleared:i.levelsCleared+1,levelNumber:i.levelNumber+1,difficulty:i.difficulty+1}}function eS(i){return{...i,lives:Math.max(0,i.lives-1)}}function tS(i,e,t){let n=(i^t)>>>0;return n=Math.imul(n^e,2246822507)>>>0,n=Math.imul(n^n>>>13,3266489909)>>>0,(n^n>>>16)>>>0}const mt={backdropForest:"stage.backdrop.forest",mage:"actor.mage",pathMarker:"prop.pathMarker",monsterPlaceholder:"actor.monster.placeholder",miniBoss:"actor.monster.miniBoss",projectilePlaceholder:"vfx.projectile.placeholder",fireBurn:"vfx.fireBurn",earthImpact:"vfx.earthImpact",healthBarTrack:"ui.healthBar.track",healthBarFill:"ui.healthBar.fill"},gm={x:3,y:3,z:3},nS={x:5.25,y:5.25,z:5.25},_m=10.8,Vr=_m/ke,No={x:.7,y:.24,z:0},iS=-1.47-50*Vr,ic=.45,xm=.35,ur=ic+xm,rc=_m+2,ci=.45,rS=rc,zh=.92,Gh=.18,sS=.08,aS=3.72,vm=1.25,Sm=2,oS=5.8,Wh=3.3,lS=1.5,cS=40*Vr,uS=30*Vr,hS=1.2425,dS=12,Xh=3.5,fS=.625,pS=14,mS=.14,gS=.045,Yh=1e-6,_S=.18,xS=3,vS=.1,SS=[-1.25,.1,1.45],MS=-.35,TS=1.5,yS=5,Oo=TS/yS,Kh=1e-6,Bo=Sn,ko=1.5,Ho=1.75,qh=-50,$h=-60,ES=100,ui=.65,bS=192,AS=18,wS=24,RS=266,IS=20,jh=1,Zh=288,CS=-15,LS=40,PS="Defeat the Kobolds!",DS=150,FS=120,US=84,NS=52,OS=8,hi=800,ra=450,Vo=.8,zi=.1,BS=60,Mm=1.8,Va=zi,Tm=zi,kS=Va+Mm+Tm,HS=80,VS=4,zS=.01;function GS(i){const e=Kl(i),t=Kl(i+1);return e===t?R.ui.levelCleared:R.ui.floorCleared}function WS(i,e,t){return i==="WIN"?GS(e):i==="LOSE"?t<=1?R.ui.gameOver:R.ui.lifeLost:null}class XS{constructor(e,t={}){Y(this,"events",[]);Y(this,"rng",new Wl);Y(this,"elapsedSec",0);Y(this,"run",Vh(Po()));Y(this,"board",bp());Y(this,"currentLevel",null);Y(this,"trialRuntime",null);Y(this,"phase","IDLE");Y(this,"muted",!1);Y(this,"bgmMuted",!1);Y(this,"transitionTimerSec",0);Y(this,"pendingLevelResult",null);Y(this,"pendingClearScore",0);Y(this,"levelMatchCount",0);Y(this,"levelValidSwapCount",0);Y(this,"runKoboldsDefeated",0);Y(this,"runMatchesCompleted",0);Y(this,"runPowerUpsUsed",0);Y(this,"gameOverElapsedSec",0);Y(this,"gameOverStats",td());Y(this,"finalScore",0);Y(this,"debugSeed");Y(this,"visualCues",[]);Y(this,"shakeTimerSec",0);Y(this,"shakeAmplitudePixels",0);Y(this,"latestBoardAnimationTrace",null);Y(this,"latestBoardAnimationEndsAtSec",0);Y(this,"animationClockSec",0);Y(this,"nextBoardAnimationRevision",1);Y(this,"matchHintTimerSec",0);Y(this,"trialPlayerDefeatSfxEmitted",!1);Y(this,"trialTutorial",null);Y(this,"tutorialPresentationMode","standard");Y(this,"tutorialZoomOutElapsedSec",0);Y(this,"floatingTutorialResolveElapsedSec",0);Y(this,"floatingTutorialDragStart",null);Y(this,"suppressTrialTutorialForNextLevelStart",!1);Y(this,"trialActorEntranceElapsedSec",ur);Y(this,"trialMageExitElapsedSec",ci);Y(this,"heroActivationOverlay",null);this.options=t,this.debugSeed=e,this.reset(e)}update(e,t){const n=Math.max(0,e);this.animationClockSec+=n,this.updateBoardJuice(n),this.updateHeroActivationOverlay(n);for(const r of t){if(r.type==="restart"){this.tryAgain();continue}if(r.type==="muteToggle"){this.emitUiClick(),this.muted=!this.muted;continue}if(r.type==="tap"){this.handleTap(r.x,r.y);continue}if(r.type==="dragStart"){this.handleDragStart(r.x,r.y);continue}if(r.type==="dragEnd"){this.handleDragEnd(r.x,r.y);continue}r.type==="swap"&&this.handleSwap(r.from,r.to)}if(this.updateTutorialPresentation(n),this.phase==="IDLE"){this.elapsedSec+=n,this.updateMatchHintTimer(n);const r=this.updateTrialActorEntrance(n);this.updateTrialStage(r)}this.phase==="GAME_OVER"&&(this.gameOverElapsedSec+=n),(this.phase==="WIN"||this.phase==="LOSE")&&(this.updateTrialVisualTimers(n),this.updateTrialMageExit(n),this.transitionTimerSec+=n,this.isLevelResultHoldComplete()&&this.hasLatestBoardAnimationFinished()&&this.isLevelResultExitAnimationComplete()&&this.advanceAfterLevelResult())}getBoardRenderState(){const e=this.getTutorialPresentationState();return{logicalWidth:ke,logicalHeight:Sn,tutorialPresentation:e,heroActivationOverlay:this.getHeroActivationOverlayVisualState(e.heroHeight),boardCells:Xl(this.board).map(t=>{const n=this.board[t.row][t.col].tile;return n==null?null:{tileId:n.id,coord:t,assetId:Qh(n.type),tileType:n.type,alpha:1}}).filter(t=>t!=null),emptyCells:o_(this.board).map(t=>({coord:t,assetId:R.tiles.empty})),selectedCell:null,queuedSwap:null,shakePixels:this.getShakePixels(),visualCues:this.getBoardVisualCueState(),animationTrace:this.latestBoardAnimationTrace,matchHint:this.getMatchHintVisualState(),tutorialLock:e.hideBoard?null:this.getTrialTutorialVisualState(),matchEnergyTarget:this.getMatchEnergyTargetLogicalPosition(e)}}getHeroWorldState(){const e=this.getHeroWorldObjects();return{levelType:"TRIAL",backdropId:this.getHeroStageBackdropAssetId(),cinematicState:JS(this.phase),objects:e,activeProjectiles:this.getHeroWorldProjectiles(),camera:{mode:"fixed",position:{x:0,y:0,z:12},target:{x:0,y:0,z:0},fovDeg:35}}}getHeroWorldProjectiles(){if(this.trialRuntime==null)return[];const e=this.getTutorialForegroundYOffsetWorld();return e===0?this.trialRuntime.projectiles:this.trialRuntime.projectiles.map(t=>YS(t,e))}getMatchEnergyTargetLogicalPosition(e){const t=this.getMageMatchEnergyWorldPosition();if(t==null)return;const n=EM(t);return{x:(e.sceneOffsetX??0)+n.x*e.foregroundSceneScale,y:(e.sceneOffsetY??0)+n.y*e.foregroundSceneScale}}getMageMatchEnergyWorldPosition(){if(this.trialRuntime==null)return null;const e=this.getTrialMageRenderPosition();return{x:e.x+No.x,y:e.y+No.y,z:e.z+No.z}}getHudState(){return{phase:this.phase,levelText:`Level ${this.run.levelNumber}`,lives:this.run.lives,scoreText:`${this.run.score}`,objectiveText:this.getObjectiveText(),trialEnemyCount:this.getTrialEnemyCount(),muted:this.muted,bgmMuted:this.bgmMuted,debugText:`Seed ${this.run.seed}`}}getAudioState(){return{muted:this.muted,bgmMuted:this.bgmMuted,trialWalkingMonsterIds:this.getTrialWalkingMonsterIds()}}getScreenState(e=[],t=null){return{screen:MM(this.phase),phase:this.phase,finalScore:this.phase==="GAME_OVER"?this.finalScore:this.run.score,gameOverMetrics:this.getGameOverMetrics(),highScore:Xv(e),leaderboardRows:e,highlightedRank:t,buttonRects:{tryAgain:zl,mute:gh,bgm:iu},muted:this.muted,transitionText:TM(this.phase),transitionImageOverlay:this.getTransitionImageOverlayVisualState()}}getGameOverMetrics(){const e=this.phase==="GAME_OVER"?this.gameOverStats:{koboldsDefeated:this.runKoboldsDefeated,levelsCompleted:this.run.levelsCleared,matchesCompleted:this.runMatchesCompleted,powerUpsUsed:this.runPowerUpsUsed,score:this.run.score};return[{label:"Kobolds Defeated",targetValue:e.koboldsDefeated},{label:"Levels Completed",targetValue:e.levelsCompleted},{label:"Matches Completed",targetValue:e.matchesCompleted},{label:"Power-Ups Used",targetValue:e.powerUpsUsed},{label:"Score",targetValue:e.score}].map((n,r)=>({...n,displayValue:this.sampleGameOverMetricValue(n.targetValue,r)}))}sampleGameOverMetricValue(e,t){if(this.phase!=="GAME_OVER")return e;const n=t*Oo;if(this.gameOverElapsedSec+Kh<n)return null;const r=Lr((this.gameOverElapsedSec-n)/Oo);return this.gameOverElapsedSec+Kh>=n+Oo?e:Math.floor(Math.max(0,e)*r)}drainEvents(){const e=this.events;return this.events=[],e}reset(e=Po()){if(this.rng=new Wl(e),this.run=Vh(e),this.options.oneLifeDoubleSpeed===!0&&(this.run={...this.run,lives:1}),this.options.debugStartLevel!=null&&this.options.debugStartLevel>1){const t=Math.floor(this.options.debugStartLevel);this.run={...this.run,levelNumber:t,difficulty:t,levelsCleared:t-1}}this.prepareCurrentLevel(),this.elapsedSec=0,this.transitionTimerSec=0,this.pendingLevelResult=null,this.pendingClearScore=0,this.finalScore=0,this.runKoboldsDefeated=0,this.runMatchesCompleted=0,this.runPowerUpsUsed=0,this.gameOverElapsedSec=0,this.gameOverStats=td(),this.visualCues=[],this.shakeTimerSec=0,this.shakeAmplitudePixels=0,this.latestBoardAnimationTrace=null,this.latestBoardAnimationEndsAtSec=0,this.animationClockSec=0,this.nextBoardAnimationRevision=1,this.resetMatchHintTimer(),this.events=[],this.bgmMuted=!1,this.trialTutorial=null,this.tutorialPresentationMode="standard",this.tutorialZoomOutElapsedSec=0,this.floatingTutorialResolveElapsedSec=0,this.floatingTutorialDragStart=null,this.suppressTrialTutorialForNextLevelStart=!1,this.trialActorEntranceElapsedSec=ur,this.trialMageExitElapsedSec=ci,this.heroActivationOverlay=null,this.startPreparedLevel()}getRunStateForDebug(){return{...this.run}}getRngStateForDebug(){return this.rng.getState()}getElapsedSecForDebug(){return this.elapsedSec}getBoardForDebug(){return this.board}getCurrentLevelForDebug(){return this.currentLevel}getTrialRuntimeForDebug(){return this.trialRuntime==null?null:{...this.trialRuntime,monsters:this.trialRuntime.monsters.map(e=>({...e})),projectiles:this.trialRuntime.projectiles.map(e=>({...e})),pendingAttacks:this.trialRuntime.pendingAttacks.map(e=>({...e,excludedMonsterIds:e.excludedMonsterIds==null?void 0:[...e.excludedMonsterIds]})),defeatedMonsterIds:[...this.trialRuntime.defeatedMonsterIds]}}getLevelStatsForDebug(){return{matchCount:this.levelMatchCount,validSwapCount:this.levelValidSwapCount}}getRunStatsForDebug(){return{koboldsDefeated:this.runKoboldsDefeated,levelsCompleted:this.run.levelsCleared,matchesCompleted:this.runMatchesCompleted,powerUpsUsed:this.runPowerUpsUsed,score:this.run.score}}getTrialTutorialStateForDebug(){return this.trialTutorial==null?null:{...this.trialTutorial,board:kt(this.trialTutorial.board),allowedSwap:{from:{...this.trialTutorial.allowedSwap.from},to:{...this.trialTutorial.allowedSwap.to}},flashCells:this.trialTutorial.flashCells.map(e=>({...e})),matchCells:this.trialTutorial.matchCells.map(e=>({...e})),movingCell:{...this.trialTutorial.movingCell},direction:{...this.trialTutorial.direction}}}getTrialEntranceStateForDebug(){return{active:this.isTrialActorEntranceActive(),elapsedSec:this.trialActorEntranceElapsedSec,enemyProgress:this.getTrialActorEntranceEnemyProgress(),mageProgress:this.getTrialActorEntranceMageProgress()}}getLatestBoardAnimationEndsAtSecForDebug(){return this.latestBoardAnimationEndsAtSec}getTrialWalkingMonsterIds(){var e;return this.phase!=="IDLE"?[]:((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"||this.trialRuntime==null?[]:this.isTrialActorEntranceActive()?[]:this.trialRuntime.result!=="playing"?[]:this.trialRuntime.monsters.filter(t=>this.isTrialMonsterActivelyWalking(t)).map(t=>t.monsterId)}isTrialMonsterActivelyWalking(e){return e.hp<=0||(e.defeatAnimationRemainingSec??0)>Yh||(e.iceFreezeRemainingSec??0)>Yh?!1:e.walkSpeed>0}prepareCurrentLevel(){const e=this.run.levelNumber===1?this.run.seed:Jv(this.run.seed,this.run.levelNumber);this.currentLevel=Ex({levelNumber:this.run.levelNumber,difficulty:this.run.difficulty,seed:e}),this.board=kt(this.currentLevel.initialBoard),this.trialRuntime=Ih(this.currentLevel),this.elapsedSec=0,this.transitionTimerSec=0,this.pendingLevelResult=null,this.pendingClearScore=0,this.levelMatchCount=0,this.levelValidSwapCount=0,this.visualCues=[],this.shakeTimerSec=0,this.shakeAmplitudePixels=0,this.latestBoardAnimationTrace=null,this.latestBoardAnimationEndsAtSec=this.animationClockSec,this.resetMatchHintTimer(),this.trialPlayerDefeatSfxEmitted=!1,this.trialTutorial=null,this.tutorialPresentationMode="standard",this.tutorialZoomOutElapsedSec=0,this.floatingTutorialResolveElapsedSec=0,this.floatingTutorialDragStart=null,this.trialActorEntranceElapsedSec=ur,this.trialMageExitElapsedSec=ci}startPreparedLevel(){var e;this.currentLevel==null&&this.prepareCurrentLevel(),this.phase="IDLE",this.elapsedSec=0,this.transitionTimerSec=0,this.resetMatchHintTimer(),this.heroActivationOverlay=null,this.startTrialTutorialIfNeeded(),this.suppressTrialTutorialForNextLevelStart=!1,this.startTrialActorEntranceIfNeeded(),this.captureBoardAnimationTrace(u_(this.board,0)),this.requestSound(R.sounds.levelStart,{category:"level",volume:.35}),this.events.push({type:"levelStarted",levelNumber:this.run.levelNumber,levelType:"TRIAL",seed:((e=this.currentLevel)==null?void 0:e.seed)??this.run.seed})}startTrialTutorialIfNeeded(){if(!this.shouldStartTrialTutorial()||this.currentLevel==null)return;const e=kv(this.board);this.board=e.board,this.trialRuntime=SM(this.currentLevel),this.trialTutorial={...e,phase:"active"},this.tutorialPresentationMode="tutorialFullHero",this.tutorialZoomOutElapsedSec=0,this.floatingTutorialResolveElapsedSec=0,this.floatingTutorialDragStart=null}shouldStartTrialTutorial(){return this.options.skipTutorial!==!0&&!this.suppressTrialTutorialForNextLevelStart&&this.options.debugStartLevel==null&&this.run.levelNumber===1}startTrialActorEntranceIfNeeded(){this.trialActorEntranceElapsedSec=0}updateTrialActorEntrance(e){const t=Math.max(0,e);if(!this.isTrialActorEntranceActive())return t;const n=Math.max(0,ur-this.trialActorEntranceElapsedSec),r=Math.min(n,t);return this.trialActorEntranceElapsedSec=Math.min(ur,this.trialActorEntranceElapsedSec+r),Math.max(0,t-r)}isTrialActorEntranceActive(){return this.trialActorEntranceElapsedSec<ur}getTrialActorEntranceEnemyProgress(){return Ir(Lr(this.trialActorEntranceElapsedSec/ic))}getTrialActorEntranceMageProgress(){return Ir(Lr((this.trialActorEntranceElapsedSec-ic)/xm))}getTrialMonsterEntranceXOffset(){var e;return((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"?0:rc*(1-this.getTrialActorEntranceEnemyProgress())}getTrialMageEntranceXOffset(){var e;return((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"?0:-rc*(1-this.getTrialActorEntranceMageProgress())}updateTrialMageExit(e){this.isTrialMageExitActive()&&(this.trialMageExitElapsedSec=Math.min(ci,this.trialMageExitElapsedSec+Math.max(0,e)))}isTrialMageExitActive(){var e;return((e=this.currentLevel)==null?void 0:e.type)==="TRIAL"&&this.pendingLevelResult==="win"&&this.trialMageExitElapsedSec<ci}isLevelResultExitAnimationComplete(){var e;return((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"||this.pendingLevelResult!=="win"||this.trialMageExitElapsedSec>=ci}getTrialMageExitXOffset(){var e;return((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"||this.pendingLevelResult!=="win"?0:rS*this.getTrialMageExitProgress()}getTrialMageExitProgress(){return Ir(Lr(this.trialMageExitElapsedSec/ci))}updateTrialStage(e){var a,o;if(((a=this.currentLevel)==null?void 0:a.type)!=="TRIAL"||this.trialRuntime==null)return;const t=this.trialRuntime.result,n=jx(this.trialRuntime,this.currentLevel,e,{monsterWalkSpeedMultiplier:this.options.oneLifeDoubleSpeed===!0?2:1}),r=n.runtime;this.trialRuntime=r;const s=((o=this.trialTutorial)==null?void 0:o.phase)??null;s==null&&n.scoreDelta>0&&(this.run={...this.run,score:this.run.score+n.scoreDelta},this.events.push({type:"scoreChanged",score:this.run.score}));for(const l of n.damageEvents)this.emitTrialMonsterHitSounds(l);if(this.recordTrialDamageEvents(n.damageEvents),s!=null){s==="resolving"&&r.result==="won"&&this.completeTrialTutorial();return}this.maybeEmitTrialPlayerDefeatSfx(t,r.result),r.result==="won"?this.beginLevelResult("win"):r.result==="lost"&&this.beginLevelResult("loss")}updateTrialVisualTimers(e){var t;((t=this.currentLevel)==null?void 0:t.type)!=="TRIAL"||this.trialRuntime==null||(this.trialRuntime=Jx(this.trialRuntime,e))}completeTrialTutorial(){var e;if(((e=this.currentLevel)==null?void 0:e.type)!=="TRIAL"){this.trialTutorial=null,this.tutorialPresentationMode="standard";return}this.trialRuntime=Ih(this.currentLevel),this.trialTutorial=null,this.elapsedSec=0,this.resetMatchHintTimer(),this.trialPlayerDefeatSfxEmitted=!1,this.startTrialActorEntranceIfNeeded(),this.startTutorialZoomOut()}isTrialTutorialInputLocked(){return this.trialTutorial!=null||this.isTrialActorEntranceActive()}handleTap(e,t){const n={x:e,y:t};if(i_(n)){this.emitUiClick(),this.bgmMuted=!this.bgmMuted;return}if(this.phase==="GAME_OVER"&&ka(n,zl)){this.tryAgain(),this.emitUiClick();return}if(this.phase!=="IDLE"&&this.phase!=="WIN"&&this.phase!=="LOSE")return;const r=Gl(n);if(r==null){if(ka(n,gh)){this.emitUiClick(),this.muted=!this.muted;return}return}this.phase==="IDLE"&&(this.isTrialTutorialInputLocked()||(this.resetMatchHintTimer(),this.handleTrialPowerUpTap(r)))}handleDragStart(e,t){if(!this.isFloatingTutorialInputEnabled()){this.floatingTutorialDragStart=null;return}const n=this.floatingTutorialTileRoleAtPoint({x:e,y:t});this.floatingTutorialDragStart=n==="earth"||n==="lowerLightning"?{x:e,y:t}:null}handleDragEnd(e,t){if(!this.isFloatingTutorialInputEnabled()||this.floatingTutorialDragStart==null){this.floatingTutorialDragStart=null;return}const n=this.floatingTutorialTileRoleAtPoint(this.floatingTutorialDragStart),r=this.floatingTutorialTileRoleAtPoint({x:e,y:t});this.floatingTutorialDragStart=null,qS(n,r)&&this.activateFloatingTutorialSwap()}activateFloatingTutorialSwap(){if(this.trialTutorial==null||this.trialTutorial.phase!=="active")return;const e=this.trialTutorial.allowedSwap;this.resetMatchHintTimer(),this.handleTrialTutorialSwap(e.from,e.to)}startTutorialZoomOut(){this.tutorialPresentationMode="tutorialZoomOut",this.tutorialZoomOutElapsedSec=0,this.floatingTutorialResolveElapsedSec=0,this.floatingTutorialDragStart=null}updateTutorialPresentation(e){var t;((t=this.trialTutorial)==null?void 0:t.phase)==="resolving"&&(this.floatingTutorialResolveElapsedSec+=e),this.tutorialPresentationMode==="tutorialZoomOut"&&(this.tutorialZoomOutElapsedSec+=e,this.tutorialZoomOutElapsedSec>=ui&&(this.tutorialPresentationMode="standard",this.tutorialZoomOutElapsedSec=ui))}tryAgain(){this.reset(this.debugSeed??Po())}beginLevelResult(e){this.pendingLevelResult!=null||this.currentLevel==null||(this.resetMatchHintTimer(),this.pendingLevelResult=e,this.transitionTimerSec=0,this.phase=e==="win"?"WIN":"LOSE",this.pendingClearScore=e==="win"?this.getLevelClearScore():0,this.trialMageExitElapsedSec=e==="win"?0:ci,this.events.push({type:"levelEnded",levelNumber:this.run.levelNumber,levelType:"TRIAL",result:e}))}advanceAfterLevelResult(){if(this.pendingLevelResult!=null){if(this.pendingLevelResult==="win"){this.run=Qv(this.run,this.pendingClearScore),this.requestSound(R.sounds.levelUp,{category:"level",volume:.58}),this.pendingClearScore>0&&this.events.push({type:"scoreChanged",score:this.run.score}),this.prepareCurrentLevel(),this.startPreparedLevel();return}if(this.run=eS(this.run),this.run.lives<=0){this.finalScore=this.run.score,this.gameOverElapsedSec=0,this.gameOverStats={koboldsDefeated:this.runKoboldsDefeated,levelsCompleted:this.run.levelsCleared,matchesCompleted:this.runMatchesCompleted,powerUpsUsed:this.runPowerUpsUsed,score:this.run.score},this.phase="GAME_OVER",this.pendingLevelResult=null,this.transitionTimerSec=0,this.requestSound(R.sounds.runEnd,{category:"run",volume:.58}),this.events.push({type:"runEnded",finalScore:this.run.score,levelsCleared:this.run.levelsCleared});return}this.prepareCurrentLevel(),this.run.levelNumber===1&&(this.suppressTrialTutorialForNextLevelStart=!0),this.startPreparedLevel()}}handleSwap(e,t){if(this.phase==="IDLE"&&!this.isTrialActorEntranceActive()){if(this.trialTutorial!=null){if(this.tutorialPresentationMode==="tutorialFullHero"||this.trialTutorial.phase!=="active"||!Hv(this.trialTutorial,e,t))return;this.resetMatchHintTimer(),this.handleTrialTutorialSwap(e,t);return}this.resetMatchHintTimer(),this.trialRuntime!=null&&this.handleTrialSwap(e,t)}}handleTrialSwap(e,t){var l,c;if(((l=this.currentLevel)==null?void 0:l.type)!=="TRIAL"||this.trialRuntime==null)return;const n=this.trialRuntime.result,r=this.peekTrialSwapPowerUpType(e,t),s=this.peekLightballSwapTargetType(e,t),a=Ch(this.board,this.trialRuntime,this.currentLevel,e,t,this.rng);if(!a.valid){this.captureBoardAnimationTrace(a.animationTrace),((c=a.animationTrace)==null?void 0:c.kind)==="invalidSwap"&&this.requestSound(R.sounds.boardMoveBack,{category:"match",volume:.46});return}this.requestSound(R.sounds.boardMove,{category:"match",volume:.48}),this.board=a.board,this.trialRuntime=a.runtime,this.maybeEmitTrialPlayerDefeatSfx(n,a.runtime.result),this.levelMatchCount+=a.scoringStats.matchCount,this.levelValidSwapCount+=a.scoringStats.validSwapCount,this.runMatchesCompleted+=a.scoringStats.matchCount,this.runPowerUpsUsed+=a.powerUpsUsed,this.captureBoardAnimationTrace(a.animationTrace),this.emitPowerUpActivationSound(r),this.triggerHeroActivationOverlay(s),this.emitMatchAudioAndJuice(a.scoringStats,t),this.emitTrialAudioAndJuice(a.queuedAttackEvents,t);const o=a.scoreDelta+bh(a.scoringStats);o>0&&(this.run={...this.run,score:this.run.score+o},this.events.push({type:"scoreChanged",score:this.run.score}));for(const u of a.damageEvents)this.emitTrialMonsterHitSounds(u);this.recordTrialDamageEvents(a.damageEvents),a.runtime.result==="won"?this.beginLevelResult("win"):a.runtime.result==="lost"&&this.beginLevelResult("loss")}handleTrialTutorialSwap(e,t){var r;if(((r=this.currentLevel)==null?void 0:r.type)!=="TRIAL"||this.trialRuntime==null||this.trialTutorial==null||this.trialTutorial.phase!=="active")return;const n=Ch(this.board,this.trialRuntime,this.currentLevel,e,t,this.rng);if(n.valid){this.requestSound(R.sounds.boardMove,{category:"match",volume:.48}),this.board=n.board,this.trialRuntime=n.runtime,this.trialTutorial={...this.trialTutorial,phase:"resolving"},this.floatingTutorialResolveElapsedSec=0,this.captureBoardAnimationTrace(n.animationTrace),this.runMatchesCompleted+=n.scoringStats.matchCount,this.runPowerUpsUsed+=n.powerUpsUsed,this.emitMatchAudioAndJuice(n.scoringStats,t),this.emitTrialAudioAndJuice(n.queuedAttackEvents,t);for(const s of n.damageEvents)this.emitTrialMonsterHitSounds(s);this.recordTrialDamageEvents(n.damageEvents)}}handleTrialPowerUpTap(e){var o,l,c;if(((o=this.currentLevel)==null?void 0:o.type)!=="TRIAL"||this.trialRuntime==null)return;const t=this.trialRuntime.result,n=(c=(l=bt(this.board,e))==null?void 0:l.tile)==null?void 0:c.type,r=n==="LIGHTBALL"?kp(this.board,e):null,s=Qx(this.board,this.trialRuntime,this.currentLevel,e,this.rng);if(!s.valid)return;this.board=s.board,this.trialRuntime=s.runtime,this.maybeEmitTrialPlayerDefeatSfx(t,s.runtime.result),this.levelMatchCount+=s.scoringStats.matchCount,this.levelValidSwapCount+=s.scoringStats.validSwapCount,this.runMatchesCompleted+=s.scoringStats.matchCount,this.runPowerUpsUsed+=s.powerUpsUsed,this.captureBoardAnimationTrace(s.animationTrace),this.emitPowerUpActivationSound(n),this.triggerHeroActivationOverlay(r),this.emitMatchAudioAndJuice(s.scoringStats,e),this.emitTrialAudioAndJuice(s.queuedAttackEvents,e);const a=s.scoreDelta+bh(s.scoringStats);a>0&&(this.run={...this.run,score:this.run.score+a},this.events.push({type:"scoreChanged",score:this.run.score}));for(const u of s.damageEvents)this.emitTrialMonsterHitSounds(u);this.recordTrialDamageEvents(s.damageEvents),s.runtime.result==="won"?this.beginLevelResult("win"):s.runtime.result==="lost"&&this.beginLevelResult("loss")}getLevelClearScore(){return Ox(this.run.difficulty,this.levelMatchCount,this.elapsedSec)}captureBoardAnimationTrace(e){const t=d_(e,this.nextBoardAnimationRevision);t!=null&&(this.latestBoardAnimationTrace=t,this.latestBoardAnimationEndsAtSec=this.animationClockSec+Up(t)/1e3,this.nextBoardAnimationRevision+=1)}hasLatestBoardAnimationFinished(){return this.animationClockSec>=this.latestBoardAnimationEndsAtSec}peekTrialSwapPowerUpType(e,t){var s,a;const n=(s=bt(this.board,e))==null?void 0:s.tile,r=(a=bt(this.board,t))==null?void 0:a.tile;return n!=null&&bi(n.type)?n.type:r!=null&&bi(r.type)?r.type:null}peekLightballSwapTargetType(e,t){var s,a,o,l;const n=(a=(s=bt(this.board,e))==null?void 0:s.tile)==null?void 0:a.type,r=(l=(o=bt(this.board,t))==null?void 0:o.tile)==null?void 0:l.type;return n==="LIGHTBALL"&&r!=null&&ii(r)?r:r==="LIGHTBALL"&&n!=null&&ii(n)?n:null}emitPowerUpActivationSound(e){e==="TNT"?this.requestSound(R.sounds.powerupBombActivate,{category:"match",volume:.52}):(e==="ROCKET_H"||e==="ROCKET_V")&&this.requestSound(R.sounds.powerupRocketActivate,{category:"match",volume:.52})}requestSound(e,t={}){const n={type:"soundRequested",soundId:e};t.intensity!=null&&(n.intensity=t.intensity),t.volume!=null&&(n.volume=t.volume),t.playbackRate!=null&&(n.playbackRate=t.playbackRate),t.category!=null&&(n.category=t.category),t.delaySec!=null&&(n.delaySec=t.delaySec),this.events.push(n)}emitUiClick(){this.requestSound(R.sounds.uiClick,{category:"ui",volume:.52})}emitMatchAudioAndJuice(e,t){e.matchCount<=0||(this.requestSound(R.sounds.mergeMatch,{category:"match",volume:.52}),this.requestSound(R.sounds.matchCoin,{category:"match",volume:.5}),e.powerUpsCreated>0&&this.addBoardCue("powerPulse",t,.45),this.addBoardCue("matchFlash",t,.3),this.triggerBoardShake(e.matchCount+e.powerUpsCreated))}emitTrialAudioAndJuice(e,t){for(const n of e.slice(0,8)){const r=jS(n.schoolId);this.requestSound(r.whoosh,{category:"spell",volume:.34,delaySec:n.castActivationDelaySec}),this.addBoardCue("damagePopup",t,.45,`-${Math.round(n.damage)}`)}}emitTrialMonsterHitSounds(e){e.damage<=0||(this.requestSound(R.sounds.monsterDamage,{category:"enemy",volume:1,delaySec:e.impactDelaySec}),e.defeated&&this.requestSound(R.sounds.monsterDefeat,{category:"enemy",volume:.62,delaySec:e.impactDelaySec}))}recordTrialDamageEvents(e){this.runKoboldsDefeated+=e.filter(t=>t.defeated).length}maybeEmitTrialPlayerDefeatSfx(e,t){var n;((n=this.currentLevel)==null?void 0:n.type)==="TRIAL"&&(e!=="playing"||t!=="lost"||this.trialPlayerDefeatSfxEmitted||(this.trialPlayerDefeatSfxEmitted=!0,this.requestSound(R.sounds.playerDamage,{category:"level",volume:.5}),this.requestSound(R.sounds.playerDefeat,{category:"level",volume:.58,delaySec:_S})))}addBoardCue(e,t,n,r){this.visualCues.push({kind:e,coord:t,text:r,durationSec:n,remainingSec:n})}triggerBoardShake(e){this.shakeTimerSec=Math.max(this.shakeTimerSec,.16),this.shakeAmplitudePixels=Math.min(xh,Math.max(Do,Do+e*1.4))}updateBoardJuice(e){e<=0||(this.shakeTimerSec=Math.max(0,this.shakeTimerSec-e),this.shakeTimerSec<=0&&(this.shakeAmplitudePixels=0),this.visualCues=this.visualCues.map(t=>({...t,remainingSec:t.remainingSec-e})).filter(t=>t.remainingSec>0))}triggerHeroActivationOverlay(e){const t=$S(e);t!=null&&(this.heroActivationOverlay={assetId:t,elapsedSec:0})}updateHeroActivationOverlay(e){if(this.heroActivationOverlay==null||e<=0)return;const t=this.heroActivationOverlay.elapsedSec+e;this.heroActivationOverlay=t>=Vo?null:{...this.heroActivationOverlay,elapsedSec:t}}getHeroActivationOverlayVisualState(e){if(this.heroActivationOverlay==null)return null;const t=(ke-hi)/2,n=(e-ra)/2,r=this.heroActivationOverlay.elapsedSec;let s=t;if(r<zi){const a=r/zi;s=-hi+(t+hi)*Ir(a)}else if(r>Vo-zi){const a=Vo-zi,o=(r-a)/zi;s=t+(ke-t)*nd(o)}return{assetId:this.heroActivationOverlay.assetId,x:s,y:n,width:hi,height:ra,alpha:1,zIndex:BS}}getTransitionImageOverlayVisualState(){const e=WS(this.phase,this.run.levelNumber,this.run.lives);if(e==null)return null;const t=(ke-hi)/2,n=(Dt-ra)/2,r=Math.max(0,this.transitionTimerSec),s=Va+Mm;let a=t;if(r<Va)a=-hi+(t+hi)*Ir(r/Va);else if(r>s){const o=Math.min(1,(r-s)/Tm);a=t+(ke-t)*nd(o)}return{assetId:e,x:a,y:n,width:hi,height:ra,alpha:1,zIndex:HS}}isLevelResultHoldComplete(){const e=this.phase==="WIN"||this.phase==="LOSE"?kS:Zv;return this.transitionTimerSec>=e}getShakePixels(){return this.shakeTimerSec<=0?0:Math.min(xh,Math.max(Do,this.shakeAmplitudePixels))}getBoardVisualCueState(){return this.visualCues.map(e=>({kind:e.kind,coord:e.coord,text:e.text,value:Math.max(0,Math.min(1,e.remainingSec/e.durationSec))}))}getTutorialPresentationState(){const e=this.getEffectiveTutorialPresentationMode(),t=e!=="standard",n=e!=="standard";return{mode:e,heroHeight:this.getActiveHeroHeight(e),sceneScale:this.getTutorialSceneScale(e),backgroundSceneScale:this.getTutorialBackgroundSceneScale(e),foregroundSceneScale:this.getTutorialSceneScale(e),sceneOffsetX:this.getTutorialSceneOffsetX(e),sceneOffsetY:this.getTutorialSceneOffsetY(e),hideHud:t,hideBoard:n,headline:this.getTutorialHeadlineVisualState(e),floatingMatch:e==="tutorialFullHero"?this.getFloatingTutorialMatchVisualState():null}}getTutorialHeadlineVisualState(e=this.tutorialPresentationMode){return e!=="tutorialFullHero"||this.trialTutorial==null?null:{text:PS,x:0,y:DS,width:ke,height:FS,fontSize:US,minFontSize:NS,fontWeight:"bold",color:"#ffffff",strokeColor:"#000000",strokeWidth:OS,align:"center"}}getActiveHeroHeight(e=this.tutorialPresentationMode){if(e==="tutorialFullHero")return Bo;if(e!=="tutorialZoomOut")return Dt;const t=Math.max(0,Math.min(1,this.tutorialZoomOutElapsedSec/ui)),n=1-Math.pow(1-t,3);return Bo+(Dt-Bo)*n}getTutorialSceneScale(e=this.tutorialPresentationMode){if(e==="tutorialFullHero")return ko;if(e!=="tutorialZoomOut")return 1;const t=Math.max(0,Math.min(1,this.tutorialZoomOutElapsedSec/ui)),n=1-Math.pow(1-t,3);return ko+(1-ko)*n}getTutorialBackgroundSceneScale(e=this.tutorialPresentationMode){if(e==="tutorialFullHero")return Ho;if(e!=="tutorialZoomOut")return 1;const t=Math.max(0,Math.min(1,this.tutorialZoomOutElapsedSec/ui)),n=1-Math.pow(1-t,3);return Ho+(1-Ho)*n}getTutorialSceneOffsetX(e=this.tutorialPresentationMode){if(e==="tutorialFullHero")return qh;if(e!=="tutorialZoomOut")return 0;const t=Math.max(0,Math.min(1,this.tutorialZoomOutElapsedSec/ui)),n=1-Math.pow(1-t,3);return qh*(1-n)}getTutorialSceneOffsetY(e=this.tutorialPresentationMode){if(e==="tutorialFullHero")return $h;if(e!=="tutorialZoomOut")return 0;const t=Math.max(0,Math.min(1,this.tutorialZoomOutElapsedSec/ui)),n=1-Math.pow(1-t,3);return $h*(1-n)}isFullHeroTutorialPresentationActive(){return this.tutorialPresentationMode==="tutorialFullHero"&&this.trialTutorial!=null}isFloatingTutorialInputEnabled(){var e;return this.tutorialPresentationMode==="tutorialFullHero"&&((e=this.trialTutorial)==null?void 0:e.phase)==="active"&&!this.isTrialActorEntranceActive()}isFloatingTutorialOverlayVisible(){return this.tutorialPresentationMode!=="tutorialFullHero"||this.trialTutorial==null?!1:this.trialTutorial.phase==="active"?!0:this.floatingTutorialResolveElapsedSec<this.getFloatingTutorialMatchAnimationDurationSec()}getFloatingTutorialMatchAnimationDurationSec(){return(Ks+Is)/1e3}getFloatingTutorialMatchVisualState(){var M,T;if(!this.isFloatingTutorialOverlayVisible())return null;const e=bS,t=AS,n=e*3+t*2,r=e*2+t,s=(ke-n)/2,a=Sn-r-wS-RS,o=this.matchHintTimerSec%Di/Di,l=Math.sin(o*Math.PI*2*5),c=(l+1)/2,u=.18+c*.32,h=Math.max(0,l)*Fp,d=((M=this.trialTutorial)==null?void 0:M.phase)==="resolving"?"resolving":"idle",f=d==="idle",p=(T=this.trialTutorial)==null?void 0:T.allowedSwap,_=(p==null?void 0:p.to)??{col:1,row:0},g=(p==null?void 0:p.from)??{col:1,row:1},m=(w,E,C,v,A,L="none")=>({tileId:`floating-tutorial-${w}`,role:w,tileType:E,assetId:Qh(E),sourceCoord:A,rect:{x:s+C*(e+t),y:a+v*(e+t)-(f&&L==="bounce"?h:0),width:e,height:e},alpha:1,flash:f&&L!=="none"?u:0,scale:f&&L==="pulse"?1+c*.08:1,zIndex:IS+v*3+C}),S=[m("topLeftLightning","LIGHTNING",0,0,{col:_.col-1,row:_.row}),m("earth","FIRE",1,0,_),m("topRightLightning","LIGHTNING",2,0,{col:_.col+1,row:_.row}),m("lowerLightning","LIGHTNING",1,1,g,"bounce")];return{phase:d,tiles:S,fingerHint:f?KS(S,this.matchHintTimerSec):null,allowedDrag:{fromRole:"lowerLightning",toRole:"earth"}}}floatingTutorialTileRoleAtPoint(e){var n;const t=this.getFloatingTutorialMatchVisualState();return t==null?null:((n=t.tiles.find(r=>ka(e,r.rect)))==null?void 0:n.role)??null}resetMatchHintTimer(){this.matchHintTimerSec=0}updateMatchHintTimer(e){this.matchHintTimerSec+=Math.max(0,e)}getMatchHintVisualState(){if(this.phase!=="IDLE"||this.trialTutorial!=null||this.matchHintTimerSec<vh)return null;const e=Di+R_,t=this.matchHintTimerSec-vh,n=Math.floor(t/e),r=t-n*e;if(r>=Di)return null;const s=W_(this.board);if(s.length===0)return null;const a=s[n%s.length];return{flashCells:a.flashCells,movingCell:a.movingCell,direction:a.direction,progress:Math.max(0,Math.min(1,r/Di))}}getTrialTutorialVisualState(){var n;if(this.phase!=="IDLE"||((n=this.trialTutorial)==null?void 0:n.phase)!=="active")return null;const e=this.trialTutorial,t=this.matchHintTimerSec%Di/Di;return{allowedSwap:{from:{...e.allowedSwap.from},to:{...e.allowedSwap.to}},flashCells:e.flashCells.map(r=>({...r})),movingCell:{...e.movingCell},direction:{...e.direction},progress:t,dimmedCells:Xl(this.board).filter(r=>![...e.flashCells,...e.matchCells].some(s=>ZS(s,r)))}}getTrialEnemyCount(){var r;if(((r=this.currentLevel)==null?void 0:r.type)!=="TRIAL"||this.trialRuntime==null)return null;const e=Math.max(0,this.trialRuntime.totalMonsters-this.trialRuntime.nextSpawnIndex),t=this.trialRuntime.monsters.filter(s=>s.hp>0).length,n=e+t;return{defeated:Math.max(0,this.trialRuntime.totalMonsters-n),total:this.trialRuntime.totalMonsters}}getObjectiveText(){return""}getHeroStageBackdropAssetId(){return Kl(this.run.levelNumber)}getHeroWorldObjects(){const e=[Ti("stage-backdrop",mt.backdropForest,{position:{x:0,y:0,z:-.2},scale:{x:1,y:1,z:1},backdropTextureId:this.getHeroStageBackdropAssetId()})];return this.trialRuntime!=null?[...e,...this.getTrialHeroWorldObjects()]:e}getTrialHeroWorldObjects(){var a;if(((a=this.currentLevel)==null?void 0:a.type)!=="TRIAL"||this.trialRuntime==null)return[];const e=this.getTutorialForegroundYOffsetWorld(),t=[Ti("actor-mage",mt.mage,{position:this.getTrialMageRenderPosition(),scale:gm,renderOrder:5,animationId:QS(this.phase),animationPaused:eM(this.phase)}),Ti("trial-fail-line",mt.pathMarker,{position:{x:this.currentLevel.trial.contactX,y:this.currentLevel.trial.laneY,z:-.03},scale:{x:.06,y:1.25,z:.18},renderOrder:1,replication:"localCosmetic",tintHex:"#eb5757",opacity:.6})],n=new Map,r=nM(this.trialRuntime.monsters),s=!this.isTrialActorEntranceActive();for(const o of this.trialRuntime.monsters){const l=eo(em(this.currentLevel,o),tm(o.kind)+(o.visualYOffset??0)),c=dM(o),u=za(l,c.x+this.getTrialMonsterEntranceXOffset(),c.y+e);n.set(o.monsterId,u),t.push(Ti(`trial-monster-${o.monsterId}`,vM(o.kind),{position:u,scale:tM(o.kind),renderOrder:iM(o,r),depthMode:"alwaysOnTop",animationId:rM(o,this.phase),opacity:sM(o),tintHex:lM(o,this.trialRuntime.elapsedMs/1e3),animationPaused:aM(o,this.phase),animationTimeSec:oM(o),visualVariant:o.kind==="miniBoss"?void 0:yM(this.currentLevel.seed,o)}),...uM(o,u,this.trialRuntime.elapsedMs/1e3),...s?cM(o,u):[])}for(const o of this.trialRuntime.impactVfx??[])t.push(...hM(o,n));return t}getTrialMageRenderPosition(){var n;if(((n=this.currentLevel)==null?void 0:n.type)!=="TRIAL")return{x:0,y:0,z:0};const e=eo(nm(this.currentLevel),iS),t=this.isFullHeroTutorialPresentationActive()?za(e,MS,0):e;return za(t,this.getTrialMageEntranceXOffset()+this.getTrialMageExitXOffset(),this.getTutorialForegroundYOffsetWorld())}getTutorialForegroundYOffsetWorld(e=this.tutorialPresentationMode){if(e=this.getEffectiveTutorialPresentationMode(e),e!=="tutorialFullHero"&&e!=="tutorialZoomOut")return 0;const t=e==="tutorialZoomOut"?Math.max(0,Math.min(1,this.tutorialZoomOutElapsedSec/ui)):0,n=1-Math.pow(1-t,3),r=ES*(1-n),s=this.getTutorialSceneScale(e);return-(r/Math.max(.001,s))*Vr}getEffectiveTutorialPresentationMode(e=this.tutorialPresentationMode){return e==="tutorialFullHero"&&!this.isFullHeroTutorialPresentationActive()?"standard":e}}function YS(i,e){return{...i,from:eo(i.from,e),to:eo(i.to,e)}}function KS(i,e){const t=i.find(l=>l.role==="lowerLightning"),n=i.find(l=>l.role==="earth");if(t==null||n==null)return null;const r=Jh(t.rect),s=Jh(n.rect),a=e%jh/jh,o=Ir(a);return{assetId:R.ui.tutorialFinger,point:{x:r.x+(s.x-r.x)*o,y:r.y+(s.y-r.y)*o},width:Zh,height:Zh,rotationDegrees:CS,alpha:1,zIndex:LS}}function Jh(i){return{x:i.x+i.width/2,y:i.y+i.height/2}}function qS(i,e){return i==="lowerLightning"&&e==="earth"||i==="earth"&&e==="lowerLightning"}function Qh(i){switch(i){case"FIRE":return R.tiles.fire;case"ICE":return R.tiles.ice;case"LIGHTNING":return R.tiles.lightning;case"EARTH":return R.tiles.earth;case"ROCKET_H":return R.powerUps.rocketH;case"ROCKET_V":return R.powerUps.rocketV;case"TNT":return R.powerUps.tnt;case"LIGHTBALL":return R.powerUps.lightball}}function $S(i){switch(i){case"EARTH":return R.ui.activateEarth;case"FIRE":return R.ui.activateFire;case"ICE":return R.ui.activateIce;case"LIGHTNING":return R.ui.activateLightning;default:return null}}function jS(i){switch(i){case"fire":return{whoosh:R.sounds.fireWhoosh};case"ice":return{whoosh:R.sounds.iceWhoosh};case"lightning":return{whoosh:R.sounds.lightningWhoosh};case"earth":return{whoosh:R.sounds.earthWhoosh}}}function ZS(i,e){return i!=null&&i.col===e.col&&i.row===e.row}function JS(i){return i==="WIN"?"victory":i==="LOSE"?"fail":"none"}function QS(i){return i==="WIN"?"victory":i==="LOSE"?"stunned":"idle"}function eM(i){return i==="GAME_OVER"?!0:void 0}function tM(i){return i==="miniBoss"?nS:gm}function nM(i){return new Map([...i].sort((e,t)=>e.x-t.x||e.spawnTimeMs-t.spawnTimeMs||e.monsterId.localeCompare(t.monsterId)).map((e,t)=>[e.monsterId,t]))}function iM(i,e){return VS+(e.get(i.monsterId)??0)*zS}function rM(i,e){return(i.defeatAnimationRemainingSec??0)>0||(i.defeatFadeRemainingSec??0)>0?"defeat":e==="LOSE"&&i.hp>0?"victory":"walk"}function sM(i){const e=i.defeatFadeRemainingSec??0,t=i.defeatFadeDurationSec??0;if(!(e<=0||t<=0))return Math.max(0,Math.min(1,e/t))}function aM(i,e){return e==="GAME_OVER"||i.hp>0&&((i.iceFreezeRemainingSec??0)>0||ym(i))?!0:void 0}function oM(i){return i.hp>0&&ym(i)?0:void 0}function ym(i){return i.monsterId.startsWith("tutorial-kobold-")}function lM(i,e){if((i.iceFreezeRemainingSec??0)<=0)return;const t=.5+Math.sin(e*Math.PI*6)*.5;return pM("#38d5ff","#aaf5ff",t*.45)}function cM(i,e){if(i.hp<=0)return[];const t=fM(i);if(t<=0)return[];const n=_M(i.kind),r=xM(i.kind),s=n*W0,a=r*X0,o=e.y+gM(i.kind),l=e.z+sS,c=s*t,u=e.x-n/2+n*G0+c/2;return[Ti(`trial-monster-${i.monsterId}-health-track`,mt.healthBarTrack,{position:{x:e.x,y:o,z:l},scale:{x:n,y:r,z:1},renderOrder:6,replication:"localCosmetic"}),Ti(`trial-monster-${i.monsterId}-health-fill`,mt.healthBarFill,{position:{x:u,y:o,z:l+.01},scale:{x:c,y:a,z:1},renderOrder:7,replication:"localCosmetic",textureCrop:{repeatX:t,repeatY:1,offsetX:0,offsetY:0}})]}function uM(i,e,t){if(!(i.fireBurnStacks??[]).some(l=>(l.activationDelaySec??0)<=0&&l.visualRemainingSec>0)||i.hp<=0)return[];const r=i.kind==="miniBoss",s=r?Wh*lS:Wh,a=r?cS:0,o=r?uS:0;return[Ti(`trial-monster-${i.monsterId}-fire-burn`,mt.fireBurn,{position:{x:e.x+a,y:e.y+hS+o,z:e.z+.12},scale:{x:s,y:s,z:1},renderOrder:dS,replication:"localCosmetic",animationTimeSec:t})]}function hM(i,e){if(i.schoolId!=="earth"||i.activationDelaySec>0||i.remainingSec<=0)return[];const t=e.get(i.targetMonsterId),n=Math.max(0,i.durationSec-i.remainingSec);return[Ti(`trial-${i.vfxId}`,mt.earthImpact,{position:{x:(t==null?void 0:t.x)??i.hitWorldPosition.x,y:i.hitWorldPosition.y+fS,z:i.hitWorldPosition.z+.16},scale:{x:Xh,y:Xh,z:1},renderOrder:pS,replication:"localCosmetic",animationTimeSec:n})]}function dM(i){const e=i.hitShakeRemainingSec??0,t=i.hitShakeDurationSec??0;if(e<=0||t<=0)return{x:0,y:0};const n=1-Math.max(0,Math.min(1,e/t)),r=1-n;return{x:Math.sin(n*Math.PI*8)*mS*r,y:Math.sin(n*Math.PI*5)*gS*r}}function fM(i){if(i.maxHp<=0)return 0;const e=i.healthBarHp??i.hp;return Math.max(0,Math.min(1,e/i.maxHp))}function pM(i,e,t){const n=ed(i),r=ed(e),s=Math.max(0,Math.min(1,t));return mM({r:Math.round(n.r+(r.r-n.r)*s),g:Math.round(n.g+(r.g-n.g)*s),b:Math.round(n.b+(r.b-n.b)*s)})}function ed(i){const e=i.replace("#","");return{r:Number.parseInt(e.slice(0,2),16),g:Number.parseInt(e.slice(2,4),16),b:Number.parseInt(e.slice(4,6),16)}}function mM(i){return`#${zo(i.r)}${zo(i.g)}${zo(i.b)}`}function zo(i){return Math.max(0,Math.min(255,i)).toString(16).padStart(2,"0")}function gM(i){return i==="miniBoss"?oS:aS}function _M(i){return i==="miniBoss"?zh*Sm:zh*vm}function xM(i){return i==="miniBoss"?Gh*Sm:Gh*vm}function vM(i){return i==="miniBoss"?mt.miniBoss:mt.monsterPlaceholder}function SM(i){var s;const e=i.trial.lanes[0],t=((s=i.trial.waveManifest.find(a=>a.kind==="kobold"))==null?void 0:s.maxHp)??Math.max(1,i.trial.baseDamage),n=Math.max(1,Math.floor(t*vS)),r=Array.from({length:xS},(a,o)=>({monsterId:`tutorial-kobold-${o}`,kind:"kobold",laneId:(e==null?void 0:e.laneId)??0,hp:n,maxHp:t,x:SS[o]??2+o*.8,spawnTimeMs:0,walkSpeed:0,scoreValue:0,visualYOffset:dm(o),modelVariant:pu(i.seed,`tutorial-kobold-${o}`),healthBarHp:n}));return{elapsedMs:0,nextSpawnIndex:i.trial.waveManifest.length,monsters:r,projectiles:[],pendingAttacks:[],defeatedMonsterIds:[],totalMonsters:r.length,result:"playing",nextProjectileIndex:0,nextAttackIndex:0,nextBurnIndex:0,nextImpactVfxIndex:0}}function MM(i){return i==="GAME_OVER"?"gameOver":"play"}function td(){return{koboldsDefeated:0,levelsCompleted:0,matchesCompleted:0,powerUpsUsed:0,score:0}}function TM(i){return null}function Ti(i,e,t){return{objectId:i,templateId:e,backdropTextureId:t.backdropTextureId,transform:{position:t.position,rotation:{x:0,y:0,z:0,w:1},scale:t.scale},visible:!0,lifetime:"persistent",replication:t.replication??"sharedGameplay",renderLayer:"heroStage",renderOrder:t.renderOrder,depthMode:t.depthMode,tintHex:t.tintHex,opacity:t.opacity,textureCrop:t.textureCrop,animationId:t.animationId,animationTimeSec:t.animationTimeSec,animationPaused:t.animationPaused,visualVariant:t.visualVariant}}function yM(i,e){const t=e.modelVariant??pu(i,e.monsterId);return{visiblePartIds:[t.headNodeName,t.clubNodeName],hiddenPartIds:[...jl.filter(n=>n!==t.headNodeName),...Zl.filter(n=>n!==t.clubNodeName)]}}function za(i,e,t){return{...i,x:i.x+e,y:i.y+t}}function eo(i,e){return za(i,0,e)}function EM(i){return{x:ke/2+i.x/Vr,y:Dt/2-i.y/Vr}}function Lr(i){return Math.max(0,Math.min(1,i))}function Ir(i){const e=Lr(i);return 1-Math.pow(1-e,3)}function nd(i){const e=Lr(i);return e*e*e}const bM=J.cellSize*.35;function Em(i,e){const t=Math.min(e.width/ke,e.height/Sn),n=ke*t,r=Sn*t,s=e.left+(e.width-n)/2,a=e.top+(e.height-r)/2;return{x:(i.clientX-s)/t,y:(i.clientY-a)/t}}function AM(i){const t=new URLSearchParams(i).get("seed");if(t==null||t.trim()==="")return;const n=Number(t);if(!Number.isFinite(n))return;const r=Math.trunc(n)>>>0;return r===0?void 0:r}function wM(i){const t=new URLSearchParams(i).get("level");if(t==null||t.trim()==="")return;const n=Number(t);if(!Number.isFinite(n))return;const r=Math.trunc(n);return r>=1?r:void 0}function RM(i){return new URLSearchParams(i).has("oneLifeDoubleSpeed")}class IM{constructor(e){Y(this,"commands",[]);Y(this,"dragStartCell",null);Y(this,"dragStartPoint",null);Y(this,"activePointerId",null);Y(this,"dragConsumed",!1);Y(this,"onPointerDown",e=>{var n,r;const t=this.eventToLogicalPoint(e);this.commands.push({type:"dragStart",x:t.x,y:t.y}),this.dragStartPoint=t,this.dragStartCell=Gl(t),this.activePointerId=e.pointerId,this.dragConsumed=!1,(r=(n=this.stageElement).setPointerCapture)==null||r.call(n,e.pointerId)});Y(this,"onPointerMove",e=>{if(this.activePointerId!==e.pointerId||this.dragConsumed)return;const t=this.getThresholdSwap(this.eventToLogicalPoint(e));t!=null&&(e.preventDefault(),this.commands.push({type:"swap",from:t.from,to:t.to}),this.dragConsumed=!0)});Y(this,"onPointerUp",e=>{if(this.activePointerId!==e.pointerId)return;const t=this.eventToLogicalPoint(e);this.commands.push({type:"dragEnd",x:t.x,y:t.y});const n=CM(this.dragStartPoint,t),r=Gl(t);if(!this.dragConsumed){const s=this.getThresholdSwap(t);s!=null&&(this.commands.push({type:"swap",from:s.from,to:s.to}),this.dragConsumed=!0)}if(n&&!this.dragConsumed&&this.commands.push({type:"tap",x:t.x,y:t.y}),this.dragStartCell!=null&&r!=null&&!n&&!this.dragConsumed){const s=r.col-this.dragStartCell.col,a=r.row-this.dragStartCell.row;Math.abs(s)+Math.abs(a)===1&&this.commands.push({type:"swap",from:this.dragStartCell,to:r})}this.finishPointer(e.pointerId)});Y(this,"onPointerCancel",e=>{this.activePointerId===e.pointerId&&this.finishPointer(e.pointerId)});this.stageElement=e,this.stageElement.addEventListener("pointerdown",this.onPointerDown),this.stageElement.addEventListener("pointermove",this.onPointerMove),this.stageElement.addEventListener("pointerup",this.onPointerUp),this.stageElement.addEventListener("pointercancel",this.onPointerCancel)}drainCommands(){const e=this.commands;return this.commands=[],e}dispose(){this.stageElement.removeEventListener("pointerdown",this.onPointerDown),this.stageElement.removeEventListener("pointermove",this.onPointerMove),this.stageElement.removeEventListener("pointerup",this.onPointerUp),this.stageElement.removeEventListener("pointercancel",this.onPointerCancel)}eventToLogicalPoint(e){return Em(e,this.stageElement.getBoundingClientRect())}getThresholdSwap(e){if(this.dragStartCell==null||this.dragStartPoint==null)return null;const t=e.x-this.dragStartPoint.x,n=e.y-this.dragStartPoint.y,r=Math.abs(t),s=Math.abs(n);if(Math.max(r,s)<bM)return null;const a=r>=s?{col:this.dragStartCell.col+Math.sign(t),row:this.dragStartCell.row}:{col:this.dragStartCell.col,row:this.dragStartCell.row+Math.sign(n)};return LM(a)?{from:this.dragStartCell,to:a}:null}finishPointer(e){var t,n;(n=(t=this.stageElement).releasePointerCapture)==null||n.call(t,e),this.dragStartCell=null,this.dragStartPoint=null,this.activePointerId=null,this.dragConsumed=!1}}function CM(i,e){return i==null?!0:Math.hypot(e.x-i.x,e.y-i.y)<16}function LM(i){return i.col>=0&&i.row>=0&&i.col<Ce&&i.row<Ce}const PM="modulepreload",DM=function(i,e){return new URL(i,e).href},id={},FM=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let a=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));r=a(t.map(u=>{if(u=DM(u,n),u in id)return;id[u]=!0;const h=u.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!n)for(let _=o.length-1;_>=0;_--){const g=o[_];if(g.href===u&&(!h||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${d}`))return;const p=document.createElement("link");if(p.rel=h?"stylesheet":PM,h||(p.as="script"),p.crossOrigin="",p.href=u,c&&p.setAttribute("nonce",c),document.head.appendChild(p),h)return new Promise((_,g)=>{p.addEventListener("load",_),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},Go="/assets/audio",bm="Assets/Audio";function Am(i){return`${Go.endsWith("/")?Go:`${Go}/`}${encodeURIComponent(i)}`}const gu={[R.sounds.tileMatch]:Fi(R.sounds.tileMatch,"tile-match","match","global",.52,ht("triangle",420,90),"Primary first-cascade tile match click/pop."),[R.sounds.uiClick]:Ct(R.sounds.uiClick,"Click.ogg","ui","global",.52,ht("triangle",660,45),"HUD and overlay button click; Click.ogg in public/assets/audio."),[R.sounds.levelStart]:Ct(R.sounds.levelStart,"Start.ogg","level","global",.35,ht("triangle",520,120),"Level intro as tiles drop in; Start.ogg in public/assets/audio."),[R.sounds.mergeMatch]:Ct(R.sounds.mergeMatch,"Merge.ogg","match","global",.52,ht("triangle",420,90),"Successful match merge; Merge.ogg in public/assets/audio."),[R.sounds.matchCoin]:Ct(R.sounds.matchCoin,"Coin.ogg","match","global",.5,ht("triangle",880,70),"Score coin on match resolve with merge; Coin.ogg in public/assets/audio."),[R.sounds.boardMove]:Ct(R.sounds.boardMove,"Move.wav","match","global",.48,ht("triangle",380,85),"Tile swap committed; Move.wav in public/assets/audio."),[R.sounds.boardMoveBack]:Ct(R.sounds.boardMoveBack,"MoveBack.wav","match","global",.46,ht("triangle",320,90),"Invalid swap bounce-back; MoveBack.wav in public/assets/audio."),[R.sounds.levelUp]:Ct(R.sounds.levelUp,"LevelUp.wav","level","global",.58,ht("triangle",720,200),"After clearing a level; LevelUp.wav in public/assets/audio."),[R.sounds.enemyWalkLoop]:Ct(R.sounds.enemyWalkLoop,"Walking.ogg","enemy","templateLocal",.34,ht("triangle",260,90),"Trial enemy walk loop; Walking.ogg in public/assets/audio."),[R.sounds.comboPitchStep]:Fi(R.sounds.comboPitchStep,"combo-pitch-step","match","global",.48,ht("triangle",560,85),"Cascade ladder step; browser playbackRate is used for rising pitch."),[R.sounds.fireWhoosh]:Ct(R.sounds.fireWhoosh,"Attack_Fire.ogg","spell","templateLocal",.42,ht("sawtooth",330,120),"Fire spell launch; Attack_Fire.ogg in public/assets/audio."),[R.sounds.iceWhoosh]:Ct(R.sounds.iceWhoosh,"Attack_Freeze.ogg","spell","templateLocal",.38,ht("sine",620,120),"Ice spell launch; Attack_Freeze.ogg in public/assets/audio."),[R.sounds.lightningWhoosh]:Ct(R.sounds.lightningWhoosh,"Attack_Lightning.ogg","spell","templateLocal",.38,ht("square",740,75),"Lightning spell launch; Attack_Lightning.ogg in public/assets/audio."),[R.sounds.earthWhoosh]:Ct(R.sounds.earthWhoosh,"Attack_Earth.ogg","spell","templateLocal",.42,ht("triangle",230,130),"Earth spell launch; Attack_Earth.ogg in public/assets/audio."),[R.sounds.fireImpact]:Fi(R.sounds.fireImpact,"spell-fire-impact","spell","templateLocal",.48,ht("noise",260,110),"Fire spell impact burst at monster target."),[R.sounds.iceImpact]:Fi(R.sounds.iceImpact,"spell-ice-impact","spell","templateLocal",.44,ht("sine",820,110),"Ice spell impact chime at monster target."),[R.sounds.lightningImpact]:Fi(R.sounds.lightningImpact,"spell-lightning-impact","spell","templateLocal",.46,ht("square",980,80),"Lightning spell impact crack at monster target."),[R.sounds.earthImpact]:Fi(R.sounds.earthImpact,"spell-earth-impact","spell","templateLocal",.48,ht("triangle",180,125),"Earth spell impact stomp at monster target."),[R.sounds.monsterDamage]:Ct(R.sounds.monsterDamage,"Hit_Enemy.wav","enemy","templateLocal",.88,ht("noise",180,95),"Monster hit; Hit_Enemy.wav in public/assets/audio."),[R.sounds.monsterDefeat]:Ct(R.sounds.monsterDefeat,"Die_Enemy.ogg","enemy","templateLocal",.54,ht("noise",140,170),"Monster defeat; Die_Enemy.ogg in public/assets/audio."),[R.sounds.playerDamage]:Ct(R.sounds.playerDamage,"Hit_Player.wav","level","global",.46,ht("noise",200,90),"Trial mage struck; Hit_Player.wav in public/assets/audio."),[R.sounds.playerDefeat]:Ct(R.sounds.playerDefeat,"Die_Player.ogg","level","global",.56,ht("noise",160,220),"Trial mage defeated; Die_Player.ogg in public/assets/audio."),[R.sounds.powerupCreate]:Fi(R.sounds.powerupCreate,"powerup-create","match","global",.54,ht("sawtooth",680,150),"Power-up creation sparkle."),[R.sounds.powerupBombActivate]:Ct(R.sounds.powerupBombActivate,"Activarion_Bomb.ogg","match","global",.52,ht("sawtooth",180,200),"TNT tap or swap activation; Activarion_Bomb.ogg in public/assets/audio."),[R.sounds.powerupRocketActivate]:Ct(R.sounds.powerupRocketActivate,"Activation_Star.ogg","match","global",.52,ht("triangle",880,140),"Rocket row/column tap or swap activation; Activation_Star.ogg in public/assets/audio."),[R.sounds.runEnd]:Ct(R.sounds.runEnd,"Game_Over.wav","run","global",.58,ht("sine",220,360),"Game Over sting; Game_Over.wav in public/assets/audio."),[R.sounds.musicBackground]:Ct(R.sounds.musicBackground,"Background.ogg","level","global",.22,ht("sine",196,2e3),"Quiet looping session BGM; Background.ogg in public/assets/audio.")};function xD(i){return gu[i]}function UM(){return Object.values(gu)}const NM=[R.sounds.uiClick,R.sounds.levelStart,R.sounds.mergeMatch,R.sounds.matchCoin,R.sounds.boardMove,R.sounds.boardMoveBack,R.sounds.levelUp,R.sounds.enemyWalkLoop,R.sounds.fireWhoosh,R.sounds.iceWhoosh,R.sounds.lightningWhoosh,R.sounds.earthWhoosh,R.sounds.monsterDamage,R.sounds.monsterDefeat,R.sounds.playerDamage,R.sounds.playerDefeat,R.sounds.powerupBombActivate,R.sounds.powerupRocketActivate,R.sounds.runEnd,R.sounds.musicBackground];function OM(){const i=new Set(NM);return UM().filter(e=>i.has(e.id))}function Ct(i,e,t,n,r,s,a){return{id:i,browserUrl:Am(e),futureMhsPath:`${bm}/${e}`,defaultVolume:r,category:t,scope:n,fallback:s,notes:a}}function Fi(i,e,t,n,r,s,a){return{id:i,browserUrl:Am(`${e}.mp3`),futureMhsPath:`${bm}/${e}.mp3`,defaultVolume:r,category:t,scope:n,fallback:s,notes:a}}function ht(i,e,t){return{waveform:i,frequencyHz:e,durationMs:t,attackMs:6,releaseMs:28}}class BM{constructor(e=!0,t=OM()){Y(this,"audio",null);Y(this,"audioPreloadStarted",!1);Y(this,"unlockRequested",!1);this.enabled=e,this.preloadEntries=t,this.enabled&&FM(async()=>{const{BrowserAudioAdapter:n}=await import("./BrowserAudioAdapter-BeVNO75s.js");return{BrowserAudioAdapter:n}},[],import.meta.url).then(({BrowserAudioAdapter:n})=>{this.audio=new n,this.unlockRequested&&this.unlock()})}get isEnabled(){return this.enabled}unlock(){this.unlockRequested=!0,!(!this.enabled||this.audio==null)&&(this.audio.resume(),!this.audioPreloadStarted&&(this.audioPreloadStarted=!0,this.audio.preload(this.preloadEntries)))}syncState(e){!this.enabled||this.audio==null||(this.audio.setMuted(e.muted),this.audio.setBackgroundMusicMuted(e.bgmMuted),this.audio.syncTrialWalkLoops(e.trialWalkingMonsterIds))}handleEvent(e){e.type!=="soundRequested"||!this.enabled||this.audio==null||this.audio.play(e)}dispose(){var e,t;(e=this.audio)==null||e.stopTrialWalkLoop(),(t=this.audio)==null||t.stopBackgroundMusic()}}class kM{constructor(e){Y(this,"lastTimeMs",0);Y(this,"overlayPrimaryButtonPressed",!1);Y(this,"animationFrameId",null);Y(this,"disposed",!1);Y(this,"tick",e=>{if(this.disposed)return;const t=this.lastTimeMs===0?0:Math.min((e-this.lastTimeMs)/1e3,1/30);this.lastTimeMs=e;const{app:n,input:r,presentation:s,audio:a}=this.options;n.update(t,r.drainCommands()),this.handleEvents(n.drainEvents());const o=this.getBrowserHudState(),l=this.getBrowserScreenState();a.syncState(n.getAudioState()),s.render({boardState:n.getBoardRenderState(),heroWorldState:n.getHeroWorldState(),hudState:o,screenState:l,timeSec:e/1e3,dtSec:t}),this.animationFrameId=requestAnimationFrame(this.tick)});Y(this,"onPointerDown",e=>{this.options.audio.unlock(),this.options.presentation.requestFullscreen(),this.updateOverlayPrimaryButtonPressed(e,!0)});Y(this,"onPointerUp",()=>{this.updateOverlayPrimaryButtonPressed(null,!1)});Y(this,"onPointerCancel",()=>{this.updateOverlayPrimaryButtonPressed(null,!1)});this.options=e;const t=this.options.presentation.gameShell;t.addEventListener("pointerdown",this.onPointerDown,{passive:!0}),t.addEventListener("pointerup",this.onPointerUp,{passive:!0}),t.addEventListener("pointercancel",this.onPointerCancel,{passive:!0})}start(){const e=this.options.app.getBoardRenderState();this.options.presentation.resizeLogicalStage(),this.options.presentation.renderInitial(e,this.options.app.getHeroWorldState(),this.getBrowserHudState(),this.getBrowserScreenState()),this.animationFrameId=requestAnimationFrame(this.tick)}dispose(){if(this.disposed)return;this.disposed=!0,this.animationFrameId!=null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null);const e=this.options.presentation.gameShell;e.removeEventListener("pointerdown",this.onPointerDown),e.removeEventListener("pointerup",this.onPointerUp),e.removeEventListener("pointercancel",this.onPointerCancel),this.options.input.dispose(),this.options.presentation.dispose(),this.options.audio.dispose()}handleEvents(e){for(const t of e)this.options.audio.handleEvent(t),this.options.persistence.handleEvent(t,this.options.app.getRunStateForDebug().seed)}getBrowserHudState(){const e=this.options.app.getHudState();return this.options.audio.isEnabled?e:{...e,muted:!0}}getBrowserScreenState(){const e=this.options.app.getScreenState(this.options.persistence.leaderboardRows,this.options.persistence.highlightedRank);return{...this.options.audio.isEnabled?e:{...e,muted:!0},overlayPrimaryButtonPressed:this.overlayPrimaryButtonPressed}}updateOverlayPrimaryButtonPressed(e,t){if(!t||e==null){this.overlayPrimaryButtonPressed=!1;return}const n=Em(e,this.options.presentation.gameShell.getBoundingClientRect()),r=this.options.app.getScreenState(this.options.persistence.leaderboardRows,this.options.persistence.highlightedRank).phase;this.overlayPrimaryButtonPressed=r==="GAME_OVER"&&ka(n,zl)}}const rd="magus-match.leaderboard.v1";class HM{constructor(e=window.localStorage){this.storage=e}load(){return qv(this.storage.getItem(rd))}save(e){this.storage.setItem(rd,$v(e))}}class VM{constructor(e=new HM){Y(this,"leaderboardRowsInternal");Y(this,"highlightedRankInternal",null);this.leaderboardStore=e,this.leaderboardRowsInternal=this.leaderboardStore.load()}get leaderboardRows(){return this.leaderboardRowsInternal}get highlightedRank(){return this.highlightedRankInternal}handleEvent(e,t,n=Date.now()){if(e.type==="levelStarted"){this.highlightedRankInternal=null;return}if(e.type!=="runEnded")return;const r=Yv(e.finalScore,e.levelsCleared,t,n),s=Wv(this.leaderboardRowsInternal,r);this.leaderboardRowsInternal=s.entries,this.highlightedRankInternal=s.qualifiedRank,this.leaderboardStore.save(this.leaderboardRowsInternal)}}const zM=12,sd=260,GM=24,WM=62,XM=12,YM=2.25,_u=5,KM=120,qM=120,$M=180,jM=70,ZM=14,JM=1,wm=.045,QM=1+(_u-1)*wm,ad=2,od=220,eT=86,tT=7,nT=1,sa=128,ld=4,Rm=8,iT=30,Im=1e3/iT,rT=Rm*Im,aa=405,oa=128,cd=4,sT=8,aT=30,oT=1e3/aT,ud=J.cellSize*.6,hd=192,dd=64,lT=.55,cT=32,uT=160,hT=630,fd=120,pd=720,md=new Map;class dT{constructor(){Y(this,"activeAnimation",null);Y(this,"lastRevisionId",null)}present(e,t,n={}){const r=e.animationTrace??null;if(r!=null&&r.revisionId!==this.lastRevisionId){const a=this.activeAnimation==null||!fT(r)?null:this.sampleActiveAnimation(e,t,n),o=go(r);this.activeAnimation={trace:r,startSec:t,stepTimings:o,durationMs:Up(r),retargetStarts:a==null?new Map:jT(a)},this.lastRevisionId=r.revisionId}if(this.activeAnimation==null)return e;const s=this.sampleActiveAnimation(e,t,n);return this.isAnimationComplete(t)?(this.activeAnimation=null,e):s}sampleActiveAnimation(e,t,n){var _;if(this.activeAnimation==null)return e;const r=Math.max(0,(t-this.activeAnimation.startSec)*1e3),s=this.activeAnimation.trace,a=this.activeAnimation.stepTimings,o=pT(s,a,r,this.activeAnimation.retargetStarts),l=ET(s,a,r),c=gT(s,a,r,n.matchEnergyTarget),u=bT(s,a,r),h=RT(s,a,r),d=AT(s,a,r),f=wT(s,a,r),p=vT(((_=e.tutorialPresentation)==null?void 0:_.floatingMatch)??null,s,a,r,o,n.matchEnergyTarget);return{...e,tutorialPresentation:e.tutorialPresentation==null?void 0:{...e.tutorialPresentation,floatingMatch:p},boardCells:o,boardCellsArePreSorted:s.kind==="levelIntro",particles:l,matchEnergyStreams:c,burstRings:u,lightballStreams:h,tntExplosionSprites:d,rocketCloudSprites:f}}isAnimationComplete(e){return this.activeAnimation==null?!0:Math.max(0,(e-this.activeAnimation.startSec)*1e3)>=this.activeAnimation.durationMs}}function fT(i){return i.kind!=="levelIntro"}function pT(i,e,t,n){if(i.kind==="invalidSwap")return VT(i,t,n);if(i.kind==="levelIntro")return mT(i,e,t);if(t<Ks||e.length===0)return Pm(i,t,n);const r=e.find(s=>t<s.endMs);return r==null?Fm(i.finalSnapshot):t<r.fallStartMs?zT(r.step,t-r.popStartMs):XT(r.step,t-r.fallStartMs,r.endMs-r.fallStartMs,r.fallDelaysByTileId,n,!1)}function mT(i,e,t){const n=e.find(r=>t<r.endMs);return n==null?Fm(i.finalSnapshot):YT(n.step,t-n.fallStartMs,n.endMs-n.fallStartMs,n.fallDelaysByTileId)}function gT(i,e,t,n){if(i.kind==="levelIntro"||i.kind==="invalidSwap")return[];const r=[],s=_T(e,t);if(s<=0)return r;for(const a of e){const o=t-a.popStartMs;if(!(o<0))for(const l of a.step.clearedTiles)r.push(...Lm(l,o,n,void 0,s))}return r}function _T(i,e){const t=xT(i,e);return t<=0?0:Math.min(_u,Math.max(1,Math.ceil(KM/t)))}function xT(i,e){let t=0;for(const n of i){const r=e-n.popStartMs;if(!(r<0))for(const s of n.step.clearedTiles){if(xo(s.tileType)==null)continue;const a=r-(s.clearDelayMs??0);a>=0&&a<=Is&&t++}}return t}function vT(i,e,t,n,r,s){if(i==null||i.phase!=="resolving")return i;const a=MT(i);if(a==null)return i;const o=new Map(e.preSwapSnapshot.cells.map(h=>[Wr(h.coord),h])),l=new Map(r.map(h=>[h.tileId,h])),c=ST(i,t,n),u=i.tiles.map(h=>{const d=o.get(Wr(h.sourceCoord)),f=d==null?null:l.get(d.tileId);if(f==null)return c?{...h,alpha:0}:h;const p=an(f.coord),_=Cm(f.renderX??p.renderX,f.renderY??p.renderY,a);return{...h,rect:{...h.rect,x:_.x,y:_.y},alpha:c?0:h.alpha*f.alpha,scale:h.scale*(f.scale??1)}});return{...i,tiles:u,matchEnergyStreams:yT(i,e,t,n,a,s)}}function ST(i,e,t){const n=new Set(i.tiles.map(r=>Wr(r.sourceCoord)));return e.some(r=>r.step.clearedTiles.some(s=>n.has(Wr(s.coord))&&t>=r.popStartMs+(s.clearDelayMs??0)))}function MT(i){if(i.tiles.length===0)return null;const e=Math.min(...i.tiles.map(a=>a.sourceCoord.col)),t=Math.min(...i.tiles.map(a=>a.sourceCoord.row)),n=i.tiles.find(a=>a.sourceCoord.col===e&&a.sourceCoord.row===t),r=i.tiles.find(a=>a.sourceCoord.col===e+1&&a.sourceCoord.row===t),s=i.tiles.find(a=>a.sourceCoord.col===e+1&&a.sourceCoord.row===t+1);return n==null||r==null||s==null?null:{boardBaseX:J.x+e*J.cellSize,boardBaseY:J.y+t*J.cellSize,floatingBaseX:n.rect.x,floatingBaseY:n.rect.y,floatingStepX:r.rect.x-n.rect.x,floatingStepY:s.rect.y-r.rect.y,floatingTileWidth:n.rect.width,floatingTileHeight:n.rect.height}}function Cm(i,e,t){return{x:t.floatingBaseX+(i-t.boardBaseX)/J.cellSize*t.floatingStepX,y:t.floatingBaseY+(e-t.boardBaseY)/J.cellSize*t.floatingStepY}}function TT(i,e){const t=Cm(an(i).renderX,an(i).renderY,e);return{x:t.x+e.floatingTileWidth/2,y:t.y+e.floatingTileHeight/2}}function yT(i,e,t,n,r,s){if(e.kind==="levelIntro"||e.kind==="invalidSwap")return[];const a=new Set(i.tiles.map(l=>Wr(l.sourceCoord))),o=[];for(const l of t){const c=n-l.popStartMs;if(!(c<0))for(const u of l.step.clearedTiles)a.has(Wr(u.coord))&&o.push(...Lm(u,c,s,TT(u.coord,r)))}return o}function ET(i,e,t){if(i.kind==="levelIntro")return[];const n=e.find(a=>t<a.fallStartMs);if(n==null)return[];const r=t-n.popStartMs;if(r<0)return[];const s=[];for(const a of n.step.clearedTiles)s.push(...DT(a,r));return s}function bT(i,e,t){if(i.kind==="levelIntro")return[];const n=e.find(s=>t<s.fallStartMs);if(n==null)return[];const r=t-n.popStartMs;return r<0?[]:n.step.clearedTiles.filter(s=>Om(s.tileType)!=null).map(s=>FT(s,r)).filter(s=>s!=null)}function AT(i,e,t){if(i.kind==="levelIntro")return[];const n=e.find(s=>t<s.fallStartMs);if(n==null)return[];const r=t-n.popStartMs;return r<0?[]:n.step.clearedTiles.map(s=>UT(s,r)).filter(s=>s!=null)}function wT(i,e,t){if(i.kind==="levelIntro")return[];const n=e.find(s=>t<s.fallStartMs);if(n==null)return[];const r=t-n.popStartMs;return r<0?[]:n.step.clearedTiles.flatMap(s=>NT(s,r))}function RT(i,e,t){if(i.kind==="levelIntro"||i.kind==="invalidSwap")return[];const n=[];for(const r of e){const s=t-r.popStartMs;s<0||n.push(...IT(r.step,s))}return n}function IT(i,e){const t=i.clearedTiles.filter(r=>r.tileType==="LIGHTBALL");if(t.length===0)return[];const n=[];for(const r of t){const s=r.clearDelayMs??0,a=Dm(i,r);for(const o of CT(a,cT)){const l=LT(r,o,e-s);l!=null&&n.push(l)}}return n}function CT(i,e){if(i.length===0)return[];if(i.length<=e)return[...i];const t=[];for(let n=0;n<e;n++){const r=Math.round(n*(i.length-1)/(e-1));t.push(i[r])}return t}function LT(i,e,t){if(t<0||t>=Cs)return null;const n=xo(e.tileType);if(n==null)return null;const r=zr(i.coord),s=zr(e.coord),a=kT(r,s);if(a<=.001)return null;const o=Vt(t/Pp),l=a*o;return l<=.001?null:{streamId:`${i.tileId}-lightball-stream-${e.tileId}`,assetId:R.powerUps.lightballStream,startX:r.x,startY:r.y,length:l,thickness:dd,angleDeg:HT(Math.atan2(s.y-r.y,s.x-r.x)),color:n,alpha:.96,textureOffsetX:t*lT%hd,tileWidth:hd,tileHeight:dd,zIndex:19}}function Lm(i,e,t,n,r=_u){const s=xo(i.tileType);if(s==null)return[];const a=e-(i.clearDelayMs??0);if(a<0||a>Is)return[];const o=Vt(a/Is),l=n??zr(i.coord),c=t??{x:qM,y:$M},u=[];for(let h=0;h<r;h++){const d=Vt(o*QM-h*wm),f=sc(d),p=PT(i.tileId,h),_=p.jitterX*Math.sin(d*Math.PI),g=p.jitterY*Math.sin(d*Math.PI*2),m=Ht(l.x,c.x,f)+p.arc*Math.sin(d*Math.PI)+_,S=Ht(l.y,c.y,f)+g,M=ZM*p.size,T=1-Vt((d-.95)/.05),w=M*T;w<=0||u.push({streamId:`${i.tileId}-energy-${h}`,assetId:R.powerUps.orb,x:m,y:S,radius:w,width:w*2*ad,height:w*2*ad,color:s,alpha:JM,zIndex:23+h/100})}return u}function PT(i,e){const t=`${i}:energy:${e}`,n=md.get(t);if(n!=null)return n;const r=Gi(`${t}:side`)<.5?-1:1,s={arc:Ht(18,jM,Gi(`${t}:arc`))*r,jitterX:Ht(-14,14,Gi(`${t}:x`)),jitterY:Ht(-10,10,Gi(`${t}:y`)),size:.82+Gi(`${t}:size`)*.36};return md.set(t,s),s}function DT(i,e){const t=Om(i.tileType);if(t==null)return[];const n=e-(i.clearDelayMs??0);if(n<0||n>sd)return[];const r=Vt(n/sd),s=J.x+i.coord.col*J.cellSize+J.cellSize/2,a=J.y+i.coord.row*J.cellSize+J.cellSize/2;return Array.from({length:zM},(o,l)=>{const c=Gi(`${i.tileId}:${l}:a`),u=Gi(`${i.tileId}:${l}:b`),h=c*Math.PI*2,d=Ht(GM,WM,u)*ar(r),f=Ht(XM,YM,r);return{particleId:`${i.tileId}-pop-${l}`,x:s+Math.cos(h)*d,y:a+Math.sin(h)*d,radius:f,color:t,alpha:1-r,zIndex:20}})}function FT(i,e){const t=e-(i.clearDelayMs??0);if(t<0||t>od)return null;const n=Vt(t/od),r=ar(n);return{ringId:`${i.tileId}-burst-ring`,x:J.x+i.coord.col*J.cellSize+J.cellSize/2,y:J.y+i.coord.row*J.cellSize+J.cellSize/2,radius:eT*r,lineWidth:Ht(tT,nT,n),color:"rgba(255, 255, 255, 0.85)",alpha:.42*Math.pow(1-n,1.4),zIndex:15}}function UT(i,e){if(i.tileType!=="TNT")return null;const t=e-(i.clearDelayMs??0);if(t<0||t>=rT)return null;const n=Math.min(Rm-1,Math.floor(t/Im)),r=n%ld,s=Math.floor(n/ld),a=zr(i.coord);return{spriteId:`${i.tileId}-tnt-explosion`,assetId:R.spritesheets.tntExplosion,sourceX:r*sa,sourceY:s*sa,sourceWidth:sa,sourceHeight:sa,x:a.x-aa/2,y:a.y-aa/2,width:aa,height:aa,frameIndex:n,alpha:1,zIndex:28}}function NT(i,e){if(i.tileType!=="ROCKET_H"&&i.tileType!=="ROCKET_V")return[];const t=OT(i),n=i.tileType==="ROCKET_H",r=zr(i.coord),s=i.clearDelayMs??0;return t.flatMap(({directionSign:a,maxDistancePx:o})=>{const l=Math.max(1,Math.ceil(o/ud)+1);return Array.from({length:l},(u,h)=>{const d=Math.min(o,h*ud),f=s+d/J.cellSize*cu,p=e-f;if(p<0||p>=Lp)return null;const _=Math.min(sT-1,Math.floor(p/oT)),g=_%cd,m=Math.floor(_/cd),S=r.x+(n?a*d:0),M=r.y+(n?0:a*d);return{spriteId:`${i.tileId}-rocket-cloud-${a}-${h}`,assetId:R.spritesheets.rocketCloud,sourceX:g*oa,sourceY:m*oa,sourceWidth:oa,sourceHeight:oa,x:S-Qn/2,y:M-Qn,width:Qn,height:Qn,originX:S,originY:M,angleDeg:BT(i.tileType,a),frameIndex:_,alpha:1,zIndex:27+h/100}}).filter(u=>u!=null)})}function OT(i){const e=zr(i.coord);return[-1,1].map(t=>{const n=i.tileType==="ROCKET_H"?t<0?e.x-J.x:J.x+J.width-e.x:t<0?e.y-J.y:J.y+J.height-e.y;return{directionSign:t,maxDistancePx:n+Qn}})}function BT(i,e){return i==="ROCKET_V"?e>=0?0:180:e>=0?-90:90}function zr(i){return{x:J.x+i.col*J.cellSize+J.cellSize/2,y:J.y+i.row*J.cellSize+J.cellSize/2}}function kT(i,e){return Math.hypot(e.x-i.x,e.y-i.y)}function HT(i){return i*180/Math.PI}function Pm(i,e,t,n=Ks){const r=Vt(e/n);return i.postSwapSnapshot.cells.map(s=>{const a=an(s.coord),o=t.get(s.tileId),l=i.preSwapSnapshot.cells.find(h=>h.tileId===s.tileId),c=o??(l==null?a:an(l.coord)),u=ar(r);return Gr(s,{renderX:Ht(c.renderX,a.renderX,u),renderY:Ht(c.renderY,a.renderY,u),scale:Ht(c.scale,1,u),alpha:Ht(c.alpha,1,u),zIndex:5})})}function VT(i,e,t){if(e<gs)return Pm(i,e,t,gs);if(e<gs+Yl)return i.postSwapSnapshot.cells.map(a=>Gr(a,{...an(a.coord),scale:1,alpha:1,zIndex:5}));const n=e-gs-Yl,r=Vt(n/Ip),s=ar(r);return i.finalSnapshot.cells.map(a=>{const o=an(a.coord),l=i.postSwapSnapshot.cells.find(u=>u.tileId===a.tileId),c=l==null?o:an(l.coord);return Gr(a,{renderX:Ht(c.renderX,o.renderX,s),renderY:Ht(c.renderY,o.renderY,s),scale:1,alpha:1,zIndex:5})})}function zT(i,e){const t=new Map(i.clearedTiles.map(r=>[r.tileId,r])),n=new Set(i.clearedTiles.filter(r=>r.tileType==="LIGHTBALL"&&Dm(i,r).length>0).map(r=>r.tileId));return i.beforeClearSnapshot.cells.map(r=>Gr(r,t.has(r.tileId)?GT(t.get(r.tileId),e,n.has(r.tileId)):{zIndex:0}))}function GT(i,e,t=!1){if(t)return WT(i,e);const n=Vt((e-(i.clearDelayMs??0))/Cp);return n<=0?{scale:1,alpha:1,zIndex:8}:{scale:1-ar(n),alpha:1-n,zIndex:8}}function WT(i,e){const t=e-(i.clearDelayMs??0);if(t<=0)return{scale:1,alpha:1,rotationDegrees:0,zIndex:20};if(t>=Cs)return{scale:0,alpha:0,rotationDegrees:pd,zIndex:20};const n=Vt(t/uT),r=Ht(1,2,ar(n)),s=Cs-fd,a=Vt((t-s)/fd),o=Ht(r,0,sc(a)),l=Vt(t/hT);return{scale:o,alpha:1,rotationDegrees:pd*sc(l),zIndex:20}}function Dm(i,e){const t=e.clearDelayMs??0;return i.clearedTiles.filter(n=>n.tileId!==e.tileId&&xo(n.tileType)!=null&&(n.clearDelayMs??0)===t+Cs)}function XT(i,e,t,n,r,s){const a=new Set([...i.fallingTiles.map(l=>l.tileId),...i.refillTiles.map(l=>l.tileId)]),o=i.beforeGravitySnapshot.cells.filter(l=>!a.has(l.tileId)).map(l=>Gr(l,{zIndex:0}));for(const l of i.fallingTiles)o.push(gd(l,e,t,n,r,6,s));for(const l of i.refillTiles)o.push(gd(l,e,t,n,r,7,s));return o}function YT(i,e,t,n){const r=[];for(const s of i.refillTiles)r.push(KT(s,e,t,n));return r}function KT(i,e,t,n){const r=Math.max(1,Math.abs(i.to.row-i.from.row)),s=n.get(i.tileId)??0,a=xu(r*au+lu,Ts,Math.min(ou,t)),o=Vt((e-s)/a),l=Um(o),c=an(i.to),u=an({col:i.to.col,row:i.from.row});return{tileId:i.tileId,coord:i.to,assetId:vu(i.tileType),tileType:i.tileType,alpha:o<=0?0:1,renderX:c.renderX,renderY:Ht(u.renderY,c.renderY,l),scale:Nm(o),zIndex:7,isGhost:!0}}function gd(i,e,t,n,r,s,a){const o=Math.max(1,Math.abs(i.to.row-i.from.row)),l=n.get(i.tileId)??0,c=xu(o*au+lu,Ts,Math.min(ou,t)),u=Vt((e-l)/c),h=Um(u),d=an(i.to),f="movementKind"in i&&i.movementKind==="slide",p=f?qT(i,r):$T(i,d,r),_=Nm(u);return{tileId:i.tileId,coord:i.to,assetId:vu(i.tileType),tileType:i.tileType,alpha:(a||i.from.row<0)&&u<=0?0:1,renderX:f?Ht(p.renderX,d.renderX,h):d.renderX,renderY:Ht(p.renderY,d.renderY,h),scale:_,zIndex:s,isGhost:!0}}function qT(i,e){return e.get(i.tileId)??an(i.from)}function $T(i,e,t){const n=an({col:i.to.col,row:i.from.row}),r=t.get(i.tileId);return r==null||Math.abs(r.renderX-e.renderX)>.5?{...n,renderX:e.renderX}:{...r,renderX:e.renderX}}function Fm(i){return i.cells.map(e=>Gr(e,{zIndex:0}))}function Gr(i,e={}){return{tileId:i.tileId,coord:i.coord,assetId:vu(i.tileType),tileType:i.tileType,alpha:e.alpha??1,renderX:e.renderX,renderY:e.renderY,scale:e.scale,rotationDegrees:e.rotationDegrees,zIndex:e.zIndex,isGhost:e.isGhost}}function jT(i){return new Map(i.boardCells.map(e=>{const t=an(e.coord);return[e.tileId,{renderX:e.renderX??t.renderX,renderY:e.renderY??t.renderY,scale:e.scale??1,alpha:e.alpha}]}))}function an(i){return{renderX:J.x+i.col*J.cellSize,renderY:J.y+i.row*J.cellSize,scale:1,alpha:1}}function Um(i){const e=Vt(i),t=.82;if(e<t)return Math.pow(e/t,2.4)*.96;const n=(e-t)/(1-t),r=.96+(1-.96)*ar(n),s=Math.sin(n*Math.PI*2)*.015*(1-n);return Vt(r+s)}function Nm(i){const e=Vt(i);if(e<.72)return 1;const t=(e-.72)/.28;return 1+Math.sin(t*Math.PI*2)*.045*(1-t)}function ar(i){return 1-Math.pow(1-Vt(i),3)}function sc(i){return Math.pow(Vt(i),3)}function Ht(i,e,t){return i+(e-i)*t}function Vt(i){return xu(i,0,1)}function xu(i,e,t){return Math.max(e,Math.min(t,i))}function vu(i){switch(i){case"FIRE":return R.tiles.fire;case"ICE":return R.tiles.ice;case"LIGHTNING":return R.tiles.lightning;case"EARTH":return R.tiles.earth;case"ROCKET_H":return R.powerUps.rocketH;case"ROCKET_V":return R.powerUps.rocketV;case"TNT":return R.powerUps.tnt;case"LIGHTBALL":return R.powerUps.lightball}}function Wr(i){return`${i.col},${i.row}`}function Om(i){switch(i){case"FIRE":return"#eb5757";case"ICE":return"#38d5ff";case"LIGHTNING":return"#f2c94c";case"EARTH":return"#27ae60";case"ROCKET_H":case"ROCKET_V":case"TNT":case"LIGHTBALL":return null}}function xo(i){switch(i){case"FIRE":return"#ff7000";case"ICE":return"#00d8ff";case"LIGHTNING":return"#fff000";case"EARTH":return"#00ff3f";case"ROCKET_H":case"ROCKET_V":case"TNT":case"LIGHTBALL":return null}}function Gi(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967296}class ZT{constructor(e,t,n,r){Y(this,"maskCanvas",null);Y(this,"maskCtx",null);Y(this,"tintedImageCache",new Map);Y(this,"imageFrameCache",new Map);this.ctx=e,this.images=t,this.width=n,this.height=r}setImages(e){this.images=e,this.tintedImageCache.clear(),this.imageFrameCache.clear()}clear(){this.ctx.clearRect(0,0,this.width,this.height)}pushTranslate(e,t){this.ctx.save(),this.ctx.translate(e,t)}pushScale(e,t,n=0,r=0){this.ctx.save(),this.ctx.translate(n,r),this.ctx.scale(e,t),this.ctx.translate(-n,-r)}pushRotate(e,t=0,n=0){this.ctx.save(),this.ctx.translate(t,n),this.ctx.rotate(e*Math.PI/180),this.ctx.translate(-t,-n)}pushAlpha(e){this.ctx.save(),this.ctx.globalAlpha*=Math.max(0,Math.min(1,e))}pushClipRect(e,t,n,r){this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(e,t,n,r),this.ctx.clip()}pop(){this.ctx.restore()}drawRect(e,t,n,r,s){this.ctx.fillStyle=e,this.ctx.fillRect(t,n,r,s)}drawEllipse(e,t,n,r,s){this.ctx.fillStyle=e,this.ctx.beginPath(),this.ctx.ellipse(t,n,r,s,0,0,Math.PI*2),this.ctx.fill()}drawRing(e,t,n,r,s,a){this.ctx.strokeStyle=e,this.ctx.lineWidth=a,this.ctx.beginPath(),this.ctx.ellipse(t,n,r,s,0,0,Math.PI*2),this.ctx.stroke()}hasImage(e){return this.images[e.id]!=null}drawImage(e,t,n,r,s){const a=this.images[e.id];a!=null&&this.ctx.drawImage(a,t,n,r,s)}drawTintedImage(e,t,n,r,s,a){const o=this.images[e.id];if(o==null||s<=0||a<=0)return;const l=this.getTintedImageCanvas(e,o,t);l!=null&&this.ctx.drawImage(l,n,r,s,a)}drawImageFrame(e,t,n,r,s,a,o,l,c){const u=this.images[e.id];if(u==null||r<=0||s<=0||l<=0||c<=0)return;const h=this.getImageFrameCanvas(e,u,t,n,r,s);if(h==null){this.ctx.drawImage(u,t,n,r,s,a,o,l,c);return}this.ctx.drawImage(h,a,o,l,c)}drawTintedImageFrame(e,t,n,r,s,a,o,l,c,u){const h=this.images[e.id];if(h==null||s<=0||a<=0||c<=0||u<=0)return;const d=Math.ceil(c),f=Math.ceil(u),p=this.getMaskContext(d,f);p!=null&&(p.clearRect(0,0,d,f),p.globalCompositeOperation="source-over",p.globalAlpha=1,p.drawImage(h,n,r,s,a,0,0,d,f),p.globalCompositeOperation="multiply",p.fillStyle=t,p.fillRect(0,0,d,f),p.globalCompositeOperation="destination-in",p.drawImage(h,n,r,s,a,0,0,d,f),p.globalCompositeOperation="source-over",p.globalAlpha=1,this.ctx.drawImage(p.canvas,0,0,d,f,o,l,c,u))}drawImageAlphaMaskFill(e,t,n,r,s,a,o){const l=this.images[e.id];if(l==null||s<=0||a<=0||o<=0)return;const c=this.getMaskContext(Math.ceil(s),Math.ceil(a));if(c==null)return;const u=Math.ceil(s),h=Math.ceil(a);c.clearRect(0,0,u,h),c.globalCompositeOperation="source-over",c.globalAlpha=1,c.drawImage(l,0,0,u,h),c.globalCompositeOperation="source-in",c.globalAlpha=Math.max(0,Math.min(1,o)),c.fillStyle=t,c.fillRect(0,0,u,h),c.globalAlpha=1,c.globalCompositeOperation="source-over",this.ctx.drawImage(c.canvas,0,0,u,h,n,r,s,a)}drawText(e,t,n,r,s,a){this.ctx.fillStyle=a.color,this.ctx.font=_d(a,a.fontSize);const o=Math.min(a.fontSize,a.minFontSize??a.fontSize);let l=a.fontSize;for(;l>o&&this.ctx.measureText(e).width>r;)l-=1,this.ctx.font=_d(a,l);this.ctx.textAlign=a.align??"left",this.ctx.textBaseline="middle";const c=a.align==="center"?t+r/2:a.align==="right"?t+r:t;a.strokeColor!=null&&(a.strokeWidth??0)>0&&(this.ctx.strokeStyle=a.strokeColor,this.ctx.lineWidth=a.strokeWidth??0,this.ctx.lineJoin="round",this.ctx.strokeText(e,c,n+s/2,r)),this.ctx.fillStyle=a.color,this.ctx.fillText(e,c,n+s/2,r)}getMaskContext(e,t){if(this.maskCanvas==null){if(typeof document>"u")return null;this.maskCanvas=document.createElement("canvas"),this.maskCtx=this.maskCanvas.getContext("2d")}return this.maskCtx==null||this.maskCanvas==null?null:(this.maskCanvas.width<e&&(this.maskCanvas.width=e),this.maskCanvas.height<t&&(this.maskCanvas.height=t),this.maskCtx)}getTintedImageCanvas(e,t,n){const r=`${e.id}|${n}`,s=this.tintedImageCache.get(r);if(s!=null)return s;if(typeof document>"u")return null;const a=Math.max(1,t.naturalWidth||t.width),o=Math.max(1,t.naturalHeight||t.height),l=document.createElement("canvas");l.width=a,l.height=o;const c=l.getContext("2d");return c==null?null:(c.clearRect(0,0,a,o),c.globalCompositeOperation="source-over",c.globalAlpha=1,c.drawImage(t,0,0,a,o),c.globalCompositeOperation="multiply",c.fillStyle=n,c.fillRect(0,0,a,o),c.globalCompositeOperation="destination-in",c.drawImage(t,0,0,a,o),c.globalCompositeOperation="source-over",c.globalAlpha=1,this.tintedImageCache.set(r,l),l)}getImageFrameCanvas(e,t,n,r,s,a){const o=`${e.id}|${n}|${r}|${s}|${a}`,l=this.imageFrameCache.get(o);if(l!=null)return l;if(typeof document>"u")return null;const c=document.createElement("canvas");c.width=s,c.height=a;const u=c.getContext("2d");return u==null?null:(u.clearRect(0,0,s,a),u.drawImage(t,n,r,s,a,0,0,s,a),this.imageFrameCache.set(o,c),c)}}function _d(i,e){return`${i.fontWeight??"normal"} ${e}px ${i.fontFamily??"Inter, Arial, sans-serif"}`}const vo="#ffffff";function xd(i,e,t,n,r,s){i.clear();const a=e.tutorialPresentation;(a==null?void 0:a.hideHud)!==!0&&(ty(i),ny(i,t),sy(i,t,s)),(a==null?void 0:a.hideBoard)!==!0&&oy(i,e),JT(i,e),hy(i,e),dy(i,e),r!=null&&Sy(i,r),(a==null?void 0:a.hideHud)!==!0&&ay(i,t)}function JT(i,e){var n;const t=((n=e.tutorialPresentation)==null?void 0:n.headline)??null;t==null||t.text.length===0||t.width<=0||t.height<=0||i.drawText(t.text,t.x,t.y,t.width,t.height,{fontSize:t.fontSize,minFontSize:t.minFontSize,fontWeight:t.fontWeight,color:t.color,strokeColor:t.strokeColor,strokeWidth:t.strokeWidth,align:t.align})}function QT(i,e){var h;const t=i.tutorialLock??i.matchHint??null,n=new Set((t==null?void 0:t.flashCells.map(rs))??[]),r=new Set(((h=i.tutorialLock)==null?void 0:h.dimmedCells.map(rs))??[]),s=t==null?null:rs(t.movingCell),a=new Map;for(const d of i.visualCues){const f=rs(d.coord);a.set(f,[...a.get(f)??[],d])}const o=[],l=t==null?0:(Math.sin(t.progress*Math.PI*2*5)+1)/2,c=t==null?0:.18+l*.32,u=t==null?{x:0,y:0}:ey(t.direction,t.progress);for(const d of i.boardCells){const f=d.coord,p=rs(f),_=n.has(p),g=n.has(p),m=a.get(p)??[],S=m.reduce((A,L)=>L.kind==="damagePopup"?A:Math.max(A,L.value),0),M=m.some(A=>A.kind==="powerPulse")?1+m.reduce((A,L)=>Math.max(A,L.value),0)*.1:1,T=J.x+f.col*J.cellSize,w=J.y+f.row*J.cellSize,E=s===p,C=(d.renderX??T)+(E?u.x:0),v=(d.renderY??w)+(E?u.y:0);o.push({tileId:d.tileId,coord:f,x:C,y:v,width:J.cellSize,height:J.cellSize,centerX:C+J.cellSize/2,centerY:v+J.cellSize/2,assetId:d.assetId,tileType:d.tileType,fillColor:wy(d.tileType),glyph:Ry(d.tileType),isHinted:_,isDimmed:r.has(p),alpha:d.alpha,scale:d.scale??M,rotationDegrees:d.rotationDegrees??0,flash:Math.max(g?c:0,S*.5),zIndex:(d.zIndex??0)+(E?.5:0)})}return o}function ey(i,e){const t=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.sin(t*Math.PI*2*3))*Fp;return{x:i.col*n,y:i.row*n}}function ty(i){const e={id:R.ui.hudBanner};i.hasImage(e)&&i.drawImage(e,0,Br,ke,Mn),i.drawRect("#1f1830",0,Dt+Mn,ke,Sn-Dt-Mn)}function ny(i,e){const t={id:R.ui.levelTitlePanel};i.hasImage(t)?i.drawImage(t,Hl,Co,Qi,Io):i.drawRect("rgba(36, 24, 50, 0.92)",Hl,Co,Qi,Io),i.drawText(e.levelText,M0,Co,T0,Io,{fontSize:38,minFontSize:22,fontWeight:"bold",color:vo,align:"center"})}function iy(i,e,t){const n={id:R.ui.heartFill},r={id:R.ui.heartEmpty},s=Br+(Mn-Ki)/2;for(let a=0;a<C0;a++){const o=U0+a*(na+D0),l=o+na/2,c=s+Ki/2,u=t!=null&&t.slotIndex===a&&t.progress01<1,d=a<e.lives||u?n:r;if(i.hasImage(d))if(u&&t!=null){const f=t.progress01,p=Math.sin(f*Math.PI*2*5)*(1-f)*(1-f)*16;i.pushRotate(p,l,c),i.drawImage(d,o,s,na,Ki),i.pop()}else i.drawImage(d,o,s,na,Ki)}}function ry(i,e){const t={id:R.ui.trialFillBarKoboldIcon};i.hasImage(t)&&i.drawImage(t,Sp,K0,vp,nu),i.drawText(":",Mp,Br,Tp,Mn,{fontSize:ph,minFontSize:mh,fontWeight:"bold",color:mp,align:"center"}),i.drawText(`${Math.max(0,e.defeated)}/${Math.max(0,e.total)}`,yp,Br,j0,Mn,{fontSize:ph,minFontSize:mh,fontWeight:"normal",color:vo,align:"left"})}function vd(i,e,t){const n=fp,r=pp,s=N0,a=e+n+r;i.drawText("Score",0,e,ke,n,{fontSize:O0,minFontSize:B0,fontWeight:"bold",color:mp,align:"center"}),i.drawText(t,0,a,ke,s,{fontSize:gp,minFontSize:_p,fontWeight:"normal",color:vo,align:"center"})}function sy(i,e,t){const n=Br;if(iy(i,e,t),e.trialEnemyCount!=null){vd(i,n,e.scoreText),ry(i,e.trialEnemyCount);return}if(vd(i,n,e.scoreText),e.objectiveText.length>0){const r=Z0();i.drawText(e.objectiveText,r.x,n,r.width,Mn,{fontSize:28,minFontSize:18,fontWeight:"bold",color:vo,align:"right"})}}function ay(i,e){const t=iu,n=t.x+t.width/2,r=t.y+t.height/2,s=t.width/2;e.bgmMuted?(i.drawEllipse("#5a5468",n,r,s,s),i.drawEllipse("#2c2638",n,r,s-7,s-7),i.drawText("♪",t.x,t.y,t.width,t.height,{fontSize:36,fontWeight:"bold",color:"rgba(200, 192, 220, 0.42)",align:"center"})):(i.drawEllipse("#d4b96a",n,r,s,s),i.drawEllipse("#3d2658",n,r,s-8,s-8),i.drawText("♪",t.x,t.y,t.width,t.height,{fontSize:40,fontWeight:"bold",color:"#f5e9c9",align:"center"}))}function oy(i,e,t){const n=e.shakePixels;i.pushTranslate(n,0),ly(i);const r=QT(e),s=e.boardCellsArePreSorted===!0?r:r.sort((l,c)=>l.zIndex-c.zIndex||l.coord.row-c.coord.row||l.coord.col-c.coord.col);i.pushClipRect(J.x,J.y,J.width,J.height);for(const l of e.emptyCells??[])cy(i,l.coord,l.assetId);const a=s.filter(Sd),o=s.filter(l=>!Sd(l));for(const l of o)Md(i,l);my(i,e);for(const l of a)Md(i,l);gy(i,e),_y(i,e),xy(i,e),fy(i,e),i.pop(),py(i,e),uy(i),vy(i,e),i.pop()}function Sd(i){return i.tileType==="LIGHTBALL"&&i.zIndex>=20}function ly(i){const e={id:R.ui.boardBackground};if(i.hasImage(e)){i.drawImage(e,J.x,J.y,J.width,J.height);return}i.drawRect("#302340",J.x,J.y,J.width,J.height)}function cy(i,e,t){const n=J.x+e.col*J.cellSize,r=J.y+e.row*J.cellSize,s={id:t};i.hasImage(s)&&i.drawImage(s,n,r,J.cellSize,J.cellSize)}function uy(i){i.drawRect("#c8a24b",J.x-8,J.y-8,J.width+16,8),i.drawRect("#c8a24b",J.x-8,J.y+J.height,J.width+16,8),i.drawRect("#c8a24b",J.x-8,J.y,8,J.height),i.drawRect("#c8a24b",J.x+J.width,J.y,8,J.height)}function Md(i,e){const n=e.width-16,r=e.height-16,s=n*e.scale,a=r*e.scale,o=e.centerX-s/2,l=e.centerY-a/2,c=Math.abs(e.rotationDegrees)>.001;if(e.alpha<=0)return;const u=e.alpha<1;u&&i.pushAlpha(e.alpha);const h={id:e.assetId};if(!i.hasImage(h)){u&&i.pop();return}c&&i.pushRotate(e.rotationDegrees,e.centerX,e.centerY),i.drawImage(h,o,l,s,a),e.isDimmed&&i.drawImageAlphaMaskFill(h,"#000000",o,l,s,a,.62),e.flash>0&&i.drawImageAlphaMaskFill(h,"#ffffff",o,l,s,a,e.flash),c&&i.pop(),u&&i.pop()}function hy(i,e){var s;const t=((s=e.tutorialPresentation)==null?void 0:s.floatingMatch)??null;if(t==null)return;const n=[...t.tiles].sort((a,o)=>a.zIndex-o.zIndex);for(const a of n){if(a.alpha<=0||a.scale<=0)continue;const o={id:a.assetId};if(!i.hasImage(o))continue;const l=8,c=(a.rect.width-l*2)*a.scale,u=(a.rect.height-l*2)*a.scale,h=a.rect.x+a.rect.width/2,d=a.rect.y+a.rect.height/2,f=h-c/2,p=d-u/2;i.pushAlpha(a.alpha),i.drawImage(o,f,p,c,u),a.flash>0&&i.drawImageAlphaMaskFill(o,"#ffffff",f,p,c,u,a.flash),i.pop()}const r=t.fingerHint;if(r!=null&&r.alpha>0&&r.width>0&&r.height>0){const a={id:r.assetId};i.hasImage(a)&&(i.pushAlpha(r.alpha),i.pushRotate(r.rotationDegrees,r.point.x,r.point.y),i.drawImage(a,r.point.x-r.width/2,r.point.y,r.width,r.height),i.pop(),i.pop())}Bm(i,t.matchEnergyStreams??[])}function dy(i,e){const t=e.heroActivationOverlay;if(t==null||t.alpha<=0||t.width<=0||t.height<=0)return;const n={id:t.assetId};i.hasImage(n)&&(i.pushAlpha(t.alpha),i.drawImage(n,t.x,t.y,t.width,t.height),i.pop())}function fy(i,e){const t=e.particles??[];for(const n of t)n.alpha<=0||n.radius<=0||(i.pushAlpha(n.alpha),i.drawEllipse(n.color,n.x,n.y,n.radius,n.radius),i.pop())}function py(i,e){Bm(i,e.matchEnergyStreams??[])}function Bm(i,e){for(const t of e){if(t.alpha<=0||t.width<=0||t.height<=0)continue;const n={id:t.assetId};i.hasImage(n)&&(t.alpha<1&&i.pushAlpha(t.alpha),i.drawTintedImage(n,t.color,t.x-t.width/2,t.y-t.height/2,t.width,t.height),t.alpha<1&&i.pop())}}function my(i,e){const t=e.lightballStreams??[];for(const n of t){if(n.alpha<=0||n.length<=0||n.thickness<=0||n.tileWidth<=0||n.tileHeight<=0)continue;const r={id:n.assetId};if(!i.hasImage(r))continue;i.pushAlpha(n.alpha),i.pushRotate(n.angleDeg,n.startX,n.startY),i.pushClipRect(n.startX,n.startY-n.thickness/2,n.length,n.thickness);const s=(n.textureOffsetX%n.tileWidth+n.tileWidth)%n.tileWidth;for(let a=n.startX-n.tileWidth+s;a<n.startX+n.length;a+=n.tileWidth)i.drawTintedImage(r,n.color,a,n.startY-n.tileHeight/2,n.tileWidth,n.tileHeight);i.pop(),i.pop(),i.pop()}}function gy(i,e){const t=[...e.tntExplosionSprites??[]].sort((n,r)=>n.zIndex-r.zIndex);for(const n of t){if(n.alpha<=0||n.width<=0||n.height<=0)continue;const r={id:n.assetId};i.hasImage(r)&&(i.pushAlpha(n.alpha),i.drawImageFrame(r,n.sourceX,n.sourceY,n.sourceWidth,n.sourceHeight,n.x,n.y,n.width,n.height),i.pop())}}function _y(i,e){const t=[...e.rocketCloudSprites??[]].sort((n,r)=>n.zIndex-r.zIndex);for(const n of t){if(n.alpha<=0||n.width<=0||n.height<=0)continue;const r={id:n.assetId};i.hasImage(r)&&(i.pushAlpha(n.alpha),i.pushRotate(n.angleDeg,n.originX,n.originY),i.drawImageFrame(r,n.sourceX,n.sourceY,n.sourceWidth,n.sourceHeight,n.x,n.y,n.width,n.height),i.pop(),i.pop())}}function xy(i,e){const t=[...e.burstRings??[]].sort((n,r)=>n.zIndex-r.zIndex);for(const n of t)n.alpha<=0||n.radius<=0||n.lineWidth<=0||(i.pushAlpha(n.alpha),i.drawRing(n.color,n.x,n.y,n.radius,n.radius,n.lineWidth),i.pop())}function vy(i,e){for(const t of e.visualCues){if(t.kind!=="damagePopup"||t.text==null)continue;const n=J.x+t.coord.col*J.cellSize,r=J.y+t.coord.row*J.cellSize-(1-t.value)*42;i.drawText(t.text,n,r,J.cellSize,42,{fontSize:30,fontWeight:"bold",color:`rgba(245, 233, 201, ${Math.max(0,t.value).toFixed(3)})`,align:"center"})}}function Sy(i,e){if(e.screen==="gameOver"){Ty(i,e);return}(e.transitionText!=null||e.transitionImageOverlay!=null)&&Ey(i,e)}const My=56;function Xr(i,e,t){const n=Math.min(i,ke-2*My);return{x:(ke-n)/2,y:e,width:n,height:t}}function Ty(i,e){var l;i.drawRect("rgba(20, 14, 32, 0.86)",0,0,ke,Sn);const t=R0(),n={id:R.ui.levelTitlePanel};i.hasImage(n)?i.drawImage(n,t.x,t.y,t.width,t.height):i.drawRect("rgba(36, 24, 50, 0.92)",t.x,t.y,t.width,t.height),i.drawText("GAME OVER",t.x,t.y,t.width,t.height,{fontSize:65,fontWeight:"bold",color:"#f5e9c9",align:"center"}),yy(i,e);const r=Xr(800,570,70),s=(l=e.gameOverMetrics)==null?void 0:l.find(c=>c.label==="Score"),a=s==null?`Score ${e.finalScore}`:s.displayValue==null?"Score":`Score ${s.displayValue}`;i.drawText(a,r.x,r.y,r.width,r.height,{fontSize:42,fontWeight:"bold",color:"#c8a24b",align:"center"});const o=Xr(800,640,54);i.drawText(`High ${e.highScore}`,o.x,o.y,o.width,o.height,{fontSize:30,fontWeight:"bold",color:"#f5e9c9",align:"center"}),Ay(i,e,760,10),by(i,e.buttonRects.tryAgain,"TRY AGAIN",e.overlayPrimaryButtonPressed===!0)}function yy(i,e){const t=(e.gameOverMetrics??[]).filter(u=>u.label!=="Score").slice(0,4),n=Xr(720,330,192),r=n.x+100,s=340,a=160,o=n.x+n.width-a-100,l=42,c=6;for(const[u,h]of t.entries()){const d=n.y+u*(l+c);i.drawText(h.label,r,d,s,l,{fontSize:30,fontWeight:"bold",color:"#c8a24b",align:"left"}),h.displayValue!=null&&i.drawText(`${h.displayValue}`,o,d,a,l,{fontSize:32,fontWeight:"bold",color:"#ffffff",align:"right"})}}function Ey(i,e){if(i.drawRect("rgba(20, 14, 32, 0.55)",0,0,ke,Sn),e.transitionText!=null){const r=Xr(840,800,120);i.drawText(e.transitionText,r.x,r.y,r.width,r.height,{fontSize:70,fontWeight:"bold",color:"#f5e9c9",align:"center"})}const t=e.transitionImageOverlay;if(t==null||t.alpha<=0||t.width<=0||t.height<=0)return;const n={id:t.assetId};i.hasImage(n)&&(i.pushAlpha(t.alpha),i.drawImage(n,t.x,t.y,t.width,t.height),i.pop())}function by(i,e,t,n){const r={id:n?R.ui.primaryButtonPressed:R.ui.primaryButton};i.hasImage(r)?i.drawImage(r,e.x,e.y,e.width,e.height):(i.drawRect("#c8a24b",e.x,e.y,e.width,e.height),i.drawRect("#4b2e83",e.x+8,e.y+8,e.width-16,e.height-16)),i.drawText(t,e.x,e.y,e.width,e.height,{fontSize:44,fontWeight:"bold",color:"#f5e9c9",align:"center"})}function Ay(i,e,t,n){const r=Xr(840,t,56);i.drawText("HALL OF HEROES",r.x,r.y,r.width,r.height,{fontSize:34,fontWeight:"bold",color:"#f5e9c9",align:"center"});const s=e.leaderboardRows.slice(0,n);if(s.length===0){const a=Xr(700,t+74,44);i.drawText("No champions yet",a.x,a.y,a.width,a.height,{fontSize:26,fontWeight:"normal",color:"#c8a24b",align:"center"});return}s.forEach((a,o)=>{const l=t+72+o*52,c=e.highlightedRank===o+1;c&&i.drawRect("rgba(200, 162, 75, 0.35)",r.x,l-3,r.width,46);const u=220,h=25,d=r.x+r.width-h-u,f=r.x+h,p=d-f-20;i.drawText(`${o+1}. ${a.name}`,f,l,p,42,{fontSize:26,fontWeight:c?"bold":"normal",color:"#f5e9c9",align:"left"}),i.drawText(`${a.score}`,d,l,u,42,{fontSize:26,fontWeight:c?"bold":"normal",color:"#c8a24b",align:"right"})})}function wy(i){switch(i){case"FIRE":return"#eb5757";case"ICE":return"#2d9cdb";case"LIGHTNING":return"#f2c94c";case"EARTH":return"#27ae60";case"ROCKET_H":case"ROCKET_V":case"TNT":case"LIGHTBALL":return"#c8a24b"}}function Ry(i){switch(i){case"FIRE":return"F";case"ICE":return"I";case"LIGHTNING":return"L";case"EARTH":return"E";case"ROCKET_H":return"H";case"ROCKET_V":return"V";case"TNT":return"B";case"LIGHTBALL":return"O"}}function rs(i){return`${i.col},${i.row}`}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Su="184",Iy=0,Td=1,Cy=2,Ga=1,Ly=2,xs=3,Ai=0,on=1,Kt=2,ei=0,Ei=1,yd=2,Ed=3,bd=4,Py=5,Wi=100,Dy=101,Fy=102,Uy=103,Ny=104,Oy=200,By=201,ky=202,Hy=203,ac=204,oc=205,Vy=206,zy=207,Gy=208,Wy=209,Xy=210,Yy=211,Ky=212,qy=213,$y=214,lc=0,cc=1,uc=2,Yr=3,hc=4,dc=5,fc=6,pc=7,So=0,jy=1,Zy=2,kn=0,km=1,Hm=2,Vm=3,zm=4,Gm=5,Wm=6,Xm=7,Ad="attached",Jy="detached",Ym=300,er=301,Kr=302,Wa=303,Wo=304,Mo=306,Ps=1e3,rn=1001,mc=1002,qt=1003,Qy=1004,la=1005,Jt=1006,Xo=1007,qi=1008,fn=1009,Km=1010,qm=1011,Ds=1012,Mu=1013,Vn=1014,vn=1015,ri=1016,Tu=1017,yu=1018,Fs=1020,$m=35902,jm=35899,Zm=1021,Jm=1022,pn=1023,si=1026,$i=1027,Eu=1028,bu=1029,tr=1030,Au=1031,wu=1033,Xa=33776,Ya=33777,Ka=33778,qa=33779,gc=35840,_c=35841,xc=35842,vc=35843,Sc=36196,Mc=37492,Tc=37496,yc=37488,Ec=37489,to=37490,bc=37491,Ac=37808,wc=37809,Rc=37810,Ic=37811,Cc=37812,Lc=37813,Pc=37814,Dc=37815,Fc=37816,Uc=37817,Nc=37818,Oc=37819,Bc=37820,kc=37821,Hc=36492,Vc=36494,zc=36495,Gc=36283,Wc=36284,no=36285,Xc=36286,io=2200,Qm=2201,eE=2202,ro=2300,Yc=2301,Yo=2302,wd=2303,Pr=2400,Dr=2401,so=2402,Ru=2500,eg=2501,tE=3200,Us=0,nE=1,Mi="",Qe="srgb",ao="srgb-linear",oo="linear",rt="srgb",hr=7680,Rd=519,iE=512,rE=513,sE=514,Iu=515,aE=516,oE=517,Cu=518,lE=519,Id=35044,Cd="300 es",Bn=2e3,Ns=2001;function cE(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function tg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Os(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function uE(){const i=Os("canvas");return i.style.display="block",i}const Ld={};function Pd(...i){const e="THREE."+i.shift();console.log(e,...i)}function ng(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ae(...i){i=ng(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Pe(...i){i=ng(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Kc(...i){const e=i.join(" ");e in Ld||(Ld[e]=!0,Ae(...i))}function hE(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const dE={[lc]:cc,[uc]:fc,[hc]:pc,[Yr]:dc,[cc]:lc,[fc]:uc,[pc]:hc,[dc]:Yr};class Ri{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Dd=1234567;const ys=Math.PI/180,qr=180/Math.PI;function Ii(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[i&255]+jt[i>>8&255]+jt[i>>16&255]+jt[i>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function Lu(i,e){return(i%e+e)%e}function fE(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function pE(i,e,t){return i!==e?(t-i)/(e-i):0}function Es(i,e,t){return(1-t)*i+t*e}function mE(i,e,t,n){return Es(i,e,1-Math.exp(-t*n))}function gE(i,e=1){return e-Math.abs(Lu(i,e*2)-e)}function _E(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function xE(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function vE(i,e){return i+Math.floor(Math.random()*(e-i+1))}function SE(i,e){return i+Math.random()*(e-i)}function ME(i){return i*(.5-Math.random())}function TE(i){i!==void 0&&(Dd=i);let e=Dd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function yE(i){return i*ys}function EE(i){return i*qr}function bE(i){return(i&i-1)===0&&i!==0}function AE(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function wE(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function RE(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),p=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*p,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*p,o*c);break;case"ZYZ":i.set(l*p,l*f,o*u,o*c);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Cr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function en(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const nn={DEG2RAD:ys,RAD2DEG:qr,generateUUID:Ii,clamp:qe,euclideanModulo:Lu,mapLinear:fE,inverseLerp:pE,lerp:Es,damp:mE,pingpong:gE,smoothstep:_E,smootherstep:xE,randInt:vE,randFloat:SE,randFloatSpread:ME,seededRandom:TE,degToRad:yE,radToDeg:EE,isPowerOfTwo:bE,ceilPowerOfTwo:AE,floorPowerOfTwo:wE,setQuaternionFromProperEuler:RE,normalize:en,denormalize:Cr},Ju=class Ju{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ju.prototype.isVector2=!0;let Ze=Ju;class Pt{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3],d=s[a+0],f=s[a+1],p=s[a+2],_=s[a+3];if(h!==_||l!==d||c!==f||u!==p){let g=l*d+c*f+u*p+h*_;g<0&&(d=-d,f=-f,p=-p,_=-_,g=-g);let m=1-o;if(g<.9995){const S=Math.acos(g),M=Math.sin(S);m=Math.sin(m*S)/M,o=Math.sin(o*S)/M,l=l*m+d*o,c=c*m+f*o,u=u*m+p*o,h=h*m+_*o}else{l=l*m+d*o,c=c*m+f*o,u=u*m+p*o,h=h*m+_*o;const S=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=S,c*=S,u*=S,h*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],d=s[a+1],f=s[a+2],p=s[a+3];return e[t]=o*p+u*h+l*f-c*d,e[t+1]=l*p+u*d+c*h-o*f,e[t+2]=c*p+u*f+o*d-l*h,e[t+3]=u*p-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),d=l(n/2),f=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"YXZ":this._x=d*u*h+c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"ZXY":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h-d*f*p;break;case"ZYX":this._x=d*u*h-c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h+d*f*p;break;case"YZX":this._x=d*u*h+c*f*p,this._y=c*f*h+d*u*p,this._z=c*u*p-d*f*h,this._w=c*u*h-d*f*p;break;case"XZY":this._x=d*u*h-c*f*p,this._y=c*f*h-d*u*p,this._z=c*u*p+d*f*h,this._w=c*u*h+d*f*p;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Qu=class Qu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ko.copy(this).projectOnVector(e),this.sub(Ko)}reflect(e){return this.sub(Ko.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Qu.prototype.isVector3=!0;let F=Qu;const Ko=new F,Fd=new Pt,eh=class eh{constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],p=n[8],_=r[0],g=r[3],m=r[6],S=r[1],M=r[4],T=r[7],w=r[2],E=r[5],C=r[8];return s[0]=a*_+o*S+l*w,s[3]=a*g+o*M+l*E,s[6]=a*m+o*T+l*C,s[1]=c*_+u*S+h*w,s[4]=c*g+u*M+h*E,s[7]=c*m+u*T+h*C,s[2]=d*_+f*S+p*w,s[5]=d*g+f*M+p*E,s[8]=d*m+f*T+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,p=t*h+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=h*_,e[1]=(r*c-u*n)*_,e[2]=(o*n-r*a)*_,e[3]=d*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(qo.makeScale(e,t)),this}rotate(e){return this.premultiply(qo.makeRotation(-e)),this}translate(e,t){return this.premultiply(qo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};eh.prototype.isMatrix3=!0;let Oe=eh;const qo=new Oe,Ud=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nd=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function IE(){const i={enabled:!0,workingColorSpace:ao,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===rt&&(r.r=ti(r.r),r.g=ti(r.g),r.b=ti(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(r.r=Nr(r.r),r.g=Nr(r.g),r.b=Nr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Mi?oo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Kc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Kc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ao]:{primaries:e,whitePoint:n,transfer:oo,toXYZ:Ud,fromXYZ:Nd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:Ud,fromXYZ:Nd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}}),i}const Be=IE();function ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Nr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let dr;class CE{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{dr===void 0&&(dr=Os("canvas")),dr.width=e.width,dr.height=e.height;const r=dr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=dr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Os("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ti(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ti(t[n]/255)*255):t[n]=ti(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let LE=0;class Pu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:LE++}),this.uuid=Ii(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push($o(r[a].image)):s.push($o(r[a]))}else s=$o(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function $o(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?CE.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}let PE=0;const jo=new F;class Ut extends Ri{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=rn,r=rn,s=Jt,a=qi,o=pn,l=fn,c=Ut.DEFAULT_ANISOTROPY,u=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:PE++}),this.uuid=Ii(),this.name="",this.source=new Pu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(jo).x}get height(){return this.source.getSize(jo).y}get depth(){return this.source.getSize(jo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ym)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ps:e.x=e.x-Math.floor(e.x);break;case rn:e.x=e.x<0?0:1;break;case mc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ps:e.y=e.y-Math.floor(e.y);break;case rn:e.y=e.y<0?0:1;break;case mc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Ym;Ut.DEFAULT_ANISOTROPY=1;const th=class th{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,T=(f+1)/2,w=(m+1)/2,E=(u+d)/4,C=(h+_)/4,v=(p+g)/4;return M>T&&M>w?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=E/n,s=C/n):T>w?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=E/r,s=v/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=C/s,r=v/s),this.set(n,r,s,t),this}let S=Math.sqrt((g-p)*(g-p)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(g-p)/S,this.y=(h-_)/S,this.z=(d-u)/S,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};th.prototype.isVector4=!0;let nt=th;class DE extends Ri{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Ut(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Pu(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hn extends DE{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ig extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class FE extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fo=class fo{constructor(e,t,n,r,s,a,o,l,c,u,h,d,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,h,d,f,p,_,g)}set(e,t,n,r,s,a,o,l,c,u,h,d,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fo().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/fr.setFromMatrixColumn(e,0).length(),s=1/fr.setFromMatrixColumn(e,1).length(),a=1/fr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,f=a*h,p=o*u,_=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,p=c*u,_=c*h;t[0]=d+_*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-p,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,p=c*u,_=c*h;t[0]=d-_*o,t[4]=-a*h,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,p=o*u,_=o*h;t[0]=l*u,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*u,t[4]=_-d*h,t[8]=p*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+p,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=a*u,t[9]=f*h-p,t[2]=p*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(UE,e,NE)}lookAt(e,t,n){const r=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),di.crossVectors(n,hn),di.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),di.crossVectors(n,hn)),di.normalize(),ca.crossVectors(hn,di),r[0]=di.x,r[4]=ca.x,r[8]=hn.x,r[1]=di.y,r[5]=ca.y,r[9]=hn.y,r[2]=di.z,r[6]=ca.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],S=n[3],M=n[7],T=n[11],w=n[15],E=r[0],C=r[4],v=r[8],A=r[12],L=r[1],I=r[5],N=r[9],W=r[13],X=r[2],O=r[6],k=r[10],z=r[14],ee=r[3],ne=r[7],ue=r[11],Me=r[15];return s[0]=a*E+o*L+l*X+c*ee,s[4]=a*C+o*I+l*O+c*ne,s[8]=a*v+o*N+l*k+c*ue,s[12]=a*A+o*W+l*z+c*Me,s[1]=u*E+h*L+d*X+f*ee,s[5]=u*C+h*I+d*O+f*ne,s[9]=u*v+h*N+d*k+f*ue,s[13]=u*A+h*W+d*z+f*Me,s[2]=p*E+_*L+g*X+m*ee,s[6]=p*C+_*I+g*O+m*ne,s[10]=p*v+_*N+g*k+m*ue,s[14]=p*A+_*W+g*z+m*Me,s[3]=S*E+M*L+T*X+w*ee,s[7]=S*C+M*I+T*O+w*ne,s[11]=S*v+M*N+T*k+w*ue,s[15]=S*A+M*W+T*z+w*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],S=l*f-c*d,M=o*f-c*h,T=o*d-l*h,w=a*f-c*u,E=a*d-l*u,C=a*h-o*u;return t*(_*S-g*M+m*T)-n*(p*S-g*w+m*E)+r*(p*M-_*w+m*C)-s*(p*T-_*E+g*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],S=t*o-n*a,M=t*l-r*a,T=t*c-s*a,w=n*l-r*o,E=n*c-s*o,C=r*c-s*l,v=u*_-h*p,A=u*g-d*p,L=u*m-f*p,I=h*g-d*_,N=h*m-f*_,W=d*m-f*g,X=S*W-M*N+T*I+w*L-E*A+C*v;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/X;return e[0]=(o*W-l*N+c*I)*O,e[1]=(r*N-n*W-s*I)*O,e[2]=(_*C-g*E+m*w)*O,e[3]=(d*E-h*C-f*w)*O,e[4]=(l*L-a*W-c*A)*O,e[5]=(t*W-r*L+s*A)*O,e[6]=(g*T-p*C-m*M)*O,e[7]=(u*C-d*T+f*M)*O,e[8]=(a*N-o*L+c*v)*O,e[9]=(n*L-t*N-s*v)*O,e[10]=(p*E-_*T+m*S)*O,e[11]=(h*T-u*E-f*S)*O,e[12]=(o*A-a*I-l*v)*O,e[13]=(t*I-n*A+r*v)*O,e[14]=(_*M-p*w-g*S)*O,e[15]=(u*w-h*M+d*S)*O,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,p=s*h,_=a*u,g=a*h,m=o*h,S=l*c,M=l*u,T=l*h,w=n.x,E=n.y,C=n.z;return r[0]=(1-(_+m))*w,r[1]=(f+T)*w,r[2]=(p-M)*w,r[3]=0,r[4]=(f-T)*E,r[5]=(1-(d+m))*E,r[6]=(g+S)*E,r[7]=0,r[8]=(p+M)*C,r[9]=(g-S)*C,r[10]=(1-(d+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=fr.set(r[0],r[1],r[2]).length();const o=fr.set(r[4],r[5],r[6]).length(),l=fr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),yn.copy(this);const c=1/a,u=1/o,h=1/l;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=u,yn.elements[5]*=u,yn.elements[6]*=u,yn.elements[8]*=h,yn.elements[9]*=h,yn.elements[10]*=h,t.setFromRotationMatrix(yn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=Bn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r);let p,_;if(l)p=s/(a-s),_=a*s/(a-s);else if(o===Bn)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Ns)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Bn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r);let p,_;if(l)p=1/(a-s),_=a/(a-s);else if(o===Bn)p=-2/(a-s),_=-(a+s)/(a-s);else if(o===Ns)p=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};fo.prototype.isMatrix4=!0;let be=fo;const fr=new F,yn=new be,UE=new F(0,0,0),NE=new F(1,1,1),di=new F,ca=new F,hn=new F,Od=new be,Bd=new Pt;class Yt{constructor(e=0,t=0,n=0,r=Yt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Od.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Od,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bd.setFromEuler(this),this.setFromQuaternion(Bd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yt.DEFAULT_ORDER="XYZ";class rg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let OE=0;const kd=new F,pr=new Pt,Yn=new be,ua=new F,ss=new F,BE=new F,kE=new Pt,Hd=new F(1,0,0),Vd=new F(0,1,0),zd=new F(0,0,1),Gd={type:"added"},HE={type:"removed"},mr={type:"childadded",child:null},Zo={type:"childremoved",child:null};class gt extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:OE++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gt.DEFAULT_UP.clone();const e=new F,t=new Yt,n=new Pt,r=new F(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new be},normalMatrix:{value:new Oe}}),this.matrix=new be,this.matrixWorld=new be,this.matrixAutoUpdate=gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pr.setFromAxisAngle(e,t),this.quaternion.multiply(pr),this}rotateOnWorldAxis(e,t){return pr.setFromAxisAngle(e,t),this.quaternion.premultiply(pr),this}rotateX(e){return this.rotateOnAxis(Hd,e)}rotateY(e){return this.rotateOnAxis(Vd,e)}rotateZ(e){return this.rotateOnAxis(zd,e)}translateOnAxis(e,t){return kd.copy(e).applyQuaternion(this.quaternion),this.position.add(kd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hd,e)}translateY(e){return this.translateOnAxis(Vd,e)}translateZ(e){return this.translateOnAxis(zd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ua.copy(e):ua.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(ss,ua,this.up):Yn.lookAt(ua,ss,this.up),this.quaternion.setFromRotationMatrix(Yn),r&&(Yn.extractRotation(r.matrixWorld),pr.setFromRotationMatrix(Yn),this.quaternion.premultiply(pr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Pe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gd),mr.child=e,this.dispatchEvent(mr),mr.child=null):Pe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(HE),Zo.child=e,this.dispatchEvent(Zo),Zo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gd),mr.child=e,this.dispatchEvent(mr),mr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,e,BE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,kE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}gt.DEFAULT_UP=new F(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class In extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const VE={type:"move"};class Jo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new In,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new In,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new In,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(VE)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new In;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const sg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},ha={h:0,s:0,l:0};function Qo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Fe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Be.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Be.workingColorSpace){return this.r=e,this.g=t,this.b=n,Be.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Be.workingColorSpace){if(e=Lu(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Qo(a,s,e+1/3),this.g=Qo(a,s,e),this.b=Qo(a,s,e-1/3)}return Be.colorSpaceToWorking(this,r),this}setStyle(e,t=Qe){function n(s){s!==void 0&&parseFloat(s)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qe){const n=sg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=Nr(e.r),this.g=Nr(e.g),this.b=Nr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qe){return Be.workingToColorSpace(Zt.copy(this),e),Math.round(qe(Zt.r*255,0,255))*65536+Math.round(qe(Zt.g*255,0,255))*256+Math.round(qe(Zt.b*255,0,255))}getHexString(e=Qe){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Be.workingColorSpace){Be.workingToColorSpace(Zt.copy(this),t);const n=Zt.r,r=Zt.g,s=Zt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Be.workingColorSpace){return Be.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Qe){Be.workingToColorSpace(Zt.copy(this),e);const t=Zt.r,n=Zt.g,r=Zt.b;return e!==Qe?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(fi),this.setHSL(fi.h+e,fi.s+t,fi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(fi),e.getHSL(ha);const n=Es(fi.h,ha.h,t),r=Es(fi.s,ha.s,t),s=Es(fi.l,ha.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new Fe;Fe.NAMES=sg;class Wd extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yt,this.environmentIntensity=1,this.environmentRotation=new Yt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const En=new F,Kn=new F,el=new F,qn=new F,gr=new F,_r=new F,Xd=new F,tl=new F,nl=new F,il=new F,rl=new nt,sl=new nt,al=new nt;class Rn{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),En.subVectors(e,t),r.cross(En);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){En.subVectors(r,t),Kn.subVectors(n,t),el.subVectors(e,t);const a=En.dot(En),o=En.dot(Kn),l=En.dot(el),c=Kn.dot(Kn),u=Kn.dot(el),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,p=(a*u-o*l)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,qn.x),l.addScaledVector(a,qn.y),l.addScaledVector(o,qn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return rl.setScalar(0),sl.setScalar(0),al.setScalar(0),rl.fromBufferAttribute(e,t),sl.fromBufferAttribute(e,n),al.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(rl,s.x),a.addScaledVector(sl,s.y),a.addScaledVector(al,s.z),a}static isFrontFacing(e,t,n,r){return En.subVectors(n,t),Kn.subVectors(e,t),En.cross(Kn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),En.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Rn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;gr.subVectors(r,n),_r.subVectors(s,n),tl.subVectors(e,n);const l=gr.dot(tl),c=_r.dot(tl);if(l<=0&&c<=0)return t.copy(n);nl.subVectors(e,r);const u=gr.dot(nl),h=_r.dot(nl);if(u>=0&&h<=u)return t.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(gr,a);il.subVectors(e,s);const f=gr.dot(il),p=_r.dot(il);if(p>=0&&f<=p)return t.copy(s);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(_r,o);const g=u*p-f*h;if(g<=0&&h-u>=0&&f-p>=0)return Xd.subVectors(s,r),o=(h-u)/(h-u+(f-p)),t.copy(r).addScaledVector(Xd,o);const m=1/(g+_+d);return a=_*m,o=d*m,t.copy(n).addScaledVector(gr,a).addScaledVector(_r,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class zn{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bn):bn.fromBufferAttribute(s,a),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),da.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),da.copy(n.boundingBox)),da.applyMatrix4(e.matrixWorld),this.union(da)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(as),fa.subVectors(this.max,as),xr.subVectors(e.a,as),vr.subVectors(e.b,as),Sr.subVectors(e.c,as),pi.subVectors(vr,xr),mi.subVectors(Sr,vr),Ui.subVectors(xr,Sr);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-Ui.z,Ui.y,pi.z,0,-pi.x,mi.z,0,-mi.x,Ui.z,0,-Ui.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-Ui.y,Ui.x,0];return!ol(t,xr,vr,Sr,fa)||(t=[1,0,0,0,1,0,0,0,1],!ol(t,xr,vr,Sr,fa))?!1:(pa.crossVectors(pi,mi),t=[pa.x,pa.y,pa.z],ol(t,xr,vr,Sr,fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const $n=[new F,new F,new F,new F,new F,new F,new F,new F],bn=new F,da=new zn,xr=new F,vr=new F,Sr=new F,pi=new F,mi=new F,Ui=new F,as=new F,fa=new F,pa=new F,Ni=new F;function ol(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Ni.fromArray(i,s);const o=r.x*Math.abs(Ni.x)+r.y*Math.abs(Ni.y)+r.z*Math.abs(Ni.z),l=e.dot(Ni),c=t.dot(Ni),u=n.dot(Ni);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Lt=new F,ma=new Ze;let zE=0;class Tn extends Ri{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zE++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Id,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ma.fromBufferAttribute(this,t),ma.applyMatrix3(e),this.setXY(t,ma.x,ma.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Cr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cr(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cr(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cr(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Id&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Du extends Tn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ag extends Tn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Mt extends Tn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const GE=new zn,os=new F,ll=new F;class Ci{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):GE.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;os.subVectors(e,this.center);const t=os.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(os,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ll.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(os.copy(e.center).add(ll)),this.expandByPoint(os.copy(e.center).sub(ll))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let WE=0;const gn=new be,cl=new gt,Mr=new F,dn=new zn,ls=new zn,Wt=new F;class Qt extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:WE++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cE(e)?ag:Du)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Oe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return cl.lookAt(e),cl.updateMatrix(),this.applyMatrix4(cl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Mt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ci);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ls.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(dn.min,ls.min),dn.expandByPoint(Wt),Wt.addVectors(dn.max,ls.max),dn.expandByPoint(Wt)):(dn.expandByPoint(ls.min),dn.expandByPoint(ls.max))}dn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Wt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Wt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Wt.fromBufferAttribute(o,c),l&&(Mr.fromBufferAttribute(e,c),Wt.add(Mr)),r=Math.max(r,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Pe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Pe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new F,l[v]=new F;const c=new F,u=new F,h=new F,d=new Ze,f=new Ze,p=new Ze,_=new F,g=new F;function m(v,A,L){c.fromBufferAttribute(n,v),u.fromBufferAttribute(n,A),h.fromBufferAttribute(n,L),d.fromBufferAttribute(s,v),f.fromBufferAttribute(s,A),p.fromBufferAttribute(s,L),u.sub(c),h.sub(c),f.sub(d),p.sub(d);const I=1/(f.x*p.y-p.x*f.y);isFinite(I)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(h,-f.y).multiplyScalar(I),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(I),o[v].add(_),o[A].add(_),o[L].add(_),l[v].add(g),l[A].add(g),l[L].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,A=S.length;v<A;++v){const L=S[v],I=L.start,N=L.count;for(let W=I,X=I+N;W<X;W+=3)m(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const M=new F,T=new F,w=new F,E=new F;function C(v){w.fromBufferAttribute(r,v),E.copy(w);const A=o[v];M.copy(A),M.sub(w.multiplyScalar(w.dot(A))).normalize(),T.crossVectors(E,A);const I=T.dot(l[v])<0?-1:1;a.setXYZW(v,M.x,M.y,M.z,I)}for(let v=0,A=S.length;v<A;++v){const L=S[v],I=L.start,N=L.count;for(let W=I,X=I+N;W<X;W+=3)C(e.getX(W+0)),C(e.getX(W+1)),C(e.getX(W+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Tn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const r=new F,s=new F,a=new F,o=new F,l=new F,c=new F,u=new F,h=new F;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,p=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let m=0;m<u;m++)d[p++]=c[f++]}return new Tn(d,u,h)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Qt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let XE=0;class Li extends Ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:XE++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=Ei,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ac,this.blendDst=oc,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=Yr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hr,this.stencilZFail=hr,this.stencilZPass=hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==Ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ac&&(n.blendSrc=this.blendSrc),this.blendDst!==oc&&(n.blendDst=this.blendDst),this.blendEquation!==Wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Yr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Rd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const jn=new F,ul=new F,ga=new F,gi=new F,hl=new F,_a=new F,dl=new F;class Fu{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ul.copy(e).add(t).multiplyScalar(.5),ga.copy(t).sub(e).normalize(),gi.copy(this.origin).sub(ul);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ga),o=gi.dot(this.direction),l=-gi.dot(ga),c=gi.lengthSq(),u=Math.abs(1-a*a);let h,d,f,p;if(u>0)if(h=a*l-o,d=a*o-l,p=s*u,h>=0)if(d>=-p)if(d<=p){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-p?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=p?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ul).addScaledVector(ga,d),f}intersectSphere(e,t){jn.subVectors(e.center,this.origin);const n=jn.dot(this.direction),r=jn.dot(jn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,r,s){hl.subVectors(t,e),_a.subVectors(n,e),dl.crossVectors(hl,_a);let a=this.direction.dot(dl),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;gi.subVectors(this.origin,e);const l=o*this.direction.dot(_a.crossVectors(gi,_a));if(l<0)return null;const c=o*this.direction.dot(hl.cross(gi));if(c<0||l+c>a)return null;const u=-o*gi.dot(dl);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ln extends Li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yt,this.combine=So,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Yd=new be,Oi=new Fu,xa=new Ci,Kd=new F,va=new F,Sa=new F,Ma=new F,fl=new F,Ta=new F,qd=new F,ya=new F;class st extends gt{constructor(e=new Qt,t=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ta.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(fl.fromBufferAttribute(h,e),a?Ta.addScaledVector(fl,u):Ta.addScaledVector(fl.sub(t),u))}t.add(Ta)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xa.copy(n.boundingSphere),xa.applyMatrix4(s),Oi.copy(e.ray).recast(e.near),!(xa.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere(xa,Kd)===null||Oi.origin.distanceToSquared(Kd)>(e.far-e.near)**2))&&(Yd.copy(s).invert(),Oi.copy(e.ray).applyMatrix4(Yd),!(n.boundingBox!==null&&Oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Oi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a[g.materialIndex],S=Math.max(g.start,f.start),M=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let T=S,w=M;T<w;T+=3){const E=o.getX(T),C=o.getX(T+1),v=o.getX(T+2);r=Ea(this,m,e,n,c,u,h,E,C,v),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const S=o.getX(g),M=o.getX(g+1),T=o.getX(g+2);r=Ea(this,a,e,n,c,u,h,S,M,T),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a[g.materialIndex],S=Math.max(g.start,f.start),M=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let T=S,w=M;T<w;T+=3){const E=T,C=T+1,v=T+2;r=Ea(this,m,e,n,c,u,h,E,C,v),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const S=g,M=g+1,T=g+2;r=Ea(this,a,e,n,c,u,h,S,M,T),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function YE(i,e,t,n,r,s,a,o){let l;if(e.side===on?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Ai,o),l===null)return null;ya.copy(o),ya.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ya);return c<t.near||c>t.far?null:{distance:c,point:ya.clone(),object:i}}function Ea(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,va),i.getVertexPosition(l,Sa),i.getVertexPosition(c,Ma);const u=YE(i,e,t,n,va,Sa,Ma,qd);if(u){const h=new F;Rn.getBarycoord(qd,va,Sa,Ma,h),r&&(u.uv=Rn.getInterpolatedAttribute(r,o,l,c,h,new Ze)),s&&(u.uv1=Rn.getInterpolatedAttribute(s,o,l,c,h,new Ze)),a&&(u.normal=Rn.getInterpolatedAttribute(a,o,l,c,h,new F),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new F,materialIndex:0};Rn.getNormal(va,Sa,Ma,d.normal),u.face=d,u.barycoord=h}return u}const cs=new nt,$d=new nt,jd=new nt,KE=new nt,Zd=new be,ba=new F,pl=new Ci,Jd=new be,ml=new Fu;class qE extends st{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ad,this.bindMatrix=new be,this.bindMatrixInverse=new be,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new zn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ba),this.boundingBox.expandByPoint(ba)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ci),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ba),this.boundingSphere.expandByPoint(ba)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pl.copy(this.boundingSphere),pl.applyMatrix4(r),e.ray.intersectsSphere(pl)!==!1&&(Jd.copy(r).invert(),ml.copy(e.ray).applyMatrix4(Jd),!(this.boundingBox!==null&&ml.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ml)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new nt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ad?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Jy?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ae("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;$d.fromBufferAttribute(r.attributes.skinIndex,e),jd.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(cs.copy(t),t.set(0,0,0,0)):(cs.set(...t,1),t.set(0,0,0)),cs.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=jd.getComponent(s);if(a!==0){const o=$d.getComponent(s);Zd.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(KE.copy(cs).applyMatrix4(Zd),a)}}return t.isVector4&&(t.w=cs.w),t.applyMatrix4(this.bindMatrixInverse)}}class Bs extends gt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class To extends Ut{constructor(e=null,t=1,n=1,r,s,a,o,l,c=qt,u=qt,h,d){super(null,a,o,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Qd=new be,$E=new be;class Uu{constructor(e=[],t=[]){this.uuid=Ii(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ae("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new be)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new be;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:$E;Qd.multiplyMatrices(o,t[s]),Qd.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new Uu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new To(t,e,e,pn,vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let a=t[s];a===void 0&&(Ae("Skeleton: No bone found with UUID:",s),a=new Bs),this.bones.push(a),this.boneInverses.push(new be().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const a=t[r];e.bones.push(a.uuid);const o=n[r];e.boneInverses.push(o.toArray())}return e}}class ef extends Tn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Tr=new be,tf=new be,Aa=[],nf=new zn,jE=new be,us=new st,hs=new Ci;class og extends st{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ef(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,jE)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Tr),nf.copy(e.boundingBox).applyMatrix4(Tr),this.boundingBox.union(nf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ci),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Tr),hs.copy(e.boundingSphere).applyMatrix4(Tr),this.boundingSphere.union(hs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(us.geometry=this.geometry,us.material=this.material,us.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hs.copy(this.boundingSphere),hs.applyMatrix4(n),e.ray.intersectsSphere(hs)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Tr),tf.multiplyMatrices(n,Tr),us.matrixWorld=tf,us.raycast(e,Aa);for(let a=0,o=Aa.length;a<o;a++){const l=Aa[a];l.instanceId=s,l.object=this,t.push(l)}Aa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ef(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new To(new Float32Array(r*this.count),r,this.count,Eu,vn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const gl=new F,ZE=new F,JE=new Oe;class Hi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=gl.subVectors(n,t).cross(ZE.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(gl),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||JE.getNormalMatrix(e),r=this.coplanarPoint(gl).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bi=new Ci,QE=new Ze(.5,.5),wa=new F;class Nu{constructor(e=new Hi,t=new Hi,n=new Hi,r=new Hi,s=new Hi,a=new Hi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Bn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],p=s[8],_=s[9],g=s[10],m=s[11],S=s[12],M=s[13],T=s[14],w=s[15];if(r[0].setComponents(c-a,f-u,m-p,w-S).normalize(),r[1].setComponents(c+a,f+u,m+p,w+S).normalize(),r[2].setComponents(c+o,f+h,m+_,w+M).normalize(),r[3].setComponents(c-o,f-h,m-_,w-M).normalize(),n)r[4].setComponents(l,d,g,T).normalize(),r[5].setComponents(c-l,f-d,m-g,w-T).normalize();else if(r[4].setComponents(c-l,f-d,m-g,w-T).normalize(),t===Bn)r[5].setComponents(c+l,f+d,m+g,w+T).normalize();else if(t===Ns)r[5].setComponents(l,d,g,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);const t=QE.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(wa.x=r.normal.x>0?e.max.x:e.min.x,wa.y=r.normal.y>0?e.max.y:e.min.y,wa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(wa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lg extends Li{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const lo=new F,co=new F,rf=new be,ds=new Fu,Ra=new Ci,_l=new F,sf=new F;class cg extends gt{constructor(e=new Qt,t=new lg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)lo.fromBufferAttribute(t,r-1),co.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=lo.distanceTo(co);e.setAttribute("lineDistance",new Mt(n,1))}else Ae("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ra.copy(n.boundingSphere),Ra.applyMatrix4(r),Ra.radius+=s,e.ray.intersectsSphere(Ra)===!1)return;rf.copy(r).invert(),ds.copy(e.ray).applyMatrix4(rf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){const m=u.getX(_),S=u.getX(_+1),M=Ia(this,e,ds,l,m,S,_);M&&t.push(M)}if(this.isLineLoop){const _=u.getX(p-1),g=u.getX(f),m=Ia(this,e,ds,l,_,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){const m=Ia(this,e,ds,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=Ia(this,e,ds,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ia(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(lo.fromBufferAttribute(o,r),co.fromBufferAttribute(o,s),t.distanceSqToSegment(lo,co,_l,sf)>n)return;_l.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(_l);if(!(c<e.near||c>e.far))return{distance:c,point:sf.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const af=new F,of=new F;class eb extends cg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)af.fromBufferAttribute(t,r),of.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+af.distanceTo(of);e.setAttribute("lineDistance",new Mt(n,1))}else Ae("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ug extends Ut{constructor(e=[],t=er,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hg extends Ut{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $r extends Ut{constructor(e,t,n=Vn,r,s,a,o=qt,l=qt,c,u=si,h=1){if(u!==si&&u!==$i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class tb extends $r{constructor(e,t=Vn,n=er,r,s,a=qt,o=qt,l,c=si){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class dg extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class or extends Qt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,r,a,2),p("x","z","y",1,-1,e,n,-t,r,a,3),p("x","y","z",1,-1,e,t,n,r,s,4),p("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(h,2));function p(_,g,m,S,M,T,w,E,C,v,A){const L=T/C,I=w/v,N=T/2,W=w/2,X=E/2,O=C+1,k=v+1;let z=0,ee=0;const ne=new F;for(let ue=0;ue<k;ue++){const Me=ue*I-W;for(let Te=0;Te<O;Te++){const We=Te*L-N;ne[_]=We*S,ne[g]=Me*M,ne[m]=X,c.push(ne.x,ne.y,ne.z),ne[_]=0,ne[g]=0,ne[m]=E>0?1:-1,u.push(ne.x,ne.y,ne.z),h.push(Te/C),h.push(1-ue/v),z+=1}}for(let ue=0;ue<v;ue++)for(let Me=0;Me<C;Me++){const Te=d+Me+O*ue,We=d+Me+O*(ue+1),it=d+(Me+1)+O*(ue+1),De=d+(Me+1)+O*ue;l.push(Te,We,De),l.push(We,it,De),ee+=6}o.addGroup(f,ee,A),f+=ee,d+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new or(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class qs extends Qt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],d=[],f=[];let p=0;const _=[],g=n/2;let m=0;S(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Mt(h,3)),this.setAttribute("normal",new Mt(d,3)),this.setAttribute("uv",new Mt(f,2));function S(){const T=new F,w=new F;let E=0;const C=(t-e)/n;for(let v=0;v<=s;v++){const A=[],L=v/s,I=L*(t-e)+e;for(let N=0;N<=r;N++){const W=N/r,X=W*l+o,O=Math.sin(X),k=Math.cos(X);w.x=I*O,w.y=-L*n+g,w.z=I*k,h.push(w.x,w.y,w.z),T.set(O,C,k).normalize(),d.push(T.x,T.y,T.z),f.push(W,1-L),A.push(p++)}_.push(A)}for(let v=0;v<r;v++)for(let A=0;A<s;A++){const L=_[A][v],I=_[A+1][v],N=_[A+1][v+1],W=_[A][v+1];(e>0||A!==0)&&(u.push(L,I,W),E+=3),(t>0||A!==s-1)&&(u.push(I,N,W),E+=3)}c.addGroup(m,E,0),m+=E}function M(T){const w=p,E=new Ze,C=new F;let v=0;const A=T===!0?e:t,L=T===!0?1:-1;for(let N=1;N<=r;N++)h.push(0,g*L,0),d.push(0,L,0),f.push(.5,.5),p++;const I=p;for(let N=0;N<=r;N++){const X=N/r*l+o,O=Math.cos(X),k=Math.sin(X);C.x=A*k,C.y=g*L,C.z=A*O,h.push(C.x,C.y,C.z),d.push(0,L,0),E.x=O*.5+.5,E.y=k*.5*L+.5,f.push(E.x,E.y),p++}for(let N=0;N<r;N++){const W=w+N,X=I+N;T===!0?u.push(X,X+1,W):u.push(X+1,X,W),v+=3}c.addGroup(m,v,T===!0?1:2),m+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class nb{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ae("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let r=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);const u=n[r],d=n[r+1]-u,f=(a-u)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new Ze:new F);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new F,r=[],s=[],a=[],o=new F,l=new be;for(let f=0;f<=e;f++){const p=f/e;r[f]=this.getTangentAt(p,new F)}s[0]=new F,a[0]=new F;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(qe(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(qe(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],f*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function ib(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=fg(i,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=lb(i,e,s,t)),i.length>80*t){o=i[0],l=i[1];let u=o,h=l;for(let d=t;d<r;d+=t){const f=i[d],p=i[d+1];f<o&&(o=f),p<l&&(l=p),f>u&&(u=f),p>h&&(h=p)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return ks(s,a,t,o,l,c,0),a}function fg(i,e,t,n,r){let s;if(r===vb(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=lf(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=lf(a/n|0,i[a],i[a+1],s);return s&&jr(s,s.next)&&(Vs(s),s=s.next),s}function nr(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(jr(t,t.next)||Tt(t.prev,t,t.next)===0)){if(Vs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ks(i,e,t,n,r,s,a){if(!i)return;!a&&s&&fb(i,n,r,s);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(s?sb(i,n,r,s):rb(i)){e.push(l.i,i.i,c.i),Vs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=ab(nr(i),e),ks(i,e,t,n,r,s,2)):a===2&&ob(i,e,t,n,r,s):ks(nr(i),e,t,n,r,s,1);break}}}function rb(i){const e=i.prev,t=i,n=i.next;if(Tt(e,t,n)>=0)return!1;const r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(r,s,a),h=Math.min(o,l,c),d=Math.max(r,s,a),f=Math.max(o,l,c);let p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=d&&p.y>=h&&p.y<=f&&vs(r,o,s,l,a,c,p.x,p.y)&&Tt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function sb(i,e,t,n){const r=i.prev,s=i,a=i.next;if(Tt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,h=s.y,d=a.y,f=Math.min(o,l,c),p=Math.min(u,h,d),_=Math.max(o,l,c),g=Math.max(u,h,d),m=qc(f,p,e,t,n),S=qc(_,g,e,t,n);let M=i.prevZ,T=i.nextZ;for(;M&&M.z>=m&&T&&T.z<=S;){if(M.x>=f&&M.x<=_&&M.y>=p&&M.y<=g&&M!==r&&M!==a&&vs(o,u,l,h,c,d,M.x,M.y)&&Tt(M.prev,M,M.next)>=0||(M=M.prevZ,T.x>=f&&T.x<=_&&T.y>=p&&T.y<=g&&T!==r&&T!==a&&vs(o,u,l,h,c,d,T.x,T.y)&&Tt(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;M&&M.z>=m;){if(M.x>=f&&M.x<=_&&M.y>=p&&M.y<=g&&M!==r&&M!==a&&vs(o,u,l,h,c,d,M.x,M.y)&&Tt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;T&&T.z<=S;){if(T.x>=f&&T.x<=_&&T.y>=p&&T.y<=g&&T!==r&&T!==a&&vs(o,u,l,h,c,d,T.x,T.y)&&Tt(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function ab(i,e){let t=i;do{const n=t.prev,r=t.next.next;!jr(n,r)&&mg(n,t,t.next,r)&&Hs(n,r)&&Hs(r,n)&&(e.push(n.i,t.i,r.i),Vs(t),Vs(t.next),t=i=r),t=t.next}while(t!==i);return nr(t)}function ob(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&gb(a,o)){let l=gg(a,o);a=nr(a,a.next),l=nr(l,l.next),ks(a,e,t,n,r,s,0),ks(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function lb(i,e,t,n){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=fg(i,o,l,n,!1);c===c.next&&(c.steiner=!0),r.push(mb(c))}r.sort(cb);for(let s=0;s<r.length;s++)t=ub(r[s],t);return t}function cb(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function ub(i,e){const t=hb(i,e);if(!t)return e;const n=gg(t,i);return nr(n,n.next),nr(t,t.next)}function hb(i,e){let t=e;const n=i.x,r=i.y;let s=-1/0,a;if(jr(i,t))return t;do{if(jr(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>s&&(s=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&pg(r<c?n:s,r,l,c,r<c?s:n,r,t.x,t.y)){const h=Math.abs(r-t.y)/(n-t.x);Hs(t,i)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&db(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function db(i,e){return Tt(i.prev,i,e.prev)<0&&Tt(e.next,i,i.next)<0}function fb(i,e,t,n){let r=i;do r.z===0&&(r.z=qc(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,pb(r)}function pb(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(r=n,n=n.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=a}s.nextZ=null,t*=2}while(e>1);return i}function qc(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function mb(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function pg(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function vs(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&pg(i,e,t,n,r,s,a,o)}function gb(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!_b(i,e)&&(Hs(i,e)&&Hs(e,i)&&xb(i,e)&&(Tt(i.prev,i,e.prev)||Tt(i,e.prev,e))||jr(i,e)&&Tt(i.prev,i,i.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function jr(i,e){return i.x===e.x&&i.y===e.y}function mg(i,e,t,n){const r=La(Tt(i,e,t)),s=La(Tt(i,e,n)),a=La(Tt(t,n,i)),o=La(Tt(t,n,e));return!!(r!==s&&a!==o||r===0&&Ca(i,t,e)||s===0&&Ca(i,n,e)||a===0&&Ca(t,i,n)||o===0&&Ca(t,e,n))}function Ca(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function La(i){return i>0?1:i<0?-1:0}function _b(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&mg(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Hs(i,e){return Tt(i.prev,i,i.next)<0?Tt(i,e,i.next)>=0&&Tt(i,i.prev,e)>=0:Tt(i,e,i.prev)<0||Tt(i,i.next,e)<0}function xb(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function gg(i,e){const t=$c(i.i,i.x,i.y),n=$c(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function lf(i,e,t,n){const r=$c(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Vs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function $c(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function vb(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}class Sb{static triangulate(e,t,n=2){return ib(e,t,n)}}class Ou{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Ou.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];cf(e),uf(n,e);let a=e.length;t.forEach(cf);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,uf(n,t[l]);const o=Sb.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function cf(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function uf(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Wn extends Qt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=e/o,d=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<u;m++){const S=m*d-a;for(let M=0;M<c;M++){const T=M*h-s;p.push(T,-S,0),_.push(0,0,1),g.push(M/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){const M=S+c*m,T=S+c*(m+1),w=S+1+c*(m+1),E=S+1+c*m;f.push(M,T,E),f.push(T,w,E)}this.setIndex(f),this.setAttribute("position",new Mt(p,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Bu extends Qt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new F,d=new F,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const S=[],M=m/n;let T=0;m===0&&a===0?T=.5/t:m===n&&l===Math.PI&&(T=-.5/t);for(let w=0;w<=t;w++){const E=w/t;h.x=-e*Math.cos(r+E*s)*Math.sin(a+M*o),h.y=e*Math.cos(a+M*o),h.z=e*Math.sin(r+E*s)*Math.sin(a+M*o),p.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),g.push(E+T,1-M),S.push(c++)}u.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){const M=u[m][S+1],T=u[m][S],w=u[m+1][S],E=u[m+1][S+1];(m!==0||a>0)&&f.push(M,T,E),(m!==n-1||l<Math.PI)&&f.push(T,w,E)}this.setIndex(f),this.setAttribute("position",new Mt(p,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Zr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(hf(r))r.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(hf(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function tn(i){const e={};for(let t=0;t<i.length;t++){const n=Zr(i[t]);for(const r in n)e[r]=n[r]}return e}function hf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Mb(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function _g(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Be.workingColorSpace}const Tb={clone:Zr,merge:tn};var yb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends Li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yb,this.fragmentShader=Eb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Zr(e.uniforms),this.uniformsGroups=Mb(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class bb extends Gn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class $s extends Li{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Us,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Pa extends Li{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Fe(16777215),this.specular=new Fe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Us,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yt,this.combine=So,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ab extends Li{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Us,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yt,this.combine=So,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wb extends Li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rb extends Li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function ji(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function xg(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function jc(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)r[a++]=i[o+l]}return r}function ku(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=i[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=i[r++];while(s!==void 0)}function Ib(i,e,t,n,r=30){const s=i.clone();s.name=e;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],u=c.getValueSize(),h=[],d=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*r;if(!(p<t||p>=n)){h.push(c.times[f]);for(let _=0;_<u;++_)d.push(c.values[f*u+_])}}h.length!==0&&(c.times=ji(h,c.times.constructor),c.values=ji(d,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function Cb(i,e=0,t=i,n=30){n<=0&&(n=30);const r=t.tracks.length,s=e/n;for(let a=0;a<r;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=i.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===l});if(c===void 0)continue;let u=0;const h=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=h/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const p=o.times.length-1;let _;if(s<=o.times[0]){const m=u,S=h-u;_=o.values.slice(m,S)}else if(s>=o.times[p]){const m=p*h+u,S=m+h-u;_=o.values.slice(m,S)}else{const m=o.createInterpolant(),S=u,M=h-u;m.evaluate(s),_=m.resultBuffer.slice(S,M)}l==="quaternion"&&new Pt().fromArray(_).normalize().conjugate().toArray(_);const g=c.times.length;for(let m=0;m<g;++m){const S=m*f+d;if(l==="quaternion")Pt.multiplyQuaternionsFlat(c.values,S,_,0,c.values,S);else{const M=f-d*2;for(let T=0;T<M;++T)c.values[S+T]-=_[T]}}}return i.blendMode=eg,i}class Lb{static convertArray(e,t){return ji(e,t)}static isTypedArray(e){return tg(e)}static getKeyframeOrder(e){return xg(e)}static sortedArray(e,t,n){return jc(e,t,n)}static flattenJSON(e,t,n,r){ku(e,t,n,r)}static subclip(e,t,n,r,s=30){return Ib(e,t,n,r,s)}static makeClipAdditive(e,t=0,n=e,r=30){return Cb(e,t,n,r)}}class js{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Pb extends js{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pr,endingEnd:Pr}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Dr:s=e,o=2*t-n;break;case so:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Dr:a=e,l=2*n-t;break;case so:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),_=p*p,g=_*p,m=-d*g+2*d*_-d*p,S=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*p+1,M=(-1-f)*g+(1.5+f)*_+.5*p,T=f*g-f*_;for(let w=0;w!==o;++w)s[w]=m*a[u+w]+S*a[c+w]+M*a[l+w]+T*a[h+w];return s}}class vg extends js{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}}class Db extends js{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class Fb extends js{interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,h=u.inTangents,d=u.outTangents;if(!h||!d){const _=(n-t)/(r-t),g=1-_;for(let m=0;m!==o;++m)s[m]=a[c+m]*g+a[l+m]*_;return s}const f=o*2,p=e-1;for(let _=0;_!==o;++_){const g=a[c+_],m=a[l+_],S=p*f+_*2,M=d[S],T=d[S+1],w=e*f+_*2,E=h[w],C=h[w+1];let v=(n-t)/(r-t),A,L,I,N,W;for(let X=0;X<8;X++){A=v*v,L=A*v,I=1-v,N=I*I,W=N*I;const k=W*t+3*N*v*M+3*I*A*E+L*r-n;if(Math.abs(k)<1e-10)break;const z=3*N*(M-t)+6*I*v*(E-M)+3*A*(r-E);if(Math.abs(z)<1e-10)break;v=v-k/z,v=Math.max(0,Math.min(1,v))}s[_]=W*g+3*N*v*T+3*I*A*C+L*m}return s}}class Cn{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ji(t,this.TimeBufferType),this.values=ji(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ji(e.times,Array),values:ji(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Db(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Pb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Fb(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case ro:t=this.InterpolantFactoryMethodDiscrete;break;case Yc:t=this.InterpolantFactoryMethodLinear;break;case Yo:t=this.InterpolantFactoryMethodSmooth;break;case wd:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ae("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ro;case this.InterpolantFactoryMethodLinear:return Yc;case this.InterpolantFactoryMethodSmooth:return Yo;case this.InterpolantFactoryMethodBezier:return wd}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Pe("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(Pe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Pe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Pe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&tg(r))for(let o=0,l=r.length;o!==l;++o){const c=r[o];if(isNaN(c)){Pe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Yo,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{const h=o*n,d=h-n,f=h+n;for(let p=0;p!==n;++p){const _=t[h+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Cn.prototype.ValueTypeName="";Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=Yc;class Qr extends Cn{constructor(e,t,n){super(e,t,n)}}Qr.prototype.ValueTypeName="bool";Qr.prototype.ValueBufferType=Array;Qr.prototype.DefaultInterpolation=ro;Qr.prototype.InterpolantFactoryMethodLinear=void 0;Qr.prototype.InterpolantFactoryMethodSmooth=void 0;class Sg extends Cn{constructor(e,t,n,r){super(e,t,n,r)}}Sg.prototype.ValueTypeName="color";class zs extends Cn{constructor(e,t,n,r){super(e,t,n,r)}}zs.prototype.ValueTypeName="number";class Ub extends js{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t);let c=e*o;for(let u=c+o;c!==u;c+=4)Pt.slerpFlat(s,0,a,c-o,a,c,l);return s}}class Zs extends Cn{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ub(this.times,this.values,this.getValueSize(),e)}}Zs.prototype.ValueTypeName="quaternion";Zs.prototype.InterpolantFactoryMethodSmooth=void 0;class es extends Cn{constructor(e,t,n){super(e,t,n)}}es.prototype.ValueTypeName="string";es.prototype.ValueBufferType=Array;es.prototype.DefaultInterpolation=ro;es.prototype.InterpolantFactoryMethodLinear=void 0;es.prototype.InterpolantFactoryMethodSmooth=void 0;class Gs extends Cn{constructor(e,t,n,r){super(e,t,n,r)}}Gs.prototype.ValueTypeName="vector";class Zc{constructor(e="",t=-1,n=[],r=Ru){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Ii(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Ob(n[a]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Cn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=xg(l);l=jc(l,1,u),c=jc(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new zs(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=r[h];d||(r[h]=d=[]),d.push(c)}}const a=[];for(const o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,n));return a}static parseAnimation(e,t){if(Ae("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Pe("AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,p,_){if(f.length!==0){const g=[],m=[];ku(f,g,m,p),g.length!==0&&_.push(new h(d,g,m))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let S=0;S!==d[p].morphTargets.length;++S){const M=d[p];g.push(M.time),m.push(M.morphTarget===_?1:0)}r.push(new zs(".morphTargetInfluence["+_+"]",g,m))}l=f.length*a}else{const f=".bones["+t[h].name+"]";n(Gs,f+".position",d,"pos",r),n(Zs,f+".quaternion",d,"rot",r),n(Gs,f+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Nb(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return zs;case"vector":case"vector2":case"vector3":case"vector4":return Gs;case"color":return Sg;case"quaternion":return Zs;case"bool":case"boolean":return Qr;case"string":return es}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Ob(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Nb(i.type);if(i.times===void 0){const t=[],n=[];ku(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const bs={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(df(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!df(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function df(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Bb{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],p=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const kb=new Bb;class ir{constructor(e){this.manager=e!==void 0?e:kb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ir.DEFAULT_MATERIAL_NAME="__DEFAULT";const Zn={};class Hb extends Error{constructor(e,t){super(e),this.response=t}}class Vb extends ir{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=bs.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Zn[e]!==void 0){Zn[e].push({onLoad:t,onProgress:n,onError:r});return}Zn[e]=[],Zn[e].push({onLoad:t,onProgress:n,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ae("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Zn[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){S();function S(){h.read().then(({done:M,value:T})=>{if(M)m.close();else{_+=T.byteLength;const w=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let E=0,C=u.length;E<C;E++){const v=u[E];v.onProgress&&v.onProgress(w)}m.enqueue(T),S()}},M=>{m.error(M)})}}});return new Response(g)}else throw new Hb(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{bs.add(`file:${e}`,c);const u=Zn[e];delete Zn[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Zn[e];if(u===void 0)throw this.manager.itemError(e),c;delete Zn[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const yr=new WeakMap;class zb extends ir{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=bs.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=yr.get(a);h===void 0&&(h=[],yr.set(a,h)),h.push({onLoad:t,onError:r})}return a}const o=Os("img");function l(){u(),t&&t(this);const h=yr.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}yr.delete(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),bs.remove(`image:${e}`);const d=yr.get(this)||[];for(let f=0;f<d.length;f++){const p=d[f];p.onError&&p.onError(h)}yr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),bs.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class Ji extends ir{constructor(e){super(e)}load(e,t,n,r){const s=new Ut,a=new zb(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class yo extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const xl=new be,ff=new F,pf=new F;class Hu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nu,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ff.setFromMatrixPosition(e.matrixWorld),t.position.copy(ff),pf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(pf),t.updateMatrixWorld(),xl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ns||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Da=new F,Fa=new Pt,Dn=new F;class Mg extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new be,this.projectionMatrix=new be,this.projectionMatrixInverse=new be,this.coordinateSystem=Bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Da,Fa,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Da,Fa,Dn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Da,Fa,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Da,Fa,Dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const _i=new F,mf=new Ze,gf=new Ze;class sn extends Mg{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=qr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qr*2*Math.atan(Math.tan(ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(_i.x,_i.y).multiplyScalar(-e/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_i.x,_i.y).multiplyScalar(-e/_i.z)}getViewSize(e,t){return this.getViewBounds(e,mf,gf),t.subVectors(gf,mf)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ys*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Gb extends Hu{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=qr*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Wb extends yo{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Gb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Xb extends Hu{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0}}class _f extends yo{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Xb}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Eo extends Mg{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Yb extends Hu{constructor(){super(new Eo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tg extends yo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new Yb}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class yg extends yo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Kb{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Er=-90,br=1;class qb extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new sn(Er,br,e,t);r.layers=this.layers,this.add(r);const s=new sn(Er,br,e,t);s.layers=this.layers,this.add(s);const a=new sn(Er,br,e,t);a.layers=this.layers,this.add(a);const o=new sn(Er,br,e,t);o.layers=this.layers,this.add(o);const l=new sn(Er,br,e,t);l.layers=this.layers,this.add(l);const c=new sn(Er,br,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ns)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class $b extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class jb{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,s,a;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:r=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,r=this.valueSize,s=e*r+r;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==r;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,r)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,r=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,r,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,r);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let s=n,a=r;s!==a;++s)t[s]=t[r+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,s){if(r>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,r){Pt.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,s){const a=this._workIndex*s;Pt.multiplyQuaternionsFlat(e,a,e,t,e,n),Pt.slerpFlat(e,t,e,t,e,a,r)}_lerp(e,t,n,r,s){const a=1-r;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*r}}_lerpAdditive(e,t,n,r,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*r}}}const Vu="\\[\\]\\.:\\/",Zb=new RegExp("["+Vu+"]","g"),zu="[^"+Vu+"]",Jb="[^"+Vu.replace("\\.","")+"]",Qb=/((?:WC+[\/:])*)/.source.replace("WC",zu),eA=/(WCOD+)?/.source.replace("WCOD",Jb),tA=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zu),nA=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zu),iA=new RegExp("^"+Qb+eA+tA+nA+"$"),rA=["material","materials","bones","map"];class sA{constructor(e,t,n){const r=n||Je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Je{constructor(e,t,n){this.path=t,this.parsedPath=n||Je.parseTrackName(t),this.node=Je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Je.Composite(e,t,n):new Je(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Zb,"")}static parseTrackName(e){const t=iA.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);rA.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=Je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ae("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Pe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Pe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Pe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Pe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Pe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Pe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Pe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[r];if(a===void 0){const c=t.nodeName;Pe("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Pe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Pe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Je.Composite=sA;Je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Je.prototype.GetterByBindingType=[Je.prototype._getValue_direct,Je.prototype._getValue_array,Je.prototype._getValue_arrayElement,Je.prototype._getValue_toArray];Je.prototype.SetterByBindingTypeAndVersioning=[[Je.prototype._setValue_direct,Je.prototype._setValue_direct_setNeedsUpdate,Je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_array,Je.prototype._setValue_array_setNeedsUpdate,Je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_arrayElement,Je.prototype._setValue_arrayElement_setNeedsUpdate,Je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_fromArray,Je.prototype._setValue_fromArray_setNeedsUpdate,Je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class aA{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Pr,endingEnd:Pr};for(let c=0;c!==a;++c){const u=s[c].createInterpolant(null);o[c]=u,u.settings&&Object.assign(l,u.settings),u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Qm,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const r=this._clip.duration,s=e._clip.duration,a=s/r,o=r/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const r=this._mixer,s=r.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=r._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case eg:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case Ru:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulate(r,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let r=this.time+e,s=this._loopCount;const a=n===eE;if(e===0)return s===-1?r:a&&(s&1)===1?t-r:r;if(n===io){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),r>=t||r<0){const o=Math.floor(r/t);r-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=r;if(a&&(s&1)===1)return t-r}return r}_setEndings(e,t,n){const r=this._interpolantSettings;n?(r.endingStart=Dr,r.endingEnd=Dr):(e?r.endingStart=this.zeroSlopeAtStart?Dr:Pr:r.endingStart=so,t?r.endingEnd=this.zeroSlopeAtEnd?Dr:Pr:r.endingEnd=so)}_scheduleFading(e,t,n){const r=this._mixer,s=r.time;let a=this._weightInterpolant;a===null&&(a=r._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const oA=new Float32Array(1);class lA extends Ri{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,r=e._clip.tracks,s=r.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==s;++h){const d=r[h],f=d.name;let p=u[f];if(p!==void 0)++p.referenceCount,a[h]=p;else{if(p=a[h],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const _=t&&t._propertyBindings[h].binding.parsedPath;p=new jb(Je.create(n,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[h]=p}o[h].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,n)}const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const r=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=r.length,r.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const h=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const r=this._bindingsByRootAndName,s=this._bindings;let a=r[t];a===void 0&&(a={},r[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,r=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[r],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[r]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new vg(new Float32Array(2),new Float32Array(2),1,oA),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const r=t||this._root,s=r.uuid;let a=typeof e=="string"?Zc.findByName(r,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Ru),l!==void 0){const h=l.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const u=new aA(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,s),u}existingAction(e,t){const n=t||this._root,r=n.uuid,s=typeof e=="string"?Zc.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[r]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,r=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(r,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,r=this._actionsByClip,s=r[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete r[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const nh=class nh{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};nh.prototype.isMatrix2=!0;let xf=nh;function vf(i,e,t,n){const r=cA(n);switch(t){case Zm:return i*e;case Eu:return i*e/r.components*r.byteLength;case bu:return i*e/r.components*r.byteLength;case tr:return i*e*2/r.components*r.byteLength;case Au:return i*e*2/r.components*r.byteLength;case Jm:return i*e*3/r.components*r.byteLength;case pn:return i*e*4/r.components*r.byteLength;case wu:return i*e*4/r.components*r.byteLength;case Xa:case Ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ka:case qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _c:case vc:return Math.max(i,16)*Math.max(e,8)/4;case gc:case xc:return Math.max(i,8)*Math.max(e,8)/2;case Sc:case Mc:case yc:case Ec:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Tc:case to:case bc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ac:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Rc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Cc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Lc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Dc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Fc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Nc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Oc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Bc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case kc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Hc:case Vc:case zc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Gc:case Wc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case no:case Xc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function cA(i){switch(i){case fn:case Km:return{byteLength:1,components:1};case Ds:case qm:case ri:return{byteLength:2,components:1};case Tu:case yu:return{byteLength:2,components:4};case Vn:case Mu:case vn:return{byteLength:4,components:1};case $m:case jm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Su}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Su);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Eg(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function uA(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<h.length;f++){const p=h[d],_=h[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,p=h.length;f<p;f++){const _=h[f];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var hA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dA=`#ifdef USE_ALPHAHASH
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
#endif`,fA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_A=`#ifdef USE_AOMAP
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
#endif`,xA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vA=`#ifdef USE_BATCHING
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
#endif`,SA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,MA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,TA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yA=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,EA=`#ifdef USE_IRIDESCENCE
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
#endif`,bA=`#ifdef USE_BUMPMAP
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
#endif`,AA=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,RA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,IA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,CA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,LA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,PA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,DA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,FA=`#define PI 3.141592653589793
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
} // validated`,UA=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,NA=`vec3 transformedNormal = objectNormal;
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
#endif`,OA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,BA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,HA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,VA="gl_FragColor = linearToOutputTexel( gl_FragColor );",zA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,GA=`#ifdef USE_ENVMAP
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
#endif`,WA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,XA=`#ifdef USE_ENVMAP
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
#endif`,YA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,KA=`#ifdef USE_ENVMAP
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
#endif`,qA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$A=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ZA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,JA=`#ifdef USE_GRADIENTMAP
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
}`,QA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ew=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nw=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,iw=`#ifdef USE_ENVMAP
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
#endif`,rw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,aw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ow=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lw=`PhysicalMaterial material;
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
#endif`,cw=`uniform sampler2D dfgLUT;
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
}`,uw=`
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
#endif`,hw=`#if defined( RE_IndirectDiffuse )
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
#endif`,dw=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fw=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,pw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_w=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Mw=`#if defined( USE_POINTS_UV )
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
#endif`,Tw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ew=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Aw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ww=`#ifdef USE_MORPHTARGETS
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
#endif`,Rw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Iw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Lw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fw=`#ifdef USE_NORMALMAP
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
#endif`,Uw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ow=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Vw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ww=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$w=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jw=`float getShadowMask() {
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
}`,Zw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jw=`#ifdef USE_SKINNING
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
#endif`,Qw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,eR=`#ifdef USE_SKINNING
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
#endif`,tR=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,iR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rR=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sR=`#ifdef USE_TRANSMISSION
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
#endif`,aR=`#ifdef USE_TRANSMISSION
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
#endif`,oR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dR=`uniform sampler2D t2D;
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
}`,fR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pR=`#ifdef ENVMAP_TYPE_CUBE
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
}`,mR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_R=`#include <common>
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
}`,xR=`#if DEPTH_PACKING == 3200
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
}`,vR=`#define DISTANCE
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
}`,SR=`#define DISTANCE
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
}`,MR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,TR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yR=`uniform float scale;
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
}`,ER=`uniform vec3 diffuse;
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
}`,bR=`#include <common>
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
}`,AR=`uniform vec3 diffuse;
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
}`,wR=`#define LAMBERT
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
}`,RR=`#define LAMBERT
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
}`,IR=`#define MATCAP
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
}`,CR=`#define MATCAP
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
}`,LR=`#define NORMAL
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
}`,PR=`#define NORMAL
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
}`,DR=`#define PHONG
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
}`,FR=`#define PHONG
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
}`,UR=`#define STANDARD
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
}`,NR=`#define STANDARD
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
}`,OR=`#define TOON
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
}`,BR=`#define TOON
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
}`,kR=`uniform float size;
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
}`,HR=`uniform vec3 diffuse;
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
}`,VR=`#include <common>
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
}`,zR=`uniform vec3 color;
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
}`,GR=`uniform float rotation;
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
}`,WR=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:hA,alphahash_pars_fragment:dA,alphamap_fragment:fA,alphamap_pars_fragment:pA,alphatest_fragment:mA,alphatest_pars_fragment:gA,aomap_fragment:_A,aomap_pars_fragment:xA,batching_pars_vertex:vA,batching_vertex:SA,begin_vertex:MA,beginnormal_vertex:TA,bsdfs:yA,iridescence_fragment:EA,bumpmap_pars_fragment:bA,clipping_planes_fragment:AA,clipping_planes_pars_fragment:wA,clipping_planes_pars_vertex:RA,clipping_planes_vertex:IA,color_fragment:CA,color_pars_fragment:LA,color_pars_vertex:PA,color_vertex:DA,common:FA,cube_uv_reflection_fragment:UA,defaultnormal_vertex:NA,displacementmap_pars_vertex:OA,displacementmap_vertex:BA,emissivemap_fragment:kA,emissivemap_pars_fragment:HA,colorspace_fragment:VA,colorspace_pars_fragment:zA,envmap_fragment:GA,envmap_common_pars_fragment:WA,envmap_pars_fragment:XA,envmap_pars_vertex:YA,envmap_physical_pars_fragment:iw,envmap_vertex:KA,fog_vertex:qA,fog_pars_vertex:$A,fog_fragment:jA,fog_pars_fragment:ZA,gradientmap_pars_fragment:JA,lightmap_pars_fragment:QA,lights_lambert_fragment:ew,lights_lambert_pars_fragment:tw,lights_pars_begin:nw,lights_toon_fragment:rw,lights_toon_pars_fragment:sw,lights_phong_fragment:aw,lights_phong_pars_fragment:ow,lights_physical_fragment:lw,lights_physical_pars_fragment:cw,lights_fragment_begin:uw,lights_fragment_maps:hw,lights_fragment_end:dw,lightprobes_pars_fragment:fw,logdepthbuf_fragment:pw,logdepthbuf_pars_fragment:mw,logdepthbuf_pars_vertex:gw,logdepthbuf_vertex:_w,map_fragment:xw,map_pars_fragment:vw,map_particle_fragment:Sw,map_particle_pars_fragment:Mw,metalnessmap_fragment:Tw,metalnessmap_pars_fragment:yw,morphinstance_vertex:Ew,morphcolor_vertex:bw,morphnormal_vertex:Aw,morphtarget_pars_vertex:ww,morphtarget_vertex:Rw,normal_fragment_begin:Iw,normal_fragment_maps:Cw,normal_pars_fragment:Lw,normal_pars_vertex:Pw,normal_vertex:Dw,normalmap_pars_fragment:Fw,clearcoat_normal_fragment_begin:Uw,clearcoat_normal_fragment_maps:Nw,clearcoat_pars_fragment:Ow,iridescence_pars_fragment:Bw,opaque_fragment:kw,packing:Hw,premultiplied_alpha_fragment:Vw,project_vertex:zw,dithering_fragment:Gw,dithering_pars_fragment:Ww,roughnessmap_fragment:Xw,roughnessmap_pars_fragment:Yw,shadowmap_pars_fragment:Kw,shadowmap_pars_vertex:qw,shadowmap_vertex:$w,shadowmask_pars_fragment:jw,skinbase_vertex:Zw,skinning_pars_vertex:Jw,skinning_vertex:Qw,skinnormal_vertex:eR,specularmap_fragment:tR,specularmap_pars_fragment:nR,tonemapping_fragment:iR,tonemapping_pars_fragment:rR,transmission_fragment:sR,transmission_pars_fragment:aR,uv_pars_fragment:oR,uv_pars_vertex:lR,uv_vertex:cR,worldpos_vertex:uR,background_vert:hR,background_frag:dR,backgroundCube_vert:fR,backgroundCube_frag:pR,cube_vert:mR,cube_frag:gR,depth_vert:_R,depth_frag:xR,distance_vert:vR,distance_frag:SR,equirect_vert:MR,equirect_frag:TR,linedashed_vert:yR,linedashed_frag:ER,meshbasic_vert:bR,meshbasic_frag:AR,meshlambert_vert:wR,meshlambert_frag:RR,meshmatcap_vert:IR,meshmatcap_frag:CR,meshnormal_vert:LR,meshnormal_frag:PR,meshphong_vert:DR,meshphong_frag:FR,meshphysical_vert:UR,meshphysical_frag:NR,meshtoon_vert:OR,meshtoon_frag:BR,points_vert:kR,points_frag:HR,shadow_vert:VR,shadow_frag:zR,sprite_vert:GR,sprite_frag:WR},fe={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},Un={basic:{uniforms:tn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:tn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:tn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:tn([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:tn([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:tn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:tn([fe.points,fe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:tn([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:tn([fe.common,fe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:tn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:tn([fe.sprite,fe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:tn([fe.common,fe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:tn([fe.lights,fe.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Un.physical={uniforms:tn([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Ua={r:0,b:0,g:0},XR=new be,bg=new Oe;bg.set(-1,0,0,0,1,0,0,0,1);function YR(i,e,t,n,r,s){const a=new Fe(0);let o=r===!0?0:1,l,c,u=null,h=0,d=null;function f(S){let M=S.isScene===!0?S.background:null;if(M&&M.isTexture){const T=S.backgroundBlurriness>0;M=e.get(M,T)}return M}function p(S){let M=!1;const T=f(S);T===null?g(a,o):T&&T.isColor&&(g(T,1),M=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(S,M){const T=f(M);T&&(T.isCubeTexture||T.mapping===Mo)?(c===void 0&&(c=new st(new or(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:Zr(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=T,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(XR.makeRotationFromEuler(M.backgroundRotation)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(bg),c.material.toneMapped=Be.getTransfer(T.colorSpace)!==rt,(u!==T||h!==T.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,h=T.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new st(new Wn(2,2),new Gn({name:"BackgroundMaterial",uniforms:Zr(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Be.getTransfer(T.colorSpace)!==rt,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||h!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,h=T.version,d=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function g(S,M){S.getRGB(Ua,_g(i)),t.buffers.color.setClear(Ua.r,Ua.g,Ua.b,M,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,M=1){a.set(S),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,g(a,o)},render:p,addToRenderList:_,dispose:m}}function KR(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(I,N,W,X,O){let k=!1;const z=h(I,X,W,N);s!==z&&(s=z,c(s.object)),k=f(I,X,W,O),k&&p(I,X,W,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,T(I,N,W,X),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function u(I){return i.deleteVertexArray(I)}function h(I,N,W,X){const O=X.wireframe===!0;let k=n[N.id];k===void 0&&(k={},n[N.id]=k);const z=I.isInstancedMesh===!0?I.id:0;let ee=k[z];ee===void 0&&(ee={},k[z]=ee);let ne=ee[W.id];ne===void 0&&(ne={},ee[W.id]=ne);let ue=ne[O];return ue===void 0&&(ue=d(l()),ne[O]=ue),ue}function d(I){const N=[],W=[],X=[];for(let O=0;O<t;O++)N[O]=0,W[O]=0,X[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:W,attributeDivisors:X,object:I,attributes:{},index:null}}function f(I,N,W,X){const O=s.attributes,k=N.attributes;let z=0;const ee=W.getAttributes();for(const ne in ee)if(ee[ne].location>=0){const Me=O[ne];let Te=k[ne];if(Te===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(Te=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(Te=I.instanceColor)),Me===void 0||Me.attribute!==Te||Te&&Me.data!==Te.data)return!0;z++}return s.attributesNum!==z||s.index!==X}function p(I,N,W,X){const O={},k=N.attributes;let z=0;const ee=W.getAttributes();for(const ne in ee)if(ee[ne].location>=0){let Me=k[ne];Me===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(Me=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(Me=I.instanceColor));const Te={};Te.attribute=Me,Me&&Me.data&&(Te.data=Me.data),O[ne]=Te,z++}s.attributes=O,s.attributesNum=z,s.index=X}function _(){const I=s.newAttributes;for(let N=0,W=I.length;N<W;N++)I[N]=0}function g(I){m(I,0)}function m(I,N){const W=s.newAttributes,X=s.enabledAttributes,O=s.attributeDivisors;W[I]=1,X[I]===0&&(i.enableVertexAttribArray(I),X[I]=1),O[I]!==N&&(i.vertexAttribDivisor(I,N),O[I]=N)}function S(){const I=s.newAttributes,N=s.enabledAttributes;for(let W=0,X=N.length;W<X;W++)N[W]!==I[W]&&(i.disableVertexAttribArray(W),N[W]=0)}function M(I,N,W,X,O,k,z){z===!0?i.vertexAttribIPointer(I,N,W,O,k):i.vertexAttribPointer(I,N,W,X,O,k)}function T(I,N,W,X){_();const O=X.attributes,k=W.getAttributes(),z=N.defaultAttributeValues;for(const ee in k){const ne=k[ee];if(ne.location>=0){let ue=O[ee];if(ue===void 0&&(ee==="instanceMatrix"&&I.instanceMatrix&&(ue=I.instanceMatrix),ee==="instanceColor"&&I.instanceColor&&(ue=I.instanceColor)),ue!==void 0){const Me=ue.normalized,Te=ue.itemSize,We=e.get(ue);if(We===void 0)continue;const it=We.buffer,De=We.type,j=We.bytesPerElement,he=De===i.INT||De===i.UNSIGNED_INT||ue.gpuType===Mu;if(ue.isInterleavedBufferAttribute){const ie=ue.data,Ie=ie.stride,Ue=ue.offset;if(ie.isInstancedInterleavedBuffer){for(let Le=0;Le<ne.locationSize;Le++)m(ne.location+Le,ie.meshPerAttribute);I.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Le=0;Le<ne.locationSize;Le++)g(ne.location+Le);i.bindBuffer(i.ARRAY_BUFFER,it);for(let Le=0;Le<ne.locationSize;Le++)M(ne.location+Le,Te/ne.locationSize,De,Me,Ie*j,(Ue+Te/ne.locationSize*Le)*j,he)}else{if(ue.isInstancedBufferAttribute){for(let ie=0;ie<ne.locationSize;ie++)m(ne.location+ie,ue.meshPerAttribute);I.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ie=0;ie<ne.locationSize;ie++)g(ne.location+ie);i.bindBuffer(i.ARRAY_BUFFER,it);for(let ie=0;ie<ne.locationSize;ie++)M(ne.location+ie,Te/ne.locationSize,De,Me,Te*j,Te/ne.locationSize*ie*j,he)}}else if(z!==void 0){const Me=z[ee];if(Me!==void 0)switch(Me.length){case 2:i.vertexAttrib2fv(ne.location,Me);break;case 3:i.vertexAttrib3fv(ne.location,Me);break;case 4:i.vertexAttrib4fv(ne.location,Me);break;default:i.vertexAttrib1fv(ne.location,Me)}}}}S()}function w(){A();for(const I in n){const N=n[I];for(const W in N){const X=N[W];for(const O in X){const k=X[O];for(const z in k)u(k[z].object),delete k[z];delete X[O]}}delete n[I]}}function E(I){if(n[I.id]===void 0)return;const N=n[I.id];for(const W in N){const X=N[W];for(const O in X){const k=X[O];for(const z in k)u(k[z].object),delete k[z];delete X[O]}}delete n[I.id]}function C(I){for(const N in n){const W=n[N];for(const X in W){const O=W[X];if(O[I.id]===void 0)continue;const k=O[I.id];for(const z in k)u(k[z].object),delete k[z];delete O[I.id]}}}function v(I){for(const N in n){const W=n[N],X=I.isInstancedMesh===!0?I.id:0,O=W[X];if(O!==void 0){for(const k in O){const z=O[k];for(const ee in z)u(z[ee].object),delete z[ee];delete O[k]}delete W[X],Object.keys(W).length===0&&delete n[N]}}}function A(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:L,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:S}}function qR(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function $R(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==pn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const v=C===ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==fn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==vn&&!v)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ae("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:T,maxSamples:w,samples:E}}function jR(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Hi,o=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||r;return r=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const p=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,m=i.get(h);if(!r||p===null||p.length===0||s&&!g)s?u(null):c();else{const S=s?0:n,M=S*4;let T=m.clippingState||null;l.value=T,T=u(p,d,M,f);for(let w=0;w!==M;++w)T[w]=t[w];m.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,p){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=f+_*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,T=f;M!==_;++M,T+=4)a.copy(h[M]).applyMatrix4(S,o),a.normal.toArray(g,T),g[T+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const yi=4,Sf=[.125,.215,.35,.446,.526,.582],Xi=20,ZR=256,fs=new Eo,Mf=new Fe;let vl=null,Sl=0,Ml=0,Tl=!1;const JR=new F;class Tf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=JR}=s;vl=this._renderer.getRenderTarget(),Sl=this._renderer.getActiveCubeFace(),Ml=this._renderer.getActiveMipmapLevel(),Tl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ef(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(vl,Sl,Ml),this._renderer.xr.enabled=Tl,e.scissorTest=!1,Ar(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===er||e.mapping===Kr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vl=this._renderer.getRenderTarget(),Sl=this._renderer.getActiveCubeFace(),Ml=this._renderer.getActiveMipmapLevel(),Tl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:ri,format:pn,colorSpace:ao,depthBuffer:!1},r=yf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yf(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=QR(s)),this._blurMaterial=tI(s,e,t),this._ggxMaterial=eI(s,e,t)}return r}_compileMaterial(e){const t=new st(new Qt,e);this._renderer.compile(t,fs)}_sceneToCubeUV(e,t,n,r,s){const l=new sn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Mf),h.toneMapping=kn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new st(new or,new ln({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const S=e.background;S?S.isColor&&(g.color.copy(S),e.background=null,m=!0):(g.color.copy(Mf),m=!0);for(let M=0;M<6;M++){const T=M%3;T===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):T===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));const w=this._cubeSize;Ar(r,T*w,M>2?w:0,w,w),h.setRenderTarget(r),m&&h.render(_,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===er||e.mapping===Kr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=bf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ef());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ar(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,fs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-yi?n-p+yi:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,Ar(s,g,m,3*_,2*_),r.setRenderTarget(s),r.render(o,fs),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,Ar(e,g,m,3*_,2*_),r.setRenderTarget(e),r.render(o,fs)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Pe("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[r];h.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Xi-1),_=s/p,g=isFinite(s)?1+Math.floor(u*_):Xi;g>Xi&&Ae(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Xi}`);const m=[];let S=0;for(let C=0;C<Xi;++C){const v=C/_,A=Math.exp(-v*v/2);m.push(A),C===0?S+=A:C<g&&(S+=2*A)}for(let C=0;C<m.length;C++)m[C]=m[C]/S;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=p,d.mipInt.value=M-n;const T=this._sizeLods[r],w=3*T*(r>M-yi?r-M+yi:0),E=4*(this._cubeSize-T);Ar(t,w,E,3*T,2*T),l.setRenderTarget(t),l.render(h,fs)}}function QR(i){const e=[],t=[],n=[];let r=i;const s=i-yi+1+Sf.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-yi?l=Sf[a-i+yi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,p=6,_=3,g=2,m=1,S=new Float32Array(_*p*f),M=new Float32Array(g*p*f),T=new Float32Array(m*p*f);for(let E=0;E<f;E++){const C=E%3*2/3-1,v=E>2?0:-1,A=[C,v,0,C+2/3,v,0,C+2/3,v+1,0,C,v,0,C+2/3,v+1,0,C,v+1,0];S.set(A,_*p*E),M.set(d,g*p*E);const L=[E,E,E,E,E,E];T.set(L,m*p*E)}const w=new Qt;w.setAttribute("position",new Tn(S,_)),w.setAttribute("uv",new Tn(M,g)),w.setAttribute("faceIndex",new Tn(T,m)),n.push(new st(w,null)),r>yi&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function yf(i,e,t){const n=new Hn(i,e,t);return n.texture.mapping=Mo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ar(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function eI(i,e,t){return new Gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ZR,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bo(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function tI(i,e,t){const n=new Float32Array(Xi),r=new F(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:Xi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:bo(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Ef(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bo(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function bf(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function bo(){return`

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
	`}class Ag extends Hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ug(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new or(5,5,5),s=new Gn({name:"CubemapFromEquirect",uniforms:Zr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:ei});s.uniforms.tEquirect.value=t;const a=new st(r,s),o=t.minFilter;return t.minFilter===qi&&(t.minFilter=Jt),new qb(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function nI(i){let e=new WeakMap,t=new WeakMap,n=null;function r(d,f=!1){return d==null?null:f?a(d):s(d)}function s(d){if(d&&d.isTexture){const f=d.mapping;if(f===Wa||f===Wo)if(e.has(d)){const p=e.get(d).texture;return o(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const _=new Ag(p.height);return _.fromEquirectangularTexture(i,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,p=f===Wa||f===Wo,_=f===er||f===Kr;if(p||_){let g=t.get(d);const m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new Tf(i)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const S=d.image;return p&&S&&S.height>0||_&&S&&l(S)?(n===null&&(n=new Tf(i)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,f){return f===Wa?d.mapping=er:f===Wo&&(d.mapping=Kr),d}function l(d){let f=0;const p=6;for(let _=0;_<p;_++)d[_]!==void 0&&f++;return f===p}function c(d){const f=d.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:h}}function iI(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Kc("WebGLRenderer: "+n+" extension not supported."),r}}}function rI(i,e,t,n){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete r[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,p=h.attributes.position;let _=0;if(p===void 0)return;if(f!==null){const S=f.array;_=f.version;for(let M=0,T=S.length;M<T;M+=3){const w=S[M+0],E=S[M+1],C=S[M+2];d.push(w,E,E,C,C,w)}}else{const S=p.array;_=p.version;for(let M=0,T=S.length/3-1;M<T;M+=3){const w=M+0,E=M+1,C=M+2;d.push(w,E,E,C,C,w)}}const g=new(p.count>=65535?ag:Du)(d,1);g.version=_;const m=s.get(h);m&&e.remove(m),s.set(h,g)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function sI(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){i.drawElements(n,d,s,h*a),t.update(d,n,1)}function c(h,d,f){f!==0&&(i.drawElementsInstanced(n,d,s,h*a,f),t.update(d,n,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,f);let _=0;for(let g=0;g<f;g++)_+=d[g];t.update(_,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function aI(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:Pe("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function oI(i,e,t){const n=new WeakMap,r=new nt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let A=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),p===!0&&(M=2),_===!0&&(M=3);let T=o.attributes.position.count*M,w=1;T>e.maxTextureSize&&(w=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const E=new Float32Array(T*w*4*h),C=new ig(E,T,w,h);C.type=vn,C.needsUpdate=!0;const v=M*4;for(let L=0;L<h;L++){const I=g[L],N=m[L],W=S[L],X=T*w*4*L;for(let O=0;O<I.count;O++){const k=O*v;f===!0&&(r.fromBufferAttribute(I,O),E[X+k+0]=r.x,E[X+k+1]=r.y,E[X+k+2]=r.z,E[X+k+3]=0),p===!0&&(r.fromBufferAttribute(N,O),E[X+k+4]=r.x,E[X+k+5]=r.y,E[X+k+6]=r.z,E[X+k+7]=0),_===!0&&(r.fromBufferAttribute(W,O),E[X+k+8]=r.x,E[X+k+9]=r.y,E[X+k+10]=r.z,E[X+k+11]=W.itemSize===4?r.w:1)}}d={count:h,texture:C,size:new Ze(T,w)},n.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function lI(i,e,t,n,r){let s=new WeakMap;function a(c){const u=r.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const cI={[km]:"LINEAR_TONE_MAPPING",[Hm]:"REINHARD_TONE_MAPPING",[Vm]:"CINEON_TONE_MAPPING",[zm]:"ACES_FILMIC_TONE_MAPPING",[Wm]:"AGX_TONE_MAPPING",[Xm]:"NEUTRAL_TONE_MAPPING",[Gm]:"CUSTOM_TONE_MAPPING"};function uI(i,e,t,n,r){const s=new Hn(e,t,{type:i,depthBuffer:n,stencilBuffer:r,depthTexture:n?new $r(e,t):void 0}),a=new Hn(e,t,{type:ri,depthBuffer:!1,stencilBuffer:!1}),o=new Qt;o.setAttribute("position",new Mt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Mt([0,2,0,0,2,0],2));const l=new bb({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new st(o,l),u=new Eo(-1,1,1,-1,0,1);let h=null,d=null,f=!1,p,_=null,g=[],m=!1;this.setSize=function(S,M){s.setSize(S,M),a.setSize(S,M);for(let T=0;T<g.length;T++){const w=g[T];w.setSize&&w.setSize(S,M)}},this.setEffects=function(S){g=S,m=g.length>0&&g[0].isRenderPass===!0;const M=s.width,T=s.height;for(let w=0;w<g.length;w++){const E=g[w];E.setSize&&E.setSize(M,T)}},this.begin=function(S,M){if(f||S.toneMapping===kn&&g.length===0)return!1;if(_=M,M!==null){const T=M.width,w=M.height;(s.width!==T||s.height!==w)&&this.setSize(T,w)}return m===!1&&S.setRenderTarget(s),p=S.toneMapping,S.toneMapping=kn,!0},this.hasRenderPass=function(){return m},this.end=function(S,M){S.toneMapping=p,f=!0;let T=s,w=a;for(let E=0;E<g.length;E++){const C=g[E];if(C.enabled!==!1&&(C.render(S,w,T,M),C.needsSwap!==!1)){const v=T;T=w,w=v}}if(h!==S.outputColorSpace||d!==S.toneMapping){h=S.outputColorSpace,d=S.toneMapping,l.defines={},Be.getTransfer(h)===rt&&(l.defines.SRGB_TRANSFER="");const E=cI[d];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=T.texture,S.setRenderTarget(_),S.render(c,u),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const wg=new Ut,Jc=new $r(1,1),Rg=new ig,Ig=new FE,Cg=new ug,Af=[],wf=[],Rf=new Float32Array(16),If=new Float32Array(9),Cf=new Float32Array(4);function ts(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Af[r];if(s===void 0&&(s=new Float32Array(r),Af[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ao(i,e){let t=wf[e];t===void 0&&(t=new Int32Array(e),wf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function hI(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function dI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function fI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function pI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function mI(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(zt(t,n))return;Cf.set(n),i.uniformMatrix2fv(this.addr,!1,Cf),Gt(t,n)}}function gI(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(zt(t,n))return;If.set(n),i.uniformMatrix3fv(this.addr,!1,If),Gt(t,n)}}function _I(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(zt(t,n))return;Rf.set(n),i.uniformMatrix4fv(this.addr,!1,Rf),Gt(t,n)}}function xI(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function vI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function SI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function MI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function TI(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function yI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function EI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function bI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function AI(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Jc.compareFunction=t.isReversedDepthBuffer()?Cu:Iu,s=Jc):s=wg,t.setTexture2D(e||s,r)}function wI(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Ig,r)}function RI(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Cg,r)}function II(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Rg,r)}function CI(i){switch(i){case 5126:return hI;case 35664:return dI;case 35665:return fI;case 35666:return pI;case 35674:return mI;case 35675:return gI;case 35676:return _I;case 5124:case 35670:return xI;case 35667:case 35671:return vI;case 35668:case 35672:return SI;case 35669:case 35673:return MI;case 5125:return TI;case 36294:return yI;case 36295:return EI;case 36296:return bI;case 35678:case 36198:case 36298:case 36306:case 35682:return AI;case 35679:case 36299:case 36307:return wI;case 35680:case 36300:case 36308:case 36293:return RI;case 36289:case 36303:case 36311:case 36292:return II}}function LI(i,e){i.uniform1fv(this.addr,e)}function PI(i,e){const t=ts(e,this.size,2);i.uniform2fv(this.addr,t)}function DI(i,e){const t=ts(e,this.size,3);i.uniform3fv(this.addr,t)}function FI(i,e){const t=ts(e,this.size,4);i.uniform4fv(this.addr,t)}function UI(i,e){const t=ts(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function NI(i,e){const t=ts(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function OI(i,e){const t=ts(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function BI(i,e){i.uniform1iv(this.addr,e)}function kI(i,e){i.uniform2iv(this.addr,e)}function HI(i,e){i.uniform3iv(this.addr,e)}function VI(i,e){i.uniform4iv(this.addr,e)}function zI(i,e){i.uniform1uiv(this.addr,e)}function GI(i,e){i.uniform2uiv(this.addr,e)}function WI(i,e){i.uniform3uiv(this.addr,e)}function XI(i,e){i.uniform4uiv(this.addr,e)}function YI(i,e,t){const n=this.cache,r=e.length,s=Ao(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Jc:a=wg;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function KI(i,e,t){const n=this.cache,r=e.length,s=Ao(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Ig,s[a])}function qI(i,e,t){const n=this.cache,r=e.length,s=Ao(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Cg,s[a])}function $I(i,e,t){const n=this.cache,r=e.length,s=Ao(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Rg,s[a])}function jI(i){switch(i){case 5126:return LI;case 35664:return PI;case 35665:return DI;case 35666:return FI;case 35674:return UI;case 35675:return NI;case 35676:return OI;case 5124:case 35670:return BI;case 35667:case 35671:return kI;case 35668:case 35672:return HI;case 35669:case 35673:return VI;case 5125:return zI;case 36294:return GI;case 36295:return WI;case 36296:return XI;case 35678:case 36198:case 36298:case 36306:case 35682:return YI;case 35679:case 36299:case 36307:return KI;case 35680:case 36300:case 36308:case 36293:return qI;case 36289:case 36303:case 36311:case 36292:return $I}}class ZI{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=CI(t.type)}}class JI{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jI(t.type)}}class QI{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const yl=/(\w+)(\])?(\[|\.)?/g;function Lf(i,e){i.seq.push(e),i.map[e.id]=e}function e1(i,e,t){const n=i.name,r=n.length;for(yl.lastIndex=0;;){const s=yl.exec(n),a=yl.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Lf(t,c===void 0?new ZI(o,i,e):new JI(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new QI(o),Lf(t,h)),t=h}}}class $a{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);e1(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Pf(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const t1=37297;let n1=0;function i1(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Df=new Oe;function r1(i){Be._getMatrix(Df,Be.workingColorSpace,i);const e=`mat3( ${Df.elements.map(t=>t.toFixed(4))} )`;switch(Be.getTransfer(i)){case oo:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ff(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+i1(i.getShaderSource(e),o)}else return s}function s1(i,e){const t=r1(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const a1={[km]:"Linear",[Hm]:"Reinhard",[Vm]:"Cineon",[zm]:"ACESFilmic",[Wm]:"AgX",[Xm]:"Neutral",[Gm]:"Custom"};function o1(i,e){const t=a1[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Na=new F;function l1(){Be.getLuminanceCoefficients(Na);const i=Na.x.toFixed(4),e=Na.y.toFixed(4),t=Na.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function c1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ss).join(`
`)}function u1(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function h1(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ss(i){return i!==""}function Uf(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const d1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qc(i){return i.replace(d1,p1)}const f1=new Map;function p1(i,e){let t=Xe[e];if(t===void 0){const n=f1.get(e);if(n!==void 0)t=Xe[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Qc(t)}const m1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Of(i){return i.replace(m1,g1)}function g1(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Bf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const _1={[Ga]:"SHADOWMAP_TYPE_PCF",[xs]:"SHADOWMAP_TYPE_VSM"};function x1(i){return _1[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const v1={[er]:"ENVMAP_TYPE_CUBE",[Kr]:"ENVMAP_TYPE_CUBE",[Mo]:"ENVMAP_TYPE_CUBE_UV"};function S1(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":v1[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const M1={[Kr]:"ENVMAP_MODE_REFRACTION"};function T1(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":M1[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const y1={[So]:"ENVMAP_BLENDING_MULTIPLY",[jy]:"ENVMAP_BLENDING_MIX",[Zy]:"ENVMAP_BLENDING_ADD"};function E1(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":y1[i.combine]||"ENVMAP_BLENDING_NONE"}function b1(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function A1(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=x1(t),c=S1(t),u=T1(t),h=E1(t),d=b1(t),f=c1(t),p=u1(s),_=r.createProgram();let g,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ss).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ss).join(`
`),m.length>0&&(m+=`
`)):(g=[Bf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ss).join(`
`),m=[Bf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==kn?"#define TONE_MAPPING":"",t.toneMapping!==kn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==kn?o1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,s1("linearToOutputTexel",t.outputColorSpace),l1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ss).join(`
`)),a=Qc(a),a=Uf(a,t),a=Nf(a,t),o=Qc(o),o=Uf(o,t),o=Nf(o,t),a=Of(a),o=Of(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Cd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=S+g+a,T=S+m+o,w=Pf(r,r.VERTEX_SHADER,M),E=Pf(r,r.FRAGMENT_SHADER,T);r.attachShader(_,w),r.attachShader(_,E),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(I){if(i.debug.checkShaderErrors){const N=r.getProgramInfoLog(_)||"",W=r.getShaderInfoLog(w)||"",X=r.getShaderInfoLog(E)||"",O=N.trim(),k=W.trim(),z=X.trim();let ee=!0,ne=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(ee=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,w,E);else{const ue=Ff(r,w,"vertex"),Me=Ff(r,E,"fragment");Pe("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+ue+`
`+Me)}else O!==""?Ae("WebGLProgram: Program Info Log:",O):(k===""||z==="")&&(ne=!1);ne&&(I.diagnostics={runnable:ee,programLog:O,vertexShader:{log:k,prefix:g},fragmentShader:{log:z,prefix:m}})}r.deleteShader(w),r.deleteShader(E),v=new $a(r,_),A=h1(r,_)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(_,t1)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=n1++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=E,this}let w1=0;class R1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new I1(e),t.set(e,n)),n}}class I1{constructor(e){this.id=w1++,this.code=e,this.usedTimes=0}}function C1(i){return i===tr||i===to||i===no}function L1(i,e,t,n,r,s){const a=new rg,o=new R1,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,A,L,I,N,W){const X=I.fog,O=N.geometry,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ee=e.get(v.envMap||k,z),ne=ee&&ee.mapping===Mo?ee.image.height:null,ue=f[v.type];v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&Ae("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const Me=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Te=Me!==void 0?Me.length:0;let We=0;O.morphAttributes.position!==void 0&&(We=1),O.morphAttributes.normal!==void 0&&(We=2),O.morphAttributes.color!==void 0&&(We=3);let it,De,j,he;if(ue){const He=Un[ue];it=He.vertexShader,De=He.fragmentShader}else it=v.vertexShader,De=v.fragmentShader,o.update(v),j=o.getVertexShaderID(v),he=o.getFragmentShaderID(v);const ie=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),Ue=N.isInstancedMesh===!0,Le=N.isBatchedMesh===!0,dt=!!v.map,Ye=!!v.matcap,at=!!ee,_t=!!v.aoMap,$e=!!v.lightMap,Nt=!!v.bumpMap,St=!!v.normalMap,cn=!!v.displacementMap,D=!!v.emissiveMap,Ot=!!v.metalnessMap,je=!!v.roughnessMap,ft=v.anisotropy>0,de=v.clearcoat>0,yt=v.dispersion>0,b=v.iridescence>0,x=v.sheen>0,B=v.transmission>0,$=ft&&!!v.anisotropyMap,te=de&&!!v.clearcoatMap,re=de&&!!v.clearcoatNormalMap,ce=de&&!!v.clearcoatRoughnessMap,K=b&&!!v.iridescenceMap,Z=b&&!!v.iridescenceThicknessMap,ge=x&&!!v.sheenColorMap,ve=x&&!!v.sheenRoughnessMap,oe=!!v.specularMap,se=!!v.specularColorMap,Ne=!!v.specularIntensityMap,Ge=B&&!!v.transmissionMap,tt=B&&!!v.thicknessMap,P=!!v.gradientMap,ae=!!v.alphaMap,q=v.alphaTest>0,_e=!!v.alphaHash,le=!!v.extensions;let Q=kn;v.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Q=i.toneMapping);const Ee={shaderID:ue,shaderType:v.type,shaderName:v.name,vertexShader:it,fragmentShader:De,defines:v.defines,customVertexShaderID:j,customFragmentShaderID:he,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Le,batchingColor:Le&&N._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&N.instanceColor!==null,instancingMorph:Ue&&N.morphTexture!==null,outputColorSpace:ie===null?i.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Be.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:dt,matcap:Ye,envMap:at,envMapMode:at&&ee.mapping,envMapCubeUVHeight:ne,aoMap:_t,lightMap:$e,bumpMap:Nt,normalMap:St,displacementMap:cn,emissiveMap:D,normalMapObjectSpace:St&&v.normalMapType===nE,normalMapTangentSpace:St&&v.normalMapType===Us,packedNormalMap:St&&v.normalMapType===Us&&C1(v.normalMap.format),metalnessMap:Ot,roughnessMap:je,anisotropy:ft,anisotropyMap:$,clearcoat:de,clearcoatMap:te,clearcoatNormalMap:re,clearcoatRoughnessMap:ce,dispersion:yt,iridescence:b,iridescenceMap:K,iridescenceThicknessMap:Z,sheen:x,sheenColorMap:ge,sheenRoughnessMap:ve,specularMap:oe,specularColorMap:se,specularIntensityMap:Ne,transmission:B,transmissionMap:Ge,thicknessMap:tt,gradientMap:P,opaque:v.transparent===!1&&v.blending===Ei&&v.alphaToCoverage===!1,alphaMap:ae,alphaTest:q,alphaHash:_e,combine:v.combine,mapUv:dt&&p(v.map.channel),aoMapUv:_t&&p(v.aoMap.channel),lightMapUv:$e&&p(v.lightMap.channel),bumpMapUv:Nt&&p(v.bumpMap.channel),normalMapUv:St&&p(v.normalMap.channel),displacementMapUv:cn&&p(v.displacementMap.channel),emissiveMapUv:D&&p(v.emissiveMap.channel),metalnessMapUv:Ot&&p(v.metalnessMap.channel),roughnessMapUv:je&&p(v.roughnessMap.channel),anisotropyMapUv:$&&p(v.anisotropyMap.channel),clearcoatMapUv:te&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:re&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:ve&&p(v.sheenRoughnessMap.channel),specularMapUv:oe&&p(v.specularMap.channel),specularColorMapUv:se&&p(v.specularColorMap.channel),specularIntensityMapUv:Ne&&p(v.specularIntensityMap.channel),transmissionMapUv:Ge&&p(v.transmissionMap.channel),thicknessMapUv:tt&&p(v.thicknessMap.channel),alphaMapUv:ae&&p(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(St||ft),vertexNormals:!!O.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!O.attributes.uv&&(dt||ae),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||O.attributes.normal===void 0&&St===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ie,skinning:N.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:We,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Q,decodeVideoTexture:dt&&v.map.isVideoTexture===!0&&Be.getTransfer(v.map.colorSpace)===rt,decodeVideoTextureEmissive:D&&v.emissiveMap.isVideoTexture===!0&&Be.getTransfer(v.emissiveMap.colorSpace)===rt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Kt,flipSided:v.side===on,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:le&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&v.extensions.multiDraw===!0||Le)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ee.vertexUv1s=l.has(1),Ee.vertexUv2s=l.has(2),Ee.vertexUv3s=l.has(3),l.clear(),Ee}function g(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const L in v.defines)A.push(L),A.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(m(A,v),S(A,v),A.push(i.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function m(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function S(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),v.push(a.mask)}function M(v){const A=f[v.type];let L;if(A){const I=Un[A];L=Tb.clone(I.uniforms)}else L=v.uniforms;return L}function T(v,A){let L=u.get(A);return L!==void 0?++L.usedTimes:(L=new A1(i,A,v,r),c.push(L),u.set(A,L)),L}function w(v){if(--v.usedTimes===0){const A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function E(v){o.remove(v)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:M,acquireProgram:T,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:C}}function P1(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function D1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function kf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Hf(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,_,g,m){let S=i[e];return S===void 0?(S={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},i[e]=S):(S.id=d.id,S.object=d,S.geometry=f,S.material=p,S.materialVariant=a(d),S.groupOrder=_,S.renderOrder=d.renderOrder,S.z=g,S.group=m),e++,S}function l(d,f,p,_,g,m){const S=o(d,f,p,_,g,m);p.transmission>0?n.push(S):p.transparent===!0?r.push(S):t.push(S)}function c(d,f,p,_,g,m){const S=o(d,f,p,_,g,m);p.transmission>0?n.unshift(S):p.transparent===!0?r.unshift(S):t.unshift(S)}function u(d,f){t.length>1&&t.sort(d||D1),n.length>1&&n.sort(f||kf),r.length>1&&r.sort(f||kf)}function h(){for(let d=e,f=i.length;d<f;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:h,sort:u}}function F1(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Hf,i.set(n,[a])):r>=s.length?(a=new Hf,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function U1(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Fe};break;case"SpotLight":t={position:new F,direction:new F,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function N1(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let O1=0;function B1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function k1(i){const e=new U1,t=N1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);const r=new F,s=new be,a=new be;function o(c){let u=0,h=0,d=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,S=0,M=0,T=0,w=0,E=0,C=0;c.sort(B1);for(let A=0,L=c.length;A<L;A++){const I=c[A],N=I.color,W=I.intensity,X=I.distance;let O=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===tr?O=I.shadow.map.texture:O=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=N.r*W,h+=N.g*W,d+=N.b*W;else if(I.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(I.sh.coefficients[k],W);C++}else if(I.isDirectionalLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const z=I.shadow,ee=t.get(I);ee.shadowIntensity=z.intensity,ee.shadowBias=z.bias,ee.shadowNormalBias=z.normalBias,ee.shadowRadius=z.radius,ee.shadowMapSize=z.mapSize,n.directionalShadow[f]=ee,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=I.shadow.matrix,S++}n.directional[f]=k,f++}else if(I.isSpotLight){const k=e.get(I);k.position.setFromMatrixPosition(I.matrixWorld),k.color.copy(N).multiplyScalar(W),k.distance=X,k.coneCos=Math.cos(I.angle),k.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),k.decay=I.decay,n.spot[_]=k;const z=I.shadow;if(I.map&&(n.spotLightMap[w]=I.map,w++,z.updateMatrices(I),I.castShadow&&E++),n.spotLightMatrix[_]=z.matrix,I.castShadow){const ee=t.get(I);ee.shadowIntensity=z.intensity,ee.shadowBias=z.bias,ee.shadowNormalBias=z.normalBias,ee.shadowRadius=z.radius,ee.shadowMapSize=z.mapSize,n.spotShadow[_]=ee,n.spotShadowMap[_]=O,T++}_++}else if(I.isRectAreaLight){const k=e.get(I);k.color.copy(N).multiplyScalar(W),k.halfWidth.set(I.width*.5,0,0),k.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=k,g++}else if(I.isPointLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),k.distance=I.distance,k.decay=I.decay,I.castShadow){const z=I.shadow,ee=t.get(I);ee.shadowIntensity=z.intensity,ee.shadowBias=z.bias,ee.shadowNormalBias=z.normalBias,ee.shadowRadius=z.radius,ee.shadowMapSize=z.mapSize,ee.shadowCameraNear=z.camera.near,ee.shadowCameraFar=z.camera.far,n.pointShadow[p]=ee,n.pointShadowMap[p]=O,n.pointShadowMatrix[p]=I.shadow.matrix,M++}n.point[p]=k,p++}else if(I.isHemisphereLight){const k=e.get(I);k.skyColor.copy(I.color).multiplyScalar(W),k.groundColor.copy(I.groundColor).multiplyScalar(W),n.hemi[m]=k,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const v=n.hash;(v.directionalLength!==f||v.pointLength!==p||v.spotLength!==_||v.rectAreaLength!==g||v.hemiLength!==m||v.numDirectionalShadows!==S||v.numPointShadows!==M||v.numSpotShadows!==T||v.numSpotMaps!==w||v.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=T+w-E,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,v.directionalLength=f,v.pointLength=p,v.spotLength=_,v.rectAreaLength=g,v.hemiLength=m,v.numDirectionalShadows=S,v.numPointShadows=M,v.numSpotShadows=T,v.numSpotMaps=w,v.numLightProbes=C,n.version=O1++)}function l(c,u){let h=0,d=0,f=0,p=0,_=0;const g=u.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){const M=c[m];if(M.isDirectionalLight){const T=n.directional[h];T.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),h++}else if(M.isSpotLight){const T=n.spot[f];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),f++}else if(M.isRectAreaLight){const T=n.rectArea[p];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(g),a.identity(),s.copy(M.matrixWorld),s.premultiply(g),a.extractRotation(s),T.halfWidth.set(M.width*.5,0,0),T.halfHeight.set(0,M.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),p++}else if(M.isPointLight){const T=n.point[d];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){const T=n.hemi[_];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function Vf(i){const e=new k1(i),t=[],n=[],r=[];function s(d){h.camera=d,t.length=0,n.length=0,r.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function H1(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Vf(i),e.set(r,[o])):s>=a.length?(o=new Vf(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const V1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,z1=`uniform sampler2D shadow_pass;
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
}`,G1=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],W1=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],zf=new be,ps=new F,El=new F;function X1(i,e,t){let n=new Nu;const r=new Ze,s=new Ze,a=new nt,o=new wb,l=new Rb,c={},u=t.maxTextureSize,h={[Ai]:on,[on]:Ai,[Kt]:Kt},d=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:V1,fragmentShader:z1}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new Qt;p.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new st(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ga;let m=this.type;this.render=function(E,C,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===Ly&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ga);const A=i.getRenderTarget(),L=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),N=i.state;N.setBlending(ei),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const W=m!==this.type;W&&C.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(O=>O.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,O=E.length;X<O;X++){const k=E[X],z=k.shadow;if(z===void 0){Ae("WebGLShadowMap:",k,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const ee=z.getFrameExtents();r.multiply(ee),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ee.x),r.x=s.x*ee.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ee.y),r.y=s.y*ee.y,z.mapSize.y=s.y));const ne=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=ne,z.map===null||W===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===xs){if(k.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Hn(r.x,r.y,{format:tr,type:ri,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),z.map.texture.name=k.name+".shadowMap",z.map.depthTexture=new $r(r.x,r.y,vn),z.map.depthTexture.name=k.name+".shadowMapDepth",z.map.depthTexture.format=si,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=qt,z.map.depthTexture.magFilter=qt}else k.isPointLight?(z.map=new Ag(r.x),z.map.depthTexture=new tb(r.x,Vn)):(z.map=new Hn(r.x,r.y),z.map.depthTexture=new $r(r.x,r.y,Vn)),z.map.depthTexture.name=k.name+".shadowMap",z.map.depthTexture.format=si,this.type===Ga?(z.map.depthTexture.compareFunction=ne?Cu:Iu,z.map.depthTexture.minFilter=Jt,z.map.depthTexture.magFilter=Jt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=qt,z.map.depthTexture.magFilter=qt);z.camera.updateProjectionMatrix()}const ue=z.map.isWebGLCubeRenderTarget?6:1;for(let Me=0;Me<ue;Me++){if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,Me),i.clear();else{Me===0&&(i.setRenderTarget(z.map),i.clear());const Te=z.getViewport(Me);a.set(s.x*Te.x,s.y*Te.y,s.x*Te.z,s.y*Te.w),N.viewport(a)}if(k.isPointLight){const Te=z.camera,We=z.matrix,it=k.distance||Te.far;it!==Te.far&&(Te.far=it,Te.updateProjectionMatrix()),ps.setFromMatrixPosition(k.matrixWorld),Te.position.copy(ps),El.copy(Te.position),El.add(G1[Me]),Te.up.copy(W1[Me]),Te.lookAt(El),Te.updateMatrixWorld(),We.makeTranslation(-ps.x,-ps.y,-ps.z),zf.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),z._frustum.setFromProjectionMatrix(zf,Te.coordinateSystem,Te.reversedDepth)}else z.updateMatrices(k);n=z.getFrustum(),T(C,v,z.camera,k,this.type)}z.isPointLightShadow!==!0&&this.type===xs&&S(z,v),z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(A,L,I)};function S(E,C){const v=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Hn(r.x,r.y,{format:tr,type:ri})),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,v,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,v,f,_,null)}function M(E,C,v,A){let L=null;const I=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)L=I;else if(L=v.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=L.uuid,W=C.uuid;let X=c[N];X===void 0&&(X={},c[N]=X);let O=X[W];O===void 0&&(O=L.clone(),X[W]=O,C.addEventListener("dispose",w)),L=O}if(L.visible=C.visible,L.wireframe=C.wireframe,A===xs?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:h[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,v.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const N=i.properties.get(L);N.light=v}return L}function T(E,C,v,A,L){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===xs)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const W=e.update(E),X=E.material;if(Array.isArray(X)){const O=W.groups;for(let k=0,z=O.length;k<z;k++){const ee=O[k],ne=X[ee.materialIndex];if(ne&&ne.visible){const ue=M(E,ne,A,L);E.onBeforeShadow(i,E,C,v,W,ue,ee),i.renderBufferDirect(v,null,W,ue,E,ee),E.onAfterShadow(i,E,C,v,W,ue,ee)}}}else if(X.visible){const O=M(E,X,A,L);E.onBeforeShadow(i,E,C,v,W,O,null),i.renderBufferDirect(v,null,W,O,E,null),E.onAfterShadow(i,E,C,v,W,O,null)}}const N=E.children;for(let W=0,X=N.length;W<X;W++)T(N[W],C,v,A,L)}function w(E){E.target.removeEventListener("dispose",w);for(const v in c){const A=c[v],L=E.target.uuid;L in A&&(A[L].dispose(),delete A[L])}}}function Y1(i,e){function t(){let P=!1;const ae=new nt;let q=null;const _e=new nt(0,0,0,0);return{setMask:function(le){q!==le&&!P&&(i.colorMask(le,le,le,le),q=le)},setLocked:function(le){P=le},setClear:function(le,Q,Ee,He,At){At===!0&&(le*=He,Q*=He,Ee*=He),ae.set(le,Q,Ee,He),_e.equals(ae)===!1&&(i.clearColor(le,Q,Ee,He),_e.copy(ae))},reset:function(){P=!1,q=null,_e.set(-1,0,0,0)}}}function n(){let P=!1,ae=!1,q=null,_e=null,le=null;return{setReversed:function(Q){if(ae!==Q){const Ee=e.get("EXT_clip_control");Q?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),ae=Q;const He=le;le=null,this.setClear(He)}},getReversed:function(){return ae},setTest:function(Q){Q?ie(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(Q){q!==Q&&!P&&(i.depthMask(Q),q=Q)},setFunc:function(Q){if(ae&&(Q=dE[Q]),_e!==Q){switch(Q){case lc:i.depthFunc(i.NEVER);break;case cc:i.depthFunc(i.ALWAYS);break;case uc:i.depthFunc(i.LESS);break;case Yr:i.depthFunc(i.LEQUAL);break;case hc:i.depthFunc(i.EQUAL);break;case dc:i.depthFunc(i.GEQUAL);break;case fc:i.depthFunc(i.GREATER);break;case pc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_e=Q}},setLocked:function(Q){P=Q},setClear:function(Q){le!==Q&&(le=Q,ae&&(Q=1-Q),i.clearDepth(Q))},reset:function(){P=!1,q=null,_e=null,le=null,ae=!1}}}function r(){let P=!1,ae=null,q=null,_e=null,le=null,Q=null,Ee=null,He=null,At=null;return{setTest:function(ot){P||(ot?ie(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(ot){ae!==ot&&!P&&(i.stencilMask(ot),ae=ot)},setFunc:function(ot,Xn,Ln){(q!==ot||_e!==Xn||le!==Ln)&&(i.stencilFunc(ot,Xn,Ln),q=ot,_e=Xn,le=Ln)},setOp:function(ot,Xn,Ln){(Q!==ot||Ee!==Xn||He!==Ln)&&(i.stencilOp(ot,Xn,Ln),Q=ot,Ee=Xn,He=Ln)},setLocked:function(ot){P=ot},setClear:function(ot){At!==ot&&(i.clearStencil(ot),At=ot)},reset:function(){P=!1,ae=null,q=null,_e=null,le=null,Q=null,Ee=null,He=null,At=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,S=null,M=null,T=null,w=null,E=null,C=null,v=new Fe(0,0,0),A=0,L=!1,I=null,N=null,W=null,X=null,O=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,ee=0;const ne=i.getParameter(i.VERSION);ne.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(ne)[1]),z=ee>=1):ne.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),z=ee>=2);let ue=null,Me={};const Te=i.getParameter(i.SCISSOR_BOX),We=i.getParameter(i.VIEWPORT),it=new nt().fromArray(Te),De=new nt().fromArray(We);function j(P,ae,q,_e){const le=new Uint8Array(4),Q=i.createTexture();i.bindTexture(P,Q),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ee=0;Ee<q;Ee++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(ae,0,i.RGBA,1,1,_e,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(ae+Ee,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return Q}const he={};he[i.TEXTURE_2D]=j(i.TEXTURE_2D,i.TEXTURE_2D,1),he[i.TEXTURE_CUBE_MAP]=j(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[i.TEXTURE_2D_ARRAY]=j(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),he[i.TEXTURE_3D]=j(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(i.DEPTH_TEST),a.setFunc(Yr),Nt(!1),St(Td),ie(i.CULL_FACE),_t(ei);function ie(P){u[P]!==!0&&(i.enable(P),u[P]=!0)}function Ie(P){u[P]!==!1&&(i.disable(P),u[P]=!1)}function Ue(P,ae){return d[P]!==ae?(i.bindFramebuffer(P,ae),d[P]=ae,P===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ae),P===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ae),!0):!1}function Le(P,ae){let q=p,_e=!1;if(P){q=f.get(ae),q===void 0&&(q=[],f.set(ae,q));const le=P.textures;if(q.length!==le.length||q[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,Ee=le.length;Q<Ee;Q++)q[Q]=i.COLOR_ATTACHMENT0+Q;q.length=le.length,_e=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,_e=!0);_e&&i.drawBuffers(q)}function dt(P){return _!==P?(i.useProgram(P),_=P,!0):!1}const Ye={[Wi]:i.FUNC_ADD,[Dy]:i.FUNC_SUBTRACT,[Fy]:i.FUNC_REVERSE_SUBTRACT};Ye[Uy]=i.MIN,Ye[Ny]=i.MAX;const at={[Oy]:i.ZERO,[By]:i.ONE,[ky]:i.SRC_COLOR,[ac]:i.SRC_ALPHA,[Xy]:i.SRC_ALPHA_SATURATE,[Gy]:i.DST_COLOR,[Vy]:i.DST_ALPHA,[Hy]:i.ONE_MINUS_SRC_COLOR,[oc]:i.ONE_MINUS_SRC_ALPHA,[Wy]:i.ONE_MINUS_DST_COLOR,[zy]:i.ONE_MINUS_DST_ALPHA,[Yy]:i.CONSTANT_COLOR,[Ky]:i.ONE_MINUS_CONSTANT_COLOR,[qy]:i.CONSTANT_ALPHA,[$y]:i.ONE_MINUS_CONSTANT_ALPHA};function _t(P,ae,q,_e,le,Q,Ee,He,At,ot){if(P===ei){g===!0&&(Ie(i.BLEND),g=!1);return}if(g===!1&&(ie(i.BLEND),g=!0),P!==Py){if(P!==m||ot!==L){if((S!==Wi||w!==Wi)&&(i.blendEquation(i.FUNC_ADD),S=Wi,w=Wi),ot)switch(P){case Ei:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yd:i.blendFunc(i.ONE,i.ONE);break;case Ed:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case bd:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Pe("WebGLState: Invalid blending: ",P);break}else switch(P){case Ei:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yd:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ed:Pe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bd:Pe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pe("WebGLState: Invalid blending: ",P);break}M=null,T=null,E=null,C=null,v.set(0,0,0),A=0,m=P,L=ot}return}le=le||ae,Q=Q||q,Ee=Ee||_e,(ae!==S||le!==w)&&(i.blendEquationSeparate(Ye[ae],Ye[le]),S=ae,w=le),(q!==M||_e!==T||Q!==E||Ee!==C)&&(i.blendFuncSeparate(at[q],at[_e],at[Q],at[Ee]),M=q,T=_e,E=Q,C=Ee),(He.equals(v)===!1||At!==A)&&(i.blendColor(He.r,He.g,He.b,At),v.copy(He),A=At),m=P,L=!1}function $e(P,ae){P.side===Kt?Ie(i.CULL_FACE):ie(i.CULL_FACE);let q=P.side===on;ae&&(q=!q),Nt(q),P.blending===Ei&&P.transparent===!1?_t(ei):_t(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const _e=P.stencilWrite;o.setTest(_e),_e&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),D(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function Nt(P){I!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),I=P)}function St(P){P!==Iy?(ie(i.CULL_FACE),P!==N&&(P===Td?i.cullFace(i.BACK):P===Cy?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),N=P}function cn(P){P!==W&&(z&&i.lineWidth(P),W=P)}function D(P,ae,q){P?(ie(i.POLYGON_OFFSET_FILL),(X!==ae||O!==q)&&(X=ae,O=q,a.getReversed()&&(ae=-ae),i.polygonOffset(ae,q))):Ie(i.POLYGON_OFFSET_FILL)}function Ot(P){P?ie(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function je(P){P===void 0&&(P=i.TEXTURE0+k-1),ue!==P&&(i.activeTexture(P),ue=P)}function ft(P,ae,q){q===void 0&&(ue===null?q=i.TEXTURE0+k-1:q=ue);let _e=Me[q];_e===void 0&&(_e={type:void 0,texture:void 0},Me[q]=_e),(_e.type!==P||_e.texture!==ae)&&(ue!==q&&(i.activeTexture(q),ue=q),i.bindTexture(P,ae||he[P]),_e.type=P,_e.texture=ae)}function de(){const P=Me[ue];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function yt(){try{i.compressedTexImage2D(...arguments)}catch(P){Pe("WebGLState:",P)}}function b(){try{i.compressedTexImage3D(...arguments)}catch(P){Pe("WebGLState:",P)}}function x(){try{i.texSubImage2D(...arguments)}catch(P){Pe("WebGLState:",P)}}function B(){try{i.texSubImage3D(...arguments)}catch(P){Pe("WebGLState:",P)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(P){Pe("WebGLState:",P)}}function te(){try{i.compressedTexSubImage3D(...arguments)}catch(P){Pe("WebGLState:",P)}}function re(){try{i.texStorage2D(...arguments)}catch(P){Pe("WebGLState:",P)}}function ce(){try{i.texStorage3D(...arguments)}catch(P){Pe("WebGLState:",P)}}function K(){try{i.texImage2D(...arguments)}catch(P){Pe("WebGLState:",P)}}function Z(){try{i.texImage3D(...arguments)}catch(P){Pe("WebGLState:",P)}}function ge(P){return h[P]!==void 0?h[P]:i.getParameter(P)}function ve(P,ae){h[P]!==ae&&(i.pixelStorei(P,ae),h[P]=ae)}function oe(P){it.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),it.copy(P))}function se(P){De.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),De.copy(P))}function Ne(P,ae){let q=c.get(ae);q===void 0&&(q=new WeakMap,c.set(ae,q));let _e=q.get(P);_e===void 0&&(_e=i.getUniformBlockIndex(ae,P.name),q.set(P,_e))}function Ge(P,ae){const _e=c.get(ae).get(P);l.get(ae)!==_e&&(i.uniformBlockBinding(ae,_e,P.__bindingPointIndex),l.set(ae,_e))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},h={},ue=null,Me={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,S=null,M=null,T=null,w=null,E=null,C=null,v=new Fe(0,0,0),A=0,L=!1,I=null,N=null,W=null,X=null,O=null,it.set(0,0,i.canvas.width,i.canvas.height),De.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ie,disable:Ie,bindFramebuffer:Ue,drawBuffers:Le,useProgram:dt,setBlending:_t,setMaterial:$e,setFlipSided:Nt,setCullFace:St,setLineWidth:cn,setPolygonOffset:D,setScissorTest:Ot,activeTexture:je,bindTexture:ft,unbindTexture:de,compressedTexImage2D:yt,compressedTexImage3D:b,texImage2D:K,texImage3D:Z,pixelStorei:ve,getParameter:ge,updateUBOMapping:Ne,uniformBlockBinding:Ge,texStorage2D:re,texStorage3D:ce,texSubImage2D:x,texSubImage3D:B,compressedTexSubImage2D:$,compressedTexSubImage3D:te,scissor:oe,viewport:se,reset:tt}}function K1(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ze,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,x){return p?new OffscreenCanvas(b,x):Os("canvas")}function g(b,x,B){let $=1;const te=yt(b);if((te.width>B||te.height>B)&&($=B/Math.max(te.width,te.height)),$<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const re=Math.floor($*te.width),ce=Math.floor($*te.height);d===void 0&&(d=_(re,ce));const K=x?_(re,ce):d;return K.width=re,K.height=ce,K.getContext("2d").drawImage(b,0,0,re,ce),Ae("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+re+"x"+ce+")."),K}else return"data"in b&&Ae("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),b;return b}function m(b){return b.generateMipmaps}function S(b){i.generateMipmap(b)}function M(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(b,x,B,$,te,re=!1){if(b!==null){if(i[b]!==void 0)return i[b];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ce;$&&(ce=e.get("EXT_texture_norm16"),ce||Ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=x;if(x===i.RED&&(B===i.FLOAT&&(K=i.R32F),B===i.HALF_FLOAT&&(K=i.R16F),B===i.UNSIGNED_BYTE&&(K=i.R8),B===i.UNSIGNED_SHORT&&ce&&(K=ce.R16_EXT),B===i.SHORT&&ce&&(K=ce.R16_SNORM_EXT)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.R8UI),B===i.UNSIGNED_SHORT&&(K=i.R16UI),B===i.UNSIGNED_INT&&(K=i.R32UI),B===i.BYTE&&(K=i.R8I),B===i.SHORT&&(K=i.R16I),B===i.INT&&(K=i.R32I)),x===i.RG&&(B===i.FLOAT&&(K=i.RG32F),B===i.HALF_FLOAT&&(K=i.RG16F),B===i.UNSIGNED_BYTE&&(K=i.RG8),B===i.UNSIGNED_SHORT&&ce&&(K=ce.RG16_EXT),B===i.SHORT&&ce&&(K=ce.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RG8UI),B===i.UNSIGNED_SHORT&&(K=i.RG16UI),B===i.UNSIGNED_INT&&(K=i.RG32UI),B===i.BYTE&&(K=i.RG8I),B===i.SHORT&&(K=i.RG16I),B===i.INT&&(K=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGB8UI),B===i.UNSIGNED_SHORT&&(K=i.RGB16UI),B===i.UNSIGNED_INT&&(K=i.RGB32UI),B===i.BYTE&&(K=i.RGB8I),B===i.SHORT&&(K=i.RGB16I),B===i.INT&&(K=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),B===i.UNSIGNED_INT&&(K=i.RGBA32UI),B===i.BYTE&&(K=i.RGBA8I),B===i.SHORT&&(K=i.RGBA16I),B===i.INT&&(K=i.RGBA32I)),x===i.RGB&&(B===i.UNSIGNED_SHORT&&ce&&(K=ce.RGB16_EXT),B===i.SHORT&&ce&&(K=ce.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),x===i.RGBA){const Z=re?oo:Be.getTransfer(te);B===i.FLOAT&&(K=i.RGBA32F),B===i.HALF_FLOAT&&(K=i.RGBA16F),B===i.UNSIGNED_BYTE&&(K=Z===rt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ce&&(K=ce.RGBA16_EXT),B===i.SHORT&&ce&&(K=ce.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function w(b,x){let B;return b?x===null||x===Vn||x===Fs?B=i.DEPTH24_STENCIL8:x===vn?B=i.DEPTH32F_STENCIL8:x===Ds&&(B=i.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Vn||x===Fs?B=i.DEPTH_COMPONENT24:x===vn?B=i.DEPTH_COMPONENT32F:x===Ds&&(B=i.DEPTH_COMPONENT16),B}function E(b,x){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==qt&&b.minFilter!==Jt?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function C(b){const x=b.target;x.removeEventListener("dispose",C),A(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&h.delete(x)}function v(b){const x=b.target;x.removeEventListener("dispose",v),I(x)}function A(b){const x=n.get(b);if(x.__webglInit===void 0)return;const B=b.source,$=f.get(B);if($){const te=$[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&L(b),Object.keys($).length===0&&f.delete(B)}n.remove(b)}function L(b){const x=n.get(b);i.deleteTexture(x.__webglTexture);const B=b.source,$=f.get(B);delete $[x.__cacheKey],a.memory.textures--}function I(b){const x=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(x.__webglFramebuffer[$]))for(let te=0;te<x.__webglFramebuffer[$].length;te++)i.deleteFramebuffer(x.__webglFramebuffer[$][te]);else i.deleteFramebuffer(x.__webglFramebuffer[$]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[$])}else{if(Array.isArray(x.__webglFramebuffer))for(let $=0;$<x.__webglFramebuffer.length;$++)i.deleteFramebuffer(x.__webglFramebuffer[$]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let $=0;$<x.__webglColorRenderbuffer.length;$++)x.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const B=b.textures;for(let $=0,te=B.length;$<te;$++){const re=n.get(B[$]);re.__webglTexture&&(i.deleteTexture(re.__webglTexture),a.memory.textures--),n.remove(B[$])}n.remove(b)}let N=0;function W(){N=0}function X(){return N}function O(b){N=b}function k(){const b=N;return b>=r.maxTextures&&Ae("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),N+=1,b}function z(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function ee(b,x){const B=n.get(b);if(b.isVideoTexture&&ft(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&B.__version!==b.version){const $=b.image;if($===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(B,b,x);return}}else b.isExternalTexture&&(B.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function ne(b,x){const B=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version){Ie(B,b,x);return}else b.isExternalTexture&&(B.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function ue(b,x){const B=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version){Ie(B,b,x);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function Me(b,x){const B=n.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&B.__version!==b.version){Ue(B,b,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}const Te={[Ps]:i.REPEAT,[rn]:i.CLAMP_TO_EDGE,[mc]:i.MIRRORED_REPEAT},We={[qt]:i.NEAREST,[Qy]:i.NEAREST_MIPMAP_NEAREST,[la]:i.NEAREST_MIPMAP_LINEAR,[Jt]:i.LINEAR,[Xo]:i.LINEAR_MIPMAP_NEAREST,[qi]:i.LINEAR_MIPMAP_LINEAR},it={[iE]:i.NEVER,[lE]:i.ALWAYS,[rE]:i.LESS,[Iu]:i.LEQUAL,[sE]:i.EQUAL,[Cu]:i.GEQUAL,[aE]:i.GREATER,[oE]:i.NOTEQUAL};function De(b,x){if(x.type===vn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Jt||x.magFilter===Xo||x.magFilter===la||x.magFilter===qi||x.minFilter===Jt||x.minFilter===Xo||x.minFilter===la||x.minFilter===qi)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,Te[x.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,Te[x.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,Te[x.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,We[x.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,We[x.minFilter]),x.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,it[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===qt||x.minFilter!==la&&x.minFilter!==qi||x.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function j(b,x){let B=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",C));const $=x.source;let te=f.get($);te===void 0&&(te={},f.set($,te));const re=z(x);if(re!==b.__cacheKey){te[re]===void 0&&(te[re]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),te[re].usedTimes++;const ce=te[b.__cacheKey];ce!==void 0&&(te[b.__cacheKey].usedTimes--,ce.usedTimes===0&&L(x)),b.__cacheKey=re,b.__webglTexture=te[re].texture}return B}function he(b,x,B){return Math.floor(Math.floor(b/B)/x)}function ie(b,x,B,$){const re=b.updateRanges;if(re.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,B,$,x.data);else{re.sort((ve,oe)=>ve.start-oe.start);let ce=0;for(let ve=1;ve<re.length;ve++){const oe=re[ce],se=re[ve],Ne=oe.start+oe.count,Ge=he(se.start,x.width,4),tt=he(oe.start,x.width,4);se.start<=Ne+1&&Ge===tt&&he(se.start+se.count-1,x.width,4)===Ge?oe.count=Math.max(oe.count,se.start+se.count-oe.start):(++ce,re[ce]=se)}re.length=ce+1;const K=t.getParameter(i.UNPACK_ROW_LENGTH),Z=t.getParameter(i.UNPACK_SKIP_PIXELS),ge=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let ve=0,oe=re.length;ve<oe;ve++){const se=re[ve],Ne=Math.floor(se.start/4),Ge=Math.ceil(se.count/4),tt=Ne%x.width,P=Math.floor(Ne/x.width),ae=Ge,q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),t.pixelStorei(i.UNPACK_SKIP_ROWS,P),t.texSubImage2D(i.TEXTURE_2D,0,tt,P,ae,q,B,$,x.data)}b.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,K),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(i.UNPACK_SKIP_ROWS,ge)}}function Ie(b,x,B){let $=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&($=i.TEXTURE_3D);const te=j(b,x),re=x.source;t.bindTexture($,b.__webglTexture,i.TEXTURE0+B);const ce=n.get(re);if(re.version!==ce.__version||te===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const q=Be.getPrimaries(Be.workingColorSpace),_e=x.colorSpace===Mi?null:Be.getPrimaries(x.colorSpace),le=x.colorSpace===Mi||q===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,le)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let Z=g(x.image,!1,r.maxTextureSize);Z=de(x,Z);const ge=s.convert(x.format,x.colorSpace),ve=s.convert(x.type);let oe=T(x.internalFormat,ge,ve,x.normalized,x.colorSpace,x.isVideoTexture);De($,x);let se;const Ne=x.mipmaps,Ge=x.isVideoTexture!==!0,tt=ce.__version===void 0||te===!0,P=re.dataReady,ae=E(x,Z);if(x.isDepthTexture)oe=w(x.format===$i,x.type),tt&&(Ge?t.texStorage2D(i.TEXTURE_2D,1,oe,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,oe,Z.width,Z.height,0,ge,ve,null));else if(x.isDataTexture)if(Ne.length>0){Ge&&tt&&t.texStorage2D(i.TEXTURE_2D,ae,oe,Ne[0].width,Ne[0].height);for(let q=0,_e=Ne.length;q<_e;q++)se=Ne[q],Ge?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,se.width,se.height,ge,ve,se.data):t.texImage2D(i.TEXTURE_2D,q,oe,se.width,se.height,0,ge,ve,se.data);x.generateMipmaps=!1}else Ge?(tt&&t.texStorage2D(i.TEXTURE_2D,ae,oe,Z.width,Z.height),P&&ie(x,Z,ge,ve)):t.texImage2D(i.TEXTURE_2D,0,oe,Z.width,Z.height,0,ge,ve,Z.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ge&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ae,oe,Ne[0].width,Ne[0].height,Z.depth);for(let q=0,_e=Ne.length;q<_e;q++)if(se=Ne[q],x.format!==pn)if(ge!==null)if(Ge){if(P)if(x.layerUpdates.size>0){const le=vf(se.width,se.height,x.format,x.type);for(const Q of x.layerUpdates){const Ee=se.data.subarray(Q*le/se.data.BYTES_PER_ELEMENT,(Q+1)*le/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,Q,se.width,se.height,1,ge,Ee)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,se.width,se.height,Z.depth,ge,se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,oe,se.width,se.height,Z.depth,0,se.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?P&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,se.width,se.height,Z.depth,ge,ve,se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,oe,se.width,se.height,Z.depth,0,ge,ve,se.data)}else{Ge&&tt&&t.texStorage2D(i.TEXTURE_2D,ae,oe,Ne[0].width,Ne[0].height);for(let q=0,_e=Ne.length;q<_e;q++)se=Ne[q],x.format!==pn?ge!==null?Ge?P&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,se.width,se.height,ge,se.data):t.compressedTexImage2D(i.TEXTURE_2D,q,oe,se.width,se.height,0,se.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,se.width,se.height,ge,ve,se.data):t.texImage2D(i.TEXTURE_2D,q,oe,se.width,se.height,0,ge,ve,se.data)}else if(x.isDataArrayTexture)if(Ge){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ae,oe,Z.width,Z.height,Z.depth),P)if(x.layerUpdates.size>0){const q=vf(Z.width,Z.height,x.format,x.type);for(const _e of x.layerUpdates){const le=Z.data.subarray(_e*q/Z.data.BYTES_PER_ELEMENT,(_e+1)*q/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,_e,Z.width,Z.height,1,ge,ve,le)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ge,ve,Z.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,oe,Z.width,Z.height,Z.depth,0,ge,ve,Z.data);else if(x.isData3DTexture)Ge?(tt&&t.texStorage3D(i.TEXTURE_3D,ae,oe,Z.width,Z.height,Z.depth),P&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ge,ve,Z.data)):t.texImage3D(i.TEXTURE_3D,0,oe,Z.width,Z.height,Z.depth,0,ge,ve,Z.data);else if(x.isFramebufferTexture){if(tt)if(Ge)t.texStorage2D(i.TEXTURE_2D,ae,oe,Z.width,Z.height);else{let q=Z.width,_e=Z.height;for(let le=0;le<ae;le++)t.texImage2D(i.TEXTURE_2D,le,oe,q,_e,0,ge,ve,null),q>>=1,_e>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const q=i.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),Z.parentNode!==q){q.appendChild(Z),h.add(x),q.onpaint=He=>{const At=He.changedElements;for(const ot of h)At.includes(ot.image)&&(ot.needsUpdate=!0)},q.requestPaint();return}const _e=0,le=i.RGBA,Q=i.RGBA,Ee=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,_e,le,Q,Ee,Z),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(Ge&&tt){const q=yt(Ne[0]);t.texStorage2D(i.TEXTURE_2D,ae,oe,q.width,q.height)}for(let q=0,_e=Ne.length;q<_e;q++)se=Ne[q],Ge?P&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ge,ve,se):t.texImage2D(i.TEXTURE_2D,q,oe,ge,ve,se);x.generateMipmaps=!1}else if(Ge){if(tt){const q=yt(Z);t.texStorage2D(i.TEXTURE_2D,ae,oe,q.width,q.height)}P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,ve,Z)}else t.texImage2D(i.TEXTURE_2D,0,oe,ge,ve,Z);m(x)&&S($),ce.__version=re.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function Ue(b,x,B){if(x.image.length!==6)return;const $=j(b,x),te=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+B);const re=n.get(te);if(te.version!==re.__version||$===!0){t.activeTexture(i.TEXTURE0+B);const ce=Be.getPrimaries(Be.workingColorSpace),K=x.colorSpace===Mi?null:Be.getPrimaries(x.colorSpace),Z=x.colorSpace===Mi||ce===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const ge=x.isCompressedTexture||x.image[0].isCompressedTexture,ve=x.image[0]&&x.image[0].isDataTexture,oe=[];for(let Q=0;Q<6;Q++)!ge&&!ve?oe[Q]=g(x.image[Q],!0,r.maxCubemapSize):oe[Q]=ve?x.image[Q].image:x.image[Q],oe[Q]=de(x,oe[Q]);const se=oe[0],Ne=s.convert(x.format,x.colorSpace),Ge=s.convert(x.type),tt=T(x.internalFormat,Ne,Ge,x.normalized,x.colorSpace),P=x.isVideoTexture!==!0,ae=re.__version===void 0||$===!0,q=te.dataReady;let _e=E(x,se);De(i.TEXTURE_CUBE_MAP,x);let le;if(ge){P&&ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,tt,se.width,se.height);for(let Q=0;Q<6;Q++){le=oe[Q].mipmaps;for(let Ee=0;Ee<le.length;Ee++){const He=le[Ee];x.format!==pn?Ne!==null?P?q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,0,0,He.width,He.height,Ne,He.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,tt,He.width,He.height,0,He.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,0,0,He.width,He.height,Ne,Ge,He.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,tt,He.width,He.height,0,Ne,Ge,He.data)}}}else{if(le=x.mipmaps,P&&ae){le.length>0&&_e++;const Q=yt(oe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,tt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ve){P?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,oe[Q].width,oe[Q].height,Ne,Ge,oe[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,tt,oe[Q].width,oe[Q].height,0,Ne,Ge,oe[Q].data);for(let Ee=0;Ee<le.length;Ee++){const At=le[Ee].image[Q].image;P?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,0,0,At.width,At.height,Ne,Ge,At.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,tt,At.width,At.height,0,Ne,Ge,At.data)}}else{P?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ne,Ge,oe[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,tt,Ne,Ge,oe[Q]);for(let Ee=0;Ee<le.length;Ee++){const He=le[Ee];P?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,0,0,Ne,Ge,He.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,tt,Ne,Ge,He.image[Q])}}}m(x)&&S(i.TEXTURE_CUBE_MAP),re.__version=te.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function Le(b,x,B,$,te,re){const ce=s.convert(B.format,B.colorSpace),K=s.convert(B.type),Z=T(B.internalFormat,ce,K,B.normalized,B.colorSpace),ge=n.get(x),ve=n.get(B);if(ve.__renderTarget=x,!ge.__hasExternalTextures){const oe=Math.max(1,x.width>>re),se=Math.max(1,x.height>>re);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,re,Z,oe,se,x.depth,0,ce,K,null):t.texImage2D(te,re,Z,oe,se,0,ce,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),je(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,te,ve.__webglTexture,0,Ot(x)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,te,ve.__webglTexture,re),t.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(b,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,b),x.depthBuffer){const $=x.depthTexture,te=$&&$.isDepthTexture?$.type:null,re=w(x.stencilBuffer,te),ce=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;je(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ot(x),re,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ot(x),re,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,re,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,b)}else{const $=x.textures;for(let te=0;te<$.length;te++){const re=$[te],ce=s.convert(re.format,re.colorSpace),K=s.convert(re.type),Z=T(re.internalFormat,ce,K,re.normalized,re.colorSpace);je(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ot(x),Z,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ot(x),Z,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Z,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ye(b,x,B){const $=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(x.depthTexture);if(te.__renderTarget=x,(!te.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),$){if(te.__webglInit===void 0&&(te.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),De(i.TEXTURE_CUBE_MAP,x.depthTexture);const ge=s.convert(x.depthTexture.format),ve=s.convert(x.depthTexture.type);let oe;x.depthTexture.format===si?oe=i.DEPTH_COMPONENT24:x.depthTexture.format===$i&&(oe=i.DEPTH24_STENCIL8);for(let se=0;se<6;se++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,oe,x.width,x.height,0,ge,ve,null)}}else ee(x.depthTexture,0);const re=te.__webglTexture,ce=Ot(x),K=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,Z=x.depthTexture.format===$i?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===si)je(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,K,re,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,Z,K,re,0);else if(x.depthTexture.format===$i)je(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,K,re,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,Z,K,re,0);else throw new Error("Unknown depthTexture format")}function at(b){const x=n.get(b),B=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const $=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),$){const te=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,$.removeEventListener("dispose",te)};$.addEventListener("dispose",te),x.__depthDisposeCallback=te}x.__boundDepthTexture=$}if(b.depthTexture&&!x.__autoAllocateDepthBuffer)if(B)for(let $=0;$<6;$++)Ye(x.__webglFramebuffer[$],b,$);else{const $=b.texture.mipmaps;$&&$.length>0?Ye(x.__webglFramebuffer[0],b,0):Ye(x.__webglFramebuffer,b,0)}else if(B){x.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[$]),x.__webglDepthbuffer[$]===void 0)x.__webglDepthbuffer[$]=i.createRenderbuffer(),dt(x.__webglDepthbuffer[$],b,!1);else{const te=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=x.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,re)}}else{const $=b.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),dt(x.__webglDepthbuffer,b,!1);else{const te=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,re)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function _t(b,x,B){const $=n.get(b);x!==void 0&&Le($.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&at(b)}function $e(b){const x=b.texture,B=n.get(b),$=n.get(x);b.addEventListener("dispose",v);const te=b.textures,re=b.isWebGLCubeRenderTarget===!0,ce=te.length>1;if(ce||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=x.version,a.memory.textures++),re){B.__webglFramebuffer=[];for(let K=0;K<6;K++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[K]=[];for(let Z=0;Z<x.mipmaps.length;Z++)B.__webglFramebuffer[K][Z]=i.createFramebuffer()}else B.__webglFramebuffer[K]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let K=0;K<x.mipmaps.length;K++)B.__webglFramebuffer[K]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ce)for(let K=0,Z=te.length;K<Z;K++){const ge=n.get(te[K]);ge.__webglTexture===void 0&&(ge.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&je(b)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let K=0;K<te.length;K++){const Z=te[K];B.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[K]);const ge=s.convert(Z.format,Z.colorSpace),ve=s.convert(Z.type),oe=T(Z.internalFormat,ge,ve,Z.normalized,Z.colorSpace,b.isXRRenderTarget===!0),se=Ot(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,se,oe,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,B.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),dt(B.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(re){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),De(i.TEXTURE_CUBE_MAP,x);for(let K=0;K<6;K++)if(x.mipmaps&&x.mipmaps.length>0)for(let Z=0;Z<x.mipmaps.length;Z++)Le(B.__webglFramebuffer[K][Z],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Z);else Le(B.__webglFramebuffer[K],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);m(x)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let K=0,Z=te.length;K<Z;K++){const ge=te[K],ve=n.get(ge);let oe=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(oe=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,ve.__webglTexture),De(oe,ge),Le(B.__webglFramebuffer,b,ge,i.COLOR_ATTACHMENT0+K,oe,0),m(ge)&&S(oe)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(K=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,$.__webglTexture),De(K,x),x.mipmaps&&x.mipmaps.length>0)for(let Z=0;Z<x.mipmaps.length;Z++)Le(B.__webglFramebuffer[Z],b,x,i.COLOR_ATTACHMENT0,K,Z);else Le(B.__webglFramebuffer,b,x,i.COLOR_ATTACHMENT0,K,0);m(x)&&S(K),t.unbindTexture()}b.depthBuffer&&at(b)}function Nt(b){const x=b.textures;for(let B=0,$=x.length;B<$;B++){const te=x[B];if(m(te)){const re=M(b),ce=n.get(te).__webglTexture;t.bindTexture(re,ce),S(re),t.unbindTexture()}}}const St=[],cn=[];function D(b){if(b.samples>0){if(je(b)===!1){const x=b.textures,B=b.width,$=b.height;let te=i.COLOR_BUFFER_BIT;const re=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(b),K=x.length>1;if(K)for(let ge=0;ge<x.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const Z=b.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let ge=0;ge<x.length;ge++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[ge]);const ve=n.get(x[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ve,0)}i.blitFramebuffer(0,0,B,$,0,0,B,$,te,i.NEAREST),l===!0&&(St.length=0,cn.length=0,St.push(i.COLOR_ATTACHMENT0+ge),b.depthBuffer&&b.resolveDepthBuffer===!1&&(St.push(re),cn.push(re),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,cn)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,St))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let ge=0;ge<x.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,ce.__webglColorRenderbuffer[ge]);const ve=n.get(x[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const x=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Ot(b){return Math.min(r.maxSamples,b.samples)}function je(b){const x=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ft(b){const x=a.render.frame;u.get(b)!==x&&(u.set(b,x),b.update())}function de(b,x){const B=b.colorSpace,$=b.format,te=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||B!==ao&&B!==Mi&&(Be.getTransfer(B)===rt?($!==pn||te!==fn)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pe("WebGLTextures: Unsupported texture color space:",B)),x}function yt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=W,this.getTextureUnits=X,this.setTextureUnits=O,this.setTexture2D=ee,this.setTexture2DArray=ne,this.setTexture3D=ue,this.setTextureCube=Me,this.rebindTextures=_t,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=Nt,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function q1(i,e){function t(n,r=Mi){let s;const a=Be.getTransfer(r);if(n===fn)return i.UNSIGNED_BYTE;if(n===Tu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$m)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===jm)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Km)return i.BYTE;if(n===qm)return i.SHORT;if(n===Ds)return i.UNSIGNED_SHORT;if(n===Mu)return i.INT;if(n===Vn)return i.UNSIGNED_INT;if(n===vn)return i.FLOAT;if(n===ri)return i.HALF_FLOAT;if(n===Zm)return i.ALPHA;if(n===Jm)return i.RGB;if(n===pn)return i.RGBA;if(n===si)return i.DEPTH_COMPONENT;if(n===$i)return i.DEPTH_STENCIL;if(n===Eu)return i.RED;if(n===bu)return i.RED_INTEGER;if(n===tr)return i.RG;if(n===Au)return i.RG_INTEGER;if(n===wu)return i.RGBA_INTEGER;if(n===Xa||n===Ya||n===Ka||n===qa)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Xa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ya)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ka)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Xa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ya)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ka)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qa)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===gc||n===_c||n===xc||n===vc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===gc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_c)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sc||n===Mc||n===Tc||n===yc||n===Ec||n===to||n===bc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Sc||n===Mc)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Tc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===yc)return s.COMPRESSED_R11_EAC;if(n===Ec)return s.COMPRESSED_SIGNED_R11_EAC;if(n===to)return s.COMPRESSED_RG11_EAC;if(n===bc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ac||n===wc||n===Rc||n===Ic||n===Cc||n===Lc||n===Pc||n===Dc||n===Fc||n===Uc||n===Nc||n===Oc||n===Bc||n===kc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ac)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Rc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ic)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Cc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Lc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Dc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===kc)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Hc||n===Vc||n===zc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Hc)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gc||n===Wc||n===no||n===Xc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Gc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Wc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===no)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Fs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const $1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,j1=`
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

}`;class Z1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new dg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Gn({vertexShader:$1,fragmentShader:j1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new Wn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class J1 extends Ri{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,p=null;const _=typeof XRWebGLBinding<"u",g=new Z1,m={},S=t.getContextAttributes();let M=null,T=null;const w=[],E=[],C=new Ze;let v=null;const A=new sn;A.viewport=new nt;const L=new sn;L.viewport=new nt;const I=[A,L],N=new $b;let W=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let he=w[j];return he===void 0&&(he=new Jo,w[j]=he),he.getTargetRaySpace()},this.getControllerGrip=function(j){let he=w[j];return he===void 0&&(he=new Jo,w[j]=he),he.getGripSpace()},this.getHand=function(j){let he=w[j];return he===void 0&&(he=new Jo,w[j]=he),he.getHandSpace()};function O(j){const he=E.indexOf(j.inputSource);if(he===-1)return;const ie=w[he];ie!==void 0&&(ie.update(j.inputSource,j.frame,c||a),ie.dispatchEvent({type:j.type,data:j.inputSource}))}function k(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",z);for(let j=0;j<w.length;j++){const he=E[j];he!==null&&(E[j]=null,w[j].disconnect(he))}W=null,X=null,g.reset();for(const j in m)delete m[j];e.setRenderTarget(M),f=null,d=null,h=null,r=null,T=null,De.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",k),r.addEventListener("inputsourceschange",z),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Ie=null,Ue=null;S.depth&&(Ue=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=S.stencil?$i:si,Ie=S.stencil?Fs:Vn);const Le={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Le),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new Hn(d.textureWidth,d.textureHeight,{format:pn,type:fn,depthTexture:new $r(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ie={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),T=new Hn(f.framebufferWidth,f.framebufferHeight,{format:pn,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),De.setContext(r),De.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(j){for(let he=0;he<j.removed.length;he++){const ie=j.removed[he],Ie=E.indexOf(ie);Ie>=0&&(E[Ie]=null,w[Ie].disconnect(ie))}for(let he=0;he<j.added.length;he++){const ie=j.added[he];let Ie=E.indexOf(ie);if(Ie===-1){for(let Le=0;Le<w.length;Le++)if(Le>=E.length){E.push(ie),Ie=Le;break}else if(E[Le]===null){E[Le]=ie,Ie=Le;break}if(Ie===-1)break}const Ue=w[Ie];Ue&&Ue.connect(ie)}}const ee=new F,ne=new F;function ue(j,he,ie){ee.setFromMatrixPosition(he.matrixWorld),ne.setFromMatrixPosition(ie.matrixWorld);const Ie=ee.distanceTo(ne),Ue=he.projectionMatrix.elements,Le=ie.projectionMatrix.elements,dt=Ue[14]/(Ue[10]-1),Ye=Ue[14]/(Ue[10]+1),at=(Ue[9]+1)/Ue[5],_t=(Ue[9]-1)/Ue[5],$e=(Ue[8]-1)/Ue[0],Nt=(Le[8]+1)/Le[0],St=dt*$e,cn=dt*Nt,D=Ie/(-$e+Nt),Ot=D*-$e;if(he.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ot),j.translateZ(D),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Ue[10]===-1)j.projectionMatrix.copy(he.projectionMatrix),j.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{const je=dt+D,ft=Ye+D,de=St-Ot,yt=cn+(Ie-Ot),b=at*Ye/ft*je,x=_t*Ye/ft*je;j.projectionMatrix.makePerspective(de,yt,b,x,je,ft),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Me(j,he){he===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(he.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let he=j.near,ie=j.far;g.texture!==null&&(g.depthNear>0&&(he=g.depthNear),g.depthFar>0&&(ie=g.depthFar)),N.near=L.near=A.near=he,N.far=L.far=A.far=ie,(W!==N.near||X!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),W=N.near,X=N.far),N.layers.mask=j.layers.mask|6,A.layers.mask=N.layers.mask&-5,L.layers.mask=N.layers.mask&-3;const Ie=j.parent,Ue=N.cameras;Me(N,Ie);for(let Le=0;Le<Ue.length;Le++)Me(Ue[Le],Ie);Ue.length===2?ue(N,A,L):N.projectionMatrix.copy(A.projectionMatrix),Te(j,N,Ie)};function Te(j,he,ie){ie===null?j.matrix.copy(he.matrixWorld):(j.matrix.copy(ie.matrixWorld),j.matrix.invert(),j.matrix.multiply(he.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(he.projectionMatrix),j.projectionMatrixInverse.copy(he.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=qr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(j){return m[j]};let We=null;function it(j,he){if(u=he.getViewerPose(c||a),p=he,u!==null){const ie=u.views;f!==null&&(e.setRenderTargetFramebuffer(T,f.framebuffer),e.setRenderTarget(T));let Ie=!1;ie.length!==N.cameras.length&&(N.cameras.length=0,Ie=!0);for(let Ye=0;Ye<ie.length;Ye++){const at=ie[Ye];let _t=null;if(f!==null)_t=f.getViewport(at);else{const Nt=h.getViewSubImage(d,at);_t=Nt.viewport,Ye===0&&(e.setRenderTargetTextures(T,Nt.colorTexture,Nt.depthStencilTexture),e.setRenderTarget(T))}let $e=I[Ye];$e===void 0&&($e=new sn,$e.layers.enable(Ye),$e.viewport=new nt,I[Ye]=$e),$e.matrix.fromArray(at.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(at.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(_t.x,_t.y,_t.width,_t.height),Ye===0&&(N.matrix.copy($e.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ie===!0&&N.cameras.push($e)}const Ue=r.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const Ye=h.getDepthInformation(ie[0]);Ye&&Ye.isValid&&Ye.texture&&g.init(Ye,r.renderState)}if(Ue&&Ue.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let Ye=0;Ye<ie.length;Ye++){const at=ie[Ye].camera;if(at){let _t=m[at];_t||(_t=new dg,m[at]=_t);const $e=h.getCameraImage(at);_t.sourceTexture=$e}}}}for(let ie=0;ie<w.length;ie++){const Ie=E[ie],Ue=w[ie];Ie!==null&&Ue!==void 0&&Ue.update(Ie,he,c||a)}We&&We(j,he),he.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:he}),p=null}const De=new Eg;De.setAnimationLoop(it),this.setAnimationLoop=function(j){We=j},this.dispose=function(){}}}const Q1=new be,Lg=new Oe;Lg.set(-1,0,0,0,1,0,0,0,1);function eC(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,_g(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,S,M,T){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),h(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,T)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,S,M):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===on&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===on&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const S=e.get(m),M=S.envMap,T=S.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(Q1.makeRotationFromEuler(T)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Lg),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,S,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=M*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function h(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,S){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===on&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const S=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function tC(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const T=M.program;n.uniformBlockBinding(S,T)}function c(S,M){let T=r[S.id];T===void 0&&(p(S),T=u(S),r[S.id]=T,S.addEventListener("dispose",g));const w=M.program;n.updateUBOMapping(S,w);const E=e.render.frame;s[S.id]!==E&&(d(S),s[S.id]=E)}function u(S){const M=h();S.__bindingPointIndex=M;const T=i.createBuffer(),w=S.__size,E=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,w,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,T),T}function h(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Pe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const M=r[S.id],T=S.uniforms,w=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let E=0,C=T.length;E<C;E++){const v=Array.isArray(T[E])?T[E]:[T[E]];for(let A=0,L=v.length;A<L;A++){const I=v[A];if(f(I,E,A,w)===!0){const N=I.__offset,W=Array.isArray(I.value)?I.value:[I.value];let X=0;for(let O=0;O<W.length;O++){const k=W[O],z=_(k);typeof k=="number"||typeof k=="boolean"?(I.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,N+X,I.__data)):k.isMatrix3?(I.__data[0]=k.elements[0],I.__data[1]=k.elements[1],I.__data[2]=k.elements[2],I.__data[3]=0,I.__data[4]=k.elements[3],I.__data[5]=k.elements[4],I.__data[6]=k.elements[5],I.__data[7]=0,I.__data[8]=k.elements[6],I.__data[9]=k.elements[7],I.__data[10]=k.elements[8],I.__data[11]=0):ArrayBuffer.isView(k)?I.__data.set(new k.constructor(k.buffer,k.byteOffset,I.__data.length)):(k.toArray(I.__data,X),X+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,M,T,w){const E=S.value,C=M+"_"+T;if(w[C]===void 0)return typeof E=="number"||typeof E=="boolean"?w[C]=E:ArrayBuffer.isView(E)?w[C]=E.slice():w[C]=E.clone(),!0;{const v=w[C];if(typeof E=="number"||typeof E=="boolean"){if(v!==E)return w[C]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(v.equals(E)===!1)return v.copy(E),!0}}return!1}function p(S){const M=S.uniforms;let T=0;const w=16;for(let C=0,v=M.length;C<v;C++){const A=Array.isArray(M[C])?M[C]:[M[C]];for(let L=0,I=A.length;L<I;L++){const N=A[L],W=Array.isArray(N.value)?N.value:[N.value];for(let X=0,O=W.length;X<O;X++){const k=W[X],z=_(k),ee=T%w,ne=ee%z.boundary,ue=ee+ne;T+=ne,ue!==0&&w-ue<z.storage&&(T+=w-ue),N.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=T,T+=z.storage}}}const E=T%w;return E>0&&(T+=w-E),S.__size=T,S.__cache={},this}function _(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(M.boundary=16,M.storage=S.byteLength):Ae("WebGLRenderer: Unsupported uniform value type.",S),M}function g(S){const M=S.target;M.removeEventListener("dispose",g);const T=a.indexOf(M.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function m(){for(const S in r)i.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}const nC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Fn=null;function iC(){return Fn===null&&(Fn=new To(nC,16,16,tr,ri),Fn.name="DFG_LUT",Fn.minFilter=Jt,Fn.magFilter=Jt,Fn.wrapS=rn,Fn.wrapT=rn,Fn.generateMipmaps=!1,Fn.needsUpdate=!0),Fn}class Gf{constructor(e={}){const{canvas:t=uE(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=fn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const _=f,g=new Set([wu,Au,bu]),m=new Set([fn,Vn,Ds,Fs,Tu,yu]),S=new Uint32Array(4),M=new Int32Array(4),T=new F;let w=null,E=null;const C=[],v=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=kn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let I=!1,N=null;this._outputColorSpace=Qe;let W=0,X=0,O=null,k=-1,z=null;const ee=new nt,ne=new nt;let ue=null;const Me=new Fe(0);let Te=0,We=t.width,it=t.height,De=1,j=null,he=null;const ie=new nt(0,0,We,it),Ie=new nt(0,0,We,it);let Ue=!1;const Le=new Nu;let dt=!1,Ye=!1;const at=new be,_t=new F,$e=new nt,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let St=!1;function cn(){return O===null?De:1}let D=n;function Ot(y,U){return t.getContext(y,U)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Su}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",He,!1),D===null){const U="webgl2";if(D=Ot(U,y),D===null)throw Ot(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw Pe("WebGLRenderer: "+y.message),y}let je,ft,de,yt,b,x,B,$,te,re,ce,K,Z,ge,ve,oe,se,Ne,Ge,tt,P,ae,q;function _e(){je=new iI(D),je.init(),P=new q1(D,je),ft=new $R(D,je,e,P),de=new Y1(D,je),ft.reversedDepthBuffer&&d&&de.buffers.depth.setReversed(!0),yt=new aI(D),b=new P1,x=new K1(D,je,de,b,ft,P,yt),B=new nI(L),$=new uA(D),ae=new KR(D,$),te=new rI(D,$,yt,ae),re=new lI(D,te,$,ae,yt),Ne=new oI(D,ft,x),ve=new jR(b),ce=new L1(L,B,je,ft,ae,ve),K=new eC(L,b),Z=new F1,ge=new H1(je),se=new YR(L,B,de,re,p,l),oe=new X1(L,re,ft),q=new tC(D,yt,ft,de),Ge=new qR(D,je,yt),tt=new sI(D,je,yt),yt.programs=ce.programs,L.capabilities=ft,L.extensions=je,L.properties=b,L.renderLists=Z,L.shadowMap=oe,L.state=de,L.info=yt}_e(),_!==fn&&(A=new uI(_,t.width,t.height,r,s));const le=new J1(L,D);this.xr=le,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const y=je.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=je.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return De},this.setPixelRatio=function(y){y!==void 0&&(De=y,this.setSize(We,it,!1))},this.getSize=function(y){return y.set(We,it)},this.setSize=function(y,U,G=!0){if(le.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}We=y,it=U,t.width=Math.floor(y*De),t.height=Math.floor(U*De),G===!0&&(t.style.width=y+"px",t.style.height=U+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(We*De,it*De).floor()},this.setDrawingBufferSize=function(y,U,G){We=y,it=U,De=G,t.width=Math.floor(y*G),t.height=Math.floor(U*G),this.setViewport(0,0,y,U)},this.setEffects=function(y){if(_===fn){Pe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let U=0;U<y.length;U++)if(y[U].isOutputPass===!0){Ae("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(ee)},this.getViewport=function(y){return y.copy(ie)},this.setViewport=function(y,U,G,H){y.isVector4?ie.set(y.x,y.y,y.z,y.w):ie.set(y,U,G,H),de.viewport(ee.copy(ie).multiplyScalar(De).round())},this.getScissor=function(y){return y.copy(Ie)},this.setScissor=function(y,U,G,H){y.isVector4?Ie.set(y.x,y.y,y.z,y.w):Ie.set(y,U,G,H),de.scissor(ne.copy(Ie).multiplyScalar(De).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(y){de.setScissorTest(Ue=y)},this.setOpaqueSort=function(y){j=y},this.setTransparentSort=function(y){he=y},this.getClearColor=function(y){return y.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor(...arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,G=!0){let H=0;if(y){let V=!1;if(O!==null){const me=O.texture.format;V=g.has(me)}if(V){const me=O.texture.type,Se=m.has(me),pe=se.getClearColor(),ye=se.getClearAlpha(),we=pe.r,Ve=pe.g,Ke=pe.b;Se?(S[0]=we,S[1]=Ve,S[2]=Ke,S[3]=ye,D.clearBufferuiv(D.COLOR,0,S)):(M[0]=we,M[1]=Ve,M[2]=Ke,M[3]=ye,D.clearBufferiv(D.COLOR,0,M))}else H|=D.COLOR_BUFFER_BIT}U&&(H|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),N=y},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",He,!1),se.dispose(),Z.dispose(),ge.dispose(),b.dispose(),B.dispose(),re.dispose(),ae.dispose(),q.dispose(),ce.dispose(),le.dispose(),le.removeEventListener("sessionstart",ih),le.removeEventListener("sessionend",rh),Pi.stop()};function Q(y){y.preventDefault(),Pd("WebGLRenderer: Context Lost."),I=!0}function Ee(){Pd("WebGLRenderer: Context Restored."),I=!1;const y=yt.autoReset,U=oe.enabled,G=oe.autoUpdate,H=oe.needsUpdate,V=oe.type;_e(),yt.autoReset=y,oe.enabled=U,oe.autoUpdate=G,oe.needsUpdate=H,oe.type=V}function He(y){Pe("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function At(y){const U=y.target;U.removeEventListener("dispose",At),ot(U)}function ot(y){Xn(y),b.remove(y)}function Xn(y){const U=b.get(y).programs;U!==void 0&&(U.forEach(function(G){ce.releaseProgram(G)}),y.isShaderMaterial&&ce.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,G,H,V,me){U===null&&(U=Nt);const Se=V.isMesh&&V.matrixWorld.determinant()<0,pe=d0(y,U,G,H,V);de.setMaterial(H,Se);let ye=G.index,we=1;if(H.wireframe===!0){if(ye=te.getWireframeAttribute(G),ye===void 0)return;we=2}const Ve=G.drawRange,Ke=G.attributes.position;let Re=Ve.start*we,lt=(Ve.start+Ve.count)*we;me!==null&&(Re=Math.max(Re,me.start*we),lt=Math.min(lt,(me.start+me.count)*we)),ye!==null?(Re=Math.max(Re,0),lt=Math.min(lt,ye.count)):Ke!=null&&(Re=Math.max(Re,0),lt=Math.min(lt,Ke.count));const wt=lt-Re;if(wt<0||wt===1/0)return;ae.setup(V,H,pe,G,ye);let Et,ct=Ge;if(ye!==null&&(Et=$.get(ye),ct=tt,ct.setIndex(Et)),V.isMesh)H.wireframe===!0?(de.setLineWidth(H.wireframeLinewidth*cn()),ct.setMode(D.LINES)):ct.setMode(D.TRIANGLES);else if(V.isLine){let $t=H.linewidth;$t===void 0&&($t=1),de.setLineWidth($t*cn()),V.isLineSegments?ct.setMode(D.LINES):V.isLineLoop?ct.setMode(D.LINE_LOOP):ct.setMode(D.LINE_STRIP)}else V.isPoints?ct.setMode(D.POINTS):V.isSprite&&ct.setMode(D.TRIANGLES);if(V.isBatchedMesh)if(je.get("WEBGL_multi_draw"))ct.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const $t=V._multiDrawStarts,xe=V._multiDrawCounts,un=V._multiDrawCount,et=ye?$.get(ye).bytesPerElement:1,mn=b.get(H).currentProgram.getUniforms();for(let Pn=0;Pn<un;Pn++)mn.setValue(D,"_gl_DrawID",Pn),ct.render($t[Pn]/et,xe[Pn])}else if(V.isInstancedMesh)ct.renderInstances(Re,wt,V.count);else if(G.isInstancedBufferGeometry){const $t=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,xe=Math.min(G.instanceCount,$t);ct.renderInstances(Re,wt,xe)}else ct.render(Re,wt)};function Ln(y,U,G){y.transparent===!0&&y.side===Kt&&y.forceSinglePass===!1?(y.side=on,y.needsUpdate=!0,ta(y,U,G),y.side=Ai,y.needsUpdate=!0,ta(y,U,G),y.side=Kt):ta(y,U,G)}this.compile=function(y,U,G=null){G===null&&(G=y),E=ge.get(G),E.init(U),v.push(E),G.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),y!==G&&y.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights();const H=new Set;return y.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const me=V.material;if(me)if(Array.isArray(me))for(let Se=0;Se<me.length;Se++){const pe=me[Se];Ln(pe,G,V),H.add(pe)}else Ln(me,G,V),H.add(me)}),E=v.pop(),H},this.compileAsync=function(y,U,G=null){const H=this.compile(y,U,G);return new Promise(V=>{function me(){if(H.forEach(function(Se){b.get(Se).currentProgram.isReady()&&H.delete(Se)}),H.size===0){V(y);return}setTimeout(me,10)}je.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let wo=null;function u0(y){wo&&wo(y)}function ih(){Pi.stop()}function rh(){Pi.start()}const Pi=new Eg;Pi.setAnimationLoop(u0),typeof self<"u"&&Pi.setContext(self),this.setAnimationLoop=function(y){wo=y,le.setAnimationLoop(y),y===null?Pi.stop():Pi.start()},le.addEventListener("sessionstart",ih),le.addEventListener("sessionend",rh),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){Pe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;N!==null&&N.renderStart(y,U);const G=le.enabled===!0&&le.isPresenting===!0,H=A!==null&&(O===null||G)&&A.begin(L,O);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(U),U=le.getCamera()),y.isScene===!0&&y.onBeforeRender(L,y,U,O),E=ge.get(y,v.length),E.init(U),E.state.textureUnits=x.getTextureUnits(),v.push(E),at.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Le.setFromProjectionMatrix(at,Bn,U.reversedDepth),Ye=this.localClippingEnabled,dt=ve.init(this.clippingPlanes,Ye),w=Z.get(y,C.length),w.init(),C.push(w),le.enabled===!0&&le.isPresenting===!0){const Se=L.xr.getDepthSensingMesh();Se!==null&&Ro(Se,U,-1/0,L.sortObjects)}Ro(y,U,0,L.sortObjects),w.finish(),L.sortObjects===!0&&w.sort(j,he),St=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,St&&se.addToRenderList(w,y),this.info.render.frame++,dt===!0&&ve.beginShadows();const V=E.state.shadowsArray;if(oe.render(V,y,U),dt===!0&&ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&A.hasRenderPass())===!1){const Se=w.opaque,pe=w.transmissive;if(E.setupLights(),U.isArrayCamera){const ye=U.cameras;if(pe.length>0)for(let we=0,Ve=ye.length;we<Ve;we++){const Ke=ye[we];ah(Se,pe,y,Ke)}St&&se.render(y);for(let we=0,Ve=ye.length;we<Ve;we++){const Ke=ye[we];sh(w,y,Ke,Ke.viewport)}}else pe.length>0&&ah(Se,pe,y,U),St&&se.render(y),sh(w,y,U)}O!==null&&X===0&&(x.updateMultisampleRenderTarget(O),x.updateRenderTargetMipmap(O)),H&&A.end(L),y.isScene===!0&&y.onAfterRender(L,y,U),ae.resetDefaultState(),k=-1,z=null,v.pop(),v.length>0?(E=v[v.length-1],x.setTextureUnits(E.state.textureUnits),dt===!0&&ve.setGlobalState(L.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,N!==null&&N.renderEnd()};function Ro(y,U,G,H){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)G=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLightProbeGrid)E.pushLightProbeGrid(y);else if(y.isLight)E.pushLight(y),y.castShadow&&E.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Le.intersectsSprite(y)){H&&$e.setFromMatrixPosition(y.matrixWorld).applyMatrix4(at);const Se=re.update(y),pe=y.material;pe.visible&&w.push(y,Se,pe,G,$e.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Le.intersectsObject(y))){const Se=re.update(y),pe=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),$e.copy(y.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),$e.copy(Se.boundingSphere.center)),$e.applyMatrix4(y.matrixWorld).applyMatrix4(at)),Array.isArray(pe)){const ye=Se.groups;for(let we=0,Ve=ye.length;we<Ve;we++){const Ke=ye[we],Re=pe[Ke.materialIndex];Re&&Re.visible&&w.push(y,Se,Re,G,$e.z,Ke)}}else pe.visible&&w.push(y,Se,pe,G,$e.z,null)}}const me=y.children;for(let Se=0,pe=me.length;Se<pe;Se++)Ro(me[Se],U,G,H)}function sh(y,U,G,H){const{opaque:V,transmissive:me,transparent:Se}=y;E.setupLightsView(G),dt===!0&&ve.setGlobalState(L.clippingPlanes,G),H&&de.viewport(ee.copy(H)),V.length>0&&ea(V,U,G),me.length>0&&ea(me,U,G),Se.length>0&&ea(Se,U,G),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function ah(y,U,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[H.id]===void 0){const Re=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[H.id]=new Hn(1,1,{generateMipmaps:!0,type:Re?ri:fn,minFilter:qi,samples:Math.max(4,ft.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Be.workingColorSpace})}const me=E.state.transmissionRenderTarget[H.id],Se=H.viewport||ee;me.setSize(Se.z*L.transmissionResolutionScale,Se.w*L.transmissionResolutionScale);const pe=L.getRenderTarget(),ye=L.getActiveCubeFace(),we=L.getActiveMipmapLevel();L.setRenderTarget(me),L.getClearColor(Me),Te=L.getClearAlpha(),Te<1&&L.setClearColor(16777215,.5),L.clear(),St&&se.render(G);const Ve=L.toneMapping;L.toneMapping=kn;const Ke=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),E.setupLightsView(H),dt===!0&&ve.setGlobalState(L.clippingPlanes,H),ea(y,G,H),x.updateMultisampleRenderTarget(me),x.updateRenderTargetMipmap(me),je.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let lt=0,wt=U.length;lt<wt;lt++){const Et=U[lt],{object:ct,geometry:$t,material:xe,group:un}=Et;if(xe.side===Kt&&ct.layers.test(H.layers)){const et=xe.side;xe.side=on,xe.needsUpdate=!0,oh(ct,G,H,$t,xe,un),xe.side=et,xe.needsUpdate=!0,Re=!0}}Re===!0&&(x.updateMultisampleRenderTarget(me),x.updateRenderTargetMipmap(me))}L.setRenderTarget(pe,ye,we),L.setClearColor(Me,Te),Ke!==void 0&&(H.viewport=Ke),L.toneMapping=Ve}function ea(y,U,G){const H=U.isScene===!0?U.overrideMaterial:null;for(let V=0,me=y.length;V<me;V++){const Se=y[V],{object:pe,geometry:ye,group:we}=Se;let Ve=Se.material;Ve.allowOverride===!0&&H!==null&&(Ve=H),pe.layers.test(G.layers)&&oh(pe,U,G,ye,Ve,we)}}function oh(y,U,G,H,V,me){y.onBeforeRender(L,U,G,H,V,me),y.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),V.onBeforeRender(L,U,G,H,y,me),V.transparent===!0&&V.side===Kt&&V.forceSinglePass===!1?(V.side=on,V.needsUpdate=!0,L.renderBufferDirect(G,U,H,V,y,me),V.side=Ai,V.needsUpdate=!0,L.renderBufferDirect(G,U,H,V,y,me),V.side=Kt):L.renderBufferDirect(G,U,H,V,y,me),y.onAfterRender(L,U,G,H,V,me)}function ta(y,U,G){U.isScene!==!0&&(U=Nt);const H=b.get(y),V=E.state.lights,me=E.state.shadowsArray,Se=V.state.version,pe=ce.getParameters(y,V.state,me,U,G,E.state.lightProbeGridArray),ye=ce.getProgramCacheKey(pe);let we=H.programs;H.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?U.environment:null,H.fog=U.fog;const Ve=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;H.envMap=B.get(y.envMap||H.environment,Ve),H.envMapRotation=H.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,we===void 0&&(y.addEventListener("dispose",At),we=new Map,H.programs=we);let Ke=we.get(ye);if(Ke!==void 0){if(H.currentProgram===Ke&&H.lightsStateVersion===Se)return ch(y,pe),Ke}else pe.uniforms=ce.getUniforms(y),N!==null&&y.isNodeMaterial&&N.build(y,G,pe),y.onBeforeCompile(pe,L),Ke=ce.acquireProgram(pe,ye),we.set(ye,Ke),H.uniforms=pe.uniforms;const Re=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Re.clippingPlanes=ve.uniform),ch(y,pe),H.needsLights=p0(y),H.lightsStateVersion=Se,H.needsLights&&(Re.ambientLightColor.value=V.state.ambient,Re.lightProbe.value=V.state.probe,Re.directionalLights.value=V.state.directional,Re.directionalLightShadows.value=V.state.directionalShadow,Re.spotLights.value=V.state.spot,Re.spotLightShadows.value=V.state.spotShadow,Re.rectAreaLights.value=V.state.rectArea,Re.ltc_1.value=V.state.rectAreaLTC1,Re.ltc_2.value=V.state.rectAreaLTC2,Re.pointLights.value=V.state.point,Re.pointLightShadows.value=V.state.pointShadow,Re.hemisphereLights.value=V.state.hemi,Re.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Re.spotLightMatrix.value=V.state.spotLightMatrix,Re.spotLightMap.value=V.state.spotLightMap,Re.pointShadowMatrix.value=V.state.pointShadowMatrix),H.lightProbeGrid=E.state.lightProbeGridArray.length>0,H.currentProgram=Ke,H.uniformsList=null,Ke}function lh(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=$a.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function ch(y,U){const G=b.get(y);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function h0(y,U){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;T.setFromMatrixPosition(U.matrixWorld);for(let G=0,H=y.length;G<H;G++){const V=y[G];if(V.texture!==null&&V.boundingBox.containsPoint(T))return V}return null}function d0(y,U,G,H,V){U.isScene!==!0&&(U=Nt),x.resetTextureUnits();const me=U.fog,Se=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?U.environment:null,pe=O===null?L.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Be.workingColorSpace,ye=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,we=B.get(H.envMap||Se,ye),Ve=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ke=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Re=!!G.morphAttributes.position,lt=!!G.morphAttributes.normal,wt=!!G.morphAttributes.color;let Et=kn;H.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Et=L.toneMapping);const ct=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,$t=ct!==void 0?ct.length:0,xe=b.get(H),un=E.state.lights;if(dt===!0&&(Ye===!0||y!==z)){const pt=y===z&&H.id===k;ve.setState(H,y,pt)}let et=!1;H.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==un.state.version||xe.outputColorSpace!==pe||V.isBatchedMesh&&xe.batching===!1||!V.isBatchedMesh&&xe.batching===!0||V.isBatchedMesh&&xe.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&xe.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&xe.instancing===!1||!V.isInstancedMesh&&xe.instancing===!0||V.isSkinnedMesh&&xe.skinning===!1||!V.isSkinnedMesh&&xe.skinning===!0||V.isInstancedMesh&&xe.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&xe.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&xe.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&xe.instancingMorph===!1&&V.morphTexture!==null||xe.envMap!==we||H.fog===!0&&xe.fog!==me||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==ve.numPlanes||xe.numIntersection!==ve.numIntersection)||xe.vertexAlphas!==Ve||xe.vertexTangents!==Ke||xe.morphTargets!==Re||xe.morphNormals!==lt||xe.morphColors!==wt||xe.toneMapping!==Et||xe.morphTargetsCount!==$t||!!xe.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(et=!0):(et=!0,xe.__version=H.version);let mn=xe.currentProgram;et===!0&&(mn=ta(H,U,V),N&&H.isNodeMaterial&&N.onUpdateProgram(H,mn,xe));let Pn=!1,ai=!1,lr=!1;const ut=mn.getUniforms(),Rt=xe.uniforms;if(de.useProgram(mn.program)&&(Pn=!0,ai=!0,lr=!0),H.id!==k&&(k=H.id,ai=!0),xe.needsLights){const pt=h0(E.state.lightProbeGridArray,V);xe.lightProbeGrid!==pt&&(xe.lightProbeGrid=pt,ai=!0)}if(Pn||z!==y){de.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ut.setValue(D,"projectionMatrix",y.projectionMatrix),ut.setValue(D,"viewMatrix",y.matrixWorldInverse);const li=ut.map.cameraPosition;li!==void 0&&li.setValue(D,_t.setFromMatrixPosition(y.matrixWorld)),ft.logarithmicDepthBuffer&&ut.setValue(D,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ut.setValue(D,"isOrthographic",y.isOrthographicCamera===!0),z!==y&&(z=y,ai=!0,lr=!0)}if(xe.needsLights&&(un.state.directionalShadowMap.length>0&&ut.setValue(D,"directionalShadowMap",un.state.directionalShadowMap,x),un.state.spotShadowMap.length>0&&ut.setValue(D,"spotShadowMap",un.state.spotShadowMap,x),un.state.pointShadowMap.length>0&&ut.setValue(D,"pointShadowMap",un.state.pointShadowMap,x)),V.isSkinnedMesh){ut.setOptional(D,V,"bindMatrix"),ut.setOptional(D,V,"bindMatrixInverse");const pt=V.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),ut.setValue(D,"boneTexture",pt.boneTexture,x))}V.isBatchedMesh&&(ut.setOptional(D,V,"batchingTexture"),ut.setValue(D,"batchingTexture",V._matricesTexture,x),ut.setOptional(D,V,"batchingIdTexture"),ut.setValue(D,"batchingIdTexture",V._indirectTexture,x),ut.setOptional(D,V,"batchingColorTexture"),V._colorsTexture!==null&&ut.setValue(D,"batchingColorTexture",V._colorsTexture,x));const oi=G.morphAttributes;if((oi.position!==void 0||oi.normal!==void 0||oi.color!==void 0)&&Ne.update(V,G,mn),(ai||xe.receiveShadow!==V.receiveShadow)&&(xe.receiveShadow=V.receiveShadow,ut.setValue(D,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&U.environment!==null&&(Rt.envMapIntensity.value=U.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=iC()),ai){if(ut.setValue(D,"toneMappingExposure",L.toneMappingExposure),xe.needsLights&&f0(Rt,lr),me&&H.fog===!0&&K.refreshFogUniforms(Rt,me),K.refreshMaterialUniforms(Rt,H,De,it,E.state.transmissionRenderTarget[y.id]),xe.needsLights&&xe.lightProbeGrid){const pt=xe.lightProbeGrid;Rt.probesSH.value=pt.texture,Rt.probesMin.value.copy(pt.boundingBox.min),Rt.probesMax.value.copy(pt.boundingBox.max),Rt.probesResolution.value.copy(pt.resolution)}$a.upload(D,lh(xe),Rt,x)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&($a.upload(D,lh(xe),Rt,x),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ut.setValue(D,"center",V.center),ut.setValue(D,"modelViewMatrix",V.modelViewMatrix),ut.setValue(D,"normalMatrix",V.normalMatrix),ut.setValue(D,"modelMatrix",V.matrixWorld),H.uniformsGroups!==void 0){const pt=H.uniformsGroups;for(let li=0,cr=pt.length;li<cr;li++){const uh=pt[li];q.update(uh,mn),q.bind(uh,mn)}}return mn}function f0(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function p0(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(y,U,G){const H=b.get(y);H.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),b.get(y.texture).__webglTexture=U,b.get(y.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:G,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){const G=b.get(y);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0};const m0=D.createFramebuffer();this.setRenderTarget=function(y,U=0,G=0){O=y,W=U,X=G;let H=null,V=!1,me=!1;if(y){const pe=b.get(y);if(pe.__useDefaultFramebuffer!==void 0){de.bindFramebuffer(D.FRAMEBUFFER,pe.__webglFramebuffer),ee.copy(y.viewport),ne.copy(y.scissor),ue=y.scissorTest,de.viewport(ee),de.scissor(ne),de.setScissorTest(ue),k=-1;return}else if(pe.__webglFramebuffer===void 0)x.setupRenderTarget(y);else if(pe.__hasExternalTextures)x.rebindTextures(y,b.get(y.texture).__webglTexture,b.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ve=y.depthTexture;if(pe.__boundDepthTexture!==Ve){if(Ve!==null&&b.has(Ve)&&(y.width!==Ve.image.width||y.height!==Ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(y)}}const ye=y.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(me=!0);const we=b.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(we[U])?H=we[U][G]:H=we[U],V=!0):y.samples>0&&x.useMultisampledRTT(y)===!1?H=b.get(y).__webglMultisampledFramebuffer:Array.isArray(we)?H=we[G]:H=we,ee.copy(y.viewport),ne.copy(y.scissor),ue=y.scissorTest}else ee.copy(ie).multiplyScalar(De).floor(),ne.copy(Ie).multiplyScalar(De).floor(),ue=Ue;if(G!==0&&(H=m0),de.bindFramebuffer(D.FRAMEBUFFER,H)&&de.drawBuffers(y,H),de.viewport(ee),de.scissor(ne),de.setScissorTest(ue),V){const pe=b.get(y.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,pe.__webglTexture,G)}else if(me){const pe=U;for(let ye=0;ye<y.textures.length;ye++){const we=b.get(y.textures[ye]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+ye,we.__webglTexture,G,pe)}}else if(y!==null&&G!==0){const pe=b.get(y.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pe.__webglTexture,G)}k=-1},this.readRenderTargetPixels=function(y,U,G,H,V,me,Se,pe=0){if(!(y&&y.isWebGLRenderTarget)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=b.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Se!==void 0&&(ye=ye[Se]),ye){de.bindFramebuffer(D.FRAMEBUFFER,ye);try{const we=y.textures[pe],Ve=we.format,Ke=we.type;if(y.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pe),!ft.textureFormatReadable(Ve)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(Ke)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-H&&G>=0&&G<=y.height-V&&D.readPixels(U,G,H,V,P.convert(Ve),P.convert(Ke),me)}finally{const we=O!==null?b.get(O).__webglFramebuffer:null;de.bindFramebuffer(D.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(y,U,G,H,V,me,Se,pe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=b.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Se!==void 0&&(ye=ye[Se]),ye)if(U>=0&&U<=y.width-H&&G>=0&&G<=y.height-V){de.bindFramebuffer(D.FRAMEBUFFER,ye);const we=y.textures[pe],Ve=we.format,Ke=we.type;if(y.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pe),!ft.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Re),D.bufferData(D.PIXEL_PACK_BUFFER,me.byteLength,D.STREAM_READ),D.readPixels(U,G,H,V,P.convert(Ve),P.convert(Ke),0);const lt=O!==null?b.get(O).__webglFramebuffer:null;de.bindFramebuffer(D.FRAMEBUFFER,lt);const wt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await hE(D,wt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Re),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,me),D.deleteBuffer(Re),D.deleteSync(wt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,G=0){const H=Math.pow(2,-G),V=Math.floor(y.image.width*H),me=Math.floor(y.image.height*H),Se=U!==null?U.x:0,pe=U!==null?U.y:0;x.setTexture2D(y,0),D.copyTexSubImage2D(D.TEXTURE_2D,G,0,0,Se,pe,V,me),de.unbindTexture()};const g0=D.createFramebuffer(),_0=D.createFramebuffer();this.copyTextureToTexture=function(y,U,G=null,H=null,V=0,me=0){let Se,pe,ye,we,Ve,Ke,Re,lt,wt;const Et=y.isCompressedTexture?y.mipmaps[me]:y.image;if(G!==null)Se=G.max.x-G.min.x,pe=G.max.y-G.min.y,ye=G.isBox3?G.max.z-G.min.z:1,we=G.min.x,Ve=G.min.y,Ke=G.isBox3?G.min.z:0;else{const Rt=Math.pow(2,-V);Se=Math.floor(Et.width*Rt),pe=Math.floor(Et.height*Rt),y.isDataArrayTexture?ye=Et.depth:y.isData3DTexture?ye=Math.floor(Et.depth*Rt):ye=1,we=0,Ve=0,Ke=0}H!==null?(Re=H.x,lt=H.y,wt=H.z):(Re=0,lt=0,wt=0);const ct=P.convert(U.format),$t=P.convert(U.type);let xe;U.isData3DTexture?(x.setTexture3D(U,0),xe=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(x.setTexture2DArray(U,0),xe=D.TEXTURE_2D_ARRAY):(x.setTexture2D(U,0),xe=D.TEXTURE_2D),de.activeTexture(D.TEXTURE0),de.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),de.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),de.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const un=de.getParameter(D.UNPACK_ROW_LENGTH),et=de.getParameter(D.UNPACK_IMAGE_HEIGHT),mn=de.getParameter(D.UNPACK_SKIP_PIXELS),Pn=de.getParameter(D.UNPACK_SKIP_ROWS),ai=de.getParameter(D.UNPACK_SKIP_IMAGES);de.pixelStorei(D.UNPACK_ROW_LENGTH,Et.width),de.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Et.height),de.pixelStorei(D.UNPACK_SKIP_PIXELS,we),de.pixelStorei(D.UNPACK_SKIP_ROWS,Ve),de.pixelStorei(D.UNPACK_SKIP_IMAGES,Ke);const lr=y.isDataArrayTexture||y.isData3DTexture,ut=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const Rt=b.get(y),oi=b.get(U),pt=b.get(Rt.__renderTarget),li=b.get(oi.__renderTarget);de.bindFramebuffer(D.READ_FRAMEBUFFER,pt.__webglFramebuffer),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,li.__webglFramebuffer);for(let cr=0;cr<ye;cr++)lr&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,b.get(y).__webglTexture,V,Ke+cr),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,b.get(U).__webglTexture,me,wt+cr)),D.blitFramebuffer(we,Ve,Se,pe,Re,lt,Se,pe,D.DEPTH_BUFFER_BIT,D.NEAREST);de.bindFramebuffer(D.READ_FRAMEBUFFER,null),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(V!==0||y.isRenderTargetTexture||b.has(y)){const Rt=b.get(y),oi=b.get(U);de.bindFramebuffer(D.READ_FRAMEBUFFER,g0),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,_0);for(let pt=0;pt<ye;pt++)lr?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Rt.__webglTexture,V,Ke+pt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Rt.__webglTexture,V),ut?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,oi.__webglTexture,me,wt+pt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,oi.__webglTexture,me),V!==0?D.blitFramebuffer(we,Ve,Se,pe,Re,lt,Se,pe,D.COLOR_BUFFER_BIT,D.NEAREST):ut?D.copyTexSubImage3D(xe,me,Re,lt,wt+pt,we,Ve,Se,pe):D.copyTexSubImage2D(xe,me,Re,lt,we,Ve,Se,pe);de.bindFramebuffer(D.READ_FRAMEBUFFER,null),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ut?y.isDataTexture||y.isData3DTexture?D.texSubImage3D(xe,me,Re,lt,wt,Se,pe,ye,ct,$t,Et.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(xe,me,Re,lt,wt,Se,pe,ye,ct,Et.data):D.texSubImage3D(xe,me,Re,lt,wt,Se,pe,ye,ct,$t,Et):y.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,me,Re,lt,Se,pe,ct,$t,Et.data):y.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,me,Re,lt,Et.width,Et.height,ct,Et.data):D.texSubImage2D(D.TEXTURE_2D,me,Re,lt,Se,pe,ct,$t,Et);de.pixelStorei(D.UNPACK_ROW_LENGTH,un),de.pixelStorei(D.UNPACK_IMAGE_HEIGHT,et),de.pixelStorei(D.UNPACK_SKIP_PIXELS,mn),de.pixelStorei(D.UNPACK_SKIP_ROWS,Pn),de.pixelStorei(D.UNPACK_SKIP_IMAGES,ai),me===0&&U.generateMipmaps&&D.generateMipmap(xe),de.unbindTexture()},this.initRenderTarget=function(y){b.get(y).__webglFramebuffer===void 0&&x.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?x.setTextureCube(y,0):y.isData3DTexture?x.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?x.setTexture2DArray(y,0):x.setTexture2D(y,0),de.unbindTexture()},this.resetState=function(){W=0,X=0,O=null,de.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Be._getDrawingBufferColorSpace(e),t.unpackColorSpace=Be._getUnpackColorSpace()}}const Pg=10.8;function Gu(i,e={}){const t=Number.isFinite(i)&&i>0?i:1,n=Number.isFinite(e.viewScale)&&e.viewScale!=null&&e.viewScale>0?e.viewScale:1,r=Pg/2,s=r/t,a=r*2/n,o=s*2/n;return e.anchor==="topLeft"?{left:-r,right:-r+a,top:s,bottom:s-o}:{left:-a/2,right:a/2,top:o/2,bottom:-o/2}}class rC{apply(e,t,n,r={}){const s=Gu(n,r);e.left=s.left,e.right=s.right,e.top=s.top,e.bottom=s.bottom,e.position.set(t.position.x,t.position.y,t.position.z),t.target!=null&&e.lookAt(t.target.x,t.target.y,t.target.z),e.updateProjectionMatrix()}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var _n=Uint8Array,Fr=Uint16Array,sC=Int32Array,Dg=new _n([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Fg=new _n([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),aC=new _n([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ug=function(i,e){for(var t=new Fr(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new sC(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return{b:t,r}},Ng=Ug(Dg,2),Og=Ng.b,oC=Ng.r;Og[28]=258,oC[258]=28;var lC=Ug(Fg,0),cC=lC.b,eu=new Fr(32768);for(var vt=0;vt<32768;++vt){var xi=(vt&43690)>>1|(vt&21845)<<1;xi=(xi&52428)>>2|(xi&13107)<<2,xi=(xi&61680)>>4|(xi&3855)<<4,eu[vt]=((xi&65280)>>8|(xi&255)<<8)>>1}var As=(function(i,e,t){for(var n=i.length,r=0,s=new Fr(e);r<n;++r)i[r]&&++s[i[r]-1];var a=new Fr(e);for(r=1;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new Fr(1<<e);var l=15-e;for(r=0;r<n;++r)if(i[r])for(var c=r<<4|i[r],u=e-i[r],h=a[i[r]-1]++<<u,d=h|(1<<u)-1;h<=d;++h)o[eu[h]>>l]=c}else for(o=new Fr(n),r=0;r<n;++r)i[r]&&(o[r]=eu[a[i[r]-1]++]>>15-i[r]);return o}),Js=new _n(288);for(var vt=0;vt<144;++vt)Js[vt]=8;for(var vt=144;vt<256;++vt)Js[vt]=9;for(var vt=256;vt<280;++vt)Js[vt]=7;for(var vt=280;vt<288;++vt)Js[vt]=8;var Bg=new _n(32);for(var vt=0;vt<32;++vt)Bg[vt]=5;var uC=As(Js,9,1),hC=As(Bg,5,1),bl=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},An=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},Al=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},dC=function(i){return(i+7)/8|0},fC=function(i,e,t){return(t==null||t>i.length)&&(t=i.length),new _n(i.subarray(e,t))},pC=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],wn=function(i,e,t){var n=new Error(e||pC[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,wn),!t)throw n;return n},mC=function(i,e,t,n){var r=i.length,s=0;if(!r||e.f&&!e.l)return t||new _n(0);var a=!t,o=a||e.i!=2,l=e.i;a&&(t=new _n(r*3));var c=function(Le){var dt=t.length;if(Le>dt){var Ye=new _n(Math.max(dt*2,Le));Ye.set(t),t=Ye}},u=e.f||0,h=e.p||0,d=e.b||0,f=e.l,p=e.d,_=e.m,g=e.n,m=r*8;do{if(!f){u=An(i,h,1);var S=An(i,h+1,3);if(h+=3,S)if(S==1)f=uC,p=hC,_=9,g=5;else if(S==2){var E=An(i,h,31)+257,C=An(i,h+10,15)+4,v=E+An(i,h+5,31)+1;h+=14;for(var A=new _n(v),L=new _n(19),I=0;I<C;++I)L[aC[I]]=An(i,h+I*3,7);h+=C*3;for(var N=bl(L),W=(1<<N)-1,X=As(L,N,1),I=0;I<v;){var O=X[An(i,h,W)];h+=O&15;var M=O>>4;if(M<16)A[I++]=M;else{var k=0,z=0;for(M==16?(z=3+An(i,h,3),h+=2,k=A[I-1]):M==17?(z=3+An(i,h,7),h+=3):M==18&&(z=11+An(i,h,127),h+=7);z--;)A[I++]=k}}var ee=A.subarray(0,E),ne=A.subarray(E);_=bl(ee),g=bl(ne),f=As(ee,_,1),p=As(ne,g,1)}else wn(1);else{var M=dC(h)+4,T=i[M-4]|i[M-3]<<8,w=M+T;if(w>r){l&&wn(0);break}o&&c(d+T),t.set(i.subarray(M,w),d),e.b=d+=T,e.p=h=w*8,e.f=u;continue}if(h>m){l&&wn(0);break}}o&&c(d+131072);for(var ue=(1<<_)-1,Me=(1<<g)-1,Te=h;;Te=h){var k=f[Al(i,h)&ue],We=k>>4;if(h+=k&15,h>m){l&&wn(0);break}if(k||wn(2),We<256)t[d++]=We;else if(We==256){Te=h,f=null;break}else{var it=We-254;if(We>264){var I=We-257,De=Dg[I];it=An(i,h,(1<<De)-1)+Og[I],h+=De}var j=p[Al(i,h)&Me],he=j>>4;j||wn(3),h+=j&15;var ne=cC[he];if(he>3){var De=Fg[he];ne+=Al(i,h)&(1<<De)-1,h+=De}if(h>m){l&&wn(0);break}o&&c(d+131072);var ie=d+it;if(d<ne){var Ie=s-ne,Ue=Math.min(ne,ie);for(Ie+d<0&&wn(3);d<Ue;++d)t[d]=n[Ie+d]}for(;d<ie;++d)t[d]=t[d-ne]}}e.l=f,e.p=Te,e.b=d,e.f=u,f&&(u=1,e.m=_,e.d=p,e.n=g)}while(!u);return d!=t.length&&a?fC(t,0,d):t.subarray(0,d)},gC=new _n(0),_C=function(i,e){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&wn(6,"invalid zlib data"),(i[1]>>5&1)==1&&wn(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};function xC(i,e){return mC(i.subarray(_C(i),-4),{i:2},e,e)}var vC=typeof TextDecoder<"u"&&new TextDecoder,SC=0;try{vC.decode(gC,{stream:!0}),SC=1}catch{}function kg(i,e,t){const n=t.length-i-1;if(e>=t[n])return n-1;if(e<=t[i])return i;let r=i,s=n,a=Math.floor((r+s)/2);for(;e<t[a]||e>=t[a+1];)e<t[a]?s=a:r=a,a=Math.floor((r+s)/2);return a}function MC(i,e,t,n){const r=[],s=[],a=[];r[0]=1;for(let o=1;o<=t;++o){s[o]=e-n[i+1-o],a[o]=n[i+o]-e;let l=0;for(let c=0;c<o;++c){const u=a[c+1],h=s[o-c],d=r[c]/(u+h);r[c]=l+u*d,l=h*d}r[o]=l}return r}function TC(i,e,t,n){const r=kg(i,n,e),s=MC(r,n,i,e),a=new nt(0,0,0,0);for(let o=0;o<=i;++o){const l=t[r-i+o],c=s[o],u=l.w*c;a.x+=l.x*u,a.y+=l.y*u,a.z+=l.z*u,a.w+=l.w*c}return a}function yC(i,e,t,n,r){const s=[];for(let h=0;h<=t;++h)s[h]=0;const a=[];for(let h=0;h<=n;++h)a[h]=s.slice(0);const o=[];for(let h=0;h<=t;++h)o[h]=s.slice(0);o[0][0]=1;const l=s.slice(0),c=s.slice(0);for(let h=1;h<=t;++h){l[h]=e-r[i+1-h],c[h]=r[i+h]-e;let d=0;for(let f=0;f<h;++f){const p=c[f+1],_=l[h-f];o[h][f]=p+_;const g=o[f][h-1]/o[h][f];o[f][h]=d+p*g,d=_*g}o[h][h]=d}for(let h=0;h<=t;++h)a[0][h]=o[h][t];for(let h=0;h<=t;++h){let d=0,f=1;const p=[];for(let _=0;_<=t;++_)p[_]=s.slice(0);p[0][0]=1;for(let _=1;_<=n;++_){let g=0;const m=h-_,S=t-_;h>=_&&(p[f][0]=p[d][0]/o[S+1][m],g=p[f][0]*o[m][S]);const M=m>=-1?1:-m,T=h-1<=S?_-1:t-h;for(let E=M;E<=T;++E)p[f][E]=(p[d][E]-p[d][E-1])/o[S+1][m+E],g+=p[f][E]*o[m+E][S];h<=S&&(p[f][_]=-p[d][_-1]/o[S+1][h],g+=p[f][_]*o[h][S]),a[_][h]=g;const w=d;d=f,f=w}}let u=t;for(let h=1;h<=n;++h){for(let d=0;d<=t;++d)a[h][d]*=u;u*=t-h}return a}function EC(i,e,t,n,r){const s=r<i?r:i,a=[],o=kg(i,n,e),l=yC(o,n,i,s,e),c=[];for(let u=0;u<t.length;++u){const h=t[u].clone(),d=h.w;h.x*=d,h.y*=d,h.z*=d,c[u]=h}for(let u=0;u<=s;++u){const h=c[o-i].clone().multiplyScalar(l[u][0]);for(let d=1;d<=i;++d)h.add(c[o-i+d].clone().multiplyScalar(l[u][d]));a[u]=h}for(let u=s+1;u<=r+1;++u)a[u]=new nt(0,0,0);return a}function bC(i,e){let t=1;for(let r=2;r<=i;++r)t*=r;let n=1;for(let r=2;r<=e;++r)n*=r;for(let r=2;r<=i-e;++r)n*=r;return t/n}function AC(i){const e=i.length,t=[],n=[];for(let s=0;s<e;++s){const a=i[s];t[s]=new F(a.x,a.y,a.z),n[s]=a.w}const r=[];for(let s=0;s<e;++s){const a=t[s].clone();for(let o=1;o<=s;++o)a.sub(r[s-o].clone().multiplyScalar(bC(s,o)*n[o]));r[s]=a.divideScalar(n[0])}return r}function wC(i,e,t,n,r){const s=EC(i,e,t,n,r);return AC(s)}class RC extends nb{constructor(e,t,n,r,s){super();const a=t?t.length-1:0,o=n?n.length:0;this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=r||0,this.endKnot=s||a;for(let l=0;l<o;++l){const c=n[l];this.controlPoints[l]=new nt(c.x,c.y,c.z,c.w)}}getPoint(e,t=new F){const n=t,r=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=TC(this.degree,this.knots,this.controlPoints,r);return s.w!==1&&s.divideScalar(s.w),n.set(s.x,s.y,s.z)}getTangent(e,t=new F){const n=t,r=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),s=wC(this.degree,this.knots,this.controlPoints,r,1);return n.copy(s[1]).normalize(),n}toJSON(){const e=super.toJSON();return e.degree=this.degree,e.knots=[...this.knots],e.controlPoints=this.controlPoints.map(t=>t.toArray()),e.startKnot=this.startKnot,e.endKnot=this.endKnot,e}fromJSON(e){return super.fromJSON(e),this.degree=e.degree,this.knots=[...e.knots],this.controlPoints=e.controlPoints.map(t=>new nt(t[0],t[1],t[2],t[3])),this.startKnot=e.startKnot,this.endKnot=e.endKnot,this}}let ze,It,Xt;class wl extends ir{constructor(e){super(e)}load(e,t,n,r){const s=this,a=s.path===""?Kb.extractUrlBase(e):s.path,o=new Vb(this.manager);o.setPath(s.path),o.setResponseType("arraybuffer"),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(l){try{t(s.parse(l,a))}catch(c){r?r(c):console.error(c),s.manager.itemError(e)}},n,r)}parse(e,t){if(FC(e))ze=new DC().parse(e);else{const r=zg(e);if(!UC(r))throw new Error("THREE.FBXLoader: Unknown format.");if(Xf(r)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+Xf(r));ze=new PC().parse(r)}const n=new Ji(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new IC(n,this.manager).parse(ze)}}class IC{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){It=this.parseConnections();const e=this.parseImages(),t=this.parseTextures(e),n=this.parseMaterials(t),r=this.parseDeformers(),s=new CC().parse(r);return this.parseScene(r,s,n),Xt}parseConnections(){const e=new Map;return"Connections"in ze&&ze.Connections.connections.forEach(function(n){const r=n[0],s=n[1],a=n[2];e.has(r)||e.set(r,{parents:[],children:[]});const o={ID:s,relationship:a};e.get(r).parents.push(o),e.has(s)||e.set(s,{parents:[],children:[]});const l={ID:r,relationship:a};e.get(s).children.push(l)}),e}parseImages(){const e={},t={};if("Video"in ze.Objects){const n=ze.Objects.Video;for(const r in n){const s=n[r],a=parseInt(r);if(e[a]=s.RelativeFilename||s.Filename,"Content"in s){const o=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,l=typeof s.Content=="string"&&s.Content!=="";if(o||l){const c=this.parseImage(n[r]);t[s.RelativeFilename||s.Filename]=c}}}}for(const n in e){const r=e[n];t[r]!==void 0?e[n]=t[r]:e[n]=e[n].split("\\").pop()}return e}parseImage(e){const t=e.Content,n=e.RelativeFilename||e.Filename,r=n.slice(n.lastIndexOf(".")+1).toLowerCase();let s;switch(r){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),s="image/tga";break;case"webp":s="image/webp";break;default:console.warn('FBXLoader: Image type "'+r+'" is not supported.');return}if(typeof t=="string")return"data:"+s+";base64,"+t;{const a=new Uint8Array(t);return window.URL.createObjectURL(new Blob([a],{type:s}))}}parseTextures(e){const t=new Map;if("Texture"in ze.Objects){const n=ze.Objects.Texture;for(const r in n){const s=this.parseTexture(n[r],e);t.set(parseInt(r),s)}}return t}parseTexture(e,t){const n=this.loadTexture(e,t);n.ID=e.id,n.name=e.attrName;const r=e.WrapModeU,s=e.WrapModeV,a=r!==void 0?r.value:0,o=s!==void 0?s.value:0;if(n.wrapS=a===0?Ps:rn,n.wrapT=o===0?Ps:rn,"Scaling"in e){const l=e.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in e){const l=e.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(e,t){const n=e.FileName.split(".").pop().toLowerCase();let r=this.manager.getHandler(`.${n}`);r===null&&(r=this.textureLoader);const s=r.path;s||r.setPath(this.textureLoader.path);const a=It.get(e.id).children;let o;if(a!==void 0&&a.length>0&&t[a[0].ID]!==void 0&&(o=t[a[0].ID],(o.indexOf("blob:")===0||o.indexOf("data:")===0)&&r.setPath(void 0)),o===void 0)return console.warn("FBXLoader: Undefined filename, creating placeholder texture."),new Ut;const l=r.load(o);return r.setPath(s),l}parseMaterials(e){const t=new Map;if("Material"in ze.Objects){const n=ze.Objects.Material;for(const r in n){const s=this.parseMaterial(n[r],e);s!==null&&t.set(parseInt(r),s)}}return t}parseMaterial(e,t){const n=e.id,r=e.attrName;let s=e.ShadingModel;if(typeof s=="object"&&(s=s.value),!It.has(n))return null;const a=this.parseParameters(e,t,n);let o;switch(s.toLowerCase()){case"phong":o=new Pa;break;case"lambert":o=new Ab;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),o=new Pa;break}return o.setValues(a),o.name=r,o}parseParameters(e,t,n){const r={};e.BumpFactor&&(r.bumpScale=e.BumpFactor.value),e.Diffuse?r.color=Be.colorSpaceToWorking(new Fe().fromArray(e.Diffuse.value),Qe):e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(r.color=Be.colorSpaceToWorking(new Fe().fromArray(e.DiffuseColor.value),Qe)),e.DisplacementFactor&&(r.displacementScale=e.DisplacementFactor.value),e.Emissive?r.emissive=Be.colorSpaceToWorking(new Fe().fromArray(e.Emissive.value),Qe):e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(r.emissive=Be.colorSpaceToWorking(new Fe().fromArray(e.EmissiveColor.value),Qe)),e.EmissiveFactor&&(r.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),r.opacity=1-(e.TransparencyFactor?parseFloat(e.TransparencyFactor.value):0),(r.opacity===1||r.opacity===0)&&(r.opacity=e.Opacity?parseFloat(e.Opacity.value):null,r.opacity===null&&(r.opacity=1)),r.opacity<1&&(r.transparent=!0),e.ReflectionFactor&&(r.reflectivity=e.ReflectionFactor.value),e.Shininess&&(r.shininess=e.Shininess.value),e.Specular?r.specular=Be.colorSpaceToWorking(new Fe().fromArray(e.Specular.value),Qe):e.SpecularColor&&e.SpecularColor.type==="Color"&&(r.specular=Be.colorSpaceToWorking(new Fe().fromArray(e.SpecularColor.value),Qe));const s=this;return It.get(n).children.forEach(function(a){const o=a.relationship;switch(o){case"Bump":r.bumpMap=s.getTexture(t,a.ID);break;case"Maya|TEX_ao_map":r.aoMap=s.getTexture(t,a.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":r.map=s.getTexture(t,a.ID),r.map!==void 0&&(r.map.colorSpace=Qe);break;case"DisplacementColor":r.displacementMap=s.getTexture(t,a.ID);break;case"EmissiveColor":r.emissiveMap=s.getTexture(t,a.ID),r.emissiveMap!==void 0&&(r.emissiveMap.colorSpace=Qe);break;case"NormalMap":case"Maya|TEX_normal_map":r.normalMap=s.getTexture(t,a.ID);break;case"ReflectionColor":r.envMap=s.getTexture(t,a.ID),r.envMap!==void 0&&(r.envMap.mapping=Wa,r.envMap.colorSpace=Qe);break;case"SpecularColor":r.specularMap=s.getTexture(t,a.ID),r.specularMap!==void 0&&(r.specularMap.colorSpace=Qe);break;case"TransparentColor":case"TransparencyFactor":r.alphaMap=s.getTexture(t,a.ID),r.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",o);break}}),r}getTexture(e,t){return"LayeredTexture"in ze.Objects&&t in ze.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=It.get(t).children[0].ID),e.get(t)}parseDeformers(){const e={},t={};if("Deformer"in ze.Objects){const n=ze.Objects.Deformer;for(const r in n){const s=n[r],a=It.get(parseInt(r));if(s.attrType==="Skin"){const o=this.parseSkeleton(a,n);o.ID=r,a.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),o.geometryID=a.parents[0].ID,e[r]=o}else if(s.attrType==="BlendShape"){const o={id:r};o.rawTargets=this.parseMorphTargets(a,n),o.id=r,a.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[r]=o}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){const n=[];return e.children.forEach(function(r){const s=t[r.ID];if(s.attrType!=="Cluster")return;const a={ID:r.ID,indices:[],weights:[],transformLink:new be().fromArray(s.TransformLink.a)};"Indexes"in s&&(a.indices=s.Indexes.a,a.weights=s.Weights.a),n.push(a)}),{rawBones:n,bones:[]}}parseMorphTargets(e,t){const n=[];for(let r=0;r<e.children.length;r++){const s=e.children[r],a=t[s.ID],o={name:a.attrName,initialWeight:a.DeformPercent,id:a.id,fullWeights:a.FullWeights.a};if(a.attrType!=="BlendShapeChannel")return;o.geoID=It.get(parseInt(s.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(o)}return n}parseScene(e,t,n){Xt=new In;const r=this.parseModels(e.skeletons,t,n),s=ze.Objects.Model,a=this;r.forEach(function(h){const d=s[h.ID];a.setLookAtProperties(h,d),It.get(h.ID).parents.forEach(function(p){const _=r.get(p.ID);_!==void 0&&_.add(h)}),h.parent===null&&Xt.add(h)}),this.addGlobalSceneSettings(),Xt.traverse(function(h){if(h.userData.transformData){h.parent&&(h.userData.transformData.parentMatrix=h.parent.matrix,h.userData.transformData.parentMatrixWorld=h.parent.matrixWorld);const d=Vg(h.userData.transformData);h.applyMatrix4(d),h.updateWorldMatrix()}});const o=this.parsePoseNodes(),l=new Set;for(const h in e.skeletons)e.skeletons[h].rawBones.forEach(function(d,f){const p=e.skeletons[h].bones[f];p&&l.add(p.ID)});const c=new be;Xt.traverse(function(h){if(h.isBone&&h.ID!==void 0&&!l.has(h.ID)){const d=o[h.ID];d!==void 0&&(h.parent?(c.copy(h.parent.matrixWorld).invert(),c.multiply(d)):c.copy(d),c.decompose(h.position,h.quaternion,h.scale),h.updateMatrix(),h.matrixWorld.copy(d))}}),this.bindSkeleton(e.skeletons,t,r);const u=new LC().parse();Xt.children.length===1&&Xt.children[0].isGroup&&(Xt.children[0].animations=u,Xt=Xt.children[0]),Xt.animations=u,"GlobalSettings"in ze&&"UpAxis"in ze.GlobalSettings&&ze.GlobalSettings.UpAxis.value===2&&(console.warn("THREE.FBXLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted."),Xt.rotation.set(-Math.PI/2,0,0))}parseModels(e,t,n){const r=new Map,s=ze.Objects.Model;for(const a in s){const o=parseInt(a),l=s[a],c=It.get(o);let u=this.buildSkeleton(c,e,o,l.attrName);if(!u){switch(l.attrType){case"Camera":u=this.createCamera(c);break;case"Light":u=this.createLight(c);break;case"Mesh":u=this.createMesh(c,t,n);break;case"NurbsCurve":u=this.createCurve(c,t);break;case"LimbNode":case"Root":u=new Bs;break;case"Null":default:u=new In;break}u.name=l.attrName?Je.sanitizeNodeName(l.attrName):"",u.userData.originalName=l.attrName,u.ID=o}this.getTransformData(u,l),r.set(o,u)}return r}buildSkeleton(e,t,n,r){let s=null;return e.parents.forEach(function(a){for(const o in t){const l=t[o];l.rawBones.forEach(function(c,u){if(c.ID===a.ID){const h=s;s=new Bs,s.matrixWorld.copy(c.transformLink),s.name=r?Je.sanitizeNodeName(r):"",s.userData.originalName=r,s.ID=n,l.bones[u]=s,h!==null&&s.add(h)}})}}),s}createCamera(e){let t,n;if(e.children.forEach(function(r){const s=ze.Objects.NodeAttribute[r.ID];s!==void 0&&(n=s)}),n===void 0)t=new gt;else{let r=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(r=1);let s=1;n.NearPlane!==void 0&&(s=n.NearPlane.value/1e3);let a=1e3;n.FarPlane!==void 0&&(a=n.FarPlane.value/1e3);let o=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(o=n.AspectWidth.value,l=n.AspectHeight.value);const c=o/l;let u=45;n.FieldOfView!==void 0&&(u=n.FieldOfView.value);const h=n.FocalLength?n.FocalLength.value:null;switch(r){case 0:t=new sn(u,c,s,a),h!==null&&t.setFocalLength(h);break;case 1:console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."),t=new gt;break;default:console.warn("THREE.FBXLoader: Unknown camera type "+r+"."),t=new gt;break}}return t}createLight(e){let t,n;if(e.children.forEach(function(r){const s=ze.Objects.NodeAttribute[r.ID];s!==void 0&&(n=s)}),n===void 0)t=new gt;else{let r;n.LightType===void 0?r=0:r=n.LightType.value;let s=16777215;n.Color!==void 0&&(s=Be.colorSpaceToWorking(new Fe().fromArray(n.Color.value),Qe));let a=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(a=0);let o=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?o=0:o=n.FarAttenuationEnd.value);const l=1;switch(r){case 0:t=new _f(s,a,o,l);break;case 1:t=new Tg(s,a);break;case 2:let c=Math.PI/3,u=0;n.OuterAngle!==void 0?(c=nn.degToRad(n.OuterAngle.value),n.InnerAngle!==void 0&&(u=1-n.InnerAngle.value/n.OuterAngle.value,u=Math.max(0,u))):n.InnerAngle!==void 0&&(c=nn.degToRad(n.InnerAngle.value)),t=new Wb(s,a,o,c,u,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),t=new _f(s,a);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,n){let r,s=null,a=null;const o=[];if(e.children.forEach(function(l){t.has(l.ID)&&(s=t.get(l.ID)),n.has(l.ID)&&o.push(n.get(l.ID))}),o.length>1?a=o:o.length>0?a=o[0]:(a=new Pa({name:ir.DEFAULT_MATERIAL_NAME,color:13421772}),o.push(a)),"color"in s.attributes&&o.forEach(function(l){l.vertexColors=!0}),s.groups.length>0){let l=!1;for(let c=0,u=s.groups.length;c<u;c++){const h=s.groups[c];(h.materialIndex<0||h.materialIndex>=o.length)&&(h.materialIndex=o.length,l=!0)}if(l){const c=new Pa;o.push(c)}}return s.FBX_Deformer?(r=new qE(s,a),r.normalizeSkinWeights()):r=new st(s,a),r}createCurve(e,t){const n=e.children.reduce(function(s,a){return t.has(a.ID)&&(s=t.get(a.ID)),s},null),r=new lg({name:ir.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new cg(n,r)}getTransformData(e,t){const n={};"InheritType"in t&&(n.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?n.eulerOrder=Ws(t.RotationOrder.value):n.eulerOrder=Ws(0),"Lcl_Translation"in t&&(n.translation=t.Lcl_Translation.value),"PreRotation"in t&&(n.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(n.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(n.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(n.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(n.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(n.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(n.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(n.rotationPivot=t.RotationPivot.value),e.userData.transformData=n}setLookAtProperties(e,t){"LookAtProperty"in t&&It.get(e.ID).children.forEach(function(r){if(r.relationship==="LookAtProperty"){const s=ze.Objects.Model[r.ID];if("Lcl_Translation"in s){const a=s.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(a),Xt.add(e.target)):e.lookAt(new F().fromArray(a))}}})}bindSkeleton(e,t,n){for(const r in e){const s=e[r],a=[];for(let l=0,c=s.bones.length;l<c;l++){const u=new be;s.bones[l]&&s.rawBones[l]&&u.copy(s.rawBones[l].transformLink).invert(),a.push(u)}It.get(parseInt(s.ID)).parents.forEach(function(l){if(t.has(l.ID)){const c=l.ID;It.get(c).parents.forEach(function(h){if(n.has(h.ID)){const d=n.get(h.ID);d.updateMatrixWorld(!0),d.bind(new Uu(s.bones,a),d.matrixWorld)}})}})}}parsePoseNodes(){const e={};if("Pose"in ze.Objects){const t=ze.Objects.Pose;for(const n in t)if(t[n].attrType==="BindPose"&&t[n].NbPoseNodes>0){const r=t[n].PoseNode;Array.isArray(r)?r.forEach(function(s){e[s.Node]=new be().fromArray(s.Matrix.a)}):e[r.Node]=new be().fromArray(r.Matrix.a)}}return e}addGlobalSceneSettings(){if("GlobalSettings"in ze){if("AmbientColor"in ze.GlobalSettings){const e=ze.GlobalSettings.AmbientColor.value,t=e[0],n=e[1],r=e[2];if(t!==0||n!==0||r!==0){const s=new Fe().setRGB(t,n,r,Qe);Xt.add(new yg(s,1))}}"UnitScaleFactor"in ze.GlobalSettings&&(Xt.userData.unitScaleFactor=ze.GlobalSettings.UnitScaleFactor.value)}}}class CC{constructor(){this.negativeMaterialIndices=!1}parse(e){const t=new Map;if("Geometry"in ze.Objects){const n=ze.Objects.Geometry;for(const r in n){const s=It.get(parseInt(r)),a=this.parseGeometry(s,n[r],e);t.set(parseInt(r),a)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,n){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,n);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,n){const r=n.skeletons,s=[],a=e.parents.map(function(h){return ze.Objects.Model[h.ID]});if(a.length===0)return;const o=e.children.reduce(function(h,d){return r[d.ID]!==void 0&&(h=r[d.ID]),h},null);e.children.forEach(function(h){n.morphTargets[h.ID]!==void 0&&s.push(n.morphTargets[h.ID])});const l=a[0],c={};"RotationOrder"in l&&(c.eulerOrder=Ws(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);const u=Vg(c);return this.genGeometry(t,o,s,u)}genGeometry(e,t,n,r){const s=new Qt;e.attrName&&(s.name=e.attrName);const a=this.parseGeoNode(e,t),o=this.genBuffers(a),l=new Mt(o.vertex,3);if(l.applyMatrix4(r),s.setAttribute("position",l),o.colors.length>0&&s.setAttribute("color",new Mt(o.colors,3)),t&&(s.setAttribute("skinIndex",new Du(o.weightsIndices,4)),s.setAttribute("skinWeight",new Mt(o.vertexWeights,4)),s.FBX_Deformer=t),o.normal.length>0){const c=new Oe().getNormalMatrix(r),u=new Mt(o.normal,3);u.applyNormalMatrix(c),s.setAttribute("normal",u)}if(o.uvs.forEach(function(c,u){const h=u===0?"uv":`uv${u}`;s.setAttribute(h,new Mt(o.uvs[u],2))}),a.material&&a.material.mappingType!=="AllSame"){let c=o.materialIndex[0],u=0;if(o.materialIndex.forEach(function(h,d){h!==c&&(s.addGroup(u,d-u,c),c=h,u=d)}),s.groups.length>0){const h=s.groups[s.groups.length-1],d=h.start+h.count;d!==o.materialIndex.length&&s.addGroup(d,o.materialIndex.length-d,c)}s.groups.length===0&&s.addGroup(0,o.materialIndex.length,o.materialIndex[0])}return this.addMorphTargets(s,e,n,r),s}parseGeoNode(e,t){const n={};if(n.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],n.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&e.LayerElementColor[0].Colors&&(n.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(n.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(n.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){n.uv=[];let r=0;for(;e.LayerElementUV[r];)e.LayerElementUV[r].UV&&n.uv.push(this.parseUVs(e.LayerElementUV[r])),r++}return n.weightTable={},t!==null&&(n.skeleton=t,t.rawBones.forEach(function(r,s){r.indices.forEach(function(a,o){n.weightTable[a]===void 0&&(n.weightTable[a]=[]),n.weightTable[a].push({id:s,weight:r.weights[o]})})})),n}genBuffers(e){const t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let n=0,r=0,s=!1,a=[],o=[],l=[],c=[],u=[],h=[];const d=this;return e.vertexIndices.forEach(function(f,p){let _,g=!1;f<0&&(f=f^-1,g=!0);let m=[],S=[];if(a.push(f*3,f*3+1,f*3+2),e.color){const M=Oa(p,n,f,e.color);l.push(M[0],M[1],M[2])}if(e.skeleton){if(e.weightTable[f]!==void 0&&e.weightTable[f].forEach(function(M){S.push(M.weight),m.push(M.id)}),S.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);const M=[0,0,0,0],T=[0,0,0,0];S.forEach(function(w,E){let C=w,v=m[E];T.forEach(function(A,L,I){if(C>A){I[L]=C,C=A;const N=M[L];M[L]=v,v=N}})}),m=M,S=T}for(;S.length<4;)S.push(0),m.push(0);for(let M=0;M<4;++M)u.push(S[M]),h.push(m[M])}if(e.normal){const M=Oa(p,n,f,e.normal);o.push(M[0],M[1],M[2])}e.material&&e.material.mappingType!=="AllSame"&&(_=Oa(p,n,f,e.material)[0],_<0&&(d.negativeMaterialIndices=!0,_=0)),e.uv&&e.uv.forEach(function(M,T){const w=Oa(p,n,f,M);c[T]===void 0&&(c[T]=[]),c[T].push(w[0]),c[T].push(w[1])}),r++,g&&(d.genFace(t,e,a,_,o,l,c,u,h,r),n++,r=0,a=[],o=[],l=[],c=[],u=[],h=[])}),t}getNormalNewell(e){const t=new F(0,0,0);for(let n=0;n<e.length;n++){const r=e[n],s=e[(n+1)%e.length];t.x+=(r.y-s.y)*(r.z+s.z),t.y+=(r.z-s.z)*(r.x+s.x),t.z+=(r.x-s.x)*(r.y+s.y)}return t.normalize(),t}getNormalTangentAndBitangent(e){const t=this.getNormalNewell(e),r=(Math.abs(t.z)>.5?new F(0,1,0):new F(0,0,1)).cross(t).normalize(),s=t.clone().cross(r).normalize();return{normal:t,tangent:r,bitangent:s}}flattenVertex(e,t,n){return new Ze(e.dot(t),e.dot(n))}genFace(e,t,n,r,s,a,o,l,c,u){let h;if(u>3){const d=[],f=t.baseVertexPositions||t.vertexPositions;for(let m=0;m<n.length;m+=3)d.push(new F(f[n[m]],f[n[m+1]],f[n[m+2]]));const{tangent:p,bitangent:_}=this.getNormalTangentAndBitangent(d),g=[];for(const m of d)g.push(this.flattenVertex(m,p,_));h=Ou.triangulateShape(g,[])}else h=[[0,1,2]];for(const[d,f,p]of h)e.vertex.push(t.vertexPositions[n[d*3]]),e.vertex.push(t.vertexPositions[n[d*3+1]]),e.vertex.push(t.vertexPositions[n[d*3+2]]),e.vertex.push(t.vertexPositions[n[f*3]]),e.vertex.push(t.vertexPositions[n[f*3+1]]),e.vertex.push(t.vertexPositions[n[f*3+2]]),e.vertex.push(t.vertexPositions[n[p*3]]),e.vertex.push(t.vertexPositions[n[p*3+1]]),e.vertex.push(t.vertexPositions[n[p*3+2]]),t.skeleton&&(e.vertexWeights.push(l[d*4]),e.vertexWeights.push(l[d*4+1]),e.vertexWeights.push(l[d*4+2]),e.vertexWeights.push(l[d*4+3]),e.vertexWeights.push(l[f*4]),e.vertexWeights.push(l[f*4+1]),e.vertexWeights.push(l[f*4+2]),e.vertexWeights.push(l[f*4+3]),e.vertexWeights.push(l[p*4]),e.vertexWeights.push(l[p*4+1]),e.vertexWeights.push(l[p*4+2]),e.vertexWeights.push(l[p*4+3]),e.weightsIndices.push(c[d*4]),e.weightsIndices.push(c[d*4+1]),e.weightsIndices.push(c[d*4+2]),e.weightsIndices.push(c[d*4+3]),e.weightsIndices.push(c[f*4]),e.weightsIndices.push(c[f*4+1]),e.weightsIndices.push(c[f*4+2]),e.weightsIndices.push(c[f*4+3]),e.weightsIndices.push(c[p*4]),e.weightsIndices.push(c[p*4+1]),e.weightsIndices.push(c[p*4+2]),e.weightsIndices.push(c[p*4+3])),t.color&&(e.colors.push(a[d*3]),e.colors.push(a[d*3+1]),e.colors.push(a[d*3+2]),e.colors.push(a[f*3]),e.colors.push(a[f*3+1]),e.colors.push(a[f*3+2]),e.colors.push(a[p*3]),e.colors.push(a[p*3+1]),e.colors.push(a[p*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(r),e.materialIndex.push(r),e.materialIndex.push(r)),t.normal&&(e.normal.push(s[d*3]),e.normal.push(s[d*3+1]),e.normal.push(s[d*3+2]),e.normal.push(s[f*3]),e.normal.push(s[f*3+1]),e.normal.push(s[f*3+2]),e.normal.push(s[p*3]),e.normal.push(s[p*3+1]),e.normal.push(s[p*3+2])),t.uv&&t.uv.forEach(function(_,g){e.uvs[g]===void 0&&(e.uvs[g]=[]),e.uvs[g].push(o[g][d*2]),e.uvs[g].push(o[g][d*2+1]),e.uvs[g].push(o[g][f*2]),e.uvs[g].push(o[g][f*2+1]),e.uvs[g].push(o[g][p*2]),e.uvs[g].push(o[g][p*2+1])})}addMorphTargets(e,t,n,r){if(n.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];const s=r.clone().setPosition(0,0,0),a=this;n.forEach(function(o){o.rawTargets.forEach(function(l){const c=ze.Objects.Geometry[l.geoID];c!==void 0&&a.genMorphGeometry(e,t,c,s,l.name)})})}genMorphGeometry(e,t,n,r,s){const a=t.Vertices!==void 0?t.Vertices.a:[],o=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],l=n.Vertices!==void 0?n.Vertices.a:[],c=n.Indexes!==void 0?n.Indexes.a:[],u=e.attributes.position.count*3,h=new Float32Array(u);for(let _=0;_<c.length;_++){const g=c[_]*3;h[g]=l[_*3],h[g+1]=l[_*3+1],h[g+2]=l[_*3+2]}const d={vertexIndices:o,vertexPositions:h,baseVertexPositions:a},f=this.genBuffers(d),p=new Mt(f.vertex,3);p.name=s||n.attrName,p.applyMatrix4(r),e.morphAttributes.position.push(p)}parseNormals(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.Normals.a;let s=[];return n==="IndexToDirect"&&("NormalIndex"in e?s=e.NormalIndex.a:"NormalsIndex"in e&&(s=e.NormalsIndex.a)),{dataSize:3,buffer:r,indices:s,mappingType:t,referenceType:n}}parseUVs(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.UV.a;let s=[];return n==="IndexToDirect"&&(s=e.UVIndex.a),{dataSize:2,buffer:r,indices:s,mappingType:t,referenceType:n}}parseVertexColors(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.Colors.a;let s=[];n==="IndexToDirect"&&(s=e.ColorIndex.a);for(let a=0,o=new Fe;a<r.length;a+=4)o.fromArray(r,a),Be.colorSpaceToWorking(o,Qe),o.toArray(r,a);return{dataSize:4,buffer:r,indices:s,mappingType:t,referenceType:n}}parseMaterialIndices(e){const t=e.MappingInformationType,n=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};const r=e.Materials.a,s=[];for(let a=0;a<r.length;++a)s.push(a);return{dataSize:1,buffer:r,indices:s,mappingType:t,referenceType:n}}parseNurbsGeometry(e){const t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new Qt;const n=t-1,r=e.KnotVector.a,s=[],a=e.Points.a;for(let h=0,d=a.length;h<d;h+=4)s.push(new nt().fromArray(a,h));let o,l;if(e.Form==="Closed")s.push(s[0]);else if(e.Form==="Periodic"){o=n,l=r.length-1-o;for(let h=0;h<n;++h)s.push(s[h])}const u=new RC(n,r,s,o,l).getPoints(s.length*12);return new Qt().setFromPoints(u)}}class LC{parse(){const e=[],t=this.parseClips();if(t!==void 0)for(const n in t){const r=t[n],s=this.addClip(r);e.push(s)}return e}parseClips(){if(ze.Objects.AnimationCurve===void 0)return;const e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);const t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){const e=ze.Objects.AnimationCurveNode,t=new Map;for(const n in e){const r=e[n];if(r.attrName.match(/S|R|T|DeformPercent/)!==null){const s={id:r.id,attr:r.attrName,curves:{}};t.set(s.id,s)}}return t}parseAnimationCurves(e){const t=ze.Objects.AnimationCurve;for(const n in t){const r={id:t[n].id,times:t[n].KeyTime.a.map(NC),values:t[n].KeyValueFloat.a},s=It.get(r.id);if(s!==void 0){const a=s.parents[0].ID,o=s.parents[0].relationship;o.match(/X/)?e.get(a).curves.x=r:o.match(/Y/)?e.get(a).curves.y=r:o.match(/Z/)?e.get(a).curves.z=r:o.match(/DeformPercent/)&&e.has(a)&&(e.get(a).curves.morph=r)}}}parseAnimationLayers(e){const t=ze.Objects.AnimationLayer,n=new Map;for(const r in t){const s=[],a=It.get(parseInt(r));a!==void 0&&(a.children.forEach(function(l,c){if(e.has(l.ID)){const u=e.get(l.ID);if(u.curves.x!==void 0||u.curves.y!==void 0||u.curves.z!==void 0){if(s[c]===void 0){const h=It.get(l.ID).parents.filter(function(f){return f.relationship!==void 0});if(h.length===0)return;const d=h[0].ID;if(d!==void 0){const f=ze.Objects.Model[d.toString()];if(f===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}const p={modelName:f.attrName?Je.sanitizeNodeName(f.attrName):"",ID:f.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};Xt.traverse(function(_){_.ID===f.id&&(p.transform=_.matrix,_.userData.transformData&&(p.eulerOrder=_.userData.transformData.eulerOrder,_.userData.transformData.rotation&&(p.initialRotation=_.userData.transformData.rotation)))}),p.transform||(p.transform=new be),"PreRotation"in f&&(p.preRotation=f.PreRotation.value),"PostRotation"in f&&(p.postRotation=f.PostRotation.value),s[c]=p}}s[c]&&(s[c][u.attr]=u)}else if(u.curves.morph!==void 0){if(s[c]===void 0){const h=It.get(l.ID).parents.filter(function(S){return S.relationship!==void 0});if(h.length===0)return;const d=h[0].ID,f=It.get(d).parents[0].ID,p=It.get(f).parents[0].ID,_=It.get(p).parents[0].ID,g=ze.Objects.Model[_],m={modelName:g.attrName?Je.sanitizeNodeName(g.attrName):"",morphName:ze.Objects.Deformer[d].attrName};s[c]=m}s[c][u.attr]=u}}}),n.set(parseInt(r),s))}return n}parseAnimStacks(e){const t=ze.Objects.AnimationStack,n={};for(const r in t){const s=It.get(parseInt(r)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const a=e.get(s[0].ID);n[r]={name:t[r].attrName,layer:a}}return n}addClip(e){let t=[];const n=this;return e.layer.forEach(function(r){t=t.concat(n.generateTracks(r))}),new Zc(e.name,-1,t)}generateTracks(e){const t=[];let n=new F,r=new F;if(e.transform&&e.transform.decompose(n,new Pt,r),n=n.toArray(),r=r.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.T.curves,n,"position");s!==void 0&&t.push(s)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){const s=this.generateRotationTrack(e.modelName,e.R.curves,e.preRotation,e.postRotation,e.eulerOrder,e.initialRotation);s!==void 0&&t.push(s)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.S.curves,r,"scale");s!==void 0&&t.push(s)}if(e.DeformPercent!==void 0){const s=this.generateMorphTrack(e);s!==void 0&&t.push(s)}return t}generateVectorTrack(e,t,n,r){const s=this.getTimesForAllAxes(t),a=this.getKeyframeTrackValues(s,t,n);return new Gs(e+"."+r,s,a)}generateRotationTrack(e,t,n,r,s,a){let o,l;if(t.x!==void 0||t.y!==void 0||t.z!==void 0){const f=this.getTimesForAllAxes(t);if(f.length>0){const p=a||[0,0,0],_=this.synchronizeCurve(t.x,f,p[0]),g=this.synchronizeCurve(t.y,f,p[1]),m=this.synchronizeCurve(t.z,f,p[2]),S=this.interpolateRotations(_,g,m,s);o=S[0],l=S[1]}}const c=Ws(0);n!==void 0&&(n=n.map(nn.degToRad),n.push(c),n=new Yt().fromArray(n),n=new Pt().setFromEuler(n)),r!==void 0&&(r=r.map(nn.degToRad),r.push(c),r=new Yt().fromArray(r),r=new Pt().setFromEuler(r).invert());const u=new Pt,h=new Yt,d=[];if(!(!l||!o)){for(let f=0;f<l.length;f+=3)h.set(l[f],l[f+1],l[f+2],s),u.setFromEuler(h),n!==void 0&&u.premultiply(n),r!==void 0&&u.multiply(r),f>2&&new Pt().fromArray(d,(f-3)/3*4).dot(u)<0&&u.set(-u.x,-u.y,-u.z,-u.w),u.toArray(d,f/3*4);return new Zs(e+".quaternion",o,d)}}generateMorphTrack(e){const t=e.DeformPercent.curves.morph,n=t.values.map(function(s){return s/100}),r=Xt.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new zs(e.modelName+".morphTargetInfluences["+r+"]",t.times,n)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(n,r){return n-r}),t.length>1){let n=1,r=t[0];for(let s=1;s<t.length;s++){const a=t[s];a!==r&&(t[n]=a,r=a,n++)}t=t.slice(0,n)}return t}getKeyframeTrackValues(e,t,n){const r=n,s=[];let a=-1,o=-1,l=-1;return e.forEach(function(c){if(t.x&&(a=t.x.times.indexOf(c)),t.y&&(o=t.y.times.indexOf(c)),t.z&&(l=t.z.times.indexOf(c)),a!==-1){const u=t.x.values[a];s.push(u),r[0]=u}else s.push(r[0]);if(o!==-1){const u=t.y.values[o];s.push(u),r[1]=u}else s.push(r[1]);if(l!==-1){const u=t.z.values[l];s.push(u),r[2]=u}else s.push(r[2])}),s}synchronizeCurve(e,t,n){if(e===void 0)return{times:t,values:t.map(()=>n)};if(e.times.length===t.length)return e;const r=[];for(let s=0;s<t.length;s++)r.push(this.sampleCurveValue(e,t[s],n));return{times:t,values:r}}sampleCurveValue(e,t,n){const r=e.times,s=e.values;if(t<=r[0])return s[0];if(t>=r[r.length-1])return s[s.length-1];for(let a=0;a<r.length-1;a++)if(t>=r[a]&&t<=r[a+1]){if(r[a]===t)return s[a];const o=(t-r[a])/(r[a+1]-r[a]);return s[a]*(1-o)+s[a+1]*o}return n}interpolateRotations(e,t,n,r){const s=[],a=[];s.push(e.times[0]),a.push(nn.degToRad(e.values[0])),a.push(nn.degToRad(t.values[0])),a.push(nn.degToRad(n.values[0]));for(let o=1;o<e.values.length;o++){const l=[e.values[o-1],t.values[o-1],n.values[o-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;const c=l.map(nn.degToRad),u=[e.values[o],t.values[o],n.values[o]];if(isNaN(u[0])||isNaN(u[1])||isNaN(u[2]))continue;const h=u.map(nn.degToRad),d=[u[0]-l[0],u[1]-l[1],u[2]-l[2]],f=[Math.abs(d[0]),Math.abs(d[1]),Math.abs(d[2])];if(f[0]>=180||f[1]>=180||f[2]>=180){const _=Math.max(...f)/180,g=new Yt(...c,r),m=new Yt(...h,r),S=new Pt().setFromEuler(g),M=new Pt().setFromEuler(m);S.dot(M)<0&&M.set(-M.x,-M.y,-M.z,-M.w);const T=e.times[o-1],w=e.times[o]-T,E=new Pt,C=new Yt;for(let v=0;v<1;v+=1/_)E.copy(S.clone().slerp(M.clone(),v)),s.push(T+v*w),C.setFromQuaternion(E,r),a.push(C.x),a.push(C.y),a.push(C.z)}else s.push(e.times[o]),a.push(nn.degToRad(e.values[o])),a.push(nn.degToRad(t.values[o])),a.push(nn.degToRad(n.values[o]))}return[s,a]}}class PC{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new Hg,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const t=this,n=e.split(/[\r\n]+/);return n.forEach(function(r,s){const a=r.match(/^[\s\t]*;/),o=r.match(/^[\s\t]*$/);if(a||o)return;const l=r.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),c=r.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),u=r.match("^\\t{"+(t.currentIndent-1)+"}}");l?t.parseNodeBegin(r,l):c?t.parseNodeProperty(r,c,n[++s]):u?t.popStack():r.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(r)}),this.allNodes}parseNodeBegin(e,t){const n=t[1].trim().replace(/^"/,"").replace(/"$/,""),r=t[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:n},a=this.parseNodeAttr(r),o=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,s):n in o?(n==="PoseNode"?o.PoseNode.push(s):o[n].id!==void 0&&(o[n]={},o[n][o[n].id]=o[n]),a.id!==""&&(o[n][a.id]=s)):typeof a.id=="number"?(o[n]={},o[n][a.id]=s):n!=="Properties70"&&(n==="PoseNode"?o[n]=[s]:o[n]=s),typeof a.id=="number"&&(s.id=a.id),a.name!==""&&(s.attrName=a.name),a.type!==""&&(s.attrType=a.type),this.pushStack(s)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let n="",r="";return e.length>1&&(n=e[1].replace(/^(\w+)::/,""),r=e[2]),{id:t,name:n,type:r}}parseNodeProperty(e,t,n){let r=t[1].replace(/^"/,"").replace(/"$/,"").trim(),s=t[2].replace(/^"/,"").replace(/"$/,"").trim();r==="Content"&&s===","&&(s=n.replace(/"/g,"").replace(/,$/,"").trim());const a=this.getCurrentNode();if(a.name==="Properties70"){this.parseNodeSpecialProperty(e,r,s);return}if(r==="C"){const l=s.split(",").slice(1),c=parseInt(l[0]),u=parseInt(l[1]);let h=s.split(",").slice(3);h=h.map(function(d){return d.trim().replace(/^"/,"")}),r="connections",s=[c,u],BC(s,h),a[r]===void 0&&(a[r]=[])}r==="Node"&&(a.id=s),r in a&&Array.isArray(a[r])?a[r].push(s):r!=="a"?a[r]=s:a.a=s,this.setCurrentProp(a,r),r==="a"&&s.slice(-1)!==","&&(a.a=Il(s))}parseNodePropertyContinued(e){const t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=Il(t.a))}parseNodeSpecialProperty(e,t,n){const r=n.split('",').map(function(u){return u.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=r[0],a=r[1],o=r[2],l=r[3];let c=r[4];switch(a){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=Il(c);break}this.getPrevNode()[s]={type:a,type2:o,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),s)}}class DC{parse(e){const t=new Wf(e);t.skip(23);const n=t.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);const r=new Hg;for(;!this.endOfContent(t);){const s=this.parseNode(t,n);s!==null&&r.add(s.name,s)}return r}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){const n={},r=t>=7500?e.getUint64():e.getUint32(),s=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();const a=e.getUint8(),o=e.getString(a);if(r===0)return null;const l=[];for(let d=0;d<s;d++)l.push(this.parseProperty(e));const c=l.length>0?l[0]:"",u=l.length>1?l[1]:"",h=l.length>2?l[2]:"";for(n.singleProperty=s===1&&e.getOffset()===r;r>e.getOffset();){const d=this.parseNode(e,t);d!==null&&this.parseSubNode(o,n,d)}return n.propertyList=l,typeof c=="number"&&(n.id=c),u!==""&&(n.attrName=u),h!==""&&(n.attrType=h),o!==""&&(n.name=o),n}parseSubNode(e,t,n){if(n.singleProperty===!0){const r=n.propertyList[0];Array.isArray(r)?(t[n.name]=n,n.a=r):t[n.name]=r}else if(e==="Connections"&&n.name==="C"){const r=[];n.propertyList.forEach(function(s,a){a!==0&&r.push(s)}),t.connections===void 0&&(t.connections=[]),t.connections.push(r)}else if(n.name==="Properties70")Object.keys(n).forEach(function(s){t[s]=n[s]});else if(e==="Properties70"&&n.name==="P"){let r=n.propertyList[0],s=n.propertyList[1];const a=n.propertyList[2],o=n.propertyList[3];let l;r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],t[r]={type:s,type2:a,flag:o,value:l}}else t[n.name]===void 0?typeof n.id=="number"?(t[n.name]={},t[n.name][n.id]=n):t[n.name]=n:n.name==="PoseNode"?(Array.isArray(t[n.name])||(t[n.name]=[t[n.name]]),t[n.name].push(n)):t[n.name][n.id]===void 0&&(t[n.name][n.id]=n)}parseProperty(e){const t=e.getString(1);let n;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return n=e.getUint32(),e.getArrayBuffer(n);case"S":return n=e.getUint32(),e.getString(n);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const r=e.getUint32(),s=e.getUint32(),a=e.getUint32();if(s===0)switch(t){case"b":case"c":return e.getBooleanArray(r);case"d":return e.getFloat64Array(r);case"f":return e.getFloat32Array(r);case"i":return e.getInt32Array(r);case"l":return e.getInt64Array(r)}const o=xC(new Uint8Array(e.getArrayBuffer(a))),l=new Wf(o.buffer);switch(t){case"b":case"c":return l.getBooleanArray(r);case"d":return l.getFloat64Array(r);case"f":return l.getFloat32Array(r);case"i":return l.getInt32Array(r);case"l":return l.getInt64Array(r)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}}class Wf{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){const t=[];for(let n=0;n<e;n++)t.push(this.getBoolean());return t}getUint8(){const e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){const e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){const e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt32());return t}getUint32(){const e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){const e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat32());return t}getFloat64(){const e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat64());return t}getArrayBuffer(e){const t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){const t=this.offset;let n=new Uint8Array(this.dv.buffer,t,e);this.skip(e);const r=n.indexOf(0);return r>=0&&(n=new Uint8Array(this.dv.buffer,t,r)),this._textDecoder.decode(n)}}class Hg{add(e,t){this[e]=t}}function FC(i){const e="Kaydara FBX Binary  \0";return i.byteLength>=e.length&&e===zg(i,0,e.length)}function UC(i){const e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let t=0;function n(r){const s=i[r-1];return i=i.slice(t+r),t++,s}for(let r=0;r<e.length;++r)if(n(1)===e[r])return!1;return!0}function Xf(i){const e=/FBXVersion: (\d+)/,t=i.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function NC(i){return i/46186158e3}const OC=[];function Oa(i,e,t,n){let r;switch(n.mappingType){case"ByPolygonVertex":r=i;break;case"ByPolygon":r=e;break;case"ByVertice":r=t;break;case"AllSame":r=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(r=n.indices[r]);const s=r*n.dataSize,a=s+n.dataSize;return kC(OC,n.buffer,s,a)}const Rl=new Yt,wr=new F;function Vg(i){const e=new be,t=new be,n=new be,r=new be,s=new be,a=new be,o=new be,l=new be,c=new be,u=new be,h=new be,d=new be,f=i.inheritType?i.inheritType:0;i.translation&&e.setPosition(wr.fromArray(i.translation));const p=Ws(0);if(i.preRotation){const I=i.preRotation.map(nn.degToRad);I.push(p),t.makeRotationFromEuler(Rl.fromArray(I))}if(i.rotation){const I=i.rotation.map(nn.degToRad);I.push(i.eulerOrder||p),n.makeRotationFromEuler(Rl.fromArray(I))}if(i.postRotation){const I=i.postRotation.map(nn.degToRad);I.push(p),r.makeRotationFromEuler(Rl.fromArray(I)),r.invert()}i.scale&&s.scale(wr.fromArray(i.scale)),i.scalingOffset&&o.setPosition(wr.fromArray(i.scalingOffset)),i.scalingPivot&&a.setPosition(wr.fromArray(i.scalingPivot)),i.rotationOffset&&l.setPosition(wr.fromArray(i.rotationOffset)),i.rotationPivot&&c.setPosition(wr.fromArray(i.rotationPivot)),i.parentMatrixWorld&&(h.copy(i.parentMatrix),u.copy(i.parentMatrixWorld));const _=t.clone().multiply(n).multiply(r),g=new be;g.extractRotation(u);const m=new be;m.copyPosition(u);const S=m.clone().invert().multiply(u),M=g.clone().invert().multiply(S),T=s,w=new be;if(f===0)w.copy(g).multiply(_).multiply(M).multiply(T);else if(f===1)w.copy(g).multiply(M).multiply(_).multiply(T);else{const N=new be().scale(new F().setFromMatrixScale(h)).clone().invert(),W=M.clone().multiply(N);w.copy(g).multiply(_).multiply(W).multiply(T)}const E=c.clone().invert(),C=a.clone().invert();let v=e.clone().multiply(l).multiply(c).multiply(t).multiply(n).multiply(r).multiply(E).multiply(o).multiply(a).multiply(s).multiply(C);const A=new be().copyPosition(v),L=u.clone().multiply(A);return d.copyPosition(L),v=d.clone().multiply(w),v.premultiply(u.invert()),v}function Ws(i){i=i||0;const e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return i===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[i]}function Il(i){return i.split(",").map(function(t){return parseFloat(t)})}function zg(i,e,t){return e===void 0&&(e=0),t===void 0&&(t=i.byteLength),new TextDecoder().decode(new Uint8Array(i,e,t))}function BC(i,e){for(let t=0,n=i.length,r=e.length;t<r;t++,n++)i[n]=e[t]}function kC(i,e,t,n){for(let r=t,s=0;r<n;r++,s++)i[s]=e[r];return i}const vi="Runtime 256x256 transparent PNG, centered subject, 24-36px padding, readable at 100x100.",Cl="Runtime 2160x1000 PNG/WebP legacy source art; cover-cropped for the 864x700 hero stage.",ki="Hero-stage cover backdrop. Drawn as a Three.js texture plane that fills the orthographic 864x700 stage and crops overflow.",HC="Transparent PNG source parts now; later exported as a 2048x2048 atlas plus skeletal JSON.",VC="Temporary browser hero-stage FBX model. Auto-normalized in Three.js to bottom-center pivot and 1.45 world-unit height. Loops animation frames 0-60.",zC="Temporary browser hero-stage texture recovered from the FBX .fbm export folder and applied to the mage mesh when the FBX material does not load a map.",GC="Temporary browser hero-stage FBX kobold enemy model. Auto-normalized in Three.js and uses embedded walk/defeat clips.",WC="Temporary browser hero-stage texture recovered from the kobold FBX .fbm export folder and applied to kobold meshes when the FBX material does not load a map.",XC="Temporary browser hero-stage FBX mini-boss model. Auto-normalized in Three.js and uses embedded walk/defeat clips.",YC="Temporary browser hero-stage texture recovered from the boss FBX .fbm export folder and applied to boss meshes when the FBX material does not load a map.",KC="Runtime 1080x150 source PNG for the fixed middle HUD band; drawn full-width behind HUD text.",qC="Runtime 1080x1080 source PNG for the board base; drawn behind board cells with flat-color fallback.",$C="Runtime ~950x156 PNG title ribbon; scaled to 60% logical width, centered near top for level label.",Yf="Runtime ~254x233 transparent PNG; HUD lives strip uses scaled instances.",jC="Runtime PNG frame for trial monster progress bar; scaled to heart row height.",ZC="Runtime PNG fill art; drawn clipped right-to-left inside the frame inner track.",JC="Runtime ~447x429 transparent PNG; badge on bottom-right of trial enemy fill bar.",Kf="Wide horizontal CTA; title Play / game-over Try Again. Transparent PNG with gold frame.",QC="Runtime transparent PNG pointer hand used as the floating tutorial drag hint.",Si="Runtime transparent PNG banner displayed over the hero stage when a Lightball power-up activates.",eL="Runtime 512x256 transparent PNG spritesheet. Two rows by four columns, eight 128x128 frames, played at 30 FPS for TNT detonations.",tL="Runtime transparent PNG spritesheet. Two rows by four columns, eight 128x128 frames, bottom-center origin, played at 30 FPS for rocket blast waves.",nL="Runtime transparent static PNG, color-tinted for match energy streams flying from the board to the mage staff.",iL="Runtime transparent PNG strip, tiled and color-tinted for Lightball collection links.",Gg={[R.tiles.fire]:xt(R.tiles.fire,"/assets/tiles/tile-fire.png","Assets/Textures/Tiles/tile-fire.png","prompt.tiles.standard",vi),[R.tiles.ice]:xt(R.tiles.ice,"/assets/tiles/tile-ice.png","Assets/Textures/Tiles/tile-ice.png","prompt.tiles.standard",vi),[R.tiles.lightning]:xt(R.tiles.lightning,"/assets/tiles/tile-lightning.png","Assets/Textures/Tiles/tile-lightning.png","prompt.tiles.standard",vi),[R.tiles.earth]:xt(R.tiles.earth,"/assets/tiles/tile-earth.png","Assets/Textures/Tiles/tile-earth.png","prompt.tiles.standard",vi),[R.tiles.empty]:xt(R.tiles.empty,"/assets/tiles/empty.png","Assets/Textures/Tiles/empty.png","prompt.tiles.standard","Runtime empty-cell marker for non-playable Trial void spaces. Drawn as board art only; not matchable or refillable."),[R.powerUps.rocketH]:xt(R.powerUps.rocketH,"/assets/powerups/power-rocket-h.png","Assets/Textures/PowerUps/power-rocket-h.png","prompt.powerups.standard",vi),[R.powerUps.rocketV]:xt(R.powerUps.rocketV,"/assets/powerups/power-rocket-v.png","Assets/Textures/PowerUps/power-rocket-v.png","prompt.powerups.standard",vi),[R.powerUps.tnt]:xt(R.powerUps.tnt,"/assets/powerups/power-tnt.png","Assets/Textures/PowerUps/power-tnt.png","prompt.powerups.standard",vi),[R.powerUps.lightball]:xt(R.powerUps.lightball,"/assets/powerups/power-lightball.png","Assets/Textures/PowerUps/power-lightball.png","prompt.powerups.standard",vi),[R.powerUps.lightballStream]:xt(R.powerUps.lightballStream,"/assets/powerups/lightning.png","Assets/Textures/PowerUps/lightning.png","prompt.powerups.standard",iL,"256x85"),[R.powerUps.orb]:xt(R.powerUps.orb,"/assets/powerups/orb.png","Assets/Textures/PowerUps/orb.png","prompt.powerups.standard",nL),[R.backdrops.forest]:xt(R.backdrops.forest,"/assets/backdrops/backdrop-forest.png","Assets/Textures/Backdrops/backdrop-forest.png","prompt.backdrops.hero",Cl,"2160x1000"),[R.backdrops.crypt]:xt(R.backdrops.crypt,"/assets/backdrops/backdrop-crypt.png","Assets/Textures/Backdrops/backdrop-crypt.png","prompt.backdrops.hero",Cl,"2160x1000"),[R.backdrops.crystalCave]:xt(R.backdrops.crystalCave,"/assets/backdrops/backdrop-crystal-cave.png","Assets/Textures/Backdrops/backdrop-crystal-cave.png","prompt.backdrops.hero",Cl,"2160x1000"),[R.backdrops.castle]:xt(R.backdrops.castle,"/assets/backdrops/bg1.png","Assets/Textures/Backdrops/bg1.png","prompt.backdrops.hero",ki,"cover 864x700 hero stage"),[R.backdrops.bg2]:xt(R.backdrops.bg2,"/assets/backdrops/bg2.png","Assets/Textures/Backdrops/bg2.png","prompt.backdrops.hero",ki,"cover 864x700 hero stage"),[R.backdrops.bg3]:xt(R.backdrops.bg3,"/assets/backdrops/bg3.png","Assets/Textures/Backdrops/bg3.png","prompt.backdrops.hero",ki,"cover 864x700 hero stage"),[R.backdrops.bg4]:xt(R.backdrops.bg4,"/assets/backdrops/bg4.png","Assets/Textures/Backdrops/bg4.png","prompt.backdrops.hero",ki,"cover 864x700 hero stage"),[R.backdrops.bg5]:xt(R.backdrops.bg5,"/assets/backdrops/bg5.png","Assets/Textures/Backdrops/bg5.png","prompt.backdrops.hero",ki,"cover 864x700 hero stage"),[R.backdrops.bg6]:xt(R.backdrops.bg6,"/assets/backdrops/bg6.png","Assets/Textures/Backdrops/bg6.png","prompt.backdrops.hero",ki,"cover 864x700 hero stage"),[R.backdrops.bg7]:xt(R.backdrops.bg7,"/assets/backdrops/bg7.png","Assets/Textures/Backdrops/bg7.png","prompt.backdrops.hero",ki,"cover 864x700 hero stage"),[R.rigs.mage]:Ba(R.rigs.mage,"/assets/rigs/knight2.fbx","Assets/Rigs/Mage/knight2.fbx","prompt.rig.mage","fbx","temporary FBX stand-in, auto-normalized to 1.45 world units",VC),[R.materials.mageTexture]:Ll(R.materials.mageTexture,"/assets/rigs/knight2.fbm/knight_texture_final.png","Assets/Textures/Rigs/Mage/knight_texture_final.png","prompt.rig.mage",zC),[R.spritesheets.tntExplosion]:xt(R.spritesheets.tntExplosion,"/assets/spritesheets/explosion-sprite.png","Assets/Textures/Spritesheets/explosion-sprite.png","prompt.powerups.standard",eL,"512x256, 8 frames at 128x128"),[R.spritesheets.rocketCloud]:xt(R.spritesheets.rocketCloud,"/assets/spritesheets/rocketCloud.png","Assets/Textures/Spritesheets/rocketCloud.png","prompt.powerups.standard",tL,"512x256, 8 frames at 128x128"),[R.spritesheets.fireBurn]:xt(R.spritesheets.fireBurn,"/assets/spritesheets/fire-sheet.png","Assets/Textures/Spritesheets/fire-sheet.png","prompt.powerups.standard","Looping fire burn sprite for Trial monster feet, sampled as a normalized 4x2 grid.","1774x887, 8 frames in a 4x2 grid"),[R.spritesheets.earthImpact]:xt(R.spritesheets.earthImpact,"/assets/spritesheets/rock-sheet.png","Assets/Textures/Spritesheets/rock-sheet.png","prompt.powerups.standard","One-shot earth impact sprite for Trial monster hit positions, sampled as a normalized 2x2 grid.","1254x1254, 4 frames in a 2x2 grid"),[R.rigs.kobold]:Ba(R.rigs.kobold,"/assets/rigs/kobold.fbx","Assets/Rigs/Kobold/kobold.fbx","prompt.rig.kobolds","fbx","temporary FBX stand-in, auto-normalized to 1.16 world units",GC),[R.materials.koboldTexture]:Ll(R.materials.koboldTexture,"/assets/rigs/kobold.fbm/kobold_texture.png","Assets/Textures/Rigs/Kobold/kobold_texture.png","prompt.rig.kobolds",WC),[R.rigs.boss]:Ba(R.rigs.boss,"/assets/rigs/boss.fbx","Assets/Rigs/Boss/boss.fbx","prompt.rig.kobolds","fbx","temporary FBX stand-in, auto-normalized to 1.16 world units",XC),[R.materials.bossTexture]:Ll(R.materials.bossTexture,"/assets/rigs/boss.fbm/kobold_boss_texture.png","Assets/Textures/Rigs/Boss/kobold_boss_texture.png","prompt.rig.kobolds",YC),[R.rigs.tallKobold]:Ba(R.rigs.tallKobold,"/assets/rigs/tall-kobold/tall-kobold-parts-source.png","Assets/Rigs/TallKobold/tall-kobold-rig.json","prompt.rig.kobolds"),[R.ui.hudBanner]:Bt(R.ui.hudBanner,"/assets/ui/ui-banner.png","Assets/Textures/UI/ui-banner.png",KC,"1080x150"),[R.ui.boardBackground]:Bt(R.ui.boardBackground,"/assets/ui/board-background.png","Assets/Textures/UI/board-background.png",qC,"1080x1080"),[R.ui.levelTitlePanel]:Bt(R.ui.levelTitlePanel,"/assets/ui/ui%20title.png","Assets/Textures/UI/ui-title.png",$C,"950x156"),[R.ui.heartFill]:Bt(R.ui.heartFill,"/assets/ui/heart-fill.png","Assets/Textures/UI/heart-fill.png",Yf,"254x233"),[R.ui.heartEmpty]:Bt(R.ui.heartEmpty,"/assets/ui/heart-empty.png","Assets/Textures/UI/heart-empty.png",Yf,"254x233"),[R.ui.trialFillBarBg]:Bt(R.ui.trialFillBarBg,"/assets/ui/ui-fillbar-bg.png","Assets/Textures/UI/ui-fillbar-bg.png",jC,"2155x563"),[R.ui.trialFillBarFill]:Bt(R.ui.trialFillBarFill,"/assets/ui/ui-fillbar-fill.png","Assets/Textures/UI/ui-fillbar-fill.png",ZC,"1952x359"),[R.ui.trialFillBarKoboldIcon]:Bt(R.ui.trialFillBarKoboldIcon,"/assets/ui/ui-icon-kobold.png","Assets/Textures/UI/ui-icon-kobold.png",JC,"447x429"),[R.ui.primaryButton]:Bt(R.ui.primaryButton,"/assets/ui/ui-button.png","Assets/Textures/UI/ui-button.png",Kf,"~1920x384"),[R.ui.primaryButtonPressed]:Bt(R.ui.primaryButtonPressed,"/assets/ui/ui-button-pressed.png","Assets/Textures/UI/ui-button-pressed.png",Kf,"~1920x384"),[R.ui.tutorialFinger]:Bt(R.ui.tutorialFinger,"/assets/ui/finger.png","Assets/Textures/UI/finger.png",QC,"256x256"),[R.ui.activateEarth]:Bt(R.ui.activateEarth,"/assets/ui/activate-earth.png","Assets/Textures/UI/activate-earth.png",Si,"800x450 display"),[R.ui.activateFire]:Bt(R.ui.activateFire,"/assets/ui/activate-fire.png","Assets/Textures/UI/activate-fire.png",Si,"800x450 display"),[R.ui.activateIce]:Bt(R.ui.activateIce,"/assets/ui/activate-ice.png","Assets/Textures/UI/activate-ice.png",Si,"800x450 display"),[R.ui.activateLightning]:Bt(R.ui.activateLightning,"/assets/ui/activate-lightning.png","Assets/Textures/UI/activate-lightning.png",Si,"800x450 display"),[R.ui.levelCleared]:Bt(R.ui.levelCleared,"/assets/ui/level-cleared.png","Assets/Textures/UI/level-cleared.png",Si,"800x450 display"),[R.ui.floorCleared]:Bt(R.ui.floorCleared,"/assets/ui/floor-cleared.png","Assets/Textures/UI/floor-cleared.png",Si,"800x450 display"),[R.ui.lifeLost]:Bt(R.ui.lifeLost,"/assets/ui/life-lost.png","Assets/Textures/UI/life-lost.png",Si,"800x450 display"),[R.ui.gameOver]:Bt(R.ui.gameOver,"/assets/ui/game-over.png","Assets/Textures/UI/game-over.png",Si,"800x450 display"),...Object.fromEntries(Object.values(gu).map(i=>[i.id,sL(i)]))};function Jn(i){return Gg[i]}function rL(){return Object.values(Gg).filter(i=>i.kind==="texture"||i.kind==="ui")}function xt(i,e,t,n,r,s="256x256"){return{id:i,kind:"texture",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:s,unitScale:1,pivot:"center",collision:"none",mhsStaticRefKind:"TextureAsset",mhsTemplateKind:"texture",artPromptId:n,notes:r}}function Ba(i,e,t,n,r="png",s="source parts max 1024px, final atlas 2048x2048",a=HC){return{id:i,kind:"rig",browserUrl:e,futureMhsPath:t,sourceFormat:r,runtimeSize:s,unitScale:1,forwardAxis:"+Z",upAxis:"+Y",pivot:"bottomCenter",collision:"capsule",mhsStaticRefKind:"TemplateAsset",mhsTemplateKind:"actorTemplate",correctiveRotationDeg:{x:0,y:0,z:0},actorTargetHeight:aL(i),artPromptId:n,notes:a}}function Bt(i,e,t,n,r){return{id:i,kind:"ui",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:r,unitScale:1,pivot:"center",collision:"none",mhsStaticRefKind:"TextureAsset",mhsTemplateKind:"uiTexture",notes:n}}function Ll(i,e,t,n,r){return{id:i,kind:"material",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:"runtime FBX diffuse texture",unitScale:1,pivot:"center",collision:"none",mhsStaticRefKind:"TextureAsset",mhsTemplateKind:"materialTexture",artPromptId:n,notes:r}}function sL(i){return{id:i.id,kind:"audio",browserUrl:i.browserUrl,futureMhsPath:i.futureMhsPath,sourceFormat:"mp3",runtimeSize:"browser WAV/MP3 asset; no generated fallback in BrowserAudioAdapter",unitScale:1,pivot:"center",collision:"none",mhsStaticRefKind:"SoundComponent",mhsTemplateKind:"sound",notes:`${i.notes} MHS mapping: ${i.scope==="global"?"global SoundComponent":"template-local SoundComponent"}.`}}function aL(i){switch(i){case R.rigs.mage:return 1.45;case R.rigs.kobold:return 1.16;case R.rigs.boss:return 1.16;case R.rigs.tallKobold:return 1.6;default:return}}const oL="./";function Nn(i,e=oL,t=lL()){if(dL(i))return i;const n=i.replace(/^\/+/,"");return uL(e)?t!=null?new URL(n,hL(t)).toString():`./${n}`:`${cL(e)}${n}`}function lL(){return typeof document>"u"?void 0:document.baseURI}function cL(i){return i.trim()===""?"/":i.endsWith("/")?i:`${i}/`}function uL(i){const e=i.trim();return e===""||e==="./"||e==="."}function hL(i){try{return new URL(".",i).toString()}catch{return i.endsWith("/")?i:`${i}/`}}function dL(i){return/^[a-z][a-z\d+\-.]*:/i.test(i)||i.startsWith("//")}function fL(i){const e=new Map,t=new Map,n=i.clone();return Wg(i,n,function(r,s){e.set(s,r),t.set(r,s)}),n.traverse(function(r){if(!r.isSkinnedMesh)return;const s=r,a=e.get(r),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Wg(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Wg(i.children[n],e.children[n],t)}const pL=new F(0,1,0),mL=.01,gL="Armature|Idle",_L="Armature|Cast",xL="Kobold Walk",vL="Kobold Defeat";function Or(i,e){const t=new In,n=fL(i);LL(n),t.add(n);const s=new zn().setFromObject(n).getSize(new F),a=s.y>0?e/s.y:1;n.scale.multiplyScalar(a),n.updateWorldMatrix(!0,!0);const o=new zn().setFromObject(n),l=o.getCenter(new F);return n.position.x-=l.x,n.position.y-=o.min.y,n.position.z-=l.z,n.updateWorldMatrix(!0,!0),t}function Pl(i){let e=!1;return i.traverse(t=>{t instanceof st&&t.geometry!=null&&(e=!0)}),e}function Dl(i){const e=new Map;if(i.traverse(n=>{n instanceof Bs&&e.set(n.name,n)}),e.size===0)return!1;let t=0;for(const n of e.values())for(const r of n.children)r instanceof Bs&&(t+=wL(n,r)?1:0);return t+=Rr(e.get("hips"),.05,"#4b2e83")?1:0,t+=Rr(e.get("chest"),.065,"#4b2e83")?1:0,t+=Rr(e.get("head"),.06,"#f5e9c9")?1:0,t+=Rr(e.get("hand_l"),.028,"#f5e9c9")?1:0,t+=Rr(e.get("hand_r"),.028,"#f5e9c9")?1:0,t+=Rr(e.get("staff_l"),.025,"#c8a24b")?1:0,t+=RL(e.get("shield"))?1:0,t>0}function SL(i,e,t){const n=i.find(s=>s.duration>0&&s.tracks.length>0);if(n==null)return null;const r=TL(n.duration,e,t);return Lb.subclip(n,`mage-loop-frames-${e}-${t}`,e,t+1,r)}function ML(i,e,t){const n=uo(i,gL,"idle"),r=uo(i,_L,"cast"),s=[];if(n!=null)s.push(ws(n,"idle"));else{const a=SL(i,e,t);a!=null&&s.push(ws(a,"idle"))}return r!=null&&s.push(ws(r,"cast")),s}function qf(i){const e=uo(i,xL,"kobold walk",["walk"]),t=uo(i,vL,"kobold defeat",["defeat"]),n=[];return e!=null&&n.push(ws(e,"walk")),t!=null&&n.push(ws(t,"defeat")),n}function TL(i,e,t){const n=Math.max(1,t-e);return i>0?n/i:24}function yL(i){return i.duration>0&&i.tracks.length>0}function uo(i,e,t,n=[]){const r=e.trim().toLowerCase(),s=t.trim().toLowerCase(),a=n.map(o=>o.trim().toLowerCase());return i.find(o=>{const l=o.name.trim().toLowerCase();return yL(o)&&(l===r||l.endsWith(`|${s}`)||l.endsWith(s)||a.some(c=>l===c||l.endsWith(`|${c}`)||l.endsWith(c)))})}function ws(i,e){const t=i.clone();return t.name=e,t}function Fl(i){i.traverse(e=>{e instanceof st&&Wu(e.material)&&(e.material=new $s({color:"#4b2e83",roughness:.72,metalness:.05}))})}function Ul(i){i.traverse(e=>{if(e instanceof st){Wu(e.material)&&(e.material=Xg());for(const t of Yg(e))t.side=Kt,t.transparent=!1,t.opacity=1,t.depthWrite=!0,t.needsUpdate=!0;e.visible=!0}})}function Nl(i,e){i.traverse(t=>{if(!(t instanceof st))return;const n=AL(t),r=Wu(t.material)?[n?$f(e):Xg()]:Yg(t).map(s=>n?$f(e):bL(s));t.material=r.length===1?r[0]:r,t.visible=!0})}function Ol(i){if(typeof document>"u")return i;const e=i.image,t=e.width??e.naturalWidth??e.videoWidth??0,n=e.height??e.naturalHeight??e.videoHeight??0;if(t<=0||n<=0)return i;const r=document.createElement("canvas");r.width=t,r.height=n;const s=r.getContext("2d");if(s==null)return i;s.drawImage(e,0,0,t,n);const a=s.getImageData(0,0,t,n),o=EL(a.data,t,n);a.data.set(o),s.putImageData(a,0,0);const l=new hg(r);return l.colorSpace=Qe,l.flipY=i.flipY,l.wrapS=i.wrapS,l.wrapT=i.wrapT,l.minFilter=i.minFilter,l.magFilter=i.magFilter,l.generateMipmaps=i.generateMipmaps,l.needsUpdate=!0,l}function EL(i,e,t,n={}){const r=n.iterations??8,s=n.targetAlphaMax??16,a=n.sourceAlphaMin??24,o=new Uint8ClampedArray(i);let l=new Uint8Array(e*t);for(let c=0;c<e*t;c+=1)l[c]=i[c*4+3]>=a?1:0;for(let c=0;c<r;c+=1){const u=new Uint8ClampedArray(o),h=new Uint8Array(l);let d=!1;for(let f=0;f<t;f+=1)for(let p=0;p<e;p+=1){const _=f*e+p,g=_*4;if(l[_]!==0||i[g+3]>s)continue;let m=0,S=0,M=0,T=0;for(let w=-1;w<=1;w+=1)for(let E=-1;E<=1;E+=1){if(E===0&&w===0)continue;const C=p+E,v=f+w;if(C<0||C>=e||v<0||v>=t)continue;const A=v*e+C;if(l[A]===0)continue;const L=A*4;m+=o[L],S+=o[L+1],M+=o[L+2],T+=1}T>0&&(u[g]=Math.round(m/T),u[g+1]=Math.round(S/T),u[g+2]=Math.round(M/T),h[_]=1,d=!0)}if(o.set(u),l=h,!d)break}return o}function Xg(){return new $s({color:"#8b6fcb",roughness:.66,metalness:.08,side:Kt,transparent:!1,opacity:1,depthWrite:!0})}function $f(i){return new ln({map:i,color:"#ffffff",side:Kt,transparent:!0,alphaTest:mL,opacity:1,depthWrite:!0})}function bL(i){return i.side=Kt,i.transparent=!1,i.opacity=1,i.depthWrite=!0,i.needsUpdate=!0,i}function AL(i){return i.geometry.getAttribute("uv")!=null}function Yg(i){return Array.isArray(i.material)?i.material:[i.material]}function wL(i,e){const t=e.position.clone(),n=t.length();if(n<.015)return!1;const r=IL(i.name),s=new st(new qs(r,r,n,8),CL(i.name));return s.name=`proxy-segment-${i.name}-${e.name}`,s.position.copy(t).multiplyScalar(.5),s.quaternion.setFromUnitVectors(pL,t.clone().normalize()),i.add(s),!0}function Rr(i,e,t){if(i==null)return!1;const n=new st(new Bu(e,12,8),Rs(t));return n.name=`proxy-sphere-${i.name}`,i.add(n),!0}function RL(i){if(i==null)return!1;const e=new st(new or(.09,.12,.018),Rs("#c8a24b"));return e.name=`proxy-shield-${i.name}`,e.position.y=.04,i.add(e),!0}function IL(i){return i.includes("staff")||i.includes("hair")||i.endsWith("_end")?.01:i.includes("chest")||i.includes("hips")||i.includes("neck")?.026:i.includes("pauldron")||i.includes("shield")?.02:.017}function CL(i){return i.includes("head")||i.includes("hand")||i.includes("neck")?Rs("#f5e9c9"):i.includes("staff")||i.includes("shield")||i.includes("pauldron")?Rs("#c8a24b"):Rs("#4b2e83")}function Rs(i){return new $s({color:i,roughness:.68,metalness:i==="#c8a24b"?.18:.04})}function LL(i){i.traverse(e=>{e instanceof st&&(e.geometry=e.geometry.clone(),e.material=Kg(e.material))})}function Kg(i){if(Array.isArray(i))return i.map(n=>Kg(n));const e=i.clone(),t=i.map;if(t instanceof Ut&&"map"in e){const n=t.clone();n.needsUpdate=!0,e.map=n}return e}function Wu(i){return Array.isArray(i)?i.length===0:i==null}const qg=1.45,ho=1.16,PL=0,DL=60,FL=-Math.PI/2,UL=-Math.PI/2,Zi=10.8,Yi=Zi/(ke/Dt);class NL{constructor(){Y(this,"mageTemplate",null);Y(this,"pendingMageTemplate",null);Y(this,"mageTemplateVersion",0);Y(this,"mageLoadStarted",!1);Y(this,"mageTexture",null);Y(this,"mageTextureLoadStarted",!1);Y(this,"mageTextureDebugShown",!1);Y(this,"mageBoneOnlyWarningShown",!1);Y(this,"koboldTemplate",null);Y(this,"pendingKoboldTemplate",null);Y(this,"koboldTemplateVersion",0);Y(this,"koboldLoadStarted",!1);Y(this,"koboldTexture",null);Y(this,"koboldTextureLoadStarted",!1);Y(this,"koboldTextureDebugShown",!1);Y(this,"koboldBoneOnlyWarningShown",!1);Y(this,"bossTemplate",null);Y(this,"pendingBossTemplate",null);Y(this,"bossTemplateVersion",0);Y(this,"bossLoadStarted",!1);Y(this,"bossTexture",null);Y(this,"bossTextureLoadStarted",!1);Y(this,"bossTextureDebugShown",!1);Y(this,"bossBoneOnlyWarningShown",!1);this.startMageModelLoad(),this.startKoboldModelLoad(),this.startBossModelLoad()}create(e,t){switch(e){case mt.backdropForest:return VL(t??R.backdrops.castle);case mt.mage:return this.createMage();case mt.pathMarker:return XL();case mt.monsterPlaceholder:return this.createKobold();case mt.miniBoss:return this.createBoss();case mt.projectilePlaceholder:return YL();case mt.fireBurn:return KL();case mt.earthImpact:return qL();case mt.healthBarTrack:return jf(R.ui.trialFillBarBg,"health-bar-track");case mt.healthBarFill:return jf(R.ui.trialFillBarFill,"health-bar-fill");default:return ZL(e)}}getTemplateVersion(e,t){return e===mt.backdropForest?zL(t??R.backdrops.castle):e===mt.mage?this.mageTemplateVersion:e===mt.monsterPlaceholder?this.koboldTemplateVersion:e===mt.miniBoss?this.bossTemplateVersion:0}dispose(e){e.traverse(t=>{t instanceof st&&(t.geometry.dispose(),tu(t.material)),t instanceof eb&&(t.geometry.dispose(),tu(t.material))})}disposeCachedResources(){this.mageTemplate!=null&&(this.dispose(this.mageTemplate),this.mageTemplate=null),this.pendingMageTemplate!=null&&(this.dispose(this.pendingMageTemplate),this.pendingMageTemplate=null),this.mageTexture=null,this.koboldTemplate!=null&&(this.dispose(this.koboldTemplate),this.koboldTemplate=null),this.pendingKoboldTemplate!=null&&(this.dispose(this.pendingKoboldTemplate),this.pendingKoboldTemplate=null),this.koboldTexture=null,this.bossTemplate!=null&&(this.dispose(this.bossTemplate),this.bossTemplate=null),this.pendingBossTemplate!=null&&(this.dispose(this.pendingBossTemplate),this.pendingBossTemplate=null),this.bossTexture=null}createMage(){return this.startMageModelLoad(),this.mageTemplate!=null?OL(this.mageTemplate):new In}createKobold(){return this.startKoboldModelLoad(),this.koboldTemplate!=null?kL(this.koboldTemplate):new In}createBoss(){return this.startBossModelLoad(),this.bossTemplate!=null?HL(this.bossTemplate):new In}startMageModelLoad(){if(this.mageLoadStarted||typeof window>"u")return;const e=Jn(R.rigs.mage);if((e==null?void 0:e.sourceFormat)!=="fbx")return;this.mageLoadStarted=!0;const t=new wl,n=Nn(e.browserUrl);t.load(n,r=>{const s=Pl(r);if(!s){const a=Dl(r);if(this.mageBoneOnlyWarningShown||(console.warn(a?`Mage FBX at ${n} has animation bones but no renderable meshes; using temporary bone proxy visuals.`:`Mage FBX at ${n} has no renderable meshes and no usable bones; keeping placeholder mage.`),this.mageBoneOnlyWarningShown=!0),!a)return}Fl(r),Ul(r),this.pendingMageTemplate=Or(r,qg),this.pendingMageTemplate.animations=ML(r.animations,PL,DL),s&&(this.publishMageTemplateIfTextureReady(),this.startMageTextureLoad())},void 0,r=>{console.warn(`Failed to load mage FBX from ${n}`,r)})}startMageTextureLoad(){if(this.mageTextureLoadStarted||typeof window>"u")return;const e=Jn(R.materials.mageTexture);if(e==null)return;this.mageTextureLoadStarted=!0;const t=Nn(e.browserUrl);new Ji().load(t,n=>{n.colorSpace=Qe,this.mageTexture=Ol(n),this.publishMageTemplateIfTextureReady()},void 0,n=>{console.warn(`Failed to load mage texture from ${t}`,n)})}publishMageTemplateIfTextureReady(){return this.pendingMageTemplate==null||this.mageTexture==null?!1:(Nl(this.pendingMageTemplate,this.mageTexture),this.mageTextureDebugShown,this.mageTemplate!=null&&this.dispose(this.mageTemplate),this.mageTemplate=this.pendingMageTemplate,this.pendingMageTemplate=null,this.mageTemplateVersion+=1,!0)}startKoboldModelLoad(){if(this.koboldLoadStarted||typeof window>"u")return;const e=Jn(R.rigs.kobold);if((e==null?void 0:e.sourceFormat)!=="fbx")return;this.koboldLoadStarted=!0;const t=new wl,n=Nn(e.browserUrl);t.load(n,r=>{const s=Pl(r);if(!s){const a=Dl(r);if(this.koboldBoneOnlyWarningShown||(console.warn(a?`Kobold FBX at ${n} has animation bones but no renderable meshes; using temporary bone proxy visuals.`:`Kobold FBX at ${n} has no renderable meshes and no usable bones; keeping placeholder kobold.`),this.koboldBoneOnlyWarningShown=!0),!a)return}Fl(r),Ul(r),this.pendingKoboldTemplate=Or(r,ho),this.pendingKoboldTemplate.animations=qf(r.animations),s&&(this.publishKoboldTemplateIfTextureReady(),this.startKoboldTextureLoad())},void 0,r=>{console.warn(`Failed to load kobold FBX from ${n}`,r)})}startKoboldTextureLoad(){if(this.koboldTextureLoadStarted||typeof window>"u")return;const e=Jn(R.materials.koboldTexture);if(e==null)return;this.koboldTextureLoadStarted=!0;const t=Nn(e.browserUrl);new Ji().load(t,n=>{n.colorSpace=Qe,this.koboldTexture=Ol(n),this.publishKoboldTemplateIfTextureReady()},void 0,n=>{console.warn(`Failed to load kobold texture from ${t}`,n)})}publishKoboldTemplateIfTextureReady(){return this.pendingKoboldTemplate==null||this.koboldTexture==null?!1:(Nl(this.pendingKoboldTemplate,this.koboldTexture),this.koboldTextureDebugShown,this.koboldTemplate!=null&&this.dispose(this.koboldTemplate),this.koboldTemplate=this.pendingKoboldTemplate,this.pendingKoboldTemplate=null,this.koboldTemplateVersion+=1,!0)}startBossModelLoad(){if(this.bossLoadStarted||typeof window>"u")return;const e=Jn(R.rigs.boss);if((e==null?void 0:e.sourceFormat)!=="fbx")return;this.bossLoadStarted=!0;const t=new wl,n=Nn(e.browserUrl);t.load(n,r=>{const s=Pl(r);if(!s){const a=Dl(r);if(this.bossBoneOnlyWarningShown||(console.warn(a?`Boss FBX at ${n} has animation bones but no renderable meshes; using temporary bone proxy visuals.`:`Boss FBX at ${n} has no renderable meshes and no usable bones; keeping placeholder boss.`),this.bossBoneOnlyWarningShown=!0),!a)return}Fl(r),Ul(r),this.pendingBossTemplate=Or(r,ho),this.pendingBossTemplate.animations=qf(r.animations),s&&(this.publishBossTemplateIfTextureReady(),this.startBossTextureLoad())},void 0,r=>{console.warn(`Failed to load boss FBX from ${n}`,r)})}startBossTextureLoad(){if(this.bossTextureLoadStarted||typeof window>"u")return;const e=Jn(R.materials.bossTexture);if(e==null)return;this.bossTextureLoadStarted=!0;const t=Nn(e.browserUrl);new Ji().load(t,n=>{n.colorSpace=Qe,this.bossTexture=Ol(n),this.publishBossTemplateIfTextureReady()},void 0,n=>{console.warn(`Failed to load boss texture from ${t}`,n)})}publishBossTemplateIfTextureReady(){return this.pendingBossTemplate==null||this.bossTexture==null?!1:(Nl(this.pendingBossTemplate,this.bossTexture),this.bossTextureDebugShown,this.bossTemplate!=null&&this.dispose(this.bossTemplate),this.bossTemplate=this.pendingBossTemplate,this.pendingBossTemplate=null,this.bossTemplateVersion+=1,!0)}}function OL(i){const e=Or(i,qg);return BL(e),e.animations=i.animations,e}function BL(i){const e=i.children[0]??i;e.rotation.y=FL}function kL(i){const e=Or(i,ho);return $g(e),e.animations=i.animations,e}function HL(i){const e=Or(i,ho);return $g(e),e.animations=i.animations,e}function $g(i){const e=i.children[0]??i;e.rotation.y=UL}function VL(i){const e=new In,t=new Wn(1,1),n=new ln({color:"#2d2345",depthWrite:!1}),r=new st(t,n);return r.name="castle-backdrop-plane",r.renderOrder=-100,jg(r,Zi/Yi),e.add(r),WL(r,i),e}function zL(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function GL(i){const e=Number.isFinite(i)&&i>0?i:Zi/Yi,t=Zi/Yi;if(e>t)return{width:Yi*e,height:Yi,centerY:0};const n=Zi/e;return{width:Zi,height:n,centerY:Yi/2-n/2}}function jg(i,e){const t=GL(e);i.scale.set(t.width,t.height,1),i.position.y=t.centerY}function WL(i,e){if(typeof window>"u")return;const t=Jn(e);if(t==null)return;const n=Nn(t.browserUrl);new Ji().load(n,r=>{r.colorSpace=Qe;const s=r.image,a=(s==null?void 0:s.width)!=null&&(s==null?void 0:s.height)!=null&&s.height>0?s.width/s.height:Zi/Yi;jg(i,a),tu(i.material),i.material=new ln({map:r,depthWrite:!1})},void 0,r=>{console.warn(`Failed to load hero-stage backdrop texture (${e}) from ${n}`,r)})}function XL(){return Yu(new qs(.45,.45,.05,24),"#f5e9c9",0,0,0)}function YL(){return Yu(new qs(.05,.05,1,8),"#f2c94c",0,0,0,Math.PI/2)}function KL(){const i=new ln({map:Xu(),color:"#ffffff",transparent:!0,opacity:.92,depthWrite:!1,depthTest:!1,side:Kt}),e=new st(new Wn(1,1),i);return e.name="fire-burn-sprite",e.position.y=.5,e.renderOrder=12,$L(i),e}function qL(){const i=new ln({map:Xu(),color:"#ffffff",transparent:!0,opacity:.94,depthWrite:!1,depthTest:!1,side:Kt}),e=new st(new Wn(1,1),i);return e.name="earth-impact-sprite",e.renderOrder=14,Zg(i,R.spritesheets.earthImpact,2,2,"earth impact"),e}function $L(i){Zg(i,R.spritesheets.fireBurn,4,2,"fire burn")}function Zg(i,e,t,n,r){if(typeof window>"u")return;const s=Jn(e);if(s==null)return;const a=Nn(s.browserUrl);new Ji().load(a,o=>{var l;o.colorSpace=Qe,o.wrapS=rn,o.wrapT=rn,o.repeat.set(1/t,1/n),o.offset.set(0,1-1/n),(l=i.map)==null||l.dispose(),i.map=o,i.needsUpdate=!0},void 0,o=>{console.warn(`Failed to load ${r} spritesheet from ${a}`,o)})}function jL(i,e,t){if(typeof window>"u")return;const n=Jn(e);if(n==null)return;const r=Nn(n.browserUrl);new Ji().load(r,s=>{var a;s.colorSpace=Qe,s.wrapS=rn,s.wrapT=rn,(a=i.map)==null||a.dispose(),i.map=s,i.needsUpdate=!0},void 0,s=>{console.warn(`Failed to load ${t} texture from ${r}`,s)})}function Xu(){const i=new To(new Uint8Array([0,0,0,0]),1,1,pn);return i.colorSpace=Qe,i.needsUpdate=!0,i}function jf(i,e){const t=new ln({map:Xu(),color:"#ffffff",transparent:!0,opacity:1,depthWrite:!1,side:Kt}),n=new st(new Wn(1,1),t);return n.name=e,n.renderOrder=8,n.userData.textureAssetId=i,jL(t,i,e),n}function ZL(i){const e=JL(i);return Yu(new or(.7,.7,.7),e,0,.35,0)}function Yu(i,e,t,n,r,s=0){const a=new $s({color:e,roughness:.7,metalness:.05}),o=new st(i,a);return o.position.set(t,n,r),o.rotation.z=s,o}function tu(i){if(Array.isArray(i)){for(const e of i)Zf(e);return}Zf(i)}function Zf(i){"map"in i&&i.map instanceof Ut&&i.map.dispose(),i.dispose()}function JL(i){let e=0;for(let t=0;t<i.length;t+=1)e=e*31+i.charCodeAt(t)>>>0;return`#${(e&16777215).toString(16).padStart(6,"0")}`}class Jf{constructor(){Y(this,"objectById",new Map);Y(this,"templateById",new Map);Y(this,"templateVersionById",new Map)}get(e){return this.objectById.get(e)}set(e,t,n,r){this.objectById.set(e,r),this.templateById.set(e,t),this.templateVersionById.set(e,n)}getTemplateId(e){return this.templateById.get(e)}getTemplateVersion(e){return this.templateVersionById.get(e)}entries(){return this.objectById.entries()}delete(e){this.objectById.delete(e),this.templateById.delete(e),this.templateVersionById.delete(e)}clear(){this.objectById.clear(),this.templateById.clear(),this.templateVersionById.clear()}}const QL=15,eP=60,Bl={x:.7,y:.24,z:0},Jg=18,tP=2.35,nP=.24,iP=Math.PI*5.2,rP=4,sP=2,aP=8,oP=12,lP=2,cP=2,uP=4,hP=12,Qf=new WeakMap;class dP{constructor(e){Y(this,"backgroundScene",new Wd);Y(this,"foregroundScene",new Wd);Y(this,"backgroundCamera",tp(ke/Dt));Y(this,"camera",tp(ke/Dt));Y(this,"backgroundRenderer");Y(this,"renderer");Y(this,"factory",new NL);Y(this,"backgroundObjectCache",new Jf);Y(this,"objectCache",new Jf);Y(this,"projectileCache",new Map);Y(this,"mageChargeCache",new Map);Y(this,"cameraController",new rC);Y(this,"animationControllers",new Map);Y(this,"castTriggeredProjectileIds",new Set);Y(this,"elapsedSec",0);Y(this,"cameraBoundsOptions",{});this.container=e,this.backgroundRenderer=new Gf({antialias:!0,alpha:!0}),this.backgroundRenderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.backgroundRenderer.setSize(ke,Dt,!1),this.backgroundRenderer.domElement.className="hero-stage-canvas hero-stage-canvas--background",this.container.appendChild(this.backgroundRenderer.domElement),this.renderer=new Gf({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(ke,Dt,!1),this.renderer.domElement.className="hero-stage-canvas hero-stage-canvas--foreground",this.container.appendChild(this.renderer.domElement),this.backgroundScene.background=new Fe("#20172f"),this.foregroundScene.add(new yg("#ffffff",1.5));const t=new Tg("#fff4d6",1.2);t.position.set(3,4,5),this.foregroundScene.add(t)}render(e,t){this.elapsedSec+=Math.max(0,t),this.syncCamera(e),this.syncObjects(e.objects),this.syncProjectileCastTriggers(e.activeProjectiles),this.updateAnimationMixers(t),this.syncMageCharges(e.activeProjectiles),this.syncProjectiles(e.activeProjectiles),this.backgroundRenderer.render(this.backgroundScene,this.backgroundCamera),this.renderer.render(this.foregroundScene,this.camera)}resize(e,t,n=1,r="center"){this.backgroundRenderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.backgroundRenderer.setSize(e,t,!1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(e,t,!1),this.cameraBoundsOptions={viewScale:n,anchor:r},np(this.backgroundCamera,e/t,this.cameraBoundsOptions),np(this.camera,e/t,this.cameraBoundsOptions),this.backgroundCamera.updateProjectionMatrix(),this.camera.updateProjectionMatrix()}getMageParticleSourceLogicalPosition(e=ke,t=Dt){return DP(this.objectCache.get("actor-mage"),this.camera,e,t)}dispose(){for(const[,e]of this.backgroundObjectCache.entries())this.backgroundScene.remove(e),this.factory.dispose(e);for(const[,e]of this.objectCache.entries())this.foregroundScene.remove(e),this.factory.dispose(e);for(const[,e]of this.projectileCache.entries())this.foregroundScene.remove(e.mesh),e.lightningRay!=null&&this.foregroundScene.remove(e.lightningRay),op(e);for(const[,e]of this.mageChargeCache.entries())this.foregroundScene.remove(e.mesh),lp(e);this.animationControllers.clear(),this.castTriggeredProjectileIds.clear(),this.backgroundObjectCache.clear(),this.objectCache.clear(),this.projectileCache.clear(),this.mageChargeCache.clear(),this.factory.disposeCachedResources(),this.backgroundRenderer.dispose(),this.renderer.dispose(),this.backgroundRenderer.domElement.remove(),this.renderer.domElement.remove()}syncCamera(e){this.cameraController.apply(this.backgroundCamera,e.camera,ip(this.backgroundCamera),this.cameraBoundsOptions),this.cameraController.apply(this.camera,e.camera,ip(this.camera),this.cameraBoundsOptions)}syncProjectileCastTriggers(e){const t=new Set;for(const n of e)t.add(n.projectileId),!(n.originKind==="world"||!CP(n)||this.castTriggeredProjectileIds.has(n.projectileId))&&(this.triggerObjectCastAnimation("actor-mage"),this.castTriggeredProjectileIds.add(n.projectileId));for(const n of[...this.castTriggeredProjectileIds])t.has(n)||this.castTriggeredProjectileIds.delete(n)}syncProjectiles(e){const t=new Set,n=this.objectCache.get("actor-mage");for(const r of e){if(!LP(r))continue;const s=`projectile-${r.projectileId}`;t.add(s);const a=ap(r,n),o=this.getOrCreateProjectile(s,a);BP(o,a,this.elapsedSec)}for(const[r,s]of[...this.projectileCache.entries()])t.has(r)||(this.foregroundScene.remove(s.mesh),s.lightningRay!=null&&this.foregroundScene.remove(s.lightningRay),op(s),this.projectileCache.delete(r))}syncMageCharges(e){const t=new Set,n=this.objectCache.get("actor-mage");for(const r of e){if(!FP(r))continue;const s=`mage-charge-${r.projectileId}`;t.add(s);const a=ap(r,n),o=this.getOrCreateMageCharge(s,a);XP(o,a)}for(const[r,s]of[...this.mageChargeCache.entries()])t.has(r)||(this.foregroundScene.remove(s.mesh),lp(s),this.mageChargeCache.delete(r))}getOrCreateMageCharge(e,t){const n=this.mageChargeCache.get(e);if(n!=null)return n;const r=OP(t);return this.mageChargeCache.set(e,r),this.foregroundScene.add(r.mesh),r}getOrCreateProjectile(e,t){const n=this.projectileCache.get(e);if(n!=null)return n;const r=NP(t);return this.projectileCache.set(e,r),this.foregroundScene.add(r.mesh),r.lightningRay!=null&&this.foregroundScene.add(r.lightningRay),r}syncObjects(e){const t=e.filter(r=>rp(r)),n=e.filter(r=>!rp(r));this.syncObjectLayer(t,this.backgroundScene,this.backgroundObjectCache,!1),this.syncObjectLayer(n,this.foregroundScene,this.objectCache,!0)}syncObjectLayer(e,t,n,r){const s=new Set;for(const a of e){s.add(a.objectId);const o=this.getOrCreateObject(a,t,n,r);vP(o,a,this.elapsedSec),r&&this.syncObjectAnimation(a.objectId,a.animationId,a.animationPaused,a.animationTimeSec)}for(const[a,o]of[...n.entries()])s.has(a)||(t.remove(o),r&&this.animationControllers.delete(a),this.factory.dispose(o),n.delete(a))}getOrCreateObject(e,t,n,r){const s=n.get(e.objectId),a=this.factory.getTemplateVersion(e.templateId,e.backdropTextureId);if(s!=null&&n.getTemplateId(e.objectId)===e.templateId&&n.getTemplateVersion(e.objectId)===a)return s;s!=null&&(t.remove(s),r&&this.animationControllers.delete(e.objectId),this.factory.dispose(s),n.delete(e.objectId));const o=this.factory.create(e.templateId,e.backdropTextureId);return n.set(e.objectId,e.templateId,a,o),r&&this.attachAnimationController(e.objectId,o),t.add(o),o}attachAnimationController(e,t){const n=fP(t);n!=null&&this.animationControllers.set(e,n)}triggerObjectCastAnimation(e){const t=this.animationControllers.get(e);t!=null&&pP(t)}syncObjectAnimation(e,t,n,r){const s=this.animationControllers.get(e);if(s!=null){if(t==="defeat"){Qg(s,"defeat");return}(t==="walk"||t==="idle")&&(Ku(s,t),r!=null&&mP(s,r),qu(s,n===!0))}}updateAnimationMixers(e){const t=Math.max(0,e);for(const n of this.animationControllers.values())gP(n,t)}}function fP(i){const e=i.animations.find(p=>p.name==="idle"),t=i.animations.find(p=>p.name==="walk"),n=i.animations.find(p=>p.name==="cast"),r=i.animations.find(p=>p.name==="defeat"),s=e??t??i.animations.find(p=>p.name!=="cast"&&p.name!=="defeat")??i.animations[0];if(s==null&&n==null&&r==null)return null;const a=new lA(i),o=e??(t==null?s:void 0),l=o==null?void 0:ep(a,o),c=t==null?void 0:ep(a,t),u=n==null?void 0:a.clipAction(n);u!=null&&(u.setLoop(io,1),u.clampWhenFinished=!1,u.setEffectiveWeight(0));const h=r==null?void 0:a.clipAction(r);h!=null&&(h.setLoop(io,1),h.clampWhenFinished=!0,h.setEffectiveWeight(0));const d=t!=null&&e==null?"walk":"idle",f={mixer:a,idleAction:l,walkAction:c,castAction:u,defeatAction:h,castDurationSec:(n==null?void 0:n.duration)??0,castRemainingSec:0,defeatDurationSec:(r==null?void 0:r.duration)??0,defeatRemainingSec:0,activeLoopId:d,loopPaused:!1};return Ku(f,d),f}function ep(i,e){const t=i.clipAction(e);return t.reset(),t.setLoop(Qm,1/0),t.setEffectiveWeight(0),t.play(),t}function pP(i){Qg(i,"cast")}function Qg(i,e){var r,s;const t=e==="cast"?i.castAction:i.defeatAction,n=e==="cast"?i.castDurationSec:i.defeatDurationSec;t==null||n<=0||e==="defeat"&&i.activeOneShotId==="defeat"||((r=i.idleAction)==null||r.setEffectiveWeight(0),(s=i.walkAction)==null||s.setEffectiveWeight(0),qu(i,!1),t.reset(),t.setLoop(io,1),t.clampWhenFinished=e==="defeat",t.enabled=!0,t.setEffectiveWeight(1),t.play(),i.activeOneShotId=e,e==="cast"?i.castRemainingSec=i.castDurationSec:i.defeatRemainingSec=i.defeatDurationSec)}function Ku(i,e){var r,s;if(i.activeOneShotId==="defeat")return;const t=e==="walk"?i.walkAction:i.idleAction,n=t??i.idleAction??i.walkAction;n!=null&&(i.activeLoopId=t===i.walkAction?"walk":"idle",!(i.castRemainingSec>0||i.defeatRemainingSec>0)&&((r=i.idleAction)==null||r.setEffectiveWeight(n===i.idleAction?1:0),(s=i.walkAction)==null||s.setEffectiveWeight(n===i.walkAction?1:0),n.enabled=!0,n.play(),n.paused=i.loopPaused))}function qu(i,e){if(i.loopPaused=e,i.activeOneShotId==null){if(i.activeLoopId==="walk"){i.walkAction!=null&&(i.walkAction.paused=e);return}i.idleAction!=null&&(i.idleAction.paused=e)}}function mP(i,e){const t=Math.max(0,e);if(i.activeLoopId==="walk"){i.walkAction!=null&&(i.walkAction.time=t);return}i.idleAction!=null&&(i.idleAction.time=t)}function gP(i,e){const t=Math.max(0,e);i.mixer.update(t),i.defeatRemainingSec>0&&(i.defeatRemainingSec=Math.max(0,i.defeatRemainingSec-t),i.defeatRemainingSec<=0&&_P(i)),i.castRemainingSec>0&&(i.castRemainingSec=Math.max(0,i.castRemainingSec-t),i.castRemainingSec<=0&&xP(i))}function _P(i){var e,t;i.defeatAction==null||i.defeatDurationSec<=0||(i.activeOneShotId="defeat",i.defeatAction.enabled=!0,i.defeatAction.clampWhenFinished=!0,i.defeatAction.paused=!0,i.defeatAction.time=i.defeatDurationSec,i.defeatAction.setEffectiveWeight(1),(e=i.walkAction)==null||e.setEffectiveWeight(0),(t=i.idleAction)==null||t.setEffectiveWeight(0))}function xP(i){i.castAction!=null&&(i.castAction.stop(),i.castAction.setEffectiveWeight(0)),i.activeOneShotId=void 0,Ku(i,i.activeLoopId??"idle"),qu(i,i.loopPaused)}function tp(i){const e=Gu(i);return new Eo(e.left,e.right,e.top,e.bottom,.1,100)}function np(i,e,t={}){const n=Gu(e,t);i.left=n.left,i.right=n.right,i.top=n.top,i.bottom=n.bottom}function ip(i){const e=i.right-i.left,t=i.top-i.bottom;return t>0?e/t:1}function rp(i){return i.templateId===mt.backdropForest}function vP(i,e,t){const n=e.transform;i.position.set(n.position.x,n.position.y,n.position.z),i.quaternion.set(n.rotation.x,n.rotation.y,n.rotation.z,n.rotation.w),i.scale.set(n.scale.x,n.scale.y,n.scale.z),i.visible=e.visible,SP(i,e.visualVariant),e.animationId==="victory"&&(i.position.y+=Math.sin(t*8)*.08),e.animationId==="stunned"&&(i.rotation.z=Math.sin(t*18)*.12),e.animationId==="yank"&&(i.position.y+=Math.min(1.6,t%1.4*1.8)),i.traverse(r=>{r instanceof st&&(r.renderOrder=e.renderOrder??0,e.templateId===mt.fireBurn&&bP(r.material,e.animationTimeSec??t),e.templateId===mt.earthImpact&&AP(r.material,e.animationTimeSec??t),wP(r.material,e.textureCrop),RP(r.material,e.tintHex,e.opacity,MP(e.depthMode)))})}function SP(i,e){if(e!=null){for(const t of e.hiddenPartIds??[])sp(i,t,!1);for(const t of e.visiblePartIds??[])sp(i,t,!0)}}function MP(i){if(i==="alwaysOnTop")return!1}function sp(i,e,t){const n=new Set([e,Je.sanitizeNodeName(e)]);i.traverse(r=>{n.has(r.name)&&(r.visible=t)})}function TP(i){return Math.floor(Math.max(0,i)*oP)%aP}function yP(i){return Math.min(uP-1,Math.floor(Math.max(0,i)*hP))}function EP(i,e,t){const n=Math.max(1,Math.floor(e)),r=Math.max(1,Math.floor(t)),s=n*r,a=(Math.floor(i)%s+s)%s,o=a%n,l=Math.floor(a/n),c=1/n,u=1/r;return{repeatX:c,repeatY:u,offsetX:o*c,offsetY:1-u-l*u}}function bP(i,e){const t=TP(e);e0(i,t,rP,sP)}function AP(i,e){const t=yP(e);e0(i,t,lP,cP)}function e0(i,e,t,n){const r=Array.isArray(i)?i:[i],s=EP(e,t,n);for(const a of r)!(a instanceof ln)||a.map==null||(a.map.repeat.set(s.repeatX,s.repeatY),a.map.offset.set(s.offsetX,s.offsetY),a.map.needsUpdate=!0)}function wP(i,e){if(e==null)return;const t=Array.isArray(i)?i:[i];for(const n of t)!(n instanceof ln)||n.map==null||(n.map.repeat.set(e.repeatX,e.repeatY),n.map.offset.set(e.offsetX,e.offsetY),n.map.needsUpdate=!0)}function RP(i,e,t,n){const r=Array.isArray(i)?i:[i];for(const s of r)if(s instanceof $s||s instanceof ln){const a=IP(s);e!=null?s.color.set(e):s.color.copy(a.color),t!=null?(s.opacity=t,s.transparent=t<1):(s.opacity=a.opacity,s.transparent=a.transparent),s.depthTest=n??a.depthTest}}function IP(i){const e=Qf.get(i);if(e!=null)return e;const t={color:i.color.clone(),opacity:i.opacity,transparent:i.transparent,depthTest:i.depthTest};return Qf.set(i,t),t}function $u(i){switch(i){case"fire":return"#ff8a1f";case"ice":return"#38d5ff";case"lightning":return"#f2c94c";case"earth":return"#27ae60"}}function ju(i){return{color:$u(i.schoolId),blending:(i.effectKind==="bomb",Ei),transparent:!0}}function t0(i){return ju(i)}function CP(i){return i.castActivationDelaySec<=0}function LP(i){return i.activationDelaySec<=0&&i.remainingSec>0}function ap(i,e){if(i.originKind==="world")return i;const t=n0(e);return t==null?i:{...i,from:t}}function n0(i){if(i==null)return null;const e=i.getObjectByName("particleSource");if(e==null)return null;i.updateWorldMatrix(!0,!0),e.updateWorldMatrix(!0,!1);const t=e.getWorldPosition(new F);return{x:t.x+Bl.x,y:t.y+Bl.y,z:t.z+Bl.z}}function PP(i,e,t,n){const r=new F(i.x,i.y,i.z).project(e);return!Number.isFinite(r.x)||!Number.isFinite(r.y)?null:{x:(r.x+1)/2*t,y:(1-r.y)/2*n}}function DP(i,e,t,n){const r=n0(i);return r==null?null:PP(r,e,t,n)}function FP(i){return i.castActivationDelaySec<=0&&i.activationDelaySec>0&&i.chargeDurationSec>0}function UP(i){return wi(1-i.activationDelaySec/Math.max(.001,i.chargeDurationSec))}function NP(i){const e=YP(i.effectKind),t=new Wn(1,1),n=a0(),r=ju(i),s=new ln({map:n,color:r.color,transparent:!0,opacity:1,blending:r.blending,depthWrite:!1,depthTest:!0}),a=new og(t,s,e);return a.frustumCulled=!1,a.renderOrder=i.effectKind==="bomb"?32:30,{mesh:a,texture:n,dummy:new gt,lightningRay:i.schoolId==="lightning"?kP(i):void 0}}function OP(i){const e=new Wn(1,1),t=a0(),n=t0(i),r=new ln({map:t,color:n.color,transparent:n.transparent,opacity:1,blending:n.blending,depthWrite:!1,depthTest:!0}),s=new og(e,r,KP(i.effectKind));return s.frustumCulled=!1,s.renderOrder=31,{mesh:s,texture:t,dummy:new gt}}function BP(i,e,t){const n=eD(e),r=tD(e),s=$P(e.effectKind,n),a=qP(e.effectKind),o=ju(e);for(let l=0;l<i.mesh.count;l+=1){const c=ni(`${e.projectileId}:along:${l}`),u=ni(`${e.projectileId}:angle:${l}`),h=ni(`${e.projectileId}:radius:${l}`),d=wi(n*jP(e.effectKind)-c*r0(e.effectKind)),f=Zu(d),p=u*Math.PI*2,_=Math.sqrt(h)*Math.sin(d*Math.PI),g=s.horizontal*_,m=s.vertical*_,S=e.from.x+r.dx*f+r.perpX*Math.cos(p)*g,M=e.from.y+r.dy*f+r.perpY*Math.cos(p)*g+Math.sin(p)*m,T=e.from.z+r.dz*f+Math.sin(p)*s.depth*_,w=.75+h*.45;i.dummy.position.set(S,M,T),i.dummy.rotation.set(0,0,0),i.dummy.scale.set(a.x*w,a.y*w,1),i.dummy.updateMatrix(),i.mesh.setMatrixAt(l,i.dummy.matrix)}i.mesh.instanceMatrix.needsUpdate=!0,i.mesh.material.color.set(o.color),i.mesh.material.opacity=s0(e.effectKind,n),i.mesh.material.blending=o.blending,i.mesh.material.needsUpdate=!0,HP(i,e,n,t)}function kP(i){const e=new Qt,t=new ln(zP(i)),n=new st(e,t);return n.frustumCulled=!1,n.renderOrder=eP,i0(n,i,0),n}function HP(i,e,t,n){i.lightningRay!=null&&(i0(i.lightningRay,e,n),i.lightningRay.material.color.set($u(e.schoolId)),i.lightningRay.material.opacity=s0(e.effectKind,t),i.lightningRay.material.needsUpdate=!0)}function i0(i,e,t){const n=WP(e,t);i.geometry.setAttribute("position",new Tn(n.positions,3)),i.geometry.setIndex(n.indices),i.geometry.computeVertexNormals(),i.geometry.computeBoundingSphere()}function VP(i=ke){return Pg/i*QL}function zP(i){return{color:$u(i.schoolId),transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,side:Kt}}function GP(i,e=0,t=Jg){const n=Math.max(1,Math.floor(t)),r=i.to.x-i.from.x,s=i.to.y-i.from.y,a=i.to.z-i.from.z,o=Math.hypot(r,s),l=o>0?-s/o:1,c=o>0?r/o:0,u=[],h=ni(`${i.projectileId}:ray:phase`)*Math.PI*2;for(let d=0;d<=n;d+=1){const f=d/n,p=d===0||d===n,_=Math.sin(f*Math.PI),g=p?0:Math.sin(f*tP*Math.PI*2-e*iP+h)*nP*_,m=p?0:(ni(`${i.projectileId}:ray:lateral:${d}`)-.5)*.08*_,S=p?0:(ni(`${i.projectileId}:ray:depth:${d}`)-.5)*.04*_;u.push({x:i.from.x+r*f+l*(g+m),y:i.from.y+s*f+c*(g+m),z:i.from.z+a*f+S})}return u}function WP(i,e=0,t=VP(),n=Jg){const r=GP(i,e,n),s=new Float32Array(r.length*2*3),a=[],o=t/2;return r.forEach((l,c)=>{const u=r[Math.max(0,c-1)],h=r[Math.min(r.length-1,c+1)],d=h.x-u.x,f=h.y-u.y,p=Math.hypot(d,f),_=p>0?-f/p:0,g=p>0?d/p:1,m=c*6,S=m+3;if(s[m]=l.x+_*o,s[m+1]=l.y+g*o,s[m+2]=l.z,s[S]=l.x-_*o,s[S+1]=l.y-g*o,s[S+2]=l.z,c<r.length-1){const M=c*2;a.push(M,M+1,M+2,M+1,M+3,M+2)}}),{centerline:r,positions:s,indices:a}}function XP(i,e){const t=UP(e),n=Math.sin(t*Math.PI),r=ZP(e.effectKind,t),s=JP(e.effectKind,t);for(let o=0;o<i.mesh.count;o+=1){const l=ni(`${e.projectileId}:charge:angle:${o}`),c=ni(`${e.projectileId}:charge:radius:${o}`),u=ni(`${e.projectileId}:charge:z:${o}`),h=l*Math.PI*2+t*Math.PI*1.3,d=Math.sqrt(c)*r*(.35+n*.65),f=e.from.x+Math.cos(h)*d,p=e.from.y+Math.sin(h)*d*.82,_=e.from.z+(u-.5)*r*.42,g=.75+c*.65+n*.35;i.dummy.position.set(f,p,_),i.dummy.rotation.set(0,0,0),i.dummy.scale.set(s.x*g,s.y*g,1),i.dummy.updateMatrix(),i.mesh.setMatrixAt(o,i.dummy.matrix)}i.mesh.instanceMatrix.needsUpdate=!0;const a=t0(e);i.mesh.material.color.set(a.color),i.mesh.material.blending=a.blending,i.mesh.material.opacity=QP(e.effectKind,t),i.mesh.material.needsUpdate=!0}function op(i){i.mesh.geometry.dispose(),i.mesh.material.dispose(),i.texture.dispose(),i.lightningRay!=null&&(i.lightningRay.geometry.dispose(),i.lightningRay.material.dispose())}function lp(i){i.mesh.geometry.dispose(),i.mesh.material.dispose(),i.texture.dispose()}function YP(i){return i==="bomb"?220:96}function KP(i){return i==="bomb"?120:72}function qP(i){return i==="bomb"?{x:.6,y:.78}:{x:.27,y:.36}}function $P(i,e){const t=(i==="bomb"?.68:.2)*(.45+Zu(e)*.55);return{horizontal:t,vertical:t*1.8,depth:t*.45}}function r0(i){return i==="bomb"?.52:.34}function jP(i){return 1+r0(i)}function s0(i,e){const t=wi(e/.16),n=wi((1-e)/(i==="bomb"?.32:.42));return(i==="bomb"?.78:.92)*Math.min(t,n)}function ZP(i,e){return(i==="bomb"?.36:.22)*(.7+Zu(e)*.65)}function JP(i,e){const t=i==="bomb"?.18:.12,n=Math.sin(e*Math.PI);return{x:t*(.85+n*.55),y:t*(.85+n*.55)}}function QP(i,e){const t=wi(e/.16),n=wi((1-e)/.2);return(i==="bomb"?.9:.78)*Math.min(t,n)}function a0(){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");if(t==null)throw new Error("Unable to create projectile particle texture context.");const n=64/2,r=t.createRadialGradient(n,n,0,n,n,n);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.36,"rgba(255, 255, 255, 0.82)"),r.addColorStop(.72,"rgba(255, 255, 255, 0.22)"),r.addColorStop(1,"rgba(255, 255, 255, 0)"),t.fillStyle=r,t.fillRect(0,0,64,64);const s=new hg(e);return s.colorSpace=Qe,s.needsUpdate=!0,s}function eD(i){return wi(1-i.remainingSec/Math.max(.001,i.durationSec))}function tD(i){const e=i.to.x-i.from.x,t=i.to.y-i.from.y,n=i.to.z-i.from.z,r=Math.hypot(e,t),s=r>0?-t/r:1,a=r>0?e/r:0;return{dx:e,dy:t,dz:n,perpX:s,perpY:a}}function ni(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function Zu(i){return 1-Math.pow(1-wi(i),3)}function wi(i){return Math.max(0,Math.min(1,i))}async function nD(i=rL()){const e=await Promise.all(i.map(iD));return Object.fromEntries(e.filter(t=>t!=null))}function iD(i){return new Promise(e=>{const t=new Image;t.onload=()=>e([i.id,t]),t.onerror=()=>e(null),t.src=Nn(i.browserUrl)})}function rD(i){return i("(hover: none) and (pointer: coarse)").matches}function cp(i){return i.fullscreenElement??i.webkitFullscreenElement??i.webkitCurrentFullScreenElement??null}function sD(i){return o0(i)!=null}function aD(i){const e=o0(i);return e==null?Promise.reject(new Error("Fullscreen request is not supported by this browser.")):Promise.resolve(e.call(i))}function oD(i){return i.isMobileFullscreenTarget&&!i.requestAttempted&&i.fullscreenElement==null&&i.canRequestFullscreen}function o0(i){return i.requestFullscreen??i.webkitRequestFullscreen??i.webkitRequestFullScreen??null}const lD=.45;class cD{constructor(e){Y(this,"gameShell");Y(this,"stageElement");Y(this,"debugPanel");Y(this,"heroStageElement");Y(this,"renderer");Y(this,"heroStage");Y(this,"boardAnimationPresenter",new dT);Y(this,"fullscreenRequestAttempted",!1);Y(this,"activeHeroHeight",Dt);Y(this,"activeHeroRenderHeight",Dt);Y(this,"activeHeroBackgroundSceneScale",1);Y(this,"activeHeroForegroundSceneScale",1);Y(this,"activeHeroSceneOffsetX",0);Y(this,"activeHeroSceneOffsetY",0);Y(this,"lastHudLives",mm);Y(this,"heartLossAnim",null);e.innerHTML=`
      <main class="game-shell" aria-label="Magus Match prototype shell">
        <section class="logical-stage">
          <canvas class="game-canvas" width="${ke}" height="${Sn}" aria-label="Magus Match board and HUD"></canvas>
          <div class="hero-stage" data-hero-stage aria-label="Magus Match hero stage"></div>
        </section>
        <div class="debug-panel" data-debug></div>
      </main>
    `,this.gameShell=ms(e,".game-shell"),this.stageElement=ms(e,".logical-stage"),this.debugPanel=ms(e,"[data-debug]");const t=ms(e,".game-canvas");this.heroStageElement=ms(e,"[data-hero-stage]");const n=t.getContext("2d");if(n==null)throw new Error("Unable to create 2D canvas context.");this.renderer=new ZT(n,{},ke,Sn),this.heroStage=new dP(this.heroStageElement),nD().then(r=>{this.renderer.setImages(r)})}resizeLogicalStage(e=this.activeHeroHeight,t=this.activeHeroBackgroundSceneScale,n=this.activeHeroForegroundSceneScale,r=this.activeHeroRenderHeight,s=this.activeHeroSceneOffsetX,a=this.activeHeroSceneOffsetY){this.activeHeroHeight=e,this.activeHeroBackgroundSceneScale=t,this.activeHeroForegroundSceneScale=n,this.activeHeroRenderHeight=r,this.activeHeroSceneOffsetX=s,this.activeHeroSceneOffsetY=a;const o=this.gameShell.getBoundingClientRect(),l=Math.min(o.width/ke,o.height/Sn);this.stageElement.style.transform=`scale(${l})`,this.heroStageElement.style.height=`${this.activeHeroHeight}px`,this.heroStageElement.style.setProperty("--hero-background-scene-scale",`${this.activeHeroBackgroundSceneScale}`),this.heroStageElement.style.setProperty("--hero-foreground-scene-scale",`${this.activeHeroForegroundSceneScale}`),this.heroStageElement.style.setProperty("--hero-scene-offset-x",`${this.activeHeroSceneOffsetX}px`),this.heroStageElement.style.setProperty("--hero-scene-offset-y",`${this.activeHeroSceneOffsetY}px`),this.heroStage.resize(ke,this.activeHeroRenderHeight)}renderInitial(e,t,n,r){this.renderHud(n),this.applyBoardPresentation(e),this.heroStage.render(t,0),xd(this.renderer,this.boardAnimationPresenter.present(e,0,{matchEnergyTarget:e.matchEnergyTarget}),n,0,r)}render(e){const t=this.getHeartLossWobble(e.hudState,e.timeSec);this.renderHud(e.hudState),this.applyBoardPresentation(e.boardState),this.heroStage.render(e.heroWorldState,e.dtSec),xd(this.renderer,this.boardAnimationPresenter.present(e.boardState,e.timeSec,{matchEnergyTarget:e.boardState.matchEnergyTarget}),e.hudState,e.timeSec,e.screenState,t)}requestFullscreen(){oD({requestAttempted:this.fullscreenRequestAttempted,fullscreenElement:cp(document),canRequestFullscreen:sD(this.gameShell),isMobileFullscreenTarget:rD(window.matchMedia.bind(window))})&&(this.fullscreenRequestAttempted=!0,aD(this.gameShell).catch(()=>{this.fullscreenRequestAttempted=!1}))}handleFullscreenChange(){cp(document)==null&&(this.fullscreenRequestAttempted=!1),this.resizeLogicalStage()}dispose(){this.heroStage.dispose()}applyBoardPresentation(e){const t=e.tutorialPresentation;this.resizeLogicalStage((t==null?void 0:t.heroHeight)??Dt,(t==null?void 0:t.backgroundSceneScale)??(t==null?void 0:t.sceneScale)??1,(t==null?void 0:t.foregroundSceneScale)??(t==null?void 0:t.sceneScale)??1,uD(t==null?void 0:t.mode),(t==null?void 0:t.sceneOffsetX)??0,(t==null?void 0:t.sceneOffsetY)??0)}renderHud(e){this.debugPanel.textContent=`${e.phase} | ${e.debugText??""}`}getHeartLossWobble(e,t){const n=this.lastHudLives;if(e.lives<n&&(this.heartLossAnim={slotIndex:n-1,startedAtSec:t}),e.lives>n&&(this.heartLossAnim=null),this.lastHudLives=e.lives,this.heartLossAnim==null)return;const r=Math.min(1,(t-this.heartLossAnim.startedAtSec)/lD),s={slotIndex:this.heartLossAnim.slotIndex,progress01:r};return r>=1&&(this.heartLossAnim=null),s}}function uD(i){return Dt}function ms(i,e){const t=i.querySelector(e);if(t==null)throw new Error(`Missing required element: ${e}`);return t}const hD=!0,l0=document.querySelector("#app");if(l0==null)throw new Error("Missing #app root element.");const up=AM(window.location.search),hp=wM(window.location.search),dD=RM(window.location.search),fD=new XS(up,{debugStartLevel:hp,oneLifeDoubleSpeed:dD,skipTutorial:up!=null||hp!=null}),Qs=new cD(l0),pD=new IM(Qs.gameShell),mD=new BM(hD),gD=new VM,c0=new kM({app:fD,input:pD,presentation:Qs,audio:mD,persistence:gD});window.addEventListener("resize",()=>Qs.resizeLogicalStage());document.addEventListener("fullscreenchange",()=>Qs.handleFullscreenChange());document.addEventListener("webkitfullscreenchange",()=>Qs.handleFullscreenChange());window.addEventListener("beforeunload",()=>{c0.dispose()});c0.start();export{R as A,UM as a,xD as g,Nn as r};
