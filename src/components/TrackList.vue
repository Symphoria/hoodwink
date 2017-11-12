<template>
  <div id="backdrop">
    <div class="container">
      <div class="columns">
        <div class="column">
          <short-manga-card :manga-data="manga"  v-for="manga in mangaList[0]" :key="manga.id"></short-manga-card>
        </div>
        <div class="column">
          <short-manga-card :manga-data="manga"  v-for="manga in mangaList[1]" :key="manga.id"></short-manga-card>
        </div>
        <div class="column">
          <short-manga-card :manga-data="manga"  v-for="manga in mangaList[2]" :key="manga.id"></short-manga-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ShortMangaCard from '../components/ShortMangaCard.vue'
  import ajax from '../utilities/ajax'

  export default {
    components: {ShortMangaCard},
    data() {
      return {
        page: 1,
        hasNext: false,
        hasPrevious: false,
        totalPages: 0,
        mangaList: [[], [], []]
      }
    },
    mounted: function() {
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
      }).catch(error => {
        console.log(error.response);
      })
    },
    methods: {
      segmentList(mangaData) {
        this.mangaList= [[], [], []];
        let num = mangaData.length;
        let i = 0;

        for (i = 0; i < num; i++) {
          let col = i % 3;
          this.mangaList[col].push(mangaData[i]);
        }
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
</style>
