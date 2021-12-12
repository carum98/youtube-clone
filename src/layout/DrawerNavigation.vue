<script setup lang="ts">
import { ref, onMounted } from 'vue'

const buttons = [
    {
        text: 'Home',
        to: '/',
        icon: 'home',
    },
    {
        text: 'Explore',
        to: '/explore',
        icon: 'explore',
    },
    {
        text: 'Suscriptions',
        to: '/subscriptions',
        icon: 'subscriptions',
    },
    {
        text: 'Library',
        to: '/video_library',
        icon: 'video_library',
    },
]

const buttons2 = [
    {
        text: 'Home',
        to: '/',
        icon: 'home',
    },
    {
        text: 'Explore',
        to: '/explore',
        icon: 'explore',
    },
    {
        text: 'Suscriptions',
        to: '/subscriptions',
        icon: 'subscriptions',
    },
    {
        divider: true,
    },
    {
        text: 'Library',
        to: '/video_library',
        icon: 'video_library',
    },
    {
        text: 'History',
        to: '/history',
        icon: 'history',
    },
    {
        text: 'Your Videos',
        to: '/your_videos',
        icon: 'slideshow',
    },
    {
        text: 'Liked videos',
        to: '/liked_videos',
        icon: 'thumb_up',
    },
    {
        text: 'Watch later',
        to: '/watch_later',
        icon: 'watch_later',
    },
    {
        divider: true,
    },
    {
        subtitle: true,
        text: 'SUBSCRIPTIONS',
    },
    {
        divider: true,
    },
    {
        subtitle: true,
        text: 'MORE FROM YOUTUBE',
    },
    {
        text: 'YouTube Premium',
        to: '/youtube_premium',
        icon: 'smart_display',
    },
    {
        text: 'Gaming',
        to: '/gaming',
        icon: 'sports_esports',
    },
    {
        text: 'Learning',
        to: '/learning',
        icon: 'lightbulb',
    },
    {
        text: 'Sports',
        to: '/sports',
        icon: 'emoji_events',
    },
    {
        divider: true,
    },
    {
        text: 'Settings',
        to: '/settings',
        icon: 'settings',
    },
    {
        text: 'Report',
        to: '/report',
        icon: 'flag',
    },
    {
        text: 'Help',
        to: '/help',
        icon: 'help_outline',
    },
    {
        text: 'Send feedback',
        to: '/send_feedback',
        icon: 'feedback',
    },
    {
        divider: true,
    },
]

const footer = [
    {
        text: 'About',
        to: '/terms',
    },
    {
        text: 'Press',
        to: '/press',
    },
    {
        text: 'Copyright',
        to: '/copyright',
    },
    {
        text: 'Contact us',
        to: '/contact_us',
    },
    {
        text: 'Creators',
        to: '/creators',
    },
    {
        text: 'Advertise',
        to: '/advertise',
    },
    {
        text: 'Developers',
        to: '/developers',
    },
    {},
    {
        text: 'Privacy',
        to: '/privacy',
    },
    {
        text: 'Policy & Safety',
        to: '/policy_safety',
    },
    {
        text: 'How YouTube works',
        to: '/how_youtube_works',
    },
    {
        text: 'Test new features',
        to: '/test_new_features',
    },
]

let isOpen = ref(false)

onMounted(() => {
    new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.contentRect.width === 72) {
                isOpen.value = true
            } else {
                isOpen.value = false
            }
        })
        console.log('resize')
    }).observe(document.querySelector('#drawer') ?? document.body)
})
</script>

<template>
    <nav id="drawer">
        <ul>
            <template
                v-for="button in isOpen ? buttons : buttons2"
                :key="button.icon">
                <hr v-if="button.hasOwnProperty('divider')" />

                <h3 v-else-if="button.hasOwnProperty('subtitle')">
                    {{ button.text }}
                </h3>

                <router-link
                    v-else
                    v-slot="{ navigate }"
                    custom
                    :to="button.to">
                    <li class="drawer__item" @click="navigate">
                        <i class="material-icons-outlined">
                            {{ button.icon }}
                        </i>
                        <p>{{ button.text }}</p>
                    </li>
                </router-link>
            </template>
        </ul>

        <footer v-if="!isOpen" class="drawer__footer">
            <a v-for="item in footer" :key="item.to">
                {{ item.text }}
            </a>
            <small>© 2021 carum98</small>
        </footer>
    </nav>
</template>
