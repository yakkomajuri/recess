// Generated by kea-typegen on Tue, 05 Mar 2024 17:40:13 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { Post } from '../post/postLogic'

export interface timelineLogicType extends Logic {
    actionCreators: {
        loadPosts: () => ({
            type: "load posts (src.components.timeline.timelineLogic)";
            payload: any;
        });
        loadPostsSuccess: (posts: Post[] | null, payload?: any) => ({
            type: "load posts success (src.components.timeline.timelineLogic)";
            payload: {
                posts: Post[] | null;
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
        loadPostsSuccess: (posts: Post[] | null, payload?: any) => void;
        loadPostsFailure: (error: string, errorObject?: any) => void;
    };
    asyncActions: {
        loadPosts: () => Promise<any>;
        loadPostsSuccess: (posts: Post[] | null, payload?: any) => Promise<any>;
        loadPostsFailure: (error: string, errorObject?: any) => Promise<any>;
    };
    defaults: {
        posts: any;
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
        posts: any;
        postsLoading: boolean;
    };
    reducers: {
        posts: (state: any, action: any, fullState: any) => any;
        postsLoading: (state: boolean, action: any, fullState: any) => boolean;
    };
    selector: (state: any) => {
        posts: any;
        postsLoading: boolean;
    };
    selectors: {
        posts: (state: any, props?: any) => any;
        postsLoading: (state: any, props?: any) => boolean;
    };
    sharedListeners: {};
    values: {
        posts: any;
        postsLoading: boolean;
    };
    _isKea: true;
    _isKeaWithKey: false;
}