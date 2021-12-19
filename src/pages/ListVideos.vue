<script setup lang="ts">
import ChipBar from '../layout/ChipBar.vue'
import TheVideo from '../components/TheVideo.vue'
import IVideo from '../interfaces/IVideo'
import Videos from '../services/videos'
import { ref, Ref } from 'vue'
import { useInfiniteScroll } from '../composable/useInfiniteScroll.'

const videos = ref([]) as Ref<IVideo[]>

const getVideos = async (pageToken = '') => {
    const { videos: data, nextPageToken } = await Videos.getVideos(pageToken)
    videos.value.push(...data)

    return nextPageToken
}

useInfiniteScroll(getVideos)
</script>

<template>
    <ChipBar />
    <section class="home">
        <TheVideo v-for="video in videos" :key="video.id" :video="video" />
    </section>
</template>
