<template>
  <div class="container page-home">
    <div id="feature-home">
      <div class="columns">
        <div class="column is-one-third">
          <img src="/img/my-face.png" class="my-face" alt="my face">
        </div>
        <div class="column column-text">
          <h1>Olá,<br> sou <span class="text-orange">David Costa</span> tenho 24 anos. Sou desenvolvedor <span class="text-green">FullStack</span>..</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss">
  .text-orange {
    color: #6CC72C;
  }
  .text-green {
    color: #FE9720;
  }

  #feature-home {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;



    .my-face {
      width: 100%;
    }
    h1 {
      font-size: 36px;
    }
    .column-text {
      display: flex;
      align-items: center;
    }
  }

  @media screen and (min-width: 769px) {
    #feature-home {
      height: calc(100vh - 49px - 67px - 40px);
      min-height: 333px;
      .my-face {
      }
    }
  }

</style>
