<template>
  <div class="main">
    <div class="container">
      <div class="block_search">
        <div class="block_search_item">
          <input v-model="searchComic" type="text" class="input_search" placeholder="Enter comics..." />
          <div class="block_btn_search">
            <button class="btn_search" @click="searchComics(searchComic)" type="button" name="Search">SEARCH</button>
            <button
              class="btn_search"
              v-if="searchResults.results"
              @click="(searchResults.results = null), (searchComic = null)"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <h2 class="title">COMICS</h2>
      <!-- Loader -->
      <div class="loader_block">
        <v-progress-circular class="loader" v-if="!comics.results" :size="50" :width="5" indeterminate>
        </v-progress-circular>
      </div>
      <div class="section_content">
        <!-- SEARCH RESULTS -->
        <router-link
          class="content_item"
          v-show="searchResults.results"
          :to="`/comics/${searchComic.id}`"
          v-for="searchComic in searchResults.results"
          :key="searchComic.id"
        >
          <img
            class="content_image"
            :src="searchComic.thumbnail.path + '/' + 'standard_fantastic' + '.' + searchComic.thumbnail.extension"
            alt=""
          />
          <h3 class="content_text">{{ searchComic.title }}</h3>
          <button class="content_btn" :to="{path: '/comic/' + searchComic.id}">About character</button>
        </router-link>
        <!-- ALL RESULTS -->
        <router-link
          class="content_item"
          v-show="!searchResults.results"
          :to="`/comics/${comic.id}`"
          v-for="comic in comics.results"
          :key="comic.id"
        >
          <img
            class="content_image"
            :src="comic.thumbnail.path + '/' + 'standard_fantastic' + '.' + comic.thumbnail.extension"
            alt=""
          />
          <h3 class="content_text">{{ comic.title }}</h3>
          <button class="content_btn" :to="{path: '/comic/' + comic.id}">About character</button>
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
        @previous="getComics"
      >
      </v-pagination>
    </div>
    <BackTop />
  </div>
</template>

<script>
  import axios from 'axios';
  import {ENDPOINT, KEY} from '@/configs/marvelapp';
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
      };
    },
    mounted() {
      this.getComics();
    },
    methods: {
      async getComics() {
        const ts = new Date().getTime();
        const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
        const offset = this.limit * (this.page - 1);
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
      async searchComics() {
        const ts = new Date().getTime();
        const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
        const searchComic = this.searchComic;
        const offset = this.limit * (this.searchPage - 1);
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
      font-family: 'Roboto', sans-serif;
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
      font-family: 'Roboto', sans-serif;
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
    font-family: 'Roboto', sans-serif;
    color: #fbfbfb;
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.08em;
    margin: 15px 15px 25px;
  }

  .content_btn {
    font-family: 'Roboto', sans-serif;
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
    color: #ffffff;
    background-color: #3476ef;
  }

  .v-pagination__more {
    color: #fff;
  }
</style>
