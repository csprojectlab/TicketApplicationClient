import Vue from 'vue'
import Router from 'vue-router'
import Authentication from '@/components/authenticate/Authentication'
import HelloWorld from '@/components/HelloWorld'
import * as Auth from '@/components/authenticate'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { requiredAuth: true }
    },
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    }
  ]
})

router.beforeEach((to, _, next) => {
  if(to.meta.requiredAuth) {
      if(Auth.default.user.authenticated) 
        next()
      else
        router.push('/login')
  } else next()
})

export default router
