import Api from './api'
import IComment from '../interfaces/IComment'

export const getCommentThreads = async (
    videoId: string,
    nextPageToken = ''
): Promise<{ nextPageToken: string; comments: IComment[] }> => {
    const { data } = await Api().get('commentThreads', {
        params: {
            part: 'snippet',
            videoId,
            pageToken: nextPageToken,
        },
    })

    const comments = data.items.map((item: any) => ({
        id: item.id,
        text: item.snippet.topLevelComment.snippet.textOriginal,
        authorDisplayName:
            item.snippet.topLevelComment.snippet.authorDisplayName,
        authorProfileImageUrl:
            item.snippet.topLevelComment.snippet.authorProfileImageUrl,
        likeCount: item.snippet.topLevelComment.snippet.likeCount,
        publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
        authorChannelUrl: item.snippet.topLevelComment.snippet.authorChannelUrl,
    })) as IComment[]

    return {
        nextPageToken: data.nextPageToken,
        comments,
    }
}
