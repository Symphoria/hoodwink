<template>
  <div class="columns" id="below-nav">
    <div class="column is-half is-offset-one-quarter">
      <transition appear name="fade">
        <h2 id="form-heading">Login</h2>
      </transition>
      <transition appear name="slide-fade">
        <div class="box" id="inner-box">
          <div class="field">
            <p class="control has-icons-left">
              <input class="input is-medium" placeholder="Enter Username or Email" v-model="usernameOrEmail"/>
              <span class="icon is-left"><i class="fa fa-user"></i></span>
            </p>
            <p class="help is-danger" v-show="isUsernameEmpty">Please enter a registered username or email</p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input is-medium" type="password" v-model="password" placeholder="Enter Password"/>
              <span class="icon is-left"><i class="fa fa-lock"></i></span>
            </p>
            <p class="help is-danger" v-show="isPasswordEmpty">Please enter a password</p>
          </div>
          <center><forget-password-button></forget-password-button></center>
          <div class="field is-grouped is-grouped-centered">
            <p class="control">
              <a :class="{'button is-primary is-medium': true, 'is-loading': isLoading}"
                 style="background-color: #F15F79; margin-top: 5%;" @click="submitForm">Submit</a>
            </p>
          </div>
          <div class="field">
            <b-notification type="is-danger" :active.sync="hasError">{{ errorMessage }}</b-notification>
          </div>
          <div class="field">
            <hr>
          </div>
          <p id="sign-up" style="text-align: center">Log In Using :</p>
          <div class="columns is-desktop">
            <div class="column" style="text-align: center;">
              <google-button></google-button>
            </div>
            <div class="column" style="text-align: center;">
              <facebook-button @has-logged-in="oauthSignUp"></facebook-button>
            </div>
            <div class="column" style="text-align: center;">
              <twitter-button @has-logged-in="oauthSignUp"></twitter-button>
            </div>
            <div class="column" style="text-align: center;">
              <github-button @has-logged-in="oauthSignUp"></github-button>
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
  import ForgetPasswordButton from "./utility_buttons/ForgetPasswordButton"
  import firebase from "firebase";

  export default {
    components: {FacebookButton, GoogleButton, TwitterButton, GithubButton, BNotification, ForgetPasswordButton},
    data() {
      return {
        usernameOrEmail: '',
        password: '',
        hasError: false,
        isLoading: false,
        errorMessage: '',
        isUsernameEmpty: false,
        isPasswordEmpty: false
      }
    },
    methods: {
      validateAll() {
        this.isPasswordEmpty = this.password === '';
        this.isUsernameEmpty = this.usernameOrEmail === '';

        return !this.isUsernameEmpty && !this.isPasswordEmpty;
      },
      submitForm() {
        if (this.validateAll()) {
          this.isLoading = true;
          this.hasError = false;
          ajax.post('login', {
            usernameOrEmail: this.usernameOrEmail.trim(),
            password: this.password.trim(),
            viaOauth: false
          }).then(response => {
            this.isUsernameEmpty = this.isPasswordEmpty = false;
            this.usernameOrEmail = this.password = '';
            localStorage.setItem('authToken', response.data.authToken);
            this.isLoading = false;
            this.$emit('logged-in');
            this.$router.replace({ name: 'search' })
          }).catch(error => {
            this.isUsernameEmpty = this.isPasswordEmpty = false;
            this.isLoading = false;
            this.errorMessage = error.response.data.message;
            this.hasError = true;
          })
        }
      },
      oauthSignUp(email) {
        const loadingComponent = this.$loading.open();

        ajax.post('login', {
          usernameOrEmail: email.trim(),
          viaOauth: true
        }).then(response => {
          localStorage.setItem('authToken', response.data.authToken);
          this.$emit('logged-in');
          this.$emit('oauth-login');
          loadingComponent.close();
          this.$router.replace({ name: 'search' })
        }).catch(error => {
          loadingComponent.close();
          this.$snackbar.open({
            duration: 10000,
            message: error.response.data.message,
            type: 'is-danger',
            position: 'is-bottom-right'
          });
        })
      }
    },
    mounted: function() {
      const loadComponent = this.$loading.open();

      firebase.auth().getRedirectResult().then(result => {
        loadComponent.close();
        let user = result.user;
        this.oauthSignUp(user.email);
      }).catch(error => {
        loadComponent.close();
        self.$snackbar.open({
          duration: 10000,
          message: error.message,
          type: 'is-danger',
          position: 'is-bottom-right'
        });
      })
    }
  }
</script>

<style scoped>
  #below-nav {
    background: linear-gradient(to left, #B24592, #F15F79);
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    height: 100%;
    padding-bottom: 5%;
    overflow-x: hidden;
    overflow-y: visible;
  }

  .input {
    font-family: "Lato", sans-serif;
    font-weight: 300;
  }

  #sign-up {
    font-family: "Roboto", sans-serif;
    margin-bottom: 2%;
  }

  #form-heading {
    text-align: center;
    color: #ffffff;
    font-family: "Lato", "Helvetica Neue", sans-serif;
    font-size: 4em;
    margin-bottom: 3%;
    font-weight: 300;
  }

  #inner-box {
    -webkit-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    padding-bottom: 5%;
    padding-top: 5%;
  }

  hr {
    background-color: gray;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-enter
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(15px);
    opacity: 0;
  }

  .fade-enter-active {
    transition: all .5s ease;
  }

  .fade-enter {
    opacity: 0;
  }
</style>
