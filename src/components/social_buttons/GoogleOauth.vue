<template>
  <a class="button is-medium" @click="signIn">
    <span class="icon"><i class="fa fa-google"></i></span>
    <span>Google</span>
  </a>
</template>

<script>
  import firebase from "firebase";

  export default {
    methods: {
      signIn() {
        let self = this;
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then(result => {
          let user = result.user;
          self.$emit('has-logged-in', user.email);
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
  }
</script>

<style scoped>

</style>
