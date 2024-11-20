import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 直接访问 localhost:5173/ 就会直接重定向到 login 登录页上
    {
      path: '/',
      redirect: '/oj/login',
    },
    {
      path: '/oj/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/oj/system',
      name: 'system',
      component: () => import('@/views/System.vue'),
      children: [
        {
          path: 'question',
          name: 'question',
          component: () => import('@/views/Question.vue')
        },
        {
          path: 'exam',
          name: 'exam',
          component: () => import('@/views/Exam.vue')
        },
        {
          path: 'cuser',
          name: 'cuser',
          component: () => import('@/views/Cuser.vue')
        }
      ]
    },
  ],
})


router.beforeEach((to, from, next) => {
  if (getToken()) {
    /* has token */
    if (to.path === '/oj/login') {
      next({path: '/oj/system/cuser'})
    } else {
      next()
    }
  } else {
    if (to.path !== '/oj/login') {
      next({
        path: '/oj/login'
      })
    } else {
      next()
    }
  }
})




export default router
