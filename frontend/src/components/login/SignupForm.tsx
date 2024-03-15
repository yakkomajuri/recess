import React from 'react'
import { Form, Input, Button, notification } from 'antd'
import { api } from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import { useActions } from 'kea'
import { userLogic } from '../../userLogic'

interface SignupFormValues {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const SignupForm = () => {
    const navigate = useNavigate()
    const { loadUser } = useActions(userLogic)

    const onFinish = async ({ username, email, password }: SignupFormValues) => {
        try {
            const response = await api.post('/user', { username, email, password }, {
                disableTokenAuth: true,
            })
            document.cookie = `authtoken=${response.data.token}`
            loadUser()
            navigate('/timeline')
        } catch (error) {
            notification.error({
                message: 'Signup failed',
            })
        }
    }

    return (
        <Form name="signup" onFinish={onFinish} layout="vertical">
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input type="email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 8, message: 'Password must be at least 8 characters long!' }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                    name="confirmPassword"
                    label="Confirm password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm your new password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
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
                <Button type="primary" htmlType="submit">
                    Sign up
                </Button>
            </Form.Item>
        </Form>
    )
}

export { SignupForm }
