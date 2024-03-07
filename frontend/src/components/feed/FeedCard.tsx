import React from 'react'
import { Card, Avatar, Row, Col, Button } from 'antd'
import { UserOutlined, LinkOutlined } from '@ant-design/icons'
import { feedLogic } from './feedLogic'
import { useActions, useValues } from 'kea'
import { userLogic } from '../../userLogic'
import { api } from '../../lib/api'
import { Post } from '../post/postLogic'
import { useNavigate } from 'react-router-dom'
import { GravatarDefaultType, getGravatarUrl } from '../../lib/gravatar'

const FeedCardTitle = ({ feedName, feedUuid }: { feedName: Post['feed_name']; feedUuid: Post['feed_uuid'] }) => {
    const { user } = useValues(userLogic)
    const { loadUser } = useActions(userLogic)
    const navigate = useNavigate()

    const unfollowFeed = async (e: Event, feedUuid: string) => {
        await api.post('/user/unfollow_feed', { feed_uuid: feedUuid })
        loadUser()
    }

    const followFeed = async (e: Event, feedUuid: string) => {
        await api.post('/user/follow_feed', { feed_uuid: feedUuid })
        loadUser()
    }
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
                <p style={{ marginRight: 10 }} onClick={() => navigate(`/feed/${feedUuid}`)}>
                    {feedName}
                </p>
            </Col>
            <Col>
                {user?.feeds_following.includes(feedUuid) ? (
                    <Button type="primary" size="small" onClick={(e) => unfollowFeed(e as any, feedUuid)}>
                        Following
                    </Button>
                ) : (
                    <Button type="dashed" size="small" onClick={(e) => followFeed(e as any, feedUuid)}>
                        Follow
                    </Button>
                )}
            </Col>
        </Row>
    )
}

const FeedCard = ({ feedUuid }: { feedUuid?: string }) => {
    const logic = feedLogic({ feedUuid })
    const { feed } = useValues(logic)

    if (!feed) {
        return null
    }

    return (
        <Card
            className="feed-card"
            style={{ borderRadius: 0 }}
            actions={[
                <span key="followers">
                    <UserOutlined />
                    <span style={{ paddingLeft: 8 }}>{feed.feed_follower_count}</span>
                </span>,
                <span
                    key="link"
                    onClick={(e) => {
                        e.stopPropagation()
                        window.open(feed.feed_url, '_blank')
                    }}
                >
                    <LinkOutlined />
                    <span style={{ paddingLeft: 8 }}>Access raw feed</span>
                </span>,
            ]}
        >
            <Card.Meta
                avatar={
                    <Avatar
                        src={feed.feed_picture_url || getGravatarUrl(feed.feed_uuid, GravatarDefaultType.Identicon)}
                    />
                }
                title={<FeedCardTitle feedName={feed.feed_name} feedUuid={feedUuid!} />}
                description={
                    <div>
                        <p style={{ marginBottom: 0, fontSize: 16, color: 'black' }}>{feed.feed_description}</p>
                    </div>
                }
            />
        </Card>
    )
}

export { FeedCard }
