import React from 'react'
import { Button, Col, Row, Skeleton, Spin } from 'antd'
import { PostCard } from '../post/PostCard'
import { useActions, useValues } from 'kea'
import { timelineLogic } from './timelineLogic'

const Timeline = () => {
    const { posts, postMetadata, postMetadataLoading } = useValues(timelineLogic)
    const { loadPosts } = useActions(timelineLogic)

    return (
        <Row style={{ width: '100%' }}>
            <Col style={{ width: '100%' }}>
                {postMetadataLoading && posts.length === 0 ? (
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
                    <div style={{ marginBottom: 40 }}>
                        {posts.map((post) => (
                            <PostCard post={post} key={post.post_uuid} />
                        ))}
                        {!!postMetadata.next_page ? (
                            <Button style={{ width: '100%' }} onClick={() => loadPosts()}>
                                {postMetadataLoading ? <Spin /> : 'Load more'}
                            </Button>
                        ) : null}
                    </div>
                )}
            </Col>
        </Row>
    )
}

export { Timeline }
