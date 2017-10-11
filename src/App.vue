<template>
  <div id="app" class="container">
    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="" class="navbar-item" id="brand">HOODWINK</router-link>
        <div class="navbar-burger burger" data-target="nav-menu-transparent">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="nav-menu-transparent" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="" class="navbar-item">Tracklist</router-link>
          <router-link to="" class="navbar-item">Bookmarks</router-link>
        </div>
        <div class="navbar-end">
          <router-link to="" class="navbar-item"><i class="fa fa-search" aria-hidden="true"></i>&nbsp;Search</router-link>
          <div class="navbar-item" v-if="isLoggedIn">
            <router-link to="" class="button is-outlined is-primary">My Account</router-link>
          </div>
          <div class="field has-addons navbar-item" v-else>
            <p class="control">
              <router-link to="" class="button is-outlined">Login</router-link>
            </p>
            <p class="control">
              <router-link to="" class="button is-primary">Register</router-link>
            </p>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        isLoggedIn: true
      };
    },
    methods: {


    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Poiret+One');

  body {
    margin: 0;
  }

  #app {
    font-family: Helvetica, sans-serif;
  }

  #brand {
    font-family: Poiret One, Helvetica,sans-serif;
    font-size: 1.5em;
  }
</style>
