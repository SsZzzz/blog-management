import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import '@/assets/css/animate.css'
import '@/assets/css/normalize.css'
import '@/assets/css/base.scss'
import api from './api/api.js'

Vue.config.productionTip = false
Vue.prototype.$api=api

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
