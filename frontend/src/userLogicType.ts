// Generated by kea-typegen on Wed, 06 Mar 2024 12:26:59 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { User } from './userLogic'

export interface userLogicType extends Logic {
    actionCreators: {
        setLocalUser: (user: User) => ({
            type: "set local user (src.userLogic)";
            payload: {
                user: User;
            };
        });
        setUser: (user: User | null) => ({
            type: "set user (src.userLogic)";
            payload: {
                user: User | null;
            };
        });
        loadUser: () => ({
            type: "load user (src.userLogic)";
            payload: any;
        });
        loadUserSuccess: (user: User | null, payload?: any) => ({
            type: "load user success (src.userLogic)";
            payload: {
                user: User | null;
                payload?: any;
            };
        });
        loadUserFailure: (error: string, errorObject?: any) => ({
            type: "load user failure (src.userLogic)";
            payload: {
                error: string;
                errorObject?: any;
            };
        });
    };
    actionKeys: {
        "set local user (src.userLogic)": "setLocalUser";
        "set user (src.userLogic)": "setUser";
        "load user (src.userLogic)": "loadUser";
        "load user success (src.userLogic)": "loadUserSuccess";
        "load user failure (src.userLogic)": "loadUserFailure";
    };
    actionTypes: {
        setLocalUser: "set local user (src.userLogic)";
        setUser: "set user (src.userLogic)";
        loadUser: "load user (src.userLogic)";
        loadUserSuccess: "load user success (src.userLogic)";
        loadUserFailure: "load user failure (src.userLogic)";
    };
    actions: {
        setLocalUser: (user: User) => void;
        setUser: (user: User | null) => void;
        loadUser: () => void;
        loadUserSuccess: (user: User | null, payload?: any) => void;
        loadUserFailure: (error: string, errorObject?: any) => void;
    };
    asyncActions: {
        setLocalUser: (user: User) => Promise<any>;
        setUser: (user: User | null) => Promise<any>;
        loadUser: () => Promise<any>;
        loadUserSuccess: (user: User | null, payload?: any) => Promise<any>;
        loadUserFailure: (error: string, errorObject?: any) => Promise<any>;
    };
    defaults: {
        user: User | null;
        userLoading: boolean;
        localUser: User | null;
    };
    events: {};
    key: undefined;
    listeners: {};
    path: [
        "src",
        "userLogic"
    ];
    pathString: "src.userLogic";
    props: Record<string, unknown>;
    reducer: (state: any, action: any, fullState: any) => {
        user: User | null;
        userLoading: boolean;
        localUser: User | null;
    };
    reducers: {
        user: (state: User | null, action: any, fullState: any) => User | null;
        userLoading: (state: boolean, action: any, fullState: any) => boolean;
        localUser: (state: User | null, action: any, fullState: any) => User | null;
    };
    selector: (state: any) => {
        user: User | null;
        userLoading: boolean;
        localUser: User | null;
    };
    selectors: {
        user: (state: any, props?: any) => User | null;
        userLoading: (state: any, props?: any) => boolean;
        localUser: (state: any, props?: any) => User | null;
    };
    sharedListeners: {};
    values: {
        user: User | null;
        userLoading: boolean;
        localUser: User | null;
    };
    _isKea: true;
    _isKeaWithKey: false;
}