<template>
  <div id="backdrop">
    <div class="container" style="min-height: calc(100vh - 70px);">
      <transition appear name="fade">
        <div>
          <p class="header" style="font-size: 3.5em">Bookmarks</p>
          <p class="header" style="font-size: 1.5em">View all your bookmarked manga here</p>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="columns" v-if="bookmarksReady">
          <div class="column">
            <short-manga-card :manga-data="manga" v-for="manga in mangaList[0]" :key="manga.id"
                              @removed-manga="refresh"></short-manga-card>
          </div>
          <div class="column">
            <short-manga-card :manga-data="manga" v-for="manga in mangaList[1]" :key="manga.id"
                              @removed-manga="refresh"></short-manga-card>
          </div>
          <div class="column">
            <short-manga-card :manga-data="manga" v-for="manga in mangaList[2]" :key="manga.id"
                              @removed-manga="refresh"></short-manga-card>
          </div>
        </div>
      </transition>
      <div v-if="!bookmarksReady">
          <p class="header fetching">Fetching your bookmarks...</p>
        </div>
      <nav class="pagination is-centered">
        <a :class="{'pagination-previous': true, 'is-disabled': !hasPrevious}" @click="prevPage">Previous</a>
        <a :class="{'pagination-next': true, 'is-disabled': !hasNext}" @click="nextPage">Next Page</a>
      </nav>
    </div>
    <div class="my-footer is-size-7-mobile">
      <p id="footer-made">
        Made by Harshit Jain (<a href="https://github.com/Symphoria" target="_blank" rel="noopener"
                                 style="color: #80deea;">@Symphoria</a>) with
        <i class="fa fa-laptop" aria-hidden="true"></i>,
        <i class="fa fa-wifi" aria-hidden="true"></i> and
        <i class="fa fa-heart" aria-hidden="true"></i>
      </p>
      <p>Learn more
        <router-link to="/about" style="color: #80deea;">about</router-link> me, or better
        <router-link to="/about" style="color: #80deea;">contact</router-link> me.
      </p>
    </div>
  </div>
</template>

<script>
  import ShortMangaCard from './BookmarkCard.vue'
  import ajax from '../utilities/ajax'

  export default {
    components: {ShortMangaCard},
    data() {
      return {
        page: 1,
        hasNext: false,
        hasPrevious: false,
        totalPages: 0,
        mangaList: [[], [], []],
        bookmarksReady: false
      }
    },
    mounted: function () {
      this.refresh();
    },
    methods: {
      refresh() {
        this.bookmarksReady = false;

        ajax.get('bookmarks', {
          params: {
            page: this.page
          },
          headers: {
            'Authentication-Token': localStorage.getItem('authToken')
          }
        }).then(response => {
          this.hasNext = response.data.hasNext;
          this.hasPrevious = response.data.hasPrevious;
          this.totalPages = response.data.totalPages;
          this.segmentList(response.data.mangaData);
          this.bookmarksReady = true;
        }).catch(error => {
          console.log(error.response);
        })
      },
      segmentList(mangaData) {
        this.mangaList = [[], [], []];
        let num = mangaData.length;
        let i = 0;

        for (i = 0; i < num; i++) {
          let col = i % 3;
          this.mangaList[col].push(mangaData[i]);
        }
      },
      nextPage() {
        this.page += 1;
        this.refresh();
      },
      prevPage() {
        this.page -= 1;
        this.refresh();
      }
    }
  }
</script>

<style scoped>
  #backdrop {
    background: linear-gradient(to left, #B24592, #F15F79);
    margin-left: 0;
    margin-right: 0;
    /*margin-top: 0.9%;*/
    padding-left: 0.5%;
    padding-right: 0.5%;
    /* height: 100%;
    overflow-x: hidden;
    overflow-y: visible; */
  }

  .columns {
    margin-top: 2%;
  }

  .header {
    font-family: "Lato", "Helvetica Neue", sans-serif;
    color: #ffffff;
    text-align: center;
    font-weight: 100;
  }

  .fetching {
    font-size: 1.6em;
    margin-top: 15%;
    margin-bottom: 15%;
  }

  .pagination-next {
    color: white;
    border-radius: 0;
  }

  .pagination-previous {
    color: white;
    border-radius: 0;
  }

  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .5s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(20px);
    opacity: 0;
  }

  .fade-enter-active {
    transition: all .5s ease;
  }

  .fade-enter {
    opacity: 0;
  }
</style>
