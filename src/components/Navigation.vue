<template>
  <div class="box_nav">
    <nav class="nav_link">
      <router-link class="link_item" to="/">Home</router-link>
      <router-link class="link_item" to="/Characters">Characters</router-link>
      <router-link class="link_item" to="/comics">Comics</router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navigation'
  };
</script>

<style lang="scss">
  .box_nav {
    display: flex;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right top, rgba(0, 0, 0, 0.8), rgba(25, 32, 72, 0.3)),
      url(../assets/ArticleImage_166787.jpg);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    height: 300px;
  }

  .nav_link {
    display: flex;
    align-items: end;
    max-width: 960px;
    width: 100%;
    justify-content: space-around;
    margin: 0 auto;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-size: 38px;
    letter-spacing: 0.3em;
    font-weight: 500;
    cursor: pointer;

    .link_item {
      text-shadow: 3px 1px 9px #4e7fa3;
      font-weight: bold;
      color: #2f86dc;
      transition: all 0.5s ease;
      text-transform: uppercase;
      padding: 10px;

      &.router-link-exact-active {
        color: #fbfbfb;
        text-shadow: 3px 1px 9px #4e7fa3;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .box_nav {
      height: 225px;
    }

    .nav_link {
      justify-content: space-around;
      font-size: 30px;
      letter-spacing: 0.1em;
    }
  }

  @media screen and (max-width: 500px) {
    .box_nav {
      height: 220px;
    }
    .nav_link {
      font-size: 20px;
      letter-spacing: 0.02em;
    }
  }
</style>
