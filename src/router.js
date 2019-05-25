import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      path: '*',
      name: '404',
      component: () => import('./views/NoFound')
    },
    // {
    //   path: '/',
    //   redirect: '/index'
    // },
    {
      path: '/',
      redirect: '/profile'
    },
    {
      path: '/profile',
      component: () => import('./components/BasicLayout'),
      children: [
        {
          path: '',
          name: 'Profile',
          component: () => import('./views/Profile'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/article',
          name: 'Frontend',
          component: () => import('./views/Article'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/life/book',
          name: 'Book',
          component: () => import('./views/Life/book'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/life/music',
          name: 'Music',
          component: () => import('./views/Life/music'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/life/movie',
          name: 'Movie',
          component: () => import('./views/Life/movie'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/personal',
          name: '/Personal',
          component: () => import('./views/Personal'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/write/:id',
          name: 'Write',
          component: () => import('./views/Write'),
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
