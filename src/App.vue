<template>
  <div id="app">
    <nav class="navbar is-transparent container" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item" id="brand">
          <img src="./assets/hoodwink-logo.svg" alt="logo" style="width: 3rem;">
          HOODWINK
        </router-link>
        <div :class="{'navbar-burger': true, 'burger': true, 'is-active': isActive}"
             data-target="nav-menu-transparent"
             @click="toggleIsActive">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <transition name="slide-fade">
      <div id="nav-menu-transparent" :class="{'navbar-menu': true, 'is-active': isActive}" v-show="showNavBurger">
        <div class="navbar-start">
          <a class="navbar-item" @click="goAbout">About</a>
          <a class="navbar-item" @click="goTrackList">Tracklist</a>
          <a class="navbar-item" @click="goBookmarks">Bookmarks</a>
        </div>
        <div class="navbar-end">
          <a class="navbar-item" @click="goSearch"><i class="fa fa-search" aria-hidden="true"></i>&nbsp;Search
          </a>
          <div class="field has-addons navbar-item" v-if="isLoggedIn">
            <p class="control">
              <a class="button is-primary" @click="goMyAccount">My Account</a>
            </p>
            <p class="control">
              <a class="button is-outlined" @click="logOut">Log Out</a>
            </p>
          </div>
          <div class="field has-addons navbar-item" v-else>
            <p class="control">
              <a class="button is-outlined" @click="goLogin">Login</a>
            </p>
            <p class="control">
              <a class="button is-primary" @click="goRegister">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
      </transition>
    </nav>
    <router-view @logged-in="isLoggedIn = true" @logged-out="logOut"></router-view>
  </div>
</template>

<script>
  import ajax from './utilities/ajax';
  import firebase from "firebase";

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
        firebase.auth().signOut().then(() => {
          localStorage.clear();
          this.isLoggedIn = false;
          this.$router.replace({name: 'home'});
          window.location.reload();
        }).catch(error => {
          console.log(error);
          localStorage.clear();
          this.isLoggedIn = false;
          this.$router.replace({name: 'home'});
          window.location.reload();
        })
      },
      goAbout() {
        this.toggleIsActive();
        this.$router.push({name: 'about'})
      },
      goTrackList() {
        this.toggleIsActive();
        this.$router.push({name: 'tracklist'})
      },
      goBookmarks() {
        this.toggleIsActive();
        this.$router.push({name: 'bookmarks'})
      },
      goMyAccount() {
        this.toggleIsActive();
        this.$router.push({name: 'my-account'})
      },
      goLogin() {
        this.toggleIsActive();
        this.$router.push({name: 'login'})
      },
      goRegister() {
        this.toggleIsActive();
        this.$router.push({name: 'register'})
      },
      goSearch() {
        this.toggleIsActive();
        this.$router.push({name: 'search'})
      }
    },
    computed: {
      showNavBurger() {
        return window.innerWidth >= 1024 || this.isActive;
      }
    },
    mounted() {
      const authToken = localStorage.getItem('authToken');

      if (authToken !== null) {
        if (navigator.onLine) {
          ajax.put('check-token', {
            token: authToken
          }).then(response => {
            this.isLoggedIn = response.data.isValid;

            if (!response.data.isValid) {
              localStorage.removeItem('authToken');
            }
          }).catch(() => {
            this.$toast.open({
              duration: 2000,
              message: 'Looks like there was some error',
              position: 'is-bottom',
              type: 'is-danger'
            });
          })
        } else {
          this.isLoggedIn = true;
        }
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Poiret+One|Lato|Roboto|Open+Sans');

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

  nav {
    font-family: 'Open Sans', Helvetica, sans-serif;
  }

  #brand {
    font-family: Poiret One, Helvetica, sans-serif;
    font-size: 1.5em;
  }

  nav.navbar {
    padding-top: 1%;
    padding-bottom: 1%;
  }

  .my-footer {
    text-align: center;
    background: linear-gradient(to left, #B24592, #F15F79);
    color: #ffffff;
    padding-bottom: 1%;
    padding-top: 1.5%;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  /* .slide-fade-leave-active {
    transition: all .5s ease;
  } */

  .slide-fade-enter
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(-15px);
    opacity: 0;
  }
</style>
