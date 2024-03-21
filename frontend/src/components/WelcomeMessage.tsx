import React from 'react'
import { Alert } from 'antd'

export const WelcomeMesage = () => {
    if (localStorage.getItem('welcome-message-shown') === 'true') {
        return null
    } else {
        localStorage.setItem('welcome-message-shown', 'true')
    }


    return (
        <Alert
            message={<>
                Hey there! Welcome to Recess. If you want to learn more about us, check out our {' '}
                <a href="https://github.com/yakkomajuri/recess/blob/main/manifesto-ish.md#recess-manifesto-ish" target='_blank' rel="noreferrer">Manifesto-ish</a>.
            </>}
            closable
            showIcon
            icon='👋'
            style={{
                marginBottom: '16px',
                border: '1px solid #ece8e8',
                background: '#fcfcfc',
                color: '#222222'
            }}
        />
    )
}