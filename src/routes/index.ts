import ListVideos from '../pages/ListVideos.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ path: '/', component: ListVideos }]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
