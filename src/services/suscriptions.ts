import Api from './api'
import ISuscription from '../interfaces/ISuscription'

export const getSuscription = async (): Promise<ISuscription[]> => {
    const ids = await getVideosId()
    console.log(ids)

    const { data } = await Api().get('channels', {
        params: {
            part: 'snippet',
            id: ids.join(','),
        },
    })

    return data.items.map((item: any) => ({
        id: item.id,
        name: item.snippet.title,
        image: item.snippet.thumbnails.high.url,
    }))
}

const getVideosId = async (): Promise<string[]> => {
    const { data } = await Api().get('videos', {
        params: {
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: '7',
            fields: 'items(snippet(channelId))',
        },
    })

    return data.items.map((item: any) => item.snippet.channelId)
}
