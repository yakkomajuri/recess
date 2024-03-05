import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { resetContext } from 'kea'
import { loadersPlugin } from 'kea-loaders'

resetContext({
    plugins: [
        loadersPlugin({
            // Called when any loader is started
            onStart({ logic, reducerKey, actionKey }) {
                // start a global spinner
            },

            // Called when any loader was successful
            onSuccess({ response, logic, reducerKey, actionKey }) {
                // stop that global spinner
            },

            // Called when the listener throws an error
            // Feel free to alert the user in a nicer way,
            // for example by displaying a notification.
            // Also connect this to your bug tracking software.
            onFailure({ error, logic, reducerKey, actionKey }) {
                console.error(`Error in ${actionKey} for ${reducerKey}:`, error)
            },
        }),
    ],
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
