<template>
  <a :class="{'button is-danger': true, 'is-loading': trackListRequest}" v-if="trackList" @click="removeFromTrackList">
    Remove from TrackList
  </a>
  <a class="button is-success" v-else @click="addToTrackList">Add to TrackList</a>
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

        ajax.post('tracklist', {
          mangaId: this.mangaId
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
            mangaId: this.mangaId
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
      mangaId: function(newValue) {
        this.mangaID = newValue;
      },
      inTrackList: function(newValue) {
        this.trackList = newValue;
      }
    }
  }
</script>

<style scoped>
  .is-success {
    background-color: #27AE60;
  }
</style>
