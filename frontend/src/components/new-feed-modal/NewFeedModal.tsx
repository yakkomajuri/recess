import React, { useState } from "react"
import { Form, Input, Button, notification, Modal } from "antd";
import { api } from "../../lib/api";
import { useActions, useValues } from "kea";
import { timelineLogic } from "../timeline/timelineLogic";
import { newFeedModalLogic } from "./newFeedModalLogic";
import { useNavigate } from "react-router-dom";

const NewFeedModal = () => {
  // const { loadPosts } = useActions(timelineLogic);
  const { isModalOpen } = useValues(newFeedModalLogic)
  const { setIsModalOpen } = useActions(newFeedModalLogic)
  const navigate = useNavigate()

  const handleSubmit = async ({
    feedName,
    feedUrl,
  }: {
    feedName?: string
    feedUrl?: string
  }) => {
    try {
      const response = await api.post("/feed", {
        feed_url: feedUrl,
      })
      notification.success({
        message: "Submit Success",
        description: "Feed imported successfully.",
      })
      setIsModalOpen(false)
      navigate(`/feed/${response.data.feed_uuid}`)
      // loadPosts()
    } catch (error) {
      console.error("API Error:", error)
      notification.error({
        message: "Submit Failed",
        description: "Failed to import the feed. Please try again.",
      })
    }
  }

  return (
    <>
      <Modal
        title="Import New Feed"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null} // Use null to remove default Modal buttons
      >
        <Form
          name="import_feed_form"
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Feed URL (must link to an RSS feed)"
            name="feedUrl"
            rules={[{ required: true, message: "Please input the feed URL!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Import
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export { NewFeedModal }
