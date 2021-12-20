type sectionType =
    | 'allPlaylists'
    | 'singlePlaylist'
    | 'recentUploads'
    | 'popularUploads'

interface IChannelSection {
    id: string
    type: string
    position: sectionType
    playlistId: string[] | null
    channelId: string
}

export default IChannelSection
