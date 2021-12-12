<script setup lang="ts">
import { PropType } from 'vue'
import IVideo from '../interfaces/IVideo'

defineProps({
    video: {
        type: Object as PropType<IVideo>,
        required: true,
    },
})
</script>

<template>
    <article class="video">
        <section class="video__thumbnail">
            <img :src="video.thumbnail" />
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
            <p class="video__thumbnail-duration">{{ video.duration }}</p>
        </section>
        <header>
            <img :src="video.avatar" class="video__avatar" />
            <div class="video__info">
                <p class="video__info-title">{{ video.title }}</p>
                <p>{{ video.channel }}</p>
                <p>{{ video.views }} - {{ video.date }}</p>
            </div>
        </header>
    </article>
</template>
