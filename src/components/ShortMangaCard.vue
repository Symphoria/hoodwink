<template>
  <div class="box">
    <img src="http://s2.mangareader.net/cover/yahari-ore-no-seishun-rabukome-wa-machigatte-iru-mougenroku/yahari-ore-no-seishun-rabukome-wa-machigatte-iru-mougenroku-l0.jpg">
    <h2 id="name">Yahari Ore no Seishun Rabukome wa Machigatte Iru</h2>
    <p class="updated">November 10th 2017, 8:09 pm</p>
    <div class="columns is-mobile">
      <div class="column">
        <a class="button is-danger">Remove</a>
      </div>
      <div class="column">
        <a class="button is-info">Read</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
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
