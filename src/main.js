// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/store.js'// vuex
import VueRouter from 'vue-router'// router
import routes from './routers'// 引入路由配置
import vueResource from 'vue-resource'// http
import {Swipe, SwipeItem} from 'vue-swipe' // 轮播图
import vueTouch from 'vue-touch'// 手势触摸
// import infiniteScroll from 'vue-infinite-scroll'  // 引入滑动模块
import VueLazyload from 'vue-lazyload' // 引入图片懒加载模块
import './common/css/reset.css'
import './common/css/iconfont.css'
import './common/css/common.css'
import App from './App'
// 注册组件
// Vue.use(infiniteScroll)
Vue.use(vueTouch)
Vue.use(vueResource)
// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
  error: require('./assets/404.png'),
  loading: require('./assets/loading.gif'),
  attempt: 1
})
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
const router = new VueRouter({
  'linkActiveClass': 'active',
  routes
})
/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
}).$mount('#app')
