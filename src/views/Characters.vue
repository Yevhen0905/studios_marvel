<template>
  <div class="main">
    <div class="container">
      <div class="block_search">
        <div class="block_search_item">
          <input
            class="input_search"
            v-model="searchChar"
            type="text"
            placeholder="Enter character..."
          />
          <div class="block_btn_search">
            <button
              class="btn_search"
              type="button"
              name="Search"
              @click="searchCharacter(searchChar)"
            >
              SEARCH
            </button>
            <button
              class="btn_search"
              id="SearchReset"
              v-if="searchResults.results"
              @click="$router.go(0)"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <h2 class="title">CHARACTERS</h2>
      <div class="loader_block" v-if="!characters.results">
        <v-progress-circular class="loader" :size="50" :width="5" indeterminate>
        </v-progress-circular>
      </div>
      <div class="wrapper_result" v-else>
        <SearchResultsCharacters
          v-if="searchResults.results"
          :search-results="searchResults"
          @search-character="searchCharacter"
        />
        <AllResultsCharacters
          v-else
          :characters="characters"
          @get-characters="getCharacters"
        />
      </div>
    </div>
    <BackTop />
  </div>
</template>

<script>
  import axios from 'axios';
  import {ENDPOINT, KEY} from '@/configs/marvel_app';
  import BackTop from '../components/BackTop.vue';
  import AllResultsCharacters from '@/components/AllResultsCharacters.vue';
  import SearchResultsCharacters from '@/components/SearchResultsCharacters.vue';

  export default {
    name: 'Characters',
    components: {
      BackTop,
      AllResultsCharacters,
      SearchResultsCharacters
    },
    data() {
      return {
        searchChar: '',
        characters: [],
        searchResults: [],
        limit: 20
      };
    },
    mounted() {
      this.getCharacters();
    },
    methods: {
      async getCharacters(page) {
        const ts = new Date().getTime();
        const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
        const offset = this.limit * (page - 1);
        const res = await axios.get(ENDPOINT.CHARACTER, {
          params: {
            ts: ts,
            apikey: KEY.PUBLIC_KEY,
            hash: hash,
            offset: offset
          }
        });
        this.scrollToTop();
        this.characters = res.data.data;
      },

      async searchCharacter(page) {
        const ts = new Date().getTime();
        const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
        const searchChar = this.searchChar;
        const offset = this.limit * (page - 1);
        const res = await axios.get(`${ENDPOINT.CHARACTER}`, {
          params: {
            ts: ts,
            apikey: KEY.PUBLIC_KEY,
            hash: hash,
            nameStartsWith: searchChar,
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
