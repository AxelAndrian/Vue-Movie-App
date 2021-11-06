<template>
  <div id="app">
    <div v-if="loading">
      <Loader />
    </div>
    <div class="position-relative">
      <Header />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from './components/Layouts/Footer.vue';
import Header from './components/Layouts/Header.vue';
import Loader from './components/Loader.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Loader,
  },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    if (!localStorage.getItem('watchlist')) {
      localStorage.setItem('watchlist', JSON.stringify([]));
    }
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  },
};
</script>
