var Lf=Object.defineProperty;var Df=(i,e,t)=>e in i?Lf(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Le=(i,e,t)=>Df(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Zt=1080,Un=1920,Hr=500,An=150,Uf=1270,Re=8,Nf=Hr+An,Ff=(Uf-Zt)/2,Ae={x:0,y:Nf+Ff,width:Zt,height:Zt,cellSize:Zt/Re},Cc={x:300,y:1040,width:480,height:112},Rc={x:300,y:1570,width:480,height:112},Ic={x:930,y:Hr,width:150,height:An};function Oa(i,e){return i.x>=e.x&&i.y>=e.y&&i.x<e.x+e.width&&i.y<e.y+e.height}function Lo(i){const e=i.x-Ae.x,t=i.y-Ae.y;return e<0||t<0||e>=Ae.width||t>=Ae.height?null:{col:Math.floor(e/Ae.cellSize),row:Math.floor(t/Ae.cellSize)}}const ra=2654435769;class sa{constructor(e=ra){Le(this,"state");this.state=e>>>0,this.state===0&&(this.state=ra)}nextUint32(){let e=this.state;return e^=e<<13,e^=e>>>17,e^=e<<5,this.state=e>>>0,this.state}nextFloat(){return this.nextUint32()/4294967296}nextInt(e,t){if(!Number.isInteger(e)||!Number.isInteger(t))throw new Error("nextInt bounds must be integers.");if(t<=e)throw new Error("nextInt maxExclusive must be greater than minInclusive.");return e+Math.floor(this.nextFloat()*(t-e))}getState(){return this.state}}function Ba(){if(typeof crypto<"u"&&"getRandomValues"in crypto){const e=new Uint32Array(1);return crypto.getRandomValues(e),e[0]===0?ra:e[0]}const i=Math.floor(Math.random()*4294967295)>>>0;return i===0?ra:i}const fr=["FIRE","ICE","LIGHTNING","EARTH"],Of=["ROCKET_H","ROCKET_V","TNT","LIGHTBALL"];function Ui(i){return fr.includes(i)}function aa(i){return Of.includes(i)}function xa(i){return Ui(i)||i==="LAND"}function is(i="tile"){let e=0;return()=>`${i}-${e++}`}function rs(i,e="tile"){let t=Gf(i,e);return()=>`${e}-${t++}`}function ss(i,e,t,n=is(`${i.toLowerCase()}-${e}-${t}`),r="IDLE"){return{id:n(),type:i,col:e,row:t,state:r,spawnedAtMs:0}}function Nl(i={}){return Array.from({length:Re},(e,t)=>Array.from({length:Re},(n,r)=>{var s;return{tile:null,blocker:null,modifier:null,isVoid:((s=i.voidCells)==null?void 0:s.some(a=>a.col===r&&a.row===t))??!1,isPath:!1}}))}function xt(i){return i.map(e=>e.map(t=>({tile:t.tile==null?null:{...t.tile},blocker:t.blocker==null?null:zf(t.blocker),modifier:t.modifier,isVoid:t.isVoid,isPath:t.isPath})))}function Bf(i,e={},t=is("tile")){const n=Nl(e);return gh(n,i,t),n}function gh(i,e,t=is("tile")){for(let n=0;n<Re;n+=1)for(let r=0;r<Re;r+=1){const s=i[n][r];if(s.isVoid||s.tile!=null)continue;const a=fr.filter(c=>!_h(i,{col:r,row:n},c)),o=a.length>0?a:fr,l=o[e.nextInt(0,o.length)];s.tile=ss(l,r,n,t)}}function _h(i,e,t){return ci(i,e,t,-1,0)+ci(i,e,t,1,0)+1>=3||ci(i,e,t,0,-1)+ci(i,e,t,0,1)+1>=3}function ci(i,e,t,n,r){let s=0,a=e.col+n,o=e.row+r;for(;Sa({col:a,row:o});){const l=i[o][a].tile;if((l==null?void 0:l.type)!==t)break;s+=1,a+=n,o+=r}return s}function Sa(i){return i.col>=0&&i.col<Re&&i.row>=0&&i.row<Re}function Yt(i,e){return Sa(e)?i[e.row][e.col]:null}function Fl(i,e,t){const n=Yt(i,e),r=Yt(i,t);if(n==null||r==null)throw new Error("Cannot swap cells outside board.");const s=n.tile,a=r.tile;n.tile=a==null?null:{...a,col:e.col,row:e.row},r.tile=s==null?null:{...s,col:t.col,row:t.row}}function cr(i){const e=[];for(let t=0;t<Re;t+=1)for(let n=0;n<Re;n+=1)i[t][n].isVoid||e.push({col:n,row:t});return e}function kf(i){const e=[];for(let t=0;t<Re;t+=1)for(let n=0;n<Re;n+=1)i[t][n].isVoid&&e.push({col:n,row:t});return e}function Vf(i,e){return i.col===e.col&&i.row===e.row}function dt(i){return`${i.col},${i.row}`}function In(i){const e=new Set,t=[];for(const n of i){const r=dt(n);e.has(r)||(e.add(r),t.push(n))}return Ni(t)}function Ni(i){return[...i].sort((e,t)=>e.row-t.row||e.col-t.col)}function zf(i){return{type:i.type,hp:i.hp,position:{...i.position}}}function Gf(i,e){var r;const t=`${e}-`;let n=-1;for(const s of i)for(const a of s){const o=(r=a.tile)==null?void 0:r.id;if(o==null||!o.startsWith(t))continue;const l=o.slice(t.length);/^\d+$/.test(l)&&(n=Math.max(n,Number(l)))}return n+1}function ui(i){return{cells:cr(i).map(e=>{const t=i[e.row][e.col],n=t.tile;return n==null?null:{tileId:n.id,tileType:n.type,coord:e,isPath:t.isPath}}).filter(e=>e!=null)}}function ya(i,e,t){return{kind:i.kind??"resolution",revisionId:i.revisionId,swappedCells:i.swappedCells??null,preSwapSnapshot:ui(i.preSwapBoard),postSwapSnapshot:ui(i.postSwapBoard),cascadeSteps:e,finalSnapshot:ui(t)}}function Hf(i,e){const t={cells:[]},n=ui(i),r=jf(i)?qf(i,n.cells):n.cells.map(s=>({tileId:s.tileId,tileType:s.tileType,from:{col:s.coord.col,row:s.coord.row-Re},to:s.coord,isPath:s.isPath})).sort((s,a)=>s.to.col-a.to.col||a.to.row-s.to.row);return{kind:"levelIntro",revisionId:e,swappedCells:null,preSwapSnapshot:t,postSwapSnapshot:t,cascadeSteps:[{stepIndex:0,beforeClearSnapshot:t,beforeGravitySnapshot:t,afterGravitySnapshot:t,finalSnapshot:n,clearedTiles:[],fallingTiles:[],refillTiles:r}],finalSnapshot:n}}function Ma(i,e,t,n,r,s,a=new Map,o=[]){const l=ui(e),c=ui(t),h=ui(n),u=ui(r),d=Xf(l),f=Pc(c),p=Pc(h),_=new Set(h.cells.map(T=>T.tileId)),g=In(s).map(T=>d.get(dt(T))).filter(T=>T!=null).map(T=>({...T,clearDelayMs:a.get(dt(T.coord))})),m=[...p.values()].map(T=>{const C=f.get(T.tileId);return C==null||tp(C.coord,T.coord)?null:{tileId:T.tileId,tileType:T.tileType,from:C.coord,to:T.coord,isPath:T.isPath,movementKind:C.coord.col===T.coord.col?"fall":"slide"}}).filter(T=>T!=null),S=u.cells.filter(T=>!_.has(T.tileId)).sort((T,C)=>T.coord.col-C.coord.col||C.coord.row-T.coord.row),M=Yf(S,o);return{stepIndex:i,beforeClearSnapshot:l,beforeGravitySnapshot:c,afterGravitySnapshot:h,finalSnapshot:u,clearedTiles:Jf(g),fallingTiles:Qf(m),refillTiles:ep(M)}}function Wf(i,e){if(i!=null)return{...i,revisionId:e}}function Xf(i){return new Map(i.cells.map(e=>[dt(e.coord),e]))}function Pc(i){return new Map(i.cells.map(e=>[e.tileId,e]))}function Yf(i,e=[]){const t=new Map(e.map(r=>[r.tileId,r])),n=new Map;return i.map(r=>{const s=t.get(r.tileId);if(s!=null)return{...s,tileType:r.tileType,to:r.coord,isPath:r.isPath};const a=n.get(r.coord.col)??0;return n.set(r.coord.col,a+1),{tileId:r.tileId,tileType:r.tileType,from:{col:r.coord.col,row:-1-a},to:r.coord,isPath:r.isPath}})}function qf(i,e){const t=new Map;return[...e].sort((n,r)=>n.coord.col-r.coord.col||r.coord.row-n.coord.row).map(n=>{if(!Kf(i,n.coord)){const s=t.get(n.coord.col)??0;return t.set(n.coord.col,s+1),{tileId:n.tileId,tileType:n.tileType,from:{col:n.coord.col,row:-1-s},to:n.coord,isPath:n.isPath,movementKind:"fall"}}const r=$f(i,n.coord);return{tileId:n.tileId,tileType:n.tileType,from:{col:r,row:Zf(i,r,n.coord.row)},to:n.coord,isPath:n.isPath,movementKind:"slide"}})}function jf(i){return i.some(e=>e.some(t=>t.isVoid))}function Kf(i,e){for(let t=0;t<e.row;t+=1)if(i[t][e.col].isVoid)return!0;return!1}function $f(i,e){const t=e.col-1,n=e.col+1,r=(e.row+e.col)%2===0?[t,n]:[n,t];for(const s of r)if(s>=0&&s<Re&&i.some(a=>!a[s].isVoid))return s;return Math.max(0,Math.min(Re-1,e.col===0?1:e.col-1))}function Zf(i,e,t){for(let n=t-1;n>=0;n-=1)if(!i[n][e].isVoid)return n;for(let n=t;n<Re;n+=1)if(!i[n][e].isVoid)return n;return-1}function Jf(i){return[...i].sort((e,t)=>e.coord.row-t.coord.row||e.coord.col-t.coord.col)}function Qf(i){return[...i].sort((e,t)=>e.to.row-t.to.row||e.to.col-t.to.col)}function ep(i){return[...i].sort((e,t)=>e.to.row-t.to.row||e.to.col-t.to.col)}function tp(i,e){return i.col===e.col&&i.row===e.row}const np=30,Ta=120,vh=180,xh=90,Ks=180,Sh=630,yh=135,ip=45,rp=45,ka=2,Lc=12,sp=80,ap=2500;function Mh(i){const e=Th(i);return e.length===0?Ta:e[e.length-1].endMs}function Th(i){let e=i.kind==="levelIntro"?0:Ta;return i.cascadeSteps.map(t=>{const n=e,r=n+op(i,t),s=bh(t),a=lp(t),o={step:t,popStartMs:n,fallStartMs:r,endMs:r+a,fallDelaysByTileId:s};return e=o.endMs,o})}function op(i,e){return i.kind==="levelIntro"?0:Math.max(0,...e.clearedTiles.map(n=>n.clearDelayMs??0))+vh}function lp(i){const e=bh(i),t=wh(i).reduce((n,r)=>{const s=Math.max(1,Math.abs(r.to.row-r.from.row)),a=cp(s*xh+yh,Ks,Sh);return Math.max(n,(e.get(r.tileId)??0)+a)},Ks);return Math.max(Ks,t)}function bh(i){const e=new Map;for(const n of wh(i))e.set(n.to.col,[...e.get(n.to.col)??[],n]);const t=new Map;for(const n of e.values())[...n].sort((s,a)=>a.to.row-s.to.row||a.from.row-s.from.row||s.tileId.localeCompare(a.tileId)).forEach((s,a)=>{t.set(s.tileId,a*np)});return t}function wh(i){return[...i.fallingTiles,...i.refillTiles]}function cp(i,e,t){return Math.max(e,Math.min(t,i))}const X={tiles:{fire:"tile.fire",ice:"tile.ice",lightning:"tile.lightning",earth:"tile.earth",land:"tile.land",path:"tile.path",empty:"tile.empty"},powerUps:{rocketH:"power.rocketH",rocketV:"power.rocketV",tnt:"power.tnt",lightball:"power.lightball"},backdrops:{forest:"backdrop.forest",crypt:"backdrop.crypt",crystalCave:"backdrop.crystalCave",castle:"backdrop.castle"},rigs:{mage:"rig.mage",prince:"rig.prince",kobold:"rig.kobold",tallKobold:"rig.tallKobold"},props:{princeCage:"prop.princeCage",goalFlag:"prop.goalFlag",abductorGlove:"prop.abductorGlove",abductorHook:"prop.abductorHook",abductorHand:"prop.abductorHand",abductorRope:"prop.abductorRope"},ui:{hudBanner:"ui.hudBanner"},sounds:{tileMatch:"sound.tileMatch",comboPitchStep:"sound.comboPitchStep",fireWhoosh:"sound.spell.fire.whoosh",iceWhoosh:"sound.spell.ice.whoosh",lightningWhoosh:"sound.spell.lightning.whoosh",earthWhoosh:"sound.spell.earth.whoosh",fireImpact:"sound.spell.fire.impact",iceImpact:"sound.spell.ice.impact",lightningImpact:"sound.spell.lightning.impact",earthImpact:"sound.spell.earth.impact",pathConvert:"sound.pathConvert",mageWalk:"sound.mageWalk",monsterDamage:"sound.monsterDamage",monsterDefeat:"sound.monsterDefeat",powerupCreate:"sound.powerupCreate",victorySting:"sound.victorySting",cageYankWhoosh:"sound.cageYankWhoosh",runEnd:"sound.runEnd"}};function up(i){return i<=3?{moveBudget:20,candidatePathLandRatio:.5,offPathLandRatio:.2}:i<=7?{moveBudget:18,candidatePathLandRatio:.45,offPathLandRatio:.18}:i<=12?{moveBudget:16,candidatePathLandRatio:.4,offPathLandRatio:.16}:i<=18?{moveBudget:15,candidatePathLandRatio:.36,offPathLandRatio:.14}:{moveBudget:14,candidatePathLandRatio:.32,offPathLandRatio:.12}}function Eh(i){return i<=3?{basicKoboldCount:3,tallKoboldCount:0,miniBossCount:0,waveCount:1,spawnIntervalMs:1200,waveGapMs:0,basicKoboldHp:18,tallKoboldHp:40,miniBossHp:100,walkSpeed:.2,baseDamage:12}:i<=7?{basicKoboldCount:5,tallKoboldCount:1,miniBossCount:0,waveCount:1,spawnIntervalMs:1050,waveGapMs:0,basicKoboldHp:24,tallKoboldHp:46,miniBossHp:110,walkSpeed:.22,baseDamage:13}:i<=12?{basicKoboldCount:6,tallKoboldCount:2,miniBossCount:0,waveCount:1,spawnIntervalMs:950,waveGapMs:0,basicKoboldHp:30,tallKoboldHp:58,miniBossHp:120,walkSpeed:.28,baseDamage:14}:i<=18?{basicKoboldCount:7,tallKoboldCount:3,miniBossCount:i%3===0?1:0,waveCount:1,spawnIntervalMs:850,waveGapMs:0,basicKoboldHp:38,tallKoboldHp:72,miniBossHp:135,walkSpeed:.32,baseDamage:15}:{basicKoboldCount:8,tallKoboldCount:4,miniBossCount:2,waveCount:2,spawnIntervalMs:750,waveGapMs:2200,basicKoboldHp:45,tallKoboldHp:86,miniBossHp:160,walkSpeed:.38,baseDamage:16}}const Nr={col:0,row:0},Do={col:7,row:7},Ol={from:{col:3,row:1},to:{col:3,row:0}},Dc=[{col:1,row:0},{col:2,row:0},Ol.from];function Va(i){const e=new sa(i.seed),t=up(i.difficulty),n=hp(e,Nr,Do);if(n.length-1>t.moveBudget)throw new Error("Generated Journey path exceeds move budget.");const r=is("journey-tile"),s=Nl();s[Nr.row][Nr.col].isPath=!0;const a=fp(s,e,r,n,t.candidatePathLandRatio,t.offPathLandRatio);return gh(s,e,r),{type:"JOURNEY",difficulty:i.difficulty,seed:i.seed,initialBoard:s,journey:{moveBudget:t.moveBudget,startCell:Nr,goalCell:Do,landTilePositions:a,candidatePathSolution:n,firstHint:Ol}}}function hp(i,e,t){const n=[e,{col:1,row:0},{col:2,row:0},{col:3,row:0}],r=dp(i,n[n.length-1],t);return[...n,...r.slice(1)]}function dp(i,e,t){const n=gp(),r=new Map;for(const h of n)r.set(dt(h),1+i.nextFloat());const s=new Map,a=new Map,o=new Set(n.map(dt));for(const h of n)s.set(dt(h),Number.POSITIVE_INFINITY);for(s.set(dt(e),0);o.size>0;){const h=[...o].reduce((d,f)=>(s.get(f)??Number.POSITIVE_INFINITY)<(s.get(d)??Number.POSITIVE_INFINITY)?f:d);o.delete(h);const u=Nc(h);if(Uo(u,t))break;for(const d of mp(u)){const f=dt(d);if(!o.has(f))continue;const p=(s.get(h)??Number.POSITIVE_INFINITY)+(r.get(f)??1);p<(s.get(f)??Number.POSITIVE_INFINITY)&&(s.set(f,p),a.set(f,h))}}const l=[];let c=dt(t);for(;c!==dt(e);){l.push(Nc(c));const h=a.get(c);if(h==null)throw new Error("Unable to build Journey candidate path.");c=h}return l.push(e),l.reverse()}function fp(i,e,t,n,r,s){const a=[],o=new Set([dt(Nr),dt(Do),dt(Ol.to)]);for(const f of Dc)za(i,f,t)&&a.push(f);const l=Uc(n.filter(f=>!o.has(dt(f))&&!a.some(p=>Uo(p,f))),e),c=Math.ceil(l.length*r);for(const f of l){if(a.length>=Dc.length+c)break;za(i,f,t)&&a.push(f)}const h=new Set(n.map(dt)),u=Uc(cr(i).filter(f=>!h.has(dt(f))&&!o.has(dt(f))&&!a.some(p=>Uo(p,f))),e),d=Math.ceil(u.length*s);for(const f of u.slice(0,d))za(i,f,t)&&a.push(f);return Ni(a)}function za(i,e,t){var r;const n=(r=i[e.row])==null?void 0:r[e.col];return n==null||n.isVoid||n.tile!=null||pp(i,e)?!1:(n.tile=ss("LAND",e.col,e.row,t),!0)}function pp(i,e){return ci(i,e,"LAND",-1,0)+ci(i,e,"LAND",1,0)+1>=3||ci(i,e,"LAND",0,-1)+ci(i,e,"LAND",0,1)+1>=3}function mp(i){return[{col:i.col+1,row:i.row},{col:i.col,row:i.row+1},{col:i.col-1,row:i.row},{col:i.col,row:i.row-1}].filter(e=>e.col>=0&&e.col<Re&&e.row>=0&&e.row<Re)}function gp(){return Array.from({length:Re*Re},(i,e)=>({col:e%Re,row:Math.floor(e/Re)}))}function Uc(i,e){const t=[...i];for(let n=t.length-1;n>0;n-=1){const r=e.nextInt(0,n+1);[t[n],t[r]]=[t[r],t[n]]}return t}function Nc(i){const[e,t]=i.split(",").map(Number);return{col:e,row:t}}function Uo(i,e){return i.col===e.col&&i.row===e.row}function ba(i,e={}){const t=[..._p(i),...vp(i)];if(t.length===0)return[];const n=t.map((l,c)=>c),r=l=>{let c=n[l];for(;c!==n[c];)c=n[c];return n[l]=c,c},s=(l,c)=>{const h=r(l),u=r(c);h!==u&&(n[u]=h)},a=new Map;t.forEach((l,c)=>{for(const h of l.coords){const u=dt(h),d=a.get(u)??[];d.push(c),a.set(u,d)}});for(const l of a.values())for(let c=1;c<l.length;c+=1){const h=l[0],u=l[c];t[h].tileType===t[u].tileType&&s(h,u)}const o=new Map;return t.forEach((l,c)=>{const h=r(c),u=o.get(h)??[];u.push(l),o.set(h,u)}),[...o.values()].map(l=>xp(l,e.preferredSpawnCell)).sort((l,c)=>l.spawnCell.row-c.spawnCell.row||l.spawnCell.col-c.spawnCell.col)}function _p(i){var t;const e=[];for(let n=0;n<Re;n+=1){let r=0;for(;r<Re;){const s=i[n][r].tile;if(s==null||!xa(s.type)){r+=1;continue}const a=r,o=s.type;for(;r<Re&&((t=i[n][r].tile)==null?void 0:t.type)===o;)r+=1;r-a>=3&&e.push({axis:"horizontal",tileType:o,coords:Array.from({length:r-a},(l,c)=>({col:a+c,row:n}))})}}return e}function vp(i){var t;const e=[];for(let n=0;n<Re;n+=1){let r=0;for(;r<Re;){const s=i[r][n].tile;if(s==null||!xa(s.type)){r+=1;continue}const a=r,o=s.type;for(;r<Re&&((t=i[r][n].tile)==null?void 0:t.type)===o;)r+=1;r-a>=3&&e.push({axis:"vertical",tileType:o,coords:Array.from({length:r-a},(l,c)=>({col:n,row:a+c}))})}}return e}function xp(i,e){const t=In(i.flatMap(a=>a.coords)),n=[...new Set(i.map(a=>a.axis))].sort(),r=Sp(i,t.length),s=yp(r);return{tiles:t,tileType:i[0].tileType,axes:n,shape:r,spawnPowerUp:s,spawnCell:Mp(t,e)}}function Sp(i,e){var r;if(new Set(i.map(s=>s.axis)).size>1&&e>=5)return"tnt";const n=Math.max(...i.map(s=>s.coords.length));return n>=5?"lightball":n===4?((r=i.find(s=>s.coords.length===4))==null?void 0:r.axis)==="vertical"?"rocketV":"rocketH":"basic"}function yp(i){switch(i){case"rocketH":return"ROCKET_H";case"rocketV":return"ROCKET_V";case"lightball":return"LIGHTBALL";case"tnt":return"TNT";case"basic":return null}}function Mp(i,e){if(e!=null&&i.some(s=>s.col===e.col&&s.row===e.row))return{...e};const t=i.reduce((s,a)=>({col:s.col+a.col,row:s.row+a.row}),{col:0,row:0}),n=t.col/i.length,r=t.row/i.length;return Ni(i).reduce((s,a)=>{const o=Fc(s,n,r);return Fc(a,n,r)<o?a:s})}function Fc(i,e,t){return(i.col-e)**2+(i.row-t)**2}const Tp=new Set(["LOCK","METAL_PLATE","BOX"]);function oa(i,e,t){const n=Yt(i,e),r=Yt(i,t);if(n==null||r==null)return{valid:!1,reason:"outOfBounds"};if(!Ap(e,t))return{valid:!1,reason:"notAdjacent"};if(n.isVoid||r.isVoid)return{valid:!1,reason:"voidCell"};if(n.tile==null||r.tile==null)return{valid:!1,reason:"emptyCell"};if(Oc(n)||Oc(r))return{valid:!1,reason:"blockedCell"};if(n.tile.type==="LIGHTBALL"||r.tile.type==="LIGHTBALL")return{valid:!0,reason:"valid"};if(aa(n.tile.type)||aa(r.tile.type))return{valid:!0,reason:"valid"};const s=bp(i,e,t);return ba(s,{preferredSpawnCell:t}).length>0?{valid:!0,reason:"valid"}:{valid:!1,reason:"noMatch"}}function bp(i,e,t){const n=xt(i);return Fl(n,e,t),n}function wp(i){const e=[];for(let t=0;t<Re;t+=1)for(let n=0;n<Re;n+=1){const r={col:n,row:t},s={col:n+1,row:t},a={col:n,row:t+1};n+1<Re&&oa(i,r,s).valid&&e.push({from:r,to:s}),t+1<Re&&oa(i,r,a).valid&&e.push({from:r,to:a})}return e}function Ep(i){return wp(i).length}function Ap(i,e){return Math.abs(i.col-e.col)+Math.abs(i.row-e.row)===1}function Oc(i){return i.blocker!=null&&Tp.has(i.blocker.type)}function Bc(i,e={}){const t=e.minValidMoves??3,n=e.maxAttempts??100;for(let r=0;r<n;r+=1){const s=is(`tile-${r}`),a=Bf(i,e,s);if(Cp(a,t))return a}throw new Error(`Unable to generate playable board after ${n} attempts.`)}function Cp(i,e=3){return ba(i).length===0&&Ep(i)>=e}function Ah(i){return i<=1?0:i<=3?2:i<=6?4:i<=10?6:8}function Rp(i,e){const t=Ah(i);if(t<=0)return[];const n=Ch.filter(s=>s.length===t);return(n[e.nextInt(0,n.length)]??[]).map(s=>({...s}))}function Ip(i){const e=Ah(i);return Ch.filter(t=>t.length<=e).sort((t,n)=>n.length-t.length).map(t=>t.map(n=>({...n})))}const Ch=[[{col:2,row:3},{col:5,row:3}],[{col:1,row:4},{col:6,row:4}],[{col:3,row:2},{col:4,row:2}],[{col:1,row:3},{col:1,row:4},{col:6,row:3},{col:6,row:4}],[{col:2,row:2},{col:2,row:5},{col:5,row:2},{col:5,row:5}],[{col:3,row:3},{col:4,row:3},{col:3,row:4},{col:4,row:4}],[{col:1,row:2},{col:1,row:3},{col:1,row:4},{col:6,row:2},{col:6,row:3},{col:6,row:4}],[{col:2,row:2},{col:2,row:5},{col:3,row:3},{col:4,row:3},{col:5,row:2},{col:5,row:5}],[{col:1,row:2},{col:1,row:5},{col:2,row:3},{col:5,row:3},{col:6,row:2},{col:6,row:5}],[{col:1,row:2},{col:1,row:3},{col:2,row:2},{col:2,row:3},{col:5,row:2},{col:5,row:3},{col:6,row:2},{col:6,row:3}],[{col:1,row:3},{col:1,row:4},{col:2,row:4},{col:3,row:5},{col:4,row:5},{col:5,row:4},{col:6,row:3},{col:6,row:4}],[{col:2,row:1},{col:5,row:1},{col:1,row:3},{col:6,row:3},{col:1,row:4},{col:6,row:4},{col:2,row:6},{col:5,row:6}]],Pp=-4.35,Rh=-3.95,Ih=-.85,Bl=[{laneId:0,y:Ih,spawnX:4.65}];function Lp(i){const e=new sa(i.seed),t=Eh(i.difficulty),n=Dp(e,i.difficulty),r=Fp(Up(e,i.difficulty),t.baseDamage);return{type:"TRIAL",difficulty:i.difficulty,seed:i.seed,initialBoard:n,trial:{lanes:Bl,mageX:Pp,contactX:Rh,laneY:Ih,baseDamage:t.baseDamage,waveManifest:r}}}function Dp(i,e){const t=Rp(e,i),n=Ip(e),r=Vp([t,...n,[]]);for(const s of r)try{return Bc(i,{voidCells:s,minValidMoves:3,maxAttempts:120})}catch{}return Bc(i,{minValidMoves:3,maxAttempts:120})}function Up(i,e){const t=Eh(e),n=[...Array.from({length:t.basicKoboldCount},()=>"kobold"),...Array.from({length:t.tallKoboldCount},()=>"tallKobold"),...Array.from({length:t.miniBossCount},()=>"miniBoss")],r=kp(n,i),s=Math.max(1,t.waveCount),a=Math.ceil(r.length/s);return r.map((o,l)=>{const c=Math.floor(l/a),h=l%a;return{monsterId:`trial-${e}-${l}`,kind:o,laneId:Bl[0].laneId,spawnTimeMs:c*t.waveGapMs+h*t.spawnIntervalMs,maxHp:Op(o,t),walkSpeed:t.walkSpeed,scoreValue:Bp(o)}})}function Np(i,e){if(i.length===0)return!0;const t=Math.min(...i.map(o=>o.walkSpeed)),n=(Bl[0].spawnX-Rh)/t,s=i.length*n*1.5*e*.2,a=i.reduce((o,l)=>o+l.maxHp,0);return s>=a}function Fp(i,e){let t=i.map(n=>({...n}));for(let n=0;n<10;n+=1){if(Np(t,e))return t;t=t.map(r=>({...r,maxHp:Math.max(1,Math.floor(r.maxHp*.9))}))}return t}function Op(i,e){switch(i){case"kobold":return e.basicKoboldHp;case"tallKobold":return e.tallKoboldHp;case"miniBoss":return e.miniBossHp}}function Bp(i){switch(i){case"kobold":return 100;case"tallKobold":return 220;case"miniBoss":return 500}}function kp(i,e){const t=[...i];for(let n=t.length-1;n>0;n-=1){const r=e.nextInt(0,n+1);[t[n],t[r]]=[t[r],t[n]]}return t}function Vp(i){const e=new Set,t=[];for(const n of i){const r=zp(n);e.has(r)||(e.add(r),t.push(n.map(s=>({...s}))))}return t}function zp(i){return[...i].sort((e,t)=>e.row-t.row||e.col-t.col).map(e=>`${e.col},${e.row}`).join("|")}function Gp(i){return i.forcedLevelType==="TRIAL"?Lp(i):(i.forcedLevelType==="JOURNEY"||i.levelNumber!==1,Va(i))}function Ph(i,e,t={}){const n=xt(i),r=[],s=[],a=t.maxIterations??50,o=t.nextTileId??rs(n,"cascade-tile");for(let l=0;l<a;l+=1){const c=ba(n,{preferredSpawnCell:l===0?t.preferredSpawnCell:void 0});if(c.length===0)return{board:n,steps:r,animationTrace:t.animation==null?void 0:ya(t.animation,s,n)};const h=xt(n),u=In(c.flatMap(g=>g.tiles)),d=Hp(n,c,o),f=xt(n),p=wa(n,e,o),_=xt(n);r.push({matches:c,clearedCells:u,spawnedPowerUps:d}),t.animation!=null&&s.push(Ma(l,h,f,p.afterGravityBoard,_,u,new Map,p.refillTiles))}throw new Error(`Cascade did not settle after ${a} iterations.`)}function Hp(i,e,t){const n=In(e.flatMap(s=>s.tiles));for(const s of n)i[s.row][s.col].tile=null;const r=[];for(const s of e){if(s.spawnPowerUp==null)continue;const a=i[s.spawnCell.row][s.spawnCell.col];a.isVoid||(a.tile=ss(s.spawnPowerUp,s.spawnCell.col,s.spawnCell.row,t),r.push({type:s.spawnPowerUp,coord:s.spawnCell}))}return r}function Wp(i){for(let e=0;e<Re*Re;e+=1){const t=qp(i),n=jp(i);if(!t&&!n)return}}function wa(i,e,t){Wp(i);const n=xt(i),r=[],s=new Map,a=Jp(i).sort((o,l)=>o.col-l.col||l.row-o.row);for(const o of a){const l=No(i,o)?o.col:Xp(i,o),c=!No(i,o),h=s.get(l)??0;c||s.set(l,h+1);const u=fr.filter(p=>!_h(i,o,p)),d=u.length>0?u:fr,f=ss(d[e.nextInt(0,d.length)],o.col,o.row,t);i[o.row][o.col].tile=f,r.push({tileId:f.id,tileType:f.type,from:c?{col:l,row:Zp(i,l,o.row)}:{col:l,row:-1-h},to:o,isPath:i[o.row][o.col].isPath,movementKind:l===o.col?"fall":"slide"})}return{afterGravityBoard:n,refillTiles:r}}function No(i,e){for(let t=0;t<e.row;t+=1)if(i[t][e.col].isVoid)return!1;return!0}function Xp(i,e){const t=e.col-1,n=e.col+1,r=(e.row+e.col)%2===0?[t,n]:[n,t];for(const s of r)if(s>=0&&s<Re&&Yp(i,s))return s;for(const s of r)if(s>=0&&s<Re)return s;return e.col}function Yp(i,e){return i.some((t,n)=>!t[e].isVoid&&No(i,{col:e,row:n}))}function qp(i){var t,n;let e=!1;for(let r=0;r<Re;r+=1){let s=Re-1;for(;s>=0;){if(i[s][r].isVoid){i[s][r].tile!=null&&(e=!0),i[s][r].tile=null,s-=1;continue}const a=s;for(;s>=0&&!i[s][r].isVoid;)s-=1;const o=s+1,l=[];for(let c=a;c>=o;c-=1){const h=i[c][r].tile;h!=null&&l.push(h)}for(let c=a;c>=o;c-=1){const h=i[c][r],u=((t=h.tile)==null?void 0:t.id)??null,d=l.shift()??null;h.tile=d==null?null:{...d,col:r,row:c},(((n=h.tile)==null?void 0:n.id)??null)!==u&&(e=!0)}}}return e}function jp(i){let e=!1;for(let t=Re-1;t>=1;t-=1)for(let n=0;n<Re;n+=1){const r=i[t][n];if(r.isVoid||r.tile!=null)continue;const s=Kp(i,{col:n,row:t});if(s==null)continue;const a=i[s.row][s.col],o=a.tile;o!=null&&(r.tile={...o,col:n,row:t},a.tile=null,e=!0)}return e}function Kp(i,e){if(!$p(i,e))return null;const t={col:e.col-1,row:e.row-1},n={col:e.col+1,row:e.row-1},r=(e.row+e.col)%2===0?[t,n]:[n,t];for(const s of r){if(s.col<0||s.col>=Re)continue;const a=i[s.row][s.col];if(!(a.isVoid||a.tile==null))return s}return null}function $p(i,e){for(let t=0;t<e.row;t+=1)if(i[t][e.col].isVoid)return!0;return!1}function Zp(i,e,t){for(let n=t-1;n>=0;n-=1)if(!i[n][e].isVoid)return n;for(let n=t;n<Re;n+=1)if(!i[n][e].isVoid)return n;return-1}function Jp(i){const e=[];for(let t=0;t<Re;t+=1)for(let n=0;n<Re;n+=1){const r=i[t][n];!r.isVoid&&r.tile==null&&e.push({col:n,row:t})}return Ni(e)}function Qp(i){return i==="ROCKET_H"||i==="ROCKET_V"}function la(i){return Qp(i)||i==="TNT"||i==="LIGHTBALL"}function Lh(i,e){var r,s,a,o;if(((s=(r=Yt(i,e))==null?void 0:r.tile)==null?void 0:s.type)!=="LIGHTBALL")return null;const t=new Set;for(const l of sm(e)){const c=(o=(a=Yt(i,l))==null?void 0:a.tile)==null?void 0:o.type;c!=null&&Ui(c)&&t.add(c)}if(t.size===0)return null;const n=am(i);return fr.filter(l=>t.has(l)).reduce((l,c)=>l==null||n[c]>n[l]?c:l,null)}function Dh(i,e,t={}){var s;const n=Yt(i,e),r=(s=n==null?void 0:n.tile)==null?void 0:s.type;if(r!=="ROCKET_H"&&r!=="ROCKET_V"&&r!=="TNT"&&r!=="LIGHTBALL")throw new Error("Cannot detonate a cell that does not contain a power-up tile.");switch(r){case"ROCKET_H":return kc(i,e,r);case"ROCKET_V":return kc(i,e,r);case"TNT":return nm(i,e,r);case"LIGHTBALL":return{powerUpType:r,origin:e,clearedCells:rm(i,e,t.lightballTargetType),clearTimings:[],lightballTargetType:t.lightballTargetType}}}function em(i,e){const t=im(i,e);return[...t.filter(n=>n.col===e.col&&n.row===e.row),...t.filter(n=>n.col!==e.col||n.row!==e.row)].map(n=>({coord:n,clearDelayMs:n.col===e.col&&n.row===e.row?0:rp}))}function tm(i,e,t){const n=[{coord:e,clearDelayMs:0}],r=Re-1;for(let s=1;s<=r;s+=1){const a=t==="ROCKET_H"?[{col:e.col-s,row:e.row},{col:e.col+s,row:e.row}]:[{col:e.col,row:e.row-s},{col:e.col,row:e.row+s}];for(const o of a)Uh(i,o)&&n.push({coord:o,clearDelayMs:s*ip})}return n}function nm(i,e,t){const n=em(i,e);return{powerUpType:t,origin:e,clearedCells:Ni(n.map(r=>r.coord)),clearTimings:n}}function kc(i,e,t){const n=tm(i,e,t);return{powerUpType:t,origin:e,clearedCells:Ni(n.map(r=>r.coord)),clearTimings:n}}function im(i,e){const t=[];for(let n=e.row-1;n<=e.row+1;n+=1)for(let r=e.col-1;r<=e.col+1;r+=1)t.push({col:r,row:n});return om(i,t)}function rm(i,e,t){var r;const n=[e];if(t==null)return n;for(let s=0;s<Re;s+=1)for(let a=0;a<Re;a+=1){const o={col:a,row:s},l=Yt(i,o);!(l!=null&&l.isVoid)&&((r=l==null?void 0:l.tile)==null?void 0:r.type)===t&&n.push(o)}return In(n)}function sm(i){return[{col:i.col+1,row:i.row},{col:i.col,row:i.row+1},{col:i.col-1,row:i.row},{col:i.col,row:i.row-1}].filter(Sa)}function am(i){var t;const e={FIRE:0,ICE:0,LIGHTNING:0,EARTH:0};for(let n=0;n<Re;n+=1)for(let r=0;r<Re;r+=1){const s=(t=i[n][r].tile)==null?void 0:t.type;s!=null&&Ui(s)&&(e[s]+=1)}return e}function om(i,e){return Ni(e.filter(t=>Uh(i,t)))}function Uh(i,e){return Sa(e)?!i[e.row][e.col].isVoid:!1}const Nh={matchCount:0,comboCount:0,powerUpsCreated:0,validSwapCount:0};function Fh(i){return 1+.1*i}function lm(i,e){return Math.round(1e3*Fh(i))+Math.max(0,e)*50}function cm(i,e,t){const n=t>0?e/t:0,r=Math.max(0,n-1)*100;return Math.round(1e3*Fh(i)+r)}function fs(i){return i.comboCount*100+i.powerUpsCreated*200}function kl(i,e,t=1){return{matchCount:i,comboCount:Math.max(0,i-1),powerUpsCreated:e,validSwapCount:t}}function um(i){return{movesRemaining:i.journey.moveBudget,mageCell:i.journey.startCell,hasPlayerMoved:!1,result:"playing"}}function hm(i,e,t,n,r,s){if(e.result!=="playing"||!oa(i,n,r).valid)return Fo(i,e);const o=gm(i,n,r),l=xt(i);Fl(l,n,r);const c={revisionId:0,preSwapBoard:i,postSwapBoard:l,swappedCells:{from:n,to:r}},h=o==null?Bh(l,s,{preferredSpawnCell:r,animation:c}):kh(l,s,o.originAfterSwap,c,o.targetType);return Oh(e,t,h,o==null?0:1)}function dm(i,e,t,n,r){const s=_m(i,n);if(e.result!=="playing"||s==null)return Fo(i,e);const a=kh(i,r,n,{revisionId:0,preSwapBoard:i,postSwapBoard:i,swappedCells:null},s.targetType);return Oh(e,t,a,1)}function Oh(i,e,t,n){const r=Math.max(0,i.movesRemaining-1),s=t.convertedPathCells.length>0?fm(t.board,i.mageCell,e.journey.goalCell):i.mageCell,a=xm(s,e.journey.goalCell,r);return{valid:!0,board:t.board,runtime:{movesRemaining:r,mageCell:s,hasPlayerMoved:!0,result:a},scoreDelta:t.clearedStandardCells.length*10,convertedPathCells:t.convertedPathCells,clearedStandardCells:t.clearedStandardCells,scoringStats:kl(Math.max(n,t.matchCount),t.powerUpsCreated),animationTrace:t.animationTrace}}function Bh(i,e,t={}){const n=xt(i),r=[],s=[];let a=0,o=0;const l=[],c=t.maxIterations??50,h=t.nextTileId??rs(n,"journey-cascade-tile");for(let u=0;u<c;u+=1){const d=ba(n,{preferredSpawnCell:u===0?t.preferredSpawnCell:void 0});if(d.length===0)return{board:n,convertedPathCells:In(r),clearedStandardCells:In(s),matchCount:a,powerUpsCreated:o,animationTrace:t.animation==null?void 0:ya(t.animation,l,n)};const f=xt(n),p=In(d.flatMap(M=>M.tiles)),_=pm(n,d,h),g=xt(n);a+=d.length,o+=_.powerUpsCreated,r.push(..._.convertedPathCells),s.push(..._.clearedStandardCells);const m=wa(n,e,h),S=xt(n);t.animation!=null&&l.push(Ma(u,f,g,m.afterGravityBoard,S,p,new Map,m.refillTiles))}throw new Error(`Journey board did not settle after ${c} iterations.`)}function kh(i,e,t,n,r){var g;const s=xt(i),a=rs(s,"journey-powerup-cascade-tile"),o=Dh(s,t,{lightballTargetType:r}),l=xt(s),c=mm(s,o),h=xt(s),u=wa(s,e,a),d=xt(s),f=vm(o),p=Ma(0,l,h,u.afterGravityBoard,d,o.clearedCells,f,u.refillTiles),_=Bh(s,e,{nextTileId:a,animation:n});return{board:_.board,convertedPathCells:In([...c.convertedPathCells,..._.convertedPathCells]),clearedStandardCells:In([...c.clearedStandardCells,..._.clearedStandardCells]),matchCount:1+_.matchCount,powerUpsCreated:_.powerUpsCreated,animationTrace:ya(n,[p,...((g=_.animationTrace)==null?void 0:g.cascadeSteps.map((m,S)=>({...m,stepIndex:S+1})))??[]],_.board)}}function fm(i,e,t){const n=Sm(i,e),r=new Set(n.map(dt)),s=Vh(e).filter(a=>r.has(dt(a)));return s.length===0?e:s.reduce((a,o)=>{const l=Gc(a,t),c=Gc(o,t);return c!==l?c<l?o:a:o.row<a.row||o.row===a.row&&o.col<a.col?o:a})}function Vc(i,e,t){return e.hasPlayerMoved||e.result!=="playing"||t*1e3<ap?[]:[i.journey.firstHint.from,i.journey.firstHint.to]}function pm(i,e,t){const n=[],r=[];let s=0;for(const a of e){if(a.tileType==="LAND"){for(const o of a.tiles){const l=i[o.row][o.col];l.isPath=!0,l.tile=null,n.push(o)}continue}for(const o of a.tiles){const l=i[o.row][o.col];l.tile!=null&&Ui(l.tile.type)&&r.push(o),l.tile=null}if(a.spawnPowerUp!=null){const o=i[a.spawnCell.row][a.spawnCell.col];o.isVoid||(o.tile=ss(a.spawnPowerUp,a.spawnCell.col,a.spawnCell.row,t),s+=1)}}return{convertedPathCells:n,clearedStandardCells:r,powerUpsCreated:s}}function mm(i,e){const t=[],n=[];for(const r of e.clearedCells){const s=Yt(i,r);(s==null?void 0:s.tile)!=null&&(s.tile.type==="LAND"?(s.isPath=!0,t.push(r)):Ui(s.tile.type)&&n.push(r),s.tile=null)}return{convertedPathCells:t,clearedStandardCells:n}}function gm(i,e,t){var s,a,o,l;const n=(a=(s=Yt(i,e))==null?void 0:s.tile)==null?void 0:a.type,r=(l=(o=Yt(i,t))==null?void 0:o.tile)==null?void 0:l.type;return la(n)?{originAfterSwap:t,targetType:zc(r)}:la(r)?{originAfterSwap:e,targetType:zc(n)}:null}function _m(i,e){var n,r;const t=(r=(n=Yt(i,e))==null?void 0:n.tile)==null?void 0:r.type;if(!la(t))return null;if(t==="LIGHTBALL"){const s=Lh(i,e);return s==null?null:{targetType:s}}return{}}function zc(i){return i!=null&&xa(i)?i:void 0}function vm(i){return new Map(i.clearTimings.map(e=>[dt(e.coord),e.clearDelayMs]))}function Fo(i,e){return{valid:!1,board:i,runtime:e,scoreDelta:0,convertedPathCells:[],clearedStandardCells:[],scoringStats:Nh,animationTrace:void 0}}function xm(i,e,t){return Vf(i,e)?"won":t<=0?"lost":"playing"}function Sm(i,e){var r,s;if(!((s=(r=i[e.row])==null?void 0:r[e.col])!=null&&s.isPath))return[];const t=new Set,n=[e];for(;n.length>0;){const a=n.shift(),o=dt(a);if(!t.has(o)){t.add(o);for(const l of Vh(a))i[l.row][l.col].isPath&&!t.has(dt(l))&&n.push(l)}}return cr(i).filter(a=>t.has(dt(a)))}function Vh(i){return[{col:i.col+1,row:i.row},{col:i.col,row:i.row+1},{col:i.col-1,row:i.row},{col:i.col,row:i.row-1}].filter(e=>e.col>=0&&e.col<Re&&e.row>=0&&e.row<Re)}function Gc(i,e){return Math.abs(i.col-e.col)+Math.abs(i.row-e.row)}function ym(i){return qh({elapsedMs:0,nextSpawnIndex:0,monsters:[],projectiles:[],defeatedMonsterIds:[],totalMonsters:i.trial.waveManifest.length,result:"playing",nextProjectileIndex:0},i)}function Mm(i,e,t){if(i.result!=="playing")return Wc(i,t);const n=i.elapsedMs+Math.max(0,t)*1e3,r=Wc(i,t).projectiles,s={...i,elapsedMs:n,projectiles:r,monsters:i.monsters.map(l=>({...l,x:l.x-l.walkSpeed*Math.max(0,t)}))},a=qh(s,e),o=jh(a,e);return{...a,result:o}}function Tm(i,e,t,n,r,s){if(e.result!=="playing"||!oa(i,n,r).valid)return Oo(i,e);const o=Lm(i,n,r),l=xt(i),c=xt(i);Fl(c,n,r);const h=xt(c),u=rs(c,"trial-cascade-tile"),d=[];let f,p;if(o!=null){const S=Yh(c,s,u,o.originAfterSwap,{revisionId:0,preSwapBoard:l,postSwapBoard:h,swappedCells:{from:n,to:r}},o.targetType);d.push(Xh(t,S.detonation,o.targetType)),f=S.cascadeResult,p=S.animationTrace}else f=Ph(c,s,{preferredSpawnCell:r,nextTileId:u,animation:{revisionId:0,preSwapBoard:l,postSwapBoard:h,swappedCells:{from:n,to:r}}}),p=f.animationTrace;d.push(...Wh(t,f));const _=Hh(e,t,d),g=f.steps.reduce((S,M)=>S+M.matches.length,0),m=f.steps.reduce((S,M)=>S+M.spawnedPowerUps.length,0);return{valid:!0,board:f.board,runtime:_.runtime,scoreDelta:_.scoreDelta,damageEvents:_.damageEvents,scoringStats:kl(g,m),animationTrace:p}}function bm(i,e,t,n,r){const s=Dm(i,n);if(e.result!=="playing"||s==null)return Oo(i,e);const a=rs(i,"trial-powerup-cascade-tile"),o=Yh(i,r,a,n,{revisionId:0,preSwapBoard:i,postSwapBoard:i,swappedCells:null},s.targetType),l=[Xh(t,o.detonation,s.targetType),...Wh(t,o.cascadeResult)],c=Hh(e,t,l),h=1+o.cascadeResult.steps.reduce((d,f)=>d+f.matches.length,0),u=o.cascadeResult.steps.reduce((d,f)=>d+f.spawnedPowerUps.length,0);return{valid:!0,board:o.cascadeResult.board,runtime:c.runtime,scoreDelta:c.scoreDelta,damageEvents:c.damageEvents,scoringStats:kl(h,u),animationTrace:o.animationTrace}}function wm(i,e){const t=i.monsters.filter(n=>n.hp>0);return t.length===0?null:t.sort((n,r)=>{const s=Math.abs(n.x-e.trial.mageX),a=Math.abs(r.x-e.trial.mageX);return s-a||n.monsterId.localeCompare(r.monsterId)})[0]}function Em(i){switch(i.shape){case"basic":return i.tiles.length>=4?2:1;case"rocketH":case"rocketV":return 2;case"lightball":return 3;case"tnt":return 2.5}}function zh(i,e){return{x:e.x,y:Nm(i,e.laneId),z:Fm(e.kind)}}function Gh(i){return{x:i.trial.mageX,y:i.trial.laneY,z:.55}}function Hh(i,e,t){let n={...i,monsters:i.monsters.map(a=>({...a})),projectiles:i.projectiles.map(a=>({...a})),defeatedMonsterIds:[...i.defeatedMonsterIds]},r=0;const s=[];for(const a of t)for(let o=0;o<a.shotCount;o+=1){const l=wm(n,e);if(l==null)continue;const c=Math.min(l.hp,a.damage),h=Math.max(0,l.hp-a.damage),u=h<=0,d=Rm(n,e,a.schoolId,l),f=n.monsters.map(p=>p.monsterId===l.monsterId?{...p,hp:h}:p).filter(p=>p.hp>0);n={...n,monsters:f,projectiles:[...n.projectiles,d],nextProjectileIndex:n.nextProjectileIndex+1,defeatedMonsterIds:u?[...n.defeatedMonsterIds,l.monsterId]:n.defeatedMonsterIds},r+=Math.round(c*2)+(u?l.scoreValue:0),s.push({monsterId:l.monsterId,schoolId:a.schoolId,damage:c,defeated:u})}return{runtime:{...n,result:jh(n,e)},scoreDelta:r,damageEvents:s}}function Wh(i,e){return e.steps.flatMap((t,n)=>t.matches.filter(r=>Ui(r.tileType)).map(r=>({schoolId:Kh(r.tileType),damage:i.trial.baseDamage*(Em(r)+n*.25),shotCount:1})))}function Xh(i,e,t){return{schoolId:t!=null&&Ui(t)?Kh(t):"fire",damage:i.trial.baseDamage*Am(e.powerUpType),shotCount:Cm(e)}}function Am(i){switch(i){case"ROCKET_H":case"ROCKET_V":return 1.25;case"TNT":return 1.5;case"LIGHTBALL":return 1}}function Cm(i){switch(i.powerUpType){case"ROCKET_H":case"ROCKET_V":return 3;case"TNT":return 5;case"LIGHTBALL":return Math.min(8,Math.max(1,Math.ceil(i.clearedCells.length/3)))}}function Rm(i,e,t,n){return{projectileId:`trial-${i.nextProjectileIndex}`,schoolId:t,from:Gh(e),to:zh(e,n),remainingSec:sp/1e3}}function Yh(i,e,t,n,r,s){var p;const a=xt(i),o=Dh(a,n,{lightballTargetType:s}),l=xt(a);Im(a,o);const c=xt(a),h=wa(a,e,t),u=xt(a),d=Ma(0,l,c,h.afterGravityBoard,u,o.clearedCells,Pm(o),h.refillTiles),f=Ph(a,e,{preferredSpawnCell:n,nextTileId:t,animation:r});return{cascadeResult:f,detonation:o,animationTrace:ya(r,[d,...((p=f.animationTrace)==null?void 0:p.cascadeSteps.map((_,g)=>({..._,stepIndex:g+1})))??[]],f.board)}}function Im(i,e){for(const t of e.clearedCells){const n=Yt(i,t);n!=null&&(n.tile=null)}}function Pm(i){return new Map(i.clearTimings.map(e=>[dt(e.coord),e.clearDelayMs]))}function Lm(i,e,t){var s,a;const n=(s=Yt(i,e))==null?void 0:s.tile,r=(a=Yt(i,t))==null?void 0:a.tile;return n!=null&&aa(n.type)?{originAfterSwap:t,powerUpType:n.type,targetType:Hc(r==null?void 0:r.type)}:r!=null&&aa(r.type)?{originAfterSwap:e,powerUpType:r.type,targetType:Hc(n==null?void 0:n.type)}:null}function Hc(i){return i!=null&&xa(i)?i:void 0}function Dm(i,e){var n,r;const t=(r=(n=Yt(i,e))==null?void 0:n.tile)==null?void 0:r.type;if(!la(t))return null;if(t==="LIGHTBALL"){const s=Lh(i,e);return s==null?null:{targetType:s}}return{}}function qh(i,e){if(i.monsters.some(r=>r.hp>0))return i;const t=[...i.monsters];let n=i.nextSpawnIndex;return n<e.trial.waveManifest.length&&e.trial.waveManifest[n].spawnTimeMs<=i.elapsedMs&&(t.push(Um(e,e.trial.waveManifest[n])),n+=1),{...i,nextSpawnIndex:n,monsters:t}}function Um(i,e){return{monsterId:e.monsterId,kind:e.kind,laneId:e.laneId,hp:e.maxHp,maxHp:e.maxHp,x:$h(i,e.laneId).spawnX,spawnTimeMs:e.spawnTimeMs,walkSpeed:e.walkSpeed,scoreValue:e.scoreValue}}function Wc(i,e){const t=Math.max(0,e);return{...i,projectiles:i.projectiles.map(n=>({...n,remainingSec:n.remainingSec-t})).filter(n=>n.remainingSec>0)}}function jh(i,e){return i.monsters.some(t=>t.x<=e.trial.contactX)?"lost":i.nextSpawnIndex>=e.trial.waveManifest.length&&i.monsters.length===0&&i.defeatedMonsterIds.length>=e.trial.waveManifest.length?"won":"playing"}function Kh(i){switch(i){case"FIRE":return"fire";case"ICE":return"ice";case"LIGHTNING":return"lightning";case"EARTH":return"earth"}}function Nm(i,e){return $h(i,e).y}function $h(i,e){const t=i.trial.lanes.find(n=>n.laneId===e);if(t==null)throw new Error(`Trial lane ${e} does not exist.`);return t}function Fm(i){switch(i){case"kobold":return .35;case"tallKobold":return .45;case"miniBoss":return .55}}function Oo(i,e){return{valid:!1,board:i,runtime:e,scoreDelta:0,damageEvents:[],scoringStats:Nh,animationTrace:void 0}}const ca=10,Ga=["Brave","Mystic","Golden","Clever","Radiant","Stalwart","Arcane","Noble"],Xc=["Magus","Warden","Sage","Spark","Voyager","Keeper","Knight","Seeker"];function Om(i,e){const t=Ea([...i,e]),n=t.findIndex(r=>r.id===e.id)+1;return{entries:t.slice(0,ca),qualifiedRank:n>0&&n<=ca?n:null}}function Ea(i){return[...i].sort((e,t)=>t.score-e.score||t.levelsCleared-e.levelsCleared||t.createdAtMs-e.createdAtMs)}function Bm(i){var e;return((e=Ea(i)[0])==null?void 0:e.score)??0}function km(i,e,t,n){return{id:`${n}-${t}-${i}`,name:Vm(t+n),score:i,levelsCleared:e,createdAtMs:n}}function Vm(i){const e=Ga[Math.abs(i)%Ga.length],t=Xc[Math.abs(Math.floor(i/Ga.length))%Xc.length];return`${e} ${t}`}function zm(i){if(i==null||i.trim()==="")return[];try{const e=JSON.parse(i);return Array.isArray(e)?Ea(e.filter(Hm)).slice(0,ca):[]}catch{return[]}}function Gm(i){return JSON.stringify(Ea(i).slice(0,ca))}function Hm(i){if(typeof i!="object"||i==null)return!1;const e=i;return typeof e.id=="string"&&typeof e.name=="string"&&typeof e.score=="number"&&Number.isFinite(e.score)&&typeof e.levelsCleared=="number"&&Number.isFinite(e.levelsCleared)&&typeof e.createdAtMs=="number"&&Number.isFinite(e.createdAtMs)}const Wm=3,Xm=1.2;function Yc(i){return{seed:i,lives:Wm,levelNumber:1,difficulty:1,score:0,levelsCleared:0}}function Ym(i,e,t){return t??"TRIAL"}function qm(i,e){return $m(i,e,2654435769)||1}function jm(i,e){return{...i,score:i.score+e,levelsCleared:i.levelsCleared+1,levelNumber:i.levelNumber+1,difficulty:i.difficulty+1}}function Km(i){return{...i,lives:Math.max(0,i.lives-1),levelNumber:i.levelNumber+1,difficulty:i.difficulty+1}}function $m(i,e,t){let n=(i^t)>>>0;return n=Math.imul(n^e,2246822507)>>>0,n=Math.imul(n^n>>>13,3266489909)>>>0,(n^n>>>16)>>>0}const Bt={backdropForest:"stage.backdrop.forest",mage:"actor.mage",princeCage:"actor.princeCage",goalFlag:"prop.goalFlag",pathMarker:"prop.pathMarker",monsterPlaceholder:"actor.monster.placeholder",projectilePlaceholder:"vfx.projectile.placeholder"};class Zm{constructor(e,t={}){Le(this,"events",[]);Le(this,"rng",new sa);Le(this,"elapsedSec",0);Le(this,"run",Yc(Ba()));Le(this,"board",Nl());Le(this,"currentLevel",null);Le(this,"journeyRuntime",null);Le(this,"trialRuntime",null);Le(this,"phase","TITLE");Le(this,"muted",!1);Le(this,"transitionTimerSec",0);Le(this,"pendingLevelResult",null);Le(this,"pendingClearScore",0);Le(this,"levelMatchCount",0);Le(this,"levelValidSwapCount",0);Le(this,"finalScore",0);Le(this,"debugSeed");Le(this,"visualCues",[]);Le(this,"shakeTimerSec",0);Le(this,"shakeAmplitudePixels",0);Le(this,"latestBoardAnimationTrace",null);Le(this,"latestBoardAnimationEndsAtSec",0);Le(this,"animationClockSec",0);Le(this,"nextBoardAnimationRevision",1);this.options=t,this.debugSeed=e,this.reset(e)}update(e,t){const n=Math.max(0,e);this.animationClockSec+=n,this.updateBoardJuice(n);for(const r of t){if(r.type==="restart"){this.tryAgain();continue}if(r.type==="muteToggle"){this.muted=!this.muted;continue}if(r.type==="tap"){this.handleTap(r.x,r.y);continue}r.type==="swap"&&this.handleSwap(r.from,r.to)}this.phase==="IDLE"&&(this.elapsedSec+=n,this.updateTrialStage(n)),(this.phase==="WIN"||this.phase==="LOSE")&&(this.transitionTimerSec+=n,this.transitionTimerSec>=Xm&&this.hasLatestBoardAnimationFinished()&&this.advanceAfterLevelResult())}getBoardRenderState(){var e,t,n;return{logicalWidth:Zt,logicalHeight:Un,boardCells:cr(this.board).map(r=>{const s=this.board[r.row][r.col].tile;return s==null?null:{tileId:s.id,coord:r,assetId:Jm(s.type),tileType:s.type,isPath:this.board[r.row][r.col].isPath,alpha:1}}).filter(r=>r!=null),emptyCells:kf(this.board).map(r=>({coord:r,assetId:X.tiles.empty})),pathCells:cr(this.board).filter(r=>this.board[r.row][r.col].isPath),mageCell:((e=this.journeyRuntime)==null?void 0:e.mageCell)??null,goalCell:((t=this.currentLevel)==null?void 0:t.type)==="JOURNEY"?this.currentLevel.journey.goalCell:null,hintedCells:((n=this.currentLevel)==null?void 0:n.type)==="JOURNEY"&&this.journeyRuntime!=null?Vc(this.currentLevel,this.journeyRuntime,this.elapsedSec):[],selectedCell:null,queuedSwap:null,shakePixels:this.getShakePixels(),visualCues:this.getBoardVisualCueState(),animationTrace:this.latestBoardAnimationTrace}}getHeroWorldState(){var t,n;const e=this.getHeroWorldObjects();return{levelType:((t=this.currentLevel)==null?void 0:t.type)??"JOURNEY",backdropId:X.backdrops.castle,cinematicState:tg(this.phase),objects:e,activeProjectiles:((n=this.trialRuntime)==null?void 0:n.projectiles)??[],camera:{mode:"fixed",position:{x:0,y:0,z:12},target:{x:0,y:0,z:0},fovDeg:35}}}getHudState(){return{phase:this.phase,levelText:`Level ${this.run.levelNumber}`,livesText:`Lives ${this.run.lives}`,scoreText:`${this.run.score}`,objectiveText:this.getObjectiveText(),muted:this.muted,debugText:`Seed ${this.run.seed}`}}getScreenState(e=[],t=null){return{screen:sg(this.phase),phase:this.phase,finalScore:this.phase==="GAME_OVER"?this.finalScore:this.run.score,highScore:Bm(e),leaderboardRows:e,highlightedRank:t,buttonRects:{play:Cc,tryAgain:Rc,mute:Ic},muted:this.muted,transitionText:ag(this.phase)}}drainEvents(){const e=this.events;return this.events=[],e}reset(e=Ba()){if(this.rng=new sa(e),this.run=Yc(e),this.options.debugStartLevel!=null&&this.options.debugStartLevel>1){const t=Math.floor(this.options.debugStartLevel);this.run={...this.run,levelNumber:t,difficulty:t,levelsCleared:t-1}}this.prepareCurrentLevel(),this.elapsedSec=0,this.transitionTimerSec=0,this.pendingLevelResult=null,this.pendingClearScore=0,this.finalScore=0,this.visualCues=[],this.shakeTimerSec=0,this.shakeAmplitudePixels=0,this.latestBoardAnimationTrace=null,this.latestBoardAnimationEndsAtSec=0,this.animationClockSec=0,this.nextBoardAnimationRevision=1,this.phase="TITLE",this.events=[]}getRunStateForDebug(){return{...this.run}}getRngStateForDebug(){return this.rng.getState()}getElapsedSecForDebug(){return this.elapsedSec}getBoardForDebug(){return this.board}getCurrentLevelForDebug(){return this.currentLevel}getJourneyRuntimeForDebug(){return this.journeyRuntime==null?null:{...this.journeyRuntime}}getTrialRuntimeForDebug(){return this.trialRuntime==null?null:{...this.trialRuntime,monsters:this.trialRuntime.monsters.map(e=>({...e})),projectiles:this.trialRuntime.projectiles.map(e=>({...e})),defeatedMonsterIds:[...this.trialRuntime.defeatedMonsterIds]}}getLevelStatsForDebug(){return{matchCount:this.levelMatchCount,validSwapCount:this.levelValidSwapCount}}getLatestBoardAnimationEndsAtSecForDebug(){return this.latestBoardAnimationEndsAtSec}prepareCurrentLevel(){const e=Ym(this.run.seed,this.run.levelNumber,this.options.debugLevelType),t=this.run.levelNumber===1?this.run.seed:qm(this.run.seed,this.run.levelNumber);this.currentLevel=Gp({levelNumber:this.run.levelNumber,difficulty:this.run.difficulty,seed:t,forcedLevelType:e}),this.board=xt(this.currentLevel.initialBoard),this.journeyRuntime=this.currentLevel.type==="JOURNEY"?um(this.currentLevel):null,this.trialRuntime=this.currentLevel.type==="TRIAL"?ym(this.currentLevel):null,this.elapsedSec=0,this.transitionTimerSec=0,this.pendingLevelResult=null,this.pendingClearScore=0,this.levelMatchCount=0,this.levelValidSwapCount=0,this.visualCues=[],this.shakeTimerSec=0,this.shakeAmplitudePixels=0,this.latestBoardAnimationTrace=null,this.latestBoardAnimationEndsAtSec=this.animationClockSec}startPreparedLevel(){var e,t;this.currentLevel==null&&this.prepareCurrentLevel(),this.phase="IDLE",this.elapsedSec=0,this.transitionTimerSec=0,this.captureBoardAnimationTrace(Hf(this.board,0)),this.events.push({type:"levelStarted",levelNumber:this.run.levelNumber,levelType:((e=this.currentLevel)==null?void 0:e.type)??"JOURNEY",seed:((t=this.currentLevel)==null?void 0:t.seed)??this.run.seed})}updateTrialStage(e){var n;if(((n=this.currentLevel)==null?void 0:n.type)!=="TRIAL"||this.trialRuntime==null)return;const t=Mm(this.trialRuntime,this.currentLevel,e);this.trialRuntime=t,t.result==="won"?this.beginLevelResult("win"):t.result==="lost"&&this.beginLevelResult("loss")}handleTap(e,t){var s,a;const n={x:e,y:t};if(Oa(n,Ic)){this.muted=!this.muted;return}if(this.phase==="TITLE"&&Oa(n,Cc)){this.startPreparedLevel();return}if(this.phase==="GAME_OVER"&&Oa(n,Rc)){this.tryAgain(),this.startPreparedLevel();return}if(this.phase!=="IDLE")return;const r=Lo(n);if(r!=null){if(((s=this.currentLevel)==null?void 0:s.type)==="TRIAL"){this.handleTrialPowerUpTap(r);return}((a=this.currentLevel)==null?void 0:a.type)==="JOURNEY"&&this.handleJourneyPowerUpTap(r)}}tryAgain(){this.reset(this.debugSeed??Ba())}beginLevelResult(e){this.pendingLevelResult!=null||this.currentLevel==null||(this.pendingLevelResult=e,this.transitionTimerSec=0,this.phase=e==="win"?"WIN":"LOSE",this.pendingClearScore=e==="win"?this.getLevelClearScore():0,e==="win"&&(this.requestSound(X.sounds.victorySting,{category:"level",volume:.7}),this.requestSound(X.sounds.cageYankWhoosh,{category:"level",volume:.55})),this.events.push({type:"levelEnded",levelNumber:this.run.levelNumber,levelType:this.currentLevel.type,result:e}))}advanceAfterLevelResult(){if(this.pendingLevelResult!=null){if(this.pendingLevelResult==="win"){this.run=jm(this.run,this.pendingClearScore),this.pendingClearScore>0&&this.events.push({type:"scoreChanged",score:this.run.score}),this.prepareCurrentLevel(),this.startPreparedLevel();return}if(this.run=Km(this.run),this.run.lives<=0){this.finalScore=this.run.score,this.phase="GAME_OVER",this.pendingLevelResult=null,this.transitionTimerSec=0,this.requestSound(X.sounds.runEnd,{category:"run",volume:.72}),this.events.push({type:"runEnded",finalScore:this.run.score,levelsCleared:this.run.levelsCleared});return}this.prepareCurrentLevel(),this.startPreparedLevel()}}handleSwap(e,t){var a,o;if(this.phase!=="IDLE")return;if(((a=this.currentLevel)==null?void 0:a.type)==="TRIAL"&&this.trialRuntime!=null){this.handleTrialSwap(e,t);return}if(((o=this.currentLevel)==null?void 0:o.type)!=="JOURNEY"||this.journeyRuntime==null)return;const n=hm(this.board,this.journeyRuntime,this.currentLevel,e,t,this.rng);if(!n.valid)return;const r=this.journeyRuntime.mageCell;this.board=n.board,this.journeyRuntime=n.runtime,this.levelMatchCount+=n.scoringStats.matchCount,this.levelValidSwapCount+=n.scoringStats.validSwapCount,this.captureBoardAnimationTrace(n.animationTrace),this.emitMatchAudioAndJuice(n.scoringStats,t),this.emitJourneyAudioAndJuice(n,r,t);const s=n.scoreDelta+fs(n.scoringStats);s>0&&(this.run={...this.run,score:this.run.score+s},this.events.push({type:"scoreChanged",score:this.run.score})),n.runtime.result==="won"?this.beginLevelResult("win"):n.runtime.result==="lost"&&this.beginLevelResult("loss")}handleJourneyPowerUpTap(e){var s;if(this.phase!=="IDLE"||((s=this.currentLevel)==null?void 0:s.type)!=="JOURNEY"||this.journeyRuntime==null)return;const t=dm(this.board,this.journeyRuntime,this.currentLevel,e,this.rng);if(!t.valid)return;const n=this.journeyRuntime.mageCell;this.board=t.board,this.journeyRuntime=t.runtime,this.levelMatchCount+=t.scoringStats.matchCount,this.levelValidSwapCount+=t.scoringStats.validSwapCount,this.captureBoardAnimationTrace(t.animationTrace),this.emitMatchAudioAndJuice(t.scoringStats,e),this.emitJourneyAudioAndJuice(t,n,e);const r=t.scoreDelta+fs(t.scoringStats);r>0&&(this.run={...this.run,score:this.run.score+r},this.events.push({type:"scoreChanged",score:this.run.score})),t.runtime.result==="won"?this.beginLevelResult("win"):t.runtime.result==="lost"&&this.beginLevelResult("loss")}handleTrialSwap(e,t){var s;if(((s=this.currentLevel)==null?void 0:s.type)!=="TRIAL"||this.trialRuntime==null)return;const n=Tm(this.board,this.trialRuntime,this.currentLevel,e,t,this.rng);if(!n.valid)return;this.board=n.board,this.trialRuntime=n.runtime,this.levelMatchCount+=n.scoringStats.matchCount,this.levelValidSwapCount+=n.scoringStats.validSwapCount,this.captureBoardAnimationTrace(n.animationTrace),this.emitMatchAudioAndJuice(n.scoringStats,t),this.emitTrialAudioAndJuice(n.damageEvents,t);const r=n.scoreDelta+fs(n.scoringStats);r>0&&(this.run={...this.run,score:this.run.score+r},this.events.push({type:"scoreChanged",score:this.run.score})),n.damageEvents.some(a=>a.defeated)?this.requestSound(X.sounds.monsterDefeat,{category:"enemy",volume:.62}):n.damageEvents.length>0&&this.requestSound(X.sounds.monsterDamage,{category:"enemy",volume:.5}),n.runtime.result==="won"?this.beginLevelResult("win"):n.runtime.result==="lost"&&this.beginLevelResult("loss")}handleTrialPowerUpTap(e){var r;if(((r=this.currentLevel)==null?void 0:r.type)!=="TRIAL"||this.trialRuntime==null)return;const t=bm(this.board,this.trialRuntime,this.currentLevel,e,this.rng);if(!t.valid)return;this.board=t.board,this.trialRuntime=t.runtime,this.levelMatchCount+=t.scoringStats.matchCount,this.levelValidSwapCount+=t.scoringStats.validSwapCount,this.captureBoardAnimationTrace(t.animationTrace),this.emitMatchAudioAndJuice(t.scoringStats,e),this.emitTrialAudioAndJuice(t.damageEvents,e);const n=t.scoreDelta+fs(t.scoringStats);n>0&&(this.run={...this.run,score:this.run.score+n},this.events.push({type:"scoreChanged",score:this.run.score})),t.damageEvents.some(s=>s.defeated)?this.requestSound(X.sounds.monsterDefeat,{category:"enemy",volume:.62}):t.damageEvents.length>0&&this.requestSound(X.sounds.monsterDamage,{category:"enemy",volume:.5}),t.runtime.result==="won"?this.beginLevelResult("win"):t.runtime.result==="lost"&&this.beginLevelResult("loss")}getLevelClearScore(){var e,t;return((e=this.currentLevel)==null?void 0:e.type)==="JOURNEY"&&this.journeyRuntime!=null?lm(this.run.difficulty,this.journeyRuntime.movesRemaining):((t=this.currentLevel)==null?void 0:t.type)==="TRIAL"?cm(this.run.difficulty,this.levelMatchCount,this.elapsedSec):0}captureBoardAnimationTrace(e){const t=Wf(e,this.nextBoardAnimationRevision);t!=null&&(this.latestBoardAnimationTrace=t,this.latestBoardAnimationEndsAtSec=this.animationClockSec+Mh(t)/1e3,this.nextBoardAnimationRevision+=1)}hasLatestBoardAnimationFinished(){return this.animationClockSec>=this.latestBoardAnimationEndsAtSec}requestSound(e,t={}){const n={type:"soundRequested",soundId:e};t.intensity!=null&&(n.intensity=t.intensity),t.volume!=null&&(n.volume=t.volume),t.playbackRate!=null&&(n.playbackRate=t.playbackRate),t.category!=null&&(n.category=t.category),this.events.push(n)}emitMatchAudioAndJuice(e,t){if(!(e.matchCount<=0)){this.requestSound(X.sounds.tileMatch,{category:"match",volume:.55});for(let n=0;n<e.comboCount;n+=1)this.requestSound(X.sounds.comboPitchStep,{category:"match",volume:.48,playbackRate:1+Math.min(6,n+1)*.08});e.powerUpsCreated>0&&(this.requestSound(X.sounds.powerupCreate,{category:"match",volume:.58,intensity:Math.min(1.5,e.powerUpsCreated)}),this.addBoardCue("powerPulse",t,.45)),this.addBoardCue("matchFlash",t,.3),this.triggerBoardShake(e.matchCount+e.powerUpsCreated)}}emitJourneyAudioAndJuice(e,t,n){for(const r of e.clearedStandardCells.slice(0,8))this.addBoardCue("matchFlash",r,.28);if(e.convertedPathCells.length>0){this.requestSound(X.sounds.pathConvert,{category:"match",volume:.56,intensity:Math.min(1.4,.75+e.convertedPathCells.length/8)});for(const r of e.convertedPathCells.slice(0,12))this.addBoardCue("pathGlow",r,.55)}eg(t,e.runtime.mageCell)||(this.requestSound(X.sounds.mageWalk,{category:"level",volume:.42}),this.addBoardCue("pathGlow",e.runtime.mageCell,.42)),e.convertedPathCells.length===0&&e.clearedStandardCells.length===0&&this.addBoardCue("matchFlash",n,.22)}emitTrialAudioAndJuice(e,t){for(const n of e.slice(0,8)){const r=Qm(n.schoolId);this.requestSound(r.whoosh,{category:"spell",volume:.42}),this.requestSound(r.impact,{category:"spell",volume:.48}),this.addBoardCue("damagePopup",t,.45,`-${Math.round(n.damage)}`)}}addBoardCue(e,t,n,r){this.visualCues.push({kind:e,coord:t,text:r,durationSec:n,remainingSec:n})}triggerBoardShake(e){this.shakeTimerSec=Math.max(this.shakeTimerSec,.16),this.shakeAmplitudePixels=Math.min(Lc,Math.max(ka,ka+e*1.4))}updateBoardJuice(e){e<=0||(this.shakeTimerSec=Math.max(0,this.shakeTimerSec-e),this.shakeTimerSec<=0&&(this.shakeAmplitudePixels=0),this.visualCues=this.visualCues.map(t=>({...t,remainingSec:t.remainingSec-e})).filter(t=>t.remainingSec>0))}getShakePixels(){return this.shakeTimerSec<=0?0:Math.min(Lc,Math.max(ka,this.shakeAmplitudePixels))}getBoardVisualCueState(){return this.visualCues.map(e=>({kind:e.kind,coord:e.coord,text:e.text,value:Math.max(0,Math.min(1,e.remainingSec/e.durationSec))}))}getObjectiveText(){var t,n;return((t=this.currentLevel)==null?void 0:t.type)==="TRIAL"&&this.trialRuntime!=null?this.trialRuntime.result==="won"?"Trial cleared":this.trialRuntime.result==="lost"?"Monsters broke through":`Monsters ${this.trialRuntime.defeatedMonsterIds.length}/${this.trialRuntime.totalMonsters}`:((n=this.currentLevel)==null?void 0:n.type)!=="JOURNEY"||this.journeyRuntime==null?"Journey":this.journeyRuntime.result==="won"?"Goal reached":this.journeyRuntime.result==="lost"?"Out of moves":Vc(this.currentLevel,this.journeyRuntime,this.elapsedSec).length>0?`Moves ${this.journeyRuntime.movesRemaining} - hinted path swap`:`Moves ${this.journeyRuntime.movesRemaining}`}getHeroWorldObjects(){var t,n;const e=[ei("stage-backdrop",Bt.backdropForest,{position:{x:0,y:0,z:-.2},scale:{x:1,y:1,z:1}})];if(((t=this.currentLevel)==null?void 0:t.type)==="TRIAL"&&this.trialRuntime!=null)return[...e,...this.getTrialHeroWorldObjects()];if(((n=this.currentLevel)==null?void 0:n.type)!=="JOURNEY"||this.journeyRuntime==null)return e;for(const r of cr(this.board))this.board[r.row][r.col].isPath&&e.push(ei(`journey-path-${r.col}-${r.row}`,Bt.pathMarker,{position:ps(r,-.05),scale:{x:.35,y:.05,z:.35},renderOrder:1,replication:"localCosmetic"}));return e.push(ei("actor-mage",Bt.mage,{position:ps(this.journeyRuntime.mageCell,.35),scale:{x:.042,y:.075,z:.042},renderOrder:4,animationId:qc(this.phase)}),ei("actor-prince-cage",Bt.princeCage,{position:ps(this.currentLevel.journey.goalCell,.55),scale:{x:.55,y:.75,z:.55},renderOrder:3,animationId:ng(this.phase)}),ei("prop-goal-flag",Bt.goalFlag,{position:ps(this.currentLevel.journey.goalCell,.15),scale:{x:.35,y:.55,z:.35},renderOrder:2,replication:"localCosmetic"})),e}getTrialHeroWorldObjects(){var t;if(((t=this.currentLevel)==null?void 0:t.type)!=="TRIAL"||this.trialRuntime==null)return[];const e=[ei("actor-mage",Bt.mage,{position:Gh(this.currentLevel),scale:{x:.04,y:.068,z:.04},renderOrder:5,animationId:qc(this.phase)}),ei("trial-fail-line",Bt.pathMarker,{position:{x:this.currentLevel.trial.contactX,y:this.currentLevel.trial.laneY,z:-.03},scale:{x:.06,y:1.25,z:.18},renderOrder:1,replication:"localCosmetic",tintHex:"#eb5757",opacity:.6})];for(const n of this.trialRuntime.monsters)e.push(ei(`trial-monster-${n.monsterId}`,Bt.monsterPlaceholder,{position:zh(this.currentLevel,n),scale:ig(n.kind),renderOrder:4,animationId:this.phase==="LOSE"?"victory":"walk",tintHex:rg(n.kind)}));return e}}function Jm(i){switch(i){case"FIRE":return X.tiles.fire;case"ICE":return X.tiles.ice;case"LIGHTNING":return X.tiles.lightning;case"EARTH":return X.tiles.earth;case"LAND":return X.tiles.land;case"ROCKET_H":return X.powerUps.rocketH;case"ROCKET_V":return X.powerUps.rocketV;case"TNT":return X.powerUps.tnt;case"LIGHTBALL":return X.powerUps.lightball}}function Qm(i){switch(i){case"fire":return{whoosh:X.sounds.fireWhoosh,impact:X.sounds.fireImpact};case"ice":return{whoosh:X.sounds.iceWhoosh,impact:X.sounds.iceImpact};case"lightning":return{whoosh:X.sounds.lightningWhoosh,impact:X.sounds.lightningImpact};case"earth":return{whoosh:X.sounds.earthWhoosh,impact:X.sounds.earthImpact}}}function eg(i,e){return i!=null&&i.col===e.col&&i.row===e.row}function tg(i){return i==="WIN"?"victory":i==="LOSE"?"fail":"none"}function qc(i){return i==="WIN"?"victory":i==="LOSE"?"stunned":"idle"}function ng(i){return i==="WIN"?"yank":"cower"}function ig(i){switch(i){case"kobold":return{x:.46,y:.62,z:.46};case"tallKobold":return{x:.52,y:.86,z:.52};case"miniBoss":return{x:.7,y:1.05,z:.7}}}function rg(i){switch(i){case"kobold":return"#27ae60";case"tallKobold":return"#8b6f47";case"miniBoss":return"#eb5757"}}function sg(i){return i==="TITLE"?"title":i==="GAME_OVER"?"gameOver":"play"}function ag(i){return i==="WIN"?"Level Clear":i==="LOSE"?"Life Lost":null}function ei(i,e,t){return{objectId:i,templateId:e,transform:{position:t.position,rotation:{x:0,y:0,z:0,w:1},scale:t.scale},visible:!0,lifetime:"persistent",replication:t.replication??"sharedGameplay",renderLayer:"heroStage",renderOrder:t.renderOrder,tintHex:t.tintHex,opacity:t.opacity,animationId:t.animationId}}function ps(i,e){const t=i.col/(Re-1),n=i.row/(Re-1);return{x:-4.6+t*9.2,y:1.6-n*2.7,z:e}}function og(i,e){const t=Math.min(e.width/Zt,e.height/Un),n=Zt*t,r=Un*t,s=e.left+(e.width-n)/2,a=e.top+(e.height-r)/2;return{x:(i.clientX-s)/t,y:(i.clientY-a)/t}}function lg(i){const t=new URLSearchParams(i).get("seed");if(t==null||t.trim()==="")return;const n=Number(t);if(!Number.isFinite(n))return;const r=Math.trunc(n)>>>0;return r===0?void 0:r}function cg(i){var n;const t=(n=new URLSearchParams(i).get("levelType"))==null?void 0:n.toUpperCase();return t==="TRIAL"||t==="JOURNEY"?t:void 0}function ug(i){const t=new URLSearchParams(i).get("level");if(t==null||t.trim()==="")return;const n=Number(t);if(!Number.isFinite(n))return;const r=Math.trunc(n);return r>=1?r:void 0}class hg{constructor(e){Le(this,"commands",[]);Le(this,"dragStartCell",null);Le(this,"dragStartPoint",null);Le(this,"onPointerDown",e=>{const t=this.eventToLogicalPoint(e);this.commands.push({type:"dragStart",x:t.x,y:t.y}),this.dragStartPoint=t,this.dragStartCell=Lo(t)});Le(this,"onPointerUp",e=>{const t=this.eventToLogicalPoint(e);this.commands.push({type:"dragEnd",x:t.x,y:t.y});const n=dg(this.dragStartPoint,t);n&&this.commands.push({type:"tap",x:t.x,y:t.y});const r=Lo(t);if(this.dragStartCell!=null&&r!=null&&!n){const s=r.col-this.dragStartCell.col,a=r.row-this.dragStartCell.row;Math.abs(s)+Math.abs(a)===1&&this.commands.push({type:"swap",from:this.dragStartCell,to:r})}this.dragStartCell=null,this.dragStartPoint=null});this.stageElement=e,this.stageElement.addEventListener("pointerdown",this.onPointerDown),this.stageElement.addEventListener("pointerup",this.onPointerUp)}drainCommands(){const e=this.commands;return this.commands=[],e}dispose(){this.stageElement.removeEventListener("pointerdown",this.onPointerDown),this.stageElement.removeEventListener("pointerup",this.onPointerUp)}eventToLogicalPoint(e){return og(e,this.stageElement.getBoundingClientRect())}}function dg(i,e){return i==null?!0:Math.hypot(e.x-i.x,e.y-i.y)<16}const fg="/assets/audio",pg="Assets/Audio",mg={[X.sounds.tileMatch]:Dt(X.sounds.tileMatch,"tile-match","match","global",.52,Ut("triangle",420,90),"Primary first-cascade tile match click/pop."),[X.sounds.comboPitchStep]:Dt(X.sounds.comboPitchStep,"combo-pitch-step","match","global",.48,Ut("triangle",560,85),"Cascade ladder step; browser playbackRate is used for rising pitch."),[X.sounds.fireWhoosh]:Dt(X.sounds.fireWhoosh,"spell-fire-whoosh","spell","templateLocal",.42,Ut("sawtooth",330,120),"Fire spell launch whoosh, local to mage/projectile template in MHS."),[X.sounds.iceWhoosh]:Dt(X.sounds.iceWhoosh,"spell-ice-whoosh","spell","templateLocal",.38,Ut("sine",620,120),"Ice spell launch shimmer, local to mage/projectile template in MHS."),[X.sounds.lightningWhoosh]:Dt(X.sounds.lightningWhoosh,"spell-lightning-whoosh","spell","templateLocal",.38,Ut("square",740,75),"Lightning spell launch snap, local to mage/projectile template in MHS."),[X.sounds.earthWhoosh]:Dt(X.sounds.earthWhoosh,"spell-earth-whoosh","spell","templateLocal",.42,Ut("triangle",230,130),"Earth spell launch thump, local to mage/projectile template in MHS."),[X.sounds.fireImpact]:Dt(X.sounds.fireImpact,"spell-fire-impact","spell","templateLocal",.48,Ut("noise",260,110),"Fire spell impact burst at monster target."),[X.sounds.iceImpact]:Dt(X.sounds.iceImpact,"spell-ice-impact","spell","templateLocal",.44,Ut("sine",820,110),"Ice spell impact chime at monster target."),[X.sounds.lightningImpact]:Dt(X.sounds.lightningImpact,"spell-lightning-impact","spell","templateLocal",.46,Ut("square",980,80),"Lightning spell impact crack at monster target."),[X.sounds.earthImpact]:Dt(X.sounds.earthImpact,"spell-earth-impact","spell","templateLocal",.48,Ut("triangle",180,125),"Earth spell impact stomp at monster target."),[X.sounds.pathConvert]:Dt(X.sounds.pathConvert,"path-convert","match","global",.5,Ut("sine",520,160),"Journey LAND-to-path conversion shimmer."),[X.sounds.mageWalk]:Dt(X.sounds.mageWalk,"mage-walk","level","templateLocal",.34,Ut("triangle",260,90),"Mage one-step movement tick, local to mage template in MHS."),[X.sounds.monsterDamage]:Dt(X.sounds.monsterDamage,"monster-damage","enemy","templateLocal",.44,Ut("noise",180,95),"Monster damage response, local to monster template in MHS."),[X.sounds.monsterDefeat]:Dt(X.sounds.monsterDefeat,"monster-defeat","enemy","templateLocal",.54,Ut("noise",140,170),"Monster defeat burst, local to monster template in MHS."),[X.sounds.powerupCreate]:Dt(X.sounds.powerupCreate,"powerup-create","match","global",.54,Ut("sawtooth",680,150),"Power-up creation sparkle."),[X.sounds.victorySting]:Dt(X.sounds.victorySting,"victory-sting","level","global",.62,Ut("triangle",720,260),"Level clear success sting."),[X.sounds.cageYankWhoosh]:Dt(X.sounds.cageYankWhoosh,"cage-yank-whoosh","level","global",.48,Ut("sawtooth",260,220),"Unseen abductor cage-yank whoosh during victory staging."),[X.sounds.runEnd]:Dt(X.sounds.runEnd,"run-end","run","global",.6,Ut("sine",220,360),"Run-end fanfare/downbeat for Game Over.")};function Dt(i,e,t,n,r,s,a){return{id:i,browserUrl:`${fg}/${e}.mp3`,futureMhsPath:`${pg}/${e}.mp3`,defaultVolume:r,category:t,scope:n,fallback:s,notes:a}}function Ut(i,e,t){return{waveform:i,frequencyHz:e,durationMs:t,attackMs:6,releaseMs:28}}const Tn="Runtime 256x256 transparent PNG, centered subject, 24-36px padding, readable at 100x100.",Ha="Runtime 2160x1000 PNG/WebP for 2x coverage of the 1080x500 hero stage.",gg="Hero-stage cover backdrop. Drawn as a Three.js texture plane that fills the orthographic 1080x500 stage and crops overflow.",_g="Transparent PNG source parts now; later exported as a 2048x2048 atlas plus skeletal JSON.",vg="Temporary browser hero-stage FBX model. Auto-normalized in Three.js to bottom-center pivot and 1.45 world-unit height. Loops animation frames 0-60.",xg="Runtime 1080x150 PNG for the fixed middle HUD band; drawn full-width behind HUD text.",Zh={[X.tiles.fire]:qt(X.tiles.fire,"/assets/tiles/tile-fire.png","Assets/Textures/Tiles/tile-fire.png","prompt.tiles.standard",Tn),[X.tiles.ice]:qt(X.tiles.ice,"/assets/tiles/tile-ice.png","Assets/Textures/Tiles/tile-ice.png","prompt.tiles.standard",Tn),[X.tiles.lightning]:qt(X.tiles.lightning,"/assets/tiles/tile-lightning.png","Assets/Textures/Tiles/tile-lightning.png","prompt.tiles.standard",Tn),[X.tiles.earth]:qt(X.tiles.earth,"/assets/tiles/tile-earth.png","Assets/Textures/Tiles/tile-earth.png","prompt.tiles.standard",Tn),[X.tiles.land]:qt(X.tiles.land,"/assets/tiles/tile-land.png","Assets/Textures/Tiles/tile-land.png","prompt.tiles.journey",Tn),[X.tiles.path]:qt(X.tiles.path,"/assets/tiles/tile-path.png","Assets/Textures/Tiles/tile-path.png","prompt.tiles.journey",Tn),[X.tiles.empty]:qt(X.tiles.empty,"/assets/tiles/empty.png","Assets/Textures/Tiles/empty.png","prompt.tiles.standard","Runtime empty-cell marker for non-playable Trial void spaces. Drawn as board art only; not matchable or refillable."),[X.powerUps.rocketH]:qt(X.powerUps.rocketH,"/assets/powerups/power-rocket-h.png","Assets/Textures/PowerUps/power-rocket-h.png","prompt.powerups.standard",Tn),[X.powerUps.rocketV]:qt(X.powerUps.rocketV,"/assets/powerups/power-rocket-v.png","Assets/Textures/PowerUps/power-rocket-v.png","prompt.powerups.standard",Tn),[X.powerUps.tnt]:qt(X.powerUps.tnt,"/assets/powerups/power-tnt.png","Assets/Textures/PowerUps/power-tnt.png","prompt.powerups.standard",Tn),[X.powerUps.lightball]:qt(X.powerUps.lightball,"/assets/powerups/power-lightball.png","Assets/Textures/PowerUps/power-lightball.png","prompt.powerups.standard",Tn),[X.backdrops.forest]:qt(X.backdrops.forest,"/assets/backdrops/backdrop-forest.png","Assets/Textures/Backdrops/backdrop-forest.png","prompt.backdrops.hero",Ha,"2160x1000"),[X.backdrops.crypt]:qt(X.backdrops.crypt,"/assets/backdrops/backdrop-crypt.png","Assets/Textures/Backdrops/backdrop-crypt.png","prompt.backdrops.hero",Ha,"2160x1000"),[X.backdrops.crystalCave]:qt(X.backdrops.crystalCave,"/assets/backdrops/backdrop-crystal-cave.png","Assets/Textures/Backdrops/backdrop-crystal-cave.png","prompt.backdrops.hero",Ha,"2160x1000"),[X.backdrops.castle]:qt(X.backdrops.castle,"/assets/backdrops/backdrop-castle.png","Assets/Textures/Backdrops/backdrop-castle.png","prompt.backdrops.hero",gg,"cover 1080x500 hero stage"),[X.rigs.mage]:ms(X.rigs.mage,"/assets/rigs/knight1.fbx","Assets/Rigs/Mage/knight1.fbx","prompt.rig.mage","fbx","temporary FBX stand-in, auto-normalized to 1.45 world units",vg),[X.rigs.prince]:ms(X.rigs.prince,"/assets/rigs/prince/prince-parts-source.png","Assets/Rigs/Prince/prince-rig.json","prompt.rig.prince"),[X.rigs.kobold]:ms(X.rigs.kobold,"/assets/rigs/kobold/kobold-parts-source.png","Assets/Rigs/Kobold/kobold-rig.json","prompt.rig.kobolds"),[X.rigs.tallKobold]:ms(X.rigs.tallKobold,"/assets/rigs/tall-kobold/tall-kobold-parts-source.png","Assets/Rigs/TallKobold/tall-kobold-rig.json","prompt.rig.kobolds"),[X.props.princeCage]:ki(X.props.princeCage,"/assets/props/prop-prince-cage.png","Assets/Textures/Props/prop-prince-cage.png","prompt.rig.prince","Cage frame source until rig export is available."),[X.props.goalFlag]:ki(X.props.goalFlag,"/assets/props/prop-goal-flag.png","Assets/Textures/Props/prop-goal-flag.png","prompt.tiles.journey","Goal marker prop for Journey staging."),[X.props.abductorGlove]:ki(X.props.abductorGlove,"/assets/props/prop-abductor-glove.png","Assets/Textures/Props/prop-abductor-glove.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[X.props.abductorHook]:ki(X.props.abductorHook,"/assets/props/prop-abductor-hook.png","Assets/Textures/Props/prop-abductor-hook.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[X.props.abductorHand]:ki(X.props.abductorHand,"/assets/props/prop-abductor-hand.png","Assets/Textures/Props/prop-abductor-hand.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[X.props.abductorRope]:ki(X.props.abductorRope,"/assets/props/prop-abductor-rope.png","Assets/Textures/Props/prop-abductor-rope.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[X.ui.hudBanner]:yg(X.ui.hudBanner,"/assets/ui/ui-banner.png","Assets/Textures/UI/ui-banner.png",xg,"1080x150"),...Object.fromEntries(Object.values(mg).map(i=>[i.id,Mg(i)]))};function Jh(i){return Zh[i]}function Sg(){return Object.values(Zh).filter(i=>i.kind==="texture"||i.kind==="ui")}function qt(i,e,t,n,r,s="256x256"){return{id:i,kind:"texture",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:s,unitScale:1,pivot:"center",collision:"none",artPromptId:n,notes:r}}function ki(i,e,t,n,r){return{id:i,kind:"texture",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:"max 1024px longest side",unitScale:1,pivot:"center",collision:"none",artPromptId:n,notes:r}}function ms(i,e,t,n,r="png",s="source parts max 1024px, final atlas 2048x2048",a=_g){return{id:i,kind:"rig",browserUrl:e,futureMhsPath:t,sourceFormat:r,runtimeSize:s,unitScale:1,forwardAxis:"+Z",upAxis:"+Y",pivot:"bottomCenter",collision:"capsule",artPromptId:n,notes:a}}function yg(i,e,t,n,r){return{id:i,kind:"ui",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:r,unitScale:1,pivot:"center",collision:"none",notes:n}}function Mg(i){return{id:i.id,kind:"audio",browserUrl:i.browserUrl,futureMhsPath:i.futureMhsPath,sourceFormat:"mp3",runtimeSize:"optional browser audio file with WebAudio synth fallback",unitScale:1,pivot:"center",collision:"none",notes:`${i.notes} MHS mapping: ${i.scope==="global"?"global SoundComponent":"template-local SoundComponent"}.`}}function Vl(i,e=Tg()){if(wg(i))return i;const t=bg(e),n=i.replace(/^\/+/,"");return`${t}${n}`}function Tg(){var e;return((e=import.meta.env)==null?void 0:e.BASE_URL)??"/"}function bg(i){return i.trim()===""?"/":i.endsWith("/")?i:`${i}/`}function wg(i){return/^[a-z][a-z\d+\-.]*:/i.test(i)||i.startsWith("//")}async function Eg(i=Sg()){const e=await Promise.all(i.map(Ag));return Object.fromEntries(e.filter(t=>t!=null))}function Ag(i){return new Promise(e=>{const t=new Image;t.onload=()=>e([i.id,t]),t.onerror=()=>e(null),t.src=Vl(i.browserUrl)})}const jc="magus-match.leaderboard.v1";class Cg{constructor(e=window.localStorage){this.storage=e}load(){return zm(this.storage.getItem(jc))}save(e){this.storage.setItem(jc,Gm(e))}}class Rg{constructor(){Le(this,"activeAnimation",null);Le(this,"lastRevisionId",null)}present(e,t){const n=e.animationTrace??null;if(n!=null&&n.revisionId!==this.lastRevisionId){const s=this.activeAnimation==null||!Ig(n)?null:this.sampleActiveAnimation(e,t);this.activeAnimation={trace:n,startSec:t,retargetStarts:s==null?new Map:kg(s)},this.lastRevisionId=n.revisionId}if(this.activeAnimation==null)return e;const r=this.sampleActiveAnimation(e,t);return this.isAnimationComplete(t)?(this.activeAnimation=null,e):r}sampleActiveAnimation(e,t){if(this.activeAnimation==null)return e;const n=Math.max(0,(t-this.activeAnimation.startSec)*1e3),r=this.activeAnimation.trace,s=Th(r),a=Pg(r,s,n,this.activeAnimation.retargetStarts);return{...e,boardCells:a}}isAnimationComplete(e){if(this.activeAnimation==null)return!0;const t=Mh(this.activeAnimation.trace);return Math.max(0,(e-this.activeAnimation.startSec)*1e3)>=t}}function Ig(i){return i.kind!=="levelIntro"}function Pg(i,e,t,n){if(i.kind!=="levelIntro"&&(t<Ta||e.length===0))return Lg(i,t,n);const r=e.find(s=>t<s.endMs);return r==null?Bg(i.finalSnapshot):t<r.fallStartMs?Dg(r.step,t-r.popStartMs):Ng(r.step,t-r.fallStartMs,r.endMs-r.fallStartMs,r.fallDelaysByTileId,n,i.kind==="levelIntro")}function Lg(i,e,t){const n=Ri(e/Ta);return i.postSwapSnapshot.cells.map(r=>{const s=pr(r.coord),a=t.get(r.tileId),o=i.preSwapSnapshot.cells.find(h=>h.tileId===r.tileId),l=a??(o==null?s:pr(o.coord)),c=zl(n);return Aa(r,{renderX:rr(l.renderX,s.renderX,c),renderY:rr(l.renderY,s.renderY,c),scale:rr(l.scale,1,c),alpha:rr(l.alpha,1,c),zIndex:5})})}function Dg(i,e){const t=new Map(i.clearedTiles.map(n=>[n.tileId,n]));return i.beforeClearSnapshot.cells.map(n=>Aa(n,t.has(n.tileId)?Ug(t.get(n.tileId),e):{zIndex:0}))}function Ug(i,e){const t=Ri((e-(i.clearDelayMs??0))/vh);return t<=0?{scale:1,alpha:1,zIndex:8}:{scale:1-zl(t),alpha:1-t,zIndex:8}}function Ng(i,e,t,n,r,s){const a=new Set([...i.fallingTiles.map(l=>l.tileId),...i.refillTiles.map(l=>l.tileId)]),o=i.beforeGravitySnapshot.cells.filter(l=>!a.has(l.tileId)).map(l=>Aa(l,{zIndex:0}));for(const l of i.fallingTiles)o.push(Kc(l,e,t,n,r,6,s));for(const l of i.refillTiles)o.push(Kc(l,e,t,n,r,7,s));return o}function Kc(i,e,t,n,r,s,a){const o=Math.max(1,Math.abs(i.to.row-i.from.row)),l=n.get(i.tileId)??0,c=Qh(o*xh+yh,Ks,Math.min(Sh,t)),h=Ri((e-l)/c),u=Vg(h),d=pr(i.to),f="movementKind"in i&&i.movementKind==="slide",p=f?Fg(i,r):Og(i,d,r),_=zg(h);return{tileId:i.tileId,coord:i.to,assetId:ed(i.tileType),tileType:i.tileType,isPath:i.isPath,alpha:(a||i.from.row<0)&&h<=0?0:1,renderX:f?rr(p.renderX,d.renderX,u):d.renderX,renderY:rr(p.renderY,d.renderY,u),scale:_,zIndex:s,isGhost:!0}}function Fg(i,e){return e.get(i.tileId)??pr(i.from)}function Og(i,e,t){const n=pr({col:i.to.col,row:i.from.row}),r=t.get(i.tileId);return r==null||Math.abs(r.renderX-e.renderX)>.5?{...n,renderX:e.renderX}:{...r,renderX:e.renderX}}function Bg(i){return i.cells.map(e=>Aa(e,{zIndex:0}))}function Aa(i,e={}){return{tileId:i.tileId,coord:i.coord,assetId:ed(i.tileType),tileType:i.tileType,isPath:i.isPath,alpha:e.alpha??1,renderX:e.renderX,renderY:e.renderY,scale:e.scale,zIndex:e.zIndex,isGhost:e.isGhost}}function kg(i){return new Map(i.boardCells.map(e=>{const t=pr(e.coord);return[e.tileId,{renderX:e.renderX??t.renderX,renderY:e.renderY??t.renderY,scale:e.scale??1,alpha:e.alpha}]}))}function pr(i){return{renderX:Ae.x+i.col*Ae.cellSize,renderY:Ae.y+i.row*Ae.cellSize,scale:1,alpha:1}}function Vg(i){const e=Ri(i),t=.82;if(e<t)return Math.pow(e/t,2.4)*.96;const n=(e-t)/(1-t),r=.96+(1-.96)*zl(n),s=Math.sin(n*Math.PI*2)*.015*(1-n);return Ri(r+s)}function zg(i){const e=Ri(i);if(e<.72)return 1;const t=(e-.72)/.28;return 1+Math.sin(t*Math.PI*2)*.045*(1-t)}function zl(i){return 1-Math.pow(1-Ri(i),3)}function rr(i,e,t){return i+(e-i)*t}function Ri(i){return Qh(i,0,1)}function Qh(i,e,t){return Math.max(e,Math.min(t,i))}function ed(i){switch(i){case"FIRE":return X.tiles.fire;case"ICE":return X.tiles.ice;case"LIGHTNING":return X.tiles.lightning;case"EARTH":return X.tiles.earth;case"LAND":return X.tiles.land;case"ROCKET_H":return X.powerUps.rocketH;case"ROCKET_V":return X.powerUps.rocketV;case"TNT":return X.powerUps.tnt;case"LIGHTBALL":return X.powerUps.lightball}}class Gg{constructor(e,t,n,r){this.ctx=e,this.images=t,this.width=n,this.height=r}setImages(e){this.images=e}clear(){this.ctx.clearRect(0,0,this.width,this.height)}pushTranslate(e,t){this.ctx.save(),this.ctx.translate(e,t)}pushScale(e,t,n=0,r=0){this.ctx.save(),this.ctx.translate(n,r),this.ctx.scale(e,t),this.ctx.translate(-n,-r)}pushRotate(e,t=0,n=0){this.ctx.save(),this.ctx.translate(t,n),this.ctx.rotate(e*Math.PI/180),this.ctx.translate(-t,-n)}pushAlpha(e){this.ctx.save(),this.ctx.globalAlpha*=Math.max(0,Math.min(1,e))}pushClipRect(e,t,n,r){this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(e,t,n,r),this.ctx.clip()}pop(){this.ctx.restore()}drawRect(e,t,n,r,s){this.ctx.fillStyle=e,this.ctx.fillRect(t,n,r,s)}drawEllipse(e,t,n,r,s){this.ctx.fillStyle=e,this.ctx.beginPath(),this.ctx.ellipse(t,n,r,s,0,0,Math.PI*2),this.ctx.fill()}hasImage(e){return this.images[e.id]!=null}drawImage(e,t,n,r,s){const a=this.images[e.id];a!=null&&this.ctx.drawImage(a,t,n,r,s)}drawText(e,t,n,r,s,a){this.ctx.fillStyle=a.color,this.ctx.font=`${a.fontWeight??"normal"} ${a.fontSize}px ${a.fontFamily??"Inter, Arial, sans-serif"}`,this.ctx.textAlign=a.align??"left",this.ctx.textBaseline="middle";const o=a.align==="center"?t+r/2:a.align==="right"?t+r:t;this.ctx.fillText(e,o,n+s/2,r)}}const Hg=10,td=Hr-Hg;function nd(i,e,t,n,r){i.clear(),Xg(i),Yg(i,t),qg(i,e,n),r!=null&&Jg(i,r)}function Wg(i,e){const t=new Set(i.hintedCells.map(gs)),n=new Map;for(const a of i.visualCues){const o=gs(a.coord);n.set(o,[...n.get(o)??[],a])}const r=[],s=(Math.sin(e*Math.PI*3)+1)/2;for(const a of i.boardCells){const o=a.coord,l=t.has(gs(o)),c=n.get(gs(o))??[],h=c.reduce((g,m)=>m.kind==="damagePopup"?g:Math.max(g,m.value),0),u=c.some(g=>g.kind==="powerPulse")?1+c.reduce((g,m)=>Math.max(g,m.value),0)*.1:1,d=Ae.x+o.col*Ae.cellSize,f=Ae.y+o.row*Ae.cellSize,p=a.renderX??d,_=a.renderY??f;r.push({tileId:a.tileId,coord:o,x:p,y:_,width:Ae.cellSize,height:Ae.cellSize,centerX:p+Ae.cellSize/2,centerY:_+Ae.cellSize/2,assetId:a.assetId,tileType:a.tileType,fillColor:n0(a.tileType),glyph:i0(a.tileType),isPath:a.isPath,isHinted:l,hasMage:$c(i.mageCell,o),hasGoal:$c(i.goalCell,o),alpha:a.alpha,scale:a.scale??Math.max(l?1+s*.05:1,u),flash:Math.max(l?.35+s*.45:0,h*.5),zIndex:a.zIndex??0})}return r}function Xg(i){const e={id:X.ui.hudBanner};i.hasImage(e)&&i.drawImage(e,0,td,Zt,An),i.drawRect("#1f1830",0,Hr+An,Zt,Un-Hr-An)}function Yg(i,e){const t=td;i.drawText(e.levelText,32,t,180,An,{fontSize:34,fontWeight:"bold",color:"#241832",align:"left"}),i.drawText(e.livesText,230,t,200,An,{fontSize:34,fontWeight:"bold",color:"#241832",align:"left"}),i.drawText(`Score ${e.scoreText}`,452,t,230,An,{fontSize:34,fontWeight:"bold",color:"#241832",align:"left"}),i.drawText(e.objectiveText,700,t,300,An,{fontSize:28,fontWeight:"bold",color:"#241832",align:"right"}),i.drawText(e.muted?"MUTE":"SOUND",1010,t,48,An,{fontSize:18,fontWeight:"bold",color:"#4b2e83",align:"right"})}function qg(i,e,t){const n=e.shakePixels;i.pushTranslate(n,0),i.drawRect("#302340",Ae.x,Ae.y,Ae.width,Ae.height);const r=Wg(e,t).sort((s,a)=>s.zIndex-a.zIndex||s.coord.row-a.coord.row||s.coord.col-a.coord.col);i.pushClipRect(Ae.x,Ae.y,Ae.width,Ae.height);for(const s of e.emptyCells??[])jg(i,s.coord,s.assetId);for(const s of r)$g(i,s);i.pop(),Kg(i),Zg(i,e),i.pop()}function jg(i,e,t){const n=Ae.x+e.col*Ae.cellSize,r=Ae.y+e.row*Ae.cellSize;i.drawRect("#171225",n,r,Ae.cellSize,Ae.cellSize);const s={id:t};if(i.hasImage(s)){i.drawImage(s,n,r,Ae.cellSize,Ae.cellSize);return}i.drawRect("#0f0b18",n+8,r+8,Ae.cellSize-16,Ae.cellSize-16)}function Kg(i){i.drawRect("#c8a24b",Ae.x-8,Ae.y-8,Ae.width+16,8),i.drawRect("#c8a24b",Ae.x-8,Ae.y+Ae.height,Ae.width+16,8),i.drawRect("#c8a24b",Ae.x-8,Ae.y,8,Ae.height),i.drawRect("#c8a24b",Ae.x+Ae.width,Ae.y,8,Ae.height)}function $g(i,e){const n=e.width-16,r=e.height-16,s=n*e.scale,a=r*e.scale,o=e.centerX-s/2,l=e.centerY-a/2;if(e.alpha<=0)return;i.pushAlpha(e.alpha),i.drawRect("#171225",e.x,e.y,e.width,e.height);const c={id:e.assetId};i.hasImage(c)?i.drawImage(c,o,l,s,a):i.drawRect(e.fillColor,o,l,s,a),e.isPath&&i.drawRect("rgba(245, 233, 201, 0.55)",e.x+12,e.y+12,e.width-24,e.height-24),e.flash>0&&i.drawRect(`rgba(255, 255, 255, ${e.flash.toFixed(3)})`,e.x+4,e.y+4,e.width-8,e.height-8),i.hasImage(c)||i.drawText(e.glyph,e.x,e.y,e.width,e.height,{fontSize:54,fontWeight:"bold",color:e.tileType==="LIGHTNING"?"#241832":"#f5e9c9",align:"center"}),e.hasGoal&&i.drawText("G",e.x+e.width-44,e.y+10,34,34,{fontSize:28,fontWeight:"bold",color:"#241832",align:"center"}),e.hasMage&&(i.drawEllipse("#4b2e83",e.centerX,e.centerY,34,34),i.drawEllipse("#c8a24b",e.centerX,e.centerY,25,25),i.drawText("M",e.centerX-24,e.centerY-24,48,48,{fontSize:30,fontWeight:"bold",color:"#241832",align:"center"})),i.pop()}function Zg(i,e){for(const t of e.visualCues){if(t.kind!=="damagePopup"||t.text==null)continue;const n=Ae.x+t.coord.col*Ae.cellSize,r=Ae.y+t.coord.row*Ae.cellSize-(1-t.value)*42;i.drawText(t.text,n,r,Ae.cellSize,42,{fontSize:30,fontWeight:"bold",color:`rgba(245, 233, 201, ${Math.max(0,t.value).toFixed(3)})`,align:"center"})}}function Jg(i,e){if(e.screen==="title"){Qg(i,e);return}if(e.screen==="gameOver"){e0(i,e);return}e.transitionText!=null&&t0(i,e.transitionText)}function Qg(i,e){i.drawRect("rgba(20, 14, 32, 0.78)",0,0,Zt,Un),i.drawText("MAGUS MATCH",100,250,880,150,{fontSize:86,fontWeight:"bold",color:"#f5e9c9",align:"center"}),i.drawText("Save the prince one spell at a time",160,390,760,60,{fontSize:34,fontWeight:"normal",color:"#c8a24b",align:"center"}),id(i,e.buttonRects.play,"PLAY"),rd(i,e,1260,5)}function e0(i,e){i.drawRect("rgba(20, 14, 32, 0.86)",0,0,Zt,Un),i.drawText("GAME OVER",120,185,840,110,{fontSize:72,fontWeight:"bold",color:"#f5e9c9",align:"center"}),i.drawText(`Final ${e.finalScore}`,140,320,800,70,{fontSize:42,fontWeight:"bold",color:"#c8a24b",align:"center"}),i.drawText(`High ${e.highScore}`,140,390,800,54,{fontSize:30,fontWeight:"bold",color:"#f5e9c9",align:"center"}),rd(i,e,520,10),id(i,e.buttonRects.tryAgain,"TRY AGAIN")}function t0(i,e){i.drawRect("rgba(20, 14, 32, 0.55)",0,0,Zt,Un),i.drawText(e,120,800,840,120,{fontSize:70,fontWeight:"bold",color:"#f5e9c9",align:"center"})}function id(i,e,t){i.drawRect("#c8a24b",e.x,e.y,e.width,e.height),i.drawRect("#4b2e83",e.x+8,e.y+8,e.width-16,e.height-16),i.drawText(t,e.x,e.y,e.width,e.height,{fontSize:44,fontWeight:"bold",color:"#f5e9c9",align:"center"})}function rd(i,e,t,n){i.drawText("HALL OF HEROES",150,t,780,56,{fontSize:34,fontWeight:"bold",color:"#f5e9c9",align:"center"});const r=e.leaderboardRows.slice(0,n);if(r.length===0){i.drawText("No champions yet",190,t+74,700,44,{fontSize:26,fontWeight:"normal",color:"#c8a24b",align:"center"});return}r.forEach((s,a)=>{const o=t+72+a*52,l=e.highlightedRank===a+1;l&&i.drawRect("rgba(200, 162, 75, 0.35)",120,o-3,840,46),i.drawText(`${a+1}. ${s.name}`,145,o,520,42,{fontSize:26,fontWeight:l?"bold":"normal",color:"#f5e9c9",align:"left"}),i.drawText(`${s.score}`,665,o,260,42,{fontSize:26,fontWeight:l?"bold":"normal",color:"#c8a24b",align:"right"})})}function n0(i){switch(i){case"FIRE":return"#eb5757";case"ICE":return"#2d9cdb";case"LIGHTNING":return"#f2c94c";case"EARTH":return"#27ae60";case"LAND":return"#8b6f47";case"ROCKET_H":case"ROCKET_V":case"TNT":case"LIGHTBALL":return"#c8a24b"}}function i0(i){switch(i){case"FIRE":return"F";case"ICE":return"I";case"LIGHTNING":return"L";case"EARTH":return"E";case"LAND":return"P";case"ROCKET_H":return"H";case"ROCKET_V":return"V";case"TNT":return"B";case"LIGHTBALL":return"O"}}function gs(i){return`${i.col},${i.row}`}function $c(i,e){return i!=null&&i.col===e.col&&i.row===e.row}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gl="184",r0=0,Zc=1,s0=2,$s=1,a0=2,Fr=3,di=0,Qt=1,Cn=2,Yn=0,ur=1,Jc=2,Qc=3,eu=4,o0=5,Ti=100,l0=101,c0=102,u0=103,h0=104,d0=200,f0=201,p0=202,m0=203,Bo=204,ko=205,g0=206,_0=207,v0=208,x0=209,S0=210,y0=211,M0=212,T0=213,b0=214,Vo=0,zo=1,Go=2,mr=3,Ho=4,Wo=5,Xo=6,Yo=7,Ca=0,w0=1,E0=2,Pn=0,sd=1,ad=2,od=3,ld=4,cd=5,ud=6,hd=7,tu="attached",A0="detached",dd=300,Ii=301,gr=302,Zs=303,Wa=304,Ra=306,Wr=1e3,vn=1001,qo=1002,Vt=1003,C0=1004,_s=1005,Wt=1006,Xa=1007,Ei=1008,sn=1009,fd=1010,pd=1011,Xr=1012,Hl=1013,Nn=1014,xn=1015,jn=1016,Wl=1017,Xl=1018,Yr=1020,md=35902,gd=35899,_d=1021,vd=1022,hn=1023,Kn=1026,Ai=1027,xd=1028,Yl=1029,Pi=1030,ql=1031,jl=1033,Js=33776,Qs=33777,ea=33778,ta=33779,jo=35840,Ko=35841,$o=35842,Zo=35843,Jo=36196,Qo=37492,el=37496,tl=37488,nl=37489,ua=37490,il=37491,rl=37808,sl=37809,al=37810,ol=37811,ll=37812,cl=37813,ul=37814,hl=37815,dl=37816,fl=37817,pl=37818,ml=37819,gl=37820,_l=37821,vl=36492,xl=36494,Sl=36495,yl=36283,Ml=36284,ha=36285,Tl=36286,R0=2200,Sd=2201,I0=2202,da=2300,bl=2301,Ya=2302,nu=2303,sr=2400,ar=2401,fa=2402,Kl=2500,yd=2501,P0=3200,qr=0,L0=1,li="",ht="srgb",pa="srgb-linear",ma="linear",nt="srgb",Vi=7680,iu=519,D0=512,U0=513,N0=514,$l=515,F0=516,O0=517,Zl=518,B0=519,ru=35044,su="300 es",Rn=2e3,jr=2001;function k0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Md(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function V0(){const i=Kr("canvas");return i.style.display="block",i}const au={};function ou(...i){const e="THREE."+i.shift();console.log(e,...i)}function Td(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Te(...i){i=Td(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Pe(...i){i=Td(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function wl(...i){const e=i.join(" ");e in au||(au[e]=!0,Te(...i))}function z0(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const G0={[Vo]:zo,[Go]:Xo,[Ho]:Yo,[mr]:Wo,[zo]:Vo,[Xo]:Go,[Yo]:Ho,[Wo]:mr};class pi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let lu=1234567;const hr=Math.PI/180,_r=180/Math.PI;function mi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function Jl(i,e){return(i%e+e)%e}function H0(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function W0(i,e,t){return i!==e?(t-i)/(e-i):0}function kr(i,e,t){return(1-t)*i+t*e}function X0(i,e,t,n){return kr(i,e,1-Math.exp(-t*n))}function Y0(i,e=1){return e-Math.abs(Jl(i,e*2)-e)}function q0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function j0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function K0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function $0(i,e){return i+Math.random()*(e-i)}function Z0(i){return i*(.5-Math.random())}function J0(i){i!==void 0&&(lu=i);let e=lu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Q0(i){return i*hr}function e_(i){return i*_r}function t_(i){return(i&i-1)===0&&i!==0}function n_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function i_(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function r_(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),p=a((n-e)/2);switch(r){case"XYX":i.set(o*h,l*u,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*p,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*p,o*c);break;case"ZYZ":i.set(l*p,l*f,o*h,o*c);break;default:Te("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ir(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function jt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const $t={DEG2RAD:hr,RAD2DEG:_r,generateUUID:mi,clamp:qe,euclideanModulo:Jl,mapLinear:H0,inverseLerp:W0,lerp:kr,damp:X0,pingpong:Y0,smoothstep:q0,smootherstep:j0,randInt:K0,randFloat:$0,randFloatSpread:Z0,seededRandom:J0,degToRad:Q0,radToDeg:e_,isPowerOfTwo:t_,ceilPowerOfTwo:n_,floorPowerOfTwo:i_,setQuaternionFromProperEuler:r_,normalize:jt,denormalize:ir},mc=class mc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};mc.prototype.isVector2=!0;let $e=mc;class Ct{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3],d=s[a+0],f=s[a+1],p=s[a+2],_=s[a+3];if(u!==_||l!==d||c!==f||h!==p){let g=l*d+c*f+h*p+u*_;g<0&&(d=-d,f=-f,p=-p,_=-_,g=-g);let m=1-o;if(g<.9995){const S=Math.acos(g),M=Math.sin(S);m=Math.sin(m*S)/M,o=Math.sin(o*S)/M,l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+_*o}else{l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+_*o;const S=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=S,c*=S,h*=S,u*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=s[a],d=s[a+1],f=s[a+2],p=s[a+3];return e[t]=o*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-o*f,e[t+2]=c*p+h*f+o*d-l*u,e[t+3]=h*p-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),u=o(s/2),d=l(n/2),f=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Te("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const gc=class gc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=r+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qa.copy(this).projectOnVector(e),this.sub(qa)}reflect(e){return this.sub(qa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};gc.prototype.isVector3=!0;let D=gc;const qa=new D,cu=new Ct,_c=class _c{constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],_=r[0],g=r[3],m=r[6],S=r[1],M=r[4],T=r[7],C=r[2],w=r[5],R=r[8];return s[0]=a*_+o*S+l*C,s[3]=a*g+o*M+l*w,s[6]=a*m+o*T+l*R,s[1]=c*_+h*S+u*C,s[4]=c*g+h*M+u*w,s[7]=c*m+h*T+u*R,s[2]=d*_+f*S+p*C,s[5]=d*g+f*M+p*w,s[8]=d*m+f*T+p*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=u*_,e[1]=(r*c-h*n)*_,e[2]=(o*n-r*a)*_,e[3]=d*_,e[4]=(h*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ja.makeScale(e,t)),this}rotate(e){return this.premultiply(ja.makeRotation(-e)),this}translate(e,t){return this.premultiply(ja.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};_c.prototype.isMatrix3=!0;let Oe=_c;const ja=new Oe,uu=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hu=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function s_(){const i={enabled:!0,workingColorSpace:pa,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===nt&&(r.r=qn(r.r),r.g=qn(r.g),r.b=qn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===nt&&(r.r=dr(r.r),r.g=dr(r.g),r.b=dr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===li?ma:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return wl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return wl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[pa]:{primaries:e,whitePoint:n,transfer:ma,toXYZ:uu,fromXYZ:hu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ht},outputColorSpaceConfig:{drawingBufferColorSpace:ht}},[ht]:{primaries:e,whitePoint:n,transfer:nt,toXYZ:uu,fromXYZ:hu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ht}}}),i}const Be=s_();function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function dr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let zi;class a_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{zi===void 0&&(zi=Kr("canvas")),zi.width=e.width,zi.height=e.height;const r=zi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=zi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Kr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=qn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(qn(t[n]/255)*255):t[n]=qn(t[n]);return{data:t,width:e.width,height:e.height}}else return Te("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let o_=0;class Ql{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:o_++}),this.uuid=mi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ka(r[a].image)):s.push(Ka(r[a]))}else s=Ka(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ka(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?a_.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Te("Texture: Unable to serialize Texture."),{})}let l_=0;const $a=new D;class Ft extends pi{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,n=vn,r=vn,s=Wt,a=Ei,o=hn,l=sn,c=Ft.DEFAULT_ANISOTROPY,h=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:l_++}),this.uuid=mi(),this.name="",this.source=new Ql(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($a).x}get height(){return this.source.getSize($a).y}get depth(){return this.source.getSize($a).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Te(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Te(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==dd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wr:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case qo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wr:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case qo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=dd;Ft.DEFAULT_ANISOTROPY=1;const vc=class vc{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,T=(f+1)/2,C=(m+1)/2,w=(h+d)/4,R=(u+_)/4,x=(p+g)/4;return M>T&&M>C?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=w/n,s=R/n):T>C?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=w/r,s=x/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=R/s,r=x/s),this.set(n,r,s,t),this}let S=Math.sqrt((g-p)*(g-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(g-p)/S,this.y=(u-_)/S,this.z=(d-h)/S,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};vc.prototype.isVector4=!0;let et=vc;class c_ extends pi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Ft(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ql(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ln extends c_{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class bd extends Ft{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class u_ extends Ft{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const va=class va{constructor(e,t,n,r,s,a,o,l,c,h,u,d,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,u,d,f,p,_,g)}set(e,t,n,r,s,a,o,l,c,h,u,d,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new va().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Gi.setFromMatrixColumn(e,0).length(),s=1/Gi.setFromMatrixColumn(e,1).length(),a=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,f=a*u,p=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d+_*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,p=o*h,_=o*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(h_,e,d_)}lookAt(e,t,n){const r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),ti.crossVectors(n,nn),ti.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),ti.crossVectors(n,nn)),ti.normalize(),vs.crossVectors(nn,ti),r[0]=ti.x,r[4]=vs.x,r[8]=nn.x,r[1]=ti.y,r[5]=vs.y,r[9]=nn.y,r[2]=ti.z,r[6]=vs.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],S=n[3],M=n[7],T=n[11],C=n[15],w=r[0],R=r[4],x=r[8],E=r[12],P=r[1],A=r[5],N=r[9],H=r[13],W=r[2],F=r[6],B=r[10],z=r[14],J=r[3],ee=r[7],le=r[11],xe=r[15];return s[0]=a*w+o*P+l*W+c*J,s[4]=a*R+o*A+l*F+c*ee,s[8]=a*x+o*N+l*B+c*le,s[12]=a*E+o*H+l*z+c*xe,s[1]=h*w+u*P+d*W+f*J,s[5]=h*R+u*A+d*F+f*ee,s[9]=h*x+u*N+d*B+f*le,s[13]=h*E+u*H+d*z+f*xe,s[2]=p*w+_*P+g*W+m*J,s[6]=p*R+_*A+g*F+m*ee,s[10]=p*x+_*N+g*B+m*le,s[14]=p*E+_*H+g*z+m*xe,s[3]=S*w+M*P+T*W+C*J,s[7]=S*R+M*A+T*F+C*ee,s[11]=S*x+M*N+T*B+C*le,s[15]=S*E+M*H+T*z+C*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],S=l*f-c*d,M=o*f-c*u,T=o*d-l*u,C=a*f-c*h,w=a*d-l*h,R=a*u-o*h;return t*(_*S-g*M+m*T)-n*(p*S-g*C+m*w)+r*(p*M-_*C+m*R)-s*(p*T-_*w+g*R)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],S=t*o-n*a,M=t*l-r*a,T=t*c-s*a,C=n*l-r*o,w=n*c-s*o,R=r*c-s*l,x=h*_-u*p,E=h*g-d*p,P=h*m-f*p,A=u*g-d*_,N=u*m-f*_,H=d*m-f*g,W=S*H-M*N+T*A+C*P-w*E+R*x;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/W;return e[0]=(o*H-l*N+c*A)*F,e[1]=(r*N-n*H-s*A)*F,e[2]=(_*R-g*w+m*C)*F,e[3]=(d*w-u*R-f*C)*F,e[4]=(l*P-a*H-c*E)*F,e[5]=(t*H-r*P+s*E)*F,e[6]=(g*T-p*R-m*M)*F,e[7]=(h*R-d*T+f*M)*F,e[8]=(a*N-o*P+c*x)*F,e[9]=(n*P-t*N-s*x)*F,e[10]=(p*w-_*T+m*S)*F,e[11]=(u*T-h*w-f*S)*F,e[12]=(o*E-a*A-l*x)*F,e[13]=(t*A-n*E+r*x)*F,e[14]=(_*M-p*C-g*S)*F,e[15]=(h*C-u*M+d*S)*F,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,p=s*u,_=a*h,g=a*u,m=o*u,S=l*c,M=l*h,T=l*u,C=n.x,w=n.y,R=n.z;return r[0]=(1-(_+m))*C,r[1]=(f+T)*C,r[2]=(p-M)*C,r[3]=0,r[4]=(f-T)*w,r[5]=(1-(d+m))*w,r[6]=(g+S)*w,r[7]=0,r[8]=(p+M)*R,r[9]=(g-S)*R,r[10]=(1-(d+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Gi.set(r[0],r[1],r[2]).length();const o=Gi.set(r[4],r[5],r[6]).length(),l=Gi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),fn.copy(this);const c=1/a,h=1/o,u=1/l;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=u,fn.elements[9]*=u,fn.elements[10]*=u,t.setFromRotationMatrix(fn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=Rn,l=!1){const c=this.elements,h=2*s/(t-e),u=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r);let p,_;if(l)p=s/(a-s),_=a*s/(a-s);else if(o===Rn)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===jr)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Rn,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r);let p,_;if(l)p=1/(a-s),_=a/(a-s);else if(o===Rn)p=-2/(a-s),_=-(a+s)/(a-s);else if(o===jr)p=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};va.prototype.isMatrix4=!0;let Ee=va;const Gi=new D,fn=new Ee,h_=new D(0,0,0),d_=new D(1,1,1),ti=new D,vs=new D,nn=new D,du=new Ee,fu=new Ct;class kt{constructor(e=0,t=0,n=0,r=kt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Te("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return du.makeRotationFromQuaternion(e),this.setFromRotationMatrix(du,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fu.setFromEuler(this),this.setFromQuaternion(fu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kt.DEFAULT_ORDER="XYZ";class wd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let f_=0;const pu=new D,Hi=new Ct,kn=new Ee,xs=new D,Ar=new D,p_=new D,m_=new Ct,mu=new D(1,0,0),gu=new D(0,1,0),_u=new D(0,0,1),vu={type:"added"},g_={type:"removed"},Wi={type:"childadded",child:null},Za={type:"childremoved",child:null};class gt extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:f_++}),this.uuid=mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gt.DEFAULT_UP.clone();const e=new D,t=new kt,n=new Ct,r=new D(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ee},normalMatrix:{value:new Oe}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.premultiply(Hi),this}rotateX(e){return this.rotateOnAxis(mu,e)}rotateY(e){return this.rotateOnAxis(gu,e)}rotateZ(e){return this.rotateOnAxis(_u,e)}translateOnAxis(e,t){return pu.copy(e).applyQuaternion(this.quaternion),this.position.add(pu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(mu,e)}translateY(e){return this.translateOnAxis(gu,e)}translateZ(e){return this.translateOnAxis(_u,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xs.copy(e):xs.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Ar,xs,this.up):kn.lookAt(xs,Ar,this.up),this.quaternion.setFromRotationMatrix(kn),r&&(kn.extractRotation(r.matrixWorld),Hi.setFromRotationMatrix(kn),this.quaternion.premultiply(Hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Pe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vu),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null):Pe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(g_),Za.child=e,this.dispatchEvent(Za),Za.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vu),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,p_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,m_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=r,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}gt.DEFAULT_UP=new D(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class dn extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const __={type:"move"};class Ja{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(__)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new dn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Ed={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},Ss={h:0,s:0,l:0};function Qa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ue{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Be.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Be.workingColorSpace){return this.r=e,this.g=t,this.b=n,Be.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Be.workingColorSpace){if(e=Jl(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Qa(a,s,e+1/3),this.g=Qa(a,s,e),this.b=Qa(a,s,e-1/3)}return Be.colorSpaceToWorking(this,r),this}setStyle(e,t=ht){function n(s){s!==void 0&&parseFloat(s)<1&&Te("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Te("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Te("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ht){const n=Ed[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Te("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}copyLinearToSRGB(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ht){return Be.workingToColorSpace(Ht.copy(this),e),Math.round(qe(Ht.r*255,0,255))*65536+Math.round(qe(Ht.g*255,0,255))*256+Math.round(qe(Ht.b*255,0,255))}getHexString(e=ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Be.workingColorSpace){Be.workingToColorSpace(Ht.copy(this),t);const n=Ht.r,r=Ht.g,s=Ht.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Be.workingColorSpace){return Be.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=ht){Be.workingToColorSpace(Ht.copy(this),e);const t=Ht.r,n=Ht.g,r=Ht.b;return e!==ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ni),this.setHSL(ni.h+e,ni.s+t,ni.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ni),e.getHSL(Ss);const n=kr(ni.h,Ss.h,t),r=kr(ni.s,Ss.s,t),s=kr(ni.l,Ss.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new Ue;Ue.NAMES=Ed;class v_ extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kt,this.environmentIntensity=1,this.environmentRotation=new kt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const pn=new D,Vn=new D,eo=new D,zn=new D,Xi=new D,Yi=new D,xu=new D,to=new D,no=new D,io=new D,ro=new et,so=new et,ao=new et;class cn{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),pn.subVectors(e,t),r.cross(pn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){pn.subVectors(r,t),Vn.subVectors(n,t),eo.subVectors(e,t);const a=pn.dot(pn),o=pn.dot(Vn),l=pn.dot(eo),c=Vn.dot(Vn),h=Vn.dot(eo),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,zn.x),l.addScaledVector(a,zn.y),l.addScaledVector(o,zn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return ro.setScalar(0),so.setScalar(0),ao.setScalar(0),ro.fromBufferAttribute(e,t),so.fromBufferAttribute(e,n),ao.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ro,s.x),a.addScaledVector(so,s.y),a.addScaledVector(ao,s.z),a}static isFrontFacing(e,t,n,r){return pn.subVectors(n,t),Vn.subVectors(e,t),pn.cross(Vn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),pn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return cn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return cn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Xi.subVectors(r,n),Yi.subVectors(s,n),to.subVectors(e,n);const l=Xi.dot(to),c=Yi.dot(to);if(l<=0&&c<=0)return t.copy(n);no.subVectors(e,r);const h=Xi.dot(no),u=Yi.dot(no);if(h>=0&&u<=h)return t.copy(r);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Xi,a);io.subVectors(e,s);const f=Xi.dot(io),p=Yi.dot(io);if(p>=0&&f<=p)return t.copy(s);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Yi,o);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return xu.subVectors(s,r),o=(u-h)/(u-h+(f-p)),t.copy(r).addScaledVector(xu,o);const m=1/(g+_+d);return a=_*m,o=d*m,t.copy(n).addScaledVector(Xi,a).addScaledVector(Yi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class fi{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(s,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ys.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ys.copy(n.boundingBox)),ys.applyMatrix4(e.matrixWorld),this.union(ys)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cr),Ms.subVectors(this.max,Cr),qi.subVectors(e.a,Cr),ji.subVectors(e.b,Cr),Ki.subVectors(e.c,Cr),ii.subVectors(ji,qi),ri.subVectors(Ki,ji),vi.subVectors(qi,Ki);let t=[0,-ii.z,ii.y,0,-ri.z,ri.y,0,-vi.z,vi.y,ii.z,0,-ii.x,ri.z,0,-ri.x,vi.z,0,-vi.x,-ii.y,ii.x,0,-ri.y,ri.x,0,-vi.y,vi.x,0];return!oo(t,qi,ji,Ki,Ms)||(t=[1,0,0,0,1,0,0,0,1],!oo(t,qi,ji,Ki,Ms))?!1:(Ts.crossVectors(ii,ri),t=[Ts.x,Ts.y,Ts.z],oo(t,qi,ji,Ki,Ms))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Gn=[new D,new D,new D,new D,new D,new D,new D,new D],mn=new D,ys=new fi,qi=new D,ji=new D,Ki=new D,ii=new D,ri=new D,vi=new D,Cr=new D,Ms=new D,Ts=new D,xi=new D;function oo(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){xi.fromArray(i,s);const o=r.x*Math.abs(xi.x)+r.y*Math.abs(xi.y)+r.z*Math.abs(xi.z),l=e.dot(xi),c=t.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const At=new D,bs=new $e;let x_=0;class Dn extends pi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:x_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ru,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bs.fromBufferAttribute(this,t),bs.applyMatrix3(e),this.setXY(t,bs.x,bs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ir(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=jt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ir(t,this.array)),t}setX(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ir(t,this.array)),t}setY(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ir(t,this.array)),t}setZ(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ir(t,this.array)),t}setW(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array),r=jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array),r=jt(r,this.array),s=jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ru&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class ec extends Dn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ad extends Dn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class mt extends Dn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const S_=new fi,Rr=new D,lo=new D;class yr{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):S_.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rr.subVectors(e,this.center);const t=Rr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Rr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rr.copy(e.center).add(lo)),this.expandByPoint(Rr.copy(e.center).sub(lo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let y_=0;const ln=new Ee,co=new gt,$i=new D,rn=new fi,Ir=new fi,Nt=new D;class Xt extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:y_++}),this.uuid=mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(k0(e)?Ad:ec)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Oe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return co.lookAt(e),co.updateMatrix(),this.applyMatrix4(co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new mt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Te("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];rn.setFromBufferAttribute(s),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ir.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(rn.min,Ir.min),rn.expandByPoint(Nt),Nt.addVectors(rn.max,Ir.max),rn.expandByPoint(Nt)):(rn.expandByPoint(Ir.min),rn.expandByPoint(Ir.max))}rn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Nt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Nt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Nt.fromBufferAttribute(o,c),l&&($i.fromBufferAttribute(e,c),Nt.add($i)),r=Math.max(r,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Pe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Pe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Dn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new D,l[x]=new D;const c=new D,h=new D,u=new D,d=new $e,f=new $e,p=new $e,_=new D,g=new D;function m(x,E,P){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,P),d.fromBufferAttribute(s,x),f.fromBufferAttribute(s,E),p.fromBufferAttribute(s,P),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const A=1/(f.x*p.y-p.x*f.y);isFinite(A)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(A),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(A),o[x].add(_),o[E].add(_),o[P].add(_),l[x].add(g),l[E].add(g),l[P].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let x=0,E=S.length;x<E;++x){const P=S[x],A=P.start,N=P.count;for(let H=A,W=A+N;H<W;H+=3)m(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const M=new D,T=new D,C=new D,w=new D;function R(x){C.fromBufferAttribute(r,x),w.copy(C);const E=o[x];M.copy(E),M.sub(C.multiplyScalar(C.dot(E))).normalize(),T.crossVectors(w,E);const A=T.dot(l[x])<0?-1:1;a.setXYZW(x,M.x,M.y,M.z,A)}for(let x=0,E=S.length;x<E;++x){const P=S[x],A=P.start,N=P.count;for(let H=A,W=A+N;H<W;H+=3)R(e.getX(H+0)),R(e.getX(H+1)),R(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Dn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const r=new D,s=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new Dn(d,h,u)}if(this.index===null)return Te("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let M_=0;class gi extends pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:M_++}),this.uuid=mi(),this.name="",this.type="Material",this.blending=ur,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bo,this.blendDst=ko,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=iu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Te(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Te(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Bo&&(n.blendSrc=this.blendSrc),this.blendDst!==ko&&(n.blendDst=this.blendDst),this.blendEquation!==Ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==mr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==iu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Hn=new D,uo=new D,ws=new D,si=new D,ho=new D,Es=new D,fo=new D;class tc{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hn.copy(this.origin).addScaledVector(this.direction,t),Hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){uo.copy(e).add(t).multiplyScalar(.5),ws.copy(t).sub(e).normalize(),si.copy(this.origin).sub(uo);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ws),o=si.dot(this.direction),l=-si.dot(ws),c=si.lengthSq(),h=Math.abs(1-a*a);let u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=s*h,u>=0)if(d>=-p)if(d<=p){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(uo).addScaledVector(ws,d),f}intersectSphere(e,t){Hn.subVectors(e.center,this.origin);const n=Hn.dot(this.direction),r=Hn.dot(Hn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Hn)!==null}intersectTriangle(e,t,n,r,s){ho.subVectors(t,e),Es.subVectors(n,e),fo.crossVectors(ho,Es);let a=this.direction.dot(fo),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;si.subVectors(this.origin,e);const l=o*this.direction.dot(Es.crossVectors(si,Es));if(l<0)return null;const c=o*this.direction.dot(ho.cross(si));if(c<0||l+c>a)return null;const h=-o*si.dot(fo);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class as extends gi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kt,this.combine=Ca,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Su=new Ee,Si=new tc,As=new yr,yu=new D,Cs=new D,Rs=new D,Is=new D,po=new D,Ps=new D,Mu=new D,Ls=new D;class Mt extends gt{constructor(e=new Xt,t=new as){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ps.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(po.fromBufferAttribute(u,e),a?Ps.addScaledVector(po,h):Ps.addScaledVector(po.sub(t),h))}t.add(Ps)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),As.copy(n.boundingSphere),As.applyMatrix4(s),Si.copy(e.ray).recast(e.near),!(As.containsPoint(Si.origin)===!1&&(Si.intersectSphere(As,yu)===null||Si.origin.distanceToSquared(yu)>(e.far-e.near)**2))&&(Su.copy(s).invert(),Si.copy(e.ray).applyMatrix4(Su),!(n.boundingBox!==null&&Si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Si)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a[g.materialIndex],S=Math.max(g.start,f.start),M=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let T=S,C=M;T<C;T+=3){const w=o.getX(T),R=o.getX(T+1),x=o.getX(T+2);r=Ds(this,m,e,n,c,h,u,w,R,x),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const S=o.getX(g),M=o.getX(g+1),T=o.getX(g+2);r=Ds(this,a,e,n,c,h,u,S,M,T),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a[g.materialIndex],S=Math.max(g.start,f.start),M=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let T=S,C=M;T<C;T+=3){const w=T,R=T+1,x=T+2;r=Ds(this,m,e,n,c,h,u,w,R,x),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const S=g,M=g+1,T=g+2;r=Ds(this,a,e,n,c,h,u,S,M,T),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function T_(i,e,t,n,r,s,a,o){let l;if(e.side===Qt?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===di,o),l===null)return null;Ls.copy(o),Ls.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ls);return c<t.near||c>t.far?null:{distance:c,point:Ls.clone(),object:i}}function Ds(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Cs),i.getVertexPosition(l,Rs),i.getVertexPosition(c,Is);const h=T_(i,e,t,n,Cs,Rs,Is,Mu);if(h){const u=new D;cn.getBarycoord(Mu,Cs,Rs,Is,u),r&&(h.uv=cn.getInterpolatedAttribute(r,o,l,c,u,new $e)),s&&(h.uv1=cn.getInterpolatedAttribute(s,o,l,c,u,new $e)),a&&(h.normal=cn.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new D,materialIndex:0};cn.getNormal(Cs,Rs,Is,d.normal),h.face=d,h.barycoord=u}return h}const Pr=new et,Tu=new et,bu=new et,b_=new et,wu=new Ee,Us=new D,mo=new yr,Eu=new Ee,go=new tc;class w_ extends Mt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=tu,this.bindMatrix=new Ee,this.bindMatrixInverse=new Ee,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new fi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Us),this.boundingBox.expandByPoint(Us)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Us),this.boundingSphere.expandByPoint(Us)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mo.copy(this.boundingSphere),mo.applyMatrix4(r),e.ray.intersectsSphere(mo)!==!1&&(Eu.copy(r).invert(),go.copy(e.ray).applyMatrix4(Eu),!(this.boundingBox!==null&&go.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,go)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new et,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===tu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===A0?this.bindMatrixInverse.copy(this.bindMatrix).invert():Te("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;Tu.fromBufferAttribute(r.attributes.skinIndex,e),bu.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(Pr.copy(t),t.set(0,0,0,0)):(Pr.set(...t,1),t.set(0,0,0)),Pr.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=bu.getComponent(s);if(a!==0){const o=Tu.getComponent(s);wu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(b_.copy(Pr).applyMatrix4(wu),a)}}return t.isVector4&&(t.w=Pr.w),t.applyMatrix4(this.bindMatrixInverse)}}class $r extends gt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Cd extends Ft{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Vt,h=Vt,u,d){super(null,a,o,l,c,h,r,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Au=new Ee,E_=new Ee;class nc{constructor(e=[],t=[]){this.uuid=mi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Te("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Ee)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ee;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:E_;Au.multiplyMatrices(o,t[s]),Au.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new nc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Cd(t,e,e,hn,xn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let a=t[s];a===void 0&&(Te("Skeleton: No bone found with UUID:",s),a=new $r),this.bones.push(a),this.boneInverses.push(new Ee().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const a=t[r];e.bones.push(a.uuid);const o=n[r];e.boneInverses.push(o.toArray())}return e}}const _o=new D,A_=new D,C_=new Oe;class Mi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=_o.subVectors(n,t).cross(A_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(_o),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||C_.getNormalMatrix(e),r=this.coplanarPoint(_o).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yi=new yr,R_=new $e(.5,.5),Ns=new D;class ic{constructor(e=new Mi,t=new Mi,n=new Mi,r=new Mi,s=new Mi,a=new Mi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],p=s[8],_=s[9],g=s[10],m=s[11],S=s[12],M=s[13],T=s[14],C=s[15];if(r[0].setComponents(c-a,f-h,m-p,C-S).normalize(),r[1].setComponents(c+a,f+h,m+p,C+S).normalize(),r[2].setComponents(c+o,f+u,m+_,C+M).normalize(),r[3].setComponents(c-o,f-u,m-_,C-M).normalize(),n)r[4].setComponents(l,d,g,T).normalize(),r[5].setComponents(c-l,f-d,m-g,C-T).normalize();else if(r[4].setComponents(c-l,f-d,m-g,C-T).normalize(),t===Rn)r[5].setComponents(c+l,f+d,m+g,C+T).normalize();else if(t===jr)r[5].setComponents(l,d,g,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(e){yi.center.set(0,0,0);const t=R_.distanceTo(e.center);return yi.radius=.7071067811865476+t,yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Ns.x=r.normal.x>0?e.max.x:e.min.x,Ns.y=r.normal.y>0?e.max.y:e.min.y,Ns.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ns)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class rc extends gi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ga=new D,_a=new D,Cu=new Ee,Lr=new tc,Fs=new yr,vo=new D,Ru=new D;class Rd extends gt{constructor(e=new Xt,t=new rc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)ga.fromBufferAttribute(t,r-1),_a.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=ga.distanceTo(_a);e.setAttribute("lineDistance",new mt(n,1))}else Te("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fs.copy(n.boundingSphere),Fs.applyMatrix4(r),Fs.radius+=s,e.ray.intersectsSphere(Fs)===!1)return;Cu.copy(r).invert(),Lr.copy(e.ray).applyMatrix4(Cu);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){const m=h.getX(_),S=h.getX(_+1),M=Os(this,e,Lr,l,m,S,_);M&&t.push(M)}if(this.isLineLoop){const _=h.getX(p-1),g=h.getX(f),m=Os(this,e,Lr,l,_,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){const m=Os(this,e,Lr,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=Os(this,e,Lr,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Os(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(ga.fromBufferAttribute(o,r),_a.fromBufferAttribute(o,s),t.distanceSqToSegment(ga,_a,vo,Ru)>n)return;vo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(vo);if(!(c<e.near||c>e.far))return{distance:c,point:Ru.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Iu=new D,Pu=new D;class Id extends Rd{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Iu.fromBufferAttribute(t,r),Pu.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Iu.distanceTo(Pu);e.setAttribute("lineDistance",new mt(n,1))}else Te("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Pd extends Ft{constructor(e=[],t=Ii,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class vr extends Ft{constructor(e,t,n=Nn,r,s,a,o=Vt,l=Vt,c,h=Kn,u=1){if(h!==Kn&&h!==Ai)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ql(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class I_ extends vr{constructor(e,t=Nn,n=Ii,r,s,a=Vt,o=Vt,l,c=Kn){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ld extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class $n extends Xt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,r,a,2),p("x","z","y",1,-1,e,n,-t,r,a,3),p("x","y","z",1,-1,e,t,n,r,s,4),p("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(u,2));function p(_,g,m,S,M,T,C,w,R,x,E){const P=T/R,A=C/x,N=T/2,H=C/2,W=w/2,F=R+1,B=x+1;let z=0,J=0;const ee=new D;for(let le=0;le<B;le++){const xe=le*A-H;for(let Se=0;Se<F;Se++){const He=Se*P-N;ee[_]=He*S,ee[g]=xe*M,ee[m]=W,c.push(ee.x,ee.y,ee.z),ee[_]=0,ee[g]=0,ee[m]=w>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(Se/R),u.push(1-le/x),z+=1}}for(let le=0;le<x;le++)for(let xe=0;xe<R;xe++){const Se=d+xe+F*le,He=d+xe+F*(le+1),tt=d+(xe+1)+F*(le+1),De=d+(xe+1)+F*le;l.push(Se,He,De),l.push(He,tt,De),J+=6}o.addGroup(f,J,E),f+=J,d+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Fn extends Xt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],d=[],f=[];let p=0;const _=[],g=n/2;let m=0;S(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new mt(u,3)),this.setAttribute("normal",new mt(d,3)),this.setAttribute("uv",new mt(f,2));function S(){const T=new D,C=new D;let w=0;const R=(t-e)/n;for(let x=0;x<=s;x++){const E=[],P=x/s,A=P*(t-e)+e;for(let N=0;N<=r;N++){const H=N/r,W=H*l+o,F=Math.sin(W),B=Math.cos(W);C.x=A*F,C.y=-P*n+g,C.z=A*B,u.push(C.x,C.y,C.z),T.set(F,R,B).normalize(),d.push(T.x,T.y,T.z),f.push(H,1-P),E.push(p++)}_.push(E)}for(let x=0;x<r;x++)for(let E=0;E<s;E++){const P=_[E][x],A=_[E+1][x],N=_[E+1][x+1],H=_[E][x+1];(e>0||E!==0)&&(h.push(P,A,H),w+=3),(t>0||E!==s-1)&&(h.push(A,N,H),w+=3)}c.addGroup(m,w,0),m+=w}function M(T){const C=p,w=new $e,R=new D;let x=0;const E=T===!0?e:t,P=T===!0?1:-1;for(let N=1;N<=r;N++)u.push(0,g*P,0),d.push(0,P,0),f.push(.5,.5),p++;const A=p;for(let N=0;N<=r;N++){const W=N/r*l+o,F=Math.cos(W),B=Math.sin(W);R.x=E*B,R.y=g*P,R.z=E*F,u.push(R.x,R.y,R.z),d.push(0,P,0),w.x=F*.5+.5,w.y=B*.5*P+.5,f.push(w.x,w.y),p++}for(let N=0;N<r;N++){const H=C+N,W=A+N;T===!0?h.push(W,W+1,H):h.push(W+1,W,H),x+=3}c.addGroup(m,x,T===!0?1:2),m+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class sc extends Fn{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new sc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Bs=new D,ks=new D,xo=new D,Vs=new cn;class P_ extends Xt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(hr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:_,b:g,c:m}=Vs;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),Vs.getNormal(xo),u[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,u[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,u[2]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let S=0;S<3;S++){const M=(S+1)%3,T=u[S],C=u[M],w=Vs[h[S]],R=Vs[h[M]],x=`${T}_${C}`,E=`${C}_${T}`;E in d&&d[E]?(xo.dot(d[E].normal)<=s&&(f.push(w.x,w.y,w.z),f.push(R.x,R.y,R.z)),d[E]=null):x in d||(d[x]={index0:c[S],index1:c[M],normal:xo.clone()})}}for(const p in d)if(d[p]){const{index0:_,index1:g}=d[p];Bs.fromBufferAttribute(o,_),ks.fromBufferAttribute(o,g),f.push(Bs.x,Bs.y,Bs.z),f.push(ks.x,ks.y,ks.z)}this.setAttribute("position",new mt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class L_{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Te("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let r=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);const h=n[r],d=n[r+1]-h,f=(a-h)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new $e:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new D,r=[],s=[],a=[],o=new D,l=new Ee;for(let f=0;f<=e;f++){const p=f/e;r[f]=this.getTangentAt(p,new D)}s[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(qe(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(qe(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],f*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function D_(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=Dd(i,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=B_(i,e,s,t)),i.length>80*t){o=i[0],l=i[1];let h=o,u=l;for(let d=t;d<r;d+=t){const f=i[d],p=i[d+1];f<o&&(o=f),p<l&&(l=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Zr(s,a,t,o,l,c,0),a}function Dd(i,e,t,n,r){let s;if(r===K_(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=Lu(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Lu(a/n|0,i[a],i[a+1],s);return s&&xr(s,s.next)&&(Qr(s),s=s.next),s}function Li(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(xr(t,t.next)||vt(t.prev,t,t.next)===0)){if(Qr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Zr(i,e,t,n,r,s,a){if(!i)return;!a&&s&&H_(i,n,r,s);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(s?N_(i,n,r,s):U_(i)){e.push(l.i,i.i,c.i),Qr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=F_(Li(i),e),Zr(i,e,t,n,r,s,2)):a===2&&O_(i,e,t,n,r,s):Zr(Li(i),e,t,n,r,s,1);break}}}function U_(i){const e=i.prev,t=i,n=i.next;if(vt(e,t,n)>=0)return!1;const r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(r,s,a),u=Math.min(o,l,c),d=Math.max(r,s,a),f=Math.max(o,l,c);let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Or(r,o,s,l,a,c,p.x,p.y)&&vt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function N_(i,e,t,n){const r=i.prev,s=i,a=i.next;if(vt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,h=r.y,u=s.y,d=a.y,f=Math.min(o,l,c),p=Math.min(h,u,d),_=Math.max(o,l,c),g=Math.max(h,u,d),m=El(f,p,e,t,n),S=El(_,g,e,t,n);let M=i.prevZ,T=i.nextZ;for(;M&&M.z>=m&&T&&T.z<=S;){if(M.x>=f&&M.x<=_&&M.y>=p&&M.y<=g&&M!==r&&M!==a&&Or(o,h,l,u,c,d,M.x,M.y)&&vt(M.prev,M,M.next)>=0||(M=M.prevZ,T.x>=f&&T.x<=_&&T.y>=p&&T.y<=g&&T!==r&&T!==a&&Or(o,h,l,u,c,d,T.x,T.y)&&vt(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;M&&M.z>=m;){if(M.x>=f&&M.x<=_&&M.y>=p&&M.y<=g&&M!==r&&M!==a&&Or(o,h,l,u,c,d,M.x,M.y)&&vt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;T&&T.z<=S;){if(T.x>=f&&T.x<=_&&T.y>=p&&T.y<=g&&T!==r&&T!==a&&Or(o,h,l,u,c,d,T.x,T.y)&&vt(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function F_(i,e){let t=i;do{const n=t.prev,r=t.next.next;!xr(n,r)&&Nd(n,t,t.next,r)&&Jr(n,r)&&Jr(r,n)&&(e.push(n.i,t.i,r.i),Qr(t),Qr(t.next),t=i=r),t=t.next}while(t!==i);return Li(t)}function O_(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Y_(a,o)){let l=Fd(a,o);a=Li(a,a.next),l=Li(l,l.next),Zr(a,e,t,n,r,s,0),Zr(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function B_(i,e,t,n){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=Dd(i,o,l,n,!1);c===c.next&&(c.steiner=!0),r.push(X_(c))}r.sort(k_);for(let s=0;s<r.length;s++)t=V_(r[s],t);return t}function k_(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function V_(i,e){const t=z_(i,e);if(!t)return e;const n=Fd(t,i);return Li(n,n.next),Li(t,t.next)}function z_(i,e){let t=e;const n=i.x,r=i.y;let s=-1/0,a;if(xr(i,t))return t;do{if(xr(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const u=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>s&&(s=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Ud(r<c?n:s,r,l,c,r<c?s:n,r,t.x,t.y)){const u=Math.abs(r-t.y)/(n-t.x);Jr(t,i)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&G_(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function G_(i,e){return vt(i.prev,i,e.prev)<0&&vt(e.next,i,i.next)<0}function H_(i,e,t,n){let r=i;do r.z===0&&(r.z=El(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,W_(r)}function W_(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(r=n,n=n.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=a}s.nextZ=null,t*=2}while(e>1);return i}function El(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function X_(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Ud(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Or(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Ud(i,e,t,n,r,s,a,o)}function Y_(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!q_(i,e)&&(Jr(i,e)&&Jr(e,i)&&j_(i,e)&&(vt(i.prev,i,e.prev)||vt(i,e.prev,e))||xr(i,e)&&vt(i.prev,i,i.next)>0&&vt(e.prev,e,e.next)>0)}function vt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function xr(i,e){return i.x===e.x&&i.y===e.y}function Nd(i,e,t,n){const r=Gs(vt(i,e,t)),s=Gs(vt(i,e,n)),a=Gs(vt(t,n,i)),o=Gs(vt(t,n,e));return!!(r!==s&&a!==o||r===0&&zs(i,t,e)||s===0&&zs(i,n,e)||a===0&&zs(t,i,n)||o===0&&zs(t,e,n))}function zs(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Gs(i){return i>0?1:i<0?-1:0}function q_(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Nd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Jr(i,e){return vt(i.prev,i,i.next)<0?vt(i,e,i.next)>=0&&vt(i,i.prev,e)>=0:vt(i,e,i.prev)<0||vt(i,i.next,e)<0}function j_(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Fd(i,e){const t=Al(i.i,i.x,i.y),n=Al(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Lu(i,e,t,n){const r=Al(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Qr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Al(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function K_(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}class $_{static triangulate(e,t,n=2){return D_(e,t,n)}}class ac{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return ac.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];Du(e),Uu(n,e);let a=e.length;t.forEach(Du);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Uu(n,t[l]);const o=$_.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Du(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Uu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Mr extends Xt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,u=e/o,d=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const S=m*d-a;for(let M=0;M<c;M++){const T=M*u-s;p.push(T,-S,0),_.push(0,0,1),g.push(M/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){const M=S+c*m,T=S+c*(m+1),C=S+1+c*(m+1),w=S+1+c*m;f.push(M,T,w),f.push(T,C,w)}this.setIndex(f),this.setAttribute("position",new mt(p,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Tr extends Xt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new D,d=new D,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const S=[],M=m/n;let T=0;m===0&&a===0?T=.5/t:m===n&&l===Math.PI&&(T=-.5/t);for(let C=0;C<=t;C++){const w=C/t;u.x=-e*Math.cos(r+w*s)*Math.sin(a+M*o),u.y=e*Math.cos(a+M*o),u.z=e*Math.sin(r+w*s)*Math.sin(a+M*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(w+T,1-M),S.push(c++)}h.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){const M=h[m][S+1],T=h[m][S],C=h[m+1][S],w=h[m+1][S+1];(m!==0||a>0)&&f.push(M,T,w),(m!==n-1||l<Math.PI)&&f.push(T,C,w)}this.setIndex(f),this.setAttribute("position",new mt(p,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Sr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(Nu(r))r.isRenderTargetTexture?(Te("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Nu(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Kt(i){const e={};for(let t=0;t<i.length;t++){const n=Sr(i[t]);for(const r in n)e[r]=n[r]}return e}function Nu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Z_(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Od(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Be.workingColorSpace}const J_={clone:Sr,merge:Kt};var Q_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ev=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class On extends gi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Q_,this.fragmentShader=ev,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Sr(e.uniforms),this.uniformsGroups=Z_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class tv extends On{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class os extends gi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qr,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hs extends gi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ue(16777215),this.specular=new Ue(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qr,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kt,this.combine=Ca,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class nv extends gi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qr,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kt,this.combine=Ca,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class iv extends gi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=P0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class rv extends gi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Ci(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Bd(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Cl(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)r[a++]=i[o+l]}return r}function oc(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=i[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=i[r++];while(s!==void 0)}function sv(i,e,t,n,r=30){const s=i.clone();s.name=e;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*r;if(!(p<t||p>=n)){u.push(c.times[f]);for(let _=0;_<h;++_)d.push(c.values[f*h+_])}}u.length!==0&&(c.times=Ci(u,c.times.constructor),c.values=Ci(d,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function av(i,e=0,t=i,n=30){n<=0&&(n=30);const r=t.tracks.length,s=e/n;for(let a=0;a<r;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=i.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const p=o.times.length-1;let _;if(s<=o.times[0]){const m=h,S=u-h;_=o.values.slice(m,S)}else if(s>=o.times[p]){const m=p*u+h,S=m+u-h;_=o.values.slice(m,S)}else{const m=o.createInterpolant(),S=h,M=u-h;m.evaluate(s),_=m.resultBuffer.slice(S,M)}l==="quaternion"&&new Ct().fromArray(_).normalize().conjugate().toArray(_);const g=c.times.length;for(let m=0;m<g;++m){const S=m*f+d;if(l==="quaternion")Ct.multiplyQuaternionsFlat(c.values,S,_,0,c.values,S);else{const M=f-d*2;for(let T=0;T<M;++T)c.values[S+T]-=_[T]}}}return i.blendMode=yd,i}class ov{static convertArray(e,t){return Ci(e,t)}static isTypedArray(e){return Md(e)}static getKeyframeOrder(e){return Bd(e)}static sortedArray(e,t,n){return Cl(e,t,n)}static flattenJSON(e,t,n,r){oc(e,t,n,r)}static subclip(e,t,n,r,s=30){return sv(e,t,n,r,s)}static makeClipAdditive(e,t=0,n=e,r=30){return av(e,t,n,r)}}class ls{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class lv extends ls{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sr,endingEnd:sr}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case ar:s=e,o=2*t-n;break;case fa:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ar:a=e,l=2*n-t;break;case fa:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),_=p*p,g=_*p,m=-d*g+2*d*_-d*p,S=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*p+1,M=(-1-f)*g+(1.5+f)*_+.5*p,T=f*g-f*_;for(let C=0;C!==o;++C)s[C]=m*a[h+C]+S*a[c+C]+M*a[l+C]+T*a[u+C];return s}}class kd extends ls{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}}class cv extends ls{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class uv extends ls{interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.settings||this.DefaultSettings_,u=h.inTangents,d=h.outTangents;if(!u||!d){const _=(n-t)/(r-t),g=1-_;for(let m=0;m!==o;++m)s[m]=a[c+m]*g+a[l+m]*_;return s}const f=o*2,p=e-1;for(let _=0;_!==o;++_){const g=a[c+_],m=a[l+_],S=p*f+_*2,M=d[S],T=d[S+1],C=e*f+_*2,w=u[C],R=u[C+1];let x=(n-t)/(r-t),E,P,A,N,H;for(let W=0;W<8;W++){E=x*x,P=E*x,A=1-x,N=A*A,H=N*A;const B=H*t+3*N*x*M+3*A*E*w+P*r-n;if(Math.abs(B)<1e-10)break;const z=3*N*(M-t)+6*A*x*(w-M)+3*E*(r-w);if(Math.abs(z)<1e-10)break;x=x-B/z,x=Math.max(0,Math.min(1,x))}s[_]=H*g+3*N*x*T+3*A*E*R+P*m}return s}}class Sn{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ci(t,this.TimeBufferType),this.values=Ci(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ci(e.times,Array),values:Ci(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new cv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new kd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new lv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new uv(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case da:t=this.InterpolantFactoryMethodDiscrete;break;case bl:t=this.InterpolantFactoryMethodLinear;break;case Ya:t=this.InterpolantFactoryMethodSmooth;break;case nu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Te("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return da;case this.InterpolantFactoryMethodLinear:return bl;case this.InterpolantFactoryMethodSmooth:return Ya;case this.InterpolantFactoryMethodBezier:return nu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Pe("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(Pe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Pe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Pe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&Md(r))for(let o=0,l=r.length;o!==l;++o){const c=r[o];if(isNaN(c)){Pe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ya,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(r)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const _=t[u+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Sn.prototype.ValueTypeName="";Sn.prototype.TimeBufferType=Float32Array;Sn.prototype.ValueBufferType=Float32Array;Sn.prototype.DefaultInterpolation=bl;class br extends Sn{constructor(e,t,n){super(e,t,n)}}br.prototype.ValueTypeName="bool";br.prototype.ValueBufferType=Array;br.prototype.DefaultInterpolation=da;br.prototype.InterpolantFactoryMethodLinear=void 0;br.prototype.InterpolantFactoryMethodSmooth=void 0;class Vd extends Sn{constructor(e,t,n,r){super(e,t,n,r)}}Vd.prototype.ValueTypeName="color";class es extends Sn{constructor(e,t,n,r){super(e,t,n,r)}}es.prototype.ValueTypeName="number";class hv extends ls{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Ct.slerpFlat(s,0,a,c-o,a,c,l);return s}}class cs extends Sn{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new hv(this.times,this.values,this.getValueSize(),e)}}cs.prototype.ValueTypeName="quaternion";cs.prototype.InterpolantFactoryMethodSmooth=void 0;class wr extends Sn{constructor(e,t,n){super(e,t,n)}}wr.prototype.ValueTypeName="string";wr.prototype.ValueBufferType=Array;wr.prototype.DefaultInterpolation=da;wr.prototype.InterpolantFactoryMethodLinear=void 0;wr.prototype.InterpolantFactoryMethodSmooth=void 0;class ts extends Sn{constructor(e,t,n,r){super(e,t,n,r)}}ts.prototype.ValueTypeName="vector";class Rl{constructor(e="",t=-1,n=[],r=Kl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=mi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(fv(n[a]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Sn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=Bd(l);l=Cl(l,1,h),c=Cl(c,1,h),!r&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new es(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=r[u];d||(r[u]=d=[]),d.push(c)}}const a=[];for(const o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,n));return a}static parseAnimation(e,t){if(Te("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Pe("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,p,_){if(f.length!==0){const g=[],m=[];oc(f,g,m,p),g.length!==0&&_.push(new u(d,g,m))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let S=0;S!==d[p].morphTargets.length;++S){const M=d[p];g.push(M.time),m.push(M.morphTarget===_?1:0)}r.push(new es(".morphTargetInfluence["+_+"]",g,m))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(ts,f+".position",d,"pos",r),n(cs,f+".quaternion",d,"rot",r),n(ts,f+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function dv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return es;case"vector":case"vector2":case"vector3":case"vector4":return ts;case"color":return Vd;case"quaternion":return cs;case"bool":case"boolean":return br;case"string":return wr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function fv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=dv(i.type);if(i.times===void 0){const t=[],n=[];oc(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Vr={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Fu(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Fu(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Fu(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class pv{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const mv=new pv;class Di{constructor(e){this.manager=e!==void 0?e:mv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Di.DEFAULT_MATERIAL_NAME="__DEFAULT";const Wn={};class gv extends Error{constructor(e,t){super(e),this.response=t}}class _v extends Di{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Vr.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Wn[e]!==void 0){Wn[e].push({onLoad:t,onProgress:n,onError:r});return}Wn[e]=[],Wn[e].push({onLoad:t,onProgress:n,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Te("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Wn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){S();function S(){u.read().then(({done:M,value:T})=>{if(M)m.close();else{_+=T.byteLength;const C=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let w=0,R=h.length;w<R;w++){const x=h[w];x.onProgress&&x.onProgress(C)}m.enqueue(T),S()}},M=>{m.error(M)})}}});return new Response(g)}else throw new gv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Vr.add(`file:${e}`,c);const h=Wn[e];delete Wn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Wn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Wn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Zi=new WeakMap;class vv extends Di{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Vr.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Zi.get(a);u===void 0&&(u=[],Zi.set(a,u)),u.push({onLoad:t,onError:r})}return a}const o=Kr("img");function l(){h(),t&&t(this);const u=Zi.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}Zi.delete(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),Vr.remove(`image:${e}`);const d=Zi.get(this)||[];for(let f=0;f<d.length;f++){const p=d[f];p.onError&&p.onError(u)}Zi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Vr.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class zd extends Di{constructor(e){super(e)}load(e,t,n,r){const s=new Ft,a=new vv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class Ia extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const So=new Ee,Ou=new D,Bu=new D;class lc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new Ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ic,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ou.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ou),Bu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bu),t.updateMatrixWorld(),So.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(So,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===jr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(So)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ws=new D,Xs=new Ct,bn=new D;class Gd extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee,this.coordinateSystem=Rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ws,Xs,bn),bn.x===1&&bn.y===1&&bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ws,Xs,bn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ws,Xs,bn),bn.x===1&&bn.y===1&&bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ws,Xs,bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ai=new D,ku=new $e,Vu=new $e;class Jt extends Gd{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_r*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(hr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _r*2*Math.atan(Math.tan(hr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ai.x,ai.y).multiplyScalar(-e/ai.z),ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ai.x,ai.y).multiplyScalar(-e/ai.z)}getViewSize(e,t){return this.getViewBounds(e,ku,Vu),t.subVectors(Vu,ku)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(hr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class xv extends lc{constructor(){super(new Jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=_r*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Sv extends Ia{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new xv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class yv extends lc{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0}}class zu extends Ia{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new yv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Pa extends Gd{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Mv extends lc{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hd extends Ia{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new Mv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Wd extends Ia{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Tv{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Ji=-90,Qi=1;class bv extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Jt(Ji,Qi,e,t);r.layers=this.layers,this.add(r);const s=new Jt(Ji,Qi,e,t);s.layers=this.layers,this.add(s);const a=new Jt(Ji,Qi,e,t);a.layers=this.layers,this.add(a);const o=new Jt(Ji,Qi,e,t);o.layers=this.layers,this.add(o);const l=new Jt(Ji,Qi,e,t);l.layers=this.layers,this.add(l);const c=new Jt(Ji,Qi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===jr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class wv extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ev{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,s,a;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:r=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,r=this.valueSize,s=e*r+r;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==r;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,r)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,r=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,r,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,r);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let s=n,a=r;s!==a;++s)t[s]=t[r+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,s){if(r>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,r){Ct.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,s){const a=this._workIndex*s;Ct.multiplyQuaternionsFlat(e,a,e,t,e,n),Ct.slerpFlat(e,t,e,t,e,a,r)}_lerp(e,t,n,r,s){const a=1-r;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*r}}_lerpAdditive(e,t,n,r,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*r}}}const cc="\\[\\]\\.:\\/",Av=new RegExp("["+cc+"]","g"),uc="[^"+cc+"]",Cv="[^"+cc.replace("\\.","")+"]",Rv=/((?:WC+[\/:])*)/.source.replace("WC",uc),Iv=/(WCOD+)?/.source.replace("WCOD",Cv),Pv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uc),Lv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uc),Dv=new RegExp("^"+Rv+Iv+Pv+Lv+"$"),Uv=["material","materials","bones","map"];class Nv{constructor(e,t,n){const r=n||Je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Je{constructor(e,t,n){this.path=t,this.parsedPath=n||Je.parseTrackName(t),this.node=Je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Je.Composite(e,t,n):new Je(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Av,"")}static parseTrackName(e){const t=Dv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);Uv.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=Je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Te("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Pe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Pe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Pe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Pe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Pe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Pe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Pe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[r];if(a===void 0){const c=t.nodeName;Pe("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Pe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Pe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Je.Composite=Nv;Je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Je.prototype.GetterByBindingType=[Je.prototype._getValue_direct,Je.prototype._getValue_array,Je.prototype._getValue_arrayElement,Je.prototype._getValue_toArray];Je.prototype.SetterByBindingTypeAndVersioning=[[Je.prototype._setValue_direct,Je.prototype._setValue_direct_setNeedsUpdate,Je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_array,Je.prototype._setValue_array_setNeedsUpdate,Je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_arrayElement,Je.prototype._setValue_arrayElement_setNeedsUpdate,Je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_fromArray,Je.prototype._setValue_fromArray_setNeedsUpdate,Je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Fv{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:sr,endingEnd:sr};for(let c=0;c!==a;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings&&Object.assign(l,h.settings),h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Sd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const r=this._clip.duration,s=e._clip.duration,a=s/r,o=r/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const r=this._mixer,s=r.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=r._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case yd:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case Kl:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(r,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let r=this.time+e,s=this._loopCount;const a=n===I0;if(e===0)return s===-1?r:a&&(s&1)===1?t-r:r;if(n===R0){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),r>=t||r<0){const o=Math.floor(r/t);r-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=r;if(a&&(s&1)===1)return t-r}return r}_setEndings(e,t,n){const r=this._interpolantSettings;n?(r.endingStart=ar,r.endingEnd=ar):(e?r.endingStart=this.zeroSlopeAtStart?ar:sr:r.endingStart=fa,t?r.endingEnd=this.zeroSlopeAtEnd?ar:sr:r.endingEnd=fa)}_scheduleFading(e,t,n){const r=this._mixer,s=r.time;let a=this._weightInterpolant;a===null&&(a=r._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const Ov=new Float32Array(1);class Bv extends pi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,r=e._clip.tracks,s=r.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=r[u],f=d.name;let p=h[f];if(p!==void 0)++p.referenceCount,a[u]=p;else{if(p=a[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;p=new Ev(Je.create(n,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[u]=p}o[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,n)}const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const r=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=r.length,r.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const r=this._bindingsByRootAndName,s=this._bindings;let a=r[t];a===void 0&&(a={},r[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,r=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[r],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[r]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new kd(new Float32Array(2),new Float32Array(2),1,Ov),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const r=t||this._root,s=r.uuid;let a=typeof e=="string"?Rl.findByName(r,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Kl),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new Fv(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){const n=t||this._root,r=n.uuid,s=typeof e=="string"?Rl.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[r]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,r=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(r,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,r=this._actionsByClip,s=r[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete r[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const xc=class xc{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};xc.prototype.isMatrix2=!0;let Gu=xc;function Hu(i,e,t,n){const r=kv(n);switch(t){case _d:return i*e;case xd:return i*e/r.components*r.byteLength;case Yl:return i*e/r.components*r.byteLength;case Pi:return i*e*2/r.components*r.byteLength;case ql:return i*e*2/r.components*r.byteLength;case vd:return i*e*3/r.components*r.byteLength;case hn:return i*e*4/r.components*r.byteLength;case jl:return i*e*4/r.components*r.byteLength;case Js:case Qs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ea:case ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ko:case Zo:return Math.max(i,16)*Math.max(e,8)/4;case jo:case $o:return Math.max(i,8)*Math.max(e,8)/2;case Jo:case Qo:case tl:case nl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case el:case ua:case il:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case al:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ol:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ll:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case cl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ul:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case hl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case dl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case pl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ml:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case gl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case _l:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case vl:case xl:case Sl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case yl:case Ml:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ha:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function kv(i){switch(i){case sn:case fd:return{byteLength:1,components:1};case Xr:case pd:case jn:return{byteLength:2,components:1};case Wl:case Xl:return{byteLength:2,components:4};case Nn:case Hl:case xn:return{byteLength:4,components:1};case md:case gd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gl}}));typeof window<"u"&&(window.__THREE__?Te("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xd(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Vv(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],_=u[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const _=u[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var zv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gv=`#ifdef USE_ALPHAHASH
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
#endif`,Hv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qv=`#ifdef USE_AOMAP
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
#endif`,jv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kv=`#ifdef USE_BATCHING
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
#endif`,$v=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ex=`#ifdef USE_IRIDESCENCE
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
#endif`,tx=`#ifdef USE_BUMPMAP
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
#endif`,nx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ix=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ax=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ox=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,lx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ux=`#define PI 3.141592653589793
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
} // validated`,hx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dx=`vec3 transformedNormal = objectNormal;
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
#endif`,fx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,px=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_x="gl_FragColor = linearToOutputTexel( gl_FragColor );",vx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xx=`#ifdef USE_ENVMAP
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
#endif`,Sx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,yx=`#ifdef USE_ENVMAP
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
#endif`,Mx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tx=`#ifdef USE_ENVMAP
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
#endif`,bx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ex=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ax=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cx=`#ifdef USE_GRADIENTMAP
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
}`,Rx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ix=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Px=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Dx=`#ifdef USE_ENVMAP
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
#endif`,Ux=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ox=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bx=`PhysicalMaterial material;
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
#endif`,kx=`uniform sampler2D dfgLUT;
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
}`,Vx=`
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
#endif`,zx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Wx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$x=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zx=`#if defined( USE_POINTS_UV )
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
#endif`,Jx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iS=`#ifdef USE_MORPHTARGETS
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
#endif`,rS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,aS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,oS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,uS=`#ifdef USE_NORMALMAP
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
#endif`,hS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,_S=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,SS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,MS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,TS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ES=`float getShadowMask() {
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
}`,AS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,CS=`#ifdef USE_SKINNING
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
#endif`,RS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,IS=`#ifdef USE_SKINNING
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
#endif`,PS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,LS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,DS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,US=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,NS=`#ifdef USE_TRANSMISSION
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
#endif`,FS=`#ifdef USE_TRANSMISSION
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
#endif`,OS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,BS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,VS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,GS=`uniform sampler2D t2D;
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
}`,HS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,WS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,XS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,YS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qS=`#include <common>
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
}`,jS=`#if DEPTH_PACKING == 3200
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
}`,KS=`#define DISTANCE
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
}`,$S=`#define DISTANCE
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
}`,ZS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,JS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QS=`uniform float scale;
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
}`,ey=`uniform vec3 diffuse;
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
}`,ty=`#include <common>
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
}`,ny=`uniform vec3 diffuse;
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
}`,iy=`#define LAMBERT
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
}`,ry=`#define LAMBERT
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
}`,sy=`#define MATCAP
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
}`,ay=`#define MATCAP
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
}`,oy=`#define NORMAL
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
}`,ly=`#define NORMAL
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
}`,cy=`#define PHONG
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
}`,uy=`#define PHONG
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
}`,hy=`#define STANDARD
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
}`,dy=`#define STANDARD
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
}`,fy=`#define TOON
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
}`,py=`#define TOON
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
}`,my=`uniform float size;
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
}`,gy=`uniform vec3 diffuse;
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
}`,_y=`#include <common>
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
}`,vy=`uniform vec3 color;
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
}`,xy=`uniform float rotation;
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
}`,Sy=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:zv,alphahash_pars_fragment:Gv,alphamap_fragment:Hv,alphamap_pars_fragment:Wv,alphatest_fragment:Xv,alphatest_pars_fragment:Yv,aomap_fragment:qv,aomap_pars_fragment:jv,batching_pars_vertex:Kv,batching_vertex:$v,begin_vertex:Zv,beginnormal_vertex:Jv,bsdfs:Qv,iridescence_fragment:ex,bumpmap_pars_fragment:tx,clipping_planes_fragment:nx,clipping_planes_pars_fragment:ix,clipping_planes_pars_vertex:rx,clipping_planes_vertex:sx,color_fragment:ax,color_pars_fragment:ox,color_pars_vertex:lx,color_vertex:cx,common:ux,cube_uv_reflection_fragment:hx,defaultnormal_vertex:dx,displacementmap_pars_vertex:fx,displacementmap_vertex:px,emissivemap_fragment:mx,emissivemap_pars_fragment:gx,colorspace_fragment:_x,colorspace_pars_fragment:vx,envmap_fragment:xx,envmap_common_pars_fragment:Sx,envmap_pars_fragment:yx,envmap_pars_vertex:Mx,envmap_physical_pars_fragment:Dx,envmap_vertex:Tx,fog_vertex:bx,fog_pars_vertex:wx,fog_fragment:Ex,fog_pars_fragment:Ax,gradientmap_pars_fragment:Cx,lightmap_pars_fragment:Rx,lights_lambert_fragment:Ix,lights_lambert_pars_fragment:Px,lights_pars_begin:Lx,lights_toon_fragment:Ux,lights_toon_pars_fragment:Nx,lights_phong_fragment:Fx,lights_phong_pars_fragment:Ox,lights_physical_fragment:Bx,lights_physical_pars_fragment:kx,lights_fragment_begin:Vx,lights_fragment_maps:zx,lights_fragment_end:Gx,lightprobes_pars_fragment:Hx,logdepthbuf_fragment:Wx,logdepthbuf_pars_fragment:Xx,logdepthbuf_pars_vertex:Yx,logdepthbuf_vertex:qx,map_fragment:jx,map_pars_fragment:Kx,map_particle_fragment:$x,map_particle_pars_fragment:Zx,metalnessmap_fragment:Jx,metalnessmap_pars_fragment:Qx,morphinstance_vertex:eS,morphcolor_vertex:tS,morphnormal_vertex:nS,morphtarget_pars_vertex:iS,morphtarget_vertex:rS,normal_fragment_begin:sS,normal_fragment_maps:aS,normal_pars_fragment:oS,normal_pars_vertex:lS,normal_vertex:cS,normalmap_pars_fragment:uS,clearcoat_normal_fragment_begin:hS,clearcoat_normal_fragment_maps:dS,clearcoat_pars_fragment:fS,iridescence_pars_fragment:pS,opaque_fragment:mS,packing:gS,premultiplied_alpha_fragment:_S,project_vertex:vS,dithering_fragment:xS,dithering_pars_fragment:SS,roughnessmap_fragment:yS,roughnessmap_pars_fragment:MS,shadowmap_pars_fragment:TS,shadowmap_pars_vertex:bS,shadowmap_vertex:wS,shadowmask_pars_fragment:ES,skinbase_vertex:AS,skinning_pars_vertex:CS,skinning_vertex:RS,skinnormal_vertex:IS,specularmap_fragment:PS,specularmap_pars_fragment:LS,tonemapping_fragment:DS,tonemapping_pars_fragment:US,transmission_fragment:NS,transmission_pars_fragment:FS,uv_pars_fragment:OS,uv_pars_vertex:BS,uv_vertex:kS,worldpos_vertex:VS,background_vert:zS,background_frag:GS,backgroundCube_vert:HS,backgroundCube_frag:WS,cube_vert:XS,cube_frag:YS,depth_vert:qS,depth_frag:jS,distance_vert:KS,distance_frag:$S,equirect_vert:ZS,equirect_frag:JS,linedashed_vert:QS,linedashed_frag:ey,meshbasic_vert:ty,meshbasic_frag:ny,meshlambert_vert:iy,meshlambert_frag:ry,meshmatcap_vert:sy,meshmatcap_frag:ay,meshnormal_vert:oy,meshnormal_frag:ly,meshphong_vert:cy,meshphong_frag:uy,meshphysical_vert:hy,meshphysical_frag:dy,meshtoon_vert:fy,meshtoon_frag:py,points_vert:my,points_frag:gy,shadow_vert:_y,shadow_frag:vy,sprite_vert:xy,sprite_frag:Sy},he={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},En={basic:{uniforms:Kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ue(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Kt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Kt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ue(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Kt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Kt([he.points,he.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Kt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Kt([he.common,he.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Kt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Kt([he.sprite,he.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:Kt([he.common,he.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:Kt([he.lights,he.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};En.physical={uniforms:Kt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Ys={r:0,b:0,g:0},yy=new Ee,Yd=new Oe;Yd.set(-1,0,0,0,1,0,0,0,1);function My(i,e,t,n,r,s){const a=new Ue(0);let o=r===!0?0:1,l,c,h=null,u=0,d=null;function f(S){let M=S.isScene===!0?S.background:null;if(M&&M.isTexture){const T=S.backgroundBlurriness>0;M=e.get(M,T)}return M}function p(S){let M=!1;const T=f(S);T===null?g(a,o):T&&T.isColor&&(g(T,1),M=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(S,M){const T=f(M);T&&(T.isCubeTexture||T.mapping===Ra)?(c===void 0&&(c=new Mt(new $n(1,1,1),new On({name:"BackgroundCubeMaterial",uniforms:Sr(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=T,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(yy.makeRotationFromEuler(M.backgroundRotation)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Yd),c.material.toneMapped=Be.getTransfer(T.colorSpace)!==nt,(h!==T||u!==T.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=T,u=T.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new Mt(new Mr(2,2),new On({name:"BackgroundMaterial",uniforms:Sr(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Be.getTransfer(T.colorSpace)!==nt,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(h!==T||u!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=T,u=T.version,d=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function g(S,M){S.getRGB(Ys,Od(i)),t.buffers.color.setClear(Ys.r,Ys.g,Ys.b,M,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,M=1){a.set(S),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,g(a,o)},render:p,addToRenderList:_,dispose:m}}function Ty(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(A,N,H,W,F){let B=!1;const z=u(A,W,H,N);s!==z&&(s=z,c(s.object)),B=f(A,W,H,F),B&&p(A,W,H,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,T(A,N,H,W),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return i.createVertexArray()}function c(A){return i.bindVertexArray(A)}function h(A){return i.deleteVertexArray(A)}function u(A,N,H,W){const F=W.wireframe===!0;let B=n[N.id];B===void 0&&(B={},n[N.id]=B);const z=A.isInstancedMesh===!0?A.id:0;let J=B[z];J===void 0&&(J={},B[z]=J);let ee=J[H.id];ee===void 0&&(ee={},J[H.id]=ee);let le=ee[F];return le===void 0&&(le=d(l()),ee[F]=le),le}function d(A){const N=[],H=[],W=[];for(let F=0;F<t;F++)N[F]=0,H[F]=0,W[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:H,attributeDivisors:W,object:A,attributes:{},index:null}}function f(A,N,H,W){const F=s.attributes,B=N.attributes;let z=0;const J=H.getAttributes();for(const ee in J)if(J[ee].location>=0){const xe=F[ee];let Se=B[ee];if(Se===void 0&&(ee==="instanceMatrix"&&A.instanceMatrix&&(Se=A.instanceMatrix),ee==="instanceColor"&&A.instanceColor&&(Se=A.instanceColor)),xe===void 0||xe.attribute!==Se||Se&&xe.data!==Se.data)return!0;z++}return s.attributesNum!==z||s.index!==W}function p(A,N,H,W){const F={},B=N.attributes;let z=0;const J=H.getAttributes();for(const ee in J)if(J[ee].location>=0){let xe=B[ee];xe===void 0&&(ee==="instanceMatrix"&&A.instanceMatrix&&(xe=A.instanceMatrix),ee==="instanceColor"&&A.instanceColor&&(xe=A.instanceColor));const Se={};Se.attribute=xe,xe&&xe.data&&(Se.data=xe.data),F[ee]=Se,z++}s.attributes=F,s.attributesNum=z,s.index=W}function _(){const A=s.newAttributes;for(let N=0,H=A.length;N<H;N++)A[N]=0}function g(A){m(A,0)}function m(A,N){const H=s.newAttributes,W=s.enabledAttributes,F=s.attributeDivisors;H[A]=1,W[A]===0&&(i.enableVertexAttribArray(A),W[A]=1),F[A]!==N&&(i.vertexAttribDivisor(A,N),F[A]=N)}function S(){const A=s.newAttributes,N=s.enabledAttributes;for(let H=0,W=N.length;H<W;H++)N[H]!==A[H]&&(i.disableVertexAttribArray(H),N[H]=0)}function M(A,N,H,W,F,B,z){z===!0?i.vertexAttribIPointer(A,N,H,F,B):i.vertexAttribPointer(A,N,H,W,F,B)}function T(A,N,H,W){_();const F=W.attributes,B=H.getAttributes(),z=N.defaultAttributeValues;for(const J in B){const ee=B[J];if(ee.location>=0){let le=F[J];if(le===void 0&&(J==="instanceMatrix"&&A.instanceMatrix&&(le=A.instanceMatrix),J==="instanceColor"&&A.instanceColor&&(le=A.instanceColor)),le!==void 0){const xe=le.normalized,Se=le.itemSize,He=e.get(le);if(He===void 0)continue;const tt=He.buffer,De=He.type,K=He.bytesPerElement,ce=De===i.INT||De===i.UNSIGNED_INT||le.gpuType===Hl;if(le.isInterleavedBufferAttribute){const te=le.data,Ce=te.stride,Ne=le.offset;if(te.isInstancedInterleavedBuffer){for(let Ie=0;Ie<ee.locationSize;Ie++)m(ee.location+Ie,te.meshPerAttribute);A.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ie=0;Ie<ee.locationSize;Ie++)g(ee.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let Ie=0;Ie<ee.locationSize;Ie++)M(ee.location+Ie,Se/ee.locationSize,De,xe,Ce*K,(Ne+Se/ee.locationSize*Ie)*K,ce)}else{if(le.isInstancedBufferAttribute){for(let te=0;te<ee.locationSize;te++)m(ee.location+te,le.meshPerAttribute);A.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let te=0;te<ee.locationSize;te++)g(ee.location+te);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let te=0;te<ee.locationSize;te++)M(ee.location+te,Se/ee.locationSize,De,xe,Se*K,Se/ee.locationSize*te*K,ce)}}else if(z!==void 0){const xe=z[J];if(xe!==void 0)switch(xe.length){case 2:i.vertexAttrib2fv(ee.location,xe);break;case 3:i.vertexAttrib3fv(ee.location,xe);break;case 4:i.vertexAttrib4fv(ee.location,xe);break;default:i.vertexAttrib1fv(ee.location,xe)}}}}S()}function C(){E();for(const A in n){const N=n[A];for(const H in N){const W=N[H];for(const F in W){const B=W[F];for(const z in B)h(B[z].object),delete B[z];delete W[F]}}delete n[A]}}function w(A){if(n[A.id]===void 0)return;const N=n[A.id];for(const H in N){const W=N[H];for(const F in W){const B=W[F];for(const z in B)h(B[z].object),delete B[z];delete W[F]}}delete n[A.id]}function R(A){for(const N in n){const H=n[N];for(const W in H){const F=H[W];if(F[A.id]===void 0)continue;const B=F[A.id];for(const z in B)h(B[z].object),delete B[z];delete F[A.id]}}}function x(A){for(const N in n){const H=n[N],W=A.isInstancedMesh===!0?A.id:0,F=H[W];if(F!==void 0){for(const B in F){const z=F[B];for(const J in z)h(z[J].object),delete z[J];delete F[B]}delete H[W],Object.keys(H).length===0&&delete n[N]}}}function E(){P(),a=!0,s!==r&&(s=r,c(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:P,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:g,disableUnusedAttributes:S}}function by(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function wy(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==hn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const x=R===jn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==sn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==xn&&!x)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Te("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Te("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:T,maxSamples:C,samples:w}}function Ey(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Mi,o=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||r;return r=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=i.get(u);if(!r||p===null||p.length===0||s&&!g)s?h(null):c();else{const S=s?0:n,M=S*4;let T=m.clippingState||null;l.value=T,T=h(p,d,M,f);for(let C=0;C!==M;++C)T[C]=t[C];m.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=f+_*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,T=f;M!==_;++M,T+=4)a.copy(u[M]).applyMatrix4(S,o),a.normal.toArray(g,T),g[T+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const hi=4,Wu=[.125,.215,.35,.446,.526,.582],bi=20,Ay=256,Dr=new Pa,Xu=new Ue;let yo=null,Mo=0,To=0,bo=!1;const Cy=new D;class Yu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=Cy}=s;yo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),To=this._renderer.getActiveMipmapLevel(),bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ju(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(yo,Mo,To),this._renderer.xr.enabled=bo,e.scissorTest=!1,er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ii||e.mapping===gr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),To=this._renderer.getActiveMipmapLevel(),bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:jn,format:hn,colorSpace:pa,depthBuffer:!1},r=qu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qu(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ry(s)),this._blurMaterial=Py(s,e,t),this._ggxMaterial=Iy(s,e,t)}return r}_compileMaterial(e){const t=new Mt(new Xt,e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,n,r,s){const l=new Jt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Xu),u.toneMapping=Pn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Mt(new $n,new as({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const S=e.background;S?S.isColor&&(g.color.copy(S),e.background=null,m=!0):(g.color.copy(Xu),m=!0);for(let M=0;M<6;M++){const T=M%3;T===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[M],s.y,s.z)):T===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[M]));const C=this._cubeSize;er(r,T*C,M>2?C:0,C,C),u.setRenderTarget(r),m&&u.render(_,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ii||e.mapping===gr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ju());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;er(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Dr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-hi?n-p+hi:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,er(s,g,m,3*_,2*_),r.setRenderTarget(s),r.render(o,Dr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,er(e,g,m,3*_,2*_),r.setRenderTarget(e),r.render(o,Dr)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Pe("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[r];u.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*bi-1),_=s/p,g=isFinite(s)?1+Math.floor(h*_):bi;g>bi&&Te(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${bi}`);const m=[];let S=0;for(let R=0;R<bi;++R){const x=R/_,E=Math.exp(-x*x/2);m.push(E),R===0?S+=E:R<g&&(S+=2*E)}for(let R=0;R<m.length;R++)m[R]=m[R]/S;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=p,d.mipInt.value=M-n;const T=this._sizeLods[r],C=3*T*(r>M-hi?r-M+hi:0),w=4*(this._cubeSize-T);er(t,C,w,3*T,2*T),l.setRenderTarget(t),l.render(u,Dr)}}function Ry(i){const e=[],t=[],n=[];let r=i;const s=i-hi+1+Wu.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-hi?l=Wu[a-i+hi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,_=3,g=2,m=1,S=new Float32Array(_*p*f),M=new Float32Array(g*p*f),T=new Float32Array(m*p*f);for(let w=0;w<f;w++){const R=w%3*2/3-1,x=w>2?0:-1,E=[R,x,0,R+2/3,x,0,R+2/3,x+1,0,R,x,0,R+2/3,x+1,0,R,x+1,0];S.set(E,_*p*w),M.set(d,g*p*w);const P=[w,w,w,w,w,w];T.set(P,m*p*w)}const C=new Xt;C.setAttribute("position",new Dn(S,_)),C.setAttribute("uv",new Dn(M,g)),C.setAttribute("faceIndex",new Dn(T,m)),n.push(new Mt(C,null)),r>hi&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function qu(i,e,t){const n=new Ln(i,e,t);return n.texture.mapping=Ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function er(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Iy(i,e,t){return new On({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ay,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:La(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Py(i,e,t){const n=new Float32Array(bi),r=new D(0,1,0);return new On({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:La(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function ju(){return new On({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:La(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Ku(){return new On({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function La(){return`

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
	`}class qd extends Ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Pd(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new $n(5,5,5),s=new On({name:"CubemapFromEquirect",uniforms:Sr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qt,blending:Yn});s.uniforms.tEquirect.value=t;const a=new Mt(r,s),o=t.minFilter;return t.minFilter===Ei&&(t.minFilter=Wt),new bv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function Ly(i){let e=new WeakMap,t=new WeakMap,n=null;function r(d,f=!1){return d==null?null:f?a(d):s(d)}function s(d){if(d&&d.isTexture){const f=d.mapping;if(f===Zs||f===Wa)if(e.has(d)){const p=e.get(d).texture;return o(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const _=new qd(p.height);return _.fromEquirectangularTexture(i,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,p=f===Zs||f===Wa,_=f===Ii||f===gr;if(p||_){let g=t.get(d);const m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new Yu(i)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const S=d.image;return p&&S&&S.height>0||_&&S&&l(S)?(n===null&&(n=new Yu(i)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,f){return f===Zs?d.mapping=Ii:f===Wa&&(d.mapping=gr),d}function l(d){let f=0;const p=6;for(let _=0;_<p;_++)d[_]!==void 0&&f++;return f===p}function c(d){const f=d.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){const f=d.target;f.removeEventListener("dispose",h);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:u}}function Dy(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&wl("WebGLRenderer: "+n+" extension not supported."),r}}}function Uy(i,e,t,n){const r={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete r[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,p=u.attributes.position;let _=0;if(p===void 0)return;if(f!==null){const S=f.array;_=f.version;for(let M=0,T=S.length;M<T;M+=3){const C=S[M+0],w=S[M+1],R=S[M+2];d.push(C,w,w,R,R,C)}}else{const S=p.array;_=p.version;for(let M=0,T=S.length/3-1;M<T;M+=3){const C=M+0,w=M+1,R=M+2;d.push(C,w,w,R,R,C)}}const g=new(p.count>=65535?Ad:ec)(d,1);g.version=_;const m=s.get(u);m&&e.remove(m),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Ny(i,e,t){let n;function r(u){n=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,d){i.drawElements(n,d,s,u*a),t.update(d,n,1)}function c(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,s,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,u,0,f);let _=0;for(let g=0;g<f;g++)_+=d[g];t.update(_,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Fy(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:Pe("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Oy(i,e,t){const n=new WeakMap,r=new et;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let E=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),p===!0&&(M=2),_===!0&&(M=3);let T=o.attributes.position.count*M,C=1;T>e.maxTextureSize&&(C=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const w=new Float32Array(T*C*4*u),R=new bd(w,T,C,u);R.type=xn,R.needsUpdate=!0;const x=M*4;for(let P=0;P<u;P++){const A=g[P],N=m[P],H=S[P],W=T*C*4*P;for(let F=0;F<A.count;F++){const B=F*x;f===!0&&(r.fromBufferAttribute(A,F),w[W+B+0]=r.x,w[W+B+1]=r.y,w[W+B+2]=r.z,w[W+B+3]=0),p===!0&&(r.fromBufferAttribute(N,F),w[W+B+4]=r.x,w[W+B+5]=r.y,w[W+B+6]=r.z,w[W+B+7]=0),_===!0&&(r.fromBufferAttribute(H,F),w[W+B+8]=r.x,w[W+B+9]=r.y,w[W+B+10]=r.z,w[W+B+11]=H.itemSize===4?r.w:1)}}d={count:u,texture:R,size:new $e(T,C)},n.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function By(i,e,t,n,r){let s=new WeakMap;function a(c){const h=r.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==h&&(e.update(d),s.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return d}function o(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const ky={[sd]:"LINEAR_TONE_MAPPING",[ad]:"REINHARD_TONE_MAPPING",[od]:"CINEON_TONE_MAPPING",[ld]:"ACES_FILMIC_TONE_MAPPING",[ud]:"AGX_TONE_MAPPING",[hd]:"NEUTRAL_TONE_MAPPING",[cd]:"CUSTOM_TONE_MAPPING"};function Vy(i,e,t,n,r){const s=new Ln(e,t,{type:i,depthBuffer:n,stencilBuffer:r,depthTexture:n?new vr(e,t):void 0}),a=new Ln(e,t,{type:jn,depthBuffer:!1,stencilBuffer:!1}),o=new Xt;o.setAttribute("position",new mt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new mt([0,2,0,0,2,0],2));const l=new tv({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Mt(o,l),h=new Pa(-1,1,1,-1,0,1);let u=null,d=null,f=!1,p,_=null,g=[],m=!1;this.setSize=function(S,M){s.setSize(S,M),a.setSize(S,M);for(let T=0;T<g.length;T++){const C=g[T];C.setSize&&C.setSize(S,M)}},this.setEffects=function(S){g=S,m=g.length>0&&g[0].isRenderPass===!0;const M=s.width,T=s.height;for(let C=0;C<g.length;C++){const w=g[C];w.setSize&&w.setSize(M,T)}},this.begin=function(S,M){if(f||S.toneMapping===Pn&&g.length===0)return!1;if(_=M,M!==null){const T=M.width,C=M.height;(s.width!==T||s.height!==C)&&this.setSize(T,C)}return m===!1&&S.setRenderTarget(s),p=S.toneMapping,S.toneMapping=Pn,!0},this.hasRenderPass=function(){return m},this.end=function(S,M){S.toneMapping=p,f=!0;let T=s,C=a;for(let w=0;w<g.length;w++){const R=g[w];if(R.enabled!==!1&&(R.render(S,C,T,M),R.needsSwap!==!1)){const x=T;T=C,C=x}}if(u!==S.outputColorSpace||d!==S.toneMapping){u=S.outputColorSpace,d=S.toneMapping,l.defines={},Be.getTransfer(u)===nt&&(l.defines.SRGB_TRANSFER="");const w=ky[d];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=T.texture,S.setRenderTarget(_),S.render(c,h),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const jd=new Ft,Il=new vr(1,1),Kd=new bd,$d=new u_,Zd=new Pd,$u=[],Zu=[],Ju=new Float32Array(16),Qu=new Float32Array(9),eh=new Float32Array(4);function Er(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=$u[r];if(s===void 0&&(s=new Float32Array(r),$u[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Lt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Da(i,e){let t=Zu[e];t===void 0&&(t=new Int32Array(e),Zu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function zy(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Gy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2fv(this.addr,e),Lt(t,e)}}function Hy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;i.uniform3fv(this.addr,e),Lt(t,e)}}function Wy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4fv(this.addr,e),Lt(t,e)}}function Xy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;eh.set(n),i.uniformMatrix2fv(this.addr,!1,eh),Lt(t,n)}}function Yy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Qu.set(n),i.uniformMatrix3fv(this.addr,!1,Qu),Lt(t,n)}}function qy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Ju.set(n),i.uniformMatrix4fv(this.addr,!1,Ju),Lt(t,n)}}function jy(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ky(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2iv(this.addr,e),Lt(t,e)}}function $y(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3iv(this.addr,e),Lt(t,e)}}function Zy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4iv(this.addr,e),Lt(t,e)}}function Jy(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Qy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2uiv(this.addr,e),Lt(t,e)}}function eM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3uiv(this.addr,e),Lt(t,e)}}function tM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4uiv(this.addr,e),Lt(t,e)}}function nM(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Il.compareFunction=t.isReversedDepthBuffer()?Zl:$l,s=Il):s=jd,t.setTexture2D(e||s,r)}function iM(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||$d,r)}function rM(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Zd,r)}function sM(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Kd,r)}function aM(i){switch(i){case 5126:return zy;case 35664:return Gy;case 35665:return Hy;case 35666:return Wy;case 35674:return Xy;case 35675:return Yy;case 35676:return qy;case 5124:case 35670:return jy;case 35667:case 35671:return Ky;case 35668:case 35672:return $y;case 35669:case 35673:return Zy;case 5125:return Jy;case 36294:return Qy;case 36295:return eM;case 36296:return tM;case 35678:case 36198:case 36298:case 36306:case 35682:return nM;case 35679:case 36299:case 36307:return iM;case 35680:case 36300:case 36308:case 36293:return rM;case 36289:case 36303:case 36311:case 36292:return sM}}function oM(i,e){i.uniform1fv(this.addr,e)}function lM(i,e){const t=Er(e,this.size,2);i.uniform2fv(this.addr,t)}function cM(i,e){const t=Er(e,this.size,3);i.uniform3fv(this.addr,t)}function uM(i,e){const t=Er(e,this.size,4);i.uniform4fv(this.addr,t)}function hM(i,e){const t=Er(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function dM(i,e){const t=Er(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function fM(i,e){const t=Er(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function pM(i,e){i.uniform1iv(this.addr,e)}function mM(i,e){i.uniform2iv(this.addr,e)}function gM(i,e){i.uniform3iv(this.addr,e)}function _M(i,e){i.uniform4iv(this.addr,e)}function vM(i,e){i.uniform1uiv(this.addr,e)}function xM(i,e){i.uniform2uiv(this.addr,e)}function SM(i,e){i.uniform3uiv(this.addr,e)}function yM(i,e){i.uniform4uiv(this.addr,e)}function MM(i,e,t){const n=this.cache,r=e.length,s=Da(t,r);Pt(n,s)||(i.uniform1iv(this.addr,s),Lt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Il:a=jd;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function TM(i,e,t){const n=this.cache,r=e.length,s=Da(t,r);Pt(n,s)||(i.uniform1iv(this.addr,s),Lt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||$d,s[a])}function bM(i,e,t){const n=this.cache,r=e.length,s=Da(t,r);Pt(n,s)||(i.uniform1iv(this.addr,s),Lt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Zd,s[a])}function wM(i,e,t){const n=this.cache,r=e.length,s=Da(t,r);Pt(n,s)||(i.uniform1iv(this.addr,s),Lt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Kd,s[a])}function EM(i){switch(i){case 5126:return oM;case 35664:return lM;case 35665:return cM;case 35666:return uM;case 35674:return hM;case 35675:return dM;case 35676:return fM;case 5124:case 35670:return pM;case 35667:case 35671:return mM;case 35668:case 35672:return gM;case 35669:case 35673:return _M;case 5125:return vM;case 36294:return xM;case 36295:return SM;case 36296:return yM;case 35678:case 36198:case 36298:case 36306:case 35682:return MM;case 35679:case 36299:case 36307:return TM;case 35680:case 36300:case 36308:case 36293:return bM;case 36289:case 36303:case 36311:case 36292:return wM}}class AM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=aM(t.type)}}class CM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=EM(t.type)}}class RM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const wo=/(\w+)(\])?(\[|\.)?/g;function th(i,e){i.seq.push(e),i.map[e.id]=e}function IM(i,e,t){const n=i.name,r=n.length;for(wo.lastIndex=0;;){const s=wo.exec(n),a=wo.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){th(t,c===void 0?new AM(o,i,e):new CM(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new RM(o),th(t,u)),t=u}}}class na{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);IM(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function nh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const PM=37297;let LM=0;function DM(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const ih=new Oe;function UM(i){Be._getMatrix(ih,Be.workingColorSpace,i);const e=`mat3( ${ih.elements.map(t=>t.toFixed(4))} )`;switch(Be.getTransfer(i)){case ma:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return Te("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function rh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+DM(i.getShaderSource(e),o)}else return s}function NM(i,e){const t=UM(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const FM={[sd]:"Linear",[ad]:"Reinhard",[od]:"Cineon",[ld]:"ACESFilmic",[ud]:"AgX",[hd]:"Neutral",[cd]:"Custom"};function OM(i,e){const t=FM[e];return t===void 0?(Te("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const qs=new D;function BM(){Be.getLuminanceCoefficients(qs);const i=qs.x.toFixed(4),e=qs.y.toFixed(4),t=qs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Br).join(`
`)}function VM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function zM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Br(i){return i!==""}function sh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ah(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const GM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pl(i){return i.replace(GM,WM)}const HM=new Map;function WM(i,e){let t=We[e];if(t===void 0){const n=HM.get(e);if(n!==void 0)t=We[n],Te('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Pl(t)}const XM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function oh(i){return i.replace(XM,YM)}function YM(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function lh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const qM={[$s]:"SHADOWMAP_TYPE_PCF",[Fr]:"SHADOWMAP_TYPE_VSM"};function jM(i){return qM[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const KM={[Ii]:"ENVMAP_TYPE_CUBE",[gr]:"ENVMAP_TYPE_CUBE",[Ra]:"ENVMAP_TYPE_CUBE_UV"};function $M(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":KM[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const ZM={[gr]:"ENVMAP_MODE_REFRACTION"};function JM(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":ZM[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const QM={[Ca]:"ENVMAP_BLENDING_MULTIPLY",[w0]:"ENVMAP_BLENDING_MIX",[E0]:"ENVMAP_BLENDING_ADD"};function eT(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":QM[i.combine]||"ENVMAP_BLENDING_NONE"}function tT(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function nT(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=jM(t),c=$M(t),h=JM(t),u=eT(t),d=tT(t),f=kM(t),p=VM(s),_=r.createProgram();let g,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Br).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Br).join(`
`),m.length>0&&(m+=`
`)):(g=[lh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Br).join(`
`),m=[lh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?We.tonemapping_pars_fragment:"",t.toneMapping!==Pn?OM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,NM("linearToOutputTexel",t.outputColorSpace),BM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Br).join(`
`)),a=Pl(a),a=sh(a,t),a=ah(a,t),o=Pl(o),o=sh(o,t),o=ah(o,t),a=oh(a),o=oh(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===su?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===su?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=S+g+a,T=S+m+o,C=nh(r,r.VERTEX_SHADER,M),w=nh(r,r.FRAGMENT_SHADER,T);r.attachShader(_,C),r.attachShader(_,w),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(A){if(i.debug.checkShaderErrors){const N=r.getProgramInfoLog(_)||"",H=r.getShaderInfoLog(C)||"",W=r.getShaderInfoLog(w)||"",F=N.trim(),B=H.trim(),z=W.trim();let J=!0,ee=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,C,w);else{const le=rh(r,C,"vertex"),xe=rh(r,w,"fragment");Pe("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+F+`
`+le+`
`+xe)}else F!==""?Te("WebGLProgram: Program Info Log:",F):(B===""||z==="")&&(ee=!1);ee&&(A.diagnostics={runnable:J,programLog:F,vertexShader:{log:B,prefix:g},fragmentShader:{log:z,prefix:m}})}r.deleteShader(C),r.deleteShader(w),x=new na(r,_),E=zM(r,_)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(_,PM)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=LM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=w,this}let iT=0;class rT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new sT(e),t.set(e,n)),n}}class sT{constructor(e){this.id=iT++,this.code=e,this.usedTimes=0}}function aT(i){return i===Pi||i===ua||i===ha}function oT(i,e,t,n,r,s){const a=new wd,o=new rT,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,E,P,A,N,H){const W=A.fog,F=N.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?A.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,J=e.get(x.envMap||B,z),ee=J&&J.mapping===Ra?J.image.height:null,le=f[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Te("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const xe=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Se=xe!==void 0?xe.length:0;let He=0;F.morphAttributes.position!==void 0&&(He=1),F.morphAttributes.normal!==void 0&&(He=2),F.morphAttributes.color!==void 0&&(He=3);let tt,De,K,ce;if(le){const ke=En[le];tt=ke.vertexShader,De=ke.fragmentShader}else tt=x.vertexShader,De=x.fragmentShader,o.update(x),K=o.getVertexShaderID(x),ce=o.getFragmentShaderID(x);const te=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),Ne=N.isInstancedMesh===!0,Ie=N.isBatchedMesh===!0,lt=!!x.map,Xe=!!x.matcap,it=!!J,ft=!!x.aoMap,je=!!x.lightMap,Rt=!!x.bumpMap,_t=!!x.normalMap,en=!!x.displacementMap,L=!!x.emissiveMap,It=!!x.metalnessMap,Ke=!!x.roughnessMap,ct=x.anisotropy>0,ue=x.clearcoat>0,St=x.dispersion>0,b=x.iridescence>0,v=x.sheen>0,O=x.transmission>0,j=ct&&!!x.anisotropyMap,Q=ue&&!!x.clearcoatMap,ne=ue&&!!x.clearcoatNormalMap,oe=ue&&!!x.clearcoatRoughnessMap,Y=b&&!!x.iridescenceMap,$=b&&!!x.iridescenceThicknessMap,pe=v&&!!x.sheenColorMap,_e=v&&!!x.sheenRoughnessMap,se=!!x.specularMap,ie=!!x.specularColorMap,Fe=!!x.specularIntensityMap,Ge=O&&!!x.transmissionMap,Qe=O&&!!x.thicknessMap,I=!!x.gradientMap,re=!!x.alphaMap,q=x.alphaTest>0,me=!!x.alphaHash,ae=!!x.extensions;let Z=Pn;x.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Z=i.toneMapping);const Me={shaderID:le,shaderType:x.type,shaderName:x.name,vertexShader:tt,fragmentShader:De,defines:x.defines,customVertexShaderID:K,customFragmentShaderID:ce,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:Ie,batchingColor:Ie&&N._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&N.instanceColor!==null,instancingMorph:Ne&&N.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Be.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:lt,matcap:Xe,envMap:it,envMapMode:it&&J.mapping,envMapCubeUVHeight:ee,aoMap:ft,lightMap:je,bumpMap:Rt,normalMap:_t,displacementMap:en,emissiveMap:L,normalMapObjectSpace:_t&&x.normalMapType===L0,normalMapTangentSpace:_t&&x.normalMapType===qr,packedNormalMap:_t&&x.normalMapType===qr&&aT(x.normalMap.format),metalnessMap:It,roughnessMap:Ke,anisotropy:ct,anisotropyMap:j,clearcoat:ue,clearcoatMap:Q,clearcoatNormalMap:ne,clearcoatRoughnessMap:oe,dispersion:St,iridescence:b,iridescenceMap:Y,iridescenceThicknessMap:$,sheen:v,sheenColorMap:pe,sheenRoughnessMap:_e,specularMap:se,specularColorMap:ie,specularIntensityMap:Fe,transmission:O,transmissionMap:Ge,thicknessMap:Qe,gradientMap:I,opaque:x.transparent===!1&&x.blending===ur&&x.alphaToCoverage===!1,alphaMap:re,alphaTest:q,alphaHash:me,combine:x.combine,mapUv:lt&&p(x.map.channel),aoMapUv:ft&&p(x.aoMap.channel),lightMapUv:je&&p(x.lightMap.channel),bumpMapUv:Rt&&p(x.bumpMap.channel),normalMapUv:_t&&p(x.normalMap.channel),displacementMapUv:en&&p(x.displacementMap.channel),emissiveMapUv:L&&p(x.emissiveMap.channel),metalnessMapUv:It&&p(x.metalnessMap.channel),roughnessMapUv:Ke&&p(x.roughnessMap.channel),anisotropyMapUv:j&&p(x.anisotropyMap.channel),clearcoatMapUv:Q&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ne&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:$&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:_e&&p(x.sheenRoughnessMap.channel),specularMapUv:se&&p(x.specularMap.channel),specularColorMapUv:ie&&p(x.specularColorMap.channel),specularIntensityMapUv:Fe&&p(x.specularIntensityMap.channel),transmissionMapUv:Ge&&p(x.transmissionMap.channel),thicknessMapUv:Qe&&p(x.thicknessMap.channel),alphaMapUv:re&&p(x.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(_t||ct),vertexNormals:!!F.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!F.attributes.uv&&(lt||re),fog:!!W,useFog:x.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||F.attributes.normal===void 0&&_t===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ce,skinning:N.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:He,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Z,decodeVideoTexture:lt&&x.map.isVideoTexture===!0&&Be.getTransfer(x.map.colorSpace)===nt,decodeVideoTextureEmissive:L&&x.emissiveMap.isVideoTexture===!0&&Be.getTransfer(x.emissiveMap.colorSpace)===nt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Cn,flipSided:x.side===Qt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ae&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&x.extensions.multiDraw===!0||Ie)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function g(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)E.push(P),E.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(m(E,x),S(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function m(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function S(x,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),x.push(a.mask)}function M(x){const E=f[x.type];let P;if(E){const A=En[E];P=J_.clone(A.uniforms)}else P=x.uniforms;return P}function T(x,E){let P=h.get(E);return P!==void 0?++P.usedTimes:(P=new nT(i,E,x,r),c.push(P),h.set(E,P)),P}function C(x){if(--x.usedTimes===0){const E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function R(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:M,acquireProgram:T,releaseProgram:C,releaseShaderCache:w,programs:c,dispose:R}}function lT(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function cT(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ch(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function uh(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,_,g,m){let S=i[e];return S===void 0?(S={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},i[e]=S):(S.id=d.id,S.object=d,S.geometry=f,S.material=p,S.materialVariant=a(d),S.groupOrder=_,S.renderOrder=d.renderOrder,S.z=g,S.group=m),e++,S}function l(d,f,p,_,g,m){const S=o(d,f,p,_,g,m);p.transmission>0?n.push(S):p.transparent===!0?r.push(S):t.push(S)}function c(d,f,p,_,g,m){const S=o(d,f,p,_,g,m);p.transmission>0?n.unshift(S):p.transparent===!0?r.unshift(S):t.unshift(S)}function h(d,f){t.length>1&&t.sort(d||cT),n.length>1&&n.sort(f||ch),r.length>1&&r.sort(f||ch)}function u(){for(let d=e,f=i.length;d<f;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:u,sort:h}}function uT(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new uh,i.set(n,[a])):r>=s.length?(a=new uh,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function hT(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ue};break;case"SpotLight":t={position:new D,direction:new D,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function dT(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let fT=0;function pT(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function mT(i){const e=new hT,t=dT(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const r=new D,s=new Ee,a=new Ee;function o(c){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,S=0,M=0,T=0,C=0,w=0,R=0;c.sort(pT);for(let E=0,P=c.length;E<P;E++){const A=c[E],N=A.color,H=A.intensity,W=A.distance;let F=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===Pi?F=A.shadow.map.texture:F=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)h+=N.r*H,u+=N.g*H,d+=N.b*H;else if(A.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(A.sh.coefficients[B],H);R++}else if(A.isDirectionalLight){const B=e.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const z=A.shadow,J=t.get(A);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=F,n.directionalShadowMatrix[f]=A.shadow.matrix,S++}n.directional[f]=B,f++}else if(A.isSpotLight){const B=e.get(A);B.position.setFromMatrixPosition(A.matrixWorld),B.color.copy(N).multiplyScalar(H),B.distance=W,B.coneCos=Math.cos(A.angle),B.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),B.decay=A.decay,n.spot[_]=B;const z=A.shadow;if(A.map&&(n.spotLightMap[C]=A.map,C++,z.updateMatrices(A),A.castShadow&&w++),n.spotLightMatrix[_]=z.matrix,A.castShadow){const J=t.get(A);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,n.spotShadow[_]=J,n.spotShadowMap[_]=F,T++}_++}else if(A.isRectAreaLight){const B=e.get(A);B.color.copy(N).multiplyScalar(H),B.halfWidth.set(A.width*.5,0,0),B.halfHeight.set(0,A.height*.5,0),n.rectArea[g]=B,g++}else if(A.isPointLight){const B=e.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),B.distance=A.distance,B.decay=A.decay,A.castShadow){const z=A.shadow,J=t.get(A);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,J.shadowCameraNear=z.camera.near,J.shadowCameraFar=z.camera.far,n.pointShadow[p]=J,n.pointShadowMap[p]=F,n.pointShadowMatrix[p]=A.shadow.matrix,M++}n.point[p]=B,p++}else if(A.isHemisphereLight){const B=e.get(A);B.skyColor.copy(A.color).multiplyScalar(H),B.groundColor.copy(A.groundColor).multiplyScalar(H),n.hemi[m]=B,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const x=n.hash;(x.directionalLength!==f||x.pointLength!==p||x.spotLength!==_||x.rectAreaLength!==g||x.hemiLength!==m||x.numDirectionalShadows!==S||x.numPointShadows!==M||x.numSpotShadows!==T||x.numSpotMaps!==C||x.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=T+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,x.directionalLength=f,x.pointLength=p,x.spotLength=_,x.rectAreaLength=g,x.hemiLength=m,x.numDirectionalShadows=S,x.numPointShadows=M,x.numSpotShadows=T,x.numSpotMaps=C,x.numLightProbes=R,n.version=fT++)}function l(c,h){let u=0,d=0,f=0,p=0,_=0;const g=h.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){const M=c[m];if(M.isDirectionalLight){const T=n.directional[u];T.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),u++}else if(M.isSpotLight){const T=n.spot[f];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),f++}else if(M.isRectAreaLight){const T=n.rectArea[p];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(g),a.identity(),s.copy(M.matrixWorld),s.premultiply(g),a.extractRotation(s),T.halfWidth.set(M.width*.5,0,0),T.halfHeight.set(0,M.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),p++}else if(M.isPointLight){const T=n.point[d];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){const T=n.hemi[_];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function hh(i){const e=new mT(i),t=[],n=[],r=[];function s(d){u.camera=d,t.length=0,n.length=0,r.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function gT(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new hh(i),e.set(r,[o])):s>=a.length?(o=new hh(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const _T=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vT=`uniform sampler2D shadow_pass;
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
}`,xT=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],ST=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],dh=new Ee,Ur=new D,Eo=new D;function yT(i,e,t){let n=new ic;const r=new $e,s=new $e,a=new et,o=new iv,l=new rv,c={},h=t.maxTextureSize,u={[di]:Qt,[Qt]:di,[Cn]:Cn},d=new On({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:_T,fragmentShader:vT}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new Xt;p.setAttribute("position",new Dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Mt(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$s;let m=this.type;this.render=function(w,R,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===a0&&(Te("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=$s);const E=i.getRenderTarget(),P=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Yn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const H=m!==this.type;H&&R.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(F=>F.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,F=w.length;W<F;W++){const B=w[W],z=B.shadow;if(z===void 0){Te("WebGLShadowMap:",B,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const J=z.getFrameExtents();r.multiply(J),s.copy(z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/J.x),r.x=s.x*J.x,z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/J.y),r.y=s.y*J.y,z.mapSize.y=s.y));const ee=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=ee,z.map===null||H===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Fr){if(B.isPointLight){Te("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Ln(r.x,r.y,{format:Pi,type:jn,minFilter:Wt,magFilter:Wt,generateMipmaps:!1}),z.map.texture.name=B.name+".shadowMap",z.map.depthTexture=new vr(r.x,r.y,xn),z.map.depthTexture.name=B.name+".shadowMapDepth",z.map.depthTexture.format=Kn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Vt,z.map.depthTexture.magFilter=Vt}else B.isPointLight?(z.map=new qd(r.x),z.map.depthTexture=new I_(r.x,Nn)):(z.map=new Ln(r.x,r.y),z.map.depthTexture=new vr(r.x,r.y,Nn)),z.map.depthTexture.name=B.name+".shadowMap",z.map.depthTexture.format=Kn,this.type===$s?(z.map.depthTexture.compareFunction=ee?Zl:$l,z.map.depthTexture.minFilter=Wt,z.map.depthTexture.magFilter=Wt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Vt,z.map.depthTexture.magFilter=Vt);z.camera.updateProjectionMatrix()}const le=z.map.isWebGLCubeRenderTarget?6:1;for(let xe=0;xe<le;xe++){if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,xe),i.clear();else{xe===0&&(i.setRenderTarget(z.map),i.clear());const Se=z.getViewport(xe);a.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),N.viewport(a)}if(B.isPointLight){const Se=z.camera,He=z.matrix,tt=B.distance||Se.far;tt!==Se.far&&(Se.far=tt,Se.updateProjectionMatrix()),Ur.setFromMatrixPosition(B.matrixWorld),Se.position.copy(Ur),Eo.copy(Se.position),Eo.add(xT[xe]),Se.up.copy(ST[xe]),Se.lookAt(Eo),Se.updateMatrixWorld(),He.makeTranslation(-Ur.x,-Ur.y,-Ur.z),dh.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),z._frustum.setFromProjectionMatrix(dh,Se.coordinateSystem,Se.reversedDepth)}else z.updateMatrices(B);n=z.getFrustum(),T(R,x,z.camera,B,this.type)}z.isPointLightShadow!==!0&&this.type===Fr&&S(z,x),z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(E,P,A)};function S(w,R){const x=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ln(r.x,r.y,{format:Pi,type:jn})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,x,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,x,f,_,null)}function M(w,R,x,E){let P=null;const A=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(A!==void 0)P=A;else if(P=x.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const N=P.uuid,H=R.uuid;let W=c[N];W===void 0&&(W={},c[N]=W);let F=W[H];F===void 0&&(F=P.clone(),W[H]=F,R.addEventListener("dispose",C)),P=F}if(P.visible=R.visible,P.wireframe=R.wireframe,E===Fr?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:u[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const N=i.properties.get(P);N.light=x}return P}function T(w,R,x,E,P){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&P===Fr)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);const H=e.update(w),W=w.material;if(Array.isArray(W)){const F=H.groups;for(let B=0,z=F.length;B<z;B++){const J=F[B],ee=W[J.materialIndex];if(ee&&ee.visible){const le=M(w,ee,E,P);w.onBeforeShadow(i,w,R,x,H,le,J),i.renderBufferDirect(x,null,H,le,w,J),w.onAfterShadow(i,w,R,x,H,le,J)}}}else if(W.visible){const F=M(w,W,E,P);w.onBeforeShadow(i,w,R,x,H,F,null),i.renderBufferDirect(x,null,H,F,w,null),w.onAfterShadow(i,w,R,x,H,F,null)}}const N=w.children;for(let H=0,W=N.length;H<W;H++)T(N[H],R,x,E,P)}function C(w){w.target.removeEventListener("dispose",C);for(const x in c){const E=c[x],P=w.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function MT(i,e){function t(){let I=!1;const re=new et;let q=null;const me=new et(0,0,0,0);return{setMask:function(ae){q!==ae&&!I&&(i.colorMask(ae,ae,ae,ae),q=ae)},setLocked:function(ae){I=ae},setClear:function(ae,Z,Me,ke,Tt){Tt===!0&&(ae*=ke,Z*=ke,Me*=ke),re.set(ae,Z,Me,ke),me.equals(re)===!1&&(i.clearColor(ae,Z,Me,ke),me.copy(re))},reset:function(){I=!1,q=null,me.set(-1,0,0,0)}}}function n(){let I=!1,re=!1,q=null,me=null,ae=null;return{setReversed:function(Z){if(re!==Z){const Me=e.get("EXT_clip_control");Z?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),re=Z;const ke=ae;ae=null,this.setClear(ke)}},getReversed:function(){return re},setTest:function(Z){Z?te(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(Z){q!==Z&&!I&&(i.depthMask(Z),q=Z)},setFunc:function(Z){if(re&&(Z=G0[Z]),me!==Z){switch(Z){case Vo:i.depthFunc(i.NEVER);break;case zo:i.depthFunc(i.ALWAYS);break;case Go:i.depthFunc(i.LESS);break;case mr:i.depthFunc(i.LEQUAL);break;case Ho:i.depthFunc(i.EQUAL);break;case Wo:i.depthFunc(i.GEQUAL);break;case Xo:i.depthFunc(i.GREATER);break;case Yo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=Z}},setLocked:function(Z){I=Z},setClear:function(Z){ae!==Z&&(ae=Z,re&&(Z=1-Z),i.clearDepth(Z))},reset:function(){I=!1,q=null,me=null,ae=null,re=!1}}}function r(){let I=!1,re=null,q=null,me=null,ae=null,Z=null,Me=null,ke=null,Tt=null;return{setTest:function(rt){I||(rt?te(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(rt){re!==rt&&!I&&(i.stencilMask(rt),re=rt)},setFunc:function(rt,Bn,yn){(q!==rt||me!==Bn||ae!==yn)&&(i.stencilFunc(rt,Bn,yn),q=rt,me=Bn,ae=yn)},setOp:function(rt,Bn,yn){(Z!==rt||Me!==Bn||ke!==yn)&&(i.stencilOp(rt,Bn,yn),Z=rt,Me=Bn,ke=yn)},setLocked:function(rt){I=rt},setClear:function(rt){Tt!==rt&&(i.clearStencil(rt),Tt=rt)},reset:function(){I=!1,re=null,q=null,me=null,ae=null,Z=null,Me=null,ke=null,Tt=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let h={},u={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,S=null,M=null,T=null,C=null,w=null,R=null,x=new Ue(0,0,0),E=0,P=!1,A=null,N=null,H=null,W=null,F=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,J=0;const ee=i.getParameter(i.VERSION);ee.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ee)[1]),z=J>=1):ee.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),z=J>=2);let le=null,xe={};const Se=i.getParameter(i.SCISSOR_BOX),He=i.getParameter(i.VIEWPORT),tt=new et().fromArray(Se),De=new et().fromArray(He);function K(I,re,q,me){const ae=new Uint8Array(4),Z=i.createTexture();i.bindTexture(I,Z),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Me=0;Me<q;Me++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(re+Me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return Z}const ce={};ce[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),ce[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ce[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(mr),Rt(!1),_t(Zc),te(i.CULL_FACE),ft(Yn);function te(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Ce(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Ne(I,re){return d[I]!==re?(i.bindFramebuffer(I,re),d[I]=re,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=re),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=re),!0):!1}function Ie(I,re){let q=p,me=!1;if(I){q=f.get(re),q===void 0&&(q=[],f.set(re,q));const ae=I.textures;if(q.length!==ae.length||q[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,Me=ae.length;Z<Me;Z++)q[Z]=i.COLOR_ATTACHMENT0+Z;q.length=ae.length,me=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,me=!0);me&&i.drawBuffers(q)}function lt(I){return _!==I?(i.useProgram(I),_=I,!0):!1}const Xe={[Ti]:i.FUNC_ADD,[l0]:i.FUNC_SUBTRACT,[c0]:i.FUNC_REVERSE_SUBTRACT};Xe[u0]=i.MIN,Xe[h0]=i.MAX;const it={[d0]:i.ZERO,[f0]:i.ONE,[p0]:i.SRC_COLOR,[Bo]:i.SRC_ALPHA,[S0]:i.SRC_ALPHA_SATURATE,[v0]:i.DST_COLOR,[g0]:i.DST_ALPHA,[m0]:i.ONE_MINUS_SRC_COLOR,[ko]:i.ONE_MINUS_SRC_ALPHA,[x0]:i.ONE_MINUS_DST_COLOR,[_0]:i.ONE_MINUS_DST_ALPHA,[y0]:i.CONSTANT_COLOR,[M0]:i.ONE_MINUS_CONSTANT_COLOR,[T0]:i.CONSTANT_ALPHA,[b0]:i.ONE_MINUS_CONSTANT_ALPHA};function ft(I,re,q,me,ae,Z,Me,ke,Tt,rt){if(I===Yn){g===!0&&(Ce(i.BLEND),g=!1);return}if(g===!1&&(te(i.BLEND),g=!0),I!==o0){if(I!==m||rt!==P){if((S!==Ti||C!==Ti)&&(i.blendEquation(i.FUNC_ADD),S=Ti,C=Ti),rt)switch(I){case ur:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jc:i.blendFunc(i.ONE,i.ONE);break;case Qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case eu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Pe("WebGLState: Invalid blending: ",I);break}else switch(I){case ur:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Qc:Pe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case eu:Pe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pe("WebGLState: Invalid blending: ",I);break}M=null,T=null,w=null,R=null,x.set(0,0,0),E=0,m=I,P=rt}return}ae=ae||re,Z=Z||q,Me=Me||me,(re!==S||ae!==C)&&(i.blendEquationSeparate(Xe[re],Xe[ae]),S=re,C=ae),(q!==M||me!==T||Z!==w||Me!==R)&&(i.blendFuncSeparate(it[q],it[me],it[Z],it[Me]),M=q,T=me,w=Z,R=Me),(ke.equals(x)===!1||Tt!==E)&&(i.blendColor(ke.r,ke.g,ke.b,Tt),x.copy(ke),E=Tt),m=I,P=!1}function je(I,re){I.side===Cn?Ce(i.CULL_FACE):te(i.CULL_FACE);let q=I.side===Qt;re&&(q=!q),Rt(q),I.blending===ur&&I.transparent===!1?ft(Yn):ft(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),s.setMask(I.colorWrite);const me=I.stencilWrite;o.setTest(me),me&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),L(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(I){A!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),A=I)}function _t(I){I!==r0?(te(i.CULL_FACE),I!==N&&(I===Zc?i.cullFace(i.BACK):I===s0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),N=I}function en(I){I!==H&&(z&&i.lineWidth(I),H=I)}function L(I,re,q){I?(te(i.POLYGON_OFFSET_FILL),(W!==re||F!==q)&&(W=re,F=q,a.getReversed()&&(re=-re),i.polygonOffset(re,q))):Ce(i.POLYGON_OFFSET_FILL)}function It(I){I?te(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function Ke(I){I===void 0&&(I=i.TEXTURE0+B-1),le!==I&&(i.activeTexture(I),le=I)}function ct(I,re,q){q===void 0&&(le===null?q=i.TEXTURE0+B-1:q=le);let me=xe[q];me===void 0&&(me={type:void 0,texture:void 0},xe[q]=me),(me.type!==I||me.texture!==re)&&(le!==q&&(i.activeTexture(q),le=q),i.bindTexture(I,re||ce[I]),me.type=I,me.texture=re)}function ue(){const I=xe[le];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function St(){try{i.compressedTexImage2D(...arguments)}catch(I){Pe("WebGLState:",I)}}function b(){try{i.compressedTexImage3D(...arguments)}catch(I){Pe("WebGLState:",I)}}function v(){try{i.texSubImage2D(...arguments)}catch(I){Pe("WebGLState:",I)}}function O(){try{i.texSubImage3D(...arguments)}catch(I){Pe("WebGLState:",I)}}function j(){try{i.compressedTexSubImage2D(...arguments)}catch(I){Pe("WebGLState:",I)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(I){Pe("WebGLState:",I)}}function ne(){try{i.texStorage2D(...arguments)}catch(I){Pe("WebGLState:",I)}}function oe(){try{i.texStorage3D(...arguments)}catch(I){Pe("WebGLState:",I)}}function Y(){try{i.texImage2D(...arguments)}catch(I){Pe("WebGLState:",I)}}function $(){try{i.texImage3D(...arguments)}catch(I){Pe("WebGLState:",I)}}function pe(I){return u[I]!==void 0?u[I]:i.getParameter(I)}function _e(I,re){u[I]!==re&&(i.pixelStorei(I,re),u[I]=re)}function se(I){tt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),tt.copy(I))}function ie(I){De.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),De.copy(I))}function Fe(I,re){let q=c.get(re);q===void 0&&(q=new WeakMap,c.set(re,q));let me=q.get(I);me===void 0&&(me=i.getUniformBlockIndex(re,I.name),q.set(I,me))}function Ge(I,re){const me=c.get(re).get(I);l.get(re)!==me&&(i.uniformBlockBinding(re,me,I.__bindingPointIndex),l.set(re,me))}function Qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},le=null,xe={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,S=null,M=null,T=null,C=null,w=null,R=null,x=new Ue(0,0,0),E=0,P=!1,A=null,N=null,H=null,W=null,F=null,tt.set(0,0,i.canvas.width,i.canvas.height),De.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:Ce,bindFramebuffer:Ne,drawBuffers:Ie,useProgram:lt,setBlending:ft,setMaterial:je,setFlipSided:Rt,setCullFace:_t,setLineWidth:en,setPolygonOffset:L,setScissorTest:It,activeTexture:Ke,bindTexture:ct,unbindTexture:ue,compressedTexImage2D:St,compressedTexImage3D:b,texImage2D:Y,texImage3D:$,pixelStorei:_e,getParameter:pe,updateUBOMapping:Fe,uniformBlockBinding:Ge,texStorage2D:ne,texStorage3D:oe,texSubImage2D:v,texSubImage3D:O,compressedTexSubImage2D:j,compressedTexSubImage3D:Q,scissor:se,viewport:ie,reset:Qe}}function TT(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,h=new WeakMap,u=new Set;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,v){return p?new OffscreenCanvas(b,v):Kr("canvas")}function g(b,v,O){let j=1;const Q=St(b);if((Q.width>O||Q.height>O)&&(j=O/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const ne=Math.floor(j*Q.width),oe=Math.floor(j*Q.height);d===void 0&&(d=_(ne,oe));const Y=v?_(ne,oe):d;return Y.width=ne,Y.height=oe,Y.getContext("2d").drawImage(b,0,0,ne,oe),Te("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ne+"x"+oe+")."),Y}else return"data"in b&&Te("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),b;return b}function m(b){return b.generateMipmaps}function S(b){i.generateMipmap(b)}function M(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(b,v,O,j,Q,ne=!1){if(b!==null){if(i[b]!==void 0)return i[b];Te("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let oe;j&&(oe=e.get("EXT_texture_norm16"),oe||Te("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=v;if(v===i.RED&&(O===i.FLOAT&&(Y=i.R32F),O===i.HALF_FLOAT&&(Y=i.R16F),O===i.UNSIGNED_BYTE&&(Y=i.R8),O===i.UNSIGNED_SHORT&&oe&&(Y=oe.R16_EXT),O===i.SHORT&&oe&&(Y=oe.R16_SNORM_EXT)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.R8UI),O===i.UNSIGNED_SHORT&&(Y=i.R16UI),O===i.UNSIGNED_INT&&(Y=i.R32UI),O===i.BYTE&&(Y=i.R8I),O===i.SHORT&&(Y=i.R16I),O===i.INT&&(Y=i.R32I)),v===i.RG&&(O===i.FLOAT&&(Y=i.RG32F),O===i.HALF_FLOAT&&(Y=i.RG16F),O===i.UNSIGNED_BYTE&&(Y=i.RG8),O===i.UNSIGNED_SHORT&&oe&&(Y=oe.RG16_EXT),O===i.SHORT&&oe&&(Y=oe.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RG8UI),O===i.UNSIGNED_SHORT&&(Y=i.RG16UI),O===i.UNSIGNED_INT&&(Y=i.RG32UI),O===i.BYTE&&(Y=i.RG8I),O===i.SHORT&&(Y=i.RG16I),O===i.INT&&(Y=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),O===i.UNSIGNED_INT&&(Y=i.RGB32UI),O===i.BYTE&&(Y=i.RGB8I),O===i.SHORT&&(Y=i.RGB16I),O===i.INT&&(Y=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),O===i.UNSIGNED_INT&&(Y=i.RGBA32UI),O===i.BYTE&&(Y=i.RGBA8I),O===i.SHORT&&(Y=i.RGBA16I),O===i.INT&&(Y=i.RGBA32I)),v===i.RGB&&(O===i.UNSIGNED_SHORT&&oe&&(Y=oe.RGB16_EXT),O===i.SHORT&&oe&&(Y=oe.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),v===i.RGBA){const $=ne?ma:Be.getTransfer(Q);O===i.FLOAT&&(Y=i.RGBA32F),O===i.HALF_FLOAT&&(Y=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Y=$===nt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&oe&&(Y=oe.RGBA16_EXT),O===i.SHORT&&oe&&(Y=oe.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function C(b,v){let O;return b?v===null||v===Nn||v===Yr?O=i.DEPTH24_STENCIL8:v===xn?O=i.DEPTH32F_STENCIL8:v===Xr&&(O=i.DEPTH24_STENCIL8,Te("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Nn||v===Yr?O=i.DEPTH_COMPONENT24:v===xn?O=i.DEPTH_COMPONENT32F:v===Xr&&(O=i.DEPTH_COMPONENT16),O}function w(b,v){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Vt&&b.minFilter!==Wt?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function R(b){const v=b.target;v.removeEventListener("dispose",R),E(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&u.delete(v)}function x(b){const v=b.target;v.removeEventListener("dispose",x),A(v)}function E(b){const v=n.get(b);if(v.__webglInit===void 0)return;const O=b.source,j=f.get(O);if(j){const Q=j[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&P(b),Object.keys(j).length===0&&f.delete(O)}n.remove(b)}function P(b){const v=n.get(b);i.deleteTexture(v.__webglTexture);const O=b.source,j=f.get(O);delete j[v.__cacheKey],a.memory.textures--}function A(b){const v=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(v.__webglFramebuffer[j]))for(let Q=0;Q<v.__webglFramebuffer[j].length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[j][Q]);else i.deleteFramebuffer(v.__webglFramebuffer[j]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[j])}else{if(Array.isArray(v.__webglFramebuffer))for(let j=0;j<v.__webglFramebuffer.length;j++)i.deleteFramebuffer(v.__webglFramebuffer[j]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let j=0;j<v.__webglColorRenderbuffer.length;j++)v.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[j]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=b.textures;for(let j=0,Q=O.length;j<Q;j++){const ne=n.get(O[j]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(O[j])}n.remove(b)}let N=0;function H(){N=0}function W(){return N}function F(b){N=b}function B(){const b=N;return b>=r.maxTextures&&Te("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),N+=1,b}function z(b){const v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function J(b,v){const O=n.get(b);if(b.isVideoTexture&&ct(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&O.__version!==b.version){const j=b.image;if(j===null)Te("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)Te("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(O,b,v);return}}else b.isExternalTexture&&(O.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function ee(b,v){const O=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){Ce(O,b,v);return}else b.isExternalTexture&&(O.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function le(b,v){const O=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){Ce(O,b,v);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function xe(b,v){const O=n.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&O.__version!==b.version){Ne(O,b,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const Se={[Wr]:i.REPEAT,[vn]:i.CLAMP_TO_EDGE,[qo]:i.MIRRORED_REPEAT},He={[Vt]:i.NEAREST,[C0]:i.NEAREST_MIPMAP_NEAREST,[_s]:i.NEAREST_MIPMAP_LINEAR,[Wt]:i.LINEAR,[Xa]:i.LINEAR_MIPMAP_NEAREST,[Ei]:i.LINEAR_MIPMAP_LINEAR},tt={[D0]:i.NEVER,[B0]:i.ALWAYS,[U0]:i.LESS,[$l]:i.LEQUAL,[N0]:i.EQUAL,[Zl]:i.GEQUAL,[F0]:i.GREATER,[O0]:i.NOTEQUAL};function De(b,v){if(v.type===xn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Wt||v.magFilter===Xa||v.magFilter===_s||v.magFilter===Ei||v.minFilter===Wt||v.minFilter===Xa||v.minFilter===_s||v.minFilter===Ei)&&Te("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,Se[v.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,Se[v.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,Se[v.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,He[v.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,He[v.minFilter]),v.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,tt[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Vt||v.minFilter!==_s&&v.minFilter!==Ei||v.type===xn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function K(b,v){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",R));const j=v.source;let Q=f.get(j);Q===void 0&&(Q={},f.set(j,Q));const ne=z(v);if(ne!==b.__cacheKey){Q[ne]===void 0&&(Q[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Q[ne].usedTimes++;const oe=Q[b.__cacheKey];oe!==void 0&&(Q[b.__cacheKey].usedTimes--,oe.usedTimes===0&&P(v)),b.__cacheKey=ne,b.__webglTexture=Q[ne].texture}return O}function ce(b,v,O){return Math.floor(Math.floor(b/O)/v)}function te(b,v,O,j){const ne=b.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,O,j,v.data);else{ne.sort((_e,se)=>_e.start-se.start);let oe=0;for(let _e=1;_e<ne.length;_e++){const se=ne[oe],ie=ne[_e],Fe=se.start+se.count,Ge=ce(ie.start,v.width,4),Qe=ce(se.start,v.width,4);ie.start<=Fe+1&&Ge===Qe&&ce(ie.start+ie.count-1,v.width,4)===Ge?se.count=Math.max(se.count,ie.start+ie.count-se.start):(++oe,ne[oe]=ie)}ne.length=oe+1;const Y=t.getParameter(i.UNPACK_ROW_LENGTH),$=t.getParameter(i.UNPACK_SKIP_PIXELS),pe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let _e=0,se=ne.length;_e<se;_e++){const ie=ne[_e],Fe=Math.floor(ie.start/4),Ge=Math.ceil(ie.count/4),Qe=Fe%v.width,I=Math.floor(Fe/v.width),re=Ge,q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Qe),t.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,Qe,I,re,q,O,j,v.data)}b.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Y),t.pixelStorei(i.UNPACK_SKIP_PIXELS,$),t.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function Ce(b,v,O){let j=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(j=i.TEXTURE_3D);const Q=K(b,v),ne=v.source;t.bindTexture(j,b.__webglTexture,i.TEXTURE0+O);const oe=n.get(ne);if(ne.version!==oe.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const q=Be.getPrimaries(Be.workingColorSpace),me=v.colorSpace===li?null:Be.getPrimaries(v.colorSpace),ae=v.colorSpace===li||q===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let $=g(v.image,!1,r.maxTextureSize);$=ue(v,$);const pe=s.convert(v.format,v.colorSpace),_e=s.convert(v.type);let se=T(v.internalFormat,pe,_e,v.normalized,v.colorSpace,v.isVideoTexture);De(j,v);let ie;const Fe=v.mipmaps,Ge=v.isVideoTexture!==!0,Qe=oe.__version===void 0||Q===!0,I=ne.dataReady,re=w(v,$);if(v.isDepthTexture)se=C(v.format===Ai,v.type),Qe&&(Ge?t.texStorage2D(i.TEXTURE_2D,1,se,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,se,$.width,$.height,0,pe,_e,null));else if(v.isDataTexture)if(Fe.length>0){Ge&&Qe&&t.texStorage2D(i.TEXTURE_2D,re,se,Fe[0].width,Fe[0].height);for(let q=0,me=Fe.length;q<me;q++)ie=Fe[q],Ge?I&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ie.width,ie.height,pe,_e,ie.data):t.texImage2D(i.TEXTURE_2D,q,se,ie.width,ie.height,0,pe,_e,ie.data);v.generateMipmaps=!1}else Ge?(Qe&&t.texStorage2D(i.TEXTURE_2D,re,se,$.width,$.height),I&&te(v,$,pe,_e)):t.texImage2D(i.TEXTURE_2D,0,se,$.width,$.height,0,pe,_e,$.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ge&&Qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,se,Fe[0].width,Fe[0].height,$.depth);for(let q=0,me=Fe.length;q<me;q++)if(ie=Fe[q],v.format!==hn)if(pe!==null)if(Ge){if(I)if(v.layerUpdates.size>0){const ae=Hu(ie.width,ie.height,v.format,v.type);for(const Z of v.layerUpdates){const Me=ie.data.subarray(Z*ae/ie.data.BYTES_PER_ELEMENT,(Z+1)*ae/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,Z,ie.width,ie.height,1,pe,Me)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ie.width,ie.height,$.depth,pe,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,se,ie.width,ie.height,$.depth,0,ie.data,0,0);else Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ie.width,ie.height,$.depth,pe,_e,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,se,ie.width,ie.height,$.depth,0,pe,_e,ie.data)}else{Ge&&Qe&&t.texStorage2D(i.TEXTURE_2D,re,se,Fe[0].width,Fe[0].height);for(let q=0,me=Fe.length;q<me;q++)ie=Fe[q],v.format!==hn?pe!==null?Ge?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,ie.width,ie.height,pe,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,q,se,ie.width,ie.height,0,ie.data):Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?I&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ie.width,ie.height,pe,_e,ie.data):t.texImage2D(i.TEXTURE_2D,q,se,ie.width,ie.height,0,pe,_e,ie.data)}else if(v.isDataArrayTexture)if(Ge){if(Qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,se,$.width,$.height,$.depth),I)if(v.layerUpdates.size>0){const q=Hu($.width,$.height,v.format,v.type);for(const me of v.layerUpdates){const ae=$.data.subarray(me*q/$.data.BYTES_PER_ELEMENT,(me+1)*q/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,$.width,$.height,1,pe,_e,ae)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,pe,_e,$.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,se,$.width,$.height,$.depth,0,pe,_e,$.data);else if(v.isData3DTexture)Ge?(Qe&&t.texStorage3D(i.TEXTURE_3D,re,se,$.width,$.height,$.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,pe,_e,$.data)):t.texImage3D(i.TEXTURE_3D,0,se,$.width,$.height,$.depth,0,pe,_e,$.data);else if(v.isFramebufferTexture){if(Qe)if(Ge)t.texStorage2D(i.TEXTURE_2D,re,se,$.width,$.height);else{let q=$.width,me=$.height;for(let ae=0;ae<re;ae++)t.texImage2D(i.TEXTURE_2D,ae,se,q,me,0,pe,_e,null),q>>=1,me>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const q=i.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),$.parentNode!==q){q.appendChild($),u.add(v),q.onpaint=ke=>{const Tt=ke.changedElements;for(const rt of u)Tt.includes(rt.image)&&(rt.needsUpdate=!0)},q.requestPaint();return}const me=0,ae=i.RGBA,Z=i.RGBA,Me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,me,ae,Z,Me,$),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Fe.length>0){if(Ge&&Qe){const q=St(Fe[0]);t.texStorage2D(i.TEXTURE_2D,re,se,q.width,q.height)}for(let q=0,me=Fe.length;q<me;q++)ie=Fe[q],Ge?I&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,pe,_e,ie):t.texImage2D(i.TEXTURE_2D,q,se,pe,_e,ie);v.generateMipmaps=!1}else if(Ge){if(Qe){const q=St($);t.texStorage2D(i.TEXTURE_2D,re,se,q.width,q.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,_e,$)}else t.texImage2D(i.TEXTURE_2D,0,se,pe,_e,$);m(v)&&S(j),oe.__version=ne.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Ne(b,v,O){if(v.image.length!==6)return;const j=K(b,v),Q=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+O);const ne=n.get(Q);if(Q.version!==ne.__version||j===!0){t.activeTexture(i.TEXTURE0+O);const oe=Be.getPrimaries(Be.workingColorSpace),Y=v.colorSpace===li?null:Be.getPrimaries(v.colorSpace),$=v.colorSpace===li||oe===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);const pe=v.isCompressedTexture||v.image[0].isCompressedTexture,_e=v.image[0]&&v.image[0].isDataTexture,se=[];for(let Z=0;Z<6;Z++)!pe&&!_e?se[Z]=g(v.image[Z],!0,r.maxCubemapSize):se[Z]=_e?v.image[Z].image:v.image[Z],se[Z]=ue(v,se[Z]);const ie=se[0],Fe=s.convert(v.format,v.colorSpace),Ge=s.convert(v.type),Qe=T(v.internalFormat,Fe,Ge,v.normalized,v.colorSpace),I=v.isVideoTexture!==!0,re=ne.__version===void 0||j===!0,q=Q.dataReady;let me=w(v,ie);De(i.TEXTURE_CUBE_MAP,v);let ae;if(pe){I&&re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Qe,ie.width,ie.height);for(let Z=0;Z<6;Z++){ae=se[Z].mipmaps;for(let Me=0;Me<ae.length;Me++){const ke=ae[Me];v.format!==hn?Fe!==null?I?q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me,0,0,ke.width,ke.height,Fe,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me,Qe,ke.width,ke.height,0,ke.data):Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me,0,0,ke.width,ke.height,Fe,Ge,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me,Qe,ke.width,ke.height,0,Fe,Ge,ke.data)}}}else{if(ae=v.mipmaps,I&&re){ae.length>0&&me++;const Z=St(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Qe,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(_e){I?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,se[Z].width,se[Z].height,Fe,Ge,se[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Qe,se[Z].width,se[Z].height,0,Fe,Ge,se[Z].data);for(let Me=0;Me<ae.length;Me++){const Tt=ae[Me].image[Z].image;I?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me+1,0,0,Tt.width,Tt.height,Fe,Ge,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me+1,Qe,Tt.width,Tt.height,0,Fe,Ge,Tt.data)}}else{I?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Fe,Ge,se[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Qe,Fe,Ge,se[Z]);for(let Me=0;Me<ae.length;Me++){const ke=ae[Me];I?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me+1,0,0,Fe,Ge,ke.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me+1,Qe,Fe,Ge,ke.image[Z])}}}m(v)&&S(i.TEXTURE_CUBE_MAP),ne.__version=Q.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Ie(b,v,O,j,Q,ne){const oe=s.convert(O.format,O.colorSpace),Y=s.convert(O.type),$=T(O.internalFormat,oe,Y,O.normalized,O.colorSpace),pe=n.get(v),_e=n.get(O);if(_e.__renderTarget=v,!pe.__hasExternalTextures){const se=Math.max(1,v.width>>ne),ie=Math.max(1,v.height>>ne);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,ne,$,se,ie,v.depth,0,oe,Y,null):t.texImage2D(Q,ne,$,se,ie,0,oe,Y,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),Ke(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Q,_e.__webglTexture,0,It(v)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,Q,_e.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(b,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,b),v.depthBuffer){const j=v.depthTexture,Q=j&&j.isDepthTexture?j.type:null,ne=C(v.stencilBuffer,Q),oe=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ke(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It(v),ne,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,It(v),ne,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ne,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,b)}else{const j=v.textures;for(let Q=0;Q<j.length;Q++){const ne=j[Q],oe=s.convert(ne.format,ne.colorSpace),Y=s.convert(ne.type),$=T(ne.internalFormat,oe,Y,ne.normalized,ne.colorSpace);Ke(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It(v),$,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,It(v),$,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,$,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Xe(b,v,O){const j=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(v.depthTexture);if(Q.__renderTarget=v,(!Q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),De(i.TEXTURE_CUBE_MAP,v.depthTexture);const pe=s.convert(v.depthTexture.format),_e=s.convert(v.depthTexture.type);let se;v.depthTexture.format===Kn?se=i.DEPTH_COMPONENT24:v.depthTexture.format===Ai&&(se=i.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,se,v.width,v.height,0,pe,_e,null)}}else J(v.depthTexture,0);const ne=Q.__webglTexture,oe=It(v),Y=j?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,$=v.depthTexture.format===Ai?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Kn)Ke(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Y,ne,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,$,Y,ne,0);else if(v.depthTexture.format===Ai)Ke(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Y,ne,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,$,Y,ne,0);else throw new Error("Unknown depthTexture format")}function it(b){const v=n.get(b),O=b.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==b.depthTexture){const j=b.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),j){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=j}if(b.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let j=0;j<6;j++)Xe(v.__webglFramebuffer[j],b,j);else{const j=b.texture.mipmaps;j&&j.length>0?Xe(v.__webglFramebuffer[0],b,0):Xe(v.__webglFramebuffer,b,0)}else if(O){v.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[j]),v.__webglDepthbuffer[j]===void 0)v.__webglDepthbuffer[j]=i.createRenderbuffer(),lt(v.__webglDepthbuffer[j],b,!1);else{const Q=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=v.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ne)}}else{const j=b.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),lt(v.__webglDepthbuffer,b,!1);else{const Q=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(b,v,O){const j=n.get(b);v!==void 0&&Ie(j.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&it(b)}function je(b){const v=b.texture,O=n.get(b),j=n.get(v);b.addEventListener("dispose",x);const Q=b.textures,ne=b.isWebGLCubeRenderTarget===!0,oe=Q.length>1;if(oe||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=v.version,a.memory.textures++),ne){O.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[Y]=[];for(let $=0;$<v.mipmaps.length;$++)O.__webglFramebuffer[Y][$]=i.createFramebuffer()}else O.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let Y=0;Y<v.mipmaps.length;Y++)O.__webglFramebuffer[Y]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(oe)for(let Y=0,$=Q.length;Y<$;Y++){const pe=n.get(Q[Y]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&Ke(b)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Y=0;Y<Q.length;Y++){const $=Q[Y];O.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[Y]);const pe=s.convert($.format,$.colorSpace),_e=s.convert($.type),se=T($.internalFormat,pe,_e,$.normalized,$.colorSpace,b.isXRRenderTarget===!0),ie=It(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,se,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,O.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),lt(O.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),De(i.TEXTURE_CUBE_MAP,v);for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0)for(let $=0;$<v.mipmaps.length;$++)Ie(O.__webglFramebuffer[Y][$],b,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,$);else Ie(O.__webglFramebuffer[Y],b,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);m(v)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let Y=0,$=Q.length;Y<$;Y++){const pe=Q[Y],_e=n.get(pe);let se=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(se=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,_e.__webglTexture),De(se,pe),Ie(O.__webglFramebuffer,b,pe,i.COLOR_ATTACHMENT0+Y,se,0),m(pe)&&S(se)}t.unbindTexture()}else{let Y=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Y=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Y,j.__webglTexture),De(Y,v),v.mipmaps&&v.mipmaps.length>0)for(let $=0;$<v.mipmaps.length;$++)Ie(O.__webglFramebuffer[$],b,v,i.COLOR_ATTACHMENT0,Y,$);else Ie(O.__webglFramebuffer,b,v,i.COLOR_ATTACHMENT0,Y,0);m(v)&&S(Y),t.unbindTexture()}b.depthBuffer&&it(b)}function Rt(b){const v=b.textures;for(let O=0,j=v.length;O<j;O++){const Q=v[O];if(m(Q)){const ne=M(b),oe=n.get(Q).__webglTexture;t.bindTexture(ne,oe),S(ne),t.unbindTexture()}}}const _t=[],en=[];function L(b){if(b.samples>0){if(Ke(b)===!1){const v=b.textures,O=b.width,j=b.height;let Q=i.COLOR_BUFFER_BIT;const ne=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(b),Y=v.length>1;if(Y)for(let pe=0;pe<v.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const $=b.texture.mipmaps;$&&$.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let pe=0;pe<v.length;pe++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const _e=n.get(v[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,_e,0)}i.blitFramebuffer(0,0,O,j,0,0,O,j,Q,i.NEAREST),l===!0&&(_t.length=0,en.length=0,_t.push(i.COLOR_ATTACHMENT0+pe),b.depthBuffer&&b.resolveDepthBuffer===!1&&(_t.push(ne),en.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,en)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let pe=0;pe<v.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const _e=n.get(v[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,_e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const v=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function It(b){return Math.min(r.maxSamples,b.samples)}function Ke(b){const v=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ct(b){const v=a.render.frame;h.get(b)!==v&&(h.set(b,v),b.update())}function ue(b,v){const O=b.colorSpace,j=b.format,Q=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||O!==pa&&O!==li&&(Be.getTransfer(O)===nt?(j!==hn||Q!==sn)&&Te("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pe("WebGLTextures: Unsupported texture color space:",O)),v}function St(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=H,this.getTextureUnits=W,this.setTextureUnits=F,this.setTexture2D=J,this.setTexture2DArray=ee,this.setTexture3D=le,this.setTextureCube=xe,this.rebindTextures=ft,this.setupRenderTarget=je,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=L,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=Ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function bT(i,e){function t(n,r=li){let s;const a=Be.getTransfer(r);if(n===sn)return i.UNSIGNED_BYTE;if(n===Wl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===md)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===fd)return i.BYTE;if(n===pd)return i.SHORT;if(n===Xr)return i.UNSIGNED_SHORT;if(n===Hl)return i.INT;if(n===Nn)return i.UNSIGNED_INT;if(n===xn)return i.FLOAT;if(n===jn)return i.HALF_FLOAT;if(n===_d)return i.ALPHA;if(n===vd)return i.RGB;if(n===hn)return i.RGBA;if(n===Kn)return i.DEPTH_COMPONENT;if(n===Ai)return i.DEPTH_STENCIL;if(n===xd)return i.RED;if(n===Yl)return i.RED_INTEGER;if(n===Pi)return i.RG;if(n===ql)return i.RG_INTEGER;if(n===jl)return i.RGBA_INTEGER;if(n===Js||n===Qs||n===ea||n===ta)if(a===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Js)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Qs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ta)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Js)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Qs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ea)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ta)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jo||n===Ko||n===$o||n===Zo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===jo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ko)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$o)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Zo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Jo||n===Qo||n===el||n===tl||n===nl||n===ua||n===il)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Jo||n===Qo)return a===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===el)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===tl)return s.COMPRESSED_R11_EAC;if(n===nl)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ua)return s.COMPRESSED_RG11_EAC;if(n===il)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===rl||n===sl||n===al||n===ol||n===ll||n===cl||n===ul||n===hl||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===rl)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sl)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===al)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ol)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ll)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===cl)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ul)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===hl)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dl)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fl)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pl)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ml)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===gl)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_l)return a===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vl||n===xl||n===Sl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===vl)return a===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yl||n===Ml||n===ha||n===Tl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===yl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ml)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ha)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Tl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const wT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ET=`
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

}`;class AT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ld(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new On({vertexShader:wT,fragmentShader:ET,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mt(new Mr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class CT extends pi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const _=typeof XRWebGLBinding<"u",g=new AT,m={},S=t.getContextAttributes();let M=null,T=null;const C=[],w=[],R=new $e;let x=null;const E=new Jt;E.viewport=new et;const P=new Jt;P.viewport=new et;const A=[E,P],N=new wv;let H=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ce=C[K];return ce===void 0&&(ce=new Ja,C[K]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(K){let ce=C[K];return ce===void 0&&(ce=new Ja,C[K]=ce),ce.getGripSpace()},this.getHand=function(K){let ce=C[K];return ce===void 0&&(ce=new Ja,C[K]=ce),ce.getHandSpace()};function F(K){const ce=w.indexOf(K.inputSource);if(ce===-1)return;const te=C[ce];te!==void 0&&(te.update(K.inputSource,K.frame,c||a),te.dispatchEvent({type:K.type,data:K.inputSource}))}function B(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",z);for(let K=0;K<C.length;K++){const ce=w[K];ce!==null&&(w[K]=null,C[K].disconnect(ce))}H=null,W=null,g.reset();for(const K in m)delete m[K];e.setRenderTarget(M),f=null,d=null,u=null,r=null,T=null,De.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&Te("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Te("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",B),r.addEventListener("inputsourceschange",z),S.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,Ce=null,Ne=null;S.depth&&(Ne=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=S.stencil?Ai:Kn,Ce=S.stencil?Yr:Nn);const Ie={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ie),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new Ln(d.textureWidth,d.textureHeight,{format:hn,type:sn,depthTexture:new vr(d.textureWidth,d.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const te={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),T=new Ln(f.framebufferWidth,f.framebufferHeight,{format:hn,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),De.setContext(r),De.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(K){for(let ce=0;ce<K.removed.length;ce++){const te=K.removed[ce],Ce=w.indexOf(te);Ce>=0&&(w[Ce]=null,C[Ce].disconnect(te))}for(let ce=0;ce<K.added.length;ce++){const te=K.added[ce];let Ce=w.indexOf(te);if(Ce===-1){for(let Ie=0;Ie<C.length;Ie++)if(Ie>=w.length){w.push(te),Ce=Ie;break}else if(w[Ie]===null){w[Ie]=te,Ce=Ie;break}if(Ce===-1)break}const Ne=C[Ce];Ne&&Ne.connect(te)}}const J=new D,ee=new D;function le(K,ce,te){J.setFromMatrixPosition(ce.matrixWorld),ee.setFromMatrixPosition(te.matrixWorld);const Ce=J.distanceTo(ee),Ne=ce.projectionMatrix.elements,Ie=te.projectionMatrix.elements,lt=Ne[14]/(Ne[10]-1),Xe=Ne[14]/(Ne[10]+1),it=(Ne[9]+1)/Ne[5],ft=(Ne[9]-1)/Ne[5],je=(Ne[8]-1)/Ne[0],Rt=(Ie[8]+1)/Ie[0],_t=lt*je,en=lt*Rt,L=Ce/(-je+Rt),It=L*-je;if(ce.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(It),K.translateZ(L),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ne[10]===-1)K.projectionMatrix.copy(ce.projectionMatrix),K.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const Ke=lt+L,ct=Xe+L,ue=_t-It,St=en+(Ce-It),b=it*Xe/ct*Ke,v=ft*Xe/ct*Ke;K.projectionMatrix.makePerspective(ue,St,b,v,Ke,ct),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function xe(K,ce){ce===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ce.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let ce=K.near,te=K.far;g.texture!==null&&(g.depthNear>0&&(ce=g.depthNear),g.depthFar>0&&(te=g.depthFar)),N.near=P.near=E.near=ce,N.far=P.far=E.far=te,(H!==N.near||W!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),H=N.near,W=N.far),N.layers.mask=K.layers.mask|6,E.layers.mask=N.layers.mask&-5,P.layers.mask=N.layers.mask&-3;const Ce=K.parent,Ne=N.cameras;xe(N,Ce);for(let Ie=0;Ie<Ne.length;Ie++)xe(Ne[Ie],Ce);Ne.length===2?le(N,E,P):N.projectionMatrix.copy(E.projectionMatrix),Se(K,N,Ce)};function Se(K,ce,te){te===null?K.matrix.copy(ce.matrixWorld):(K.matrix.copy(te.matrixWorld),K.matrix.invert(),K.matrix.multiply(ce.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ce.projectionMatrix),K.projectionMatrixInverse.copy(ce.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=_r*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(K){return m[K]};let He=null;function tt(K,ce){if(h=ce.getViewerPose(c||a),p=ce,h!==null){const te=h.views;f!==null&&(e.setRenderTargetFramebuffer(T,f.framebuffer),e.setRenderTarget(T));let Ce=!1;te.length!==N.cameras.length&&(N.cameras.length=0,Ce=!0);for(let Xe=0;Xe<te.length;Xe++){const it=te[Xe];let ft=null;if(f!==null)ft=f.getViewport(it);else{const Rt=u.getViewSubImage(d,it);ft=Rt.viewport,Xe===0&&(e.setRenderTargetTextures(T,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(T))}let je=A[Xe];je===void 0&&(je=new Jt,je.layers.enable(Xe),je.viewport=new et,A[Xe]=je),je.matrix.fromArray(it.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(it.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(ft.x,ft.y,ft.width,ft.height),Xe===0&&(N.matrix.copy(je.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ce===!0&&N.cameras.push(je)}const Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const Xe=u.getDepthInformation(te[0]);Xe&&Xe.isValid&&Xe.texture&&g.init(Xe,r.renderState)}if(Ne&&Ne.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let Xe=0;Xe<te.length;Xe++){const it=te[Xe].camera;if(it){let ft=m[it];ft||(ft=new Ld,m[it]=ft);const je=u.getCameraImage(it);ft.sourceTexture=je}}}}for(let te=0;te<C.length;te++){const Ce=w[te],Ne=C[te];Ce!==null&&Ne!==void 0&&Ne.update(Ce,ce,c||a)}He&&He(K,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),p=null}const De=new Xd;De.setAnimationLoop(tt),this.setAnimationLoop=function(K){He=K},this.dispose=function(){}}}const RT=new Ee,Jd=new Oe;Jd.set(-1,0,0,0,1,0,0,0,1);function IT(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Od(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,S,M,T){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,T)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,S,M):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Qt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Qt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const S=e.get(m),M=S.envMap,T=S.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(RT.makeRotationFromEuler(T)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Jd),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,S,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=M*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,S){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Qt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const S=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function PT(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const T=M.program;n.uniformBlockBinding(S,T)}function c(S,M){let T=r[S.id];T===void 0&&(p(S),T=h(S),r[S.id]=T,S.addEventListener("dispose",g));const C=M.program;n.updateUBOMapping(S,C);const w=e.render.frame;s[S.id]!==w&&(d(S),s[S.id]=w)}function h(S){const M=u();S.__bindingPointIndex=M;const T=i.createBuffer(),C=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,T),T}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Pe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const M=r[S.id],T=S.uniforms,C=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let w=0,R=T.length;w<R;w++){const x=Array.isArray(T[w])?T[w]:[T[w]];for(let E=0,P=x.length;E<P;E++){const A=x[E];if(f(A,w,E,C)===!0){const N=A.__offset,H=Array.isArray(A.value)?A.value:[A.value];let W=0;for(let F=0;F<H.length;F++){const B=H[F],z=_(B);typeof B=="number"||typeof B=="boolean"?(A.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,N+W,A.__data)):B.isMatrix3?(A.__data[0]=B.elements[0],A.__data[1]=B.elements[1],A.__data[2]=B.elements[2],A.__data[3]=0,A.__data[4]=B.elements[3],A.__data[5]=B.elements[4],A.__data[6]=B.elements[5],A.__data[7]=0,A.__data[8]=B.elements[6],A.__data[9]=B.elements[7],A.__data[10]=B.elements[8],A.__data[11]=0):ArrayBuffer.isView(B)?A.__data.set(new B.constructor(B.buffer,B.byteOffset,A.__data.length)):(B.toArray(A.__data,W),W+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,M,T,C){const w=S.value,R=M+"_"+T;if(C[R]===void 0)return typeof w=="number"||typeof w=="boolean"?C[R]=w:ArrayBuffer.isView(w)?C[R]=w.slice():C[R]=w.clone(),!0;{const x=C[R];if(typeof w=="number"||typeof w=="boolean"){if(x!==w)return C[R]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(x.equals(w)===!1)return x.copy(w),!0}}return!1}function p(S){const M=S.uniforms;let T=0;const C=16;for(let R=0,x=M.length;R<x;R++){const E=Array.isArray(M[R])?M[R]:[M[R]];for(let P=0,A=E.length;P<A;P++){const N=E[P],H=Array.isArray(N.value)?N.value:[N.value];for(let W=0,F=H.length;W<F;W++){const B=H[W],z=_(B),J=T%C,ee=J%z.boundary,le=J+ee;T+=ee,le!==0&&C-le<z.storage&&(T+=C-le),N.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=T,T+=z.storage}}}const w=T%C;return w>0&&(T+=C-w),S.__size=T,S.__cache={},this}function _(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?Te("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(M.boundary=16,M.storage=S.byteLength):Te("WebGLRenderer: Unsupported uniform value type.",S),M}function g(S){const M=S.target;M.removeEventListener("dispose",g);const T=a.indexOf(M.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function m(){for(const S in r)i.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}const LT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let wn=null;function DT(){return wn===null&&(wn=new Cd(LT,16,16,Pi,jn),wn.name="DFG_LUT",wn.minFilter=Wt,wn.magFilter=Wt,wn.wrapS=vn,wn.wrapT=vn,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}class UT{constructor(e={}){const{canvas:t=V0(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=sn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const _=f,g=new Set([jl,ql,Yl]),m=new Set([sn,Nn,Xr,Yr,Wl,Xl]),S=new Uint32Array(4),M=new Int32Array(4),T=new D;let C=null,w=null;const R=[],x=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let A=!1,N=null;this._outputColorSpace=ht;let H=0,W=0,F=null,B=-1,z=null;const J=new et,ee=new et;let le=null;const xe=new Ue(0);let Se=0,He=t.width,tt=t.height,De=1,K=null,ce=null;const te=new et(0,0,He,tt),Ce=new et(0,0,He,tt);let Ne=!1;const Ie=new ic;let lt=!1,Xe=!1;const it=new Ee,ft=new D,je=new et,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _t=!1;function en(){return F===null?De:1}let L=n;function It(y,U){return t.getContext(y,U)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gl}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",ke,!1),L===null){const U="webgl2";if(L=It(U,y),L===null)throw It(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw Pe("WebGLRenderer: "+y.message),y}let Ke,ct,ue,St,b,v,O,j,Q,ne,oe,Y,$,pe,_e,se,ie,Fe,Ge,Qe,I,re,q;function me(){Ke=new Dy(L),Ke.init(),I=new bT(L,Ke),ct=new wy(L,Ke,e,I),ue=new MT(L,Ke),ct.reversedDepthBuffer&&d&&ue.buffers.depth.setReversed(!0),St=new Fy(L),b=new lT,v=new TT(L,Ke,ue,b,ct,I,St),O=new Ly(P),j=new Vv(L),re=new Ty(L,j),Q=new Uy(L,j,St,re),ne=new By(L,Q,j,re,St),Fe=new Oy(L,ct,v),_e=new Ey(b),oe=new oT(P,O,Ke,ct,re,_e),Y=new IT(P,b),$=new uT,pe=new gT(Ke),ie=new My(P,O,ue,ne,p,l),se=new yT(P,ne,ct),q=new PT(L,St,ct,ue),Ge=new by(L,Ke,St),Qe=new Ny(L,Ke,St),St.programs=oe.programs,P.capabilities=ct,P.extensions=Ke,P.properties=b,P.renderLists=$,P.shadowMap=se,P.state=ue,P.info=St}me(),_!==sn&&(E=new Vy(_,t.width,t.height,r,s));const ae=new CT(P,L);this.xr=ae,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const y=Ke.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ke.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return De},this.setPixelRatio=function(y){y!==void 0&&(De=y,this.setSize(He,tt,!1))},this.getSize=function(y){return y.set(He,tt)},this.setSize=function(y,U,G=!0){if(ae.isPresenting){Te("WebGLRenderer: Can't change size while VR device is presenting.");return}He=y,tt=U,t.width=Math.floor(y*De),t.height=Math.floor(U*De),G===!0&&(t.style.width=y+"px",t.style.height=U+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(He*De,tt*De).floor()},this.setDrawingBufferSize=function(y,U,G){He=y,tt=U,De=G,t.width=Math.floor(y*G),t.height=Math.floor(U*G),this.setViewport(0,0,y,U)},this.setEffects=function(y){if(_===sn){Pe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let U=0;U<y.length;U++)if(y[U].isOutputPass===!0){Te("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(J)},this.getViewport=function(y){return y.copy(te)},this.setViewport=function(y,U,G,k){y.isVector4?te.set(y.x,y.y,y.z,y.w):te.set(y,U,G,k),ue.viewport(J.copy(te).multiplyScalar(De).round())},this.getScissor=function(y){return y.copy(Ce)},this.setScissor=function(y,U,G,k){y.isVector4?Ce.set(y.x,y.y,y.z,y.w):Ce.set(y,U,G,k),ue.scissor(ee.copy(Ce).multiplyScalar(De).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(y){ue.setScissorTest(Ne=y)},this.setOpaqueSort=function(y){K=y},this.setTransparentSort=function(y){ce=y},this.getClearColor=function(y){return y.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,G=!0){let k=0;if(y){let V=!1;if(F!==null){const fe=F.texture.format;V=g.has(fe)}if(V){const fe=F.texture.type,ve=m.has(fe),de=ie.getClearColor(),ye=ie.getClearAlpha(),be=de.r,Ve=de.g,Ye=de.b;ve?(S[0]=be,S[1]=Ve,S[2]=Ye,S[3]=ye,L.clearBufferuiv(L.COLOR,0,S)):(M[0]=be,M[1]=Ve,M[2]=Ye,M[3]=ye,L.clearBufferiv(L.COLOR,0,M))}else k|=L.COLOR_BUFFER_BIT}U&&(k|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(k|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&L.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),N=y},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),ie.dispose(),$.dispose(),pe.dispose(),b.dispose(),O.dispose(),ne.dispose(),re.dispose(),q.dispose(),oe.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Sc),ae.removeEventListener("sessionend",yc),_i.stop()};function Z(y){y.preventDefault(),ou("WebGLRenderer: Context Lost."),A=!0}function Me(){ou("WebGLRenderer: Context Restored."),A=!1;const y=St.autoReset,U=se.enabled,G=se.autoUpdate,k=se.needsUpdate,V=se.type;me(),St.autoReset=y,se.enabled=U,se.autoUpdate=G,se.needsUpdate=k,se.type=V}function ke(y){Pe("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Tt(y){const U=y.target;U.removeEventListener("dispose",Tt),rt(U)}function rt(y){Bn(y),b.remove(y)}function Bn(y){const U=b.get(y).programs;U!==void 0&&(U.forEach(function(G){oe.releaseProgram(G)}),y.isShaderMaterial&&oe.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,G,k,V,fe){U===null&&(U=Rt);const ve=V.isMesh&&V.matrixWorld.determinant()<0,de=Ef(y,U,G,k,V);ue.setMaterial(k,ve);let ye=G.index,be=1;if(k.wireframe===!0){if(ye=Q.getWireframeAttribute(G),ye===void 0)return;be=2}const Ve=G.drawRange,Ye=G.attributes.position;let we=Ve.start*be,st=(Ve.start+Ve.count)*be;fe!==null&&(we=Math.max(we,fe.start*be),st=Math.min(st,(fe.start+fe.count)*be)),ye!==null?(we=Math.max(we,0),st=Math.min(st,ye.count)):Ye!=null&&(we=Math.max(we,0),st=Math.min(st,Ye.count));const bt=st-we;if(bt<0||bt===1/0)return;re.setup(V,k,de,G,ye);let yt,at=Ge;if(ye!==null&&(yt=j.get(ye),at=Qe,at.setIndex(yt)),V.isMesh)k.wireframe===!0?(ue.setLineWidth(k.wireframeLinewidth*en()),at.setMode(L.LINES)):at.setMode(L.TRIANGLES);else if(V.isLine){let zt=k.linewidth;zt===void 0&&(zt=1),ue.setLineWidth(zt*en()),V.isLineSegments?at.setMode(L.LINES):V.isLineLoop?at.setMode(L.LINE_LOOP):at.setMode(L.LINE_STRIP)}else V.isPoints?at.setMode(L.POINTS):V.isSprite&&at.setMode(L.TRIANGLES);if(V.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))at.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const zt=V._multiDrawStarts,ge=V._multiDrawCounts,tn=V._multiDrawCount,Ze=ye?j.get(ye).bytesPerElement:1,on=b.get(k).currentProgram.getUniforms();for(let Mn=0;Mn<tn;Mn++)on.setValue(L,"_gl_DrawID",Mn),at.render(zt[Mn]/Ze,ge[Mn])}else if(V.isInstancedMesh)at.renderInstances(we,bt,V.count);else if(G.isInstancedBufferGeometry){const zt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ge=Math.min(G.instanceCount,zt);at.renderInstances(we,bt,ge)}else at.render(we,bt)};function yn(y,U,G){y.transparent===!0&&y.side===Cn&&y.forceSinglePass===!1?(y.side=Qt,y.needsUpdate=!0,ds(y,U,G),y.side=di,y.needsUpdate=!0,ds(y,U,G),y.side=Cn):ds(y,U,G)}this.compile=function(y,U,G=null){G===null&&(G=y),w=pe.get(G),w.init(U),x.push(w),G.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),y!==G&&y.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),w.setupLights();const k=new Set;return y.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const fe=V.material;if(fe)if(Array.isArray(fe))for(let ve=0;ve<fe.length;ve++){const de=fe[ve];yn(de,G,V),k.add(de)}else yn(fe,G,V),k.add(fe)}),w=x.pop(),k},this.compileAsync=function(y,U,G=null){const k=this.compile(y,U,G);return new Promise(V=>{function fe(){if(k.forEach(function(ve){b.get(ve).currentProgram.isReady()&&k.delete(ve)}),k.size===0){V(y);return}setTimeout(fe,10)}Ke.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let Na=null;function bf(y){Na&&Na(y)}function Sc(){_i.stop()}function yc(){_i.start()}const _i=new Xd;_i.setAnimationLoop(bf),typeof self<"u"&&_i.setContext(self),this.setAnimationLoop=function(y){Na=y,ae.setAnimationLoop(y),y===null?_i.stop():_i.start()},ae.addEventListener("sessionstart",Sc),ae.addEventListener("sessionend",yc),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){Pe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;N!==null&&N.renderStart(y,U);const G=ae.enabled===!0&&ae.isPresenting===!0,k=E!==null&&(F===null||G)&&E.begin(P,F);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(U),U=ae.getCamera()),y.isScene===!0&&y.onBeforeRender(P,y,U,F),w=pe.get(y,x.length),w.init(U),w.state.textureUnits=v.getTextureUnits(),x.push(w),it.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Ie.setFromProjectionMatrix(it,Rn,U.reversedDepth),Xe=this.localClippingEnabled,lt=_e.init(this.clippingPlanes,Xe),C=$.get(y,R.length),C.init(),R.push(C),ae.enabled===!0&&ae.isPresenting===!0){const ve=P.xr.getDepthSensingMesh();ve!==null&&Fa(ve,U,-1/0,P.sortObjects)}Fa(y,U,0,P.sortObjects),C.finish(),P.sortObjects===!0&&C.sort(K,ce),_t=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,_t&&ie.addToRenderList(C,y),this.info.render.frame++,lt===!0&&_e.beginShadows();const V=w.state.shadowsArray;if(se.render(V,y,U),lt===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset(),(k&&E.hasRenderPass())===!1){const ve=C.opaque,de=C.transmissive;if(w.setupLights(),U.isArrayCamera){const ye=U.cameras;if(de.length>0)for(let be=0,Ve=ye.length;be<Ve;be++){const Ye=ye[be];Tc(ve,de,y,Ye)}_t&&ie.render(y);for(let be=0,Ve=ye.length;be<Ve;be++){const Ye=ye[be];Mc(C,y,Ye,Ye.viewport)}}else de.length>0&&Tc(ve,de,y,U),_t&&ie.render(y),Mc(C,y,U)}F!==null&&W===0&&(v.updateMultisampleRenderTarget(F),v.updateRenderTargetMipmap(F)),k&&E.end(P),y.isScene===!0&&y.onAfterRender(P,y,U),re.resetDefaultState(),B=-1,z=null,x.pop(),x.length>0?(w=x[x.length-1],v.setTextureUnits(w.state.textureUnits),lt===!0&&_e.setGlobalState(P.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?C=R[R.length-1]:C=null,N!==null&&N.renderEnd()};function Fa(y,U,G,k){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)G=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLightProbeGrid)w.pushLightProbeGrid(y);else if(y.isLight)w.pushLight(y),y.castShadow&&w.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Ie.intersectsSprite(y)){k&&je.setFromMatrixPosition(y.matrixWorld).applyMatrix4(it);const ve=ne.update(y),de=y.material;de.visible&&C.push(y,ve,de,G,je.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Ie.intersectsObject(y))){const ve=ne.update(y),de=y.material;if(k&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),je.copy(y.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),je.copy(ve.boundingSphere.center)),je.applyMatrix4(y.matrixWorld).applyMatrix4(it)),Array.isArray(de)){const ye=ve.groups;for(let be=0,Ve=ye.length;be<Ve;be++){const Ye=ye[be],we=de[Ye.materialIndex];we&&we.visible&&C.push(y,ve,we,G,je.z,Ye)}}else de.visible&&C.push(y,ve,de,G,je.z,null)}}const fe=y.children;for(let ve=0,de=fe.length;ve<de;ve++)Fa(fe[ve],U,G,k)}function Mc(y,U,G,k){const{opaque:V,transmissive:fe,transparent:ve}=y;w.setupLightsView(G),lt===!0&&_e.setGlobalState(P.clippingPlanes,G),k&&ue.viewport(J.copy(k)),V.length>0&&hs(V,U,G),fe.length>0&&hs(fe,U,G),ve.length>0&&hs(ve,U,G),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function Tc(y,U,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[k.id]===void 0){const we=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[k.id]=new Ln(1,1,{generateMipmaps:!0,type:we?jn:sn,minFilter:Ei,samples:Math.max(4,ct.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Be.workingColorSpace})}const fe=w.state.transmissionRenderTarget[k.id],ve=k.viewport||J;fe.setSize(ve.z*P.transmissionResolutionScale,ve.w*P.transmissionResolutionScale);const de=P.getRenderTarget(),ye=P.getActiveCubeFace(),be=P.getActiveMipmapLevel();P.setRenderTarget(fe),P.getClearColor(xe),Se=P.getClearAlpha(),Se<1&&P.setClearColor(16777215,.5),P.clear(),_t&&ie.render(G);const Ve=P.toneMapping;P.toneMapping=Pn;const Ye=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),w.setupLightsView(k),lt===!0&&_e.setGlobalState(P.clippingPlanes,k),hs(y,G,k),v.updateMultisampleRenderTarget(fe),v.updateRenderTargetMipmap(fe),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let st=0,bt=U.length;st<bt;st++){const yt=U[st],{object:at,geometry:zt,material:ge,group:tn}=yt;if(ge.side===Cn&&at.layers.test(k.layers)){const Ze=ge.side;ge.side=Qt,ge.needsUpdate=!0,bc(at,G,k,zt,ge,tn),ge.side=Ze,ge.needsUpdate=!0,we=!0}}we===!0&&(v.updateMultisampleRenderTarget(fe),v.updateRenderTargetMipmap(fe))}P.setRenderTarget(de,ye,be),P.setClearColor(xe,Se),Ye!==void 0&&(k.viewport=Ye),P.toneMapping=Ve}function hs(y,U,G){const k=U.isScene===!0?U.overrideMaterial:null;for(let V=0,fe=y.length;V<fe;V++){const ve=y[V],{object:de,geometry:ye,group:be}=ve;let Ve=ve.material;Ve.allowOverride===!0&&k!==null&&(Ve=k),de.layers.test(G.layers)&&bc(de,U,G,ye,Ve,be)}}function bc(y,U,G,k,V,fe){y.onBeforeRender(P,U,G,k,V,fe),y.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),V.onBeforeRender(P,U,G,k,y,fe),V.transparent===!0&&V.side===Cn&&V.forceSinglePass===!1?(V.side=Qt,V.needsUpdate=!0,P.renderBufferDirect(G,U,k,V,y,fe),V.side=di,V.needsUpdate=!0,P.renderBufferDirect(G,U,k,V,y,fe),V.side=Cn):P.renderBufferDirect(G,U,k,V,y,fe),y.onAfterRender(P,U,G,k,V,fe)}function ds(y,U,G){U.isScene!==!0&&(U=Rt);const k=b.get(y),V=w.state.lights,fe=w.state.shadowsArray,ve=V.state.version,de=oe.getParameters(y,V.state,fe,U,G,w.state.lightProbeGridArray),ye=oe.getProgramCacheKey(de);let be=k.programs;k.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?U.environment:null,k.fog=U.fog;const Ve=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;k.envMap=O.get(y.envMap||k.environment,Ve),k.envMapRotation=k.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,be===void 0&&(y.addEventListener("dispose",Tt),be=new Map,k.programs=be);let Ye=be.get(ye);if(Ye!==void 0){if(k.currentProgram===Ye&&k.lightsStateVersion===ve)return Ec(y,de),Ye}else de.uniforms=oe.getUniforms(y),N!==null&&y.isNodeMaterial&&N.build(y,G,de),y.onBeforeCompile(de,P),Ye=oe.acquireProgram(de,ye),be.set(ye,Ye),k.uniforms=de.uniforms;const we=k.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(we.clippingPlanes=_e.uniform),Ec(y,de),k.needsLights=Cf(y),k.lightsStateVersion=ve,k.needsLights&&(we.ambientLightColor.value=V.state.ambient,we.lightProbe.value=V.state.probe,we.directionalLights.value=V.state.directional,we.directionalLightShadows.value=V.state.directionalShadow,we.spotLights.value=V.state.spot,we.spotLightShadows.value=V.state.spotShadow,we.rectAreaLights.value=V.state.rectArea,we.ltc_1.value=V.state.rectAreaLTC1,we.ltc_2.value=V.state.rectAreaLTC2,we.pointLights.value=V.state.point,we.pointLightShadows.value=V.state.pointShadow,we.hemisphereLights.value=V.state.hemi,we.directionalShadowMatrix.value=V.state.directionalShadowMatrix,we.spotLightMatrix.value=V.state.spotLightMatrix,we.spotLightMap.value=V.state.spotLightMap,we.pointShadowMatrix.value=V.state.pointShadowMatrix),k.lightProbeGrid=w.state.lightProbeGridArray.length>0,k.currentProgram=Ye,k.uniformsList=null,Ye}function wc(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=na.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function Ec(y,U){const G=b.get(y);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function wf(y,U){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;T.setFromMatrixPosition(U.matrixWorld);for(let G=0,k=y.length;G<k;G++){const V=y[G];if(V.texture!==null&&V.boundingBox.containsPoint(T))return V}return null}function Ef(y,U,G,k,V){U.isScene!==!0&&(U=Rt),v.resetTextureUnits();const fe=U.fog,ve=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?U.environment:null,de=F===null?P.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Be.workingColorSpace,ye=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,be=O.get(k.envMap||ve,ye),Ve=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ye=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),we=!!G.morphAttributes.position,st=!!G.morphAttributes.normal,bt=!!G.morphAttributes.color;let yt=Pn;k.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(yt=P.toneMapping);const at=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,zt=at!==void 0?at.length:0,ge=b.get(k),tn=w.state.lights;if(lt===!0&&(Xe===!0||y!==z)){const ut=y===z&&k.id===B;_e.setState(k,y,ut)}let Ze=!1;k.version===ge.__version?(ge.needsLights&&ge.lightsStateVersion!==tn.state.version||ge.outputColorSpace!==de||V.isBatchedMesh&&ge.batching===!1||!V.isBatchedMesh&&ge.batching===!0||V.isBatchedMesh&&ge.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&ge.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&ge.instancing===!1||!V.isInstancedMesh&&ge.instancing===!0||V.isSkinnedMesh&&ge.skinning===!1||!V.isSkinnedMesh&&ge.skinning===!0||V.isInstancedMesh&&ge.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&ge.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&ge.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&ge.instancingMorph===!1&&V.morphTexture!==null||ge.envMap!==be||k.fog===!0&&ge.fog!==fe||ge.numClippingPlanes!==void 0&&(ge.numClippingPlanes!==_e.numPlanes||ge.numIntersection!==_e.numIntersection)||ge.vertexAlphas!==Ve||ge.vertexTangents!==Ye||ge.morphTargets!==we||ge.morphNormals!==st||ge.morphColors!==bt||ge.toneMapping!==yt||ge.morphTargetsCount!==zt||!!ge.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,ge.__version=k.version);let on=ge.currentProgram;Ze===!0&&(on=ds(k,U,V),N&&k.isNodeMaterial&&N.onUpdateProgram(k,on,ge));let Mn=!1,Zn=!1,Oi=!1;const ot=on.getUniforms(),wt=ge.uniforms;if(ue.useProgram(on.program)&&(Mn=!0,Zn=!0,Oi=!0),k.id!==B&&(B=k.id,Zn=!0),ge.needsLights){const ut=wf(w.state.lightProbeGridArray,V);ge.lightProbeGrid!==ut&&(ge.lightProbeGrid=ut,Zn=!0)}if(Mn||z!==y){ue.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ot.setValue(L,"projectionMatrix",y.projectionMatrix),ot.setValue(L,"viewMatrix",y.matrixWorldInverse);const Qn=ot.map.cameraPosition;Qn!==void 0&&Qn.setValue(L,ft.setFromMatrixPosition(y.matrixWorld)),ct.logarithmicDepthBuffer&&ot.setValue(L,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ot.setValue(L,"isOrthographic",y.isOrthographicCamera===!0),z!==y&&(z=y,Zn=!0,Oi=!0)}if(ge.needsLights&&(tn.state.directionalShadowMap.length>0&&ot.setValue(L,"directionalShadowMap",tn.state.directionalShadowMap,v),tn.state.spotShadowMap.length>0&&ot.setValue(L,"spotShadowMap",tn.state.spotShadowMap,v),tn.state.pointShadowMap.length>0&&ot.setValue(L,"pointShadowMap",tn.state.pointShadowMap,v)),V.isSkinnedMesh){ot.setOptional(L,V,"bindMatrix"),ot.setOptional(L,V,"bindMatrixInverse");const ut=V.skeleton;ut&&(ut.boneTexture===null&&ut.computeBoneTexture(),ot.setValue(L,"boneTexture",ut.boneTexture,v))}V.isBatchedMesh&&(ot.setOptional(L,V,"batchingTexture"),ot.setValue(L,"batchingTexture",V._matricesTexture,v),ot.setOptional(L,V,"batchingIdTexture"),ot.setValue(L,"batchingIdTexture",V._indirectTexture,v),ot.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&ot.setValue(L,"batchingColorTexture",V._colorsTexture,v));const Jn=G.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&Fe.update(V,G,on),(Zn||ge.receiveShadow!==V.receiveShadow)&&(ge.receiveShadow=V.receiveShadow,ot.setValue(L,"receiveShadow",V.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&U.environment!==null&&(wt.envMapIntensity.value=U.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=DT()),Zn){if(ot.setValue(L,"toneMappingExposure",P.toneMappingExposure),ge.needsLights&&Af(wt,Oi),fe&&k.fog===!0&&Y.refreshFogUniforms(wt,fe),Y.refreshMaterialUniforms(wt,k,De,tt,w.state.transmissionRenderTarget[y.id]),ge.needsLights&&ge.lightProbeGrid){const ut=ge.lightProbeGrid;wt.probesSH.value=ut.texture,wt.probesMin.value.copy(ut.boundingBox.min),wt.probesMax.value.copy(ut.boundingBox.max),wt.probesResolution.value.copy(ut.resolution)}na.upload(L,wc(ge),wt,v)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(na.upload(L,wc(ge),wt,v),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ot.setValue(L,"center",V.center),ot.setValue(L,"modelViewMatrix",V.modelViewMatrix),ot.setValue(L,"normalMatrix",V.normalMatrix),ot.setValue(L,"modelMatrix",V.matrixWorld),k.uniformsGroups!==void 0){const ut=k.uniformsGroups;for(let Qn=0,Bi=ut.length;Qn<Bi;Qn++){const Ac=ut[Qn];q.update(Ac,on),q.bind(Ac,on)}}return on}function Af(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function Cf(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(y,U,G){const k=b.get(y);k.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),b.get(y.texture).__webglTexture=U,b.get(y.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:G,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){const G=b.get(y);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0};const Rf=L.createFramebuffer();this.setRenderTarget=function(y,U=0,G=0){F=y,H=U,W=G;let k=null,V=!1,fe=!1;if(y){const de=b.get(y);if(de.__useDefaultFramebuffer!==void 0){ue.bindFramebuffer(L.FRAMEBUFFER,de.__webglFramebuffer),J.copy(y.viewport),ee.copy(y.scissor),le=y.scissorTest,ue.viewport(J),ue.scissor(ee),ue.setScissorTest(le),B=-1;return}else if(de.__webglFramebuffer===void 0)v.setupRenderTarget(y);else if(de.__hasExternalTextures)v.rebindTextures(y,b.get(y.texture).__webglTexture,b.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ve=y.depthTexture;if(de.__boundDepthTexture!==Ve){if(Ve!==null&&b.has(Ve)&&(y.width!==Ve.image.width||y.height!==Ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");v.setupDepthRenderbuffer(y)}}const ye=y.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(fe=!0);const be=b.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(be[U])?k=be[U][G]:k=be[U],V=!0):y.samples>0&&v.useMultisampledRTT(y)===!1?k=b.get(y).__webglMultisampledFramebuffer:Array.isArray(be)?k=be[G]:k=be,J.copy(y.viewport),ee.copy(y.scissor),le=y.scissorTest}else J.copy(te).multiplyScalar(De).floor(),ee.copy(Ce).multiplyScalar(De).floor(),le=Ne;if(G!==0&&(k=Rf),ue.bindFramebuffer(L.FRAMEBUFFER,k)&&ue.drawBuffers(y,k),ue.viewport(J),ue.scissor(ee),ue.setScissorTest(le),V){const de=b.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,de.__webglTexture,G)}else if(fe){const de=U;for(let ye=0;ye<y.textures.length;ye++){const be=b.get(y.textures[ye]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+ye,be.__webglTexture,G,de)}}else if(y!==null&&G!==0){const de=b.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,de.__webglTexture,G)}B=-1},this.readRenderTargetPixels=function(y,U,G,k,V,fe,ve,de=0){if(!(y&&y.isWebGLRenderTarget)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=b.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){ue.bindFramebuffer(L.FRAMEBUFFER,ye);try{const be=y.textures[de],Ve=be.format,Ye=be.type;if(y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+de),!ct.textureFormatReadable(Ve)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ct.textureTypeReadable(Ye)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-k&&G>=0&&G<=y.height-V&&L.readPixels(U,G,k,V,I.convert(Ve),I.convert(Ye),fe)}finally{const be=F!==null?b.get(F).__webglFramebuffer:null;ue.bindFramebuffer(L.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(y,U,G,k,V,fe,ve,de=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=b.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye)if(U>=0&&U<=y.width-k&&G>=0&&G<=y.height-V){ue.bindFramebuffer(L.FRAMEBUFFER,ye);const be=y.textures[de],Ve=be.format,Ye=be.type;if(y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+de),!ct.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ct.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const we=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,we),L.bufferData(L.PIXEL_PACK_BUFFER,fe.byteLength,L.STREAM_READ),L.readPixels(U,G,k,V,I.convert(Ve),I.convert(Ye),0);const st=F!==null?b.get(F).__webglFramebuffer:null;ue.bindFramebuffer(L.FRAMEBUFFER,st);const bt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await z0(L,bt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,we),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,fe),L.deleteBuffer(we),L.deleteSync(bt),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,G=0){const k=Math.pow(2,-G),V=Math.floor(y.image.width*k),fe=Math.floor(y.image.height*k),ve=U!==null?U.x:0,de=U!==null?U.y:0;v.setTexture2D(y,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,ve,de,V,fe),ue.unbindTexture()};const If=L.createFramebuffer(),Pf=L.createFramebuffer();this.copyTextureToTexture=function(y,U,G=null,k=null,V=0,fe=0){let ve,de,ye,be,Ve,Ye,we,st,bt;const yt=y.isCompressedTexture?y.mipmaps[fe]:y.image;if(G!==null)ve=G.max.x-G.min.x,de=G.max.y-G.min.y,ye=G.isBox3?G.max.z-G.min.z:1,be=G.min.x,Ve=G.min.y,Ye=G.isBox3?G.min.z:0;else{const wt=Math.pow(2,-V);ve=Math.floor(yt.width*wt),de=Math.floor(yt.height*wt),y.isDataArrayTexture?ye=yt.depth:y.isData3DTexture?ye=Math.floor(yt.depth*wt):ye=1,be=0,Ve=0,Ye=0}k!==null?(we=k.x,st=k.y,bt=k.z):(we=0,st=0,bt=0);const at=I.convert(U.format),zt=I.convert(U.type);let ge;U.isData3DTexture?(v.setTexture3D(U,0),ge=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(v.setTexture2DArray(U,0),ge=L.TEXTURE_2D_ARRAY):(v.setTexture2D(U,0),ge=L.TEXTURE_2D),ue.activeTexture(L.TEXTURE0),ue.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),ue.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),ue.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const tn=ue.getParameter(L.UNPACK_ROW_LENGTH),Ze=ue.getParameter(L.UNPACK_IMAGE_HEIGHT),on=ue.getParameter(L.UNPACK_SKIP_PIXELS),Mn=ue.getParameter(L.UNPACK_SKIP_ROWS),Zn=ue.getParameter(L.UNPACK_SKIP_IMAGES);ue.pixelStorei(L.UNPACK_ROW_LENGTH,yt.width),ue.pixelStorei(L.UNPACK_IMAGE_HEIGHT,yt.height),ue.pixelStorei(L.UNPACK_SKIP_PIXELS,be),ue.pixelStorei(L.UNPACK_SKIP_ROWS,Ve),ue.pixelStorei(L.UNPACK_SKIP_IMAGES,Ye);const Oi=y.isDataArrayTexture||y.isData3DTexture,ot=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const wt=b.get(y),Jn=b.get(U),ut=b.get(wt.__renderTarget),Qn=b.get(Jn.__renderTarget);ue.bindFramebuffer(L.READ_FRAMEBUFFER,ut.__webglFramebuffer),ue.bindFramebuffer(L.DRAW_FRAMEBUFFER,Qn.__webglFramebuffer);for(let Bi=0;Bi<ye;Bi++)Oi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,b.get(y).__webglTexture,V,Ye+Bi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,b.get(U).__webglTexture,fe,bt+Bi)),L.blitFramebuffer(be,Ve,ve,de,we,st,ve,de,L.DEPTH_BUFFER_BIT,L.NEAREST);ue.bindFramebuffer(L.READ_FRAMEBUFFER,null),ue.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(V!==0||y.isRenderTargetTexture||b.has(y)){const wt=b.get(y),Jn=b.get(U);ue.bindFramebuffer(L.READ_FRAMEBUFFER,If),ue.bindFramebuffer(L.DRAW_FRAMEBUFFER,Pf);for(let ut=0;ut<ye;ut++)Oi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,wt.__webglTexture,V,Ye+ut):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,wt.__webglTexture,V),ot?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Jn.__webglTexture,fe,bt+ut):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Jn.__webglTexture,fe),V!==0?L.blitFramebuffer(be,Ve,ve,de,we,st,ve,de,L.COLOR_BUFFER_BIT,L.NEAREST):ot?L.copyTexSubImage3D(ge,fe,we,st,bt+ut,be,Ve,ve,de):L.copyTexSubImage2D(ge,fe,we,st,be,Ve,ve,de);ue.bindFramebuffer(L.READ_FRAMEBUFFER,null),ue.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ot?y.isDataTexture||y.isData3DTexture?L.texSubImage3D(ge,fe,we,st,bt,ve,de,ye,at,zt,yt.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(ge,fe,we,st,bt,ve,de,ye,at,yt.data):L.texSubImage3D(ge,fe,we,st,bt,ve,de,ye,at,zt,yt):y.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,fe,we,st,ve,de,at,zt,yt.data):y.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,fe,we,st,yt.width,yt.height,at,yt.data):L.texSubImage2D(L.TEXTURE_2D,fe,we,st,ve,de,at,zt,yt);ue.pixelStorei(L.UNPACK_ROW_LENGTH,tn),ue.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ze),ue.pixelStorei(L.UNPACK_SKIP_PIXELS,on),ue.pixelStorei(L.UNPACK_SKIP_ROWS,Mn),ue.pixelStorei(L.UNPACK_SKIP_IMAGES,Zn),fe===0&&U.generateMipmaps&&L.generateMipmap(ge),ue.unbindTexture()},this.initRenderTarget=function(y){b.get(y).__webglFramebuffer===void 0&&v.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?v.setTextureCube(y,0):y.isData3DTexture?v.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?v.setTexture2DArray(y,0):v.setTexture2D(y,0),ue.unbindTexture()},this.resetState=function(){H=0,W=0,F=null,ue.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Be._getDrawingBufferColorSpace(e),t.unpackColorSpace=Be._getUnpackColorSpace()}}const NT=5;function hc(i){const e=Number.isFinite(i)&&i>0?i:1,t=NT/2,n=t*e;return{left:-n,right:n,top:t,bottom:-t}}class FT{apply(e,t,n){const r=hc(n);e.left=r.left,e.right=r.right,e.top=r.top,e.bottom=r.bottom,e.position.set(t.position.x,t.position.y,t.position.z),t.target!=null&&e.lookAt(t.target.x,t.target.y,t.target.z),e.updateProjectionMatrix()}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var un=Uint8Array,or=Uint16Array,OT=Int32Array,Qd=new un([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ef=new un([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),BT=new un([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),tf=function(i,e){for(var t=new or(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new OT(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return{b:t,r}},nf=tf(Qd,2),rf=nf.b,kT=nf.r;rf[28]=258,kT[258]=28;var VT=tf(ef,0),zT=VT.b,Ll=new or(32768);for(var pt=0;pt<32768;++pt){var oi=(pt&43690)>>1|(pt&21845)<<1;oi=(oi&52428)>>2|(oi&13107)<<2,oi=(oi&61680)>>4|(oi&3855)<<4,Ll[pt]=((oi&65280)>>8|(oi&255)<<8)>>1}var zr=(function(i,e,t){for(var n=i.length,r=0,s=new or(e);r<n;++r)i[r]&&++s[i[r]-1];var a=new or(e);for(r=1;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new or(1<<e);var l=15-e;for(r=0;r<n;++r)if(i[r])for(var c=r<<4|i[r],h=e-i[r],u=a[i[r]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)o[Ll[u]>>l]=c}else for(o=new or(n),r=0;r<n;++r)i[r]&&(o[r]=Ll[a[i[r]-1]++]>>15-i[r]);return o}),us=new un(288);for(var pt=0;pt<144;++pt)us[pt]=8;for(var pt=144;pt<256;++pt)us[pt]=9;for(var pt=256;pt<280;++pt)us[pt]=7;for(var pt=280;pt<288;++pt)us[pt]=8;var sf=new un(32);for(var pt=0;pt<32;++pt)sf[pt]=5;var GT=zr(us,9,1),HT=zr(sf,5,1),Ao=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},gn=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},Co=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},WT=function(i){return(i+7)/8|0},XT=function(i,e,t){return(t==null||t>i.length)&&(t=i.length),new un(i.subarray(e,t))},YT=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],_n=function(i,e,t){var n=new Error(e||YT[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,_n),!t)throw n;return n},qT=function(i,e,t,n){var r=i.length,s=0;if(!r||e.f&&!e.l)return t||new un(0);var a=!t,o=a||e.i!=2,l=e.i;a&&(t=new un(r*3));var c=function(Ie){var lt=t.length;if(Ie>lt){var Xe=new un(Math.max(lt*2,Ie));Xe.set(t),t=Xe}},h=e.f||0,u=e.p||0,d=e.b||0,f=e.l,p=e.d,_=e.m,g=e.n,m=r*8;do{if(!f){h=gn(i,u,1);var S=gn(i,u+1,3);if(u+=3,S)if(S==1)f=GT,p=HT,_=9,g=5;else if(S==2){var w=gn(i,u,31)+257,R=gn(i,u+10,15)+4,x=w+gn(i,u+5,31)+1;u+=14;for(var E=new un(x),P=new un(19),A=0;A<R;++A)P[BT[A]]=gn(i,u+A*3,7);u+=R*3;for(var N=Ao(P),H=(1<<N)-1,W=zr(P,N,1),A=0;A<x;){var F=W[gn(i,u,H)];u+=F&15;var M=F>>4;if(M<16)E[A++]=M;else{var B=0,z=0;for(M==16?(z=3+gn(i,u,3),u+=2,B=E[A-1]):M==17?(z=3+gn(i,u,7),u+=3):M==18&&(z=11+gn(i,u,127),u+=7);z--;)E[A++]=B}}var J=E.subarray(0,w),ee=E.subarray(w);_=Ao(J),g=Ao(ee),f=zr(J,_,1),p=zr(ee,g,1)}else _n(1);else{var M=WT(u)+4,T=i[M-4]|i[M-3]<<8,C=M+T;if(C>r){l&&_n(0);break}o&&c(d+T),t.set(i.subarray(M,C),d),e.b=d+=T,e.p=u=C*8,e.f=h;continue}if(u>m){l&&_n(0);break}}o&&c(d+131072);for(var le=(1<<_)-1,xe=(1<<g)-1,Se=u;;Se=u){var B=f[Co(i,u)&le],He=B>>4;if(u+=B&15,u>m){l&&_n(0);break}if(B||_n(2),He<256)t[d++]=He;else if(He==256){Se=u,f=null;break}else{var tt=He-254;if(He>264){var A=He-257,De=Qd[A];tt=gn(i,u,(1<<De)-1)+rf[A],u+=De}var K=p[Co(i,u)&xe],ce=K>>4;K||_n(3),u+=K&15;var ee=zT[ce];if(ce>3){var De=ef[ce];ee+=Co(i,u)&(1<<De)-1,u+=De}if(u>m){l&&_n(0);break}o&&c(d+131072);var te=d+tt;if(d<ee){var Ce=s-ee,Ne=Math.min(ee,te);for(Ce+d<0&&_n(3);d<Ne;++d)t[d]=n[Ce+d]}for(;d<te;++d)t[d]=t[d-ee]}}e.l=f,e.p=Se,e.b=d,e.f=h,f&&(h=1,e.m=_,e.d=p,e.n=g)}while(!h);return d!=t.length&&a?XT(t,0,d):t.subarray(0,d)},jT=new un(0),KT=function(i,e){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&_n(6,"invalid zlib data"),(i[1]>>5&1)==1&&_n(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};function $T(i,e){return qT(i.subarray(KT(i),-4),{i:2},e,e)}var ZT=typeof TextDecoder<"u"&&new TextDecoder,JT=0;try{ZT.decode(jT,{stream:!0}),JT=1}catch{}function af(i,e,t){const n=t.length-i-1;if(e>=t[n])return n-1;if(e<=t[i])return i;let r=i,s=n,a=Math.floor((r+s)/2);for(;e<t[a]||e>=t[a+1];)e<t[a]?s=a:r=a,a=Math.floor((r+s)/2);return a}function QT(i,e,t,n){const r=[],s=[],a=[];r[0]=1;for(let o=1;o<=t;++o){s[o]=e-n[i+1-o],a[o]=n[i+o]-e;let l=0;for(let c=0;c<o;++c){const h=a[c+1],u=s[o-c],d=r[c]/(h+u);r[c]=l+h*d,l=u*d}r[o]=l}return r}function eb(i,e,t,n){const r=af(i,n,e),s=QT(r,n,i,e),a=new et(0,0,0,0);for(let o=0;o<=i;++o){const l=t[r-i+o],c=s[o],h=l.w*c;a.x+=l.x*h,a.y+=l.y*h,a.z+=l.z*h,a.w+=l.w*c}return a}function tb(i,e,t,n,r){const s=[];for(let u=0;u<=t;++u)s[u]=0;const a=[];for(let u=0;u<=n;++u)a[u]=s.slice(0);const o=[];for(let u=0;u<=t;++u)o[u]=s.slice(0);o[0][0]=1;const l=s.slice(0),c=s.slice(0);for(let u=1;u<=t;++u){l[u]=e-r[i+1-u],c[u]=r[i+u]-e;let d=0;for(let f=0;f<u;++f){const p=c[f+1],_=l[u-f];o[u][f]=p+_;const g=o[f][u-1]/o[u][f];o[f][u]=d+p*g,d=_*g}o[u][u]=d}for(let u=0;u<=t;++u)a[0][u]=o[u][t];for(let u=0;u<=t;++u){let d=0,f=1;const p=[];for(let _=0;_<=t;++_)p[_]=s.slice(0);p[0][0]=1;for(let _=1;_<=n;++_){let g=0;const m=u-_,S=t-_;u>=_&&(p[f][0]=p[d][0]/o[S+1][m],g=p[f][0]*o[m][S]);const M=m>=-1?1:-m,T=u-1<=S?_-1:t-u;for(let w=M;w<=T;++w)p[f][w]=(p[d][w]-p[d][w-1])/o[S+1][m+w],g+=p[f][w]*o[m+w][S];u<=S&&(p[f][_]=-p[d][_-1]/o[S+1][u],g+=p[f][_]*o[u][S]),a[_][u]=g;const C=d;d=f,f=C}}let h=t;for(let u=1;u<=n;++u){for(let d=0;d<=t;++d)a[u][d]*=h;h*=t-u}return a}function nb(i,e,t,n,r){const s=r<i?r:i,a=[],o=af(i,n,e),l=tb(o,n,i,s,e),c=[];for(let h=0;h<t.length;++h){const u=t[h].clone(),d=u.w;u.x*=d,u.y*=d,u.z*=d,c[h]=u}for(let h=0;h<=s;++h){const u=c[o-i].clone().multiplyScalar(l[h][0]);for(let d=1;d<=i;++d)u.add(c[o-i+d].clone().multiplyScalar(l[h][d]));a[h]=u}for(let h=s+1;h<=r+1;++h)a[h]=new et(0,0,0);return a}function ib(i,e){let t=1;for(let r=2;r<=i;++r)t*=r;let n=1;for(let r=2;r<=e;++r)n*=r;for(let r=2;r<=i-e;++r)n*=r;return t/n}function rb(i){const e=i.length,t=[],n=[];for(let s=0;s<e;++s){const a=i[s];t[s]=new D(a.x,a.y,a.z),n[s]=a.w}const r=[];for(let s=0;s<e;++s){const a=t[s].clone();for(let o=1;o<=s;++o)a.sub(r[s-o].clone().multiplyScalar(ib(s,o)*n[o]));r[s]=a.divideScalar(n[0])}return r}function sb(i,e,t,n,r){const s=nb(i,e,t,n,r);return rb(s)}class ab extends L_{constructor(e,t,n,r,s){super();const a=t?t.length-1:0,o=n?n.length:0;this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=r||0,this.endKnot=s||a;for(let l=0;l<o;++l){const c=n[l];this.controlPoints[l]=new et(c.x,c.y,c.z,c.w)}}getPoint(e,t=new D){const n=t,r=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=eb(this.degree,this.knots,this.controlPoints,r);return s.w!==1&&s.divideScalar(s.w),n.set(s.x,s.y,s.z)}getTangent(e,t=new D){const n=t,r=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),s=sb(this.degree,this.knots,this.controlPoints,r,1);return n.copy(s[1]).normalize(),n}toJSON(){const e=super.toJSON();return e.degree=this.degree,e.knots=[...this.knots],e.controlPoints=this.controlPoints.map(t=>t.toArray()),e.startKnot=this.startKnot,e.endKnot=this.endKnot,e}fromJSON(e){return super.fromJSON(e),this.degree=e.degree,this.knots=[...e.knots],this.controlPoints=e.controlPoints.map(t=>new et(t[0],t[1],t[2],t[3])),this.startKnot=e.startKnot,this.endKnot=e.endKnot,this}}let ze,Et,Ot;class ob extends Di{constructor(e){super(e)}load(e,t,n,r){const s=this,a=s.path===""?Tv.extractUrlBase(e):s.path,o=new _v(this.manager);o.setPath(s.path),o.setResponseType("arraybuffer"),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(l){try{t(s.parse(l,a))}catch(c){r?r(c):console.error(c),s.manager.itemError(e)}},n,r)}parse(e,t){if(fb(e))ze=new db().parse(e);else{const r=cf(e);if(!pb(r))throw new Error("THREE.FBXLoader: Unknown format.");if(ph(r)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+ph(r));ze=new hb().parse(r)}const n=new zd(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new lb(n,this.manager).parse(ze)}}class lb{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){Et=this.parseConnections();const e=this.parseImages(),t=this.parseTextures(e),n=this.parseMaterials(t),r=this.parseDeformers(),s=new cb().parse(r);return this.parseScene(r,s,n),Ot}parseConnections(){const e=new Map;return"Connections"in ze&&ze.Connections.connections.forEach(function(n){const r=n[0],s=n[1],a=n[2];e.has(r)||e.set(r,{parents:[],children:[]});const o={ID:s,relationship:a};e.get(r).parents.push(o),e.has(s)||e.set(s,{parents:[],children:[]});const l={ID:r,relationship:a};e.get(s).children.push(l)}),e}parseImages(){const e={},t={};if("Video"in ze.Objects){const n=ze.Objects.Video;for(const r in n){const s=n[r],a=parseInt(r);if(e[a]=s.RelativeFilename||s.Filename,"Content"in s){const o=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,l=typeof s.Content=="string"&&s.Content!=="";if(o||l){const c=this.parseImage(n[r]);t[s.RelativeFilename||s.Filename]=c}}}}for(const n in e){const r=e[n];t[r]!==void 0?e[n]=t[r]:e[n]=e[n].split("\\").pop()}return e}parseImage(e){const t=e.Content,n=e.RelativeFilename||e.Filename,r=n.slice(n.lastIndexOf(".")+1).toLowerCase();let s;switch(r){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),s="image/tga";break;case"webp":s="image/webp";break;default:console.warn('FBXLoader: Image type "'+r+'" is not supported.');return}if(typeof t=="string")return"data:"+s+";base64,"+t;{const a=new Uint8Array(t);return window.URL.createObjectURL(new Blob([a],{type:s}))}}parseTextures(e){const t=new Map;if("Texture"in ze.Objects){const n=ze.Objects.Texture;for(const r in n){const s=this.parseTexture(n[r],e);t.set(parseInt(r),s)}}return t}parseTexture(e,t){const n=this.loadTexture(e,t);n.ID=e.id,n.name=e.attrName;const r=e.WrapModeU,s=e.WrapModeV,a=r!==void 0?r.value:0,o=s!==void 0?s.value:0;if(n.wrapS=a===0?Wr:vn,n.wrapT=o===0?Wr:vn,"Scaling"in e){const l=e.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in e){const l=e.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(e,t){const n=e.FileName.split(".").pop().toLowerCase();let r=this.manager.getHandler(`.${n}`);r===null&&(r=this.textureLoader);const s=r.path;s||r.setPath(this.textureLoader.path);const a=Et.get(e.id).children;let o;if(a!==void 0&&a.length>0&&t[a[0].ID]!==void 0&&(o=t[a[0].ID],(o.indexOf("blob:")===0||o.indexOf("data:")===0)&&r.setPath(void 0)),o===void 0)return console.warn("FBXLoader: Undefined filename, creating placeholder texture."),new Ft;const l=r.load(o);return r.setPath(s),l}parseMaterials(e){const t=new Map;if("Material"in ze.Objects){const n=ze.Objects.Material;for(const r in n){const s=this.parseMaterial(n[r],e);s!==null&&t.set(parseInt(r),s)}}return t}parseMaterial(e,t){const n=e.id,r=e.attrName;let s=e.ShadingModel;if(typeof s=="object"&&(s=s.value),!Et.has(n))return null;const a=this.parseParameters(e,t,n);let o;switch(s.toLowerCase()){case"phong":o=new Hs;break;case"lambert":o=new nv;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),o=new Hs;break}return o.setValues(a),o.name=r,o}parseParameters(e,t,n){const r={};e.BumpFactor&&(r.bumpScale=e.BumpFactor.value),e.Diffuse?r.color=Be.colorSpaceToWorking(new Ue().fromArray(e.Diffuse.value),ht):e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(r.color=Be.colorSpaceToWorking(new Ue().fromArray(e.DiffuseColor.value),ht)),e.DisplacementFactor&&(r.displacementScale=e.DisplacementFactor.value),e.Emissive?r.emissive=Be.colorSpaceToWorking(new Ue().fromArray(e.Emissive.value),ht):e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(r.emissive=Be.colorSpaceToWorking(new Ue().fromArray(e.EmissiveColor.value),ht)),e.EmissiveFactor&&(r.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),r.opacity=1-(e.TransparencyFactor?parseFloat(e.TransparencyFactor.value):0),(r.opacity===1||r.opacity===0)&&(r.opacity=e.Opacity?parseFloat(e.Opacity.value):null,r.opacity===null&&(r.opacity=1)),r.opacity<1&&(r.transparent=!0),e.ReflectionFactor&&(r.reflectivity=e.ReflectionFactor.value),e.Shininess&&(r.shininess=e.Shininess.value),e.Specular?r.specular=Be.colorSpaceToWorking(new Ue().fromArray(e.Specular.value),ht):e.SpecularColor&&e.SpecularColor.type==="Color"&&(r.specular=Be.colorSpaceToWorking(new Ue().fromArray(e.SpecularColor.value),ht));const s=this;return Et.get(n).children.forEach(function(a){const o=a.relationship;switch(o){case"Bump":r.bumpMap=s.getTexture(t,a.ID);break;case"Maya|TEX_ao_map":r.aoMap=s.getTexture(t,a.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":r.map=s.getTexture(t,a.ID),r.map!==void 0&&(r.map.colorSpace=ht);break;case"DisplacementColor":r.displacementMap=s.getTexture(t,a.ID);break;case"EmissiveColor":r.emissiveMap=s.getTexture(t,a.ID),r.emissiveMap!==void 0&&(r.emissiveMap.colorSpace=ht);break;case"NormalMap":case"Maya|TEX_normal_map":r.normalMap=s.getTexture(t,a.ID);break;case"ReflectionColor":r.envMap=s.getTexture(t,a.ID),r.envMap!==void 0&&(r.envMap.mapping=Zs,r.envMap.colorSpace=ht);break;case"SpecularColor":r.specularMap=s.getTexture(t,a.ID),r.specularMap!==void 0&&(r.specularMap.colorSpace=ht);break;case"TransparentColor":case"TransparencyFactor":r.alphaMap=s.getTexture(t,a.ID),r.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",o);break}}),r}getTexture(e,t){return"LayeredTexture"in ze.Objects&&t in ze.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=Et.get(t).children[0].ID),e.get(t)}parseDeformers(){const e={},t={};if("Deformer"in ze.Objects){const n=ze.Objects.Deformer;for(const r in n){const s=n[r],a=Et.get(parseInt(r));if(s.attrType==="Skin"){const o=this.parseSkeleton(a,n);o.ID=r,a.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),o.geometryID=a.parents[0].ID,e[r]=o}else if(s.attrType==="BlendShape"){const o={id:r};o.rawTargets=this.parseMorphTargets(a,n),o.id=r,a.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[r]=o}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){const n=[];return e.children.forEach(function(r){const s=t[r.ID];if(s.attrType!=="Cluster")return;const a={ID:r.ID,indices:[],weights:[],transformLink:new Ee().fromArray(s.TransformLink.a)};"Indexes"in s&&(a.indices=s.Indexes.a,a.weights=s.Weights.a),n.push(a)}),{rawBones:n,bones:[]}}parseMorphTargets(e,t){const n=[];for(let r=0;r<e.children.length;r++){const s=e.children[r],a=t[s.ID],o={name:a.attrName,initialWeight:a.DeformPercent,id:a.id,fullWeights:a.FullWeights.a};if(a.attrType!=="BlendShapeChannel")return;o.geoID=Et.get(parseInt(s.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(o)}return n}parseScene(e,t,n){Ot=new dn;const r=this.parseModels(e.skeletons,t,n),s=ze.Objects.Model,a=this;r.forEach(function(u){const d=s[u.ID];a.setLookAtProperties(u,d),Et.get(u.ID).parents.forEach(function(p){const _=r.get(p.ID);_!==void 0&&_.add(u)}),u.parent===null&&Ot.add(u)}),this.addGlobalSceneSettings(),Ot.traverse(function(u){if(u.userData.transformData){u.parent&&(u.userData.transformData.parentMatrix=u.parent.matrix,u.userData.transformData.parentMatrixWorld=u.parent.matrixWorld);const d=lf(u.userData.transformData);u.applyMatrix4(d),u.updateWorldMatrix()}});const o=this.parsePoseNodes(),l=new Set;for(const u in e.skeletons)e.skeletons[u].rawBones.forEach(function(d,f){const p=e.skeletons[u].bones[f];p&&l.add(p.ID)});const c=new Ee;Ot.traverse(function(u){if(u.isBone&&u.ID!==void 0&&!l.has(u.ID)){const d=o[u.ID];d!==void 0&&(u.parent?(c.copy(u.parent.matrixWorld).invert(),c.multiply(d)):c.copy(d),c.decompose(u.position,u.quaternion,u.scale),u.updateMatrix(),u.matrixWorld.copy(d))}}),this.bindSkeleton(e.skeletons,t,r);const h=new ub().parse();Ot.children.length===1&&Ot.children[0].isGroup&&(Ot.children[0].animations=h,Ot=Ot.children[0]),Ot.animations=h,"GlobalSettings"in ze&&"UpAxis"in ze.GlobalSettings&&ze.GlobalSettings.UpAxis.value===2&&(console.warn("THREE.FBXLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted."),Ot.rotation.set(-Math.PI/2,0,0))}parseModels(e,t,n){const r=new Map,s=ze.Objects.Model;for(const a in s){const o=parseInt(a),l=s[a],c=Et.get(o);let h=this.buildSkeleton(c,e,o,l.attrName);if(!h){switch(l.attrType){case"Camera":h=this.createCamera(c);break;case"Light":h=this.createLight(c);break;case"Mesh":h=this.createMesh(c,t,n);break;case"NurbsCurve":h=this.createCurve(c,t);break;case"LimbNode":case"Root":h=new $r;break;case"Null":default:h=new dn;break}h.name=l.attrName?Je.sanitizeNodeName(l.attrName):"",h.userData.originalName=l.attrName,h.ID=o}this.getTransformData(h,l),r.set(o,h)}return r}buildSkeleton(e,t,n,r){let s=null;return e.parents.forEach(function(a){for(const o in t){const l=t[o];l.rawBones.forEach(function(c,h){if(c.ID===a.ID){const u=s;s=new $r,s.matrixWorld.copy(c.transformLink),s.name=r?Je.sanitizeNodeName(r):"",s.userData.originalName=r,s.ID=n,l.bones[h]=s,u!==null&&s.add(u)}})}}),s}createCamera(e){let t,n;if(e.children.forEach(function(r){const s=ze.Objects.NodeAttribute[r.ID];s!==void 0&&(n=s)}),n===void 0)t=new gt;else{let r=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(r=1);let s=1;n.NearPlane!==void 0&&(s=n.NearPlane.value/1e3);let a=1e3;n.FarPlane!==void 0&&(a=n.FarPlane.value/1e3);let o=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(o=n.AspectWidth.value,l=n.AspectHeight.value);const c=o/l;let h=45;n.FieldOfView!==void 0&&(h=n.FieldOfView.value);const u=n.FocalLength?n.FocalLength.value:null;switch(r){case 0:t=new Jt(h,c,s,a),u!==null&&t.setFocalLength(u);break;case 1:console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."),t=new gt;break;default:console.warn("THREE.FBXLoader: Unknown camera type "+r+"."),t=new gt;break}}return t}createLight(e){let t,n;if(e.children.forEach(function(r){const s=ze.Objects.NodeAttribute[r.ID];s!==void 0&&(n=s)}),n===void 0)t=new gt;else{let r;n.LightType===void 0?r=0:r=n.LightType.value;let s=16777215;n.Color!==void 0&&(s=Be.colorSpaceToWorking(new Ue().fromArray(n.Color.value),ht));let a=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(a=0);let o=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?o=0:o=n.FarAttenuationEnd.value);const l=1;switch(r){case 0:t=new zu(s,a,o,l);break;case 1:t=new Hd(s,a);break;case 2:let c=Math.PI/3,h=0;n.OuterAngle!==void 0?(c=$t.degToRad(n.OuterAngle.value),n.InnerAngle!==void 0&&(h=1-n.InnerAngle.value/n.OuterAngle.value,h=Math.max(0,h))):n.InnerAngle!==void 0&&(c=$t.degToRad(n.InnerAngle.value)),t=new Sv(s,a,o,c,h,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),t=new zu(s,a);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,n){let r,s=null,a=null;const o=[];if(e.children.forEach(function(l){t.has(l.ID)&&(s=t.get(l.ID)),n.has(l.ID)&&o.push(n.get(l.ID))}),o.length>1?a=o:o.length>0?a=o[0]:(a=new Hs({name:Di.DEFAULT_MATERIAL_NAME,color:13421772}),o.push(a)),"color"in s.attributes&&o.forEach(function(l){l.vertexColors=!0}),s.groups.length>0){let l=!1;for(let c=0,h=s.groups.length;c<h;c++){const u=s.groups[c];(u.materialIndex<0||u.materialIndex>=o.length)&&(u.materialIndex=o.length,l=!0)}if(l){const c=new Hs;o.push(c)}}return s.FBX_Deformer?(r=new w_(s,a),r.normalizeSkinWeights()):r=new Mt(s,a),r}createCurve(e,t){const n=e.children.reduce(function(s,a){return t.has(a.ID)&&(s=t.get(a.ID)),s},null),r=new rc({name:Di.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new Rd(n,r)}getTransformData(e,t){const n={};"InheritType"in t&&(n.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?n.eulerOrder=ns(t.RotationOrder.value):n.eulerOrder=ns(0),"Lcl_Translation"in t&&(n.translation=t.Lcl_Translation.value),"PreRotation"in t&&(n.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(n.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(n.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(n.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(n.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(n.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(n.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(n.rotationPivot=t.RotationPivot.value),e.userData.transformData=n}setLookAtProperties(e,t){"LookAtProperty"in t&&Et.get(e.ID).children.forEach(function(r){if(r.relationship==="LookAtProperty"){const s=ze.Objects.Model[r.ID];if("Lcl_Translation"in s){const a=s.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(a),Ot.add(e.target)):e.lookAt(new D().fromArray(a))}}})}bindSkeleton(e,t,n){for(const r in e){const s=e[r],a=[];for(let l=0,c=s.bones.length;l<c;l++){const h=new Ee;s.bones[l]&&s.rawBones[l]&&h.copy(s.rawBones[l].transformLink).invert(),a.push(h)}Et.get(parseInt(s.ID)).parents.forEach(function(l){if(t.has(l.ID)){const c=l.ID;Et.get(c).parents.forEach(function(u){if(n.has(u.ID)){const d=n.get(u.ID);d.updateMatrixWorld(!0),d.bind(new nc(s.bones,a),d.matrixWorld)}})}})}}parsePoseNodes(){const e={};if("Pose"in ze.Objects){const t=ze.Objects.Pose;for(const n in t)if(t[n].attrType==="BindPose"&&t[n].NbPoseNodes>0){const r=t[n].PoseNode;Array.isArray(r)?r.forEach(function(s){e[s.Node]=new Ee().fromArray(s.Matrix.a)}):e[r.Node]=new Ee().fromArray(r.Matrix.a)}}return e}addGlobalSceneSettings(){if("GlobalSettings"in ze){if("AmbientColor"in ze.GlobalSettings){const e=ze.GlobalSettings.AmbientColor.value,t=e[0],n=e[1],r=e[2];if(t!==0||n!==0||r!==0){const s=new Ue().setRGB(t,n,r,ht);Ot.add(new Wd(s,1))}}"UnitScaleFactor"in ze.GlobalSettings&&(Ot.userData.unitScaleFactor=ze.GlobalSettings.UnitScaleFactor.value)}}}class cb{constructor(){this.negativeMaterialIndices=!1}parse(e){const t=new Map;if("Geometry"in ze.Objects){const n=ze.Objects.Geometry;for(const r in n){const s=Et.get(parseInt(r)),a=this.parseGeometry(s,n[r],e);t.set(parseInt(r),a)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,n){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,n);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,n){const r=n.skeletons,s=[],a=e.parents.map(function(u){return ze.Objects.Model[u.ID]});if(a.length===0)return;const o=e.children.reduce(function(u,d){return r[d.ID]!==void 0&&(u=r[d.ID]),u},null);e.children.forEach(function(u){n.morphTargets[u.ID]!==void 0&&s.push(n.morphTargets[u.ID])});const l=a[0],c={};"RotationOrder"in l&&(c.eulerOrder=ns(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);const h=lf(c);return this.genGeometry(t,o,s,h)}genGeometry(e,t,n,r){const s=new Xt;e.attrName&&(s.name=e.attrName);const a=this.parseGeoNode(e,t),o=this.genBuffers(a),l=new mt(o.vertex,3);if(l.applyMatrix4(r),s.setAttribute("position",l),o.colors.length>0&&s.setAttribute("color",new mt(o.colors,3)),t&&(s.setAttribute("skinIndex",new ec(o.weightsIndices,4)),s.setAttribute("skinWeight",new mt(o.vertexWeights,4)),s.FBX_Deformer=t),o.normal.length>0){const c=new Oe().getNormalMatrix(r),h=new mt(o.normal,3);h.applyNormalMatrix(c),s.setAttribute("normal",h)}if(o.uvs.forEach(function(c,h){const u=h===0?"uv":`uv${h}`;s.setAttribute(u,new mt(o.uvs[h],2))}),a.material&&a.material.mappingType!=="AllSame"){let c=o.materialIndex[0],h=0;if(o.materialIndex.forEach(function(u,d){u!==c&&(s.addGroup(h,d-h,c),c=u,h=d)}),s.groups.length>0){const u=s.groups[s.groups.length-1],d=u.start+u.count;d!==o.materialIndex.length&&s.addGroup(d,o.materialIndex.length-d,c)}s.groups.length===0&&s.addGroup(0,o.materialIndex.length,o.materialIndex[0])}return this.addMorphTargets(s,e,n,r),s}parseGeoNode(e,t){const n={};if(n.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],n.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&e.LayerElementColor[0].Colors&&(n.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(n.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(n.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){n.uv=[];let r=0;for(;e.LayerElementUV[r];)e.LayerElementUV[r].UV&&n.uv.push(this.parseUVs(e.LayerElementUV[r])),r++}return n.weightTable={},t!==null&&(n.skeleton=t,t.rawBones.forEach(function(r,s){r.indices.forEach(function(a,o){n.weightTable[a]===void 0&&(n.weightTable[a]=[]),n.weightTable[a].push({id:s,weight:r.weights[o]})})})),n}genBuffers(e){const t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let n=0,r=0,s=!1,a=[],o=[],l=[],c=[],h=[],u=[];const d=this;return e.vertexIndices.forEach(function(f,p){let _,g=!1;f<0&&(f=f^-1,g=!0);let m=[],S=[];if(a.push(f*3,f*3+1,f*3+2),e.color){const M=js(p,n,f,e.color);l.push(M[0],M[1],M[2])}if(e.skeleton){if(e.weightTable[f]!==void 0&&e.weightTable[f].forEach(function(M){S.push(M.weight),m.push(M.id)}),S.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);const M=[0,0,0,0],T=[0,0,0,0];S.forEach(function(C,w){let R=C,x=m[w];T.forEach(function(E,P,A){if(R>E){A[P]=R,R=E;const N=M[P];M[P]=x,x=N}})}),m=M,S=T}for(;S.length<4;)S.push(0),m.push(0);for(let M=0;M<4;++M)h.push(S[M]),u.push(m[M])}if(e.normal){const M=js(p,n,f,e.normal);o.push(M[0],M[1],M[2])}e.material&&e.material.mappingType!=="AllSame"&&(_=js(p,n,f,e.material)[0],_<0&&(d.negativeMaterialIndices=!0,_=0)),e.uv&&e.uv.forEach(function(M,T){const C=js(p,n,f,M);c[T]===void 0&&(c[T]=[]),c[T].push(C[0]),c[T].push(C[1])}),r++,g&&(d.genFace(t,e,a,_,o,l,c,h,u,r),n++,r=0,a=[],o=[],l=[],c=[],h=[],u=[])}),t}getNormalNewell(e){const t=new D(0,0,0);for(let n=0;n<e.length;n++){const r=e[n],s=e[(n+1)%e.length];t.x+=(r.y-s.y)*(r.z+s.z),t.y+=(r.z-s.z)*(r.x+s.x),t.z+=(r.x-s.x)*(r.y+s.y)}return t.normalize(),t}getNormalTangentAndBitangent(e){const t=this.getNormalNewell(e),r=(Math.abs(t.z)>.5?new D(0,1,0):new D(0,0,1)).cross(t).normalize(),s=t.clone().cross(r).normalize();return{normal:t,tangent:r,bitangent:s}}flattenVertex(e,t,n){return new $e(e.dot(t),e.dot(n))}genFace(e,t,n,r,s,a,o,l,c,h){let u;if(h>3){const d=[],f=t.baseVertexPositions||t.vertexPositions;for(let m=0;m<n.length;m+=3)d.push(new D(f[n[m]],f[n[m+1]],f[n[m+2]]));const{tangent:p,bitangent:_}=this.getNormalTangentAndBitangent(d),g=[];for(const m of d)g.push(this.flattenVertex(m,p,_));u=ac.triangulateShape(g,[])}else u=[[0,1,2]];for(const[d,f,p]of u)e.vertex.push(t.vertexPositions[n[d*3]]),e.vertex.push(t.vertexPositions[n[d*3+1]]),e.vertex.push(t.vertexPositions[n[d*3+2]]),e.vertex.push(t.vertexPositions[n[f*3]]),e.vertex.push(t.vertexPositions[n[f*3+1]]),e.vertex.push(t.vertexPositions[n[f*3+2]]),e.vertex.push(t.vertexPositions[n[p*3]]),e.vertex.push(t.vertexPositions[n[p*3+1]]),e.vertex.push(t.vertexPositions[n[p*3+2]]),t.skeleton&&(e.vertexWeights.push(l[d*4]),e.vertexWeights.push(l[d*4+1]),e.vertexWeights.push(l[d*4+2]),e.vertexWeights.push(l[d*4+3]),e.vertexWeights.push(l[f*4]),e.vertexWeights.push(l[f*4+1]),e.vertexWeights.push(l[f*4+2]),e.vertexWeights.push(l[f*4+3]),e.vertexWeights.push(l[p*4]),e.vertexWeights.push(l[p*4+1]),e.vertexWeights.push(l[p*4+2]),e.vertexWeights.push(l[p*4+3]),e.weightsIndices.push(c[d*4]),e.weightsIndices.push(c[d*4+1]),e.weightsIndices.push(c[d*4+2]),e.weightsIndices.push(c[d*4+3]),e.weightsIndices.push(c[f*4]),e.weightsIndices.push(c[f*4+1]),e.weightsIndices.push(c[f*4+2]),e.weightsIndices.push(c[f*4+3]),e.weightsIndices.push(c[p*4]),e.weightsIndices.push(c[p*4+1]),e.weightsIndices.push(c[p*4+2]),e.weightsIndices.push(c[p*4+3])),t.color&&(e.colors.push(a[d*3]),e.colors.push(a[d*3+1]),e.colors.push(a[d*3+2]),e.colors.push(a[f*3]),e.colors.push(a[f*3+1]),e.colors.push(a[f*3+2]),e.colors.push(a[p*3]),e.colors.push(a[p*3+1]),e.colors.push(a[p*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(r),e.materialIndex.push(r),e.materialIndex.push(r)),t.normal&&(e.normal.push(s[d*3]),e.normal.push(s[d*3+1]),e.normal.push(s[d*3+2]),e.normal.push(s[f*3]),e.normal.push(s[f*3+1]),e.normal.push(s[f*3+2]),e.normal.push(s[p*3]),e.normal.push(s[p*3+1]),e.normal.push(s[p*3+2])),t.uv&&t.uv.forEach(function(_,g){e.uvs[g]===void 0&&(e.uvs[g]=[]),e.uvs[g].push(o[g][d*2]),e.uvs[g].push(o[g][d*2+1]),e.uvs[g].push(o[g][f*2]),e.uvs[g].push(o[g][f*2+1]),e.uvs[g].push(o[g][p*2]),e.uvs[g].push(o[g][p*2+1])})}addMorphTargets(e,t,n,r){if(n.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];const s=r.clone().setPosition(0,0,0),a=this;n.forEach(function(o){o.rawTargets.forEach(function(l){const c=ze.Objects.Geometry[l.geoID];c!==void 0&&a.genMorphGeometry(e,t,c,s,l.name)})})}genMorphGeometry(e,t,n,r,s){const a=t.Vertices!==void 0?t.Vertices.a:[],o=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],l=n.Vertices!==void 0?n.Vertices.a:[],c=n.Indexes!==void 0?n.Indexes.a:[],h=e.attributes.position.count*3,u=new Float32Array(h);for(let _=0;_<c.length;_++){const g=c[_]*3;u[g]=l[_*3],u[g+1]=l[_*3+1],u[g+2]=l[_*3+2]}const d={vertexIndices:o,vertexPositions:u,baseVertexPositions:a},f=this.genBuffers(d),p=new mt(f.vertex,3);p.name=s||n.attrName,p.applyMatrix4(r),e.morphAttributes.position.push(p)}parseNormals(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.Normals.a;let s=[];return n==="IndexToDirect"&&("NormalIndex"in e?s=e.NormalIndex.a:"NormalsIndex"in e&&(s=e.NormalsIndex.a)),{dataSize:3,buffer:r,indices:s,mappingType:t,referenceType:n}}parseUVs(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.UV.a;let s=[];return n==="IndexToDirect"&&(s=e.UVIndex.a),{dataSize:2,buffer:r,indices:s,mappingType:t,referenceType:n}}parseVertexColors(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.Colors.a;let s=[];n==="IndexToDirect"&&(s=e.ColorIndex.a);for(let a=0,o=new Ue;a<r.length;a+=4)o.fromArray(r,a),Be.colorSpaceToWorking(o,ht),o.toArray(r,a);return{dataSize:4,buffer:r,indices:s,mappingType:t,referenceType:n}}parseMaterialIndices(e){const t=e.MappingInformationType,n=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};const r=e.Materials.a,s=[];for(let a=0;a<r.length;++a)s.push(a);return{dataSize:1,buffer:r,indices:s,mappingType:t,referenceType:n}}parseNurbsGeometry(e){const t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new Xt;const n=t-1,r=e.KnotVector.a,s=[],a=e.Points.a;for(let u=0,d=a.length;u<d;u+=4)s.push(new et().fromArray(a,u));let o,l;if(e.Form==="Closed")s.push(s[0]);else if(e.Form==="Periodic"){o=n,l=r.length-1-o;for(let u=0;u<n;++u)s.push(s[u])}const h=new ab(n,r,s,o,l).getPoints(s.length*12);return new Xt().setFromPoints(h)}}class ub{parse(){const e=[],t=this.parseClips();if(t!==void 0)for(const n in t){const r=t[n],s=this.addClip(r);e.push(s)}return e}parseClips(){if(ze.Objects.AnimationCurve===void 0)return;const e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);const t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){const e=ze.Objects.AnimationCurveNode,t=new Map;for(const n in e){const r=e[n];if(r.attrName.match(/S|R|T|DeformPercent/)!==null){const s={id:r.id,attr:r.attrName,curves:{}};t.set(s.id,s)}}return t}parseAnimationCurves(e){const t=ze.Objects.AnimationCurve;for(const n in t){const r={id:t[n].id,times:t[n].KeyTime.a.map(mb),values:t[n].KeyValueFloat.a},s=Et.get(r.id);if(s!==void 0){const a=s.parents[0].ID,o=s.parents[0].relationship;o.match(/X/)?e.get(a).curves.x=r:o.match(/Y/)?e.get(a).curves.y=r:o.match(/Z/)?e.get(a).curves.z=r:o.match(/DeformPercent/)&&e.has(a)&&(e.get(a).curves.morph=r)}}}parseAnimationLayers(e){const t=ze.Objects.AnimationLayer,n=new Map;for(const r in t){const s=[],a=Et.get(parseInt(r));a!==void 0&&(a.children.forEach(function(l,c){if(e.has(l.ID)){const h=e.get(l.ID);if(h.curves.x!==void 0||h.curves.y!==void 0||h.curves.z!==void 0){if(s[c]===void 0){const u=Et.get(l.ID).parents.filter(function(f){return f.relationship!==void 0});if(u.length===0)return;const d=u[0].ID;if(d!==void 0){const f=ze.Objects.Model[d.toString()];if(f===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}const p={modelName:f.attrName?Je.sanitizeNodeName(f.attrName):"",ID:f.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};Ot.traverse(function(_){_.ID===f.id&&(p.transform=_.matrix,_.userData.transformData&&(p.eulerOrder=_.userData.transformData.eulerOrder,_.userData.transformData.rotation&&(p.initialRotation=_.userData.transformData.rotation)))}),p.transform||(p.transform=new Ee),"PreRotation"in f&&(p.preRotation=f.PreRotation.value),"PostRotation"in f&&(p.postRotation=f.PostRotation.value),s[c]=p}}s[c]&&(s[c][h.attr]=h)}else if(h.curves.morph!==void 0){if(s[c]===void 0){const u=Et.get(l.ID).parents.filter(function(S){return S.relationship!==void 0});if(u.length===0)return;const d=u[0].ID,f=Et.get(d).parents[0].ID,p=Et.get(f).parents[0].ID,_=Et.get(p).parents[0].ID,g=ze.Objects.Model[_],m={modelName:g.attrName?Je.sanitizeNodeName(g.attrName):"",morphName:ze.Objects.Deformer[d].attrName};s[c]=m}s[c][h.attr]=h}}}),n.set(parseInt(r),s))}return n}parseAnimStacks(e){const t=ze.Objects.AnimationStack,n={};for(const r in t){const s=Et.get(parseInt(r)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const a=e.get(s[0].ID);n[r]={name:t[r].attrName,layer:a}}return n}addClip(e){let t=[];const n=this;return e.layer.forEach(function(r){t=t.concat(n.generateTracks(r))}),new Rl(e.name,-1,t)}generateTracks(e){const t=[];let n=new D,r=new D;if(e.transform&&e.transform.decompose(n,new Ct,r),n=n.toArray(),r=r.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.T.curves,n,"position");s!==void 0&&t.push(s)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){const s=this.generateRotationTrack(e.modelName,e.R.curves,e.preRotation,e.postRotation,e.eulerOrder,e.initialRotation);s!==void 0&&t.push(s)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.S.curves,r,"scale");s!==void 0&&t.push(s)}if(e.DeformPercent!==void 0){const s=this.generateMorphTrack(e);s!==void 0&&t.push(s)}return t}generateVectorTrack(e,t,n,r){const s=this.getTimesForAllAxes(t),a=this.getKeyframeTrackValues(s,t,n);return new ts(e+"."+r,s,a)}generateRotationTrack(e,t,n,r,s,a){let o,l;if(t.x!==void 0||t.y!==void 0||t.z!==void 0){const f=this.getTimesForAllAxes(t);if(f.length>0){const p=a||[0,0,0],_=this.synchronizeCurve(t.x,f,p[0]),g=this.synchronizeCurve(t.y,f,p[1]),m=this.synchronizeCurve(t.z,f,p[2]),S=this.interpolateRotations(_,g,m,s);o=S[0],l=S[1]}}const c=ns(0);n!==void 0&&(n=n.map($t.degToRad),n.push(c),n=new kt().fromArray(n),n=new Ct().setFromEuler(n)),r!==void 0&&(r=r.map($t.degToRad),r.push(c),r=new kt().fromArray(r),r=new Ct().setFromEuler(r).invert());const h=new Ct,u=new kt,d=[];if(!(!l||!o)){for(let f=0;f<l.length;f+=3)u.set(l[f],l[f+1],l[f+2],s),h.setFromEuler(u),n!==void 0&&h.premultiply(n),r!==void 0&&h.multiply(r),f>2&&new Ct().fromArray(d,(f-3)/3*4).dot(h)<0&&h.set(-h.x,-h.y,-h.z,-h.w),h.toArray(d,f/3*4);return new cs(e+".quaternion",o,d)}}generateMorphTrack(e){const t=e.DeformPercent.curves.morph,n=t.values.map(function(s){return s/100}),r=Ot.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new es(e.modelName+".morphTargetInfluences["+r+"]",t.times,n)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(n,r){return n-r}),t.length>1){let n=1,r=t[0];for(let s=1;s<t.length;s++){const a=t[s];a!==r&&(t[n]=a,r=a,n++)}t=t.slice(0,n)}return t}getKeyframeTrackValues(e,t,n){const r=n,s=[];let a=-1,o=-1,l=-1;return e.forEach(function(c){if(t.x&&(a=t.x.times.indexOf(c)),t.y&&(o=t.y.times.indexOf(c)),t.z&&(l=t.z.times.indexOf(c)),a!==-1){const h=t.x.values[a];s.push(h),r[0]=h}else s.push(r[0]);if(o!==-1){const h=t.y.values[o];s.push(h),r[1]=h}else s.push(r[1]);if(l!==-1){const h=t.z.values[l];s.push(h),r[2]=h}else s.push(r[2])}),s}synchronizeCurve(e,t,n){if(e===void 0)return{times:t,values:t.map(()=>n)};if(e.times.length===t.length)return e;const r=[];for(let s=0;s<t.length;s++)r.push(this.sampleCurveValue(e,t[s],n));return{times:t,values:r}}sampleCurveValue(e,t,n){const r=e.times,s=e.values;if(t<=r[0])return s[0];if(t>=r[r.length-1])return s[s.length-1];for(let a=0;a<r.length-1;a++)if(t>=r[a]&&t<=r[a+1]){if(r[a]===t)return s[a];const o=(t-r[a])/(r[a+1]-r[a]);return s[a]*(1-o)+s[a+1]*o}return n}interpolateRotations(e,t,n,r){const s=[],a=[];s.push(e.times[0]),a.push($t.degToRad(e.values[0])),a.push($t.degToRad(t.values[0])),a.push($t.degToRad(n.values[0]));for(let o=1;o<e.values.length;o++){const l=[e.values[o-1],t.values[o-1],n.values[o-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;const c=l.map($t.degToRad),h=[e.values[o],t.values[o],n.values[o]];if(isNaN(h[0])||isNaN(h[1])||isNaN(h[2]))continue;const u=h.map($t.degToRad),d=[h[0]-l[0],h[1]-l[1],h[2]-l[2]],f=[Math.abs(d[0]),Math.abs(d[1]),Math.abs(d[2])];if(f[0]>=180||f[1]>=180||f[2]>=180){const _=Math.max(...f)/180,g=new kt(...c,r),m=new kt(...u,r),S=new Ct().setFromEuler(g),M=new Ct().setFromEuler(m);S.dot(M)<0&&M.set(-M.x,-M.y,-M.z,-M.w);const T=e.times[o-1],C=e.times[o]-T,w=new Ct,R=new kt;for(let x=0;x<1;x+=1/_)w.copy(S.clone().slerp(M.clone(),x)),s.push(T+x*C),R.setFromQuaternion(w,r),a.push(R.x),a.push(R.y),a.push(R.z)}else s.push(e.times[o]),a.push($t.degToRad(e.values[o])),a.push($t.degToRad(t.values[o])),a.push($t.degToRad(n.values[o]))}return[s,a]}}class hb{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new of,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const t=this,n=e.split(/[\r\n]+/);return n.forEach(function(r,s){const a=r.match(/^[\s\t]*;/),o=r.match(/^[\s\t]*$/);if(a||o)return;const l=r.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),c=r.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),h=r.match("^\\t{"+(t.currentIndent-1)+"}}");l?t.parseNodeBegin(r,l):c?t.parseNodeProperty(r,c,n[++s]):h?t.popStack():r.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(r)}),this.allNodes}parseNodeBegin(e,t){const n=t[1].trim().replace(/^"/,"").replace(/"$/,""),r=t[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:n},a=this.parseNodeAttr(r),o=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,s):n in o?(n==="PoseNode"?o.PoseNode.push(s):o[n].id!==void 0&&(o[n]={},o[n][o[n].id]=o[n]),a.id!==""&&(o[n][a.id]=s)):typeof a.id=="number"?(o[n]={},o[n][a.id]=s):n!=="Properties70"&&(n==="PoseNode"?o[n]=[s]:o[n]=s),typeof a.id=="number"&&(s.id=a.id),a.name!==""&&(s.attrName=a.name),a.type!==""&&(s.attrType=a.type),this.pushStack(s)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let n="",r="";return e.length>1&&(n=e[1].replace(/^(\w+)::/,""),r=e[2]),{id:t,name:n,type:r}}parseNodeProperty(e,t,n){let r=t[1].replace(/^"/,"").replace(/"$/,"").trim(),s=t[2].replace(/^"/,"").replace(/"$/,"").trim();r==="Content"&&s===","&&(s=n.replace(/"/g,"").replace(/,$/,"").trim());const a=this.getCurrentNode();if(a.name==="Properties70"){this.parseNodeSpecialProperty(e,r,s);return}if(r==="C"){const l=s.split(",").slice(1),c=parseInt(l[0]),h=parseInt(l[1]);let u=s.split(",").slice(3);u=u.map(function(d){return d.trim().replace(/^"/,"")}),r="connections",s=[c,h],_b(s,u),a[r]===void 0&&(a[r]=[])}r==="Node"&&(a.id=s),r in a&&Array.isArray(a[r])?a[r].push(s):r!=="a"?a[r]=s:a.a=s,this.setCurrentProp(a,r),r==="a"&&s.slice(-1)!==","&&(a.a=Io(s))}parseNodePropertyContinued(e){const t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=Io(t.a))}parseNodeSpecialProperty(e,t,n){const r=n.split('",').map(function(h){return h.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=r[0],a=r[1],o=r[2],l=r[3];let c=r[4];switch(a){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=Io(c);break}this.getPrevNode()[s]={type:a,type2:o,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),s)}}class db{parse(e){const t=new fh(e);t.skip(23);const n=t.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);const r=new of;for(;!this.endOfContent(t);){const s=this.parseNode(t,n);s!==null&&r.add(s.name,s)}return r}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){const n={},r=t>=7500?e.getUint64():e.getUint32(),s=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();const a=e.getUint8(),o=e.getString(a);if(r===0)return null;const l=[];for(let d=0;d<s;d++)l.push(this.parseProperty(e));const c=l.length>0?l[0]:"",h=l.length>1?l[1]:"",u=l.length>2?l[2]:"";for(n.singleProperty=s===1&&e.getOffset()===r;r>e.getOffset();){const d=this.parseNode(e,t);d!==null&&this.parseSubNode(o,n,d)}return n.propertyList=l,typeof c=="number"&&(n.id=c),h!==""&&(n.attrName=h),u!==""&&(n.attrType=u),o!==""&&(n.name=o),n}parseSubNode(e,t,n){if(n.singleProperty===!0){const r=n.propertyList[0];Array.isArray(r)?(t[n.name]=n,n.a=r):t[n.name]=r}else if(e==="Connections"&&n.name==="C"){const r=[];n.propertyList.forEach(function(s,a){a!==0&&r.push(s)}),t.connections===void 0&&(t.connections=[]),t.connections.push(r)}else if(n.name==="Properties70")Object.keys(n).forEach(function(s){t[s]=n[s]});else if(e==="Properties70"&&n.name==="P"){let r=n.propertyList[0],s=n.propertyList[1];const a=n.propertyList[2],o=n.propertyList[3];let l;r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],t[r]={type:s,type2:a,flag:o,value:l}}else t[n.name]===void 0?typeof n.id=="number"?(t[n.name]={},t[n.name][n.id]=n):t[n.name]=n:n.name==="PoseNode"?(Array.isArray(t[n.name])||(t[n.name]=[t[n.name]]),t[n.name].push(n)):t[n.name][n.id]===void 0&&(t[n.name][n.id]=n)}parseProperty(e){const t=e.getString(1);let n;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return n=e.getUint32(),e.getArrayBuffer(n);case"S":return n=e.getUint32(),e.getString(n);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const r=e.getUint32(),s=e.getUint32(),a=e.getUint32();if(s===0)switch(t){case"b":case"c":return e.getBooleanArray(r);case"d":return e.getFloat64Array(r);case"f":return e.getFloat32Array(r);case"i":return e.getInt32Array(r);case"l":return e.getInt64Array(r)}const o=$T(new Uint8Array(e.getArrayBuffer(a))),l=new fh(o.buffer);switch(t){case"b":case"c":return l.getBooleanArray(r);case"d":return l.getFloat64Array(r);case"f":return l.getFloat32Array(r);case"i":return l.getInt32Array(r);case"l":return l.getInt64Array(r)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}}class fh{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){const t=[];for(let n=0;n<e;n++)t.push(this.getBoolean());return t}getUint8(){const e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){const e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){const e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt32());return t}getUint32(){const e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){const e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat32());return t}getFloat64(){const e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat64());return t}getArrayBuffer(e){const t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){const t=this.offset;let n=new Uint8Array(this.dv.buffer,t,e);this.skip(e);const r=n.indexOf(0);return r>=0&&(n=new Uint8Array(this.dv.buffer,t,r)),this._textDecoder.decode(n)}}class of{add(e,t){this[e]=t}}function fb(i){const e="Kaydara FBX Binary  \0";return i.byteLength>=e.length&&e===cf(i,0,e.length)}function pb(i){const e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let t=0;function n(r){const s=i[r-1];return i=i.slice(t+r),t++,s}for(let r=0;r<e.length;++r)if(n(1)===e[r])return!1;return!0}function ph(i){const e=/FBXVersion: (\d+)/,t=i.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function mb(i){return i/46186158e3}const gb=[];function js(i,e,t,n){let r;switch(n.mappingType){case"ByPolygonVertex":r=i;break;case"ByPolygon":r=e;break;case"ByVertice":r=t;break;case"AllSame":r=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(r=n.indices[r]);const s=r*n.dataSize,a=s+n.dataSize;return vb(gb,n.buffer,s,a)}const Ro=new kt,tr=new D;function lf(i){const e=new Ee,t=new Ee,n=new Ee,r=new Ee,s=new Ee,a=new Ee,o=new Ee,l=new Ee,c=new Ee,h=new Ee,u=new Ee,d=new Ee,f=i.inheritType?i.inheritType:0;i.translation&&e.setPosition(tr.fromArray(i.translation));const p=ns(0);if(i.preRotation){const A=i.preRotation.map($t.degToRad);A.push(p),t.makeRotationFromEuler(Ro.fromArray(A))}if(i.rotation){const A=i.rotation.map($t.degToRad);A.push(i.eulerOrder||p),n.makeRotationFromEuler(Ro.fromArray(A))}if(i.postRotation){const A=i.postRotation.map($t.degToRad);A.push(p),r.makeRotationFromEuler(Ro.fromArray(A)),r.invert()}i.scale&&s.scale(tr.fromArray(i.scale)),i.scalingOffset&&o.setPosition(tr.fromArray(i.scalingOffset)),i.scalingPivot&&a.setPosition(tr.fromArray(i.scalingPivot)),i.rotationOffset&&l.setPosition(tr.fromArray(i.rotationOffset)),i.rotationPivot&&c.setPosition(tr.fromArray(i.rotationPivot)),i.parentMatrixWorld&&(u.copy(i.parentMatrix),h.copy(i.parentMatrixWorld));const _=t.clone().multiply(n).multiply(r),g=new Ee;g.extractRotation(h);const m=new Ee;m.copyPosition(h);const S=m.clone().invert().multiply(h),M=g.clone().invert().multiply(S),T=s,C=new Ee;if(f===0)C.copy(g).multiply(_).multiply(M).multiply(T);else if(f===1)C.copy(g).multiply(M).multiply(_).multiply(T);else{const N=new Ee().scale(new D().setFromMatrixScale(u)).clone().invert(),H=M.clone().multiply(N);C.copy(g).multiply(_).multiply(H).multiply(T)}const w=c.clone().invert(),R=a.clone().invert();let x=e.clone().multiply(l).multiply(c).multiply(t).multiply(n).multiply(r).multiply(w).multiply(o).multiply(a).multiply(s).multiply(R);const E=new Ee().copyPosition(x),P=h.clone().multiply(E);return d.copyPosition(P),x=d.clone().multiply(C),x.premultiply(h.invert()),x}function ns(i){i=i||0;const e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return i===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[i]}function Io(i){return i.split(",").map(function(t){return parseFloat(t)})}function cf(i,e,t){return e===void 0&&(e=0),t===void 0&&(t=i.byteLength),new TextDecoder().decode(new Uint8Array(i,e,t))}function _b(i,e){for(let t=0,n=i.length,r=e.length;t<r;t++,n++)i[n]=e[t]}function vb(i,e,t,n){for(let r=t,s=0;r<n;r++,s++)i[s]=e[r];return i}function xb(i){const e=new Map,t=new Map,n=i.clone();return uf(i,n,function(r,s){e.set(s,r),t.set(r,s)}),n.traverse(function(r){if(!r.isSkinnedMesh)return;const s=r,a=e.get(r),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function uf(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)uf(i.children[n],e.children[n],t)}const Sb=new D(0,1,0);function hf(i,e){const t=new dn,n=xb(i);Pb(n),t.add(n);const s=new fi().setFromObject(n).getSize(new D),a=s.y>0?e/s.y:1;n.scale.multiplyScalar(a),n.updateWorldMatrix(!0,!0);const o=new fi().setFromObject(n),l=o.getCenter(new D);return n.position.x-=l.x,n.position.y-=o.min.y,n.position.z-=l.z,n.updateWorldMatrix(!0,!0),t}function yb(i){let e=!1;return i.traverse(t=>{t instanceof Mt&&t.geometry!=null&&(e=!0)}),e}function Mb(i){const e=new Map;if(i.traverse(n=>{n instanceof $r&&e.set(n.name,n)}),e.size===0)return!1;let t=0;for(const n of e.values())for(const r of n.children)r instanceof $r&&(t+=Ab(n,r)?1:0);return t+=nr(e.get("hips"),.05,"#4b2e83")?1:0,t+=nr(e.get("chest"),.065,"#4b2e83")?1:0,t+=nr(e.get("head"),.06,"#f5e9c9")?1:0,t+=nr(e.get("hand_l"),.028,"#f5e9c9")?1:0,t+=nr(e.get("hand_r"),.028,"#f5e9c9")?1:0,t+=nr(e.get("staff_l"),.025,"#c8a24b")?1:0,t+=Cb(e.get("shield"))?1:0,t>0}function Tb(i,e,t){const n=i.find(s=>s.duration>0&&s.tracks.length>0);if(n==null)return null;const r=bb(n.duration,e,t);return ov.subclip(n,`mage-loop-frames-${e}-${t}`,e,t+1,r)}function bb(i,e,t){const n=Math.max(1,t-e);return i>0?n/i:24}function wb(i){i.traverse(e=>{e instanceof Mt&&Db(e.material)&&(e.material=new os({color:"#4b2e83",roughness:.72,metalness:.05}))})}function Eb(i){i.traverse(e=>{e instanceof Mt&&(e.material=new os({color:"#8b6fcb",roughness:.66,metalness:.08,side:Cn,transparent:!1,opacity:1,depthWrite:!0}),e.visible=!0)})}function Ab(i,e){const t=e.position.clone(),n=t.length();if(n<.015)return!1;const r=Rb(i.name),s=new Mt(new Fn(r,r,n,8),Ib(i.name));return s.name=`proxy-segment-${i.name}-${e.name}`,s.position.copy(t).multiplyScalar(.5),s.quaternion.setFromUnitVectors(Sb,t.clone().normalize()),i.add(s),!0}function nr(i,e,t){if(i==null)return!1;const n=new Mt(new Tr(e,12,8),Gr(t));return n.name=`proxy-sphere-${i.name}`,i.add(n),!0}function Cb(i){if(i==null)return!1;const e=new Mt(new $n(.09,.12,.018),Gr("#c8a24b"));return e.name=`proxy-shield-${i.name}`,e.position.y=.04,i.add(e),!0}function Rb(i){return i.includes("staff")||i.includes("hair")||i.endsWith("_end")?.01:i.includes("chest")||i.includes("hips")||i.includes("neck")?.026:i.includes("pauldron")||i.includes("shield")?.02:.017}function Ib(i){return i.includes("head")||i.includes("hand")||i.includes("neck")?Gr("#f5e9c9"):i.includes("staff")||i.includes("shield")||i.includes("pauldron")?Gr("#c8a24b"):Gr("#4b2e83")}function Gr(i){return new os({color:i,roughness:.68,metalness:i==="#c8a24b"?.18:.04})}function Pb(i){i.traverse(e=>{e instanceof Mt&&(e.geometry=e.geometry.clone(),e.material=Lb(e.material))})}function Lb(i){return Array.isArray(i)?i.map(e=>e.clone()):i.clone()}function Db(i){return Array.isArray(i)?i.length===0:i==null}const df=1.45,Ub=0,Nb=60,Fb=-Math.PI/2,lr=10.8,wi=5;class Ob{constructor(){Le(this,"mageTemplate",null);Le(this,"mageTemplateVersion",0);Le(this,"mageLoadStarted",!1);Le(this,"mageBoneOnlyWarningShown",!1);this.startMageModelLoad()}create(e){switch(e){case Bt.backdropForest:return Vb();case Bt.mage:return this.createMage();case Bt.princeCage:return Wb();case Bt.goalFlag:return Xb();case Bt.pathMarker:return Yb();case Bt.monsterPlaceholder:return qb();case Bt.projectilePlaceholder:return jb();default:return Kb(e)}}getTemplateVersion(e){return e===Bt.mage?this.mageTemplateVersion:0}dispose(e){e.traverse(t=>{t instanceof Mt&&(t.geometry.dispose(),Dl(t.material)),t instanceof Id&&(t.geometry.dispose(),Dl(t.material))})}disposeCachedResources(){this.mageTemplate!=null&&(this.dispose(this.mageTemplate),this.mageTemplate=null)}createMage(){return this.startMageModelLoad(),this.mageTemplate!=null?Bb(this.mageTemplate):Hb()}startMageModelLoad(){if(this.mageLoadStarted||typeof window>"u")return;const e=Jh(X.rigs.mage);if((e==null?void 0:e.sourceFormat)!=="fbx")return;this.mageLoadStarted=!0;const t=new ob,n=Vl(e.browserUrl);t.load(n,r=>{if(!yb(r)){const a=Mb(r);if(this.mageBoneOnlyWarningShown||(console.warn(a?`Mage FBX at ${n} has animation bones but no renderable meshes; using temporary bone proxy visuals.`:`Mage FBX at ${n} has no renderable meshes and no usable bones; keeping placeholder mage.`),this.mageBoneOnlyWarningShown=!0),!a)return}wb(r),Eb(r),this.mageTemplate=hf(r,df);const s=Tb(r.animations,Ub,Nb);this.mageTemplate.animations=s!=null?[s]:[],this.mageTemplateVersion+=1},void 0,r=>{console.warn(`Failed to load mage FBX from ${n}`,r)})}}function Bb(i){const e=hf(i,df);return kb(e),e.animations=i.animations,e}function kb(i){const e=i.children[0]??i;e.rotation.y=Fb}function Vb(){const i=new dn,e=new Mr(1,1),t=new as({color:"#2d2345",depthWrite:!1}),n=new Mt(e,t);return n.name="castle-backdrop-plane",n.renderOrder=-100,ff(n,lr/wi),i.add(n),Gb(n),i}function zb(i){const e=Number.isFinite(i)&&i>0?i:lr/wi,t=lr/wi;if(e>t)return{width:wi*e,height:wi,centerY:0};const n=lr/e;return{width:lr,height:n,centerY:wi/2-n/2}}function ff(i,e){const t=zb(e);i.scale.set(t.width,t.height,1),i.position.y=t.centerY}function Gb(i){if(typeof window>"u")return;const e=Jh(X.backdrops.castle);if(e==null)return;const t=Vl(e.browserUrl);new zd().load(t,n=>{n.colorSpace=ht;const r=n.image,s=(r==null?void 0:r.width)!=null&&(r==null?void 0:r.height)!=null&&r.height>0?r.width/r.height:lr/wi;ff(i,s),Dl(i.material),i.material=new as({map:n,depthWrite:!1})},void 0,n=>{console.warn(`Failed to load castle backdrop texture from ${t}`,n)})}function Hb(){const i=new dn;return i.add(an(new Fn(.42,.52,1.1,18),"#4b2e83",0,.4,0)),i.add(an(new Tr(.34,18,12),"#f5e9c9",0,1.12,0)),i.add(an(new Fn(.045,.045,1.35,10),"#c8a24b",.48,.45,.04,Math.PI/10)),i.add(an(new sc(.26,.34,4),"#c8a24b",0,1.42,0)),i}function Wb(){const i=new dn,e=new $n(1,1.25,.7),t=new P_(e),n=new Id(t,new rc({color:"#c8a24b"}));return n.position.y=.45,i.add(n),i.add(an(new Tr(.22,16,10),"#f5e9c9",0,.5,0)),i.add(an(new $n(.55,.45,.25),"#8b6fcb",0,.02,0)),i}function Xb(){const i=new dn;i.add(an(new Fn(.035,.035,1,8),"#f5e9c9",0,.38,0));const e=an(new Mr(.55,.36),"#c8a24b",.26,.74,.02);return i.add(e),i}function Yb(){return an(new Fn(.45,.45,.05,24),"#f5e9c9",0,0,0)}function qb(){const i=new dn;return i.add(an(new Fn(.4,.48,.8,14),"#27ae60",0,.32,0)),i.add(an(new Tr(.3,14,10),"#8b6f47",0,.86,0)),i}function jb(){return an(new Fn(.05,.05,1,8),"#f2c94c",0,0,0,Math.PI/2)}function Kb(i){const e=$b(i);return an(new $n(.7,.7,.7),e,0,.35,0)}function an(i,e,t,n,r,s=0){const a=new os({color:e,roughness:.7,metalness:.05}),o=new Mt(i,a);return o.position.set(t,n,r),o.rotation.z=s,o}function Dl(i){if(Array.isArray(i)){for(const e of i)mh(e);return}mh(i)}function mh(i){"map"in i&&i.map instanceof Ft&&i.map.dispose(),i.dispose()}function $b(i){let e=0;for(let t=0;t<i.length;t+=1)e=e*31+i.charCodeAt(t)>>>0;return`#${(e&16777215).toString(16).padStart(6,"0")}`}class Zb{constructor(){Le(this,"objectById",new Map);Le(this,"templateById",new Map);Le(this,"templateVersionById",new Map)}get(e){return this.objectById.get(e)}set(e,t,n,r){this.objectById.set(e,r),this.templateById.set(e,t),this.templateVersionById.set(e,n)}getTemplateId(e){return this.templateById.get(e)}getTemplateVersion(e){return this.templateVersionById.get(e)}entries(){return this.objectById.entries()}delete(e){this.objectById.delete(e),this.templateById.delete(e),this.templateVersionById.delete(e)}clear(){this.objectById.clear(),this.templateById.clear(),this.templateVersionById.clear()}}class Jb{constructor(e){Le(this,"scene",new v_);Le(this,"camera",Qb(1080/500));Le(this,"renderer");Le(this,"factory",new Ob);Le(this,"objectCache",new Zb);Le(this,"cameraController",new FT);Le(this,"animationMixers",new Map);Le(this,"elapsedSec",0);this.container=e,this.renderer=new UT({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(1080,500,!1),this.renderer.domElement.className="hero-stage-canvas",this.container.appendChild(this.renderer.domElement),this.scene.background=new Ue("#20172f"),this.scene.add(new Wd("#ffffff",1.5));const t=new Hd("#fff4d6",1.2);t.position.set(3,4,5),this.scene.add(t)}render(e,t){this.elapsedSec+=Math.max(0,t),this.syncCamera(e),this.syncObjects([...e.objects,...rw(e.activeProjectiles)]),this.updateAnimationMixers(t),this.renderer.render(this.scene,this.camera)}resize(e,t){this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(e,t,!1),ew(this.camera,e/t),this.camera.updateProjectionMatrix()}dispose(){for(const[,e]of this.objectCache.entries())this.scene.remove(e),this.factory.dispose(e);this.animationMixers.clear(),this.objectCache.clear(),this.factory.disposeCachedResources(),this.renderer.dispose(),this.renderer.domElement.remove()}syncCamera(e){this.cameraController.apply(this.camera,e.camera,tw(this.camera))}syncObjects(e){const t=new Set;for(const n of e){t.add(n.objectId);const r=this.getOrCreateObject(n);nw(r,n,this.elapsedSec)}for(const[n,r]of[...this.objectCache.entries()])t.has(n)||(this.scene.remove(r),this.animationMixers.delete(n),this.factory.dispose(r),this.objectCache.delete(n))}getOrCreateObject(e){const t=this.objectCache.get(e.objectId),n=this.factory.getTemplateVersion(e.templateId);if(t!=null&&this.objectCache.getTemplateId(e.objectId)===e.templateId&&this.objectCache.getTemplateVersion(e.objectId)===n)return t;t!=null&&(this.scene.remove(t),this.animationMixers.delete(e.objectId),this.factory.dispose(t),this.objectCache.delete(e.objectId));const r=this.factory.create(e.templateId);return this.objectCache.set(e.objectId,e.templateId,n,r),this.attachLoopingAnimation(e.objectId,r),this.scene.add(r),r}attachLoopingAnimation(e,t){const n=t.animations[0];if(n==null)return;const r=new Bv(t),s=r.clipAction(n);s.reset(),s.setLoop(Sd,1/0),s.play(),this.animationMixers.set(e,r)}updateAnimationMixers(e){const t=Math.max(0,e);for(const n of this.animationMixers.values())n.update(t)}}function Qb(i){const e=hc(i);return new Pa(e.left,e.right,e.top,e.bottom,.1,100)}function ew(i,e){const t=hc(e);i.left=t.left,i.right=t.right,i.top=t.top,i.bottom=t.bottom}function tw(i){const e=i.right-i.left,t=i.top-i.bottom;return t>0?e/t:1}function nw(i,e,t){const n=e.transform;i.position.set(n.position.x,n.position.y,n.position.z),i.quaternion.set(n.rotation.x,n.rotation.y,n.rotation.z,n.rotation.w),i.scale.set(n.scale.x,n.scale.y,n.scale.z),i.visible=e.visible,e.animationId==="victory"&&(i.position.y+=Math.sin(t*8)*.08),e.animationId==="stunned"&&(i.rotation.z=Math.sin(t*18)*.12),e.animationId==="yank"&&(i.position.y+=Math.min(1.6,t%1.4*1.8)),i.traverse(r=>{r instanceof Mt&&(r.renderOrder=e.renderOrder??0,(e.opacity!=null||e.tintHex!=null)&&iw(r.material,e.tintHex,e.opacity))})}function iw(i,e,t){const n=Array.isArray(i)?i:[i];for(const r of n)(r instanceof os||r instanceof as)&&(e!=null&&r.color.set(e),t!=null&&(r.opacity=t,r.transparent=t<1))}function rw(i){return i.map(e=>({objectId:`projectile-${e.projectileId}`,templateId:Bt.projectilePlaceholder,transform:{position:{x:(e.from.x+e.to.x)/2,y:(e.from.y+e.to.y)/2,z:(e.from.z+e.to.z)/2},rotation:{x:0,y:0,z:0,w:1},scale:{x:.1,y:.1,z:1}},visible:e.remainingSec>0,lifetime:"oneShot",replication:"localCosmetic",renderLayer:"heroStage",renderOrder:10,tintHex:sw(e.schoolId),opacity:Math.min(1,Math.max(.15,e.remainingSec/.08))}))}function sw(i){switch(i){case"fire":return"#eb5757";case"ice":return"#2d9cdb";case"lightning":return"#f2c94c";case"earth":return"#27ae60"}}const Fi=document.querySelector("#app");if(Fi==null)throw new Error("Missing #app root element.");const Xn=new Zm(lg(window.location.search),{debugLevelType:cg(window.location.search),debugStartLevel:ug(window.location.search)});Fi.innerHTML=`
  <main class="game-shell" aria-label="Magus Match prototype shell">
    <section class="logical-stage">
      <canvas class="game-canvas" width="${Zt}" height="${Un}" aria-label="Magus Match board and HUD"></canvas>
      <div class="hero-stage" data-hero-stage aria-label="Magus Match hero stage"></div>
      <div class="debug-panel" data-debug></div>
    </section>
  </main>
`;const pf=Fi.querySelector(".game-shell"),mf=Fi.querySelector(".logical-stage");if(pf==null||mf==null)throw new Error("Failed to create game shell.");const gf=pf,aw=mf,ow=pc(Fi,"[data-debug]"),lw=pc(Fi,".game-canvas"),cw=pc(Fi,"[data-hero-stage]"),_f=lw.getContext("2d");if(_f==null)throw new Error("Unable to create 2D canvas context.");const dc=new Gg(_f,{},Zt,Un),Ua=new Jb(cw),vf=new Rg,xf=new Cg;let ia=xf.load(),Ul=null;const uw=new hg(gf);Eg().then(i=>{dc.setImages(i)});function Sf(){const i=gf.getBoundingClientRect(),e=Math.min(i.width/Zt,i.height/Un);aw.style.transform=`scale(${e})`,Ua.resize(1080,500)}function yf(i=fc()){ow.textContent=`${i.phase} | ${i.debugText??""}`}let Po=0;function Mf(i){const e=Po===0?0:Math.min((i-Po)/1e3,.03333333333333333);Po=i,Xn.update(e,uw.drainCommands());const t=fc(),n=Tf();hw(Xn.drainEvents()),yf(t),nd(dc,vf.present(Xn.getBoardRenderState(),i/1e3),t,i/1e3,n),Ua.render(Xn.getHeroWorldState(),e),requestAnimationFrame(Mf)}Sf();yf();nd(dc,vf.present(Xn.getBoardRenderState(),0),fc(),0,Tf());Ua.render(Xn.getHeroWorldState(),0);window.addEventListener("resize",Sf);window.addEventListener("beforeunload",()=>Ua.dispose());requestAnimationFrame(Mf);function hw(i){for(const e of i)if(e.type!=="soundRequested"){if(e.type==="levelStarted"){Ul=null;continue}if(e.type==="runEnded"){const t=km(e.finalScore,e.levelsCleared,Xn.getRunStateForDebug().seed,Date.now()),n=Om(ia,t);ia=n.entries,Ul=n.qualifiedRank,xf.save(ia)}}}function fc(){return{...Xn.getHudState(),muted:!0}}function Tf(){return{...Xn.getScreenState(ia,Ul),muted:!0}}function pc(i,e){const t=i.querySelector(e);if(t==null)throw new Error(`Missing required element: ${e}`);return t}
