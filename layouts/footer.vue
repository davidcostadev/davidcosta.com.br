<template>
  <footer id="page-footer">
    <img src="/img/code.png" alt="code"> com
    <img src="/img/vue.png" alt="vue"> com
    <img src="/img/heart.png" alt="heart"> por
    <nuxt-link to="/">David Costa</nuxt-link>
  </footer>
</template>

<style lang="scss">
  $page-footer-bg: #272822;

  #page-footer {
    text-align: center;
    font-size: 18px;
    padding: 20px 0;
    background-color: $page-footer-bg;

    img {
      vertical-align: middle;
    }
  }
</style>
