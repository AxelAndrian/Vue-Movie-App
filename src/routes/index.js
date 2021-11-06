// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// Vue Select
import 'vue-select/dist/vue-select.css';
// Custom SASS
import '@/assets/scss/main.scss';

import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import Router from 'vue-router';
import VueSelect from 'vue-select';

import Actors from '@/pages/Actors/Actors.vue';
import Home from '@/pages/Home.vue';
import Movies from '@/pages/Movies/Movies.vue';
import TvShows from '@/pages/TvShows/TvShows.vue';
import Watchlist from '@/pages/Watchlist/Watchlist.vue';

Vue.use(BootstrapVue);
Vue.use(Router);

Vue.component('vue-select', VueSelect);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies,
    },
    {
      path: '/tv-shows',
      name: 'tv-shows',
      component: TvShows,
    },
    {
      path: '/actors',
      name: 'actors',
      component: Actors,
    },
    {
      path: '/my-watchlist',
      name: 'watchlist',
      component: Watchlist,
    },
  ],
});

export default router;
