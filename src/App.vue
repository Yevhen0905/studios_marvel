<template>
  <div id="app">
    <div class="hero">
      <Header />
      <Navigation />
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
  import Footer from './components/Footer.vue';
  import Header from './components/Header.vue';
  import Navigation from './components/Navigation.vue';

  export default {
    name: 'App',
    components: {
      Navigation,
      Header,
      Footer
    }
  };
</script>

<style lang="scss"></style>
