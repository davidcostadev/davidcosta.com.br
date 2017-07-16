<template>
  <div id="page">
    <page-header></page-header>
    <nuxt/>
    <page-footer></page-footer>
  </div>
</template>

<script>
  import PageHeader from './header'
  import PageFooter from './footer'

  export default {
    components: { PageHeader, PageFooter }
  }
</script>


<style lang="scss">

  $body-bg: #1D1E1A;
  $body-text: #CFD0C2;

  body {
    font-family: "Roboto Mono", monospace;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }


  body {
    background-color: $body-bg;
    color: $body-text;
  }

  a {
    text-decoration: none;
    color: #6CC72C;

    &:hover,
    &:focus {
      color: saturate(#6CC72C, 20%)
    }
    &:active {
      color: darken(#6CC72C, 20%)
    }
  }

  // bootstrap

  .container {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media screen and (min-width: 460px) {
    .container {
      max-width: 420px;
      width: 420px;
      margin: auto;
    }
  }
  @media screen and (min-width: 769px) {
    .container {
      max-width: 100%;
      width: 100%;
      margin: auto;
    }
  }
  @media screen and (min-width: 1192px) {
    .container {
      max-width: 960px;
      width: 960px;
    }
  }


</style>
