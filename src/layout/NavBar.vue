<script setup lang="ts">
import useDrawer from '../composable/useDrawer'

const { toggle } = useDrawer()
</script>

<template>
    <header id="navbar">
        <section>
            <i class="menu material-icons-outlined" @click="toggle">menu</i>
            <img class="logo" src="../assets/yt-logo-dark.svg" />
        </section>
        <section class="search">
            <input type="text" placeholder="Search" />
            <button class="search__button search__button--search">
                <i class="material-icons-outlined">search</i>
            </button>
            <button class="search__button search__button--mic">
                <i class="material-icons-outlined">mic</i>
            </button>
        </section>
        <section>
            <i class="material-icons-outlined">videocam</i>
            <i class="material-icons-outlined">apps</i>
            <i class="material-icons-outlined">notifications</i>
            <i class="material-icons-outlined">account_circle</i>
        </section>
    </header>
</template>
