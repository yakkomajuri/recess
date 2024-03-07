import { kea, path, afterMount, defaults } from 'kea'

import { loaders } from 'kea-loaders'
import { api } from '../../lib/api'

import type { timelineLogicType } from './timelineLogicType'
import { Post } from '../post/postLogic'

export interface PostData {
    data: Post[]
    count: number
    current_page: number
    next_page: number | null
}

export const DEFAULT_NO_DATA = {
    data: [],
    current_page: 0,
    next_page: 0,
    count: 0,
} as PostData

export const timelineLogic = kea<timelineLogicType>([
    path(['src', 'components', 'timeline', 'timelineLogic']),
    defaults(() => ({
        posts: DEFAULT_NO_DATA,
    })),
    loaders(({ values }) => ({
        posts: {
            loadPosts: async (): Promise<PostData> => {
                try {
                    const response = await api.get(`/posts/timeline?page=${values.posts.next_page}`)
                    if (response.status === 200) {
                        return {
                            // TODO: If we store these in a separate reducer React will be better at DOM diffs rather than just reloading the whole page
                            data: [...values.posts.data, ...response.data.data],
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
    afterMount(({ actions }) => {
        actions.loadPosts()
    }),
])
