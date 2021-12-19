<script lang="ts" setup>
import { ref } from 'vue'
import IVideo from '../interfaces/IVideo'
import Videos from '../services/videos'
import { actions } from '../static/explore.json'

import TheVideo from '../components/TheVideo.vue'
import { useInfiniteScroll } from '../composable/useInfiniteScroll.'

const videos = ref<IVideo[]>([])

const getVideos = async (pageToken = '') => {
    const { videos: data, nextPageToken } = await Videos.getVideos(pageToken)
    videos.value.push(...data)

    return nextPageToken
}

useInfiniteScroll(getVideos)
</script>

<template>
    <section class="explore__container">
        <div class="explore__actions">
            <button v-for="(action, index) in actions" :key="index">
                <img height="32" width="32" :src="action.img" />
                <p>{{ action.text }}</p>
            </button>
        </div>

        <h4>Trending videos</h4>

        <div class="explore__videos">
            <TheVideo
                v-for="item in videos"
                :key="item.id"
                :video="item"
                is-explore />
        </div>
    </section>
</template>
