import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const socket = new WebSocket("ws://localhost:3000");
const store = new Vuex.Store({
  state: {
    sessionData: {
      userId: null,
      conversationId: null
    },
    messages: []
  },
  mutations: {
    setSessionData(state, payload) {
      state.sessionData = payload;
    },
    addMessage(state, payload) {
      state.messages.push(payload);
    }
  },
  actions: {
    setSessionData(context, payload) {
      context.commit("setSessionData", payload);
    },
    addMessage(context, payload) {
      context.commit("addMessage", payload);
    },
    connectToConversation(context, payload) {
      socket.send(JSON.stringify({
        type: "CONNECT",
        payload
      }));
    },
    sendMessage(context, payload) {
      socket.send(JSON.stringify({
        type: "MESSAGE",
        payload
      }));
    }
  },
  getters: {
    sessionData: state => () => state.sessionData,
    messages: state => () => state.messages
  }
});

socket.onmessage = message => {
  message = JSON.parse(message.data);

  if (message.type == 'SESSION_DATA')
    store.dispatch('setSessionData', message.payload);
  else if (message.type == 'MESSAGE')
    store.dispatch('addMessage', message.payload);
};

export default store;
