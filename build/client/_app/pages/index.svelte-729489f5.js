import{S as F,i as X,s as Y,e as m,t as S,k as w,N as Z,c as y,a as I,h as T,d as u,m as L,O as $,b as v,g as P,J as c,P as x,j as W,Q as ee,n as K,w as te,R as le}from"../chunks/index-5f95ec63.js";function Q(d,t,a){const e=d.slice();return e[3]=t[a],e}function z(d,t){let a,e,s=t[3].title+"",f,i,r,p,_,l=t[3].byline+"",n,h,k=t[3].section.toUpperCase()+"",E,D,V,b,O=(t[3].expanded?t[3].html:"")+"",H,R,A,M,j,U,q;function B(){return t[2](t[3])}return{key:d,first:null,c(){a=m("div"),e=m("div"),f=S(s),i=w(),r=m("div"),p=m("p"),_=m("a"),n=S(l),h=S(" // "),E=S(k),V=w(),b=new Z,H=w(),R=m("link"),M=w(),this.h()},l(g){a=y(g,"DIV",{class:!0});var o=I(a);e=y(o,"DIV",{class:!0});var G=I(e);f=T(G,s),G.forEach(u),i=L(o),r=y(o,"DIV",{class:!0});var C=I(r);p=y(C,"P",{});var J=I(p);_=y(J,"A",{href:!0});var N=I(_);n=T(N,l),h=T(N," // "),E=T(N,k),N.forEach(u),J.forEach(u),V=L(C),b=$(C),C.forEach(u),H=L(o),R=y(o,"LINK",{rel:!0,href:!0}),M=L(o),o.forEach(u),this.h()},h(){v(e,"class","title svelte-imjlbl"),v(_,"href",D=t[3].link),b.a=null,v(r,"class","article-expand svelte-imjlbl"),v(R,"rel","prefetch"),v(R,"href",A=t[3].apiLink),v(a,"class",j="article "+(t[3].expanded?"expanded":"")+" "+(t[3].read?"read":"")+" svelte-imjlbl"),this.first=a},m(g,o){P(g,a,o),c(a,e),c(e,f),c(a,i),c(a,r),c(r,p),c(p,_),c(_,n),c(_,h),c(_,E),c(r,V),b.m(O,r),c(a,H),c(a,R),c(a,M),U||(q=x(e,"click",B),U=!0)},p(g,o){t=g,o&1&&s!==(s=t[3].title+"")&&W(f,s),o&1&&l!==(l=t[3].byline+"")&&W(n,l),o&1&&k!==(k=t[3].section.toUpperCase()+"")&&W(E,k),o&1&&D!==(D=t[3].link)&&v(_,"href",D),o&1&&O!==(O=(t[3].expanded?t[3].html:"")+"")&&b.p(O),o&1&&A!==(A=t[3].apiLink)&&v(R,"href",A),o&1&&j!==(j="article "+(t[3].expanded?"expanded":"")+" "+(t[3].read?"read":"")+" svelte-imjlbl")&&v(a,"class",j)},d(g){g&&u(a),U=!1,q()}}}function ae(d){let t,a,e,s,f,i=[],r=new Map,p=d[0];const _=l=>l[3].title;for(let l=0;l<p.length;l+=1){let n=Q(d,p,l),h=_(n);r.set(h,i[l]=z(h,n))}return{c(){t=m("head"),a=m("title"),e=S("nyt-reader"),s=w(),f=m("div");for(let l=0;l<i.length;l+=1)i[l].c()},l(l){t=y(l,"HEAD",{});var n=I(t);a=y(n,"TITLE",{});var h=I(a);e=T(h,"nyt-reader"),h.forEach(u),n.forEach(u),s=L(l),f=y(l,"DIV",{});var k=I(f);for(let E=0;E<i.length;E+=1)i[E].l(k);k.forEach(u)},m(l,n){P(l,t,n),c(t,a),c(a,e),P(l,s,n),P(l,f,n);for(let h=0;h<i.length;h+=1)i[h].m(f,null)},p(l,[n]){n&3&&(p=l[0],i=ee(i,n,_,1,l,p,r,f,le,z,null,Q))},i:K,o:K,d(l){l&&u(t),l&&u(s),l&&u(f);for(let n=0;n<i.length;n+=1)i[n].d()}}}async function ne({fetch:d}){let a=await(await d("/api/feed?recent")).json();return a.forEach((e,s)=>{e.id=s,e.i=s,e.section="section",e.html="",e.apiLink=`/api/article?${e.link}`,e.expanded=!1,e.i=s,e.section=e.link.replace("sunday/","").replace("columnists/","").replace("editorialboard/","").split("/").slice(-2)[0],e.byline=(e["dc:creator"]||"").trim(),e.type="",e.section=="opinion"&&(e.type="OPINION: "),e.section=="crosswords"&&(e.type="CROSSWORDS: "),e.section=="editorials"&&(e.type="EDITORIALS: "),e.section=="editorials"&&(e.type="EDITORIALS: "),e.section=="smarter-living"&&(e.type="SMARTER LIVING: "),e.section=="wirecutter"&&(e.type="WIRECUTTTER: "),e.byline=="The Associated Press"&&(e.type="AP: "),e.byline=="Reuters"&&(e.type="REUTERS: "),e.link.includes("/slideshow/")&&(e.type="SLIDESHOW: ")}),a.sort((e,s)=>e.type<s.type?-1:e.type>s.type?1:e.i-s.i),{props:{posts:a}}}function ie(d,t,a){let{posts:e}=t;function s(i){i.expanded=!i.expanded,a(0,e=e.slice())}te(i=>{console.log("onMount"),e.forEach(r=>{r.key=r.link.split(".com")[1].split(".html")[0],r.read=window.localStorage.getItem(r.key)}),e.forEach(r=>{fetch(r.apiLink).then(p=>p.text()).then(p=>{r.html=p,a(0,e=e.slice())})})});const f=i=>s(i);return d.$$set=i=>{"posts"in i&&a(0,e=i.posts)},[e,s,f]}class re extends F{constructor(t){super(),X(this,t,ie,ae,Y,{posts:0})}}export{re as default,ne as load};