<template>
  <a class="button is-danger is-outlined" @click="confirmDelete"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp
    Delete Account
  </a>
</template>

<script>
  import ajax from "../../utilities/ajax"

  export default {
    methods: {
      confirmDelete() {
        this.$dialog.confirm({
          title: 'Deleting account',
          message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
          confirmText: 'Delete Account',
          type: 'is-danger',
          onConfirm: () => {
            ajax.delete('users', {
              headers: {
                'Authentication-Token': localStorage.getItem('authToken')
              }
            }).then(() => {
              this.$toast.open('Account deleted!');
              this.$emit('logged-out')
            });
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
