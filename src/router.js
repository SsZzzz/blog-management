import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/first',
          name: 'first',
          component: () => import('./views/subPages/First.vue')
        },
        {
          path: '/blog',
          name: 'blog',
          component: () => import('./views/subPages/Blog.vue')
        },
        {
          path: '/blogList',
          name: 'blogList',
          component: () => import('./views/subPages/BlogList.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('./views/subPages/Test.vue')
        }
      ]
    }
  ]
})
