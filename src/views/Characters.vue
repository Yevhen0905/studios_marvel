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
        console.log(this.characters);
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
      // console.log(res);
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

<style lang="scss">
.main {
    background-color: #1e1c1c;
}

.container {
    max-width: 1350px;
    width: 100%;
    margin: 0 auto;
    padding: 15px;
}

.section_content {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: space-around;
}

.block_search {
    display: flex;
    // justify-content: end;
}

.block_search_item {
    display: flex;
    flex-direction: column;
    max-width: 200px;

    .input_search {
        font-family: "Roboto", sans-serif;
        border: 1px solid #978f8f;
        padding: 10px;
        border-radius: 4px;
        margin: 15px 0;
        color: #fbfbfb;
    }

    .btn_search {
        border-radius: 4px;
        padding: 8px;
        background-color: #433a3a;
        font-family: "Roboto", sans-serif;
        color: #fbfbfb;
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 500;
        line-height: normal;
        max-width: 95px;
        transition: all 0.5s ease;

        &:hover {
            background-color: #8d969f;
            color: #1e1c1c;
        }
    }   
}

.block_btn_search {
    display: flex;
    justify-content: space-between;
}

.loader_block {
    display: flex;
    justify-content: center;
    color: #ed1d24;
}
  
.title {
 color: #ed1d24;
 font-family: 'Luckiest Guy', cursive;
  font-size: 50px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-align: center;
  padding: 0;
  margin: 20px 0 60px;
}

.content_item {
    position: relative;
    max-width: 270px;
    width: 100%;
    margin: 15px;
    border: thin solid rgba(255, 255, 255, 0.12);
    border-radius: 4px;
    transition: all 0.5s ease;
    text-decoration: none;

    &:hover {
        transform: scale(0.97);
    }
}

.content_image {
    min-height: 270px;
    width: 100%;
    border-radius: 4px 4px 0 0;
}

.content_text {
    font-family: "Roboto", sans-serif;
    color: #fbfbfb;
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: .08em;
    margin: 15px 15px 25px;
}

.content_btn {
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    color: #ed1d24;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: center;
    padding: 15px;
    margin: 0;
    background-color: inherit;
    border: none;
    outline: none;
    transition: all 0.5s ease;

    &:hover {
        background-color: rgba(205, 20, 20, 0.12);
        border-radius: 4px; 
    }
}

.pagination {
    padding-bottom: 20px;
}

.pagination .theme--light.v-pagination .v-pagination__item--active {
    color: #fff;
    background-color: #3476ef;
}


.v-pagination__more {
    color: #fff;
}
</style>