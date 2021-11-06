<template>
  <section class="background">
    <b-container>
      <b-row class="my-4">
        <b-col lg="12" class="d-flex">
          <h4>My Watchlist</h4>
        </b-col>
      </b-row>
      <template v-if="loading">
        <b-row>
          <b-col
            lg="12"
            class="d-flex justify-content-center align-items-center"
          >
            <Loading />
          </b-col>
        </b-row>
      </template>
      <template v-else>
        <b-row>
          <b-col lg="12">
            <div
              class="d-flex flex-wrap align-items-center justify-content-center"
            >
              <div
                class="card__content card__content--small my-3"
                v-for="(item, index) in watchList"
                :key="index"
              >
                <img
                  :src="'https://image.tmdb.org/t/p/w500/' + item.poster_path"
                  :alt="item.poster_path"
                />
                <div class="info">
                  <h3>{{ item.title || item.name }}</h3>
                  <div class="rating">
                    <img src="@/assets/images/star.png" />
                    <p class="ml-2">{{ item.vote_average }}</p>
                  </div>
                  <p>{{ item.overview.substr(0, 60) + '&hellip;' }}</p>
                  <b-button @click="removeToWatchList(item)"
                    >- Remove from Watchlist</b-button
                  >
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </template>
    </b-container>
  </section>
</template>

<script>
import Loading from '@/components/Loading.vue';

export default {
  name: 'Watchlist',
  components: {
    Loading,
  },
  data() {
    return {
      loading: true,
      watchList: JSON.parse(localStorage.getItem('watchlist')),
      watchListId: JSON.parse(localStorage.getItem('watchlist')).map(
        (x) => x.id
      ),
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    removeToWatchList(item) {
      let data = JSON.parse(localStorage.getItem('watchlist'));
      localStorage.setItem(
        'watchlist',
        JSON.stringify(data.filter((x) => x.id !== item.id))
      );
      this.watchList = data.filter((x) => x.id !== item.id);
      this.watchListId = data.filter((x) => x.id !== item.id).map((x) => x.id);
    },
  },
};
</script>
