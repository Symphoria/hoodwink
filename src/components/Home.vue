<template>
  <div>
    <div id="brand-name">
      <p id="hoodwink">HOODWINK</p>
      <p class="subheading">The Manga Updates Tracker</p>
      <p class="subheading">We track updates of your favorite manga, so you don't have to</p>
      <router-link to="/search" class="button is-outlined get-started">Get Started</router-link>
    </div>
    <div class="container">
      <p style="text-align: center; font-size: 1.1em;">
        It's cumbersome to scourge for manga sites daily for any updates of your favorite manga, right?<br>
        So don't. Let Hoodwink do it for you and let those updates come to you.
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>
  #brand-name {
    background: linear-gradient(to left, #B24592, #F15F79);
    text-align: center;
    padding-top: 2%;
    padding-bottom: 2%;
  }

  #hoodwink {
    font-family: Poiret One, Helvetica, sans-serif;
    color: #ffffff;
    font-size: 4em;
  }

  .subheading {
    color: #f5f5f5;
    font-family: "Lato", Helvetica, sans-serif;
    font-size: 1.3em;
    font-weight: 100;
  }

  .get-started {
    color: #ffffff;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
    margin-top: 3%;
  }

  .container {
    font-family: "Open Sans", Helvetica, sans-serif;
  }
</style>
