import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { TimelinePage } from "./pages/TimelinePage";
import { FeedPage } from "./pages/FeedPage";
import { FollowingPage } from "./pages/FollowingPage";
import { ExplorePage } from "./pages/ExplorePage";
import { PostPage } from "./pages/PostPage";
import { ProfilePage } from "./pages/ProfilePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider, useUserDetails } from "./userLogic";

const App = ({ queryClient }: { queryClient: QueryClient }) => {
  const { user } = useUserDetails();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/timeline" replace />} />
            <Route
              path="/login"
              element={
                !!user ? <Navigate to="/timeline" replace /> : <LoginPage />
              }
            />
            <Route
              path="/timeline"
              element={
                !!user ? <TimelinePage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/following"
              element={
                !!user ? <FollowingPage /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/explore" element={<ExplorePage />} />
            <Route
              path="/profile"
              element={
                !!user ? <ProfilePage /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/feed/:feed_uuid" element={<FeedPage />} />
            <Route path="/post/:post_uuid" element={<PostPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
