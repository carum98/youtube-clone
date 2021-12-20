<script lang="ts" setup>
import { getChannelSections } from '../services/channel'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import IChannelSection from '../interfaces/IChannelSection'
import TheSection from '../components/TheSection.vue'

const route = useRoute()
const channelSections = ref<IChannelSection[]>([])

getChannelSections(route.params.id as string).then((data) => {
    channelSections.value = data
})
</script>

<template>
    <section class="channel__sections">
        <TheSection
            v-for="item in channelSections"
            :key="item.id"
            :section="item" />
    </section>
</template>
