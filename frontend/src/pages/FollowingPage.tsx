import React, { useState } from "react";
import { Col, Empty, Layout, Row, Tabs } from "antd";
import { Timeline } from "../components/timeline/Timeline";
import "../App.css";
import { NewFeedModal } from "../components/new-feed-modal/NewFeedModal";
import { SideNav } from "../components/SideNav";
import { TimelineHeader } from "../components/timeline/TimelineHeader";
import { FeedCard } from "../components/feed/FeedCard";
import { useParams } from "react-router-dom";
import { feedLogic } from "../components/feed/feedLogic";
import { useValues } from "kea";
import { PostCard } from "../components/post/PostCard";
import { Post } from "../components/post/postLogic";
import { BackToTimeline } from "../components/BackToTimeline";
import { userLogic } from "../userLogic";
import { Trending } from "../components/trending/Trending";
import { BottomNav } from "../components/bottom-nav/BottomNav";

const { Content } = Layout;

const FollowingPage = () => {
  const { user } = useValues(userLogic);

  return (
    <Layout style={{ minHeight: "100vh" }} className="following-page">
      <TimelineHeader />
      <Layout>
        <Layout>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Row>
            <Col span={6} xs={0} sm={6}>
                <SideNav />
              </Col>
              <Col span={12} xs={24} sm={12}>
                {user!.feeds_following.length > 0 ? (
                  user!.feeds_following.map((feed_uuid: string) => (
                    <Row style={{ width: "100%", marginBottom: 10 }}>
                      <Col style={{ width: "100%" }}>
                        <FeedCard feedUuid={feed_uuid} />
                      </Col>
                    </Row>
                  ))
                ) : (
                  <Row style={{ width: "100%", marginBottom: 10 }}>
                    <Col style={{ width: "100%" }}>
                      <Empty
                        style={{ marginTop: 100 }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                          <span style={{ color: "#626262" }}>
                            You don't follow any feeds yet.
                          </span>
                        }
                      />
                    </Col>
                  </Row>
                )}
              </Col>
              <Col span={6} xs={0} sm={6}>
                <Trending />
              </Col>
            </Row>
          </Content>
          <BottomNav />
        </Layout>
      </Layout>
      <NewFeedModal />
    </Layout>
  );
};

export { FollowingPage };
