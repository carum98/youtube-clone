<script setup lang="ts">
import { Ref, ref } from 'vue'

const chips = [
    {
        label: 'Chip 1',
        value: '1',
        color: 'primary',
    },
    {
        label: 'Chip 2',
        value: '2',
        color: 'secondary',
    },
    {
        label: 'Chip 3',
        value: '3',
        color: 'success',
    },
    {
        label: 'Chip 4',
        value: '4',
        color: 'warning',
    },
    {
        label: 'Chip 5',
        value: '5',
        color: 'danger',
    },
    {
        label: 'Chip 6',
        value: '6',
        color: 'info',
    },
    {
        label: 'Chip 7',
        value: '7',
        color: 'light',
    },
    {
        label: 'Chip 8',
        value: '8',
        color: 'dark',
    },
    {
        label: 'Chip 9',
        value: '9',
        color: 'link',
    },
    {
        label: 'Chip 10',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 11',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 12',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 13',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 14',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 15',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 16',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 17',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 18',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 19',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 20',
        value: '10',
        color: 'link',
    },
    {
        label: 'Chip 21',
        value: '10',
        color: 'link',
    },
]

const chipBar = ref(null) as unknown as Ref<HTMLDivElement>
const scrollValue = ref(0)

const left = () => {
    chipBar.value.scrollLeft -= 100
    scrollValue.value = chipBar.value.scrollLeft
}
const right = () => {
    chipBar.value.scrollLeft += 100
    scrollValue.value = chipBar.value.scrollLeft
}
</script>

<template>
    <section id="chipbar">
        <button class="button-left" @click="left">
            <i v-show="scrollValue !== 0" class="material-icons-outlined">
                navigate_before
            </i>
        </button>
        <div ref="chipBar" class="chips">
            <button v-for="chip in chips" :key="chip.value" class="chip">
                {{ chip.label }}
            </button>
        </div>
        <button class="button-right" @click="right">
            <i class="material-icons-outlined">navigate_next</i>
        </button>
    </section>
</template>
