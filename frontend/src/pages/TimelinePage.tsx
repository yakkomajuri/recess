import React from 'react'
import { Col, Layout, Row } from 'antd'
import { Timeline } from '../components/timeline/Timeline'
import '../App.css'
import { NewFeedModal } from '../components/new-feed-modal/NewFeedModal'
import { SideNav } from '../components/SideNav'
import { TimelineHeader } from '../components/timeline/TimelineHeader'
import { Trending } from '../components/trending/Trending'
import { BottomNav } from '../components/bottom-nav/BottomNav'
import { FeedSearch } from '../components/search/FeedSearch'
import { WelcomeMesage } from '../components/WelcomeMessage'

const { Content } = Layout

const TimelinePage = () => {
    return (
        <Layout style={{ height: '100vh' }}>
            <TimelineHeader />
            <Layout>
                <Layout>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Row>
                            <Col span={6} xs={0} sm={6}>
                                <SideNav />
                            </Col>
                            <Col span={12} xs={24} sm={12}>
                                <WelcomeMesage />
                                <Timeline />
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

export { TimelinePage }
