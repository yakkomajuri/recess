import React from 'react'
import { Col, Layout, Row } from 'antd'
import '../App.css'
import { NewFeedModal } from '../components/new-feed-modal/NewFeedModal'
import { SideNav } from '../components/SideNav'
import { TimelineHeader } from '../components/timeline/TimelineHeader'
import { FeedCard } from '../components/feed/FeedCard'
import { useParams } from 'react-router-dom'
import { feedLogic } from '../components/feed/feedLogic'
import { useValues } from 'kea'
import { PostCard } from '../components/post/PostCard'
import { Post } from '../components/post/postLogic'
import { BottomNav } from '../components/bottom-nav/BottomNav'

const { Content } = Layout

const FeedPage = () => {
    const { feed_uuid } = useParams()
    const logic = feedLogic({ feedUuid: feed_uuid })
    const { posts } = useValues(logic)

    return (
        <Layout style={{ minHeight: '100vh' }} className="feed-page">
            <TimelineHeader />
            <Layout>
                <Layout>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Row>
                            <Col span={6} xs={0} sm={6}>
                                <SideNav />
                            </Col>
                            <Col span={18} xs={24} sm={18}>
                                <Row style={{ width: '100%', marginBottom: 10 }}>
                                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                        <FeedCard feedUuid={feed_uuid} />
                                    </Col>
                                </Row>
                                <>
                                    {(posts || []).map((post: Post) => (
                                        <Row style={{ width: '100%' }}>
                                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                                <PostCard post={post} key={post.post_uuid} />
                                            </Col>
                                        </Row>
                                    ))}
                                </>
                            </Col>
                        </Row>
                    </Content>
                    <BottomNav />
                </Layout>
            </Layout>
            <NewFeedModal />
        </Layout>
    )
}

export { FeedPage }
