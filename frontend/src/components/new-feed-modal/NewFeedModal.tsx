import React, { useState } from 'react'
import { Form, Input, Button, notification, Modal, Spin } from 'antd'
import { api } from '../../lib/api'
import { useActions, useValues } from 'kea'
import { newFeedModalLogic } from './newFeedModalLogic'
import { useNavigate } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../lib/capitalizeFirstLetter'

const NewFeedModal = () => {
    const [loadingFeed, setLoadingFeed] = useState(false)
    const { isModalOpen } = useValues(newFeedModalLogic)
    const { setIsModalOpen } = useActions(newFeedModalLogic)
    const navigate = useNavigate()

    const handleSubmit = async ({ feedName, feedUrl }: { feedName?: string; feedUrl?: string }) => {
        setLoadingFeed(true)
        try {
            const feedUrlExistsResponse = await api.get(`/feed?feed_url=${feedUrl}`)

            if (feedUrlExistsResponse.data.length > 0) {
                navigate(`/feed/${feedUrlExistsResponse.data[0].feed_uuid}`)
                notification.info({
                    message: 'Feed with this URL already exists',
                })
                setLoadingFeed(false)
                setIsModalOpen(false)
                return
            }

            const response = await api.post('/feed', {
                feed_url: feedUrl,
            })
            setLoadingFeed(false)
            notification.success({
                message: 'Submit Success',
                description: 'Feed imported successfully.',
            })
            setIsModalOpen(false)
            navigate(`/feed/${response.data.feed_uuid}`)
            // loadPosts()
        } catch (error: any) {
            setLoadingFeed(false)
            // If the user is not authenticated, redirect to login page
            if ((error as any).response.status === 401) {
                window.location.href = '/login'
            }

            if (error.response?.data) {
                const errors = Object.values(error.response.data)
                notification.error({
                    message: 'Importing feed failed',
                    description: Array.isArray(errors[0])
                        ? capitalizeFirstLetter(errors[0][0])
                        : 'Failed to import the feed. Please try again.',
                })
                return
            }

            notification.error({
                message: 'Importing feed failed',
                description: 'Failed to import the feed. Please try again.',
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
                <Form name="import_feed_form" layout="vertical" onFinish={handleSubmit} autoComplete="off">
                    <Form.Item
                        label="Feed URL (must link to an RSS feed)"
                        name="feedUrl"
                        rules={[{ required: true, message: 'Please input the feed URL!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {loadingFeed ? <Spin /> : 'Import'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export { NewFeedModal }
