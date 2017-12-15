<template>
  <a class="button is-primary" @click="addBookmark">
    <i class="fa fa-bookmark" aria-hidden="true"></i>&nbsp;<slot></slot>
  </a>
</template>

<script>
  import ajax from '../../utilities/ajax'

  export default {
    props: ['mangaId', 'chapter'],
    data() {
      return {
        mangaID: this.mangaId,
        latestChapter: this.chapter
      }
    },
    methods: {
      addBookmark() {
        const self = this;
        this.$dialog.prompt({
          message: 'Enter the Chapter Number',
          inputAttrs: {
            type: 'number',
            placeholder: 'Chapter Number',
            value: self.latestChapter.toString(),
            min: 0
          },
          onConfirm: (value) => {
            ajax.post('bookmarks', {
              mangaId: this.mangaID,
              chapter: value
            }, {
              headers: {
                'Authentication-Token': localStorage.getItem('authToken')
              }
            }).then(() => {
              this.$emit('bookmark-updated', value);

              this.$toast.open({
                duration: 3000,
                message: 'Bookmark added to chapter ' + value,
                position: 'is-bottom',
                type: 'is-success'
              })
            }).catch(() => {
              this.$toast.open({
                duration: 3000,
                message: 'Oops! Something went wrong. Please try again later',
                position: 'is-bottom',
                type: 'is-danger'
              })
            })
          }
        })
      }
    },
    watch: {
      mangaId: function(newValue) {
        this.mangaID = newValue
      },
      chapter: function(newValue) {
        this.latestChapter = newValue
      }
    }
  }
</script>

<style scoped>

</style>
