<template>
  <div class="box">
    <img :src="coverUrl">
    <h2 id="name">{{ title }}</h2>
    <p class="updated" v-text="getUserFriendlyDate"></p>
    <div class="columns is-mobile">
      <div class="column">
        <a :class="{'button is-danger': true, 'is-loading': trackListRequest}" @click="removeFromTrackList">
          Remove
        </a>
      </div>
      <div class="column">
        <a class="button is-info" :href="mangaUrl" target="_blank">Read</a>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import ajax from '../utilities/ajax'

  export default {
    props: ['mangaData'],
    data() {
      return {
        title: '',
        lastUpdated: '',
        coverUrl: '',
        mangaUrl: '',
        mangaId: '',
        trackListRequest: false
      }
    },
    computed: {
      getUserFriendlyDate() {
        return moment(this.lastUpdated).format('MMMM Do YYYY, h:mm a')
      }
    },
    watch: {
      mangaData: function (newData) {
        this.title = newData.title;
        this.lastUpdated = newData.last_updated;
        this.coverUrl = newData.cover_art_url;
        this.mangaUrl = newData.manga_url;
        this.mangaId = newData.manga_id;
      }
    },
    methods: {
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
          });

          this.$emit('removed-manga');
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
    mounted: function () {
      this.title = this.mangaData.title;
      this.lastUpdated = this.mangaData.last_updated;
      this.coverUrl = this.mangaData.cover_art_url;
      this.mangaUrl = this.mangaData.manga_url;
      this.mangaId = this.mangaData.manga_id;
    }
  }
</script>

<style scoped>
  .box {
    text-align: center;
    border: none;
    border-radius: 0;
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
  }

  #name {
    font-size: 1.5em;
    font-weight: 600;
  }

  .updated {
    margin-top: 2%;
  }

  .columns {
    margin-top: 4%;
    text-align: center;
  }

  .button {
    width: 100%;
  }
</style>
