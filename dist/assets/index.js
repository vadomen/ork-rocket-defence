var h=Object.defineProperty;var a=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;var c=(n,t,e)=>t in n?h(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,p=(n,t)=>{for(var e in t||(t={}))g.call(t,e)&&c(n,e,t[e]);if(a)for(var e of a(t))u.call(t,e)&&c(n,e,t[e]);return n};const d=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}};d();class f{constructor(t){this.bases=[],this.createBase=({latLng:e})=>{const s={type:"airDefenceSystem",center:e,radius:Math.sqrt(35e3)*100};console.log(JSON.stringify(s)),this.bases.push(s),new google.maps.Circle(p({strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35,map:this.map},s))},this.map=t}}class m{constructor(t){this.trajectories=[],this.drawRocket=()=>({path:google.maps.SymbolPath.CIRCLE,scale:8,strokeColor:"#d7a81a"}),this.generateTrajectoryPath=()=>{const e=[[{lat:45.29,lng:31.35},{lat:50.413,lng:30.55}],[{lat:45.264,lng:34.291},{lat:50.413,lng:30.55}],[{lat:52.449,lng:28.004},{lat:50.413,lng:30.55}],[{lat:51.786,lng:36.175},{lat:50.413,lng:30.55}]];return e[Math.floor(Math.random()*e.length)]},this.generateTrajectory=e=>{const s={id:Symbol("trajectoryId"),count:0,interval:0,polyline:new google.maps.Polyline({path:this.generateTrajectoryPath(),strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:0,icons:[{icon:this.drawRocket(),offset:"100%"}],map:e})};this.trajectories.push(s),this.rocketFly(s)},this.destroyRocket=e=>{const{polyline:s,interval:o}=e;s.setMap(null),s.set("icons",[]),clearInterval(o)},this.calculateCollision=e=>{const{polyline:s,count:o}=e,r=s.getPath().getArray(),i=google.maps.geometry.spherical.interpolate(r[0],r[1],o/200);this.airDefenceSystems.forEach(l=>{google.maps.geometry.spherical.computeDistanceBetween(i,l.center)<=l.radius&&this.destroyRocket(e)})},this.rocketFly=e=>{let s=0,o;o=window.setInterval(()=>{s=(s+1)%200;const r=e.polyline.get("icons");r[0].offset=s/2+"%",e.polyline.set("icons",r),e.count=s,e.interval=o,this.calculateCollision(e)},20)},this.airDefenceSystems=t}}const y=(n,t)=>{window.setInterval(()=>{t.generateTrajectory(n)},Math.random()*5e3)};function k(){const n={lat:48.3794,lng:31.1656},t=new google.maps.Map(document.getElementById("map"),{zoom:7,center:n,mapTypeId:"terrain"}),e=new f(t),s=new m(e.bases);t.addListener("click",o=>{e.createBase(o)}),y(t,s)}window.initMap=k;
