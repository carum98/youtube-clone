<script setup lang="ts">
import ChipBar from '../layout/ChipBar.vue'
import TheVideo from '../components/TheVideo.vue'
import IVideo from '../interfaces/IVideo'
import Videos from '../services/videos'
import { ref, Ref } from 'vue'

const videos = ref([]) as Ref<IVideo[]>

const getVideos = async () => {
    videos.value = await Videos.getVideos()
}

getVideos()
</script>

<template>
    <ChipBar />
    <section class="home">
        <TheVideo v-for="video in videos" :key="video.id" :video="video" />
    </section>
</template>
