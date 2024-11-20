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

/**
 * to => login 页面 跳转到 system 页面，to 就是 system
 * from => 上面的例子 from 就是 login
 * to 目标地址，from 是起始地址
 * next: 表示是否要往下执行，执行的方式是怎样的，是一个函数
 */
router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 进到这里说明是有 token 的，未过期
    /* has token */
    if (to.path === '/oj/login') {
      // 有 token 就不用进登录页面了，直接去主页
      next({
        path: '/oj/system'
      })
    } else {
      next()
    }
  } else {
    // 没有 token 又不在登陆页就跳转
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
