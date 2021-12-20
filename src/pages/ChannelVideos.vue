<script lang="ts" setup>
import { useInfiniteScroll } from '../composable/useInfiniteScroll.'
import { getVideoChannel } from '../services/videos'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import IVideo from '../interfaces/IVideo'

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
    {{ videos }}
</template>
