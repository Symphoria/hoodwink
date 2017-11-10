<template>
  <div id="backdrop">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <short-manga-card></short-manga-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ShortMangaCard from '../components/ShortMangaCard.vue'

  export default {
    components: {ShortMangaCard}
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
