import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' //样式文件
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import '@/assets/css/animate.css'
import '@/assets/css/normalize.css'
import '@/assets/css/base.scss'
import api from './api/api.js'

Vue.config.productionTip = false
Vue.prototype.$api = api

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
