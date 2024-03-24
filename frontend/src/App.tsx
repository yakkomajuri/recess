import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { TimelinePage } from './pages/TimelinePage'
import { useValues } from 'kea'
import { User, userLogic } from './userLogic'
import { FeedPage } from './pages/FeedPage'
import { FollowingPage } from './pages/FollowingPage'
import { ExplorePage } from './pages/ExplorePage'
import { PostPage } from './pages/PostPage'
import { ProfilePage } from './pages/ProfilePage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PublicProfilePage } from './pages/PublicProfilePage'


const RedirectToLogin = () => {
    const location = useLocation();
    const redirectPath = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?redirect_path=${encodeURIComponent(redirectPath)}`} replace />;
}

const PostPageWrapper = ({ user }: { user: User | null }) => {
    const location = useLocation()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, _] = useSearchParams() 

    // this is used to enable our widget feature
    // unlike other restricted pages like Profile,
    // we actually want to show posts when users are not logged in
    // but we want them to log in if the widget is being used to create a comment
    if (searchParams.get('comment_text') && !user) {
        const redirectPath = `${location.pathname}${location.search}`
        return <Navigate to={`/login?redirect_path=${encodeURIComponent(redirectPath)}`} replace />

    }
    return <PostPage />
}

const App = () => {
    const { user, userLoading } = useValues(userLogic)

    if (userLoading) {
        return null
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={!!user ? <Navigate to="/timeline" replace /> : <Navigate to="/explore" replace />}
                />
                <Route path="/login" element={!!user ? <Navigate to="/timeline" replace /> : <LoginPage />} />
                <Route path="/timeline" element={!!user ? <TimelinePage /> : <RedirectToLogin />} />
                <Route path="/feeds" element={!!user ? <FollowingPage /> : <RedirectToLogin />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/profile" element={!!user ? <ProfilePage /> : <RedirectToLogin />} />
                <Route path="/feed/:feed_uuid" element={<FeedPage />} />
                <Route path="/post/:post_uuid" element={<PostPageWrapper user={user} />} />
                <Route path="/search/:search" element={<SearchResultsPage />} />
                <Route path="/user/:username" element={<PublicProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

export default App
