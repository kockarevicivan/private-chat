<template>
  <div :class="computedClass">
    <div>
      <input @change="editAlias" class="sender" :value="computedAlias" />

      <img v-if="isImage" :src="content" />
      <audio v-else-if="isAudio" controls :src="content"></audio>
      <video v-else-if="isVideo" controls :src="content"></video>

      <a v-if="isFile" :href="content" :download="name">{{name}}</a>
      <span v-else v-html="computedContent"></span>

      <span class="time-created">{{formatDate(timestamp)}}</span>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";

export default {
  name: "Message",
  props: {
    isFile: Boolean,
    isMine: Boolean,
    text: String,
    name: String,
    content: String,
    timestamp: Number,
    senderId: String,
  },
  computed: {
    computedContent () {
      const secret = this.$store.getters.secret();
      
      return this.replaceUrls(CryptoJS.AES.decrypt(this.text, secret).toString(CryptoJS.enc.Utf8));
    },
    computedAlias: {
      get () { return this.$store.getters.alias(this.senderId) || this.senderId; }
    },
    isImage() {
      return this.content && this.content.startsWith('data:image');
    },
    isAudio() {
      return this.content && this.content.startsWith('data:audio');
    },
    isVideo() {
      return this.content && this.content.startsWith('data:video');
    },
    computedClass() {
      return this.isMine ? 'message mine' : 'message';
    }
  },
  methods: {
    editAlias(event) {
      this.$store.dispatch('setAlias', {
        key: this.senderId,
        value: event.target.value
      });
    },
    formatDate(timestamp) {
      let date = new Date(timestamp);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;

      let strTime = hours + ':' + minutes + ' ' + ampm;

      return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    },
    replaceUrls(content) {
      let exp_match = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      let element_content = content.replace(exp_match, '<a target="_blank" href="$1">$1</a>');
      let new_exp_match = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      let new_content = element_content.replace(
        new_exp_match,
        '$1<a target="_blank" href="http://$2">$2</a>'
      );

      return new_content;
    }
  }
};
</script>

<style>
.sender {
  display: block;
  font-size: 10px;
  opacity: 0.6;
  background: none;
  border: none;
  margin-bottom: 6px;
  outline: none;
  cursor: pointer;
}

.sender:focus {
  background-color: darkblue;
}

.time-created {
  display: block;
  bottom: 0;
  left: 0;
  font-size: 10px;
  margin-top: 3px;
  opacity: 0.3;
}

.message img,
.message audio,
.message video {
  width: 100%;
  padding: 10px;
}
</style>