import Vue from 'vue'
import Router from 'vue-router'
import Search from '../components/Search.vue'
import Register from '../components/Register.vue'
import Confirm from '../components/Confirm.vue'

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
    },
    {
      path: '/confirm/:confirmToken',
      name: 'confirm',
      component: Confirm
    }
  ]
})
