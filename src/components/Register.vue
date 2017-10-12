<template>
  <div class="columns" id="below-nav">
    <div class="column is-half is-offset-one-quarter">
      <transition appear name="slide-fade">
        <div class="box" id="outer-box">
          <h2 id="form-heading">Sign Up</h2>
          <div class="box" id="inner-box">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" placeholder="Enter Username"/>
                <span class="icon is-left">
              <i class="fa fa-user"></i>
            </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" type="password" placeholder="Enter Password"/>
                <span class="icon is-left">
              <i class="fa fa-lock"></i>
            </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" type="email" placeholder="Enter Email"/>
                <span class="icon is-left">
              <i class="fa fa-envelope"></i>
            </span>
              </p>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <a class="button is-primary is-medium" style="background-color: #F15F79">Submit</a>
              </p>
            </div>
            <div class="field">
              <hr>
            </div>
            <p id="sign-up" style="text-align: center">Sign In Using :</p>
            <div class="columns">
              <div class="column" style="text-align: center;">
                <google-button></google-button>
              </div>
              <div class="column" style="text-align: center;">
                <facebook-button></facebook-button>
              </div>
              <div class="column" style="text-align: center;">
                <twitter-button></twitter-button>
              </div>
              <div class="column" style="text-align: center;">
                <GithubButton></GithubButton>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import FacebookButton from './social_buttons/FacebookOauth.vue'
  import GoogleButton from './social_buttons/GoogleOauth.vue'
  import TwitterButton from './social_buttons/TwitterOauth.vue'
  import GithubButton from './social_buttons/GithubOauth.vue'

  export default {
    components: {FacebookButton, GoogleButton, TwitterButton, GithubButton}
  }
</script>

<style scoped>
  #below-nav {
    background: linear-gradient(to left, #B24592, #F15F79);
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 1%;
  }

  .input {
    font-family: "Lato", sans-serif;
  }

  #sign-up {
    font-family: "Roboto", sans-serif;
    margin-bottom: 2%;
  }

  #outer-box {
    background: white;
    margin-top: 4%;
    margin-bottom: 4%;
    -webkit-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
  }

  #form-heading {
    text-align: center;
    color: #F15F79;
    font-family: "Lato", "Helvetica Neue", sans-serif;
    font-size: 4em;
    margin-bottom: 2%;
  }

  #inner-box {
    -webkit-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-enter
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
