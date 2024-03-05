import { kea, path, afterMount } from 'kea'

import { loaders } from 'kea-loaders'
import { api } from '../../lib/api'

import type { timelineLogicType } from './timelineLogicType'
import { Post } from '../post/postLogic'

export const timelineLogic = kea<timelineLogicType>([
    path(['src', 'components', 'timeline', 'timelineLogic']),
    loaders(({}) => ({
        posts: {
            loadPosts: async (): Promise<Post[] | null> => {
                try {
                    const response = await api.get('/posts/timeline')
                    if (response.status === 200) {
                        return response.data.map((post: Post) => ({
                            ...post,
                            likes: Math.floor(Math.random() * 100), // Placeholder for likes count
                            comments: Math.floor(Math.random() * 10), // Placeholder for comments count
                        }))
                    }
                    return null
                } catch (error) {
                    return null
                }
            },
        },
    })),
    afterMount(({ actions }) => {
        actions.loadPosts()
    }),
])
