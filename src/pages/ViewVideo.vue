<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

import API from '../services/videos'
import IVideoInfo from '../interfaces/IVideoInfo'
import IVideo from '../interfaces/IVideo'

import TheVideo from '../components/TheVideo.vue'
import VideoDetail from '../components/VideoDetail.vue'
import VideoDescription from '../components/VideoDescription.vue'
import ChipBar from '../layout/ChipBar.vue'
import VideoComments from '../components/VideoComments.vue'
import { useInfiniteScroll } from '../composable/useInfiniteScroll.'

const route = useRoute()
const video = ref<IVideoInfo>({} as IVideoInfo)
const videos = ref<IVideo[]>([])

const getVideos = async (pageToken = '') => {
    const { videos: data, nextPageToken } = await API.getVideos(pageToken)
    videos.value.push(...data)

    return nextPageToken
}

const getVideo = async (id: string) => {
    const data = await API.getVideo(id)
    video.value = data
}

getVideo(route.params.id as string)
useInfiniteScroll(getVideos)

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        videos.value = []

        getVideo(to.params.id as string)
        getVideos()
    }
})
</script>

<template>
    <section class="view-video">
        <div class="view-video__content">
            <iframe
                class="view-video__video"
                type="text/html"
                :src="`http://www.youtube.com/embed/${video.id}?autoplay=1&mute=1`"
                frameborder="0"
                allowfullscreen></iframe>

            <VideoDetail :video="video" />

            <hr />

            <VideoDescription :video="video" />

            <hr />

            <VideoComments :video="video" />
        </div>

        <div class="view-video__suggestions">
            <ChipBar />
            <TheVideo
                v-for="item in videos"
                :key="item.id"
                :video="item"
                is-suggestion />
        </div>
    </section>
</template>
