import React from 'react'
import { Avatar, Layout, Tooltip, notification } from 'antd'
import { LogoutOutlined, LoginOutlined } from '@ant-design/icons'
import { api } from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import { useActions, useValues } from 'kea'
import { userLogic } from '../../userLogic'
import { getGravatarUrl } from '../../lib/gravatar'
import { usePostHog } from 'posthog-js/react'

const { Header } = Layout

const TimelineHeader = () => {
    const navigate = useNavigate()
    const { setUser } = useActions(userLogic)
    const { user } = useValues(userLogic)

    const posthog = usePostHog()

    const handleLogout = async (values: any) => {
        try {
            await api.post('/user/logout')
            document.cookie = 'authtoken=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
            document.cookie = 'csrftoken=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
            setUser(null)
            posthog.reset()
            navigate('/login')
        } catch (error) {
            notification.error({
                message: 'Unable to logout. Please try again later.',
            })
        }
    }
    return (
        <Header
            className="app-header"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgb(249 249 249)',
                borderBottom: '0.5px solid #e1e1e1',
                marginBottom: 20,
                padding: '0 20px',
            }}
        >
            {/* Invisible spacer to balance the layout */}
            <div style={{ flex: 1 }}>
                {user ? (
                    <Avatar
                        src={getGravatarUrl(user.email)}
                        onClick={() => navigate('/profile')}
                        style={{
                            cursor: 'pointer',
                            boxShadow:
                                '0 1px 2px -2px rgba(0, 0, 0, 0.16),0 3px 6px 0 rgba(0, 0, 0, 0.12),0 5px 12px 4px rgba(0, 0, 0, 0.09)',
                        }}
                    />
                ) : null}
            </div>
            <div className="platform-name" onClick={() => navigate('/timeline')} style={{ cursor: 'pointer' }}>
                recess<sup style={{ fontSize: 10, marginLeft: 1 }}>BETA</sup>
            </div>
            {user ? (
                <Tooltip title="Logout">
                    <LogoutOutlined
                        rotate={180}
                        onClick={handleLogout}
                        style={{ fontSize: 20, color: 'rgb(138 169 193)', cursor: 'pointer' }}
                    />
                </Tooltip>
            ) : (
                <Tooltip title="Login">
                    <LoginOutlined
                        rotate={180}
                        onClick={() => navigate('/login')}
                        style={{ fontSize: 20, color: 'rgb(138 169 193)', cursor: 'pointer' }}
                    />
                </Tooltip>
            )}
        </Header>
    )
}

export { TimelineHeader }
