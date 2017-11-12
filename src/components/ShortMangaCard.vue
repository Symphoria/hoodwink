<template>
  <div class="box">
    <img :src="coverUrl">
    <h2 id="name">{{ title }}</h2>
    <p class="updated" v-text="getUserFriendlyDate"></p>
    <div class="columns is-mobile">
      <div class="column">
        <a class="button is-danger">Remove</a>
      </div>
      <div class="column">
        <a class="button is-info" :href="mangaUrl">Read</a>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: ['mangaData'],
    data() {
      return {
        title: '',
        lastUpdated: '',
        coverUrl: '',
        mangaUrl: '',
        mangaId: ''
      }
    },
    computed: {
      getUserFriendlyDate() {
        return moment(this.lastUpdated).format('MMMM Do YYYY, h:mm a')
      }
    },
    watch: {
      mangaData: function(newData) {
        this.title = newData.title;
        this.lastUpdated = newData.last_updated;
        this.coverUrl = newData.cover_art_url;
        this.mangaUrl = newData.manga_url;
        this.mangaId = newData.manga_id;
      }
    },
    mounted: function() {
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
