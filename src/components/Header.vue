<template>
  <a href="#">
    <img class="logo_marvel" src="../assets/Marvel_Comics_(1990).svg" alt="" />
  </a>
</template>

<script>
  export default {
    name: 'Header'
  };
</script>

<style lang="scss">
  .logo_marvel {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 150px;
    opacity: 0.7;
    box-shadow: 0px 13px 8px #d42417;
  }
  @media screen and (max-width: 768px) {
    .logo_marvel {
      max-width: 100px;
    }
  }
</style>
