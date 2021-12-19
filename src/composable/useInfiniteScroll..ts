import { onMounted, onUnmounted } from 'vue'

export const useInfiniteScroll = (
    callback: (pageToken: string) => Promise<string>
) => {
    const area = document.querySelector('#content') as Element
    let pageToken = ''

    const sroll = async () => {
        if (area.scrollTop + area.clientHeight >= area.scrollHeight) {
            onTrigger()
        }
    }

    onMounted(() => {
        area.addEventListener('scroll', sroll)
        onTrigger()
    })

    onUnmounted(() => {
        area.removeEventListener('scroll', sroll)
    })

    const onTrigger = async () => {
        pageToken = await callback(pageToken)
    }

    return {
        pageToken,
    }
}
