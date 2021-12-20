import IVideo from '../interfaces/IVideo'
import IVideoInfo from '../interfaces/IVideoInfo'
import Api from './api'

export default {
    async getVideos(nextPageToken = ''): Promise<{
        nextPageToken: string
        videos: IVideo[]
    }> {
        const { data } = await Api().get('videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                maxResults: '30',
                pageToken: nextPageToken,
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

        return {
            nextPageToken: data.nextPageToken,
            videos,
        }
    },
    async getVideo(videoId: string): Promise<IVideoInfo> {
        const { data } = await Api().get('videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                id: videoId,
            },
        })

        const item = data.items[0]

        return {
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            channelTitle: item.snippet.channelTitle,
            channelId: item.snippet.channelId,
            commentCount: item.statistics.commentCount,
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount,
            publishedAt: item.snippet.publishedAt,
        }
    },
}

export const getRelatedVideos = async (
    videoId: string,
    nextPageToken = ''
): Promise<{
    nextPageToken: string
    videos: IVideo[]
}> => {
    const { data: dataIds } = await Api().get('search', {
        params: {
            part: 'id',
            relatedToVideoId: videoId,
            type: 'video',
            maxResults: '10',
            pageToken: nextPageToken,
        },
    })

    const ids = dataIds.items.map((item: any) => item.id.videoId)

    const { data } = await Api().get('videos', {
        params: {
            part: 'snippet,contentDetails,statistics',
            id: ids.join(','),
        },
    })

    const videos: IVideo[] = data.items
        .filter((v: { snippet: any }) => v.snippet)
        .map((item: any) => ({
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

    return {
        nextPageToken: data.nextPageToken,
        videos,
    }
}

export const getVideoChannel = async (
    channelId: string,
    nextPageToken = ''
): Promise<{
    nextPageToken: string
    videos: IVideo[]
}> => {
    const { data } = await Api().get('search', {
        params: {
            part: 'snippet',
            channelId: channelId,
            maxResults: 5,
            order: 'date',
            type: 'video',
            pageToken: nextPageToken,
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
        duration: 'PT0S',
        views: '',
    }))

    return {
        nextPageToken: data.nextPageToken,
        videos,
    }
}
