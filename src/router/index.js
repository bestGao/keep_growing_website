import { Modal } from 'ant-design-vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import { ACCESS_TOKEN } from '../store/mutation-types'
const routerHistory = createWebHistory()

function isAuthenticated() {
  const token = localStorage.getItem(ACCESS_TOKEN)
  return token
}

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
})

router.beforeEach((to, from, next) => {
  Modal.destroyAll()
  if (to.name !== 'Login' && !isAuthenticated()) next({ name: 'Login' })
  else next()
})

export default router
