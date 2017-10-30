<template>
  <div class="box">
    <h2 id="name">{{ mangaData.title }}</h2>
    <div class="columns details">
      <div class="column is-3 cover">
        <img :src="coverUrl">
      </div>
      <div class="column is-9">
        <div class="columns">
          <div class="column is-9">
            <p><strong>Author: </strong>{{ getAuthor }}</p>
          </div>
          <div class="column is-3">
            <p style=""><strong>Year of release: </strong>{{ releaseYear }}</p>
          </div>
        </div>
        <div class="columns" style="margin-top: -1.5rem">
          <div class="column is-9">
            <p><strong>Artist: </strong>{{ getArtist }}</p>
          </div>
          <div class="column is-3">
            <p style=""><strong>Status: </strong>{{ status }}</p>
          </div>
        </div>
        <b-taglist>
          <b-tag type="is-dark" v-for="genre in getGenres" :key="genre.id">{{ genre }}</b-tag>
        </b-taglist>
        <p class="manga-info">{{ info }}</p>
        <p style="margin-top: 2%"><strong>Latest Chapter: </strong>{{ latestChapter }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import ajax from '../utilities/ajax'

  export default {
    props: ['mangaData'],
    data() {
      return {
        title: '',
        coverUrl: '',
        author: [],
        artist: [],
        releaseYear: 0,
        status: '',
        genres: [],
        info: '',
        latestChapter: 0,
        inTracklist: false
      }
    },
    computed: {
      getAuthor() {
        return JSON.parse(this.author).join();
      },
      getArtist() {
        return JSON.parse(this.artist).join();
      },
      getGenres() {
        return JSON.parse(this.genres);
      }
    },
    watch: {
      mangaData: function(newData) {
        this.title = newData.title;
        this.coverUrl = newData.cover_art_url;
        this.author = newData.author;
        this.artist = newData.artist;
        this.releaseYear = newData.year_of_release;
        this.status = newData.status;
        this.genres = newData.genres;
        this.info = newData.info;
        this.latestChapter = newData.latest_chapter;
        this.inTracklist = newData.inTrackList;
      }
    },
    beforeMount() {
      this.title = this.mangaData.title;
      this.coverUrl = this.mangaData.cover_art_url;
      this.author = this.mangaData.author;
      this.artist = this.mangaData.artist;
      this.releaseYear = this.mangaData.year_of_release;
      this.status = this.mangaData.status;
      this.genres = this.mangaData.genres;
      this.info = this.mangaData.info;
      this.latestChapter = this.mangaData.latest_chapter;
      this.inTracklist = this.mangaData.inTrackList;
    }
  }
</script>

<style scoped>
  #name {
    text-align: center;
    font-size: 2em;
  }

  .cover {
    text-align: center;
  }

  .details {
    margin-top: 3%;
  }

  .manga-info {
    font-family: 'Open Sans', "Helvetica Neue", sans-serif;
  }

  strong {
    font-family: 'Roboto', sans-serif;
  }

  .is-9 {
    font-family: 'Open Sans', "Helvetica Neue", sans-serif;;
  }

  .box {
    border: none;
    border-radius: 0;
    -webkit-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    margin-top: 3%;
    padding-bottom: 2.5%;
  }
</style>
