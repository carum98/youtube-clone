<script lang="ts" setup>
import { PropType, ref } from 'vue'
import IVideoInfo from '../interfaces/IVideoInfo'
import IComment from '../interfaces/IComment'
import { getCommentThreads } from '../services/comments'
import { getTimeAgo, convertNumberToString } from '../util/helper'
import { useInfiniteScroll } from '../composable/useInfiniteScroll.'

const props = defineProps({
    video: {
        type: Object as PropType<IVideoInfo>,
        required: true,
    },
})

const comments = ref<IComment[]>([])

const getComments = async (pageToken = '') => {
    const { comments: data, nextPageToken } = await getCommentThreads(
        props.video.id,
        pageToken
    )
    comments.value.push(...data)

    return nextPageToken
}

useInfiniteScroll(getComments)
</script>

<template>
    <section class="comments__info">
        <p>{{ video.commentCount }} Comments</p>
        <button>
            <span class="material-icons-outlined"> sort </span>SORT BY
        </button>
    </section>

    <section class="comments__input">
        <img :src="video.thumbnail" alt="channel" />
        <input type="text" placeholder="Add a public comment..." />
    </section>

    <section class="comments__list">
        <article v-for="item in comments" :key="item.id" class="comments__item">
            <img :src="item.authorProfileImageUrl" alt="channel" />
            <section class="comments__item-content">
                <p class="comments__item-name">
                    <a :href="item.authorChannelUrl">
                        {{ item.authorDisplayName }}
                    </a>
                    -
                    <span class="comments__item-date">{{
                        getTimeAgo(item.publishedAt)
                    }}</span>
                </p>
                <p class="comments__item-text">
                    {{ item.text }}
                </p>

                <div class="comments__item-actions">
                    <button>
                        <span class="material-icons-outlined"> thumb_up </span>
                        {{ convertNumberToString(item.likeCount.toString()) }}
                    </button>
                    <button>
                        <span class="material-icons-outlined">
                            thumb_down
                        </span>
                    </button>
                    <button>REPLY</button>
                </div>

                <button v-if="item.likeCount >= 1" class="comments__item-reply">
                    <span class="material-icons-outlined">
                        arrow_drop_down
                    </span>
                    View {{ item.likeCount }} replies
                </button>
            </section>

            <button class="comments__item-more">
                <span class="material-icons-outlined"> more_vert </span>
            </button>
        </article>
    </section>
</template>
