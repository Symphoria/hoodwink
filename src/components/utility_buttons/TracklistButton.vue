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
    props: ['mangaId', 'inTrackList'],
    data() {
      return {
        trackList: this.inTrackList,
        trackListRequest: false,
        mangaID: this.mangaId
      }
    },
    methods: {
      addToTrackList() {
        this.trackListRequest = true;

        if (localStorage.getItem('authToken') !== null) {
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
        } else {
          this.$router.replace({name: 'login'})
        }
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
      }
    }
  }
</script>

<style scoped>
  .is-success {
    background-color: #27AE60;
  }
</style>
