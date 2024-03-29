import React, { useState, ChangeEvent, useEffect } from 'react'
import { Input, Button } from 'antd'
import './CommentInput.css' // Import the custom CSS
import { useActions, useValues } from 'kea'
import { postLogic } from '../post/postLogic'
import { userLogic } from '../../userLogic'

const CommentInput = ({ postUuid, initialCommentText }: { postUuid: string, initialCommentText: string }) => {
    const [commentText, setCommentText] = useState(initialCommentText)
    const logic = postLogic({ postUuid })
    const { comment } = useActions(logic)
    const { user } = useValues(userLogic)

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value)
    }

    const handleSubmit = () => {
        comment({
            comment_content: commentText,
            comment_post_uuid: postUuid,
        })
        setCommentText('')
    }

    useEffect(() => {
        if (!!commentText) {
            document.getElementById('post-comment-textarea')?.focus()
        }
    }, [commentText])

    return (
        <div className="comment-input-container">
            <Input.TextArea
                rows={4}
                value={commentText}
                onChange={handleInputChange}
                placeholder="Write a comment..."
                className="comment-textarea"
                id="post-comment-textarea"
                disabled={!user}
                maxLength={1000}
            />
            <Button type="primary" onClick={handleSubmit} className="submit-comment-button" disabled={!user}>
                Add Comment
            </Button>
        </div>
    )
}

export { CommentInput }
