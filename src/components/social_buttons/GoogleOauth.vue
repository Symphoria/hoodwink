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
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
          .then(function() {
            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            return firebase.auth().signInWithRedirect(provider);
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
          });
        
      }
    }
  }
</script>

<style scoped>

</style>
