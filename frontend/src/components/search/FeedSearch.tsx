import React from 'react'
import Search from 'antd/es/input/Search'
import './Search.css'
import { useNavigate } from 'react-router-dom'

const FeedSearch = () => {
    const navigate = useNavigate()

    return (
        <Search
            className="feed-search"
            placeholder="Search feeds and users"
            onSearch={(value) => navigate(`/search/${value}`)}
        />
    )
}

export { FeedSearch }
