import React from 'react'
import { Card, Avatar } from 'antd'
import { useValues } from 'kea'
import { feedLogic } from './feedLogic'
import { GravatarDefaultType, getGravatarUrl } from '../../lib/gravatar'
import { Post } from '../post/postLogic'
import { useNavigate } from 'react-router-dom'
import { trimString } from '../../lib/stringUtils'
import './FeedPreview.css'

const FeedPreviewTitle = ({ feedName, feedUuid }: { feedName: Post['feed_name']; feedUuid: Post['feed_uuid'] }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                marginTop: -8,
                zIndex: 101,
                cursor: 'pointer',
            }}
        >
            <p style={{ marginRight: 10, fontSize: 14, marginBottom: 2 }}>{feedName}</p>
        </div>
    )
}

const FeedPreview = ({ feedUuid }: { feedUuid?: string }) => {
    const navigate = useNavigate()
    const logic = feedLogic({ feedUuid })
    const { feed } = useValues(logic)

    if (!feed) {
        return null
    }

    return (
        <div className="feed-preview">
            <Card
                hoverable
                style={{ borderRadius: 0, paddingBottom: 2 }}
                onClick={() => navigate(`/feed/${feedUuid}`)}
                className='feed-preview-card'
            >
                <Card.Meta
                    avatar={
                        <Avatar
                            src={feed.feed_picture_url || getGravatarUrl(feed.feed_uuid, GravatarDefaultType.Retro)}
                        />
                    }
                    title={<FeedPreviewTitle feedName={feed.feed_name} feedUuid={feedUuid!} />}
                    description={
                        <div>
                            <p style={{ fontSize: 14, color: 'black', marginBottom: 2 }}>{trimString(feed.feed_description, 100)}</p>
                        </div>
                    }
                />
            </Card>
        </div>
    )
}

export { FeedPreview }
