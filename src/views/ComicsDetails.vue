<template>
  <div class="main">
    <div class="container details_container">
      <div class="details_content" v-for="com in comic" :key="com.key">
        <div class="details_box">
          <img class="details_img" :src="com.thumbnail.path + '.' + com.thumbnail.extension" alt="" />
        </div>
        <div class="details_info">
          <h3 class="details_text">{{ com.title }}</h3>
          <h4 class="details_description">Price: {{ com.prices[0].price + '$' }}</h4>
          <div class="details_description">
            <p>{{ com.description }}</p>
          </div>
          <div class="details_link">
            <div class="details_btn" v-for="url in com.urls" :key="url.key">
              <a class="pa-2" :href="url.url" target="_blank">
                <button class="content_btn" color="red" text>{{ url.type }}</button>
              </a>
            </div>
          </div>
          <div class="details_item_block">
            <div class="details_item">
              <h3 class="details_item_title">Series</h3>
              <p class="details_item_text">{{ com.series.name }}</p>
            </div>
            <div class="details_item">
              <h3 class="details_item_title">Creators</h3>
              <p class="details_item_text" v-for="item in com.creators.items" :key="item.key">
                {{ item.name + ' - ' + item.role }}
              </p>
            </div>
            <div class="details_item">
              <h3 class="details_item_title">Stories</h3>
              <p class="details_item_text" v-for="item in com.stories.items" :key="item.key">
                {{ item.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {ENDPOINT, KEY} from '@/configs/marvelapp';

  export default {
    name: 'ComicsDetails',
    data() {
      return {
        comic: {}
      };
    },
    mounted() {
      this.getComic();
    },
    methods: {
      async getComic() {
        const ts = new Date().getTime();
        const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
        const ComicId = this.$route.params.id;
        // const res = await axios.get(`${ENDPOINT.COMIC}/${ComicId}?apikey=${KEY.PUBLIC_KEY}`)
        const res = await axios.get(ENDPOINT.COMIC, {
          params: {
            id: ComicId,
            ts: ts,
            hash: hash,
            apikey: KEY.PUBLIC_KEY
          }
        });
        this.comic = res.data.data.results;
      }
    }
  };
</script>

<style lang="scss">
  
</style>
