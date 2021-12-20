<script setup lang="ts">
import { PropType, ref } from 'vue'
import IChannelSection from '../interfaces/IChannelSection'
import IVideo from '../interfaces/IVideo'
import { getPlaylist, getPlayListTitle } from '../services/playlist'
import { getLastVideos } from '../services/channel'
import TheVideo from './TheVideo.vue'

const props = defineProps({
    section: {
        type: Object as PropType<IChannelSection>,
        required: true,
    },
})

const videos = ref<IVideo[]>([])
const title = ref<string>('')

if (props.section.type === 'singleplaylist' && props.section.playlistId) {
    getPlaylist(props.section.playlistId[0]).then((data) => {
        videos.value = data
    })

    getPlayListTitle(props.section.playlistId[0]).then((data) => {
        title.value = data
    })
} else if (props.section.type === 'recentuploads') {
    title.value = 'Uploads'

    getLastVideos(props.section.channelId).then((data) => {
        videos.value = data
    })
}
</script>

<template>
    <section class="section">
        <header class="section__header">
            <h1 class="section__header-title">{{ title }}</h1>
            <button>
                <span class="material-icons-outlined"> play_arrow </span>PLAY
                ALL
            </button>
        </header>

        <div class="section__content">
            <TheVideo v-for="video in videos" :key="video.id" :video="video" />
        </div>
    </section>
</template>
