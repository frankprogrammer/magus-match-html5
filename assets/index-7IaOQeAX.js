var Dp=Object.defineProperty;var Up=(i,e,t)=>e in i?Dp(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Te=(i,e,t)=>Up(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const qt=1080,Bn=1920,ts=500,Kn=150,Np=1270,Ae=8,Fp=ts+Kn,Bp=(Np-qt)/2,se={x:0,y:Fp+Bp,width:qt,height:qt,cellSize:qt/Ae},Zc={x:300,y:1040,width:480,height:112},Jc={x:300,y:1570,width:480,height:112},Op={x:930,y:ts,width:150,height:Kn};function Qc(i,e){return i.x>=e.x&&i.y>=e.y&&i.x<e.x+e.width&&i.y<e.y+e.height}function Jo(i){const e=i.x-se.x,t=i.y-se.y;return e<0||t<0||e>=se.width||t>=se.height?null:{col:Math.floor(e/se.cellSize),row:Math.floor(t/se.cellSize)}}const Sa=2654435769;class Ma{constructor(e=Sa){Te(this,"state");this.state=e>>>0,this.state===0&&(this.state=Sa)}nextUint32(){let e=this.state;return e^=e<<13,e^=e>>>17,e^=e<<5,this.state=e>>>0,this.state}nextFloat(){return this.nextUint32()/4294967296}nextInt(e,t){if(!Number.isInteger(e)||!Number.isInteger(t))throw new Error("nextInt bounds must be integers.");if(t<=e)throw new Error("nextInt maxExclusive must be greater than minInclusive.");return e+Math.floor(this.nextFloat()*(t-e))}getState(){return this.state}}function Qa(){if(typeof crypto<"u"&&"getRandomValues"in crypto){const e=new Uint32Array(1);return crypto.getRandomValues(e),e[0]===0?Sa:e[0]}const i=Math.floor(Math.random()*4294967295)>>>0;return i===0?Sa:i}const Mr=["FIRE","ICE","LIGHTNING","EARTH"],kp=["ROCKET_H","ROCKET_V","TNT","LIGHTBALL"];function ti(i){return Mr.includes(i)}function yr(i){return kp.includes(i)}function Na(i){return ti(i)||i==="LAND"}function gs(i="tile"){let e=0;return()=>`${i}-${e++}`}function _s(i,e="tile"){let t=Wp(i,e);return()=>`${e}-${t++}`}function xs(i,e,t,n=gs(`${i.toLowerCase()}-${e}-${t}`),r="IDLE"){return{id:n(),type:i,col:e,row:t,state:r,spawnedAtMs:0}}function ic(i={}){return Array.from({length:Ae},(e,t)=>Array.from({length:Ae},(n,r)=>{var s;return{tile:null,blocker:null,modifier:null,isVoid:((s=i.voidCells)==null?void 0:s.some(a=>a.col===r&&a.row===t))??!1,isPath:!1}}))}function gt(i){return i.map(e=>e.map(t=>({tile:t.tile==null?null:{...t.tile},blocker:t.blocker==null?null:Gp(t.blocker),modifier:t.modifier,isVoid:t.isVoid,isPath:t.isPath})))}function zp(i,e={},t=gs("tile")){const n=ic(e);return id(n,i,t),n}function id(i,e,t=gs("tile")){for(let n=0;n<Ae;n+=1)for(let r=0;r<Ae;r+=1){const s=i[n][r];if(s.isVoid||s.tile!=null)continue;const a=Mr.filter(c=>!rd(i,{col:r,row:n},c)),o=a.length>0?a:Mr,l=o[e.nextInt(0,o.length)];s.tile=xs(l,r,n,t)}}function rd(i,e,t){return gi(i,e,t,-1,0)+gi(i,e,t,1,0)+1>=3||gi(i,e,t,0,-1)+gi(i,e,t,0,1)+1>=3}function gi(i,e,t,n,r){let s=0,a=e.col+n,o=e.row+r;for(;Fa({col:a,row:o});){const l=i[o][a].tile;if((l==null?void 0:l.type)!==t)break;s+=1,a+=n,o+=r}return s}function Fa(i){return i.col>=0&&i.col<Ae&&i.row>=0&&i.row<Ae}function It(i,e){return Fa(e)?i[e.row][e.col]:null}function Ba(i,e,t){const n=It(i,e),r=It(i,t);if(n==null||r==null)throw new Error("Cannot swap cells outside board.");const s=n.tile,a=r.tile;n.tile=a==null?null:{...a,col:e.col,row:e.row},r.tile=s==null?null:{...s,col:t.col,row:t.row}}function xr(i){const e=[];for(let t=0;t<Ae;t+=1)for(let n=0;n<Ae;n+=1)i[t][n].isVoid||e.push({col:n,row:t});return e}function Vp(i){const e=[];for(let t=0;t<Ae;t+=1)for(let n=0;n<Ae;n+=1)i[t][n].isVoid&&e.push({col:n,row:t});return e}function Hp(i,e){return i.col===e.col&&i.row===e.row}function nt(i){return`${i.col},${i.row}`}function gn(i){const e=new Set,t=[];for(const n of i){const r=nt(n);e.has(r)||(e.add(r),t.push(n))}return Si(t)}function Si(i){return[...i].sort((e,t)=>e.row-t.row||e.col-t.col)}function Gp(i){return{type:i.type,hp:i.hp,position:{...i.position}}}function Wp(i,e){var r;const t=`${e}-`;let n=-1;for(const s of i)for(const a of s){const o=(r=a.tile)==null?void 0:r.id;if(o==null||!o.startsWith(t))continue;const l=o.slice(t.length);/^\d+$/.test(l)&&(n=Math.max(n,Number(l)))}return n+1}function Dn(i){return{cells:xr(i).map(e=>{const t=i[e.row][e.col],n=t.tile;return n==null?null:{tileId:n.id,tileType:n.type,coord:e,isPath:t.isPath}}).filter(e=>e!=null)}}function Oa(i,e,t){return{kind:i.kind??"resolution",revisionId:i.revisionId,swappedCells:i.swappedCells??null,preSwapSnapshot:Dn(i.preSwapBoard),postSwapSnapshot:Dn(i.postSwapBoard),cascadeSteps:e,finalSnapshot:Dn(t)}}function Xp(i,e){const t={cells:[]},n=Dn(i),r=$p(i)?Kp(i,n.cells):n.cells.map(s=>({tileId:s.tileId,tileType:s.tileType,from:{col:s.coord.col,row:s.coord.row-Ae},to:s.coord,isPath:s.isPath})).sort((s,a)=>s.to.col-a.to.col||a.to.row-s.to.row);return{kind:"levelIntro",revisionId:e,swappedCells:null,preSwapSnapshot:t,postSwapSnapshot:t,cascadeSteps:[{stepIndex:0,beforeClearSnapshot:t,beforeGravitySnapshot:t,afterGravitySnapshot:t,finalSnapshot:n,clearedTiles:[],fallingTiles:[],refillTiles:r}],finalSnapshot:n}}function sd(i,e,t,n){const r=gt(i);Ba(r,e,t);const s=Dn(i);return{kind:"invalidSwap",revisionId:n,swappedCells:{from:e,to:t},preSwapSnapshot:s,postSwapSnapshot:Dn(r),cascadeSteps:[],finalSnapshot:s}}function ka(i,e,t,n,r,s,a=new Map,o=[]){const l=Dn(e),c=Dn(t),h=Dn(n),u=Dn(r),d=qp(l),f=eu(c),p=eu(h),_=new Set(h.cells.map(y=>y.tileId)),g=gn(s).map(y=>d.get(nt(y))).filter(y=>y!=null).map(y=>({...y,clearDelayMs:a.get(nt(y.coord))})),m=[...p.values()].map(y=>{const A=f.get(y.tileId);return A==null||im(A.coord,y.coord)?null:{tileId:y.tileId,tileType:y.tileType,from:A.coord,to:y.coord,isPath:y.isPath,movementKind:A.coord.col===y.coord.col?"fall":"slide"}}).filter(y=>y!=null),S=u.cells.filter(y=>!_.has(y.tileId)).sort((y,A)=>y.coord.col-A.coord.col||A.coord.row-y.coord.row),M=jp(S,o);return{stepIndex:i,beforeClearSnapshot:l,beforeGravitySnapshot:c,afterGravitySnapshot:h,finalSnapshot:u,clearedTiles:em(g),fallingTiles:tm(m),refillTiles:nm(M)}}function Yp(i,e){if(i!=null)return{...i,revisionId:e}}function qp(i){return new Map(i.cells.map(e=>[nt(e.coord),e]))}function eu(i){return new Map(i.cells.map(e=>[e.tileId,e]))}function jp(i,e=[]){const t=new Map(e.map(r=>[r.tileId,r])),n=new Map;return i.map(r=>{const s=t.get(r.tileId);if(s!=null)return{...s,tileType:r.tileType,to:r.coord,isPath:r.isPath};const a=n.get(r.coord.col)??0;return n.set(r.coord.col,a+1),{tileId:r.tileId,tileType:r.tileType,from:{col:r.coord.col,row:-1-a},to:r.coord,isPath:r.isPath}})}function Kp(i,e){const t=new Map;return[...e].sort((n,r)=>n.coord.col-r.coord.col||r.coord.row-n.coord.row).map(n=>{if(!Zp(i,n.coord)){const s=t.get(n.coord.col)??0;return t.set(n.coord.col,s+1),{tileId:n.tileId,tileType:n.tileType,from:{col:n.coord.col,row:-1-s},to:n.coord,isPath:n.isPath,movementKind:"fall"}}const r=Jp(i,n.coord);return{tileId:n.tileId,tileType:n.tileType,from:{col:r,row:Qp(i,r,n.coord.row)},to:n.coord,isPath:n.isPath,movementKind:"slide"}})}function $p(i){return i.some(e=>e.some(t=>t.isVoid))}function Zp(i,e){for(let t=0;t<e.row;t+=1)if(i[t][e.col].isVoid)return!0;return!1}function Jp(i,e){const t=e.col-1,n=e.col+1,r=(e.row+e.col)%2===0?[t,n]:[n,t];for(const s of r)if(s>=0&&s<Ae&&i.some(a=>!a[s].isVoid))return s;return Math.max(0,Math.min(Ae-1,e.col===0?1:e.col-1))}function Qp(i,e,t){for(let n=t-1;n>=0;n-=1)if(!i[n][e].isVoid)return n;for(let n=t;n<Ae;n+=1)if(!i[n][e].isVoid)return n;return-1}function em(i){return[...i].sort((e,t)=>e.coord.row-t.coord.row||e.coord.col-t.coord.col)}function tm(i){return[...i].sort((e,t)=>e.to.row-t.to.row||e.to.col-t.to.col)}function nm(i){return[...i].sort((e,t)=>e.to.row-t.to.row||e.to.col-t.to.col)}function im(i,e){return i.col===e.col&&i.row===e.row}const rm=30,za=120,Xr=140,Qo=50,ad=180,od=180,ld=90,ca=180,cd=630,ud=135,sm=45,am=45,eo=2,tu=12,hd=200,om=440,lm=2500,nu=2.75,to=2.75,cm=2.75,um=16;function dd(i){if(i.kind==="invalidSwap")return Xr+Qo+ad;const e=Va(i);return e.length===0?za:e[e.length-1].endMs}function Va(i){let e=i.kind==="levelIntro"?0:za;return i.cascadeSteps.map(t=>{const n=e,r=n+hm(i,t),s=fd(t),a=dm(t),o={step:t,popStartMs:n,fallStartMs:r,endMs:r+a,fallDelaysByTileId:s};return e=o.endMs,o})}function hm(i,e){return i.kind==="levelIntro"?0:Math.max(0,...e.clearedTiles.map(n=>n.clearDelayMs??0))+od}function dm(i){const e=fd(i),t=pd(i).reduce((n,r)=>{const s=Math.max(1,Math.abs(r.to.row-r.from.row)),a=fm(s*ld+ud,ca,cd);return Math.max(n,(e.get(r.tileId)??0)+a)},ca);return Math.max(ca,t)}function fd(i){const e=new Map;for(const n of pd(i))e.set(n.to.col,[...e.get(n.to.col)??[],n]);const t=new Map;for(const n of e.values())[...n].sort((s,a)=>a.to.row-s.to.row||a.from.row-s.from.row||s.tileId.localeCompare(a.tileId)).forEach((s,a)=>{t.set(s.tileId,a*rm)});return t}function pd(i){return[...i.fallingTiles,...i.refillTiles]}function fm(i,e,t){return Math.max(e,Math.min(t,i))}function vs(i,e={}){const t=[...pm(i),...mm(i)];if(t.length===0)return[];const n=t.map((l,c)=>c),r=l=>{let c=n[l];for(;c!==n[c];)c=n[c];return n[l]=c,c},s=(l,c)=>{const h=r(l),u=r(c);h!==u&&(n[u]=h)},a=new Map;t.forEach((l,c)=>{for(const h of l.coords){const u=nt(h),d=a.get(u)??[];d.push(c),a.set(u,d)}});for(const l of a.values())for(let c=1;c<l.length;c+=1){const h=l[0],u=l[c];t[h].tileType===t[u].tileType&&s(h,u)}const o=new Map;return t.forEach((l,c)=>{const h=r(c),u=o.get(h)??[];u.push(l),o.set(h,u)}),[...o.values()].map(l=>gm(l,e.preferredSpawnCell)).sort((l,c)=>l.spawnCell.row-c.spawnCell.row||l.spawnCell.col-c.spawnCell.col)}function pm(i){var t;const e=[];for(let n=0;n<Ae;n+=1){let r=0;for(;r<Ae;){const s=i[n][r].tile;if(s==null||!Na(s.type)){r+=1;continue}const a=r,o=s.type;for(;r<Ae&&((t=i[n][r].tile)==null?void 0:t.type)===o;)r+=1;r-a>=3&&e.push({axis:"horizontal",tileType:o,coords:Array.from({length:r-a},(l,c)=>({col:a+c,row:n}))})}}return e}function mm(i){var t;const e=[];for(let n=0;n<Ae;n+=1){let r=0;for(;r<Ae;){const s=i[r][n].tile;if(s==null||!Na(s.type)){r+=1;continue}const a=r,o=s.type;for(;r<Ae&&((t=i[r][n].tile)==null?void 0:t.type)===o;)r+=1;r-a>=3&&e.push({axis:"vertical",tileType:o,coords:Array.from({length:r-a},(l,c)=>({col:n,row:a+c}))})}}return e}function gm(i,e){const t=gn(i.flatMap(a=>a.coords)),n=[...new Set(i.map(a=>a.axis))].sort(),r=_m(i,t.length),s=xm(r);return{tiles:t,tileType:i[0].tileType,axes:n,shape:r,spawnPowerUp:s,spawnCell:vm(t,e)}}function _m(i,e){var r;if(new Set(i.map(s=>s.axis)).size>1&&e>=5)return"tnt";const n=Math.max(...i.map(s=>s.coords.length));return n>=5?"lightball":n===4?((r=i.find(s=>s.coords.length===4))==null?void 0:r.axis)==="vertical"?"rocketV":"rocketH":"basic"}function xm(i){switch(i){case"rocketH":return"ROCKET_H";case"rocketV":return"ROCKET_V";case"lightball":return"LIGHTBALL";case"tnt":return"TNT";case"basic":return null}}function vm(i,e){if(e!=null&&i.some(s=>s.col===e.col&&s.row===e.row))return{...e};const t=i.reduce((s,a)=>({col:s.col+a.col,row:s.row+a.row}),{col:0,row:0}),n=t.col/i.length,r=t.row/i.length;return Si(i).reduce((s,a)=>{const o=iu(s,n,r);return iu(a,n,r)<o?a:s})}function iu(i,e,t){return(i.col-e)**2+(i.row-t)**2}const Sm=new Set(["LOCK","METAL_PLATE","BOX"]);function ya(i,e,t){const n=It(i,e),r=It(i,t);if(n==null||r==null)return{valid:!1,reason:"outOfBounds"};if(!gd(e,t))return{valid:!1,reason:"notAdjacent"};if(n.isVoid||r.isVoid)return{valid:!1,reason:"voidCell"};if(n.tile==null||r.tile==null)return{valid:!1,reason:"emptyCell"};if(ru(n)||ru(r))return{valid:!1,reason:"blockedCell"};if(n.tile.type==="LIGHTBALL"||r.tile.type==="LIGHTBALL")return{valid:!0,reason:"valid"};if(yr(n.tile.type)||yr(r.tile.type))return{valid:!0,reason:"valid"};const s=md(i,e,t);return vs(s,{preferredSpawnCell:t}).length>0?{valid:!0,reason:"valid"}:{valid:!1,reason:"noMatch"}}function md(i,e,t){const n=gt(i);return Ba(n,e,t),n}function Mm(i){const e=[];for(let t=0;t<Ae;t+=1)for(let n=0;n<Ae;n+=1){const r={col:n,row:t},s={col:n+1,row:t},a={col:n,row:t+1};n+1<Ae&&ya(i,r,s).valid&&e.push({from:r,to:s}),t+1<Ae&&ya(i,r,a).valid&&e.push({from:r,to:a})}return e}function ym(i){return Mm(i).length}function gd(i,e){return Math.abs(i.col-e.col)+Math.abs(i.row-e.row)===1}function ru(i){return i.blocker!=null&&Sm.has(i.blocker.type)}function Tm(i){const e=[];for(let t=0;t<Ae;t+=1)for(let n=0;n<Ae;n+=1){const r={col:n,row:t},s={col:n+1,row:t},a={col:n,row:t+1};if(n+1<Ae){const o=su(i,r,s);o!=null&&e.push(o)}if(t+1<Ae){const o=su(i,r,a);o!=null&&e.push(o)}}return e}function su(i,e,t){if(!gd(e,t))return null;const n=It(i,e),r=It(i,t);if(n==null||r==null||n.isVoid||r.isVoid||n.tile==null||r.tile==null||!ti(n.tile.type)||!ti(r.tile.type))return null;const s=md(i,e,t),a=vs(s,{preferredSpawnCell:t}).filter(h=>h.tiles.some(u=>Ui(u,e)||Ui(u,t)));if(a.length===0)return null;const l=(a.find(h=>h.tiles.some(u=>Ui(u,t)))??a[0]).tiles.some(h=>Ui(h,t))?e:t,c=Ui(l,e)?t:e;return{from:e,to:t,movingCell:l,direction:{col:c.col-l.col,row:c.row-l.row},flashCells:gn(a.flatMap(h=>h.tiles.map(u=>bm(u,e,t))))}}function bm(i,e,t){return Ui(i,t)?{...e}:Ui(i,e)?{...t}:{...i}}function Ui(i,e){return i.col===e.col&&i.row===e.row}const W={tiles:{fire:"tile.fire",ice:"tile.ice",lightning:"tile.lightning",earth:"tile.earth",land:"tile.land",path:"tile.path",empty:"tile.empty"},powerUps:{rocketH:"power.rocketH",rocketV:"power.rocketV",tnt:"power.tnt",lightball:"power.lightball"},backdrops:{forest:"backdrop.forest",crypt:"backdrop.crypt",crystalCave:"backdrop.crystalCave",castle:"backdrop.castle"},rigs:{mage:"rig.mage",prince:"rig.prince",kobold:"rig.kobold",tallKobold:"rig.tallKobold"},props:{princeCage:"prop.princeCage",goalFlag:"prop.goalFlag",abductorGlove:"prop.abductorGlove",abductorHook:"prop.abductorHook",abductorHand:"prop.abductorHand",abductorRope:"prop.abductorRope"},ui:{hudBanner:"ui.hudBanner",boardBackground:"ui.boardBackground"},materials:{mageTexture:"material.mageTexture"},sounds:{tileMatch:"sound.tileMatch",comboPitchStep:"sound.comboPitchStep",fireWhoosh:"sound.spell.fire.whoosh",iceWhoosh:"sound.spell.ice.whoosh",lightningWhoosh:"sound.spell.lightning.whoosh",earthWhoosh:"sound.spell.earth.whoosh",fireImpact:"sound.spell.fire.impact",iceImpact:"sound.spell.ice.impact",lightningImpact:"sound.spell.lightning.impact",earthImpact:"sound.spell.earth.impact",pathConvert:"sound.pathConvert",mageWalk:"sound.mageWalk",monsterDamage:"sound.monsterDamage",monsterDefeat:"sound.monsterDefeat",powerupCreate:"sound.powerupCreate",victorySting:"sound.victorySting",cageYankWhoosh:"sound.cageYankWhoosh",runEnd:"sound.runEnd"}};function wm(i){return i<=3?{moveBudget:20,candidatePathLandRatio:.5,offPathLandRatio:.2}:i<=7?{moveBudget:18,candidatePathLandRatio:.45,offPathLandRatio:.18}:i<=12?{moveBudget:16,candidatePathLandRatio:.4,offPathLandRatio:.16}:i<=18?{moveBudget:15,candidatePathLandRatio:.36,offPathLandRatio:.14}:{moveBudget:14,candidatePathLandRatio:.32,offPathLandRatio:.12}}function _d(i){return i<=3?{basicKoboldCount:3,tallKoboldCount:0,miniBossCount:0,waveCount:1,spawnIntervalMs:1200,waveGapMs:0,basicKoboldHp:72,tallKoboldHp:120,miniBossHp:192,walkSpeed:.25,baseDamage:12}:i<=7?{basicKoboldCount:5,tallKoboldCount:1,miniBossCount:0,waveCount:1,spawnIntervalMs:1050,waveGapMs:0,basicKoboldHp:104,tallKoboldHp:130,miniBossHp:208,walkSpeed:.275,baseDamage:13}:i<=12?{basicKoboldCount:6,tallKoboldCount:2,miniBossCount:0,waveCount:1,spawnIntervalMs:950,waveGapMs:0,basicKoboldHp:140,tallKoboldHp:168,miniBossHp:224,walkSpeed:.35,baseDamage:14}:i<=18?{basicKoboldCount:7,tallKoboldCount:3,miniBossCount:i%3===0?1:0,waveCount:1,spawnIntervalMs:850,waveGapMs:0,basicKoboldHp:180,tallKoboldHp:210,miniBossHp:240,walkSpeed:.4,baseDamage:15}:{basicKoboldCount:8,tallKoboldCount:4,miniBossCount:2,waveCount:2,spawnIntervalMs:750,waveGapMs:2200,basicKoboldHp:192,tallKoboldHp:224,miniBossHp:256,walkSpeed:.475,baseDamage:16}}const Yr={col:0,row:0},el={col:7,row:7},rc={from:{col:3,row:1},to:{col:3,row:0}},au=[{col:1,row:0},{col:2,row:0},rc.from];function no(i){const e=new Ma(i.seed),t=wm(i.difficulty),n=Em(e,Yr,el);if(n.length-1>t.moveBudget)throw new Error("Generated Journey path exceeds move budget.");const r=gs("journey-tile"),s=ic();s[Yr.row][Yr.col].isPath=!0;const a=Cm(s,e,r,n,t.candidatePathLandRatio,t.offPathLandRatio);return id(s,e,r),{type:"JOURNEY",difficulty:i.difficulty,seed:i.seed,initialBoard:s,journey:{moveBudget:t.moveBudget,startCell:Yr,goalCell:el,landTilePositions:a,candidatePathSolution:n,firstHint:rc}}}function Em(i,e,t){const n=[e,{col:1,row:0},{col:2,row:0},{col:3,row:0}],r=Am(i,n[n.length-1],t);return[...n,...r.slice(1)]}function Am(i,e,t){const n=Pm(),r=new Map;for(const h of n)r.set(nt(h),1+i.nextFloat());const s=new Map,a=new Map,o=new Set(n.map(nt));for(const h of n)s.set(nt(h),Number.POSITIVE_INFINITY);for(s.set(nt(e),0);o.size>0;){const h=[...o].reduce((d,f)=>(s.get(f)??Number.POSITIVE_INFINITY)<(s.get(d)??Number.POSITIVE_INFINITY)?f:d);o.delete(h);const u=lu(h);if(tl(u,t))break;for(const d of Im(u)){const f=nt(d);if(!o.has(f))continue;const p=(s.get(h)??Number.POSITIVE_INFINITY)+(r.get(f)??1);p<(s.get(f)??Number.POSITIVE_INFINITY)&&(s.set(f,p),a.set(f,h))}}const l=[];let c=nt(t);for(;c!==nt(e);){l.push(lu(c));const h=a.get(c);if(h==null)throw new Error("Unable to build Journey candidate path.");c=h}return l.push(e),l.reverse()}function Cm(i,e,t,n,r,s){const a=[],o=new Set([nt(Yr),nt(el),nt(rc.to)]);for(const f of au)io(i,f,t)&&a.push(f);const l=ou(n.filter(f=>!o.has(nt(f))&&!a.some(p=>tl(p,f))),e),c=Math.ceil(l.length*r);for(const f of l){if(a.length>=au.length+c)break;io(i,f,t)&&a.push(f)}const h=new Set(n.map(nt)),u=ou(xr(i).filter(f=>!h.has(nt(f))&&!o.has(nt(f))&&!a.some(p=>tl(p,f))),e),d=Math.ceil(u.length*s);for(const f of u.slice(0,d))io(i,f,t)&&a.push(f);return Si(a)}function io(i,e,t){var r;const n=(r=i[e.row])==null?void 0:r[e.col];return n==null||n.isVoid||n.tile!=null||Rm(i,e)?!1:(n.tile=xs("LAND",e.col,e.row,t),!0)}function Rm(i,e){return gi(i,e,"LAND",-1,0)+gi(i,e,"LAND",1,0)+1>=3||gi(i,e,"LAND",0,-1)+gi(i,e,"LAND",0,1)+1>=3}function Im(i){return[{col:i.col+1,row:i.row},{col:i.col,row:i.row+1},{col:i.col-1,row:i.row},{col:i.col,row:i.row-1}].filter(e=>e.col>=0&&e.col<Ae&&e.row>=0&&e.row<Ae)}function Pm(){return Array.from({length:Ae*Ae},(i,e)=>({col:e%Ae,row:Math.floor(e/Ae)}))}function ou(i,e){const t=[...i];for(let n=t.length-1;n>0;n-=1){const r=e.nextInt(0,n+1);[t[n],t[r]]=[t[r],t[n]]}return t}function lu(i){const[e,t]=i.split(",").map(Number);return{col:e,row:t}}function tl(i,e){return i.col===e.col&&i.row===e.row}function cu(i,e={}){const t=e.minValidMoves??3,n=e.maxAttempts??100;for(let r=0;r<n;r+=1){const s=gs(`tile-${r}`),a=zp(i,e,s);if(Lm(a,t))return a}throw new Error(`Unable to generate playable board after ${n} attempts.`)}function Lm(i,e=3){return vs(i).length===0&&ym(i)>=e}function xd(i){return i<=1?0:i<=3?2:i<=6?4:i<=10?6:8}function Dm(i,e){const t=xd(i);if(t<=0)return[];const n=vd.filter(s=>s.length===t);return(n[e.nextInt(0,n.length)]??[]).map(s=>({...s}))}function Um(i){const e=xd(i);return vd.filter(t=>t.length<=e).sort((t,n)=>n.length-t.length).map(t=>t.map(n=>({...n})))}const vd=[[{col:2,row:3},{col:5,row:3}],[{col:1,row:4},{col:6,row:4}],[{col:3,row:2},{col:4,row:2}],[{col:1,row:3},{col:1,row:4},{col:6,row:3},{col:6,row:4}],[{col:2,row:2},{col:2,row:5},{col:5,row:2},{col:5,row:5}],[{col:3,row:3},{col:4,row:3},{col:3,row:4},{col:4,row:4}],[{col:1,row:2},{col:1,row:3},{col:1,row:4},{col:6,row:2},{col:6,row:3},{col:6,row:4}],[{col:2,row:2},{col:2,row:5},{col:3,row:3},{col:4,row:3},{col:5,row:2},{col:5,row:5}],[{col:1,row:2},{col:1,row:5},{col:2,row:3},{col:5,row:3},{col:6,row:2},{col:6,row:5}],[{col:1,row:2},{col:1,row:3},{col:2,row:2},{col:2,row:3},{col:5,row:2},{col:5,row:3},{col:6,row:2},{col:6,row:3}],[{col:1,row:3},{col:1,row:4},{col:2,row:4},{col:3,row:5},{col:4,row:5},{col:5,row:4},{col:6,row:3},{col:6,row:4}],[{col:2,row:1},{col:5,row:1},{col:1,row:3},{col:6,row:3},{col:1,row:4},{col:6,row:4},{col:2,row:6},{col:5,row:6}]],Sd=-2.85,Nm=.55,Md=Sd+Nm,yd=-.85,Fm=1,sc=[{laneId:0,y:yd,spawnX:4.65}];function Bm(i){const e=new Ma(i.seed),t=_d(i.difficulty),n=Om(e,i.difficulty),r=Vm(km(e,i.difficulty),t.baseDamage);return{type:"TRIAL",difficulty:i.difficulty,seed:i.seed,initialBoard:n,trial:{lanes:sc,mageX:Sd,contactX:Md,laneY:yd,baseDamage:t.baseDamage,waveManifest:r}}}function Om(i,e){const t=Dm(e,i),n=Um(e),r=Xm([t,...n,[]]);for(const s of r)try{return cu(i,{voidCells:s,minValidMoves:3,maxAttempts:120})}catch{}return cu(i,{minValidMoves:3,maxAttempts:120})}function km(i,e){const t=_d(e),n=[...Array.from({length:t.basicKoboldCount},()=>"kobold"),...Array.from({length:t.tallKoboldCount},()=>"tallKobold"),...Array.from({length:t.miniBossCount},()=>"miniBoss")],r=Wm(n,i),s=Math.max(1,t.waveCount),a=Math.ceil(r.length/s);return r.map((o,l)=>{const c=Math.floor(l/a),h=l%a;return{monsterId:`trial-${e}-${l}`,kind:o,laneId:sc[0].laneId,spawnTimeMs:c*t.waveGapMs+h*t.spawnIntervalMs,maxHp:Hm(o,t),walkSpeed:t.walkSpeed,scoreValue:Gm(o)}})}function zm(i,e){if(i.length===0)return!0;const n=i.reduce((s,a)=>{const o=Md+Td(a.kind);return s+(sc[0].spawnX-o)/a.walkSpeed},0)*Fm*e,r=i.reduce((s,a)=>s+a.maxHp,0);return n>=r}function Td(i){switch(i){case"kobold":return .44;case"tallKobold":return .5;case"miniBoss":return .67}}function Vm(i,e){let t=i.map(n=>({...n}));for(let n=0;n<10;n+=1){if(zm(t,e))return t;t=t.map(r=>({...r,maxHp:Math.max(1,Math.floor(r.maxHp*.9))}))}return t}function Hm(i,e){switch(i){case"kobold":return e.basicKoboldHp;case"tallKobold":return e.tallKoboldHp;case"miniBoss":return e.miniBossHp}}function Gm(i){switch(i){case"kobold":return 100;case"tallKobold":return 220;case"miniBoss":return 500}}function Wm(i,e){const t=[...i];for(let n=t.length-1;n>0;n-=1){const r=e.nextInt(0,n+1);[t[n],t[r]]=[t[r],t[n]]}return t}function Xm(i){const e=new Set,t=[];for(const n of i){const r=Ym(n);e.has(r)||(e.add(r),t.push(n.map(s=>({...s}))))}return t}function Ym(i){return[...i].sort((e,t)=>e.row-t.row||e.col-t.col).map(e=>`${e.col},${e.row}`).join("|")}function qm(i){return i.forcedLevelType==="TRIAL"?Bm(i):(i.forcedLevelType==="JOURNEY"||i.levelNumber!==1,no(i))}function bd(i,e,t={}){const n=gt(i),r=[],s=[],a=t.maxIterations??50,o=t.nextTileId??_s(n,"cascade-tile");for(let l=0;l<a;l+=1){const c=vs(n,{preferredSpawnCell:l===0?t.preferredSpawnCell:void 0});if(c.length===0)return{board:n,steps:r,animationTrace:t.animation==null?void 0:Oa(t.animation,s,n)};const h=gt(n),u=gn(c.flatMap(g=>g.tiles)),d=jm(n,c,o),f=gt(n),p=Ha(n,e,o),_=gt(n);r.push({matches:c,clearedCells:u,spawnedPowerUps:d}),t.animation!=null&&s.push(ka(l,h,f,p.afterGravityBoard,_,u,new Map,p.refillTiles))}throw new Error(`Cascade did not settle after ${a} iterations.`)}function jm(i,e,t){const n=gn(e.flatMap(s=>s.tiles));for(const s of n)i[s.row][s.col].tile=null;const r=[];for(const s of e){if(s.spawnPowerUp==null)continue;const a=i[s.spawnCell.row][s.spawnCell.col];a.isVoid||(a.tile=xs(s.spawnPowerUp,s.spawnCell.col,s.spawnCell.row,t),r.push({type:s.spawnPowerUp,coord:s.spawnCell}))}return r}function Km(i){for(let e=0;e<Ae*Ae;e+=1){const t=Jm(i),n=Qm(i);if(!t&&!n)return}}function Ha(i,e,t){Km(i);const n=gt(i),r=[],s=new Map,a=ig(i).sort((o,l)=>o.col-l.col||l.row-o.row);for(const o of a){const l=nl(i,o)?o.col:$m(i,o),c=!nl(i,o),h=s.get(l)??0;c||s.set(l,h+1);const u=Mr.filter(p=>!rd(i,o,p)),d=u.length>0?u:Mr,f=xs(d[e.nextInt(0,d.length)],o.col,o.row,t);i[o.row][o.col].tile=f,r.push({tileId:f.id,tileType:f.type,from:c?{col:l,row:ng(i,l,o.row)}:{col:l,row:-1-h},to:o,isPath:i[o.row][o.col].isPath,movementKind:l===o.col?"fall":"slide"})}return{afterGravityBoard:n,refillTiles:r}}function nl(i,e){for(let t=0;t<e.row;t+=1)if(i[t][e.col].isVoid)return!1;return!0}function $m(i,e){const t=e.col-1,n=e.col+1,r=(e.row+e.col)%2===0?[t,n]:[n,t];for(const s of r)if(s>=0&&s<Ae&&Zm(i,s))return s;for(const s of r)if(s>=0&&s<Ae)return s;return e.col}function Zm(i,e){return i.some((t,n)=>!t[e].isVoid&&nl(i,{col:e,row:n}))}function Jm(i){var t,n;let e=!1;for(let r=0;r<Ae;r+=1){let s=Ae-1;for(;s>=0;){if(i[s][r].isVoid){i[s][r].tile!=null&&(e=!0),i[s][r].tile=null,s-=1;continue}const a=s;for(;s>=0&&!i[s][r].isVoid;)s-=1;const o=s+1,l=[];for(let c=a;c>=o;c-=1){const h=i[c][r].tile;h!=null&&l.push(h)}for(let c=a;c>=o;c-=1){const h=i[c][r],u=((t=h.tile)==null?void 0:t.id)??null,d=l.shift()??null;h.tile=d==null?null:{...d,col:r,row:c},(((n=h.tile)==null?void 0:n.id)??null)!==u&&(e=!0)}}}return e}function Qm(i){let e=!1;for(let t=Ae-1;t>=1;t-=1)for(let n=0;n<Ae;n+=1){const r=i[t][n];if(r.isVoid||r.tile!=null)continue;const s=eg(i,{col:n,row:t});if(s==null)continue;const a=i[s.row][s.col],o=a.tile;o!=null&&(r.tile={...o,col:n,row:t},a.tile=null,e=!0)}return e}function eg(i,e){if(!tg(i,e))return null;const t={col:e.col-1,row:e.row-1},n={col:e.col+1,row:e.row-1},r=(e.row+e.col)%2===0?[t,n]:[n,t];for(const s of r){if(s.col<0||s.col>=Ae)continue;const a=i[s.row][s.col];if(!(a.isVoid||a.tile==null))return s}return null}function tg(i,e){for(let t=0;t<e.row;t+=1)if(i[t][e.col].isVoid)return!0;return!1}function ng(i,e,t){for(let n=t-1;n>=0;n-=1)if(!i[n][e].isVoid)return n;for(let n=t;n<Ae;n+=1)if(!i[n][e].isVoid)return n;return-1}function ig(i){const e=[];for(let t=0;t<Ae;t+=1)for(let n=0;n<Ae;n+=1){const r=i[t][n];!r.isVoid&&r.tile==null&&e.push({col:n,row:t})}return Si(e)}function rg(i){return i==="ROCKET_H"||i==="ROCKET_V"}function Ta(i){return rg(i)||i==="TNT"||i==="LIGHTBALL"}function wd(i,e){var t,n;return((n=(t=It(i,e))==null?void 0:t.tile)==null?void 0:n.type)!=="LIGHTBALL"?null:Ed(i,e)}function Ed(i,e){var r,s;const t=new Set;for(const a of dg(e)){const o=(s=(r=It(i,a))==null?void 0:r.tile)==null?void 0:s.type;o!=null&&ti(o)&&t.add(o)}if(t.size===0)return null;const n=fg(i);return Mr.filter(a=>t.has(a)).reduce((a,o)=>a==null||n[o]>n[a]?o:a,null)}function Ad(i,e,t={}){var h,u,d,f;const n=(u=(h=It(i,e))==null?void 0:h.tile)==null?void 0:u.type;if(n==null||!yr(n))throw new Error("Cannot resolve a power-up chain from a cell that does not contain a power-up tile.");const r=gt(i),s=[{coord:e,powerUpType:n,activationDelayMs:0,lightballTargetType:t.lightballTargetType}],a=new Set([nt(e)]),o=new Set,l=[];for(;s.length>0;){s.sort(ag);const p=s.shift(),_=nt(p.coord);if(a.delete(_),o.has(_))continue;o.add(_);const m=(p.powerUpType==="LIGHTBALL"?p.lightballTargetType??Ed(r,p.coord):p.lightballTargetType)??void 0,S=sg(r,p.coord,p.powerUpType,{lightballTargetType:m}),M=new Set;for(const b of S.clearTimings){const R=nt(b.coord);if(R===_||o.has(R)||a.has(R))continue;const v=(f=(d=It(r,b.coord))==null?void 0:d.tile)==null?void 0:f.type;v==null||!yr(v)||(s.push({coord:b.coord,powerUpType:v,activationDelayMs:p.activationDelayMs+b.clearDelayMs}),a.add(R),M.add(R))}const y=S.clearTimings.filter(b=>!M.has(nt(b.coord))),A={...S,clearedCells:Si(y.map(b=>b.coord)),clearTimings:y,lightballTargetType:m};l.push({detonation:A,activationDelayMs:p.activationDelayMs});for(const b of A.clearedCells){const R=It(r,b);R!=null&&(R.tile=null)}}const c=l.flatMap(p=>p.detonation.clearTimings.map(_=>({coord:_.coord,clearDelayMs:p.activationDelayMs+_.clearDelayMs})));return{detonations:l,clearedCells:gn(l.flatMap(p=>p.detonation.clearedCells)),clearTimings:c}}function sg(i,e,t,n={}){switch(t){case"ROCKET_H":return uu(i,e,t);case"ROCKET_V":return uu(i,e,t);case"TNT":return cg(i,e,t);case"LIGHTBALL":{const r=hg(i,e,n.lightballTargetType);return{powerUpType:t,origin:e,clearedCells:r,clearTimings:r.map(s=>({coord:s,clearDelayMs:0})),lightballTargetType:n.lightballTargetType}}}}function ag(i,e){return i.activationDelayMs-e.activationDelayMs||i.coord.row-e.coord.row||i.coord.col-e.coord.col||i.powerUpType.localeCompare(e.powerUpType)}function og(i,e){const t=ug(i,e);return[...t.filter(n=>n.col===e.col&&n.row===e.row),...t.filter(n=>n.col!==e.col||n.row!==e.row)].map(n=>({coord:n,clearDelayMs:n.col===e.col&&n.row===e.row?0:am}))}function lg(i,e,t){const n=[{coord:e,clearDelayMs:0}],r=Ae-1;for(let s=1;s<=r;s+=1){const a=t==="ROCKET_H"?[{col:e.col-s,row:e.row},{col:e.col+s,row:e.row}]:[{col:e.col,row:e.row-s},{col:e.col,row:e.row+s}];for(const o of a)Cd(i,o)&&n.push({coord:o,clearDelayMs:s*sm})}return n}function cg(i,e,t){const n=og(i,e);return{powerUpType:t,origin:e,clearedCells:Si(n.map(r=>r.coord)),clearTimings:n}}function uu(i,e,t){const n=lg(i,e,t);return{powerUpType:t,origin:e,clearedCells:Si(n.map(r=>r.coord)),clearTimings:n}}function ug(i,e){const t=[];for(let n=e.row-1;n<=e.row+1;n+=1)for(let r=e.col-1;r<=e.col+1;r+=1)t.push({col:r,row:n});return pg(i,t)}function hg(i,e,t){var r;const n=[e];if(t==null)return n;for(let s=0;s<Ae;s+=1)for(let a=0;a<Ae;a+=1){const o={col:a,row:s},l=It(i,o);!(l!=null&&l.isVoid)&&((r=l==null?void 0:l.tile)==null?void 0:r.type)===t&&n.push(o)}return gn(n)}function dg(i){return[{col:i.col+1,row:i.row},{col:i.col,row:i.row+1},{col:i.col-1,row:i.row},{col:i.col,row:i.row-1}].filter(Fa)}function fg(i){var t;const e={FIRE:0,ICE:0,LIGHTNING:0,EARTH:0};for(let n=0;n<Ae;n+=1)for(let r=0;r<Ae;r+=1){const s=(t=i[n][r].tile)==null?void 0:t.type;s!=null&&ti(s)&&(e[s]+=1)}return e}function pg(i,e){return Si(e.filter(t=>Cd(i,t)))}function Cd(i,e){return Fa(e)?!i[e.row][e.col].isVoid:!1}const Rd={matchCount:0,comboCount:0,powerUpsCreated:0,validSwapCount:0};function Id(i){return 1+.1*i}function mg(i,e){return Math.round(1e3*Id(i))+Math.max(0,e)*50}function gg(i,e,t){const n=t>0?e/t:0,r=Math.max(0,n-1)*100;return Math.round(1e3*Id(i)+r)}function Es(i){return i.comboCount*100+i.powerUpsCreated*200}function ac(i,e,t=1){return{matchCount:i,comboCount:Math.max(0,i-1),powerUpsCreated:e,validSwapCount:t}}function _g(i){return{movesRemaining:i.journey.moveBudget,mageCell:i.journey.startCell,hasPlayerMoved:!1,result:"playing"}}function xg(i,e,t,n,r,s){if(e.result!=="playing")return ua(i,e);const a=ya(i,n,r);if(!a.valid)return a.reason==="noMatch"?ua(i,e,sd(i,n,r,0)):ua(i,e);const o=Tg(i,n,r),l=gt(i);Ba(l,n,r);const c={revisionId:0,preSwapBoard:i,postSwapBoard:l,swappedCells:{from:n,to:r}},h=o==null?Ld(l,s,{preferredSpawnCell:r,animation:c}):Dd(l,s,o.originAfterSwap,c,o.targetType);return Pd(e,t,h,o==null?0:1)}function vg(i,e,t,n,r){const s=bg(i,n);if(e.result!=="playing"||s==null)return ua(i,e);const a=Dd(i,r,n,{revisionId:0,preSwapBoard:i,postSwapBoard:i,swappedCells:null},s.targetType);return Pd(e,t,a,1)}function Pd(i,e,t,n){const r=Math.max(0,i.movesRemaining-1),s=t.convertedPathCells.length>0?Sg(t.board,i.mageCell,e.journey.goalCell):i.mageCell,a=Eg(s,e.journey.goalCell,r);return{valid:!0,board:t.board,runtime:{movesRemaining:r,mageCell:s,hasPlayerMoved:!0,result:a},scoreDelta:t.clearedStandardCells.length*10,convertedPathCells:t.convertedPathCells,clearedStandardCells:t.clearedStandardCells,scoringStats:ac(Math.max(n,t.matchCount),t.powerUpsCreated),animationTrace:t.animationTrace}}function Ld(i,e,t={}){const n=gt(i),r=[],s=[];let a=0,o=0;const l=[],c=t.maxIterations??50,h=t.nextTileId??_s(n,"journey-cascade-tile");for(let u=0;u<c;u+=1){const d=vs(n,{preferredSpawnCell:u===0?t.preferredSpawnCell:void 0});if(d.length===0)return{board:n,convertedPathCells:gn(r),clearedStandardCells:gn(s),matchCount:a,powerUpsCreated:o,animationTrace:t.animation==null?void 0:Oa(t.animation,l,n)};const f=gt(n),p=gn(d.flatMap(M=>M.tiles)),_=Mg(n,d,h),g=gt(n);a+=d.length,o+=_.powerUpsCreated,r.push(..._.convertedPathCells),s.push(..._.clearedStandardCells);const m=Ha(n,e,h),S=gt(n);t.animation!=null&&l.push(ka(u,f,g,m.afterGravityBoard,S,p,new Map,m.refillTiles))}throw new Error(`Journey board did not settle after ${c} iterations.`)}function Dd(i,e,t,n,r){var g;const s=gt(i),a=_s(s,"journey-powerup-cascade-tile"),o=Ad(s,t,{lightballTargetType:r}),l=gt(s),c=[],h=[];for(const m of o.detonations){const S=yg(s,m.detonation);c.push(...S.convertedPathCells),h.push(...S.clearedStandardCells)}const u=gt(s),d=Ha(s,e,a),f=gt(s),p=ka(0,l,u,d.afterGravityBoard,f,o.clearedCells,wg(o),d.refillTiles),_=Ld(s,e,{nextTileId:a,animation:n});return{board:_.board,convertedPathCells:gn([...c,..._.convertedPathCells]),clearedStandardCells:gn([...h,..._.clearedStandardCells]),matchCount:1+_.matchCount,powerUpsCreated:_.powerUpsCreated,animationTrace:Oa(n,[p,...((g=_.animationTrace)==null?void 0:g.cascadeSteps.map((m,S)=>({...m,stepIndex:S+1})))??[]],_.board)}}function Sg(i,e,t){const n=Ag(i,e),r=new Set(n.map(nt)),s=Ud(e).filter(a=>r.has(nt(a)));return s.length===0?e:s.reduce((a,o)=>{const l=fu(a,t),c=fu(o,t);return c!==l?c<l?o:a:o.row<a.row||o.row===a.row&&o.col<a.col?o:a})}function hu(i,e,t){return e.hasPlayerMoved||e.result!=="playing"||t*1e3<lm?[]:[i.journey.firstHint.from,i.journey.firstHint.to]}function Mg(i,e,t){const n=[],r=[];let s=0;for(const a of e){if(a.tileType==="LAND"){for(const o of a.tiles){const l=i[o.row][o.col];l.isPath=!0,l.tile=null,n.push(o)}continue}for(const o of a.tiles){const l=i[o.row][o.col];l.tile!=null&&ti(l.tile.type)&&r.push(o),l.tile=null}if(a.spawnPowerUp!=null){const o=i[a.spawnCell.row][a.spawnCell.col];o.isVoid||(o.tile=xs(a.spawnPowerUp,a.spawnCell.col,a.spawnCell.row,t),s+=1)}}return{convertedPathCells:n,clearedStandardCells:r,powerUpsCreated:s}}function yg(i,e){const t=[],n=[];for(const r of e.clearedCells){const s=It(i,r);(s==null?void 0:s.tile)!=null&&(s.tile.type==="LAND"?(s.isPath=!0,t.push(r)):ti(s.tile.type)&&n.push(r),s.tile=null)}return{convertedPathCells:t,clearedStandardCells:n}}function Tg(i,e,t){var s,a,o,l;const n=(a=(s=It(i,e))==null?void 0:s.tile)==null?void 0:a.type,r=(l=(o=It(i,t))==null?void 0:o.tile)==null?void 0:l.type;return Ta(n)?{originAfterSwap:t,targetType:du(r)}:Ta(r)?{originAfterSwap:e,targetType:du(n)}:null}function bg(i,e){var n,r;const t=(r=(n=It(i,e))==null?void 0:n.tile)==null?void 0:r.type;if(!Ta(t))return null;if(t==="LIGHTBALL"){const s=wd(i,e);return s==null?null:{targetType:s}}return{}}function du(i){return i!=null&&Na(i)?i:void 0}function wg(i){const e=new Map;for(const t of i.clearTimings){const n=nt(t.coord),r=e.get(n);(r==null||t.clearDelayMs<r)&&e.set(n,t.clearDelayMs)}return e}function ua(i,e,t){return{valid:!1,board:i,runtime:e,scoreDelta:0,convertedPathCells:[],clearedStandardCells:[],scoringStats:Rd,animationTrace:t}}function Eg(i,e,t){return Hp(i,e)?"won":t<=0?"lost":"playing"}function Ag(i,e){var r,s;if(!((s=(r=i[e.row])==null?void 0:r[e.col])!=null&&s.isPath))return[];const t=new Set,n=[e];for(;n.length>0;){const a=n.shift(),o=nt(a);if(!t.has(o)){t.add(o);for(const l of Ud(a))i[l.row][l.col].isPath&&!t.has(nt(l))&&n.push(l)}}return xr(i).filter(a=>t.has(nt(a)))}function Ud(i){return[{col:i.col+1,row:i.row},{col:i.col,row:i.row+1},{col:i.col-1,row:i.row},{col:i.col,row:i.row-1}].filter(e=>e.col>=0&&e.col<Ae&&e.row>=0&&e.row<Ae)}function fu(i,e){return Math.abs(i.col-e.col)+Math.abs(i.row-e.row)}const qr=1e-6,il=.18;function Cg(i){return Hd({elapsedMs:0,nextSpawnIndex:0,monsters:[],projectiles:[],defeatedMonsterIds:[],totalMonsters:i.trial.waveManifest.length,result:"playing",nextProjectileIndex:0},i)}function Rg(i,e,t){if(i.result!=="playing")return rl(i,t);const n=i.elapsedMs+Math.max(0,t)*1e3,r=Math.max(0,t),s=rl(i,r),a=Xg(s,r),o=Gg(a,r),l={...o,elapsedMs:n,monsters:o.monsters.map(u=>u.hp>0?{...u,x:u.x-u.walkSpeed*r}:u)},c=Hd(l,e),h=Gd(c,e);return{...c,result:h}}function Ig(i,e){return rl(i,e)}function Pg(i,e,t,n,r,s){if(e.result!=="playing")return ha(i,e);const a=ya(i,n,r);if(!a.valid)return a.reason==="noMatch"?ha(i,e,sd(i,n,r,0)):ha(i,e);const o=zg(i,n,r),l=gt(i),c=gt(i);Ba(c,n,r);const h=gt(c),u=_s(c,"trial-cascade-tile"),d=[];let f,p;if(o!=null){const S=Vd(c,s,u,o.originAfterSwap,{revisionId:0,preSwapBoard:l,postSwapBoard:h,swappedCells:{from:n,to:r}},o.targetType),M=kd(S.animationTrace,0);d.push(...S.detonations.map((y,A)=>zd(t,y,M,A===0?o.targetType:void 0))),f=S.cascadeResult,p=S.animationTrace}else f=bd(c,s,{preferredSpawnCell:r,nextTileId:u,animation:{revisionId:0,preSwapBoard:l,postSwapBoard:h,swappedCells:{from:n,to:r}}}),p=f.animationTrace;d.push(...Od(t,f,p,o==null?0:1));const _=Bd(e,t,d),g=f.steps.reduce((S,M)=>S+M.matches.length,0),m=f.steps.reduce((S,M)=>S+M.spawnedPowerUps.length,0);return{valid:!0,board:f.board,runtime:_.runtime,scoreDelta:_.scoreDelta,damageEvents:_.damageEvents,scoringStats:ac(g,m),animationTrace:p}}function Lg(i,e,t,n,r){const s=Vg(i,n);if(e.result!=="playing"||s==null)return ha(i,e);const a=_s(i,"trial-powerup-cascade-tile"),o=Vd(i,r,a,n,{revisionId:0,preSwapBoard:i,postSwapBoard:i,swappedCells:null},s.targetType),l=kd(o.animationTrace,0),c=[...o.detonations.map((f,p)=>zd(t,f,l,p===0?s.targetType:void 0)),...Od(t,o.cascadeResult,o.animationTrace,1)],h=Bd(e,t,c),u=1+o.cascadeResult.steps.reduce((f,p)=>f+p.matches.length,0),d=o.cascadeResult.steps.reduce((f,p)=>f+p.spawnedPowerUps.length,0);return{valid:!0,board:o.cascadeResult.board,runtime:h.runtime,scoreDelta:h.scoreDelta,damageEvents:h.damageEvents,scoringStats:ac(u,d),animationTrace:o.animationTrace}}function Dg(i,e){const t=i.monsters.filter(n=>n.hp>0);return t.length===0?null:t.sort((n,r)=>{const s=Math.abs(n.x-e.trial.mageX),a=Math.abs(r.x-e.trial.mageX);return s-a||n.monsterId.localeCompare(r.monsterId)})[0]}function Ug(i){switch(i.shape){case"basic":return i.tiles.length>=4?2:1;case"rocketH":case"rocketV":return 2;case"lightball":return 3;case"tnt":return 2.5}}function Nd(i,e){return{x:e.x,y:Kg(i,e.laneId),z:$g(e.kind)}}function Fd(i){return{x:i.trial.mageX,y:i.trial.laneY,z:.55}}function Ng(i){const e=Fd(i);return{x:e.x+.55,y:e.y+.95,z:e.z+.05}}function Bd(i,e,t){let n={...i,monsters:i.monsters.map(a=>({...a})),projectiles:i.projectiles.map(a=>({...a})),defeatedMonsterIds:[...i.defeatedMonsterIds]},r=0;const s=[];for(const a of t)for(let o=0;o<a.shotCount;o+=1){const l=Dg(n,e);if(l==null)continue;const c=Math.min(l.hp,a.damage),h=Math.max(0,l.hp-a.damage),u=h<=0,d=o<a.visualShotCount?Bg(n,e,a,l):null,f=n.monsters.map(p=>p.monsterId===l.monsterId?{...p,hp:h,defeatDelaySec:u?a.activationDelaySec+a.durationSec:p.defeatDelaySec,...Wg(p,a.activationDelaySec+a.durationSec)}:p);n={...n,monsters:f,projectiles:d==null?n.projectiles:[...n.projectiles,d],nextProjectileIndex:d==null?n.nextProjectileIndex:n.nextProjectileIndex+1},r+=Math.round(c*2)+(u?l.scoreValue:0),s.push({monsterId:l.monsterId,schoolId:a.schoolId,damage:c,defeated:u})}return{runtime:{...n,result:Gd(n,e)},scoreDelta:r,damageEvents:s}}function Od(i,e,t,n){const r=t==null?[]:Va(t);return e.steps.flatMap((s,a)=>s.matches.filter(o=>ti(o.tileType)).map(o=>{var l;return{schoolId:Wd(o.tileType),effectKind:"match",damage:i.trial.baseDamage*(Ug(o)+a*.25),shotCount:1,visualShotCount:1,activationDelaySec:(((l=r[a+n])==null?void 0:l.popStartMs)??0)/1e3,durationSec:hd/1e3}}))}function kd(i,e){var t;return i==null?0:(((t=Va(i)[e])==null?void 0:t.popStartMs)??0)/1e3}function zd(i,e,t,n){const r=e.detonation,s=n??r.lightballTargetType,a=r.powerUpType==="TNT";return{schoolId:s!=null&&ti(s)?Wd(s):"fire",effectKind:a?"bomb":"match",damage:i.trial.baseDamage*Fg(r.powerUpType),shotCount:pu(r),visualShotCount:a?1:pu(r),activationDelaySec:t+e.activationDelayMs/1e3,durationSec:(a?om:hd)/1e3}}function Fg(i){switch(i){case"ROCKET_H":case"ROCKET_V":return 1.25;case"TNT":return 1.5;case"LIGHTBALL":return 1}}function pu(i){switch(i.powerUpType){case"ROCKET_H":case"ROCKET_V":return 3;case"TNT":return 5;case"LIGHTBALL":return Math.min(8,Math.max(1,Math.ceil(i.clearedCells.length/3)))}}function Bg(i,e,t,n){return{projectileId:`trial-${i.nextProjectileIndex}`,schoolId:t.schoolId,effectKind:t.effectKind,from:Ng(e),to:Nd(e,n),activationDelaySec:t.activationDelaySec,remainingSec:t.durationSec,durationSec:t.durationSec}}function Vd(i,e,t,n,r,s){var p;const a=gt(i),o=Ad(a,n,{lightballTargetType:s}),l=gt(a);for(const _ of o.detonations)Og(a,_.detonation);const c=gt(a),h=Ha(a,e,t),u=gt(a),d=ka(0,l,c,h.afterGravityBoard,u,o.clearedCells,kg(o),h.refillTiles),f=bd(a,e,{preferredSpawnCell:n,nextTileId:t,animation:r});return{cascadeResult:f,detonations:o.detonations,animationTrace:Oa(r,[d,...((p=f.animationTrace)==null?void 0:p.cascadeSteps.map((_,g)=>({..._,stepIndex:g+1})))??[]],f.board)}}function Og(i,e){for(const t of e.clearedCells){const n=It(i,t);n!=null&&(n.tile=null)}}function kg(i){const e=new Map;for(const t of i.clearTimings){const n=nt(t.coord),r=e.get(n);(r==null||t.clearDelayMs<r)&&e.set(n,t.clearDelayMs)}return e}function zg(i,e,t){var s,a;const n=(s=It(i,e))==null?void 0:s.tile,r=(a=It(i,t))==null?void 0:a.tile;return n!=null&&yr(n.type)?{originAfterSwap:t,powerUpType:n.type,targetType:mu(r==null?void 0:r.type)}:r!=null&&yr(r.type)?{originAfterSwap:e,powerUpType:r.type,targetType:mu(n==null?void 0:n.type)}:null}function mu(i){return i!=null&&Na(i)?i:void 0}function Vg(i,e){var n,r;const t=(r=(n=It(i,e))==null?void 0:n.tile)==null?void 0:r.type;if(!Ta(t))return null;if(t==="LIGHTBALL"){const s=wd(i,e);return s==null?null:{targetType:s}}return{}}function Hd(i,e){if(i.monsters.length>0)return i;const t=[...i.monsters];let n=i.nextSpawnIndex;return n<e.trial.waveManifest.length&&e.trial.waveManifest[n].spawnTimeMs<=i.elapsedMs&&(t.push(Hg(e,e.trial.waveManifest[n])),n+=1),{...i,nextSpawnIndex:n,monsters:t}}function Hg(i,e){return{monsterId:e.monsterId,kind:e.kind,laneId:e.laneId,hp:e.maxHp,maxHp:e.maxHp,x:Xd(i,e.laneId).spawnX,spawnTimeMs:e.spawnTimeMs,walkSpeed:e.walkSpeed,scoreValue:e.scoreValue}}function rl(i,e){const t=Math.max(0,e);return{...i,projectiles:i.projectiles.map(n=>qg(n,t)).filter(n=>n.activationDelaySec>0||n.remainingSec>0)}}function Gg(i,e){const t=Math.max(0,e),n=[...i.defeatedMonsterIds],r=i.monsters.map(s=>{if(s.hp>0)return s;const a=(s.defeatDelaySec??0)-t;return{...s,defeatDelaySec:a}}).filter(s=>s.hp>0||(s.defeatDelaySec??0)>qr?!0:(n.includes(s.monsterId)||n.push(s.monsterId),!1));return{...i,monsters:r,defeatedMonsterIds:n}}function Wg(i,e){const t=[...i.hitShakeQueueSec??[],Math.max(0,e)].sort((r,s)=>r-s),n=i.hitShakeRemainingSec??0;return{hitShakeDelaySec:t[0],hitShakeQueueSec:t,hitShakeRemainingSec:n>0?il:n,hitShakeDurationSec:il}}function Xg(i,e){const t=Math.max(0,e);return{...i,monsters:i.monsters.map(n=>Yg(n,t))}}function Yg(i,e){const n=(i.hitShakeQueueSec??(i.hitShakeDelaySec!=null?[i.hitShakeDelaySec]:[])).map(h=>h-e).sort((h,u)=>h-u),r=n.filter(h=>h<=qr).length,s=n.filter(h=>h>qr);let a=s[0];const o=s.length>0?s:void 0;let l=i.hitShakeRemainingSec;const c=i.hitShakeDurationSec??il;return r>0?l=c:l!=null&&l>0&&(l-=e,l<=qr&&(l=void 0)),(l??0)<=qr&&o==null?{...i,hitShakeDelaySec:void 0,hitShakeQueueSec:void 0,hitShakeRemainingSec:void 0,hitShakeDurationSec:void 0}:{...i,hitShakeDelaySec:a,hitShakeQueueSec:o,hitShakeRemainingSec:l,hitShakeDurationSec:c}}function qg(i,e){let t=e,n=i.activationDelaySec,r=i.remainingSec;if(n>0){const s=Math.min(n,t);n-=s,t-=s}return n<=0&&t>0&&(r-=t),{...i,activationDelaySec:Math.max(0,n),remainingSec:r}}function Gd(i,e){return i.monsters.some(t=>t.hp>0&&jg(e,t))?"lost":i.nextSpawnIndex>=e.trial.waveManifest.length&&i.monsters.length===0&&i.defeatedMonsterIds.length>=e.trial.waveManifest.length?"won":"playing"}function jg(i,e){return e.x-Td(e.kind)<=i.trial.contactX}function Wd(i){switch(i){case"FIRE":return"fire";case"ICE":return"ice";case"LIGHTNING":return"lightning";case"EARTH":return"earth"}}function Kg(i,e){return Xd(i,e).y}function Xd(i,e){const t=i.trial.lanes.find(n=>n.laneId===e);if(t==null)throw new Error(`Trial lane ${e} does not exist.`);return t}function $g(i){switch(i){case"kobold":return .35;case"tallKobold":return .45;case"miniBoss":return .55}}function ha(i,e,t){return{valid:!1,board:i,runtime:e,scoreDelta:0,damageEvents:[],scoringStats:Rd,animationTrace:t}}const ba=10,ro=["Brave","Mystic","Golden","Clever","Radiant","Stalwart","Arcane","Noble"],gu=["Magus","Warden","Sage","Spark","Voyager","Keeper","Knight","Seeker"];function Zg(i,e){const t=Ga([...i,e]),n=t.findIndex(r=>r.id===e.id)+1;return{entries:t.slice(0,ba),qualifiedRank:n>0&&n<=ba?n:null}}function Ga(i){return[...i].sort((e,t)=>t.score-e.score||t.levelsCleared-e.levelsCleared||t.createdAtMs-e.createdAtMs)}function Jg(i){var e;return((e=Ga(i)[0])==null?void 0:e.score)??0}function Qg(i,e,t,n){return{id:`${n}-${t}-${i}`,name:e0(t+n),score:i,levelsCleared:e,createdAtMs:n}}function e0(i){const e=ro[Math.abs(i)%ro.length],t=gu[Math.abs(Math.floor(i/ro.length))%gu.length];return`${e} ${t}`}function t0(i){if(i==null||i.trim()==="")return[];try{const e=JSON.parse(i);return Array.isArray(e)?Ga(e.filter(i0)).slice(0,ba):[]}catch{return[]}}function n0(i){return JSON.stringify(Ga(i).slice(0,ba))}function i0(i){if(typeof i!="object"||i==null)return!1;const e=i;return typeof e.id=="string"&&typeof e.name=="string"&&typeof e.score=="number"&&Number.isFinite(e.score)&&typeof e.levelsCleared=="number"&&Number.isFinite(e.levelsCleared)&&typeof e.createdAtMs=="number"&&Number.isFinite(e.createdAtMs)}const r0=3,s0=1.2;function _u(i){return{seed:i,lives:r0,levelNumber:1,difficulty:1,score:0,levelsCleared:0}}function a0(i,e,t){return t??"TRIAL"}function o0(i,e){return u0(i,e,2654435769)||1}function l0(i,e){return{...i,score:i.score+e,levelsCleared:i.levelsCleared+1,levelNumber:i.levelNumber+1,difficulty:i.difficulty+1}}function c0(i){return{...i,lives:Math.max(0,i.lives-1),levelNumber:i.levelNumber+1,difficulty:i.difficulty+1}}function u0(i,e,t){let n=(i^t)>>>0;return n=Math.imul(n^e,2246822507)>>>0,n=Math.imul(n^n>>>13,3266489909)>>>0,(n^n>>>16)>>>0}const Ct={backdropForest:"stage.backdrop.forest",mage:"actor.mage",princeCage:"actor.princeCage",goalFlag:"prop.goalFlag",pathMarker:"prop.pathMarker",monsterPlaceholder:"actor.monster.placeholder",projectilePlaceholder:"vfx.projectile.placeholder",healthBarTrack:"ui.healthBar.track",healthBarFill:"ui.healthBar.fill"},xu={x:2,y:2,z:2},vu=-.72,so=2,ao=.92,h0=.18,d0=.11,f0=.08,p0=.14,m0=.045;class g0{constructor(e,t={}){Te(this,"events",[]);Te(this,"rng",new Ma);Te(this,"elapsedSec",0);Te(this,"run",_u(Qa()));Te(this,"board",ic());Te(this,"currentLevel",null);Te(this,"journeyRuntime",null);Te(this,"trialRuntime",null);Te(this,"phase","TITLE");Te(this,"muted",!1);Te(this,"transitionTimerSec",0);Te(this,"pendingLevelResult",null);Te(this,"pendingClearScore",0);Te(this,"levelMatchCount",0);Te(this,"levelValidSwapCount",0);Te(this,"finalScore",0);Te(this,"debugSeed");Te(this,"visualCues",[]);Te(this,"shakeTimerSec",0);Te(this,"shakeAmplitudePixels",0);Te(this,"latestBoardAnimationTrace",null);Te(this,"latestBoardAnimationEndsAtSec",0);Te(this,"animationClockSec",0);Te(this,"nextBoardAnimationRevision",1);Te(this,"matchHintTimerSec",0);this.options=t,this.debugSeed=e,this.reset(e)}update(e,t){const n=Math.max(0,e);this.animationClockSec+=n,this.updateBoardJuice(n);for(const r of t){if(r.type==="restart"){this.tryAgain();continue}if(r.type==="muteToggle"){this.muted=!this.muted;continue}if(r.type==="tap"){this.handleTap(r.x,r.y);continue}r.type==="swap"&&this.handleSwap(r.from,r.to)}this.phase==="IDLE"&&(this.elapsedSec+=n,this.updateMatchHintTimer(n),this.updateTrialStage(n)),(this.phase==="WIN"||this.phase==="LOSE")&&(this.updateTrialVisualTimers(n),this.transitionTimerSec+=n,this.transitionTimerSec>=s0&&this.hasLatestBoardAnimationFinished()&&this.advanceAfterLevelResult())}getBoardRenderState(){var e,t,n;return{logicalWidth:qt,logicalHeight:Bn,boardCells:xr(this.board).map(r=>{const s=this.board[r.row][r.col].tile;return s==null?null:{tileId:s.id,coord:r,assetId:_0(s.type),tileType:s.type,isPath:this.board[r.row][r.col].isPath,alpha:1}}).filter(r=>r!=null),emptyCells:Vp(this.board).map(r=>({coord:r,assetId:W.tiles.empty})),pathCells:xr(this.board).filter(r=>this.board[r.row][r.col].isPath),mageCell:((e=this.journeyRuntime)==null?void 0:e.mageCell)??null,goalCell:((t=this.currentLevel)==null?void 0:t.type)==="JOURNEY"?this.currentLevel.journey.goalCell:null,hintedCells:((n=this.currentLevel)==null?void 0:n.type)==="JOURNEY"&&this.journeyRuntime!=null?hu(this.currentLevel,this.journeyRuntime,this.elapsedSec):[],selectedCell:null,queuedSwap:null,shakePixels:this.getShakePixels(),visualCues:this.getBoardVisualCueState(),animationTrace:this.latestBoardAnimationTrace,matchHint:this.getMatchHintVisualState()}}getHeroWorldState(){var t,n;const e=this.getHeroWorldObjects();return{levelType:((t=this.currentLevel)==null?void 0:t.type)??"JOURNEY",backdropId:W.backdrops.castle,cinematicState:S0(this.phase),objects:e,activeProjectiles:((n=this.trialRuntime)==null?void 0:n.projectiles)??[],camera:{mode:"fixed",position:{x:0,y:0,z:12},target:{x:0,y:0,z:0},fovDeg:35}}}getHudState(){return{phase:this.phase,levelText:`Level ${this.run.levelNumber}`,livesText:`Lives ${this.run.lives}`,scoreText:`${this.run.score}`,objectiveText:this.getObjectiveText(),muted:this.muted,debugText:`Seed ${this.run.seed}`}}getScreenState(e=[],t=null){return{screen:P0(this.phase),phase:this.phase,finalScore:this.phase==="GAME_OVER"?this.finalScore:this.run.score,highScore:Jg(e),leaderboardRows:e,highlightedRank:t,buttonRects:{play:Zc,tryAgain:Jc,mute:Op},muted:this.muted,transitionText:L0(this.phase)}}drainEvents(){const e=this.events;return this.events=[],e}reset(e=Qa()){if(this.rng=new Ma(e),this.run=_u(e),this.options.debugStartLevel!=null&&this.options.debugStartLevel>1){const t=Math.floor(this.options.debugStartLevel);this.run={...this.run,levelNumber:t,difficulty:t,levelsCleared:t-1}}this.prepareCurrentLevel(),this.elapsedSec=0,this.transitionTimerSec=0,this.pendingLevelResult=null,this.pendingClearScore=0,this.finalScore=0,this.visualCues=[],this.shakeTimerSec=0,this.shakeAmplitudePixels=0,this.latestBoardAnimationTrace=null,this.latestBoardAnimationEndsAtSec=0,this.animationClockSec=0,this.nextBoardAnimationRevision=1,this.resetMatchHintTimer(),this.phase="TITLE",this.events=[]}getRunStateForDebug(){return{...this.run}}getRngStateForDebug(){return this.rng.getState()}getElapsedSecForDebug(){return this.elapsedSec}getBoardForDebug(){return this.board}getCurrentLevelForDebug(){return this.currentLevel}getJourneyRuntimeForDebug(){return this.journeyRuntime==null?null:{...this.journeyRuntime}}getTrialRuntimeForDebug(){return this.trialRuntime==null?null:{...this.trialRuntime,monsters:this.trialRuntime.monsters.map(e=>({...e})),projectiles:this.trialRuntime.projectiles.map(e=>({...e})),defeatedMonsterIds:[...this.trialRuntime.defeatedMonsterIds]}}getLevelStatsForDebug(){return{matchCount:this.levelMatchCount,validSwapCount:this.levelValidSwapCount}}getLatestBoardAnimationEndsAtSecForDebug(){return this.latestBoardAnimationEndsAtSec}prepareCurrentLevel(){const e=a0(this.run.seed,this.run.levelNumber,this.options.debugLevelType),t=this.run.levelNumber===1?this.run.seed:o0(this.run.seed,this.run.levelNumber);this.currentLevel=qm({levelNumber:this.run.levelNumber,difficulty:this.run.difficulty,seed:t,forcedLevelType:e}),this.board=gt(this.currentLevel.initialBoard),this.journeyRuntime=this.currentLevel.type==="JOURNEY"?_g(this.currentLevel):null,this.trialRuntime=this.currentLevel.type==="TRIAL"?Cg(this.currentLevel):null,this.elapsedSec=0,this.transitionTimerSec=0,this.pendingLevelResult=null,this.pendingClearScore=0,this.levelMatchCount=0,this.levelValidSwapCount=0,this.visualCues=[],this.shakeTimerSec=0,this.shakeAmplitudePixels=0,this.latestBoardAnimationTrace=null,this.latestBoardAnimationEndsAtSec=this.animationClockSec,this.resetMatchHintTimer()}startPreparedLevel(){var e,t;this.currentLevel==null&&this.prepareCurrentLevel(),this.phase="IDLE",this.elapsedSec=0,this.transitionTimerSec=0,this.resetMatchHintTimer(),this.captureBoardAnimationTrace(Xp(this.board,0)),this.events.push({type:"levelStarted",levelNumber:this.run.levelNumber,levelType:((e=this.currentLevel)==null?void 0:e.type)??"JOURNEY",seed:((t=this.currentLevel)==null?void 0:t.seed)??this.run.seed})}updateTrialStage(e){var n;if(((n=this.currentLevel)==null?void 0:n.type)!=="TRIAL"||this.trialRuntime==null)return;const t=Rg(this.trialRuntime,this.currentLevel,e);this.trialRuntime=t,t.result==="won"?this.beginLevelResult("win"):t.result==="lost"&&this.beginLevelResult("loss")}updateTrialVisualTimers(e){var t;((t=this.currentLevel)==null?void 0:t.type)!=="TRIAL"||this.trialRuntime==null||(this.trialRuntime=Ig(this.trialRuntime,e))}handleTap(e,t){var s,a;const n={x:e,y:t};if(this.phase==="TITLE"&&Qc(n,Zc)){this.startPreparedLevel();return}if(this.phase==="GAME_OVER"&&Qc(n,Jc)){this.tryAgain(),this.startPreparedLevel();return}if(this.phase!=="IDLE")return;const r=Jo(n);if(r!=null){if(this.resetMatchHintTimer(),((s=this.currentLevel)==null?void 0:s.type)==="TRIAL"){this.handleTrialPowerUpTap(r);return}((a=this.currentLevel)==null?void 0:a.type)==="JOURNEY"&&this.handleJourneyPowerUpTap(r)}}tryAgain(){this.reset(this.debugSeed??Qa())}beginLevelResult(e){this.pendingLevelResult!=null||this.currentLevel==null||(this.resetMatchHintTimer(),this.pendingLevelResult=e,this.transitionTimerSec=0,this.phase=e==="win"?"WIN":"LOSE",this.pendingClearScore=e==="win"?this.getLevelClearScore():0,e==="win"&&(this.requestSound(W.sounds.victorySting,{category:"level",volume:.7}),this.requestSound(W.sounds.cageYankWhoosh,{category:"level",volume:.55})),this.events.push({type:"levelEnded",levelNumber:this.run.levelNumber,levelType:this.currentLevel.type,result:e}))}advanceAfterLevelResult(){if(this.pendingLevelResult!=null){if(this.pendingLevelResult==="win"){this.run=l0(this.run,this.pendingClearScore),this.pendingClearScore>0&&this.events.push({type:"scoreChanged",score:this.run.score}),this.prepareCurrentLevel(),this.startPreparedLevel();return}if(this.run=c0(this.run),this.run.lives<=0){this.finalScore=this.run.score,this.phase="GAME_OVER",this.pendingLevelResult=null,this.transitionTimerSec=0,this.requestSound(W.sounds.runEnd,{category:"run",volume:.72}),this.events.push({type:"runEnded",finalScore:this.run.score,levelsCleared:this.run.levelsCleared});return}this.prepareCurrentLevel(),this.startPreparedLevel()}}handleSwap(e,t){var a,o;if(this.phase!=="IDLE")return;if(this.resetMatchHintTimer(),((a=this.currentLevel)==null?void 0:a.type)==="TRIAL"&&this.trialRuntime!=null){this.handleTrialSwap(e,t);return}if(((o=this.currentLevel)==null?void 0:o.type)!=="JOURNEY"||this.journeyRuntime==null)return;const n=xg(this.board,this.journeyRuntime,this.currentLevel,e,t,this.rng);if(!n.valid){this.captureBoardAnimationTrace(n.animationTrace);return}const r=this.journeyRuntime.mageCell;this.board=n.board,this.journeyRuntime=n.runtime,this.levelMatchCount+=n.scoringStats.matchCount,this.levelValidSwapCount+=n.scoringStats.validSwapCount,this.captureBoardAnimationTrace(n.animationTrace),this.emitMatchAudioAndJuice(n.scoringStats,t),this.emitJourneyAudioAndJuice(n,r,t);const s=n.scoreDelta+Es(n.scoringStats);s>0&&(this.run={...this.run,score:this.run.score+s},this.events.push({type:"scoreChanged",score:this.run.score})),n.runtime.result==="won"?this.beginLevelResult("win"):n.runtime.result==="lost"&&this.beginLevelResult("loss")}handleJourneyPowerUpTap(e){var s;if(this.phase!=="IDLE"||((s=this.currentLevel)==null?void 0:s.type)!=="JOURNEY"||this.journeyRuntime==null)return;const t=vg(this.board,this.journeyRuntime,this.currentLevel,e,this.rng);if(!t.valid)return;const n=this.journeyRuntime.mageCell;this.board=t.board,this.journeyRuntime=t.runtime,this.levelMatchCount+=t.scoringStats.matchCount,this.levelValidSwapCount+=t.scoringStats.validSwapCount,this.captureBoardAnimationTrace(t.animationTrace),this.emitMatchAudioAndJuice(t.scoringStats,e),this.emitJourneyAudioAndJuice(t,n,e);const r=t.scoreDelta+Es(t.scoringStats);r>0&&(this.run={...this.run,score:this.run.score+r},this.events.push({type:"scoreChanged",score:this.run.score})),t.runtime.result==="won"?this.beginLevelResult("win"):t.runtime.result==="lost"&&this.beginLevelResult("loss")}handleTrialSwap(e,t){var s;if(((s=this.currentLevel)==null?void 0:s.type)!=="TRIAL"||this.trialRuntime==null)return;const n=Pg(this.board,this.trialRuntime,this.currentLevel,e,t,this.rng);if(!n.valid){this.captureBoardAnimationTrace(n.animationTrace);return}this.board=n.board,this.trialRuntime=n.runtime,this.levelMatchCount+=n.scoringStats.matchCount,this.levelValidSwapCount+=n.scoringStats.validSwapCount,this.captureBoardAnimationTrace(n.animationTrace),this.emitMatchAudioAndJuice(n.scoringStats,t),this.emitTrialAudioAndJuice(n.damageEvents,t);const r=n.scoreDelta+Es(n.scoringStats);r>0&&(this.run={...this.run,score:this.run.score+r},this.events.push({type:"scoreChanged",score:this.run.score})),n.damageEvents.some(a=>a.defeated)?this.requestSound(W.sounds.monsterDefeat,{category:"enemy",volume:.62}):n.damageEvents.length>0&&this.requestSound(W.sounds.monsterDamage,{category:"enemy",volume:.5}),n.runtime.result==="won"?this.beginLevelResult("win"):n.runtime.result==="lost"&&this.beginLevelResult("loss")}handleTrialPowerUpTap(e){var r;if(((r=this.currentLevel)==null?void 0:r.type)!=="TRIAL"||this.trialRuntime==null)return;const t=Lg(this.board,this.trialRuntime,this.currentLevel,e,this.rng);if(!t.valid)return;this.board=t.board,this.trialRuntime=t.runtime,this.levelMatchCount+=t.scoringStats.matchCount,this.levelValidSwapCount+=t.scoringStats.validSwapCount,this.captureBoardAnimationTrace(t.animationTrace),this.emitMatchAudioAndJuice(t.scoringStats,e),this.emitTrialAudioAndJuice(t.damageEvents,e);const n=t.scoreDelta+Es(t.scoringStats);n>0&&(this.run={...this.run,score:this.run.score+n},this.events.push({type:"scoreChanged",score:this.run.score})),t.damageEvents.some(s=>s.defeated)?this.requestSound(W.sounds.monsterDefeat,{category:"enemy",volume:.62}):t.damageEvents.length>0&&this.requestSound(W.sounds.monsterDamage,{category:"enemy",volume:.5}),t.runtime.result==="won"?this.beginLevelResult("win"):t.runtime.result==="lost"&&this.beginLevelResult("loss")}getLevelClearScore(){var e,t;return((e=this.currentLevel)==null?void 0:e.type)==="JOURNEY"&&this.journeyRuntime!=null?mg(this.run.difficulty,this.journeyRuntime.movesRemaining):((t=this.currentLevel)==null?void 0:t.type)==="TRIAL"?gg(this.run.difficulty,this.levelMatchCount,this.elapsedSec):0}captureBoardAnimationTrace(e){const t=Yp(e,this.nextBoardAnimationRevision);t!=null&&(this.latestBoardAnimationTrace=t,this.latestBoardAnimationEndsAtSec=this.animationClockSec+dd(t)/1e3,this.nextBoardAnimationRevision+=1)}hasLatestBoardAnimationFinished(){return this.animationClockSec>=this.latestBoardAnimationEndsAtSec}requestSound(e,t={}){const n={type:"soundRequested",soundId:e};t.intensity!=null&&(n.intensity=t.intensity),t.volume!=null&&(n.volume=t.volume),t.playbackRate!=null&&(n.playbackRate=t.playbackRate),t.category!=null&&(n.category=t.category),this.events.push(n)}emitMatchAudioAndJuice(e,t){if(!(e.matchCount<=0)){this.requestSound(W.sounds.tileMatch,{category:"match",volume:.55});for(let n=0;n<e.comboCount;n+=1)this.requestSound(W.sounds.comboPitchStep,{category:"match",volume:.48,playbackRate:1+Math.min(6,n+1)*.08});e.powerUpsCreated>0&&(this.requestSound(W.sounds.powerupCreate,{category:"match",volume:.58,intensity:Math.min(1.5,e.powerUpsCreated)}),this.addBoardCue("powerPulse",t,.45)),this.addBoardCue("matchFlash",t,.3),this.triggerBoardShake(e.matchCount+e.powerUpsCreated)}}emitJourneyAudioAndJuice(e,t,n){for(const r of e.clearedStandardCells.slice(0,8))this.addBoardCue("matchFlash",r,.28);if(e.convertedPathCells.length>0){this.requestSound(W.sounds.pathConvert,{category:"match",volume:.56,intensity:Math.min(1.4,.75+e.convertedPathCells.length/8)});for(const r of e.convertedPathCells.slice(0,12))this.addBoardCue("pathGlow",r,.55)}v0(t,e.runtime.mageCell)||(this.requestSound(W.sounds.mageWalk,{category:"level",volume:.42}),this.addBoardCue("pathGlow",e.runtime.mageCell,.42)),e.convertedPathCells.length===0&&e.clearedStandardCells.length===0&&this.addBoardCue("matchFlash",n,.22)}emitTrialAudioAndJuice(e,t){for(const n of e.slice(0,8)){const r=x0(n.schoolId);this.requestSound(r.whoosh,{category:"spell",volume:.42}),this.requestSound(r.impact,{category:"spell",volume:.48}),this.addBoardCue("damagePopup",t,.45,`-${Math.round(n.damage)}`)}}addBoardCue(e,t,n,r){this.visualCues.push({kind:e,coord:t,text:r,durationSec:n,remainingSec:n})}triggerBoardShake(e){this.shakeTimerSec=Math.max(this.shakeTimerSec,.16),this.shakeAmplitudePixels=Math.min(tu,Math.max(eo,eo+e*1.4))}updateBoardJuice(e){e<=0||(this.shakeTimerSec=Math.max(0,this.shakeTimerSec-e),this.shakeTimerSec<=0&&(this.shakeAmplitudePixels=0),this.visualCues=this.visualCues.map(t=>({...t,remainingSec:t.remainingSec-e})).filter(t=>t.remainingSec>0))}getShakePixels(){return this.shakeTimerSec<=0?0:Math.min(tu,Math.max(eo,this.shakeAmplitudePixels))}getBoardVisualCueState(){return this.visualCues.map(e=>({kind:e.kind,coord:e.coord,text:e.text,value:Math.max(0,Math.min(1,e.remainingSec/e.durationSec))}))}resetMatchHintTimer(){this.matchHintTimerSec=0}updateMatchHintTimer(e){this.matchHintTimerSec+=Math.max(0,e)}getMatchHintVisualState(){if(this.phase!=="IDLE"||this.matchHintTimerSec<nu)return null;const e=to+cm,t=this.matchHintTimerSec-nu,n=Math.floor(t/e),r=t-n*e;if(r>=to)return null;const s=Tm(this.board);if(s.length===0)return null;const a=s[n%s.length];return{flashCells:a.flashCells,movingCell:a.movingCell,direction:a.direction,progress:Math.max(0,Math.min(1,r/to))}}getObjectiveText(){var t,n;return((t=this.currentLevel)==null?void 0:t.type)==="TRIAL"&&this.trialRuntime!=null?this.trialRuntime.result==="won"?"Trial cleared":this.trialRuntime.result==="lost"?"Monsters broke through":`Monsters ${this.trialRuntime.defeatedMonsterIds.length}/${this.trialRuntime.totalMonsters}`:((n=this.currentLevel)==null?void 0:n.type)!=="JOURNEY"||this.journeyRuntime==null?"Journey":this.journeyRuntime.result==="won"?"Goal reached":this.journeyRuntime.result==="lost"?"Out of moves":hu(this.currentLevel,this.journeyRuntime,this.elapsedSec).length>0?`Moves ${this.journeyRuntime.movesRemaining} - hinted path swap`:`Moves ${this.journeyRuntime.movesRemaining}`}getHeroWorldObjects(){var t,n;const e=[Pn("stage-backdrop",Ct.backdropForest,{position:{x:0,y:0,z:-.2},scale:{x:1,y:1,z:1}})];if(((t=this.currentLevel)==null?void 0:t.type)==="TRIAL"&&this.trialRuntime!=null)return[...e,...this.getTrialHeroWorldObjects()];if(((n=this.currentLevel)==null?void 0:n.type)!=="JOURNEY"||this.journeyRuntime==null)return e;for(const r of xr(this.board))this.board[r.row][r.col].isPath&&e.push(Pn(`journey-path-${r.col}-${r.row}`,Ct.pathMarker,{position:As(r,-.05),scale:{x:.35,y:.05,z:.35},renderOrder:1,replication:"localCosmetic"}));return e.push(Pn("actor-mage",Ct.mage,{position:oo(As(this.journeyRuntime.mageCell,.35),vu),scale:xu,renderOrder:4,animationId:Su(this.phase)}),Pn("actor-prince-cage",Ct.princeCage,{position:As(this.currentLevel.journey.goalCell,.55),scale:{x:.55,y:.75,z:.55},renderOrder:3,animationId:M0(this.phase)}),Pn("prop-goal-flag",Ct.goalFlag,{position:As(this.currentLevel.journey.goalCell,.15),scale:{x:.35,y:.55,z:.35},renderOrder:2,replication:"localCosmetic"})),e}getTrialHeroWorldObjects(){var t;if(((t=this.currentLevel)==null?void 0:t.type)!=="TRIAL"||this.trialRuntime==null)return[];const e=[Pn("actor-mage",Ct.mage,{position:oo(Fd(this.currentLevel),vu),scale:xu,renderOrder:5,animationId:Su(this.phase)}),Pn("trial-fail-line",Ct.pathMarker,{position:{x:this.currentLevel.trial.contactX,y:this.currentLevel.trial.laneY,z:-.03},scale:{x:.06,y:1.25,z:.18},renderOrder:1,replication:"localCosmetic",tintHex:"#eb5757",opacity:.6})];for(const n of this.trialRuntime.monsters){const r=oo(Nd(this.currentLevel,n),b0(n.kind)),s=A0(n),a=Yd(r,s.x,s.y);e.push(Pn(`trial-monster-${n.monsterId}`,Ct.monsterPlaceholder,{position:a,scale:y0(n.kind),renderOrder:4,animationId:this.phase==="LOSE"?"victory":"walk",tintHex:w0(n.kind)}),...E0(n,a))}return e}}function _0(i){switch(i){case"FIRE":return W.tiles.fire;case"ICE":return W.tiles.ice;case"LIGHTNING":return W.tiles.lightning;case"EARTH":return W.tiles.earth;case"LAND":return W.tiles.land;case"ROCKET_H":return W.powerUps.rocketH;case"ROCKET_V":return W.powerUps.rocketV;case"TNT":return W.powerUps.tnt;case"LIGHTBALL":return W.powerUps.lightball}}function x0(i){switch(i){case"fire":return{whoosh:W.sounds.fireWhoosh,impact:W.sounds.fireImpact};case"ice":return{whoosh:W.sounds.iceWhoosh,impact:W.sounds.iceImpact};case"lightning":return{whoosh:W.sounds.lightningWhoosh,impact:W.sounds.lightningImpact};case"earth":return{whoosh:W.sounds.earthWhoosh,impact:W.sounds.earthImpact}}}function v0(i,e){return i!=null&&i.col===e.col&&i.row===e.row}function S0(i){return i==="WIN"?"victory":i==="LOSE"?"fail":"none"}function Su(i){return i==="WIN"?"victory":i==="LOSE"?"stunned":"idle"}function M0(i){return i==="WIN"?"yank":"cower"}function y0(i){const e=T0(i);return{x:e.x*so,y:e.y*so,z:e.z*so}}function T0(i){switch(i){case"kobold":return{x:.46,y:.62,z:.46};case"tallKobold":return{x:.52,y:.86,z:.52};case"miniBoss":return{x:.7,y:1.05,z:.7}}}function b0(i){switch(i){case"kobold":return-.36;case"tallKobold":return-.5;case"miniBoss":return-.6}}function w0(i){switch(i){case"kobold":return"#27ae60";case"tallKobold":return"#8b6f47";case"miniBoss":return"#eb5757"}}function E0(i,e){const t=R0(i);if(t<=0)return[];const n=e.y+I0(i.kind),r=e.z+f0,s=ao*t,a=e.x-ao/2+s/2;return[Pn(`trial-monster-${i.monsterId}-health-track`,Ct.healthBarTrack,{position:{x:e.x,y:n,z:r},scale:{x:ao,y:h0,z:1},renderOrder:6,replication:"localCosmetic",opacity:.85}),Pn(`trial-monster-${i.monsterId}-health-fill`,Ct.healthBarFill,{position:{x:a,y:n,z:r+.01},scale:{x:s,y:d0,z:1},renderOrder:7,replication:"localCosmetic",tintHex:C0(t),opacity:.95})]}function A0(i){const e=i.hitShakeRemainingSec??0,t=i.hitShakeDurationSec??0;if(e<=0||t<=0)return{x:0,y:0};const n=1-Math.max(0,Math.min(1,e/t)),r=1-n;return{x:Math.sin(n*Math.PI*8)*p0*r,y:Math.sin(n*Math.PI*5)*m0*r}}function C0(i){const e=Math.max(0,Math.min(1,i));return e>.5?"#27ae60":e>=.25?"#f2c94c":"#eb5757"}function R0(i){return i.maxHp<=0?0:Math.max(0,Math.min(1,i.hp/i.maxHp))}function I0(i){switch(i){case"kobold":return 1.64;case"tallKobold":return 2.1;case"miniBoss":return 2.56}}function P0(i){return i==="TITLE"?"title":i==="GAME_OVER"?"gameOver":"play"}function L0(i){return i==="WIN"?"Level Clear":i==="LOSE"?"Life Lost":null}function Pn(i,e,t){return{objectId:i,templateId:e,transform:{position:t.position,rotation:{x:0,y:0,z:0,w:1},scale:t.scale},visible:!0,lifetime:"persistent",replication:t.replication??"sharedGameplay",renderLayer:"heroStage",renderOrder:t.renderOrder,tintHex:t.tintHex,opacity:t.opacity,animationId:t.animationId}}function Yd(i,e,t){return{...i,x:i.x+e,y:i.y+t}}function oo(i,e){return Yd(i,0,e)}function As(i,e){const t=i.col/(Ae-1),n=i.row/(Ae-1);return{x:-4.6+t*9.2,y:1.6-n*2.7,z:e}}const D0=se.cellSize*.35;function U0(i,e){const t=Math.min(e.width/qt,e.height/Bn),n=qt*t,r=Bn*t,s=e.left+(e.width-n)/2,a=e.top+(e.height-r)/2;return{x:(i.clientX-s)/t,y:(i.clientY-a)/t}}function N0(i){const t=new URLSearchParams(i).get("seed");if(t==null||t.trim()==="")return;const n=Number(t);if(!Number.isFinite(n))return;const r=Math.trunc(n)>>>0;return r===0?void 0:r}function F0(i){var n;const t=(n=new URLSearchParams(i).get("levelType"))==null?void 0:n.toUpperCase();return t==="TRIAL"||t==="JOURNEY"?t:void 0}function B0(i){const t=new URLSearchParams(i).get("level");if(t==null||t.trim()==="")return;const n=Number(t);if(!Number.isFinite(n))return;const r=Math.trunc(n);return r>=1?r:void 0}class O0{constructor(e){Te(this,"commands",[]);Te(this,"dragStartCell",null);Te(this,"dragStartPoint",null);Te(this,"activePointerId",null);Te(this,"dragConsumed",!1);Te(this,"onPointerDown",e=>{var n,r;const t=this.eventToLogicalPoint(e);this.commands.push({type:"dragStart",x:t.x,y:t.y}),this.dragStartPoint=t,this.dragStartCell=Jo(t),this.activePointerId=e.pointerId,this.dragConsumed=!1,(r=(n=this.stageElement).setPointerCapture)==null||r.call(n,e.pointerId)});Te(this,"onPointerMove",e=>{if(this.activePointerId!==e.pointerId||this.dragConsumed)return;const t=this.getThresholdSwap(this.eventToLogicalPoint(e));t!=null&&(e.preventDefault(),this.commands.push({type:"swap",from:t.from,to:t.to}),this.dragConsumed=!0)});Te(this,"onPointerUp",e=>{if(this.activePointerId!==e.pointerId)return;const t=this.eventToLogicalPoint(e);this.commands.push({type:"dragEnd",x:t.x,y:t.y});const n=k0(this.dragStartPoint,t),r=Jo(t);if(!this.dragConsumed){const s=this.getThresholdSwap(t);s!=null&&(this.commands.push({type:"swap",from:s.from,to:s.to}),this.dragConsumed=!0)}if(n&&!this.dragConsumed&&this.commands.push({type:"tap",x:t.x,y:t.y}),this.dragStartCell!=null&&r!=null&&!n&&!this.dragConsumed){const s=r.col-this.dragStartCell.col,a=r.row-this.dragStartCell.row;Math.abs(s)+Math.abs(a)===1&&this.commands.push({type:"swap",from:this.dragStartCell,to:r})}this.finishPointer(e.pointerId)});Te(this,"onPointerCancel",e=>{this.activePointerId===e.pointerId&&this.finishPointer(e.pointerId)});this.stageElement=e,this.stageElement.addEventListener("pointerdown",this.onPointerDown),this.stageElement.addEventListener("pointermove",this.onPointerMove),this.stageElement.addEventListener("pointerup",this.onPointerUp),this.stageElement.addEventListener("pointercancel",this.onPointerCancel)}drainCommands(){const e=this.commands;return this.commands=[],e}dispose(){this.stageElement.removeEventListener("pointerdown",this.onPointerDown),this.stageElement.removeEventListener("pointermove",this.onPointerMove),this.stageElement.removeEventListener("pointerup",this.onPointerUp),this.stageElement.removeEventListener("pointercancel",this.onPointerCancel)}eventToLogicalPoint(e){return U0(e,this.stageElement.getBoundingClientRect())}getThresholdSwap(e){if(this.dragStartCell==null||this.dragStartPoint==null)return null;const t=e.x-this.dragStartPoint.x,n=e.y-this.dragStartPoint.y,r=Math.abs(t),s=Math.abs(n);if(Math.max(r,s)<D0)return null;const a=r>=s?{col:this.dragStartCell.col+Math.sign(t),row:this.dragStartCell.row}:{col:this.dragStartCell.col,row:this.dragStartCell.row+Math.sign(n)};return z0(a)?{from:this.dragStartCell,to:a}:null}finishPointer(e){var t,n;(n=(t=this.stageElement).releasePointerCapture)==null||n.call(t,e),this.dragStartCell=null,this.dragStartPoint=null,this.activePointerId=null,this.dragConsumed=!1}}function k0(i,e){return i==null?!0:Math.hypot(e.x-i.x,e.y-i.y)<16}function z0(i){return i.col>=0&&i.row>=0&&i.col<Ae&&i.row<Ae}const V0="/assets/audio",H0="Assets/Audio",G0={[W.sounds.tileMatch]:Ft(W.sounds.tileMatch,"tile-match","match","global",.52,Bt("triangle",420,90),"Primary first-cascade tile match click/pop."),[W.sounds.comboPitchStep]:Ft(W.sounds.comboPitchStep,"combo-pitch-step","match","global",.48,Bt("triangle",560,85),"Cascade ladder step; browser playbackRate is used for rising pitch."),[W.sounds.fireWhoosh]:Ft(W.sounds.fireWhoosh,"spell-fire-whoosh","spell","templateLocal",.42,Bt("sawtooth",330,120),"Fire spell launch whoosh, local to mage/projectile template in MHS."),[W.sounds.iceWhoosh]:Ft(W.sounds.iceWhoosh,"spell-ice-whoosh","spell","templateLocal",.38,Bt("sine",620,120),"Ice spell launch shimmer, local to mage/projectile template in MHS."),[W.sounds.lightningWhoosh]:Ft(W.sounds.lightningWhoosh,"spell-lightning-whoosh","spell","templateLocal",.38,Bt("square",740,75),"Lightning spell launch snap, local to mage/projectile template in MHS."),[W.sounds.earthWhoosh]:Ft(W.sounds.earthWhoosh,"spell-earth-whoosh","spell","templateLocal",.42,Bt("triangle",230,130),"Earth spell launch thump, local to mage/projectile template in MHS."),[W.sounds.fireImpact]:Ft(W.sounds.fireImpact,"spell-fire-impact","spell","templateLocal",.48,Bt("noise",260,110),"Fire spell impact burst at monster target."),[W.sounds.iceImpact]:Ft(W.sounds.iceImpact,"spell-ice-impact","spell","templateLocal",.44,Bt("sine",820,110),"Ice spell impact chime at monster target."),[W.sounds.lightningImpact]:Ft(W.sounds.lightningImpact,"spell-lightning-impact","spell","templateLocal",.46,Bt("square",980,80),"Lightning spell impact crack at monster target."),[W.sounds.earthImpact]:Ft(W.sounds.earthImpact,"spell-earth-impact","spell","templateLocal",.48,Bt("triangle",180,125),"Earth spell impact stomp at monster target."),[W.sounds.pathConvert]:Ft(W.sounds.pathConvert,"path-convert","match","global",.5,Bt("sine",520,160),"Journey LAND-to-path conversion shimmer."),[W.sounds.mageWalk]:Ft(W.sounds.mageWalk,"mage-walk","level","templateLocal",.34,Bt("triangle",260,90),"Mage one-step movement tick, local to mage template in MHS."),[W.sounds.monsterDamage]:Ft(W.sounds.monsterDamage,"monster-damage","enemy","templateLocal",.44,Bt("noise",180,95),"Monster damage response, local to monster template in MHS."),[W.sounds.monsterDefeat]:Ft(W.sounds.monsterDefeat,"monster-defeat","enemy","templateLocal",.54,Bt("noise",140,170),"Monster defeat burst, local to monster template in MHS."),[W.sounds.powerupCreate]:Ft(W.sounds.powerupCreate,"powerup-create","match","global",.54,Bt("sawtooth",680,150),"Power-up creation sparkle."),[W.sounds.victorySting]:Ft(W.sounds.victorySting,"victory-sting","level","global",.62,Bt("triangle",720,260),"Level clear success sting."),[W.sounds.cageYankWhoosh]:Ft(W.sounds.cageYankWhoosh,"cage-yank-whoosh","level","global",.48,Bt("sawtooth",260,220),"Unseen abductor cage-yank whoosh during victory staging."),[W.sounds.runEnd]:Ft(W.sounds.runEnd,"run-end","run","global",.6,Bt("sine",220,360),"Run-end fanfare/downbeat for Game Over.")};function Ft(i,e,t,n,r,s,a){return{id:i,browserUrl:`${V0}/${e}.mp3`,futureMhsPath:`${H0}/${e}.mp3`,defaultVolume:r,category:t,scope:n,fallback:s,notes:a}}function Bt(i,e,t){return{waveform:i,frequencyHz:e,durationMs:t,attackMs:6,releaseMs:28}}const Cn="Runtime 256x256 transparent PNG, centered subject, 24-36px padding, readable at 100x100.",lo="Runtime 2160x1000 PNG/WebP for 2x coverage of the 1080x500 hero stage.",W0="Hero-stage cover backdrop. Drawn as a Three.js texture plane that fills the orthographic 1080x500 stage and crops overflow.",X0="Transparent PNG source parts now; later exported as a 2048x2048 atlas plus skeletal JSON.",Y0="Temporary browser hero-stage FBX model. Auto-normalized in Three.js to bottom-center pivot and 1.45 world-unit height. Loops animation frames 0-60.",q0="Temporary browser hero-stage texture recovered from the FBX .fbm export folder and applied to the mage mesh when the FBX material does not load a map.",j0="Runtime 1080x150 PNG for the fixed middle HUD band; drawn full-width behind HUD text.",K0="Runtime 1080x1080 PNG for the board base; drawn behind board cells with flat-color fallback.",qd={[W.tiles.fire]:Kt(W.tiles.fire,"/assets/tiles/tile-fire.png","Assets/Textures/Tiles/tile-fire.png","prompt.tiles.standard",Cn),[W.tiles.ice]:Kt(W.tiles.ice,"/assets/tiles/tile-ice.png","Assets/Textures/Tiles/tile-ice.png","prompt.tiles.standard",Cn),[W.tiles.lightning]:Kt(W.tiles.lightning,"/assets/tiles/tile-lightning.png","Assets/Textures/Tiles/tile-lightning.png","prompt.tiles.standard",Cn),[W.tiles.earth]:Kt(W.tiles.earth,"/assets/tiles/tile-earth.png","Assets/Textures/Tiles/tile-earth.png","prompt.tiles.standard",Cn),[W.tiles.land]:Kt(W.tiles.land,"/assets/tiles/tile-land.png","Assets/Textures/Tiles/tile-land.png","prompt.tiles.journey",Cn),[W.tiles.path]:Kt(W.tiles.path,"/assets/tiles/tile-path.png","Assets/Textures/Tiles/tile-path.png","prompt.tiles.journey",Cn),[W.tiles.empty]:Kt(W.tiles.empty,"/assets/tiles/empty.png","Assets/Textures/Tiles/empty.png","prompt.tiles.standard","Runtime empty-cell marker for non-playable Trial void spaces. Drawn as board art only; not matchable or refillable."),[W.powerUps.rocketH]:Kt(W.powerUps.rocketH,"/assets/powerups/power-rocket-h.png","Assets/Textures/PowerUps/power-rocket-h.png","prompt.powerups.standard",Cn),[W.powerUps.rocketV]:Kt(W.powerUps.rocketV,"/assets/powerups/power-rocket-v.png","Assets/Textures/PowerUps/power-rocket-v.png","prompt.powerups.standard",Cn),[W.powerUps.tnt]:Kt(W.powerUps.tnt,"/assets/powerups/power-tnt.png","Assets/Textures/PowerUps/power-tnt.png","prompt.powerups.standard",Cn),[W.powerUps.lightball]:Kt(W.powerUps.lightball,"/assets/powerups/power-lightball.png","Assets/Textures/PowerUps/power-lightball.png","prompt.powerups.standard",Cn),[W.backdrops.forest]:Kt(W.backdrops.forest,"/assets/backdrops/backdrop-forest.png","Assets/Textures/Backdrops/backdrop-forest.png","prompt.backdrops.hero",lo,"2160x1000"),[W.backdrops.crypt]:Kt(W.backdrops.crypt,"/assets/backdrops/backdrop-crypt.png","Assets/Textures/Backdrops/backdrop-crypt.png","prompt.backdrops.hero",lo,"2160x1000"),[W.backdrops.crystalCave]:Kt(W.backdrops.crystalCave,"/assets/backdrops/backdrop-crystal-cave.png","Assets/Textures/Backdrops/backdrop-crystal-cave.png","prompt.backdrops.hero",lo,"2160x1000"),[W.backdrops.castle]:Kt(W.backdrops.castle,"/assets/backdrops/backdrop-castle.png","Assets/Textures/Backdrops/backdrop-castle.png","prompt.backdrops.hero",W0,"cover 1080x500 hero stage"),[W.rigs.mage]:Cs(W.rigs.mage,"/assets/rigs/knight1.fbx","Assets/Rigs/Mage/knight1.fbx","prompt.rig.mage","fbx","temporary FBX stand-in, auto-normalized to 1.45 world units",Y0),[W.materials.mageTexture]:Z0(W.materials.mageTexture,"/assets/rigs/knight1.fbm/knight_texture_test.png","Assets/Textures/Rigs/Mage/knight_texture_test.png","prompt.rig.mage",q0),[W.rigs.prince]:Cs(W.rigs.prince,"/assets/rigs/prince/prince-parts-source.png","Assets/Rigs/Prince/prince-rig.json","prompt.rig.prince"),[W.rigs.kobold]:Cs(W.rigs.kobold,"/assets/rigs/kobold/kobold-parts-source.png","Assets/Rigs/Kobold/kobold-rig.json","prompt.rig.kobolds"),[W.rigs.tallKobold]:Cs(W.rigs.tallKobold,"/assets/rigs/tall-kobold/tall-kobold-parts-source.png","Assets/Rigs/TallKobold/tall-kobold-rig.json","prompt.rig.kobolds"),[W.props.princeCage]:ji(W.props.princeCage,"/assets/props/prop-prince-cage.png","Assets/Textures/Props/prop-prince-cage.png","prompt.rig.prince","Cage frame source until rig export is available."),[W.props.goalFlag]:ji(W.props.goalFlag,"/assets/props/prop-goal-flag.png","Assets/Textures/Props/prop-goal-flag.png","prompt.tiles.journey","Goal marker prop for Journey staging."),[W.props.abductorGlove]:ji(W.props.abductorGlove,"/assets/props/prop-abductor-glove.png","Assets/Textures/Props/prop-abductor-glove.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[W.props.abductorHook]:ji(W.props.abductorHook,"/assets/props/prop-abductor-hook.png","Assets/Textures/Props/prop-abductor-hook.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[W.props.abductorHand]:ji(W.props.abductorHand,"/assets/props/prop-abductor-hand.png","Assets/Textures/Props/prop-abductor-hand.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[W.props.abductorRope]:ji(W.props.abductorRope,"/assets/props/prop-abductor-rope.png","Assets/Textures/Props/prop-abductor-rope.png","prompt.props.abductor","Edge-of-frame cage-yank hint prop."),[W.ui.hudBanner]:Mu(W.ui.hudBanner,"/assets/ui/ui-banner.png","Assets/Textures/UI/ui-banner.png",j0,"1080x150"),[W.ui.boardBackground]:Mu(W.ui.boardBackground,"/assets/ui/board-background.png","Assets/Textures/UI/board-background.png",K0,"1080x1080"),...Object.fromEntries(Object.values(G0).map(i=>[i.id,J0(i)]))};function sl(i){return qd[i]}function $0(){return Object.values(qd).filter(i=>i.kind==="texture"||i.kind==="ui")}function Kt(i,e,t,n,r,s="256x256"){return{id:i,kind:"texture",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:s,unitScale:1,pivot:"center",collision:"none",artPromptId:n,notes:r}}function ji(i,e,t,n,r){return{id:i,kind:"texture",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:"max 1024px longest side",unitScale:1,pivot:"center",collision:"none",artPromptId:n,notes:r}}function Cs(i,e,t,n,r="png",s="source parts max 1024px, final atlas 2048x2048",a=X0){return{id:i,kind:"rig",browserUrl:e,futureMhsPath:t,sourceFormat:r,runtimeSize:s,unitScale:1,forwardAxis:"+Z",upAxis:"+Y",pivot:"bottomCenter",collision:"capsule",artPromptId:n,notes:a}}function Mu(i,e,t,n,r){return{id:i,kind:"ui",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:r,unitScale:1,pivot:"center",collision:"none",notes:n}}function Z0(i,e,t,n,r){return{id:i,kind:"material",browserUrl:e,futureMhsPath:t,sourceFormat:"png",runtimeSize:"runtime FBX diffuse texture",unitScale:1,pivot:"center",collision:"none",artPromptId:n,notes:r}}function J0(i){return{id:i.id,kind:"audio",browserUrl:i.browserUrl,futureMhsPath:i.futureMhsPath,sourceFormat:"mp3",runtimeSize:"optional browser audio file with WebAudio synth fallback",unitScale:1,pivot:"center",collision:"none",notes:`${i.notes} MHS mapping: ${i.scope==="global"?"global SoundComponent":"template-local SoundComponent"}.`}}const Q0="./";function wa(i,e=Q0,t=e_()){if(r_(i))return i;const n=i.replace(/^\/+/,"");return n_(e)?t!=null?new URL(n,i_(t)).toString():`./${n}`:`${t_(e)}${n}`}function e_(){return typeof document>"u"?void 0:document.baseURI}function t_(i){return i.trim()===""?"/":i.endsWith("/")?i:`${i}/`}function n_(i){const e=i.trim();return e===""||e==="./"||e==="."}function i_(i){try{return new URL(".",i).toString()}catch{return i.endsWith("/")?i:`${i}/`}}function r_(i){return/^[a-z][a-z\d+\-.]*:/i.test(i)||i.startsWith("//")}async function s_(i=$0()){const e=await Promise.all(i.map(a_));return Object.fromEntries(e.filter(t=>t!=null))}function a_(i){return new Promise(e=>{const t=new Image;t.onload=()=>e([i.id,t]),t.onerror=()=>e(null),t.src=wa(i.browserUrl)})}const yu="magus-match.leaderboard.v1";class o_{constructor(e=window.localStorage){this.storage=e}load(){return t0(this.storage.getItem(yu))}save(e){this.storage.setItem(yu,n0(e))}}const l_=12,Tu=260,c_=24,u_=62,h_=12,d_=2.25,bu=220,f_=86,p_=7,m_=1,wu=420,g_=18,Eu=360,Au=8;class __{constructor(){Te(this,"activeAnimation",null);Te(this,"lastRevisionId",null)}present(e,t){const n=e.animationTrace??null;if(n!=null&&n.revisionId!==this.lastRevisionId){const s=this.activeAnimation==null||!x_(n)?null:this.sampleActiveAnimation(e,t);this.activeAnimation={trace:n,startSec:t,retargetStarts:s==null?new Map:N_(s)},this.lastRevisionId=n.revisionId}if(this.activeAnimation==null)return e;const r=this.sampleActiveAnimation(e,t);return this.isAnimationComplete(t)?(this.activeAnimation=null,e):r}sampleActiveAnimation(e,t){if(this.activeAnimation==null)return e;const n=Math.max(0,(t-this.activeAnimation.startSec)*1e3),r=this.activeAnimation.trace,s=Va(r),a=v_(r,s,n,this.activeAnimation.retargetStarts),o=S_(r,s,n),l=M_(r,s,n),c=y_(r,s,n),h=T_(r,s,n);return{...e,boardCells:a,particles:o,burstRings:l,tntCloudPuffs:c,tntDebrisTrails:h}}isAnimationComplete(e){if(this.activeAnimation==null)return!0;const t=dd(this.activeAnimation.trace);return Math.max(0,(e-this.activeAnimation.startSec)*1e3)>=t}}function x_(i){return i.kind!=="levelIntro"}function v_(i,e,t,n){if(i.kind==="invalidSwap")return C_(i,t,n);if(i.kind!=="levelIntro"&&(t<za||e.length===0))return jd(i,t,n);const r=e.find(s=>t<s.endMs);return r==null?U_(i.finalSnapshot):t<r.fallStartMs?R_(r.step,t-r.popStartMs):P_(r.step,t-r.fallStartMs,r.endMs-r.fallStartMs,r.fallDelaysByTileId,n,i.kind==="levelIntro")}function S_(i,e,t){if(i.kind==="levelIntro")return[];const n=e.find(s=>t<s.fallStartMs);if(n==null)return[];const r=t-n.popStartMs;return r<0?[]:n.step.clearedTiles.flatMap(s=>b_(s,r))}function M_(i,e,t){if(i.kind==="levelIntro")return[];const n=e.find(s=>t<s.fallStartMs);if(n==null)return[];const r=t-n.popStartMs;return r<0?[]:n.step.clearedTiles.filter(s=>Zd(s.tileType)!=null).map(s=>w_(s,r)).filter(s=>s!=null)}function y_(i,e,t){if(i.kind==="levelIntro")return[];const n=e.find(s=>t<s.fallStartMs);if(n==null)return[];const r=t-n.popStartMs;return r<0?[]:n.step.clearedTiles.flatMap(s=>E_(s,r))}function T_(i,e,t){if(i.kind==="levelIntro")return[];const n=e.find(s=>t<s.fallStartMs);if(n==null)return[];const r=t-n.popStartMs;return r<0?[]:n.step.clearedTiles.flatMap(s=>A_(s,r))}function b_(i,e){const t=Zd(i.tileType);if(t==null)return[];const n=e-(i.clearDelayMs??0);if(n<0||n>Tu)return[];const r=_n(n/Tu),s=se.x+i.coord.col*se.cellSize+se.cellSize/2,a=se.y+i.coord.row*se.cellSize+se.cellSize/2;return Array.from({length:l_},(o,l)=>{const c=$n(`${i.tileId}:${l}:a`),h=$n(`${i.tileId}:${l}:b`),u=c*Math.PI*2,d=kt(c_,u_,h)*Mi(r),f=kt(h_,d_,r);return{particleId:`${i.tileId}-pop-${l}`,x:s+Math.cos(u)*d,y:a+Math.sin(u)*d,radius:f,color:t,alpha:1-r,zIndex:20}})}function w_(i,e){const t=e-(i.clearDelayMs??0);if(t<0||t>bu)return null;const n=_n(t/bu),r=Mi(n);return{ringId:`${i.tileId}-burst-ring`,x:se.x+i.coord.col*se.cellSize+se.cellSize/2,y:se.y+i.coord.row*se.cellSize+se.cellSize/2,radius:f_*r,lineWidth:kt(p_,m_,n),color:"rgba(255, 255, 255, 0.85)",alpha:.42*Math.pow(1-n,1.4),zIndex:15}}function E_(i,e){if(i.tileType!=="TNT")return[];const t=e-(i.clearDelayMs??0);if(t<0||t>wu)return[];const n=_n(t/wu),r=Mi(n),s=se.x+i.coord.col*se.cellSize+se.cellSize/2,a=se.y+i.coord.row*se.cellSize+se.cellSize/2;return Array.from({length:g_},(o,l)=>{const c=$n(`${i.tileId}:tnt-cloud:${l}:angle`)*Math.PI*2,h=kt(8,94,$n(`${i.tileId}:tnt-cloud:${l}:distance`))*r,u=kt(18,72,$n(`${i.tileId}:tnt-cloud:${l}:radius`))*(.38+r*.92),d=kt(.75,1.22,$n(`${i.tileId}:tnt-cloud:${l}:squash`));return{puffId:`${i.tileId}-tnt-cloud-${l}`,x:s+Math.cos(c)*h,y:a+Math.sin(c)*h*.82,radiusX:u*d,radiusY:u/d,color:O_(l),alpha:.72*Math.pow(1-n,1.35),zIndex:24+l/100}})}function A_(i,e){if(i.tileType!=="TNT")return[];const t=e-(i.clearDelayMs??0);if(t<0||t>Eu)return[];const n=_n(t/Eu),r=Mi(n),s=se.x+i.coord.col*se.cellSize+se.cellSize/2,a=se.y+i.coord.row*se.cellSize+se.cellSize/2;return Array.from({length:Au},(o,l)=>{const c=kt(-10,10,$n(`${i.tileId}:tnt-debris:${l}:jitter`)),h=l*(360/Au)+c,u=h*Math.PI/180,d=kt(90,220,$n(`${i.tileId}:tnt-debris:${l}:travel`))*r,f=kt(20,64,$n(`${i.tileId}:tnt-debris:${l}:length`))*(.35+r*.65),p=Math.max(0,d-f);return{trailId:`${i.tileId}-tnt-debris-${l}`,x:s+Math.cos(u)*p,y:a+Math.sin(u)*p,angleDeg:h,length:f,width:kt(18,5,n),color:k_(l),alpha:.95*Math.pow(1-n,1.15),zIndex:28+l/100}})}function jd(i,e,t,n=za){const r=_n(e/n);return i.postSwapSnapshot.cells.map(s=>{const a=Jn(s.coord),o=t.get(s.tileId),l=i.preSwapSnapshot.cells.find(u=>u.tileId===s.tileId),c=o??(l==null?a:Jn(l.coord)),h=Mi(r);return Tr(s,{renderX:kt(c.renderX,a.renderX,h),renderY:kt(c.renderY,a.renderY,h),scale:kt(c.scale,1,h),alpha:kt(c.alpha,1,h),zIndex:5})})}function C_(i,e,t){if(e<Xr)return jd(i,e,t,Xr);if(e<Xr+Qo)return i.postSwapSnapshot.cells.map(a=>Tr(a,{...Jn(a.coord),scale:1,alpha:1,zIndex:5}));const n=e-Xr-Qo,r=_n(n/ad),s=Mi(r);return i.finalSnapshot.cells.map(a=>{const o=Jn(a.coord),l=i.postSwapSnapshot.cells.find(h=>h.tileId===a.tileId),c=l==null?o:Jn(l.coord);return Tr(a,{renderX:kt(c.renderX,o.renderX,s),renderY:kt(c.renderY,o.renderY,s),scale:1,alpha:1,zIndex:5})})}function R_(i,e){const t=new Map(i.clearedTiles.map(n=>[n.tileId,n]));return i.beforeClearSnapshot.cells.map(n=>Tr(n,t.has(n.tileId)?I_(t.get(n.tileId),e):{zIndex:0}))}function I_(i,e){const t=_n((e-(i.clearDelayMs??0))/od);return t<=0?{scale:1,alpha:1,zIndex:8}:{scale:1-Mi(t),alpha:1-t,zIndex:8}}function P_(i,e,t,n,r,s){const a=new Set([...i.fallingTiles.map(l=>l.tileId),...i.refillTiles.map(l=>l.tileId)]),o=i.beforeGravitySnapshot.cells.filter(l=>!a.has(l.tileId)).map(l=>Tr(l,{zIndex:0}));for(const l of i.fallingTiles)o.push(Cu(l,e,t,n,r,6,s));for(const l of i.refillTiles)o.push(Cu(l,e,t,n,r,7,s));return o}function Cu(i,e,t,n,r,s,a){const o=Math.max(1,Math.abs(i.to.row-i.from.row)),l=n.get(i.tileId)??0,c=Kd(o*ld+ud,ca,Math.min(cd,t)),h=_n((e-l)/c),u=F_(h),d=Jn(i.to),f="movementKind"in i&&i.movementKind==="slide",p=f?L_(i,r):D_(i,d,r),_=B_(h);return{tileId:i.tileId,coord:i.to,assetId:$d(i.tileType),tileType:i.tileType,isPath:i.isPath,alpha:(a||i.from.row<0)&&h<=0?0:1,renderX:f?kt(p.renderX,d.renderX,u):d.renderX,renderY:kt(p.renderY,d.renderY,u),scale:_,zIndex:s,isGhost:!0}}function L_(i,e){return e.get(i.tileId)??Jn(i.from)}function D_(i,e,t){const n=Jn({col:i.to.col,row:i.from.row}),r=t.get(i.tileId);return r==null||Math.abs(r.renderX-e.renderX)>.5?{...n,renderX:e.renderX}:{...r,renderX:e.renderX}}function U_(i){return i.cells.map(e=>Tr(e,{zIndex:0}))}function Tr(i,e={}){return{tileId:i.tileId,coord:i.coord,assetId:$d(i.tileType),tileType:i.tileType,isPath:i.isPath,alpha:e.alpha??1,renderX:e.renderX,renderY:e.renderY,scale:e.scale,zIndex:e.zIndex,isGhost:e.isGhost}}function N_(i){return new Map(i.boardCells.map(e=>{const t=Jn(e.coord);return[e.tileId,{renderX:e.renderX??t.renderX,renderY:e.renderY??t.renderY,scale:e.scale??1,alpha:e.alpha}]}))}function Jn(i){return{renderX:se.x+i.col*se.cellSize,renderY:se.y+i.row*se.cellSize,scale:1,alpha:1}}function F_(i){const e=_n(i),t=.82;if(e<t)return Math.pow(e/t,2.4)*.96;const n=(e-t)/(1-t),r=.96+(1-.96)*Mi(n),s=Math.sin(n*Math.PI*2)*.015*(1-n);return _n(r+s)}function B_(i){const e=_n(i);if(e<.72)return 1;const t=(e-.72)/.28;return 1+Math.sin(t*Math.PI*2)*.045*(1-t)}function Mi(i){return 1-Math.pow(1-_n(i),3)}function kt(i,e,t){return i+(e-i)*t}function _n(i){return Kd(i,0,1)}function Kd(i,e,t){return Math.max(e,Math.min(t,i))}function $d(i){switch(i){case"FIRE":return W.tiles.fire;case"ICE":return W.tiles.ice;case"LIGHTNING":return W.tiles.lightning;case"EARTH":return W.tiles.earth;case"LAND":return W.tiles.land;case"ROCKET_H":return W.powerUps.rocketH;case"ROCKET_V":return W.powerUps.rocketV;case"TNT":return W.powerUps.tnt;case"LIGHTBALL":return W.powerUps.lightball}}function Zd(i){switch(i){case"FIRE":return"#eb5757";case"ICE":return"#38d5ff";case"LIGHTNING":return"#f2c94c";case"EARTH":return"#27ae60";case"LAND":case"ROCKET_H":case"ROCKET_V":case"TNT":case"LIGHTBALL":return null}}function O_(i){return["#d6d2c8","#9b958d","#6f6a67","#f0c16a","#d67a37"][i%5]}function k_(i){return["#f7efe0","#f2994a","#c76b32","#5f5650"][i%4]}function $n(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967296}class z_{constructor(e,t,n,r){Te(this,"maskCanvas",null);Te(this,"maskCtx",null);this.ctx=e,this.images=t,this.width=n,this.height=r}setImages(e){this.images=e}clear(){this.ctx.clearRect(0,0,this.width,this.height)}pushTranslate(e,t){this.ctx.save(),this.ctx.translate(e,t)}pushScale(e,t,n=0,r=0){this.ctx.save(),this.ctx.translate(n,r),this.ctx.scale(e,t),this.ctx.translate(-n,-r)}pushRotate(e,t=0,n=0){this.ctx.save(),this.ctx.translate(t,n),this.ctx.rotate(e*Math.PI/180),this.ctx.translate(-t,-n)}pushAlpha(e){this.ctx.save(),this.ctx.globalAlpha*=Math.max(0,Math.min(1,e))}pushClipRect(e,t,n,r){this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(e,t,n,r),this.ctx.clip()}pop(){this.ctx.restore()}drawRect(e,t,n,r,s){this.ctx.fillStyle=e,this.ctx.fillRect(t,n,r,s)}drawEllipse(e,t,n,r,s){this.ctx.fillStyle=e,this.ctx.beginPath(),this.ctx.ellipse(t,n,r,s,0,0,Math.PI*2),this.ctx.fill()}drawRing(e,t,n,r,s,a){this.ctx.strokeStyle=e,this.ctx.lineWidth=a,this.ctx.beginPath(),this.ctx.ellipse(t,n,r,s,0,0,Math.PI*2),this.ctx.stroke()}hasImage(e){return this.images[e.id]!=null}drawImage(e,t,n,r,s){const a=this.images[e.id];a!=null&&this.ctx.drawImage(a,t,n,r,s)}drawImageAlphaMaskFill(e,t,n,r,s,a,o){const l=this.images[e.id];if(l==null||s<=0||a<=0||o<=0)return;const c=this.getMaskContext(Math.ceil(s),Math.ceil(a));if(c==null)return;const h=Math.ceil(s),u=Math.ceil(a);c.clearRect(0,0,h,u),c.globalCompositeOperation="source-over",c.globalAlpha=1,c.drawImage(l,0,0,h,u),c.globalCompositeOperation="source-in",c.globalAlpha=Math.max(0,Math.min(1,o)),c.fillStyle=t,c.fillRect(0,0,h,u),c.globalAlpha=1,c.globalCompositeOperation="source-over",this.ctx.drawImage(c.canvas,0,0,h,u,n,r,s,a)}drawText(e,t,n,r,s,a){this.ctx.fillStyle=a.color,this.ctx.font=Ru(a,a.fontSize);const o=Math.min(a.fontSize,a.minFontSize??a.fontSize);let l=a.fontSize;for(;l>o&&this.ctx.measureText(e).width>r;)l-=1,this.ctx.font=Ru(a,l);this.ctx.textAlign=a.align??"left",this.ctx.textBaseline="middle";const c=a.align==="center"?t+r/2:a.align==="right"?t+r:t;this.ctx.fillText(e,c,n+s/2,r)}getMaskContext(e,t){if(this.maskCanvas==null){if(typeof document>"u")return null;this.maskCanvas=document.createElement("canvas"),this.maskCtx=this.maskCanvas.getContext("2d")}return this.maskCtx==null||this.maskCanvas==null?null:(this.maskCanvas.width<e&&(this.maskCanvas.width=e),this.maskCanvas.height<t&&(this.maskCanvas.height=t),this.maskCtx)}}function Ru(i,e){return`${i.fontWeight??"normal"} ${e}px ${i.fontFamily??"Inter, Arial, sans-serif"}`}const V_=10,Jd=ts-V_,Iu=56,Rs="#ffffff";function Qd(i,e,t,n,r){i.clear(),W_(i),X_(i,t),Y_(i,e,n),r!=null&&nx(i,r)}function H_(i,e){var u;const t=new Set(i.hintedCells.map(Ur)),n=new Set(((u=i.matchHint)==null?void 0:u.flashCells.map(Ur))??[]),r=i.matchHint==null?null:Ur(i.matchHint.movingCell),s=new Map;for(const d of i.visualCues){const f=Ur(d.coord);s.set(f,[...s.get(f)??[],d])}const a=[],o=(Math.sin(e*Math.PI*3)+1)/2,l=i.matchHint==null?0:(Math.sin(i.matchHint.progress*Math.PI*2*5)+1)/2,c=i.matchHint==null?0:.18+l*.32,h=i.matchHint==null?{x:0,y:0}:G_(i.matchHint.direction,i.matchHint.progress);for(const d of i.boardCells){const f=d.coord,p=Ur(f),_=t.has(p)||n.has(p),g=t.has(p),m=n.has(p),S=s.get(p)??[],M=S.reduce((P,C)=>C.kind==="damagePopup"?P:Math.max(P,C.value),0),y=S.some(P=>P.kind==="powerPulse")?1+S.reduce((P,C)=>Math.max(P,C.value),0)*.1:1,A=se.x+f.col*se.cellSize,b=se.y+f.row*se.cellSize,R=r===p,v=(d.renderX??A)+(R?h.x:0),E=(d.renderY??b)+(R?h.y:0);a.push({tileId:d.tileId,coord:f,x:v,y:E,width:se.cellSize,height:se.cellSize,centerX:v+se.cellSize/2,centerY:E+se.cellSize/2,assetId:d.assetId,tileType:d.tileType,fillColor:ax(d.tileType),glyph:ox(d.tileType),isPath:d.isPath,isHinted:_,hasMage:Pu(i.mageCell,f),hasGoal:Pu(i.goalCell,f),alpha:d.alpha,scale:d.scale??Math.max(g?1+o*.05:1,y),flash:Math.max(g?.35+o*.45:0,m?c:0,M*.5),zIndex:(d.zIndex??0)+(R?.5:0)})}return a}function G_(i,e){const t=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.sin(t*Math.PI*2*3))*um;return{x:i.col*n,y:i.row*n}}function W_(i){const e={id:W.ui.hudBanner};i.hasImage(e)&&i.drawImage(e,0,Jd,qt,Kn),i.drawRect("#1f1830",0,ts+Kn,qt,Bn-ts-Kn)}function X_(i,e){const t=Jd;i.drawText(e.levelText,Iu,t,190,Kn,{fontSize:34,minFontSize:22,fontWeight:"bold",color:Rs,align:"left"}),i.drawText(e.livesText,270,t,190,Kn,{fontSize:34,minFontSize:22,fontWeight:"bold",color:Rs,align:"left"}),i.drawText(`Score ${e.scoreText}`,480,t,280,Kn,{fontSize:34,minFontSize:20,fontWeight:"bold",color:Rs,align:"left"}),i.drawText(e.objectiveText,772,t,qt-Iu-772,Kn,{fontSize:28,minFontSize:18,fontWeight:"bold",color:Rs,align:"right"})}function Y_(i,e,t){const n=e.shakePixels;i.pushTranslate(n,0),q_(i);const r=H_(e,t).sort((s,a)=>s.zIndex-a.zIndex||s.coord.row-a.coord.row||s.coord.col-a.coord.col);i.pushClipRect(se.x,se.y,se.width,se.height);for(const s of e.emptyCells??[])j_(i,s.coord,s.assetId);for(const s of r)$_(i,s);J_(i,e),Q_(i,e),ex(i,e),Z_(i,e),i.pop(),K_(i),tx(i,e),i.pop()}function q_(i){const e={id:W.ui.boardBackground};if(i.hasImage(e)){i.drawImage(e,se.x,se.y,se.width,se.height);return}i.drawRect("#302340",se.x,se.y,se.width,se.height)}function j_(i,e,t){const n=se.x+e.col*se.cellSize,r=se.y+e.row*se.cellSize;i.drawRect("#171225",n,r,se.cellSize,se.cellSize);const s={id:t};if(i.hasImage(s)){i.drawImage(s,n,r,se.cellSize,se.cellSize);return}i.drawRect("#0f0b18",n+8,r+8,se.cellSize-16,se.cellSize-16)}function K_(i){i.drawRect("#c8a24b",se.x-8,se.y-8,se.width+16,8),i.drawRect("#c8a24b",se.x-8,se.y+se.height,se.width+16,8),i.drawRect("#c8a24b",se.x-8,se.y,8,se.height),i.drawRect("#c8a24b",se.x+se.width,se.y,8,se.height)}function $_(i,e){const n=e.width-16,r=e.height-16,s=n*e.scale,a=r*e.scale,o=e.centerX-s/2,l=e.centerY-a/2;if(e.alpha<=0)return;i.pushAlpha(e.alpha);const c={id:e.assetId},h=i.hasImage(c);h?i.drawImage(c,o,l,s,a):i.drawRect(e.fillColor,o,l,s,a),e.isPath&&i.drawRect("rgba(245, 233, 201, 0.55)",e.x+12,e.y+12,e.width-24,e.height-24),e.flash>0&&(h?i.drawImageAlphaMaskFill(c,"#ffffff",o,l,s,a,e.flash):i.drawRect(`rgba(255, 255, 255, ${e.flash.toFixed(3)})`,e.x+4,e.y+4,e.width-8,e.height-8)),h||i.drawText(e.glyph,e.x,e.y,e.width,e.height,{fontSize:54,fontWeight:"bold",color:e.tileType==="LIGHTNING"?"#241832":"#f5e9c9",align:"center"}),e.hasGoal&&i.drawText("G",e.x+e.width-44,e.y+10,34,34,{fontSize:28,fontWeight:"bold",color:"#241832",align:"center"}),e.hasMage&&(i.drawEllipse("#4b2e83",e.centerX,e.centerY,34,34),i.drawEllipse("#c8a24b",e.centerX,e.centerY,25,25),i.drawText("M",e.centerX-24,e.centerY-24,48,48,{fontSize:30,fontWeight:"bold",color:"#241832",align:"center"})),i.pop()}function Z_(i,e){const t=[...e.particles??[]].sort((n,r)=>n.zIndex-r.zIndex);for(const n of t)n.alpha<=0||n.radius<=0||(i.pushAlpha(n.alpha),i.drawEllipse(n.color,n.x,n.y,n.radius,n.radius),i.pop())}function J_(i,e){const t=[...e.tntCloudPuffs??[]].sort((n,r)=>n.zIndex-r.zIndex);for(const n of t)n.alpha<=0||n.radiusX<=0||n.radiusY<=0||(i.pushAlpha(n.alpha),i.drawEllipse(n.color,n.x,n.y,n.radiusX,n.radiusY),i.pop())}function Q_(i,e){const t=[...e.tntDebrisTrails??[]].sort((n,r)=>n.zIndex-r.zIndex);for(const n of t)n.alpha<=0||n.length<=0||n.width<=0||(i.pushAlpha(n.alpha),i.pushRotate(n.angleDeg,n.x,n.y),i.drawRect(n.color,n.x,n.y-n.width/2,n.length,n.width),i.drawEllipse(n.color,n.x+n.length,n.y,n.width*.55,n.width*.55),i.pop(),i.pop())}function ex(i,e){const t=[...e.burstRings??[]].sort((n,r)=>n.zIndex-r.zIndex);for(const n of t)n.alpha<=0||n.radius<=0||n.lineWidth<=0||(i.pushAlpha(n.alpha),i.drawRing(n.color,n.x,n.y,n.radius,n.radius,n.lineWidth),i.pop())}function tx(i,e){for(const t of e.visualCues){if(t.kind!=="damagePopup"||t.text==null)continue;const n=se.x+t.coord.col*se.cellSize,r=se.y+t.coord.row*se.cellSize-(1-t.value)*42;i.drawText(t.text,n,r,se.cellSize,42,{fontSize:30,fontWeight:"bold",color:`rgba(245, 233, 201, ${Math.max(0,t.value).toFixed(3)})`,align:"center"})}}function nx(i,e){if(e.screen==="title"){ix(i,e);return}if(e.screen==="gameOver"){rx(i,e);return}e.transitionText!=null&&sx(i,e.transitionText)}function ix(i,e){i.drawRect("rgba(20, 14, 32, 0.78)",0,0,qt,Bn),i.drawText("MAGUS MATCH",100,250,880,150,{fontSize:86,fontWeight:"bold",color:"#f5e9c9",align:"center"}),i.drawText("Save the prince one spell at a time",160,390,760,60,{fontSize:34,fontWeight:"normal",color:"#c8a24b",align:"center"}),ef(i,e.buttonRects.play,"PLAY"),tf(i,e,1260,5)}function rx(i,e){i.drawRect("rgba(20, 14, 32, 0.86)",0,0,qt,Bn),i.drawText("GAME OVER",120,185,840,110,{fontSize:72,fontWeight:"bold",color:"#f5e9c9",align:"center"}),i.drawText(`Final ${e.finalScore}`,140,320,800,70,{fontSize:42,fontWeight:"bold",color:"#c8a24b",align:"center"}),i.drawText(`High ${e.highScore}`,140,390,800,54,{fontSize:30,fontWeight:"bold",color:"#f5e9c9",align:"center"}),tf(i,e,520,10),ef(i,e.buttonRects.tryAgain,"TRY AGAIN")}function sx(i,e){i.drawRect("rgba(20, 14, 32, 0.55)",0,0,qt,Bn),i.drawText(e,120,800,840,120,{fontSize:70,fontWeight:"bold",color:"#f5e9c9",align:"center"})}function ef(i,e,t){i.drawRect("#c8a24b",e.x,e.y,e.width,e.height),i.drawRect("#4b2e83",e.x+8,e.y+8,e.width-16,e.height-16),i.drawText(t,e.x,e.y,e.width,e.height,{fontSize:44,fontWeight:"bold",color:"#f5e9c9",align:"center"})}function tf(i,e,t,n){i.drawText("HALL OF HEROES",150,t,780,56,{fontSize:34,fontWeight:"bold",color:"#f5e9c9",align:"center"});const r=e.leaderboardRows.slice(0,n);if(r.length===0){i.drawText("No champions yet",190,t+74,700,44,{fontSize:26,fontWeight:"normal",color:"#c8a24b",align:"center"});return}r.forEach((s,a)=>{const o=t+72+a*52,l=e.highlightedRank===a+1;l&&i.drawRect("rgba(200, 162, 75, 0.35)",120,o-3,840,46),i.drawText(`${a+1}. ${s.name}`,145,o,520,42,{fontSize:26,fontWeight:l?"bold":"normal",color:"#f5e9c9",align:"left"}),i.drawText(`${s.score}`,665,o,260,42,{fontSize:26,fontWeight:l?"bold":"normal",color:"#c8a24b",align:"right"})})}function ax(i){switch(i){case"FIRE":return"#eb5757";case"ICE":return"#2d9cdb";case"LIGHTNING":return"#f2c94c";case"EARTH":return"#27ae60";case"LAND":return"#8b6f47";case"ROCKET_H":case"ROCKET_V":case"TNT":case"LIGHTBALL":return"#c8a24b"}}function ox(i){switch(i){case"FIRE":return"F";case"ICE":return"I";case"LIGHTNING":return"L";case"EARTH":return"E";case"LAND":return"P";case"ROCKET_H":return"H";case"ROCKET_V":return"V";case"TNT":return"B";case"LIGHTBALL":return"O"}}function Ur(i){return`${i.col},${i.row}`}function Pu(i,e){return i!=null&&i.col===e.col&&i.row===e.row}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oc="184",lx=0,Lu=1,cx=2,da=1,ux=2,jr=3,vi=0,en=1,an=2,Qn=0,xi=1,Du=2,Uu=3,Nu=4,hx=5,Ni=100,dx=101,fx=102,px=103,mx=104,gx=200,_x=201,xx=202,vx=203,al=204,ol=205,Sx=206,Mx=207,yx=208,Tx=209,bx=210,wx=211,Ex=212,Ax=213,Cx=214,ll=0,cl=1,ul=2,br=3,hl=4,dl=5,fl=6,pl=7,Wa=0,Rx=1,Ix=2,Nn=0,nf=1,rf=2,sf=3,af=4,of=5,lf=6,cf=7,Fu="attached",Px="detached",uf=300,Vi=301,wr=302,fa=303,co=304,Xa=306,ns=1e3,Tn=1001,ml=1002,Ht=1003,Lx=1004,Is=1005,Yt=1006,uo=1007,Oi=1008,on=1009,hf=1010,df=1011,is=1012,lc=1013,On=1014,fn=1015,ni=1016,cc=1017,uc=1018,rs=1020,ff=35902,pf=35899,mf=1021,gf=1022,pn=1023,ii=1026,ki=1027,hc=1028,dc=1029,Hi=1030,fc=1031,pc=1033,pa=33776,ma=33777,ga=33778,_a=33779,gl=35840,_l=35841,xl=35842,vl=35843,Sl=36196,Ml=37492,yl=37496,Tl=37488,bl=37489,Ea=37490,wl=37491,El=37808,Al=37809,Cl=37810,Rl=37811,Il=37812,Pl=37813,Ll=37814,Dl=37815,Ul=37816,Nl=37817,Fl=37818,Bl=37819,Ol=37820,kl=37821,zl=36492,Vl=36494,Hl=36495,Gl=36283,Wl=36284,Aa=36285,Xl=36286,Dx=2200,_f=2201,Ux=2202,Ca=2300,Yl=2301,ho=2302,Bu=2303,pr=2400,mr=2401,Ra=2402,mc=2500,xf=2501,Nx=3200,ss=0,Fx=1,mi="",rt="srgb",Ia="srgb-linear",Pa="linear",it="srgb",Ki=7680,Ou=519,Bx=512,Ox=513,kx=514,gc=515,zx=516,Vx=517,_c=518,Hx=519,ku=35044,zu="300 es",Un=2e3,as=2001;function Gx(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function vf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function os(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wx(){const i=os("canvas");return i.style.display="block",i}const Vu={};function Hu(...i){const e="THREE."+i.shift();console.log(e,...i)}function Sf(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ee(...i){i=Sf(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Le(...i){i=Sf(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ql(...i){const e=i.join(" ");e in Vu||(Vu[e]=!0,Ee(...i))}function Xx(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Yx={[ll]:cl,[ul]:fl,[hl]:pl,[br]:dl,[cl]:ll,[fl]:ul,[pl]:hl,[dl]:br};class yi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Gu=1234567;const vr=Math.PI/180,Er=180/Math.PI;function Ti(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function xc(i,e){return(i%e+e)%e}function qx(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function jx(i,e,t){return i!==e?(t-i)/(e-i):0}function Zr(i,e,t){return(1-t)*i+t*e}function Kx(i,e,t,n){return Zr(i,e,1-Math.exp(-t*n))}function $x(i,e=1){return e-Math.abs(xc(i,e*2)-e)}function Zx(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Jx(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Qx(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ev(i,e){return i+Math.random()*(e-i)}function tv(i){return i*(.5-Math.random())}function nv(i){i!==void 0&&(Gu=i);let e=Gu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function iv(i){return i*vr}function rv(i){return i*Er}function sv(i){return(i&i-1)===0&&i!==0}function av(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ov(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function lv(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),p=a((n-e)/2);switch(r){case"XYX":i.set(o*h,l*u,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*p,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*p,o*c);break;case"ZYZ":i.set(l*p,l*f,o*h,o*c);break;default:Ee("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function fr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function $t(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Jt={DEG2RAD:vr,RAD2DEG:Er,generateUUID:Ti,clamp:qe,euclideanModulo:xc,mapLinear:qx,inverseLerp:jx,lerp:Zr,damp:Kx,pingpong:$x,smoothstep:Zx,smootherstep:Jx,randInt:Qx,randFloat:ev,randFloatSpread:tv,seededRandom:nv,degToRad:iv,radToDeg:rv,isPowerOfTwo:sv,ceilPowerOfTwo:av,floorPowerOfTwo:ov,setQuaternionFromProperEuler:lv,normalize:$t,denormalize:fr},Oc=class Oc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Oc.prototype.isVector2=!0;let $e=Oc;class Rt{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3],d=s[a+0],f=s[a+1],p=s[a+2],_=s[a+3];if(u!==_||l!==d||c!==f||h!==p){let g=l*d+c*f+h*p+u*_;g<0&&(d=-d,f=-f,p=-p,_=-_,g=-g);let m=1-o;if(g<.9995){const S=Math.acos(g),M=Math.sin(S);m=Math.sin(m*S)/M,o=Math.sin(o*S)/M,l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+_*o}else{l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+_*o;const S=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=S,c*=S,h*=S,u*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=s[a],d=s[a+1],f=s[a+2],p=s[a+3];return e[t]=o*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-o*f,e[t+2]=c*p+h*f+o*d-l*u,e[t+3]=h*p-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),u=o(s/2),d=l(n/2),f=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Ee("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const kc=class kc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=r+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fo.copy(this).projectOnVector(e),this.sub(fo)}reflect(e){return this.sub(fo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};kc.prototype.isVector3=!0;let D=kc;const fo=new D,Wu=new Rt,zc=class zc{constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],_=r[0],g=r[3],m=r[6],S=r[1],M=r[4],y=r[7],A=r[2],b=r[5],R=r[8];return s[0]=a*_+o*S+l*A,s[3]=a*g+o*M+l*b,s[6]=a*m+o*y+l*R,s[1]=c*_+h*S+u*A,s[4]=c*g+h*M+u*b,s[7]=c*m+h*y+u*R,s[2]=d*_+f*S+p*A,s[5]=d*g+f*M+p*b,s[8]=d*m+f*y+p*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=u*_,e[1]=(r*c-h*n)*_,e[2]=(o*n-r*a)*_,e[3]=d*_,e[4]=(h*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(po.makeScale(e,t)),this}rotate(e){return this.premultiply(po.makeRotation(-e)),this}translate(e,t){return this.premultiply(po.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};zc.prototype.isMatrix3=!0;let Be=zc;const po=new Be,Xu=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yu=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cv(){const i={enabled:!0,workingColorSpace:Ia,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===it&&(r.r=ei(r.r),r.g=ei(r.g),r.b=ei(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===it&&(r.r=Sr(r.r),r.g=Sr(r.g),r.b=Sr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===mi?Pa:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ql("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ql("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ia]:{primaries:e,whitePoint:n,transfer:Pa,toXYZ:Xu,fromXYZ:Yu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:rt},outputColorSpaceConfig:{drawingBufferColorSpace:rt}},[rt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:Xu,fromXYZ:Yu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:rt}}}),i}const Oe=cv();function ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Sr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let $i;class uv{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{$i===void 0&&($i=os("canvas")),$i.width=e.width,$i.height=e.height;const r=$i.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=$i}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=os("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ei(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ei(t[n]/255)*255):t[n]=ei(t[n]);return{data:t,width:e.width,height:e.height}}else return Ee("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hv=0;class vc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hv++}),this.uuid=Ti(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(mo(r[a].image)):s.push(mo(r[a]))}else s=mo(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function mo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?uv.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ee("Texture: Unable to serialize Texture."),{})}let dv=0;const go=new D;class Pt extends yi{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=Tn,r=Tn,s=Yt,a=Oi,o=pn,l=on,c=Pt.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dv++}),this.uuid=Ti(),this.name="",this.source=new vc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(go).x}get height(){return this.source.getSize(go).y}get depth(){return this.source.getSize(go).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ee(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ee(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==uf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ns:e.x=e.x-Math.floor(e.x);break;case Tn:e.x=e.x<0?0:1;break;case ml:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ns:e.y=e.y-Math.floor(e.y);break;case Tn:e.y=e.y<0?0:1;break;case ml:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=uf;Pt.DEFAULT_ANISOTROPY=1;const Vc=class Vc{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,y=(f+1)/2,A=(m+1)/2,b=(h+d)/4,R=(u+_)/4,v=(p+g)/4;return M>y&&M>A?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=b/n,s=R/n):y>A?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=b/r,s=v/r):A<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),n=R/s,r=v/s),this.set(n,r,s,t),this}let S=Math.sqrt((g-p)*(g-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(g-p)/S,this.y=(u-_)/S,this.z=(d-h)/S,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Vc.prototype.isVector4=!0;let et=Vc;class fv extends yi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Pt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new vc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fn extends fv{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Mf extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class pv extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ua=class Ua{constructor(e,t,n,r,s,a,o,l,c,h,u,d,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,u,d,f,p,_,g)}set(e,t,n,r,s,a,o,l,c,h,u,d,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ua().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Zi.setFromMatrixColumn(e,0).length(),s=1/Zi.setFromMatrixColumn(e,1).length(),a=1/Zi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,f=a*u,p=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d+_*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,p=o*h,_=o*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mv,e,gv)}lookAt(e,t,n){const r=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),li.crossVectors(n,rn),li.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),li.crossVectors(n,rn)),li.normalize(),Ps.crossVectors(rn,li),r[0]=li.x,r[4]=Ps.x,r[8]=rn.x,r[1]=li.y,r[5]=Ps.y,r[9]=rn.y,r[2]=li.z,r[6]=Ps.z,r[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],S=n[3],M=n[7],y=n[11],A=n[15],b=r[0],R=r[4],v=r[8],E=r[12],P=r[1],C=r[5],N=r[9],G=r[13],Y=r[2],U=r[6],V=r[10],O=r[14],J=r[3],ee=r[7],ce=r[11],Se=r[15];return s[0]=a*b+o*P+l*Y+c*J,s[4]=a*R+o*C+l*U+c*ee,s[8]=a*v+o*N+l*V+c*ce,s[12]=a*E+o*G+l*O+c*Se,s[1]=h*b+u*P+d*Y+f*J,s[5]=h*R+u*C+d*U+f*ee,s[9]=h*v+u*N+d*V+f*ce,s[13]=h*E+u*G+d*O+f*Se,s[2]=p*b+_*P+g*Y+m*J,s[6]=p*R+_*C+g*U+m*ee,s[10]=p*v+_*N+g*V+m*ce,s[14]=p*E+_*G+g*O+m*Se,s[3]=S*b+M*P+y*Y+A*J,s[7]=S*R+M*C+y*U+A*ee,s[11]=S*v+M*N+y*V+A*ce,s[15]=S*E+M*G+y*O+A*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],S=l*f-c*d,M=o*f-c*u,y=o*d-l*u,A=a*f-c*h,b=a*d-l*h,R=a*u-o*h;return t*(_*S-g*M+m*y)-n*(p*S-g*A+m*b)+r*(p*M-_*A+m*R)-s*(p*y-_*b+g*R)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],S=t*o-n*a,M=t*l-r*a,y=t*c-s*a,A=n*l-r*o,b=n*c-s*o,R=r*c-s*l,v=h*_-u*p,E=h*g-d*p,P=h*m-f*p,C=u*g-d*_,N=u*m-f*_,G=d*m-f*g,Y=S*G-M*N+y*C+A*P-b*E+R*v;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/Y;return e[0]=(o*G-l*N+c*C)*U,e[1]=(r*N-n*G-s*C)*U,e[2]=(_*R-g*b+m*A)*U,e[3]=(d*b-u*R-f*A)*U,e[4]=(l*P-a*G-c*E)*U,e[5]=(t*G-r*P+s*E)*U,e[6]=(g*y-p*R-m*M)*U,e[7]=(h*R-d*y+f*M)*U,e[8]=(a*N-o*P+c*v)*U,e[9]=(n*P-t*N-s*v)*U,e[10]=(p*b-_*y+m*S)*U,e[11]=(u*y-h*b-f*S)*U,e[12]=(o*E-a*C-l*v)*U,e[13]=(t*C-n*E+r*v)*U,e[14]=(_*M-p*A-g*S)*U,e[15]=(h*A-u*M+d*S)*U,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,p=s*u,_=a*h,g=a*u,m=o*u,S=l*c,M=l*h,y=l*u,A=n.x,b=n.y,R=n.z;return r[0]=(1-(_+m))*A,r[1]=(f+y)*A,r[2]=(p-M)*A,r[3]=0,r[4]=(f-y)*b,r[5]=(1-(d+m))*b,r[6]=(g+S)*b,r[7]=0,r[8]=(p+M)*R,r[9]=(g-S)*R,r[10]=(1-(d+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Zi.set(r[0],r[1],r[2]).length();const o=Zi.set(r[4],r[5],r[6]).length(),l=Zi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),xn.copy(this);const c=1/a,h=1/o,u=1/l;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,t.setFromRotationMatrix(xn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=Un,l=!1){const c=this.elements,h=2*s/(t-e),u=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r);let p,_;if(l)p=s/(a-s),_=a*s/(a-s);else if(o===Un)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===as)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Un,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r);let p,_;if(l)p=1/(a-s),_=a/(a-s);else if(o===Un)p=-2/(a-s),_=-(a+s)/(a-s);else if(o===as)p=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ua.prototype.isMatrix4=!0;let we=Ua;const Zi=new D,xn=new we,mv=new D(0,0,0),gv=new D(1,1,1),li=new D,Ps=new D,rn=new D,qu=new we,ju=new Rt;class Vt{constructor(e=0,t=0,n=0,r=Vt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ee("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ju.setFromEuler(this),this.setFromQuaternion(ju,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vt.DEFAULT_ORDER="XYZ";class yf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let _v=0;const Ku=new D,Ji=new Rt,Gn=new we,Ls=new D,Nr=new D,xv=new D,vv=new Rt,$u=new D(1,0,0),Zu=new D(0,1,0),Ju=new D(0,0,1),Qu={type:"added"},Sv={type:"removed"},Qi={type:"childadded",child:null},_o={type:"childremoved",child:null};class _t extends yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_v++}),this.uuid=Ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_t.DEFAULT_UP.clone();const e=new D,t=new Vt,n=new Rt,r=new D(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new we},normalMatrix:{value:new Be}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=_t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis($u,e)}rotateY(e){return this.rotateOnAxis(Zu,e)}rotateZ(e){return this.rotateOnAxis(Ju,e)}translateOnAxis(e,t){return Ku.copy(e).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($u,e)}translateY(e){return this.translateOnAxis(Zu,e)}translateZ(e){return this.translateOnAxis(Ju,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ls.copy(e):Ls.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(Nr,Ls,this.up):Gn.lookAt(Ls,Nr,this.up),this.quaternion.setFromRotationMatrix(Gn),r&&(Gn.extractRotation(r.matrixWorld),Ji.setFromRotationMatrix(Gn),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Le("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qu),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):Le("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sv),_o.child=e,this.dispatchEvent(_o),_o.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qu),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,e,xv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,vv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=r,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}_t.DEFAULT_UP=new D(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class mn extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Mv={type:"move"};class xo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mv)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new mn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Tf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},Ds={h:0,s:0,l:0};function vo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ue{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Oe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Oe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Oe.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Oe.workingColorSpace){if(e=xc(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=vo(a,s,e+1/3),this.g=vo(a,s,e),this.b=vo(a,s,e-1/3)}return Oe.colorSpaceToWorking(this,r),this}setStyle(e,t=rt){function n(s){s!==void 0&&parseFloat(s)<1&&Ee("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ee("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ee("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rt){const n=Tf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ee("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=Sr(e.r),this.g=Sr(e.g),this.b=Sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rt){return Oe.workingToColorSpace(Xt.copy(this),e),Math.round(qe(Xt.r*255,0,255))*65536+Math.round(qe(Xt.g*255,0,255))*256+Math.round(qe(Xt.b*255,0,255))}getHexString(e=rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Oe.workingColorSpace){Oe.workingToColorSpace(Xt.copy(this),t);const n=Xt.r,r=Xt.g,s=Xt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Oe.workingColorSpace){return Oe.workingToColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=rt){Oe.workingToColorSpace(Xt.copy(this),e);const t=Xt.r,n=Xt.g,r=Xt.b;return e!==rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ci),this.setHSL(ci.h+e,ci.s+t,ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ci),e.getHSL(Ds);const n=Zr(ci.h,Ds.h,t),r=Zr(ci.s,Ds.s,t),s=Zr(ci.l,Ds.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new Ue;Ue.NAMES=Tf;class yv extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vt,this.environmentIntensity=1,this.environmentRotation=new Vt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const vn=new D,Wn=new D,So=new D,Xn=new D,er=new D,tr=new D,eh=new D,Mo=new D,yo=new D,To=new D,bo=new et,wo=new et,Eo=new et;class hn{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),vn.subVectors(e,t),r.cross(vn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){vn.subVectors(r,t),Wn.subVectors(n,t),So.subVectors(e,t);const a=vn.dot(vn),o=vn.dot(Wn),l=vn.dot(So),c=Wn.dot(Wn),h=Wn.dot(So),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Xn.x),l.addScaledVector(a,Xn.y),l.addScaledVector(o,Xn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return bo.setScalar(0),wo.setScalar(0),Eo.setScalar(0),bo.fromBufferAttribute(e,t),wo.fromBufferAttribute(e,n),Eo.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(bo,s.x),a.addScaledVector(wo,s.y),a.addScaledVector(Eo,s.z),a}static isFrontFacing(e,t,n,r){return vn.subVectors(n,t),Wn.subVectors(e,t),vn.cross(Wn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),vn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return hn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;er.subVectors(r,n),tr.subVectors(s,n),Mo.subVectors(e,n);const l=er.dot(Mo),c=tr.dot(Mo);if(l<=0&&c<=0)return t.copy(n);yo.subVectors(e,r);const h=er.dot(yo),u=tr.dot(yo);if(h>=0&&u<=h)return t.copy(r);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(er,a);To.subVectors(e,s);const f=er.dot(To),p=tr.dot(To);if(p>=0&&f<=p)return t.copy(s);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(tr,o);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return eh.subVectors(s,r),o=(u-h)/(u-h+(f-p)),t.copy(r).addScaledVector(eh,o);const m=1/(g+_+d);return a=_*m,o=d*m,t.copy(n).addScaledVector(er,a).addScaledVector(tr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class kn{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Sn):Sn.fromBufferAttribute(s,a),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Us.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Us.copy(n.boundingBox)),Us.applyMatrix4(e.matrixWorld),this.union(Us)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fr),Ns.subVectors(this.max,Fr),nr.subVectors(e.a,Fr),ir.subVectors(e.b,Fr),rr.subVectors(e.c,Fr),ui.subVectors(ir,nr),hi.subVectors(rr,ir),Ri.subVectors(nr,rr);let t=[0,-ui.z,ui.y,0,-hi.z,hi.y,0,-Ri.z,Ri.y,ui.z,0,-ui.x,hi.z,0,-hi.x,Ri.z,0,-Ri.x,-ui.y,ui.x,0,-hi.y,hi.x,0,-Ri.y,Ri.x,0];return!Ao(t,nr,ir,rr,Ns)||(t=[1,0,0,0,1,0,0,0,1],!Ao(t,nr,ir,rr,Ns))?!1:(Fs.crossVectors(ui,hi),t=[Fs.x,Fs.y,Fs.z],Ao(t,nr,ir,rr,Ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Yn=[new D,new D,new D,new D,new D,new D,new D,new D],Sn=new D,Us=new kn,nr=new D,ir=new D,rr=new D,ui=new D,hi=new D,Ri=new D,Fr=new D,Ns=new D,Fs=new D,Ii=new D;function Ao(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Ii.fromArray(i,s);const o=r.x*Math.abs(Ii.x)+r.y*Math.abs(Ii.y)+r.z*Math.abs(Ii.z),l=e.dot(Ii),c=t.dot(Ii),h=n.dot(Ii);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const At=new D,Bs=new $e;let Tv=0;class bn extends yi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Tv++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ku,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Bs.fromBufferAttribute(this,t),Bs.applyMatrix3(e),this.setXY(t,Bs.x,Bs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=fr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fr(t,this.array)),t}setX(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fr(t,this.array)),t}setY(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fr(t,this.array)),t}setW(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),r=$t(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),r=$t(r,this.array),s=$t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ku&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Sc extends bn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class bf extends bn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class xt extends bn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const bv=new kn,Br=new D,Co=new D;class bi{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):bv.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Br.subVectors(e,this.center);const t=Br.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Br,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Co.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Br.copy(e.center).add(Co)),this.expandByPoint(Br.copy(e.center).sub(Co))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let wv=0;const un=new we,Ro=new _t,sr=new D,sn=new kn,Or=new kn,Ot=new D;class jt extends yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wv++}),this.uuid=Ti(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gx(e)?bf:Sc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Be().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,n){return un.makeTranslation(e,t,n),this.applyMatrix4(un),this}scale(e,t,n){return un.makeScale(e,t,n),this.applyMatrix4(un),this}lookAt(e){return Ro.lookAt(e),Ro.updateMatrix(),this.applyMatrix4(Ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(sr).negate(),this.translate(sr.x,sr.y,sr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new xt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ee("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Or.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(sn.min,Or.min),sn.expandByPoint(Ot),Ot.addVectors(sn.max,Or.max),sn.expandByPoint(Ot)):(sn.expandByPoint(Or.min),sn.expandByPoint(Or.max))}sn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ot));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ot.fromBufferAttribute(o,c),l&&(sr.fromBufferAttribute(e,c),Ot.add(sr)),r=Math.max(r,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new D,l[v]=new D;const c=new D,h=new D,u=new D,d=new $e,f=new $e,p=new $e,_=new D,g=new D;function m(v,E,P){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,P),d.fromBufferAttribute(s,v),f.fromBufferAttribute(s,E),p.fromBufferAttribute(s,P),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const C=1/(f.x*p.y-p.x*f.y);isFinite(C)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(C),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(C),o[v].add(_),o[E].add(_),o[P].add(_),l[v].add(g),l[E].add(g),l[P].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,E=S.length;v<E;++v){const P=S[v],C=P.start,N=P.count;for(let G=C,Y=C+N;G<Y;G+=3)m(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const M=new D,y=new D,A=new D,b=new D;function R(v){A.fromBufferAttribute(r,v),b.copy(A);const E=o[v];M.copy(E),M.sub(A.multiplyScalar(A.dot(E))).normalize(),y.crossVectors(b,E);const C=y.dot(l[v])<0?-1:1;a.setXYZW(v,M.x,M.y,M.z,C)}for(let v=0,E=S.length;v<E;++v){const P=S[v],C=P.start,N=P.count;for(let G=C,Y=C+N;G<Y;G+=3)R(e.getX(G+0)),R(e.getX(G+1)),R(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const r=new D,s=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new bn(d,h,u)}if(this.index===null)return Ee("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Ev=0;class wi extends yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ev++}),this.uuid=Ti(),this.name="",this.type="Material",this.blending=xi,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=al,this.blendDst=ol,this.blendEquation=Ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=br,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ou,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ki,this.stencilZFail=Ki,this.stencilZPass=Ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ee(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ee(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xi&&(n.blending=this.blending),this.side!==vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==al&&(n.blendSrc=this.blendSrc),this.blendDst!==ol&&(n.blendDst=this.blendDst),this.blendEquation!==Ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==br&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ou&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const qn=new D,Io=new D,Os=new D,di=new D,Po=new D,ks=new D,Lo=new D;class Mc{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Io.copy(e).add(t).multiplyScalar(.5),Os.copy(t).sub(e).normalize(),di.copy(this.origin).sub(Io);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Os),o=di.dot(this.direction),l=-di.dot(Os),c=di.lengthSq(),h=Math.abs(1-a*a);let u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=s*h,u>=0)if(d>=-p)if(d<=p){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Io).addScaledVector(Os,d),f}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),r=qn.dot(qn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,r,s){Po.subVectors(t,e),ks.subVectors(n,e),Lo.crossVectors(Po,ks);let a=this.direction.dot(Lo),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;di.subVectors(this.origin,e);const l=o*this.direction.dot(ks.crossVectors(di,ks));if(l<0)return null;const c=o*this.direction.dot(Po.cross(di));if(c<0||l+c>a)return null;const h=-o*di.dot(Lo);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ei extends wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=Wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const th=new we,Pi=new Mc,zs=new bi,nh=new D,Vs=new D,Hs=new D,Gs=new D,Do=new D,Ws=new D,ih=new D,Xs=new D;class ft extends _t{constructor(e=new jt,t=new Ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ws.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(Do.fromBufferAttribute(u,e),a?Ws.addScaledVector(Do,h):Ws.addScaledVector(Do.sub(t),h))}t.add(Ws)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere),zs.applyMatrix4(s),Pi.copy(e.ray).recast(e.near),!(zs.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(zs,nh)===null||Pi.origin.distanceToSquared(nh)>(e.far-e.near)**2))&&(th.copy(s).invert(),Pi.copy(e.ray).applyMatrix4(th),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a[g.materialIndex],S=Math.max(g.start,f.start),M=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=S,A=M;y<A;y+=3){const b=o.getX(y),R=o.getX(y+1),v=o.getX(y+2);r=Ys(this,m,e,n,c,h,u,b,R,v),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const S=o.getX(g),M=o.getX(g+1),y=o.getX(g+2);r=Ys(this,a,e,n,c,h,u,S,M,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a[g.materialIndex],S=Math.max(g.start,f.start),M=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=S,A=M;y<A;y+=3){const b=y,R=y+1,v=y+2;r=Ys(this,m,e,n,c,h,u,b,R,v),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const S=g,M=g+1,y=g+2;r=Ys(this,a,e,n,c,h,u,S,M,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function Av(i,e,t,n,r,s,a,o){let l;if(e.side===en?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===vi,o),l===null)return null;Xs.copy(o),Xs.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Xs);return c<t.near||c>t.far?null:{distance:c,point:Xs.clone(),object:i}}function Ys(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Vs),i.getVertexPosition(l,Hs),i.getVertexPosition(c,Gs);const h=Av(i,e,t,n,Vs,Hs,Gs,ih);if(h){const u=new D;hn.getBarycoord(ih,Vs,Hs,Gs,u),r&&(h.uv=hn.getInterpolatedAttribute(r,o,l,c,u,new $e)),s&&(h.uv1=hn.getInterpolatedAttribute(s,o,l,c,u,new $e)),a&&(h.normal=hn.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new D,materialIndex:0};hn.getNormal(Vs,Hs,Gs,d.normal),h.face=d,h.barycoord=u}return h}const kr=new et,rh=new et,sh=new et,Cv=new et,ah=new we,qs=new D,Uo=new bi,oh=new we,No=new Mc;class Rv extends ft{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Fu,this.bindMatrix=new we,this.bindMatrixInverse=new we,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new kn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qs),this.boundingBox.expandByPoint(qs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new bi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qs),this.boundingSphere.expandByPoint(qs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Uo.copy(this.boundingSphere),Uo.applyMatrix4(r),e.ray.intersectsSphere(Uo)!==!1&&(oh.copy(r).invert(),No.copy(e.ray).applyMatrix4(oh),!(this.boundingBox!==null&&No.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,No)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new et,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Fu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Px?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ee("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;rh.fromBufferAttribute(r.attributes.skinIndex,e),sh.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(kr.copy(t),t.set(0,0,0,0)):(kr.set(...t,1),t.set(0,0,0)),kr.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=sh.getComponent(s);if(a!==0){const o=rh.getComponent(s);ah.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Cv.copy(kr).applyMatrix4(ah),a)}}return t.isVector4&&(t.w=kr.w),t.applyMatrix4(this.bindMatrixInverse)}}class ls extends _t{constructor(){super(),this.isBone=!0,this.type="Bone"}}class yc extends Pt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Ht,h=Ht,u,d){super(null,a,o,l,c,h,r,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const lh=new we,Iv=new we;class Tc{constructor(e=[],t=[]){this.uuid=Ti(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ee("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new we)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new we;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Iv;lh.multiplyMatrices(o,t[s]),lh.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new Tc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new yc(t,e,e,pn,fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let a=t[s];a===void 0&&(Ee("Skeleton: No bone found with UUID:",s),a=new ls),this.bones.push(a),this.boneInverses.push(new we().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const a=t[r];e.bones.push(a.uuid);const o=n[r];e.boneInverses.push(o.toArray())}return e}}class ch extends bn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ar=new we,uh=new we,js=[],hh=new kn,Pv=new we,zr=new ft,Vr=new bi;class Lv extends ft{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ch(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Pv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new kn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ar),hh.copy(e.boundingBox).applyMatrix4(ar),this.boundingBox.union(hh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new bi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ar),Vr.copy(e.boundingSphere).applyMatrix4(ar),this.boundingSphere.union(Vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(zr.geometry=this.geometry,zr.material=this.material,zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vr.copy(this.boundingSphere),Vr.applyMatrix4(n),e.ray.intersectsSphere(Vr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ar),uh.multiplyMatrices(n,ar),zr.matrixWorld=uh,zr.raycast(e,js);for(let a=0,o=js.length;a<o;a++){const l=js[a];l.instanceId=s,l.object=this,t.push(l)}js.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ch(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new yc(new Float32Array(r*this.count),r,this.count,hc,fn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Fo=new D,Dv=new D,Uv=new Be;class Di{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Fo.subVectors(n,t).cross(Dv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Fo),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Uv.getNormalMatrix(e),r=this.coplanarPoint(Fo).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new bi,Nv=new $e(.5,.5),Ks=new D;class bc{constructor(e=new Di,t=new Di,n=new Di,r=new Di,s=new Di,a=new Di){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Un,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],p=s[8],_=s[9],g=s[10],m=s[11],S=s[12],M=s[13],y=s[14],A=s[15];if(r[0].setComponents(c-a,f-h,m-p,A-S).normalize(),r[1].setComponents(c+a,f+h,m+p,A+S).normalize(),r[2].setComponents(c+o,f+u,m+_,A+M).normalize(),r[3].setComponents(c-o,f-u,m-_,A-M).normalize(),n)r[4].setComponents(l,d,g,y).normalize(),r[5].setComponents(c-l,f-d,m-g,A-y).normalize();else if(r[4].setComponents(c-l,f-d,m-g,A-y).normalize(),t===Un)r[5].setComponents(c+l,f+d,m+g,A+y).normalize();else if(t===as)r[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){Li.center.set(0,0,0);const t=Nv.distanceTo(e.center);return Li.radius=.7071067811865476+t,Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Ks.x=r.normal.x>0?e.max.x:e.min.x,Ks.y=r.normal.y>0?e.max.y:e.min.y,Ks.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ks)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class wc extends wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const La=new D,Da=new D,dh=new we,Hr=new Mc,$s=new bi,Bo=new D,fh=new D;class wf extends _t{constructor(e=new jt,t=new wc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)La.fromBufferAttribute(t,r-1),Da.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=La.distanceTo(Da);e.setAttribute("lineDistance",new xt(n,1))}else Ee("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(r),$s.radius+=s,e.ray.intersectsSphere($s)===!1)return;dh.copy(r).invert(),Hr.copy(e.ray).applyMatrix4(dh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){const m=h.getX(_),S=h.getX(_+1),M=Zs(this,e,Hr,l,m,S,_);M&&t.push(M)}if(this.isLineLoop){const _=h.getX(p-1),g=h.getX(f),m=Zs(this,e,Hr,l,_,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){const m=Zs(this,e,Hr,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=Zs(this,e,Hr,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Zs(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(La.fromBufferAttribute(o,r),Da.fromBufferAttribute(o,s),t.distanceSqToSegment(La,Da,Bo,fh)>n)return;Bo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Bo);if(!(c<e.near||c>e.far))return{distance:c,point:fh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const ph=new D,mh=new D;class Ef extends wf{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)ph.fromBufferAttribute(t,r),mh.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+ph.distanceTo(mh);e.setAttribute("lineDistance",new xt(n,1))}else Ee("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Af extends Pt{constructor(e=[],t=Vi,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Cf extends Pt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ar extends Pt{constructor(e,t,n=On,r,s,a,o=Ht,l=Ht,c,h=ii,u=1){if(h!==ii&&h!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new vc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Fv extends Ar{constructor(e,t=On,n=Vi,r,s,a=Ht,o=Ht,l,c=ii){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Rf extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ri extends jt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,r,a,2),p("x","z","y",1,-1,e,n,-t,r,a,3),p("x","y","z",1,-1,e,t,n,r,s,4),p("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new xt(c,3)),this.setAttribute("normal",new xt(h,3)),this.setAttribute("uv",new xt(u,2));function p(_,g,m,S,M,y,A,b,R,v,E){const P=y/R,C=A/v,N=y/2,G=A/2,Y=b/2,U=R+1,V=v+1;let O=0,J=0;const ee=new D;for(let ce=0;ce<V;ce++){const Se=ce*C-G;for(let Me=0;Me<U;Me++){const Ge=Me*P-N;ee[_]=Ge*S,ee[g]=Se*M,ee[m]=Y,c.push(ee.x,ee.y,ee.z),ee[_]=0,ee[g]=0,ee[m]=b>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(Me/R),u.push(1-ce/v),O+=1}}for(let ce=0;ce<v;ce++)for(let Se=0;Se<R;Se++){const Me=d+Se+U*ce,Ge=d+Se+U*(ce+1),tt=d+(Se+1)+U*(ce+1),De=d+(Se+1)+U*ce;l.push(Me,Ge,De),l.push(Ge,tt,De),J+=6}o.addGroup(f,J,E),f+=J,d+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ri(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class zn extends jt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],d=[],f=[];let p=0;const _=[],g=n/2;let m=0;S(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new xt(u,3)),this.setAttribute("normal",new xt(d,3)),this.setAttribute("uv",new xt(f,2));function S(){const y=new D,A=new D;let b=0;const R=(t-e)/n;for(let v=0;v<=s;v++){const E=[],P=v/s,C=P*(t-e)+e;for(let N=0;N<=r;N++){const G=N/r,Y=G*l+o,U=Math.sin(Y),V=Math.cos(Y);A.x=C*U,A.y=-P*n+g,A.z=C*V,u.push(A.x,A.y,A.z),y.set(U,R,V).normalize(),d.push(y.x,y.y,y.z),f.push(G,1-P),E.push(p++)}_.push(E)}for(let v=0;v<r;v++)for(let E=0;E<s;E++){const P=_[E][v],C=_[E+1][v],N=_[E+1][v+1],G=_[E][v+1];(e>0||E!==0)&&(h.push(P,C,G),b+=3),(t>0||E!==s-1)&&(h.push(C,N,G),b+=3)}c.addGroup(m,b,0),m+=b}function M(y){const A=p,b=new $e,R=new D;let v=0;const E=y===!0?e:t,P=y===!0?1:-1;for(let N=1;N<=r;N++)u.push(0,g*P,0),d.push(0,P,0),f.push(.5,.5),p++;const C=p;for(let N=0;N<=r;N++){const Y=N/r*l+o,U=Math.cos(Y),V=Math.sin(Y);R.x=E*V,R.y=g*P,R.z=E*U,u.push(R.x,R.y,R.z),d.push(0,P,0),b.x=U*.5+.5,b.y=V*.5*P+.5,f.push(b.x,b.y),p++}for(let N=0;N<r;N++){const G=A+N,Y=C+N;y===!0?h.push(Y,Y+1,G):h.push(Y+1,Y,G),v+=3}c.addGroup(m,v,y===!0?1:2),m+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ec extends zn{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ec(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Js=new D,Qs=new D,Oo=new D,ea=new hn;class Bv extends jt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(vr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:_,b:g,c:m}=ea;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),ea.getNormal(Oo),u[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,u[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,u[2]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let S=0;S<3;S++){const M=(S+1)%3,y=u[S],A=u[M],b=ea[h[S]],R=ea[h[M]],v=`${y}_${A}`,E=`${A}_${y}`;E in d&&d[E]?(Oo.dot(d[E].normal)<=s&&(f.push(b.x,b.y,b.z),f.push(R.x,R.y,R.z)),d[E]=null):v in d||(d[v]={index0:c[S],index1:c[M],normal:Oo.clone()})}}for(const p in d)if(d[p]){const{index0:_,index1:g}=d[p];Js.fromBufferAttribute(o,_),Qs.fromBufferAttribute(o,g),f.push(Js.x,Js.y,Js.z),f.push(Qs.x,Qs.y,Qs.z)}this.setAttribute("position",new xt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Ov{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ee("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let r=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);const h=n[r],d=n[r+1]-h,f=(a-h)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new $e:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new D,r=[],s=[],a=[],o=new D,l=new we;for(let f=0;f<=e;f++){const p=f/e;r[f]=this.getTangentAt(p,new D)}s[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(qe(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(qe(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],f*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function kv(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=If(i,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=Wv(i,e,s,t)),i.length>80*t){o=i[0],l=i[1];let h=o,u=l;for(let d=t;d<r;d+=t){const f=i[d],p=i[d+1];f<o&&(o=f),p<l&&(l=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return cs(s,a,t,o,l,c,0),a}function If(i,e,t,n,r){let s;if(r===tS(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=gh(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=gh(a/n|0,i[a],i[a+1],s);return s&&Cr(s,s.next)&&(hs(s),s=s.next),s}function Gi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Cr(t,t.next)||St(t.prev,t,t.next)===0)){if(hs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function cs(i,e,t,n,r,s,a){if(!i)return;!a&&s&&Kv(i,n,r,s);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(s?Vv(i,n,r,s):zv(i)){e.push(l.i,i.i,c.i),hs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Hv(Gi(i),e),cs(i,e,t,n,r,s,2)):a===2&&Gv(i,e,t,n,r,s):cs(Gi(i),e,t,n,r,s,1);break}}}function zv(i){const e=i.prev,t=i,n=i.next;if(St(e,t,n)>=0)return!1;const r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(r,s,a),u=Math.min(o,l,c),d=Math.max(r,s,a),f=Math.max(o,l,c);let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Kr(r,o,s,l,a,c,p.x,p.y)&&St(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Vv(i,e,t,n){const r=i.prev,s=i,a=i.next;if(St(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,h=r.y,u=s.y,d=a.y,f=Math.min(o,l,c),p=Math.min(h,u,d),_=Math.max(o,l,c),g=Math.max(h,u,d),m=jl(f,p,e,t,n),S=jl(_,g,e,t,n);let M=i.prevZ,y=i.nextZ;for(;M&&M.z>=m&&y&&y.z<=S;){if(M.x>=f&&M.x<=_&&M.y>=p&&M.y<=g&&M!==r&&M!==a&&Kr(o,h,l,u,c,d,M.x,M.y)&&St(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==r&&y!==a&&Kr(o,h,l,u,c,d,y.x,y.y)&&St(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=m;){if(M.x>=f&&M.x<=_&&M.y>=p&&M.y<=g&&M!==r&&M!==a&&Kr(o,h,l,u,c,d,M.x,M.y)&&St(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=S;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==r&&y!==a&&Kr(o,h,l,u,c,d,y.x,y.y)&&St(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Hv(i,e){let t=i;do{const n=t.prev,r=t.next.next;!Cr(n,r)&&Lf(n,t,t.next,r)&&us(n,r)&&us(r,n)&&(e.push(n.i,t.i,r.i),hs(t),hs(t.next),t=i=r),t=t.next}while(t!==i);return Gi(t)}function Gv(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Jv(a,o)){let l=Df(a,o);a=Gi(a,a.next),l=Gi(l,l.next),cs(a,e,t,n,r,s,0),cs(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function Wv(i,e,t,n){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=If(i,o,l,n,!1);c===c.next&&(c.steiner=!0),r.push(Zv(c))}r.sort(Xv);for(let s=0;s<r.length;s++)t=Yv(r[s],t);return t}function Xv(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function Yv(i,e){const t=qv(i,e);if(!t)return e;const n=Df(t,i);return Gi(n,n.next),Gi(t,t.next)}function qv(i,e){let t=e;const n=i.x,r=i.y;let s=-1/0,a;if(Cr(i,t))return t;do{if(Cr(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const u=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>s&&(s=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Pf(r<c?n:s,r,l,c,r<c?s:n,r,t.x,t.y)){const u=Math.abs(r-t.y)/(n-t.x);us(t,i)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&jv(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function jv(i,e){return St(i.prev,i,e.prev)<0&&St(e.next,i,i.next)<0}function Kv(i,e,t,n){let r=i;do r.z===0&&(r.z=jl(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,$v(r)}function $v(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(r=n,n=n.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=a}s.nextZ=null,t*=2}while(e>1);return i}function jl(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Zv(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Pf(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Kr(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Pf(i,e,t,n,r,s,a,o)}function Jv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Qv(i,e)&&(us(i,e)&&us(e,i)&&eS(i,e)&&(St(i.prev,i,e.prev)||St(i,e.prev,e))||Cr(i,e)&&St(i.prev,i,i.next)>0&&St(e.prev,e,e.next)>0)}function St(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Cr(i,e){return i.x===e.x&&i.y===e.y}function Lf(i,e,t,n){const r=na(St(i,e,t)),s=na(St(i,e,n)),a=na(St(t,n,i)),o=na(St(t,n,e));return!!(r!==s&&a!==o||r===0&&ta(i,t,e)||s===0&&ta(i,n,e)||a===0&&ta(t,i,n)||o===0&&ta(t,e,n))}function ta(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function na(i){return i>0?1:i<0?-1:0}function Qv(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Lf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function us(i,e){return St(i.prev,i,i.next)<0?St(i,e,i.next)>=0&&St(i,i.prev,e)>=0:St(i,e,i.prev)<0||St(i,i.next,e)<0}function eS(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Df(i,e){const t=Kl(i.i,i.x,i.y),n=Kl(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function gh(i,e,t,n){const r=Kl(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function hs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Kl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function tS(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}class nS{static triangulate(e,t,n=2){return kv(e,t,n)}}class Ac{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Ac.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];_h(e),xh(n,e);let a=e.length;t.forEach(_h);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,xh(n,t[l]);const o=nS.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function _h(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function xh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Ai extends jt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,u=e/o,d=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const S=m*d-a;for(let M=0;M<c;M++){const y=M*u-s;p.push(y,-S,0),_.push(0,0,1),g.push(M/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){const M=S+c*m,y=S+c*(m+1),A=S+1+c*(m+1),b=S+1+c*m;f.push(M,y,b),f.push(y,A,b)}this.setIndex(f),this.setAttribute("position",new xt(p,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ai(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ir extends jt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new D,d=new D,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const S=[],M=m/n;let y=0;m===0&&a===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let A=0;A<=t;A++){const b=A/t;u.x=-e*Math.cos(r+b*s)*Math.sin(a+M*o),u.y=e*Math.cos(a+M*o),u.z=e*Math.sin(r+b*s)*Math.sin(a+M*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(b+y,1-M),S.push(c++)}h.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){const M=h[m][S+1],y=h[m][S],A=h[m+1][S],b=h[m+1][S+1];(m!==0||a>0)&&f.push(M,y,b),(m!==n-1||l<Math.PI)&&f.push(y,A,b)}this.setIndex(f),this.setAttribute("position",new xt(p,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ir(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Rr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(vh(r))r.isRenderTargetTexture?(Ee("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(vh(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Zt(i){const e={};for(let t=0;t<i.length;t++){const n=Rr(i[t]);for(const r in n)e[r]=n[r]}return e}function vh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function iS(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Uf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Oe.workingColorSpace}const rS={clone:Rr,merge:Zt};var sS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,aS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sS,this.fragmentShader=aS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Rr(e.uniforms),this.uniformsGroups=iS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class oS extends Vn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ss extends wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ss,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ia extends wi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ue(16777215),this.specular=new Ue(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ss,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=Wa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class lS extends wi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ss,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=Wa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cS extends wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class uS extends wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function zi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Nf(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function $l(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)r[a++]=i[o+l]}return r}function Cc(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=i[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=i[r++];while(s!==void 0)}function hS(i,e,t,n,r=30){const s=i.clone();s.name=e;const a=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*r;if(!(p<t||p>=n)){u.push(c.times[f]);for(let _=0;_<h;++_)d.push(c.values[f*h+_])}}u.length!==0&&(c.times=zi(u,c.times.constructor),c.values=zi(d,c.values.constructor),a.push(c))}s.tracks=a;let o=1/0;for(let l=0;l<s.tracks.length;++l)o>s.tracks[l].times[0]&&(o=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*o);return s.resetDuration(),s}function dS(i,e=0,t=i,n=30){n<=0&&(n=30);const r=t.tracks.length,s=e/n;for(let a=0;a<r;++a){const o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;const c=i.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const p=o.times.length-1;let _;if(s<=o.times[0]){const m=h,S=u-h;_=o.values.slice(m,S)}else if(s>=o.times[p]){const m=p*u+h,S=m+u-h;_=o.values.slice(m,S)}else{const m=o.createInterpolant(),S=h,M=u-h;m.evaluate(s),_=m.resultBuffer.slice(S,M)}l==="quaternion"&&new Rt().fromArray(_).normalize().conjugate().toArray(_);const g=c.times.length;for(let m=0;m<g;++m){const S=m*f+d;if(l==="quaternion")Rt.multiplyQuaternionsFlat(c.values,S,_,0,c.values,S);else{const M=f-d*2;for(let y=0;y<M;++y)c.values[S+y]-=_[y]}}}return i.blendMode=xf,i}class fS{static convertArray(e,t){return zi(e,t)}static isTypedArray(e){return vf(e)}static getKeyframeOrder(e){return Nf(e)}static sortedArray(e,t,n){return $l(e,t,n)}static flattenJSON(e,t,n,r){Cc(e,t,n,r)}static subclip(e,t,n,r,s=30){return hS(e,t,n,r,s)}static makeClipAdditive(e,t=0,n=e,r=30){return dS(e,t,n,r)}}class Ms{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class pS extends Ms{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:pr,endingEnd:pr}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case mr:s=e,o=2*t-n;break;case Ra:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case mr:a=e,l=2*n-t;break;case Ra:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),_=p*p,g=_*p,m=-d*g+2*d*_-d*p,S=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*p+1,M=(-1-f)*g+(1.5+f)*_+.5*p,y=f*g-f*_;for(let A=0;A!==o;++A)s[A]=m*a[h+A]+S*a[c+A]+M*a[l+A]+y*a[u+A];return s}}class Ff extends Ms{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}}class mS extends Ms{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class gS extends Ms{interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.settings||this.DefaultSettings_,u=h.inTangents,d=h.outTangents;if(!u||!d){const _=(n-t)/(r-t),g=1-_;for(let m=0;m!==o;++m)s[m]=a[c+m]*g+a[l+m]*_;return s}const f=o*2,p=e-1;for(let _=0;_!==o;++_){const g=a[c+_],m=a[l+_],S=p*f+_*2,M=d[S],y=d[S+1],A=e*f+_*2,b=u[A],R=u[A+1];let v=(n-t)/(r-t),E,P,C,N,G;for(let Y=0;Y<8;Y++){E=v*v,P=E*v,C=1-v,N=C*C,G=N*C;const V=G*t+3*N*v*M+3*C*E*b+P*r-n;if(Math.abs(V)<1e-10)break;const O=3*N*(M-t)+6*C*v*(b-M)+3*E*(r-b);if(Math.abs(O)<1e-10)break;v=v-V/O,v=Math.max(0,Math.min(1,v))}s[_]=G*g+3*N*v*y+3*C*E*R+P*m}return s}}class wn{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zi(t,this.TimeBufferType),this.values=zi(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:zi(e.times,Array),values:zi(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new mS(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ff(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new pS(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new gS(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Ca:t=this.InterpolantFactoryMethodDiscrete;break;case Yl:t=this.InterpolantFactoryMethodLinear;break;case ho:t=this.InterpolantFactoryMethodSmooth;break;case Bu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ee("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ca;case this.InterpolantFactoryMethodLinear:return Yl;case this.InterpolantFactoryMethodSmooth:return ho;case this.InterpolantFactoryMethodBezier:return Bu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Le("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(Le("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Le("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Le("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&vf(r))for(let o=0,l=r.length;o!==l;++o){const c=r[o];if(isNaN(c)){Le("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ho,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(r)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const _=t[u+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}wn.prototype.ValueTypeName="";wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=Yl;class Pr extends wn{constructor(e,t,n){super(e,t,n)}}Pr.prototype.ValueTypeName="bool";Pr.prototype.ValueBufferType=Array;Pr.prototype.DefaultInterpolation=Ca;Pr.prototype.InterpolantFactoryMethodLinear=void 0;Pr.prototype.InterpolantFactoryMethodSmooth=void 0;class Bf extends wn{constructor(e,t,n,r){super(e,t,n,r)}}Bf.prototype.ValueTypeName="color";class ds extends wn{constructor(e,t,n,r){super(e,t,n,r)}}ds.prototype.ValueTypeName="number";class _S extends Ms{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Rt.slerpFlat(s,0,a,c-o,a,c,l);return s}}class ys extends wn{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new _S(this.times,this.values,this.getValueSize(),e)}}ys.prototype.ValueTypeName="quaternion";ys.prototype.InterpolantFactoryMethodSmooth=void 0;class Lr extends wn{constructor(e,t,n){super(e,t,n)}}Lr.prototype.ValueTypeName="string";Lr.prototype.ValueBufferType=Array;Lr.prototype.DefaultInterpolation=Ca;Lr.prototype.InterpolantFactoryMethodLinear=void 0;Lr.prototype.InterpolantFactoryMethodSmooth=void 0;class fs extends wn{constructor(e,t,n,r){super(e,t,n,r)}}fs.prototype.ValueTypeName="vector";class Zl{constructor(e="",t=-1,n=[],r=mc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Ti(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(vS(n[a]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(wn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=Nf(l);l=$l(l,1,h),c=$l(c,1,h),!r&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new ds(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=r[u];d||(r[u]=d=[]),d.push(c)}}const a=[];for(const o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,n));return a}static parseAnimation(e,t){if(Ee("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Le("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,p,_){if(f.length!==0){const g=[],m=[];Cc(f,g,m,p),g.length!==0&&_.push(new u(d,g,m))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let S=0;S!==d[p].morphTargets.length;++S){const M=d[p];g.push(M.time),m.push(M.morphTarget===_?1:0)}r.push(new ds(".morphTargetInfluence["+_+"]",g,m))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(fs,f+".position",d,"pos",r),n(ys,f+".quaternion",d,"rot",r),n(fs,f+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function xS(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ds;case"vector":case"vector2":case"vector3":case"vector4":return fs;case"color":return Bf;case"quaternion":return ys;case"bool":case"boolean":return Pr;case"string":return Lr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function vS(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=xS(i.type);if(i.times===void 0){const t=[],n=[];Cc(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Jr={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Sh(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Sh(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Sh(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class SS{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const MS=new SS;class Wi{constructor(e){this.manager=e!==void 0?e:MS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Wi.DEFAULT_MATERIAL_NAME="__DEFAULT";const jn={};class yS extends Error{constructor(e,t){super(e),this.response=t}}class TS extends Wi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Jr.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(jn[e]!==void 0){jn[e].push({onLoad:t,onProgress:n,onError:r});return}jn[e]=[],jn[e].push({onLoad:t,onProgress:n,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ee("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=jn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){S();function S(){u.read().then(({done:M,value:y})=>{if(M)m.close();else{_+=y.byteLength;const A=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let b=0,R=h.length;b<R;b++){const v=h[b];v.onProgress&&v.onProgress(A)}m.enqueue(y),S()}},M=>{m.error(M)})}}});return new Response(g)}else throw new yS(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Jr.add(`file:${e}`,c);const h=jn[e];delete jn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=jn[e];if(h===void 0)throw this.manager.itemError(e),c;delete jn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const or=new WeakMap;class bS extends Wi{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Jr.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=or.get(a);u===void 0&&(u=[],or.set(a,u)),u.push({onLoad:t,onError:r})}return a}const o=os("img");function l(){h(),t&&t(this);const u=or.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}or.delete(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),Jr.remove(`image:${e}`);const d=or.get(this)||[];for(let f=0;f<d.length;f++){const p=d[f];p.onError&&p.onError(u)}or.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Jr.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class Rc extends Wi{constructor(e){super(e)}load(e,t,n,r){const s=new Pt,a=new bS(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class Ya extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const ko=new we,Mh=new D,yh=new D;class Ic{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new we,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bc,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Mh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mh),yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yh),t.updateMatrixWorld(),ko.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ko,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===as||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ko)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ra=new D,sa=new Rt,Rn=new D;class Of extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ra,sa,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ra,sa,Rn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ra,sa,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ra,sa,Rn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const fi=new D,Th=new $e,bh=new $e;class Qt extends Of{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Er*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Er*2*Math.atan(Math.tan(vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fi.x,fi.y).multiplyScalar(-e/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fi.x,fi.y).multiplyScalar(-e/fi.z)}getViewSize(e,t){return this.getViewBounds(e,Th,bh),t.subVectors(bh,Th)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class wS extends Ic{constructor(){super(new Qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Er*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ES extends Ya{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new wS}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class AS extends Ic{constructor(){super(new Qt(90,1,.5,500)),this.isPointLightShadow=!0}}class wh extends Ya{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new AS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class qa extends Of{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class CS extends Ic{constructor(){super(new qa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class kf extends Ya{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new CS}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class zf extends Ya{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class RS{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const lr=-90,cr=1;class IS extends _t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Qt(lr,cr,e,t);r.layers=this.layers,this.add(r);const s=new Qt(lr,cr,e,t);s.layers=this.layers,this.add(s);const a=new Qt(lr,cr,e,t);a.layers=this.layers,this.add(a);const o=new Qt(lr,cr,e,t);o.layers=this.layers,this.add(o);const l=new Qt(lr,cr,e,t);l.layers=this.layers,this.add(l);const c=new Qt(lr,cr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Un)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===as)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class PS extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class LS{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,s,a;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:r=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,r=this.valueSize,s=e*r+r;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==r;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,r)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,r=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,r,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,r);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let s=n,a=r;s!==a;++s)t[s]=t[r+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,s){if(r>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,r){Rt.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,s){const a=this._workIndex*s;Rt.multiplyQuaternionsFlat(e,a,e,t,e,n),Rt.slerpFlat(e,t,e,t,e,a,r)}_lerp(e,t,n,r,s){const a=1-r;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*r}}_lerpAdditive(e,t,n,r,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*r}}}const Pc="\\[\\]\\.:\\/",DS=new RegExp("["+Pc+"]","g"),Lc="[^"+Pc+"]",US="[^"+Pc.replace("\\.","")+"]",NS=/((?:WC+[\/:])*)/.source.replace("WC",Lc),FS=/(WCOD+)?/.source.replace("WCOD",US),BS=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lc),OS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lc),kS=new RegExp("^"+NS+FS+BS+OS+"$"),zS=["material","materials","bones","map"];class VS{constructor(e,t,n){const r=n||Je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Je{constructor(e,t,n){this.path=t,this.parsedPath=n||Je.parseTrackName(t),this.node=Je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Je.Composite(e,t,n):new Je(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(DS,"")}static parseTrackName(e){const t=kS.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);zS.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=Je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ee("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Le("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Le("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Le("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Le("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Le("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[r];if(a===void 0){const c=t.nodeName;Le("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Je.Composite=VS;Je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Je.prototype.GetterByBindingType=[Je.prototype._getValue_direct,Je.prototype._getValue_array,Je.prototype._getValue_arrayElement,Je.prototype._getValue_toArray];Je.prototype.SetterByBindingTypeAndVersioning=[[Je.prototype._setValue_direct,Je.prototype._setValue_direct_setNeedsUpdate,Je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_array,Je.prototype._setValue_array_setNeedsUpdate,Je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_arrayElement,Je.prototype._setValue_arrayElement_setNeedsUpdate,Je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_fromArray,Je.prototype._setValue_fromArray_setNeedsUpdate,Je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class HS{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:pr,endingEnd:pr};for(let c=0;c!==a;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings&&Object.assign(l,h.settings),h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=_f,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const r=this._clip.duration,s=e._clip.duration,a=s/r,o=r/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const r=this._mixer,s=r.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=r._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case xf:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case mc:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(r,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let r=this.time+e,s=this._loopCount;const a=n===Ux;if(e===0)return s===-1?r:a&&(s&1)===1?t-r:r;if(n===Dx){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),r>=t||r<0){const o=Math.floor(r/t);r-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=r;if(a&&(s&1)===1)return t-r}return r}_setEndings(e,t,n){const r=this._interpolantSettings;n?(r.endingStart=mr,r.endingEnd=mr):(e?r.endingStart=this.zeroSlopeAtStart?mr:pr:r.endingStart=Ra,t?r.endingEnd=this.zeroSlopeAtEnd?mr:pr:r.endingEnd=Ra)}_scheduleFading(e,t,n){const r=this._mixer,s=r.time;let a=this._weightInterpolant;a===null&&(a=r._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const GS=new Float32Array(1);class WS extends yi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,r=e._clip.tracks,s=r.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=r[u],f=d.name;let p=h[f];if(p!==void 0)++p.referenceCount,a[u]=p;else{if(p=a[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;p=new LS(Je.create(n,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[u]=p}o[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,n)}const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const r=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=r.length,r.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const r=this._bindingsByRootAndName,s=this._bindings;let a=r[t];a===void 0&&(a={},r[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,r=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[r],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[r]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Ff(new Float32Array(2),new Float32Array(2),1,GS),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const r=t||this._root,s=r.uuid;let a=typeof e=="string"?Zl.findByName(r,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=mc),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new HS(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){const n=t||this._root,r=n.uuid,s=typeof e=="string"?Zl.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[r]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,r=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(r,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,r=this._actionsByClip,s=r[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete r[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Hc=class Hc{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};Hc.prototype.isMatrix2=!0;let Eh=Hc;function Ah(i,e,t,n){const r=XS(n);switch(t){case mf:return i*e;case hc:return i*e/r.components*r.byteLength;case dc:return i*e/r.components*r.byteLength;case Hi:return i*e*2/r.components*r.byteLength;case fc:return i*e*2/r.components*r.byteLength;case gf:return i*e*3/r.components*r.byteLength;case pn:return i*e*4/r.components*r.byteLength;case pc:return i*e*4/r.components*r.byteLength;case pa:case ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ga:case _a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _l:case vl:return Math.max(i,16)*Math.max(e,8)/4;case gl:case xl:return Math.max(i,8)*Math.max(e,8)/2;case Sl:case Ml:case Tl:case bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case yl:case Ea:case wl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Al:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Cl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Il:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ul:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Fl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Bl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ol:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case kl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case zl:case Vl:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Gl:case Wl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Aa:case Xl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function XS(i){switch(i){case on:case hf:return{byteLength:1,components:1};case is:case df:case ni:return{byteLength:2,components:1};case cc:case uc:return{byteLength:2,components:4};case On:case lc:case fn:return{byteLength:4,components:1};case ff:case pf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oc}}));typeof window<"u"&&(window.__THREE__?Ee("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Vf(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function YS(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],_=u[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const _=u[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var qS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jS=`#ifdef USE_ALPHAHASH
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
#endif`,KS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$S=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ZS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,JS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,QS=`#ifdef USE_AOMAP
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
#endif`,eM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tM=`#ifdef USE_BATCHING
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
#endif`,nM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,iM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,aM=`#ifdef USE_IRIDESCENCE
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
#endif`,oM=`#ifdef USE_BUMPMAP
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
#endif`,lM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,cM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,fM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,pM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,mM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,gM=`#define PI 3.141592653589793
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
} // validated`,_M=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xM=`vec3 transformedNormal = objectNormal;
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
#endif`,vM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,SM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,MM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,TM="gl_FragColor = linearToOutputTexel( gl_FragColor );",bM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wM=`#ifdef USE_ENVMAP
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
#endif`,EM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,AM=`#ifdef USE_ENVMAP
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
#endif`,CM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,RM=`#ifdef USE_ENVMAP
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
#endif`,IM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,PM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,LM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,DM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,UM=`#ifdef USE_GRADIENTMAP
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
}`,NM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,FM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,BM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,OM=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,kM=`#ifdef USE_ENVMAP
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
#endif`,zM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,VM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,HM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,GM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,WM=`PhysicalMaterial material;
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
#endif`,XM=`uniform sampler2D dfgLUT;
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
}`,YM=`
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
#endif`,qM=`#if defined( RE_IndirectDiffuse )
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
#endif`,jM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,KM=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,$M=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ZM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,JM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,QM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ey=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ty=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ny=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,iy=`#if defined( USE_POINTS_UV )
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
#endif`,ry=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ay=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,oy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ly=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cy=`#ifdef USE_MORPHTARGETS
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
#endif`,uy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,dy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,fy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,py=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,my=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gy=`#ifdef USE_NORMALMAP
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
#endif`,_y=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,My=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ty=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,by=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ey=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ay=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ry=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Iy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Py=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ly=`float getShadowMask() {
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
}`,Dy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uy=`#ifdef USE_SKINNING
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
#endif`,Ny=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fy=`#ifdef USE_SKINNING
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
#endif`,By=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Oy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ky=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vy=`#ifdef USE_TRANSMISSION
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
#endif`,Hy=`#ifdef USE_TRANSMISSION
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
#endif`,Gy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jy=`uniform sampler2D t2D;
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
}`,Ky=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$y=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qy=`#include <common>
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
}`,eT=`#if DEPTH_PACKING == 3200
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
}`,tT=`#define DISTANCE
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
}`,nT=`#define DISTANCE
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
}`,iT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sT=`uniform float scale;
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
}`,aT=`uniform vec3 diffuse;
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
}`,oT=`#include <common>
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
}`,lT=`uniform vec3 diffuse;
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
}`,cT=`#define LAMBERT
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
}`,uT=`#define LAMBERT
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
}`,hT=`#define MATCAP
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
}`,dT=`#define MATCAP
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
}`,fT=`#define NORMAL
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
}`,pT=`#define NORMAL
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
}`,mT=`#define PHONG
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
}`,gT=`#define PHONG
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
}`,_T=`#define STANDARD
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
}`,xT=`#define STANDARD
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
}`,vT=`#define TOON
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
}`,ST=`#define TOON
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
}`,MT=`uniform float size;
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
}`,yT=`uniform vec3 diffuse;
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
}`,TT=`#include <common>
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
}`,bT=`uniform vec3 color;
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
}`,wT=`uniform float rotation;
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
}`,ET=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:qS,alphahash_pars_fragment:jS,alphamap_fragment:KS,alphamap_pars_fragment:$S,alphatest_fragment:ZS,alphatest_pars_fragment:JS,aomap_fragment:QS,aomap_pars_fragment:eM,batching_pars_vertex:tM,batching_vertex:nM,begin_vertex:iM,beginnormal_vertex:rM,bsdfs:sM,iridescence_fragment:aM,bumpmap_pars_fragment:oM,clipping_planes_fragment:lM,clipping_planes_pars_fragment:cM,clipping_planes_pars_vertex:uM,clipping_planes_vertex:hM,color_fragment:dM,color_pars_fragment:fM,color_pars_vertex:pM,color_vertex:mM,common:gM,cube_uv_reflection_fragment:_M,defaultnormal_vertex:xM,displacementmap_pars_vertex:vM,displacementmap_vertex:SM,emissivemap_fragment:MM,emissivemap_pars_fragment:yM,colorspace_fragment:TM,colorspace_pars_fragment:bM,envmap_fragment:wM,envmap_common_pars_fragment:EM,envmap_pars_fragment:AM,envmap_pars_vertex:CM,envmap_physical_pars_fragment:kM,envmap_vertex:RM,fog_vertex:IM,fog_pars_vertex:PM,fog_fragment:LM,fog_pars_fragment:DM,gradientmap_pars_fragment:UM,lightmap_pars_fragment:NM,lights_lambert_fragment:FM,lights_lambert_pars_fragment:BM,lights_pars_begin:OM,lights_toon_fragment:zM,lights_toon_pars_fragment:VM,lights_phong_fragment:HM,lights_phong_pars_fragment:GM,lights_physical_fragment:WM,lights_physical_pars_fragment:XM,lights_fragment_begin:YM,lights_fragment_maps:qM,lights_fragment_end:jM,lightprobes_pars_fragment:KM,logdepthbuf_fragment:$M,logdepthbuf_pars_fragment:ZM,logdepthbuf_pars_vertex:JM,logdepthbuf_vertex:QM,map_fragment:ey,map_pars_fragment:ty,map_particle_fragment:ny,map_particle_pars_fragment:iy,metalnessmap_fragment:ry,metalnessmap_pars_fragment:sy,morphinstance_vertex:ay,morphcolor_vertex:oy,morphnormal_vertex:ly,morphtarget_pars_vertex:cy,morphtarget_vertex:uy,normal_fragment_begin:hy,normal_fragment_maps:dy,normal_pars_fragment:fy,normal_pars_vertex:py,normal_vertex:my,normalmap_pars_fragment:gy,clearcoat_normal_fragment_begin:_y,clearcoat_normal_fragment_maps:xy,clearcoat_pars_fragment:vy,iridescence_pars_fragment:Sy,opaque_fragment:My,packing:yy,premultiplied_alpha_fragment:Ty,project_vertex:by,dithering_fragment:wy,dithering_pars_fragment:Ey,roughnessmap_fragment:Ay,roughnessmap_pars_fragment:Cy,shadowmap_pars_fragment:Ry,shadowmap_pars_vertex:Iy,shadowmap_vertex:Py,shadowmask_pars_fragment:Ly,skinbase_vertex:Dy,skinning_pars_vertex:Uy,skinning_vertex:Ny,skinnormal_vertex:Fy,specularmap_fragment:By,specularmap_pars_fragment:Oy,tonemapping_fragment:ky,tonemapping_pars_fragment:zy,transmission_fragment:Vy,transmission_pars_fragment:Hy,uv_pars_fragment:Gy,uv_pars_vertex:Wy,uv_vertex:Xy,worldpos_vertex:Yy,background_vert:qy,background_frag:jy,backgroundCube_vert:Ky,backgroundCube_frag:$y,cube_vert:Zy,cube_frag:Jy,depth_vert:Qy,depth_frag:eT,distance_vert:tT,distance_frag:nT,equirect_vert:iT,equirect_frag:rT,linedashed_vert:sT,linedashed_frag:aT,meshbasic_vert:oT,meshbasic_frag:lT,meshlambert_vert:cT,meshlambert_frag:uT,meshmatcap_vert:hT,meshmatcap_frag:dT,meshnormal_vert:fT,meshnormal_frag:pT,meshphong_vert:mT,meshphong_frag:gT,meshphysical_vert:_T,meshphysical_frag:xT,meshtoon_vert:vT,meshtoon_frag:ST,points_vert:MT,points_frag:yT,shadow_vert:TT,shadow_frag:bT,sprite_vert:wT,sprite_frag:ET},de={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Ln={basic:{uniforms:Zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ue(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Zt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Zt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ue(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Zt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Zt([de.points,de.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Zt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Zt([de.common,de.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Zt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Zt([de.sprite,de.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:Zt([de.common,de.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:Zt([de.lights,de.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Ln.physical={uniforms:Zt([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const aa={r:0,b:0,g:0},AT=new we,Hf=new Be;Hf.set(-1,0,0,0,1,0,0,0,1);function CT(i,e,t,n,r,s){const a=new Ue(0);let o=r===!0?0:1,l,c,h=null,u=0,d=null;function f(S){let M=S.isScene===!0?S.background:null;if(M&&M.isTexture){const y=S.backgroundBlurriness>0;M=e.get(M,y)}return M}function p(S){let M=!1;const y=f(S);y===null?g(a,o):y&&y.isColor&&(g(y,1),M=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(S,M){const y=f(M);y&&(y.isCubeTexture||y.mapping===Xa)?(c===void 0&&(c=new ft(new ri(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Rr(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(AT.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Hf),c.material.toneMapped=Oe.getTransfer(y.colorSpace)!==it,(h!==y||u!==y.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,u=y.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ft(new Ai(2,2),new Vn({name:"BackgroundMaterial",uniforms:Rr(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Oe.getTransfer(y.colorSpace)!==it,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,d=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function g(S,M){S.getRGB(aa,Uf(i)),t.buffers.color.setClear(aa.r,aa.g,aa.b,M,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,M=1){a.set(S),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,g(a,o)},render:p,addToRenderList:_,dispose:m}}function RT(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(C,N,G,Y,U){let V=!1;const O=u(C,Y,G,N);s!==O&&(s=O,c(s.object)),V=f(C,Y,G,U),V&&p(C,Y,G,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,y(C,N,G,Y),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return i.createVertexArray()}function c(C){return i.bindVertexArray(C)}function h(C){return i.deleteVertexArray(C)}function u(C,N,G,Y){const U=Y.wireframe===!0;let V=n[N.id];V===void 0&&(V={},n[N.id]=V);const O=C.isInstancedMesh===!0?C.id:0;let J=V[O];J===void 0&&(J={},V[O]=J);let ee=J[G.id];ee===void 0&&(ee={},J[G.id]=ee);let ce=ee[U];return ce===void 0&&(ce=d(l()),ee[U]=ce),ce}function d(C){const N=[],G=[],Y=[];for(let U=0;U<t;U++)N[U]=0,G[U]=0,Y[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:Y,object:C,attributes:{},index:null}}function f(C,N,G,Y){const U=s.attributes,V=N.attributes;let O=0;const J=G.getAttributes();for(const ee in J)if(J[ee].location>=0){const Se=U[ee];let Me=V[ee];if(Me===void 0&&(ee==="instanceMatrix"&&C.instanceMatrix&&(Me=C.instanceMatrix),ee==="instanceColor"&&C.instanceColor&&(Me=C.instanceColor)),Se===void 0||Se.attribute!==Me||Me&&Se.data!==Me.data)return!0;O++}return s.attributesNum!==O||s.index!==Y}function p(C,N,G,Y){const U={},V=N.attributes;let O=0;const J=G.getAttributes();for(const ee in J)if(J[ee].location>=0){let Se=V[ee];Se===void 0&&(ee==="instanceMatrix"&&C.instanceMatrix&&(Se=C.instanceMatrix),ee==="instanceColor"&&C.instanceColor&&(Se=C.instanceColor));const Me={};Me.attribute=Se,Se&&Se.data&&(Me.data=Se.data),U[ee]=Me,O++}s.attributes=U,s.attributesNum=O,s.index=Y}function _(){const C=s.newAttributes;for(let N=0,G=C.length;N<G;N++)C[N]=0}function g(C){m(C,0)}function m(C,N){const G=s.newAttributes,Y=s.enabledAttributes,U=s.attributeDivisors;G[C]=1,Y[C]===0&&(i.enableVertexAttribArray(C),Y[C]=1),U[C]!==N&&(i.vertexAttribDivisor(C,N),U[C]=N)}function S(){const C=s.newAttributes,N=s.enabledAttributes;for(let G=0,Y=N.length;G<Y;G++)N[G]!==C[G]&&(i.disableVertexAttribArray(G),N[G]=0)}function M(C,N,G,Y,U,V,O){O===!0?i.vertexAttribIPointer(C,N,G,U,V):i.vertexAttribPointer(C,N,G,Y,U,V)}function y(C,N,G,Y){_();const U=Y.attributes,V=G.getAttributes(),O=N.defaultAttributeValues;for(const J in V){const ee=V[J];if(ee.location>=0){let ce=U[J];if(ce===void 0&&(J==="instanceMatrix"&&C.instanceMatrix&&(ce=C.instanceMatrix),J==="instanceColor"&&C.instanceColor&&(ce=C.instanceColor)),ce!==void 0){const Se=ce.normalized,Me=ce.itemSize,Ge=e.get(ce);if(Ge===void 0)continue;const tt=Ge.buffer,De=Ge.type,K=Ge.bytesPerElement,ue=De===i.INT||De===i.UNSIGNED_INT||ce.gpuType===lc;if(ce.isInterleavedBufferAttribute){const te=ce.data,Ie=te.stride,Ne=ce.offset;if(te.isInstancedInterleavedBuffer){for(let Pe=0;Pe<ee.locationSize;Pe++)m(ee.location+Pe,te.meshPerAttribute);C.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Pe=0;Pe<ee.locationSize;Pe++)g(ee.location+Pe);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let Pe=0;Pe<ee.locationSize;Pe++)M(ee.location+Pe,Me/ee.locationSize,De,Se,Ie*K,(Ne+Me/ee.locationSize*Pe)*K,ue)}else{if(ce.isInstancedBufferAttribute){for(let te=0;te<ee.locationSize;te++)m(ee.location+te,ce.meshPerAttribute);C.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let te=0;te<ee.locationSize;te++)g(ee.location+te);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let te=0;te<ee.locationSize;te++)M(ee.location+te,Me/ee.locationSize,De,Se,Me*K,Me/ee.locationSize*te*K,ue)}}else if(O!==void 0){const Se=O[J];if(Se!==void 0)switch(Se.length){case 2:i.vertexAttrib2fv(ee.location,Se);break;case 3:i.vertexAttrib3fv(ee.location,Se);break;case 4:i.vertexAttrib4fv(ee.location,Se);break;default:i.vertexAttrib1fv(ee.location,Se)}}}}S()}function A(){E();for(const C in n){const N=n[C];for(const G in N){const Y=N[G];for(const U in Y){const V=Y[U];for(const O in V)h(V[O].object),delete V[O];delete Y[U]}}delete n[C]}}function b(C){if(n[C.id]===void 0)return;const N=n[C.id];for(const G in N){const Y=N[G];for(const U in Y){const V=Y[U];for(const O in V)h(V[O].object),delete V[O];delete Y[U]}}delete n[C.id]}function R(C){for(const N in n){const G=n[N];for(const Y in G){const U=G[Y];if(U[C.id]===void 0)continue;const V=U[C.id];for(const O in V)h(V[O].object),delete V[O];delete U[C.id]}}}function v(C){for(const N in n){const G=n[N],Y=C.isInstancedMesh===!0?C.id:0,U=G[Y];if(U!==void 0){for(const V in U){const O=U[V];for(const J in O)h(O[J].object),delete O[J];delete U[V]}delete G[Y],Object.keys(G).length===0&&delete n[N]}}}function E(){P(),a=!0,s!==r&&(s=r,c(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:g,disableUnusedAttributes:S}}function IT(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function PT(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==pn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const v=R===ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==on&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==fn&&!v)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Ee("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ee("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:y,maxSamples:A,samples:b}}function LT(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Di,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||r;return r=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=i.get(u);if(!r||p===null||p.length===0||s&&!g)s?h(null):c();else{const S=s?0:n,M=S*4;let y=m.clippingState||null;l.value=y,y=h(p,d,M,f);for(let A=0;A!==M;++A)y[A]=t[A];m.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=f+_*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,y=f;M!==_;++M,y+=4)a.copy(u[M]).applyMatrix4(S,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const _i=4,Ch=[.125,.215,.35,.446,.526,.582],Fi=20,DT=256,Gr=new qa,Rh=new Ue;let zo=null,Vo=0,Ho=0,Go=!1;const UT=new D;class Ih{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=UT}=s;zo=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),Go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(zo,Vo,Ho),this._renderer.xr.enabled=Go,e.scissorTest=!1,ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vi||e.mapping===wr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zo=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),Go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:ni,format:pn,colorSpace:Ia,depthBuffer:!1},r=Ph(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ph(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=NT(s)),this._blurMaterial=BT(s,e,t),this._ggxMaterial=FT(s,e,t)}return r}_compileMaterial(e){const t=new ft(new jt,e);this._renderer.compile(t,Gr)}_sceneToCubeUV(e,t,n,r,s){const l=new Qt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Rh),u.toneMapping=Nn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ft(new ri,new Ei({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const S=e.background;S?S.isColor&&(g.color.copy(S),e.background=null,m=!0):(g.color.copy(Rh),m=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[M],s.y,s.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[M]));const A=this._cubeSize;ur(r,y*A,M>2?A:0,A,A),u.setRenderTarget(r),m&&u.render(_,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Vi||e.mapping===wr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lh());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ur(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Gr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-_i?n-p+_i:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,ur(s,g,m,3*_,2*_),r.setRenderTarget(s),r.render(o,Gr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,ur(e,g,m,3*_,2*_),r.setRenderTarget(e),r.render(o,Gr)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Le("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[r];u.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Fi-1),_=s/p,g=isFinite(s)?1+Math.floor(h*_):Fi;g>Fi&&Ee(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Fi}`);const m=[];let S=0;for(let R=0;R<Fi;++R){const v=R/_,E=Math.exp(-v*v/2);m.push(E),R===0?S+=E:R<g&&(S+=2*E)}for(let R=0;R<m.length;R++)m[R]=m[R]/S;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=p,d.mipInt.value=M-n;const y=this._sizeLods[r],A=3*y*(r>M-_i?r-M+_i:0),b=4*(this._cubeSize-y);ur(t,A,b,3*y,2*y),l.setRenderTarget(t),l.render(u,Gr)}}function NT(i){const e=[],t=[],n=[];let r=i;const s=i-_i+1+Ch.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-_i?l=Ch[a-i+_i-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,_=3,g=2,m=1,S=new Float32Array(_*p*f),M=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let b=0;b<f;b++){const R=b%3*2/3-1,v=b>2?0:-1,E=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];S.set(E,_*p*b),M.set(d,g*p*b);const P=[b,b,b,b,b,b];y.set(P,m*p*b)}const A=new jt;A.setAttribute("position",new bn(S,_)),A.setAttribute("uv",new bn(M,g)),A.setAttribute("faceIndex",new bn(y,m)),n.push(new ft(A,null)),r>_i&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ph(i,e,t){const n=new Fn(i,e,t);return n.texture.mapping=Xa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ur(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function FT(i,e,t){return new Vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:DT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ja(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function BT(i,e,t){const n=new Float32Array(Fi),r=new D(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ja(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Lh(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ja(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Dh(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function ja(){return`

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
	`}class Gf extends Fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Af(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ri(5,5,5),s=new Vn({name:"CubemapFromEquirect",uniforms:Rr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:Qn});s.uniforms.tEquirect.value=t;const a=new ft(r,s),o=t.minFilter;return t.minFilter===Oi&&(t.minFilter=Yt),new IS(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function OT(i){let e=new WeakMap,t=new WeakMap,n=null;function r(d,f=!1){return d==null?null:f?a(d):s(d)}function s(d){if(d&&d.isTexture){const f=d.mapping;if(f===fa||f===co)if(e.has(d)){const p=e.get(d).texture;return o(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const _=new Gf(p.height);return _.fromEquirectangularTexture(i,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,p=f===fa||f===co,_=f===Vi||f===wr;if(p||_){let g=t.get(d);const m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new Ih(i)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const S=d.image;return p&&S&&S.height>0||_&&S&&l(S)?(n===null&&(n=new Ih(i)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,f){return f===fa?d.mapping=Vi:f===co&&(d.mapping=wr),d}function l(d){let f=0;const p=6;for(let _=0;_<p;_++)d[_]!==void 0&&f++;return f===p}function c(d){const f=d.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){const f=d.target;f.removeEventListener("dispose",h);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:u}}function kT(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&ql("WebGLRenderer: "+n+" extension not supported."),r}}}function zT(i,e,t,n){const r={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete r[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,p=u.attributes.position;let _=0;if(p===void 0)return;if(f!==null){const S=f.array;_=f.version;for(let M=0,y=S.length;M<y;M+=3){const A=S[M+0],b=S[M+1],R=S[M+2];d.push(A,b,b,R,R,A)}}else{const S=p.array;_=p.version;for(let M=0,y=S.length/3-1;M<y;M+=3){const A=M+0,b=M+1,R=M+2;d.push(A,b,b,R,R,A)}}const g=new(p.count>=65535?bf:Sc)(d,1);g.version=_;const m=s.get(u);m&&e.remove(m),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function VT(i,e,t){let n;function r(u){n=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,d){i.drawElements(n,d,s,u*a),t.update(d,n,1)}function c(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,s,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,u,0,f);let _=0;for(let g=0;g<f;g++)_+=d[g];t.update(_,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function HT(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:Le("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function GT(i,e,t){const n=new WeakMap,r=new et;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let P=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",P)};var f=P;d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;p===!0&&(y=1),_===!0&&(y=2),g===!0&&(y=3);let A=o.attributes.position.count*y,b=1;A>e.maxTextureSize&&(b=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const R=new Float32Array(A*b*4*u),v=new Mf(R,A,b,u);v.type=fn,v.needsUpdate=!0;const E=y*4;for(let C=0;C<u;C++){const N=m[C],G=S[C],Y=M[C],U=A*b*4*C;for(let V=0;V<N.count;V++){const O=V*E;p===!0&&(r.fromBufferAttribute(N,V),R[U+O+0]=r.x,R[U+O+1]=r.y,R[U+O+2]=r.z,R[U+O+3]=0),_===!0&&(r.fromBufferAttribute(G,V),R[U+O+4]=r.x,R[U+O+5]=r.y,R[U+O+6]=r.z,R[U+O+7]=0),g===!0&&(r.fromBufferAttribute(Y,V),R[U+O+8]=r.x,R[U+O+9]=r.y,R[U+O+10]=r.z,R[U+O+11]=Y.itemSize===4?r.w:1)}}d={count:u,texture:v,size:new $e(A,b)},n.set(o,d),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function WT(i,e,t,n,r){let s=new WeakMap;function a(c){const h=r.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==h&&(e.update(d),s.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return d}function o(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const XT={[nf]:"LINEAR_TONE_MAPPING",[rf]:"REINHARD_TONE_MAPPING",[sf]:"CINEON_TONE_MAPPING",[af]:"ACES_FILMIC_TONE_MAPPING",[lf]:"AGX_TONE_MAPPING",[cf]:"NEUTRAL_TONE_MAPPING",[of]:"CUSTOM_TONE_MAPPING"};function YT(i,e,t,n,r){const s=new Fn(e,t,{type:i,depthBuffer:n,stencilBuffer:r,depthTexture:n?new Ar(e,t):void 0}),a=new Fn(e,t,{type:ni,depthBuffer:!1,stencilBuffer:!1}),o=new jt;o.setAttribute("position",new xt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new xt([0,2,0,0,2,0],2));const l=new oS({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new ft(o,l),h=new qa(-1,1,1,-1,0,1);let u=null,d=null,f=!1,p,_=null,g=[],m=!1;this.setSize=function(S,M){s.setSize(S,M),a.setSize(S,M);for(let y=0;y<g.length;y++){const A=g[y];A.setSize&&A.setSize(S,M)}},this.setEffects=function(S){g=S,m=g.length>0&&g[0].isRenderPass===!0;const M=s.width,y=s.height;for(let A=0;A<g.length;A++){const b=g[A];b.setSize&&b.setSize(M,y)}},this.begin=function(S,M){if(f||S.toneMapping===Nn&&g.length===0)return!1;if(_=M,M!==null){const y=M.width,A=M.height;(s.width!==y||s.height!==A)&&this.setSize(y,A)}return m===!1&&S.setRenderTarget(s),p=S.toneMapping,S.toneMapping=Nn,!0},this.hasRenderPass=function(){return m},this.end=function(S,M){S.toneMapping=p,f=!0;let y=s,A=a;for(let b=0;b<g.length;b++){const R=g[b];if(R.enabled!==!1&&(R.render(S,A,y,M),R.needsSwap!==!1)){const v=y;y=A,A=v}}if(u!==S.outputColorSpace||d!==S.toneMapping){u=S.outputColorSpace,d=S.toneMapping,l.defines={},Oe.getTransfer(u)===it&&(l.defines.SRGB_TRANSFER="");const b=XT[d];b&&(l.defines[b]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,S.setRenderTarget(_),S.render(c,h),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const Wf=new Pt,Jl=new Ar(1,1),Xf=new Mf,Yf=new pv,qf=new Af,Uh=[],Nh=[],Fh=new Float32Array(16),Bh=new Float32Array(9),Oh=new Float32Array(4);function Dr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Uh[r];if(s===void 0&&(s=new Float32Array(r),Uh[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ka(i,e){let t=Nh[e];t===void 0&&(t=new Int32Array(e),Nh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function qT(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function jT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function KT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function $T(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function ZT(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;Oh.set(n),i.uniformMatrix2fv(this.addr,!1,Oh),Nt(t,n)}}function JT(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;Bh.set(n),i.uniformMatrix3fv(this.addr,!1,Bh),Nt(t,n)}}function QT(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;Fh.set(n),i.uniformMatrix4fv(this.addr,!1,Fh),Nt(t,n)}}function eb(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function tb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function nb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function ib(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function rb(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function sb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function ab(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function ob(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function lb(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Jl.compareFunction=t.isReversedDepthBuffer()?_c:gc,s=Jl):s=Wf,t.setTexture2D(e||s,r)}function cb(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Yf,r)}function ub(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||qf,r)}function hb(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Xf,r)}function db(i){switch(i){case 5126:return qT;case 35664:return jT;case 35665:return KT;case 35666:return $T;case 35674:return ZT;case 35675:return JT;case 35676:return QT;case 5124:case 35670:return eb;case 35667:case 35671:return tb;case 35668:case 35672:return nb;case 35669:case 35673:return ib;case 5125:return rb;case 36294:return sb;case 36295:return ab;case 36296:return ob;case 35678:case 36198:case 36298:case 36306:case 35682:return lb;case 35679:case 36299:case 36307:return cb;case 35680:case 36300:case 36308:case 36293:return ub;case 36289:case 36303:case 36311:case 36292:return hb}}function fb(i,e){i.uniform1fv(this.addr,e)}function pb(i,e){const t=Dr(e,this.size,2);i.uniform2fv(this.addr,t)}function mb(i,e){const t=Dr(e,this.size,3);i.uniform3fv(this.addr,t)}function gb(i,e){const t=Dr(e,this.size,4);i.uniform4fv(this.addr,t)}function _b(i,e){const t=Dr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function xb(i,e){const t=Dr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function vb(i,e){const t=Dr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Sb(i,e){i.uniform1iv(this.addr,e)}function Mb(i,e){i.uniform2iv(this.addr,e)}function yb(i,e){i.uniform3iv(this.addr,e)}function Tb(i,e){i.uniform4iv(this.addr,e)}function bb(i,e){i.uniform1uiv(this.addr,e)}function wb(i,e){i.uniform2uiv(this.addr,e)}function Eb(i,e){i.uniform3uiv(this.addr,e)}function Ab(i,e){i.uniform4uiv(this.addr,e)}function Cb(i,e,t){const n=this.cache,r=e.length,s=Ka(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Jl:a=Wf;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Rb(i,e,t){const n=this.cache,r=e.length,s=Ka(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Yf,s[a])}function Ib(i,e,t){const n=this.cache,r=e.length,s=Ka(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||qf,s[a])}function Pb(i,e,t){const n=this.cache,r=e.length,s=Ka(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Xf,s[a])}function Lb(i){switch(i){case 5126:return fb;case 35664:return pb;case 35665:return mb;case 35666:return gb;case 35674:return _b;case 35675:return xb;case 35676:return vb;case 5124:case 35670:return Sb;case 35667:case 35671:return Mb;case 35668:case 35672:return yb;case 35669:case 35673:return Tb;case 5125:return bb;case 36294:return wb;case 36295:return Eb;case 36296:return Ab;case 35678:case 36198:case 36298:case 36306:case 35682:return Cb;case 35679:case 36299:case 36307:return Rb;case 35680:case 36300:case 36308:case 36293:return Ib;case 36289:case 36303:case 36311:case 36292:return Pb}}class Db{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=db(t.type)}}class Ub{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Lb(t.type)}}class Nb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Wo=/(\w+)(\])?(\[|\.)?/g;function kh(i,e){i.seq.push(e),i.map[e.id]=e}function Fb(i,e,t){const n=i.name,r=n.length;for(Wo.lastIndex=0;;){const s=Wo.exec(n),a=Wo.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){kh(t,c===void 0?new Db(o,i,e):new Ub(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Nb(o),kh(t,u)),t=u}}}class xa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Fb(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function zh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Bb=37297;let Ob=0;function kb(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Vh=new Be;function zb(i){Oe._getMatrix(Vh,Oe.workingColorSpace,i);const e=`mat3( ${Vh.elements.map(t=>t.toFixed(4))} )`;switch(Oe.getTransfer(i)){case Pa:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Ee("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Hh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+kb(i.getShaderSource(e),o)}else return s}function Vb(i,e){const t=zb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Hb={[nf]:"Linear",[rf]:"Reinhard",[sf]:"Cineon",[af]:"ACESFilmic",[lf]:"AgX",[cf]:"Neutral",[of]:"Custom"};function Gb(i,e){const t=Hb[e];return t===void 0?(Ee("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const oa=new D;function Wb(){Oe.getLuminanceCoefficients(oa);const i=oa.x.toFixed(4),e=oa.y.toFixed(4),t=oa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($r).join(`
`)}function Yb(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qb(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function $r(i){return i!==""}function Gh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const jb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ql(i){return i.replace(jb,$b)}const Kb=new Map;function $b(i,e){let t=We[e];if(t===void 0){const n=Kb.get(e);if(n!==void 0)t=We[n],Ee('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ql(t)}const Zb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xh(i){return i.replace(Zb,Jb)}function Jb(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Yh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Qb={[da]:"SHADOWMAP_TYPE_PCF",[jr]:"SHADOWMAP_TYPE_VSM"};function ew(i){return Qb[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const tw={[Vi]:"ENVMAP_TYPE_CUBE",[wr]:"ENVMAP_TYPE_CUBE",[Xa]:"ENVMAP_TYPE_CUBE_UV"};function nw(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":tw[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const iw={[wr]:"ENVMAP_MODE_REFRACTION"};function rw(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":iw[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const sw={[Wa]:"ENVMAP_BLENDING_MULTIPLY",[Rx]:"ENVMAP_BLENDING_MIX",[Ix]:"ENVMAP_BLENDING_ADD"};function aw(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":sw[i.combine]||"ENVMAP_BLENDING_NONE"}function ow(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function lw(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=ew(t),c=nw(t),h=rw(t),u=aw(t),d=ow(t),f=Xb(t),p=Yb(s),_=r.createProgram();let g,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter($r).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter($r).join(`
`),m.length>0&&(m+=`
`)):(g=[Yh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($r).join(`
`),m=[Yh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nn?"#define TONE_MAPPING":"",t.toneMapping!==Nn?We.tonemapping_pars_fragment:"",t.toneMapping!==Nn?Gb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Vb("linearToOutputTexel",t.outputColorSpace),Wb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($r).join(`
`)),a=Ql(a),a=Gh(a,t),a=Wh(a,t),o=Ql(o),o=Gh(o,t),o=Wh(o,t),a=Xh(a),o=Xh(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===zu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=S+g+a,y=S+m+o,A=zh(r,r.VERTEX_SHADER,M),b=zh(r,r.FRAGMENT_SHADER,y);r.attachShader(_,A),r.attachShader(_,b),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(C){if(i.debug.checkShaderErrors){const N=r.getProgramInfoLog(_)||"",G=r.getShaderInfoLog(A)||"",Y=r.getShaderInfoLog(b)||"",U=N.trim(),V=G.trim(),O=Y.trim();let J=!0,ee=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,A,b);else{const ce=Hh(r,A,"vertex"),Se=Hh(r,b,"fragment");Le("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+U+`
`+ce+`
`+Se)}else U!==""?Ee("WebGLProgram: Program Info Log:",U):(V===""||O==="")&&(ee=!1);ee&&(C.diagnostics={runnable:J,programLog:U,vertexShader:{log:V,prefix:g},fragmentShader:{log:O,prefix:m}})}r.deleteShader(A),r.deleteShader(b),v=new xa(r,_),E=qb(r,_)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(_,Bb)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ob++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=b,this}let cw=0;class uw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new hw(e),t.set(e,n)),n}}class hw{constructor(e){this.id=cw++,this.code=e,this.usedTimes=0}}function dw(i){return i===Hi||i===Ea||i===Aa}function fw(i,e,t,n,r,s){const a=new yf,o=new uw,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,E,P,C,N,G){const Y=C.fog,U=N.geometry,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,O=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,J=e.get(v.envMap||V,O),ee=J&&J.mapping===Xa?J.image.height:null,ce=f[v.type];v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&Ee("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const Se=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Me=Se!==void 0?Se.length:0;let Ge=0;U.morphAttributes.position!==void 0&&(Ge=1),U.morphAttributes.normal!==void 0&&(Ge=2),U.morphAttributes.color!==void 0&&(Ge=3);let tt,De,K,ue;if(ce){const ke=Ln[ce];tt=ke.vertexShader,De=ke.fragmentShader}else tt=v.vertexShader,De=v.fragmentShader,o.update(v),K=o.getVertexShaderID(v),ue=o.getFragmentShaderID(v);const te=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),Ne=N.isInstancedMesh===!0,Pe=N.isBatchedMesh===!0,ut=!!v.map,Xe=!!v.matcap,st=!!J,pt=!!v.aoMap,je=!!v.lightMap,Lt=!!v.bumpMap,vt=!!v.normalMap,tn=!!v.displacementMap,L=!!v.emissiveMap,Dt=!!v.metalnessMap,Ke=!!v.roughnessMap,ht=v.anisotropy>0,he=v.clearcoat>0,Mt=v.dispersion>0,w=v.iridescence>0,x=v.sheen>0,B=v.transmission>0,j=ht&&!!v.anisotropyMap,Q=he&&!!v.clearcoatMap,ne=he&&!!v.clearcoatNormalMap,le=he&&!!v.clearcoatRoughnessMap,X=w&&!!v.iridescenceMap,$=w&&!!v.iridescenceThicknessMap,me=x&&!!v.sheenColorMap,xe=x&&!!v.sheenRoughnessMap,ae=!!v.specularMap,ie=!!v.specularColorMap,Fe=!!v.specularIntensityMap,He=B&&!!v.transmissionMap,Qe=B&&!!v.thicknessMap,I=!!v.gradientMap,re=!!v.alphaMap,q=v.alphaTest>0,ge=!!v.alphaHash,oe=!!v.extensions;let Z=Nn;v.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Z=i.toneMapping);const be={shaderID:ce,shaderType:v.type,shaderName:v.name,vertexShader:tt,fragmentShader:De,defines:v.defines,customVertexShaderID:K,customFragmentShaderID:ue,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Pe,batchingColor:Pe&&N._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&N.instanceColor!==null,instancingMorph:Ne&&N.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Oe.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ut,matcap:Xe,envMap:st,envMapMode:st&&J.mapping,envMapCubeUVHeight:ee,aoMap:pt,lightMap:je,bumpMap:Lt,normalMap:vt,displacementMap:tn,emissiveMap:L,normalMapObjectSpace:vt&&v.normalMapType===Fx,normalMapTangentSpace:vt&&v.normalMapType===ss,packedNormalMap:vt&&v.normalMapType===ss&&dw(v.normalMap.format),metalnessMap:Dt,roughnessMap:Ke,anisotropy:ht,anisotropyMap:j,clearcoat:he,clearcoatMap:Q,clearcoatNormalMap:ne,clearcoatRoughnessMap:le,dispersion:Mt,iridescence:w,iridescenceMap:X,iridescenceThicknessMap:$,sheen:x,sheenColorMap:me,sheenRoughnessMap:xe,specularMap:ae,specularColorMap:ie,specularIntensityMap:Fe,transmission:B,transmissionMap:He,thicknessMap:Qe,gradientMap:I,opaque:v.transparent===!1&&v.blending===xi&&v.alphaToCoverage===!1,alphaMap:re,alphaTest:q,alphaHash:ge,combine:v.combine,mapUv:ut&&p(v.map.channel),aoMapUv:pt&&p(v.aoMap.channel),lightMapUv:je&&p(v.lightMap.channel),bumpMapUv:Lt&&p(v.bumpMap.channel),normalMapUv:vt&&p(v.normalMap.channel),displacementMapUv:tn&&p(v.displacementMap.channel),emissiveMapUv:L&&p(v.emissiveMap.channel),metalnessMapUv:Dt&&p(v.metalnessMap.channel),roughnessMapUv:Ke&&p(v.roughnessMap.channel),anisotropyMapUv:j&&p(v.anisotropyMap.channel),clearcoatMapUv:Q&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:ne&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:$&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:me&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:xe&&p(v.sheenRoughnessMap.channel),specularMapUv:ae&&p(v.specularMap.channel),specularColorMapUv:ie&&p(v.specularColorMap.channel),specularIntensityMapUv:Fe&&p(v.specularIntensityMap.channel),transmissionMapUv:He&&p(v.transmissionMap.channel),thicknessMapUv:Qe&&p(v.thicknessMap.channel),alphaMapUv:re&&p(v.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(vt||ht),vertexNormals:!!U.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!U.attributes.uv&&(ut||re),fog:!!Y,useFog:v.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||U.attributes.normal===void 0&&vt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ie,skinning:N.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Ge,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Z,decodeVideoTexture:ut&&v.map.isVideoTexture===!0&&Oe.getTransfer(v.map.colorSpace)===it,decodeVideoTextureEmissive:L&&v.emissiveMap.isVideoTexture===!0&&Oe.getTransfer(v.emissiveMap.colorSpace)===it,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===an,flipSided:v.side===en,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:oe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&v.extensions.multiDraw===!0||Pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function g(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)E.push(P),E.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(m(E,v),S(E,v),E.push(i.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function m(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function S(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),v.push(a.mask)}function M(v){const E=f[v.type];let P;if(E){const C=Ln[E];P=rS.clone(C.uniforms)}else P=v.uniforms;return P}function y(v,E){let P=h.get(E);return P!==void 0?++P.usedTimes:(P=new lw(i,E,v,r),c.push(P),h.set(E,P)),P}function A(v){if(--v.usedTimes===0){const E=c.indexOf(v);c[E]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function R(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:M,acquireProgram:y,releaseProgram:A,releaseShaderCache:b,programs:c,dispose:R}}function pw(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function mw(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function qh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function jh(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,_,g,m){let S=i[e];return S===void 0?(S={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},i[e]=S):(S.id=d.id,S.object=d,S.geometry=f,S.material=p,S.materialVariant=a(d),S.groupOrder=_,S.renderOrder=d.renderOrder,S.z=g,S.group=m),e++,S}function l(d,f,p,_,g,m){const S=o(d,f,p,_,g,m);p.transmission>0?n.push(S):p.transparent===!0?r.push(S):t.push(S)}function c(d,f,p,_,g,m){const S=o(d,f,p,_,g,m);p.transmission>0?n.unshift(S):p.transparent===!0?r.unshift(S):t.unshift(S)}function h(d,f){t.length>1&&t.sort(d||mw),n.length>1&&n.sort(f||qh),r.length>1&&r.sort(f||qh)}function u(){for(let d=e,f=i.length;d<f;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:u,sort:h}}function gw(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new jh,i.set(n,[a])):r>=s.length?(a=new jh,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function _w(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ue};break;case"SpotLight":t={position:new D,direction:new D,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function xw(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let vw=0;function Sw(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Mw(i){const e=new _w,t=xw(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const r=new D,s=new we,a=new we;function o(c){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,S=0,M=0,y=0,A=0,b=0,R=0;c.sort(Sw);for(let E=0,P=c.length;E<P;E++){const C=c[E],N=C.color,G=C.intensity,Y=C.distance;let U=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Hi?U=C.shadow.map.texture:U=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=N.r*G,u+=N.g*G,d+=N.b*G;else if(C.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(C.sh.coefficients[V],G);R++}else if(C.isDirectionalLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const O=C.shadow,J=t.get(C);J.shadowIntensity=O.intensity,J.shadowBias=O.bias,J.shadowNormalBias=O.normalBias,J.shadowRadius=O.radius,J.shadowMapSize=O.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=C.shadow.matrix,S++}n.directional[f]=V,f++}else if(C.isSpotLight){const V=e.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(N).multiplyScalar(G),V.distance=Y,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,n.spot[_]=V;const O=C.shadow;if(C.map&&(n.spotLightMap[A]=C.map,A++,O.updateMatrices(C),C.castShadow&&b++),n.spotLightMatrix[_]=O.matrix,C.castShadow){const J=t.get(C);J.shadowIntensity=O.intensity,J.shadowBias=O.bias,J.shadowNormalBias=O.normalBias,J.shadowRadius=O.radius,J.shadowMapSize=O.mapSize,n.spotShadow[_]=J,n.spotShadowMap[_]=U,y++}_++}else if(C.isRectAreaLight){const V=e.get(C);V.color.copy(N).multiplyScalar(G),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=V,g++}else if(C.isPointLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const O=C.shadow,J=t.get(C);J.shadowIntensity=O.intensity,J.shadowBias=O.bias,J.shadowNormalBias=O.normalBias,J.shadowRadius=O.radius,J.shadowMapSize=O.mapSize,J.shadowCameraNear=O.camera.near,J.shadowCameraFar=O.camera.far,n.pointShadow[p]=J,n.pointShadowMap[p]=U,n.pointShadowMatrix[p]=C.shadow.matrix,M++}n.point[p]=V,p++}else if(C.isHemisphereLight){const V=e.get(C);V.skyColor.copy(C.color).multiplyScalar(G),V.groundColor.copy(C.groundColor).multiplyScalar(G),n.hemi[m]=V,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const v=n.hash;(v.directionalLength!==f||v.pointLength!==p||v.spotLength!==_||v.rectAreaLength!==g||v.hemiLength!==m||v.numDirectionalShadows!==S||v.numPointShadows!==M||v.numSpotShadows!==y||v.numSpotMaps!==A||v.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+A-b,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=R,v.directionalLength=f,v.pointLength=p,v.spotLength=_,v.rectAreaLength=g,v.hemiLength=m,v.numDirectionalShadows=S,v.numPointShadows=M,v.numSpotShadows=y,v.numSpotMaps=A,v.numLightProbes=R,n.version=vw++)}function l(c,h){let u=0,d=0,f=0,p=0,_=0;const g=h.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){const M=c[m];if(M.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),u++}else if(M.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),f++}else if(M.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(M.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(M.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function Kh(i){const e=new Mw(i),t=[],n=[],r=[];function s(d){u.camera=d,t.length=0,n.length=0,r.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function yw(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Kh(i),e.set(r,[o])):s>=a.length?(o=new Kh(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Tw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bw=`uniform sampler2D shadow_pass;
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
}`,ww=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],Ew=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],$h=new we,Wr=new D,Xo=new D;function Aw(i,e,t){let n=new bc;const r=new $e,s=new $e,a=new et,o=new cS,l=new uS,c={},h=t.maxTextureSize,u={[vi]:en,[en]:vi,[an]:an},d=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:Tw,fragmentShader:bw}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new jt;p.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ft(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=da;let m=this.type;this.render=function(b,R,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===ux&&(Ee("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=da);const E=i.getRenderTarget(),P=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Qn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const G=m!==this.type;G&&R.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(U=>U.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,U=b.length;Y<U;Y++){const V=b[Y],O=V.shadow;if(O===void 0){Ee("WebGLShadowMap:",V,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);const J=O.getFrameExtents();r.multiply(J),s.copy(O.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/J.x),r.x=s.x*J.x,O.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/J.y),r.y=s.y*J.y,O.mapSize.y=s.y));const ee=i.state.buffers.depth.getReversed();if(O.camera._reversedDepth=ee,O.map===null||G===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===jr){if(V.isPointLight){Ee("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new Fn(r.x,r.y,{format:Hi,type:ni,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),O.map.texture.name=V.name+".shadowMap",O.map.depthTexture=new Ar(r.x,r.y,fn),O.map.depthTexture.name=V.name+".shadowMapDepth",O.map.depthTexture.format=ii,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ht,O.map.depthTexture.magFilter=Ht}else V.isPointLight?(O.map=new Gf(r.x),O.map.depthTexture=new Fv(r.x,On)):(O.map=new Fn(r.x,r.y),O.map.depthTexture=new Ar(r.x,r.y,On)),O.map.depthTexture.name=V.name+".shadowMap",O.map.depthTexture.format=ii,this.type===da?(O.map.depthTexture.compareFunction=ee?_c:gc,O.map.depthTexture.minFilter=Yt,O.map.depthTexture.magFilter=Yt):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ht,O.map.depthTexture.magFilter=Ht);O.camera.updateProjectionMatrix()}const ce=O.map.isWebGLCubeRenderTarget?6:1;for(let Se=0;Se<ce;Se++){if(O.map.isWebGLCubeRenderTarget)i.setRenderTarget(O.map,Se),i.clear();else{Se===0&&(i.setRenderTarget(O.map),i.clear());const Me=O.getViewport(Se);a.set(s.x*Me.x,s.y*Me.y,s.x*Me.z,s.y*Me.w),N.viewport(a)}if(V.isPointLight){const Me=O.camera,Ge=O.matrix,tt=V.distance||Me.far;tt!==Me.far&&(Me.far=tt,Me.updateProjectionMatrix()),Wr.setFromMatrixPosition(V.matrixWorld),Me.position.copy(Wr),Xo.copy(Me.position),Xo.add(ww[Se]),Me.up.copy(Ew[Se]),Me.lookAt(Xo),Me.updateMatrixWorld(),Ge.makeTranslation(-Wr.x,-Wr.y,-Wr.z),$h.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),O._frustum.setFromProjectionMatrix($h,Me.coordinateSystem,Me.reversedDepth)}else O.updateMatrices(V);n=O.getFrustum(),y(R,v,O.camera,V,this.type)}O.isPointLightShadow!==!0&&this.type===jr&&S(O,v),O.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(E,P,C)};function S(b,R){const v=e.update(_);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Fn(r.x,r.y,{format:Hi,type:ni})),d.uniforms.shadow_pass.value=b.map.depthTexture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(R,null,v,d,_,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(R,null,v,f,_,null)}function M(b,R,v,E){let P=null;const C=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)P=C;else if(P=v.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const N=P.uuid,G=R.uuid;let Y=c[N];Y===void 0&&(Y={},c[N]=Y);let U=Y[G];U===void 0&&(U=P.clone(),Y[G]=U,R.addEventListener("dispose",A)),P=U}if(P.visible=R.visible,P.wireframe=R.wireframe,E===jr?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:u[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const N=i.properties.get(P);N.light=v}return P}function y(b,R,v,E,P){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===jr)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);const G=e.update(b),Y=b.material;if(Array.isArray(Y)){const U=G.groups;for(let V=0,O=U.length;V<O;V++){const J=U[V],ee=Y[J.materialIndex];if(ee&&ee.visible){const ce=M(b,ee,E,P);b.onBeforeShadow(i,b,R,v,G,ce,J),i.renderBufferDirect(v,null,G,ce,b,J),b.onAfterShadow(i,b,R,v,G,ce,J)}}}else if(Y.visible){const U=M(b,Y,E,P);b.onBeforeShadow(i,b,R,v,G,U,null),i.renderBufferDirect(v,null,G,U,b,null),b.onAfterShadow(i,b,R,v,G,U,null)}}const N=b.children;for(let G=0,Y=N.length;G<Y;G++)y(N[G],R,v,E,P)}function A(b){b.target.removeEventListener("dispose",A);for(const v in c){const E=c[v],P=b.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function Cw(i,e){function t(){let I=!1;const re=new et;let q=null;const ge=new et(0,0,0,0);return{setMask:function(oe){q!==oe&&!I&&(i.colorMask(oe,oe,oe,oe),q=oe)},setLocked:function(oe){I=oe},setClear:function(oe,Z,be,ke,Tt){Tt===!0&&(oe*=ke,Z*=ke,be*=ke),re.set(oe,Z,be,ke),ge.equals(re)===!1&&(i.clearColor(oe,Z,be,ke),ge.copy(re))},reset:function(){I=!1,q=null,ge.set(-1,0,0,0)}}}function n(){let I=!1,re=!1,q=null,ge=null,oe=null;return{setReversed:function(Z){if(re!==Z){const be=e.get("EXT_clip_control");Z?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),re=Z;const ke=oe;oe=null,this.setClear(ke)}},getReversed:function(){return re},setTest:function(Z){Z?te(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(Z){q!==Z&&!I&&(i.depthMask(Z),q=Z)},setFunc:function(Z){if(re&&(Z=Yx[Z]),ge!==Z){switch(Z){case ll:i.depthFunc(i.NEVER);break;case cl:i.depthFunc(i.ALWAYS);break;case ul:i.depthFunc(i.LESS);break;case br:i.depthFunc(i.LEQUAL);break;case hl:i.depthFunc(i.EQUAL);break;case dl:i.depthFunc(i.GEQUAL);break;case fl:i.depthFunc(i.GREATER);break;case pl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=Z}},setLocked:function(Z){I=Z},setClear:function(Z){oe!==Z&&(oe=Z,re&&(Z=1-Z),i.clearDepth(Z))},reset:function(){I=!1,q=null,ge=null,oe=null,re=!1}}}function r(){let I=!1,re=null,q=null,ge=null,oe=null,Z=null,be=null,ke=null,Tt=null;return{setTest:function(at){I||(at?te(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(at){re!==at&&!I&&(i.stencilMask(at),re=at)},setFunc:function(at,Hn,En){(q!==at||ge!==Hn||oe!==En)&&(i.stencilFunc(at,Hn,En),q=at,ge=Hn,oe=En)},setOp:function(at,Hn,En){(Z!==at||be!==Hn||ke!==En)&&(i.stencilOp(at,Hn,En),Z=at,be=Hn,ke=En)},setLocked:function(at){I=at},setClear:function(at){Tt!==at&&(i.clearStencil(at),Tt=at)},reset:function(){I=!1,re=null,q=null,ge=null,oe=null,Z=null,be=null,ke=null,Tt=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let h={},u={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,S=null,M=null,y=null,A=null,b=null,R=null,v=new Ue(0,0,0),E=0,P=!1,C=null,N=null,G=null,Y=null,U=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,J=0;const ee=i.getParameter(i.VERSION);ee.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ee)[1]),O=J>=1):ee.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),O=J>=2);let ce=null,Se={};const Me=i.getParameter(i.SCISSOR_BOX),Ge=i.getParameter(i.VIEWPORT),tt=new et().fromArray(Me),De=new et().fromArray(Ge);function K(I,re,q,ge){const oe=new Uint8Array(4),Z=i.createTexture();i.bindTexture(I,Z),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let be=0;be<q;be++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,oe):i.texImage2D(re+be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,oe);return Z}const ue={};ue[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),ue[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ue[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(br),Lt(!1),vt(Lu),te(i.CULL_FACE),pt(Qn);function te(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Ie(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Ne(I,re){return d[I]!==re?(i.bindFramebuffer(I,re),d[I]=re,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=re),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=re),!0):!1}function Pe(I,re){let q=p,ge=!1;if(I){q=f.get(re),q===void 0&&(q=[],f.set(re,q));const oe=I.textures;if(q.length!==oe.length||q[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,be=oe.length;Z<be;Z++)q[Z]=i.COLOR_ATTACHMENT0+Z;q.length=oe.length,ge=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,ge=!0);ge&&i.drawBuffers(q)}function ut(I){return _!==I?(i.useProgram(I),_=I,!0):!1}const Xe={[Ni]:i.FUNC_ADD,[dx]:i.FUNC_SUBTRACT,[fx]:i.FUNC_REVERSE_SUBTRACT};Xe[px]=i.MIN,Xe[mx]=i.MAX;const st={[gx]:i.ZERO,[_x]:i.ONE,[xx]:i.SRC_COLOR,[al]:i.SRC_ALPHA,[bx]:i.SRC_ALPHA_SATURATE,[yx]:i.DST_COLOR,[Sx]:i.DST_ALPHA,[vx]:i.ONE_MINUS_SRC_COLOR,[ol]:i.ONE_MINUS_SRC_ALPHA,[Tx]:i.ONE_MINUS_DST_COLOR,[Mx]:i.ONE_MINUS_DST_ALPHA,[wx]:i.CONSTANT_COLOR,[Ex]:i.ONE_MINUS_CONSTANT_COLOR,[Ax]:i.CONSTANT_ALPHA,[Cx]:i.ONE_MINUS_CONSTANT_ALPHA};function pt(I,re,q,ge,oe,Z,be,ke,Tt,at){if(I===Qn){g===!0&&(Ie(i.BLEND),g=!1);return}if(g===!1&&(te(i.BLEND),g=!0),I!==hx){if(I!==m||at!==P){if((S!==Ni||A!==Ni)&&(i.blendEquation(i.FUNC_ADD),S=Ni,A=Ni),at)switch(I){case xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Du:i.blendFunc(i.ONE,i.ONE);break;case Uu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Le("WebGLState: Invalid blending: ",I);break}else switch(I){case xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Du:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Uu:Le("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nu:Le("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Le("WebGLState: Invalid blending: ",I);break}M=null,y=null,b=null,R=null,v.set(0,0,0),E=0,m=I,P=at}return}oe=oe||re,Z=Z||q,be=be||ge,(re!==S||oe!==A)&&(i.blendEquationSeparate(Xe[re],Xe[oe]),S=re,A=oe),(q!==M||ge!==y||Z!==b||be!==R)&&(i.blendFuncSeparate(st[q],st[ge],st[Z],st[be]),M=q,y=ge,b=Z,R=be),(ke.equals(v)===!1||Tt!==E)&&(i.blendColor(ke.r,ke.g,ke.b,Tt),v.copy(ke),E=Tt),m=I,P=!1}function je(I,re){I.side===an?Ie(i.CULL_FACE):te(i.CULL_FACE);let q=I.side===en;re&&(q=!q),Lt(q),I.blending===xi&&I.transparent===!1?pt(Qn):pt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),s.setMask(I.colorWrite);const ge=I.stencilWrite;o.setTest(ge),ge&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),L(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(I){C!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),C=I)}function vt(I){I!==lx?(te(i.CULL_FACE),I!==N&&(I===Lu?i.cullFace(i.BACK):I===cx?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),N=I}function tn(I){I!==G&&(O&&i.lineWidth(I),G=I)}function L(I,re,q){I?(te(i.POLYGON_OFFSET_FILL),(Y!==re||U!==q)&&(Y=re,U=q,a.getReversed()&&(re=-re),i.polygonOffset(re,q))):Ie(i.POLYGON_OFFSET_FILL)}function Dt(I){I?te(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function Ke(I){I===void 0&&(I=i.TEXTURE0+V-1),ce!==I&&(i.activeTexture(I),ce=I)}function ht(I,re,q){q===void 0&&(ce===null?q=i.TEXTURE0+V-1:q=ce);let ge=Se[q];ge===void 0&&(ge={type:void 0,texture:void 0},Se[q]=ge),(ge.type!==I||ge.texture!==re)&&(ce!==q&&(i.activeTexture(q),ce=q),i.bindTexture(I,re||ue[I]),ge.type=I,ge.texture=re)}function he(){const I=Se[ce];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Mt(){try{i.compressedTexImage2D(...arguments)}catch(I){Le("WebGLState:",I)}}function w(){try{i.compressedTexImage3D(...arguments)}catch(I){Le("WebGLState:",I)}}function x(){try{i.texSubImage2D(...arguments)}catch(I){Le("WebGLState:",I)}}function B(){try{i.texSubImage3D(...arguments)}catch(I){Le("WebGLState:",I)}}function j(){try{i.compressedTexSubImage2D(...arguments)}catch(I){Le("WebGLState:",I)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(I){Le("WebGLState:",I)}}function ne(){try{i.texStorage2D(...arguments)}catch(I){Le("WebGLState:",I)}}function le(){try{i.texStorage3D(...arguments)}catch(I){Le("WebGLState:",I)}}function X(){try{i.texImage2D(...arguments)}catch(I){Le("WebGLState:",I)}}function $(){try{i.texImage3D(...arguments)}catch(I){Le("WebGLState:",I)}}function me(I){return u[I]!==void 0?u[I]:i.getParameter(I)}function xe(I,re){u[I]!==re&&(i.pixelStorei(I,re),u[I]=re)}function ae(I){tt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),tt.copy(I))}function ie(I){De.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),De.copy(I))}function Fe(I,re){let q=c.get(re);q===void 0&&(q=new WeakMap,c.set(re,q));let ge=q.get(I);ge===void 0&&(ge=i.getUniformBlockIndex(re,I.name),q.set(I,ge))}function He(I,re){const ge=c.get(re).get(I);l.get(re)!==ge&&(i.uniformBlockBinding(re,ge,I.__bindingPointIndex),l.set(re,ge))}function Qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},ce=null,Se={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,S=null,M=null,y=null,A=null,b=null,R=null,v=new Ue(0,0,0),E=0,P=!1,C=null,N=null,G=null,Y=null,U=null,tt.set(0,0,i.canvas.width,i.canvas.height),De.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:Ie,bindFramebuffer:Ne,drawBuffers:Pe,useProgram:ut,setBlending:pt,setMaterial:je,setFlipSided:Lt,setCullFace:vt,setLineWidth:tn,setPolygonOffset:L,setScissorTest:Dt,activeTexture:Ke,bindTexture:ht,unbindTexture:he,compressedTexImage2D:Mt,compressedTexImage3D:w,texImage2D:X,texImage3D:$,pixelStorei:xe,getParameter:me,updateUBOMapping:Fe,uniformBlockBinding:He,texStorage2D:ne,texStorage3D:le,texSubImage2D:x,texSubImage3D:B,compressedTexSubImage2D:j,compressedTexSubImage3D:Q,scissor:ae,viewport:ie,reset:Qe}}function Rw(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,h=new WeakMap,u=new Set;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,x){return p?new OffscreenCanvas(w,x):os("canvas")}function g(w,x,B){let j=1;const Q=Mt(w);if((Q.width>B||Q.height>B)&&(j=B/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const ne=Math.floor(j*Q.width),le=Math.floor(j*Q.height);d===void 0&&(d=_(ne,le));const X=x?_(ne,le):d;return X.width=ne,X.height=le,X.getContext("2d").drawImage(w,0,0,ne,le),Ee("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ne+"x"+le+")."),X}else return"data"in w&&Ee("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function m(w){return w.generateMipmaps}function S(w){i.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(w,x,B,j,Q,ne=!1){if(w!==null){if(i[w]!==void 0)return i[w];Ee("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let le;j&&(le=e.get("EXT_texture_norm16"),le||Ee("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=x;if(x===i.RED&&(B===i.FLOAT&&(X=i.R32F),B===i.HALF_FLOAT&&(X=i.R16F),B===i.UNSIGNED_BYTE&&(X=i.R8),B===i.UNSIGNED_SHORT&&le&&(X=le.R16_EXT),B===i.SHORT&&le&&(X=le.R16_SNORM_EXT)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.R8UI),B===i.UNSIGNED_SHORT&&(X=i.R16UI),B===i.UNSIGNED_INT&&(X=i.R32UI),B===i.BYTE&&(X=i.R8I),B===i.SHORT&&(X=i.R16I),B===i.INT&&(X=i.R32I)),x===i.RG&&(B===i.FLOAT&&(X=i.RG32F),B===i.HALF_FLOAT&&(X=i.RG16F),B===i.UNSIGNED_BYTE&&(X=i.RG8),B===i.UNSIGNED_SHORT&&le&&(X=le.RG16_EXT),B===i.SHORT&&le&&(X=le.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RG8UI),B===i.UNSIGNED_SHORT&&(X=i.RG16UI),B===i.UNSIGNED_INT&&(X=i.RG32UI),B===i.BYTE&&(X=i.RG8I),B===i.SHORT&&(X=i.RG16I),B===i.INT&&(X=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RGB8UI),B===i.UNSIGNED_SHORT&&(X=i.RGB16UI),B===i.UNSIGNED_INT&&(X=i.RGB32UI),B===i.BYTE&&(X=i.RGB8I),B===i.SHORT&&(X=i.RGB16I),B===i.INT&&(X=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),B===i.UNSIGNED_INT&&(X=i.RGBA32UI),B===i.BYTE&&(X=i.RGBA8I),B===i.SHORT&&(X=i.RGBA16I),B===i.INT&&(X=i.RGBA32I)),x===i.RGB&&(B===i.UNSIGNED_SHORT&&le&&(X=le.RGB16_EXT),B===i.SHORT&&le&&(X=le.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),x===i.RGBA){const $=ne?Pa:Oe.getTransfer(Q);B===i.FLOAT&&(X=i.RGBA32F),B===i.HALF_FLOAT&&(X=i.RGBA16F),B===i.UNSIGNED_BYTE&&(X=$===it?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&le&&(X=le.RGBA16_EXT),B===i.SHORT&&le&&(X=le.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function A(w,x){let B;return w?x===null||x===On||x===rs?B=i.DEPTH24_STENCIL8:x===fn?B=i.DEPTH32F_STENCIL8:x===is&&(B=i.DEPTH24_STENCIL8,Ee("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===On||x===rs?B=i.DEPTH_COMPONENT24:x===fn?B=i.DEPTH_COMPONENT32F:x===is&&(B=i.DEPTH_COMPONENT16),B}function b(w,x){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ht&&w.minFilter!==Yt?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function R(w){const x=w.target;x.removeEventListener("dispose",R),E(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function v(w){const x=w.target;x.removeEventListener("dispose",v),C(x)}function E(w){const x=n.get(w);if(x.__webglInit===void 0)return;const B=w.source,j=f.get(B);if(j){const Q=j[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&P(w),Object.keys(j).length===0&&f.delete(B)}n.remove(w)}function P(w){const x=n.get(w);i.deleteTexture(x.__webglTexture);const B=w.source,j=f.get(B);delete j[x.__cacheKey],a.memory.textures--}function C(w){const x=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(x.__webglFramebuffer[j]))for(let Q=0;Q<x.__webglFramebuffer[j].length;Q++)i.deleteFramebuffer(x.__webglFramebuffer[j][Q]);else i.deleteFramebuffer(x.__webglFramebuffer[j]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[j])}else{if(Array.isArray(x.__webglFramebuffer))for(let j=0;j<x.__webglFramebuffer.length;j++)i.deleteFramebuffer(x.__webglFramebuffer[j]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let j=0;j<x.__webglColorRenderbuffer.length;j++)x.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[j]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const B=w.textures;for(let j=0,Q=B.length;j<Q;j++){const ne=n.get(B[j]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(B[j])}n.remove(w)}let N=0;function G(){N=0}function Y(){return N}function U(w){N=w}function V(){const w=N;return w>=r.maxTextures&&Ee("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),N+=1,w}function O(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function J(w,x){const B=n.get(w);if(w.isVideoTexture&&ht(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){const j=w.image;if(j===null)Ee("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)Ee("WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(B,w,x);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function ee(w,x){const B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){Ie(B,w,x);return}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function ce(w,x){const B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){Ie(B,w,x);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function Se(w,x){const B=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&B.__version!==w.version){Ne(B,w,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}const Me={[ns]:i.REPEAT,[Tn]:i.CLAMP_TO_EDGE,[ml]:i.MIRRORED_REPEAT},Ge={[Ht]:i.NEAREST,[Lx]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[Yt]:i.LINEAR,[uo]:i.LINEAR_MIPMAP_NEAREST,[Oi]:i.LINEAR_MIPMAP_LINEAR},tt={[Bx]:i.NEVER,[Hx]:i.ALWAYS,[Ox]:i.LESS,[gc]:i.LEQUAL,[kx]:i.EQUAL,[_c]:i.GEQUAL,[zx]:i.GREATER,[Vx]:i.NOTEQUAL};function De(w,x){if(x.type===fn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Yt||x.magFilter===uo||x.magFilter===Is||x.magFilter===Oi||x.minFilter===Yt||x.minFilter===uo||x.minFilter===Is||x.minFilter===Oi)&&Ee("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Me[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Me[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Me[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,Ge[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,Ge[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,tt[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ht||x.minFilter!==Is&&x.minFilter!==Oi||x.type===fn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function K(w,x){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",R));const j=x.source;let Q=f.get(j);Q===void 0&&(Q={},f.set(j,Q));const ne=O(x);if(ne!==w.__cacheKey){Q[ne]===void 0&&(Q[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[ne].usedTimes++;const le=Q[w.__cacheKey];le!==void 0&&(Q[w.__cacheKey].usedTimes--,le.usedTimes===0&&P(x)),w.__cacheKey=ne,w.__webglTexture=Q[ne].texture}return B}function ue(w,x,B){return Math.floor(Math.floor(w/B)/x)}function te(w,x,B,j){const ne=w.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,B,j,x.data);else{ne.sort((xe,ae)=>xe.start-ae.start);let le=0;for(let xe=1;xe<ne.length;xe++){const ae=ne[le],ie=ne[xe],Fe=ae.start+ae.count,He=ue(ie.start,x.width,4),Qe=ue(ae.start,x.width,4);ie.start<=Fe+1&&He===Qe&&ue(ie.start+ie.count-1,x.width,4)===He?ae.count=Math.max(ae.count,ie.start+ie.count-ae.start):(++le,ne[le]=ie)}ne.length=le+1;const X=t.getParameter(i.UNPACK_ROW_LENGTH),$=t.getParameter(i.UNPACK_SKIP_PIXELS),me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let xe=0,ae=ne.length;xe<ae;xe++){const ie=ne[xe],Fe=Math.floor(ie.start/4),He=Math.ceil(ie.count/4),Qe=Fe%x.width,I=Math.floor(Fe/x.width),re=He,q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Qe),t.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,Qe,I,re,q,B,j,x.data)}w.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,X),t.pixelStorei(i.UNPACK_SKIP_PIXELS,$),t.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function Ie(w,x,B){let j=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(j=i.TEXTURE_3D);const Q=K(w,x),ne=x.source;t.bindTexture(j,w.__webglTexture,i.TEXTURE0+B);const le=n.get(ne);if(ne.version!==le.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const q=Oe.getPrimaries(Oe.workingColorSpace),ge=x.colorSpace===mi?null:Oe.getPrimaries(x.colorSpace),oe=x.colorSpace===mi||q===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let $=g(x.image,!1,r.maxTextureSize);$=he(x,$);const me=s.convert(x.format,x.colorSpace),xe=s.convert(x.type);let ae=y(x.internalFormat,me,xe,x.normalized,x.colorSpace,x.isVideoTexture);De(j,x);let ie;const Fe=x.mipmaps,He=x.isVideoTexture!==!0,Qe=le.__version===void 0||Q===!0,I=ne.dataReady,re=b(x,$);if(x.isDepthTexture)ae=A(x.format===ki,x.type),Qe&&(He?t.texStorage2D(i.TEXTURE_2D,1,ae,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,ae,$.width,$.height,0,me,xe,null));else if(x.isDataTexture)if(Fe.length>0){He&&Qe&&t.texStorage2D(i.TEXTURE_2D,re,ae,Fe[0].width,Fe[0].height);for(let q=0,ge=Fe.length;q<ge;q++)ie=Fe[q],He?I&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ie.width,ie.height,me,xe,ie.data):t.texImage2D(i.TEXTURE_2D,q,ae,ie.width,ie.height,0,me,xe,ie.data);x.generateMipmaps=!1}else He?(Qe&&t.texStorage2D(i.TEXTURE_2D,re,ae,$.width,$.height),I&&te(x,$,me,xe)):t.texImage2D(i.TEXTURE_2D,0,ae,$.width,$.height,0,me,xe,$.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){He&&Qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,ae,Fe[0].width,Fe[0].height,$.depth);for(let q=0,ge=Fe.length;q<ge;q++)if(ie=Fe[q],x.format!==pn)if(me!==null)if(He){if(I)if(x.layerUpdates.size>0){const oe=Ah(ie.width,ie.height,x.format,x.type);for(const Z of x.layerUpdates){const be=ie.data.subarray(Z*oe/ie.data.BYTES_PER_ELEMENT,(Z+1)*oe/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,Z,ie.width,ie.height,1,me,be)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ie.width,ie.height,$.depth,me,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,ae,ie.width,ie.height,$.depth,0,ie.data,0,0);else Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ie.width,ie.height,$.depth,me,xe,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,ae,ie.width,ie.height,$.depth,0,me,xe,ie.data)}else{He&&Qe&&t.texStorage2D(i.TEXTURE_2D,re,ae,Fe[0].width,Fe[0].height);for(let q=0,ge=Fe.length;q<ge;q++)ie=Fe[q],x.format!==pn?me!==null?He?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,ie.width,ie.height,me,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,q,ae,ie.width,ie.height,0,ie.data):Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?I&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ie.width,ie.height,me,xe,ie.data):t.texImage2D(i.TEXTURE_2D,q,ae,ie.width,ie.height,0,me,xe,ie.data)}else if(x.isDataArrayTexture)if(He){if(Qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,ae,$.width,$.height,$.depth),I)if(x.layerUpdates.size>0){const q=Ah($.width,$.height,x.format,x.type);for(const ge of x.layerUpdates){const oe=$.data.subarray(ge*q/$.data.BYTES_PER_ELEMENT,(ge+1)*q/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ge,$.width,$.height,1,me,xe,oe)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,me,xe,$.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ae,$.width,$.height,$.depth,0,me,xe,$.data);else if(x.isData3DTexture)He?(Qe&&t.texStorage3D(i.TEXTURE_3D,re,ae,$.width,$.height,$.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,me,xe,$.data)):t.texImage3D(i.TEXTURE_3D,0,ae,$.width,$.height,$.depth,0,me,xe,$.data);else if(x.isFramebufferTexture){if(Qe)if(He)t.texStorage2D(i.TEXTURE_2D,re,ae,$.width,$.height);else{let q=$.width,ge=$.height;for(let oe=0;oe<re;oe++)t.texImage2D(i.TEXTURE_2D,oe,ae,q,ge,0,me,xe,null),q>>=1,ge>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const q=i.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),$.parentNode!==q){q.appendChild($),u.add(x),q.onpaint=ke=>{const Tt=ke.changedElements;for(const at of u)Tt.includes(at.image)&&(at.needsUpdate=!0)},q.requestPaint();return}const ge=0,oe=i.RGBA,Z=i.RGBA,be=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,ge,oe,Z,be,$),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Fe.length>0){if(He&&Qe){const q=Mt(Fe[0]);t.texStorage2D(i.TEXTURE_2D,re,ae,q.width,q.height)}for(let q=0,ge=Fe.length;q<ge;q++)ie=Fe[q],He?I&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,me,xe,ie):t.texImage2D(i.TEXTURE_2D,q,ae,me,xe,ie);x.generateMipmaps=!1}else if(He){if(Qe){const q=Mt($);t.texStorage2D(i.TEXTURE_2D,re,ae,q.width,q.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,xe,$)}else t.texImage2D(i.TEXTURE_2D,0,ae,me,xe,$);m(x)&&S(j),le.__version=ne.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Ne(w,x,B){if(x.image.length!==6)return;const j=K(w,x),Q=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+B);const ne=n.get(Q);if(Q.version!==ne.__version||j===!0){t.activeTexture(i.TEXTURE0+B);const le=Oe.getPrimaries(Oe.workingColorSpace),X=x.colorSpace===mi?null:Oe.getPrimaries(x.colorSpace),$=x.colorSpace===mi||le===X?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);const me=x.isCompressedTexture||x.image[0].isCompressedTexture,xe=x.image[0]&&x.image[0].isDataTexture,ae=[];for(let Z=0;Z<6;Z++)!me&&!xe?ae[Z]=g(x.image[Z],!0,r.maxCubemapSize):ae[Z]=xe?x.image[Z].image:x.image[Z],ae[Z]=he(x,ae[Z]);const ie=ae[0],Fe=s.convert(x.format,x.colorSpace),He=s.convert(x.type),Qe=y(x.internalFormat,Fe,He,x.normalized,x.colorSpace),I=x.isVideoTexture!==!0,re=ne.__version===void 0||j===!0,q=Q.dataReady;let ge=b(x,ie);De(i.TEXTURE_CUBE_MAP,x);let oe;if(me){I&&re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Qe,ie.width,ie.height);for(let Z=0;Z<6;Z++){oe=ae[Z].mipmaps;for(let be=0;be<oe.length;be++){const ke=oe[be];x.format!==pn?Fe!==null?I?q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,0,0,ke.width,ke.height,Fe,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,Qe,ke.width,ke.height,0,ke.data):Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,0,0,ke.width,ke.height,Fe,He,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,Qe,ke.width,ke.height,0,Fe,He,ke.data)}}}else{if(oe=x.mipmaps,I&&re){oe.length>0&&ge++;const Z=Mt(ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Qe,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(xe){I?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ae[Z].width,ae[Z].height,Fe,He,ae[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Qe,ae[Z].width,ae[Z].height,0,Fe,He,ae[Z].data);for(let be=0;be<oe.length;be++){const Tt=oe[be].image[Z].image;I?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,0,0,Tt.width,Tt.height,Fe,He,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,Qe,Tt.width,Tt.height,0,Fe,He,Tt.data)}}else{I?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Fe,He,ae[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Qe,Fe,He,ae[Z]);for(let be=0;be<oe.length;be++){const ke=oe[be];I?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,0,0,Fe,He,ke.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,Qe,Fe,He,ke.image[Z])}}}m(x)&&S(i.TEXTURE_CUBE_MAP),ne.__version=Q.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Pe(w,x,B,j,Q,ne){const le=s.convert(B.format,B.colorSpace),X=s.convert(B.type),$=y(B.internalFormat,le,X,B.normalized,B.colorSpace),me=n.get(x),xe=n.get(B);if(xe.__renderTarget=x,!me.__hasExternalTextures){const ae=Math.max(1,x.width>>ne),ie=Math.max(1,x.height>>ne);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,ne,$,ae,ie,x.depth,0,le,X,null):t.texImage2D(Q,ne,$,ae,ie,0,le,X,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),Ke(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Q,xe.__webglTexture,0,Dt(x)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,Q,xe.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ut(w,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){const j=x.depthTexture,Q=j&&j.isDepthTexture?j.type:null,ne=A(x.stencilBuffer,Q),le=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ke(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Dt(x),ne,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt(x),ne,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ne,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,w)}else{const j=x.textures;for(let Q=0;Q<j.length;Q++){const ne=j[Q],le=s.convert(ne.format,ne.colorSpace),X=s.convert(ne.type),$=y(ne.internalFormat,le,X,ne.normalized,ne.colorSpace);Ke(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Dt(x),$,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt(x),$,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,$,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Xe(w,x,B){const j=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(x.depthTexture);if(Q.__renderTarget=x,(!Q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),j){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),De(i.TEXTURE_CUBE_MAP,x.depthTexture);const me=s.convert(x.depthTexture.format),xe=s.convert(x.depthTexture.type);let ae;x.depthTexture.format===ii?ae=i.DEPTH_COMPONENT24:x.depthTexture.format===ki&&(ae=i.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ae,x.width,x.height,0,me,xe,null)}}else J(x.depthTexture,0);const ne=Q.__webglTexture,le=Dt(x),X=j?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,$=x.depthTexture.format===ki?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===ii)Ke(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,X,ne,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,$,X,ne,0);else if(x.depthTexture.format===ki)Ke(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,X,ne,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,$,X,ne,0);else throw new Error("Unknown depthTexture format")}function st(w){const x=n.get(w),B=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const j=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),j){const Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=j}if(w.depthTexture&&!x.__autoAllocateDepthBuffer)if(B)for(let j=0;j<6;j++)Xe(x.__webglFramebuffer[j],w,j);else{const j=w.texture.mipmaps;j&&j.length>0?Xe(x.__webglFramebuffer[0],w,0):Xe(x.__webglFramebuffer,w,0)}else if(B){x.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[j]),x.__webglDepthbuffer[j]===void 0)x.__webglDepthbuffer[j]=i.createRenderbuffer(),ut(x.__webglDepthbuffer[j],w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=x.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ne)}}else{const j=w.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),ut(x.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function pt(w,x,B){const j=n.get(w);x!==void 0&&Pe(j.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&st(w)}function je(w){const x=w.texture,B=n.get(w),j=n.get(x);w.addEventListener("dispose",v);const Q=w.textures,ne=w.isWebGLCubeRenderTarget===!0,le=Q.length>1;if(le||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=x.version,a.memory.textures++),ne){B.__webglFramebuffer=[];for(let X=0;X<6;X++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[X]=[];for(let $=0;$<x.mipmaps.length;$++)B.__webglFramebuffer[X][$]=i.createFramebuffer()}else B.__webglFramebuffer[X]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let X=0;X<x.mipmaps.length;X++)B.__webglFramebuffer[X]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(le)for(let X=0,$=Q.length;X<$;X++){const me=n.get(Q[X]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&Ke(w)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let X=0;X<Q.length;X++){const $=Q[X];B.__webglColorRenderbuffer[X]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[X]);const me=s.convert($.format,$.colorSpace),xe=s.convert($.type),ae=y($.internalFormat,me,xe,$.normalized,$.colorSpace,w.isXRRenderTarget===!0),ie=Dt(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,ae,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+X,i.RENDERBUFFER,B.__webglColorRenderbuffer[X])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ut(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),De(i.TEXTURE_CUBE_MAP,x);for(let X=0;X<6;X++)if(x.mipmaps&&x.mipmaps.length>0)for(let $=0;$<x.mipmaps.length;$++)Pe(B.__webglFramebuffer[X][$],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,$);else Pe(B.__webglFramebuffer[X],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);m(x)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let X=0,$=Q.length;X<$;X++){const me=Q[X],xe=n.get(me);let ae=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ae=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,xe.__webglTexture),De(ae,me),Pe(B.__webglFramebuffer,w,me,i.COLOR_ATTACHMENT0+X,ae,0),m(me)&&S(ae)}t.unbindTexture()}else{let X=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(X=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(X,j.__webglTexture),De(X,x),x.mipmaps&&x.mipmaps.length>0)for(let $=0;$<x.mipmaps.length;$++)Pe(B.__webglFramebuffer[$],w,x,i.COLOR_ATTACHMENT0,X,$);else Pe(B.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,X,0);m(x)&&S(X),t.unbindTexture()}w.depthBuffer&&st(w)}function Lt(w){const x=w.textures;for(let B=0,j=x.length;B<j;B++){const Q=x[B];if(m(Q)){const ne=M(w),le=n.get(Q).__webglTexture;t.bindTexture(ne,le),S(ne),t.unbindTexture()}}}const vt=[],tn=[];function L(w){if(w.samples>0){if(Ke(w)===!1){const x=w.textures,B=w.width,j=w.height;let Q=i.COLOR_BUFFER_BIT;const ne=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(w),X=x.length>1;if(X)for(let me=0;me<x.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);const $=w.texture.mipmaps;$&&$.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let me=0;me<x.length;me++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),X){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[me]);const xe=n.get(x[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,xe,0)}i.blitFramebuffer(0,0,B,j,0,0,B,j,Q,i.NEAREST),l===!0&&(vt.length=0,tn.length=0,vt.push(i.COLOR_ATTACHMENT0+me),w.depthBuffer&&w.resolveDepthBuffer===!1&&(vt.push(ne),tn.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,tn)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,vt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),X)for(let me=0;me<x.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,le.__webglColorRenderbuffer[me]);const xe=n.get(x[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,xe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Dt(w){return Math.min(r.maxSamples,w.samples)}function Ke(w){const x=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ht(w){const x=a.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function he(w,x){const B=w.colorSpace,j=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==Ia&&B!==mi&&(Oe.getTransfer(B)===it?(j!==pn||Q!==on)&&Ee("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Le("WebGLTextures: Unsupported texture color space:",B)),x}function Mt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=G,this.getTextureUnits=Y,this.setTextureUnits=U,this.setTexture2D=J,this.setTexture2DArray=ee,this.setTexture3D=ce,this.setTextureCube=Se,this.rebindTextures=pt,this.setupRenderTarget=je,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=L,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=Ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Iw(i,e){function t(n,r=mi){let s;const a=Oe.getTransfer(r);if(n===on)return i.UNSIGNED_BYTE;if(n===cc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===uc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ff)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===hf)return i.BYTE;if(n===df)return i.SHORT;if(n===is)return i.UNSIGNED_SHORT;if(n===lc)return i.INT;if(n===On)return i.UNSIGNED_INT;if(n===fn)return i.FLOAT;if(n===ni)return i.HALF_FLOAT;if(n===mf)return i.ALPHA;if(n===gf)return i.RGB;if(n===pn)return i.RGBA;if(n===ii)return i.DEPTH_COMPONENT;if(n===ki)return i.DEPTH_STENCIL;if(n===hc)return i.RED;if(n===dc)return i.RED_INTEGER;if(n===Hi)return i.RG;if(n===fc)return i.RG_INTEGER;if(n===pc)return i.RGBA_INTEGER;if(n===pa||n===ma||n===ga||n===_a)if(a===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===pa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ma)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ga)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_a)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===pa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ma)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ga)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_a)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===gl||n===_l||n===xl||n===vl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===gl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_l)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sl||n===Ml||n===yl||n===Tl||n===bl||n===Ea||n===wl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Sl||n===Ml)return a===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===yl)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Tl)return s.COMPRESSED_R11_EAC;if(n===bl)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Ea)return s.COMPRESSED_RG11_EAC;if(n===wl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===El||n===Al||n===Cl||n===Rl||n===Il||n===Pl||n===Ll||n===Dl||n===Ul||n===Nl||n===Fl||n===Bl||n===Ol||n===kl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===El)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Al)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Cl)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Rl)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Il)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pl)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ll)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Dl)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ul)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Nl)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fl)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Bl)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ol)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===kl)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zl||n===Vl||n===Hl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===zl)return a===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gl||n===Wl||n===Aa||n===Xl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Gl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Wl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Aa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Pw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lw=`
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

}`;class Dw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Rf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Vn({vertexShader:Pw,fragmentShader:Lw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new Ai(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Uw extends yi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const _=typeof XRWebGLBinding<"u",g=new Dw,m={},S=t.getContextAttributes();let M=null,y=null;const A=[],b=[],R=new $e;let v=null;const E=new Qt;E.viewport=new et;const P=new Qt;P.viewport=new et;const C=[E,P],N=new PS;let G=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ue=A[K];return ue===void 0&&(ue=new xo,A[K]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(K){let ue=A[K];return ue===void 0&&(ue=new xo,A[K]=ue),ue.getGripSpace()},this.getHand=function(K){let ue=A[K];return ue===void 0&&(ue=new xo,A[K]=ue),ue.getHandSpace()};function U(K){const ue=b.indexOf(K.inputSource);if(ue===-1)return;const te=A[ue];te!==void 0&&(te.update(K.inputSource,K.frame,c||a),te.dispatchEvent({type:K.type,data:K.inputSource}))}function V(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",O);for(let K=0;K<A.length;K++){const ue=b[K];ue!==null&&(b[K]=null,A[K].disconnect(ue))}G=null,Y=null,g.reset();for(const K in m)delete m[K];e.setRenderTarget(M),f=null,d=null,u=null,r=null,y=null,De.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&Ee("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Ee("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",V),r.addEventListener("inputsourceschange",O),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,Ie=null,Ne=null;S.depth&&(Ne=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=S.stencil?ki:ii,Ie=S.stencil?rs:On);const Pe={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Pe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Fn(d.textureWidth,d.textureHeight,{format:pn,type:on,depthTexture:new Ar(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const te={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Fn(f.framebufferWidth,f.framebufferHeight,{format:pn,type:on,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),De.setContext(r),De.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function O(K){for(let ue=0;ue<K.removed.length;ue++){const te=K.removed[ue],Ie=b.indexOf(te);Ie>=0&&(b[Ie]=null,A[Ie].disconnect(te))}for(let ue=0;ue<K.added.length;ue++){const te=K.added[ue];let Ie=b.indexOf(te);if(Ie===-1){for(let Pe=0;Pe<A.length;Pe++)if(Pe>=b.length){b.push(te),Ie=Pe;break}else if(b[Pe]===null){b[Pe]=te,Ie=Pe;break}if(Ie===-1)break}const Ne=A[Ie];Ne&&Ne.connect(te)}}const J=new D,ee=new D;function ce(K,ue,te){J.setFromMatrixPosition(ue.matrixWorld),ee.setFromMatrixPosition(te.matrixWorld);const Ie=J.distanceTo(ee),Ne=ue.projectionMatrix.elements,Pe=te.projectionMatrix.elements,ut=Ne[14]/(Ne[10]-1),Xe=Ne[14]/(Ne[10]+1),st=(Ne[9]+1)/Ne[5],pt=(Ne[9]-1)/Ne[5],je=(Ne[8]-1)/Ne[0],Lt=(Pe[8]+1)/Pe[0],vt=ut*je,tn=ut*Lt,L=Ie/(-je+Lt),Dt=L*-je;if(ue.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Dt),K.translateZ(L),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ne[10]===-1)K.projectionMatrix.copy(ue.projectionMatrix),K.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const Ke=ut+L,ht=Xe+L,he=vt-Dt,Mt=tn+(Ie-Dt),w=st*Xe/ht*Ke,x=pt*Xe/ht*Ke;K.projectionMatrix.makePerspective(he,Mt,w,x,Ke,ht),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Se(K,ue){ue===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ue.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let ue=K.near,te=K.far;g.texture!==null&&(g.depthNear>0&&(ue=g.depthNear),g.depthFar>0&&(te=g.depthFar)),N.near=P.near=E.near=ue,N.far=P.far=E.far=te,(G!==N.near||Y!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),G=N.near,Y=N.far),N.layers.mask=K.layers.mask|6,E.layers.mask=N.layers.mask&-5,P.layers.mask=N.layers.mask&-3;const Ie=K.parent,Ne=N.cameras;Se(N,Ie);for(let Pe=0;Pe<Ne.length;Pe++)Se(Ne[Pe],Ie);Ne.length===2?ce(N,E,P):N.projectionMatrix.copy(E.projectionMatrix),Me(K,N,Ie)};function Me(K,ue,te){te===null?K.matrix.copy(ue.matrixWorld):(K.matrix.copy(te.matrixWorld),K.matrix.invert(),K.matrix.multiply(ue.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ue.projectionMatrix),K.projectionMatrixInverse.copy(ue.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Er*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(K){return m[K]};let Ge=null;function tt(K,ue){if(h=ue.getViewerPose(c||a),p=ue,h!==null){const te=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ie=!1;te.length!==N.cameras.length&&(N.cameras.length=0,Ie=!0);for(let Xe=0;Xe<te.length;Xe++){const st=te[Xe];let pt=null;if(f!==null)pt=f.getViewport(st);else{const Lt=u.getViewSubImage(d,st);pt=Lt.viewport,Xe===0&&(e.setRenderTargetTextures(y,Lt.colorTexture,Lt.depthStencilTexture),e.setRenderTarget(y))}let je=C[Xe];je===void 0&&(je=new Qt,je.layers.enable(Xe),je.viewport=new et,C[Xe]=je),je.matrix.fromArray(st.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(st.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(pt.x,pt.y,pt.width,pt.height),Xe===0&&(N.matrix.copy(je.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ie===!0&&N.cameras.push(je)}const Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const Xe=u.getDepthInformation(te[0]);Xe&&Xe.isValid&&Xe.texture&&g.init(Xe,r.renderState)}if(Ne&&Ne.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let Xe=0;Xe<te.length;Xe++){const st=te[Xe].camera;if(st){let pt=m[st];pt||(pt=new Rf,m[st]=pt);const je=u.getCameraImage(st);pt.sourceTexture=je}}}}for(let te=0;te<A.length;te++){const Ie=b[te],Ne=A[te];Ie!==null&&Ne!==void 0&&Ne.update(Ie,ue,c||a)}Ge&&Ge(K,ue),ue.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ue}),p=null}const De=new Vf;De.setAnimationLoop(tt),this.setAnimationLoop=function(K){Ge=K},this.dispose=function(){}}}const Nw=new we,jf=new Be;jf.set(-1,0,0,0,1,0,0,0,1);function Fw(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Uf(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,S,M,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,S,M):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===en&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===en&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const S=e.get(m),M=S.envMap,y=S.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(Nw.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(jf),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,S,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=M*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,S){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===en&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const S=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Bw(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const y=M.program;n.uniformBlockBinding(S,y)}function c(S,M){let y=r[S.id];y===void 0&&(p(S),y=h(S),r[S.id]=y,S.addEventListener("dispose",g));const A=M.program;n.updateUBOMapping(S,A);const b=e.render.frame;s[S.id]!==b&&(d(S),s[S.id]=b)}function h(S){const M=u();S.__bindingPointIndex=M;const y=i.createBuffer(),A=S.__size,b=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,y),y}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Le("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const M=r[S.id],y=S.uniforms,A=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let b=0,R=y.length;b<R;b++){const v=Array.isArray(y[b])?y[b]:[y[b]];for(let E=0,P=v.length;E<P;E++){const C=v[E];if(f(C,b,E,A)===!0){const N=C.__offset,G=Array.isArray(C.value)?C.value:[C.value];let Y=0;for(let U=0;U<G.length;U++){const V=G[U],O=_(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,N+Y,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):ArrayBuffer.isView(V)?C.__data.set(new V.constructor(V.buffer,V.byteOffset,C.__data.length)):(V.toArray(C.__data,Y),Y+=O.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,M,y,A){const b=S.value,R=M+"_"+y;if(A[R]===void 0)return typeof b=="number"||typeof b=="boolean"?A[R]=b:ArrayBuffer.isView(b)?A[R]=b.slice():A[R]=b.clone(),!0;{const v=A[R];if(typeof b=="number"||typeof b=="boolean"){if(v!==b)return A[R]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(v.equals(b)===!1)return v.copy(b),!0}}return!1}function p(S){const M=S.uniforms;let y=0;const A=16;for(let R=0,v=M.length;R<v;R++){const E=Array.isArray(M[R])?M[R]:[M[R]];for(let P=0,C=E.length;P<C;P++){const N=E[P],G=Array.isArray(N.value)?N.value:[N.value];for(let Y=0,U=G.length;Y<U;Y++){const V=G[Y],O=_(V),J=y%A,ee=J%O.boundary,ce=J+ee;y+=ee,ce!==0&&A-ce<O.storage&&(y+=A-ce),N.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=O.storage}}}const b=y%A;return b>0&&(y+=A-b),S.__size=y,S.__cache={},this}function _(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?Ee("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(M.boundary=16,M.storage=S.byteLength):Ee("WebGLRenderer: Unsupported uniform value type.",S),M}function g(S){const M=S.target;M.removeEventListener("dispose",g);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function m(){for(const S in r)i.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}const Ow=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let In=null;function kw(){return In===null&&(In=new yc(Ow,16,16,Hi,ni),In.name="DFG_LUT",In.minFilter=Yt,In.magFilter=Yt,In.wrapS=Tn,In.wrapT=Tn,In.generateMipmaps=!1,In.needsUpdate=!0),In}class zw{constructor(e={}){const{canvas:t=Wx(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=on}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const _=f,g=new Set([pc,fc,dc]),m=new Set([on,On,is,rs,cc,uc]),S=new Uint32Array(4),M=new Int32Array(4),y=new D;let A=null,b=null;const R=[],v=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let C=!1,N=null;this._outputColorSpace=rt;let G=0,Y=0,U=null,V=-1,O=null;const J=new et,ee=new et;let ce=null;const Se=new Ue(0);let Me=0,Ge=t.width,tt=t.height,De=1,K=null,ue=null;const te=new et(0,0,Ge,tt),Ie=new et(0,0,Ge,tt);let Ne=!1;const Pe=new bc;let ut=!1,Xe=!1;const st=new we,pt=new D,je=new et,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let vt=!1;function tn(){return U===null?De:1}let L=n;function Dt(T,F){return t.getContext(T,F)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oc}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",ke,!1),L===null){const F="webgl2";if(L=Dt(F,T),L===null)throw Dt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw Le("WebGLRenderer: "+T.message),T}let Ke,ht,he,Mt,w,x,B,j,Q,ne,le,X,$,me,xe,ae,ie,Fe,He,Qe,I,re,q;function ge(){Ke=new kT(L),Ke.init(),I=new Iw(L,Ke),ht=new PT(L,Ke,e,I),he=new Cw(L,Ke),ht.reversedDepthBuffer&&d&&he.buffers.depth.setReversed(!0),Mt=new HT(L),w=new pw,x=new Rw(L,Ke,he,w,ht,I,Mt),B=new OT(P),j=new YS(L),re=new RT(L,j),Q=new zT(L,j,Mt,re),ne=new WT(L,Q,j,re,Mt),Fe=new GT(L,ht,x),xe=new LT(w),le=new fw(P,B,Ke,ht,re,xe),X=new Fw(P,w),$=new gw,me=new yw(Ke),ie=new CT(P,B,he,ne,p,l),ae=new Aw(P,ne,ht),q=new Bw(L,Mt,ht,he),He=new IT(L,Ke,Mt),Qe=new VT(L,Ke,Mt),Mt.programs=le.programs,P.capabilities=ht,P.extensions=Ke,P.properties=w,P.renderLists=$,P.shadowMap=ae,P.state=he,P.info=Mt}ge(),_!==on&&(E=new YT(_,t.width,t.height,r,s));const oe=new Uw(P,L);this.xr=oe,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const T=Ke.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ke.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return De},this.setPixelRatio=function(T){T!==void 0&&(De=T,this.setSize(Ge,tt,!1))},this.getSize=function(T){return T.set(Ge,tt)},this.setSize=function(T,F,H=!0){if(oe.isPresenting){Ee("WebGLRenderer: Can't change size while VR device is presenting.");return}Ge=T,tt=F,t.width=Math.floor(T*De),t.height=Math.floor(F*De),H===!0&&(t.style.width=T+"px",t.style.height=F+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(Ge*De,tt*De).floor()},this.setDrawingBufferSize=function(T,F,H){Ge=T,tt=F,De=H,t.width=Math.floor(T*H),t.height=Math.floor(F*H),this.setViewport(0,0,T,F)},this.setEffects=function(T){if(_===on){Le("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let F=0;F<T.length;F++)if(T[F].isOutputPass===!0){Ee("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(J)},this.getViewport=function(T){return T.copy(te)},this.setViewport=function(T,F,H,k){T.isVector4?te.set(T.x,T.y,T.z,T.w):te.set(T,F,H,k),he.viewport(J.copy(te).multiplyScalar(De).round())},this.getScissor=function(T){return T.copy(Ie)},this.setScissor=function(T,F,H,k){T.isVector4?Ie.set(T.x,T.y,T.z,T.w):Ie.set(T,F,H,k),he.scissor(ee.copy(Ie).multiplyScalar(De).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(T){he.setScissorTest(Ne=T)},this.setOpaqueSort=function(T){K=T},this.setTransparentSort=function(T){ue=T},this.getClearColor=function(T){return T.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(T=!0,F=!0,H=!0){let k=0;if(T){let z=!1;if(U!==null){const pe=U.texture.format;z=g.has(pe)}if(z){const pe=U.texture.type,ve=m.has(pe),fe=ie.getClearColor(),ye=ie.getClearAlpha(),Ce=fe.r,ze=fe.g,Ye=fe.b;ve?(S[0]=Ce,S[1]=ze,S[2]=Ye,S[3]=ye,L.clearBufferuiv(L.COLOR,0,S)):(M[0]=Ce,M[1]=ze,M[2]=Ye,M[3]=ye,L.clearBufferiv(L.COLOR,0,M))}else k|=L.COLOR_BUFFER_BIT}F&&(k|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(k|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&L.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),N=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),ie.dispose(),$.dispose(),me.dispose(),w.dispose(),B.dispose(),ne.dispose(),re.dispose(),q.dispose(),le.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Gc),oe.removeEventListener("sessionend",Wc),Ci.stop()};function Z(T){T.preventDefault(),Hu("WebGLRenderer: Context Lost."),C=!0}function be(){Hu("WebGLRenderer: Context Restored."),C=!1;const T=Mt.autoReset,F=ae.enabled,H=ae.autoUpdate,k=ae.needsUpdate,z=ae.type;ge(),Mt.autoReset=T,ae.enabled=F,ae.autoUpdate=H,ae.needsUpdate=k,ae.type=z}function ke(T){Le("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Tt(T){const F=T.target;F.removeEventListener("dispose",Tt),at(F)}function at(T){Hn(T),w.remove(T)}function Hn(T){const F=w.get(T).programs;F!==void 0&&(F.forEach(function(H){le.releaseProgram(H)}),T.isShaderMaterial&&le.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,H,k,z,pe){F===null&&(F=Lt);const ve=z.isMesh&&z.matrixWorld.determinant()<0,fe=Ap(T,F,H,k,z);he.setMaterial(k,ve);let ye=H.index,Ce=1;if(k.wireframe===!0){if(ye=Q.getWireframeAttribute(H),ye===void 0)return;Ce=2}const ze=H.drawRange,Ye=H.attributes.position;let Re=ze.start*Ce,ot=(ze.start+ze.count)*Ce;pe!==null&&(Re=Math.max(Re,pe.start*Ce),ot=Math.min(ot,(pe.start+pe.count)*Ce)),ye!==null?(Re=Math.max(Re,0),ot=Math.min(ot,ye.count)):Ye!=null&&(Re=Math.max(Re,0),ot=Math.min(ot,Ye.count));const bt=ot-Re;if(bt<0||bt===1/0)return;re.setup(z,k,fe,H,ye);let yt,lt=He;if(ye!==null&&(yt=j.get(ye),lt=Qe,lt.setIndex(yt)),z.isMesh)k.wireframe===!0?(he.setLineWidth(k.wireframeLinewidth*tn()),lt.setMode(L.LINES)):lt.setMode(L.TRIANGLES);else if(z.isLine){let Gt=k.linewidth;Gt===void 0&&(Gt=1),he.setLineWidth(Gt*tn()),z.isLineSegments?lt.setMode(L.LINES):z.isLineLoop?lt.setMode(L.LINE_LOOP):lt.setMode(L.LINE_STRIP)}else z.isPoints?lt.setMode(L.POINTS):z.isSprite&&lt.setMode(L.TRIANGLES);if(z.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))lt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Gt=z._multiDrawStarts,_e=z._multiDrawCounts,nn=z._multiDrawCount,Ze=ye?j.get(ye).bytesPerElement:1,cn=w.get(k).currentProgram.getUniforms();for(let An=0;An<nn;An++)cn.setValue(L,"_gl_DrawID",An),lt.render(Gt[An]/Ze,_e[An])}else if(z.isInstancedMesh)lt.renderInstances(Re,bt,z.count);else if(H.isInstancedBufferGeometry){const Gt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,_e=Math.min(H.instanceCount,Gt);lt.renderInstances(Re,bt,_e)}else lt.render(Re,bt)};function En(T,F,H){T.transparent===!0&&T.side===an&&T.forceSinglePass===!1?(T.side=en,T.needsUpdate=!0,ws(T,F,H),T.side=vi,T.needsUpdate=!0,ws(T,F,H),T.side=an):ws(T,F,H)}this.compile=function(T,F,H=null){H===null&&(H=T),b=me.get(H),b.init(F),v.push(b),H.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(b.pushLight(z),z.castShadow&&b.pushShadow(z))}),T!==H&&T.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(b.pushLight(z),z.castShadow&&b.pushShadow(z))}),b.setupLights();const k=new Set;return T.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const pe=z.material;if(pe)if(Array.isArray(pe))for(let ve=0;ve<pe.length;ve++){const fe=pe[ve];En(fe,H,z),k.add(fe)}else En(pe,H,z),k.add(pe)}),b=v.pop(),k},this.compileAsync=function(T,F,H=null){const k=this.compile(T,F,H);return new Promise(z=>{function pe(){if(k.forEach(function(ve){w.get(ve).currentProgram.isReady()&&k.delete(ve)}),k.size===0){z(T);return}setTimeout(pe,10)}Ke.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Za=null;function wp(T){Za&&Za(T)}function Gc(){Ci.stop()}function Wc(){Ci.start()}const Ci=new Vf;Ci.setAnimationLoop(wp),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(T){Za=T,oe.setAnimationLoop(T),T===null?Ci.stop():Ci.start()},oe.addEventListener("sessionstart",Gc),oe.addEventListener("sessionend",Wc),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){Le("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(T,F);const H=oe.enabled===!0&&oe.isPresenting===!0,k=E!==null&&(U===null||H)&&E.begin(P,U);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(F),F=oe.getCamera()),T.isScene===!0&&T.onBeforeRender(P,T,F,U),b=me.get(T,v.length),b.init(F),b.state.textureUnits=x.getTextureUnits(),v.push(b),st.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Pe.setFromProjectionMatrix(st,Un,F.reversedDepth),Xe=this.localClippingEnabled,ut=xe.init(this.clippingPlanes,Xe),A=$.get(T,R.length),A.init(),R.push(A),oe.enabled===!0&&oe.isPresenting===!0){const ve=P.xr.getDepthSensingMesh();ve!==null&&Ja(ve,F,-1/0,P.sortObjects)}Ja(T,F,0,P.sortObjects),A.finish(),P.sortObjects===!0&&A.sort(K,ue),vt=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,vt&&ie.addToRenderList(A,T),this.info.render.frame++,ut===!0&&xe.beginShadows();const z=b.state.shadowsArray;if(ae.render(z,T,F),ut===!0&&xe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(k&&E.hasRenderPass())===!1){const ve=A.opaque,fe=A.transmissive;if(b.setupLights(),F.isArrayCamera){const ye=F.cameras;if(fe.length>0)for(let Ce=0,ze=ye.length;Ce<ze;Ce++){const Ye=ye[Ce];Yc(ve,fe,T,Ye)}vt&&ie.render(T);for(let Ce=0,ze=ye.length;Ce<ze;Ce++){const Ye=ye[Ce];Xc(A,T,Ye,Ye.viewport)}}else fe.length>0&&Yc(ve,fe,T,F),vt&&ie.render(T),Xc(A,T,F)}U!==null&&Y===0&&(x.updateMultisampleRenderTarget(U),x.updateRenderTargetMipmap(U)),k&&E.end(P),T.isScene===!0&&T.onAfterRender(P,T,F),re.resetDefaultState(),V=-1,O=null,v.pop(),v.length>0?(b=v[v.length-1],x.setTextureUnits(b.state.textureUnits),ut===!0&&xe.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?A=R[R.length-1]:A=null,N!==null&&N.renderEnd()};function Ja(T,F,H,k){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)H=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLightProbeGrid)b.pushLightProbeGrid(T);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Pe.intersectsSprite(T)){k&&je.setFromMatrixPosition(T.matrixWorld).applyMatrix4(st);const ve=ne.update(T),fe=T.material;fe.visible&&A.push(T,ve,fe,H,je.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Pe.intersectsObject(T))){const ve=ne.update(T),fe=T.material;if(k&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),je.copy(T.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),je.copy(ve.boundingSphere.center)),je.applyMatrix4(T.matrixWorld).applyMatrix4(st)),Array.isArray(fe)){const ye=ve.groups;for(let Ce=0,ze=ye.length;Ce<ze;Ce++){const Ye=ye[Ce],Re=fe[Ye.materialIndex];Re&&Re.visible&&A.push(T,ve,Re,H,je.z,Ye)}}else fe.visible&&A.push(T,ve,fe,H,je.z,null)}}const pe=T.children;for(let ve=0,fe=pe.length;ve<fe;ve++)Ja(pe[ve],F,H,k)}function Xc(T,F,H,k){const{opaque:z,transmissive:pe,transparent:ve}=T;b.setupLightsView(H),ut===!0&&xe.setGlobalState(P.clippingPlanes,H),k&&he.viewport(J.copy(k)),z.length>0&&bs(z,F,H),pe.length>0&&bs(pe,F,H),ve.length>0&&bs(ve,F,H),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function Yc(T,F,H,k){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[k.id]===void 0){const Re=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[k.id]=new Fn(1,1,{generateMipmaps:!0,type:Re?ni:on,minFilter:Oi,samples:Math.max(4,ht.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Oe.workingColorSpace})}const pe=b.state.transmissionRenderTarget[k.id],ve=k.viewport||J;pe.setSize(ve.z*P.transmissionResolutionScale,ve.w*P.transmissionResolutionScale);const fe=P.getRenderTarget(),ye=P.getActiveCubeFace(),Ce=P.getActiveMipmapLevel();P.setRenderTarget(pe),P.getClearColor(Se),Me=P.getClearAlpha(),Me<1&&P.setClearColor(16777215,.5),P.clear(),vt&&ie.render(H);const ze=P.toneMapping;P.toneMapping=Nn;const Ye=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),b.setupLightsView(k),ut===!0&&xe.setGlobalState(P.clippingPlanes,k),bs(T,H,k),x.updateMultisampleRenderTarget(pe),x.updateRenderTargetMipmap(pe),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ot=0,bt=F.length;ot<bt;ot++){const yt=F[ot],{object:lt,geometry:Gt,material:_e,group:nn}=yt;if(_e.side===an&&lt.layers.test(k.layers)){const Ze=_e.side;_e.side=en,_e.needsUpdate=!0,qc(lt,H,k,Gt,_e,nn),_e.side=Ze,_e.needsUpdate=!0,Re=!0}}Re===!0&&(x.updateMultisampleRenderTarget(pe),x.updateRenderTargetMipmap(pe))}P.setRenderTarget(fe,ye,Ce),P.setClearColor(Se,Me),Ye!==void 0&&(k.viewport=Ye),P.toneMapping=ze}function bs(T,F,H){const k=F.isScene===!0?F.overrideMaterial:null;for(let z=0,pe=T.length;z<pe;z++){const ve=T[z],{object:fe,geometry:ye,group:Ce}=ve;let ze=ve.material;ze.allowOverride===!0&&k!==null&&(ze=k),fe.layers.test(H.layers)&&qc(fe,F,H,ye,ze,Ce)}}function qc(T,F,H,k,z,pe){T.onBeforeRender(P,F,H,k,z,pe),T.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(P,F,H,k,T,pe),z.transparent===!0&&z.side===an&&z.forceSinglePass===!1?(z.side=en,z.needsUpdate=!0,P.renderBufferDirect(H,F,k,z,T,pe),z.side=vi,z.needsUpdate=!0,P.renderBufferDirect(H,F,k,z,T,pe),z.side=an):P.renderBufferDirect(H,F,k,z,T,pe),T.onAfterRender(P,F,H,k,z,pe)}function ws(T,F,H){F.isScene!==!0&&(F=Lt);const k=w.get(T),z=b.state.lights,pe=b.state.shadowsArray,ve=z.state.version,fe=le.getParameters(T,z.state,pe,F,H,b.state.lightProbeGridArray),ye=le.getProgramCacheKey(fe);let Ce=k.programs;k.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?F.environment:null,k.fog=F.fog;const ze=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;k.envMap=B.get(T.envMap||k.environment,ze),k.envMapRotation=k.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Ce===void 0&&(T.addEventListener("dispose",Tt),Ce=new Map,k.programs=Ce);let Ye=Ce.get(ye);if(Ye!==void 0){if(k.currentProgram===Ye&&k.lightsStateVersion===ve)return Kc(T,fe),Ye}else fe.uniforms=le.getUniforms(T),N!==null&&T.isNodeMaterial&&N.build(T,H,fe),T.onBeforeCompile(fe,P),Ye=le.acquireProgram(fe,ye),Ce.set(ye,Ye),k.uniforms=fe.uniforms;const Re=k.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Re.clippingPlanes=xe.uniform),Kc(T,fe),k.needsLights=Rp(T),k.lightsStateVersion=ve,k.needsLights&&(Re.ambientLightColor.value=z.state.ambient,Re.lightProbe.value=z.state.probe,Re.directionalLights.value=z.state.directional,Re.directionalLightShadows.value=z.state.directionalShadow,Re.spotLights.value=z.state.spot,Re.spotLightShadows.value=z.state.spotShadow,Re.rectAreaLights.value=z.state.rectArea,Re.ltc_1.value=z.state.rectAreaLTC1,Re.ltc_2.value=z.state.rectAreaLTC2,Re.pointLights.value=z.state.point,Re.pointLightShadows.value=z.state.pointShadow,Re.hemisphereLights.value=z.state.hemi,Re.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Re.spotLightMatrix.value=z.state.spotLightMatrix,Re.spotLightMap.value=z.state.spotLightMap,Re.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=b.state.lightProbeGridArray.length>0,k.currentProgram=Ye,k.uniformsList=null,Ye}function jc(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=xa.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function Kc(T,F){const H=w.get(T);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.batchingColor=F.batchingColor,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.instancingMorph=F.instancingMorph,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function Ep(T,F){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;y.setFromMatrixPosition(F.matrixWorld);for(let H=0,k=T.length;H<k;H++){const z=T[H];if(z.texture!==null&&z.boundingBox.containsPoint(y))return z}return null}function Ap(T,F,H,k,z){F.isScene!==!0&&(F=Lt),x.resetTextureUnits();const pe=F.fog,ve=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?F.environment:null,fe=U===null?P.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Oe.workingColorSpace,ye=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ce=B.get(k.envMap||ve,ye),ze=k.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ye=!!H.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Re=!!H.morphAttributes.position,ot=!!H.morphAttributes.normal,bt=!!H.morphAttributes.color;let yt=Nn;k.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(yt=P.toneMapping);const lt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Gt=lt!==void 0?lt.length:0,_e=w.get(k),nn=b.state.lights;if(ut===!0&&(Xe===!0||T!==O)){const dt=T===O&&k.id===V;xe.setState(k,T,dt)}let Ze=!1;k.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==nn.state.version||_e.outputColorSpace!==fe||z.isBatchedMesh&&_e.batching===!1||!z.isBatchedMesh&&_e.batching===!0||z.isBatchedMesh&&_e.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&_e.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&_e.instancing===!1||!z.isInstancedMesh&&_e.instancing===!0||z.isSkinnedMesh&&_e.skinning===!1||!z.isSkinnedMesh&&_e.skinning===!0||z.isInstancedMesh&&_e.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&_e.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&_e.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&_e.instancingMorph===!1&&z.morphTexture!==null||_e.envMap!==Ce||k.fog===!0&&_e.fog!==pe||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==xe.numPlanes||_e.numIntersection!==xe.numIntersection)||_e.vertexAlphas!==ze||_e.vertexTangents!==Ye||_e.morphTargets!==Re||_e.morphNormals!==ot||_e.morphColors!==bt||_e.toneMapping!==yt||_e.morphTargetsCount!==Gt||!!_e.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,_e.__version=k.version);let cn=_e.currentProgram;Ze===!0&&(cn=ws(k,F,z),N&&k.isNodeMaterial&&N.onUpdateProgram(k,cn,_e));let An=!1,si=!1,Yi=!1;const ct=cn.getUniforms(),wt=_e.uniforms;if(he.useProgram(cn.program)&&(An=!0,si=!0,Yi=!0),k.id!==V&&(V=k.id,si=!0),_e.needsLights){const dt=Ep(b.state.lightProbeGridArray,z);_e.lightProbeGrid!==dt&&(_e.lightProbeGrid=dt,si=!0)}if(An||O!==T){he.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ct.setValue(L,"projectionMatrix",T.projectionMatrix),ct.setValue(L,"viewMatrix",T.matrixWorldInverse);const oi=ct.map.cameraPosition;oi!==void 0&&oi.setValue(L,pt.setFromMatrixPosition(T.matrixWorld)),ht.logarithmicDepthBuffer&&ct.setValue(L,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ct.setValue(L,"isOrthographic",T.isOrthographicCamera===!0),O!==T&&(O=T,si=!0,Yi=!0)}if(_e.needsLights&&(nn.state.directionalShadowMap.length>0&&ct.setValue(L,"directionalShadowMap",nn.state.directionalShadowMap,x),nn.state.spotShadowMap.length>0&&ct.setValue(L,"spotShadowMap",nn.state.spotShadowMap,x),nn.state.pointShadowMap.length>0&&ct.setValue(L,"pointShadowMap",nn.state.pointShadowMap,x)),z.isSkinnedMesh){ct.setOptional(L,z,"bindMatrix"),ct.setOptional(L,z,"bindMatrixInverse");const dt=z.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),ct.setValue(L,"boneTexture",dt.boneTexture,x))}z.isBatchedMesh&&(ct.setOptional(L,z,"batchingTexture"),ct.setValue(L,"batchingTexture",z._matricesTexture,x),ct.setOptional(L,z,"batchingIdTexture"),ct.setValue(L,"batchingIdTexture",z._indirectTexture,x),ct.setOptional(L,z,"batchingColorTexture"),z._colorsTexture!==null&&ct.setValue(L,"batchingColorTexture",z._colorsTexture,x));const ai=H.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&Fe.update(z,H,cn),(si||_e.receiveShadow!==z.receiveShadow)&&(_e.receiveShadow=z.receiveShadow,ct.setValue(L,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&F.environment!==null&&(wt.envMapIntensity.value=F.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=kw()),si){if(ct.setValue(L,"toneMappingExposure",P.toneMappingExposure),_e.needsLights&&Cp(wt,Yi),pe&&k.fog===!0&&X.refreshFogUniforms(wt,pe),X.refreshMaterialUniforms(wt,k,De,tt,b.state.transmissionRenderTarget[T.id]),_e.needsLights&&_e.lightProbeGrid){const dt=_e.lightProbeGrid;wt.probesSH.value=dt.texture,wt.probesMin.value.copy(dt.boundingBox.min),wt.probesMax.value.copy(dt.boundingBox.max),wt.probesResolution.value.copy(dt.resolution)}xa.upload(L,jc(_e),wt,x)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(xa.upload(L,jc(_e),wt,x),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ct.setValue(L,"center",z.center),ct.setValue(L,"modelViewMatrix",z.modelViewMatrix),ct.setValue(L,"normalMatrix",z.normalMatrix),ct.setValue(L,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){const dt=k.uniformsGroups;for(let oi=0,qi=dt.length;oi<qi;oi++){const $c=dt[oi];q.update($c,cn),q.bind($c,cn)}}return cn}function Cp(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function Rp(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(T,F,H){const k=w.get(T);k.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),w.get(T.texture).__webglTexture=F,w.get(T.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:H,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,F){const H=w.get(T);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0};const Ip=L.createFramebuffer();this.setRenderTarget=function(T,F=0,H=0){U=T,G=F,Y=H;let k=null,z=!1,pe=!1;if(T){const fe=w.get(T);if(fe.__useDefaultFramebuffer!==void 0){he.bindFramebuffer(L.FRAMEBUFFER,fe.__webglFramebuffer),J.copy(T.viewport),ee.copy(T.scissor),ce=T.scissorTest,he.viewport(J),he.scissor(ee),he.setScissorTest(ce),V=-1;return}else if(fe.__webglFramebuffer===void 0)x.setupRenderTarget(T);else if(fe.__hasExternalTextures)x.rebindTextures(T,w.get(T.texture).__webglTexture,w.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const ze=T.depthTexture;if(fe.__boundDepthTexture!==ze){if(ze!==null&&w.has(ze)&&(T.width!==ze.image.width||T.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(T)}}const ye=T.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(pe=!0);const Ce=w.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ce[F])?k=Ce[F][H]:k=Ce[F],z=!0):T.samples>0&&x.useMultisampledRTT(T)===!1?k=w.get(T).__webglMultisampledFramebuffer:Array.isArray(Ce)?k=Ce[H]:k=Ce,J.copy(T.viewport),ee.copy(T.scissor),ce=T.scissorTest}else J.copy(te).multiplyScalar(De).floor(),ee.copy(Ie).multiplyScalar(De).floor(),ce=Ne;if(H!==0&&(k=Ip),he.bindFramebuffer(L.FRAMEBUFFER,k)&&he.drawBuffers(T,k),he.viewport(J),he.scissor(ee),he.setScissorTest(ce),z){const fe=w.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,fe.__webglTexture,H)}else if(pe){const fe=F;for(let ye=0;ye<T.textures.length;ye++){const Ce=w.get(T.textures[ye]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+ye,Ce.__webglTexture,H,fe)}}else if(T!==null&&H!==0){const fe=w.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,fe.__webglTexture,H)}V=-1},this.readRenderTargetPixels=function(T,F,H,k,z,pe,ve,fe=0){if(!(T&&T.isWebGLRenderTarget)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=w.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){he.bindFramebuffer(L.FRAMEBUFFER,ye);try{const Ce=T.textures[fe],ze=Ce.format,Ye=Ce.type;if(T.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+fe),!ht.textureFormatReadable(ze)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ht.textureTypeReadable(Ye)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-k&&H>=0&&H<=T.height-z&&L.readPixels(F,H,k,z,I.convert(ze),I.convert(Ye),pe)}finally{const Ce=U!==null?w.get(U).__webglFramebuffer:null;he.bindFramebuffer(L.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(T,F,H,k,z,pe,ve,fe=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=w.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye)if(F>=0&&F<=T.width-k&&H>=0&&H<=T.height-z){he.bindFramebuffer(L.FRAMEBUFFER,ye);const Ce=T.textures[fe],ze=Ce.format,Ye=Ce.type;if(T.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+fe),!ht.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ht.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Re),L.bufferData(L.PIXEL_PACK_BUFFER,pe.byteLength,L.STREAM_READ),L.readPixels(F,H,k,z,I.convert(ze),I.convert(Ye),0);const ot=U!==null?w.get(U).__webglFramebuffer:null;he.bindFramebuffer(L.FRAMEBUFFER,ot);const bt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Xx(L,bt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Re),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,pe),L.deleteBuffer(Re),L.deleteSync(bt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,F=null,H=0){const k=Math.pow(2,-H),z=Math.floor(T.image.width*k),pe=Math.floor(T.image.height*k),ve=F!==null?F.x:0,fe=F!==null?F.y:0;x.setTexture2D(T,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,ve,fe,z,pe),he.unbindTexture()};const Pp=L.createFramebuffer(),Lp=L.createFramebuffer();this.copyTextureToTexture=function(T,F,H=null,k=null,z=0,pe=0){let ve,fe,ye,Ce,ze,Ye,Re,ot,bt;const yt=T.isCompressedTexture?T.mipmaps[pe]:T.image;if(H!==null)ve=H.max.x-H.min.x,fe=H.max.y-H.min.y,ye=H.isBox3?H.max.z-H.min.z:1,Ce=H.min.x,ze=H.min.y,Ye=H.isBox3?H.min.z:0;else{const wt=Math.pow(2,-z);ve=Math.floor(yt.width*wt),fe=Math.floor(yt.height*wt),T.isDataArrayTexture?ye=yt.depth:T.isData3DTexture?ye=Math.floor(yt.depth*wt):ye=1,Ce=0,ze=0,Ye=0}k!==null?(Re=k.x,ot=k.y,bt=k.z):(Re=0,ot=0,bt=0);const lt=I.convert(F.format),Gt=I.convert(F.type);let _e;F.isData3DTexture?(x.setTexture3D(F,0),_e=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(x.setTexture2DArray(F,0),_e=L.TEXTURE_2D_ARRAY):(x.setTexture2D(F,0),_e=L.TEXTURE_2D),he.activeTexture(L.TEXTURE0),he.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),he.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),he.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const nn=he.getParameter(L.UNPACK_ROW_LENGTH),Ze=he.getParameter(L.UNPACK_IMAGE_HEIGHT),cn=he.getParameter(L.UNPACK_SKIP_PIXELS),An=he.getParameter(L.UNPACK_SKIP_ROWS),si=he.getParameter(L.UNPACK_SKIP_IMAGES);he.pixelStorei(L.UNPACK_ROW_LENGTH,yt.width),he.pixelStorei(L.UNPACK_IMAGE_HEIGHT,yt.height),he.pixelStorei(L.UNPACK_SKIP_PIXELS,Ce),he.pixelStorei(L.UNPACK_SKIP_ROWS,ze),he.pixelStorei(L.UNPACK_SKIP_IMAGES,Ye);const Yi=T.isDataArrayTexture||T.isData3DTexture,ct=F.isDataArrayTexture||F.isData3DTexture;if(T.isDepthTexture){const wt=w.get(T),ai=w.get(F),dt=w.get(wt.__renderTarget),oi=w.get(ai.__renderTarget);he.bindFramebuffer(L.READ_FRAMEBUFFER,dt.__webglFramebuffer),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,oi.__webglFramebuffer);for(let qi=0;qi<ye;qi++)Yi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,w.get(T).__webglTexture,z,Ye+qi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,w.get(F).__webglTexture,pe,bt+qi)),L.blitFramebuffer(Ce,ze,ve,fe,Re,ot,ve,fe,L.DEPTH_BUFFER_BIT,L.NEAREST);he.bindFramebuffer(L.READ_FRAMEBUFFER,null),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(z!==0||T.isRenderTargetTexture||w.has(T)){const wt=w.get(T),ai=w.get(F);he.bindFramebuffer(L.READ_FRAMEBUFFER,Pp),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,Lp);for(let dt=0;dt<ye;dt++)Yi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,wt.__webglTexture,z,Ye+dt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,wt.__webglTexture,z),ct?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ai.__webglTexture,pe,bt+dt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ai.__webglTexture,pe),z!==0?L.blitFramebuffer(Ce,ze,ve,fe,Re,ot,ve,fe,L.COLOR_BUFFER_BIT,L.NEAREST):ct?L.copyTexSubImage3D(_e,pe,Re,ot,bt+dt,Ce,ze,ve,fe):L.copyTexSubImage2D(_e,pe,Re,ot,Ce,ze,ve,fe);he.bindFramebuffer(L.READ_FRAMEBUFFER,null),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ct?T.isDataTexture||T.isData3DTexture?L.texSubImage3D(_e,pe,Re,ot,bt,ve,fe,ye,lt,Gt,yt.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(_e,pe,Re,ot,bt,ve,fe,ye,lt,yt.data):L.texSubImage3D(_e,pe,Re,ot,bt,ve,fe,ye,lt,Gt,yt):T.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,pe,Re,ot,ve,fe,lt,Gt,yt.data):T.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,pe,Re,ot,yt.width,yt.height,lt,yt.data):L.texSubImage2D(L.TEXTURE_2D,pe,Re,ot,ve,fe,lt,Gt,yt);he.pixelStorei(L.UNPACK_ROW_LENGTH,nn),he.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ze),he.pixelStorei(L.UNPACK_SKIP_PIXELS,cn),he.pixelStorei(L.UNPACK_SKIP_ROWS,An),he.pixelStorei(L.UNPACK_SKIP_IMAGES,si),pe===0&&F.generateMipmaps&&L.generateMipmap(_e),he.unbindTexture()},this.initRenderTarget=function(T){w.get(T).__webglFramebuffer===void 0&&x.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?x.setTextureCube(T,0):T.isData3DTexture?x.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?x.setTexture2DArray(T,0):x.setTexture2D(T,0),he.unbindTexture()},this.resetState=function(){G=0,Y=0,U=null,he.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Oe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Oe._getUnpackColorSpace()}}const Vw=5;function Dc(i){const e=Number.isFinite(i)&&i>0?i:1,t=Vw/2,n=t*e;return{left:-n,right:n,top:t,bottom:-t}}class Hw{apply(e,t,n){const r=Dc(n);e.left=r.left,e.right=r.right,e.top=r.top,e.bottom=r.bottom,e.position.set(t.position.x,t.position.y,t.position.z),t.target!=null&&e.lookAt(t.target.x,t.target.y,t.target.z),e.updateProjectionMatrix()}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var dn=Uint8Array,gr=Uint16Array,Gw=Int32Array,Kf=new dn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),$f=new dn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ww=new dn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Zf=function(i,e){for(var t=new gr(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new Gw(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return{b:t,r}},Jf=Zf(Kf,2),Qf=Jf.b,Xw=Jf.r;Qf[28]=258,Xw[258]=28;var Yw=Zf($f,0),qw=Yw.b,ec=new gr(32768);for(var mt=0;mt<32768;++mt){var pi=(mt&43690)>>1|(mt&21845)<<1;pi=(pi&52428)>>2|(pi&13107)<<2,pi=(pi&61680)>>4|(pi&3855)<<4,ec[mt]=((pi&65280)>>8|(pi&255)<<8)>>1}var Qr=(function(i,e,t){for(var n=i.length,r=0,s=new gr(e);r<n;++r)i[r]&&++s[i[r]-1];var a=new gr(e);for(r=1;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new gr(1<<e);var l=15-e;for(r=0;r<n;++r)if(i[r])for(var c=r<<4|i[r],h=e-i[r],u=a[i[r]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)o[ec[u]>>l]=c}else for(o=new gr(n),r=0;r<n;++r)i[r]&&(o[r]=ec[a[i[r]-1]++]>>15-i[r]);return o}),Ts=new dn(288);for(var mt=0;mt<144;++mt)Ts[mt]=8;for(var mt=144;mt<256;++mt)Ts[mt]=9;for(var mt=256;mt<280;++mt)Ts[mt]=7;for(var mt=280;mt<288;++mt)Ts[mt]=8;var ep=new dn(32);for(var mt=0;mt<32;++mt)ep[mt]=5;var jw=Qr(Ts,9,1),Kw=Qr(ep,5,1),Yo=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},Mn=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},qo=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},$w=function(i){return(i+7)/8|0},Zw=function(i,e,t){return(t==null||t>i.length)&&(t=i.length),new dn(i.subarray(e,t))},Jw=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],yn=function(i,e,t){var n=new Error(e||Jw[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,yn),!t)throw n;return n},Qw=function(i,e,t,n){var r=i.length,s=0;if(!r||e.f&&!e.l)return t||new dn(0);var a=!t,o=a||e.i!=2,l=e.i;a&&(t=new dn(r*3));var c=function(Pe){var ut=t.length;if(Pe>ut){var Xe=new dn(Math.max(ut*2,Pe));Xe.set(t),t=Xe}},h=e.f||0,u=e.p||0,d=e.b||0,f=e.l,p=e.d,_=e.m,g=e.n,m=r*8;do{if(!f){h=Mn(i,u,1);var S=Mn(i,u+1,3);if(u+=3,S)if(S==1)f=jw,p=Kw,_=9,g=5;else if(S==2){var b=Mn(i,u,31)+257,R=Mn(i,u+10,15)+4,v=b+Mn(i,u+5,31)+1;u+=14;for(var E=new dn(v),P=new dn(19),C=0;C<R;++C)P[Ww[C]]=Mn(i,u+C*3,7);u+=R*3;for(var N=Yo(P),G=(1<<N)-1,Y=Qr(P,N,1),C=0;C<v;){var U=Y[Mn(i,u,G)];u+=U&15;var M=U>>4;if(M<16)E[C++]=M;else{var V=0,O=0;for(M==16?(O=3+Mn(i,u,3),u+=2,V=E[C-1]):M==17?(O=3+Mn(i,u,7),u+=3):M==18&&(O=11+Mn(i,u,127),u+=7);O--;)E[C++]=V}}var J=E.subarray(0,b),ee=E.subarray(b);_=Yo(J),g=Yo(ee),f=Qr(J,_,1),p=Qr(ee,g,1)}else yn(1);else{var M=$w(u)+4,y=i[M-4]|i[M-3]<<8,A=M+y;if(A>r){l&&yn(0);break}o&&c(d+y),t.set(i.subarray(M,A),d),e.b=d+=y,e.p=u=A*8,e.f=h;continue}if(u>m){l&&yn(0);break}}o&&c(d+131072);for(var ce=(1<<_)-1,Se=(1<<g)-1,Me=u;;Me=u){var V=f[qo(i,u)&ce],Ge=V>>4;if(u+=V&15,u>m){l&&yn(0);break}if(V||yn(2),Ge<256)t[d++]=Ge;else if(Ge==256){Me=u,f=null;break}else{var tt=Ge-254;if(Ge>264){var C=Ge-257,De=Kf[C];tt=Mn(i,u,(1<<De)-1)+Qf[C],u+=De}var K=p[qo(i,u)&Se],ue=K>>4;K||yn(3),u+=K&15;var ee=qw[ue];if(ue>3){var De=$f[ue];ee+=qo(i,u)&(1<<De)-1,u+=De}if(u>m){l&&yn(0);break}o&&c(d+131072);var te=d+tt;if(d<ee){var Ie=s-ee,Ne=Math.min(ee,te);for(Ie+d<0&&yn(3);d<Ne;++d)t[d]=n[Ie+d]}for(;d<te;++d)t[d]=t[d-ee]}}e.l=f,e.p=Me,e.b=d,e.f=h,f&&(h=1,e.m=_,e.d=p,e.n=g)}while(!h);return d!=t.length&&a?Zw(t,0,d):t.subarray(0,d)},eE=new dn(0),tE=function(i,e){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&yn(6,"invalid zlib data"),(i[1]>>5&1)==1&&yn(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};function nE(i,e){return Qw(i.subarray(tE(i),-4),{i:2},e,e)}var iE=typeof TextDecoder<"u"&&new TextDecoder,rE=0;try{iE.decode(eE,{stream:!0}),rE=1}catch{}function tp(i,e,t){const n=t.length-i-1;if(e>=t[n])return n-1;if(e<=t[i])return i;let r=i,s=n,a=Math.floor((r+s)/2);for(;e<t[a]||e>=t[a+1];)e<t[a]?s=a:r=a,a=Math.floor((r+s)/2);return a}function sE(i,e,t,n){const r=[],s=[],a=[];r[0]=1;for(let o=1;o<=t;++o){s[o]=e-n[i+1-o],a[o]=n[i+o]-e;let l=0;for(let c=0;c<o;++c){const h=a[c+1],u=s[o-c],d=r[c]/(h+u);r[c]=l+h*d,l=u*d}r[o]=l}return r}function aE(i,e,t,n){const r=tp(i,n,e),s=sE(r,n,i,e),a=new et(0,0,0,0);for(let o=0;o<=i;++o){const l=t[r-i+o],c=s[o],h=l.w*c;a.x+=l.x*h,a.y+=l.y*h,a.z+=l.z*h,a.w+=l.w*c}return a}function oE(i,e,t,n,r){const s=[];for(let u=0;u<=t;++u)s[u]=0;const a=[];for(let u=0;u<=n;++u)a[u]=s.slice(0);const o=[];for(let u=0;u<=t;++u)o[u]=s.slice(0);o[0][0]=1;const l=s.slice(0),c=s.slice(0);for(let u=1;u<=t;++u){l[u]=e-r[i+1-u],c[u]=r[i+u]-e;let d=0;for(let f=0;f<u;++f){const p=c[f+1],_=l[u-f];o[u][f]=p+_;const g=o[f][u-1]/o[u][f];o[f][u]=d+p*g,d=_*g}o[u][u]=d}for(let u=0;u<=t;++u)a[0][u]=o[u][t];for(let u=0;u<=t;++u){let d=0,f=1;const p=[];for(let _=0;_<=t;++_)p[_]=s.slice(0);p[0][0]=1;for(let _=1;_<=n;++_){let g=0;const m=u-_,S=t-_;u>=_&&(p[f][0]=p[d][0]/o[S+1][m],g=p[f][0]*o[m][S]);const M=m>=-1?1:-m,y=u-1<=S?_-1:t-u;for(let b=M;b<=y;++b)p[f][b]=(p[d][b]-p[d][b-1])/o[S+1][m+b],g+=p[f][b]*o[m+b][S];u<=S&&(p[f][_]=-p[d][_-1]/o[S+1][u],g+=p[f][_]*o[u][S]),a[_][u]=g;const A=d;d=f,f=A}}let h=t;for(let u=1;u<=n;++u){for(let d=0;d<=t;++d)a[u][d]*=h;h*=t-u}return a}function lE(i,e,t,n,r){const s=r<i?r:i,a=[],o=tp(i,n,e),l=oE(o,n,i,s,e),c=[];for(let h=0;h<t.length;++h){const u=t[h].clone(),d=u.w;u.x*=d,u.y*=d,u.z*=d,c[h]=u}for(let h=0;h<=s;++h){const u=c[o-i].clone().multiplyScalar(l[h][0]);for(let d=1;d<=i;++d)u.add(c[o-i+d].clone().multiplyScalar(l[h][d]));a[h]=u}for(let h=s+1;h<=r+1;++h)a[h]=new et(0,0,0);return a}function cE(i,e){let t=1;for(let r=2;r<=i;++r)t*=r;let n=1;for(let r=2;r<=e;++r)n*=r;for(let r=2;r<=i-e;++r)n*=r;return t/n}function uE(i){const e=i.length,t=[],n=[];for(let s=0;s<e;++s){const a=i[s];t[s]=new D(a.x,a.y,a.z),n[s]=a.w}const r=[];for(let s=0;s<e;++s){const a=t[s].clone();for(let o=1;o<=s;++o)a.sub(r[s-o].clone().multiplyScalar(cE(s,o)*n[o]));r[s]=a.divideScalar(n[0])}return r}function hE(i,e,t,n,r){const s=lE(i,e,t,n,r);return uE(s)}class dE extends Ov{constructor(e,t,n,r,s){super();const a=t?t.length-1:0,o=n?n.length:0;this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=r||0,this.endKnot=s||a;for(let l=0;l<o;++l){const c=n[l];this.controlPoints[l]=new et(c.x,c.y,c.z,c.w)}}getPoint(e,t=new D){const n=t,r=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=aE(this.degree,this.knots,this.controlPoints,r);return s.w!==1&&s.divideScalar(s.w),n.set(s.x,s.y,s.z)}getTangent(e,t=new D){const n=t,r=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),s=hE(this.degree,this.knots,this.controlPoints,r,1);return n.copy(s[1]).normalize(),n}toJSON(){const e=super.toJSON();return e.degree=this.degree,e.knots=[...this.knots],e.controlPoints=this.controlPoints.map(t=>t.toArray()),e.startKnot=this.startKnot,e.endKnot=this.endKnot,e}fromJSON(e){return super.fromJSON(e),this.degree=e.degree,this.knots=[...e.knots],this.controlPoints=e.controlPoints.map(t=>new et(t[0],t[1],t[2],t[3])),this.startKnot=e.startKnot,this.endKnot=e.endKnot,this}}let Ve,Et,zt;class fE extends Wi{constructor(e){super(e)}load(e,t,n,r){const s=this,a=s.path===""?RS.extractUrlBase(e):s.path,o=new TS(this.manager);o.setPath(s.path),o.setResponseType("arraybuffer"),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(l){try{t(s.parse(l,a))}catch(c){r?r(c):console.error(c),s.manager.itemError(e)}},n,r)}parse(e,t){if(vE(e))Ve=new xE().parse(e);else{const r=rp(e);if(!SE(r))throw new Error("THREE.FBXLoader: Unknown format.");if(Jh(r)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+Jh(r));Ve=new _E().parse(r)}const n=new Rc(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new pE(n,this.manager).parse(Ve)}}class pE{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){Et=this.parseConnections();const e=this.parseImages(),t=this.parseTextures(e),n=this.parseMaterials(t),r=this.parseDeformers(),s=new mE().parse(r);return this.parseScene(r,s,n),zt}parseConnections(){const e=new Map;return"Connections"in Ve&&Ve.Connections.connections.forEach(function(n){const r=n[0],s=n[1],a=n[2];e.has(r)||e.set(r,{parents:[],children:[]});const o={ID:s,relationship:a};e.get(r).parents.push(o),e.has(s)||e.set(s,{parents:[],children:[]});const l={ID:r,relationship:a};e.get(s).children.push(l)}),e}parseImages(){const e={},t={};if("Video"in Ve.Objects){const n=Ve.Objects.Video;for(const r in n){const s=n[r],a=parseInt(r);if(e[a]=s.RelativeFilename||s.Filename,"Content"in s){const o=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,l=typeof s.Content=="string"&&s.Content!=="";if(o||l){const c=this.parseImage(n[r]);t[s.RelativeFilename||s.Filename]=c}}}}for(const n in e){const r=e[n];t[r]!==void 0?e[n]=t[r]:e[n]=e[n].split("\\").pop()}return e}parseImage(e){const t=e.Content,n=e.RelativeFilename||e.Filename,r=n.slice(n.lastIndexOf(".")+1).toLowerCase();let s;switch(r){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),s="image/tga";break;case"webp":s="image/webp";break;default:console.warn('FBXLoader: Image type "'+r+'" is not supported.');return}if(typeof t=="string")return"data:"+s+";base64,"+t;{const a=new Uint8Array(t);return window.URL.createObjectURL(new Blob([a],{type:s}))}}parseTextures(e){const t=new Map;if("Texture"in Ve.Objects){const n=Ve.Objects.Texture;for(const r in n){const s=this.parseTexture(n[r],e);t.set(parseInt(r),s)}}return t}parseTexture(e,t){const n=this.loadTexture(e,t);n.ID=e.id,n.name=e.attrName;const r=e.WrapModeU,s=e.WrapModeV,a=r!==void 0?r.value:0,o=s!==void 0?s.value:0;if(n.wrapS=a===0?ns:Tn,n.wrapT=o===0?ns:Tn,"Scaling"in e){const l=e.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in e){const l=e.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(e,t){const n=e.FileName.split(".").pop().toLowerCase();let r=this.manager.getHandler(`.${n}`);r===null&&(r=this.textureLoader);const s=r.path;s||r.setPath(this.textureLoader.path);const a=Et.get(e.id).children;let o;if(a!==void 0&&a.length>0&&t[a[0].ID]!==void 0&&(o=t[a[0].ID],(o.indexOf("blob:")===0||o.indexOf("data:")===0)&&r.setPath(void 0)),o===void 0)return console.warn("FBXLoader: Undefined filename, creating placeholder texture."),new Pt;const l=r.load(o);return r.setPath(s),l}parseMaterials(e){const t=new Map;if("Material"in Ve.Objects){const n=Ve.Objects.Material;for(const r in n){const s=this.parseMaterial(n[r],e);s!==null&&t.set(parseInt(r),s)}}return t}parseMaterial(e,t){const n=e.id,r=e.attrName;let s=e.ShadingModel;if(typeof s=="object"&&(s=s.value),!Et.has(n))return null;const a=this.parseParameters(e,t,n);let o;switch(s.toLowerCase()){case"phong":o=new ia;break;case"lambert":o=new lS;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),o=new ia;break}return o.setValues(a),o.name=r,o}parseParameters(e,t,n){const r={};e.BumpFactor&&(r.bumpScale=e.BumpFactor.value),e.Diffuse?r.color=Oe.colorSpaceToWorking(new Ue().fromArray(e.Diffuse.value),rt):e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(r.color=Oe.colorSpaceToWorking(new Ue().fromArray(e.DiffuseColor.value),rt)),e.DisplacementFactor&&(r.displacementScale=e.DisplacementFactor.value),e.Emissive?r.emissive=Oe.colorSpaceToWorking(new Ue().fromArray(e.Emissive.value),rt):e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(r.emissive=Oe.colorSpaceToWorking(new Ue().fromArray(e.EmissiveColor.value),rt)),e.EmissiveFactor&&(r.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),r.opacity=1-(e.TransparencyFactor?parseFloat(e.TransparencyFactor.value):0),(r.opacity===1||r.opacity===0)&&(r.opacity=e.Opacity?parseFloat(e.Opacity.value):null,r.opacity===null&&(r.opacity=1)),r.opacity<1&&(r.transparent=!0),e.ReflectionFactor&&(r.reflectivity=e.ReflectionFactor.value),e.Shininess&&(r.shininess=e.Shininess.value),e.Specular?r.specular=Oe.colorSpaceToWorking(new Ue().fromArray(e.Specular.value),rt):e.SpecularColor&&e.SpecularColor.type==="Color"&&(r.specular=Oe.colorSpaceToWorking(new Ue().fromArray(e.SpecularColor.value),rt));const s=this;return Et.get(n).children.forEach(function(a){const o=a.relationship;switch(o){case"Bump":r.bumpMap=s.getTexture(t,a.ID);break;case"Maya|TEX_ao_map":r.aoMap=s.getTexture(t,a.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":r.map=s.getTexture(t,a.ID),r.map!==void 0&&(r.map.colorSpace=rt);break;case"DisplacementColor":r.displacementMap=s.getTexture(t,a.ID);break;case"EmissiveColor":r.emissiveMap=s.getTexture(t,a.ID),r.emissiveMap!==void 0&&(r.emissiveMap.colorSpace=rt);break;case"NormalMap":case"Maya|TEX_normal_map":r.normalMap=s.getTexture(t,a.ID);break;case"ReflectionColor":r.envMap=s.getTexture(t,a.ID),r.envMap!==void 0&&(r.envMap.mapping=fa,r.envMap.colorSpace=rt);break;case"SpecularColor":r.specularMap=s.getTexture(t,a.ID),r.specularMap!==void 0&&(r.specularMap.colorSpace=rt);break;case"TransparentColor":case"TransparencyFactor":r.alphaMap=s.getTexture(t,a.ID),r.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",o);break}}),r}getTexture(e,t){return"LayeredTexture"in Ve.Objects&&t in Ve.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=Et.get(t).children[0].ID),e.get(t)}parseDeformers(){const e={},t={};if("Deformer"in Ve.Objects){const n=Ve.Objects.Deformer;for(const r in n){const s=n[r],a=Et.get(parseInt(r));if(s.attrType==="Skin"){const o=this.parseSkeleton(a,n);o.ID=r,a.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),o.geometryID=a.parents[0].ID,e[r]=o}else if(s.attrType==="BlendShape"){const o={id:r};o.rawTargets=this.parseMorphTargets(a,n),o.id=r,a.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[r]=o}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){const n=[];return e.children.forEach(function(r){const s=t[r.ID];if(s.attrType!=="Cluster")return;const a={ID:r.ID,indices:[],weights:[],transformLink:new we().fromArray(s.TransformLink.a)};"Indexes"in s&&(a.indices=s.Indexes.a,a.weights=s.Weights.a),n.push(a)}),{rawBones:n,bones:[]}}parseMorphTargets(e,t){const n=[];for(let r=0;r<e.children.length;r++){const s=e.children[r],a=t[s.ID],o={name:a.attrName,initialWeight:a.DeformPercent,id:a.id,fullWeights:a.FullWeights.a};if(a.attrType!=="BlendShapeChannel")return;o.geoID=Et.get(parseInt(s.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(o)}return n}parseScene(e,t,n){zt=new mn;const r=this.parseModels(e.skeletons,t,n),s=Ve.Objects.Model,a=this;r.forEach(function(u){const d=s[u.ID];a.setLookAtProperties(u,d),Et.get(u.ID).parents.forEach(function(p){const _=r.get(p.ID);_!==void 0&&_.add(u)}),u.parent===null&&zt.add(u)}),this.addGlobalSceneSettings(),zt.traverse(function(u){if(u.userData.transformData){u.parent&&(u.userData.transformData.parentMatrix=u.parent.matrix,u.userData.transformData.parentMatrixWorld=u.parent.matrixWorld);const d=ip(u.userData.transformData);u.applyMatrix4(d),u.updateWorldMatrix()}});const o=this.parsePoseNodes(),l=new Set;for(const u in e.skeletons)e.skeletons[u].rawBones.forEach(function(d,f){const p=e.skeletons[u].bones[f];p&&l.add(p.ID)});const c=new we;zt.traverse(function(u){if(u.isBone&&u.ID!==void 0&&!l.has(u.ID)){const d=o[u.ID];d!==void 0&&(u.parent?(c.copy(u.parent.matrixWorld).invert(),c.multiply(d)):c.copy(d),c.decompose(u.position,u.quaternion,u.scale),u.updateMatrix(),u.matrixWorld.copy(d))}}),this.bindSkeleton(e.skeletons,t,r);const h=new gE().parse();zt.children.length===1&&zt.children[0].isGroup&&(zt.children[0].animations=h,zt=zt.children[0]),zt.animations=h,"GlobalSettings"in Ve&&"UpAxis"in Ve.GlobalSettings&&Ve.GlobalSettings.UpAxis.value===2&&(console.warn("THREE.FBXLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted."),zt.rotation.set(-Math.PI/2,0,0))}parseModels(e,t,n){const r=new Map,s=Ve.Objects.Model;for(const a in s){const o=parseInt(a),l=s[a],c=Et.get(o);let h=this.buildSkeleton(c,e,o,l.attrName);if(!h){switch(l.attrType){case"Camera":h=this.createCamera(c);break;case"Light":h=this.createLight(c);break;case"Mesh":h=this.createMesh(c,t,n);break;case"NurbsCurve":h=this.createCurve(c,t);break;case"LimbNode":case"Root":h=new ls;break;case"Null":default:h=new mn;break}h.name=l.attrName?Je.sanitizeNodeName(l.attrName):"",h.userData.originalName=l.attrName,h.ID=o}this.getTransformData(h,l),r.set(o,h)}return r}buildSkeleton(e,t,n,r){let s=null;return e.parents.forEach(function(a){for(const o in t){const l=t[o];l.rawBones.forEach(function(c,h){if(c.ID===a.ID){const u=s;s=new ls,s.matrixWorld.copy(c.transformLink),s.name=r?Je.sanitizeNodeName(r):"",s.userData.originalName=r,s.ID=n,l.bones[h]=s,u!==null&&s.add(u)}})}}),s}createCamera(e){let t,n;if(e.children.forEach(function(r){const s=Ve.Objects.NodeAttribute[r.ID];s!==void 0&&(n=s)}),n===void 0)t=new _t;else{let r=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(r=1);let s=1;n.NearPlane!==void 0&&(s=n.NearPlane.value/1e3);let a=1e3;n.FarPlane!==void 0&&(a=n.FarPlane.value/1e3);let o=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(o=n.AspectWidth.value,l=n.AspectHeight.value);const c=o/l;let h=45;n.FieldOfView!==void 0&&(h=n.FieldOfView.value);const u=n.FocalLength?n.FocalLength.value:null;switch(r){case 0:t=new Qt(h,c,s,a),u!==null&&t.setFocalLength(u);break;case 1:console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."),t=new _t;break;default:console.warn("THREE.FBXLoader: Unknown camera type "+r+"."),t=new _t;break}}return t}createLight(e){let t,n;if(e.children.forEach(function(r){const s=Ve.Objects.NodeAttribute[r.ID];s!==void 0&&(n=s)}),n===void 0)t=new _t;else{let r;n.LightType===void 0?r=0:r=n.LightType.value;let s=16777215;n.Color!==void 0&&(s=Oe.colorSpaceToWorking(new Ue().fromArray(n.Color.value),rt));let a=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(a=0);let o=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?o=0:o=n.FarAttenuationEnd.value);const l=1;switch(r){case 0:t=new wh(s,a,o,l);break;case 1:t=new kf(s,a);break;case 2:let c=Math.PI/3,h=0;n.OuterAngle!==void 0?(c=Jt.degToRad(n.OuterAngle.value),n.InnerAngle!==void 0&&(h=1-n.InnerAngle.value/n.OuterAngle.value,h=Math.max(0,h))):n.InnerAngle!==void 0&&(c=Jt.degToRad(n.InnerAngle.value)),t=new ES(s,a,o,c,h,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),t=new wh(s,a);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,n){let r,s=null,a=null;const o=[];if(e.children.forEach(function(l){t.has(l.ID)&&(s=t.get(l.ID)),n.has(l.ID)&&o.push(n.get(l.ID))}),o.length>1?a=o:o.length>0?a=o[0]:(a=new ia({name:Wi.DEFAULT_MATERIAL_NAME,color:13421772}),o.push(a)),"color"in s.attributes&&o.forEach(function(l){l.vertexColors=!0}),s.groups.length>0){let l=!1;for(let c=0,h=s.groups.length;c<h;c++){const u=s.groups[c];(u.materialIndex<0||u.materialIndex>=o.length)&&(u.materialIndex=o.length,l=!0)}if(l){const c=new ia;o.push(c)}}return s.FBX_Deformer?(r=new Rv(s,a),r.normalizeSkinWeights()):r=new ft(s,a),r}createCurve(e,t){const n=e.children.reduce(function(s,a){return t.has(a.ID)&&(s=t.get(a.ID)),s},null),r=new wc({name:Wi.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new wf(n,r)}getTransformData(e,t){const n={};"InheritType"in t&&(n.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?n.eulerOrder=ps(t.RotationOrder.value):n.eulerOrder=ps(0),"Lcl_Translation"in t&&(n.translation=t.Lcl_Translation.value),"PreRotation"in t&&(n.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(n.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(n.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(n.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(n.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(n.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(n.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(n.rotationPivot=t.RotationPivot.value),e.userData.transformData=n}setLookAtProperties(e,t){"LookAtProperty"in t&&Et.get(e.ID).children.forEach(function(r){if(r.relationship==="LookAtProperty"){const s=Ve.Objects.Model[r.ID];if("Lcl_Translation"in s){const a=s.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(a),zt.add(e.target)):e.lookAt(new D().fromArray(a))}}})}bindSkeleton(e,t,n){for(const r in e){const s=e[r],a=[];for(let l=0,c=s.bones.length;l<c;l++){const h=new we;s.bones[l]&&s.rawBones[l]&&h.copy(s.rawBones[l].transformLink).invert(),a.push(h)}Et.get(parseInt(s.ID)).parents.forEach(function(l){if(t.has(l.ID)){const c=l.ID;Et.get(c).parents.forEach(function(u){if(n.has(u.ID)){const d=n.get(u.ID);d.updateMatrixWorld(!0),d.bind(new Tc(s.bones,a),d.matrixWorld)}})}})}}parsePoseNodes(){const e={};if("Pose"in Ve.Objects){const t=Ve.Objects.Pose;for(const n in t)if(t[n].attrType==="BindPose"&&t[n].NbPoseNodes>0){const r=t[n].PoseNode;Array.isArray(r)?r.forEach(function(s){e[s.Node]=new we().fromArray(s.Matrix.a)}):e[r.Node]=new we().fromArray(r.Matrix.a)}}return e}addGlobalSceneSettings(){if("GlobalSettings"in Ve){if("AmbientColor"in Ve.GlobalSettings){const e=Ve.GlobalSettings.AmbientColor.value,t=e[0],n=e[1],r=e[2];if(t!==0||n!==0||r!==0){const s=new Ue().setRGB(t,n,r,rt);zt.add(new zf(s,1))}}"UnitScaleFactor"in Ve.GlobalSettings&&(zt.userData.unitScaleFactor=Ve.GlobalSettings.UnitScaleFactor.value)}}}class mE{constructor(){this.negativeMaterialIndices=!1}parse(e){const t=new Map;if("Geometry"in Ve.Objects){const n=Ve.Objects.Geometry;for(const r in n){const s=Et.get(parseInt(r)),a=this.parseGeometry(s,n[r],e);t.set(parseInt(r),a)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,n){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,n);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,n){const r=n.skeletons,s=[],a=e.parents.map(function(u){return Ve.Objects.Model[u.ID]});if(a.length===0)return;const o=e.children.reduce(function(u,d){return r[d.ID]!==void 0&&(u=r[d.ID]),u},null);e.children.forEach(function(u){n.morphTargets[u.ID]!==void 0&&s.push(n.morphTargets[u.ID])});const l=a[0],c={};"RotationOrder"in l&&(c.eulerOrder=ps(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);const h=ip(c);return this.genGeometry(t,o,s,h)}genGeometry(e,t,n,r){const s=new jt;e.attrName&&(s.name=e.attrName);const a=this.parseGeoNode(e,t),o=this.genBuffers(a),l=new xt(o.vertex,3);if(l.applyMatrix4(r),s.setAttribute("position",l),o.colors.length>0&&s.setAttribute("color",new xt(o.colors,3)),t&&(s.setAttribute("skinIndex",new Sc(o.weightsIndices,4)),s.setAttribute("skinWeight",new xt(o.vertexWeights,4)),s.FBX_Deformer=t),o.normal.length>0){const c=new Be().getNormalMatrix(r),h=new xt(o.normal,3);h.applyNormalMatrix(c),s.setAttribute("normal",h)}if(o.uvs.forEach(function(c,h){const u=h===0?"uv":`uv${h}`;s.setAttribute(u,new xt(o.uvs[h],2))}),a.material&&a.material.mappingType!=="AllSame"){let c=o.materialIndex[0],h=0;if(o.materialIndex.forEach(function(u,d){u!==c&&(s.addGroup(h,d-h,c),c=u,h=d)}),s.groups.length>0){const u=s.groups[s.groups.length-1],d=u.start+u.count;d!==o.materialIndex.length&&s.addGroup(d,o.materialIndex.length-d,c)}s.groups.length===0&&s.addGroup(0,o.materialIndex.length,o.materialIndex[0])}return this.addMorphTargets(s,e,n,r),s}parseGeoNode(e,t){const n={};if(n.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],n.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&e.LayerElementColor[0].Colors&&(n.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(n.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(n.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){n.uv=[];let r=0;for(;e.LayerElementUV[r];)e.LayerElementUV[r].UV&&n.uv.push(this.parseUVs(e.LayerElementUV[r])),r++}return n.weightTable={},t!==null&&(n.skeleton=t,t.rawBones.forEach(function(r,s){r.indices.forEach(function(a,o){n.weightTable[a]===void 0&&(n.weightTable[a]=[]),n.weightTable[a].push({id:s,weight:r.weights[o]})})})),n}genBuffers(e){const t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let n=0,r=0,s=!1,a=[],o=[],l=[],c=[],h=[],u=[];const d=this;return e.vertexIndices.forEach(function(f,p){let _,g=!1;f<0&&(f=f^-1,g=!0);let m=[],S=[];if(a.push(f*3,f*3+1,f*3+2),e.color){const M=la(p,n,f,e.color);l.push(M[0],M[1],M[2])}if(e.skeleton){if(e.weightTable[f]!==void 0&&e.weightTable[f].forEach(function(M){S.push(M.weight),m.push(M.id)}),S.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);const M=[0,0,0,0],y=[0,0,0,0];S.forEach(function(A,b){let R=A,v=m[b];y.forEach(function(E,P,C){if(R>E){C[P]=R,R=E;const N=M[P];M[P]=v,v=N}})}),m=M,S=y}for(;S.length<4;)S.push(0),m.push(0);for(let M=0;M<4;++M)h.push(S[M]),u.push(m[M])}if(e.normal){const M=la(p,n,f,e.normal);o.push(M[0],M[1],M[2])}e.material&&e.material.mappingType!=="AllSame"&&(_=la(p,n,f,e.material)[0],_<0&&(d.negativeMaterialIndices=!0,_=0)),e.uv&&e.uv.forEach(function(M,y){const A=la(p,n,f,M);c[y]===void 0&&(c[y]=[]),c[y].push(A[0]),c[y].push(A[1])}),r++,g&&(d.genFace(t,e,a,_,o,l,c,h,u,r),n++,r=0,a=[],o=[],l=[],c=[],h=[],u=[])}),t}getNormalNewell(e){const t=new D(0,0,0);for(let n=0;n<e.length;n++){const r=e[n],s=e[(n+1)%e.length];t.x+=(r.y-s.y)*(r.z+s.z),t.y+=(r.z-s.z)*(r.x+s.x),t.z+=(r.x-s.x)*(r.y+s.y)}return t.normalize(),t}getNormalTangentAndBitangent(e){const t=this.getNormalNewell(e),r=(Math.abs(t.z)>.5?new D(0,1,0):new D(0,0,1)).cross(t).normalize(),s=t.clone().cross(r).normalize();return{normal:t,tangent:r,bitangent:s}}flattenVertex(e,t,n){return new $e(e.dot(t),e.dot(n))}genFace(e,t,n,r,s,a,o,l,c,h){let u;if(h>3){const d=[],f=t.baseVertexPositions||t.vertexPositions;for(let m=0;m<n.length;m+=3)d.push(new D(f[n[m]],f[n[m+1]],f[n[m+2]]));const{tangent:p,bitangent:_}=this.getNormalTangentAndBitangent(d),g=[];for(const m of d)g.push(this.flattenVertex(m,p,_));u=Ac.triangulateShape(g,[])}else u=[[0,1,2]];for(const[d,f,p]of u)e.vertex.push(t.vertexPositions[n[d*3]]),e.vertex.push(t.vertexPositions[n[d*3+1]]),e.vertex.push(t.vertexPositions[n[d*3+2]]),e.vertex.push(t.vertexPositions[n[f*3]]),e.vertex.push(t.vertexPositions[n[f*3+1]]),e.vertex.push(t.vertexPositions[n[f*3+2]]),e.vertex.push(t.vertexPositions[n[p*3]]),e.vertex.push(t.vertexPositions[n[p*3+1]]),e.vertex.push(t.vertexPositions[n[p*3+2]]),t.skeleton&&(e.vertexWeights.push(l[d*4]),e.vertexWeights.push(l[d*4+1]),e.vertexWeights.push(l[d*4+2]),e.vertexWeights.push(l[d*4+3]),e.vertexWeights.push(l[f*4]),e.vertexWeights.push(l[f*4+1]),e.vertexWeights.push(l[f*4+2]),e.vertexWeights.push(l[f*4+3]),e.vertexWeights.push(l[p*4]),e.vertexWeights.push(l[p*4+1]),e.vertexWeights.push(l[p*4+2]),e.vertexWeights.push(l[p*4+3]),e.weightsIndices.push(c[d*4]),e.weightsIndices.push(c[d*4+1]),e.weightsIndices.push(c[d*4+2]),e.weightsIndices.push(c[d*4+3]),e.weightsIndices.push(c[f*4]),e.weightsIndices.push(c[f*4+1]),e.weightsIndices.push(c[f*4+2]),e.weightsIndices.push(c[f*4+3]),e.weightsIndices.push(c[p*4]),e.weightsIndices.push(c[p*4+1]),e.weightsIndices.push(c[p*4+2]),e.weightsIndices.push(c[p*4+3])),t.color&&(e.colors.push(a[d*3]),e.colors.push(a[d*3+1]),e.colors.push(a[d*3+2]),e.colors.push(a[f*3]),e.colors.push(a[f*3+1]),e.colors.push(a[f*3+2]),e.colors.push(a[p*3]),e.colors.push(a[p*3+1]),e.colors.push(a[p*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(r),e.materialIndex.push(r),e.materialIndex.push(r)),t.normal&&(e.normal.push(s[d*3]),e.normal.push(s[d*3+1]),e.normal.push(s[d*3+2]),e.normal.push(s[f*3]),e.normal.push(s[f*3+1]),e.normal.push(s[f*3+2]),e.normal.push(s[p*3]),e.normal.push(s[p*3+1]),e.normal.push(s[p*3+2])),t.uv&&t.uv.forEach(function(_,g){e.uvs[g]===void 0&&(e.uvs[g]=[]),e.uvs[g].push(o[g][d*2]),e.uvs[g].push(o[g][d*2+1]),e.uvs[g].push(o[g][f*2]),e.uvs[g].push(o[g][f*2+1]),e.uvs[g].push(o[g][p*2]),e.uvs[g].push(o[g][p*2+1])})}addMorphTargets(e,t,n,r){if(n.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];const s=r.clone().setPosition(0,0,0),a=this;n.forEach(function(o){o.rawTargets.forEach(function(l){const c=Ve.Objects.Geometry[l.geoID];c!==void 0&&a.genMorphGeometry(e,t,c,s,l.name)})})}genMorphGeometry(e,t,n,r,s){const a=t.Vertices!==void 0?t.Vertices.a:[],o=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],l=n.Vertices!==void 0?n.Vertices.a:[],c=n.Indexes!==void 0?n.Indexes.a:[],h=e.attributes.position.count*3,u=new Float32Array(h);for(let _=0;_<c.length;_++){const g=c[_]*3;u[g]=l[_*3],u[g+1]=l[_*3+1],u[g+2]=l[_*3+2]}const d={vertexIndices:o,vertexPositions:u,baseVertexPositions:a},f=this.genBuffers(d),p=new xt(f.vertex,3);p.name=s||n.attrName,p.applyMatrix4(r),e.morphAttributes.position.push(p)}parseNormals(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.Normals.a;let s=[];return n==="IndexToDirect"&&("NormalIndex"in e?s=e.NormalIndex.a:"NormalsIndex"in e&&(s=e.NormalsIndex.a)),{dataSize:3,buffer:r,indices:s,mappingType:t,referenceType:n}}parseUVs(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.UV.a;let s=[];return n==="IndexToDirect"&&(s=e.UVIndex.a),{dataSize:2,buffer:r,indices:s,mappingType:t,referenceType:n}}parseVertexColors(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,r=e.Colors.a;let s=[];n==="IndexToDirect"&&(s=e.ColorIndex.a);for(let a=0,o=new Ue;a<r.length;a+=4)o.fromArray(r,a),Oe.colorSpaceToWorking(o,rt),o.toArray(r,a);return{dataSize:4,buffer:r,indices:s,mappingType:t,referenceType:n}}parseMaterialIndices(e){const t=e.MappingInformationType,n=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};const r=e.Materials.a,s=[];for(let a=0;a<r.length;++a)s.push(a);return{dataSize:1,buffer:r,indices:s,mappingType:t,referenceType:n}}parseNurbsGeometry(e){const t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new jt;const n=t-1,r=e.KnotVector.a,s=[],a=e.Points.a;for(let u=0,d=a.length;u<d;u+=4)s.push(new et().fromArray(a,u));let o,l;if(e.Form==="Closed")s.push(s[0]);else if(e.Form==="Periodic"){o=n,l=r.length-1-o;for(let u=0;u<n;++u)s.push(s[u])}const h=new dE(n,r,s,o,l).getPoints(s.length*12);return new jt().setFromPoints(h)}}class gE{parse(){const e=[],t=this.parseClips();if(t!==void 0)for(const n in t){const r=t[n],s=this.addClip(r);e.push(s)}return e}parseClips(){if(Ve.Objects.AnimationCurve===void 0)return;const e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);const t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){const e=Ve.Objects.AnimationCurveNode,t=new Map;for(const n in e){const r=e[n];if(r.attrName.match(/S|R|T|DeformPercent/)!==null){const s={id:r.id,attr:r.attrName,curves:{}};t.set(s.id,s)}}return t}parseAnimationCurves(e){const t=Ve.Objects.AnimationCurve;for(const n in t){const r={id:t[n].id,times:t[n].KeyTime.a.map(ME),values:t[n].KeyValueFloat.a},s=Et.get(r.id);if(s!==void 0){const a=s.parents[0].ID,o=s.parents[0].relationship;o.match(/X/)?e.get(a).curves.x=r:o.match(/Y/)?e.get(a).curves.y=r:o.match(/Z/)?e.get(a).curves.z=r:o.match(/DeformPercent/)&&e.has(a)&&(e.get(a).curves.morph=r)}}}parseAnimationLayers(e){const t=Ve.Objects.AnimationLayer,n=new Map;for(const r in t){const s=[],a=Et.get(parseInt(r));a!==void 0&&(a.children.forEach(function(l,c){if(e.has(l.ID)){const h=e.get(l.ID);if(h.curves.x!==void 0||h.curves.y!==void 0||h.curves.z!==void 0){if(s[c]===void 0){const u=Et.get(l.ID).parents.filter(function(f){return f.relationship!==void 0});if(u.length===0)return;const d=u[0].ID;if(d!==void 0){const f=Ve.Objects.Model[d.toString()];if(f===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}const p={modelName:f.attrName?Je.sanitizeNodeName(f.attrName):"",ID:f.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};zt.traverse(function(_){_.ID===f.id&&(p.transform=_.matrix,_.userData.transformData&&(p.eulerOrder=_.userData.transformData.eulerOrder,_.userData.transformData.rotation&&(p.initialRotation=_.userData.transformData.rotation)))}),p.transform||(p.transform=new we),"PreRotation"in f&&(p.preRotation=f.PreRotation.value),"PostRotation"in f&&(p.postRotation=f.PostRotation.value),s[c]=p}}s[c]&&(s[c][h.attr]=h)}else if(h.curves.morph!==void 0){if(s[c]===void 0){const u=Et.get(l.ID).parents.filter(function(S){return S.relationship!==void 0});if(u.length===0)return;const d=u[0].ID,f=Et.get(d).parents[0].ID,p=Et.get(f).parents[0].ID,_=Et.get(p).parents[0].ID,g=Ve.Objects.Model[_],m={modelName:g.attrName?Je.sanitizeNodeName(g.attrName):"",morphName:Ve.Objects.Deformer[d].attrName};s[c]=m}s[c][h.attr]=h}}}),n.set(parseInt(r),s))}return n}parseAnimStacks(e){const t=Ve.Objects.AnimationStack,n={};for(const r in t){const s=Et.get(parseInt(r)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const a=e.get(s[0].ID);n[r]={name:t[r].attrName,layer:a}}return n}addClip(e){let t=[];const n=this;return e.layer.forEach(function(r){t=t.concat(n.generateTracks(r))}),new Zl(e.name,-1,t)}generateTracks(e){const t=[];let n=new D,r=new D;if(e.transform&&e.transform.decompose(n,new Rt,r),n=n.toArray(),r=r.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.T.curves,n,"position");s!==void 0&&t.push(s)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){const s=this.generateRotationTrack(e.modelName,e.R.curves,e.preRotation,e.postRotation,e.eulerOrder,e.initialRotation);s!==void 0&&t.push(s)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.S.curves,r,"scale");s!==void 0&&t.push(s)}if(e.DeformPercent!==void 0){const s=this.generateMorphTrack(e);s!==void 0&&t.push(s)}return t}generateVectorTrack(e,t,n,r){const s=this.getTimesForAllAxes(t),a=this.getKeyframeTrackValues(s,t,n);return new fs(e+"."+r,s,a)}generateRotationTrack(e,t,n,r,s,a){let o,l;if(t.x!==void 0||t.y!==void 0||t.z!==void 0){const f=this.getTimesForAllAxes(t);if(f.length>0){const p=a||[0,0,0],_=this.synchronizeCurve(t.x,f,p[0]),g=this.synchronizeCurve(t.y,f,p[1]),m=this.synchronizeCurve(t.z,f,p[2]),S=this.interpolateRotations(_,g,m,s);o=S[0],l=S[1]}}const c=ps(0);n!==void 0&&(n=n.map(Jt.degToRad),n.push(c),n=new Vt().fromArray(n),n=new Rt().setFromEuler(n)),r!==void 0&&(r=r.map(Jt.degToRad),r.push(c),r=new Vt().fromArray(r),r=new Rt().setFromEuler(r).invert());const h=new Rt,u=new Vt,d=[];if(!(!l||!o)){for(let f=0;f<l.length;f+=3)u.set(l[f],l[f+1],l[f+2],s),h.setFromEuler(u),n!==void 0&&h.premultiply(n),r!==void 0&&h.multiply(r),f>2&&new Rt().fromArray(d,(f-3)/3*4).dot(h)<0&&h.set(-h.x,-h.y,-h.z,-h.w),h.toArray(d,f/3*4);return new ys(e+".quaternion",o,d)}}generateMorphTrack(e){const t=e.DeformPercent.curves.morph,n=t.values.map(function(s){return s/100}),r=zt.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new ds(e.modelName+".morphTargetInfluences["+r+"]",t.times,n)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(n,r){return n-r}),t.length>1){let n=1,r=t[0];for(let s=1;s<t.length;s++){const a=t[s];a!==r&&(t[n]=a,r=a,n++)}t=t.slice(0,n)}return t}getKeyframeTrackValues(e,t,n){const r=n,s=[];let a=-1,o=-1,l=-1;return e.forEach(function(c){if(t.x&&(a=t.x.times.indexOf(c)),t.y&&(o=t.y.times.indexOf(c)),t.z&&(l=t.z.times.indexOf(c)),a!==-1){const h=t.x.values[a];s.push(h),r[0]=h}else s.push(r[0]);if(o!==-1){const h=t.y.values[o];s.push(h),r[1]=h}else s.push(r[1]);if(l!==-1){const h=t.z.values[l];s.push(h),r[2]=h}else s.push(r[2])}),s}synchronizeCurve(e,t,n){if(e===void 0)return{times:t,values:t.map(()=>n)};if(e.times.length===t.length)return e;const r=[];for(let s=0;s<t.length;s++)r.push(this.sampleCurveValue(e,t[s],n));return{times:t,values:r}}sampleCurveValue(e,t,n){const r=e.times,s=e.values;if(t<=r[0])return s[0];if(t>=r[r.length-1])return s[s.length-1];for(let a=0;a<r.length-1;a++)if(t>=r[a]&&t<=r[a+1]){if(r[a]===t)return s[a];const o=(t-r[a])/(r[a+1]-r[a]);return s[a]*(1-o)+s[a+1]*o}return n}interpolateRotations(e,t,n,r){const s=[],a=[];s.push(e.times[0]),a.push(Jt.degToRad(e.values[0])),a.push(Jt.degToRad(t.values[0])),a.push(Jt.degToRad(n.values[0]));for(let o=1;o<e.values.length;o++){const l=[e.values[o-1],t.values[o-1],n.values[o-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;const c=l.map(Jt.degToRad),h=[e.values[o],t.values[o],n.values[o]];if(isNaN(h[0])||isNaN(h[1])||isNaN(h[2]))continue;const u=h.map(Jt.degToRad),d=[h[0]-l[0],h[1]-l[1],h[2]-l[2]],f=[Math.abs(d[0]),Math.abs(d[1]),Math.abs(d[2])];if(f[0]>=180||f[1]>=180||f[2]>=180){const _=Math.max(...f)/180,g=new Vt(...c,r),m=new Vt(...u,r),S=new Rt().setFromEuler(g),M=new Rt().setFromEuler(m);S.dot(M)<0&&M.set(-M.x,-M.y,-M.z,-M.w);const y=e.times[o-1],A=e.times[o]-y,b=new Rt,R=new Vt;for(let v=0;v<1;v+=1/_)b.copy(S.clone().slerp(M.clone(),v)),s.push(y+v*A),R.setFromQuaternion(b,r),a.push(R.x),a.push(R.y),a.push(R.z)}else s.push(e.times[o]),a.push(Jt.degToRad(e.values[o])),a.push(Jt.degToRad(t.values[o])),a.push(Jt.degToRad(n.values[o]))}return[s,a]}}class _E{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new np,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const t=this,n=e.split(/[\r\n]+/);return n.forEach(function(r,s){const a=r.match(/^[\s\t]*;/),o=r.match(/^[\s\t]*$/);if(a||o)return;const l=r.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),c=r.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),h=r.match("^\\t{"+(t.currentIndent-1)+"}}");l?t.parseNodeBegin(r,l):c?t.parseNodeProperty(r,c,n[++s]):h?t.popStack():r.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(r)}),this.allNodes}parseNodeBegin(e,t){const n=t[1].trim().replace(/^"/,"").replace(/"$/,""),r=t[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:n},a=this.parseNodeAttr(r),o=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,s):n in o?(n==="PoseNode"?o.PoseNode.push(s):o[n].id!==void 0&&(o[n]={},o[n][o[n].id]=o[n]),a.id!==""&&(o[n][a.id]=s)):typeof a.id=="number"?(o[n]={},o[n][a.id]=s):n!=="Properties70"&&(n==="PoseNode"?o[n]=[s]:o[n]=s),typeof a.id=="number"&&(s.id=a.id),a.name!==""&&(s.attrName=a.name),a.type!==""&&(s.attrType=a.type),this.pushStack(s)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let n="",r="";return e.length>1&&(n=e[1].replace(/^(\w+)::/,""),r=e[2]),{id:t,name:n,type:r}}parseNodeProperty(e,t,n){let r=t[1].replace(/^"/,"").replace(/"$/,"").trim(),s=t[2].replace(/^"/,"").replace(/"$/,"").trim();r==="Content"&&s===","&&(s=n.replace(/"/g,"").replace(/,$/,"").trim());const a=this.getCurrentNode();if(a.name==="Properties70"){this.parseNodeSpecialProperty(e,r,s);return}if(r==="C"){const l=s.split(",").slice(1),c=parseInt(l[0]),h=parseInt(l[1]);let u=s.split(",").slice(3);u=u.map(function(d){return d.trim().replace(/^"/,"")}),r="connections",s=[c,h],TE(s,u),a[r]===void 0&&(a[r]=[])}r==="Node"&&(a.id=s),r in a&&Array.isArray(a[r])?a[r].push(s):r!=="a"?a[r]=s:a.a=s,this.setCurrentProp(a,r),r==="a"&&s.slice(-1)!==","&&(a.a=Ko(s))}parseNodePropertyContinued(e){const t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=Ko(t.a))}parseNodeSpecialProperty(e,t,n){const r=n.split('",').map(function(h){return h.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=r[0],a=r[1],o=r[2],l=r[3];let c=r[4];switch(a){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=Ko(c);break}this.getPrevNode()[s]={type:a,type2:o,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),s)}}class xE{parse(e){const t=new Zh(e);t.skip(23);const n=t.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);const r=new np;for(;!this.endOfContent(t);){const s=this.parseNode(t,n);s!==null&&r.add(s.name,s)}return r}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){const n={},r=t>=7500?e.getUint64():e.getUint32(),s=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();const a=e.getUint8(),o=e.getString(a);if(r===0)return null;const l=[];for(let d=0;d<s;d++)l.push(this.parseProperty(e));const c=l.length>0?l[0]:"",h=l.length>1?l[1]:"",u=l.length>2?l[2]:"";for(n.singleProperty=s===1&&e.getOffset()===r;r>e.getOffset();){const d=this.parseNode(e,t);d!==null&&this.parseSubNode(o,n,d)}return n.propertyList=l,typeof c=="number"&&(n.id=c),h!==""&&(n.attrName=h),u!==""&&(n.attrType=u),o!==""&&(n.name=o),n}parseSubNode(e,t,n){if(n.singleProperty===!0){const r=n.propertyList[0];Array.isArray(r)?(t[n.name]=n,n.a=r):t[n.name]=r}else if(e==="Connections"&&n.name==="C"){const r=[];n.propertyList.forEach(function(s,a){a!==0&&r.push(s)}),t.connections===void 0&&(t.connections=[]),t.connections.push(r)}else if(n.name==="Properties70")Object.keys(n).forEach(function(s){t[s]=n[s]});else if(e==="Properties70"&&n.name==="P"){let r=n.propertyList[0],s=n.propertyList[1];const a=n.propertyList[2],o=n.propertyList[3];let l;r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],t[r]={type:s,type2:a,flag:o,value:l}}else t[n.name]===void 0?typeof n.id=="number"?(t[n.name]={},t[n.name][n.id]=n):t[n.name]=n:n.name==="PoseNode"?(Array.isArray(t[n.name])||(t[n.name]=[t[n.name]]),t[n.name].push(n)):t[n.name][n.id]===void 0&&(t[n.name][n.id]=n)}parseProperty(e){const t=e.getString(1);let n;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return n=e.getUint32(),e.getArrayBuffer(n);case"S":return n=e.getUint32(),e.getString(n);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const r=e.getUint32(),s=e.getUint32(),a=e.getUint32();if(s===0)switch(t){case"b":case"c":return e.getBooleanArray(r);case"d":return e.getFloat64Array(r);case"f":return e.getFloat32Array(r);case"i":return e.getInt32Array(r);case"l":return e.getInt64Array(r)}const o=nE(new Uint8Array(e.getArrayBuffer(a))),l=new Zh(o.buffer);switch(t){case"b":case"c":return l.getBooleanArray(r);case"d":return l.getFloat64Array(r);case"f":return l.getFloat32Array(r);case"i":return l.getInt32Array(r);case"l":return l.getInt64Array(r)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}}class Zh{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){const t=[];for(let n=0;n<e;n++)t.push(this.getBoolean());return t}getUint8(){const e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){const e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){const e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt32());return t}getUint32(){const e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){const e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat32());return t}getFloat64(){const e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat64());return t}getArrayBuffer(e){const t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){const t=this.offset;let n=new Uint8Array(this.dv.buffer,t,e);this.skip(e);const r=n.indexOf(0);return r>=0&&(n=new Uint8Array(this.dv.buffer,t,r)),this._textDecoder.decode(n)}}class np{add(e,t){this[e]=t}}function vE(i){const e="Kaydara FBX Binary  \0";return i.byteLength>=e.length&&e===rp(i,0,e.length)}function SE(i){const e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let t=0;function n(r){const s=i[r-1];return i=i.slice(t+r),t++,s}for(let r=0;r<e.length;++r)if(n(1)===e[r])return!1;return!0}function Jh(i){const e=/FBXVersion: (\d+)/,t=i.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function ME(i){return i/46186158e3}const yE=[];function la(i,e,t,n){let r;switch(n.mappingType){case"ByPolygonVertex":r=i;break;case"ByPolygon":r=e;break;case"ByVertice":r=t;break;case"AllSame":r=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(r=n.indices[r]);const s=r*n.dataSize,a=s+n.dataSize;return bE(yE,n.buffer,s,a)}const jo=new Vt,hr=new D;function ip(i){const e=new we,t=new we,n=new we,r=new we,s=new we,a=new we,o=new we,l=new we,c=new we,h=new we,u=new we,d=new we,f=i.inheritType?i.inheritType:0;i.translation&&e.setPosition(hr.fromArray(i.translation));const p=ps(0);if(i.preRotation){const C=i.preRotation.map(Jt.degToRad);C.push(p),t.makeRotationFromEuler(jo.fromArray(C))}if(i.rotation){const C=i.rotation.map(Jt.degToRad);C.push(i.eulerOrder||p),n.makeRotationFromEuler(jo.fromArray(C))}if(i.postRotation){const C=i.postRotation.map(Jt.degToRad);C.push(p),r.makeRotationFromEuler(jo.fromArray(C)),r.invert()}i.scale&&s.scale(hr.fromArray(i.scale)),i.scalingOffset&&o.setPosition(hr.fromArray(i.scalingOffset)),i.scalingPivot&&a.setPosition(hr.fromArray(i.scalingPivot)),i.rotationOffset&&l.setPosition(hr.fromArray(i.rotationOffset)),i.rotationPivot&&c.setPosition(hr.fromArray(i.rotationPivot)),i.parentMatrixWorld&&(u.copy(i.parentMatrix),h.copy(i.parentMatrixWorld));const _=t.clone().multiply(n).multiply(r),g=new we;g.extractRotation(h);const m=new we;m.copyPosition(h);const S=m.clone().invert().multiply(h),M=g.clone().invert().multiply(S),y=s,A=new we;if(f===0)A.copy(g).multiply(_).multiply(M).multiply(y);else if(f===1)A.copy(g).multiply(M).multiply(_).multiply(y);else{const N=new we().scale(new D().setFromMatrixScale(u)).clone().invert(),G=M.clone().multiply(N);A.copy(g).multiply(_).multiply(G).multiply(y)}const b=c.clone().invert(),R=a.clone().invert();let v=e.clone().multiply(l).multiply(c).multiply(t).multiply(n).multiply(r).multiply(b).multiply(o).multiply(a).multiply(s).multiply(R);const E=new we().copyPosition(v),P=h.clone().multiply(E);return d.copyPosition(P),v=d.clone().multiply(A),v.premultiply(h.invert()),v}function ps(i){i=i||0;const e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return i===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[i]}function Ko(i){return i.split(",").map(function(t){return parseFloat(t)})}function rp(i,e,t){return e===void 0&&(e=0),t===void 0&&(t=i.byteLength),new TextDecoder().decode(new Uint8Array(i,e,t))}function TE(i,e){for(let t=0,n=i.length,r=e.length;t<r;t++,n++)i[n]=e[t]}function bE(i,e,t,n){for(let r=t,s=0;r<n;r++,s++)i[s]=e[r];return i}function wE(i){const e=new Map,t=new Map,n=i.clone();return sp(i,n,function(r,s){e.set(s,r),t.set(r,s)}),n.traverse(function(r){if(!r.isSkinnedMesh)return;const s=r,a=e.get(r),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function sp(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)sp(i.children[n],e.children[n],t)}const EE=new D(0,1,0),AE=.01;function ap(i,e){const t=new mn,n=wE(i);GE(n),t.add(n);const s=new kn().setFromObject(n).getSize(new D),a=s.y>0?e/s.y:1;n.scale.multiplyScalar(a),n.updateWorldMatrix(!0,!0);const o=new kn().setFromObject(n),l=o.getCenter(new D);return n.position.x-=l.x,n.position.y-=o.min.y,n.position.z-=l.z,n.updateWorldMatrix(!0,!0),t}function CE(i){let e=!1;return i.traverse(t=>{t instanceof ft&&t.geometry!=null&&(e=!0)}),e}function RE(i){const e=new Map;if(i.traverse(n=>{n instanceof ls&&e.set(n.name,n)}),e.size===0)return!1;let t=0;for(const n of e.values())for(const r of n.children)r instanceof ls&&(t+=kE(n,r)?1:0);return t+=dr(e.get("hips"),.05,"#4b2e83")?1:0,t+=dr(e.get("chest"),.065,"#4b2e83")?1:0,t+=dr(e.get("head"),.06,"#f5e9c9")?1:0,t+=dr(e.get("hand_l"),.028,"#f5e9c9")?1:0,t+=dr(e.get("hand_r"),.028,"#f5e9c9")?1:0,t+=dr(e.get("staff_l"),.025,"#c8a24b")?1:0,t+=zE(e.get("shield"))?1:0,t>0}function IE(i,e,t){const n=i.find(s=>s.duration>0&&s.tracks.length>0);if(n==null)return null;const r=PE(n.duration,e,t);return fS.subclip(n,`mage-loop-frames-${e}-${t}`,e,t+1,r)}function PE(i,e,t){const n=Math.max(1,t-e);return i>0?n/i:24}function LE(i){i.traverse(e=>{e instanceof ft&&Uc(e.material)&&(e.material=new Ss({color:"#4b2e83",roughness:.72,metalness:.05}))})}function DE(i){i.traverse(e=>{if(e instanceof ft){Uc(e.material)&&(e.material=op());for(const t of lp(e))t.side=an,t.transparent=!1,t.opacity=1,t.depthWrite=!0,t.needsUpdate=!0;e.visible=!0}})}function UE(i,e){i.traverse(t=>{if(!(t instanceof ft))return;const n=OE(t),r=Uc(t.material)?[n?Qh(e):op()]:lp(t).map(s=>n?Qh(e):BE(s));t.material=r.length===1?r[0]:r,t.visible=!0})}function NE(i){if(typeof document>"u")return i;const e=i.image,t=e.width??e.naturalWidth??e.videoWidth??0,n=e.height??e.naturalHeight??e.videoHeight??0;if(t<=0||n<=0)return i;const r=document.createElement("canvas");r.width=t,r.height=n;const s=r.getContext("2d");if(s==null)return i;s.drawImage(e,0,0,t,n);const a=s.getImageData(0,0,t,n),o=FE(a.data,t,n);a.data.set(o),s.putImageData(a,0,0);const l=new Cf(r);return l.colorSpace=rt,l.flipY=i.flipY,l.wrapS=i.wrapS,l.wrapT=i.wrapT,l.minFilter=i.minFilter,l.magFilter=i.magFilter,l.generateMipmaps=i.generateMipmaps,l.needsUpdate=!0,l}function FE(i,e,t,n={}){const r=n.iterations??8,s=n.targetAlphaMax??16,a=n.sourceAlphaMin??24,o=new Uint8ClampedArray(i);let l=new Uint8Array(e*t);for(let c=0;c<e*t;c+=1)l[c]=i[c*4+3]>=a?1:0;for(let c=0;c<r;c+=1){const h=new Uint8ClampedArray(o),u=new Uint8Array(l);let d=!1;for(let f=0;f<t;f+=1)for(let p=0;p<e;p+=1){const _=f*e+p,g=_*4;if(l[_]!==0||i[g+3]>s)continue;let m=0,S=0,M=0,y=0;for(let A=-1;A<=1;A+=1)for(let b=-1;b<=1;b+=1){if(b===0&&A===0)continue;const R=p+b,v=f+A;if(R<0||R>=e||v<0||v>=t)continue;const E=v*e+R;if(l[E]===0)continue;const P=E*4;m+=o[P],S+=o[P+1],M+=o[P+2],y+=1}y>0&&(h[g]=Math.round(m/y),h[g+1]=Math.round(S/y),h[g+2]=Math.round(M/y),u[_]=1,d=!0)}if(o.set(h),l=u,!d)break}return o}function op(){return new Ss({color:"#8b6fcb",roughness:.66,metalness:.08,side:an,transparent:!1,opacity:1,depthWrite:!0})}function Qh(i){return new Ei({map:i,color:"#ffffff",side:an,transparent:!0,alphaTest:AE,opacity:1,depthWrite:!0})}function BE(i){return i.side=an,i.transparent=!1,i.opacity=1,i.depthWrite=!0,i.needsUpdate=!0,i}function OE(i){return i.geometry.getAttribute("uv")!=null}function lp(i){return Array.isArray(i.material)?i.material:[i.material]}function kE(i,e){const t=e.position.clone(),n=t.length();if(n<.015)return!1;const r=VE(i.name),s=new ft(new zn(r,r,n,8),HE(i.name));return s.name=`proxy-segment-${i.name}-${e.name}`,s.position.copy(t).multiplyScalar(.5),s.quaternion.setFromUnitVectors(EE,t.clone().normalize()),i.add(s),!0}function dr(i,e,t){if(i==null)return!1;const n=new ft(new Ir(e,12,8),es(t));return n.name=`proxy-sphere-${i.name}`,i.add(n),!0}function zE(i){if(i==null)return!1;const e=new ft(new ri(.09,.12,.018),es("#c8a24b"));return e.name=`proxy-shield-${i.name}`,e.position.y=.04,i.add(e),!0}function VE(i){return i.includes("staff")||i.includes("hair")||i.endsWith("_end")?.01:i.includes("chest")||i.includes("hips")||i.includes("neck")?.026:i.includes("pauldron")||i.includes("shield")?.02:.017}function HE(i){return i.includes("head")||i.includes("hand")||i.includes("neck")?es("#f5e9c9"):i.includes("staff")||i.includes("shield")||i.includes("pauldron")?es("#c8a24b"):es("#4b2e83")}function es(i){return new Ss({color:i,roughness:.68,metalness:i==="#c8a24b"?.18:.04})}function GE(i){i.traverse(e=>{e instanceof ft&&(e.geometry=e.geometry.clone(),e.material=cp(e.material))})}function cp(i){if(Array.isArray(i))return i.map(n=>cp(n));const e=i.clone(),t=i.map;if(t instanceof Pt&&"map"in e){const n=t.clone();n.needsUpdate=!0,e.map=n}return e}function Uc(i){return Array.isArray(i)?i.length===0:i==null}const up=1.45,WE=0,XE=60,YE=-Math.PI/2,_r=10.8,Bi=5;class qE{constructor(){Te(this,"mageTemplate",null);Te(this,"mageTemplateVersion",0);Te(this,"mageLoadStarted",!1);Te(this,"mageTexture",null);Te(this,"mageTextureLoadStarted",!1);Te(this,"mageTextureDebugShown",!1);Te(this,"mageBoneOnlyWarningShown",!1);this.startMageModelLoad()}create(e){switch(e){case Ct.backdropForest:return $E();case Ct.mage:return this.createMage();case Ct.princeCage:return eA();case Ct.goalFlag:return tA();case Ct.pathMarker:return nA();case Ct.monsterPlaceholder:return iA();case Ct.projectilePlaceholder:return rA();case Ct.healthBarTrack:return ed("#1f1830",.85);case Ct.healthBarFill:return ed("#27ae60",.95);default:return sA(e)}}getTemplateVersion(e){return e===Ct.mage?this.mageTemplateVersion:0}dispose(e){e.traverse(t=>{t instanceof ft&&(t.geometry.dispose(),tc(t.material)),t instanceof Ef&&(t.geometry.dispose(),tc(t.material))})}disposeCachedResources(){this.mageTemplate!=null&&(this.dispose(this.mageTemplate),this.mageTemplate=null),this.mageTexture=null}createMage(){return this.startMageModelLoad(),this.mageTemplate!=null?jE(this.mageTemplate):QE()}startMageModelLoad(){if(this.mageLoadStarted||typeof window>"u")return;const e=sl(W.rigs.mage);if((e==null?void 0:e.sourceFormat)!=="fbx")return;this.mageLoadStarted=!0;const t=new fE,n=wa(e.browserUrl);t.load(n,r=>{const s=CE(r);if(!s){const o=RE(r);if(this.mageBoneOnlyWarningShown||(console.warn(o?`Mage FBX at ${n} has animation bones but no renderable meshes; using temporary bone proxy visuals.`:`Mage FBX at ${n} has no renderable meshes and no usable bones; keeping placeholder mage.`),this.mageBoneOnlyWarningShown=!0),!o)return}LE(r),DE(r),this.mageTemplate=ap(r,up);const a=IE(r.animations,WE,XE);this.mageTemplate.animations=a!=null?[a]:[],s&&(this.applyMageTextureToTemplateIfReady(),this.startMageTextureLoad()),this.mageTemplateVersion+=1},void 0,r=>{console.warn(`Failed to load mage FBX from ${n}`,r)})}startMageTextureLoad(){if(this.mageTextureLoadStarted||typeof window>"u")return;const e=sl(W.materials.mageTexture);if(e==null)return;this.mageTextureLoadStarted=!0;const t=wa(e.browserUrl);new Rc().load(t,n=>{n.colorSpace=rt,this.mageTexture=NE(n),this.applyMageTextureToTemplateIfReady()&&(this.mageTemplateVersion+=1)},void 0,n=>{console.warn(`Failed to load mage texture from ${t}`,n)})}applyMageTextureToTemplateIfReady(){return this.mageTemplate==null||this.mageTexture==null?!1:(UE(this.mageTemplate,this.mageTexture),this.mageTextureDebugShown,!0)}}function jE(i){const e=ap(i,up);return KE(e),e.animations=i.animations,e}function KE(i){const e=i.children[0]??i;e.rotation.y=YE}function $E(){const i=new mn,e=new Ai(1,1),t=new Ei({color:"#2d2345",depthWrite:!1}),n=new ft(e,t);return n.name="castle-backdrop-plane",n.renderOrder=-100,hp(n,_r/Bi),i.add(n),JE(n),i}function ZE(i){const e=Number.isFinite(i)&&i>0?i:_r/Bi,t=_r/Bi;if(e>t)return{width:Bi*e,height:Bi,centerY:0};const n=_r/e;return{width:_r,height:n,centerY:Bi/2-n/2}}function hp(i,e){const t=ZE(e);i.scale.set(t.width,t.height,1),i.position.y=t.centerY}function JE(i){if(typeof window>"u")return;const e=sl(W.backdrops.castle);if(e==null)return;const t=wa(e.browserUrl);new Rc().load(t,n=>{n.colorSpace=rt;const r=n.image,s=(r==null?void 0:r.width)!=null&&(r==null?void 0:r.height)!=null&&r.height>0?r.width/r.height:_r/Bi;hp(i,s),tc(i.material),i.material=new Ei({map:n,depthWrite:!1})},void 0,n=>{console.warn(`Failed to load castle backdrop texture from ${t}`,n)})}function QE(){const i=new mn;return i.add(ln(new zn(.42,.52,1.1,18),"#4b2e83",0,.4,0)),i.add(ln(new Ir(.34,18,12),"#f5e9c9",0,1.12,0)),i.add(ln(new zn(.045,.045,1.35,10),"#c8a24b",.48,.45,.04,Math.PI/10)),i.add(ln(new Ec(.26,.34,4),"#c8a24b",0,1.42,0)),i}function eA(){const i=new mn,e=new ri(1,1.25,.7),t=new Bv(e),n=new Ef(t,new wc({color:"#c8a24b"}));return n.position.y=.45,i.add(n),i.add(ln(new Ir(.22,16,10),"#f5e9c9",0,.5,0)),i.add(ln(new ri(.55,.45,.25),"#8b6fcb",0,.02,0)),i}function tA(){const i=new mn;i.add(ln(new zn(.035,.035,1,8),"#f5e9c9",0,.38,0));const e=ln(new Ai(.55,.36),"#c8a24b",.26,.74,.02);return i.add(e),i}function nA(){return ln(new zn(.45,.45,.05,24),"#f5e9c9",0,0,0)}function iA(){const i=new mn;return i.add(ln(new zn(.4,.48,.8,14),"#27ae60",0,.32,0)),i.add(ln(new Ir(.3,14,10),"#8b6f47",0,.86,0)),i}function rA(){return ln(new zn(.05,.05,1,8),"#f2c94c",0,0,0,Math.PI/2)}function ed(i,e){const t=new Ei({color:i,transparent:e<1,opacity:e,depthWrite:!1}),n=new ft(new Ai(1,1),t);return n.renderOrder=8,n}function sA(i){const e=aA(i);return ln(new ri(.7,.7,.7),e,0,.35,0)}function ln(i,e,t,n,r,s=0){const a=new Ss({color:e,roughness:.7,metalness:.05}),o=new ft(i,a);return o.position.set(t,n,r),o.rotation.z=s,o}function tc(i){if(Array.isArray(i)){for(const e of i)td(e);return}td(i)}function td(i){"map"in i&&i.map instanceof Pt&&i.map.dispose(),i.dispose()}function aA(i){let e=0;for(let t=0;t<i.length;t+=1)e=e*31+i.charCodeAt(t)>>>0;return`#${(e&16777215).toString(16).padStart(6,"0")}`}class oA{constructor(){Te(this,"objectById",new Map);Te(this,"templateById",new Map);Te(this,"templateVersionById",new Map)}get(e){return this.objectById.get(e)}set(e,t,n,r){this.objectById.set(e,r),this.templateById.set(e,t),this.templateVersionById.set(e,n)}getTemplateId(e){return this.templateById.get(e)}getTemplateVersion(e){return this.templateVersionById.get(e)}entries(){return this.objectById.entries()}delete(e){this.objectById.delete(e),this.templateById.delete(e),this.templateVersionById.delete(e)}clear(){this.objectById.clear(),this.templateById.clear(),this.templateVersionById.clear()}}class lA{constructor(e){Te(this,"scene",new yv);Te(this,"camera",cA(1080/500));Te(this,"renderer");Te(this,"factory",new qE);Te(this,"objectCache",new oA);Te(this,"projectileCache",new Map);Te(this,"cameraController",new Hw);Te(this,"animationMixers",new Map);Te(this,"elapsedSec",0);this.container=e,this.renderer=new zw({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(1080,500,!1),this.renderer.domElement.className="hero-stage-canvas",this.container.appendChild(this.renderer.domElement),this.scene.background=new Ue("#20172f"),this.scene.add(new zf("#ffffff",1.5));const t=new kf("#fff4d6",1.2);t.position.set(3,4,5),this.scene.add(t)}render(e,t){this.elapsedSec+=Math.max(0,t),this.syncCamera(e),this.syncObjects(e.objects),this.syncProjectiles(e.activeProjectiles),this.updateAnimationMixers(t),this.renderer.render(this.scene,this.camera)}resize(e,t){this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(e,t,!1),uA(this.camera,e/t),this.camera.updateProjectionMatrix()}dispose(){for(const[,e]of this.objectCache.entries())this.scene.remove(e),this.factory.dispose(e);for(const[,e]of this.projectileCache.entries())this.scene.remove(e.mesh),nd(e);this.animationMixers.clear(),this.objectCache.clear(),this.projectileCache.clear(),this.factory.disposeCachedResources(),this.renderer.dispose(),this.renderer.domElement.remove()}syncCamera(e){this.cameraController.apply(this.camera,e.camera,hA(this.camera))}syncProjectiles(e){const t=new Set;for(const n of e){if(!mA(n))continue;const r=`projectile-${n.projectileId}`;t.add(r);const s=this.getOrCreateProjectile(r,n);_A(s,n)}for(const[n,r]of[...this.projectileCache.entries()])t.has(n)||(this.scene.remove(r.mesh),nd(r),this.projectileCache.delete(n))}getOrCreateProjectile(e,t){const n=this.projectileCache.get(e);if(n!=null)return n;const r=gA(t);return this.projectileCache.set(e,r),this.scene.add(r.mesh),r}syncObjects(e){const t=new Set;for(const n of e){t.add(n.objectId);const r=this.getOrCreateObject(n);dA(r,n,this.elapsedSec)}for(const[n,r]of[...this.objectCache.entries()])t.has(n)||(this.scene.remove(r),this.animationMixers.delete(n),this.factory.dispose(r),this.objectCache.delete(n))}getOrCreateObject(e){const t=this.objectCache.get(e.objectId),n=this.factory.getTemplateVersion(e.templateId);if(t!=null&&this.objectCache.getTemplateId(e.objectId)===e.templateId&&this.objectCache.getTemplateVersion(e.objectId)===n)return t;t!=null&&(this.scene.remove(t),this.animationMixers.delete(e.objectId),this.factory.dispose(t),this.objectCache.delete(e.objectId));const r=this.factory.create(e.templateId);return this.objectCache.set(e.objectId,e.templateId,n,r),this.attachLoopingAnimation(e.objectId,r),this.scene.add(r),r}attachLoopingAnimation(e,t){const n=t.animations[0];if(n==null)return;const r=new WS(t),s=r.clipAction(n);s.reset(),s.setLoop(_f,1/0),s.play(),this.animationMixers.set(e,r)}updateAnimationMixers(e){const t=Math.max(0,e);for(const n of this.animationMixers.values())n.update(t)}}function cA(i){const e=Dc(i);return new qa(e.left,e.right,e.top,e.bottom,.1,100)}function uA(i,e){const t=Dc(e);i.left=t.left,i.right=t.right,i.top=t.top,i.bottom=t.bottom}function hA(i){const e=i.right-i.left,t=i.top-i.bottom;return t>0?e/t:1}function dA(i,e,t){const n=e.transform;i.position.set(n.position.x,n.position.y,n.position.z),i.quaternion.set(n.rotation.x,n.rotation.y,n.rotation.z,n.rotation.w),i.scale.set(n.scale.x,n.scale.y,n.scale.z),i.visible=e.visible,e.animationId==="victory"&&(i.position.y+=Math.sin(t*8)*.08),e.animationId==="stunned"&&(i.rotation.z=Math.sin(t*18)*.12),e.animationId==="yank"&&(i.position.y+=Math.min(1.6,t%1.4*1.8)),i.traverse(r=>{r instanceof ft&&(r.renderOrder=e.renderOrder??0,(e.opacity!=null||e.tintHex!=null)&&fA(r.material,e.tintHex,e.opacity))})}function fA(i,e,t){const n=Array.isArray(i)?i:[i];for(const r of n)(r instanceof Ss||r instanceof Ei)&&(e!=null&&r.color.set(e),t!=null&&(r.opacity=t,r.transparent=t<1))}function pA(i){switch(i){case"fire":return"#ff8a1f";case"ice":return"#38d5ff";case"lightning":return"#f2c94c";case"earth":return"#27ae60"}}function dp(i){return{color:pA(i.schoolId),blending:(i.effectKind==="bomb",xi),transparent:!0}}function mA(i){return i.activationDelaySec<=0&&i.remainingSec>0}function gA(i){const e=xA(i.effectKind),t=new Ai(1,1),n=TA(),r=dp(i),s=new Ei({map:n,color:r.color,transparent:!0,opacity:1,blending:r.blending,depthWrite:!1,depthTest:!0}),a=new Lv(t,s,e);return a.frustumCulled=!1,a.renderOrder=i.effectKind==="bomb"?32:30,{mesh:a,texture:n,dummy:new _t}}function _A(i,e){const t=bA(e),n=wA(e),r=SA(e.effectKind,t),s=vA(e.effectKind),a=dp(e);for(let o=0;o<i.mesh.count;o+=1){const l=$o(`${e.projectileId}:along:${o}`),c=$o(`${e.projectileId}:angle:${o}`),h=$o(`${e.projectileId}:radius:${o}`),u=ms(t*MA(e.effectKind)-l*fp(e.effectKind)),d=pp(u),f=c*Math.PI*2,p=Math.sqrt(h)*Math.sin(u*Math.PI),_=r.horizontal*p,g=r.vertical*p,m=e.from.x+n.dx*d+n.perpX*Math.cos(f)*_,S=e.from.y+n.dy*d+n.perpY*Math.cos(f)*_+Math.sin(f)*g,M=e.from.z+n.dz*d+Math.sin(f)*r.depth*p,y=.75+h*.45;i.dummy.position.set(m,S,M),i.dummy.rotation.set(0,0,0),i.dummy.scale.set(s.x*y,s.y*y,1),i.dummy.updateMatrix(),i.mesh.setMatrixAt(o,i.dummy.matrix)}i.mesh.instanceMatrix.needsUpdate=!0,i.mesh.material.color.set(a.color),i.mesh.material.opacity=yA(e.effectKind,t),i.mesh.material.blending=a.blending,i.mesh.material.needsUpdate=!0}function nd(i){i.mesh.geometry.dispose(),i.mesh.material.dispose(),i.texture.dispose()}function xA(i){return i==="bomb"?220:96}function vA(i){return i==="bomb"?{x:.6,y:.78}:{x:.27,y:.36}}function SA(i,e){const t=(i==="bomb"?.68:.2)*(.45+pp(e)*.55);return{horizontal:t,vertical:t*1.8,depth:t*.45}}function fp(i){return i==="bomb"?.52:.34}function MA(i){return 1+fp(i)}function yA(i,e){const t=ms(e/.16),n=ms((1-e)/(i==="bomb"?.32:.42));return(i==="bomb"?.78:.92)*Math.min(t,n)}function TA(){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");if(t==null)throw new Error("Unable to create projectile particle texture context.");const n=64/2,r=t.createRadialGradient(n,n,0,n,n,n);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.36,"rgba(255, 255, 255, 0.82)"),r.addColorStop(.72,"rgba(255, 255, 255, 0.22)"),r.addColorStop(1,"rgba(255, 255, 255, 0)"),t.fillStyle=r,t.fillRect(0,0,64,64);const s=new Cf(e);return s.colorSpace=rt,s.needsUpdate=!0,s}function bA(i){return ms(1-i.remainingSec/Math.max(.001,i.durationSec))}function wA(i){const e=i.to.x-i.from.x,t=i.to.y-i.from.y,n=i.to.z-i.from.z,r=Math.hypot(e,t),s=r>0?-t/r:1,a=r>0?e/r:0;return{dx:e,dy:t,dz:n,perpX:s,perpY:a}}function $o(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function pp(i){return 1-Math.pow(1-ms(i),3)}function ms(i){return Math.max(0,Math.min(1,i))}const Xi=document.querySelector("#app");if(Xi==null)throw new Error("Missing #app root element.");const Zn=new g0(N0(window.location.search),{debugLevelType:F0(window.location.search),debugStartLevel:B0(window.location.search)});Xi.innerHTML=`
  <main class="game-shell" aria-label="Magus Match prototype shell">
    <section class="logical-stage">
      <canvas class="game-canvas" width="${qt}" height="${Bn}" aria-label="Magus Match board and HUD"></canvas>
      <div class="hero-stage" data-hero-stage aria-label="Magus Match hero stage"></div>
      <div class="debug-panel" data-debug></div>
    </section>
  </main>
`;const mp=Xi.querySelector(".game-shell"),gp=Xi.querySelector(".logical-stage");if(mp==null||gp==null)throw new Error("Failed to create game shell.");const _p=mp,EA=gp,AA=Bc(Xi,"[data-debug]"),CA=Bc(Xi,".game-canvas"),RA=Bc(Xi,"[data-hero-stage]"),xp=CA.getContext("2d");if(xp==null)throw new Error("Unable to create 2D canvas context.");const Nc=new z_(xp,{},qt,Bn),$a=new lA(RA),vp=new __,Sp=new o_;let va=Sp.load(),nc=null;const IA=new O0(_p);s_().then(i=>{Nc.setImages(i)});function Mp(){const i=_p.getBoundingClientRect(),e=Math.min(i.width/qt,i.height/Bn);EA.style.transform=`scale(${e})`,$a.resize(1080,500)}function yp(i=Fc()){AA.textContent=`${i.phase} | ${i.debugText??""}`}let Zo=0;function Tp(i){const e=Zo===0?0:Math.min((i-Zo)/1e3,.03333333333333333);Zo=i,Zn.update(e,IA.drainCommands());const t=Fc(),n=bp();PA(Zn.drainEvents()),yp(t),Qd(Nc,vp.present(Zn.getBoardRenderState(),i/1e3),t,i/1e3,n),$a.render(Zn.getHeroWorldState(),e),requestAnimationFrame(Tp)}Mp();yp();Qd(Nc,vp.present(Zn.getBoardRenderState(),0),Fc(),0,bp());$a.render(Zn.getHeroWorldState(),0);window.addEventListener("resize",Mp);window.addEventListener("beforeunload",()=>$a.dispose());requestAnimationFrame(Tp);function PA(i){for(const e of i)if(e.type!=="soundRequested"){if(e.type==="levelStarted"){nc=null;continue}if(e.type==="runEnded"){const t=Qg(e.finalScore,e.levelsCleared,Zn.getRunStateForDebug().seed,Date.now()),n=Zg(va,t);va=n.entries,nc=n.qualifiedRank,Sp.save(va)}}}function Fc(){return{...Zn.getHudState(),muted:!0}}function bp(){return{...Zn.getScreenState(va,nc),muted:!0}}function Bc(i,e){const t=i.querySelector(e);if(t==null)throw new Error(`Missing required element: ${e}`);return t}
