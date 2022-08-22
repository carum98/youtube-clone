import axios from 'axios'

export default () => {
    const baseURL = import.meta.env.VITE_YOUTUBE_URL as string || '$VITE_YOUTUBE_URL'
    const key = import.meta.env.VITE_YOUTUBE_API_KEY || '$VITE_YOUTUBE_API_KEY'

    const instance = axios.create({
        baseURL,
        params: {
            key,
        },
    })

    return instance
}
