const t={start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]")},{start:e,stop:o}=t;e.addEventListener("click",(function(){document.body.style.backgroundColor=r(),e.setAttribute("disabled","disabled"),n=setInterval((()=>document.body.style.backgroundColor=r()),1e3)})),o.addEventListener("click",(function(){clearInterval(n),e.removeAttribute("disabled")}));let n=null;function r(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}
//# sourceMappingURL=01-color-switcher.2228998e.js.map
