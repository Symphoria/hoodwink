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
            <p><strong>Year of release: </strong>{{ releaseYear }}</p>
          </div>
        </div>
        <div class="columns" style="margin-top: -1.5rem">
          <div class="column is-9">
            <p><strong>Artist: </strong>{{ getArtist }}</p>
          </div>
          <div class="column is-3">
            <p><strong>Status: </strong>{{ status }}</p>
          </div>
        </div>
        <b-taglist>
          <b-tag type="is-dark" v-for="genre in getGenres" :key="genre.id">{{ genre }}</b-tag>
        </b-taglist>
        <p class="manga-info">{{ info }}</p>
        <p style="margin-top: 2%"><strong>Latest Chapter: </strong>{{ latestChapter }}</p>
        <div class="columns" style="margin-top: 2%">
          <div class="column">
            <div class="field is-grouped is-grouped-left">
              <p class="control">
                <track-list-button :manga-id="mangaId" :in-track-list="inTracklist"></track-list-button>
              </p>
              <p class="control">
                <bookmark-button :manga-id="mangaId" :chapter="latestChapter">Add Bookmark</bookmark-button>
              </p>
            </div>
          </div>
          <div class="column">
            <div class="field is-grouped is-grouped-right">
              <p class="control" style="width: 100%;">
                <a class="button read" :href="mangaUrl" target="_blank">Read</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ajax from '../utilities/ajax'
  import TrackListButton from './utility_buttons/TracklistButton.vue'
  import BookmarkButton from './utility_buttons/BookmarkButton.vue'

  export default {
    components: {TrackListButton, BookmarkButton},
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
        inTracklist: false,
        mangaId: '',
        mangaUrl: ''
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
      mangaData: function (newData) {
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
        this.mangaId = newData.mangaId;
        this.mangaUrl = newData.manga_url
      }
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
    margin-bottom: 2%;
  }

  .read {
    background-color: #F15F79;
    width: 100%;
    color: white;
    border: none;
  }
</style>
