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
              <p class="help is-danger" v-show="isUsernameEmpty">Please enter a valid username</p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" type="password" v-model="password" placeholder="Enter Password"/>
                <span class="icon is-left">
              <i class="fa fa-lock"></i>
            </span>
              </p>
              <p class="help is-danger" v-show="isPasswordEmpty">Please enter a password</p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" type="email" v-model="email" placeholder="Enter Email"/>
                <span class="icon is-left">
              <i class="fa fa-envelope"></i>
            </span>
              </p>
              <p class="help is-danger" v-show="isEmailEmpty">Please enter a valid email</p>
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
            <div class="columns is-desktop">
              <div class="column" style="text-align: center;">
                <google-button @has-logged-in="oauthSignUp"></google-button>
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
    components: { BNotification, FacebookButton, GoogleButton, TwitterButton, GithubButton },
    data() {
      return {
        username: '',
        password: '',
        email: '',
        isLoading: false,
        errorMessage: '',
        hasError: false,
        isUsernameEmpty: false,
        isPasswordEmpty: false,
        isEmailEmpty: false
      }
    },
    methods: {
      validateEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.email.toLowerCase());
      },
      validateAll() {
        this.isUsernameEmpty = this.username === '';
        this.isPasswordEmpty = this.password === '';
        this.isEmailEmpty = this.email === '' || !validateEmail();

        return !this.isUsernameEmpty && !this.isPasswordEmpty && !this.isEmailEmpty;
      },
      resetAll() {
        this.isUsernameEmpty = this.isPasswordEmpty = this.isEmailEmpty = false;
      },
      submitForm() {
        if (this.validateAll()) {
          this.isLoading = true;
          this.hasError = false;
          ajax.post('register', {
            username: this.username.trim(),
            password: this.password.trim(),
            email: this.email.trim(),
            viaOauth: false
          }).then(response => {
            this.resetAll();
            this.username = this.password = this.email = '';
            this.isLoading = false;
            this.openSnackbar();
          }).catch(error => {
            this.resetAll();
            this.isLoading = false;
            this.errorMessage = error.response.data.message;
            this.hasError = true;
          })
        }
      },
      openSnackbar() {
        this.$snackbar.open({
          duration: 15000,
          message: 'We have sent a confirmation mail to you. Check your inbox to continue',
          type: 'is-default',
          position: 'is-top-left'
        })
      },
      oauthSignUp(email) {
        const loadingComponent = this.$loading.open();
        ajax.post('register', {
          email: email,
          viaOauth: true
        }).then(response => {
          localStorage.setItem('authToken', response.data.authToken);
          this.$emit('logged-in');
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
      firebase.auth().getRedirectResult().then(result => {
        let user = result.user;
        this.oauthSignUp(user.email);
      }).catch(error => {
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
    font-weight: 300;
  }

  #inner-box {
    -webkit-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
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
</style>
