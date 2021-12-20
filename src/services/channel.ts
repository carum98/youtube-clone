import IChannel from '../interfaces/IChannel'
import IChannelSection from '../interfaces/IChannelSection'
import IVideo from '../interfaces/IVideo'
import Api from './api'

export const getChannel = async (channelId: string): Promise<IChannel> => {
    const { data } = await Api().get('channels', {
        params: {
            part: 'snippet,statistics',
            id: channelId,
        },
    })

    const item = data.items[0]

    return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        subscriberCount: item.statistics.subscriberCount,
        videoCount: item.statistics.videoCount,
    } as IChannel
}

export const getChannelView = async (channelId: string): Promise<IChannel> => {
    const { data } = await Api().get('channels', {
        params: {
            part: 'snippet,brandingSettings,statistics',
            id: channelId,
        },
    })

    const item = data.items[0]

    return {
        id: item.id,
        title: item.snippet.title,
        countSubscribers: item.statistics.subscriberCount,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        subscriberCount: item.statistics.subscriberCount,
        videoCount: item.statistics.videoCount,
        banner: item.brandingSettings.image.bannerExternalUrl,
    } as IChannel
}

export const getChannelSections = async (
    channelId: string
): Promise<IChannelSection[]> => {
    const { data } = await Api().get('channelSections', {
        params: {
            part: 'snippet,contentDetails',
            channelId: channelId,
        },
    })

    return data.items.map(
        (item: any) =>
            ({
                id: item.id,
                type: item.snippet.type,
                position: item.snippet.position,
                playlistId: item.contentDetails?.playlists,
                channelId: channelId,
            } as IChannelSection)
    )
}

export const getLastVideos = async (channelId: string) => {
    const { data } = await Api().get('search', {
        params: {
            part: 'snippet',
            channelId: channelId,
            maxResults: 5,
            order: 'date',
            type: 'video',
        },
    })

    return data.items.map(
        (item: any) =>
            ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                channelId: item.snippet.channelId,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                duration: 'PT0S',
                views: '',
            } as IVideo)
    )
}
