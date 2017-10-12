import Vue from 'vue'
import Router from 'vue-router'
import Search from '../components/Search.vue'
import Register from '../components/Register.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
