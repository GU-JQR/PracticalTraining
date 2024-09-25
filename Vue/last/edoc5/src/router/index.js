import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Add from '../pages/Add.vue'
import List from '../pages/List.vue'
import Update from "../pages/Update.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/list'
  },
  {
    path: '/add',
    component: Add
  },
  {
    path: '/list',
    component: List
  },
  {
    path: '/update',
    component: Update
  },
]

const router = new VueRouter({
  routes
})

export default router
