<script setup lang="ts">
import { ref } from 'vue'
import IChannel from '../interfaces/IChannel'
import { getChannelView } from '../services/channel'
import { useRoute } from 'vue-router'
import { convertNumberToString } from '../util/helper'

const route = useRoute()
const channel = ref<IChannel>({} as IChannel)

getChannelView(route.params.id as string).then((data) => {
    channel.value = data
})

const nav = [
    {
        name: 'Home',
        path: { name: 'channel.featured' },
    },
    {
        name: 'Videos',
        path: { name: 'channel.videos' },
    },
    {
        name: 'Playlists',
        path: { path: '/playlists' },
    },
    {
        name: 'Community',
        path: { path: '/community' },
    },
    {
        name: 'Channels',
        path: { path: '/channels' },
    },
    {
        name: 'About',
        path: { path: '/about' },
    },
]
</script>

<template>
    <section class="channel__banner">
        <img :src="channel.banner" />
    </section>

    <header class="channel__header">
        <img class="channel__header-logo" :src="channel.thumbnail" />

        <div class="channel__header-info">
            <h2 class="channel__header-name">{{ channel.title }}</h2>
            <p class="channel__header-suscribers">
                {{
                    convertNumberToString(
                        channel.countSubscribers
                            ? channel.countSubscribers.toString()
                            : '0'
                    )
                }}
                suscribers
            </p>
        </div>

        <section>
            <button class="channel__header-suscribe">SUSCRIBE</button>
        </section>
    </header>

    <nav class="channel__nav">
        <router-link
            v-for="(item, index) in nav"
            :key="index"
            :to="item.path"
            exact-path>
            {{ item.name }}
        </router-link>

        <button>
            <span class="material-icons-outlined"> search </span>
        </button>
    </nav>

    <section class="channel__content">
        <router-view></router-view>
    </section>
</template>
