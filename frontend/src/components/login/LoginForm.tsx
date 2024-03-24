import React from 'react'
import { Form, Input, Button, notification } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../../lib/api'
import { useActions } from 'kea'
import { userLogic } from '../../userLogic'

const LoginForm = () => {
    const navigate = useNavigate()
    const { loadUser } = useActions(userLogic)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, _] = useSearchParams()

    const redirectURL = searchParams.get('redirect_path')

    const onFinish = async (values: any) => {
        try {
            document.cookie = 'authtoken=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
            const response = await api.post('/user/login', values, {
                disableTokenAuth: true,
            })
            // should maybe have the backend send a Set-Cookie header?
            document.cookie = `authtoken=${response.data.token}; max-age=2592000; path=/`
            loadUser()
            navigate(redirectURL || '/timeline')
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
