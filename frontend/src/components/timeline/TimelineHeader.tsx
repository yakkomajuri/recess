import React from 'react'
import { Layout, Tooltip, notification } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { api } from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import { useActions } from 'kea'
import { userLogic } from '../../userLogic'

const { Header } = Layout

const TimelineHeader = () => {
    const navigate = useNavigate()
    const { setUser } = useActions(userLogic)

    const handleLogout = async (values: any) => {
        try {
            const response = await api.post('/user/logout')
            document.cookie = 'csrftoken=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
            setUser(null)
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
            <div style={{ flex: 1 }}></div>
            <div className="platform-name" onClick={() => navigate('/timeline')} style={{ cursor: 'pointer' }}>
                recess
            </div>
            <Tooltip title="Logout">
                <LogoutOutlined
                    rotate={180}
                    onClick={handleLogout}
                    style={{ fontSize: 20, color: 'rgb(138 169 193)', cursor: 'pointer' }}
                />
            </Tooltip>
        </Header>
    )
}

export { TimelineHeader }
