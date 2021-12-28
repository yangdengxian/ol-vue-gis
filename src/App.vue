<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      
    },
  }
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    height: 100%;
  }

</style>
