<script lang="ts" setup>
import IVideoInfo from '../interfaces/IVideoInfo'
import { PropType, Ref, ref } from 'vue'
import { getChannel } from '../services/channel'
import IChannel from '../interfaces/IChannel'

const props = defineProps({
    video: {
        type: Object as PropType<IVideoInfo>,
        required: true,
    },
})

const channel = ref({}) as Ref<IChannel>
const showMore = ref(false)

getChannel(props.video.channelId).then((data) => {
    channel.value = data
})
</script>

<template>
    <div class="view-video__description">
        <section class="top-row">
            <div class="view-video__channel">
                <img
                    class="view-video__channel-image"
                    :src="channel.thumbnail"
                    alt="channel" />

                <section>
                    <p class="view-video__channel-title">{{ channel.title }}</p>

                    <p class="view-video__channel-suscription">
                        {{ channel.subscriberCount }} subscribers
                    </p>
                </section>
            </div>

            <button class="view-video__suscribe">SUBSCRIBE</button>
        </section>

        <section class="bottom-row">
            <p class="collapse" :class="{ 'collapse--open': showMore }">
                {{ video.description }}
            </p>
            <button class="collapse__button" @click="showMore = !showMore">
                {{ showMore ? 'SHOW LESS' : 'SHOW MORE' }}
            </button>
        </section>
    </div>
</template>
