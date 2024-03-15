import React from 'react'

import { useValues } from 'kea'
import { userLogic } from '../userLogic'
import { Col, Divider, Empty, Row } from 'antd'
import { FeedCard } from './feed/FeedCard'
import { InfoCircleOutlined } from '@ant-design/icons'

export const MyFeeds = () => {
    const { user } = useValues(userLogic)

    return (
        <>
            <br />
            <details>
                <summary style={{ cursor: 'pointer', fontWeight: 500, fontSize: 18 }}>What's this?</summary>
                <p style={{ color: '#383838' }}>You own a feed when your <b>verified</b> email matches the publisher email defined on the feed. Currently you can't do anything by owning a feed, but you'll soon be able to change its display name, avatar, and description, import comments from elsewhere and perform other management functionalities. </p>
                <small><InfoCircleOutlined />{' '}The publisher email is pulled from one of the following: <code>/rdf:RDF/rdf:channel/dc:publisher</code>, <code>/rss/channel/dc:publisher</code>, <code>/rss/channel/itunes:owner</code>, <code>/rss/channel/webMaster </code>
                </small>
            </details>
            <Divider />
            {user!.feeds_owned.length > 0 ? (
                user!.feeds_owned.map((feed_uuid: string) => (
                    <Row style={{ width: '100%', marginBottom: 10 }}>
                        <Col style={{ width: '100%' }}>
                            <FeedCard feedUuid={feed_uuid} />
                        </Col>
                    </Row>
                ))
            ) : (
                <Row style={{ width: '100%', marginBottom: 10 }}>
                    <Col style={{ width: '100%' }}>
                        <Empty
                            style={{ marginTop: 50 }}
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span style={{ color: '#626262' }}>
                                    You don't own any feeds yet.
                                </span>
                            }
                        />
                    </Col>
                </Row>
            )}
        </>
    )
}

