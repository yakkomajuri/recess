import React from "react";
import { Button, Col, Row, Skeleton, Spin } from "antd";
import { PostCard } from "../post/PostCard";
import { useActions, useValues } from "kea";
import { timelineLogic } from "./timelineLogic";
import { Post } from "../post/postLogic";

const Timeline = () => {
  const { posts, postsLoading } = useValues(timelineLogic);
  const { loadPosts } = useActions(timelineLogic);

  console.log(posts);
  return (
    <Row style={{ width: "100%" }}>
      <Col>
        {postsLoading ? (
          <>
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <br />
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <br />
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <br />
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <br />
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <br />
          </>
        ) : (
          <div style={{ marginBottom: 40 }}>
            {posts.data.map((post) => (
              <PostCard post={post} key={post.post_uuid} />
            ))}
            {!!posts.next_page ? (
              <Button style={{ width: "100%" }} onClick={() => loadPosts()}>
                Load more
              </Button>
            ) : null}
          </div>
        )}
      </Col>
    </Row>
  );
};

export { Timeline };
