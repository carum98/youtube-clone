import { ref } from 'vue'

const isOpen = ref(false)

export default () => {
    const toggle = () => (isOpen.value = !isOpen.value)

    return {
        isOpen,
        toggle,
    }
}
