import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register')
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: () => import('./components/BasicLayout'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('./views/Home'),
          meta: {
            keepAlive: false
          }
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!(localStorage.getItem('sanmiToken'))
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    if (isLogin) {
      localStorage.setItem('defaultKeys', to.path)
      next()
    } else {
      localStorage.removeItem('defaultKeys')
      next('/login')
    }
  }
})

export default router
