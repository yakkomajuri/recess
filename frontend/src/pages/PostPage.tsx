import React, { useEffect } from "react";
import { Col, Layout, Row } from "antd";
import { NewFeedModal } from "../components/new-feed-modal/NewFeedModal";
import { SideNav } from "../components/SideNav";
import { TimelineHeader } from "../components/timeline/TimelineHeader";
import { useParams } from "react-router-dom";
import { useActions, useValues } from "kea";
import { PostCard } from "../components/post/PostCard";
import { PostComment, postLogic } from "../components/post/postLogic";
import { Comment } from "../components/comment/Comment";
import { CommentInput } from "../components/comment/CommentInput";
import { timeAgo } from "../lib/dateUtils";

import "../App.css";
import { getGravatarUrl } from "../lib/gravatar";

const { Content } = Layout;

const PostPage = () => {
  const { post_uuid } = useParams();
  const logic = postLogic({ postUuid: post_uuid });
  const { post, comments } = useValues(logic);
  const { loadPost } = useActions(logic);

  useEffect(() => {
    loadPost();
  }, [post_uuid]);

  return (
    <Layout style={{ minHeight: "100vh" }} className="post-page">
      <TimelineHeader />
      <Layout>
        <Layout>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Row>
              <Col span={6}>
                <SideNav />
              </Col>
              <Col span={18}>
                <Row style={{ width: "100%" }}>
                  <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    {!!post ? <PostCard post={post} /> : null}
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    {!!post ? <CommentInput postUuid={post.post_uuid} /> : null}
                    <br />
                    {(comments || []).map((comment: PostComment) => (
                      <>
                        <Comment
                          key={comment.comment_uuid}
                          author={comment.comment_username}
                          avatar={getGravatarUrl(comment.comment_user_email)}
                          date={timeAgo(comment.comment_timestamp)}
                          content={comment.comment_content}
                        />
                      </>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
      <NewFeedModal />
    </Layout>
  );
};

export { PostPage };
