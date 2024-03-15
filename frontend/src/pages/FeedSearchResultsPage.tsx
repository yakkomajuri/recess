import React from 'react'
import { Col, Empty, Layout, Row, Spin } from 'antd'
import { NewFeedModal } from '../components/new-feed-modal/NewFeedModal'
import { SideNav } from '../components/SideNav'
import { TimelineHeader } from '../components/timeline/TimelineHeader'
import { FeedCard } from '../components/feed/FeedCard'
import { useValues } from 'kea'
import { Trending } from '../components/trending/Trending'
import { BottomNav } from '../components/bottom-nav/BottomNav'
import { useParams } from 'react-router-dom'
import { searchLogic } from '../components/search/searchLogic'
import { FeedSearch } from '../components/search/FeedSearch'

const { Content } = Layout

const FeedSearchResultsPage = () => {
    const { search } = useParams()
    const logic = searchLogic({ searchParam: search })
    const { feeds, feedsLoading } = useValues(logic)

    return (
        <Layout style={{ minHeight: '100vh' }} className="following-page">
            <TimelineHeader />
            <Layout>
                <Layout>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Row>
                            <Col span={6} xs={0} sm={6}>
                                <SideNav />
                            </Col>
                            <Col span={12} xs={24} sm={12}>
                                {feeds.length > 0 ? (
                                    <>
                                        <p style={{ fontSize: 20, fontWeight: 300, color: '#6f6f6f' }}>
                                            Showing {feeds.length} search result{feeds.length > 1 ? 's' : ''} for{' '}
                                            <i>{search}</i>
                                        </p>
                                        <br />
                                        {feeds.map(({ feed_uuid }) => (
                                            <Row style={{ width: '100%', marginBottom: 10 }}>
                                                <Col style={{ width: '100%' }}>
                                                    <FeedCard feedUuid={feed_uuid} />
                                                </Col>
                                            </Row>
                                        ))}
                                    </>
                                ) : (
                                    <Row style={{ width: '100%', marginBottom: 10 }}>
                                        <Col style={{ width: '100%' }}>
                                            {feedsLoading ? (
                                                <Spin
                                                    size="large"
                                                    style={{
                                                        marginTop: 100,
                                                        display: 'block',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                    }}
                                                />
                                            ) : (
                                                <Empty
                                                    style={{ marginTop: 100 }}
                                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                    description={
                                                        <span style={{ color: '#626262' }}>
                                                            Your search didn't yield any results :(
                                                        </span>
                                                    }
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                            <Col span={6} xs={0} sm={6}>
                                <Trending />
                                <FeedSearch />
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

export { FeedSearchResultsPage }
