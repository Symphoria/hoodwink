<template>
  <div id="app">
    <nav class="navbar is-transparent container" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item" id="brand">HOODWINK</router-link>
        <div :class="{'navbar-burger': true, 'burger': true, 'is-active': isActive}"
             data-target="nav-menu-transparent"
             @click="toggleIsActive">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="nav-menu-transparent" :class="{'navbar-menu': true, 'is-active': isActive}">
        <div class="navbar-start">
          <router-link to="" class="navbar-item">Tracklist</router-link>
          <router-link to="" class="navbar-item">Bookmarks</router-link>
        </div>
        <div class="navbar-end">
          <router-link to="/search" class="navbar-item"><i class="fa fa-search" aria-hidden="true"></i>&nbsp;Search
          </router-link>
          <div class="field has-addons navbar-item" v-if="isLoggedIn">
            <p class="control">
              <router-link to="" class="button is-primary">My Account</router-link>
            </p>
            <p class="control">
              <a class="button is-outlined" @click="logOut">Log Out</a>
            </p>
          </div>
          <div class="field has-addons navbar-item" v-else>
            <p class="control">
              <router-link to="/login" class="button is-outlined">Login</router-link>
            </p>
            <p class="control">
              <router-link to="/register" class="button is-primary">Sign Up</router-link>
            </p>
          </div>
        </div>
      </div>
    </nav>
    <router-view @logged-in="isLoggedIn = true"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        isLoggedIn: false,
        isActive: false
      };
    },
    methods: {
      toggleIsActive() {
        this.isActive = !this.isActive;
      },
      logOut() {
        localStorage.removeItem('authToken');
        this.isLoggedIn = false;
        this.$router.replace({ name: 'login' })
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Poiret+One|Lato|Roboto');

  html {
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
  }

  #app {
    font-family: Helvetica, sans-serif;
    height: 100%;
  }

  #brand {
    font-family: Poiret One, Helvetica, sans-serif;
    font-size: 1.5em;
  }

  nav.navbar {
    padding-top: 1%;
    padding-bottom: 1%;
  }
</style>
