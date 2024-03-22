import React from 'react'
import { Col, Layout, Row } from 'antd'
import '../App.css'
import { NewFeedModal } from '../components/new-feed-modal/NewFeedModal'
import { SideNav } from '../components/SideNav'
import { TimelineHeader } from '../components/timeline/TimelineHeader'
import { BottomNav } from '../components/bottom-nav/BottomNav'
import { Trending } from '../components/trending/Trending'
import { FeedSearch } from '../components/search/FeedSearch'
import { PublicProfile } from '../components/public-profile/PublicProfile'

const { Content } = Layout

const PublicProfilePage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }} className="public-profile-page">
            <TimelineHeader />
            <Layout>
                <Layout>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Row>
                            <Col span={6} xs={0} sm={6}>
                                <SideNav />
                            </Col>
                            <Col span={12} xs={24} sm={12}>
                                <Row style={{ width: '100%', marginBottom: 10 }}>
                                    <Col span={24}>
                                        <PublicProfile />
                                    </Col>
                                </Row>
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

export { PublicProfilePage }
