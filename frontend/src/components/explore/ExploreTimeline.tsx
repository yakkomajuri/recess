import React from 'react'
import { Col, Row, Skeleton, Spin } from 'antd'
import { useValues } from 'kea'
import { Post } from '../post/postLogic'
import { exploreLogic } from './exploreLogic'
import { PostCard } from '../post/PostCard'

const ExploreTimeline = () => {
    const { explorePosts, explorePostsLoading } = useValues(exploreLogic)

    return (
        <Row style={{ width: '100%' }}>
            <Col style={{ width: '100%' }}>
                {explorePostsLoading ? (
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
                        {(explorePosts || []).map((post: Post) => (
                            <PostCard isExplorePage post={post} key={post.post_uuid} />
                        ))}
                    </>
                )}
            </Col>
        </Row>
    )
}

export { ExploreTimeline }
