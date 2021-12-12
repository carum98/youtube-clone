<script setup lang="ts">
import NavBar from './NavBar.vue'
import DrawerNavigation from './DrawerNavigation.vue'
</script>

<template>
    <NavBar />
    <DrawerNavigation />
    <main id="content">
        <slot></slot>
    </main>
</template>
