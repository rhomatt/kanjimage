(this.webpackJsonpkanjimage=this.webpackJsonpkanjimage||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),i=n.n(c),r=n(3),o=n.n(r),s=(n(10),n(11),n(4));var u=function(){var e=Object(c.useState)(null),t=Object(s.a)(e,2),n=t[0],i=t[1],r=function(e){for(var t=e.clipboardData.items,n=null,a=0;a<t.length;a++){var c=t[a];if(console.log(c),"image/png"===c.type){n=c.getAsFile();break}}var r=new FileReader;r.onload=function(e){var t=e.target.result;console.log(t),i(t)},n&&r.readAsDataURL(n)};return Object(c.useEffect)((function(){document.addEventListener("paste",r)}),[]),Object(a.jsxs)(a.Fragment,{children:[n?void 0:"no image",Object(a.jsx)("img",{src:n})]})};var l=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(u,{})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),i(e),r(e)}))};o.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(l,{})}),document.getElementById("root")),g()}},[[12,1,2]]]);
//# sourceMappingURL=main.26ac4925.chunk.js.map