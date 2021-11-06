<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" :sticky="true">
    <b-navbar-brand :to="{ name: 'home' }">App Movie</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          :to="{ name: 'movies' }"
          :class="$route.name === 'movies' ? 'active' : ''"
          >Movies</b-nav-item
        >
        <b-nav-item
          :to="{ name: 'tv-shows' }"
          :class="$route.name === 'tv-shows' ? 'active' : ''"
          >TV Shows</b-nav-item
        >
        <b-nav-item
          :to="{ name: 'actors' }"
          :class="$route.name === 'actors' ? 'active' : ''"
          >Best Actors</b-nav-item
        >
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item
          :to="{ name: 'watchlist' }"
          :class="$route.name === 'watchlist' ? 'active' : ''"
          >My Watchlist</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
};
</script>
