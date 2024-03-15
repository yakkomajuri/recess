import { kea, path, afterMount, defaults, actions, reducers } from 'kea'

import { loaders } from 'kea-loaders'
import { api } from '../../lib/api'

import type { timelineLogicType } from './timelineLogicType'
import { Post } from '../post/postLogic'

export interface PostData {
    count: number
    current_page: number
    next_page: number | null
}

export const DEFAULT_NO_DATA = {
    current_page: 0,
    next_page: 0,
    count: 0,
} as PostData

export const timelineLogic = kea<timelineLogicType>([
    path(['src', 'components', 'timeline', 'timelineLogic']),
    defaults(() => ({
        postMetadata: DEFAULT_NO_DATA,
    })),
    actions(() => ({
        appendPosts: (newPosts: Post[]) => ({ newPosts }),
    })),
    loaders(({ values, actions }) => ({
        postMetadata: {
            loadPosts: async (): Promise<PostData> => {
                try {
                    const response = await api.get(`/posts/timeline?page=${values.postMetadata.next_page}`)
                    if (response.status === 200) {
                        actions.appendPosts(response.data.data)
                        return {
                            count: response.data.count,
                            current_page: response.data.current_page,
                            next_page: response.data.next_page,
                        }
                    }
                    return DEFAULT_NO_DATA
                } catch (error) {
                    return DEFAULT_NO_DATA
                }
            },
        },
    })),
    reducers(() => ({
        posts: [
            [] as Post[],
            {
                appendPosts: (state, { newPosts }) => [...state, ...newPosts],
            },
        ],
    })),
    afterMount(({ actions }) => {
        actions.loadPosts()

        // do gradual loading of posts
        setTimeout(actions.loadPosts, 1000)
        setTimeout(actions.loadPosts, 1500)
    }),
])
