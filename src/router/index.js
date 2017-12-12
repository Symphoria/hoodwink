import Vue from 'vue'
import Router from 'vue-router'
import Search from '../components/Search.vue'
import Register from '../components/Register.vue'
import Confirm from '../components/Confirm.vue'
import Login from '../components/Login.vue'
import TrackList from '../components/TrackList.vue'
import Bookmarks from '../components/Bookmarks.vue'

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
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/tracklist',
      name: 'tracklist',
      component: TrackList
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: Bookmarks
    }
  ]
})
