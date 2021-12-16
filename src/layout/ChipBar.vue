<script setup lang="ts">
import { Ref, ref } from 'vue'
import { chips } from '../static/chips.json'

const chipBar = ref(null) as unknown as Ref<HTMLDivElement>
const scrollValue = ref(0)
const selectedId = ref(1)

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
            <button
                v-for="chip in chips"
                :key="chip.id"
                class="chip"
                :class="{ 'chip--selected': selectedId === chip.id }"
                @click="selectedId = chip.id">
                {{ chip.label }}
            </button>
        </div>
        <button class="button-right" @click="right">
            <i class="material-icons-outlined">navigate_next</i>
        </button>
    </section>
</template>
