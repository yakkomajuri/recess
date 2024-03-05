import React from 'react'
import { Form, Input, Button, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import { useActions } from 'kea'
import { userLogic } from '../../userLogic'

const LoginForm = () => {
    const navigate = useNavigate()
    const { loadUser } = useActions(userLogic)
    const onFinish = async (values: any) => {
        try {
            const response = await api.post('/user/login', values, { disableTokenAuth: true })
            document.cookie = `csrftoken=${response.data.token}`
            loadUser()
            navigate('/timeline')
        } catch (error) {
            notification.error({
                message: 'Login failed',
            })
        }
    }

    return (
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    )
}

export { LoginForm }
