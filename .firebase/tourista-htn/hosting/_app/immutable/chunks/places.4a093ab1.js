import{w as i}from"./index.12519dbe.js";const b=()=>{const{subscribe:s,set:o,update:a}=i([]);return localStorage.storable&&o(JSON.parse(localStorage.storable)),{add:r=>{a(e=>{const t=e.filter(l=>l!==r);return localStorage.storable=JSON.stringify([...t,r]),[...t,r]})},remove:r=>{a(e=>(localStorage.storable=JSON.stringify(e.filter(t=>t!==r)),e.filter(t=>t!==r)))},subscribe:s,set:o}};export{b as p};