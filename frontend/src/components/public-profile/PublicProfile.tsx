/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Avatar, Col, Row, Divider } from 'antd'
import { api } from '../../lib/api'
import '../profile/Profile.css' // Import the CSS for additional styling
import { FeedPreview } from '../feed/FeedPreview'
import { useParams } from 'react-router-dom'
import { Feed } from '../feed/feedLogic'

export interface PublicUser {
    username: string
    bio: string
    email_hash: string // MD5 hash for Gravatar
    feeds_following: Feed['feed_uuid'][]
}

const PublicProfile = () => {
    const { username } = useParams()
    const [user, setUser] = useState<PublicUser | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/user/profile?username=${username}`)
                console.log(res)
                setUser(res.data)
            } catch (error) {}
        }

        fetchUser()
    }, [username])

    if (!user) {
        return null
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <Avatar size={64} src={`https://www.gravatar.com/avatar/${user.email_hash}?s=64&d=mp`} />
                <h2>{user.username}</h2>
            </div>
            <div className="profile-content">
                <div style={{ marginLeft: 20 }}>
                    <p style={{ color: !!user.bio ? 'default' : 'gray', marginBottom: 0 }}>
                        {user.bio ?? `This user doesn't have a bio yet.`}
                    </p>
                </div>

                <Divider />
                <h3 style={{ marginLeft: 20 }}>Following ({user.feeds_following.length})</h3>
                {user!.feeds_following.length > 0
                    ? user!.feeds_following.map((feed_uuid: string) => (
                          <Row style={{ width: '100%', marginBottom: 10 }}>
                              <Col style={{ width: '100%', marginLeft: 20 }}>
                                  <FeedPreview feedUuid={feed_uuid} />
                              </Col>
                          </Row>
                      ))
                    : null}
            </div>
        </div>
    )
}

export { PublicProfile }
