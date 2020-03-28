<template>
  <main>
    <img class="logo" src="images/logo.png" />

    <div class="message-container">
      <Message
        v-for="message in computedMessages"
        :key="message.id"
        :text="message.text"
        :timestamp="message.timestamp"
        :isMine="message.senderId == computedSessionData.userId"
      />
    </div>

    <div class="message-input-container">
      <label class="btn file-input" title="Send file">
        <i class="fas fa-plus"></i>
        <input type="file" @change="readFile" />
      </label>

      <input
        v-model="messageInput"
        type="text"
        placeholder="Type message here"
        @keydown.enter="sendMessage"
      />

      <button class="btn" @click="sendMessage" title="Send message">
        <i class="fas fa-paper-plane"></i>
      </button>
      <button class="btn grey" @click="copyInviteLinkToClipboard" title="Copy invite link">
        <i class="fas fa-copy"></i>
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
    readFile(event) {
      let file = event.srcElement.files[0];
      
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.$store.dispatch("sendMessage", {
          text: reader.result,
          timestamp: new Date().getTime()
        });
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    },
    sendMessage() {
      this.$store.dispatch("sendMessage", {
        text: this.messageInput,
        timestamp: new Date().getTime()
      });

      this.messageInput = "";
    },
    copyInviteLinkToClipboard() {
      let text =
        window.location.origin + "?room=" + this.computedSessionData.conversationId;

      if (!navigator.clipboard) {
        this.fallbackCopyTextToClipboard(text);
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
  padding: 0 15px;
  outline: none;
}

input[type="text"]:focus {
  background-color: #bfc7ca;
}

.btn {
  height: 46px;
  line-height: 46px;
  text-align: center;
  min-width: 46px;
  border: 1px solid #0984e3;
  background-color: #0984e3;
  color: #fff;
  border-radius: 28px;
  padding: 0 10px;
  outline: none;
  cursor: pointer;
}

.btn:active {
  opacity: 0.4;
}

.btn.grey {
  background-color: #d4d7d8;
  color: #999;
  border-color: #d4d7d8;
}

.file-input input {
  display: none;
}

.message-container {
  width: 100%;
  height: calc(100% - 235px);
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 20px;
  overflow: auto;
}

.message {
  padding: 10px;
  overflow: hidden;
}

.message > div {
  position: relative;
  display: inline-block;
  background-color: #b2bec3;
  border-radius: 3px;
  padding: 6px 10px;
  float: right;
  font-size: 13px;
  max-width: 70%;
  line-height: 19px;
  overflow-wrap: break-word;
}

.message.mine div {
  background-color: #0984e3;
  color: #fff;
  float: left;
}

.message-input-container {
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  left: 20px;
  right: 20px;
  padding: 40px;
  width: calc(100% - 40px);
  height: 130px;

  input {
    width: calc(100% - 170px);
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
  margin-bottom: 20px;
}
</style>
