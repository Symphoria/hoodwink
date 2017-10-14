<template>
  <div class="columns" id="below-nav">
    <div class="column is-half is-offset-one-quarter">
      <transition appear name="slide-fade">
        <div class="box" id="outer-box">
          <h2 id="form-heading">Sign Up</h2>
          <div class="box" id="inner-box">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" placeholder="Enter Username" v-model="username"/>
                <span class="icon is-left">
              <i class="fa fa-user"></i>
            </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" type="password" v-model="password" placeholder="Enter Password"/>
                <span class="icon is-left">
              <i class="fa fa-lock"></i>
            </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" type="email" v-model="email" placeholder="Enter Email"/>
                <span class="icon is-left">
              <i class="fa fa-envelope"></i>
            </span>
              </p>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <a :class="{'button is-primary is-medium': true, 'is-loading': isLoading}"
                   style="background-color: #F15F79" @click="submitForm">Submit</a>
              </p>
            </div>
            <div class="field">
              <b-notification type="is-danger" :active.sync="hasError">{{ errorMessage }}</b-notification>
            </div>
            <div class="field">
              <hr>
            </div>
            <p id="sign-up" style="text-align: center">Sign In Using :</p>
            <div class="columns">
              <div class="column" style="text-align: center;">
                <google-button @has-logged-in="oauthSignUp"></google-button>
              </div>
              <div class="column" style="text-align: center;">
                <facebook-button></facebook-button>
              </div>
              <div class="column" style="text-align: center;">
                <twitter-button></twitter-button>
              </div>
              <div class="column" style="text-align: center;">
                <github-button></github-button>
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
  import ajax from '../utilities/ajax'
  import BNotification from "../../node_modules/buefy/src/components/notification/Notification.vue";

  export default {
    components: {
      BNotification,
      FacebookButton, GoogleButton, TwitterButton, GithubButton},
    data() {
      return {
        username: '',
        password: '',
        email: '',
        isLoading: false,
        errorMessage: '',
        hasError: false
      }
    },
    methods: {
      submitForm() {
        this.isLoading = true;
        ajax.post('register', {
          username: this.username,
          password: this.password,
          email: this.email,
          viaOauth: false
        }).then(response => {
          this.username = this.password = this.email = '';
          this.isLoading = false;
          this.openSnackbar();
        }).catch(error => {
          this.isLoading = false;
          this.errorMessage = error.response.data.message;
          this.hasError = true;
        })
      },
      openSnackbar() {
        this.$snackbar.open({
          duration: 10000,
          message: 'We have sent a confirmation mail to you. Check your inbox to continue',
          type: 'is-default',
          position: 'is-top-left'
        });
      },
      oauthSignUp(email) {
        console.log(email);
      }
    }
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
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
