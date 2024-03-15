import { kea, path, afterMount, beforeUnmount, connect, defaults, actions, reducers } from 'kea'

import { loaders } from 'kea-loaders'
import { api } from '../../lib/api'

import type { exploreLogicType } from './exploreLogicType'
import { userLogic } from '../../userLogic'
import { DEFAULT_NO_DATA, PostData } from '../timeline/timelineLogic'
import { Post } from '../post/postLogic'

export const exploreLogic = kea<exploreLogicType>([
    path(['src', 'components', 'timeline', 'exploreLogic']),
    connect({ actions: [userLogic, ['loadUser']] }),
    defaults(() => ({
        explorePostMetadata: DEFAULT_NO_DATA,
    })),
    actions(() => ({
        appendExplorePosts: (newPosts: Post[]) => ({ newPosts }),
    })),
    loaders(({ values, actions }) => ({
        explorePostMetadata: {
            loadExplorePostMetadata: async (): Promise<PostData> => {
                try {
                    const response = await api.get(`/posts/explore?page=${values.explorePostMetadata.next_page}`)
                    if (response.status === 200) {
                        actions.appendExplorePosts(response.data.data)
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
        explorePosts: [
            [] as Post[],
            {
                appendExplorePosts: (state, { newPosts }) => [...state, ...newPosts],
            },
        ],
    })),
    afterMount(({ actions }) => {
        actions.loadExplorePostMetadata()

        // do gradual loading of posts
        setTimeout(actions.loadExplorePostMetadata, 1000)
        setTimeout(actions.loadExplorePostMetadata, 1500)
    }),
    beforeUnmount(({ actions }) => {
        actions.loadUser()
    }),
])
