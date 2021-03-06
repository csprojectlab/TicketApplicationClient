import Vue from 'vue'
import Router from 'vue-router'
import Authentication from '@/components/authenticate/Authentication'
import Dashboard from '@/components/dashboard/Dashboard'
import AddTicket from '@/components/ticket/AddTicket'
import ViewTicket from '@/components/ticket/ViewTicket'
import DetailTicket from '@/components/ticket/TicketDetail'
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
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiredAuth: true }
    },
    {
      path: '/addticket',
      name: 'AddTicket',
      component: AddTicket,
      meta: { requiredAuth: true }
    },
    {
      path: '/viewticket',
      name: 'ViewTicket',
      component: ViewTicket,
      meta: { requiredAuth: true}
    },
    {
      path: '/ticketdetail',
      name: 'DetailTicket',
      component: DetailTicket,
      meta: { requiredAuth: false }
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
