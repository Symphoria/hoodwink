<template>
  <div id="backdrop">
    <div style="min-height: calc(100vh - 70px);">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <transition appear name="fade">
            <h3 id="search-heading">Search Manga</h3>
          </transition>
          <transition appear name="slide-fade">
            <b-field>
              <b-autocomplete placeholder="Eg. Haikyu!!" v-model="title" :data="mangaData" field="name"
                              :loading="isFetching" @input="getData" @select="selectManga">
                <template scope="props">
                  <div class="media">
                    <div class="media-left">
                      <img width="64" :src="props.option.cover">
                    </div>
                    <div class="media-content">
                      {{ props.option.name }}
                      <br>
                      <b-taglist style="font-family: 'Roboto', sans-serif; margin-top: 1.5%">
                        <b-tag type="is-dark" v-for="genre in props.option.genres" :key="genre.id">{{ genre }}</b-tag>
                      </b-taglist>
                    </div>
                  </div>
                </template>
              </b-autocomplete>
            </b-field>
          </transition>
        </div>
      </div>
      <transition name="slide-fade">
        <div class="columns" v-show="showManga">
          <div class="column is-10 is-offset-1">
            <manga-box :manga-data="mangaBoxData"></manga-box>
          </div>
        </div>
      </transition>
      <transition name="searching" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <p class="searching" v-show="isSearching">Searching...</p>
      </transition>
    </div>
    <div class="my-footer is-size-7-mobile">
      <p id="footer-made">
        Made by Harshit Jain (<a href="https://github.com/Symphoria" target="_blank"
                                 style="color: #80deea;">@Symphoria</a>) with
        <i class="fa fa-laptop" aria-hidden="true"></i>,
        <i class="fa fa-wifi" aria-hidden="true"></i> and
        <i class="fa fa-heart" aria-hidden="true"></i>
      </p>
      <p>Learn more about me, or better contact me.</p>
    </div>
  </div>
</template>

<script>
  import BAutocomplete from "../../node_modules/buefy/src/components/autocomplete/Autocomplete.vue";
  import BField from "../../node_modules/buefy/src/components/field/Field.vue";
  import debounce from 'lodash.debounce'
  import axios from 'axios'
  import ajax from '../utilities/ajax'
  import BTaglist from "../../node_modules/buefy/src/components/tag/Taglist.vue";
  import BTag from "../../node_modules/buefy/src/components/tag/Tag.vue";
  import MangaBox from "../components/MangaBox.vue";

  export default {
    components: {
      BTag,
      BTaglist,
      BField, BAutocomplete, MangaBox
    },
    data() {
      return {
        title: '',
        mangaData: [],
        isFetching: false,
        isFocused: false,
        searchDown: false,
        showManga: false,
        mangaBoxData: {},
        isSearching: false,
        mangaId: ''
      }
    },
    methods: {
      getData: debounce(function () {
        let self = this;
        this.mangaData = [];
        this.isFetching = true;

        axios.get('https://doodle-manga-scraper.p.mashape.com/mangareader.net/search', {
          params: {
            cover: 1,
            info: 0,
            l: 5,
            q: self.title
          },
          headers: {
            'X-Mashape-Key': '0scVXX9O09msh51PWISWbEzSK0nDp1PU7hkjsn8T3ddvspu36f'
          },
          validateStatus: function (status) {
            return status < 400; // Reject only if the status code is greater than or equal to 400
          }
        }).then(response => {
          response.data.forEach(item => self.mangaData.push(item));
          self.isFetching = false;
        }).catch(() => {
          self.isFetching = false;
        })
      }, 300),
      selectManga(option) {
        this.showManga = false;
        let headersObj = {};

        if (localStorage.getItem('authToken') !== null) {
          headersObj = {
            'Authentication-Token': localStorage.getItem('authToken')
          }
        }

        ajax.get('manga', {
          params: {
            mangaId: option.mangaId
          },
          headers: headersObj
        }).then(response => {
          this.mangaBoxData = response.data;
          this.mangaBoxData.mangaId = option.mangaId;
          this.isSearching = false;
          this.showManga = true;
        }).catch(error => {
          console.log(error.response);
        });

        this.isSearching = true;
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
    /*height: 95%;*/
    min-height: calc(100vh - 70px);
    overflow-x: hidden;
    overflow-y: visible;
  }

  #search-heading {
    font-family: "Lato", "Helvetica Neue", sans-serif;
    color: #ffffff;
    font-weight: 300;
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 1%;
  }

  .media-content {
    font-size: 1.5em;
  }

  .searching {
    text-align: center;
    color: white;
    font-size: 2em;
    font-weight: 300;
    margin: 15%;
    font-family: "Lato", "Helvetica Neue", sans-serif;
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
