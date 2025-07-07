<template>
  <div class="blog-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'BlogLayout'
}
</script>

<style scoped>
.blog-layout {
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
}
</style>
