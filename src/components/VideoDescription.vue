<script lang="ts" setup>
import IVideoInfo from '../interfaces/IVideoInfo'
import { PropType, Ref, ref, watch } from 'vue'
import { getChannel } from '../services/channel'
import IChannel from '../interfaces/IChannel'
import { convertNumberToString } from '../util/helper'

let props = defineProps({
    video: {
        type: Object as PropType<IVideoInfo>,
        required: true,
    },
})

const channel = ref({}) as Ref<IChannel>
const showMore = ref(false)

const getChannelInfo = async () => {
    const data = await getChannel(props.video.channelId)
    channel.value = data
}

watch(() => props.video, getChannelInfo)
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
                        {{
                            convertNumberToString(
                                channel.subscriberCount
                                    ? channel.subscriberCount.toString()
                                    : '0'
                            )
                        }}
                        subscribers
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
