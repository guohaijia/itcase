<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*这里面的是全部都可以访问的到的*/
@font-face {
  font-family: 'icomoon';
  src:  url('assets/fonts/icomoon.eot?9ugpuq');
  src:  url('assets/fonts/icomoon.eot?9ugpuq#iefix') format('embedded-opentype'),
    url('assets/fonts/icomoon.ttf?9ugpuq') format('truetype'),
    url('assets/fonts/icomoon.woff?9ugpuq') format('woff'),
    url('assets/fonts/icomoon.svg?9ugpuq#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-user-check:before {
  content: "\e975";
  font-size:20px;
  line-height:40px;
}
.icon-key:before {
  content: "\e98d";
  font-size:20px;
  line-height:40px;
}
</style>
