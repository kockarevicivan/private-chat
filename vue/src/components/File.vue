<template>
  <div :class="computedClass">
    <div>
      <a :href="content" download>{{name}}</a>
      <span class="time-created">{{formatDate(timestamp)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "File",
  props: {
    isMine: Boolean,
    name: String,
    content: String,
    timestamp: Number,
  },
  computed: {
    computedClass() {
      return this.isMine ? 'message mine' : 'message';
    }
  },
  methods: {
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
    }
  }
};
</script>

<style>
.time-created {
  display: block;
  bottom: 0;
  left: 0;
  font-size: 10px;
}
</style>