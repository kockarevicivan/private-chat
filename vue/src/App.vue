<template>
  <main>
    <img class="logo" src="images/logo.png" />

    <div class="conversation-input-container">
      <input v-model="conversationIdInput" type="text" placeholder="Paste user id here" @keydown.enter="connectToConversation" />
      <button @click="connectToConversation">Connect</button>
      <button class="green" @click="copyInviteLinkToClipboard">Copy invite</button>
    </div>

    <div class="message-container">
      <Message
        v-for="message in computedMessages"
        :key="message.id"
        :text="message.text"
        :isMine="message.senderId == computedSessionData.userId"
      />
    </div>

    <div class="message-input-container">
      <input v-model="messageInput" type="text" placeholder="Type message here" @keydown.enter="sendMessage" />
      <button @click="sendMessage">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>

    <span class="session-data-container">
      Conversation id:
      <b>{{ computedSessionData.conversationId }}</b>
    </span>
  </main>
</template>

<script>
import Message from "./components/Message.vue";

export default {
  name: "App",
  data() {
    return {
      messageInput: "",
      conversationIdInput: ""
    };
  },
  components: {
    Message
  },
  computed: {
    computedSessionData() {
      return this.$store.getters.sessionData();
    },
    computedMessages() {
      return this.$store.getters.messages();
    }
  },
  methods: {
    connectToConversation() {
      this.$store.dispatch("connectToConversation", {
        conversationId: this.conversationIdInput
      });

      this.conversationIdInput = '';
    },
    sendMessage() {
      this.$store.dispatch("sendMessage", {
        text: this.messageInput,
        timestamp: new Date().getTime()
      });

      this.messageInput = '';
    },
    copyInviteLinkToClipboard() {
      let text = this.computedSessionData.conversationId;

      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }

      navigator.clipboard.writeText(text);
    },
    fallbackCopyTextToClipboard(text) {
      let textArea = document.createElement("textarea");
      textArea.value = text;

      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        let successful = document.execCommand("copy");
        let msg = successful ? "successful" : "unsuccessful";
      } catch (err) {
        console.error(err);
      }

      document.body.removeChild(textArea);
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  padding: 0;
  margin: 0;
}

@keyframes gradient {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}

html,
body,
main {
  height: 100%;
}

body {
  background: linear-gradient(-45deg, #0984e3, #23a6d5, #4eaead);
  background-size: 400% 400%;
  -webkit-animation: gradient 10s ease infinite;
  animation: gradient 10s ease infinite;
}

main {
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
}

h1 {
  margin-top: 40px;
}

input[type="text"] {
  height: 45px;
  background-color: #d4d7d8;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  outline: none;
}

input[type="text"]:focus {
  background-color: #bfc7ca;
}

button {
  height: 46px;
  min-width: 46px;
  border: 1px solid #0984e3;
  background-color: #0984e3;
  color: #fff;
  border-radius: 28px;
  padding: 0 10px;
  outline: none;
  cursor: pointer;
  margin-left: 10px;
}

button.green {
  background-color: #4eaead;
  border-color: #4eaead;
}

.message-container {
  width: 100%;
  height: calc(100% - 340px);
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 20px;
}

.message {
  padding: 10px;
  overflow: hidden;
}

.message span {
  display: inline-block;
  background-color: #b2bec3;
  border-radius: 3px;
  padding: 10px;
  float: right;
  font-size: 14px;
}

.message.mine span {
  background-color: #0984e3;
  color: #fff;
  float: left;
}

.conversation-input-container {
  display: flex;
  padding: 40px;
  width: 100%;
  justify-content: center;
}

.conversation-input-container input {
  width: 50%;
  margin-right: 10px;
}

.message-input-container {
  position: absolute;
  display: flex;
  bottom: 0;
  left: 20px;
  right: 20px;
  padding: 40px;
  width: calc(100% - 40px);
  justify-content: center;
  height: 130px;

  input {
    width: 50%;
    margin-right: 10px;
  }
}

.session-data-container {
  position: absolute;
  bottom: 15px;
  width: calc(100% - 40px);
  text-align: center;
  font-size: 12px;
  color: #b2bec3;
}

.logo {
  width: 160px;
}
</style>
