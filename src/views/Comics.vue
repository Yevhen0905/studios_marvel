<template>
  <div class="main">
    <div class="container">
      <div class="block_search">
        <div class="block_search_item">
          <input v-model="searchComic" type="text" class="input_search" placeholder="Enter comics..." />
          <div class="block_btn_search">
            <button class="btn_search" @click="searchComics(searchComic)" type="button" name="Search">SEARCH</button>
            <button class="btn_search" v-if="searchResults.results" @click="$router.go(0)">Reset</button>
          </div>
        </div>
      </div>
      <h2 class="title">COMICS</h2>
      <div v-if="!comics.results" class="loader_block">
        <v-progress-circular class="loader" :size="50" :width="5" indeterminate> </v-progress-circular>
      </div>
      <div v-else class="wrapper_result">
        <SearchResultsComics
          v-if="searchResults.results"
          :search-results="searchResults"
          @search-comics="searchComics"
        />
        <AllResultsComics v-else :comics="comics" @get-comics="getComics" />
      </div>
    </div>
    <BackTop />
  </div>
</template>

<script>
  import axios from 'axios';
  import {ENDPOINT, KEY} from '@/configs/marvel_app';
  import BackTop from '../components/BackTop.vue';
  import AllResultsComics from '@/components/AllResultsComics.vue';
  import SearchResultsComics from '@/components/SearchResultsComics.vue';

  export default {
    name: 'Comics',
    components: {
      BackTop,
      AllResultsComics,
      SearchResultsComics
    },
    data() {
      return {
        searchComic: '',
        comics: [],
        searchResults: [],
        limit: 20
      };
    },
    mounted() {
      this.getComics();
    },
    methods: {
      async getComics(page) {
        const ts = new Date().getTime();
        const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
        const offset = this.limit * (page - 1);
        const res = await axios.get(ENDPOINT.COMIC, {
          params: {
            ts: ts,
            apikey: KEY.PUBLIC_KEY,
            hash: hash,
            offset: offset
          }
        });
        this.scrollToTop();
        this.comics = res.data.data;
      },
      async searchComics(page) {
        const ts = new Date().getTime();
        const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
        const searchComic = this.searchComic;
        const offset = this.limit * (page - 1);
        const res = await axios.get(`${ENDPOINT.COMIC}`, {
          params: {
            ts: ts,
            apikey: KEY.PUBLIC_KEY,
            hash: hash,
            titleStartsWith: searchComic,
            offset: offset
          }
        });
        this.scrollToTop();
        this.searchResults = res.data.data;
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  };
</script>

<style lang="scss"></style>
