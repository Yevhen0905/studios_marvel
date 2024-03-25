<template>
  <div class="wrapper_search_result">
    <div class="section_content">
      <router-link
        class="content_item"
        :to="`/character/${searchChar.id}`"
        v-for="searchChar in searchResults.results"
        :key="searchChar.id"
      >
        <img
          class="content_image"
          :src="
            searchChar.thumbnail.path +
            '/' +
            'standard_fantastic' +
            '.' +
            searchChar.thumbnail.extension
          "
          alt=""
        />
        <h3 class="content_text">{{ searchChar.name }}</h3>
        <button class="content_btn" :to="{path: '/character/' + searchChar.id}">
          About character
        </button>
      </router-link>
    </div>
    <div v-if="searchResults.results.length > 19" class="pagination">
      <v-pagination
        v-model="page"
        circle
        :length="Math.ceil(searchResults.total / 20)"
        @input="$emit('search-character', page)"
        @next="$emit('search-character', page)"
        @previous="$emit('search-character', page)"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchResultsCharacters',
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
