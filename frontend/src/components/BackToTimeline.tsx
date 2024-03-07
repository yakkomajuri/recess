import React from 'react'
import { Col, Row } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const BackToTimeline = () => {
    const navigate = useNavigate()
    return (
        <Row style={{ width: '100%' }} className="back-to-timeline-btn">
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <div onClick={() => navigate('/timeline')}>
                    <ArrowLeftOutlined /> back to timeline
                </div>
            </Col>
        </Row>
    )
}

export { BackToTimeline }
