import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Main from '../views/Main.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'Login',
    meta: { isPublic: true },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
    children: [
      { path: '/categories/edit/:id', component: () => import(/* webpackChunkName: "categoryEdit" */ '../views/CategoryEdit.vue'), props: true },
      { path: '/categories/create', component: () => import(/* webpackChunkName: "categoryEdit" */ '../views/CategoryEdit.vue')},
      { path: '/categories/list', component: () => import(/* webpackChunkName: "categoryList" */ '../views/CategoryList.vue') },
      { path: '/items/edit/:id', component: () => import(/* webpackChunkName: "itemEdit" */ '../views/ItemEdit.vue'), props: true },
      { path: '/items/create', component: () => import(/* webpackChunkName: "itemEdit" */ '../views/ItemEdit.vue')},
      { path: '/items/list', component: () => import(/* webpackChunkName: "itemList" */ '../views/ItemList.vue') },
      { path: '/heros/edit/:id', component: () => import(/* webpackChunkName: "heroEdit" */ '../views/HeroEdit.vue'), props: true },
      { path: '/heros/create', component: () => import(/* webpackChunkName: "heroEdit" */ '../views/HeroEdit.vue')},
      { path: '/heros/list', component: () => import(/* webpackChunkName: "heroList" */ '../views/HeroList.vue') },
      { path: '/articles/edit/:id', component: () => import(/* webpackChunkName: "articleEdit" */ '../views/ArticleEdit.vue'), props: true },
      { path: '/articles/create', component: () => import(/* webpackChunkName: "articleEdit" */ '../views/ArticleEdit.vue')},
      { path: '/articles/list', component: () => import(/* webpackChunkName: "articleList" */ '../views/ArticleList.vue') },
      { path: '/ads/edit/:id', component: () => import(/* webpackChunkName: "adEdit" */ '../views/AdEdit.vue'), props: true },
      { path: '/ads/create', component: () => import(/* webpackChunkName: "adEdit" */ '../views/AdEdit.vue')},
      { path: '/ads/list', component: () => import(/* webpackChunkName: "adList" */ '../views/AdList.vue') },
      { path: '/admin_users/edit/:id', component: () => import(/* webpackChunkName: "adminUserdit" */ '../views/AdminUserEdit.vue'), props: true },
      { path: '/admin_users/create', component: () => import(/* webpackChunkName: "adminUserEdit" */ '../views/AdminUserEdit.vue')},
      { path: '/admin_users/list', component: () => import(/* webpackChunkName: "adminUserList" */ '../views/AdminUserList.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  console.log('to.meta:', to.meta)
  console.log('localStorage token:',localStorage.getItem('token'))
  if(!to.meta.isPublic && !localStorage.getItem('token')) {
    return next('/login')
  }
  next()
})
export default router
