import axios, { AxiosRequestConfig } from 'axios'

interface ApiConfig extends AxiosRequestConfig {
    disableTokenAuth?: boolean
}

export function getCookie(name: string): string | null {
    let cookieValue: string | null = null
    if (document.cookie && document.cookie !== '') {
        for (let cookie of document.cookie.split(';')) {
            cookie = cookie.trim()
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}

const HOST = process.env.NODE_ENV === 'production' ? 'https://us.recessfeed.com' : 'http://localhost:8000'
const BASE_URL = `${HOST}/api`

export const api = {
    get: (path: string, config: ApiConfig = {}) => {
        // To ensure that restframework doesn't return 401 for unauthenticated
        // users, we conditionally send Token header only if the user is
        // authenticated and the token is available. There is something a little
        // suboptimal about this, but good enough for now(?)
        const authToken = getCookie('authtoken')
        return axios({
            method: 'get',
            url: `${BASE_URL}${path}`,
            headers: {
                ...(config.disableTokenAuth || !authToken ? {} : { Authorization: `Token ${authToken}` }),
                ...config.headers,
            },
            ...config,
        })
    },
    post: (path: string, data: Record<string, any> = {}, config: ApiConfig = {}) =>
        axios({
            data,
            method: 'post',
            url: `${BASE_URL}${path}`,
            headers: {
                ...(config.disableTokenAuth ? {} : { Authorization: `Token ${getCookie('authtoken')}` }),
                ...config.headers,
            },
            ...config,
        }),
    put: (path: string, data: Record<string, any> = {}, config: ApiConfig = {}) =>
        axios({
            data,
            method: 'put',
            url: `${BASE_URL}${path}`,
            headers: {
                ...(config.disableTokenAuth ? {} : { Authorization: `Token ${getCookie('authtoken')}` }),
                ...config.headers,
            },
            ...config,
        }),
    delete: (path: string, config: ApiConfig = {}) =>
        axios({
            method: 'delete',
            url: `${BASE_URL}${path}`,
            headers: {
                ...(config.disableTokenAuth ? {} : { Authorization: `Token ${getCookie('authtoken')}` }),
                ...config.headers,
            },
            ...config,
        }),
}
