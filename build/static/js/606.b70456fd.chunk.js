"use strict";(self.webpackChunkshoghl_app=self.webpackChunkshoghl_app||[]).push([[606],{87836:function(e,i,n){n.d(i,{Z:function(){return c}});var a=n(29439),t=n(47313),l=n(97890),s=n(13065),o=n(45478),d=n(46417),c=function(e){var i,n,c,r,u,v,m,f=e.data,p={avatar:null===f||void 0===f?void 0:f.avatar,fullname:null===f||void 0===f?void 0:f.fullname,jobName:null===f||void 0===f||null===(i=f.job_name_id)||void 0===i?void 0:i.name,myFlag:null===f||void 0===f||null===(n=f.nationality)||void 0===n?void 0:n.logo,status:null===f||void 0===f?void 0:f.available},h=((0,l.UO)(),(0,l.TH)(),(0,l.s0)(),(0,t.useState)(!1)),x=(0,a.Z)(h,2);x[0],x[1];return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:"LT-employed-listCard-grid uLT-bd-f-platinum-sA uLT-f-radius-sB ",children:[(0,d.jsx)("div",{className:"LT-employed-icon ",style:{width:"42px",height:"42px"},children:(0,d.jsx)(o.Z,{myData:p,statusIcon:1===(null===f||void 0===f?void 0:f.available)?(0,d.jsx)("div",{className:"uLT-status-online"}):(0,d.jsx)("div",{className:"uLT-status-offline"})})}),(0,d.jsx)("div",{className:"d-flex justify-content-end align-items-start p-0",children:(0,d.jsx)("div",{className:"info-child",children:(0,d.jsx)("div",{className:"d-flex justify-content-between w-100 align-items-start",children:(0,d.jsx)("div",{className:"LT-performance-rate-holder  ",children:(0,d.jsxs)("div",{className:"d-flex align-items-center LT-rate-font-size  ",children:[(0,d.jsxs)("p",{className:"m-0 card-text cLT-support2-text ",children:["(",null===f||void 0===f||null===(c=f.rate)||void 0===c?void 0:c.count,")"]}),(0,d.jsx)("p",{className:"m-0 card-text cLT-support2-text ",children:null===f||void 0===f||null===(r=f.rate)||void 0===r?void 0:r.rate}),(0,d.jsx)("i",{className:" iLT-Rate-star uLT-img-contain LT-rate-icon-size me-sm-2"})]})})})})}),(0,d.jsx)("div",{className:"LT-employed-description",children:(0,d.jsx)("p",{className:"m-0 fLT-Regular-sB cLT-smoke-text",children:(null===f||void 0===f?void 0:f.description)&&(null===f||void 0===f?void 0:f.description)})}),(0,d.jsx)("div",{className:"LT-employed-divied uLT-bd-b-platinum-sA"}),(0,d.jsx)("div",{className:"LT-employed-amenties",children:(0,d.jsxs)("div",{className:"card-body amentiesWithLocation p-0 w-100",children:[(0,d.jsx)("div",{className:"LT-amenties-grid",children:null===f||void 0===f||null===(u=f.category)||void 0===u?void 0:u.map((function(e){return(0,d.jsx)(s.Z,{amentiesWithLocation:"amentiesWithLocation",amentiesWithLocationData:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)}))}),(0,d.jsxs)("div",{className:"LT-location-grid",children:[(0,d.jsx)("i",{className:"iLT-Listcard-location uLT-img-contain iLT-sA"}),(0,d.jsxs)("p",{className:"mb-0 cLT-support2-text fLT-Bold-sm-sA",children:[null===f||void 0===f||null===(v=f.country)||void 0===v?void 0:v.name,", ",null===f||void 0===f||null===(m=f.city)||void 0===m?void 0:m.name]})]})]})})]})})}},81606:function(e,i,n){n.r(i),n.d(i,{default:function(){return m}});var a=n(29439),t=n(47313),l=n(29466),s=n(97890),o=n(87836),d=n(38605),c={_GET_FreelancersListProfile:function(e,i,n){return d.b.get("user/freelancer?perPage=".concat(e,"&pagination=").concat(i,"&page=").concat(n))}};var r=n(77970),u=n(35898),v=n(46417),m=function(){var e,i=(0,s.UO)(),n=(0,s.s0)(),d=(0,t.useState)(null),m=(0,a.Z)(d,2),f=(m[0],m[1]),p=(0,t.useState)(),h=(0,a.Z)(p,2),x=h[0],L=h[1],j=(0,t.useMemo)((function(){return c._GET_FreelancersListProfile(10,!0,i.num).then((function(e){L(e.data)})).catch((function(e){return e.response}))}),[i.num]);(0,t.useEffect)((function(){var e=setTimeout((function(){if(!x)return j}),1200);return function(){return clearTimeout(e)}}),[x,j]);var T=(0,t.useState)(),g=(0,a.Z)(T,2),N=g[0],y=g[1],b=(0,t.useMemo)((function(){var e;y(null===x||void 0===x||null===(e=x.pagination)||void 0===e?void 0:e.total_pages)}),[null===x||void 0===x?void 0:x.pagination]);(0,t.useEffect)((function(){var e=setTimeout((function(){if(null===x||void 0===x||!x.pagination)return b}),1e3);return clearTimeout(e)}),[null===x||void 0===x?void 0:x.pagination,b]);return(0,v.jsxs)("div",{className:"w-100 d-flex flex-column align-items-between ",children:[(0,v.jsx)("div",{className:"w-100 ",children:x?(0,v.jsx)("div",{className:"cLT-white-bg p-3",children:null===x||void 0===x||null===(e=x.data)||void 0===e?void 0:e.map((function(e,i){return(0,v.jsxs)(l.OL,{className:"uLT-list-style",to:"/employed/freelancer-profile/".concat(null===e||void 0===e?void 0:e.id),children:[" ",(0,v.jsx)(o.Z,{data:e}),"  "]},i)}))}):"Loading"}),(0,v.jsx)("div",{className:"container d-flex justify-content-center pt-4 mt-auto",children:(0,v.jsx)(u.Z,{children:(0,v.jsx)(r.Z,{dir:"rtl",showFirstButton:!0,showLastButton:!0,count:N,page:parseInt(null===i||void 0===i?void 0:i.num),onChange:function(e,a){f(i.num),n("/employed/page=".concat(a)),window.scrollTo({top:250,behavior:"smooth"})},size:"large"})})})]})}}}]);