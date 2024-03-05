import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { TimelinePage } from './pages/TimelinePage'
import { useValues } from 'kea'
import { userLogic } from './userLogic'
import { FeedPage } from './pages/FeedPage'
import { FollowingPage } from './pages/FollowingPage'
import { ExplorePage } from './pages/ExplorePage'
import { PostPage } from './pages/PostPage'
import { ProfilePage } from './pages/ProfilePage'

const App = () => {
    const { user, userLoading } = useValues(userLogic)

    if (userLoading) {
        return null
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/timeline" replace />} />
                <Route path="/login" element={!!user ? <Navigate to="/timeline" replace /> : <LoginPage />} />
                <Route path="/timeline" element={!!user ? <TimelinePage /> : <Navigate to="/login" replace />} />
                <Route path="/following" element={!!user ? <FollowingPage /> : <Navigate to="/login" replace />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/profile" element={!!user ? <ProfilePage /> : <Navigate to="/login" replace />} />
                <Route path="/feed/:feed_uuid" element={<FeedPage />} />
                <Route path="/post/:post_uuid" element={<PostPage />} />
            </Routes>
        </Router>
    )
}

export default App
