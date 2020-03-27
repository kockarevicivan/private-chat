<template>
  <div :class="computedClass">
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    isMine: Boolean,
    text: String
  },
  computed: {
    computedClass() {
      return this.isMine ? 'message mine' : 'message';
    }
  }
};
</script>

