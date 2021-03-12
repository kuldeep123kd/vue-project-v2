import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [

  // ================================================ Sample =======================================================
  { path: '/sample/:id', name: 'Sample', componentPath: 'Sample'},

  // ================================================ List Employee =======================================================
  { path: '/', name: 'ListEmployee', componentPath: 'ListEmployee'},

]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.componentPath}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  routes,
  base: process.env.BASE_URL,
  mode: 'history'
})