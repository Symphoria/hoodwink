<template>
  <a class="button is-medium" @click="signIn">
    <span class="icon"><i class="fa fa-github"></i></span>
    <span>Github</span>
  </a>
</template>

<script>
  import firebase from 'firebase';

  export default {
    methods: {
      signIn() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
          .then(function() {
            let provider = new firebase.auth.GithubAuthProvider();
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
  .button {
    background-color: #24292e;
    border-color: #24292e;
    color: #ffffff;
  }
</style>
