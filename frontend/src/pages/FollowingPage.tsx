import React from 'react'
import { Col, Layout, Row, Tabs } from 'antd'
import '../App.css'
import { NewFeedModal } from '../components/new-feed-modal/NewFeedModal'
import { SideNav } from '../components/SideNav'
import { TimelineHeader } from '../components/timeline/TimelineHeader'
import { Trending } from '../components/trending/Trending'
import { BottomNav } from '../components/bottom-nav/BottomNav'
import { FeedSearch } from '../components/search/FeedSearch'
import { Following } from '../components/Following'
import { MyFeeds } from '../components/MyFeeds'

const { Content } = Layout

const FollowingPage = () => {
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
                                <br />
                                <br />
                                <Tabs
                                    defaultActiveKey="login"
                                    items={[
                                        {
                                            key: 'following',
                                            label: 'Following',
                                            children: <Following />,
                                        },
                                        {
                                            key: 'my-feeds',
                                            label: 'My feeds',
                                            children: <MyFeeds />,
                                        },
                                    ]}
                                />
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

export { FollowingPage }
