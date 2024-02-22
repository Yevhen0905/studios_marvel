<template>
  <div class="main">
    <div class="container details_container">
      <div class="details_content" v-for="char in character" :key="char.key">
        <div class="details_box">
          <img class="details_img" :src="char.thumbnail.path + '.' + char.thumbnail.extension" alt="" />
        </div>
        <div class="details_info">
          <h3 class="details_text">{{ char.name }}</h3>
          <div class="details_description" v-if="char.description">
            <p>{{ char.description }}</p>
          </div>
          <div class="details_description" v-else>
            <p>Character Description not Available.</p>
          </div>
          <div class="details_link">
            <div class="details_btn" v-for="item in char.urls" :key="item.key">
              <a :href="item.url" target="_blank">
                <button class="content_btn">{{ item.type }}</button>
              </a>
            </div>
          </div>
          <div class="details_item_block">
            <div class="details_item">
              <h3 class="details_item_title">Series</h3>
              <p class="details_item_text" v-for="item in char.series.items" :key="item.key">
                {{ item.name }}
              </p>
            </div>
            <div class="details_item">
              <h3 class="details_item_title">Comics</h3>
              <p class="details_item_text" v-for="item in char.comics.items" :key="item.key">
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
    name: 'CharacterDetails',
    data() {
      return {
        character: {}
      };
    },
    mounted() {
      this.getCharacter();
    },
    methods: {
      async getCharacter() {
        const ts = new Date().getTime();
        const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);
        const CharacterId = this.$route.params.id;
        // const res = await axios.get(`${ENDPOINT.CHARACTER}/${CharacterId}?apikey=${KEY.PUBLIC_KEY}`)
        const res = await axios.get(ENDPOINT.CHARACTER, {
          params: {
            id: CharacterId,
            ts: ts,
            hash: hash,
            apikey: KEY.PUBLIC_KEY
          }
        });
        this.character = res.data.data.results;
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
