import React from "react";
import { Col, Layout, Row, Tabs } from "antd";
import "../App.css";
import { NewFeedModal } from "../components/new-feed-modal/NewFeedModal";
import { SideNav } from "../components/SideNav";
import { TimelineHeader } from "../components/timeline/TimelineHeader";
import { ExploreTimeline } from "../components/explore/ExploreTimeline";
import { useValues } from "kea";
import { newFeedModalLogic } from "../components/new-feed-modal/newFeedModalLogic";
import { Trending } from "../components/trending/Trending";

const { Content } = Layout;

const ExplorePage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }} className="explore-page">
      <TimelineHeader />
      <Layout>
        <Layout>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Row>
              <Col span={6}>
                <SideNav />
              </Col>
              <Col span={12}>
                <ExploreTimeline />
              </Col>
              <Col span={6}>
                <Trending />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
      <NewFeedModal />
    </Layout>
  );
};

export { ExplorePage };
