<script setup lang="ts">
import ChipBar from '../layout/ChipBar.vue'
import TheVideo from '../components/TheVideo.vue'
import IVideo from '../interfaces/IVideo'

const videos: IVideo[] = [
    {
        id: '1',
        title: 'Video 1',
        description: 'This is the first video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail:
            'https://i.ytimg.com/vi/8d6PKVq4YcE/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBbNFAel7JsskzgznSPhuZzcjmZtw',
        channel: 'Channel 1',
        views: '1.2M',
        date: '1 day ago',
        duration: '1:23',
        avatar: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
        id: '2',
        title: 'Video 2',
        description: 'This is the second video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        channel: 'Channel 2',
        views: '1.2M',
        date: '1 day ago',
        duration: '1:23',
        avatar: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
]
</script>

<template>
    <ChipBar />
    <section class="home">
        <TheVideo v-for="video in videos" :key="video.id" :video="video" />
    </section>
</template>
