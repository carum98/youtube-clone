<script lang="ts" setup>
import { convertNumberToString } from '../util/helper'
import IVideoInfo from '../interfaces/IVideoInfo'
import { PropType } from 'vue'

defineProps({
    video: {
        type: Object as PropType<IVideoInfo>,
        required: true,
    },
})

const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

const formatViewCount = (count = 0) =>
    count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
</script>

<template>
    <div class="view-video__info">
        <h1 class="view-video__info-title">{{ video.title }}</h1>

        <div class="view-video__info-details">
            <div class="view-video__info-subtitle">
                {{ formatViewCount(video.viewCount) }} views -
                {{ formatDate(video.publishedAt) }}
            </div>

            <section class="view-video__info-actions">
                <button>
                    <span class="material-icons-outlined"> thumb_up </span>
                    <span>
                        {{
                            convertNumberToString(
                                video.likeCount
                                    ? video.likeCount.toString()
                                    : '0'
                            )
                        }}
                    </span>
                </button>
                <button>
                    <span class="material-icons-outlined"> thumb_down </span>
                    DISLIKE
                </button>
                <button>
                    <span class="material-icons-outlined"> reply </span>
                    SHARE
                </button>
                <button>
                    <span class="material-icons-outlined"> content_cut </span>
                    CLIP
                </button>
                <button>
                    <span class="material-icons-outlined"> playlist_add </span>
                    SAVE
                </button>
                <button>
                    <span class="material-icons-outlined"> more_horiz </span>
                </button>
            </section>
        </div>
    </div>
</template>
