import { kea, path, afterMount, defaults } from 'kea'

import { loaders } from 'kea-loaders'
import { api } from '../../lib/api'
import { Feed } from '../feed/feedLogic'

import type { trendingLogicType } from './trendingLogicType'

export const trendingLogic = kea<trendingLogicType>([
    path(['src', 'components', 'trending', 'trendingLogic']),
    defaults({
        trendingFeeds: [] as Feed[],
    }),
    loaders(() => ({
        trendingFeeds: {
            loadTrendingFeeds: async (): Promise<Feed[]> => {
                try {
                    const response = await api.get(`/feed/trending`)
                    if (response.status === 200) {
                        return response.data as Feed[]
                    }
                    return []
                } catch (error) {
                    return []
                }
            },
        },
    })),
    afterMount(({ actions }) => {
        actions.loadTrendingFeeds()
    }),
])
