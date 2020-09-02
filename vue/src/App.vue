<template>
  <main>
      <img class="logo" src="images/logo.svg" />
    <div class="message-container">

      <Message
        v-for="message in computedMessages"
        :key="message.id"
        :isFile="message.isFile"
        :text="message.text"
        :name="message.name"
        :content="message.content"
        :timestamp="message.timestamp"
        :senderId="message.senderId"
        :isMine="message.senderId == computedSessionData.userId"
      />
    </div>

    <div class="message-input-container">
      <label class="btn file-input" title="Send file">
        <i class="fas fa-plus"></i>
        <input type="file" @change="readFile" />
      </label>

      <input
        autofocus="autofocus"
        v-model="messageInput"
        type="text"
        placeholder="Type message here"
        @keydown.enter="sendMessage"
      />

      <button class="btn" @click="sendMessage" title="Send message">
        <i class="fas fa-paper-plane"></i>
      </button>
      <button class="btn" @click="copyInviteLinkToClipboard" title="Copy invite link">
        <i class="fas fa-copy"></i>
      </button>
    </div>

    <span class="session-data-container">
      Room id:
      <b>{{ computedSessionData.conversationId }}</b>
    </span>
  </main>
</template>

<script>
import CryptoJS from "crypto-js";
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
        this.$store.dispatch("sendFile", {
          isFile: true,
          name: file.name,
          content: reader.result,
          timestamp: new Date().getTime()
        });
      };
      reader.onerror = error => {
        console.log("Error: ", error);
      };
    },
    sendMessage() {
      const secret = this.$store.getters.secret();

      if (this.messageInput.startsWith("/key")) {
        const newSecret = this.messageInput.split(" ")[1] || secret;
        
        this.$store.dispatch("setSecret", newSecret);
      } else {
        this.$store.dispatch("sendMessage", {
          text: CryptoJS.AES.encrypt(this.messageInput, secret).toString(),
          timestamp: new Date().getTime()
        });
      }

      this.messageInput = "";
    },
    copyInviteLinkToClipboard() {
      let text =
        window.location.origin +
        "?room=" +
        this.computedSessionData.conversationId;

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
  min-width: 350px;
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
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 0 15px;
  outline: none;
}

input[type="text"]:focus {
}

.btn {
  height: 46px;
  line-height: 46px;
  text-align: center;
  min-width: 46px;
  background: linear-gradient(145deg, #e4e4e4, #d1d1d1);
  box-shadow:  20px 20px 60px #c5c5c5, 
             -20px -20px 60px #ffffff;
  border: none;
  color: #fff;
  padding: 0 10px;
  outline: none;
  cursor: pointer;
}

.btn:active {
  opacity: 0.4;
}

.file-input input {
  display: none;
}

.message-container {
  position: relative;
  width: 100%;
  height: calc(100% - 110px);
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
  border-radius: 14px;
  background: linear-gradient(145deg, #99faf9, #81d3d2);
  padding: 10px 14px;
  float: right;
  font-size: 13px;
  max-width: 70%;
  line-height: 19px;
  overflow-wrap: break-word;

  a {
    color: inherit;
  }
}

.message.mine > div {
  border-radius: 14px;
background: linear-gradient(145deg, #e6e6e6, #f1f1f1);

  // color: #fff;
  float: left;
}

.message-input-container {
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 45px;
  left: 20px;
  right: 20px;
  width: calc(100% - 40px);
  border-radius: 23px;
  overflow: hidden;
background: #ececec;
box-shadow:  20px 20px 60px #f1f1f1, 
             -20px -20px 60px #ffffff;

  input {
    width: calc(100% - 137px);
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  opacity: 0.12;
}

::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #d1d1d1;
}

</style>
