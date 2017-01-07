import Vue from 'vue'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'

import App from './App'

import header from './components/header'
import sidebar from './components/sidebar'
import error404 from './components/error404'

import Home from './components/Home'
import anchors from './components/anchors'
import exchange from './components/exchange'
import login from './components/login'


Vue.use(vueRouter);
Vue.use(vueResource);

const routes = [
    {
        path: '/',
        components: {
            default: App,
            header: header,
            sidebar: sidebar
        },
        children:
        [
            {path: '/', name: 'home', component: Home},
            {path: '/exchange', name: 'exchange', component: exchange},
            {path: '/anchors', name: 'anchors', component: anchors},
        ]
    },
    {
        path: '/login',
        components: {
            default: login,
            header: '',
            sidebar: ''
        }
    },
    { path: '*', component: error404 }

// ,
// {
//   path : '/time-entries',
//   component : TimeEntries,
//   children : [{
//     path : 'log-time',
//     // 懒加载
//     component : resolve => require(['./components/LogTime.vue'],resolve),
//   }]
// }
]

const router = new vueRouter({
  routes,
  linkActiveClass: 'active',
  history: true
})

router.beforeEach(function (to,from,next) {
  var userMsg = sessionStorage.Keypair;
  if(to.path === '/' || to.path === '/#/'){
    if(!userMsg){
      next({ path: '/login' })
    }
  }
  next()
})

/* eslint-disable no-new */
 new Vue({
  el: '#app',
  router,
  // store,
  ...App,
})
