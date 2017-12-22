<template>
  <div class="box">
    <img :src="coverUrl" alt="Cover Art">
    <h2 id="name">{{ title }}</h2>
    <p class="updated"><strong>Bookmark at : </strong>Chapter {{ chapter }}</p>
    <div class="columns is-mobile">
      <div class="column">
        <bookmark-button :manga-id="mangaId" :chapter="mangaData.latest_chapter"
                         @bookmark-updated="(value) => this.chapter = value">Update</bookmark-button>
      </div>
      <div class="column">
        <a :class="{'button is-danger is-outlined': true, 'is-loading': bookmarkRequest}" @click="removeBookmark">
          Remove
        </a>
      </div>
      <div class="column">
        <a class="button is-info" :href="getChapterUrl" target="_blank">Read</a>
      </div>
    </div>
  </div>
</template>

<script>
  import ajax from '../utilities/ajax'
  import BookmarkButton from './utility_buttons/BookmarkButton'

  export default {
    name: "bookmark-card",
    props: ['mangaData'],
    components: { BookmarkButton },
    data() {
      return {
        title: '',
        coverUrl: '',
        chapter: 0,
        mangaUrl: '',
        mangaId: '',
        bookmarkRequest: false
      }
    },
    computed: {
      getChapterUrl() {
        return this.mangaUrl + "/" + this.chapter;
      }
    },
    methods: {
      removeBookmark() {
        this.bookmarkRequest = true;

        ajax.delete('bookmarks', {
          headers: {
            'Authentication-Token': localStorage.getItem('authToken')
          },
          data: {
            mangaId: this.mangaId
          }
        }).then(response => {
          this.bookmarkRequest = false;

          this.$toast.open({
            duration: 3000,
            message: response.data.message,
            position: 'is-bottom',
            type: 'is-success'
          });

          this.$emit('removed-manga');
        }).catch(() => {
          this.bookmarkRequest = false;

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
      mangaData: function (newData) {
        this.title = newData.title;
        this.coverUrl = newData.cover_art_url;
        this.mangaUrl = newData.manga_url;
        this.mangaId = newData.manga_id;
        this.chapter = newData.chapter;
      }
    },
    mounted: function () {
      this.title = this.mangaData.title;
      this.coverUrl = this.mangaData.cover_art_url;
      this.mangaUrl = this.mangaData.manga_url;
      this.mangaId = this.mangaData.manga_id;
      this.chapter = this.mangaData.chapter;
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
