<template>
  <div class="main">
    <div class="container">
      <div class="block_search">
        <div class="block_search_item">
          <input v-model="searchComic" type="text" class="input_search" placeholder="Enter comics...">
          <div class="block_btn_search">
            <button class="btn_search" @click="searchComics(searchComic)" type="button" name="Search">
              SEARCH
            </button>
            <button class="btn_search" 
              v-if="searchResults.results"
              @click="(searchResults.results = null), (searchComic = null)">
              Reset
            </button>
          </div>
        </div>
      </div>
      <h2 class="title">COMICS</h2>
      <!-- Loader -->
      <div class="loader_block">
        <v-progress-circular 
          class="loader" 
          v-if="!comics.results" 
          :size="50" 
          :width="5" 
          indeterminate>
        </v-progress-circular>
      </div>
      <div class="section_content">
        <!-- SEARCH RESULTS -->
        <router-link 
          class="content_item" 
          v-show="searchResults.results" 
          :to="`/comics/${searchComic.id}`"
          v-for="searchComic in searchResults.results" 
          :key="searchComic.id">
          <img class="content_image"
            :src="searchComic.thumbnail.path + '/' + 'standard_fantastic' + '.' + searchComic.thumbnail.extension"
            alt="">
          <h3 class="content_text">{{ searchComic.title }}</h3>
          <button 
            class="content_btn" :to="{ path: '/comic/' + searchComic.id }">
            About character
          </button>
        </router-link>
        <!-- ALL RESULTS -->
        <router-link 
          class="content_item" 
          v-show="!searchResults.results" 
          :to="`/comics/${comic.id}`"
          v-for="comic in comics.results" 
          :key="comic.id">
          <img class="content_image"
            :src="comic.thumbnail.path + '/' + 'standard_fantastic' + '.' + comic.thumbnail.extension" alt="">
          <h3 class="content_text">{{ comic.title }}</h3>
          <button 
            class="content_btn" :to="{ path: '/comic/' + comic.id }">
            About character
          </button>
        </router-link>
      </div>
    </div>
     <!-- search pagination -->
    <div class="pagination">
      <v-pagination
        v-show="searchResults.results"
        v-model="searchPage"
        :total-visible="5"
        circle 
        :length="Math.ceil(searchResults.total / 20)"
        @input="searchComics"
        @next="searchComics"
        @previous="searchComics"      
      ></v-pagination>           
    </div>
         <!-- all pagination -->
    <div class="pagination">
      <v-pagination 
        v-show="!searchResults.results" 
        v-if="comics.results" 
        v-model="page" 
        :total-visible="5" 
        circle
        :length="Math.ceil(comics.total / 20)"
        @input="getComics" 
        @next="getComics"
        @previous="getComics">
      </v-pagination>
    </div>
    <BackTop/>  
  </div>
</template>

<script>
import axios from 'axios';
import { ENDPOINT, KEY } from "@/configs/marvelapp";
import BackTop from '../components/BackTop.vue';

export default {
  name: 'Comics',
  components: {
    BackTop
  },
  data() {
    return {
      searchComic: '',
      comics: [],
      searchResults: [],
      page: 1,
      limit: 20,
      searchPage: 1
    }
  },
  mounted() {
    this.getComics()
  },
  methods: {
    async getComics() {
      const ts = new Date().getTime();
      const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
      const offset = this.limit*(this.page - 1); 
      const res = await axios.get(ENDPOINT.COMIC, {
        params: {
          ts: ts,
          apikey: KEY.PUBLIC_KEY,
          hash: hash,  
          offset: offset, 
        }
      })
      this.scrollToTop();
      this.comics = res.data.data;
    },
    async searchComics() {
      const ts = new Date().getTime();
      const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
      const searchComic = this.searchComic;
      const offset = this.limit*(this.searchPage - 1);
      const res = await axios.get(`${ENDPOINT.COMIC}`, {
        params: {
          ts: ts,
          apikey: KEY.PUBLIC_KEY,
          hash: hash,  
          titleStartsWith: searchComic,
          offset: offset,
        },
      })
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
}
</script>


<style lang="scss" src="../style/style.scss">

</style>