<template>
  <div>
    <div class="container_box">
      <router-link id="charactersImg" class="characters_img" to="/characters">
        <h2 class="title_home"><span>Characters</span></h2>
      </router-link>
      <router-link id="charactersImg" class="comics_img" to="/comics">
        <h2 class="title_home"><span>Comics</span></h2>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss" src="../style/style.scss">

</style>