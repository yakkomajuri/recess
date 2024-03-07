import { kea, path, key, props, actions, listeners } from 'kea'

import { loaders } from 'kea-loaders'
import { api } from '../../lib/api'

import type { postLogicType } from './postLogicType'

export interface Post {
    post_uuid: string
    post_name: string
    post_description: string
    post_published_date: string
    post_like_count: number
    post_url: string
    post_comment_count: number
    feed_name: string
    feed_picture_url: string
    feed_uuid: string
    liked_by_user: boolean
}

export interface PostComment {
    comment_uuid: string
    comment_content: string
    comment_timestamp: string
    comment_user_picture_url: string
    comment_username: string
    comment_user_email: string
}

export interface CommentToCreate {
    comment_content: string
    comment_post_uuid: string
}

export const postLogic = kea<postLogicType>([
    path(['src', 'components', 'feed', 'postLogic']),
    props({} as { postUuid?: string }),
    key((props) => props.postUuid || ''),
    actions(() => ({
        likePost: true,
        unlikePost: true,
        comment: (comment: CommentToCreate) => ({ comment }),
    })),
    loaders(({ props, actions }) => ({
        post: {
            loadPost: async (): Promise<Post | null> => {
                // load post and comments
                if (!props.postUuid) {
                    return null
                }
                try {
                    const response = await api.get(`/posts/${props.postUuid}`)
                    if (response.status === 200) {
                        actions.loadComments()
                        return response.data
                    }
                    return null
                } catch (error) {
                    return null
                }
            },
        },
        comments: {
            loadComments: async (): Promise<PostComment[] | null> => {
                if (!props.postUuid) {
                    return null
                }
                try {
                    const response = await api.get(`/post_comments?post_uuid=${props.postUuid}`)
                    if (response.status === 200) {
                        return response.data
                    }
                    return null
                } catch (error) {
                    return null
                }
            },
        },
    })),
    listeners(({ actions, props }) => ({
        likePost: async () => {
            const response = await api.post(`/posts/${props.postUuid}/like`)
            // reconsider this?
            actions.loadPost()
        },
        unlikePost: async () => {
            const response = await api.post(`/posts/${props.postUuid}/unlike`)
            // reconsider this?
            actions.loadPost()
        },
        comment: async ({ comment }) => {
            const response = await api.post(`/post_comments`, { ...comment })
            actions.loadComments()
            actions.loadPost()
        },
    })),
])
