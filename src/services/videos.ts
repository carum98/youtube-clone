import IVideo from '../interfaces/IVideo'
import Api from './api'

export default {
    async getVideos() {
        const { data } = await Api().get('videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                regionCode: 'CR',
                chart: 'mostPopular',
                maxResults: '30',
            },
        })

        const videos: IVideo[] = data.items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            channelTitle: item.snippet.channelTitle,
            channelId: item.snippet.channelId,
            channelThumbnail: item.snippet.thumbnails.default.url,
            publishedAt: item.snippet.publishedAt,
            views: item.statistics.viewCount,
            likes: item.statistics.likeCount,
            dislikes: item.statistics.dislikeCount,
            duration: item.contentDetails.duration,
        }))

        return videos
    },
}
