<template>
  <div class="wrapper_all_result">
    <div class="section_content">
      <router-link
        class="content_item"
        :to="`/character/${character.id}`"
        v-for="character in characters.results"
        :key="character.id"
      >
        <img
          class="content_image"
          :src="character.thumbnail.path + '/' + 'standard_fantastic' + '.' + character.thumbnail.extension"
          alt=""
        />
        <h3 class="content_text">{{ character.name }}</h3>
        <button class="content_btn" :to="{path: '/character/' + character.id}">About character</button>
      </router-link>
    </div>
    <div class="pagination">
      <v-pagination
        v-model="page"
        :total-visible="5"
        circle
        :length="Math.ceil(characters.total / 20)"
        @input="$emit('get-characters', page)"
        @next="$emit('get-characters', page)"
        @previous="$emit('get-characters', page)"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AllResultsCharacters',
    data() {
      return {
        page: 1
      };
    },
    props: {
      characters: {
        type: Object,
        default: () => {}
      }
    }
  };
</script>
