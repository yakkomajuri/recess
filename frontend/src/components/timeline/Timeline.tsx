import React from 'react'
import { Col, Row, Skeleton, Spin } from 'antd'
import { PostCard } from '../post/PostCard'
import { useValues } from 'kea'
import { timelineLogic } from './timelineLogic'
import { Post } from '../post/postLogic'

const Timeline = () => {
    const { posts, postsLoading } = useValues(timelineLogic)

    return (
        <Row style={{ width: '100%' }}>
            <Col>
                {postsLoading ? (
                    <>
                        <Skeleton avatar paragraph={{ rows: 4 }} />
                        <br />
                        <Skeleton avatar paragraph={{ rows: 4 }} />
                        <br />
                        <Skeleton avatar paragraph={{ rows: 4 }} />
                        <br />
                        <Skeleton avatar paragraph={{ rows: 4 }} />
                        <br />
                        <Skeleton avatar paragraph={{ rows: 4 }} />
                        <br />
                    </>
                ) : (
                    <>
                        {(posts || []).map((post: Post) => (
                            <PostCard post={post} key={post.post_uuid} />
                        ))}
                    </>
                )}
            </Col>
        </Row>
    )
}

export { Timeline }
