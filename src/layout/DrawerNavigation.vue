<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { buttons, buttons2, footer } from '../static/drawer.json'
import useDrawer from '../composable/useDrawer'
import ISuscription from '../interfaces/ISuscription'
import { getSuscription } from '../services/suscriptions'

const small = ref(false)

onMounted(() => {
    // new ResizeObserver((entries) => {
    //     entries.forEach((entry) => {
    //         small.value = entry.contentRect.width !== 240
    //     })
    // }).observe(document.querySelector('#drawer') ?? document.body)
})

const suscriptions = ref<ISuscription[]>([])

getSuscription().then((data) => {
    suscriptions.value.push(...data)
})

const { isOpen } = useDrawer()
</script>

<template>
    <nav id="drawer" :class="{ open: isOpen }">
        <template
            v-for="button in small ? buttons : buttons2"
            :key="button.icon">
            <hr v-if="button.hasOwnProperty('divider')" />

            <h3 v-else-if="button.hasOwnProperty('subtitle')">
                {{ button.text }}
            </h3>

            <section v-else-if="button.hasOwnProperty('suscriptions')">
                <router-link
                    v-for="suscription in suscriptions"
                    :key="suscription.id"
                    class="drawer__item drawer__item-suscription"
                    :to="{ name: 'channel', params: { id: suscription.id } }">
                    <img :src="suscription.image" />
                    <p>{{ suscription.name }}</p>
                </router-link>
            </section>

            <router-link
                v-else
                class="drawer__item"
                :to="button.to"
                active-class="drawer__item--active"
                exact-active-class="drawer__item--exact">
                <i class="material-icons-outlined">
                    {{ button.icon }}
                </i>
                <p>{{ button.text }}</p>
            </router-link>
        </template>

        <footer v-if="!small" class="drawer__footer">
            <a v-for="item in footer" :key="item.to">
                {{ item.text }}
            </a>
            <small>© 2021 carum98</small>
        </footer>
    </nav>
</template>
