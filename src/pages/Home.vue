<template>
  <section class="background">
    <b-container>
      <b-row class="mt-4">
        <b-col lg="12" class="d-flex my-4">
          <h4>Top Rated Movies</h4>
          <router-link class="ml-auto" :to="{ name: 'movies' }"
            >See More ></router-link
          >
        </b-col>
        <b-col lg="12">
          <div class="card__wrapper">
            <div
              class="card__content"
              v-for="(item, index) in movies.slice(0, 10)"
              :key="index"
            >
              <img
                :src="'https://image.tmdb.org/t/p/w500/' + item.poster_path"
                :alt="item.poster_path"
              />
              <div class="info">
                <h3>{{ item.title }}</h3>
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
                  >- Remove from Watchlist</b-button
                >
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col lg="12" class="d-flex my-4">
          <h4>Top Rated TV Shows</h4>
          <router-link :to="{ name: 'tv-shows' }" class="ml-auto"
            >See More ></router-link
          >
        </b-col>
        <b-col lg="12">
          <div class="card__wrapper">
            <div
              class="card__content"
              v-for="(item, index) in tvShows.slice(0, 10)"
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
      <b-row class="mt-4">
        <b-col lg="12" class="d-flex my-4">
          <h4>Popular Actors</h4>
          <router-link :to="{ name: 'actors' }" class="ml-auto"
            >See More ></router-link
          >
        </b-col>
        <b-col lg="12">
          <div class="card__wrapper">
            <div
              class="card__content"
              v-for="(item, index) in actors.slice(0, 10)"
              :key="index"
            >
              <img
                :src="'https://image.tmdb.org/t/p/w500/' + item.profile_path"
                :alt="item.profile_path"
              />
              <div class="info">
                <h3>{{ item.name }}</h3>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import $axios from '@/api/api';

export default {
  name: 'Home',
  data() {
    return {
      movies: [],
      tvShows: [],
      actors: [],
      watchList: JSON.parse(localStorage.getItem('watchlist')).map((x) => x.id),
    };
  },
  mounted() {
    this.loadMovies();
    this.loadTvShows();
    this.loadActors();
  },
  methods: {
    loadMovies() {
      $axios
        .get('movie/top_rated', {
          params: { api_key: process.env.VUE_APP_API_TOKEN, page: 1 },
        })
        .then((response) => {
          this.movies = response.data.results;
        });
    },
    loadTvShows() {
      $axios
        .get('tv/top_rated', {
          params: { api_key: process.env.VUE_APP_API_TOKEN, page: 1 },
        })
        .then((response) => {
          this.tvShows = response.data.results;
        });
    },
    loadActors() {
      $axios
        .get('person/popular', {
          params: { api_key: process.env.VUE_APP_API_TOKEN, page: 1 },
        })
        .then((response) => {
          this.actors = response.data.results;
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
