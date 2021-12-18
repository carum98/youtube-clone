import ListVideos from '../pages/ListVideos.vue'
import ViewVideo from '../pages/ViewVideo.vue'
import ExploreVideos from '../pages/ExploreVideos.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: ListVideos },
    { path: '/explore', component: ExploreVideos, name: 'explore' },
    { path: '/watch/:id', component: ViewVideo, name: 'watch' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
