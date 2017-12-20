import Vue from 'vue'
import Router from 'vue-router'
import Search from '../components/Search.vue'
import Register from '../components/Register.vue'
import Confirm from '../components/Confirm.vue'
import Login from '../components/Login.vue'
import TrackList from '../components/TrackList.vue'
import Bookmarks from '../components/Bookmarks.vue'
import MyAccount from '../components/MyAccount'
import ForgetPassword from '../components/ForgetPassword'
import About from '../components/About'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
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
      component: TrackList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: Bookmarks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: MyAccount,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/forgot-password/:activationToken',
      name: 'forgot-password',
      component: ForgetPassword
    },
    {
      path: 'about',
      name: 'about',
      component: About
    }
  ]
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  let tokenPresent = localStorage.getItem('authToken') !== null;

  if (!requiresAuth || (requiresAuth && tokenPresent)) {
    next()
  } else {
    next('login')
  }
});

export default router
