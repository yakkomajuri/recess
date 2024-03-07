// Generated by kea-typegen on Thu, 07 Mar 2024 20:23:58 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { Feed } from './feedLogic'
import type { Post } from '../post/postLogic'

export interface feedLogicType extends Logic {
    actionCreators: {
        loadFeed: () => {
            type: 'load feed (src.components.feed.feedLogic)'
            payload: any
        }
        loadFeedSuccess: (
            feed: Feed | null,
            payload?: any
        ) => {
            type: 'load feed success (src.components.feed.feedLogic)'
            payload: {
                feed: Feed | null
                payload?: any
            }
        }
        loadFeedFailure: (
            error: string,
            errorObject?: any
        ) => {
            type: 'load feed failure (src.components.feed.feedLogic)'
            payload: {
                error: string
                errorObject?: any
            }
        }
        loadPosts: () => {
            type: 'load posts (src.components.feed.feedLogic)'
            payload: any
        }
        loadPostsSuccess: (
            posts: Post[] | null,
            payload?: any
        ) => {
            type: 'load posts success (src.components.feed.feedLogic)'
            payload: {
                posts: Post[] | null
                payload?: any
            }
        }
        loadPostsFailure: (
            error: string,
            errorObject?: any
        ) => {
            type: 'load posts failure (src.components.feed.feedLogic)'
            payload: {
                error: string
                errorObject?: any
            }
        }
    }
    actionKeys: {
        'load feed (src.components.feed.feedLogic)': 'loadFeed'
        'load feed success (src.components.feed.feedLogic)': 'loadFeedSuccess'
        'load feed failure (src.components.feed.feedLogic)': 'loadFeedFailure'
        'load posts (src.components.feed.feedLogic)': 'loadPosts'
        'load posts success (src.components.feed.feedLogic)': 'loadPostsSuccess'
        'load posts failure (src.components.feed.feedLogic)': 'loadPostsFailure'
    }
    actionTypes: {
        loadFeed: 'load feed (src.components.feed.feedLogic)'
        loadFeedSuccess: 'load feed success (src.components.feed.feedLogic)'
        loadFeedFailure: 'load feed failure (src.components.feed.feedLogic)'
        loadPosts: 'load posts (src.components.feed.feedLogic)'
        loadPostsSuccess: 'load posts success (src.components.feed.feedLogic)'
        loadPostsFailure: 'load posts failure (src.components.feed.feedLogic)'
    }
    actions: {
        loadFeed: () => void
        loadFeedSuccess: (feed: Feed | null, payload?: any) => void
        loadFeedFailure: (error: string, errorObject?: any) => void
        loadPosts: () => void
        loadPostsSuccess: (posts: Post[] | null, payload?: any) => void
        loadPostsFailure: (error: string, errorObject?: any) => void
    }
    asyncActions: {
        loadFeed: () => Promise<any>
        loadFeedSuccess: (feed: Feed | null, payload?: any) => Promise<any>
        loadFeedFailure: (error: string, errorObject?: any) => Promise<any>
        loadPosts: () => Promise<any>
        loadPostsSuccess: (posts: Post[] | null, payload?: any) => Promise<any>
        loadPostsFailure: (error: string, errorObject?: any) => Promise<any>
    }
    defaults: {
        feed: any
        feedLoading: boolean
        posts: any
        postsLoading: boolean
    }
    events: {}
    key: string
    listeners: {}
    path: ['src', 'components', 'feed', 'feedLogic']
    pathString: 'src.components.feed.feedLogic'
    props: {
        feedUuid?: string
    }
    reducer: (
        state: any,
        action: any,
        fullState: any
    ) => {
        feed: any
        feedLoading: boolean
        posts: any
        postsLoading: boolean
    }
    reducers: {
        feed: (state: any, action: any, fullState: any) => any
        feedLoading: (state: boolean, action: any, fullState: any) => boolean
        posts: (state: any, action: any, fullState: any) => any
        postsLoading: (state: boolean, action: any, fullState: any) => boolean
    }
    selector: (state: any) => {
        feed: any
        feedLoading: boolean
        posts: any
        postsLoading: boolean
    }
    selectors: {
        feed: (state: any, props?: any) => any
        feedLoading: (state: any, props?: any) => boolean
        posts: (state: any, props?: any) => any
        postsLoading: (state: any, props?: any) => boolean
    }
    sharedListeners: {}
    values: {
        feed: any
        feedLoading: boolean
        posts: any
        postsLoading: boolean
    }
    _isKea: true
    _isKeaWithKey: true
}
