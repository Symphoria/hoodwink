<template>
  <div>
    <transition appear name="fade">
      <div id="brand-name">
        <p id="hoodwink">HOODWINK</p>
        <p class="subheading">The Manga Updates Tracker</p>
        <p class="subheading">We track updates of your favorite manga, so you don't have to</p>
        <router-link to="/search" class="button is-outlined get-started">Get Started</router-link>
      </div>
    </transition>
    <div class="container" style="padding-top: 3%;">
      <p class="catch-line">
        It's cumbersome to scourge for manga sites daily for any updates of your favorite manga, right?<br>
        So don't. Let Hoodwink do it for you and let those updates come to you.
      </p>
      <div class="columns" style="margin-top: 3%;">
        <transition appear name="slide-left">
          <div class="column">
            <img src="../assets/Search.png">
            <p class="steps">Search for the manga you like</p>
          </div>
        </transition>
        <transition appear name="slide-fade">
          <div class="column">
            <img src="../assets/Plus.png">
            <p class="steps">Add it your tracklist</p>
          </div>
        </transition>
        <transition appear name="slide-right">
          <div class="column">
            <img src="../assets/SecuredLetter.png">
            <p class="steps">Get notified via email</p>
          </div>
        </transition>
      </div>
      <hr>
      <transition appear name="slide-fade">
        <div class="container" style="margin-top: 2%;">
          <div class="level">
            <div class="level-item has-text-centered">
              <img src="../assets/Bookmark.png">
            </div>
            <p id="bookmark">
              Hoodwink has bookmarks which means no more time wasting finding the last chapter read while in the
              middle
              of a manga. Just store your latest chapter read at Hoodwink and forget. When you click Read on a manga
              you bookmarked, Hoodwink will automatically take you to your stored chapter.
            </p>
          </div>
        </div>
      </transition>
      <hr>
    </div>
    <div class="my-footer is-size-7-mobile">
      <p id="footer-made">
        Made by Harshit Jain (<a href="https://github.com/Symphoria" target="_blank"
                                 style="color: #80deea;">@Symphoria</a>) with
        <i class="fa fa-laptop" aria-hidden="true"></i>,
        <i class="fa fa-wifi" aria-hidden="true"></i> and
        <i class="fa fa-heart" aria-hidden="true"></i>
      </p>
      <p>Learn more
        <router-link to="/about" style="color: #80deea;">about</router-link>
        me, or better
        <router-link to="/about" style="color: #80deea;">contact</router-link>
        me.
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
    padding-bottom: 3%;
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

  .column {
    text-align: center;
  }

  .catch-line {
    text-align: center;
    font-size: 1.1em;
    padding-left: 2%;
    padding-right: 2%;
  }

  .steps {
    margin-top: 1%;
    font-size: 1.2em;
  }

  #bookmark {
    padding-left: 3%;
    padding-right: 3%;
  }

  hr {
    background-color: #B24592;
  }

  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.5s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(30px);
    opacity: 0;
  }

  .slide-right-enter-active {
    transition: all .5s ease;
  }

  .slide-right-enter
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateX(30px);
    opacity: 0;
  }

  .slide-left-enter-active {
    transition: all .5s ease;
  }

  .slide-left-enter
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateX(-30px);
    opacity: 0;
  }

  .fade-enter-active {
    transition: all .7s ease;
  }

  .fade-enter {
    opacity: 0;
  }
</style>
