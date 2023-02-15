var e,t,r,s,n,i,a,l,o={},u=o&&o.__classPrivateFieldSet||function(e,t,r,s,n){if("m"===s)throw new TypeError("Private method is not writable");if("a"===s&&!n)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===s?n.call(e,r):n?n.value=r:t.set(e,r),r},c=o&&o.__classPrivateFieldGet||function(e,t,r,s){if("a"===r&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!s:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?s:"a"===r?s.call(e):s?s.value:t.get(e)};Object.defineProperty(o,"__esModule",{value:!0}),o.Slumpa=void 0;class h{constructor(t=Math.random()*Number.MAX_SAFE_INTEGER){e.add(this),r.set(this,void 0),s.set(this,void 0),u(this,r,t,"f"),u(this,s,c(this,e,"m",l).call(this,t),"f")}setSeed(t){u(this,s,c(this,e,"m",l).call(this,t),"f")}getInitialSeed(){return c(this,r,"f")}getCurrentSeed(){return c(this,s,"f")}integer(t,r){return Math.floor(c(this,e,"m",a).call(this)*(r-t+1))+t}integers(e,r,s){return c(h,t,"m",n).call(h,e,this.integer.bind(this),r,s)}float(t=0,r=1){return c(this,e,"m",a).call(this)*(r-t)+t}floats(e,r=0,s=1){return c(h,t,"m",n).call(h,e,this.float.bind(this),r,s)}item(e){return e[this.integer(0,e.length-1)]}items(e,r,s=!1){return s?c(h,t,"m",n).call(h,e,this.item.bind(this),r):this.shuffle(r).slice(0,e)}die(e=6){return this.integer(1,e)}dice(e,r=6){return c(h,t,"m",n).call(h,e,this.die.bind(this),r)}boolean(e=.5){return this.float()>e}booleans(e,r=.5){return c(h,t,"m",n).call(h,e,this.boolean.bind(this),r)}shuffle(t){return c(this,e,"m",i).call(this,t)}string(e,t){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZ",s=r.toUpperCase(),n=r.toLowerCase(),i=(!t||t.useUppercase?s:"")+(!t||t.useLowercase?n:"")+(!t||t.useNumbers?"0123456789":"")+(!t||t.useSpecials?"~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/":"");return this.items(e,i.split(""),!0).join("")}date(e,t){e.setHours(0,0,0,0),t.setHours(23,59,59,999);const r=this.integer(e.getTime(),t.getTime());return new Date(r)}dates(e,r,s){return c(h,t,"m",n).call(h,e,this.date.bind(this),r,s)}}o.Slumpa=h,t=h,r=new WeakMap,s=new WeakMap,e=new WeakSet,n=function(e,t,...r){return new Array(e).fill(0).map((()=>t.call(this,...r)))},i=function(t){let r,s=t.length;const n=[...t];for(;0!=s;)r=Math.floor(c(this,e,"m",a).call(this)*s),s--,[n[s],n[r]]=[n[r],n[s]];return n},a=function(){let e=u(this,s,c(this,s,"f")+1831565813,"f");return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},l=function(e){const t=e.toString();if(!t||/^0+$/.test(t))return 1e7*Math.random();if(/^-?\d+$/.test(t)&&t.length<20)return parseInt(t.replace(/^(-?)0+/,"$1"),10);let r=0;for(let e=0;e<t.length;e++){r=(r<<5)-r+t.charCodeAt(e),r&=r}return r};const m=new(0,o.Slumpa)(778);function f(e,t){const r=function(e){const t=document.getElementById(e);if(!t)throw Error("elem not found");return t}(e);r.addEventListener("input",(()=>t(r))),r.addEventListener("submit",(e=>{e.preventDefault(),t(r)})),t(r)}f("frmRandomInt",(e=>{const t=parseInt(e.min.value),r=parseInt(e.max.value);e.result.value=m.integer(t,r),e.code.value=`const integer = slumpa.integer(${t}, ${r})`})),f("frmRandomFloat",(e=>{const t=parseFloat(e.min.value),r=parseFloat(e.max.value);e.result.value=m.float(t,r),e.code.value=`const float = slumpa.float(${t}, ${r})`})),f("frmRandomItem",(e=>{const t=["Horse","Monkey","Cow","Dog","Cat"];e.code.value=`const animal = slumpa.item(['${t.join("', '")}'])`,e.result.value=m.item(t)})),f("frmShuffle",(e=>{const t="ABCDEFGHI".split("");e.code.value=`const letters = slumpa.shuffle(['${t.join("', '")}'])`,e.result.value=m.shuffle(t).join(", ")})),f("frmString",(e=>{const t=parseInt(e.strLength.value),r=e.uppercase.checked,s=e.lowercase.checked,n=e.numbers.checked,i=e.specials.checked;let a,l="";if(!(r&&s&&n&&i)){a={},r&&(a.useUppercase=!0),s&&(a.useLowercase=!0),n&&(a.useNumbers=!0),i&&(a.useSpecials=!0);const e=Object.entries(a).map((([e,t])=>"\r\n  "+e+":"+t)).join(",");l=`, {${e}${e?"\r\n":""}}`}e.code.value=`const string = slumpa.string(${t}${l})`,e.result.value=m.string(t,a)}));
//# sourceMappingURL=index.7157154a.js.map