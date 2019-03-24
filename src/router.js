import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home/index.vue'
import Essay from './views/Article/index.vue'
import Write from './views/Article/write.vue'
import Frontend from './views/Article/frontend.vue'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [
        { path: '', name: 'Home', component: Home },
        { path: '/article/essay', name: 'Essay', component: Essay },
        { path: '/article/write', name: 'Write', component: Write },
        { path: '/article/frontend', name: 'Frontend', component: Frontend }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!(localStorage.getItem('sanmiToken'))
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
