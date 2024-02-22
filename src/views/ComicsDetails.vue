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

<style lang="scss" scoped>
  .details_content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
  }

  .details_box {
    width: 46%;
  }

  .details_img {
    width: 100%;
  }

  .details_info {
    width: 51%;
  }

  .details_text {
    font-family: 'Roboto', sans-serif;
    color: #fbfbfb;
    text-transform: capitalize;
    font-size: 35px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 15px;
  }

  .details_description {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #fbfbfb;
    font-weight: 500;
    text-align: center;
    margin-bottom: 15px;
  }

  .details_link {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 15px;
  }

  .details_item_block {
    display: flex;
    justify-content: space-between;
    background-color: inherit;
    gap: 10px;
  }

  .details_item {
    background-color: #fff;
    width: 46%;
    height: 100%;
    border-radius: 5px;
    padding: 10px;
  }

  .details_item_title {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.87);
    font-weight: 500;
    text-align: center;
    margin-bottom: 10px;
  }

  .details_item_text {
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.87);
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

  @media screen and (max-width: 1366px) {
    div .details_container {
      padding: 15px 0;
    }
  }
  @media screen and (max-width: 768px) {
    .details_content {
      flex-direction: column;
    }

    div .details_box,
    div .details_info {
      width: 75%;
    }
  }
</style>
