<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch('getPosts');
  }
}
</script>
<style>
* {
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
}
.btn-primary {
  background-color: #16446d!important;
}
</style>
