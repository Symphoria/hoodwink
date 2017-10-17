<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <transition appear name="fade">
        <h3 id="search-heading">Search Manga</h3>
      </transition>
      <transition appear name="slide-fade">
        <b-field id="search-input">
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
                  <b-taglist style="font-family: 'Roboto', sans-serif; margin-top: 2%">
                    <b-tag type="is-dark" v-for="genre in props.option.genres">{{ genre }} </b-tag>
                  </b-taglist>
                </div>
              </div>
            </template>
          </b-autocomplete>
        </b-field>
      </transition>
    </div>
  </div>
</template>

<script>
  import BAutocomplete from "../../node_modules/buefy/src/components/autocomplete/Autocomplete.vue";
  import BField from "../../node_modules/buefy/src/components/field/Field.vue";
  import debounce from 'lodash.debounce'
  import axios from 'axios'
  import BTaglist from "../../node_modules/buefy/src/components/tag/Taglist.vue";

  export default {
    components: {
      BTaglist,
      BField, BAutocomplete
    },
    data() {
      return {
        title: '',
        mangaData: [],
        isFetching: false,
        selected: null,
        isFocused: false
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
            return status < 400; // Reject only if the status code is greater than or equal to 500
          }
        }).then(response => {
          response.data.forEach(item => self.mangaData.push(item));
          self.isFetching = false;
          console.log(response.data);
        }).catch(error => {
          self.isFetching = false;
          console.log(error);
        })
      }, 400),
      selectManga(option) {
        this.selected = option;
      }
    }
  }
</script>

<style scoped>
  .columns {
    background: linear-gradient(to left, #B24592, #F15F79);
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 2%;
    height: 100%;
  }

  #search-heading {
    font-family: "Lato", "Helvetica Neue", sans-serif;
    color: #ffffff;
    font-weight: 300;
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 1%;
  }

  #search-input {
    font-family: "Lato", "Helvetica Neue", sans-serif;
    font-weight: 300;
  }

  .media-content {
    font-size: 1.5em;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-enter
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
