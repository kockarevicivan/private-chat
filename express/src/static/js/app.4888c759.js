(function(e){function t(t){for(var s,i,r=t[0],c=t[1],u=t[2],p=0,d=[];p<r.length;p++)i=r[p],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&d.push(a[i][0]),a[i]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);l&&l(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],s=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(s=!1)}s&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var s={},a={app:0},o=[];function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=s,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var u=0;u<r.length;u++)t(r[u]);var l=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",[n("img",{staticClass:"logo",attrs:{src:"images/logo.png"}}),n("div",{staticClass:"message-container"},e._l(e.computedMessages,(function(t){return n("Message",{key:t.id,attrs:{text:t.text,timestamp:t.timestamp,isMine:t.senderId==e.computedSessionData.userId}})})),1),n("div",{staticClass:"message-input-container"},[n("label",{staticClass:"btn file-input",attrs:{title:"Send file"}},[n("i",{staticClass:"fas fa-plus"}),n("input",{attrs:{type:"file"},on:{change:e.readFile}})]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.messageInput,expression:"messageInput"}],attrs:{type:"text",placeholder:"Type message here"},domProps:{value:e.messageInput},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.sendMessage(t)},input:function(t){t.target.composing||(e.messageInput=t.target.value)}}}),n("button",{staticClass:"btn",attrs:{title:"Send message"},on:{click:e.sendMessage}},[n("i",{staticClass:"fas fa-paper-plane"})]),n("button",{staticClass:"btn grey",attrs:{title:"Copy invite link"},on:{click:e.copyInviteLinkToClipboard}},[n("i",{staticClass:"fas fa-copy"})])]),n("span",{staticClass:"session-data-container"},[e._v(" Conversation id: "),n("b",[e._v(e._s(e.computedSessionData.conversationId))])])])},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:e.computedClass},[n("div",[e.isFile?n("a",{attrs:{href:e.text,download:""}},[e._v("Download")]):n("span",[e._v(e._s(e.text))]),n("span",{staticClass:"time-created"},[e._v(e._s(e.formatDate(e.timestamp)))])])])},r=[],c=(n("2ca0"),{name:"Message",props:{isMine:Boolean,text:String,timestamp:String},computed:{isFile:function(){return this.text.startsWith("data:")},computedClass:function(){return this.isMine?"message mine":"message"}},methods:{formatDate:function(e){var t=new Date(e),n=t.getHours(),s=t.getMinutes(),a=n>=12?"pm":"am";n%=12,n=n||12,s=s<10?"0"+s:s;var o=n+":"+s+" "+a;return t.getMonth()+1+"/"+t.getDate()+"/"+t.getFullYear()+"  "+o}}}),u=c,l=(n("f87e"),n("2877")),p=Object(l["a"])(u,i,r,!1,null,null,null),d=p.exports,f={name:"App",data:function(){return{messageInput:"",conversationIdInput:""}},components:{Message:d},computed:{computedSessionData:function(){return this.$store.getters.sessionData()},computedMessages:function(){return this.$store.getters.messages()}},methods:{readFile:function(e){var t=this,n=e.srcElement.files[0],s=new FileReader;s.readAsDataURL(n),s.onload=function(){t.$store.dispatch("sendMessage",{text:s.result,timestamp:(new Date).getTime()})},s.onerror=function(e){console.log("Error: ",e)}},sendMessage:function(){this.$store.dispatch("sendMessage",{text:this.messageInput,timestamp:(new Date).getTime()}),this.messageInput=""},copyInviteLinkToClipboard:function(){var e=window.location.origin+"/"+this.computedSessionData.conversationId;navigator.clipboard?navigator.clipboard.writeText(e):this.fallbackCopyTextToClipboard(e)},fallbackCopyTextToClipboard:function(e){var t=document.createElement("textarea");t.value=e,t.style.top="0",t.style.left="0",t.style.position="fixed",document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")}catch(n){console.error(n)}document.body.removeChild(t)}}},m=f,g=(n("5c0b"),Object(l["a"])(m,a,o,!1,null,null,null)),v=g.exports,h=n("2f62");s["a"].use(h["a"]);var y="https:"==window.location.protocol?"wss://":"ws://",b=window.location.host.startsWith("localhost")?"localhost:3000":window.location.host;console.log(y+b);var w=new WebSocket(y+b),S=new h["a"].Store({state:{sessionData:{userId:null,conversationId:null},messages:[]},mutations:{setSessionData:function(e,t){e.sessionData=t},addMessage:function(e,t){e.messages.push(t)}},actions:{setSessionData:function(e,t){e.commit("setSessionData",t)},addMessage:function(e,t){e.commit("addMessage",t),setTimeout((function(){var e=document.querySelector(".message-container");e.scrollTop=e.scrollHeight+140}),200)},connectToConversation:function(e,t){w.send(JSON.stringify({type:"CONNECT",payload:t}))},sendMessage:function(e,t){w.send(JSON.stringify({type:"MESSAGE",payload:t}))}},getters:{sessionData:function(e){return function(){return e.sessionData}},messages:function(e){return function(){return e.messages}}}});w.onopen=function(){var e=window.location.pathname.substring(1);e&&S.dispatch("connectToConversation",{conversationId:e})},w.onmessage=function(e){e=JSON.parse(e.data),"SESSION_DATA"==e.type?S.dispatch("setSessionData",e.payload):"MESSAGE"==e.type&&S.dispatch("addMessage",e.payload)};var C=S;s["a"].config.productionTip=!1,new s["a"]({store:C,render:function(e){return e(v)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var s=n("9c0c"),a=n.n(s);a.a},"9c0c":function(e,t,n){},afbc:function(e,t,n){},f87e:function(e,t,n){"use strict";var s=n("afbc"),a=n.n(s);a.a}});
//# sourceMappingURL=app.4888c759.js.map