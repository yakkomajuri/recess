import React, { useState } from 'react'
import './Comment.css'
import { DeleteOutlined } from '@ant-design/icons'
import { useValues } from 'kea'
import { userLogic } from '../../userLogic'
import { api } from '../../lib/api'
import { notification } from 'antd'
interface CommentProps {
    author: string
    avatar: string
    date: string
    content: string
    uuid: string
}

const Comment = ({ author, avatar, date, content, uuid }: CommentProps) => {
    const { user } = useValues(userLogic)
    const [commentDeleted, setCommentDeleted] = useState(false)

    const deleteComment = async () => {
        try {
            const res = await api.delete(`/post_comments/${uuid}`)
            if (res.status === 204) {
                notification.success({
                    message: 'Comment deleted successfully',
                })
                setCommentDeleted(true)
                return
            }
        } catch (error) {
            console.error(error)
            notification.error({
                message: 'Unable to delete comment',
            })
        }
    }

    if (commentDeleted) {
        return null
    }

    return (
        <div className="comment-container">
            <div className="comment-avatar">
                <img src={avatar} alt={author} />
            </div>
            <div className="comment-body">
                <div className="comment-header">
                    <span className="comment-author">{author}</span>
                    <span className="comment-date">
                        {date}{' '}
                        {user?.username === author ? (
                            <DeleteOutlined onClick={deleteComment} style={{ color: 'red', cursor: 'pointer' }} />
                        ) : null}
                    </span>
                </div>
                <div className="comment-content">{content}</div>
            </div>
        </div>
    )
}

export { Comment }
