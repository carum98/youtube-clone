<script lang="ts" setup>
import { useInfiniteScroll } from '../composable/useInfiniteScroll.'
import { getVideoChannel } from '../services/videos'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import IVideo from '../interfaces/IVideo'
import TheVideo from '../components/TheVideo.vue'

const route = useRoute()

const videos = ref<IVideo[]>([])

const getVideos = async (pageToken?: string) => {
    const { videos: data, nextPageToken } = await getVideoChannel(
        route.params.id as string,
        pageToken
    )
    videos.value.push(...data)

    return nextPageToken
}

useInfiniteScroll(getVideos)
</script>

<template>
    <section class="channel__videos-header">
        <h1>Uploads</h1>
        <button>
            <span class="material-icons-outlined"> sort </span>
            SORT BY
        </button>
    </section>
    <section class="channel__videos">
        <TheVideo v-for="video in videos" :key="video.id" :video="video" />
    </section>
</template>
