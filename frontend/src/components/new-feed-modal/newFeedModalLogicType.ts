// Generated by kea-typegen on Thu, 07 Mar 2024 17:37:25 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

export interface newFeedModalLogicType extends Logic {
    actionCreators: {
        setIsModalOpen: (isModalOpen: boolean) => ({
            type: "set is modal open (src.components.new-feed-modal.newFeedModalLogic)";
            payload: {
                isModalOpen: boolean;
            };
        });
    };
    actionKeys: {
        "set is modal open (src.components.new-feed-modal.newFeedModalLogic)": "setIsModalOpen";
    };
    actionTypes: {
        setIsModalOpen: "set is modal open (src.components.new-feed-modal.newFeedModalLogic)";
    };
    actions: {
        setIsModalOpen: (isModalOpen: boolean) => void;
    };
    asyncActions: {
        setIsModalOpen: (isModalOpen: boolean) => Promise<any>;
    };
    defaults: {
        isModalOpen: boolean;
    };
    events: {};
    key: undefined;
    listeners: {};
    path: [
        "src",
        "components",
        "new-feed-modal",
        "newFeedModalLogic"
    ];
    pathString: "src.components.new-feed-modal.newFeedModalLogic";
    props: Record<string, unknown>;
    reducer: (state: any, action: any, fullState: any) => {
        isModalOpen: boolean;
    };
    reducers: {
        isModalOpen: (state: boolean, action: any, fullState: any) => boolean;
    };
    selector: (state: any) => {
        isModalOpen: boolean;
    };
    selectors: {
        isModalOpen: (state: any, props?: any) => boolean;
    };
    sharedListeners: {};
    values: {
        isModalOpen: boolean;
    };
    _isKea: true;
    _isKeaWithKey: false;
}