<template>
  <a class="button is-white" @click="promptEmail">Forgot Password?</a>
</template>

<script>
  import ajax from '../../utilities/ajax'

  export default {
    name: "forget-password-button",
    methods: {
      promptEmail() {
        this.$dialog.prompt({
          title: 'Forget Password',
          message: 'Please enter your email address below to receive your password reset instructions',
          confirmText: 'Send',
          inputAttrs: {
            type: 'email',
            placeholder: 'Enter your email'
          },
          onConfirm: (value) => {
            ajax.put('forget-password', {
              email: value
            }).then(response => {
              this.$snackbar.open({
                duration: 5000,
                message: response.data.message
              })
            }).catch(error => {
              this.$snackbar.open({
                duration: 5000,
                message: error.response.data.message,
                type: 'is-danger',
                position: 'is-bottom-left',
                actionText: 'Ok'
              })
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .button {
    font-size: 0.9em;
    color: gray;
    margin-bottom: 2%;
  }
</style>
