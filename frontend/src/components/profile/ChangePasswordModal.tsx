import React, { useState } from 'react'
import { Modal, Form, Input, Button, notification } from 'antd'
import { api } from '../../lib/api'

interface ChangePasswordModalProps {
    isVisible: boolean
    onClose: () => void
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isVisible, onClose }) => {
    const [form] = Form.useForm()

    const handleSubmit = async (values: { old_password: string; new_password: string }) => {
        try {
            const response = await api.post('/user/change_password', values)
            if (response.status === 200) {
                notification.success({
                    message: 'Password changed successfully',
                })
                form.resetFields()
                onClose()
            } else {
                notification.error({
                    message: 'Failed to change password',
                    description: response.data.error,
                })
            }
        } catch (error) {
            notification.error({
                message: 'Failed to change password',
                description: 'An error occurred while processing your request',
            })
        }
        form.resetFields()
        onClose()
    }

    return (
        <Modal title="Change password" open={isVisible} onCancel={onClose} footer={null}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="old_password"
                    label="Current password"
                    rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="new_password"
                    label="New password"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmNewPassword"
                    label="Confirm new password"
                    dependencies={['new_password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm your new password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'))
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" danger>
                        Change password
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export { ChangePasswordModal }
