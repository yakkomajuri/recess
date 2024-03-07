import { kea, path, afterMount, key, props } from 'kea'

import { loaders } from 'kea-loaders'
import { api } from '../../lib/api'

import type { feedLogicType } from './feedLogicType'
import { Post } from '../post/postLogic'

export interface Feed {
    feed_uuid: string
    feed_name: string
    feed_description: string
    feed_picture_url: string
    feed_follower_count: number
    feed_url: string
}

export const feedLogic = kea<feedLogicType>([
    path(['src', 'components', 'feed', 'feedLogic']),
    props({} as { feedUuid?: string }),
    key((props) => props.feedUuid || ''),
    loaders(({ props }) => ({
        feed: {
            loadFeed: async (): Promise<Feed | null> => {
                if (!props.feedUuid) {
                    return null
                }
                try {
                    const response = await api.get(`/feed/${props.feedUuid}`)
                    if (response.status === 200) {
                        return response.data
                    }
                    return null
                } catch (error) {
                    return null
                }
            },
        },
        posts: {
            loadPosts: async (): Promise<Post[] | null> => {
                try {
                    const response = await api.get('/posts?feed_uuid=' + props.feedUuid)
                    if (response.status === 200) {
                        return response.data
                    }
                    return null
                } catch (error) {
                    return null
                }
            },
        },
    })),
    afterMount(({ actions }) => {
        actions.loadFeed()
        actions.loadPosts()
    }),
])
