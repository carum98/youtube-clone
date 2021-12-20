import IVideo from '../interfaces/IVideo'
import Api from './api'

export const getPlaylist = async (playlistId: string): Promise<IVideo[]> => {
    const { data } = await Api().get('playlistItems', {
        params: {
            part: 'snippet,contentDetails',
            playlistId,
            maxResults: 5,
        },
    })

    return data.items.map(
        (item: any) =>
            ({
                id: item.snippet.resourceId.videoId,
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

export const getPlayListTitle = async (playlistId: string): Promise<string> => {
    const { data } = await Api().get('playlists', {
        params: {
            part: 'snippet,contentDetails',
            id: playlistId,
            fields: 'items(snippet(title))',
        },
    })

    return data.items[0].snippet.title
}
