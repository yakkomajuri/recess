// Generated by kea-typegen on Thu, 07 Mar 2024 17:37:25 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { PostData } from './timelineLogic'

export interface timelineLogicType extends Logic {
    actionCreators: {
        loadPosts: () => ({
            type: "load posts (src.components.timeline.timelineLogic)";
            payload: any;
        });
        loadPostsSuccess: (posts: PostData, payload?: any) => ({
            type: "load posts success (src.components.timeline.timelineLogic)";
            payload: {
                posts: PostData;
                payload?: any;
            };
        });
        loadPostsFailure: (error: string, errorObject?: any) => ({
            type: "load posts failure (src.components.timeline.timelineLogic)";
            payload: {
                error: string;
                errorObject?: any;
            };
        });
    };
    actionKeys: {
        "load posts (src.components.timeline.timelineLogic)": "loadPosts";
        "load posts success (src.components.timeline.timelineLogic)": "loadPostsSuccess";
        "load posts failure (src.components.timeline.timelineLogic)": "loadPostsFailure";
    };
    actionTypes: {
        loadPosts: "load posts (src.components.timeline.timelineLogic)";
        loadPostsSuccess: "load posts success (src.components.timeline.timelineLogic)";
        loadPostsFailure: "load posts failure (src.components.timeline.timelineLogic)";
    };
    actions: {
        loadPosts: () => void;
        loadPostsSuccess: (posts: PostData, payload?: any) => void;
        loadPostsFailure: (error: string, errorObject?: any) => void;
    };
    asyncActions: {
        loadPosts: () => Promise<any>;
        loadPostsSuccess: (posts: PostData, payload?: any) => Promise<any>;
        loadPostsFailure: (error: string, errorObject?: any) => Promise<any>;
    };
    defaults: {
        posts: PostData;
        postsLoading: boolean;
    };
    events: {};
    key: undefined;
    listeners: {};
    path: [
        "src",
        "components",
        "timeline",
        "timelineLogic"
    ];
    pathString: "src.components.timeline.timelineLogic";
    props: Record<string, unknown>;
    reducer: (state: any, action: any, fullState: any) => {
        posts: PostData;
        postsLoading: boolean;
    };
    reducers: {
        posts: (state: PostData, action: any, fullState: any) => PostData;
        postsLoading: (state: boolean, action: any, fullState: any) => boolean;
    };
    selector: (state: any) => {
        posts: PostData;
        postsLoading: boolean;
    };
    selectors: {
        posts: (state: any, props?: any) => PostData;
        postsLoading: (state: any, props?: any) => boolean;
    };
    sharedListeners: {};
    values: {
        posts: PostData;
        postsLoading: boolean;
    };
    _isKea: true;
    _isKeaWithKey: false;
}