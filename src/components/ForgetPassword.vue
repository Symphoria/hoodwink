<template>
  <div class="columns" id="backdrop">
    <div class="column is-6 is-offset-3">
      <div class="box">
        <center><p id="heading">Forgot Password?</p></center>
        <center><p id="subheading">Just enter a new password below and we are good to go</p></center>
        <div class="field">
          <div class="control">
            <input class="input" type="password" placeholder="Enter Password" v-model="password">
          </div>
        </div>
        <center>
          <a :class="{'button is-primary': true, 'is-loading': isLoading}" @click="reset">
            Change Password
          </a>
        </center>
        <center><p id="below-box">Password Changed? Go to <a @click="goLogin">Login</a></p></center>
      </div>
    </div>
  </div>
</template>

<script>
  import ajax from '../utilities/ajax'

  export default {
    name: "forget-password",
    data() {
      return {
        isLoading: false,
        password: ''
      }
    },
    methods: {
      reset() {
        this.isLoading = true;

        ajax.put('forget-password', {
          newPassword: this.password
        }, {
          headers: {
            'Activation-Token': this.$route.params.activationToken
          }
        }).then(response => {
          this.isLoading = false;
          this.$toast.open({
            duration: 4000,
            message: response.data.message,
            position: 'is-bottom',
            type: 'is-success'
          })
        }).catch(error => {
          this.isLoading = false;
          this.$toast.open({
            duration: 4000,
            message: error.response.data.message,
            position: 'is-bottom',
            type: 'is-danger'
          })
        })
      },
      goLogin() {
        this.$emit('logged-out');
        this.$router.replace({name: 'login'})
      }
    }
  }
</script>

<style scoped>
  #backdrop {
    background: linear-gradient(to left, #B24592, #F15F79);
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 2%;
    padding-left: 0.5%;
    padding-right: 0.5%;
    height: 95%;
    overflow-x: hidden;
    overflow-y: visible;
  }

  #heading {
    text-align: center;
    color: #F15F79;
    font-family: "Lato", "Helvetica Neue", sans-serif;
    font-size: 3.5em;
    font-weight: 300;
  }

  #subheading {
    color: #F15F79;
    font-family: "Lato Hairline", Helvetica Neue, sans-serif;
    margin-bottom: 7%;
    font-weight: 300;
    text-align: center;
    font-size: 1.3em;
  }

  .button {
    margin-top: 5%;
    margin-bottom: 2%;
  }

  .box {
    margin-top: 6%;
    border-radius: 0;
  }

  .input {
    box-shadow: none;
  }

  #below-box {
    font-size: 0.9em;
    margin-top: 2%;
  }
</style>
