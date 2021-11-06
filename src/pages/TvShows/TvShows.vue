<template>
  <section class="background">
    <b-container>
      <b-row class="my-4">
        <b-col lg="12" class="title__info">
          <h4>TV Shows</h4>
          <div class="ml-0 ml-md-auto title__dropdown">
            <vue-select
              :options="['top rated', 'airing today', 'on the air', 'popular']"
              :clearable="false"
              placeholder="Select Category"
              class="filter-data"
              v-model="selectedOptions"
              @input="
                params.page = 1;
                loadTvShows();
              "
            />
          </div>
          <div class="ml-0 ml-md-2 mt-2 mt-lg-0 title__search">
            <b-form-input
              v-model="search"
              placeholder="Search..."
              @keypress.enter="
                params.page = 1;
                search ? searchTvShows() : loadTvShows();
              "
            ></b-form-input>
          </div>
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
                v-for="(item, index) in tvShows"
                :key="index"
              >
                <img
                  :src="'https://image.tmdb.org/t/p/w500/' + item.poster_path"
                  :alt="item.poster_path"
                />
                <div class="info">
                  <h3>{{ item.name }}</h3>
                  <div class="rating">
                    <img src="@/assets/images/star.png" />
                    <p class="ml-2">{{ item.vote_average }}</p>
                  </div>
                  <p>{{ item.overview.substr(0, 60) + '&hellip;' }}</p>
                  <b-button
                    @click="addToWatchList(item)"
                    v-if="!watchList.includes(item.id)"
                    >+ Add to Watchlist</b-button
                  >
                  <b-button @click="removeToWatchList(item)" v-else
                    >- Remove to Watchlist</b-button
                  >
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col lg="12" class="d-flex">
            <b-button
              variant="link"
              class="indicator"
              :disabled="params.page === 1"
              @click="
                params.page -= 1;
                search ? searchTvShows() : loadTvShows();
              "
              ><img
                src="@/assets/images/chevron.png"
                class="indicator__left mr-2"
              />
              Previous</b-button
            >
            <b-button
              variant="link"
              class="ml-auto indicator"
              @click="
                params.page += 1;
                search ? searchTvShows() : loadTvShows();
              "
              >Next
              <img
                src="@/assets/images/chevron.png"
                class="indicator__right ml-2"
            /></b-button>
          </b-col>
        </b-row>
      </template>
    </b-container>
  </section>
</template>

<script>
import $axios from '@/api/api';
import Loading from '@/components/Loading.vue';

export default {
  name: 'TvShows',
  components: {
    Loading,
  },
  data() {
    return {
      tvShows: [],
      loading: true,
      selectedOptions: 'top rated',
      search: '',
      params: {
        api_key: process.env.VUE_APP_API_TOKEN,
        page: 1,
      },
      watchList: JSON.parse(localStorage.getItem('watchlist')).map((x) => x.id),
    };
  },
  mounted() {
    this.loadTvShows();
  },
  methods: {
    loadTvShows() {
      this.loading = true;
      $axios
        .get(
          `tv/${
            this.selectedOptions === 'top rated'
              ? 'top_rated'
              : this.selectedOptions === 'popular'
              ? 'popular'
              : this.selectedOptions === 'on the air'
              ? 'on_the_air'
              : this.selectedOptions === 'airing today'
              ? 'airing_today'
              : ''
          }`,
          {
            params: this.params,
          }
        )
        .then((response) => {
          this.tvShows = response.data.results;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    searchTvShows() {
      this.loading = true;
      $axios
        .get('search/tv', { params: { ...this.params, query: this.search } })
        .then((response) => {
          this.tvShows = response.data.results;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    addToWatchList(item) {
      let data = JSON.parse(localStorage.getItem('watchlist'));
      data.push(item);
      localStorage.setItem('watchlist', JSON.stringify(data));
      this.watchList = data.map((x) => x.id);
    },
    removeToWatchList(item) {
      let data = JSON.parse(localStorage.getItem('watchlist'));
      localStorage.setItem(
        'watchlist',
        JSON.stringify(data.filter((x) => x.id !== item.id))
      );
      this.watchList = data.filter((x) => x.id !== item.id).map((x) => x.id);
    },
  },
};
</script>
