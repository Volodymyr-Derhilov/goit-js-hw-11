import{S as u}from"./assets/vendor-CWwQENHe.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const m="https://pixabay.com/api/",f="41633304-c06bc91ac11626a6cec46e525";function d(i=""){const t=new URLSearchParams({key:f,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${m}?${t}`).then(s=>{if(!s.ok)throw new Error(s.statusText);return s.json()})}function h(i){return i.length?i.map(({webformatURL:t,largeImageURL:s,tags:a,likes:e,views:r,comments:o,downloads:l})=>`<li class = "gallery-item"><a class = "gallery-link" href = "${s}"><img class = "gallery-image" src=${t} alt="${a}"></a>
            <div class="social-activity">
            <ul class="social-activity-list">
            <li class="social-activity-list-item">Likes <span class="number">${e}</span></li>
            <li class="social-activity-list-item">Views <span class="number"> ${r}</span></li>
            <li class="social-activity-list-item">Comments <span class="number"> ${o}</span></li>
            <li class="social-activity-list-item">Downloads <span class="number">${l}</span></li>
            </ul>
            </div>
          </li>`).join(""):(iziToast.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),"")}const c=document.querySelector(".form"),n=document.querySelector(".js-list");document.querySelector(".form button");c.addEventListener("submit",p);function p(i){i.preventDefault();const{search:t}=i.target.elements;t&&(n.innerHTML='<div class="loader"></div></h1>',d(t.value).then(s=>{n.innerHTML=h(s.hits)}).catch(s=>{console.log(s),n.innerHTML="<h1>Something went wrong. Please try again.</h1>"}),c.reset())}n.addEventListener("click",i=>{i.preventDefault();const t=i.target;if(!t.tagName==="IMG"||i.currentTarget===t)return;new u(".gallery-item a").refresh()});
//# sourceMappingURL=index.js.map