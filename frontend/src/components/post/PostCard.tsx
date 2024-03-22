import React from 'react'
import { Card, Avatar, Button, Row, Col, Tooltip } from 'antd'
import { LikeOutlined, MessageOutlined, LinkOutlined } from '@ant-design/icons'
import { api } from '../../lib/api'
import { useActions, useValues } from 'kea'
import { User, userLogic } from '../../userLogic'
import { timelineLogic } from '../timeline/timelineLogic'
import { Post, postLogic } from './postLogic'
import { useNavigate } from 'react-router-dom'
import { GravatarDefaultType, getGravatarUrl } from '../../lib/gravatar'
import { htmlToText } from 'html-to-text'

const PostCardTitle = ({
    feedName,
    feedUuid,
    isExplorePage,
}: {
    feedName: Post['feed_name']
    feedUuid: Post['feed_uuid']
    isExplorePage?: boolean
}) => {
    const { user, localUser } = useValues(userLogic)
    const { loadUser, setLocalUser } = useActions(userLogic)
    const { loadPosts } = useActions(timelineLogic)
    const navigate = useNavigate()

    const unfollowFeed = async (e: Event, feedUuid: string) => {
        e.stopPropagation()
        await api.post('/user/unfollow_feed', { feed_uuid: feedUuid })
        if (!isExplorePage) {
            loadPosts()
            loadUser()
        }
        const newLocalUser = {
            ...localUser,
            feeds_following: ((localUser || user!).feeds_following || []).filter((uuid: string) => uuid !== feedUuid),
        }
        setLocalUser(newLocalUser as User)
    }

    const followFeed = async (e: Event, feedUuid: string) => {
        e.stopPropagation()
        await api.post('/user/follow_feed', { feed_uuid: feedUuid })
        if (!isExplorePage) {
            loadPosts()
            loadUser()
        }
        const newLocalUser = {
            ...localUser,
            feeds_following: [...(localUser || user!).feeds_following, feedUuid],
        }
        setLocalUser(newLocalUser as User)
    }

    const handleTitleClick = (e: Event) => {
        e.stopPropagation()
        navigate(`/feed/${feedUuid}`)
    }

    const FollowButton = () => (
        <Button disabled={!user} type="dashed" size="small" onClick={(e) => followFeed(e as any, feedUuid)}>
            Follow
        </Button>
    )

    const UnfollowButton = () => (
        <Button type="primary" size="small" onClick={(e) => unfollowFeed(e as any, feedUuid)}>
            Following
        </Button>
    )

    return (
        <Row
            align="middle"
            gutter={2}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                marginTop: -8,
                zIndex: 101,
            }}
        >
            <Col>
                <p style={{ marginRight: 10, zIndex: 100 }} onClick={(e) => handleTitleClick(e as any)}>
                    {feedName}
                </p>
            </Col>
            <Col>
                {localUser?.feeds_following.includes(feedUuid) ? (
                    <UnfollowButton />
                ) : (
                    <>
                        {!!user ? (
                            <FollowButton />
                        ) : (
                            <Tooltip style={{ zIndex: 1000 }} title="You must login to follow feeds">
                                <FollowButton />
                            </Tooltip>
                        )}
                    </>
                )}
            </Col>
        </Row>
    )
}

const PostCard = ({ post, isExplorePage }: { post: Post; isExplorePage?: boolean }) => {
    const navigate = useNavigate()
    const logic = postLogic({ postUuid: post.post_uuid })
    const { post: updatedPost } = useValues(logic)
    const { likePost, unlikePost } = useActions(logic)

    const handleLikeButtonClick = (e: Event) => {
        e.stopPropagation()
        if ((updatedPost || post).liked_by_user) {
            unlikePost()
        } else {
            likePost()
        }
    }

    return (
        <Card
            className="timeline-post-card"
            key={post.post_uuid}
            hoverable
            style={{ marginBottom: 20, borderRadius: '10px' }}
            onClick={() => navigate(`/post/${post.post_uuid}`)}
            actions={[
                <div
                    onClick={(e) => handleLikeButtonClick(e as any)}
                    className={`like-post ${post.liked_by_user ? 'active' : ''}`}
                >
                    <LikeOutlined key="like" />
                    <span style={{ paddingLeft: 8 }}>{(updatedPost || post).post_like_count}</span>
                </div>,
                <div className="comment-post" onClick={() => document.getElementById('post-comment-textarea')?.focus()}>
                    <MessageOutlined key="comment" />
                    <span style={{ paddingLeft: 8 }}>{post.post_comment_count}</span>
                </div>,
                <span
                    key="link"
                    onClick={(e) => {
                        e.stopPropagation()
                        window.open(post.post_url, '_blank')
                    }}
                >
                    <LinkOutlined />
                    <span style={{ paddingLeft: 8 }}>View</span>
                </span>,
            ]}
        >
            <Card.Meta
                avatar={
                    <Avatar
                        src={
                            !!post.feed_picture_url
                                ? post.feed_picture_url
                                : getGravatarUrl(post.feed_uuid, GravatarDefaultType.Retro)
                        }
                    />
                }
                title={
                    <PostCardTitle feedName={post.feed_name} feedUuid={post.feed_uuid} isExplorePage={isExplorePage} />
                }
                description={
                    <div>
                        <p
                            style={{
                                marginTop: 0,
                                marginBottom: 0,
                                fontSize: 20,
                                color: 'black',
                            }}
                        >
                            {post.post_name}
                        </p>
                        <p>{htmlToText(post.post_description)}</p>
                        <small>{new Date(post.post_published_date).toLocaleString()}</small>
                    </div>
                }
            />
        </Card>
    )
}

export { PostCard }
