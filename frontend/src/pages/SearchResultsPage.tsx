import React from 'react'
import { Col, Divider, Layout, Row, Spin } from 'antd'
import { NewFeedModal } from '../components/new-feed-modal/NewFeedModal'
import { SideNav } from '../components/SideNav'
import { TimelineHeader } from '../components/timeline/TimelineHeader'
import { FeedCard } from '../components/feed/FeedCard'
import { useValues } from 'kea'
import { Trending } from '../components/trending/Trending'
import { BottomNav } from '../components/bottom-nav/BottomNav'
import { useNavigate, useParams } from 'react-router-dom'
import { searchLogic } from '../components/search/searchLogic'
import { FeedSearch } from '../components/search/FeedSearch'
import { trimString } from '../lib/stringUtils'
import '../components/comment/Comment.css'

const { Content } = Layout

const SearchResultsPage = () => {
    const { search } = useParams()
    const logic = searchLogic({ searchParam: search })
    const { feeds, feedsLoading, users, usersLoading } = useValues(logic)
    const navigate = useNavigate()

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
                                                <p style={{ fontSize: 20, fontWeight: 300, color: '#6f6f6f' }}>
                                                    0 feeds match your search for <i>{search}</i>
                                                </p>
                                            )}
                                        </Col>
                                    </Row>
                                )}
                                <Divider />
                                {users.length > 0 ? (
                                    <>
                                        <p style={{ fontSize: 20, fontWeight: 300, color: '#6f6f6f' }}>
                                            Showing {users.length} search result{users.length > 1 ? 's' : ''} for{' '}
                                            <i>{search}</i>
                                        </p>
                                        <br />
                                        {users.map((user) => (
                                            <Row style={{ width: '100%', marginBottom: 10 }}>
                                                <Col style={{ width: '100%' }}>
                                                    {/* Hacky using the comment's structure but hey, it works :D */}
                                                    <div
                                                        className="comment-container"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => navigate(`/user/${user.username}`)}
                                                    >
                                                        <div className="comment-avatar">
                                                            <img
                                                                src={`https://www.gravatar.com/avatar/${user.email_hash}?s=64&d=mp`}
                                                                alt={user.username}
                                                            />
                                                        </div>
                                                        <div className="comment-body">
                                                            <div className="comment-header">
                                                                <span
                                                                    className="comment-author"
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    {user.username}
                                                                </span>
                                                            </div>
                                                            <div className="comment-content">
                                                                {trimString(user.bio || '')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        ))}
                                    </>
                                ) : (
                                    <Row style={{ width: '100%', marginBottom: 10 }}>
                                        <Col style={{ width: '100%' }}>
                                            {usersLoading ? (
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
                                                <p style={{ fontSize: 20, fontWeight: 300, color: '#6f6f6f' }}>
                                                    0 users match your search for <i>{search}</i>
                                                </p>
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

export { SearchResultsPage }
