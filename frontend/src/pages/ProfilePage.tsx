import React from 'react'
import { Col, Layout, Row } from 'antd'
import '../App.css'
import { NewFeedModal } from '../components/new-feed-modal/NewFeedModal'
import { SideNav } from '../components/SideNav'
import { TimelineHeader } from '../components/timeline/TimelineHeader'
import { Profile } from '../components/profile/Profile'
import { BottomNav } from '../components/bottom-nav/BottomNav'

const { Content } = Layout

const ProfilePage = () => {
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
                            <Col span={18} xs={24} sm={18}>
                                <Row style={{ width: '100%', marginBottom: 10 }}>
                                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                        <Profile />
                                    </Col>
                                </Row>
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

export { ProfilePage }
