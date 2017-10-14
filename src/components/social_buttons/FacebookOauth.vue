<template>
  <a class="button is-medium" @click="signIn">
    <span class="icon"><i class="fa fa-facebook"></i></span>
    <span>Facebook</span>
  </a>
</template>

<script>
  import firebase from 'firebase';

  export default {
    methods: {
      signIn() {
        let self = this;
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
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
    background-color: #4267b2;
    border-color: #4267b2;
    color: #ffffff;
  }
</style>
