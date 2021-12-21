import ListVideos from '../pages/ListVideos.vue'
import ViewVideo from '../pages/ViewVideo.vue'
import ExploreVideos from '../pages/ExploreVideos.vue'
import ViewChannel from '../pages/ViewChannel.vue'

import ChannelFeature from '../pages/ChannelFeatured.vue'
import ChannelVideos from '../pages/ChannelVideos.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: ListVideos,
        name: 'list',
        meta: { title: 'YouTube-Clone' },
    },
    {
        path: '/explore',
        component: ExploreVideos,
        name: 'explore',
        meta: { title: 'Explore - YouTube-Clone' },
    },
    {
        path: '/watch/:id',
        component: ViewVideo,
        name: 'watch',
        meta: { title: 'Watch Video', sidebar: false },
    },
    {
        path: '/channel/:id',
        component: ViewChannel,
        name: 'channel',
        meta: { title: 'View Channel' },
        redirect: { name: 'channel.featured' },
        children: [
            {
                path: 'featured',
                component: ChannelFeature,
                name: 'channel.featured',
            },
            {
                path: 'videos',
                component: ChannelVideos,
                name: 'channel.videos',
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const app = document.querySelector('#app')
    document.title = to.meta.title as string

    if (to.params.title) {
        document.title = to.params.title as string
    }

    if (to.meta.sidebar === false) {
        app?.classList.add('no-drawer')
    } else {
        app?.classList.remove('no-drawer')
    }

    next()
})

export default router
