<script setup lang="ts">
import { PropType } from 'vue'
import IVideo from '../interfaces/IVideo'
import {
    convertStringToTime,
    convertNumberToString,
    getTimeAgo,
} from '../util/helper'

defineProps({
    video: {
        type: Object as PropType<IVideo>,
        required: true,
    },
    isSuggestion: {
        type: Boolean,
        default: false,
    },
    isExplore: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <router-link
        :to="{ name: 'watch', params: { id: video.id, title: video.title } }"
        class="video"
        :class="{
            'video--suggested': isSuggestion,
            'video--explore': isExplore,
        }">
        <section class="video__thumbnail">
            <img loading="lazy" :src="video.thumbnail" />
            <div class="video__thumbnail-actions">
                <div>
                    <button>
                        <i class="material-icons-outlined"> watch_later </i>
                    </button>
                    <div class="video__thumbnail-actions--collapse">
                        WATCH LATER
                    </div>
                </div>
                <div>
                    <button>
                        <i class="material-icons-outlined"> playlist_play </i>
                    </button>
                    <div class="video__thumbnail-actions--collapse">
                        ADD TO QUEUE
                    </div>
                </div>
            </div>
            <p class="video__thumbnail-duration">
                {{ convertStringToTime(video.duration) }}
            </p>
        </section>
        <header>
            <img
                loading="lazy"
                :src="video.channelThumbnail"
                class="video__avatar" />

            <div class="video__info">
                <p class="video__info-title">{{ video.title }}</p>
                <router-link
                    class="video__info-channel"
                    :to="{ name: 'channel', params: { id: video.channelId } }">
                    {{ video.channelTitle }}
                </router-link>
                <p>
                    {{ convertNumberToString(video.views) }} -
                    {{ getTimeAgo(video.publishedAt) }}
                </p>

                <p v-if="isExplore" class="video__info-description">
                    {{ video.description }}
                </p>
            </div>
        </header>
    </router-link>
</template>
