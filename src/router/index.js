import Vue from 'vue'
import Router from 'vue-router'
const Search = () => import('../components/Search.vue');
const Register = () => import('../components/Register.vue');
const Confirm = () => import('../components/Confirm.vue');
const Login = () => import('../components/Login.vue');
const TrackList = () => import('../components/TrackList.vue');
const Bookmarks = () => import('../components/Bookmarks.vue');
const MyAccount = () => import('../components/MyAccount.vue');
const ForgetPassword = () => import('../components/ForgetPassword.vue');
const About = () => import('../components/About');
const Home = () => import('../components/Home');

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '*',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/about',
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
