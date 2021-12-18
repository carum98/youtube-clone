import IChannel from '../interfaces/IChannel'
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
