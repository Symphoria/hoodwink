// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import * as firebase from "firebase"

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAcMEhTyrVOaMF8FuK60QUKEDg4wrMthqw",
  authDomain: "hoodwink-app.firebaseapp.com",
  databaseURL: "https://hoodwink-app.firebaseio.com",
  projectId: "hoodwink-app",
  storageBucket: "",
  messagingSenderId: "542945286108"
};

firebase.initializeApp(config);

Vue.use(Buefy);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
