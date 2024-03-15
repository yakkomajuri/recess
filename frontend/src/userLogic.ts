import { kea, path, afterMount, actions, reducers, listeners } from 'kea'

import type { userLogicType } from './userLogicType'
import { loaders } from 'kea-loaders'
import { api } from './lib/api'
import { notification } from 'antd'

export enum EmailVerificationStatus {
    NotVerified = 0,
    VerifyEmailSent = 1,
    Verified = 2
}

export interface User {
    username: string
    email: string
    bio: string
    feeds_following: string[]
    feeds_owned: string[]
    email_verification_status: EmailVerificationStatus
}

export const userLogic = kea<userLogicType>([
    path(['src', 'userLogic']),
    actions(() => ({
        setLocalUser: (user: User) => ({ user }),
        setUser: (user: User | null) => ({ user }),
        verifyEmail: true
    })),
    loaders(({ actions }) => ({
        user: {
            loadUser: async (): Promise<User | null> => {
                try {
                    const response = await api.get('/user/details')
                    if (response.status === 200) {
                        const user = response.data
                        actions.setLocalUser(user)
                        return user
                    }
                    return null
                } catch (error) {
                    return null
                }
            },
        },
    })),
    reducers(() => ({
        // the idea of localUser is to enable following feeds on explore
        // for example without having the explore page refresh
        localUser: [
            null as User | null,
            {
                setLocalUser: (_, { user }) => user,
            },
        ],
        user: [
            null as User | null,
            {
                setUser: (_, { user }) => user,
            },
        ],
    })),
    listeners(({ actions }) => ({
        verifyEmail: async () => {
            try {
                await api.post(`/user/send_verification_email`)
                notification.success({ message: 'Verification email sent!'})
                actions.loadUser()
            } catch (error) {
                notification.error({ message: 'Unable to send verification email'})
            }
        },
    })),
    afterMount(({ actions }) => {
        actions.loadUser()
    }),
])
