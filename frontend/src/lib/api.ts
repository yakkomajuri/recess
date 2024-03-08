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

const HOST = process.env.NODE_ENV === 'production' ? 'https://recess.fly.dev' : 'http://localhost:8000'
const BASE_URL = `${HOST}/api`

export const api = {
    get: (path: string, config: ApiConfig = {}) => {
        // To ensure that restframework doesn't return 401 for unauthenticated
        // users, we conditionally send Token header only if the user is
        // authenticated and the token is available. There is something a little
        // suboptimal about this, but good enough for now(?)
        const csrftoken = getCookie('csrftoken')
        return axios({
            method: 'get',
            url: `${BASE_URL}${path}`,
            headers: {
                ...(config.disableTokenAuth || !csrftoken ? {} : { Authorization: `Token ${csrftoken}` }),
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
                ...(config.disableTokenAuth ? {} : { Authorization: `Token ${getCookie('csrftoken')}` }),
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
                ...(config.disableTokenAuth ? {} : { Authorization: `Token ${getCookie('csrftoken')}` }),
                ...config.headers,
            },
            ...config,
        }),
}
