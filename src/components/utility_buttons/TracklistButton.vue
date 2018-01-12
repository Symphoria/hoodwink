<template>
  <a :class="{'button is-danger is-outlined': true, 'is-loading': trackListRequest}" v-if="trackList" @click="removeFromTrackList">
    Remove from TrackList
  </a>
  <a :class="{'button is-success': true, 'is-loading': trackListRequest}" v-else="trackList" @click="addToTrackList">
    <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Add to TrackList
  </a>
</template>

<script>
  import ajax from '../../utilities/ajax'

  export default {
    props: ['mangaId', 'inTrackList', 'status'],
    data() {
      return {
        trackList: this.inTrackList,
        trackListRequest: false,
        mangaID: this.mangaId,
        mangaStatus: this.status
      }
    },
    methods: {
      addToTrackList() {
        if (localStorage.getItem('authToken') !== null) {
          if (this.mangaStatus == "ongoing") {
            this.sendAddRequest();
          } else {
            this.$dialog.confirm({
              title: 'Are you sure?',
              message: `The manga you want to add to your tracklist is completed meaning the manga will most 
                        likely not receive any new chapters. Are you sure you still want to add it in your
                        tracklist?`,
              cancelText: 'No',
              confirmText: "Yes, I'm sure",
              type: 'is-success',
              onConfirm: () => this.sendAddRequest()
            })
          }
        } else {
          this.$snackbar.open({
            duration: 9000,
            message: 'Looks like you are not logged in. Please login and try again',
            type: 'is-warning',
            position: 'is-bottom-right'
          })
        }
      },
      sendAddRequest() {
        this.trackListRequest = true;

        ajax.post('tracklist', {
          mangaId: this.mangaID
        }, {
          headers: {
            'Authentication-Token': localStorage.getItem('authToken')
          }
        }).then(() => {
          this.trackListRequest = false;
          this.trackList = true;

          this.$toast.open({
            duration: 4000,
            message: 'Manga Added to TrackList',
            position: 'is-bottom',
            type: 'is-success'
          })
        }).catch(() => {
          this.trackListRequest = false;

          this.$toast.open({
            duration: 3000,
            message: 'Oops! Something went wrong. Please try again later',
            position: 'is-bottom',
            type: 'is-danger'
          })
        })
      },
      removeFromTrackList() {
        this.trackListRequest = true;

        ajax.delete('tracklist', {
          headers: {
            'Authentication-Token': localStorage.getItem('authToken')
          },
          data: {
            mangaId: this.mangaID
          }
        }).then(response => {
          this.trackListRequest = false;
          this.trackList = false;

          this.$toast.open({
            duration: 3000,
            message: response.data.message,
            position: 'is-bottom',
            type: 'is-success'
          })
        }).catch(() => {
          this.trackListRequest = false;

          this.$toast.open({
            duration: 4000,
            message: 'Oops! Something went wrong. Please try again later',
            position: 'is-bottom',
            type: 'is-danger'
          })
        })
      }
    },
    watch: {
      mangaId: function(newVal) {
        this.mangaID = newVal;
        this.trackList = this.inTrackList
        this.mangaStatus = this.status
      }
    }
  }
</script>

<style scoped>
  .is-success {
    background-color: #27AE60;
  }
</style>
