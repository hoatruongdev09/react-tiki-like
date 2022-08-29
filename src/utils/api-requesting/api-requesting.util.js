
export const BASE_URL = 'http://localhost:8080'

export const API_ENDPOINTS = {
    CUSTOMER_REGISTER: '/auth/register',
    CUSTOMER_LOGIN: '/auth/login',
    CUSTOMER_AUTH: '/auth',
    GET_CUSTOMER_INFO: '/user/info',
    POST_UPDATE_CUSTOMER_INFO: '/user/update',
    POST_UPDATE_CUSTOMER_PASSWORD: '/user/change-password',
    GET_CUSTOMER_ADDRESSES: '/user/addresses',
    POST_CREATE_CUSTOMER_ADDRESS: '/user/add-address',
    POST_DELETE_CUSTOMER_ADDRESS: '/user/delete-address/', //delete-address/:id
    POST_SET_CUSTOMER_DEFAULT_ADDRESS: '/user/set-default-address/', //set-default-address/:id
}

export const generateHeaders = (token) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    if (token) {
        headers['Authorization'] = 'Bearer ' + token
    }
    return headers
}
