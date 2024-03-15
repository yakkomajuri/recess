import React from 'react'
import { List, Avatar } from 'antd'
import './Trending.css' // Import custom CSS for styling
import { useValues } from 'kea'
import { trendingLogic } from './trendingLogic'
import { GravatarDefaultType, getGravatarUrl } from '../../lib/gravatar'
import { useNavigate } from 'react-router-dom'

// Example data for trending posts
// const trendingPosts = [
//   { title: 'Turns Data And AI Algorithms Into Production-Ready Web Applications In No Time', likes: 320, avatar: 'https://via.placeholder.com/64' },
//   { title: 'Post 2', likes: 210, avatar: 'https://via.placeholder.com/64' },
//   // Add more posts...
// ]

const Trending: React.FC = () => {
    const { trendingFeeds } = useValues(trendingLogic)
    const navigate = useNavigate()

    return (
        <div className="trending-section">
            <h3>Trending 🔥</h3>
            {/* handle "no data" here */}
            <List
                header={<div>Feeds</div>}
                dataSource={trendingFeeds}
                renderItem={(feed) => (
                    <List.Item onClick={() => navigate(`/feed/${feed.feed_uuid}`)} className="trending-feeds-li">
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={
                                        feed.feed_picture_url ||
                                        getGravatarUrl(feed.feed_uuid, GravatarDefaultType.Identicon)
                                    }
                                />
                            }
                            title={feed.feed_name}
                            description={`${feed.feed_follower_count} following`}
                        />
                    </List.Item>
                )}
            />
            {/* <List
        header={<div>Posts</div>}
        dataSource={trendingPosts}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.title}
              description={<><LikeOutlined /> {item.likes}</>}
            />
          </List.Item>
        )}
      /> */}
        </div>
    )
}

export { Trending }
