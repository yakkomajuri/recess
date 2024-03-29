// Generated by kea-typegen on Mon, 11 Mar 2024 20:08:55 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { PostData } from '../timeline/timelineLogic'
import type { Post } from '../post/postLogic'

export interface exploreLogicType extends Logic {
    actionCreators: {
        loadUser: () => {
            type: 'load user (src.components.timeline.exploreLogic)'
            payload: any
        }
        appendExplorePosts: (newPosts: Post[]) => {
            type: 'append explore posts (src.components.timeline.exploreLogic)'
            payload: {
                newPosts: Post[]
            }
        }
        loadExplorePostMetadata: () => {
            type: 'load explore post metadata (src.components.timeline.exploreLogic)'
            payload: any
        }
        loadExplorePostMetadataSuccess: (
            explorePostMetadata: PostData,
            payload?: any
        ) => {
            type: 'load explore post metadata success (src.components.timeline.exploreLogic)'
            payload: {
                explorePostMetadata: PostData
                payload?: any
            }
        }
        loadExplorePostMetadataFailure: (
            error: string,
            errorObject?: any
        ) => {
            type: 'load explore post metadata failure (src.components.timeline.exploreLogic)'
            payload: {
                error: string
                errorObject?: any
            }
        }
    }
    actionKeys: {
        'load user (src.components.timeline.exploreLogic)': 'loadUser'
        'append explore posts (src.components.timeline.exploreLogic)': 'appendExplorePosts'
        'load explore post metadata (src.components.timeline.exploreLogic)': 'loadExplorePostMetadata'
        'load explore post metadata success (src.components.timeline.exploreLogic)': 'loadExplorePostMetadataSuccess'
        'load explore post metadata failure (src.components.timeline.exploreLogic)': 'loadExplorePostMetadataFailure'
    }
    actionTypes: {
        loadUser: 'load user (src.components.timeline.exploreLogic)'
        appendExplorePosts: 'append explore posts (src.components.timeline.exploreLogic)'
        loadExplorePostMetadata: 'load explore post metadata (src.components.timeline.exploreLogic)'
        loadExplorePostMetadataSuccess: 'load explore post metadata success (src.components.timeline.exploreLogic)'
        loadExplorePostMetadataFailure: 'load explore post metadata failure (src.components.timeline.exploreLogic)'
    }
    actions: {
        loadUser: () => void
        appendExplorePosts: (newPosts: Post[]) => void
        loadExplorePostMetadata: () => void
        loadExplorePostMetadataSuccess: (explorePostMetadata: PostData, payload?: any) => void
        loadExplorePostMetadataFailure: (error: string, errorObject?: any) => void
    }
    asyncActions: {
        loadUser: () => Promise<any>
        appendExplorePosts: (newPosts: Post[]) => Promise<any>
        loadExplorePostMetadata: () => Promise<any>
        loadExplorePostMetadataSuccess: (explorePostMetadata: PostData, payload?: any) => Promise<any>
        loadExplorePostMetadataFailure: (error: string, errorObject?: any) => Promise<any>
    }
    defaults: {
        explorePostMetadata: PostData
        explorePostMetadataLoading: boolean
        explorePosts: Post[]
    }
    events: {}
    key: undefined
    listeners: {}
    path: ['src', 'components', 'timeline', 'exploreLogic']
    pathString: 'src.components.timeline.exploreLogic'
    props: Record<string, unknown>
    reducer: (
        state: any,
        action: any,
        fullState: any
    ) => {
        explorePostMetadata: PostData
        explorePostMetadataLoading: boolean
        explorePosts: Post[]
    }
    reducers: {
        explorePostMetadata: (state: PostData, action: any, fullState: any) => PostData
        explorePostMetadataLoading: (state: boolean, action: any, fullState: any) => boolean
        explorePosts: (state: Post[], action: any, fullState: any) => Post[]
    }
    selector: (state: any) => {
        explorePostMetadata: PostData
        explorePostMetadataLoading: boolean
        explorePosts: Post[]
    }
    selectors: {
        explorePostMetadata: (state: any, props?: any) => PostData
        explorePostMetadataLoading: (state: any, props?: any) => boolean
        explorePosts: (state: any, props?: any) => Post[]
    }
    sharedListeners: {}
    values: {
        explorePostMetadata: PostData
        explorePostMetadataLoading: boolean
        explorePosts: Post[]
    }
    _isKea: true
    _isKeaWithKey: false
}
