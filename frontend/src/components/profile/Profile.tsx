/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Avatar, Button, Input, Form, Col, Row, Divider, Tooltip, notification } from 'antd'
import './Profile.css' // Import the CSS for additional styling
import { ChangePasswordModal } from './ChangePasswordModal'
import { useActions, useValues } from 'kea'
import { EmailVerificationStatus, userLogic } from '../../userLogic'
import { getGravatarUrl } from '../../lib/gravatar'
import { api } from '../../lib/api'

const Profile = () => {
    const { user } = useValues(userLogic)
    const { verifyEmail } = useActions(userLogic)

    const [bio, setBio] = useState(user!.bio)

    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false)

    const showChangePasswordModal = () => {
        setIsChangePasswordModalVisible(true)
    }

    const handleClose = () => {
        setIsChangePasswordModalVisible(false)
    }

    // this should be in userLogic
    const handleBioSubmit = async (values: { bio: string }) => {
        try {
            const response = await api.put('/user/update_bio', { ...values })
            if (response.status !== 200) {
                notification.error({
                    message: 'Error updating bio, please try again later',
                })
            }
            notification.success({ message: 'Bio updated successfully' })
            setBio(values.bio)
        } catch (error) {
            notification.error({
                message: 'Error updating bio, please try again later',
            })
        }
    }

    if (!user) {
        return null
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <Tooltip title={<span>We pull avatars from Gravatar</span>}>
                    <Avatar size={64} src={getGravatarUrl(user!.email)} />
                </Tooltip>
                <h2>{user.username}</h2>
            </div>
            <div className="profile-content">
                <Divider />
                {user.email_verification_status === EmailVerificationStatus.Verified ? (
                    <p>
                        Email <i>{user.email}</i> is verified.
                    </p>
                ) : user.email_verification_status === EmailVerificationStatus.VerifyEmailSent ? (
                    <p>
                        Verification email sent to <i>{user.email}</i>.
                    </p>
                ) : (
                    <a onClick={verifyEmail}>
                        Verify your email <i>{user.email}</i>
                    </a>
                )}
                <Divider />

                <Form onFinish={handleBioSubmit}>
                    <Form.Item name="bio" initialValue={bio} style={{ marginBottom: 5 }}>
                        <Input.TextArea maxLength={500} rows={4} />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        <Row justify="end">
                            <Col>
                                <Button type="primary" htmlType="submit" size="small">
                                    Update Bio
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
                <Divider />
                <Row gutter={[0, 16]} className="profile-actions">
                    {' '}
                    {/* Add space between rows */}
                    <Col span={24}>
                        <Button
                            type="primary"
                            block
                            danger
                            onClick={showChangePasswordModal}
                            style={{ width: 300, margin: 'auto', display: 'block' }}
                        >
                            Change Password
                        </Button>
                    </Col>
                </Row>
                <ChangePasswordModal isVisible={isChangePasswordModalVisible} onClose={handleClose} />
            </div>
        </div>
    )
}

export { Profile }
