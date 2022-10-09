
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
    POST_UPDATE_ADDRESS: '/user/update-address/',//update-address/:
    GET_CUSTOMER_DEFAULT_ADDRESS: '/user/default-address',
    GET_PRODUCTS: '/product/',
    GET_PRODUCT_DETAIL: '/product/detail/', //product/detail/:id
    GET_CATEGORY_TREE: '/category/tree/', //category/tree/:id
    GET_ALL_PARENT_CATEGORIES: '/category/get-parent-categories',
    GET_PRODUCTS_DETAIL: '/product/details?ids=',// 1,2,3
    POST_PLACE_ORDER: '/order/place-order',
    GET_USER_ORDERS: '/order/user-orders',
    GET_ORDER_DETAIL: '/order/detail/' // /order/detail/:id
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
