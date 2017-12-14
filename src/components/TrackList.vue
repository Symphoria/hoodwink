<template>
  <div id="backdrop">
    <div class="container">
      <transition appear name="fade">
        <div>
          <p class="header" style="font-size: 3.5em">Tracklist</p>
          <p class="header" style="font-size: 1.5em">View all your tracklisted manga here</p>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="columns" v-if="trackListReady">
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
      <nav class="pagination is-centered">
        <a :class="{'pagination-previous': true, 'is-disabled': !hasPrevious}" @click="prevPage">Previous</a>
        <a :class="{'pagination-next': true, 'is-disabled': !hasNext}" @click="nextPage">Next Page</a>
      </nav>
    </div>
  </div>
</template>

<script>
  import ShortMangaCard from './TrackListCard.vue'
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
        trackListReady: false
      }
    },
    mounted: function () {
      this.refresh();
    },
    methods: {
      refresh() {
        this.trackListReady = false;

        ajax.get('tracklist', {
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
          this.trackListReady = true;
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
    padding-bottom: 2%;
    padding-left: 0.5%;
    padding-right: 0.5%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: visible;
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
