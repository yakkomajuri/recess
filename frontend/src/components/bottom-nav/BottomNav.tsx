/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { HomeOutlined, SearchOutlined, PlusCircleFilled, BarsOutlined, UserOutlined } from '@ant-design/icons'
import './BottomNav.css'
import { useNavigate } from 'react-router-dom'
import { useActions, useValues } from 'kea'
import { newFeedModalLogic } from '../new-feed-modal/newFeedModalLogic'
import { userLogic } from '../../userLogic'

const BottomNav = () => {
    const { user } = useValues(userLogic)
    const { setIsModalOpen } = useActions(newFeedModalLogic)

    const navigate = useNavigate()

    const importButtonClick = () => {
        if (!!user) {
            setIsModalOpen(true)
            return
        }
        navigate('/login')
    }

    return (
        <div className="bottom-nav">
            <a onClick={() => navigate('/timeline')} className="icon-holder">
                <HomeOutlined />
            </a>
            <a onClick={() => navigate('/feeds')} className="icon-holder">
                <BarsOutlined />
            </a>
            <a className="icon-holder" onClick={importButtonClick}>
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
