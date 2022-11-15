<template>
  <div class="main">
    <div class="container">
      <div class="block_search">
        <div class="block_search_item">
          <input class="input_search" v-model="searchChar" type="text" placeholder="Enter character...">
          <div class="block_btn_search">
            <button class="btn_search" type="button" name="Search" @click="searchCharacter(searchChar)">
              SEARCH
            </button>
            <button class="btn_search" id="SearchReset" 
              v-if="searchResults.results"
              @click="(searchResults.results = null), (searchChar = null)"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <h2 class="title">CHARACTERS</h2>
      
      <!-- Loader -->
      <div class="loader_block">
        <v-progress-circular 
          class="loader" 
          v-if="!characters.results" 
          :size="50" 
          :width="5" 
          indeterminate>
        </v-progress-circular>
      </div>
      <div class="section_content">
        
        <!-- Search results -->
        <router-link 
          class="content_item" 
          v-show="searchResults.results" 
          :to="`/character/${searchChar.id}`"
          v-for="searchChar in searchResults.results" 
          :key="searchChar.id"
        >
          <img class="content_image"
            :src="searchChar.thumbnail.path + '/' + 'standard_fantastic' + '.' + searchChar.thumbnail.extension" alt="">
          <h3 class="content_text">{{ searchChar.name }}</h3>
          <button 
            class="content_btn" :to="{ path: '/character/' + searchChar.id }">
            About character
          </button>
        </router-link>
        
        <!-- ALL RESULTS -->
        <router-link 
          class="content_item" 
          v-show="!searchResults.results" 
          :to="`/character/${character.id}`"
          v-for="character in characters.results" 
          :key="character.id">
          <img class="content_image"
            :src="character.thumbnail.path + '/' + 'standard_fantastic' + '.' + character.thumbnail.extension" alt="">
          <h3 class="content_text">{{ character.name }}</h3>
          <button 
            class="content_btn" :to="{ path: '/character/' + character.id }">
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
        circle 
        :length="Math.ceil(searchResults.total / 20)"
        @input="searchCharacter"
        @next="searchCharacter"
        @previous="searchCharacter"      
      ></v-pagination>      
    </div>
     <!-- all pagination -->
    <div class="pagination">
      <v-pagination 
        v-show="!searchResults.results" 
        v-if="characters.results" 
        v-model="page"
        :total-visible="5" 
        circle 
        :length="Math.ceil(characters.total / 20)" 
        @input="getCharacters"
        @next="getCharacters" 
        @previous="getCharacters"></v-pagination>
    </div>
    <BackTop/>  
  </div>
</template>

<script>

import axios from 'axios';
import { ENDPOINT, KEY } from "@/configs/marvelapp";
import BackTop from '../components/BackTop.vue';


export default {
  name: 'Characters',
  components: {
    BackTop
  },
  data() {
    return {
      searchChar: '',
      characters: [],
      searchResults: [],
      page: 1,
      limit: 20,
      searchPage: 1
    }
  },
  mounted() {
    this.getCharacters()
  },
  methods: {
    async getCharacters() {
      const ts = new Date().getTime();
      const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
      const offset = this.limit*(this.page - 1); 
      const res = await axios.get(ENDPOINT.CHARACTER, {
        params: {   
          ts: ts,
          apikey: KEY.PUBLIC_KEY,
          hash: hash,          
          offset: offset,
        }
      })
        this.scrollToTop()
        this.characters = res.data.data; 
    },

    async searchCharacter() {
      const ts = new Date().getTime();
      const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
      const searchChar = this.searchChar;
      const offset = this.limit*(this.searchPage - 1); 
      const res = await axios.get(`${ENDPOINT.CHARACTER}`, {
        params: {
          ts: ts,   
          apikey: KEY.PUBLIC_KEY,
          hash: hash,  
          nameStartsWith: searchChar,  
          offset: offset,
        },
      })
      this.scrollToTop()   
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