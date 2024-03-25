<template>
  <div class="wrapper_search_result">
    <div class="section_content">
      <router-link
        class="content_item"
        v-show="searchResults.results"
        :to="`/comics/${searchComic.id}`"
        v-for="searchComic in searchResults.results"
        :key="searchComic.id"
      >
        <img
          class="content_image"
          :src="
            searchComic.thumbnail.path +
            '/' +
            'standard_fantastic' +
            '.' +
            searchComic.thumbnail.extension
          "
          alt=""
        />
        <h3 class="content_text">{{ searchComic.title }}</h3>
        <button class="content_btn" :to="{path: '/comic/' + searchComic.id}">
          About character
        </button>
      </router-link>
    </div>
    <div v-if="searchResults.results.length > 19" class="pagination">
      <v-pagination
        v-model="page"
        :total-visible="5"
        circle
        :length="Math.ceil(searchResults.total / 20)"
        @input="$emit('search-comics', page)"
        @next="$emit('search-comics', page)"
        @previous="$emit('search-comics', page)"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SearchResultsComics',
    data() {
      return {
        page: 1
      };
    },
    props: {
      searchResults: {
        type: Object,
        default: () => {}
      }
    }
  };
</script>
