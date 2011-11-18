/**
 * Copyright (c) 2007-2011, Kaazing Corporation. All rights reserved.
 * 
 * Licensed under the Kaazing Corporation Developer Agreement (2010-02-22), see:
 * 
 *   http://www.kaazing.com/license
 */

var browser=null;
if(typeof (ActiveXObject)!="undefined"){
browser="ie";
}else{
if(Object.prototype.toString.call(window.opera)=="[object Opera]"){
browser="opera";
}else{
if(navigator.vendor.indexOf("Apple")!=-1){
browser="safari";
}else{
if(navigator.vendor.indexOf("Google")!=-1){
if(navigator.userAgent.indexOf("Android")!=-1){
browser="android";
}else{
browser="chrome";
}
}else{
if(navigator.product=="Gecko"&&window.find&&!navigator.savePreferences){
browser="firefox";
}else{
throw new Error("couldn't detect browser");
}
}
}
}
}
switch(browser){
case "ie":
(function(){
if(document.createEvent===undefined){
var _1=function(){
};
_1.prototype.initEvent=function(_2,_3,_4){
this.type=_2;
this.bubbles=_3;
this.cancelable=_4;
};
document.createEvent=function(_5){
if(_5!="Events"){
throw new Error("Unsupported event name: "+_5);
}
return new _1();
};
}
document._w_3_c_d_o_m_e_v_e_n_t_s_createElement=document.createElement;
document.createElement=function(_6){
var _7=this._w_3_c_d_o_m_e_v_e_n_t_s_createElement(_6);
if(_7.addEventListener===undefined){
var _8={};
_7.addEventListener=function(_9,_a,_b){
_7.attachEvent("on"+_9,_a);
return addEventListener(_8,_9,_a,_b);
};
_7.removeEventListener=function(_c,_d,_e){
return removeEventListener(_8,_c,_d,_e);
};
_7.dispatchEvent=function(_f){
return dispatchEvent(_8,_f);
};
}
return _7;
};
if(window.addEventListener===undefined){
var _10=document.createElement("div");
var _11=(typeof (postMessage)==="undefined");
window.addEventListener=function(_12,_13,_14){
if(_11&&_12=="message"){
_10.addEventListener(_12,_13,_14);
}else{
window.attachEvent("on"+_12,_13);
}
};
window.removeEventListener=function(_15,_16,_17){
if(_11&&_15=="message"){
_10.removeEventListener(_15,_16,_17);
}else{
window.detachEvent("on"+_15,_16);
}
};
window.dispatchEvent=function(_18){
if(_11&&_18.type=="message"){
_10.dispatchEvent(_18);
}else{
window.fireEvent("on"+_18.type,_18);
}
};
}
function addEventListener(_19,_1a,_1b,_1c){
if(_1c){
throw new Error("Not implemented");
}
var _1d=_19[_1a]||{};
_19[_1a]=_1d;
_1d[_1b]=_1b;
};
function removeEventListener(_1e,_1f,_20,_21){
if(_21){
throw new Error("Not implemented");
}
var _22=_1e[_1f]||{};
delete _22[_20];
};
function dispatchEvent(_23,_24){
var _25=_24.type;
var _26=_23[_25]||{};
for(var key in _26){
if(typeof (_26[key])=="function"){
try{
_26[key](_24);
}
catch(e){
}
}
}
};
})();
break;
case "chrome":
case "android":
case "safari":
if(typeof (window.postMessage)==="undefined"&&typeof (window.dispatchEvent)==="undefined"&&typeof (document.dispatchEvent)==="function"){
window.dispatchEvent=function(_28){
document.dispatchEvent(_28);
};
var addEventListener0=window.addEventListener;
window.addEventListener=function(_29,_2a,_2b){
if(_29==="message"){
document.addEventListener(_29,_2a,_2b);
}else{
addEventListener0.call(window,_29,_2a,_2b);
}
};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(_2c,_2d,_2e){
if(_2c==="message"){
document.removeEventListener(_2c,_2d,_2e);
}else{
removeEventListener0.call(window,_2c,_2d,_2e);
}
};
}
break;
case "opera":
var addEventListener0=window.addEventListener;
window.addEventListener=function(_2f,_30,_31){
var _32=_30;
if(_2f==="message"){
_32=function(_33){
if(_33.origin===undefined&&_33.uri!==undefined){
var uri=new URI(_33.uri);
delete uri.path;
delete uri.query;
delete uri.fragment;
_33.origin=uri.toString();
}
return _30(_33);
};
_30._$=_32;
}
addEventListener0.call(window,_2f,_32,_31);
};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(_35,_36,_37){
var _38=_36;
if(_35==="message"){
_38=_36._$;
}
removeEventListener0.call(window,_35,_38,_37);
};
break;
}
function URI(str){
str=str||"";
var _3a=0;
var _3b=str.indexOf("://");
if(_3b!=-1){
this.scheme=str.slice(0,_3b);
_3a=_3b+3;
var _3c=str.indexOf("/",_3a);
if(_3c==-1){
_3c=str.length;
str+="/";
}
var _3d=str.slice(_3a,_3c);
this.authority=_3d;
_3a=_3c;
this.host=_3d;
var _3e=_3d.indexOf(":");
if(_3e!=-1){
this.host=_3d.slice(0,_3e);
this.port=parseInt(_3d.slice(_3e+1),10);
if(isNaN(this.port)){
throw new Error("Invalid URI syntax");
}
}
}
var _3f=str.indexOf("?",_3a);
if(_3f!=-1){
this.path=str.slice(_3a,_3f);
_3a=_3f+1;
}
var _40=str.indexOf("#",_3a);
if(_40!=-1){
if(_3f!=-1){
this.query=str.slice(_3a,_40);
}else{
this.path=str.slice(_3a,_40);
}
_3a=_40+1;
this.fragment=str.slice(_3a);
}else{
if(_3f!=-1){
this.query=str.slice(_3a);
}else{
this.path=str.slice(_3a);
}
}
};
(function(){
var _41=URI.prototype;
_41.toString=function(){
var sb=[];
var _43=this.scheme;
if(_43!==undefined){
sb.push(_43);
sb.push("://");
sb.push(this.host);
var _44=this.port;
if(_44!==undefined){
sb.push(":");
sb.push(_44.toString());
}
}
if(this.path!==undefined){
sb.push(this.path);
}
if(this.query!==undefined){
sb.push("?");
sb.push(this.query);
}
if(this.fragment!==undefined){
sb.push("#");
sb.push(this.fragment);
}
return sb.join("");
};
var _45={"http":80,"ws":80,"https":443,"wss":443};
})();
(function(){
Base64={};
Base64.encode=function(_46){
var _47=[];
var _48;
var _49;
var _4a;
while(_46.length){
switch(_46.length){
case 1:
_48=_46.shift();
_47.push(_4b[(_48>>2)&63]);
_47.push(_4b[((_48<<4)&48)]);
_47.push("=");
_47.push("=");
break;
case 2:
_48=_46.shift();
_49=_46.shift();
_47.push(_4b[(_48>>2)&63]);
_47.push(_4b[((_48<<4)&48)|((_49>>4)&15)]);
_47.push(_4b[(_49<<2)&60]);
_47.push("=");
break;
default:
_48=_46.shift();
_49=_46.shift();
_4a=_46.shift();
_47.push(_4b[(_48>>2)&63]);
_47.push(_4b[((_48<<4)&48)|((_49>>4)&15)]);
_47.push(_4b[((_49<<2)&60)|((_4a>>6)&3)]);
_47.push(_4b[_4a&63]);
break;
}
}
return _47.join("");
};
Base64.decode=function(_4c){
if(_4c.length===0){
return [];
}
if(_4c.length%4!==0){
throw new Error("Invalid base64 string (must be quads)");
}
var _4d=[];
for(var i=0;i<_4c.length;i+=4){
var _4f=_4c.charAt(i);
var _50=_4c.charAt(i+1);
var _51=_4c.charAt(i+2);
var _52=_4c.charAt(i+3);
var _53=_54[_4f];
var _55=_54[_50];
var _56=_54[_51];
var _57=_54[_52];
_4d.push(((_53<<2)&252)|((_55>>4)&3));
if(_51!="="){
_4d.push(((_55<<4)&240)|((_56>>2)&15));
if(_52!="="){
_4d.push(((_56<<6)&192)|(_57&63));
}
}
}
return _4d;
};
var _4b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
var _54={"=":0};
for(var i=0;i<_4b.length;i++){
_54[_4b[i]]=i;
}
if(typeof (window.btoa)==="undefined"){
window.btoa=function(s){
var _5a=s.split("");
for(var i=0;i<_5a.length;i++){
_5a[i]=(_5a[i]).charCodeAt();
}
return Base64.encode(_5a);
};
window.atob=function(_5c){
var _5d=Base64.decode(_5c);
for(var i=0;i<_5d.length;i++){
_5d[i]=String.fromCharCode(_5d[i]);
}
return _5d.join("");
};
}
})();
var postMessage0=(function(){
var _5f=new URI((browser=="ie")?document.URL:location.href);
var _60={"http":80,"https":443};
if(_5f.port==null){
_5f.port=_60[_5f.scheme];
_5f.authority=_5f.host+":"+_5f.port;
}
var _61=_5f.scheme+"://"+_5f.authority;
var _62="/.kr";
if(typeof (postMessage)!=="undefined"){
return function(_63,_64,_65){
if(typeof (_64)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
switch(browser){
case "ie":
case "opera":
case "firefox":
setTimeout(function(){
_63.postMessage(_64,_65);
},0);
break;
default:
_63.postMessage(_64,_65);
break;
}
};
}else{
function MessagePipe(_66){
this.sourceToken=toPaddedHex(Math.floor(Math.random()*(Math.pow(2,32)-1)),8);
this.iframe=_66;
this.bridged=false;
this.lastWrite=0;
this.lastRead=0;
this.lastReadIndex=2;
this.lastSyn=0;
this.lastAck=0;
this.queue=[];
this.escapedFragments=[];
};
var _67=MessagePipe.prototype;
_67.attach=function(_68,_69,_6a,_6b,_6c,_6d){
this.target=_68;
this.targetOrigin=_69;
this.targetToken=_6a;
this.reader=_6b;
this.writer=_6c;
this.writerURL=_6d;
try{
this._lastHash=_6b.location.hash;
this.poll=pollLocationHash;
}
catch(permissionDenied){
this._lastDocumentURL=_6b.document.URL;
this.poll=pollDocumentURL;
}
if(_68==parent){
dequeue(this,true);
}
};
_67.detach=function(){
this.poll=function(){
};
delete this.target;
delete this.targetOrigin;
delete this.reader;
delete this.lastFragment;
delete this.writer;
delete this.writerURL;
};
_67.poll=function(){
};
function pollLocationHash(){
var _6e=this.reader.location.hash;
if(this._lastHash!=_6e){
process(this,_6e.substring(1));
this._lastHash=_6e;
}
};
function pollDocumentURL(){
var _6f=this.reader.document.URL;
if(this._lastDocumentURL!=_6f){
var _70=_6f.indexOf("#");
if(_70!=-1){
process(this,_6f.substring(_70+1));
this._lastDocumentURL=_6f;
}
}
};
_67.post=function(_71,_72,_73){
bridgeIfNecessary(this,_71);
var _74=1000;
var _75=escape(_72);
var _76=[];
while(_75.length>_74){
var _77=_75.substring(0,_74);
_75=_75.substring(_74);
_76.push(_77);
}
_76.push(_75);
this.queue.push([_73,_76]);
if(this.writer!=null&&this.lastAck>=this.lastSyn){
dequeue(this,false);
}
};
function bridgeIfNecessary(_78,_79){
if(_78.lastWrite<1&&!_78.bridged){
if(_79.parent==window){
var src=_78.iframe.src;
var _7b=src.split("#");
var _7c=null;
var _7d=document.getElementsByTagName("meta");
for(var i=0;i<_7d.length;i++){
if(_7d[i].name=="kaazing:resources"){
alert("kaazing:resources is no longer supported. Please refer to the Administrator's Guide section entitled \"Configuring a Web Server to Integrate with Kaazing Gateway\"");
}
}
var _7f=_61;
var _80=_7f.toString()+_62+"?.kr=xsp&.kv=10.05";
if(_7c){
var _81=new URI(_7f.toString());
var _7b=_7c.split(":");
_81.host=_7b.shift();
if(_7b.length){
_81.port=_7b.shift();
}
_80=_81.toString()+_62+"?.kr=xsp&.kv=10.05";
}
for(var i=0;i<_7d.length;i++){
if(_7d[i].name=="kaazing:postMessageBridgeURL"){
var _82=_7d[i].content;
var _83=new URI(_82);
var _84=new URI(location.toString());
if(!_83.authority){
_83.host=_84.host;
_83.port=_84.port;
_83.scheme=_84.scheme;
if(_82.indexOf("/")!=0){
var _85=_84.path.split("/");
_85.pop();
_85.push(_82);
_83.path=_85.join("/");
}
}
postMessage0.BridgeURL=_83.toString();
}
}
if(postMessage0.BridgeURL){
_80=postMessage0.BridgeURL;
}
var _86=["I",_7f,_78.sourceToken,escape(_80)];
if(_7b.length>1){
var _87=_7b[1];
_86.push(escape(_87));
}
_7b[1]=_86.join("!");
setTimeout(function(){
_79.location.replace(_7b.join("#"));
},200);
_78.bridged=true;
}
}
};
function flush(_88,_89){
var _8a=_88.writerURL+"#"+_89;
_88.writer.location.replace(_8a);
};
function fromHex(_8b){
return parseInt(_8b,16);
};
function toPaddedHex(_8c,_8d){
var hex=_8c.toString(16);
var _8f=[];
_8d-=hex.length;
while(_8d-->0){
_8f.push("0");
}
_8f.push(hex);
return _8f.join("");
};
function dequeue(_90,_91){
var _92=_90.queue;
var _93=_90.lastRead;
if((_92.length>0||_91)&&_90.lastSyn>_90.lastAck){
var _94=_90.lastFrames;
var _95=_90.lastReadIndex;
if(fromHex(_94[_95])!=_93){
_94[_95]=toPaddedHex(_93,8);
flush(_90,_94.join(""));
}
}else{
if(_92.length>0){
var _96=_92.shift();
var _97=_96[0];
if(_97=="*"||_97==_90.targetOrigin){
_90.lastWrite++;
var _98=_96[1];
var _99=_98.shift();
var _9a=3;
var _94=[_90.targetToken,toPaddedHex(_90.lastWrite,8),toPaddedHex(_93,8),"F",toPaddedHex(_99.length,4),_99];
var _95=2;
if(_98.length>0){
_94[_9a]="f";
_90.queue.unshift(_96);
}
if(_90.resendAck){
var _9b=[_90.targetToken,toPaddedHex(_90.lastWrite-1,8),toPaddedHex(_93,8),"a"];
_94=_9b.concat(_94);
_95+=_9b.length;
}
flush(_90,_94.join(""));
_90.lastFrames=_94;
_90.lastReadIndex=_95;
_90.lastSyn=_90.lastWrite;
_90.resendAck=false;
}
}else{
if(_91){
_90.lastWrite++;
var _94=[_90.targetToken,toPaddedHex(_90.lastWrite,8),toPaddedHex(_93,8),"a"];
var _95=2;
if(_90.resendAck){
var _9b=[_90.targetToken,toPaddedHex(_90.lastWrite-1,8),toPaddedHex(_93,8),"a"];
_94=_9b.concat(_94);
_95+=_9b.length;
}
flush(_90,_94.join(""));
_90.lastFrames=_94;
_90.lastReadIndex=_95;
_90.resendAck=true;
}
}
}
};
function process(_9c,_9d){
var _9e=_9d.substring(0,8);
var _9f=fromHex(_9d.substring(8,16));
var _a0=fromHex(_9d.substring(16,24));
var _a1=_9d.charAt(24);
if(_9e!=_9c.sourceToken){
throw new Error("postMessage emulation tampering detected");
}
var _a2=_9c.lastRead;
var _a3=_a2+1;
if(_9f==_a3){
_9c.lastRead=_a3;
}
if(_9f==_a3||_9f==_a2){
_9c.lastAck=_a0;
}
if(_9f==_a3||(_9f==_a2&&_a1=="a")){
switch(_a1){
case "f":
var _a4=_9d.substr(29,fromHex(_9d.substring(25,29)));
_9c.escapedFragments.push(_a4);
dequeue(_9c,true);
break;
case "F":
var _a5=_9d.substr(29,fromHex(_9d.substring(25,29)));
if(_9c.escapedFragments!==undefined){
_9c.escapedFragments.push(_a5);
_a5=_9c.escapedFragments.join("");
_9c.escapedFragments=[];
}
var _a6=unescape(_a5);
dispatch(_a6,_9c.target,_9c.targetOrigin);
dequeue(_9c,true);
break;
case "a":
if(_9d.length>25){
process(_9c,_9d.substring(25));
}else{
dequeue(_9c,false);
}
break;
default:
throw new Error("unknown postMessage emulation payload type: "+_a1);
}
}
};
function dispatch(_a7,_a8,_a9){
var _aa=document.createEvent("Events");
_aa.initEvent("message",false,true);
_aa.data=_a7;
_aa.origin=_a9;
_aa.source=_a8;
dispatchEvent(_aa);
};
var _ab={};
var _ac=[];
function pollReaders(){
for(var i=0,len=_ac.length;i<len;i++){
var _af=_ac[i];
_af.poll();
}
setTimeout(pollReaders,20);
};
function findMessagePipe(_b0){
if(_b0==parent){
return _ab["parent"];
}else{
if(_b0.parent==window){
var _b1=document.getElementsByTagName("iframe");
for(var i=0;i<_b1.length;i++){
var _b3=_b1[i];
if(_b0==_b3.contentWindow){
return supplyIFrameMessagePipe(_b3);
}
}
}else{
throw new Error("Generic peer postMessage not yet implemented");
}
}
};
function supplyIFrameMessagePipe(_b4){
var _b5=_b4._name;
if(_b5===undefined){
_b5="iframe$"+String(Math.random()).substring(2);
_b4._name=_b5;
}
var _b6=_ab[_b5];
if(_b6===undefined){
_b6=new MessagePipe(_b4);
_ab[_b5]=_b6;
}
return _b6;
};
function postMessage0(_b7,_b8,_b9){
if(typeof (_b8)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
if(_b7==window){
if(_b9=="*"||_b9==_61){
dispatch(_b8,window,_61);
}
}else{
var _ba=findMessagePipe(_b7);
_ba.post(_b7,_b8,_b9);
}
};
postMessage0.attach=function(_bb,_bc,_bd,_be,_bf,_c0){
var _c1=findMessagePipe(_bb);
_c1.attach(_bb,_bc,_bd,_be,_bf,_c0);
_ac.push(_c1);
};
var _c2=function(_c3){
var _c4=new URI((browser=="ie")?document.URL:location.href);
var _c5;
var _c6={"http":80,"https":443};
if(_c4.port==null){
_c4.port=_c6[_c4.scheme];
_c4.authority=_c4.host+":"+_c4.port;
}
var _c7=unescape(_c4.fragment||"");
if(_c7.length>0){
var _c8=_c7.split(",");
var _c9=_c8.shift();
var _ca=_c8.shift();
var _cb=_c8.shift();
var _cc=_c4.scheme+"://"+document.domain+":"+_c4.port;
var _cd=_c4.scheme+"://"+_c4.authority;
var _ce=_c9+"/.kr?.kr=xsc&.kv=10.05";
var _cf=document.location.toString().split("#")[0];
var _d0=_ce+"#"+escape([_cc,_ca,escape(_cf)].join(","));
if(typeof (ActiveXObject)!="undefined"){
_c5=new ActiveXObject("htmlfile");
_c5.open();
try{
_c5.parentWindow.opener=window;
}
catch(domainError){
if(_c3){
_c5.domain=_c3;
}
_c5.parentWindow.opener=window;
}
_c5.write("<html>");
_c5.write("<body>");
if(_c3){
_c5.write("<script>CollectGarbage();document.domain='"+_c3+"';</"+"script>");
}
_c5.write("<iframe src=\""+_ce+"\"></iframe>");
_c5.write("</body>");
_c5.write("</html>");
_c5.close();
var _d1=_c5.body.lastChild;
var _d2=_c5.parentWindow;
var _d3=parent;
var _d4=_d3.parent.postMessage0;
if(typeof (_d4)!="undefined"){
_d1.onload=function(){
var _d5=_d1.contentWindow;
_d5.location.replace(_d0);
_d4.attach(_d3,_c9,_cb,_d2,_d5,_ce);
};
}
}else{
var _d1=document.createElement("iframe");
_d1.src=_d0;
document.body.appendChild(_d1);
var _d2=window;
var _d6=_d1.contentWindow;
var _d3=parent;
var _d4=_d3.parent.postMessage0;
if(typeof (_d4)!="undefined"){
_d4.attach(_d3,_c9,_cb,_d2,_d6,_ce);
}
}
}
window.onunload=function(){
try{
var _d7=window.parent.parent.postMessage0;
if(typeof (_d7)!="undefined"){
_d7.detach(_d3);
}
}
catch(permissionDenied){
}
if(typeof (_c5)!=="undefined"){
_c5.parentWindow.opener=null;
_c5.open();
_c5.close();
_c5=null;
CollectGarbage();
}
};
};
postMessage0.__init__=function(_d8,_d9){
var _da=_c2.toString();
_d8.URI=URI;
_d8.browser=browser;
if(!_d9){
_d9="";
}
_d8.setTimeout("("+_da+")('"+_d9+"')",0);
};
postMessage0.bridgeURL=false;
postMessage0.detach=function(_db){
var _dc=findMessagePipe(_db);
for(var i=0;i<_ac.length;i++){
if(_ac[i]==_dc){
_ac.splice(i,1);
}
}
_dc.detach();
};
if(window!=top){
_ab["parent"]=new MessagePipe();
function initializeAsTargetIfNecessary(){
var _de=new URI((browser=="ie")?document.URL:location.href);
var _df=_de.fragment||"";
if(document.body!=null&&_df.length>0&&_df.charAt(0)=="I"){
var _e0=unescape(_df);
var _e1=_e0.split("!");
if(_e1.shift()=="I"){
var _e2=_e1.shift();
var _e3=_e1.shift();
var _e4=unescape(_e1.shift());
var _e5=_61;
if(_e2==_e5){
try{
parent.location.hash;
}
catch(permissionDenied){
document.domain=document.domain;
}
}
var _e6=_e1.shift()||"";
switch(browser){
case "firefox":
location.replace([location.href.split("#")[0],_e6].join("#"));
break;
default:
location.hash=_e6;
break;
}
var _e7=findMessagePipe(parent);
_e7.targetToken=_e3;
var _e8=_e7.sourceToken;
var _e9=_e4+"#"+escape([_e5,_e3,_e8].join(","));
var _ea;
_ea=document.createElement("iframe");
_ea.src=_e9;
_ea.style.position="absolute";
_ea.style.left="-10px";
_ea.style.top="10px";
_ea.style.visibility="hidden";
_ea.style.width="0px";
_ea.style.height="0px";
document.body.appendChild(_ea);
return;
}
}
setTimeout(initializeAsTargetIfNecessary,20);
};
initializeAsTargetIfNecessary();
}
var _eb=document.getElementsByTagName("meta");
for(var i=0;i<_eb.length;i++){
if(_eb[i].name==="kaazing:postMessage"){
if("immediate"==_eb[i].content){
var _ed=function(){
var _ee=document.getElementsByTagName("iframe");
for(var i=0;i<_ee.length;i++){
var _f0=_ee[i];
if(_f0.style["KaaPostMessage"]=="immediate"){
_f0.style["KaaPostMessage"]="none";
var _f1=supplyIFrameMessagePipe(_f0);
bridgeIfNecessary(_f1,_f0.contentWindow);
}
}
setTimeout(_ed,20);
};
setTimeout(_ed,20);
}
break;
}
}
for(var i=0;i<_eb.length;i++){
if(_eb[i].name==="kaazing:postMessagePrefix"){
var _f2=_eb[i].content;
if(_f2!=null&&_f2.length>0){
if(_f2.charAt(0)!="/"){
_f2="/"+_f2;
}
_62=_f2;
}
}
}
setTimeout(pollReaders,20);
return postMessage0;
}
})();
var XMLHttpRequest0=(function(){
var _f3=new URI((browser=="ie")?document.URL:location.href);
var _f4={"http":80,"https":443};
if(_f3.port==null){
_f3.port=_f4[_f3.scheme];
_f3.authority=_f3.host+":"+_f3.port;
}
var _f5={};
var _f6={};
var _f7=0;
function XMLHttpRequest0(){
if(browser=="firefox"&&typeof (Object.getPrototypeOf)=="function"){
var xhr=new XMLHttpRequest();
xhr.withCredentials=true;
return xhr;
}
};
var _f9=XMLHttpRequest0.prototype;
_f9.readyState=0;
_f9.responseText="";
_f9.status=0;
_f9.statusText="";
_f9.timeout=0;
_f9.onreadystatechange;
_f9.onerror;
_f9.onload;
_f9.onprogress;
_f9.open=function(_fa,_fb,_fc){
if(!_fc){
throw new Error("Asynchronous is required for cross-origin XMLHttpRequest emulation");
}
switch(this.readyState){
case 0:
case 4:
break;
default:
throw new Error("Invalid ready state");
}
if(_fb.indexOf(".kv=")==-1){
_fb+=((_fb.indexOf("?")==-1)?"?":"&")+".kv=10.05";
}else{
_fb=_fb.replace(/\.kv=[^&]*(.*)/,".kv=10.05$1");
}
var id=register(this);
var _fe=supplyPipe(this,_fb);
_fe.attach(id);
this._pipe=_fe;
this._requestHeaders=[];
this._method=_fa;
this._location=_fb;
this._responseHeaders=null;
this.readyState=1;
this.status=0;
this.statusText="";
this.responseText="";
var _ff=this;
setTimeout(function(){
_ff.readyState=1;
onreadystatechange(_ff);
},0);
};
_f9.setRequestHeader=function(_100,_101){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
this._requestHeaders.push([_100,_101]);
};
_f9.send=function(_102){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
var _103=this;
setTimeout(function(){
_103.readyState=2;
onreadystatechange(_103);
},0);
doSend(this,_102);
};
_f9.abort=function(){
var pipe=this._pipe;
if(pipe!==undefined){
pipe.post(["a",this._id].join(""));
pipe.detach(this._id);
}
};
_f9.getResponseHeader=function(_105){
if(this.status==0){
throw new Error("Invalid ready state");
}
var _106=this._responseHeaders;
return _106[_105];
};
_f9.getAllResponseHeaders=function(){
if(this.status==0){
throw new Error("Invalid ready state");
}
return null;
};
function onreadystatechange(_107){
if(typeof (_107.onreadystatechange)!=="undefined"){
_107.onreadystatechange();
}
switch(_107.readyState){
case 3:
if(typeof (_107.onprogress)!=="undefined"){
_107.onprogress();
}
break;
case 4:
switch(Math.floor(_107.status/100)){
case 0:
case 5:
if(typeof (_107.onerror)!=="undefined"){
_107.onerror();
}
break;
default:
if(typeof (_107.onprogress)!=="undefined"){
_107.onprogress();
}
if(typeof (_107.onload)!=="undefined"){
_107.onload();
}
break;
}
break;
}
};
function register(_108){
var id=toPaddedHex(_f7++,8);
_f6[id]=_108;
_108._id=id;
return id;
};
function doSend(_10a,_10b){
if(typeof (_10b)!=="string"){
_10b="";
}
var _10c=_10a._method.substring(0,10);
var _10d=_10a._location;
var _10e=_10a._requestHeaders;
var _10f=toPaddedHex(_10a.timeout,4);
var _110=(_10a.onprogress!==undefined)?"t":"f";
var _111=["s",_10a._id,_10c.length,_10c,toPaddedHex(_10d.length,4),_10d,toPaddedHex(_10e.length,4)];
for(var i=0;i<_10e.length;i++){
var _113=_10e[i];
_111.push(toPaddedHex(_113[0].length,4));
_111.push(_113[0]);
_111.push(toPaddedHex(_113[1].length,4));
_111.push(_113[1]);
}
_111.push(toPaddedHex(_10b.length,8),_10b,toPaddedHex(_10f,4),_110);
_10a._pipe.post(_111.join(""));
};
function supplyPipe(_114,_115){
var uri=new URI(_115);
var _117=(uri.scheme!=null&&uri.authority!=null);
var _118=_117?uri.scheme:_f3.scheme;
var _119=_117?uri.authority:_f3.authority;
if(_119!=null&&uri.port==null){
_119=uri.host+":"+_f4[_118];
}
var _11a=_118+"://"+_119;
var pipe=_f5[_11a];
if(pipe!==undefined){
if(!("iframe" in pipe&&"contentWindow" in pipe.iframe&&typeof pipe.iframe.contentWindow=="object")){
pipe=_f5[_11a]=undefined;
}
}
if(pipe===undefined){
var _11c=document.createElement("iframe");
_11c.style.position="absolute";
_11c.style.left="-10px";
_11c.style.top="10px";
_11c.style.visibility="hidden";
_11c.style.width="0px";
_11c.style.height="0px";
var _11d=new URI(_11a);
_11d.query=".kr=xs&.kv=10.05";
_11d.path="/";
_11c.src=_11d.toString();
function post(_11e){
this.buffer.push(_11e);
};
function attach(id){
var _120=this.attached[id];
if(_120===undefined){
_120={};
this.attached[id]=_120;
}
if(_120.timerID!==undefined){
clearTimeout(_120.timerID);
delete _120.timerID;
}
};
function detach(id){
var _122=this.attached[id];
if(_122!==undefined&&_122.timerID===undefined){
var _123=this;
_122.timerID=setTimeout(function(){
delete _123.attached[id];
var xhr=_f6[id];
if(xhr._pipe==pipe){
delete _f6[id];
delete xhr._id;
delete xhr._pipe;
}
postMessage0(pipe.iframe.contentWindow,["d",id].join(""),pipe.targetOrigin);
},10000);
}
};
pipe={"targetOrigin":_11a,"iframe":_11c,"buffer":[],"post":post,"attach":attach,"detach":detach,"attached":{count:0}};
_f5[_11a]=pipe;
function sendInitWhenReady(){
var _125=_11c.contentWindow;
if(!_125){
setTimeout(sendInitWhenReady,20);
}else{
postMessage0(_125,"I",_11a);
}
};
pipe.handshakeID=setTimeout(function(){
_f5[_11a]=undefined;
pipe.post=function(_126){
_114.readyState=4;
_114.status=0;
onreadystatechange(_114);
};
if(pipe.buffer.length>0){
pipe.post();
}
},30000);
document.body.appendChild(_11c);
sendInitWhenReady();
}
return pipe;
};
function onmessage(_127){
var _128=_127.origin;
var _129={"http":":80","https":":443"};
var _12a=_128.split(":");
if(_12a.length===2){
_128+=_129[_12a[0]];
}
var pipe=_f5[_128];
if(pipe!==undefined&&pipe.iframe!==undefined&&_127.source==pipe.iframe.contentWindow){
if(_127.data=="I"){
clearTimeout(pipe.handshakeID);
var _12c;
while((_12c=pipe.buffer.shift())!==undefined){
postMessage0(pipe.iframe.contentWindow,_12c,pipe.targetOrigin);
}
pipe.post=function(_12d){
postMessage0(pipe.iframe.contentWindow,_12d,pipe.targetOrigin);
};
}else{
var _12c=_127.data;
if(_12c.length>=9){
var _12e=0;
var type=_12c.substring(_12e,_12e+=1);
var id=_12c.substring(_12e,_12e+=8);
var _131=_f6[id];
if(_131!==undefined){
switch(type){
case "r":
var _132={};
var _133=fromHex(_12c.substring(_12e,_12e+=2));
for(var i=0;i<_133;i++){
var _135=fromHex(_12c.substring(_12e,_12e+=4));
var _136=_12c.substring(_12e,_12e+=_135);
var _137=fromHex(_12c.substring(_12e,_12e+=4));
var _138=_12c.substring(_12e,_12e+=_137);
_132[_136]=_138;
}
var _139=fromHex(_12c.substring(_12e,_12e+=4));
var _13a=fromHex(_12c.substring(_12e,_12e+=2));
var _13b=_12c.substring(_12e,_12e+=_13a);
switch(_139){
case 301:
case 302:
case 307:
var _13c=_132["Location"];
var id=register(_131);
var pipe=supplyPipe(_131,_13c);
pipe.attach(id);
_131._pipe=pipe;
_131._method="GET";
_131._location=_13c;
_131._redirect=true;
break;
default:
_131._responseHeaders=_132;
_131.status=_139;
_131.statusText=_13b;
break;
}
break;
case "p":
var _13d=parseInt(_12c.substring(_12e,_12e+=1));
if(_131._id===id){
_131.readyState=_13d;
var _13e=fromHex(_12c.substring(_12e,_12e+=8));
var _13f=_12c.substring(_12e,_12e+=_13e);
if(_13f.length>0){
_131.responseText+=_13f;
}
onreadystatechange(_131);
}else{
if(_131._redirect){
_131._redirect=false;
doSend(_131,"");
}
}
if(_13d==4){
pipe.detach(id);
}
break;
case "e":
if(_131._id===id){
_131.status=0;
_131.statusText="";
_131.readyState=4;
onreadystatechange(_131);
}
pipe.detach(id);
break;
case "t":
if(_131._id===id){
_131.status=0;
_131.statusText="";
_131.readyState=4;
if(typeof (_131.ontimeout)!=="undefined"){
_131.ontimeout();
}
}
pipe.detach(id);
break;
}
}
}
}
}else{
}
};
function fromHex(_140){
return parseInt(_140,16);
};
function toPaddedHex(_141,_142){
var hex=_141.toString(16);
var _144=[];
_142-=hex.length;
while(_142-->0){
_144.push("0");
}
_144.push(hex);
return _144.join("");
};
window.addEventListener("message",onmessage,false);
return XMLHttpRequest0;
})();
ByteOrder=function(){
};
(function(){
var _145=ByteOrder.prototype;
_145.toString=function(){
throw new Error("Abstract");
};
var _146=function(v){
return (v&255);
};
var _148=function(_149){
return (_149&128)?(_149|-256):_149;
};
var _14a=function(v){
return [((v>>8)&255),(v&255)];
};
var _14c=function(_14d,_14e){
return (_148(_14d)<<8)|(_14e&255);
};
var _14f=function(_150,_151){
return ((_150&255)<<8)|(_151&255);
};
var _152=function(_153,_154,_155){
return ((_153&255)<<16)|((_154&255)<<8)|(_155&255);
};
var _156=function(v){
return [((v>>16)&255),((v>>8)&255),(v&255)];
};
var _158=function(_159,_15a,_15b){
return ((_159&255)<<16)|((_15a&255)<<8)|(_15b&255);
};
var _15c=function(v){
return [((v>>24)&255),((v>>16)&255),((v>>8)&255),(v&255)];
};
var _15e=function(_15f,_160,_161,_162){
return (_148(_15f)<<24)|((_160&255)<<16)|((_161&255)<<8)|(_162&255);
};
var _163=function(_164,_165,_166,_167){
var _168=_14f(_164,_165);
var _169=_14f(_166,_167);
return (_168*65536+_169);
};
ByteOrder.BIG_ENDIAN=(function(){
var _16a=function(){
};
_16a.prototype=new ByteOrder();
var _16b=_16a.prototype;
_16b._toUnsignedByte=_146;
_16b._toByte=_148;
_16b._fromShort=_14a;
_16b._toShort=_14c;
_16b._toUnsignedShort=_14f;
_16b._toUnsignedMediumInt=_152;
_16b._fromMediumInt=_156;
_16b._toMediumInt=_158;
_16b._fromInt=_15c;
_16b._toInt=_15e;
_16b._toUnsignedInt=_163;
_16b.toString=function(){
return "<ByteOrder.BIG_ENDIAN>";
};
return new _16a();
})();
ByteOrder.LITTLE_ENDIAN=(function(){
var _16c=function(){
};
_16c.prototype=new ByteOrder();
var _16d=_16c.prototype;
_16d._toByte=_148;
_16d._toUnsignedByte=_146;
_16d._fromShort=function(v){
return _14a(v).reverse();
};
_16d._toShort=function(_16f,_170){
return _14c(_170,_16f);
};
_16d._toUnsignedShort=function(_171,_172){
return _14f(_172,_171);
};
_16d._toUnsignedMediumInt=function(_173,_174,_175){
return _152(_175,_174,_173);
};
_16d._fromMediumInt=function(v){
return _156(v).reverse();
};
_16d._toMediumInt=function(_177,_178,_179,_17a,_17b,_17c){
return _158(_17c,_17b,_17a,_179,_178,_177);
};
_16d._fromInt=function(v){
return _15c(v).reverse();
};
_16d._toInt=function(_17e,_17f,_180,_181){
return _15e(_181,_180,_17f,_17e);
};
_16d._toUnsignedInt=function(_182,_183,_184,_185){
return _163(_185,_184,_183,_182);
};
_16d.toString=function(){
return "<ByteOrder.LITTLE_ENDIAN>";
};
return new _16c();
})();
})();
function ByteBuffer(_186){
this.array=_186||[];
this._mark=-1;
this.limit=this.capacity=this.array.length;
this.order=ByteOrder.BIG_ENDIAN;
};
(function(){
ByteBuffer.allocate=function(_187){
var buf=new ByteBuffer();
buf.capacity=_187;
buf.limit=_187;
return buf;
};
ByteBuffer.wrap=function(_189){
return new ByteBuffer(_189);
};
var _18a=ByteBuffer.prototype;
_18a.autoExpand=true;
_18a.capacity=0;
_18a.position=0;
_18a.limit=0;
_18a.order=ByteOrder.BIG_ENDIAN;
_18a.array=[];
_18a.mark=function(){
this._mark=this.position;
return this;
};
_18a.reset=function(){
var m=this._mark;
if(m<0){
throw new Error("Invalid mark");
}
this.position=m;
return this;
};
_18a.compact=function(){
this.array.splice(0,this.position);
this.limit-=this.position;
this.position=0;
return this;
};
_18a.duplicate=function(){
var buf=new ByteBuffer(this.array);
buf.position=this.position;
buf.limit=this.limit;
buf.capacity=this.capacity;
return buf;
};
_18a.fill=function(size){
_autoExpand(this,size);
while(size-->0){
this.put(0);
}
return this;
};
_18a.fillWith=function(b,size){
_autoExpand(this,size);
while(size-->0){
this.put(b);
}
return this;
};
_18a.indexOf=function(b){
var _191=this.limit;
var _192=this.array;
for(var i=this.position;i<_191;i++){
if(_192[i]==b){
return i;
}
}
return -1;
};
_18a.put=function(v){
_autoExpand(this,1);
this.putAt(this.position++,v);
return this;
};
_18a.putAt=function(_195,v){
_checkForWriteAt(this,_195,1);
this.array[_195]=this.order._toUnsignedByte(v);
return this;
};
_18a.putUnsigned=function(v){
_autoExpand(this,1);
this.putUnsignedAt(this.position,v&255);
this.position+=1;
return this;
};
_18a.putUnsignedAt=function(_198,v){
_checkForWriteAt(this,_198,1);
this.putAt(_198,v&255);
return this;
};
_18a.putShort=function(v){
_autoExpand(this,2);
this.putShortAt(this.position,v);
this.position+=2;
return this;
};
_18a.putShortAt=function(_19b,v){
_checkForWriteAt(this,_19b,2);
this.putBytesAt(_19b,this.order._fromShort(v));
return this;
};
_18a.putUnsignedShort=function(v){
_autoExpand(this,2);
this.putUnsignedShortAt(this.position,v&65535);
this.position+=2;
return this;
};
_18a.putUnsignedShortAt=function(_19e,v){
_checkForWriteAt(this,_19e,2);
this.putShortAt(_19e,v&65535);
return this;
};
_18a.putMediumInt=function(v){
_autoExpand(this,3);
this.putMediumIntAt(this.position,v);
this.position+=3;
return this;
};
_18a.putMediumIntAt=function(_1a1,v){
this.putBytesAt(_1a1,this.order._fromMediumInt(v));
return this;
};
_18a.putInt=function(v){
_autoExpand(this,4);
this.putIntAt(this.position,v);
this.position+=4;
return this;
};
_18a.putIntAt=function(_1a4,v){
_checkForWriteAt(this,_1a4,4);
this.putBytesAt(_1a4,this.order._fromInt(v));
return this;
};
_18a.putUnsignedInt=function(v){
_autoExpand(this,4);
this.putUnsignedIntAt(this.position,v&4294967295);
this.position+=4;
return this;
};
_18a.putUnsignedIntAt=function(_1a7,v){
_checkForWriteAt(this,_1a7,4);
this.putIntAt(_1a7,v&4294967295);
return this;
};
_18a.putString=function(v,cs){
cs.encode(v,this);
return this;
};
_18a.putPrefixedString=function(_1ab,v,cs){
if(typeof (cs)==="undefined"||typeof (cs.encode)==="undefined"){
throw new Error("ByteBuffer.putPrefixedString: character set parameter missing");
}
if(_1ab===0){
return this;
}
_autoExpand(this,_1ab);
var len=v.length;
switch(_1ab){
case 1:
this.put(len);
break;
case 2:
this.putShort(len);
break;
case 4:
this.putInt(len);
break;
}
cs.encode(v,this);
return this;
};
_18a.putBytes=function(v){
_autoExpand(this,v.length);
this.putBytesAt(this.position,v);
this.position+=v.length;
return this;
};
_18a.putBytesAt=function(_1b0,v){
_checkForWriteAt(this,_1b0,v.length);
for(var j=0,k=_1b0,len=v.length;j<len;j++,k++){
this.putAt(k,v[j]);
}
return this;
};
_18a.putBuffer=function(v){
this.putBytes(v.array.slice(v.position,v.limit));
return this;
};
_18a.putBufferAt=function(_1b6,v){
this.putBytesAt(_1b6,v.array.slice(v.position,v.limit));
return this;
};
_18a.get=function(){
_checkForRead(this,1);
return this.getAt(this.position++);
};
_18a.getAt=function(_1b8){
_checkForReadAt(this,_1b8,1);
return this.order._toByte(this.array[_1b8]);
};
_18a.getUnsigned=function(){
_checkForRead(this,1);
var val=this.getUnsignedAt(this.position);
this.position+=1;
return val;
};
_18a.getUnsignedAt=function(_1ba){
_checkForReadAt(this,_1ba,1);
return this.order._toUnsignedByte(this.array[_1ba]);
};
_18a.getBytes=function(size){
_checkForRead(this,size);
var _1bc=new Array();
for(var i=0;i<size;i++){
_1bc.push(this.order._toByte(this.array[i+this.position]));
}
this.position+=size;
return _1bc;
};
_18a.getBytesAt=function(_1be,size){
_checkForReadAt(this,_1be,size);
var _1c0=new Array();
this.position=_1be;
for(var i=0;i<size;i++){
_1c0.push(this.order._toByte(this.array[i+this.position]));
}
this.position+=size;
return _1c0;
};
_18a.getShort=function(){
_checkForRead(this,2);
var val=this.getShortAt(this.position);
this.position+=2;
return val;
};
_18a.getShortAt=function(_1c3){
_checkForReadAt(this,_1c3,2);
var _1c4=this.array;
return this.order._toShort(_1c4[_1c3++],_1c4[_1c3++]);
};
_18a.getUnsignedShort=function(){
_checkForRead(this,2);
var val=this.getUnsignedShortAt(this.position);
this.position+=2;
return val;
};
_18a.getUnsignedShortAt=function(_1c6){
_checkForReadAt(this,_1c6,2);
var _1c7=this.array;
return this.order._toUnsignedShort(_1c7[_1c6++],_1c7[_1c6++]);
};
_18a.getUnsignedMediumInt=function(){
var _1c8=this.array;
return this.order._toUnsignedMediumInt(_1c8[this.position++],_1c8[this.position++],_1c8[this.position++]);
};
_18a.getMediumInt=function(){
var val=this.getMediumIntAt(this.position);
this.position+=3;
return val;
};
_18a.getMediumIntAt=function(i){
var _1cb=this.array;
return this.order._toMediumInt(_1cb[i++],_1cb[i++],_1cb[i++]);
};
_18a.getInt=function(){
_checkForRead(this,4);
var val=this.getIntAt(this.position);
this.position+=4;
return val;
};
_18a.getIntAt=function(_1cd){
_checkForReadAt(this,_1cd,4);
var _1ce=this.array;
return this.order._toInt(_1ce[_1cd++],_1ce[_1cd++],_1ce[_1cd++],_1ce[_1cd++]);
};
_18a.getUnsignedInt=function(){
_checkForRead(this,4);
var val=this.getUnsignedIntAt(this.position);
this.position+=4;
return val;
};
_18a.getUnsignedIntAt=function(_1d0){
_checkForReadAt(this,_1d0,4);
var _1d1=this.array;
return this.order._toUnsignedInt(_1d1[_1d0++],_1d1[_1d0++],_1d1[_1d0++],_1d1[_1d0++]);
return val;
};
_18a.getPrefixedString=function(_1d2,cs){
var len=0;
switch(_1d2||2){
case 1:
len=this.getUnsigned();
break;
case 2:
len=this.getUnsignedShort();
break;
case 4:
len=this.getInt();
break;
}
if(len===0){
return "";
}
var _1d5=this.limit;
try{
this.limit=this.position+len;
return cs.decode(this);
}
finally{
this.limit=_1d5;
}
};
_18a.getString=function(cs){
var _1d7=this.position;
var _1d8=this.limit;
var _1d9=this.array;
while(_1d7<_1d8&&_1d9[_1d7]!==0){
_1d7++;
}
try{
this.limit=_1d7;
return cs.decode(this);
}
finally{
if(_1d7!=_1d8){
this.limit=_1d8;
this.position=_1d7+1;
}
}
};
_18a.slice=function(){
return new ByteBuffer(this.array.slice(this.position,this.limit));
};
_18a.flip=function(){
this.limit=this.position;
this.position=0;
this._mark=-1;
return this;
};
_18a.rewind=function(){
this.position=0;
this._mark=-1;
return this;
};
_18a.clear=function(){
this.position=0;
this.limit=this.capacity;
this._mark=-1;
return this;
};
_18a.remaining=function(){
return (this.limit-this.position);
};
_18a.hasRemaining=function(){
return (this.limit>this.position);
};
_18a.skip=function(size){
this.position+=size;
return this;
};
_18a.getHexDump=function(){
var _1db=this.array;
var pos=this.position;
var _1dd=this.limit;
if(pos==_1dd){
return "empty";
}
var _1de=[];
for(var i=pos;i<_1dd;i++){
var hex=(_1db[i]||0).toString(16);
if(hex.length==1){
hex="0"+hex;
}
_1de.push(hex);
}
return _1de.join(" ");
};
_18a.toString=_18a.getHexDump;
_18a.expand=function(_1e1){
return this.expandAt(this.position,_1e1);
};
_18a.expandAt=function(i,_1e3){
var end=i+_1e3;
if(end>this.capacity){
this.capacity=end;
}
if(end>this.limit){
this.limit=end;
}
return this;
};
function _autoExpand(_1e5,_1e6){
if(_1e5.autoExpand){
_1e5.expand(_1e6);
}
return _1e5;
};
function _checkForRead(_1e7,_1e8){
var end=_1e7.position+_1e8;
if(end>_1e7.limit){
throw new Error("Buffer underflow");
}
return _1e7;
};
function _checkForReadAt(_1ea,_1eb,_1ec){
var end=_1eb+_1ec;
if(_1eb<0||end>_1ea.limit){
throw new Error("Index out of bounds");
}
return _1ea;
};
function _checkForWriteAt(_1ee,_1ef,_1f0){
var end=_1ef+_1f0;
if(_1ef<0||end>_1ee.limit){
throw new Error("Index out of bounds");
}
return _1ee;
};
})();
function Charset(){
};
(function(){
var _1f2=Charset.prototype;
_1f2.decode=function(buf){
};
_1f2.encode=function(text){
};
Charset.UTF8=(function(){
function UTF8(){
};
UTF8.prototype=new Charset();
var _1f5=UTF8.prototype;
_1f5.decode=function(buf){
var _1f7=[];
while(buf.hasRemaining()){
var _1f8=buf.remaining();
var _1f9=buf.getUnsigned();
var _1fa=charByteCount(_1f9);
if(_1f8<_1fa){
buf.skip(-1);
break;
}
var _1fb=null;
switch(_1fa){
case 1:
_1fb=_1f9;
break;
case 2:
_1fb=((_1f9&31)<<6)|(buf.getUnsigned()&63);
break;
case 3:
_1fb=((_1f9&15)<<12)|((buf.getUnsigned()&63)<<6)|(buf.getUnsigned()&63);
break;
case 4:
_1fb=((_1f9&7)<<18)|((buf.getUnsigned()&63)<<12)|((buf.getUnsigned()&63)<<6)|(buf.getUnsigned()&63);
break;
}
_1f7.push(_1fb);
}
return String.fromCharCode.apply(null,_1f7);
};
_1f5.encode=function(str,buf){
for(var i=0;i<str.length;i++){
var _1ff=str.charCodeAt(i);
if(_1ff<128){
buf.put(_1ff);
}else{
if(_1ff<2048){
buf.put((_1ff>>6)|192);
buf.put((_1ff&63)|128);
}else{
if(_1ff<65536){
buf.put((_1ff>>12)|224);
buf.put(((_1ff>>6)&63)|128);
buf.put((_1ff&63)|128);
}else{
if(_1ff<1114112){
buf.put((_1ff>>18)|240);
buf.put(((_1ff>>12)&63)|128);
buf.put(((_1ff>>6)&63)|128);
buf.put((_1ff&63)|128);
}else{
throw new Error("Invalid UTF-8 string");
}
}
}
}
}
};
function charByteCount(b){
if((b&128)===0){
return 1;
}
if((b&32)===0){
return 2;
}
if((b&16)===0){
return 3;
}
if((b&8)===0){
return 4;
}
throw new Error("Invalid UTF-8 bytes");
};
return new UTF8();
})();
})();
(function(){
var _201="WebSocket";
var _202=function(name){
this._name=name;
this._level=_202.Level.INFO;
};
(function(){
_202.Level={OFF:8,SEVERE:7,WARNING:6,INFO:5,CONFIG:4,FINE:3,FINER:2,FINEST:1,ALL:0};
var _204;
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name==="kaazing:logging"){
_204=tags[i].content;
break;
}
}
_202._logConf={};
if(_204){
var _207=_204.split(",");
for(var i=0;i<_207.length;i++){
var _208=_207[i].split("=");
_202._logConf[_208[0]]=_208[1];
}
}
var _209={};
_202.getLogger=function(name){
var _20b=_209[name];
if(_20b===undefined){
_20b=new _202(name);
_209[name]=_20b;
}
return _20b;
};
var _20c=_202.prototype;
_20c.setLevel=function(_20d){
if(_20d&&_20d>=_202.Level.ALL&&_20d<=_202.Level.OFF){
this._level=_20d;
}
};
_20c.isLoggable=function(_20e){
for(var _20f in _202._logConf){
if(this._name.match(_20f)){
var _210=_202._logConf[_20f];
if(_210){
return (_202.Level[_210]<=_20e);
}
}
}
return (this._level<=_20e);
};
var noop=function(){
};
var _212={};
_212[_202.Level.OFF]=noop;
_212[_202.Level.SEVERE]=(window.console)?(console.error||console.log||noop):noop;
_212[_202.Level.WARNING]=(window.console)?(console.warn||console.log||noop):noop;
_212[_202.Level.INFO]=(window.console)?(console.info||console.log||noop):noop;
_212[_202.Level.CONFIG]=(window.console)?(console.info||console.log||noop):noop;
_212[_202.Level.FINE]=(window.console)?(console.debug||console.log||noop):noop;
_212[_202.Level.FINER]=(window.console)?(console.debug||console.log||noop):noop;
_212[_202.Level.FINEST]=(window.console)?(console.debug||console.log||noop):noop;
_212[_202.Level.ALL]=(window.console)?(console.log||noop):noop;
_20c.config=function(_213,_214){
this.log(_202.Level.CONFIG,_213,_214);
};
_20c.entering=function(_215,name,_217){
if(this.isLoggable(_202.Level.FINER)){
if(browser=="chrome"||browser=="safari"){
_215=console;
}
var _218=_212[_202.Level.FINER];
if(_217){
if(typeof (_218)=="object"){
_218("ENTRY "+name,_217);
}else{
_218.call(_215,"ENTRY "+name,_217);
}
}else{
if(typeof (_218)=="object"){
_218("ENTRY "+name);
}else{
_218.call(_215,"ENTRY "+name);
}
}
}
};
_20c.exiting=function(_219,name,_21b){
if(this.isLoggable(_202.Level.FINER)){
var _21c=_212[_202.Level.FINER];
if(browser=="chrome"||browser=="safari"){
_219=console;
}
if(_21b){
if(typeof (_21c)=="object"){
_21c("RETURN "+name,_21b);
}else{
_21c.call(_219,"RETURN "+name,_21b);
}
}else{
if(typeof (_21c)=="object"){
_21c("RETURN "+name);
}else{
_21c.call(_219,"RETURN "+name);
}
}
}
};
_20c.fine=function(_21d,_21e){
this.log(_202.Level.FINE,_21d,_21e);
};
_20c.finer=function(_21f,_220){
this.log(_202.Level.FINER,_21f,_220);
};
_20c.finest=function(_221,_222){
this.log(_202.Level.FINEST,_221,_222);
};
_20c.info=function(_223,_224){
this.log(_202.Level.INFO,_223,_224);
};
_20c.log=function(_225,_226,_227){
if(this.isLoggable(_225)){
var _228=_212[_225];
if(browser=="chrome"||browser=="safari"){
_226=console;
}
if(typeof (_228)=="object"){
_228(_227);
}else{
_228.call(_226,_227);
}
}
};
_20c.severe=function(_229,_22a){
this.log(_202.Level.SEVERE,_229,_22a);
};
_20c.warning=function(_22b,_22c){
this.log(_202.Level.WARNING,_22b,_22c);
};
})();
var _22d=function(key){
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name===key){
var v=tags[i].content;
return v;
}
}
};
var _232=function(_233){
var _234=[];
for(var i=0;i<_233.length;i++){
_234.push(_233[i]);
}
return _234;
};
var _236=function(_237,_238){
var _239=[];
for(var i=0;i<_237.length;i++){
var elt=_237[i];
if(_238(elt)){
_239.push(_237[i]);
}
}
return _239;
};
var _23c=function(_23d,_23e){
for(var i=0;i<_23d.length;i++){
if(_23d[i]==_23e){
return i;
}
}
return -1;
};
var _240=function(s){
var a=[];
for(var i=0;i<s.length;i++){
a.push(s.charCodeAt(i)&255);
}
var buf=new ByteBuffer(a);
var v=buf.getString(Charset.UTF8);
return v;
};
var _246=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _248="\n";
var _249=function(buf){
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(n);
switch(chr){
case _246:
a.push(_246);
a.push(_246);
break;
case NULL:
a.push(_246);
a.push("0");
break;
case _248:
a.push(_246);
a.push("n");
break;
default:
a.push(chr);
}
}
var v=a.join("");
return v;
};
var _24f=function(buf,_251){
if(_251){
return _249(buf);
}else{
var _252=[];
while(buf.remaining()){
var n=buf.getUnsigned();
_252.push(String.fromCharCode(n));
}
var _254=_252.join("");
return _254;
}
};
var _255=window.WebSocket;
var _256=function(_257,_258){
if(typeof (_255)==="undefined"){
doError(this);
return;
}
if(_257.indexOf("javascript:")==0){
_257=_257.substr("javascript:".length);
}
var _259=_257.indexOf("?");
if(_259!=-1){
_257+="&.kl=Y";
}else{
_257+="?.kl=Y";
}
this._balanced=false;
this._sendQueue=[];
try{
if(_258){
this._delegate=new _255(_257,_258);
}else{
this._delegate=new _255(_257);
}
}
catch(e){
doError(this);
return;
}
bindHandlers(this);
};
var _25a=_256.prototype;
_25a.onerror=function(){
};
_25a.onmessage=function(){
};
_25a.onopen=function(){
};
_25a.onclose=function(){
};
_25a.close=function(){
this._delegate.close();
};
_25a.send=function(_25b){
if(this._balanced==true){
doSend(this,_25b);
}else{
this._sendQueue.push(_25b);
}
};
function doSend(_25c,_25d){
if(typeof (_25d)=="string"){
_25c._delegate.send(_25d);
}else{
if(_25d.constructor==ByteBuffer){
var _25e=_24f(_25d);
_25c._delegate.send(_25e);
}else{
throw new Error("Cannot call send() with that type");
}
}
};
function doError(_25f,e){
setTimeout(function(){
if(_25f.onerror){
_25f.onerror(e);
}
},0);
};
function messageHandler(_261,e){
if(_261._balanced==true){
_261.onmessage(e);
}else{
if(e.data.match("^\uf0ff")=="\uf0ff"){
var rest=e.data.substring(1);
if(rest.match("^R")=="R"){
var _264=rest.substring(1);
if(_264&&_264!=""){
var _265=_264.indexOf("?");
if(_265!=-1){
_264+="&.kl=Y";
}else{
_264+="?.kl=Y";
}
unbindHandlers(_261);
_261.close();
_261._delegate=new _255(_264);
bindHandlers(_261);
}else{
_261.close();
}
}else{
if(rest.match("^N$")=="N"){
_261._balanced=true;
var _266;
while(_266=_261._sendQueue.shift()){
doSend(_261,_266);
}
}else{
_261._balanced=true;
_261.onmessage(e);
}
}
}else{
_261._balanced=true;
_261.onmessage(e);
}
}
};
function closeHandler(_267,e){
_267.onclose(e);
};
function errorHandler(_269,e){
_269.onerror(e);
};
function openHandler(_26b,e){
_26b.onopen(e);
};
function bindHandlers(_26d){
var _26e=_26d._delegate;
_26e.onopen=function(e){
openHandler(_26d,e);
};
_26e.onmessage=function(e){
messageHandler(_26d,e);
};
_26e.onclose=function(e){
closeHandler(_26d,e);
};
_26e.onerror=function(e){
errorHandler(_26d,e);
};
};
function unbindHandlers(_273){
var _274=_273._delegate;
_274.onmessage=undefined;
_274.onclose=undefined;
_274.onopen=undefined;
_274.onerror=undefined;
};
var _275=(function(){
var _276=function(_277){
this.URL=_277;
var _278=this;
try{
_279(_278,_277);
}
catch(e){
doError(_278,e);
}
this.constructor=_276;
};
var _27a=_276.prototype;
_276._flashBridge={};
_276._flashBridge.readyWaitQueue=[];
_276._flashBridge.failWaitQueue=[];
_276._flashBridge.flashHasLoaded=false;
_276._flashBridge.flashHasFailed=false;
_27a.URL="";
_27a.readyState=0;
_27a.bufferedAmount=0;
_27a.onopen=function(){
};
_27a.onmessage=function(_27b){
};
_27a.onclose=function(){
};
_27a.onerror=function(){
};
_27a.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
throw new Error("data is null");
}
if(typeof (data)=="string"){
_276._flashBridge.sendText(this._instanceId,data);
}else{
if(typeof (data.array)=="object"){
var _27d;
var a=[];
var b;
while(data.remaining()){
b=data.get();
a.push(String.fromCharCode(b));
}
var _27d=a.join("");
_276._flashBridge.sendByteString(this._instanceId,_27d);
return;
}else{
throw new Error("Invalid type");
}
}
_280(this);
return true;
break;
case 2:
return false;
break;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_27a.close=function(){
switch(this.readyState){
case 1:
case 2:
_276._flashBridge.disconnect(this._instanceId);
break;
}
};
_27a.disconnect=_27a.close;
var _280=function(_281){
_281.bufferedAmount=_276._flashBridge.getBufferedAmount(_281._instanceId);
if(_281.bufferedAmount!=0){
setTimeout(function(){
_280(_281);
},1000);
}
};
var _279=function(_282,_283){
var _284=function(key,_286){
_286[key]=_282;
_282._instanceId=key;
};
var _287=function(){
doError(_282);
};
_276._flashBridge.registerWebSocketEmulated(_283,_284,_287);
};
function doError(_288,e){
setTimeout(function(){
if(_288.onerror){
_288.onerror(e);
}
},0);
};
return _276;
})();
var _28a=(function(){
var _28b=function(_28c){
this.URL=_28c;
var _28d=this;
try{
_28e(_28d,_28c);
}
catch(e){
doError(_28d,e);
}
this.constructor=_28b;
};
var _28f=_28b.prototype;
_275._flashBridge={};
_275._flashBridge.readyWaitQueue=[];
_275._flashBridge.failWaitQueue=[];
_275._flashBridge.flashHasLoaded=false;
_275._flashBridge.flashHasFailed=false;
_28f.URL="";
_28f.readyState=0;
_28f.bufferedAmount=0;
_28f.onopen=function(){
};
_28f.onmessage=function(_290){
};
_28f.onclose=function(){
};
_28f.onerror=function(){
};
_28f.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
throw new Error("data is null");
}
if(typeof (data)=="string"){
_275._flashBridge.sendText(this._instanceId,data);
}else{
if(typeof (data.array)=="object"){
var _292;
var a=[];
var b;
while(data.remaining()){
b=data.get();
a.push(String.fromCharCode(b));
}
var _292=a.join("");
_275._flashBridge.sendByteString(this._instanceId,_292);
return;
}else{
throw new Error("Invalid type");
}
}
_295(this);
return true;
break;
case 2:
return false;
break;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_28f.close=function(){
switch(this.readyState){
case 1:
case 2:
_275._flashBridge.disconnect(this._instanceId);
break;
}
};
_28f.disconnect=_28f.close;
var _295=function(_296){
_296.bufferedAmount=_275._flashBridge.getBufferedAmount(_296._instanceId);
if(_296.bufferedAmount!=0){
setTimeout(function(){
_295(_296);
},1000);
}
};
var _28e=function(_297,_298){
var _299=function(key,_29b){
_29b[key]=_297;
_297._instanceId=key;
};
var _29c=function(){
doError(_297);
};
_275._flashBridge.registerWebSocketRtmp(_298,_299,_29c);
};
function doError(_29d,e){
setTimeout(function(){
if(_29d.onerror){
_29d.onerror(e);
}
},0);
};
return _28b;
})();
(function(){
var _29f={};
_275._flashBridge.registerWebSocketEmulated=function(_2a0,_2a1,_2a2){
var _2a3=function(){
var key=_275._flashBridge.doRegisterWebSocketEmulated(_2a0);
_2a1(key,_29f);
};
if(_275._flashBridge.flashHasLoaded){
if(_275._flashBridge.flashHasFailed){
_2a2();
}else{
_2a3();
}
}else{
this.readyWaitQueue.push(_2a3);
this.failWaitQueue.push(_2a2);
}
};
_275._flashBridge.doRegisterWebSocketEmulated=function(_2a5,_2a6){
var key=_275._flashBridge.elt.registerWebSocketEmulated(_2a5,_2a6);
return key;
};
_275._flashBridge.registerWebSocketRtmp=function(_2a8,_2a9,_2aa){
var _2ab=function(){
var key=_275._flashBridge.doRegisterWebSocketRtmp(_2a8);
_2a9(key,_29f);
};
if(_275._flashBridge.flashHasLoaded){
if(_275._flashBridge.flashHasFailed){
_2aa();
}else{
_2ab();
}
}else{
this.readyWaitQueue.push(_2ab);
this.failWaitQueue.push(_2aa);
}
};
_275._flashBridge.doRegisterWebSocketRtmp=function(_2ad,_2ae){
var key=_275._flashBridge.elt.registerWebSocketRtmp(_2ad,_2ae);
return key;
};
_275._flashBridge.onready=function(){
var _2b0=_275._flashBridge.readyWaitQueue;
for(var i=0;i<_2b0.length;i++){
var _2b2=_2b0[i];
_2b2();
}
};
_275._flashBridge.onfail=function(){
var _2b3=_275._flashBridge.failWaitQueue;
for(var i=0;i<_2b3.length;i++){
var _2b5=_2b3[i];
_2b5();
}
};
_275._flashBridge.doOpen=function(key){
_29f[key].readyState=1;
_29f[key].onopen();
_2b7();
};
_275._flashBridge.doClose=function(key){
_29f[key].readyState=2;
_29f[key].onclose();
};
_275._flashBridge.doError=function(key){
_29f[key].onerror();
};
_275._flashBridge.doMessage=function(key,data){
var _2bc=_29f[key];
if(_2bc.readyState==1){
var e;
try{
e=document.createEvent("Events");
e.initEvent("message",true,true);
}
catch(ie){
e={type:"message",bubbles:true,cancelable:true};
}
e.data=unescape(data);
e.decoder=_240;
e.origin=document.domain;
e.source=null;
_2bc.onmessage(e);
}
};
var _2b7=function(){
if(browser==="firefox"){
var e=document.createElement("iframe");
e.style.display="none";
document.body.appendChild(e);
document.body.removeChild(e);
}
};
_275._flashBridge.sendText=function(key,_2c0){
this.elt.wsSend(key,escape(_2c0));
setTimeout(_2b7,200);
};
_275._flashBridge.sendByteString=function(key,_2c2){
this.elt.wsSendByteString(key,escape(_2c2));
setTimeout(_2b7,200);
};
_275._flashBridge.disconnect=function(key){
this.elt.wsDisconnect(key);
};
_275._flashBridge.getBufferedAmount=function(key){
var v=this.elt.getBufferedAmount(key);
return v;
};
})();
(function(){
var _2c6=function(_2c7){
var self=this;
var _2c9=300;
var ID="Loader";
var ie=false;
var _2cc=-1;
self.elt=null;
var _2cd=function(){
var exp=new RegExp(".*"+_2c7+".*.js$");
var _2cf=document.getElementsByTagName("script");
for(var i=0;i<_2cf.length;i++){
if(_2cf[i].src){
var name=(_2cf[i].src).match(exp);
if(name){
name=name.pop();
var _2d2=name.split("/");
_2d2.pop();
var s=_2d2.join("/")+"/";
return s;
}
}
}
};
var _2d4=_2cd();
var _2d5=_2d4+"Loader.swf?.kv=10.05";
self.loader=function(){
var _2d6="flash";
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name==="kaazing:upgrade"){
_2d6=tags[i].content;
}
}
if(_2d6!="flash"||!_2d9([9,0,115])){
_2da();
}else{
_2cc=setTimeout(_2da,_2c9);
_2db();
}
};
self.clearFlashTimer=function(){
clearTimeout(_2cc);
_2cc="cleared";
setTimeout(function(){
_2dc(self.elt.handshake(_2c7));
},0);
};
var _2dc=function(_2dd){
if(_2dd){
_275._flashBridge.flashHasLoaded=true;
_275._flashBridge.elt=self.elt;
_275._flashBridge.onready();
}else{
_2da();
}
window.___Loader=undefined;
};
var _2da=function(){
_275._flashBridge.flashHasLoaded=true;
_275._flashBridge.flashHasFailed=true;
_275._flashBridge.onfail();
};
var _2de=function(){
var _2df=null;
if(typeof (ActiveXObject)!="undefined"){
try{
ie=true;
var swf=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
var _2e1=swf.GetVariable("$version");
var _2e2=_2e1.split(" ")[1].split(",");
_2df=[];
for(var i=0;i<_2e2.length;i++){
_2df[i]=parseInt(_2e2[i]);
}
}
catch(e){
ie=false;
}
}
if(typeof navigator.plugins!="undefined"){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _2e1=navigator.plugins["Shockwave Flash"].description;
_2e1=_2e1.replace(/\s*r/g,".");
var _2e2=_2e1.split(" ")[2].split(".");
_2df=[];
for(var i=0;i<_2e2.length;i++){
_2df[i]=parseInt(_2e2[i]);
}
}
}
var _2e4=navigator.userAgent;
if(_2df!==null&&_2df[0]===10&&_2df[1]===0&&_2e4.indexOf("Windows NT 6.0")!==-1){
_2df=null;
}
return _2df;
};
var _2d9=function(_2e5){
var _2e6=_2de();
if(_2e6==null){
return false;
}
for(var i=0;i<Math.max(_2e6.length,_2e5.length);i++){
var _2e8=_2e6[i]-_2e5[i];
if(_2e8!=0){
return (_2e8>0)?true:false;
}
}
return true;
};
var _2db=function(){
if(ie){
var elt=document.createElement("div");
document.body.appendChild(elt);
elt.outerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" height=\"0\" width=\"0\" id=\""+ID+"\"><param name=\"movie\" value=\""+_2d5+"\"></param></object>";
self.elt=document.getElementById(ID);
}else{
var elt=document.createElement("object");
elt.setAttribute("type","application/x-shockwave-flash");
elt.setAttribute("width",0);
elt.setAttribute("height",0);
elt.setAttribute("id",ID);
elt.setAttribute("data",_2d5);
document.body.appendChild(elt);
self.elt=elt;
}
};
self.attachToOnload=function(_2ea){
if(window.addEventListener){
window.addEventListener("load",_2ea,true);
}else{
if(window.attachEvent){
window.attachEvent("onload",_2ea);
}else{
onload=_2ea;
}
}
};
if(document.readyState==="complete"){
self.loader();
}else{
self.attachToOnload(self.loader);
}
};
var _2eb={};
(function(){
var _2ec={8364:128,129:129,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,141:141,381:142,143:143,144:144,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,157:157,382:158,376:159};
var _2ed={128:8364,129:129,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,141:141,142:381,143:143,144:144,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,157:157,158:382,159:376};
_2eb.toCharCode=function(n){
if(n<128||(n>159&&n<256)){
return n;
}else{
var _2ef=_2ed[n];
if(typeof (_2ef)=="undefined"){
throw new Error("could not find: "+n);
}
return _2ef;
}
};
_2eb.fromCharCode=function(code){
if(code<128||(code>159&&code<256)){
return code;
}else{
var _2f1=_2ec[code];
if(typeof (_2f1)=="undefined"){
throw new Error("could not find: "+code);
}
return _2f1;
}
};
var _2f2=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _2f4="\n";
var _2f5=function(s){
var a=[];
for(var i=0;i<s.length;i++){
var code=_2eb.fromCharCode(s.charCodeAt(i));
if(code==127){
i++;
if(i==s.length){
a.hasRemainder=true;
break;
}
var _2fa=_2eb.fromCharCode(s.charCodeAt(i));
switch(_2fa){
case 127:
a.push(127);
break;
case 48:
a.push(0);
break;
case 110:
a.push(10);
break;
case 114:
a.push(13);
break;
default:
throw new Error("Escaping format error");
}
}else{
a.push(code);
}
}
return a;
};
var _2fb=function(buf){
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(_2eb.toCharCode(n));
switch(chr){
case _2f2:
a.push(_2f2);
a.push(_2f2);
break;
case NULL:
a.push(_2f2);
a.push("0");
break;
case _2f4:
a.push(_2f2);
a.push("n");
break;
default:
a.push(chr);
}
}
return a.join("");
};
_2eb.toArray=function(s,_301){
if(_301){
return _2f5(s);
}else{
var a=[];
for(var i=0;i<s.length;i++){
a.push(_2eb.fromCharCode(s.charCodeAt(i)));
}
return a;
}
};
_2eb.toByteString=function(buf,_305){
if(_305){
return _2fb(buf);
}else{
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
a.push(String.fromCharCode(_2eb.toCharCode(n)));
}
return a.join("");
}
};
})();
var _308=(function(){
var _309=function(_30a){
this.immediate=false;
this.retry=3000;
if(browser=="opera"||browser=="ie"){
this.requiresEscaping=true;
}
if(_30a.indexOf(".kv="==-1)){
_30a+=((_30a.indexOf("?")==-1)?"?":"&")+".kv=10.05";
}else{
_30a=_30a.replace(/\.kv=[^&]*(.*)/,".kv=10.05$1");
}
var _30b=new URI(_30a);
var _30c={"http":80,"https":443};
if(_30b.port==null){
_30b.port=_30c[_30b.scheme];
_30b.authority=_30b.host+":"+_30b.port;
}
this.origin=_30b.scheme+"://"+_30b.authority;
this.location=_30a;
this.xhr=null;
this.reconnectTimer=null;
var _30d=this;
setTimeout(function(){
connect(_30d,false);
},0);
};
_25a=_309.prototype;
var _30e=0;
var _30f=255;
var _310=1;
var _311=128;
var _312=127;
var _313=3000;
_25a.readyState=0;
function connect(_314){
if(_314.reconnectTimer!==null){
_314.reconnectTimer=null;
}
_314.buf=new ByteBuffer();
var _315=new URI(_314.location);
var _316=[];
if(_314.location.indexOf("&.kb=")===-1&&_314.location.indexOf("?.kb=")===-1){
_316.push(".kb=512");
}
switch(browser){
case "ie":
_316.push(".kns=1");
break;
case "safari":
_316.push(".kp=256");
break;
case "firefox":
_316.push(".kp=1025");
_316.push(String(Math.random()).substring(2));
break;
case "android":
_316.push(".kp=4096");
_316.push(".kbp=4096");
break;
}
_316.push(".kc=text/plain;charset=windows-1252");
if(_316.length>0){
if(_315.query===undefined){
_315.query=_316.join("&");
}else{
_315.query+="&"+_316.join("&");
}
}
var xhr=_314.xhr=new XMLHttpRequest0();
var _318={"xhr":xhr,"position":0};
_314.nextMessageAt=0;
if(_314.location.indexOf(".ki=p")==-1||_314.location.indexOf("https://")==0){
xhr.onprogress=function(){
setTimeout(function(){
_process(_314,_318);
},0);
};
}
xhr.onload=function(){
_process(_314,_318);
if(_314.xhr==_318.xhr&&_314.readyState!=2){
_reconnect(_314);
}
};
xhr.onreadystatechange=function(){
if(!_314.immediate&&xhr.readyStateChange>3){
_314.readyState=1;
doOpen(_314);
xhr.onreadystatechange=function(){
};
}
};
xhr.ontimeout=function(){
if(_314.readyState!=2){
_314.disconnect();
doError(_314);
}
};
xhr.onerror=xhr.ontimeout;
xhr.open("GET",_315.toString(),true);
xhr.send("");
if(_314.location.indexOf("&.ki=p")==-1){
setTimeout(function(){
if(xhr.readyState<3&&_314.readyState<2){
_314.location+="&.ki=p";
connect(_314,false);
}
},_313);
}
};
_25a.disconnect=function(){
if(this.readyState!==2){
_disconnect(this);
}
};
function _reconnect(_319){
if(_319.immediate){
_319.immediate=false;
connect(_319);
}else{
doError(_319);
}
};
function _disconnect(_31a){
if(_31a.reconnectTimer!==null){
clearTimeout(_31a.reconnectTimer);
_31a.reconnectTimer=null;
}
if(_31a.xhr!==null){
_31a.xhr.onprogress=function(){
};
_31a.xhr.onload=function(){
};
_31a.xhr.onerror=function(){
};
_31a.xhr.abort();
}
_31a.lineQueue=[];
_31a.lastEventId=null;
_31a.location=null;
_31a.readyState=2;
};
function _process(_31b,_31c){
var _31d=_31c.xhr.responseText;
var _31e=_31d.slice(_31c.position);
_31c.position=_31d.length;
var buf=_31b.buf;
var _320=_2eb.toArray(_31e,_31b.requiresEscaping);
if(_320.hasRemainder){
_31c.position--;
}
buf.position=buf.limit;
buf.putBytes(_320);
buf.position=_31b.nextMessageAt;
buf.mark();
parse:
while(true){
if(!buf.hasRemaining()){
break;
}
var type=buf.getUnsigned();
switch(type&128){
case _30e:
var _322=buf.indexOf(_30f);
if(_322==-1){
break parse;
}
var _323=buf.array.slice(buf.position,_322);
var data=new ByteBuffer(_323);
var _325=_322-buf.position;
buf.skip(_325+1);
buf.mark();
if(type==_310){
handleCommandFrame(_31b,data);
}else{
dispatchText(_31b,data);
}
break;
case _311:
var _326=0;
var _327=false;
while(buf.hasRemaining()){
var b=buf.getUnsigned();
_326=_326<<7;
_326|=(b&127);
if((b&128)!=128){
_327=true;
break;
}
}
if(!_327){
break parse;
}
if(buf.remaining()<_326){
break parse;
}
var _329=buf.array.slice(buf.position,buf.position+_326);
var _32a=new ByteBuffer(_329);
buf.skip(_326);
buf.mark();
dispatchBytes(_31b,_32a);
break;
default:
throw new Error("Emulation protocol error. Unknown frame type: "+type);
}
}
buf.reset();
buf.compact();
nextMessageAt=buf.position;
};
function handleCommandFrame(_32b,data){
while(data.remaining()){
var _32d=String.fromCharCode(data.getUnsigned());
switch(_32d){
case "0":
break;
case "1":
_32b.immediate=true;
break;
default:
throw new Error("Protocol decode error. Unknown command: "+_32d);
}
}
};
function dispatchBytes(_32e,buf){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=_32e.lastEventId;
e.data=_24f(buf);
e.decoder=_240;
e.origin=_32e.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_32e.onmessage)==="function"){
_32e.onmessage(e);
}
};
function dispatchText(data){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=$this.lastEventId;
e.data=data;
e.origin=$this.origin;
if(e.source!==null){
e.source=null;
}
if(typeof ($this.onmessage)==="function"){
$this.onmessage(e);
}
};
function doOpen(_333){
if(typeof (_333.onopen)==="function"){
_333.onopen();
}
};
function doError(_334){
var e=document.createEvent("Events");
e.initEvent("error",true,true);
if(typeof (_334.onerror)==="function"){
_334.onerror(e);
}
};
return _309;
})();
var _336=(function(){
var _337=function(_338,_339){
this.URL=_338;
if(_338.indexOf(".kv=")==-1){
_338+=((_338.indexOf("?")==-1)?"?":"&")+".kv=10.05";
}else{
_338=_338.replace(/\.kv=[^&]*(.*)/,".kv=10.05$1");
}
if(browser=="opera"||browser=="ie"){
this.requiresEscaping=true;
}
this._sendQueue=[];
_33a(this);
};
_25a=_337.prototype;
_25a.readyState=0;
_25a.bufferedAmount=0;
_25a.URL="";
_25a.onopen=function(){
};
_25a.onerror=function(){
};
_25a.onmessage=function(_33b){
};
_25a.onclose=function(){
};
var _33c=128;
var _33d=0;
var _33e=255;
var _33f=1;
var _340=[_33f,48,49,_33e];
var _341=[_33f,48,50,_33e];
_25a.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
case 1:
if(data===null){
throw new Error("data is null");
}
var buf=new ByteBuffer();
if(typeof data=="string"){
buf.put(_33d);
buf.putString(data,Charset.UTF8);
buf.put(_33e);
}else{
if(data.constructor==ByteBuffer){
buf.put(_33c);
_344(buf,data.remaining());
buf.putBuffer(data);
}else{
throw new Error("Invalid type for send");
}
}
buf.flip();
doSend(this,buf);
return true;
case 2:
return false;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_25a.close=function(){
switch(this.readyState){
case 1:
doSend(this,new ByteBuffer(_341));
_345(this);
break;
}
};
function doSend(_346,buf){
_346.bufferedAmount+=buf.remaining();
_346._sendQueue.push(buf);
if(!_346._writeSuspended){
doFlush(_346);
}
};
function doFlush(_348){
var _349=_348._sendQueue;
var _34a=_349.length;
_348._writeSuspended=(_34a>0);
if(_34a>0){
var xhr=new XMLHttpRequest0();
xhr.open("POST",_348._upstream,true);
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
switch(xhr.status){
case 200:
setTimeout(function(){
doFlush(_348);
},0);
break;
default:
_345(_348);
break;
}
}
};
var out=new ByteBuffer();
while(_349.length){
out.putBuffer(_349.shift());
}
out.putBytes(_340);
out.flip();
if(xhr.sendAsBinary){
xhr.setRequestHeader("Content-Type","application/octet-stream");
xhr.sendAsBinary(_24f(out));
}else{
xhr.setRequestHeader("Content-Type","text/plain; charset=utf-8");
xhr.send(_24f(out,_348.requiresEscaping));
}
}
_348.bufferedAmount=0;
};
var _33a=function(_34d){
var url=new URI(_34d.URL);
url.scheme=url.scheme.replace("ws","http");
var _34f=_34d.requiresEscaping?"/;e/cte":"/;e/ct";
url.path=url.path.replace(/[\/]?$/,_34f);
var _350=url.toString();
var _351=_350.indexOf("?");
if(_351==-1){
_350+="?";
}else{
_350+="&";
}
_350+=".kn="+String(Math.random()).substring(2);
var _352=new XMLHttpRequest0();
var _353=false;
_352.open("GET",_350,true);
_352.onreadystatechange=function(){
switch(_352.readyState){
case 2:
timer=setTimeout(function(){
if(!_353){
_354(_34d);
}
},5000);
break;
case 4:
_353=true;
if(_34d.readyState<2){
if(_352.status==201){
var _355=_352.responseText.split("\n");
_34d._upstream=_355[0];
var _356=_355[1];
_34d._downstream=new _308(_356);
_357(_34d,_34d._downstream);
_358(_34d);
}else{
_354(_34d);
}
}
break;
}
};
_352.send(null);
};
var _357=function(_359,_35a){
_35a.onmessage=function(_35b){
switch(_35b.type){
case "message":
if(_359.readyState==1){
_359.onmessage(_35b);
}
break;
}
};
_35a.onerror=function(){
_35a.disconnect();
_345(_359);
};
};
var _344=function(buf,_35d){
var _35e=0;
var _35f=0;
do{
_35f<<=8;
_35f|=(_35d&127);
_35d>>=7;
_35e++;
}while(_35d>0);
do{
var _360=_35f&255;
_35f>>=8;
if(_35e!=1){
_360|=128;
}
buf.put(_360);
}while(--_35e>0);
};
var _358=function(_361){
_361.readyState=1;
_361.onopen();
};
var _354=function(_362){
if(_362.readyState<2){
_362.readyState=2;
_362.onerror();
}
};
var _345=function(_363){
switch(_363.readyState){
case 0:
case 2:
break;
case 1:
_363.readyState=2;
_363.onclose();
break;
default:
}
};
return _337;
})();
(function(){
var _364="javascript:ws";
var _365="javascript:wss";
var _366="javascript:wse";
var _367="javascript:wse+ssl";
var _368="flash:wse";
var _369="flash:wse+ssl";
var _36a="flash:wsr";
var _36b="flash:wsr+ssl";
var _36c={};
_36c[_364]=_256;
_36c[_365]=_256;
_36c[_366]=_336;
_36c[_367]=_336;
_36c[_368]=_275;
_36c[_369]=_275;
_36c[_36a]=_28a;
_36c[_36b]=_28a;
window.WebSocket=function(url,_36e){
var _36f=new URI(url);
if(_36f.port===undefined){
var _370=_36f.scheme;
_36f.port=((_370.indexOf("wss")==-1)&&(_370.indexOf("ssl")==-1))?80:443;
}
url=_36f.toString();
this.URL=_36f.toString();
this.readyState=0;
this._subprotocol=_36e;
var _371=splitScheme(url);
var _372=_371.shift();
this._urlRemainder=_371.shift();
if(_372=="ws"||_372=="wse"||_372=="wss"||_372=="wse+ssl"){
var _373=_22d("kaazing:WebSocketConnectionStrategies");
var _374=null;
if(_373){
_374=_373.split(" ");
}
if(!_374){
if(_372=="ws"){
this._connectionStrategies=_236(WebSocket.connectionStrategies,function(_375){
return !(_375.match("wss")||_375.match("ssl"));
});
}else{
if(_372=="wss"){
this._connectionStrategies=_236(WebSocket.connectionStrategies,function(_376){
return (_376.match("wss")||_376.match("ssl"));
});
}else{
if(_372.match("wse")){
var _377=function(s){
return s.match("wse");
};
this._connectionStrategies=_236(WebSocket.connectionStrategies,_377);
}
}
}
}
}else{
if(_36c[_372]){
this._connectionStrategies=[_372];
}else{
throw new Error("Unsupported composite scheme: "+_372);
}
}
this.URL=url.replace("flash:","").replace("javascript:","").replace("wse+ssl:","wss:").replace("wse:","ws:").replace("wsr+ssl:","wss:").replace("wsr:","ws:");
fallbackNext(this);
};
function pickStrategies(){
switch(browser){
case "chrome":
case "safari":
return [_364,_366,_368,_36a,_365,_367,_369,_36b];
case "android":
case "opera":
return [_364,_366,_365,_367];
case "ie":
return [_364,_368,_366,_365,_369,_367];
case "firefox":
default:
return [_364,_366,_368,_365,_367,_369];
}
};
window.WebSocket.connectionStrategies=pickStrategies();
window.WebSocket.__impls__=_36c;
var _379=WebSocket.prototype;
function splitScheme(url){
var _37b=url.split("://");
var _37c=_37b.shift();
var _37d=_37b.shift();
return [_37c,_37d];
};
_379.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
case 1:
if(data===null){
throw new Error("data is null");
}
this._delegate.send(data);
_37f(this);
return true;
case 2:
return false;
default:
throw new Error("INVALID_STATE_ERR");
}
};
var _37f=function(_380){
_380.bufferedAmount=_380._delegate.bufferedAmount;
if(_380.bufferedAmount!=0){
setTimeout(function(){
_37f(_380);
},1000);
}
};
_379.postMessage=_379.send;
_379.disconnect=_379.close;
_379.close=function(){
switch(this.readyState){
case 1:
case 2:
this._delegate.close();
break;
}
};
function initDelegate(_381,_382){
if(typeof (_381._subprotocol)!=="undefined"){
_381._delegate=new _382(_381.URL,_381._subprotocol);
}else{
_381._delegate=new _382(_381.URL);
}
bindHandlers(_381);
};
function fallbackNext(_383){
var _384=_383._connectionStrategies.shift();
var _385=_36c[_384];
if(_385){
initDelegate(_383,_385);
}else{
doClose(_383);
}
};
function doOpen(_386,ev){
if(_386.readyState<1){
_386.readyState=1;
if(typeof (_386.onopen)!=="undefined"){
if(!ev){
try{
ev=document.createEvent("Events");
ev.initEvent("open",true,true);
}
catch(ie){
ev={type:"open",bubbles:true,cancelable:true};
}
}
try{
_386.onopen(ev);
}
catch(e){
}
}
}
};
function doClose(_388,ev){
if(_388.readyState<2){
_388.readyState=2;
if(typeof (_388.onclose)!=="undefined"){
setTimeout(function(){
if(!ev){
try{
ev=document.createEvent("Events");
ev.initEvent("close",true,true);
}
catch(ie){
ev={type:"close",bubbles:true,cancelable:true};
}
}
try{
_388.onclose(ev);
}
catch(e){
}
},0);
}
}
};
function errorHandler(_38a,ev){
unbindHandlers(_38a);
fallbackNext(_38a);
};
function openHandler(_38c,ev){
switch(_38c.readyState){
case 0:
doOpen(_38c,ev);
break;
case 1:
case 2:
var _38e=(ev?" from "+ev.target:"");
throw new Error("Invalid readyState for open event"+_38e);
default:
throw new Error("Socket has invalid readyState: "+_38c.readyState);
}
};
function closeHandler(_38f,ev){
switch(_38f.readyState){
case 0:
unbindHandlers(_38f);
fallbackNext(_38f);
break;
case 1:
doClose(_38f,ev);
break;
case 2:
var _391=(ev?" from "+ev.target:"");
throw new Error("Invalid readyState for close event"+_391);
break;
default:
throw new Error("Socket has invalid readyState: "+_38f.readyState);
}
};
function bindHandlers(_392){
var _393=_392._delegate;
_393.onmessage=function(e){
if(e.decoder){
var e2;
try{
e2=document.createEvent("Events");
e2.initEvent("message",true,true);
}
catch(ie){
e2={type:"message",bubbles:true,cancelable:true};
}
e2.data=e.decoder(e.data);
e2.origin=e.origin;
e2.source=_392;
_392.onmessage(e2);
}else{
_392.onmessage(e);
}
};
_393.onclose=function(e){
closeHandler(_392,e);
};
_393.onopen=function(e){
openHandler(_392,e);
};
_393.onerror=function(e){
errorHandler(_392,e);
};
};
function unbindHandlers(_399){
var _39a=_399._delegate;
if(_39a){
_39a.onerror=undefined;
_39a.onmessage=undefined;
_39a.onclose=undefined;
_39a.onopen=undefined;
}
};
}());
window.___Loader=new _2c6(_201);
})();
})();
