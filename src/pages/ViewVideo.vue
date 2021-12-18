<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useRoute } from 'vue-router'

import API from '../services/videos'
import IVideoInfo from '../interfaces/IVideoInfo'
import IVideo from '../interfaces/IVideo'

import TheVideo from '../components/TheVideo.vue'
import VideoDetail from '../components/VideoDetail.vue'
import VideoDescription from '../components/VideoDescription.vue'
import ChipBar from '../layout/ChipBar.vue'
import VideoComments from '../components/VideoComments.vue'

const route = useRoute()
const video = ref({}) as Ref<IVideoInfo>
const videos = ref([]) as Ref<IVideo[]>

API.getVideo(route.params.id as string).then((r) => (video.value = r))
API.getVideos().then((r) => (videos.value = r))
</script>

<template>
    <section class="view-video">
        <div class="view-video__content">
            <iframe
                class="view-video__video"
                type="text/html"
                :src="`http://www.youtube.com/embed/${route.params.id}`"
                frameborder="0"></iframe>

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
