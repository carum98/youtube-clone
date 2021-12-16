<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { buttons, buttons2, footer } from '../static/drawer.json'

let isOpen = ref(false)

onMounted(() => {
    new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            isOpen.value = entry.contentRect.width !== 240
        })
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
