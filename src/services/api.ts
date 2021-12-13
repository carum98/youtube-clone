import axios from 'axios'

export default () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_YOUTUBE_URL as string,
        params: {
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    })

    return instance
}
