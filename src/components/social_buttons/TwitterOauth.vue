<template>
  <a class="button is-medium" @click="signIn">
    <span class="icon"><i class="fa fa-twitter"></i></span>
    <span>Twitter</span>
  </a>
</template>

<script>
  import firebase from 'firebase';

  export default {
    methods: {
      signIn() {
        let self = this;
        let provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
          let user = result.user;
          self.$emit('has-logged-in', user.email);
        })
      }
    }
  }
</script>

<style scoped>
  .button {
    background-color: #1DA1F2;
    border-color: #1DA1F2;
    color: #ffffff;
  }
</style>
