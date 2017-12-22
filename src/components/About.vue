<template>
  <div id="backdrop">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <transition appear name="slide-fade">
          <div class="box">
            <center>
              <figure><img src="../assets/me.png" alt="Me"></figure>
            </center>
            <p class="name">Harshit Jain</p>
            <p style="text-align: center; color: darkslategray; font-size: 1.5em; margin-bottom: 1%">( Symphoria )</p>
            <p><br>Yep, that's me. I usually go by the name
              <a href="https://github.com/Symphoria" target="_blank" rel="noopener">Symphoria</a>
              on the internet. I am an undergrad at IIIT Allahabad, pursuing my bachelors in Information Technology.<br>
              <br>I like to call myself a learner as a learner is not scared to break things and dares to push forward
              even after screwing up multiple times, a quality which I think is pivotal for any programmer. A learner is
              never afraid to embark on any learning endeavor and one of many of my such endeavors led to
              Hoodwink.<br><br>
              I like listening to music. Actually, I like music so much that I even play music (I am a guitarist). And
              as
              you might have guessed, I love anime and manga.<br><br>If you found any bugs or have any kind of feedback
              regarding Hoodwink, I would love to hear about it. Or if you just want to talk about music, anime, tech,
              code or life in general, you can find me on
              <a href="https://www.facebook.com/harshit.jain.37604303" target="_blank" rel="noopener">Facebook</a>,
              <a href="https://twitter.com/harshit_jain_98" target="_blank" rel="noopener">Twitter</a>,
              <a href="https://github.com/Symphoria" target="_blank" rel="noopener">Github</a> and
              <a href="https://medium.com/@Symphoria" target="_blank" rel="noopener">Medium</a>. Or you can email me at
              <strong>hj.harshit007@gmail.com</strong>
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about"
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
    height: 95%;
    overflow-x: hidden;
    overflow-y: visible;
  }

  .box {
    margin-top: 5%;
    -webkit-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    margin-bottom: 5%;
  }

  img {
    width: auto;
    border-radius: 50%;
  }

  .name {
    text-align: center;
    color: #F15F79;
    font-family: "Lato", "Helvetica Neue", sans-serif;
    font-weight: 300;
    margin-top: 1%;
    font-size: 2.6em;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-enter
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(15px);
    opacity: 0;
  }
</style>
