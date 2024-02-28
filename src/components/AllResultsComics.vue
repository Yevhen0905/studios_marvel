<template>
  <div class="wrapper_all_results">
    <div class="section_content">
      <router-link class="content_item" :to="`/comics/${comic.id}`" v-for="comic in comics.results" :key="comic.id">
        <img
          class="content_image"
          :src="comic.thumbnail.path + '/' + 'standard_fantastic' + '.' + comic.thumbnail.extension"
          alt=""
        />
        <h3 class="content_text">{{ comic.title }}</h3>
        <button class="content_btn" :to="{path: '/comic/' + comic.id}">About character</button>
      </router-link>
    </div>
    <div class="pagination">
      <v-pagination
        v-model="page"
        :total-visible="5"
        circle
        :length="Math.ceil(comics.total / 20)"
        @input="$emit('get-comics', page)"
        @next="$emit('get-comics', page)"
        @previous="$emit('get-comics', page)"
      >
      </v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AllResultsComics',
    data() {
      return {
        page: 1
      };
    },
    props: {
      comics: {
        type: Object,
        default: () => {}
      }
    }
  };
</script>
