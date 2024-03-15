import React from 'react'
import { Col, Layout, Row } from 'antd'
import '../App.css'
import { NewFeedModal } from '../components/new-feed-modal/NewFeedModal'
import { SideNav } from '../components/SideNav'
import { TimelineHeader } from '../components/timeline/TimelineHeader'
import { Trending } from '../components/trending/Trending'
import { BottomNav } from '../components/bottom-nav/BottomNav'
import { FeedSearch } from '../components/search/FeedSearch'

const { Content } = Layout

// 404 Page
const NotFoundPage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }} className="explore-page">
            <TimelineHeader />
            <Layout>
                <Layout>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Row>
                            <Col span={6} xs={0} sm={6}>
                                <SideNav />
                            </Col>
                            <Col span={12} xs={24} sm={12}>
                                <p
                                    style={{
                                        color: '#6f6f6f',
                                        fontSize: 160,
                                        textAlign: 'center',
                                        marginTop: 100,
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        display: 'block',
                                        marginBottom: 0,
                                        paddingBottom: 0,
                                    }}
                                >
                                    404
                                </p>
                                <p style={{ textAlign: 'center', color: '#6f6f6f', fontSize: 24 }}>
                                    <i>Sorry, ain't nothin' here</i>
                                </p>
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

export { NotFoundPage }
