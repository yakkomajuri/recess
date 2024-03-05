import { kea, path, afterMount, beforeUnmount, connect } from 'kea'

import { loaders } from 'kea-loaders'
import { api } from '../../lib/api'

import type { exploreLogicType } from './exploreLogicType'
import { userLogic } from '../../userLogic'

export interface Post {
    post_uuid: string
    post_name: string
    post_description: string
    post_published_date: string
    likes: number
    comments: number
    feed_name: string
    feed_picture_url: string
    feed_uuid: string
}

export const exploreLogic = kea<exploreLogicType>([
    path(['src', 'components', 'timeline', 'exploreLogic']),
    connect({ actions: [userLogic, ['loadUser']] }),
    loaders(() => ({
        explorePosts: {
            loadExplorePosts: async (): Promise<Post[] | null> => {
                try {
                    const response = await api.get(`/posts/explore`)
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
        actions.loadExplorePosts()
    }),
    beforeUnmount(({ actions }) => {
        actions.loadUser()
    }),
])
