import React from 'react'
import { Button, Col, Row, Skeleton, Spin } from 'antd'
import { useActions, useValues } from 'kea'
import { Post } from '../post/postLogic'
import { exploreLogic } from './exploreLogic'
import { PostCard } from '../post/PostCard'

const ExploreTimeline = () => {
    const { explorePosts, explorePostMetadata, explorePostMetadataLoading } = useValues(exploreLogic)
    const { loadExplorePostMetadata } = useActions(exploreLogic)

    return (
        <Row style={{ width: '100%' }}>
            <Col style={{ width: '100%' }}>
                {explorePostMetadataLoading && explorePosts.length === 0 ? (
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
                        {explorePosts.map((post: Post) => (
                            <PostCard isExplorePage post={post} key={post.post_uuid} />
                        ))}
                        {!!explorePostMetadata.next_page ? (
                            <Button style={{ width: '100%' }} onClick={() => loadExplorePostMetadata()}>
                                {explorePostMetadataLoading ? <Spin /> : 'Load more'}
                            </Button>
                        ) : null}
                    </div>
                )}
            </Col>
        </Row>
    )
}

export { ExploreTimeline }
