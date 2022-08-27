import { useEffect, useState } from 'react'

export const useFetch = (url = '', options = null) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url, options)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(e => setError(e))
    }, [url, options])

    return [data, error]
}

export const BASE_URL = 'http://localhost:8080'

export const API_ENDPOINTS = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    AUTH: '/auth'
}
