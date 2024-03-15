import React from 'react'
import { Card, Tabs } from 'antd'
import { LoginForm } from '../components/login/LoginForm'
import { SignupForm } from '../components/login/SignupForm'
import { TimelineHeader } from '../components/timeline/TimelineHeader'

const LoginPage = () => {
    return (
        <div className="login-page" style={{ maxWidth: '300px', margin: '0 auto', marginTop: '50px' }}>
            <div className='platform-name' style={{ display: 'block', marginBottom: 50 }}>                recess<sup style={{ fontSize: 10, marginLeft: 1 }}>BETA</sup>
</div>
            <br style={{ height: 50 }} />
            <br />
            <br />
            <Tabs
                defaultActiveKey="login"
                items={[
                    {
                        key: 'login',
                        label: 'Login',
                        children: <LoginForm />,
                    },
                    {
                        key: 'signup',
                        label: 'Sign up',
                        children: <SignupForm />,
                    },
                ]}
            />
        </div>
    )
}

export { LoginPage }
