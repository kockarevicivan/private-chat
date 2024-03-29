import Vue from "vue";
import Vuex from "vuex";
import { NotificationService, NOTIFICATIONS_PERMISSION_STATUS } from "../services";

Vue.use(Vuex);

const protocol = window.location.protocol == "https:" ? "wss://" : "ws://";
const host = window.location.host.startsWith("localhost")
  ? "localhost:" + window.location.port
  : window.location.host;

  console.log();

const socket = new WebSocket(protocol + host);

const store = new Vuex.Store({
  state: {
    sessionData: {
      userId: null,
      conversationId: null
    },
    messages: [],
    aliasRegistry: {},
    secret: 'secret123'
  },
  mutations: {
    setSessionData(state, payload) {
      state.sessionData = payload;
    },
    addMessage(state, payload) {
      state.messages.push(payload);
    },
    setAlias(state, payload) {
      state.aliasRegistry[payload.key] = payload.value;
    },
    setSecret(state, payload) {
      state.secret = payload;
    }
  },
  actions: {
    setSessionData(context, payload) {
      context.commit("setSessionData", payload);
    },
    addMessage(context, payload) {
      context.commit("addMessage", payload);

      setTimeout(() => {
        const messageContainer = document.querySelector(".message-container");
        messageContainer.scrollTop = messageContainer.scrollHeight + 140;
      }, 200);
    },
    connectToConversation(context, payload) {
      socket.send(
        JSON.stringify({
          type: "CONNECT",
          payload
        })
      );
    },
    sendMessage(context, payload) {
      socket.send(
        JSON.stringify({
          type: "MESSAGE",
          payload
        })
      );
    },
    sendFile(context, payload) {
      socket.send(
        JSON.stringify({
          type: "FILE",
          payload
        })
      );
    },
    setAlias (context, payload) {
      context.commit('setAlias', payload);
    },
    setSecret (context, payload) {
      context.commit('setSecret', payload);
    }
  },
  getters: {
    sessionData: state => () => state.sessionData,
    messages: state => () => state.messages,
    alias: state => (key) => state.aliasRegistry[key],
    secret: state => () => state.secret
  }
});

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;

  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

socket.onopen = () => {
  const initialConversationId = getParameterByName("room");

  if (initialConversationId)
    store.dispatch("connectToConversation", {
      conversationId: initialConversationId
    });
};

socket.onmessage = message => {
  message = JSON.parse(message.data);

  if (message.type == "SESSION_DATA") {
    store.dispatch("setSessionData", message.payload);
  } else if (message.type == "MESSAGE") {
    if(NotificationService.permissionGranted())
      NotificationService.notify("Secretman.ga", "Someone has sent a message");

    store.dispatch("addMessage", message.payload);
  } else if (message.type == "FILE") {
    if(NotificationService.permissionGranted())
      NotificationService.notify("Secretman.ga", "Someone has sent a message");
    
      message.payload.isFile = true;
    store.dispatch("addMessage", message.payload);
  }
};

export default store;
