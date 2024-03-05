import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  BarsOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useActions } from "kea";
import { newFeedModalLogic } from "./new-feed-modal/newFeedModalLogic";

const { Sider } = Layout;

const SideNav = () => {
  const { setIsModalOpen } = useActions(newFeedModalLogic);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sider
      width={200}
      className="side-nav"
      style={{
        marginTop: 100,
        background: "transparent",
        marginLeft: "auto",
        marginRight: 20,
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={location.pathname.split("/").filter((i) => i)}
        style={{ height: "100%", borderRight: 0, background: "transparent" }}
        items={[
          {
            key: "timeline",
            icon: <HomeOutlined />,
            label: "Home",
            onClick: () => navigate("/timeline"),
          },
          {
            key: "following",
            icon: <BarsOutlined />,
            label: "Following",
            onClick: () => navigate("/following"),
          },
          {
            key: "explore",
            icon: <SearchOutlined />,
            label: "Explore",
            onClick: () => navigate("/explore"),
          },
          {
            key: "profile",
            icon: <UserOutlined />,
            label: "Profile",
            onClick: () => navigate("/profile"),
          },
          {
            key: "button",
            icon: null,
            label: (
              <Button
                type="primary"
                size="large"
                onClick={() => setIsModalOpen(true)}
              >
                Import feed
              </Button>
            ),
            className: "menu-btn",
          },
        ]}
      />
    </Sider>
  );
};

export { SideNav };
