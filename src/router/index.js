import Vue from 'vue'
import Router from 'vue-router'
import Authentication from '@/components/authenticate/Authentication'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    }
  ]
})

export default router
