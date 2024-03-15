import React from 'react'

import { useValues } from 'kea'
import { userLogic } from '../userLogic'
import { Col, Empty, Row } from 'antd'
import { FeedCard } from './feed/FeedCard'

export const Following = () => {
    const { user } = useValues(userLogic)

    return (
        <>
            <br />
            {user!.feeds_following.length > 0 ? (
                user!.feeds_following.map((feed_uuid: string) => (
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
                            style={{ marginTop: 100 }}
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span style={{ color: '#626262' }}>
                                    You don't follow any feeds yet.
                                </span>
                            }
                        />
                    </Col>
                </Row>
            )}
        </>
    )
}

