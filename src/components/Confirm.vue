<template>
  <div class="confirm-account">
    <div v-if="isConfirmed">
      <h2>Account Confirmed</h2>
      <h4>Go to Login Page</h4>
      <router-link to="/login" class="button is-outlined is-primary is-medium" replace>Login</router-link>
    </div>
    <h2 v-else>Confirming your Account...</h2>
  </div>
</template>

<script>
  import ajax from '../utilities/ajax'

  export default {
    data() {
      return {
        isConfirmed: false
      }
    },
    created() {
      let url = 'confirm?q=' + this.$route.params.confirmToken;
      ajax.put(url).then(response => {
        this.isConfirmed = true
      }).catch(error => {
        this.$snackbar.open({
          duration: 10000,
          message: error.response.data.message,
          type: 'is-danger',
          position: 'is-bottom-right'
        });
      })
    }
  }
</script>

<style scoped>
  .confirm-account {
    text-align: center;
    margin-top: 10%;
  }

  h2 {
    color: #F15F79;
    font-family: "Lato", "Helvetica Neue", sans-serif;
    font-size: 4em;
  }

  h4 {
    color: #F15F79;
    font-family: "Lato", "Helvetica Neue", sans-serif;
    font-size: 2em;
    margin-bottom: 2%;
  }
</style>
