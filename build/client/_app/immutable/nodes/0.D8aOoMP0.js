import{d as y,a as m,e as T,g as w,f as x}from"../chunks/51XDbXE4.js";import{F as D,A as N,aB as z,a0 as A,y as g,a5 as C,a7 as p,a9 as h,X as b,x as F,a4 as I,k as f,aC as S,ao as P,m as d,g as c,n as i,ap as j,p as O,aD as R,s as v,l as W,e as q,aE as B}from"../chunks/CsVHGGuQ.js";import{I as _,s as $,a as H}from"../chunks/B1q6MfPq.js";import{l as k,s as E,i as V}from"../chunks/BM3iUIG-.js";import"../chunks/BOBj3V8K.js";function X(n,e){let o=null,a=g;var r;if(g){o=F;for(var t=I(document.head);t!==null&&(t.nodeType!==C||t.data!==n);)t=p(t);if(t===null)h(!1);else{var l=p(t);t.remove(),b(l)}}g||(r=document.head.appendChild(D()));try{N(()=>e(r),z|A)}finally{a&&(h(!0),b(o))}}function Z(n,e){const o=k(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.475.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const a=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"}]];_(n,E({name:"moon"},()=>o,{get iconNode(){return a},children:(r,t)=>{var l=y(),s=f(l);$(s,e,"default",{}),m(r,l)},$$slots:{default:!0}}))}function G(n,e){const o=k(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.475.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];_(n,E({name:"sun"},()=>o,{get iconNode(){return a},children:(r,t)=>{var l=y(),s=f(l);$(s,e,"default",{}),m(r,l)},$$slots:{default:!0}}))}var J=x('<button class="rounded-lg p-2 transition-all" style="background: var(--surface); border: 1px solid var(--glass-border);" aria-label="Toggle theme" title="Toggle theme"><!></button>');function K(n){let e=S(P(typeof document<"u"?document.documentElement.getAttribute("data-theme")??"dark":"dark"));function o(){j(e,c(e)==="dark"?"light":"dark",!0),document.documentElement.setAttribute("data-theme",c(e)),localStorage.setItem("theme",c(e))}var a=J(),r=d(a);{var t=s=>{G(s,{size:16,class:"text-[var(--text-muted)]"})},l=s=>{Z(s,{size:16,class:"text-[var(--text-muted)]"})};V(r,s=>{c(e)==="dark"?s(t):s(l,-1)})}i(a),w("click",a,o),m(n,a)}T(["click"]);var L=x(`<div class="bg-scene"></div> <div class="relative z-10 flex min-h-screen flex-col overflow-x-hidden"><header class="flex items-center justify-between px-5 py-3" style="
			background: var(--glass-bg);
			backdrop-filter: blur(var(--glass-blur));
			-webkit-backdrop-filter: blur(var(--glass-blur));
			border-bottom: 1px solid var(--glass-border);
		"><h1 class="gradient-text text-sm font-bold tracking-widest uppercase">Dashboard</h1> <div class="flex items-center gap-2"><!></div></header> <main class="flex-1"><!></main></div>`,1);function ae(n,e){O(e,!0),R(()=>{"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").catch(()=>{});const u=localStorage.getItem("theme");u&&document.documentElement.setAttribute("data-theme",u)});var o=L();X("12qhfyh",u=>{q(()=>{B.title="Dashboard"})});var a=v(f(o),2),r=d(a),t=v(d(r),2),l=d(t);K(l),i(t),i(r);var s=v(r,2),M=d(s);H(M,()=>e.children),i(s),i(a),m(n,o),W()}export{ae as component};
