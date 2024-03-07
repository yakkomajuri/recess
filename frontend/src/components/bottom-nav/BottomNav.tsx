import React from 'react'
import { HomeOutlined, SearchOutlined, PlusCircleFilled, BarsOutlined, UserOutlined } from '@ant-design/icons'
import './BottomNav.css'
import { useNavigate } from 'react-router-dom'
import { useActions } from 'kea'
import { newFeedModalLogic } from '../new-feed-modal/newFeedModalLogic'

const BottomNav = () => {
    const navigate = useNavigate()
    const { setIsModalOpen } = useActions(newFeedModalLogic)

    return (
        <div className="bottom-nav">
            <a onClick={() => navigate('/timeline')} className="icon-holder">
                <HomeOutlined />
            </a>
            <a onClick={() => navigate('/following')} className="icon-holder">
                <BarsOutlined />
            </a>
            <a onClick={() => setIsModalOpen(true)} className="icon-holder">
                <PlusCircleFilled />
            </a>
            <a onClick={() => navigate('/explore')} className="icon-holder">
                <SearchOutlined />
            </a>
            <a onClick={() => navigate('/profile')} className="icon-holder">
                <UserOutlined />
            </a>
        </div>
    )
}

export { BottomNav }
