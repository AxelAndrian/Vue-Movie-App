<template>
  <section class="background">
    <b-container>
      <b-row class="my-4">
        <b-col lg="12" class="title__info">
          <h4>Popular Actors</h4>
          <div class="ml-0 ml-md-auto title__dropdown">
            <b-form-input
              v-model="search"
              placeholder="Search..."
              @keypress.enter="
                params.page = 1;
                search ? searchActors() : loadActors();
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
            <div class="d-flex flex-wrap">
              <div
                class="card__content card__content--small my-3"
                v-for="(item, index) in actors"
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
        <b-row class="mt-5">
          <b-col lg="12" class="d-flex">
            <b-button
              variant="link"
              :disabled="params.page === 1"
              @click="
                params.page -= 1;
                search ? searchActors() : loadActors();
              "
              >Previous</b-button
            >
            <b-button
              variant="link"
              class="ml-auto"
              @click="
                params.page += 1;
                search ? searchActors() : loadActors();
              "
              >Next</b-button
            >
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
  name: 'Actors',
  components: {
    Loading,
  },
  data() {
    return {
      actors: [],
      loading: true,
      search: '',
      params: {
        api_key: process.env.VUE_APP_API_TOKEN,
        page: 1,
      },
    };
  },
  mounted() {
    this.loadActors();
  },
  methods: {
    loadActors() {
      this.loading = true;
      $axios
        .get('person/popular', {
          params: this.params,
        })
        .then((response) => {
          this.actors = response.data.results;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    searchActors() {
      this.loading = true;
      $axios
        .get('search/person', {
          params: { ...this.params, query: this.search },
        })
        .then((response) => {
          this.actors = response.data.results;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
