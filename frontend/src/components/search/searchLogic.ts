import { kea, path, afterMount, key, props, defaults } from 'kea'

import { loaders } from 'kea-loaders'
import { api } from '../../lib/api'
import { Feed } from '../feed/feedLogic'

import type { searchLogicType } from './searchLogicType'

export const searchLogic = kea<searchLogicType>([
    path(['src', 'components', 'search', 'searchLogic']),
    props({} as { searchParam?: string }),
    key((props) => props.searchParam || ''),
    defaults(() => ({
        feeds: [],
    })),
    loaders(({ props }) => ({
        feeds: {
            loadFeeds: async (): Promise<Feed[]> => {
                if (!props.searchParam) {
                    return []
                }
                try {
                    const response = await api.get(`/feed/search?search=${props.searchParam}`)
                    if (response.status === 200) {
                        return response.data
                    }
                    return []
                } catch (error) {
                    return []
                }
            },
        },
    })),
    afterMount(({ actions }) => {
        actions.loadFeeds()
    }),
])
