<template>
  <header id="page-header">
    <div class="header-brand">
      <nuxt-link to="/">David Costa</nuxt-link>
    </div>
  </header>
</template>

<style lang="scss">
  $header-brand-bg: #272822;
  $header-brand-link: #CFD0C2;

  #page-header {
    text-align: center;
  }

  .header-brand {
    background-color: $header-brand-bg;

    a {
      color: $header-brand-link;
      font-weight: 600;
      font-size: 18px;
      display: inline-block;
      padding: 11px;

      &:hover,
      &:focus {
        background-color: darken($header-brand-bg, 10%);
        color: lighten($header-brand-link, 20%)
      }
    }
  }

</style>

