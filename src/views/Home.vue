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

<style lang="scss" scoped>
.container_box {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5px;
    padding: 10px 15px;
    background-color: #1E1E1E;
}
  
.characters_img {
    position: relative;
    display: inline-block;
    background-image: linear-gradient(to right top, rgba(0, 0, 0, 0.4), rgba(25, 32, 72, 0.6)), url(../assets/grut-kartinki-12.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 43% center;
    height: 700px;
    width: 49%;
    box-shadow: 10px 10px 50px -10px rgb(0 0 0 / 50%);
    transition: all 0.5s ease;
  
    &:hover {
      transform: scale(0.99);
      opacity: 0.5;
    }
}
  
.comics_img {
    position: relative;
    display: inline-block;
    background-image: linear-gradient(to right top, rgba(0, 0, 0, 0.4), rgba(25, 32, 72, 0.4)), url(../assets/1366_2000.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    height: 700px;
    width: 49%;
    box-shadow: 10px 10px 50px -10px rgb(0 0 0 / 50%);
    transition: all 0.5s ease;
  
    &:hover {
      transform: scale(0.99);
      opacity: 0.5;
    }
}
  
.title_home {
    position: absolute;
    bottom: 100px;
    left: 0;
    width: 100%;
}
  
.title_home span {
    color: #ed1d24;
    font-weight: 400;
    font-family: 'Luckiest Guy', cursive;
    font-size: 60px;
    text-transform: uppercase;
    letter-spacing: 4px;
    padding: 10px 20px;
    background: linear-gradient(to right,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.7) 100%);
}

@media screen and (max-width:768px) {

  .title_home {
    top: 0;
  }
  .characters_img .title_home span {
    writing-mode: vertical-rl;
    text-orientation: upright;
    transform: none;
    font-size: 40px;
  }

  .comics_img .title_home span {
    writing-mode: vertical-rl;
    text-orientation: upright;
    transform: none;
    font-size: 40px;
  }
}
</style>